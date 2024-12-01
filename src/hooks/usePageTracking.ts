import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    _hmt?: any[];
  }
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window._hmt) {
      // Track page view
      window._hmt.push(['_trackPageview', location.pathname]);
    }
  }, [location]);
}