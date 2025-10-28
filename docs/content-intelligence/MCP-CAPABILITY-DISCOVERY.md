# MCP Capability Discovery Report

**Date:** 2025-10-26
**Purpose:** Complete inventory of ALL MCP server capabilities

---

## 🔍 DISCOVERY: social-media-mcp

**Status:** ✅ Installed & Built
**Location:** `/Users/sid/Desktop/social-media-mcp/`

### Tools Provided (3 total):

#### 1. **create_post**

**Description:** "Create and post content to social media platforms based on natural language instructions"

**Inputs:**

- `instruction` (required): Natural language (e.g., "Post about latest AI developments")
- `platforms`: Array ["twitter", "mastodon", "linkedin", "all"]
- `postImmediately`: boolean (preview vs post)
- `conversationId`: Continue existing conversation
- `questionId`: Answer specific question
- `answer`: Answer text
- `ignoreHistory`: Skip similarity check
- `actionableInsights`: Include insights

**What It Does:**

1. Takes natural language instruction
2. **Generates content** using OpenAI (gpt-4o) OR Anthropic (claude-3-opus)
3. Formats for each platform (Twitter/Mastodon/LinkedIn specific)
4. Can post immediately OR return preview
5. Uses conversation history for context
6. Checks against previous posts (avoid duplicates)

**Content Generation:**

- Uses `/src/content/strategies/` - OpenAI and Anthropic strategies
- Uses `/src/content/templates/` - Platform-specific templates
- Uses `/src/content/formatter/` - Platform formatting

**Key Insight:** This ALREADY does AI-powered content generation!

---

#### 2. **get_trending_topics**

**Description:** "Get trending topics from social media platforms"

**Inputs:**

- `platform` (required): "twitter" | "mastodon" | "linkedin" | "all"
- `category`: Optional (e.g., "technology", "entertainment")
- `count`: Number of topics to return

**What It Does:**

- Fetches current trending topics
- Platform-specific trending data
- Returns topic names/hashtags

---

#### 3. **research_topic**

**Description:** "Research a topic using Brave Search and Perplexity"

**Inputs:**

- `topic` (required): Topic to research
- `includeHashtags`: boolean
- `includeFacts`: boolean
- `includeTrends`: boolean
- `includeNews`: boolean

**What It Does:**

1. Uses Brave Search API for web research
2. Uses Perplexity API for AI-powered research
3. Aggregates results
4. Returns:
   - Hashtags (relevant to topic)
   - Facts (verified information)
   - Trends (current trends related to topic)
   - News (recent articles)

**Research Components:**

- `/src/research/brave/` - Brave Search integration
- `/src/research/perplexity/` - Perplexity integration
- `/src/research/aggregator/` - Result aggregation

---

### Configuration Status:

**Missing API Keys:**

- ⚠️ MASTODON credentials (not needed for our use case)
- ⚠️ LINKEDIN_ACCESS_TOKEN (not needed - we use our own LinkedIn module)
- ⚠️ OPENAI_API_KEY or ANTHROPIC_API_KEY (CRITICAL for create_post!)
- ⚠️ BRAVE_API_KEY (for research_topic)

**Available:**

- ✅ TWITTER credentials (all configured)
- ✅ LINKEDIN_CLIENT credentials (partial)

**Impact:**

- create_post will fail without OpenAI/Anthropic key!
- research_topic will fail without Brave key!
- get_trending_topics might work with Twitter

---

## 🔍 DISCOVERY: youtube-uploader-mcp

**Status:** ✓ Connected
**Purpose:** YouTube video uploads

### Tools Provided:

**Need to check:** What tools does it actually expose?

**Known capabilities:**

- Upload YouTube videos
- Authenticate with OAuth
- Channel selection

**Unknown:**

- Does it have script generation?
- Does it have content tools?
- Does it have research tools?

**Next:** List tools from youtube-uploader-mcp

---

## 🔍 DISCOVERY: apify MCP

**Status:** ✓ Connected (HTTP)
**URL:** https://mcp.apify.com

### Actors Available:

**Instagram:**

- apify/instagram-scraper
- apify/instagram-reel-scraper
- apify/instagram-post-scraper

**TikTok:**

- clockworks/tiktok-scraper
- clockworks/free-tiktok-scraper

**Twitter:**

- apidojo/tweet-scraper
- apidojo/twitter-scraper-lite
- apidojo/twitter-user-scraper
- danek/twitter-scraper-ppr
- Multiple premium scrapers

**LinkedIn:**

- dev_fusion/Linkedin-Profile-Scraper
- apimaestro/linkedin-profile-posts
- curious_coder/linkedin-jobs-scraper
- supreme_coder/linkedin-post

**YouTube:**

- streamers/youtube-scraper

**Other:**

- apify/rag-web-browser
- Document tools (docs)
- Experimental features

### Tools Provided (Apify MCP):

**Standard Apify MCP tools:**

1. `search-actors` - Find actors in store
2. `fetch-actor-details` - Get actor requirements
3. `call-actor` - Execute actor
4. `get-actor-output` - Retrieve results
5. `get-dataset` - Get dataset data
6. `list-actor-runs` - List runs
7. Others (experimental, storage, docs)

---

## 🔍 DISCOVERY: exa MCP

**Status:** ✓ Configured (in ~/.claude.json)
**API Key:** ✅ Configured

### Tools Provided:

1. `web_search_exa` - Web search with content extraction
2. `deep_researcher_start` - Initiate comprehensive research
3. `deep_researcher_check` - Retrieve research results
4. `company_research` - Company/competitor intelligence
5. `linkedin_search` - Find LinkedIn profiles
6. `get_code_context_exa` - Search code/docs/Stack Overflow (if enabled)

---

## 🔍 DISCOVERY: youtube-transcript MCP

**Status:** ✓ Configured (in ~/.claude.json)
**API Key:** None needed (FREE)

### Tools Provided:

1. `get_transcript` - Extract YouTube video transcript with timestamps

**Inputs:**

- `url`: YouTube video URL
- `lang`: Language code (default: "en")

**Outputs:**

- Full transcript text
- Timestamps for each segment
- Language metadata

---

## 📊 CAPABILITY MATRIX - What Each MCP Does

| Capability              | MCP Server         | Tools                                       | Status           |
| ----------------------- | ------------------ | ------------------------------------------- | ---------------- |
| **Platform Scraping**   | apify              | search-actors, call-actor, get-actor-output | ✅ Working       |
| **YouTube Transcripts** | youtube-transcript | get_transcript                              | ✅ Working       |
| **Deep Web Research**   | exa                | web_search_exa, deep_researcher_start/check | ✅ Working       |
| **Trending Topics**     | social-media-mcp   | get_trending_topics                         | ⚠️ Need API keys |
| **Topic Research**      | social-media-mcp   | research_topic (Brave + Perplexity)         | ⚠️ Need API keys |
| **Content Generation**  | social-media-mcp   | create_post (uses OpenAI/Anthropic)         | ⚠️ Need API keys |
| **Company Intel**       | exa                | company_research                            | ✅ Working       |
| **LinkedIn Search**     | exa                | linkedin_search                             | ✅ Working       |

---

## 🚨 CRITICAL FINDING

**social-media-mcp NEEDS API KEYS to work!**

**Currently Missing:**

- OPENAI_API_KEY or ANTHROPIC_API_KEY (for create_post content generation)
- BRAVE_API_KEY (for research_topic)

**You HAVE these keys in .env!**

- ✅ OPENAI_API_KEY
- ✅ BRAVE_API_KEY

**But social-media-mcp config doesn't have them!**

**Fix needed:** Add to social-media-mcp configuration

---

## 🎯 IMMEDIATE ACTION REQUIRED

**Update social-media-mcp config to include missing keys:**

```json
{
  "social-media-mcp": {
    "command": "node",
    "args": ["/Users/sid/Desktop/social-media-mcp/build/index.js"],
    "env": {
      "TWITTER_API_KEY": "...",
      "OPENAI_API_KEY": "sk-proj-mkMYr...",  // ADD THIS
      "BRAVE_API_KEY": "BSASVFLH6rsp...",     // ADD THIS
      ... (rest of keys)
    }
  }
}
```

**Then social-media-mcp will:**

- ✅ Generate content with OpenAI
- ✅ Research topics with Brave
- ✅ Get trending topics

---

## 🔍 NEXT DISCOVERY ITEMS

**Still need to check:**

1. youtube-uploader-mcp tools (what does it provide?)
2. mcp_twitter tools (beyond posting?)
3. Test if social-media-mcp create_post works after adding keys
4. Evaluate quality of social-media-mcp content generation

---

_Discovery in progress - do NOT implement until complete_
