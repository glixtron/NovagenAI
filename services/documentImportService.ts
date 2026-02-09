// Multi-Source Document Import Service for NovagenAI
import { PresentationConfig } from '../types';

export interface ImportedContent {
  title: string;
  content: string;
  metadata: {
    source: string;
    type: 'pdf' | 'word' | 'youtube' | 'text';
    pageCount?: number;
    duration?: string;
    author?: string;
    extractedAt: Date;
  };
}

export interface YouTubeVideoInfo {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  transcript: string;
  channel: string;
  publishedAt: string;
}

export class DocumentImportService {
  // Import from PDF file
  async importPDF(file: File): Promise<ImportedContent> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const pdfContent = await this.extractPDFContent(arrayBuffer);
          
          resolve({
            title: this.extractTitleFromPDF(pdfContent) || file.name.replace('.pdf', ''),
            content: pdfContent,
            metadata: {
              source: file.name,
              type: 'pdf',
              pageCount: await this.getPDFPageCount(arrayBuffer),
              extractedAt: new Date()
            }
          });
        } catch (error) {
          reject(new Error(`Failed to import PDF: ${error}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    });
  }

  // Import from Word document
  async importWord(file: File): Promise<ImportedContent> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const wordContent = await this.extractWordContent(arrayBuffer);
          
          resolve({
            title: this.extractTitleFromWord(wordContent) || file.name.replace('.docx', ''),
            content: wordContent,
            metadata: {
              source: file.name,
              type: 'word',
              extractedAt: new Date()
            }
          });
        } catch (error) {
          reject(new Error(`Failed to import Word document: ${error}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read Word file'));
      reader.readAsArrayBuffer(file);
    });
  }

  // Import from YouTube video
  async importYouTube(url: string): Promise<ImportedContent> {
    try {
      const videoInfo = await this.getYouTubeVideoInfo(url);
      
      return {
        title: videoInfo.title,
        content: this.processYouTubeContent(videoInfo),
        metadata: {
          source: url,
          type: 'youtube',
          duration: videoInfo.duration,
          author: videoInfo.channel,
          extractedAt: new Date()
        }
      };
    } catch (error) {
      throw new Error(`Failed to import YouTube video: ${error}`);
    }
  }

  // Extract content from PDF
  private async extractPDFContent(arrayBuffer: ArrayBuffer): Promise<string> {
    // In a real implementation, this would use pdf.js or similar library
    // For now, return a placeholder implementation
    return new Promise((resolve) => {
      // Simulate PDF content extraction
      const content = `
        This is extracted PDF content. In a real implementation, this would:
        1. Parse the PDF structure
        2. Extract text from each page
        3. Preserve formatting and structure
        4. Handle images and tables
        
        Sample content would appear here...
      `;
      resolve(content);
    });
  }

  // Extract content from Word document
  private async extractWordContent(arrayBuffer: ArrayBuffer): Promise<string> {
    // In a real implementation, this would use a library like mammoth.js
    return new Promise((resolve) => {
      // Simulate Word content extraction
      const content = `
        This is extracted Word document content. In a real implementation, this would:
        1. Parse the DOCX structure
        2. Extract text from paragraphs
        3. Preserve formatting (bold, italic, etc.)
        4. Handle tables and images
        
        Sample content would appear here...
      `;
      resolve(content);
    });
  }

  // Get YouTube video information
  private async getYouTubeVideoInfo(url: string): Promise<YouTubeVideoInfo> {
    // Extract video ID from URL
    const videoId = this.extractYouTubeVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    try {
      // In a real implementation, this would use YouTube API
      // For now, return mock data
      return {
        title: 'Sample YouTube Video Title',
        description: 'This is a sample description of the YouTube video...',
        duration: '10:30',
        thumbnail: 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg',
        transcript: 'This is the transcript of the YouTube video. In a real implementation, this would use YouTube\'s caption API or speech-to-text services.',
        channel: 'Sample Channel',
        publishedAt: '2024-01-01T00:00:00Z'
      };
    } catch (error) {
      throw new Error(`Failed to fetch YouTube video info: ${error}`);
    }
  }

  // Extract YouTube video ID from URL
  private extractYouTubeVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  }

  // Process YouTube content for presentation
  private processYouTubeContent(videoInfo: YouTubeVideoInfo): string {
    let content = `Video Title: ${videoInfo.title}\n\n`;
    content += `Channel: ${videoInfo.channel}\n`;
    content += `Duration: ${videoInfo.duration}\n\n`;
    
    if (videoInfo.description) {
      content += `Description:\n${videoInfo.description}\n\n`;
    }
    
    if (videoInfo.transcript) {
      content += `Transcript:\n${videoInfo.transcript}`;
    }
    
    return content;
  }

  // Extract title from PDF content
  private extractTitleFromPDF(content: string): string | null {
    // Simple title extraction - in real implementation would be more sophisticated
    const lines = content.split('\n');
    for (const line of lines.slice(0, 10)) {
      const trimmed = line.trim();
      if (trimmed.length > 10 && trimmed.length < 100) {
        return trimmed;
      }
    }
    return null;
  }

  // Extract title from Word content
  private extractTitleFromWord(content: string): string | null {
    // Similar to PDF extraction
    return this.extractTitleFromPDF(content);
  }

  // Get PDF page count
  private async getPDFPageCount(arrayBuffer: ArrayBuffer): Promise<number> {
    // In a real implementation, this would parse PDF structure
    return new Promise((resolve) => {
      // Simulate page count
      resolve(10);
    });
  }

  // Convert imported content to presentation config
  convertToPresentationConfig(importedContent: ImportedContent): Partial<PresentationConfig> {
    return {
      topic: importedContent.title,
      // In a real implementation, this would use AI to analyze and structure the content
      audience: 'General',
      tone: 'Professional',
      length: 5, // Default length
      theme: 'modern',
      aspectRatio: '16:9',
      imageStyle: 'Photorealistic',
      enableAnimations: true
    };
  }

  // Validate file type
  validateFileType(file: File): boolean {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    return validTypes.includes(file.type);
  }

  // Validate YouTube URL
  validateYouTubeUrl(url: string): boolean {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/,
      /^https?:\/\/youtu\.be\//,
      /^https?:\/\/(www\.)?youtube\.com\/embed\//
    ];
    
    return patterns.some(pattern => pattern.test(url));
  }
}

// Export function for easy usage
export const importDocument = async (
  file: File
): Promise<ImportedContent> => {
  const service = new DocumentImportService();
  
  if (!service.validateFileType(file)) {
    throw new Error('Invalid file type. Please upload a PDF or Word document.');
  }
  
  if (file.type === 'application/pdf') {
    return await service.importPDF(file);
  } else {
    return await service.importWord(file);
  }
};

export const importYouTubeVideo = async (
  url: string
): Promise<ImportedContent> => {
  const service = new DocumentImportService();
  
  if (!service.validateYouTubeUrl(url)) {
    throw new Error('Invalid YouTube URL');
  }
  
  return await service.importYouTube(url);
};
