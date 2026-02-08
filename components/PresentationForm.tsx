import React, { useState, useRef } from 'react';
import { UploadIcon, FileTextIcon, SparklesIcon, CheckCircleIcon } from './Icons';
import { PresentationConfig, ThemeId, AspectRatio, ImageStyle } from '../types';

interface PresentationFormProps {
  onGenerate: (config: PresentationConfig) => void;
  isGenerating: boolean;
}

const THEMES: { id: ThemeId; name: string; color: string }[] = [
  { id: 'modern', name: 'Modern Blue', color: 'bg-blue-600' },
  { id: 'corporate', name: 'Corporate Grey', color: 'bg-slate-700' },
  { id: 'minimal', name: 'Minimal B&W', color: 'bg-black' },
  { id: 'vibrant', name: 'Vibrant Rose', color: 'bg-rose-600' },
  { id: 'dark', name: 'Dark Mode', color: 'bg-slate-900' },
];

const ASPECT_RATIOS: AspectRatio[] = ['16:9', '1:1', '4:3', '3:4', '9:16'];
const IMAGE_STYLES: ImageStyle[] = ['Photorealistic', 'Cartoon', 'Watercolor', 'Cyberpunk', 'Sketch', '3D Render', 'Minimalist', 'Abstract'];

const PresentationForm: React.FC<PresentationFormProps> = ({ onGenerate, isGenerating }) => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('General Audience');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState(10);
  const [theme, setTheme] = useState<ThemeId>('modern');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [imageStyle, setImageStyle] = useState<ImageStyle>('Photorealistic');
  const [enableAnimations, setEnableAnimations] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic && !file) return;

    let fileData = undefined;
    if (file) {
       const readFile = (f: File): Promise<string> => new Promise((resolve) => {
         const reader = new FileReader();
         reader.onload = () => resolve((reader.result as string).split(',')[1]);
         reader.readAsDataURL(f);
       });
       const base64 = await readFile(file);
       fileData = { base64, mimeType: file.type };
    }

    onGenerate({
      topic,
      fileData,
      audience,
      tone,
      length,
      theme,
      aspectRatio,
      imageStyle,
      enableAnimations
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 transition-all">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Design Your Presentation</h2>
        <p className="text-slate-500">
          Customize the content, style, and visuals for your slide deck.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Main Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-bold text-slate-700 mb-2">
              Topic / Title
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The Future of AI in Healthcare, Q3 Financial Report..."
              className="w-full pl-5 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Tone</label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
              >
                <option>Professional</option>
                <option>Creative</option>
                <option>Academic</option>
                <option>Persuasive</option>
                <option>Fun & Energetic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Audience</label>
              <select 
                value={audience} 
                onChange={(e) => setAudience(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
              >
                <option>General Audience</option>
                <option>Executives</option>
                <option>Students</option>
                <option>Investors</option>
                <option>Technical Team</option>
              </select>
            </div>
             <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2 flex justify-between">
                <span>Length</span>
                <span className="text-blue-600">{length} Slides</span>
              </label>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="1"
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                 <span>Brief</span>
                 <span>Extensive (50)</span>
              </div>
            </div>
        </div>

        {/* Image Generation Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Image Style</label>
              <select 
                value={imageStyle} 
                onChange={(e) => setImageStyle(e.target.value as ImageStyle)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
              >
                {IMAGE_STYLES.map(style => <option key={style}>{style}</option>)}
              </select>
            </div>
            <div className="space-y-4">
              <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Image Ratio</label>
                  <select 
                    value={aspectRatio} 
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                  >
                    {ASPECT_RATIOS.map(ratio => <option key={ratio}>{ratio}</option>)}
                  </select>
              </div>
              
              <div className="flex items-center space-x-3 pt-2">
                 <button
                    type="button"
                    onClick={() => setEnableAnimations(!enableAnimations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enableAnimations ? 'bg-blue-600' : 'bg-slate-300'}`}
                 >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${enableAnimations ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
                 <span className="text-sm font-medium text-slate-700 cursor-pointer" onClick={() => setEnableAnimations(!enableAnimations)}>
                    Enable PPT Animations
                 </span>
              </div>
            </div>
        </div>

        {/* Theme Selection */}
        <div>
           <label className="block text-xs font-bold uppercase text-slate-400 mb-4">Visual Theme</label>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-center space-y-2 ${
                    theme === t.id 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-transparent bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-full h-12 rounded-lg shadow-sm ${t.color}`}></div>
                  <span className={`text-xs font-medium ${theme === t.id ? 'text-blue-700' : 'text-slate-600'}`}>{t.name}</span>
                  {theme === t.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
           </div>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs font-bold text-slate-400 uppercase tracking-wider">Additional Context</span>
          </div>
        </div>

        {/* File Upload */}
        <div>
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-row items-center justify-center space-x-4 cursor-pointer transition-colors hover:bg-slate-50 hover:border-blue-400 group ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="p-3 bg-blue-50 rounded-full group-hover:scale-110 transition-transform">
                <UploadIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-700">Attach Document (Optional)</p>
                <p className="text-xs text-slate-400">PDF, TXT, MD to extract insights from.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileTextIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={clearFile}
                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                disabled={isGenerating}
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.txt,.md"
            className="hidden"
            disabled={isGenerating}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || (!topic && !file)}
          className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] ${
            isGenerating || (!topic && !file)
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          {isGenerating ? (
            <>
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing & Designing...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Generate Presentation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PresentationForm;