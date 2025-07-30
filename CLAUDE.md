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

## Recent Changes (2025-01-29)

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

### Translation File Structure
All language files maintain identical structure with complete field coverage:
- `site` - Website metadata (name, title, description)
- `nav` - Navigation items
- `home` - Homepage content including quickStart, features, technical, training sections
- `instructions` - Usage instructions with steps and tips

No missing fields detected across all 4 languages.

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