import React, { useState } from 'react';
import PresentationForm from './components/PresentationForm';
import PresentationViewer from './components/PresentationViewer';
import SmartConverter from './components/SmartConverter';
import ImageEnhancer from './components/ImageEnhancer';
import PdfEditor from './components/PdfEditor';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import PromptGenerator from './components/PromptGenerator';
import CatalogueGenerator from './components/CatalogueGenerator';
import { PresentationData, AppState, PresentationConfig, NavView } from './types';
import { generatePresentationContent } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [presentationData, setPresentationData] = useState<PresentationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePresentation = async (config: PresentationConfig) => {
    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const data = await generatePresentationContent(config);
      setPresentationData(data);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate presentation. Please check your API key and try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setPresentationData(null);
    setAppState(AppState.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="border-b border-white/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 pl-0 md:pl-64 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:hidden">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
          </div>
          <div 
             className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 cursor-pointer"
             onClick={() => setCurrentView('home')}
          >
             SlidecraftAI
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-md border border-green-200">
                Gemini 3 Powered
             </span>
          </div>
        </div>
      </nav>

      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <main className="md:pl-64 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* View: Homepage */}
          {currentView === 'home' && <Homepage onNavigate={setCurrentView} />}

          {/* View: Presentation Generator */}
          {currentView === 'presentation' && (
             <>
                {appState === AppState.IDLE || appState === AppState.GENERATING || appState === AppState.ERROR ? (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in-up">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Slides <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Generator</span>
                      </h1>
                    </div>

                    <PresentationForm 
                      onGenerate={handleGeneratePresentation} 
                      isGenerating={appState === AppState.GENERATING} 
                    />

                    {error && (
                      <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-center animate-pulse">
                        {error}
                      </div>
                    )}
                  </div>
                ) : (
                  presentationData && (
                    <PresentationViewer 
                      data={presentationData} 
                      onReset={handleReset} 
                    />
                  )
                )}
             </>
          )}

          {/* View: Smart Converter */}
          {currentView === 'converter' && <SmartConverter />}

          {/* View: Image Magic */}
          {currentView === 'image-editor' && <ImageEnhancer />}

          {/* View: PDF Editor */}
          {currentView === 'pdf-editor' && <PdfEditor />}

          {/* View: Prompt Generator */}
          {currentView === 'prompt-generator' && <PromptGenerator />}

          {/* View: Catalogue Generator */}
          {currentView === 'catalogue-generator' && <CatalogueGenerator />}

        </div>
      </main>
    </div>
  );
};

export default App;