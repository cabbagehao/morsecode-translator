import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
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
          (window as any).adsbygoogle.push({});
        }
      } catch (error) {
        console.log('AdSense push ads error:', error);
      }
    };

    // Small delay to ensure DOM is ready and script is loaded
    const timer = setTimeout(pushAds, 300);
    
    return () => clearTimeout(timer);

    // Remove existing hreflang and canonical links
    const existingLinks = document.querySelectorAll('link[rel="canonical"], link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Get clean path (remove locale prefix for canonical URL construction)
    let cleanPath = location.pathname;
    const pathParts = cleanPath.split('/').filter(Boolean);
    
    // Remove locale from path if present
    if (pathParts[0] && ['ko', 'es', 'ru'].includes(pathParts[0])) {
      pathParts.shift(); // Remove locale prefix
    }
    
    // Reconstruct clean path
    const basePath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';
    
    // Set canonical URL (always points to English version for now, as requested)
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://morse-coder.com${basePath}`);
    document.head.appendChild(canonicalLink);

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
    
  }, [title, description, location.pathname, locale]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}