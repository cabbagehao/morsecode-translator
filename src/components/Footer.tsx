import React from 'react';
import { Link } from './Link';
import { useI18n } from '../contexts/I18nContext';

interface FooterProps {
  onFeedbackClick?: () => void;
}

export function Footer({ onFeedbackClick }: FooterProps) {
  const { t } = useI18n();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.learn')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn">{t('footer.learnMorseCode')}</Link></li>
              <li><Link href="/learn/basic-and-tips">{t('footer.basicAndTips')}</Link></li>
              <li><Link href="/learn/history">{t('footer.history')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.reference')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sheet/morse-code-sheet">{t('footer.morseCodeSheet')}</Link></li>
              <li><Link href="/sheet/common-abbr">{t('footer.commonAbbreviations')}</Link></li>
              <li><Link href="/sheet/common-words">{t('footer.commonWords')}</Link></li>
              <li><Link href="/sheet/common-phrases">{t('footer.commonPhrases')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.tools')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">{t('footer.morseTranslator')}</Link></li>
              <li><Link href="/decoders/txt-to-morse">{t('footer.textToMorse')}</Link></li>
              <li><Link href="/decoders/decode-text">{t('footer.decodeText')}</Link></li>
              <li><Link href="/decoders/decode-image">{t('footer.decodeImage')}</Link></li>
              <li>
                <button
                  onClick={onFeedbackClick}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  {t('footer.feedback')}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.about')}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {t('footer.description')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('footer.subtitle')}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {t('footer.copyright')}
          {' | '}
          <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('footer.privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}