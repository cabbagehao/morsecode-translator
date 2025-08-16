const http = require('http');

/**
 * 测试DecodeText页面的国际化功能
 */

async function testDecodeTextI18n() {
  console.log('🧪 测试DecodeText页面国际化...\n');
  
  const testUrls = [
    '/decoders/decode-text',    // 英语版本
    '/ko/decoders/decode-text', // 韩语版本
    '/es/decoders/decode-text', // 西班牙语版本
    '/ru/decoders/decode-text'  // 俄语版本
  ];
  
  let passCount = 0;
  let issueCount = 0;
  
  for (const url of testUrls) {
    console.log(`📋 测试 ${url}...`);
    
    const result = await testPage(url);
    
    if (result.success) {
      console.log(`  ✅ 页面加载成功 (${result.statusCode})`);
      passCount++;
    } else {
      console.log(`  ❌ 页面加载失败: ${result.error}`);
      issueCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 DecodeText国际化测试结果');
  console.log('='.repeat(50));
  console.log(`✅ 成功页面: ${passCount}/${testUrls.length}`);
  console.log(`❌ 失败页面: ${issueCount}/${testUrls.length}`);
  
  if (passCount === testUrls.length) {
    console.log('\n🎉 所有DecodeText页面加载成功！');
    console.log('💡 下一步: 在浏览器中手动验证内容是否显示对应语言');
    console.log('\n🔍 验证步骤:');
    console.log('1. 访问 http://localhost:5175/ru/decoders/decode-text');
    console.log('2. 检查页面标题是否显示为俄语');
    console.log('3. 检查"文件上传"等UI元素是否显示为俄语');
    console.log('4. 如果仍显示英语，则需要进一步修改组件的其他文本');
  } else {
    console.log('\n❌ 部分页面加载失败，需要检查路由配置');
  }
}

async function testPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5175,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      resolve({
        success: res.statusCode === 200,
        statusCode: res.statusCode
      });
    });

    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message
      });
    });

    req.setTimeout(3000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout'
      });
    });

    req.end();
  });
}

testDecodeTextI18n();