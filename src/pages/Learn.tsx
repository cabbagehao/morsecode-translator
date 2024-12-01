import React from 'react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface MorseCharacter {
  char: string;
  code: string;
}

export default function Learn() {
  const navigate = useNavigate();
  const alphabet: MorseCharacter[] = [
    { char: 'A', code: '.-' },
    { char: 'B', code: '-...' },
    { char: 'C', code: '-.-.' },
    { char: 'D', code: '-..' },
    { char: 'E', code: '.' },
    { char: 'F', code: '..-.' },
    { char: 'G', code: '--.' },
    { char: 'H', code: '....' },
    { char: 'I', code: '..' },
    { char: 'J', code: '.---' },
    { char: 'K', code: '-.-' },
    { char: 'L', code: '.-..' },
    { char: 'M', code: '--' },
    { char: 'N', code: '-.' },
    { char: 'O', code: '---' },
    { char: 'P', code: '.--.' },
    { char: 'Q', code: '--.-' },
    { char: 'R', code: '.-.' },
    { char: 'S', code: '...' },
    { char: 'T', code: '-' },
    { char: 'U', code: '..-' },
    { char: 'V', code: '...-' },
    { char: 'W', code: '.--' },
    { char: 'X', code: '-..-' },
    { char: 'Y', code: '-.--' },
    { char: 'Z', code: '--..'}
  ];

  const numbers: MorseCharacter[] = [
    { char: '0', code: '-----' },
    { char: '1', code: '.----' },
    { char: '2', code: '..---' },
    { char: '3', code: '...--' },
    { char: '4', code: '....-' },
    { char: '5', code: '.....' },
    { char: '6', code: '-....' },
    { char: '7', code: '--...' },
    { char: '8', code: '---..' },
    { char: '9', code: '----.' }
  ];

  const punctuation: MorseCharacter[] = [
    { char: '.', code: '.-.-.-' },
    { char: ',', code: '--..--' },
    { char: '?', code: '..--..' },
    { char: '!', code: '-.-.--' },
    { char: ':', code: '---...' },
    { char: ';', code: '-.-.-.' },
    { char: '(', code: '-.--.' },
    { char: ')', code: '-.--.-' },
    { char: '"', code: '.-..-.' },
    { char: '@', code: '.--.-.' }
  ];

  const externalResources = [
    {
      title: "Morse Code World",
      url: "https://morsecode.world",
      description: "An interactive platform offering real-time Morse code practice with sound. Features include adjustable transmission speed and various practice modes for both sending and receiving Morse code."
    },
    {
      title: "Google Morse Code Experiments",
      url: "https://experiments.withgoogle.com/collection/morse",
      description: "A collection of innovative experiments by Google that make learning Morse code fun and engaging. Includes games and interactive tools designed to help beginners master Morse code naturally."
    },
    {
      title: "Morse Free",
      url: "https://morsefree.com",
      description: "A comprehensive Morse code learning platform with tutorials, practice exercises, and conversion tools. Ideal for both beginners and advanced users looking to improve their Morse code skills."
    }
  ];

  return (
    <Layout
      title="Learn Morse Code"
      description="Master Morse code with our comprehensive learning guide. Learn the alphabet, numbers, and special characters in Morse code with interactive examples."
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Learn Morse Code</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master the basics of Morse code with our comprehensive guide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Letters</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {alphabet.map(({ char, code }) => (
                <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-mono text-sm">{code}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Numbers</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {numbers.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Punctuation</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {punctuation.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Basic Rules</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>A dot (.) represents a short signal</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>A dash (-) represents a long signal</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>The space between parts of the same letter is equal to one dot</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>The space between letters is equal to three dots</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>The space between words is equal to seven dots</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">External Learning Resources</h2>
          <div className="space-y-6">
            {externalResources.map((resource, index) => (
              <div key={index} className="border-b dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-2 mb-2">
                    {resource.title}
                    <ExternalLink className="w-4 h-4" />
                  </h3>
                </a>
                <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Start Practicing
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
}