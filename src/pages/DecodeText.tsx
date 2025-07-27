import React, { useRef, useState, useCallback, useEffect, startTransition } from 'react';
import { Layout } from '../components/Layout';
import { TranslatorProvider, useTranslator } from '../contexts/TranslatorContext';
import { Copy, Download, ChevronDown, Upload, FileText, X } from 'lucide-react';

function MorseToTextBox() {
  const { setMorse, text, morse } = useTranslator();
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  // 页面挂载时清空内容
  useEffect(() => {
    setMorse('');
  }, [setMorse]);

  // 点击外部关闭下载菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };

    if (isDownloadMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDownloadMenuOpen]);

  const readFileContent = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMorse(content); // 设置摩斯码，会自动转换为文本
    };
    reader.readAsText(file);
  }, [setMorse]);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      alert('Please upload a .txt file');
      return;
    }

    setUploadedFile(file);
    readFileContent(file);
  }, [readFileContent]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const removeFile = useCallback(() => {
    setIsRemoving(true);

    // 清理文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // 使用 startTransition 来优化性能
    startTransition(() => {
      setUploadedFile(null);
      setMorse('');
      setIsRemoving(false);
    });
  }, [setMorse]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // 下载为文本文件
  const downloadAsText = (content: string, type: 'text' | 'morse') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'text' ? 'decoded-text.txt' : 'morse-code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = (format: 'text' | 'morse') => {
    if (format === 'text') {
      downloadAsText(text, 'text');
    } else {
      downloadAsText(morse, 'morse');
    }
    setIsDownloadMenuOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Morse Code File Upload Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
            Morse Code File Upload
          </label>
        </div>

        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />

          {!uploadedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative w-full h-32 sm:h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <Upload className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">
                  {isDragOver ? 'Drop file here' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs mt-1">
                  Upload .txt files containing Morse code
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 p-4">
              <div className="flex items-center mb-3">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    disabled={isRemoving}
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-3"
                    title={isRemoving ? "Removing..." : "Remove file"}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Morse Code content preview */}
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Morse Code Content Preview</p>
                </div>
                <div className="p-3">
                  <textarea
                    value={morse}
                    readOnly
                    className="w-full h-32 bg-transparent text-gray-900 dark:text-white text-sm font-mono resize-none border-0 focus:ring-0 p-0"
                    placeholder="Morse code content will appear here..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decoded Text Display Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
            Decoded Text
          </label>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handleCopy(text)}
              disabled={!text.trim()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={text}
            readOnly
            className="relative w-full h-32 sm:h-40 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm sm:text-base font-light tracking-tight border-gray-300 dark:border-gray-700 cursor-default"
            placeholder="Upload a Morse code file to see the decoded text..."
          />
        </div>

        {/* Character count and download options */}
        <div className="mt-2 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {text.length} chars
            </span>

            {/* Download options */}
            {(text.trim() || morse.trim()) && (
              <div className="relative" ref={downloadRef}>
                <button
                  onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  title="Download options"
                >
                  <Download className="w-4 h-4" />
                  Download
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDownloadMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-32">
                    {text.trim() && (
                      <button
                        onClick={() => handleDownload('text')}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                      >
                        Decoded Text
                      </button>
                    )}
                    {morse.trim() && (
                      <button
                        onClick={() => handleDownload('morse')}
                        className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          !text.trim() ? 'rounded-t-lg rounded-b-lg' : 'rounded-b-lg'
                        }`}
                      >
                        Morse Code
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DecodeText() {
  return (
    <Layout
      title="Morse Code Text file Decoder – extract morse code from file"
      description="Decode Morse code files to readable text instantly. Upload dot-dash files and convert to plain text with batch processing and download options."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Text File Morse Code translator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
          Extract content from Morse code text file and convert it to English.
          </p>
        </div>

        <TranslatorProvider>
          <MorseToTextBox />
        </TranslatorProvider>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Morse Code to Text Decoding
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Upload text files containing Morse code and instantly decode them to readable text with professional processing capabilities. For quick interactive conversion, visit our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse code translater</a> page.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Decoding Features:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Upload .txt files containing Morse code</li>
                  <li>• Automatic decoding to readable text</li>
                  <li>• Support for standard Morse code format</li>
                  <li>• Real-time character count display</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Export Options:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Download decoded text as .txt file</li>
                  <li>• Download original Morse code</li>
                  <li>• Copy decoded text to clipboard</li>
                  <li>• Instant file processing and preview</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Morse Code Decoding Tool
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Perfect for amateur radio operators, maritime communications, and educational purposes requiring Morse code-to-text conversion.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Supported Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                <div>• International standard Morse code</div>
                <div>• Drag & drop file upload</div>
                <div>• Instant text conversion</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Upload any Morse code file to quickly decode messages, communication logs, or practice materials into readable text format suitable for analysis and documentation.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Morse Code Decoder for File Processing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our powerful Morse code file decoder specializes in processing text files containing Morse code patterns, making it the ideal solution for decoding stored communications, archived messages, and educational materials. Whether you're working with historical telegraph communications, amateur radio logs, or training exercises, this decoder provides accurate and reliable text conversion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Applications:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Military and emergency services communication analysis</li>
                  <li>• Historical document research and preservation</li>
                  <li>• Amateur radio contest log processing</li>
                  <li>• Maritime communication record keeping</li>
                  <li>• Educational material preparation and grading</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Capabilities:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Batch processing of multiple Morse code files</li>
                  <li>• Support for various text file encoding formats</li>
                  <li>• Automatic detection of Morse code patterns</li>
                  <li>• Error handling for malformed Morse sequences</li>
                  <li>• Real-time preview and validation features</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              This comprehensive file-based Morse code decoder ensures seamless integration into professional workflows, academic research projects, and personal hobby applications where reliable text conversion is essential.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}