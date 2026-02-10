'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Type, Palette, Square, Circle as CircleIcon, Triangle as TriangleIcon, 
  Image as ImageIcon, Download, Upload, Save, Undo, Redo,
  ZoomIn, ZoomOut, Move, Copy, Trash2
} from 'lucide-react';

interface AdvancedEditorProps {
  initialContent?: string;
  onSave?: (content: any) => void;
  onExport?: (format: 'json' | 'png' | 'svg') => void;
}

const AdvancedEditor: React.FC<AdvancedEditorProps> = ({ 
  initialContent = '', 
  onSave, 
  onExport 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'shape' | 'image'>('select');
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'circle' | 'triangle'>('rectangle');
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas with basic drawing
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Set canvas properties
        canvas.width = 800;
        canvas.height = 600;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add initial content if provided
        if (initialContent) {
          // Parse and render initial content
          console.log('Loading initial content:', initialContent);
        }
      }
    }
  }, []);

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Add text to canvas
  const addText = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const text = prompt('Enter text:') || 'Sample Text';
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(text, 100, 100);
  };

  // Add shape to canvas
  const addShape = (shapeType: typeof selectedShape) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#3B82F620';

    switch (shapeType) {
      case 'rectangle':
        ctx.fillRect(150, 150, 100, 60);
        ctx.strokeRect(150, 150, 100, 60);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(200, 200, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(150, 250);
        ctx.lineTo(250, 250);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (ctx && canvas) {
            ctx.drawImage(img, 100, 100, img.width * 0.5, img.height * 0.5);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Zoom functions
  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' ? zoom * 1.1 : zoom / 1.1;
    setZoom(Math.max(0.1, Math.min(5, newZoom)));
  };

  // Export functions
  const exportCanvas = (format: 'json' | 'png' | 'svg') => {
    if (!canvasRef.current) return;

    switch (format) {
      case 'json':
        const canvasData = {
          width: canvasRef.current.width,
          height: canvasRef.current.height,
          dataURL: canvasRef.current.toDataURL()
        };
        onExport?.(JSON.stringify(canvasData) as 'json');
        break;
      case 'png':
        const dataURL = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = dataURL;
        link.click();
        break;
      case 'svg':
        alert('SVG export would require additional implementation');
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen bg-gray-50"
    >
      {/* Toolbar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-lg border-r border-gray-200 p-4 overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">Advanced Editor</h2>
        
        <div className="space-y-4">
          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTool('select')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTool === 'select' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Move className="w-5 h-5 mx-auto" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTool('text')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTool === 'text' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Type className="w-5 h-5 mx-auto" />
              </motion.button>
            </div>
          </div>

          {/* Shapes */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Shapes</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['rectangle', 'circle', 'triangle'] as const).map((shape) => (
                <motion.button
                  key={shape}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedShape(shape);
                    addShape(shape);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedShape === shape 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {shape === 'rectangle' && <Square className="w-4 h-4 mx-auto" />}
                  {shape === 'circle' && <CircleIcon className="w-4 h-4 mx-auto" />}
                  {shape === 'triangle' && <TriangleIcon className="w-4 h-4 mx-auto" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Actions</h3>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addText}
                className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Add Text
              </motion.button>
              
              <label className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Zoom Controls */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Zoom: {Math.round(zoom * 100)}%</h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleZoom('out')}
                className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300"
              >
                <ZoomOut className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleZoom('in')}
                className="p-2 rounded-lg border-2 border-gray-200 hover:border-gray-300"
              >
                <ZoomIn className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Export</h3>
            <div className="space-y-2">
              {(['json', 'png', 'svg'] as const).map((format) => (
                <motion.button
                  key={format}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => exportCanvas(format)}
                  className="w-full p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export as {format.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Canvas Editor</h1>
            <span className="text-sm text-gray-500">Advanced Slide Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSave?.({ canvas: 'data' })}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ transform: `scale(${zoom})` }}
          >
            <canvas
              ref={canvasRef}
              className="border border-gray-300 cursor-crosshair"
              style={{ maxWidth: '100%', height: 'auto' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedEditor;
