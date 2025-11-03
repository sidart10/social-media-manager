# Analyze Profile Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Cost optimization: Try FREE tools before PAID</critical>

<step n="0" goal="Create project folder structure">
  <action>Generate project ID:
    DATE=$(date +"%Y-%m-%d")
    PROFILE_SLUG=$(echo "{profile_url}" | sed 's|https*://||' | sed 's|/.*||' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')
    PROJECT_ID="$DATE-$PROFILE_SLUG"
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
"profile_url": "{profile_url}",
"platform": "{platform}",
"created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
"agent": "jarvis",
"workflow": "analyze-profile"
}
EOF
</action>

<action>Store PROJECT_PATH as environment variable for all subsequent steps</action>

<template-output>project_folder_created</template-output>
</step>

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
  <action>Save complete profile analysis to: $PROJECT_PATH/01-research/profile-analysis.md

Include:

- Profile summary (bio, metrics, posting cadence)
- Content strategy analysis
- Top 10 performers with URLs
- Pattern library (hooks, formats, topics)
- 5-7 actionable recommendations with evidence
- Cost log
  </action>

<action>Display summary of findings</action>

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

<step n="3.5" goal="Create Notion Child Content Page (Epic 2 Story 5.2)">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
  <action>Load {project-root}/.bmad-core/modules/notion-relational-helpers.md</action>

<action>**Optional: Create child content page for profile analysis in Notion**

    **Ask user:** "Create Notion page for this profile analysis? yes/no (can reference later for competitive intel)"

    if user_choice == "yes":
      **Step 1: Create Content Tracker page**
      - Call: create_content_page(
          idea_card: {
            title: f"Profile Analysis: @{handle} ({platform})",
            category: "Competitive Intelligence" or infer from profile content,
            priority: "3rd Priority",
            description: f"Analysis of @{handle}: {top_format}, {top_topics}",
            platform: platform,
            keywords: extract_keywords_from_analysis(top_topics)
          },
          project_metadata: metadata
        )

      if page_result.success:
        page_url = page_result.page_url
        display(f"✅ Created Notion page: Profile Analysis - @{handle}")

        **Step 2: Save profile report to Notion Content Text**
        - Read full report from: {default_output_file}
        - Call: update_content_property(
            page_url,
            {"Content Text": full_report_markdown},
            "Jarvis"
          )

        **Step 3: Link to Channel**
        - Call: link_content_to_channel(page_url, platform)
        - Example: platform="LinkedIn" → Links to "LinkedIn & X"

        **Step 4: Link as Note to parent content (if analyzing for specific content idea)**
        - If user is analyzing competitor for their own content:
          - Ask: "Link this analysis to a specific content idea in Notion?"
          - If yes: Prompt for parent content URL
          - Link via Notes relation

        **Step 5: Save page URL**
        - metadata.notion_pages_created.append({
            "title": f"Profile Analysis: @{handle}",
            "url": page_url,
            "type": "profile_analysis"
          })
        - save_metadata(metadata)

        display(f"✅ Profile analysis saved to Notion for future reference")

      else:
        display(f"⚠️ Notion page creation skipped or failed")
        display(f"ℹ️ Analysis saved locally: {default_output_file}")
      end if

    else:
      display("ℹ️ Notion page not created - analysis saved locally only")
    end if

  </action>

<template-output>notion_optional_created</template-output>
</step>

</workflow>
