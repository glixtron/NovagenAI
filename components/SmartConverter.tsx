'use client';

import { useState } from 'react';
import { RefreshCw, Upload, Download, FileText, Image, File, CheckCircle } from 'lucide-react';

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  downloadUrl?: string;
}

export default function SmartConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');
  const [conversions, setConversions] = useState<ConversionJob[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const supportedFormats = {
    document: ['PDF', 'DOCX', 'TXT', 'HTML'],
    image: ['JPG', 'PNG', 'GIF', 'WEBP', 'SVG'],
    audio: ['MP3', 'WAV', 'OGG', 'M4A'],
    video: ['MP4', 'AVI', 'MOV', 'WEBM'],
  };

  const formatCategories = Object.keys(supportedFormats) as Array<keyof typeof supportedFormats>;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const extension = file.name.split('.').pop()?.toUpperCase();
      if (extension) {
        setFromFormat(extension);
        // Auto-select a different format for conversion
        const category = formatCategories.find(cat =>
          supportedFormats[cat].includes(extension)
        );
        if (category) {
          const formats = supportedFormats[category];
          const otherFormats = formats.filter(f => f !== extension);
          setToFormat(otherFormats[0] || '');
        }
      }
    }
  };

  const convertFile = async () => {
    if (!selectedFile || !toFormat) return;

    const conversionJob: ConversionJob = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      fromFormat,
      toFormat,
      status: 'pending'
    };

    setConversions([conversionJob, ...conversions]);
    setIsConverting(true);

    try {
      setConversions(prev => prev.map(job =>
        job.id === conversionJob.id
          ? { ...job, status: 'processing' }
          : job
      ));

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('format', toFormat.toLowerCase());

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      setConversions(prev => prev.map(job =>
        job.id === conversionJob.id
          ? {
            ...job,
            status: 'completed',
            downloadUrl: downloadUrl
          }
          : job
      ));
    } catch (error) {
      console.error('Conversion error:', error);
      setConversions(prev => prev.map(job =>
        job.id === conversionJob.id
          ? { ...job, status: 'error' }
          : job
      ));
    } finally {
      setIsConverting(false);
      setSelectedFile(null);
      setFromFormat('');
      setToFormat('');
    }
  };

  const downloadConvertedFile = (job: ConversionJob) => {
    if (job.downloadUrl) {
      const a = document.createElement('a');
      a.href = job.downloadUrl;
      const extension = job.toFormat.toLowerCase();
      const baseName = job.fileName.substring(0, job.fileName.lastIndexOf('.')) || job.fileName;
      a.download = `${baseName}.${extension}`;
      a.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-green-500" />;
    } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension || '')) {
      return <FileText className="w-5 h-5 text-blue-500" />;
    } else {
      return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: ConversionJob['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <div className="w-4 h-4 bg-red-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Converter</h1>
        <p className="text-gray-600">Convert files between formats intelligently</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Converter Interface */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Select File</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Support for documents, images, audio, and video</p>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedFile.name)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Format Selection */}
          {selectedFile && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Conversion Options</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Format</label>
                  <input
                    type="text"
                    value={fromFormat}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Format</label>
                  <select
                    value={toFormat}
                    onChange={(e) => setToFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select format...</option>
                    {formatCategories.map(category => (
                      <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                        {supportedFormats[category].map(format => (
                          <option key={format} value={format}>{format}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={convertFile}
                disabled={isConverting || !toFormat}
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Converting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Convert File
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column - History and Info */}
        <div className="space-y-6">
          {/* Supported Formats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Supported Formats</h2>
            <div className="space-y-3">
              {formatCategories.map(category => (
                <div key={category}>
                  <h3 className="font-medium text-gray-900 capitalize mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {supportedFormats[category].map(format => (
                      <span
                        key={format}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion History */}
          {conversions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Conversions</h2>
              <div className="space-y-3">
                {conversions.slice(0, 5).map(job => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{job.fileName}</p>
                        <p className="text-xs text-gray-500">
                          {job.fromFormat} → {job.toFormat}
                        </p>
                      </div>
                    </div>
                    {job.status === 'completed' && (
                      <button
                        onClick={() => downloadConvertedFile(job)}
                        className="text-cyan-600 hover:text-cyan-700"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
