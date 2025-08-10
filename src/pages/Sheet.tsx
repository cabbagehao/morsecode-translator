import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Link } from '../components/Link';
import { ArrowRight, FileText, BookOpen, MessageSquare } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

export default function Sheet() {
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

  const sheetResources = [
    {
      title: t('sheet.resources.morseCodeSheet.title'),
      description: t('sheet.resources.morseCodeSheet.description'),
      href: getLocalizedPath("/sheet/morse-code-sheet"),
      icon: FileText,
      color: "blue"
    },
    {
      title: t('sheet.resources.commonWords.title'),
      description: t('sheet.resources.commonWords.description'),
      href: getLocalizedPath("/sheet/common-words"),
      icon: BookOpen,
      color: "green"
    },
    {
      title: t('sheet.resources.commonPhrases.title'),
      description: t('sheet.resources.commonPhrases.description'),
      href: getLocalizedPath("/sheet/common-phrases"),
      icon: MessageSquare,
      color: "purple"
    }
  ];

  return (
    <Layout 
      title={t('sheet.meta.title')}
      description={t('sheet.meta.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('sheet.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('sheet.header.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sheetResources.map((resource, index) => {
            const Icon = resource.icon;
            const colorClasses = {
              blue: "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
              green: "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700",
              purple: "border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700"
            };
            const iconColorClasses = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400"
            };
            
            return (
              <Link
                key={index}
                href={resource.href}
                className={`block bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border-2 ${colorClasses[resource.color as keyof typeof colorClasses]} transition-all hover:shadow-md group`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${iconColorClasses[resource.color as keyof typeof iconColorClasses]} mb-4`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                    <span>{t('sheet.resources.viewSheet')}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
            {t('sheet.printFriendly.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm sm:text-base">
            {t('sheet.printFriendly.description')}
          </p>
          <div className="text-center">
            <Link 
              href={getLocalizedPath("/sheet/morse-code-sheet")} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              {t('sheet.printFriendly.startWithMain')}
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {t('sheet.seoContent.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            {t('sheet.seoContent.introduction')} <a href={getLocalizedPath('/')} className="text-blue-600 dark:text-blue-400 hover:underline">{t('sheet.seoContent.instantConversion')}</a> {t('sheet.seoContent.tool')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            {t('sheet.seoContent.sectionsIntro')}
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li className="mb-2"><strong>{t('sheet.resources.morseCodeSheet.title')}</strong>: {t('sheet.seoContent.sections.morseCodeSheet')}</li>
            <li className="mb-2"><strong>{t('sheet.resources.commonWords.title')}</strong>: {t('sheet.seoContent.sections.commonWords')}</li>
            <li className="mb-2"><strong>{t('sheet.resources.commonPhrases.title')}</strong>: {t('sheet.seoContent.sections.commonPhrases')}</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            {t('sheet.seoContent.optimization')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            <strong>{t('sheet.seoContent.exampleUseCases')}</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li className="mb-2">{t('sheet.seoContent.useCases.amateur')}</li>
            <li className="mb-2">{t('sheet.seoContent.useCases.outdoor')}</li>
            <li className="mb-2">{t('sheet.seoContent.useCases.teachers')}</li>
            <li className="mb-2">{t('sheet.seoContent.useCases.contests')}</li>
            <li className="mb-2">{t('sheet.seoContent.useCases.interested')}</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t('sheet.seoContent.conclusion')}
          </p>
        </div>
        {/* SEO Content End */}
      </div>
    </Layout>
  );
} 