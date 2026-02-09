import React from 'react';
import { NavView } from '../types';
import { PresentationIcon, RefreshCcwIcon, ImageIcon, EditIcon, LightbulbIcon, ShoppingBagIcon, ArrowRightIcon, SparklesIcon, ZapIcon, ShieldIcon, RocketIcon } from './Icons';

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
      color: 'from-blue-600 to-indigo-600',
      bgGradient: 'from-blue-50 via-blue-100 to-indigo-50',
      borderColor: 'border-blue-200',
      stats: '10K+ Presentations'
    },
    {
      id: 'catalogue-generator',
      title: 'Catalogue Creator',
      desc: 'Design beautiful product catalogues instantly. Edit layouts with natural language.',
      icon: ShoppingBagIcon,
      color: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 via-pink-100 to-rose-50',
      borderColor: 'border-pink-200',
      stats: '5K+ Catalogues'
    },
    {
      id: 'prompt-generator',
      title: 'Prompt Engineer',
      desc: 'Refine simple ideas into detailed, high-quality prompts for Midjourney or DALL-E.',
      icon: LightbulbIcon,
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 via-amber-100 to-orange-50',
      borderColor: 'border-amber-200',
      stats: '50K+ Prompts'
    },
    {
      id: 'converter',
      title: 'Smart Converter',
      desc: 'Convert code, data, or documents into any format (JSON, Markdown, PDF, etc.).',
      icon: RefreshCcwIcon,
      color: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 via-emerald-100 to-teal-50',
      borderColor: 'border-emerald-200',
      stats: '25K+ Conversions'
    },
    {
      id: 'image-editor',
      title: 'Magic Studio',
      desc: 'Enhance images, remove watermarks, and edit visuals with AI instructions.',
      icon: ImageIcon,
      color: 'from-purple-600 to-violet-600',
      bgGradient: 'from-purple-50 via-purple-100 to-violet-50',
      borderColor: 'border-purple-200',
      stats: '15K+ Images'
    },
    {
      id: 'pdf-editor',
      title: 'PDF Editor',
      desc: 'Sign documents, edit text, and use AI to rewrite content directly in PDFs.',
      icon: EditIcon,
      color: 'from-slate-700 to-slate-800',
      bgGradient: 'from-slate-50 via-slate-100 to-slate-50',
      borderColor: 'border-slate-200',
      stats: '8K+ Documents'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - Bento Grid */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what you can do today.</p>
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

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => onNavigate(feature.id as NavView)}
                  className="group bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 text-left relative overflow-hidden"
                >
                  {/* Decorative Blob */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-xl transition-opacity group-hover:opacity-20`}></div>
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.desc}
                    </p>

                    {/* Stats Badge */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.color} text-white mb-4`}>
                      <ZapIcon className="w-3 h-3 mr-1" />
                      {feature.stats}
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-all duration-300">
                      <span>Launch Tool →</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;