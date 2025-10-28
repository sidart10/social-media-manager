---
name: evidence-tracker
description: Track all research sources, citations, URLs, timestamps, and confidence scores. Maintain evidence log throughout research and content generation. Use whenever research includes data, quotes, statistics, or video references that need citation.
allowed-tools: Read, Write
---

# Evidence Tracker Skill

## Purpose

Maintain comprehensive log of all research sources, citations, and evidence used in content creation to ensure credibility and traceability.

## When to Use This Skill

Invoke when:

- Research skills have gathered data
- Content generation uses facts, stats, or quotes
- User asks to "cite sources" or "track evidence"
- Quality assurance requires source verification
- Throughout research and content workflows

## Instructions

### Step 1: Initialize Evidence Log

**Create evidence tracking structure:**

```markdown
# Evidence Log

**Session:** {workflow_name}
**Topic:** {topic}
**Started:** {date_time}

---

## Sources by Type

### Web Sources (Exa)

- Total: {count}
- Depth: {comprehensive|standard|quick}

### Social Media Research (social-media-mcp)

- Total: {count}
- Platforms: {platforms}

### YouTube Videos (youtube-transcript)

- Total: {count}
- Total duration: {minutes}

### Profiles Analyzed (Apify)

- Total: {count}
- Platforms: {platforms}
- Cost: ${total}

---

## Evidence Items

{Items below}

---

## Confidence Assessment

**Overall Confidence:** {score}/10
**Based on:** {sample_size} sources, {recency} data, {authority} sources
```

### Step 2: Track Each Evidence Item

**For each fact, statistic, quote, or claim:**

**Evidence Entry Format:**

```markdown
### Evidence #{id}: {short_description}

**Claim/Finding:**
"{exact_text_or_data}"

**Source:**

- Type: {web|social|video|profile|news}
- Title: {source_title}
- URL: {url}
- Author/Channel: {if_available}
- Date: {publication_date}
- Timestamp: {if_video} (e.g., 2:34)

**Confidence:**

- Score: {high|medium|low}
- Based on:
  - Authority: {credible_source?}
  - Recency: {how_recent?}
  - Corroboration: {confirmed_elsewhere?}

**Used in:**

- Workflow: {workflow_name}
- Output: {content_item}
- Section: {where_used}

**Retrieved:** {date_time}

---
```

### Step 3: Categorize Evidence

**Organize by type:**

**A. Data & Statistics**

- Numerical claims
- Percentages
- Growth rates
- Market size
- Survey results

**B. Expert Quotes**

- Direct attributions
- Expert opinions
- Industry insights
- Contrarian views

**C. YouTube Evidence**

- Video quotes with timestamps
- Hook examples
- Structure patterns
- Teaching approaches

**D. Profile Evidence**

- Engagement metrics
- Top performing posts
- Content patterns
- Platform-specific data

**E. Trend Evidence**

- Trending topics
- Hashtag volumes
- News articles
- Social momentum

### Step 4: Assess Confidence

**For each evidence item, evaluate:**

**Authority (40%):**

- Tier 1: Major publications, academic, government (High)
- Tier 2: Industry blogs, verified creators (Medium)
- Tier 3: Unknown sources, unverified (Low)

**Recency (30%):**

- Last 30 days: High
- Last 3 months: Medium
- Last 6 months: Medium-Low
- Over 6 months: Low

**Corroboration (30%):**

- 3+ sources: High
- 2 sources: Medium
- 1 source: Low

**Final Confidence Score:**

- High: 8-10/10
- Medium: 5-7/10
- Low: 1-4/10

### Step 5: Link Evidence to Content

**When evidence is used in content:**

**Update evidence entry:**

- Add "Used in:" section
- Note which content item
- Track which specific claim

**In generated content:**

- Add footnote or inline citation
- Format: [Source: {title}]({url})
- For videos: [Source: {title}]({url}) at {timestamp}

### Step 6: Create Evidence Summary

**At end of workflow:**

```markdown
## Evidence Summary

**Total Evidence Items:** {count}

**By Type:**

- Data & Statistics: {count}
- Expert Quotes: {count}
- YouTube Evidence: {count}
- Profile Evidence: {count}
- Trend Evidence: {count}

**Confidence Distribution:**

- High (8-10): {count} items
- Medium (5-7): {count} items
- Low (1-4): {count} items

**Source Breakdown:**

- Exa web search: {count}
- social-media-mcp: {count}
- YouTube: {count} videos
- Apify profiles: {count}

**Recency:**

- Last 30 days: {count}
- Last 3 months: {count}
- Older: {count}

**Overall Quality Score:** {score}/10
```

### Step 7: Save Evidence Log

**Save to:** jarvis-sidecar/sessions/{workflow}-{topic}-evidence-{date}.md

**Also update:** Research brief or content output with evidence links

## Example

**Evidence Entry:**

```markdown
### Evidence #1: AI automation market growth

**Claim/Finding:**
"AI automation market growing 28% YoY"

**Source:**

- Type: web
- Title: "State of AI Automation 2025"
- URL: https://techcrunch.com/ai-automation-2025
- Author: TechCrunch Research
- Date: 2025-10-15

**Confidence:**

- Score: High (9/10)
- Based on:
  - Authority: Tier 1 publication (TechCrunch)
  - Recency: 12 days old
  - Corroboration: Confirmed in 2 other sources

**Used in:**

- Workflow: research-topic
- Output: Research Brief "AI Tools"
- Section: Data & Statistics

**Retrieved:** 2025-10-26 14:30:00

---
```

## Quality Standards

- Every data point must have source
- All quotes must have attribution
- Video evidence must include timestamps
- Confidence scores must be justified
- URLs must be captured (not just titles)
- Publication dates required
- Used-in tracking mandatory

## Integration Notes

**Works with:**

- social-media-research (tracks facts, news, trends)
- youtube-research (tracks quotes with timestamps)
- deep-web-research (tracks insights, data, quotes)
- profile-analysis (tracks engagement metrics)
- research-synthesizer (consolidates all evidence)
- Content generation workflows (citations)

**Provides:**

- Credibility for generated content
- Source verification
- Traceability for claims
- Quality assurance

## Edge Cases

**Source URL not available:**

- Use source title + platform
- Note: "URL unavailable"
- Include retrieval date

**Conflicting evidence:**

- Track both items
- Note conflict in confidence
- Research further or note limitation

**Evidence not used in final content:**

- Keep in log (might be useful later)
- Mark as "Not used" in tracking
- Maintain for reference
