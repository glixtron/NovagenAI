import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { presentationEnhancerService } from './PresentationEnhancerService';


const execAsync = promisify(exec);

export interface PresentationStructure {
  presentation_id: string;
  slides: {
    slide_1: SlideData;
    slide_2: SlideData;
    // ... dynamic slides
    assets: {
      images: AssetFile[];
      charts: AssetFile[];
      icons: AssetFile[];
    };
  };
  exports: {
    presentation_pdf?: string;
    presentation_pptx?: string;
    presentation_video_mp4?: string;
  };
  versions: {
    version_1: VersionData;
    version_2: VersionData;
    // ... dynamic versions
  };
}

export interface SlideData {
  id: string;
  title: string;
  content: {
    elements: SlideElement[];
    layout: LayoutConfig;
    theme: ThemeConfig;
    transitions: TransitionConfig;
  };
  metadata: {
    order: number;
    duration?: number;
    notes?: string;
    created_at: string;
    updated_at: string;
  };
}

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'chart' | 'shape' | 'video' | 'icon';
  position: { x: number; y: number; width: number; height: number };
  content: any;
  style: StyleConfig;
  animation?: AnimationConfig;
}

export interface AssetFile {
  filename: string;
  url: string;
  size: number;
  type: string;
  metadata: any;
}

export interface VersionData {
  version: string;
  timestamp: string;
  changes: ChangeLog[];
  created_by: string;
  description?: string;
}

export interface ChangeLog {
  element_id: string;
  type: 'created' | 'updated' | 'deleted' | 'moved';
  old_value?: any;
  new_value?: any;
  timestamp: string;
}

export interface LayoutConfig {
  template: string;
  grid: { columns: number; rows: number };
  spacing: { horizontal: number; vertical: number };
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  sizes: {
    heading: { h1: number; h2: number; h3: number };
    body: number;
    small: number;
  };
}

export interface TransitionConfig {
  type: 'none' | 'fade' | 'slide' | 'zoom' | 'flip';
  duration: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  easing?: string;
}

export interface StyleConfig {
  background?: string;
  border?: string;
  borderRadius?: number;
  boxShadow?: string;
  opacity?: number;
  transform?: string;
  zIndex?: number;
}

export interface AnimationConfig {
  type: 'fadeIn' | 'slideIn' | 'bounce' | 'rotate' | 'scale';
  duration: number;
  delay: number;
  easing: string;
  repeat?: number | 'infinite';
}



// ... (existing imports)

export interface PPTGenerationRequest {
  presentation_id: string;
  template?: string;
  theme?: ThemeConfig;
  slides: Omit<SlideData, 'metadata'>[];
  options: {
    format: 'pptx' | 'pdf' | 'video' | 'all';
    quality: 'low' | 'medium' | 'high';
    animations: boolean;
    transitions: boolean;
    speaker_notes: boolean;
    export_assets: boolean;
    smart_formatting?: boolean; // New Flag
    ai_images?: boolean; // New Flag
  };
}

// Response Interface
export interface PPTGenerationResponse {
  success: boolean;
  presentation_id: string;
  files: {
    pptx?: string;
    pdf?: string;
    video?: string;
  };
  assets?: any;
  stats?: {

    slides: number;
    duration: number;
    size: number;
  };
  metadata?: any;
}

export class PPTGeneratorService {
  private prisma: PrismaClient;
  private s3Client: S3Client;
  private redis: Redis;
  private localStoragePath: string;

  constructor() {
    this.prisma = new PrismaClient();
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });

    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
    this.localStoragePath = process.env.LOCAL_STORAGE_PATH || './public/presentations';
  }

  // PRESENTATION MANAGEMENT

  async createPresentation(request: PPTGenerationRequest): Promise<PPTGenerationResponse> {
    try {
      const startTime = Date.now();

      // Create presentation structure
      const presentationPath = path.join(this.localStoragePath, request.presentation_id);
      await this.createDirectoryStructure(presentationPath);

      // AI Enhancement Step
      if (request.options.speaker_notes || request.options.smart_formatting || request.options.ai_images) {
        // Create a temporary PresentationData object for the enhancer
        const tempPres: any = {
          title: request.presentation_id, // Placeholder
          slides: request.slides as any, // Cast for compatibility
          theme: 'modern', // Placeholder
          aspectRatio: '16:9',
          imageStyle: 'Photorealistic',
          enableAnimations: request.options.animations
        };

        const enhancedPres = await presentationEnhancerService.enhancePresentation(tempPres, {
          notes: request.options.speaker_notes,
          formatting: request.options.smart_formatting,
          images: request.options.ai_images
        });

        // Update request slides with enhanced versions
        request.slides = enhancedPres.slides as any;
      }

      // Process slides
      const processedSlides = await this.processSlides(request.slides, request.presentation_id);

      // Save slides to JSON files
      await this.saveSlides(processedSlides, presentationPath);

      // Generate presentation files
      const generatedFiles = await this.generatePresentationFiles(request, processedSlides);

      // Create version control
      await this.createVersion(request.presentation_id, '1.0.0', 'Initial version');

      // Cache presentation structure
      await this.cachePresentationStructure(request.presentation_id);

      const response: PPTGenerationResponse = {
        success: true,
        presentation_id: request.presentation_id,
        files: generatedFiles,

        assets: await this.getAssetUrls(request.presentation_id),
        metadata: {
          total_slides: processedSlides.length,
          file_sizes: await this.getFileSizes(generatedFiles),
          generation_time: Date.now() - startTime,
          created_at: new Date().toISOString(),
        },
      };

      // Save to database
      await this.savePresentationToDB(response);

      return response;
    } catch (error) {
      console.error('Create presentation error:', error);
      throw error;
    }
  }

  async updatePresentation(presentationId: string, updates: Partial<PPTGenerationRequest>): Promise<PPTGenerationResponse> {
    try {
      const startTime = Date.now();

      // Get current presentation
      const currentPresentation = await this.getPresentation(presentationId);

      // Create backup version
      const versionNumber = await this.getNextVersionNumber(presentationId);
      await this.createVersion(presentationId, versionNumber, `Update version ${versionNumber}`);

      // Process updates
      let processedSlides: SlideData[] = [];
      if (updates.slides) {
        processedSlides = await this.processSlides(updates.slides, presentationId);
        await this.saveSlides(processedSlides, path.join(this.localStoragePath, presentationId));
      }

      // Regenerate files if needed
      const generatedFiles = await this.generatePresentationFiles({
        presentation_id: presentationId,
        slides: updates.slides || [],
        options: updates.options || { format: 'pptx', quality: 'medium', animations: false, transitions: false, speaker_notes: false, export_assets: false }
      }, processedSlides);

      // Update cache
      await this.cachePresentationStructure(presentationId);

      const response: PPTGenerationResponse = {
        success: true,
        presentation_id: presentationId,
        files: generatedFiles,

        assets: await this.getAssetUrls(presentationId),
        metadata: {
          total_slides: currentPresentation.slides ? Object.keys(currentPresentation.slides).length : 0,
          file_sizes: await this.getFileSizes(generatedFiles),
          generation_time: Date.now() - startTime,
          created_at: new Date().toISOString(),
        },
      };

      await this.updatePresentationInDB(presentationId, response);

      return response;
    } catch (error) {
      console.error('Update presentation error:', error);
      throw error;
    }
  }

  async getPresentation(presentationId: string): Promise<PresentationStructure> {
    try {
      // Check cache first
      const cached = await this.redis.get(`presentation:${presentationId}`);
      if (cached) {
        return JSON.parse(cached);
      }

      // Build presentation structure from file system
      const presentationPath = path.join(this.localStoragePath, presentationId);
      const structure: PresentationStructure = {
        presentation_id: presentationId,
        slides: await this.loadSlides(presentationPath),
        exports: await this.loadExports(presentationPath),
        versions: await this.loadVersions(presentationPath),
      };

      // Cache the structure
      await this.redis.setex(`presentation:${presentationId}`, 3600, JSON.stringify(structure));

      return structure;
    } catch (error) {
      console.error('Get presentation error:', error);
      throw error;
    }
  }

  async deletePresentation(presentationId: string): Promise<void> {
    try {
      // Delete from local storage
      const presentationPath = path.join(this.localStoragePath, presentationId);
      await this.deleteDirectory(presentationPath);

      // Delete from S3
      await this.deleteFromS3(presentationId);

      // Remove from cache
      await this.redis.del(`presentation:${presentationId}`);

      // Delete from database
      await this.deletePresentationFromDB(presentationId);
    } catch (error) {
      console.error('Delete presentation error:', error);
      throw error;
    }
  }

  // SLIDE MANAGEMENT
  private async processSlides(slides: Omit<SlideData, 'metadata'>[], presentationId: string): Promise<SlideData[]> {
    const processedSlides: SlideData[] = [];

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const processedSlide: SlideData = {
        ...slide,
        metadata: {
          order: i,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };

      // Process assets in slide
      if (slide.content.elements) {
        for (const element of slide.content.elements) {
          if (element.type === 'image' || element.type === 'chart' || element.type === 'icon') {
            await this.processAsset(element, presentationId);
          }
        }
      }

      processedSlides.push(processedSlide);
    }

    return processedSlides;
  }

  private async saveSlides(slides: SlideData[], presentationPath: string): Promise<void> {
    const slidesPath = path.join(presentationPath, 'slides');

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideFile = path.join(slidesPath, `slide_${i + 1}.json`);
      await fs.writeFile(slideFile, JSON.stringify(slide, null, 2));
    }
  }

  private async loadSlides(presentationPath: string): Promise<any> {
    const slidesPath = path.join(presentationPath, 'slides');
    const slides: any = { assets: { images: [], charts: [], icons: [] } };

    try {
      const slideFiles = await fs.readdir(slidesPath);

      for (const file of slideFiles) {
        if (file.startsWith('slide_') && file.endsWith('.json')) {
          const slideData = await fs.readFile(path.join(slidesPath, file), 'utf-8');
          const slideKey = file.replace('.json', '');
          slides[slideKey] = JSON.parse(slideData);
        }
      }

      // Load assets
      await this.loadAssets(slidesPath, slides.assets);
    } catch (error) {
      console.error('Load slides error:', error);
    }

    return slides;
  }

  private async processAsset(element: SlideElement, presentationId: string): Promise<void> {
    try {
      const assetType = element.type === 'image' ? 'images' : element.type === 'chart' ? 'charts' : 'icons';
      const assetPath = path.join(this.localStoragePath, presentationId, 'slides', 'assets', assetType);

      // Ensure asset directory exists
      await this.ensureDirectory(assetPath);

      // Process asset based on type
      if (element.type === 'image') {
        await this.processImageAsset(element, assetPath);
      } else if (element.type === 'chart') {
        await this.processChartAsset(element, assetPath);
      } else if (element.type === 'icon') {
        await this.processIconAsset(element, assetPath);
      }
    } catch (error) {
      console.error('Process asset error:', error);
    }
  }

  private async processImageAsset(element: SlideElement, assetPath: string): Promise<void> {
    // Download and optimize image
    if (element.content.url) {
      const filename = `image_${Date.now()}.png`;
      const localPath = path.join(assetPath, filename);

      // Download image
      const response = await fetch(element.content.url);
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(localPath, buffer);

      // Update element content with local path
      element.content.localPath = filename;
      element.content.size = buffer.length;
    }
  }

  private async processChartAsset(element: SlideElement, assetPath: string): Promise<void> {
    // Generate chart image
    const filename = `chart_${Date.now()}.png`;
    const localPath = path.join(assetPath, filename);

    // Generate chart using D3.js or similar
    const chartBuffer = await this.generateChartImage(element.content);
    await fs.writeFile(localPath, chartBuffer);

    // Update element content
    element.content.localPath = filename;
    element.content.size = chartBuffer.length;
  }

  private async processIconAsset(element: SlideElement, assetPath: string): Promise<void> {
    // Download or generate icon
    const filename = `icon_${Date.now()}.svg`;
    const localPath = path.join(assetPath, filename);

    if (element.content.url) {
      // Download icon
      const response = await fetch(element.content.url);
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(localPath, buffer);
    } else {
      // Generate SVG icon
      const svgContent = this.generateIconSVG(element.content);
      await fs.writeFile(localPath, svgContent);
    }

    element.content.localPath = filename;
  }

  // FILE GENERATION
  private async generatePresentationFiles(request: PPTGenerationRequest, slides: SlideData[]): Promise<any> {
    const files: any = {};
    const presentationPath = path.join(this.localStoragePath, request.presentation_id);
    const exportsPath = path.join(presentationPath, 'exports');

    await this.ensureDirectory(exportsPath);

    if (request.options.format === 'pptx' || request.options.format === 'all') {
      files.pptx = await this.generatePPTX(slides, request, exportsPath);
    }

    if (request.options.format === 'pdf' || request.options.format === 'all') {
      files.pdf = await this.generatePDF(slides, request, exportsPath);
    }

    if (request.options.format === 'video' || request.options.format === 'all') {
      files.video = await this.generateVideo(slides, request, exportsPath);
    }

    return files;
  }

  private async generatePPTX(slides: SlideData[], request: PPTGenerationRequest, exportsPath: string): Promise<string> {
    try {
      // Use LibreOffice or OnlyOffice to generate PPTX
      const pptxPath = path.join(exportsPath, 'presentation.pptx');

      // Create PPTX structure
      const pptxContent = await this.createPPTXContent(slides, request);
      await fs.writeFile(pptxPath, pptxContent);

      // Upload to S3
      const s3Url = await this.uploadToS3(pptxPath, 'presentation.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');

      return s3Url;
    } catch (error) {
      console.error('Generate PPTX error:', error);
      throw error;
    }
  }

  private async generatePDF(slides: SlideData[], request: PPTGenerationRequest, exportsPath: string): Promise<string> {
    try {
      // Use Puppeteer to generate PDF
      const pdfPath = path.join(exportsPath, 'presentation.pdf');

      // Create HTML from slides
      const htmlContent = await this.createHTMLContent(slides, request);
      const htmlPath = path.join(exportsPath, 'presentation.html');
      await fs.writeFile(htmlPath, htmlContent);

      // Convert HTML to PDF
      await execAsync(`puppeteer print-to-pdf "${htmlPath}" --output "${pdfPath} "`);

      // Upload to S3
      const s3Url = await this.uploadToS3(pdfPath, 'presentation.pdf', 'application/pdf');

      return s3Url;
    } catch (error) {
      console.error('Generate PDF error:', error);
      throw error;
    }
  }

  private async generateVideo(slides: SlideData[], request: PPTGenerationRequest, exportsPath: string): Promise<string> {
    try {
      // Use FFmpeg to generate video
      const videoPath = path.join(exportsPath, 'presentation_video.mp4');

      // Generate slide images first
      const slideImages = await this.generateSlideImages(slides, exportsPath);

      // Create video from images using FFmpeg
      const imageList = slideImages.map(img => path.join(exportsPath, img)).join('|');
      await execAsync(`ffmpeg -f concat -i "${imageList}" -c:v libx264 -pix_fmt yuv420p "${videoPath} "`);

      // Upload to S3
      const s3Url = await this.uploadToS3(videoPath, 'presentation_video.mp4', 'video/mp4');

      return s3Url;
    } catch (error) {
      console.error('Generate video error:', error);
      throw error;
    }
  }

  // VERSION CONTROL
  private async createVersion(presentationId: string, version: string, description: string): Promise<void> {
    try {
      const versionsPath = path.join(this.localStoragePath, presentationId, 'versions');
      await this.ensureDirectory(versionsPath);

      const versionData: VersionData = {
        version,
        timestamp: new Date().toISOString(),
        changes: [],
        created_by: 'system', // Would get from auth context
        description,
      };

      const versionFile = path.join(versionsPath, `version_${version.replace('.', '_')}.json`);
      await fs.writeFile(versionFile, JSON.stringify(versionData, null, 2));
    } catch (error) {
      console.error('Create version error:', error);
    }
  }

  private async loadVersions(presentationPath: string): Promise<any> {
    const versionsPath = path.join(presentationPath, 'versions');
    const versions: any = {};

    try {
      const versionFiles = await fs.readdir(versionsPath);

      for (const file of versionFiles) {
        if (file.startsWith('version_') && file.endsWith('.json')) {
          const versionData = await fs.readFile(path.join(versionsPath, file), 'utf-8');
          const versionKey = file.replace('.json', '');
          versions[versionKey] = JSON.parse(versionData);
        }
      }
    } catch (error) {
      console.error('Load versions error:', error);
    }

    return versions;
  }

  private async getNextVersionNumber(presentationId: string): Promise<string> {
    try {
      const versionsPath = path.join(this.localStoragePath, presentationId, 'versions');
      const versionFiles = await fs.readdir(versionsPath);

      const versions = versionFiles
        .filter(file => file.startsWith('version_') && file.endsWith('.json'))
        .map(file => file.replace('version_', '').replace('.json', ''))
        .sort();

      if (versions.length === 0) {
        return '1.0.0';
      }

      const lastVersion = versions[versions.length - 1];
      const [major, minor, patch] = lastVersion.split('.').map(Number);

      return `${major}.${minor}.${patch + 1}`;
    } catch (error) {
      return '1.0.0';
    }
  }

  // EXPORT MANAGEMENT
  private async loadExports(presentationPath: string): Promise<any> {
    const exportsPath = path.join(presentationPath, 'exports');
    const exports: any = {};

    try {
      const exportFiles = await fs.readdir(exportsPath);

      for (const file of exportFiles) {
        const filePath = path.join(exportsPath, file);
        const stats = await fs.stat(filePath);

        if (file === 'presentation.pdf') {
          exports.presentation_pdf = `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(presentationPath)}/exports/${file}`;
        } else if (file === 'presentation.pptx') {
          exports.presentation_pptx = `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(presentationPath)}/exports/${file}`;
        } else if (file === 'presentation_video.mp4') {
          exports.presentation_video_mp4 = `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(presentationPath)}/exports/${file}`;
        }
      }
    } catch (error) {
      console.error('Load exports error:', error);
    }

    return exports;
  }

  // UTILITY METHODS
  private async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  private async ensureLocalStorage(): Promise<void> {
    await this.ensureDirectory(this.localStoragePath);
  }

  private async createDirectoryStructure(presentationPath: string): Promise<void> {
    await this.ensureDirectory(presentationPath);
    await this.ensureDirectory(path.join(presentationPath, 'slides'));
    await this.ensureDirectory(path.join(presentationPath, 'slides', 'assets'));
    await this.ensureDirectory(path.join(presentationPath, 'slides', 'assets', 'images'));
    await this.ensureDirectory(path.join(presentationPath, 'slides', 'assets', 'charts'));
    await this.ensureDirectory(path.join(presentationPath, 'slides', 'assets', 'icons'));
    await this.ensureDirectory(path.join(presentationPath, 'exports'));
    await this.ensureDirectory(path.join(presentationPath, 'versions'));
  }

  private async loadAssets(slidesPath: string, assets: any): Promise<void> {
    const assetsPath = path.join(slidesPath, 'assets');

    try {
      // Load images
      const imagesPath = path.join(assetsPath, 'images');
      const imageFiles = await fs.readdir(imagesPath);
      assets.images = imageFiles.map(file => ({
        filename: file,
        url: `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(slidesPath)}/slides/assets/images/${file}`,
        size: 0, // Would get actual size
        type: 'image',
        metadata: {}
      }));

      // Load charts
      const chartsPath = path.join(assetsPath, 'charts');
      const chartFiles = await fs.readdir(chartsPath);
      assets.charts = chartFiles.map(file => ({
        filename: file,
        url: `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(slidesPath)}/slides/assets/charts/${file}`,
        size: 0,
        type: 'chart',
        metadata: {}
      }));

      // Load icons
      const iconsPath = path.join(assetsPath, 'icons');
      const iconFiles = await fs.readdir(iconsPath);
      assets.icons = iconFiles.map(file => ({
        filename: file,
        url: `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/presentations/${path.basename(slidesPath)}/slides/assets/icons/${file}`,
        size: 0,
        type: 'icon',
        metadata: {}
      }));
    } catch (error) {
      console.error('Load assets error:', error);
    }
  }

  private async getAssetUrls(presentationId: string): Promise<{ images: string[]; charts: string[]; icons: string[] }> {
    const presentation = await this.getPresentation(presentationId);
    return {
      images: presentation.slides?.assets?.images?.map((asset: AssetFile) => asset.url) || [],
      charts: presentation.slides?.assets?.charts?.map((asset: AssetFile) => asset.url) || [],
      icons: presentation.slides?.assets?.icons?.map((asset: AssetFile) => asset.url) || [],
    };
  }

  private async getFileSizes(files: any): Promise<Record<string, number>> {
    const sizes: Record<string, number> = {};

    for (const [key, url] of Object.entries(files)) {
      if (typeof url === 'string') {
        // Would get actual file size from S3
        sizes[key] = 0;
      }
    }

    return sizes;
  }

  private async cachePresentationStructure(presentationId: string): Promise<void> {
    const structure = await this.getPresentation(presentationId);
    await this.redis.setex(`presentation:${presentationId}`, 3600, JSON.stringify(structure));
  }

  private async uploadToS3(filePath: string, filename: string, contentType: string): Promise<string> {
    try {
      const fileBuffer = await fs.readFile(filePath);
      const key = `presentations/${path.dirname(filePath)}/${filename}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);

      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private async deleteFromS3(presentationId: string): Promise<void> {
    try {
      // Delete all files related to presentation
      const prefix = `presentations/${presentationId}/`;

      // Would list and delete all objects with this prefix
      console.log(`Would delete all S3 objects with prefix: ${prefix}`);
    } catch (error) {
      console.error('S3 delete error:', error);
    }
  }

  private async deleteDirectory(dirPath: string): Promise<void> {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
      console.error('Delete directory error:', error);
    }
  }

  // DATABASE OPERATIONS
  private async savePresentationToDB(presentation: PPTGenerationResponse): Promise<void> {
    try {
      await this.prisma.presentation.create({
        data: {
          id: presentation.presentation_id,
          title: `Presentation ${presentation.presentation_id}`,
          userId: 'system', // Would get from auth context
          data: presentation as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Save presentation to DB error:', error);
    }
  }

  private async updatePresentationInDB(presentationId: string, presentation: PPTGenerationResponse): Promise<void> {
    try {
      await this.prisma.presentation.update({
        where: { id: presentationId },
        data: {
          data: presentation as any,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Update presentation in DB error:', error);
    }
  }

  private async deletePresentationFromDB(presentationId: string): Promise<void> {
    try {
      await this.prisma.presentation.delete({
        where: { id: presentationId },
      });
    } catch (error) {
      console.error('Delete presentation from DB error:', error);
    }
  }

  // HELPER METHODS FOR CONTENT GENERATION
  private async createPPTXContent(slides: SlideData[], request: PPTGenerationRequest): Promise<Buffer> {
    // This would create actual PPTX content
    // For now, return placeholder
    return Buffer.from('PPTX content placeholder');
  }

  private async createHTMLContent(slides: SlideData[], request: PPTGenerationRequest): Promise<string> {
    const slidesHTML = slides.map((slide, index) => {
      const theme = slide.content.theme || {
        colors: { primary: '#0ea5e9', secondary: '#64748b', background: '#ffffff', text: '#1e293b', accent: '#f43f5e' },
        fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif', mono: 'JetBrains Mono, monospace' }
      };

      return `
      <div class="slide" data-slide="${index}" style="background: ${theme.colors.background}; color: ${theme.colors.text};">
        <div class="slide-content">
          <h1 class="slide-title" style="color: ${theme.colors.primary}; font-family: ${theme.fonts.heading};">
            ${slide.title}
          </h1>
          <div class="elements-container">
            ${this.renderSlideElements(slide.content.elements, theme)}
          </div>
        </div>
        ${slide.metadata.notes ? `<div class="speaker-notes">${slide.metadata.notes}</div>` : ''}
      </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: #0ea5e9;
            --secondary: #64748b;
            --text: #1e293b;
            --bg: #ffffff;
          }
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', sans-serif; 
            background: #f1f5f9;
          }
          .slide { 
            width: 1920px; 
            height: 1080px; 
            margin: 0 auto 40px; 
            position: relative; 
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            background: white;
            display: flex;
            flex-direction: column;
          }
          .slide-content {
            padding: 80px 120px;
            flex: 1;
            position: relative;
          }
          .slide-title {
            font-size: 84px;
            font-weight: 800;
            margin-bottom: 60px;
            letter-spacing: -0.025em;
          }
          .elements-container {
            position: relative;
            height: calc(100% - 150px);
          }
          .element {
            transition: all 0.3s ease;
          }
          .element-text {
            font-size: 42px;
            line-height: 1.5;
          }
          .element-image {
            border-radius: 24px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            object-fit: cover;
          }
          .speaker-notes {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 20px;
            font-size: 18px;
            display: none; /* Hide in final export */
          }
        </style>
      </head>
      <body>
        ${slidesHTML}
      </body>
      </html>
    `;
  }

  private renderSlideElements(elements: SlideElement[], theme: ThemeConfig): string {
    return elements.map(element => {
      const style = `
        position: absolute;
        left: ${element.position.x}%; 
        top: ${element.position.y}%;
        width: ${element.position.width}%;
        height: ${element.position.height}%;
        ${element.style?.background ? `background: ${element.style.background};` : ''}
        ${element.style?.border ? `border: ${element.style.border};` : ''}
        ${element.style?.borderRadius ? `border-radius: ${element.style.borderRadius}px;` : ''}
        z-index: ${element.style?.zIndex || 1};
      `;

      switch (element.type) {
        case 'text':
          return `
            <div class="element element-text" style="${style} font-family: ${theme.fonts.body};">
              ${element.content.text}
            </div>`;
        case 'image':
          return `
            <div class="element" style="${style}">
              <img class="element-image" src="${element.content.url}" style="width:100%; height:100%;" />
            </div>`;
        default:
          return `<div class="element" style="${style}">${element.type}</div>`;
      }
    }).join('');
  }

  private async generateSlideImages(slides: SlideData[], exportsPath: string): Promise<string[]> {
    const imageFiles: string[] = [];

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const htmlContent = await this.createHTMLContent([slide], { options: {} } as any);
      const htmlPath = path.join(exportsPath, `slide_${i + 1}.html`);
      const imagePath = path.join(exportsPath, `slide_${i + 1}.png`);

      await fs.writeFile(htmlPath, htmlContent);

      // Convert HTML to image using Puppeteer
      await execAsync(`puppeteer screenshot "${htmlPath}" --output "${imagePath}"`);

      imageFiles.push(`slide_${i + 1}.png`);
    }

    return imageFiles;
  }

  private async generateChartImage(chartContent: any): Promise<Buffer> {
    // This would generate chart image using D3.js or similar
    return Buffer.from('Chart image placeholder');
  }

  private generateIconSVG(iconContent: any): string {
    return `<svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor"/>
    </svg>`;
  }

  // PUBLIC API METHODS
  async getPresentationList(userId: string): Promise<any[]> {
    try {
      const presentations = await this.prisma.presentation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      });

      return presentations.map(p => ({
        id: p.id,
        title: p.title,
        created_at: p.createdAt,
        updated_at: p.updatedAt,
        file_count: Object.keys((p.data as any)?.files || {}).length,
      }));
    } catch (error) {
      console.error('Get presentation list error:', error);
      return [];
    }
  }

  async getPresentationStats(presentationId: string): Promise<any> {
    try {
      const presentation = await this.getPresentation(presentationId);

      return {
        total_slides: Object.keys(presentation.slides || {}).filter(key => key.startsWith('slide_')).length,
        total_assets: {
          images: presentation.slides?.assets?.images?.length || 0,
          charts: presentation.slides?.assets?.charts?.length || 0,
          icons: presentation.slides?.assets?.icons?.length || 0,
        },
        exports_available: Object.keys(presentation.exports || {}).length,
        versions: Object.keys(presentation.versions || {}).length,
        storage_size: await this.calculateStorageSize(presentationId),
      };
    } catch (error) {
      console.error('Get presentation stats error:', error);
      return {};
    }
  }

  private async calculateStorageSize(presentationId: string): Promise<number> {
    try {
      const presentationPath = path.join(this.localStoragePath, presentationId);
      let totalSize = 0;

      const calculateSize = async (dirPath: string): Promise<number> => {
        const items = await fs.readdir(dirPath);
        let size = 0;

        for (const item of items) {
          const itemPath = path.join(dirPath, item);
          const stats = await fs.stat(itemPath);

          if (stats.isDirectory()) {
            size += await calculateSize(itemPath);
          } else {
            size += stats.size;
          }
        }

        return size;
      };

      totalSize = await calculateSize(presentationPath);
      return totalSize;
    } catch (error) {
      return 0;
    }
  }
}
