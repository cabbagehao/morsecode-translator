import React from 'react';
import { Layout } from '../components/Layout';
import { morseAbbreviations } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

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

export default function CommonAbbr() {
  const abbreviations: MorseCharacter[] = Object.entries(morseAbbreviations).map(([abbr, code]) => ({
    char: abbr,
    code,
    description: getAbbreviationDescription(abbr)
  }));

  return (
    <Layout 
      title="Common Morse Code Abbreviations"
      description="Learn common Morse code abbreviations used in amateur radio and telecommunications."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Common Morse Code Abbreviations
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Essential abbreviations for amateur radio and efficient communication
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Common Abbreviations</h2>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {abbreviations.map(({ char, code, description }) => (
                  <div key={char} className="flex items-center justify-between p-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono min-w-[1.5rem] sm:min-w-[2rem] text-center">
                        {char}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {code}
                      </span>
                    </div>
                    {description && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 text-right flex-1 hidden sm:block">
                        {description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            About Morse Code Abbreviations
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Q-codes (like QTH, QSL) are standardized three-letter codes used in amateur radio</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Prosigns (like AR, SK, BT) are procedural signals that control the flow of communication</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Number codes (73, 88) are traditional ham radio greetings and sign-offs</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>SOS (...---...) is the internationally recognized distress signal</span>
            </li>
          </ul>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Essential Morse Code Emergency Signals and Amateur Radio Abbreviations
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Learn the most critical Morse code abbreviations used in emergency communications and amateur radio operations.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Critical Emergency Signals:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Distress & Emergency:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>SOS in Morse code</strong>: "...---..." (international distress)</li>
                    <li>• Transmitted as three dots, three dashes, three dots</li>
                    <li>• No spaces between letters for emergency</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Operational Signals:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>CQ in Morse code</strong>: "-.-. --.-" (calling any station)</li>
                    <li>• <strong>QRT in Morse code</strong>: "--.- .-. -" (stop sending)</li>
                    <li>• Used by ham radio operators worldwide</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Ham radio operators worldwide rely on these standardized abbreviations for efficient communication during emergencies, contests, and daily operations.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Q-Codes and Ham Radio Prosigns Reference
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our comprehensive collection includes over 50 standard Q-codes and prosigns used by licensed amateur radio operators and maritime communications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Popular Q-Codes:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>QTH in Morse code</strong>: "--.- - ...." ("location?")</li>
                  <li>• <strong>QSL in Morse code</strong>: "--.- ... .-.." ("I acknowledge")</li>
                  <li>• <strong>73 in Morse code</strong>: "--... ...--" ("best wishes")</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Procedural Signals:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>AR in Morse code</strong>: ".- .-.." ("end of message")</li>
                  <li>• <strong>SK in Morse code</strong>: "... -.-" ("end of work")</li>
                  <li>• Used in amateur radio protocols</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              These time-tested abbreviations have facilitated clear, efficient radio communication for over a century, forming the backbone of international amateur radio protocols and emergency communication systems.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
