import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';
import { ChevronDown } from 'lucide-react';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeAlphabet() {
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

  const qaItems = [
    {
      question: "What is the International Morse Code alphabet?",
      answer: "The International Morse Code alphabet is a standardized encoding system that represents each letter from A to Z using combinations of dots (short signals) and dashes (long signals).\n\nThis system, also known as the morse code for alphabet, was established in 1865 and is used worldwide for radio communication, emergency signaling, and amateur radio operations."
    },
    {
      question: "How do I memorize the morse code alphabet chart?",
      answer: "Start with the most common letters like E (.) and T (-), then learn symmetric pairs like A (.-) and N (-.).\n\nUse mnemonic devices - for example, \"A\" sounds like \"About\" (short-long), and \"N\" sounds like \"No\" (long-short). Practice with our morse code alphabet translator to hear the rhythm of each letter."
    },
    {
      question: "What's the difference between American and International Morse Code?",
      answer: "The International Morse Code alphabet uses standardized timing ratios (3:1 for dash to dot) and specific letter encodings that differ from the original American Morse Code.\n\nThe International version is what's used globally today for amateur radio, maritime communication, and aviation, making it the standard morse code alphabet you should learn."
    },
    {
      question: "How long does it take to learn the complete alphabet in morse code?",
      answer: "Most people can learn the basic morse code alphabet a to z in 2-4 weeks with daily practice.\n\nStart with high-frequency letters and practice 15-20 minutes daily. Use audio training rather than just visual memorization - the rhythm and sound patterns are crucial for building muscle memory with the alphabet morse code."
    },
    {
      question: "Can I download a printable morse code alphabet chart?",
      answer: "Yes! Use the \"Print Alphabet Chart\" button above to create a printable morse code alphabet reference.\n\nThis morse code alphabet chart includes all 26 letters with their corresponding dot-dash patterns, perfect for offline study and quick reference during practice sessions."
    },
    {
      question: "What is morse code alphabet tapping?",
      answer: "Morse code alphabet tapping is a method of transmitting morse code by tapping short and long sounds instead of using electronic signals.\n\nShort taps represent dots, long taps represent dashes. This technique is useful for covert communication and was famously used by prisoners of war to communicate through walls using the alphabet in morse code system."
    }
  ];

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
        title="Morse Code Alphabet – Complete A to Z Letter Chart & Guide"
        description="Complete morse code alphabet chart from A to Z. Learn each letter's dot-dash pattern, pronunciation guide, and memory techniques."
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 print:hidden">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Morse Code Alphabet Chart
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Complete A to Z reference for the International Morse Code alphabet
          </p>
          <div className="mt-6">
            <button
              onClick={printPage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Print Alphabet Chart
            </button>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block">
          <h1 className="text-center text-2xl font-bold mb-6">Morse Code Alphabet Chart (A-Z)</h1>
        </div>

        {/* Alphabet Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Letters A-Z</h2>
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
            How to Learn the Morse Code Alphabet
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Memory Techniques:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Start with E and T</strong>: Single dot (.) and single dash (-)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Common words</strong>: Learn "SOS" (...---...) first</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Word associations</strong>: "A" (.-) = "About", "N" (-.) = "No"</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Practice rhythm</strong>: Focus on timing patterns, not just dots/dashes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Learning Tips:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>High-frequency letters</strong>: Master E, T, A, O, I, N first</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Symmetric patterns</strong>: AN, DU, BV pairs have reverse patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Progressive practice</strong>: Start with 5 letters, gradually add more</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Audio practice</strong>: Use our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse code translator</a> for sound training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Letters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Most Common Letters in English
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Understanding letter frequency helps prioritize learning the most useful morse code patterns first. These six letters represent over 50% of typical English text, making them essential for efficient morse code communication.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['E', 'T', 'A', 'O', 'I', 'N'].map(letter => {
              const code = morseCodeMap[letter];
              return (
                <div key={letter} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 font-mono mb-1">{letter}</div>
                  <div className="text-lg font-mono text-blue-600 dark:text-blue-400">{code}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {letter === 'E' ? '12.02%' : letter === 'T' ? '9.10%' : letter === 'A' ? '8.12%' :
                     letter === 'O' ? '7.68%' : letter === 'I' ? '6.97%' : '6.75%'} frequency
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Letter Pattern Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Morse Code Letter Pattern Analysis
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">Single Signal Letters</h3>
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
                Easiest to learn and most frequently used letters in morse code.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Symmetric Patterns</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>A/N</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">.- / -.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>D/U</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">-.. / ..-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>B/V</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">-... / ...-</span>
                </div>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3">
                Learning pairs with reversed patterns helps with memorization.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Complex Patterns</h3>
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
                Less common letters with unique patterns requiring focused practice.
              </p>
            </div>
          </div>
        </div>

        {/* International Usage and Standards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            International Usage and Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Global Standardization</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The International Morse Code alphabet is regulated by the International Telecommunication Union (ITU) and remains consistent across all countries and languages. This universal standard ensures reliable communication between operators worldwide, regardless of their native language.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• ITU-R Radio Regulations define official morse standards</li>
                <li>• Used by 193 UN member countries for emergency communication</li>
                <li>• Maritime and aviation protocols mandate morse proficiency</li>
                <li>• Amateur radio licensing requires morse code knowledge in many regions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Professional Applications</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Professional morse code operators in various fields rely on the alphabet's consistency for critical communications. From maritime rescue operations to aviation navigation, the morse alphabet serves as a reliable backup when digital systems fail.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• Coast Guard search and rescue operations</li>
                <li>• Aircraft navigation beacon identification</li>
                <li>• Military communication in electronic warfare environments</li>
                <li>• Emergency services backup communication protocols</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Frequently Asked Questions About Morse Code Alphabet
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
              Master the Complete Morse Code Alphabet: Your A to Z Learning Guide
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Learning the <strong>morse code alphabet</strong> opens the door to a fascinating world of communication used by amateur radio operators, emergency services, and maritime professionals worldwide. This comprehensive guide covers every letter from A to Z, providing you with the essential foundation for mastering <strong>morse code for alphabet</strong> communication.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Essential Learning Points:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Complete <strong>alphabet morse code chart</strong> with timing guides</li>
                  <li>• International standard patterns used globally</li>
                  <li>• Memory techniques for faster alphabet learning</li>
                  <li>• Audio training integration for proper rhythm</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Practical Applications:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Amateur radio licensing requirements</li>
                  <li>• Emergency communication protocols</li>
                  <li>• Maritime and aviation safety procedures</li>
                  <li>• Historical telegraphy understanding</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Morse Code Alphabet Training and Resources
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Whether you're studying for amateur radio certification or developing emergency communication skills, our <strong>morse code alphabet simulator</strong> and training resources provide comprehensive support for learning <strong>the morse code alphabet</strong>. From beginner-friendly charts to advanced timing exercises, master every aspect of morse alphabet communication.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Reference - Most Important Letters:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Emergency:</strong><br />
                  S: ... | O: --- | S: ...
                </div>
                <div>
                  <strong>Common:</strong><br />
                  E: . | T: - | A: .-
                </div>
                <div>
                  <strong>Practice:</strong><br />
                  Use our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">translator tool</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Related Morse Code Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/sheet/morse-code-numbers" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Morse Code Numbers</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Learn digits 0-9 in morse code</p>
            </a>
            <a href="/sheet/morse-code-sheet" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Complete Reference</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Full morse code chart with punctuation</p>
            </a>
            <a href="/learn/basic-and-tips" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Learning Guide</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Tips and techniques for faster learning</p>
            </a>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}