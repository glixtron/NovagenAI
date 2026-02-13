import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import Replicate from 'replicate'
import { createClient } from '@supabase/supabase-js'

// Initialize all AI clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY })

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface ContentGenerationRequest {
  prompt: string
  tone?: 'professional' | 'casual' | 'creative' | 'technical'
  length?: 'short' | 'medium' | 'long'
  industry?: 'tech' | 'finance' | 'healthcare' | 'education' | 'general'
  userTier: 'free' | 'pro' | 'enterprise'
  priority: 'cost' | 'quality' | 'speed'
}

export interface ImageGenerationRequest {
  prompt: string
  style?: 'professional' | 'artistic' | 'minimalist' | 'bold'
  size?: '256x256' | '512x512' | '1024x1024'
  userTier: 'free' | 'pro' | 'enterprise'
  priority: 'cost' | 'quality' | 'speed'
}

export interface VoiceGenerationRequest {
  text: string
  voice?: 'professional' | 'friendly' | 'energetic' | 'calm'
  language?: 'en' | 'es' | 'fr' | 'de'
  userTier: 'free' | 'pro' | 'enterprise'
}

export class AIOrchestrator {
  private static instance: AIOrchestrator

  static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator()
    }
    return AIOrchestrator.instance
  }

  // Content Generation with intelligent routing
  async generateContent(request: ContentGenerationRequest): Promise<string> {
    const { userTier, priority, prompt, tone = 'professional', length = 'medium' } = request

    // Log usage for analytics
    await this.logUsage('content_generation', userTier, priority)

    // Route based on user tier and priority
    const routing = this.getContentRouting(userTier, priority)

    for (const provider of routing) {
      try {
        const result = await this.generateWithProvider(provider, {
          prompt: this.enhancePrompt(prompt, tone, length, request.industry),
          maxTokens: this.getMaxTokens(length),
          temperature: this.getTemperature(tone),
        })

        // Cache successful result
        await this.cacheResult('content', request, result)
        return result
      } catch (error) {
        console.error(`${provider} failed:`, error)
        // Continue to next provider in the routing chain
        continue
      }
    }

    throw new Error('All content generation providers failed')
  }

  // Image Generation with intelligent routing
  async generateImage(request: ImageGenerationRequest): Promise<string> {
    const { userTier, priority, prompt, style = 'professional', size = '512x512' } = request

    await this.logUsage('image_generation', userTier, priority)

    const routing = this.getImageRouting(userTier, priority)

    for (const provider of routing) {
      try {
        const imageUrl = await this.generateImageWithProvider(provider, {
          prompt: this.enhanceImagePrompt(prompt, style),
          size,
          style,
        })

        await this.cacheResult('image', request, imageUrl)
        return imageUrl
      } catch (error) {
        console.error(`${provider} failed:`, error)
        continue
      }
    }

    throw new Error('All image generation providers failed')
  }

  // Voice Generation with fallback
  async generateVoice(request: VoiceGenerationRequest): Promise<string> {
    const { userTier, text, voice = 'professional', language = 'en' } = request

    await this.logUsage('voice_generation', userTier, 'quality')

    // Try ElevenLabs first for pro/enterprise users
    if (userTier !== 'free' && process.env.ELEVENLABS_API_KEY) {
      try {
        return await this.generateWithElevenLabs(text, voice, language)
      } catch (error) {
        console.error('ElevenLabs failed:', error)
      }
    }

    // Fallback to browser TTS or return text-to-speech URL
    return this.generateBrowserTTS(text, voice, language)
  }

  // Private routing methods
  private getContentRouting(userTier: string, priority: string): string[] {
    const routes = {
      free: {
        cost: ['deepseek', 'groq', 'gemini'],
        quality: ['gemini', 'groq', 'deepseek'],
        speed: ['groq', 'deepseek', 'gemini'],
      },
      pro: {
        cost: ['groq', 'gemini', 'openai'],
        quality: ['claude', 'openai', 'gemini'],
        speed: ['groq', 'openai', 'claude'],
      },
      enterprise: {
        cost: ['groq', 'gemini', 'claude'],
        quality: ['claude', 'openai', 'gemini'],
        speed: ['groq', 'claude', 'openai'],
      },
    }

    return routes[userTier]?.[priority] || routes.pro.quality
  }

  private getImageRouting(userTier: string, priority: string): string[] {
    const routes = {
      free: {
        cost: ['unsplash', 'pexels'],
        quality: ['unsplash', 'pexels'],
        speed: ['unsplash', 'pexels'],
      },
      pro: {
        cost: ['stability', 'dalle', 'unsplash'],
        quality: ['dalle', 'stability', 'replicate'],
        speed: ['stability', 'dalle', 'unsplash'],
      },
      enterprise: {
        cost: ['stability', 'dalle', 'replicate'],
        quality: ['dalle', 'replicate', 'stability'],
        speed: ['stability', 'dalle', 'replicate'],
      },
    }

    return routes[userTier]?.[priority] || routes.pro.quality
  }

  // Provider-specific generation methods
  private async generateWithProvider(provider: string, options: any): Promise<string> {
    switch (provider) {
      case 'openai':
        return await this.generateWithOpenAI(options)
      case 'claude':
        return await this.generateWithClaude(options)
      case 'gemini':
        return await this.generateWithGemini(options)
      case 'groq':
        return await this.generateWithGroq(options)
      case 'deepseek':
        return await this.generateWithDeepSeek(options)
      default:
        throw new Error(`Unknown provider: ${provider}`)
    }
  }

  private async generateWithOpenAI(options: any): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: options.prompt }],
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    })
    return response.choices[0]?.message?.content || ''
  }

  private async generateWithClaude(options: any): Promise<string> {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: options.maxTokens,
      messages: [{ role: 'user', content: options.prompt }],
    })
    return response.content[0]?.type === 'text' ? response.content[0].text : ''
  }

  private async generateWithGemini(options: any): Promise<string> {
    const model = gemini.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(options.prompt)
    return result.response.text() || ''
  }

  private async generateWithGroq(options: any): Promise<string> {
    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: options.prompt }],
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    })
    return response.choices[0]?.message?.content || ''
  }

  private async generateWithDeepSeek(options: any): Promise<string> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: options.prompt }],
        max_tokens: options.maxTokens,
        temperature: options.temperature,
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private async generateImageWithProvider(provider: string, options: any): Promise<string> {
    switch (provider) {
      case 'dalle':
        return await this.generateWithDALLE(options)
      case 'stability':
        return await this.generateWithStability(options)
      case 'replicate':
        return await this.generateWithReplicate(options)
      case 'unsplash':
        return await this.getFromUnsplash(options.prompt)
      case 'pexels':
        return await this.getFromPexels(options.prompt)
      default:
        throw new Error(`Unknown image provider: ${provider}`)
    }
  }

  private async generateWithDALLE(options: any): Promise<string> {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: options.prompt,
      size: options.size,
      quality: 'standard',
    })
    return response.data?.[0]?.url || ''
  }

  private async generateWithStability(options: any): Promise<string> {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{ text: options.prompt }],
        height: parseInt(options.size.split('x')[1]),
        width: parseInt(options.size.split('x')[0]),
      }),
    })
    const data = await response.json()
    return data.artifacts[0]?.base64 ? `data:image/png;base64,${data.artifacts[0].base64}` : ''
  }

  private async generateWithReplicate(options: any): Promise<string> {
    const output = await replicate.run(
      'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
      {
        input: {
          prompt: options.prompt,
          width: parseInt(options.size.split('x')[0]),
          height: parseInt(options.size.split('x')[1]),
        },
      }
    )
    return Array.isArray(output) ? (output[0] as unknown as string) : (output as unknown as string)
  }

  private async getFromUnsplash(prompt: string): Promise<string> {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`, {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })
    const data = await response.json()
    return data.results[0]?.urls?.regular || ''
  }

  private async getFromPexels(prompt: string): Promise<string> {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(prompt)}&per_page=1`, {
      headers: {
        'Authorization': process.env.PEXELS_API_KEY || '',
      },
    })
    const data = await response.json()
    return data.photos[0]?.src?.large || ''
  }

  // Helper methods
  private enhancePrompt(prompt: string, tone: string, length: string, industry?: string): string {
    let enhanced = prompt

    if (industry) {
      enhanced += ` Create content for the ${industry} industry.`
    }

    enhanced += ` Use a ${tone} tone.`

    const lengthGuide = {
      short: 'Keep it concise and to the point.',
      medium: 'Provide a balanced amount of detail.',
      long: 'Be comprehensive and thorough.',
    }

    enhanced += ` ${lengthGuide[length]}`

    return enhanced
  }

  private enhanceImagePrompt(prompt: string, style: string): string {
    const styleGuides = {
      professional: 'professional, clean, business presentation style',
      artistic: 'artistic, creative, visually striking',
      minimalist: 'minimalist, simple, clean design',
      bold: 'bold, vibrant, eye-catching',
    }

    return `${prompt}, ${styleGuides[style]}, high quality, presentation ready`
  }

  private getMaxTokens(length: string): number {
    const tokens = {
      short: 500,
      medium: 1500,
      long: 3000,
    }
    return tokens[length] || tokens.medium
  }

  private getTemperature(tone: string): number {
    const temperatures = {
      professional: 0.3,
      casual: 0.7,
      creative: 0.9,
      technical: 0.2,
    }
    return temperatures[tone] || 0.5
  }

  private async generateWithElevenLabs(text: string, voice: string, language: string): Promise<string> {
    const voiceMap = {
      professional: 'Adam',
      friendly: 'Bella',
      energetic: 'Domi',
      calm: 'Elli',
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceMap[voice]}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    })

    const audioBuffer = await response.arrayBuffer()
    return `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString('base64')}`
  }

  private generateBrowserTTS(text: string, voice: string, language: string): string {
    // Return a placeholder URL for browser TTS
    return `/api/tts?text=${encodeURIComponent(text)}&voice=${voice}&lang=${language}`
  }

  // Analytics and caching
  private async logUsage(type: string, tier: string, priority: string): Promise<void> {
    try {
      await supabase.from('usage_logs').insert({
        type,
        user_tier: tier,
        priority,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to log usage:', error)
    }
  }

  private async cacheResult(type: string, request: any, result: string): Promise<void> {
    try {
      await supabase.from('cache').insert({
        type,
        request_hash: JSON.stringify(request),
        result,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      })
    } catch (error) {
      console.error('Failed to cache result:', error)
    }
  }
}

export default AIOrchestrator
