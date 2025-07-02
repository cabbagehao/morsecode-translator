import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface MorseAudioSettings {
  speed: number; // 播放速度倍率 (0.5-3.0)
  frequency: number; // 音频频率 Hz (200-1000)
  wpm: number; // 每分钟字符数 (5-50)
  dotLength: number; // 点的长度(ms)，基于WPM计算
}

interface MorseSettings {
  showSlash: boolean;
  audioSettings: MorseAudioSettings;
  isPlaying: boolean;
  isPaused: boolean;
  isRepeatMode: boolean;
  isLightOn: boolean;
  currentPlayingMorse: string;
  currentPlayPosition: number;
  toggleSlash: () => void;
  updateAudioSettings: (settings: Partial<MorseAudioSettings>) => void;
  resetAudioSettings: () => void;
  playMorse: (morse: string) => Promise<void>;
  pauseMorse: () => void;
  resumeMorse: () => void;
  stopMorse: () => void;
  repeatMorse: () => Promise<void>;
  toggleRepeatMode: () => void;
}

const MorseSettingsContext = createContext<MorseSettings | undefined>(undefined);

// 计算基于WPM的点长度
const calculateDotLength = (wpm: number): number => {
  // PARIS 是标准单词，包含50个单位（点、划、间隔）
  // 1分钟 = 60000ms，所以每个单位的时间 = 60000 / (wpm * 50)
  return Math.round(60000 / (wpm * 50));
};

export function MorseSettingsProvider({ children }: { children: React.ReactNode }) {
  const [showSlash, setShowSlash] = useState(true);
  const [audioSettings, setAudioSettings] = useState<MorseAudioSettings>({
    speed: 1.0,
    frequency: 600,
    wpm: 20,
    dotLength: calculateDotLength(20)
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRepeatMode, setIsRepeatMode] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [currentPlayingMorse, setCurrentPlayingMorse] = useState('');
  const [currentPlayPosition, setCurrentPlayPosition] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentTimeoutRef = useRef<number | null>(null);
  const playbackStateRef = useRef<{
    morse: string;
    position: number;
    timeouts: number[];
  }>({ morse: '', position: 0, timeouts: [] });

  const toggleSlash = () => {
    setShowSlash(!showSlash);
  };

  const updateAudioSettings = useCallback((settings: Partial<MorseAudioSettings>) => {
    setAudioSettings(prev => {
      const newSettings = { ...prev, ...settings };
      // 如果WPM改变了，重新计算点长度
      if (settings.wpm !== undefined) {
        newSettings.dotLength = calculateDotLength(settings.wpm);
      }
      return newSettings;
    });
  }, []);

  const resetAudioSettings = useCallback(() => {
    const defaultSettings = {
      speed: 1.0,
      frequency: 600,
      wpm: 20,
      dotLength: calculateDotLength(20)
    };
    setAudioSettings(defaultSettings);
  }, []);

  const toggleRepeatMode = useCallback(() => {
    setIsRepeatMode(prev => {
      // 如果要关闭重复模式且当前正在播放，清理所有超时并停止播放
      if (prev && (isPlaying || isPaused)) {
        // 清除所有超时
        playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
        playbackStateRef.current.timeouts = [];
        
        if (currentTimeoutRef.current) {
          clearTimeout(currentTimeoutRef.current);
          currentTimeoutRef.current = null;
        }

        setIsPlaying(false);
        setIsPaused(false);
        setIsLightOn(false);
        setCurrentPlayingMorse('');
        setCurrentPlayPosition(-1);
        playbackStateRef.current = { morse: '', position: 0, timeouts: [] };
      }
      return !prev;
    });
  }, [isPlaying, isPaused]);

  // 获取或创建音频上下文
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 播放音频音调
  const playTone = useCallback((frequency: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      // 添加渐入渐出效果
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + duration / 1000 - 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);

      setTimeout(resolve, duration);
    });
  }, [getAudioContext]);

  // 停止所有播放
  const stopMorse = useCallback(() => {
    // 清除所有超时
    playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    playbackStateRef.current.timeouts = [];
    
    if (currentTimeoutRef.current) {
      clearTimeout(currentTimeoutRef.current);
      currentTimeoutRef.current = null;
    }

    setIsPlaying(false);
    setIsPaused(false);
    setIsLightOn(false);
    setCurrentPlayingMorse('');
    setCurrentPlayPosition(-1);
    playbackStateRef.current = { morse: '', position: 0, timeouts: [] };
  }, []);

  // 播放摩尔斯电码
  const playMorse = useCallback(async (morse: string) => {
    stopMorse(); // 先停止当前播放
    
    if (!morse.trim()) return;

    setIsPlaying(true);
    setCurrentPlayingMorse(morse);
    setCurrentPlayPosition(0);
    setIsLightOn(false);
    playbackStateRef.current = { morse, position: 0, timeouts: [] };

    const { frequency, dotLength, speed } = audioSettings;
    const actualDotLength = dotLength / speed;
    const dashLength = actualDotLength * 3;
    const symbolGap = actualDotLength; // 符号间间隔
    const letterGap = actualDotLength * 3; // 字母间间隔
    const wordGap = actualDotLength * 7; // 单词间间隔

    let totalDelay = 0;

    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      
      if (char === '.') {
        // 设置播放位置
        const positionTimeout = setTimeout(() => {
          setCurrentPlayPosition(i);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(positionTimeout);
        
        // 音频播放
        const audioTimeout = setTimeout(() => {
          playTone(frequency, actualDotLength);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(audioTimeout);
        
        // 灯光开启
        const lightOnTimeout = setTimeout(() => {
          setIsLightOn(true);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(lightOnTimeout);
        
        // 灯光关闭
        const lightOffTimeout = setTimeout(() => {
          setIsLightOn(false);
        }, totalDelay + actualDotLength);
        playbackStateRef.current.timeouts.push(lightOffTimeout);
        
        totalDelay += actualDotLength + symbolGap;
      } else if (char === '-') {
        // 设置播放位置
        const positionTimeout = setTimeout(() => {
          setCurrentPlayPosition(i);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(positionTimeout);
        
        // 音频播放
        const audioTimeout = setTimeout(() => {
          playTone(frequency, dashLength);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(audioTimeout);
        
        // 灯光开启
        const lightOnTimeout = setTimeout(() => {
          setIsLightOn(true);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(lightOnTimeout);
        
        // 灯光关闭
        const lightOffTimeout = setTimeout(() => {
          setIsLightOn(false);
        }, totalDelay + dashLength);
        playbackStateRef.current.timeouts.push(lightOffTimeout);
        
        totalDelay += dashLength + symbolGap;
      } else if (char === ' ') {
        // 设置播放位置
        const positionTimeout = setTimeout(() => {
          setCurrentPlayPosition(i);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(positionTimeout);
        
        totalDelay += letterGap;
      } else if (char === '/') {
        // 设置播放位置
        const positionTimeout = setTimeout(() => {
          setCurrentPlayPosition(i);
        }, totalDelay);
        playbackStateRef.current.timeouts.push(positionTimeout);
        
        totalDelay += wordGap;
      }
    }

    // 设置播放结束的超时
    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      setIsLightOn(false);
      setCurrentPlayPosition(-1);
      
      // 检查当前的重复模式状态（避免闭包问题）
      setIsRepeatMode(currentRepeatMode => {
        if (currentRepeatMode) {
          // 如果重复模式开启，500ms后重新播放
          const repeatTimeout = setTimeout(() => {
            playMorse(morse);
          }, 500);
          playbackStateRef.current.timeouts.push(repeatTimeout);
        } else {
          setCurrentPlayingMorse('');
          playbackStateRef.current = { morse: '', position: 0, timeouts: [] };
        }
        return currentRepeatMode;
      });
    }, totalDelay);
    
    playbackStateRef.current.timeouts.push(endTimeout);
  }, [audioSettings, playTone, stopMorse, isRepeatMode]);

  const pauseMorse = useCallback(() => {
    if (!isPlaying) return;
    
    // 清除所有超时
    playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    playbackStateRef.current.timeouts = [];
    
    setIsPaused(true);
    setIsPlaying(false);
  }, [isPlaying]);

  const resumeMorse = useCallback(() => {
    if (!isPaused || !currentPlayingMorse) return;
    
    setIsPaused(false);
    playMorse(currentPlayingMorse);
  }, [isPaused, currentPlayingMorse, playMorse]);

  const repeatMorse = useCallback(async () => {
    if (!currentPlayingMorse) return;
    
    await playMorse(currentPlayingMorse);
  }, [currentPlayingMorse, playMorse]);

  const value = {
    showSlash,
    audioSettings,
    isPlaying,
    isPaused,
    isRepeatMode,
    isLightOn,
    currentPlayingMorse,
    currentPlayPosition,
    toggleSlash,
    updateAudioSettings,
    resetAudioSettings,
    playMorse,
    pauseMorse,
    resumeMorse,
    stopMorse,
    repeatMorse,
    toggleRepeatMode
  };

  return (
    <MorseSettingsContext.Provider value={value}>
      {children}
    </MorseSettingsContext.Provider>
  );
}

export function useMorseSettings() {
  const context = useContext(MorseSettingsContext);
  if (context === undefined) {
    throw new Error('useMorseSettings must be used within a MorseSettingsProvider');
  }
  return context;
}