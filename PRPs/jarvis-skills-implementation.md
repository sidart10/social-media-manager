# PRP: Jarvis - Claude Code Skills Implementation

**Feature:** Implement Claude Code Skills to replace fictional MCP dependencies and optimize MCP usage
**Created:** 2025-10-26
**Estimated Time:** 5-6 hours
**Confidence Score:** 9/10

---

## 🎯 Context & Problem Statement

### Current State

**Jarvis Agent:**

- ✅ Complete agent built (jarvis.agent.yaml → jarvis.md compiled)
- ✅ 7 workflows created (research-topic, analyze-profile, learn-voice, generate-ideas, competitive-analysis, write-posts, write-scripts)
- ✅ ~4,660 lines of workflow logic
- ✅ Voice-awareness system designed
- ✅ Cost tracking implemented
- ✅ Slash command active: `/jarvis`

**MCP Servers Working:**

- ✅ apify (HTTP) - Instagram, TikTok, Twitter, LinkedIn, YouTube scrapers
- ✅ social-media-mcp (stdio) - Brave Search, Perplexity, trending topics, research
- ✅ exa (stdio) - Deep web research, company intel
- ✅ youtube-transcript (stdio) - Video transcripts with timestamps

**Critical Problems:**

1. ❌ **Workflows reference fictional `script_generation_mcp`** (doesn't exist!)
   - Blocks: research-topic, generate-ideas, write-posts, write-scripts
   - References: add_note, summarize_notes, script_generate tools
   - Impact: 4/7 workflows (57%) non-functional

2. ❌ **Not using social-media-mcp fully**
   - Has: Brave + Perplexity research engine
   - Has: Hashtag extraction, fact extraction, news, trends
   - Current workflows: Only calling research_topic partially
   - Missing: `includeHashtags`, `includeFacts`, `includeNews` parameters

3. ❌ **Rigid workflow structure**
   - 300-600 lines of explicit MCP calls per workflow
   - Hard-coded logic (can't adapt to question type)
   - Difficult to maintain
   - Not composable

### The Solution: Claude Code Skills

**What are Skills:**

- Self-contained capabilities in `~/.claude/skills/` folders
- Each Skill = One `SKILL.md` file with YAML frontmatter + instructions
- **Autonomous invocation** - Claude automatically uses them based on description matching
- Token-efficient (only loaded when relevant)
- Composable (multiple Skills can work together)

**Why Skills solve our problems:**

1. ✅ Replace fictional script_generation_mcp with real native capabilities
2. ✅ Each Skill optimizes its MCP (uses full feature set)
3. ✅ Claude picks which Skills based on question (adaptive)
4. ✅ Workflows become simple orchestration (~80% code reduction)
5. ✅ Maintainable (update Skill without touching workflows)
6. ✅ Reusable (Skills work across multiple workflows)

---

## 📚 Technical Research

### Claude Code Skills Documentation

**Official Docs:** https://docs.claude.com/en/docs/claude-code/skills
**Best Practices:** https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
**Examples:** https://github.com/anthropics/skills

**Key Concepts:**

**1. Autonomous Invocation:**

- Claude reads all Skill descriptions
- Matches description to user request
- Loads relevant Skills automatically
- No explicit `/skill-name` calls needed

**2. File Structure (Minimal):**

```
~/.claude/skills/skill-name/
└── SKILL.md  (only file required!)
```

**3. SKILL.md Format:**

```yaml
---
name: "skill-name"  # lowercase, hyphens only, max 64 chars
description: "What it does and when to use it (max 1024 chars). Include trigger keywords."
allowed-tools: Read, Write, Grep, Bash  # Optional: restrict tools
---

# Skill Name

## Instructions
Step-by-step guidance for Claude

## Examples
Concrete usage examples

## When to Use
Specific trigger conditions
```

**4. Description Best Practices:**

- Include BOTH what it does AND when to use it
- Third person (not "Use this when you...")
- Include specific trigger keywords
- Be concrete, not vague
- Example: "Extract hashtags from social media research using Brave Search. Use when researching topics for social content, when user asks about trending hashtags, or mentions social media trends."

**5. Progressive Disclosure:**

- Keep SKILL.md lean (core instructions only)
- Move detailed logic to resources/ files if needed
- Reference resources: "See resources/examples.md for..."

**6. Tool Restrictions:**

- `allowed-tools`: Limits what Claude can use
- Prevents permission prompts
- Reduces token usage
- Example: `allowed-tools: Read, Write` (can't use Bash)

---

## 🏗️ Proposed Skills Architecture

### Skills to Create (8 Total)

#### Research Skills (5) - MCP Expertise

1. **social-media-research** - social-media-mcp expert
2. **youtube-research** - youtube-transcript + apify YouTube expert
3. **profile-analysis** - apify multi-platform expert
4. **deep-web-research** - exa expert
5. **research-synthesizer** - Combines all research

#### Processing Skills (3) - Internal Logic

6. **voice-matcher** - Voice profile application
7. **platform-formatter** - Platform-specific formatting
8. **evidence-tracker** - Source citation tracking

---

## 💻 Complete Implementation Blueprint

### Skill 1: social-media-research

**Purpose:** Expert at using social-media-mcp's complete research engine (Brave + Perplexity)

**File:** `~/.claude/skills/jarvis/social-media-research/SKILL.md`

````yaml
---
name: social-media-research
description: Research topics using social-media-mcp's comprehensive engine (Brave Search + Perplexity AI). Automatically extracts hashtags, key facts with data, recent news articles, and trending information. Use when researching topics for social media content, when user asks about trending topics, current hashtags, facts about a subject, or mentions social media research. Also use when user wants to know "what's trending", "what's hot", or needs hashtags for content.
allowed-tools: Read, Write, Edit, Grep
---

# Social Media Research Skill

## Purpose
Leverage social-media-mcp's complete research capabilities to gather hashtags, facts, news, and trends using Brave Search and Perplexity AI.

## MCP Used
- **social-media-mcp**
  - Tool: `research_topic`
  - Tool: `get_trending_topics`

## When to Use This Skill

Invoke when:
- User asks to research a topic for social media
- User wants trending topics or trending hashtags
- User needs facts, data, or statistics about a subject
- User asks "what's hot", "what's trending"
- User needs hashtags for content
- Part of research-topic, generate-ideas workflows

## Instructions

### Step 1: Call research_topic with ALL parameters

**Tool:** social-media-mcp/research_topic

**Parameters:**
```javascript
{
  topic: "{user's topic}",
  includeHashtags: true,    // Get 5 relevant hashtags
  includeFacts: true,       // Get 10 key facts/stats
  includeTrends: true,      // Get trending data
  includeNews: true         // Get 5 recent news articles
}
````

**This ONE call uses:**

- Brave Search (web results, news, discussions)
- Perplexity AI (deep research, fact extraction)
- Hashtag extraction algorithm
- Keyword frequency analysis

### Step 2: Organize Results

**Create structured output:**

```markdown
# Social Media Research: {Topic}

**Researched:** {date}
**Sources:** Brave Search, Perplexity AI

---

## Hashtags (Ready to Use)

{#hashtags}

- {hashtag} ({volume} mentions)
  {/hashtags}

**Recommendation:** Use top 3-5 hashtags for maximum reach

---

## Key Facts & Data Points

{#facts}

- {fact_text}
  - Source: {inferred from Brave/Perplexity}
  - Confidence: {high|medium|low}
    {/facts}

---

## Latest News (Last Month)

{#news}

- [{title}]({url}) - {source}, {date}
  - {summary}
    {/news}

---

## Trending Now

{#trends}

- {trend_name} - {volume} mentions - Category: {category}
  {/trends}

---

## Sources Used

- Brave Search: Web ({web_count}), News ({news_count}), Discussions ({discussion_count})
- Perplexity AI: Depth level ({depth})
```

### Step 3: Extract for Downstream Use

**Provide easy access to:**

- `hashtags[]` - For Idea Cards, posts
- `facts[]` - For evidence injection
- `news[]` - For timeliness context
- `trends[]` - For "why now" reasoning

### Step 4: Track Evidence

For each fact, news item, or trend:

- Record source (Brave Search or Perplexity)
- Add URL if available
- Note confidence level
- Timestamp retrieval

## Example

**Input:** Research "AI automation tools"

**Output:**

- Hashtags: #AIAutomation, #ProductivityTools, #NoCode, #WorkflowOptimization, #AITools
- Facts:
  - "73% of developers automate less than 20% of workflows" (Confidence: Medium)
  - "AI automation market growing 28% YoY" (Confidence: High)
- News: 5 recent articles from TechCrunch, VentureBeat, etc.
- Trends: #AITrends (15k), #AutomationNews (12k)

## Error Handling

If social-media-mcp unavailable:

- Log warning
- Suggest: "MCP server down, try again or use alternative research methods"
- Return partial results if any data already gathered

## Quality Standards

- Minimum 5 hashtags returned
- Minimum 5 facts extracted
- All news articles from last 30 days
- All sources trackable
- Confidence scores justified

````

---

### Skill 2: youtube-research

**File:** `~/.claude/skills/jarvis/youtube-research/SKILL.md`

```yaml
---
name: youtube-research
description: Analyze YouTube videos by extracting transcripts with timestamps, identifying how topics are explained, finding structure patterns (hook, intro, points, CTA), and extracting memorable quotes. Use when user provides YouTube URLs, asks about video content, wants to know "how YouTubers explain X", needs video examples, or mentions YouTube transcripts or video analysis.
allowed-tools: Read, Write, Grep
---

# YouTube Research Skill

## Purpose
Extract and analyze YouTube video content using transcripts to understand how topics are explained, find structure patterns, and gather quotes with timestamps.

## MCPs Used
- **youtube-transcript**
  - Tool: `get_transcript(url, lang)`
- **apify** (optional)
  - Tool: YouTube channel scrapers

## When to Use This Skill

Invoke when:
- User provides YouTube URL(s)
- User asks "how do YouTubers explain {topic}"
- User wants video examples or transcripts
- User mentions "analyze this video"
- Part of research workflows needing real-world examples

## Instructions

### Step 1: Get Video URLs

**If user provided URLs:**
- Use provided URLs directly

**If user asked about topic (e.g., "find YouTube examples of AI tools"):**
- Manual search: "{topic} tutorial" OR "{topic} explained"
- Sort by: views + relevance
- Select: Top 5 videos
- Note: This step may require user to paste URLs (no YouTube search MCP currently)

### Step 2: Extract Transcripts

For each video (max 5):

**Tool:** youtube-transcript/get_transcript

**Parameters:**
```javascript
{
  url: "{youtube_url}",
  lang: "en"
}
````

**Returns:** Full transcript with timestamps

### Step 3: Analyze Each Transcript

**Extract:**

**A. Hook Analysis (First 10 seconds / ~30-50 words)**

- How they grab attention
- Hook type: question, number, story, statement
- Opening words/phrase

**B. Structure Patterns**

- Identify sections: Intro → Points → Conclusion
- Transition markers: "First...", "Next...", "Finally..."
- Time allocation (how long per section)
- CTA placement and wording

**C. Quotes & Sound Bites**

- Memorable phrases
- Data/stats mentioned
- Expert attributions
- Analogies or explanations

**D. How They Explain the Topic**

- Complexity level (beginner/intermediate/advanced)
- Teaching approach (demo, theory, storytelling)
- Examples used
- Visual aids mentioned

### Step 4: Create Structured Output

```markdown
# YouTube Research: {Topic}

**Videos Analyzed:** {count}
**Total Watch Time:** {duration}

---

## Video 1: {Title}

**URL:** [{title}]({url})
**Channel:** {channel}
**Views:** {views}
**Duration:** {duration}

### Hook (0:00-0:10)

"{hook_text}"

- Type: {hook_type}
- Effectiveness: {compelling|moderate|weak}

### Structure

- Intro: 0:00-{time} - {what_they_cover}
- Point 1: {time}-{time} - {topic}
- Point 2: {time}-{time} - {topic}
- CTA: {time}-{end} - {cta_text}

### Key Quotes

- "{quote}" ({timestamp}) - {context}
- "{quote}" ({timestamp}) - {context}

### How They Explain {Topic}

- Approach: {demo|theory|story|tutorial}
- Complexity: {level}
- Examples: {examples_used}

---

[Repeat for each video]

---

## Patterns Across Videos

### Common Hooks

1. {hook_pattern_1} (used in {count} videos)
2. {hook_pattern_2}

### Common Structures

- {structure_pattern}: {percentage}%

### Best Quotes for Evidence

{#quotes}

- "{quote}" - {source_video} ({timestamp})
  {/quotes}

## Sources

{#videos}

- [{title}]({url}) - {channel}
  {/videos}
```

### Step 5: Make Actionable

**Provide:**

- Hook templates from analyzed videos
- Structure patterns that work
- Quotes for evidence injection (with timestamps!)
- Teaching approaches that resonate

## Example

**Input:** "How do YouTubers explain AI automation?"

**Output:**

- Analyzed 5 videos
- Found: Question hooks work best (4/5 videos)
- Common structure: Problem (1 min) → Demo (5 min) → Results (2 min)
- Best quote: "Start with one repetitive task..." (@channel 2:34)
- Approach: Demo-heavy (showing actual tools)

## Error Handling

**If youtube-transcript unavailable:**

- Log error
- Suggest: Check MCP connection
- Return: Empty results with explanation

**If no videos found:**

- Ask user to provide YouTube URLs
- Or skip this research component

## Quality Standards

- Extract timestamps for ALL quotes
- Identify structure for ALL videos
- Categorize hooks consistently
- Provide actionable patterns (not just summaries)

````

---

### Skill 3: profile-analysis

**File:** `~/.claude/skills/jarvis/profile-analysis/SKILL.md`

```yaml
---
name: profile-analysis
description: Analyze social media profiles on ANY platform (Instagram, TikTok, Twitter/X, LinkedIn, YouTube) using Apify scrapers. Extract posts, engagement metrics, content patterns (hooks, topics, formats, timing), and top performers. Use when user provides profile URLs (instagram.com, tiktok.com, twitter.com, linkedin.com, youtube.com) or asks to analyze account, profile, or channel. Handles cost estimation, user approval, and cost logging automatically.
allowed-tools: Read, Write, Edit, Grep
---

# Profile Analysis Skill

## Purpose
Analyze social media profiles across all major platforms using Apify's scraper ecosystem to extract patterns, top content, and actionable insights.

## MCP Used
- **apify**
  - Tools: search-actors, fetch-actor-details, call-actor, get-actor-output
  - Actors: Instagram, TikTok, Twitter, LinkedIn, YouTube scrapers

## When to Use This Skill

Invoke when:
- User provides social media profile URL
- User asks to "analyze profile", "analyze account", "check out @username"
- User mentions specific platforms: "analyze their Instagram", "check their TikTok"
- Part of analyze-profile, learn-voice, competitive-analysis workflows

## Instructions

### Step 1: Detect Platform from URL

**URL Patterns:**
- `instagram.com/username` → Instagram
- `tiktok.com/@username` → TikTok
- `twitter.com/username` OR `x.com/username` → Twitter
- `linkedin.com/in/username` → LinkedIn
- `youtube.com/@channel` OR `/channel/ID` → YouTube

Extract: {platform}, {username/handle}

### Step 2: Select Appropriate Apify Actor

**Platform-to-Actor Mapping:**

| Platform | Recommended Actor | Cost per 1k |
|----------|-------------------|-------------|
| Instagram | `apify/instagram-scraper` | $0.50 |
| TikTok | `clockworks/tiktok-scraper` | ~$0.50 per profile |
| Twitter | `apidojo/twitter-scraper-lite` | $0.40 |
| LinkedIn | `dev_fusion/Linkedin-Profile-Scraper` | $0.30 |
| YouTube | `streamers/youtube-scraper` | $0.40 |

**Apify MCP Flow:**

1. **Search for actor:**
````

Tool: apify/search-actors
Query: "{platform} profile scraper"

```

2. **Get actor details:**
```

Tool: apify/fetch-actor-details
ActorId: "{selected_actor}"
Returns: Required inputs, pricing

```

### Step 3: Estimate Cost & Get Approval

**Calculate cost:**
```

Posts to analyze: {max_posts} (based on analysis_depth: quick=20, standard=50, deep=100)
Cost per 1k: ${platform_cost}
Estimated cost: ${max_posts} \* ${cost_per_1k} / 1000 = ${estimated}

```

**Present to user:**
```

{Platform} Analysis Cost Breakdown:

- Actor: {actor_name}
- Posts to analyze: {max_posts}
- Estimated cost: ~${estimated}

Current budget:

- This month: ${month_total}/$10.00
- After this: ${projected_total}

Proceed? [yes/no]

````

**If user declines:**
- Return: "Analysis cancelled by user"
- Log: Cost declined
- Exit gracefully

### Step 4: Execute Actor (If Approved)

**Tool:** apify/call-actor

**Parameters:**
```javascript
{
  actorId: "{selected_actor}",
  input: {
    username: "{handle}",  // or profileUrl, channelId depending on actor
    maxPosts: {max_posts},  // or resultsLimit, maxVideos
    // Other actor-specific params
  }
}
````

**Store:** run_id, dataset_id

**Display:** "{Platform} scraper running... (usually 20-60s)"

### Step 5: Retrieve Results

**Tool:** apify/get-actor-output

**Parameters:**

```javascript
{
  datasetId: '{dataset_id}';
}
```

**Returns:** Array of posts/videos with:

- Content (text, caption, title)
- Metrics (likes, comments, shares, views)
- Timestamps
- Media info
- Profile data

### Step 6: Analyze Patterns

**A. Top Performers**

- Sort by engagement rate (normalize by follower count if available)
- Top 10 posts
- Extract metrics for each

**B. Hook Patterns**

- Categorize opening lines:
  - Question: Starts with Why/How/What
  - Number: Starts with digit or "X ways"
  - Story: Starts with "I", "When I"
  - Statement: Bold declaration
- Calculate distribution (%)
- Extract 2-3 examples per type

**C. Topic Clustering**

- Extract main topics/themes
- Group by similarity
- Identify top 5-8 topic clusters
- Note which topics drive engagement

**D. Format Distribution**

- Categorize: text, image, video, carousel, reel
- Calculate percentages
- Note which format performs best

**E. Timing Patterns**

- Extract: day of week, hour of day
- Identify most common posting times
- Correlate with engagement

**F. CTA Patterns**

- Extract calls-to-action
- Common patterns: "Comment", "Share", "Follow", "Save"
- Note effectiveness

### Step 7: Log Cost

**Update:** jarvis-sidecar/memories.md

**Format:**

```markdown
## API Usage Log - {Month}

- [{date}] apify/{actor_name}: ${actual_cost} ({max_posts} {posts/videos})
  - Platform: {platform}
  - Profile: {handle}
  - Workflow: {workflow_name}

**Monthly Total:** ${updated_total}
**Budget:** $10.00
**Remaining:** ${remaining}
```

### Step 8: Create Profile Summary

**Output Structure:**

```markdown
# Profile Analysis: @{handle}

**Platform:** {platform}
**Analyzed:** {date}
**Posts:** {post_count}
**Cost:** ${actual_cost}

## Profile Overview

- Followers: {count}
- Bio: {bio}
- Posting frequency: {per_week} posts/week

## Content Strategy

### Content Mix

- Text: {percent}%
- Image: {percent}%
- Video: {percent}%

### Top Topics

1. {topic} ({count} posts, {engagement} avg)
   ...

### Hook Preferences

- Question: {percent}%
- Number: {percent}%
  ...

### What Works

- Top format: {format} ({lift}x engagement)
- Top topic: {topic}
- Top hook: {hook_type}
- Best time: {day} at {hour}

## Top Performers

{#top_posts}

### {rank}. {title/text_snippet}

- Format: {format}
- Engagement: {count} ({rate}%)
- Posted: {date}
- URL: [{platform}]({url})
  {#has_patterns}
- Why it worked: {hook_type} + {topic} + {format}
  {/has_patterns}
  {/top_posts}

## Recommendations

{#recommendations}

### {number}. {recommendation_title}

**Finding:** {data_finding}
**Evidence:** [Post example]({url})
**Action:** {what_to_do}
**Impact:** {expected_result}
{/recommendations}

## Evidence Log

{#evidence}

- [{platform} Post]({url}) - {metric}
  {/evidence}

**Confidence:** {score}/10 (based on {sample_size} posts)
```

## Integration Notes

**Works with:**

- analyze-profile workflow (main user)
- competitive-analysis workflow (multi-profile)
- learn-voice workflow (fetch user's posts)

**Provides data for:**

- Pattern mining
- Competitive intelligence
- Voice profile building

## Quality Standards

- Must fetch minimum {analysis_depth} posts
- All engagement metrics normalized
- Patterns must have examples
- Every recommendation backed by evidence
- Cost tracking mandatory

````

---

### Skill 4: deep-web-research

**File:** `~/.claude/skills/jarvis/deep-web-research/SKILL.md`

```yaml
---
name: deep-web-research
description: Conduct comprehensive web research using exa's AI-powered search and deep researcher. Gathers articles, extracts data points, finds expert quotes, discovers case studies, and provides company intelligence. Use when user asks for "deep dive", "comprehensive research", "in-depth analysis", company research, competitor intelligence, or when standard search isn't sufficient.
allowed-tools: Read, Write, Edit
---

# Deep Web Research Skill

## Purpose
Use exa's AI-powered research capabilities for comprehensive web intelligence gathering.

## MCP Used
- **exa**
  - Tool: `web_search_exa` - Fast web search
  - Tool: `deep_researcher_start` - Initiate AI research
  - Tool: `deep_researcher_check` - Retrieve results
  - Tool: `company_research` - Company/competitor intel

## When to Use This Skill

Invoke when:
- User asks for "deep dive" or "comprehensive research"
- Standard search isn't detailed enough
- User wants company/competitor intelligence
- Part of research-topic workflow with depth="comprehensive"

## Instructions

### For Deep Research (Comprehensive)

**Step 1: Initiate Research**

**Tool:** exa/deep_researcher_start

**Parameters:**
```javascript
{
  topic: "{topic}"
}
````

**Returns:** research_id

**Step 2: Wait for Processing**

- Display: "Deep research initiated... (30-60 seconds)"
- Wait: 30 seconds

**Step 3: Retrieve Results**

**Tool:** exa/deep_researcher_check

**Parameters:**

```javascript
{
  researchId: '{research_id}';
}
```

**Returns:** Comprehensive research object with:

- Key insights
- Data points
- Expert quotes
- Related topics
- Source URLs

### For Standard Web Search (Quick/Standard)

**Tool:** exa/web_search_exa

**Parameters:**

```javascript
{
  query: "{topic}",
  maxResults: 10
}
```

**Returns:** Array of search results

**Extract from each:**

- Title, URL, snippet
- Publication date (recency matters)
- Source credibility
- 3-5 key points

### For Company Research

**Tool:** exa/company_research

**Parameters:**

```javascript
{
  query: '{company_name} OR {topic} companies';
}
```

**Returns:** Company intelligence

### Step 4: Organize Findings

```markdown
# Deep Web Research: {Topic}

**Method:** {deep_researcher|web_search|company_research}
**Sources:** {count}

## Key Insights

{#insights}

- {insight_text}
  - Source: [{title}]({url})
  - Date: {pub_date}
  - Confidence: {high|medium|low based on source + recency}
    {/insights}

## Data & Statistics

{#data_points}

- {stat_text}
  - Source: [{title}]({url})
    {/data_points}

## Expert Quotes

{#quotes}

- "{quote_text}"
  - Attributed to: {expert/source}
  - Source: [{title}]({url})
    {/quotes}

## Case Studies & Examples

{#examples}

- {example_description}
  - Source: [{title}]({url})
    {/examples}

## Sources ({count} total)

{#sources}

- [{title}]({url}) - {date}
  {/sources}
```

### Step 5: Assess Quality

**For each finding:**

- Assign confidence: high|medium|low
- Based on:
  - Source credibility (TechCrunch > random blog)
  - Recency (last month > last year)
  - Data backing (stats vs opinion)

## Example

**Input:** "Deep research on AI automation market"

**Output:**

- 15 key insights from authoritative sources
- 10 data points with citations
- 5 expert quotes
- 3 case studies
- All from last 3 months
- Confidence scores for each

## Quality Standards

- Minimum 10 sources for comprehensive
- Minimum 5 sources for standard
- All sources < 6 months old (prefer recent)
- All data points cited
- Expert quotes attributed

````

---

### Skill 5: research-synthesizer

**File:** `~/.claude/skills/jarvis/research-synthesizer/SKILL.md`

```yaml
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
````

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
```

---

### Skills 6-8: Processing Skills (Shorter)

**These are simpler - focus on internal processing, no MCPs**

#### Skill 6: voice-matcher

```yaml
---
name: voice-matcher
description: Apply user's voice profile to generated content by matching vocabulary, sentence structure, tone, emoji usage, and signature phrases. Load voice profile from jarvis-sidecar/memories.md. Use when generating content (posts, scripts, captions) that needs to sound authentic, not AI-generated.
allowed-tools: Read, Edit
---
# Voice Matcher Skill

[Instructions for loading voice profile and applying characteristics]
```

#### Skill 7: platform-formatter

```yaml
---
name: platform-formatter
description: Format content for specific social media platforms (LinkedIn, Twitter, Instagram, YouTube, Reels, TikTok) based on platform specifications (length limits, structure rules, hashtag strategies). Use when content is generated and needs platform-specific formatting.
allowed-tools: Read, Edit
---
# Platform Formatter Skill

[Instructions for applying platform specs]
```

#### Skill 8: evidence-tracker

```yaml
---
name: evidence-tracker
description: Track all research sources, citations, URLs, timestamps, and confidence scores. Maintain evidence log throughout research and content generation. Use whenever research includes data, quotes, statistics, or video references that need citation.
allowed-tools: Read, Write
---
# Evidence Tracker Skill

[Instructions for maintaining evidence log]
```

---

## 🔧 Workflow Simplification Strategy

### OLD research-topic/instructions.md (302 lines):

```xml
<step n="2">
  <action>Call social_media_mcp/get_trending_topics</action>
  <action>Parameters: platform="twitter"</action>
  <action>For each trend:</action>
  <action>  Call social_media_mcp/research_topic</action>
  <action>  Extract facts, hashtags</action>
  <action>Tool: script_generation_mcp/add_note</action>
  <action>Store findings</action>
</step>

<step n="3">
  <action>Call exa_mcp/web_search_exa</action>
  ...
</step>

[10+ more explicit steps with MCP calls]
```

### NEW research-topic/instructions.md (~60 lines):

```xml
<workflow>
<step n="1" goal="Initialize research session">
  <action>Display to user:
    🔍 Research Session: {topic}
    Depth: {depth}
    Focus: {focus_areas}
  </action>
</step>

<step n="2" goal="Conduct comprehensive research">
  <action>Research {topic} using all available sources:</action>

  <check if="'trends' in focus_areas">
    <action>Get trending topics, hashtags, and current facts.</action>
    <!-- Claude invokes social-media-research Skill -->
  </check>

  <check if="'examples' in focus_areas">
    <action>Find YouTube videos about {topic} and extract how they explain it, structure patterns, and quotes.</action>
    <!-- Claude invokes youtube-research Skill -->
  </check>

  <check if="depth == 'comprehensive'">
    <action>Conduct deep web research for comprehensive insights, data, and expert opinions.</action>
    <!-- Claude invokes deep-web-research Skill -->
  </check>
</step>

<step n="3" goal="Synthesize and organize">
  <action>Organize all research findings into comprehensive brief with:
    - 5 categories (Trends, Data, Examples, Quotes, Gaps)
    - 10-12 content angles
    - Complete evidence log
  </action>
  <!-- Claude invokes research-synthesizer Skill -->

  <action>Save research brief to: {sessions_folder}/research-{topic}-{date}.md</action>
</step>

<step n="4" goal="Present results">
  <action>Display summary with stats, top findings, file location, and next steps</action>
</step>

</workflow>
```

**Reduction:** 302 lines → 60 lines (80% reduction!)

**Benefits:**

- Natural language instructions
- Claude autonomously invokes Skills
- Adapts to focus_areas dynamically
- Simpler to maintain

---

## 📋 IMPLEMENTATION TASK CHECKLIST

Execute in this exact order:

### Phase 1: Setup (10 min)

- [ ] **Task 1:** Create Skills directory structure
  ```bash
  mkdir -p ~/.claude/skills/jarvis/{social-media-research,youtube-research,profile-analysis,deep-web-research,research-synthesizer,voice-matcher,platform-formatter,evidence-tracker}
  ```

### Phase 2: Create Research Skills (2.5 hours)

- [ ] **Task 2:** Create social-media-research/SKILL.md (30 min)
  - Write complete SKILL.md from blueprint above
  - Test trigger: Ask "what's trending about AI"
  - Verify: Claude invokes Skill, calls social-media-mcp

- [ ] **Task 3:** Create youtube-research/SKILL.md (30 min)
  - Write complete SKILL.md
  - Test trigger: Ask "find YouTube examples of productivity"
  - Verify: Claude invokes Skill, calls youtube-transcript

- [ ] **Task 4:** Create profile-analysis/SKILL.md (40 min)
  - Write complete SKILL.md
  - Test trigger: Provide Instagram URL
  - Verify: Claude invokes Skill, calls apify, handles cost

- [ ] **Task 5:** Create deep-web-research/SKILL.md (30 min)
  - Write complete SKILL.md
  - Test trigger: Ask "deep dive into automation market"
  - Verify: Claude invokes Skill, calls exa

- [ ] **Task 6:** Create research-synthesizer/SKILL.md (30 min)
  - Write complete SKILL.md
  - Test trigger: After multiple research Skills, ask "organize findings"
  - Verify: Claude combines all research

### Phase 3: Create Processing Skills (1 hour)

- [ ] **Task 7:** Create voice-matcher/SKILL.md (20 min)
- [ ] **Task 8:** Create platform-formatter/SKILL.md (20 min)
- [ ] **Task 9:** Create evidence-tracker/SKILL.md (20 min)

### Phase 4: Simplify Workflows (1.5 hours)

- [ ] **Task 10:** Update research-topic/instructions.md (30 min)
  - Remove all script_generation_mcp references
  - Remove explicit social-media-mcp calls
  - Add natural language instructions
  - Let Skills handle execution

- [ ] **Task 11:** Update generate-ideas/instructions.md (20 min)
  - Simplify research gathering
  - Let Skills orchestrate

- [ ] **Task 12:** Update analyze-profile/instructions.md (20 min)
  - Let profile-analysis Skill handle platform detection + scraping
  - Workflow focuses on orchestration only

- [ ] **Task 13:** Update competitive-analysis/instructions.md (20 min)
  - Orchestration of multiple profile analyses
  - Let profile-analysis Skill handle details

### Phase 5: Update Configs (15 min)

- [ ] **Task 14:** Update jarvis-sidecar/config.yaml
  - Remove script_generation_mcp from mcp_servers
  - Update social_media_mcp tools list to show full capabilities

- [ ] **Task 15:** Update all workflow.yaml files
  - Remove script_generation_mcp from mcp_tools_required

### Phase 6: Testing & Validation (1.5 hours)

- [ ] **Task 16:** Test Skill autonomous invocation (30 min)
  - Ask questions that should trigger each Skill
  - Verify Claude picks correct Skill(s)
  - Check if multiple Skills combine correctly

- [ ] **Task 17:** Test research-topic workflow end-to-end (30 min)
  - Run complete research on test topic
  - Verify all Skills invoked correctly
  - Validate research brief quality

- [ ] **Task 18:** Test analyze-profile workflow (20 min)
  - Analyze Instagram profile (small cost ~$0.01)
  - Verify profile-analysis Skill + cost tracking

- [ ] **Task 19:** Refine Skill descriptions (10 min)
  - If Claude doesn't invoke correctly
  - Add/adjust trigger keywords
  - Test again

**Total Tasks:** 19
**Total Time:** ~6 hours

---

## 🧪 Testing & Validation

### Test 1: Skill Invocation Test

**Without explicit commands:**

```
User: "What's trending about AI automation?"

Expected:
- Claude invokes social-media-research Skill automatically
- Calls social-media-mcp/get_trending_topics
- Returns trending topics, hashtags
```

**Validation:**

- [ ] Skill invoked autonomously
- [ ] MCP called correctly
- [ ] Results formatted properly

### Test 2: Multi-Skill Combination

**Complex question:**

```
User: "Research AI tools - get trends, YouTube examples, and web data"

Expected:
- Claude invokes social-media-research (trends)
- Claude invokes youtube-research (examples)
- Claude invokes deep-web-research (web data)
- Claude invokes research-synthesizer (combines all)
```

**Validation:**

- [ ] Multiple Skills invoked
- [ ] All worked together
- [ ] Synthesis created

### Test 3: Complete Workflow

**Run research-topic:**

```
/jarvis → research-topic
topic: "productivity apps"
depth: "standard"
focus_areas: ["trends", "examples", "data"]
```

**Expected:**

- Workflow sets context
- Claude invokes Skills based on focus_areas
- Research brief created
- Content angles generated

**Validation:**

- [ ] Workflow completed
- [ ] Research brief file exists
- [ ] Quality high (all categories populated)
- [ ] No errors

---

## 🐛 Common Gotchas & Solutions

### Gotcha 1: Skill Not Invoked

**Issue:** Claude doesn't use Skill when expected

**Solutions:**

- Check description has trigger keywords
- Make description more specific
- Include "Use when..." phrase
- Test with exact trigger phrase

### Gotcha 2: Wrong Skill Invoked

**Issue:** Claude picks wrong Skill

**Solutions:**

- Make descriptions mutually exclusive
- Add negative conditions: "Do NOT use for..."
- Be more specific about trigger conditions

### Gotcha 3: Skills Don't Combine

**Issue:** Only one Skill invoked, not multiple

**Solutions:**

- Each Skill should be independent
- Descriptions shouldn't overlap too much
- Complex questions naturally trigger multiple

### Gotcha 4: MCP Still Not Called

**Issue:** Skill invoked but doesn't use MCP

**Solutions:**

- Make MCP call explicit in instructions
- Show exact tool syntax: "social-media-mcp/research_topic"
- Include parameters in instructions

---

## 🔗 Essential References

### Claude Code Skills Documentation

- Overview: https://docs.claude.com/en/docs/claude-code/skills
- Best Practices: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
- Examples: https://github.com/anthropics/skills

### Jarvis Current State

- Agent: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/content-intelligence/jarvis.md`
- Config: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`
- Workflows: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/content-intelligence/jarvis-sidecar/workflows/`

### MCP Servers

- social-media-mcp: `/Users/sid/.mcp-servers/social-media-mcp/`
  - Research capabilities: src/research/
  - Tools: research_topic, get_trending_topics
- Working MCPs: apify, exa, youtube-transcript, social-media-mcp

### Implementation Plan

- Complete plan: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/content-intelligence/JARVIS-SKILLS-IMPLEMENTATION-PLAN.md`

---

## 💡 Success Criteria

### Skills Created (8/8):

- [ ] social-media-research SKILL.md exists and works
- [ ] youtube-research SKILL.md exists and works
- [ ] profile-analysis SKILL.md exists and works
- [ ] deep-web-research SKILL.md exists and works
- [ ] research-synthesizer SKILL.md exists and works
- [ ] voice-matcher SKILL.md exists and works
- [ ] platform-formatter SKILL.md exists and works
- [ ] evidence-tracker SKILL.md exists and works

### Workflows Updated (4/7):

- [ ] research-topic simplified (references removed)
- [ ] generate-ideas simplified
- [ ] analyze-profile simplified
- [ ] competitive-analysis simplified
- [ ] write-posts, write-scripts (keeping for separate plan per user)
- [ ] learn-voice (minimal changes needed)

### Autonomous Invocation Works:

- [ ] Ask "what's trending" → social-media-research invoked
- [ ] Provide YouTube URL → youtube-research invoked
- [ ] Provide Instagram URL → profile-analysis invoked
- [ ] Ask "deep research" → deep-web-research invoked
- [ ] Complex question → Multiple Skills combine

### Quality Standards:

- [ ] No fictional MCP references
- [ ] All Skills use their MCPs optimally
- [ ] Workflows 80% shorter
- [ ] Test coverage complete
- [ ] Documentation updated

---

## 📊 Confidence Score: 9/10

**Why 9/10:**

**Strengths:**

- ✅ Claude Skills are proven Anthropic feature (Oct 2025 release)
- ✅ All MCPs already working (tested)
- ✅ Clear Skill specifications provided
- ✅ Workflow simplification straightforward
- ✅ Best practices documented
- ✅ Testing approach defined
- ✅ Complete task checklist (19 tasks)

**Minor Risks:**

- ⚠️ First time creating Skills for this project (learning curve)
- ⚠️ Skill descriptions need tuning for optimal invocation
- ⚠️ May need iteration on trigger keywords

**Why not 10/10:**

- Skills autonomous invocation needs real-world testing
- Description optimization may require 2-3 iterations
- Some edge cases may emerge

**Expected Outcome:** Successful implementation with minor description tuning

---

## 🚀 Implementation Approach

### Incremental + Test-Driven

**Don't build all 8 Skills then test - build incrementally:**

1. Build social-media-research Skill
2. Test it immediately (ask "what's trending")
3. Verify it works
4. Then build next Skill
5. Repeat

**This ensures:**

- Each Skill proven before moving on
- Issues caught early
- Descriptions tuned based on real behavior
- Confidence in each component

---

**Ready for one-pass implementation with iterative testing!**

_Start with Task 1: Create Skills directory structure_
_Then Task 2: Build social-media-research Skill (prove the pattern)_
_Then proceed through remaining tasks systematically_
