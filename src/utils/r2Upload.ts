const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// Backend API endpoint (will be deployed to Cloudflare Worker)
const BACKEND_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://morse-coder-worker.yhc2073.workers.dev' 
  : 'http://localhost:8787';

/**
 * Upload file to Cloudflare R2 via backend API for debugging purposes
 * This function runs asynchronously and doesn't block the UI
 * @param file File to upload
 * @param fileType Type of file (image/audio)
 */
export async function uploadToR2ForDebug(file: File, fileType: 'image' | 'audio'): Promise<void> {
  try {
    // Check file size limit
    if (file.size > MAX_FILE_SIZE) {
      console.log(`[R2 Debug] File too large (${Math.round(file.size / 1024 / 1024)}MB), skipping upload`);
      return;
    }

    console.log(`[R2 Debug] Starting upload of ${file.name} (${Math.round(file.size / 1024 / 1024)}MB)`);

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('originalName', file.name || 'unknown');
    formData.append('uploadTimestamp', new Date().toISOString());
    formData.append('userAgent', navigator.userAgent.substring(0, 100));

    // Upload to backend API
    const response = await fetch(`${BACKEND_API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary for FormData
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`[R2 Debug] Successfully uploaded: ${result.filename}`);
    } else {
      const errorText = await response.text();
      console.error(`[R2 Debug] Upload failed with status: ${response.status} ${response.statusText}`);
      console.error(`[R2 Debug] Error details: ${errorText}`);
    }
    
  } catch (error) {
    // Log error but don't throw - this shouldn't affect the main functionality
    console.error('[R2 Debug] Upload failed:', error);
  }
}

/**
 * Upload multiple files to R2 (for batch operations)
 * @param files Array of files to upload
 * @param fileType Type of files (image/audio)
 */
export async function uploadMultipleToR2ForDebug(files: File[], fileType: 'image' | 'audio'): Promise<void> {
  // Upload files in parallel but don't wait for completion
  files.forEach(file => {
    uploadToR2ForDebug(file, fileType).catch(error => {
      console.error(`[R2 Debug] Failed to upload ${file.name}:`, error);
    });
  });
}