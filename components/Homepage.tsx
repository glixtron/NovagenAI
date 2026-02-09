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
    <div className="max-w-7xl mx-auto space-y-20 animate-fade-in-up pb-20">
      {/* Hero Section */}
      <div className="relative text-center space-y-8 py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 hero-gradient rounded-3xl"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-shimmer">
            <SparklesIcon className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse-slow">
              NovagenAI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your all-in-one AI creative suite. Generate, edit, and convert content with the power of advanced artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('presentation')}
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl btn-hover-glow"
            >
              <RocketIcon className="w-5 h-5 mr-2" />
              Start Creating
            </button>
            <button className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
              <ShieldIcon className="w-5 h-5 mr-2" />
              Explore Features
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {[
          { number: '100K+', label: 'Active Users' },
          { number: '1M+', label: 'AI Generations' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Support' }
        ].map((stat, index) => (
          <div key={index} className="glass rounded-2xl p-6 card-hover-lift">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {stat.number}
            </div>
            <div className="text-slate-600 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Powerful AI Tools at Your Fingertips
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to create, edit, and transform content with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id as NavView)}
                className={`feature-card group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl border ${feature.borderColor} transition-all duration-500 text-left flex flex-col h-full overflow-hidden card-hover`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Background Pattern */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-[120px] transition-opacity group-hover:opacity-10`}></div>
                <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${feature.color} opacity-5 rounded-tr-[100px] transition-opacity group-hover:opacity-10`}></div>
                
                {/* Icon Container */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-lg">
                    {feature.desc}
                  </p>

                  {/* Stats Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    <ZapIcon className="w-3 h-3 mr-1" />
                    {feature.stats}
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-all duration-300">
                    <span>Launch Tool</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative text-center space-y-8 py-20">
        <div className="absolute inset-0 hero-gradient rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Join thousands of professionals using NovagenAI to create amazing content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('presentation')}
              className="btn-primary px-10 py-4 text-lg font-semibold rounded-xl btn-hover-glow"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button className="px-10 py-4 text-lg font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;