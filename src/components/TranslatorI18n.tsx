import React from 'react';
import { Layout } from './Layout';
import TranslatorBox from './TranslatorBox';
import Instructions from './Instructions';
import { useTranslator } from '../contexts/TranslatorContext';
import { useI18n } from '../contexts/I18nContext';
import { ArrowDownUp } from 'lucide-react';
import { Locale } from '../i18n';

interface TranslatorI18nProps {
  locale: Locale;
}

export function TranslatorI18n({ locale }: TranslatorI18nProps) {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();
  const { t } = useI18n();

  return (
    <Layout
      title={t('site.title')}
      description={t('site.description')}
      locale={locale}
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
            />
          </div>
        </div>

        <Instructions translations={t('instructions')} />

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          {/* Quick Start Guide */}
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

          {/* Advanced Features */}
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
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.imageProcessing.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.audioAnalysis.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.audioAnalysis.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('home.features.batchProcessing.title')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.features.batchProcessing.description')}</p>
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

          {/* Technical Implementation */}
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
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.ocr.description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.dsp.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.dsp.description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('home.technical.education.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{t('home.technical.education.description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Resources */}
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
                <strong>{t('home.training.popular').split(':')[0]}:</strong> {t('home.training.popular').split(':')[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}