---
name: social-media-research
description: Research topics using social-media-mcp (Brave Search + Perplexity AI). Gets hashtags, facts, news, and trends. Use when user asks about trending topics, wants hashtags for content, needs facts about a subject, asks "what's trending" or "what's hot", or researching topics for social media.
---

# Social Media Research

## Purpose

Leverage social-media-mcp's research engine (Brave Search + Perplexity AI) to gather comprehensive social media intelligence including hashtags, facts, news, and trends.

## Instructions

When user asks to research a topic for social media:

1. **Call social-media-mcp research_topic tool** with all parameters set to true (includeHashtags, includeFacts, includeTrends, includeNews). This provides comprehensive research combining Brave Search web/news/discussions with Perplexity AI analysis.

   **For complete tool documentation and all parameters, see:** `reference/social-media-mcp-tools.md`

2. **Organize results clearly** with separate sections for hashtags, facts, news, and trends. Present findings with source attribution.

   **For formatting patterns and examples, see:** `reference/usage-examples.md`

3. **Make findings actionable** by highlighting top 3-5 hashtags, marking high-confidence facts, and noting most relevant trends.

4. **Track all sources** (Brave Search, Perplexity) and include result counts.

**If the tool fails:** Log error and fall back to exa web search. See reference/usage-examples.md Example 5 for fallback pattern.

## Reference Documentation

This Skill includes comprehensive MCP documentation:

- **`reference/social-media-mcp-tools.md`** - Complete tool reference with parameters, returns, implementation details
- **`reference/usage-examples.md`** - 5 real-world examples with actual request/response pairs
- **`reference/workflow-integration.md`** - How this Skill integrates with research-topic and generate-ideas workflows

**For complete workflow orchestration logic, see:**
`bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`

## Example

**User asks:** "Research AI automation tools"

**You invoke:** social-media-mcp research_topic with topic and all include flags true

**You get:** 5 hashtags, 10 facts, 5 news articles, 3 trends from Brave + Perplexity

**You present:** Organized findings with sources, highlighting actionable insights

**See reference/usage-examples.md Example 2 for complete request/response.**
