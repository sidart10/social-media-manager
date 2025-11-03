# Generate Ideas Workflow Instructions

<workflow>
<critical>Load workflow.xml engine and workflow.yaml first</critical>
<critical>Use existing research when available to avoid duplicate API calls</critical>

<step n="0" goal="Create project folder structure">
  <action>Generate project ID:
    DATE=$(date +"%Y-%m-%d")
    TOPIC_SLUG=$(echo "{seed_topic}" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
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
"topic": "{seed_topic}",
"created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
"agent": "jarvis",
"workflow": "generate-ideas"
}
EOF
</action>

<action>Store PROJECT_PATH as environment variable for all subsequent steps</action>

<template-output>project_folder_created</template-output>
</step>

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
    <action>Perform quick research on {seed_topic} to gather key findings and examples.</action>

    <check if="use_trends == true">
      <action>Get trending topics and hashtags related to {seed_topic} for timeliness and relevance.</action>
      <!-- Claude invokes social-media-research Skill automatically -->
    </check>

    <action>Conduct quick web search for key insights, statistics, and recent examples about {seed_topic}.</action>
    <!-- Claude invokes deep-web-research Skill automatically -->

    <action>Track evidence with sources for idea backing.</action>
    <!-- Claude invokes evidence-tracker Skill automatically -->

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

<action>**1. Title & Hook** - Compelling title (specific, not generic) - Hook line (scroll-stopping opening) - Hook type: question|number|story|reveal|imperative
</action>

<action>**2. Outline (Beats)** - 3-7 beats (main points) - Each beat = 1 key idea - Logical flow (setup → insight → payoff)
</action>

<action>**3. Evidence** - Supporting data/stats from research - Expert quotes - Examples/case studies - All with source URLs
</action>

<action>**4. Platform Recommendation** - Best platform(s) for this idea - Why: format fit + audience match - Estimated engagement potential
</action>

<action>**5. CTA** - Call-to-action appropriate for platform - Examples: question, share prompt, engagement driver
</action>

<action>**6. Metadata** - Target audience level - Content type (tutorial|opinion|story|etc) - Estimated production time - Hashtags/tags
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
  <action>Save to: $PROJECT_PATH/02-ideas/idea-cards.md

Include:

- All {idea_count} Idea Cards with hooks, outlines, evidence
- Hook pack (10+ variations)
- Platform recommendations
- Content calendar (7-14 days)
- Evidence summary with all source URLs
  </action>

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

<step n="7.5" goal="Create Notion Pages with Full Relational Linking (Epic 2 Story 5.3)">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
  <action>Load {project-root}/.bmad-core/modules/notion-relational-helpers.md</action>

<action>**Create Notion page for each Idea Card:**

    <for-each idea in idea_cards>
      **Step 1: Create Content Tracker page**
      - Call: create_content_page(
          idea_card: {
            title: idea.title,
            category: determine_category(idea.topic),  # Tech Insights, AI Products, etc.
            priority: idea.priority or "2nd Priority",
            description: idea.outline (first 100 chars),
            platform: idea.platform_recommendation,
            keywords: idea.keywords
          },
          project_metadata: metadata
        )

      if page_result.success:
        page_url = page_result.page_url
        display(f"✅ Created Notion page: {idea.title}")

        **Step 2: Link to Channel**
        - Call: link_content_to_channel(page_url, idea.platform_recommendation)
        - Example: platform="LinkedIn" → Links to "LinkedIn & X" channel
        - Example: platform="YouTube" → Links to "YouTube" channel

        if channel_result.success:
          display(f"   → Linked to channel: {channel_result.channel_name}")
        else:
          display(f"   ⚠️ Channel not found: {idea.platform_recommendation} (create in Notion)")

        **Step 3: Link to Keywords**
        - Call: link_content_to_keywords(page_url, idea.keywords)
        - For each keyword: Search Keywords DB, create if doesn't exist
        - Link all keywords to content page via Focus Keywords relation

        if keywords_result.linked_count > 0:
          display(f"   → Linked {keywords_result.linked_count} keywords ({keywords_result.created_count} new)")

        **Step 4: Save page URL to local metadata**
        - metadata.notion_pages_created.append({
            "title": idea.title,
            "url": page_url,
            "status": "Idea",
            "platform": idea.platform_recommendation
          })
        - save_json("00-session/metadata.json", metadata)

        **Step 5: Log to session**
        - append_to_file("00-session/session-log.md",
            f"{timestamp} - Jarvis: Created Notion page '{idea.title}' with Status=Idea, linked to {channel}, {keywords_count} keywords\n"
          )

      else:
        display(f"⚠️ Notion page creation failed for '{idea.title}': {page_result.error}")
        display("ℹ️ Idea Card saved locally in {default_output_file}")
        display("ℹ️ You can manually create Notion page later")
      end if
    </for-each>

    **Summary after all ideas processed:**
    - Display: f"📊 Notion Summary: Created {success_count} of {idea_count} pages"
    - Display: f"   Channels linked: {unique_channels_count}"
    - Display: f"   Keywords linked: {total_keywords_linked} ({new_keywords_created} newly created)"

    **Error Handling:**
    - If Notion API unavailable: Log error, display warning, all ideas saved locally
    - If channel not found: Log warning, page still created but without channel link (user can add manually)
    - If keyword creation fails: Log warning, continue with other keywords (partial success OK)
    - Network timeout: Skip Notion integration for that idea, continue with next idea

  </action>

<template-output>notion_pages_created</template-output>
</step>

</workflow>
