import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PPTGeneratorService } from '@/services/PPTGeneratorService'

const pptService = new PPTGeneratorService()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { topic, industry, tone, length, style, architectMode } = body

    if (architectMode) {
      // Use the fully autonomous Presentation Architect
      const result = await pptService.createPresentation({
        presentation_id: `pres_${Date.now()}`,
        topic: topic,
        options: {
          format: 'all',
          quality: 'high',
          animations: true,
          transitions: true,
          speaker_notes: true,
          export_assets: true,
          smart_formatting: true,
          ai_images: true
        }
      } as any);

      return NextResponse.json({
        success: true,
        data: result,
      })
    }

    // Default semi-autonomous logic (can be expanded later)
    return NextResponse.json({
      success: false,
      error: 'Architect Mode is currently required for high-fidelity generation.',
    })

  } catch (error) {
    console.error('Presentation generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    )
  }
}
