# MCP Tools Quick Reference

**For Jarvis - Content Intelligence Agent**
**Last Updated:** 2025-10-26

---

## Cost-Optimized Tool Selection

### Decision Tree

```
Need to analyze profile?
├─ YouTube? → Use youtube-mcp-server (FREE)
├─ LinkedIn? → Use linkedin-mcp (Low cost)
├─ Twitter (yours)? → Use twitter-api-client (FREE)
├─ Twitter (competitor)? → Use apify_mcp ($0.02)
├─ Instagram? → Use apify_mcp ($0.50)
└─ TikTok? → Use apify_mcp ($0.50)

Need transcripts?
└─ Use youtube-transcript (FREE, always)

Need research?
├─ Quick facts? → social-media-mcp (uses other keys)
├─ Deep dive? → exa-mcp (paid but specialized)
└─ Web search? → exa-mcp

Need to write?
└─ Use script-generation-mcp (FREE, multi-agent)

Need trends?
└─ social-media-mcp.get_trending_topics
```

---

## Tier 1: FREE Tools (Always Try First)

### youtube-mcp-server
**Cost:** FREE (10,000 units/day quota)
**Use For:** YouTube channel analysis, video analytics

**Available Tools:**
- `get_channel_details(channel_id)` - Channel stats, description, metrics
- `get_channel_videos(channel_id, max_results)` - Recent uploads
- `analyze_video_engagement(video_id)` - Engagement benchmarks
- `get_trending_videos(region, max_results)` - Trending content
- `evaluate_video_for_knowledge_base(video_id)` - Quality scoring
- `get_video_transcript(video_id, language)` - Built-in transcript

**Example:**
```
channel_details = youtube_mcp_server.get_channel_details("UC...")
videos = youtube_mcp_server.get_channel_videos("UC...", 50)
```

### youtube-transcript
**Cost:** FREE (no API key needed)
**Use For:** Video transcript extraction

**Available Tools:**
- `get_transcript(url, lang)` - Get full transcript with timestamps

**Example:**
```
transcript = youtube_transcript.get_transcript("https://youtu.be/...", "en")
```

### script-generation-mcp
**Cost:** FREE (local processing)
**Use For:** Multi-agent script generation, research notes

**Available Tools:**
- `script_generate(topic, keywords)` - Generate script with multi-agent refinement
- `add_note(name, content)` - Store research snippet
- `summarize_notes(style)` - Aggregate notes (brief/detailed)

**Example:**
```
script_generation_mcp.add_note("research", "Key finding: X% growth...")
script = script_generation_mcp.script_generate("AI automation", "productivity, tools, workflow")
```

---

## Tier 2: Low-Cost Tools

### linkedin-mcp
**Cost:** RapidAPI (varies by plan)
**Use For:** LinkedIn profile & post analysis

**Available Tools:**
- `fetch_and_save_linkedin_posts(username)` - Download posts
- `get_top_posts(metric, top_n)` - Get best performers
- `search_posts(keyword)` - Find posts by topic
- `get_posts_by_date(start_date, end_date)` - Date range
- `get_saved_posts(start, limit)` - Paginated retrieval

**Example:**
```
linkedin_mcp.fetch_and_save_linkedin_posts("johndoe")
top_posts = linkedin_mcp.get_top_posts("Like Count", 10)
```

### exa-mcp
**Cost:** Paid API (check pricing)
**Use For:** Deep research, competitor intelligence

**Available Tools:**
- `web_search_exa(query, max_results)` - Fast web search
- `deep_researcher_start(topic)` - Initiate comprehensive research
- `deep_researcher_check()` - Retrieve research results
- `company_research(query)` - Company/competitor intel
- `linkedin_search(query)` - Find LinkedIn profiles

**Example:**
```
exa_mcp.deep_researcher_start("AI coding tools market")
// Wait 30s
results = exa_mcp.deep_researcher_check()
```

### social-media-mcp
**Cost:** Uses other API keys (Brave, OpenAI/Anthropic)
**Use For:** Trending topics, quick research

**Available Tools:**
- `get_trending_topics(platform, category)` - Current trends
- `research_topic(topic)` - Quick facts, hashtags, data

**Example:**
```
trends = social_media_mcp.get_trending_topics("twitter", "tech")
research = social_media_mcp.research_topic("AI automation")
```

---

## Tier 3: Apify (Pay-Per-Use)

### apify_mcp
**Cost:** ~$0.40-0.50 per 1000 results (varies by actor)
**Use For:** Twitter, Instagram, TikTok, or any of 5000+ data sources

**How to Use:**
1. Determine which actor you need
2. Estimate cost
3. Warn user
4. Get approval
5. Execute

**Primary Actors:**

#### Twitter/X (xtdata/twitter-x-scraper)
**Cost:** $0.40 per 1000 tweets (~$0.02 for 50 posts)
**Data:** tweets, engagement, profile stats, timeline
**Use When:** Analyzing competitor Twitter profiles

#### Instagram (apify/instagram-scraper)
**Cost:** $0.50 per 1000 posts (~$0.05 for 100 posts)
**Data:** posts, likes, comments, followers, profile
**Use When:** ANY Instagram analysis

#### TikTok (clockworks/tiktok-scraper)
**Cost:** ~$0.50 per profile
**Data:** videos, views, likes, comments, metrics
**Use When:** ANY TikTok analysis

**Example Flow:**
```
User: "Analyze this Instagram profile"
Jarvis:
  → Check: No free Instagram API available
  → Estimate: ~$0.05 for 100 posts
  → Ask: "This will cost ~$0.05 from Apify. Proceed?"
  → User: "yes"
  → Execute: apify_mcp with actor "apify/instagram-scraper"
  → Log cost in memories.md
```

---

## Custom Modules (Your Direct APIs)

### twitter-api-client
**Cost:** FREE (uses YOUR Twitter API quota)
**Use For:** Analyzing YOUR Twitter profile only

**Location:** `{project-root}/bmad/modules/twitter-api-client`

**When to use:**
- User asks to analyze their own Twitter
- Need to fetch user's posts for voice learning
- Costs $0 vs Apify's $0.02

### linkedin-api-client
**Cost:** FREE (uses YOUR LinkedIn OAuth)
**Use For:** Posting to YOUR LinkedIn (not analysis)

**Location:** `{project-root}/bmad/modules/linkedin-api-client`

**When to use:**
- Validating LinkedIn post format
- Checking text length/escaping
- (Note: For analysis, use linkedin-mcp instead)

---

## Tool Selection Strategy

### Always Ask:
1. **Can I use a free tool?** (Tier 1)
2. **Is there a low-cost option?** (Tier 2)
3. **Do I need Apify?** (Tier 3 - warn user about cost)

### Never:
- Use paid tool when free option exists
- Call Apify without estimating cost
- Exceed quotas without fallback plan

---

## Common Tool Combinations

### Analyze YouTube Channel (FREE)
```
1. youtube-mcp-server.get_channel_details(channel_id)
2. youtube-mcp-server.get_channel_videos(channel_id, 50)
3. youtube-mcp-server.analyze_video_engagement(video_ids)
4. youtube-transcript.get_transcript(top_videos)

Cost: $0
```

### Analyze Instagram Profile (PAID)
```
1. apify_mcp: apify/instagram-scraper
   - Input: profile_url
   - Output: posts, engagement, profile data
   - Cost: ~$0.05 for 100 posts

Alternative: None (no free Instagram API)
```

### Generate Ideas (MIXED)
```
1. social-media-mcp.get_trending_topics("twitter") - Uses other keys
2. exa_mcp.web_search_exa(topic, 10) - Paid
3. script_generation_mcp.add_note(...) - FREE
4. script_generation_mcp.summarize_notes() - FREE

Cost: Variable (depends on exa usage)
```

### Write Script (FREE)
```
1. script_generation_mcp.script_generate(topic, keywords) - FREE
2. Load voice profile from memories.md - FREE
3. Apply platform formatting - FREE

Cost: $0
```

---

## Error Handling

### Tool Unavailable
```
If youtube-mcp-server fails:
  → Try apify_mcp: apify/youtube-scraper (estimate cost)
  → Ask user for approval
  → Log fallback in session notes
```

### Quota Exceeded
```
If YouTube API quota exceeded (10k units):
  → Log: "YouTube API quota exceeded"
  → Offer: "Use Apify YouTube scraper? (~$0.40)"
  → Wait for approval
```

### Rate Limited
```
If any API returns rate limit error:
  → Log error with timestamp
  → Wait recommended time (if provided)
  → Retry OR offer alternative tool
```

---

## Logging Every Call

Track all MCP calls for cost transparency:

```markdown
## Workflow: analyze-profile
- youtube-mcp-server.get_channel_details: ✓ (50 units, FREE)
- youtube-transcript.get_transcript (5 videos): ✓ (FREE)
- Total: $0.00
```

---

*This reference ensures cost-optimized, reliable tool usage*
*Updated as new tools are discovered or patterns change*
