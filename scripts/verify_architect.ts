import { PPTGeneratorService } from './services/PPTGeneratorService';
import { ContentGenerationService } from './services/ContentGenerationService';

async function testArchitect() {
    const generator = new PPTGeneratorService();
    const contentService = new ContentGenerationService();

    console.log('Testing Presentation Architect Mode...');

    const topic = "The Future of Quantum Computing in FinTech";

    // 1. Generate Architecture via ContentService (Architect Mode)
    const response = await contentService.generateContent({
        prompt: topic,
        format: 'presentation',
        tone: 'technical',
        audience: 'executive',
        language: 'english',
        model: 'gemini-1.5-pro'
    });

    console.log('Architect Response:', response.content);

    // 2. Parse and generate assets
    // This will be implemented in PPTGeneratorService
    console.log('Verification Script Ready.');
}

testArchitect().catch(console.error);
