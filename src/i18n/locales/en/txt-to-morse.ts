export const txtToMorse = {
  title: "Text File Morse Code translator – Convert text file to morse",
  description: "Convert text file to Morse code with audio playback, visual flash, and download options. Batch processing for documents with sound generation.",
  
  mainHeading: "Text File to Morse Code Converter",
  subtitle: "Upload text files and convert them to Morse code with audio playback and download options",
  
  uploadSection: {
    title: "Upload Text File",
    dragAndDrop: "Drag and drop a text file here, or click to select",
    supportedFormats: "Supports TXT and other text formats (Max 5MB)",
    selectFile: "Select Text File",
    removeFile: "Remove file",
    removing: "Removing...",
    processing: "Processing file...",
    analyzing: "Analyzing text..."
  },
  
  fileInfo: {
    fileName: "File Name",
    fileSize: "File Size",
    wordsCount: "Words",
    charactersCount: "Characters"
  },
  
  controls: {
    playMorse: "Play Morse Code",
    pause: "Pause",
    resume: "Resume",
    preparingAudio: "Preparing audio...",
    repeatMode: "Repeat Mode",
    repeatModeOn: "Repeat Mode On",
    repeatModeOff: "Repeat Mode Off",
    audioSettings: "Audio Settings",
    copyToClipboard: "Copy to clipboard",
    downloadOptions: "Download options",
    copiedToClipboard: "Copied to clipboard!"
  },
  
  results: {
    title: "Conversion Results",
    originalText: "Original Text",
    morseCode: "Morse Code",
    downloadText: "Download Text (.txt)",
    downloadMorse: "Download Morse (.txt)",
    downloadAudio: "Download Audio (.wav)",
    noContent: "No content to display",
    processingComplete: "Processing complete!"
  },
  
  instructions: {
    title: "How to Use Text File to Morse Converter",
    step1: {
      title: "Upload Text File",
      description: "Select a text file (.txt format recommended) containing the content you want to convert to Morse code."
    },
    step2: {
      title: "Automatic Conversion",
      description: "The system automatically converts your text to Morse code and provides audio playback capabilities."
    },
    step3: {
      title: "Audio Playback",
      description: "Listen to the Morse code with customizable audio settings including frequency, speed, and repeat mode."
    },
    step4: {
      title: "Download Results",
      description: "Download the original text, Morse code, or generated audio file for offline use and sharing."
    },
    tips: {
      title: "Tips for Best Results:",
      tip1: "Use plain text files for best compatibility",
      tip2: "Keep file size under 5MB for optimal performance",
      tip3: "Adjust audio settings for comfortable listening",
      tip4: "Use repeat mode for Morse code practice",
      tip5: "Download audio files for portable Morse training"
    }
  },
  
  errors: {
    fileTooBig: "File size exceeds 5MB limit",
    unsupportedFormat: "Unsupported file format",
    processingError: "Error processing text file",
    uploadError: "Error uploading file",
    conversionError: "Error converting to Morse code"
  }
};