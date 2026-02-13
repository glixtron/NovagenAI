'use client';

import { useState } from 'react';
import { FileEdit, Upload, Download, Save, Trash2, Plus, Eye, FileText } from 'lucide-react';

interface PDFPage {
  id: string;
  content: string;
  pageNumber: number;
}

export default function PDFEditor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PDFPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      processPDF(file);
    }
  };

  const processPDF = async (file: File) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/pdf/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from PDF');
      }

      const data = await response.json();

      // Split content into mock pages for editing (since LibreOffice returns one text block)
      const text = data.text || '';
      const chunks = text.match(/[\s\S]{1,2000}/g) || [text];

      const realPages: PDFPage[] = chunks.map((chunk, index) => ({
        id: (index + 1).toString(),
        content: chunk,
        pageNumber: index + 1
      }));

      setPages(realPages);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Failed to extract text. Please ensure the PDF is not password protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const updatePageContent = (pageId: string, content: string) => {
    setPages(prev => prev.map(page =>
      page.id === pageId ? { ...page, content } : page
    ));
  };

  const addPage = () => {
    const newPage: PDFPage = {
      id: Date.now().toString(),
      content: 'New page content...',
      pageNumber: pages.length + 1
    };
    setPages([...pages, newPage]);
  };

  const deletePage = (pageId: string) => {
    const updatedPages = pages.filter(page => page.id !== pageId);
    // Renumber pages
    const renumberedPages = updatedPages.map((page, index) => ({
      ...page,
      pageNumber: index + 1
    }));
    setPages(renumberedPages);

    if (currentPage >= pages.length - 1) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const savePDF = async () => {
    setIsSaving(true);
    try {
      // Mock PDF saving - in real app, use jsPDF or similar
      await new Promise(resolve => setTimeout(resolve, 1500));

      const pdfContent = {
        fileName: selectedFile?.name || 'edited-document.pdf',
        pages: pages,
        savedAt: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-pdf-content.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving PDF:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadOriginal = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Editor</h1>
        <p className="text-gray-600">Edit and optimize PDF documents</p>
      </div>

      {!selectedFile ? (
        /* File Upload Interface */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="max-w-md mx-auto text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload PDF Document</h2>
              <p className="text-gray-600 mb-4">Select a PDF file to start editing</p>
              <div className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Choose PDF File
              </div>
            </label>
          </div>
        </div>
      ) : (
        /* PDF Editor Interface */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Pages Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900">Pages</h2>
                <button
                  onClick={addPage}
                  className="text-cyan-600 hover:text-cyan-700 p-1"
                  title="Add new page"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {isProcessing ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-600">Processing PDF...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pages.map((page, index) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPage(index)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${currentPage === index
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">Page {page.pageNumber}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete page"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h3 className="font-medium text-gray-900">
                    {selectedFile.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Page {currentPage + 1} of {pages.length}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadOriginal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Original
                  </button>
                  <button
                    onClick={savePDF}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Page Editor */}
            {pages[currentPage] && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page {pages[currentPage].pageNumber} Content
                  </label>
                  <textarea
                    value={pages[currentPage].content}
                    onChange={(e) => updatePageContent(pages[currentPage].id, e.target.value)}
                    className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Enter page content..."
                  />
                </div>

                {/* Preview Mode Toggle */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Preview</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 min-h-32">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {pages[currentPage].content}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
