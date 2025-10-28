# Analyze Profile Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Cost optimization: Try FREE tools before PAID</critical>

<step n="1" goal="Initialize profile analysis">
  <action>Display to user:
    🔍 Profile Analysis Started

    URL: {profile_url}
    Analysis depth: {analysis_depth}

    Detecting platform and gathering content patterns...

  </action>

<template-output>analysis_initialized</template-output>
</step>

<step n="2" goal="Analyze profile across any platform">
  <action>Analyze the social media profile at {profile_url}. Automatically detect platform (Instagram, TikTok, Twitter, LinkedIn, YouTube), handle cost estimation and user approval, extract posts based on {analysis_depth}, analyze content patterns (hooks, topics, formats, timing), identify top performers, and log costs to memories.md.</action>
  <!-- Claude invokes profile-analysis Skill automatically -->
  <!-- Skill handles: platform detection, actor selection, cost approval, scraping, pattern analysis, cost logging -->

<template-output>profile_analyzed</template-output>
</step>

<step n="3" goal="Present analysis results">
  <action>Display summary of findings and save full report to {default_output_file}.</action>

<action>Display to user:

    ✅ Profile Analysis Complete!

    **Profile:** @{handle} ({platform})
    **Posts Analyzed:** {post_count}
    **Analysis Depth:** {analysis_depth}

    **Content Strategy:**
    - Top format: {top_format} ({engagement_lift})
    - Top topics: {top_topics}
    - Hook preferences: {hook_distribution}
    - Best posting time: {optimal_posting_time}

    **Top Performers:**
    {top_performers_summary}

    **Cost:** ${total_cost}

    📄 Full Report: {default_output_file}

    **Suggested Next Steps:**
    1. Review full report for detailed patterns
    2. Use /generate-ideas to create content based on these patterns
    3. Use /competitive-analysis to compare with competitors
    4. Use /learn-voice (if this is your profile) to build voice profile

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
