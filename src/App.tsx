import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import TranslatorBox from './components/TranslatorBox';
import Instructions from './components/Instructions';
import { useTranslator } from './contexts/TranslatorContext';
import History from './pages/History';
import Learn from './pages/Learn';
import BasicAndTips from './pages/BasicAndTips';
import Sheet from './pages/Sheet';
import MorseCodeSheet from './pages/MorseCodeSheet';
import CommonWords from './pages/CommonWords';
import CommonPhrases from './pages/CommonPhrases';
import CommonAbbr from './pages/CommonAbbr';
import TxtToMorseEncoder from './pages/TxtToMorseEncoder';
import DecodeText from './pages/DecodeText';
import DecodeImage from './pages/DecodeImage';
import DecodeAudio from './pages/DecodeAudio';
import Shop from './pages/Shop';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ArrowDownUp } from 'lucide-react';

function Translator() {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();

  return (
    <Layout
      title="Online Morse Code Translator"
      description="Free online Morse code translator. Convert text to Morse code and Morse code to text instantly. Support for letters, numbers, and punctuation marks."
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-4 md:pt-2">
        <header className="text-center mb-4 sm:mb-6 md:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-2">
            Morse Code Translator
          </h1>
          <p className="text-sm sm:text-base md:text-sm lg:text-lg text-gray-600 dark:text-gray-400">
            Convert text to Morse code and vice versa instantly
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="space-y-4 sm:space-y-6">
            <TranslatorBox
              label="Text"
              value={text}
              onChange={handleTextChange}
              autoFocus={true}
            />
            <div className="flex justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                <ArrowDownUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </div>
            <TranslatorBox
              label="Morse Code"
              value={morse}
              onChange={handleMorseChange}
              showSettings
            />
          </div>
        </div>

        <Instructions />

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          {/* How to Use Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How to Use Our Free Morse Code Translator
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Using our <strong>morse code translator</strong> is incredibly simple and intuitive. Simply type your text in the upper box to instantly <strong>translate text to morse code</strong>, or enter morse code signals in the lower box to <strong>translate morse code to english</strong>. Whether you want to encode messages like <em>"hello in morse code"</em> or decode emergency signals, our tool provides instant, accurate results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Text to Morse:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Type any text or phrase in the text box</li>
                  <li>• Watch as it converts to <strong>dots (•) and dashes (-)</strong> instantly</li>
                  <li>• Try popular phrases like <em>"i love you in morse code"</em></li>
                  <li>• Use audio playback to hear the morse signals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Morse to Text:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Enter morse code using dots and dashes</li>
                  <li>• Get instant translation to readable English</li>
                  <li>• Perfect for decoding <em>"SOS morse code"</em> signals</li>
                  <li>• Supports standard <strong>International Morse Code</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works - The Science Behind Morse Code Translation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our advanced <strong>morse code converter</strong> utilizes the standard <strong>International Morse Code</strong> system, where each letter and number is represented by unique combinations of <strong>dots (•) and dashes (-)</strong>. The algorithm instantly processes your input, whether you're encoding <em>"how to say hello in morse code"</em> or decoding complex telegraph messages.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Character Mapping</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Each character is mapped to its corresponding morse pattern - dots represent short signals, dashes represent long signals</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Processing</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Our <strong>morse code decoder</strong> processes input instantly, providing immediate feedback as you type</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Audio Generation</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">The system generates authentic morse audio signals with adjustable speed and frequency for authentic communication experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features of Our Professional Morse Code Translator
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Experience the most comprehensive <strong>morse code translator</strong> available online, designed for both beginners learning basic phrases and professionals requiring precise morse communication. From encoding simple messages to decoding emergency signals, our platform delivers unmatched accuracy and functionality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bidirectional Translation</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Seamlessly convert between text and morse code in both directions with our advanced <strong>morse code converter</strong></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Audio Playback</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Listen to authentic morse signals with customizable speed, perfect for learning how morse code sounds</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Light Simulator</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Watch morse signals with visual light indicators, simulating traditional telegraph operations</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Character Support</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Supports full alphabet, numbers 0-9, punctuation marks, and prosigns following <strong>International Morse Code</strong> standards</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Resources</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Access comprehensive learning materials, reference sheets, and practice exercises for mastering morse communication</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency Ready</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Perfect for emergency preparedness with built-in <em>SOS morse code</em> support and distress signal references</p>
              </div>
            </div>
          </div>

          {/* Complete Learning Platform Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Morse Code Learning Platform with Advanced Features
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Beyond simple translation, our platform serves as a comprehensive learning environment for mastering morse communication. Whether you're preparing for amateur radio licensing, learning naval communication protocols, or simply curious about encoding messages like <em>"what is morse code for love"</em>, our tools provide everything needed for proficiency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Learning Tools:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Interactive morse code alphabet charts and reference sheets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Practice common phrases including greetings, emergency signals, and expressions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Step-by-step tutorials for encoding popular messages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Audio training with adjustable speeds from beginner to professional levels</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Professional Applications:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Amateur radio (HAM) communication and licensing preparation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Maritime and aviation emergency communication protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Military and tactical communication training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Educational applications for STEM learning and problem-solving skills</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                <strong>Popular Searches:</strong> Users frequently convert phrases like <em>"hello world morse code"</em>, <em>"thank you in morse code"</em>, and learn about encoding personal messages. Our platform supports all common expressions and provides cultural context for historical morse usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Translator />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/learn/basic-and-tips" element={<BasicAndTips />} />
      <Route path="/learn/history" element={<History />} />
      <Route path="/sheet" element={<Sheet />} />
      <Route path="/sheet/morse-code-sheet" element={<MorseCodeSheet />} />
      <Route path="/sheet/common-abbr" element={<CommonAbbr />} />
      <Route path="/sheet/common-words" element={<CommonWords />} />
      <Route path="/sheet/common-phrases" element={<CommonPhrases />} />
      {/* Redirect old encoder path to new decoder path */}
      <Route path="/encoders/txt-to-morse" element={<Navigate to="/decoders/txt-to-morse" replace />} />
      <Route path="/decoders/txt-to-morse" element={<TxtToMorseEncoder />} />
      <Route path="/decoders/decode-text" element={<DecodeText />} />
      <Route path="/decoders/decode-image" element={<DecodeImage />} />
      <Route path="/decoders/decode-audio" element={<DecodeAudio />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}

export default App;