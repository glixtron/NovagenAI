import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { fileConverterService } from '../../../services/FileConverterService';

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
        maxFileSize: 50 * 1024 * 1024,
    });

    try {
        const [fields, files] = await form.parse(req);
        const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const text = await fileConverterService.extractText(uploadedFile.filepath);

        // Cleanup
        try { fs.unlinkSync(uploadedFile.filepath); } catch { }

        res.status(200).json({ success: true, text });
    } catch (error) {
        console.error('PDF Extraction Error:', error);
        res.status(500).json({ error: 'Failed to extract text from PDF' });
    }
}
