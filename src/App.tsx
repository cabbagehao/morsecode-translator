import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import TranslatorBox from './components/TranslatorBox';
import Instructions from './components/Instructions';
import { TranslatorI18n } from './components/TranslatorI18n';
import { I18nProvider, useI18n } from './contexts/I18nContext';
import { useTranslator } from './contexts/TranslatorContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useAdvancedPreload } from './hooks/useAdvancedPreload';
import './utils/behaviorAnalytics'; // 导入行为分析工具
import { ArrowDownUp } from 'lucide-react';
import { Locale, defaultLocale } from './i18n';
import { LazyRoute } from './components/LazyRoute';

// 核心页面直接导入（常用页面）
import Learn from './pages/Learn';
import Sheet from './pages/Sheet';

// 其他页面懒加载（不常用页面）
const History = React.lazy(() => import('./pages/History'));
const BasicAndTips = React.lazy(() => import('./pages/BasicAndTips'));
const MorseCodeSheet = React.lazy(() => import('./pages/MorseCodeSheet'));
const CommonWords = React.lazy(() => import('./pages/CommonWords'));
const CommonPhrases = React.lazy(() => import('./pages/CommonPhrases'));
const CommonAbbr = React.lazy(() => import('./pages/CommonAbbr'));
const TxtToMorseEncoder = React.lazy(() => import('./pages/TxtToMorseEncoder'));
const DecodeText = React.lazy(() => import('./pages/DecodeText'));
const DecodeImage = React.lazy(() => import('./pages/DecodeImage'));
const DecodeAudio = React.lazy(() => import('./pages/DecodeAudio'));
const MorseCodeSound = React.lazy(() => import('./pages/MorseCodeSound'));
const MorseCodeAlphabet = React.lazy(() => import('./pages/MorseCodeAlphabet'));
const MorseCodeNumbers = React.lazy(() => import('./pages/MorseCodeNumbers'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

// Component for localized home page
function LocalizedTranslator() {
  const location = useLocation();
  // Extract locale from pathname
  const pathLocale = location.pathname.replace('/', '') as Locale;
  const validLocale = ['ko', 'es', 'ru'].includes(pathLocale) ? pathLocale : defaultLocale;
  
  
  return (
    <I18nProvider key={validLocale} initialLocale={validLocale}>
      <TranslatorI18n locale={validLocale} />
    </I18nProvider>
  );
}

// Original English translator (default)
function Translator() {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();
  const { t } = useI18n();

  return (
    <Layout
      title={t('site.title')}
      description={t('site.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-4 sm:mb-6 md:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-2">
            {t('home.title')}
          </h1>
          <p className="text-sm sm:text-base md:text-sm lg:text-lg text-gray-600 dark:text-gray-400">
            {t('home.subtitle')}
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="space-y-4 sm:space-y-6">
            <TranslatorBox
              label={t('home.textLabel')}
              value={text}
              onChange={handleTextChange}
              autoFocus={true}
            />
            <div className="flex justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                <ArrowDownUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </div>
            <TranslatorBox
              label={t('home.morseLabel')}
              value={morse}
              onChange={handleMorseChange}
              showSettings
              isMorseInput={true}
            />
          </div>
        </div>

        <Instructions />

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          {/* Quick Start Guide - 操作指南维度 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.quickStart.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('home.quickStart.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.quickStart.step1.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.quickStart.step1.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.quickStart.step2.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.quickStart.step2.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.quickStart.step3.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.quickStart.step3.description')}</p>
              </div>
            </div>
          </div>

          {/* Advanced Features - 功能特性维度 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('home.features.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.imageProcessing.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.imageProcessing.description')} <a href="/decoders/decode-image" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.features.imageProcessing.linkText')}</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.audioAnalysis.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.audioAnalysis.description')} <a href="/decoders/decode-audio" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.features.audioAnalysis.linkText')}</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.batchProcessing.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.batchProcessing.description')} <a href="/decoders/txt-to-morse" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.features.batchProcessing.linkText1')}</a> {t('home.features.batchProcessing.connector')} <a href="/decoders/decode-text" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.features.batchProcessing.linkText2')}</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.visualSignal.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.visualSignal.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.errorResistant.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.errorResistant.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.multiLanguage.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.multiLanguage.description')}</p>
              </div>
            </div>
          </div>

          {/* Technical Implementation - 技术原理维度 */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.technical.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('home.technical.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.engine.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.engine.description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.ocr.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.ocr.description')} <a href="/decoders/decode-image" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.technical.ocr.linkText')}</a> {t('home.technical.ocr.description2')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.dsp.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.dsp.description')} <a href="/decoders/decode-audio" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.technical.dsp.linkText')}</a> {t('home.technical.dsp.description2')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.education.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.education.description')} <a href="/sheet" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.technical.education.linkText1')}</a> {t('home.technical.education.connector')} <a href="/learn" className="text-blue-600 dark:text-blue-400 hover:underline">{t('home.technical.education.linkText2')}</a> {t('home.technical.education.description2')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Resources - 学习平台维度 */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.training.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('home.training.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('home.training.modules.title')}</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.modules.alphabet')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.modules.vocabulary')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.modules.abbreviations')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.modules.audio')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('home.training.applications.title')}</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.applications.ham')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.applications.emergency')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.applications.historical')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>{t('home.training.applications.stem')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                {t('home.training.popular')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


// 错误边界组件
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <I18nProvider initialLocale="en">
          <ErrorBoundaryContent />
        </I18nProvider>
      );
    }

    return this.props.children;
  }
}

// 分离错误边界内容为函数组件，以便使用 hooks
function ErrorBoundaryContent() {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">{t('error.somethingWentWrong')}</h2>
        <p className="text-gray-600 mb-4">{t('error.failedToLoadPage')}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t('error.reloadPage')}
        </button>
      </div>
    </div>
  );
}

function App() {
  useScrollToTop();
  const { smartPreload } = useAdvancedPreload();
  
  // 在组件挂载后启动预加载
  React.useEffect(() => {
    smartPreload();
  }, [smartPreload]);

  return (
    <ErrorBoundary>
      <Routes>
        {/* Default English routes */}
        <Route path="/" element={<I18nProvider initialLocale="en"><Translator /></I18nProvider>} />
        
        {/* Localized home pages for other languages - place after specific routes */}
        <Route path="/ko" element={<LocalizedTranslator />} />
        <Route path="/es" element={<LocalizedTranslator />} />
        <Route path="/ru" element={<LocalizedTranslator />} />
        
        {/* Core pages - directly imported for instant loading */}
        <Route path="/learn" element={<I18nProvider initialLocale="en"><Learn /></I18nProvider>} />
        <Route path="/sheet" element={<I18nProvider initialLocale="en"><Sheet /></I18nProvider>} />
        
        {/* Multilingual Learn routes */}
        <Route path="/ko/learn" element={
          <I18nProvider initialLocale="ko"><Learn /></I18nProvider>
        } />
        <Route path="/es/learn" element={
          <I18nProvider initialLocale="es"><Learn /></I18nProvider>
        } />
        <Route path="/ru/learn" element={
          <I18nProvider initialLocale="ru"><Learn /></I18nProvider>
        } />
        
        {/* Multilingual Sheet routes */}
        <Route path="/ko/sheet" element={
          <I18nProvider initialLocale="ko"><Sheet /></I18nProvider>
        } />
        <Route path="/es/sheet" element={
          <I18nProvider initialLocale="es"><Sheet /></I18nProvider>
        } />
        <Route path="/ru/sheet" element={
          <I18nProvider initialLocale="ru"><Sheet /></I18nProvider>
        } />
        
        {/* Lazy loaded pages - wrapped with individual Suspense */}
        <Route path="/learn/basic-and-tips" element={
          <LazyRoute><I18nProvider initialLocale="en"><BasicAndTips /></I18nProvider></LazyRoute>
        } />
        <Route path="/learn/history" element={
          <LazyRoute><I18nProvider initialLocale="en"><History /></I18nProvider></LazyRoute>
        } />
        
        {/* Multilingual Learn subpages */}
        <Route path="/ko/learn/basic-and-tips" element={
          <LazyRoute><I18nProvider initialLocale="ko"><BasicAndTips /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/learn/basic-and-tips" element={
          <LazyRoute><I18nProvider initialLocale="es"><BasicAndTips /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/learn/basic-and-tips" element={
          <LazyRoute><I18nProvider initialLocale="ru"><BasicAndTips /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/learn/history" element={
          <LazyRoute><I18nProvider initialLocale="ko"><History /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/learn/history" element={
          <LazyRoute><I18nProvider initialLocale="es"><History /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/learn/history" element={
          <LazyRoute><I18nProvider initialLocale="ru"><History /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/morse-code-sheet" element={
          <LazyRoute><I18nProvider initialLocale="en"><MorseCodeSheet /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/common-abbr" element={
          <LazyRoute><I18nProvider initialLocale="en"><CommonAbbr /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/common-words" element={
          <LazyRoute><I18nProvider initialLocale="en"><CommonWords /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/common-phrases" element={
          <LazyRoute><I18nProvider initialLocale="en"><CommonPhrases /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/morse-code-alphabet" element={
          <LazyRoute><I18nProvider initialLocale="en"><MorseCodeAlphabet /></I18nProvider></LazyRoute>
        } />
        <Route path="/sheet/morse-code-numbers" element={
          <LazyRoute><I18nProvider initialLocale="en"><MorseCodeNumbers /></I18nProvider></LazyRoute>
        } />
        
        {/* Multilingual Sheet subpages */}
        <Route path="/ko/sheet/morse-code-sheet" element={
          <LazyRoute><I18nProvider initialLocale="ko"><MorseCodeSheet /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/morse-code-sheet" element={
          <LazyRoute><I18nProvider initialLocale="es"><MorseCodeSheet /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/morse-code-sheet" element={
          <LazyRoute><I18nProvider initialLocale="ru"><MorseCodeSheet /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/sheet/common-abbr" element={
          <LazyRoute><I18nProvider initialLocale="ko"><CommonAbbr /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/common-abbr" element={
          <LazyRoute><I18nProvider initialLocale="es"><CommonAbbr /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/common-abbr" element={
          <LazyRoute><I18nProvider initialLocale="ru"><CommonAbbr /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/sheet/common-words" element={
          <LazyRoute><I18nProvider initialLocale="ko"><CommonWords /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/common-words" element={
          <LazyRoute><I18nProvider initialLocale="es"><CommonWords /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/common-words" element={
          <LazyRoute><I18nProvider initialLocale="ru"><CommonWords /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/sheet/common-phrases" element={
          <LazyRoute><I18nProvider initialLocale="ko"><CommonPhrases /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/common-phrases" element={
          <LazyRoute><I18nProvider initialLocale="es"><CommonPhrases /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/common-phrases" element={
          <LazyRoute><I18nProvider initialLocale="ru"><CommonPhrases /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/sheet/morse-code-alphabet" element={
          <LazyRoute><I18nProvider initialLocale="ko"><MorseCodeAlphabet /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/morse-code-alphabet" element={
          <LazyRoute><I18nProvider initialLocale="es"><MorseCodeAlphabet /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/morse-code-alphabet" element={
          <LazyRoute><I18nProvider initialLocale="ru"><MorseCodeAlphabet /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/sheet/morse-code-numbers" element={
          <LazyRoute><I18nProvider initialLocale="ko"><MorseCodeNumbers /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/sheet/morse-code-numbers" element={
          <LazyRoute><I18nProvider initialLocale="es"><MorseCodeNumbers /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/sheet/morse-code-numbers" element={
          <LazyRoute><I18nProvider initialLocale="ru"><MorseCodeNumbers /></I18nProvider></LazyRoute>
        } />
        
        {/* Decoder pages - lazy loaded */}
        <Route path="/encoders/txt-to-morse" element={<Navigate to="/decoders/txt-to-morse" replace />} />
        <Route path="/decoders/txt-to-morse" element={
          <LazyRoute><I18nProvider initialLocale="en"><TxtToMorseEncoder /></I18nProvider></LazyRoute>
        } />
        <Route path="/decoders/decode-text" element={
          <LazyRoute><I18nProvider initialLocale="en"><DecodeText /></I18nProvider></LazyRoute>
        } />
        <Route path="/decoders/decode-image" element={
          <LazyRoute><I18nProvider initialLocale="en"><DecodeImage /></I18nProvider></LazyRoute>
        } />
        <Route path="/decoders/decode-audio" element={
          <LazyRoute><I18nProvider initialLocale="en"><DecodeAudio /></I18nProvider></LazyRoute>
        } />
        <Route path="/decoders/decode-audio/morse-code-sound" element={
          <LazyRoute><I18nProvider initialLocale="en"><MorseCodeSound /></I18nProvider></LazyRoute>
        } />
        
        {/* Multilingual Decoder pages */}
        <Route path="/ko/decoders/txt-to-morse" element={
          <LazyRoute><I18nProvider initialLocale="ko"><TxtToMorseEncoder /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/decoders/txt-to-morse" element={
          <LazyRoute><I18nProvider initialLocale="es"><TxtToMorseEncoder /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/decoders/txt-to-morse" element={
          <LazyRoute><I18nProvider initialLocale="ru"><TxtToMorseEncoder /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/decoders/decode-text" element={
          <LazyRoute><I18nProvider initialLocale="ko"><DecodeText /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/decoders/decode-text" element={
          <LazyRoute><I18nProvider initialLocale="es"><DecodeText /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/decoders/decode-text" element={
          <LazyRoute><I18nProvider initialLocale="ru"><DecodeText /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/decoders/decode-image" element={
          <LazyRoute><I18nProvider initialLocale="ko"><DecodeImage /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/decoders/decode-image" element={
          <LazyRoute><I18nProvider initialLocale="es"><DecodeImage /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/decoders/decode-image" element={
          <LazyRoute><I18nProvider initialLocale="ru"><DecodeImage /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/decoders/decode-audio" element={
          <LazyRoute><I18nProvider initialLocale="ko"><DecodeAudio /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/decoders/decode-audio" element={
          <LazyRoute><I18nProvider initialLocale="es"><DecodeAudio /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/decoders/decode-audio" element={
          <LazyRoute><I18nProvider initialLocale="ru"><DecodeAudio /></I18nProvider></LazyRoute>
        } />
        
        <Route path="/ko/decoders/decode-audio/morse-code-sound" element={
          <LazyRoute><I18nProvider initialLocale="ko"><MorseCodeSound /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/decoders/decode-audio/morse-code-sound" element={
          <LazyRoute><I18nProvider initialLocale="es"><MorseCodeSound /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/decoders/decode-audio/morse-code-sound" element={
          <LazyRoute><I18nProvider initialLocale="ru"><MorseCodeSound /></I18nProvider></LazyRoute>
        } />
        
        {/* Shop page - lazy loaded */}
        <Route path="/shop" element={
          <LazyRoute><I18nProvider initialLocale="en"><Shop /></I18nProvider></LazyRoute>
        } />
        
        {/* Multilingual Shop pages */}
        <Route path="/ko/shop" element={
          <LazyRoute><I18nProvider initialLocale="ko"><Shop /></I18nProvider></LazyRoute>
        } />
        <Route path="/es/shop" element={
          <LazyRoute><I18nProvider initialLocale="es"><Shop /></I18nProvider></LazyRoute>
        } />
        <Route path="/ru/shop" element={
          <LazyRoute><I18nProvider initialLocale="ru"><Shop /></I18nProvider></LazyRoute>
        } />

        {/* Feedback page - lazy loaded */}
        <Route path="/feedback" element={
          <LazyRoute><I18nProvider initialLocale="en"><Feedback /></I18nProvider></LazyRoute>
        } />

        {/* Privacy Policy page - lazy loaded */}
        <Route path="/privacy-policy" element={
          <LazyRoute><I18nProvider initialLocale="en"><PrivacyPolicy /></I18nProvider></LazyRoute>
        } />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;