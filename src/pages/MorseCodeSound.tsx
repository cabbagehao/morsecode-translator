import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Play, Pause, Volume2, VolumeX, Download, Settings, ChevronDown, Edit, ExternalLink, ArrowLeft } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface SoundSettings {
  frequency: number;
  dotDuration: number;
  dashDuration: number;
  pauseDuration: number;
  volume: number;
  waveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
}

interface QAItem {
  question: string;
  answer: string;
}

function MorseCodeSound() {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<string>('');
  const [settings, setSettings] = useState<SoundSettings>({
    frequency: 600,
    dotDuration: 100,
    dashDuration: 300,
    pauseDuration: 100,
    volume: 0.5,
    waveform: 'sine'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [expandedQA, setExpandedQA] = useState<number | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentOscillatorRef = useRef<OscillatorNode | null>(null);
  const currentGainRef = useRef<GainNode | null>(null);

  // Initialize audio context
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudioContext, { once: true });
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTone = useCallback((duration: number) => {
    return new Promise<void>((resolve) => {
      if (!audioContextRef.current) {
        resolve();
        return;
      }

      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = settings.waveform;
      oscillator.frequency.setValueAtTime(settings.frequency, context.currentTime);

      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(settings.volume, context.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration / 1000 - 0.01);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      currentOscillatorRef.current = oscillator;
      currentGainRef.current = gainNode;

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration / 1000);

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }, [settings]);

  const playPause = useCallback((duration: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }, []);

  const stopSound = useCallback(() => {
    if (currentOscillatorRef.current) {
      try {
        currentOscillatorRef.current.stop();
        currentOscillatorRef.current = null;
      } catch (e) {
        // Oscillator might already be stopped
      }
    }
    if (currentGainRef.current) {
      currentGainRef.current = null;
    }
    setIsPlaying(false);
    setCurrentSound('');
  }, []);

  const playMorseCode = useCallback(async (morse: string, description: string) => {
    // If clicking the same sound that's currently playing, stop it
    if (isPlaying && currentSound === description) {
      stopSound();
      return;
    }

    // If another sound is playing, stop it first
    if (isPlaying) {
      stopSound();
      // Give a small delay to ensure the previous sound is stopped
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setIsPlaying(true);
    setCurrentSound(description);

    let shouldContinue = true;

    try {
      for (let i = 0; i < morse.length && shouldContinue; i++) {
        const char = morse[i];
        if (char === '.') {
          await playTone(settings.dotDuration);
        } else if (char === '-') {
          await playTone(settings.dashDuration);
        } else if (char === ' ') {
          await playPause(settings.pauseDuration * 3);
        }

        if (i < morse.length - 1 && morse[i + 1] !== ' ') {
          await playPause(settings.pauseDuration);
        }
      }
    } catch (error) {
      console.error('Error playing morse code:', error);
    } finally {
      // Only reset if this is still the current sound
      setIsPlaying(false);
      setCurrentSound('');
    }
  }, [isPlaying, currentSound, settings, playTone, playPause, stopSound]);

  const downloadMorseAudio = useCallback(async (morse: string, filename: string) => {
    if (!audioContextRef.current) return;

    // Create offline audio context for rendering
    const sampleRate = 44100;
    const totalDuration = morse.split('').reduce((acc, char) => {
      if (char === '.') return acc + settings.dotDuration + settings.pauseDuration;
      if (char === '-') return acc + settings.dashDuration + settings.pauseDuration;
      if (char === ' ') return acc + settings.pauseDuration * 3;
      return acc;
    }, 0);

    const offlineContext = new OfflineAudioContext(1, sampleRate * (totalDuration / 1000), sampleRate);
    let currentTime = 0;

    for (const char of morse) {
      if (char === '.' || char === '-') {
        const duration = char === '.' ? settings.dotDuration : settings.dashDuration;
        const oscillator = offlineContext.createOscillator();
        const gainNode = offlineContext.createGain();

        oscillator.type = settings.waveform;
        oscillator.frequency.setValueAtTime(settings.frequency, currentTime / 1000);

        gainNode.gain.setValueAtTime(0, currentTime / 1000);
        gainNode.gain.linearRampToValueAtTime(settings.volume, (currentTime + 10) / 1000);
        gainNode.gain.exponentialRampToValueAtTime(0.01, (currentTime + duration - 10) / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(offlineContext.destination);

        oscillator.start(currentTime / 1000);
        oscillator.stop((currentTime + duration) / 1000);

        currentTime += duration + settings.pauseDuration;
      } else if (char === ' ') {
        currentTime += settings.pauseDuration * 3;
      }
    }

    try {
      const audioBuffer = await offlineContext.startRendering();
      const wav = audioBufferToWav(audioBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-morse-code.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  }, [settings]);

  // Convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const sampleRate = buffer.sampleRate;
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // Convert samples
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
    
    return arrayBuffer;
  };

  const morseExamples = [
    { text: 'SOS', morse: '... --- ...', description: 'SOS Emergency Signal' },
    { text: 'HELLO', morse: '.... . .-.. .-.. ---', description: 'Hello Greeting' },
    { text: 'MORSE', morse: '-- --- .-. ... .', description: 'Morse Word' },
    { text: 'BEEP', morse: '-... . . .---.', description: 'Beep Sound' },
    { text: 'SOUND', morse: '... --- ..- -. -.', description: 'Sound Word' },
    { text: 'HELP', morse: '.... . .-.. .--.', description: 'Help Signal' }
  ];

  const qaItems: QAItem[] = [
    {
      question: "What does morse code sound like?",
      answer: "Morse code sounds like a series of short and long beeps or tones.\n\nShort beeps (dots) are quick 'dit' sounds, while long beeps (dashes) are longer 'dah' sounds. The classic morse code beep sound is typically around 600Hz frequency and follows a 1:3 ratio where dashes are three times longer than dots."
    },
    {
      question: "How do I recognize morse code beep patterns?",
      answer: "Morse code beep sounds follow specific patterns:\n\n• Dots are quick beeps\n• Dashes are longer beeps (3x dot length)\n• Spaces between elements within a letter are short\n• Spaces between letters are longer (3x dot length)\n• Spaces between words are the longest (7x dot length)\n\nListen for the rhythm and timing to decode the message."
    },
    {
      question: "What frequency should morse code sound effects use?",
      answer: "Traditional morse code sound effects typically use frequencies between 400Hz to 1200Hz, with 600Hz being the most common.\n\nThis frequency range is easily audible to human ears and cuts through background noise effectively. Amateur radio operators often use 600-800Hz for optimal clarity."
    },
    {
      question: "Can I download morse code beep sound files?",
      answer: "Yes! You can generate and download custom morse code sound files using our tool above.\n\nSimply enter your text, adjust the sound settings like frequency and timing, then click the download button to save the morse code beep sound as a WAV audio file."
    },
    {
      question: "What makes a good morse code sound effect (SFX)?",
      answer: "A good morse code SFX should have:\n\n• Clear tone frequency (600-800Hz)\n• Proper timing ratios (dash = 3x dot duration)\n• Clean attack and decay without clicks\n• Appropriate volume levels\n• Consistent frequency throughout\n\nThe sound should be easily distinguishable from background noise."
    },
    {
      question: "How is SOS morse code sound different from other signals?",
      answer: "SOS morse code sound (... --- ...) has a distinctive pattern:\n\nThree short beeps, three long beeps, three short beeps, with no spaces between letters. This creates a memorable 'dit-dit-dit-dah-dah-dah-dit-dit-dit' sound that's internationally recognized as an emergency distress signal."
    },
    {
      question: "What are the standard morse code sound timing rules?",
      answer: "Standard morse code sound timing follows these rules:\n\n• Dot duration = 1 unit\n• Dash duration = 3 units\n• Pause between dots/dashes in same letter = 1 unit\n• Pause between letters = 3 units\n• Pause between words = 7 units\n\nThis creates the characteristic rhythm that makes morse code recognizable."
    },
    {
      question: "How can I practice listening to morse code sounds?",
      answer: "Practice with our interactive morse code sound player above.\n\nStart with individual letters, then common words like SOS, HELLO, and MORSE. Gradually increase speed as you improve.\n\nFocus on recognizing the rhythm and patterns rather than counting dots and dashes. Regular practice with varied content helps develop morse code listening skills."
    }
  ];

  return (
    <Layout
      title={t('morseCodeSound.title')}
      description={t('morseCodeSound.description')}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <a 
            href="/decoders/decode-audio"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Audio Decoder</span>
          </a>
        </div>

        <header className="text-center mb-4 sm:mb-6 md:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-2">
            Morse Code Sound Player
          </h1>
          <p className="text-sm sm:text-base md:text-sm lg:text-lg text-gray-600 dark:text-gray-400">
            Experience authentic morse code beep sounds and audio effects
          </p>
        </header>

        <div className="space-y-6">
          {/* Sound Player Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Common Morse Code Sounds</h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Audio Settings
              </button>
            </div>

            {/* Audio Settings */}
            {showSettings && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Sound Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Frequency (Hz)
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="1200"
                      step="50"
                      value={settings.frequency}
                      onChange={(e) => setSettings(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">{settings.frequency}Hz</span>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Dot Duration (ms)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={settings.dotDuration}
                      onChange={(e) => setSettings(prev => ({ ...prev, dotDuration: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">{settings.dotDuration}ms</span>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Volume
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.volume}
                      onChange={(e) => setSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">{Math.round(settings.volume * 100)}%</span>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Waveform
                    </label>
                    <select
                      value={settings.waveform}
                      onChange={(e) => setSettings(prev => ({ ...prev, waveform: e.target.value as any }))}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="sine">Sine</option>
                      <option value="square">Square</option>
                      <option value="sawtooth">Sawtooth</option>
                      <option value="triangle">Triangle</option>
                    </select>
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Dash Duration: {settings.dotDuration * 3}ms | Pause Duration: {settings.pauseDuration}ms
                </div>
              </div>
            )}

            {/* Morse Code Examples */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {morseExamples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{example.text}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{example.morse}</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => playMorseCode(example.morse, example.description)}
                        className={`flex items-center justify-center w-8 h-8 text-white rounded-full transition-colors ${
                          isPlaying && currentSound === example.description
                            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        title={isPlaying && currentSound === example.description ? 'Stop' : 'Play'}
                      >
                        {isPlaying && currentSound === example.description ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <button
                        onClick={() => downloadMorseAudio(example.morse, example.text.toLowerCase())}
                        className="flex items-center justify-center w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                        title="Download audio"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Text Input Link */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Create Custom Morse Code Sound</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enter your own text to hear and download as morse code</p>
                    </div>
                  </div>
                  <a
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Try Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Currently Playing */}
            {isPlaying && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-800 dark:text-red-200 font-medium">
                    Now Playing: {currentSound}
                  </span>
                  <button
                    onClick={stopSound}
                    className="ml-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Q&A Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Frequently Asked Questions About Morse Code Sounds
            </h2>
            <div className="space-y-3">
              {qaItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedQA(expandedQA === index ? null : index)}
                    className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedQA === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedQA === index && (
                    <div className="px-4 py-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700 whitespace-pre-line">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 space-y-8 print:hidden">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Authentic Morse Code Beep Sound Experience
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Discover the distinctive world of <strong>morse code sound play</strong> with our comprehensive audio experience. Our interactive <strong>morse code beep sound</strong> generator recreates the authentic audio characteristics of traditional telegraph communications, from the iconic <strong>SOS morse code sound</strong> to everyday communication patterns used by amateur radio operators worldwide. For text conversion, visit our main <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse code translator</a>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Sound Quality Features:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Adjustable frequency range (200Hz - 1200Hz) for optimal clarity</li>
                    <li>• Multiple waveform options (sine, square, sawtooth, triangle)</li>
                    <li>• Precise timing controls following international morse standards</li>
                    <li>• High-quality audio generation and WAV file downloads</li>
                    <li>• Real-time sound synthesis for immediate playback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Applications:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Learn to recognize morse code sound patterns by ear</li>
                    <li>• Practice with emergency signals like SOS morse code</li>
                    <li>• Understand the relationship between visual and audio morse</li>
                    <li>• Generate custom <strong>morse code sound effects</strong> for projects</li>
                    <li>• Study historical communication methods and timing</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Whether you're creating <strong>morse code sfx</strong> for multimedia projects, learning emergency communication protocols, or exploring the fascinating world of radio communications, our morse code sound player provides the authentic audio experience you need for professional and educational applications.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Understanding Morse Code Sound Patterns and Timing
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The characteristic <strong>morse code beep sound</strong> follows precise timing relationships that create its unmistakable rhythm. Each <strong>morse code sound effect</strong> element serves a specific purpose in the communication system, from the sharp "dit" of dots to the sustained "dah" of dashes, creating a language that transcends verbal communication barriers.
              </p>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Standard Timing Relationships:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Dot Duration:</span>
                      <p className="text-gray-700 dark:text-gray-300">1 time unit (base timing)</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Dash Duration:</span>
                      <p className="text-gray-700 dark:text-gray-300">3 time units (3x dot length)</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Element Spacing:</span>
                      <p className="text-gray-700 dark:text-gray-300">1 time unit between dots/dashes</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Letter Spacing:</span>
                      <p className="text-gray-700 dark:text-gray-300">3 time units between letters</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Word Spacing:</span>
                      <p className="text-gray-700 dark:text-gray-300">7 time units between words</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">SOS Pattern:</span>
                      <p className="text-gray-700 dark:text-gray-300">... --- ... (no letter breaks)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MorseCodeSound;