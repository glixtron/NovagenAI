import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar' | 'donut' | 'bubble' | 'heatmap' | 'gauge' | 'funnel' | 'polar' | 'waterfall';
  title: string;
  data: any[];
  config?: {
    colors?: string[];
    animations?: boolean;
    interactive?: boolean;
    responsive?: boolean;
    legend?: {
      position: 'top' | 'bottom' | 'left' | 'right';
      labels?: string[];
    };
    style?: {
      background?: string;
      border?: string;
      borderRadius?: number;
      boxShadow?: string;
    };
  };
}

export interface VisualizationRequest {
  chartData: ChartData;
  type: 'chart' | 'infographic' | 'dashboard' | 'report' | 'interactive';
  format: 'png' | 'svg' | 'pdf' | 'html' | 'json';
  width: number;
  height: number;
  theme: 'light' | 'dark' | 'corporate' | 'modern' | 'minimal';
  quality: 'low' | 'medium' | 'high';
  animation?: boolean;
  interactive?: boolean;
}

export interface VisualizationResponse {
  url: string;
  format: string;
  size: number;
  metadata: {
    generatedAt: string;
    processingTime: number;
    chartType: string;
    dataPoints: number;
  };
}

export class VisualizationEngineService {
  private prisma: PrismaClient;
  private s3Client: S3Client;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async generateVisualization(request: VisualizationRequest): Promise<VisualizationResponse> {
    const startTime = Date.now();
    
    try {
      let visualization: VisualizationResponse;

      switch (request.type) {
        case 'chart':
          visualization = await this.generateChart(request);
          break;
          
        case 'infographic':
          visualization = await this.generateInfographic(request);
          break;
          
        case 'dashboard':
          visualization = await this.generateDashboard(request);
          break;
          
        case 'report':
          visualization = await this.generateReport(request);
          break;
          
        case 'interactive':
          visualization = await this.generateInteractiveVisualization(request);
          break;
          
        default:
          throw new Error(`Unsupported visualization type: ${request.type}`);
      }

      // Save to database
      await this.saveVisualization(visualization, request);
      
      return visualization;
    } catch (error) {
      console.error('Visualization generation error:', error);
      throw error;
    }
  }

  private async generateChart(request: VisualizationRequest): Promise<VisualizationResponse> {
    const { chartData, width, height, format, theme, quality } = request;
    
    // Generate chart using Chart.js or D3.js (simplified for example)
    const chartHtml = this.generateChartHTML(chartData, theme);
    
    // Convert to requested format
    switch (format) {
      case 'png':
        const pngUrl = await this.htmlToPNG(chartHtml, width, height);
        return {
          url: pngUrl,
          format: 'png',
          size: this.calculateFileSize(chartHtml),
          metadata: {
            generatedAt: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            chartType: chartData.type,
            dataPoints: chartData.data.length
          }
        };
        
      case 'svg':
        const svgContent = this.generateSVG(chartData, theme);
        const svgUrl = await this.uploadToS3(svgContent, 'chart.svg');
        return {
          url: svgUrl,
          format: 'svg',
          size: svgContent.length,
          metadata: {
            generatedAt: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            chartType: chartData.type,
            dataPoints: chartData.data.length
          }
        };
        
      case 'json':
        return {
          url: 'data:application/json;base64,' + btoa(JSON.stringify(chartData)),
          format: 'json',
          size: JSON.stringify(chartData).length,
          metadata: {
            generatedAt: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            chartType: chartData.type,
            dataPoints: chartData.data.length
          }
        };
        
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  private async generateInfographic(request: VisualizationRequest): Promise<VisualizationResponse> {
    const { chartData, width, height, theme } = request;
    
    // Generate infographic with multiple charts and text
    const infographicHtml = this.generateInfographicHTML(chartData, theme);
    
    const pngUrl = await this.htmlToPNG(infographicHtml, width, height);
    
    return {
      url: pngUrl,
      format: 'png',
      size: this.calculateFileSize(infographicHtml),
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        chartType: 'infographic',
        dataPoints: chartData.data.length
      }
    };
  }

  private async generateDashboard(request: VisualizationRequest): Promise<VisualizationResponse> {
    // Generate a dashboard with multiple charts
    const dashboardHtml = this.generateDashboardHTML(request.chartData, theme);
    
    const pngUrl = await this.htmlToPNG(dashboardHtml, request.width, request.height);
    
    return {
      url: pngUrl,
      format: 'png',
      size: this.calculateFileSize(dashboardHtml),
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        chartType: 'dashboard',
        dataPoints: request.chartData.data.length
      }
    };
  }

  private async generateInteractiveVisualization(request: VisualizationRequest): Promise<VisualizationResponse> {
    // Generate interactive HTML with JavaScript
    const interactiveHtml = this.generateInteractiveHTML(request.chartData, theme);
    
    const htmlUrl = await this.uploadToS3(interactiveHtml, 'interactive-visualization.html');
    
    return {
      url: htmlUrl,
      format: 'html',
      size: interactiveHtml.length,
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        chartType: 'interactive',
        dataPoints: request.chartData.data.length
      }
    };
  }

  private async generateReport(request: VisualizationRequest): Promise<VisualizationResponse> {
    // Generate a comprehensive report with charts and analysis
    const reportHtml = this.generateReportHTML(request.chartData, theme);
    
    const pdfUrl = await this.htmlToPDF(reportHtml);
    
    return {
      url: pdfUrl,
      format: 'pdf',
      size: this.calculateFileSize(reportHtml),
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        chartType: 'report',
        dataPoints: request.chartData.data.length
      }
    };
  }

  // HTML Generation Methods (simplified implementations)
  private generateChartHTML(chartData: ChartData, theme: string): string {
    const colors = this.getThemeColors(theme);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${chartData.title}</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; }
            .chart-container { width: 100%; height: 400px; }
          </style>
        </head>
        <body>
          <div class="chart-container">
            <canvas id="chart-${Date.now()}"></canvas>
          </div>
          <script>
            const ctx = document.getElementById('chart-${Date.now()}').getContext('2d');
            new Chart(ctx, {
              type: '${chartData.type}',
              data: {
                labels: ${JSON.stringify(chartData.data.map(d => d.label))},
                datasets: [{
                  label: '${chartData.title}',
                  data: ${JSON.stringify(chartData.data.map(d => d.value))},
                  backgroundColor: ${JSON.stringify(colors)},
                  borderWidth: 2
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: { mode: 'index', intersect: false }
                }
              }
            });
          </script>
        </body>
      </html>
    `;
  }

  private generateInfographicHTML(chartData: ChartData, theme: string): string {
    const colors = this.getThemeColors(theme);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${chartData.title} - Infographic</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; }
            .infographic { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1200px; }
            .chart-box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="infographic">
            ${chartData.data.map((data, index) => `
              <div class="chart-box">
                <h3>${data.label}</h3>
                <div class="chart-placeholder">Chart ${index + 1}</div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;
  }

  private generateDashboardHTML(chartData: ChartData, theme: string): string {
    const colors = this.getThemeColors(theme);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dashboard - ${chartData.title}</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; }
            .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; }
            .chart-box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="dashboard">
            ${chartData.data.map((data, index) => `
              <div class="chart-box">
                <h3>${data.label}</h3>
                <div class="chart-placeholder">Dashboard Chart ${index + 1}</div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;
  }

  private generateInteractiveHTML(chartData: ChartData, theme: string): string {
    const colors = this.getThemeColors(theme);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Interactive Visualization - ${chartData.title}</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; }
            .interactive { display: grid; grid-template-columns: 1fr; gap: 20px; }
            .chart-box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="interactive">
            <div class="chart-box">
              <h3>${chartData.title}</h3>
              <div class="chart-placeholder">Interactive Chart</div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateReportHTML(chartData: ChartData, theme: string): string {
    const colors = this.getThemeColors(theme);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Report - ${chartData.title}</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; }
            .report { max-width: 800px; margin: 0 auto; }
            .chart-box { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="report">
            <h1>Report: ${chartData.title}</h1>
            <div class="chart-box">
              <div class="chart-placeholder">Report Chart</div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getThemeColors(theme: string): string[] {
    const themes = {
      light: ['#FF6384', '#36A2EB', '#00CEC9', '#4BC0C8'],
      dark: ['#1F2937', '#4C1D95', '#6366F1', '#E11D48'],
      corporate: ['#2E3A59', '#3498DB', '#9B59B6', '#20C997'],
      modern: ['#667EEA', '#764BA2', '#F59E0B', '#10B981'],
      minimal: ['#FFFFFF', '#000000', '#9CA3AF', '#E0E2F1']
    };
    
    return themes[theme] || themes.light;
  }

  private async htmlToPNG(html: string, width: number, height: number): Promise<string> {
    // In production, use a proper HTML to PNG conversion service
    // For now, return a placeholder
    return `https://via.placeholder.com/${width}x${height}.png`;
  }

  private async htmlToPDF(html: string): Promise<string> {
    // In production, use a proper PDF generation service
    // For now, return a placeholder
    return `https://via.placeholder.com/document.pdf`;
  }

  private async uploadToS3(content: string, filename: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `visualizations/${Date.now()}-${filename}`,
        Body: content,
        ContentType: 'text/html',
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/visualizations/${Date.now()}-${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private calculateFileSize(content: string): number {
    return Buffer.byteLength(Buffer.from(content, 'utf8'));
  }

  private async saveVisualization(response: VisualizationResponse, request: VisualizationRequest): Promise<void> {
    try {
      await this.prisma.visualization.create({
        data: {
          userId: 'system',
          type: request.type,
          chartData: request.chartData,
          format: response.format,
          url: response.url,
          width: request.width,
          height: request.height,
          theme: request.theme,
          quality: request.quality,
          metadata: response.metadata
        }
      });
    } catch (error) {
      console.error('Failed to save visualization:', error);
    }
  }
}
