import React, { useState } from 'react';
import { Link } from './Link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { locales, Locale } from '../i18n';
import { useI18n } from '../contexts/I18nContext';

export function Navigation() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isSheetDropdownOpen, setIsSheetDropdownOpen] = useState(false);
  const [isDecodersDropdownOpen, setIsDecodersDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isLanguageDropdownOpen) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isLanguageDropdownOpen]);

  // Handle language switch using React Router navigation
  const handleLanguageSwitch = (locale: Locale) => {
    setIsLanguageDropdownOpen(false);
    const url = getLocalizedUrl(locale);
    // Use React Router's navigate for smooth client-side routing
    navigate(url, { replace: true });
  };

  // Get current locale from URL
  const getCurrentLocale = (): Locale => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts[0] && ['ko', 'es', 'ru'].includes(pathParts[0])) {
      return pathParts[0] as Locale;
    }
    return 'en';
  };

  const currentLocale = getCurrentLocale();

  // Generate localized URL for current page
  const getLocalizedUrl = (locale: Locale): string => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // Remove current language code if present
    const currentLangIndex = pathParts.findIndex(part => ['ko', 'es', 'ru'].includes(part));
    if (currentLangIndex === 0) {
      pathParts.splice(0, 1); // Remove language code from beginning
    }
    
    // Build the new URL
    if (locale === 'en') {
      // For English, don't add language prefix
      return pathParts.length > 0 ? `/${pathParts.join('/')}` : '/';
    } else {
      // For other languages, add language prefix
      return pathParts.length > 0 ? `/${locale}/${pathParts.join('/')}` : `/${locale}`;
    }
  };

  // Generate localized link for any path
  const getLocalizedLink = (path: string): string => {
    if (currentLocale === 'en') {
      return path;
    } else {
      return `/${currentLocale}${path}`;
    }
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8">
            <img
              src="/favicon_io/android-chrome-192x192.png"
              alt={t('nav.logoAlt')}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain select-none"
              style={{
                imageRendering: '-webkit-optimize-contrast'
              }}
              draggable="false"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              <span className="hidden sm:inline">{t('site.name')}</span>
              <span className="sm:hidden">{t('site.name')}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <Link href={getLocalizedLink('/')}>{t('nav.translator')}</Link>

            {/* Learn dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsLearnDropdownOpen(true)}
              onMouseLeave={() => setIsLearnDropdownOpen(false)}
            >
              <Link
                href={getLocalizedLink('/learn')}
                className="flex items-center gap-1 group"
              >
                {t('nav.learn')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isLearnDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown menu */}
              {isLearnDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link
                      href={getLocalizedLink('/learn/basic-and-tips')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.learnSubItems.basicAndTips')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/learn/history')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.learnSubItems.history')}
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
                href={getLocalizedLink('/sheet')}
                className="flex items-center gap-1 group"
              >
                {t('nav.sheet')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isSheetDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown menu */}
              {isSheetDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-56 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link
                      href={getLocalizedLink('/sheet/morse-code-sheet')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.morseCodeSheet')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/sheet/common-abbr')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.commonAbbr')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/sheet/common-words')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.commonWords')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/sheet/common-phrases')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.commonPhrases')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/sheet/morse-code-alphabet')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.morseCodeAlphabet')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/sheet/morse-code-numbers')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.sheetSubItems.morseCodeNumbers')}
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
              <button
                className="flex items-center gap-1 group text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('nav.decoders')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDecodersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {isDecodersDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  {/* Invisible bridge to prevent gap */}
                  <div className="h-1 w-full"></div>
                  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <Link
                      href={getLocalizedLink('/decoders/decode-text')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.decodersSubItems.decodeText')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/decoders/decode-image')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.decodersSubItems.decodeImage')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/decoders/decode-audio')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.decodersSubItems.decodeAudio')}
                    </Link>
                    <Link
                      href={getLocalizedLink('/decoders/txt-to-morse')}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('nav.decodersSubItems.textToMorse')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href={getLocalizedLink('/shop')}>{t('nav.shop')}</Link>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                }}
                className="flex items-center gap-1 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-48 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                    {locales.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLanguageSwitch(locale.code);
                        }}
                        className={`w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          currentLocale === locale.code
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{locale.nativeName}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{locale.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                }}
                className="flex items-center gap-1 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                    {locales.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLanguageSwitch(locale.code);
                        }}
                        className={`w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          currentLocale === locale.code
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{locale.nativeName}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{locale.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t('nav.toggleMenu')}
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
              <Link href={getLocalizedLink('/')} className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                {t('nav.translator')}
              </Link>

              {/* Mobile Learn section */}
              <div>
                <Link href={getLocalizedLink('/learn')} className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.learn')}
                </Link>
                <Link href={getLocalizedLink('/learn/basic-and-tips')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.learnSubItems.basicAndTips')}
                </Link>
                <Link href={getLocalizedLink('/learn/history')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.learnSubItems.history')}
                </Link>
              </div>

              {/* Mobile Sheet section */}
              <div>
                <Link href={getLocalizedLink('/sheet')} className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheet')}
                </Link>
                <Link href={getLocalizedLink('/sheet/morse-code-sheet')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.morseCodeSheet')}
                </Link>
                <Link href={getLocalizedLink('/sheet/common-abbr')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.commonAbbr')}
                </Link>
                <Link href={getLocalizedLink('/sheet/common-words')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.commonWords')}
                </Link>
                <Link href={getLocalizedLink('/sheet/common-phrases')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.commonPhrases')}
                </Link>
                <Link href={getLocalizedLink('/sheet/morse-code-alphabet')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.morseCodeAlphabet')}
                </Link>
                <Link href={getLocalizedLink('/sheet/morse-code-numbers')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.sheetSubItems.morseCodeNumbers')}
                </Link>
              </div>

              {/* Mobile Decoders section */}
              <div>
                <div className="block px-4 py-3 text-base text-gray-900 dark:text-white">
                  {t('nav.decoders')}
                </div>
                <Link href={getLocalizedLink('/decoders/txt-to-morse')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.decodersSubItems.textToMorse')}
                </Link>
                <Link href={getLocalizedLink('/decoders/decode-text')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.decodersSubItems.decodeText')}
                </Link>
                <Link href={getLocalizedLink('/decoders/decode-image')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.decodersSubItems.decodeImage')}
                </Link>
                <Link href={getLocalizedLink('/decoders/decode-audio')} className="block px-8 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                  {t('nav.decodersSubItems.decodeAudio')}
                </Link>
              </div>

              <Link href={getLocalizedLink('/shop')} className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                {t('nav.shop')}
              </Link>
              <Link href={getLocalizedLink('/feedback')} className="block px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={handleMobileLinkClick}>
                {t('footer.feedback')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}