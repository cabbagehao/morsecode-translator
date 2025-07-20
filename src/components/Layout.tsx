import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { usePageTracking } from '../hooks/usePageTracking';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function Layout({ children, title, description }: LayoutProps) {
  const location = useLocation();
  
  // Initialize page tracking
  usePageTracking();

  React.useEffect(() => {
    document.title = `${title} | Morse Code Translator`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // 动态设置canonical标签
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    
    // 构建canonical URL - 使用不带www的版本，去掉末尾斜杠
    let cleanPath = location.pathname;
    // 去掉末尾斜杠（除了根路径）
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    const canonicalUrl = `https://morse-coder.com${cleanPath}`;
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, location.pathname]);

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