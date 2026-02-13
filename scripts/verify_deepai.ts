const { deepAIService } = require('../services/DeepAIService');

async function verifyDeepAI() {
    console.log('--- DeepAI Integration Verification ---');

    const testImageUrl = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400';

    try {
        console.log('1. Testing Text-to-Image...');
        const genUrl = await deepAIService.text2img('A futuristic corporate office, 8k, professional');
        console.log('   Success! Generated URL:', genUrl);

        console.log('\n2. Testing Super Resolution...');
        const srUrl = await deepAIService.superResolution(testImageUrl);
        console.log('   Success! Upscaled URL:', srUrl);

        console.log('\n3. Testing Background Remover...');
        const bgUrl = await deepAIService.removeBackground(testImageUrl);
        console.log('   Success! No-BG URL:', bgUrl);

        console.log('\n4. Testing Colorizer...');
        const colUrl = await deepAIService.colorizeImage(testImageUrl);
        console.log('   Success! Colorized URL:', colUrl);

        console.log('\n--- Verification Complete ---');
    } catch (error) {
        console.error('\n!!! Verification Failed:', (error as Error).message);
        process.exit(1);
    }
}

verifyDeepAI();
