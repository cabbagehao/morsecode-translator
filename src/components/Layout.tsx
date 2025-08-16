import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { FeedbackButton } from './FeedbackButton';
import { FeedbackModal } from './FeedbackModal';
import { usePageTracking } from '../hooks/usePageTracking';
import { useLocation } from 'react-router-dom';
import { Locale, defaultLocale, locales } from '../i18n';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  locale?: Locale;
}

export function Layout({ children, title, description, locale = defaultLocale }: LayoutProps) {
  const location = useLocation();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Initialize page tracking
  usePageTracking();

  React.useEffect(() => {
    document.title = `${title}`;
    
    // Set HTML lang attribute
    document.documentElement.lang = locale;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Add AdSense script if not already present
    const existingAdSenseScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
    if (!existingAdSenseScript) {
      const adSenseScript = document.createElement('script');
      adSenseScript.async = true;
      adSenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4540467205535241';
      adSenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adSenseScript);
    }

    // Push ads on route change for SPA navigation
    // This ensures new ads load when navigating between pages
    const pushAds = () => {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          // Check for uninitialized AdSense slots before pushing
          const adsElements = document.querySelectorAll('ins.adsbygoogle');
          const uninitializedAds = Array.from(adsElements).filter(
            (ad) => !ad.getAttribute('data-adsbygoogle-status')
          );
          
          // Only push if there are uninitialized ads
          if (uninitializedAds.length > 0) {
            (window as any).adsbygoogle.push({});
          }
        }
      } catch (error) {
        // Only log if it's not the "already have ads" error to reduce noise
        if (!error.message?.includes('already have ads in them')) {
          console.log('AdSense push ads error:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready and script is loaded
    const timer = setTimeout(pushAds, 500);

    // Remove existing hreflang and canonical links
    const existingLinks = document.querySelectorAll('link[rel="canonical"], link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Set canonical URL (each language version has its own canonical)
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://morse-coder.com${location.pathname}`);
    document.head.appendChild(canonicalLink);

    // Get clean path (remove locale prefix for hreflang URL construction)
    let cleanPath = location.pathname;
    const pathParts = cleanPath.split('/').filter(Boolean);
    
    // Remove locale from path if present for hreflang links
    if (pathParts[0] && ['ko', 'es', 'ru'].includes(pathParts[0])) {
      pathParts.shift(); // Remove locale prefix
    }
    
    // Reconstruct clean path for hreflang
    const basePath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';

    // Add hreflang links for each language
    locales.forEach(({ code }) => {
      const hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', code);
      
      if (code === defaultLocale) {
        // Default language (English) doesn't have prefix
        hreflangLink.setAttribute('href', `https://morse-coder.com${basePath}`);
      } else {
        // Other languages have prefix
        hreflangLink.setAttribute('href', `https://morse-coder.com/${code}${basePath}`);
      }
      
      document.head.appendChild(hreflangLink);
    });

    // Add x-default hreflang (points to English)
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', `https://morse-coder.com${basePath}`);
    document.head.appendChild(xDefaultLink);
    
    return () => clearTimeout(timer);
    
  }, [title, description, location.pathname, locale]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer onFeedbackClick={() => setIsFeedbackModalOpen(true)} />
      
      {/* Floating Feedback Button - Desktop only */}
      <FeedbackButton onClick={() => setIsFeedbackModalOpen(true)} />
      
      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
}