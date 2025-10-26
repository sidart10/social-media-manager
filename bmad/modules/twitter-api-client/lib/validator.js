import { stat } from 'fs/promises';
import { extname } from 'path';

const LIMITS = {
  TEXT_MAX_PREMIUM: 25000,
  TEXT_MAX_FREE: 280,
  IMAGE_MAX_SIZE: 5 * 1024 * 1024,
  GIF_MAX_SIZE: 15 * 1024 * 1024,
  VIDEO_MAX_SIZE: 512 * 1024 * 1024,
  IMAGES_PER_TWEET: 4,
  POSTS_PER_MONTH_FREE: 1500,
};

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const SUPPORTED_VIDEO_FORMATS = ['.mp4', '.mov'];

export async function validateTweetRequest(request) {
  const errors = [];

  if (!request.text || typeof request.text !== 'string') {
    errors.push('Text is required and must be a string');
  } else if (request.text.length > LIMITS.TEXT_MAX_PREMIUM) {
    errors.push(`Text exceeds Premium limit (${LIMITS.TEXT_MAX_PREMIUM} chars)`);
  }

  if (request.media && request.media.length > 0) {
    if (request.media.length > LIMITS.IMAGES_PER_TWEET) {
      errors.push(`Maximum ${LIMITS.IMAGES_PER_TWEET} images per tweet`);
    }

    const hasVideo = request.media.some((m) => SUPPORTED_VIDEO_FORMATS.includes(extname(m.path).toLowerCase()));
    const hasImage = request.media.some((m) => SUPPORTED_IMAGE_FORMATS.includes(extname(m.path).toLowerCase()));

    if (hasVideo && hasImage) {
      errors.push('Cannot mix videos and images in one tweet');
    }

    if (hasVideo && request.media.length > 1) {
      errors.push('Only 1 video allowed per tweet');
    }

    for (const media of request.media) {
      const ext = extname(media.path).toLowerCase();

      if (![...SUPPORTED_IMAGE_FORMATS, ...SUPPORTED_VIDEO_FORMATS].includes(ext)) {
        errors.push(`Unsupported format: ${ext}`);
        continue;
      }

      try {
        const stats = await stat(media.path);

        if (SUPPORTED_IMAGE_FORMATS.includes(ext)) {
          const limit = ext === '.gif' ? LIMITS.GIF_MAX_SIZE : LIMITS.IMAGE_MAX_SIZE;
          if (stats.size > limit) {
            const limitMB = limit / (1024 * 1024);
            errors.push(`${media.path} exceeds ${limitMB}MB limit`);
          }
        } else if (SUPPORTED_VIDEO_FORMATS.includes(ext)) {
          if (stats.size > LIMITS.VIDEO_MAX_SIZE) {
            errors.push(`${media.path} exceeds 512MB video limit`);
          }
        }
      } catch (err) {
        errors.push(`Cannot access file: ${media.path}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export { LIMITS };
