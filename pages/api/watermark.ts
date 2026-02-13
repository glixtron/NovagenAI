import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { watermarkService, WatermarkOptions } from '../../services/WatermarkService';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = formidable({
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024, // 50MB
        multiples: true,
    });

    const tempFiles: string[] = [];

    try {
        const [fields, files] = await form.parse(req);

        const getSingle = (val: string[] | string | undefined) => Array.isArray(val) ? val[0] : val;
        const getFile = (val: formidable.File[] | formidable.File | undefined) => Array.isArray(val) ? val[0] : val;

        // Normalize input files
        const uploadedFiles = Array.isArray(files.file) ? files.file : (files.file ? [files.file] : []);
        if (uploadedFiles.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Track temp files for cleanup
        uploadedFiles.forEach(f => tempFiles.push(f.filepath));

        // Watermark Options
        const watermarkType = getSingle(fields.type) || 'text';

        // Validate watermark type
        if (!['text', 'image'].includes(watermarkType)) {
            return res.status(400).json({ error: `Invalid watermark type: ${watermarkType}. Allowed: text, image` });
        }

        const watermarkText = getSingle(fields.text);
        const watermarkImageFile = getFile(files.watermarkImage);

        const options: WatermarkOptions = {
            type: watermarkType as 'text' | 'image',
            opacity: fields.opacity ? Number(getSingle(fields.opacity)) : 0.5,
            position: (getSingle(fields.position) as any) || 'center',
            rotation: fields.rotation ? Number(getSingle(fields.rotation)) : 0,
            scale: fields.scale ? Number(getSingle(fields.scale)) : 0.2,
            color: getSingle(fields.color) || '#000000',
            fontSize: fields.fontSize ? Number(getSingle(fields.fontSize)) : undefined,
        };

        if (watermarkType === 'text') {
            if (!watermarkText) {
                return res.status(400).json({ error: 'Watermark text is required for text type' });
            }
            options.text = watermarkText;
        } else if (watermarkType === 'image') {
            if (!watermarkImageFile) {
                return res.status(400).json({ error: 'Watermark image is required for image type' });
            }
            options.imagePath = watermarkImageFile.filepath;
            if (watermarkImageFile.filepath) tempFiles.push(watermarkImageFile.filepath);
        }

        if (uploadedFiles.length === 1) {
            // Single File
            const outputFilePath = await watermarkService.applyWatermark(uploadedFiles[0].filepath, options);

            const fileBuffer = fs.readFileSync(outputFilePath);
            const filename = path.basename(outputFilePath);

            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(fileBuffer);
        } else {
            // Batch Processing
            const inputs = uploadedFiles.map(f => ({
                path: f.filepath,
                options: options
            }));

            const results = await watermarkService.applyWatermarkBatch(inputs, options);

            res.status(200).json({
                success: true,
                message: 'Batch watermarking completed',
                results: results.map(r => ({
                    path: r.path,
                    error: r.error
                }))
            });
        }
    } catch (error) {
        console.error('Watermark error:', error);
        res.status(500).json({ error: 'Watermark processing failed. Please try again.' });
    } finally {
        // Clean up temp files uploaded by formidable
        for (const filePath of tempFiles) {
            try { fs.unlinkSync(filePath); } catch { /* ignore cleanup errors */ }
        }
    }
}
