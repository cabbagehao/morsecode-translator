const { spawn, exec } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * SSG Build and Page Testing Script
 * 
 * This script:
 * 1. Runs SSG build (npm run build:ssg)
 * 2. Starts a local server on the dist directory
 * 3. Tests all pages (including multilingual versions) using curl
 * 4. Reports any non-200 responses
 */

const DIST_DIR = path.join(__dirname, '../dist');
const TEST_PORT = 3000;
const SERVER_START_DELAY = 2000; // ms to wait for server startup

// Extract all routes from package.json reactSnap.include
const ROUTES = [
  "/",
  "/ko", "/es", "/ru",
  "/learn", "/learn/basic-and-tips", "/learn/history",
  "/ko/learn", "/ko/learn/basic-and-tips", "/ko/learn/history",
  "/es/learn", "/es/learn/basic-and-tips", "/es/learn/history", 
  "/ru/learn", "/ru/learn/basic-and-tips", "/ru/learn/history",
  "/sheet", "/sheet/morse-code-sheet", "/sheet/common-abbr", "/sheet/common-words",
  "/sheet/common-phrases", "/sheet/morse-code-alphabet", "/sheet/morse-code-numbers",
  "/ko/sheet", "/ko/sheet/morse-code-sheet", "/ko/sheet/common-abbr", "/ko/sheet/common-words",
  "/ko/sheet/common-phrases", "/ko/sheet/morse-code-alphabet", "/ko/sheet/morse-code-numbers",
  "/es/sheet", "/es/sheet/morse-code-sheet", "/es/sheet/common-abbr", "/es/sheet/common-words", 
  "/es/sheet/common-phrases", "/es/sheet/morse-code-alphabet", "/es/sheet/morse-code-numbers",
  "/ru/sheet", "/ru/sheet/morse-code-sheet", "/ru/sheet/common-abbr", "/ru/sheet/common-words",
  "/ru/sheet/common-phrases", "/ru/sheet/morse-code-alphabet", "/ru/sheet/morse-code-numbers",
  "/decoders/txt-to-morse", "/decoders/decode-text", "/decoders/decode-image", 
  "/decoders/decode-audio", "/decoders/decode-audio/morse-code-sound",
  "/ko/decoders/txt-to-morse", "/ko/decoders/decode-text", "/ko/decoders/decode-image",
  "/ko/decoders/decode-audio", "/ko/decoders/decode-audio/morse-code-sound",
  "/es/decoders/txt-to-morse", "/es/decoders/decode-text", "/es/decoders/decode-image",
  "/es/decoders/decode-audio", "/es/decoders/decode-audio/morse-code-sound",
  "/ru/decoders/txt-to-morse", "/ru/decoders/decode-text", "/ru/decoders/decode-image", 
  "/ru/decoders/decode-audio", "/ru/decoders/decode-audio/morse-code-sound",
  "/shop", "/feedback", "/privacy-policy"
];

class TestResults {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  addResult(route, statusCode, error = null) {
    this.total++;
    if (statusCode === 200) {
      this.passed++;
      console.log(`✅ ${route} → ${statusCode}`);
    } else {
      this.failed++;
      console.log(`❌ ${route} → ${statusCode}${error ? ` (${error})` : ''}`);
      this.errors.push({ route, statusCode, error });
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 SSG PAGE TESTING SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total pages tested: ${this.total}`);
    console.log(`✅ Successful (200): ${this.passed}`);
    console.log(`❌ Failed (non-200): ${this.failed}`);
    
    if (this.failed > 0) {
      console.log('\n🚨 FAILED PAGES:');
      this.errors.forEach(({ route, statusCode, error }) => {
        console.log(`  ${route} → ${statusCode}${error ? ` (${error})` : ''}`);
      });
      console.log('\n💡 Check that these routes are properly configured in App.tsx and reactSnap.include');
    } else {
      console.log('\n🎉 All pages returned 200 status codes!');
    }

    return this.failed === 0;
  }
}

/**
 * Run SSG build
 */
function runSSGBuild() {
  return new Promise((resolve, reject) => {
    console.log('🏗️  Starting SSG build...');
    console.log('📦 Running: npm run build:ssg');
    
    const buildProcess = spawn('npm', ['run', 'build:ssg'], {
      stdio: 'inherit',
      shell: true
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ SSG build completed successfully');
        resolve();
      } else {
        console.error(`❌ SSG build failed with exit code ${code}`);
        reject(new Error(`Build failed with code ${code}`));
      }
    });

    buildProcess.on('error', (error) => {
      console.error('❌ Build process error:', error);
      reject(error);
    });
  });
}

/**
 * Check if dist directory exists and has content
 */
function validateDistDirectory() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Dist directory not found: ${DIST_DIR}`);
  }

  const files = fs.readdirSync(DIST_DIR);
  if (files.length === 0) {
    throw new Error('Dist directory is empty');
  }

  console.log(`📁 Dist directory validated (${files.length} files/folders)`);
  
  // Check for index.html
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('index.html not found in dist directory');
  }

  console.log('📄 index.html found');
}

/**
 * Start a simple HTTP server for the dist directory
 */
function startServer() {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting HTTP server on port ${TEST_PORT}...`);
    
    // Use a simple Node.js HTTP server to serve static files
    const server = http.createServer((req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
      
      // Handle routes without .html extension
      if (!path.extname(filePath) && !fs.existsSync(filePath)) {
        filePath = filePath + '.html';
      }
      
      // If still not found, try index.html (SPA fallback)
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 - File Not Found');
          } else {
            res.writeHead(500);
            res.end('500 - Internal Server Error');
          }
        } else {
          const ext = path.extname(filePath);
          let contentType = 'text/html';
          
          switch (ext) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpeg'; break;
            case '.svg': contentType = 'image/svg+xml'; break;
          }
          
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });

    server.listen(TEST_PORT, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`✅ Server started at http://localhost:${TEST_PORT}`);
        
        // Wait a bit for server to be fully ready
        setTimeout(() => {
          resolve(server);
        }, SERVER_START_DELAY);
      }
    });
  });
}

/**
 * Test a single page using HTTP request
 */
function testPage(route) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path: route,
      method: 'GET',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      resolve({
        route,
        statusCode: res.statusCode,
        error: null
      });
    });

    req.on('error', (error) => {
      resolve({
        route,
        statusCode: 0,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        route,
        statusCode: 0, 
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

/**
 * Test all pages concurrently (with concurrency limit)
 */
async function testAllPages() {
  console.log(`\n🧪 Testing ${ROUTES.length} pages...`);
  console.log('='.repeat(50));
  
  const results = new TestResults();
  const CONCURRENCY_LIMIT = 10;
  
  // Process routes in batches to avoid overwhelming the server
  for (let i = 0; i < ROUTES.length; i += CONCURRENCY_LIMIT) {
    const batch = ROUTES.slice(i, i + CONCURRENCY_LIMIT);
    const promises = batch.map(route => testPage(route));
    
    const batchResults = await Promise.all(promises);
    
    batchResults.forEach(({ route, statusCode, error }) => {
      results.addResult(route, statusCode, error);
    });
    
    // Small delay between batches
    if (i + CONCURRENCY_LIMIT < ROUTES.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

/**
 * Main test function
 */
async function runSSGPageTest() {
  console.log('🔍 Starting SSG Page Testing');
  console.log('='.repeat(80));
  
  let server = null;
  
  try {
    // Step 1: Run SSG build
    await runSSGBuild();
    
    // Step 2: Validate dist directory
    validateDistDirectory();
    
    // Step 3: Start server
    server = await startServer();
    
    // Step 4: Test all pages
    const results = await testAllPages();
    
    // Step 5: Generate summary
    const success = results.printSummary();
    
    // Cleanup
    if (server) {
      console.log('\n🛑 Stopping server...');
      server.close();
    }
    
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (server) {
      server.close();
    }
    
    process.exit(1);
  }
}

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n⚠️  Script interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Script terminated');
  process.exit(1);
});

// Run test if called directly
if (require.main === module) {
  runSSGPageTest();
}

module.exports = { runSSGPageTest, testPage, ROUTES };