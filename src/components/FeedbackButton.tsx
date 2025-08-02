import React from 'react';

interface FeedbackButtonProps {
  onClick: () => void;
}

export function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-3 rounded-l-lg shadow-md hover:shadow-lg border border-r-0 border-gray-200 dark:border-gray-600 group transition-colors duration-200"
        aria-label="Open feedback form"
        title="Feedback"
      >
        {/* Custom Icon */}
        <img 
          src="/write-feedback.png" 
          alt="Feedback" 
          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
        />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          Feedback
        </span>
      </button>
    </div>
  );
}