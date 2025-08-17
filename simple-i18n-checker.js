#!/usr/bin/env node

/**
 * Simple I18n Key Checker - 检测翻译键错误
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 查找所有源文件中的 t('...') 调用
function findTranslationKeys() {
  const srcDir = join(__dirname, 'src');
  const files = [];
  
  function scanDir(dir) {
    const items = readdirSync(dir);
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        scanDir(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(srcDir);
  
  const allKeys = new Set();
  const keyUsages = [];
  
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    // 查找 t('...') 调用，更精确的正则表达式
    const regex = /\bt\(['"`]([^'"`\n]+)['"`]\)/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const key = match[1];
      
      // 过滤掉明显不是翻译键的内容
      if (key.includes('/') || key.includes('.') && key.includes(' ') || 
          key.startsWith('http') || key.includes('GPT-') || 
          key.length < 3 || key.includes('canvas') || key === '2d' ||
          key.includes('script') || key.includes('link') ||
          key.includes('./pages/') || key === ',' || key === ' ' ||
          key.includes('Feedback on') || key.includes('Result:')) {
        continue;
      }
      
      const lineNumber = content.substring(0, match.index).split('\n').length;
      allKeys.add(key);
      keyUsages.push({
        key,
        file: file.replace(__dirname + '/', ''),
        line: lineNumber
      });
    }
  }
  
  return Array.from(allKeys);
}

// 检查韩语翻译文件是否包含关键键
function checkKoreanTranslations(keys) {
  const errors = [];
  
  try {
    // 读取韩语翻译索引文件
    const koIndexPath = join(__dirname, 'src/i18n/locales/ko/index.ts');
    const koIndexContent = readFileSync(koIndexPath, 'utf-8');
    
    // 检查一些重要的decoder键
    const importantKeys = [
      'decodeImage.mainHeading',
      'decodeImage.uploadSection.title',
      'decodeImage.results.extractedMorse',
      'decodeAudio.mainHeading',
      'decodeAudio.uploadSection.title',
      'decodeText.mainHeading',
      'txtToMorse.mainHeading'
    ];
    
    console.log('🔍 Checking important translation keys in Korean...\n');
    
    for (const key of importantKeys) {
      // 简单检查：查看韩语索引文件是否包含相关导入
      const [section] = key.split('.');
      
      if (!koIndexContent.includes(`${section}:`)) {
        errors.push({
          key,
          message: `Missing section '${section}' in Korean translations`
        });
      }
    }
    
    // 检查是否有直接的错误键引用
    const wrongKeys = keys.filter(key => key.startsWith('txtToMorse.') && !koIndexContent.includes('txtToMorse:'));
    
    for (const wrongKey of wrongKeys) {
      errors.push({
        key: wrongKey,
        message: 'txtToMorse section missing in Korean translations'
      });
    }
    
  } catch (error) {
    console.error('❌ Failed to check Korean translations:', error.message);
  }
  
  return errors;
}

// 主函数
function main() {
  console.log('🔍 Running simple i18n key check...\n');
  
  const keys = findTranslationKeys();
  console.log(`📝 Found ${keys.length} unique translation keys\n`);
  
  // 检查韩语翻译
  const errors = checkKoreanTranslations(keys);
  
  if (errors.length === 0) {
    console.log('✅ All important translation keys seem to be present!\n');
  } else {
    console.log('❌ Found potential translation issues:\n');
    
    for (const error of errors) {
      console.log(`❌ ${error.key}`);
      console.log(`   💡 ${error.message}\n`);
    }
  }
  
  // 显示一些关键的翻译键供参考
  const decoderKeys = keys.filter(key => 
    key.startsWith('decodeImage.') || 
    key.startsWith('decodeAudio.') || 
    key.startsWith('decodeText.') || 
    key.startsWith('txtToMorse.')
  ).slice(0, 10);
  
  if (decoderKeys.length > 0) {
    console.log('📋 Sample decoder translation keys found:');
    for (const key of decoderKeys) {
      console.log(`   • ${key}`);
    }
    console.log('');
  }
  
  console.log(`🎯 To test specific pages, visit:`);
  console.log(`   • http://localhost:5173/ko/decoders/decode-image`);
  console.log(`   • http://localhost:5173/ko/decoders/decode-audio`);
  console.log(`   • http://localhost:5173/ko/decoders/txt-to-morse`);
  console.log(`   • http://localhost:5173/ko/decoders/decode-text`);
}

main();