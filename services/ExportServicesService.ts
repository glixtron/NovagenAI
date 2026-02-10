import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import puppeteer from 'puppeteer';
import ffmpeg from 'fluent-ffmpeg';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ExportRequest {
  presentationId: string;
  format: 'pdf' | 'pptx' | 'html' | 'mp4' | 'gif' | 'png' | 'svg' | 'json';
  engine: 'puppeteer' | 'playwright' | 'ffmpeg' | 'libreoffice' | 'onlyoffice';
  options: {
    quality?: 'low' | 'medium' | 'high' | 'ultra';
    resolution?: '720p' | '1080p' | '4k';
    fps?: number;
    duration?: number;
    transitions?: boolean;
    animations?: boolean;
    audio?: boolean;
    watermark?: string;
    password?: string;
    compression?: number;
    template?: string;
    customCSS?: string;
    customJS?: string;
  };
  metadata?: {
    title?: string;
    author?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface ExportResponse {
  downloadUrl: string;
  format: string;
  engine: string;
  fileSize: number;
  pageCount?: number;
  duration?: number;
  resolution?: string;
  metadata: {
    processingTime: number;
    cacheHit: boolean;
    timestamp: string;
    cost?: number;
  };
}

export interface BatchExportRequest {
  presentationIds: string[];
  formats: string[];
  engine: string;
  options: any;
  zipOutput?: boolean;
}

export class ExportServicesService {
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

  // MAIN EXPORT METHODS
  async exportPresentation(request: ExportRequest): Promise<ExportResponse> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = `export:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        const response = JSON.parse(cached);
        response.metadata.cacheHit = true;
        return response;
      }

      // Get presentation data
      const presentation = await this.getPresentationData(request.presentationId);
      
      let response: ExportResponse;

      switch (request.engine) {
        case 'puppeteer':
          response = await this.exportWithPuppeteer(presentation, request);
          break;
        case 'playwright':
          response = await this.exportWithPlaywright(presentation, request);
          break;
        case 'ffmpeg':
          response = await this.exportWithFFmpeg(presentation, request);
          break;
        case 'libreoffice':
          response = await this.exportWithLibreOffice(presentation, request);
          break;
        case 'onlyoffice':
          response = await this.exportWithOnlyOffice(presentation, request);
          break;
        default:
          throw new Error(`Unsupported export engine: ${request.engine}`);
      }

      response.metadata.processingTime = Date.now() - startTime;
      response.metadata.cacheHit = false;
      response.metadata.timestamp = new Date().toISOString();

      // Cache the result
      await this.redis.setex(cacheKey, 1800, JSON.stringify(response)); // 30 minutes cache
      
      // Log export for analytics
      await this.logExport(request, response);
      
      return response;
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  }

  // PUPPETER EXPORTS
  private async exportWithPuppeteer(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // Generate HTML content
      const html = await this.generatePresentationHTML(presentation, request);
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      let result: ExportResponse;

      switch (request.format) {
        case 'pdf':
          result = await this.exportPDFWithPuppeteer(page, request);
          break;
        case 'png':
          result = await this.exportPNGWithPuppeteer(page, request);
          break;
        case 'svg':
          result = await this.exportSVGWithPuppeteer(page, request);
          break;
        default:
          throw new Error(`Unsupported Puppeteer format: ${request.format}`);
      }

      await browser.close();
      
      return {
        ...result,
        engine: 'puppeteer',
        format: request.format,
      };
    } catch (error) {
      console.error('Puppeteer export error:', error);
      throw error;
    }
  }

  private async exportPDFWithPuppeteer(page: puppeteer.Page, request: ExportRequest): Promise<ExportResponse> {
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size:10px; width:100%; text-align:center; padding:5px;">
          ${request.metadata?.title || 'Presentation'}
        </div>
      `,
      footerTemplate: `
        <div style="font-size:10px; width:100%; text-align:center; padding:5px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `
    });

    const filename = `presentation-${Date.now()}.pdf`;
    const url = await this.uploadToS3(pdfBuffer, filename, 'application/pdf');
    
    return {
      downloadUrl: url,
      fileSize: pdfBuffer.length,
      pageCount: await this.getPageCount(pdfBuffer),
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  private async exportPNGWithPuppeteer(page: puppeteer.Page, request: ExportRequest): Promise<ExportResponse> {
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
      quality: this.getQualityValue(request.options.quality || 'medium')
    });

    const filename = `presentation-${Date.now()}.png`;
    const url = await this.uploadToS3(screenshot, filename, 'image/png');
    
    return {
      downloadUrl: url,
      fileSize: screenshot.length,
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  private async exportSVGWithPuppeteer(page: puppeteer.Page, request: ExportRequest): Promise<ExportResponse> {
    // Extract SVG content from the page
    const svgContent = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      return svg ? svg.outerHTML : '';
    });

    const svgBuffer = Buffer.from(svgContent, 'utf-8');
    const filename = `presentation-${Date.now()}.svg`;
    const url = await this.uploadToS3(svgBuffer, filename, 'image/svg+xml');
    
    return {
      downloadUrl: url,
      fileSize: svgBuffer.length,
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  // PLAYWRIGHT EXPORTS
  private async exportWithPlaywright(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      const { chromium } = require('playwright');
      const browser = await chromium.launch();
      const page = await browser.newPage();
      
      const html = await this.generatePresentationHTML(presentation, request);
      await page.setContent(html);
      
      let result: ExportResponse;

      switch (request.format) {
        case 'pdf':
          result = await this.exportPDFWithPlaywright(page, request);
          break;
        case 'png':
          result = await this.exportPNGWithPlaywright(page, request);
          break;
        case 'html':
          result = await this.exportHTMLWithPlaywright(page, request);
          break;
        default:
          throw new Error(`Unsupported Playwright format: ${request.format}`);
      }

      await browser.close();
      
      return {
        ...result,
        engine: 'playwright',
        format: request.format,
      };
    } catch (error) {
      console.error('Playwright export error:', error);
      throw error;
    }
  }

  private async exportPDFWithPlaywright(page: any, request: ExportRequest): Promise<ExportResponse> {
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    });

    const filename = `presentation-${Date.now()}.pdf`;
    const url = await this.uploadToS3(pdfBuffer, filename, 'application/pdf');
    
    return {
      downloadUrl: url,
      fileSize: pdfBuffer.length,
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  private async exportPNGWithPlaywright(page: any, request: ExportRequest): Promise<ExportResponse> {
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png'
    });

    const filename = `presentation-${Date.now()}.png`;
    const url = await this.uploadToS3(screenshot, filename, 'image/png');
    
    return {
      downloadUrl: url,
      fileSize: screenshot.length,
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  private async exportHTMLWithPlaywright(page: any, request: ExportRequest): Promise<ExportResponse> {
    const html = await page.content();
    const htmlBuffer = Buffer.from(html, 'utf-8');
    const filename = `presentation-${Date.now()}.html`;
    const url = await this.uploadToS3(htmlBuffer, filename, 'text/html');
    
    return {
      downloadUrl: url,
      fileSize: htmlBuffer.length,
      metadata: {
        processingTime: 0,
        cacheHit: false,
        timestamp: new Date().toISOString(),
      }
    };
  }

  // FFMPEG EXPORTS
  private async exportWithFFmpeg(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      switch (request.format) {
        case 'mp4':
          return await this.exportMP4WithFFmpeg(presentation, request);
        case 'gif':
          return await this.exportGIFWithFFmpeg(presentation, request);
        default:
          throw new Error(`Unsupported FFmpeg format: ${request.format}`);
      }
    } catch (error) {
      console.error('FFmpeg export error:', error);
      throw error;
    }
  }

  private async exportMP4WithFFmpeg(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      // First generate individual slide images
      const slideImages = await this.generateSlideImages(presentation, request);
      
      // Create FFmpeg command
      const outputPath = `/tmp/presentation-${Date.now()}.mp4`;
      const fps = request.options.fps || 30;
      const duration = request.options.duration || 5; // seconds per slide
      
      const ffmpegCommand = ffmpeg()
        .input(`concat:${slideImages.join('|')}`)
        .inputFPS(fps)
        .duration(duration * slideImages.length)
        .videoCodec('libx264')
        .audioCodec('aac')
        .size(`${this.getResolutionWidth(request.options.resolution || '1080p')}x${this.getResolutionHeight(request.options.resolution || '1080p')}`)
        .output(outputPath);

      // Execute FFmpeg
      await new Promise((resolve, reject) => {
        ffmpegCommand
          .on('end', resolve)
          .on('error', reject)
          .run();
      });

      // Read the output file
      const videoBuffer = await this.readFile(outputPath);
      
      // Upload to S3
      const filename = `presentation-${Date.now()}.mp4`;
      const url = await this.uploadToS3(videoBuffer, filename, 'video/mp4');
      
      // Clean up temporary files
      await this.cleanupFiles([...slideImages, outputPath]);
      
      return {
        downloadUrl: url,
        fileSize: videoBuffer.length,
        duration: duration * slideImages.length,
        resolution: request.options.resolution || '1080p',
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('FFmpeg MP4 export error:', error);
      throw error;
    }
  }

  private async exportGIFWithFFmpeg(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      const slideImages = await this.generateSlideImages(presentation, request);
      
      const outputPath = `/tmp/presentation-${Date.now()}.gif`;
      const fps = request.options.fps || 10;
      const duration = request.options.duration || 2; // seconds per slide
      
      const ffmpegCommand = ffmpeg()
        .input(`concat:${slideImages.join('|')}`)
        .inputFPS(fps)
        .duration(duration * slideImages.length)
        .outputFormat('gif')
        .output(outputPath);

      await new Promise((resolve, reject) => {
        ffmpegCommand
          .on('end', resolve)
          .on('error', reject)
          .run();
      });

      const gifBuffer = await this.readFile(outputPath);
      const filename = `presentation-${Date.now()}.gif`;
      const url = await this.uploadToS3(gifBuffer, filename, 'image/gif');
      
      await this.cleanupFiles([...slideImages, outputPath]);
      
      return {
        downloadUrl: url,
        fileSize: gifBuffer.length,
        duration: duration * slideImages.length,
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('FFmpeg GIF export error:', error);
      throw error;
    }
  }

  // LIBREOFFICE EXPORTS
  private async exportWithLibreOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      switch (request.format) {
        case 'pptx':
          return await this.exportPPTXWithLibreOffice(presentation, request);
        case 'pdf':
          return await this.exportPDFWithLibreOffice(presentation, request);
        default:
          throw new Error(`Unsupported LibreOffice format: ${request.format}`);
      }
    } catch (error) {
      console.error('LibreOffice export error:', error);
      throw error;
    }
  }

  private async exportPPTXWithLibreOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      // Generate PPTX XML structure
      const pptxBuffer = await this.generatePPTXContent(presentation, request);
      
      const filename = `presentation-${Date.now()}.pptx`;
      const url = await this.uploadToS3(pptxBuffer, filename, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      
      return {
        downloadUrl: url,
        fileSize: pptxBuffer.length,
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('LibreOffice PPTX export error:', error);
      throw error;
    }
  }

  private async exportPDFWithLibreOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      // Convert to HTML first, then use LibreOffice to convert to PDF
      const html = await this.generatePresentationHTML(presentation, request);
      const htmlPath = `/tmp/presentation-${Date.now()}.html`;
      
      await this.writeFile(htmlPath, html);
      
      const outputPath = `/tmp/presentation-${Date.now()}.pdf`;
      
      // Use LibreOffice headless conversion
      await execAsync(`libreoffice --headless --convert-to pdf --outdir /tmp ${htmlPath}`);
      
      const pdfBuffer = await this.readFile(outputPath);
      const filename = `presentation-${Date.now()}.pdf`;
      const url = await this.uploadToS3(pdfBuffer, filename, 'application/pdf');
      
      await this.cleanupFiles([htmlPath, outputPath]);
      
      return {
        downloadUrl: url,
        fileSize: pdfBuffer.length,
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('LibreOffice PDF export error:', error);
      throw error;
    }
  }

  // ONLYOFFICE EXPORTS
  private async exportWithOnlyOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      switch (request.format) {
        case 'pptx':
          return await this.exportPPTXWithOnlyOffice(presentation, request);
        case 'pdf':
          return await this.exportPDFWithOnlyOffice(presentation, request);
        default:
          throw new Error(`Unsupported OnlyOffice format: ${request.format}`);
      }
    } catch (error) {
      console.error('OnlyOffice export error:', error);
      throw error;
    }
  }

  private async exportPPTXWithOnlyOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      // Use OnlyOffice Document Server API
      const pptxBuffer = await this.generateOnlyOfficePPTX(presentation, request);
      
      const filename = `presentation-${Date.now()}.pptx`;
      const url = await this.uploadToS3(pptxBuffer, filename, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      
      return {
        downloadUrl: url,
        fileSize: pptxBuffer.length,
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('OnlyOffice PPTX export error:', error);
      throw error;
    }
  }

  private async exportPDFWithOnlyOffice(presentation: any, request: ExportRequest): Promise<ExportResponse> {
    try {
      // Convert to PPTX first, then use OnlyOffice to convert to PDF
      const pptxBuffer = await this.generateOnlyOfficePPTX(presentation, request);
      const pptxPath = `/tmp/presentation-${Date.now()}.pptx`;
      
      await this.writeFile(pptxPath, pptxBuffer);
      
      // Use OnlyOffice Document Server API for conversion
      const pdfBuffer = await this.convertOnlyOfficeToPDF(pptxPath);
      
      const filename = `presentation-${Date.now()}.pdf`;
      const url = await this.uploadToS3(pdfBuffer, filename, 'application/pdf');
      
      await this.cleanupFiles([pptxPath]);
      
      return {
        downloadUrl: url,
        fileSize: pdfBuffer.length,
        metadata: {
          processingTime: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('OnlyOffice PDF export error:', error);
      throw error;
    }
  }

  // HELPER METHODS
  private async getPresentationData(presentationId: string): Promise<any> {
    const presentation = await this.prisma.presentation.findUnique({
      where: { id: presentationId },
      include: {
        slides: {
          include: {
            elements: true,
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!presentation) {
      throw new Error('Presentation not found');
    }

    return presentation;
  }

  private async generatePresentationHTML(presentation: any, request: ExportRequest): Promise<string> {
    const slidesHTML = presentation.slides.map((slide: any, index: number) => `
      <div class="slide" data-slide="${index + 1}">
        <div class="slide-content">
          <h2>${slide.title}</h2>
          ${this.renderSlideElements(slide.elements)}
        </div>
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
          ${this.generateCSS(request)}
        </style>
        ${request.options.customJS || ''}
      </head>
      <body>
        <div class="presentation">
          <header>
            <h1>${presentation.title}</h1>
            ${presentation.description ? `<p>${presentation.description}</p>` : ''}
          </header>
          ${slidesHTML}
        </div>
        ${request.options.customJS || ''}
      </body>
      </html>
    `;
  }

  private generateCSS(request: ExportRequest): string {
    return `
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
        page-break-after: always;
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
      ${request.options.customCSS || ''}
    `;
  }

  private renderSlideElements(elements: any[]): string {
    return elements.map(element => {
      switch (element.type) {
        case 'text':
          return `<div class="element text">${element.content.text || element.content}</div>`;
        case 'image':
          return `
            <div class="element image">
              <img src="${element.content.url}" alt="${element.content.alt || ''}" />
            </div>
          `;
        default:
          return `<div class="element">Unknown element type: ${element.type}</div>`;
      }
    }).join('');
  }

  private async generateSlideImages(presentation: any, request: ExportRequest): Promise<string[]> {
    const slideImages: string[] = [];
    
    for (let i = 0; i < presentation.slides.length; i++) {
      const slide = presentation.slides[i];
      const html = this.generateSlideHTML(slide, request);
      
      // Use Puppeteer to capture slide as image
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: true
      });
      
      const imagePath = `/tmp/slide-${i}-${Date.now()}.png`;
      await this.writeFile(imagePath, screenshot);
      slideImages.push(imagePath);
      
      await browser.close();
    }
    
    return slideImages;
  }

  private generateSlideHTML(slide: any, request: ExportRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: white;
            width: 1920px;
            height: 1080px;
            overflow: hidden;
          }
          .slide-title {
            font-size: 48px;
            margin-bottom: 40px;
            color: #333;
          }
          .element {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <h1 class="slide-title">${slide.title}</h1>
        ${this.renderSlideElements(slide.elements)}
      </body>
      </html>
    `;
  }

  private async generatePPTXContent(presentation: any, request: ExportRequest): Promise<Buffer> {
    // This would generate a proper PPTX file structure
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

  private async generateOnlyOfficePPTX(presentation: any, request: ExportRequest): Promise<Buffer> {
    // This would use OnlyOffice API to generate PPTX
    // For now, return a placeholder
    return Buffer.from('OnlyOffice PPTX content');
  }

  private async convertOnlyOfficeToPDF(pptxPath: string): Promise<Buffer> {
    // This would use OnlyOffice Document Server API
    // For now, return a placeholder
    return Buffer.from('PDF content from OnlyOffice');
  }

  private getQualityValue(quality: string): number {
    const qualityMap = {
      'low': 50,
      'medium': 80,
      'high': 90,
      'ultra': 100
    };
    
    return qualityMap[quality as keyof typeof qualityMap] || 80;
  }

  private getResolutionWidth(resolution: string): number {
    const resolutionMap = {
      '720p': 1280,
      '1080p': 1920,
      '4k': 3840
    };
    
    return resolutionMap[resolution as keyof typeof resolutionMap] || 1920;
  }

  private getResolutionHeight(resolution: string): number {
    const resolutionMap = {
      '720p': 720,
      '1080p': 1080,
      '4k': 2160
    };
    
    return resolutionMap[resolution as keyof typeof resolutionMap] || 1080;
  }

  private async getPageCount(pdfBuffer: Buffer): Promise<number> {
    // This would parse PDF to get page count
    // For now, return a placeholder
    return 10;
  }

  private async uploadToS3(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `exports/${filename}`,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/exports/${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private async readFile(path: string): Promise<Buffer> {
    const fs = require('fs').promises;
    return await fs.readFile(path);
  }

  private async writeFile(path: string, content: string | Buffer): Promise<void> {
    const fs = require('fs').promises;
    await fs.writeFile(path, content);
  }

  private async cleanupFiles(paths: string[]): Promise<void> {
    const fs = require('fs').promises;
    for (const path of paths) {
      try {
        await fs.unlink(path);
      } catch (error) {
        console.error(`Failed to delete file ${path}:`, error);
      }
    }
  }

  private async logExport(request: ExportRequest, response: ExportResponse): Promise<void> {
    try {
      await this.prisma.analytics.create({
        data: {
          event: 'EXPORT_REQUEST',
          properties: {
            presentationId: request.presentationId,
            format: request.format,
            engine: request.engine,
            options: request.options,
            fileSize: response.fileSize,
            processingTime: response.metadata.processingTime
          },
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log export:', error);
    }
  }

  // BATCH EXPORTS
  async batchExport(request: BatchExportRequest): Promise<any> {
    const results = [];
    
    for (const presentationId of request.presentationIds) {
      for (const format of request.formats) {
        const exportRequest: ExportRequest = {
          presentationId,
          format: format as any,
          engine: request.engine as any,
          options: request.options
        };
        
        try {
          const result = await this.exportPresentation(exportRequest);
          results.push({
            presentationId,
            format,
            success: true,
            result
          });
        } catch (error) {
          results.push({
            presentationId,
            format,
            success: false,
            error: error.message
          });
        }
      }
    }
    
    if (request.zipOutput) {
      // Create ZIP file with all exports
      const zipBuffer = await this.createZipFromResults(results);
      const filename = `batch-export-${Date.now()}.zip`;
      const url = await this.uploadToS3(zipBuffer, filename, 'application/zip');
      
      return {
        zipUrl: url,
        results,
        metadata: {
          totalExports: results.length,
          successful: results.filter(r => r.success).length,
          failed: results.filter(r => !r.success).length,
          timestamp: new Date().toISOString()
        }
      };
    }
    
    return { results };
  }

  private async createZipFromResults(results: any[]): Promise<Buffer> {
    // This would create a ZIP file with all export results
    // For now, return a placeholder
    return Buffer.from('ZIP archive content');
  }

  // EXPORT TEMPLATES
  async getExportTemplates(): Promise<any[]> {
    return [
      {
        id: 'professional-pdf',
        name: 'Professional PDF',
        format: 'pdf',
        engine: 'puppeteer',
        options: {
          quality: 'high',
          template: 'professional',
          customCSS: 'professional-styles.css'
        }
      },
      {
        id: 'video-presentation',
        name: 'Video Presentation',
        format: 'mp4',
        engine: 'ffmpeg',
        options: {
          resolution: '1080p',
          fps: 30,
          duration: 5,
          transitions: true
        }
      },
      {
        id: 'powerpoint-export',
        name: 'PowerPoint Export',
        format: 'pptx',
        engine: 'libreoffice',
        options: {
          template: 'corporate',
          animations: true
        }
      }
    ];
  }

  // EXPORT STATISTICS
  async getExportStatistics(userId?: string): Promise<any> {
    try {
      const whereClause = userId ? { userId } : {};
      
      const stats = await this.prisma.export.groupBy({
        by: ['format', 'engine'],
        where: whereClause,
        _count: true,
        _sum: {
          fileSize: true,
          processingTime: true
        }
      });

      return {
        totalExports: stats.reduce((sum, stat) => sum + stat._count, 0),
        averageFileSize: stats.reduce((sum, stat) => sum + (stat._sum.fileSize || 0), 0) / stats.length,
        averageProcessingTime: stats.reduce((sum, stat) => sum + (stat._sum.processingTime || 0), 0) / stats.length,
        byFormat: stats.map(stat => ({
          format: stat.format,
          count: stat._count,
          totalSize: stat._sum.fileSize,
          avgTime: stat._sum.processingTime
        })),
        byEngine: stats.map(stat => ({
          engine: stat.engine,
          count: stat._count,
          totalSize: stat._sum.fileSize,
          avgTime: stat._sum.processingTime
        }))
      };
    } catch (error) {
      console.error('Failed to get export statistics:', error);
      return {};
    }
  }
}
