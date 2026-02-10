import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import fetch from 'node-fetch';

export interface ImageSearchRequest {
  query: string;
  source: 'unsplash' | 'pexels' | 'dalle' | 'stable-diffusion' | 'midjourney';
  options?: {
    count?: number;
    orientation?: 'landscape' | 'portrait' | 'squarish';
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    category?: string;
    style?: 'photorealistic' | 'illustration' | '3d-render' | 'abstract';
    quality?: 'standard' | 'high';
    safeSearch?: boolean;
  };
}

export interface ImageSearchResponse {
  images: Array<{
    id: string;
    url: string;
    thumbnailUrl: string;
    downloadUrl: string;
    source: string;
    metadata: {
      width: number;
      height: number;
      size: number;
      format: string;
      description?: string;
      photographer?: string;
      tags?: string[];
      license?: string;
      attribution?: string;
    };
    aiGenerated?: boolean;
    processingTime?: number;
  }>;
  total: number;
  source: string;
  metadata: {
    processingTime: number;
    cacheHit: boolean;
    timestamp: string;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  source: 'dalle' | 'stable-diffusion' | 'midjourney';
  options?: {
    count?: number;
    size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
    style?: 'vivid' | 'natural';
    aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3';
    negativePrompt?: string;
    seed?: number;
    steps?: number;
    guidanceScale?: number;
  };
}

export interface ImageGenerationResponse {
  images: Array<{
    id: string;
    url: string;
    thumbnailUrl: string;
    downloadUrl: string;
    source: string;
    prompt: string;
    metadata: {
      width: number;
      height: number;
      size: number;
      format: string;
      generationTime: number;
      seed?: number;
      steps?: number;
      guidanceScale?: number;
    };
  }>;
  source: string;
  metadata: {
    processingTime: number;
    cost: number;
    timestamp: string;
  };
}

export class ImageSourcesService {
  private prisma: PrismaClient;
  private redis: Redis;
  private s3Client: S3Client;
  
  // API Keys and Configurations
  private unsplashAccessKey: string;
  private pexelsApiKey: string;
  private openaiApiKey: string;
  private stabilityApiKey: string;
  private midjourneyApiKey?: string;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    this.unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || '';
    this.pexelsApiKey = process.env.PEXELS_API_KEY || '';
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.stabilityApiKey = process.env.STABILITY_API_KEY || '';
    this.midjourneyApiKey = process.env.MIDJOURNEY_API_KEY;
  }

  // IMAGE SEARCH METHODS
  async searchImages(request: ImageSearchRequest): Promise<ImageSearchResponse> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = `image-search:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        const response = JSON.parse(cached);
        response.metadata.cacheHit = true;
        return response;
      }

      let response: ImageSearchResponse;

      switch (request.source) {
        case 'unsplash':
          response = await this.searchUnsplash(request);
          break;
        case 'pexels':
          response = await this.searchPexels(request);
          break;
        case 'dalle':
          response = await this.generateWithDalle(request as ImageGenerationRequest);
          break;
        case 'stable-diffusion':
          response = await this.generateWithStableDiffusion(request as ImageGenerationRequest);
          break;
        case 'midjourney':
          response = await this.generateWithMidjourney(request as ImageGenerationRequest);
          break;
        default:
          throw new Error(`Unsupported image source: ${request.source}`);
      }

      response.metadata.processingTime = Date.now() - startTime;
      response.metadata.cacheHit = false;
      response.metadata.timestamp = new Date().toISOString();

      // Cache the result
      await this.redis.setex(cacheKey, 1800, JSON.stringify(response)); // 30 minutes cache
      
      return response;
    } catch (error) {
      console.error('Image search error:', error);
      throw error;
    }
  }

  private async searchUnsplash(request: ImageSearchRequest): Promise<ImageSearchResponse> {
    try {
      const params = new URLSearchParams({
        query: request.query,
        per_page: (request.options?.count || 10).toString(),
        orientation: request.options?.orientation || 'landscape',
        content_filter: request.options?.safeSearch !== false ? 'high' : 'low',
      });

      if (request.options?.size) {
        params.append('size', request.options.size);
      }

      if (request.options?.category) {
        params.append('category', request.options.category);
      }

      const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
        headers: {
          'Authorization': `Client-ID ${this.unsplashAccessKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();

      const images = data.results.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.regular,
        thumbnailUrl: photo.urls.thumb,
        downloadUrl: photo.urls.full,
        source: 'unsplash',
        metadata: {
          width: photo.width,
          height: photo.height,
          size: 0, // Unsplash doesn't provide size
          format: 'jpg',
          description: photo.description || photo.alt_description,
          photographer: photo.user.name,
          tags: photo.tags?.map((tag: any) => tag.title) || [],
          license: 'Unsplash License',
          attribution: `Photo by ${photo.user.name} on Unsplash`,
        },
        aiGenerated: false,
      }));

      return {
        images,
        total: data.total,
        source: 'unsplash',
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Unsplash search error:', error);
      throw error;
    }
  }

  private async searchPexels(request: ImageSearchRequest): Promise<ImageSearchResponse> {
    try {
      const params = new URLSearchParams({
        query: request.query,
        per_page: (request.options?.count || 10).toString(),
        orientation: request.options?.orientation || 'landscape',
        size: request.options?.size || 'large',
      });

      const response = await fetch(`https://api.pexels.com/v1/search?${params}`, {
        headers: {
          'Authorization': this.pexelsApiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.statusText}`);
      }

      const data = await response.json();

      const images = data.photos.map((photo: any) => ({
        id: photo.id.toString(),
        url: photo.src.large,
        thumbnailUrl: photo.src.medium,
        downloadUrl: photo.src.original,
        source: 'pexels',
        metadata: {
          width: photo.width,
          height: photo.height,
          size: 0, // Pexels doesn't provide size
          format: 'jpg',
          description: photo.alt,
          photographer: photo.photographer,
          tags: [], // Pexels doesn't provide tags
          license: 'Pexels License',
          attribution: `Photo by ${photo.photographer} on Pexels`,
        },
        aiGenerated: false,
      }));

      return {
        images,
        total: data.total_results,
        source: 'pexels',
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Pexels search error:', error);
      throw error;
    }
  }

  // AI IMAGE GENERATION METHODS
  async generateImages(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const startTime = Date.now();
    
    try {
      let response: ImageGenerationResponse;

      switch (request.source) {
        case 'dalle':
          response = await this.generateWithDalle(request);
          break;
        case 'stable-diffusion':
          response = await this.generateWithStableDiffusion(request);
          break;
        case 'midjourney':
          response = await this.generateWithMidjourney(request);
          break;
        default:
          throw new Error(`Unsupported generation source: ${request.source}`);
      }

      response.metadata.processingTime = Date.now() - startTime;
      response.metadata.timestamp = new Date().toISOString();

      // Log generation for analytics
      await this.logImageGeneration(request, response);

      return response;
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  private async generateWithDalle(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const requestBody = {
        model: 'dall-e-3',
        prompt: request.prompt,
        n: request.options?.count || 1,
        size: request.options?.size || '1024x1024',
        quality: request.options?.quality || 'standard',
        style: request.options?.style || 'vivid',
      };

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`DALL-E API error: ${response.statusText}`);
      }

      const data = await response.json();
      const cost = this.calculateDalleCost(request.options?.size || '1024x1024', request.options?.quality || 'standard');

      const images = await Promise.all(
        data.data.map(async (image: any, index: number) => {
          // Download and upload to S3
          const imageBuffer = await this.downloadImage(image.url);
          const filename = `dalle-${Date.now()}-${index}.png`;
          const s3Url = await this.uploadToS3(imageBuffer, filename, 'image/png');

          return {
            id: `dalle-${Date.now()}-${index}`,
            url: s3Url,
            thumbnailUrl: s3Url, // Would generate thumbnail
            downloadUrl: s3Url,
            source: 'dalle',
            prompt: request.prompt,
            metadata: {
              width: parseInt(request.options?.size?.split('x')[0] || '1024'),
              height: parseInt(request.options?.size?.split('x')[1] || '1024'),
              size: imageBuffer.length,
              format: 'png',
              generationTime: 0, // Would track actual time
            },
          };
        })
      );

      return {
        images,
        source: 'dalle',
        metadata: {
          processingTime: 0,
          cost,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('DALL-E generation error:', error);
      throw error;
    }
  }

  private async generateWithStableDiffusion(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const requestBody = {
        prompt: request.prompt,
        negative_prompt: request.options?.negativePrompt || '',
        samples: request.options?.count || 1,
        width: parseInt(request.options?.size?.split('x')[0] || '1024'),
        height: parseInt(request.options?.size?.split('x')[1] || '1024'),
        steps: request.options?.steps || 20,
        guidance_scale: request.options?.guidanceScale || 7.5,
        seed: request.options?.seed || Math.floor(Math.random() * 1000000),
      };

      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.stabilityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Stable Diffusion API error: ${response.statusText}`);
      }

      const data = await response.json();
      const cost = this.calculateStableDiffusionCost(request.options?.steps || 20);

      const images = await Promise.all(
        data.artifacts.map(async (artifact: any, index: number) => {
          const imageBuffer = Buffer.from(artifact.base64, 'base64');
          const filename = `stable-diffusion-${Date.now()}-${index}.png`;
          const s3Url = await this.uploadToS3(imageBuffer, filename, 'image/png');

          return {
            id: `sd-${Date.now()}-${index}`,
            url: s3Url,
            thumbnailUrl: s3Url,
            downloadUrl: s3Url,
            source: 'stable-diffusion',
            prompt: request.prompt,
            metadata: {
              width: requestBody.width,
              height: requestBody.height,
              size: imageBuffer.length,
              format: 'png',
              generationTime: 0,
              seed: requestBody.seed,
              steps: requestBody.steps,
              guidanceScale: requestBody.guidance_scale,
            },
          };
        })
      );

      return {
        images,
        source: 'stable-diffusion',
        metadata: {
          processingTime: 0,
          cost,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Stable Diffusion generation error:', error);
      throw error;
    }
  }

  private async generateWithMidjourney(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      if (!this.midjourneyApiKey) {
        throw new Error('Midjourney API key not configured');
      }

      // Midjourney API implementation (would depend on actual Midjourney API)
      const requestBody = {
        prompt: request.prompt,
        count: request.options?.count || 1,
        aspect_ratio: request.options?.aspectRatio || '1:1',
        quality: request.options?.quality || 'standard',
      };

      const response = await fetch('https://api.midjourney.com/v1/imagine', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.midjourneyApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Midjourney API error: ${response.statusText}`);
      }

      const data = await response.json();
      const cost = this.calculateMidjourneyCost();

      // Process Midjourney response (implementation depends on actual API)
      const images = [{
        id: `mj-${Date.now()}`,
        url: data.image_url,
        thumbnailUrl: data.thumbnail_url,
        downloadUrl: data.image_url,
        source: 'midjourney',
        prompt: request.prompt,
        metadata: {
          width: 1024,
          height: 1024,
          size: 0,
          format: 'jpg',
          generationTime: 0,
        },
      }];

      return {
        images,
        source: 'midjourney',
        metadata: {
          processingTime: 0,
          cost,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Midjourney generation error:', error);
      throw error;
    }
  }

  // IMAGE MANAGEMENT METHODS
  async downloadImage(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      console.error('Image download error:', error);
      throw error;
    }
  }

  async uploadToS3(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `images/${filename}`,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/images/${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  async getImageHistory(userId: string, limit: number = 20): Promise<any[]> {
    try {
      return await this.prisma.imageUsage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
          image: true
        }
      });
    } catch (error) {
      console.error('Failed to get image history:', error);
      return [];
    }
  }

  async saveImageToLibrary(userId: string, imageData: any): Promise<any> {
    try {
      return await this.prisma.image.create({
        data: {
          userId,
          source: imageData.source,
          url: imageData.url,
          thumbnailUrl: imageData.thumbnailUrl,
          metadata: imageData.metadata,
          prompt: imageData.prompt,
          aiGenerated: imageData.aiGenerated || false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to save image to library:', error);
      throw error;
    }
  }

  // UTILITY METHODS
  private calculateDalleCost(size: string, quality: string): number {
    const sizeCosts = {
      '256x256': 0.020,
      '512x512': 0.018,
      '1024x1024': 0.040,
      '1792x1024': 0.080,
      '1024x1792': 0.080,
    };

    const qualityMultiplier = quality === 'hd' ? 2 : 1;
    
    return (sizeCosts[size as keyof typeof sizeCosts] || 0.040) * qualityMultiplier;
  }

  private calculateStableDiffusionCost(steps: number): number {
    // Stability AI pricing: ~$0.02 per 100 steps
    return (steps / 100) * 0.02;
  }

  private calculateMidjourneyCost(): number {
    // Midjourney pricing (would depend on actual pricing)
    return 0.10; // Placeholder
  }

  private async logImageGeneration(request: ImageGenerationRequest, response: ImageGenerationResponse): Promise<void> {
    try {
      await this.prisma.analytics.create({
        data: {
          event: 'IMAGE_GENERATION',
          properties: {
            source: request.source,
            prompt: request.prompt,
            options: request.options,
            count: response.images.length,
            cost: response.metadata.cost,
            processingTime: response.metadata.processingTime
          },
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log image generation:', error);
    }
  }

  // BATCH OPERATIONS
  async batchGenerateImages(requests: ImageGenerationRequest[]): Promise<ImageGenerationResponse[]> {
    const results = await Promise.all(
      requests.map(request => this.generateImages(request))
    );

    return results;
  }

  async searchMultipleSources(query: string, options?: any): Promise<ImageSearchResponse> {
    const sources: Array<'unsplash' | 'pexels'> = ['unsplash', 'pexels'];
    
    const results = await Promise.all(
      sources.map(source => 
        this.searchImages({
          query,
          source,
          options: { ...options, count: Math.ceil((options?.count || 10) / sources.length) }
        })
      )
    );

    // Combine results
    const combinedImages = results.flatMap(result => result.images);
    const total = results.reduce((sum, result) => sum + result.total, 0);

    return {
      images: combinedImages.slice(0, options?.count || 10),
      total,
      source: 'combined',
      metadata: {
        processingTime: results.reduce((sum, result) => sum + result.metadata.processingTime, 0),
        cacheHit: results.some(result => result.metadata.cacheHit),
        timestamp: new Date().toISOString(),
      },
    };
  }

  // IMAGE ANALYSIS
  async analyzeImage(imageUrl: string): Promise<any> {
    try {
      // This would integrate with image analysis APIs
      // For now, return placeholder data
      return {
        tags: ['nature', 'landscape', 'outdoor'],
        colors: ['#4A90E2', '#7ED321', '#F5A623'],
        objects: ['tree', 'mountain', 'sky'],
        style: 'photorealistic',
        quality: 'high',
        dominantColors: ['#4A90E2', '#7ED321'],
        mood: 'peaceful',
        composition: 'landscape'
      };
    } catch (error) {
      console.error('Image analysis error:', error);
      throw error;
    }
  }

  async getSimilarImages(imageUrl: string, limit: number = 10): Promise<any[]> {
    try {
      // This would use visual similarity algorithms
      // For now, return placeholder data
      return [];
    } catch (error) {
      console.error('Similar images search error:', error);
      throw error;
    }
  }
}
