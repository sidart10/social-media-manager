# Competitive Analysis Workflow Instructions

<workflow>
<critical>This workflow orchestrates multiple analyze-profile workflows</critical>
<critical>Track total cost across all profile analyses</critical>

<step n="1" goal="Validate inputs and initialize">
  <action>Parse {your_profiles} array</action>
  <action>Parse {competitor_profiles} array</action>

  <action>Validate:</action>
  <action>- At least 1 your_profile provided</action>
  <action>- At least 1 competitor_profile provided</action>
  <action>- Total profiles <= 8 (avoid excessive API costs)</action>

  <action>Calculate estimated cost:</action>
  <action>- FREE platforms (YouTube): $0</action>
  <action>- LOW-COST platforms (LinkedIn): ~$0.10 each</action>
  <action>- PAID platforms (Instagram/Twitter): ~$0.40 each</action>
  <action>- Total estimated: ${total_estimate}</action>

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

<step n="2" goal="Analyze YOUR profiles">
  <action>For each URL in {your_profiles}:</action>

  <action>Invoke workflow: {agent-folder}/workflows/analyze-profile/workflow.yaml</action>
  <action>Parameters:
    - profile_url={url}
    - analysis_depth=standard
    - is_your_profile=true (prefer free APIs)
  </action>

  <action>Store results:
    - profile_summary
    - content_strategy
    - top_performers
    - pattern_library
    - cost
  </action>

  <action>Display: "✓ Analyzed YOUR profile: {handle} ({platform})"</action>

  <template-output>your_profiles_analyzed</template-output>
</step>

<step n="3" goal="Analyze COMPETITOR profiles">
  <action>For each URL in {competitor_profiles}:</action>

  <action>Invoke workflow: {agent-folder}/workflows/analyze-profile/workflow.yaml</action>
  <action>Parameters:
    - profile_url={url}
    - analysis_depth=standard
    - is_your_profile=false
  </action>

  <action>Store results (same as step 2)</action>

  <action>Display: "✓ Analyzed competitor: {handle} ({platform})"</action>

  <template-output>competitor_profiles_analyzed</template-output>
</step>

<step n="4" goal="Build comparison matrix">
  <action>Create side-by-side comparison table</action>

  <check if="comparison_metrics includes 'engagement' OR 'all'">
    <action>Compare engagement metrics:</action>
    <action>- Average likes per post</action>
    <action>- Average comments per post</action>
    <action>- Average shares per post</action>
    <action>- Engagement rate %</action>
    <action>- Best performing content type</action>
  </check>

  <check if="comparison_metrics includes 'frequency' OR 'all'">
    <action>Compare posting frequency:</action>
    <action>- Posts per week</action>
    <action>- Best posting days</action>
    <action>- Best posting times</action>
    <action>- Consistency score</action>
  </check>

  <check if="comparison_metrics includes 'topics' OR 'all'">
    <action>Compare topic coverage:</action>
    <action>- Top 5 topics for each profile</action>
    <action>- Topic overlap (what everyone covers)</action>
    <action>- Unique topics (what each does differently)</action>
    <action>- Topic gaps (what nobody covers)</action>
  </check>

  <check if="comparison_metrics includes 'formats' OR 'all'">
    <action>Compare content formats:</action>
    <action>- Format distribution (text/image/video/carousel)</action>
    <action>- Best performing format per profile</action>
    <action>- Format gaps</action>
  </check>

  <action>Identify YOUR competitive position:</action>
  <action>- Where you're ahead (strengths)</action>
  <action>- Where you're behind (weaknesses)</action>
  <action>- Where you're different (differentiation)</action>

  <template-output>comparison_matrix_built</template-output>
</step>

<step n="5" goal="Perform gap analysis">
  <action>Identify content gaps across 4 dimensions:</action>

  <action>**1. Topic Gaps**</action>
  <action>- Topics competitors cover but you don't</action>
  <action>- Topics nobody covers (blue ocean)</action>
  <action>- Subtopics within covered topics (depth gaps)</action>

  <action>**2. Format Gaps**</action>
  <action>- Formats competitors use successfully but you don't</action>
  <action>- Underutilized formats in the space</action>
  <action>- Format + topic combinations nobody's tried</action>

  <action>**3. Hook Gaps**</action>
  <action>- Hook types competitors use that you don't</action>
  <action>- Hook patterns that work well but are underused</action>
  <action>- Unique angles nobody's taking</action>

  <action>**4. Timing Gaps**</action>
  <action>- Posting times with low competition</action>
  <action>- Days competitors aren't posting</action>
  <action>- Opportunities for counter-programming</action>

  <action>For each gap, assess:</action>
  <action>- Opportunity size (high|medium|low)</action>
  <action>- Difficulty to execute (easy|moderate|hard)</action>
  <action>- Competitive advantage potential</action>

  <template-output>gap_analysis_complete</template-output>
</step>

<step n="6" goal="Generate differentiation strategy">
  <action>Based on gaps + your strengths, create 3 strategic recommendations</action>

  <action>Each recommendation includes:</action>

  <action>**Recommendation 1: [Category]**</action>
  <action>- Finding: What the analysis shows</action>
  <action>- Opportunity: The gap you can exploit</action>
  <action>- Strategy: Specific approach to take</action>
  <action>- Evidence: Examples from competitor analysis</action>
  <action>- Expected impact: Predicted outcome</action>
  <action>- First steps: 2-3 immediate actions</action>

  <action>Focus areas for recommendations:</action>
  <action>- Quick wins (low effort, high impact)</action>
  <action>- Strategic moves (build competitive moat)</action>
  <action>- Differentiation plays (carve unique position)</action>

  <template-output>strategy_generated</template-output>
</step>

<step n="7" goal="Create 7-day action plan (if requested)">
  <check if="generate_action_plan == true">
    <action>Build 7-day content plan targeting identified gaps</action>

    <action>For each day:</action>
    <action>- Select 1 gap to target</action>
    <action>- Propose specific content idea</action>
    <action>- Map to platform</action>
    <action>- Suggest hook type</action>
    <action>- Provide evidence/reasoning</action>
    <action>- Estimate production time</action>

    <action>Plan structure:</action>
    <action>Days 1-2: Quick wins (easy gaps, fast execution)</action>
    <action>Days 3-5: Strategic content (medium difficulty)</action>
    <action>Days 6-7: Differentiation plays (unique positioning)</action>

    <action>Balance across:</action>
    <action>- Platforms</action>
    <action>- Content types</action>
    <action>- Topics</action>
    <action>- Production complexity</action>
  </check>

  <template-output>action_plan_created</template-output>
</step>

<step n="8" goal="Save outputs and present">
  <action>Compile all sections into comprehensive report</action>
  <action>Use templates:
    - {installed_path}/templates/comparison-matrix.md
    - {installed_path}/templates/gap-analysis.md
  </action>
  <action>Save to: {default_output_file}</action>

  <action>Calculate total cost:</action>
  <action>Sum all analyze-profile costs from steps 2-3</action>

  <action>Display to user:

    ✅ Competitive Analysis Complete!

    **Profiles Analyzed:**
    - Your profiles: {your_count}
    - Competitors: {competitor_count}
    - Total: {total_count}

    **Key Findings:**
    - {finding_1}
    - {finding_2}
    - {finding_3}

    **Top Opportunities:**
    1. {opportunity_1}
    2. {opportunity_2}
    3. {opportunity_3}

    **Differentiation Strategy:**
    {strategy_summary}

    **Cost:** ${total_cost} ({cost_breakdown})

    📄 Full Report: {default_output_file}

    **Next Steps:**
    1. Review full comparison matrix
    2. Pick 1-2 gaps to target immediately
    3. Use /generate-ideas to create content for gaps
    4. Execute 7-day action plan

    **Quick Action:**
    Start with: {quick_win_recommendation}
    Why: {quick_win_reasoning}
  </action>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
