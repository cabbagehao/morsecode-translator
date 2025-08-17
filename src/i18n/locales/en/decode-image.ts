export const decodeImage = {
  // Page metadata
  title: "Morse Code Image Decoder – extract morse code from image",
  description: "Decode Morse code from images instantly using OCR technology. Upload photos containing dot-dash patterns and convert to readable text with AI-powered recognition.",
  
  // Main heading
  mainHeading: "Image Morse Code Decoder",
  pageTitle: "Image Morse Code Decoder",
  subtitle: "Extract Morse code from photos and images using advanced OCR technology",
  
  // Upload section
  uploadSection: {
    title: "Upload Image with Morse Code",
    dragAndDrop: "Drag and drop your image here, or click to browse",
    supportedFormats: "Supports PNG, JPG, JPEG, GIF, BMP and other common image formats",
    selectFile: "Select Image File",
    processing: "Processing...",
    analyzing: "Analyzing image...",
    removeFile: "Remove file"
  },
  
  // Image preview
  imagePreview: {
    show: "Show Preview",
    hide: "Hide Preview",
    togglePreview: "Toggle image preview"
  },
  
  // Processing section
  processing: {
    status: "Processing Status",
    extractingMorse: "Extract Morse Code",
    preparingImage: "Preparing image...",
    compressingImage: "Compressing image for better performance...",
    performingOCR: "Performing OCR on image...",
    processingText: "Processing recognized text...",
    decodingMorse: "Decoding Morse code...",
    complete: "Complete!",
    progress: "Progress",
    ocrProcessing: "OCR Processing...",
    analyzingText: "Analyzing text...",
    
    // Processing stages
    stages: {
      initializing: "Initializing image processor...",
      analyzingStructure: "Analyzing image structure...",
      detectingPatterns: "Detecting text patterns...",
      recognizingCharacters: "Recognizing Morse characters...",
      optimizingResults: "Optimizing recognition results...",
      finalizingExtraction: "Finalizing text extraction...",
      processingComplete: "Processing complete!"
    }
  },
  
  // Manual input section
  manualInput: {
    title: "Manual Morse Code Input",
    description: "If OCR didn't detect correctly, you can manually enter the Morse code:",
    hideInput: "Hide Input",
    showInput: "Show manual input",
    placeholder: "Type the Morse code from the image (e.g., .... . .-.. .-.. ---)",
    helpText: "If the automatic recognition didn't work well, you can manually type the Morse code you see in the image.",
    tryManualInput: "Try Manual Input",
    process: "Process Manual Input",
    tipTitle: "Tip",
    tipText: "Use dots (.) and dashes (-) with spaces between letters and \" / \" between words",
    stillTrouble: "Still having trouble? Try AI-powered recognition:",
    cantUseOcr: "Can't use OCR? Try manual input",
    manualInputAvailable: "Manual input available"
  },
  
  // Results section
  results: {
    title: "Extraction Results",
    extractedMorse: "Extracted Morse Code",
    decodedText: "Decoded Text",
    rawOcrText: "Raw OCR Text (Debug)",
    showRawText: "Show Raw Text",
    hideRawText: "Hide Raw Text",
    noResults: "No Morse code detected in the image",
    tryDifferent: "Try a different image or adjust the image quality",
    copyMorse: "Copy Morse code",
    copyText: "Copy decoded text",
    copiedMorse: "Copied!",
    copiedText: "Copied!",
    copiedToClipboard: "Copied to clipboard!",
    downloadText: "Download",
    downloadOptions: "Download options",
    downloadMorseCode: "Morse Code",
    downloadDecodedText: "Decoded Text",
    rawOcrOutputPlaceholder: "Raw OCR output will appear here...",
    extractedMorseCodePlaceholder: "Extracted Morse code will appear here...",
    decodedTextPlaceholder: "Decoded text will appear here...",
    downloadDecodedTextFile: "Download Decoded Text (.txt)",
    downloadMorseCodeFile: "Download Morse Code (.txt)",
    recognitionNotAccurate: "Recognition not accurate?",
    helpImproveMessage: "Help us improve by sending feedback via email about the image source and format.",
    sendFeedback: "Send Feedback",
    
    // Simple text
    copied: "Copied!"
  },
  
  // ChatGPT/AI section
  aiAssistant: {
    title: "AI Assistant Analysis",
    description: "Use AI to help extract Morse code patterns that OCR might miss:",
    analyze: "Analyze with AI",
    analyzing: "AI is analyzing the image...",
    processing: "Processing with ChatGPT-4...",
    tryDecode: "Try ChatGPT-4 Decode",
    result: "GPT-4 Result:",
    error: "AI analysis failed. Please try again later.",
    showOutput: "Show AI analysis",
    hideOutput: "Hide AI analysis",
    chatgptAnalysisResults: "ChatGPT-4 Analysis Results",
    hideGptOutput: "Hide GPT output",
    chatgptProcessing: "ChatGPT-4 Processing...",
    chatgptError: "ChatGPT-4 Error:"
  },
  
  // ChatGPT specific
  chatGPT: {
    error: "ChatGPT-4 Error:",
    failedToConnect: "Failed to connect to ChatGPT-4 service. Please try again later.",
    failedToDecode: "Failed to decode image with ChatGPT-4"
  },
  
  // Feedback section
  feedback: {
    subject: "Feedback on Morse Code Image Recognition",
    emailBody: `Hi there,

I used the Morse Code Image Decoder and wanted to provide feedback:

Original Image: [describe the image you uploaded]
Expected Morse Code: [what the morse code should be]
Actual OCR Result: [what the system detected]
Expected Decoded Text: [what the text should say]

Additional comments:

Thanks!`
  },
  
  // Error messages
  errors: {
    invalidFileType: "Please upload an image file (PNG, JPG, JPEG, GIF, BMP, etc.)",
    fileTooLarge: "File size must be less than 10MB. Large images will be automatically compressed for faster processing.",
    fileTooBig: "File size exceeds 10MB limit",
    unsupportedFormat: "Unsupported image format",
    processingError: "Error processing image file",
    ocrError: "OCR processing failed",
    uploadError: "Error uploading file",
    aiError: "AI analysis failed",
    imageCompressionFailed: "Image compression failed",
    failedToLoadImage: "Failed to load image for compression",
    ocrProcessingFailed: "OCR processing failed.",
    httpError: "HTTP error! status:",
    timeout: "Processing timeout. Try manual input or a clearer image.",
    networkError: "Network error loading OCR engine. Check your connection or use manual input.",
    memoryError: "Image processing failed. Try:\n\n• Use manual input below\n• Try a smaller image file\n• Use a clearer image with better contrast",
    generalError: "Please try:\n\n• Manual input below\n• Different image\n• Better lighting/contrast in photo",
    noMorseDetected: "No Morse code patterns detected - try manual input",
    ocrFailedManualAvailable: "OCR failed - manual input available",
    recognitionFailedMessage: "Recognition failed. Try manual input below or use a clearer image with better contrast.",
    
    // Timeout and performance messages
    timeoutLongerForLarge: "• This may take longer for large images",
    compressionNote: "Image compressed from {originalSize}MB to {compressedSize}MB",
    compressionWarning: "Large file detected ({fileSize}MB) - will be compressed for better OCR performance",
    
    // Alert messages
    ocrProcessingFailed: "OCR processing failed.",
    timeoutMessage: "Processing took longer than expected (>{timeoutSeconds}s). Try these solutions:\n\n• Use manual input below (recommended)\n• Try a smaller/lower resolution image\n• Crop the image to focus on Morse code area\n• Ensure good contrast (black text on white background)",
    networkErrorMessage: "Network error loading OCR engine. Check your connection or use manual input.",
    imageProcessingFailed: "Image processing failed. Try:\n\n• Use manual input below\n• Try a smaller image file\n• Use PNG format instead of JPEG",
    unexpectedError: "Unexpected error. Please try manual input below."
  },
  
  // Instructions section
  instructions: {
    title: "How to Use Image Morse Code Decoder",
    step1: {
      title: "Upload Image",
      description: "Select a clear image containing Morse code patterns. Best results with high contrast images."
    },
    step2: {
      title: "Automatic OCR Processing",
      description: "The system automatically scans the image using OCR technology to detect text patterns.",
      userAction: "Click \"Extract Morse Code\" to process the image using OCR technology"
    },
    step3: {
      title: "Morse Code Extraction",
      description: "Advanced algorithms identify and extract Morse code patterns from the detected text."
    },
    step4: {
      title: "Review and Download",
      description: "Review the extracted Morse code and decoded text. Download results or copy to clipboard.",
      userAction: "Copy or download the results for your use"
    },
    tips: {
      title: "Tips for Better Results:",
      tip1: "Use high-contrast images with clear dots and dashes",
      tip2: "Ensure proper lighting and focus in photographs",
      tip3: "Avoid heavily compressed or low-resolution images",
      tip4: "Try the AI assistant for complex or unclear patterns",
      tip5: "Use manual input if OCR results are inaccurate",
      manualInputHelp: "Manual input available: When OCR fails, you can type the Morse code manually while viewing the image"
    }
  },
  
  // File size formatting
  fileSize: {
    bytes: "Bytes",
    kb: "KB",
    mb: "MB",
    gb: "GB"
  },
  
  // SEO content section
  seoContent: {
    title: "Advanced Morse Code Image Recognition",
    description: "Upload images containing Morse code patterns and instantly decode them using advanced OCR and AI technology. Perfect for historical documents, educational materials, and practice exercises.",
    
    // Main sections
    revolutionary: {
      title: "Revolutionary Image Morse Code Translator - Advanced OCR Technology",
      description: "Our state-of-the-art pictures Morse code translator represents a breakthrough in optical character recognition technology, specifically designed to extract and decode Morse code patterns from digital images with unprecedented accuracy. This powerful image morse code translator combines advanced computer vision algorithms with specialized Morse code pattern recognition to transform visual content into readable text messages.",
      capabilities: "Whether you're working with historical telegraph documents, vintage military communications, amateur radio reference materials, or educational content, our cutting-edge tool can accurately convert photos to Morse code and instantly decode the hidden messages within your images. The system supports multiple image formats and provides intelligent preprocessing to enhance recognition accuracy across various image qualities and conditions.",
      comprehensive: "Comprehensive Image Processing Capabilities:",
      
      imageTypes: {
        title: "Image Type Support:",
        scannedDocuments: "Scanned documents: Historical telegrams, training manuals, and reference sheets",
        photographs: "Photographs: Pictures of Morse code charts, handwritten notes, and displays",
        screenshots: "Screenshots: Digital displays, software outputs, and online content",
        handwritten: "Handwritten materials: Personal notes, practice exercises, and study guides",
        printed: "Printed materials: Books, magazines, posters, and educational resources"
      },
      
      applications: {
        title: "Professional Applications:",
        historical: "Historical research: Digitizing vintage telegraph communications and military archives",
        educational: "Educational institutions: Processing textbook exercises and examination materials",
        amateur: "Amateur radio community: Converting printed references and contest logs",
        museum: "Museum collections: Preserving maritime and aviation communication records",
        emergency: "Emergency services: Training material preparation and documentation"
      }
    },
    
    professional: {
      title: "Professional-Grade Image Morse Code Translator - Enhanced Recognition Engine",
      description: "Experience the most sophisticated solution for extracting Morse code from images with our intelligent OCR system powered by advanced machine learning algorithms. Our enhanced recognition engine can process various image formats including PNG, JPEG, GIF, and TIFF files, automatically converting visual Morse patterns into accurate readable text with industry-leading precision rates.",
      capabilities: "The system employs multi-stage processing techniques including image preprocessing, noise reduction, character segmentation, and pattern matching to ensure optimal results across diverse image conditions. From low-resolution historical photographs to high-definition scanned documents, our picture morse code decoder tool adapts to deliver consistent performance regardless of source material quality.",
      
      features: {
        ocrTitle: "Advanced OCR Features",
        ocrItems: [
          "Intelligent character recognition with 95%+ accuracy",
          "Automatic dot and dash distinction algorithms",
          "Smart spacing detection for word boundaries",
          "Noise filtering and image enhancement",
          "Multi-language OCR engine support",
          "Real-time processing progress tracking"
        ],
        
        optimizationTitle: "Image Quality Optimization",
        optimizationItems: [
          "Automatic contrast and brightness adjustment",
          "Perspective correction for skewed images",
          "Background noise removal and isolation",
          "Edge detection and character boundary identification",
          "Resolution enhancement for low-quality images",
          "Color space conversion and grayscale optimization"
        ],
        
        outputTitle: "Output & Integration",
        outputItems: [
          "Instant text conversion and validation",
          "Multiple export formats (TXT, CSV, JSON)",
          "Copy-to-clipboard functionality",
          "Downloadable results with timestamps",
          "Error detection and correction suggestions",
          "Manual input backup for edge cases"
        ]
      }
    },
    
    industry: {
      title: "Industry Applications and Use Case Scenarios",
      description: "Our comprehensive image morse code decipher serves diverse professional communities and educational institutions worldwide. From maritime heritage preservation to emergency communication training, this versatile tool addresses real-world challenges in historical documentation, educational assessment, and professional communication analysis. For quick text conversion, use our morse translator tool.",
      
      research: {
        title: "Research & Academic Applications",
        historical: {
          title: "Historical Document Analysis",
          description: "Digitize and preserve vintage telegraph communications, wartime messages, and maritime logbooks with automated transcription capabilities."
        },
        educational: {
          title: "Educational Assessment",
          description: "Process student exercises, exam materials, and training documentation for efficient grading and feedback systems."
        }
      },
      
      professional: {
        title: "Professional & Technical Applications",
        emergency: {
          title: "Emergency Communications",
          description: "Analyze and document emergency transmissions, training scenarios, and disaster communication protocols."
        },
        amateur: {
          title: "Amateur Radio Operations",
          description: "Convert contest logs, reference materials, and technical documentation for digital archiving and analysis."
        }
      },
      
      conclusion: "Whether you're a historian working with archival materials, an educator preparing course content, or a radio enthusiast digitizing reference materials, our image-based Morse code translator provides the accuracy, reliability, and efficiency needed for professional-grade results. The system's robust error handling and manual input fallback ensure successful processing even with challenging source materials."
    },
    
    technical: {
      title: "Technical Specifications and Performance Optimization",
      description: "Built on cutting-edge OCR technology with specialized Morse code recognition algorithms, our system delivers enterprise-level performance with consumer-friendly accessibility. The underlying architecture combines Tesseract.js OCR engine with custom pattern recognition models specifically trained on Morse code character sets and formatting conventions.",
      
      stats: {
        accuracy: "95%+",
        accuracyLabel: "Recognition Accuracy",
        fileSize: "10MB",
        fileSizeLabel: "Maximum File Size",
        formats: "5+",
        formatsLabel: "Supported Formats"
      },
      
      performance: {
        title: "Performance Features:",
        items: [
          "Client-side processing for enhanced privacy and security",
          "No server uploads required - all processing happens locally",
          "Progressive loading with real-time status updates",
          "Automatic timeout handling for large file processing",
          "Memory-efficient algorithms for mobile device compatibility",
          "Cross-browser compatibility with modern web standards"
        ]
      },
      
      quality: {
        title: "Quality Assurance:",
        items: [
          "Multiple validation stages for accuracy verification",
          "Confidence scoring for each recognized character",
          "Automatic error detection and correction suggestions",
          "Manual override capability for edge cases",
          "Raw OCR output display for debugging purposes",
          "Comprehensive error logging and diagnostics"
        ]
      }
    },
    
    instructions: {
      title: "How to Use Image Morse Decoder",
      step1: "Upload an image file containing Morse code patterns (dots and dashes)",
      step3: "View the extracted Morse code and its decoded text translation",
      
      tips: {
        title: "Tips for Better Results",
        items: [
          "Use clear, high-contrast images with distinct dots and dashes",
          "Ensure Morse code symbols are well-separated and readable",
          "Avoid overly complex backgrounds or decorative elements",
          "Images with black text on white background work best",
          "Try different image formats if OCR fails (PNG works better than JPEG for text)",
          "Check the \"Raw OCR Text\" to see what the system actually recognized",
          "Manual correction may be needed for complex or low-quality images"
        ]
      },
      
      troubleshooting: {
        title: "Troubleshooting OCR Issues",
        ocrLoadingFails: "OCR engine loading fails: Try refreshing the page or use the manual input option",
        processingTimeout: "Processing timeout: Use a smaller image or switch to manual input for faster results",
        noTextRecognized: "No text recognized: Ensure the image contains clear text-based Morse code, or use manual input",
        wrongCharacters: "Wrong characters detected: The system converts similar characters automatically (| → ., O → -, etc.)",
        mixedResults: "Mixed results: Check the raw OCR text or use manual input for better accuracy"
      }
    },
    
    features: {
      title: "Recognition Features:",
      items: [
        "Advanced OCR technology for accurate text recognition",
        "AI-powered ChatGPT-4 integration for enhanced detection",
        "Support for multiple image formats (PNG, JPG, GIF, BMP)",
        "Automatic image compression for optimal processing",
        "Manual input option for difficult images",
        "Real-time processing with progress indicators"
      ]
    },
    
    capabilities: {
      title: "Processing Capabilities:",
      items: [
        "Handles various lighting conditions and image quality",
        "Recognizes handwritten and printed Morse code",
        "Processes historical documents and photographs",
        "Supports large image files with automatic compression",
        "Error handling with fallback options",
        "Raw OCR text debugging for troubleshooting"
      ]
    },
    
    useCases: {
      title: "Use Cases:",
      items: [
        "Historical telegraph document analysis",
        "Educational Morse code learning materials",
        "Amateur radio practice and training",
        "Military and emergency communication archives",
        "Museum and library document digitization",
        "Personal hobby and collection projects"
      ]
    },
    
    technology: {
      title: "Technology:",
      description: "Our image decoder combines powerful OCR (Optical Character Recognition) with AI-enhanced pattern recognition to accurately identify Morse code patterns in photographs, scanned documents, and digital images."
    }
  }
};