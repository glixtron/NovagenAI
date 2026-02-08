import React, { useState, useEffect } from 'react';
import { PresentationData, Slide, ChartData, MapData, InfographicData } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, PlayIcon, Volume2Icon } from './Icons';

interface EnhancedPresentationViewerProps {
  presentation: PresentationData;
  onBack: () => void;
}

const EnhancedPresentationViewer: React.FC<EnhancedPresentationViewerProps> = ({ presentation, onBack }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{ [key: string]: string }>({});

  const currentSlide = presentation.slides[currentSlideIndex];
  const totalSlides = presentation.slides.length;

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

  // Generate images for all slides
  const generateAllImages = async () => {
    setIsGeneratingImages(true);
    try {
      const images: { [key: string]: string } = {};
      
      for (const slide of presentation.slides) {
        if (slide.imagePrompt) {
          // This would call the image generation service
          // For now, we'll use a placeholder
          images[slide.id] = `data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="450" fill="#f3f4f6"/>
              <text x="400" y="225" text-anchor="middle" font-family="Arial" font-size="18" fill="#6b7280">
                ${slide.imagePrompt.substring(0, 50)}...
              </text>
            </svg>
          `)}`;
        }
      }
      
      setGeneratedImages(images);
    } catch (error) {
      console.error('Failed to generate images:', error);
    } finally {
      setIsGeneratingImages(false);
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
        <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
        
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
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">Click "Generate Images" to create visuals</p>
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
              onClick={generateAllImages}
              disabled={isGeneratingImages}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isGeneratingImages ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4">🎨</div>
                  <span>Generate Images</span>
                </>
              )}
            </button>

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

            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>Export</span>
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

export default EnhancedPresentationViewer;
