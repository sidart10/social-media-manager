# social-media-mcp - Complete Tool Reference

**MCP Server:** social-media-mcp
**Location:** /Users/sid/.mcp-servers/social-media-mcp/
**Purpose:** Research engine combining Brave Search + Perplexity AI

---

## Available Tools

### Tool 1: get_trending_topics

**Purpose:** Get current trending topics from social media platforms

**Parameters:**

```json
{
  "platform": "twitter" | "all",
  "category": "technology" | "business" | "entertainment" | "sports" | "general",
  "count": number (default: 5, max: 20)
}
```

**Returns:**

```json
{
  "platform": "twitter",
  "category": "technology",
  "trends": [
    {
      "name": "#AIAgents",
      "volume": 15000,
      "category": "technology",
      "description": "Discussion about autonomous AI systems"
    },
    {
      "name": "#MachineLearning",
      "volume": 12000,
      "category": "technology",
      "description": "ML trends and developments"
    }
  ],
  "timestamp": "2025-10-27T15:00:00Z"
}
```

**Example Invocation:**

```
Tool: social-media-mcp
Function: get_trending_topics
Parameters:
  platform: "twitter"
  category: "technology"
  count: 10
```

**Response Time:** 2-5 seconds
**Cost:** $0 (uses Brave API, no additional cost)

---

### Tool 2: research_topic ⭐ COMPREHENSIVE

**Purpose:** Deep research using Brave Search + Perplexity AI with automatic extraction of hashtags, facts, news, and trends

**Parameters:**

```json
{
  "topic": string (required - the topic to research),
  "includeHashtags": boolean (default: false - extract relevant hashtags),
  "includeFacts": boolean (default: false - extract key facts/statistics),
  "includeTrends": boolean (default: false - get trending data),
  "includeNews": boolean (default: false - get recent news articles)
}
```

**What It Does:**

**1. Brave Search:**

- Web results (top 10)
- News articles (last month, top 5)
- Discussion forums (Reddit, etc.)
- Automatic keyword extraction

**2. Perplexity AI:**

- Deep research on topic
- Fact extraction (sentences with data/stats)
- Expert-level synthesis

**3. Processing:**

- Hashtag generation (analyzes keywords, creates 5 relevant hashtags)
- Fact filtering (finds sentences with numbers, "according to", "research shows")
- News filtering (recent articles, last 30 days)
- Trend correlation

**Returns:**

```json
{
  "topic": "AI agents",

  "hashtags": ["#AIAgents", "#AutonomousAI", "#MachineLearning", "#Automation", "#AITools"],

  "facts": [
    "AI agent market expected to grow 45% in 2025 according to Gartner",
    "73% of developers are experimenting with AI coding assistants",
    "Autonomous agents can reduce task completion time by 60%"
  ],

  "news": [
    {
      "title": "Claude Code Releases AI Agent Skills",
      "url": "https://techcrunch.com/...",
      "source": "TechCrunch",
      "summary": "Anthropic announces new Skills feature...",
      "publishedAt": "2025-10-16"
    },
    {
      "title": "AI Agents See Enterprise Adoption Surge",
      "url": "https://venturebeat.com/...",
      "source": "VentureBeat",
      "summary": "Companies deploying autonomous agents...",
      "publishedAt": "2025-10-20"
    }
  ],

  "trends": [
    {
      "name": "#AIAgents",
      "volume": 15000,
      "category": "technology"
    },
    {
      "name": "#CodingAgents",
      "volume": 8000,
      "category": "development"
    }
  ],

  "sources": [
    {
      "name": "Brave Search",
      "type": "search",
      "timestamp": "2025-10-27T15:00:00Z",
      "resultsCount": {
        "web": 10,
        "news": 5,
        "discussions": 3
      }
    },
    {
      "name": "Perplexity AI",
      "type": "ai-research",
      "timestamp": "2025-10-27T15:00:01Z",
      "depth": "detailed"
    }
  ]
}
```

**Example Invocation:**

```
Tool: social-media-mcp
Function: research_topic
Parameters:
  topic: "AI agents"
  includeHashtags: true
  includeFacts: true
  includeTrends: true
  includeNews: true
```

**Response Time:** 5-15 seconds (depends on Perplexity processing)
**Cost:** $0 (uses Brave + OpenAI APIs already configured)

---

### Tool 3: create_post

**Purpose:** Create and post content to platforms (Twitter, Mastodon, LinkedIn)

**Note:** Jarvis does NOT use this tool (Social Posting Agent handles posting)

**Included for reference only.**

---

## Implementation Details

### Brave Search Integration

**API:** Brave Search API
**Endpoint:** https://api.search.brave.com/res/v1
**Features:**

- Web search
- News search
- Discussion search
- Freshness: Results from last month

### Perplexity Integration

**Service:** Perplexity AI
**Features:**

- Deep topic research
- Fact extraction
- Expert-level synthesis
- Automatic sourcing

### Processing Algorithms

**Hashtag Extraction:**

- Analyzes all search results
- Extracts keywords (frequency analysis)
- Filters stop words
- Returns top 5 by relevance

**Fact Extraction:**

- Scans sentences for numbers
- Looks for phrases: "according to", "research shows", "study found"
- Validates with source attribution
- Returns 5-10 most credible facts

**News Filtering:**

- Filters by date (last 30 days)
- Ranks by source credibility
- Returns top 5 articles

---

## Error Handling

### Common Errors:

**1. "use_mcp_tool is not defined"**

- **Cause:** MCP invocation issue
- **Fix:** Ensure MCP server connected, check parameters
- **Fallback:** Use exa for web research instead

**2. Empty Results**

- **Cause:** Topic too niche or misspelled
- **Fix:** Try broader topic or check spelling
- **Fallback:** Reduce parameters (set some to false)

**3. Timeout**

- **Cause:** Perplexity AI taking too long
- **Fix:** Retry or use quick search
- **Fallback:** Set includeFacts to false (skip Perplexity)

**4. Rate Limit**

- **Cause:** Too many requests to Brave API
- **Fix:** Wait 60 seconds, retry
- **Fallback:** Use cached results if available

---

## Best Practices

**When to use get_trending_topics:**

- User asks "what's trending"
- Need current topics quickly
- Want hashtag volume data
- 2-5 second response needed

**When to use research_topic:**

- Need comprehensive research
- Want facts, data, citations
- Need hashtags + news + trends
- Willing to wait 5-15 seconds

**Parameter Recommendations:**

**For Quick Research:**

```json
{
  "topic": "...",
  "includeHashtags": true,
  "includeFacts": false, // Skip for speed
  "includeTrends": true,
  "includeNews": false // Skip for speed
}
```

**For Comprehensive Research:**

```json
{
  "topic": "...",
  "includeHashtags": true,
  "includeFacts": true, // Include for depth
  "includeTrends": true,
  "includeNews": true // Include for timeliness
}
```

---

## Integration Notes

**Used by:**

- social-media-research Skill (this Skill)
- research-topic workflow (primary user)
- generate-ideas workflow (for trend research)

**Provides data for:**

- Trend analysis
- Content ideation
- Evidence gathering
- Hashtag strategy

**Works best with:**

- Specific, focused topics
- Current events (benefits from news)
- Social media content research

---

**For complete usage examples, see:** `reference/usage-examples.md`
**For workflow integration, see:** `reference/workflow-integration.md`
