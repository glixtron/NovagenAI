import React, { useState } from 'react';
import { LightbulbIcon, SparklesIcon, CheckCircleIcon } from './Icons';
import { generateDetailedPrompt } from '../services/geminiService';
import { PromptRequest } from '../types';

const PromptGenerator: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [platform, setPlatform] = useState<PromptRequest['platform']>('Midjourney');
  const [style, setStyle] = useState('Cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!idea) return;
    setIsGenerating(true);
    setCopied(false);
    try {
      const result = await generateDetailedPrompt({ idea, platform, style, aspectRatio });
      setGeneratedPrompt(result);
    } catch (error) {
      console.error(error);
      setGeneratedPrompt("Error generating prompt. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">AI Prompt Engineer</h2>
        <p className="text-slate-500">
          Turn simple ideas into professional image generation prompts for Midjourney, DALL-E, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Input Column */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Idea</label>
                <textarea 
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. A cat floating in space..."
                  className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Midjourney', 'DALL-E', 'Stable Diffusion', 'Gemini'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        platform === p ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Style</label>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option>Cinematic</option>
                  <option>Photorealistic</option>
                  <option>Anime / Manga</option>
                  <option>3D Render</option>
                  <option>Oil Painting</option>
                  <option>Cyberpunk</option>
                  <option>Minimalist</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Aspect Ratio</label>
                <select 
                  value={aspectRatio} 
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option>16:9</option>
                  <option>1:1</option>
                  <option>4:3</option>
                  <option>9:16</option>
                  <option>21:9</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!idea || isGenerating}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-amber-500/20"
              >
                {isGenerating ? (
                   <span className="animate-pulse">Designing...</span>
                ) : (
                  <>
                    <LightbulbIcon className="w-5 h-5 mr-2" />
                    Generate Prompt
                  </>
                )}
              </button>
           </div>
        </div>

        {/* Output Column */}
        <div className="md:col-span-3">
           <div className="bg-slate-900 rounded-2xl shadow-xl h-full flex flex-col overflow-hidden relative group">
              <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
                <span className="text-slate-400 font-mono text-xs">OUTPUT_CONSOLE</span>
                {generatedPrompt && (
                   <button 
                     onClick={handleCopy}
                     className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-full transition-colors flex items-center"
                   >
                     {copied ? <CheckCircleIcon className="w-3 h-3 mr-1 text-green-400" /> : null}
                     {copied ? 'Copied' : 'Copy'}
                   </button>
                )}
              </div>
              <div className="p-8 flex-1 font-mono text-slate-300 leading-relaxed overflow-y-auto">
                 {isGenerating ? (
                   <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
                     <SparklesIcon className="w-8 h-8 animate-spin" />
                     <p>Crafting perfect details...</p>
                   </div>
                 ) : generatedPrompt ? (
                   <p>{generatedPrompt}</p>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-600">
                     <p>Ready to generate.</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
