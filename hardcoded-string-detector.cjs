#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 配置需要检查的文件类型和目录
const CONFIG = {
  srcDir: './src',
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  // 排除的目录
  excludeDirs: ['node_modules', 'dist', 'build', '.git'],
  // 排除的文件模式
  excludeFiles: [
    'vite-env.d.ts',
    'main.tsx',
    '*.test.ts',
    '*.test.tsx'
  ],
  // 需要检查的字符串模式
  patterns: {
    // JSX中的硬编码文本 (排除单个字符和数字)
    jsxText: />([^<>{}\n]*[a-zA-Z]{2,}[^<>{}\n]*)</,
    // 字符串字面量 (排除短字符串和技术性字符串)
    stringLiterals: /['"`]([^'"`\n]{3,}[a-zA-Z][^'"`\n]*?)['"`]/g,
    // title, placeholder, aria-label等属性
    attributes: /(title|placeholder|aria-label|alt)=['"`]([^'"`\n]{2,}[a-zA-Z][^'"`\n]*?)['"`]/g,
  },
  // 白名单 - 这些字符串可以忽略
  whitelist: [
    // 技术性字符串
    'useState', 'useEffect', 'useCallback', 'useMemo',
    'className', 'onClick', 'onChange', 'onSubmit',
    'text-', 'bg-', 'border-', 'rounded-', 'flex-', 'w-', 'h-',
    'morse', 'code', 'audio', 'image', 'text', 'sound',
    'http', 'https', 'www', 'com', 'org',
    'px', 'rem', 'em', '%', 'vh', 'vw',
    'rgb', 'rgba', 'hex',
    'json', 'xml', 'html', 'css', 'js', 'ts',
    // 单个字符或数字
    /^[a-zA-Z0-9]$/,
    // CSS类名模式
    /^[a-z-]+$/,
    // 技术参数
    'id', 'key', 'ref', 'src', 'href', 'type', 'name', 'value',
    // 常见的单词
    'div', 'span', 'button', 'input', 'form', 'img',
    // 你的项目特定白名单
    'MorseCodeTranslator', 'Layout', 'Navigation',
    'favicon.ico', 'robots.txt', 'sitemap.xml'
  ]
};

class HardcodedStringDetector {
  constructor() {
    this.issues = [];
    this.checkedFiles = 0;
  }

  // 检查字符串是否在白名单中
  isWhitelisted(str) {
    const trimmed = str.trim();
    return CONFIG.whitelist.some(item => {
      if (typeof item === 'string') {
        return trimmed === item || trimmed.toLowerCase() === item.toLowerCase();
      }
      if (item instanceof RegExp) {
        return item.test(trimmed);
      }
      return false;
    });
  }

  // 检查是否是技术性字符串
  isTechnicalString(str) {
    const trimmed = str.trim();
    
    // 空字符串或太短
    if (trimmed.length < 2) return true;
    
    // 只包含数字、符号
    if (!/[a-zA-Z]/.test(trimmed)) return true;
    
    // CSS类名模式
    if (/^[a-z-]+$/.test(trimmed)) return true;
    
    // 技术关键词
    const techKeywords = ['useState', 'className', 'onClick', 'morse', 'code'];
    if (techKeywords.some(keyword => trimmed.includes(keyword))) return true;
    
    return false;
  }

  // 检查单个文件
  checkFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      this.checkedFiles++;
      
      // 检查JSX文本内容
      this.checkJSXText(content, relativePath);
      
      // 检查字符串字面量
      this.checkStringLiterals(content, relativePath);
      
      // 检查HTML属性
      this.checkAttributes(content, relativePath);
      
    } catch (error) {
      console.error(`读取文件失败: ${filePath}`, error.message);
    }
  }

  // 检查JSX中的文本内容
  checkJSXText(content, filePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const matches = line.match(CONFIG.patterns.jsxText);
      if (matches) {
        matches.forEach(match => {
          const text = match.replace(/^>/, '').replace(/<$/, '').trim();
          
          if (text && 
              !this.isWhitelisted(text) && 
              !this.isTechnicalString(text) &&
              text.length > 1 &&
              /[a-zA-Z]{2,}/.test(text)) {
            
            this.issues.push({
              file: filePath,
              line: index + 1,
              type: 'JSX Text',
              content: text,
              context: line.trim(),
              suggestion: `考虑使用: {t('someKey')}`
            });
          }
        });
      }
    });
  }

  // 检查字符串字面量
  checkStringLiterals(content, filePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      let match;
      const regex = new RegExp(CONFIG.patterns.stringLiterals);
      
      while ((match = regex.exec(line)) !== null) {
        const text = match[1];
        
        if (text && 
            !this.isWhitelisted(text) && 
            !this.isTechnicalString(text) &&
            text.length > 2 &&
            /[a-zA-Z]{2,}/.test(text) &&
            !line.includes('t(') && // 已经使用了翻译函数
            !line.includes('import') && // 排除import语句
            !line.includes('console.') // 排除console语句
        ) {
          
          this.issues.push({
            file: filePath,
            line: index + 1,
            type: 'String Literal',
            content: text,
            context: line.trim(),
            suggestion: `考虑使用: t('someKey') 替代 "${text}"`
          });
        }
      }
    });
  }

  // 检查HTML属性
  checkAttributes(content, filePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      let match;
      const regex = new RegExp(CONFIG.patterns.attributes, 'g');
      
      while ((match = regex.exec(line)) !== null) {
        const attr = match[1];
        const text = match[2];
        
        if (text && 
            !this.isWhitelisted(text) && 
            !this.isTechnicalString(text) &&
            text.length > 1) {
          
          this.issues.push({
            file: filePath,
            line: index + 1,
            type: `Attribute (${attr})`,
            content: text,
            context: line.trim(),
            suggestion: `考虑使用: ${attr}={t('someKey')}`
          });
        }
      }
    });
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
    console.log('🔍 开始检测硬编码字符串...\n');
    
    this.scanDirectory(CONFIG.srcDir);
    
    console.log(`✅ 检查完成! 共检查了 ${this.checkedFiles} 个文件`);
    console.log(`🚨 发现 ${this.issues.length} 个潜在的硬编码字符串\n`);
    
    if (this.issues.length > 0) {
      this.printReport();
    } else {
      console.log('🎉 恭喜! 没有发现硬编码字符串问题!');
    }
  }

  // 打印报告
  printReport() {
    // 按文件分组
    const groupedByFile = this.issues.reduce((acc, issue) => {
      if (!acc[issue.file]) {
        acc[issue.file] = [];
      }
      acc[issue.file].push(issue);
      return acc;
    }, {});

    Object.entries(groupedByFile).forEach(([file, issues]) => {
      console.log(`\n📄 ${file} (${issues.length} 个问题):`);
      console.log('─'.repeat(60));
      
      issues.forEach(issue => {
        console.log(`  ⚠️  行 ${issue.line} [${issue.type}]`);
        console.log(`     内容: "${issue.content}"`);
        console.log(`     上下文: ${issue.context}`);
        console.log(`     建议: ${issue.suggestion}`);
        console.log('');
      });
    });

    // 统计报告
    console.log('\n📊 统计报告:');
    console.log('─'.repeat(40));
    const typeStats = this.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} 个`);
    });
  }
}

// 运行检测
if (require.main === module) {
  const detector = new HardcodedStringDetector();
  detector.run();
}

module.exports = HardcodedStringDetector;