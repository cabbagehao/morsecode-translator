# Cloudflare R2 Debug Upload Setup

## Overview
This project includes automated file upload to Cloudflare R2 for debugging purposes. Files uploaded to decode-image and decode-audio pages are automatically uploaded to R2 for offline analysis via a Cloudflare Worker backend.

## Architecture
- **Frontend**: Sends files to Cloudflare Worker API
- **Backend**: Cloudflare Worker handles uploads to R2
- **Storage**: R2 bucket stores debug files

## Setup Steps

### 1. Deploy Backend Worker

Navigate to the backend directory and deploy:

```bash
cd backend
npm install
npm run deploy
```

### 2. Create R2 Bucket
Create the R2 bucket (if not exists):

```bash
wrangler r2 bucket create debug-morse-files
```

### 3. Configure Frontend
Update the backend URL in `src/utils/r2Upload.ts`:

```javascript
const BACKEND_API_URL = 'https://your-worker.your-subdomain.workers.dev';
```

### 4. Worker Configuration
The worker is configured via `backend/wrangler.toml`:
- R2 bucket binding
- CORS origins
- File size limits

## File Structure
```
debug-morse-files/
├── image/
│   ├── 2025-07-30T12-00-00-000Z_user_image.jpg
│   ├── 2025-07-30T12-00-00-000Z_another_image.png
│   └── ...
└── audio/
    ├── 2025-07-30T12-00-00-000Z_user_audio.mp3
    ├── 2025-07-30T12-00-00-000Z_another_audio.wav
    └── ...
```

## Development

### Local Development
Run the worker locally:

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:8787/api/upload`

### Testing
Test the upload functionality:

```bash
curl -X POST http://localhost:8787/api/upload \
  -F "file=@test.jpg" \
  -F "fileType=image" \
  -F "originalName=test.jpg"
```

## Troubleshooting

### Worker Deployment Issues
If deployment fails:
1. Check your Cloudflare credentials: `wrangler auth list`
2. Verify bucket exists: `wrangler r2 bucket list`
3. Check wrangler.toml configuration

### Upload Failures
If uploads fail:
1. Check worker logs: `wrangler tail`
2. Verify CORS configuration in worker
3. Check file size limits (50MB max)
4. Ensure file type is 'image' or 'audio'

### CORS Issues
If you get CORS errors:
1. Check ALLOWED_ORIGINS in wrangler.toml
2. Verify frontend domain is included
3. Check browser network tab for preflight requests

## Current Configuration
- **Bucket**: `debug-morse-files`
- **Max file size**: 50MB
- **Supported types**: Images and Audio files
- **API endpoint**: `/api/upload`
- **CORS**: Configured for your domain origins

## Privacy Note
- Files are uploaded automatically for debugging purposes
- No personal information is collected beyond basic metadata
- Files contain metadata: original filename, upload timestamp, user agent
- Consider implementing file cleanup policies for storage management