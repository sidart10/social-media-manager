# Twitter API v2 Integration - Implementation Plan

**Goal:** Build complete Twitter Premium posting support with long-form text, media uploads, and threads

**Your Account:** Twitter Premium (25,000 character limit)

**Current Issue:** `mcp_twitter` only supports 280 characters and no media uploads

---

## 🎯 Project Understanding

### Current Project Structure

```
social-media-manager/
├── bmad/
│   ├── agents/
│   │   └── social-posting-agent/     ← Our agent location
│   ├── modules/                      ← Custom modules
│   └── core/                         ← BMAD framework
├── src/                              ← Source code location
├── .env                              ← API credentials ✅
└── package.json                      ← Node.js project
```

### Project Purpose

This is a **Social Media Manager** project built on the BMAD-CORE framework, designed to create AI agents that can post content across multiple platforms.

---

## 📊 Twitter API v2 Research Summary

### What You Have (Premium Account)

✅ **Long-form posts:** Up to 25,000 characters
✅ **Media uploads:** Up to 4 images or 1 video per tweet
✅ **Free tier posting:** 1,500 posts/month (app level)
✅ **Premium features:** Edit tweets, longer videos, etc.

### API Endpoints We Need

#### 1. Media Upload (v1.1 endpoint - still used)

```
POST https://upload.twitter.com/1.1/media/upload.json
```

**Why v1.1?** Twitter API v2 media upload was just announced in Jan 2025 but v1.1 is more stable and widely used.

**Two Upload Methods:**

**A) Simple Upload (Images ≤5MB)**

- One-step upload
- Returns media_id immediately
- Best for small images

**B) Chunked Upload (Videos, Large Images, GIFs)**

- Three-step process: INIT → APPEND → FINALIZE
- Supports up to 512MB videos
- Handles large files reliably

#### 2. Create Tweet (v2 endpoint)

```
POST https://api.x.com/2/tweets
```

**Payload for text-only:**

```json
{
  "text": "Your 25,000 character post here..."
}
```

**Payload with media:**

```json
{
  "text": "Caption with #hashtags",
  "media": {
    "media_ids": ["123456789", "987654321"]
  }
}
```

---

## 🔍 Technical Specifications

### File Size Limits

| Media Type | Max Size | Format               |
| ---------- | -------- | -------------------- |
| **Images** | 5 MB     | JPEG, PNG, GIF, WEBP |
| **GIFs**   | 15 MB    | GIF (animated)       |
| **Videos** | 512 MB   | MP4, MOV             |

### Character Limits

| Account Type     | Character Limit   |
| ---------------- | ----------------- |
| **Free/Basic**   | 280 characters    |
| **Blue/Premium** | 25,000 characters |
| **Your Account** | 25,000 ✅         |

### Media Limits Per Tweet

- **Images:** Up to 4 per tweet
- **Videos:** 1 per tweet
- **GIF:** 1 per tweet (cannot combine with images/video)

---

## 🛠️ Implementation Plan

### Phase 1: Simple Image Upload (1 hour)

**Goal:** Post tweets with 1-4 images

**Steps:**

1. **Create Twitter Client Module**

   ```
   Location: bmad/modules/twitter-api-client/
   Files:
   ├── index.js                    # Main client
   ├── auth.js                     # OAuth 1.0a signature
   ├── media-upload.js             # Simple upload
   └── tweet-create.js             # Create tweet v2
   ```

2. **Implement OAuth 1.0a Signature**
   - Twitter requires OAuth 1.0a for media upload (v1.1)
   - Use `oauth-1.0a` npm package
   - Sign requests with your 4 credentials

3. **Build Simple Image Upload**

   ```javascript
   async function uploadImage(imagePath) {
     // 1. Read image file
     // 2. Create OAuth signature
     // 3. POST to media/upload endpoint
     // 4. Return media_id
   }
   ```

4. **Build Tweet Creation**

   ```javascript
   async function createTweet(text, mediaIds = []) {
     // 1. Create OAuth 2.0 bearer token OR use OAuth 1.0a
     // 2. POST to /2/tweets with text + media_ids
     // 3. Return tweet_id and URL
   }
   ```

5. **Test with sid-car.jpeg**

---

### Phase 2: Long-form Posts (30 min)

**Goal:** Post up to 25,000 characters

**Implementation:**

- Same as Phase 1
- Just pass longer text in the payload
- Twitter API v2 automatically supports Premium limits

**Test:**

- Post 500 characters
- Post 1,000 characters
- Post 5,000 characters

---

### Phase 3: Chunked Video Upload (1 hour)

**Goal:** Upload videos and GIFs

**Chunked Upload Process:**

```javascript
async function uploadVideoChunked(videoPath) {
  // STEP 1: INIT
  const initResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
    method: 'POST',
    body: 'command=INIT&total_bytes=FILE_SIZE&media_type=video/mp4'
  });
  const mediaId = initResponse.media_id_string;

  // STEP 2: APPEND (in chunks)
  const chunks = readFileInChunks(videoPath, 5MB);
  for (let i = 0; i < chunks.length; i++) {
    await fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      body: new FormData({
        command: 'APPEND',
        media_id: mediaId,
        segment_index: i,
        media: chunks[i]
      })
    });
  }

  // STEP 3: FINALIZE
  await fetch('https://upload.twitter.com/1.1/media/upload.json', {
    method: 'POST',
    body: 'command=FINALIZE&media_id=' + mediaId
  });

  // STEP 4: Check processing status (for videos)
  while (status !== 'succeeded') {
    await sleep(checkAfterSecs);
    status = await checkStatus(mediaId);
  }

  return mediaId;
}
```

---

### Phase 4: Thread Support (30 min)

**Goal:** Post threads with media

**Implementation:**

```javascript
async function createThread(tweets) {
  let previousTweetId = null;

  for (const tweet of tweets) {
    // Upload media if present
    const mediaIds = await Promise.all(tweet.media.map((m) => uploadImage(m)));

    // Create tweet with reply_to if not first
    const payload = {
      text: tweet.text,
      media: { media_ids: mediaIds },
      ...(previousTweetId && {
        reply: { in_reply_to_tweet_id: previousTweetId },
      }),
    };

    const response = await createTweet(payload);
    previousTweetId = response.id;
  }
}
```

---

## 📦 Dependencies Required

```json
{
  "dependencies": {
    "oauth-1.0a": "^2.2.6",
    "crypto": "built-in",
    "axios": "^1.6.0",
    "form-data": "^4.0.0"
  }
}
```

---

## 🔐 Authentication Architecture

### OAuth 1.0a (Media Upload - v1.1 endpoint)

**Required for:** `POST media/upload`

**Credentials Needed:**

```javascript
{
  consumerKey: "5AroJ2wiiBeLPQGrcP1o35uUF",
  consumerSecret: "8KVXKoCw5uBt9Kid9NGBGO4JdFvPheLCz0ShSlyF7vtZFYfPZZ",
  accessToken: "1574727684-nairE4fBr5WbJCPYr8af3Ra4u7yKVyJFS2QploQ",
  accessTokenSecret: "XBPWIKm0sXOwItUYg8VKKHtBdYTrmFzI17l3Birk9eB4H"
}
```

**Process:**

1. Generate OAuth signature for each request
2. Include in Authorization header
3. Works for media upload (v1.1)

### OAuth 2.0 / Bearer Token (Tweet Creation - v2 endpoint)

**Required for:** `POST /2/tweets`

**Options:**

**Option A: Use Bearer Token**

```
Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAIUykQEAAAAA...
```

**Option B: Use OAuth 1.0a** (more reliable with your existing credentials)

- Can also be used for v2 endpoints
- Same signature process

---

## 📝 Complete Implementation Code Structure

### File Structure

```
bmad/modules/twitter-api-client/
├── package.json
├── index.js                    # Main export
├── lib/
│   ├── auth.js                 # OAuth 1.0a signature generator
│   ├── media.js                # Media upload (simple + chunked)
│   ├── tweets.js               # Tweet creation (v2)
│   └── utils.js                # Helpers
├── config.js                   # Load credentials from .env
└── README.md                   # Usage documentation
```

### Example Usage (What the Agent Will Use)

```javascript
import TwitterClient from './bmad/modules/twitter-api-client';

const client = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Example 1: Post with image
const mediaId = await client.uploadImage('/path/to/sid-car.jpeg');
const tweet = await client.createTweet({
  text: 'Check out this awesome car! 🚗 #premium #longform',
  mediaIds: [mediaId],
});

// Example 2: Long-form post (Premium)
const longTweet = await client.createTweet({
  text: 'This is a very long post that uses all 25,000 characters available with Twitter Premium...',
});

// Example 3: Thread with media
const thread = await client.createThread([
  { text: 'Thread 1/3 - First tweet', media: ['image1.jpg'] },
  { text: 'Thread 2/3 - Second tweet', media: ['image2.jpg'] },
  { text: 'Thread 3/3 - Final tweet', media: [] },
]);
```

---

## 🚀 Implementation Timeline

### Total Time: 3-4 hours

| Phase | Task                           | Time   | Priority |
| ----- | ------------------------------ | ------ | -------- |
| 1     | OAuth 1.0a signature generator | 30 min | High     |
| 2     | Simple image upload            | 30 min | High     |
| 3     | Tweet creation with media      | 30 min | High     |
| 4     | Long-form text support         | 15 min | High     |
| 5     | Chunked video upload           | 1 hour | Medium   |
| 6     | Thread support                 | 30 min | Medium   |
| 7     | Error handling & validation    | 30 min | High     |
| 8     | Testing & documentation        | 30 min | High     |

---

## ✅ Acceptance Criteria

### Must Have (Phase 1-2)

- [ ] Post text-only tweets (up to 25,000 chars)
- [ ] Upload 1-4 images
- [ ] Post tweet with images
- [ ] Return tweet ID and URL
- [ ] Handle errors gracefully

### Nice to Have (Phase 3-4)

- [ ] Upload videos (chunked)
- [ ] Create threads
- [ ] Thread with media
- [ ] Alt text for images
- [ ] Poll for video processing

---

## 🔧 API Endpoints Reference

### Media Upload Endpoints (v1.1)

```
Base URL: https://upload.twitter.com/1.1/media/

Simple Upload:
POST /upload.json
Body: multipart/form-data with 'media' field

Chunked Upload:
POST /upload.json?command=INIT&total_bytes=X&media_type=Y
POST /upload.json?command=APPEND&media_id=X&segment_index=Y
POST /upload.json?command=FINALIZE&media_id=X
GET  /upload.json?command=STATUS&media_id=X
```

### Tweet Creation Endpoints (v2)

```
Base URL: https://api.x.com/2/

Create Tweet:
POST /tweets
Body: {"text": "...", "media": {"media_ids": [...]}}

Create Reply (Thread):
POST /tweets
Body: {"text": "...", "reply": {"in_reply_to_tweet_id": "..."}}
```

---

## 🧪 Testing Plan

### Test 1: Long-form Text (No Media)

```javascript
// Test with 500, 1000, 5000, 10000 characters
// Verify no truncation
// Check Premium account handles it
```

### Test 2: Single Image

```javascript
// Upload sid-car.jpeg
// Create tweet with image
// Verify image displays
```

### Test 3: Multiple Images

```javascript
// Upload 4 different images
// Create tweet with all 4
// Verify carousel displays
```

### Test 4: Long-form + Image

```javascript
// 2000 character text + 1 image
// Verify both work together
```

### Test 5: Thread

```javascript
// 3 tweets, 2 with images
// Verify thread structure
// Verify replies connect
```

---

## 🔒 Security Considerations

### Credentials Storage

- ✅ Already in `.env` file
- ✅ Never commit to git (add to `.gitignore`)
- ✅ Use environment variables in code

### OAuth Signature Security

- Generate fresh signature per request
- Include timestamp and nonce
- Use HMAC-SHA1 signing

### Error Handling

- Don't expose API keys in error messages
- Log errors without credentials
- Handle rate limits gracefully

---

## 📚 Code Examples

### OAuth 1.0a Signature (auth.js)

```javascript
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

function createOAuthClient(credentials) {
  return OAuth({
    consumer: {
      key: credentials.apiKey,
      secret: credentials.apiSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  });
}

function getAuthHeader(url, method, token) {
  const oauth = createOAuthClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
  });

  const authData = oauth.authorize({ url, method }, { key: token.key, secret: token.secret });

  return oauth.toHeader(authData);
}
```

### Simple Image Upload (media.js)

```javascript
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function uploadImageSimple(imagePath) {
  const form = new FormData();
  form.append('media', fs.createReadStream(imagePath));

  const url = 'https://upload.twitter.com/1.1/media/upload.json';
  const authHeader = getAuthHeader(url, 'POST', {
    key: process.env.TWITTER_ACCESS_TOKEN,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const response = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      ...authHeader,
    },
  });

  return response.data.media_id_string;
}
```

### Create Tweet with Media (tweets.js)

```javascript
async function createTweet({ text, mediaIds = [] }) {
  const url = 'https://api.x.com/2/tweets';

  const payload = {
    text: text.substring(0, 25000), // Respect Premium limit
  };

  if (mediaIds.length > 0) {
    payload.media = { media_ids: mediaIds };
  }

  const authHeader = getAuthHeader(url, 'POST', {
    key: process.env.TWITTER_ACCESS_TOKEN,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  });

  return {
    id: response.data.data.id,
    text: response.data.data.text,
    url: `https://twitter.com/user/status/${response.data.data.id}`,
  };
}
```

---

## 🎯 Integration with Social Posting Agent

### Workflow Files to Create

```
bmad/agents/social-posting-agent/workflows/
├── twitter-post-text.yaml          # Long-form text posting
├── twitter-post-image.yaml         # Image + caption
├── twitter-post-video.yaml         # Video upload + post
└── twitter-post-thread.yaml        # Multi-tweet threads
```

### Agent Commands

```yaml
menu:
  - trigger: post-twitter
    workflow: '{project-root}/bmad/agents/social-posting-agent/workflows/twitter-post-image.yaml'
    description: 'Post to Twitter with text and up to 4 images'

  - trigger: post-twitter-thread
    workflow: '{project-root}/bmad/agents/social-posting-agent/workflows/twitter-post-thread.yaml'
    description: 'Post Twitter thread with media'
```

---

## 🧪 Validation Requirements

### Pre-Upload Validation

```javascript
function validateTwitterPost(request) {
  const errors = [];

  // Text length
  if (request.text.length > 25000) {
    errors.push('Text exceeds 25,000 character Premium limit');
  }

  // Media count
  if (request.media.length > 4) {
    errors.push('Maximum 4 images per tweet');
  }

  // Media type consistency
  const hasVideo = request.media.some((m) => m.kind === 'video');
  const hasImage = request.media.some((m) => m.kind === 'image');
  if (hasVideo && hasImage) {
    errors.push('Cannot mix videos and images');
  }

  // File sizes
  for (const media of request.media) {
    const stats = fs.statSync(media.path);
    if (media.kind === 'image' && stats.size > 5 * 1024 * 1024) {
      errors.push(`Image ${media.path} exceeds 5MB limit`);
    }
    if (media.kind === 'video' && stats.size > 512 * 1024 * 1024) {
      errors.push(`Video ${media.path} exceeds 512MB limit`);
    }
  }

  return errors;
}
```

---

## 📊 Rate Limiting Strategy

### Free Tier Limits (Your Current Status)

- **1,500 posts per month** (app level)
- **50 posts per day** (practical limit)

### Implementation

```javascript
class RateLimiter {
  constructor() {
    this.monthlyCount = 0;
    this.dailyCount = 0;
    this.lastResetDate = new Date();
  }

  async checkLimit() {
    // Check if daily reset needed
    const now = new Date();
    if (now.getDate() !== this.lastResetDate.getDate()) {
      this.dailyCount = 0;
      this.lastResetDate = now;
    }

    // Check limits
    if (this.monthlyCount >= 1500) {
      throw new Error('Monthly post limit reached (1500/month)');
    }
    if (this.dailyCount >= 50) {
      throw new Error('Daily post limit reached (50/day recommended)');
    }
  }

  incrementCount() {
    this.monthlyCount++;
    this.dailyCount++;
  }
}
```

---

## 🎯 Minimal Viable Implementation

### Quick Start (What to Build First)

**File:** `bmad/modules/twitter-api-client/simple-poster.js`

```javascript
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// 1. OAuth Setup (30 lines)
// 2. Simple Image Upload (40 lines)
// 3. Create Tweet (30 lines)
// 4. Export functions (10 lines)

// Total: ~100 lines of code for MVP
```

**This gives you:**

- ✅ Long-form text (25,000 chars)
- ✅ Image uploads (1-4 images)
- ✅ Tweet with media
- ✅ Full Premium features

---

## 🚀 Build Order

### Step-by-Step Build Sequence

1. **Create module directory**

   ```bash
   mkdir -p bmad/modules/twitter-api-client/lib
   ```

2. **Install dependencies**

   ```bash
   npm install oauth-1.0a axios form-data
   ```

3. **Build auth.js** (OAuth signature)

4. **Build media.js** (simple upload only)

5. **Build tweets.js** (create tweet)

6. **Build index.js** (export client)

7. **Test with your credentials**

8. **Post sid-car.jpeg successfully!**

9. **Add to Social Posting Agent workflows**

---

## 🎓 What We'll Learn

By building this, you'll understand:

- OAuth 1.0a signatures (authentication)
- Multipart form data uploads
- Twitter's v1.1 and v2 API interaction
- Rate limiting strategies
- Error handling for external APIs

---

## 📋 Success Checklist

- [ ] OAuth 1.0a signature working
- [ ] Image upload returns media_id
- [ ] Tweet creation works
- [ ] Post with 1 image successful
- [ ] Post with 4 images successful
- [ ] Long-form text (2000+ chars) successful
- [ ] sid-car.jpeg posted to Twitter ✅
- [ ] Error handling implemented
- [ ] Rate limiting implemented
- [ ] Integrated into Social Posting Agent

---

## 🔗 Official Documentation Links

- [Twitter API v2 Overview](https://developer.x.com/en/docs/twitter-api)
- [POST /2/tweets](https://developer.x.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets)
- [Media Upload (v1.1)](https://developer.x.com/en/docs/twitter-api/v1/media/upload-media/overview)
- [Tweeting Media with v2](https://developer.x.com/en/docs/tutorials/tweeting-media-v2)
- [OAuth 1.0a Guide](https://developer.x.com/en/docs/authentication/oauth-1-0a)

---

## 💡 Recommendation

**Build Phase 1 + 2 NOW (1.5 hours):**

1. OAuth signature generator
2. Simple image upload
3. Tweet creation with media
4. Test with sid-car.jpeg
5. Test with long-form text

**This gives you:**

- Full Twitter Premium posting ✅
- Image support (up to 4 per tweet) ✅
- Long-form text (25,000 chars) ✅
- Ready to integrate into agent ✅

**Add Phase 3 + 4 later:**

- Video upload (when needed)
- Thread support (when needed)

---

**Ready to start building?** 🛠️

Say "yes" and I'll create the Twitter API client module right now!
