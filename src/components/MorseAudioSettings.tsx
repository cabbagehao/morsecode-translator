import React from 'react';
import { X, Volume2, Zap, Clock, RotateCcw } from 'lucide-react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { useI18n } from '../contexts/I18nContext';

interface MorseAudioSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MorseAudioSettings({ isOpen, onClose }: MorseAudioSettingsProps) {
  const { audioSettings, updateAudioSettings, resetAudioSettings } = useMorseSettings();
  const { t } = useI18n();

  if (!isOpen) return null;

  const handleSpeedChange = (speed: number) => {
    updateAudioSettings({ speed });
  };

  const handleFrequencyChange = (frequency: number) => {
    updateAudioSettings({ frequency });
  };

  const handleWpmChange = (wpm: number) => {
    updateAudioSettings({ wpm });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('audioSettings.title')}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-6">
          {/* Speed Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-blue-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('audioSettings.playbackSpeed')} ({audioSettings.speed}x)
              </label>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={audioSettings.speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{t('audioSettings.speeds.0.5x')}</span>
              <span>{t('audioSettings.speeds.1.0x')}</span>
              <span>{t('audioSettings.speeds.2.0x')}</span>
              <span>{t('audioSettings.speeds.3.0x')}</span>
            </div>
          </div>

          {/* Frequency Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-green-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('audioSettings.audioFrequency')} ({audioSettings.frequency} Hz)
              </label>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="25"
              value={audioSettings.frequency}
              onChange={(e) => handleFrequencyChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{t('audioSettings.frequencies.200Hz')}</span>
              <span>{t('audioSettings.frequencies.600Hz')}</span>
              <span>{t('audioSettings.frequencies.1000Hz')}</span>
            </div>
          </div>

          {/* WPM Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('audioSettings.wordsPerMinute')} ({audioSettings.wpm} WPM)
              </label>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={audioSettings.wpm}
              onChange={(e) => handleWpmChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{t('audioSettings.wpm.5')}</span>
              <span>{t('audioSettings.wpm.20')}</span>
              <span>{t('audioSettings.wpm.35')}</span>
              <span>{t('audioSettings.wpm.50')}</span>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={resetAudioSettings}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('audioSettings.resetToDefault')}
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>{t('audioSettings.tip')}</strong> {t('audioSettings.wpmDescription')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {t('audioSettings.applySettings')}
          </button>
        </div>
      </div>
    </div>
  );
}