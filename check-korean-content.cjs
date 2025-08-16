const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5176,
  path: '/ko/decoders/decode-audio',
  method: 'GET'
};

console.log('Testing Korean page content...');

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Check for English words that should be translated
    const englishWords = [
      'Settings', 'Upload', 'Analysis', 'Frequency', 
      'Processing', 'Confidence', 'Audio File', 
      'Dot Threshold', 'Dash Threshold', 'Fast Morse',
      'Standard', 'Slow Morse', 'Noise Floor'
    ];
    
    const foundEnglish = [];
    
    englishWords.forEach(word => {
      if (data.includes(word)) {
        foundEnglish.push(word);
      }
    });
    
    console.log('\n=== Korean Page Content Check ===');
    if (foundEnglish.length > 0) {
      console.log('❌ Found English words that should be Korean:');
      foundEnglish.forEach(word => console.log(`  - ${word}`));
    } else {
      console.log('✅ No problematic English words found in Korean page');
    }
    
    // Check for Korean content
    const hasKorean = /[가-힣]/.test(data);
    console.log(`Korean characters detected: ${hasKorean ? '✅ Yes' : '❌ No'}`);
    
    if (hasKorean) {
      const koreanMatches = data.match(/[가-힣][가-힣\s]*[가-힣]/g);
      if (koreanMatches) {
        console.log('\n✅ Sample Korean content found:');
        koreanMatches.slice(0, 5).forEach(match => {
          console.log(`  - ${match.trim()}`);
        });
      }
    }
  });
});

req.on('error', (err) => {
  console.error('Error testing page:', err.message);
});

req.end();