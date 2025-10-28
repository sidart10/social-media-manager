# Research Topic Workflow Instructions

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/</critical>

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

<step n="3" goal="Deep web research (Working Tool)">
  <action>Conduct comprehensive web research on {topic} using exa.</action>

  <check if="depth == 'comprehensive'">
    <action>Use exa deep_researcher_start to initiate AI-powered comprehensive research. Wait 30-60 seconds, then retrieve results with deep_researcher_check. This provides insights, data points, expert quotes, and sources.</action>
    <!-- Uses exa/deep_researcher - WORKS -->
  </check>

  <check if="depth == 'standard' OR depth == 'quick'">
    <action>Use exa web_search_exa to find recent articles, data, and insights about {topic}. Search for 10 authoritative sources published in last 6 months.</action>
    <!-- Uses exa/web_search_exa - WORKS -->
  </check>

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

<step n="5" goal="Synthesize all findings">
  <action>Organize all research into 5 categories:</action>

  <action>**1. Trends & Timing**
    - Trending topics from social-media-mcp (if gathered)
    - Current market signals from exa research
    - Why this topic is relevant now
    - Future predictions
  </action>

  <action>**2. Data & Statistics**
    - Facts and numbers from exa research
    - Market size, growth rates
    - Survey results, research findings
    - All with source citations
  </action>

  <action>**3. Examples & Case Studies**
    - YouTube video insights (if provided)
    - Real-world applications from exa
    - Success stories
    - How others are doing this
  </action>

  <action>**4. Quotes & Expert Opinions**
    - Expert quotes from exa research
    - Industry perspectives
    - Company statements
    - All attributed with sources
  </action>

  <action>**5. Gaps & Opportunities**
    - What's NOT being discussed
    - Overlooked angles
    - Underserved audiences
    - Content opportunities
  </action>

  <action>For EACH finding: Include source URL, publication date (if available), confidence score (high/medium/low)</action>

  <template-output>findings_organized</template-output>
</step>

<step n="6" goal="Generate content angles">
  <action>Based on all research, generate 10-12 ways to approach {topic}:</action>

  <action>Consider these angle types:
    1. Tutorial: "How to [topic]"
    2. Beginner: "[Topic] explained simply"
    3. Advanced: "Deep dive: [subtopic]"
    4. Teardown: "Breaking down [example]"
    5. Comparison: "[A] vs [B]"
    6. Data: "X stats about [topic]"
    7. Opinion: "Why [hot take]"
    8. Controversy: "The [topic] debate"
    9. Prediction: "Future of [topic]"
    10. Story: "When I tried [topic]"
    11. Mistakes: "X common mistakes"
    12. Trend: "Why everyone's talking about [topic]"
  </action>

  <action>For each angle provide:
    - Title (specific, compelling)
    - Description (1-2 sentences)
    - Best platform (YouTube/LinkedIn/Twitter/Reels)
    - Target audience (beginner/intermediate/advanced)
    - Supporting research (which findings back this)
    - Confidence score
  </action>

  <template-output>content_angles</template-output>
</step>

<step n="7" goal="Create and save research brief">
  <action>Load template: bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/templates/research-brief.md</action>

  <action>Fill template with all gathered data:
    - Topic, depth, source count
    - Executive summary (3-5 key takeaways)
    - All 5 finding categories
    - 10-12 content angles
    - Complete evidence log
    - Overall confidence score
  </action>

  <action>Save to: bmad/agents/content-intelligence/jarvis-sidecar/sessions/research-{topic}-{date}.md</action>

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

</workflow>
