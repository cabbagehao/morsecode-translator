import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { usePreloadRoute } from '../hooks/usePreloadRoute';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  preload?: boolean; // 是否启用预加载
}

export function Link({ href, children, className = '', onClick, preload = true }: LinkProps) {
  const location = useLocation();
  const { preloadRoute } = usePreloadRoute();
  const isExternal = href.startsWith('http');
  const isActive = location.pathname === href;

  // 检测移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // 桌面端：鼠标悬停预加载（作为兜底方案）
  const handleMouseEnter = () => {
    if (preload && !isExternal && !isMobile) {
      preloadRoute(href);
    }
  };

  // 移动端：触摸时预加载（即时反馈）
  const handleTouchStart = () => {
    if (preload && !isExternal && isMobile) {
      preloadRoute(href);
    }
  };
  
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
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink 
      to={href} 
      className={`${baseClasses} ${activeClasses} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
    >
      {children}
    </RouterLink>
  );
}