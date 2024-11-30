import React from 'react';
import { Link } from './Link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Our Morse code translator provides instant, accurate translations between text and Morse code.
              Built with modern web technologies for reliability and ease of use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn">Learn Morse Code</Link></li>
              <li><Link href="/">Practice Translator</Link></li>
              <li><Link href="/history">History</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn">Beginner's Guide</Link></li>
              <li><Link href="/about">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Morse Code Translator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}