import React, { useEffect, useRef } from 'react';
import { Copy, Slash } from 'lucide-react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { useTranslator } from '../contexts/TranslatorContext';

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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          {showSettings && (
            <button
              onClick={toggleSlash}
              className={`p-2 rounded-full transition-colors group relative ${
                showSlash 
                  ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50' 
                  : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Show word separators"
            >
              <Slash className="w-5 h-5" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Show word separators
              </span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-base font-light tracking-tight"
        placeholder={`Enter ${label.toLowerCase()} here...`}
      />
    </div>
  );
}