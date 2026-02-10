import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import fetch from 'node-fetch';

export interface LayoutAnalysisRequest {
  slideData: any;
  analysisType: 'visual-balance' | 'color-harmony' | 'typography' | 'all';
  options?: {
    includeSuggestions?: boolean;
    detailLevel?: 'basic' | 'detailed' | 'comprehensive';
    targetAudience?: 'professional' | 'creative' | 'academic' | 'marketing';
  };
}

export interface LayoutAnalysisResponse {
  visualBalance?: {
    score: number;
    elements: Array<{
      type: string;
      position: { x: number; y: number };
      weight: number;
      balance: 'balanced' | 'unbalanced';
      suggestions: string[];
    }>;
    overallBalance: 'excellent' | 'good' | 'fair' | 'poor';
    recommendations: string[];
  };
  colorHarmony?: {
    score: number;
    palette: Array<{
      color: string;
      hex: string;
      usage: number;
      harmony: 'harmonious' | 'clashing' | 'neutral';
    }>;
    harmonyType: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic';
    contrastRatio: number;
    accessibility: 'AA' | 'AAA' | 'fail';
    suggestions: string[];
  };
  typography?: {
    score: number;
    fonts: Array<{
      family: string;
      size: number;
      weight: string;
      usage: number;
      readability: number;
    }>;
    spacing: {
      lineSpacing: number;
      paragraphSpacing: number;
      headingSpacing: number;
      consistency: number;
    };
    hierarchy: {
      hasClearHierarchy: boolean;
      headingLevels: number;
      consistency: number;
    };
    recommendations: string[];
  };
  overallScore: number;
  suggestions: string[];
  metadata: {
    processingTime: number;
    elementsAnalyzed: number;
    timestamp: string;
  };
}

export interface ImageProcessingRequest {
  imageUrl: string;
  operations: Array<{
    type: 'background-removal' | 'enhancement' | 'smart-crop' | 'resize' | 'optimize';
    parameters?: any;
  }>;
  options?: {
    quality?: 'low' | 'medium' | 'high';
    format?: 'png' | 'jpg' | 'webp';
    preserveMetadata?: boolean;
  };
}

export interface ImageProcessingResponse {
  processedUrl: string;
  originalUrl: string;
  operations: Array<{
    type: string;
    success: boolean;
    result?: any;
    error?: string;
  }>;
  metadata: {
    originalSize: number;
    processedSize: number;
    compressionRatio: number;
    processingTime: number;
    format: string;
  };
}

export interface ChartRecognitionRequest {
  imageUrl: string;
  chartType?: 'auto' | 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar';
  extractData?: boolean;
  options?: {
    confidence?: number;
    includeLabels?: boolean;
    dataFormat?: 'json' | 'csv' | 'excel';
  };
}

export interface ChartRecognitionResponse {
  detectedChartType: string;
  confidence: number;
  data?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
    }>;
  };
  elements: Array<{
    type: 'title' | 'legend' | 'axis' | 'data-point' | 'grid';
    position: { x: number; y: number; width: number; height: number };
    content?: string;
    confidence: number;
  }>;
  metadata: {
    processingTime: number;
    imageDimensions: { width: number; height: number };
    accuracy: number;
  };
}

export class LayoutOptimizationService {
  private prisma: PrismaClient;
  private redis: Redis;
  private s3Client: S3Client;
  private removeBgApiKey: string;
  private cloudinaryConfig: any;

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

    this.removeBgApiKey = process.env.REMOVE_BG_API_KEY || '';
    this.cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    };
  }

  // LAYOUT ANALYSIS METHODS
  async analyzeLayout(request: LayoutAnalysisRequest): Promise<LayoutAnalysisResponse> {
    const startTime = Date.now();
    const response: LayoutAnalysisResponse = {
      overallScore: 0,
      suggestions: [],
      metadata: {
        processingTime: 0,
        elementsAnalyzed: 0,
        timestamp: new Date().toISOString()
      }
    };

    try {
      // Check cache first
      const cacheKey = `layout-analysis:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      // Count elements
      const elements = this.extractElements(request.slideData);
      response.metadata.elementsAnalyzed = elements.length;

      // Perform requested analyses
      if (request.analysisType === 'all' || request.analysisType === 'visual-balance') {
        response.visualBalance = await this.analyzeVisualBalance(elements, request.options);
      }

      if (request.analysisType === 'all' || request.analysisType === 'color-harmony') {
        response.colorHarmony = await this.analyzeColorHarmony(elements, request.options);
      }

      if (request.analysisType === 'all' || request.analysisType === 'typography') {
        response.typography = await this.analyzeTypography(elements, request.options);
      }

      // Calculate overall score
      const scores = [];
      if (response.visualBalance) scores.push(response.visualBalance.score);
      if (response.colorHarmony) scores.push(response.colorHarmony.score);
      if (response.typography) scores.push(response.typography.score);
      
      response.overallScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

      // Collect all suggestions
      if (response.visualBalance) response.suggestions.push(...response.visualBalance.recommendations);
      if (response.colorHarmony) response.suggestions.push(...response.colorHarmony.suggestions);
      if (response.typography) response.suggestions.push(...response.typography.recommendations);

      response.metadata.processingTime = Date.now() - startTime;

      // Cache the result
      await this.redis.setex(cacheKey, 1800, JSON.stringify(response)); // 30 minutes cache
      
      return response;
    } catch (error) {
      console.error('Layout analysis error:', error);
      throw error;
    }
  }

  private async analyzeVisualBalance(elements: any[], options?: any): Promise<any> {
    const balanceScore = this.calculateBalanceScore(elements);
    const elementAnalysis = elements.map(element => ({
      type: element.type,
      position: { x: element.x || 0, y: element.y || 0 },
      weight: this.calculateElementWeight(element),
      balance: this.isElementBalanced(element, elements),
      suggestions: this.getElementBalanceSuggestions(element, elements)
    }));

    const overallBalance = this.getOverallBalance(balanceScore);

    return {
      score: balanceScore,
      elements: elementAnalysis,
      overallBalance,
      recommendations: this.getBalanceRecommendations(balanceScore, overallBalance)
    };
  }

  private async analyzeColorHarmony(elements: any[], options?: any): Promise<any> {
    const colors = this.extractColors(elements);
    const harmonyScore = this.calculateHarmonyScore(colors);
    const harmonyType = this.detectHarmonyType(colors);
    const contrastRatio = this.calculateContrastRatio(colors);
    const accessibility = this.checkAccessibility(contrastRatio);

    const palette = colors.map(color => ({
      color: color.name,
      hex: color.hex,
      usage: color.usage,
      harmony: this.getColorCompatibility(color.hex, colors.map(c => c.hex))
    }));

    return {
      score: harmonyScore,
      palette,
      harmonyType,
      contrastRatio,
      accessibility,
      suggestions: this.getColorSuggestions(harmonyScore, accessibility, harmonyType)
    };
  }

  private async analyzeTypography(elements: any[], options?: any): Promise<any> {
    const textElements = elements.filter(e => e.type === 'text');
    const fonts = this.analyzeFonts(textElements);
    const spacing = this.analyzeSpacing(textElements);
    const hierarchy = this.analyzeHierarchy(textElements);
    const typographyScore = this.calculateTypographyScore(fonts, spacing, hierarchy);

    return {
      score: typographyScore,
      fonts,
      spacing,
      hierarchy,
      recommendations: this.getTypographyRecommendations(fonts, spacing, hierarchy)
    };
  }

  // IMAGE PROCESSING METHODS
  async processImage(request: ImageProcessingRequest): Promise<ImageProcessingResponse> {
    const startTime = Date.now();
    
    try {
      // Get original image info
      const originalInfo = await this.getImageInfo(request.imageUrl);
      let processedUrl = request.imageUrl;
      const operations = [];

      // Process each operation
      for (const operation of request.operations) {
        try {
          let result;
          
          switch (operation.type) {
            case 'background-removal':
              result = await this.removeBackground(processedUrl);
              processedUrl = result.url;
              break;
              
            case 'enhancement':
              result = await this.enhanceImage(processedUrl, operation.parameters);
              processedUrl = result.url;
              break;
              
            case 'smart-crop':
              result = await this.smartCrop(processedUrl, operation.parameters);
              processedUrl = result.url;
              break;
              
            case 'resize':
              result = await this.resizeImage(processedUrl, operation.parameters);
              processedUrl = result.url;
              break;
              
            case 'optimize':
              result = await this.optimizeImage(processedUrl, operation.parameters);
              processedUrl = result.url;
              break;
              
            default:
              throw new Error(`Unsupported operation: ${operation.type}`);
          }

          operations.push({
            type: operation.type,
            success: true,
            result
          });
        } catch (error) {
          operations.push({
            type: operation.type,
            success: false,
            error: error.message
          });
        }
      }

      // Get processed image info
      const processedInfo = await this.getImageInfo(processedUrl);

      return {
        processedUrl,
        originalUrl: request.imageUrl,
        operations,
        metadata: {
          originalSize: originalInfo.size,
          processedSize: processedInfo.size,
          compressionRatio: processedInfo.size / originalInfo.size,
          processingTime: Date.now() - startTime,
          format: processedInfo.format
        }
      };
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }

  private async removeBackground(imageUrl: string): Promise<any> {
    try {
      // Download image
      const imageBuffer = await this.downloadImage(imageUrl);
      
      // Call Remove.bg API
      const formData = new FormData();
      formData.append('image_file', imageBuffer, 'image.png');
      formData.append('size', 'auto');
      formData.append('format', 'png');
      formData.append('type', 'person'); // or 'car', 'product', etc.

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': this.removeBgApiKey,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Remove.bg API error: ${response.statusText}`);
      }

      const resultBuffer = Buffer.from(await response.arrayBuffer());
      
      // Upload to S3
      const filename = `bg-removed-${Date.now()}.png`;
      const url = await this.uploadToS3(resultBuffer, filename, 'image/png');
      
      return { url, size: resultBuffer.length };
    } catch (error) {
      console.error('Background removal error:', error);
      throw error;
    }
  }

  private async enhanceImage(imageUrl: string, parameters?: any): Promise<any> {
    try {
      // Use Cloudinary AI enhancement
      const enhancements = [
        'gen_restore',        // Automatic quality restoration
        'gen_fill',          // Generative fill
        'gen_replace',       // Generative replace
        'improve',           // Automatic improvement
        'sharpen',           // Sharpening
        'contrast',           // Contrast adjustment
      ];

      const transformation = enhancements.join('/') + parameters?.quality ? `/q_${parameters.quality}` : '';
      
      const cloudinaryUrl = this.buildCloudinaryUrl(imageUrl, transformation);
      
      return { url: cloudinaryUrl };
    } catch (error) {
      console.error('Image enhancement error:', error);
      throw error;
    }
  }

  private async smartCrop(imageUrl: string, parameters?: any): Promise<any> {
    try {
      // Use Cloudinary smart cropping with AI
      const cropParams = parameters || {
        width: 800,
        height: 600,
        gravity: 'auto' // AI-based smart cropping
      };

      const transformation = `c_fill,g_auto,w_${cropParams.width},h_${cropParams.height}`;
      const cloudinaryUrl = this.buildCloudinaryUrl(imageUrl, transformation);
      
      return { url: cloudinaryUrl };
    } catch (error) {
      console.error('Smart crop error:', error);
      throw error;
    }
  }

  private async resizeImage(imageUrl: string, parameters?: any): Promise<any> {
    try {
      const { width, height, maintainAspectRatio = true } = parameters || {};
      
      let transformation = 'c_fill';
      if (maintainAspectRatio) {
        transformation += ',g_auto';
      }
      
      if (width) transformation += `,w_${width}`;
      if (height) transformation += `,h_${height}`;
      
      const cloudinaryUrl = this.buildCloudinaryUrl(imageUrl, transformation);
      
      return { url: cloudinaryUrl };
    } catch (error) {
      console.error('Image resize error:', error);
      throw error;
    }
  }

  private async optimizeImage(imageUrl: string, parameters?: any): Promise<any> {
    try {
      const { quality = 80, format = 'auto' } = parameters || {};
      
      const transformation = `q_${quality},f_${format}`;
      const cloudinaryUrl = this.buildCloudinaryUrl(imageUrl, transformation);
      
      return { url: cloudinaryUrl };
    } catch (error) {
      console.error('Image optimization error:', error);
      throw error;
    }
  }

  // CHART RECOGNITION METHODS
  async recognizeChart(request: ChartRecognitionRequest): Promise<ChartRecognitionResponse> {
    const startTime = Date.now();
    
    try {
      // Use OCR and computer vision to analyze the chart
      const imageDimensions = await this.getImageDimensions(request.imageUrl);
      const detectedElements = await this.detectChartElements(request.imageUrl);
      
      // Identify chart type
      const chartType = request.chartType === 'auto' 
        ? await this.identifyChartType(detectedElements)
        : request.chartType;
      
      // Extract data if requested
      let data;
      if (request.extractData) {
        data = await this.extractChartData(detectedElements, chartType);
      }

      const confidence = this.calculateRecognitionConfidence(detectedElements, chartType);

      return {
        detectedChartType: chartType,
        confidence,
        data,
        elements: detectedElements,
        metadata: {
          processingTime: Date.now() - startTime,
          imageDimensions,
          accuracy: confidence
        }
      };
    } catch (error) {
      console.error('Chart recognition error:', error);
      throw error;
    }
  }

  private async detectChartElements(imageUrl: string): Promise<any[]> {
    // This would use OCR and computer vision APIs
    // For now, return placeholder data
    return [
      {
        type: 'title',
        position: { x: 50, y: 20, width: 300, height: 40 },
        content: 'Sales Revenue 2023',
        confidence: 0.95
      },
      {
        type: 'axis',
        position: { x: 50, y: 80, width: 400, height: 300 },
        confidence: 0.88
      },
      {
        type: 'legend',
        position: { x: 470, y: 100, width: 100, height: 80 },
        confidence: 0.92
      }
    ];
  }

  private async identifyChartType(elements: any[]): Promise<string> {
    // Analyze detected elements to determine chart type
    const hasAxes = elements.some(e => e.type === 'axis');
    const hasPieSegments = elements.some(e => e.type === 'pie-segment');
    const hasLinePoints = elements.some(e => e.type === 'line-point');
    
    if (hasPieSegments) return 'pie';
    if (hasLinePoints) return 'line';
    if (hasAxes) return 'bar';
    
    return 'unknown';
  }

  private async extractChartData(elements: any[], chartType: string): Promise<any> {
    // Extract numerical data from chart elements
    // This would use OCR and pattern recognition
    
    const mockData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };

    return mockData;
  }

  // HELPER METHODS
  private extractElements(slideData: any): any[] {
    if (!slideData || !slideData.elements) return [];
    return slideData.elements;
  }

  private calculateBalanceScore(elements: any[]): number {
    // Calculate visual balance based on element positions and weights
    let leftWeight = 0;
    let rightWeight = 0;
    let topWeight = 0;
    let bottomWeight = 0;

    elements.forEach(element => {
      const weight = this.calculateElementWeight(element);
      const centerX = (element.x || 0) + (element.width || 0) / 2;
      const centerY = (element.y || 0) + (element.height || 0) / 2;

      if (centerX < 400) leftWeight += weight;
      else rightWeight += weight;

      if (centerY < 300) topWeight += weight;
      else bottomWeight += weight;
    });

    const horizontalBalance = Math.min(leftWeight, rightWeight) / Math.max(leftWeight, rightWeight);
    const verticalBalance = Math.min(topWeight, bottomWeight) / Math.max(topWeight, bottomWeight);

    return ((horizontalBalance + verticalBalance) / 2) * 100;
  }

  private calculateElementWeight(element: any): number {
    // Calculate visual weight based on size, color, and type
    const size = (element.width || 0) * (element.height || 0);
    const colorWeight = this.getColorWeight(element.color || '#000000');
    const typeWeight = this.getTypeWeight(element.type);

    return size * colorWeight * typeWeight;
  }

  private getColorWeight(color: string): number {
    // Darker colors have more visual weight
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return 1 - (brightness / 255);
  }

  private getTypeWeight(type: string): number {
    const weights = {
      'text': 1.0,
      'image': 1.2,
      'chart': 1.1,
      'shape': 0.8,
      'background': 0.3
    };
    
    return weights[type] || 1.0;
  }

  private isElementBalanced(element: any, allElements: any[]): boolean {
    // Check if element is properly positioned relative to others
    return true; // Simplified logic
  }

  private getElementBalanceSuggestions(element: any, allElements: any[]): string[] {
    const suggestions = [];
    
    if (element.x < 50) {
      suggestions.push('Consider moving element away from left edge');
    }
    
    if (element.y < 50) {
      suggestions.push('Consider moving element away from top edge');
    }
    
    return suggestions;
  }

  private getOverallBalance(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
  }

  private getBalanceRecommendations(score: number, overallBalance: string): string[] {
    const recommendations = [];
    
    if (score < 70) {
      recommendations.push('Redistribute elements for better visual balance');
      recommendations.push('Consider using grid alignment');
    }
    
    if (overallBalance === 'poor') {
      recommendations.push('Major layout restructuring recommended');
    }
    
    return recommendations;
  }

  private extractColors(elements: any[]): any[] {
    const colors = new Map();
    
    elements.forEach(element => {
      const color = element.color || element.backgroundColor || '#000000';
      if (!colors.has(color)) {
        colors.set(color, { hex: color, usage: 0 });
      }
      colors.get(color).usage++;
    });

    return Array.from(colors.values());
  }

  private calculateHarmonyScore(colors: any[]): number {
    // Calculate color harmony based on color theory
    if (colors.length <= 1) return 100;
    
    let harmonyScore = 0;
    const colorCount = colors.length;
    
    // Check for complementary colors
    for (let i = 0; i < colorCount; i++) {
      for (let j = i + 1; j < colorCount; j++) {
        harmonyScore += this.getColorCompatibility(colors[i].hex, colors[j].hex);
      }
    }
    
    return (harmonyScore / (colorCount * (colorCount - 1) / 2)) * 100;
  }

  private getColorCompatibility(color1: string, color2: string): number {
    // Calculate color compatibility using color theory
    const hsl1 = this.hexToHSL(color1);
    const hsl2 = this.hexToHSL(color2);
    
    const hueDiff = Math.abs(hsl1.h - hsl2.h);
    const normalizedHueDiff = Math.min(hueDiff, 360 - hueDiff);
    
    // Complementary colors (180° apart) are highly compatible
    // Analogous colors (30° apart) are compatible
    // Triadic colors (120° apart) are compatible
    
    if (normalizedHueDiff <= 30 || normalizedHueDiff >= 150) {
      return 0.9;
    } else if (normalizedHueDiff <= 60 || normalizedHueDiff >= 120) {
      return 0.7;
    } else {
      return 0.4;
    }
  }

  private hexToHSL(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private detectHarmonyType(colors: any[]): string {
    if (colors.length <= 1) return 'monochromatic';
    
    const hues = colors.map(c => this.hexToHSL(c.hex).h);
    const uniqueHues = [...new Set(hues.map(h => Math.round(h / 30) * 30))];
    
    if (uniqueHues.length === 1) return 'monochromatic';
    if (uniqueHues.length === 2) return 'complementary';
    if (uniqueHues.length === 3) return 'triadic';
    if (uniqueHues.length === 4) return 'tetradic';
    
    return 'analogous';
  }

  private calculateContrastRatio(colors: any[]): number {
    if (colors.length < 2) return 0;
    
    let maxContrast = 0;
    
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const contrast = this.getContrastRatio(colors[i].hex, colors[j].hex);
        maxContrast = Math.max(maxContrast, contrast);
      }
    }
    
    return maxContrast;
  }

  private getContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getLuminance(color: string): number {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  }

  private checkAccessibility(contrastRatio: number): string {
    if (contrastRatio >= 7) return 'AAA';
    if (contrastRatio >= 4.5) return 'AA';
    return 'fail';
  }

  private getColorSuggestions(harmonyScore: number, accessibility: string, harmonyType: string): string[] {
    const suggestions = [];
    
    if (harmonyScore < 70) {
      suggestions.push('Consider using a more harmonious color palette');
      suggestions.push('Try complementary or analogous color schemes');
    }
    
    if (accessibility === 'fail') {
      suggestions.push('Increase contrast ratio for better accessibility');
      suggestions.push('Use WCAG compliant color combinations');
    }
    
    return suggestions;
  }

  private analyzeFonts(textElements: any[]): any[] {
    const fonts = new Map();
    
    textElements.forEach(element => {
      const font = element.fontFamily || 'Arial';
      const size = element.fontSize || 16;
      const weight = element.fontWeight || 'normal';
      
      if (!fonts.has(font)) {
        fonts.set(font, {
          family: font,
          sizes: [],
          weights: [],
          usage: 0,
          readability: 0
        });
      }
      
      const fontData = fonts.get(font);
      fontData.sizes.push(size);
      fontData.weights.push(weight);
      fontData.usage++;
    });

    return Array.from(fonts.values()).map(font => ({
      family: font.family,
      size: this.getAverage(font.sizes),
      weight: this.getMostCommon(font.weights),
      usage: font.usage,
      readability: this.calculateReadability(font)
    }));
  }

  private analyzeSpacing(textElements: any[]): any {
    const spacings = textElements.map(element => ({
      lineSpacing: element.lineHeight || 1.5,
      paragraphSpacing: element.marginBottom || 16,
      headingSpacing: element.marginTop || 24
    }));

    return {
      lineSpacing: this.getAverage(spacings.map(s => s.lineSpacing)),
      paragraphSpacing: this.getAverage(spacings.map(s => s.paragraphSpacing)),
      headingSpacing: this.getAverage(spacings.map(s => s.headingSpacing)),
      consistency: this.calculateSpacingConsistency(spacings)
    };
  }

  private analyzeHierarchy(textElements: any[]): any {
    const headingLevels = new Set();
    let hasClearHierarchy = true;

    textElements.forEach(element => {
      if (element.type === 'heading') {
        const level = parseInt(element.tagName?.replace('h', '') || '1');
        headingLevels.add(level);
      }
    });

    // Check if hierarchy is logical
    const levels = Array.from(headingLevels).sort((a, b) => a - b);
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i-1] > 1) {
        hasClearHierarchy = false;
        break;
      }
    }

    return {
      hasClearHierarchy,
      headingLevels: headingLevels.size,
      consistency: hasClearHierarchy ? 1 : 0.5
    };
  }

  private calculateTypographyScore(fonts: any[], spacing: any, hierarchy: any): number {
    const fontScore = fonts.length <= 3 ? 100 : Math.max(0, 100 - (fonts.length - 3) * 20);
    const spacingScore = spacing.consistency * 100;
    const hierarchyScore = hierarchy.consistency * 100;

    return (fontScore + spacingScore + hierarchyScore) / 3;
  }

  private getTypographyRecommendations(fonts: any[], spacing: any, hierarchy: any): string[] {
    const recommendations = [];
    
    if (fonts.length > 3) {
      recommendations.push('Consider reducing the number of font families to 2-3');
    }
    
    if (spacing.consistency < 0.8) {
      recommendations.push('Improve spacing consistency for better readability');
    }
    
    if (!hierarchy.hasClearHierarchy) {
      recommendations.push('Establish a clear heading hierarchy (h1, h2, h3...)');
    }
    
    return recommendations;
  }

  private getAverage(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  private getMostCommon(strings: string[]): string {
    const counts = strings.reduce((acc, str) => {
      acc[str] = (acc[str] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  private calculateReadability(font: any): number {
    // Simplified readability calculation
    const sizeScore = font.size >= 12 && font.size <= 24 ? 100 : 50;
    const weightScore = font.weight === 'normal' || font.weight === 'bold' ? 100 : 70;
    
    return (sizeScore + weightScore) / 2;
  }

  private calculateSpacingConsistency(spacings: any[]): number {
    if (spacings.length <= 1) return 1;
    
    const lineSpacings = spacings.map(s => s.lineSpacing);
    const avgLineSpacing = this.getAverage(lineSpacings);
    const variance = lineSpacings.reduce((sum, spacing) => sum + Math.pow(spacing - avgLineSpacing, 2), 0) / lineSpacings.length;
    
    return Math.max(0, 1 - variance / (avgLineSpacing * avgLineSpacing));
  }

  private async getImageInfo(imageUrl: string): Promise<any> {
    // This would use image processing libraries to get image info
    return {
      size: 100000, // bytes
      format: 'png',
      width: 800,
      height: 600
    };
  }

  private async getImageDimensions(imageUrl: string): Promise<{ width: number; height: number }> {
    const info = await this.getImageInfo(imageUrl);
    return { width: info.width, height: info.height };
  }

  private async downloadImage(imageUrl: string): Promise<Buffer> {
    const response = await fetch(imageUrl);
    return Buffer.from(await response.arrayBuffer());
  }

  private buildCloudinaryUrl(imageUrl: string, transformation: string): string {
    // This would build a Cloudinary URL with transformations
    // For now, return the original URL
    return imageUrl;
  }

  private async uploadToS3(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `processed/${filename}`,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/processed/${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private calculateRecognitionConfidence(elements: any[], chartType: string): number {
    // Calculate confidence based on element detection and chart type identification
    const elementConfidence = elements.reduce((sum, e) => sum + e.confidence, 0) / elements.length;
    const typeConfidence = chartType !== 'unknown' ? 0.9 : 0.3;
    
    return (elementConfidence + typeConfidence) / 2;
  }
}
