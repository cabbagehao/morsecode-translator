/**
 * Cloudflare Worker for handling debug file uploads to R2
 * Handles multipart form data uploads and stores files in R2 bucket
 */

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Only allow POST requests to /api/upload
    if (request.method !== 'POST' || !request.url.endsWith('/api/upload')) {
      return new Response('Not Found', { status: 404 });
    }

    try {
      return await handleUpload(request, env);
    } catch (error) {
      console.error('Upload error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCORSHeaders()
        }
      });
    }
  },
};

/**
 * Handle CORS preflight requests
 */
function handleCORS() {
  return new Response(null, {
    status: 200,
    headers: getCORSHeaders()
  });
}

/**
 * Get CORS headers
 */
function getCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // In production, restrict this to your domain
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

/**
 * Handle file upload request
 */
async function handleUpload(request, env) {
  console.log(`[Request] Received upload request from ${request.headers.get('origin') || 'unknown'}`);
  
  // Check content type
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({
      error: 'Invalid content type',
      message: 'Expected multipart/form-data'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }

  // Parse form data
  const formData = await request.formData();
  const file = formData.get('file');
  const fileType = formData.get('fileType');
  const originalName = formData.get('originalName') || 'unknown';
  const uploadTimestamp = formData.get('uploadTimestamp') || new Date().toISOString();
  const userAgent = formData.get('userAgent') || 'unknown';

  // Validate required fields
  if (!file || !fileType) {
    return new Response(JSON.stringify({
      error: 'Missing required fields',
      message: 'file and fileType are required'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }

  // Validate file is actually a File object
  if (!(file instanceof File)) {
    return new Response(JSON.stringify({
      error: 'Invalid file',
      message: 'Uploaded file is not valid'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }

  // Validate file size
  const maxSize = parseInt(env.MAX_FILE_SIZE || '52428800'); // 50MB default
  if (file.size > maxSize) {
    return new Response(JSON.stringify({
      error: 'File too large',
      message: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
    }), {
      status: 413,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }

  // Validate file type
  if (!['image', 'audio'].includes(fileType)) {
    return new Response(JSON.stringify({
      error: 'Invalid file type',
      message: 'fileType must be "image" or "audio"'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }

  // Generate safe filename with shorter timestamp
  const now = new Date();
  const timestamp = now.getFullYear().toString() + 
    (now.getMonth() + 1).toString().padStart(2, '0') + 
    now.getDate().toString().padStart(2, '0') + '_' +
    now.getHours().toString().padStart(2, '0') + 
    now.getMinutes().toString().padStart(2, '0') + 
    now.getSeconds().toString().padStart(2, '0');
  const safeName = generateSafeFilename(originalName, fileType, timestamp);
  const key = `${fileType}/${safeName}`;

  try {
    console.log(`[Upload] Starting upload: ${originalName} (${Math.round(file.size / 1024)}KB) -> ${key}`);
    
    // Convert File to ArrayBuffer for R2 upload
    const arrayBuffer = await file.arrayBuffer();
    console.log(`[Upload] File converted to ArrayBuffer: ${arrayBuffer.byteLength} bytes`);
    
    // Upload to R2
    await env.R2_BUCKET.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || getDefaultContentType(fileType),
      },
      customMetadata: {
        'original-name': String(originalName),
        'upload-timestamp': String(uploadTimestamp),
        'user-agent': String(userAgent).substring(0, 100),
        'file-type': String(fileType),
        'upload-source': 'morse-coder-worker'
      }
    });

    console.log(`[Upload] Successfully uploaded to R2: ${key}`);

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      filename: key,
      size: file.size,
      contentType: file.type,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });

  } catch (error) {
    console.error('R2 upload failed:', error);
    return new Response(JSON.stringify({
      error: 'Upload failed',
      message: 'Failed to store file in R2'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders()
      }
    });
  }
}

/**
 * Generate a safe filename for R2 storage
 */
function generateSafeFilename(originalName, fileType, timestamp) {
  // Ensure inputs are strings
  const safeName = String(originalName || 'unknown');
  const safeType = String(fileType || 'unknown');
  const safeTimestamp = String(timestamp);
  
  if (safeName && safeName !== 'unknown' && safeName.length > 0) {
    // Remove unsafe characters but keep original name structure
    const cleanName = safeName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const extension = cleanName.includes('.') ? cleanName.split('.').pop() : getDefaultExtension(safeType);
    const nameWithoutExt = cleanName.replace(/\.[^/.]+$/, '') || 'file';
    
    // Format: originalname_20250130_173045.ext
    return `${nameWithoutExt}_${safeTimestamp}.${extension}`;
  }
  
  // Fallback filename with type-appropriate extension
  const extension = getDefaultExtension(safeType);
  return `uploaded_file_${safeTimestamp}.${extension}`;
}

/**
 * Get default file extension for file type
 */
function getDefaultExtension(fileType) {
  return fileType === 'image' ? 'jpg' : 'mp3';
}

/**
 * Get default content type for file type
 */
function getDefaultContentType(fileType) {
  return fileType === 'image' ? 'image/jpeg' : 'audio/mpeg';
}