import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

export interface ContentGenerationRequest {
  prompt: string;
  model: 'gpt-4' | 'claude' | 'gemini' | 'design-intelligence';
  context?: string;
  tone: 'professional' | 'casual' | 'creative' | 'technical';
  audience: 'executive' | 'technical' | 'general' | 'academic';
  format: 'presentation' | 'article' | 'report' | 'email';
  language: string;
  maxLength?: number;
}

export interface ContentGenerationResponse {
  content: string;
  model: string;
  tokensUsed: number;
  cost: number;
  latency: number;
  suggestions?: string[];
}

export class PromptLibrary {
  static getSystemPrompt(format: string, tone: string, audience: string, language: string): string {
    if (format === 'presentation') {
      return this.getPresentationArchitectPrompt(tone, audience, language);
    }

    const base = `You are NovagenAI, an elite AI content engineer specializing in high-end ${format} production. 
    Your mission is to generate world-class, premium ${format} content that is perfectly tailored for a ${audience} audience.
    
    TONE AND STYLE: Use a ${tone} tone. Ensure the output is elegant, authoritative, and compelling. 
    Avoid generic AI phrasing. Use sophisticated vocabulary and clear, impactful structure.
    
    LANGUAGE: Generate all content in ${language}.
    
    PERSONALIZATION: Adapt the style to be "minimalist yet powerful", focusing on high information density and aesthetic clarity.`;

    const formatSpecific = {
      article: `Use compelling hooks, clear transitions, and deep analytical insights. Structure with H2/H3 headers for readability.`,
      report: `Focus on data clarity, executive summaries, and actionable recommendations. Use professional business jargon where appropriate.`,
      email: `Be concise, direct, and persuasive. Use clear call-to-actions and professional sign-offs.`
    }[format] || '';

    return `${base}\n\n${formatSpecific}`;
  }

  private static getPresentationArchitectPrompt(tone: string, audience: string, language: string): string {
    return `You are the NovagenAI Presentation Architect, a world-class senior AI systems expert specializing in multimodal generation and high-end strategic design.
    
    CORE SYSTEM ARCHITECTURE:
    1. INTELLIGENT PARSING: Perform deep subject matter extraction and domain classification (Business/Academic/Technical/Creative).
    2. ADAPTIVE CONTENT GENERATION:
       - Business: Problem -> Market Analysis -> Solution -> Financials -> Ask
       - Academic: Abstract -> Methodology -> Data Analysis -> Findings -> Conclusion
       - Technical: Architecture -> Components -> API -> Deployment -> Troubleshooting
       - Creative: Concept -> Process -> Execution -> Results
    3. VISUAL INTELLIGENCE SYSTEM:
       - Context-aware image detection (Abstract/Metaphorical vs Photorealistic vs Schematic).
       - Style Matching: Align visuals with ${tone} tone and ${audience} expectations.
       - Automated Data Visualization: Identify numerical sequences and trigger bar/line/pie/org charts.
    4. SMART EDITING: Provide hierarchical headlines, body text (<50 words), and rich speaker notes.
    5. CROSS-DOMAIN INTELLIGENCE: Use precise industry terminology (Healthcare/Finance/Tech/Marketing).
    
    TONE: ${tone} (Elegant, authoritative, compelling).
    AUDIENCE: ${audience}.
    LANGUAGE: ${language}.
    
    OUTPUT SPECIFICATIONS (Strict JSON):
    - "title": "Main Presentation Title",
    - "slides": Array of objects containing "title", "body" (bullet points), "layout", "visual_trigger" (image prompt or chart data), and "speaker_notes".
    - "image_prompts": 3-5 high-fidelity DALL-E 3 style prompts matched to the narrative.
    - "data_visualizations": Array of chart configurations found in the text.
    - "domain": The detected industry domain.
    - "narrative_arc": Brief explanation of the flow.
    
    VALIDATION RULES:
    - 100% original content; zero templates.
    - Consistency: Maintain visual and tonal continuity.
    - Accuracy: Ensure data integrity in charts.`;
  }

  static engineerPrompt(prompt: string, format?: string): string {
    if (format === 'presentation') {
      return `ULTIMATE ARCHITECTURAL EXECUTION:
      1. Analyze core intent: ${prompt}
      2. Domain Classification: Determine field automatically based on keywords.
      3. Narrative Structure: Build a 8-15 slide arc with Beginning-Middle-End.
      4. Multi-layered response: content, visual cues, and strategic reasoning.
      5. cross-domain vocabulary injection.
      
      Generate a complete, world-class presentation structure in JSON.`;
    }

    return `USER REQUEST: ${prompt}
    
    REFINEMENT INSTRUCTIONS:
    1. Analyze the core intent of the user.
    2. Expand on the details if they are brief, but remain focused.
    3. If the user wants to generate something, provide a multi-layered response with reasoning, content, and next-step recommendations.
    4. Ensure the output feels like it was crafted by a top-tier human specialist.
    5. Use Markdown for elegant formatting.`;
  }

  static getRefinementPrompt(type: string, content: string, option?: string): string {
    const prompts = {
      rephrase: `Rephrase the following content to be more impactful and professional while maintaining the core meaning:\n\n${content}`,
      toneShift: `Change the tone of the following content to be ${option || 'more professional'}:\n\n${content}`,
      adjustLength: `Modify the following content to be ${option || 'shorter and more concise'}:\n\n${content}`,
      translate: `Translate the following content to ${option || 'Spanish'} while ensuring cultural and professional context is preserved:\n\n${content}`
    };
    return (prompts as any)[type] || prompts.rephrase;
  }
}

export class ContentGenerationService {
  private openai: OpenAI;
  private genAI: GoogleGenerativeAI;
  private prisma: PrismaClient;
  private redis: Redis;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    try {
      this.prisma = new PrismaClient();
    } catch (error) {
      console.warn('Prisma Client failed to initialize. Database logging will be disabled.');
      this.prisma = null as any;
    }

    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });
  }

  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const startTime = Date.now();
    let response: ContentGenerationResponse;

    try {
      // Check cache first
      const cacheKey = `content:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);

      if (cached) {
        return JSON.parse(cached);
      }

      // Generate content based on model
      switch (request.model) {
        case 'gpt-4':
          response = await this.generateWithGPT4(request);
          break;

        case 'claude':
          response = await this.generateWithClaude(request);
          break;

        case 'gemini':
          response = await this.generateWithGemini(request);
          break;

        case 'design-intelligence':
          response = await this.generateWithDesignIntelligence(request);
          break;

        default:
          throw new Error(`Unsupported model: ${request.model}`);
      }

      // Cache the result
      await this.redis.setex(cacheKey, 3600, JSON.stringify(response)); // 1 hour cache

      // Log generation
      await this.logGeneration({
        userId: 'system',
        model: request.model,
        prompt: request.prompt,
        response: { content: response.content, suggestions: response.suggestions },
        tokens: response.tokensUsed,
        cost: response.cost,
        latency: Date.now() - startTime,
        status: 'COMPLETED'
      });

      return response;
    } catch (error) {
      console.error('Content generation error:', error);

      await this.logGeneration({
        userId: 'system',
        model: request.model,
        prompt: request.prompt,
        response: { error: (error as Error).message },
        tokens: 0,
        cost: 0,
        latency: Date.now() - startTime,
        status: 'FAILED'
      });

      throw error;
    }
  }

  private async generateWithGPT4(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const systemPrompt = PromptLibrary.getSystemPrompt(request.format, request.tone, request.audience, request.language);
    const engineeredPrompt = PromptLibrary.engineerPrompt(request.prompt, request.format);

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: (request.context ? `CONTEXT: ${request.context}\n\n` : '') + engineeredPrompt
        }
      ],
      max_tokens: request.maxLength ? Math.ceil(request.maxLength * 1.5) : undefined,
      temperature: 0.7,
      response_format: request.format === 'presentation' ? { type: 'json_object' } : undefined,
    });

    const content = completion.choices[0]?.message?.content || '';

    return {
      content,
      model: 'gpt-4',
      tokensUsed: completion.usage?.total_tokens || 0,
      cost: this.calculateCost(completion.usage?.total_tokens || 0, 'gpt-4'),
      latency: 0,
      suggestions: this.generateSuggestions(content)
    };
  }

  private async generateWithClaude(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const systemPrompt = PromptLibrary.getSystemPrompt(request.format, request.tone, request.audience, request.language);
    const engineeredPrompt = PromptLibrary.engineerPrompt(request.prompt, request.format);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: request.maxLength ? Math.ceil(request.maxLength * 1.5) : undefined,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: (request.context ? `CONTEXT: ${request.context}\n\n` : '') + engineeredPrompt + (request.format === 'presentation' ? "\n\nIMPORTANT: Return a valid JSON object only." : "")
          }
        ]
      })
    });

    const claudeData = await response.json();
    const content = claudeData.content[0]?.text || '';

    return {
      content,
      model: 'claude-3-sonnet',
      tokensUsed: this.estimateTokens(content),
      cost: this.calculateCost(this.estimateTokens(content), 'claude'),
      latency: 0,
      suggestions: this.generateSuggestions(content)
    };
  }

  private async generateWithGemini(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: request.format === 'presentation' ? { responseMimeType: 'application/json' } : undefined
    });

    const systemPrompt = PromptLibrary.getSystemPrompt(request.format, request.tone, request.audience, request.language);
    const engineeredPrompt = PromptLibrary.engineerPrompt(request.prompt, request.format);

    const result = await model.generateContent(systemPrompt + "\n\n" + (request.context ? `CONTEXT: ${request.context}\n\n` : '') + engineeredPrompt);
    const content = result.response.text() || '';

    return {
      content,
      model: 'gemini-1.5-pro',
      tokensUsed: this.estimateTokens(content),
      cost: this.calculateCost(this.estimateTokens(content), 'gemini'),
      latency: 0,
      suggestions: this.generateSuggestions(content)
    };
  }

  private async generateWithDesignIntelligence(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    // Advanced design intelligence using multiple AI models
    const [gpt4Response, claudeResponse, geminiResponse] = await Promise.all([
      this.generateWithGPT4({ ...request, model: 'gpt-4' }),
      this.generateWithClaude({ ...request, model: 'claude' }),
      this.generateWithGemini({ ...request, model: 'gemini' })
    ]);

    // Combine and enhance content using design principles
    const combinedContent = this.enhanceContentWithDesign(
      gpt4Response.content,
      claudeResponse.content,
      geminiResponse.content,
      request.tone,
      request.audience
    );

    const totalTokens = gpt4Response.tokensUsed + claudeResponse.tokensUsed + geminiResponse.tokensUsed;
    const totalCost = gpt4Response.cost + claudeResponse.cost + geminiResponse.cost;

    return {
      content: combinedContent,
      model: 'design-intelligence',
      tokensUsed: totalTokens,
      cost: totalCost,
      latency: 0,
      suggestions: this.generateSuggestions(combinedContent)
    };
  }

  private enhanceContentWithDesign(
    gpt4Content: string,
    claudeContent: string,
    geminiContent: string,
    tone: string,
    audience: string
  ): string {
    // Design intelligence enhancement logic
    const structure = this.analyzeContentStructure(gpt4Content, claudeContent, geminiContent);
    const improvements = this.generateDesignImprovements(structure, tone, audience);

    return `${gpt4Content}\n\n${claudeContent}\n\n${geminiContent}\n\n--- Design Intelligence Enhancements ---\n${improvements.join('\n')}`;
  }

  private analyzeContentStructure(...contents: string[]): any {
    // Analyze content structure, readability, and engagement
    return {
      wordCount: contents.reduce((sum, content) => sum + content.split(' ').length, 0),
      sentenceCount: contents.reduce((sum, content) => sum + content.split('. ').length, 0),
      readabilityScore: this.calculateReadability(contents.join(' ')),
      hasCallToAction: contents.some(content => content.toLowerCase().includes('call to') || content.toLowerCase().includes('contact')),
      hasDataPoints: contents.some(content => /\d+%/.test(content)),
      hasEmotionalAppeal: this.analyzeEmotionalContent(contents.join(' '))
    };
  }

  private generateDesignImprovements(structure: any, tone: string, audience: string): string[] {
    const improvements: string[] = [];

    if (structure.wordCount > 500) {
      improvements.push('Consider breaking down into smaller sections for better readability');
    }

    if (!structure.hasCallToAction && audience === 'business') {
      improvements.push('Add a clear call-to-action to drive conversions');
    }

    if (structure.readabilityScore < 60) {
      improvements.push('Simplify complex sentences and use shorter paragraphs');
    }

    if (!structure.hasDataPoints && audience === 'technical') {
      improvements.push('Include specific data points and metrics to support claims');
    }

    if (tone === 'professional' && structure.hasEmotionalAppeal) {
      improvements.push('Consider using more neutral language for professional audience');
    }

    return improvements;
  }

  private generateSuggestions(content: string): string[] {
    const suggestions: string[] = [];

    // Content improvement suggestions
    if (content.length < 100) {
      suggestions.push('Consider expanding the content to provide more value');
    }

    if (!content.includes('•') && !content.includes('-')) {
      suggestions.push('Use bullet points or numbered lists for better readability');
    }

    if (content.length > 1000 && !content.includes('\n')) {
      suggestions.push('Consider breaking up long paragraphs for better readability');
    }

    return suggestions;
  }

  private estimateTokens(content: string): number {
    // Rough token estimation (1 token ≈ 4 characters)
    return Math.ceil(content.length / 4);
  }

  private calculateCost(tokens: number, model: string): number {
    const costPerToken = {
      'gpt-4': 0.00003, // $0.03 per 1K tokens
      'claude': 0.000015, // $0.015 per 1K tokens
      'gemini': 0.000001, // $0.001 per 1K tokens
      'design-intelligence': 0.00005 // Weighted average for multiple models
    };

    return (tokens / 1000) * (costPerToken[model] || 0.00001);
  }

  private calculateReadability(content: string): number {
    // Flesch Reading Ease Score approximation
    const avgSentenceLength = content.split('.').reduce((sum, sentence) => sum + sentence.length, 0) / content.split('.').length;
    const avgWordLength = content.split(' ').reduce((sum, word) => sum + word.length, 0) / content.split(' ').length;

    // Simplified readability formula
    const score = Math.max(0, 100 - (avgSentenceLength * 1.5 + avgWordLength * 12.5) / 2);
    return Math.min(100, score);
  }

  private analyzeEmotionalContent(content: string): boolean {
    const emotionalWords = ['amazing', 'love', 'excellent', 'fantastic', 'wonderful', 'incredible', 'outstanding'];
    return emotionalWords.some(word => content.toLowerCase().includes(word));
  }

  private async logGeneration(data: any): Promise<void> {
    if (!this.prisma) return; // Skip logging if Prisma is not initialized
    try {
      await this.prisma.aIGeneration.create({
        data: {
          userId: data.userId,
          prompt: data.prompt,
          model: data.model,
          response: data.response || {},
          tokens: data.tokens || 0,
          cost: data.cost,
          latency: data.latency,
          status: data.status,
        }
      });
    } catch (error) {
      console.error('Failed to log generation:', error);
    }
  }

  async refineContent(type: 'rephrase' | 'toneShift' | 'adjustLength' | 'translate', content: string, option?: string): Promise<string> {
    const systemPrompt = "You are an elite AI copywriter specializing in presentation refinement.";
    const userPrompt = PromptLibrary.getRefinementPrompt(type, content, option);

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(systemPrompt + "\n\n" + userPrompt);
    return result.response.text() || content;
  }
}
