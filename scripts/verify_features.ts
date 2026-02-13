import { fileConverterService } from '../services/FileConverterService';
import { watermarkService } from '../services/WatermarkService';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const TEST_DIR = path.join(__dirname, '../test_assets');

async function setup() {
    if (!fs.existsSync(TEST_DIR)) {
        fs.mkdirSync(TEST_DIR, { recursive: true });
    }

    // Create a sample image
    const imagePath = path.join(TEST_DIR, 'sample.png');
    await sharp({
        create: {
            width: 800,
            height: 600,
            channels: 4,
            background: { r: 255, g: 0, b: 0, alpha: 1 }
        }
    })
        .png()
        .toFile(imagePath);

    console.log('Created sample image:', imagePath);
    return imagePath;
}

async function verifyConverter(inputPath: string) {
    console.log('\n--- Verifying File Converter ---');
    try {
        // 1. Single Conversion
        const jpgPath = await fileConverterService.convert(inputPath, 'jpg', { quality: 50 });
        console.log('✅ Single conversion successful:', jpgPath);

        // 2. Batch Conversion
        const inputs = [
            { path: inputPath, format: 'webp' as const },
            { path: inputPath, format: 'gif' as const }
        ];
        const results = await fileConverterService.convertBatch(inputs, 'png');
        console.log('✅ Batch conversion processed:', results.length, 'files');
        results.forEach(r => {
            if (r.error) console.error('❌ Batch error:', r.error);
            else console.log('   Converted:', r.path);
        });
    } catch (error) {
        console.error('❌ Converter verification failed:', error);
    }
}

async function verifyWatermark(inputPath: string) {
    console.log('\n--- Verifying Watermark Service ---');
    try {
        // 1. Text Watermark
        const textWmPath = await watermarkService.applyWatermark(inputPath, {
            type: 'text',
            text: 'CONFIDENTIAL',
            position: 'center',
            color: '#FFFFFF',
            opacity: 0.8
        });
        console.log('✅ Text watermark successful:', textWmPath);

        // 2. Image Watermark
        const wmImgPath = path.join(TEST_DIR, 'logo.png');
        await sharp({
            create: { width: 100, height: 100, channels: 4, background: { r: 0, g: 255, b: 0, alpha: 1 } }
        }).png().toFile(wmImgPath);

        const imgWmPath = await watermarkService.applyWatermark(inputPath, {
            type: 'image',
            imagePath: wmImgPath,
            position: 'bottom-right',
            opacity: 0.5
        });
        console.log('✅ Image watermark successful:', imgWmPath);

        // 3. Batch Watermark
        const results = await watermarkService.applyWatermarkBatch([
            { path: inputPath, options: { type: 'text', text: 'Batch 1' } },
            { path: inputPath, options: { type: 'text', text: 'Batch 2', position: 'top-left' } }
        ], { type: 'text', text: 'Default' });

        console.log('✅ Batch watermark processed:', results.length, 'files');
        results.forEach(r => {
            if (r.error) console.error('❌ Batch error:', r.error);
            else console.log('   Watermarked:', r.path);
        });

    } catch (error) {
        console.error('❌ Watermark verification failed:', error);
    }
}

async function main() {
    try {
        const imagePath = await setup();
        await verifyConverter(imagePath);
        await verifyWatermark(imagePath);
        console.log('\nVerification Complete!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

main();
