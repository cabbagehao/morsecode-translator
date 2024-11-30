import React from 'react';
import { Link } from './Link';
import { Braces } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Braces className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Morse Code Translator</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/">Translator</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/history">History</Link>
            <Link href="/about">About</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}