'use client';

import { useState } from 'react';
import { MessageSquare, Copy, Download, Lightbulb, Target, Zap, Settings } from 'lucide-react';

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  description: string;
}

export default function PromptEngineer() {
  const [prompt, setPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'creative', name: 'Creative', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'technical', name: 'Technical', icon: <Settings className="w-4 h-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <Target className="w-4 h-4" /> },
    { id: 'productivity', name: 'Productivity', icon: <Zap className="w-4 h-4" /> },
  ];

  const templates: PromptTemplate[] = [
    {
      id: '1',
      name: 'Content Creation',
      category: 'creative',
      template: 'Create a [type of content] about [topic] that is [tone/style]. Include [specific elements] and make it approximately [length].',
      description: 'Generate various types of content with specific requirements'
    },
    {
      id: '2',
      name: 'Problem Solving',
      category: 'technical',
      template: 'Explain [complex concept] in simple terms for [target audience]. Use [analogies/examples] and break it down into [number] key points.',
      description: 'Break down complex topics for different audiences'
    },
    {
      id: '3',
      name: 'Marketing Copy',
      category: 'marketing',
      template: 'Write compelling [type of copy] for [product/service] targeting [audience]. Highlight [key benefits] and include a [call to action].',
      description: 'Create persuasive marketing materials'
    },
    {
      id: '4',
      name: 'Learning Assistant',
      category: 'productivity',
      template: 'Help me understand [subject] by [learning method]. Provide [number] examples and create a [study aid type] to reinforce the concepts.',
      description: 'Personalized learning and study assistance'
    },
  ];

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsOptimizing(true);
    try {
      // Mock API call - replace with actual AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate prompt optimization
      const optimized = `As an expert AI assistant, please ${prompt.toLowerCase()}. 
      
Please provide:
1. Clear and comprehensive response
2. Structured format with headings
3. Practical examples where applicable
4. Actionable insights or next steps

Context: This request is for ${selectedCategory} purposes.
Tone: Professional and helpful
Length: Detailed but concise`;
      
      setOptimizedPrompt(optimized);
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
      createdAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(promptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-prompt.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const useTemplate = (template: PromptTemplate) => {
    setPrompt(template.template);
    setSelectedCategory(template.category);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Engineer</h1>
        <p className="text-gray-600">Craft perfect prompts for AI models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input and Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Select Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Your Prompt</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={optimizePrompt}
                disabled={isOptimizing || !prompt.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                onClick={() => copyToClipboard(prompt)}
                disabled={!prompt.trim()}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Original
              </button>
            </div>
          </div>

          {/* Optimized Output */}
          {optimizedPrompt && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Optimized Prompt</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={downloadPrompt}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
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

        {/* Right Column - Templates */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Prompt Templates</h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-cyan-300 transition-colors cursor-pointer"
                  onClick={() => useTemplate(template)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="bg-gray-50 rounded p-2">
                    <code className="text-xs text-gray-700">{template.template}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
            <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-cyan-800">
              <li>• Be specific about desired output format</li>
              <li>• Include context about your use case</li>
              <li>• Specify tone and style requirements</li>
              <li>• Request examples or step-by-step explanations</li>
              <li>• Set clear constraints and boundaries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
