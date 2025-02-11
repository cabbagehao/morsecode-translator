import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    _hmt?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window._hmt) {
      // Track page view in Baidu Analytics
      window._hmt.push(['_trackPageview', location.pathname]);
    }
    
    if (window.gtag) {
      // Track page view in Google Analytics
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);
}