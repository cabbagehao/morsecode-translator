import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
        <div className="mt-12 space-y-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Online Morse Code Translator - Free and Accurate
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our advanced Morse code translator provides instant, bidirectional conversion between plain text and International Morse Code. Convert any message to dots and dashes, or decode Morse code signals back to readable text with 100% accuracy. This <strong>online Morse code translator</strong> supports the complete alphabet, numbers 0-9, punctuation marks, and special characters used in amateur radio, maritime communications, and emergency signaling. Whether you need to <strong>translate text to Morse code</strong> for educational purposes, amateur radio practice, or emergency preparedness, our tool delivers professional-grade results with customizable audio playback, visual light indicators, and downloadable files for offline use.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Morse Code Learning Platform with Audio and Visual Features
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Experience the most comprehensive <strong>Morse code generator and decoder</strong> available online, featuring real-time translation, adjustable audio playback speeds, and visual light simulation for training purposes. Our platform combines a powerful <strong>Morse code converter</strong> with educational resources including complete reference sheets, common abbreviations, emergency signals, and practice phrases. Learn how to <strong>encode text to Morse code</strong> and <strong>decode Morse signals to text</strong> with our interactive interface that supports both amateur radio standards and historical telegraph protocols. Perfect for ham radio licensing preparation, emergency communication training, educational projects, and anyone interested in mastering this timeless communication method used by professionals worldwide.
            </p>
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
      <Route path="/encoders/txt-to-morse" element={<TxtToMorseEncoder />} />
      <Route path="/decoders/decode-text" element={<DecodeText />} />
      <Route path="/decoders/decode-image" element={<DecodeImage />} />
    </Routes>
  );
}

export default App;