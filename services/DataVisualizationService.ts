import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';

export interface ChartGenerationRequest {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar' | 'bubble' | 'heatmap' | 'treemap' | 'sankey';
  library: 'chartjs' | 'd3' | 'highcharts' | 'recharts' | 'plotly';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
      fill?: boolean;
      tension?: number;
      pointRadius?: number;
      pointHoverRadius?: number;
    }>;
  };
  options: {
    title?: string;
    subtitle?: string;
    width?: number;
    height?: number;
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    animation?: boolean;
    theme?: 'light' | 'dark' | 'corporate' | 'modern' | 'minimal';
    interactive?: boolean;
    exportFormats?: Array<'png' | 'svg' | 'pdf' | 'json'>;
    customColors?: string[];
    showLegend?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    axisLabels?: {
      x?: string;
      y?: string;
    };
    dataLabels?: boolean;
    annotations?: Array<{
      type: 'line' | 'box' | 'label';
      value: number;
      label?: string;
      color?: string;
    }>;
  };
}

export interface ChartGenerationResponse {
  chartId: string;
  type: string;
  library: string;
  renderUrl: string;
  thumbnailUrl: string;
  downloadUrls: {
    png?: string;
    svg?: string;
    pdf?: string;
    json?: string;
  };
  config: any;
  metadata: {
    width: number;
    height: number;
    dataSize: number;
    processingTime: number;
    interactive: boolean;
    timestamp: string;
  };
}

export interface ScientificChartRequest {
  type: 'scatter3d' | 'surface3d' | 'contour' | 'histogram2d' | 'boxplot' | 'violin' | 'sunburst' | 'parallel-coordinates';
  library: 'plotly';
  data: {
    x?: number[];
    y?: number[];
    z?: number[];
    values?: number[][];
    categories?: string[];
    metadata?: any;
  };
  options: {
    title?: string;
    colorScale?: string;
    showColorbar?: boolean;
    showGrid?: boolean;
    projection?: 'orthographic' | 'perspective';
    statistical?: {
      showMean?: boolean;
      showMedian?: boolean;
      showQuartiles?: boolean;
      showOutliers?: boolean;
    };
  };
}

export interface CustomVisualizationRequest {
  description: string;
  requirements: {
    dimensions: { width: number; height: number };
    interactivity: boolean;
    realTime: boolean;
    responsive: boolean;
    theme: string;
    customFeatures: string[];
  };
  dataSample: any;
  library: 'd3' | 'chartjs' | 'plotly';
}

export class DataVisualizationService {
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

  // CHART GENERATION METHODS
  async generateChart(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = `chart:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      let response: ChartGenerationResponse;

      switch (request.library) {
        case 'chartjs':
          response = await this.generateChartJS(request);
          break;
        case 'd3':
          response = await this.generateD3(request);
          break;
        case 'highcharts':
          response = await this.generateHighcharts(request);
          break;
        case 'recharts':
          response = await this.generateRecharts(request);
          break;
        case 'plotly':
          response = await this.generatePlotly(request);
          break;
        default:
          throw new Error(`Unsupported chart library: ${request.library}`);
      }

      response.metadata.processingTime = Date.now() - startTime;
      response.metadata.timestamp = new Date().toISOString();

      // Cache the result
      await this.redis.setex(cacheKey, 1800, JSON.stringify(response)); // 30 minutes cache
      
      return response;
    } catch (error) {
      console.error('Chart generation error:', error);
      throw error;
    }
  }

  private async generateChartJS(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `chartjs-${Date.now()}`;
      const config = this.buildChartJSConfig(request);
      
      // Generate HTML with Chart.js
      const html = this.generateChartJSHTML(chartId, config, request);
      
      // Generate chart image (would use puppeteer or similar)
      const imageUrl = await this.renderChartToImage(html, request.options.width || 800, request.options.height || 600);
      
      // Generate different export formats
      const downloadUrls = await this.generateExportFormats(html, request.options.exportFormats || ['png']);

      return {
        chartId,
        type: request.type,
        library: 'chartjs',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl, // Would generate thumbnail
        downloadUrls,
        config,
        metadata: {
          width: request.options.width || 800,
          height: request.options.height || 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: request.options.interactive || false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Chart.js generation error:', error);
      throw error;
    }
  }

  private async generateD3(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `d3-${Date.now()}`;
      const config = this.buildD3Config(request);
      
      // Generate HTML with D3.js
      const html = this.generateD3HTML(chartId, config, request);
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, request.options.width || 800, request.options.height || 600);
      
      const downloadUrls = await this.generateExportFormats(html, request.options.exportFormats || ['png', 'svg']);

      return {
        chartId,
        type: request.type,
        library: 'd3',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl,
        downloadUrls,
        config,
        metadata: {
          width: request.options.width || 800,
          height: request.options.height || 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: request.options.interactive || false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('D3 generation error:', error);
      throw error;
    }
  }

  private async generateHighcharts(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `highcharts-${Date.now()}`;
      const config = this.buildHighchartsConfig(request);
      
      // Generate HTML with Highcharts
      const html = this.generateHighchartsHTML(chartId, config, request);
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, request.options.width || 800, request.options.height || 600);
      
      const downloadUrls = await this.generateExportFormats(html, request.options.exportFormats || ['png']);

      return {
        chartId,
        type: request.type,
        library: 'highcharts',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl,
        downloadUrls,
        config,
        metadata: {
          width: request.options.width || 800,
          height: request.options.height || 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: request.options.interactive || false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Highcharts generation error:', error);
      throw error;
    }
  }

  private async generateRecharts(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `recharts-${Date.now()}`;
      const config = this.buildRechartsConfig(request);
      
      // Generate React component with Recharts
      const reactCode = this.generateRechartsComponent(chartId, config, request);
      
      // Generate HTML (would use server-side rendering)
      const html = this.generateReactHTML(reactCode, request);
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, request.options.width || 800, request.options.height || 600);
      
      const downloadUrls = await this.generateExportFormats(html, request.options.exportFormats || ['png']);

      return {
        chartId,
        type: request.type,
        library: 'recharts',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl,
        downloadUrls,
        config,
        metadata: {
          width: request.options.width || 800,
          height: request.options.height || 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: request.options.interactive || false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Recharts generation error:', error);
      throw error;
    }
  }

  private async generatePlotly(request: ChartGenerationRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `plotly-${Date.now()}`;
      const config = this.buildPlotlyConfig(request);
      
      // Generate HTML with Plotly
      const html = this.generatePlotlyHTML(chartId, config, request);
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, request.options.width || 800, request.options.height || 600);
      
      const downloadUrls = await this.generateExportFormats(html, request.options.exportFormats || ['png', 'svg', 'pdf']);

      return {
        chartId,
        type: request.type,
        library: 'plotly',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl,
        downloadUrls,
        config,
        metadata: {
          width: request.options.width || 800,
          height: request.options.height || 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: request.options.interactive || false,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Plotly generation error:', error);
      throw error;
    }
  }

  // SCIENTIFIC CHARTS
  async generateScientificChart(request: ScientificChartRequest): Promise<ChartGenerationResponse> {
    try {
      const chartId = `scientific-${Date.now()}`;
      const config = this.buildPlotlyScientificConfig(request);
      
      // Generate HTML with Plotly for scientific charts
      const html = this.generatePlotlyHTML(chartId, config, {
        type: request.type as any,
        library: 'plotly',
        data: {
          labels: request.data.categories || [],
          datasets: [{
            label: 'Scientific Data',
            data: request.data.x || request.data.values?.flat() || [],
          }]
        },
        options: {
          title: request.options.title,
          width: 800,
          height: 600,
          responsive: true,
          interactive: true,
        }
      });
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, 800, 600);
      
      const downloadUrls = await this.generateExportFormats(html, ['png', 'svg', 'pdf']);

      return {
        chartId,
        type: request.type,
        library: 'plotly',
        renderUrl: imageUrl,
        thumbnailUrl: imageUrl,
        downloadUrls,
        config,
        metadata: {
          width: 800,
          height: 600,
          dataSize: JSON.stringify(request.data).length,
          processingTime: 0,
          interactive: true,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Scientific chart generation error:', error);
      throw error;
    }
  }

  // CUSTOM VISUALIZATION
  async generateCustomVisualization(request: CustomVisualizationRequest): Promise<any> {
    try {
      // Use AI to generate custom visualization code
      const visualizationCode = await this.generateCustomCode(request);
      
      // Generate HTML with custom visualization
      const html = this.generateCustomHTML(visualizationCode, request);
      
      // Generate chart image
      const imageUrl = await this.renderChartToImage(html, request.requirements.dimensions.width, request.requirements.dimensions.height);
      
      return {
        visualizationId: `custom-${Date.now()}`,
        library: request.library,
        renderUrl: imageUrl,
        code: visualizationCode,
        metadata: {
          width: request.requirements.dimensions.width,
          height: request.requirements.dimensions.height,
          interactive: request.requirements.interactivity,
          realTime: request.requirements.realTime,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Custom visualization error:', error);
      throw error;
    }
  }

  // CONFIGURATION BUILDERS
  private buildChartJSConfig(request: ChartGenerationRequest): any {
    const theme = this.getThemeColors(request.options.theme || 'light');
    
    return {
      type: this.mapChartTypeToChartJS(request.type),
      data: {
        labels: request.data.labels,
        datasets: request.data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || theme.colors,
          borderColor: dataset.borderColor || theme.borderColors,
        }))
      },
      options: {
        responsive: request.options.responsive !== false,
        maintainAspectRatio: request.options.maintainAspectRatio !== false,
        animation: request.options.animation !== false,
        plugins: {
          title: {
            display: !!request.options.title,
            text: request.options.title,
          },
          legend: {
            display: request.options.showLegend !== false,
          },
          tooltip: {
            enabled: request.options.showTooltip !== false,
          }
        },
        scales: this.getChartJSScales(request),
        elements: {
          point: {
            radius: request.options.dataLabels ? 5 : 3,
            hoverRadius: 7,
          }
        }
      }
    };
  }

  private buildD3Config(request: ChartGenerationRequest): any {
    return {
      type: request.type,
      data: request.data,
      options: request.options,
      theme: this.getThemeColors(request.options.theme || 'light'),
    };
  }

  private buildHighchartsConfig(request: ChartGenerationRequest): any {
    const theme = this.getThemeColors(request.options.theme || 'light');
    
    return {
      chart: {
        type: this.mapChartTypeToHighcharts(request.type),
        width: request.options.width,
        height: request.options.height,
      },
      title: {
        text: request.options.title,
      },
      xAxis: {
        categories: request.data.labels,
        title: {
          text: request.options.axisLabels?.x,
        }
      },
      yAxis: {
        title: {
          text: request.options.axisLabels?.y,
        }
      },
      series: request.data.datasets.map(dataset => ({
        name: dataset.label,
        data: dataset.data,
        color: dataset.backgroundColor?.[0] || theme.colors[0],
      })),
      plotOptions: {
        series: {
          animation: request.options.animation !== false,
        }
      },
      colors: theme.colors,
    };
  }

  private buildRechartsConfig(request: ChartGenerationRequest): any {
    return {
      type: request.type,
      data: request.data.labels.map((label, index) => ({
        name: label,
        ...request.data.datasets.reduce((acc, dataset) => ({
          ...acc,
          [dataset.label]: dataset.data[index],
        }), {})
      })),
      datasets: request.data.datasets,
      options: request.options,
      theme: this.getThemeColors(request.options.theme || 'light'),
    };
  }

  private buildPlotlyConfig(request: ChartGenerationRequest): any {
    const theme = this.getThemeColors(request.options.theme || 'light');
    
    return {
      data: request.data.datasets.map(dataset => ({
        type: this.mapChartTypeToPlotly(request.type),
        x: request.data.labels,
        y: dataset.data,
        name: dataset.label,
        marker: {
          color: dataset.backgroundColor?.[0] || theme.colors[0],
        },
        line: {
          color: dataset.borderColor?.[0] || theme.borderColors[0],
        },
      })),
      layout: {
        title: request.options.title,
        width: request.options.width,
        height: request.options.height,
        showlegend: request.options.showLegend !== false,
        xaxis: {
          title: request.options.axisLabels?.x,
        },
        yaxis: {
          title: request.options.axisLabels?.y,
        },
        plot_bgcolor: theme.background,
        paper_bgcolor: theme.background,
      }
    };
  }

  private buildPlotlyScientificConfig(request: ScientificChartRequest): any {
    const theme = this.getThemeColors('light');
    
    return {
      data: [{
        type: this.mapScientificTypeToPlotly(request.type),
        x: request.data.x,
        y: request.data.y,
        z: request.data.z,
        values: request.data.values,
        colorscale: request.options.colorScale || 'Viridis',
        showscale: request.options.showColorbar !== false,
      }],
      layout: {
        title: request.options.title,
        width: 800,
        height: 600,
        scene: request.type.includes('3d') ? {
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
          zaxis: { title: 'Z' },
        } : undefined,
        plot_bgcolor: theme.background,
        paper_bgcolor: theme.background,
      }
    };
  }

  // HTML GENERATORS
  private generateChartJSHTML(chartId: string, config: any, request: ChartGenerationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .chart-container { position: relative; width: ${request.options.width || 800}px; height: ${request.options.height || 600}px; }
        </style>
      </head>
      <body>
        <div class="chart-container">
          <canvas id="${chartId}"></canvas>
        </div>
        <script>
          const ctx = document.getElementById('${chartId}').getContext('2d');
          new Chart(ctx, ${JSON.stringify(config)});
        </script>
      </body>
      </html>
    `;
  }

  private generateD3HTML(chartId: string, config: any, request: ChartGenerationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .chart { width: ${request.options.width || 800}px; height: ${request.options.height || 600}px; }
        </style>
      </head>
      <body>
        <div id="${chartId}" class="chart"></div>
        <script>
          // D3.js implementation would go here
          const data = ${JSON.stringify(config.data)};
          // Generate D3 chart based on type
        </script>
      </body>
      </html>
    `;
  }

  private generateHighchartsHTML(chartId: string, config: any, request: ChartGenerationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div id="${chartId}"></div>
        <script>
          Highcharts.chart('${chartId}', ${JSON.stringify(config)});
        </script>
      </body>
      </html>
    `;
  }

  private generateRechartsComponent(chartId: string, config: any, request: ChartGenerationRequest): string {
    return `
      import React from 'react';
      import { ${this.getRechartsComponent(request.type)} } from 'recharts';

      const ${chartId} = () => {
        return (
          <${this.getRechartsComponent(request.type)} 
            width={${request.options.width || 800}}
            height={${request.options.height || 600}}
            data={${JSON.stringify(config.data)}}
          />
        );
      };

      export default ${chartId};
    `;
  }

  private generatePlotlyHTML(chartId: string, config: any, request: ChartGenerationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div id="${chartId}"></div>
        <script>
          Plotly.newPlot('${chartId}', ${JSON.stringify(config.data)}, ${JSON.stringify(config.layout)});
        </script>
      </body>
      </html>
    `;
  }

  private generateReactHTML(reactCode: string, request: ChartGenerationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${reactCode}
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(${reactCode.match(/const (\w+)/)?.[1] || 'Chart'}));
        </script>
      </body>
      </html>
    `;
  }

  // UTILITY METHODS
  private async renderChartToImage(html: string, width: number, height: number): Promise<string> {
    try {
      // This would use Puppeteer or similar to render HTML to image
      // For now, return a placeholder URL
      const filename = `chart-${Date.now()}.png`;
      const buffer = Buffer.from(`Chart image (${width}x${height})`);
      
      return await this.uploadToS3(buffer, filename, 'image/png');
    } catch (error) {
      console.error('Chart rendering error:', error);
      throw error;
    }
  }

  private async generateExportFormats(html: string, formats: string[]): Promise<any> {
    const downloadUrls: any = {};
    
    for (const format of formats) {
      try {
        const filename = `chart-${Date.now()}.${format}`;
        let buffer: Buffer;
        let contentType: string;
        
        switch (format) {
          case 'png':
            buffer = Buffer.from(`PNG chart data`);
            contentType = 'image/png';
            break;
          case 'svg':
            buffer = Buffer.from(`<svg>Chart SVG</svg>`);
            contentType = 'image/svg+xml';
            break;
          case 'pdf':
            buffer = Buffer.from(`PDF chart data`);
            contentType = 'application/pdf';
            break;
          case 'json':
            buffer = Buffer.from(JSON.stringify({ chart: 'data' }));
            contentType = 'application/json';
            break;
          default:
            continue;
        }
        
        downloadUrls[format] = await this.uploadToS3(buffer, filename, contentType);
      } catch (error) {
        console.error(`Failed to generate ${format} export:`, error);
      }
    }
    
    return downloadUrls;
  }

  private async uploadToS3(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `charts/${filename}`,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/charts/${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private getThemeColors(theme: string): any {
    const themes = {
      light: {
        background: '#ffffff',
        colors: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B', '#9013FE'],
        borderColors: ['#357ABD', '#5FA319', '#D4941A', '#A8011A', '#6B0ECC'],
      },
      dark: {
        background: '#1a1a1a',
        colors: ['#5BA0F2', '#8EE331', '#F6B633', '#E0122C', '#A023FF'],
        borderColors: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B', '#9013FE'],
      },
      corporate: {
        background: '#f8f9fa',
        colors: ['#0066CC', '#00875A', '#FF6B35', '#C41E3A', '#8B5CF6'],
        borderColors: ['#0052A3', '#006B48', '#E55A2B', '#9B1830', '#7C3AED'],
      },
      modern: {
        background: '#fafafa',
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
        borderColors: ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED'],
      },
      minimal: {
        background: '#ffffff',
        colors: ['#64748B', '#64748B', '#64748B', '#64748B', '#64748B'],
        borderColors: ['#475569', '#475569', '#475569', '#475569', '#475569'],
      },
    };
    
    return themes[theme as keyof typeof themes] || themes.light;
  }

  private mapChartTypeToChartJS(type: string): string {
    const mapping: Record<string, string> = {
      'bar': 'bar',
      'line': 'line',
      'pie': 'pie',
      'scatter': 'scatter',
      'area': 'line',
      'radar': 'radar',
      'bubble': 'bubble',
    };
    
    return mapping[type] || 'bar';
  }

  private mapChartTypeToHighcharts(type: string): string {
    const mapping: Record<string, string> = {
      'bar': 'column',
      'line': 'line',
      'pie': 'pie',
      'scatter': 'scatter',
      'area': 'area',
      'radar': 'radar',
      'bubble': 'bubble',
    };
    
    return mapping[type] || 'column';
  }

  private mapChartTypeToPlotly(type: string): string {
    const mapping: Record<string, string> = {
      'bar': 'bar',
      'line': 'scatter',
      'pie': 'pie',
      'scatter': 'scatter',
      'area': 'scatter',
      'radar': 'scatterpolar',
      'bubble': 'scatter',
    };
    
    return mapping[type] || 'bar';
  }

  private mapScientificTypeToPlotly(type: string): string {
    const mapping: Record<string, string> = {
      'scatter3d': 'scatter3d',
      'surface3d': 'surface',
      'contour': 'contour',
      'histogram2d': 'histogram2d',
      'boxplot': 'box',
      'violin': 'violin',
      'sunburst': 'sunburst',
      'parallel-coordinates': 'parcoords',
    };
    
    return mapping[type] || 'scatter';
  }

  private getRechartsComponent(type: string): string {
    const components: Record<string, string> = {
      'bar': 'BarChart',
      'line': 'LineChart',
      'pie': 'PieChart',
      'area': 'AreaChart',
      'radar': 'RadarChart',
      'scatter': 'ScatterChart',
      'bubble': 'ScatterChart',
    };
    
    return components[type] || 'BarChart';
  }

  private getChartJSScales(request: ChartGenerationRequest): any {
    const scales: any = {};
    
    if (request.type !== 'pie' && request.type !== 'radar') {
      scales.x = {
        display: true,
        title: {
          display: !!request.options.axisLabels?.x,
          text: request.options.axisLabels?.x,
        }
      };
      
      scales.y = {
        display: true,
        title: {
          display: !!request.options.axisLabels?.y,
          text: request.options.axisLabels?.y,
        }
      };
    }
    
    return scales;
  }

  private async generateCustomCode(request: CustomVisualizationRequest): Promise<string> {
    // This would use AI to generate custom visualization code
    // For now, return placeholder code
    return `
      // Custom ${request.library} visualization code
      // Based on requirements: ${JSON.stringify(request.requirements)}
      // Description: ${request.description}
      // Data sample: ${JSON.stringify(request.dataSample)}
    `;
  }

  private generateCustomHTML(code: string, request: CustomVisualizationRequest): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .visualization { width: ${request.requirements.dimensions.width}px; height: ${request.requirements.dimensions.height}px; }
        </style>
      </head>
      <body>
        <div class="visualization"></div>
        <script>
          ${code}
        </script>
      </body>
      </html>
    `;
  }

  // CHART LIBRARY COMPARISON
  async getLibraryComparison(): Promise<any> {
    return {
      chartjs: {
        strengths: ['Simple API', 'Good performance', 'Responsive', 'Wide browser support'],
        weaknesses: ['Limited customization', 'Basic animations', 'No 3D charts'],
        bestFor: ['Basic charts', 'Business dashboards', 'Mobile apps'],
        learningCurve: 'Easy',
      },
      d3: {
        strengths: ['Maximum customization', 'Complex visualizations', 'Data binding', 'Animations'],
        weaknesses: ['Steep learning curve', 'Verbose code', 'Performance concerns'],
        bestFor: ['Custom visualizations', 'Complex data stories', 'Interactive graphics'],
        learningCurve: 'Hard',
      },
      highcharts: {
        strengths: ['Rich features', 'Good documentation', 'Commercial support', 'Export options'],
        weaknesses: ['Commercial license', 'Less flexible than D3'],
        bestFor: ['Enterprise applications', 'Financial charts', 'Professional dashboards'],
        learningCurve: 'Medium',
      },
      recharts: {
        strengths: ['React integration', 'Declarative', 'Good performance', 'Composable'],
        weaknesses: ['React dependency', 'Limited chart types'],
        bestFor: ['React applications', 'Interactive dashboards', 'Data exploration'],
        learningCurve: 'Easy',
      },
      plotly: {
        strengths: ['Scientific charts', '3D visualizations', 'Statistical charts', 'Python integration'],
        weaknesses: ['Larger bundle size', 'Complex API'],
        bestFor: ['Scientific data', 'Research applications', 'Complex analysis'],
        learningCurve: 'Medium',
      },
    };
  }

  // CHART TEMPLATES
  async getChartTemplates(category: string): Promise<any[]> {
    const templates = {
      business: [
        { id: 'sales-dashboard', name: 'Sales Dashboard', type: 'bar', library: 'chartjs' },
        { id: 'revenue-trend', name: 'Revenue Trend', type: 'line', library: 'highcharts' },
        { id: 'market-share', name: 'Market Share', type: 'pie', library: 'recharts' },
      ],
      scientific: [
        { id: 'experiment-results', name: 'Experiment Results', type: 'scatter', library: 'plotly' },
        { id: 'data-distribution', name: 'Data Distribution', type: 'histogram2d', library: 'plotly' },
        { id: 'correlation-matrix', name: 'Correlation Matrix', type: 'heatmap', library: 'd3' },
      ],
      financial: [
        { id: 'stock-price', name: 'Stock Price', type: 'line', library: 'highcharts' },
        { id: 'portfolio-composition', name: 'Portfolio Composition', type: 'pie', library: 'chartjs' },
        { id: 'risk-analysis', name: 'Risk Analysis', type: 'radar', library: 'plotly' },
      ],
    };
    
    return templates[category as keyof typeof templates] || [];
  }
}
