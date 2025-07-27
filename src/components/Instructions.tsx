import React from 'react';

interface InstructionsProps {
  translations?: {
    title: string;
    step1: { title: string; description: string };
    step2: { title: string; description: string };
    step3: { title: string; description: string };
    step4: { title: string; description: string };
    step5: { title: string; description: string };
    step6: { title: string; description: string };
    tips: {
      title: string;
      tip1: string;
      tip2: string;
      tip3: string;
      tip4: string;
      tip5: string;
      tip6: string;
      tip7: string;
    };
  };
}

export default function Instructions({ translations }: InstructionsProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">{translations?.title || "How to Use the Morse Code Translator"}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本翻译功能 */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
              {translations?.step1.title || "Text to Morse Code Translation"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step1.description || "Type or paste any text in the top input box, or click the random button (🔀) . we supports letters, numbers, and punctuation."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
              {translations?.step2.title || "Morse Code to Text Decoding"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step2.description || "Enter Morse code in the bottom box using dots (.) and dashes (-). Separate letters with spaces and words with forward slashes (/)."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
              {translations?.step3.title || "Audio Playback & Training"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step3.description || "Click the play button to hear your Morse code with authentic audio signals. Adjust playback speed, frequency and WPM."}
            </p>
          </div>
        </div>

        {/* 高级功能 */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs mr-2">4</span>
              {translations?.step4.title || "Visual Light Indicator"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step4.description || "Watch the visual light indicator flash in sync with audio playback. Perfect for learning the rhythm and timing of Morse code signals."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs mr-2">5</span>
              {translations?.step5.title || "Download & Export Options"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step5.description || "Download your conversions as text files or export Morse code as audio files (WAV/MP3) for offline practice and sharing."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base flex items-center">
              <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs mr-2">6</span>
              {translations?.step6.title || "Professional Settings"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed ml-8">
              {translations?.step6.description || "Access advanced audio settings to customize frequency (200-1000 Hz), playback speed, and WPM for professional training standards."}
            </p>
          </div>
        </div>
      </div>

      {/* 使用技巧 */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 text-sm sm:text-base">{translations?.tips.title || "💡 Pro Tips for Best Results:"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>{translations?.tips.tip1 || "Morse Code Creator: use the green morse code generator button to create random phrases"}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>{translations?.tips.tip2 || "Use the copy button for quick text sharing"}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>{translations?.tips.tip3 || "Toggle slash separators for different formatting styles"}</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>{translations?.tips.tip4 || "Practice with repeat mode for skill development"}</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>{translations?.tips.tip5 || "Real-time character count for message tracking"}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>{translations?.tips.tip6 || "Supports complete alphabet, numbers, and punctuation"}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
              <span>{translations?.tips.tip7 || "Perfect for amateur radio and emergency communications"}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}