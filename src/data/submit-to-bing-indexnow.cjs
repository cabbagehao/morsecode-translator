#!/usr/bin/env node

const https = require('https');

// IndexNow configuration
const config = {
  host: "morse-coder.com",
  key: "c9bb7ae282e6406c9063184238dc2bf8",
  keyLocation: "https://morse-coder.com/c9bb7ae282e6406c9063184238dc2bf8.txt",
  urlList: [
    "https://morse-coder.com",
    "https://morse-coder.com/ko",
    "https://morse-coder.com/es", 
    "https://morse-coder.com/ru",
    "https://morse-coder.com/learn",
    "https://morse-coder.com/learn/basic-and-tips",
    "https://morse-coder.com/learn/history",
    "https://morse-coder.com/sheet",
    "https://morse-coder.com/sheet/morse-code-sheet",
    "https://morse-coder.com/sheet/common-abbr",
    "https://morse-coder.com/sheet/common-words",
    "https://morse-coder.com/sheet/common-phrases",
    "https://morse-coder.com/sheet/morse-code-alphabet",
    "https://morse-coder.com/sheet/morse-code-numbers",
    "https://morse-coder.com/decoders/txt-to-morse",
    "https://morse-coder.com/decoders/decode-text",
    "https://morse-coder.com/decoders/decode-image",
    "https://morse-coder.com/decoders/decode-audio",
    "https://morse-coder.com/decoders/decode-audio/morse-code-sound",
    "https://morse-coder.com/privacy-policy",
    "https://morse-coder.com/feedback"
  ]
};

// Prepare the request data
const postData = JSON.stringify(config);

// Configure the HTTPS request
const options = {
  hostname: 'api.indexnow.org',
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🚀 Submitting URLs to Bing IndexNow...');
console.log(`📊 Submitting ${config.urlList.length} URLs for indexing`);
console.log(`🔗 Host: ${config.host}`);
console.log(`🔑 Key: ${config.key}`);
console.log('\n📋 URLs being submitted:');
config.urlList.forEach((url, index) => {
  console.log(`  ${index + 1}. ${url}`);
});
console.log('\n⏳ Sending request...\n');

// Make the request
const req = https.request(options, (res) => {
  console.log(`📈 Response Status: ${res.statusCode} ${res.statusMessage}`);
  console.log('📝 Response Headers:');
  Object.entries(res.headers).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  
  let responseBody = '';
  
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📄 Response Body:');
    if (responseBody.trim()) {
      try {
        const jsonResponse = JSON.parse(responseBody);
        console.log(JSON.stringify(jsonResponse, null, 2));
      } catch (e) {
        console.log(responseBody);
      }
    } else {
      console.log('(Empty response body)');
    }
    
    // Interpret the response
    console.log('\n🎯 Result Interpretation:');
    if (res.statusCode === 200) {
      console.log('✅ SUCCESS: URLs successfully submitted to Bing IndexNow');
      console.log('🔍 Bing will crawl and index these URLs in the coming days');
    } else if (res.statusCode === 202) {
      console.log('✅ ACCEPTED: URLs accepted for processing');
      console.log('🔍 Bing will process these URLs shortly');
    } else if (res.statusCode === 400) {
      console.log('❌ BAD REQUEST: Invalid request format or parameters');
    } else if (res.statusCode === 403) {
      console.log('❌ FORBIDDEN: Key verification failed or quota exceeded');
      console.log('💡 Make sure the key file exists at:', config.keyLocation);
    } else if (res.statusCode === 422) {
      console.log('❌ UNPROCESSABLE: Invalid URLs or host mismatch');
    } else {
      console.log(`❓ UNKNOWN: Status ${res.statusCode} - Check Bing IndexNow documentation`);
    }
  });
});

// Handle request errors
req.on('error', (err) => {
  console.error('❌ Request Error:', err.message);
  console.error('🔧 Please check your internet connection and try again');
});

// Send the request
req.write(postData);
req.end();

// Also log the raw request for debugging
console.log('🔍 Raw Request Data:');
console.log(JSON.stringify(config, null, 2));