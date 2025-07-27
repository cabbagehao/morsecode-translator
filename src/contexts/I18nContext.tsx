import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, getTranslation } from '../i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale || defaultLocale);

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    // Store the locale preference
    localStorage.setItem('preferred-locale', newLocale);
  };

  useEffect(() => {
    // Load stored locale preference on mount
    const stored = localStorage.getItem('preferred-locale') as Locale;
    if (stored && !initialLocale) {
      setLocale(stored);
    }
  }, [initialLocale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};