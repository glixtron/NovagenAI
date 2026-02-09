import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, Volume2Icon, DownloadIcon, SparklesIcon } from './Icons';
import { generateRealImage } from '../services/geminiService';
import { Slide, PresentationData, ChartData, MapData, InfographicData } from '../types';
import PptxGenJS from 'pptxgenjs';

interface SimplePresentationViewerProps {
  presentation: PresentationData;
  onBack: () => void;
}

const SimplePresentationViewer: React.FC<SimplePresentationViewerProps> = ({ presentation, onBack }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentSlide = presentation.slides[currentSlideIndex];
  const totalSlides = presentation.slides.length;

  // Initialize with pre-generated images from presentation data
  const [generatedImages, setGeneratedImages] = useState<{ [key: string]: string }>({});

  // Generate missing images on component mount - AUTOMATIC IMAGE GENERATION
  useEffect(() => {
    const generateMissingImages = async () => {
      for (const slide of presentation.slides) {
        if (!generatedImages[slide.id]) {
          // AUTOMATIC: Generate image immediately when slide text is available
          await generateSlideImage(slide.id);
        }
      }
    };
    
    // Auto-generate images for slides that don't have them - NO USER INTERACTION NEEDED
    generateMissingImages();
  }, [presentation.slides]);

  useEffect(() => {
    const preGeneratedImages: { [key: string]: string } = {};
    presentation.slides.forEach(slide => {
      if (slide.imageUrl) {
        preGeneratedImages[slide.id] = slide.imageUrl;
      }
    });
    setGeneratedImages(preGeneratedImages);
  }, [presentation.slides]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentSlideIndex < totalSlides - 1) {
          setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 5000); // 5 seconds per slide
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentSlideIndex, totalSlides]);

  // Download entire presentation as PPTX
  const downloadPresentation = async () => {
    try {
      setIsDownloading(true);
      console.log('📥 Generating PowerPoint presentation...');
      
      // Create new presentation
      const pptx = new (window as any).PptxGenJS();
      
      // Add title slide
      pptx.addSlide();
      pptx.addText(presentation.title, { 
        x: 4, 
        y: 3, 
        fontSize: 44, 
        bold: true, 
        color: 'FFFFFF', 
        align: 'center' 
      });
      
      if (presentation.subtitle) {
        pptx.addText(presentation.subtitle, { 
          x: 4, 
          y: 5, 
          fontSize: 24, 
          color: 'FFFFFF', 
          align: 'center' 
        });
      }
      
      pptx.addText(`Created with ${presentation.branding?.company || 'NovagenAI'}`, { 
        x: 8.5, 
        y: 7, 
        fontSize: 10, 
        color: 'FFFFFF', 
        align: 'right' 
      });
      
      // Add content slides
      for (const slide of presentation.slides) {
        pptx.addSlide();
        
        // Add slide title
        pptx.addText(slide.title, {
          x: 0.5,
          y: 0.5,
          fontSize: 28,
          bold: true,
          color: '#3b82f6'
        });
        
        // Add bullet points
        slide.content.forEach((point, index) => {
          pptx.addText(`• ${point}`, {
            x: 0.5,
            y: 1.5 + (index * 0.6),
            fontSize: 18,
            color: '#374151'
          });
        });
        
        // Add image if available
        if (generatedImages[slide.id]) {
          const imageData = generatedImages[slide.id].includes('base64') 
            ? generatedImages[slide.id] 
            : `data:image/png;base64,${generatedImages[slide.id]}`;
            
          pptx.addImage({ data: imageData }, {
            x: 6,
            y: 2,
            width: 3.5,
            height: 2
          });
        }
        
        // Add speaker notes
        if (slide.speakerNotes) {
          pptx.addText(slide.speakerNotes, {
            x: 0.5,
            y: 7,
            fontSize: 10,
            color: '#6b7280',
            italic: true
          });
        }
      }
      
      // Generate and download file
      const fileName = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}_NovagenAI.pptx`;
      pptx.writeFile({ fileName });
      
      console.log('✅ PowerPoint presentation generated successfully');
    } catch (error) {
      console.error('❌ Failed to generate PowerPoint:', error);
      alert('Failed to generate PowerPoint. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const generateSlideImage = async (slideId: string) => {
    try {
      console.log(`🎨 Generating image for slide: ${slideId}`);
      // Find the slide object to get its imagePrompt
      const slide = presentation.slides.find(s => s.id === slideId);
      if (!slide) {
        console.error(`❌ Slide with ID ${slideId} not found`);
        return;
      }
      const imageUrl = await generateRealImage(slide.imagePrompt, presentation.aspectRatio || '16:9');
      setGeneratedImages(prev => ({ ...prev, [slideId]: imageUrl }));
      console.log(`✅ Image generated successfully for slide: ${slideId}`);
    } catch (error) {
      console.error(`❌ Failed to generate image for slide ${slideId}:`, error);
    }
  };

  // Render chart
  const renderChart = (chart: ChartData) => {
    const maxValue = Math.max(...chart.values);
    const barWidth = 60;
    const barSpacing = 20;
    const chartHeight = 200;
    const chartWidth = chart.values.length * (barWidth + barSpacing) + 40;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">{chart.title}</h4>
        <svg width={chartWidth} height={chartHeight} className="w-full">
          {chart.values.map((value, index) => {
            const barHeight = (value / maxValue) * (chartHeight - 40);
            const x = 20 + index * (barWidth + barSpacing);
            const y = chartHeight - barHeight - 20;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#3b82f6"
                  className="transition-all duration-300 hover:opacity-80"
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {chart.labels[index]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Render pie chart
  const renderPieChart = (chart: ChartData) => {
    const total = chart.values.reduce((sum, val) => sum + val, 0);
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    let currentAngle = -90;

    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">{chart.title}</h4>
        <svg width="300" height="300" className="w-full">
          {chart.values.map((value, index) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle = endAngle;
            
            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
                <text
                  x={centerX + (radius / 2) * Math.cos(((currentAngle - angle / 2) * Math.PI) / 180)}
                  y={centerY + (radius / 2) * Math.sin(((currentAngle - angle / 2) * Math.PI) / 180)}
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  {percentage.toFixed(1)}%
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-3 space-y-1">
          {chart.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600">{label}: {chart.values[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render map
  const renderMap = (map: MapData) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">{map.title}</h4>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <div className="text-6xl mb-2">🗺️</div>
          <p className="text-gray-600">Interactive Map</p>
          <div className="mt-4 space-y-2">
            {map.locations.map((location, index) => (
              <div key={index} className="flex justify-between items-center bg-white rounded px-3 py-2">
                <span className="text-sm font-medium">{location}</span>
                <span className="text-sm text-blue-600 font-bold">{map.values[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render infographic
  const renderInfographic = (infographic: InfographicData) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">{infographic.title}</h4>
        <div className="space-y-3">
          {infographic.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSlideContent = (slide: Slide) => {
    return (
      <div className="space-y-6">
        {/* Title */}
        <div className="relative pr-16 slide-title-container">
          <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
          
          {/* Generate Image Button - Only show if no image */}
          {!generatedImages[slide.id] && (
            <button
              onClick={() => generateSlideImage(slide.id)}
              className="absolute top-0 right-0 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center space-x-2 generate-image-icon"
            >
              <SparklesIcon className="w-4 h-4" />
              Generate Image
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {slide.content.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700 text-lg">{point}</p>
            </div>
          ))}
        </div>

        {/* Visual Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          {slide.imagePrompt && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Visual</h4>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {generatedImages[slide.id] ? (
                  <img 
                    src={generatedImages[slide.id]} 
                    alt={slide.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-sm">Auto-generating image...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{slide.imagePrompt}</p>
            </div>
          )}

          {/* Chart */}
          {slide.chart && (
            <div>
              {slide.chart.type === 'pie' ? renderPieChart(slide.chart) : renderChart(slide.chart)}
            </div>
          )}

          {/* Map */}
          {slide.map && renderMap(slide.map)}

          {/* Infographic */}
          {slide.infographic && renderInfographic(slide.infographic)}
        </div>

        {/* Speaker Notes */}
        {slide.speakerNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Volume2Icon className="w-4 h-4 mr-2" />
              Speaker Notes
            </h4>
            <p className="text-blue-700 text-sm">{slide.speakerNotes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">N</div>
              <span className="font-semibold text-gray-900">{presentation.branding?.company || 'NovagenAI'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4">⏸️</div>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={downloadPresentation}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download PPT</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderSlideContent(currentSlide)}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {presentation.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlideIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex(Math.min(totalSlides - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === totalSlides - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Info */}
        <div className="text-center mt-6 text-gray-500">
          Slide {currentSlideIndex + 1} of {totalSlides}
          {currentSlide.transition && (
            <span className="ml-4 text-sm">Transition: {currentSlide.transition}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePresentationViewer;
