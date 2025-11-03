# Research Topic Workflow Instructions

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/</critical>

<step n="0" goal="Create project folder structure">
  <action>Generate project ID:
    DATE=$(date +"%Y-%m-%d")
    TOPIC_SLUG=$(echo "{topic}" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
    PROJECT_ID="$DATE-$TOPIC_SLUG"
    PROJECT_PATH="outputs/projects/$PROJECT_ID"
  </action>

<action>Create complete 6-stage structure:
mkdir -p "$PROJECT_PATH"/{00-session,01-research,02-ideas,03-drafts,04-media,05-published,handoffs}
    mkdir -p "$PROJECT_PATH"/03-drafts/{linkedin,twitter,youtube,instagram,tiktok,substack,facebook}
mkdir -p "$PROJECT_PATH"/04-media/{images,videos}
    mkdir -p "$PROJECT_PATH"/05-published/{linkedin,twitter,youtube,instagram,tiktok,substack,facebook}
</action>

<action>Create session metadata:
cat > "$PROJECT_PATH/00-session/metadata.json" << 'EOF'
{
  "project_id": "$PROJECT_ID",
"topic": "{topic}",
"depth": "{depth}",
"created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
"agent": "jarvis",
"workflow": "research-topic"
}
EOF
</action>

<action>Store PROJECT_PATH as environment variable for all subsequent steps</action>

<template-output>project_folder_created</template-output>
</step>

<step n="1" goal="Initialize research session">
  <action>Display to user:
    🔍 Research Session Started

    Topic: {topic}
    Depth: {depth}
    Focus: {focus_areas}

    Using: Exa (deep research), social-media-mcp (trending topics only), apify (profile analysis if needed)

  </action>

<template-output>session_initialized</template-output>
</step>

<step n="2" goal="Gather trending signals (Working Tool)">
  <check if="'trends' in focus_areas">
    <action>Get trending topics about {topic} from Twitter using social-media-mcp get_trending_topics tool. This works reliably and provides hashtags with volume data.</action>
    <!-- Uses social-media-mcp/get_trending_topics - WORKS -->
  </check>

<template-output>trends_gathered</template-output>
</step>

<step n="3" goal="Deep web research using deep-web-research skill">
  <action>Load and follow {project-root}/.claude/skills/jarvis/deep-web-research/SKILL.md</action>

<action>**Execute research per skill instructions:**

    **Parameters to provide**:
    - Topic: {topic}
    - Depth: {depth} (quick | standard | comprehensive | exhaustive)
    - Focus: {focus_areas} (trends, data, quotes, examples)

    **The skill will automatically**:
    - Select optimal research tools (Exa, Apify, Archon RAG, WebSearch)
    - Route based on depth parameter
    - Execute searches in parallel
    - Handle tool fallbacks
    - Optimize for cost (free → low-cost → paid)
    - Synthesize results into organized output

    **Follow all instructions in SKILL.md** for:
    - Tool routing logic
    - Source quality assessment
    - Data extraction patterns
    - Synthesis methods

  </action>

<action>**Expected research output** (per skill specification): - Key insights with source URLs - Data & statistics with citations - Expert quotes with attribution - Case studies and examples - Source quality scores (high/medium/low) - Cost tracking
</action>

<note>Skills-first model: Load deep-web-research/SKILL.md as expert knowledge.
The skill contains complete instructions for intelligent research orchestration.
This workflow provides parameters; skill determines execution strategy.
</note>

<template-output>web_research_complete</template-output>
</step>

<step n="4" goal="Find real-world examples (If videos provided)">
  <check if="'examples' in focus_areas">
    <action>Note: YouTube transcript extraction available if user provides video URLs with captions enabled. Skip automatic video search (no YouTube search MCP available).</action>

    <ask>Do you have specific YouTube video URLs about {topic} you'd like me to analyze?</ask>

    <check if="user provides URLs">
      <action>Extract transcripts using Apify: karamelo/youtube-transcripts</action>
      <action>Use Apify call-actor with input: {"urls": [video_urls]}</action>
      <action>Analyze: hook (first 10s), structure, quotes with timestamps, teaching approach</action>
      <action>Cost: ~$0.01 per video (reliable extraction)</action>
      <!-- Uses Apify youtube-transcripts actor - reliable and fast -->
      <!-- Note: Actor parameter is "urls" not "videoUrls" -->
    </check>

    <check if="user skips YouTube">
      <action>Continue without YouTube examples. Focus on web research findings.</action>
    </check>

  </check>

<template-output>examples_gathered</template-output>
</step>

<step n="5" goal="Synthesize findings using research-synthesizer skill">
  <action>Load and follow {project-root}/.claude/skills/jarvis/research-synthesizer/SKILL.md</action>

<action>**Synthesize research per skill instructions:**

    **Input data**:
    - Deep web research results (from step 3)
    - Trending topics (from step 2, if gathered)
    - YouTube examples (from step 4, if provided)

    **Follow SKILL.md instructions to organize into 5 categories**:
    1. Trends & Timing
    2. Data & Statistics
    3. Examples & Case Studies
    4. Quotes & Expert Opinions
    5. Gaps & Opportunities

    **Quality requirements** (per skill specification):
    - Every finding includes: source URL, date, confidence score
    - Sources organized by quality (high/medium/low)
    - Duplicates removed
    - Related findings grouped

  </action>

<note>Skills-first model: research-synthesizer/SKILL.md contains complete instructions
for organizing multi-source research into structured output format.
</note>

<template-output>findings_organized</template-output>
</step>

<step n="6" goal="Generate content angles">
  <action>Based on all research, generate 10-12 ways to approach {topic}:</action>

<action>Consider these angle types: 1. Tutorial: "How to [topic]" 2. Beginner: "[Topic] explained simply" 3. Advanced: "Deep dive: [subtopic]" 4. Teardown: "Breaking down [example]" 5. Comparison: "[A] vs [B]" 6. Data: "X stats about [topic]" 7. Opinion: "Why [hot take]" 8. Controversy: "The [topic] debate" 9. Prediction: "Future of [topic]" 10. Story: "When I tried [topic]" 11. Mistakes: "X common mistakes" 12. Trend: "Why everyone's talking about [topic]"
</action>

<action>For each angle provide: - Title (specific, compelling) - Description (1-2 sentences) - Best platform (YouTube/LinkedIn/Twitter/Reels) - Target audience (beginner/intermediate/advanced) - Supporting research (which findings back this) - Confidence score
</action>

<template-output>content_angles</template-output>
</step>

<step n="7" goal="Create and save research brief">
  <action>Load template: bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/templates/research-brief.md</action>

<action>Fill template with all gathered data: - Topic, depth, source count - Executive summary (3-5 key takeaways) - All 5 finding categories - 10-12 content angles - Complete evidence log - Overall confidence score
</action>

<action>Save complete research brief to: $PROJECT_PATH/01-research/research-brief.md

Include:

- Topic and depth level
- Research sources with URLs
- Key findings organized by 5 categories
- Content angles (10+)
- Cost breakdown
- Timestamps
  </action>

<template-output>brief_saved</template-output>
</step>

<step n="8" goal="Present results">
  <action>Display to user:

    ✅ Research Complete: {topic}

    **Stats:**
    - Depth: {depth}
    - Sources: {source_count}
    - Trending topics: {trend_count}
    - YouTube videos: {video_count}

    **Findings:**
    - Trends & Timing: {trends_count}
    - Data & Statistics: {data_count}
    - Examples: {examples_count}
    - Quotes: {quotes_count}
    - Gaps: {gaps_count}

    **Content Angles:** {angle_count} ways to approach this topic

    📄 Full Research: {research_brief_file}

    **Top 3 Insights:**
    1. {insight_1}
    2. {insight_2}
    3. {insight_3}

    **Suggested Next Steps:**
    - Pick content angle(s) that resonate
    - Use /generate-ideas to develop into Idea Cards
    - Use /write-posts or /write-scripts to create content

  </action>

<template-output>workflow_complete</template-output>
</step>

<step n="8.5" goal="Update Notion Status (Epic 2 Story 5.2)">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

<action>**Update Notion Content Tracker status:**

    **Step 1: Load project metadata**
    - Read: $PROJECT_PATH/00-session/metadata.json (v2.0 structure)
    - Extract: notion_page_url from metadata.notion.page_url

    **Step 2: Check if Notion page linked**
    - If notion_page_url exists: Proceed with update
    - If not exists: Display "ℹ️ No Notion page linked (local-only project)" and skip

    **Step 3: Update status using notion-updates module**
    - Call: update_content_status(
        notion_page_url: metadata.notion.page_url,
        new_status: "Research",
        agent_name: "Jarvis",
        project_metadata: metadata
      )

    **Step 4: Handle result**
    - If success: Display "✅ Notion updated: Idea → Research"
    - If failed: Display "⚠️ Notion update failed: {error} (workflow continues)"
    - Log to session-log.md: "{timestamp} - Jarvis: Status updated to Research"

    **Step 5: Add research brief to Notes relation (optional)**
    - If research brief saved as separate Notion page: Link via Notes relation
    - Or: Add URL/path to research brief file in Notion page description
    - This enables: Click Notion page → See research brief location

    **Error Handling:**
    - Notion API timeout: Log error, continue workflow
    - Invalid transition: Log warning (e.g., already at "Research" status)
    - Network failure: Graceful degradation, local outputs unaffected

  </action>

<template-output>notion_updated</template-output>
</step>

</workflow>
