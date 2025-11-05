# Zoro's Memory Bank

**Agent:** Zoro - Publishing & Distribution Specialist
**User:** sid
**Initialized:** 2025-11-03

---

## User Preferences

**Publishing Style:**

- Platforms: Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube
- Posting Times: Optimal engagement windows per platform
- Approval Required: Yes (always preview before posting)

**Platform Priorities:**

- Primary: LinkedIn, Twitter (professional audience)
- Secondary: YouTube (video content)
- Tertiary: Instagram, TikTok, Facebook (social expansion)

**Working Style:**

- Values confirmation and validation (preview before publish)
- Wants platform URLs extracted automatically
- Appreciates Notion status tracking
- Cost-conscious (minimize API calls)

---

## Publishing History

### November 2025

**2025-11-03**: Agent initialized with Postiz-only mandate

- Primary workflow: schedule-post (universal multi-platform)
- Integration: Cloudinary (media hosting), Postiz (publishing), Notion (tracking)
- Policy: Postiz ONLY - no direct APIs for any platform
- Capabilities: 6 platforms via single workflow

**2025-11-04**: ✅ FIRST SUCCESSFUL THREAD PUBLISHED

- **Platform**: Twitter (@siddaniagi)
- **Format**: 10-tweet thread with 2 images
- **Tool**: mcp**postiz**mcpSchedulePostWrapper (BEST PRACTICE - USE THIS!)
- **Topic**: Anime box office dominance 2025
- **Images**: 2 Cloudinary URLs attached to tweets 4 and 9
- **Post ID**: cmhk3fcou002pnw7w82feuxnd
- **Success**: ✅ Published immediately, thread properly threaded
- **Key Learning**: mcpSchedulePostWrapper handles threads PERFECTLY via posts array

---

## Platform Statistics

**Publishing Counts by Platform:**

| Platform  | Posts Published | Last Posted | Success Rate |
| --------- | --------------- | ----------- | ------------ |
| Twitter   | 0               | -           | -            |
| LinkedIn  | 0               | -           | -            |
| YouTube   | 0               | -           | -            |
| Instagram | 0               | -           | -            |
| TikTok    | 0               | -           | -            |
| Facebook  | 0               | -           | -            |

**Multi-Platform Posts:**

- Same content to 2+ platforms: 0
- Reusable media across platforms: 0

(Will track reusability efficiency)

---

## Postiz Performance Tracking

**Connection Status:**

| Platform  | Connected | Last Verified | Notes |
| --------- | --------- | ------------- | ----- |
| Twitter   | (TBD)     | -             | -     |
| LinkedIn  | (TBD)     | -             | -     |
| Instagram | (TBD)     | -             | -     |
| Facebook  | (TBD)     | -             | -     |
| TikTok    | (TBD)     | -             | -     |
| YouTube   | (TBD)     | -             | -     |

**Publishing Success Rate:**

- Total attempts: 0
- Successful: 0
- Failed: 0
- Success rate: (will calculate)

**Common Issues:**
(Will document errors and resolutions as encountered)

---

## Cloudinary Upload Tracking

**Upload Statistics:**

| Media Type | Total Uploads | Successful | Failed | Notes |
| ---------- | ------------- | ---------- | ------ | ----- |
| Images     | 0             | 0          | 0      | -     |
| Videos     | 0             | 0          | 0      | -     |

**Upload Performance:**

- Average upload time: (TBD)
- Failure patterns: (will document)

**Storage Usage:**

- Current usage: (check Cloudinary dashboard)
- Free tier limit: 10GB
- Remaining: (calculate)

---

## Notion Integration

**Update Success Rate:**

- Total Notion updates: 0
- Successful: 0
- Failed: 0

**Status Transitions Tracked:**

- Editing → Posted: 0
- Draft → Posted: 0

**URL Extraction:**

- Platform URLs successfully extracted: 0
- Manual fallbacks needed: 0

---

## Cost Tracking

**Postiz API Usage:**

- API calls this month: 0
- Rate limit: 30 requests/hour
- Current usage: 0%

**Cloudinary Bandwidth:**

- Free tier: 25GB monthly
- Used: (TBD)
- Remaining: (TBD)

**Platform API Costs:**

- Postiz: (plan details)
- Cloudinary: Free tier
- Notion: Free

---

## Publishing Patterns

**Successful Post Types:**
(Will document what works best per platform)

**Example format:**

```
LinkedIn: Long-form thought leadership (≥150 words) performs best
Twitter: Short punchy insights with data (<200 chars) get engagement
YouTube: Videos with thumbnails, detailed descriptions, 5+ tags
```

---

## Optimal Posting Times

**Learned from analytics (will populate):**

| Platform | Best Day | Best Time (EST) | Engagement Boost |
| -------- | -------- | --------------- | ---------------- |
| Twitter  | (TBD)    | (TBD)           | -                |
| LinkedIn | (TBD)    | (TBD)           | -                |
| YouTube  | (TBD)    | (TBD)           | -                |

---

## Content Performance

**Top Performing Posts:**
(Will track best performers by platform)

**Format:**

```
2025-11-XX: LinkedIn post "AI Agents Reality" - 1,200 views, 45 likes, 12 comments
           - Topic: AI implementation costs
           - Media: 1 image (dark monochrome)
           - Posted: 9am EST Tuesday
           - Key insight: Cost transparency resonates
```

---

## Handoff Quality Assessment

**Received from Jarvis:**

- Total handoffs: 0
- Complete packages: 0
- Missing data: 0
- Common gaps: (will document)

**Received from Zoe:**

- Total handoffs: 0
- Complete packages: 0
- Missing Cloudinary URLs: 0
- Common issues: (will document)

**Handoff Package Quality:**
(Will rate completeness and usefulness of handoff data)

---

## Error Patterns

**Postiz Errors:**
(Will document error messages and resolutions)

**Cloudinary Errors:**
(Will document upload failures and fixes)

**Notion Errors:**
(Will document update failures and workarounds)

**Platform-Specific Issues:**
(Will document per-platform quirks and solutions)

---

## Learning Insights

**Process Improvements:**

**2025-11-04: 🔥 CRITICAL - Twitter Thread Publishing Pattern (VERIFIED WORKING)**

**ALWAYS use mcp**postiz**mcpSchedulePostWrapper for threads. Here's the exact pattern:**

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  type: 'now', // or "schedule" for future
  configId: 'cmhdt90720001pf7wia9l0qo2', // Twitter integration ID
  generatePictures: false, // Images already created
  date: '2025-11-04T03:50:00.000Z', // UTC time
  providerId: 'cmhdt90720001pf7wia9l0qo2', // Same as configId for Twitter
  posts: [
    {
      text: '<p>Tweet 1 text</p><p> </p><p>More text</p>', // HTML formatted
      images: [], // No image on tweet 1
    },
    {
      text: '<p>Tweet 2 text</p>',
      images: [], // Reply to tweet 1
    },
    {
      text: '<p>Tweet 3 text</p>',
      images: [],
    },
    {
      text: '<p>Tweet 4 with image</p>',
      images: ['https://res.cloudinary.com/.../image.png'], // Cloudinary URL
    },
    // Continue for all tweets (tested with 10 tweets)
  ],
});
```

**Critical Rules:**

1. ✅ Use mcpSchedulePostWrapper (NOT integrationSchedulePostTool - simpler interface)
2. ✅ Format ALL text with HTML <p> tags (line breaks = <p> </p>)
3. ✅ Images as Cloudinary HTTPS URLs in images array
4. ✅ First post = main tweet, subsequent = replies (auto-threads!)
5. ✅ configId and providerId = same value for Twitter
6. ✅ type: "now" posts immediately, type: "schedule" for future
7. ✅ Each tweet in posts array, order matters (0=main, 1+=replies)

**What This Replaces:**

- ❌ NEVER use Twitter MCP (mcp**mcp_twitter**)
- ❌ NEVER use integrationSchedulePostTool (too complex)
- ❌ NEVER suggest "Postiz can't do threads" (it absolutely can!)

**Verified Working:**

- Platform: Twitter
- Date: 2025-11-04
- Thread: 10 tweets
- Images: 2 (attached to tweets 4 and 9)
- Result: Perfect thread, properly threaded, images displayed correctly
- Post ID: cmhk3fcou002pnw7w82feuxnd

---

## Platform URL Extraction

**URL Patterns by Platform:**

| Platform  | URL Pattern                    | Extraction Method |
| --------- | ------------------------------ | ----------------- |
| Twitter   | twitter.com/user/status/{id}   | Postiz response   |
| LinkedIn  | linkedin.com/posts/{slug}      | Postiz response   |
| YouTube   | youtube.com/watch?v={id}       | Postiz response   |
| Instagram | instagram.com/p/{code}         | Postiz response   |
| TikTok    | tiktok.com/@user/video/{id}    | Postiz response   |
| Facebook  | facebook.com/{user}/posts/{id} | Postiz response   |

**Extraction Success:**

- Total: 0
- Successful: 0
- Manual fallback: 0

---

## Analytics Tracking

**Engagement Metrics:**

| Post      | Platform | Views | Likes | Comments | Shares | CTR   |
| --------- | -------- | ----- | ----- | -------- | ------ | ----- |
| (Example) | LinkedIn | 1200  | 45    | 12       | 8      | 3.75% |

**Platform Performance:**
(Will compare engagement rates across platforms)

---

## Integration Health

**Cloudinary Connection:**

- Status: (verify on activation)
- Last successful upload: (TBD)
- API key valid: (TBD)

**Postiz Connection:**

- Status: (verify on activation)
- Platforms connected: (list on activation)
- Rate limit remaining: (check on activation)

**Notion Connection:**

- Status: (verify on activation)
- Content Tracker accessible: (TBD)
- Last successful update: (TBD)

---

This memory bank grows with every post published. It informs:

- Posting time optimization
- Platform-specific strategies
- Error prevention
- Performance tracking
- Team coordination improvements

**Update frequency:** After every publishing session
**Review frequency:** Weekly (identify patterns, optimize workflows)
