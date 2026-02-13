import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';

export interface ExportRequest {
  presentationId: string;
  format: 'pdf' | 'pptx' | 'html' | 'json' | 'png' | 'svg' | 'mp4' | 'zip';
  options: {
    quality: 'low' | 'medium' | 'high';
    includeAnimations: boolean;
    includeNotes: boolean;
    includeTransitions: boolean;
    customWatermark?: string;
    passwordProtection?: boolean;
    compressionLevel?: number;
  };
  metadata?: {
    author?: string;
    title?: string;
    description?: string;
    tags?: string[];
  };
}

export interface ExportResponse {
  downloadUrl: string;
  format: string;
  fileSize: number;
  expiresAt: string;
  metadata: {
    processingTime: number;
    slidesExported: number;
    quality: string;
    timestamp: string;
  };
}

export class ExportService {
  private prisma: PrismaClient;
  private redis: Redis;
  private s3Client: S3Client;

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
  }

  async exportPresentation(request: ExportRequest): Promise<ExportResponse> {
    const startTime = Date.now();
    
    try {
      // Get presentation data
      const presentation = await this.prisma.presentation.findUnique({
        where: { id: request.presentationId },
        include: {
          slides: {
            include: {
              elements: true
            },
            orderBy: { order: 'asc' }
          }
        }
      });

      if (!presentation) {
        throw new Error('Presentation not found');
      }

      let exportResult: ExportResponse;

      // Export based on format
      switch (request.format) {
        case 'pdf':
          exportResult = await this.exportToPDF(presentation, request);
          break;
          
        case 'pptx':
          exportResult = await this.exportToPPTX(presentation, request);
          break;
          
        case 'html':
          exportResult = await this.exportToHTML(presentation, request);
          break;
          
        case 'json':
          exportResult = await this.exportToJSON(presentation, request);
          break;
          
        case 'png':
          exportResult = await this.exportToPNG(presentation, request);
          break;
          
        case 'svg':
          exportResult = await this.exportToSVG(presentation, request);
          break;
          
        case 'mp4':
          exportResult = await this.exportToMP4(presentation, request);
          break;
          
        case 'zip':
          exportResult = await this.exportToZIP(presentation, request);
          break;
          
        default:
          throw new Error(`Unsupported export format: ${request.format}`);
      }

      // Update metadata
      exportResult.metadata.processingTime = Date.now() - startTime;
      exportResult.metadata.slidesExported = presentation.slides.length;
      exportResult.metadata.quality = request.options.quality;
      exportResult.metadata.timestamp = new Date().toISOString();

      // Log export
      await this.logExport(request, exportResult);

      return exportResult;
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  }

  private async exportToPDF(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Generate HTML first, then convert to PDF
    const htmlContent = await this.generateHTMLContent(presentation, request);
    const pdfBuffer = await this.convertHTMLToPDF(htmlContent, request);
    
    const filename = `${presentation.title}-export.pdf`;
    const url = await this.uploadToS3(pdfBuffer, filename, 'application/pdf');
    
    return {
      downloadUrl: url,
      format: 'pdf',
      fileSize: pdfBuffer.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      metadata: {
        processingTime: 0,
        slidesExported: 0,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToPPTX(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Generate PPTX structure
    const pptxContent = await this.generatePPTXContent(presentation, request);
    
    const filename = `${presentation.title}-export.pptx`;
    const url = await this.uploadToS3(pptxContent, filename, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    
    return {
      downloadUrl: url,
      format: 'pptx',
      fileSize: pptxContent.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: 0,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToHTML(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    const htmlContent = await this.generateHTMLContent(presentation, request);
    
    const filename = `${presentation.title}-export.html`;
    const url = await this.uploadToS3(htmlContent, filename, 'text/html');
    
    return {
      downloadUrl: url,
      format: 'html',
      fileSize: htmlContent.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: 0,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToJSON(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    const jsonContent = JSON.stringify({
      presentation: {
        id: presentation.id,
        title: presentation.title,
        description: presentation.description,
        createdAt: presentation.createdAt,
        updatedAt: presentation.updatedAt,
        slides: presentation.slides.map((slide: any) => ({
          id: slide.id,
          order: slide.order,
          title: slide.title,
          content: slide.content,
          background: slide.background,
          transitions: slide.transitions,
          elements: slide.elements
        }))
      },
      metadata: request.metadata,
      exportOptions: request.options,
      exportedAt: new Date().toISOString()
    }, null, 2);
    
    const filename = `${presentation.title}-export.json`;
    const url = await this.uploadToS3(jsonContent, filename, 'application/json');
    
    return {
      downloadUrl: url,
      format: 'json',
      fileSize: jsonContent.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: 0,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToPNG(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Generate PNG for each slide and create a zip
    const slideImages = await Promise.all(
      presentation.slides.map(async (slide: any, index: number) => {
        const pngBuffer = await this.convertSlideToPNG(slide, request);
        return {
          filename: `slide-${index + 1}.png`,
          buffer: pngBuffer
        };
      })
    );

    const zipBuffer = await this.createZip(slideImages);
    const filename = `${presentation.title}-export-images.zip`;
    const url = await this.uploadToS3(zipBuffer, filename, 'application/zip');
    
    return {
      downloadUrl: url,
      format: 'png',
      fileSize: zipBuffer.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: presentation.slides.length,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToSVG(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Generate SVG for each slide
    const slideSVGs = await Promise.all(
      presentation.slides.map(async (slide: any, index: number) => {
        const svgContent = await this.convertSlideToSVG(slide, request);
        return {
          filename: `slide-${index + 1}.svg`,
          content: svgContent
        };
      })
    );

    const zipBuffer = await this.createZipFromText(slideSVGs);
    const filename = `${presentation.title}-export-svgs.zip`;
    const url = await this.uploadToS3(zipBuffer, filename, 'application/zip');
    
    return {
      downloadUrl: url,
      format: 'svg',
      fileSize: zipBuffer.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: presentation.slides.length,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToMP4(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Generate video from presentation
    const videoBuffer = await this.convertPresentationToVideo(presentation, request);
    
    const filename = `${presentation.title}-export.mp4`;
    const url = await this.uploadToS3(videoBuffer, filename, 'video/mp4');
    
    return {
      downloadUrl: url,
      format: 'mp4',
      fileSize: videoBuffer.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: presentation.slides.length,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  private async exportToZIP(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    // Create a comprehensive zip with all formats
    const files: Array<{ filename: string; content?: string; buffer?: Buffer }> = [];
    
    // Add JSON
    const jsonContent = JSON.stringify(presentation, null, 2);
    files.push({ filename: 'presentation.json', content: jsonContent });
    
    // Add HTML
    const htmlContent = await this.generateHTMLContent(presentation, request);
    files.push({ filename: 'presentation.html', content: htmlContent });
    
    // Add slide images
    for (let i = 0; i < presentation.slides.length; i++) {
      const slide = presentation.slides[i];
      const pngBuffer = await this.convertSlideToPNG(slide, request);
      files.push({ filename: `slides/slide-${i + 1}.png`, buffer: pngBuffer });
    }

    const zipBuffer = await this.createZip(files);
    const filename = `${presentation.title}-complete-export.zip`;
    const url = await this.uploadToS3(zipBuffer, filename, 'application/zip');
    
    return {
      downloadUrl: url,
      format: 'zip',
      fileSize: zipBuffer.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        processingTime: 0,
        slidesExported: presentation.slides.length,
        quality: request.options.quality,
        timestamp: new Date().toISOString()
      }
    };
  }

  // HELPER METHODS
  private async generateHTMLContent(presentation: any, request: ExportRequest): Promise<string> {
    const slidesHTML = presentation.slides.map((slide: any, index: number) => `
      <div class="slide" data-slide="${index + 1}">
        <div class="slide-content">
          <h2>${slide.title}</h2>
          ${this.renderSlideElements(slide.elements, request)}
        </div>
        ${request.options.includeNotes && slide.notes ? `
          <div class="speaker-notes">
            <h4>Speaker Notes:</h4>
            <p>${slide.notes}</p>
          </div>
        ` : ''}
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${presentation.title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
          }
          .presentation {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .slide {
            min-height: 600px;
            padding: 40px;
            border-bottom: 1px solid #eee;
            position: relative;
          }
          .slide:last-child {
            border-bottom: none;
          }
          .slide-content h2 {
            margin-top: 0;
            color: #333;
            font-size: 2em;
            margin-bottom: 30px;
          }
          .element {
            margin: 15px 0;
          }
          .element.text {
            font-size: 1.1em;
            line-height: 1.6;
            color: #555;
          }
          .element.image {
            text-align: center;
            margin: 20px 0;
          }
          .element.image img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
          }
          .speaker-notes {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            margin-top: 20px;
            border-left: 4px solid #007bff;
          }
          .speaker-notes h4 {
            margin: 0 0 10px 0;
            color: #007bff;
          }
          .navigation {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .navigation button {
            margin: 0 5px;
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .navigation button:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="presentation">
          <header style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h1 style="margin: 0; font-size: 3em;">${presentation.title}</h1>
            ${presentation.description ? `<p style="margin: 20px 0 0 0; font-size: 1.2em; opacity: 0.9;">${presentation.description}</p>` : ''}
          </header>
          ${slidesHTML}
        </div>
        
        <div class="navigation">
          <button onclick="previousSlide()">Previous</button>
          <span id="slide-counter">1 / ${presentation.slides.length}</span>
          <button onclick="nextSlide()">Next</button>
        </div>
        
        <script>
          let currentSlide = 1;
          const totalSlides = ${presentation.slides.length};
          
          function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            if (n > totalSlides) currentSlide = 1;
            if (n < 1) currentSlide = totalSlides;
            
            slides.forEach((slide, index) => {
              slide.style.display = index + 1 === currentSlide ? 'block' : 'none';
            });
            
            document.getElementById('slide-counter').textContent = currentSlide + ' / ' + totalSlides;
          }
          
          function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
          }
          
          function previousSlide() {
            currentSlide--;
            showSlide(currentSlide);
          }
          
          // Initialize
          showSlide(1);
          
          // Keyboard navigation
          document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') previousSlide();
          });
        </script>
      </body>
      </html>
    `;
  }

  private renderSlideElements(elements: any[], request: ExportRequest): string {
    return elements.map(element => {
      switch (element.type) {
        case 'text':
          return `<div class="element text">${element.content.text || element.content}</div>`;
          
        case 'image':
          return `
            <div class="element image">
              <img src="${element.content.url || element.content.src}" alt="${element.content.alt || ''}" />
              ${element.content.caption ? `<p style="text-align: center; margin-top: 10px; font-style: italic; color: #666;">${element.content.caption}</p>` : ''}
            </div>
          `;
          
        case 'shape':
          return `
            <div class="element shape" style="
              width: ${element.content.width || 100}px;
              height: ${element.content.height || 100}px;
              background: ${element.content.fill || '#f0f0f0'};
              border: ${element.content.stroke || '1px solid #ccc'};
              border-radius: ${element.content.borderRadius || 0}px;
              margin: 20px auto;
            "></div>
          `;
          
        case 'chart':
          return `
            <div class="element chart">
              <div style="width: 100%; height: 300px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #6c757d;">
                Chart: ${element.content.title || 'Untitled Chart'}
              </div>
            </div>
          `;
          
        default:
          return `<div class="element">Unknown element type: ${element.type}</div>`;
      }
    }).join('');
  }

  private async generatePPTXContent(presentation: any, request: ExportRequest): Promise<Buffer> {
    // This would use a library like pptxgenjs or similar
    // For now, return a placeholder
    const pptxStructure = {
      title: presentation.title,
      slides: presentation.slides.map((slide: any) => ({
        title: slide.title,
        content: slide.content,
        elements: slide.elements
      }))
    };
    
    return Buffer.from(JSON.stringify(pptxStructure, null, 2));
  }

  private async convertHTMLToPDF(html: string, request: ExportRequest): Promise<Buffer> {
    // This would use a library like puppeteer or similar
    // For now, return a placeholder
    return Buffer.from(`PDF conversion of HTML content (${html.length} chars)`);
  }

  private async convertSlideToPNG(slide: any, request: ExportRequest): Promise<Buffer> {
    // This would use a library like puppeteer or canvas
    // For now, return a placeholder
    return Buffer.from(`PNG conversion of slide: ${slide.title}`);
  }

  private async convertSlideToSVG(slide: any, request: ExportRequest): Promise<string> {
    // Generate SVG representation of slide
    return `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect width="1920" height="1080" fill="#ffffff"/>
        <text x="100" y="100" font-family="Arial" font-size="48" fill="#333333">${slide.title}</text>
        ${slide.elements.map((element: any, index: number) => {
          if (element.type === 'text') {
            return `<text x="100" y="${200 + index * 60}" font-family="Arial" font-size="24" fill="#555555">${element.content.text || element.content}</text>`;
          }
          return '';
        }).join('')}
      </svg>
    `;
  }

  private async convertPresentationToVideo(presentation: any, request: ExportRequest): Promise<Buffer> {
    // This would use a video generation library or service
    // For now, return a placeholder
    return Buffer.from(`Video conversion of presentation: ${presentation.title}`);
  }

  private async createZip(files: any[]): Promise<Buffer> {
    // This would use a library like jszip
    // For now, return a placeholder
    return Buffer.from(`ZIP archive with ${files.length} files`);
  }

  private async createZipFromText(files: any[]): Promise<Buffer> {
    // This would use a library like jszip
    // For now, return a placeholder
    return Buffer.from(`ZIP archive with ${files.length} text files`);
  }

  private async uploadToS3(content: Buffer | string, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `exports/${Date.now()}-${filename}`,
        Body: content,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/exports/${Date.now()}-${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private async logExport(request: ExportRequest, response: ExportResponse): Promise<void> {
    try {
      await this.prisma.export.create({
        data: {
          presentationId: request.presentationId,
          format: request.format,
          options: request.options,
          fileSize: response.fileSize,
          downloadUrl: response.downloadUrl,
          expiresAt: new Date(response.expiresAt),
          processingTime: response.metadata.processingTime,
          createdAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log export:', error);
    }
  }

  async getExportHistory(presentationId: string): Promise<any[]> {
    try {
      return await this.prisma.export.findMany({
        where: { presentationId },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
    } catch (error) {
      console.error('Failed to get export history:', error);
      return [];
    }
  }

  async deleteExpiredExports(): Promise<void> {
    try {
      const expiredExports = await this.prisma.export.findMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      });

      for (const exportRecord of expiredExports) {
        // Delete from S3
        // This would involve parsing the URL and deleting the object
        
        // Delete from database
        await this.prisma.export.delete({
          where: { id: exportRecord.id }
        });
      }
    } catch (error) {
      console.error('Failed to delete expired exports:', error);
    }
  }
}
