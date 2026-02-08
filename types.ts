export interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'area' | 'scatter';
  title: string;
  labels: string[];
  values: number[];
  seriesName?: string;
  color?: string; // Hex color override
}

export interface MapData {
  type: 'world' | 'country' | 'region' | 'city';
  title: string;
  locations: string[];
  values: number[];
}

export interface InfographicData {
  type: 'timeline' | 'process' | 'comparison' | 'statistics';
  title: string;
  steps: string[];
}

export interface Slide {
  id: string; // Unique ID for React keys
  title: string;
  content: string[];
  speakerNotes?: string;
  imagePrompt?: string; 
  imageUrl?: string; // Base64 generated image
  chart?: ChartData;
  map?: MapData;
  infographic?: InfographicData;
  transition?: string; // Suggested transition to next slide
}

export type ThemeId = 'modern' | 'corporate' | 'minimal' | 'vibrant' | 'dark';
export type AspectRatio = '16:9' | '1:1' | '4:3' | '3:4' | '9:16';
export type ImageStyle = 'Photorealistic' | 'Cartoon' | 'Watercolor' | 'Cyberpunk' | 'Sketch' | '3D Render' | 'Minimalist' | 'Abstract';

export interface PresentationData {
  title: string;
  subtitle?: string;
  slides: Slide[];
  theme: ThemeId;
  aspectRatio: AspectRatio; // Store for generation usage
  imageStyle: ImageStyle;   // Store for context
  enableAnimations?: boolean; // New field
  branding?: {
    company: string;
    logo: string;
    tagline: string;
  };
}

export interface PresentationConfig {
  topic: string;
  fileData?: {
    base64: string;
    mimeType: string;
  };
  audience: string;
  tone: string;
  length: number; 
  theme: ThemeId;
  aspectRatio: AspectRatio;
  imageStyle: ImageStyle;
  enableAnimations: boolean; // New field
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type NavView = 'home' | 'presentation' | 'converter' | 'image-editor' | 'pdf-editor' | 'prompt-generator' | 'catalogue-generator' | 'image-generator' | 'logo-designer';

export interface ConversionResult {
  content: string;
  format: string;
}

export interface ImageResult {
  base64: string;
  mimeType: string;
}

// Catalogue Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string; // base64
}

export interface CatalogueDesign {
  themeName: string;
  backgroundColor: string; // Hex or tailwind class
  cardBackgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'grid-2' | 'grid-3' | 'list' | 'featured';
  title: string;
}

// Prompt Generator Types
export interface PromptRequest {
  idea: string;
  platform: 'Midjourney' | 'DALL-E' | 'Stable Diffusion' | 'Gemini';
  style: string;
  aspectRatio: string;
}