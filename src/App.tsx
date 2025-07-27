import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import TranslatorBox from './components/TranslatorBox';
import Instructions from './components/Instructions';
import { useTranslator } from './contexts/TranslatorContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ArrowDownUp } from 'lucide-react';

// 懒加载组件优化
const History = React.lazy(() => import('./pages/History'));
const Learn = React.lazy(() => import('./pages/Learn'));
const BasicAndTips = React.lazy(() => import('./pages/BasicAndTips'));
const Sheet = React.lazy(() => import('./pages/Sheet'));
const MorseCodeSheet = React.lazy(() => import('./pages/MorseCodeSheet'));
const CommonWords = React.lazy(() => import('./pages/CommonWords'));
const CommonPhrases = React.lazy(() => import('./pages/CommonPhrases'));
const CommonAbbr = React.lazy(() => import('./pages/CommonAbbr'));
const TxtToMorseEncoder = React.lazy(() => import('./pages/TxtToMorseEncoder'));
const DecodeText = React.lazy(() => import('./pages/DecodeText'));
const DecodeImage = React.lazy(() => import('./pages/DecodeImage'));
const DecodeAudio = React.lazy(() => import('./pages/DecodeAudio'));
const MorseCodeSound = React.lazy(() => import('./pages/MorseCodeSound'));
const MorseCodeAlphabet = React.lazy(() => import('./pages/MorseCodeAlphabet'));
const MorseCodeNumbers = React.lazy(() => import('./pages/MorseCodeNumbers'));
const Shop = React.lazy(() => import('./pages/Shop'));

function Translator() {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();

  return (
    <Layout
      title="Online Morse Code Translator – Sound, Flash & Decode Audio"
      description="Free Morse code translator and decoder. Convert text to Morse, decode from audio or signals, play sound, flash light, and download audio instantly."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-4 sm:mb-6 md:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-2">
            Morse Code Translator
          </h1>
          <p className="text-sm sm:text-base md:text-sm lg:text-lg text-gray-600 dark:text-gray-400">
            Translate Morse to English & English to Morse code Instantly
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
          {/* Quick Start Guide - 操作指南维度 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Guide - Hands on morse code translater in seconds
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Get started immediately with our intuitive morse code translator. Whether you need to convert english phrases like <em>"hello in morse code"</em> or decode emergency signals received over long distances, our streamlined interface ensures instant results with professional accuracy following Samuel Morse's original system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Type Your Message</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Enter any input english text or morse code directly into the morse translator boxes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Translation</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Watch as each morse character appears instantly with dots (•) and dashes (-)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Listen & Learn</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Use audio playback or flashing light patterns to experience authentic electrical signals</p>
              </div>
            </div>
          </div>

          {/* Advanced Features - 功能特性维度 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Features - Beyond Text-Based Morse Code Converter
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Experience cutting-edge morse code conversion technology that extends far beyond simple text translation. Our comprehensive platform integrates traditional International Morse Code standards with modern AI-powered recognition capabilities, supporting diverse input methods from images to audio files while maintaining perfect compatibility with historical telegraph protocols.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Image Processing</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Upload photos containing morse patterns and extract text using our <a href="/decoders/decode-image" className="text-blue-600 dark:text-blue-400 hover:underline">morse code image decoder</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Audio Signal Analysis</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Decode morse code from audio recordings with our <a href="/decoders/decode-audio" className="text-blue-600 dark:text-blue-400 hover:underline">intelligent audio morse code translator</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Batch File Processing</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Handle large text files with our <a href="/decoders/txt-to-morse" className="text-blue-600 dark:text-blue-400 hover:underline">file-to-morse encoder</a> and <a href="/decoders/decode-text" className="text-blue-600 dark:text-blue-400 hover:underline">text decoder tools</a></p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Signal Simulation</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Experience authentic flashing light patterns that replicate traditional telegraph electrical signals</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Error-Resistant Translation</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Intelligent handling of characters that cannot be translated with helpful suggestions and alternatives</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Language Support</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Convert english and other languages using the complete morse alphabet with international character support</p>
              </div>
            </div>
          </div>

          {/* Technical Implementation - 技术原理维度 */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How does our morse code translator work?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our comprehensive platform employs multiple sophisticated technologies to handle diverse morse code applications. From traditional text translation to cutting-edge AI-powered image recognition, each tool utilizes specialized algorithms designed for maximum accuracy across different input methods and communication scenarios over long distances.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Character Mapping Engine</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Each morse character is mapped using the standard system established by Samuel Morse, converting input english into morse code dot-dash sequences with authentic timing intervals</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Advanced OCR Pattern Recognition</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Our <a href="/decoders/decode-image" className="text-blue-600 dark:text-blue-400 hover:underline">image morse code translator</a> uses machine learning to detect morse patterns from photographs, and convert the morse code to English.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Digital Signal Processing</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">The <a href="/decoders/decode-audio" className="text-blue-600 dark:text-blue-400 hover:underline">audio morse code translator</a> employs frequency analysis to interpret electrical signals from various sound sources, detecting precise timing patterns</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-3 text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Educational Content Management</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Our <a href="/sheet" className="text-blue-600 dark:text-blue-400 hover:underline">reference system</a> and <a href="/learn" className="text-blue-600 dark:text-blue-400 hover:underline">learning platform</a> provide structured morse alphabet training and historical context</p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Resources - 学习平台维度 */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Training Resources - From Beginner to Expert
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Master morse communication through our structured learning environment designed for all skill levels. Whether you're studying for amateur radio certification, exploring historical telegraph methods, or developing emergency communication skills, our educational resources provide comprehensive training in both theory and practical application of morse code principles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Structured Learning Modules:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Complete morse alphabet reference with printable charts and timing guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Progressive skill building through essential vocabulary and communication phrases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Professional abbreviations and prosigns used in radio communications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Interactive audio training with adjustable speeds and visual feedback through flashing light indicators</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Real-World Applications:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Amateur radio (HAM) licensing exam preparation and operating procedures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Maritime and aviation emergency communication protocols for safety applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>Historical telegraph operation and understanding of electrical signals in communication networks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">•</span>
                    <span>STEM education applications for teaching problem-solving and pattern recognition skills</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                <strong>Popular Learning Topics:</strong> Students frequently explore encoding romantic messages like <em>"i love you in morse code"</em>, emergency signals such as <em>"SOS morse code"</em>, and practical phrases like <em>"hello world morse code"</em>. Our platform accommodates all skill levels while providing guidance for characters that cannot be translated, ensuring comprehensive morse alphabet mastery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// 加载状态组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  useScrollToTop();

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
        <Route path="/sheet/morse-code-alphabet" element={<MorseCodeAlphabet />} />
        <Route path="/sheet/morse-code-numbers" element={<MorseCodeNumbers />} />
        {/* Redirect old encoder path to new decoder path */}
        <Route path="/encoders/txt-to-morse" element={<Navigate to="/decoders/txt-to-morse" replace />} />
        <Route path="/decoders/txt-to-morse" element={<TxtToMorseEncoder />} />
        <Route path="/decoders/decode-text" element={<DecodeText />} />
        <Route path="/decoders/decode-image" element={<DecodeImage />} />
        <Route path="/decoders/decode-audio" element={<DecodeAudio />} />
        <Route path="/decoders/decode-audio/morse-code-sound" element={<MorseCodeSound />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Suspense>
  );
}

export default App;