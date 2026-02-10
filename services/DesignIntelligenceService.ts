import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

export interface TextAnalysisRequest {
  text: string;
  analysisType: 'topic-modeling' | 'sentiment' | 'keywords' | 'summarization' | 'all';
  language?: string;
  options?: {
    maxTopics?: number;
    sentimentGranularity?: 'positive' | 'negative' | 'neutral' | 'detailed';
    keywordCount?: number;
    summaryLength?: 'short' | 'medium' | 'long';
    includeConfidence?: boolean;
  };
}

export interface TextAnalysisResponse {
  topicModeling?: {
    topics: Array<{
      topic: string;
      confidence: number;
      keywords: string[];
      relevance: number;
    }>;
    dominantTopic: string;
  };
  sentiment?: {
    overall: 'positive' | 'negative' | 'neutral';
    confidence: number;
    emotions?: {
      joy: number;
      anger: number;
      fear: number;
      sadness: number;
      surprise: number;
      disgust: number;
    };
    aspects?: Array<{
      aspect: string;
      sentiment: string;
      confidence: number;
    }>;
  };
  keywords?: Array<{
    word: string;
    relevance: number;
    frequency: number;
    category: string;
  }>;
  summarization?: {
    summary: string;
    keyPoints: string[];
    length: number;
    compressionRatio: number;
  };
  metadata: {
    processingTime: number;
    tokensAnalyzed: number;
    model: string;
    timestamp: string;
  };
}

export interface ContentGenerationRequest {
  topic: string;
  contentType: 'outline' | 'slide-content' | 'tone-adaptation' | 'multilingual';
  targetAudience: 'executive' | 'technical' | 'general' | 'academic' | 'marketing';
  tone: 'professional' | 'casual' | 'creative' | 'technical' | 'persuasive';
  language: string;
  context?: string;
  constraints?: {
    maxSlides?: number;
    wordCount?: number;
    complexityLevel?: 'basic' | 'intermediate' | 'advanced';
    includeVisuals?: boolean;
    includeData?: boolean;
  };
  customInstructions?: string;
}

export interface ContentGenerationResponse {
  content: any;
  structure?: {
    hierarchy: Array<{
      level: number;
      title: string;
      content: string;
      children?: any[];
    }>;
    flow: 'linear' | 'branched' | 'nested';
  };
  adaptations?: {
    toneAdjusted: boolean;
    audienceOptimized: boolean;
    languageTranslated: boolean;
    culturalContext: string[];
  };
  suggestions?: string[];
  quality: {
    coherence: number;
    relevance: number;
    completeness: number;
    engagement: number;
  };
  metadata: {
    processingTime: number;
    tokensGenerated: number;
    model: string;
    cost: number;
    timestamp: string;
  };
}

export class DesignIntelligenceService {
  private openai: OpenAI;
  private genAI: GoogleGenerativeAI;
  private prisma: PrismaClient;
  private redis: Redis;
  private huggingFaceEndpoint: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.huggingFaceEndpoint = process.env.HUGGINGFACE_ENDPOINT || 'https://api-inference.huggingface.co/models';
  }

  // TEXT ANALYSIS METHODS
  async analyzeText(request: TextAnalysisRequest): Promise<TextAnalysisResponse> {
    const startTime = Date.now();
    const response: TextAnalysisResponse = {
      metadata: {
        processingTime: 0,
        tokensAnalyzed: this.estimateTokens(request.text),
        model: 'multi-model',
        timestamp: new Date().toISOString()
      }
    };

    try {
      // Check cache first
      const cacheKey = `text-analysis:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      // Perform requested analyses
      if (request.analysisType === 'all' || request.analysisType === 'topic-modeling') {
        response.topicModeling = await this.performTopicModeling(request.text, request.options);
      }

      if (request.analysisType === 'all' || request.analysisType === 'sentiment') {
        response.sentiment = await this.performSentimentAnalysis(request.text, request.options);
      }

      if (request.analysisType === 'all' || request.analysisType === 'keywords') {
        response.keywords = await this.extractKeywords(request.text, request.options);
      }

      if (request.analysisType === 'all' || request.analysisType === 'summarization') {
        response.summarization = await this.generateSummary(request.text, request.options);
      }

      response.metadata.processingTime = Date.now() - startTime;

      // Cache the result
      await this.redis.setex(cacheKey, 3600, JSON.stringify(response)); // 1 hour cache
      
      return response;
    } catch (error) {
      console.error('Text analysis error:', error);
      throw error;
    }
  }

  private async performTopicModeling(text: string, options?: any): Promise<any> {
    const maxTopics = options?.maxTopics || 5;
    
    const prompt = `
      Analyze the following text and extract the main topics. For each topic, provide:
      1. Topic name (2-3 words)
      2. Confidence score (0-1)
      3. Key keywords (3-5 words)
      4. Relevance score (0-1)
      
      Text: "${text}"
      
      Return as JSON with topics array and dominantTopic field.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in topic modeling and text analysis. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    // Limit topics to requested amount
    if (result.topics && result.topics.length > maxTopics) {
      result.topics = result.topics
        .sort((a: any, b: any) => b.confidence - a.confidence)
        .slice(0, maxTopics);
    }

    return result;
  }

  private async performSentimentAnalysis(text: string, options?: any): Promise<any> {
    const granularity = options?.sentimentGranularity || 'detailed';
    
    if (granularity === 'detailed') {
      // Use Hugging Face for detailed emotion analysis
      try {
        const response = await fetch(`${this.huggingFaceEndpoint}/cardiffnlp/twitter-roberta-base-sentiment-latest`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: text,
          }),
        });

        const result = await response.json();
        
        // Map Hugging Face results to our format
        const emotions = result[0]?.map((item: any) => ({
          label: item.label.toLowerCase(),
          score: item.score
        }));

        return {
          overall: this.getOverallSentiment(emotions),
          confidence: Math.max(...emotions.map((e: any) => e.score)),
          emotions: {
            joy: emotions.find((e: any) => e.label.includes('positive'))?.score || 0,
            anger: emotions.find((e: any) => e.label.includes('negative'))?.score || 0,
            fear: 0,
            sadness: 0,
            surprise: 0,
            disgust: 0
          }
        };
      } catch (error) {
        console.error('Hugging Face sentiment analysis failed, falling back to OpenAI:', error);
      }
    }

    // Fallback to OpenAI
    const prompt = `
      Analyze the sentiment of the following text. Provide:
      1. Overall sentiment (positive/negative/neutral)
      2. Confidence score (0-1)
      3. Emotional breakdown if applicable
      
      Text: "${text}"
      
      Return as JSON.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in sentiment analysis. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async extractKeywords(text: string, options?: any): Promise<any> {
    const keywordCount = options?.keywordCount || 10;
    
    const prompt = `
      Extract the most important keywords from the following text. For each keyword, provide:
      1. The keyword
      2. Relevance score (0-1)
      3. Frequency count
      4. Category (noun/verb/adjective/technical/business)
      
      Text: "${text}"
      
      Return as JSON with keywords array.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in keyword extraction and text analysis. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    // Limit keywords to requested amount
    if (result.keywords && result.keywords.length > keywordCount) {
      result.keywords = result.keywords
        .sort((a: any, b: any) => b.relevance - a.relevance)
        .slice(0, keywordCount);
    }

    return result;
  }

  private async generateSummary(text: string, options?: any): Promise<any> {
    const length = options?.summaryLength || 'medium';
    const lengthMap = {
      short: '1-2 sentences',
      medium: '3-4 sentences',
      long: '5-6 sentences'
    };

    const prompt = `
      Summarize the following text in ${lengthMap[length]}. Also extract 3-5 key points.
      
      Text: "${text}"
      
      Return as JSON with summary, keyPoints array, length, and compressionRatio.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in text summarization. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    result.compressionRatio = result.summary.length / text.length;
    
    return result;
  }

  // CONTENT GENERATION METHODS
  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const startTime = Date.now();
    const response: ContentGenerationResponse = {
      content: null,
      quality: {
        coherence: 0,
        relevance: 0,
        completeness: 0,
        engagement: 0
      },
      metadata: {
        processingTime: 0,
        tokensGenerated: 0,
        model: 'multi-model',
        cost: 0,
        timestamp: new Date().toISOString()
      }
    };

    try {
      // Check cache first
      const cacheKey = `content-generation:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      // Generate content based on type
      switch (request.contentType) {
        case 'outline':
          response.content = await this.generateOutline(request);
          break;
          
        case 'slide-content':
          response.content = await this.generateSlideContent(request);
          break;
          
        case 'tone-adaptation':
          response.content = await this.adaptTone(request);
          break;
          
        case 'multilingual':
          response.content = await this.generateMultilingual(request);
          break;
          
        default:
          throw new Error(`Unsupported content type: ${request.contentType}`);
      }

      // Generate structure and adaptations
      response.structure = await this.generateStructure(response.content, request);
      response.adaptations = await this.generateAdaptations(request);
      response.suggestions = await this.generateSuggestions(response.content, request);
      
      // Calculate quality metrics
      response.quality = await this.calculateQuality(response.content, request);
      
      response.metadata.processingTime = Date.now() - startTime;
      response.metadata.tokensGenerated = this.estimateTokens(JSON.stringify(response.content));
      response.metadata.cost = this.calculateCost(response.metadata.tokensGenerated);

      // Cache the result
      await this.redis.setex(cacheKey, 3600, JSON.stringify(response)); // 1 hour cache
      
      return response;
    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    }
  }

  private async generateOutline(request: ContentGenerationRequest): Promise<any> {
    const maxSlides = request.constraints?.maxSlides || 10;
    const complexity = request.constraints?.complexityLevel || 'intermediate';
    
    const prompt = `
      Create a hierarchical outline for a presentation on "${request.topic}".
      
      Requirements:
      - Target audience: ${request.targetAudience}
      - Tone: ${request.tone}
      - Language: ${request.language}
      - Maximum slides: ${maxSlides}
      - Complexity level: ${complexity}
      - Include visuals: ${request.constraints?.includeVisuals || false}
      - Include data: ${request.constraints?.includeData || false}
      
      ${request.context ? `Context: ${request.context}` : ''}
      ${request.customInstructions ? `Custom instructions: ${request.customInstructions}` : ''}
      
      Return as JSON with:
      {
        "title": "Presentation Title",
        "slides": [
          {
            "slideNumber": 1,
            "title": "Slide Title",
            "type": "title/intro/content/conclusion",
            "keyPoints": ["point1", "point2"],
            "visualSuggestions": ["chart", "image"],
            "estimatedDuration": "2-3 minutes"
          }
        ],
        "flow": "logical progression description",
        "totalEstimatedDuration": "20-25 minutes"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert presentation designer and content strategist. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async generateSlideContent(request: ContentGenerationRequest): Promise<any> {
    const wordCount = request.constraints?.wordCount || 150;
    
    const prompt = `
      Generate detailed content for slides on "${request.topic}".
      
      Requirements:
      - Target audience: ${request.targetAudience}
      - Tone: ${request.tone}
      - Language: ${request.language}
      - Words per slide: ~${wordCount}
      - Complexity level: ${request.constraints?.complexityLevel || 'intermediate'}
      
      ${request.context ? `Context: ${request.context}` : ''}
      ${request.customInstructions ? `Custom instructions: ${request.customInstructions}` : ''}
      
      Return as JSON with:
      {
        "slides": [
          {
            "slideNumber": 1,
            "title": "Slide Title",
            "content": "Detailed slide content with bullet points and explanations",
            "speakerNotes": "Notes for the presenter",
            "visualElements": [
              {
                "type": "chart/image/diagram",
                "description": "Description of visual element",
                "position": "top/bottom/left/right"
              }
            ],
            "interactions": ["poll", "quiz", "discussion"],
            "duration": "2-3 minutes"
          }
        ]
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer for presentations. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.6,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async adaptTone(request: ContentGenerationRequest): Promise<any> {
    const prompt = `
      Adapt the following content to match the specified tone and audience:
      
      Original content: "${request.context || request.topic}"
      
      Adapt to:
      - Tone: ${request.tone}
      - Target audience: ${request.targetAudience}
      - Language: ${request.language}
      
      ${request.customInstructions ? `Custom instructions: ${request.customInstructions}` : ''}
      
      Return as JSON with:
      {
        "originalTone": "detected original tone",
        "adaptedContent": "tone-adapted content",
        "toneChanges": ["list of specific changes made"],
        "audienceAdjustments": ["list of audience-specific adjustments"],
        "culturalConsiderations": ["cultural context considerations"],
        "readabilityScore": 85,
        "engagementLevel": "high/medium/low"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in communication and tone adaptation. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async generateMultilingual(request: ContentGenerationRequest): Promise<any> {
    // First detect source language if not English
    const sourceLanguage = await this.detectLanguage(request.topic);
    
    const prompt = `
      Generate content in ${request.language} based on the following:
      
      Topic: "${request.topic}"
      Source language: ${sourceLanguage}
      Target audience: ${request.targetAudience}
      Tone: ${request.tone}
      
      ${request.context ? `Additional context: ${request.context}` : ''}
      ${request.customInstructions ? `Custom instructions: ${request.customInstructions}` : ''}
      
      Return as JSON with:
      {
        "sourceLanguage": "${sourceLanguage}",
        "targetLanguage": "${request.language}",
        "translatedContent": "content in target language",
        "culturalAdaptations": ["cultural context adjustments"],
        "localizationNotes": ["localization considerations"],
        "idiomReplacements": ["replaced idioms and their translations"],
        "readabilityScore": 85,
        "translationQuality": "high/medium/low"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in multilingual content generation and localization. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  // HELPER METHODS
  private async generateStructure(content: any, request: ContentGenerationRequest): Promise<any> {
    const prompt = `
      Analyze the following content and generate a hierarchical structure:
      
      Content: ${JSON.stringify(content)}
      
      Return as JSON with:
      {
        "hierarchy": [
          {
            "level": 1,
            "title": "Main title",
            "content": "Content summary",
            "children": [
              {
                "level": 2,
                "title": "Subtitle",
                "content": "Content",
                "children": []
              }
            ]
          }
        ],
        "flow": "linear/branched/nested"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in content structure analysis. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async generateAdaptations(request: ContentGenerationRequest): Promise<any> {
    return {
      toneAdjusted: request.contentType === 'tone-adaptation',
      audienceOptimized: true,
      languageTranslated: request.contentType === 'multilingual',
      culturalContext: await this.getCulturalContext(request.language, request.targetAudience)
    };
  }

  private async generateSuggestions(content: any, request: ContentGenerationRequest): Promise<string[]> {
    const prompt = `
      Analyze the following content and provide 5 improvement suggestions:
      
      Content: ${JSON.stringify(content)}
      Request: ${JSON.stringify(request)}
      
      Return as JSON array of strings.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content critic. Return only valid JSON array.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '[]');
  }

  private async calculateQuality(content: any, request: ContentGenerationRequest): Promise<any> {
    const prompt = `
      Rate the quality of the following content on a scale of 0-100:
      
      Content: ${JSON.stringify(content)}
      Requirements: ${JSON.stringify(request)}
      
      Return as JSON with:
      {
        "coherence": 85,
        "relevance": 90,
        "completeness": 80,
        "engagement": 75
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content quality assessor. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  private async detectLanguage(text: string): Promise<string> {
    const prompt = `
      Detect the language of the following text. Return only the language name (e.g., "English", "Spanish", "French"):
      
      "${text}"
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a language detection expert. Return only the language name.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
    });

    return completion.choices[0]?.message?.content?.trim() || 'English';
  }

  private async getCulturalContext(language: string, audience: string): Promise<string[]> {
    const prompt = `
      Provide cultural context considerations for ${language} language content targeting ${audience} audience.
      Return as JSON array of strings with 3-5 considerations.
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in cross-cultural communication. Return only valid JSON array.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '[]');
  }

  private getOverallSentiment(emotions: any[]): string {
    const positive = emotions.find((e: any) => e.label.includes('positive'))?.score || 0;
    const negative = emotions.find((e: any) => e.label.includes('negative'))?.score || 0;
    const neutral = emotions.find((e: any) => e.label.includes('neutral'))?.score || 0;

    if (positive > negative && positive > neutral) return 'positive';
    if (negative > positive && negative > neutral) return 'negative';
    return 'neutral';
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  private calculateCost(tokens: number): number {
    return (tokens / 1000) * 0.03; // $0.03 per 1K tokens for GPT-4
  }

  // Claude API Integration
  async analyzeWithClaude(text: string, task: string): Promise<any> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `You are an expert in ${task}. Return only valid JSON.`
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    });

    const claudeData = await response.json();
    return JSON.parse(claudeData.content[0]?.text || '{}');
  }

  // Gemini API Integration
  async analyzeWithGemini(text: string, task: string): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const systemPrompt = `You are an expert in ${task}. Return only valid JSON.`;
    const result = await model.generateContent(systemPrompt + text);
    
    return JSON.parse(result.response.text() || '{}');
  }

  // Hugging Face Integration
  async analyzeWithHuggingFace(text: string, model: string): Promise<any> {
    const response = await fetch(`${this.huggingFaceEndpoint}/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
      }),
    });

    return await response.json();
  }
}
