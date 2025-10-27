# MCP Servers Research & Capabilities Map

## Research Summary for Content Intelligence Agent

---

## 📊 Core MCP Servers Investigated

### 1. **social-media-mcp** (tayler-id)

**Repository**: https://github.com/tayler-id/social-media-mcp
**Platforms**: Twitter/X, Mastodon, LinkedIn

#### Available Tools:

- `create_post` - Generate and publish content across platforms
- `get_trending_topics` - Retrieve trending topics by platform/category
- `research_topic` - Investigate topics via Brave Search + Perplexity

#### Requirements:

- Twitter API credentials (key, secret, bearer, OAuth)
- Mastodon (client secret/key, access token)
- LinkedIn (client ID/secret, access token)
- OpenAI or Anthropic API (content generation)
- Brave Search API (research)

#### Strengths:

✅ Multi-platform posting
✅ Built-in trend discovery
✅ Research aggregation (Brave + Perplexity)
✅ Platform-specific formatting

#### Limitations:

❌ No deep profile analysis
❌ No engagement metrics retrieval for third-party profiles
❌ Posting-focused, not analysis-focused

---

### 2. **youtube-transcript-mcp** (kimtaeyoon83)

**Repository**: https://github.com/kimtaeyoon83/mcp-server-youtube-transcript
**Battle-tested**: 300+ ⭐

#### Available Tools:

- `get_transcript` - Extract YouTube video transcripts with timestamps

#### Parameters:

- `url` (required): YouTube URL or video ID
- `lang` (optional): Language code (default: "en")

#### Output:

- Full transcript text
- Timestamps for each segment
- Language metadata

#### Strengths:

✅ Simple, reliable, widely used
✅ Multi-language support
✅ Timestamp-level granularity
✅ No API key required

#### Use Cases for Our Agent:

- Mine competitor YouTube content
- Extract quotes/data for script writing
- Analyze winning video structures
- Source material for content ideation

---

### 3. **script-generation-mcp** (Pratik-Kumar-Cse)

**Repository**: https://github.com/Pratik-Kumar-Cse/script-generation-mcp
**Status**: Early stage but functional

#### Available Tools:

- `script_generate(topic, keywords)` - Multi-agent workflow for script generation
- `add_note(name, content)` - Store research snippets
- `summarize_notes(style)` - Aggregate notes (brief/detailed)

#### Workflow:

1. Multiple agents collaborate to draft scripts
2. Refinement process for quality
3. Note system keeps research organized

#### Requirements:

- Python 3.7+
- UV package manager
- Environment variables (details in .env.example)

#### Strengths:

✅ Multi-agent refinement process
✅ Note-taking system for research
✅ Topic + keyword driven generation

#### Limitations:

❌ Early stage, limited docs
❌ Configuration not fully documented
❌ May need custom post-processing

---

### 4. **linkedin-mcp** (rugvedp) - LinkedIn Profile Analyzer

**Repository**: https://github.com/rugvedp/linkedin-mcp
**Status**: Production-ready

#### Available Tools:

1. `fetch_and_save_linkedin_posts(username)` - Fetch and store LinkedIn posts
2. `get_saved_posts(start, limit)` - Retrieve posts with pagination
3. `search_posts(keyword)` - Keyword search in saved posts
4. `get_top_posts(metric, top_n)` - Get top performers by engagement
5. `get_posts_by_date(start_date, end_date)` - Date range filtering

#### Retrievable Data:

- Post content (text)
- Like counts
- Engagement metrics
- Publication dates
- Username/profile info

#### Requirements:

- Python 3.7+
- RapidAPI key for LinkedIn Data API
- Claude AI access

#### Strengths:

✅ Comprehensive post analysis
✅ Engagement-based ranking
✅ Date filtering & keyword search
✅ Pagination support
✅ Local storage for fast re-analysis

#### Perfect For:

- Analyzing competitor LinkedIn strategies
- Finding winning post patterns
- Content gap analysis
- Historical performance trends

---

### 5. **youtube-mcp-server** (dannySubsense) - Enhanced YouTube Analytics

**Repository**: https://github.com/dannySubsense/youtube-mcp-server
**Features**: 14 functions including intelligent content evaluation

#### All 14 Functions:

| Function                            | Purpose                   | Key Parameters               |
| ----------------------------------- | ------------------------- | ---------------------------- |
| `get_video_details`                 | Full video metadata       | video_id/URL                 |
| `get_playlist_details`              | Playlist info & structure | playlist_id                  |
| `get_playlist_items`                | Videos in playlist        | playlist_id, max_results     |
| `get_channel_details`               | Channel stats & info      | channel_id/@handle           |
| `get_video_categories`              | Available categories      | region_code                  |
| `get_channel_videos`                | Recent uploads            | channel_id, max_results      |
| `search_videos`                     | Search with filters       | query, max_results, order    |
| `get_trending_videos`               | Regional trending         | region_code, max_results     |
| `get_video_comments`                | Comments with sorting     | video_id, max_results, order |
| `analyze_video_engagement`          | Engagement benchmarks     | video_id                     |
| `get_channel_playlists`             | Public playlists          | channel_id                   |
| `get_video_caption_info`            | Caption availability      | video_id                     |
| `evaluate_video_for_knowledge_base` | Quality scoring           | video_id                     |
| `get_video_transcript`              | Full transcript           | video_id, language           |

#### Standout Feature: Technology Freshness Scoring

- **High-volatility topics** (React, AWS, AI/ML): Heavy recency weighting
- **Medium-volatility** (Python, general coding): Moderate recency bonus
- **Stable topics** (algorithms, math): Minimal age penalty

Quality indicators:

- View counts & engagement
- Caption type (manual > auto-generated)
- Content category relevance
- Video duration appropriateness
- Tech version mentions in titles/descriptions

#### Requirements:

- YouTube Data API v3 key
- Real-time API access

#### Strengths:

✅ Comprehensive metadata extraction
✅ Engagement analysis & benchmarking
✅ Intelligent content quality scoring
✅ Trending video discovery
✅ Channel-level analytics
✅ Built-in transcript extraction

---

### 6. **exa-mcp-server** (exa-labs) - AI-Powered Research Engine

**Repository**: https://github.com/exa-labs/exa-mcp-server
**Status**: Production-grade research tool

#### Available Tools:

1. **get_code_context_exa** - Search billions of GitHub repos, docs, Stack Overflow
2. **web_search_exa** - Real-time web search with content extraction
3. **company_research** - Crawl company websites for business intel
4. **crawling** - Extract content from specific URLs (articles, PDFs, pages)
5. **linkedin_search** - Search LinkedIn companies & people
6. **deep_researcher_start** - Initiate comprehensive AI research
7. **deep_researcher_check** - Retrieve research task results

#### Requirements:

- Exa AI Search API key
- Configurable tool selection (enable only what you need)

#### Strengths:

✅ Deep research capabilities
✅ Multi-source aggregation
✅ Competitor analysis
✅ LinkedIn professional search
✅ Company intelligence gathering
✅ Real-time web data

#### Perfect For:

- Competitor research & analysis
- Trend discovery
- Company/industry intelligence
- Finding similar businesses
- LinkedIn profile research

---

## 🎯 Capability Mapping to Agent Functions

### **RESEARCH & PROFILE ANALYSIS**

| Agent Capability           | MCP Server                                   | Tool(s)                                                                 |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| Analyze LinkedIn profiles  | linkedin-mcp                                 | `fetch_and_save_linkedin_posts`, `get_top_posts`, `search_posts`        |
| Analyze YouTube channels   | youtube-mcp-server                           | `get_channel_details`, `get_channel_videos`, `analyze_video_engagement` |
| Get YouTube transcripts    | youtube-transcript-mcp OR youtube-mcp-server | `get_transcript`                                                        |
| Discover trending topics   | social-media-mcp                             | `get_trending_topics`                                                   |
| Trending YouTube videos    | youtube-mcp-server                           | `get_trending_videos`                                                   |
| Research competitors       | exa-mcp-server                               | `company_research`, `web_search_exa`                                    |
| LinkedIn competitor search | exa-mcp-server                               | `linkedin_search`                                                       |
| Deep topic research        | exa-mcp-server + social-media-mcp            | `deep_researcher_start`, `research_topic`                               |

---

### **PATTERN MINING & INSIGHTS**

| Agent Capability        | MCP Server         | Tool(s)                                        |
| ----------------------- | ------------------ | ---------------------------------------------- |
| Find top LinkedIn posts | linkedin-mcp       | `get_top_posts(metric="Like Count", top_n=10)` |
| Engagement analysis     | youtube-mcp-server | `analyze_video_engagement`                     |
| Content quality scoring | youtube-mcp-server | `evaluate_video_for_knowledge_base`            |
| Search by keyword       | linkedin-mcp       | `search_posts(keyword)`                        |
| Date-based analysis     | linkedin-mcp       | `get_posts_by_date(start, end)`                |
| Comment sentiment       | youtube-mcp-server | `get_video_comments` + custom analysis         |

---

### **CONTENT IDEATION**

| Agent Capability           | MCP Server                        | Tool(s)                                   |
| -------------------------- | --------------------------------- | ----------------------------------------- |
| Generate ideas from trends | social-media-mcp                  | `get_trending_topics` + `research_topic`  |
| Mine competitor content    | youtube-transcript-mcp            | `get_transcript` (extract hooks/patterns) |
| Research topic deeply      | exa-mcp-server                    | `deep_researcher_start/check`             |
| Find content gaps          | linkedin-mcp + youtube-mcp-server | Compare top posts vs. own content         |

---

### **SCRIPT & CONTENT WRITING**

| Agent Capability        | MCP Server            | Tool(s)                                  |
| ----------------------- | --------------------- | ---------------------------------------- |
| Generate scripts        | script-generation-mcp | `script_generate(topic, keywords)`       |
| Store research notes    | script-generation-mcp | `add_note(name, content)`                |
| Summarize research      | script-generation-mcp | `summarize_notes(style)`                 |
| Platform-specific posts | social-media-mcp      | `create_post` (with platform formatting) |

---

## 🔧 Recommended MCP Server Stack

### **Tier 1: Essential (Must Have)**

1. ✅ **youtube-transcript-mcp** - Simple, reliable transcript extraction
2. ✅ **linkedin-mcp** - Robust LinkedIn analysis
3. ✅ **youtube-mcp-server** - Comprehensive YouTube analytics

### **Tier 2: High Value**

4. ✅ **exa-mcp-server** - Deep research & competitor analysis
5. ✅ **script-generation-mcp** - Script writing automation

### **Tier 3: Optional Enhancements**

6. ⚠️ **social-media-mcp** - Useful for trends, but overlaps with others
   - Consider if you need multi-platform posting
   - Research features duplicated by exa-mcp-server

---

## 🚨 Important Gaps & Considerations

### **What's Missing:**

❌ **Twitter/X Profile Analysis** - None of the servers do deep profile/engagement analysis for Twitter

- `social-media-mcp` can post & get trends, but no profile analytics
- Need to investigate: Twitter-specific MCP servers or build custom

❌ **Instagram/TikTok Analysis** - No comprehensive MCP servers found

- TikTok Video Discovery exists but limited scope
- May need third-party APIs or custom solutions

❌ **Cross-Platform Comparison** - No tool that automatically compares performance across platforms

- Will need custom workflow combining multiple MCPs

❌ **Real-time Metrics for Third-Party Profiles** - API limitations

- LinkedIn: RapidAPI provides post data but limited real-time metrics
- Twitter: Public profiles need official API (rate limits apply)
- YouTube: Good coverage via YouTube Data API

### **API Requirements & Costs:**

| MCP Server             | Required APIs                                             | Potential Costs               |
| ---------------------- | --------------------------------------------------------- | ----------------------------- |
| linkedin-mcp           | RapidAPI LinkedIn Data API                                | Paid (check RapidAPI pricing) |
| youtube-mcp-server     | YouTube Data API v3                                       | Free tier: 10,000 units/day   |
| exa-mcp-server         | Exa AI Search API                                         | Paid (check Exa pricing)      |
| social-media-mcp       | Twitter/LinkedIn/Mastodon APIs + Brave + OpenAI/Anthropic | Multiple API costs            |
| script-generation-mcp  | None (uses local AI)                                      | Compute only                  |
| youtube-transcript-mcp | None                                                      | Free                          |

---

## 💡 Workflow Design Recommendations

### **Workflow 1: Analyze LinkedIn Competitor**

```
Tools: linkedin-mcp + exa-mcp-server

1. exa: linkedin_search(competitor_name) → Find profile
2. linkedin-mcp: fetch_and_save_linkedin_posts(username)
3. linkedin-mcp: get_top_posts(metric="Like Count", top_n=10)
4. linkedin-mcp: search_posts(keyword) → Find topic clusters
5. linkedin-mcp: get_posts_by_date(last_90_days)
6. Custom analysis: Extract patterns (hooks, formats, CTAs)
7. Output: Idea Cards with evidence links
```

### **Workflow 2: Analyze YouTube Channel**

```
Tools: youtube-mcp-server + youtube-transcript-mcp

1. youtube-mcp: get_channel_details(channel_id)
2. youtube-mcp: get_channel_videos(channel_id, max_results=50)
3. youtube-mcp: analyze_video_engagement(video_ids) → Top performers
4. youtube-transcript: get_transcript(top_videos) → Extract content
5. Custom analysis: Mine hooks, structure, topics
6. Output: Script templates + Idea Cards
```

### **Workflow 3: Research Topic & Generate Script**

```
Tools: exa-mcp + social-media-mcp + script-generation-mcp

1. exa: deep_researcher_start(topic) → Comprehensive research
2. social-media-mcp: get_trending_topics(platform, category)
3. social-media-mcp: research_topic(topic) → Hashtags, facts, trends
4. script-generation-mcp: add_note(research_findings)
5. script-generation-mcp: script_generate(topic, keywords)
6. Custom refinement: Platform-specific adjustments
7. Output: Platform-ready scripts (YouTube/Reels/LinkedIn/Twitter)
```

### **Workflow 4: Competitive Gap Analysis**

```
Tools: All MCPs combined

1. Analyze their LinkedIn (linkedin-mcp)
2. Analyze their YouTube (youtube-mcp-server)
3. Research their company (exa-mcp)
4. Compare topic coverage, formats, engagement
5. Identify gaps in your content vs. theirs
6. Generate ideas for gap-filling content
7. Output: Competitive intelligence report + 10 Idea Cards
```

---

## 🎯 Next Steps

1. **Install & Test Priority MCPs** in this order:
   - youtube-transcript-mcp (easiest, no API key)
   - linkedin-mcp (test with RapidAPI trial)
   - youtube-mcp-server (YouTube API free tier)

2. **Build Minimal Workflows** for:
   - Single LinkedIn profile analysis
   - Single YouTube channel analysis
   - Simple script generation

3. **Test Integration** with agent:
   - Can tools be called successfully?
   - Output format suitable for parsing?
   - Rate limits manageable?

4. **Design Agent Commands** based on proven tool combinations

5. **Build Out Sidecar Resources**:
   - Pattern library templates
   - Platform specs (length, tone, format)
   - Hook templates based on real data

---

## 📌 Decision Points for Agent Build

### Question 1: Which platforms to prioritize?

**Recommendation**: Start with **LinkedIn + YouTube** (best MCP coverage)

- Add Twitter later (needs more research)
- Instagram/TikTok = future phase

### Question 2: Posting vs Analysis?

**Recommendation**: Focus on **analysis & script generation** first

- social-media-mcp posting can be added later
- Core value = intelligence + ideation, not publishing

### Question 3: How many MCPs to integrate initially?

**Recommendation**: Start with **3 core MCPs**:

1. youtube-transcript-mcp (transcripts)
2. linkedin-mcp (LinkedIn analysis)
3. script-generation-mcp (content writing)

Add exa-mcp-server + youtube-mcp-server in Phase 2

---

## 🏗️ Agent Architecture Recommendation

```
content-intelligence-agent/
├── content-intelligence.agent.yaml
└── content-intelligence-sidecar/
    ├── instructions.md           # MCP integration rules
    ├── memories.md               # Analyzed profiles, patterns
    ├── workflows/
    │   ├── analyze-linkedin-profile.yaml
    │   ├── analyze-youtube-channel.yaml
    │   ├── research-topic.yaml
    │   ├── generate-script.yaml          # Multi-platform
    │   └── competitive-gap-analysis.yaml
    ├── knowledge/
    │   ├── hook-templates.md             # Populated from real analysis
    │   ├── platform-specs.yaml           # Length, tone, format per platform
    │   ├── pattern-library.md            # Winning patterns by platform
    │   └── mcp-tools-reference.md        # Quick reference for MCP tools
    └── sessions/                         # Analysis history
```

---

## ✅ Validation Checklist

Before building workflows:

- [ ] Test youtube-transcript-mcp locally
- [ ] Get RapidAPI key for linkedin-mcp
- [ ] Test script-generation-mcp with sample topic
- [ ] Confirm YouTube Data API quota
- [ ] Review Exa API pricing
- [ ] Document rate limits for each service
- [ ] Test error handling for each MCP
- [ ] Verify output formats are parseable

---

_Research completed: 2025-10-25_
_Status: Ready to design agent workflows_
