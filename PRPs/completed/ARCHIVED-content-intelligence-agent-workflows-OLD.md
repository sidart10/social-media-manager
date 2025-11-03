# PRP: Content Intelligence Agent - Complete Workflow Implementation

**Feature:** Build 5 core workflows for Content Intelligence Agent (research, ideation, script writing)

**Created:** 2025-10-26
**Status:** Ready for Implementation
**Confidence Score:** 9/10
**Estimated Time:** 3-4 hours

---

## 🎯 Context & Problem Statement

### Current State

**What We Have:**

- ✅ MCP Servers researched (6 servers with tool mappings)
- ✅ Twitter API Client module (fully functional)
- ✅ LinkedIn API Client module (fully functional)
- ✅ Social Posting Agent (handles all posting)
- ✅ AI Video Agent (creates videos)
- ✅ AI Image Generator (creates visuals)
- ✅ BMAD workflow framework (proven patterns)

**What We Need:**

- ❌ Content Intelligence Agent workflows
- ❌ Profile analysis capabilities
- ❌ Evidence-backed ideation system
- ❌ Platform-specific script generation
- ❌ Competitive intelligence tools

### User's Goal

Build a **Content Intelligence Agent** that:

1. **Analyzes** social media profiles (Twitter, LinkedIn, YouTube)
2. **Mines** patterns, trends, and winning strategies
3. **Generates** evidence-backed content ideas (Idea Cards)
4. **Writes** platform-specific scripts (YouTube, Reels, LinkedIn, Twitter)
5. **Provides** competitive gap analysis

**Critical:** This agent does NOT post content. It produces research and scripts that are handed off to:

- Social Posting Agent (publishes)
- AI Video Agent (creates videos)
- AI Image Generator (creates images)

---

## 🏗️ Requirements

### Must Have (MVP)

**5 Core Workflows:**

1. `analyze-profile` - Deep profile analysis with pattern extraction
2. `generate-ideas` - Evidence-backed Idea Cards generation
3. `write-script` - Platform-specific content creation
4. `competitive-analysis` - Multi-profile comparison & gap analysis
5. `research-topic` - Deep topic research with multi-source aggregation

**Each Workflow Needs:**

- ✅ workflow.yaml configuration
- ✅ instructions.md with step-by-step logic
- ✅ MCP tool integration points
- ✅ Structured outputs (JSON/Markdown)
- ✅ Error handling for missing tools
- ✅ Evidence tracking (source links, timestamps)

### Should Have (Phase 2)

- Workflow chaining (outputs feed into next workflow)
- Caching layer for repeated analyses
- Template library for common patterns
- Export to multiple formats

---

## 📚 Technical Research & Architecture

### MCP Server Tool Mapping

**Critical Reference:** `/Users/sid/Desktop/4. Coding Projects/social-media-manager/MCP_SERVERS_RESEARCH.md`

| Workflow                 | MCP Tools Required                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **analyze-profile**      | `linkedin-mcp` (fetch_posts, get_top_posts), `youtube-mcp-server` (get_channel_details, analyze_engagement), `youtube-transcript` (get_transcript), `exa-mcp` (linkedin_search) |
| **generate-ideas**       | `social-media-mcp` (get_trending_topics, research_topic), `exa-mcp` (deep_researcher_start/check), `script-generation-mcp` (add_note, summarize_notes)                          |
| **write-script**         | `script-generation-mcp` (script_generate), `youtube-transcript` (get_transcript for quotes)                                                                                     |
| **competitive-analysis** | Combines analyze-profile tools for multiple profiles                                                                                                                            |
| **research-topic**       | `exa-mcp` (web_search_exa, deep_researcher), `social-media-mcp` (get_trending_topics), `youtube-transcript` (get_transcript)                                                    |

### BMAD Workflow Structure (Proven Patterns)

**Reference Files:**

- `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/core/workflows/brainstorming/workflow.yaml`
- `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/bmb/workflows/create-workflow/workflow.yaml`
- `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/social-posting-agent/workflows/post-text-tweet.yaml`

**Standard workflow.yaml Structure:**

```yaml
name: workflow-name
description: 'Clear description'
author: 'Agent Name'

# Variables
config_source: '{agent-folder}/sidecar/config.yaml'
output_folder: '{agent-folder}/sidecar/outputs'
date: system-generated

# MCP Integration
mcp_tools_required:
  - server-name: [tool1, tool2]

# Custom Modules
custom_modules:
  - module-name: 'usage description'

# Inputs/Outputs
inputs:
  - param_name: 'description'

outputs:
  - output_name: 'description'

# This is action workflow (no template)
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{output_folder}/output-name-{{date}}.md'
```

**Standard instructions.md Structure:**

```markdown
# Workflow Name Instructions

<workflow>
<critical>Load workflow.yaml and workflow.xml engine</critical>

<step n="1" goal="Clear objective">
  <action>What to do</action>

  <check if="condition">
    <action>Conditional action</action>
  </check>

<template-output>output_name</template-output>
</step>

<step n="2" goal="Next step">
  <!-- etc -->
</step>

</workflow>
```

### Directory Structure

```
bmad/agents/content-intelligence/
├── content-intelligence.agent.yaml
└── content-intelligence-sidecar/
    ├── config.yaml
    ├── instructions.md
    ├── memories.md
    ├── workflows/
    │   ├── analyze-profile/
    │   │   ├── workflow.yaml
    │   │   ├── instructions.md
    │   │   └── templates/
    │   │       ├── profile-summary.md
    │   │       └── pattern-library.md
    │   ├── generate-ideas/
    │   │   ├── workflow.yaml
    │   │   ├── instructions.md
    │   │   └── templates/
    │   │       └── idea-card.md
    │   ├── write-script/
    │   │   ├── workflow.yaml
    │   │   ├── instructions.md
    │   │   └── templates/
    │   │       ├── youtube-script.md
    │   │       ├── reels-script.md
    │   │       ├── linkedin-post.md
    │   │       └── twitter-thread.md
    │   ├── competitive-analysis/
    │   │   ├── workflow.yaml
    │   │   ├── instructions.md
    │   │   └── templates/
    │   │       ├── comparison-matrix.md
    │   │       └── gap-analysis.md
    │   └── research-topic/
    │       ├── workflow.yaml
    │       ├── instructions.md
    │       └── templates/
    │           └── research-brief.md
    ├── knowledge/
    │   ├── hook-templates.md
    │   ├── platform-specs.yaml
    │   └── mcp-tools-reference.md
    └── outputs/
```

---

## 💻 Implementation Blueprint

### Phase 1: Create Agent Sidecar Structure (10 min)

**Step 1.1: Create Directory Structure**

```bash
# Create main sidecar folders
mkdir -p bmad/agents/content-intelligence-sidecar/{workflows,knowledge,outputs,sessions}

# Create workflow folders
cd bmad/agents/content-intelligence-sidecar/workflows
mkdir -p analyze-profile/{templates}
mkdir -p generate-ideas/{templates}
mkdir -p write-script/{templates}
mkdir -p competitive-analysis/{templates}
mkdir -p research-topic/{templates}
```

**Step 1.2: Create Sidecar Config**

File: `bmad/agents/content-intelligence-sidecar/config.yaml`

```yaml
# Content Intelligence Agent Configuration
module: content-intelligence
output_folder: '{agent-folder}/outputs'
sessions_folder: '{agent-folder}/sessions'
knowledge_folder: '{agent-folder}/knowledge'

# MCP Server Configuration
mcp_servers:
  linkedin_mcp:
    enabled: true
    tools: [fetch_and_save_linkedin_posts, get_top_posts, search_posts, get_posts_by_date]

  youtube_mcp_server:
    enabled: true
    tools: [get_channel_details, get_channel_videos, analyze_video_engagement, evaluate_video_for_knowledge_base]

  youtube_transcript:
    enabled: true
    tools: [get_transcript]

  social_media_mcp:
    enabled: true
    tools: [get_trending_topics, research_topic]

  exa_mcp:
    enabled: true
    tools: [web_search_exa, deep_researcher_start, deep_researcher_check, linkedin_search, company_research]

  script_generation_mcp:
    enabled: true
    tools: [script_generate, add_note, summarize_notes]

# Custom Modules
custom_modules:
  twitter_api_client: '{project-root}/bmad/modules/twitter-api-client'
  linkedin_api_client: '{project-root}/bmad/modules/linkedin-api-client'

# Platform Specifications
platforms:
  youtube:
    script_lengths: [30, 60, 90, 180, 600]
    max_title: 100
    max_description: 5000

  reels:
    duration: [30, 60, 90]
    aspect_ratio: '9:16'

  linkedin:
    max_text: 3000
    optimal_text: 1600
    hook_max: 140

  twitter:
    max_text_free: 280
    max_text_premium: 25000
    max_media: 4
```

**Step 1.3: Create Agent Instructions**

File: `bmad/agents/content-intelligence-sidecar/instructions.md`

```markdown
# Content Intelligence Agent - Private Instructions

## Core Directives

- **Domain**: Social media content strategy, research, and ideation
- **Access**: Only this sidecar folder and MCP tools
- **Never**: Post content directly (use Social Posting Agent)

## Workflow Execution

All workflows follow BMAD workflow.xml engine:

- Load workflow.yaml configuration
- Execute instructions.md step-by-step
- Generate structured outputs
- Track evidence with source links

## MCP Integration Rules

1. **Always check tool availability** before calling
2. **Handle gracefully** if tool fails
3. **Log all API calls** for debugging
4. **Respect rate limits** per server

## Output Standards

All outputs must include:

- **Evidence links** (URLs, timestamps)
- **Source attribution** (which tool/profile)
- **Confidence scores** (high/medium/low)
- **Handoff format** (ready for other agents)

## Platform Specifications

Load platform specs from config.yaml before generating content.

**YouTube:**

- Structure: Hook → Points → CTA
- Add B-roll suggestions
- Include timestamps

**Reels/TikTok:**

- 3-second hook rule
- Fast beats (5-10s each)
- Visual direction markers

**LinkedIn:**

- Hook < 140 chars
- Body < 1600 chars optimal
- Professional tone

**Twitter:**

- Thread numbering
- Each tweet standalone
- Character validation
```

---

### Phase 2: Workflow 1 - analyze-profile (30 min)

**File: `workflows/analyze-profile/workflow.yaml`**

```yaml
name: analyze-profile
description: 'Deep profile analysis with pattern extraction and evidence'
author: 'Content Intelligence Agent'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated

# MCP Tools Required
mcp_tools_required:
  - linkedin_mcp: [fetch_and_save_linkedin_posts, get_top_posts, search_posts, get_posts_by_date]
  - youtube_mcp_server: [get_channel_details, get_channel_videos, analyze_video_engagement]
  - youtube_transcript: [get_transcript]
  - exa_mcp: [linkedin_search, company_research]

# Inputs
inputs:
  - profile_url: 'URL to analyze (Twitter, LinkedIn, YouTube)'
  - platform: 'auto-detect or specify: twitter|linkedin|youtube'
  - window_days: 'default: 90'
  - analysis_depth: 'quick|standard|deep (default: standard)'
  - extract_transcripts: 'boolean, default: true for YouTube'

# Outputs
outputs:
  - profile_summary: 'Bio, cadence, audience, content mix'
  - top_posts: 'Top 10 performers with metrics'
  - pattern_library: 'Hooks, formats, topics, timing'
  - recommendations: 'Evidence-backed suggestions'
  - evidence_log: 'All source links and timestamps'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/profile-analysis-{profile_handle}-{{date}}.md'
```

**File: `workflows/analyze-profile/instructions.md`**

```markdown
# Analyze Profile Workflow

<workflow>
<critical>Load workflow.yaml and workflow.xml engine first</critical>
<critical>All MCP tool calls must check availability first</critical>

<step n="1" goal="Detect platform and validate URL">
  <action>Parse profile_url to extract platform and handle/ID</action>
  <action>Validate URL format matches platform conventions</action>

  <check if="platform == 'linkedin'">
    <action>Extract LinkedIn username/profile ID from URL</action>
    <action>Call exa_mcp.linkedin_search(profile_name) to verify profile exists</action>
    <action>Store verified profile data</action>
  </check>

  <check if="platform == 'youtube'">
    <action>Extract channel_id or @handle from URL</action>
    <action>Call youtube_mcp_server.get_channel_details(channel_id)</action>
    <action>Store channel metadata (subscriber count, total views, description)</action>
  </check>

  <check if="platform == 'twitter'">
    <action>Extract @handle from URL</action>
    <note>Twitter analysis requires custom implementation (no MCP available)</note>
    <action>Note limitation in output</action>
  </check>

<template-output>platform_detection</template-output>
</step>

<step n="2" goal="Fetch recent content">
  <action>Calculate date range: today - window_days</action>
  <action>Set max_results based on analysis_depth:
    - quick: 20 posts
    - standard: 50 posts
    - deep: 100 posts
  </action>

  <check if="platform == 'linkedin'">
    <action>Call linkedin_mcp.fetch_and_save_linkedin_posts(username)</action>
    <action>Call linkedin_mcp.get_posts_by_date(start_date, end_date)</action>
    <action>Store posts in session memory for analysis</action>

    <check if="fetch fails">
      <action>Log error: "LinkedIn MCP unavailable or credentials missing"</action>
      <action>Suggest fallback: Manual profile review or use exa_mcp</action>
    </check>

  </check>

  <check if="platform == 'youtube'">
    <action>Call youtube_mcp_server.get_channel_videos(channel_id, max_results)</action>
    <action>For each video, call analyze_video_engagement(video_id)</action>
    <action>Store video metadata + engagement metrics</action>
  </check>

<template-output>raw_content_data</template-output>
</step>

<step n="3" goal="Extract top performers">
  <action>Sort posts/videos by engagement rate (normalize by follower count if available)</action>
  <action>Select top 10 by engagement</action>
  <action>For each top post, extract:
    - Content text/title
    - Metrics (likes, comments, shares, views)
    - Timestamp
    - Format (text, image, video, carousel)
    - URL (evidence link)
  </action>

<template-output>top_performers</template-output>
</step>

<step n="4" goal="Mine content patterns">
  <action>Analyze top performers for patterns:</action>

<action>**Hook Patterns:** - Question hooks (starts with "Why", "How", "What", "Ever wonder") - Number hooks (starts with digit or "X ways") - Imperative hooks (starts with verb: "Learn", "Discover", "Stop") - Story hooks (starts with "I", "When I", personal narrative) - Count frequency of each type
</action>

<action>**Topic Clustering:** - Extract main topics/themes from all posts - Use simple keyword extraction + grouping - Identify top 5 topic clusters
</action>

<action>**Format Distribution:** - Calculate % text-only, % image, % video, % carousel - Note which formats get highest engagement
</action>

<action>**Timing Patterns:** - Extract day of week + hour for each post - Identify most common posting times - Correlate timing with engagement
</action>

<action>**CTA Patterns:** - Identify common calls-to-action - "Comment below", "Share if you agree", "Follow for more", etc.
</action>

<template-output>pattern_library</template-output>
</step>

<step n="5" goal="Extract transcript insights (YouTube only)">
  <check if="platform == 'youtube' AND extract_transcripts == true">
    <action>For top 5 videos, call youtube_transcript.get_transcript(video_url)</action>

    <action>From each transcript, extract:
      - Hook (first 10 seconds of transcript)
      - Structure markers ("First", "Next", "Finally", "Here's why")
      - Key quotes (compelling phrases)
      - Transitions between ideas
    </action>

    <action>Identify common script structures:
      - Problem → Solution → CTA
      - Listicle (X ways to...)
      - Story arc (beginning → conflict → resolution)
      - Tutorial (step-by-step)
    </action>

    <template-output>transcript_insights</template-output>

  </check>
</step>

<step n="6" goal="Generate profile summary">
  <action>Compile comprehensive profile summary:</action>

<action>**Profile Overview:** - Platform + handle - Subscriber/follower count - Bio/description - Posting cadence (posts per week) - Analysis date range
</action>

<action>**Content Strategy:** - Content mix (% by format) - Top topics (5 clusters) - Hook preference (most common types) - Posting rhythm (days/times) - CTA style
</action>

<action>**What Works:** - Top 3 content formats by engagement - Top 3 topics by engagement - Top 3 hooks with examples - Optimal posting times
</action>

<action>**Evidence Links:** - List all top posts with URLs - Include timestamps for video quotes - Confidence score for each finding (based on sample size)
</action>

<template-output>profile_summary</template-output>
</step>

<step n="7" goal="Generate actionable recommendations">
  <action>Based on all findings, create 5-7 recommendations:</action>

<action>**Format Recommendations:** - "Based on analysis, [FORMAT] drives 2x engagement vs [FORMAT]" - "Recommendation: Create more [FORMAT] content" - Evidence: [Link to top examples]
</action>

<action>**Topic Recommendations:** - "Top performing topic: [TOPIC] (X posts, Y avg engagement)" - "Recommendation: Double down on [TOPIC]" - Evidence: [Links]
</action>

<action>**Hook Recommendations:** - "[HOOK TYPE] hooks perform best (X% of top posts)" - "Example: [Exact hook from top post]" - "Recommendation: Lead with [HOOK TYPE]"
</action>

<action>**Timing Recommendations:** - "Peak engagement: [DAY] at [TIME]" - "Recommendation: Schedule posts for [OPTIMAL WINDOWS]"
</action>

<template-output>recommendations</template-output>
</step>

<step n="8" goal="Save and present outputs">
  <action>Compile all sections into final markdown document</action>
  <action>Save to default_output_file</action>
  <action>Display summary to user with file location</action>

<action>**Present to user:** - Profile analyzed: [HANDLE] - Posts analyzed: [COUNT] - Top format: [FORMAT] - Top topic: [TOPIC] - Top hook: [TYPE] - 📄 Full report: [FILE PATH]
</action>
</step>

</workflow>
```

**File: `workflows/analyze-profile/templates/profile-summary.md`**

```markdown
# Profile Analysis: {{profile_handle}}

**Platform:** {{platform}}
**Analyzed:** {{date}}
**Window:** {{window_days}} days
**Posts Analyzed:** {{post_count}}

---

## Profile Overview

**Bio/Description:**
{{bio}}

**Metrics:**

- Followers/Subscribers: {{follower_count}}
- Posting Cadence: {{posts_per_week}} per week
- Account Age: {{account_age}}

---

## Content Strategy

### Content Mix

{{content_mix_chart}}

### Top Topics

1. {{topic_1}} ({{topic_1_count}} posts, {{topic_1_engagement}} avg engagement)
2. {{topic_2}}
3. {{topic_3}}
4. {{topic_4}}
5. {{topic_5}}

### Hook Patterns

- **Question Hooks:** {{question_hook_pct}}% (Example: "{{question_hook_example}}")
- **Number Hooks:** {{number_hook_pct}}% (Example: "{{number_hook_example}}")
- **Story Hooks:** {{story_hook_pct}}% (Example: "{{story_hook_example}}")
- **Imperative Hooks:** {{imperative_hook_pct}}% (Example: "{{imperative_hook_example}}")

### Posting Rhythm

- **Best Days:** {{best_days}}
- **Best Times:** {{best_times}}
- **Frequency:** {{posting_frequency}}

---

## What Works (Top Performers)

{{#top_posts}}

### {{rank}}. {{title}}

- **Format:** {{format}}
- **Topic:** {{topic}}
- **Hook Type:** {{hook_type}}
- **Engagement:** {{engagement_count}} ({{engagement_rate}}%)
- **Posted:** {{posted_date}}
- **Link:** [View Post]({{url}})

{{#has_transcript}}
**Key Quote:** "{{transcript_quote}}" ({{timestamp}})
{{/has_transcript}}

---

{{/top_posts}}

## Recommendations

{{#recommendations}}

### {{recommendation_number}}. {{recommendation_title}}

**Finding:** {{finding}}

**Evidence:** {{evidence}}

**Action:** {{action}}

**Expected Impact:** {{expected_impact}}

---

{{/recommendations}}

## Evidence Log

All findings backed by data:

{{#evidence_items}}

- [{{evidence_type}}] {{evidence_description}} - [Source]({{source_url}})
  {{/evidence_items}}

**Confidence Score:** {{confidence_score}}/10

---

_Generated by Content Intelligence Agent_
_Analysis Date: {{analysis_timestamp}}_
```

---

### Phase 3: Workflow 2 - generate-ideas (30 min)

**File: `workflows/generate-ideas/workflow.yaml`**

```yaml
name: generate-ideas
description: 'Generate evidence-backed Idea Cards with hooks, outlines, and sources'
author: 'Content Intelligence Agent'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated

# MCP Tools Required
mcp_tools_required:
  - social_media_mcp: [get_trending_topics, research_topic]
  - exa_mcp: [web_search_exa, deep_researcher_start, deep_researcher_check]
  - youtube_transcript: [get_transcript]
  - script_generation_mcp: [add_note, summarize_notes]

# Inputs
inputs:
  - seed_topic: 'Main topic or theme'
  - target_platforms: 'Array: [twitter, linkedin, youtube, reels] (default: all)'
  - competitor_urls: 'Optional: URLs to analyze for gaps'
  - idea_count: 'Number of ideas to generate (default: 10)'
  - style: 'tutorial|opinion|story|teardown|announcement (default: mixed)'
  - use_trends: 'boolean, default: true'

# Outputs
outputs:
  - idea_cards: 'Array of structured ideas with evidence'
  - hook_pack: '10+ hook variations'
  - content_calendar: 'Suggested posting schedule'
  - research_notes: 'All gathered research'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/idea-cards-{seed_topic}-{{date}}.md'
```

**File: `workflows/generate-ideas/instructions.md`**

```markdown
# Generate Ideas Workflow

<workflow>
<critical>Load workflow.yaml and workflow.xml engine first</critical>

<step n="1" goal="Research phase - Fast trends">
  <check if="use_trends == true">
    <action>For each platform in target_platforms:</action>
    <action>  Call social_media_mcp.get_trending_topics(platform, category="tech")</action>
    <action>  Extract trending topic titles + hashtags</action>
    <action>  Call social_media_mcp.research_topic(topic) for each trend</action>
    <action>  Get quick facts, stats, related hashtags</action>

    <action>Store all findings using script_generation_mcp.add_note(name="trends", content)</action>

    <check if="MCP fails">
      <action>Log: "Trends MCP unavailable, proceeding with seed topic only"</action>
      <action>Continue with manual research</action>
    </check>

  </check>

<template-output>trend_research</template-output>
</step>

<step n="2" goal="Research phase - Deep dive">
  <action>Prepare deep research query combining seed_topic + trends</action>

  <check if="analysis_depth != 'quick'">
    <action>Call exa_mcp.deep_researcher_start(topic=seed_topic)</action>
    <action>Wait 30 seconds for processing</action>
    <action>Call exa_mcp.deep_researcher_check() to retrieve results</action>

    <action>Extract from results:
      - Key insights (3-5 main findings)
      - Statistics/data points
      - Expert quotes
      - Examples/case studies
    </action>

    <action>Add all to notes: script_generation_mcp.add_note(name="deep_research", content)</action>

  </check>

  <check if="analysis_depth == 'quick'">
    <action>Call exa_mcp.web_search_exa(query=seed_topic, max_results=10)</action>
    <action>Extract key points from top results</action>
    <action>Add to notes</action>
  </check>

<template-output>deep_research</template-output>
</step>

<step n="3" goal="Mine competitor content (optional)">
  <check if="competitor_urls provided AND competitor_urls.length > 0">
    <action>For each URL in competitor_urls:</action>
    <action>  Run analyze-profile workflow (invoke internally)</action>
    <action>  Extract top hooks and formats from analysis</action>
    <action>  Store pattern library</action>

    <action>After all competitors analyzed:</action>
    <action>  Identify content gaps (topics they DON'T cover)</action>
    <action>  Find winning formats across competitors</action>
    <action>  Extract hook patterns that work</action>

    <action>Add findings to notes: script_generation_mcp.add_note(name="competitor_analysis", content)</action>

  </check>

<template-output>competitor_insights</template-output>
</step>

<step n="4" goal="Synthesize and cluster research">
  <action>Call script_generation_mcp.summarize_notes(style="detailed")</action>
  <action>Review all notes and identify themes</action>

<action>Cluster research into topic themes: - Use keyword extraction to find common themes - Group related insights together - Aim for 5-8 distinct theme clusters - Each cluster should have enough substance for 2-3 ideas
</action>

<action>For each cluster, gather: - Main theme/angle - Supporting facts/stats (from research) - Example quotes (from notes) - Trend connection (if applicable) - Evidence links (source URLs)
</action>

<template-output>theme_clusters</template-output>
</step>

<step n="5" goal="Generate Idea Cards">
  <action>For each theme cluster, generate 1-2 Idea Cards</action>
  <action>Total target: idea_count (default 10)</action>

<action>Idea Card Structure:

    **Title:** Specific, compelling (5-10 words)
      - Make it concrete, not generic
      - Include number if applicable
      - Example: "5 AI Tools That Automate Your Workflows"

    **Why Now:** Trend evidence (1-2 lines)
      - Reference specific trend or timely event
      - Example: "AI automation tools trending +240% on LinkedIn this week"
      - Include source link

    **Hook Line:** Opening (exact words to use)
      - 3-second attention grabber
      - Can be question, number, or statement
      - Example: "Spending 10 hours a week on repetitive tasks?"

    **Outline:** 3-5 bullets (key beats)
      - Each bullet is one main point
      - Include transition words
      - Example:
        • Hook: Problem statement
        • Tool 1: [Name] - what it does
        • Tool 2: [Name] - what it does
        • Tool 3-5: Rapid fire
        • CTA: "Which will you try first?"

    **CTA:** Call-to-action
      - Platform-specific
      - Engagement-focused
      - Examples:
        - LinkedIn: "What's your go-to automation tool? Comment below"
        - YouTube: "Like if this saved you time"
        - Twitter: "Retweet if you needed this"

    **Hashtags:** Suggested tags (3-5)
      - Mix of broad + niche
      - Based on trend research
      - Example: #AI #Productivity #Automation #NoCode #Workflows

    **Evidence:** Links to sources with timestamps
      - Format: [Source Title](URL) - Timestamp if video
      - Example: [TechCrunch AI Report](url), [YouTube: @creator 2:34](url#t=154)

    **Platform Fit:** Best platform(s) for this idea
      - Consider format requirements
      - Assess audience match
      - Rank: Primary + Secondary platforms
      - Example: "Primary: LinkedIn (professional), Secondary: YouTube Short"

    **Style:** Tutorial, opinion, story, teardown, announcement
      - Helps writer match tone

  </action>

<action>Distribute styles based on input: - If style="mixed": Vary across ideas - If style specified: Use that style for all - Ensure variety in hook types across cards
</action>

<template-output>idea_cards</template-output>
</step>

<step n="6" goal="Generate hook variations">
  <action>From all idea cards, extract successful hook patterns</action>
  <action>Create 10+ hook templates that can be reused:</action>

<action>**Number Hooks:** - "X ways to [outcome]" - "X things I wish I knew about [topic]" - "X mistakes [audience] makes with [topic]"
</action>

<action>**Question Hooks:** - "Ever wonder why [phenomenon]?" - "What if you could [desired outcome]?" - "Why do [group] struggle with [problem]?"
</action>

<action>**Story Hooks:** - "I tried [thing] for [timeframe] and..." - "When I started [activity], I didn't know..." - "Last week, something changed..."
</action>

<action>**Reveal Hooks:** - "The secret to [outcome] is..." - "Nobody talks about [overlooked thing]..." - "Here's what [expert group] knows that you don't..."
</action>

<action>**Data Hooks:** - "X% of [group] don't know..." - "[Surprising stat] about [topic]" - "[Topic] just hit [milestone]"
</action>

<template-output>hook_pack</template-output>
</step>

<step n="7" goal="Create content calendar suggestion">
  <action>Distribute idea_cards across suggested posting schedule</action>

<action>Calendar rules: - Space similar topics 3+ days apart - Alternate formats (don't post 3 videos in a row) - Suggest optimal days based on platform best practices: - LinkedIn: Tuesday-Thursday, 9am-12pm - YouTube: Friday-Sunday (better discovery) - Twitter: Weekdays, multiple times per day - Reels/TikTok: Any day, post 1-3x daily
</action>

<action>Output format:
**Week 1:** - Monday: [Idea Title] (LinkedIn, Tutorial) - Wednesday: [Idea Title] (YouTube, Tutorial) - Friday: [Idea Title] (Twitter Thread, Opinion)

    **Week 2:**
    - ...

  </action>

<template-output>content_calendar</template-output>
</step>

<step n="8" goal="Save and present outputs">
  <action>Compile all idea cards into markdown document</action>
  <action>Include hook pack at end</action>
  <action>Include content calendar</action>
  <action>Save to default_output_file</action>

<action>**Present to user:** - Ideas generated: [COUNT] - Topics covered: [TOPICS] - Evidence sources: [SOURCE_COUNT] - 📄 Idea Cards: [FILE PATH]

    **Top 3 Ideas:**
    1. [Idea Title] - [Platform] - [Style]
    2. [Idea Title] - [Platform] - [Style]
    3. [Idea Title] - [Platform] - [Style]

  </action>
</step>

</workflow>
```

**File: `workflows/generate-ideas/templates/idea-card.md`**

```markdown
# Idea Card {{idea_number}}: {{title}}

**Generated:** {{date}}
**Topic:** {{seed_topic}}
**Style:** {{style}}

---

## Why This Idea Now

{{why_now}}

**Trend Evidence:** {{trend_evidence}}
**Source:** [{{source_title}}]({{source_url}})

---

## Hook & Outline

### Hook Line

> {{hook_line}}

**Hook Type:** {{hook_type}} (Question/Number/Story/Reveal/Data)

### Content Outline

{{#outline_beats}}
{{beat_number}}. **{{beat_title}}**

- {{beat_detail}}
  {{/outline_beats}}

### Call-to-Action

{{cta}}

---

## Platform Strategy

**Primary Platform:** {{primary_platform}}
**Why:** {{platform_rationale}}

**Secondary Platform:** {{secondary_platform}} (adapt with {{adaptation_notes}})

**Format:** {{format}} (Text/Image/Video/Carousel)

**Optimal Length:**

- {{platform_1}}: {{length_1}}
- {{platform_2}}: {{length_2}}

---

## Hashtags & Tags

{{#hashtags}}

- {{hashtag}} ({{hashtag_volume}} posts)
  {{/hashtags}}

---

## Evidence & Sources

{{#evidence_items}}

- [{{evidence_title}}]({{evidence_url}}) {{#has_timestamp}}@ {{timestamp}}{{/has_timestamp}}
  - {{evidence_snippet}}
    {{/evidence_items}}

---

## Ready to Write?

Use the **write-script** workflow to turn this into a platform-ready script:
```

/write-script idea_card_id="{{idea_id}}" target_platform="youtube" duration="90s"

```

---

*Confidence Score: {{confidence}}/10*
*Idea ID: {{idea_id}}*
```

---

### Phase 4: Workflow 3 - write-script (45 min)

This is the most complex workflow with platform-specific templates.

**File: `workflows/write-script/workflow.yaml`**

```yaml
name: write-script
description: 'Transform Idea Cards into platform-ready scripts with proper formatting'
author: 'Content Intelligence Agent'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
platform_specs: '{config_source}:platforms'
date: system-generated

# MCP Tools Required
mcp_tools_required:
  - script_generation_mcp: [script_generate, add_note, summarize_notes]
  - youtube_transcript: [get_transcript]

# Custom Modules
custom_modules:
  - twitter_api_client: 'Format validation & character limits'
  - linkedin_api_client: 'Text formatting & escaping'

# Inputs
inputs:
  - idea_card_id: 'Reference to generated idea OR idea_card_file path'
  - target_platform: 'youtube|reels|linkedin|twitter'
  - duration: 'For video: 30|60|90|180|600 seconds'
  - tone: 'direct|playful|formal|casual (default: direct)'
  - inject_evidence: 'boolean, default: true - use quotes from research'
  - generate_variants: 'boolean, default: true - create 3 hook alternatives'

# Outputs
outputs:
  - script: 'Platform-formatted script'
  - hook_variants: '3 alternative hooks'
  - metadata: 'Hashtags, thumbnail ideas, posting tips'
  - handoff_package: 'Structured data for Social Posting Agent'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{output_folder}/{platform}-script-{{date}}.md'
handoff_file: '{output_folder}/{platform}-handoff-{{date}}.json'
```

**File: `workflows/write-script/instructions.md`**

````markdown
# Write Script Workflow

<workflow>
<critical>Load workflow.yaml, platform_specs, and workflow.xml engine</critical>

<step n="1" goal="Load Idea Card and platform specs">
  <action>Load idea_card data from idea_card_id or idea_card_file</action>
  <action>Extract:
    - title
    - hook_line
    - outline (beats)
    - cta
    - evidence items
    - style
  </action>

<action>Load platform specifications from config.yaml platforms section</action>
<action>Get specs for target_platform: - Max/optimal length - Format requirements - Special formatting rules
</action>

  <check if="target_platform == 'youtube' OR target_platform == 'reels'">
    <action>Validate duration parameter is provided</action>
    <action>Load duration-specific structure:
      - 30-60s: Hook → 1-2 Points → CTA
      - 90s-3min: Hook → 3-4 Points → CTA
      - 5-10min: Hook → Intro → 5-7 Points → Summary → CTA
    </action>
  </check>

<template-output>idea_loaded</template-output>
</step>

<step n="2" goal="Generate base script">
  <action>Prepare script generation inputs:
    - topic: idea_card.title
    - keywords: Extract from idea_card (hashtags + key terms)
    - style: idea_card.style
    - tone: workflow input tone
  </action>

<action>Call script_generation_mcp.script_generate(topic, keywords)</action>

<action>Receive generated script (multi-agent refined)</action>

  <check if="inject_evidence == true">
    <action>For each point in generated script:</action>
    <action>  Find matching evidence from idea_card.evidence</action>
    <action>  Inject quote or stat with attribution:</action>
    <action>    Example: "As TechCrunch reported, AI tools saw 240% growth last quarter"</action>
    <action>    Example: "According to research from [Source], X% of [group]..."</action>
  </check>

<template-output>base_script</template-output>
</step>

<step n="3" goal="Format for target platform">

  <!-- YOUTUBE SCRIPT -->
  <check if="target_platform == 'youtube'">
    <action>Transform base_script into YouTube format:</action>

    <action>**Hook (0:00-0:05):**
      - Use idea_card.hook_line OR generate alternative
      - Must be compelling in first 3 seconds
      - Add visual suggestion: [Show: Hook visual idea]
    </action>

    <action>**Intro (0:05-0:15):**
      - Expand on hook
      - Tell viewer what they'll learn
      - Build credibility: "I've [credential]..."
      - [B-roll: Relevant footage]
    </action>

    <action>**Main Content:**
      - For each outline beat:
        • Dedicate time based on duration
        • 60s script: 15s per point (4 points max)
        • 90s script: 20s per point (4-5 points)
        • 3min script: 30s per point (5-6 points)
      - Add visual direction: [Show: Graphic], [B-roll: Example]
      - Add on-screen text markers: TEXT: "[Key stat]"
      - Insert evidence quotes with attribution
    </action>

    <action>**Transition phrases:**
      - Between points: "Next up...", "But here's the thing...", "Now..."
      - Building momentum: "And that's not all...", "Plus..."
    </action>

    <action>**CTA (last 10 seconds):**
      - Primary: Subscribe/Like reminder
      - Secondary: Comment prompt (idea_card.cta)
      - Tertiary: Next video tease
      - [Show: End screen elements]
    </action>

    <action>Add timing markers:
      - 0:00 Hook
      - 0:05 Intro
      - 0:15 Point 1
      - 0:35 Point 2
      - etc.
    </action>

    <action>Add thumbnail ideas based on content:
      - Key visual element
      - Text overlay suggestion
      - Color scheme
    </action>

    <template-output>youtube_script</template-output>

  </check>

  <!-- REELS/TIKTOK SCRIPT -->
  <check if="target_platform == 'reels'">
    <action>Transform base_script into Reels format:</action>

    <action>**Hook (0:00-0:03):**
      - MUST be visually striking + text compelling
      - Use idea_card.hook_line
      - [Visual: Bold, attention-grabbing opening shot]
      - [Text Overlay: Hook in large text]
    </action>

    <action>**Fast Beats (3-5 beats, 5-15s each):**
      - One idea per beat
      - Rapid delivery, punchy language
      - Transition words: "First...", "Next...", "Plus...", "Finally..."
      - Each beat:
        • [Visual direction: What to show]
        • [Text overlay: Key phrase]
        • Spoken text (short sentences)
    </action>

    <action>**CTA (last 3-5 seconds):**
      - Use idea_card.cta
      - Add: "Follow for more tips like this"
      - [Visual: Creator pointing to follow button OR text prompt]
    </action>

    <action>**Reels-specific elements:**
      - Suggest music tempo: Fast/Medium/Slow
      - Suggest camera angles: Close-up, Over shoulder, B-roll cuts
      - Hashtag strategy: 3-5 relevant (mix broad + niche)
      - Audio: Trending sound OR original audio
    </action>

    <action>**Duration optimization:**
      - 30s: 1 hook + 3 beats + CTA
      - 60s: 1 hook + 4-5 beats + CTA
      - 90s: 1 hook + 5-6 beats + recap + CTA
    </action>

    <template-output>reels_script</template-output>

  </check>

  <!-- LINKEDIN POST -->
  <check if="target_platform == 'linkedin'">
    <action>Transform base_script into LinkedIn post format:</action>

    <action>**Hook (First line, <140 chars):**
      - Scroll-stopping opening
      - Use idea_card.hook_line OR adapt for LinkedIn tone
      - Professional but engaging
      - Example: "Spent 10 hours/week on tasks AI could do in 10 minutes."
      - Can use 1-2 emojis max (if appropriate)
    </action>

    <action>**Body (3-5 paragraphs, total <1600 chars optimal):**

      - **Paragraph 1: Context/Problem**
        • Expand on hook
        • Relatable pain point
        • 2-3 sentences

      - **Paragraph 2-4: Main Points**
        • Use idea_card.outline beats
        • One point per paragraph OR bulleted list
        • Use • bullets or numbers
        • Add line breaks between paragraphs (readability)
        • Inject evidence:
          "According to [Source], X% of professionals..."

      - **Paragraph 5: Wrap-up**
        • Quick summary OR forward-looking statement
        • Tie back to opening
    </action>

    <action>**CTA:**
      - Use idea_card.cta
      - Ask engaging question: "What's your experience with this?"
      - OR Request action: "Share this if you found it helpful"
      - Make it conversational
    </action>

    <action>**Hashtags (end of post):**
      - Add 3-5 relevant hashtags
      - Mix of broad (#AI, #Productivity) + niche (#NoCode, #Workflows)
      - Based on idea_card.hashtags
    </action>

    <action>**LinkedIn-specific formatting:**
      - Call linkedin_api_client/lib/formatter.js methods:
        • formatLineBreaks(text) - normalize line breaks
        • formatPostText(text) - get formatted + warnings
      - Check for special char escaping (if needed)
      - Validate length:
        • Max 3000 chars (hard limit)
        • Optimal 1600 chars (engagement drop-off)
        • Hook < 140 chars (mobile truncation)
    </action>

    <action>**Warnings check:**
      - If text > 1600 chars, warn: "May reduce engagement, consider shortening"
      - If first line > 140 chars, warn: "May be truncated on mobile"
    </action>

    <template-output>linkedin_post</template-output>

  </check>

  <!-- TWITTER THREAD -->
  <check if="target_platform == 'twitter'">
    <action>Transform base_script into Twitter thread format:</action>

    <action>**Tweet 1 (Hook):**
      - Attention-grabbing statement or question
      - Tease the value: "Here's what I learned...", "A thread 🧵"
      - Use idea_card.hook_line (adapt for Twitter tone)
      - Validate length:
        • Premium: Up to 25,000 chars (use for detailed first tweet)
        • Free: 280 chars max
        • Call twitter_api_client/lib/validator to check
    </action>

    <action>**Tweets 2-N (Points):**
      - One idea per tweet
      - Based on idea_card.outline beats
      - Use line breaks for readability (not walls of text)
      - Add context, don't just list:
        ✗ "Tool 1: Zapier"
        ✓ "Tool 1: Zapier\n\nAutomatically moves data between apps. Set it once, forget about it.\n\nSaved me ~5 hours last week."
      - Inject evidence where relevant
      - Each tweet should make sense standalone (some people won't read whole thread)
    </action>

    <action>**Thread structure by idea complexity:**
      - Simple idea: 3-4 tweets
      - Medium idea: 5-7 tweets
      - Complex idea: 8-12 tweets
    </action>

    <action>**Final Tweet (CTA):**
      - Summarize key takeaway
      - Use idea_card.cta: "Retweet if this was helpful"
      - OR Drive to action: "Want the full list? Comment 'list'"
      - Can include link (to profile, resource, etc.)
    </action>

    <action>**Thread numbering:**
      - Add to end of each tweet: "1/6", "2/6", etc.
      - Helps readers track progress
    </action>

    <action>**Validation:**
      - Call twitter_api_client/lib/validator.validateTweetRequest for each tweet
      - Check:
        • Text length (280 or 25k depending on account)
        • No prohibited content patterns
      - If validation fails, split tweet or shorten
    </action>

    <template-output>twitter_thread</template-output>

  </check>

</step>

<step n="4" goal="Generate hook variants">
  <check if="generate_variants == true">
    <action>Create 3 alternative hooks for A/B testing:</action>

    <action>**Variant 1: Different hook type**
      - If original is question → try number hook
      - If original is number → try story hook
      - If original is story → try reveal hook
    </action>

    <action>**Variant 2: Different angle**
      - Same core idea, different framing
      - Example original: "5 AI tools that save time"
      - Variant: "Stop wasting 10 hours a week—use these 5 tools"
    </action>

    <action>**Variant 3: Emotion-driven**
      - Add curiosity, urgency, or FOMO
      - Example original: "How to automate workflows"
      - Variant: "Everyone's automating workflows except you. Here's how to start."
    </action>

    <template-output>hook_variants</template-output>

  </check>
</step>

<step n="5" goal="Generate metadata and handoff package">
  <action>Compile metadata for content creator:</action>

<action>**For YouTube:** - Title: [Derived from idea_card.title, <100 chars] - Description: [Summary + links, <5000 chars] - Thumbnail ideas: [Visual suggestions] - Tags: [idea_card.hashtags adapted] - Posting tip: [Best day/time from platform knowledge]
</action>

<action>**For Reels:** - Caption: [Hook + CTA] - Hashtags: [3-5 tags] - Music suggestion: [Tempo + vibe] - Posting tip: [Post 1-3x daily, any day]
</action>

<action>**For LinkedIn:** - First line preview: [Hook line] - Estimated reading time: [Words / 200 wpm] - Character count: [Total] - Posting tip: [Tuesday-Thursday, 9am-12pm]
</action>

<action>**For Twitter:** - Thread length: [X tweets] - Total character count: [Sum] - Posting tip: [Weekday mornings, avoid Fri/Sat]
</action>

<action>Create handoff package JSON for Social Posting Agent:</action>

```json
{
  "content_type": "{{platform}}_script",
  "idea_card_id": "{{idea_id}}",
  "platform": "{{platform}}",
  "ready_for_agent": "social-posting-agent",
  "suggested_command": "/post-{{platform}}",
  "content": {
    "script": "{{full_script}}",
    "metadata": {
      "title": "{{title}}",
      "description": "{{description}}",
      "hashtags": ["{{tag1}}", "{{tag2}}"],
      "posting_tip": "{{tip}}"
    }
  },
  "evidence": {
    "idea_card": "{{idea_card_file}}",
    "research_sources": ["{{url1}}", "{{url2}}"]
  },
  "timestamp": "{{generation_timestamp}}"
}
```
````

<action>Save handoff package to handoff_file</action>

<template-output>handoff_package</template-output>
</step>

<step n="6" goal="Save and present outputs">
  <action>Save script to default_output_file (markdown)</action>
  <action>Save handoff package to JSON file</action>

<action>**Present to user:**

    Platform: {{target_platform}}
    Duration/Length: {{duration_or_length}}
    Style: {{style}}

    📄 Script: {{script_file}}
    📦 Handoff Package: {{handoff_file}}

    **Hook:**
    "{{hook_line}}"

    **Alternative Hooks:**
    1. "{{variant_1}}"
    2. "{{variant_2}}"
    3. "{{variant_3}}"

    **Character/Duration:**
    - {{char_count}} characters
    - Estimated: {{duration}} (if video)

    **Next Steps:**
    - Review script and make any adjustments
    - Ready to post? Use Social Posting Agent: {{suggested_command}}
    - Need video? Use AI Video Agent with this script

  </action>
</step>

</workflow>
```

---

### Phase 5: Workflow 4 - competitive-analysis (20 min)

**File: `workflows/competitive-analysis/workflow.yaml`**

```yaml
name: competitive-analysis
description: 'Multi-profile comparison with gap identification and strategy recommendations'
author: 'Content Intelligence Agent'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated

# MCP Tools Required (same as analyze-profile)
mcp_tools_required:
  - linkedin_mcp: [fetch_and_save_linkedin_posts, get_top_posts, search_posts]
  - youtube_mcp_server: [get_channel_details, get_channel_videos, analyze_video_engagement]
  - exa_mcp: [company_research]

# Inputs
inputs:
  - your_profiles: 'Array of your profile URLs (1-3)'
  - competitor_profiles: 'Array of competitor URLs (max 5)'
  - comparison_metrics: 'engagement|frequency|topics|formats (default: all)'
  - output_format: 'matrix|report|both (default: both)'

# Outputs
outputs:
  - comparison_matrix: 'Side-by-side metrics table'
  - gap_analysis: "What they do that you don't"
  - differentiation_strategy: '3 ways to stand out'
  - seven_day_plan: 'Specific content ideas to fill gaps'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/competitive-analysis-{{date}}.md'
```

**File: `workflows/competitive-analysis/instructions.md`**

```markdown
# Competitive Analysis Workflow

<workflow>
<critical>This workflow orchestrates multiple analyze-profile workflows</critical>

<step n="1" goal="Analyze all profiles">
  <action>Combine your_profiles + competitor_profiles into single list</action>
  <action>Total profiles to analyze: {{total_count}}</action>

<action>For each profile URL in list:</action>
<action> Invoke analyze-profile workflow internally:</action>
<action> - Pass: profile_url, platform (auto-detect), window_days=90, analysis_depth="standard"</action>
<action> - Wait for completion</action>
<action> - Store analysis result with label (your/competitor)</action>

<action>Progress tracking: "Analyzing profile X of Y..."</action>

<template-output>all_profile_analyses</template-output>
</step>

<step n="2" goal="Build comparison matrix">
  <action>Create table comparing all profiles across metrics:</action>

<action>**Table Structure:**

    | Metric | You (Profile 1) | You (Profile 2) | Comp 1 | Comp 2 | Comp 3 | Comp 4 | Comp 5 |
    |--------|-----------------|-----------------|--------|--------|--------|--------|--------|
    | Followers | X | X | X | X | X | X | X |
    | Posts/Week | X | X | X | X | X | X | X |
    | Avg Engagement | X | X | X | X | X | X | X |
    | % Text | X | X | X | X | X | X | X |
    | % Image | X | X | X | X | X | X | X |
    | % Video | X | X | X | X | X | X | X |
    | Top Topic | X | X | X | X | X | X | X |
    | Top Hook Type | X | X | X | X | X | X | X |
    | Best Day | X | X | X | X | X | X | X |
    | Best Time | X | X | X | X | X | X | X |

  </action>

<action>Add color coding (markdown): - 🟢 Your profiles (green indicators) - 🔵 Competitors (blue indicators) - ⭐ Highest value in each row (best performer)
</action>

<template-output>comparison_matrix</template-output>
</step>

<step n="3" goal="Identify gaps">
  <action>Compare your profile patterns vs competitor patterns:</action>

<action>**Topic Gaps:** - List all topics competitors cover - List all topics you cover - Find: Topics in competitor list NOT in your list - Rank by frequency across competitors
</action>

<action>**Format Gaps:** - Identify formats competitors use more (e.g., "Competitors post 40% video, you post 10%") - Note: Formats they excel at that you rarely use
</action>

<action>**Hook Gaps:** - Compare hook type distribution - Find: Hook types that work for them but you haven't tried - Example: "Competitors use question hooks 35% of time, you use 5%"
</action>

<action>**Timing Gaps:** - Compare posting schedules - Find: Times they post that you don't - Note: If they post more frequently (e.g., "Competitors post 7x/week, you post 3x/week")
</action>

<action>**Engagement Gaps:** - Compare avg engagement rates - Identify: What they do that gets 2x+ your engagement - Find correlation: "Their video posts get 3x engagement vs your text posts"
</action>

<template-output>gap_analysis</template-output>
</step>

<step n="4" goal="Generate differentiation strategy">
  <action>Based on gap analysis, create 3 strategic recommendations:</action>

<action>**Strategy 1: Fill Topic Gaps with Unique Angle** - Identify: Top 3 topic gaps - Recommend: Cover these topics BUT with your unique perspective/expertise - Example: "Competitors cover 'AI tools' frequently. Cover it with focus on [your niche]." - Expected impact: "Capture audience interested in this topic + stand out with unique angle"
</action>

<action>**Strategy 2: Adopt Winning Formats with Your Style** - Identify: Format gaps where competitors excel - Recommend: Try these formats but with your voice/brand - Example: "Competitors get high engagement with short videos. Start posting 60s explainers in your teaching style." - Expected impact: "Leverage proven format + differentiate with your approach"
</action>

<action>**Strategy 3: Double Down on Your Strengths** - Identify: What YOU do better than competitors (from matrix) - Recommend: Amplify your winning patterns - Example: "Your in-depth tutorials outperform competitors' quick tips. Create more long-form content." - Expected impact: "Own your niche, become go-to for [your strength]"
</action>

<template-output>differentiation_strategy</template-output>
</step>

<step n="5" goal="Create 7-day action plan">
  <action>Generate 7 specific content ideas based on strategies:</action>

<action>**Days 1-3: Fill Topic Gaps** - Pick 3 topic gaps - For each, create specific idea:
• Day 1: "[Topic Gap 1] - [Your Unique Angle]" - Format: [Recommended based on what works] - Hook: [Specific hook line] - Platform: [Best platform for this] - Why: "Competitors cover this, you'll stand out with [angle]"
</action>

<action>**Days 4-5: Try New Formats** - Pick 2 format gaps - For each, create specific idea:
• Day 4: "[Topic] as [New Format]" - Example: "Your typical tutorial topic but as 60s video instead of text" - Why: "Competitors' videos get 3x engagement, test this format"
</action>

<action>**Days 6-7: Lean Into Your Strengths** - Identify your 2 top-performing patterns - For each, create idea that doubles down:
• Day 6: "[Topic] using [Your Strength]" - Example: "In-depth case study (your strength) on [trending topic]" - Why: "Own your niche while staying relevant"
</action>

<action>Each idea includes: - Title - Format - Platform - Hook line (specific, ready to use) - Expected outcome - Strategic reasoning
</action>

<template-output>seven_day_plan</template-output>
</step>

<step n="6" goal="Save and present outputs">
  <action>Compile all sections into markdown report</action>
  <action>Save to default_output_file</action>

<action>**Present to user:**

    **Competitive Analysis Complete**

    Profiles Analyzed:
    - Your profiles: {{your_count}}
    - Competitors: {{competitor_count}}

    **Key Findings:**
    - Top Topic Gap: {{top_topic_gap}}
    - Top Format Gap: {{top_format_gap}}
    - Biggest Opportunity: {{biggest_opportunity}}

    📄 Full Report: {{report_file}}

    **Next Steps:**
    1. Review 7-day action plan
    2. Pick ideas to develop
    3. Use /generate-ideas or /write-script to create content

  </action>
</step>

</workflow>
```

---

### Phase 6: Workflow 5 - research-topic (25 min)

**File: `workflows/research-topic/workflow.yaml`**

```yaml
name: research-topic
description: 'Comprehensive topic research with multi-source aggregation'
author: 'Content Intelligence Agent'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated

# MCP Tools Required
mcp_tools_required:
  - exa_mcp: [web_search_exa, deep_researcher_start, deep_researcher_check, company_research]
  - social_media_mcp: [get_trending_topics, research_topic]
  - youtube_transcript: [get_transcript]
  - script_generation_mcp: [add_note, summarize_notes]

# Inputs
inputs:
  - topic: 'Main research topic'
  - depth: 'quick|standard|comprehensive (default: standard)'
  - focus_areas: 'Array: [trends, examples, data, quotes, competitors]'
  - output_format: 'notes|report|idea-cards (default: report)'
  - max_youtube_videos: 'Max videos to analyze transcripts (default: 5)'

# Outputs
outputs:
  - research_brief: 'Executive summary'
  - key_findings: 'Top 5-10 insights'
  - quotes_library: 'Attributed quotes with sources'
  - data_points: 'Stats, numbers, metrics'
  - content_angles: '10+ ways to approach this topic'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/research-{topic}-{{date}}.md'
```

**File: `workflows/research-topic/instructions.md`**

```markdown
# Research Topic Workflow

<workflow>
<critical>Comprehensive multi-source research with MCP integration</critical>

<step n="1" goal="Quick trend scan">
  <action>Call social_media_mcp.get_trending_topics(platform="twitter", category="tech")</action>
  <action>Filter trends for those related to topic</action>
  <action>For each related trend:
    - Call social_media_mcp.research_topic(trend)
    - Get: Quick facts, hashtags, key points
  </action>

<action>Add findings to notes: script_generation_mcp.add_note(name="trends", content)</action>

<template-output>trend_scan</template-output>
</step>

<step n="2" goal="Deep web research">
  <check if="depth == 'comprehensive'">
    <action>Call exa_mcp.deep_researcher_start(topic=topic)</action>
    <action>Wait for processing (polling every 10s, max 2min)</action>
    <action>Call exa_mcp.deep_researcher_check() to retrieve results</action>

    <action>Extract and categorize findings:
      - Key insights (main discoveries)
      - Statistics & data points
      - Expert quotes
      - Examples & case studies
      - Trends & timing indicators
    </action>

    <action>Add to notes: script_generation_mcp.add_note(name="deep_research", content)</action>

  </check>

  <check if="depth == 'standard' OR depth == 'quick'">
    <action>Call exa_mcp.web_search_exa(query=topic, max_results=10)</action>
    <action>For each result:
      - Extract title, snippet, URL
      - Identify key points (3-5 per result)
      - Note publication date (recency matters)
    </action>

    <action>Add to notes</action>

  </check>

<template-output>web_research</template-output>
</step>

<step n="3" goal="Find real examples (YouTube)">
  <check if="'examples' in focus_areas">
    <action>Search for top YouTube videos on topic (manual query OR use youtube_mcp if search available)</action>
    <action>Select top 5 videos by views + relevance</action>

    <action>For each video (up to max_youtube_videos):
      - Call youtube_transcript.get_transcript(video_url)
      - Extract from transcript:
        • How they explain the topic
        • Specific examples they use
        • Quotes and sound bites
        • Structure patterns (intro → points → conclusion)
        • Timestamps for key moments
      - Add to notes with video URL + timestamps
    </action>

  </check>

<template-output>youtube_examples</template-output>
</step>

<step n="4" goal="Competitor intelligence (optional)">
  <check if="'competitors' in focus_areas">
    <action>Call exa_mcp.company_research(query=topic + " companies")</action>
    <action>Identify companies/creators in this space</action>
    <action>Analyze:
      - Their messaging/positioning
      - How they talk about this topic
      - Their unique angles
    </action>

    <action>Add to notes</action>

  </check>

<template-output>competitor_intelligence</template-output>
</step>

<step n="5" goal="Synthesize findings">
  <action>Call script_generation_mcp.summarize_notes(style="detailed")</action>
  <action>Review summary + all individual notes</action>

<action>Organize into categories:

    **1. Trends & Timing:**
    - What's happening now with this topic
    - Why it matters right now
    - Future predictions/directions

    **2. Data & Statistics:**
    - Hard numbers, percentages, metrics
    - Growth rates, market size
    - Survey results, research findings

    **3. Examples & Case Studies:**
    - Real-world applications
    - Success stories
    - How others are using/discussing this

    **4. Quotes & Expert Opinions:**
    - Attributed quotes from research
    - Expert perspectives
    - Contrarian views (if any)

    **5. Gaps & Opportunities:**
    - What's NOT being discussed
    - Overlooked angles
    - Underserved audiences

  </action>

<action>For each finding, include: - The finding itself - Source (URL) - Timestamp (if video) - Confidence level (high/medium/low based on source quality)
</action>

<template-output>research_brief</template-output>
</step>

<step n="6" goal="Generate content angles">
  <action>Based on all research, brainstorm 10+ ways to approach this topic:</action>

<action>**Content angle types:**

    1. Tutorial: "How to [do topic]"
    2. Teardown: "Breaking down [example]"
    3. Opinion: "Why [hot take on topic]"
    4. Story: "When I tried [topic]..."
    5. Data: "X surprising stats about [topic]"
    6. Comparison: "[Topic approach A] vs [Topic approach B]"
    7. Prediction: "The future of [topic]"
    8. Mistakes: "X common [topic] mistakes"
    9. Beginner: "[Topic] explained simply"
    10. Advanced: "Deep dive: [Topic subtopic]"
    11. Trend: "Why everyone's talking about [topic]"
    12. Controversy: "The [topic] debate: Both sides"

  </action>

<action>For each angle, provide: - Angle title - Brief description (1-2 sentences) - Best platform (YouTube/LinkedIn/Twitter/Reels) - Target audience level (beginner/intermediate/advanced) - Related research points (which findings support this)
</action>

<template-output>content_angles</template-output>
</step>

<step n="7" goal="Save and present outputs">
  <check if="output_format == 'idea-cards'">
    <action>Convert top 5-10 content angles into Idea Cards</action>
    <action>For each angle:
      - Use research findings as evidence
      - Create hook from angle
      - Build outline from research points
      - Add citations
    </action>
    <action>Save in Idea Card format (use generate-ideas template)</action>
  </check>

  <check if="output_format == 'notes'">
    <action>Save as bullet-point notes (quick reference)</action>
  </check>

  <check if="output_format == 'report'">
    <action>Save as comprehensive markdown report with all sections</action>
  </check>

<action>**Present to user:**

    **Research Complete: {{topic}}**

    Depth: {{depth}}
    Sources: {{source_count}}

    **Top Findings:**
    1. {{finding_1}}
    2. {{finding_2}}
    3. {{finding_3}}

    **Content Angles:** {{angle_count}} ways to approach this

    📄 Full Research: {{research_file}}

    **Next Steps:**
    - Review content angles
    - Pick angle(s) to develop
    - Use /generate-ideas with this research

  </action>
</step>

</workflow>
```

---

## 🧪 Testing & Validation Strategy

### Unit Testing Approach

**Test each workflow independently:**

```bash
# 1. Test analyze-profile
Agent: /analyze-profile url="https://linkedin.com/in/test" platform="linkedin"
Expected: Profile summary + pattern library + top posts

# 2. Test generate-ideas
Agent: /generate-ideas seed_topic="AI automation" target_platforms=["linkedin"] idea_count=5
Expected: 5 Idea Cards with evidence

# 3. Test write-script
Agent: /write-script idea_card_id="1" target_platform="linkedin"
Expected: LinkedIn post formatted + handoff JSON

# 4. Test competitive-analysis
Agent: /competitive-analysis your_profiles=["url1"] competitor_profiles=["url2","url3"]
Expected: Comparison matrix + gap analysis + 7-day plan

# 5. Test research-topic
Agent: /research-topic topic="AI coding tools" depth="standard"
Expected: Research brief + content angles
```

### Integration Testing

**Test workflow chaining:**

```bash
# Full pipeline test:
1. /research-topic topic="AI tools" → Get research
2. /analyze-profile url="competitor" → Get patterns
3. /generate-ideas seed_topic="AI tools" competitor_urls=["..."] → Get ideas
4. /write-script idea_card_id="3" target_platform="youtube" → Get script
5. /competitive-analysis → Get strategy
```

### MCP Availability Testing

**Test graceful degradation when MCP servers fail:**

```bash
# Simulate MCP failure:
- Disable linkedin-mcp
- Run analyze-profile
- Expected: Fallback message + partial results

# Test all workflows with:
- No MCP servers available
- Only some MCP servers available
- All MCP servers available
```

---

## 🐛 Common Gotchas & Solutions

### 1. MCP Server Unavailability

**Issue:** MCP server connection fails
**Solution:** Wrap all MCP calls in try-catch with fallback:

```xml
<check if="MCP tool available">
  <action>Call MCP tool</action>
</check>

<check if="MCP tool unavailable">
  <action>Log warning: "Tool X unavailable"</action>
  <action>Use fallback: [Alternative approach]</action>
</check>
```

### 2. Rate Limiting

**Issue:** Too many API calls trigger rate limits
**Solution:** Add delays between calls + respect limits:

```xml
<action>Check rate limit status</action>
<action>If approaching limit, wait X seconds</action>
<action>Log all API calls for debugging</action>
```

### 3. Platform Format Differences

**Issue:** LinkedIn escaping special chars, Twitter char limits
**Solution:** Use custom modules for validation:

```xml
<!-- LinkedIn -->
<action>Call linkedin_api_client/lib/formatter.formatPostText(text)</action>
<action>Validate with formatLineBreaks + check warnings</action>

<!-- Twitter -->
<action>Call twitter_api_client/lib/validator.validateTweetRequest(request)</action>
<action>Split if text exceeds limits</action>
```

### 4. Evidence Tracking

**Issue:** Losing source links during processing
**Solution:** Always track evidence at every step:

```xml
<action>For each finding, store:
  - content
  - source_url
  - timestamp (if video)
  - confidence_level
</action>
```

### 5. Handoff Format Consistency

**Issue:** Other agents expect specific format
**Solution:** Standardize handoff JSON:

```json
{
  "content_type": "platform_script",
  "platform": "youtube",
  "ready_for_agent": "social-posting-agent",
  "suggested_command": "/post-youtube",
  "content": { ... },
  "evidence": { ... }
}
```

---

## 📊 Success Criteria

### MVP Complete When:

1. ✅ All 5 workflow folders created with correct structure
2. ✅ All workflow.yaml files valid and loadable
3. ✅ All instructions.md files follow BMAD XML pattern
4. ✅ All template files created
5. ✅ MCP integration points documented
6. ✅ Custom module integration working (Twitter/LinkedIn)
7. ✅ Each workflow tested independently
8. ✅ Evidence tracking works (source links preserved)
9. ✅ Handoff packages generated correctly
10. ✅ No linting errors in YAML/markdown

### Integration Complete When:

11. ✅ Workflows can chain together (output → input)
12. ✅ Social Posting Agent can consume handoff packages
13. ✅ AI Video Agent can use scripts
14. ✅ Graceful degradation when MCP fails
15. ✅ Full pipeline test succeeds (research → idea → script → handoff)

---

## 🔗 Essential Reference Links

### BMAD Framework

- Workflow XML Engine: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/core/tasks/workflow.xml`
- Brainstorming Workflow (example): `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/core/workflows/brainstorming/`
- Create Workflow (example): `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/bmb/workflows/create-workflow/`

### Custom Modules

- Twitter API Client: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/modules/twitter-api-client/`
- LinkedIn API Client: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/modules/linkedin-api-client/`

### MCP Research

- Complete MCP Research: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/MCP_SERVERS_RESEARCH.md`

### Existing Agents (for patterns)

- Social Posting Agent: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/social-posting-agent/`
- AI Video Agent: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-video-agent/`

---

## 🎯 Implementation Order (Task Checklist)

Execute in this exact order for optimal success:

- [ ] **Task 1:** Create agent sidecar directory structure (5 min)
- [ ] **Task 2:** Create sidecar config.yaml (10 min)
- [ ] **Task 3:** Create sidecar instructions.md (5 min)
- [ ] **Task 4:** Create analyze-profile/workflow.yaml (5 min)
- [ ] **Task 5:** Create analyze-profile/instructions.md (15 min)
- [ ] **Task 6:** Create analyze-profile templates (10 min)
- [ ] **Task 7:** Test analyze-profile workflow (5 min)
- [ ] **Task 8:** Create generate-ideas/workflow.yaml (5 min)
- [ ] **Task 9:** Create generate-ideas/instructions.md (15 min)
- [ ] **Task 10:** Create generate-ideas templates (10 min)
- [ ] **Task 11:** Test generate-ideas workflow (5 min)
- [ ] **Task 12:** Create write-script/workflow.yaml (5 min)
- [ ] **Task 13:** Create write-script/instructions.md (25 min - has all platform templates)
- [ ] **Task 14:** Create write-script templates (YouTube, Reels, LinkedIn, Twitter) (15 min)
- [ ] **Task 15:** Test write-script for each platform (10 min)
- [ ] **Task 16:** Create competitive-analysis/workflow.yaml (5 min)
- [ ] **Task 17:** Create competitive-analysis/instructions.md (10 min)
- [ ] **Task 18:** Create competitive-analysis templates (10 min)
- [ ] **Task 19:** Test competitive-analysis workflow (5 min)
- [ ] **Task 20:** Create research-topic/workflow.yaml (5 min)
- [ ] **Task 21:** Create research-topic/instructions.md (15 min)
- [ ] **Task 22:** Create research-topic templates (10 min)
- [ ] **Task 23:** Test research-topic workflow (5 min)
- [ ] **Task 24:** Create knowledge base files (hook-templates.md, platform-specs.yaml, mcp-tools-reference.md) (15 min)
- [ ] **Task 25:** Integration test - chain workflows (10 min)
- [ ] **Task 26:** Test handoff to Social Posting Agent (10 min)
- [ ] **Task 27:** Test graceful degradation (MCP failures) (10 min)
- [ ] **Task 28:** Documentation - create README for workflows folder (10 min)

**Total Estimated Time:** 3-4 hours

---

## 💡 Tips for One-Pass Success

1. **Follow directory structure exactly** - Paths matter in BMAD
2. **Use provided templates** - Don't invent new patterns
3. **Test incrementally** - Validate each workflow before moving to next
4. **Check MCP availability** - Wrap all MCP calls with availability checks
5. **Preserve evidence** - Always track source links + timestamps
6. **Use custom modules** - Twitter/LinkedIn clients for validation
7. **Create handoff packages** - Other agents need structured JSON
8. **Log everything** - Debug messages for all API calls
9. **Handle errors gracefully** - Fallbacks for missing tools
10. **Keep outputs structured** - Use templates for consistency

---

## 🎬 Ready to Implement!

This PRP provides everything needed for one-pass implementation:

- ✅ Complete directory structure
- ✅ All 5 workflows fully specified (YAML + instructions + templates)
- ✅ MCP integration mapped to specific tool calls
- ✅ Custom module integration (Twitter/LinkedIn)
- ✅ Error handling & fallbacks documented
- ✅ Testing strategy with examples
- ✅ Evidence tracking system
- ✅ Handoff package format for other agents
- ✅ Task checklist in execution order
- ✅ All gotchas documented with solutions

**Estimated implementation time:** 3-4 hours
**Confidence for one-pass success:** 9/10

---

## 📌 PRP Confidence Score: 9/10

**Why 9/10:**

**Strengths (+):**

- ✅ Proven BMAD patterns followed exactly
- ✅ Complete code examples (workflow.yaml + instructions.md)
- ✅ MCP tools thoroughly researched and mapped
- ✅ Custom modules already exist and working
- ✅ Clear task order (28 steps)
- ✅ Testing strategy with specific commands
- ✅ Error handling for all gotchas
- ✅ Evidence-backed by existing working agents

**Risks (-):**

- ⚠️ MCP server availability varies (mitigated with fallbacks)
- ⚠️ Platform-specific formatting quirks (mitigated with custom modules)
- ⚠️ First time creating this many interconnected workflows

**Why not 10/10:**

- Need to verify MCP tools work as documented (some may have changed)
- Workflow chaining hasn't been tested in this exact pattern
- Handoff format needs validation with Social Posting Agent

**Expected Outcome:** Successful one-pass implementation with minor adjustments for MCP integration

---

_Execute with confidence!_
