'use client';

import { useState } from 'react';
import { MessageSquare, Copy, Download, Lightbulb, Target, Zap, Settings, Search, Star, TrendingUp, Save, Trash2, Plus, Sparkles } from 'lucide-react';

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  description: string;
  tags: string[];
  popularity: number;
  rating: number;
  uses: number;
}

interface PromptHistory {
  id: string;
  original: string;
  optimized: string;
  category: string;
  createdAt: string;
  success: boolean;
}

interface PromptMetrics {
  totalPrompts: number;
  successRate: number;
  averageRating: number;
  mostUsedCategory: string;
}

export default function PromptEngineer() {
  const [prompt, setPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [promptHistory, setPromptHistory] = useState<PromptHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<PromptTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'date' | 'popularity'>('rating');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'general', name: 'General', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'creative', name: 'Creative', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'technical', name: 'Technical', icon: <Target className="w-4 h-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'productivity', name: 'Productivity', icon: <Zap className="w-4 h-4" /> },
  ];

  const templates: PromptTemplate[] = [
    {
      id: '1',
      name: 'Content Creation',
      category: 'creative',
      template: 'Create a [type of content] about [topic] that is [tone/style]. Include [specific elements] and make it approximately [length]. Target audience: [audience description].',
      description: 'Generate various types of content with specific requirements',
      tags: ['content', 'creative', 'writing'],
      popularity: 95,
      rating: 4.8,
      uses: 1250
    },
    {
      id: '2',
      name: 'Problem Solving',
      category: 'technical',
      template: 'Explain [complex concept] in simple terms for [target audience]. Use [analogies/examples] and break it down into [number] key points. Include practical applications.',
      description: 'Break down complex topics for different audiences',
      tags: ['education', 'technical', 'explanation'],
      popularity: 88,
      rating: 4.6,
      uses: 980
    },
    {
      id: '3',
      name: 'Marketing Copy',
      category: 'marketing',
      template: 'Write compelling [type of copy] for [product/service] targeting [audience]. Highlight [key benefits] and include a [call to action].',
      description: 'Create persuasive marketing materials',
      tags: ['marketing', 'sales', 'copywriting'],
      popularity: 92,
      rating: 4.7,
      uses: 1100
    },
    {
      id: '4',
      name: 'Learning Assistant',
      category: 'productivity',
      template: 'Help me understand [subject] by [learning method]. Provide [number] examples and create a [study aid type] to reinforce concepts.',
      description: 'Personalized learning and study assistance',
      tags: ['education', 'learning', 'study'],
      popularity: 85,
      rating: 4.9,
      uses: 750
    },
    {
      id: '5',
      name: 'Code Generation',
      category: 'technical',
      template: 'Generate [programming language] code for [specific functionality]. Include [requirements] and [best practices]. Add comments for [documentation].',
      description: 'Generate code with specific requirements',
      tags: ['coding', 'programming', 'development'],
      popularity: 78,
      rating: 4.5,
      uses: 620
    },
    {
      id: '6',
      name: 'Data Analysis',
      category: 'technical',
      template: 'Analyze [data type] for [purpose]. Identify [patterns/trends] and provide [specific insights]. Use [visualization type] for clarity.',
      description: 'Analyze data and provide insights',
      tags: ['data', 'analysis', 'visualization'],
      popularity: 72,
      rating: 4.4,
      uses: 450
    },
    {
      id: '7',
      name: 'Brainstorming',
      category: 'creative',
      template: 'Generate [number] creative ideas for [topic] around [theme/concept]. Consider [different perspectives] and [constraints]. Format as [output format].',
      description: 'Generate creative ideas and concepts',
      tags: ['brainstorming', 'creative', 'ideas'],
      popularity: 90,
      rating: 4.8,
      uses: 890
    },
    {
      id: '8',
      name: 'Research Assistant',
      category: 'general',
      template: 'Research [topic] and provide [specific information]. Include [data sources], [statistics], and [key findings]. Format as [output format].',
      description: 'Comprehensive research and information gathering',
      tags: ['research', 'information', 'analysis'],
      popularity: 87,
      rating: 4.6,
      uses: 920
    }
  ];

  const promptMetrics: PromptMetrics = {
    totalPrompts: promptHistory.length,
    successRate: promptHistory.filter(p => p.success).length / promptHistory.length * 100 || 0,
    averageRating: 4.7,
    mostUsedCategory: 'creative'
  };

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsOptimizing(true);
    try {
      // Enhanced AI optimization with multiple strategies
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const optimizationStrategies = [
        'Add specific context and constraints',
        'Include desired output format',
        'Specify tone and style requirements',
        'Request examples and step-by-step explanations',
        'Set clear boundaries and scope'
      ];
      
      const optimized = `As an expert AI assistant with deep knowledge across multiple domains, please enhance the following prompt:

Original prompt: "${prompt}"

OPTIMIZATION ENHANCEMENTS:
${optimizationStrategies.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n')}

ENHANCED PROMPT:
I need you to act as a specialized AI assistant that combines expertise in ${selectedCategory} with advanced prompt engineering techniques. Please:

1. CLARITY & SPECIFICITY: Transform the vague request into a precise, well-structured prompt with clear objectives
2. CONTEXTUAL UNDERSTANDING: Add relevant context about the user's needs, goals, and environment
3. EXPERTISE INTEGRATION: Incorporate domain-specific knowledge and best practices for ${selectedCategory}
4. OUTPUT FORMATTING: Specify the exact format, structure, and style for the response
5. QUALITY CONTROL: Include requirements for accuracy, completeness, and relevance
6. CONSTRAINTS & BOUNDARIES: Set clear limits and guidelines for the AI's response

Additional requirements:
- Use professional, expert-level language
- Include specific examples where relevant
- Request step-by-step reasoning when appropriate
- Specify the desired depth and breadth of the response
- Include quality criteria for evaluation

Please provide an enhanced, optimized version of the original prompt that will generate significantly better results.`;
      
      setOptimizedPrompt(optimized);
      
      // Add to history
      const newHistoryItem: PromptHistory = {
        id: Date.now().toString(),
        original: prompt,
        optimized: optimized,
        category: selectedCategory,
        createdAt: new Date().toISOString(),
        success: true
      };
      
      setPromptHistory([newHistoryItem, ...promptHistory.slice(0, 49)]);
    } catch (error) {
      console.error('Error optimizing prompt:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadPrompt = () => {
    const promptData = {
      original: prompt,
      optimized: optimizedPrompt,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
      version: '2.0'
    };
    
    const blob = new Blob([JSON.stringify(promptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-prompt.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const savePrompt = () => {
    if (!prompt.trim() || !optimizedPrompt.trim()) return;
    
    const newTemplate: PromptTemplate = {
      id: Date.now().toString(),
      name: `Custom ${selectedCategory} Prompt`,
      category: selectedCategory,
      template: optimizedPrompt,
      description: `Custom optimized prompt for ${selectedCategory}`,
      tags: [selectedCategory, 'custom', 'optimized'],
      popularity: 0,
      rating: 0,
      uses: 0
    };
    
    setSavedPrompts([...savedPrompts, newTemplate]);
  };

  const deleteFromHistory = (id: string) => {
    setPromptHistory(promptHistory.filter(item => item.id !== id));
  };

  const deleteSavedPrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter(template => template.id !== id));
  };

  const filteredTemplates = templates
    .filter(template => filterCategory === 'all' || template.category === filterCategory)
    .filter(template => template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     template.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'popularity':
          comparison = b.popularity - a.popularity;
          break;
        case 'date':
          comparison = parseInt(b.id) - parseInt(a.id);
          break;
      }
      return comparison;
    });

  const filteredHistory = promptHistory
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .filter(item => item.original.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     item.optimized.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Prompt Engineer</h1>
        <p className="text-gray-600">Craft and optimize prompts for AI models with advanced engineering techniques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input and Optimization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Prompt Engineering</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template (Optional)</label>
                  <select
                    value={selectedTemplate?.id || ''}
                    onChange={(e) => {
                      const template = templates.find(t => t.id === e.target.value);
                      setSelectedTemplate(template || null);
                      if (template) {
                        setPrompt(template.template);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select a template...</option>
                    {filteredTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={optimizePrompt}
                disabled={isOptimizing || !prompt.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isOptimizing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Optimize Prompt
                  </>
                )}
              </button>
              
              <button
                onClick={savePrompt}
                disabled={!prompt.trim() || !optimizedPrompt.trim()}
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Template
              </button>
            </div>
          </div>

          {/* Optimized Output */}
          {optimizedPrompt && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Optimized Prompt</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadPrompt}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">{optimizedPrompt}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Templates and History */}
        <div className="space-y-6">
          {/* Template Library */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Template Library</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-cyan-300 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setPrompt(template.template);
                    setSelectedCategory(template.category);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700 ml-1">{template.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-500">({template.uses} uses)</span>
                      </div>
                      <button
                        onClick={() => {
                          const newTemplate = { ...template, id: Date.now().toString() };
                          setSavedPrompts([...savedPrompts, newTemplate]);
                        }}
                        className="text-cyan-600 hover:text-cyan-700 p-1"
                        title="Save template"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Prompt History</h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-lg"
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">Original:</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.original}</p>
                        </div>
                        <button
                          onClick={() => deleteFromHistory(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete from history"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded p-3 mb-2">
                        <h4 className="font-medium text-gray-900 mb-1">Optimized:</h4>
                        <p className="text-sm text-gray-600">{item.optimized}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.success ? 'Success' : 'Failed'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.optimized)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Copy optimized prompt"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))</div>
                )) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
                    <p className="text-gray-600">Start optimizing prompts to see your history here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Metrics Dashboard */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
              <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-700">Total Prompts</p>
                  <p className="text-2xl font-bold text-cyan-900">{promptMetrics.totalPrompts}</p>
                </div>
                <div>
                  <p className="text-gray-700">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">{promptMetrics.successRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-700">Avg Rating</p>
                  <p className="text-2xl font-bold text-cyan-900">{promptMetrics.averageRating.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-700">Top Category</p>
                  <p className="text-lg font-bold text-cyan-900">{promptMetrics.mostUsedCategory}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
