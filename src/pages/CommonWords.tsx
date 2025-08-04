import React from 'react';
import { Layout } from '../components/Layout';
import { commonPhrases } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
}

export default function CommonWords() {
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
      title="100+ Common Words in Morse Code - Essential Vocabulary with Audio"
      description="Master 100+ essential English words in Morse code. Complete reference with dots/dashes for daily vocabulary, actions, colors, numbers, and emergency communication practice."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            100+ Common Words in Morse Code Reference
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Essential English vocabulary in Morse code with dots and dashes. Perfect for beginners learning daily communication, emergency signals, and amateur radio practice.
          </p>
        </div>

        {/* Quick Reference Navigation */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Quick Reference Categories in Morse Code</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="text-blue-800 dark:text-blue-200">📢 Basic Responses in Morse (YES, NO, HELLO)</div>
            <div className="text-blue-800 dark:text-blue-200">🔢 Numbers in Morse (ONE, TWO, THREE)</div>
            <div className="text-blue-800 dark:text-blue-200">🎨 Colors in Morse (RED, BLUE, GREEN)</div>
            <div className="text-blue-800 dark:text-blue-200">🆘 Emergency Words in Morse (HELP, STOP, WAIT)</div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {basicResponses.length > 0 && (
            <CompactGridSection 
              title={`📢 Basic Responses in Morse Code (${basicResponses.length})`} 
              data={basicResponses} 
            />
          )}
          
          {emergencyWords.length > 0 && (
            <CompactGridSection 
              title={`🆘 Emergency Words in Morse Code (${emergencyWords.length})`} 
              data={emergencyWords} 
            />
          )}
          
          {actionWords.length > 0 && (
            <CompactGridSection 
              title={`⚡ Action Words in Morse Code (${actionWords.length})`} 
              data={actionWords} 
            />
          )}
          
          {commonArticles.length > 0 && (
            <CompactGridSection 
              title={`📝 Common Articles & Pronouns in Morse Code (${commonArticles.length})`} 
              data={commonArticles} 
            />
          )}
          
          {numbers.length > 0 && (
            <CompactGridSection 
              title={`🔢 Numbers in Morse Code (${numbers.length})`} 
              data={numbers} 
            />
          )}
          
          {colors.length > 0 && (
            <CompactGridSection 
              title={`🎨 Colors in Morse Code (${colors.length})`} 
              data={colors} 
            />
          )}
          
          {timeWords.length > 0 && (
            <CompactGridSection 
              title={`⏰ Time Words in Morse Code (${timeWords.length})`} 
              data={timeWords} 
            />
          )}
          
          {objects.length > 0 && (
            <CompactGridSection 
              title={`🏠 Objects & Places in Morse Code (${objects.length})`} 
              data={objects} 
            />
          )}
          
          {otherWords.length > 0 && (
            <CompactGridSection 
              title={`📚 Other Common Words in Morse Code (${otherWords.length})`} 
              data={otherWords} 
            />
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            📊 Total Morse Code Words: {uniqueWords.length}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm">
            <div className="text-gray-600 dark:text-gray-400">📢 Basic Responses in Morse: {basicResponses.length}</div>
            <div className="text-gray-600 dark:text-gray-400">🆘 Emergency Words in Morse: {emergencyWords.length}</div>
            <div className="text-gray-600 dark:text-gray-400">⚡ Action Words in Morse: {actionWords.length}</div>
            <div className="text-gray-600 dark:text-gray-400">📝 Articles in Morse: {commonArticles.length}</div>
            <div className="text-gray-600 dark:text-gray-400">🔢 Numbers in Morse: {numbers.length}</div>
            <div className="text-gray-600 dark:text-gray-400">🎨 Colors in Morse: {colors.length}</div>
            <div className="text-gray-600 dark:text-gray-400">⏰ Time Words in Morse: {timeWords.length}</div>
            <div className="text-gray-600 dark:text-gray-400">🏠 Objects in Morse: {objects.length}</div>
            <div className="text-gray-600 dark:text-gray-400">📚 Other Words in Morse: {otherWords.length}</div>
          </div>
        </div>

        {/* Usage tips */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            Learning Tips for Common Words
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Start with simple words like morse code YES, NO, HELLO to build confidence</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Learn basic words (THE, AND, YOU, ARE) as they appear in many messages</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Practice action words (COME, GIVE, TAKE, MAKE) for interactive communication</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Study numbers as words (ONE, TWO, THREE) for clear numeric communication</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Master colors and objects for descriptive messages</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Practice words you use frequently in daily conversation</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Listen for rhythm patterns to help memorize longer words</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Group similar words together (like greetings or emotions) for easier learning</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>These words form the building blocks for more complex phrases</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Find more reference materials in our complete <a href="/sheet" className="text-blue-600 dark:text-blue-400 hover:underline">morse code chart</a> collection</span>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Word Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Responses</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Essential words like YES, NO, MAYBE, HELLO, GOODBYE for basic communication.
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emotions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Words expressing feelings and relationships for personal communication.
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emergencies</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Critical words like HELP, EMERGENCY, FIRE, POLICE for urgent situations.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Progress Guide */}
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4">
            How to Learn These Words Effectively
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Beginner Level (Start Here)</h4>
              <ol className="space-y-1 text-green-700 dark:text-green-300 text-sm list-decimal list-inside">
                <li>Learn basic responses: YES, NO, HELLO, GOODBYE</li>
                <li>Master common articles: THE, AND, FOR, BUT</li>
                <li>Practice short words: YOU, ARE, CAN, HAD, HER, WAS</li>
                <li>Add emergency words: HELP, STOP, WAIT</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Advanced Level</h4>
              <ol className="space-y-1 text-green-700 dark:text-green-300 text-sm list-decimal list-inside">
                <li>Learn action verbs: COME, GIVE, TAKE, MAKE, WORK</li>
                <li>Master descriptive words: colors, numbers, objects</li>
                <li>Practice complex words: HOUSE, PLACE, TRAIN</li>
                <li>Combine words into simple sentences</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Practical Usage Examples */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-4">
            Real-World Usage Examples
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Emergency Communication</h4>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                  <strong>HELP FIRE</strong> → ".... . .-.. .--. / ..-. .. .-. ."
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                  <strong>WATER STOP</strong> → ".-- .- - . .-. / ... - --- .--."
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Amateur Radio</h4>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                  <strong>HELLO YOU</strong> → ".... . .-.. .-.. --- / -.-- --- ..-"
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded">
                  <strong>COME HELP</strong> → "-.-. --- -- . / .... . .-.. .--."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Master Essential Morse Code Vocabulary for Daily Communication
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Build your Morse code fluency with over 100 frequently used English words, from basic vocabulary to everyday expressions.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Common Response Words:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                <div>• <strong>YES in Morse code</strong>: "-.-- . ..."</div>
                <div>• <strong>NO in Morse code</strong>: "-. ---"</div>
                <div>• <strong>HELLO in Morse code</strong>: ".... . .-.. .-.. ---"</div>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Essential Vocabulary:</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• Pronouns: <strong>YOU in Morse code</strong> ("-.-- --- ..-")</li>
                <li>• Verbs: <strong>COME in Morse code</strong> ("-.-. --- -- .")</li>
                <li>• Nouns: <strong>WATER in Morse code</strong> (".-- .- - . .-")</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Whether you're practicing for amateur radio licensing, emergency preparedness, or historical interest, these core vocabulary words form the foundation of effective Morse code communication in English-speaking communities worldwide.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Word Categories: Numbers, Colors, Actions, and Objects
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Expand your Morse code vocabulary across multiple categories with our organized word collection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Numbers & Colors:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>ONE in Morse code</strong>: "--- -. ."</li>
                  <li>• <strong>TWO in Morse code</strong>: "- .-- ---"</li>
                  <li>• <strong>THREE in Morse code</strong>: "- .... .-. . ."</li>
                  <li>• <strong>RED in Morse code</strong>: ".-. . -.."</li>
                  <li>• <strong>BLUE in Morse code</strong>: "-... .-.. ..- ."</li>
                  <li>• <strong>GREEN in Morse code</strong>: "--. .-. . . -."</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Actions & Objects:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>HELP in Morse code</strong>: ".... . .-.. .--."</li>
                  <li>• <strong>STOP in Morse code</strong>: "... - --- .--."</li>
                  <li>• <strong>WAIT in Morse code</strong>: ".-- .- .. -"</li>
                  <li>• <strong>BOOK in Morse code</strong>: "-... --- --- -.-"</li>
                  <li>• <strong>HOUSE in Morse code</strong>: ".... --- ..- ... ."</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              These categories are perfect for clear numeric communication, emergency operations, and developing conversational proficiency in Morse code.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 