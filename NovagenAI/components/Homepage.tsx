import React from 'react';
import { NavView } from '../types';
import { PresentationIcon, RefreshCcwIcon, ImageIcon, EditIcon, LightbulbIcon, ShoppingBagIcon, ArrowRightIcon } from './Icons';

interface HomepageProps {
  onNavigate: (view: NavView) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  
  const features = [
    {
      id: 'presentation',
      title: 'Slides Generator',
      desc: 'Create professional presentations with AI-generated content, charts, and visuals.',
      icon: PresentationIcon,
      color: 'bg-blue-50 text-blue-600',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'catalogue-generator',
      title: 'Catalogue Creator',
      desc: 'Design beautiful product catalogues instantly. Edit layouts with natural language.',
      icon: ShoppingBagIcon,
      color: 'bg-pink-50 text-pink-600',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'prompt-generator',
      title: 'Prompt Engineer',
      desc: 'Refine simple ideas into detailed, high-quality prompts for Midjourney or DALL-E.',
      icon: LightbulbIcon,
      color: 'bg-amber-50 text-amber-600',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 'converter',
      title: 'Smart Converter',
      desc: 'Convert code, data, or documents into any format (JSON, Markdown, PDF, etc.).',
      icon: RefreshCcwIcon,
      color: 'bg-green-50 text-green-600',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'image-editor',
      title: 'Magic Studio',
      desc: 'Enhance images, remove watermarks, and edit visuals with AI instructions.',
      icon: ImageIcon,
      color: 'bg-purple-50 text-purple-600',
      gradient: 'from-purple-600 to-violet-600'
    },
    {
      id: 'pdf-editor',
      title: 'PDF Editor',
      desc: 'Sign documents, edit text, and use AI to rewrite content directly in PDFs.',
      icon: EditIcon,
      color: 'bg-slate-100 text-slate-600',
      gradient: 'from-slate-700 to-slate-800'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in-up pb-12">
      <div className="text-center space-y-4 py-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SlidecraftAI</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Your all-in-one AI creative suite. Generate, edit, and convert content with the power of Gemini 3.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id as NavView)}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-[100px] transition-opacity group-hover:opacity-10`}></div>
              
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed mb-6 flex-1">
                {feature.desc}
              </p>

              <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Launch Tool</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;