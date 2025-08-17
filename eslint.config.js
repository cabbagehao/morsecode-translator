import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import i18next from 'eslint-plugin-i18next';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'i18next': i18next,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // i18next 规则来检测硬编码字符串
      'i18next/no-literal-string': [
        'warn',
        {
          // 标记需要翻译的字符串
          markupOnly: true, // 只检查 JSX 中的文本
          // 忽略的属性
          ignoreAttribute: [
            'className', 'style', 'data-testid', 'key', 'id', 'role', 'type',
            'aria-hidden', 'aria-expanded', 'aria-controls', 'href', 'src'
          ],
          // 忽略包含这些文本的字符串
          ignore: [
            // 技术性字符串
            'morse', 'code', 'audio', 'image', 'text', 'sound',
            'ArrowDownUp', 'Play', 'Pause', 'Download', 'Upload',
            'favicon.ico', 'robots.txt', 'sitemap.xml',
            // CSS 相关
            'px', 'rem', 'em', '%', 'vh', 'vw',
            // 常见单词
            'div', 'span', 'button', 'input', 'form',
            // 数字和单个字符
            /^\d+$/,
            /^[a-zA-Z]$/
          ]
        }
      ]
    },
  }
);
