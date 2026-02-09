import React, { useState } from 'react';
import { UploadIcon, GlobeIcon, PaletteIcon } from './Icons';
import { BrandColors, BrandKit, extractColorsFromImage, extractColorsFromWebsite, generateColorHarmony } from '../services/brandKitService';

interface BrandKitExtractorProps {
  onBrandKitExtracted: (brandKit: BrandKit) => void;
  onClose: () => void;
}

const BrandKitExtractor: React.FC<BrandKitExtractorProps> = ({ onBrandKitExtracted, onClose }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [extractMethod, setExtractMethod] = useState<'upload' | 'url' | 'manual'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target?.result as string;
        setImageUrl(imageUrl);
        
        // Extract colors from the uploaded image
        const colors = await extractColorsFromImage(imageUrl);
        setPrimaryColor(colors.primary);
        
        // Generate brand kit
        const brandKit: BrandKit = {
          colors,
          fonts: {
            heading: 'Inter',
            body: 'Inter'
          },
          logo: imageUrl,
          name: brandName || 'Custom Brand'
        };
        
        onBrandKitExtracted(brandKit);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error extracting colors:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleWebsiteExtraction = async () => {
    if (!websiteUrl) return;

    setIsExtracting(true);
    try {
      const colors = await extractColorsFromWebsite(websiteUrl);
      setPrimaryColor(colors.primary);
      
      const brandKit: BrandKit = {
        colors,
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        name: brandName || 'Website Brand'
      };
      
      onBrandKitExtracted(brandKit);
    } catch (error) {
      console.error('Error extracting from website:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleManualColorSelection = () => {
    const colors = generateColorHarmony(primaryColor);
    
    const brandKit: BrandKit = {
      colors,
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      name: brandName || 'Manual Brand'
    };
    
    onBrandKitExtracted(brandKit);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Auto Brand Kit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Extraction Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extraction Method
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setExtractMethod('upload')}
                className={`p-4 border rounded-lg text-center transition-all ${
                  extractMethod === 'upload'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <UploadIcon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Upload Logo</span>
              </button>
              
              <button
                onClick={() => setExtractMethod('url')}
                className={`p-4 border rounded-lg text-center transition-all ${
                  extractMethod === 'url'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <GlobeIcon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Website URL</span>
              </button>
              
              <button
                onClick={() => setExtractMethod('manual')}
                className={`p-4 border rounded-lg text-center transition-all ${
                  extractMethod === 'manual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <PaletteIcon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Manual Color</span>
              </button>
            </div>
          </div>

          {/* Upload Method */}
          {extractMethod === 'upload' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">
                  Drag and drop your logo here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Choose File
                </label>
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Logo preview"
                    className="h-20 mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* Website URL Method */}
          {extractMethod === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <button
                onClick={handleWebsiteExtraction}
                disabled={!websiteUrl || isExtracting}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExtracting ? 'Extracting...' : 'Extract Colors'}
              </button>
            </div>
          )}

          {/* Manual Color Method */}
          {extractMethod === 'manual' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-20 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Color Preview */}
              <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">Color Harmony Preview</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="text-center">
                    <div
                      className="w-full h-12 rounded mb-1"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-xs text-gray-600">Primary</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-12 rounded mb-1"
                      style={{ backgroundColor: generateColorHarmony(primaryColor).secondary }}
                    />
                    <span className="text-xs text-gray-600">Secondary</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-12 rounded mb-1"
                      style={{ backgroundColor: generateColorHarmony(primaryColor).accent }}
                    />
                    <span className="text-xs text-gray-600">Accent</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-12 rounded mb-1 border border-gray-300"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <span className="text-xs text-gray-600">Background</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-12 rounded mb-1"
                      style={{ backgroundColor: '#1e293b' }}
                    />
                    <span className="text-xs text-gray-600">Text</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleManualColorSelection}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Brand Colors
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandKitExtractor;
