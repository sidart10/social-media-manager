# Generate Ideas Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Use existing research when available to avoid duplicate API calls</critical>

<step n="1" goal="Initialize idea generation session">
  <action>Load research if provided</action>

  <check if="use_research_file provided">
    <action>Read file: {use_research_file}</action>
    <action>Extract: findings, content_angles, evidence</action>
    <action>Display: "✓ Loaded research from {use_research_file}"</action>
    <action>Set research_loaded = true</action>
  </check>

  <check if="use_research_file NOT provided">
    <action>Display: "No research file provided - will generate fresh ideas"</action>
    <action>Set research_loaded = false</action>
  </check>

  <action>Display to user:
    💡 Idea Generation Started

    Topic: {seed_topic}
    Target platforms: {target_platforms}
    Ideas to generate: {idea_count}
    Style: {style}

    Generating evidence-backed Idea Cards...
  </action>

  <template-output>session_initialized</template-output>
</step>

<step n="2" goal="Gather intelligence (if no research file)">
  <check if="research_loaded == false">
    <action>Perform quick research on {seed_topic}</action>

    <check if="use_trends == true">
      <action>Tool: social_media_mcp/get_trending_topics</action>
      <action>Extract relevant trends</action>
    </check>

    <action>Tool: exa_mcp/web_search_exa</action>
    <action>Parameters: query={seed_topic}, max_results=10</action>
    <action>Extract key findings and examples</action>

    <action>Store findings for idea generation</action>
  </check>

  <check if="research_loaded == true">
    <action>Skip - using research file findings</action>
  </check>

  <template-output>intelligence_gathered</template-output>
</step>

<step n="3" goal="Analyze competitors (if URLs provided)">
  <check if="competitor_urls provided">
    <action>For each competitor URL (max 3):
      - Invoke workflow: {agent-folder}/workflows/analyze-profile/workflow.yaml
      - Parameters: profile_url={url}, analysis_depth=quick
      - Extract: top_topics, hook_patterns, content_gaps
    </action>

    <action>Identify content gaps:
      - Topics they haven't covered
      - Angles they've missed
      - Underserved audience needs
    </action>

    <action>Store gap analysis for idea generation</action>
  </check>

  <template-output>competitor_analysis_complete</template-output>
</step>

<step n="4" goal="Generate Idea Cards">
  <action>Based on research + trends + gaps, generate {idea_count} Idea Cards</action>

  <action>For each idea, create structured card:</action>

  <action>**1. Title & Hook**
    - Compelling title (specific, not generic)
    - Hook line (scroll-stopping opening)
    - Hook type: question|number|story|reveal|imperative
  </action>

  <action>**2. Outline (Beats)**
    - 3-7 beats (main points)
    - Each beat = 1 key idea
    - Logical flow (setup → insight → payoff)
  </action>

  <action>**3. Evidence**
    - Supporting data/stats from research
    - Expert quotes
    - Examples/case studies
    - All with source URLs
  </action>

  <action>**4. Platform Recommendation**
    - Best platform(s) for this idea
    - Why: format fit + audience match
    - Estimated engagement potential
  </action>

  <action>**5. CTA**
    - Call-to-action appropriate for platform
    - Examples: question, share prompt, engagement driver
  </action>

  <action>**6. Metadata**
    - Target audience level
    - Content type (tutorial|opinion|story|etc)
    - Estimated production time
    - Hashtags/tags
  </action>

  <action>Ensure variety:</action>
  <action>- Mix of hook types (not all questions)</action>
  <action>- Mix of platforms (if target_platforms = all)</action>
  <action>- Mix of content types (if style = mixed)</action>
  <action>- Range of difficulty (beginner to advanced)</action>

  <template-output>idea_cards_generated</template-output>
</step>

<step n="5" goal="Create hook pack">
  <action>Extract all hooks from generated Idea Cards</action>
  <action>Generate 3 variants for top 3-5 hooks</action>

  <action>Variant types:</action>
  <action>- Different hook type (question → number)</action>
  <action>- Different angle (same idea, different framing)</action>
  <action>- Emotion-driven (add urgency, curiosity, FOMO)</action>

  <action>Result: 10-15 hooks ready for A/B testing</action>

  <template-output>hook_pack_created</template-output>
</step>

<step n="6" goal="Build content calendar (optional)">
  <check if="idea_count >= 7">
    <action>Create 7-14 day posting schedule</action>

    <action>For each day:</action>
    <action>- Select 1-2 ideas from generated cards</action>
    <action>- Map to platform(s)</action>
    <action>- Suggest posting time based on platform best practices</action>
    <action>- Add production note (video? image? text only?)</action>

    <action>Balance schedule:</action>
    <action>- Mix platforms (don't post same platform every day)</action>
    <action>- Mix content types (variety keeps audience engaged)</action>
    <action>- Consider production time (don't schedule all complex ideas first)</action>
  </check>

  <template-output>calendar_created</template-output>
</step>

<step n="7" goal="Save and present outputs">
  <action>Compile all Idea Cards into markdown document</action>
  <action>Use template: {installed_path}/templates/idea-card.md for each card</action>
  <action>Save to: {default_output_file}</action>

  <action>Display to user:

    ✅ Idea Generation Complete!

    **Generated:** {idea_count} Idea Cards
    **Topic:** {seed_topic}
    **Platforms:** {target_platforms}

    **Breakdown:**
    - {tutorial_count} tutorial ideas
    - {opinion_count} opinion ideas
    - {story_count} story ideas
    - {other_count} other types

    **Evidence:**
    - {source_count} sources cited
    - {data_point_count} data points
    - {example_count} examples

    📄 Full Idea Cards: {default_output_file}

    **Hook Pack:** {hook_count} ready-to-use hooks with variants

    **Next Steps:**
    1. Review Idea Cards
    2. Pick 1-2 to develop first
    3. Use /write-posts or /write-scripts to create content
    4. Use /competitive-analysis to refine based on competitors

    **Suggested First Idea:**
    "{top_idea_title}"
    Platform: {top_idea_platform}
    Why: {top_idea_reasoning}
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
