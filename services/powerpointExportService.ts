// Advanced PowerPoint Export Service for NovagenAI
import PptxGenJS, { Slide } from 'pptxgenjs';
import { PresentationData } from '../types';

export interface PowerPointOptions {
  format: 'pptx' | 'google-slides';
  includeNotes: boolean;
  includeAnimations: boolean;
  template: 'modern' | 'corporate' | 'minimal' | 'creative';
  aspectRatio: '16:9' | '4:3';
}

export class PowerPointExporter {
  private pptx: PptxGenJS;
  private presentation: PresentationData;
  private options: PowerPointOptions;

  constructor(presentation: PresentationData, options: PowerPointOptions) {
    this.presentation = presentation;
    this.options = options;
    this.pptx = new PptxGenJS();
  }

  // Main export method
  async export(): Promise<Blob> {
    this.setupPresentation();
    
    for (const slide of this.presentation.slides) {
      await this.addSlide(slide);
    }
    
    return this.pptx.writeFile({ 
      outputType: 'blob', 
      compression: true 
    });
  }

  // Setup presentation properties
  private setupPresentation(): void {
    // Set presentation metadata
    this.pptx.author = 'NovagenAI';
    this.pptx.company = this.presentation.branding?.company || 'NovagenAI';
    this.pptx.title = this.presentation.title;
    this.pptx.subject = this.presentation.subtitle || 'AI-Generated Presentation';
    
    // Set slide size based on aspect ratio
    if (this.options.aspectRatio === '16:9') {
      this.pptx.layout = 'LAYOUT_WIDE';
    } else if (this.options.aspectRatio === '4:3') {
      this.pptx.layout = 'LAYOUT_STANDARD';
    }
    
    // Apply template styles
    this.applyTemplate();
  }

  // Apply template styles
  private applyTemplate(): void {
    const brandColors = this.presentation.branding?.colors;
    
    switch (this.options.template) {
      case 'modern':
        this.applyModernTemplate(brandColors);
        break;
      case 'corporate':
        this.applyCorporateTemplate(brandColors);
        break;
      case 'minimal':
        this.applyMinimalTemplate(brandColors);
        break;
      case 'creative':
        this.applyCreativeTemplate(brandColors);
        break;
      default:
        this.applyModernTemplate(brandColors);
    }
  }

  // Modern template
  private applyModernTemplate(colors?: any): void {
    const primaryColor = colors?.primary || '#3b82f6';
    const textColor = colors?.text || '#1e293b';
    
    this.pptx.defineSlideMaster({
      title: 'NOVAGENAI Modern',
      background: '#ffffff',
      color: textColor,
      titleColor: primaryColor,
      titleFontSize: 44,
      titleFontFace: 'Inter',
      bodyFontFace: 'Inter',
    });
  }

  // Corporate template
  private applyCorporateTemplate(colors?: any): void {
    const primaryColor = colors?.primary || '#1e40af';
    const textColor = colors?.text || '#111827';
    
    this.pptx.defineSlideMaster({
      title: 'NOVAGENAI Corporate',
      background: '#ffffff',
      color: textColor,
      titleColor: primaryColor,
      titleFontSize: 40,
      titleFontFace: 'Arial',
      bodyFontFace: 'Arial',
    });
  }

  // Minimal template
  private applyMinimalTemplate(colors?: any): void {
    const textColor = colors?.text || '#000000';
    
    this.pptx.defineSlideMaster({
      title: 'NOVAGENAI Minimal',
      background: '#ffffff',
      color: textColor,
      titleColor: textColor,
      titleFontSize: 36,
      titleFontFace: 'Helvetica',
      bodyFontFace: 'Helvetica',
    });
  }

  // Creative template
  private applyCreativeTemplate(colors?: any): void {
    const primaryColor = colors?.primary || '#8b5cf6';
    const textColor = colors?.text || '#1f2937';
    
    this.pptx.defineSlideMaster({
      title: 'NOVAGENAI Creative',
      background: '#ffffff',
      color: textColor,
      titleColor: primaryColor,
      titleFontSize: 48,
      titleFontFace: 'Inter',
      bodyFontFace: 'Inter',
    });
  }

  // Add individual slide
  private async addSlide(slide: any): Promise<void> {
    const slideLayout = this.pptx.addSlide();
    
    // Add title
    slideLayout.addText(slide.title, {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1.5,
      fontSize: 36,
      bold: true,
      color: this.presentation.branding?.colors?.primary || '#3b82f6',
      fontFace: this.options.template === 'corporate' ? 'Arial' : 'Inter',
    });

    // Add content
    let yPosition = 2.5;
    
    if (slide.content && slide.content.length > 0) {
      for (const content of slide.content) {
        slideLayout.addText(content, {
          x: 1,
          y: yPosition,
          w: 8,
          h: 0.5,
          fontSize: 18,
          color: this.presentation.branding?.colors?.text || '#1e293b',
          fontFace: this.options.template === 'corporate' ? 'Arial' : 'Inter',
        });
        yPosition += 0.6;
      }
    }

    // Add image if available
    if (slide.imageUrl) {
      await this.addImage(slideLayout, slide.imageUrl);
    }

    // Add chart if available
    if (slide.chart) {
      this.addChart(slideLayout, slide.chart);
    }

    // Add speaker notes if requested
    if (this.options.includeNotes && slide.speakerNotes) {
      slideLayout.addNotes(slide.speakerNotes);
    }
  }

  // Add image to slide
  private async addImage(slideLayout: any, imageUrl: string): Promise<void> {
    try {
      // Convert base64 to blob
      const base64Data = imageUrl.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      // Add image to slide
      slideLayout.addImage(blob, {
        x: 9,
        y: 2,
        w: 4,
        h: 3,
        sizing: { type: 'contain', w: 4, h: 3 }
      });
    } catch (error) {
      console.error('Error adding image to PowerPoint:', error);
    }
  }

  // Add chart to slide
  private addChart(slideLayout: any, chart: any): void {
    const chartData = {
      name: chart.title,
      labels: chart.labels,
      values: chart.values,
    };

    switch (chart.type) {
      case 'bar':
        slideLayout.addChart(this.pptx.ChartType.bar, chartData, {
          x: 1,
          y: 4,
          w: 8,
          h: 3,
          fill: this.presentation.branding?.colors?.primary || '#3b82f6',
        });
        break;
      case 'pie':
        slideLayout.addChart(this.pptx.ChartType.pie, chartData, {
          x: 1,
          y: 4,
          w: 4,
          h: 3,
        });
        break;
      case 'line':
        slideLayout.addChart(this.pptx.ChartType.line, chartData, {
          x: 1,
          y: 4,
          w: 8,
          h: 3,
          lineColor: this.presentation.branding?.colors?.primary || '#3b82f6',
        });
        break;
      case 'area':
        slideLayout.addChart(this.pptx.ChartType.area, chartData, {
          x: 1,
          y: 4,
          w: 8,
          h: 3,
          fill: this.presentation.branding?.colors?.primary || '#3b82f6',
        });
        break;
    }
  }
}

// Export function for easy usage
export const exportToPowerPoint = async (
  presentation: PresentationData,
  options: Partial<PowerPointOptions> = {}
): Promise<Blob> => {
  const defaultOptions: PowerPointOptions = {
    format: 'pptx',
    includeNotes: true,
    includeAnimations: false,
    template: 'modern',
    aspectRatio: '16:9',
    ...options
  };

  const exporter = new PowerPointExporter(presentation, defaultOptions);
  return await exporter.export();
};

// Export to Google Slides (placeholder implementation)
export const exportToGoogleSlides = async (
  presentation: PresentationData,
  options: Partial<PowerPointOptions> = {}
): Promise<string> => {
  // This would require Google Slides API integration
  // For now, export to PowerPoint and provide instructions
  const pptxBlob = await exportToPowerPoint(presentation, options);
  
  // Convert blob to base64 for potential API upload
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(pptxBlob);
  });
};
