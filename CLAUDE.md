# Claude Context - Morse Code Translator

## Project Overview

A React + TypeScript application using Vite for Morse code translation with multilingual support.

## Key Features

- Real-time morse ↔ text translation
- Audio playback with customizable settings (frequency, speed, WPM)
- Image/audio morse code decoding using AI
- Visual light indicators and flashing patterns
- Multi-language interface support (English, Korean, Spanish, Russian)
- Educational resources and reference materials
- Download functionality (text files and audio files)

## Architecture

```
src/
├── components/          # React components
├── contexts/           # React contexts for state management
│   └── I18nContext.tsx         # Internationalization
├── i18n/              # Internationalization
│   └── locales/       # Translation files (en, es, ko, ru)
├── pages/             # Page components (lazy loaded)
├── utils/             # Utility functions
└── hooks/             # Custom React hooks
```

## Development Commands

- `npm run dev` - Development server (runs on port 5173)
- `npm run build` - Production build
- `npm run lint` - Code linting (includes i18n validation)
- `npm run preview` - Preview built app

## Internationalization (i18n) System

### Current Status (2025-08-17)
✅ **Complete 4-language support**: English, Korean (한국어), Spanish (Español), Russian (Русский)

### Key Implementation Details

**Translation Architecture:**
- Simple key-value translation system without built-in parameter substitution
- `t(key)` function returns raw string, parameters must be handled manually
- Structure: `src/i18n/locales/[lang]/[component].ts`

**Parameter Handling:**
```typescript
// CORRECT: Manual parameter substitution
t('shop.results.showing').replace('{count}', count.toString())

// INCORRECT: Built-in parameter system (not supported)
t('shop.results.showing', { count })
```

**Critical Lessons Learned:**

1. **Translation Structure Consistency**: All language files must have identical nested structures
2. **Array Mapping Errors**: Missing arrays in translation files cause `.map()` runtime errors
3. **Parameter Substitution**: System requires manual `.replace()` calls for dynamic content
4. **Hot Reload Issues**: I18nContext may cause Fast Refresh warnings but functionality works

### Translation File Structure

```typescript
export const componentName = {
  section: {
    key: "Translated text",
    parameterized: "Text with {parameter}",  // Use .replace() in component
    items: ["array", "of", "items"]          // Critical for .map() operations
  }
};
```

### Debugging i18n Runtime Errors

**Common Error Patterns:**
- `t(...).map is not a function` → Missing array in translation file
- `{parameter}` showing literally → Need manual `.replace()` call
- Components not updating → I18nContext hot reload issue (refresh browser)

## Recent Critical Fixes (2025-08-17)

### Shop Page Parameterized Translation Fix

**Problem**: Shop page showed literal `{count}` instead of actual numbers
**Root Cause**: I18n system lacks built-in parameter substitution
**Solution**: Manual parameter replacement in Shop.tsx

**Files Fixed:**
- `src/pages/Shop.tsx` - 5 parameterized translation calls fixed
- `src/i18n/locales/*/shop.ts` - Removed {plural} parameter, used static plurals

**Pattern Applied:**
```typescript
// Before (broken)
t('shop.results.showing', { count: filteredProducts.length })

// After (working)  
t('shop.results.showing').replace('{count}', filteredProducts.length.toString())
```

### Runtime Error Resolution Campaign

**Achievement**: Fixed all JavaScript runtime errors on multilingual pages

**Issues Resolved:**
- Missing translation array structures causing `.map()` failures
- Inconsistent nested object structures across languages
- Parameterized translations not displaying properly

**Pages Fixed**: 13+ multilingual pages across Korean, Spanish, Russian routes

## URL Standards (Static Site Generation)

**Architecture**: SSG using Vite + react-snap
- Static HTML files for each route
- Natural 404 handling for non-existent pages
- No SPA fallback needed

**URL Format Standards:**
- No www subdomain: `morse-coder.com`
- No trailing slashes: `/learn` not `/learn/`
- Multi-language routes: `/ko`, `/es`, `/ru`

## Testing Infrastructure

**Key Testing Scripts:**
- `route-config-checker.cjs` - I18n route configuration validation
- `runtime-error-test.cjs` - JavaScript runtime error detection
- `intelligent-page-test.cjs` - Content analysis testing

## Development Workflow

### Adding New Multilingual Components

1. **Create translation files** for all 4 languages with identical structure
2. **Use `useI18n()` hook** in component
3. **Handle parameters manually** with `.replace()` method
4. **Test all language routes** to verify no runtime errors
5. **Run `npm run lint`** to catch hardcoded strings

### Debugging Translation Issues

1. Check browser console for `.map()` errors
2. Verify translation file structure consistency
3. Confirm I18nProvider wrapper exists for route
4. Test parameter substitution with `.replace()`

## Important Technical Patterns

**Parameter Substitution:**
```typescript
// Single parameter
t('key').replace('{param}', value)

// Multiple parameters  
t('key').replace('{param1}', value1).replace('{param2}', value2)
```

**Array Mapping Safety:**
```typescript
// Ensure translation returns array before mapping
const items = t('section.items');
if (Array.isArray(items)) {
  items.map(item => /* render */)
}
```

## Next Steps Reminders

1. Always maintain identical translation file structures across all languages
2. Use manual parameter substitution with `.replace()`
3. Test all 4 language routes when modifying components
4. Run linting to prevent hardcoded string regressions