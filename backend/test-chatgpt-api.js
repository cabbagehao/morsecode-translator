#!/usr/bin/env node

/**
 * Test script for ChatGPT-4 decode API endpoint
 * This will help us debug the 500 error by making a controlled request
 */

async function testChatGPTAPI() {
  console.log('Testing ChatGPT-4 decode API...');
  
  // Simple 1x1 pixel PNG in base64
  const testImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  
  const requestBody = {
    image: testImage,
    imageType: 'image/png'
  };
  
  try {
    console.log('Making request to Worker...');
    console.log('Request body size:', JSON.stringify(requestBody).length);
    
    const response = await fetch('https://morse-coder-worker.yhc2073.workers.dev/api/chatgpt-decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body length:', responseText.length);
    console.log('Response body:', responseText);
    
    if (responseText) {
      try {
        const jsonResponse = JSON.parse(responseText);
        console.log('Parsed JSON response:', JSON.stringify(jsonResponse, null, 2));
      } catch (parseError) {
        console.log('Failed to parse response as JSON:', parseError.message);
      }
    }
    
  } catch (error) {
    console.error('Request failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testChatGPTAPI().catch(console.error);