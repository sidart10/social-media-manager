# Competitive Analysis Workflow Instructions

<workflow>
<critical>This workflow orchestrates multiple analyze-profile workflows</critical>
<critical>Track total cost across all profile analyses</critical>

<step n="1" goal="Validate inputs and estimate costs">
  <action>Validate inputs:
    - At least 1 your_profile provided
    - At least 1 competitor_profile provided
    - Total profiles <= 8 (avoid excessive API costs)
  </action>

<action>Calculate estimated cost: - FREE platforms (YouTube): $0 - LOW-COST platforms (LinkedIn): ~$0.10 each - PAID platforms (Instagram/Twitter): ~$0.40 each - Total estimated: ${total_estimate}
</action>

<ask>Competitive Analysis Setup:

**Your Profiles:** {your_profile_count}
**Competitor Profiles:** {competitor_profile_count}
**Total Profiles:** {total_profile_count}

**Estimated Cost:** ~${total_estimate}

Proceed? [yes/no]
</ask>

  <check if="user declines">
    <action>Exit workflow</action>
  </check>

<action>Display:
🔍 Competitive Analysis Started

    Analyzing {total_profile_count} profiles...
    This may take 2-5 minutes.

  </action>

<template-output>initialized</template-output>
</step>

<step n="2" goal="Analyze all profiles">
  <action>For each profile URL in {your_profiles}:
    Analyze the profile completely, extracting content patterns, top performers, hooks, topics, formats, and timing. Mark as "yours" for context.
  </action>
  <!-- Claude invokes profile-analysis Skill for each URL -->

<action>For each profile URL in {competitor_profiles}:
Analyze the competitor profile completely, extracting same data as your profiles for comparison.
</action>

  <!-- Claude invokes profile-analysis Skill for each URL -->

<action>Track total cost across all analyses.</action>

<template-output>all_profiles_analyzed</template-output>
</step>

<step n="3" goal="Compare and identify gaps">
  <action>Compare your profiles vs. competitors across:
    - Content topics (what they cover that you don't)
    - Hook types and effectiveness
    - Format distribution and performance
    - Posting frequency and timing
    - Engagement rates and patterns
    - Unique angles and approaches
  </action>

<action>Identify competitive gaps: - Topics competitors haven't covered - Hook types underutilized by competitors - Format opportunities - Timing advantages - Audience needs not being served
</action>

<action>Identify your advantages: - Topics you do better - Unique approaches - Format strengths - Engagement wins
</action>

<template-output>gaps_identified</template-output>
</step>

<step n="4" goal="Generate strategic recommendations">
  <action>Based on gap analysis, generate 5-10 strategic recommendations:</action>

<action>For each recommendation: - **Opportunity:** What gap or advantage - **Evidence:** Data from competitor analysis - **Action:** Specific content strategy - **Expected Impact:** Why this will work - **Priority:** high|medium|low
</action>

<action>Group recommendations by: - Quick wins (easy to implement, high impact) - Strategic plays (harder but valuable) - Defensive moves (protect your advantages)
</action>

<template-output>recommendations_generated</template-output>
</step>

<step n="5" goal="Save and present outputs">
  <action>Save comprehensive competitive analysis report to {default_output_file}</action>

<action>Include in report: - All profile summaries (yours + competitors) - Side-by-side comparison tables - Gap analysis with evidence - Strategic recommendations - Cost breakdown
</action>

<action>Display to user:

    ✅ Competitive Analysis Complete!

    **Profiles Analyzed:** {total_profile_count}
    - Your profiles: {your_profile_count}
    - Competitor profiles: {competitor_profile_count}

    **Total Cost:** ${actual_total_cost}

    **Top 3 Opportunities:**
    1. {opportunity_1}
    2. {opportunity_2}
    3. {opportunity_3}

    **Your Competitive Advantages:**
    - {advantage_1}
    - {advantage_2}

    📄 Full Report: {default_output_file}

    **Next Steps:**
    1. Review strategic recommendations
    2. Use /generate-ideas to create content for identified gaps
    3. Use /write-posts to execute quick wins

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
