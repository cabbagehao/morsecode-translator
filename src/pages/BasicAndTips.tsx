import React from 'react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface MorseCharacter {
  char: string;
  code: string;
}

interface LazyYouTubeVideoProps {
  videoId: string;
  title: string;
  width: string;
  height: string;
}

const LazyYouTubeVideo: React.FC<LazyYouTubeVideoProps> = ({ videoId, title, width, height }) => {
  const aspectRatio = (parseInt(height) / parseInt(width)) * 100;

  return (
    <div className="relative w-full" style={{ paddingBottom: `${aspectRatio}%` }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default function BasicAndTips() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const alphabet: MorseCharacter[] = [
    { char: 'A', code: '.-' },
    { char: 'B', code: '-...' },
    { char: 'C', code: '-.-.' },
    { char: 'D', code: '-..' },
    { char: 'E', code: '.' },
    { char: 'F', code: '..-.' },
    { char: 'G', code: '--.' },
    { char: 'H', code: '....' },
    { char: 'I', code: '..' },
    { char: 'J', code: '.---' },
    { char: 'K', code: '-.-' },
    { char: 'L', code: '.-..' },
    { char: 'M', code: '--' },
    { char: 'N', code: '-.' },
    { char: 'O', code: '---' },
    { char: 'P', code: '.--.' },
    { char: 'Q', code: '--.-' },
    { char: 'R', code: '.-.' },
    { char: 'S', code: '...' },
    { char: 'T', code: '-' },
    { char: 'U', code: '..-' },
    { char: 'V', code: '...-' },
    { char: 'W', code: '.--' },
    { char: 'X', code: '-..-' },
    { char: 'Y', code: '-.--' },
    { char: 'Z', code: '--..'}
  ];

  const numbers: MorseCharacter[] = [
    { char: '0', code: '-----' },
    { char: '1', code: '.----' },
    { char: '2', code: '..---' },
    { char: '3', code: '...--' },
    { char: '4', code: '....-' },
    { char: '5', code: '.....' },
    { char: '6', code: '-....' },
    { char: '7', code: '--...' },
    { char: '8', code: '---..' },
    { char: '9', code: '----.' }
  ];

  const punctuation: MorseCharacter[] = [
    { char: '.', code: '.-.-.-' },
    { char: ',', code: '--..--' },
    { char: '?', code: '..--..' },
    { char: '!', code: '-.-.--' },
    { char: ':', code: '---...' },
    { char: ';', code: '-.-.-.' },
    { char: '(', code: '-.--.' },
    { char: ')', code: '-.--.-' },
    { char: "'", code: '.----.' },
    { char: '"', code: '.-..-.' },
    { char: '/', code: '-..-.' },
    { char: '-', code: '-....-' },
    { char: '_', code: '..--.-' },
    { char: '@', code: '.--.-.'},
    { char: '&', code: '.-...' },
    { char: '=', code: '-...-' },
    { char: '+', code: '.-.-.' },
    { char: '$', code: '...-..-' }
  ];

  const externalResources = t('basicAndTips.externalResources.resources');

  return (
    <Layout 
      title={t('basicAndTips.meta.title')}
      description={t('basicAndTips.meta.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t('basicAndTips.header.title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('basicAndTips.header.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.sections.letters')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {alphabet.map(({ char, code }) => (
                <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                  <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.sections.numbers')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {numbers.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.sections.punctuation')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {punctuation.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.basicRules.title')}</h2>
          <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('basicAndTips.basicRules.rules').map((rule: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.title')}</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.numbers.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.numbers.description')}
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.numbers.rules').map((rule: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.letters.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.sosExample.intro')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  {t('basicAndTips.shorthandMethod.letters.sosExample.explanation')}
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.sosExample.simple')}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.intro')}
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 mb-3 sm:mb-4 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.pairs').map((pair: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>{pair}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.symmetry.intro')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
                  <span className="text-blue-600 dark:text-blue-400">{t('basicAndTips.shorthandMethod.letters.alphabet.symmetry.pairs')}</span>
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.symmetry.tip')}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.reverseSymmetry.intro')}
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 mb-2 sm:mb-3 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>{t('basicAndTips.shorthandMethod.letters.alphabet.reverseSymmetry.example')}</span>
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.letters.alphabet.reverseSymmetry.description')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
                  <span className="text-blue-600 dark:text-blue-400">{t('basicAndTips.shorthandMethod.letters.alphabet.reverseSymmetry.pairs')}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.patterns.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.patterns.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.patterns.dots.title')}</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {t('basicAndTips.shorthandMethod.patterns.dots.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.patterns.dashes.title')}</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {t('basicAndTips.shorthandMethod.patterns.dashes.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('basicAndTips.shorthandMethod.finalTips.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.finalTips.description')}
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-sm sm:text-base">
                {t('basicAndTips.shorthandMethod.finalTips.exceptions').map((exception: string, index: number) => (
                  <li key={index}><strong>{exception}</strong></li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.visualMethod.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              {t('basicAndTips.visualMethod.description')}
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <LazyYouTubeVideo 
                videoId="EmXsSSHCnsI" 
                title={t('basicAndTips.visualMethod.videoTitle')}
                width="717"
                height="538"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.learningTips.title')}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('basicAndTips.learningTips.tips').map((tip: any, index: number) => {
              const borderColors = ['border-blue-500', 'border-green-500', 'border-purple-500'];
              return (
                <div key={index} className={`border-l-4 ${borderColors[index % borderColors.length]} pl-4`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('basicAndTips.externalResources.title')}</h2>
          <div className="space-y-4 sm:space-y-6">
            {externalResources.map((resource: any, index: number) => (
              <div key={index} className="border-b dark:border-gray-700 last:border-0 pb-4 sm:pb-6 last:pb-0">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-2 mb-2">
                    {resource.title}
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </h3>
                </a>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base touch-manipulation"
          >
            {t('basicAndTips.actions.startPracticing')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* SEO Description */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('basicAndTips.seoContent.interestingFacts.title')}
          </h3>
          
          <div className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {t('basicAndTips.seoContent.interestingFacts.paragraphs').map((paragraph: any, index: number) => (
              <p key={index}>
                {paragraph.title && <strong>{paragraph.title}</strong>} 
                <span dangerouslySetInnerHTML={{ __html: paragraph.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </p>
            ))}
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="mt-8 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('basicAndTips.seoContent.fundamentalsGuide.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('basicAndTips.seoContent.fundamentalsGuide.intro').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('basicAndTips.seoContent.fundamentalsGuide.techniques.title')}</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {t('basicAndTips.seoContent.fundamentalsGuide.techniques.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 font-bold mr-2">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('basicAndTips.seoContent.advancedTechniques.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('basicAndTips.seoContent.advancedTechniques.intro').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('basicAndTips.seoContent.advancedTechniques.methods.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('basicAndTips.seoContent.advancedTechniques.methods.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('basicAndTips.seoContent.advancedTechniques.patterns.title')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('basicAndTips.seoContent.advancedTechniques.patterns.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('basicAndTips.seoContent.advancedTechniques.conclusion')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 