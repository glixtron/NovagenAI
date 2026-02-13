'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles, Download, Share2, Settings } from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [presentation, setPresentation] = useState<any>(null)
  const [formData, setFormData] = useState({
    topic: '',
    industry: 'general',
    tone: 'professional',
    length: 'medium',
    style: 'professional',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleGenerate = async () => {
    if (!formData.topic.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/presentations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        setPresentation(result.data)
      } else {
        throw new Error(result.error || 'Generation failed')
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = async (format: string) => {
    if (!presentation) return

    try {
      const response = await fetch('/api/presentations/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationId: presentation.id,
          format,
        }),
      })

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `presentation.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">
                {process.env.NEXT_PUBLIC_APP_NAME || 'NovagenAI'}
              </h1>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                {(session.user as any)?.tier || 'Free'} Plan
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{session.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                Create Presentation
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic or Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your presentation topic..."
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tone
                    </label>
                    <select
                      value={formData.tone}
                      onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="creative">Creative</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Length
                    </label>
                    <select
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="short">Short (5 slides)</option>
                      <option value="medium">Medium (10 slides)</option>
                      <option value="long">Long (15 slides)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Style
                    </label>
                    <select
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="professional">Professional</option>
                      <option value="artistic">Artistic</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!formData.topic.trim() || isGenerating}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 inline" />
                      Generate Presentation
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="h-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-6 h-6 mb-2" />
                  Export
                </button>
                <button className="h-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-6 h-6 mb-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              {presentation ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{presentation.title}</h3>
                    <p className="opacity-90">{presentation.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {presentation.slides?.map((slide: any, index: number) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Slide {index + 1}</h4>
                        <p className="text-sm text-slate-600">{slide.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => handleExport('pptx')}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4 mr-1 inline" />
                      PowerPoint
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4 mr-1 inline" />
                      PDF
                    </button>
                    <button
                      onClick={() => handleExport('html')}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4 mr-1 inline" />
                      HTML
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated presentation will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
