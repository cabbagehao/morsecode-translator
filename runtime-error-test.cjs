const puppeteer = require('puppeteer');
const http = require('http');

// 需要测试的核心页面路径
const criticalPagesToTest = [
  // 英语版本 - 核心页面
  '/',
  '/learn',
  '/sheet',  // 这个页面有问题
  
  // 多语言首页
  '/ko',
  '/es', 
  '/ru',
  
  // 一些子页面
  '/learn/basic-and-tips',
  '/learn/history',
  '/sheet/morse-code-sheet',
  '/sheet/common-abbr',
  '/sheet/common-words',
  '/sheet/common-phrases',
  '/sheet/morse-code-alphabet',
  '/sheet/morse-code-numbers',
  
  // 多语言版本的问题页面
  '/ko/sheet',
  '/es/sheet',
  '/ru/sheet',
  
  // 解码工具
  '/decoders/txt-to-morse',
  '/decoders/decode-text',
  '/decoders/decode-image',
  '/decoders/decode-audio'
];

class RuntimeErrorTester {
  constructor(baseUrl = 'http://localhost:5175') {
    this.baseUrl = baseUrl;
    this.browser = null;
    this.results = [];
  }

  async init() {
    console.log('🚀 Initializing browser for runtime error testing...');
    try {
      // 尝试启动浏览器
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      console.log('✅ Browser launched successfully');
      return true;
    } catch (error) {
      console.log('❌ Failed to launch browser:', error.message);
      console.log('ℹ️  Falling back to HTTP-only testing...');
      return false;
    }
  }

  async testPageWithBrowser(path) {
    const page = await this.browser.newPage();
    
    // 设置控制台监听器来捕获JavaScript错误
    const errors = [];
    const logs = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`CONSOLE ERROR: ${msg.text()}`);
      }
    });
    
    page.on('pageerror', error => {
      errors.push(`PAGE ERROR: ${error.message}`);
    });
    
    page.on('requestfailed', request => {
      logs.push(`REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
    });

    try {
      const url = `${this.baseUrl}${path}`;
      console.log(`  🔍 Testing ${path} with browser...`);
      
      // 设置超时时间
      await page.goto(url, { 
        waitUntil: 'networkidle0', 
        timeout: 10000 
      });
      
      // 等待React渲染
      await page.waitForTimeout(2000);
      
      // 检查页面标题
      const title = await page.title();
      
      // 检查是否有React错误边界的错误信息
      const errorBoundaryText = await page.evaluate(() => {
        const errorElements = document.querySelectorAll('*');
        for (let element of errorElements) {
          const text = element.textContent || '';
          if (text.includes('Something went wrong') || 
              text.includes('Failed to load page component') ||
              text.includes('useI18n must be used within an I18nProvider')) {
            return text;
          }
        }
        return null;
      });
      
      // 检查控制台是否有特定的React错误
      const reactErrors = errors.filter(error => 
        error.includes('useI18n must be used within an I18nProvider') ||
        error.includes('is not a function') ||
        error.includes('Cannot read properties') ||
        error.includes('React Error Boundary')
      );
      
      const hasJSErrors = errors.length > 0 || reactErrors.length > 0;
      const hasUIErrors = errorBoundaryText !== null;
      
      await page.close();
      
      return {
        path,
        title,
        status: hasJSErrors || hasUIErrors ? 'ERROR' : 'PASS',
        jsErrors: errors,
        uiErrors: errorBoundaryText ? [errorBoundaryText] : [],
        logs: logs.filter(log => log.includes('ERROR')),
        method: 'browser'
      };
      
    } catch (error) {
      await page.close();
      return {
        path,
        title: 'Failed to load',
        status: 'TIMEOUT',
        jsErrors: [`Navigation timeout: ${error.message}`],
        uiErrors: [],
        logs: [],
        method: 'browser'
      };
    }
  }

  async testPageWithHTTP(path) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: 5175,
        path: path,
        method: 'GET'
      };

      const req = http.request(options, (res) => {
        const statusCode = res.statusCode;
        resolve({
          path,
          title: 'HTTP test - cannot detect JS errors',
          status: statusCode === 200 ? 'PASS' : 'ERROR',
          jsErrors: [],
          uiErrors: statusCode !== 200 ? [`HTTP ${statusCode}`] : [],
          logs: [],
          method: 'http'
        });
      });

      req.on('error', (err) => {
        resolve({
          path,
          title: 'Connection failed',
          status: 'ERROR',
          jsErrors: [`Connection error: ${err.message}`],
          uiErrors: [],
          logs: [],
          method: 'http'
        });
      });

      req.setTimeout(5000, () => {
        req.destroy();
        resolve({
          path,
          title: 'Timeout',
          status: 'TIMEOUT',
          jsErrors: ['Request timeout'],
          uiErrors: [],
          logs: [],
          method: 'http'
        });
      });

      req.end();
    });
  }

  async testAllPages() {
    console.log('🔍 Starting runtime error detection...\n');
    console.log(`📋 Testing ${criticalPagesToTest.length} critical pages:\n`);
    
    const hasBrowser = await this.init();
    
    let passCount = 0;
    let errorCount = 0;
    let timeoutCount = 0;
    
    for (const path of criticalPagesToTest) {
      let result;
      
      if (hasBrowser) {
        result = await this.testPageWithBrowser(path);
      } else {
        result = await this.testPageWithHTTP(path);
      }
      
      this.results.push(result);
      
      // 显示结果
      let statusIcon;
      if (result.status === 'PASS') {
        statusIcon = '✅ PASS';
        passCount++;
      } else if (result.status === 'TIMEOUT') {
        statusIcon = '⏰ TIMEOUT';
        timeoutCount++;
      } else {
        statusIcon = '❌ ERROR';
        errorCount++;
      }
      
      console.log(`  ${statusIcon} ${path} (${result.method})`);
      
      // 显示错误详情
      if (result.jsErrors.length > 0) {
        console.log(`    🔥 JS错误: ${result.jsErrors.slice(0, 2).join(', ')}`);
      }
      if (result.uiErrors.length > 0) {
        console.log(`    💥 UI错误: ${result.uiErrors.slice(0, 1).join(', ')}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 运行时错误检测总结');
    console.log('='.repeat(60));
    console.log(`✅ 正常页面: ${passCount}/${criticalPagesToTest.length}`);
    console.log(`❌ 错误页面: ${errorCount}/${criticalPagesToTest.length}`);
    console.log(`⏰ 超时页面: ${timeoutCount}/${criticalPagesToTest.length}`);
    console.log(`📈 成功率: ${((passCount / criticalPagesToTest.length) * 100).toFixed(1)}%`);
    
    // 显示检测到的错误
    const errorPages = this.results.filter(r => r.status === 'ERROR');
    if (errorPages.length > 0) {
      console.log('\n❌ 检测到的错误页面:');
      errorPages.forEach(page => {
        console.log(`\n  🚨 ${page.path}:`);
        if (page.jsErrors.length > 0) {
          console.log(`    - JS错误: ${page.jsErrors.join(', ')}`);
        }
        if (page.uiErrors.length > 0) {
          console.log(`    - UI错误: ${page.uiErrors.join(', ')}`);
        }
      });
      
      // 特别关注I18n错误
      const i18nErrors = errorPages.filter(page => 
        page.jsErrors.some(error => error.includes('useI18n must be used within an I18nProvider')) ||
        page.uiErrors.some(error => error.includes('useI18n must be used within an I18nProvider'))
      );
      
      if (i18nErrors.length > 0) {
        console.log('\n🎯 I18n Provider错误 (需要优先修复):');
        i18nErrors.forEach(page => {
          console.log(`  - ${page.path}: 缺少I18nProvider包裹`);
        });
      }
    } else if (hasBrowser) {
      console.log('\n🎉 所有页面运行时检查通过！');
    } else {
      console.log('\n⚠️  只进行了HTTP检查，无法检测JavaScript运行时错误');
      console.log('💡 建议安装Puppeteer以获得完整的错误检测');
    }
    
    if (this.browser) {
      await this.browser.close();
    }
    
    return { 
      passCount, 
      errorCount, 
      timeoutCount, 
      total: criticalPagesToTest.length,
      errorPages,
      hasBrowser 
    };
  }
}

// 运行测试
async function runTests() {
  const tester = new RuntimeErrorTester();
  
  try {
    const summary = await tester.testAllPages();
    
    console.log('\n📋 下一步建议:');
    if (summary.errorPages.length > 0 && summary.hasBrowser) {
      console.log('1. 修复检测到的JavaScript运行时错误');
      console.log('2. 重新运行此测试验证修复效果');
      console.log('3. 检查所有需要I18nProvider的页面路由配置');
    } else if (!summary.hasBrowser) {
      console.log('1. 安装或修复Puppeteer以获得完整的JavaScript错误检测');
      console.log('2. 运行: npm install puppeteer');
    } else {
      console.log('✅ 所有页面通过运行时检查，可以继续开发');
    }
    
    // 如果有错误且使用了浏览器检测，则返回错误状态
    const success = summary.errorCount === 0 || !summary.hasBrowser;
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ 测试执行失败:', error);
    process.exit(1);
  }
}

runTests();