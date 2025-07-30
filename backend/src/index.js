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
  const originalName = formData.get('originalName');
  const uploadTimestamp = formData.get('uploadTimestamp');
  const userAgent = formData.get('userAgent');

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

  // Generate safe filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeName = generateSafeFilename(originalName, fileType, timestamp);
  const key = `${fileType}/${safeName}`;

  try {
    // Upload to R2
    await env.R2_BUCKET.put(key, file, {
      httpMetadata: {
        contentType: file.type || getDefaultContentType(fileType),
      },
      customMetadata: {
        'original-name': originalName || 'unknown',
        'upload-timestamp': uploadTimestamp || new Date().toISOString(),
        'user-agent': userAgent || 'unknown',
        'file-type': fileType,
        'upload-source': 'morse-debug-worker'
      }
    });

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
  if (originalName && originalName !== 'unknown') {
    // Remove unsafe characters and keep extension
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const extension = safeName.includes('.') ? safeName.split('.').pop() : '';
    const nameWithoutExt = safeName.replace(/\.[^/.]+$/, '');
    
    return `${timestamp}_${nameWithoutExt}.${extension}`;
  }
  
  // Fallback filename with type-appropriate extension
  const extension = fileType === 'image' ? 'jpg' : 'mp3';
  return `${timestamp}_uploaded_file.${extension}`;
}

/**
 * Get default content type for file type
 */
function getDefaultContentType(fileType) {
  return fileType === 'image' ? 'image/jpeg' : 'audio/mpeg';
}