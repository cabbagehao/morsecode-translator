const fs = require('fs');
const path = require('path');

/**
 * 路由配置检查器 - 检测缺少I18nProvider的路由
 * 这个脚本通过静态分析App.tsx来检测可能的I18n配置问题
 */

class RouteConfigChecker {
  constructor() {
    this.appTsxPath = path.join(__dirname, 'src/App.tsx');
    this.issues = [];
    this.routes = [];
  }

  async checkRouteConfig() {
    console.log('🔍 检查路由配置中的I18n Provider问题...\n');
    
    try {
      const appTsxContent = fs.readFileSync(this.appTsxPath, 'utf8');
      this.analyzeRoutes(appTsxContent);
      this.findI18nIssues();
      this.reportResults();
      
      return this.issues.length === 0;
    } catch (error) {
      console.error('❌ 无法读取App.tsx文件:', error.message);
      return false;
    }
  }

  analyzeRoutes(content) {
    // 提取所有Route定义
    const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\s*\/>/g;
    let match;
    
    while ((match = routeRegex.exec(content)) !== null) {
      const routePath = match[1];
      const elementContent = match[2];
      
      this.routes.push({
        path: routePath,
        element: elementContent,
        hasI18nProvider: elementContent.includes('I18nProvider'),
        hasLazyRoute: elementContent.includes('LazyRoute')
      });
    }
    
    console.log(`📋 找到 ${this.routes.length} 个路由定义`);
  }

  findI18nIssues() {
    // 检查需要I18n的页面组件
    const componentsNeedingI18n = [
      'Learn', 'Sheet', 'BasicAndTips', 'History', 'MorseCodeSheet',
      'CommonWords', 'CommonPhrases', 'CommonAbbr', 'MorseCodeAlphabet', 'MorseCodeNumbers'
    ];

    for (const route of this.routes) {
      // 检查是否包含需要I18n的组件
      const needsI18n = componentsNeedingI18n.some(component => 
        route.element.includes(`<${component}`) || route.element.includes(`${component} `)
      );

      if (needsI18n && !route.hasI18nProvider) {
        this.issues.push({
          type: 'MISSING_I18N_PROVIDER',
          path: route.path,
          element: route.element,
          description: `路由 "${route.path}" 包含需要I18n的组件但缺少I18nProvider包裹`
        });
      }

      // 特别检查直接使用组件名的情况
      if (route.element.includes('<Sheet') && !route.hasI18nProvider) {
        this.issues.push({
          type: 'SHEET_MISSING_I18N',
          path: route.path,
          element: route.element,
          description: `Sheet组件路由 "${route.path}" 缺少I18nProvider - 这会导致useI18n错误`
        });
      }
    }

    // 检查多语言路由的一致性
    this.checkMultilingualConsistency();
  }

  checkMultilingualConsistency() {
    const languageRoutes = {
      en: this.routes.filter(r => !r.path.startsWith('/ko') && !r.path.startsWith('/es') && !r.path.startsWith('/ru')),
      ko: this.routes.filter(r => r.path.startsWith('/ko')),
      es: this.routes.filter(r => r.path.startsWith('/es')),
      ru: this.routes.filter(r => r.path.startsWith('/ru'))
    };

    // 检查英语版本是否有相应的多语言版本
    for (const enRoute of languageRoutes.en) {
      if (enRoute.hasI18nProvider) {
        const basePath = enRoute.path;
        
        // 检查是否有对应的多语言版本
        ['ko', 'es', 'ru'].forEach(lang => {
          const expectedPath = `/${lang}${basePath}`;
          const hasMultilingualVersion = languageRoutes[lang].some(r => r.path === expectedPath);
          
          if (!hasMultilingualVersion && basePath !== '/') {
            this.issues.push({
              type: 'MISSING_MULTILINGUAL_ROUTE',
              path: expectedPath,
              element: '',
              description: `缺少多语言路由: "${expectedPath}" (对应英语路由 "${basePath}")`
            });
          }
        });
      }
    }
  }

  reportResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 路由配置检查结果');
    console.log('='.repeat(60));

    if (this.issues.length === 0) {
      console.log('✅ 路由配置检查通过，未发现I18n相关问题');
    } else {
      console.log(`❌ 发现 ${this.issues.length} 个配置问题:\n`);

      // 按类型分组显示问题
      const issuesByType = {};
      this.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
          issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push(issue);
      });

      Object.entries(issuesByType).forEach(([type, issues]) => {
        console.log(`🔥 ${type}:`);
        issues.forEach(issue => {
          console.log(`  - ${issue.path}: ${issue.description}`);
        });
        console.log();
      });

      // 特别突出Sheet组件的问题
      const sheetIssues = this.issues.filter(issue => issue.type === 'SHEET_MISSING_I18N');
      if (sheetIssues.length > 0) {
        console.log('🚨 紧急修复建议:');
        sheetIssues.forEach(issue => {
          console.log(`  ⚡ ${issue.path} - 立即添加I18nProvider包裹`);
        });
        console.log();
      }
    }

    console.log('📋 路由配置统计:');
    console.log(`  📄 总路由数: ${this.routes.length}`);
    console.log(`  🌍 包含I18nProvider: ${this.routes.filter(r => r.hasI18nProvider).length}`);
    console.log(`  ⚡ 懒加载路由: ${this.routes.filter(r => r.hasLazyRoute).length}`);

    if (this.issues.length > 0) {
      console.log('\n🔧 修复建议:');
      console.log('1. 为缺少I18nProvider的路由添加包裹');
      console.log('2. 确保所有使用useI18n的组件都有正确的Provider');
      console.log('3. 检查多语言路由的一致性');
      console.log('4. 修复后重新运行此检查器');
    }
  }

  // 生成修复建议
  generateFixSuggestions() {
    const fixes = [];
    
    this.issues.forEach(issue => {
      if (issue.type === 'MISSING_I18N_PROVIDER' || issue.type === 'SHEET_MISSING_I18N') {
        fixes.push({
          path: issue.path,
          currentElement: issue.element,
          suggestedFix: this.generateI18nWrapperFix(issue.element)
        });
      }
    });

    return fixes;
  }

  generateI18nWrapperFix(element) {
    // 为元素添加I18nProvider包裹的建议
    if (element.includes('LazyRoute')) {
      return element.replace(/(<LazyRoute>)([^<]+)(<\/LazyRoute>)/, 
        '$1<I18nProvider initialLocale="en">$2</I18nProvider>$3');
    } else {
      return `<I18nProvider initialLocale="en">${element}</I18nProvider>`;
    }
  }
}

// 运行检查
async function runCheck() {
  const checker = new RouteConfigChecker();
  
  try {
    const success = await checker.checkRouteConfig();
    
    if (!success && checker.issues.length > 0) {
      console.log('\n🛠️  自动修复建议:');
      const fixes = checker.generateFixSuggestions();
      fixes.forEach((fix, index) => {
        console.log(`\n${index + 1}. 路由 "${fix.path}":`);
        console.log(`   当前: ${fix.currentElement}`);
        console.log(`   建议: ${fix.suggestedFix}`);
      });
    }
    
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ 检查过程中发生错误:', error);
    process.exit(1);
  }
}

runCheck();