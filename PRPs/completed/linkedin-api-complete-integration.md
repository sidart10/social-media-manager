# PRP: LinkedIn API Complete Integration

**Feature:** Full LinkedIn personal account posting with text, images, multi-image carousels, and PDF carousels

**Created:** 2025-10-25
**Status:** Ready for Implementation
**Confidence Score:** 9.5/10
**Estimated Time:** 1-1.5 hours

---

## 🎯 Context & Problem Statement

### Current State

- ✅ User has LinkedIn app configured (Client ID: 86litgbscvi400)
- ✅ **"Share on LinkedIn"** product approved → Grants `w_member_social`
- ✅ **"Sign In with LinkedIn using OpenID Connect"** approved → Grants `openid`, `profile`
- ✅ Credentials configured in `.env`
- ❌ **linkedin-mcp** has Python environment issues (cannot connect)
- ✅ **Twitter module** built successfully (proven pattern to follow)

### What User Wants

1. Post to **personal LinkedIn account** (not company page)
2. Support **multiple content types:**
   - Text-only posts
   - Single image posts
   - **Multi-image posts (2-20 images)** - Grid carousel
   - **PDF document posts** - True carousel format
   - Video posts
3. **Carousel options:** Either series of images OR PDF
4. Professional text formatting

### Success Story

**Twitter module already working:**

- 8 successful posts
- Premium features (25k chars, images)
- Rate limiting working
- Clean architecture

**Goal:** Replicate this success for LinkedIn!

---

## 🏗️ Requirements

### Must Have (MVP)

1. **OAuth 2.0 authentication** - Get access token for user's personal account
2. **Text-only posts** - Up to 3,000 characters
3. **Single image posts** - One image with caption
4. **Multi-image posts** - 2-20 images (carousel alternative)
5. **PDF document posts** - Upload PDF as swipeable carousel
6. **Input validation** - Check text length, file formats, sizes
7. **Rate limiting** - Track daily limit (150 posts/day)
8. **Error handling** - Structured responses like Twitter module

### Should Have (Phase 2)

1. Video posting
2. Article posting
3. Poll creation
4. Token refresh automation

### Nice to Have (Future)

1. Scheduled posts
2. Analytics/insights
3. Comment management

---

## 📚 Complete Technical Research

### LinkedIn API Architecture

**Base URLs:**

- **OAuth:** `https://www.linkedin.com/oauth/v2/`
- **API:** `https://api.linkedin.com/`
- **UserInfo:** `https://api.linkedin.com/v2/`
- **Posts:** `https://api.linkedin.com/rest/`

**Required Headers (CRITICAL!):**

```javascript
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  "LinkedIn-Version": "202510",  // YYYYMM format (current month)
  "X-Restli-Protocol-Version": "2.0.0",
  "Content-Type": "application/json"
}
```

### Content Type Capabilities

| Type             | Endpoint    | Max Count     | Max Size         | Carousel?     |
| ---------------- | ----------- | ------------- | ---------------- | ------------- |
| **Text**         | /rest/posts | 3,000 chars   | N/A              | No            |
| **Single Image** | /rest/posts | 1 image       | 36M pixels       | No            |
| **Multi-Image**  | /rest/posts | 2-20 images   | 36M pixels each  | Grid          |
| **Document**     | /rest/posts | 1 PDF/PPT/DOC | 100MB, 300 pages | True carousel |
| **Video**        | /rest/posts | 1 video       | TBD              | No            |

### Text Formatting ("little" Format)

**Special Characters Requiring Escape:**
`|`, `{`, `}`, `@`, `[`, `]`, `(`, `)`, `<`, `>`, `#`, `\`, `*`, `_`, `~`

**Escape with backslash:**

```javascript
// Want: "Use * for bullets"
// Send: "Use \\* for bullets"
```

**Simple formatting (NO escape needed):**

```javascript
'Check out #coding tips!'; // Hashtags work directly
'Thanks @[John](urn:li:person:ID)'; // Mentions work
'Line 1\n\nLine 2'; // Line breaks work
```

**Best Practice:** Keep text simple, use direct hashtags/mentions, only escape if using special chars as literals

---

## 🛠️ Implementation Architecture

### Follow Twitter Module Pattern (Proven Success!)

**Reference Module:** `bmad/modules/twitter-api-client/`

**Similarities:**

- Same directory structure
- Same config pattern (load from .env)
- Same validator pattern (check inputs)
- Same rate limiter pattern (track usage)
- Same client class pattern
- Same export pattern
- Same test structure

**Differences:**

- **Simpler auth** - OAuth 2.0, no signature library needed
- **Additional media types** - Multi-image, documents
- **Text formatter** - Escape special characters
- **Different headers** - LinkedIn-Version, X-Restli-Protocol-Version

### Module Structure

```
bmad/modules/linkedin-api-client/
├── package.json                    # Module dependencies
├── index.js                        # Main export
├── config.js                       # Load credentials from .env
├── lib/
│   ├── auth.js                     # OAuth 2.0 flow
│   ├── client.js                   # Main LinkedInClient class
│   ├── images.js                   # Image upload (Images API)
│   ├── documents.js                # PDF/document upload
│   ├── posts.js                    # Post creation helpers
│   ├── formatter.js                # Text escaping for "little" format
│   ├── validator.js                # Input validation
│   └── rate-limiter.js             # Daily rate limiting (150/day)
└── __tests__/
    ├── validator.test.js           # Validation tests
    └── integration.test.js         # Real API tests
```

---

## 💻 Implementation Blueprint

### Step 1: Create Module Structure (5 min)

```bash
mkdir -p bmad/modules/linkedin-api-client/lib
mkdir -p bmad/modules/linkedin-api-client/__tests__
cd bmad/modules/linkedin-api-client
```

### Step 2: Initialize Package (5 min)

**File:** `bmad/modules/linkedin-api-client/package.json`

```json
{
  "name": "@bmad/linkedin-api-client",
  "version": "1.0.0",
  "description": "LinkedIn API client for personal account posting - BMAD Social Posting Agent",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.7",
    "dotenv": "^16.4.5",
    "form-data": "^4.0.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

**Install:**

```bash
npm install
```

### Step 3: Build Config Loader (10 min)

**File:** `bmad/modules/linkedin-api-client/config.js`

```javascript
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from project root (same as Twitter module)
config({ path: join(__dirname, '../../../.env') });

export const linkedinConfig = {
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/callback',
};

export function validateConfig() {
  const missing = [];
  if (!linkedinConfig.clientId) missing.push('LINKEDIN_CLIENT_ID');
  if (!linkedinConfig.clientSecret) missing.push('LINKEDIN_CLIENT_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing LinkedIn credentials: ${missing.join(', ')}`);
  }

  return true;
}
```

### Step 4: Build OAuth 2.0 Auth (15 min)

**File:** `bmad/modules/linkedin-api-client/lib/auth.js`

```javascript
import axios from 'axios';
import { linkedinConfig } from '../config.js';

/**
 * Generate LinkedIn OAuth authorization URL
 * @returns {string} Authorization URL for user to open
 */
export function getAuthorizationUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: linkedinConfig.clientId,
    redirect_uri: linkedinConfig.redirectUri,
    scope: 'openid profile w_member_social',
    state: 'random_state_' + Date.now(), // CSRF protection
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from OAuth callback
 * @returns {Promise<string>} Access token
 */
export async function exchangeCodeForToken(code) {
  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        client_id: linkedinConfig.clientId,
        client_secret: linkedinConfig.clientSecret,
        redirect_uri: linkedinConfig.redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in, // Usually 5184000 seconds (60 days)
      scope: response.data.scope,
    };
  } catch (error) {
    throw new Error(`Token exchange failed: ${error.response?.data?.error_description || error.message}`);
  }
}

/**
 * Get user info including person URN
 * @param {string} accessToken - OAuth access token
 * @returns {Promise<Object>} User info with sub (person ID)
 */
export async function getUserInfo(accessToken) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      personId: response.data.sub, // Use to create person URN
      personUrn: `urn:li:person:${response.data.sub}`,
      name: response.data.name,
      email: response.data.email,
    };
  } catch (error) {
    throw new Error(`Failed to get user info: ${error.message}`);
  }
}
```

### Step 5: Build Text Formatter (10 min)

**File:** `bmad/modules/linkedin-api-client/lib/formatter.js`

```javascript
/**
 * Escape special characters for LinkedIn "little" text format
 * Reserved: | { } @ [ ] ( ) < > # \ * _ ~
 *
 * NOTE: Simple hashtags (#coding) and mentions work without escaping
 * Only escape when using these characters as literal text
 */
export function escapeLinkedInText(text) {
  // Don't escape simple patterns that LinkedIn handles
  // Only escape problematic characters when used as literals

  // For now, return as-is since simple hashtags/mentions work
  // Add escaping logic if we encounter issues

  return text;
}

/**
 * Format text with line breaks
 * @param {string} text
 * @returns {string} Text with normalized line breaks
 */
export function formatLineBreaks(text) {
  // Normalize line breaks to \n
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * Validate text length and format
 * @param {string} text
 * @returns {Object} {valid, formatted, warnings}
 */
export function formatPostText(text) {
  const formatted = formatLineBreaks(text);
  const warnings = [];

  // Check optimal length
  if (formatted.length > 1600) {
    warnings.push('Text over 1600 chars may have lower engagement (LinkedIn best practice)');
  }

  // Check hook length
  const firstLine = formatted.split('\n')[0];
  if (firstLine.length > 140) {
    warnings.push('First line over 140 chars - may be truncated on mobile');
  }

  return {
    formatted,
    warnings,
    length: formatted.length,
  };
}
```

### Step 6: Build Image Upload (15 min)

**File:** `bmad/modules/linkedin-api-client/lib/images.js`

```javascript
import axios from 'axios';
import { readFileSync } from 'fs';

const LINKEDIN_VERSION = '202510'; // Update monthly (YYYYMM format)

/**
 * Upload single image to LinkedIn
 * @param {string} imagePath - Path to image file
 * @param {string} accessToken - OAuth access token
 * @param {string} ownerUrn - Person or organization URN
 * @returns {Promise<string>} Image URN
 */
export async function uploadImage(imagePath, accessToken, ownerUrn) {
  try {
    // Step 1: Initialize upload
    const initResponse = await axios.post(
      'https://api.linkedin.com/rest/images?action=initializeUpload',
      {
        initializeUploadRequest: {
          owner: ownerUrn,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'LinkedIn-Version': LINKEDIN_VERSION,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      },
    );

    const { uploadUrl, image: imageUrn } = initResponse.data.value;

    // Step 2: Upload image binary
    const imageData = readFileSync(imagePath);

    await axios.put(uploadUrl, imageData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
      },
    });

    return imageUrn;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Upload multiple images
 * @param {string[]} imagePaths - Array of image paths
 * @param {string} accessToken
 * @param {string} ownerUrn
 * @returns {Promise<string[]>} Array of image URNs
 */
export async function uploadMultipleImages(imagePaths, accessToken, ownerUrn) {
  const uploads = imagePaths.map((path) => uploadImage(path, accessToken, ownerUrn));
  return Promise.all(uploads);
}
```

### Step 7: Build Document Upload (15 min)

**File:** `bmad/modules/linkedin-api-client/lib/documents.js`

```javascript
import axios from 'axios';
import { readFileSync } from 'fs';
import { extname } from 'path';

const LINKEDIN_VERSION = '202510';

const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

/**
 * Upload document (PDF, PPT, DOC) to LinkedIn
 * @param {string} documentPath - Path to document file
 * @param {string} accessToken - OAuth access token
 * @param {string} ownerUrn - Person or organization URN
 * @returns {Promise<string>} Document URN
 */
export async function uploadDocument(documentPath, accessToken, ownerUrn) {
  try {
    // Step 1: Initialize upload
    const initResponse = await axios.post(
      'https://api.linkedin.com/rest/documents?action=initializeUpload',
      {
        initializeUploadRequest: {
          owner: ownerUrn,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'LinkedIn-Version': LINKEDIN_VERSION,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      },
    );

    const { uploadUrl, document: documentUrn } = initResponse.data.value;

    // Step 2: Upload document binary
    const documentData = readFileSync(documentPath);
    const ext = extname(documentPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    await axios.put(uploadUrl, documentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': contentType,
      },
    });

    return documentUrn;
  } catch (error) {
    throw new Error(`Document upload failed: ${error.response?.data?.message || error.message}`);
  }
}

export { MIME_TYPES };
```

### Step 8: Build Post Creation (20 min)

**File:** `bmad/modules/linkedin-api-client/lib/posts.js`

```javascript
import axios from 'axios';

const LINKEDIN_VERSION = '202510';

const HEADERS = {
  'LinkedIn-Version': LINKEDIN_VERSION,
  'X-Restli-Protocol-Version': '2.0.0',
  'Content-Type': 'application/json',
};

/**
 * Create text-only post
 */
export async function createTextPost(accessToken, personUrn, text) {
  const payload = {
    author: personUrn,
    commentary: text,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with single image
 */
export async function createImagePost(accessToken, personUrn, text, imageUrn, imageTitle = 'Image') {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      media: {
        title: imageTitle,
        id: imageUrn,
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with multiple images (2-20)
 */
export async function createMultiImagePost(accessToken, personUrn, text, imageData) {
  // imageData = [{ urn, altText }, ...]
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      multiImage: {
        images: imageData.map((img) => ({
          id: img.urn,
          altText: img.altText || '',
        })),
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with document (PDF carousel)
 */
export async function createDocumentPost(accessToken, personUrn, text, documentUrn, documentTitle) {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      media: {
        title: documentTitle,
        id: documentUrn,
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Core post creation function
 */
async function createPost(accessToken, payload) {
  try {
    const response = await axios.post('https://api.linkedin.com/rest/posts', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...HEADERS,
      },
    });

    // Post ID in x-restli-id header
    const postId = response.headers['x-restli-id'];

    return {
      success: true,
      id: postId,
      urn: `urn:li:share:${postId}`,
      // LinkedIn doesn't return direct URL in API, construct it
      url: `https://www.linkedin.com/feed/update/${postId}/`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      code: error.response?.status,
    };
  }
}

export { createPost };
```

### Step 9: Build Validator (15 min)

**File:** `bmad/modules/linkedin-api-client/lib/validator.js`

```javascript
import { stat } from 'fs/promises';
import { extname } from 'path';

const LIMITS = {
  TEXT_MAX: 3000,
  TEXT_OPTIMAL_MAX: 1600,
  HOOK_MAX: 140,
  MULTI_IMAGE_MIN: 2,
  MULTI_IMAGE_MAX: 20,
  IMAGE_MAX_PIXELS: 36152320, // ~36M pixels
  DOCUMENT_MAX_SIZE: 100 * 1024 * 1024, // 100MB
  DOCUMENT_MAX_PAGES: 300,
  POSTS_PER_DAY: 150,
};

const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];
const SUPPORTED_DOCUMENT_FORMATS = ['.pdf', '.ppt', '.pptx', '.doc', '.docx'];

export async function validateLinkedInPost(request) {
  const errors = [];
  const warnings = [];

  // Validate text
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

  // Validate media (if present)
  if (request.images && request.images.length > 0) {
    // Multi-image validation
    if (request.images.length < LIMITS.MULTI_IMAGE_MIN && request.images.length !== 1) {
      errors.push(`Multi-image posts require ${LIMITS.MULTI_IMAGE_MIN}-${LIMITS.MULTI_IMAGE_MAX} images (or use single image)`);
    }

    if (request.images.length > LIMITS.MULTI_IMAGE_MAX) {
      errors.push(`Maximum ${LIMITS.MULTI_IMAGE_MAX} images per post`);
    }

    // Check each image
    for (const imagePath of request.images) {
      const ext = extname(imagePath).toLowerCase();

      if (!SUPPORTED_IMAGE_FORMATS.includes(ext)) {
        errors.push(`Unsupported image format: ${ext} (use JPG, PNG, or GIF)`);
        continue;
      }

      try {
        const stats = await stat(imagePath);
        // LinkedIn uses pixel limit, not file size
        // We can't check pixels without reading image, so just warn for large files
        const sizeMB = stats.size / (1024 * 1024);
        if (sizeMB > 10) {
          warnings.push(`${imagePath} is ${sizeMB.toFixed(1)}MB - may exceed pixel limit`);
        }
      } catch (err) {
        errors.push(`Cannot access image: ${imagePath}`);
      }
    }
  }

  // Validate document (if present)
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

  // Cannot have both multi-image and document
  if (request.images && request.images.length > 0 && request.document) {
    errors.push('Cannot include both images and document in same post');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export { LIMITS, SUPPORTED_IMAGE_FORMATS, SUPPORTED_DOCUMENT_FORMATS };
```

### Step 10: Build Rate Limiter (10 min)

**File:** `bmad/modules/linkedin-api-client/lib/rate-limiter.js`

```javascript
// Copy from Twitter module with LinkedIn limits
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RATE_FILE = join(__dirname, '../.rate-limit-state.json');

const LIMITS = {
  DAILY: 150, // LinkedIn limit
  HOURLY_RECOMMENDED: 25,
};

export class RateLimiter {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    if (existsSync(RATE_FILE)) {
      try {
        return JSON.parse(readFileSync(RATE_FILE, 'utf8'));
      } catch {
        return this.createFreshState();
      }
    }
    return this.createFreshState();
  }

  createFreshState() {
    return {
      dailyCount: 0,
      hourlyCount: 0,
      lastReset: {
        daily: new Date().toISOString(),
        hourly: new Date().toISOString(),
      },
    };
  }

  saveState() {
    writeFileSync(RATE_FILE, JSON.stringify(this.state, null, 2));
  }

  checkAndReset() {
    const now = new Date();
    const lastReset = {
      daily: new Date(this.state.lastReset.daily),
      hourly: new Date(this.state.lastReset.hourly),
    };

    if (now.getDate() !== lastReset.daily.getDate()) {
      this.state.dailyCount = 0;
      this.state.lastReset.daily = now.toISOString();
    }

    if (now.getHours() !== lastReset.hourly.getHours()) {
      this.state.hourlyCount = 0;
      this.state.lastReset.hourly = now.toISOString();
    }

    this.saveState();
  }

  async checkLimit() {
    this.checkAndReset();

    const warnings = [];
    const errors = [];

    if (this.state.dailyCount >= LIMITS.DAILY) {
      errors.push(`Daily limit reached (${LIMITS.DAILY} posts/day)`);
    }

    if (this.state.hourlyCount >= LIMITS.HOURLY_RECOMMENDED) {
      warnings.push(`Hourly recommendation exceeded (${LIMITS.HOURLY_RECOMMENDED} posts/hour)`);
    }

    return {
      allowed: errors.length === 0,
      errors,
      warnings,
      remaining: {
        daily: LIMITS.DAILY - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }

  incrementCount() {
    this.state.dailyCount++;
    this.state.hourlyCount++;
    this.saveState();
  }

  getStats() {
    this.checkAndReset();
    return {
      counts: {
        daily: this.state.dailyCount,
        hourly: this.state.hourlyCount,
      },
      limits: LIMITS,
      remaining: {
        daily: LIMITS.DAILY - this.state.dailyCount,
        hourly: LIMITS.HOURLY_RECOMMENDED - this.state.hourlyCount,
      },
    };
  }
}
```

### Step 11: Build Main Client (25 min)

**File:** `bmad/modules/linkedin-api-client/lib/client.js`

```javascript
import { linkedinConfig, validateConfig } from '../config.js';
import { getAuthorizationUrl, exchangeCodeForToken, getUserInfo } from './auth.js';
import { uploadImage, uploadMultipleImages } from './images.js';
import { uploadDocument } from './documents.js';
import { createTextPost, createImagePost, createMultiImagePost, createDocumentPost } from './posts.js';
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

      // Get user info
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
   * Get rate limit stats
   */
  getRateLimitStats() {
    return this.rateLimiter.getStats();
  }
}
```

### Step 12: Build Main Export (5 min)

**File:** `bmad/modules/linkedin-api-client/index.js`

```javascript
import { LinkedInClient } from './lib/client.js';

export default LinkedInClient;
export { LinkedInClient };

export function createLinkedInClient(credentials) {
  return new LinkedInClient(credentials);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LinkedInClient, createLinkedInClient, default: LinkedInClient };
}
```

### Step 13: Create Tests (15 min)

**File:** `bmad/modules/linkedin-api-client/__tests__/integration.test.js`

```javascript
import { LinkedInClient } from '../lib/client.js';

console.log('LinkedIn API Integration Tests');
console.log('=================================\n');

const client = new LinkedInClient();

// Test 1: Get auth URL
console.log('Test 1: Get authorization URL...');
const authUrl = client.getAuthUrl();
console.log(`✓ Auth URL: ${authUrl.substring(0, 100)}...`);

// Test 2: Authenticate (requires manual code from OAuth flow)
console.log('\nTest 2: Authentication');
console.log('Run this test manually:');
console.log('1. Open auth URL in browser');
console.log('2. Authorize and get code');
console.log('3. Pass code to client.authenticate(code)');

// Test 3: Rate limit stats
console.log('\nTest 3: Check rate limit stats...');
const stats = client.getRateLimitStats();
console.log('✓ Stats:', stats);

console.log('\n✅ Basic tests complete!');
console.log('\nTo test posting:');
console.log('1. Complete OAuth flow');
console.log('2. Use client.postText("Test post")');
console.log('3. Use client.postWithImage("Caption", "/path/to/image.jpg")');
```

---

## 🧪 Testing Strategy

### Manual OAuth Flow Test

```bash
# Test OAuth flow
node -e "
import('./bmad/modules/linkedin-api-client/index.js').then(({ LinkedInClient }) => {
  const client = new LinkedInClient();
  const url = client.getAuthUrl();
  console.log('Open this URL:', url);
  console.log('\nAfter authorizing, get the code from callback URL');
  console.log('Then run: client.authenticate(code)');
});
"
```

### Integration Test Sequence

```bash
# After OAuth complete:
node -e "
import('./bmad/modules/linkedin-api-client/index.js').then(async ({ LinkedInClient }) => {
  const client = new LinkedInClient();

  // Set token manually (from OAuth flow)
  client.setAccessToken('YOUR_TOKEN', 'urn:li:person:YOUR_ID');

  // Test 1: Text post
  const result1 = await client.postText('Test post from LinkedIn API client!');
  console.log('Text post:', result1);

  // Test 2: Image post
  const result2 = await client.postWithImage(
    'Check out this image!',
    '/Users/sid/Desktop/4. Coding Projects/social-media-manager/sid-car.jpeg'
  );
  console.log('Image post:', result2);

  // Test 3: Multi-image carousel
  const result3 = await client.postMultiImage(
    'Multi-image test!',
    ['/path/img1.jpg', '/path/img2.jpg', '/path/img3.jpg']
  );
  console.log('Multi-image:', result3);
});
"
```

---

## ✅ Validation Gates

### Syntax & Style

```bash
npm run lint:fix
npm run format:fix
```

### Integration Tests

```bash
node bmad/modules/linkedin-api-client/__tests__/integration.test.js

# Expected output:
# ✓ Auth URL: https://www.linkedin.com/oauth/v2/authorization...
# ✓ Stats: { counts: {...}, limits: {...}, remaining: {...} }
# ✅ Basic tests complete!
```

### Real Posting Test

```bash
# After OAuth flow complete with real code
# Should successfully post to user's personal LinkedIn profile
```

---

## 🎯 Implementation Tasks (In Order)

1. **Create module directory structure**

   ```bash
   mkdir -p bmad/modules/linkedin-api-client/lib
   mkdir -p bmad/modules/linkedin-api-client/__tests__
   ```

2. **Create package.json and install dependencies**

   ```bash
   cd bmad/modules/linkedin-api-client
   # Create package.json
   npm install
   ```

3. **Build config.js** - Load credentials from .env

4. **Build lib/auth.js** - OAuth 2.0 flow (simpler than Twitter!)

5. **Build lib/formatter.js** - Text formatting and escaping

6. **Build lib/images.js** - Image upload via Images API

7. **Build lib/documents.js** - Document/PDF upload via Documents API

8. **Build lib/posts.js** - Post creation helpers (all types)

9. **Build lib/validator.js** - Input validation

10. **Build lib/rate-limiter.js** - Daily rate limiting

11. **Build lib/client.js** - Main LinkedInClient class

12. **Build index.js** - Module exports

13. **Create **tests**/integration.test.js**

14. **Run tests** - Verify auth URL generation

15. **Complete OAuth flow** - Get real access token

16. **Test posting** - Text, image, multi-image, PDF

---

## 🚨 Critical Implementation Notes

### 1. Headers are MANDATORY

**Every API call must include:**

```javascript
{
  "Authorization": "Bearer ACCESS_TOKEN",
  "LinkedIn-Version": "202510",  // Update to current YYYYMM
  "X-Restli-Protocol-Version": "2.0.0"
}
```

**Without these:** API returns 400 Bad Request

### 2. Person URN Format

**Correct:** `urn:li:person:abc123xyz`
**Source:** `/v2/userinfo` returns `sub` field
**Usage:** Every post requires this as `author`

### 3. Post ID from Headers

**LinkedIn returns post ID in response headers:**

```javascript
const postId = response.headers['x-restli-id'];
```

**NOT in response body!** This is different from Twitter.

### 4. URN vs ID

**Image URN example:** `urn:li:image:C4D12AQGkQg...`
**Document URN example:** `urn:li:document:D5510AQFx87...`
**Person URN example:** `urn:li:person:abc123xyz`

Always use complete URN in API calls.

### 5. Multi-Image Minimum

**LinkedIn requires minimum 2 images** for multi-image posts.
**For single image:** Use regular image post (not multi-image)

### 6. OAuth Token Expiry

**LinkedIn tokens expire after 60 days.**
**Store token:** Save to file for reuse
**Refresh:** Re-run OAuth flow when expired

---

## 📦 Dependencies

**Required:**

```json
{
  "dependencies": {
    "axios": "^1.6.7",
    "dotenv": "^16.4.5",
    "form-data": "^4.0.0"
  }
}
```

**Already in project:** ✅ (check root package.json)

**Install in module:**

```bash
cd bmad/modules/linkedin-api-client
npm install axios dotenv form-data
```

---

## 🏗️ Existing Codebase Patterns to Follow

### Pattern 1: Module Structure

**Reference:** `bmad/modules/twitter-api-client/`

```
✅ Same structure
✅ Same config.js pattern (load from .env)
✅ Same lib/ organization
✅ Same __tests__/ structure
✅ Same export pattern in index.js
```

### Pattern 2: Config Loading

**Reference:** `bmad/modules/twitter-api-client/config.js`

```javascript
// Load .env from project root (3 levels up)
config({ path: join(__dirname, '../../../.env') });

// Validate required credentials
export function validateConfig() {
  /* check all required */
}
```

### Pattern 3: Rate Limiter

**Reference:** `bmad/modules/twitter-api-client/lib/rate-limiter.js`

```javascript
// Save state to .rate-limit-state.json
// Track daily/hourly counts
// Auto-reset on date/hour change
// Provide getStats() method
```

### Pattern 4: Validator

**Reference:** `bmad/modules/twitter-api-client/lib/validator.js`

```javascript
// Return { valid, errors, warnings }
// Check file existence with stat()
// Check file sizes
// Check formats
// Async function for file system checks
```

### Pattern 5: Client Class

**Reference:** `bmad/modules/twitter-api-client/lib/client.js`

```javascript
// Class with constructor(credentials)
// Initialize rate limiter in constructor
// All methods return { success, ...data } or { success: false, error }
// Never throw errors, always return structured response
// Increment rate limiter on successful post
```

### Pattern 6: Testing

**Reference:** `bmad/modules/twitter-api-client/__tests__/integration.test.js`

```javascript
// Console.log for output
// Exit code 0 for success, 1 for failure
// Test basic methods first
// Real API tests require credentials
// Clear ✓ and ✗ indicators
```

---

## 🎨 Code Style Guidelines

**From Project:**

- Node.js >=20.0.0
- ESM modules (`type: "module"`)
- Use `import/export`, not `require`
- async/await for async operations
- JSDoc comments for public methods
- Use `npm run lint:fix` and `npm run format:fix`

**From Twitter Module:**

- Structured error responses (never throw)
- Rate limiter integration in client
- Validation before API calls
- Console logging for progress
- File system operations with try/catch

---

## 🎯 Implementation Pseudocode

```
1. CREATE module structure
   └── bmad/modules/linkedin-api-client/{lib,__tests__}

2. CREATE package.json
   └── Dependencies: axios, dotenv, form-data

3. IMPLEMENT config.js
   ├── Load LINKEDIN_CLIENT_ID
   ├── Load LINKEDIN_CLIENT_SECRET
   └── Load LINKEDIN_REDIRECT_URI

4. IMPLEMENT lib/auth.js
   ├── getAuthorizationUrl() → OAuth URL
   ├── exchangeCodeForToken(code) → access_token
   └── getUserInfo(token) → person URN

5. IMPLEMENT lib/formatter.js
   ├── escapeLinkedInText(text) → escaped text
   ├── formatLineBreaks(text) → normalized
   └── formatPostText(text) → {formatted, warnings}

6. IMPLEMENT lib/images.js
   ├── uploadImage(path, token, urn) → image URN
   └── uploadMultipleImages(paths[], token, urn) → URNs[]

7. IMPLEMENT lib/documents.js
   └── uploadDocument(path, token, urn) → document URN

8. IMPLEMENT lib/posts.js
   ├── createTextPost(token, urn, text)
   ├── createImagePost(token, urn, text, imageUrn)
   ├── createMultiImagePost(token, urn, text, imageData[])
   └── createDocumentPost(token, urn, text, docUrn, title)

9. IMPLEMENT lib/validator.js
   ├── Validate text length (max 3000)
   ├── Validate image count (1 or 2-20)
   ├── Validate document size (max 100MB)
   └── Return {valid, errors, warnings}

10. IMPLEMENT lib/rate-limiter.js
    ├── Track daily count (max 150)
    ├── Track hourly count (recommended 25)
    ├── Save to .rate-limit-state.json
    └── Provide getStats()

11. IMPLEMENT lib/client.js
    ├── LinkedInClient class
    ├── authenticate(code) method
    ├── postText(text) method
    ├── postWithImage(text, path) method
    ├── postMultiImage(text, paths[]) method
    ├── postDocument(text, pdfPath) method
    └── getRateLimitStats() method

12. IMPLEMENT index.js
    └── Export LinkedInClient

13. CREATE integration tests

14. TEST OAuth flow

15. TEST posting to personal account
```

---

## 🐛 Gotchas & Edge Cases

### 1. LinkedIn-Version Header Must Be Current Month

**Issue:** LinkedIn-Version must be in YYYYMM format
**Current:** "202510" (October 2025)
**Update:** Change to "202511" in November, etc.

**Solution:** Could auto-generate:

```javascript
const now = new Date();
const version = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
```

### 2. Multi-Image Requires Minimum 2 Images

**Issue:** Can't create multi-image post with 1 image
**Solution:** Use regular image post for single images

```javascript
if (images.length === 1) {
  return createImagePost(...);  // Regular post
} else if (images.length >= 2) {
  return createMultiImagePost(...);  // Multi-image
}
```

### 3. Person URN Must Match Token

**Issue:** Token is tied to specific user
**Solution:** Get person URN from /v2/userinfo after getting token
**Store both:** accessToken AND personUrn together

### 4. Post ID in Response Headers (Not Body!)

**Issue:** Different from Twitter where ID is in body
**Solution:**

```javascript
const postId = response.headers['x-restli-id']; // ← Header!
```

### 5. Image Upload is Two-Step

**Issue:** Must initialize then upload (two requests)
**Solution:** Handle in uploadImage() function:

1. POST /rest/images?action=initializeUpload → Get uploadUrl
2. PUT uploadUrl → Upload binary

### 6. Document Posts Show as Carousels

**Issue:** User might not realize PDF appears as carousel
**Solution:** Document in README and validate file is PDF/PPT

### 7. Text Escaping May Not Be Needed

**Issue:** Documentation says escape special chars, but simple posts work without
**Solution:** Start without escaping, add if needed based on testing

---

## 📊 Success Criteria

### MVP Complete When:

1. ✅ Module created in `bmad/modules/linkedin-api-client/`
2. ✅ Dependencies installed
3. ✅ Config loads credentials from `.env`
4. ✅ OAuth flow generates auth URL
5. ✅ Can exchange code for access token
6. ✅ Can get person URN
7. ✅ Can post text-only to personal account
8. ✅ Can post with single image
9. ✅ Can post multi-image (2-20 images)
10. ✅ Can post PDF document (carousel)
11. ✅ Rate limiter tracks usage
12. ✅ Validation prevents errors
13. ✅ Tests pass
14. ✅ No linting errors

### Integration Complete When:

15. ✅ Workflows created for LinkedIn posting
16. ✅ Social Posting Agent can use LinkedIn module
17. ✅ End-to-end test successful

---

## 🔗 Essential Reference Links

### Official Documentation

- [LinkedIn OAuth 2.0](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [Images API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/images-api)
- [Documents API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/documents-api)
- [MultiImage API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/multiimage-post-api)
- [little Text Format](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format)
- [Getting Access](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access)

### Implementation Examples

- [Posting to LinkedIn via API (Feb 2025)](https://marcusnoble.co.uk/2025-02-02-posting-to-linkedin-via-the-api/)
- [LinkedIn API Integration Guide](https://www.unipile.com/linkedin-api-a-comprehensive-guide-to-integration/)

---

## 🎓 Learning Outcomes

After implementation, you'll understand:

1. **OAuth 2.0 flow** - Simpler than Twitter's OAuth 1.0a
2. **LinkedIn API structure** - REST-based with URN system
3. **Multi-step uploads** - Initialize → Upload pattern
4. **Multi-image posts** - Grid carousel alternative
5. **Document posts** - PDF-to-carousel conversion
6. **Rate limiting** - Daily limits vs Twitter's monthly
7. **Header requirements** - Platform-specific headers

---

## 📈 Performance Considerations

### Image Upload

- Single image: ~2-3 seconds (initialize + upload)
- Multiple images: ~3-5 seconds (parallel uploads)

### Document Upload

- Small PDF (<10MB): ~5-10 seconds
- Large PDF (100MB): ~30-60 seconds

### Rate Limiting

- Minimal overhead (<1ms)
- State persisted to JSON

---

## 🔒 Security Best Practices

### Token Storage

- ✅ Store access token securely
- ✅ Never log tokens
- ✅ Token expires after 60 days
- ✅ Re-authenticate when expired

### Credentials

- ✅ Load from `.env` (never hardcode)
- ✅ Never commit `.env` to git
- ✅ Client secret stays server-side

### Error Messages

- ✅ Don't expose tokens in errors
- ✅ Generic errors for users
- ✅ Detailed logs only in development

---

## 🎯 Confidence Score: 9.5/10

### Why 9.5/10 (Higher Than Twitter!):

**Strengths (+):**

- ✅ Twitter module works perfectly (proven pattern)
- ✅ LinkedIn is **simpler** than Twitter (OAuth 2.0)
- ✅ No complex signature generation needed
- ✅ Clear API documentation
- ✅ User's products already approved
- ✅ Comprehensive research complete
- ✅ Well-defined requirements
- ✅ Multiple working examples found

**Risks (-):**

- ⚠️ Multi-image API is new (but well-documented)
- ⚠️ Documents API untested (but straightforward)
- ⚠️ LinkedIn-Version header needs monthly update

**Mitigation:**

- Follow Twitter module structure exactly
- Test incrementally (text → image → multi-image → PDF)
- Comprehensive error handling
- Clear validation

**Why not 10/10:**

- First time with LinkedIn's specific APIs
- Multi-image and Documents APIs are new territory
- Monthly LinkedIn-Version header maintenance

**Expected Outcome:** One-pass implementation success with high confidence

---

## 📝 Checklist for AI Agent

When implementing this PRP:

- [ ] Create all directory structures
- [ ] Create package.json with dependencies
- [ ] npm install in module directory
- [ ] Implement config.js (load credentials from .env)
- [ ] Implement lib/auth.js (OAuth 2.0 flow)
- [ ] Implement lib/formatter.js (text escaping)
- [ ] Implement lib/images.js (image upload)
- [ ] Implement lib/documents.js (PDF upload)
- [ ] Implement lib/posts.js (all post types)
- [ ] Implement lib/validator.js (input validation)
- [ ] Implement lib/rate-limiter.js (daily limits)
- [ ] Implement lib/client.js (LinkedInClient class)
- [ ] Implement index.js (exports)
- [ ] Create **tests**/integration.test.js
- [ ] Run validation gates
- [ ] Test OAuth flow
- [ ] Test text posting
- [ ] Test image posting
- [ ] Test multi-image posting
- [ ] Test PDF document posting
- [ ] Verify no linting errors
- [ ] Document any deviations

---

## 💡 Tips for One-Pass Success

1. **Copy Twitter patterns** - Structure is proven
2. **OAuth 2.0 is easier** - No signature generation needed!
3. **Test incrementally** - Text first, then images, then PDF
4. **Check headers** - LinkedIn-Version and X-Restli-Protocol-Version on every call
5. **Handle URNs carefully** - Complete format required
6. **Use console.log** - Track upload progress
7. **Return structured responses** - Like Twitter: {success, ...}
8. **Check response headers** - Post ID comes from headers!

---

## 🎬 Real-World Usage Examples

### Example 1: Text Post

```javascript
import { LinkedInClient } from './bmad/modules/linkedin-api-client/index.js';

const client = new LinkedInClient();

// First time: Get auth URL
const authUrl = client.getAuthUrl();
console.log('Open:', authUrl);

// After user authorizes, get code and authenticate
const auth = await client.authenticate('CODE_FROM_CALLBACK');
console.log('Authenticated:', auth.name);

// Post text
const result = await client.postText(
  'Excited to share that we just built a LinkedIn API integration! 🚀\n\n' +
    'Key features:\n' +
    '• Post to personal account\n' +
    '• Multi-image carousels\n' +
    '• PDF document carousels\n\n' +
    '#automation #linkedin #api',
);

console.log(result.url); // View post
```

### Example 2: Multi-Image Carousel

```javascript
const result = await client.postMultiImage(
  'Check out these 5 amazing photos from our project! 📸',
  ['/path/to/photo1.jpg', '/path/to/photo2.jpg', '/path/to/photo3.jpg', '/path/to/photo4.jpg', '/path/to/photo5.jpg'],
  ['Photo 1: Initial concept', 'Photo 2: Development phase', 'Photo 3: Testing', 'Photo 4: Launch day', 'Photo 5: Success!'],
);

// Result: Grid of 5 images, swipeable on mobile
```

### Example 3: PDF Carousel

```javascript
const result = await client.postDocument(
  'Here's our complete guide to social media automation! 📊\n\n' +
  'Swipe through to learn how we built this system.\n\n' +
  '#socialmedia #automation #guide',
  '/path/to/presentation.pdf',
  'Social Media Automation Guide'
);

// Result: PDF appears as swipeable carousel on LinkedIn!
```

---

## 🔍 Comparison: LinkedIn vs Twitter Implementation

| Aspect                  | Twitter               | LinkedIn                  | Winner      |
| ----------------------- | --------------------- | ------------------------- | ----------- |
| **OAuth**               | OAuth 1.0a (complex)  | OAuth 2.0 (simple)        | LinkedIn ✅ |
| **Signature**           | HMAC-SHA1 per request | Bearer token only         | LinkedIn ✅ |
| **Library Needed**      | twitter-api-v2        | Just axios                | LinkedIn ✅ |
| **Headers**             | Standard              | LinkedIn-Version required | Even        |
| **Media Upload**        | v1.1 endpoint         | rest/images modern        | LinkedIn ✅ |
| **Post Creation**       | v2 endpoint           | rest/posts modern         | Even        |
| **Carousels**           | Not supported         | Multi-image + PDF         | LinkedIn ✅ |
| **Implementation Time** | 1.5-2 hours           | 1-1.5 hours               | LinkedIn ✅ |
| **Complexity**          | Medium                | **Lower**                 | LinkedIn ✅ |

**Conclusion:** LinkedIn is actually EASIER to implement than Twitter!

---

## 📚 Additional Context

### Why Build Custom Module vs Fix linkedin-mcp?

**linkedin-mcp Issues:**

- Python environment conflicts
- Module import errors persist after multiple fixes
- Unknown additional limitations
- Harder to debug and maintain

**Custom Module Benefits:**

- ✅ Same proven pattern as Twitter
- ✅ No Python dependencies
- ✅ Full control over features
- ✅ Easier to debug and extend
- ✅ Consistent with project architecture

**Time Trade-off:**

- Fix MCP: Unknown time, uncertain outcome
- Build custom: 1-1.5 hours, high confidence

**Decision:** Build custom module (better investment)

---

## 🚀 Post-Implementation Next Steps

### After Module Complete:

1. **Create LinkedIn workflows** (4 files):
   - `linkedin-post-text.yaml`
   - `linkedin-post-image.yaml`
   - `linkedin-post-multiimage.yaml`
   - `linkedin-post-pdf.yaml`

2. **Integrate with Social Posting Agent**:
   - Add commands to agent menu
   - Reference workflows
   - Test end-to-end

3. **Test with real content**:
   - Post text update
   - Post with sid-car.jpeg
   - Post multi-image gallery
   - Post PDF presentation

---

## 📋 User's Current Setup

**From .env:**

```bash
LINKEDIN_CLIENT_ID="86litgbscvi400"
LINKEDIN_CLIENT_SECRET="YOUR_LINKEDIN_CLIENT_SECRET"
LINKEDIN_REDIRECT_URI="http://localhost:3000/callback"
```

**LinkedIn Products Approved:**

- ✅ "Share on LinkedIn" → `w_member_social`
- ✅ "Sign In with LinkedIn using OpenID Connect" → `openid`, `profile`, `email`

**Ready to:**

1. Generate OAuth URL
2. User authorizes
3. Exchange code for token
4. Get person URN
5. Start posting to personal account!

---

## 🎯 Why This Will Succeed

1. **Proven pattern** - Twitter module works perfectly
2. **Simpler tech** - OAuth 2.0 vs OAuth 1.0a
3. **Clear requirements** - All content types defined
4. **Complete research** - Every API endpoint documented
5. **User ready** - Products approved, credentials configured
6. **Testing strategy** - Incremental validation
7. **Error handling** - Structured responses like Twitter
8. **Rate limiting** - Daily tracking implemented

**This is a carbon copy of Twitter's success, but EASIER!**

---

## ✅ Validation Gates

### Linting

```bash
npm run lint:fix
npm run format:fix
```

### Module Tests

```bash
node bmad/modules/linkedin-api-client/__tests__/integration.test.js

# Expected:
# ✓ Auth URL: https://www.linkedin.com/oauth/...
# ✓ Stats: {...}
# ✅ Basic tests complete!
```

### Real Posting (Manual)

```bash
# After OAuth:
# 1. Text post → Success
# 2. Image post → Success
# 3. Multi-image → Success
# 4. PDF → Success
```

---

## 🎬 Ready to Implement!

This PRP provides complete context for one-pass implementation:

- ✅ Full technical research
- ✅ Complete API documentation
- ✅ Proven architecture (Twitter module)
- ✅ Line-by-line code examples
- ✅ Testing strategy
- ✅ Validation gates
- ✅ Gotchas documented
- ✅ User's setup verified

**Estimated time:** 1-1.5 hours
**Confidence:** 9.5/10 (higher than Twitter!)

---

**Execute with:** `/execute-prp PRPs/linkedin-api-complete-integration.md`
