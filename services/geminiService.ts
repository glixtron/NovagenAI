import { GoogleGenAI, Type } from "@google/genai";
import { PresentationData, PresentationConfig, CatalogueDesign, Product, PromptRequest } from "../types";

// Helper function to generate placeholder SVG
const generatePlaceholderSVG = (title: string, prompt: string, style: string): string => {
  const colors = {
    'Photorealistic': '#3b82f6',
    'Cartoon': '#f59e0b',
    'Watercolor': '#06b6d4',
    'Cyberpunk': '#8b5cf6',
    'Sketch': '#6b7280',
    '3D Render': '#ec4899',
    'Minimalist': '#64748b',
    'Abstract': '#f97316'
  };
  
  const color = colors[style as keyof typeof colors] || '#3b82f6';
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#grad)" />
      <rect x="50" y="50" width="700" height="350" rx="10" fill="white" fill-opacity="0.9" />
      <text x="400" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1f2937">
        ${title}
      </text>
      <text x="400" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
        ${prompt.substring(0, 80)}...
      </text>
      <circle cx="400" cy="280" r="40" fill="${color}" fill-opacity="0.3" />
      <rect x="320" y="320" width="160" height="4" rx="2" fill="${color}" />
      <rect x="280" y="340" width="240" height="4" rx="2" fill="${color}" fill-opacity="0.6" />
      <rect x="240" y="360" width="320" height="4" rx="2" fill="${color}" fill-opacity="0.3" />
    </svg>
  `)}`;
};

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Enhanced Presentation System Instruction for Deep Content
const PRESENTATION_SYSTEM_INSTRUCTION = `
You are an expert presentation designer and data analyst working for NovagenAI. 
Your task is to create comprehensive, detailed presentations with publication-ready content.

CRITICAL REQUIREMENTS:
1. CONTENT DEPTH:
   - For every slide title, generate a detailed 4-point breakdown
   - Each point must be 2-3 sentences with specific examples or data points
   - Include technical specifications, market data, or research findings
   - Avoid summaries - provide comprehensive explanations

2. VISUAL EXCELLENCE:
   - EVERY slide MUST have a high-quality, content-relevant image
   - Include at least 3 different chart types: bar, pie, line, area
   - Add maps if geographic data is relevant
   - Include infographics for processes and timelines
   - All visuals must be publication-ready

3. AUTOMATIC IMAGE GENERATION:
   - After generating slide content, automatically include: [IMAGE_PROMPT: detailed visual description]
   - This triggers automatic image generation without manual button clicks
   - Images should match the selected image style

4. NOVAGENAI BRANDING:
   - Use "NOVAGENAI" as the exclusive brand name
   - White label design with professional appearance
   - No third-party branding or references

5. QUALITY STANDARDS:
   - Every slide must be visually rich and informative
   - Include engagement questions in speaker notes
   - Add transition suggestions between slides
   - Ensure all graphics are content-relevant

FORMAT YOUR RESPONSE AS JSON ONLY.
`;

export const generatePresentationContent = async (
  config: PresentationConfig
): Promise<PresentationData> => {
  
  try {
    const modelId = 'gemini-2.5-flash';
    
    console.log('🔑 API Key Check:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
    console.log('🤖 Using Multi-AI Service for enhanced generation');
    
    // Use multi-AI service for enhanced capabilities
    const { generateMultiAIPresentation } = await import('./multiAIService');
    
    return await generateMultiAIPresentation(config, 'auto');
    
  } catch (error) {
    console.error("❌ Enhanced presentation generation failed:", error);
    
    // Fallback to basic Gemini generation
    const modelId = 'gemini-2.5-flash';
    
    console.log('📝 Generating presentation for:', config.topic);

    const parts: any[] = [];

    // Add file if present
    if (config.fileData) {
      parts.push({
        inlineData: {
          data: config.fileData.base64,
          mimeType: config.fileData.mimeType,
        },
      });
      parts.push({
        text: `Analyze this document and create a detailed presentation based on it.`
      });
    }

    const prompt = `
      Create a comprehensive ${config.length}-slide presentation about: "${config.topic}".
      Target Audience: ${config.audience}.
      Tone: ${config.tone}.
      Design Style: ${config.theme}.
      Image Style: ${config.imageStyle}.
      
      CRITICAL REQUIREMENTS:
      1. VISUAL EXCELLENCE:
         - EVERY slide MUST have a high-quality, content-relevant image
         - Include at least 3 different chart types: bar, pie, line, area
         - Add maps if geographic data is relevant
         - Include infographics for processes and timelines
         - All visuals must be publication-ready
      
      2. CONTENT DEPTH:
         - Provide expert-level information with specific data points
         - Include realistic statistics and facts
         - Add comprehensive speaker notes with talking points
         - Ensure logical flow with smooth transitions
      
      3. NOVAGENAI BRANDING:
         - Use "NOVAGENAI" as the exclusive brand name
         - White label design with professional appearance
         - No third-party branding or references
      
      4. QUALITY STANDARDS:
         - Every slide must be visually rich and informative
         - Include engagement questions in speaker notes
         - Add transition suggestions between slides
         - Ensure all graphics are content-relevant
    `;
    
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: PRESENTATION_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  content: { type: Type.ARRAY, items: { type: Type.STRING } },
                  speakerNotes: { type: Type.STRING },
                  imagePrompt: { type: Type.STRING },
                  transition: { type: Type.STRING },
                  chart: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, enum: ["bar", "pie", "line", "area", "scatter"] },
                      title: { type: Type.STRING },
                      labels: { type: Type.ARRAY, items: { type: Type.STRING } },
                      values: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                    }
                  },
                  map: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, enum: ["world", "country", "region", "city"] },
                      title: { type: Type.STRING },
                      locations: { type: Type.ARRAY, items: { type: Type.STRING } },
                      values: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                    }
                  },
                  infographic: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, enum: ["timeline", "process", "comparison", "statistics"] },
                      title: { type: Type.STRING },
                      steps: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                },
                required: ["id", "title", "content", "speakerNotes", "imagePrompt"]
              }
            }
          },
          required: ["title", "slides"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text) as PresentationData;
    
    // Inject configuration into result so the viewer knows how to render/generate images
    data.theme = config.theme;
    data.aspectRatio = config.aspectRatio;
    data.imageStyle = config.imageStyle;
    data.enableAnimations = config.enableAnimations;
    
    // Add NovagenAI branding
    data.branding = {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    };
    
    // Auto-generate images for all slides immediately
    const slidesWithImages = await Promise.all(
      data.slides.map(async (slide, index) => {
        let imageUrl = "";
        
        // Generate image for every slide automatically
        if (slide.imagePrompt) {
          try {
            console.log(`🎨 Auto-generating image for slide ${index + 1}: ${slide.title}`);
            imageUrl = await generateRealImage(slide.imagePrompt, config.aspectRatio);
            console.log(`✅ Image generated for slide ${index + 1}`);
          } catch (error) {
            console.error(`❌ Failed to generate image for slide ${index + 1}:`, error);
            // Create a placeholder SVG as fallback
            imageUrl = generatePlaceholderSVG(slide.title, slide.imagePrompt, config.imageStyle);
          }
        }
        
        return {
          ...slide,
          id: slide.id || `slide-${index}`,
          // Ensure speaker notes are comprehensive
          speakerNotes: slide.speakerNotes || `Detailed talking points for slide ${index + 1}. Include engagement questions and data insights.`,
          // Ensure image prompts are detailed
          imagePrompt: slide.imagePrompt || `Professional ${config.imageStyle} style image related to ${slide.title}`,
          // Add default transition if missing
          transition: slide.transition || "fade",
          // Add generated image
          imageUrl: imageUrl
        };
      })
    );
    
    data.slides = slidesWithImages;
    
    return data;
  }
};

// New function to generate actual images using Gemini Image Model
export const generateRealImage = async (prompt: string, aspectRatio: string = "1:1"): Promise<string> => {
    try {
        // "Nano Banana" equivalent for image generation
        const modelId = 'gemini-2.5-flash-image';
        
        const response = await ai.models.generateContent({
            model: modelId,
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio as any
                }
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return part.inlineData.data;
                }
            }
        }
        throw new Error("No image data in response");
    } catch (error) {
        console.error("Image generation failed:", error);
        throw error;
    }
}

export const convertContent = async (
  inputContent: string,
  targetFormat: string,
  inputFile?: { base64: string; mimeType: string }
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const parts: any[] = [];

    if (inputFile) {
       parts.push({
        inlineData: {
          data: inputFile.base64,
          mimeType: inputFile.mimeType,
        },
      });
    }

    parts.push({
      text: `Convert the following content/file content into: ${targetFormat}.\n\nInput Content (if text provided): ${inputContent}`
    });

    const CONVERTER_SYSTEM_INSTRUCTION = `
      You are a universal data and content converter. 
      Output ONLY the converted content, no conversational filler.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: CONVERTER_SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Conversion failed.";

  } catch (error) {
    console.error("Error converting content:", error);
    throw error;
  }
};

export const enhanceImage = async (
  imageBase64: string,
  mimeType: string,
  instruction: string
): Promise<{ base64: string; mimeType: string }> => {
  try {
    const modelId = 'gemini-2.5-flash-image';
    const parts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      {
        text: instruction || "Enhance this image and remove any watermarks or text overlays.",
      },
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType || 'image/png'
          };
        }
      }
    }

    throw new Error("No image generated by the model");
  } catch (error) {
    console.error("Error enhancing image:", error);
    throw error;
  }
};

export const generateImageVariation = async (
  imageBase64: string,
  mimeType: string,
  originalPrompt: string
): Promise<string> => {
  try {
    // Generate a variation of the provided image
    const modelId = 'gemini-2.5-flash-image';
    const parts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      {
        // We instruct the model to create a variation based on the image
        text: `Generate a variation of this image. Keep the style and content similar. Context: ${originalPrompt}`,
      },
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    throw new Error("No image generated by the model");
  } catch (error) {
    console.error("Error generating variation:", error);
    throw error;
  }
};

// --- PROMPT GENERATOR ---
export const generateDetailedPrompt = async (req: PromptRequest): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = `
      Act as a professional prompt engineer for ${req.platform}.
      I have a basic idea: "${req.idea}".
      Style: ${req.style}.
      Aspect Ratio: ${req.aspectRatio}.
      
      Create a highly detailed, optimized prompt that includes lighting, camera angles, texture, composition, and keywords specific to ${req.platform} to get the best possible result.
      Output ONLY the prompt string, no explanations.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts: [{ text: prompt }] }
    });
    
    return response.text?.trim() || "Failed to generate prompt.";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --- CATALOGUE GENERATOR ---
export const generateCatalogueDesign = async (
  products: Product[],
  command: string,
  currentDesign?: CatalogueDesign
): Promise<CatalogueDesign> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    // We send product info (names/cats) but not the full images to save tokens, just context.
    const productSummary = products.map(p => `${p.name} (${p.category}) - ${p.price}`).join(', ');

    const prompt = `
      You are an expert UI/UX Designer and Catalogue Maker.
      
      User Command: "${command}"
      Products Context: ${productSummary}
      
      ${currentDesign ? `Current Design State: ${JSON.stringify(currentDesign)}` : 'This is a new catalogue request.'}

      Generate a design configuration object for this catalogue. 
      Decide on a professional color palette, font, and layout based on the user's command or the product vibe.
      Also, generate a catchy 'title' for the catalogue.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts: [{ text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            themeName: { type: Type.STRING },
            backgroundColor: { type: Type.STRING, description: "Hex code or Tailwind bg class (e.g. bg-slate-900)" },
            cardBackgroundColor: { type: Type.STRING, description: "Hex code or Tailwind bg class" },
            textColor: { type: Type.STRING, description: "Hex code or Tailwind text class" },
            accentColor: { type: Type.STRING, description: "Hex code" },
            fontFamily: { type: Type.STRING, enum: ['Inter', 'Playfair Display', 'Roboto Mono', 'Dancing Script'] },
            layout: { type: Type.STRING, enum: ['grid-2', 'grid-3', 'list', 'featured'] }
          },
          required: ["title", "themeName", "backgroundColor", "cardBackgroundColor", "textColor", "accentColor", "fontFamily", "layout"]
        }
      }
    });

    const design = JSON.parse(response.text || '{}') as CatalogueDesign;
    // Ensure we return the items (the model doesn't return items, we keep existing ones)
    return design;

  } catch (error) {
    console.error(error);
    throw error;
  }
};