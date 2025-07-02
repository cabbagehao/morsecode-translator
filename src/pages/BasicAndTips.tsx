import React from 'react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface MorseCharacter {
  char: string;
  code: string;
}

interface LazyYouTubeVideoProps {
  videoId: string;
  title: string;
  width: string;
  height: string;
}

const LazyYouTubeVideo: React.FC<LazyYouTubeVideoProps> = ({ videoId, title, width, height }) => {
  const aspectRatio = (parseInt(height) / parseInt(width)) * 100;

  return (
    <div className="relative w-full" style={{ paddingBottom: `${aspectRatio}%` }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default function BasicAndTips() {
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
    { char: "'", code: '.----.' },
    { char: '"', code: '.-..-.' },
    { char: '/', code: '-..-.' },
    { char: '-', code: '-....-' },
    { char: '_', code: '..--.-' },
    { char: '@', code: '.--.-.'},
    { char: '&', code: '.-...' },
    { char: '=', code: '-...-' },
    { char: '+', code: '.-.-.' },
    { char: '$', code: '...-..-' }
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
      title="Morse Code Basics and Tips"
      description="Master Morse code with our comprehensive learning guide. Learn the alphabet, numbers, and special characters in Morse code with interactive examples."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Morse Code Basics and Tips</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Master the basics of Morse code with our comprehensive guide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Letters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {alphabet.map(({ char, code }) => (
                <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                  <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Numbers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {numbers.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Punctuation</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {punctuation.map(({ char, code }) => (
                  <div key={char} className="p-2 border dark:border-gray-700 rounded text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{char}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm">{code}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Basic Rules</h2>
          <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
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

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Morse Code Shorthand Method</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Morse Code for Numbers</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                Start with numbers, as they are particularly easy to remember. Numbers are all composed of <span className="text-blue-600 dark:text-blue-400 font-mono">5</span> dots or dashes.
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span><strong>For <span className="text-blue-600 dark:text-blue-400 font-mono">1 to 5</span>:</strong> The number itself determines how many dots are at the beginning, and the remaining positions are filled with dashes.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span><strong>For <span className="text-blue-600 dark:text-blue-400 font-mono">6 to 9</span>:</strong> Subtract <span className="text-blue-600 dark:text-blue-400 font-mono">5</span> from the number; the result determines how many dashes are at the beginning, and the remaining positions are filled with dots.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span><strong>For <span className="text-blue-600 dark:text-blue-400 font-mono">0</span>:</strong> Simply memorize it as <span className="text-blue-600 dark:text-blue-400 font-mono">5</span> dashes (<span className="text-blue-600 dark:text-blue-400 font-mono">-----</span>).</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Morse Code for Letters</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                Let's begin with the most practical example, <strong><span className="text-blue-600 dark:text-blue-400 font-mono">SOS</span></strong>:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  <span className="text-blue-600 dark:text-blue-400 font-mono">S</span> is <span className="text-blue-600 dark:text-blue-400">...</span>, and <span className="text-blue-600 dark:text-blue-400 font-mono">O</span> is <span className="text-blue-600 dark:text-blue-400">---</span>, so the Morse code for <span className="text-blue-600 dark:text-blue-400 font-mono">SOS</span> is <span className="text-blue-600 dark:text-blue-400">...---...</span>.
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Yes, it's that simple.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                Next, let's look at the beginning of the alphabet:
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 mb-3 sm:mb-4 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span><span className="text-blue-600 dark:text-blue-400 font-mono">A</span> is <span className="font-mono text-blue-600 dark:text-blue-400">.-</span>, and <span className="text-blue-600 dark:text-blue-400 font-mono">N</span> is <span className="font-mono text-blue-600 dark:text-blue-400">-.</span>. These two form a pair.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Similarly, <span className="text-blue-600 dark:text-blue-400 font-mono">D</span> is <span className="font-mono text-blue-600 dark:text-blue-400">-..</span>, and <span className="text-blue-600 dark:text-blue-400 font-mono">U</span> is <span className="font-mono text-blue-600 dark:text-blue-400">..-</span>. These two are also a pair.</span>
                </li>
              </ul>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                If you carefully compare, you'll notice that the following letter pairs have symmetrical codes:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
                  <span className="text-blue-600 dark:text-blue-400">AN, BJ, DW, ET, FQ, GU, KR, LY, XP</span>
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Once you memorize the first letter in each pair, the second one will come naturally.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                There's another type of symmetry, such as <span className="text-blue-600 dark:text-blue-400 font-mono">B</span> and <span className="text-blue-600 dark:text-blue-400 font-mono">V</span>:
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 mb-2 sm:mb-3 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span><span className="text-blue-600 dark:text-blue-400 font-mono">B</span> is <span className="font-mono text-blue-600 dark:text-blue-400">-...</span>, and <span className="text-blue-600 dark:text-blue-400 font-mono">V</span> is <span className="font-mono text-blue-600 dark:text-blue-400">...-</span>.</span>
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                This type of symmetry is found in the following <span className="text-blue-600 dark:text-blue-400 font-mono">3</span> pairs:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3 sm:mb-4">
                <p className="font-mono text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
                  <span className="text-blue-600 dark:text-blue-400">BV, DU, GW</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Dots or Dashes Only</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                It's also easy to memorize codes made entirely of dots or dashes:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">Dots:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">.</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">E</span></li>
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">..</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">I</span></li>
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">...</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">S</span></li>
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">....</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">H</span></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">Dashes:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">-</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">T</span></li>
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">--</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">M</span></li>
                    <li><span className="font-mono text-blue-600 dark:text-blue-400">---</span> is <span className="text-blue-600 dark:text-blue-400 font-mono">O</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">Final Tips</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                By repeatedly practicing these rules, you'll find that there are only <span className="text-blue-600 dark:text-blue-400 font-mono">two</span> codes that need to be memorized separately:
              </p>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-sm sm:text-base">
                <li><strong><span className="text-blue-600 dark:text-blue-400 font-mono">C</span>:</strong> <span className="font-mono text-blue-600 dark:text-blue-400">-.-.</span></li>
                <li><strong><span className="text-blue-600 dark:text-blue-400 font-mono">Z</span>:</strong> <span className="font-mono text-blue-600 dark:text-blue-400">--..</span></li>
              </ul>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Visual Learning Method</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              You can combine the visual encoding methods shown in this video to memorize Morse code more quickly. 
              The video demonstrates each letter's visualization, making it easier to understand the patterns and relationships between different characters.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <LazyYouTubeVideo 
                videoId="EmXsSSHCnsI" 
                title="Morse Code Tracing"
                width="717"
                height="538"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Learning Tips</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Start with Common Letters</h3>
              <p>Begin learning with the most frequently used letters: E, T, A, O, I, N. These make up a large portion of English text.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Practice Rhythm</h3>
              <p>Focus on the rhythm and timing rather than just memorizing dots and dashes. Each letter has its own musical pattern.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Use Mnemonics</h3>
              <p>Create word associations: "A" (.-) = "About", "B" (-...) = "Boot it up", "C" (-.-.) = "Coca Cola"</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">External Learning Resources</h2>
          <div className="space-y-4 sm:space-y-6">
            {externalResources.map((resource, index) => (
              <div key={index} className="border-b dark:border-gray-700 last:border-0 pb-4 sm:pb-6 last:pb-0">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-2 mb-2">
                    {resource.title}
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </h3>
                </a>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base touch-manipulation"
          >
            Start Practicing
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* SEO Description */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Interesting Facts About Morse Code
          </h3>
          
          <div className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              <strong>Morse Code as a Language</strong> is more than just a combination of dots and dashes. It is an elegant and simple communication tool that has been in use for over a century. Its universality and simplicity have connected people across vast distances, making it a globally recognized tool for emergency and technical communication.
            </p>

            <p>
              Morse Code is not only used to convey <strong>Morse Code for Alphabet</strong> and <strong>Morse Code for Numbers</strong>, but it can also express punctuation marks and common phrases, such as SOS (...---...) and CQ (a general call signal). These encoding methods make Morse Code an efficient and versatile communication system, especially in maritime, aviation, and emergency scenarios.
            </p>

            <p>
              Interestingly, many people mistakenly spell Morse Code as "Norse Code" and even search for a "Norse Translator." In reality, this is just a common misspelling and has nothing to do with Morse Code. The correct spelling and usage of Morse Code represent the unique combination of dots (.) and dashes (-), rather than anything related to Nordic culture.
            </p>

            <p>
              Did you know that Morse Code has different names in various languages? For example, in Persian, it is called کد مورس (Kood-e-Morse). Its universality is not only reflected in its cross-linguistic encoding rules but also in its significant contributions to international communication.
            </p>

            <p>
              Even seemingly cryptic sequences like ..---...._ can be decoded by understanding <strong>Morse Code for Alphabet</strong> and <strong>Morse Code for Numbers</strong>. Every bit of Morse Code carries meaning, and through the combination of dots, dashes, and encoding rules, it becomes a global communication tool that transcends language barriers.
            </p>

            <p>
              Whether it is the famous emergency signal SOS ("3 dots and a dash") or romantic phrases like "I love you" transmitted in Morse Code, its charm lies in its simplicity and practicality. By learning the letters, numbers, punctuation marks, and common phrases, you can easily master this classic communication skill.
            </p>
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="mt-8 space-y-8">
          <div className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Master Morse Code Fundamentals: Complete Beginner's Guide to Dots and Dashes
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Learn <strong>Morse code alphabet</strong> systematically with proven methods used by amateur radio operators worldwide. Our comprehensive guide covers essential techniques for memorizing the complete <strong>Morse code chart</strong>, from basic letters like <strong>A in Morse code</strong> (dot-dash) to complex combinations. Discover the symmetrical patterns that make learning efficient: letter pairs like AN, DU, and BV follow logical relationships that simplify memorization. Master timing fundamentals where dots represent short signals, dashes are three times longer, and proper spacing creates clear communication. Whether you're preparing for ham radio licensing, emergency preparedness, or exploring telecommunications history, these foundational skills provide the building blocks for fluent Morse code communication.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Learning Techniques: From Basic Patterns to Professional Proficiency
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Accelerate your <strong>how to learn Morse code</strong> journey with advanced memorization techniques and practical exercises designed for rapid skill development. Our structured approach combines visual learning methods, rhythm-based practice, and mnemonic devices to help you master the International Morse Code standard efficiently. Learn to recognize common patterns like letters composed entirely of dots (E, I, S, H) or dashes (T, M, O), understand the logical symmetries between letter pairs, and develop the muscle memory needed for both sending and receiving. These time-tested methods have helped thousands of students achieve amateur radio licensing success and develop the confident, accurate Morse code skills needed for emergency communications, DX contacts, and QRP operations.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 