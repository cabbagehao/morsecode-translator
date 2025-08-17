export const decodeAudio = {
  title: "Audio Morse Code Translator: Extract Signals from Sound file",
  description: "Decode Morse code from audio files with advanced signal processing. Upload recordings, detect beeps and tones, convert to text automatically.",
  
  mainHeading: "Audio Morse Code Decoder",
  subtitle: "Extract Morse code from audio recordings using advanced signal processing",
  
  uploadSection: {
    title: "Upload Audio File",
    dragAndDrop: "Drag and drop your audio file here, or click to browse",
    supportedFormats: "Supported formats: MP3, WAV, M4A, AAC, OGG",
    maxFileSize: "Maximum file size: 50MB",
    selectFile: "Select Audio File",
    removeFile: "Remove file",
    processing: "Processing...",
    analyzing: "Analyzing audio..."
  },
  
  audioPlayer: {
    play: "Play",
    pause: "Pause", 
    stop: "Stop",
    volume: "Volume",
    currentTime: "Current time",
    duration: "Duration"
  },
  
  analysisSettings: {
    title: "Analysis Settings",
    showSettings: "Show Settings",
    hideSettings: "Hide Settings",
    minFrequency: "Min Frequency",
    maxFrequency: "Max Frequency",
    dotThreshold: "Dot Threshold",
    dashThreshold: "Dash Threshold",
    silenceThreshold: "Silence Threshold", 
    noiseFloor: "Noise Floor",
    charSeparation: "Character Separation",
    wordSeparation: "Word Separation",
    autoAddSpaces: "Auto Add Spaces",
    hz: "Hz",
    seconds: "seconds",
    db: "dB",
    multiplier: "multiplier",
    presets: {
      fastMorse: "Fast Morse",
      standard: "Standard",
      slowMorse: "Slow Morse"
    },
    labels: {
      noiseFloorDb: "Noise Floor (dB)",
      charSeparationMultiplier: "Character Separation Multiplier",
      wordSeparationMultiplier: "Word Separation Multiplier"
    },
    processing: {
      detectingSignalPatterns: "Detecting signal patterns...",
      calculatingOptimalParameters: "Calculating optimal parameters...",
      noClearSignalsDetected: "No clear signals detected - using default settings",
      analysisComplete: "Analysis complete",
      preAnalysisFailed: "Pre-analysis failed - using default settings"
    }
  },
  
  results: {
    title: "Analysis Results",
    detectedMorse: "Detected Morse Code",
    decodedText: "Decoded Text",
    confidence: "Confidence",
    noResults: "No Morse code detected in the audio file",
    tryAdjusting: "Try adjusting the analysis settings for better results",
    copyMorse: "Copy Morse code",
    downloadMorse: "Download Morse code",
    copyText: "Copy decoded text", 
    downloadText: "Download decoded text",
    copiedToClipboard: "Copied to clipboard!",
    segments: "Signal Segments",
    dots: "Dots",
    dashes: "Dashes",
    total: "Total",
    spacesDetected: "Spaces detected",
    recognitionNotAccurate: "Recognition not accurate?",
    helpImproveMessage: "Help us improve by sending feedback via email about the audio source and quality.",
    sendFeedback: "Send Feedback"
  },
  
  instructions: {
    title: "How to Use Audio Morse Code Decoder",
    step1: {
      title: "Upload Audio File",
      description: "Select an audio file containing Morse code signals. Supported formats include MP3, WAV, M4A, AAC, and OGG."
    },
    step2: {
      title: "Adjust Settings (Optional)",
      description: "Fine-tune the analysis parameters based on your audio characteristics. Frequency range and timing thresholds can significantly impact detection accuracy."
    },
    step3: {
      title: "Automatic Processing", 
      description: "The system automatically analyzes the audio using advanced signal processing to detect Morse code patterns and convert them to text."
    },
    step4: {
      title: "Review Results",
      description: "Examine the detected Morse code and decoded text. Use the confidence score to evaluate the accuracy of the detection."
    },
    tips: {
      title: "Tips for Better Results:",
      tip1: "Use high-quality recordings with clear signal-to-noise ratio",
      tip2: "Ensure consistent frequency throughout the recording",
      tip3: "Minimize background noise and interference",
      tip4: "Adjust frequency range to match your signal characteristics",
      tip5: "Fine-tune timing thresholds for different transmission speeds",
      tip6: "If no spaces are detected, enable \"Auto-add spaces\" or adjust separation multipliers"
    },
    userActions: {
      clickAnalyzeMorseCode: "Click \"Analyze Morse Code\" to extract and decode the signals"
    }
  },
  
  errors: {
    fileTooBig: "File size exceeds 50MB limit",
    unsupportedFormat: "Unsupported audio format",
    processingError: "Error processing audio file",
    analysisError: "Error analyzing audio signals",
    uploadError: "Error uploading file"
  }
};