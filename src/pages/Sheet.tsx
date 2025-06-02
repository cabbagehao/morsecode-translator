import React from 'react';
import { Layout } from '../components/Layout';
import { getMorseCodeMap, morseAbbreviations, commonPhrases } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function Sheet() {
  const morseCodeMap = getMorseCodeMap();
  
  // Categorize characters
  const letters: MorseCharacter[] = [];
  const numbers: MorseCharacter[] = [];
  const punctuation: MorseCharacter[] = [];
  
  // Categorize all characters (International Standard)
  Object.entries(morseCodeMap).forEach(([char, code]) => {
    if (char === ' ' || char === '\n') return; // Skip space and newline
    
    if (/[A-Z]/.test(char)) {
      letters.push({ char, code });
    } else if (/[0-9]/.test(char)) {
      numbers.push({ char, code });
    } else if (/[.,:;?!()"'@&=+\-_$/]/.test(char)) {
      punctuation.push({ char, code });
    }
    // Only international standard characters are included
  });
  
  // Convert abbreviations to array
  const abbreviations: MorseCharacter[] = Object.entries(morseAbbreviations).map(([abbr, code]) => ({
    char: abbr,
    code,
    description: getAbbreviationDescription(abbr)
  }));
  
  // Convert common phrases to array
  const phrases: MorseCharacter[] = Object.entries(commonPhrases).map(([phrase, code]) => ({
    char: phrase,
    code
  }));
  
  function getAbbreviationDescription(abbr: string): string {
    const descriptions: { [key: string]: string } = {
      'SOS': 'International distress signal',
      'CQ': 'Calling any station',
      'QTH': 'What is your location?',
      'QSL': 'I acknowledge receipt',
      'QRZ': 'Who is calling me?',
      'QRT': 'Stop sending',
      'QRX': 'Please wait',
      'QSY': 'Change frequency',
      'QRM': 'Interference',
      'QRN': 'Static interference',
      'QSB': 'Signal strength varies',
      'QTC': 'I have a message to send',
      'QTR': 'What time is it?',
      'AR': 'End of message',
      'AS': 'Wait/Stand by',
      'K': 'Go ahead/Over',
      'KN': 'Go ahead (specific station only)',
      'SK': 'End of work/Clear',
      'BT': 'Break/Separator',
      'OK': 'Okay/Yes',
      'TU': 'Thank you',
      '73': 'Best wishes',
      '88': 'Love and kisses',
      'OM': 'Old man (fellow ham)',
      'YL': 'Young lady',
      'XYL': 'Wife (ex-young lady)',
      'FB': 'Fine business (excellent)',
      'HI': 'Laughter',
      'ES': 'And',
      'DE': 'From/This is',
      'TNX': 'Thanks',
      'WX': 'Weather',
      'HR': 'Here',
      'UR': 'Your/You are',
      'RST': 'Signal report',
      'PSE': 'Please',
      'CUL': 'See you later',
      'BCNU': 'Be seeing you',
      'GM': 'Good morning',
      'GA': 'Good afternoon',
      'GE': 'Good evening',
      'GN': 'Good night',
      'WPM': 'Words per minute',
      'AGN': 'Again',
      'NIL': 'Nothing/Zero',
      'R': 'Received/Roger',
      'C': 'Correct/Yes',
      'N': 'No/Negative',
      'IMI': 'Repeat/Say again',
      'AA': 'All after',
      'AB': 'All before',
      'WA': 'Word after',
      'WB': 'Word before',
      'CFM': 'Confirm',
      'RPT': 'Repeat'
    };
    return descriptions[abbr] || '';
  }

  const GridSection = ({ title, data, showDescription = false, columns = 4 }: { 
    title: string; 
    data: MorseCharacter[]; 
    showDescription?: boolean;
    columns?: number;
  }) => {
    const isCommonPhrases = title.includes('Common Phrases');
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="p-3 sm:p-4">
          <div className={`grid gap-2 sm:gap-3 ${columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
            {data.map(({ char, code, description }) => (
              <div key={char} className="flex items-center justify-between p-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono min-w-[1.5rem] sm:min-w-[2rem] text-center">
                    {char}
                  </span>
                  <span className={`text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 ${!isCommonPhrases ? 'whitespace-nowrap' : ''}`}>
                    {code}
                  </span>
                </div>
                {showDescription && description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 text-right flex-1 hidden sm:block">
                    {description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CompactGridSection = ({ title, data }: { title: string; data: MorseCharacter[] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {data.map(({ char, code }) => (
            <div key={char} className="flex flex-col items-center p-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono">
                {char}
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
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
      title="Morse Code Sheet"
      description="Complete Morse code reference sheet with letters, numbers, international standard punctuation marks and common abbreviations."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Morse Code Sheet
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Complete reference for Morse code characters and abbreviations
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Letters */}
          <CompactGridSection title="Letters (A-Z)" data={letters} />
          
          {/* Numbers */}
          <CompactGridSection title="Numbers (0-9)" data={numbers} />
          
          {/* Punctuation */}
          <CompactGridSection title="Punctuation Marks (International Standard)" data={punctuation} />
          
          {/* Common Abbreviations */}
          <GridSection title="Common Abbreviations" data={abbreviations} showDescription={true} columns={3} />
          
          {/* Common Phrases */}
          <GridSection title="Common Phrases" data={phrases} showDescription={false} columns={2} />
        </div>

        {/* Usage Notes */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            Usage Notes
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Dot (.) represents a short signal, dash (-) represents a long signal</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between elements of the same letter equals one dot duration</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between letters equals three dot durations</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between words equals seven dot durations</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Common abbreviations improve communication efficiency in amateur radio</span>
            </li>
          </ul>
        </div>

        {/* SEO Description */}
        <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Quick Reference for Morse Code Characters
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            Welcome to our Morse Code Chart page, a quick and comprehensive reference tool to help you easily master the basics of Morse code. 
            The page includes the <strong>Morse Code Alphabet</strong> (A-Z letter mappings) and <strong>Morse Code Numbers</strong> (0-9 digit encodings), 
            as well as punctuation marks, special symbols (like / and =), and common abbreviations such as <strong>SOS Morse Code</strong> and CQ. 
            If you've ever wondered how to express <strong>"I love you in Morse Code,"</strong> or wanted to learn about <strong>SOS in Morse Code</strong> 
            (the famous "3 dots and a dash"), this is the fastest way to find your answers!
          </p>
        </div>
      </div>
    </Layout>
  );
} 