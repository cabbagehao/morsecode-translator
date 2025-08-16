const http = require('http');
const baseUrl = 'http://localhost:4173';

// 重点测试之前有问题的页面
const criticalPages = [
  // 首页测试
  '/',
  
  // 常用短语（之前的问题页面）
  '/sheet/common-phrases',
  '/es/sheet/common-phrases',
  '/ko/sheet/common-phrases',
  '/ru/sheet/common-phrases',
  
  // 其他重要页面
  '/sheet/common-abbr',
  '/es/sheet/common-abbr',
  '/learn/history',
  '/ko/learn/history',
  '/decoders/decode-image',
  '/es/decoders/decode-image',
  
  // 检查所有新增的多语言解码器路由
  '/ko/decoders/txt-to-morse',
  '/es/decoders/txt-to-morse',
  '/ru/decoders/txt-to-morse',
  '/ko/decoders/decode-image',
  '/es/decoders/decode-image',
  '/ru/decoders/decode-image'
];

async function testSPAPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 4173,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NodeJS-Test/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = http.request(options, (res) => {
      const statusCode = res.statusCode;
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        let analysis = {
          path,
          statusCode,
          contentLength: data.length,
          hasSPAStructure: false,
          hasReactRoot: false,
          hasJavaScript: false,
          hasRouterScript: false,
          hasI18nScript: false,
          title: '',
          result: ''
        };

        // 检查SPA基本结构
        analysis.hasReactRoot = data.includes('id="root"');
        analysis.hasJavaScript = data.includes('<script') && data.includes('.js');
        analysis.hasRouterScript = data.includes('router') || data.includes('Router');
        analysis.hasI18nScript = data.includes('I18n') || data.includes('i18n');

        // 提取页面标题
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        analysis.title = titleMatch ? titleMatch[1] : '';

        // 检查是否有错误指示器
        const hasErrors = data.includes('Something went wrong') || 
                         data.includes('Error') && !data.includes('ErrorBoundary') ||
                         statusCode !== 200;

        // 基本的SPA结构检查
        analysis.hasSPAStructure = analysis.hasReactRoot && analysis.hasJavaScript;

        if (statusCode !== 200) {
          analysis.result = `❌ HTTP ${statusCode}`;
        } else if (!analysis.hasSPAStructure) {
          analysis.result = '❌ 缺少SPA结构';
        } else if (hasErrors) {
          analysis.result = '❌ 包含错误';
        } else {
          analysis.result = '✅ SPA结构正常';
        }

        resolve(analysis);
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        statusCode: 'ERROR',
        result: `❌ 请求错误: ${err.message}`,
        error: err.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        path,
        statusCode: 'TIMEOUT',
        result: '⏰ 请求超时'
      });
    });

    req.end();
  });
}

async function testCriticalPagesProduction() {
  console.log('🏗️ 测试生产环境SPA应用...\n');
  console.log(`📋 测试 ${criticalPages.length} 个关键页面:\n`);
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  
  for (const path of criticalPages) {
    const result = await testSPAPage(path);
    results.push(result);
    
    console.log(`  ${result.result} ${path}`);
    if (result.contentLength) {
      console.log(`    📄 大小: ${result.contentLength} bytes`);
    }
    if (result.title) {
      console.log(`    📝 标题: ${result.title}`);
    }
    if (result.hasSPAStructure !== undefined) {
      const checks = [];
      if (result.hasReactRoot) checks.push('React根元素');
      if (result.hasJavaScript) checks.push('JavaScript');
      if (result.hasRouterScript) checks.push('路由');
      if (result.hasI18nScript) checks.push('国际化');
      
      if (checks.length > 0) {
        console.log(`    ✓ 包含: ${checks.join(', ')}`);
      }
    }
    console.log();
    
    if (result.statusCode === 200 && result.hasSPAStructure) {
      passCount++;
    } else {
      failCount++;
    }
  }
  
  // 总结报告
  console.log('='.repeat(60));
  console.log('📊 生产环境SPA测试总结');
  console.log('='.repeat(60));
  console.log(`✅ 正常页面: ${passCount}/${criticalPages.length}`);
  console.log(`❌ 问题页面: ${failCount}/${criticalPages.length}`);
  console.log(`📈 成功率: ${((passCount / criticalPages.length) * 100).toFixed(1)}%`);
  
  if (failCount > 0) {
    console.log('\n❌ 问题页面详情:');
    results.filter(r => r.statusCode !== 200 || !r.hasSPAStructure).forEach(r => {
      console.log(`  ${r.result} ${r.path}`);
    });
  }
  
  console.log('\n🔍 分析结果:');
  console.log(`- 所有页面使用相同的HTML入口 (${results[0]?.contentLength || 'N/A'} bytes)`);
  console.log('- SPA路由通过客户端JavaScript处理');
  console.log('- 页面最终渲染需要等待JavaScript执行');
  
  if (passCount === criticalPages.length) {
    console.log('\n🎉 生产环境SPA结构验证通过！');
    console.log('💡 注意：实际页面内容需要JavaScript加载后才能看到');
  } else {
    console.log('\n⚠️ 部分页面可能存在问题，需要进一步检查');
  }
  
  return { passCount, failCount, total: criticalPages.length };
}

// 运行测试
testCriticalPagesProduction().then((summary) => {
  const success = summary.failCount === 0;
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('测试执行出错:', error);
  process.exit(1);
});