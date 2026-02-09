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
  Wand2Icon
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
    { id: 'home', label: 'Homepage', icon: HomeIcon },
    { id: 'presentation', label: 'Slides Generator', icon: PresentationIcon },
    { id: 'converter', label: 'Smart Converter', icon: RefreshCcwIcon },
    { id: 'image-editor', label: 'Image Magic', icon: ImageIcon },
    { id: 'pdf-editor', label: 'PDF Editor', icon: EditIcon },
    { id: 'prompt-generator', label: 'Prompt Engineer', icon: LightbulbIcon },
    { id: 'catalogue-generator', label: 'Catalogue Creator', icon: ShoppingBagIcon },
    { id: 'image-generator', label: 'Image Generator', icon: Wand2Icon },
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
    <div className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 pt-4 px-4 hidden md:flex flex-col shadow-sm z-40 overflow-y-auto">
      
      {/* Branding / Logo Section */}
      <div className="mb-8 flex flex-col items-center relative z-50">
        <div 
           className="relative group cursor-pointer mb-3" 
           onClick={() => !isGeneratingLogo && setShowLogoPrompt(true)} 
        >
          {logoUrl ? (
            <img src={logoUrl} alt="NovagenAI Logo" className="w-12 h-12 rounded-lg" />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
          )}
        </div>

        {showLogoPrompt && (
          <div className="absolute bottom-full left-0 mb-2 w-full p-4 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
            <input
              type="text"
              value={logoPrompt}
              onChange={(e) => setLogoPrompt(e.target.value)}
              placeholder="Describe your logo..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={handleGenerateLogo}
                disabled={!logoPrompt}
                className="bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => setShowLogoPrompt(false)}
                className="bg-slate-100 text-slate-500 text-[10px] font-bold py-1.5 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <h1 className="text-xl font-bold text-slate-800 tracking-tight">SlidecraftAI</h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Workspace</p>
      </div>

      {/* Overlay to close popover when clicking outside */}
      {showLogoPrompt && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowLogoPrompt(false)}></div>
      )}

      <div className="space-y-1 pb-8 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as NavView)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto mb-8 px-2">
        <div className="bg-slate-900 rounded-xl p-4 text-white shadow-xl shadow-slate-900/20">
          <p className="text-sm font-bold mb-1">NovagenAI Pro</p>
          <p className="text-xs opacity-60 mb-3">Enterprise Edition</p>
          <div className="flex items-center space-x-2 text-[10px] text-green-400">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;