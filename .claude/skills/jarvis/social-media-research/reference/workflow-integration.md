# social-media-research Skill - Workflow Integration

**How this Skill integrates with Jarvis workflows**

---

## Used By Workflows

### 1. research-topic Workflow

**Location:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/`

**When Invoked:**

- User runs: `/jarvis → research-topic`
- Workflow Step 2: "Get trending topics and current facts"
- Claude sees keywords: "trending", "facts"
- Automatically invokes: social-media-research Skill

**Parameters Passed:**

- topic: From workflow parameter
- includeHashtags: true (for content use)
- includeFacts: true (for evidence)
- includeTrends: true (for "why now")
- includeNews: true (for timeliness)

**Returns To Workflow:**

- Organized research data
- Workflow continues to Step 3 (synthesis)

---

### 2. generate-ideas Workflow

**Location:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/generate-ideas/`

**When Invoked:**

- User runs: `/jarvis → generate-ideas`
- Workflow Step 1: "Gather trending signals"
- Claude sees: "trending signals"
- Invokes: social-media-research Skill

**Parameters:**

- topic: seed_topic from user
- includeHashtags: true (for Idea Cards)
- includeFacts: true (for evidence)
- includeTrends: true (for trend-driven ideas)
- includeNews: false (not needed for ideation)

**Returns:**

- Hashtags used in Idea Card metadata
- Facts used as evidence in ideas
- Trends used for "why now" context

---

## Works With Other Skills

### Combines With:

**research-synthesizer Skill:**

- social-media-research provides: trends, facts, news
- research-synthesizer organizes into categories
- Creates unified research brief

**evidence-tracker Skill:**

- social-media-research findings include sources
- evidence-tracker logs all sources
- Maintains complete citation trail

---

## Output Format

**What social-media-research returns:**

```markdown
# Social Media Research: {Topic}

## Hashtags

- #Hashtag1 (15k mentions)
- #Hashtag2 (12k mentions)
  ...

## Key Facts

- Fact 1 (Source: Perplexity)
- Fact 2 (Source: Brave Search)
  ...

## Recent News

- [Article](url) - Source, Date
  ...

## Trending

- #Trend1 (volume)
  ...

## Sources

- Brave Search: Web (10), News (5)
- Perplexity AI: Detailed
```

**This feeds into:**

- research-topic → research brief
- generate-ideas → Idea Cards
- Any workflow needing social media intelligence

---

## Integration Pattern

**Workflow says:** "Get social media trends and facts"
**Claude thinks:** "That matches social-media-research Skill"
**Skill loads:** reference/social-media-mcp-tools.md
**Skill calls:** social-media-mcp/research_topic with parameters
**Skill returns:** Organized findings
**Workflow receives:** Data to continue processing

**Key:** Workflow uses NATURAL LANGUAGE, Skill handles technical MCP invocation

---

## Error Handling in Workflows

**If Skill fails:**

**Workflow says:**

```xml
<check if="social-media-research succeeds">
  <action>Use findings</action>
</check>

<check if="social-media-research fails">
  <action>Log: social-media-mcp unavailable</action>
  <action>Fallback: Use exa for web research</action>
</check>
```

**Result:** Workflow continues with partial results (graceful degradation)

---

## Cost Tracking

**social-media-research itself: $0**

- Uses Brave API (already configured)
- Uses OpenAI/Anthropic (already configured)
- No additional costs

**Logged to:** jarvis-sidecar/memories.md

```markdown
- [Date] social-media-mcp/research_topic: $0 (Brave + OpenAI APIs)
```

---

**For tool documentation, see:** `social-media-mcp-tools.md`
**For usage examples, see:** `usage-examples.md`
**For complete workflow logic, see:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`
