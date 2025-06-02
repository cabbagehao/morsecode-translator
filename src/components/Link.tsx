import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  const location = useLocation();
  const isExternal = href.startsWith('http');
  const isActive = location.pathname === href;
  
  const baseClasses = "transition-colors";
  const activeClasses = isActive 
    ? "text-blue-600 dark:text-blue-400 font-semibold" 
    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400";
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${activeClasses} ${className}`}
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
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </RouterLink>
  );
}