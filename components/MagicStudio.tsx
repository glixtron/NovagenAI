'use client';

import { useState } from 'react';
import { Sparkles, Upload, Download, Wand2, Image as ImageIcon, Palette, Sliders } from 'lucide-react';

interface ImageJob {
  id: string;
  originalUrl: string;
  processedUrl: string;
  effect: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export default function MagicStudio() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedEffect, setSelectedEffect] = useState('enhance');
  const [intensity, setIntensity] = useState(50);
  const [jobs, setJobs] = useState<ImageJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const effects = [
    { id: 'enhance', name: 'Enhance Quality', description: 'Improve image resolution and clarity' },
    { id: 'colorize', name: 'Colorize', description: 'Add color to black and white images' },
    { id: 'remove-bg', name: 'Remove Background', description: 'Remove background from images' },
    { id: 'cartoon', name: 'Cartoon Style', description: 'Convert to cartoon-style artwork' },
    { id: 'vintage', name: 'Vintage Filter', description: 'Apply vintage photo effects' },
    { id: 'blur-bg', name: 'Blur Background', description: 'Blur the background while keeping subject sharp' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const processImage = async () => {
    if (!selectedFile) return;

    const job: ImageJob = {
      id: Date.now().toString(),
      originalUrl: URL.createObjectURL(selectedFile),
      processedUrl: '',
      effect: selectedEffect,
      status: 'pending'
    };

    setJobs([job, ...jobs]);
    setIsProcessing(true);

    try {
      // Update status to processing
      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'processing' }
          : j
      ));

      // Mock processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock processed image (in real app, this would be the actual processed result)
      const processedUrl = `https://image.pollinations.ai/prompt/${selectedEffect}%20effect%20on%20image`;
      
      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'completed', processedUrl }
          : j
      ));
    } catch (error) {
      setJobs(prev => prev.map(j => 
        j.id === job.id 
          ? { ...j, status: 'error' }
          : j
      ));
    } finally {
      setIsProcessing(false);
      setSelectedFile(null);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const getStatusIcon = (status: ImageJob['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>;
      case 'completed':
        return <div className="w-4 h-4 bg-green-500 rounded-full"></div>;
      case 'error':
        return <div className="w-4 h-4 bg-red-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Magic Studio</h1>
        <p className="text-gray-600">Enhance images and media with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upload and Controls */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Click to upload image</p>
                <p className="text-sm text-gray-500">JPG, PNG, GIF up to 10MB</p>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Effect Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Select Effect</h2>
            <div className="space-y-2">
              {effects.map(effect => (
                <button
                  key={effect.id}
                  onClick={() => setSelectedEffect(effect.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedEffect === effect.id
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium text-gray-900">{effect.name}</div>
                  <div className="text-sm text-gray-600">{effect.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Control */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Effect Intensity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-700 w-12">{intensity}%</span>
              </div>
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={processImage}
            disabled={isProcessing || !selectedFile}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Apply Magic Effect
              </>
            )}
          </button>
        </div>

        {/* Middle Column - Preview */}
        <div className="space-y-6">
          {selectedFile && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Original</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Original"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
                
                {jobs.length > 0 && jobs[0].status === 'processing' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Processing...</h3>
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-gray-600">Applying {selectedEffect} effect...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedFile && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Upload an image to see preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - History */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Enhancements</h2>
            {jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.slice(0, 5).map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <span className="text-sm font-medium text-gray-900">
                          {job.effect}
                        </span>
                      </div>
                      {job.status === 'completed' && (
                        <button
                          onClick={() => downloadImage(job.processedUrl, `enhanced-${job.id}.jpg`)}
                          className="text-cyan-600 hover:text-cyan-700"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {job.status === 'completed' && (
                      <img
                        src={job.processedUrl}
                        alt="Processed"
                        className="w-full h-24 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No enhancements yet</p>
                <p className="text-sm text-gray-500">Start by uploading an image</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Use high-quality images for best results</li>
              <li>• Adjust intensity for subtle or dramatic effects</li>
              <li>• Combine multiple effects for unique results</li>
              <li>• Remove background first for better colorization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
