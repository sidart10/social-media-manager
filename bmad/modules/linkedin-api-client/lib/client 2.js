import { linkedinConfig, validateConfig } from '../config.js';
import { getAuthorizationUrl, exchangeCodeForToken, getUserInfo } from './auth.js';
import { uploadImage, uploadMultipleImages } from './images.js';
import { uploadDocument } from './documents.js';
import { uploadVideo } from './videos.js';
import { createTextPost, createImagePost, createMultiImagePost, createDocumentPost, createVideoPost } from './posts.js';
import { formatPostText } from './formatter.js';
import { validateLinkedInPost } from './validator.js';
import { RateLimiter } from './rate-limiter.js';

export class LinkedInClient {
  constructor(credentials = linkedinConfig) {
    validateConfig();
    this.config = credentials;
    this.accessToken = null;
    this.personUrn = null;
    this.personId = null;
    this.rateLimiter = new RateLimiter();
  }

  /**
   * Step 1: Get authorization URL for user to visit
   * @returns {string} OAuth authorization URL
   */
  getAuthUrl() {
    return getAuthorizationUrl();
  }

  /**
   * Step 2: Exchange authorization code for access token
   * @param {string} code - Authorization code from OAuth callback
   * @returns {Promise<Object>} Token info
   */
  async authenticate(code) {
    try {
      const tokenData = await exchangeCodeForToken(code);
      this.accessToken = tokenData.accessToken;

      const userInfo = await getUserInfo(this.accessToken);
      this.personUrn = userInfo.personUrn;
      this.personId = userInfo.personId;

      return {
        success: true,
        accessToken: this.accessToken,
        expiresIn: tokenData.expiresIn,
        personUrn: this.personUrn,
        name: userInfo.name,
        email: userInfo.email,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Set access token manually (if already authenticated)
   */
  setAccessToken(token, personUrn) {
    this.accessToken = token;
    this.personUrn = personUrn;
  }

  /**
   * Create text-only post
   */
  async postText(text) {
    if (!this.accessToken || !this.personUrn) {
      return { success: false, error: 'Not authenticated. Call authenticate() first.' };
    }

    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    const validation = await validateLinkedInPost({ text });
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    if (validation.warnings.length > 0) {
      console.warn('Warnings:', validation.warnings);
    }

    const formatted = formatPostText(text);
    const result = await createTextPost(this.accessToken, this.personUrn, formatted.formatted);

    if (result.success) {
      this.rateLimiter.incrementCount();
    }

    return result;
  }

  /**
   * Create post with single image
   */
  async postWithImage(text, imagePath, altText = '') {
    if (!this.accessToken || !this.personUrn) {
      return { success: false, error: 'Not authenticated' };
    }

    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    const validation = await validateLinkedInPost({ text, images: [imagePath] });
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    try {
      console.log('Uploading image...');
      const imageUrn = await uploadImage(imagePath, this.accessToken, this.personUrn);

      console.log('Creating post...');
      const formatted = formatPostText(text);
      const result = await createImagePost(this.accessToken, this.personUrn, formatted.formatted, imageUrn, 'Image');

      if (result.success) {
        this.rateLimiter.incrementCount();
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Create multi-image post (2-20 images, grid carousel)
   */
  async postMultiImage(text, imagePaths, altTexts = []) {
    if (!this.accessToken || !this.personUrn) {
      return { success: false, error: 'Not authenticated' };
    }

    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    const validation = await validateLinkedInPost({ text, images: imagePaths });
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    try {
      console.log(`Uploading ${imagePaths.length} images...`);
      const imageUrns = await uploadMultipleImages(imagePaths, this.accessToken, this.personUrn);

      const imageData = imageUrns.map((urn, index) => ({
        urn,
        altText: altTexts[index] || '',
      }));

      console.log('Creating multi-image post...');
      const formatted = formatPostText(text);
      const result = await createMultiImagePost(this.accessToken, this.personUrn, formatted.formatted, imageData);

      if (result.success) {
        this.rateLimiter.incrementCount();
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Create document post (PDF carousel)
   */
  async postDocument(text, documentPath, documentTitle = 'Document') {
    if (!this.accessToken || !this.personUrn) {
      return { success: false, error: 'Not authenticated' };
    }

    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    const validation = await validateLinkedInPost({ text, document: documentPath });
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    try {
      console.log('Uploading document...');
      const documentUrn = await uploadDocument(documentPath, this.accessToken, this.personUrn);

      console.log('Creating document post...');
      const formatted = formatPostText(text);
      const result = await createDocumentPost(this.accessToken, this.personUrn, formatted.formatted, documentUrn, documentTitle);

      if (result.success) {
        this.rateLimiter.incrementCount();
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Create video post
   */
  async postWithVideo(text, videoPath, videoTitle = 'Video') {
    if (!this.accessToken || !this.personUrn) {
      return { success: false, error: 'Not authenticated' };
    }

    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    const validation = await validateLinkedInPost({ text, video: videoPath });
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    try {
      console.log('Uploading video (this may take a while for large files)...');
      const videoUrn = await uploadVideo(videoPath, this.accessToken, this.personUrn);

      console.log('Creating video post...');
      const formatted = formatPostText(text);
      const result = await createVideoPost(this.accessToken, this.personUrn, formatted.formatted, videoUrn, videoTitle);

      if (result.success) {
        this.rateLimiter.incrementCount();
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get rate limit stats
   */
  getRateLimitStats() {
    return this.rateLimiter.getStats();
  }
}
