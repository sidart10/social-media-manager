# Research Context for Skill Creation

This document guides the research phase when creating skills with the research-enhanced mode.

## Research Purpose

When creating domain-specific skills (content creation, marketing, specialized knowledge), research helps:
- **Discover proven methodologies** - Find frameworks that actually work (PAIPS, AIDA, etc.)
- **Identify best practices** - Learn from experts and high-performers
- **Gather real examples** - See how top creators apply techniques
- **Build credibility** - Skills backed by research are more trustworthy
- **Ensure quality** - Avoid generic advice, use evidence-based approaches

## Research Strategy

### Query Generation

From skill purpose, generate 2-3 targeted queries:

**Template:**
- Primary: "{domain} best practices proven methodologies"
- Secondary: "{domain} frameworks strategies expert insights"
- Tertiary: "{domain} real-world examples case studies"

**Examples:**

**Skill Purpose:** "Create Instagram captions"
**Queries:**
1. "Instagram caption best practices engagement strategies"
2. "viral Instagram caption formulas hooks"
3. "Instagram engagement optimization real examples"

**Skill Purpose:** "Analyze Twitter threads"
**Queries:**
1. "Twitter thread structure viral patterns"
2. "thread engagement tactics proven formulas"
3. "viral thread analysis case studies"

### Tool Selection

**Exa Neural Search (Primary):**
- Best for: Finding methodologies, frameworks, expert content
- Query style: Natural language, focus on concepts
- Results: 10 high-quality sources
- Cost: ~$0.05-0.15 per search
- Use: `mcp__exa__search(query, numResults=10)`

**Firecrawl Scraping (Secondary):**
- Best for: Extracting detailed content from Exa results
- Target: Top 3-5 most relevant sources
- Features: Clean markdown output, handles JavaScript sites
- Cost: ~$0.10-0.30 per page
- Use: `mcp__firecrawl__firecrawl_scrape(url, formats=["markdown"])`

**Apify (Rare - for platform data):**
- Use only if need platform-specific data (Instagram metrics, TikTok trends)
- More expensive, use sparingly
- Example: apify/instagram-scraper for profile analysis skills

## Research Execution Pattern

### Phase 1: Exa Search

```
Execute Exa search with primary query
→ Get 10 results with titles, URLs, snippets
→ Review for relevance and credibility
→ Select top 3-5 for detailed scraping
```

**What to look for:**
- Expert blogs (creators with proven track record)
- Official documentation (platform guidelines)
- Case studies (real-world application)
- Data-driven analysis (metrics, benchmarks)

**Avoid:**
- Generic listicles without depth
- Outdated content (check dates)
- Low-credibility sources (no author, suspicious domain)

### Phase 2: Firecrawl Scraping

```
For each selected source:
→ Scrape with Firecrawl
→ Extract markdown content
→ Parse for methodologies, frameworks, best practices
→ Note key examples and data points
```

**What to extract:**
- **Methodologies:** Named frameworks (AIDA, PAS, PAIPS, etc.)
- **Best practices:** Specific do's and don'ts
- **Data:** Metrics, benchmarks, optimal parameters (char counts, timing, etc.)
- **Examples:** Real samples, before/after, case studies
- **Patterns:** Recurring themes across multiple sources

### Phase 3: Synthesis

**Identify core methodologies (2-4 max):**
- What frameworks appear in multiple sources?
- Which have the strongest evidence?
- Which are most applicable to skill purpose?

**Extract best practices (5-10 items):**
- Synthesize from all sources
- Remove duplicates
- Prioritize data-backed insights
- Note source for each practice

**Collect examples (3-5):**
- Real-world applications
- Diverse scenarios
- Show methodology in action

**Build source list:**
- URL, title, author/publication
- Key insights from each
- Credibility level (high/medium)

## Synthesis Into Skill

### Methodology Documentation

**In SKILL.md:**
```markdown
## Instructions

Based on research from {{source_count}} sources:

### {{Methodology Name}} (from {{Source}})

{{Brief explanation - 1-2 paragraphs}}

**Application:**
1. {{Step 1}}
2. {{Step 2}}
3. {{Step 3}}
```

**In reference/methodology.md:**
```markdown
# {{Methodology Name}} - Deep Dive

## Overview
{{Detailed explanation}}

## Step-by-Step Application
{{Comprehensive guide}}

## Examples
{{Multiple real-world examples}}

## Source
- URL: {{url}}
- Author: {{author}}
- Credibility: High ({{reason}})
```

### Best Practices Integration

**In SKILL.md Instructions:**
```markdown
### Best Practices from Research

- {{Practice 1}} ({{source}})
- {{Practice 2}} ({{source}})
- {{Practice 3}} ({{source}})
```

**In reference/best-practices.md:**
```markdown
# Best Practices - Research Synthesis

## {{Category 1}}
- {{Practice with source}}
- {{Practice with source}}

## {{Category 2}}
- {{Practice with source}}
```

### Examples from Research

**In SKILL.md:**
```markdown
## Examples

### Example 1: {{Scenario from Research}}

Based on {{Source}} analysis:

**Input:** {{Real input}}
**Process:** {{Steps}}
**Output:** {{Real output}}
```

### Source Attribution

**Always create reference/sources.md:**

```markdown
# Research Sources

## Primary Sources

### 1. {{Title}}
- **URL:** {{url}}
- **Author:** {{author/publication}}
- **Date:** {{date}}
- **Credibility:** High ({{reason - e.g., verified expert, established publication}})
- **Key Insights:**
  - {{Insight 1}}
  - {{Insight 2}}
  - {{Insight 3}}

### 2. {{Title}}
...

## Methodology Origins

- **{{Methodology Name}}:** Discovered in {{source_number}}
- **{{Best Practice}}:** Found in {{source_number}}, {{source_number}}

## Research Metadata

- **Total sources analyzed:** {{count}}
- **Research date:** {{date}}
- **Research queries:** {{query_list}}
```

## Quality Gates

Research is ready when:
- [ ] 3+ credible sources analyzed
- [ ] 2+ distinct methodologies identified
- [ ] 5+ best practices synthesized
- [ ] 3+ real-world examples collected
- [ ] All sources cited with URLs
- [ ] Credibility levels noted

If research doesn't meet quality gates:
- Expand query scope
- Try alternative search terms
- Look for primary sources (not aggregators)
- Consider domain may not have established methodologies (default to template mode)

## Cost Estimation

**Research mode typical costs:**
- Exa search (2-3 queries × 10 results): $0.10-0.30
- Firecrawl scraping (3-5 pages): $0.30-1.50
- **Total:** $0.40-1.80 per skill

**Worth it when:**
- Skill will be used frequently
- Domain has proven methodologies
- Quality matters more than speed
- Building foundational skills for agents

**Skip when:**
- Simple utility skills
- Well-understood domains
- User provides methodologies
- Time-sensitive creation

---

**For workflow execution:** This context is loaded in Step 2 when research mode is selected.
