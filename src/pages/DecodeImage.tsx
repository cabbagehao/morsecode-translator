import React from 'react';
import { Layout } from '../components/Layout';

export default function DecodeImage() {
  return (
    <Layout 
      title="Decode Morse from Image"
      description="Extract and decode Morse code patterns from images."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Decode Morse from Image
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Extract and decode Morse code patterns from image files
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This image decoder is under development. Check back soon for Morse code extraction from images!
          </p>
        </div>
      </div>
    </Layout>
  );
} 