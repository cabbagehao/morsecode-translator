const fs = require('fs');
const path = require('path');

/**
 * Translation Key Validation Script
 * 
 * This script validates that all translation files across different languages
 * have consistent key structures compared to the English baseline.
 */

const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');
const LANGUAGES = ['en', 'ko', 'es', 'ru'];
const BASE_LANG = 'en';

/**
 * Recursively extract all keys from a translation object
 */
function extractKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Load and parse a translation file
 */
function loadTranslationFile(lang, filename) {
  const filePath = path.join(LOCALES_DIR, lang, filename);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    // Read the file content and remove TypeScript/ES6 syntax
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Handle ES6 export syntax
    content = content.replace(/export\s+const\s+\w+\s*=\s*/, '');
    content = content.replace(/;\s*$/, '');
    
    // Basic eval to get the object (note: this is safe for known translation files)
    const translationObj = eval(`(${content})`);
    return translationObj;
  } catch (error) {
    console.error(`❌ Error parsing ${lang}/${filename}:`, error.message);
    return null;
  }
}

/**
 * Get all translation files from the base language directory
 */
function getTranslationFiles() {
  const enDir = path.join(LOCALES_DIR, BASE_LANG);
  return fs.readdirSync(enDir)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .sort();
}

/**
 * Validate keys for a specific translation file across all languages
 */
function validateFileKeys(filename) {
  console.log(`\n📄 Validating file: ${filename}`);
  console.log('='.repeat(50));
  
  // Load base language file
  const baseTranslation = loadTranslationFile(BASE_LANG, filename);
  if (!baseTranslation) {
    console.log(`❌ Could not load base file: ${BASE_LANG}/${filename}`);
    return { hasErrors: true, missingKeys: {}, extraKeys: {} };
  }
  
  const baseKeys = extractKeys(baseTranslation).sort();
  console.log(`📊 Base (${BASE_LANG}) has ${baseKeys.length} keys`);
  
  const results = {
    hasErrors: false,
    missingKeys: {},
    extraKeys: {}
  };
  
  // Check each target language
  for (const lang of LANGUAGES) {
    if (lang === BASE_LANG) continue;
    
    const translation = loadTranslationFile(lang, filename);
    
    if (!translation) {
      console.log(`❌ ${lang}: File missing or could not be parsed`);
      results.hasErrors = true;
      results.missingKeys[lang] = baseKeys;
      continue;
    }
    
    const langKeys = extractKeys(translation).sort();
    
    // Find missing keys (in base but not in target)
    const missing = baseKeys.filter(key => !langKeys.includes(key));
    
    // Find extra keys (in target but not in base)  
    const extra = langKeys.filter(key => !baseKeys.includes(key));
    
    if (missing.length === 0 && extra.length === 0) {
      console.log(`✅ ${lang}: Perfect match (${langKeys.length} keys)`);
    } else {
      console.log(`⚠️  ${lang}: Has issues (${langKeys.length} keys)`);
      results.hasErrors = true;
      
      if (missing.length > 0) {
        console.log(`   📉 Missing ${missing.length} keys:`);
        missing.slice(0, 10).forEach(key => console.log(`      - ${key}`));
        if (missing.length > 10) {
          console.log(`      ... and ${missing.length - 10} more`);
        }
        results.missingKeys[lang] = missing;
      }
      
      if (extra.length > 0) {
        console.log(`   📈 Extra ${extra.length} keys:`);
        extra.slice(0, 10).forEach(key => console.log(`      + ${key}`));
        if (extra.length > 10) {
          console.log(`      ... and ${extra.length - 10} more`);
        }
        results.extraKeys[lang] = extra;
      }
    }
  }
  
  return results;
}

/**
 * Generate detailed report for missing/extra keys
 */
function generateDetailedReport(allResults) {
  console.log('\n' + '='.repeat(80));
  console.log('📋 DETAILED VALIDATION REPORT');
  console.log('='.repeat(80));
  
  let hasAnyErrors = false;
  
  for (const [filename, results] of Object.entries(allResults)) {
    if (!results.hasErrors) continue;
    
    hasAnyErrors = true;
    console.log(`\n📄 ${filename}:`);
    
    // Report missing keys by language
    for (const [lang, missingKeys] of Object.entries(results.missingKeys)) {
      if (missingKeys.length === 0) continue;
      
      console.log(`\n  ❌ ${lang} missing keys (${missingKeys.length}):`);
      missingKeys.forEach(key => console.log(`     - ${key}`));
    }
    
    // Report extra keys by language
    for (const [lang, extraKeys] of Object.entries(results.extraKeys)) {
      if (extraKeys.length === 0) continue;
      
      console.log(`\n  ➕ ${lang} extra keys (${extraKeys.length}):`);
      extraKeys.forEach(key => console.log(`     + ${key}`));
    }
  }
  
  if (!hasAnyErrors) {
    console.log('\n🎉 All translation files have consistent key structures!');
  }
  
  return hasAnyErrors;
}

/**
 * Main validation function
 */
function validateAllTranslations() {
  console.log('🔍 Starting Translation Key Validation');
  console.log(`📁 Checking languages: ${LANGUAGES.join(', ')}`);
  console.log(`📊 Base language: ${BASE_LANG}`);
  
  const translationFiles = getTranslationFiles();
  console.log(`📄 Found ${translationFiles.length} translation files to validate`);
  
  const allResults = {};
  
  // Validate each file
  for (const filename of translationFiles) {
    allResults[filename] = validateFileKeys(filename);
  }
  
  // Generate summary
  const filesWithErrors = Object.values(allResults).filter(r => r.hasErrors).length;
  const totalFiles = translationFiles.length;
  
  console.log(`\n📊 SUMMARY: ${totalFiles - filesWithErrors}/${totalFiles} files have consistent keys`);
  
  if (filesWithErrors > 0) {
    console.log(`⚠️  ${filesWithErrors} files have key mismatches`);
    generateDetailedReport(allResults);
    process.exit(1);
  } else {
    console.log('✅ All translation files are properly synchronized!');
    process.exit(0);
  }
}

// Run validation
if (require.main === module) {
  validateAllTranslations();
}

module.exports = { validateAllTranslations, extractKeys, loadTranslationFile };