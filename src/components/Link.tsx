import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  const isExternal = href.startsWith('http');
  const baseClasses = "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink 
      to={href} 
      className={`${baseClasses} ${className}`}
    >
      {children}
    </RouterLink>
  );
}