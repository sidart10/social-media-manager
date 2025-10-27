# Social Posting Agent - Complete Instructions

**Status:** PRODUCTION READY - 3 Platforms Fully Integrated
**Last Updated:** 2025-10-26

---

## 🎯 Overview

This agent handles multi-platform social media posting through API integrations:

**Working Platforms:**
- 🐦 **Twitter/X** - Premium support (custom module)
- 💼 **LinkedIn** - Personal account (custom module)
- 📺 **YouTube** - Video uploads (MCP server)

**Total Commands:** 12
**Total Workflows:** 10
**Live Posts Tested:** 14+

---

## 📁 Module Locations

### Twitter API Client (Custom Module)
```
{project-root}/bmad/modules/twitter-api-client/
```

### LinkedIn API Client (Custom Module)
```
{project-root}/bmad/modules/linkedin-api-client/
```

### YouTube Uploader (MCP Server)
```
youtube-uploader-mcp (MCP tool prefix: mcp__youtube-uploader-mcp__)
```

---

## 🐦 TWITTER API CLIENT

### Import and Initialize

```javascript
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';

const twitter = new TwitterClient();
// Credentials loaded automatically from .env
```

### 1. Post Text Tweet

```javascript
const result = await twitter.createTweet({
  text: 'Your tweet text (up to 25,000 chars for Premium)'
});

if (result.success) {
  console.log(`✅ Posted: ${result.url}`);
  console.log(`   ID: ${result.id}`);
} else {
  console.log(`✗ Failed: ${result.error}`);
}
```

### 2. Post Tweet with Images (1-4)

```javascript
const result = await twitter.createTweet({
  text: 'Check out these images!',
  media: [
    { path: '/absolute/path/to/image1.jpg', altText: 'Description 1' },
    { path: '/absolute/path/to/image2.jpg', altText: 'Description 2' }
  ]
});
```

**Constraints:**
- 1-4 images per tweet
- Formats: JPG, PNG, GIF, WEBP
- Max size: 5MB (15MB for GIFs)
- Absolute paths required

### 3. Post Tweet with Video

```javascript
const result = await twitter.createTweet({
  text: 'Watch this!',
  media: [{ path: '/absolute/path/to/video.mp4' }]
});
```

**Constraints:**
- 1 video per tweet (cannot mix with images)
- Formats: MP4, MOV
- Max size: 512MB
- Chunked upload automatic

### 4. Create Thread

```javascript
const thread = await twitter.createThread([
  { text: '1/3 - First tweet' },
  { text: '2/3 - Second tweet', media: [{ path: '/path/img.jpg' }] },
  { text: '3/3 - Final tweet' }
]);

// Each result: { success, id, url, text } or { success: false, error }
```

### 5. Get Rate Limits

```javascript
const stats = twitter.getRateLimitStats();

console.log(`Monthly: ${stats.counts.monthly}/${stats.limits.MONTHLY}`);
console.log(`Remaining: ${stats.remaining.monthly}`);
```

**Limits:**
- Monthly: 1,500 posts (hard)
- Daily: 50 recommended
- Hourly: 10 recommended

---

## 💼 LINKEDIN API CLIENT

### Import and Initialize

```javascript
import { LinkedInClient} from './bmad/modules/linkedin-api-client/index.js';

const linkedin = new LinkedInClient();
```

### OAuth Flow (First Time Only)

```javascript
// Step 1: Get auth URL
const authUrl = linkedin.getAuthUrl();
console.log('Open this URL:', authUrl);

// Step 2: User authorizes in browser, gets code from callback

// Step 3: Exchange code for token
const auth = await linkedin.authenticate(code);

if (auth.success) {
  console.log(`✅ Authenticated as: ${auth.name}`);
  console.log(`   Person URN: ${auth.personUrn}`);
  console.log(`   Token expires: ${new Date(Date.now() + auth.expiresIn * 1000)}`);
  // Token auto-saved to linkedin-token.json
}
```

**Token Details:**
- Saved to: `linkedin-api-client/linkedin-token.json`
- Valid until: Dec 25, 2025 (60 days)
- Person URN: urn:li:person:H40RDQ7TNL
- Auto-loads on subsequent runs

### 1. Post Text

```javascript
const result = await linkedin.postText(
  'Your LinkedIn update (up to 3,000 chars)'
);

if (result.success) {
  console.log(`✅ Posted: ${result.urn}`);
  console.log(`   ID: ${result.id}`);
}
```

**Best Practices:**
- First 140 chars = Hook (mobile visible)
- Optimal: 150-300 words (800-1,600 chars)
- Use line breaks for readability
- 3-5 hashtags

### 2. Post with Single Image

```javascript
const result = await linkedin.postWithImage(
  'Caption for your image',
  '/absolute/path/to/image.jpg',
  'Alt text for accessibility'
);
```

**Constraints:**
- 1 image
- Formats: JPG, PNG, GIF
- Max: 36M pixels
- Alt text recommended

### 3. Post Multi-Image Carousel (2-20 images)

```javascript
const result = await linkedin.postMultiImage(
  'Check out these photos!',
  ['/path/img1.jpg', '/path/img2.jpg', '/path/img3.jpg'],
  ['Alt text 1', 'Alt text 2', 'Alt text 3']  // Optional
);
```

**Constraints:**
- Minimum: 2 images
- Maximum: 20 images
- Displays as grid/swipeable gallery
- Great for photo stories!

### 4. Post PDF Carousel

```javascript
const result = await linkedin.postDocument(
  'Check out this presentation!',
  '/absolute/path/to/slides.pdf',
  'Presentation Title'
);
```

**Constraints:**
- Formats: PDF, PPT, PPTX, DOC, DOCX
- Max size: 100MB
- Max pages: 300
- Shows as swipeable carousel!

### 5. Post Video

```javascript
const result = await linkedin.postVideo(
  'Watch this video!',
  '/absolute/path/to/video.mp4',
  'Video Title'
);
```

**Constraints:**
- Format: MP4
- Size: 75KB - 500MB
- LinkedIn processes video

### 6. Get Rate Limits

```javascript
const stats = linkedin.getRateLimitStats();

console.log(`Daily: ${stats.counts.daily}/${stats.limits.DAILY}`);
console.log(`Remaining: ${stats.remaining.daily}`);
```

**Limits:**
- Daily: 150 posts (hard)
- Hourly: 25 recommended

---

## 📺 YOUTUBE MCP SERVER

### Channel Information

**Channel:** Sid Dani (@siddani09)
**Channel ID:** UCeNChkI6YhgS4zFrjOICcLw
**Authentication:** OAuth 2.0 (completed, auto-refresh)

### 1. Upload Regular Video

```javascript
const result = await mcp__youtube-uploader-mcp__upload_video({
  file_path: '/absolute/path/to/video.mp4',
  title: 'Video Title (max 100 chars)',
  description: 'Video description with links, timestamps, #hashtags',
  category_id: '28',  // Science & Technology
  tags: 'tag1,tag2,tag3',  // Comma-separated
  privacy: 'unlisted',  // public|unlisted|private
  made_for_kids: false,
  channel_id: 'UCeNChkI6YhgS4zFrjOICcLw'
});

if (result && result.id) {
  console.log(`✅ Uploaded: https://www.youtube.com/watch?v=${result.id}`);
  console.log(`   Studio: https://studio.youtube.com/video/${result.id}/edit`);

  if (result.privacy_status === 'private') {
    console.log('⚠️  Video Private - Change to Public in Studio');
  }
}
```

**Categories:**
- 22: People & Blogs
- 27: Education
- 28: Science & Technology
- 24: Entertainment

### 2. Upload YouTube Short

```javascript
// Use SAME upload_video tool!
const result = await mcp__youtube-uploader-mcp__upload_video({
  file_path: '/path/to/vertical-video.mp4',  // Must be 9:16, ≤3min
  title: 'My Short #shorts',
  description: 'Quick vertical content #shorts',
  category_id: '22',
  tags: 'shorts,vertical,mobile',
  privacy: 'unlisted',
  made_for_kids: false,
  channel_id: 'UCeNChkI6YhgS4zFrjOICcLw'
});

// YouTube auto-detects as Short if:
// - Aspect ratio is 9:16 or 1:1
// - Duration ≤180 seconds (3 minutes)
```

**Shorts Requirements:**
- Aspect ratio: 9:16 (vertical) or 1:1 (square)
- Duration: ≤180 seconds (3 minutes)
- Add #shorts to title/description
- Auto-detected by YouTube (no special params)

### 3. List Channels

```javascript
const channels = await mcp__youtube-uploader-mcp__channels();
// Returns: { "UCeNChkI6YhgS4zFrjOICcLw": {...} }
```

### 4. Refresh Token

```javascript
await mcp__youtube-uploader-mcp__refreshtoken({
  channel_id: 'UCeNChkI6YhgS4zFrjOICcLw'
});
// Usually auto-refreshes, rarely needed manually
```

**YouTube Constraints:**
- Max size: 256GB (but quota limits uploads)
- Quota: 10,000 units/day
- Upload cost: 1,600 units
- **Max ~6 videos/day**
- Unverified apps → Private by default

---

## 📊 Platform Comparison

| Feature | Twitter | LinkedIn | YouTube |
|---------|---------|----------|---------|
| **Text Limit** | 25,000 | 3,000 | Title/Desc |
| **Images** | 1-4 | 1-20 | Thumbnail |
| **Carousels** | No | Yes (2 types!) | No |
| **PDF Support** | No | Yes | No |
| **Videos** | 512MB | 500MB | 256GB |
| **Shorts** | No | No | Auto-detect |
| **Threads** | Yes | No | No |
| **Rate Limit** | 1,500/month | 150/day | 6/day |

---

## 🎯 Workflow Usage Patterns

### For Twitter Workflows

**Available:**
- `post-text-tweet.yaml` - Text only
- `post-tweet-with-image.yaml` - With images
- `post-tweet-with-video.yaml` - With video
- `create-thread.yaml` - Multi-tweet

**Pattern:**
1. Gather inputs (text, media paths)
2. Validate (validator.js handles this)
3. Show preview
4. Confirm
5. Post via TwitterClient
6. Display URL and rate limits

### For LinkedIn Workflows

**Available:**
- `linkedin-post-text.yaml` - Text only
- `linkedin-post-image.yaml` - Single image
- `linkedin-post-multiimage.yaml` - 2-20 image carousel
- `linkedin-post-pdf.yaml` - PDF carousel

**Pattern:**
1. Gather inputs (text, media/document paths)
2. Validate (validator.js handles this)
3. Show preview
4. Confirm
5. Post via LinkedInClient
6. Display URN and rate limits

### For YouTube Workflows

**Available:**
- `youtube-upload-video.yaml` - Regular video
- `youtube-upload-short.yaml` - Shorts (9:16, ≤3min)

**Pattern:**
1. Gather inputs (video path, title, description, category, tags)
2. Validate file exists
3. Show preview
4. Confirm
5. Upload via youtube-uploader-mcp
6. Display video ID and Studio link

---

## 🔐 Authentication Status

### Twitter
- ✅ OAuth 1.0a configured
- ✅ Credentials in .env
- ✅ Working (8+ posts)

### LinkedIn
- ✅ OAuth 2.0 completed
- ✅ Token saved (expires Dec 25, 2025)
- ✅ Person URN: urn:li:person:H40RDQ7TNL
- ✅ Posts to Sid Dani personal account
- ✅ Working (5 posts)

### YouTube
- ✅ OAuth 2.0 completed
- ✅ Channel: @siddani09 (UCeNChkI6YhgS4zFrjOICcLw)
- ✅ Tokens auto-refresh
- ⚠️ Videos upload as Private (unverified app)
- ✅ Working (1 video uploaded)

---

## 🚨 Critical Constraints

### Twitter
- **Text:** 25,000 chars (Premium), 280 (Free)
- **Images:** 1-4 per tweet, max 5MB each
- **Video:** 1 per tweet, max 512MB
- **Cannot mix:** Images and video
- **Rate:** 1,500/month, 50/day, 10/hour recommended

### LinkedIn
- **Text:** 3,000 chars max, 140 char hook
- **Single Image:** 1 image, 36M pixels
- **Multi-Image:** 2-20 images, grid carousel
- **PDF:** 100MB, 300 pages, swipeable carousel
- **Video:** 75KB-500MB, MP4
- **Rate:** 150/day, 25/hour recommended

### YouTube
- **Video:** 256GB max, any format
- **Shorts:** 9:16 aspect ratio, ≤180 seconds
- **Quota:** 10,000 units/day, 1,600 per upload (~6/day)
- **Privacy:** Uploads as Private (manual publish)

---

## 💻 Complete API Examples

### Twitter Examples

**Text with Premium length:**
```javascript
const longText = 'A'.repeat(5000); // 5,000 char post
await twitter.createTweet({ text: longText });
```

**Multiple images:**
```javascript
await twitter.createTweet({
  text: 'Gallery post!',
  media: [
    { path: '/img1.jpg' },
    { path: '/img2.jpg' },
    { path: '/img3.jpg' },
    { path: '/img4.jpg' }
  ]
});
```

**Thread with media:**
```javascript
await twitter.createThread([
  { text: '1/5 - Intro', media: [{ path: '/intro.jpg' }] },
  { text: '2/5 - Point 1' },
  { text: '3/5 - Point 2' },
  { text: '4/5 - Point 3', media: [{ path: '/diagram.jpg' }] },
  { text: '5/5 - Conclusion' }
]);
```

---

### LinkedIn Examples

**Text post with formatting:**
```javascript
await linkedin.postText(
  'Hook in first line\n\n' +
  'Key point 1\n\n' +
  'Key point 2\n\n' +
  'Call to action\n\n' +
  '#hashtag1 #hashtag2 #hashtag3'
);
```

**Image carousel (5 photos):**
```javascript
await linkedin.postMultiImage(
  'Swipe through these 5 moments!',
  ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg'],
  ['Alt 1', 'Alt 2', 'Alt 3', 'Alt 4', 'Alt 5']
);
```

**PDF presentation:**
```javascript
await linkedin.postDocument(
  'Our complete automation guide! Swipe to learn.',
  '/path/to/presentation.pdf',
  'Social Media Automation Guide'
);
```

---

### YouTube Examples

**Regular video:**
```javascript
await mcp__youtube-uploader-mcp__upload_video({
  file_path: '/path/to/video.mp4',
  title: 'Complete Tutorial: Building AI Agents',
  description: 'Learn how to build AI agents step by step. #tutorial #AI',
  category_id: '27',  // Education
  tags: 'AI,tutorial,automation,agents',
  privacy: 'unlisted',
  made_for_kids: false,
  channel_id: 'UCeNChkI6YhgS4zFrjOICcLw'
});
```

**YouTube Short:**
```javascript
await mcp__youtube-uploader-mcp__upload_video({
  file_path: '/path/to/vertical.mp4',  // Must be 9:16, ≤3min
  title: 'Quick Tip: API Automation #shorts',
  description: 'Learn automation in 60 seconds! #shorts',
  category_id: '22',
  tags: 'shorts,vertical,tips,quick',
  privacy: 'unlisted',
  made_for_kids: false,
  channel_id: 'UCeNChkI6YhgS4zFrjOICcLw'
});
// YouTube auto-detects as Short based on aspect ratio and duration
```

---

## 🎯 Content Type Decision Tree

**Text only?**
→ Twitter: /tweet (25k chars)
→ LinkedIn: /linkedin-text (3k chars)

**Text + 1-4 images?**
→ Twitter: /tweet-image
→ LinkedIn: /linkedin-image (1 image) or /linkedin-carousel (2-20)

**Text + many images (5-20)?**
→ LinkedIn: /linkedin-carousel only

**Presentation/slides?**
→ LinkedIn: /linkedin-pdf (PDF carousel)

**Video (horizontal)?**
→ Twitter: /tweet-video (≤512MB)
→ LinkedIn: Use LinkedIn video method
→ YouTube: /youtube-video

**Video (vertical, ≤3min)?**
→ YouTube: /youtube-short (auto-detected)

**Multi-part story?**
→ Twitter: /thread

---

## ⚡ Error Handling Patterns

### All Platforms Return Structured Responses

```javascript
{
  success: true|false,

  // On success:
  id: "platform_specific_id",
  url: "public_url" or urn: "linkedin_urn",

  // On failure:
  error: "descriptive_error_message",
  rateLimitExceeded: true|false
}
```

### Common Errors Across Platforms

**1. Not Authenticated**
```
Error: "Not authenticated. Call authenticate() first."
Solution: Complete OAuth flow for the platform
```

**2. Validation Failed**
```
Error: "Validation failed: Text exceeds limit"
Solution: Check platform limits and adjust content
```

**3. File Not Found**
```
Error: "Cannot access file: /path/to/file.jpg"
Solution: Verify absolute path is correct
```

**4. Rate Limit Exceeded**
```
Error: "Daily limit reached (150 posts/day)"
Solution: Wait for daily reset
```

**5. Upload Failed**
```
Error: "Media upload failed: ..."
Solution: Check file format, size, permissions
```

---

## 📋 Validation Checklist

### Before Every Post

**Twitter:**
- [ ] Text ≤25,000 chars (Premium) or ≤280 (Free)
- [ ] Images: 1-4, formats valid, ≤5MB each
- [ ] OR Video: 1 only, formats valid, ≤512MB
- [ ] Not mixing images and video
- [ ] Files exist and readable

**LinkedIn:**
- [ ] Text ≤3,000 chars
- [ ] Images: 1 for single, 2-20 for carousel
- [ ] OR Document: PDF/PPT/DOC, ≤100MB, ≤300 pages
- [ ] Formats supported
- [ ] Files exist

**YouTube:**
- [ ] Video file exists
- [ ] Title not empty
- [ ] For Shorts: 9:16 aspect ratio, ≤180 sec
- [ ] Category ID valid

---

## 🎨 Platform-Specific Best Practices

### Twitter
- **Engagement:** First 2 lines matter most
- **Hashtags:** 1-2 max (not spammy)
- **Media:** Always improves engagement
- **Threads:** Use for storytelling (3-5 tweets)
- **Timing:** Check when your audience is active

### LinkedIn
- **Hook:** First 140 chars visible on mobile
- **Length:** 150-300 words optimal
- **Hashtags:** 3-5 relevant professional tags
- **Media:** Carousels get 3x engagement
- **PDF:** Perfect for presentations/guides
- **Timing:** Business hours, weekdays

### YouTube
- **Title:** Include keywords for SEO
- **Description:** First 2-3 lines show in search
- **Tags:** 5-10 relevant keywords
- **Shorts:** #shorts in title helps promotion
- **Thumbnail:** Upload custom after (Studio)

---

## 🔒 Security & Credentials

### Twitter
```env
TWITTER_API_KEY=***
TWITTER_API_SECRET=***
TWITTER_ACCESS_TOKEN=***
TWITTER_ACCESS_TOKEN_SECRET=***
```

### LinkedIn
```env
LINKEDIN_CLIENT_ID=***
LINKEDIN_CLIENT_SECRET=***
LINKEDIN_REDIRECT_URI=http://localhost:3000/callback
```

**Token:** Saved in `linkedin-api-client/linkedin-token.json` (auto-loads)

### YouTube
**OAuth File:** `~/.config/youtube-uploader-mcp/client_secret_*.json`
**Tokens:** Auto-managed by MCP server

### NEVER
- ❌ Log credentials
- ❌ Display tokens in responses
- ❌ Commit .env to git
- ❌ Share API keys

---

## 📈 Rate Limit Tracking

### Twitter
**File:** `twitter-api-client/.rate-limit-state.json`
```json
{
  "monthlyCount": 8,
  "dailyCount": 8,
  "hourlyCount": 1,
  "lastReset": { ... }
}
```

### LinkedIn
**File:** `linkedin-api-client/.rate-limit-state.json`
```json
{
  "dailyCount": 5,
  "hourlyCount": 5,
  "lastReset": { ... }
}
```

### YouTube
**Managed by:** Google (quota system)
**Check at:** https://console.cloud.google.com/apis/quotas

---

## 🚀 Workflow Execution Guide

### Twitter Workflows

**Command → Workflow → Module**

```
/tweet → post-text-tweet.yaml → TwitterClient.createTweet()
/tweet-image → post-tweet-with-image.yaml → TwitterClient.createTweet({media})
/tweet-video → post-tweet-with-video.yaml → TwitterClient.createTweet({media})
/thread → create-thread.yaml → TwitterClient.createThread()
```

### LinkedIn Workflows

```
/linkedin-text → linkedin-post-text.yaml → LinkedInClient.postText()
/linkedin-image → linkedin-post-image.yaml → LinkedInClient.postWithImage()
/linkedin-carousel → linkedin-post-multiimage.yaml → LinkedInClient.postMultiImage()
/linkedin-pdf → linkedin-post-pdf.yaml → LinkedInClient.postDocument()
```

### YouTube Workflows

```
/youtube-video → youtube-upload-video.yaml → mcp__youtube-uploader-mcp__upload_video
/youtube-short → youtube-upload-short.yaml → mcp__youtube-uploader-mcp__upload_video
```

---

## 🎯 When to Use Which Platform

### Twitter - Speed & Reach
**Use for:**
- Breaking news / trending topics
- Quick updates / thoughts
- Real-time engagement
- Thread storytelling
- Link sharing with commentary

### LinkedIn - Professional Content
**Use for:**
- Career updates / achievements
- Business insights / analysis
- Professional learning / tips
- Case studies / results
- B2B content
- **Carousels** for multi-page content

### YouTube - Video Content
**Use for:**
- Tutorials / how-tos
- Long-form explanations
- Product demos
- Vlogs / behind-the-scenes
- **Shorts** for quick vertical content

---

## 🐛 Troubleshooting Guide

### Import Errors

```javascript
// ✗ Wrong
import { TwitterClient } from '@bmad/twitter-api-client';

// ✓ Correct
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';
```

### Path Issues

```javascript
// ✗ Wrong - relative paths
media: [{ path: './image.jpg' }]

// ✓ Correct - absolute paths
media: [{ path: '/Users/sid/Desktop/image.jpg' }]
```

### LinkedIn Token Expired

```javascript
// If token expired (after 60 days):
const authUrl = linkedin.getAuthUrl();
// Re-authorize and get new code
await linkedin.authenticate(newCode);
```

### YouTube Video Private

```
All uploads → Private by default
Manual fix: Open Studio, change to Public
Future: Get app verified (4-6 weeks)
```

---

## 📚 Additional Resources

**Module READMEs:**
- `bmad/modules/twitter-api-client/README.md`
- `bmad/modules/linkedin-api-client/` (create README)

**PRPs (Implementation Plans):**
- `PRPs/twitter-api-premium-integration.md`
- `PRPs/linkedin-api-complete-integration.md`

**Platform Research:**
- `LINKEDIN_API_COMPLETE_RESEARCH.md`
- `TWITTER_API_IMPLEMENTATION_PLAN.md`
- `YOUTUBE_SHORTS_GUIDE.md`

**Test Results:**
- `LINKEDIN_QA_REPORT.md` (A+ grade)
- `YOUTUBE_UPLOAD_SUCCESS.md`
- `SESSION_SUMMARY.md`

---

## 🎊 Agent Capabilities Summary

**What the agent can do:**

✅ Post to Twitter (text, images, video, threads)
✅ Post to LinkedIn (text, images, carousels, PDF)
✅ Upload to YouTube (videos, Shorts)
✅ Validate all inputs automatically
✅ Track rate limits across all platforms
✅ Handle errors gracefully
✅ Provide actionable error messages
✅ Show previews before posting
✅ Display results with URLs/URNs

**Tested and working with 14+ live posts across all platforms!**
