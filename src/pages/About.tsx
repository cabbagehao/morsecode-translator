import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from '../components/Link';
import { Github, Mail } from 'lucide-react';

export default function About() {
  return (
    <Layout 
      title="About"
      description="Learn about our Morse code translator project, its features, and the team behind it."
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Our Project</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We aim to make Morse code accessible to everyone through a modern, user-friendly interface.
              Our translator provides instant, accurate translations while helping users learn and understand
              this historic form of communication.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Real-time translation between text and Morse code</li>
              <li>Support for letters, numbers, and punctuation marks</li>
              <li>Dark mode support for comfortable viewing</li>
              <li>Responsive design for all devices</li>
              <li>Educational resources and practice tools</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Open Source</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our project will be open source soon! We're currently preparing our codebase for public release.
              Stay tuned for updates.
            </p>
            <button 
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
              disabled
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Have questions or suggestions? We'd love to hear from you! Feel free to reach out via email:
            </p>
            <a 
              href="mailto:cabbagehao@icloud.com"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <Mail className="w-5 h-5" />
              cabbagehao@icloud.com
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
}