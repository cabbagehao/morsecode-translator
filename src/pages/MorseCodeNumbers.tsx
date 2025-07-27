import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';
import { ChevronDown } from 'lucide-react';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeNumbers() {
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
  const numberPatterns = [
    { range: "1-5", description: "Start with dots, end with dashes", example: "1: .---- (1 dot + 4 dashes)" },
    { range: "6-9", description: "Start with dashes, end with dots", example: "6: -.... (1 dash + 4 dots)" },
    { range: "0", description: "Five dashes", example: "0: ----- (5 dashes)" }
  ];

  const qaItems = [
    {
      question: "How do numbers in morse code work?",
      answer: "Numbers in morse code use a consistent 5-signal system where each digit from 0-9 is represented by exactly 5 dots and dashes.\n\nNumbers 1-5 start with the corresponding number of dots followed by dashes, while numbers 6-9 start with dashes followed by dots. Zero is represented by five dashes (-----)."
    },
    {
      question: "What's the pattern for morse code numbers 1-10?",
      answer: "The pattern for morse code numbers 1-10 follows a logical sequence:\n\n• 1(.----), 2(..---), 3(...--), 4(....-), 5(.....)\n• 6(-....), 7(--...), 8(---..), 9(----.), 0(-----)\n\nNote that there is no \"10\" in morse - it would be transmitted as \"1\" followed by \"0\" as separate digits."
    },
    {
      question: "How to use a morse code numbers translator?",
      answer: "A morse code numbers translator converts digits into their corresponding dot-dash patterns and vice versa.\n\nSimply input numbers like \"123\" and the translator will output \".---- ..--- ...--\". Our numbers in morse code translator also provides audio playback to help you learn the rhythm and timing of each number."
    },
    {
      question: "Are there numbers in morse code for emergency use?",
      answer: "Yes, morse code with numbers is essential for emergency communications.\n\nNumbers are used for coordinates, frequencies, emergency codes like 911, and call signs. The consistent 5-signal pattern makes morse code in numbers reliable even in poor conditions, which is why it's still used in maritime and aviation emergency protocols."
    },
    {
      question: "How long does it take to learn morse code numbers 1-100?",
      answer: "Learning morse code numbers 1-100 starts with mastering the basic 0-9 digits, which typically takes 1-2 weeks with daily practice.\n\nOnce you know the individual digits, you can represent any number from 1 to 100 by combining them. Practice with our morse code translator numbers tool to build speed and accuracy with number sequences."
    },
    {
      question: "What are international morse code numbers standards?",
      answer: "International morse code numbers follow the ITU-R Radio Regulations standard, using the same 5-signal system worldwide.\n\nThis standardization ensures that numbers morse code is universally understood by amateur radio operators, maritime services, and aviation professionals globally, making it an essential component of international emergency communication protocols."
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
        title="Morse Code Numbers 0-9 | Complete Digital Chart"
        description="Learn morse code numbers 0 through 9 with our complete digital chart. Master the pattern system for encoding numbers in International Morse Code with audio."
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 print:hidden">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Morse Code Numbers Chart
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Complete reference for numbers 0-9 in International Morse Code
          </p>
          <div className="mt-6">
            <button
              onClick={printPage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Print Numbers Chart
            </button>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block">
          <h1 className="text-center text-2xl font-bold mb-6">Morse Code Numbers Chart (0-9)</h1>
        </div>

        {/* Numbers Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Numbers 0-9</h2>
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
            Understanding the Number Pattern System
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Morse code numbers</strong> follow a logical pattern that makes them easy to learn. Each number consists of exactly 5 signals (dots and dashes), making the system both consistent and memorable.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {numberPatterns.map((pattern, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Numbers {pattern.range}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{pattern.description}</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-mono">{pattern.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Learning Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How to Learn Morse Code Numbers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Learning Strategy:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">1.</span>
                  <span><strong>Start with 1 and 0</strong>: .---- and -----</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">2.</span>
                  <span><strong>Learn the 5-signal rule</strong>: All numbers use exactly 5 signals</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">3.</span>
                  <span><strong>Practice counting</strong>: Count from 1-10 repeatedly</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">4.</span>
                  <span><strong>Use audio training</strong>: Listen to number patterns regularly</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Memory Tips:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Count the dots</strong>: Number 1 has 1 dot, number 2 has 2 dots</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Mirror pattern</strong>: 1 and 9, 2 and 8, 3 and 7, 4 and 6</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Practice sequences</strong>: Phone numbers, dates, addresses</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-green-600 dark:text-green-400">•</span>
                  <span><strong>Use our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse translator</a></strong>: Convert numbers to hear patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Number Sequences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Common Number Sequences in Morse Code
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Professional morse code operators frequently encounter specific number sequences in various communication contexts. Understanding these common patterns enhances transmission efficiency and recognition speed during emergency and routine communications.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Emergency Numbers</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>911: ----. .---- .----</div>
                <div>112: .---- .---- ..---</div>
                <div>999: ----. ----. ----.</div>
                <div>000: ----- ----- -----</div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                These emergency sequences are vital for distress communication worldwide.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Common Sequences</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>123: .---- ..--- ...--</div>
                <div>007: ----- ----- --...</div>
                <div>100: .---- ----- -----</div>
                <div>555: ..... ..... .....</div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Practice with these sequences to build fluency in number transmission.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Radio Frequencies</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>144: .---- ....- ....-</div>
                <div>446: ....- ....- -....</div>
                <div>73: --... ...--</div>
                <div>88: ---.. ---..</div>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                Amateur radio operators use these frequency references regularly.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Context and Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Historical Context and Modern Applications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Historical Development</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The morse code number system was refined during the mid-1800s as telegraph networks expanded globally. The consistent 5-signal pattern for each digit was chosen for its clarity and resistance to transmission errors over long distances.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• <strong>1838:</strong> Samuel Morse develops original number encoding</li>
                <li>• <strong>1865:</strong> International Telegraph Union standardizes current system</li>
                <li>• <strong>1906:</strong> First SOS distress signal uses standardized numbers</li>
                <li>• <strong>1920s:</strong> Radio adoption expands number usage globally</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Modern Applications</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Today, morse code numbers remain essential in multiple professional contexts where reliable digital communication is critical, especially in environments with electromagnetic interference or equipment limitations.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• <strong>Aviation:</strong> Call signs and emergency frequency identification</li>
                <li>• <strong>Maritime:</strong> GPS coordinates and distress position reporting</li>
                <li>• <strong>Amateur Radio:</strong> Contest exchanges and technical communication</li>
                <li>• <strong>Military:</strong> Secure communication in electronic warfare environments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Training Techniques */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Training Techniques for Morse Code Numbers
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Professional morse code operators use specific training methodologies to achieve high-speed number transmission and reception. These techniques focus on pattern recognition rather than individual signal counting.
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Speed Building</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Start at 5 WPM for number groups</li>
                <li>• Practice with random 3-digit sequences</li>
                <li>• Use metronome for consistent timing</li>
                <li>• Gradually increase to 20+ WPM</li>
                <li>• Focus on rhythm over individual signals</li>
              </ul>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-3">Recognition Training</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Learn number sounds as complete units</li>
                <li>• Practice with phone numbers and dates</li>
                <li>• Use coordinate practice sessions</li>
                <li>• Train with weak signal conditions</li>
                <li>• Practice under time pressure</li>
              </ul>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
              <h3 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Error Reduction</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Use proper timing ratios consistently</li>
                <li>• Practice in noisy environments</li>
                <li>• Implement double-check procedures</li>
                <li>• Learn common error patterns</li>
                <li>• Develop correction techniques</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 print:hidden">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Frequently Asked Questions About Morse Code Numbers
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
              Master Morse Code Numbers: Complete Digital Communication Guide
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Understanding <strong>morse code numbers</strong> is essential for anyone serious about morse code communication. Whether you're preparing for amateur radio licensing, studying emergency protocols, or exploring historical telegraph methods, mastering <strong>numbers in morse code</strong> provides the foundation for transmitting precise numerical information over long distances.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Number System Benefits:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Consistent 5-signal pattern for all digits</li>
                  <li>• Logical progression that aids memorization</li>
                  <li>• Universal standard recognized worldwide</li>
                  <li>• Essential for emergency communication</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Practical Applications:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Radio frequency identification</li>
                  <li>• Emergency service contact numbers</li>
                  <li>• GPS coordinates and navigation</li>
                  <li>• Call sign and station identification</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Training for Morse Code Numbers: From Basic to Advanced
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Professional morse code operators rely on precise number transmission for critical communications. Our comprehensive training approach for <strong>morse code for numbers</strong> covers everything from basic digit recognition to advanced sequence transmission, ensuring you can handle any numerical communication requirement with confidence.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Reference - Number Patterns:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm font-mono">
                <div className="text-center">
                  <div className="font-bold">1-5</div>
                  <div className="text-blue-600 dark:text-blue-400">Dots first</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">6-9</div>
                  <div className="text-blue-600 dark:text-blue-400">Dashes first</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">0</div>
                  <div className="text-blue-600 dark:text-blue-400">All dashes</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">5 signals</div>
                  <div className="text-blue-600 dark:text-blue-400">Every number</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Practice</div>
                  <div><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Try our tool</a></div>
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
            <a href="/sheet/morse-code-alphabet" className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Morse Code Alphabet</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Learn letters A-Z in morse code</p>
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