import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import TranslatorBox from './components/TranslatorBox';
import Instructions from './components/Instructions';
import { useTranslator } from './contexts/TranslatorContext';
import About from './pages/About';
import History from './pages/History';
import Learn from './pages/Learn';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ArrowDownUp } from 'lucide-react';

function Translator() {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();

  return (
    <Layout
      title="Online Morse Code Translator"
      description="Free online Morse code translator. Convert text to Morse code and Morse code to text instantly. Support for letters, numbers, and punctuation marks."
    >
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Morse Code Translator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert text to Morse code and vice versa instantly
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <TranslatorBox
              label="Text"
              value={text}
              onChange={handleTextChange}
              autoFocus={true}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  <ArrowDownUp className="w-5 h-5" />
                </span>
              </div>
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
      </div>
    </Layout>
  );
}

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Translator />} />
      <Route path="/about" element={<About />} />
      <Route path="/history" element={<History />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}

export default App;