# Research Topic Workflow Instructions

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from {agent-folder}/workflows/research-topic/</critical>

<step n="1" goal="Initialize research session">
  <action>Create research session in script_generation_mcp</action>
  <action>Tool: script_generation_mcp/add_note</action>
  <action>Note name: "session_metadata"</action>
  <action>Content: Topic={topic}, Depth={depth}, Date={date}</action>

  <action>Display to user:
    🔍 Research Session Started

    Topic: {topic}
    Depth: {depth}
    Focus: {focus_areas}

    I'll gather intelligence from multiple sources and compile actionable insights.
  </action>

  <template-output>session_initialized</template-output>
</step>

<step n="2" goal="Quick trend scan (Tier 2 - Low cost)">
  <action>Check if 'trends' in {focus_areas}</action>

  <check if="trends requested">
    <action>Attempt to call social_media_mcp/get_trending_topics</action>
    <action>Parameters: platform="twitter", category="tech"</action>

    <check if="tool succeeds">
      <action>Filter trends related to {topic}</action>
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
  <action>Check {depth} parameter</action>

  <check if="depth == 'comprehensive'">
    <action>Attempt to call exa_mcp/deep_researcher_start</action>
    <action>Parameters: topic={topic}</action>

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
    <action>Parameters: query={topic}, max_results=10</action>

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
  <action>Check if 'examples' in {focus_areas}</action>

  <check if="examples requested">
    <action>Display: "Searching YouTube for real-world examples..."</action>

    <action>Manual search or use youtube_mcp_server if available:
      - Search query: "{topic} tutorial" OR "{topic} explained"
      - Sort by: view count + relevance
      - Select top 5 videos
    </action>

    <action>For each video (up to {max_youtube_videos}):
      - Tool: youtube_transcript/get_transcript
      - Parameters: url={video_url}, lang="en"

      - Extract from transcript:
        • How they explain {topic}
        • Specific examples used
        • Memorable quotes
        • Structure patterns
        • Timestamps for key moments

      - Tool: script_generation_mcp/add_note
      - Note name: "youtube_example_{video_number}"
      - Content: Transcript insights with URL + timestamps
    </action>

    <action>Display: "Analyzed {video_count} YouTube videos for examples"</action>
  </check>

  <template-output>youtube_examples</template-output>
</step>

<step n="5" goal="Synthesize all research">
  <action>Tool: script_generation_mcp/summarize_notes</action>
  <action>Parameters: style="detailed"</action>
  <action>Result: Comprehensive summary of all gathered intelligence</action>

  <action>Organize findings into 5 categories:</action>

  <action>**1. Trends & Timing**
    - What's happening NOW with {topic}
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
  <action>Based on synthesized research, brainstorm 10-12 ways to approach {topic}</action>

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

  <action>Save to {default_output_file}</action>

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
    <action>Save to {notes_file}</action>
  </check>

  <action>Display to user:

    ✅ Research Complete: {topic}

    **Stats:**
    - Depth: {depth}
    - Sources: {source_count}
    - YouTube videos analyzed: {youtube_count}

    **Top 3 Findings:**
    1. {finding_1_summary}
    2. {finding_2_summary}
    3. {finding_3_summary}

    **Content Angles:** {angle_count} ways to approach this topic

    📄 Full Research: {default_output_file}

    **Suggested Next Steps:**
    - Pick angle(s) that resonate
    - Use /generate-ideas to develop into Idea Cards
    - Use /analyze-profile to see how competitors cover this
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
