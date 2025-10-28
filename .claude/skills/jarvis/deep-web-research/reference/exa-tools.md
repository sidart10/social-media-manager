# exa - Complete Tool Reference

**MCP Server:** exa
**Package:** exa-mcp-server
**Purpose:** AI-powered web search and deep research

---

## Available Tools

### Tool 1: web_search_exa (Quick Search)

**Purpose:** Fast AI-powered web search

**Parameters:**

```json
{
  "query": "AI infrastructure spending 2024",
  "numResults": 10,
  "livecrawl": "always" | "fallback"
}
```

**Returns:**

```json
{
  "results": [
    {
      "title": "AI Infrastructure Investment Hits $50B in 2024",
      "url": "https://techcrunch.com/...",
      "snippet": "Major cloud providers ramping up...",
      "publishedDate": "2025-10-15",
      "score": 0.95
    }
  ],
  "query": "AI infrastructure spending 2024",
  "numResults": 10
}
```

**Response Time:** 3-5 seconds
**Cost:** ~$0.05-0.10 per search

---

### Tool 2: deep_researcher_start (Comprehensive)

**Purpose:** Initiate AI-powered deep research on a topic

**Parameters:**

```json
{
  "topic": "AI infrastructure as core compute layer"
}
```

**Returns:**

```json
{
  "researchId": "research_abc123",
  "status": "processing",
  "estimatedTime": "30-60 seconds"
}
```

**What It Does:**

- AI analyzes topic comprehensively
- Searches multiple sources
- Extracts key insights, data, expert opinions
- Synthesizes findings

---

### Tool 3: deep_researcher_check (Retrieve Results)

**Purpose:** Get results from deep research job

**Parameters:**

```json
{
  "researchId": "research_abc123"
}
```

**Returns:**

```json
{
  "status": "completed",
  "insights": [
    {
      "text": "AI infrastructure spending projected to exceed $100B by 2026",
      "source": "https://gartner.com/...",
      "confidence": "high"
    },
    {
      "text": "Major shift from SaaS model to infrastructure-as-platform",
      "source": "https://a16z.com/...",
      "confidence": "high"
    }
  ],
  "dataPoints": [
    "45% YoY growth in AI compute spending",
    "Cloud providers investing $30B in AI infrastructure",
    "$15B in GPU procurement alone"
  ],
  "expertQuotes": [
    {
      "quote": "AI is infrastructure, not just another application layer",
      "source": "CEO, Major Cloud Provider",
      "url": "https://..."
    }
  ],
  "sources": [
    {
      "url": "https://techcrunch.com/...",
      "title": "...",
      "relevance": 0.95
    }
  ]
}
```

**Response Time:** 30-60 seconds (processing) + 2-3 seconds (retrieval)
**Cost:** ~$0.20-0.50 per deep research

---

### Tool 4: company_research

**Purpose:** Research specific companies or competitors

**Parameters:**

```json
{
  "query": "OpenAI infrastructure strategy" | "AI infrastructure companies"
}
```

**Returns:**

```json
{
  "companies": [
    {
      "name": "OpenAI",
      "description": "...",
      "relevance": "...",
      "insights": ["..."]
    }
  ],
  "insights": [...],
  "sources": [...]
}
```

---

## When to Use Which Tool

### web_search_exa (Quick, $0.05-0.10)

**Use when:**

- Need quick results (3-5 seconds)
- Standard web search sufficient
- Budget-conscious
- Topic well-documented

**Best for:**

- Finding articles
- Getting overview
- Quick fact-checking
- Recent news

### deep_researcher (Comprehensive, $0.20-0.50)

**Use when:**

- Need deep insights
- Willing to wait 30-60 seconds
- Complex topic
- Want expert opinions

**Best for:**

- Market analysis
- Comprehensive research
- Expert perspectives
- Data synthesis

### company_research (Targeted, ~$0.10)

**Use when:**

- Researching specific companies
- Competitor intelligence
- Company strategies
- Industry positioning

---

## Complete Flow Example

**Deep Research Flow:**

**Step 1:** Initiate

```
Tool: exa/deep_researcher_start
Parameters: {topic: "AI infrastructure spending"}
Returns: {researchId: "research_123"}
```

**Step 2:** Wait

```
Display: "Deep research initiated... (30-60 seconds)"
Wait: 30 seconds
```

**Step 3:** Check status (optional)

```
Tool: exa/deep_researcher_check
Parameters: {researchId: "research_123"}
Returns: {status: "processing"} or {status: "completed"}
```

**Step 4:** Retrieve

```
Tool: exa/deep_researcher_check
Parameters: {researchId: "research_123"}
Returns: {insights[], dataPoints[], expertQuotes[], sources[]}
```

**Step 5:** Organize

```
Category 1: Key Insights (from insights[])
Category 2: Data & Statistics (from dataPoints[])
Category 3: Expert Opinions (from expertQuotes[])
All with source URLs
```

---

## Error Handling

**Research timeout:**

- Wait longer (up to 90 seconds)
- If still processing, inform user and retry later

**No results:**

- Topic may be too niche
- Try broader search terms
- Fall back to web_search_exa

**API limit:**

- Track usage
- Inform user of costs
- Suggest caching results

---

**For research strategies, see:** `research-strategies.md`
**For workflow integration, see:** `workflow-integration.md`
