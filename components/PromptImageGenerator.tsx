import React, { useState } from 'react';
import { ImageStyle, AspectRatio } from '../types';
import { Wand2Icon, DownloadIcon, SparklesIcon, ImageIcon } from './Icons';

interface PromptImageGeneratorProps {
  onBack: () => void;
}

const PromptImageGenerator: React.FC<PromptImageGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageStyle, setImageStyle] = useState<ImageStyle>('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [history, setHistory] = useState<Array<{prompt: string, image: string, style: ImageStyle}>>([]);

  const imageStyles: ImageStyle[] = [
    'Photorealistic', 'Cartoon', 'Watercolor', 'Cyberpunk', 
    'Sketch', '3D Render', 'Minimalist', 'Abstract'
  ];

  const aspectRatios: AspectRatio[] = ['1:1', '16:9', '4:3', '3:4', '9:16'];

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      console.log('🎨 Generating image from prompt...');
      
      // Create detailed prompt based on selections
      const detailedPrompt = `
        Style: ${imageStyle}
        Aspect Ratio: ${aspectRatio}
        Quality: ${quality === 'hd' ? 'Ultra HD, 4K, highly detailed' : 'Standard, good quality'}
        Subject: ${prompt}
        ${negativePrompt ? `Negative prompt: ${negativePrompt}` : ''}
        
        Additional details:
        - Professional lighting
        - Sharp focus
        - Rich colors
        - High detail
        - ${imageStyle === 'Photorealistic' ? 'Realistic textures' : ''}
        - ${imageStyle === 'Cartoon' ? 'Clean lines, vibrant colors' : ''}
        - ${imageStyle === 'Watercolor' ? 'Soft brushstrokes, artistic' : ''}
        - ${imageStyle === 'Cyberpunk' ? 'Neon lights, futuristic' : ''}
        - ${imageStyle === '3D Render' ? '3D modeling, realistic shading' : ''}
      `;

      // Call image generation service
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: detailedPrompt,
          style: imageStyle,
          aspectRatio: aspectRatio,
          quality: quality
        })
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedImage(result.image);
        
        // Add to history
        setHistory(prev => [{
          prompt: prompt,
          image: result.image,
          style: imageStyle
        }, ...prev.slice(0, 9)]); // Keep last 10 images
        
        console.log('✅ Image generated successfully');
      } else {
        throw new Error('Failed to generate image');
      }
    } catch (error) {
      console.error('❌ Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    try {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `novagenai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Image downloaded successfully');
    } catch (error) {
      console.error('❌ Error downloading image:', error);
    }
  };

  const promptSuggestions = [
    "A professional business meeting with diverse team members around a conference table",
    "Futuristic city skyline at sunset with flying cars and neon lights",
    "Beautiful mountain landscape with a serene lake and reflection",
    "Modern office space with natural lighting and ergonomic furniture",
    "Abstract geometric patterns with vibrant colors and symmetry",
    "Cute cartoon animal character in a magical forest setting",
    "Vintage steampunk mechanical device with brass and copper details",
    "Minimalist product showcase on clean white background",
    "Watercolor painting of a cozy coffee shop with warm atmosphere"
  ];

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
              <span>← Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">N</div>
              <span className="font-semibold text-gray-900">NovagenAI Image Generator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Prompt Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wand2Icon className="w-6 h-6 mr-2 text-blue-600" />
                Create Your Image
              </h2>
              
              {/* Prompt Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe what you want to create
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A detailed description of the image you want to generate..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Negative Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What to avoid (optional)
                  </label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="Things you don't want in the image (e.g., text, watermarks, low quality)..."
                    className="w-full h-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Style
                  </label>
                  <select
                    value={imageStyle}
                    onChange={(e) => setImageStyle(e.target.value as ImageStyle)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {imageStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {aspectRatios.map(ratio => (
                      <option key={ratio} value={ratio}>{ratio}</option>
                    ))}
                  </select>
                </div>

                {/* Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="standard"
                        checked={quality === 'standard'}
                        onChange={(e) => setQuality(e.target.value as 'standard' | 'hd')}
                        className="mr-2"
                      />
                      <span>Standard</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="hd"
                        checked={quality === 'hd'}
                        onChange={(e) => setQuality(e.target.value as 'standard' | 'hd')}
                        className="mr-2"
                      />
                      <span>HD (4K)</span>
                    </label>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      <span>Generate Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prompt Suggestions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <SparklesIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Prompts
                </h3>
                <div className="space-y-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Result */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ImageIcon className="w-6 h-6 mr-2 text-blue-600" />
                Generated Image
              </h2>
              
              {generatedImage ? (
                <div className="space-y-4">
                  {/* Image Display */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={generatedImage} 
                      alt="Generated image"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>

                  {/* Image Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Image Details</h3>
                    <div className="space-y-1 text-sm">
                      <div><strong>Style:</strong> {imageStyle}</div>
                      <div><strong>Aspect Ratio:</strong> {aspectRatio}</div>
                      <div><strong>Quality:</strong> {quality === 'hd' ? 'HD (4K)' : 'Standard'}</div>
                      <div><strong>Prompt:</strong> {prompt.substring(0, 100)}{prompt.length > 100 ? '...' : ''}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={downloadImage}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setGeneratedImage('');
                        setPrompt('');
                        setNegativePrompt('');
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <span>Create New</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    Your generated image will appear here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Enter a detailed prompt and click "Generate Image" to create your custom image
                  </p>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Generations
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={item.image} 
                        alt={item.prompt}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.prompt}</div>
                        <div className="text-xs text-gray-500">{item.style}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptImageGenerator;
