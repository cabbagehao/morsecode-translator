import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { textToMorse, morseToText } from '../utils/morseCode';
import { useMorseSettings } from './MorseSettingsContext';
import { useHistory } from './HistoryContext';

// 用户行为追踪工具函数
const trackUserBehavior = (action: string, details?: any) => {
  // 记录到 Google Analytics (如果可用)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: 'User_Interaction',
      event_label: details?.inputType || 'unknown',
      custom_map: {
        first_interaction: details?.isFirstInteraction || false,
        session_time: details?.sessionTime || 0
      }
    });
  }

  // 记录到本地存储以便分析
  if (typeof window !== 'undefined') {
    const behaviorLogs = JSON.parse(localStorage.getItem('user_behavior_logs') || '[]');
    behaviorLogs.push({
      timestamp: new Date().toISOString(),
      action,
      ...details
    });
    
    // 只保留最近100条记录
    if (behaviorLogs.length > 100) {
      behaviorLogs.splice(0, behaviorLogs.length - 100);
    }
    
    localStorage.setItem('user_behavior_logs', JSON.stringify(behaviorLogs));
  }

  // 在开发环境中输出到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log('User Behavior:', action, details);
  }
};

interface TranslatorContextType {
  text: string;
  morse: string;
  setText: (value: string) => void;
  setMorse: (value: string) => void;
  handleTextChange: (newText: string) => void;
  handleMorseChange: (newMorse: string) => void;
  updateMorseDisplay: () => void;
}

const TranslatorContext = createContext<TranslatorContextType | undefined>(undefined);

export function TranslatorProvider({ children }: { children: React.ReactNode }) {
  const { showSlash } = useMorseSettings();
  const { state, update, undo, redo } = useHistory();
  const lastUpdateSourceRef = useRef<'text' | 'morse' | 'settings'>('text');
  
  // 行为追踪相关状态
  const sessionStartTime = useRef<number>(Date.now());
  const hasInteracted = useRef<boolean>(false);
  const firstInteractionType = useRef<'text' | 'morse' | null>(null);

  const handleTextChange = useCallback((newText: string) => {
    const newMorse = textToMorse(newText, showSlash);
    lastUpdateSourceRef.current = 'text';
    
    // 追踪用户行为
    const isFirstInteraction = !hasInteracted.current;
    if (isFirstInteraction) {
      hasInteracted.current = true;
      firstInteractionType.current = 'text';
      
      trackUserBehavior('first_interaction', {
        inputType: 'text',
        isFirstInteraction: true,
        sessionTime: Date.now() - sessionStartTime.current,
        textLength: newText.length
      });
    } else if (newText.trim() !== '') {
      trackUserBehavior('text_input', {
        inputType: 'text',
        isFirstInteraction: false,
        sessionTime: Date.now() - sessionStartTime.current,
        textLength: newText.length,
        firstInteractionWas: firstInteractionType.current
      });
    }
    
    update(newText, newMorse);
  }, [showSlash, update]);

  const handleMorseChange = useCallback((newMorse: string) => {
    const newText = morseToText(newMorse);
    lastUpdateSourceRef.current = 'morse';
    
    // 追踪用户行为
    const isFirstInteraction = !hasInteracted.current;
    if (isFirstInteraction) {
      hasInteracted.current = true;
      firstInteractionType.current = 'morse';
      
      trackUserBehavior('first_interaction', {
        inputType: 'morse',
        isFirstInteraction: true,
        sessionTime: Date.now() - sessionStartTime.current,
        morseLength: newMorse.length
      });
    } else if (newMorse.trim() !== '') {
      trackUserBehavior('morse_input', {
        inputType: 'morse',
        isFirstInteraction: false,
        sessionTime: Date.now() - sessionStartTime.current,
        morseLength: newMorse.length,
        firstInteractionWas: firstInteractionType.current
      });
    }
    
    update(newText, newMorse);
  }, [update]);

  const updateMorseDisplay = useCallback(() => {
    // Only update the morse display when the source was text change or settings change
    if (lastUpdateSourceRef.current !== 'morse') {
      const newMorse = textToMorse(state.present.text, showSlash);
      if (newMorse !== state.present.morse) {
        lastUpdateSourceRef.current = 'settings';
        update(state.present.text, newMorse);
      }
    }
  }, [state.present.text, state.present.morse, showSlash, update]);

  useEffect(() => {
    // Update morse display only when showSlash changes
    updateMorseDisplay();
  }, [showSlash, updateMorseDisplay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const value = {
    text: state.present.text,
    morse: state.present.morse,
    setText: handleTextChange,
    setMorse: handleMorseChange,
    handleTextChange,
    handleMorseChange,
    updateMorseDisplay,
  };

  return (
    <TranslatorContext.Provider value={value}>
      {children}
    </TranslatorContext.Provider>
  );
}

export function useTranslator() {
  const context = useContext(TranslatorContext);
  if (context === undefined) {
    throw new Error('useTranslator must be used within a TranslatorProvider');
  }
  return context;
}