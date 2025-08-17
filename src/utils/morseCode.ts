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
  '9': '----.',  
  // 标点符号 (国际标准)
  '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', ':': '---...', ';': '-.-.-.', 
  '(': '-.--.',  ')': '-.--.-', '"': '.-..-.',
  "'": '.----.', '/': '-..-.',  '-': '-....-',
  '_': '..--.-', '@': '.--.-.', '&': '.-...',
  '=': '-...-',  '+': '.-.-.',  '$': '...-..-',
  
  ' ': '/',      // Space character (word separator)
  '\n': '\n'     // Add support for newline
};

// Create reverse mapping for decoding
const reverseMorseCodeMap: { [key: string]: string } = {};
for (const [char, morse] of Object.entries(morseCodeMap)) {
  if (morse !== ' ' && morse !== '\n') { // Skip space and newline
    reverseMorseCodeMap[morse] = char;
  }
}

// 常用摩尔斯电码缩写
export const morseAbbreviations: { [key: string]: string } = {
  'SOS': '... --- ...',           // 国际求救信号
  'CQ': '-.-. --.-',             // 呼叫任何电台
  'QTH': '--.- - ....',           // 你的位置在哪里？
  'QSL': '--.- ... .-..',         // 我确认收到
  'QRZ': '--.- .-. --..',         // 谁在呼叫我？
  'QRT': '--.- .-. -',            // 停止发射
  'QRX': '--.- .-. -..-',         // 请等待
  'QSY': '--.- ... -.--',         // 改变频率
  'QRM': '--.- .-. --',           // 干扰
  'QRN': '--.- .-. -.',           // 天气干扰
  'QSB': '--.- ... -...',         // 信号强度变化
  'QTC': '--.- - -.-.',           // 我有消息要发送
  'QTR': '--.- - .-.',            // 时间是多少？
  'AR': '.- .-.',                 // 结束符
  'AS': '.- ...',                 // 等待
  'K': '-.-',                     // 请发送
  'KN': '-.- -.',                 // 仅限特定电台
  'SK': '... -.-',                // 结束工作
  'BT': '-... -',                 // 分隔符
  'OK': '--- -.-',                // 好的
  'TU': '- ..-',                  // 谢谢
  '73': '--... ...--',            // 最好的祝愿
  '88': '---..- ----..',          // 爱与吻
  'OM': '--- --',                 // 老伙计(Old Man)
  'YL': '-.-- .-..',              // 年轻女士(Young Lady)
  'XYL': '-..- -.-- .-..',        // 妻子(Ex-Young Lady)
  'FB': '..-. -...',              // 很好(Fine Business)
  'HI': '.... ..',                // 笑声
  'ES': '. ...',                  // 和(And)
  'DE': '-.. .',                  // 来自(From)
  'TNX': '- -. -..-',             // 谢谢(Thanks)
  'WX': '.-- -..-',               // 天气(Weather)
  'HR': '.... .-.',               // 这里(Here)
  'UR': '..- .-.',                // 你的(Your)
  'RST': '.-. ... -',             // 信号报告
  'PSE': '.--. ... .',            // 请(Please)
  'CUL': '-.-. ..- .-..',         // 再见(See You Later)
  'BCNU': '-... -.-. -. ..-',     // 再见(Be Seeing You)
  'GM': '--. --',                 // 早上好(Good Morning)
  'GA': '--. .-',                 // 下午好(Good Afternoon)
  'GE': '--. .',                  // 晚上好(Good Evening)
  'GN': '--. -.',                 // 晚安(Good Night)
  'WPM': '.-- .--. --',           // 每分钟字数
  'AGN': '.- --. -.',             // 再次(Again)
  'NIL': '-. .. .-..',            // 无(Nothing)
  'R': '.-.',                     // 收到(Received)
  'C': '-.-.',                    // 是的(Correct)
  'N': '-.',                      // 不(No)
  'IMI': '.. -- ..',              // 重复问号(Repeat?)
  'AA': '.- .-',                  // 所有电台之后(All After)
  'AB': '.- -...',                // 所有电台之前(All Before)
  'WA': '.-- .-',                 // 字之后(Word After)
  'WB': '.-- -...',               // 字之前(Word Before)
  'CFM': '-.-. ..-. --',          // 确认(Confirm)
  'RPT': '.-. .--. -'             // 重复(Repeat)
};

// Common phrases mapping  
export const commonPhrases: { [key: string]: string } = {
  // Greetings & Basic
  'HELLO': '.... . .-.. .-.. ---',
  'GOOD MORNING': '--. --- --- -.. / -- --- .-. -. .. -. --.',
  'GOOD EVENING': '--. --- --- -.. / . ...- . -. .. -. --.',
  'GOOD NIGHT': '--. --- --- -.. / -. .. --. .... -',
  'GOODBYE': '--. --- --- -.. -... -.-- .',
  'SEE YOU': '... . . / -.-- --- ..-',
  'WELCOME': '.-- . .-.. -.-. --- -- .',
  'THANK YOU': '- .... .- -. -.- / -.-- --- ..-',
  'PLEASE': '.--. .-.. . .- ... .',
  'EXCUSE ME': '. -..- -.-. ..- ... . / -- .',
  
  // Emotions & Relationships
  'I LOVE YOU': '.. / .-.. --- ...- . / -.-- --- ..-',
  'MISS YOU': '-- .. ... ... / -.-- --- ..-',
  'HAPPY BIRTHDAY': '.... .- .--. .--. -.-- / -... .. .-. - .... -.. .- -.--',
  'CONGRATULATIONS': '-.-. --- -. --. .-. .- - ..- .-.. .- - .. --- -. ...',
  'I AM SORRY': '.. / .- -- / ... --- .-. .-. -.--',
  'FORGIVE ME': '..-. --- .-. --. .. ...- . / -- .',
  'I CARE ABOUT YOU': '.. / -.-. .- .-. . / .- -... --- ..- - / -.-- --- ..-',
  'BEST WISHES': '-... . ... - / .-- .. ... .... . ...',
  'TAKE CARE': '- .- -.- . / -.-. .- .-. .',
  'BE SAFE': '-... . / ... .- ..-. .',
  
  // Emergency & Important
  'HELP ME': '.... . .-.. .--. / -- .',
  'EMERGENCY': '. -- . .-. --. . -. -.-. -.--',
  'CALL DOCTOR': '-.-. .- .-.. .-.. / -.. --- -.-. - --- .-.',
  'NEED HELP': '-. . . -.. / .... . .-.. .--.',
  'URGENT': '..- .-. --. . -. -',
  'FIRE': '..-. .. .-. .',
  'POLICE': '.--. --- .-.. .. -.-. .',
  'AMBULANCE': '.- -- -... ..- .-.. .- -. -.-. .',
  
  // Daily Communication
  'HOW ARE YOU': '.... --- .-- / .- .-. . / -.-- --- ..-',
  'I AM FINE': '.. / .- -- / ..-. .. -. .',
  'WHAT TIME': '.-- .... .- - / - .. -- .',
  'WHERE ARE YOU': '.-- .... . .-. . / .- .-. . / -.-- --- ..-',
  'SEE YOU LATER': '... . . / -.-- --- ..- / .-.. .- - . .-.',
  'TALK TO YOU LATER': '- .- .-.. -.- / - --- / -.-- --- ..- / .-.. .- - . .-.',
  'HAVE A NICE DAY': '.... .- ...- . / .- / -. .. -.-. . / -.. .- -.--',
  'GOOD LUCK': '--. --- --- -.. / .-.. ..- -.-. -.-',
  'BE CAREFUL': '-... . / -.-. .- .-. . ..-. ..- .-..',
  'DRIVE SAFELY': '-.. .-. .. ...- . / ... .- ..-. . .-.. -.--',
  
  // Questions & Responses
  'YES': '-.-- . ...',
  'NO': '-. ---',
  'MAYBE': '-- .- -.-- -... .',
  'I DO NOT KNOW': '.. / -.. --- / -. --- - / -.- -. --- .--',
  'I UNDERSTAND': '.. / ..- -. -.. . .-. ... - .- -. -..',
  'I DO NOT UNDERSTAND': '.. / -.. --- / -. --- - / ..- -. -.. . .-. ... - .- -. -..',
  'CAN YOU HELP': '-.-. .- -. / -.-- --- ..- / .... . .-.. .--.',
  'WHAT IS YOUR NAME': '.-- .... .- - / .. ... / -.-- --- ..- .-. / -. .- -- .',
  'MY NAME IS': '-- -.-- / -. .- -- . / .. ...',
  'NICE TO MEET YOU': '-. .. -.-. . / - --- / -- . . - / -.-- --- ..-',
  
  // Weather & Environment
  'BEAUTIFUL DAY': '-... . .- ..- - .. ..-. ..- .-.. / -.. .- -.--',
  'COLD WEATHER': '-.-. --- .-.. -.. / .-- . .- - .... . .-.',
  'HOT WEATHER': '.... --- - / .-- . .- - .... . .-.',
  'SUNNY DAY': '... ..- -. -. -.-- / -.. .- -.--',
  'RAINY DAY': '.-. .- .. -. -.-- / -.. .- -.--',
  
  // Food & Basic Needs
  'I AM HUNGRY': '.. / .- -- / .... ..- -. --. .-. -.--',
  'I AM THIRSTY': '.. / .- -- / - .... .. .-. ... - -.--',
  'GOOD FOOD': '--. --- --- -.. / ..-. --- --- -..',
  'DELICIOUS': '-.. . .-.. .. -.-. .. --- ..- ...',
  'WATER PLEASE': '.-- .- - . .-. / .--. .-.. . .- ... .',
  
  // Travel & Directions
  'WHERE IS': '.-- .... . .-. . / .. ...',
  'HOW FAR': '.... --- .-- / ..-. .- .-.',
  'SAFE JOURNEY': '... .- ..-. . / .--- --- ..- .-. -. . -.--',
  'ARRIVED SAFELY': '.- .-. .-. .. ...- . -.. / ... .- ..-. . .-.. -.--',
  'LOST': '.-.. --- ... -',
  'NEED DIRECTIONS': '-. . . -.. / -.. .. .-. . -.-. - .. --- -. ...',
  
  // Family & Home
  'FAMILY': '..-. .- -- .. .-.. -.--',
  'HOME SWEET HOME': '.... --- -- . / ... .-- . . - / .... --- -- .',
  'MOTHER': '-- --- - .... . .-.',
  'FATHER': '..-. .- - .... . .-.'
};

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
        result += ' '; // Add space for word separation
      }
    } else {
      result += current;
      // Add space after each character except for the last one
      if (i < morseChars.length - 1 && morseChars[i + 1] !== '/') {
        result += ' ';
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
      // Only process valid morse code characters (dots, dashes)
      if (/^[.-]+$/.test(char)) {
        // Try to decode the morse character
        const decoded = reverseMorseCodeMap[char];
        if (decoded) {
          currentWord += decoded;
        }
        // If no match found, just ignore the invalid morse code
      }
      // Ignore invalid characters that are not dots, dashes, or slashes
    }
  }

  // Add the last word if any
  if (currentWord) {
    result += currentWord;
  }

  return result.trim();
};

// Function to validate and highlight morse code input
export const validateMorseCode = (morse: string): { isValid: boolean; invalidChars: string[] } => {
  // Empty string is always valid (no error should be shown)
  if (morse.trim() === '') {
    return { isValid: true, invalidChars: [] };
  }
  
  const validChars = /^[.\-\s/]+$/;
  const isValid = validChars.test(morse);
  const invalidChars: string[] = [];
  
  if (!isValid) {
    const chars = morse.split('');
    chars.forEach(char => {
      if (!/[.\-\s/]/.test(char)) {
        if (!invalidChars.includes(char)) {
          invalidChars.push(char);
        }
      }
    });
  }
  
  return { isValid, invalidChars };
};

// Export the complete morse code map for the sheet page
export const getMorseCodeMap = () => morseCodeMap;