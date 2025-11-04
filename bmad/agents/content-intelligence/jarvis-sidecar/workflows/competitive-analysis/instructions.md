# Competitive Analysis Workflow Instructions

<workflow>
<critical>This workflow orchestrates multiple analyze-profile workflows</critical>
<critical>Track total cost across all profile analyses</critical>

<step n="0" goal="Create project folder structure">
  <action>Generate project ID:
    DATE=$(date +"%Y-%m-%d")
    PROJECT_ID="$DATE-competitive-analysis"
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
"created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
"agent": "jarvis",
"workflow": "competitive-analysis",
"your_profiles": {your_profiles},
"competitor_profiles": {competitor_profiles}
}
EOF
</action>

<action>Store PROJECT_PATH as environment variable for all subsequent steps</action>

<template-output>project_folder_created</template-output>
</step>

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

<step n="2" goal="Analyze all profiles using profile-analysis skill">
  <action>Load and follow {skills_folder}/profile-analysis/SKILL.md</action>

  <action>For each profile URL in {your_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "yours"
    - Extract: content patterns, top performers, hooks, topics, formats, timing
  </action>

  <action>For each profile URL in {competitor_profiles}:
    Execute profile analysis per SKILL.md instructions:
    - Profile URL: {url}
    - Mark as: "competitor"
    - Extract: same data as your profiles for comparison
  </action>

  <action>Track total cost across all analyses</action>

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
  <action>Save comprehensive competitive analysis report to: $PROJECT_PATH/01-research/competitive-analysis.md

Include in report:

- All profile summaries (yours + competitors)
- Side-by-side comparison tables
- Gap analysis with evidence
- Strategic recommendations
- Cost breakdown
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

<step n="5.5" goal="Link Gap Keywords to Notion (Epic 2 Story 5.3)">
  <action>Load {project-root}/bmad/core/modules/notion-relational-helpers.md</action>

<action>**Link identified gap keywords to Notion Keywords DB:**

    **Step 1: Extract gap keywords from analysis**
    - Parse strategic recommendations for content gap themes
    - Example: Gap analysis found "AI agent debugging", "MCP server setup", "Claude Code workflows"
    - Extract as keyword list: ["ai agent debugging", "mcp servers", "claude code workflows"]

    **Step 2: Ask user for Notion integration**
    - Display: f"Found {len(gap_keywords)} gap keywords to track"
    - Ask: "Add these keywords to Notion Keywords DB? yes/no"

    if user_choice == "yes":
      **Step 3: Create or find each keyword**
      - For each gap_keyword:
        result = find_or_create_keyword(gap_keyword)
        if result:
          if result.created:
            display(f"✅ Created keyword: {gap_keyword}")
          else:
            display(f"✅ Found existing: {gap_keyword}")

      **Step 4: Link to current content (if applicable)**
      - If analyzing competitors for specific content idea:
        metadata = read_json("$PROJECT_PATH/00-session/metadata.json")
        if metadata.notion.page_url exists:
          # Link gap keywords to the content being researched
          link_result = link_content_to_keywords(metadata.notion.page_url, gap_keywords)
          display(f"✅ Linked {link_result.linked_count} gap keywords to your content")

      **Step 5: Summary**
      - Display: f"📊 Keywords Summary:"
      - Display: f"   Created: {created_count} new keywords"
      - Display: f"   Found: {found_count} existing keywords"
      - Display: f"   Total tracked: {len(gap_keywords)}"

    else:
      display("ℹ️ Keywords not added to Notion - gap analysis saved locally only")
    end if

    **Error Handling:**
    - Notion unavailable: Log error, skip keyword tracking
    - Keyword creation fails: Continue with remaining keywords (partial success OK)
    - Linking fails: Log warning, keywords still created (can link manually later)

  </action>

<template-output>keywords_linked</template-output>
</step>

</workflow>
