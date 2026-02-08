import React, { useState, useRef, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import jsPDF from 'jspdf';
import { UploadIcon, PenIcon, TypeIcon, EraserIcon, HandIcon, DownloadIcon, SparklesIcon, UndoIcon } from './Icons';
import { convertContent } from '../services/geminiService';

// Configure PDF.js worker
// Using the CDN worker ensures compatibility without complex Vite worker configuration
GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

type Tool = 'move' | 'text' | 'draw' | 'erase';
type FontStyle = 'Inter' | 'Playfair Display' | 'Roboto Mono' | 'Dancing Script';

interface TextAnnotation {
  id: string;
  x: number;
  y: number;
  text: string;
  font: FontStyle;
  size: number;
  color: string;
}

interface DrawPath {
  points: {x: number, y: number}[];
  color: string;
  width: number;
}

interface EditorHistory {
  texts: TextAnnotation[];
  paths: DrawPath[];
}

const PdfEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [activeTool, setActiveTool] = useState<Tool>('move');
  const [activeFont, setActiveFont] = useState<FontStyle>('Inter');
  const [activeColor, setActiveColor] = useState('#000000');
  
  // State for canvas drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Annotations state
  const [texts, setTexts] = useState<TextAnnotation[]>([]);
  const [paths, setPaths] = useState<DrawPath[]>([]);
  const [currentPath, setCurrentPath] = useState<DrawPath | null>(null);
  
  // History State
  const [history, setHistory] = useState<EditorHistory[]>([]);

  // AI Refine State
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      try {
        const arrayBuffer = await f.arrayBuffer();
        const loadedPdf = await getDocument({ data: arrayBuffer }).promise;
        setPdfDoc(loadedPdf);
        setPageNum(1);
        setTexts([]);
        setPaths([]);
        setHistory([]);
      } catch (error) {
        console.error("Error loading PDF:", error);
        alert("Failed to load PDF file. Please try another file.");
      }
    }
  };

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    renderPage(pageNum);
  }, [pdfDoc, pageNum, scale]);

  const renderPage = async (num: number) => {
    if (!pdfDoc || !canvasRef.current) return;
    try {
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        // Render PDF background
        await page.render(renderContext).promise;

        // Draw stored paths (Signatures/Whiteouts)
        paths.forEach(path => {
           context.beginPath();
           context.strokeStyle = path.color;
           context.lineWidth = path.width;
           context.lineCap = 'round';
           context.lineJoin = 'round';
           if (path.points.length > 0) {
              context.moveTo(path.points[0].x, path.points[0].y);
              path.points.forEach(p => context.lineTo(p.x, p.y));
           }
           context.stroke();
        });

        // Draw current path if drawing
        if (currentPath) {
           context.beginPath();
           context.strokeStyle = currentPath.color;
           context.lineWidth = currentPath.width;
           context.lineCap = 'round';
           context.lineJoin = 'round';
           if (currentPath.points.length > 0) {
              context.moveTo(currentPath.points[0].x, currentPath.points[0].y);
              currentPath.points.forEach(p => context.lineTo(p.x, p.y));
           }
           context.stroke();
        }
      }
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  // Re-render canvas when paths change to show drawings
  useEffect(() => {
     if(pdfDoc) renderPage(pageNum);
  }, [paths, currentPath]);

  // --- History Management ---
  const pushHistory = () => {
    setHistory(prev => [...prev, { texts: JSON.parse(JSON.stringify(texts)), paths: JSON.parse(JSON.stringify(paths)) }]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevState = history[history.length - 1];
    setTexts(prevState.texts);
    setPaths(prevState.paths);
    setHistory(prev => prev.slice(0, -1));
  };

  // --- Interaction Handlers ---

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e);

    if (activeTool === 'text') {
       pushHistory();
       const newText: TextAnnotation = {
         id: Date.now().toString(),
         x,
         y,
         text: 'Click to edit',
         font: activeFont,
         size: 16 * scale,
         color: activeColor
       };
       setTexts([...texts, newText]);
       setActiveTool('move'); // Switch to move to edit the text
       setSelectedTextId(newText.id);
       return;
    }

    if (activeTool === 'draw' || activeTool === 'erase') {
      setIsDrawing(true);
      setCurrentPath({
        points: [{ x, y }],
        color: activeTool === 'erase' ? '#FFFFFF' : activeColor, // White for eraser
        width: activeTool === 'erase' ? 20 : 2
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentPath) return;
    const { x, y } = getCanvasCoordinates(e);
    setCurrentPath(prev => prev ? { ...prev, points: [...prev.points, { x, y }] } : null);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath) {
      pushHistory();
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath(null);
      setIsDrawing(false);
    }
  };

  const updateText = (id: string, newText: string) => {
    setTexts(texts.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const handleTextFocus = () => {
      pushHistory();
  };

  // --- Features ---

  const handleTextRefine = async () => {
    if (!selectedTextId) return;
    const textObj = texts.find(t => t.id === selectedTextId);
    if (!textObj) return;

    pushHistory();
    setIsRefining(true);
    try {
      const refined = await convertContent(textObj.text, "Professional Business Language", undefined);
      // Clean up quotes if LLM adds them
      const cleanRefined = refined.replace(/^"|"$/g, '').trim();
      
      setTexts(texts.map(t => t.id === selectedTextId ? { ...t, text: cleanRefined } : t));
    } catch (e) {
      console.error(e);
      alert("AI Refinement failed.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleDeleteText = (id: string) => {
      pushHistory();
      setTexts(texts.filter(t => t.id !== id));
      setSelectedTextId(null);
  };

  const handleSavePdf = async () => {
    if (!canvasRef.current) return;
    await renderPage(pageNum); 
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    texts.forEach(t => {
       ctx.font = `${t.size}px "${t.font}"`;
       ctx.fillStyle = t.color;
       ctx.fillText(t.text, t.x, t.y + t.size);
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    // @ts-ignore
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'l' : 'p',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('edited_document.pdf');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in-up pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">PDF Editor & Sign</h2>
          <p className="text-xs text-slate-500">Edit text, sign documents, and fix grammar with AI.</p>
        </div>
        <div className="flex gap-3">
             {pdfDoc && (
                <button 
                    onClick={handleUndo} 
                    disabled={history.length === 0}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${history.length === 0 ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                >
                    <UndoIcon className="w-4 h-4 mr-2" /> Undo
                </button>
             )}
             <label className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                <UploadIcon className="w-4 h-4 mr-2" />
                Upload PDF
                <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
             </label>
             {pdfDoc && (
               <button onClick={handleSavePdf} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                 <DownloadIcon className="w-4 h-4 mr-2" />
                 Download
               </button>
             )}
        </div>
      </div>

      {!pdfDoc ? (
        <div className="h-96 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 text-slate-400">
          <UploadIcon className="w-12 h-12 mb-4 opacity-50" />
          <p>Upload a PDF document to start editing</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-16 flex lg:flex-col gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-200 sticky top-24">
             <ToolButton icon={HandIcon} active={activeTool === 'move'} onClick={() => setActiveTool('move')} label="Move" />
             <ToolButton icon={TypeIcon} active={activeTool === 'text'} onClick={() => setActiveTool('text')} label="Text" />
             <ToolButton icon={PenIcon} active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} label="Sign" />
             <ToolButton icon={EraserIcon} active={activeTool === 'erase'} onClick={() => setActiveTool('erase')} label="Whiteout" />
             <div className="h-px bg-slate-200 my-1 lg:w-full lg:h-px w-px h-8"></div>
             <div className="flex flex-col items-center gap-1">
                <input 
                  type="color" 
                  value={activeColor} 
                  onChange={(e) => setActiveColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
             </div>
          </div>

          <div 
             ref={containerRef}
             className="flex-1 bg-slate-500/10 rounded-xl overflow-auto border border-slate-300 relative min-h-[600px] flex justify-center p-8"
             style={{ cursor: activeTool === 'draw' ? 'crosshair' : activeTool === 'text' ? 'text' : 'default' }}
          >
             <div className="relative shadow-2xl">
                 <canvas 
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="bg-white"
                 />
                 {texts.map((text) => (
                    <div
                      key={text.id}
                      className={`absolute`}
                      style={{ 
                          left: text.x, 
                          top: text.y, 
                          color: text.color,
                      }}
                    >
                      <input
                        type="text"
                        value={text.text}
                        onFocus={handleTextFocus}
                        onChange={(e) => updateText(text.id, e.target.value)}
                        onClick={() => setSelectedTextId(text.id)}
                        className="bg-transparent border border-transparent hover:border-blue-300 focus:border-blue-500 focus:bg-white/90 outline-none p-1 rounded transition-colors"
                        style={{ 
                            fontFamily: text.font, 
                            fontSize: `${text.size}px`,
                            minWidth: '50px'
                        }}
                      />
                      {selectedTextId === text.id && activeTool === 'move' && (
                         <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded-lg shadow-xl border border-slate-200 flex flex-col gap-2 z-50 min-w-[200px]">
                            <select 
                               value={text.font}
                               onChange={(e) => setTexts(texts.map(t => t.id === text.id ? { ...t, font: e.target.value as FontStyle } : t))}
                               className="text-xs p-1 border rounded bg-slate-50"
                            >
                                <option value="Inter">Standard (Sans)</option>
                                <option value="Playfair Display">Serif (Formal)</option>
                                <option value="Roboto Mono">Monospace (Code)</option>
                                <option value="Dancing Script">Handwriting</option>
                            </select>
                            <div className="flex justify-between items-center">
                               <button 
                                 onClick={handleTextRefine} 
                                 disabled={isRefining}
                                 className="text-xs flex items-center text-purple-600 font-bold hover:bg-purple-50 p-1 rounded"
                               >
                                  {isRefining ? 'Thinking...' : <><SparklesIcon className="w-3 h-3 mr-1"/> AI Refine</>}
                               </button>
                               <button 
                                 onClick={() => handleDeleteText(text.id)}
                                 className="text-xs text-red-500 hover:bg-red-50 p-1 rounded"
                               >
                                  Delete
                               </button>
                            </div>
                         </div>
                      )}
                    </div>
                 ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ToolButton = ({ icon: Icon, active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-lg flex lg:flex-col items-center justify-center gap-2 transition-all w-full ${active ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
    title={label}
  >
    <Icon className="w-5 h-5" />
    <span className="text-[10px] font-medium hidden lg:block">{label}</span>
  </button>
);

export default PdfEditor;