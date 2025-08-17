import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { commonPhrases } from '../utils/morseCode';
import { useI18n } from '../contexts/I18nContext';

interface MorseCharacter {
  char: string;
  code: string;
}

export default function CommonWords() {
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

  // Extract single words from commonPhrases (words that don't contain spaces)
  const phraseSingleWords: MorseCharacter[] = Object.entries(commonPhrases)
    .filter(([phrase]) => !phrase.includes(' '))
    .map(([word, code]) => ({
      char: word,
      code
    }));

  // Additional common words with their Morse code
  const additionalWords: MorseCharacter[] = [
    // Basic words
    { char: 'THE', code: '- .... .' },
    { char: 'AND', code: '.- -. -..' },
    { char: 'YOU', code: '-.-- --- ..-' },
    { char: 'ARE', code: '.- .-. .' },
    { char: 'FOR', code: '..-. --- .-.' },
    { char: 'NOT', code: '-. --- -' },
    { char: 'BUT', code: '-... ..- -' },
    { char: 'CAN', code: '-.-. .- -.' },
    { char: 'HAD', code: '.... .- -..' },
    { char: 'HER', code: '.... . .-.' },
    { char: 'WAS', code: '.-- .- ...' },
    { char: 'ONE', code: '--- -. .' },
    { char: 'OUR', code: '--- ..- .-.' },
    { char: 'OUT', code: '--- ..- -' },
    { char: 'DAY', code: '-.. .- -.--' },
    { char: 'GET', code: '--. . -' },
    { char: 'HAS', code: '.... .- ...' },
    { char: 'HIM', code: '.... .. --' },
    { char: 'HIS', code: '.... .. ...' },
    { char: 'HOW', code: '.... --- .--' },
    { char: 'ITS', code: '.. - ...' },
    { char: 'NEW', code: '-. . .--' },
    { char: 'NOW', code: '-. --- .--' },
    { char: 'OLD', code: '--- .-.. -..' },
    { char: 'SEE', code: '... . .' },
    { char: 'WHO', code: '.-- .... ---' },
    { char: 'WHY', code: '.-- .... -.--' },
    { char: 'WAY', code: '.-- .- -.--' },
    { char: 'USE', code: '..- ... .' },
    { char: 'MAN', code: '-- .- -.' },
    { char: 'TOO', code: '- --- ---' },
    { char: 'ANY', code: '.- -. -.--' },
    { char: 'BAD', code: '-... .- -..' },
    { char: 'BIG', code: '-... .. --.' },
    { char: 'BOY', code: '-... --- -.--' },
    { char: 'DID', code: '-.. .. -..' },
    { char: 'END', code: '. -. -..' },
    { char: 'FAR', code: '..-. .- .-.' },
    { char: 'FEW', code: '..-. . .--' },
    { char: 'GOT', code: '--. --- -' },
    { char: 'LET', code: '.-.. . -' },
    { char: 'MAY', code: '-- .- -.--' },
    { char: 'OFF', code: '--- ..-. ..-.' },
    { char: 'PUT', code: '.--. ..- -' },
    { char: 'RUN', code: '.-. ..- -.' },
    { char: 'SAY', code: '... .- -.--' },
    { char: 'SHE', code: '... .... .' },
    { char: 'TRY', code: '- .-. -.--' },
    { char: 'WIN', code: '.-- .. -.' },
    // Colors
    { char: 'RED', code: '.-. . -..' },
    { char: 'BLUE', code: '-... .-.. ..- .' },
    { char: 'GREEN', code: '--. .-. . . -.' },
    { char: 'WHITE', code: '.-- .... .. - .' },
    { char: 'BLACK', code: '-... .-.. .- -.-. -.-' },
    // Numbers as words
    { char: 'ZERO', code: '--.. . .-. ---' },
    { char: 'ONE', code: '--- -. .' },
    { char: 'TWO', code: '- .-- ---' },
    { char: 'THREE', code: '- .... .-. . .' },
    { char: 'FOUR', code: '..-. --- ..- .-.' },
    { char: 'FIVE', code: '..-. .. ...- .' },
    { char: 'SIX', code: '... .. -..-' },
    { char: 'SEVEN', code: '... . ...- . -.' },
    { char: 'EIGHT', code: '. .. --. .... -' },
    { char: 'NINE', code: '-. .. -. .' },
    { char: 'TEN', code: '- . -.' },
    // Time related
    { char: 'TIME', code: '- .. -- .' },
    { char: 'HOUR', code: '.... --- ..- .-.' },
    { char: 'WEEK', code: '.-- . . -.-' },
    { char: 'YEAR', code: '-.-- . .- .-.' },
    { char: 'TODAY', code: '- --- -.. .- -.--' },
    { char: 'NIGHT', code: '-. .. --. .... -' },
    // Common actions
    { char: 'COME', code: '-.-. --- -- .' },
    { char: 'GIVE', code: '--. .. ...- .' },
    { char: 'TAKE', code: '- .- -.- .' },
    { char: 'MAKE', code: '-- .- -.- .' },
    { char: 'KNOW', code: '-.- -. --- .--' },
    { char: 'WORK', code: '.-- --- .-. -.-' },
    { char: 'WANT', code: '.-- .- -. -' },
    { char: 'LOOK', code: '.-.. --- --- -.-' },
    { char: 'CALL', code: '-.-. .- .-.. .-..' },
    { char: 'FIND', code: '..-. .. -. -..' },
    { char: 'MOVE', code: '-- --- ...- .' },
    { char: 'PLAY', code: '.--. .-.. .- -.--' },
    { char: 'TURN', code: '- ..- .-. -.' },
    { char: 'STOP', code: '... - --- .--.' },
    { char: 'HELP', code: '.... . .-.. .--.' },
    { char: 'TELL', code: '- . .-.. .-..' },
    { char: 'SHOW', code: '... .... --- .--' },
    { char: 'HEAR', code: '.... . .- .-.' },
    { char: 'OPEN', code: '--- .--. . -.' },
    { char: 'KEEP', code: '-.- . . .--.' },
    { char: 'WAIT', code: '.-- .- .. -' },
    // Emergency words
    { char: 'EMERGENCY', code: '. -- . .-. --. . -. -.-. -.--' },
    { char: 'FIRE', code: '..-. .. .-. .' },
    { char: 'POLICE', code: '.--. --- .-.. .. -.-. .' },
    { char: 'DANGER', code: '-.. .- -. --. . .-.' },
    // Basic responses
    { char: 'THANKS', code: '- .... .- -. -.- ...' },
    { char: 'PLEASE', code: '.--. .-.. . .- ... .' },
    { char: 'SORRY', code: '... --- .-. .-. -.--' },
    // Common objects
    { char: 'FOOD', code: '..-. --- --- -..' },
    { char: 'BOOK', code: '-... --- --- -.-' },
    { char: 'DOOR', code: '-.. --- --- .-.' },
    { char: 'HAND', code: '.... .- -. -..' },
    { char: 'HEAD', code: '.... . .- -..' },
    { char: 'ROOM', code: '.-. --- --- --' },
    { char: 'TREE', code: '- .-. . .' },
    { char: 'ROAD', code: '.-. --- .- -..' },
    { char: 'CITY', code: '-.-. .. - -.--' },
    { char: 'SHIP', code: '... .... .. .--.' },
    { char: 'BOAT', code: '-... --- .- -' },
    { char: 'PLANE', code: '.--. .-.. .- -. .' },
    { char: 'TRAIN', code: '- .-. .- .. -.' },
    { char: 'HOUSE', code: '.... --- ..- ... .' },
    { char: 'PLACE', code: '.--. .-.. .- -.-. .' },
    { char: 'WATER', code: '.-- .- - . .-.' }
  ];

  // Combine all words and remove duplicates
  const allWords = [...phraseSingleWords, ...additionalWords];
  const uniqueWords = allWords.reduce((unique: MorseCharacter[], current) => {
    const exists = unique.find(item => item.char === current.char);
    if (!exists) {
      unique.push(current);
    }
    return unique;
  }, []);

  // Categorize words
  const basicResponses = uniqueWords.filter(word => 
    ['YES', 'NO', 'HELLO', 'GOODBYE', 'THANKS', 'PLEASE', 'SORRY'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const commonArticles = uniqueWords.filter(word => 
    ['THE', 'AND', 'YOU', 'ARE', 'FOR', 'NOT', 'BUT', 'CAN', 'WAS', 'ONE', 'OUR', 'OUT', 'HAS', 'HIS', 'ITS', 'WHO', 'WHY', 'WAY', 'USE', 'MAN', 'TOO', 'ANY'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const actionWords = uniqueWords.filter(word => 
    ['COME', 'GIVE', 'TAKE', 'MAKE', 'KNOW', 'WORK', 'WANT', 'LOOK', 'CALL', 'FIND', 'MOVE', 'PLAY', 'TURN', 'STOP', 'HELP', 'TELL', 'SHOW', 'HEAR', 'OPEN', 'KEEP', 'WAIT', 'GET', 'PUT', 'RUN', 'SAY', 'TRY', 'WIN'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const numbers = uniqueWords.filter(word => 
    ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const colors = uniqueWords.filter(word => 
    ['RED', 'BLUE', 'GREEN', 'WHITE', 'BLACK'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const timeWords = uniqueWords.filter(word => 
    ['TIME', 'HOUR', 'WEEK', 'YEAR', 'TODAY', 'NIGHT', 'DAY'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const objects = uniqueWords.filter(word => 
    ['FOOD', 'BOOK', 'DOOR', 'HAND', 'HEAD', 'ROOM', 'TREE', 'ROAD', 'CITY', 'SHIP', 'BOAT', 'PLANE', 'TRAIN', 'HOUSE', 'PLACE', 'WATER'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const emergencyWords = uniqueWords.filter(word => 
    ['HELP', 'EMERGENCY', 'FIRE', 'POLICE', 'STOP', 'WAIT', 'DANGER'].includes(word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const otherWords = uniqueWords.filter(word => 
    ![...basicResponses, ...commonArticles, ...actionWords, ...numbers, ...colors, ...timeWords, ...objects, ...emergencyWords].some(categorized => categorized.char === word.char)
  ).sort((a, b) => a.char.localeCompare(b.char));

  const CompactGridSection = ({ title, data }: { title: string; data: MorseCharacter[] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {data.map(({ char, code }) => (
            <div key={char} className="flex flex-col items-center p-3 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono mb-1">
                {char}
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 text-center break-all">
                {code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      title={t('commonWords.meta.title')}
      description={t('commonWords.meta.description')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('commonWords.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            {t('commonWords.header.subtitle')}
          </p>
        </div>

        {/* Quick Reference Navigation */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">{t('commonWords.quickReference.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {t('commonWords.quickReference.items').map((item: string, index: number) => (
              <div key={index} className="text-blue-800 dark:text-blue-200">{item}</div>
            ))}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {basicResponses.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.basicResponses', { count: basicResponses.length })}
              data={basicResponses} 
            />
          )}
          
          {emergencyWords.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.emergencyWords', { count: emergencyWords.length })}
              data={emergencyWords} 
            />
          )}
          
          {actionWords.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.actionWords', { count: actionWords.length })}
              data={actionWords} 
            />
          )}
          
          {commonArticles.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.articles', { count: commonArticles.length })}
              data={commonArticles} 
            />
          )}
          
          {numbers.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.numbers', { count: numbers.length })}
              data={numbers} 
            />
          )}
          
          {colors.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.colors', { count: colors.length })}
              data={colors} 
            />
          )}
          
          {timeWords.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.timeWords', { count: timeWords.length })}
              data={timeWords} 
            />
          )}
          
          {objects.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.objects', { count: objects.length })}
              data={objects} 
            />
          )}
          
          {otherWords.length > 0 && (
            <CompactGridSection 
              title={t('commonWords.totalStats.breakdown.otherWords', { count: otherWords.length })}
              data={otherWords} 
            />
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('commonWords.totalStats.title', { count: uniqueWords.length })}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm">
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.basicResponses', { count: basicResponses.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.emergencyWords', { count: emergencyWords.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.actionWords', { count: actionWords.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.articles', { count: commonArticles.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.numbers', { count: numbers.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.colors', { count: colors.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.timeWords', { count: timeWords.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.objects', { count: objects.length })}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('commonWords.totalStats.breakdown.otherWords', { count: otherWords.length })}</div>
          </div>
        </div>

        {/* Usage tips */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            {t('commonWords.learningTips.title')}
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            {t('commonWords.learningTips.tips').map((tip: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>{t('commonWords.footer.referenceLink')} <a href={getLocalizedPath('/sheet')} className="text-blue-600 dark:text-blue-400 hover:underline">{t('commonWords.footer.morseCodeChart')}</a> {t('commonWords.footer.collection')}</span>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('commonWords.wordCategories.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t('commonWords.wordCategories.categories').map((category: any, index: number) => (
              <div key={index} className="p-4 border dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress Guide */}
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4">
            {t('commonWords.learningProgress.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">{t('commonWords.learningProgress.beginner.title')}</h4>
              <ol className="space-y-1 text-green-700 dark:text-green-300 text-sm list-decimal list-inside">
                {t('commonWords.learningProgress.beginner.steps').map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">{t('commonWords.learningProgress.advanced.title')}</h4>
              <ol className="space-y-1 text-green-700 dark:text-green-300 text-sm list-decimal list-inside">
                {t('commonWords.learningProgress.advanced.steps').map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Practical Usage Examples */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-4">
            {t('commonWords.realWorldUsage.title')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">{t('commonWords.realWorldUsage.emergency.title')}</h4>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                {t('commonWords.realWorldUsage.emergency.examples').map((example: any, index: number) => (
                  <div key={index} className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                    <strong>{example.phrase}</strong> → "{example.morse}"
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">{t('commonWords.realWorldUsage.amateurRadio.title')}</h4>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                {t('commonWords.realWorldUsage.amateurRadio.examples').map((example: any, index: number) => (
                  <div key={index} className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                    <strong>{example.phrase}</strong> → "{example.morse}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonWords.seoContent.vocabulary.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonWords.seoContent.vocabulary.description')}
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('commonWords.seoContent.vocabulary.commonResponses')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                {t('commonWords.seoContent.vocabulary.responseExamples').map((example: string, index: number) => (
                  <div key={index}>• {example}</div>
                ))}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mt-4">{t('commonWords.seoContent.vocabulary.essentialVocabulary')}</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                {t('commonWords.seoContent.vocabulary.vocabularyExamples').map((example: string, index: number) => (
                  <li key={index}>• {example}</li>
                ))}
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('commonWords.seoContent.vocabulary.conclusion')}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonWords.seoContent.categories.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonWords.seoContent.categories.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('commonWords.seoContent.categories.numbersColors')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonWords.seoContent.categories.numbersExamples').map((example: string, index: number) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('commonWords.seoContent.categories.actionsObjects')}</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonWords.seoContent.categories.actionsExamples').map((example: string, index: number) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {t('commonWords.seoContent.categories.conclusion')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 