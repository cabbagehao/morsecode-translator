import React, { useRef, useState, useCallback, useEffect, startTransition } from 'react';
import { Layout } from '../components/Layout';
import { TranslatorProvider, useTranslator } from '../contexts/TranslatorContext';
import { useI18n } from '../contexts/I18nContext';
import { Copy, Download, ChevronDown, Upload, FileText, X } from 'lucide-react';

function MorseToTextBox() {
  const { setMorse, text, morse } = useTranslator();
  const { t } = useI18n();
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
      alert(t('decodeText.upload.fileTypeError'));
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
            {t('decodeText.upload.title')}
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
                  {isDragOver ? t('decodeText.upload.dragText') : t('decodeText.upload.browseText')}
                </p>
                <p className="text-xs mt-1">
                  {t('decodeText.upload.supportText')}
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
                      {(uploadedFile.size / 1024).toFixed(2)} {t('decodeText.upload.fileInfo')}
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    disabled={isRemoving}
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-3"
                    title={isRemoving ? t('decodeText.upload.removing') : t('decodeText.upload.removeTitle')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Morse Code content preview */}
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('decodeText.upload.contentPreview')}</p>
                </div>
                <div className="p-3">
                  <textarea
                    value={morse}
                    readOnly
                    className="w-full h-32 bg-transparent text-gray-900 dark:text-white text-sm font-mono resize-none border-0 focus:ring-0 p-0"
                    placeholder={t('decodeText.upload.contentPlaceholder')}
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
            {t('decodeText.decoded.title')}
          </label>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handleCopy(text)}
              disabled={!text.trim()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('decodeText.decoded.copyTitle')}
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
            placeholder={t('decodeText.decoded.placeholder')}
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
                  title={t('decodeText.decoded.downloadTitle')}
                >
                  <Download className="w-4 h-4" />
                  {t('decodeText.decoded.downloadText')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDownloadMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-32">
                    {text.trim() && (
                      <button
                        onClick={() => handleDownload('text')}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                      >
                        {t('decodeText.decoded.downloadDecodedText')}
                      </button>
                    )}
                    {morse.trim() && (
                      <button
                        onClick={() => handleDownload('morse')}
                        className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          !text.trim() ? 'rounded-t-lg rounded-b-lg' : 'rounded-b-lg'
                        }`}
                      >
                        {t('decodeText.decoded.downloadMorseCode')}
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
  const { t } = useI18n();
  
  return (
    <Layout
      title={t('decodeText.title')}
      description={t('decodeText.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {t('decodeText.pageTitle')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
          {t('decodeText.description')}
          </p>
        </div>

        <TranslatorProvider>
          <MorseToTextBox />
        </TranslatorProvider>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('decodeText.seoContent.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('decodeText.seoContent.description')} <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">{t('decodeText.navigation.morseTranslator')}</a> {t('decodeText.seoContent.descriptionSuffix')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('decodeText.seoContent.features.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('decodeText.seoContent.features.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('decodeText.seoContent.exportOptions.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('decodeText.seoContent.exportOptions.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('decodeText.seoContent.professionalTitle')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('decodeText.seoContent.professionalDescription')}
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('decodeText.seoContent.supportedFeatures.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                {t('decodeText.seoContent.supportedFeatures.items').map((item, index) => (
                  <div key={index}>• {item}</div>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('decodeText.seoContent.applications.description')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('decodeText.seoContent.bottomTitle')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('decodeText.seoContent.bottomDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('decodeText.seoContent.professionalApps.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('decodeText.seoContent.professionalApps.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('decodeText.seoContent.technicalCapabilities.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('decodeText.seoContent.technicalCapabilities.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('decodeText.seoContent.conclusionText')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}