// Smart Layout Remix Service for NovagenAI
import { Slide, PresentationData, ChartData, MapData, InfographicData } from '../types';

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  structure: LayoutStructure;
  preview: string;
}

export interface LayoutStructure {
  title: {
    position: { x: number; y: number; width: number; height: number };
    style: TextStyle;
  };
  content: {
    position: { x: number; y: number; width: number; height: number };
    style: TextStyle;
    columns?: number;
  };
  image?: {
    position: { x: number; y: number; width: number; height: number };
    style: ImageStyle;
  };
  chart?: {
    position: { x: number; y: number; width: number; height: number };
    style: ChartStyle;
  };
  background?: BackgroundStyle;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  textAlign: 'left' | 'center' | 'right';
  color: string;
}

export interface ImageStyle {
  borderRadius: number;
  shadow: boolean;
  fit: 'cover' | 'contain';
}

export interface ChartStyle {
  type: 'bar' | 'pie' | 'line' | 'area';
  colorScheme: string[];
}

export interface BackgroundStyle {
  type: 'solid' | 'gradient' | 'pattern';
  colors: string[];
}

export class LayoutRemixService {
  private templates: LayoutTemplate[];

  constructor() {
    this.templates = this.initializeTemplates();
  }

  // Get all available layout templates
  getAvailableTemplates(): LayoutTemplate[] {
    return this.templates;
  }

  // Remix slide with new layout
  remixSlide(slide: Slide, templateId: string): Slide {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    return this.applyTemplateToSlide(slide, template);
  }

  // Remix entire presentation
  remixPresentation(presentation: PresentationData, templateId: string): PresentationData {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    return {
      ...presentation,
      slides: presentation.slides.map(slide => this.applyTemplateToSlide(slide, template))
    };
  }

  // Get AI-recommended template for slide content
  getRecommendedTemplate(slide: Slide): LayoutTemplate {
    const hasImage = !!slide.imageUrl;
    const hasChart = !!slide.chart;
    const hasMap = !!slide.map;
    const hasInfographic = !!slide.infographic;
    const contentLength = slide.content?.join(' ').length || 0;

    // AI logic to recommend best template
    if (hasImage && contentLength > 200) {
      return this.templates.find(t => t.id === 'image-right') || this.templates[0];
    } else if (hasChart || hasMap) {
      return this.templates.find(t => t.id === 'data-focused') || this.templates[0];
    } else if (hasInfographic) {
      return this.templates.find(t => t.id === 'infographic') || this.templates[0];
    } else if (contentLength > 300) {
      return this.templates.find(t => t.id === 'content-heavy') || this.templates[0];
    } else {
      return this.templates.find(t => t.id === 'minimal') || this.templates[0];
    }
  }

  // Apply template to slide
  private applyTemplateToSlide(slide: Slide, template: LayoutTemplate): Slide {
    const remixedSlide = { ...slide };

    // Add layout information to slide
    remixedSlide.layout = {
      templateId: template.id,
      structure: template.structure,
      appliedAt: new Date()
    };

    return remixedSlide;
  }

  // Initialize layout templates
  private initializeTemplates(): LayoutTemplate[] {
    return [
      {
        id: 'minimal',
        name: 'Minimal Clean',
        description: 'Clean, simple layout with focus on content',
        structure: {
          title: {
            position: { x: 1, y: 0.5, width: 8, height: 1.5 },
            style: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }
          },
          content: {
            position: { x: 1, y: 2.5, width: 8, height: 4 },
            style: { fontSize: 18, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' }
          }
        },
        preview: 'minimal-layout.png'
      },
      {
        id: 'image-right',
        name: 'Image Right',
        description: 'Content on left, image on right',
        structure: {
          title: {
            position: { x: 0.5, y: 0.5, width: 6, height: 1.5 },
            style: { fontSize: 32, fontWeight: 'bold', textAlign: 'left', color: '#1e293b' }
          },
          content: {
            position: { x: 0.5, y: 2.5, width: 6, height: 3.5 },
            style: { fontSize: 16, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' }
          },
          image: {
            position: { x: 7, y: 0.5, width: 4.5, height: 5.5 },
            style: { borderRadius: 8, shadow: true, fit: 'cover' }
          }
        },
        preview: 'image-right-layout.png'
      },
      {
        id: 'image-left',
        name: 'Image Left',
        description: 'Image on left, content on right',
        structure: {
          title: {
            position: { x: 6, y: 0.5, width: 6, height: 1.5 },
            style: { fontSize: 32, fontWeight: 'bold', textAlign: 'right', color: '#1e293b' }
          },
          content: {
            position: { x: 6, y: 2.5, width: 6, height: 3.5 },
            style: { fontSize: 16, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' }
          },
          image: {
            position: { x: 0.5, y: 0.5, width: 4.5, height: 5.5 },
            style: { borderRadius: 8, shadow: true, fit: 'cover' }
          }
        },
        preview: 'image-left-layout.png'
      },
      {
        id: 'data-focused',
        name: 'Data Focused',
        description: 'Emphasizes charts and data visualization',
        structure: {
          title: {
            position: { x: 0.5, y: 0.5, width: 11, height: 1.5 },
            style: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }
          },
          content: {
            position: { x: 0.5, y: 2.5, width: 5, height: 2 },
            style: { fontSize: 14, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' }
          },
          chart: {
            position: { x: 6, y: 2.5, width: 5.5, height: 4 },
            style: { type: 'bar', colorScheme: ['#3b82f6', '#10b981', '#f59e0b'] }
          }
        },
        preview: 'data-focused-layout.png'
      },
      {
        id: 'infographic',
        name: 'Infographic Style',
        description: 'Visual, infographic-style layout',
        structure: {
          title: {
            position: { x: 0.5, y: 0.5, width: 11, height: 1.5 },
            style: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }
          },
          content: {
            position: { x: 0.5, y: 2.5, width: 11, height: 2 },
            style: { fontSize: 16, fontWeight: 'normal', textAlign: 'center', color: '#4b5563' },
            columns: 2
          },
          image: {
            position: { x: 3, y: 5, width: 6, height: 3 },
            style: { borderRadius: 12, shadow: true, fit: 'contain' }
          },
          background: {
            type: 'gradient',
            colors: ['#f0f9ff', '#e0f2fe']
          }
        },
        preview: 'infographic-layout.png'
      },
      {
        id: 'content-heavy',
        name: 'Content Heavy',
        description: 'Maximizes content space with minimal visuals',
        structure: {
          title: {
            position: { x: 0.5, y: 0.5, width: 11, height: 1.5 },
            style: { fontSize: 34, fontWeight: 'bold', textAlign: 'left', color: '#1e293b' }
          },
          content: {
            position: { x: 0.5, y: 2.5, width: 11, height: 5 },
            style: { fontSize: 18, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' },
            columns: 2
          }
        },
        preview: 'content-heavy-layout.png'
      },
      {
        id: 'hero',
        name: 'Hero Section',
        description: 'Large image with overlay text',
        structure: {
          title: {
            position: { x: 1, y: 3, width: 10, height: 2 },
            style: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }
          },
          content: {
            position: { x: 1, y: 5.5, width: 10, height: 2 },
            style: { fontSize: 20, fontWeight: 'normal', textAlign: 'center', color: '#ffffff' }
          },
          image: {
            position: { x: 0, y: 0, width: 12, height: 6.75 },
            style: { borderRadius: 0, shadow: false, fit: 'cover' }
          },
          background: {
            type: 'gradient',
            colors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']
          }
        },
        preview: 'hero-layout.png'
      },
      {
        id: 'two-column',
        name: 'Two Column',
        description: 'Balanced two-column layout',
        structure: {
          title: {
            position: { x: 0.5, y: 0.5, width: 11, height: 1.5 },
            style: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }
          },
          content: {
            position: { x: 0.5, y: 2.5, width: 5, height: 4 },
            style: { fontSize: 16, fontWeight: 'normal', textAlign: 'left', color: '#4b5563' }
          },
          image: {
            position: { x: 6, y: 2.5, width: 5.5, height: 4 },
            style: { borderRadius: 8, shadow: true, fit: 'cover' }
          }
        },
        preview: 'two-column-layout.png'
      }
    ];
  }

  // Generate CSS for layout
  generateLayoutCSS(structure: LayoutStructure): string {
    let css = '';

    // Title styles
    css += `
      .slide-title {
        position: absolute;
        left: ${structure.title.position.x}in;
        top: ${structure.title.position.y}in;
        width: ${structure.title.position.width}in;
        height: ${structure.title.position.height}in;
        font-size: ${structure.title.style.fontSize}px;
        font-weight: ${structure.title.style.fontWeight};
        text-align: ${structure.title.style.textAlign};
        color: ${structure.title.style.color};
      }
    `;

    // Content styles
    css += `
      .slide-content {
        position: absolute;
        left: ${structure.content.position.x}in;
        top: ${structure.content.position.y}in;
        width: ${structure.content.position.width}in;
        height: ${structure.content.position.height}in;
        font-size: ${structure.content.style.fontSize}px;
        font-weight: ${structure.content.style.fontWeight};
        text-align: ${structure.content.style.textAlign};
        color: ${structure.content.style.color};
        ${structure.content.columns ? `column-count: ${structure.content.columns};` : ''}
      }
    `;

    // Image styles
    if (structure.image) {
      css += `
        .slide-image {
          position: absolute;
          left: ${structure.image.position.x}in;
          top: ${structure.image.position.y}in;
          width: ${structure.image.position.width}in;
          height: ${structure.image.position.height}in;
          border-radius: ${structure.image.style.borderRadius}px;
          ${structure.image.style.shadow ? 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);' : ''}
          object-fit: ${structure.image.style.fit};
        }
      `;
    }

    // Chart styles
    if (structure.chart) {
      css += `
        .slide-chart {
          position: absolute;
          left: ${structure.chart.position.x}in;
          top: ${structure.chart.position.y}in;
          width: ${structure.chart.position.width}in;
          height: ${structure.chart.position.height}in;
        }
      `;
    }

    // Background styles
    if (structure.background) {
      if (structure.background.type === 'gradient') {
        css += `
          .slide-background {
            background: linear-gradient(135deg, ${structure.background.colors.join(', ')});
          }
        `;
      } else {
        css += `
          .slide-background {
            background-color: ${structure.background.colors[0]};
          }
        `;
      }
    }

    return css;
  }

  // Create custom template
  createCustomTemplate(name: string, structure: LayoutStructure): LayoutTemplate {
    return {
      id: `custom-${Date.now()}`,
      name,
      description: 'Custom layout template',
      structure,
      preview: 'custom-layout.png'
    };
  }
}

// Export function for easy usage
export const remixSlideLayout = (
  slide: Slide,
  templateId: string
): Slide => {
  const service = new LayoutRemixService();
  return service.remixSlide(slide, templateId);
};

export const getRecommendedLayout = (slide: Slide): LayoutTemplate => {
  const service = new LayoutRemixService();
  return service.getRecommendedTemplate(slide);
};
