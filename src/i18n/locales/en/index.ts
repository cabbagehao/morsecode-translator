import { enBasicAndTips } from './basic-and-tips';
import { enLearn } from './learn';
import { enHistory } from './history';
import { enSheet } from './sheet';
import { enCommonWords } from './common-words';
import { enCommonPhrases } from './common-phrases';
import { enCommonAbbr } from './common-abbr';
import { enMorseCodeSheet } from './morse-code-sheet';
import { enMorseCodeAlphabet } from './morse-code-alphabet';
import { enMorseCodeNumbers } from './morse-code-numbers';
import { decodeText } from './decode-text';
import { decodeAudio } from './decode-audio';
import { decodeImage } from './decode-image';
import { txtToMorse } from './txt-to-morse';
import { translatorBox } from './translator-box';
import { feedback } from './feedback';
import { footer } from './footer';
import { audioSettings } from './audio-settings';

export const en = {
  site: {
    name: "Morse Code Translator",
    title: "Morse Code Translator - Text, Sound, Image & Audio",
    description: "Free Morse code translator with image & audio decoding. Convert text to Morse, extract from images, play sound, flash light & download audio instantly."
  },
  nav: {
    translator: "Translator",
    learn: "Learn",
    sheet: "Sheet", 
    decoders: "Decoders",
    shop: "Shop",
    learnSubItems: {
      basicAndTips: "Basic and Tips",
      history: "History"
    },
    sheetSubItems: {
      morseCodeSheet: "Morse Code Sheet",
      commonAbbr: "Common Abbr",
      commonWords: "Common Words",
      commonPhrases: "Common Phrases",
      morseCodeAlphabet: "Morse Code Alphabet",
      morseCodeNumbers: "Morse Code Numbers"
    },
    decodersSubItems: {
      decodeText: "Decode Text",
      decodeImage: "Decode Image",
      decodeAudio: "Decode Audio",
      textToMorse: "Text To Morse"
    }
  },
  home: {
    title: "Morse Code Translator",
    subtitle: "Translate Morse to English & English to Morse code Instantly",
    textLabel: "Text",
    morseLabel: "Morse Code",
    quickStart: {
      title: "Quick Start Guide - Hands on morse code translater in seconds",
      description: "Get started immediately with our intuitive morse code translator. Whether you need to convert english phrases like \"hello in morse code\" or decode emergency signals received over long distances, our streamlined interface ensures instant results with professional accuracy following Samuel Morse's original system.",
      step1: {
        title: "Type Your Message",
        description: "Enter any input english text or morse code directly into the morse translator boxes"
      },
      step2: {
        title: "Instant Translation", 
        description: "Watch as each morse character appears instantly with dots (•) and dashes (-)"
      },
      step3: {
        title: "Listen & Learn",
        description: "Use audio playback or flashing light patterns to experience authentic electrical signals"
      }
    },
    features: {
      title: "Advanced Features - Beyond Text-Based Morse Code Converter",
      description: "Experience cutting-edge morse code conversion technology that extends far beyond simple text translation. Our comprehensive platform integrates traditional International Morse Code standards with modern AI-powered recognition capabilities, supporting diverse input methods from images to audio files while maintaining perfect compatibility with historical telegraph protocols.",
      imageProcessing: {
        title: "Smart Image Processing",
        description: "Upload photos containing morse patterns and extract text using our",
        linkText: "morse code image decoder"
      },
      audioAnalysis: {
        title: "Audio Signal Analysis", 
        description: "Decode morse code from audio recordings with our",
        linkText: "intelligent audio morse code translator"
      },
      batchProcessing: {
        title: "Batch File Processing",
        description: "Handle large text files with our",
        linkText1: "file-to-morse encoder",
        connector: "and",
        linkText2: "text decoder tools"
      },
      visualSignal: {
        title: "Visual Signal Simulation",
        description: "Experience authentic flashing light patterns that replicate traditional telegraph electrical signals"
      },
      errorResistant: {
        title: "Error-Resistant Translation",
        description: "Intelligent handling of characters that cannot be translated with helpful suggestions and alternatives"
      },
      multiLanguage: {
        title: "Multi-Language Support",
        description: "Convert english and other languages using the complete morse alphabet with international character support"
      }
    },
    technical: {
      title: "How does our morse code translator work?",
      description: "Our comprehensive platform employs multiple sophisticated technologies to handle diverse morse code applications. From traditional text translation to cutting-edge AI-powered image recognition, each tool utilizes specialized algorithms designed for maximum accuracy across different input methods and communication scenarios over long distances.",
      engine: {
        title: "Real-time Character Mapping Engine",
        description: "Each morse character is mapped using the standard system established by Samuel Morse, converting input english into morse code dot-dash sequences with authentic timing intervals"
      },
      ocr: {
        title: "Advanced OCR Pattern Recognition", 
        description: "Our",
        linkText: "image morse code translator",
        description2: "uses machine learning to detect morse patterns from photographs, and convert the morse code to English."
      },
      dsp: {
        title: "Digital Signal Processing",
        description: "The",
        linkText: "audio morse code translator",
        description2: "employs frequency analysis to interpret electrical signals from various sound sources, detecting precise timing patterns"
      },
      education: {
        title: "Educational Content Management",
        description: "Our",
        linkText1: "reference system",
        connector: "and",
        linkText2: "learning platform",
        description2: "provide structured morse alphabet training and historical context"
      }
    },
    training: {
      title: "Professional Training Resources - From Beginner to Expert", 
      description: "Master morse communication through our structured learning environment designed for all skill levels. Whether you're studying for amateur radio certification, exploring historical telegraph methods, or developing emergency communication skills, our educational resources provide comprehensive training in both theory and practical application of morse code principles.",
      modules: {
        title: "Structured Learning Modules:",
        alphabet: "Complete morse alphabet reference with printable charts and timing guides",
        vocabulary: "Progressive skill building through essential vocabulary and communication phrases", 
        abbreviations: "Professional abbreviations and prosigns used in radio communications",
        audio: "Interactive audio training with adjustable speeds and visual feedback through flashing light indicators"
      },
      applications: {
        title: "Real-World Applications:",
        ham: "Amateur radio (HAM) licensing exam preparation and operating procedures",
        emergency: "Maritime and aviation emergency communication protocols for safety applications",
        historical: "Historical telegraph operation and understanding of electrical signals in communication networks", 
        stem: "STEM education applications for teaching problem-solving and pattern recognition skills"
      },
      popular: "Popular Learning Topics: Students frequently explore encoding romantic messages like \"i love you in morse code\", emergency signals such as \"SOS morse code\", and practical phrases like \"hello world morse code\". Our platform accommodates all skill levels while providing guidance for characters that cannot be translated, ensuring comprehensive morse alphabet mastery."
    }
  },
  error: {
    somethingWentWrong: "Something went wrong",
    failedToLoadPage: "Failed to load page component",
    reloadPage: "Reload Page"
  },
  instructions: {
    title: "How to Use the Morse Code Translator",
    step1: {
      title: "Text to Morse Code Translation",
      description: "Type or paste any text in the top input box, or click the random button (🔀) . we supports letters, numbers, and punctuation."
    },
    step2: {
      title: "Morse Code to Text Decoding",
      description: "Enter Morse code in the bottom box using dots (.) and dashes (-). Separate letters with spaces and words with forward slashes (/)."
    },
    step3: {
      title: "Audio Playback & Training",
      description: "Click the play button to hear your Morse code with authentic audio signals. Adjust playback speed, frequency and WPM."
    },
    step4: {
      title: "Visual Light Indicator",
      description: "Watch the visual light indicator flash in sync with audio playback. Perfect for learning the rhythm and timing of Morse code signals."
    },
    step5: {
      title: "Download & Export Options",
      description: "Download your conversions as text files or export Morse code as audio files (WAV/MP3) for offline practice and sharing."
    },
    step6: {
      title: "Professional Settings",
      description: "Access advanced audio settings to customize frequency (200-1000 Hz), playback speed, and WPM for professional training standards."
    },
    tips: {
      title: "💡 Pro Tips for Best Results:",
      tip1: "Morse Code Creator: use the green morse code generator button to create random phrases",
      tip2: "Use the copy button for quick text sharing",
      tip3: "Toggle slash separators for different formatting styles",
      tip4: "Practice with repeat mode for skill development",
      tip5: "Real-time character count for message tracking",
      tip6: "Supports complete alphabet, numbers, and punctuation",
      tip7: "Perfect for amateur radio and emergency communications"
    }
  },
  basicAndTips: enBasicAndTips,
  learn: enLearn,
  history: enHistory,
  sheet: enSheet,
  commonWords: enCommonWords,
  commonPhrases: enCommonPhrases,
  commonAbbr: enCommonAbbr,
  morseCodeSheet: enMorseCodeSheet,
  morseCodeAlphabet: enMorseCodeAlphabet,
  morseCodeNumbers: enMorseCodeNumbers,
  decodeText: decodeText,
  decodeAudio: decodeAudio,
  decodeImage: decodeImage,
  txtToMorse: txtToMorse,
  translatorBox: translatorBox,
  feedback: feedback,
  footer: footer,
  audioSettings: audioSettings
};