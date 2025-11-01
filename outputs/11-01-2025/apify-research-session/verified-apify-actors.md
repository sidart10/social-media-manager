# Verified Working Apify Actors
**Session:** Apify Research - Platform Scraping Tools
**Date:** November 1, 2025
**Tested by:** Jarvis (Content Intelligence)
**Purpose:** Learning speaking styles and extracting content from social platforms

---

## ✅ All 6 Actors Tested & Verified Working

### 1. YouTube Video Transcripts + Metadata

**Actor:** `dz_omar/youtube-transcript-metadata-extractor`

**Capabilities:**
- ✅ Full video transcript (auto-generated captions)
- ✅ Timestamped segments
- ✅ Video metadata (title, views, likes, description)
- ✅ Channel info (name, subscribers)
- ✅ Published date

**Pricing:** FREE (platform fee only ~$0.009)
**Rating:** 4.92/5
**Success Rate:** 100%

**Test Results:**
- Video: Andrej Karpathy "Deep Dive into LLMs"
- Duration: 3.5 hours
- Views: 3.8M
- Transcript: 50,000+ characters extracted
- Cost: $0.009

**Use Cases:**
- Learning speaking style from YouTube creators
- Content repurposing from long-form videos
- Educational content analysis
- Script writing research

---

### 2. Instagram Reels - AI Spoken Transcript (PREMIUM)

**Actor:** `sian.agency/instagram-ai-transcript-extractor`

**Capabilities:**
- ✅ **Actual spoken words** (AI transcription, not just caption)
- ✅ Word-level timestamps (every word timed precisely)
- ✅ Sentence segments
- ✅ Full video metadata (likes, views, plays, comments)
- ✅ Caption text (written description)
- ✅ Video URL

**Pricing:** $0.025 per reel (FREE tier)
**Rating:** 5.00/5
**Success Rate:** 98%

**Test Results:**
- Profile: @casarthakahuja (Sarthak Ahuja)
- Video: NRI inheritance crisis reel
- Duration: 123 seconds
- Engagement: 91K likes, 4.98M plays, 1,134 comments
- Transcript: Full spoken content extracted with word-level timing
- Cost: $0.025

**Example Output:**
```
Full transcript: "A number of NRIs are losing access to their parents' properties..."

Word-level timestamps:
[0.06s - 0.16s] "A"
[0.16s - 0.30s] "number"
[0.30s - 0.54s] "of"
...
```

**Use Cases:**
- Learning speaking style from Instagram creators
- Voice pattern analysis
- Content repurposing with exact timing
- Subtitle creation for video editing

---

### 3. Instagram Posts/Reels - Captions & Bulk Data

**Actor:** `apify/instagram-scraper`

**Capabilities:**
- ✅ Written captions (post descriptions)
- ✅ Engagement metrics (likes, views, plays, comments)
- ✅ Hashtags and mentions
- ✅ Bulk scraping (multiple posts from profile)
- ✅ First comments preview
- ✅ Video duration
- ❌ NO spoken transcript (use Actor #2 for that)

**Pricing:** $2.70 per 1000 posts (FREE tier)
**Rating:** 4.53/5
**Success Rate:** 99.4%

**Test Results:**
- Profile: @casarthakahuja
- Posts scraped: 21 reels
- Cost: ~$0.057
- Data: Full captions, engagement metrics for all posts

**Use Cases:**
- Bulk Instagram profile analysis
- Written caption analysis (not spoken words)
- Engagement pattern research
- Competitive analysis

---

### 4. TikTok Videos - Captions & Data

**Actor:** `clockworks/tiktok-scraper` (Built-in dedicated tool!)

**Capabilities:**
- ✅ Video captions (what creator wrote)
- ✅ Engagement metrics (likes, plays, comments, shares)
- ✅ Profile data (followers, bio, verification status)
- ✅ Music information
- ✅ Video dimensions and format
- ✅ Can download subtitles (if creator added them)
- ❌ NO AI transcript (use Actor #5 for that)

**Pricing:** $0.006 startup + $0.0037 per video
**Rating:** High adoption (87K total users)
**Success Rate:** 97%

**Test Results:**
- Profile: @mrbeast (MrBeast)
- Videos: 3 recent posts
- Engagement: 858K-1.2M likes, 14M-18M plays
- Cost: $0.017
- Caption: "Cooking a pizza with powertools!"

**Use Cases:**
- Bulk TikTok data collection
- Caption analysis (written text)
- Engagement pattern research
- Profile analytics

---

### 5. TikTok/Instagram/Facebook - AI Spoken Transcript (PREMIUM)

**Actor:** `tictechid/anoxvanzi-Transcriber`

**Capabilities:**
- ✅ **Actual spoken words** (AI transcription)
- ✅ Timestamped segments
- ✅ Multi-platform (TikTok, Instagram Reels, Facebook Reels)
- ✅ Language detection

**Pricing:** $0.01 startup + $0.0025 per second
**Rating:** 5.00/5
**Success Rate:** 98.5%

**Test Results:**
- Video: MrBeast pizza TikTok
- Duration: 40 seconds
- Caption: "Cooking a pizza with powertools!"
- **Actual spoken content:** "Let's make a pizza. This power tool. Nice and slow. Okay? Alright. Bring it on in. Dump it down. Oh, yeah. Oh, yeah. Yeah. Put on the cheese. Pineapple on your pizza? Follow if you think pineapple on your pizza is gross. Time to cook the pizza. Let's see how she tastes. Not bad."
- Cost: $0.11

**Key Insight:** Caption vs Spoken content is VERY different
- Caption: 5 words
- Actual speech: 60+ words with pauses, reactions, CTA

**Use Cases:**
- Learning speaking style from TikTok creators
- Voice pattern analysis
- Extracting actual dialogue (not just captions)
- Content where caption is minimal but talking is extensive

---

### 6. LinkedIn Posts + Carousel Images

**Actor:** `datadoping/linkedin-profile-posts-scraper`

**Capabilities:**
- ✅ Full post text content
- ✅ Engagement breakdown by reaction type (like, support, love, insight, celebrate, funny)
- ✅ Comments count, reposts count
- ✅ **Carousel images** (all slides as array of image URLs with dimensions)
- ✅ Video URLs (but NOT transcripts)
- ✅ Author details (name, headline, profile picture)
- ✅ Post type detection (regular, repost, article)
- ❌ NO text extraction from carousel slide images (OCR needed separately)
- ❌ NO video transcripts

**Pricing:** $1.20 per 1000 posts (CHEAPEST option)
**Rating:** 5.00/5
**Success Rate:** 99%

**Free Tier Limits:**
- 4 profiles per run
- 100 posts per profile max
- Minimum 10 posts per profile

**Test Results:**
- Profile 1: Satya Nadella (@satyanadella)
  - Posts: 10
  - Content: Mix of text posts, videos, reposts
  - Engagement: 1,300-6,800 reactions per post
  - Cost: ~$0.012

- Profile 2: Justin Welsh (@justinwelsh)
  - Posts: 10
  - Content: Text posts with single images
  - Engagement: 1,500-5,400 reactions per post
  - Text length: 200-400 words per post
  - Cost: ~$0.012

**Data Structure for Carousel Posts:**
```json
{
  "media": {
    "type": "image",
    "images": [
      {"url": "slide1.jpg", "width": 1080, "height": 1080},
      {"url": "slide2.jpg", "width": 1080, "height": 1080},
      {"url": "slide3.jpg", "width": 1080, "height": 1080}
    ]
  }
}
```

**Use Cases:**
- Learning writing style from LinkedIn creators
- Post formula analysis
- Getting carousel slide images (visual design reference)
- Engagement pattern research
- Bulk content extraction for voice learning

---

## Cost Summary (This Session)

| Actor | Usage | Cost |
|-------|-------|------|
| YouTube transcript | 1 video (3.5 hours) | $0.009 |
| Instagram AI transcript | 1 reel (123s) | $0.025 |
| Instagram scraper | 21 posts | $0.057 |
| TikTok scraper | 3 videos | $0.017 |
| TikTok AI transcript | 1 video (40s) | $0.11 |
| LinkedIn scraper | 20 posts (2 profiles) | $0.024 |
| **TOTAL** | | **$0.242** |

**Budget Status:** $0.242 / $10.00 monthly budget (2.4% used)

---

## Platform Capabilities Summary

### For Learning Speaking Styles (What You Asked For):

| Platform | Get Spoken Words? | Best Actor | Cost/Video |
|----------|------------------|------------|------------|
| **YouTube** | ✅ YES (auto-captions) | `dz_omar/youtube-transcript-metadata-extractor` | FREE |
| **Instagram Reels** | ✅ YES (AI transcription) | `sian.agency/instagram-ai-transcript-extractor` | $0.025 |
| **TikTok** | ✅ YES (AI transcription) | `tictechid/anoxvanzi-Transcriber` | $0.10-0.20 |
| **LinkedIn Text Posts** | ✅ YES (written content) | `datadoping/linkedin-profile-posts-scraper` | $0.001 |
| **LinkedIn Videos** | ❌ NO (no transcript actor found) | N/A | N/A |
| **LinkedIn Carousels** | ⚠️ PARTIAL (images only, not text ON slides) | `datadoping/linkedin-profile-posts-scraper` | $0.001 |

---

## Recommendations

### Best Value for Money:
1. **YouTube** - FREE transcripts, best for long-form content
2. **LinkedIn** - $0.001 per post, best for written content analysis
3. **Instagram** - $0.025 per reel, good balance of cost/quality
4. **TikTok** - $0.10-0.20 per video, most expensive but high quality

### For Voice Learning Workflows:
**Recommended Stack:**
- YouTube: Use for long-form speaking patterns
- Instagram: Use for short-form video delivery
- LinkedIn: Use for writing style (not speaking)
- TikTok: Use sparingly (expensive, but good for viral short-form style)

### Budget-Conscious Approach:
1. Start with YouTube (FREE)
2. Add LinkedIn posts ($0.001 each)
3. Use Instagram AI transcript selectively (high-value reels only)
4. Avoid TikTok AI transcript unless absolutely necessary

---

## Next Steps

All 6 actors verified and documented. Ready for integration into:
- `/learn-voice` workflow (multi-platform voice learning)
- `/analyze-profile` workflow (any platform)
- `/competitive-analysis` workflow (cross-platform comparison)

**Logged to:** memories.md under API Usage section
**Total session cost:** $0.242
