import React, { useState } from 'react';
import { Link } from './Link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isSheetDropdownOpen, setIsSheetDropdownOpen] = useState(false);
  const [isDecodersDropdownOpen, setIsDecodersDropdownOpen] = useState(false);

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
            
            {/* Learn dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsLearnDropdownOpen(true)}
              onMouseLeave={() => setIsLearnDropdownOpen(false)}
            >
              <Link 
                href="/learn" 
                className="flex items-center gap-1 group"
              >
                Learn
                <ChevronDown className={`w-4 h-4 transition-transform ${isLearnDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown menu */}
              {isLearnDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link 
                      href="/learn/basic-and-tips" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Basic and Tips
                    </Link>
                    <Link 
                      href="/learn/history" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      History
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sheet dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSheetDropdownOpen(true)}
              onMouseLeave={() => setIsSheetDropdownOpen(false)}
            >
              <Link 
                href="/sheet" 
                className="flex items-center gap-1 group"
              >
                Sheet
                <ChevronDown className={`w-4 h-4 transition-transform ${isSheetDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown menu */}
              {isSheetDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-56 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link 
                      href="/sheet/morse-code-sheet" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Morse Code Sheet
                    </Link>
                    <Link 
                      href="/sheet/common-abbr" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Common Abbr
                    </Link>
                    <Link 
                      href="/sheet/common-words" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Common Words
                    </Link>
                    <Link 
                      href="/sheet/common-phrases" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Common Phrases
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Decoders dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDecodersDropdownOpen(true)}
              onMouseLeave={() => setIsDecodersDropdownOpen(false)}
            >
              <Link 
                href="#" 
                className="flex items-center gap-1 group"
              >
                Decoders
                <ChevronDown className={`w-4 h-4 transition-transform ${isDecodersDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown menu */}
              {isDecodersDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link 
                      href="/decoders/decode-text" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Decode Text
                    </Link>
                    <Link 
                      href="/decoders/decode-image" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Decode Image
                    </Link>
                    <Link 
                      href="/decoders/decode-audio" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Decode Audio
                    </Link>
                    <Link 
                      href="/decoders/txt-to-morse" 
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Text To Morse
                    </Link>                    
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/shop">Shop</Link>
            
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
              
              {/* Mobile Learn section */}
              <div>
                <Link href="/learn" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Learn
                </Link>
                <Link href="/learn/basic-and-tips" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Basic and Tips
                </Link>
                <Link href="/learn/history" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  History
                </Link>
              </div>
              
              {/* Mobile Sheet section */}
              <div>
                <Link href="/sheet" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Sheet
                </Link>
                <Link href="/sheet/morse-code-sheet" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Morse Code Sheet
                </Link>
                <Link href="/sheet/common-abbr" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Common Abbr
                </Link>
                <Link href="/sheet/common-words" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Common Words
                </Link>
                <Link href="/sheet/common-phrases" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Common Phrases
                </Link>
              </div>
              
              {/* Mobile Decoders section */}
              <div>
                <div className="block px-4 py-3 text-base text-gray-900 dark:text-white">
                  Decoders
                </div>
                <Link href="/decoders/txt-to-morse" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Text To Morse
                </Link>
                <Link href="/decoders/decode-text" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Decode Text
                </Link>
                <Link href="/decoders/decode-image" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Decode Image
                </Link>
                <Link href="/decoders/decode-audio" className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Decode Audio
                </Link>
              </div>
              
              <Link href="/shop" className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}