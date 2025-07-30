import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Copy, Download, Upload, Music, Play, Pause, Square, Volume2, Settings, FileAudio, X, AlertCircle } from 'lucide-react';
import { morseToText } from '../utils/morseCode';
import { uploadToR2ForDebug } from '../utils/r2Upload';

interface AudioAnalysisResult {
  detectedMorse: string;
  decodedText: string;
  confidence: number;
  segments: Array<{
    startTime: number;
    endTime: number;
    type: 'dot' | 'dash' | 'space';
    frequency: number;
  }>;
}

function DecodeAudio() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AudioAnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isPreAnalyzing, setIsPreAnalyzing] = useState(false);
  const [preAnalysisResult, setPreAnalysisResult] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  // 音频分析设置
  const [settings, setSettings] = useState({
    minFrequency: 400,    // 最小频率 (Hz)
    maxFrequency: 1200,   // 最大频率 (Hz)
    dotThreshold: 0.15,   // 点的最大持续时间 (秒)
    dashThreshold: 0.45,  // 划的最大持续时间 (秒)
    silenceThreshold: 0.1, // 静音阈值
    noiseFloor: -40,      // 噪音底限 (dB)
    charSeparationMultiplier: 2.0, // 字符间隔倍数
    wordSeparationMultiplier: 4.0, // 单词间隔倍数
    autoAddSpaces: true   // 自动添加空格
  });

  const [showSettings, setShowSettings] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 页面挂载时重置状态
  useEffect(() => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setError('');
  }, []);

  // 清理音频上下文和URL
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // 检查文件类型
    if (!file.type.startsWith('audio/')) {
      setError('Please upload a valid audio file (MP3, WAV, M4A, etc.)');
      return;
    }

    // 检查文件大小 (限制为50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    // 清理之前的音频URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // 创建新的音频URL
    const newAudioUrl = URL.createObjectURL(file);
    setAudioUrl(newAudioUrl);

    setUploadedFile(file);
    setAnalysisResult(null);
    setError('');

    // Async upload to R2 for debugging (non-blocking)
    uploadToR2ForDebug(file, 'audio').catch(error => {
      console.error('[R2 Debug] Upload failed silently:', error);
    });

    // 开始预分析
    preAnalyzeAudio(file);
  }, [audioUrl]);

  // 音频预分析函数 - 分析音频特征并自动设置最佳参数
  const preAnalyzeAudio = useCallback(async (file: File) => {
    setIsPreAnalyzing(true);
    setPreAnalysisResult('Analyzing audio characteristics...');

    try {
      // 创建音频上下文
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // 读取音频文件
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // 获取音频数据
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      const duration = audioBuffer.duration;

      setPreAnalysisResult('Detecting signal patterns...');

      // 快速分析音频特征
      const frameSize = 2048;
      const hopSize = 1024;
      let signalSegments: Array<{ start: number; end: number; amplitude: number }> = [];
      let maxAmplitude = 0;
      let totalEnergy = 0;

      // 扫描音频寻找信号段
      for (let i = 0; i < channelData.length; i += hopSize) {
        const frameEnd = Math.min(i + frameSize, channelData.length);
        const frame = channelData.slice(i, frameEnd);

        // 计算RMS振幅
        const rms = Math.sqrt(frame.reduce((sum, sample) => sum + sample * sample, 0) / frame.length);
        const amplitude = 20 * Math.log10(rms + 1e-10);

        maxAmplitude = Math.max(maxAmplitude, amplitude);
        totalEnergy += rms;

        const timeStamp = i / sampleRate;

        // 检测信号段
        if (amplitude > -50) { // 临时阈值
          if (signalSegments.length === 0 || timeStamp - signalSegments[signalSegments.length - 1].end > 0.1) {
            signalSegments.push({ start: timeStamp, end: timeStamp, amplitude });
          } else {
            signalSegments[signalSegments.length - 1].end = timeStamp;
            signalSegments[signalSegments.length - 1].amplitude = Math.max(
              signalSegments[signalSegments.length - 1].amplitude,
              amplitude
            );
          }
        }
      }

      setPreAnalysisResult('Calculating optimal parameters...');

      // 分析信号段持续时间
      const segmentDurations = signalSegments.map(seg => seg.end - seg.start).filter(dur => dur > 0.02);

      if (segmentDurations.length === 0) {
        setPreAnalysisResult('No clear signals detected - using default settings');
        setIsPreAnalyzing(false);
        return;
      }

      // 计算统计信息
      segmentDurations.sort((a, b) => a - b);
      const minDuration = segmentDurations[0];
      const maxDuration = segmentDurations[segmentDurations.length - 1];
      const medianDuration = segmentDurations[Math.floor(segmentDurations.length / 2)];
      const avgAmplitude = maxAmplitude;

      // 估算最优参数
      let optimalSettings = { ...settings };

      // 基于信号持续时间分布设置阈值
      if (medianDuration < 0.1) {
        // 快速摩尔斯码
        optimalSettings = {
          ...optimalSettings,
          dotThreshold: Math.max(0.05, minDuration * 1.5),
          dashThreshold: Math.max(0.15, medianDuration * 2.5),
          charSeparationMultiplier: 1.5,
          wordSeparationMultiplier: 3.0,
          noiseFloor: Math.max(-50, avgAmplitude - 30),
          autoAddSpaces: true
        };
        setPreAnalysisResult('✓ Fast Morse code detected - settings optimized');
      } else if (medianDuration < 0.3) {
        // 标准摩尔斯码
        optimalSettings = {
          ...optimalSettings,
          dotThreshold: Math.max(0.08, minDuration * 1.2),
          dashThreshold: Math.max(0.25, medianDuration * 2.0),
          charSeparationMultiplier: 2.0,
          wordSeparationMultiplier: 4.0,
          noiseFloor: Math.max(-50, avgAmplitude - 25),
          autoAddSpaces: true
        };
        setPreAnalysisResult('✓ Standard Morse code detected - settings optimized');
      } else {
        // 慢速摩尔斯码
        optimalSettings = {
          ...optimalSettings,
          dotThreshold: Math.max(0.1, minDuration * 1.1),
          dashThreshold: Math.max(0.3, medianDuration * 1.8),
          charSeparationMultiplier: 3.0,
          wordSeparationMultiplier: 6.0,
          noiseFloor: Math.max(-50, avgAmplitude - 20),
          autoAddSpaces: true
        };
        setPreAnalysisResult('✓ Slow Morse code detected - settings optimized');
      }

      // 应用优化的设置
      setSettings(optimalSettings);

      // 显示分析结果摘要
      setTimeout(() => {
        setPreAnalysisResult(
          `✓ Analysis complete - Segments: ${segmentDurations.length}, ` +
          `Duration range: ${minDuration.toFixed(2)}s - ${maxDuration.toFixed(2)}s, ` +
          `Avg amplitude: ${avgAmplitude.toFixed(1)}dB`
        );
      }, 500);

    } catch (err) {
      console.error('Pre-analysis error:', err);
      setPreAnalysisResult('⚠ Pre-analysis failed - using default settings');
    } finally {
      setIsPreAnalyzing(false);
    }
  }, [settings]);

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
    // 清理音频URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setUploadedFile(null);
    setAnalysisResult(null);
    setError('');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioUrl('');
    setPreAnalysisResult('');
    setIsPreAnalyzing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [audioUrl]);

  // 音频分析函数
  const analyzeAudio = useCallback(async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError('');

    try {
      // 创建音频上下文
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // 读取音频文件
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // 获取音频数据
      const channelData = audioBuffer.getChannelData(0); // 使用第一个声道
      const sampleRate = audioBuffer.sampleRate;
      const frameSize = 1024;
      const hopSize = 512;

      const segments: AudioAnalysisResult['segments'] = [];

      // 简化的音频分析 - 基于振幅检测
      let currentSegmentStart = -1;
      let currentSegmentType: 'signal' | 'silence' = 'silence';

      for (let i = 0; i < channelData.length; i += hopSize) {
        const frameEnd = Math.min(i + frameSize, channelData.length);
        const frame = channelData.slice(i, frameEnd);

        // 计算RMS (均方根) 振幅
        const rms = Math.sqrt(frame.reduce((sum, sample) => sum + sample * sample, 0) / frame.length);
        const amplitude = 20 * Math.log10(rms + 1e-10); // 转换为dB

        const timeStamp = i / sampleRate;
        const isSignal = amplitude > settings.noiseFloor;

        if (isSignal && currentSegmentType === 'silence') {
          // 信号开始
          currentSegmentStart = timeStamp;
          currentSegmentType = 'signal';
        } else if (!isSignal && currentSegmentType === 'signal' && currentSegmentStart >= 0) {
          // 信号结束
          const duration = timeStamp - currentSegmentStart;

          if (duration > 0.05) { // 忽略太短的信号
            const segmentType = duration <= settings.dotThreshold ? 'dot' :
                              duration <= settings.dashThreshold ? 'dash' : 'dash';

            segments.push({
              startTime: currentSegmentStart,
              endTime: timeStamp,
              type: segmentType,
              frequency: 800 // 简化处理，使用固定频率
            });
          }

          currentSegmentType = 'silence';
          currentSegmentStart = -1;
        }
      }

      // 构建摩尔斯码字符串
      let morseCode = '';
      let lastEndTime = segments.length > 0 ? segments[0].startTime : 0;

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        // 检查是否需要添加空格（字符间隔或单词间隔）
        if (i > 0) {
          const gap = segment.startTime - lastEndTime;

          // 调整间隔阈值，使其更合理
          const charSeparationThreshold = Math.max(settings.dashThreshold * settings.charSeparationMultiplier, settings.dotThreshold * (settings.charSeparationMultiplier * 2));
          const wordSeparationThreshold = Math.max(settings.dashThreshold * settings.wordSeparationMultiplier, settings.dotThreshold * (settings.wordSeparationMultiplier * 2));

          if (gap > wordSeparationThreshold) {
            morseCode += ' / '; // 单词间隔
          } else if (gap > charSeparationThreshold) {
            morseCode += ' '; // 字符间隔
          }
        }

        morseCode += segment.type === 'dot' ? '.' : '-';
        lastEndTime = segment.endTime;
      }

      // 如果没有检测到任何间隔，尝试基于时间自动添加字符分隔
      if (settings.autoAddSpaces && segments.length > 0 && !morseCode.includes(' ')) {
        // 重新构建带有基于时间的字符分隔的摩尔斯码
        morseCode = '';
        let currentCharacter = '';

        for (let i = 0; i < segments.length; i++) {
          const segment = segments[i];
          const nextSegment = segments[i + 1];

          currentCharacter += segment.type === 'dot' ? '.' : '-';

          if (nextSegment) {
            const gap = nextSegment.startTime - segment.endTime;
            // 使用更宽松的阈值来检测字符间隔
            const minCharSeparation = Math.max(settings.dotThreshold * 2, 0.1);

            if (gap > minCharSeparation) {
              morseCode += currentCharacter + ' ';
              currentCharacter = '';
            }
          } else {
            // 最后一个字符
            morseCode += currentCharacter;
          }
        }

        // 如果仍然没有空格，按照标准时长强制添加字符分隔
        if (!morseCode.includes(' ') && segments.length > 1) {
          morseCode = '';
          let signalCount = 0;
          const avgSignalDuration = segments.reduce((sum, s) => sum + (s.endTime - s.startTime), 0) / segments.length;

          for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            morseCode += segment.type === 'dot' ? '.' : '-';
            signalCount++;

            // 智能字符分隔：基于信号长度和数量
            const shouldSeparate =
              signalCount >= 2 && // 至少2个信号
              signalCount <= 6 && // 最多6个信号构成一个字符
              (signalCount === 5 || // 5个信号很可能是一个字符
               (signalCount >= 3 && i % 4 === 3)); // 每4个信号中的第3个分隔

            if (shouldSeparate && i < segments.length - 1) {
              morseCode += ' ';
              signalCount = 0;
            }
          }
        }
      }

      // 解码摩尔斯码
      const decodedText = morseToText(morseCode.trim());

      // 计算置信度（简化版本）
      const confidence = Math.min(segments.length * 0.05, 0.95);

      setAnalysisResult({
        detectedMorse: morseCode.trim(),
        decodedText,
        confidence,
        segments
      });

    } catch (err) {
      console.error('Audio analysis error:', err);
      setError('Failed to analyze audio. Please ensure the file contains clear Morse code signals.');
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, settings]);

  // 音频播放控制
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !audioUrl) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Audio play error:', err);
      setError('Failed to play audio. Please check the file format.');
      setIsPlaying(false);
    }
  }, [isPlaying, audioUrl]);

  const stopAudio = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout
      title="Audio Morse Code Translator: Extract Signals from Sound file"
      description="Decode Morse code from audio files with advanced signal processing. Upload recordings, detect beeps and tones, convert to text automatically."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-4 sm:mb-6 md:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-2">
            Morse Code Audio Translator
          </h1>
          <p className="text-sm sm:text-base md:text-sm lg:text-lg text-gray-600 dark:text-gray-400">
          Extract the exact Morse code from audio file and decode it to text
          </p>
        </header>

        <div className="space-y-6">
          {/* Audio File Upload Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Audio File Upload
              </h2>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>

            {/* Analysis Settings */}
            {showSettings && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Analysis Settings</h3>

                {/* Preset Configurations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      dotThreshold: 0.1,
                      dashThreshold: 0.3,
                      charSeparationMultiplier: 1.5,
                      wordSeparationMultiplier: 3.0,
                      autoAddSpaces: true,
                      noiseFloor: -35
                    })}
                    className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Fast Morse
                  </button>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      dotThreshold: 0.15,
                      dashThreshold: 0.45,
                      charSeparationMultiplier: 2.0,
                      wordSeparationMultiplier: 4.0,
                      autoAddSpaces: true,
                      noiseFloor: -40
                    })}
                    className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      dotThreshold: 0.2,
                      dashThreshold: 0.6,
                      charSeparationMultiplier: 3.0,
                      wordSeparationMultiplier: 6.0,
                      autoAddSpaces: true,
                      noiseFloor: -45
                    })}
                    className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    Slow Morse
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Dot Duration Threshold (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.05"
                      max="0.5"
                      value={settings.dotThreshold}
                      onChange={(e) => setSettings(prev => ({ ...prev, dotThreshold: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Dash Duration Threshold (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.1"
                      max="1.0"
                      value={settings.dashThreshold}
                      onChange={(e) => setSettings(prev => ({ ...prev, dashThreshold: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Noise Floor (dB)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="-60"
                      max="-10"
                      value={settings.noiseFloor}
                      onChange={(e) => setSettings(prev => ({ ...prev, noiseFloor: parseInt(e.target.value) }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Character Separation Multiplier
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      value={settings.charSeparationMultiplier}
                      onChange={(e) => setSettings(prev => ({ ...prev, charSeparationMultiplier: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Word Separation Multiplier
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="2.0"
                      max="10.0"
                      value={settings.wordSeparationMultiplier}
                      onChange={(e) => setSettings(prev => ({ ...prev, wordSeparationMultiplier: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="autoAddSpaces"
                    checked={settings.autoAddSpaces}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoAddSpaces: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="autoAddSpaces" className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-add spaces when no character separation is detected
                  </label>
                </div>
              </div>
            )}

            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
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
                      {isDragOver ? 'Drop audio file here' : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-xs mt-1 px-2 sm:px-0">
                      Support MP3, WAV, M4A and other audio formats (Max 50MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* File Info */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center">
                      <FileAudio className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pre-analysis Status */}
                  {(isPreAnalyzing || preAnalysisResult) && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        {isPreAnalyzing && (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        )}
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-200">Audio Pre-Analysis</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            {preAnalysisResult}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audio Player */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <audio
                      ref={audioRef}
                      src={audioUrl || undefined}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                      onError={(e) => setError('Failed to load audio file. Please try a different format.')}
                    />

                    <div className="space-y-3">
                      {/* Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlayPause}
                          className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <button
                          onClick={stopAudio}
                          className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                        >
                          <Square className="w-4 h-4" />
                        </button>

                        {/* Time Display */}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        {/* Volume Control */}
                        <div className="flex items-center gap-2 ml-auto">
                          <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-20"
                          />
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <button
                    onClick={analyzeAudio}
                    disabled={isProcessing || isPreAnalyzing}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing Morse Code...
                      </>
                    ) : isPreAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Pre-analyzing Audio...
                      </>
                    ) : (
                      <>
                        <Music className="w-4 h-4" />
                        {preAnalysisResult.includes('✓') ? 'Analyze with Optimized Settings' : 'Analyze Morse Code'}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">Analysis Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Detected Morse Code */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Detected Morse Code
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(analysisResult.detectedMorse)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      title="Copy Morse code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => downloadAsText(analysisResult.detectedMorse, 'morse')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      title="Download Morse code"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-lg font-mono text-gray-900 dark:text-white leading-relaxed">
                    {analysisResult.detectedMorse || 'No Morse code detected'}
                  </p>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Confidence: {(analysisResult.confidence * 100).toFixed(1)}% |
                  Segments detected: {analysisResult.segments.length} |
                  Spaces detected: {analysisResult.detectedMorse.split(' ').length - 1}
                </div>
              </div>

              {/* Decoded Text */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Decoded Text
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(analysisResult.decodedText)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      title="Copy decoded text"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => downloadAsText(analysisResult.decodedText, 'text')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      title="Download decoded text"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                    {analysisResult.decodedText || 'No text decoded'}
                  </p>
                </div>
              </div>

              {/* Signal Analysis Details */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Signal Analysis Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Total Segments:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {analysisResult.segments.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Dots:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {analysisResult.segments.filter(s => s.type === 'dot').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Dashes:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {analysisResult.segments.filter(s => s.type === 'dash').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {(analysisResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Audio-Based Morse Code Decipher Technology
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our advanced <strong>morse audio decoder</strong> system utilizes sophisticated audio signal processing algorithms to automatically detect, analyze, and decode Morse code patterns from recorded audio files. This cutting-edge <strong>Morse code decipher</strong> technology transforms audio signals into readable text, making it an invaluable tool for amateur radio operators, emergency communications specialists, and digital signal processing enthusiasts. For basic text conversion, try our main <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse code translator</a>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Advanced Audio Processing:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Real-time frequency analysis and tone detection</li>
                  <li>• Adaptive noise filtering and signal enhancement</li>
                  <li>• Automatic timing calibration for variable speeds</li>
                  <li>• Multi-format audio file support (MP3, WAV, M4A)</li>
                  <li>• Dynamic threshold adjustment for optimal accuracy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Use Cases:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Emergency communication analysis and documentation</li>
                  <li>• Amateur radio contest recording transcription</li>
                  <li>• Historical audio archive digitization</li>
                  <li>• Training material preparation and assessment</li>
                  <li>• Maritime and aviation communication research</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Whether you're deciphering vintage radio recordings, analyzing emergency transmissions, or processing training materials, our audio-based Morse code decipher provides the accuracy and reliability needed for professional applications.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Related Morse Code Audio Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔊 Morse Code Sound Player</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">Experience authentic morse code beep sounds and audio effects. Listen to SOS signals, download sound files, and learn what morse code sounds like.</p>
              <a href="/decoders/decode-audio/morse-code-sound" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                Try Sound Player →
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📱 Main Translator</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">Convert text to morse code and vice versa with our main translation tool featuring audio playback and visual flash patterns.</p>
              <a href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                Go to Translator →
              </a>
            </div>
          </div>
        </div>

        {/* Instructions and Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            How to Use the Morse Audio Decoder
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2 mt-0.5">1.</span>
              <span>Upload an audio file containing Morse code signals (MP3, WAV, M4A formats supported)</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2 mt-0.5">2.</span>
              <span>Adjust analysis settings if needed (dot/dash thresholds, noise floor)</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2 mt-0.5">3.</span>
              <span>Use the audio player to preview your file and locate Morse code sections</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2 mt-0.5">4.</span>
              <span>Click "Analyze Morse Code" to extract and decode the signals</span>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">Tips for Best Results:</h4>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• Use clear audio recordings with minimal background noise</li>
            <li>• Ensure consistent tone frequency (typically 400-1200 Hz works best)</li>
            <li>• Maintain proper timing ratios: dash = 3x dot duration</li>
            <li>• Allow adequate spacing between characters and words</li>
            <li>• For better accuracy, use audio with bit rates of 128kbps or higher</li>
            <li>• If no spaces are detected, enable "Auto-add spaces" or adjust separation multipliers</li>
            <li>• Character separation multiplier: controls spacing between letters (1.0-5.0)</li>
            <li>• Word separation multiplier: controls spacing between words (2.0-10.0)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default DecodeAudio;