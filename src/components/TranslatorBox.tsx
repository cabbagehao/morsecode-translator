import React, { useEffect, useRef } from 'react';
import { Copy, Slash, AlertTriangle } from 'lucide-react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { useTranslator } from '../contexts/TranslatorContext';
import { validateMorseCode } from '../utils/morseCode';

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
  const { showSlash, toggleSlash } = useMorseSettings();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
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
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full h-32 sm:h-40 p-3 sm:p-4 border rounded-lg focus:ring-2 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm sm:text-base font-light tracking-tight ${
          hasErrors 
            ? 'border-red-300 dark:border-red-700 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
        }`}
        placeholder={`Enter ${label.toLowerCase()} here...`}
      />
      {hasErrors && (
        <div className="mt-2 flex items-start gap-2 text-red-600 dark:text-red-400 text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Invalid characters found: {morseValidation.invalidChars.join(', ')}. 
            Only dots (.), dashes (-), spaces, and forward slashes (/) are allowed.
          </span>
        </div>
      )}
    </div>
  );
}