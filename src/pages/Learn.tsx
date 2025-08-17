import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from '../components/Link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { Locale } from '../i18n';

export default function Learn() {
  const location = useLocation();
  const { t } = useI18n();
  
  // Get current locale from URL
  const getCurrentLocale = (): Locale => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts[0] && ['ko', 'es', 'ru'].includes(pathParts[0])) {
      return pathParts[0] as Locale;
    }
    return 'en';
  };

  const currentLocale = getCurrentLocale();
  
  // Generate localized links
  const getLocalizedPath = (path: string): string => {
    if (currentLocale === 'en') {
      return path;
    }
    return `/${currentLocale}${path}`;
  };

  const learningResources = [
    {
      title: t('learn.resources.basicAndTips.title'),
      description: t('learn.resources.basicAndTips.description'),
      href: getLocalizedPath("/learn/basic-and-tips"),
      icon: BookOpen,
      color: "blue"
    },
    {
      title: t('learn.resources.history.title'), 
      description: t('learn.resources.history.description'),
      href: getLocalizedPath("/learn/history"),
      icon: Clock,
      color: "green"
    }
  ];

  return (
    <Layout
      title={t('learn.meta.title')}
      description={t('learn.meta.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('learn.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('learn.header.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {learningResources.map((resource, index) => {
            const Icon = resource.icon;
            const colorClasses = {
              blue: "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
              green: "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700"
            };
            const iconColorClasses = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400"
            };

            return (
              <Link
                key={index}
                href={resource.href}
                className={`block bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border-2 ${colorClasses[resource.color as keyof typeof colorClasses]} transition-all hover:shadow-md group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${iconColorClasses[resource.color as keyof typeof iconColorClasses]}`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                      <span>{t('learn.resources.learnMore')}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
            {t('learn.callToAction.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm sm:text-base">
            {t('learn.callToAction.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              {t('learn.callToAction.tryTranslator')}
            </Link>
            <Link
              href="/sheet"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              {t('learn.callToAction.viewReferenceSheet')}
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('learn.seoContent.learningPlatform.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('learn.seoContent.learningPlatform.description')}
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('learn.seoContent.learningPlatform.learningPath')}</h4>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">1.</span>
                  <span dangerouslySetInnerHTML={{ __html: t('learn.seoContent.learningPlatform.steps.step1').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">2.</span>
                  <span dangerouslySetInnerHTML={{ __html: t('learn.seoContent.learningPlatform.steps.step2').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">3.</span>
                  <span>{t('learn.seoContent.learningPlatform.steps.step3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">4.</span>
                  <span>{t('learn.seoContent.learningPlatform.steps.step4')}</span>
                </li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('learn.seoContent.learningPlatform.conclusion')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('learn.seoContent.educationResources.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('learn.seoContent.educationResources.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('learn.seoContent.educationResources.historicalTopics')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>{t('learn.seoContent.educationResources.historicalList.item1')}</li>
                  <li>{t('learn.seoContent.educationResources.historicalList.item2')}</li>
                  <li>{t('learn.seoContent.educationResources.historicalList.item3')}</li>
                  <li>{t('learn.seoContent.educationResources.historicalList.item4')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('learn.seoContent.educationResources.learningModules')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li dangerouslySetInnerHTML={{ __html: t('learn.seoContent.educationResources.learningList.item1').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <li>{t('learn.seoContent.educationResources.learningList.item2')}</li>
                  <li>{t('learn.seoContent.educationResources.learningList.item3')}</li>
                  <li>{t('learn.seoContent.educationResources.learningList.item4')}</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('learn.seoContent.educationResources.conclusion')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}