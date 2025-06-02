import React from 'react';

export default function Instructions() {
  return (
    <div className="max-w-2xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">How to Use the Morse Code Translator</h2>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base">Text to Morse Code:</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Simply type or paste your text in the top box. The translator will automatically convert it to Morse code in real-time.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base">Morse Code to Text:</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Enter Morse code in the bottom box using dots (.) and dashes (-). Separate letters with spaces and words with forward slashes (/).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base">Tips:</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm sm:text-base leading-relaxed">
            <li>Use the copy button to quickly copy the translated text</li>
            <li>The translator works with letters, numbers, and common punctuation marks</li>
            <li>Spaces between words are represented by a forward slash (/)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}