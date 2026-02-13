import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileConverterService, AllowedFormat } from '../../services/FileConverterService';

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

        // Normalize files to array
        const uploadedFiles = Array.isArray(files.file) ? files.file : (files.file ? [files.file] : []);

        if (uploadedFiles.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Track temp files for cleanup
        uploadedFiles.forEach(f => tempFiles.push(f.filepath));

        const targetFormat = Array.isArray(fields.format) ? fields.format[0] : fields.format;
        if (!targetFormat) {
            return res.status(400).json({ error: 'Target format not specified' });
        }

        // Validate format against whitelist
        const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf', 'docx', 'doc', 'txt', 'rtf', 'odt', 'csv', 'xls', 'xlsx', 'ods', 'ppt', 'pptx', 'odp'];
        if (!allowedFormats.includes(targetFormat)) {
            return res.status(400).json({ error: `Invalid format: ${targetFormat}. Allowed: ${allowedFormats.join(', ')}` });
        }

        const options = {
            quality: fields.quality ? Number(Array.isArray(fields.quality) ? fields.quality[0] : fields.quality) : undefined,
            width: fields.width ? Number(Array.isArray(fields.width) ? fields.width[0] : fields.width) : undefined,
            height: fields.height ? Number(Array.isArray(fields.height) ? fields.height[0] : fields.height) : undefined,
            density: fields.density ? Number(Array.isArray(fields.density) ? fields.density[0] : fields.density) : undefined,
        };

        if (uploadedFiles.length === 1) {
            // Single File - Return File Buffer
            const outputFilePath = await fileConverterService.convert(uploadedFiles[0].filepath, targetFormat as AllowedFormat, options);

            const fileBuffer = fs.readFileSync(outputFilePath);
            const filename = path.basename(outputFilePath);

            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(fileBuffer);
        } else {
            // Multiple Files - Batch Processing
            const inputs = uploadedFiles.map(f => ({
                path: f.filepath,
                format: targetFormat as AllowedFormat,
                options
            }));

            const results = await fileConverterService.convertBatch(inputs, targetFormat as AllowedFormat, options);

            res.status(200).json({
                success: true,
                message: 'Batch processing completed',
                results: results.map(r => ({
                    path: r.path,
                    error: r.error
                }))
            });
        }
    } catch (error) {
        console.error('File conversion error:', error);
        res.status(500).json({ error: 'File conversion failed. Please try again.' });
    } finally {
        // Clean up temp files uploaded by formidable
        for (const filePath of tempFiles) {
            try { fs.unlinkSync(filePath); } catch { /* ignore cleanup errors */ }
        }
    }
}
