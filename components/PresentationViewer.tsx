import React, { useState, useEffect, useCallback } from 'react';
import { PresentationData, Slide } from '../types';
import SlidePreview from './SlidePreview';
import { DownloadIcon, RefreshIcon, SparklesIcon, UndoIcon, InfoIcon, TrashIcon } from './Icons';
import { exportToPPTX } from '../services/pptxService';

interface PresentationViewerProps {
  data: PresentationData;
  onReset: () => void;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ data: initialData, onReset }) => {
  const [data, setData] = useState<PresentationData>(initialData);
  const [history, setHistory] = useState<PresentationData[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  // Sync initial data if it changes drastically (new generation)
  useEffect(() => {
    setData(initialData);
    setHistory([]);
  }, [initialData]);

  const addToHistory = (currentData: PresentationData) => {
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(currentData))]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setData(previousState);
  };

  const updateSlide = (updatedSlide: Slide) => {
    addToHistory(data);
    const newSlides = data.slides.map(s => s.id === updatedSlide.id ? updatedSlide : s);
    setData({ ...data, slides: newSlides });
  };

  const deleteSlide = (slideId: string) => {
    addToHistory(data);
    const newSlides = data.slides.filter(s => s.id !== slideId);
    setData({ ...data, slides: newSlides });
  };

  const handleDownload = () => {
    exportToPPTX(data);
  };

  // Keyboard shortcut for Undo (Ctrl/Cmd + Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  const totalVisuals = data.slides.filter(s => s.imagePrompt && !s.chart).length;
  const generatedVisuals = data.slides.filter(s => s.imageUrl).length;
  const progress = totalVisuals > 0 ? Math.round((generatedVisuals / totalVisuals) * 100) : 100;

  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
      
      {/* Instructions Banner */}
      {showInstructions && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start justify-between">
           <div className="flex items-start space-x-3">
              <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                 <p className="font-bold mb-1">Editing Instructions:</p>
                 <ul className="list-disc list-inside space-y-1 opacity-80">
                    <li>Click on any <span className="font-bold">Title</span> or <span className="font-bold">Text</span> to edit it directly.</li>
                    <li>Click the <span className="font-bold">Delete Icon</span> on a slide to remove it.</li>
                    <li>Click <span className="font-bold">Generate Image</span> to create AI visuals for that slide.</li>
                    <li>Use <span className="font-bold">Undo</span> button to revert any changes.</li>
                 </ul>
              </div>
           </div>
           <button onClick={() => setShowInstructions(false)} className="text-blue-400 hover:text-blue-600 text-xs font-bold">Dismiss</button>
        </div>
      )}

      {/* Header Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-4 z-30 backdrop-blur-xl bg-white/80">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
          
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{data.title}</h2>
            <div className="flex items-center space-x-2 mt-1">
               <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium uppercase tracking-wide">{data.theme} Theme</span>
               <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium uppercase tracking-wide">{data.aspectRatio}</span>
               {progress < 100 && (
                   <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium animate-pulse">
                      {progress}% Images Ready
                   </span>
               )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 justify-end w-full xl:w-auto">
             <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`px-3 py-2.5 rounded-xl font-medium transition-colors flex items-center text-sm ${history.length === 0 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              title="Undo (Ctrl+Z)"
            >
              <UndoIcon className="w-4 h-4 mr-2" />
              Undo
            </button>

            <div className="h-8 w-px bg-slate-200 hidden md:block mx-1"></div>

            <button
              onClick={onReset}
              className="px-4 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors flex items-center text-sm"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Clear All
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center text-sm transform hover:-translate-y-0.5"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export .PPTX
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.slides.map((slide, index) => (
          <SlidePreview 
            key={slide.id} 
            slide={slide} 
            index={index} 
            onUpdateSlide={updateSlide}
            onDeleteSlide={deleteSlide}
            aspectRatio={data.aspectRatio} // Pass down global setting
          />
        ))}
      </div>
      
      {/* Footer Hint */}
      {totalVisuals > generatedVisuals && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center space-x-3 text-sm animate-bounce-subtle pointer-events-none">
           <SparklesIcon className="w-4 h-4 text-yellow-400" />
           <span>Tip: Click "Generate Image" on slides to create unique {data.imageStyle} visuals before exporting.</span>
        </div>
      )}
    </div>
  );
};

export default PresentationViewer;