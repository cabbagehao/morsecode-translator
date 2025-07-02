import React from 'react';
import { X, Volume2, Zap, Clock, RotateCcw } from 'lucide-react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';

interface MorseAudioSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MorseAudioSettings({ isOpen, onClose }: MorseAudioSettingsProps) {
  const { audioSettings, updateAudioSettings, resetAudioSettings } = useMorseSettings();

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
            Audio Settings
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
                Playback Speed ({audioSettings.speed}x)
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
              <span>0.5x</span>
              <span>1.0x</span>
              <span>2.0x</span>
              <span>3.0x</span>
            </div>
          </div>

          {/* Frequency Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-green-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Audio Frequency ({audioSettings.frequency} Hz)
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
              <span>200Hz</span>
              <span>600Hz</span>
              <span>1000Hz</span>
            </div>
          </div>

          {/* WPM Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Words Per Minute ({audioSettings.wpm} WPM)
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
              <span>5 WPM</span>
              <span>20 WPM</span>
              <span>35 WPM</span>
              <span>50 WPM</span>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={resetAudioSettings}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Tip:</strong> WPM (Words Per Minute) is the standard Morse code speed unit.
              The standard word "PARIS" is used for timing calculation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}