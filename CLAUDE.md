不存在的页面返回404

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
│   ├── TranslatorBox.tsx       # Main translation input/output component
│   ├── TranslatorI18n.tsx      # Internationalized translator component
│   ├── Layout.tsx              # Page layout wrapper
│   ├── Instructions.tsx        # Usage instructions
│   └── MorseAudioSettings.tsx  # Audio configuration modal
├── contexts/           # React contexts for state management
│   ├── TranslatorContext.tsx   # Translation state
│   ├── MorseSettingsContext.tsx # Audio settings and playback
│   └── I18nContext.tsx         # Internationalization
├── i18n/              # Internationalization
│   └── locales/       # Translation files
│       ├── en.ts      # English translations
│       ├── es.ts      # Spanish translations  
│       ├── ko.ts      # Korean translations
│       └── ru.ts      # Russian translations
├── pages/             # Page components (lazy loaded)
├── utils/             # Utility functions
│   └── morseCode.ts   # Morse code conversion logic
└── hooks/             # Custom React hooks
```

## Development Commands

- `npm run dev` - Development server (runs on port 5173)
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm run preview` - Preview built app

## URL Standards and Redirect Rules

**Established 2025-01-29** - All URLs must follow these standards for consistency and SEO:

### URL Format Standards

1. **No www subdomain**: All URLs use `morse-coder.com` (not `www.morse-coder.com`)
2. **No trailing slashes**: All URLs end without `/` (e.g., `/learn` not `/learn/`)
3. **Canonical URLs**: All canonical tags point to non-www, no-trailing-slash versions
4. **404 handling**: Non-existent pages return proper 404 status

### Redirect Implementation (netlify.toml)

```toml
# www → non-www (301 forced redirect)
[[redirects]]
  from = "https://www.morse-coder.com/*"
  to = "https://morse-coder.com/:splat"
  status = 301
  force = true

# Remove trailing slashes (301 redirect)
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301

# Legacy path redirects
[[redirects]]
  from = "/encoders/txt-to-morse"
  to = "/decoders/txt-to-morse"
  status = 301
```

### Architecture Note

This is a **Static Site Generation (SSG)** project using:
- **Build command**: `npm run build:ssg` (Vite + react-snap)  
- **Static HTML files**: Each route generates a separate HTML file
- **Natural 404 handling**: Non-existent files return proper 404 status automatically
- **No SPA fallback needed**: Each valid route has its own static HTML file
- **Minimal redirects**: Only for URL normalization (www, trailing slashes) and legacy paths

### How It Works

**Valid routes (return 200):**
- Server finds static HTML file (e.g., `ko.html`, `learn.html`) → Returns file directly
- Fast performance, SEO-friendly, pre-rendered content

**Invalid routes (return 404):**
- Server can't find corresponding HTML file → Returns custom `404.html` with proper 404 status
- No false positives, genuine 404 handling for search engines

### SSG Configuration (react-snap)

**IMPORTANT**: All new pages must be added to `package.json` → `reactSnap.include` array:

```json
"include": [
  "/",                    // Homepage
  "/ko", "/es", "/ru",    // Multi-language homepages
  "/learn",               // Learn section
  "/learn/basic-and-tips",
  "/learn/history", 
  "/sheet",               // Reference sheets
  "/sheet/morse-code-sheet",
  "/sheet/common-abbr",
  "/sheet/common-words", 
  "/sheet/common-phrases",
  "/sheet/morse-code-alphabet",
  "/sheet/morse-code-numbers",
  "/decoders/txt-to-morse",     // Decoder tools
  "/decoders/decode-text",
  "/decoders/decode-image",
  "/decoders/decode-audio",
  "/decoders/decode-audio/morse-code-sound",
  "/shop",                      // Other pages
  "/feedback",
  "/privacy-policy"
]
```

**New Page Checklist:**
1. ✅ Add route to React Router (`App.tsx`)
2. ✅ Add path to `reactSnap.include` array
3. ✅ Add to sitemap.xml
4. ✅ Test with `npm run build:ssg`
5. ✅ Verify static HTML file is generated in `dist/`

### Local Development

**Production-like testing with Netlify CLI:**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Start local dev server (mimics production redirects)
netlify dev
# → Serves on http://localhost:8888 with full redirect support
```

### Examples of Correct URLs

- ✅ `https://morse-coder.com` (homepage)
- ✅ `https://morse-coder.com/ko` (Korean version)
- ✅ `https://morse-coder.com/sheet/morse-code-alphabet` (reference page)
- ❌ `https://www.morse-coder.com/learn/` (wrong: has www and trailing slash)
- ❌ `https://morse-coder.com/learn/` (wrong: has trailing slash)

### Canonical URL Verification

All pages must include canonical links in this format:

```html
<link rel="canonical" href="https://morse-coder.com/path" />
```

## Recent Changes (2025-01-29)

### R2 Debug Upload Integration (Latest)

**Added automated file upload to Cloudflare R2 for debugging using presigned URLs:**

- **Files:**

  - Added `generate-presigned-urls.js` - Script to generate R2 presigned URLs (7-day expiry)
  - Added `src/utils/r2PresignedUrls.js` - Auto-generated frontend configuration
  - Updated `src/utils/r2Upload.ts` - R2 upload utility using presigned URLs (no direct credentials)
  - Modified `src/pages/DecodeImage.tsx` - Added async image upload
  - Modified `src/pages/DecodeAudio.tsx` - Added async audio upload
  - Added `R2-SETUP.md` - Complete setup and troubleshooting guide
- **Features:**

  - **Presigned URL approach**: Solves CORS issues, no credentials in frontend
  - Async file upload to R2 (non-blocking, doesn't affect user experience)
  - 50MB file size limit (larger files are skipped)
  - Automatic filename generation with timestamps
  - Preserves original filename when possible
  - File type separation (image/ and audio/ folders)
  - Silent error handling (failures don't impact main functionality)
  - URL expiration checking (7-day validity)
- **Configuration:**

  - R2 endpoint: `https://932501690a1941378133afa28567e559.r2.cloudflarestorage.com`
  - Bucket: `debug-morse-files`
  - Presigned URLs valid for 7 days (604800 seconds)
  - Weekly regeneration required: `node generate-presigned-urls.js`
- **Security**: No R2 credentials exposed in frontend, uses time-limited presigned URLs
- **Usage:** Files are automatically uploaded when users upload to decode-image or decode-audio pages for offline debugging analysis.

## Recent Changes (2025-01-30)

### Phase 2: Extended Page Internationalization Implementation (Latest)

**Continued internationalization work with complex content pages:**

**Additional Pages Internationalized:**
- ✅ `CommonWords.tsx` - Complete rewrite using useI18n hook with complex data structures
- ✅ Enhanced translation support for dynamic content (counters, arrays, nested objects)
- ✅ Advanced SEO content internationalization with structured examples
- ✅ Language-aware navigation and link generation

**Advanced Translation Features Implemented:**
- ✅ **Dynamic Parameter Support**: `{count}` placeholders for real-time statistics
- ✅ **Complex Data Structures**: Arrays of objects, nested translation hierarchies
- ✅ **SEO Content Internationalization**: Multi-section content with examples and use cases
- ✅ **Interactive Content**: Real-world usage examples with Morse code translations

**Files Created/Modified (Phase 2):**
- Created `/src/i18n/locales/en/common-words.ts` - Comprehensive English translations
- Created `/src/i18n/locales/en/common-phrases.ts` - English phrase translations (partial)
- Updated `/src/pages/CommonWords.tsx` - Complete internationalization rewrite
- Updated all language index files (`en`, `ko`, `es`, `ru`) - Added commonWords and commonPhrases imports

**Translation Structure Enhancements:**
- `commonWords` - 100+ word categories with learning tips, usage examples, and SEO content
- `commonPhrases` - Communication phrases for amateur radio and maritime use
- Support for complex nested structures with arrays and dynamic content
- Multi-language meta tags optimized for search engines

**Technical Improvements:**
- ✅ Enhanced `t()` function usage with parameter substitution
- ✅ Array mapping for dynamic content rendering
- ✅ Complex object destructuring in translation keys
- ✅ Improved error handling for missing translation keys

### Phase 1: Complete Page Internationalization Implementation

**Completed comprehensive internationalization for all core pages following established patterns:**

**Pages Internationalized:**
- ✅ `History.tsx` - Complete rewrite using useI18n hook with language-aware navigation
- ✅ `Sheet.tsx` - Complete rewrite using useI18n hook with translation keys
- ✅ All components now use `t()` function for dynamic text content
- ✅ Language-aware link generation with `getLocalizedPath()` function
- ✅ Multi-language meta tags (titles, descriptions) for SEO

**Translation File Structure:**
- ✅ All 4 languages (en, ko, es, ru) have complete translation coverage
- ✅ Added `history` translations to all language index files  
- ✅ Added `sheet` translations to all language index files
- ✅ Consistent structure across all language files

**Technical Implementation:**
- ✅ Each page uses `useI18n()` hook to access current locale and translation function
- ✅ `useLocation()` hook for URL-based language detection
- ✅ `getCurrentLocale()` function extracts language from pathname 
- ✅ `getLocalizedPath()` function generates language-appropriate URLs
- ✅ Preserves current language context when navigating between pages

**Files Modified:**
- `/src/pages/History.tsx` - Complete internationalization rewrite
- `/src/pages/Sheet.tsx` - Complete internationalization rewrite
- `/src/i18n/locales/en/index.ts` - Added history and sheet imports/exports
- `/src/i18n/locales/ko/index.ts` - Added history and sheet imports/exports  
- `/src/i18n/locales/es/index.ts` - Added history and sheet imports/exports
- `/src/i18n/locales/ru/index.ts` - Added history and sheet imports/exports

**Current Translation Coverage:**
- `site` - Website metadata (name, title, description)
- `nav` - Navigation items
- `home` - Homepage content including quickStart, features, technical, training sections
- `instructions` - Usage instructions with steps and tips
- `basicAndTips` - Basic learning content and tips
- `learn` - Learn section content
- `history` - History page timeline and SEO content
- `sheet` - Reference sheets descriptions and SEO content
- `commonWords` - Word categories, learning tips, usage examples, and SEO content
- `commonPhrases` - Communication phrases (structure prepared)

## Internationalization Progress Status

**Completed Pages (5/18):** 
- BasicAndTips.tsx ✅
- Learn.tsx ✅ 
- History.tsx ✅
- Sheet.tsx ✅
- CommonWords.tsx ✅

**Remaining Pages (13/18):**
- CommonPhrases.tsx - Translation files ready, component pending
- CommonAbbr.tsx - Has ko/es/ru translations, needs en translation + component
- MorseCodeSheet.tsx - Has ko/es/ru translations, needs en translation + component  
- MorseCodeAlphabet.tsx - Has ko/es/ru translations, needs en translation + component
- MorseCodeNumbers.tsx - Has ko translation, needs en/es/ru + component
- DecodeText.tsx - No translations, needs full implementation
- TxtToMorseEncoder.tsx - No translations, needs full implementation
- DecodeImage.tsx - No translations, needs full implementation  
- DecodeAudio.tsx - No translations, needs full implementation
- MorseCodeSound.tsx - No translations, needs full implementation
- Shop.tsx - No translations, needs full implementation
- Feedback.tsx - No translations, needs full implementation
- PrivacyPolicy.tsx - No translations, needs full implementation

### Previous Changes (2025-01-29)

### SEO Optimization

- Updated homepage title from "Online Morse Code Translator – Sound, Image & Decode Audio" to "Morse Code Translator - Text, Sound, Image & Audio" (54 characters, SEO-friendly length)
- Optimized description to 140 characters: "Free Morse code translator with image & audio decoding. Convert text to Morse, extract from images, play sound, flash light & download audio instantly."
- Added image-related keywords to highlight the image decoding functionality
- Updated all meta tags (description, Open Graph, Twitter cards, structured data)
- Synchronized title and description updates across all 4 language versions

### Multi-language Audio Controls Fix

**Problem:** Sound playback and settings buttons disappeared when switching from English to other languages (Korean, Spanish, Russian).

**Root Cause:** TranslatorBox component was checking `label === 'Morse Code'` to determine whether to show audio controls, but in other languages the label was localized text (e.g., "모스 부호", "Código Morse").

**Solution:**

- Added `isMorseInput?: boolean` prop to TranslatorBox interface
- Changed detection logic from `label === 'Morse Code'` to use the `isMorseInput` prop
- Updated all TranslatorBox usages to include `isMorseInput={true}` for Morse code input fields

**Files Modified:**

- `src/components/TranslatorBox.tsx:22,31,375` - Added new prop and fixed logic
- `src/App.tsx:87` - Added isMorseInput prop
- `src/components/TranslatorI18n.tsx:52` - Added isMorseInput prop

## Testing

- Local development server runs on `http://localhost:5173`
- Multi-language routes: `/ko`, `/es`, `/ru`
- All audio controls (play, pause, repeat, settings, download) now work correctly in all languages

## SEO Details

- Title: 54 characters (within 50-60 recommended range)
- Description: 140 characters (within 160 limit)
- Includes key features: text conversion, sound playback, image extraction, audio download
- Optimized for search terms: "morse code translator", "image decoding", "audio conversion"

## Next Steps Reminder

When making future changes:

1. Always test multi-language functionality
2. Ensure SEO meta tags are updated across all languages
3. Run `npm run lint` before committing
4. Test audio features in all language versions
