import { ContentGenerationService } from '../services/ContentGenerationService';

async function testRefinement() {
    const service = new ContentGenerationService();
    const content = "The quick brown fox jumps over the lazy dog.";

    console.log('Testing Rephrase...');
    const rephrased = await service.refineContent('rephrase', content);
    console.log('Rephrased:', rephrased);

    console.log('\nTesting Tone Shift (Professional)...');
    const professional = await service.refineContent('toneShift', content, 'more executive');
    console.log('Professional:', professional);

    console.log('\nTesting Translation (Spanish)...');
    const spanish = await service.refineContent('translate', content, 'Spanish');
    console.log('Spanish:', spanish);
}

testRefinement().catch(console.error);
