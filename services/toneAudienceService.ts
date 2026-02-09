// Tone & Audience Switching Service for NovagenAI
import { PresentationData, PresentationConfig } from '../types';

export interface ToneProfile {
  id: string;
  name: string;
  description: string;
  characteristics: {
    formality: 'very-casual' | 'casual' | 'neutral' | 'formal' | 'very-formal';
    complexity: 'simple' | 'moderate' | 'complex' | 'technical';
    emotion: 'neutral' | 'enthusiastic' | 'serious' | 'inspiring' | 'urgent';
    perspective: 'first-person' | 'second-person' | 'third-person';
  };
  vocabulary: {
    level: 'basic' | 'intermediate' | 'advanced' | 'expert';
    style: 'conversational' | 'professional' | 'academic' | 'creative';
  };
  sentenceStructure: {
    length: 'short' | 'medium' | 'long' | 'varied';
    type: 'simple' | 'compound' | 'complex' | 'mixed';
  };
}

export interface AudienceProfile {
  id: string;
  name: string;
  description: string;
  characteristics: {
    knowledgeLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    familiarity: 'unfamiliar' | 'somewhat-familiar' | 'familiar' | 'expert';
    interest: 'low' | 'moderate' | 'high' | 'very-high';
    ageGroup: 'youth' | 'young-adult' | 'adult' | 'senior';
    background: 'general' | 'technical' | 'business' | 'academic' | 'creative';
  };
  preferences: {
    detailLevel: 'minimal' | 'moderate' | 'detailed' | 'comprehensive';
    examples: 'none' | 'few' | 'many' | 'extensive';
    dataPoints: 'minimal' | 'moderate' | 'extensive' | 'research-backed';
    visualAids: 'none' | 'simple' | 'detailed' | 'interactive';
  };
}

export interface AdaptationStrategy {
  tone: ToneProfile;
  audience: AudienceProfile;
  modifications: {
    contentAdjustment: string;
    styleChanges: string[];
    vocabularyChanges: string[];
    structuralChanges: string[];
  };
}

export class ToneAudienceService {
  private toneProfiles: ToneProfile[];
  private audienceProfiles: AudienceProfile[];

  constructor() {
    this.toneProfiles = this.initializeToneProfiles();
    this.audienceProfiles = this.initializeAudienceProfiles();
  }

  // Get all available tone profiles
  getToneProfiles(): ToneProfile[] {
    return this.toneProfiles;
  }

  // Get all available audience profiles
  getAudienceProfiles(): AudienceProfile[] {
    return this.audienceProfiles;
  }

  // Get tone profile by ID
  getToneProfile(id: string): ToneProfile | undefined {
    return this.toneProfiles.find(profile => profile.id === id);
  }

  // Get audience profile by ID
  getAudienceProfile(id: string): AudienceProfile | undefined {
    return this.audienceProfiles.find(profile => profile.id === id);
  }

  // Adapt presentation for new tone and audience
  adaptPresentation(
    presentation: PresentationData,
    toneId: string,
    audienceId: string
  ): PresentationData {
    const tone = this.getToneProfile(toneId);
    const audience = this.getAudienceProfile(audienceId);

    if (!tone || !audience) {
      throw new Error('Invalid tone or audience profile');
    }

    const strategy = this.createAdaptationStrategy(tone, audience);

    return {
      ...presentation,
      slides: presentation.slides.map(slide => this.adaptSlide(slide, strategy))
    };
  }

  // Adapt individual slide
  private adaptSlide(slide: any, strategy: AdaptationStrategy): any {
    const adaptedSlide = { ...slide };

    // Adapt title
    adaptedSlide.title = this.adaptText(slide.title, strategy);

    // Adapt content
    adaptedSlide.content = slide.content.map((content: string) => 
      this.adaptText(content, strategy)
    );

    // Adapt speaker notes
    if (slide.speakerNotes) {
      adaptedSlide.speakerNotes = this.adaptText(slide.speakerNotes, strategy);
    }

    return adaptedSlide;
  }

  // Adapt text based on tone and audience
  private adaptText(text: string, strategy: AdaptationStrategy): string {
    let adaptedText = text;

    // Apply tone modifications
    adaptedText = this.applyToneModifications(adaptedText, strategy.tone);

    // Apply audience modifications
    adaptedText = this.applyAudienceModifications(adaptedText, strategy.audience);

    return adaptedText;
  }

  // Apply tone modifications
  private applyToneModifications(text: string, tone: ToneProfile): string {
    let modifiedText = text;

    // Adjust formality
    switch (tone.characteristics.formality) {
      case 'very-casual':
        modifiedText = this.makeCasual(modifiedText, 'very');
        break;
      case 'casual':
        modifiedText = this.makeCasual(modifiedText, 'moderate');
        break;
      case 'formal':
        modifiedText = this.makeFormal(modifiedText, 'moderate');
        break;
      case 'very-formal':
        modifiedText = this.makeFormal(modifiedText, 'very');
        break;
    }

    // Adjust complexity
    switch (tone.characteristics.complexity) {
      case 'simple':
        modifiedText = this.simplifyLanguage(modifiedText);
        break;
      case 'technical':
        modifiedText = this.addTechnicalTerms(modifiedText);
        break;
    }

    // Adjust emotion
    modifiedText = this.adjustEmotionalTone(modifiedText, tone.characteristics.emotion);

    return modifiedText;
  }

  // Apply audience modifications
  private applyAudienceModifications(text: string, audience: AudienceProfile): string {
    let modifiedText = text;

    // Adjust for knowledge level
    switch (audience.characteristics.knowledgeLevel) {
      case 'beginner':
        modifiedText = this.addExplanations(modifiedText);
        break;
      case 'expert':
        modifiedText = this.removeExplanations(modifiedText);
        break;
    }

    // Adjust detail level
    switch (audience.preferences.detailLevel) {
      case 'minimal':
        modifiedText = this.reduceDetail(modifiedText);
        break;
      case 'comprehensive':
        modifiedText = this.addDetail(modifiedText);
        break;
    }

    return modifiedText;
  }

  // Make text more casual
  private makeCasual(text: string, level: 'moderate' | 'very'): string {
    const casualReplacements = {
      'therefore': 'so',
      'furthermore': 'plus',
      'consequently': 'so',
      'utilize': 'use',
      'demonstrate': 'show',
      'facilitate': 'help',
      'implement': 'put in place',
      'optimize': 'make better'
    };

    let casualText = text;
    
    Object.entries(casualReplacements).forEach(([formal, casual]) => {
      casualText = casualText.replace(new RegExp(formal, 'gi'), casual);
    });

    if (level === 'very') {
      casualText = casualText.replace(/\./g, '. You know? ');
      casualText = casualText.replace(/\!/g, '! Pretty cool, right? ');
    }

    return casualText;
  }

  // Make text more formal
  private makeFormal(text: string, level: 'moderate' | 'very'): string {
    const formalReplacements = {
      'get': 'obtain',
      'do': 'perform',
      'show': 'demonstrate',
      'use': 'utilize',
      'help': 'facilitate',
      'make': 'create',
      'put in place': 'implement',
      'make better': 'optimize'
    };

    let formalText = text;
    
    Object.entries(formalReplacements).forEach(([casual, formal]) => {
      formalText = formalText.replace(new RegExp(casual, 'gi'), formal);
    });

    if (level === 'very') {
      formalText = formalText.replace(/\b(I think|I believe|In my opinion)\b/gi, 'It is evident that');
      formalText = formalText.replace(/\b(good|great|awesome)\b/gi, 'exemplary');
    }

    return formalText;
  }

  // Simplify language
  private simplifyLanguage(text: string): string {
    const simplifications = {
      'consequently': 'as a result',
      'furthermore': 'also',
      'nevertheless': 'however',
      'subsequently': 'then',
      'approximately': 'about',
      'numerous': 'many',
      'sufficient': 'enough',
      'utilize': 'use'
    };

    let simplifiedText = text;
    
    Object.entries(simplifications).forEach(([complex, simple]) => {
      simplifiedText = simplifiedText.replace(new RegExp(complex, 'gi'), simple);
    });

    return simplifiedText;
  }

  // Add technical terms
  private addTechnicalTerms(text: string): string {
    // In a real implementation, this would use a thesaurus or technical dictionary
    const technicalEnhancements = {
      'show': 'illustrate',
      'explain': 'elucidate',
      'analyze': 'examine in detail',
      'understand': 'comprehend',
      'look at': 'examine',
      'work on': 'engage with'
    };

    let technicalText = text;
    
    Object.entries(technicalEnhancements).forEach(([simple, technical]) => {
      technicalText = technicalText.replace(new RegExp(simple, 'gi'), technical);
    });

    return technicalText;
  }

  // Adjust emotional tone
  private adjustEmotionalTone(text: string, emotion: string): string {
    switch (emotion) {
      case 'enthusiastic':
        return text.replace(/\./g, '!') + ' This is exciting!';
      case 'serious':
        return text.replace(/\!/g, '.');
      case 'inspiring':
        return text + ' Let\'s make this happen!';
      case 'urgent':
        return text.replace(/\./g, '. Time is critical!');
      default:
        return text;
    }
  }

  // Add explanations for beginners
  private addExplanations(text: string): string {
    // In a real implementation, this would add contextual explanations
    return text + ' (This means...)';
  }

  // Remove explanations for experts
  private removeExplanations(text: string): string {
    return text.replace(/\s*\([^)]*\)\s*/g, '');
  }

  // Reduce detail
  private reduceDetail(text: string): string {
    return text.split('.').slice(0, 2).join('.') + '.';
  }

  // Add detail
  private addDetail(text: string): string {
    return text + ' This includes specific examples and detailed analysis.';
  }

  // Create adaptation strategy
  private createAdaptationStrategy(tone: ToneProfile, audience: AudienceProfile): AdaptationStrategy {
    return {
      tone,
      audience,
      modifications: {
        contentAdjustment: `Adapt content for ${tone.name} tone and ${audience.name} audience`,
        styleChanges: ['Adjust formality', 'Modify complexity', 'Set emotional tone'],
        vocabularyChanges: ['Update word choices', 'Adjust terminology'],
        structuralChanges: ['Reorganize content', 'Add/remove explanations']
      }
    };
  }

  // Initialize tone profiles
  private initializeToneProfiles(): ToneProfile[] {
    return [
      {
        id: 'professional',
        name: 'Professional',
        description: 'Formal, business-appropriate tone',
        characteristics: {
          formality: 'formal',
          complexity: 'moderate',
          emotion: 'neutral',
          perspective: 'third-person'
        },
        vocabulary: {
          level: 'intermediate',
          style: 'professional'
        },
        sentenceStructure: {
          length: 'medium',
          type: 'mixed'
        }
      },
      {
        id: 'casual',
        name: 'Casual',
        description: 'Relaxed, conversational tone',
        characteristics: {
          formality: 'casual',
          complexity: 'simple',
          emotion: 'neutral',
          perspective: 'second-person'
        },
        vocabulary: {
          level: 'basic',
          style: 'conversational'
        },
        sentenceStructure: {
          length: 'short',
          type: 'simple'
        }
      },
      {
        id: 'academic',
        name: 'Academic',
        description: 'Scholarly, research-oriented tone',
        characteristics: {
          formality: 'very-formal',
          complexity: 'technical',
          emotion: 'serious',
          perspective: 'third-person'
        },
        vocabulary: {
          level: 'expert',
          style: 'academic'
        },
        sentenceStructure: {
          length: 'long',
          type: 'complex'
        }
      },
      {
        id: 'inspiring',
        name: 'Inspiring',
        description: 'Motivational, uplifting tone',
        characteristics: {
          formality: 'neutral',
          complexity: 'moderate',
          emotion: 'inspiring',
          perspective: 'second-person'
        },
        vocabulary: {
          level: 'intermediate',
          style: 'creative'
        },
        sentenceStructure: {
          length: 'varied',
          type: 'mixed'
        }
      },
      {
        id: 'technical',
        name: 'Technical',
        description: 'Detailed, expert-level tone',
        characteristics: {
          formality: 'formal',
          complexity: 'technical',
          emotion: 'neutral',
          perspective: 'third-person'
        },
        vocabulary: {
          level: 'expert',
          style: 'professional'
        },
        sentenceStructure: {
          length: 'medium',
          type: 'complex'
        }
      }
    ];
  }

  // Initialize audience profiles
  private initializeAudienceProfiles(): AudienceProfile[] {
    return [
      {
        id: 'executives',
        name: 'Executives',
        description: 'Senior leadership, decision-makers',
        characteristics: {
          knowledgeLevel: 'advanced',
          familiarity: 'familiar',
          interest: 'high',
          ageGroup: 'adult',
          background: 'business'
        },
        preferences: {
          detailLevel: 'moderate',
          examples: 'few',
          dataPoints: 'extensive',
          visualAids: 'detailed'
        }
      },
      {
        id: 'technical-team',
        name: 'Technical Team',
        description: 'Engineers, developers, technical staff',
        characteristics: {
          knowledgeLevel: 'expert',
          familiarity: 'expert',
          interest: 'high',
          ageGroup: 'young-adult',
          background: 'technical'
        },
        preferences: {
          detailLevel: 'comprehensive',
          examples: 'many',
          dataPoints: 'research-backed',
          visualAids: 'detailed'
        }
      },
      {
        id: 'general-audience',
        name: 'General Audience',
        description: 'Mixed background, varied expertise',
        characteristics: {
          knowledgeLevel: 'beginner',
          familiarity: 'unfamiliar',
          interest: 'moderate',
          ageGroup: 'adult',
          background: 'general'
        },
        preferences: {
          detailLevel: 'minimal',
          examples: 'many',
          dataPoints: 'minimal',
          visualAids: 'simple'
        }
      },
      {
        id: 'students',
        name: 'Students',
        description: 'Educational context, learning-focused',
        characteristics: {
          knowledgeLevel: 'intermediate',
          familiarity: 'somewhat-familiar',
          interest: 'moderate',
          ageGroup: 'young-adult',
          background: 'academic'
        },
        preferences: {
          detailLevel: 'detailed',
          examples: 'extensive',
          dataPoints: 'moderate',
          visualAids: 'interactive'
        }
      },
      {
        id: 'investors',
        name: 'Investors',
        description: 'Financial stakeholders, ROI-focused',
        characteristics: {
          knowledgeLevel: 'advanced',
          familiarity: 'familiar',
          interest: 'very-high',
          ageGroup: 'adult',
          background: 'business'
        },
        preferences: {
          detailLevel: 'moderate',
          examples: 'few',
          dataPoints: 'extensive',
          visualAids: 'detailed'
        }
      }
    ];
  }
}

// Export function for easy usage
export const adaptPresentationToneAndAudience = (
  presentation: PresentationData,
  toneId: string,
  audienceId: string
): PresentationData => {
  const service = new ToneAudienceService();
  return service.adaptPresentation(presentation, toneId, audienceId);
};

export const getAvailableTones = (): ToneProfile[] => {
  const service = new ToneAudienceService();
  return service.getToneProfiles();
};

export const getAvailableAudiences = (): AudienceProfile[] => {
  const service = new ToneAudienceService();
  return service.getAudienceProfiles();
};
