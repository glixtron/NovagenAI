// AI Voice Narration Service for NovagenAI
import { PresentationData, Slide } from '../types';

export interface VoiceOptions {
  voiceId: string;
  model: 'eleven_multilingual_v2' | 'eleven_monolingual_v1';
  stability: 0.5 | 0.75 | 1.0;
  similarityBoost: 0.5 | 0.7 | 0.8 | 0.9 | 1.0;
  style: 'narrative' | 'conversational' | 'professional' | 'casual';
  speed: 0.75 | 0.8 | 0.9 | 1.0 | 1.1 | 1.25;
}

export interface NarrationSegment {
  slideId: string;
  text: string;
  audioUrl: string;
  duration: number;
}

export class VoiceNarrationService {
  private apiKey: string;
  private voiceOptions: VoiceOptions;

  constructor(apiKey: string, voiceOptions: Partial<VoiceOptions> = {}) {
    this.apiKey = apiKey;
    this.voiceOptions = {
      voiceId: 'Rachel', // Default voice
      model: 'eleven_multilingual_v2',
      stability: 0.75,
      similarityBoost: 0.8,
      style: 'narrative',
      speed: 1.0,
      ...voiceOptions
    };
  }

  // Generate narration for entire presentation
  async generateNarration(presentation: PresentationData): Promise<NarrationSegment[]> {
    const segments: NarrationSegment[] = [];
    
    for (const slide of presentation.slides) {
      const segment = await this.generateSlideNarration(slide, segments.length);
      segments.push(segment);
    }
    
    return segments;
  }

  // Generate narration for a single slide
  async generateSlideNarration(slide: Slide, index: number): Promise<NarrationSegment> {
    // Combine title and content into narration text
    const narrationText = this.createNarrationText(slide);
    
    try {
      const audioUrl = await this.synthesizeSpeech(narrationText);
      const duration = await this.getAudioDuration(audioUrl);
      
      return {
        slideId: slide.id,
        text: narrationText,
        audioUrl,
        duration
      };
    } catch (error) {
      console.error(`Error generating narration for slide ${slide.id}:`, error);
      throw error;
    }
  }

  // Create narration text from slide content
  private createNarrationText(slide: Slide): string {
    let text = slide.title + '. ';
    
    // Add content paragraphs
    if (slide.content && slide.content.length > 0) {
      text += slide.content.join(' ');
    }
    
    // Add speaker notes if available
    if (slide.speakerNotes) {
      text += ' ' + slide.speakerNotes;
    }
    
    return text;
  }

  // Synthesize speech using ElevenLabs API
  private async synthesizeSpeech(text: string): Promise<string> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceOptions.model}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text: text,
        voice_id: this.voiceOptions.voiceId,
        model_id: this.voiceOptions.model,
        voice_settings: {
          stability: this.voiceOptions.stability,
          similarity_boost: this.voiceOptions.similarityBoost,
          style: this.voiceOptions.style,
          use_speaker_boost: true,
          speed: this.voiceOptions.speed
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  }

  // Get audio duration from blob URL
  private async getAudioDuration(audioUrl: string): Promise<number> {
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', () => {
        resolve(0); // Default duration if error
      });
    });
  }

  // Generate audio file for download
  async generateAudioFile(segments: NarrationSegment[]): Promise<Blob> {
    const audioBuffers: ArrayBuffer[] = [];
    
    for (const segment of segments) {
      const response = await fetch(segment.audioUrl);
      const buffer = await response.arrayBuffer();
      audioBuffers.push(buffer);
    }
    
    // Combine all audio segments
    const totalLength = audioBuffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const buffer of audioBuffers) {
      combinedBuffer.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }
    
    return new Blob([combinedBuffer], { type: 'audio/mpeg' });
  }

  // Get available voices
  async getAvailableVoices(): Promise<any[]> {
    const url = 'https://api.elevenlabs.io/v1/voices';
    
    const response = await fetch(url, {
      headers: {
        'xi-api-key': this.apiKey,
      }
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Update voice options
  updateVoiceOptions(options: Partial<VoiceOptions>): void {
    this.voiceOptions = { ...this.voiceOptions, ...options };
  }

  // Clean up audio URLs
  cleanupAudioUrls(segments: NarrationSegment[]): void {
    segments.forEach(segment => {
      if (segment.audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(segment.audioUrl);
      }
    });
  }
}

// Export function for easy usage
export const generateVoiceNarration = async (
  presentation: PresentationData,
  apiKey: string,
  voiceOptions: Partial<VoiceOptions> = {}
): Promise<NarrationSegment[]> => {
  const service = new VoiceNarrationService(apiKey, voiceOptions);
  return await service.generateNarration(presentation);
};

// Generate audio file for download
export const generateNarrationAudio = async (
  presentation: PresentationData,
  apiKey: string,
  voiceOptions: Partial<VoiceOptions> = {}
): Promise<Blob> => {
  const service = new VoiceNarrationService(apiKey, voiceOptions);
  const segments = await service.generateNarration(presentation);
  const audioBlob = await service.generateAudioFile(segments);
  service.cleanupAudioUrls(segments);
  return audioBlob;
};
