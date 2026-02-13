import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { deepAIService } from '@/services/DeepAIService';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { action, imageUrl, text } = await req.json();

        if (!action || !imageUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let resultUrl: string;

        switch (action) {
            case 'removeBackground':
                resultUrl = await deepAIService.removeBackground(imageUrl);
                break;
            case 'superResolution':
                resultUrl = await deepAIService.superResolution(imageUrl);
                break;
            case 'colorize':
                resultUrl = await deepAIService.colorizeImage(imageUrl);
                break;
            case 'edit':
                resultUrl = await deepAIService.editImage(imageUrl, text || 'Improve image quality');
                break;
            case 'expand':
                resultUrl = await deepAIService.expandImage(imageUrl);
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ success: true, url: resultUrl });
    } catch (error) {
        console.error('DeepAI API error:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
