import { PresentationEnhancerService } from '../services/PresentationEnhancerService';

const mockContentService = {
    generateContent: async (options: any) => {
        console.log('  -> Mock generateContent called with prompt start:', options.prompt.substring(0, 30) + '...');
        if (options.prompt.includes('speaker notes')) {
            return { content: 'Mock Speaker Notes: This slide covers important topics regarding ' + options.prompt.substring(options.prompt.length - 20) };
        }
        if (options.prompt.includes('image generation')) {
            return { content: 'A futuristic cityscape with glowing neon lights, digital art style.' };
        }
        return { content: 'Mock Content' };
    }
};

const service = new PresentationEnhancerService(mockContentService as any);

const mockPresentation = {
    title: 'Test Presentation',
    slides: [
        {
            id: 'slide1',
            title: 'Intro',
            content: ['Welcome to the presentation.', 'We will discuss AI today.'], // Simple structure
            metadata: {}
        },
        {
            id: 'slide2',
            title: 'Complex Slide',
            content: { // Complex structure
                elements: [
                    { type: 'text', content: { text: 'Detailed analysis of algorithms.' } },
                    { type: 'image', url: 'http://example.com/img.png' }
                ]
            }
        },
        {
            id: 'slide3',
            title: 'Crowded Slide',
            content: Array(200).fill('word').join(' ') // Trigger smart layout
        }
    ]
};

async function verify() {
    console.log('--- Verifying Presentation Enhancer (Mocked) ---');
    try {
        const enhanced = await service.enhancePresentation(mockPresentation, {
            notes: true,
            images: true,
            formatting: true
        });

        console.log('✅ Enhancement successful');

        const s1 = enhanced.slides[0];
        console.log('Slide 1 Layout:', JSON.stringify(s1.layout));
        console.log('Slide 1 Notes:', s1.speakerNotes || s1.metadata?.notes);
        console.log('Slide 1 Image Prompt:', s1.imagePrompt || s1.metadata?.imagePrompt);

        const s2 = enhanced.slides[1];
        console.log('Slide 2 Layout:', JSON.stringify(s2.layout));
        console.log('Slide 2 Notes:', s2.speakerNotes || s2.metadata?.notes);

        const s3 = enhanced.slides[2];
        console.log('Slide 3 Layout:', JSON.stringify(s3.layout)); // Should be 'two-column-text'

    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

verify();
