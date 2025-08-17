import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { getCurrentLocale, getLocalizedPath } from '../i18n';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeNumbers() {
  const location = useLocation();
  const { t } = useI18n();
  const currentLocale = getCurrentLocale(location.pathname);
  const morseCodeMap = getMorseCodeMap();
  const [expandedQA, setExpandedQA] = useState<number | null>(null);

  // Get numbers 0-9
  const numbers: MorseCharacter[] = [];

  for (let i = 0; i <= 9; i++) {
    const char = i.toString();
    const code = morseCodeMap[char];
    if (code) {
      numbers.push({ char, code });
    }
  }

  const printPage = () => {
    const originalTitle = document.title;
    document.title = '';
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  // Number patterns explanation
  const numberPatterns = t('morseCodeNumbers.patterns.items');
  const qaItems = t('morseCodeNumbers.qaSection.items');

  return (
    <>
      {/* 打印专用样式 */}
      <style>
        {`
          @media print {
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            /* 隐藏不需要的元素 */
            .theme-toggle, .menu-button, .dark-mode-toggle, 
            button[aria-label*="menu"], [aria-label*="Toggle"],
            nav .hidden.md\\:flex, nav .md\\:hidden,
            nav a:not(:first-child), nav div.relative,
            footer {
              display: none !important;
            }
            
            /* 隐藏除了标题和数字表格之外的所有内容 */
            .print\\:hidden {
              display: none !important;
            }
            
            /* 基础样式重置 */
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: black !important;
            }
            
            /* 简化导航栏 */
            nav {
              background: white !important;
              padding: 0.5rem 0 !important;
              box-shadow: none !important;
              border-bottom: 1px solid black !important;
              margin-bottom: 1rem !important;
            }
            
            nav a[href="/"] {
              color: black !important;
              text-decoration: none !important;
            }
            
            nav a[href="/"] span,
            nav a[href="/"] img {
              color: black !important;
            }
            
            /* 重置所有颜色为黑白 */
            * {
              background: white !important;
              color: black !important;
              border-color: black !important;
            }
            
            /* 标题样式 */
            h1 {
              font-size: 1.5rem !important;
              text-align: center !important;
              margin: 1rem 0 !important;
              color: black !important;
            }
            
            /* 数字网格样式 */
            #numbers-chart {
              grid-template-columns: repeat(5, 1fr) !important;
              gap: 0.75rem !important;
              padding: 1rem !important;
            }
            
            #numbers-chart > div {
              border: 1px solid black !important;
              border-radius: 0.25rem !important;
              padding: 0.75rem !important;
              text-align: center !important;
            }
            
            #numbers-chart span {
              color: black !important;
            }
            
            #numbers-chart span:first-child {
              font-size: 1.5rem !important;
              font-weight: bold !important;
            }
            
            #numbers-chart span:last-child {
              font-size: 1rem !important;
              font-family: monospace !important;
            }
          }
        `}
      </style>
      
      <Layout
        title={t('morseCodeNumbers.meta.title')}
        description={t('morseCodeNumbers.meta.description')}
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 print:hidden">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('morseCodeNumbers.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('morseCodeNumbers.header.subtitle')}
          </p>
          <div className="mt-6">
            <button
              onClick={printPage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              {t('morseCodeNumbers.content.printButton')}
            </button>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block">
          <h1 className="text-center text-2xl font-bold mb-6">{t('morseCodeNumbers.content.printTitle')}</h1>
        </div>

        {/* Numbers Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{t('morseCodeNumbers.content.title')}</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div id="numbers-chart" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
              {numbers.map(({ char, code }) => (
                <div key={char} className="flex flex-col items-center p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-mono mb-2">
                    {char}
                  </span>
                  <span className="text-sm sm:text-base font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Number Pattern System */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.patterns.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t('morseCodeNumbers.patterns.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {numberPatterns.map((pattern: any, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('morseCodeNumbers.patterns.numberRange')} {pattern.range}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{pattern.description}</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-mono">{pattern.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Learning Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.learning.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.learning.strategy.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('morseCodeNumbers.learning.strategy.steps').map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">{index + 1}.</span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.learning.memoryTips.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('morseCodeNumbers.learning.memoryTips.tips').map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                    <span dangerouslySetInnerHTML={{ __html: tip.includes('morse translator') ? tip.replace('morse translator', `<a href="/" class="text-blue-600 dark:text-blue-400 hover:underline">morse translator</a>`) : tip }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Common Number Sequences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.commonSequences.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('morseCodeNumbers.commonSequences.description')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{t('morseCodeNumbers.commonSequences.emergency.title')}</h3>
              <div className="space-y-2 text-sm font-mono">
                {t('morseCodeNumbers.commonSequences.emergency.sequences').map((sequence: string, index: number) => (
                  <div key={index}>{sequence}</div>
                ))}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                {t('morseCodeNumbers.commonSequences.emergency.note')}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">{t('morseCodeNumbers.commonSequences.common.title')}</h3>
              <div className="space-y-2 text-sm font-mono">
                {t('morseCodeNumbers.commonSequences.common.sequences').map((sequence: string, index: number) => (
                  <div key={index}>{sequence}</div>
                ))}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                {t('morseCodeNumbers.commonSequences.common.note')}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">{t('morseCodeNumbers.commonSequences.radio.title')}</h3>
              <div className="space-y-2 text-sm font-mono">
                {t('morseCodeNumbers.commonSequences.radio.sequences').map((sequence: string, index: number) => (
                  <div key={index}>{sequence}</div>
                ))}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                {t('morseCodeNumbers.commonSequences.radio.note')}
              </p>
            </div>
          </div>
        </div>

        {/* Historical Context and Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.historical.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.historical.development.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('morseCodeNumbers.historical.development.content')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                {t('morseCodeNumbers.historical.development.timeline').map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.historical.applications.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('morseCodeNumbers.historical.applications.content')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                {t('morseCodeNumbers.historical.applications.uses').map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Training Techniques */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.advancedTraining.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('morseCodeNumbers.advancedTraining.description')}
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">{t('morseCodeNumbers.advancedTraining.sections.speedBuilding.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {t('morseCodeNumbers.advancedTraining.sections.speedBuilding.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-3">{t('morseCodeNumbers.advancedTraining.sections.recognitionTraining.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {t('morseCodeNumbers.advancedTraining.sections.recognitionTraining.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
              <h3 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">{t('morseCodeNumbers.advancedTraining.sections.errorReduction.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {t('morseCodeNumbers.advancedTraining.sections.errorReduction.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('morseCodeNumbers.faqTitle')}
          </h2>
          <div className="space-y-3">
            {qaItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedQA(expandedQA === index ? null : index)}
                  className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedQA === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedQA === index && (
                  <div className="px-4 py-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700 whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Sections */}
        <div className="space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('morseCodeNumbers.seoSections.masterGuide.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('morseCodeNumbers.seoSections.masterGuide.description').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.seoSections.masterGuide.benefits.title')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {t('morseCodeNumbers.seoSections.masterGuide.benefits.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.seoSections.masterGuide.applications.title')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {t('morseCodeNumbers.seoSections.masterGuide.applications.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('morseCodeNumbers.seoSections.professionalTraining.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('morseCodeNumbers.seoSections.professionalTraining.description').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeNumbers.seoSections.professionalTraining.quickReference.title')}</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm font-mono">
                {t('morseCodeNumbers.seoSections.professionalTraining.quickReference.patterns').map((pattern: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="font-bold">{pattern.range || pattern.practice}</div>
                    <div className={pattern.link ? "" : "text-blue-600 dark:text-blue-400"}>
                      {pattern.link ? (
                        <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">{pattern.link}</a>
                      ) : (
                        pattern.description
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeNumbers.relatedLinks.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {t('morseCodeNumbers.relatedLinks.links').map((link: any, index: number) => (
              <a key={index} href={link.href} className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{link.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}