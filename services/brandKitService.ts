// Advanced Brand Kit Service for NovagenAI
import { PresentationData } from '../types';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
}

export interface BrandKit {
  colors: BrandColors;
  fonts: {
    heading: string;
    body: string;
  };
  logo?: string;
  name: string;
}

// Extract colors from image using canvas
export const extractColorsFromImage = async (imageUrl: string): Promise<BrandColors> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple color extraction algorithm
      const colorCounts: { [key: string]: number } = {};
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a > 0) { // Only count non-transparent pixels
          const hex = rgbToHex(r, g, b);
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
      }
      
      // Get top colors
      const sortedColors = Object.entries(colorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([hex]) => hex);
      
      // Generate brand colors from extracted colors
      const brandColors = generateBrandColors(sortedColors);
      resolve(brandColors);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};

// Convert RGB to Hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Generate brand colors from extracted colors
const generateBrandColors = (extractedColors: string[]): BrandColors => {
  const primary = extractedColors[0] || '#3b82f6';
  const secondary = extractedColors[1] || '#64748b';
  const accent = extractedColors[2] || '#10b981';
  
  return {
    primary,
    secondary,
    accent,
    background: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b'
  };
};

// Extract colors from website URL (simulated)
export const extractColorsFromWebsite = async (url: string): Promise<BrandColors> => {
  // In a real implementation, this would:
  // 1. Fetch the website HTML
  // 2. Parse for favicon, logo images
  // 3. Extract colors from those images
  // 4. Parse CSS for color variables
  
  // For now, return a default professional color scheme
  return {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#10b981',
    background: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b'
  };
};

// Apply brand colors to presentation
export const applyBrandKit = (presentation: PresentationData, brandKit: BrandKit): PresentationData => {
  const updatedPresentation = { ...presentation };
  
  // Update branding information
  updatedPresentation.branding = {
    company: brandKit.name,
    logo: brandKit.logo || 'N',
    tagline: 'AI-Powered Presentations',
    colors: brandKit.colors,
    fonts: brandKit.fonts
  };
  
  // Apply colors to slides (this would be more sophisticated in a real implementation)
  updatedPresentation.slides = presentation.slides.map(slide => ({
    ...slide,
    brandColors: brandKit.colors
  }));
  
  return updatedPresentation;
};

// Generate CSS variables from brand colors
export const generateCSSVariables = (brandColors: BrandColors): string => {
  return `
    :root {
      --brand-primary: ${brandColors.primary};
      --brand-secondary: ${brandColors.secondary};
      --brand-accent: ${brandColors.accent};
      --brand-background: ${brandColors.background};
      --brand-text: ${brandColors.text};
      --brand-text-light: ${brandColors.textLight};
    }
  `;
};

// Smart color harmony generator
export const generateColorHarmony = (baseColor: string): BrandColors => {
  // Convert hex to RGB
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Convert to HSL
  const hsl = rgbToHsl(r, g, b);
  
  // Generate complementary colors
  const complementary = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
  const triadic1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
  const triadic2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
  
  return {
    primary: baseColor,
    secondary: complementary,
    accent: triadic1,
    background: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b'
  };
};

// RGB to HSL conversion
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
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
  
  return { h: h * 360, s: s, l: l };
};

// HSL to Hex conversion
const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
  
  return rgbToHex(r, g, b);
};
