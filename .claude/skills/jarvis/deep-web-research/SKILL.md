---
name: deep-web-research
description: Conduct comprehensive web research using exa AI-powered search. Get articles, data points, expert quotes, case studies, company intelligence. Use when user asks for deep dive, comprehensive research, in-depth analysis, or company/competitor intelligence.
---

# Deep Web Research

## Purpose

Use exa's AI-powered research capabilities for comprehensive web intelligence gathering including insights, data, expert quotes, and company analysis.

## Instructions

When user asks for comprehensive research:

1. **For deep research:** Use exa deep_researcher_start with the topic, wait 30-60 seconds, then use deep_researcher_check to get results. **See reference/exa-tools.md for complete tool documentation.**

2. **For quick research:** Use exa web_search_exa with the topic and numResults set to 10. Faster but less comprehensive.

3. **Extract and organize:** Key insights, data points, expert quotes, and case studies from results. **See reference/research-strategies.md for extraction patterns.**

4. **Assess source quality:** Assign confidence scores (high/medium/low) based on source credibility and recency. Prefer recent sources (< 3 months).

5. **Track all sources:** Include URLs, publication dates, and relevance scores.

**If exa fails:** Log error and suggest manual research or retry later.

**For research strategy guidance and when to use which tool, see:** `reference/research-strategies.md`

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
