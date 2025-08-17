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
  
  errors: {
    fileTooBig: "File size exceeds 50MB limit",
    unsupportedFormat: "Unsupported audio format",
    processingError: "Error processing audio file",
    analysisError: "Error analyzing audio signals",
    uploadError: "Error uploading file"
  },
  
  seoContent: {
    professionalTechnology: {
      title: "Professional Audio-Based Morse Code Decipher Technology",
      description: "Our advanced **morse audio decoder** system utilizes sophisticated audio signal processing algorithms to automatically detect, analyze, and decode Morse code patterns from recorded audio files. This cutting-edge **Morse code decipher** technology transforms audio signals into readable text, making it an invaluable tool for amateur radio operators, emergency communications specialists, and digital signal processing enthusiasts.",
      mainTranslatorLink: "For basic text conversion, try our main <a href=\"/\" className=\"text-blue-600 dark:text-blue-400 hover:underline\">morse code translator</a>.",
      
      advancedProcessing: {
        title: "Advanced Audio Processing:",
        items: [
          "Real-time frequency analysis and tone detection",
          "Adaptive noise filtering and signal enhancement",
          "Automatic timing calibration for variable speeds",
          "Multi-format audio file support (MP3, WAV, M4A)",
          "Dynamic threshold adjustment for optimal accuracy"
        ]
      },
      
      professionalUseCases: {
        title: "Professional Use Cases:",
        items: [
          "Emergency communication analysis and documentation",
          "Amateur radio contest recording transcription",
          "Historical audio archive digitization",
          "Training material preparation and assessment",
          "Maritime and aviation communication research"
        ]
      },
      
      conclusion: "Whether you're deciphering vintage radio recordings, analyzing emergency transmissions, or processing training materials, our audio-based Morse code decipher provides the accuracy and reliability needed for professional applications."
    }
  },
  
  relatedTools: {
    title: "Related Morse Code Audio Tools",
    soundPlayer: {
      title: "🔊 Morse Code Sound Player",
      description: "Experience authentic morse code beep sounds and audio effects. Listen to SOS signals, download sound files, and learn what morse code sounds like.",
      linkText: "Try Sound Player →"
    },
    mainTranslator: {
      title: "📱 Main Translator",
      description: "Convert text to morse code and vice versa with our main translation tool featuring audio playback and visual flash patterns.",
      linkText: "Go to Translator →"
    }
  },
  
  instructions: {
    title: "How to Use the Morse Audio Decoder",
    steps: [
      {
        number: "1",
        text: "Upload your audio file (MP3, WAV, M4A supported) using drag & drop or file selection"
      },
      {
        number: "2", 
        text: "Adjust frequency range and timing settings to match your recording characteristics"
      },
      {
        number: "3",
        text: "Click 'Analyze Morse Code' to process the audio and extract morse patterns"
      },
      {
        number: "4",
        text: "Review the detected morse code and decoded text results with confidence scores"
      }
    ],
    tips: {
      title: "Tips for Best Results:",
      tip1: "Use clear audio recordings with minimal background noise",
      tip2: "Ensure consistent tone frequency (typically 400-1200 Hz works best)",
      tip3: "Maintain proper timing ratios: dash = 3x dot duration",
      tip4: "Allow adequate spacing between characters and words",
      tip5: "For better accuracy, use audio with bit rates of 128kbps or higher",
      tip6: "If no spaces are detected, enable \"Auto-add spaces\" or adjust separation multipliers",
      tip7: "Character separation multiplier: controls spacing between letters (1.0-5.0)",
      tip8: "Word separation multiplier: controls spacing between words (2.0-10.0)"
    },
    userActions: {
      clickAnalyzeMorseCode: "Click \"Analyze Morse Code\" to extract and decode the signals"
    }
  }
};