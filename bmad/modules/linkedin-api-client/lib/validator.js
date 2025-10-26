import { stat } from 'fs/promises';
import { extname } from 'path';

const LIMITS = {
  TEXT_MAX: 3000,
  TEXT_OPTIMAL_MAX: 1600,
  HOOK_MAX: 140,
  MULTI_IMAGE_MIN: 2,
  MULTI_IMAGE_MAX: 20,
  IMAGE_MAX_PIXELS: 36152320,
  DOCUMENT_MAX_SIZE: 100 * 1024 * 1024,
  DOCUMENT_MAX_PAGES: 300,
  VIDEO_MIN_SIZE: 75 * 1024, // 75KB
  VIDEO_MAX_SIZE: 500 * 1024 * 1024, // 500MB
  POSTS_PER_DAY: 150,
};

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];
const SUPPORTED_DOCUMENT_FORMATS = ['.pdf', '.ppt', '.pptx', '.doc', '.docx'];
const SUPPORTED_VIDEO_FORMATS = ['.mp4'];

export async function validateLinkedInPost(request) {
  const errors = [];
  const warnings = [];

  if (!request.text || typeof request.text !== 'string') {
    errors.push('Text is required and must be a string');
  } else {
    if (request.text.length > LIMITS.TEXT_MAX) {
      errors.push(`Text exceeds LinkedIn limit (${LIMITS.TEXT_MAX} chars)`);
    }

    if (request.text.length > LIMITS.TEXT_OPTIMAL_MAX) {
      warnings.push(`Text over ${LIMITS.TEXT_OPTIMAL_MAX} chars may reduce engagement`);
    }

    const firstLine = request.text.split('\n')[0];
    if (firstLine.length > LIMITS.HOOK_MAX) {
      warnings.push(`First line over ${LIMITS.HOOK_MAX} chars - may be truncated on mobile`);
    }
  }

  if (request.images && request.images.length > 0) {
    if (request.images.length < LIMITS.MULTI_IMAGE_MIN && request.images.length !== 1) {
      errors.push(`Multi-image posts require ${LIMITS.MULTI_IMAGE_MIN}-${LIMITS.MULTI_IMAGE_MAX} images (or use single image)`);
    }

    if (request.images.length > LIMITS.MULTI_IMAGE_MAX) {
      errors.push(`Maximum ${LIMITS.MULTI_IMAGE_MAX} images per post`);
    }

    for (const imagePath of request.images) {
      const ext = extname(imagePath).toLowerCase();

      if (!SUPPORTED_IMAGE_FORMATS.includes(ext)) {
        errors.push(`Unsupported image format: ${ext} (use JPG, PNG, or GIF)`);
        continue;
      }

      try {
        const stats = await stat(imagePath);
        const sizeMB = stats.size / (1024 * 1024);
        if (sizeMB > 10) {
          warnings.push(`${imagePath} is ${sizeMB.toFixed(1)}MB - may exceed pixel limit`);
        }
      } catch (err) {
        errors.push(`Cannot access image: ${imagePath}`);
      }
    }
  }

  if (request.document) {
    const ext = extname(request.document).toLowerCase();

    if (!SUPPORTED_DOCUMENT_FORMATS.includes(ext)) {
      errors.push(`Unsupported document format: ${ext} (use PDF, PPT, PPTX, DOC, or DOCX)`);
    }

    try {
      const stats = await stat(request.document);

      if (stats.size > LIMITS.DOCUMENT_MAX_SIZE) {
        errors.push(`Document exceeds 100MB limit (${(stats.size / (1024 * 1024)).toFixed(1)}MB)`);
      }
    } catch (err) {
      errors.push(`Cannot access document: ${request.document}`);
    }
  }

  if (request.video) {
    const ext = extname(request.video).toLowerCase();

    if (!SUPPORTED_VIDEO_FORMATS.includes(ext)) {
      errors.push(`Unsupported video format: ${ext} (use MP4)`);
    }

    try {
      const stats = await stat(request.video);

      if (stats.size < LIMITS.VIDEO_MIN_SIZE) {
        errors.push(`Video too small (minimum 75KB)`);
      }

      if (stats.size > LIMITS.VIDEO_MAX_SIZE) {
        errors.push(`Video exceeds 500MB limit (${(stats.size / (1024 * 1024)).toFixed(1)}MB)`);
      }

      const sizeMB = stats.size / (1024 * 1024);
      if (sizeMB > 100) {
        warnings.push(`Video is ${sizeMB.toFixed(1)}MB - large videos may take longer to upload`);
      }
    } catch (err) {
      errors.push(`Cannot access video: ${request.video}`);
    }
  }

  if (request.images && request.images.length > 0 && request.document) {
    errors.push('Cannot include both images and document in same post');
  }

  if (request.video && (request.images?.length > 0 || request.document)) {
    errors.push('Cannot mix video with images or documents in same post');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export { LIMITS, SUPPORTED_IMAGE_FORMATS, SUPPORTED_DOCUMENT_FORMATS, SUPPORTED_VIDEO_FORMATS };
