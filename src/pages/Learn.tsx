import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from '../components/Link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function Learn() {
  const learningResources = [
    {
      title: "Basic and Tips",
      description: "Master the fundamentals of Morse code with our comprehensive guide. Learn the alphabet, numbers, and essential tips for effective learning.",
      href: "/learn/basic-and-tips",
      icon: BookOpen,
      color: "blue"
    },
    {
      title: "History",
      description: "Discover the fascinating history of Morse code from its invention by Samuel Morse to its modern-day applications.",
      href: "/learn/history",
      icon: Clock,
      color: "green"
    }
  ];

  return (
    <Layout 
      title="Learn Morse Code"
      description="Comprehensive learning resources for mastering Morse code. From basics to history, everything you need to become proficient."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Learn Morse Code
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Everything you need to master Morse code communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {learningResources.map((resource, index) => {
            const Icon = resource.icon;
            const colorClasses = {
              blue: "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
              green: "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700"
            };
            const iconColorClasses = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400"
            };
            
            return (
              <Link
                key={index}
                href={resource.href}
                className={`block bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border-2 ${colorClasses[resource.color as keyof typeof colorClasses]} transition-all hover:shadow-md group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${iconColorClasses[resource.color as keyof typeof iconColorClasses]}`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm sm:text-base">
            Begin your Morse code journey with our interactive translator and reference materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Try the Translator
            </Link>
            <Link 
              href="/sheet" 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              View Reference Sheet
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Morse Code Learning Platform for Beginners and Experts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Master Morse code communication with our structured learning approach designed for all skill levels.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Learning Path:</h4>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">1.</span>
                  <span><strong>Learning Morse code</strong> basics: alphabet recognition and timing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">2.</span>
                  <span><strong>How to learn Morse code</strong> effectively with proven methods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">3.</span>
                  <span>Advanced operational procedures for real-world applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">4.</span>
                  <span>Practice with amateur radio, maritime, and emergency communications</span>
                </li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Whether you're preparing for amateur radio licensing, developing emergency preparedness skills, or exploring telecommunications history, our comprehensive resources provide the knowledge and practice tools needed for Morse code proficiency.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              From History to Practice: Complete Morse Code Education Resources
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Discover the complete story of Morse code evolution from its 1830s telegraph origins to modern digital applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Historical Topics:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Samuel Morse's revolutionary telegraph system</li>
                  <li>• Development of International Morse Code standards</li>
                  <li>• Maritime safety and Titanic rescue operations</li>
                  <li>• Modern applications in digital communications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Learning Modules:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>Morse code basics</strong> for newcomers</li>
                  <li>• Advanced timing and rhythm techniques</li>
                  <li>• Amateur radio and assistive technology uses</li>
                  <li>• Emergency preparedness applications</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Each lesson combines theoretical knowledge with practical exercises, reference materials, and interactive tools to ensure comprehensive understanding and skill development.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}