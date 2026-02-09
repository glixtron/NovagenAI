import React, { useState } from 'react';
import PresentationForm from './components/PresentationForm';
import SimplePresentationViewer from './components/SimplePresentationViewer';
import SmartConverter from './components/SmartConverter';
import ImageEnhancer from './components/ImageEnhancer';
import PdfEditor from './components/PdfEditor';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import PromptGenerator from './components/PromptGenerator';
import CatalogueGenerator from './components/CatalogueGenerator';
import PromptImageGenerator from './components/PromptImageGenerator';
import LogoDesigner from './components/LogoDesigner';
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
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SlidecraftAI</h1>
              <p className="text-xs text-gray-500">AI Creative Suite</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Gemini 3.5 Powered
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              API Status: Active
            </div>
          </div>
        </div>
      </div>

      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <main className="pl-64">
        {/* View: Homepage */}
        {currentView === 'home' && <Homepage onNavigate={setCurrentView} />}

        {/* View: Presentation Generator */}
        {currentView === 'presentation' && (
          <>
            {appState === AppState.IDLE || appState === AppState.GENERATING || appState === AppState.ERROR ? (
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center space-y-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Slides Generator</h1>
                    <p className="text-gray-600">Create professional presentations with AI-generated content</p>
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
              </div>
            ) : (
              presentationData && (
                <SimplePresentationViewer 
                  presentation={presentationData} 
                  onBack={handleReset} 
                />
              )
            )}
          </>
        )}

        {/* View: Smart Converter */}
        {currentView === 'converter' && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Smart Converter</h1>
                <p className="text-gray-600">Convert code, data, or documents into any format</p>
              </div>
              <SmartConverter />
            </div>
          </div>
        )}

        {/* View: Image Magic */}
        {currentView === 'image-editor' && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Magic Studio</h1>
                <p className="text-gray-600">Enhance images, remove watermarks, and edit visuals with AI</p>
              </div>
              <ImageEnhancer />
            </div>
          </div>
        )}

        {/* View: PDF Editor */}
        {currentView === 'pdf-editor' && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">PDF Editor</h1>
                <p className="text-gray-600">Sign documents, edit text, and use AI to rewrite content</p>
              </div>
              <PdfEditor />
            </div>
          </div>
        )}

        {/* View: Logo Designer */}
        {currentView === 'logo-designer' && <LogoDesigner />}

        {/* View: Prompt Generator */}
        {currentView === 'prompt-generator' && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Prompt Engineer</h1>
                <p className="text-gray-600">Refine simple ideas into detailed, high-quality prompts</p>
              </div>
              <PromptGenerator />
            </div>
          </div>
        )}

        {/* View: Catalogue Generator */}
        {currentView === 'catalogue-generator' && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Catalogue Creator</h1>
                <p className="text-gray-600">Design beautiful product catalogues instantly</p>
              </div>
              <CatalogueGenerator />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;