# Write Scripts Workflow Instructions

**Purpose:** Generate YouTube/Short video scripts with timestamps and thumbnail concepts
**Epic:** Epic 4 Story 2.3 (Video Script Generation with Thumbnail Concepts)

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Triggers content-writer skill (handles YouTube scripts with voice application internally)</critical>

<step n="1" goal="Load voice profile and gather requirements">
  <action>Display in {communication_language}:
    🎬 Write Scripts - Voice-Matched Video Content

    Generates production-ready scripts with:
    - Timestamps and scene descriptions
    - Voice-matched narration
    - 3 thumbnail concepts (MrBeast/Thomas Frank psychology)
    - YouTube metadata (title, description, tags)

  </action>

<action>Load voice profile from memories.md (same as write-posts)</action>

<ask>Video topic or idea?</ask>
<action>Store as {{topic}}</action>

<ask>Format?

1. Ali Abdaal Top 5 (Hook → Intro → 5 items → Outro)
2. MKBHD Tech Review (Cold open → Specs → Deep dive → Verdict)
3. Tutorial (Problem → Solution → Step-by-step → Result)
4. Short-form (Hook → Key point → CTA, <60 seconds)
   </ask>
   <action>Store as {{format}}</action>

<ask>Target duration? (minutes)</ask>
<action>Store as {{duration}}</action>

<ask>Load from research brief or idea card? (path or 'none')</ask>
<action>Store as {{reference_file}}</action>
</step>

<step n="2" goal="Generate script (triggers content-writer skill)">
  <action>**Create context for content-writer skill:**

    "Generate {format} YouTube script for {duration} minute video about {topic}.

    Format: {format}
    Duration: {duration} minutes
    Voice: {voice_mode} (from voice profile)

    Format Structures:
    - Ali Abdaal Top 5: Hook (0:00-0:15) → Intro (0:15-1:00) → Items 1-5 (each 1-2 min with title card, explanation, example) → Outro (30s recap + CTA)
    - MKBHD Tech Review: Cold open (0:00-0:30) → Specs (0:30-2:00) → Deep dive (2:00-8:00) → Verdict (final 1-2 min)
    - Tutorial: Problem intro (0:00-1:00) → Solution overview (1:00-2:00) → Step-by-step (2:00-duration-2) → Result demo (final 2 min)
    - Short-form: Hook (0:00-0:05) → Key insight (0:05-0:50) → CTA (0:50-0:60)

    Include:
    - Timestamp markers: [00:15], [01:30], [02:45]
    - Scene descriptions: 'B-roll: Close-up of...', 'Screen record: Demo of...'
    - Chapter markers for YouTube: 00:00 Intro, 02:15 Feature 1, etc.
    - Retention tactics: Pattern interrupts, questions, payoffs

    Match Sid's authentic voice from memories for narration (DEFAULT behavior)."

    **Claude discovers content-writer skill** (description includes "YouTube scripts")

    **Skill returns:** Full script with timestamps + scenes + Sid's voice applied

    Store as {{generated_script}}

  </action>

<action>Display script preview (first 500 chars + structure)</action>
</step>

<step n="3" goal="Generate thumbnail concepts (hand off to Zoe)">
  <action>**Note: Thumbnail generation is now handled by Zoe's youtube-thumbnail-design skill**

    Display: "💡 For thumbnail creation, invoke /zoe and use youtube-thumbnail-design skill"

    **Optional: Create thumbnail concept notes:**

    "Generate 3 CTR-optimized thumbnail concepts for video: {topic}

    Video format: {format}
    Target audience: {infer from topic}

    Apply psychology:
    - MrBeast 6 Pillars: Readable text, expressive face, high contrast, vibrant colors, curiosity gap, pattern interruption
    - Thomas Frank AIDA: Attention (bold visual), Interest (compelling text), Desire (value prop), Action (implied CTR)

    For each concept provide:
    - Design description (composition, colors, elements)
    - Text overlay (6-8 words max, large font)
    - Color palette (hex codes, vibrant/saturated)
    - Composition notes (face placement, text placement)
    - CTR psychology (what creates curiosity gap)

    Store as {{thumbnail_brief}} for handoff to Zoe

  </action>

<action>Display thumbnail brief for Zoe handoff</action>
</step>

<step n="4" goal="Generate YouTube metadata">
  <action>**Create optimized metadata:**

    **Title (60-70 characters):**
    - Keyword-rich for SEO
    - Curiosity-driven
    - Front-load important words
    - Example: "How I Built an AI Agent in 24 Hours (Full Tutorial)"

    **Description (first 150 characters critical):**
    - Hook in first line (shows in preview)
    - Chapter timestamps (00:00 Intro, 02:15 Setup, etc.)
    - Links to resources
    - 3-5 relevant hashtags

    **Tags (15-20 tags):**
    - Primary keyword: {topic main keyword}
    - Secondary keywords: Related terms
    - Competitor tags: Popular in niche
    - Format tags: "tutorial", "review", etc.

    **Category:**
    - Use youtube-growth-mastery knowledge to suggest
    - Example: Tech review → Category 28 (Science & Technology)

    Store as {{youtube_metadata}}

  </action>
</step>

<step n="5" goal="Save script with all assets">
  <action>**Save to project structure:**

    project_slug = metadata.project.slug or prompt("Project name?")
    date = YYYY-MM-DD

    Create if needed: outputs/projects/{date}-{project_slug}/03-drafts/youtube/

    version_num = count existing scripts + 1

    **Save script:**
    - Path: 03-drafts/youtube/script-v{version_num}.md
    - Content: Full script with timestamps, scenes, chapter markers

    **Save thumbnail concepts:**
    - Path: 03-drafts/youtube/thumbnail-concepts-v{version_num}.md
    - Content: All 3 concepts with design specs

    **Save YouTube metadata:**
    - Path: 03-drafts/youtube/youtube-metadata-v{version_num}.md
    - Content: Title, description, tags, category

    Display: f"✅ Saved script bundle to 03-drafts/youtube/"

  </action>
</step>

<step n="6" goal="Update Notion (Epic 2 Integration)">
  <action>Load notion-updates module</action>

<action>**Update Notion:**

    if metadata.notion.page_url exists:
      **Step 1: Save script to Content Text**
      - update_content_property(
          metadata.notion.page_url,
          {
            "Content Text": {{generated_script}},
            "YouTube Title ideas": {{youtube_metadata.title}},
            "Thumbnail ideas": format_thumbnail_concepts({{thumbnail_concepts}})
          },
          "Jarvis"
        )

      **Step 2: Update status**
      - update_content_status(metadata.notion.page_url, "Editing", "Jarvis", metadata)
      - display("✅ Notion Status → Editing (script ready for production)")

      **Step 3: Link to YouTube channel**
      - link_content_to_channel(metadata.notion.page_url, "YouTube")

      **Step 4: Log**
      - append_to_file("00-session/session-log.md",
          f"{timestamp} - Jarvis: Generated {format} script ({duration} min), 3 thumbnail concepts\n"
        )

    else:
      display("ℹ️ No Notion page linked")
    end if

  </action>
</step>

<step n="7" goal="Suggest production workflow">
  <action>Display:

    🎬 Script Complete - Production Workflow:

    **Created:**
    ✅ Video script ({duration} minutes, {format})
    ✅ 3 thumbnail concepts (CTR-optimized)
    ✅ YouTube metadata (title, description, tags)

    **Next Steps for Production:**

    1. **Create Thumbnail:**
       - Invoke: /zoe
       - Command: *create-single-image
       - Design: Option 2 (YouTube)
       - Use: Thumbnail concept #{user selects 1, 2, or 3}

    2. **Record/Create Video:**
       - Option A: Record yourself following script
       - Option B: Use /zoe *create-talking-head (HeyGen avatar)
       - Option C: Use /zoe *create-scene (animate diagram/b-roll)

    3. **Upload to YouTube:**
       - Invoke: /zoro
       - Command: *publish-youtube-now or *schedule-post
       - Metadata: Use generated title/description/tags

    **Handoff Package:**
    - Created: handoffs/jarvis-to-zoe.json
    - Contains: Topic, selected thumbnail concept, script location

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
