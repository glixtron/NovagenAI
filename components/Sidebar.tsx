import React, { useState } from 'react';
import { NavView } from '../types';
import { 
  HomeIcon, 
  PresentationIcon, 
  RefreshCcwIcon, 
  ImageIcon, 
  EditIcon, 
  LightbulbIcon, 
  ShoppingBagIcon,
  Wand2Icon,
  SparklesIcon
} from './Icons';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [showLogoPrompt, setShowLogoPrompt] = useState(false);
  const [logoPrompt, setLogoPrompt] = useState('');

  const navigation = [
    { id: 'home', label: 'Dashboard', icon: HomeIcon },
    { id: 'presentation', label: 'Slides Generator', icon: PresentationIcon },
    { id: 'converter', label: 'Smart Converter', icon: RefreshCcwIcon },
    { id: 'image-editor', label: 'Magic Studio', icon: ImageIcon },
    { id: 'pdf-editor', label: 'PDF Editor', icon: EditIcon },
    { id: 'prompt-generator', label: 'Prompt Engineer', icon: LightbulbIcon },
    { id: 'catalogue-generator', label: 'Catalogue Creator', icon: ShoppingBagIcon },
    { id: 'logo-designer', label: 'Logo Designer', icon: Wand2Icon }
  ];

  const handleGenerateLogo = async () => {
    if (isGeneratingLogo || !logoPrompt) return;
    setIsGeneratingLogo(true);
    setShowLogoPrompt(false);
    try {
      // This would use the multi-AI service for logo generation
      console.log(' Logo generation requested');
      // For now, we'll just show a success message
      setTimeout(() => {
        setIsGeneratingLogo(false);
        setLogoUrl('/api/placeholder-logo.png');
      }, 2000);
    } catch (error) {
      console.error('Failed to generate logo:', error);
      setIsGeneratingLogo(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            N
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">SlidecraftAI</h1>
            <p className="text-xs text-gray-500">AI Creative Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as NavView)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Card */}
      <div className="p-3 border-t border-gray-200">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <SparklesIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold">SlidecraftAI Pro</span>
          </div>
          <div className="text-xs text-gray-300 mb-2">
            Unlock advanced features
          </div>
          <button
            onClick={() => setShowLogoPrompt(true)}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-md py-1.5 text-xs font-medium transition-colors duration-200"
          >
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Logo Generation Modal */}
      {showLogoPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 max-w-md w-full">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Generate Logo</h3>
            <textarea
              value={logoPrompt}
              onChange={(e) => setLogoPrompt(e.target.value)}
              placeholder="Describe your logo design..."
              className="w-full p-2.5 border border-gray-300 rounded-lg resize-none h-24 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => setShowLogoPrompt(false)}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateLogo}
                disabled={isGeneratingLogo || !logoPrompt}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
              >
                {isGeneratingLogo ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;