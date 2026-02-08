import React, { useState } from 'react';
import { RefreshCcwIcon, DownloadIcon } from './Icons';
import { convertContent } from '../services/geminiService';

const SmartConverter: React.FC = () => {
  const [inputContent, setInputContent] = useState('');
  const [targetFormat, setTargetFormat] = useState('JSON');
  const [result, setResult] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if ((!inputContent && !file) || isConverting) return;
    setIsConverting(true);
    setResult('');
    try {
      let fileData = undefined;
      if (file) {
        const readFile = (f: File): Promise<string> => new Promise((resolve) => {
             const reader = new FileReader();
             reader.onload = () => resolve((reader.result as string).split(',')[1]);
             reader.readAsDataURL(f);
           });
           const base64 = await readFile(file);
           fileData = { base64, mimeType: file.type };
      }

      const output = await convertContent(inputContent, targetFormat, fileData);
      setResult(output);
    } catch (e) {
      console.error(e);
      setResult("Error converting content.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_content.${targetFormat.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Smart Content Converter</h2>
        <p className="text-slate-500">
          Transform code, data structures, or documents into any format instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
        {/* Input Column */}
        <div className="flex flex-col space-y-4">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2">Input Content or File</label>
              
              <input 
                type="file" 
                className="mb-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <textarea 
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                placeholder="Paste your text, JSON, CSV, or code here..."
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
           </div>
        </div>

        {/* Controls & Output Column */}
        <div className="flex flex-col space-y-4">
           {/* Controls */}
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col space-y-4">
              <label className="text-sm font-bold text-slate-700">Target Format</label>
              <div className="flex space-x-2">
                <input 
                   type="text" 
                   value={targetFormat} 
                   onChange={(e) => setTargetFormat(e.target.value)}
                   placeholder="e.g. Python, Markdown, HTML..."
                   className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  {isConverting ? '...' : <><RefreshCcwIcon className="w-4 h-4 mr-2"/> Convert</>}
                </button>
              </div>
           </div>

           {/* Output */}
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col relative group">
              <label className="text-sm font-bold text-slate-700 mb-2 flex justify-between">
                <span>Result</span>
                {result && (
                  <button onClick={handleDownload} className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                    <DownloadIcon className="w-3 h-3 mr-1"/> Download
                  </button>
                )}
              </label>
              <div className="flex-1 w-full p-4 bg-slate-900 text-slate-200 border border-slate-800 rounded-lg overflow-auto font-mono text-sm">
                {result ? <pre>{result}</pre> : <span className="text-slate-600 italic">Waiting for conversion...</span>}
              </div>
           </div>
        </div>
      </div>
      
      <p className="text-xs text-center text-slate-400">
        Note: This tool uses LLM for content transformation. It works best with text-based formats (Code, JSON, CSV, Markdown, etc).
      </p>
    </div>
  );
};

export default SmartConverter;
