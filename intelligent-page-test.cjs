const http = require('http');
const baseUrl = 'http://localhost:4173';

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
  
  // 常用短语 - 这些页面有已知问题
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

// 检测已知问题的模式
const errorPatterns = [
  'Something went wrong',
  'Failed to load page component',
  'TypeError',
  'is not a function',
  'Cannot read properties',
  'Uncaught Error',
  '<title>Error</title>',
  'React Error Boundary'
];

async function testPageIntelligent(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 4173,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      const statusCode = res.statusCode;
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        let status = statusCode === 200 ? '✅ PASS' : 
                    statusCode === 404 ? '❌ 404' : 
                    `⚠️ ${statusCode}`;
        
        let hasKnownErrors = false;
        let errorDetails = [];

        if (statusCode === 200) {
          // 检查HTML内容是否包含错误指示器
          for (const pattern of errorPatterns) {
            if (data.includes(pattern)) {
              hasKnownErrors = true;
              errorDetails.push(pattern);
            }
          }

          // 检查是否是空白页面（内容太少）
          const htmlText = data.replace(/<[^>]*>/g, '').trim();
          if (htmlText.length < 100) {
            hasKnownErrors = true;
            errorDetails.push('Potentially blank page');
          }

          // 检查是否包含基本的React应用结构
          if (!data.includes('id="root"') && !data.includes('class="App"')) {
            hasKnownErrors = true;
            errorDetails.push('Missing React app structure');
          }

          if (hasKnownErrors) {
            status = '❌ CONTENT ERROR';
          }
        }

        resolve({
          path,
          status: statusCode,
          result: status,
          hasErrors: hasKnownErrors,
          errorDetails: errorDetails,
          contentLength: data.length
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        result: `❌ ERROR: ${err.message}`,
        hasErrors: true,
        errorDetails: [err.message],
        contentLength: 0
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        path,
        status: 'TIMEOUT',
        result: '⏰ TIMEOUT',
        hasErrors: true,
        errorDetails: ['Request timeout'],
        contentLength: 0
      });
    });

    req.end();
  });
}

async function testAllPagesIntelligent() {
  console.log('🔍 Starting intelligent page content testing...\n');
  console.log(`📋 Testing ${pagesToTest.length} pages total:\n`);
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  let errorPages = [];
  
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
    { name: '💭 常用短语 [已知问题]', pages: pagesToTest.slice(32, 36) },
    { name: '🔤 摩尔斯码字母', pages: pagesToTest.slice(36, 40) },
    { name: '🔢 摩尔斯码数字', pages: pagesToTest.slice(40, 44) },
    { name: '🛠️ 解码工具', pages: pagesToTest.slice(44, 49) },
    { name: '🌍 多语言解码工具', pages: pagesToTest.slice(49, 64) },
    { name: '🔧 其他页面', pages: pagesToTest.slice(64) }
  ];
  
  for (const group of pageGroups) {
    console.log(`\n${group.name}:`);
    for (const path of group.pages) {
      const result = await testPageIntelligent(path);
      results.push(result);
      
      console.log(`  ${result.result} ${path} (${result.contentLength} bytes)`);
      
      if (result.hasErrors && result.errorDetails.length > 0) {
        console.log(`    🔍 问题: ${result.errorDetails.join(', ')}`);
        errorPages.push(result);
      }
      
      if (result.status === 200 && !result.hasErrors) {
        passCount++;
      } else {
        failCount++;
      }
    }
  }
  
  // 总结报告
  console.log('\n' + '='.repeat(60));
  console.log('📊 智能测试总结报告');
  console.log('='.repeat(60));
  console.log(`✅ 正常页面: ${passCount}/${pagesToTest.length} 页面`);
  console.log(`❌ 问题页面: ${failCount}/${pagesToTest.length} 页面`);
  console.log(`📈 成功率: ${((passCount / pagesToTest.length) * 100).toFixed(1)}%`);
  
  if (errorPages.length > 0) {
    console.log('\n❌ 检测到的问题页面详情:');
    
    // 按错误类型分组
    const errorByType = {};
    errorPages.forEach(page => {
      page.errorDetails.forEach(error => {
        if (!errorByType[error]) {
          errorByType[error] = [];
        }
        errorByType[error].push(page.path);
      });
    });

    Object.entries(errorByType).forEach(([error, paths]) => {
      console.log(`\n  💥 ${error}:`);
      paths.forEach(path => {
        console.log(`    - ${path}`);
      });
    });

    // 重点关注CommonPhrases问题
    const commonPhrasesErrors = errorPages.filter(page => page.path.includes('common-phrases'));
    if (commonPhrasesErrors.length > 0) {
      console.log('\n🚨 Common Phrases页面问题需要优先修复:');
      commonPhrasesErrors.forEach(page => {
        console.log(`  ${page.result} ${page.path}`);
      });
    }
  } else {
    console.log('\n🎉 所有页面内容检查通过！');
  }
  
  return { passCount, failCount, total: pagesToTest.length, errorPages };
}

// 运行测试
testAllPagesIntelligent().then((summary) => {
  console.log('\n📋 建议下一步行动:');
  if (summary.errorPages.length > 0) {
    const commonPhrasesErrors = summary.errorPages.filter(page => page.path.includes('common-phrases'));
    if (commonPhrasesErrors.length > 0) {
      console.log('1. 优先修复 Common Phrases 页面的翻译文件结构问题');
      console.log('2. 检查其他类似的 .map() 函数调用');
    }
    console.log('3. 使用浏览器开发者工具详细检查错误页面');
    console.log('4. 修复后重新运行此测试');
  } else {
    console.log('✅ 所有页面正常运行，可以继续其他开发工作');
  }
  
  const success = summary.failCount === 0;
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('测试执行出错:', error);
  process.exit(1);
});