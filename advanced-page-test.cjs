const puppeteer = require('puppeteer');

const baseUrl = 'http://localhost:5174';

// 所有需要测试的页面路径
const pagesToTest = [
  // 首页及多语言版本
  '/',
  '/ko',
  '/es', 
  '/ru',
  
  // 学习页面
  '/learn',
  '/ko/learn',
  '/es/learn',
  '/ru/learn',
  
  // 基础和技巧页面
  '/learn/basic-and-tips',
  '/ko/learn/basic-and-tips',
  '/es/learn/basic-and-tips',
  '/ru/learn/basic-and-tips',
  
  // 历史页面
  '/learn/history',
  '/ko/learn/history',
  '/es/learn/history',
  '/ru/learn/history',
  
  // 表格页面
  '/sheet',
  '/ko/sheet',
  '/es/sheet',
  '/ru/sheet',
  
  // 摩尔斯码表格
  '/sheet/morse-code-sheet',
  '/ko/sheet/morse-code-sheet',
  '/es/sheet/morse-code-sheet',
  '/ru/sheet/morse-code-sheet',
  
  // 常用缩写
  '/sheet/common-abbr',
  '/ko/sheet/common-abbr',
  '/es/sheet/common-abbr',
  '/ru/sheet/common-abbr',
  
  // 常用词汇
  '/sheet/common-words',
  '/ko/sheet/common-words',
  '/es/sheet/common-words',
  '/ru/sheet/common-words',
  
  // 常用短语
  '/sheet/common-phrases',
  '/ko/sheet/common-phrases',
  '/es/sheet/common-phrases',
  '/ru/sheet/common-phrases',
  
  // 摩尔斯码字母
  '/sheet/morse-code-alphabet',
  '/ko/sheet/morse-code-alphabet',
  '/es/sheet/morse-code-alphabet',
  '/ru/sheet/morse-code-alphabet',
  
  // 摩尔斯码数字
  '/sheet/morse-code-numbers',
  '/ko/sheet/morse-code-numbers',
  '/es/sheet/morse-code-numbers',
  '/ru/sheet/morse-code-numbers',
  
  // 解码工具
  '/decoders/txt-to-morse',
  '/decoders/decode-text',
  '/decoders/decode-image',
  '/decoders/decode-audio',
  '/decoders/decode-audio/morse-code-sound',
  
  // 多语言解码工具
  '/ko/decoders/txt-to-morse',
  '/es/decoders/txt-to-morse',
  '/ru/decoders/txt-to-morse',
  '/ko/decoders/decode-text',
  '/es/decoders/decode-text',
  '/ru/decoders/decode-text',
  '/ko/decoders/decode-image',
  '/es/decoders/decode-image',
  '/ru/decoders/decode-image',
  '/ko/decoders/decode-audio',
  '/es/decoders/decode-audio',
  '/ru/decoders/decode-audio',
  '/ko/decoders/decode-audio/morse-code-sound',
  '/es/decoders/decode-audio/morse-code-sound',
  '/ru/decoders/decode-audio/morse-code-sound',
  
  // 其他页面
  '/shop',
  '/feedback',
  '/privacy-policy'
];

async function testPageAdvanced(browser, path) {
  const page = await browser.newPage();
  const result = {
    path,
    status: 'unknown',
    result: '',
    errors: [],
    warnings: []
  };

  try {
    // 监听控制台错误
    page.on('console', msg => {
      if (msg.type() === 'error') {
        result.errors.push(msg.text());
      }
    });

    // 监听页面错误
    page.on('pageerror', error => {
      result.errors.push(error.message);
    });

    // 导航到页面
    const response = await page.goto(`${baseUrl}${path}`, {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    const statusCode = response.status();
    
    if (statusCode !== 200) {
      result.status = statusCode;
      result.result = `❌ HTTP ${statusCode}`;
      return result;
    }

    // 等待页面加载完成
    await page.waitForTimeout(1000);

    // 检查是否显示了错误边界
    const errorBoundary = await page.$('text=Something went wrong');
    if (errorBoundary) {
      result.status = 'error_boundary';
      result.result = '❌ ERROR BOUNDARY';
      return result;
    }

    // 检查是否是空白页面
    const bodyText = await page.$eval('body', el => el.innerText.trim());
    if (bodyText.length < 10) {
      result.status = 'blank_page';
      result.result = '❌ BLANK PAGE';
      return result;
    }

    // 检查是否包含React错误
    const hasReactError = result.errors.some(error => 
      error.includes('React') || 
      error.includes('TypeError') ||
      error.includes('is not a function') ||
      error.includes('Cannot read properties')
    );

    if (hasReactError) {
      result.status = 'react_error';
      result.result = '❌ JS ERROR';
      result.warnings.push('JavaScript runtime errors detected');
      return result;
    }

    // 检查是否有非致命警告
    if (result.errors.length > 0) {
      result.warnings.push(`${result.errors.length} console errors`);
    }

    result.status = 200;
    result.result = result.warnings.length > 0 ? '⚠️ PASS (with warnings)' : '✅ PASS';
    
  } catch (error) {
    result.status = 'timeout_or_error';
    result.result = `❌ ERROR: ${error.message}`;
    result.errors.push(error.message);
  } finally {
    await page.close();
  }

  return result;
}

async function testAllPagesAdvanced() {
  console.log('🔍 Starting advanced page testing with browser automation...\n');
  console.log(`📋 Testing ${pagesToTest.length} pages total:\n`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];
  let passCount = 0;
  let warningCount = 0;
  let failCount = 0;
  
  // 按组测试页面
  const pageGroups = [
    { name: '🏠 首页 & 多语言版本', pages: pagesToTest.slice(0, 4) },
    { name: '📚 学习页面', pages: pagesToTest.slice(4, 8) },
    { name: '💡 基础和技巧', pages: pagesToTest.slice(8, 12) },
    { name: '📖 历史页面', pages: pagesToTest.slice(12, 16) },
    { name: '📊 表格页面', pages: pagesToTest.slice(16, 20) },
    { name: '📄 摩尔斯码表格', pages: pagesToTest.slice(20, 24) },
    { name: '🔤 常用缩写', pages: pagesToTest.slice(24, 28) },
    { name: '💬 常用词汇', pages: pagesToTest.slice(28, 32) },
    { name: '💭 常用短语', pages: pagesToTest.slice(32, 36) },
    { name: '🔤 摩尔斯码字母', pages: pagesToTest.slice(36, 40) },
    { name: '🔢 摩尔斯码数字', pages: pagesToTest.slice(40, 44) },
    { name: '🛠️ 解码工具', pages: pagesToTest.slice(44, 49) },
    { name: '🌍 多语言解码工具', pages: pagesToTest.slice(49, 64) },
    { name: '🔧 其他页面', pages: pagesToTest.slice(64) }
  ];
  
  for (const group of pageGroups) {
    console.log(`\n${group.name}:`);
    for (const path of group.pages) {
      const result = await testPageAdvanced(browser, path);
      results.push(result);
      
      console.log(`  ${result.result} ${path}`);
      
      // 显示详细错误信息
      if (result.errors.length > 0) {
        result.errors.slice(0, 2).forEach(error => {
          console.log(`    🔍 ${error.substring(0, 100)}${error.length > 100 ? '...' : ''}`);
        });
      }
      
      if (result.status === 200) {
        if (result.warnings.length > 0) {
          warningCount++;
        } else {
          passCount++;
        }
      } else {
        failCount++;
      }
    }
  }
  
  await browser.close();
  
  // 总结报告
  console.log('\n' + '='.repeat(60));
  console.log('📊 高级测试总结报告');
  console.log('='.repeat(60));
  console.log(`✅ 完全通过: ${passCount}/${pagesToTest.length} 页面`);
  console.log(`⚠️ 警告通过: ${warningCount}/${pagesToTest.length} 页面`);
  console.log(`❌ 失败: ${failCount}/${pagesToTest.length} 页面`);
  console.log(`📈 成功率: ${(((passCount + warningCount) / pagesToTest.length) * 100).toFixed(1)}%`);
  
  if (failCount > 0) {
    console.log('\n❌ 失败页面详情:');
    results.filter(r => r.status !== 200).forEach(r => {
      console.log(`  ${r.result} ${r.path}`);
      if (r.errors.length > 0) {
        console.log(`    💥 主要错误: ${r.errors[0].substring(0, 150)}`);
      }
    });
  }

  if (warningCount > 0) {
    console.log('\n⚠️ 有警告的页面:');
    results.filter(r => r.status === 200 && r.warnings.length > 0).forEach(r => {
      console.log(`  ${r.result} ${r.path}`);
      console.log(`    ⚠️ 警告: ${r.warnings.join(', ')}`);
    });
  }
  
  if (failCount === 0) {
    console.log('\n🎉 所有页面基本功能正常！');
    if (warningCount > 0) {
      console.log('⚠️ 注意：部分页面有非致命警告，建议修复以提升用户体验。');
    }
  }
  
  return { passCount, warningCount, failCount, total: pagesToTest.length };
}

// 运行测试
testAllPagesAdvanced().then((summary) => {
  const success = summary.failCount === 0;
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('高级测试执行出错:', error);
  process.exit(1);
});