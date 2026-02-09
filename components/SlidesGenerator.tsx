'use client';

import { useState } from 'react';
import { Presentation, Download, Loader2, Plus, Trash2 } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export default function SlidesGenerator() {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const generateSlides = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      // Mock API call - replace with actual Gemini API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSlides: Slide[] = [
        {
          id: '1',
          title: 'Introduction',
          content: `Welcome to ${topic}. This presentation will explore the key concepts and applications of ${topic} in modern technology.`,
          image: 'https://image.pollinations.ai/prompt/introduction%20slide%20about%20' + encodeURIComponent(topic)
        },
        {
          id: '2',
          title: 'Key Concepts',
          content: `${topic} encompasses several important concepts that are fundamental to understanding its impact and potential in various industries.`,
          image: 'https://image.pollinations.ai/prompt/key%20concepts%20of%20' + encodeURIComponent(topic)
        },
        {
          id: '3',
          title: 'Applications',
          content: `The practical applications of ${topic} span across multiple sectors, including healthcare, education, and business.`,
          image: 'https://image.pollinations.ai/prompt/applications%20of%20' + encodeURIComponent(topic)
        },
        {
          id: '4',
          title: 'Future Outlook',
          content: `Looking ahead, ${topic} is poised to revolutionize how we approach problem-solving and innovation in the coming years.`,
          image: 'https://image.pollinations.ai/prompt/future%20of%20' + encodeURIComponent(topic)
        }
      ];
      
      setSlides(mockSlides);
    } catch (error) {
      console.error('Error generating slides:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Enter your content here...'
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
    if (currentSlide >= slides.length - 1) {
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
  };

  const downloadPresentation = () => {
    // Mock download functionality
    const presentationData = {
      title: topic,
      slides: slides,
      createdAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(presentationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic}-presentation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Slides Generator</h1>
        <p className="text-gray-600">Create professional AI-powered presentations in minutes</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your presentation topic..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={generateSlides}
            disabled={isGenerating || !topic.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Presentation className="w-4 h-4" />
                Generate Slides
              </>
            )}
          </button>
        </div>
      </div>

      {slides.length > 0 && (
        <>
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={addSlide}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Slide
                </button>
                <button
                  onClick={downloadPresentation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`flex-shrink-0 w-20 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                  currentSlide === index
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Current Slide Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Slide Content */}
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={slides[currentSlide].title}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      updatedSlides[currentSlide].title = e.target.value;
                      setSlides(updatedSlides);
                    }}
                    className="w-full text-xl font-bold px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                  />
                  <textarea
                    value={slides[currentSlide].content}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      updatedSlides[currentSlide].content = e.target.value;
                      setSlides(updatedSlides);
                    }}
                    className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Enter slide content..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteSlide(slides[currentSlide].id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Slide
                  </button>
                </div>
              </div>

              {/* Slide Preview */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 h-96 flex items-center justify-center">
                  <div className="text-center">
                    {slides[currentSlide].image && (
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-gray-600">
                      {slides[currentSlide].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
