# Morse Debug Worker

Cloudflare Worker for handling debug file uploads from the Morse Code Translator website.

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Wrangler

Make sure you have Wrangler CLI installed:

```bash
npm install -g wrangler
```

Login to your Cloudflare account:

```bash
wrangler login
```

### 3. Create R2 Bucket

Create the R2 bucket in your Cloudflare dashboard or using Wrangler:

```bash
wrangler r2 bucket create debug-morse-files
```

### 4. Set Environment Variables

Set your R2 credentials as secrets (optional if using bucket binding):

```bash
# Only needed if not using R2 bucket binding
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY
```

### 5. Deploy

Deploy the worker:

```bash
npm run deploy
```

## Development

Run locally:

```bash
npm run dev
```

The worker will be available at `http://localhost:8787`

## API Endpoints

### POST /api/upload

Upload a file for debugging purposes.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: File to upload (max 50MB)
  - `fileType`: "image" or "audio"
  - `originalName`: Original filename
  - `uploadTimestamp`: ISO timestamp
  - `userAgent`: User agent string

**Response:**
```json
{
  "success": true,
  "filename": "image/2025-07-30T12-00-00-000Z_example.jpg",
  "size": 1024,
  "contentType": "image/jpeg",
  "timestamp": "2025-07-30T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "File too large",
  "message": "File size exceeds 50MB limit"
}
```

## Configuration

### wrangler.toml

- `name`: Worker name
- `R2_BUCKET`: R2 bucket binding
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 50MB)

### Security

- CORS headers are configured to allow uploads from specified origins
- File size limits are enforced
- File types are validated (image/audio only)
- Filenames are sanitized to prevent path traversal

## File Storage Structure

Files are stored in R2 with the following structure:

```
debug-morse-files/
├── image/
│   ├── 2025-07-30T12-00-00-000Z_example.jpg
│   └── 2025-07-30T12-00-00-000Z_another.png
└── audio/
    ├── 2025-07-30T12-00-00-000Z_sample.mp3
    └── 2025-07-30T12-00-00-000Z_recording.wav
```

## Monitoring

View logs:

```bash
npm run tail
```

## Frontend Integration

Update the frontend `BACKEND_API_URL` in `src/utils/r2Upload.ts`:

```javascript
const BACKEND_API_URL = 'https://your-worker.your-subdomain.workers.dev';
```