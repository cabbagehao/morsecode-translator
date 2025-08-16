const http = require('http');

/**
 * AdSense错误检测器
 * 检测页面中的AdSense相关JavaScript错误和配置问题
 */

class AdSenseErrorChecker {
  constructor(baseUrl = 'http://localhost:5175') {
    this.baseUrl = baseUrl;
    this.testPages = [
      // 问题页面
      '/ko/decoders/decode-text',
      
      // 其他多语言页面
      '/',
      '/ko',
      '/es',
      '/ru',
      '/learn',
      '/ko/learn',
      '/es/learn',
      '/ru/learn',
      '/sheet',
      '/ko/sheet',
      '/es/sheet',
      '/ru/sheet',
      
      // 子页面
      '/learn/basic-and-tips',
      '/learn/history',
      '/sheet/morse-code-sheet',
      '/sheet/common-phrases',
      '/decoders/txt-to-morse',
      '/decoders/decode-image',
      '/decoders/decode-audio'
    ];
    this.results = [];
  }

  async testPage(path) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: 5175,
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
          const analysis = this.analyzePageForAdSense(data, path);
          
          resolve({
            path,
            statusCode,
            ...analysis
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          path,
          statusCode: 'ERROR',
          hasAdSenseScript: false,
          hasAdSlots: false,
          potentialIssues: [`Connection error: ${err.message}`],
          recommendations: ['Check if development server is running']
        });
      });

      req.setTimeout(5000, () => {
        req.destroy();
        resolve({
          path,
          statusCode: 'TIMEOUT',
          hasAdSenseScript: false,
          hasAdSlots: false,
          potentialIssues: ['Request timeout'],
          recommendations: ['Check server responsiveness']
        });
      });

      req.end();
    });
  }

  analyzePageForAdSense(htmlContent, path) {
    const analysis = {
      hasAdSenseScript: false,
      hasAdSlots: false,
      hasMultipleScripts: false,
      hasLayout: false,
      potentialIssues: [],
      recommendations: []
    };

    // 检查AdSense脚本
    const adSenseScriptRegex = /pagead2\.googlesyndication\.com.*?adsbygoogle\.js/g;
    const scriptMatches = htmlContent.match(adSenseScriptRegex);
    
    if (scriptMatches) {
      analysis.hasAdSenseScript = true;
      if (scriptMatches.length > 1) {
        analysis.hasMultipleScripts = true;
        analysis.potentialIssues.push('Multiple AdSense scripts detected');
        analysis.recommendations.push('Remove duplicate AdSense script tags');
      }
    }

    // 检查广告位
    const adSlotRegex = /<ins[^>]*class[^>]*adsbygoogle[^>]*>/g;
    const slotMatches = htmlContent.match(adSlotRegex);
    
    if (slotMatches) {
      analysis.hasAdSlots = true;
      analysis.adSlotCount = slotMatches.length;
    }

    // 检查Layout组件
    analysis.hasLayout = htmlContent.includes('Layout');

    // 特定问题检测
    if (analysis.hasAdSenseScript && analysis.hasLayout) {
      // 这种情况可能导致重复初始化
      if (path.includes('/ko/') || path.includes('/es/') || path.includes('/ru/')) {
        analysis.potentialIssues.push('Multi-language page with AdSense may have initialization issues');
        analysis.recommendations.push('Verify AdSense initialization logic in Layout.tsx');
      }
    }

    if (!analysis.hasAdSenseScript && analysis.hasAdSlots) {
      analysis.potentialIssues.push('Ad slots found without AdSense script');
      analysis.recommendations.push('Ensure AdSense script is properly loaded');
    }

    // SPA相关问题
    if (htmlContent.includes('react-router') || htmlContent.includes('Router')) {
      analysis.potentialIssues.push('SPA detected - AdSense may need special handling for route changes');
      analysis.recommendations.push('Implement proper AdSense reinitialization for SPA navigation');
    }

    return analysis;
  }

  async runFullCheck() {
    console.log('🔍 Starting AdSense configuration check...\n');
    console.log(`📋 Testing ${this.testPages.length} pages for AdSense issues:\n`);

    let passCount = 0;
    let issueCount = 0;

    for (const path of this.testPages) {
      const result = await this.testPage(path);
      this.results.push(result);

      let statusIcon;
      if (result.statusCode === 200 && result.potentialIssues.length === 0) {
        statusIcon = '✅ CLEAN';
        passCount++;
      } else if (result.statusCode === 200) {
        statusIcon = '⚠️ ISSUES';
        issueCount++;
      } else {
        statusIcon = '❌ ERROR';
        issueCount++;
      }

      console.log(`  ${statusIcon} ${path}`);
      
      if (result.potentialIssues.length > 0) {
        console.log(`    🔥 Issues: ${result.potentialIssues.slice(0, 2).join(', ')}`);
      }
      
      if (result.hasAdSenseScript) {
        console.log(`    📊 AdSense: Script loaded${result.hasAdSlots ? `, ${result.adSlotCount || 0} slots` : ''}`);
      }
    }

    this.generateReport(passCount, issueCount);
  }

  generateReport(passCount, issueCount) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 AdSense配置检查报告');
    console.log('='.repeat(60));
    console.log(`✅ 无问题页面: ${passCount}/${this.testPages.length}`);
    console.log(`⚠️ 有问题页面: ${issueCount}/${this.testPages.length}`);
    console.log(`📈 健康度: ${((passCount / this.testPages.length) * 100).toFixed(1)}%`);

    // 统计问题类型
    const issueStats = {};
    this.results.forEach(result => {
      result.potentialIssues.forEach(issue => {
        issueStats[issue] = (issueStats[issue] || 0) + 1;
      });
    });

    if (Object.keys(issueStats).length > 0) {
      console.log('\n🔥 检测到的问题类型:');
      Object.entries(issueStats).forEach(([issue, count]) => {
        console.log(`  - ${issue}: ${count} 页面`);
      });
    }

    // 重点关注原始报错页面
    const originalProblemPage = this.results.find(r => r.path === '/ko/decoders/decode-text');
    if (originalProblemPage) {
      console.log('\n🎯 原始问题页面 /ko/decoders/decode-text:');
      console.log(`  状态: ${originalProblemPage.statusCode}`);
      console.log(`  AdSense脚本: ${originalProblemPage.hasAdSenseScript ? '已加载' : '未检测到'}`);
      console.log(`  潜在问题: ${originalProblemPage.potentialIssues.length || 0} 个`);
      if (originalProblemPage.potentialIssues.length > 0) {
        originalProblemPage.potentialIssues.forEach(issue => {
          console.log(`    - ${issue}`);
        });
      }
    }

    // 建议
    console.log('\n💡 修复建议:');
    if (issueCount === 0) {
      console.log('✅ AdSense配置看起来正常，但建议进行浏览器测试验证');
    } else {
      console.log('1. 检查Layout.tsx中的AdSense初始化逻辑');
      console.log('2. 确保只有未初始化的广告位才调用push()');
      console.log('3. 在浏览器开发者工具中验证控制台错误是否消失');
      console.log('4. 测试多语言页面的AdSense工作是否正常');
    }

    console.log('\n🧪 下一步验证:');
    console.log('1. 启动开发服务器: npm run dev');
    console.log('2. 访问 http://localhost:5175/ko/decoders/decode-text');
    console.log('3. 打开浏览器开发者工具检查控制台');
    console.log('4. 确认没有 "adsbygoogle.push() error" 信息');
  }
}

// 运行检查
async function runCheck() {
  const checker = new AdSenseErrorChecker();
  
  try {
    await checker.runFullCheck();
    process.exit(0);
  } catch (error) {
    console.error('❌ 检查过程中发生错误:', error);
    process.exit(1);
  }
}

runCheck();