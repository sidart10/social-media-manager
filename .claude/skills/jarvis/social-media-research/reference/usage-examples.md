# social-media-mcp - Usage Examples

**Real-world examples of calling social-media-mcp tools**

---

## Example 1: Get Trending Topics (Simple)

**User Request:** "What's trending about AI on Twitter?"

**Skill Invocation:**

```json
{
  "tool": "social-media-mcp",
  "function": "get_trending_topics",
  "parameters": {
    "platform": "twitter",
    "category": "technology",
    "count": 5
  }
}
```

**Actual Response:**

```json
{
  "platform": "twitter",
  "category": "technology",
  "trends": [
    {
      "name": "#AI",
      "volume": 15000,
      "category": "technology"
    },
    {
      "name": "#MachineLearning",
      "volume": 12000,
      "category": "technology"
    },
    {
      "name": "#GPT4",
      "volume": 10000,
      "category": "technology"
    },
    {
      "name": "#OpenAI",
      "volume": 8500,
      "category": "technology"
    },
    {
      "name": "#Claude",
      "volume": 7000,
      "category": "technology"
    }
  ]
}
```

**How to Use:**

- Present trends to user
- Note which are most relevant to their topic
- Use hashtags for content strategy

---

## Example 2: Comprehensive Research (Full Parameters)

**User Request:** "Research AI automation tools - need hashtags, facts, and news"

**Skill Invocation:**

```json
{
  "tool": "social-media-mcp",
  "function": "research_topic",
  "parameters": {
    "topic": "AI automation tools",
    "includeHashtags": true,
    "includeFacts": true,
    "includeTrends": true,
    "includeNews": true
  }
}
```

**Actual Response:**

```json
{
  "topic": "AI automation tools",

  "hashtags": ["#AIAutomation", "#ProductivityTools", "#NoCode", "#WorkflowAutomation", "#AITools"],

  "facts": [
    "73% of developers automate less than 20% of their workflows according to DevSurvey 2025",
    "AI automation market growing 28% year-over-year reports TechCrunch",
    "Companies using automation tools see average 10 hour/week time savings",
    "Zapier processes over 5 billion automated tasks monthly",
    "85% of businesses plan to increase automation investment in 2025"
  ],

  "news": [
    {
      "title": "New AI Automation Platform Raises $50M",
      "url": "https://techcrunch.com/2025/10/15/...",
      "source": "TechCrunch",
      "summary": "Startup announces Series B funding...",
      "publishedAt": "2025-10-15"
    },
    {
      "title": "Zapier Integrates AI Assistants",
      "url": "https://venturebeat.com/2025/10/20/...",
      "source": "VentureBeat",
      "summary": "Major automation platform adds AI...",
      "publishedAt": "2025-10-20"
    }
  ],

  "trends": [
    {
      "name": "#AIAutomation",
      "volume": 15000,
      "category": "technology"
    },
    {
      "name": "#NoCode",
      "volume": 12000,
      "category": "business"
    }
  ],

  "sources": [
    {
      "name": "Brave Search",
      "type": "search",
      "resultsCount": {
        "web": 10,
        "news": 5,
        "discussions": 3
      }
    },
    {
      "name": "Perplexity AI",
      "type": "ai-research",
      "depth": "detailed"
    }
  ]
}
```

**How to Use:**

- Hashtags: Use for content tagging
- Facts: Use as evidence in content
- News: Reference for timeliness
- Trends: Show "why now"

---

## Example 3: Minimal Research (Quick)

**User Request:** "Quick research on productivity apps - just hashtags"

**Skill Invocation:**

```json
{
  "tool": "social-media-mcp",
  "function": "research_topic",
  "parameters": {
    "topic": "productivity apps",
    "includeHashtags": true,
    "includeFacts": false,
    "includeTrends": false,
    "includeNews": false
  }
}
```

**Actual Response:**

```json
{
  "topic": "productivity apps",
  "hashtags": ["#ProductivityApps", "#TimeManagement", "#Productivity", "#AppReview", "#WorkSmarter"],
  "sources": [
    {
      "name": "Brave Search",
      "type": "search"
    }
  ]
}
```

**Speed:** ~3 seconds (much faster than full research)

---

## Example 4: Error - Topic Too Vague

**User Request:** "Research stuff"

**Skill Invocation:**

```json
{
  "topic": "stuff",
  "includeHashtags": true,
  "includeFacts": true,
  "includeTrends": true,
  "includeNews": true
}
```

**Actual Response:**

```json
{
  "error": "Topic too vague",
  "suggestion": "Please provide a more specific topic",
  "hashtags": [],
  "facts": [],
  "news": [],
  "trends": []
}
```

**How to Handle:**

- Ask user for more specific topic
- Suggest: "Be more specific - what aspect interests you?"
- Retry with clearer topic

---

## Example 5: Fallback When Tool Fails

**Scenario:** social-media-mcp not available

**Skill Behavior:**

1. Attempt research_topic call
2. Catch error: "MCP not available"
3. Log warning
4. Fallback: Use exa/web_search_exa instead
5. Return partial results with note: "Used web search (social-media-mcp unavailable)"

**User sees:** Research results with source note

---

## Parameter Combinations

### For Social Media Content:

```json
{
  "includeHashtags": true, // Essential
  "includeFacts": true, // Good for evidence
  "includeTrends": true, // Shows relevance
  "includeNews": false // Optional
}
```

### For Blog/Article Research:

```json
{
  "includeHashtags": false, // Not needed for blogs
  "includeFacts": true, // Essential for articles
  "includeTrends": false, // Less relevant
  "includeNews": true // Good for timeliness
}
```

### For Quick Ideation:

```json
{
  "includeHashtags": true,
  "includeFacts": false, // Skip for speed
  "includeTrends": true,
  "includeNews": false // Skip for speed
}
```

---

## Response Processing

**After receiving data:**

1. **Organize by Category:**
   - Hashtags section
   - Facts section (with sources if available)
   - News section (sorted by date)
   - Trends section (sorted by volume)

2. **Add Confidence Scores:**
   - Facts from Perplexity: High confidence
   - Facts extracted from search: Medium confidence
   - Hashtags by volume: High (>10k), Medium (5-10k), Low (<5k)

3. **Track Sources:**
   - Note Brave Search vs Perplexity
   - Include result counts
   - Timestamp everything

4. **Make Actionable:**
   - Highlight top 3 hashtags
   - Star high-confidence facts
   - Note most recent news
   - Identify strongest trends

---

**For tool reference, see:** `social-media-mcp-tools.md`
**For workflow integration, see:** `workflow-integration.md`
