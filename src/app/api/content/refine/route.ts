import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentGenerationService } from '@/services/ContentGenerationService';

const contentGenerator = new ContentGenerationService();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { type, content, option } = await req.json();

        if (!type || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const refinedContent = await contentGenerator.refineContent(type, content, option);

        return NextResponse.json({ success: true, content: refinedContent });
    } catch (error) {
        console.error('Content refinement error:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
