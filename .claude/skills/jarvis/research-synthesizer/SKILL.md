---
name: research-synthesizer
description: Combine and organize research findings from multiple sources (social-media-research, youtube-research, deep-web-research) into comprehensive brief with 5 categories (Trends & Timing, Data & Statistics, Examples & Case Studies, Quotes & Expert Opinions, Gaps & Opportunities). Generate 10-12 content angles. Use when multiple research skills have been invoked, when user asks to "organize findings", "create research brief", "synthesize research", or at end of research-topic workflow.
allowed-tools: Read, Write, Edit
---

# Research Synthesizer Skill

## Purpose

Aggregate findings from all research Skills into unified, actionable research brief with content angle generation.

## When to Use This Skill

Invoke when:

- Multiple research Skills have executed
- Findings scattered across sources
- User asks to "synthesize", "organize", "create brief"
- End of research-topic workflow
- Need to generate content angles from research

## Instructions

### Step 1: Gather All Findings

**Sources to check:**

- social-media-research output (if invoked)
- youtube-research output (if invoked)
- deep-web-research output (if invoked)
- profile-analysis output (if invoked)

### Step 2: Organize into 5 Categories

**Category 1: Trends & Timing**

- What's happening NOW with this topic
- Why it's relevant/trending
- Social media trends (from social-media-research)
- Future predictions (from deep-web-research)
- Source all claims

**Category 2: Data & Statistics**

- Hard numbers, percentages, metrics
- Growth rates, market size
- Survey results
- Facts from social-media-research
- Data from deep-web-research
- Source all stats

**Category 3: Examples & Case Studies**

- Real-world applications
- YouTube examples (from youtube-research)
- Company cases (from deep-web-research)
- Success stories
- How others use/discuss topic
- Include timestamps for videos

**Category 4: Quotes & Expert Opinions**

- YouTube quotes (with timestamps)
- Expert perspectives (from deep-web-research)
- Contrarian views
- Attributed quotes only

**Category 5: Gaps & Opportunities**

- What's NOT being discussed
- Overlooked angles (compare sources)
- Underserved audiences
- Content opportunities

### Step 3: Create Executive Summary

**Synthesize top insights:**

- 3-5 key takeaways
- Most important finding from each category
- Overall confidence assessment

### Step 4: Generate Content Angles

**Based on all research, brainstorm 10-12 ways to approach topic:**

**Angle Types:**

1. Tutorial: "How to [topic]"
2. Beginner: "[Topic] explained"
3. Advanced: "Deep dive: [subtopic]"
4. Teardown: "Breaking down [example]"
5. Comparison: "[A] vs [B]"
6. Data: "X stats about [topic]"
7. Opinion: "Why [hot take]"
8. Controversy: "The [topic] debate"
9. Prediction: "Future of [topic]"
10. Story: "When I [experience]"
11. Mistakes: "X mistakes with [topic]"
12. Trend: "Why everyone's talking about [topic]"

**For each angle:**

- Title (specific, compelling)
- Description (1-2 sentences)
- Best platform(s)
- Target audience level
- Supporting research (which findings back this)
- Confidence score

### Step 5: Create Research Brief

**Use template:** jarvis-sidecar/workflows/research-topic/templates/research-brief.md

**Fill with:**

- Topic, depth, source count
- All 5 categories (fully populated)
- 10-12 content angles
- Complete evidence log
- Overall confidence score

**Save to:** jarvis-sidecar/sessions/research-{topic}-{date}.md

### Step 6: Present Summary

**Display:**

```
✅ Research Complete: {Topic}

**Sources:**
- Trends: {trend_count} (social-media-mcp)
- Web: {web_count} (exa)
- YouTube: {video_count} (youtube-transcript)
- Profiles: {profile_count} (apify)

**Findings:**
- Trends & Timing: {count}
- Data & Statistics: {count}
- Examples: {count}
- Quotes: {count}
- Gaps: {count}

**Content Angles:** {angle_count}

📄 Research Brief: {file_path}

**Top 3 Insights:**
1. {insight_1}
2. {insight_2}
3. {insight_3}

**Suggested Next Steps:**
- Pick content angle(s)
- Use /generate-ideas to develop into Idea Cards
- Use /write-posts or /write-scripts to create content
```

## Example

**Input:** Findings from:

- social-media-research: 5 hashtags, 10 facts, 5 news
- youtube-research: 5 video analyses with quotes
- deep-web-research: 15 insights, 10 data points

**Output:**

- Organized into 5 categories
- 35 findings total, all cited
- 12 content angles generated
- Saved research brief
- Summary presented

## Quality Standards

- All 5 categories must be populated
- Every finding MUST have source
- Video findings MUST have timestamps
- Content angles MUST reference supporting research
- Confidence scores justified by sample size
- Executive summary concise (3-5 points)
