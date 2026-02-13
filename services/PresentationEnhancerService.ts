import { ContentGenerationService } from './ContentGenerationService';

// Define flexible types to handle both simple and complex slide structures
// This avoids circular dependencies with PPTGeneratorService
export interface EnhancerOptions {
    notes?: boolean;
    images?: boolean;
    formatting?: boolean;
}

export class PresentationEnhancerService {
    private contentService: ContentGenerationService;

    constructor(contentService?: ContentGenerationService) {
        this.contentService = contentService || new ContentGenerationService();
    }

    /**
     * Main entry point to enhance a presentation
     * Accepts any presentation structure that has a 'slides' array or object map
     */
    async enhancePresentation(
        presentation: any,
        options: EnhancerOptions
    ): Promise<any> {
        const enhancedPresentation = JSON.parse(JSON.stringify(presentation)); // Deep clone

        // Handle case where slides might be an object map (PPTGeneratorService Structure uses object for slides sometimes)
        if (!enhancedPresentation.slides) {
            console.warn('Presentation object missing slides property. Skipping enhancement.');
            return enhancedPresentation;
        }

        if (Array.isArray(enhancedPresentation.slides)) {
            // It is an array
            const enhancedSlides = await Promise.all(enhancedPresentation.slides.map(async (slide: any) => {
                return await this.enhanceSlide(slide, enhancedPresentation.title || 'Presentation', options);
            }));
            enhancedPresentation.slides = enhancedSlides;
        } else if (typeof enhancedPresentation.slides === 'object') {
            // It is an object map (dictionary)
            const keys = Object.keys(enhancedPresentation.slides);
            for (const key of keys) {
                if (key === 'assets') continue; // Skip assets or metadata keys if present in slides object
                // Ensure it looks like a slide (has id or content)
                if (enhancedPresentation.slides[key] && (enhancedPresentation.slides[key].id || enhancedPresentation.slides[key].content)) {
                    enhancedPresentation.slides[key] = await this.enhanceSlide(
                        enhancedPresentation.slides[key],
                        enhancedPresentation.title || 'Presentation',
                        options
                    );
                }
            }
        } else {
            console.warn('Presentation slides is not an array or object map. Skipping enhancement.');
        }

        return enhancedPresentation;
    }

    private async enhanceSlide(slide: any, topic: string, options: EnhancerOptions): Promise<any> {
        let enhancedSlide = { ...slide };

        if (options.formatting) {
            enhancedSlide = this.smartFormat(enhancedSlide);
        }

        // Handle speaker notes
        const existingNotes = this.getNotes(enhancedSlide);
        if (options.notes && !existingNotes) {
            const notes = await this.generateSpeakerNotes(enhancedSlide, topic);
            this.setNotes(enhancedSlide, notes);
        }

        // Handle image suggestions
        if (options.images && !enhancedSlide.imagePrompt) {
            const prompt = await this.suggestImagePrompt(enhancedSlide);
            if (prompt) {
                // Attach to metadata if complex, or top level if simple
                if (enhancedSlide.metadata) {
                    enhancedSlide.metadata.imagePrompt = prompt;
                } else {
                    enhancedSlide.imagePrompt = prompt;
                }
            }
        }

        return enhancedSlide;
    }

    // --- Helpers for Structure Abstraction ---

    private extractTextFromSlide(slide: any): string {
        if (!slide) return '';

        // 1. Simple Structure: slide.content is string or string[]
        if (typeof slide.content === 'string') {
            return slide.content;
        }
        if (Array.isArray(slide.content)) {
            return slide.content.join(' ');
        }

        // 2. Complex Structure: slide.content.elements is SlideElement[]
        if (slide.content && Array.isArray(slide.content.elements)) {
            return slide.content.elements
                .filter((el: any) => el.type === 'text')
                .map((el: any) => {
                    // content can be string or object with text property
                    if (typeof el.content === 'string') return el.content;
                    if (typeof el.content === 'object' && el.content !== null) {
                        // Adjust based on actual SlideElement structure. 
                        // PPTGeneratorService says 'content: any'.
                        // Usually it's rich text or plain text. 
                        // Check for 'text' property or just 'value'.
                        if (el.content.text) return el.content.text;
                        if (el.content.value) return el.content.value;
                        if (el.content.html) return el.content.html; // fallback
                    }
                    return '';
                })
                .join(' ');
        }

        return '';
    }

    private getNotes(slide: any): string | undefined {
        // 1. Complex: metadata.notes
        if (slide.metadata && slide.metadata.notes) return slide.metadata.notes;
        // 2. Simple: speakerNotes
        if (slide.speakerNotes) return slide.speakerNotes;
        return undefined;
    }

    private setNotes(slide: any, notes: string): void {
        // 1. Complex: metadata.notes
        if (slide.metadata) {
            slide.metadata.notes = notes;
        } else {
            // 2. Simple: speakerNotes
            slide.speakerNotes = notes;
        }
    }

    /**
     * Smart Formatting Logic
     */
    private smartFormat(slide: any): any {
        const textContent = this.extractTextFromSlide(slide);
        const wordCount = textContent.split(' ').length;
        const titleLength = slide.title ? slide.title.length : 0;

        let layoutId = 'default';

        // Heuristics
        if (wordCount > 150) {
            layoutId = 'two-column-text';
        } else if (wordCount < 20 && titleLength < 50) {
            layoutId = 'centered-headline';
        } else if (textContent.includes('\u2022') || (Array.isArray(slide.content) && slide.content.length > 5)) {
            // \u2022 is bullet point
            layoutId = 'grid-points';
        }

        // Apply Layout
        if (slide.content && slide.content.layout) {
            // Complex structure: slide.content.layout
            // If it's an object, update template
            if (typeof slide.content.layout === 'object') {
                slide.content.layout.template = layoutId;
            }
        } else if (slide.layout) {
            // Simple structure
            if (typeof slide.layout === 'string') {
                slide.layout = layoutId;
            } else if (typeof slide.layout === 'object') {
                slide.layout.templateId = layoutId;
            }
        } else {
            // Create if missing (simple)
            slide.layout = { templateId: layoutId };
        }

        return slide;
    }

    /**
     * Generate Speaker Notes using LLM
     */
    private async generateSpeakerNotes(slide: any, topic: string): Promise<string> {
        try {
            const slideText = `Title: ${slide.title}\nContent: ${this.extractTextFromSlide(slide)}`;
            const prompt = `Generate concise and engaging speaker notes for the following slide in a presentation about "${topic}". The notes should clarify the points and add value, not just read the slide.\n\n${slideText}`;

            const response = await this.contentService.generateContent({
                prompt: prompt,
                model: 'gpt-4',
                tone: 'professional',
                audience: 'general',
                format: 'presentation',
                language: 'english',
                maxLength: 200
            });

            return response.content;
        } catch (error) {
            console.warn(`Failed to generate speaker notes for slide ${slide.id}`, error);
            return '';
        }
    }

    /**
     * Generate Image Prompt using LLM
     */
    private async suggestImagePrompt(slide: any): Promise<string> {
        try {
            const slideText = `Title: ${slide.title}\nContent: ${this.extractTextFromSlide(slide)}`;
            const prompt = `Create a detailed text-to-image generation prompt (for DALL-E 3 or Midjourney) that would create a perfect visual accompaniment for this slide. The image should be professional, relevant, and visually striking. Return ONLY the prompt text.\n\n${slideText}`;

            const response = await this.contentService.generateContent({
                prompt: prompt,
                model: 'gpt-4', // Use high quality for creative prompts
                tone: 'creative',
                audience: 'general',
                format: 'presentation',
                language: 'english',
                maxLength: 100
            });

            return response.content.replace(/^"|"$/g, '');
        } catch (error) {
            console.warn(`Failed to generate image prompt for slide ${slide.id}`, error);
            return '';
        }
    }
}

export const presentationEnhancerService = new PresentationEnhancerService();
