import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { topic, industry, tone, length, style } = await request.json()

    // Mock AI generation for now
    const mockPresentation = {
      id: 'mock-' + Date.now(),
      title: topic,
      description: `AI-generated presentation about ${topic} for the ${industry} industry`,
      slides: [
        {
          id: 1,
          title: 'Introduction',
          content: `Welcome to this presentation about ${topic}. This ${tone} presentation covers key aspects of the ${industry} industry.`
        },
        {
          id: 2,
          title: 'Key Points',
          content: `Main points about ${topic} in ${industry}:\n• Important aspect 1\n• Important aspect 2\n• Important aspect 3`
        },
        {
          id: 3,
          title: 'Conclusion',
          content: `Summary of the presentation about ${topic} and its impact on ${industry}.`
        }
      ],
      coverImage: '',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockPresentation,
    })

  } catch (error) {
    console.error('Presentation generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    )
  }
}
