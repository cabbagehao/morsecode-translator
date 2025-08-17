import React from 'react';
import { Layout } from '../components/Layout';
import { FeedbackForm } from '../components/FeedbackForm';
import { MessageSquare, Mail } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

export default function Feedback() {
  const { t } = useI18n();
  
  return (
    <Layout
      title={t('feedbackPage.meta.title')}
      description={t('feedbackPage.meta.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('feedbackPage.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('feedbackPage.header.subtitle')}
          </p>
        </div>


        {/* Main Feedback Form */}
        <FeedbackForm className="mb-8" />

        {/* Alternative Contact Methods */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {t('feedbackPage.contact.title')}
          </h3>
          
          <div className="flex justify-center">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('feedbackPage.contact.email.label')}</p>
                <a 
                  href="mailto:yhc2073@gmail.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  {t('feedbackPage.contact.email.address')}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {t('feedbackPage.contact.note')}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('feedbackPage.faq.title')}
          </h3>
          
          <div className="space-y-4">
            {t('feedbackPage.faq.items').map((item: any, index: number) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {item.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}