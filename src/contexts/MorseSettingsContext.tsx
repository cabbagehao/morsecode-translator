import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

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

interface PlaybackState {
  morse: string;
  position: number;
  timeouts: number[];
}

interface AudioNode {
  oscillator: OscillatorNode;
  gainNode: GainNode;
  startTime: number;
  stopTime: number;
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
  
  const audioContextRef = useRef<AudioContext>();
  const currentTimeoutRef = useRef<number | null>(null);
  const activeAudioNodesRef = useRef<AudioNode[]>([]);
  const playbackStateRef = useRef<PlaybackState>({
    morse: '',
    position: 0,
    timeouts: []
  });

  // 声明函数类型
  type PlayMorseFunction = (morse: string) => Promise<void>;
  type PlayMorseFromPositionFunction = (morse: string, startPosition: number) => Promise<void>;
  type RepeatMorseFunction = () => Promise<void>;

  // 前向声明函数
  const playMorseRef = useRef<PlayMorseFunction>();
  const playMorseFromPositionRef = useRef<PlayMorseFromPositionFunction>();
  const repeatMorseRef = useRef<RepeatMorseFunction>();

  // Initialize AudioContext on mount
  useEffect(() => {
    const initAudioContext = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        // Resume the audio context if it's not running
        if (audioContextRef.current.state !== 'running') {
          await audioContextRef.current.resume();
        }
      }
    };

    initAudioContext().catch(console.error);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

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
    // 只改变重复模式标志，不影响当前播放状态
    console.log('[Audio Debug] Toggling repeat mode');
    setIsRepeatMode(prev => !prev);
  }, []);

  // 获取或创建 AudioContext
  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // 播放音频音调
  const playTone = useCallback((frequency: number, duration: number, startTime: number): void => {
    console.log(`[Audio Debug] Scheduling tone at ${new Date(startTime * 1000).toISOString()}, frequency: ${frequency}, duration: ${duration}ms`);
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = 'sine';

    // 添加渐入渐出效果
    const fadeTime = Math.min(0.01, duration / 1000 / 4);
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + fadeTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + duration / 1000 - fadeTime);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration / 1000);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);

    // 记录活动的音频节点
    activeAudioNodesRef.current.push({
      oscillator,
      gainNode,
      startTime,
      stopTime: startTime + duration / 1000
    });
  }, [getAudioContext]);

  // 停止播放
  const stopMorse = useCallback(() => {
    console.log('[Audio Debug] Stopping morse code playback');
    // 清除所有超时
    playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    playbackStateRef.current.timeouts = [];

    // 停止所有活动的音频节点
    activeAudioNodesRef.current.forEach(node => {
      try {
        const { oscillator, gainNode } = node;
        const audioContext = getAudioContext();
        const currentTime = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.05);
        oscillator.stop(currentTime + 0.05);
      } catch (error) {
        console.error('Error stopping audio node:', error);
      }
    });
    activeAudioNodesRef.current = [];

    // 重置状态
    setIsPlaying(false);
    setIsPaused(false);
    setIsLightOn(false);
    setCurrentPlayPosition(-1);
    setCurrentPlayingMorse('');
    playbackStateRef.current = { morse: '', position: 0, timeouts: [] };
  }, []);

  // 重复播放
  const repeatMorse: RepeatMorseFunction = useCallback(async () => {
    if (currentPlayingMorse) {
      await playMorseRef.current?.(currentPlayingMorse);
    }
  }, [currentPlayingMorse]);

  // 从指定位置播放摩尔斯电码
  const playMorseFromPosition: PlayMorseFromPositionFunction = useCallback(async (morse, startPosition) => {
    console.log(`[Audio Debug] Playing morse from position ${startPosition}: ${morse}`);
    const audioContext = getAudioContext();
    if (audioContext.state !== 'running') {
      await audioContext.resume();
    }

    let currentTime = audioContext.currentTime;
    const { frequency, dotLength } = audioSettings;
    const dashLength = dotLength * 3;
    const symbolGap = dotLength;
    const letterGap = dotLength * 3;
    const wordGap = dotLength * 7;

    // 清除之前的所有超时和状态
    playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    playbackStateRef.current.timeouts = [];
    setIsLightOn(false);

    // 遍历摩尔斯电码字符
    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      const currentPosition = startPosition + i;
      const scheduleTime = currentTime;

      // 调度高亮位置的更新
      const positionTimeout = setTimeout(() => {
        console.log(`[Audio Debug] Setting position to ${currentPosition} for character '${char}'`);
        setCurrentPlayPosition(currentPosition);
        if (char === '.' || char === '-') {
          setIsLightOn(true);
        } else {
          setIsLightOn(false);
        }
      }, Math.max(0, (scheduleTime - audioContext.currentTime) * 1000));

      playbackStateRef.current.timeouts.push(positionTimeout);

      if (char === '.') {
        playTone(frequency, dotLength, currentTime);
        // 调度关闭灯光
        const lightOffTimeout = setTimeout(() => {
          setIsLightOn(false);
        }, Math.max(0, (currentTime + dotLength / 1000 - audioContext.currentTime) * 1000));
        playbackStateRef.current.timeouts.push(lightOffTimeout);
        currentTime += dotLength / 1000;
      } else if (char === '-') {
        playTone(frequency, dashLength, currentTime);
        // 调度关闭灯光
        const lightOffTimeout = setTimeout(() => {
          setIsLightOn(false);
        }, Math.max(0, (currentTime + dashLength / 1000 - audioContext.currentTime) * 1000));
        playbackStateRef.current.timeouts.push(lightOffTimeout);
        currentTime += dashLength / 1000;
      } else if (char === ' ') {
        currentTime += symbolGap / 1000;
      } else if (char === '/') {
        currentTime += wordGap / 1000;
      }

      // 添加字符间隔
      if (i < morse.length - 1 && morse[i] !== ' ' && morse[i] !== '/') {
        currentTime += letterGap / 1000;
      }
    }

    // 设置播放完成的超时
    const totalDuration = Math.max(0, (currentTime - audioContext.currentTime) * 1000);
    const timeout = setTimeout(() => {
      console.log('[Audio Debug] Playback finished');
      
      // 检查是否处于重复模式
      if (isRepeatMode) {
        console.log('[Audio Debug] Repeat mode is on, restarting playback');
        // 如果是重复模式，重新开始播放
        const fullMorse = playbackStateRef.current.morse;
        // 保持播放状态，但重置位置
        setCurrentPlayPosition(0);
        // 从头开始播放
        playMorseFromPositionRef.current?.(fullMorse, 0);
      } else {
        // 非重复模式，正常结束播放
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPlayPosition(-1);
        setIsLightOn(false);
      }
    }, totalDuration);

    playbackStateRef.current.timeouts.push(timeout);
  }, [audioSettings, playTone, isRepeatMode]);

  // 播放摩尔斯电码
  const playMorse: PlayMorseFunction = useCallback(async (morse) => {
    console.log(`[Audio Debug] Starting playMorse at ${new Date().toISOString()}, morse length: ${morse.length}`);
    stopMorse(); // 先停止当前播放
    
    if (!morse.trim()) return;

    // 确保 AudioContext 已初始化并处于运行状态
    const audioContext = getAudioContext();
    console.log(`[Audio Debug] AudioContext state: ${audioContext.state}`);
    if (audioContext.state !== 'running') {
      await audioContext.resume();
    }

    setIsPlaying(true);
    setCurrentPlayingMorse(morse);
    setCurrentPlayPosition(0);
    setIsLightOn(false);
    
    // 初始化播放状态
    playbackStateRef.current = {
      morse,
      position: 0,
      timeouts: []
    };

    // 从头开始播放
    await playMorseFromPositionRef.current?.(morse, 0);
  }, [stopMorse]);

  // 暂停播放
  const pauseMorse = useCallback(() => {
    console.log('[Audio Debug] Pausing morse code playback');
    
    // 保存当前播放位置
    playbackStateRef.current.position = currentPlayPosition;
    console.log(`[Audio Debug] Saving current position: ${currentPlayPosition}`);
    
    // 清除所有未执行的超时
    playbackStateRef.current.timeouts.forEach(timeout => clearTimeout(timeout));
    playbackStateRef.current.timeouts = [];

    // 停止所有活动的音频节点
    activeAudioNodesRef.current.forEach(node => {
      const { oscillator, gainNode } = node;
      const audioContext = getAudioContext();
      const currentTime = audioContext.currentTime;
      
      gainNode.gain.cancelScheduledValues(currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.05);
      oscillator.stop(currentTime + 0.05);
    });
    
    // 清空活动音频节点列表
    activeAudioNodesRef.current = [];
    
    // 更新状态
    setIsPaused(true);
    setIsPlaying(false);
    setIsLightOn(false);
  }, [currentPlayPosition]);

  // 恢复播放
  const resumeMorse = useCallback(() => {
    console.log('[Audio Debug] Resuming morse code playback');
    const currentState = playbackStateRef.current;
    if (currentState && currentState.morse) {
      // 清除所有现有的超时和状态
      currentState.timeouts.forEach(timeout => clearTimeout(timeout));
      currentState.timeouts = [];
      setIsLightOn(false);

      setIsPaused(false);
      setIsPlaying(true);
      
      // 从当前位置继续播放
      const remainingMorse = currentState.morse.slice(currentState.position);
      console.log(`[Audio Debug] Resuming from position ${currentState.position}, remaining morse: ${remainingMorse}`);
      
      // 重置播放状态以继续播放
      playbackStateRef.current = {
        morse: currentState.morse,
        position: currentState.position,
        timeouts: []
      };
      
      // 从当前位置开始播放剩余的摩尔斯电码
      playMorseFromPositionRef.current?.(remainingMorse, currentState.position);
    }
  }, []);

  // 更新函数引用
  useEffect(() => {
    playMorseRef.current = playMorse;
    playMorseFromPositionRef.current = playMorseFromPosition;
    repeatMorseRef.current = repeatMorse;
  }, [playMorse, playMorseFromPosition, repeatMorse]);

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