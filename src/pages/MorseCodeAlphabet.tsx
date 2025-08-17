import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { getCurrentLocale } from '../i18n';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeAlphabet() {
  const location = useLocation();
  const { t } = useI18n();
  const currentLocale = getCurrentLocale(location.pathname);
  const morseCodeMap = getMorseCodeMap();
  const [expandedQA, setExpandedQA] = useState<number | null>(null);

  // Get alphabet letters A-Z
  const letters: MorseCharacter[] = [];

  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    const code = morseCodeMap[char];
    if (code) {
      letters.push({ char, code });
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

  const qaItems = t('morseCodeAlphabet.qaSection.items');

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
            
            /* 隐藏除了标题和字母表格之外的所有内容 */
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
            
            /* 字母网格样式 */
            #alphabet-chart {
              grid-template-columns: repeat(6, 1fr) !important;
              gap: 0.5rem !important;
              padding: 1rem !important;
            }
            
            #alphabet-chart > div {
              border: 1px solid black !important;
              border-radius: 0.25rem !important;
              padding: 0.5rem !important;
              text-align: center !important;
            }
            
            #alphabet-chart span {
              color: black !important;
            }
            
            #alphabet-chart span:first-child {
              font-size: 1.2rem !important;
              font-weight: bold !important;
            }
            
            #alphabet-chart span:last-child {
              font-size: 0.9rem !important;
              font-family: monospace !important;
            }
          }
        `}
      </style>
      
      <Layout
        title={t('morseCodeAlphabet.meta.title')}
        description={t('morseCodeAlphabet.meta.description')}
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 print:hidden">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('morseCodeAlphabet.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('morseCodeAlphabet.header.subtitle')}
          </p>
          <div className="mt-6">
            <button
              onClick={printPage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              {t('morseCodeAlphabet.header.printButton')}
            </button>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block">
          <h1 className="text-center text-2xl font-bold mb-6">{t('morseCodeAlphabet.content.printTitle')}</h1>
        </div>

        {/* Alphabet Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{t('morseCodeAlphabet.content.lettersTitle')}</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div id="alphabet-chart" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              {letters.map(({ char, code }) => (
                <div key={char} className="flex flex-col items-center p-3 sm:p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-mono mb-2">
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

        {/* Memory Techniques */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeAlphabet.learning.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.learning.memoryTechniques.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('morseCodeAlphabet.learning.memoryTechniques.items').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.learning.learningTips.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('morseCodeAlphabet.learning.learningTips.items').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Letters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeAlphabet.commonLetters.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('morseCodeAlphabet.commonLetters.description')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['E', 'T', 'A', 'O', 'I', 'N'].map(letter => {
              const code = morseCodeMap[letter];
              return (
                <div key={letter} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 font-mono mb-1">{letter}</div>
                  <div className="text-lg font-mono text-blue-600 dark:text-blue-400">{code}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t(`morseCodeAlphabet.commonLetters.frequencies.${letter}`)} {t('morseCodeAlphabet.commonLetters.frequencyLabel')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Letter Pattern Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeAlphabet.patternAnalysis.title')}
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">{t('morseCodeAlphabet.patternAnalysis.singleSignal.title')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-lg">E</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-lg">T</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">-</span>
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-3">
                {t('morseCodeAlphabet.patternAnalysis.singleSignal.description')}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">{t('morseCodeAlphabet.patternAnalysis.symmetricPatterns.title')}</h3>
              <div className="space-y-2 text-sm">
                {t('morseCodeAlphabet.patternAnalysis.symmetricPatterns.pairs').map((pair: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{pair.letters}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{pair.patterns}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3">
                {t('morseCodeAlphabet.patternAnalysis.symmetricPatterns.tip')}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">{t('morseCodeAlphabet.patternAnalysis.complexPatterns.title')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Q</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">--.-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Y</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">-.--</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>X</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">-..-</span>
                </div>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-3">
                {t('morseCodeAlphabet.patternAnalysis.complexPatterns.description')}
              </p>
            </div>
          </div>
        </div>

        {/* International Usage and Standards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeAlphabet.internationalUsage.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.internationalUsage.globalStandardization.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('morseCodeAlphabet.internationalUsage.globalStandardization.description')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                {t('morseCodeAlphabet.internationalUsage.globalStandardization.standards').map((standard: string, index: number) => (
                  <li key={index}>• {standard}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.internationalUsage.professionalApplications.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('morseCodeAlphabet.internationalUsage.professionalApplications.description')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                {t('morseCodeAlphabet.internationalUsage.professionalApplications.applications').map((application: string, index: number) => (
                  <li key={index}>• {application}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('morseCodeAlphabet.qaSection.title')}
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
              {t('morseCodeAlphabet.seoContent.masteringGuide.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('morseCodeAlphabet.seoContent.masteringGuide.description') }} />
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.seoContent.masteringGuide.essentialPoints.title')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {t('morseCodeAlphabet.seoContent.masteringGuide.essentialPoints.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('morseCodeAlphabet.seoContent.masteringGuide.practicalApplications.title')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {t('morseCodeAlphabet.seoContent.masteringGuide.practicalApplications.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('morseCodeAlphabet.seoContent.professionalTraining.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('morseCodeAlphabet.seoContent.professionalTraining.description') }} />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.title')}</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>{t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.emergency')}</strong><br />
                  {t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.emergencyCode')}
                </div>
                <div>
                  <strong>{t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.common')}</strong><br />
                  {t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.commonCode')}
                </div>
                <div>
                  <strong>{t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.practice')}</strong><br />
                  <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">{t('morseCodeAlphabet.seoContent.professionalTraining.quickReference.practiceLink')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t('morseCodeAlphabet.relatedLinks.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/sheet/morse-code-numbers" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('morseCodeAlphabet.relatedLinks.numbers.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('morseCodeAlphabet.relatedLinks.numbers.description')}</p>
            </a>
            <a href="/sheet/morse-code-sheet" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('morseCodeAlphabet.relatedLinks.reference.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('morseCodeAlphabet.relatedLinks.reference.description')}</p>
            </a>
            <a href="/learn/basic-and-tips" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('morseCodeAlphabet.relatedLinks.learning.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('morseCodeAlphabet.relatedLinks.learning.description')}</p>
            </a>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}