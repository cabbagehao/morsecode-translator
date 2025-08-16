const http = require('http');
const baseUrl = 'http://localhost:43487';

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

async function testPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 43487,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      const statusCode = res.statusCode;
      const status = statusCode === 200 ? '✅ PASS' : 
                    statusCode === 404 ? '❌ 404' : 
                    `⚠️ ${statusCode}`;
      
      resolve({
        path,
        status: statusCode,
        result: status
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        result: `❌ ERROR: ${err.message}`
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        path,
        status: 'TIMEOUT',
        result: '⏰ TIMEOUT'
      });
    });

    req.end();
  });
}

async function testAllPages() {
  console.log('🧪 Starting page accessibility test...\n');
  console.log(`📋 Testing ${pagesToTest.length} pages total:\n`);
  
  const results = [];
  let passCount = 0;
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
      const result = await testPage(path);
      results.push(result);
      
      console.log(`  ${result.result} ${path}`);
      
      if (result.status === 200) {
        passCount++;
      } else {
        failCount++;
      }
    }
  }
  
  // 总结报告
  console.log('\n' + '='.repeat(50));
  console.log('📊 测试总结报告');
  console.log('='.repeat(50));
  console.log(`✅ 通过: ${passCount}/${pagesToTest.length} 页面`);
  console.log(`❌ 失败: ${failCount}/${pagesToTest.length} 页面`);
  console.log(`📈 成功率: ${((passCount / pagesToTest.length) * 100).toFixed(1)}%`);
  
  if (failCount > 0) {
    console.log('\n❌ 失败页面详情:');
    results.filter(r => r.status !== 200).forEach(r => {
      console.log(`  ${r.result} ${r.path}`);
    });
  } else {
    console.log('\n🎉 所有页面都可以正常访问！');
  }
  
  return { passCount, failCount, total: pagesToTest.length };
}

// 运行测试
testAllPages().then((summary) => {
  const success = summary.failCount === 0;
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('测试执行出错:', error);
  process.exit(1);
});