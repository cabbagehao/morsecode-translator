import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { commonPhrases } from '../utils/morseCode';
import { useI18n } from '../contexts/I18nContext';
import { getCurrentLocale, getLocalizedPath } from '../i18n';

interface MorseCharacter {
  char: string;
  code: string;
}

export default function CommonPhrases() {
  const location = useLocation();
  const { t } = useI18n();
  const currentLocale = getCurrentLocale(location.pathname);
  // Extract phrases from commonPhrases (phrases that contain spaces)
  const phrases: MorseCharacter[] = Object.entries(commonPhrases)
    .filter(([phrase]) => phrase.includes(' '))
    .map(([phrase, code]) => ({
      char: phrase,
      code
    }));

  // Group phrases by category
  const greetingsAndBasic = phrases.filter(p =>
    ['GOOD MORNING', 'GOOD EVENING', 'GOOD NIGHT', 'GOODBYE', 'SEE YOU', 'WELCOME', 'THANK YOU', 'EXCUSE ME'].includes(p.char)
  );

  const emotionsAndRelationships = phrases.filter(p =>
    ['I LOVE YOU', 'MISS YOU', 'HAPPY BIRTHDAY', 'CONGRATULATIONS', 'I AM SORRY', 'FORGIVE ME', 'I CARE ABOUT YOU', 'BEST WISHES', 'TAKE CARE', 'BE SAFE'].includes(p.char)
  );

  const emergencyAndImportant = phrases.filter(p =>
    ['HELP ME', 'EMERGENCY', 'CALL DOCTOR', 'NEED HELP', 'URGENT', 'FIRE', 'POLICE', 'AMBULANCE'].includes(p.char)
  );

  const dailyCommunication = phrases.filter(p =>
    ['HOW ARE YOU', 'I AM FINE', 'WHAT TIME', 'WHERE ARE YOU', 'SEE YOU LATER', 'TALK TO YOU LATER', 'HAVE A NICE DAY', 'GOOD LUCK', 'BE CAREFUL', 'DRIVE SAFELY'].includes(p.char)
  );

  const questionsAndResponses = phrases.filter(p =>
    ['I DO NOT KNOW', 'I UNDERSTAND', 'I DO NOT UNDERSTAND', 'CAN YOU HELP', 'WHAT IS YOUR NAME', 'MY NAME IS', 'NICE TO MEET YOU'].includes(p.char)
  );

  const weatherAndEnvironment = phrases.filter(p =>
    ['BEAUTIFUL DAY', 'COLD WEATHER', 'HOT WEATHER', 'SUNNY DAY', 'RAINY DAY'].includes(p.char)
  );

  const foodAndBasicNeeds = phrases.filter(p =>
    ['I AM HUNGRY', 'I AM THIRSTY', 'GOOD FOOD', 'DELICIOUS', 'WATER PLEASE'].includes(p.char)
  );

  const travelAndDirections = phrases.filter(p =>
    ['WHERE IS', 'HOW FAR', 'SAFE JOURNEY', 'ARRIVED SAFELY', 'LOST', 'NEED DIRECTIONS'].includes(p.char)
  );

  const familyAndHome = phrases.filter(p =>
    ['FAMILY', 'HOME SWEET HOME', 'MOTHER', 'FATHER'].includes(p.char)
  );

  const GridSection = ({ titleKey, data }: { titleKey: string; data: MorseCharacter[] }) => {
    if (data.length === 0) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{t(`commonPhrases.categories.${titleKey}`)}</h2>
        </div>
        <div className="p-3 sm:p-4">
          <div className="grid gap-2 sm:gap-3 grid-cols-1 lg:grid-cols-2">
            {data.map(({ char, code }) => (
              <div key={char} className="flex items-center justify-between p-3 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex flex-col flex-1 mr-4">
                  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {char}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                    {code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title={t('commonPhrases.meta.title')}
      description={t('commonPhrases.meta.description')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('commonPhrases.header.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            {t('commonPhrases.header.subtitle')}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <GridSection titleKey="greetingsBasic" data={greetingsAndBasic} />
          <GridSection titleKey="emotionsRelationships" data={emotionsAndRelationships} />
          <GridSection titleKey="emergencyImportant" data={emergencyAndImportant} />
          <GridSection titleKey="dailyCommunication" data={dailyCommunication} />
          <GridSection titleKey="questionsResponses" data={questionsAndResponses} />
          <GridSection titleKey="weatherEnvironment" data={weatherAndEnvironment} />
          <GridSection titleKey="foodBasicNeeds" data={foodAndBasicNeeds} />
          <GridSection titleKey="travelDirections" data={travelAndDirections} />
          <GridSection titleKey="familyHome" data={familyAndHome} />
        </div>

        {/* Usage tips */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            {t('commonPhrases.tips.title')}
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            {t('commonPhrases.tips.items').map((tip: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical applications */}
        <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('commonPhrases.applications.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('commonPhrases.applications.emergency.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('commonPhrases.applications.emergency.description')}
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('commonPhrases.applications.radio.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('commonPhrases.applications.radio.description')}
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('commonPhrases.applications.educational.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('commonPhrases.applications.educational.description')}
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonPhrases.seo.section1.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonPhrases.seo.section1.intro')} <a href={getLocalizedPath('/sheet', currentLocale)} className="text-blue-600 dark:text-blue-400 hover:underline">{t('commonPhrases.seo.section1.linkText')}</a> section.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{t('commonPhrases.seo.section1.categories.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonPhrases.seo.section1.categories.social.title')}</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    {t('commonPhrases.seo.section1.categories.social.items').map((item: string, index: number) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonPhrases.seo.section1.categories.emergency.title')}</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    {t('commonPhrases.seo.section1.categories.emergency.items').map((item: string, index: number) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {t('commonPhrases.seo.section1.conclusion')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('commonPhrases.seo.section2.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('commonPhrases.seo.section2.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonPhrases.seo.section2.categories.social.title')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonPhrases.seo.section2.categories.social.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonPhrases.seo.section2.categories.daily.title')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonPhrases.seo.section2.categories.daily.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('commonPhrases.seo.section2.categories.emergency.title')}</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {t('commonPhrases.seo.section2.categories.emergency.items').map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4" dangerouslySetInnerHTML={{ __html: t('commonPhrases.seo.section2.conclusion') }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}