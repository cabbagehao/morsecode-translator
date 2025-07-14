import React from 'react';
import { Layout } from '../components/Layout';

export default function History() {
  const timelineEvents = [
    {
      year: "1832",
      title: "Initial Concept",
      description: "Samuel Morse begins developing the electric telegraph and a code system for communication."
    },
    {
      year: "1844",
      title: "First Message",
      description: "The first official Morse code message 'What hath God wrought?' is transmitted from Washington, D.C. to Baltimore."
    },
    {
      year: "1851",
      title: "International Adoption",
      description: "European countries begin adopting Morse code for telegraph communications."
    },
    {
      year: "1865",
      title: "International Morse Code",
      description: "The International Morse Code standard is established, becoming the global standard."
    },
    {
      year: "1912",
      title: "Titanic Disaster",
      description: "Morse code plays a crucial role in rescue operations during the Titanic disaster."
    },
    {
      year: "1999",
      title: "Maritime Usage Ends",
      description: "The Global Maritime Distress Safety System replaces Morse code as the maritime standard."
    },
    {
      year: "Present",
      title: "Modern Applications",
      description: "Morse code continues to be used in amateur radio and as an accessibility tool."
    }
  ];

  return (
    <Layout 
      title="History of Morse Code – From Samuel Morse to Modern Times"
      description="Explore the fascinating history of Morse code from Samuel Morse's invention to telegraph systems, military use, and modern applications worldwide."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">History of Morse Code</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-8 sm:mb-12">
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Morse code revolutionized long-distance communication in the 19th century and played a crucial
            role in shaping modern telecommunications. Its impact on history and continued relevance
            make it a fascinating subject of study.
          </p>
        </div>

        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-2 sm:ml-3">
          {timelineEvents.map((event, index) => (
            <div key={index} className="mb-8 sm:mb-10 ml-4 sm:ml-6">
              <span className="absolute flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full -left-2.5 sm:-left-3 ring-4 sm:ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full dark:bg-blue-400"></div>
              </span>
              <h3 className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-1 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                <span className="mb-1 sm:mb-0">{event.title}</span>
                <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 sm:ml-3 w-fit">
                  {event.year}
                </span>
              </h3>
              <p className="text-sm sm:text-base font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              The Revolutionary History of Morse Code: From Telegraph to Modern Communications
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Explore the fascinating journey of <strong>Morse code history</strong> from its revolutionary beginning in the 1830s to its enduring legacy in modern communications.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Historical Milestones:</h4>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">1.</span>
                  <span><strong>Samuel Morse inventor</strong> and Alfred Vail develop the dot-dash system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">2.</span>
                  <span>1844: First message "What hath God wrought?" (Washington D.C. to Baltimore)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">3.</span>
                  <span>European nations adopt telegraph networks across continents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">4.</span>
                  <span>International Morse Code standardization for global use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 font-bold mr-2">5.</span>
                  <span>Maritime safety applications, including Titanic rescue operations</span>
                </li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                The <strong>history of Morse code</strong> encompasses these pivotal moments that transformed long-distance communication forever.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              From Telegraph Era to Digital Age: Morse Code's Lasting Impact on Global Communications
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Discover how <strong>Morse code telegraph</strong> technology revolutionized 19th-century society and continues to influence modern digital communications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Historical Impact:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Backbone of international business and journalism</li>
                  <li>• Critical military applications in World Wars</li>
                  <li>• Undersea telegraph cables linking continents</li>
                  <li>• International communication protocol establishment</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Modern Applications:</h5>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Amateur radio and emergency services</li>
                  <li>• Assistive technologies for disabilities</li>
                  <li>• Emergency communication systems</li>
                  <li>• Educational and historical preservation</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Even in today's digital age, <strong>who invented Morse code</strong> - Samuel Morse's legacy - lives on where its simplicity and reliability remain unmatched.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}