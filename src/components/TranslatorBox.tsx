import React, { useEffect, useRef, useState } from 'react';
import { Copy, Slash, AlertTriangle, Play, Pause, RotateCcw, Settings, Lightbulb, Download, ChevronDown } from 'lucide-react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { useTranslator } from '../contexts/TranslatorContext';
import { validateMorseCode, getMorseCodeMap } from '../utils/morseCode';

import { MorseAudioSettings } from './MorseAudioSettings';

interface AudioSettings {
  speed: number; // 播放速度倍率 (0.5-3.0)
  frequency: number; // 音频频率 Hz (200-1000)
  wpm: number; // 每分钟字符数 (5-50)
  dotLength: number; // 点的长度(ms)，基于WPM计算
}

interface TranslatorBoxProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  showSettings?: boolean;
  autoFocus?: boolean;
}

export default function TranslatorBox({
  label,
  value,
  onChange,
  showSettings = false,
  autoFocus = false
}: TranslatorBoxProps) {
  const { text, morse } = useTranslator();
  const { 
    showSlash, 
    toggleSlash, 
    playMorse, 
    pauseMorse, 
    resumeMorse, 
    stopMorse, 
    repeatMorse,
    toggleRepeatMode,
    isPlaying, 
    isPaused,
    isRepeatMode,
    isLightOn,
    currentPlayPosition,
    audioSettings
  } = useMorseSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

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

  // 计算字符统计
  const getCharacterCount = (text: string) => {
    if (!text) return 0;
    // 对于摩尔斯码，只计算有效字符（点、划、空格、斜杠）
    if (isMorseCode) {
      return text.replace(/[^.\-\s/]/g, '').length;
    }
    return text.length;
  };

  // 创建摩尔斯码位置到文本位置的映射
  const createPositionMapping = (originalText: string, morseText: string) => {
    const morseToTextMap: number[] = [];
    const textToMorseMap: number[] = [];
    
    let textIndex = 0;
    let morseIndex = 0;
    
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i].toUpperCase();
      textToMorseMap[i] = morseIndex;
      
      if (char === ' ') {
        // 单词分隔符 - 在摩尔斯码中可能是 ' / ' 或只是空格
        while (morseIndex < morseText.length && (morseText[morseIndex] === ' ' || morseText[morseIndex] === '/')) {
          morseToTextMap[morseIndex] = i;
          morseIndex++;
        }
      } else {
        // 普通字符 - 找到对应的摩尔斯码
        const morseCodeMap = getMorseCodeMap();
        const morseChar = morseCodeMap[char];
        if (morseChar && morseChar !== '/') {
          // 标记这个摩尔斯字符的所有位置
          for (let j = 0; j < morseChar.length; j++) {
            if (morseIndex < morseText.length) {
              morseToTextMap[morseIndex] = i;
              morseIndex++;
            }
          }
          // 跳过字符间的空格
          while (morseIndex < morseText.length && morseText[morseIndex] === ' ') {
            morseToTextMap[morseIndex] = i;
            morseIndex++;
          }
        } else {
          // 未知字符，跳过
          if (morseIndex < morseText.length) {
            morseToTextMap[morseIndex] = i;
            morseIndex++;
          }
        }
      }
    }
    
    return { morseToTextMap, textToMorseMap };
  };

  // 高亮显示当前播放的字符
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

  // 根据摩尔斯码位置计算对应的文本位置
  const getCorrespondingTextPosition = () => {
    if (!isPlaying || currentPlayPosition < 0) return -1;
    const { morseToTextMap } = createPositionMapping(text, morse);
    return morseToTextMap[currentPlayPosition] ?? -1;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handlePlay = async () => {
    if (isPaused) {
      resumeMorse();
    } else {
      await playMorse(value);
    }
  };

  const handlePause = () => {
    pauseMorse();
  };

  const handleStop = () => {
    stopMorse();
  };

  const handleRepeat = () => {
    toggleRepeatMode();
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  // 下载为文本文件
  const downloadAsText = (content: string, type: 'text' | 'morse') => {
    const filename = type === 'morse' ? 'morse-code.txt' : 'text.txt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 生成摩尔斯码音频文件
  const generateMorseAudio = async (morse: string, audioSettings: AudioSettings): Promise<ArrayBuffer> => {
    const { frequency, dotLength, speed } = audioSettings;
    const actualDotLength = dotLength / speed;
    const dashLength = actualDotLength * 3;
    const symbolGap = actualDotLength;
    const letterGap = actualDotLength * 3;
    const wordGap = actualDotLength * 7;

    // 计算总时长（毫秒）
    let totalDuration = 0;
    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      if (char === '.') {
        totalDuration += actualDotLength + symbolGap;
      } else if (char === '-') {
        totalDuration += dashLength + symbolGap;
      } else if (char === ' ') {
        totalDuration += letterGap;
      } else if (char === '/') {
        totalDuration += wordGap;
      }
    }

    // 添加结尾的静音
    totalDuration += 500; // 500ms结尾静音

    const sampleRate = 44100;
    const totalSamples = Math.floor((totalDuration / 1000) * sampleRate);
    const audioBuffer = new Float32Array(totalSamples);

    let currentTime = 0;
    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      
      if (char === '.') {
        // 生成点的音频
        const startSample = Math.floor((currentTime / 1000) * sampleRate);
        const endSample = Math.floor(((currentTime + actualDotLength) / 1000) * sampleRate);
        
        for (let j = startSample; j < endSample && j < totalSamples; j++) {
          const t = j / sampleRate;
          // 添加淡入淡出效果，避免爆音
          const fadeLength = Math.min(100, (endSample - startSample) / 4);
          let amplitude = 0.3;
          if (j - startSample < fadeLength) {
            amplitude *= (j - startSample) / fadeLength;
          } else if (endSample - j < fadeLength) {
            amplitude *= (endSample - j) / fadeLength;
          }
          audioBuffer[j] = Math.sin(2 * Math.PI * frequency * t) * amplitude;
        }
        currentTime += actualDotLength + symbolGap;
      } else if (char === '-') {
        // 生成划的音频
        const startSample = Math.floor((currentTime / 1000) * sampleRate);
        const endSample = Math.floor(((currentTime + dashLength) / 1000) * sampleRate);
        
        for (let j = startSample; j < endSample && j < totalSamples; j++) {
          const t = j / sampleRate;
          // 添加淡入淡出效果
          const fadeLength = Math.min(100, (endSample - startSample) / 4);
          let amplitude = 0.3;
          if (j - startSample < fadeLength) {
            amplitude *= (j - startSample) / fadeLength;
          } else if (endSample - j < fadeLength) {
            amplitude *= (endSample - j) / fadeLength;
          }
          audioBuffer[j] = Math.sin(2 * Math.PI * frequency * t) * amplitude;
        }
        currentTime += dashLength + symbolGap;
      } else if (char === ' ') {
        currentTime += letterGap;
      } else if (char === '/') {
        currentTime += wordGap;
      }
    }

    // 转换为WAV格式
    const wavBuffer = new ArrayBuffer(44 + totalSamples * 2);
    const view = new DataView(wavBuffer);
    
    // WAV文件头
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + totalSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // PCM format
    view.setUint16(20, 1, true); // Linear quantization
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    writeString(36, 'data');
    view.setUint32(40, totalSamples * 2, true);

    // 音频数据
    let offset = 44;
    for (let i = 0; i < totalSamples; i++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return wavBuffer;
  };

  // 下载为音频文件
  const downloadAsAudio = async (content: string, format: 'wav' | 'mp3') => {
    try {
      const audioBuffer = await generateMorseAudio(content, audioSettings);
      const mimeType = format === 'wav' ? 'audio/wav' : 'audio/mpeg';
      const blob = new Blob([audioBuffer], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `morse-code.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsDownloadMenuOpen(false);
    } catch (error) {
      console.error('Error generating audio:', error);
      alert('生成音频文件时出错，请重试。');
    }
  };

  // 处理下载选项
  const handleDownload = (format: 'txt' | 'wav' | 'mp3') => {
    if (format === 'txt') {
      downloadAsText(value, 'morse');
    } else {
      downloadAsAudio(value, format);
    }
    setIsDownloadMenuOpen(false);
  };

  // Check for morse code validation errors
  const isMorseCode = label === 'Morse Code';
  const morseValidation = isMorseCode ? validateMorseCode(value) : { isValid: true, invalidChars: [] };
  const hasErrors = isMorseCode && !morseValidation.isValid;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Audio Controls for Morse Code */}
          {isMorseCode && (
            <div className="flex items-center gap-1">
              {!isPlaying && !isPaused && (
                <button
                  onClick={handlePlay}
                  className="p-2 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full transition-colors touch-manipulation"
                  title="Play Morse Code"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              
              {isPlaying && (
                <button
                  onClick={handlePause}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full transition-colors touch-manipulation"
                  title="Pause"
                >
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              {isPaused && (
                <button
                  onClick={handlePlay}
                  className="p-2 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full transition-colors touch-manipulation"
                  title="Resume"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              <button
                onClick={handleRepeat}
                className={`p-2 rounded-full transition-colors touch-manipulation ${
                  isRepeatMode
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                    : 'hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                }`}
                title={isRepeatMode ? "Repeat Mode On" : "Repeat Mode Off"}
              >
                <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 ${isRepeatMode ? 'text-blue-700 dark:text-blue-300' : ''}`} />
              </button>

              <button
                onClick={openSettings}
                className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full transition-colors touch-manipulation"
                title="Audio Settings"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {showSettings && (
            <button
              onClick={toggleSlash}
              className={`p-2 rounded-full transition-colors group relative touch-manipulation ${
                showSlash 
                  ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50' 
                  : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Show word separators"
            >
              <Slash className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Show word separators
              </span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors touch-manipulation"
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
            {isMorseCode 
              ? highlightText(value, currentPlayPosition)
              : highlightText(value, getCorrespondingTextPosition())
            }
          </div>
        )}
        
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className={`relative w-full h-32 sm:h-40 p-3 sm:p-4 border rounded-lg focus:ring-2 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm sm:text-base font-light tracking-tight ${
            hasErrors 
              ? 'border-red-300 dark:border-red-700 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
          placeholder={`Enter ${label.toLowerCase()} here...`}
        />
      </div>
      
            {/* Character count and download options */}
      <div className="mt-2 flex justify-end items-center">
        <div className="flex items-center gap-2">
          {/* Light indicator for Morse Code */}
          {isMorseCode && (
            <Lightbulb className={`w-4 h-4 transition-colors ${
              isLightOn 
                ? 'text-yellow-400' 
                : 'text-gray-400 dark:text-gray-600'
            }`} />
          )}
          
          {/* Character count for morse code */}
          {isMorseCode && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {getCharacterCount(value)} chars
            </span>
          )}
          
          {/* Download options - only for morse code */}
          {isMorseCode && value.trim() && (
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
      
      {hasErrors && (
        <div className="mt-2 flex items-start gap-2 text-red-600 dark:text-red-400 text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Invalid characters found: {morseValidation.invalidChars.join(', ')}. 
            Only dots (.), dashes (-), spaces, and forward slashes (/) are allowed.
          </span>
        </div>
      )}

      {/* Audio Settings Modal */}
      <MorseAudioSettings isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
}