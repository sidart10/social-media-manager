---
name: deep-web-research
description: Intelligent multi-tool research orchestrator. Uses Exa neural search, Apify scraping, Archon knowledge base, WebSearch, and WebFetch automatically based on research depth. Get articles, data, expert quotes, case studies, company intelligence. Handles tool routing internally - just specify topic and depth.
---

# Deep Web Research - Intelligent Research Orchestrator

## Purpose

Automatically selects and orchestrates the best research tools for your task. You specify WHAT to research, the skill determines HOW to research it.

## Available Research Tools (Auto-Selected)

**Tier 1: AI-Powered Neural Search**

- `mcp__exa__search` - Semantic web search with live crawl
- `deep_researcher_start/check` - Multi-step research agent (if enabled)

**Tier 2: Comprehensive Scraping**

- `apify/website-content-crawler` - Deep site content extraction
- `apify/rag-web-browser` - AI-powered browsing + Google search

**Tier 3: Knowledge Base**

- `mcp__archon__rag_search_knowledge_base` - Search existing knowledge
- `mcp__archon__rag_search_code_examples` - Find code patterns

**Tier 4: Standard Search**

- `WebSearch` - Google search (fast, free)
- `WebFetch` - Detailed page analysis

**The skill intelligently routes based on**:

- Research depth (quick | standard | comprehensive | exhaustive)
- Topic type (general | technical | company | trend)
- Cost optimization (free tools first, paid when needed)
- Tool availability (adapts if tools unavailable)

## Instructions

When user requests research, the skill automatically:

### 1. Determine Research Strategy

**Quick** (free, 5-10 seconds):

- Use: WebSearch → WebFetch
- Cost: $0
- Best for: Recent news, quick facts, basic overview

**Standard** (low cost, 10-20 seconds):

- Use: mcp**exa**search (numResults=10, livecrawl="fallback")
- Cost: ~$0.05
- Best for: Article discovery, trend analysis, standard topics

**Comprehensive** (moderate cost, 20-40 seconds):

- Use: mcp**exa**search (numResults=15, livecrawl="always")
- Plus: WebFetch on top sources for depth
- Cost: ~$0.10-0.15
- Best for: Deep dives, market analysis, detailed research

**Exhaustive** (higher cost, 60-120 seconds):

- Use: deep_researcher_start/check (if available)
- OR: Apify website-content-crawler + rag-web-browser
- Plus: Archon RAG for existing knowledge
- Plus: WebFetch for specific analysis
- Cost: ~$0.20-0.50
- Best for: Comprehensive reports, competitive intelligence, multi-source synthesis

### 2. Execute Research

**Automatically orchestrates tools in parallel when possible**:

- Run multiple searches simultaneously
- Fetch top sources concurrently
- Check knowledge base in parallel
- Optimize for speed and cost

### 3. Synthesize Results

**Extract and organize**:

- Key insights (main findings)
- Data & statistics (numbers with sources)
- Expert quotes (attributed with URLs)
- Case studies (real examples)
- Source quality scores (high/medium/low)

### 4. Quality Assessment

**Auto-score sources**:

- High: .edu, major publications, official docs, recent (<3 months)
- Medium: Tech blogs, Medium (verified), 3-6 months old
- Low: Personal blogs, no attribution, old (>6 months)

### 5. Track Everything

**Metadata included**:

- All source URLs
- Publication dates
- Relevance scores
- Tool costs
- Processing time

## Tool Routing Logic (Internal - Auto-Executed)

```
IF depth == 'quick':
  → WebSearch + WebFetch (free, fast)

IF depth == 'standard':
  → mcp__exa__search (numResults=10, livecrawl="fallback")

IF depth == 'comprehensive':
  → mcp__exa__search (numResults=15, livecrawl="always")
  → WebFetch top 3 sources
  → Archon RAG (check existing knowledge)

IF depth == 'exhaustive':
  TRY:
    → deep_researcher_start (if available after restart)
    → Wait 30-60s
    → deep_researcher_check
  FALLBACK:
    → Apify website-content-crawler (comprehensive scraping)
    → Apify rag-web-browser (AI browsing)
    → mcp__exa__search (neural search)
    → Archon RAG (knowledge base)
  SYNTHESIZE all results
```

**The skill handles fallbacks automatically** - if a tool isn't available, uses next best option.

## Usage

**From workflows** - just invoke the skill:

```xml
<action>Use deep-web-research skill:
  - Topic: {topic}
  - Depth: comprehensive
  - Focus: trends, data, quotes, examples
</action>
```

**Direct invocation**:

```
Use deep-web-research skill for comprehensive research on "AI infrastructure market 2025"
```

**The skill figures out**:

- Which tools to use
- What order to call them
- How to synthesize results
- Cost optimization

## No Manual Tool Selection Needed

**Before** (manual):

```
Use exa deep_researcher_start
Wait 30 seconds
Use deep_researcher_check with researchId
```

**After** (automatic):

```
Use deep-web-research skill with depth=comprehensive
```

The skill handles all the complexity internally.

## Tool Availability Awareness

**The skill adapts**:

- If deep_researcher available → uses it for exhaustive research
- If not available → uses Apify + exa + WebFetch
- If Apify quota exceeded → falls back to exa + WebSearch
- Always provides results using available tools

**No errors, just intelligent degradation.**

## Reference Documentation

This Skill includes comprehensive exa documentation:

- **`reference/exa-tools.md`** - Complete tool reference (web_search_exa, deep_researcher_start/check, company_research)
- **`reference/research-strategies.md`** - When to use quick vs deep, source quality assessment, data extraction patterns
- **`reference/workflow-integration.md`** - Integration with research-topic and generate-ideas workflows

**For complete workflow orchestration, see:**
`bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`

## Example

**User asks:** "Deep dive into AI infrastructure market"

**You:** Use deep_researcher_start → Wait 45s → Check results → Extract insights, data, quotes → Organize by category → Cite all sources

**See reference/exa-tools.md for complete example with actual response data.**

---

## Research Findings

**Research Topic:** OSINT and AI research agent methodologies 2025
**Date:** 2025-10-29

### Key Insights

- **OSINT is not passive collection** - It's a structured, multi-layered methodology for turning overwhelming noise into verifiable, actionable intelligence (Source: Social Links Blog)
- **AI research agents need simple, composable patterns** - Most successful implementations avoid complex frameworks and use simple patterns instead (Source: Anthropic Research)
- **Multi-source synthesis is critical** - Process months of research in minutes by scanning thousands of sources simultaneously (Source: Wald.ai)
- **Cross-platform correlation** - Link identities and find hidden connections across multiple sources for comprehensive intelligence (Source: McAfee Institute)

### Methodologies Discovered

**1. OSINT Framework (Systematic Intelligence Collection)**
Source: https://www.neotas.com/what-is-the-osint-framework/

**Core Process:**

1. **Identify** - Define intelligence objectives
2. **Collect** - Gather from surface web, deep web, dark web sources
3. **Process** - Filter and analyze data
4. **Analyze** - Extract patterns, trends, relationships
5. **Disseminate** - Present actionable intelligence

**Applications:**

- Cybersecurity threat intelligence
- Corporate due diligence
- Competitive intelligence
- Investigative journalism

**2. Cross-Platform Correlation (Identity Linking)**
Source: https://blog.mcafeeinstitute.com/5-incredible-osint-techniques-to-supercharge-your-investigations-in-2025/

**Technique:**

- Start with known username or email
- Scan for variations across platforms (Twitter, LinkedIn, Instagram)
- Match subtle clues and behavioral patterns
- Reveal hidden connections surface searches miss

**Value:** Stitches fragmented online personas into complete intelligence picture

**3. AI Research Agent Architecture (Anthropic Pattern)**
Source: https://www.anthropic.com/research/building-effective-agents

**Distinction:**

- **Workflows**: LLMs orchestrated through predefined code paths
- **Agents**: LLMs dynamically direct their own processes and tool usage

**Best Practices:**

- Use simplest solution possible
- Only increase complexity when needed
- Workflows for predictability, agents for flexibility
- Simple, composable patterns > complex frameworks

**4. Multi-Agent Research Team (Delegation Pattern)**
Source: https://www.agentx.so/mcp/blog/how-to-build-an-ai-agent-research-team-from-concept-to-automation

**Agent Types:**

- **Retrieval agent** - Gathers relevant literature
- **Analysis agent** - Applies structured reasoning
- **Summary agent** - Crafts human-readable insights
- **Delegator agent** - Routes tasks based on context

**Benefits:** Scalable, parallelized reasoning with improved accuracy

### Sources

- [The OSINT Handbook: A practical guide](https://sciendo.com/chapter/9781837635283/10.0000/9781837635283-001) - high relevance
- [5 Incredible OSINT Techniques 2025](https://blog.mcafeeinstitute.com/5-incredible-osint-techniques-to-supercharge-your-investigations-in-2025/) - high relevance
- [OSINT: Deep/Dark Web Intelligence Collection](https://www.specialeurasia.com/2025/04/08/osint-deep-dark-web/) - high relevance
- [OSINT Framework Guide](https://www.neotas.com/what-is-the-osint-framework/) - high relevance
- [Building AI Agents That Work](https://www.ayadata.ai/building-ai-agents-that-work-challenges-and-best-practices/) - high relevance
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) - high relevance
- [AI Research Agent Architecture](https://www.agentx.so/mcp/blog/how-to-build-an-ai-agent-research-team-from-concept-to-automation) - high relevance
- [AI Research Strategies Guide](https://www.qualtrics.com/experience-management/research/ai-research-strategies/) - high relevance

---
