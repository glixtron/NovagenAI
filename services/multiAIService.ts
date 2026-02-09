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
  baseURL: "https://api.elevenlabs.com/v1"
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
    console.log(`🚀 Generating presentation with ${preferredProvider} AI provider`);
    
    // Select best provider based on task complexity
    let selectedProvider = preferredProvider;
    if (preferredProvider === 'auto') {
      if (config.length > 15) selectedProvider = 'anthropic'; // Complex presentations
      else if (config.audience.includes('technical')) selectedProvider = 'openai'; // Technical content
      else if (config.imageStyle === 'Photorealistic') selectedProvider = 'stability'; // High-quality images
      else if (config.imageStyle === 'Cartoon') selectedProvider = 'openai'; // Creative content
      else if (config.imageStyle === '3D Render') selectedProvider = 'replicate'; // 3D renders
      else selectedProvider = 'gemini'; // Default
    }
    
    console.log(`🎯 Selected provider: ${selectedProvider}`);
    
    switch (selectedProvider) {
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
      case 'gemini':
        return await generateGeminiPresentation(config);
      default:
        return await generateGeminiPresentation(config);
    }
    
  } catch (error) {
    console.error("❌ Multi-AI presentation generation failed:", error);
    throw error;
  }
};

// Individual Provider Functions
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
          content: `You are an expert presentation designer working for NovagenAI. Create comprehensive, detailed presentations with publication-ready content. Include charts, maps, and infographics. Use NOVAGENAI branding. Format as JSON.`
        },
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}.`
        }
      ]
    })
  });
  
  const data = await response.json();
  return formatPresentationData(data, config);
};

const generateAnthropicPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${anthropicConfig.baseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicConfig.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}.`
        }
      ]
    })
  });
  
  const data = await response.json();
  return formatPresentationData(data, config);
};

const generateStabilityPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${stabilityConfig.baseURL}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${stabilityConfig.apiKey}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: `Professional presentation slide about ${config.topic}, ${config.imageStyle} style, high quality, detailed content`
        }
      ],
      model: "stable-diffusion-xl",
      width: 1024,
      height: 1024
    })
  });
  
  const result = await response.json();
  
  // Convert image to presentation data
  const slides = [{
    id: 'slide-1',
    title: config.topic,
    content: [`Generated with Stability AI (${config.imageStyle} style)`],
    speakerNotes: `Professional presentation generated using Stability AI`,
    imagePrompt: `Professional ${config.imageStyle} style image of ${config.topic}`,
    imageUrl: result.artifacts[0]?.base64 || ''
  }];
  
  return {
    title: config.topic,
    subtitle: `Generated with Stability AI`,
    theme: config.theme,
    aspectRatio: config.aspectRatio,
    imageStyle: config.imageStyle,
    enableAnimations: config.enableAnimations,
    branding: {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    },
    slides
  };
};

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
        prompt: `Professional presentation about ${config.topic}, ${config.imageStyle} style`,
        width: 1024,
        height: 1024,
        num_outputs: 1
      }
    })
  });
  
  const result = await response.json();
  
  const slides = [{
    id: 'slide-1',
    title: config.topic,
    content: [`Generated with Replicate (${config.imageStyle} style)`],
    speakerNotes: `Professional presentation generated using Replicate`,
    imagePrompt: `Professional ${config.imageStyle} style image of ${config.topic}`,
    imageUrl: result.output?.[0] || ''
  }];
  
  return {
    title: config.topic,
    subtitle: `Generated with Replicate`,
    theme: config.theme,
    aspectRatio: config.aspectRatio,
    imageStyle: config.imageStyle,
    enableAnimations: config.enableAnimations,
    branding: {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    },
    slides
  };
};

const generateElevenlabsPresentation = async (config: PresentationConfig): Promise<PresentationData> => {
  const response = await fetch(`${elevenlabsConfig.baseURL}/text-to-speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': elevenlabsConfig.apiKey
    },
    body: JSON.stringify({
      content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}. Include charts, maps, and infographics. Use NOVAGENAI branding. Format as JSON.`
    })
  });
  
  const data = await response.json();
  
  const slides = [{
    id: 'slide-1',
    title: config.topic,
    content: [`Generated with ElevenLabs (${config.imageStyle} style)`],
    speakerNotes: `Professional presentation generated using ElevenLabs`,
    imagePrompt: `Professional ${config.imageStyle} style image of ${config.topic}`,
    imageUrl: '' // ElevenLabs is text-to-speech, not image generation
  }];
  
  return {
    title: config.topic,
    subtitle: `Generated with ElevenLabs`,
    theme: config.theme,
    aspectRatio: config.aspectRatio,
    imageStyle: config.imageStyle,
    enableAnimations: config.enableAnimations,
    branding: {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    },
    slides
  };
};

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
          content: "You are an expert presentation designer working for NovagenAI. Create comprehensive, detailed presentations with publication-ready content. Include charts, maps, and infographics. Use NOVAGENAI branding. Format as JSON."
        },
        {
          role: "user",
          content: `Create a ${config.length}-slide presentation about: "${config.topic}". Target Audience: ${config.audience}. Tone: ${config.tone}. Design Style: ${config.theme}. Image Style: ${config.imageStyle}.`
        }
      ]
    })
  });
  
  const data = await response.json();
  return formatPresentationData(data, config);
};

// Enhanced Image Generation with Multi-AI Support
export const generateMultiAIImage = async (
  prompt: string,
  aspectRatio: string = "1:1",
  provider: AIProvider = 'auto'
): Promise<string> => {
  
  try {
    console.log(`🎨 Generating image with ${provider} AI provider`);
    
    // Select best provider for image generation
    let selectedProvider = provider;
    if (provider === 'auto') {
      if (prompt.includes('photorealistic')) selectedProvider = 'stability'; // Best for realistic images
      else if (prompt.includes('cartoon')) selectedProvider = 'openai'; // Best for creative content
      else if (prompt.includes('3d')) selectedProvider = 'replicate'; // Best for 3D renders
      else selectedProvider = 'gemini'; // Default
    }
    
    console.log(`🎯 Selected provider: ${selectedProvider}`);
    
    switch (selectedProvider) {
      case 'openai':
        return await generateOpenAIImage(prompt, aspectRatio);
      case 'stability':
        return await generateStabilityImage(prompt, aspectRatio);
      case 'replicate':
        return await generateReplicateImage(prompt, aspectRatio);
      case 'elevenlabs':
        return await generateElevenlabsImage(prompt, aspectRatio);
      case 'deepseek':
        return await generateDeepSeekImage(prompt, aspectRatio);
      case 'gemini':
        return await generateGeminiImage(prompt, aspectRatio);
      default:
        return await generateGeminiImage(prompt, aspectRatio);
    }
    
  } catch (error) {
    console.error("❌ Multi-AI image generation failed:", error);
    throw error;
  }
};

// Individual Provider Image Generation Functions
const generateOpenAIImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await fetch(`${openaiConfig.baseURL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      size: aspectRatio === '16:9' ? '1792x1024' : '1024x1024',
      quality: 'hd',
      n: 1
    })
  });
  
  const result = await response.json();
  return result.data[0]?.url || '';
};

const generateStabilityImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await fetch(`${stabilityConfig.baseURL}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${stabilityConfig.apiKey}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompt
        }
      ],
      model: "stable-diffusion-xl",
      width: aspectRatio === '16:9' ? 1792 : 1024,
      height: aspectRatio === '16:9' ? 1008 : 1024,
      output_format: 'png'
    })
  });
  
  const result = await response.json();
  return result.artifacts[0]?.base64 || '';
};

const generateReplicateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
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
        width: aspectRatio === '16:9' ? 1792 : 1024,
        height: aspectRatio === '16:9' ? 1008 : 1024,
        num_outputs: 1
      }
    })
  });
  
  const result = await response.json();
  return result.output?.[0] || '';
};

const generateElevenlabsImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await fetch(`${elevenlabsConfig.baseURL}/text-to-speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': elevenlabsConfig.apiKey
    },
    body: JSON.stringify({
      text: prompt
    })
  });
  
  const data = await response.json();
  return data.audio_url || '';
};

const generateDeepSeekImage = async (prompt: string, aspectRatio: string): Promise<string> => {
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
          content: "You are an expert image generator. Create high-quality, detailed images based on the given prompt."
        },
        {
          role: "user",
          content: `Generate a high-quality image: ${prompt}. ${aspectRatio} aspect ratio. Professional lighting, sharp details, ${aspectRatio === '1:1' ? 'square format' : 'wide format'}.`
        }
      ]
    })
  });
  
  const data = await response.json();
  return data.choices[0]?.message?.content || '';
};

const generateGeminiImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: `Generate a high-quality image: ${prompt}. ${aspectRatio} aspect ratio. Professional lighting, sharp details, ${aspectRatio === '1:1' ? 'square format' : 'wide format'}.` }] },
    config: {
      responseMimeType: "application/json"
    }
  });
  
  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }
  
  // Try to extract image data
  const imageMatch = text.match(/data:image\/[^;]+;base64,([^"]+)/);
  if (imageMatch) {
    return imageMatch[1];
  }
  
  throw new Error("Gemini image generation failed");
};

// 4K Logo Generation with Multi-AI Support
export const generate4KLogo = async (
  companyName: string,
  industry: string,
  style: 'modern' | 'classic' | 'minimalist' | 'bold' | 'elegant' = 'modern',
  provider: AIProvider = 'auto'
): Promise<string> => {
  
  try {
    console.log(`🏢 Generating 4K logo with ${provider} AI provider`);
    
    // Select best provider for logo generation
    let selectedProvider = provider;
    if (provider === 'auto') {
      if (style === 'minimalist') selectedProvider = 'openai'; // Clean designs
      else if (style === 'bold') selectedProvider = 'stability'; // Impactful logos
      else if (style === 'elegant') selectedProvider = 'anthropic'; // Sophisticated logos
      else selectedProvider = 'gemini'; // Default
    }
    
    console.log(`🎯 Selected provider: ${selectedProvider}`);
    
    switch (selectedProvider) {
      case 'openai':
        return await generateOpenAI4KLogo(companyName, industry, style);
      case 'stability':
        return await generateStability4KLogo(companyName, industry, style);
      case 'anthropic':
        return await generateAnthropic4KLogo(companyName, industry, style);
      case 'gemini':
        return await generateGemini4KLogo(companyName, industry, style);
      default:
        return await generateGemini4KLogo(companyName, industry, style);
    }
    
  } catch (error) {
    console.error("❌ 4K logo generation failed:", error);
    throw error;
  }
};

// Individual Provider 4K Logo Generation Functions
const generateOpenAI4KLogo = async (companyName: string, industry: string, style: string): Promise<string> => {
  const response = await fetch(`${openaiConfig.baseURL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiConfig.apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `Create a professional 4K ultra-high resolution logo for "${companyName}" in the ${industry} industry. Style: ${style}. Minimalist design, clean lines, white background, vector quality. Professional, modern, suitable for business branding. Ultra HD 4096x4096 resolution.`,
      size: "1792x1792",
      quality: "hd",
      n: 1
    })
  });
  
  const result = await response.json();
  return result.data[0]?.url || '';
};

const generateStability4KLogo = async (companyName: string, industry: string, style: string): Promise<string> => {
  const response = await fetch(`${stabilityConfig.baseURL}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${stabilityConfig.apiKey}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: `Create a professional 4K ultra-high resolution logo for "${companyName}" in the ${industry} industry. Style: ${style}. Bold, impactful design, high contrast, professional. Ultra HD 4096x4096 resolution.`
        }
      ],
      model: "stable-diffusion-xl",
      width: 2048,
      height: 2048,
      output_format: 'png'
    })
  });
  
  const result = await response.json();
  return result.artifacts[0]?.base64 || '';
};

const generateAnthropic4KLogo = async (companyName: string, industry: string, style: string): Promise<string> => {
  const response = await fetch(`${anthropicConfig.baseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicConfig.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Create a professional 4K ultra-high resolution logo for "${companyName}" in the ${industry} industry. Style: ${style}. Elegant, sophisticated design, premium quality. Ultra HD 4096x4096 resolution.`
        }
      ]
    })
  });
  
  const data = await response.json();
  return data.content[0]?.text || '';
};

const generateGemini4KLogo = async (companyName: string, industry: string, style: string): Promise<string> => {
  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: `Generate a professional 4K ultra-high resolution logo for "${companyName}" in the ${industry} industry. Style: ${style}. Modern, clean design, professional appearance. Ultra HD 4096x4096 resolution.` }] },
    config: {
      responseMimeType: "application/json"
    }
  });
  
  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }
  
  // Try to extract image data
  const imageMatch = text.match(/data:image\/[^;]+;base64,([^"]+)/);
  if (imageMatch) {
    return imageMatch[1];
  }
  
  throw new Error("Gemini 4K logo generation failed");
};

// Helper function to format presentation data
const formatPresentationData = (data: any, config: PresentationConfig): PresentationData => {
  return {
    title: data.title || config.topic,
    subtitle: data.subtitle || `Generated with ${selectedProvider} AI`,
    theme: config.theme,
    aspectRatio: config.aspectRatio,
    imageStyle: config.imageStyle,
    enableAnimations: config.enableAnimations,
    branding: {
      company: "NOVAGENAI",
      logo: "N",
      tagline: "AI-Powered Presentations"
    },
    slides: (data.slides || []).map((slide: any, index: number) => ({
      id: slide.id || `slide-${index + 1}`,
      title: slide.title || `Slide ${index + 1}`,
      content: slide.content || ['Content'],
      speakerNotes: slide.speakerNotes || `Speaker notes for slide ${index + 1}`,
      imagePrompt: slide.imagePrompt || `Professional ${config.imageStyle} style image of ${slide.title}`,
      transition: slide.transition || "fade",
      imageUrl: slide.imageUrl || ''
    }))
  };
};
