import React from 'react';
import { Link } from './Link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn">Learn Morse Code</Link></li>
              <li><Link href="/learn/basic-and-tips">Basic & Tips</Link></li>
              <li><Link href="/learn/history">History</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Reference</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sheet/morse-code-sheet">Morse Code Sheet</Link></li>
              <li><Link href="/sheet/common-abbr">Common Abbreviations</Link></li>
              <li><Link href="/sheet/common-words">Common Words</Link></li>
              <li><Link href="/sheet/common-phrases">Common Phrases</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Morse Translator</Link></li>
              <li><Link href="/decoders/txt-to-morse">Text to Morse</Link></li>
              <li><Link href="/decoders/decode-text">Decode Text</Link></li>
              <li><Link href="/decoders/decode-image">Decode Image</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Our Morse code translator provides instant, accurate translations between text and Morse code.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built with modern web technologies for reliability and ease of use.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Morse Code Translator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}