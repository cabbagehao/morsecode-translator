import React from 'react';
import { Layout } from '../components/Layout';
import { FeedbackForm } from '../components/FeedbackForm';
import { MessageSquare, Mail } from 'lucide-react';

export default function Feedback() {
  return (
    <Layout
      title="Feedback & Support - Morse Code Translator"
      description="Send us your feedback, report bugs, or suggest new features for our Morse code translator. We value your input and continuously improve based on user suggestions."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your feedback helps us improve the Morse code translator experience.
          </p>
        </div>


        {/* Main Feedback Form */}
        <FeedbackForm className="mb-8" />

        {/* Alternative Contact Methods */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Other Ways to Reach Us
          </h3>
          
          <div className="flex justify-center">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                <a 
                  href="mailto:yhc2073@gmail.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  yhc2073@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>💡 Pro tip:</strong> When reporting bugs, include relevant files (screenshots, audio samples, logs, etc.) using the form above. 
              This helps us understand and fix issues much faster!
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                How quickly do you respond to feedback?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We typically respond within 24-48 hours. Bug reports are prioritized and often addressed within hours.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                What file types can I upload?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You can upload any file type - documents, images, audio, video, archives, etc. Maximum 5 files, 10MB each.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Do you implement all feature requests?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We evaluate all suggestions based on user need, technical feasibility, and alignment with our roadmap. Popular requests are prioritized.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Is my information kept private?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes, we only use your contact information to respond to your feedback. We don't share personal information with third parties.
              </p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}