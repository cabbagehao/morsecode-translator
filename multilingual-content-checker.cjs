const http = require('http');

/**
 * 自动化多语言内容检测脚本
 * 检测非英语页面中的英文内容，用于TDD开发
 */

// 常见的英文词汇列表 - 在非英语页面中不应该出现
const ENGLISH_INDICATORS = [
  // 常见单词
  'Memory Techniques', 'Learning Tips', 'Most Common Letters', 'Pattern Analysis',
  'Single Signal Letters', 'Symmetric Patterns', 'Complex Patterns',
  'International Usage', 'Global Standardization', 'Professional Applications',
  'Frequently Asked Questions', 'FAQ', 'Questions', 'Emergency', 'Practice',
  'Training', 'Audio', 'Visual', 'Download', 'Print', 'Chart', 'Reference',
  
  // 常见短语
  'Start with', 'Learn more', 'Click here', 'Read more', 'Get started',
  'How to', 'What is', 'Why use', 'When to', 'Where to',
  
  // 技术术语
  'morse code', 'telegraph', 'radio', 'signal', 'frequency',
  'amplitude', 'decoder', 'encoder', 'translator', 'converter',
  
  // 界面文本
  'Loading', 'Error', 'Success', 'Warning', 'Information',
  'Settings', 'Options', 'Configuration', 'Preferences',
  
  // 动作词汇
  'Upload', 'Download', 'Copy', 'Paste', 'Save', 'Load',
  'Play', 'Stop', 'Pause', 'Resume', 'Repeat'
];

// 多语言页面配置
const MULTILINGUAL_PAGES = [
  { url: '/es/sheet/morse-code-alphabet', language: 'Spanish', code: 'es' },
  { url: '/ko/sheet/morse-code-alphabet', language: 'Korean', code: 'ko' },
  { url: '/ru/sheet/morse-code-alphabet', language: 'Russian', code: 'ru' },
  { url: '/es/sheet/morse-code-numbers', language: 'Spanish', code: 'es' },
  { url: '/ko/sheet/morse-code-numbers', language: 'Korean', code: 'ko' },
  { url: '/ru/sheet/morse-code-numbers', language: 'Russian', code: 'ru' },
  { url: '/es/sheet/common-phrases', language: 'Spanish', code: 'es' },
  { url: '/ko/sheet/common-phrases', language: 'Korean', code: 'ko' },
  { url: '/ru/sheet/common-phrases', language: 'Russian', code: 'ru' },
];

async function fetchPageContent(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5175,
      path: path,
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Multilingual Content Checker)'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          content: data
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message,
        content: ''
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout',
        content: ''
      });
    });

    req.end();
  });
}

function analyzeEnglishContent(content, language) {
  const issues = [];
  
  // 移除HTML标签，获取纯文本内容
  const textContent = content
    .replace(/<script[^>]*>.*?<\/script>/gis, '') // 移除脚本
    .replace(/<style[^>]*>.*?<\/style>/gis, '')   // 移除样式
    .replace(/<[^>]*>/g, ' ')                      // 移除HTML标签
    .replace(/\s+/g, ' ')                          // 规范化空白字符
    .trim();
  
  // 检查英文指示词
  for (const indicator of ENGLISH_INDICATORS) {
    const regex = new RegExp(`\\b${indicator}\\b`, 'gi');
    const matches = textContent.match(regex);
    
    if (matches) {
      issues.push({
        type: 'english_text',
        text: indicator,
        count: matches.length,
        severity: 'high',
        suggestion: `Replace "${indicator}" with ${language} translation`
      });
    }
  }
  
  // 检查长段英文文本（连续5个以上英文单词）
  const englishSentences = textContent.match(/\b[A-Za-z]+(\s+[A-Za-z]+){4,}\b/g);
  if (englishSentences) {
    for (const sentence of englishSentences) {
      if (sentence.length > 30) { // 只报告较长的句子
        issues.push({
          type: 'english_sentence',
          text: sentence.substring(0, 100) + (sentence.length > 100 ? '...' : ''),
          severity: 'medium',
          suggestion: `Translate this English sentence to ${language}`
        });
      }
    }
  }
  
  return issues;
}

function generateFixSuggestions(url, issues) {
  const suggestions = [];
  
  if (issues.length === 0) {
    return ['✅ No English content detected - page appears properly localized'];
  }
  
  suggestions.push('🔧 Suggested fixes:');
  suggestions.push('');
  
  // 按严重程度分组
  const highSeverity = issues.filter(i => i.severity === 'high');
  const mediumSeverity = issues.filter(i => i.severity === 'medium');
  
  if (highSeverity.length > 0) {
    suggestions.push('🚨 High Priority (Hardcoded English text):');
    highSeverity.forEach((issue, index) => {
      suggestions.push(`   ${index + 1}. "${issue.text}" (${issue.count} occurrences)`);
      suggestions.push(`      → ${issue.suggestion}`);
    });
    suggestions.push('');
  }
  
  if (mediumSeverity.length > 0) {
    suggestions.push('⚠️  Medium Priority (English sentences):');
    mediumSeverity.slice(0, 3).forEach((issue, index) => { // 限制显示数量
      suggestions.push(`   ${index + 1}. "${issue.text}"`);
      suggestions.push(`      → ${issue.suggestion}`);
    });
    if (mediumSeverity.length > 3) {
      suggestions.push(`   ... and ${mediumSeverity.length - 3} more English sentences`);
    }
    suggestions.push('');
  }
  
  // 组件修复建议
  if (url.includes('morse-code-alphabet')) {
    suggestions.push('📝 Component Fix Suggestions:');
    suggestions.push('   1. Replace hardcoded text with t() function calls');
    suggestions.push('   2. Add missing translation keys to translation files');
    suggestions.push('   3. Use t("morseCodeAlphabet.section.key") pattern');
    suggestions.push('   4. Test with: npm run dev → visit ' + url);
  }
  
  return suggestions;
}

async function checkMultilingualContent() {
  console.log('🌍 多语言内容自动化检测器');
  console.log('='.repeat(60));
  console.log('目标：检测非英语页面中的英文内容，实现TDD开发');
  console.log('');
  
  let totalPages = 0;
  let issuePages = 0;
  let totalIssues = 0;
  
  for (const page of MULTILINGUAL_PAGES) {
    totalPages++;
    console.log(`📋 检测 ${page.url} (${page.language})...`);
    
    const result = await fetchPageContent(page.url);
    
    if (!result.success) {
      console.log(`  ❌ 页面加载失败: ${result.error || result.statusCode}`);
      issuePages++;
      continue;
    }
    
    const issues = analyzeEnglishContent(result.content, page.language);
    const suggestions = generateFixSuggestions(page.url, issues);
    
    if (issues.length > 0) {
      issuePages++;
      totalIssues += issues.length;
      console.log(`  ❌ 发现 ${issues.length} 个英文内容问题`);
      console.log('');
      
      // 显示修复建议
      suggestions.forEach(suggestion => {
        console.log(`    ${suggestion}`);
      });
      console.log('');
    } else {
      console.log(`  ✅ 页面本地化正确，未发现英文内容`);
    }
  }
  
  // 汇总报告
  console.log('='.repeat(60));
  console.log('📊 多语言内容检测结果');
  console.log('='.repeat(60));
  console.log(`✅ 正确本地化页面: ${totalPages - issuePages}/${totalPages}`);
  console.log(`❌ 存在英文内容页面: ${issuePages}/${totalPages}`);
  console.log(`🔍 总英文内容问题: ${totalIssues}`);
  console.log('');
  
  if (issuePages === 0) {
    console.log('🎉 所有多语言页面本地化正确！');
    console.log('💡 TDD目标达成：无英文内容泄漏');
  } else {
    console.log('❌ 部分页面存在英文内容，需要修复');
    console.log('');
    console.log('🚀 下一步TDD开发流程:');
    console.log('1. 根据上述修复建议更新组件代码');
    console.log('2. 确保翻译文件包含所有必要的key');
    console.log('3. 重新运行此测试脚本验证修复');
    console.log('4. 重复直到所有页面通过检测');
    console.log('');
    console.log('🔧 快速修复命令:');
    console.log('   node multilingual-content-checker.cjs  # 重新检测');
    console.log('   npm run dev                           # 启动开发服务器');
  }
  
  // 返回非零退出码表示测试失败
  process.exit(issuePages > 0 ? 1 : 0);
}

// 运行检测
checkMultilingualContent();