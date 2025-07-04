import React from 'react';

export default function Instructions() {
  return (
    <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">How to Use the Morse Code Translator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本翻译功能 */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
              Text to Morse Code Translation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Type or paste any text in the top input box, or click the generator button (🔀) to randomly select from common phrases. Our <strong>Morse code generator</strong> instantly converts letters, numbers, and punctuation into International Morse Code using dots (•) and dashes (—).
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
              Morse Code to Text Decoding
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Enter Morse code in the bottom box using dots (.) and dashes (-). Separate letters with spaces and words with forward slashes (/) for accurate decoding.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
              Audio Playback & Training
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Click the play button to hear your Morse code with authentic audio signals. Adjust speed (WPM), frequency, and use repeat mode for practice sessions.
            </p>
          </div>
        </div>

        {/* 高级功能 */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs mr-2">4</span>
              Visual Light Indicator
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Watch the visual light indicator flash in sync with audio playback. Perfect for learning the rhythm and timing of Morse code signals.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs mr-2">5</span>
              Download & Export Options
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Download your translations as text files or export Morse code as audio files (WAV/MP3) for offline practice and sharing.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs mr-2">6</span>
              Professional Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              Access advanced audio settings to customize frequency (200-1000 Hz), playback speed, and WPM for professional training standards.
            </p>
          </div>
        </div>
      </div>

      {/* 使用技巧 */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 text-sm sm:text-base">💡 Pro Tips for Best Results:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Use the generator button to practice with random common phrases</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Use the copy button for quick text sharing</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Toggle slash separators for different formatting styles</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Practice with repeat mode for skill development</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>Real-time character count for message tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>Supports complete alphabet, numbers, and punctuation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>Perfect for amateur radio and emergency communications</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}