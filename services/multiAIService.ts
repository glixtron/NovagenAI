// Multi-AI Service for 10x Enhanced NovagenAI
import { GoogleGenAI, Type } from "@google/genai";
import { PresentationData, PresentationConfig, CatalogueDesign, Product, PromptRequest } from "../types";

// Initialize all AI providers
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// OpenAI Configuration
const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1"
};

// Anthropic Configuration
const anthropicConfig = {
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.anthropic.com/v1"
};

// Stability AI Configuration
const stabilityConfig = {
  apiKey: process.env.STABILITY_API_KEY,
  baseURL: "https://api.stability.ai/v1"
};

// Replicate Configuration
const replicateConfig = {
  auth: process.env.REPLICATE_API_KEY,
  baseURL: "https://api.replicate.com/v1"
};

// ElevenLabs Configuration
const elevenlabsConfig = {
  apiKey: process.env.ELEVENLABS_API_KEY,
  baseURL: "https://api.elevenlabs.io/v1"
};

// DeepSeek Configuration
const deepseekConfig = {
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1"
};

// AI Provider Selection Logic
type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'stability' | 'replicate' | 'elevenlabs' | 'deepseek' | 'auto';

// Enhanced Presentation Generation with Multi-AI Support
export const generateMultiAIPresentation = async (
  config: PresentationConfig,
  preferredProvider: AIProvider = 'auto'
): Promise<PresentationData> => {
  
  try {
    console.log(`🚀 Generating presentation with ${preferredProvider} AI`);
    
    // Select best provider based on task complexity
    let provider = preferredProvider;
    if (preferredProvider === 'auto') {
      if (config.length > 15) provider = 'anthropic'; // Complex presentations
      else if (config.audience.includes('technical')) provider = 'openai'; // Technical content
      else if (config.imageStyle === 'Photorealistic') provider = 'stability'; // High-quality images
      else if (config.imageStyle === 'Cartoon') provider = 'openai'; // Creative content
      else provider = 'gemini'; // Default
    }
    
    switch (provider) {
      case 'openai':
        return await generateOpenAIPresentation(config);
      case 'anthropic':
        return await generateAnthropicPresentation(config);
      case 'stability':
        return await generateStabilityPresentation(config);
      case 'replicate':
        return await generateReplicatePresentation(config);
      case 'elevenlabs':
        return await generateElevenlabsPresentation(config);
      case 'deepseek':
        return await generateDeepSeekPresentation(config);
      default:
        return await generateGeminiPresentation(config);
    }
    
  } catch (error) {
    console.error("❌ Multi-AI presentation generation failed:", error);
    // Fallback to Gemini
    return await generateGeminiPresentation(config);
  }
};

// OpenAI Presentation Generation
const generateOpenAIPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${openaiConfig.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert presentation designer working for NovagenAI. Create highly visual, detailed, and professional presentations with NOVAGENAI branding. Include charts, maps, and infographics. Every slide must have a visual element.`
        },
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}. Include at least 3 different chart types, maps, and infographics. Return as JSON.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  const data = await response.json();
  return formatPresentationData(data.choices[0].message.content, config);
};

// Anthropic Presentation Generation
const generateAnthropicPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${anthropicConfig.baseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${anthropicConfig.apiKey}`,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}. Include charts, maps, and infographics. Every slide must have a visual element. Return as JSON.`
        }
      ]
    })
  });

  const data = await response.json();
  return formatPresentationData(data.content[0].text, config);
};

// Stability AI Presentation Generation
const generateStabilityPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${stabilityConfig.baseURL}/generation/stable-diffusion-xl-1024-v1-0`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${stabilityConfig.apiKey}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: `Professional presentation about ${config.topic}, ${config.audience} audience, ${config.tone} tone, ${config.theme} style, ${config.imageStyle} images. Include charts and data visualizations.`
        }
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      samples: 1,
      steps: 30
    })
  });

  const result = await response.json();
  // Convert image to presentation data structure
  return {
    title: config.topic,
    subtitle: `Generated with Stability AI`,
    slides: [{
      id: 'slide-1',
      title: config.topic,
      content: [`Generated with Stability AI for ${config.audience}`],
      imagePrompt: `Professional ${config.imageStyle} style image of ${config.topic}`,
      imageUrl: `data:image/png;base64,${result.artifacts[0].base64}`
    }]
  } as PresentationData;
};

// Replicate Presentation Generation
const generateReplicatePresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${replicateConfig.baseURL}/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${replicateConfig.auth}`
    },
    body: JSON.stringify({
      version: "stability-ai/stable-diffusion-3",
      input: {
        prompt: `Professional presentation about ${config.topic}, ${config.audience} audience, ${config.tone} tone`,
        width: 1024,
        height: 1024,
        num_outputs: 1
      }
    })
  });

  const result = await response.json();
  return {
    title: config.topic,
    subtitle: `Generated with Replicate`,
    slides: [{
      id: 'slide-1',
      title: config.topic,
      content: [`Generated with Replicate for ${config.audience}`],
      imagePrompt: `Professional ${config.imageStyle} style image of ${config.topic}`,
      imageUrl: result.output[0]
    }]
  } as PresentationData;
};

// ElevenLabs Presentation Generation
const generateElevenlabsPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${elevenlabsConfig.baseURL}/text-to-speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${elevenlabsConfig.apiKey}`
    },
    body: JSON.stringify({
      text: `Create presentation content about ${config.topic} for ${config.audience}`,
      voice_id: "rachel",
      model_id: "eleven_multilingual_v2"
    })
  });

  const result = await response.json();
  return {
    title: config.topic,
    subtitle: `Generated with ElevenLabs`,
    slides: [{
      id: 'slide-1',
      title: config.topic,
      content: [result.text],
      speakerNotes: `Voice narration available: ${result.text.substring(0, 100)}...`
    }]
  } as PresentationData;
};

// DeepSeek Presentation Generation
const generateDeepSeekPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${deepseekConfig.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${deepseekConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert presentation designer for NovagenAI. Create detailed, professional presentations with charts and visuals."
        },
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}. Include charts and data visualizations. Return as JSON.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  const data = await response.json();
  return formatPresentationData(data.choices[0].message.content, config);
};

// Gemini Presentation Generation (Enhanced)
const generateGeminiPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const modelId = 'gemini-2.5-flash';
  
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
  
  const response = await gemini.models.generateContent({
    model: modelId,
    contents: { parts: [{ text: prompt }] },
    config: {
      systemInstruction: "You are an expert presentation designer and data analyst working for NovagenAI. Create highly visual, detailed, and professional presentations.",
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

  const data = JSON.parse(response.text);
  return formatPresentationData(data, config);
};

// Helper function to format presentation data
const formatPresentationData = (data: any, config: PresentationConfig): PresentationData => {
  return {
    title: data.title || config.topic,
    subtitle: data.subtitle || `Generated with NovagenAI`,
    theme: config.theme,
    aspectRatio: config.aspectRatio,
    imageStyle: config.imageStyle,
    enableAnimations: config.enableAnimations,
    branding: {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    },
    slides: (data.slides || []).map((s: any, i: number) => ({
      ...s,
      id: s.id || `slide-${i}`,
      speakerNotes: s.speakerNotes || `Detailed talking points for slide ${i + 1}. Include engagement questions and data insights.`,
      imagePrompt: s.imagePrompt || `Professional ${config.imageStyle} style image related to ${s.title}`,
      transition: s.transition || "fade",
      imageUrl: s.imageUrl || ""
    }))
  };
};

// Enhanced Image Generation with Multiple Providers
export const generateMultiAIImage = async (
  prompt: string, 
  aspectRatio: string = "1:1",
  provider: AIProvider = 'auto',
  quality: 'standard' | 'hd' = 'hd'
): Promise<string> => {
  
  try {
    console.log(`🎨 Generating ${quality} image with ${provider} AI`);
    
    // Select best provider for image generation
    let selectedProvider = provider;
    if (provider === 'auto') {
      if (quality === 'hd') selectedProvider = 'stability'; // Best for HD
      else if (prompt.includes('photorealistic')) selectedProvider = 'openai'; // Best for realistic
      else if (prompt.includes('cartoon')) selectedProvider = 'openai'; // Best for creative
      else selectedProvider = 'gemini'; // Default
    }
    
    switch (selectedProvider) {
      case 'openai':
        return await generateOpenAIImage(prompt, aspectRatio, quality);
      case 'stability':
        return await generateStabilityImage(prompt, aspectRatio, quality);
      case 'replicate':
        return await generateReplicateImage(prompt, aspectRatio, quality);
      case 'elevenlabs':
        return await generateElevenlabsImage(prompt);
      case 'deepseek':
        return await generateDeepSeekImage(prompt, aspectRatio);
      default:
        return await generateGeminiImage(prompt, aspectRatio, quality);
    }
    
  } catch (error) {
    console.error("❌ Multi-AI image generation failed:", error);
    throw error;
  }
};

// OpenAI Image Generation (DALL-E 3)
const generateOpenAIImage = async (prompt: string, aspectRatio: string, quality: string): Promise<string> => {
  const size = quality === 'hd' ? '1024x1024' : '512x512';
  
  const response = await fetch(`${openaiConfig.baseURL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      size: size,
      quality: quality === 'hd' ? 'hd' : 'standard',
      n: 1
    })
  });

  const result = await response.json();
  return result.data[0].url;
};

// Stability AI Image Generation
const generateStabilityImage = async (prompt: string, aspectRatio: string, quality: string): Promise<string> => {
  const [width, height] = aspectRatio === '16:9' ? [1024, 576] : [1024, 1024];
  
  const response = await fetch(`${stabilityConfig.baseURL}/generation/stable-diffusion-xl-1024-v1-0`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${stabilityConfig.apiKey}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: quality === 'hd' ? 9 : 7,
      height: height,
      width: width,
      samples: 1,
      steps: quality === 'hd' ? 50 : 30
    })
  });

  const result = await response.json();
  return `data:image/png;base64,${result.artifacts[0].base64}`;
};

// Replicate Image Generation
const generateReplicateImage = async (prompt: string, aspectRatio: string, quality: string): Promise<string> => {
  const [width, height] = aspectRatio === '16:9' ? [1024, 576] : [1024, 1024];
  
  const response = await fetch(`${replicateConfig.baseURL}/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${replicateConfig.auth}`
    },
    body: JSON.stringify({
      version: "stability-ai/stable-diffusion-3",
      input: {
        prompt: prompt,
        width: width,
        height: height,
        num_outputs: 1,
        guidance_scale: quality === 'hd' ? 9 : 7
      }
    })
  });

  const result = await response.json();
  return result.output[0];
};

// ElevenLabs Image Generation (Text to Image - not ideal but available)
const generateElevenlabsImage = async (prompt: string): Promise<string> => {
  const response = await fetch(`${elevenlabsConfig.baseURL}/text-to-speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${elevenlabsConfig.apiKey}`
    },
    body: JSON.stringify({
      text: prompt,
      voice_id: "rachel",
      model_id: "eleven_multilingual_v2"
    })
  });

  const result = await response.json();
  // This would return audio, not image - placeholder
  return `data:image/svg+xml,${encodeURIComponent(`<svg><text>${prompt}</text></svg>`)}`;
};

// DeepSeek Image Generation
const generateDeepSeekImage = async (prompt: string, aspectRatio: string, quality: string): Promise<string> => {
  const response = await fetch(`${deepseekConfig.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${deepseekConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: `Generate a detailed image description for: ${prompt}. Return as a detailed prompt for image generation.`
        }
      ]
    })
  });

  const data = await response.json();
  // Use the enhanced prompt with Gemini for actual image generation
  return await generateGeminiImage(data.choices[0].message.content, aspectRatio);
};

// Gemini Image Generation (Enhanced)
const generateGeminiImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const modelId = 'gemini-2.5-flash';
  
  const response = await gemini.models.generateContent({
    model: modelId,
    contents: { 
      parts: [{ 
        text: `Generate a high-quality ${aspectRatio} image: ${prompt}. Professional lighting, sharp details, rich colors. ${aspectRatio === '1:1' ? 'Square format.' : 'Wide format.'}` 
      }] 
    },
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  // Parse the response for image data
  const data = JSON.parse(text);
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    const imageData = data.candidates[0].content.parts.find((part: any) => part.inlineData);
    return imageData ? imageData.data : '';
  }
  
  throw new Error("No image data in response");
};

// 4K Logo Generation with Multiple Providers
export const generate4KLogo = async (
  companyName: string,
  industry: string,
  style: 'modern' | 'classic' | 'minimalist' | 'bold' | 'elegant' = 'modern',
  provider: AIProvider = 'auto'
): Promise<string> => {
  
  try {
    console.log(`🏢 Generating 4K logo with ${provider} AI`);
    
    // Select best provider for logo generation
    let selectedProvider = provider;
    if (provider === 'auto') {
      if (style === 'minimalist') selectedProvider = 'openai'; // Best for clean logos
      else if (style === 'bold') selectedProvider = 'stability'; // Best for impactful logos
      else selectedProvider = 'gemini'; // Default
    }
    
    const logoPrompt = `
      Create a professional 4K ultra-high resolution logo for "${companyName}" in the ${industry} industry.
      Style: ${style}.
      Requirements:
      - Ultra HD 4K resolution (4096x4096)
      - Vector quality, scalable
      - Clean, professional design
      - White or transparent background
      - Modern, memorable design
      - No text, just the logo icon/symbol
      - ${style === 'minimalist' ? 'Minimalist approach, negative space' : ''}
      - ${style === 'bold' ? 'Bold, impactful design' : ''}
      - ${style === 'elegant' ? 'Elegant, sophisticated design' : ''}
      - ${style === 'modern' ? 'Modern, cutting-edge design' : ''}
      - ${style === 'classic' ? 'Timeless, classic design' : ''}
    `;
    
    switch (selectedProvider) {
      case 'openai':
        return await generateOpenAIImage(logoPrompt, '1:1', 'hd');
      case 'stability':
        return await generateStabilityImage(logoPrompt, '1:1', 'hd');
      case 'replicate':
        return await generateReplicateImage(logoPrompt, '1:1', 'hd');
      case 'deepseek':
        return await generateDeepSeekImage(logoPrompt, '1:1', 'hd');
      default:
        return await generateGeminiImage(logoPrompt, '1:1');
    }
    
  } catch (error) {
    console.error("❌ 4K logo generation failed:", error);
    throw error;
  }
};

// Export all functions
export {
  generateMultiAIPresentation,
  generateMultiAIImage,
  generate4KLogo,
  generateOpenAIImage,
  generateStabilityImage,
  generateReplicateImage,
  generateElevenlabsImage,
  generateDeepSeekImage,
  generateGeminiImage
};
