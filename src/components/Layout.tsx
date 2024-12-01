import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { usePageTracking } from '../hooks/usePageTracking';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function Layout({ children, title, description }: LayoutProps) {
  // Initialize page tracking
  usePageTracking();

  React.useEffect(() => {
    document.title = `${title} | Morse Code Translator`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

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