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
      title="Morse Code Reference Sheets – Complete Charts & Quick Lookup"
      description="Comprehensive Morse code reference sheets with alphabet charts, common words, phrases, and abbreviations. Perfect for quick lookup and printing."
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

        {/* SEO 优化介绍文字开始 */}
        <div className="mt-12 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            About Morse Code Chart
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            Morse Code, a time-honored method of communication, continues to play a vital role in amateur radio, emergency rescue, outdoor adventures, aviation, and maritime operations. To help users learn and apply Morse Code more efficiently, this page provides a comprehensive collection of Morse Code cheat code resources, including the full alphabet, numbers, punctuation, prosigns, common abbreviations, frequently used words, and practical phrases. Whether you are a beginner or an experienced enthusiast, you can quickly find the information you need here and boost your learning efficiency.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            The following sections introduce the features of each subpage:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li className="mb-2"><strong>Morse Code Sheet</strong>: This page contains the complete Morse Code chart, covering all English letters, numbers, common punctuation, and prosigns. It is ideal for printing or quick reference, making it the most fundamental and comprehensive resource for daily study, exam preparation, and radio operator training.</li>
            <li className="mb-2"><strong>Common Words</strong>: This section features high-frequency English words and their Morse Code representations, helping users improve recognition and transmission speed in real-world communication. It is perfect for daily practice, contest training, and emergency communication scenarios.</li>
            <li className="mb-2"><strong>Common Phrases</strong>: Here you will find practical English phrases and their Morse Code equivalents, commonly used in radio communication, outdoor activities, and emergency situations. This enables users to quickly access essential expressions during actual operations.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            All reference sheets are optimized for both online viewing and printing, making them easy to carry or display at your workspace, classroom, or outdoor camp. Whether you are studying at home, participating in a radio club, or conducting emergency communication drills in the field, these Morse Code chart resources provide instant access to essential information.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            <strong>Example Use Cases:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li className="mb-2">Amateur radio operators can quickly look up unfamiliar letters, words, or phrases during live transmissions.</li>
            <li className="mb-2">Outdoor enthusiasts, campers, and sailors can use Morse Code for emergency signaling or communication when other methods are unavailable.</li>
            <li className="mb-2">Teachers and trainers can provide standardized Morse Code learning materials for students in educational settings.</li>
            <li className="mb-2">Participants in Morse Code contests or exams can use these sheets as handy reference guides.</li>
            <li className="mb-2">Anyone interested in Morse Code can use these resources for ongoing study and review, anytime and anywhere.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            In summary, whether you are just starting with Morse Code or aiming to enhance your practical skills, these reference sheets offer tremendous convenience. Feel free to bookmark, print, and share them with friends or colleagues. With these resources, learning and applying Morse Code becomes more efficient, enjoyable, and accessible to everyone!
          </p>
        </div>
        {/* SEO 优化介绍文字结束 */}
      </div>
    </Layout>
  );
} 