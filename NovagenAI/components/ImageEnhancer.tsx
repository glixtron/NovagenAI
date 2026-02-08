import React, { useState } from 'react';
import { MagicWandIcon, UploadIcon, DownloadIcon, LayersIcon } from './Icons';
import { enhanceImage, generateImageVariation } from '../services/geminiService';

const ImageEnhancer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Remove watermark and improve quality');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Variations state
  const [variations, setVariations] = useState<string[]>([]);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      setResultImage(null);
      setVariations([]);
    }
  };

  const handleEnhance = async () => {
    if (!selectedFile || isProcessing) return;
    setIsProcessing(true);
    setVariations([]); // Reset variations when enhancing new image
    
    try {
      const base64 = imagePreview?.split(',')[1];
      if (!base64) return;

      const result = await enhanceImage(base64, selectedFile.type, prompt);
      
      setResultImage(`data:${result.mimeType};base64,${result.base64}`);
    } catch (e) {
      console.error(e);
      alert("Failed to enhance image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!resultImage || isGeneratingVariations) return;
    setIsGeneratingVariations(true);
    
    try {
        const base64 = resultImage.split(',')[1];
        const mimeType = resultImage.split(';')[0].split(':')[1];
        
        // Generate 3 variations in parallel
        const promises = [1, 2, 3].map(() => generateImageVariation(base64, mimeType, prompt));
        const results = await Promise.all(promises);
        
        setVariations(results.map(b64 => `data:${mimeType};base64,${b64}`));
    } catch (e) {
        console.error("Failed to generate variations", e);
        alert("Could not generate variations.");
    } finally {
        setIsGeneratingVariations(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Magic Image Studio</h2>
        <p className="text-slate-500">
          Remove watermarks, enhance quality, or edit images using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Input Side */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700">Original</div>
            <div className="aspect-square bg-slate-100 relative flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Original" className="w-full h-full object-contain" />
              ) : (
                <label className="cursor-pointer flex flex-col items-center p-8 text-slate-400 hover:text-blue-500 transition-colors">
                  <UploadIcon className="w-12 h-12 mb-2" />
                  <span className="font-medium">Upload Image</span>
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">Magic Instruction</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleEnhance}
                disabled={!selectedFile || isProcessing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : <><MagicWandIcon className="w-4 h-4 mr-2" /> Magic</>}
              </button>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 flex justify-between items-center">
              <span>Result</span>
              <div className="flex items-center space-x-2">
                 {resultImage && (
                    <button 
                        onClick={handleGenerateVariations} 
                        disabled={isGeneratingVariations}
                        className="text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded text-xs font-bold flex items-center transition-colors disabled:opacity-50"
                        title="Generate variations based on this result"
                    >
                        {isGeneratingVariations ? 'Generating...' : <><LayersIcon className="w-3 h-3 mr-1" /> Variations</>}
                    </button>
                 )}
                 {resultImage && (
                    <a href={resultImage} download="enhanced_image.png" className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold flex items-center transition-colors">
                      <DownloadIcon className="w-3 h-3 mr-1" /> Save
                    </a>
                 )}
              </div>
            </div>
            <div className="aspect-square bg-slate-900/5 relative flex items-center justify-center flex-1">
               {isProcessing ? (
                 <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-slate-500 text-sm">AI is working on pixels...</p>
                 </div>
               ) : resultImage ? (
                 <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
               ) : (
                 <p className="text-slate-400 text-sm">Enhanced result will appear here</p>
               )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Variations Section */}
      {variations.length > 0 && (
         <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
                <LayersIcon className="w-5 h-5 mr-2 text-purple-500" />
                Variations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {variations.map((src, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 group relative">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                             <img src={src} alt={`Variation ${i+1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <a 
                           href={src} 
                           download={`variation_${i+1}.png`} 
                           className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-lg shadow-md text-slate-700 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <DownloadIcon className="w-4 h-4" />
                        </a>
                    </div>
                ))}
            </div>
         </div>
      )}

    </div>
  );
};

export default ImageEnhancer;