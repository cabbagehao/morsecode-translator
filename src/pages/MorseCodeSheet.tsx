import React from 'react';
import { Layout } from '../components/Layout';
import { getMorseCodeMap } from '../utils/morseCode';

interface MorseCharacter {
  char: string;
  code: string;
  description?: string;
}

export default function MorseCodeSheet() {
  const morseCodeMap = getMorseCodeMap();
  
  // Categorize characters
  const letters: MorseCharacter[] = [];
  const numbers: MorseCharacter[] = [];
  const punctuation: MorseCharacter[] = [];
  
  // Categorize all characters (International Standard)
  Object.entries(morseCodeMap).forEach(([char, code]) => {
    if (char === ' ' || char === '\n') return; // Skip space and newline
    
    if (/[A-Z]/.test(char)) {
      letters.push({ char, code });
    } else if (/[0-9]/.test(char)) {
      numbers.push({ char, code });
    } else if (/[.,:;?!()"'@&=+\-_$/]/.test(char)) {
      punctuation.push({ char, code });
    }
    // Only international standard characters are included
  });
  

  


  const printPage = () => {
    // 临时保存原标题
    const originalTitle = document.title;
    // 清空标题以减少页眉显示
    document.title = '';
    
    // 执行打印
    window.print();
    
    // 恢复原标题
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };



  const CompactGridSection = ({ title, data }: { title: string; data: MorseCharacter[] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden print:shadow-none print:rounded-none print:bg-white print:border-none">
      <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b dark:border-gray-600 print:bg-white print:border-none">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white print:text-black">{title}</h2>
      </div>
      <div className="p-3 sm:p-4 print:p-1">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {data.map(({ char, code }) => (
            <div key={char} className="flex flex-col items-center p-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors print:border-black print:rounded-none print:hover:bg-white">
              <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono print:text-black">
                {char}
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap print:text-black">
                {code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 打印专用样式 */}
      <style>
        {`
          @media print {
            /* 减小页面边距以节省空间，去掉页眉页脚 */
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            /* 通过添加打印提示来指导用户关闭页眉页脚 */
            .print-instruction {
              display: none;
            }
            
            /* 隐藏不需要的导航元素，但保留logo和网站名称 */
            .theme-toggle, .menu-button, .dark-mode-toggle, 
            button[aria-label*="menu"], [aria-label*="Toggle"],
            nav .hidden.md\\:flex, nav .md\\:hidden,
            nav a:not(:first-child), nav div.relative {
              display: none !important;
            }
            
            /* 隐藏Footer */
            footer {
              display: none !important;
            }
            
            /* 隐藏页面标题区域 */
            .page-title-section {
              display: none !important;
            }
            
            /* 基础样式重置 */
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            /* 紧凑化网站标题部分 */
            nav {
              background: white !important;
              padding: 0.75rem 0 !important;
              box-shadow: none !important;
              border-bottom: 1px solid black !important;
              margin-bottom: 0.75rem !important;
            }
            
            nav > div {
              padding: 0 !important;
              max-width: none !important;
            }
            
            /* 优化logo和名称显示 */
            nav a[href="/"] {
              color: black !important;
              text-decoration: none !important;
            }
            
            nav a[href="/"] span {
              color: black !important;
              font-size: 1.125rem !important;
            }
            
            nav a[href="/"] img {
              width: 1.5rem !important;
              height: 1.5rem !important;
            }
            
            /* 确保三个部分在同一页 */
            .morse-sections {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            /* 移除所有背景色和主题样式，但保持布局 */
            * {
              background: white !important;
              color: black !important;
              border-color: black !important;
            }
            
            /* 主要内容区域 */
            main {
              padding: 0 !important;
            }
            
            .max-w-7xl {
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* 适度紧凑的间距 */
            .morse-sections {
              gap: 1rem !important;
              display: flex !important;
              flex-direction: column !important;
            }
            
            /* 适度减小标题样式 */
            .morse-sections h2 {
              font-size: 1.125rem !important;
              padding: 0.5rem 0.75rem !important;
              margin: 0 !important;
              font-weight: bold !important;
            }
            
            /* 紧凑化网格布局 */
            .morse-sections .grid {
              padding: 0.75rem !important;
              grid-template-columns: repeat(8, 1fr) !important;
              gap: 0.375rem !important;
            }
            
            /* 移除section外框，只保留字符卡片边框 */
            .morse-sections > div {
              border: none !important;
              box-shadow: none !important;
            }
            
            .morse-sections > div > div:first-child {
              border: none !important;
              background: white !important;
            }
            
            /* 适度紧凑的字符卡片样式 */
            .morse-sections .grid > div {
              border: 1px solid black !important;
              border-radius: 0.25rem !important;
              padding: 0.375rem !important;
            }
            
            /* 适度减小字体大小 */
            .morse-sections .grid > div span:first-child {
              font-size: 0.875rem !important;
              font-weight: bold !important;
            }
            
            .morse-sections .grid > div span:last-child {
              font-size: 0.6875rem !important;
            }
          }
        `}
      </style>
      
      <Layout 
        title="Morse Code Chart – Complete Alphabet & Reference Sheet"
        description="Complete Morse code chart with letters, numbers, punctuation, and symbols. International standard reference sheet perfect for learning and quick lookup."
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 print:px-2 print:py-2 print:max-w-none">
        {/* 页面标题区域 - 打印时隐藏 */}
        <div className="flex justify-between items-start mb-8 sm:mb-12 print:hidden page-title-section">
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Morse Code Reference Sheet
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              Complete reference for Morse code characters and abbreviations
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex flex-col items-end">
            <button
              onClick={printPage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base print:hidden"
            >
              Print Reference Sheet
            </button>
          </div>
        </div>

        {/* 核心内容 - 打印时保留 */}
        <div className="space-y-6 sm:space-y-8 print:space-y-2 morse-sections">
          {/* Letters */}
          <CompactGridSection title="Letters (A-Z)" data={letters} />
          
          {/* Numbers */}
          <CompactGridSection title="Numbers (0-9)" data={numbers} />
          
          {/* Punctuation */}
          <CompactGridSection title="Punctuation Marks (International Standard)" data={punctuation} />
        </div>

        {/* Usage Notes - 打印时隐藏 */}
        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6 print:hidden">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            Usage Notes
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Dot (.) represents a short signal, dash (-) represents a long signal</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between elements of the same letter equals one dot duration</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between letters equals three dot durations</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Space between words equals seven dot durations</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Common abbreviations improve communication efficiency in amateur radio</span>
            </li>
          </ul>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Morse Code Reference Guide
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This comprehensive Morse code chart contains every letter, number, and punctuation mark you need for Morse code communication.
            </p>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Letter Examples:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                <div>• <strong>Letter A in Morse code</strong>: ".-" (dot-dash)</div>
                <div>• <strong>Letter B in Morse code</strong>: "-..." (dash-dot-dot-dot)</div>
                <div>• <strong>Letter C in Morse code</strong>: "-.-." (dash-dot-dash-dot)</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Whether you're learning Morse code for amateur radio, emergency communications, or historical interest, this printable reference sheet provides accurate International Morse Code standards used worldwide by radio operators and telecommunications professionals.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Essential Morse Code Alphabet and Numbers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Master the International Morse Code alphabet with our detailed reference showing each letter's unique dot and dash pattern.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Alphabet Patterns:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Simple: <strong>Letter E in Morse code</strong> (single dot ".")</li>
                  <li>• Complex: <strong>Y in Morse code</strong> ("-.--")</li>
                  <li>• Foundation for all Morse code communication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Number System:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• <strong>Number 1 in Morse code</strong>: ".----"</li>
                  <li>• <strong>Number 2 in Morse code</strong>: "..---"</li>
                  <li>• <strong>Number 9 in Morse code</strong>: "----."</li>
                  <li>• <strong>Number 0 in Morse code</strong>: "-----"</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Professional radio operators rely on these standardized patterns for clear, unambiguous communication across all languages and cultures. Print this reference sheet for offline practice and quick lookup during your Morse code learning journey.
            </p>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
} 