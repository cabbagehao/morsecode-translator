export const decodeImage = {
  title: "Morse Code Image Translator – decode picture, photo, image",
  description: "Decode Morse code from images using advanced OCR technology. Extract dots and dashes from photos, scanned documents, and visual signals instantly.",
  
  mainHeading: "Morse Code Image Decoder",
  subtitle: "Extract Morse code from photos and images using advanced OCR technology",
  
  uploadSection: {
    title: "Upload Image File",
    dragAndDrop: "Click to upload or drag & drop",
    supportedFormats: "Supports JPG, PNG, GIF, WebP and other image formats (Max 10MB)",
    selectFile: "Select Image File",
    removeFile: "Remove file",
    processing: "Processing image...",
    analyzing: "Analyzing image..."
  },
  
  imagePreview: {
    show: "Show image preview",
    hide: "Hide image preview",
    togglePreview: "Toggle image preview"
  },
  
  processing: {
    status: "Processing Status",
    ocrProcessing: "OCR Processing...",
    extractingMorse: "Extracting Morse patterns...",
    analyzingText: "Analyzing text...",
    progress: "Progress"
  },
  
  results: {
    title: "Extraction Results", 
    extractedMorse: "Extracted Morse Code",
    decodedText: "Decoded Text",
    rawOcrText: "Raw OCR Text",
    showRawText: "Show raw OCR text",
    hideRawText: "Hide raw OCR text",
    noResults: "No Morse code detected in the image",
    tryDifferent: "Try a different image or adjust the image quality",
    copyMorse: "Copy Morse code",
    downloadMorse: "Download Morse code", 
    copyText: "Copy decoded text",
    downloadText: "Download decoded text",
    downloadOptions: "Download options",
    copiedToClipboard: "Copied to clipboard!"
  },
  
  manualInput: {
    title: "Manual Morse Code Input",
    description: "If OCR didn't detect correctly, you can manually enter the Morse code:",
    placeholder: "Enter Morse code manually (dots and dashes)",
    showInput: "Show manual input",
    hideInput: "Hide manual input",
    process: "Process Manual Input"
  },
  
  aiAssistant: {
    title: "AI Assistant Analysis",
    description: "Use AI to help extract Morse code patterns that OCR might miss:",
    analyze: "Analyze with AI",
    analyzing: "AI is analyzing the image...", 
    showOutput: "Show AI analysis",
    hideOutput: "Hide AI analysis",
    error: "AI analysis failed. Please try again later."
  },
  
  instructions: {
    title: "How to Use Image Morse Code Decoder",
    step1: {
      title: "Upload Image",
      description: "Select a clear image containing Morse code patterns. Best results with high contrast images."
    },
    step2: {
      title: "Automatic OCR Processing",
      description: "The system automatically scans the image using OCR technology to detect text patterns."
    },
    step3: {
      title: "Morse Code Extraction", 
      description: "Advanced algorithms identify and extract Morse code patterns from the detected text."
    },
    step4: {
      title: "Review and Download",
      description: "Review the extracted Morse code and decoded text. Download results or copy to clipboard."
    },
    tips: {
      title: "Tips for Better Results:",
      tip1: "Use high-contrast images with clear dots and dashes",
      tip2: "Ensure proper lighting and focus in photographs",
      tip3: "Avoid heavily compressed or low-resolution images",
      tip4: "Try the AI assistant for complex or unclear patterns",
      tip5: "Use manual input if OCR results are inaccurate"
    }
  },
  
  errors: {
    fileTooBig: "File size exceeds 10MB limit",
    unsupportedFormat: "Unsupported image format",
    processingError: "Error processing image file",
    ocrError: "OCR processing failed",
    uploadError: "Error uploading file",
    aiError: "AI analysis failed"
  }
};