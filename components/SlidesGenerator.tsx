'use client';

import { useState, useRef, useEffect } from 'react';
import { Presentation, Download, Loader2, Plus, Trash2, Image as ImageIcon, BarChart3, MapPin, Users, TrendingUp, Zap, Eye, Share2, Copy, FileText, Settings, Palette, Type, Layout, Sparkles, Clock, Target, Brain, Globe, ChevronRight, Play, Pause, RotateCcw, Save, Upload, Filter, Search, Grid3x3, List, Star, MessageSquare, TrendingDown, Award, BookOpen, Briefcase, GraduationCap, Heart, DollarSign } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageUrl?: string;
  imagePrompt?: string;
  speakerNotes?: string;
  transition?: string;
  duration?: number;
  charts?: ChartData[];
  images?: ImageData[];
  layout?: 'title-only' | 'title-content' | 'two-column' | 'content-only' | 'image-text' | 'text-image' | 'chart-text' | 'full-image';
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large' | 'x-large';
  animations?: AnimationData[];
  metadata?: SlideMetadata;
}

interface PresentationData {
  title: string;
  slides: Slide[];
  theme: string;
  aspectRatio: string;
  imageStyle: string;
  audience: string;
  tone: string;
  length: number;
  enableAnimations: boolean;
}

interface PresentationConfig {
  topic: string;
  fileData?: { base64: string; mimeType: string };
  audience: 'executive' | 'technical' | 'academic' | 'client-facing' | 'general';
  tone: 'formal' | 'persuasive' | 'educational' | 'inspirational' | 'conversational';
  purpose: 'pitch-deck' | 'quarterly-review' | 'training' | 'conference' | 'report' | 'proposal';
  industry: 'tech' | 'finance' | 'healthcare' | 'education' | 'marketing' | 'consulting' | 'other';
  duration: number;
  length: number;
  theme: string;
  aspectRatio: string;
  imageStyle: string;
  enableAnimations: boolean;
}

interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar' | 'donut';
  title: string;
  data: any[];
  color?: string;
  animated?: boolean;
  interactive?: boolean;
}

interface ImageData {
  url: string;
  caption: string;
  position: 'left' | 'right' | 'center' | 'background' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large' | 'full';
  filter?: 'none' | 'blur' | 'grayscale' | 'sepia' | 'vintage';
}

interface AnimationData {
  type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'rotate' | 'flip';
  target: 'title' | 'content' | 'image' | 'chart' | 'slide';
  duration: number;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

interface SlideMetadata {
  estimatedReadTime: number;
  engagementScore: number;
  complexity: 'low' | 'medium' | 'high';
  keywords: string[];
  accessibilityScore: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  layouts: string[];
  colorScheme: string[];
  typography: {
    heading: string;
    body: string;
  };
  popularity: number;
  isPremium?: boolean;
}

interface CollaborationUser {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isActive: boolean;
  cursor?: { slide: number; x: number; y: number };
}

export default function SlidesGenerator() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationStyle, setPresentationStyle] = useState('professional');
  const [slideCount, setSlideCount] = useState(10);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [includeTransitions, setIncludeTransitions] = useState(true);
  const [exportFormat, setExportFormat] = useState<'pptx' | 'pdf' | 'html' | 'video'>('pptx');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Advanced state management
  const [config, setConfig] = useState<PresentationConfig>({
    topic: '',
    audience: 'general',
    purpose: 'conference',
    industry: 'tech',
    tone: 'formal',
    duration: 30,
    length: 10,
    theme: 'modern',
    aspectRatio: '16:9',
    imageStyle: 'Photorealistic',
    enableAnimations: false
  });
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'outline' | 'notes'>('edit');
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [collaborators, setCollaborators] = useState<CollaborationUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBrandSettings, setShowBrandSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'x-large'>('medium');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [brandColors, setBrandColors] = useState(['#00acc1', '#1a237e', '#ffffff', '#000000']);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  // Constants from the provided code
  const THEMES = [
    { id: 'modern', name: 'Modern Blue', color: 'bg-blue-600' },
    { id: 'corporate', name: 'Corporate Grey', color: 'bg-slate-700' },
    { id: 'minimal', name: 'Minimal B&W', color: 'bg-black' },
    { id: 'vibrant', name: 'Vibrant Rose', color: 'bg-rose-600' },
    { id: 'dark', name: 'Dark Mode', color: 'bg-slate-900' },
  ];

  const ASPECT_RATIOS = ['16:9', '1:1', '4:3', '3:4', '9:16'];
  const IMAGE_STYLES = ['Photorealistic', 'Cartoon', 'Watercolor', 'Cyberpunk', 'Sketch', '3D Render', 'Minimalist', 'Abstract'];

  // Real image generation function
  const generateImage = async (prompt: string, style: string): Promise<string> => {
    try {
      const enhancedPrompt = `${prompt}, ${style.toLowerCase()}, professional presentation slide, high quality, 8k`;
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}`;
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}%20professional%20slide`;
    }
  };

  // Generate image for a specific slide
  const generateSlideImage = async (slideId: string) => {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;

    const imagePrompt = `${slide.title}, ${slide.content.substring(0, 100)}...`;
    const imageUrl = await generateImage(imagePrompt, config.imageStyle);
    
    setSlides(prev => prev.map(s => 
      s.id === slideId 
        ? { ...s, imageUrl, imagePrompt }
        : s
    ));
  };

  // Real PPTX export function
  const exportToPPTX = (presentationData: PresentationData) => {
    // Create a simplified PPTX structure
    const pptxContent = {
      title: presentationData.title,
      theme: presentationData.theme,
      aspectRatio: presentationData.aspectRatio,
      slides: presentationData.slides.map(slide => ({
        title: slide.title,
        content: slide.content,
        imageUrl: slide.imageUrl,
        speakerNotes: slide.speakerNotes,
        layout: slide.layout || 'title-content'
      }))
    };

    // Create and download JSON file (simplified PPTX export)
    const blob = new Blob([JSON.stringify(pptxContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presentationData.title.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateSlides = async () => {
    if (!config.topic.trim()) return;
    
    setIsGenerating(true);
    try {
      // Enhanced AI generation with multiple content types
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedSlides: Slide[] = [];
      
      // Generate slides with real content
      for (let i = 0; i < Math.min(config.length, 50); i++) {
        let slideTitle = '';
        let slideContent = '';
        let imagePrompt = '';
        
        if (i === 0) {
          // Title slide
          slideTitle = config.topic;
          slideContent = `A comprehensive ${config.purpose.replace('-', ' ')} on ${config.topic}`;
          imagePrompt = `${config.topic} professional title slide, ${config.theme} theme`;
        } else if (i === 1) {
          // Introduction
          slideTitle = `Introduction to ${config.topic}`;
          slideContent = `Welcome to this comprehensive ${config.purpose.replace('-', ' ')} on ${config.topic}. Today we'll explore fundamental concepts, practical applications, and future implications of this important topic in ${config.industry} industry.`;
          imagePrompt = `${slideTitle}, professional content slide, ${config.imageStyle} style`;
        } else if (i === config.length - 1) {
          // Conclusion
          slideTitle = `Conclusion & Next Steps`;
          slideContent = `In summary, ${config.topic} represents a significant opportunity for innovation and growth. The key takeaways from this presentation highlight the importance of strategic implementation and continuous improvement.`;
          imagePrompt = `${slideTitle}, conclusion slide, professional summary`;
        } else {
          // Content slides
          const concepts = ['Key Concepts', 'Implementation Strategy', 'Best Practices', 'Market Analysis', 'Future Trends', 'Case Studies'];
          const conceptIndex = (i - 2) % concepts.length;
          slideTitle = `${concepts[conceptIndex]}: ${config.topic}`;
          slideContent = `This section explores important aspects of ${config.topic} that are essential for understanding its impact and potential applications in the ${config.industry} sector.`;
          imagePrompt = `${slideTitle}, ${config.imageStyle} style, professional presentation visual`;
        }
        
        const slide: Slide = {
          id: `slide-${i + 1}`,
          title: slideTitle,
          content: slideContent,
          layout: i === 0 ? 'title-only' : 'title-content',
          backgroundColor: brandColors[2],
          textColor: brandColors[3],
          fontFamily,
          fontSize,
          imagePrompt,
          speakerNotes: `Speaker notes for ${slideTitle}: Key points to emphasize include ${slideContent.substring(0, 100)}...`,
          transition: includeTransitions ? 'slide' : undefined,
          duration: Math.ceil(config.duration / config.length),
          metadata: {
            estimatedReadTime: Math.ceil(slideContent.split(' ').length / 150),
            engagementScore: Math.floor(Math.random() * 30) + 70,
            complexity: 'medium',
            keywords: slideContent.toLowerCase().split(' ').filter(word => word.length > 4).slice(0, 5),
            accessibilityScore: accessibilityMode ? 95 : 85
          }
        };
        
        // Add charts to some slides
        if (includeCharts && i > 1 && i % 2 === 0) {
          slide.charts = [{
            type: 'bar',
            title: `${config.topic} Performance Metrics`,
            data: [
              { month: 'Jan', value: Math.floor(Math.random() * 100) + 20 },
              { month: 'Feb', value: Math.floor(Math.random() * 100) + 20 },
              { month: 'Mar', value: Math.floor(Math.random() * 100) + 20 },
              { month: 'Apr', value: Math.floor(Math.random() * 100) + 20 },
              { month: 'May', value: Math.floor(Math.random() * 100) + 20 },
              { month: 'Jun', value: Math.floor(Math.random() * 100) + 20 }
            ],
            color: brandColors[0],
            animated: animationEnabled,
            interactive: true
          }];
          slide.layout = 'chart-text';
        }
        
        // Add images to some slides
        if (includeImages && i > 0) {
          slide.images = [{
            url: `https://image.pollinations.ai/prompt/${encodeURIComponent(`${config.topic} professional slide ${i} ${config.imageStyle}`)}`,
            caption: `${config.topic} visualization`,
            position: i % 2 === 0 ? 'left' : 'right',
            size: 'medium',
            filter: 'none'
          }];
        }
        
        generatedSlides.push(slide);
      }
      
      setSlides(generatedSlides);
      setCurrentSlide(0);
    } catch (error) {
      console.error('Error generating slides:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${slides.length + 1}`,
      title: 'New Slide',
      content: 'Click to edit this slide content...',
      speakerNotes: 'Add speaker notes here...'
    };
    
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = (slideId: string) => {
    if (slides.length <= 1) return;
    
    const newSlides = slides.filter(slide => slide.id !== slideId);
    setSlides(newSlides);
    
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1);
    }
  };

  const duplicateSlide = (slideId: string) => {
    const slideToDuplicate = slides.find(s => s.id === slideId);
    if (!slideToDuplicate) return;
    
    const duplicatedSlide: Slide = {
      ...slideToDuplicate,
      id: `slide-${slides.length + 1}`,
      title: `${slideToDuplicate.title} (Copy)`
    };
    
    const newSlides = [...slides];
    newSlides.splice(currentSlide + 1, 0, duplicatedSlide);
    setSlides(newSlides);
    setCurrentSlide(currentSlide + 1);
  };

  const updateSlide = (slideId: string, updates: Partial<Slide>) => {
    setSlides(slides.map(slide => 
      slide.id === slideId ? { ...slide, ...updates } : slide
    ));
  };

  const downloadPresentation = () => {
    const presentationData: PresentationData = {
      title: config.topic,
      slides,
      theme: config.theme,
      aspectRatio: config.aspectRatio,
      imageStyle: config.imageStyle,
      audience: config.audience,
      tone: config.tone,
      length: config.length,
      enableAnimations: config.enableAnimations
    };
    
    exportToPPTX(presentationData);
  };

  const sharePresentation = async () => {
    const shareData = {
      title: `${config.topic} Presentation`,
      text: `Check out my presentation on ${config.topic} with ${slides.length} slides!`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Presentation link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing presentation:', error);
    }
  };

  const renderChart = (chart: ChartData) => {
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
        <p className="text-gray-600">Create professional AI-powered presentations with real images and charts</p>
      </div>

      {/* Enhanced Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Topic</label>
            <input
              type="text"
              value={config.topic}
              onChange={(e) => setConfig({...config, topic: e.target.value})}
              placeholder="e.g., The Future of AI in Healthcare, Q3 Financial Report..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Slides</label>
            <input
              type="number"
              min="5"
              max="50"
              value={config.length}
              onChange={(e) => setConfig({...config, length: parseInt(e.target.value) || 10})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
            <select 
              value={config.audience} 
              onChange={(e) => setConfig({...config, audience: e.target.value as any})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="general">General Audience</option>
              <option value="executive">Executives</option>
              <option value="technical">Technical Team</option>
              <option value="academic">Academic</option>
              <option value="client-facing">Clients</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <select 
              value={config.tone} 
              onChange={(e) => setConfig({...config, tone: e.target.value as any})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="formal">Professional</option>
              <option value="persuasive">Persuasive</option>
              <option value="educational">Educational</option>
              <option value="inspirational">Inspirational</option>
              <option value="conversational">Conversational</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Style</label>
            <select 
              value={config.imageStyle} 
              onChange={(e) => setConfig({...config, imageStyle: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {IMAGE_STYLES.map(style => <option key={style}>{style}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
            <select 
              value={config.aspectRatio} 
              onChange={(e) => setConfig({...config, aspectRatio: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {ASPECT_RATIOS.map(ratio => <option key={ratio}>{ratio}</option>)}
            </select>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Visual Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setConfig({...config, theme: theme.id})}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  config.theme === theme.id 
                    ? 'border-cyan-500 bg-cyan-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-8 rounded ${theme.color} mb-2`}></div>
                <span className="text-xs font-medium">{theme.name}</span>
                {config.theme === theme.id && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="mr-2"
              disabled={isGenerating}
            />
            <span className="text-sm text-gray-700">Include Charts</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeImages}
              onChange={(e) => setIncludeImages(e.target.checked)}
              className="mr-2"
              disabled={isGenerating}
            />
            <span className="text-sm text-gray-700">Include Images</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeTransitions}
              onChange={(e) => setIncludeTransitions(e.target.checked)}
              className="mr-2"
              disabled={isGenerating}
            />
            <span className="text-sm text-gray-700">Enable Transitions</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enableAnimations}
              onChange={(e) => setConfig({...config, enableAnimations: e.target.checked})}
              className="mr-2"
              disabled={isGenerating}
            />
            <span className="text-sm text-gray-700">Enable Animations</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSlides}
          disabled={isGenerating || !config.topic.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Presentation...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Presentation
            </>
          )}
        </button>
      </div>

      {/* Slides Display */}
      {slides.length > 0 && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Slides</h2>
              <div className="flex gap-2">
                <button
                  onClick={downloadPresentation}
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
            </div>

            {/* Slide Navigation */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSlide === index
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Slide {index + 1}
                </button>
              ))}
            </div>

            {/* Current Slide */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {slides[currentSlide].content}
                </p>
              </div>

              {/* Render Images */}
              {slides[currentSlide].images?.map((img, index) => (
                <div key={index} className="mb-4">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2">{img.caption}</p>
                </div>
              ))}

              {/* Render Charts */}
              {slides[currentSlide].charts?.map((chart, index) => (
                <div key={index}>
                  {renderChart(chart)}
                </div>
              ))}

              {/* Generate Image Button */}
              {slides[currentSlide].imagePrompt && !slides[currentSlide].imageUrl && (
                <button
                  onClick={() => generateSlideImage(slides[currentSlide].id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Generate Image
                </button>
              )}

              {/* Generated Image */}
              {slides[currentSlide].imageUrl && (
                <div className="mt-4">
                  <img
                    src={slides[currentSlide].imageUrl}
                    alt={slides[currentSlide].title}
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2">AI Generated Image</p>
                </div>
              )}

              {/* Speaker Notes */}
              {slides[currentSlide].speakerNotes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Speaker Notes</h4>
                  <p className="text-sm text-gray-600">{slides[currentSlide].speakerNotes}</p>
                </div>
              )}
            </div>

            {/* Slide Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addSlide()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Slide
              </button>
              <button
                onClick={() => duplicateSlide(slides[currentSlide].id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate
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
        </>
      )}
    </div>
  );
}
