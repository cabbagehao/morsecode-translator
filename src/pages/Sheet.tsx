import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from '../components/Link';
import { ArrowRight, FileText, BookOpen, MessageSquare } from 'lucide-react';

export default function Sheet() {
  const sheetResources = [
    {
      title: "Morse Code Sheet",
      description: "Complete reference sheet with alphabet, numbers, punctuation, and prosigns. Perfect for quick lookup and printing.",
      href: "/sheet/morse-code-sheet",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Common Words",
      description: "Learn frequently used words in Morse code to improve your reading speed and fluency.",
      href: "/sheet/common-words",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "Common Phrases",
      description: "Master common phrases and expressions used in Morse code communication.",
      href: "/sheet/common-phrases",
      icon: MessageSquare,
      color: "purple"
    }
  ];

  return (
    <Layout 
      title="Morse Code Reference Sheets"
      description="Comprehensive reference sheets and quick lookup guides for Morse code. Find all the information you need in one place."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Morse Code Reference Sheets
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Quick reference guides and comprehensive sheets for all your Morse code needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sheetResources.map((resource, index) => {
            const Icon = resource.icon;
            const colorClasses = {
              blue: "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
              green: "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700",
              purple: "border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700"
            };
            const iconColorClasses = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400"
            };
            
            return (
              <Link
                key={index}
                href={resource.href}
                className={`block bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-sm border-2 ${colorClasses[resource.color as keyof typeof colorClasses]} transition-all hover:shadow-md group`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${iconColorClasses[resource.color as keyof typeof iconColorClasses]} mb-4`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                    <span>View Sheet</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
            Print-Friendly References
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm sm:text-base">
            All our reference sheets are optimized for printing. Perfect for offline study or field use.
          </p>
          <div className="text-center">
            <Link 
              href="/sheet/morse-code-sheet" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Start with Main Reference
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 