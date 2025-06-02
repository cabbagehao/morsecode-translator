import React, { useState } from 'react';
import { Link } from './Link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8">
            <img 
              src="/favicon_io/favicon-32x32.png" 
              alt="Morse Code Translator Logo" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              <span className="hidden sm:inline">Morse Code Translator</span>
              <span className="sm:hidden">Morse Code</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <Link href="/">Translator</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/sheet">Sheet</Link>
            <Link href="/history">History</Link>
            <Link href="/about">About</Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t dark:border-gray-800">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Translator
              </Link>
              <Link href="/learn" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Learn
              </Link>
              <Link href="/sheet" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Sheet
              </Link>
              <Link href="/history" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                History
              </Link>
              <Link href="/about" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}