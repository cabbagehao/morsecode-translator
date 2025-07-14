import React, { useRef, useState, useCallback, useEffect, startTransition } from 'react';
import { Layout } from '../components/Layout';
import { TranslatorProvider, useTranslator } from '../contexts/TranslatorContext';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { Copy, Play, Pause, RotateCcw, Settings, Lightbulb, Download, ChevronDown, Upload, FileText, X } from 'lucide-react';
import { MorseAudioSettings } from '../components/MorseAudioSettings';

function FileToMorseBox() {
  const { 
    playMorse, 
    pauseMorse, 
    resumeMorse, 
    toggleRepeatMode,
    isPlaying, 
    isPaused,
    isRepeatMode,
    isLightOn,
    currentPlayPosition,
    audioSettings
  } = useMorseSettings();
  
  const { setText, morse, text } = useTranslator();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isPlayLoading, setIsPlayLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  // 页面挂载时清空内容
  useEffect(() => {
    setText('');
  }, [setText]);

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
      setText(content);
    };
    reader.readAsText(file);
  }, [setText]);

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
    
    // 清理文件输入，这个操作很快
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // 使用 startTransition 来优化性能，避免阻塞UI
    startTransition(() => {
      setUploadedFile(null);
      setText('');
      setIsRemoving(false);
    });
  }, [setText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(morse);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handlePlay = async () => {
    if (isPaused) {
      resumeMorse();
      return;
    }
    
    // 如果摩斯码内容很长，显示loading状态
    if (morse.length > 1000) {
      setIsPlayLoading(true);
    }
    
    try {
      await playMorse(morse);
    } catch (error) {
      console.error('Error playing morse code:', error);
    } finally {
      setIsPlayLoading(false);
    }
  };

  // 下载为文本文件
  const downloadAsText = (content: string, type: 'text' | 'morse') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'text' ? 'text.txt' : 'morse-code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 生成摩斯码音频
  const generateMorseAudio = async (morse: string, audioSettings: any): Promise<ArrayBuffer> => {
    const sampleRate = 44100;
    const dotDuration = 60 / (audioSettings.wpm * 50);
    const dashDuration = dotDuration * 3;
    const elementGap = dotDuration;
    const letterGap = dotDuration * 3;
    const wordGap = dotDuration * 7;

    let totalSamples = 0;
    const silenceSamples = Math.floor(elementGap * sampleRate);

    for (const char of morse) {
      if (char === '.') {
        totalSamples += Math.floor(dotDuration * sampleRate) + silenceSamples;
      } else if (char === '-') {
        totalSamples += Math.floor(dashDuration * sampleRate) + silenceSamples;
      } else if (char === ' ') {
        totalSamples += Math.floor(letterGap * sampleRate);
      } else if (char === '/') {
        totalSamples += Math.floor(wordGap * sampleRate);
      }
    }

    const audioBuffer = new Float32Array(totalSamples);
    let currentIndex = 0;

    for (const char of morse) {
      if (char === '.') {
        const duration = Math.floor(dotDuration * sampleRate);
        for (let i = 0; i < duration; i++) {
          audioBuffer[currentIndex + i] = Math.sin(2 * Math.PI * audioSettings.frequency * i / sampleRate) * 0.3;
        }
        currentIndex += duration + silenceSamples;
      } else if (char === '-') {
        const duration = Math.floor(dashDuration * sampleRate);
        for (let i = 0; i < duration; i++) {
          audioBuffer[currentIndex + i] = Math.sin(2 * Math.PI * audioSettings.frequency * i / sampleRate) * 0.3;
        }
        currentIndex += duration + silenceSamples;
      } else if (char === ' ') {
        currentIndex += Math.floor(letterGap * sampleRate);
      } else if (char === '/') {
        currentIndex += Math.floor(wordGap * sampleRate);
      }
    }

    const channels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * channels * bitsPerSample / 8;
    const blockAlign = channels * bitsPerSample / 8;
    const dataSize = audioBuffer.length * 2;
    const fileSize = 36 + dataSize;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, fileSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return buffer;
  };

  const downloadAsAudio = async (content: string, format: 'wav' | 'mp3') => {
    try {
      if (format === 'wav') {
        const audioBuffer = await generateMorseAudio(content, audioSettings);
        const blob = new Blob([audioBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'morse-code.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert('MP3 format is not yet supported. Please use WAV format.');
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      alert('Error generating audio file. Please try again.');
    }
  };

  const handleDownload = (format: 'txt' | 'wav' | 'mp3') => {
    if (format === 'txt') {
      downloadAsText(morse, 'morse');
    } else {
      downloadAsAudio(morse, format);
    }
    setIsDownloadMenuOpen(false);
  };

  const highlightText = (text: string, position: number) => {
    if (position < 0 || position >= text.length || !isPlaying) {
      return text;
    }
    
    const before = text.slice(0, position);
    const current = text.slice(position, position + 1);
    const after = text.slice(position + 1);
    
    return (
      <>
        {before}
        <span className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white">
          {current}
        </span>
        {after}
      </>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* File Upload Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
            Text File Upload
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
                  Only .txt files are supported
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
              {/* File content preview */}
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">File Content Preview</p>
                </div>
                <div className="p-3">
                  <textarea
                    value={text}
                    readOnly
                    className="w-full h-32 bg-transparent text-gray-900 dark:text-white text-sm font-mono resize-none border-0 focus:ring-0 p-0"
                    placeholder="File content will appear here..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Morse Code Display Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
            Morse Code
          </label>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Audio Controls */}
            <div className="flex items-center gap-1">
                           {!isPlaying && !isPaused && (
               <button
                 onClick={handlePlay}
                 disabled={!morse.trim() || isPlayLoading}
                 className="p-2 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 title={isPlayLoading ? "Preparing audio..." : "Play Morse Code"}
               >
                 {isPlayLoading ? (
                   <div className="w-4 h-4 sm:w-5 sm:h-5 animate-spin border-2 border-current border-t-transparent rounded-full" />
                 ) : (
                   <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                 )}
               </button>
             )}
              
              {isPlaying && (
                <button
                  onClick={() => pauseMorse()}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full transition-colors"
                  title="Pause"
                >
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              {isPaused && (
                <button
                  onClick={handlePlay}
                  className="p-2 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full transition-colors"
                  title="Resume"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              <button
                onClick={() => toggleRepeatMode()}
                disabled={!morse.trim()}
                className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRepeatMode
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                    : 'hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                }`}
                title={isRepeatMode ? "Repeat Mode On" : "Repeat Mode Off"}
              >
                <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 ${isRepeatMode ? 'text-blue-700 dark:text-blue-300' : ''}`} />
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full transition-colors"
                title="Audio Settings"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <button
              onClick={handleCopy}
              disabled={!morse.trim()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          {/* Highlight overlay */}
          {isPlaying && currentPlayPosition >= 0 && (
            <div 
              className="absolute inset-0 p-3 sm:p-4 pointer-events-none z-10 font-mono text-sm sm:text-base font-light tracking-tight whitespace-pre-wrap break-words text-transparent"
              style={{ lineHeight: '1.5' }}
            >
              {highlightText(morse, currentPlayPosition)}
            </div>
          )}
          
          <textarea
            value={morse}
            readOnly
            className="relative w-full h-32 sm:h-40 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm sm:text-base font-light tracking-tight border-gray-300 dark:border-gray-700 cursor-default"
            placeholder="Upload a text file to see the Morse code translation..."
          />
        </div>
        
                 {/* Character count and download options */}
         <div className="mt-2 flex justify-end items-center">
           <div className="flex items-center gap-2">
             <Lightbulb className={`w-4 h-4 transition-colors ${
               isLightOn 
                 ? 'text-yellow-400' 
                 : 'text-gray-400 dark:text-gray-600'
             }`} />
             
             <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
               {morse.replace(/[^.\-\s/]/g, '').length} chars
             </span>
             
             {/* Download options - only for morse code */}
             {morse.trim() && (
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
                   <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-28">
                     <button
                       onClick={() => handleDownload('txt')}
                       className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                     >
                       TXT
                     </button>
                     <button
                       onClick={() => handleDownload('wav')}
                       className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                     >
                       WAV
                     </button>
                     <button
                       onClick={() => handleDownload('mp3')}
                       className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
                     >
                       MP3
                     </button>
                   </div>
                 )}
               </div>
             )}
           </div>
         </div>
      </div>

      {/* Audio Settings Modal */}
      <MorseAudioSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default function TxtToMorseEncoder() {
  return (
    <Layout 
      title="Text to Morse Code Encoder – Convert Files with Audio"
      description="Convert text files to Morse code with audio playback, visual flash, and download options. Batch processing for documents with sound generation."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Text File to Morse Encoder
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Upload text files and convert them to Morse code with audio playback
          </p>
        </div>

        <TranslatorProvider>
          <FileToMorseBox />
        </TranslatorProvider>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Text File to Morse Code Conversion
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Upload any text file (.txt) and instantly convert its contents to International Morse Code with professional audio playback capabilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">File Processing Features:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Drag & drop or click to upload .txt files</li>
                  <li>• Automatic text encoding to Morse code</li>
                  <li>• Real-time file size and character count</li>
                  <li>• Instant preview of uploaded content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Audio & Export Options:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Professional Morse code audio playback</li>
                  <li>• Adjustable speed and frequency settings</li>
                  <li>• Download as TXT or WAV audio files</li>
                  <li>• Visual light indicator for each signal</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Morse Code File Processing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Perfect for amateur radio operators, maritime communications, and educational purposes requiring bulk text-to-Morse conversion.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Supported Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                <div>• International standard Morse code</div>
                <div>• Customizable playback speed (WPM)</div>
                <div>• High-quality audio generation</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Upload documentation, messages, or any text content to generate accurate Morse code translations with professional-grade audio output suitable for training and communication purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 