import { GoogleGenAI, Type } from "@google/genai";
import { PresentationData, PresentationConfig, CatalogueDesign, Product, PromptRequest } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PRESENTATION_SYSTEM_INSTRUCTION = `
You are an expert presentation designer and data analyst.
Your goal is to create highly visual, structured, and professional presentations.
1. Content: Clear, concise bullet points (max 4 per slide).
2. Visuals: For EVERY slide, provide a highly descriptive 'imagePrompt' suitable for AI image generation. 
   - The prompt MUST strictly adhere to the user's requested 'Image Style'.
   - Example for 'Cyberpunk': "A futuristic city skyline with neon lights, high contrast, cyan and magenta hues, 4k, realistic texture."
   - Example for 'Watercolor': "Soft watercolor painting of a city skyline, pastel colors, artistic brush strokes, white background."
3. Data: If the topic involves numbers, trends, or comparisons, include a 'chart' object with realistic data.
4. Structure: logical flow.
`;

export const generatePresentationContent = async (
  config: PresentationConfig
): Promise<PresentationData> => {
  
  try {
    const modelId = 'gemini-3-flash-preview';

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
      Create a detailed ${config.length}-slide presentation about: "${config.topic}".
      Target Audience: ${config.audience}.
      Tone: ${config.tone}.
      Design Style: ${config.theme}.
      Image Style for visuals: ${config.imageStyle}.
      
      Requirements:
      - Include at least 2 slides with relevant charts/graphs (bar, pie, or line) representing realistic data for this topic.
      - Every slide must have a descriptive image prompt that matches the '${config.imageStyle}' style.
      - Make the content detailed and professional.
    `;
    
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: PRESENTATION_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Main title" },
            subtitle: { type: Type.STRING, description: "Subtitle" },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "Unique ID (e.g. 'slide-1')" },
                  title: { type: Type.STRING },
                  content: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "3-4 bullet points" 
                  },
                  speakerNotes: { type: Type.STRING },
                  imagePrompt: { type: Type.STRING, description: `A detailed description of a visual in ${config.imageStyle} style.` },
                  chart: {
                    type: Type.OBJECT,
                    description: "Optional chart data if relevant.",
                    properties: {
                      type: { type: Type.STRING, enum: ["bar", "pie", "line"] },
                      title: { type: Type.STRING },
                      labels: { type: Type.ARRAY, items: { type: Type.STRING } },
                      values: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                      seriesName: { type: Type.STRING }
                    },
                    required: ["type", "title", "labels", "values"]
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
    data.slides = data.slides.map((s, i) => ({ ...s, id: s.id || `slide-${i}` }));
    
    return data;

  } catch (error) {
    console.error("Error generating presentation:", error);
    throw error;
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
    const modelId = 'gemini-3-flash-preview';
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
    const modelId = 'gemini-3-flash-preview';
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
    const modelId = 'gemini-3-flash-preview';
    
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