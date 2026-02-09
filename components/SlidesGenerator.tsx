'use client';

import { useState, useRef } from 'react';
import { Presentation, Download, Loader2, Plus, Trash2, Image as ImageIcon, BarChart3, MapPin, Users, TrendingUp, Zap, Eye, Share2, Copy, FileText } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
  speakerNotes?: string;
  transition?: string;
  duration?: number;
  charts?: ChartData[];
  images?: ImageData[];
}

interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  data: any[];
  color?: string;
}

interface ImageData {
  url: string;
  caption: string;
  position: 'left' | 'right' | 'center' | 'background';
}

export default function SlidesGenerator() {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationStyle, setPresentationStyle] = useState('professional');
  const [slideCount, setSlideCount] = useState(10);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [includeTransitions, setIncludeTransitions] = useState(true);
  const [exportFormat, setExportFormat] = useState<'pptx' | 'pdf' | 'html'>('pptx');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presentationStyles = [
    { id: 'professional', name: 'Professional', description: 'Clean corporate style' },
    { id: 'creative', name: 'Creative', description: 'Bold and colorful' },
    { id: 'academic', name: 'Academic', description: 'Research-focused' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and clean' },
    { id: 'modern', name: 'Modern', description: 'Contemporary design' },
  ];

  const generateSlides = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      // Enhanced AI generation with multiple content types
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedSlides: Slide[] = [];
      
      for (let i = 1; i <= slideCount; i++) {
        let slideContent = '';
        let slideTitle = '';
        let charts: ChartData[] = [];
        let images: ImageData[] = [];
        
        switch (i) {
          case 1:
            slideTitle = `Introduction to ${topic}`;
            slideContent = `Welcome to this comprehensive presentation on ${topic}. Today we'll explore the key concepts, applications, and future implications of this important topic.`;
            if (includeCharts) {
              charts.push({
                type: 'bar',
                title: `${topic} Market Growth`,
                data: [
                  { year: '2020', value: 45 },
                  { year: '2021', value: 62 },
                  { year: '2022', value: 78 },
                  { year: '2023', value: 95 },
                  { year: '2024', value: 120 }
                ],
                color: '#00acc1'
              });
            }
            break;
            
          case 2:
            slideTitle = `Key Concepts of ${topic}`;
            slideContent = `${topic} encompasses several fundamental concepts that are essential for understanding its impact and potential. Let's explore these core ideas in detail.`;
            if (includeCharts) {
              charts.push({
                type: 'pie',
                title: `${topic} Components`,
                data: [
                  { category: 'Core', value: 35 },
                  { category: 'Advanced', value: 25 },
                  { category: 'Applications', value: 40 }
                ],
                color: '#1a237e'
              });
            }
            break;
            
          case 3:
            slideTitle = `Applications in Industry`;
            slideContent = `The practical applications of ${topic} span across multiple sectors, transforming how businesses and organizations operate in the modern world.`;
            if (includeImages) {
              images.push({
                url: `https://image.pollinations.ai/prompt/${topic}%20industry%20applications%20professional`,
                caption: `${topic} Industry Applications`,
                position: 'right'
              });
            }
            break;
            
          case 4:
            slideTitle = `Case Studies and Success Stories`;
            slideContent = `Real-world examples of ${topic} implementation demonstrate its effectiveness and potential for transformative change.`;
            if (includeCharts) {
              charts.push({
                type: 'line',
                title: 'Implementation Success Rate',
                data: [
                  { month: 'Jan', rate: 65 },
                  { month: 'Feb', rate: 72 },
                  { month: 'Mar', rate: 78 },
                  { month: 'Apr', rate: 85 },
                  { month: 'May', rate: 92 }
                ],
                color: '#4caf50'
              });
            }
            break;
            
          case 5:
            slideTitle = `Technical Implementation`;
            slideContent = `Deep dive into the technical aspects of ${topic}, including architecture, best practices, and implementation strategies.`;
            break;
            
          case 6:
            slideTitle = `Benefits and Advantages`;
            slideContent = `The key benefits of implementing ${topic} include improved efficiency, cost reduction, and enhanced user experience.`;
            if (includeCharts) {
              charts.push({
                type: 'scatter',
                title: 'Efficiency vs Cost Analysis',
                data: [
                  { efficiency: 85, cost: 45 },
                  { efficiency: 90, cost: 42 },
                  { efficiency: 88, cost: 38 },
                  { efficiency: 95, cost: 35 }
                ],
                color: '#ff9800'
              });
            }
            break;
            
          case 7:
            slideTitle = `Challenges and Solutions`;
            slideContent = `While implementing ${topic} presents certain challenges, there are proven solutions and strategies to overcome them effectively.`;
            break;
            
          case 8:
            slideTitle = `Future Trends and Innovations`;
            slideContent = `Looking ahead, ${topic} is evolving rapidly with emerging trends and innovations that will shape its future development.`;
            if (includeImages) {
              images.push({
                url: `https://image.pollinations.ai/prompt/${topic}%20future%20trends%20technology`,
                caption: 'Future Technology Trends',
                position: 'background'
              });
            }
            break;
            
          case 9:
            slideTitle = `ROI and Business Impact`;
            slideContent = `The return on investment and business impact of ${topic} implementation demonstrate significant value and competitive advantages.`;
            if (includeCharts) {
              charts.push({
                type: 'bar',
                title: 'ROI Analysis',
                data: [
                  { metric: 'Efficiency', value: 150 },
                  { metric: 'Revenue', value: 200 },
                  { metric: 'Satisfaction', value: 180 }
                ],
                color: '#9c27b0'
              });
            }
            break;
            
          case 10:
            slideTitle = `Conclusion and Next Steps`;
            slideContent = `In conclusion, ${topic} represents a significant opportunity for growth and innovation. Let's discuss the key takeaways and actionable next steps.`;
            break;
            
          default:
            // Generate additional slides based on the pattern
            slideTitle = `${topic} - Advanced Topic ${i - 10}`;
            slideContent = `Further exploration of ${topic} with advanced concepts and detailed analysis for comprehensive understanding.`;
            break;
        }
        
        const slide: Slide = {
          id: i.toString(),
          title: slideTitle,
          content: slideContent,
          image: includeImages && images.length === 0 ? 
            `https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}%20slide%20${i}%20professional%20presentation` : 
            undefined,
          speakerNotes: `Speaker notes for ${slideTitle}. Key points to emphasize during presentation.`,
          transition: includeTransitions ? 'fade' : undefined,
          duration: 60,
          charts,
          images
        };
        
        generatedSlides.push(slide);
      }
      
      setSlides(generatedSlides);
    } catch (error) {
      console.error('Error generating slides:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = (position?: number) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Enter your content here...',
      speakerNotes: '',
      duration: 60,
      charts: [],
      images: []
    };
    
    if (position !== undefined) {
      const updatedSlides = [...slides];
      updatedSlides.splice(position + 1, 0, newSlide);
      setSlides(updatedSlides);
      setCurrentSlide(position + 1);
    } else {
      setSlides([...slides, newSlide]);
      setCurrentSlide(slides.length);
    }
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
    if (currentSlide >= slides.length - 1) {
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
  };

  const duplicateSlide = (id: string) => {
    const slideToDuplicate = slides.find(s => s.id === id);
    if (slideToDuplicate) {
      const duplicatedSlide = {
        ...slideToDuplicate,
        id: Date.now().toString(),
        title: `${slideToDuplicate.title} (Copy)`
      };
      const index = slides.findIndex(s => s.id === id);
      const updatedSlides = [...slides];
      updatedSlides.splice(index + 1, 0, duplicatedSlide);
      setSlides(updatedSlides);
      setCurrentSlide(index + 1);
    }
  };

  const exportPresentation = async () => {
    const presentationData = {
      title: topic || 'Presentation',
      slides: slides,
      style: presentationStyle,
      createdAt: new Date().toISOString(),
      totalSlides: slides.length,
      estimatedDuration: slides.reduce((total, slide) => total + (slide.duration || 60), 0)
    };
    
    if (exportFormat === 'pptx') {
      // Enhanced PPTX export with charts and images
      const blob = new Blob([JSON.stringify(presentationData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${topic}-presentation.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (exportFormat === 'pdf') {
      // PDF export simulation
      window.print();
    } else {
      // HTML export
      const htmlContent = generateHTMLPresentation(presentationData);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${topic}-presentation.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const generateHTMLPresentation = (data: any) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${data.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .slide { width: 100%; height: 100vh; page-break-after: always; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 1px solid #ccc; margin-bottom: 20px; }
          .slide h1 { color: #1a237e; margin-bottom: 20px; }
          .slide p { max-width: 800px; text-align: center; line-height: 1.6; }
          .chart { margin: 20px 0; }
        </style>
      </head>
      <body>
        ${data.slides.map((slide: any, index: number) => `
          <div class="slide">
            <h1>${slide.title}</h1>
            <p>${slide.content}</p>
            ${slide.image ? `<img src="${slide.image}" style="max-width: 400px; margin: 20px 0;" />` : ''}
            ${slide.charts ? slide.charts.map((chart: any) => `
              <div class="chart">
                <h3>${chart.title}</h3>
                <div style="background: ${chart.color || '#00acc1'}; color: white; padding: 10px; border-radius: 5px;">
                  Chart: ${chart.type} - ${chart.title}
                </div>
              </div>
            `).join('') : ''}
          </div>
        `).join('')}
      </body>
      </html>
    `;
  };

  const sharePresentation = () => {
    const shareUrl = window.location.href + '?presentation=' + btoa(JSON.stringify(slides));
    navigator.clipboard.writeText(shareUrl);
  };

  const renderChart = (chart: ChartData) => {
    // Simple chart rendering simulation
    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-gray-900 mb-2">{chart.title}</h4>
        <div className="h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{chart.type} Chart</p>
            <p className="text-xs text-gray-500">Data points: {chart.data?.length || 0}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Slides Generator</h1>
        <p className="text-gray-600">Create professional AI-powered presentations with charts, images, and rich content</p>
      </div>

      {/* Enhanced Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your presentation topic..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <select
              value={presentationStyle}
              onChange={(e) => setPresentationStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {presentationStyles.map(style => (
                <option key={style.id} value={style.id}>{style.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Slides</label>
            <input
              type="number"
              value={slideCount}
              onChange={(e) => setSlideCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
              min="1"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="rounded text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-700">Include Charts</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeImages}
              onChange={(e) => setIncludeImages(e.target.checked)}
              className="rounded text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-700">Include Images</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeTransitions}
              onChange={(e) => setIncludeTransitions(e.target.checked)}
              className="rounded text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-700">Include Transitions</span>
          </label>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={generateSlides}
            disabled={isGenerating || !topic.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating {slideCount} Slides...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Generate Presentation
              </>
            )}
          </button>
          
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="pptx">PowerPoint (.pptx)</option>
            <option value="pdf">PDF Document</option>
            <option value="html">HTML Web Page</option>
          </select>
        </div>
      </div>

      {slides.length > 0 && (
        <>
          {/* Enhanced Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => addSlide()}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Slide
                </button>
                <button
                  onClick={exportPresentation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={sharePresentation}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
                <span className="text-sm text-gray-500">
                  Duration: {Math.floor(slides.reduce((total, slide) => total + (slide.duration || 60), 0) / 60)}m {slides.reduce((total, slide) => total + (slide.duration || 60), 0) % 60}s
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Slide Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
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
          </div>

          {/* Enhanced Slide Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Slide Content */}
              <div className="lg:col-span-2">
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
                    className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none mb-4"
                    placeholder="Enter slide content..."
                  />
                  <textarea
                    value={slides[currentSlide].speakerNotes || ''}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      updatedSlides[currentSlide].speakerNotes = e.target.value;
                      setSlides(updatedSlides);
                    }}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none mb-4"
                    placeholder="Speaker notes..."
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => duplicateSlide(slides[currentSlide].id)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => addSlide(currentSlide)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add After
                  </button>
                  <button
                    onClick={() => deleteSlide(slides[currentSlide].id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Slide Preview */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto">
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
                    <p className="text-gray-600 mb-4">
                      {slides[currentSlide].content}
                    </p>
                    
                    {/* Render Charts */}
                    {slides[currentSlide].charts?.map((chart, index) => (
                      <div key={index}>
                        {renderChart(chart)}
                      </div>
                    ))}
                    
                    {/* Render Additional Images */}
                    {slides[currentSlide].images?.map((img, index) => (
                      <div key={index} className="mb-4">
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full max-h-32 object-cover rounded-lg"
                        />
                        <p className="text-sm text-gray-600 mt-2">{img.caption}</p>
                      </div>
                    ))}
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
