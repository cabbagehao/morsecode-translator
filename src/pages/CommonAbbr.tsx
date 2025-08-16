import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { morseAbbreviations } from '../utils/morseCode';
import { useI18n } from '../contexts/I18nContext';
import { getCurrentLocale, getLocalizedPath } from '../i18n';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}


export default function CommonAbbr() {
  const location = useLocation();
  const { t } = useI18n();
  const currentLocale = getCurrentLocale(location.pathname);

  const abbreviations: MorseCharacter[] = Object.entries(morseAbbreviations).map(([abbr, code]) => ({
    char: abbr,
    code,
    description: t(`commonAbbr.abbreviations.descriptions.${abbr}`) || ''
  }));

  return (
    <Layout
      title={t('commonAbbr.meta.title')}
      description={t('commonAbbr.meta.description')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('commonAbbr.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('commonAbbr.header.subtitle')}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{t('commonAbbr.abbreviations.title')}</h2>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {abbreviations.map(({ char, code, description }) => (
                  <div key={char} className="flex items-center justify-between p-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono min-w-[1.5rem] sm:min-w-[2rem] text-center">
                        {char}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {code}
                      </span>
                    </div>
                    {description && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 text-right flex-1 hidden sm:block">
                        {description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            {t('commonAbbr.about.title')}
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            {t('commonAbbr.about.points').map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonAbbr.seoContent.emergencySignals.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonAbbr.seoContent.emergencySignals.description')}
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('commonAbbr.seoContent.emergencySignals.criticalSignals')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonAbbr.seoContent.emergencySignals.distressEmergency')}</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    {t('commonAbbr.seoContent.emergencySignals.distressList').map((item: string, index: number) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonAbbr.seoContent.emergencySignals.operationalSignals')}</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    {t('commonAbbr.seoContent.emergencySignals.operationalList').map((item: string, index: number) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('commonAbbr.seoContent.emergencySignals.conclusion')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonAbbr.seoContent.professionalCodes.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonAbbr.seoContent.professionalCodes.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonAbbr.seoContent.professionalCodes.popularQCodes')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonAbbr.seoContent.professionalCodes.qCodesList').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonAbbr.seoContent.professionalCodes.proceduralSignals')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonAbbr.seoContent.professionalCodes.proceduralList').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('commonAbbr.seoContent.professionalCodes.conclusion')} Discover more resources in our comprehensive <a href={getLocalizedPath('/sheet', currentLocale)} className="text-blue-600 dark:text-blue-400 hover:underline">morse code sheet</a> collection.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
