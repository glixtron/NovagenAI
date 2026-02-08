import React, { useState } from 'react';
import { Slide, AspectRatio } from '../types';
import { RefreshIcon, SparklesIcon, TrashIcon } from './Icons';
import { generateRealImage } from '../services/geminiService';

interface SlidePreviewProps {
  slide: Slide;
  index: number;
  onUpdateSlide: (updatedSlide: Slide) => void;
  onDeleteSlide: (slideId: string) => void;
  aspectRatio: AspectRatio; // Receive global aspect ratio
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ slide, index, onUpdateSlide, onDeleteSlide, aspectRatio }) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleGenerateImage = async () => {
    if (!slide.imagePrompt || isGeneratingImage) return;
    setIsGeneratingImage(true);
    try {
      const base64 = await generateRealImage(slide.imagePrompt, aspectRatio);
      onUpdateSlide({ ...slide, imageUrl: base64 });
    } catch (e) {
      console.error(e);
      alert("Failed to generate image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSlide({ ...slide, title: e.target.value });
  };

  const handleContentChange = (i: number, newValue: string) => {
    const newContent = [...slide.content];
    newContent[i] = newValue;
    onUpdateSlide({ ...slide, content: newContent });
  };

  // Simple Chart Renderer for Preview
  const renderChart = () => {
    if (!slide.chart) return null;
    const { type, values, labels } = slide.chart;
    const maxVal = Math.max(...values);

    return (
      <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-white rounded-lg border border-slate-100 shadow-inner">
        <h4 className="text-[10px] font-bold text-slate-700 mb-2">{slide.chart.title}</h4>
        
        {type === 'bar' && (
           <div className="flex items-end justify-center space-x-2 h-20 w-full px-4">
             {values.map((v, i) => (
               <div key={i} className="flex flex-col items-center flex-1 group relative">
                 <div 
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                    style={{ height: `${(v / maxVal) * 100}%` }}
                 ></div>
                 <span className="text-[8px] text-slate-500 mt-1 truncate w-full text-center">{labels[i]}</span>
                 {/* Tooltip */}
                 <span className="absolute -top-6 bg-slate-800 text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">{v}</span>
               </div>
             ))}
           </div>
        )}

        {type === 'pie' && (
           <div className="relative w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center bg-blue-100 text-[8px] text-blue-800 font-bold">
              Pie Chart
           </div>
        )}
        
        {type === 'line' && (
             <div className="w-full h-20 border-b border-l border-slate-300 flex items-end px-2 relative">
                <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-400">Line Graph Visualization</div>
                {/* Simulated line using bars for simplicity in HTML/CSS preview */}
                 {values.map((v, i) => (
                    <div key={i} className="w-1 bg-indigo-500 mx-auto rounded-full" style={{ height: `${(v / maxVal) * 80}%` }}></div>
                 ))}
             </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 aspect-[16/9] flex flex-col relative group hover:shadow-2xl transition-all duration-300">
      {/* Slide Header */}
      <div className="bg-gradient-to-r from-slate-50 to-white p-3 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
             {index + 1}
           </span>
           <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
             {slide.chart ? 'Data Slide' : slide.imageUrl || slide.imagePrompt ? 'Visual Slide' : 'Content Slide'}
           </span>
        </div>
        <button 
           onClick={() => onDeleteSlide(slide.id)} 
           className="text-slate-300 hover:text-red-500 transition-colors p-1"
           title="Delete Slide"
        >
           <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left Content (Text) */}
        <div className={`flex flex-col overflow-y-auto ${slide.imagePrompt || slide.chart ? 'w-1/2' : 'w-full'}`}>
            <input 
              value={slide.title}
              onChange={handleTitleChange}
              className="text-sm font-bold text-slate-900 mb-3 leading-snug bg-transparent border-b border-transparent hover:border-blue-200 focus:border-blue-500 outline-none w-full transition-colors"
            />
            <ul className="space-y-2 w-full">
            {slide.content.map((point, i) => (
                <li key={i} className="flex items-start text-[10px] text-slate-600 leading-relaxed group/item">
                  <span className="mr-2 mt-1 w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <textarea
                    value={point}
                    onChange={(e) => handleContentChange(i, e.target.value)}
                    className="bg-transparent w-full resize-none border-b border-transparent hover:border-blue-200 focus:border-blue-500 outline-none overflow-hidden"
                    rows={2}
                  />
                </li>
            ))}
            </ul>
        </div>

        {/* Right Content (Visuals) */}
        {(slide.imagePrompt || slide.chart) && (
            <div className="w-1/2 flex flex-col h-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100 relative group/visual">
                {slide.chart ? (
                   renderChart()
                ) : (
                    <div className="w-full h-full relative">
                         {slide.imageUrl ? (
                            <>
                               <img 
                                 src={`data:image/png;base64,${slide.imageUrl}`} 
                                 alt="Generated"
                                 className="w-full h-full object-cover"
                               />
                               <button 
                                 onClick={handleGenerateImage}
                                 className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-md text-white backdrop-blur-sm transition-all opacity-0 group-hover/visual:opacity-100"
                                 title="Regenerate"
                               >
                                 <RefreshIcon className="w-3 h-3" />
                               </button>
                            </>
                         ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                                 <SparklesIcon className="w-6 h-6 text-blue-300 mb-2" />
                                 <p className="text-[9px] text-slate-400 mb-3 line-clamp-3">{slide.imagePrompt}</p>
                                 <button 
                                    onClick={handleGenerateImage}
                                    disabled={isGeneratingImage}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold rounded-md shadow-sm flex items-center transition-all"
                                 >
                                    {isGeneratingImage ? 'Generating...' : <><SparklesIcon className="w-3 h-3 mr-1" /> Generate Image</>}
                                 </button>
                             </div>
                         )}
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Speaker Notes Indicator */}
      {slide.speakerNotes && (
         <div className="absolute bottom-2 left-2">
            <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" title="Has speaker notes"></div>
         </div>
      )}

      {/* Hover Overlay for Notes */}
      {slide.speakerNotes && (
        <div className="absolute inset-x-0 bottom-0 bg-white/95 border-t border-slate-200 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <p className="text-[10px] text-slate-600 font-mono leading-relaxed">
             <span className="font-bold text-slate-800 uppercase text-[9px] mr-2">Notes:</span>
             {slide.speakerNotes}
          </p>
        </div>
      )}
    </div>
  );
};

export default SlidePreview;