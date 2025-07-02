import React from 'react';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeSheet() {
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
  

  


  const printPage = () => {
    window.print();
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
      title="Morse Code Reference Sheet"
      description="Complete Morse code reference sheet with letters, numbers, international standard punctuation marks and common abbreviations."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-between items-start mb-8 sm:mb-12">
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Morse Code Reference Sheet
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              Complete reference for Morse code characters and abbreviations
            </p>
          </div>
          <button
            onClick={printPage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base print:hidden ml-4 flex-shrink-0"
          >
            Print Reference Sheet
          </button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Letters */}
          <CompactGridSection title="Letters (A-Z)" data={letters} />
          
          {/* Numbers */}
          <CompactGridSection title="Numbers (0-9)" data={numbers} />
          
          {/* Punctuation */}
          <CompactGridSection title="Punctuation Marks (International Standard)" data={punctuation} />
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

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Morse Code Reference Guide
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This comprehensive Morse code sheet contains every letter, number, and punctuation mark you need for Morse code communication. Learn how <strong>letter A in Morse code</strong> is represented as ".-" (dot-dash), <strong>letter B in Morse code</strong> as "-..." (dash-dot-dot-dot), and <strong>letter C in Morse code</strong> as "-.-." (dash-dot-dash-dot). Our reference guide covers the complete alphabet from A to Z, numbers 0 through 9, and essential punctuation marks. Whether you're learning Morse code for amateur radio, emergency communications, or historical interest, this printable reference sheet provides accurate International Morse Code standards used worldwide by radio operators and telecommunications professionals.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Essential Morse Code Alphabet and Numbers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Master the International Morse Code alphabet with our detailed reference showing each letter's unique dot and dash pattern. From the simple <strong>letter E in Morse code</strong> (single dot ".") to more complex letters like <strong>Y in Morse code</strong> ("-.--"), this chart provides the foundation for all Morse code communication. Numbers in Morse code follow a logical pattern: <strong>number 1 in Morse code</strong> is ".----", <strong>number 2 in Morse code</strong> is "..---", continuing through <strong>number 9 in Morse code</strong> as "----." and <strong>number 0 in Morse code</strong> as "-----". Professional radio operators rely on these standardized patterns for clear, unambiguous communication across all languages and cultures. Print this reference sheet for offline practice and quick lookup during your Morse code learning journey.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 