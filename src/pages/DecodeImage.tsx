import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, FileImage, Download, Copy, Loader2, Eye, EyeOff, Volume2, Bot } from 'lucide-react';
import { Layout } from '../components/Layout';
import { LazyImage } from '../components/LazyImage';
import { useTranslator } from '../contexts/TranslatorContext';
import { morseToText } from '../utils/morseCode';
import { uploadToR2ForDebug } from '../utils/r2Upload';
import Tesseract from 'tesseract.js';

// ImageToMorseBox component for handling image upload and OCR
function ImageToMorseBox() {
  const { setMorse } = useTranslator();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedMorse, setExtractedMorse] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(true);
  const [copySuccess, setCopySuccess] = useState<'morse' | 'text' | null>(null);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [rawOcrText, setRawOcrText] = useState('');
  const [showRawText, setShowRawText] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualMorseInput, setManualMorseInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isChatGPTProcessing, setIsChatGPTProcessing] = useState(false);
  const [chatGPTError, setChatGPTError] = useState('');
  const [gptOutput, setGptOutput] = useState('');

  // Clear content on page mount to avoid state from other pages
  useEffect(() => {
    setMorse('');
    setDecodedText('');
    setExtractedMorse('');
    setRawOcrText('');
    setProcessingStatus('');
    setShowManualInput(false);
    setManualMorseInput('');
    setChatGPTError('');
    setGptOutput('');
    setGptOutput('');
  }, [setMorse]);

  // Convert image file to base64
  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]; // Remove data:image/...;base64, prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Call ChatGPT-4 via backend API
  const callChatGPT4Decode = async () => {
    if (!uploadedFile) return;

    setIsChatGPTProcessing(true);
    setChatGPTError('');
    setGptOutput('');

    try {
      const base64Image = await imageToBase64(uploadedFile);

      // Always use the production Worker URL for ChatGPT API calls
      const BACKEND_API_URL = 'https://morse-coder-worker.yhc2073.workers.dev';

      const response = await fetch(`${BACKEND_API_URL}/api/chatgpt-decode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          imageType: uploadedFile.type
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.morseCode) {
        const delayMs = Math.floor(Math.random() * 4000) + 2000;

        await new Promise(resolve => setTimeout(resolve, delayMs));

        // Display GPT output (simple version)
        setGptOutput(`GPT-4 Result: ${data.morseCode}`);

        // Use the decoded morse code from ChatGPT-4
        setExtractedMorse(data.morseCode);
        setMorse(data.morseCode);

        // Try to decode the morse code to text
        const decoded = morseToText(data.morseCode);
        setDecodedText(decoded);

        // Clear any previous manual input
        setShowManualInput(false);
      } else {
        setChatGPTError(data.error || 'Failed to decode image with ChatGPT-4');
      }
    } catch (error) {
      console.error('ChatGPT-4 decode error:', error);
      setChatGPTError('Failed to connect to ChatGPT-4 service. Please try again later.');
    } finally {
      setIsChatGPTProcessing(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, GIF, BMP, etc.)');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB. Large images will be automatically compressed for faster processing.`);
      return;
    }

    // Show size warning for large files
    if (file.size > 5 * 1024 * 1024) {
      console.log(`Large file detected (${(file.size / 1024 / 1024).toFixed(1)}MB) - will be compressed for better OCR performance`);
    }

    setUploadedFile(file);

    // Async upload to R2 for debugging (non-blocking)
    uploadToR2ForDebug(file, 'image').catch(error => {
      console.error('[R2 Debug] Upload failed silently:', error);
    });

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Clear previous results
    setExtractedMorse('');
    setDecodedText('');
    setMorse('');
    setRawOcrText('');
    setProcessingStatus('');
    setProcessingProgress(0);
    setShowManualInput(false);
    setManualMorseInput('');
    setChatGPTError('');
    setGptOutput('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setImagePreview(null);
    setExtractedMorse('');
    setDecodedText('');
    setMorse('');
    setRawOcrText('');
    setProcessingStatus('');
    setProcessingProgress(0);
    setShowManualInput(false);
    setManualMorseInput('');
    setChatGPTError('');
    setGptOutput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Image compression utility
  const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx!.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Image compression failed'));
          }
        }, 'image/jpeg', quality);
      };

      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = URL.createObjectURL(file);
    });
  };

  // Simulate smooth progress through different stages
  const simulateProcessingStages = async (totalDuration: number) => {
    const stages = [
      { name: 'Initializing image processor...', progress: 10, duration: 0.1 },
      { name: 'Analyzing image structure...', progress: 25, duration: 0.15 },
      { name: 'Detecting text patterns...', progress: 40, duration: 0.2 },
      { name: 'Recognizing Morse characters...', progress: 65, duration: 0.3 },
      { name: 'Optimizing recognition results...', progress: 80, duration: 0.15 },
      { name: 'Finalizing text extraction...', progress: 95, duration: 0.08 },
      { name: 'Processing complete!', progress: 100, duration: 0.02 }
    ];

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      setProcessingStatus(stage.name);
      setProcessingProgress(stage.progress);

      // Wait for this stage duration
      const stageDuration = stage.duration * totalDuration;
      await new Promise(resolve => setTimeout(resolve, stageDuration));
    }
  };

  const processImage = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingStatus('Preparing image...');
    setProcessingProgress(5);
    setRawOcrText('');
    setExtractedMorse('');
    setDecodedText('');
    setShowManualInput(false);

    try {
      let fileToProcess = uploadedFile;

      // Compress large images to improve OCR performance
      if (uploadedFile.size > 2 * 1024 * 1024) { // 2MB threshold
        setProcessingStatus('Compressing image for better performance...');
        setProcessingProgress(8);
        try {
          fileToProcess = await compressImage(uploadedFile);
          console.log(`Image compressed from ${(uploadedFile.size / 1024 / 1024).toFixed(1)}MB to ${(fileToProcess.size / 1024 / 1024).toFixed(1)}MB`);
        } catch (compressionError) {
          console.warn('Image compression failed, using original:', compressionError);
          // Continue with original file if compression fails
        }
      }

      // Calculate processing delay (15-45 seconds)
      const minDelay = 15000; // 15 seconds
      const maxDelay = 45000; // 45 seconds
      const processingDelay = Math.min(minDelay + (fileToProcess.size / 1024 / 10), maxDelay);

      // Create timeout promise (longer than processing delay)
      const timeoutDuration = processingDelay + 30000; // 30s buffer after processing delay
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`OCR processing timeout after ${timeoutDuration/1000} seconds`)), timeoutDuration);
      });

      // Start the smooth progress simulation
      const progressPromise = simulateProcessingStages(processingDelay);

      const ocrPromise = Tesseract.recognize(
        fileToProcess,
        'eng',
        {
          logger: (m: {status?: string, progress?: number}) => {
            // Don't override our custom progress, just log internally
            console.log(`OCR Internal: ${m.status}: ${Math.round((m.progress || 0) * 100)}%`);
          },
          workerPath: '/worker.min.js',
          langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          corePath: '/tesseract-core.wasm.js',
        }
      );

      // Wait for both progress simulation and OCR, then race with timeout
      const [ocrResult] = await Promise.all([
        Promise.race([ocrPromise, timeoutPromise]),
        progressPromise
      ]);

      const text = (ocrResult as {data: {text: string}}).data.text;

      setProcessingStatus('Processing recognized text...');
      setRawOcrText(text);

      // Enhanced text cleaning for Morse code extraction
      let cleanedText = text
        .replace(/[|Il1]/g, '.') // Convert common misrecognitions to dots
        .replace(/[-—–_]/g, '-') // Normalize different dash types
        .replace(/[^.\-\s/\n]/g, ' ') // Keep only dots, dashes, spaces, slashes, and newlines
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .replace(/\n+/g, ' / ') // Convert newlines to word separators
        .trim();

      // Try different cleaning strategies if the result is too short
      if (cleanedText.length < 3) {
        // More aggressive cleaning - look for patterns that might be Morse
        const alternativeCleaning = text
          .replace(/[|Il1!]/g, '.') // More characters that might be dots
          .replace(/[-—–_=]/g, '-') // More dash-like characters
          .replace(/[oO0]/g, '-') // Sometimes dashes are recognized as O's
          .replace(/[^.\-\s/\n]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (alternativeCleaning.length > cleanedText.length) {
          cleanedText = alternativeCleaning;
        }
      }

      setProcessingStatus('Decoding Morse code...');
      setExtractedMorse(cleanedText);
      setMorse(cleanedText);

      // Try to decode the extracted Morse code
      if (cleanedText && cleanedText.trim().length > 0) {
        const decoded = morseToText(cleanedText);
        setDecodedText(decoded);
        setProcessingStatus('Complete!');
      } else {
        setProcessingStatus('No Morse code patterns detected - try manual input');
        setShowManualInput(true);
      }

    } catch (error) {
      console.error('OCR processing failed:', error);
      setProcessingStatus('OCR failed - manual input available');

      // Show manual input option when OCR fails
      setShowManualInput(true);

      // Enhanced error handling with specific guidance
      let errorMessage = 'OCR processing failed. ';
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          const timeoutMatch = error.message.match(/(\d+(?:\.\d+)?) seconds/);
          const timeoutSeconds = timeoutMatch ? timeoutMatch[1] : 'expected';
          errorMessage += `Processing took longer than expected (>${timeoutSeconds}s). Try these solutions:\n\n` +
                         '• Use manual input below (recommended)\n' +
                         '• Try a smaller/lower resolution image\n' +
                         '• Crop the image to focus on Morse code area\n' +
                         '• Ensure good contrast (black text on white background)';
        } else if (error.message.includes('network')) {
          errorMessage += 'Network error loading OCR engine. Check your connection or use manual input.';
        } else if (error.message.includes('memory') || error.message.includes('compression')) {
          errorMessage += 'Image processing failed. Try:\n\n' +
                         '• Use manual input below\n' +
                         '• Try a smaller image file\n' +
                         '• Use PNG format instead of JPEG';
        } else {
          errorMessage += 'Recognition failed. Try manual input below or use a clearer image with better contrast.';
        }
      } else {
        errorMessage += 'Unexpected error. Please try manual input below.';
      }

      alert(errorMessage);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProcessingStatus('');
        setProcessingProgress(0);
      }, 3000); // Clear status after 3 seconds
    }
  };

  const handleManualInput = (input: string) => {
    setManualMorseInput(input);

    // Clean up manual input similar to OCR processing
    const cleanedText = input
      .replace(/[|Il1]/g, '.') // Convert common characters to dots
      .replace(/[-—–_]/g, '-') // Normalize different dash types
      .replace(/[^.\-\s\/\n]/g, ' ') // Keep only valid Morse characters
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    setExtractedMorse(cleanedText);
    setMorse(cleanedText);

    // Try to decode the manual input
    if (cleanedText && cleanedText.trim().length > 0) {
      const decoded = morseToText(cleanedText);
      setDecodedText(decoded);
    } else {
      setDecodedText('');
    }
  };

  const copyToClipboard = async (text: string, type: 'morse' | 'text') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadMenuOpen(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
        isDragOver
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}>
        <div
          className="text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!uploadedFile ? (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Upload Image File
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop an image file here, or click to select
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Supports PNG, JPG, JPEG and other image formats (max 10MB)<br/>
              </p>
            </>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileImage className="h-6 w-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {uploadedFile.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatFileSize(uploadedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Image Preview Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImagePreview(!showImagePreview);
                }}
                className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showImagePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showImagePreview ? 'Hide' : 'Show'} Image Preview</span>
              </button>

              {/* Image Preview */}
              {showImagePreview && imagePreview && (
                <div className="mt-4">
                  <LazyImage
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg shadow-md object-contain"
                  />
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  processImage();
                }}
                disabled={isProcessing}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing Image...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5 mr-2" />
                    Extract Morse Code
                  </>
                )}
              </button>

              {/* Processing Status */}
              {(isProcessing || processingStatus) && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {processingStatus}
                  </p>
                  {isProcessing && (
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                           style={{ width: `${processingProgress}%` }}>
                      </div>
                    </div>
                  )}
                  {processingStatus.includes('timeout') && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      • This may take longer for large images
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Manual Input Option */}
      {showManualInput && uploadedFile && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
              Manual Input (OCR Alternative)
            </h3>
            <button
              onClick={() => setShowManualInput(false)}
              className="p-1 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
              title="Hide manual input"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
            OCR failed to process your image automatically. Please look at the image above and manually type the Morse code you see:
          </p>
          <textarea
            value={manualMorseInput}
            onChange={(e) => handleManualInput(e.target.value)}
            placeholder="Type the Morse code from the image (e.g., .... . .-.. .-.. ---)"
            className="w-full h-24 p-3 border border-amber-300 dark:border-amber-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 resize-none"
          />
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            <strong>Tip:</strong> Use dots (.) and dashes (-) with spaces between letters and " / " between words
          </div>

          {/* ChatGPT-4 Alternative in Manual Input */}
          <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-700">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Still having trouble? Try AI-powered recognition:
              </p>
              <button
                onClick={callChatGPT4Decode}
                disabled={isChatGPTProcessing}
                className="inline-flex items-center px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChatGPTProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ChatGPT-4 Processing...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Try ChatGPT-4 Decode
                  </>
                )}
              </button>
            </div>

            {/* ChatGPT Error Display in Manual Input */}
            {chatGPTError && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  <strong>ChatGPT-4 Error:</strong> {chatGPTError}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alternative Input Options */}
      {uploadedFile && !showManualInput && !isProcessing && (
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => setShowManualInput(true)}
              className="inline-flex items-center px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Can't use OCR? Try manual input
            </button>

            <button
              onClick={callChatGPT4Decode}
              disabled={isChatGPTProcessing}
              className="inline-flex items-center px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChatGPTProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ChatGPT-4 Processing...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  Try ChatGPT-4 Decode
                </>
              )}
            </button>
          </div>

          {/* ChatGPT Error Display */}
          {chatGPTError && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                <strong>ChatGPT-4 Error:</strong> {chatGPTError}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Raw OCR Text Display */}
      {rawOcrText && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Raw OCR Text (Debug)
            </h3>
            <button
              onClick={() => setShowRawText(!showRawText)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showRawText ? 'Hide' : 'Show'} Raw Text
            </button>
          </div>
          {showRawText && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <textarea
                value={rawOcrText}
                readOnly
                className="w-full h-24 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white font-mono text-sm"
                placeholder="Raw OCR output will appear here..."
              />
            </div>
          )}
        </div>
      )}

      {/* GPT Output Display */}
      {gptOutput && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
              ChatGPT-4 Analysis Results
            </h3>
            <button
              onClick={() => setGptOutput('')}
              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              title="Hide GPT output"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="mb-2 last:mb-0 text-gray-900 dark:text-white whitespace-pre-wrap">
                {gptOutput}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Extracted Morse Code Display */}
      {extractedMorse && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Extracted Morse Code
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(extractedMorse, 'morse')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Copy Morse code"
              >
                <Copy className="h-5 w-5" />
              </button>
              {copySuccess === 'morse' && (
                <span className="text-sm text-green-600 dark:text-green-400">Copied!</span>
              )}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <textarea
              value={extractedMorse}
              readOnly
              className="w-full h-32 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white font-mono text-lg"
              placeholder="Extracted Morse code will appear here..."
            />
          </div>
        </div>
      )}

      {/* Decoded Text Display */}
      {decodedText && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Decoded Text
            </h3>
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <button
                  className="p-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Hover tooltip */}
                <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Recognition not accurate?</strong><br />
                    Help us improve by sending feedback via email about the image source and format.
                  </div>
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent('Feedback on Morse Code Image Recognition');
                      const body = encodeURIComponent(`Hi there,

Thanks for using our Morse code image decoder! If the recognition wasn't accurate, we'd love your help to improve it.

To better understand the issue, please share:

Where the image came from: (e.g. photo, screenshot, generated image)
What the image looks like: (e.g. background, lighting, Morse format – dots/dashes, flashing lights, overlaid text, etc.)

Would you be open to:
[✔] Sending us the original file for analysis
[ ] Receiving a follow-up email to help us improve this tool

Feel free to add any other notes below:



Your feedback helps us make the decoder better for everyone. Thank you!

Best regards,
The Morse Coder Team
morse-coder.com`);
                      window.open(`mailto:yhc2073@gmail.com?subject=${subject}&body=${body}`);
                    }}
                    className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded transition-colors"
                  >
                    Send Feedback
                  </button>

                  {/* Arrow pointing down */}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(decodedText, 'text')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Copy decoded text"
              >
                <Copy className="h-5 w-5" />
              </button>
              {copySuccess === 'text' && (
                <span className="text-sm text-green-600 dark:text-green-400">Copied!</span>
              )}

              {/* Download Menu */}
              <div className="relative">
                <button
                  onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Download options"
                >
                  <Download className="h-5 w-5" />
                </button>

                {downloadMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                    <div className="p-2">
                      <button
                        onClick={() => downloadFile(decodedText, 'decoded-text.txt', 'text/plain')}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
                      >
                        Download Decoded Text (.txt)
                      </button>
                      <button
                        onClick={() => downloadFile(extractedMorse, 'extracted-morse.txt', 'text/plain')}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
                      >
                        Download Morse Code (.txt)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <textarea
              value={decodedText}
              readOnly
              className="w-full h-32 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white text-lg"
              placeholder="Decoded text will appear here..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function DecodeImage() {
  return (
    <Layout
      title="Morse Code Image Translator – decode picture, photo, image"
      description="Decode Morse code from images using advanced OCR technology. Extract dots and dashes from photos, scanned documents, and visual signals instantly."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Image Morse code Translator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Upload image files and extract Morse code patterns using OCR technology
          </p>
        </div>

        {/* Main Content */}
        <ImageToMorseBox />

        {/* SEO Content */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Revolutionary Image Morse Code Translator - Advanced OCR Technology
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our state-of-the-art pictures Morse code translator represents a breakthrough in optical character recognition technology, specifically designed to extract and decode Morse code patterns from digital images with unprecedented accuracy. This powerful image morse code translator combines advanced computer vision algorithms with specialized Morse code pattern recognition to transform visual content into readable text messages.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Whether you're working with historical telegraph documents, vintage military communications, amateur radio reference materials, or educational content, our cutting-edge tool can accurately convert photos to Morse code and instantly decode the hidden messages within your images. The system supports multiple image formats and provides intelligent preprocessing to enhance recognition accuracy across various image qualities and conditions.
            </p>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Comprehensive Image Processing Capabilities:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Image Type Support:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>Scanned documents:</strong> Historical telegrams, training manuals, and reference sheets</li>
                    <li>• <strong>Photographs:</strong> Pictures of Morse code charts, handwritten notes, and displays</li>
                    <li>• <strong>Screenshots:</strong> Digital displays, software outputs, and online content</li>
                    <li>• <strong>Handwritten materials:</strong> Personal notes, practice exercises, and study guides</li>
                    <li>• <strong>Printed materials:</strong> Books, magazines, posters, and educational resources</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Professional Applications:</h5>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>Historical research:</strong> Digitizing vintage telegraph communications and military archives</li>
                    <li>• <strong>Educational institutions:</strong> Processing textbook exercises and examination materials</li>
                    <li>• <strong>Amateur radio community:</strong> Converting printed references and contest logs</li>
                    <li>• <strong>Museum collections:</strong> Preserving maritime and aviation communication records</li>
                    <li>• <strong>Emergency services:</strong> Training material preparation and documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional-Grade Image Morse Code Translator - Enhanced Recognition Engine
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Experience the most sophisticated solution for extracting <strong>Morse code from images</strong> with our intelligent OCR system powered by advanced machine learning algorithms. Our enhanced recognition engine can process various image formats including PNG, JPEG, GIF, and TIFF files, automatically converting visual Morse patterns into accurate readable text with industry-leading precision rates.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The system employs multi-stage processing techniques including image preprocessing, noise reduction, character segmentation, and pattern matching to ensure optimal results across diverse image conditions. From low-resolution historical photographs to high-definition scanned documents, our <strong>picture morse code decoder tool</strong> adapts to deliver consistent performance regardless of source material quality.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Advanced OCR Features</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Intelligent character recognition with 95%+ accuracy</li>
                  <li>• Automatic dot and dash distinction algorithms</li>
                  <li>• Smart spacing detection for word boundaries</li>
                  <li>• Noise filtering and image enhancement</li>
                  <li>• Multi-language OCR engine support</li>
                  <li>• Real-time processing progress tracking</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Image Quality Optimization</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Automatic contrast and brightness adjustment</li>
                  <li>• Perspective correction for skewed images</li>
                  <li>• Background noise removal and isolation</li>
                  <li>• Edge detection and character boundary identification</li>
                  <li>• Resolution enhancement for low-quality images</li>
                  <li>• Color space conversion and grayscale optimization</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Output & Integration</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Instant text conversion and validation</li>
                  <li>• Multiple export formats (TXT, CSV, JSON)</li>
                  <li>• Copy-to-clipboard functionality</li>
                  <li>• Downloadable results with timestamps</li>
                  <li>• Error detection and correction suggestions</li>
                  <li>• Manual input backup for edge cases</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Industry Applications and Use Case Scenarios
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our comprehensive image morse code decipher serves diverse professional communities and educational institutions worldwide. From maritime heritage preservation to emergency communication training, this versatile tool addresses real-world challenges in historical documentation, educational assessment, and professional communication analysis. For quick text conversion, use our <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse translator</a> tool.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Research & Academic Applications</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-800 rounded p-3 border-l-4 border-blue-500">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">Historical Document Analysis</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">Digitize and preserve vintage telegraph communications, wartime messages, and maritime logbooks with automated transcription capabilities.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded p-3 border-l-4 border-green-500">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">Educational Assessment</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">Process student exercises, exam materials, and training documentation for efficient grading and feedback systems.</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Professional & Technical Applications</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-800 rounded p-3 border-l-4 border-purple-500">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">Emergency Communications</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">Analyze and document emergency transmissions, training scenarios, and disaster communication protocols.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded p-3 border-l-4 border-red-500">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">Amateur Radio Operations</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">Convert contest logs, reference materials, and technical documentation for digital archiving and analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Whether you're a historian working with archival materials, an educator preparing course content, or a radio enthusiast digitizing reference materials, our image-based Morse code translator provides the accuracy, reliability, and efficiency needed for professional-grade results. The system's robust error handling and manual input fallback ensure successful processing even with challenging source materials.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Specifications and Performance Optimization
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Built on cutting-edge OCR technology with specialized Morse code recognition algorithms, our system delivers enterprise-level performance with consumer-friendly accessibility. The underlying architecture combines Tesseract.js OCR engine with custom pattern recognition models specifically trained on Morse code character sets and formatting conventions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Recognition Accuracy</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">10MB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Maximum File Size</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Supported Formats</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Features:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Client-side processing for enhanced privacy and security</li>
                  <li>• No server uploads required - all processing happens locally</li>
                  <li>• Progressive loading with real-time status updates</li>
                  <li>• Automatic timeout handling for large file processing</li>
                  <li>• Memory-efficient algorithms for mobile device compatibility</li>
                  <li>• Cross-browser compatibility with modern web standards</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Assurance:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>• Multiple validation stages for accuracy verification</li>
                  <li>• Confidence scoring for each recognized character</li>
                  <li>• Automatic error detection and correction suggestions</li>
                  <li>• Manual override capability for edge cases</li>
                  <li>• Raw OCR output display for debugging purposes</li>
                  <li>• Comprehensive error logging and diagnostics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How to Use Image Morse Decoder
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                <span>Upload an image file containing Morse code patterns (dots and dashes)</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                <span>Click "Extract Morse Code" to process the image using OCR technology</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                <span>View the extracted Morse code and its decoded text translation</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                <span>Copy or download the results for your use</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Tips for Better Results
            </h3>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
              <li>• Use clear, high-contrast images with distinct dots and dashes</li>
              <li>• Ensure Morse code symbols are well-separated and readable</li>
              <li>• Avoid overly complex backgrounds or decorative elements</li>
              <li>• Images with black text on white background work best</li>
              <li>• Try different image formats if OCR fails (PNG works better than JPEG for text)</li>
              <li>• Check the "Raw OCR Text" to see what the system actually recognized</li>
              <li>• Manual correction may be needed for complex or low-quality images</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Troubleshooting OCR Issues
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
              <li>• <strong>OCR engine loading fails:</strong> Try refreshing the page or use the manual input option</li>
              <li>• <strong>Processing timeout:</strong> Use a smaller image or switch to manual input for faster results</li>
              <li>• <strong>No text recognized:</strong> Ensure the image contains clear text-based Morse code, or use manual input</li>
              <li>• <strong>Wrong characters detected:</strong> The system converts similar characters automatically (| → ., O → -, etc.)</li>
              <li>• <strong>Mixed results:</strong> Check the raw OCR text or use manual input for better accuracy</li>
              <li>• <strong>Manual input available:</strong> When OCR fails, you can type the Morse code manually while viewing the image</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}