import React, { useState } from 'react';
import { Wand2Icon, DownloadIcon, SparklesIcon, RefreshCcwIcon } from './Icons';
import { generate4KLogo } from '../services/multiAIService';
import { generate4KLogo } from '../services/multiAIService';

interface LogoDesignerProps {
  onBack: () => void;
}

const LogoDesigner: React.FC<LogoDesignerProps> = ({ onBack }) => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [style, setStyle] = useState<'modern' | 'classic' | 'minimalist' | 'bold' | 'elegant'>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string>('');
  const [history, setHistory] = useState<Array<{company: string, industry: string, style: string, logo: string}>>([]);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 
    'Restaurant', 'Real Estate', 'Consulting', 'Manufacturing',
    'Entertainment', 'Fashion', 'Sports', 'Travel', 'Automotive'
  ];

  const styles = [
    { value: 'modern', label: 'Modern', description: 'Cutting-edge, contemporary design' },
    { value: 'classic', label: 'Classic', description: 'Timeless, traditional design' },
    { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple design' },
    { value: 'bold', label: 'Bold', description: 'Strong, impactful design' },
    { value: 'elegant', label: 'Elegant', description: 'Sophisticated, refined design' }
  ];

  const generateLogo = async () => {
    if (!companyName.trim() || !industry.trim()) return;

    setIsGenerating(true);
    try {
      console.log('🏢 Generating 4K logo...');
      
      const logoUrl = await generate4KLogo(companyName, industry, style);
      setGeneratedLogo(logoUrl);
      
      // Add to history
      setHistory(prev => [{
        company: companyName,
        industry: industry,
        style: style,
        logo: logoUrl
      }, ...prev.slice(0, 9)]); // Keep last 10 logos
      
      console.log('✅ 4K logo generated successfully');
    } catch (error) {
      console.error('❌ Error generating logo:', error);
      alert('Failed to generate logo. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = () => {
    if (!generatedLogo) return;

    try {
      const link = document.createElement('a');
      link.href = generatedLogo;
      link.download = `${companyName.replace(/[^a-z0-9]/gi, '_')}_4K_logo.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Logo downloaded successfully');
    } catch (error) {
      console.error('❌ Error downloading logo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>← Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">N</div>
              <span className="font-semibold text-gray-900">NovagenAI Logo Designer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Logo Configuration */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wand2Icon className="w-6 h-6 mr-2 text-blue-600" />
                Design Your 4K Logo
              </h2>
              
              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an industry...</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map(s => (
                      <label key={s.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value={s.value}
                          checked={style === s.value}
                          onChange={(e) => setStyle(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{s.label}</span>
                        <div className="text-xs text-gray-500">{s.description}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateLogo}
                  disabled={isGenerating || !companyName.trim() || !industry.trim()}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating 4K Logo...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      <span>Generate 4K Logo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Style Suggestions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <SparklesIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Logo Style Examples
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Modern:</strong> Tech companies, startups, innovative brands</div>
                  <div><strong>Classic:</strong> Established brands, luxury goods, professional services</div>
                  <div><strong>Minimalist:</strong> Tech startups, modern brands, clean design</div>
                  <div><strong>Bold:</strong> Sports brands, automotive, energy companies</div>
                  <div><strong>Elegant:</strong> Luxury brands, fashion, consulting firms</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Result */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wand2Icon className="w-6 h-6 mr-2 text-blue-600" />
                Generated 4K Logo
              </h2>
              
              {generatedLogo ? (
                <div className="space-y-4">
                  {/* Logo Display */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={generatedLogo} 
                      alt={`${companyName} logo`}
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>

                  {/* Logo Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Logo Details</h3>
                    <div className="space-y-1 text-sm">
                      <div><strong>Company:</strong> {companyName}</div>
                      <div><strong>Industry:</strong> {industry}</div>
                      <div><strong>Style:</strong> {style}</div>
                      <div><strong>Resolution:</strong> 4K Ultra HD (4096x4096)</div>
                      <div><strong>Format:</strong> PNG with transparency</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={downloadLogo}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download PNG</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setGeneratedLogo('');
                        setCompanyName('');
                        setIndustry('');
                        setStyle('modern');
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCcwIcon className="w-4 h-4" />
                      <span>Create New</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wand2Icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    Your 4K logo will appear here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Enter your company name, select an industry and style, then click "Generate 4K Logo"
                  </p>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Logo Generations
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={item.logo} 
                        alt={`${item.company} logo`}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.company}</div>
                        <div className="text-xs text-gray-500">{item.industry} • {item.style}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDesigner;
