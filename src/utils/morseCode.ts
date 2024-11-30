// Morse code mapping
const morseCodeMap: { [key: string]: string } = {
  'A': '.-',     'B': '-...',   'C': '-.-.', 
  'D': '-..',    'E': '.',      'F': '..-.',
  'G': '--.',    'H': '....',   'I': '..',
  'J': '.---',   'K': '-.-',    'L': '.-..',
  'M': '--',     'N': '-.',     'O': '---',
  'P': '.--.',   'Q': '--.-',   'R': '.-.',
  'S': '...',    'T': '-',      'U': '..-',
  'V': '...-',   'W': '.--',    'X': '-..-',
  'Y': '-.--',   'Z': '--..',   
  '0': '-----',  '1': '.----',  '2': '..---',
  '3': '...--',  '4': '....-',  '5': '.....',
  '6': '-....',  '7': '--...',  '8': '---..',
  '9': '----.',  '.': '.-.-.-', ',': '--..--',
  '?': '..--..', '!': '-.-.--', ' ': '/',
  '/': '-..-.',  '(': '-.--.',  ')': '-.--.-',
  '&': '.-...',  ':': '---...', ';': '-.-.-.',
  '=': '-...-',  '+': '.-.-.',  '-': '-....-',
  '_': '..--.-', '"': '.-..-.',  '$': '...-..-',
  '@': '.--.-.',  '\'': '.----.',
  '\n': '\n'     // Add support for newline
};

// Create reverse mapping for decoding
const reverseMorseCodeMap: { [key: string]: string } = {};
for (const [char, morse] of Object.entries(morseCodeMap)) {
  if (morse !== ' ' && morse !== '\n') { // Skip space and newline
    reverseMorseCodeMap[morse] = char;
  }
}

export const textToMorse = (text: string, showSlash: boolean = true): string => {
  const morseChars = text
    .toUpperCase()
    .split('')
    .map(char => morseCodeMap[char] || char);

  let result = '';
  for (let i = 0; i < morseChars.length; i++) {
    const current = morseChars[i];
    
    if (current === '/') {
      // Handle word separator based on settings
      if (showSlash) {
        result += ' / '; // Add spaces around slash when showing separators
      } else {
        result += ''; // Skip the space character when not showing separators
      }
    } else {
      result += current;
      // Add space after each character except for the last one
      if (i < morseChars.length - 1 && morseChars[i + 1] !== '/') {
        result += '';
      }
    }
  }

  return result.trim();
};

export const morseToText = (morse: string): string => {
  // Split the morse code into individual characters
  const chars = morse.split(/\s+/);
  let result = '';
  let currentWord = '';

  for (const char of chars) {
    if (char === '/') {
      // Add space between words
      if (currentWord) {
        result += currentWord + ' ';
        currentWord = '';
      }
    } else if (char) {
      // Try to decode the morse character
      const decoded = reverseMorseCodeMap[char];
      if (decoded) {
        currentWord += decoded;
      }
    }
  }

  // Add the last word if any
  if (currentWord) {
    result += currentWord;
  }

  return result.trim();
};