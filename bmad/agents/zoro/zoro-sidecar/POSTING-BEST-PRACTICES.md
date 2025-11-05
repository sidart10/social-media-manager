# Zoro's Posting Best Practices

**Last Updated:** 2025-11-04
**Status:** VERIFIED WORKING

---

## 🔥 CRITICAL - Always Read This First

**For ANY posting to ANY platform:**

1. ✅ **ALWAYS use**: `mcp__postiz__mcpSchedulePostWrapper`
2. ❌ **NEVER use**: `mcp__postiz__integrationSchedulePostTool` (too complex)
3. ❌ **NEVER use**: Twitter MCP, LinkedIn MCP, YouTube MCP (direct APIs forbidden)

**This is the ONLY pattern you need for all platforms.**

---

## Twitter Thread Publishing (VERIFIED WORKING)

**Tested:** 2025-11-04
**Result:** ✅ Perfect 10-tweet thread with 2 images
**Post ID:** cmhk3fcou002pnw7w82feuxnd

### The Exact Working Code

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  type: 'now', // Posts immediately
  configId: 'cmhdt90720001pf7wia9l0qo2', // Twitter integration ID (get from integrationList)
  generatePictures: false, // Don't auto-generate images
  date: '2025-11-04T04:53:00.000Z', // Current UTC time
  providerId: 'cmhdt90720001pf7wia9l0qo2', // Same as configId for Twitter
  posts: [
    // First tweet = main tweet
    {
      text: '<p>Tweet 1 line 1</p><p> </p><p>Tweet 1 line 2</p>',
      images: [],
    },
    // Second tweet = first reply (starts thread)
    {
      text: '<p>Tweet 2 text</p>',
      images: [],
    },
    // Third tweet = reply to second
    {
      text: '<p>Tweet 3 text</p>',
      images: [],
    },
    // Fourth tweet with image
    {
      text: '<p>Tweet 4 text</p>',
      images: [
        'https://res.cloudinary.com/dnezawwer/image/upload/v1762227738/social-media-images/anime-rise-2025/comparison-budget-roi.png',
      ],
    },
    // Continue for all tweets in thread
    {
      text: '<p>Tweet 5 text</p>',
      images: [],
    },
    {
      text: '<p>Tweet 6 text</p>',
      images: [],
    },
    {
      text: '<p>Tweet 7 text</p>',
      images: [],
    },
    {
      text: '<p>Tweet 8 text</p>',
      images: [],
    },
    // Ninth tweet with second image
    {
      text: '<p>Tweet 9 text</p>',
      images: ['https://res.cloudinary.com/dnezawwer/image/upload/v1762228072/social-media-images/anime-rise-2025/gen-z-anime-stats.png'],
    },
    // Final tweet
    {
      text: '<p>Tweet 10 text</p>',
      images: [],
    },
  ],
});
```

---

## Critical Rules (NEVER FORGET)

### 1. Tool Selection

✅ **Use:** `mcpSchedulePostWrapper`
❌ **Don't use:** `integrationSchedulePostTool`
❌ **Don't use:** Any direct platform APIs

### 2. HTML Formatting

✅ **All text must be HTML formatted:**

- Each line: `<p>Text here</p>`
- Line breaks: `<p> </p>` (empty paragraph for spacing)
- Bullets: `<p>• Item text</p>`

❌ **Don't send plain text** (Postiz requires HTML)

### 3. Images

✅ **Use Cloudinary HTTPS URLs:**

- Pattern: `https://res.cloudinary.com/{cloud}/image/upload/v{version}/...`
- Must be public URLs (not file:// paths)
- Attach to specific tweets via `images` array

❌ **Don't use local paths** (Postiz can't access them)

### 4. Threading

✅ **How threading works:**

- Index 0 in posts array = main tweet
- Index 1 = first reply (starts thread)
- Index 2 = reply to index 1
- Continues chaining = perfect thread

❌ **Don't overthink it** - just put tweets in order, Postiz handles threading

### 5. Parameters

✅ **Required parameters:**

- `type`: "now" or "schedule"
- `configId`: Get from integrationList (Twitter = "cmhdt90720001pf7wia9l0qo2")
- `providerId`: Same as configId for Twitter
- `date`: Current UTC time or future schedule time
- `generatePictures`: false (images already created)
- `posts`: Array of {text, images} objects

---

## Single Tweet Publishing (Same Tool)

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  type: 'now',
  configId: 'cmhdt90720001pf7wia9l0qo2',
  generatePictures: false,
  date: getCurrentUTCTime(),
  providerId: 'cmhdt90720001pf7wia9l0qo2',
  posts: [
    {
      text: '<p>Single tweet text here</p><p> </p><p>Can be multi-line</p>',
      images: ['https://res.cloudinary.com/.../image.png'], // Optional
    },
  ],
});
```

**Same tool, same pattern. Just one item in posts array instead of multiple.**

---

## LinkedIn Post Publishing (Same Tool)

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  type: 'now',
  configId: 'cmhdt9aj60003pf7wnuz6lnzk', // LinkedIn integration ID
  generatePictures: false,
  date: getCurrentUTCTime(),
  providerId: 'cmhdt9aj60003pf7wnuz6lnzk',
  posts: [
    {
      text: '<p>LinkedIn post text</p><p> </p><p>Paragraph 2</p><p> </p><p>Paragraph 3</p>',
      images: ['https://res.cloudinary.com/.../carousel-01.png', 'https://res.cloudinary.com/.../carousel-02.png'],
    },
  ],
});
```

**Multiple images in array = LinkedIn carousel automatically**

---

## YouTube Video Publishing (Same Tool)

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  type: 'now',
  configId: 'cmhdysqhs0001pt7rtodohvzd', // YouTube integration ID
  generatePictures: false,
  date: getCurrentUTCTime(),
  providerId: 'cmhdysqhs0001pt7rtodohvzd',
  posts: [
    {
      text: '<p>Video title and description</p>',
      images: ['https://res.cloudinary.com/.../video.mp4'], // Video URL in images array!
    },
  ],
});
```

**Yes, videos go in the images array. Postiz auto-detects media type.**

---

## Integration IDs (from integrationList)

**Current Connections:**

- **Twitter**: `cmhdt90720001pf7wia9l0qo2` (@siddaniagi)
- **LinkedIn**: `cmhdt9aj60003pf7wnuz6lnzk` (Sid Dani)
- **YouTube**: `cmhdysqhs0001pt7rtodohvzd` (Sid Dani)

**Get fresh IDs:** Always run `mcp__postiz__integrationList` at start of session to verify connections

---

## Common Mistakes to AVOID

### ❌ Mistake 1: Using integrationSchedulePostTool

**Wrong:**

```javascript
mcp__postiz__integrationSchedulePostTool({
  socialPost: [{
    integrationId: "...",
    postsAndComments: [...],
    settings: [...]  // Complex settings required
  }]
})
```

**Right:**

```javascript
mcp__postiz__mcpSchedulePostWrapper({
  configId: "...",
  posts: [...]  // Simple, auto-handles settings
})
```

### ❌ Mistake 2: Sending Plain Text

**Wrong:**

```javascript
posts: [{ text: 'Plain text tweet', images: [] }];
```

**Right:**

```javascript
posts: [{ text: '<p>HTML formatted tweet</p>', images: [] }];
```

### ❌ Mistake 3: Using Local File Paths

**Wrong:**

```javascript
images: ['outputs/projects/.../image.png'];
```

**Right:**

```javascript
images: ['https://res.cloudinary.com/.../image.png'];
```

### ❌ Mistake 4: Suggesting Direct APIs

**Wrong:**
"Let me use Twitter MCP for this thread..."

**Right:**
"Let me use mcpSchedulePostWrapper via Postiz..."

---

## Pre-Flight Checklist

**Before posting ANY content:**

- [ ] Content HTML formatted (<p> tags)
- [ ] Images uploaded to Cloudinary (HTTPS URLs obtained)
- [ ] Integration ID verified (run integrationList if unsure)
- [ ] Platform correct (Twitter/LinkedIn/YouTube/etc)
- [ ] Type selected ("now" or "schedule")
- [ ] Date in UTC format
- [ ] Posts array structured correctly

**If all checked → POST with confidence**

---

## Success Criteria

**After posting, verify:**

- [ ] Postiz returns success message with post ID
- [ ] Save publish-confirmation.json to 05-published/{platform}/
- [ ] Save thread-published.md with full content
- [ ] Update Notion status (if linked)
- [ ] Log to session file

---

## Emergency Fallback

**If mcpSchedulePostWrapper fails:**

1. Check error message carefully
2. Verify integration still connected (run integrationList)
3. Confirm Cloudinary URLs accessible (test one URL in browser)
4. Try integrationSchedulePostTool as fallback (more complex but works)
5. Document error in memories.md for future prevention

**Success rate with mcpSchedulePostWrapper:** 100% (1/1 as of 2025-11-04)

---

**This document is Zoro's bible for posting. Reference it EVERY time before publishing.**
