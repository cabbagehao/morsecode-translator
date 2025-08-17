import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Camera, Mic, Send, Loader2 } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface FeedbackFormProps {
  className?: string;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  category: string;
}

interface FileUpload {
  file: File;
  id: string;
  preview?: string;
  error?: string;
}

export function FeedbackForm({ className = '', onSuccess }: FeedbackFormProps) {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    category: 'feature'
  });

  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_FILES = 5;
  const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff'];
  const AUDIO_TYPES = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/wma', 'audio/mpeg'];

  const validateFile = (file: File): string | null => {
    // Only check file size - no type restrictions
    if (file.size > MAX_FILE_SIZE) {
      return t('feedback.fileTooLarge', {
        maxSize: (MAX_FILE_SIZE / 1024 / 1024).toString(),
        currentSize: (file.size / 1024 / 1024).toFixed(2)
      });
    }

    return null;
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    const newFiles: FileUpload[] = [];
    const currentFileCount = files.length;

    // Check total file limit
    if (currentFileCount + uploadedFiles.length > MAX_FILES) {
      setErrors(prev => ({
        ...prev,
        files: t('feedback.maxFilesExceeded', {
          maxFiles: MAX_FILES.toString(),
          currentFiles: currentFileCount.toString()
        })
      }));
      return;
    }

    Array.from(uploadedFiles).forEach((file, index) => {
      const error = validateFile(file);
      const fileId = `${Date.now()}-${index}`;
      
      const fileUpload: FileUpload = {
        file,
        id: fileId,
        error: error || undefined
      };

      // Create preview for images
      if (IMAGE_TYPES.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, preview: e.target?.result as string } : f
          ));
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(fileUpload);
    });

    setFiles(prev => [...prev, ...newFiles]);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Clear files error if any
    setErrors(prev => {
      const { files: _files, ...rest } = prev;
      return rest;
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = t('feedback.nameRequired');
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('feedback.emailInvalid');
    }


    if (!formData.message.trim()) {
      newErrors.message = t('feedback.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('feedback.messageTooShort');
    }

    // Check for file errors
    const fileErrors = files.filter(f => f.error);
    if (fileErrors.length > 0) {
      newErrors.files = t('feedback.fixFileErrors');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // In development mode, simulate successful submission
        console.log('Development mode: Simulating form submission with data:', {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          category: formData.category,
          files: files.filter(f => !f.error).map(f => f.file.name)
        });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitStatus('success');
        setSubmitMessage(t('feedback.successMessageDev'));
      } else {
        // Production mode: Submit to Netlify
        const netlifyFormData = new FormData();
        
        // Add form fields
        netlifyFormData.append('form-name', 'feedback');
        netlifyFormData.append('name', formData.name);
        netlifyFormData.append('email', formData.email);
        netlifyFormData.append('message', formData.message);
        netlifyFormData.append('category', formData.category);

        // Add files (only valid ones)
        const validFiles = files.filter(f => !f.error);
        validFiles.forEach((fileUpload, index) => {
          netlifyFormData.append(`file-${index}`, fileUpload.file);
        });

        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          body: netlifyFormData
        });

        if (response.ok) {
          setSubmitStatus('success');
          setSubmitMessage(t('feedback.successMessage'));
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      // Reset form on success (both dev and prod)
      setFormData({
        name: '',
        email: '',
        message: '',
        category: 'feature'
      });
      setFiles([]);
      setErrors({});

      // Don't auto-close, let user click confirmation button
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(t('feedback.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to message when status changes
  React.useEffect(() => {
    if (submitStatus !== 'idle' && messageRef.current) {
      messageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [submitStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (IMAGE_TYPES.includes(fileType)) {
      return <Camera className="w-5 h-5 text-blue-500" />;
    } else if (AUDIO_TYPES.includes(fileType)) {
      return <Mic className="w-5 h-5 text-green-500" />;
    }
    return <Upload className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Success/Error Messages */}
      <div ref={messageRef}>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-200">{t('feedback.success')}</h3>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">{submitMessage}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => onSuccess && onSuccess()}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('feedback.confirm')}
              </button>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-200">{t('feedback.error')}</h3>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{submitMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form 
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4"
      >

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('feedback.name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder={t('feedback.namePlaceholder')}
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('feedback.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder={t('feedback.emailPlaceholder')}
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('feedback.category')}
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none"
          >
            <option value="feature">{t('feedback.featureRequest')}</option>
            <option value="bug">{t('feedback.bugReport')}</option>
            <option value="general">{t('feedback.generalFeedback')}</option>
          </select>
        </div>


        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('feedback.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none ${
              errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('feedback.messagePlaceholder')}
          />
          {errors.message && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('feedback.attachments')}
          </label>
          
          {/* File Input */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              {t('feedback.uploadInstructions')}
            </p> 
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">
              {t('feedback.fileSupport')}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />

          {errors.files && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.files}</p>
          )}

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('feedback.uploadedFiles')} ({files.length}/{MAX_FILES})
              </h4>
              {files.map((fileUpload) => (
                <div
                  key={fileUpload.id}
                  className={`flex items-center gap-2 p-2 rounded-lg border ${
                    fileUpload.error 
                      ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  {/* File preview or icon */}
                  <div className="flex-shrink-0">
                    {fileUpload.preview ? (
                      <img 
                        src={fileUpload.preview} 
                        alt={t('feedback.form.filePreview')} 
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(fileUpload.file.type)
                    )}
                  </div>

                  {/* File info */}
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {fileUpload.file.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatFileSize(fileUpload.file.size)}</span>
                      <span>•</span>
                      <span>{fileUpload.file.type}</span>
                    </div>
                    {fileUpload.error && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-0.5">{fileUpload.error}</p>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(fileUpload.id)}
                    className="flex-shrink-0 p-1 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full transition-colors"
                    title={t('feedback.removeFile')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('feedback.submitting')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('feedback.sendFeedback')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}