import { en } from './locales/en';
import { ko } from './locales/ko';
import { es } from './locales/es';
import { ru } from './locales/ru';

export type Locale = 'en' | 'ko' | 'es' | 'ru';

export const translations = {
  en,
  ko,
  es,
  ru,
};

export const locales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export const defaultLocale: Locale = 'en';

export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};