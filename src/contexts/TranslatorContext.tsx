import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { textToMorse, morseToText } from '../utils/morseCode';
import { useMorseSettings } from './MorseSettingsContext';
import { useHistory } from './HistoryContext';

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

  const handleTextChange = useCallback((newText: string) => {
    const newMorse = textToMorse(newText, showSlash);
    lastUpdateSourceRef.current = 'text';
    update(newText, newMorse);
  }, [showSlash, update]);

  const handleMorseChange = useCallback((newMorse: string) => {
    const newText = morseToText(newMorse);
    lastUpdateSourceRef.current = 'morse';
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