const axios = require('axios');

async function testDeepAI() {
    const apiKey = '0a1e4f8d-ac80-48f2-b75f-8c73c2077f2b';
    const baseUrl = 'https://api.deepai.org/api';

    console.log('--- DeepAI Connectivity Test ---');

    try {
        console.log('Testing Text-to-Image...');
        const response = await axios.post(`${baseUrl}/text2img`,
            new URLSearchParams({ text: 'A successful test image' }).toString(),
            { headers: { 'api-key': apiKey } }
        );
        console.log('   Success! Output URL:', response.data.output_url);

        console.log('\nTesting Super Resolution connectivity...');
        const srResponse = await axios.post(`${baseUrl}/torch-srgan`,
            new URLSearchParams({ image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400' }).toString(),
            { headers: { 'api-key': apiKey } }
        );
        console.log('   Success! Upscaled URL exists:', !!srResponse.data.output_url);

        console.log('\n--- Connectivity Verified ---');
    } catch (error) {
        console.error('   Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

testDeepAI();
