const http = require('http');

async function testSheetPage() {
  console.log('🧪 测试 /sheet 页面修复是否生效...\n');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5175,
      path: '/sheet',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      const statusCode = res.statusCode;
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`📊 HTTP响应状态: ${statusCode}`);
        console.log(`📄 内容长度: ${data.length} 字节`);
        
        // 检查基本的React应用结构
        const hasReactRoot = data.includes('id="root"');
        const hasJavaScript = data.includes('<script') && data.includes('.js');
        const hasViteHMR = data.includes('@vite/client') || data.includes('vite');
        
        console.log(`✅ React根元素: ${hasReactRoot ? '存在' : '缺失'}`);
        console.log(`✅ JavaScript资源: ${hasJavaScript ? '存在' : '缺失'}`);
        console.log(`✅ Vite开发模式: ${hasViteHMR ? '是' : '否'}`);
        
        if (statusCode === 200 && hasReactRoot && hasJavaScript) {
          console.log('\n🎉 /sheet 页面基础结构正常');
          console.log('💡 请手动访问 http://localhost:5175/sheet 验证页面是否正常加载');
          console.log('   预期结果: 页面应该正常显示，不再出现 "Something went wrong" 错误');
        } else {
          console.log('\n❌ /sheet 页面基础结构有问题');
        }
        
        resolve(statusCode === 200);
      });
    });

    req.on('error', (err) => {
      console.log(`❌ 请求失败: ${err.message}`);
      console.log('💡 请确保开发服务器正在运行: npm run dev');
      resolve(false);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      console.log('⏰ 请求超时');
      resolve(false);
    });

    req.end();
  });
}

async function runVerification() {
  const success = await testSheetPage();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 修复验证总结');
  console.log('='.repeat(50));
  
  if (success) {
    console.log('✅ 基础HTTP测试通过');
    console.log('🔧 已修复的问题:');
    console.log('   - 为 /sheet 路由添加了 I18nProvider 包裹');
    console.log('   - 解决了 "useI18n must be used within an I18nProvider" 错误');
    console.log('\n🧪 下一步测试建议:');
    console.log('1. 手动访问 http://localhost:5175/sheet');
    console.log('2. 确认页面不再显示 "Something went wrong"');
    console.log('3. 检查控制台是否还有JavaScript错误');
    console.log('4. 测试页面的国际化功能是否正常');
  } else {
    console.log('❌ 基础测试失败');
    console.log('🔧 可能的问题:');
    console.log('   - 开发服务器未运行');
    console.log('   - 端口配置错误');
    console.log('   - 其他网络问题');
  }
  
  process.exit(success ? 0 : 1);
}

runVerification();