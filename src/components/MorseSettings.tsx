import React from 'react';
import { useMorseSettings } from '../contexts/MorseSettingsContext';
import { useTranslator } from '../contexts/TranslatorContext';
import { useI18n } from '../contexts/I18nContext';

export function MorseSettings() {
  const { showSlash, toggleSlash } = useMorseSettings();
  const { updateMorseDisplay } = useTranslator();
  const { t } = useI18n();

  const handleToggle = () => {
    toggleSlash();
    updateMorseDisplay();
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={showSlash}
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        {t('translatorBox.showWordSeparators')}
      </span>
    </label>
  );
}