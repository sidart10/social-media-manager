# social-media-mcp - Complete Research Capabilities

**Discovered:** 2025-10-26
**Location:** /Users/sid/.mcp-servers/social-media-mcp/src/research/

---

## 🔥 WHAT IT ACTUALLY HAS (Way More Than We Thought!)

### Research Engine Components

**1. Brave Search Client** (`src/research/brave/client.ts`)

- Web search (top 10 results)
- News search (recent articles)
- Discussion search (forums, Reddit, etc.)
- **Hashtag extraction** (auto-generates relevant hashtags)
- **Keyword extraction** (identifies key terms)
- **Fact extraction** (finds sentences with data/stats)

**2. Perplexity Client** (`src/research/perplexity/mcp-client.ts`)

- Deep research with AI
- Detailed topic exploration
- Fact gathering

**3. Research Aggregator** (`src/research/aggregator/index.ts`)

- Combines Brave + Perplexity
- Organizes results by type
- Tracks sources

---

## 🎯 MCP Tool: research_topic

**What the tool does when you call it:**

```javascript
researchTopic(topic, {
  includeHashtags: true, // Extract relevant hashtags
  includeFacts: true, // Find key facts/stats
  includeTrends: true, // Get trending data
  includeNews: true, // Get latest news
});
```

**Returns:**

```javascript
{
  sources: [
    {name: "Brave Search", type: "search", timestamp: "..."},
    {name: "Perplexity", type: "ai-research", timestamp: "..."}
  ],

  hashtags: [
    "#AIAutomation",
    "#ProductivityTools",
    "#NoCode",
    "#WorkflowOptimization",
    "#AITools"
  ],

  facts: [
    "73% of developers automate less than 20% of their workflows",
    "AI automation market growing 28% year-over-year",
    "According to research, automation saves average 10 hours/week"
  ],

  news: [
    {
      title: "New AI Automation Platform Launches",
      url: "https://techcrunch.com/...",
      source: "TechCrunch",
      summary: "...",
      publishedAt: "2025-10-20"
    }
  ],

  trends: [
    {name: "#AITrends", volume: 15000, category: "general"},
    {name: "#AutomationNews", volume: 12000, category: "news"}
  ]
}
```

---

## 🚨 WHAT WE'RE MISSING IN CURRENT WORKFLOW

### Current research-topic workflow (line 36):

```xml
<action>Call social_media_mcp/research_topic</action>
```

**Problem:** We're calling it but NOT using all its capabilities!

**We should be using:**

```xml
<action>Call social_media_mcp/research_topic with ALL options:</action>
<action>Parameters:
  topic: {topic}
  includeHashtags: true    ← Get relevant hashtags
  includeFacts: true       ← Get key facts/stats
  includeTrends: true      ← Get trending data
  includeNews: true        ← Get latest news
</action>

<action>Extract from results:
  - hashtags[] → Use for Idea Cards
  - facts[] → Use as evidence
  - news[] → Recent developments
  - trends[] → Why this topic is hot
  - sources[] → Track evidence
</action>
```

**This ONE tool gives us:**

- ✅ Hashtags (for content)
- ✅ Facts with sources (for evidence)
- ✅ News articles (for timeliness)
- ✅ Trending data (for "why now")
- ✅ Brave Search results (web + news + discussions)
- ✅ Perplexity research (AI-powered deep dive)

---

## 💡 ULTRATHINK REALIZATION

**You're absolutely right - we're NOT fully leveraging social-media-mcp!**

### What we SHOULD do with Claude Skills:

**Create specialized Skills that ORCHESTRATE MCPs:**

### Skill: social-media-research

```yaml
---
name: social-media-research
description: Research topics using social-media-mcp comprehensive research engine (Brave Search + Perplexity). Automatically extracts hashtags, facts, trends, and news. Use when researching topics for social media content, when user asks about trending topics, hashtags, or current facts about a subject.
---

# Social Media Research Skill

## Purpose
Leverage social-media-mcp's complete research engine (Brave + Perplexity) to gather:
- Relevant hashtags
- Key facts with sources
- Trending data
- Latest news
- Web + discussion results

## Instructions

1. **Call research_topic with ALL parameters:**
```

Tool: social-media-mcp/research_topic
Parameters:
topic: {user's topic}
includeHashtags: true
includeFacts: true
includeTrends: true
includeNews: true

````

2. **Extract and organize results:**

**Hashtags Section:**
- List all returned hashtags
- Note volume/popularity if available
- Suggest best hashtags for content

**Facts Section:**
- List all facts with data/stats
- Include source attribution
- Mark confidence level

**News Section:**
- Recent articles (last month)
- Publication dates
- Source credibility

**Trends Section:**
- Trending hashtags related to topic
- Volume/mention counts
- Category classification

**Sources Section:**
- Brave Search (web + news + discussions)
- Perplexity AI research (if used)
- Timestamp all sources

3. **Create structured output:**
```markdown
# Social Media Research: {Topic}

## Hashtags (Use These)
- #AIAutomation (15k mentions)
- #ProductivityTools (12k mentions)
...

## Key Facts & Data
- 73% of developers automate < 20% (Source: DevSurvey)
- Market growing 28% YoY (Source: TechCrunch)
...

## Latest News
- [Article Title](URL) - TechCrunch, Oct 20
...

## Trending Now
- #AITrends - 15k volume
...

## Sources
- Brave Search (web: 10, news: 5, discussions: 3)
- Perplexity (depth: detailed)
````

## When to Use

- User asks to research topic for social media
- Need hashtags for content
- Want current trends/facts
- Creating content strategy
- Part of research-topic workflow

## Example

Input: "Research AI automation tools"

Output:

- 5 relevant hashtags
- 10+ key facts with sources
- 5 recent news articles
- 3 trending related topics
- All evidence tracked

```

---

## 🎯 PROPOSED ARCHITECTURE

### Research Skills (Each Specialized):

1. **social-media-research** Skill
   - Uses: social-media-mcp (Brave + Perplexity)
   - Gets: Hashtags, facts, trends, news
   - When: User wants social media focused research

2. **youtube-research** Skill
   - Uses: youtube-transcript + apify
   - Gets: Transcripts, structure patterns, quotes
   - When: User wants video examples

3. **profile-analysis** Skill
   - Uses: apify (all platform scrapers)
   - Gets: Profile data, post patterns, engagement
   - When: User provides profile URLs

4. **deep-web-research** Skill
   - Uses: exa
   - Gets: Comprehensive web research, company intel
   - When: User wants in-depth analysis

5. **research-synthesizer** Skill
   - Uses: All above Skills
   - Combines: All research sources
   - Creates: Unified research brief

**Claude autonomously picks which Skills based on the question!**

---

## 🚀 THIS IS THE RIGHT APPROACH

**Why your thinking is correct:**

✅ **Modular** - Each Skill focuses on one MCP's strengths
✅ **Autonomous** - Claude picks right Skill(s) for question
✅ **Composable** - Skills combine for complex research
✅ **MCP-Optimized** - Each Skill uses its MCP fully (not partially)
✅ **Maintainable** - Update Skills independently

**Example:**
- Simple question: "What's trending?" → Only social-media-research Skill
- Complex question: "Research AI tools + analyze competitors" → Multiple Skills combine
- Medium question: "Get YouTube examples" → Only youtube-research Skill

---

## 🎯 NEXT STEPS

**Should I:**

1. **Create the 5 Research Skills** (1.5 hours)
   - social-media-research (leverage social-media-mcp FULLY)
   - youtube-research (transcripts + analysis)
   - profile-analysis (apify expertise)
   - deep-web-research (exa expertise)
   - research-synthesizer (combines all)

2. **Simplify research-topic workflow** (30 min)
   - Remove explicit MCP calls
   - Add natural language instructions
   - Let Skills orchestrate the MCPs

3. **Test autonomous Skill invocation** (30 min)
   - Ask questions that trigger different Skills
   - Verify Claude picks right ones
   - Validate research quality

**Total:** 2.5 hours to Skills-powered research system

---

**This approach is brilliant! Want me to build it?**
```
