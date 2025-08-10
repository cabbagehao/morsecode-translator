import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useI18n } from '../contexts/I18nContext';

export default function History() {
  const { t, currentLocale } = useI18n();
  const location = useLocation();
  
  // Get current locale from URL
  const getCurrentLocale = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && ['ko', 'es', 'ru'].includes(pathParts[0])) {
      return pathParts[0];
    }
    return 'en';
  };

  // Generate language-aware path for links  
  const getLocalizedPath = (path: string): string => {
    const locale = getCurrentLocale();
    if (locale === 'en') {
      return path;
    }
    return `/${locale}${path}`;
  };

  return (
    <Layout 
      title={t('history.meta.title')}
      description={t('history.meta.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          {t('history.header.title')}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none mb-8 sm:mb-12">
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('history.header.description')}
          </p>
        </div>

        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-2 sm:ml-3">
          {t('history.timeline').map((event: any, index: number) => (
            <div key={index} className="mb-8 sm:mb-10 ml-4 sm:ml-6">
              <span className="absolute flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full -left-2.5 sm:-left-3 ring-4 sm:ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full dark:bg-blue-400"></div>
              </span>
              <h3 className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-1 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                <span className="mb-1 sm:mb-0">{event.title}</span>
                <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 sm:ml-3 w-fit">
                  {event.year}
                </span>
              </h3>
              <p className="text-sm sm:text-base font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('history.seoContent.revolutionary.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('history.seoContent.revolutionary.description')}
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('history.seoContent.revolutionary.milestonesTitle')}</h4>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('history.seoContent.revolutionary.milestones').map((milestone: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">{index + 1}.</span>
                    <span>{milestone}</span>
                  </li>
                ))}
              </ol>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('history.seoContent.revolutionary.conclusion')}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('history.seoContent.modernImpact.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('history.seoContent.modernImpact.description')} <a href={getLocalizedPath('/learn')} className="text-blue-600 dark:text-blue-400 hover:underline">{currentLocale === 'en' ? 'learn' : t('nav.learn')}</a>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('history.seoContent.modernImpact.historicalImpact')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('history.seoContent.modernImpact.historicalList').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('history.seoContent.modernImpact.modernApplications')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('history.seoContent.modernImpact.modernList').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('history.seoContent.modernImpact.conclusion')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}