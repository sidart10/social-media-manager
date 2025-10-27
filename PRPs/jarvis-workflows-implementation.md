# PRP: Jarvis - Content Intelligence Agent Workflows (REVISED)

**Feature:** Build 7 core workflows for Jarvis (research, analysis, ideation, voice learning, content creation)

**Created:** 2025-10-26 (Revised)
**Status:** Ready for Implementation
**Confidence Score:** 9.5/10
**Estimated Time:** 5-6 hours

**Agent:** Jarvis 🎯
**Location:** `bmad/agents/content-intelligence/`

---

## 🎯 Context & Problem Statement

### Current State

**Agent Structure Complete:**
- ✅ Jarvis agent YAML created (`jarvis.agent.yaml`)
- ✅ Sidecar structure created (`jarvis-sidecar/`)
- ✅ Config, instructions, memories files created
- ✅ 7 workflow directories created (empty, ready for implementation)
- ✅ Knowledge base initialized

**Infrastructure Available:**
- ✅ Apify API key configured (`.env`)
- ✅ Twitter API Client module (production-ready)
- ✅ LinkedIn API Client module (production-ready)
- ✅ Social Posting Agent (consumes handoff packages)
- ✅ AI Video Agent (uses scripts)
- ✅ AI Image Generator (creates visuals)

**What We Need:**
- ❌ 7 workflow implementations (YAML + instructions + templates)
- ❌ Apify MCP integration (proper tool syntax)
- ❌ Cost tracking system (estimate + log)
- ❌ Voice profile system (learn + apply)
- ❌ Platform adapters (Instagram, TikTok, Twitter via Apify)

### User's Goal

Build **Jarvis** - a content intelligence powerhouse that:

1. **Researches** topics across multiple sources (trends, data, examples)
2. **Analyzes** profiles on ALL platforms (Twitter, Instagram, TikTok, LinkedIn, YouTube)
3. **Learns** user's authentic writing voice
4. **Generates** evidence-backed Idea Cards
5. **Writes** platform-specific posts (LinkedIn, Twitter, Instagram) in user's voice
6. **Writes** video scripts (YouTube, Reels, TikTok) with timing and visuals
7. **Provides** competitive intelligence and gap analysis

**Critical Boundaries:**
- ✅ Jarvis researches, analyzes, ideates, and creates
- ❌ Jarvis does NOT post (that's Social Posting Agent)
- ❌ Jarvis does NOT create videos (that's AI Video Agent)
- ❌ Jarvis does NOT create images (that's AI Image Generator)

---

## 🏗️ Requirements

### Must Have (MVP) - 7 Core Workflows

**Phase 1: Foundation (No Dependencies)**
1. `research-topic` - Multi-source topic research

**Phase 2: Analysis (Uses Phase 1)**
2. `analyze-profile` - Profile intelligence (ALL platforms via Apify + direct APIs)

**Phase 3: Voice Intelligence (Uses Phase 2)**
3. `learn-voice` - Build user's personal voice profile

**Phase 4: Strategy (Uses Phase 2-3)**
4. `competitive-analysis` - Multi-profile comparison
5. `generate-ideas` - Evidence-backed Idea Cards

**Phase 5: Creation (Uses Phase 3-4)**
6. `write-posts` - Social media posts (LinkedIn, Twitter, Instagram) in user's voice
7. `write-scripts` - Video scripts (YouTube, Reels, TikTok) in user's voice

**Each Workflow Must Have:**
- ✅ workflow.yaml (complete with all variables defined)
- ✅ instructions.md (BMAD XML format, step-by-step)
- ✅ Templates (markdown with clear variable placeholders)
- ✅ MCP integration (real tool syntax, not pseudo-code)
- ✅ Cost estimation (before any paid API call)
- ✅ Cost logging (after every paid API call)
- ✅ Error handling (graceful degradation)
- ✅ Evidence tracking (source links, timestamps)

---

## 📚 Technical Research & Architecture

### Updated MCP Server Stack (Cost-Optimized)

**Tier 1: FREE (Always Try First)**
- **youtube-mcp-server** - YouTube analysis (10k units/day)
- **youtube-transcript** - Video transcripts (unlimited)
- **script-generation-mcp** - Multi-agent script writing (local)
- **twitter-api-client** - YOUR Twitter posts (your API quota)
- **linkedin-api-client** - YOUR LinkedIn OAuth (your account)

**Tier 2: LOW-COST (Specialized Tools)**
- **linkedin-mcp** - LinkedIn analysis (RapidAPI)
- **exa-mcp** - Deep research (paid API)
- **social-media-mcp** - Trends (uses Brave + OpenAI)

**Tier 3: APIFY (Pay-Per-Use, Only When Necessary)**
- **apify_mcp** - Master gateway to 5000+ scrapers
  - Twitter/X: `xtdata/twitter-x-scraper` (~$0.40/1k tweets)
  - Instagram: `apify/instagram-scraper` (~$0.50/1k posts)
  - TikTok: `clockworks/tiktok-scraper` (~$0.50/profile)
  - Facebook, Reddit, Pinterest, and 4997+ more

### Apify MCP Tool Syntax (CRITICAL)

**Real tools available in Apify MCP:**
1. `search-actors` - Find actors in Apify Store
2. `fetch-actor-details` - Get actor requirements/inputs
3. `call-actor` - Execute actor with parameters
4. `get-actor-output` - Retrieve results from dataset

**Reference:** https://docs.apify.com/platform/integrations/mcp

**Example Flow:**

```xml
<!-- Step 1: Find the right actor -->
<action>Search Apify Store for actor</action>
<action>Tool: search-actors</action>
<action>Query: "instagram profile scraper"</action>
<action>Result: List of matching actors</action>
<action>Select: "apify/instagram-scraper" (official, reliable)</action>

<!-- Step 2: Understand actor requirements -->
<action>Fetch actor details</action>
<action>Tool: fetch-actor-details</action>
<action>Actor: "apify/instagram-scraper"</action>
<action>Result: Required inputs (username, max_posts, etc.)</action>

<!-- Step 3: Estimate cost -->
<action>Calculate cost: 100 posts × $0.50/1k = $0.05</action>
<ask>Instagram analysis will cost ~$0.05. Current month: ${{month_total}}/$ 10.00 budget. Proceed? [yes/no]</ask>

<!-- Step 4: Execute actor -->
<check if="user approves">
  <action>Execute actor</action>
  <action>Tool: call-actor</action>
  <action>Actor: "apify/instagram-scraper"</action>
  <action>Inputs: {username: "{{handle}}", maxPosts: 100}</action>
  <action>Result: run_id, dataset_id</action>
</check>

<!-- Step 5: Retrieve results -->
<action>Get actor output</action>
<action>Tool: get-actor-output</action>
<action>Dataset: {{dataset_id}}</action>
<action>Result: Array of posts with engagement data</action>

<!-- Step 6: Log cost -->
<action>Update memories.md:
  Date: {{date}}
  Tool: apify/instagram-scraper
  Units: 100 posts
  Cost: $0.05
  Monthly total: ${{updated_total}}
</action>
```

---

## 💻 Complete Workflow Implementations

### Workflow 1: research-topic (Foundation - Build First)

**Purpose:** Multi-source topic research (no dependencies, good starting point)

**File: `workflows/research-topic/workflow.yaml`**

```yaml
name: research-topic
description: 'Deep topic research with multi-source intelligence aggregation'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
knowledge_folder: '{config_source}:knowledge_folder'
user_name: '{config_source}:user_name'
date: system-generated

# Workflow location
installed_path: '{agent-folder}/workflows/research-topic'

# MCP Tools (Tier 1 & 2 only - all free or low-cost)
mcp_tools_required:
  - script_generation_mcp: [add_note, summarize_notes]
  - exa_mcp: [web_search_exa, deep_researcher_start, deep_researcher_check]
  - social_media_mcp: [get_trending_topics, research_topic]
  - youtube_transcript: [get_transcript]

# Inputs
inputs:
  - topic: 'Main research topic (required)'
  - depth: 'quick|standard|comprehensive (default: standard)'
  - focus_areas: 'Array: [trends, examples, data, quotes, competitors] (default: all)'
  - output_format: 'notes|report|idea-cards (default: report)'
  - max_youtube_videos: 'Max videos to analyze for examples (default: 5)'

# Outputs
outputs:
  - research_brief: 'Executive summary with key findings'
  - content_angles: '10+ ways to approach this topic'
  - research_notes: 'All gathered data organized by category'
  - quotes_library: 'Attributed quotes with sources'
  - data_points: 'Statistics and metrics'

# Action workflow (no template file)
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/research-{topic}-{{date}}.md'
notes_file: '{sessions_folder}/research-{topic}-notes-{{date}}.md'
```

**File: `workflows/research-topic/instructions.md`**

```markdown
# Research Topic Workflow Instructions

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from {agent-folder}/workflows/research-topic/</critical>

<step n="1" goal="Initialize research session">
  <action>Create research session in script_generation_mcp</action>
  <action>Tool: script_generation_mcp/add_note</action>
  <action>Note name: "session_metadata"</action>
  <action>Content: Topic={{topic}}, Depth={{depth}}, Date={{date}}</action>

  <action>Display to user:
    🔍 Research Session Started

    Topic: {{topic}}
    Depth: {{depth}}
    Focus: {{focus_areas}}

    I'll gather intelligence from multiple sources and compile actionable insights.
  </action>

  <template-output>session_initialized</template-output>
</step>

<step n="2" goal="Quick trend scan (Tier 2 - Low cost)">
  <action>Check if 'trends' in {{focus_areas}}</action>

  <check if="trends requested">
    <action>Attempt to call social_media_mcp/get_trending_topics</action>
    <action>Parameters: platform="twitter", category="tech"</action>

    <check if="tool succeeds">
      <action>Filter trends related to {{topic}}</action>
      <action>For each related trend (max 5):
        - Call social_media_mcp/research_topic
        - Extract: Quick facts, hashtags, key statistics
        - Store in notes
      </action>

      <action>Tool: script_generation_mcp/add_note</action>
      <action>Note name: "trends"</action>
      <action>Content: All trend findings with sources</action>
    </check>

    <check if="tool fails">
      <action>Log: "social_media_mcp unavailable - skipping trend scan"</action>
      <action>Continue to next step (graceful degradation)</action>
    </check>
  </check>

  <template-output>trend_research</template-output>
</step>

<step n="3" goal="Deep web research (Tier 2 - Cost varies by depth)">
  <action>Check {{depth}} parameter</action>

  <check if="depth == 'comprehensive'">
    <action>Attempt to call exa_mcp/deep_researcher_start</action>
    <action>Parameters: topic={{topic}}</action>

    <check if="tool succeeds">
      <action>Display: "Deep research initiated... this may take 30-60 seconds"</action>
      <action>Wait 30 seconds</action>

      <action>Call exa_mcp/deep_researcher_check</action>
      <action>Retrieve comprehensive research results</action>

      <action>Extract and categorize:
        - Key insights (main discoveries)
        - Statistics & data points
        - Expert quotes
        - Examples & case studies
        - Trends & timing
      </action>

      <action>Tool: script_generation_mcp/add_note</action>
      <action>Note name: "deep_research"</action>
      <action>Content: All findings organized by category</action>
    </check>

    <check if="tool fails">
      <action>Log: "exa_mcp deep researcher unavailable, falling back to web search"</action>
      <action>Continue with standard depth approach</action>
    </check>
  </check>

  <check if="depth == 'standard' OR depth == 'quick' OR deep_research_failed">
    <action>Attempt to call exa_mcp/web_search_exa</action>
    <action>Parameters: query={{topic}}, max_results=10</action>

    <check if="tool succeeds">
      <action>For each search result:
        - Extract: title, snippet, URL, publication date
        - Identify 3-5 key points
        - Note recency (newer = higher weight)
      </action>

      <action>Tool: script_generation_mcp/add_note</action>
      <action>Note name: "web_research"</action>
      <action>Content: Search findings with source URLs</action>
    </check>

    <check if="tool fails">
      <action>Log: "exa_mcp completely unavailable"</action>
      <action>Suggest: "Manual research or try again later"</action>
    </check>
  </check>

  <template-output>web_research_complete</template-output>
</step>

<step n="4" goal="Find real examples from YouTube (Tier 1 - FREE)">
  <action>Check if 'examples' in {{focus_areas}}</action>

  <check if="examples requested">
    <action>Display: "Searching YouTube for real-world examples..."</action>

    <action>Manual search or use youtube_mcp_server if available:
      - Search query: "{{topic}} tutorial" OR "{{topic}} explained"
      - Sort by: view count + relevance
      - Select top 5 videos
    </action>

    <action>For each video (up to {{max_youtube_videos}}):
      - Tool: youtube_transcript/get_transcript
      - Parameters: url={{video_url}}, lang="en"

      - Extract from transcript:
        • How they explain {{topic}}
        • Specific examples used
        • Memorable quotes
        • Structure patterns
        • Timestamps for key moments

      - Tool: script_generation_mcp/add_note
      - Note name: "youtube_example_{{video_number}}"
      - Content: Transcript insights with URL + timestamps
    </action>

    <action>Display: "Analyzed {{video_count}} YouTube videos for examples"</action>
  </check>

  <template-output>youtube_examples</template-output>
</step>

<step n="5" goal="Synthesize all research">
  <action>Tool: script_generation_mcp/summarize_notes</action>
  <action>Parameters: style="detailed"</action>
  <action>Result: Comprehensive summary of all gathered intelligence</action>

  <action>Organize findings into 5 categories:</action>

  <action>**1. Trends & Timing**
    - What's happening NOW with {{topic}}
    - Why it's relevant/trending
    - Future predictions
    - Source: [URLs]
  </action>

  <action>**2. Data & Statistics**
    - Hard numbers, percentages, metrics
    - Growth rates, market size
    - Survey results
    - Source: [URLs]
  </action>

  <action>**3. Examples & Case Studies**
    - Real-world applications
    - Success stories
    - How others use/discuss this
    - Source: [URLs + timestamps]
  </action>

  <action>**4. Quotes & Expert Opinions**
    - Attributed quotes from research
    - Expert perspectives
    - Contrarian views
    - Source: [URLs]
  </action>

  <action>**5. Gaps & Opportunities**
    - What's NOT being discussed
    - Overlooked angles
    - Underserved audiences
    - Rationale: [Why this is a gap]
  </action>

  <action>For EACH finding, include:
    - The finding itself
    - Source URL
    - Timestamp (if video)
    - Confidence: high|medium|low (based on source quality + recency)
  </action>

  <template-output>synthesized_research</template-output>
</step>

<step n="6" goal="Generate content angles">
  <action>Based on synthesized research, brainstorm 10-12 ways to approach {{topic}}</action>

  <action>Content angle types to consider:</action>

  <action>**Educational:**
    1. Tutorial: "How to [do topic]"
    2. Beginner: "[Topic] explained simply"
    3. Advanced: "Deep dive: [Subtopic]"
  </action>

  <action>**Analytical:**
    4. Teardown: "Breaking down [example]"
    5. Comparison: "[Approach A] vs [Approach B]"
    6. Data: "X surprising stats about [topic]"
  </action>

  <action>**Opinion/Perspective:**
    7. Opinion: "Why [hot take]"
    8. Controversy: "The [topic] debate"
    9. Prediction: "The future of [topic]"
  </action>

  <action>**Experiential:**
    10. Story: "When I tried [topic]..."
    11. Mistakes: "X common [topic] mistakes"
  </action>

  <action>**Trend-Focused:**
    12. Trend: "Why everyone's talking about [topic]"
  </action>

  <action>For EACH angle, provide:
    - Angle title (specific, compelling)
    - Brief description (1-2 sentences)
    - Best platform(s) (YouTube/LinkedIn/Twitter/Reels/Instagram/TikTok)
    - Target audience level (beginner/intermediate/advanced)
    - Supporting research points (which findings from step 5 support this)
    - Confidence: high|medium|low
  </action>

  <template-output>content_angles</template-output>
</step>

<step n="7" goal="Save and present outputs">
  <action>Load template from {installed_path}/templates/research-brief.md</action>
  <action>Fill template with all gathered data:
    - Topic
    - Depth
    - Sources count
    - Findings (all 5 categories)
    - Content angles (10-12)
    - Evidence log
    - Confidence score
  </action>

  <action>Save to {{default_output_file}}</action>

  <check if="output_format == 'idea-cards'">
    <action>Convert top 5-10 content angles into Idea Cards</action>
    <action>Use generate-ideas/templates/idea-card.md format</action>
    <action>Each angle becomes full Idea Card with:
      - Title
      - Hook line (generated from angle)
      - Outline (3-5 beats from research)
      - Evidence (findings from step 5)
      - Platform recommendation
    </action>
    <action>Save Idea Cards to separate file</action>
  </check>

  <check if="output_format == 'notes'">
    <action>Save as bullet-point quick reference</action>
    <action>Save to {{notes_file}}</action>
  </check>

  <action>Display to user:

    ✅ Research Complete: {{topic}}

    **Stats:**
    - Depth: {{depth}}
    - Sources: {{source_count}}
    - YouTube videos analyzed: {{youtube_count}}

    **Top 3 Findings:**
    1. {{finding_1_summary}}
    2. {{finding_2_summary}}
    3. {{finding_3_summary}}

    **Content Angles:** {{angle_count}} ways to approach this topic

    📄 Full Research: {{default_output_file}}

    **Suggested Next Steps:**
    - Pick angle(s) that resonate
    - Use /generate-ideas to develop into Idea Cards
    - Use /analyze-profile to see how competitors cover this
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

**File: `workflows/research-topic/templates/research-brief.md`**

```markdown
# Research Brief: {topic}

**Researched:** {date}
**Depth:** {depth}
**Requested by:** {user_name}
**Sources Analyzed:** {source_count}

---

## Executive Summary

{executive_summary}

**Key Takeaway:** {key_takeaway}

---

## Findings

### 1. Trends & Timing

{trends_section}

**Sources:** {trend_sources}

---

### 2. Data & Statistics

{data_section}

**Sources:** {data_sources}

---

### 3. Examples & Case Studies

{examples_section}

**Sources:** {example_sources}

---

### 4. Quotes & Expert Opinions

{quotes_section}

**Sources:** {quote_sources}

---

### 5. Gaps & Opportunities

{gaps_section}

---

## Content Angles ({angle_count} ways to approach this topic)

{#content_angles}

### Angle {angle_number}: {angle_title}

**Description:** {angle_description}

**Best Platform(s):** {platform_recommendation}

**Target Audience:** {audience_level}

**Supporting Research:**
{supporting_findings}

**Confidence:** {confidence}/10

---

{/content_angles}

## Evidence Log

All findings backed by sources:

{#evidence_items}
- [{evidence_title}]({evidence_url}) {#timestamp}@ {timestamp}{/timestamp}
  - {evidence_snippet}
  - Confidence: {confidence_level}
{/evidence_items}

---

## Next Steps

**To develop ideas from this research:**
```
/generate-ideas seed_topic="{topic}" use_research_file="{this_file}"
```

**To see how competitors handle this topic:**
```
/analyze-profile url="competitor_url"
```

---

*Generated by Jarvis - Content Intelligence Agent*
*Research completed: {timestamp}*
```

---

### Workflow 2: analyze-profile (ALL Platforms via Apify)

**Purpose:** Profile intelligence on ANY platform (Twitter, Instagram, TikTok, LinkedIn, YouTube)

**File: `workflows/analyze-profile/workflow.yaml`**

```yaml
name: analyze-profile
description: 'Deep profile analysis on ANY platform with pattern extraction and evidence'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/analyze-profile'

# MCP Tools (Multi-tier approach)
mcp_tools_required:
  # Tier 1: FREE
  - youtube_mcp_server: [get_channel_details, get_channel_videos, analyze_video_engagement]
  - youtube_transcript: [get_transcript]

  # Tier 2: Low-cost
  - linkedin_mcp: [fetch_and_save_linkedin_posts, get_top_posts, search_posts, get_posts_by_date]
  - exa_mcp: [linkedin_search]

  # Tier 3: Apify (pay-per-use)
  - apify_mcp: [search-actors, fetch-actor-details, call-actor, get-actor-output]

# Custom Modules
custom_modules:
  - twitter_api_client: 'For analyzing YOUR Twitter account (free)'

# Inputs
inputs:
  - profile_url: 'URL to analyze (required)'
  - platform: 'auto-detect or specify: twitter|instagram|tiktok|linkedin|youtube'
  - window_days: 'Analysis window in days (default: 90)'
  - analysis_depth: 'quick|standard|deep (default: standard)'
  - extract_transcripts: 'boolean, for YouTube only (default: true)'
  - is_your_profile: 'boolean, use free APIs if true (default: false)'

# Outputs
outputs:
  - profile_summary: 'Bio, metrics, posting cadence'
  - content_strategy: 'Content mix, topics, hooks, timing'
  - top_performers: 'Top 10 posts with engagement + URLs'
  - pattern_library: 'Winning patterns across hooks, formats, topics'
  - recommendations: '5-7 actionable recommendations with evidence'
  - cost_log: 'API usage and cost for this analysis'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/profile-analysis-{platform}-{handle}-{{date}}.md'
```

**File: `workflows/analyze-profile/instructions.md`**

```markdown
# Analyze Profile Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Cost optimization: Try FREE tools before PAID</critical>

<step n="1" goal="Detect platform and validate URL">
  <action>Parse {{profile_url}} to extract platform and handle/ID</action>

  <action>Platform detection patterns:
    - twitter.com OR x.com → platform = "twitter"
    - instagram.com → platform = "instagram"
    - tiktok.com → platform = "tiktok"
    - linkedin.com/in/ → platform = "linkedin"
    - youtube.com/@handle OR /channel/ → platform = "youtube"
  </action>

  <action>Extract handle/username from URL</action>
  <action>Store: {{platform}}, {{handle}}</action>

  <action>Display to user:
    🔍 Platform detected: {{platform}}
    👤 Profile: {{handle}}

    Analyzing last {{window_days}} days of content...
  </action>

  <template-output>platform_detected</template-output>
</step>

<step n="2" goal="Fetch content using cost-optimized approach">
  <action>Set max_posts based on {{analysis_depth}}:
    - quick: 20 posts
    - standard: 50 posts
    - deep: 100 posts
  </action>

  <!-- YOUTUBE (Tier 1 - FREE) -->
  <check if="platform == 'youtube'">
    <action>Attempt tool: youtube_mcp_server/get_channel_details</action>
    <action>Parameters: channel_id={{handle}}</action>

    <check if="tool succeeds">
      <action>Extract: subscriber_count, total_views, description, joined_date</action>
      <action>Store channel metadata</action>

      <action>Tool: youtube_mcp_server/get_channel_videos</action>
      <action>Parameters: channel_id={{handle}}, max_results={{max_posts}}</action>
      <action>Result: Array of recent videos with basic stats</action>

      <action>For top performing videos (by views):
        - Tool: youtube_mcp_server/analyze_video_engagement
        - Parameters: video_id={{video_id}}
        - Extract: engagement rate, like ratio, comment density
      </action>

      <action>Cost: $0 (FREE tier - log units used)</action>
      <action>Display: "✓ FREE YouTube API used ({{units_used}}/10,000 quota)"</action>
    </check>

    <check if="tool fails OR quota exceeded">
      <action>Log: "YouTube API unavailable or quota exceeded"</action>
      <action>Fallback to Apify</action>

      <action>Tool: apify_mcp/search-actors</action>
      <action>Query: "youtube channel scraper"</action>
      <action>Select actor: "apify/youtube-scraper"</action>

      <action>Estimate cost: ~$0.40 for channel analysis</action>
      <ask>YouTube API unavailable. Use Apify scraper? (~$0.40)

      Current month: ${{month_total}}/$ 10.00 budget
      Proceed? [yes/no/cancel]
      </ask>

      <check if="user approves">
        <action>Tool: apify_mcp/call-actor</action>
        <action>Actor: "apify/youtube-scraper"</action>
        <action>Inputs: {channelUrl: {{profile_url}}, maxVideos: {{max_posts}}}</action>
        <action>Store: run_id, dataset_id</action>

        <action>Tool: apify_mcp/get-actor-output</action>
        <action>Dataset: {{dataset_id}}</action>
        <action>Parse results for video data</action>

        <action>Log cost to memories.md:
          - Date: {{date}}
          - Tool: apify/youtube-scraper
          - Units: {{max_posts}} videos
          - Cost: $0.40
          - Monthly total: ${{updated_total}}
        </action>
      </check>

      <check if="user declines">
        <action>Return partial results: "Analysis incomplete - YouTube data unavailable"</action>
      </check>
    </check>
  </check>

  <!-- LINKEDIN (Tier 2 - Low cost via RapidAPI) -->
  <check if="platform == 'linkedin'">
    <action>Attempt tool: linkedin_mcp/fetch_and_save_linkedin_posts</action>
    <action>Parameters: username={{handle}}</action>

    <check if="tool succeeds">
      <action>Tool: linkedin_mcp/get_posts_by_date</action>
      <action>Calculate date range: start={{today minus window_days}}, end={{today}}</action>
      <action>Retrieve posts in date range</action>

      <action>Tool: linkedin_mcp/get_top_posts</action>
      <action>Parameters: metric="Like Count", top_n=10</action>
      <action>Extract top performers</action>

      <action>Display: "✓ LinkedIn data fetched via linkedin-mcp"</action>
      <action>Note: "RapidAPI charges may apply (check RapidAPI dashboard)"</action>
    </check>

    <check if="tool fails">
      <action>Log: "linkedin-mcp unavailable"</action>
      <action>Suggest fallback: "Use exa_mcp/linkedin_search for basic info OR Apify"</action>
    </check>
  </check>

  <!-- TWITTER (Tier 1 if yours, Tier 3 if competitor) -->
  <check if="platform == 'twitter'">
    <action>Determine if {{handle}} is user's account</action>
    <ask>Is @{{handle}} YOUR Twitter account? [yes/no]</ask>

    <check if="is your account">
      <action>Display: "Using your Twitter API credentials (FREE)"</action>

      <action>Note: Use twitter-api-client to fetch YOUR timeline</action>
      <action>This requires custom implementation (Twitter API v2 timeline endpoint)</action>
      <action>Alternative: Manually provide recent tweets OR use Apify</action>

      <ask>Twitter timeline fetch not yet implemented.
      Options:
      1. Use Apify to scrape YOUR profile (~$0.02)
      2. Manually paste recent tweets
      3. Skip Twitter analysis for now

      Select: [1/2/3]
      </ask>
    </check>

    <check if="is competitor account">
      <action>Display: "Analyzing competitor Twitter profile via Apify"</action>

      <action>Tool: apify_mcp/search-actors</action>
      <action>Query: "twitter profile scraper"</action>
      <action>Select actor: "xtdata/twitter-x-scraper" (reliable, good reviews)</action>

      <action>Tool: apify_mcp/fetch-actor-details</action>
      <action>Actor: "xtdata/twitter-x-scraper"</action>
      <action>Review required inputs: {username, maxTweets}</action>

      <action>Calculate cost: {{max_posts}} tweets × $0.40/1000 = ${{estimated_cost}}</action>
      <action>Display cost: "~${{estimated_cost}} for {{max_posts}} tweets"</action>

      <ask>Apify Twitter scraper cost: ~${{estimated_cost}}

      Current month: ${{month_total}}/$ 10.00 budget
      Remaining: ${{remaining_budget}}

      Proceed? [yes/no]
      </ask>

      <check if="user approves">
        <action>Tool: apify_mcp/call-actor</action>
        <action>Actor: "xtdata/twitter-x-scraper"</action>
        <action>Inputs: {username: {{handle}}, maxTweets: {{max_posts}}}</action>
        <action>Wait for completion (usually 10-30s)</action>
        <action>Store: run_id={{run_id}}, dataset_id={{dataset_id}}</action>

        <action>Tool: apify_mcp/get-actor-output</action>
        <action>Dataset: {{dataset_id}}</action>
        <action>Parse results: tweets[], engagement_data, profile_stats</action>

        <action>Log cost to memories.md:
          - Date: {{date}}
          - Workflow: analyze-profile
          - Platform: Twitter
          - Tool: apify/xtdata/twitter-x-scraper
          - Units: {{max_posts}} tweets
          - Cost: ${{actual_cost}}
          - Monthly total: ${{updated_total}}
        </action>

        <action>Display: "✓ Fetched {{tweet_count}} tweets (Cost: ${{actual_cost}})"</action>
      </check>

      <check if="user declines">
        <action>Return: "Analysis cancelled - user declined Apify cost"</action>
        <action>Exit workflow</action>
      </check>
    </check>
  </check>

  <!-- INSTAGRAM (Tier 3 - Apify only, no free alternative) -->
  <check if="platform == 'instagram'">
    <action>Display: "Instagram analysis requires Apify (no free API available)"</action>

    <action>Tool: apify_mcp/search-actors</action>
    <action>Query: "instagram profile scraper"</action>
    <action>Select actor: "apify/instagram-scraper" (official, most reliable)</action>

    <action>Tool: apify_mcp/fetch-actor-details</action>
    <action>Actor: "apify/instagram-scraper"</action>
    <action>Review inputs: {username, resultsLimit}</action>

    <action>Calculate cost: {{max_posts}} posts × $0.50/1000 = ${{estimated_cost}}</action>

    <ask>Instagram Analysis Cost Breakdown:
    - Actor: apify/instagram-scraper
    - Posts to analyze: {{max_posts}}
    - Estimated cost: ~${{estimated_cost}}

    Current budget:
    - This month: ${{month_total}}/$ 10.00
    - After this: ${{projected_total}}

    Proceed? [yes/no]
    </ask>

    <check if="user approves">
      <action>Tool: apify_mcp/call-actor</action>
      <action>Actor: "apify/instagram-scraper"</action>
      <action>Inputs: {username: {{handle}}, resultsLimit: {{max_posts}}}</action>
      <action>Store: run_id, dataset_id</action>

      <action>Display: "Instagram scraper running... (usually 20-60s)"</action>

      <action>Tool: apify_mcp/get-actor-output</action>
      <action>Dataset: {{dataset_id}}</action>
      <action>Parse: posts[], likes, comments, engagement_rate, follower_count</action>

      <action>Log cost to memories.md (same format as Twitter)</action>
      <action>Display: "✓ Fetched {{post_count}} Instagram posts (Cost: ${{actual_cost}})"</action>
    </check>

    <check if="user declines">
      <action>Return: "Analysis cancelled"</action>
      <action>Exit workflow</action>
    </check>
  </check>

  <!-- TIKTOK (Tier 3 - Apify only) -->
  <check if="platform == 'tiktok'">
    <action>Tool: apify_mcp/search-actors</action>
    <action>Query: "tiktok profile scraper"</action>
    <action>Select: "clockworks/tiktok-scraper" OR "autoscraping/tiktok-profile"</action>

    <action>Estimate cost: ~$0.50 per profile</action>

    <ask>TikTok Analysis (Apify):
    - Estimated cost: ~$0.50
    - Current month: ${{month_total}}

    Proceed? [yes/no]
    </ask>

    <check if="approved">
      <action>Execute actor (same pattern as Instagram)</action>
      <action>Parse: videos[], views, likes, comments, profile_data</action>
      <action>Log cost</action>
    </check>
  </check>

  <template-output>content_fetched</template-output>
</step>

<step n="3" goal="Extract top performers">
  <action>Sort all posts/videos by engagement rate</action>
  <action>Normalize by follower count (if available)</action>
  <action>Select top 10 performers</action>

  <action>For each top post, extract:
    - Content (text/title/caption)
    - Metrics (likes, comments, shares, views)
    - Engagement rate (%)
    - Timestamp/date posted
    - Format (text, image, video, carousel, reel)
    - URL (direct link to post/video)
  </action>

  <action>Store as structured data for pattern analysis</action>

  <template-output>top_performers_extracted</template-output>
</step>

<step n="4" goal="Mine content patterns">
  <action>Analyze top 10 performers for patterns</action>

  <action>**Hook Pattern Analysis:**
    Count and categorize opening lines:
    - Question hooks: Starts with Why/How/What/Do/Have/Can
    - Number hooks: Starts with digit or "X ways/things/tools"
    - Story hooks: Starts with "I/When I/Last week/Yesterday"
    - Reveal hooks: "The secret/Nobody tells/Here's what"
    - Imperative hooks: Starts with verb (Learn/Discover/Stop/Start)

    Calculate % distribution
    Identify most common type
    Extract 2-3 example hooks for each type found
  </action>

  <action>**Topic Clustering:**
    Extract main topic/theme from each post
    Group by similarity (keyword matching)
    Identify 5-8 topic clusters
    Count frequency per cluster
    Rank by engagement
  </action>

  <action>**Format Distribution:**
    Categorize each post by format
    Calculate percentages:
    - Text-only: X%
    - Image/photo: Y%
    - Video (short < 3min): Z%
    - Video (long > 3min): W%
    - Carousel/gallery: V%

    Note which format has highest avg engagement
  </action>

  <action>**Timing Patterns:**
    For each post, extract:
    - Day of week (Mon-Sun)
    - Hour of day (0-23)

    Identify:
    - Most common posting days
    - Most common posting hours
    - Best performing times (engagement correlation)
  </action>

  <action>**CTA Pattern Recognition:**
    Extract call-to-action from each post
    Identify common CTAs:
    - "Comment below"
    - "Share if you agree"
    - "Follow for more"
    - "Tag someone who needs this"
    - "Save this for later"
    - Question-based CTAs

    Note most common + most effective
  </action>

  <template-output>patterns_mined</template-output>
</step>

<step n="5" goal="Extract transcript insights (YouTube/TikTok only)">
  <check if="platform == 'youtube' AND extract_transcripts == true">
    <action>Select top 5 videos by views</action>

    <action>For each video:
      - Tool: youtube_transcript/get_transcript
      - Parameters: url={{video_url}}, lang="en"

      - From transcript, extract:
        • Hook (first 10 seconds / ~30-50 words)
        • Structure markers ("first", "next", "finally", "here's why", numbers)
        • Key quotes (memorable phrases)
        • Transition techniques
        • CTA placement and wording

      - Identify script structure type:
        • Problem → Solution → CTA
        • Listicle (X ways to...)
        • Story arc (intro → conflict → resolution)
        • Tutorial (step-by-step with examples)
    </action>

    <action>Summarize common patterns across transcripts</action>
    <action>Cost: $0 (youtube-transcript is FREE)</action>
  </check>

  <check if="platform == 'tiktok'">
    <action>Note: TikTok transcripts not reliably available</action>
    <action>Analyze from video titles and captions instead</action>
  </check>

  <template-output>transcript_insights</template-output>
</step>

<step n="6" goal="Generate profile summary">
  <action>Compile comprehensive profile summary</action>
  <action>Load template: {installed_path}/templates/profile-summary.md</action>

  <action>Fill template sections:</action>

  <action>**Profile Overview:**
    - Platform: {{platform}}
    - Handle: @{{handle}}
    - Followers/Subscribers: {{follower_count}}
    - Bio/Description: {{bio}}
    - Posting cadence: {{posts_per_week}} posts/week
    - Analysis window: {{window_days}} days
    - Posts analyzed: {{posts_analyzed}}
  </action>

  <action>**Content Strategy:**
    - Content mix: {{format_percentages}}
    - Top topics: {{top_5_topics}}
    - Hook preference: {{most_common_hook_type}} ({{percentage}}%)
    - Posting rhythm: {{best_days}} at {{best_times}}
    - CTA style: {{common_cta_pattern}}
  </action>

  <action>**What Works (Top 3):**
    - Best format: {{top_format}} ({{engagement_lift}} vs average)
    - Best topic: {{top_topic}} ({{avg_engagement}})
    - Best hook type: {{top_hook}} with examples
    - Best posting time: {{optimal_time}}
  </action>

  <action>**Evidence:**
    List all top 10 posts with:
    - Title/text snippet
    - URL (clickable)
    - Engagement metrics
    - Why it worked (format + topic + hook combo)
  </action>

  <template-output>profile_summary_compiled</template-output>
</step>

<step n="7" goal="Generate actionable recommendations">
  <action>Based on patterns, create 5-7 specific recommendations</action>

  <action>Each recommendation must have:
    - **Finding:** What the data shows
    - **Evidence:** Specific examples with links
    - **Recommendation:** What to do
    - **Expected impact:** Predicted outcome
    - **Confidence:** high|medium|low
  </action>

  <action>Example structure:

    **Recommendation 1: Format**
    Finding: Video posts drive 3.2x engagement vs text posts
    Evidence: Top video got 450 likes vs text posts avg 140 likes
    - [Example video](url)
    - [Another example](url)
    Recommendation: Create more video content (Reels, TikTok, YouTube Shorts)
    Expected Impact: 2-3x engagement increase
    Confidence: High (based on 50 post sample)

  </action>

  <template-output>recommendations_generated</template-output>
</step>

<step n="8" goal="Save outputs and present">
  <action>Compile all sections into final markdown document</action>
  <action>Use template: {installed_path}/templates/profile-summary.md</action>
  <action>Save to: {{default_output_file}}</action>

  <action>Display to user:

    ✅ Profile Analysis Complete!

    **Profile:** @{{handle}} ({{platform}})
    **Posts Analyzed:** {{post_count}}
    **Window:** {{window_days}} days

    **Key Findings:**
    - Top format: {{top_format}} ({{lift}} higher engagement)
    - Top topic: {{top_topic}}
    - Top hook: {{top_hook_type}}
    - Best time: {{optimal_posting_time}}

    **Cost:** ${{total_cost}} ({{cost_breakdown}})

    📄 Full Report: {{default_output_file}}

    **Suggested Next Steps:**
    1. Review full report
    2. Use /generate-ideas to create content based on these patterns
    3. Use /competitive-analysis to compare with competitors
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

---

### Workflow 3: learn-voice (CRITICAL for Voice-Adaptive Writing)

**Purpose:** Analyze user's content to build authentic voice profile

**File: `workflows/learn-voice/workflow.yaml`**

```yaml
name: learn-voice
description: 'Analyze user content to build personalized voice profile for authentic content generation'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/learn-voice'

# MCP Tools (Cost-optimized for user's own content)
mcp_tools_required:
  - youtube_mcp_server: [get_channel_videos]
  - youtube_transcript: [get_transcript]
  - linkedin_mcp: [fetch_and_save_linkedin_posts, get_saved_posts]
  - apify_mcp: [call-actor, get-actor-output]  # Fallback only

# Custom Modules (FREE for user's own account)
custom_modules:
  - twitter_api_client: 'Fetch YOUR tweets (preferred - free)'

# Inputs
inputs:
  - user_twitter_handle: 'Your Twitter @handle (optional)'
  - user_linkedin_url: 'Your LinkedIn profile URL (optional)'
  - user_youtube_channel: 'Your YouTube channel URL (optional)'
  - min_posts_required: 'Minimum posts for accurate profile (default: 20)'
  - include_video_voice: 'boolean, analyze spoken voice from videos (default: true if YouTube provided)'

# Outputs
outputs:
  - voice_profile: 'Comprehensive writing style analysis'
  - signature_elements: 'Commonly used phrases and patterns'
  - platform_variations: 'How voice changes per platform'
  - confidence_score: 'Profile accuracy rating (based on sample size)'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Voice profile saves to memories.md (not separate file)
voice_profile_location: '{agent-folder}/memories.md'
```

**File: `workflows/learn-voice/instructions.md`**

```markdown
# Learn Voice Workflow Instructions

<workflow>
<critical>This workflow MUST complete before write-posts or write-scripts can generate authentic content</critical>
<critical>Prioritize FREE tools (user's own APIs) over paid tools</critical>

<step n="1" goal="Gather user's profile URLs">
  <ask>I'll analyze your writing to match your authentic voice!

  Please provide your profile URLs (need at least 1, ideally 2-3):

  1. Twitter: Your @handle or profile URL
  2. LinkedIn: Your profile URL
  3. YouTube: Your channel URL (I'll analyze your spoken voice too)

  Note: I need at least {{min_posts_required}} posts total for accurate analysis.

  Provide URLs (one per line or comma-separated):
  </ask>

  <action>Parse provided URLs</action>
  <action>Extract platforms and handles</action>
  <action>Store: {{platforms_provided}}, {{handles}}</action>

  <template-output>profiles_collected</template-output>
</step>

<step n="2" goal="Fetch YOUR content (cost-optimized)">
  <action>Display: "Fetching your content using free APIs where possible..."</action>

  <!-- TWITTER - Use YOUR API (Tier 1 - FREE) -->
  <check if="twitter_handle provided">
    <action>Display: "Twitter: Using your API credentials (FREE)"</action>

    <action>Note: twitter-api-client doesn't have timeline fetch yet</action>
    <action>Workaround options:</action>

    <ask>To fetch your Twitter posts:
    1. Use Apify scraper (~$0.02 for 50 tweets)
    2. I'll guide you to export from Twitter (FREE but manual)
    3. Skip Twitter for now

    Select: [1/2/3]
    </ask>

    <check if="option 1 selected">
      <action>Use Apify: xtdata/twitter-x-scraper</action>
      <action>Parameters: username={{handle}}, maxTweets=50</action>
      <action>Cost: ~$0.02</action>
      <action>Log cost</action>
    </check>

    <check if="option 2 selected">
      <action>Guide user:
        1. Go to twitter.com/{{handle}}
        2. Scroll to load last 20-30 tweets
        3. Copy tweet texts
        4. Paste here

        (I'll parse the content)
      </action>
    </check>
  </check>

  <!-- LINKEDIN - Use linkedin-mcp (Tier 2 - Low cost) -->
  <check if="linkedin_url provided">
    <action>Tool: linkedin_mcp/fetch_and_save_linkedin_posts</action>
    <action>Parameters: username={{handle}}</action>

    <check if="succeeds">
      <action>Tool: linkedin_mcp/get_saved_posts</action>
      <action>Parameters: start=0, limit=50</action>
      <action>Store posts for analysis</action>
      <action>Display: "✓ Fetched {{post_count}} LinkedIn posts"</action>
    </check>

    <check if="fails">
      <action>Fallback: Use Apify linkedin scraper (estimate cost, ask approval)</action>
    </check>
  </check>

  <!-- YOUTUBE - Use FREE API (Tier 1) -->
  <check if="youtube_channel provided AND include_video_voice == true">
    <action>Tool: youtube_mcp_server/get_channel_videos</action>
    <action>Parameters: channel_id={{channel_id}}, max_results=10</action>

    <action>For each video:
      - Tool: youtube_transcript/get_transcript
      - Extract spoken words (analyze verbal voice)
    </action>

    <action>Display: "✓ Analyzed {{video_count}} YouTube transcripts (FREE)"</action>
  </check>

  <action>Total posts collected: {{total_posts}}</action>

  <check if="total_posts < min_posts_required">
    <ask>⚠️  Only collected {{total_posts}} posts. Need {{min_posts_required}}+ for accurate voice profile.

    Options:
    1. Continue anyway (lower confidence score)
    2. Provide more profile URLs
    3. Reduce min_posts_required threshold

    Select: [1/2/3]
    </ask>
  </check>

  <template-output>content_collected</template-output>
</step>

<step n="3" goal="Analyze writing patterns">
  <action>Display: "Analyzing your writing style across {{total_posts}} posts..."</action>

  <action>**Vocabulary Analysis:**
    - Technical term frequency (count specialized words)
    - Complexity level: simple|moderate|advanced
      • Simple: < 10% technical terms, short sentences
      • Moderate: 10-30% technical terms, mixed length
      • Advanced: > 30% technical terms, complex sentences
    - Jargon vs accessible language ratio
    - Common word choices (create frequency map)
  </action>

  <action>**Sentence Structure Analysis:**
    - Calculate average sentence length (words)
    - Count short (< 10 words) vs long (> 20 words) sentences
    - Identify rhythm pattern:
      • Staccato: Mostly short sentences
      • Flowing: Mostly long sentences
      • Varied: Mix of short and long (most engaging)
    - Note sentence complexity (simple vs compound vs complex)
  </action>

  <action>**Tone Marker Extraction:**
    - Formality indicators: "Furthermore" vs "Plus", "Utilize" vs "Use"
    - Humor presence: Jokes, sarcasm, self-deprecation count
    - Enthusiasm markers: Exclamation points, caps, energetic words ("amazing", "excited")
    - Personal vs professional: "I think" vs "Research shows"
    - Calculate tone score: 1-10 (1=very formal, 10=very casual)
  </action>

  <action>**Signature Phrase Extraction:**
    - Find phrases used 3+ times
    - Common transitions: "here's the thing", "but", "so", "and"
    - Opening phrases: How user starts posts
    - Closing phrases: How user ends posts
    - Filler patterns: "actually", "basically", "literally"
    - Create ranked list by frequency
  </action>

  <action>**Emoji Usage Analysis:**
    - Count emoji frequency: never|rare|moderate|heavy
      • Never: 0 emojis
      • Rare: < 0.5 per post
      • Moderate: 1-2 per post
      • Heavy: 3+ per post
    - Placement pattern: beginning|middle|end|scattered
    - Type preferences: professional (📊📈) vs playful (🎉😊) vs specific meanings (🚀💡)
  </action>

  <action>**Hook Preference Identification:**
    - Categorize user's natural hooks (from their actual posts)
    - Calculate distribution:
      • Question hooks: X%
      • Number hooks: Y%
      • Story hooks: Z%
      • Statement hooks: W%
    - Identify natural tendency (which type user gravitates to)
  </action>

  <template-output>patterns_analyzed</template-output>
</step>

<step n="4" goal="Detect platform variations">
  <check if="multiple platforms provided">
    <action>Compare writing style across platforms</action>

    <action>**Twitter vs LinkedIn (if both available):**
      - Formality difference (tone score delta)
      - Length difference (avg words per post)
      - Emoji usage difference
      - Topic difference (professional vs personal)
      - Note: "On LinkedIn, user is X% more formal"
    </action>

    <action>**Written vs Spoken (if YouTube available):**
      - Vocabulary in videos vs posts
      - Sentence complexity difference
      - Conversational markers in videos ("um", "you know", "right?")
      - Teaching mode indicators
      - Note: "Spoken voice is more [casual/explanatory/energetic]"
    </action>
  </check>

  <check if="only one platform">
    <action>Note: "Single platform analyzed - voice profile based on {{platform}} only"</action>
    <action>Suggest: "For more accurate profile, provide LinkedIn/Twitter/YouTube URLs"</action>
  </check>

  <template-output>platform_variations_detected</template-output>
</step>

<step n="5" goal="Build comprehensive voice profile">
  <action>Compile all findings into voice profile structure</action>

  <action>**Voice Profile Format:**

    # Voice Profile: {{user_name}}

    **Status:** Complete ✅
    **Analyzed:** {{date}}
    **Sources:** {{platform_breakdown}}
    **Total Posts:** {{total_posts}}
    **Confidence Score:** {{confidence}}/10
      (20-30 posts: 6/10, 30-50 posts: 7/10, 50-100 posts: 8/10, 100+ posts: 9/10)

    ---

    ## Writing Characteristics

    **Vocabulary Level:** {{vocab_level}} (simple|moderate|advanced)
    **Sentence Structure:** {{sentence_pattern}} (staccato|flowing|varied)
    **Average Sentence Length:** {{avg_length}} words
    **Tone Score:** {{tone_score}}/10 (1=formal, 10=casual)
    **Overall Tone:** {{tone_description}}

    ---

    ## Signature Elements

    **Most Used Phrases:**
    {{#top_phrases}}
    - "{{phrase}}" (appears {{count}} times in {{total_posts}} posts)
    {{/top_phrases}}

    **Transition Words:** {{transition_style}}
    **Opening Style:** {{typical_opening}}
    **Closing Style:** {{typical_closing}}

    **Hook Preferences (Natural Tendency):**
    - Question: {{question_pct}}%
    - Number: {{number_pct}}%
    - Story: {{story_pct}}%
    - Statement: {{statement_pct}}%

    **Preferred Hook Type:** {{top_hook_type}} (use this most often)

    **Emoji Usage:**
    - Frequency: {{emoji_freq}} (never|rare|moderate|heavy)
    - Placement: {{emoji_placement}}
    - Favorite types: {{emoji_types}}

    **Humor Style:** {{humor_description}}

    ---

    ## Platform Variations

    {{#twitter}}
    **Twitter:**
    - Tone: {{twitter_tone}}
    - Length: {{twitter_avg_words}} words avg
    - Style: {{twitter_style_notes}}
    {{/twitter}}

    {{#linkedin}}
    **LinkedIn:**
    - Tone: {{linkedin_tone}}
    - Length: {{linkedin_avg_words}} words avg
    - Style: {{linkedin_style_notes}}
    {{/linkedin}}

    {{#youtube}}
    **YouTube (Spoken):**
    - Delivery: {{youtube_delivery}}
    - Teaching style: {{teaching_approach}}
    - Conversational markers: {{spoken_patterns}}
    {{/youtube}}

    ---

    ## Voice Matching Guidelines

    When writing as {{user_name}}, ALWAYS:

    1. {{guideline_1}}
    2. {{guideline_2}}
    3. {{guideline_3}}
    4. {{guideline_4}}
    5. {{guideline_5}}

    **Do:**
    {{#do_patterns}}
    - {{pattern}}
    {{/do_patterns}}

    **Don't:**
    {{#dont_patterns}}
    - {{pattern}}
    {{/dont_patterns}}

    ---

    ## Example Transformations

    **Generic AI voice:**
    "This tool can help you automate your workflow and save significant time on repetitive tasks."

    **{{user_name}}'s authentic voice:**
    "{{user_voice_example}}"

    **Why the difference:**
    - {{explanation_1}}
    - {{explanation_2}}

    ---

    *Voice profile will improve as more content is analyzed*
    *Run /learn-voice again after posting 50+ new pieces of content*

  </action>

  <action>Save voice profile to memories.md (replace "Voice Profile" section)</action>
  <action>Update voice_profile_status in memories.md: "complete"</action>
  <action>Update voice_profile_date: {{date}}</action>
  <action>Update confidence_score: {{confidence}}</action>

  <template-output>voice_profile_saved</template-output>
</step>

<step n="6" goal="Present results to user">
  <action>Display:

    ✅ Voice Profile Complete!

    **Analyzed:**
    - {{total_posts}} posts across {{platform_count}} platforms
    - {{twitter_count}} Twitter + {{linkedin_count}} LinkedIn + {{youtube_count}} YouTube

    **Your Writing DNA:**
    - Vocabulary: {{vocab_level}}
    - Tone: {{tone_description}} ({{tone_score}}/10)
    - Sentence style: {{sentence_pattern}}
    - Hook preference: {{top_hook_type}}
    - Signature phrase: "{{most_common_phrase}}"
    - Emoji usage: {{emoji_freq}}

    **Confidence:** {{confidence}}/10
    {{#confidence < 7}}
    ⚠️  Based on limited sample. Profile will improve with more content.
    {{/confidence}}

    📄 Full Profile: Saved to memories.md

    **What This Unlocks:**
    ✅ /write-posts - Posts that sound like YOU
    ✅ /write-scripts - Scripts in your authentic voice
    ✅ All content generation is now voice-aware

    **Next Steps:**
    - Use /write-posts or /write-scripts
    - Content will match your style automatically
    - Re-run /learn-voice after 50+ new posts to refine
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

---

### Workflow 4: generate-ideas (Uses research + analysis)

**File: `workflows/generate-ideas/workflow.yaml`**

```yaml
name: generate-ideas
description: 'Generate evidence-backed Idea Cards with hooks, outlines, and platform recommendations'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/generate-ideas'

# MCP Tools
mcp_tools_required:
  - script_generation_mcp: [add_note, summarize_notes]
  - social_media_mcp: [get_trending_topics, research_topic]
  - exa_mcp: [web_search_exa, deep_researcher_start, deep_researcher_check]

# Inputs
inputs:
  - seed_topic: 'Main topic or theme (required)'
  - target_platforms: 'Array: [twitter, instagram, tiktok, linkedin, youtube, reels] (default: all)'
  - competitor_urls: 'Optional: Competitor profile URLs to analyze for gaps'
  - idea_count: 'Number of ideas to generate (default: 10)'
  - style: 'tutorial|opinion|story|teardown|announcement|mixed (default: mixed)'
  - use_trends: 'boolean, incorporate trending topics (default: true)'
  - use_research_file: 'Optional: Path to research-topic output to use as source'

# Outputs
outputs:
  - idea_cards: 'Structured ideas with hooks, outlines, evidence'
  - hook_pack: '10+ hook variations for quick use'
  - content_calendar: '7-14 day posting schedule'
  - evidence_summary: 'All sources cited'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/idea-cards-{seed_topic}-{{date}}.md'
```

**(Full instructions.md similar to original PRP but with:**
- Cost estimation before any Apify calls
- Uses research-topic output if provided
- Can invoke analyze-profile for competitors
- Logs all API costs)**

---

### Workflow 5: write-posts (Voice-Aware Social Media Content)

**Purpose:** Write LinkedIn, Twitter, Instagram posts in user's authentic voice

**File: `workflows/write-posts/workflow.yaml`**

```yaml
name: write-posts
description: 'Write platform-specific social media posts in user authentic voice'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
platform_specs: '{config_source}:platforms'
voice_profile_location: '{agent-folder}/memories.md'
date: system-generated
installed_path: '{agent-folder}/workflows/write-posts'

# MCP Tools
mcp_tools_required:
  - script_generation_mcp: [script_generate, add_note]

# Custom Modules
custom_modules:
  - twitter_api_client: 'Validation (char limits, format)'
  - linkedin_api_client: 'Text formatting and escaping'

# Inputs
inputs:
  - idea_card_id: 'Reference to Idea Card OR idea_card_file path (required)'
  - target_platform: 'linkedin|twitter|instagram (required)'
  - tone_override: 'direct|playful|formal|casual (default: use voice profile)'
  - format_preference: 'For Twitter: long-form|thread|auto (default: auto)'
  - inject_evidence: 'boolean, include research quotes (default: true)'
  - generate_hook_variants: 'boolean, create 3 alternatives (default: true)'

# Outputs
outputs:
  - formatted_post: 'Platform-ready post text'
  - hook_variants: '3 alternative hook options'
  - metadata: 'Hashtags, length, posting tips'
  - handoff_package: 'JSON for Social Posting Agent'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{output_folder}/{platform}-post-{{date}}.md'
handoff_file: '{output_folder}/{platform}-post-handoff-{{date}}.json'
```

**File: `workflows/write-posts/instructions.md`**

```markdown
# Write Posts Workflow Instructions

<workflow>
<critical>Load voice profile FIRST - content must match user's authentic voice</critical>
<critical>Be adaptive with platform guidelines - not rigid rules</critical>

<step n="0" goal="Load voice profile (MANDATORY)">
  <action>Check if voice profile exists in memories.md</action>

  <check if="voice profile NOT found">
    <action>Display: "⚠️  Voice profile not found!"</action>

    <ask>I haven't learned your writing voice yet. Your options:

    1. **Run /learn-voice first** (RECOMMENDED - 5-10 min)
       → Analyzes your content to match your authentic style

    2. **Write in neutral style for now**
       → Generic but functional (not personalized)

    3. **Use Idea Card voice cues only**
       → Limited personalization

    Which would you prefer? [1/2/3]
    </ask>

    <check if="option 1 selected">
      <action>Display: "Great choice! Voice-aware content is much more authentic."</action>
      <action>Pause this workflow</action>
      <action>Invoke workflow: {agent-folder}/workflows/learn-voice/workflow.yaml</action>
      <action>Wait for completion</action>
      <action>Resume this workflow with voice profile loaded</action>
    </check>

    <check if="option 2 OR 3 selected">
      <action>Display: "OK, proceeding without voice profile (content will be more generic)"</action>
      <action>Set voice_aware_mode = false</action>
      <action>Continue</action>
    </check>
  </check>

  <check if="voice profile EXISTS">
    <action>Load voice profile from memories.md</action>
    <action>Extract for use in this workflow:
      - vocab_level
      - sentence_pattern
      - tone_score
      - signature_phrases (top 5)
      - emoji_usage_pattern
      - hook_preference
      - platform_variations (if target_platform matches analyzed platform)
    </action>

    <action>Set voice_aware_mode = true</action>

    <action>Display: "✓ Voice profile loaded (Confidence: {{voice_confidence}}/10)"</action>
  </check>

  <template-output>voice_loaded</template-output>
</step>

<step n="1" goal="Load Idea Card">
  <action>Load idea_card data from {{idea_card_id}} OR {{idea_card_file}}</action>

  <action>Extract from Idea Card:
    - title
    - hook_line
    - outline (beats array)
    - cta
    - evidence_items (array)
    - style (tutorial|opinion|story|etc)
    - recommended_platforms
  </action>

  <action>Validate target_platform is in recommended_platforms</action>

  <check if="target_platform NOT recommended">
    <ask>⚠️  Idea Card recommends {{recommended_platforms}}, but you selected {{target_platform}}.

    This might not be optimal. Options:
    1. Continue with {{target_platform}} anyway
    2. Switch to {{recommended_platforms[0]}}
    3. Cancel and review Idea Card

    Select: [1/2/3]
    </ask>
  </check>

  <template-output>idea_card_loaded</template-output>
</step>

<step n="2" goal="Generate base content with script-generation-mcp">
  <action>Prepare inputs for script generation</action>

  <action>Build context for script_generation_mcp:
    - Topic: {{idea_card.title}}
    - Keywords: {{idea_card.hashtags}} + key terms from outline
    - Style: {{idea_card.style}}
    - Tone: {{tone_override}} OR {{voice_profile.tone_description}}
    - Additional context: {{idea_card.why_now}}
  </action>

  <action>Tool: script_generation_mcp/script_generate</action>
  <action>Parameters: topic={{topic}}, keywords={{keywords}}</action>
  <action>Result: Generated content (multi-agent refined)</action>

  <action>Display: "✓ Base content generated by script-generation-mcp"</action>

  <check if="inject_evidence == true">
    <action>For each main point in generated content:</action>
    <action>Find matching evidence from idea_card.evidence_items</action>
    <action>Inject quote or stat with attribution:
      - "As [Source] reported, [stat/quote]"
      - "According to research from [Source], X% of [group]..."
    </action>
    <action>Keep citations natural, not forced</action>
  </check>

  <template-output>base_content_generated</template-output>
</step>

<step n="3" goal="Apply voice adaptation (if voice profile loaded)">
  <check if="voice_aware_mode == true">
    <action>Display: "Adapting content to match your authentic voice..."</action>

    <action>**Vocabulary Matching:**
      - Review generated content vocabulary
      - Replace formal words with user's preferred terms
        Example: "utilize" → "use" (if user prefers simple)
      - Match technical density to {{vocab_level}}
      - Inject signature phrases where natural (don't force)
    </action>

    <action>**Sentence Structure Matching:**
      - Analyze generated sentence lengths
      - Adjust to match {{sentence_pattern}}:
        • If user writes staccato: Break long sentences
        • If user writes varied: Mix short + long
        • If user writes flowing: Combine short sentences
      - Match rhythm/pacing
    </action>

    <action>**Tone Adjustment:**
      - Check generated tone against {{tone_score}}
      - If too formal for user: Add casual elements
      - If too casual for user: Add professional markers
      - Apply humor style (if user uses humor)
      - Inject enthusiasm markers (if user is enthusiastic)
    </action>

    <action>**Emoji Application:**
      - Match {{emoji_usage_pattern}}:
        • Never: Remove all emojis
        • Rare: Keep 0-1 emoji
        • Moderate: Use 1-2 emojis
        • Heavy: Use 2-3+ emojis
      - Place according to {{emoji_placement}}
      - Use emoji types user favors
    </action>

    <action>Result: Content that sounds like {{user_name}} wrote it</action>

    <action>Display: "✓ Voice-adapted to match your style"</action>
  </check>

  <check if="voice_aware_mode == false">
    <action>Display: "ℹ️  Using neutral voice (run /learn-voice for personalization)"</action>
  </check>

  <template-output>voice_adapted</template-output>
</step>

<step n="4" goal="Format for target platform (Adaptive Guidelines)">
  <action>Load platform specs from config.yaml → platforms.{{target_platform}}</action>

  <!-- LINKEDIN POST -->
  <check if="target_platform == 'linkedin'">
    <action>Apply LinkedIn formatting (adaptive, not rigid)</action>

    <action>**Hook (First line, target < 140 chars):**
      - Use idea_card.hook_line OR voice-adapted version
      - Make it scroll-stopping
      - Professional but engaging (LinkedIn tone)
      - Can include 1 emoji if user's voice profile shows emoji usage
    </action>

    <action>**Body Structure:**
      - Aim for 150-300 words (~800-1600 chars optimal)
      - Can go up to 3000 if content demands it
      - Use line breaks between paragraphs (readability)
      - Structure:
        • Para 1: Expand hook (context/problem)
        • Para 2-4: Main points from idea_card.outline
        • Para 5: Wrap-up or forward-looking

      - Use bullets (•) or numbers if listing
      - Inject evidence naturally:
        "According to [Source], X% of professionals..."
    </action>

    <action>**CTA:**
      - Use idea_card.cta OR voice-adapted version
      - Make conversational (ask question OR request action)
      - Examples:
        • "What's been your experience with this?"
        • "Share this if you found it helpful"
    </action>

    <action>**Hashtags:**
      - Add 3-5 relevant hashtags at end
      - Mix broad (#AI) + niche (#NoCode)
      - Based on idea_card.hashtags
      - Don't overdo it (LinkedIn isn't Instagram)
    </action>

    <action>**Validation:**
      - Tool: linkedin_api_client/lib/formatter/formatPostText
      - Parameters: text={{generated_post}}
      - Check: warnings (length, hook truncation)

      - If warnings exist:
        • Display warnings to user
        • Ask if they want to adjust or proceed
    </action>

    <action>Display:
      ✓ LinkedIn post formatted

      **Stats:**
      - Length: {{char_count}} characters
      - Hook: {{hook_length}} chars {{#hook_length > 140}}⚠️  (may truncate on mobile){{/hook_length}}
      - Reading time: ~{{reading_time}} seconds
      - Hashtags: {{hashtag_count}}

      **Posting Tip:** Tuesday-Thursday, 9am-12pm for best reach
    </action>

    <template-output>linkedin_post_formatted</template-output>
  </check>

  <!-- TWITTER POST (Adaptive: Long-form vs Thread) -->
  <check if="target_platform == 'twitter'">
    <action>Calculate content length from idea_card.outline</action>
    <action>Estimate total characters needed</action>

    <action>**Platform Trend Check (Current: Oct 2025):**
      - Long-form posts (500-2500 chars) performing well
      - Threads still work for step-by-step or storytelling
      - Decision depends on content type + user preference
    </action>

    <check if="format_preference == 'auto'">
      <ask>Twitter Format Decision:

      Content length: ~{{estimated_chars}} characters

      **Option 1: Long-form post** (current trend - higher engagement)
      - Single post up to 25,000 chars (you have Premium)
      - Better for: Opinions, stories, announcements
      - Engagement: Currently outperforming threads

      **Option 2: Thread** (classic format)
      - {{estimated_thread_length}} tweets
      - Better for: Step-by-step, lists, tutorials
      - Engagement: Still strong for educational content

      **Recommendation based on content:**
      {{#idea_style == 'tutorial' OR 'story'}}Thread format{{/idea_style}}
      {{#idea_style == 'opinion' OR 'announcement'}}Long-form post{{/idea_style}}

      Which format? [1 for long-form / 2 for thread / 3 for both]
      </ask>

      <action>Store user selection: {{twitter_format}}</action>
    </check>

    <!-- LONG-FORM POST -->
    <check if="twitter_format == 'long-form' OR format_preference == 'long-form'">
      <action>Generate single long-form post:</action>

      <action>**Structure:**
        - Hook paragraph (idea_card.hook_line expanded)
        - Main content (idea_card.outline beats)
        - CTA paragraph (idea_card.cta)
        - Use line breaks for readability
        - Keep under 2500 chars optimal (can go higher if needed)
      </action>

      <action>Apply voice profile (if loaded)</action>

      <action>**Validation:**
        - Tool: twitter_api_client/lib/validator/validateTweetRequest
        - Parameters: {text: {{generated_post}}}
        - Check: length < 25000 (Premium), format valid
      </action>

      <action>Display:
        ✓ Twitter long-form post created

        **Stats:**
        - Length: {{char_count}} characters
        - Format: Single post
        - Estimated engagement: Higher (based on Oct 2025 trends)

        **Posting Tip:** Weekday mornings (8-10am) for best reach
      </action>
    </check>

    <!-- THREAD FORMAT -->
    <check if="twitter_format == 'thread' OR format_preference == 'thread'">
      <action>Generate thread:</action>

      <action>**Tweet 1 (Hook):**
        - Use idea_card.hook_line
        - Tease value: "Here's what I learned..." / "A thread 🧵"
        - Length: Aim for 150-250 chars (Premium allows 25k but keep hooks punchy)
      </action>

      <action>**Tweets 2-N (Points):**
        - One idea_card.outline beat per tweet
        - Use line breaks for readability
        - Add context, don't just list:
          ✗ "Tool 1: Zapier"
          ✓ "Tool 1: Zapier\n\nAutomatically moves data between apps. Set it once, forget about it.\n\nSaved me ~5 hours last week."
        - Inject evidence where relevant
        - Each tweet stands alone (some won't read full thread)
        - Apply voice profile to each tweet
      </action>

      <action>**Final Tweet (CTA):**
        - Summarize key takeaway
        - Use idea_card.cta
        - Can include link
      </action>

      <action>**Thread Numbering:**
        - Add to each tweet: "1/{{total}}", "2/{{total}}", etc.
        - Helps readers track progress
      </action>

      <action>**Validation:**
        - Validate each tweet with twitter_api_client/lib/validator
        - Check char limits
        - Ensure no errors
      </action>

      <action>Display:
        ✓ Twitter thread created

        **Stats:**
        - Thread length: {{tweet_count}} tweets
        - Total characters: {{total_chars}}
        - Format: Thread
        - Each tweet validated ✓

        **Posting Tip:** Weekdays, avoid Friday/Saturday
      </action>
    </check>

    <!-- GENERATE BOTH -->
    <check if="twitter_format == 'both'">
      <action>Generate BOTH long-form AND thread</action>
      <action>Present both options to user</action>
      <action>Let user pick which to use</action>
    </check>

    <template-output>twitter_post_formatted</template-output>
  </check>

  <!-- INSTAGRAM CAPTION -->
  <check if="target_platform == 'instagram'">
    <action>**Hook (First 125 chars visible before "more"):**
      - Use idea_card.hook_line
      - Must work standalone (many won't expand)
      - Engaging + curiosity-driving
    </action>

    <action>**Full Caption:**
      - Expand on hook
      - Main points from idea_card.outline
      - Keep concise (optimal: 150-300 words)
      - Line breaks between ideas
      - Storytelling approach works well
      - Apply voice profile
    </action>

    <action>**CTA:**
      - Use idea_card.cta
      - Instagram-specific: "Double-tap if...", "Save this for...", "Tag someone who..."
    </action>

    <action>**Hashtags:**
      - Instagram allows up to 30 but optimal: 5-10
      - Mix broad + niche
      - Can include in caption OR first comment
    </action>

    <action>**Emojis:**
      - Instagram is visual platform (emojis work well)
      - Use 2-5 relevant emojis (unless voice profile says otherwise)
      - Space them naturally through caption
    </action>

    <action>Display:
      ✓ Instagram caption created

      **Stats:**
      - Length: {{word_count}} words
      - Hook: First 125 chars (visible before "more")
      - Hashtags: {{hashtag_count}}

      **Posting Tip:** Any day works; prime times 11am-1pm, 7-9pm
    </action>

    <template-output>instagram_caption_formatted</template-output>
  </check>

  <template-output>platform_content_formatted</template-output>
</step>

<step n="5" goal="Generate hook variants (optional)">
  <check if="generate_hook_variants == true">
    <action>Create 3 alternative hooks for A/B testing</action>

    <action>**Variant 1: Different Hook Type**
      - If original is question → generate number hook
      - If original is number → generate story hook
      - If original is story → generate reveal hook
      - Apply voice profile to variant
    </action>

    <action>**Variant 2: Different Angle**
      - Same core idea, different framing
      - Example original: "5 AI tools that save time"
      - Variant: "Stop wasting 10 hours a week on tasks AI can do"
      - Apply voice profile
    </action>

    <action>**Variant 3: Emotion-Driven**
      - Add curiosity, urgency, or FOMO
      - Example original: "How to automate workflows"
      - Variant: "Everyone's automating their workflows except you"
      - Apply voice profile
    </action>

    <action>Display all 3 variants to user for selection</action>

    <template-output>hook_variants_generated</template-output>
  </check>
</step>

<step n="6" goal="Generate metadata and handoff package">
  <action>Compile metadata:</action>

  <action>**For All Platforms:**
    - Hashtags: {{hashtag_list}}
    - Character count: {{char_count}}
    - Word count: {{word_count}}
    - Estimated reading time: {{reading_time}}
    - Optimal posting time: {{platform_best_time}}
    - Evidence sources: {{evidence_urls}}
  </action>

  <action>**Create Handoff Package for Social Posting Agent:**</action>

  <action>JSON structure:

    {
      "content_type": "{{platform}}_post",
      "generated_by": "jarvis",
      "workflow": "write-posts",
      "idea_card_id": "{{idea_card_id}}",
      "platform": "{{platform}}",
      "ready_for_agent": "social-posting-agent",
      "suggested_command": "/post-{{platform}}",

      "content": {
        "text": "{{final_post_text}}",
        "format": "{{twitter_format if twitter}}",
        "metadata": {
          "hashtags": ["{{tag1}}", "{{tag2}}", ...],
          "char_count": {{count}},
          "word_count": {{words}},
          "hook_variants": ["{{v1}}", "{{v2}}", "{{v3}}"],
          "posting_tip": "{{optimal_time}}"
        }
      },

      "evidence": {
        "idea_card_file": "{{idea_card_path}}",
        "research_sources": ["{{url1}}", "{{url2}}"],
        "voice_profile_used": {{voice_aware_mode}}
      },

      "timestamp": "{{generation_timestamp}}",
      "cost": {{total_cost}}
    }

  </action>

  <action>Save handoff package to: {{handoff_file}}</action>

  <template-output>handoff_package_created</template-output>
</step>

<step n="7" goal="Save and present final output">
  <action>Save formatted post to: {{default_output_file}}</action>
  <action>Save handoff JSON to: {{handoff_file}}</action>

  <action>Display to user:

    ✅ {{platform}} Post Ready!

    **Platform:** {{platform}}
    {{#twitter}}**Format:** {{twitter_format}}{{/twitter}}
    **Length:** {{char_count}} characters ({{word_count}} words)
    {{#voice_aware_mode}}**Voice:** Matched to your style ✓{{/voice_aware_mode}}

    **Hook:**
    "{{final_hook}}"

    {{#generate_hook_variants}}
    **Alternative Hooks:**
    1. "{{variant_1}}"
    2. "{{variant_2}}"
    3. "{{variant_3}}"
    {{/generate_hook_variants}}

    **Files:**
    - 📄 Post: {{default_output_file}}
    - 📦 Handoff Package: {{handoff_file}}

    **Next Steps:**
    - Review post and make any edits
    - Ready to publish? Use Social Posting Agent:
      `{{suggested_command}}`
    - Or adjust and regenerate

    **Posting Tip:** {{posting_tip}}
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

---

### Workflow 6: write-scripts (Voice-Aware Video Scripts)

**File: `workflows/write-scripts/workflow.yaml`**

```yaml
name: write-scripts
description: 'Write video scripts (YouTube, Reels, TikTok) in user authentic voice with timing and visual direction'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
output_folder: '{config_source}:output_folder'
platform_specs: '{config_source}:platforms'
voice_profile_location: '{agent-folder}/memories.md'
date: system-generated
installed_path: '{agent-folder}/workflows/write-scripts'

# MCP Tools
mcp_tools_required:
  - script_generation_mcp: [script_generate, add_note]
  - youtube_transcript: [get_transcript]  # For inspiration from similar videos

# Inputs
inputs:
  - idea_card_id: 'Reference to Idea Card (required)'
  - target_platform: 'youtube|reels|tiktok (required)'
  - duration: 'Target duration in seconds: 30|60|90|180|300|600'
  - tone_override: 'direct|playful|formal|casual (default: use voice profile)'
  - pacing_preference: 'fast|moderate|relaxed (default: moderate)'
  - include_visual_direction: 'boolean, add B-roll and visual cues (default: true)'
  - generate_variants: 'boolean, create alternative hooks (default: true)'

# Outputs
outputs:
  - video_script: 'Full script with timing markers'
  - visual_direction: 'B-roll suggestions, on-screen text, graphics'
  - hook_variants: '3 alternative opening hooks'
  - production_notes: 'Thumbnail ideas, music suggestions, posting tips'
  - handoff_package: 'JSON for AI Video Agent OR Social Posting Agent'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{output_folder}/{platform}-script-{duration}s-{{date}}.md'
handoff_file: '{output_folder}/{platform}-script-handoff-{{date}}.json'
```

**File: `workflows/write-scripts/instructions.md`**

```markdown
# Write Scripts Workflow Instructions

<workflow>
<critical>Load voice profile FIRST for authentic voice</critical>
<critical>Be ADAPTIVE with timing - adjust to content, not rigid formulas</critical>

<step n="0" goal="Load voice profile (MANDATORY)">
  <!-- Same voice loading logic as write-posts -->
  <!-- Check exists, load if found, offer to run learn-voice if not -->
  <!-- Extract voice characteristics for script adaptation -->

  <template-output>voice_loaded</template-output>
</step>

<step n="1" goal="Load Idea Card and platform specs">
  <action>Load idea_card from {{idea_card_id}}</action>
  <action>Load platform specs for {{target_platform}}</action>

  <action>Validate duration parameter:</action>
  <check if="duration not in platform_specs.{{target_platform}}.script_lengths">
    <ask>⚠️  {{duration}}s isn't standard for {{target_platform}}.

    Standard lengths: {{platform_specs.script_lengths}}

    Options:
    1. Use closest standard: {{closest_standard}}s
    2. Continue with {{duration}}s anyway
    3. Let me recommend optimal length

    Select: [1/2/3]
    </ask>
  </check>

  <action>**Load duration-specific GUIDELINES (not rigid rules):**

    For {{target_platform}} @ {{duration}}s:

    {{#youtube}}
    - 30-60s: Hook (5s) → 1-2 Points → CTA
    - 90-180s: Hook (5s) → Intro (10s) → 3-4 Points → CTA
    - 300-600s: Hook (5s) → Intro (15s) → 5-7 Points → Summary → CTA

    Note: These are GUIDELINES. Adjust based on:
    - Topic complexity (more complex = more setup time needed)
    - User's teaching pace (from voice profile if available)
    - Content density (research-heavy vs opinion)
    {{/youtube}}

    {{#reels OR tiktok}}
    - 30s: Hook (3s) → 3 beats (8s each) → CTA (3s)
    - 60s: Hook (3s) → 4-5 beats (12s each) → CTA (5s)
    - 90s: Hook (3s) → 5-6 beats (14s each) → Recap → CTA

    Note: First 3 seconds are CRITICAL (retention hook)
    {{/reels OR tiktok}}
  </action>

  <template-output>specs_loaded</template-output>
</step>

<step n="2" goal="Generate base script">
  <action>Prepare script generation context</action>

  <action>Tool: script_generation_mcp/script_generate</action>
  <action>Parameters:
    - topic: {{idea_card.title}}
    - keywords: {{idea_card.hashtags}} + outline terms
    - style: {{idea_card.style}}
    - tone: {{tone_override}} OR {{voice_profile.tone}}
    - format: "video script for {{target_platform}}, {{duration}} seconds"
  </action>

  <action>Result: Generated script (multi-agent refined)</action>

  <check if="inject_evidence == true">
    <action>Enhance with evidence from idea_card:</action>
    <action>For each main point in script, find matching evidence</action>
    <action>Inject naturally:
      - "As mentioned in [Source], [stat/quote]"
      - "Research shows that [finding]"
      - Keep citations conversational for video
    </action>
  </check>

  <template-output>base_script_generated</template-output>
</step>

<step n="3" goal="Apply voice adaptation">
  <check if="voice_aware_mode == true">
    <action>Adapt script to user's authentic voice</action>
    <!-- Same voice matching as write-posts:
         - Vocabulary matching
         - Sentence structure
         - Tone adjustment
         - Spoken patterns (if YouTube voice analyzed)
    -->

    <check if="voice_profile includes spoken_voice">
      <action>Extra adjustments for video:</action>
      <action>Apply conversational markers from spoken voice:
        - User's natural transitions
        - Filler words (if user uses them naturally)
        - Speaking rhythm
        - Teaching patterns
      </action>
    </check>

    <action>Display: "✓ Script adapted to match your speaking style"</action>
  </check>

  <template-output>voice_adapted_script</template-output>
</step>

<step n="4" goal="Add timing and structure">
  <action>Break script into timed segments</action>

  <check if="target_platform == 'youtube'">
    <action>**Add Timestamp Markers:**

      0:00 - HOOK
      {{hook_text}}
      [Visual: {{hook_visual_suggestion}}]

      0:05 - INTRO
      {{intro_text}}
      [B-roll: {{intro_broll}}]

      {{#main_points}}
      {{timestamp}} - POINT {{number}}: {{point_title}}
      {{point_text}}
      [Visual direction: {{visual_cue}}]
      [TEXT overlay: "{{key_stat}}"]
      {{/main_points}}

      {{final_timestamp}} - CTA & CLOSE
      {{cta_text}}
      [End screen: Subscribe, Related videos]

    </action>

    <action>**Pacing Check:**
      - Review if timing feels natural
      - Adjust if points feel rushed or dragging
      - Provide reasoning: "Giving Point 2 extra 10s because concept is complex"
    </action>

    <action>**Production Notes:**
      - Thumbnail ideas: {{thumbnail_suggestions}}
      - On-screen graphics needed: {{graphics_list}}
      - B-roll clips needed: {{broll_list}}
    </action>
  </check>

  <check if="target_platform == 'reels' OR 'tiktok'">
    <action>**Add Visual Direction:**

      [0:00-0:03] HOOK
      {{hook_text}}
      [VISUAL: {{attention_grabbing_shot}}]
      [TEXT: "{{hook_text}}" - Large, bold]

      {{#beats}}
      [{{start_time}}-{{end_time}}] BEAT {{number}}
      {{beat_text}}
      [VISUAL: {{visual_direction}}]
      [TEXT: "{{key_phrase}}"]
      [TRANSITION: {{transition_type}}]
      {{/beats}}

      [{{cta_start}}-{{duration}}] CTA
      {{cta_text}}
      [VISUAL: {{cta_visual}}]

    </action>

    <action>**Production Notes:**
      - Music tempo: {{music_suggestion}}
      - Camera angles: {{camera_notes}}
      - Cuts/transitions: {{transition_style}}
      - Hashtag strategy: {{hashtag_recommendations}}
      - Audio: Trending sound OR original
    </action>
  </check>

  <template-output>timing_and_visuals_added</template-output>
</step>

<step n="5" goal="Generate hook variants">
  <check if="generate_variants == true">
    <!-- Same variant generation as write-posts -->
    <!-- 3 alternatives with different types/angles/emotions -->
    <!-- All voice-adapted -->

    <template-output>variants_generated</template-output>
  </check>
</step>

<step n="6" goal="Create handoff package and metadata">
  <action>Compile metadata for video production:</action>

  <action>**Production Metadata:**
    - Duration: {{duration}}s
    - Platform: {{target_platform}}
    - Script word count: {{word_count}}
    - Estimated production time: {{production_estimate}}
    - Complexity: {{complexity_rating}}
  </action>

  <action>**Video-Specific:**
    - Title: {{video_title}} (from idea_card, < 100 chars for YouTube)
    - Description: {{video_description}}
    - Thumbnail suggestions: {{thumbnail_ideas}}
    - Tags/Hashtags: {{tags}}
    - Music/Audio: {{audio_recommendations}}
    - Visual assets needed: {{asset_list}}
  </action>

  <action>**Create Handoff Package:**

    {
      "content_type": "{{platform}}_script",
      "generated_by": "jarvis",
      "workflow": "write-scripts",
      "idea_card_id": "{{idea_card_id}}",
      "platform": "{{platform}}",
      "duration_seconds": {{duration}},
      "ready_for_agent": "ai-video-agent OR social-posting-agent",

      "script": {
        "full_text": "{{script_text_only}}",
        "timed_segments": [
          {"timestamp": "0:00", "type": "hook", "text": "...", "visual": "..."},
          {"timestamp": "0:05", "type": "intro", "text": "...", "visual": "..."},
          ...
        ],
        "hook_variants": ["{{v1}}", "{{v2}}", "{{v3}}"]
      },

      "production": {
        "title": "{{video_title}}",
        "description": "{{description}}",
        "thumbnail_ideas": ["{{t1}}", "{{t2}}", "{{t3}}"],
        "hashtags": ["{{tag1}}", ...],
        "broll_needed": ["{{clip1}}", "{{clip2}}"],
        "graphics_needed": ["{{graphic1}}", ...],
        "music": "{{music_suggestion}}"
      },

      "evidence": {
        "idea_card": "{{idea_card_path}}",
        "research_sources": ["{{url1}}", ...],
        "voice_profile_used": true
      },

      "metadata": {
        "word_count": {{words}},
        "estimated_production_time": "{{estimate}}",
        "posting_tip": "{{tip}}",
        "generated_at": "{{timestamp}}"
      }
    }

  </action>

  <action>Save to: {{handoff_file}}</action>

  <template-output>handoff_created</template-output>
</step>

<step n="7" goal="Present final output">
  <action>Display to user:

    ✅ Video Script Ready!

    **Platform:** {{platform}}
    **Duration:** {{duration}}s
    **Word Count:** {{word_count}}
    {{#voice_aware_mode}}**Voice Matched:** Yes ✓{{/voice_aware_mode}}

    **Hook:**
    "{{final_hook}}"

    {{#variants}}
    **Hook Variants:**
    1. "{{variant_1}}"
    2. "{{variant_2}}"
    3. "{{variant_3}}"
    {{/variants}}

    **Production Notes:**
    - Complexity: {{complexity}}
    - B-roll clips needed: {{broll_count}}
    - Graphics: {{graphics_count}}
    - Music: {{music_suggestion}}

    **Files:**
    - 📄 Script: {{default_output_file}}
    - 📦 Handoff Package: {{handoff_file}}

    **Next Steps:**
    - Review script
    - Need video created? → AI Video Agent
    - Upload yourself? → Social Posting Agent
    - Want to adjust? → Tell me what to change

    **Posting Tip:** {{posting_tip}}
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

---

### Workflow 7: competitive-analysis (Orchestrator)

**File: `workflows/competitive-analysis/workflow.yaml`**

```yaml
name: competitive-analysis
description: 'Multi-profile comparison with gap analysis and strategic recommendations'
author: 'Jarvis'

# Variables
config_source: '{agent-folder}/config.yaml'
sessions_folder: '{config_source}:sessions_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/competitive-analysis'

# MCP Tools (Inherits from analyze-profile)
mcp_tools_required:
  - apify_mcp: [call-actor, get-actor-output]  # For multiple profiles
  - youtube_mcp_server: [get_channel_details, get_channel_videos]
  - linkedin_mcp: [fetch_and_save_linkedin_posts, get_top_posts]

# Custom Modules
custom_modules:
  - twitter_api_client: 'For your Twitter profile'

# Inputs
inputs:
  - your_profiles: 'Array of YOUR profile URLs (1-3)'
  - competitor_profiles: 'Array of competitor URLs (max 5)'
  - comparison_metrics: 'engagement|frequency|topics|formats|all (default: all)'
  - generate_action_plan: 'boolean, create 7-day content plan (default: true)'

# Outputs
outputs:
  - comparison_matrix: 'Side-by-side metrics table'
  - gap_analysis: 'Topic, format, hook, timing gaps'
  - differentiation_strategy: '3 strategic recommendations'
  - seven_day_plan: 'Specific content ideas mapped to gaps'
  - cost_summary: 'Total API cost for all profile analyses'

# Action workflow
template: false
instructions: '{installed_path}/instructions.md'

# Output files
default_output_file: '{sessions_folder}/competitive-analysis-{{date}}.md'
```

**File: `workflows/competitive-analysis/instructions.md`**

**(Structure: Orchestrates multiple analyze-profile workflow invocations, compares results, generates gap analysis, builds 7-day action plan)**

---

## 🎯 Correct Implementation Order (Dependency-Based)

Execute workflows in THIS ORDER (respects dependencies):

### Phase 1: Foundation (No Dependencies)
- [ ] **Task 1-3:** Build `research-topic` workflow (30 min)
  - workflow.yaml
  - instructions.md
  - templates/research-brief.md
  - Test with a topic

### Phase 2: Analysis (Uses Phase 1 optionally)
- [ ] **Task 4-6:** Build `analyze-profile` workflow (45 min)
  - workflow.yaml (with ALL platforms: Twitter, Instagram, TikTok, LinkedIn, YouTube)
  - instructions.md (with Apify integration, cost tracking)
  - templates/profile-summary.md
  - Test with YouTube (free), then Instagram (paid, small cost)

### Phase 3: Voice Intelligence (CRITICAL - Uses Phase 2)
- [ ] **Task 7-9:** Build `learn-voice` workflow (30 min)
  - workflow.yaml
  - instructions.md (fetch user's posts, analyze patterns, build profile)
  - Saves to memories.md (no template file)
  - Test by analyzing YOUR profiles

### Phase 4: Strategy (Uses Phase 2)
- [ ] **Task 10-12:** Build `generate-ideas` workflow (30 min)
  - workflow.yaml
  - instructions.md (can use research-topic output, can invoke analyze-profile)
  - templates/idea-card.md
  - Test with a seed topic

- [ ] **Task 13-15:** Build `competitive-analysis` workflow (30 min)
  - workflow.yaml
  - instructions.md (invokes analyze-profile multiple times)
  - templates/comparison-matrix.md + gap-analysis.md
  - Test with 1 your profile + 2 competitors

### Phase 5: Creation (REQUIRES Phase 3 - Voice Profile)
- [ ] **Task 16-18:** Build `write-posts` workflow (45 min)
  - workflow.yaml
  - instructions.md (loads voice profile, adapts content, flexible Twitter logic)
  - templates/linkedin-post.md + twitter-post.md + instagram-caption.md
  - Test: Generate LinkedIn post in your voice

- [ ] **Task 19-21:** Build `write-scripts` workflow (45 min)
  - workflow.yaml
  - instructions.md (loads voice profile, adaptive timing, visual direction)
  - templates/youtube-script.md + reels-script.md + tiktok-script.md
  - Test: Generate 60s YouTube script

### Phase 6: Integration & Validation
- [ ] **Task 22:** Integration test - full pipeline (30 min)
- [ ] **Task 23:** Test handoff to Social Posting Agent (15 min)
- [ ] **Task 24:** Test cost tracking accuracy (15 min)
- [ ] **Task 25:** Validate voice-adaptation works (15 min)

**Total Time:** 5-6 hours

---

## 📊 Success Criteria

### MVP Complete When:

**Agent Structure:**
1. ✅ Jarvis agent YAML valid and loadable
2. ✅ Sidecar structure complete with all files
3. ✅ Config.yaml has all MCP servers and platform specs

**All 7 Workflows Built:**
4. ✅ research-topic works (generates research briefs)
5. ✅ analyze-profile works (ALL platforms: Twitter, Instagram, TikTok, LinkedIn, YouTube)
6. ✅ learn-voice works (builds accurate voice profile from 20+ posts)
7. ✅ generate-ideas works (creates 10 Idea Cards with evidence)
8. ✅ competitive-analysis works (compares profiles, finds gaps, generates plan)
9. ✅ write-posts works (generates voice-adapted social posts)
10. ✅ write-scripts works (generates voice-adapted video scripts)

**Cost Optimization:**
11. ✅ Free tools prioritized (YouTube API, youtube-transcript)
12. ✅ Cost estimated before every Apify call
13. ✅ User approval required for paid tools
14. ✅ All costs logged to memories.md
15. ✅ Monthly budget tracking functional

**Voice-Awareness:**
16. ✅ Voice profile system works (learns from 20+ posts)
17. ✅ write-posts loads and applies voice profile
18. ✅ write-scripts loads and applies voice profile
19. ✅ Generated content sounds authentic (user validation)

**Integration:**
20. ✅ Handoff packages work with Social Posting Agent
21. ✅ Scripts work with AI Video Agent
22. ✅ Evidence tracking works (source links preserved)
23. ✅ Workflow chaining works (outputs feed into inputs)

**Error Handling:**
24. ✅ Graceful degradation when MCP fails
25. ✅ Fallback chains work (free → paid)
26. ✅ Clear error messages with suggested fixes

---

## 🔗 Essential References

### BMAD Framework
- Workflow Engine: `{project-root}/bmad/core/tasks/workflow.xml`
- Brainstorming Example: `{project-root}/bmad/core/workflows/brainstorming/`
- Social Posting Example: `{project-root}/bmad/agents/social-posting-agent/workflows/`

### Apify MCP Integration
- Official Docs: https://docs.apify.com/platform/integrations/mcp
- Actor Store: https://apify.com/store
- MCP Tools: search-actors, fetch-actor-details, call-actor, get-actor-output

### Custom Modules
- Twitter Client: `{project-root}/bmad/modules/twitter-api-client/`
- LinkedIn Client: `{project-root}/bmad/modules/linkedin-api-client/`

### Research & Analysis
- MCP Research: `{project-root}/MCP_SERVERS_RESEARCH.md`
- Critical Revisions: `{project-root}/bmad/agents/content-intelligence/PRP-CRITICAL-REVISIONS.md`

### Agent Files
- Agent YAML: `{project-root}/bmad/agents/content-intelligence/jarvis.agent.yaml`
- Sidecar Config: `{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`
- Instructions: `{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/instructions.md`
- Memories: `{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/memories.md`

---

## 💡 Implementation Tips

1. **Build research-topic FIRST** - Simplest workflow, establishes pattern
2. **Test each workflow immediately** - Don't build all then test
3. **Use real data** - Test with actual profiles and topics
4. **Check costs** - Monitor Apify spend closely
5. **Validate voice** - Ensure learn-voice creates usable profiles
6. **Test handoffs** - Verify Social Posting Agent can use outputs
7. **Log everything** - Track all API calls for debugging
8. **Iterate quickly** - Fix issues as you find them

---

## 📌 Confidence Score: 9.5/10

**Why 9.5/10 (Higher than original):**

**Strengths:**
- ✅ All 7 workflows specified (not 5)
- ✅ Real Apify MCP tool syntax (search-actors, call-actor)
- ✅ Complete platform coverage (Instagram, TikTok, Twitter via Apify)
- ✅ Cost tracking system designed (estimate + log)
- ✅ Voice-awareness system complete (learn + apply)
- ✅ Dependency order correct (foundation → voice → creation)
- ✅ Adaptive not rigid (Twitter long-form vs thread logic)
- ✅ All critical issues from analysis fixed
- ✅ Agent structure already built and validated

**Remaining Risks:**
- ⚠️ Apify MCP tool names may vary slightly (easily fixed)
- ⚠️ Voice adaptation quality depends on algorithm (will iterate)
- ⚠️ Handoff format needs validation with Social Posting Agent

**Why not 10/10:**
- First time implementing Apify MCP integration
- Voice-matching algorithm untested
- Some platform-specific edge cases may emerge

**Expected Outcome:** Successful implementation with minor tweaks during testing

---

*Execute with confidence - all critical issues addressed!*
*Build order: research-topic → analyze-profile → learn-voice → generate-ideas → competitive-analysis → write-posts → write-scripts*
