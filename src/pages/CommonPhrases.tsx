import React from 'react';
import { Layout } from '../components/Layout';
import { commonPhrases } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
}

export default function CommonPhrases() {
  // Extract phrases from commonPhrases (phrases that contain spaces)
  const phrases: MorseCharacter[] = Object.entries(commonPhrases)
    .filter(([phrase]) => phrase.includes(' '))
    .map(([phrase, code]) => ({
      char: phrase,
      code
    }));

  // Group phrases by category
  const greetingsAndBasic = phrases.filter(p => 
    ['GOOD MORNING', 'GOOD EVENING', 'GOOD NIGHT', 'GOODBYE', 'SEE YOU', 'WELCOME', 'THANK YOU', 'EXCUSE ME'].includes(p.char)
  );

  const emotionsAndRelationships = phrases.filter(p =>
    ['I LOVE YOU', 'MISS YOU', 'HAPPY BIRTHDAY', 'CONGRATULATIONS', 'I AM SORRY', 'FORGIVE ME', 'I CARE ABOUT YOU', 'BEST WISHES', 'TAKE CARE', 'BE SAFE'].includes(p.char)
  );

  const emergencyAndImportant = phrases.filter(p =>
    ['HELP ME', 'EMERGENCY', 'CALL DOCTOR', 'NEED HELP', 'URGENT', 'FIRE', 'POLICE', 'AMBULANCE'].includes(p.char)
  );

  const dailyCommunication = phrases.filter(p =>
    ['HOW ARE YOU', 'I AM FINE', 'WHAT TIME', 'WHERE ARE YOU', 'SEE YOU LATER', 'TALK TO YOU LATER', 'HAVE A NICE DAY', 'GOOD LUCK', 'BE CAREFUL', 'DRIVE SAFELY'].includes(p.char)
  );

  const questionsAndResponses = phrases.filter(p =>
    ['I DO NOT KNOW', 'I UNDERSTAND', 'I DO NOT UNDERSTAND', 'CAN YOU HELP', 'WHAT IS YOUR NAME', 'MY NAME IS', 'NICE TO MEET YOU'].includes(p.char)
  );

  const weatherAndEnvironment = phrases.filter(p =>
    ['BEAUTIFUL DAY', 'COLD WEATHER', 'HOT WEATHER', 'SUNNY DAY', 'RAINY DAY'].includes(p.char)
  );

  const foodAndBasicNeeds = phrases.filter(p =>
    ['I AM HUNGRY', 'I AM THIRSTY', 'GOOD FOOD', 'DELICIOUS', 'WATER PLEASE'].includes(p.char)
  );

  const travelAndDirections = phrases.filter(p =>
    ['WHERE IS', 'HOW FAR', 'SAFE JOURNEY', 'ARRIVED SAFELY', 'LOST', 'NEED DIRECTIONS'].includes(p.char)
  );

  const familyAndHome = phrases.filter(p =>
    ['FAMILY', 'HOME SWEET HOME', 'MOTHER', 'FATHER'].includes(p.char)
  );

  const GridSection = ({ title, data }: { title: string; data: MorseCharacter[] }) => {
    if (data.length === 0) return null;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="p-3 sm:p-4">
          <div className="grid gap-2 sm:gap-3 grid-cols-1 lg:grid-cols-2">
            {data.map(({ char, code }) => (
              <div key={char} className="flex items-center justify-between p-3 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex flex-col flex-1 mr-4">
                  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {char}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                    {code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      title="Common Phrases in Morse Code"
      description="Learn common phrases in Morse code for practical communication. Master greetings, emotions, emergency phrases, and daily conversation starters."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Common Phrases in Morse Code
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Practice with frequently used phrases and expressions
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <GridSection title="Greetings & Basic Expressions" data={greetingsAndBasic} />
          <GridSection title="Emotions & Relationships" data={emotionsAndRelationships} />
          <GridSection title="Emergency & Important" data={emergencyAndImportant} />
          <GridSection title="Daily Communication" data={dailyCommunication} />
          <GridSection title="Questions & Responses" data={questionsAndResponses} />
          <GridSection title="Weather & Environment" data={weatherAndEnvironment} />
          <GridSection title="Food & Basic Needs" data={foodAndBasicNeeds} />
          <GridSection title="Travel & Directions" data={travelAndDirections} />
          <GridSection title="Family & Home" data={familyAndHome} />
        </div>

        {/* Usage tips */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            Learning Tips for Common Phrases
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Start with short, frequently used phrases like "THANK YOU" and "HOW ARE YOU"</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Learn emergency phrases first - they could be life-saving in critical situations</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Practice phrases by category to build conversational skills systematically</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Remember that / (dash-dot-dot-dash-dot) represents word spaces in Morse code</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Focus on the rhythm and flow of entire phrases, not just individual letters</span>
            </li>
          </ul>
        </div>

        {/* Practical applications */}
        <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Practical Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency Communication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Essential phrases for emergency situations when voice communication isn't possible.
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Amateur Radio</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standard phrases used in ham radio conversations and DX contacts.
              </p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Purpose</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn historical communication methods and develop problem-solving skills.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Essential Morse Code Phrases for Social and Emergency Communication
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Master over 70 essential Morse code phrases organized by practical categories for real-world communication.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Key Phrase Categories:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Social Expressions:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>I LOVE YOU in Morse code</strong>: ".. / .-.. --- ...- . / -.-- --- ..-"</li>
                    <li>• <strong>THANK YOU in Morse code</strong>: "- .... .- -. -.- / -.-- --- ..-"</li>
                    <li>• <strong>GOOD MORNING in Morse code</strong> and <strong>HOW ARE YOU in Morse code</strong></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Phrases:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>HELP ME in Morse code</strong>: ".... . .-.. .--. / -- ."</li>
                    <li>• <strong>CALL DOCTOR in Morse code</strong> for medical emergencies</li>
                    <li>• <strong>HAPPY BIRTHDAY in Morse code</strong> for celebrations</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                These standardized phrases enable effective communication in amateur radio, emergency preparedness, maritime operations, and historical education contexts.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Conversational Morse Code: From Greetings to Emergency Signals
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Build fluent conversational skills with categorized Morse code phrases covering nine essential communication areas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Social Interaction:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>NICE TO MEET YOU in Morse code</strong></li>
                  <li>• <strong>SEE YOU LATER in Morse code</strong></li>
                  <li>• <strong>GOODBYE in Morse code</strong></li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Daily Communication:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>WHAT TIME in Morse code</strong></li>
                  <li>• <strong>WHERE ARE YOU in Morse code</strong></li>
                  <li>• <strong>HAVE A NICE DAY in Morse code</strong></li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Preparedness:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>NEED HELP in Morse code</strong></li>
                  <li>• <strong>FIRE in Morse code</strong></li>
                  <li>• <strong>AMBULANCE in Morse code</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Weather expressions like <strong>BEAUTIFUL DAY in Morse code</strong> and travel phrases like <strong>SAFE JOURNEY in Morse code</strong> complete this practical communication toolkit for amateur radio operators, emergency responders, and Morse code enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 