# Write Posts Workflow Instructions

**Purpose:** Generate platform-optimized social media posts with voice matching
**Epic:** Epic 4 Story 2.2 (Voice-Matched Content Creation)

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>This workflow triggers 3 skills via context creation: post-writer, voice-matcher, platform-formatter</critical>

<step n="1" goal="Load voice profile and gather requirements">
  <action>Display:
    ✍️ Write Posts - Voice-Matched Content Generation

    This workflow generates platform-optimized posts that sound authentically like you.
    Uses: Enhanced Voice Profile v2.0 (10 rhetorical dimensions)

  </action>

<action>**Load voice profile:** - Read: {agent-folder}/jarvis-sidecar/memories.md - Extract: Enhanced Voice Profile v2.0 section - Check confidence: Should be ≥8/10 for best results

    if voice_profile not found:
      display("⚠️ No voice profile found!")
      display("ℹ️ Run *learn-voice first to analyze 50+ your posts")
      <ask>Continue without voice profile? (generic AI voice) [y/n]</ask>
      if no: <exit>Workflow cancelled - run *learn-voice first</exit>
    else:
      display(f"✅ Voice Profile v2.0 loaded (confidence: {confidence}/10)")
      display(f"   Voice modes available: {list_voice_modes}")

  </action>

<ask>What's the topic or idea?

- Paste idea card title
- Or describe topic
  </ask>
  <action>Store as {{topic}}</action>

<ask>Platform?

1. LinkedIn (PAIPS formula, <300 words, professional)
2. Twitter (Thread format, Greg Isenberg questions, or single tweet)
3. Substack (Essay, Paul Graham style, 800-1500 words)
   </ask>
   <action>Store as {{platform}}</action>

  <check if="platform == Twitter">
    <ask>Format?
    1. Single tweet (≤25000 chars Premium, ≤280 standard)
    2. Thread (7-10 tweets, numbered insights)
    </ask>
    <action>Store as {{twitter_format}}</action>
  </check>

<ask>Load from idea card or research brief? (optional - paste file path or 'none')</ask>
<action>Store as {{reference_file}}</action>

  <check if="reference_file != none">
    <action>Load reference file for context</action>
    <action>Extract: key points, evidence, hooks, platform recommendation</action>
  </check>
</step>

<step n="2" goal="Select voice mode and determine style">
  <action>**Auto-select voice mode based on topic:**

    Analyze topic keywords:
    - Tech analysis, product review, industry breakdown → **Analyst mode**
    - Personal story, community post, behind-scenes → **Casual mode**
    - Empathetic support, addressing struggles → **Community Protector mode**
    - Tongue-in-cheek, calling out absurdities → **Satirist mode**
    - Genuine excitement, recommendations → **Enthusiast mode**

    Store selected mode as {{voice_mode}}
    Display: f"🎯 Voice mode: {voice_mode}"

  </action>

<action>**Select platform formula:**

    if platform == "LinkedIn":
      formula = "Justin Welsh PAIPS"
      structure = "P: Personal story (1-2 sentences) → A: Agitate problem (2-3 sentences) → I: Introduce solution with specificity → P: Proof via example/data → S: Simple next step CTA"
      target_length = "250-300 words"
      target_format = "2-3 short paragraphs, 3 hashtags max"

    elif platform == "Twitter" and twitter_format == "Thread":
      formula = "Greg Isenberg Thread"
      structure = "Tweet 1: Hook with question or bold claim → Tweets 2-6: Numbered insights with specificity → Tweet 7: Question CTA"
      target_length = "280 chars per tweet (or 25k if Premium)"
      target_format = "7-10 tweets, numbered (1/7, 2/7...)"

    elif platform == "Twitter" and twitter_format == "Single":
      formula = "Punchy insight"
      structure = "Bold claim or question → Supporting point → Call to action or question"
      target_length = "≤280 chars standard, ≤25k Premium"

    elif platform == "Substack":
      formula = "Paul Graham Essay"
      structure = "Conversational opening ('What most people don't realize...') → Personal anecdotes → Specific examples → Meandering to insight"
      target_length = "800-1500 words"

    Display: f"📋 Using: {formula}"
    Display: f"   Structure: {structure}"
    Display: f"   Target: {target_length}"

  </action>
</step>

<step n="3" goal="Generate post content (triggers post-writer skill)">
  <action>**Create rich context for post-writer skill discovery:**

    Context for Claude (triggers post-writer skill via description matching):

    "Generate {platform} post about {topic} using {voice_mode} voice mode.

    Platform: {platform}
    Formula: {formula}
    Structure: {structure}
    Target Length: {target_length}

    Voice Profile: Enhanced Voice Profile v2.0
    - Argument Architecture: {voice_profile.argument_architecture}
    - Proof Style: {voice_profile.proof_style} (specificity ratio, personal experience %, data density)
    - Signature Phrases: {voice_profile.signature_phrases}
    - Emotional Range: {voice_profile.emotional_range}
    - Voice Mode: {voice_mode}

    Reference Material: {reference_file content if provided}

    Apply platform-specific best practices:
    - LinkedIn: PAIPS formula, <300 words, 2-3 paragraphs, professional hashtags
    - Twitter Thread: Greg Isenberg questions, numbered insights, specificity obsession
    - Substack: Paul Graham conversational, personal anecdotes, specific examples

    Match user's rhetorical DNA exactly."

    **Claude will autonomously discover post-writer skill** (description contains "LinkedIn posts", "Twitter threads", "social media", "voice-matched")

    **Skill will execute and return:** Platform-optimized post matching voice profile

    Store result as {{generated_post}}

  </action>

<action>Display generated post to user for review</action>
</step>

<step n="4" goal="Validate voice consistency (triggers voice-matcher skill)">
  <action>**Create context for voice-matcher skill:**

    "Validate the following {platform} post against Enhanced Voice Profile v2.0.

    Post: {generated_post}

    Voice Profile: {voice_profile}

    Analyze across 10 rhetorical dimensions:
    1. Argument Architecture match
    2. Voice mode consistency ({voice_mode} selected)
    3. Structural framework usage
    4. Proof style match (specificity, personal experience, data density)
    5. Humor mechanics (if Satirist mode)
    6. Emotional range alignment
    7. Closing pattern match
    8. Parenthetical usage
    9. Cultural voice consistency
    10. Comparative lens usage

    Calculate overall confidence score (0-10).
    Identify any mismatches or areas that don't sound like user."

    **Claude will discover voice-matcher skill** (description: "voice consistency", "rhetorical DNA")

    **Skill returns:** Confidence score + mismatch analysis

    Store as {{voice_validation}}

  </action>

<action>Display validation results:
Voice Confidence: {{voice_validation.score}}/10

    if score >= 9:
      display("🎉 EXCEPTIONAL voice match! Sounds exactly like you!")

    elif score >= 8:
      display("✅ STRONG voice match - authentic and on-brand")

    elif score >= 7:
      display("✅ GOOD voice match - acceptable for publication")

    else:
      display("⚠️ Voice match below threshold (7.0)")
      display("Mismatches found:")
      display({{voice_validation.mismatches}})

      <ask>Regenerate with voice corrections? [y/n]</ask>
      if yes:
        <ask>What specifically should I adjust?</ask>
        <goto step="3">Regenerate with adjustments</goto>
      end if

  </action>
</step>

<step n="5" goal="Apply platform formatting (triggers platform-formatter skill)">
  <action>**Create context for platform-formatter skill:**

    "Format the following post for {platform} specifications:

    Post: {generated_post}

    Platform: {platform}

    Apply formatting rules:
    - LinkedIn: Line breaks for readability, hashtag placement at end, call-out formatting if needed
    - Twitter Thread: Number tweets (1/7, 2/7...), character count per tweet, ensure each <25k
    - Twitter Single: Character count, @mention formatting, hashtag optimization
    - Substack: H2 headers for sections, pull quotes, email-friendly formatting

    Validate:
    - Character limits (LinkedIn 3000, Twitter 280/25k, Substack unlimited)
    - Hashtag counts (LinkedIn ≤3 optimal)
    - Link formatting
    - Readability"

    **Claude discovers platform-formatter skill** (description: "platform specifications", "formatting rules")

    **Skill returns:** Formatted post ready for platform

    Store as {{formatted_post}}

  </action>

<action>Display formatted version with stats:
Platform: {{platform}}
Character Count: {{char_count}}
Word Count: {{word_count}}
Hashtags: {{hashtag_count}}
Voice Confidence: {{voice_validation.score}}/10
</action>
</step>

<step n="6" goal="Save post to outputs with platform structure">
  <action>**Determine project slug and create folder structure:**

    Load or create project metadata:
    - If metadata.json exists: Use existing project
    - If not: Prompt user for project name

    project_slug = metadata.project.slug or prompt_user("Project name?")
    date = today's date (YYYY-MM-DD)

    **Create project folder if doesn't exist:**
    - Check: outputs/projects/{date}-{project_slug}/
    - If not exist: Copy from outputs/templates/project-structure/

    **Determine post version number:**
    - Check: 03-drafts/{platform.lower()}/
    - Count existing: post-v*.md files
    - version_num = count + 1

    **Save post:**
    - Path: outputs/projects/{date}-{project_slug}/03-drafts/{platform.lower()}/post-v{version_num}.md
    - Content: {{formatted_post}}

    **Save metadata:**
    - Path: outputs/projects/{date}-{project_slug}/03-drafts/{platform.lower()}/post-v{version_num}-metadata.json
    - Content: {
        "topic": "{{topic}}",
        "platform": "{{platform}}",
        "formula": "{{formula}}",
        "voice_mode": "{{voice_mode}}",
        "voice_confidence": {{voice_validation.score}},
        "word_count": {{word_count}},
        "character_count": {{char_count}},
        "timestamp": "ISO-8601",
        "skills_used": ["post-writer", "voice-matcher", "platform-formatter"]
      }

    Display: f"✅ Saved: 03-drafts/{platform.lower()}/post-v{version_num}.md"

  </action>
</step>

<step n="7" goal="Update Notion Status and Content (Epic 2 Integration)">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
  <action>Load {project-root}/.bmad-core/modules/notion-relational-helpers.md</action>

<action>**Update Notion Content Tracker:**

    metadata = read_json("00-session/metadata.json")

    if metadata.notion.page_url exists:
      **Step 1: Update status progression**
      - Current status determines transition:
        - If current="Research" → new="Writing"
        - If current="Writing" → new="Editing"
        - If current="Idea" → new="Writing" (skip Research if no research done)

      - result = update_content_status(metadata.notion.page_url, new_status, "Jarvis", metadata)

      - if result.success:
          display(f"✅ Notion Status: {result.previous_status} → {result.new_status}")

      **Step 2: Save post content to Notion**
      - update_content_property(
          metadata.notion.page_url,
          {
            "Content Text": {{formatted_post}},
            "Publish Date": estimate_publish_date({{platform}}),  # Today + 1-2 days
            "Category": infer_category({{topic}})
          },
          "Jarvis"
        )

      - display("✅ Post saved to Notion Content Text")

      **Step 3: Link to Channel**
      - channel_result = link_content_to_channel(metadata.notion.page_url, {{platform}})
      - if channel_result.success:
          display(f"✅ Linked to {channel_result.channel_name}")

      **Step 4: Log to session**
      - append_to_file("00-session/session-log.md",
          f"{timestamp} - Jarvis: Generated {platform} post (voice: {voice_validation.score}/10), Status → {new_status}\n"
        )

    else:
      display("ℹ️ No Notion page linked (local-only project)")
    end if

  </action>
</step>

<step n="8" goal="Present final post and suggest next steps">
  <action>Display completion summary:

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ✅ Post Generation Complete!
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    **Platform:** {{platform}}
    **Topic:** {{topic}}
    **Formula:** {{formula}}

    **Quality:**
    - Voice Confidence: {{voice_validation.score}}/10
    - Word Count: {{word_count}}
    - Character Count: {{char_count}}

    **File:** 03-drafts/{{platform}}/post-v{{version_num}}.md

    **Voice Mode:** {{voice_mode}}
    (Analyst, Casual, Community Protector, Satirist, or Enthusiast)

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    **Next Steps:**
    1. Review post in 03-drafts/{{platform}}/
    2. Generate visuals: Invoke /zoe for thumbnail/graphics
    3. Publish: Invoke /zoro to schedule via Postiz
    4. Or iterate: Run *write-posts again with refinements

  </action>

<ask>What next?

1. Generate another post (same or different platform)
2. Generate variants (3 versions of same post)
3. Create thumbnail (hand to Zoe)
4. Done
   </ask>

  <check if="option 1">
    <goto step="1">Start new post</goto>
  </check>

  <check if="option 2">
    <action>Generate 3 variants with different hooks/angles</action>
    <action>Save as post-v{n}-variant-{1,2,3}.md</action>
    <action>Display all 3 for A/B testing selection</action>
  </check>

  <check if="option 3">
    <action>Display: "Invoke /zoe and select *create-single-image"</action>
    <action>Display: "Design choice: 1 for LinkedIn, 2 for YouTube"</action>
    <action>Create handoff package: handoffs/jarvis-to-zoe.json with topic, platform, post location</action>
  </check>

<template-output>workflow_complete</template-output>
</step>

</workflow>
