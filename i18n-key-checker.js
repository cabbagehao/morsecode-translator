#!/usr/bin/env node

/**
 * Translation Key Checker
 * 检测代码中使用的翻译键是否在翻译文件中存在
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPPORTED_LANGUAGES = ['en', 'ko', 'es', 'ru'];
const SRC_DIR = path.join(__dirname, 'src');
const I18N_DIR = path.join(__dirname, 'src/i18n/locales');

// 从代码中提取所有 t('...') 调用
function extractTranslationKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tCallRegex = /t\(['"`]([^'"`]+)['"`]\)/g;
  const keys = [];
  let match;
  
  while ((match = tCallRegex.exec(content)) !== null) {
    keys.push({
      key: match[1],
      line: content.substring(0, match.index).split('\n').length,
      file: filePath
    });
  }
  
  return keys;
}

// 递归查找所有 .tsx 和 .ts 文件
function findSourceFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// 加载翻译文件
async function loadTranslations(language) {
  try {
    const indexPath = path.join(I18N_DIR, language, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      console.warn(`⚠️  Translation index file not found: ${indexPath}`);
      return {};
    }
    
    // 动态导入翻译模块
    const moduleUrl = `file://${indexPath}`;
    const module = await import(moduleUrl);
    return module[language] || {};
  } catch (error) {
    console.error(`❌ Failed to load translations for ${language}:`, error.message);
    return {};
  }
}

// 检查键是否存在于翻译对象中
function hasTranslationKey(translations, keyPath) {
  const keys = keyPath.split('.');
  let current = translations;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return false;
    }
  }
  
  return true;
}

// 主检查函数
async function checkTranslationKeys() {
  console.log('🔍 Scanning for translation key usage...\n');
  
  // 查找所有源文件
  const sourceFiles = findSourceFiles(SRC_DIR);
  console.log(`📁 Found ${sourceFiles.length} source files`);
  
  // 提取所有翻译键
  const allKeys = [];
  for (const file of sourceFiles) {
    const keys = extractTranslationKeys(file);
    allKeys.push(...keys);
  }
  
  console.log(`🔑 Found ${allKeys.length} translation key usages\n`);
  
  // 加载所有语言的翻译
  const translations = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    translations[lang] = await loadTranslations(lang);
  }
  
  // 检查每个键
  const errors = [];
  const warnings = [];
  
  for (const keyUsage of allKeys) {
    const { key, file, line } = keyUsage;
    const relativePath = path.relative(__dirname, file);
    
    for (const lang of SUPPORTED_LANGUAGES) {
      if (!hasTranslationKey(translations[lang], key)) {
        const error = {
          key,
          language: lang,
          file: relativePath,
          line,
          severity: 'error'
        };
        
        // 检查是否可能是拼写错误
        const possibleKeys = findSimilarKeys(translations[lang], key);
        if (possibleKeys.length > 0) {
          error.suggestions = possibleKeys;
        }
        
        errors.push(error);
      }
    }
  }
  
  // 报告结果
  if (errors.length === 0) {
    console.log('✅ All translation keys are valid!');
  } else {
    console.log(`❌ Found ${errors.length} missing translation keys:\n`);
    
    // 按语言分组错误
    const errorsByLang = {};
    errors.forEach(error => {
      if (!errorsByLang[error.language]) {
        errorsByLang[error.language] = [];
      }
      errorsByLang[error.language].push(error);
    });
    
    for (const [lang, langErrors] of Object.entries(errorsByLang)) {
      console.log(`\n🌐 Language: ${lang.toUpperCase()}`);
      console.log('─'.repeat(50));
      
      langErrors.forEach(error => {
        console.log(`❌ Missing key: ${error.key}`);
        console.log(`   📁 File: ${error.file}:${error.line}`);
        
        if (error.suggestions && error.suggestions.length > 0) {
          console.log(`   💡 Similar keys: ${error.suggestions.join(', ')}`);
        }
        console.log('');
      });
    }
    
    console.log(`\n🔧 To fix these issues:`);
    console.log('1. Add missing translation keys to the respective language files');
    console.log('2. Check for typos in translation key names');
    console.log('3. Ensure all languages have consistent key structures\n');
    
    process.exit(1);
  }
}

// 查找相似的键（简单的编辑距离）
function findSimilarKeys(translations, targetKey, maxDistance = 2) {
  const allKeys = getAllKeysFromObject(translations);
  const similar = [];
  
  for (const key of allKeys) {
    if (levenshteinDistance(key, targetKey) <= maxDistance) {
      similar.push(key);
    }
  }
  
  return similar.slice(0, 3); // 最多返回3个建议
}

// 从翻译对象中获取所有键路径
function getAllKeysFromObject(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getAllKeysFromObject(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// 简单的编辑距离计算
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// 运行检查
checkTranslationKeys().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});