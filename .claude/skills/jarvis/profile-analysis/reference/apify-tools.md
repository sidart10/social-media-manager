# apify - Complete Tool Reference (VERIFIED)

**MCP Server:** apify (HTTP endpoint)
**URL:** https://mcp.apify.com
**Purpose:** Access 5000+ web scrapers for social media platforms
**Last Verified:** November 1, 2025
**Source:** `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`

---

## Available Apify MCP Tools

### Tool 1: search-actors

**Purpose:** Find appropriate Apify actor (scraper) for a platform

**Parameters:**

```json
{
  "search": "instagram profile scraper" | "tiktok scraper" | "youtube transcript",
  "limit": 5
}
```

**Returns:** List of available actors with ratings, pricing, descriptions

---

### Tool 2: fetch-actor-details

**Purpose:** Get detailed information about a specific actor

**Parameters:**

```json
{
  "actor": "apify/instagram-scraper"
}
```

**Returns:** Full actor documentation, input schema, pricing details

---

### Tool 3: call-actor

**Purpose:** Execute an Apify actor to scrape data

**Two-step process:**
1. Call with `step="info"` to get input schema
2. Call with `step="call"` and `input` object to execute

**Example:**

```json
{
  "actor": "apify/instagram-scraper",
  "step": "call",
  "input": {
    "directUrls": ["https://instagram.com/username/"],
    "resultsType": "posts",
    "resultsLimit": 20
  }
}
```

**Processing Time:** 20-60 seconds typically

---

### Tool 4: get-actor-output

**Purpose:** Retrieve scraped data from completed actor run

**Parameters:**

```json
{
  "datasetId": "abc123...",
  "fields": "text,likesCount,commentsCount",  // optional
  "limit": 100  // optional
}
```

---

## Platform-to-Actor Mapping (VERIFIED ✅)

### YouTube Video Transcripts

**Actor:** `dz_omar/youtube-transcript-metadata-extractor` ✅ TESTED

**Capabilities:**
- ✅ Full video transcript (auto-generated captions)
- ✅ Timestamped segments
- ✅ Video metadata (title, views, likes, description)
- ✅ Channel info

**Input:**
```json
{
  "youtubeUrl": [{"url": "https://youtube.com/watch?v=VIDEO_ID"}],
  "cleaningLevel": "mild",
  "includeTimestamps": true
}
```

**Cost:** FREE (platform fee only ~$0.009)
**Rating:** 4.92/5
**Use for:** Learning speaking style, content repurposing, video analysis

**Tested:** Andrej Karpathy 3.5hr video (3.8M views) - $0.009

---

### Instagram - Captions & Engagement Data

**Actor:** `apify/instagram-scraper` ✅ TESTED

**Capabilities:**
- ✅ Written captions
- ✅ Engagement metrics (likes, views, plays, comments)
- ✅ Hashtags, mentions
- ✅ Bulk scraping (20+ posts)
- ❌ NO spoken transcript (use instagram-ai-transcript-extractor below)

**Input:**
```json
{
  "directUrls": ["https://instagram.com/username/"],
  "resultsType": "posts",
  "resultsLimit": 20,
  "addParentData": true
}
```

**Cost:** $2.70 per 1000 posts (~$0.05 for 20 posts)
**Rating:** 4.53/5
**Use for:** Bulk post analysis, written content patterns, engagement research

**Tested:** @casarthakahuja (21 posts) - $0.057

---

### Instagram - AI Spoken Transcript (PREMIUM)

**Actor:** `sian.agency/instagram-ai-transcript-extractor` ✅ TESTED

**Capabilities:**
- ✅ **Actual spoken words** (AI transcription)
- ✅ Word-level timestamps
- ✅ Sentence segments
- ✅ Full metadata (likes, views, comments)
- ✅ Caption text included

**Input:**
```json
{
  "instagramUrl": "https://instagram.com/reel/REEL_ID/",
  "wordLevelTimestamps": true,
  "fastProcessing": false
}
```

**Cost:** $0.025 per reel
**Rating:** 5.00/5
**Use for:** Learning speaking style (actual words said, not written caption)

**Tested:** Sarthak NRI reel (123s, 4.98M plays) - $0.025

---

### TikTok - Captions & Engagement Data

**Actor:** `clockworks/tiktok-scraper` ✅ TESTED (Built-in tool available!)

**Capabilities:**
- ✅ Video captions
- ✅ Engagement metrics (likes, plays, comments, shares)
- ✅ Profile data (122M followers for @mrbeast)
- ✅ Music info
- ✅ Can download subtitles (if creator added)
- ❌ NO AI transcript (use tictechid/anoxvanzi-Transcriber below)

**Input:**
```json
{
  "profiles": ["username"],
  "resultsPerPage": 10,
  "shouldDownloadSubtitles": true
}
```

**Cost:** $0.006 startup + $0.0037 per video
**Rating:** High adoption (87K users)
**Use for:** Bulk TikTok data, caption analysis, engagement patterns

**Tested:** @mrbeast (3 videos, 16M+ plays) - $0.017

---

### TikTok/Instagram/Facebook - AI Spoken Transcript (PREMIUM)

**Actor:** `tictechid/anoxvanzi-Transcriber` ✅ TESTED

**Capabilities:**
- ✅ **Actual spoken words** (AI transcription)
- ✅ Timestamped segments
- ✅ Works for TikTok, Instagram, Facebook Reels
- ✅ Language detection

**Input:**
```json
{
  "start_urls": "https://tiktok.com/@user/video/VIDEO_ID"
}
```

**Cost:** $0.01 startup + $0.0025 per second (~$0.15 for 60s video)
**Rating:** 5.00/5
**Use for:** Learning speaking style from TikTok/Facebook (when caption is minimal)

**Tested:** MrBeast pizza video (40s) - $0.11

---

### LinkedIn - Posts & Carousel Images

**Actor:** `datadoping/linkedin-profile-posts-scraper` ✅ TESTED

**Capabilities:**
- ✅ Full post text
- ✅ Engagement breakdown (likes, comments, reposts by type)
- ✅ **Carousel images** (all slides as array)
- ✅ Video URLs (but NOT transcripts)
- ✅ Author details
- ❌ NO text extraction from carousel slides (just image files)

**Input:**
```json
{
  "profiles": ["username"],
  "max_posts": 10  // minimum 10
}
```

**Cost:** $1.20 per 1000 posts (~$0.012 for 10 posts)
**Rating:** 5.00/5
**Free tier:** 4 profiles, 100 posts max per run
**Use for:** Learning writing style, carousel design reference, engagement research

**Tested:** Satya Nadella, Justin Welsh (10 posts each) - $0.012 each

---

## Decision Matrix: Which Actor to Use?

### For Learning Speaking Style (Voice Analysis):

| Platform | Need | Use Actor | Cost |
|----------|------|-----------|------|
| YouTube | Spoken transcript | `dz_omar/youtube-transcript-metadata-extractor` | FREE |
| Instagram Reels | Spoken transcript | `sian.agency/instagram-ai-transcript-extractor` | $0.025/reel |
| TikTok | Spoken transcript | `tictechid/anoxvanzi-Transcriber` | ~$0.15/video |
| LinkedIn | Written posts | `datadoping/linkedin-profile-posts-scraper` | $0.001/post |

### For Bulk Content Analysis (Engagement Patterns):

| Platform | Need | Use Actor | Cost |
|----------|------|-----------|------|
| Instagram | Captions + metrics | `apify/instagram-scraper` | $0.003/post |
| TikTok | Captions + metrics | `clockworks/tiktok-scraper` | $0.01/video |
| LinkedIn | Post text + carousel images | `datadoping/linkedin-profile-posts-scraper` | $0.001/post |

---

## Complete Flow Example (Instagram Reel with AI Transcript)

**User Request:** "Analyze @casarthakahuja's speaking style from Instagram"

**Step 1:** Determine actor based on need

```
Need: Speaking style (voice analysis)
→ Requires AI transcript
→ Actor: sian.agency/instagram-ai-transcript-extractor
```

**Step 2:** Get specific reel URL

```
User provides: "https://instagram.com/reel/ABC123/"
OR
Use apify/instagram-scraper first to get recent reels, then pick top performer
```

**Step 3:** Calculate cost

```
Videos: 1 reel
Cost per reel: $0.025
Estimated total: $0.025
```

**Step 4:** Get user approval

```
Display: "Instagram AI transcript: $0.025 for 1 reel. Current budget: $0.24/$10. Proceed? [yes/no]"
User: "yes"
```

**Step 5:** Execute actor

```
mcp__apify__call-actor:
  actor: "sian.agency/instagram-ai-transcript-extractor"
  step: "call"
  input: {
    "instagramUrl": "https://instagram.com/reel/ABC123/",
    "wordLevelTimestamps": true,
    "fastProcessing": false
  }
```

**Step 6:** Retrieve results

```
Returns:
- transcript: "Full spoken content..."
- words: Word-level timestamps
- segments: Sentence segments
- likesCount, videoViewCount, caption, etc.
```

**Step 7:** Analyze speaking patterns

```
- Hook: First 5 seconds - "A number of NRIs are losing access..."
- Pacing: ~150 words per minute
- Pauses: Strategic silence at 14-15s, 22-24s
- CTA timing: 26-28s ("Follow if...")
- Delivery: Direct, emotional, structured
```

**Step 8:** Log cost

```
Update memories.md:
- [2025-11-01] sian.agency/instagram-ai-transcript-extractor: $0.025 (1 reel, casarthakahuja NRI)
- Monthly total: $0.242
```

---

## Error Handling

**Actor not found:**
- Verify actor name matches verified list exactly
- Check: `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`
- Try search-actors if actor name changed

**Execution fails:**
- Check Apify credits/authentication
- Verify URL format (must be full URL with https://)
- Check content is public (not private account)
- Verify video has spoken audio (not music-only)

**No transcript available:**
- Video may be music-only without speech
- Instagram: Fall back to apify/instagram-scraper for caption
- TikTok: Fall back to clockworks/tiktok-scraper for caption
- Inform user: "No spoken words detected, using written caption instead"

**Cost exceeded budget:**
- Show: "Current: $X.XX / $10.00 budget"
- Ask: "This will add $Y.YY. Proceed? [yes/no]"
- If declined: Offer free alternatives or manual analysis

**Rate limiting (rare):**
- Wait 30-60 seconds
- Retry automatically
- If persists: Try alternative actor or schedule for later

---

## Quick Reference: Verified Actors

**YouTube:** `dz_omar/youtube-transcript-metadata-extractor` (FREE)
**Instagram bulk:** `apify/instagram-scraper` ($0.003/post)
**Instagram transcripts:** `sian.agency/instagram-ai-transcript-extractor` ($0.025/reel)
**TikTok bulk:** `clockworks/tiktok-scraper` ($0.01/video)
**TikTok transcripts:** `tictechid/anoxvanzi-Transcriber` ($0.15/video)
**LinkedIn:** `datadoping/linkedin-profile-posts-scraper` ($0.001/post)

---

**For usage examples, see:** `usage-examples.md`
**For cost calculations, see:** `cost-examples.md`
**For complete verified actors documentation, see:** `{project-root}/outputs/11-01-2025/apify-research-session/verified-apify-actors.md`
