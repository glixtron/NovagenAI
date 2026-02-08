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
        // Enhance the user prompt to ensure it is a high-quality logo
        const enhancedPrompt = `High quality vector logo design, ${logoPrompt}, minimalist, professional, white background, flat design, icon only.`;
        // Use 1:1 aspect ratio for logo
        const logoUrl = await generateRealImage(enhancedPrompt, '1:1');
        setLogoUrl(logoUrl);
    } catch (error) {
        console.error('Failed to generate logo:', error);
    } finally {
        setIsGeneratingLogo(false);
    }
  };  setLogoPrompt('');
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 pt-4 px-4 hidden md:flex flex-col shadow-sm z-40 overflow-y-auto">
      
      {/* Branding / Logo Section */}
      <div className="mb-8 flex flex-col items-center relative z-50">
        <div 
           className="relative group cursor-pointer mb-3" 
           onClick={() => !isGeneratingLogo && setShowLogoPrompt(true)} 
           title="Click to Generate AI Logo"
        >
            {logoUrl ? (
                <div className="w-16 h-16 rounded-xl shadow-lg overflow-hidden border border-slate-100 relative">
                    <img src={`data:image/png;base64,${logoUrl}`} alt="SlidecraftAI Logo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <MagicWandIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
            ) : (
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-3xl group-hover:shadow-blue-500/50 transition-all">
                    {isGeneratingLogo ? (
                        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                        <span>S</span>
                    )}
                </div>
            )}
            {!logoUrl && !isGeneratingLogo && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Generate Logo
                </span>
            )}
        </div>
        
        {/* Logo Prompt Popover */}
        {showLogoPrompt && (
          <div className="absolute top-full mt-2 w-60 bg-white border border-slate-200 shadow-xl rounded-xl p-3 z-[60] animate-fade-in-up">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Design Your Logo</h4>
            <textarea
              value={logoPrompt}
              onChange={(e) => setLogoPrompt(e.target.value)}
              placeholder="e.g. A blue geometric fox..."
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg mb-2 focus:border-blue-500 outline-none resize-none"
              rows={2}
              autoFocus
            />
            <div className="flex space-x-2">
               <button 
                 onClick={handleGenerateLogo}
                 disabled={!logoPrompt}
                 className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
               >
                 Create
               </button>
               <button 
                 onClick={() => setShowLogoPrompt(false)}
                 className="px-2 bg-slate-100 text-slate-500 text-[10px] font-bold py-1.5 rounded-lg hover:bg-slate-200"
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
        {navItems.map((item) => {
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
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto mb-8 px-2">
        <div className="bg-slate-900 rounded-xl p-4 text-white shadow-xl shadow-slate-900/20">
          <p className="text-sm font-bold mb-1">SlidecraftAI Pro</p>
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