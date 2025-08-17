#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 智能国际化检测工具 - 专注于需要翻译的用户界面文本
const CONFIG = {
  srcDir: './src',
  fileExtensions: ['.tsx', '.ts'],
  excludeDirs: ['node_modules', 'dist', 'build', '.git'],
  excludeFiles: [
    'vite-env.d.ts',
    'main.tsx',
    '*.test.ts',
    '*.test.tsx',
    'morseCode.ts' // 工具函数，不需要国际化
  ],
  
  // 需要重点检查的模式
  userFacingPatterns: {
    // JSX 文本内容（用户看到的文本）
    jsxText: />([^<>{}\n]*[a-zA-Z][^<>{}\n]*?)</g,
    // HTML 属性中的用户文本
    userAttributes: /(title|placeholder|aria-label|alt)=['"`]([^'"`\n]+?)['"`]/g,
    // 字符串字面量（但排除技术性字符串）
    stringLiterals: /['"`]([^'"`\n]{4,}[a-zA-Z][^'"`\n]*?)['"`]/g,
  },

  // 技术性白名单 - 这些不需要国际化
  technicalWhitelist: [
    // React/JavaScript 技术词汇
    'useState', 'useEffect', 'useCallback', 'useMemo', 'useContext', 'useRef',
    'className', 'onClick', 'onChange', 'onSubmit', 'onFocus', 'onBlur',
    'console.log', 'console.error', 'console.warn',
    
    // CSS 类名模式
    /^[a-z-\s:]+$/,
    /^[a-z\s-]*\d+[a-z\s-]*$/,
    
    // 技术性字符串
    'morse', 'code', 'audio', 'image', 'text', 'sound', 'decode', 'encode',
    'http', 'https', 'www', 'com', 'org', 'net',
    'json', 'xml', 'html', 'css', 'js', 'ts', 'tsx', 'jsx',
    'px', 'rem', 'em', '%', 'vh', 'vw', 'deg',
    'rgb', 'rgba', 'hex', 'hsl',
    
    // HTML 属性和值
    'id', 'key', 'ref', 'src', 'href', 'type', 'name', 'value', 'role',
    'div', 'span', 'button', 'input', 'form', 'img', 'svg', 'path',
    'aria-hidden', 'aria-expanded', 'aria-controls',
    
    // 已经使用了翻译的内容（包含 t( 调用）
    /.*t\(.*\).*/,
    
    // 文件路径和技术路径
    /^\/[a-z-\/]+$/,
    '/decoders/', '/sheet/', '/learn/',
    
    // 项目特定技术词汇
    'MorseCodeTranslator', 'Layout', 'Navigation', 'TranslatorBox',
    'favicon.ico', 'robots.txt', 'sitemap.xml',
    'ArrowDownUp', 'Play', 'Pause', 'Download',
    
    // 错误和调试相关（这些可能需要国际化，但优先级较低）
    'error', 'Error', 'warning', 'Warning', 'debug', 'Debug',
    
    // 短字符串和单字符
    /^.{1,2}$/,
    
    // 纯数字或符号
    /^[0-9\s\-\.\,\(\)]+$/,
    
    // 特殊格式字符串
    /^[A-Z_]+$/, // 常量名
  ],

  // 用户界面文本模式 - 这些应该被国际化
  uiTextPatterns: [
    // 常见的用户界面词汇
    /\b(welcome|hello|goodbye|thank you|please|sorry|error|success|loading|save|cancel|submit|delete|edit|add|remove|update|create|search|filter|sort|help|about|contact|home|back|next|previous|more|less|show|hide|open|close|start|stop|pause|play|download|upload|import|export|print|copy|paste|cut|select|all|none|clear|reset|refresh|reload|retry|confirm|ok|yes|no|maybe|true|false)\b/i,
    
    // 标题和标签
    /^[A-Z][a-z\s]*:?$/,
    
    // 句子（包含空格和标点）
    /^[A-Z][^A-Z]*[.!?]$/,
    
    // 问题文本
    /^[A-Z][^?]*\?$/,
    
    // 多词描述
    /^[A-Z][a-z]*\s+[a-z]/,
  ],

  // 需要特别关注的文件（通常包含更多用户界面文本）
  priorityFiles: [
    'App.tsx',
    'Layout.tsx',
    'Navigation.tsx',
    'TranslatorBox.tsx',
    'Instructions.tsx'
  ]
};

class SmartI18nChecker {
  constructor() {
    this.issues = [];
    this.checkedFiles = 0;
    this.priorityIssues = [];
  }

  // 检查是否是技术性字符串
  isTechnical(str) {
    const trimmed = str.trim();
    
    // 空字符串或太短
    if (trimmed.length < 3) return true;
    
    // 检查白名单
    return CONFIG.technicalWhitelist.some(item => {
      if (typeof item === 'string') {
        return trimmed === item || trimmed.toLowerCase() === item.toLowerCase() || trimmed.includes(item);
      }
      if (item instanceof RegExp) {
        return item.test(trimmed);
      }
      return false;
    });
  }

  // 检查是否可能是用户界面文本
  isLikelyUIText(str) {
    const trimmed = str.trim();
    
    return CONFIG.uiTextPatterns.some(pattern => pattern.test(trimmed));
  }

  // 分析行的上下文，判断是否可能需要国际化
  analyzeContext(line) {
    const context = {
      hasTranslationCall: line.includes('t('),
      isJSX: line.includes('<') && line.includes('>'),
      isAttribute: /title=|placeholder=|aria-label=|alt=/.test(line),
      isComponent: /^import|^export|^const|^function/.test(line.trim()),
      isComment: line.trim().startsWith('//') || line.trim().startsWith('/*'),
      isConsole: line.includes('console.'),
      isClassname: line.includes('className='),
      isUrl: /https?:\/\//.test(line),
    };
    
    return context;
  }

  // 检查单个文件
  checkFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      const fileName = path.basename(filePath);
      const isPriorityFile = CONFIG.priorityFiles.includes(fileName);
      
      this.checkedFiles++;
      
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        this.checkLineForUIText(line, index + 1, relativePath, isPriorityFile);
      });
      
    } catch (error) {
      console.error(`读取文件失败: ${filePath}`, error.message);
    }
  }

  // 检查行中的用户界面文本
  checkLineForUIText(line, lineNumber, filePath, isPriorityFile) {
    const context = this.analyzeContext(line);
    
    // 跳过已经使用翻译的行
    if (context.hasTranslationCall) return;
    
    // 跳过技术性行
    if (context.isComponent || context.isComment || context.isConsole) return;
    
    // 检查 JSX 文本内容
    if (context.isJSX) {
      this.checkJSXContent(line, lineNumber, filePath, isPriorityFile);
    }
    
    // 检查属性
    if (context.isAttribute) {
      this.checkAttributeContent(line, lineNumber, filePath, isPriorityFile);
    }
    
    // 检查字符串字面量
    this.checkStringLiterals(line, lineNumber, filePath, isPriorityFile, context);
  }

  // 检查 JSX 内容
  checkJSXContent(line, lineNumber, filePath, isPriorityFile) {
    const regex = CONFIG.userFacingPatterns.jsxText;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const text = match[1].trim();
      
      if (this.shouldReportText(text)) {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          type: 'JSX Content',
          content: text,
          context: line.trim(),
          priority: isPriorityFile ? 'high' : 'medium',
          suggestion: `{t('${this.generateTranslationKey(text)}')}`,
          confidence: this.isLikelyUIText(text) ? 'high' : 'medium'
        }, isPriorityFile);
      }
    }
  }

  // 检查属性内容
  checkAttributeContent(line, lineNumber, filePath, isPriorityFile) {
    const regex = CONFIG.userFacingPatterns.userAttributes;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const attr = match[1];
      const text = match[2].trim();
      
      if (this.shouldReportText(text)) {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          type: `Attribute (${attr})`,
          content: text,
          context: line.trim(),
          priority: 'high', // 属性文本通常都是用户界面文本
          suggestion: `${attr}={t('${this.generateTranslationKey(text)}')}`,
          confidence: 'high'
        }, isPriorityFile);
      }
    }
  }

  // 检查字符串字面量
  checkStringLiterals(line, lineNumber, filePath, isPriorityFile, context) {
    // 跳过 className 和技术性行
    if (context.isClassname || context.isUrl) return;
    
    const regex = CONFIG.userFacingPatterns.stringLiterals;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const text = match[1].trim();
      
      if (this.shouldReportText(text) && this.isLikelyUIText(text)) {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          type: 'String Literal',
          content: text,
          context: line.trim(),
          priority: isPriorityFile ? 'medium' : 'low',
          suggestion: `t('${this.generateTranslationKey(text)}')`,
          confidence: 'medium'
        }, isPriorityFile);
      }
    }
  }

  // 判断是否应该报告这个文本
  shouldReportText(text) {
    return text.length > 2 && 
           !this.isTechnical(text) && 
           /[a-zA-Z]/.test(text) &&
           !/^\d+$/.test(text);
  }

  // 生成翻译键名
  generateTranslationKey(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 30);
  }

  // 添加问题
  addIssue(issue, isPriorityFile) {
    this.issues.push(issue);
    if (isPriorityFile || issue.priority === 'high') {
      this.priorityIssues.push(issue);
    }
  }

  // 递归扫描目录
  scanDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!CONFIG.excludeDirs.includes(item)) {
            this.scanDirectory(fullPath);
          }
        } else if (stat.isFile()) {
          const ext = path.extname(fullPath);
          const shouldCheck = CONFIG.fileExtensions.includes(ext) &&
                            !CONFIG.excludeFiles.some(pattern => {
                              if (pattern.includes('*')) {
                                const regex = new RegExp(pattern.replace('*', '.*'));
                                return regex.test(fullPath);
                              }
                              return fullPath.includes(pattern);
                            });
          
          if (shouldCheck) {
            this.checkFile(fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`扫描目录失败: ${dir}`, error.message);
    }
  }

  // 运行检测
  run() {
    console.log('🌍 智能国际化检测工具启动...\n');
    
    this.scanDirectory(CONFIG.srcDir);
    
    console.log(`✅ 检查完成! 共检查了 ${this.checkedFiles} 个文件`);
    console.log(`🚨 发现 ${this.issues.length} 个可能需要国际化的文本`);
    console.log(`⚡ 其中 ${this.priorityIssues.length} 个高优先级问题\n`);
    
    if (this.priorityIssues.length > 0) {
      this.printPriorityReport();
    }
    
    if (this.issues.length > 0) {
      this.printFullReport();
    } else {
      console.log('🎉 恭喜! 没有发现需要国际化的文本!');
    }
  }

  // 打印优先级报告
  printPriorityReport() {
    console.log('🔥 高优先级国际化问题:');
    console.log('═'.repeat(60));
    
    const priorityByFile = this.priorityIssues.reduce((acc, issue) => {
      if (!acc[issue.file]) {
        acc[issue.file] = [];
      }
      acc[issue.file].push(issue);
      return acc;
    }, {});

    Object.entries(priorityByFile).forEach(([file, issues]) => {
      console.log(`\n📄 ${file} (${issues.length} 个高优先级问题):`);
      
      issues.forEach(issue => {
        const priorityEmoji = issue.priority === 'high' ? '🔴' : issue.priority === 'medium' ? '🟡' : '🟢';
        const confidenceEmoji = issue.confidence === 'high' ? '💯' : issue.confidence === 'medium' ? '🎯' : '❓';
        
        console.log(`  ${priorityEmoji} ${confidenceEmoji} 行 ${issue.line} [${issue.type}]`);
        console.log(`     文本: "${issue.content}"`);
        console.log(`     建议: ${issue.suggestion}`);
        console.log('');
      });
    });
  }

  // 打印完整报告
  printFullReport() {
    console.log('\n📊 完整统计报告:');
    console.log('─'.repeat(40));
    
    // 按优先级统计
    const priorityStats = this.issues.reduce((acc, issue) => {
      acc[issue.priority] = (acc[issue.priority] || 0) + 1;
      return acc;
    }, {});
    
    console.log('优先级分布:');
    Object.entries(priorityStats).forEach(([priority, count]) => {
      const emoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';
      console.log(`  ${emoji} ${priority}: ${count} 个`);
    });
    
    // 按类型统计
    const typeStats = this.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n类型分布:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  📝 ${type}: ${count} 个`);
    });

    // 按文件统计
    const fileStats = this.issues.reduce((acc, issue) => {
      acc[issue.file] = (acc[issue.file] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n文件分布 (显示前10个):');
    Object.entries(fileStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([file, count]) => {
        const isPriority = CONFIG.priorityFiles.includes(path.basename(file));
        const emoji = isPriority ? '⭐' : '📄';
        console.log(`  ${emoji} ${file}: ${count} 个`);
      });

    console.log(`\n💡 建议: 优先处理标记为 🔴 高优先级和 ⭐ 重要文件的问题`);
  }
}

// 运行检测
if (require.main === module) {
  const checker = new SmartI18nChecker();
  checker.run();
}

module.exports = SmartI18nChecker;