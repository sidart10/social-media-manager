# Write Scripts Workflow Instructions

<workflow>
<critical>Load voice profile FIRST for authentic voice</critical>
<critical>Be ADAPTIVE with timing - adjust to content, not rigid formulas</critical>

<step n="0" goal="Load voice profile (MANDATORY)">
  <!-- Same voice loading logic as write-posts -->
  <!-- Check exists, load if found, offer to run learn-voice if not -->
  <!-- Extract voice characteristics for script adaptation -->

<template-output>voice_loaded</template-output>
</step>

<step n="1" goal="Load Idea Card and platform specs">
  <action>Load idea_card from {idea_card_id}</action>
  <action>Load platform specs for {target_platform}</action>

<action>Validate duration parameter:</action>
<check if="duration not in platform_specs.{target_platform}.script_lengths">
<ask>⚠️ {duration}s isn't standard for {target_platform}.

    Standard lengths: {platform_specs.script_lengths}

    Options:
    1. Use closest standard: {closest_standard}s
    2. Continue with {duration}s anyway
    3. Let me recommend optimal length

    Select: [1/2/3]
    </ask>

  </check>

<action>**Load duration-specific GUIDELINES (not rigid rules):**

    For {target_platform} @ {duration}s:

    {#youtube}
    - 30-60s: Hook (5s) → 1-2 Points → CTA
    - 90-180s: Hook (5s) → Intro (10s) → 3-4 Points → CTA
    - 300-600s: Hook (5s) → Intro (15s) → 5-7 Points → Summary → CTA

    Note: These are GUIDELINES. Adjust based on:
    - Topic complexity (more complex = more setup time needed)
    - User's teaching pace (from voice profile if available)
    - Content density (research-heavy vs opinion)
    {/youtube}

    {#reels OR tiktok}
    - 30s: Hook (3s) → 3 beats (8s each) → CTA (3s)
    - 60s: Hook (3s) → 4-5 beats (12s each) → CTA (5s)
    - 90s: Hook (3s) → 5-6 beats (14s each) → Recap → CTA

    Note: First 3 seconds are CRITICAL (retention hook)
    {/reels OR tiktok}

  </action>

<template-output>specs_loaded</template-output>
</step>

<step n="2" goal="Generate base script">
  <action>Prepare script generation context</action>

<action>Tool: script_generation_mcp/script_generate</action>
<action>Parameters: - topic: {idea_card.title} - keywords: {idea_card.hashtags} + outline terms - style: {idea_card.style} - tone: {tone_override} OR {voice_profile.tone} - format: "video script for {target_platform}, {duration} seconds"
</action>

<action>Result: Generated script (multi-agent refined)</action>

  <check if="inject_evidence == true">
    <action>Enhance with evidence from idea_card:</action>
    <action>For each main point in script, find matching evidence</action>
    <action>Inject naturally:
      - "As mentioned in [Source], [stat/quote]"
      - "Research shows that [finding]"
      - Keep citations conversational for video
    </action>
  </check>

<template-output>base_script_generated</template-output>
</step>

<step n="3" goal="Apply voice adaptation">
  <check if="voice_aware_mode == true">
    <action>Adapt script to user's authentic voice</action>
    <!-- Same voice matching as write-posts:
         - Vocabulary matching
         - Sentence structure
         - Tone adjustment
         - Spoken patterns (if YouTube voice analyzed)
    -->

    <check if="voice_profile includes spoken_voice">
      <action>Extra adjustments for video:</action>
      <action>Apply conversational markers from spoken voice:
        - User's natural transitions
        - Filler words (if user uses them naturally)
        - Speaking rhythm
        - Teaching patterns
      </action>
    </check>

    <action>Display: "✓ Script adapted to match your speaking style"</action>

  </check>

<template-output>voice_adapted_script</template-output>
</step>

<step n="4" goal="Add timing and structure">
  <action>Break script into timed segments based on platform</action>

  <!-- YOUTUBE SCRIPT (Detailed Timing) -->
  <check if="target_platform == 'youtube'">
    <action>Calculate timing allocation dynamically</action>

    <action>**Timing Calculation Logic:**
      - Total duration: {duration} seconds
      - Reserve for hook: 5 seconds (fixed)
      - Reserve for intro: 10-15 seconds (varies by complexity)
      - Reserve for CTA: 10-15 seconds (fixed)
      - Remaining time: {remaining} seconds
      - Beats to cover: {idea_card.outline.length}
      - Time per beat: {remaining / beat_count} seconds (base allocation)

      - Adjust per beat based on:
        • Content density (research-heavy points get +20% time)
        • Evidence injection (quotes need +5-10s to deliver)
        • User's natural pace (from voice profile if available)
    </action>

    <action>**Build Timed Script:**

      **[0:00-0:05] HOOK** (5 seconds - CRITICAL for retention)
      {hook_script_text}

      [Visual Suggestion: {hook_visual}]
      - Type: Close-up, dramatic shot, or attention-grabbing b-roll
      - Example: "Screen recording of the problem" OR "You looking directly at camera"
      - Goal: Stop the scroll in first 2 seconds

      ---

      **[0:05-0:{intro_end}] INTRO** ({intro_duration} seconds)
      {intro_script_text}

      [Visual Suggestions:]
      - Expand on hook visually
      - Show what viewer will learn
      - B-roll examples of the topic
      - Can show you talking (build connection)

      [On-Screen Text: "{video_title_short}"]

      ---

      {#for each beat in idea_card.outline}

      **[{beat_start_time}-{beat_end_time}] POINT {beat_number}: {beat_title}** ({beat_duration} seconds)

      {beat_script_text}

      [Visual Direction:]
      - {beat_visual_suggestion}
      - Type: Screen recording | Diagram | B-roll | Talking head
      - Transition from previous point: {transition_type}

      [On-Screen Text Ideas:]
      - "{beat_key_phrase}" (large text, 2-3 seconds)
      - "{beat_stat}" (if data point)
      - "{beat_number}/{total_beats}" (progress indicator)

      [B-roll Suggestions:]
      - {beat_broll_1}
      - {beat_broll_2}

      {#if beat has evidence}
      [Citation Visual:]
      - Show source name on screen: "[Source Name]"
      - Small text with quote or stat
      - 2-3 seconds display time
      {/if}

      ---

      {/for}

      **[{cta_start}-{duration}] CTA & CLOSE** ({cta_duration} seconds)

      {cta_script_text}

      [Visual Direction:]
      - You talking directly to camera
      - Friendly, direct eye contact
      - Hand gesture toward subscribe button

      [On-Screen Elements:]
      - "Subscribe for more {topic_type} content"
      - Like button animation
      - End screen elements:
        • Related video thumbnail (left)
        • Subscribe prompt (center)
        • Channel icon (right)

      [Audio:]
      - Slightly slower pace (let CTA land)
      - Upbeat tone
      - Clear call to action

    </action>

    <action>**Pacing Review & Adjustment:**
      - Review total timing: {calculated_total} seconds
      - Check if matches {duration} target (should be within ±3 seconds)

      - If feels rushed:
        • Identify which points need more time
        • Extend those segments
        • Note: "Extended Point 3 by 8s - complex concept needs setup"

      - If feels slow/dragging:
        • Identify filler or repetitive sections
        • Tighten language
        • Note: "Tightened intro by 5s - got straight to value"

      - Provide final timing breakdown:
        Hook: {hook_duration}s
        Intro: {intro_duration}s
        Points: {points_total_duration}s
        CTA: {cta_duration}s
        Total: {final_duration}s
    </action>

    <action>**Production Notes:**

      **Thumbnail Ideas (3 options):**
      1. {thumbnail_1_description}
         - Visual: {thumb_1_visual}
         - Text overlay: "{thumb_1_text}"
         - Color scheme: {thumb_1_colors}

      2. {thumbnail_2_description}
         - Visual: {thumb_2_visual}
         - Text overlay: "{thumb_2_text}"
         - Color scheme: {thumb_2_colors}

      3. {thumbnail_3_description}
         - Visual: {thumb_3_visual}
         - Text overlay: "{thumb_3_text}"
         - Color scheme: {thumb_3_colors}

      **On-Screen Graphics Needed:**
      {#graphics}
      - {graphic_description} (appears at {timestamp})
      {/graphics}

      **B-roll Clips Needed:**
      {#broll_clips}
      - {clip_description} (duration: {clip_duration}s, used in {section})
      {/broll_clips}

      **Estimated Production Complexity:**
      - Simple (talking head only): Low
      - Moderate (talking head + screen recording): Medium
      - Complex (multi-location, heavy B-roll, graphics): High

      **This script:** {complexity_rating}
    </action>

    <action>Display:
      ✓ YouTube script formatted with timing

      **Timing Breakdown:**
      - Hook: {hook_time}s
      - Intro: {intro_time}s
      - Main points: {points_time}s ({beat_count} beats)
      - CTA: {cta_time}s
      - **Total: {final_duration}s** (target: {duration}s)

      **Production:**
      - Complexity: {complexity_rating}
      - B-roll clips: {broll_count}
      - Graphics: {graphics_count}
      - Thumbnail options: 3
    </action>

    <template-output>youtube_script_complete</template-output>

  </check>

  <!-- REELS/TIKTOK SCRIPT (Detailed Fast-Paced Structure) -->
  <check if="target_platform == 'reels' OR target_platform == 'tiktok'">
    <action>Calculate fast-paced timing</action>

    <action>**Timing Calculation:**
      - Total duration: {duration} seconds
      - Hook: 3 seconds (FIXED - non-negotiable)
      - CTA: 3-5 seconds (depending on duration)
      - Remaining: {remaining} seconds
      - Beats: {beat_count} from idea_card.outline
      - Time per beat: {remaining / beat_count} seconds
    </action>

    <action>**Build Timed Reels/TikTok Script:**

      **[0:00-0:03] HOOK** (3 seconds - MAKE OR BREAK)

      {hook_script_text}

      [VISUAL - CRITICAL:]
      - Attention-grabbing opening shot
      - Options:
        • Bold movement (person enters frame dramatically)
        • Surprising visual (unexpected element)
        • Direct to camera (intense eye contact)
        • Text-heavy (large text with key stat/question)

      [TEXT OVERLAY:]
      - "{hook_text}" in LARGE, bold font
      - Positioned: Center or top-third
      - Style: High contrast, easy to read
      - Duration: Full 3 seconds

      [AUDIO:]
      - Start with hook in first 0.5 seconds (voice OR text-to-speech OR music hit)
      - Volume: Grab attention immediately

      **Pro Tip:** If viewer doesn't stop scrolling in 1 second, they're gone. BOLD opening required.

      ---

      {#for each beat in idea_card.outline}

      **[{beat_start}-{beat_end}] BEAT {beat_number}** ({beat_duration} seconds)

      {beat_script_text}

      [VISUAL DIRECTION:]
      - Shot type: {shot_type}
        Options: Talking head | Screen recording | Product demo | B-roll | Graphic
      - Camera angle: {camera_angle}
        Options: Straight on | Slightly angled | Over shoulder | Close-up
      - Movement: {camera_movement}
        Options: Static | Slow push-in | Pan | Cut to different angle

      [TEXT OVERLAY:]
      - "{beat_key_phrase}"
      - Position: {text_position}
      - Duration: {text_duration} seconds
      - Style: {text_style}

      [PACING:]
      - Delivery speed: {pacing}
        • Fast-paced topic: Rapid delivery, quick cuts
        • Educational: Moderate pace, let concepts land
        • Storytelling: Varied pace for dramatic effect
      - Cuts per beat: {cuts_per_beat} (every 2-5 seconds keeps attention)

      [TRANSITION TO NEXT BEAT:]
      - Type: {transition_type}
        Options: Hard cut | Quick fade | Zoom transition | Swipe effect
      - Transition word: "{transition_word}"
        Examples: "Next...", "Plus...", "But here's the thing...", "And..."

      ---

      {/for}

      **[{cta_start}-{duration}] CTA** ({cta_duration} seconds)

      {cta_script_text}

      [VISUAL DIRECTION:]
      - You pointing to follow/subscribe button
      - OR Text-based CTA with arrow graphics
      - OR Quick recap montage + CTA text

      [TEXT OVERLAY:]
      - "Follow @{handle} for more"
      - OR "{cta_action_text}"
      - Large, clear, actionable

      [AUDIO:]
      - Clear, friendly tone
      - "Don't forget to {action}!"
      - Music swell (if using background music)

    </action>

    <action>**Pacing & Energy Check:**
      - Reels/TikTok require HIGH energy and FAST pacing
      - Review script pacing:
        • 30s video: Super fast, punchy, no fluff
        • 60s video: Fast but can breathe slightly
        • 90s video: Moderate pace, can develop ideas more

      - Energy level indicators:
        • Tutorial style: Moderate-high energy
        • Entertainment: High energy
        • Storytelling: Varied energy for dramatic effect

      - Ensure no "dead air" (every second has value)
    </action>

    <action>**Production Notes - Reels/TikTok Specific:**

      **Music/Audio:**
      - Tempo: {music_tempo}
        • Fast: 120-140 BPM (energetic, upbeat)
        • Medium: 90-110 BPM (moderate energy)
        • Slow: 60-80 BPM (dramatic, emotional)

      - Type: {music_type}
        • Trending sound (check TikTok/Reels trending audio)
        • Original audio (your voice only)
        • Licensed track (upbeat, non-copyrighted)

      - Volume: Background music at 20-30% (voice primary)

      **Camera Work:**
      - Primary shots: {camera_shot_list}
        • Talking head: 40-60% of video
        • B-roll/graphics: 30-40%
        • Product/demo: 10-20%

      - Movement tips:
        • Static shots: Max 3-5 seconds before cut
        • Moving shots: Slow push-in adds interest
        • Multiple angles: Cut between 2-3 camera positions

      **Editing Style:**
      - Cut frequency: Every {cut_frequency} seconds
        • 30s: Cut every 2-3s (very fast)
        • 60s: Cut every 3-4s (fast)
        • 90s: Cut every 4-5s (moderate)

      - Transitions:
        • Hard cuts: 80% (keeps energy up)
        • Quick transitions: 20% (for dramatic moments)
        • Avoid slow fades (kills energy)

      **Text Overlays:**
      - Total text elements: {text_overlay_count}
      - Style: Bold, high contrast, easy to read
      - Font: Sans-serif, large size
      - Duration: 1-3 seconds per text element
      - Position: Vary (top/center/bottom) for visual interest

      **Hashtag Strategy:**
      - Count: 3-5 optimal (avoid spam)
      - Mix: 2 broad + 2-3 niche
      - Placement: Caption (not in video)
      - Based on: {idea_card.hashtags}

      **Aspect Ratio:** 9:16 (vertical)
      **Resolution:** 1080x1920 minimum
      **Frame Rate:** 30fps minimum, 60fps preferred
    </action>

    <action>**Platform-Specific Recommendations:**

      {#if platform == 'reels'}
      **Instagram Reels:**
      - Cover photo: First frame (make it compelling)
      - Caption: Include hook + CTA (refer to write-posts workflow for caption)
      - Share to Feed: Yes (double exposure)
      - Share to Story: Consider for initial push
      - Best posting times: 11am-1pm, 7-9pm any day
      {/if}

      {#if platform == 'tiktok'}
      **TikTok:**
      - Caption: Hook + emoji + hashtags (150 char limit)
      - Sounds: Trending audio significantly boosts discovery
      - Duets/Stitches: Enable (increases reach)
      - Best posting times: 6-9am, 12-2pm, 7-11pm
      - Trends matter: Incorporate trending formats/challenges if relevant
      {/if}
    </action>

    <action>Display:
      ✓ {target_platform} script formatted with timing & visuals

      **Timing Breakdown:**
      - Hook: 0:00-0:03 (3s) - Retention critical ⚡
      - Beats: 0:03-0:{beats_end} ({beats_total}s across {beat_count} beats)
      - CTA: 0:{cta_start}-0:{duration} ({cta_duration}s)

      **Production Details:**
      - Estimated cuts: {cut_count}
      - B-roll clips: {broll_count}
      - Text overlays: {text_count}
      - Music: {music_suggestion}
      - Complexity: {complexity}

      **Pacing:**
      - Delivery speed: {pacing} (fast|moderate|relaxed)
      - Energy level: {energy} (high|moderate)
      - Cut frequency: Every ~{cut_frequency}s
    </action>

    <template-output>reels_tiktok_script_complete</template-output>

  </check>

<template-output>timing_and_visuals_added</template-output>
</step>

<step n="5" goal="Generate hook variants">
  <check if="generate_variants == true">
    <action>Create 3 alternative hooks for A/B testing</action>

    <action>**Variant 1: Different Hook Type**
      - If original is question → generate number hook ("X ways to...")
      - If original is number → generate story hook ("When I...")
      - If original is story → generate reveal hook ("The secret...")
      - Apply voice profile to variant
      - Keep within 3-5 second delivery time
    </action>

    <action>**Variant 2: Different Angle**
      - Same core idea, different framing
      - Example original: "5 AI tools that save time"
      - Variant angle: "Stop wasting 10 hours a week" (problem-first vs solution-first)
      - Apply voice profile
      - Match original's energy level
    </action>

    <action>**Variant 3: Emotion-Driven**
      - Add curiosity, urgency, or FOMO element
      - Example original: "How to automate workflows"
      - Variant emotion: "Everyone's automating except you. Here's how to catch up."
      - Apply voice profile
      - Maintain authenticity (don't be manipulative)
    </action>

    <action>All 3 variants must:
      - Work in 3-5 seconds for video
      - Be visually compatible (can imagine the shot)
      - Match user's voice profile
      - Be tested for platform (YouTube vs Reels vs TikTok)
    </action>

    <action>Display variants to user with recommendations:

      **Original Hook:**
      "{original_hook}"

      **Variant 1 ({variant_1_type}):**
      "{variant_1_text}"
      - Why: {variant_1_reasoning}

      **Variant 2 ({variant_2_type}):**
      "{variant_2_text}"
      - Why: {variant_2_reasoning}

      **Variant 3 ({variant_3_type}):**
      "{variant_3_text}"
      - Why: {variant_3_reasoning}

      **Recommendation:** Test all 3 and see which performs best!
    </action>

    <template-output>variants_generated</template-output>

  </check>
</step>

<step n="6" goal="Create handoff package and metadata">
  <action>Compile metadata for video production:</action>

<action>**Production Metadata:** - Duration: {duration}s - Platform: {target_platform} - Script word count: {word_count} - Estimated production time: {production_estimate} - Complexity: {complexity_rating}
</action>

<action>**Video-Specific:** - Title: {video_title} (from idea_card, < 100 chars for YouTube) - Description: {video_description} - Thumbnail suggestions: {thumbnail_ideas} - Tags/Hashtags: {tags} - Music/Audio: {audio_recommendations} - Visual assets needed: {asset_list}
</action>

<action>**Create Handoff Package:**

    {
      "content_type": "{platform}_script",
      "generated_by": "jarvis",
      "workflow": "write-scripts",
      "idea_card_id": "{idea_card_id}",
      "platform": "{platform}",
      "duration_seconds": {duration},
      "ready_for_agent": "ai-video-agent OR social-posting-agent",

      "script": {
        "full_text": "{script_text_only}",
        "timed_segments": [
          {"timestamp": "0:00", "type": "hook", "text": "...", "visual": "..."},
          {"timestamp": "0:05", "type": "intro", "text": "...", "visual": "..."},
          ...
        ],
        "hook_variants": ["{v1}", "{v2}", "{v3}"]
      },

      "production": {
        "title": "{video_title}",
        "description": "{description}",
        "thumbnail_ideas": ["{t1}", "{t2}", "{t3}"],
        "hashtags": ["{tag1}", ...],
        "broll_needed": ["{clip1}", "{clip2}"],
        "graphics_needed": ["{graphic1}", ...],
        "music": "{music_suggestion}"
      },

      "evidence": {
        "idea_card": "{idea_card_path}",
        "research_sources": ["{url1}", ...],
        "voice_profile_used": true
      },

      "metadata": {
        "word_count": {words},
        "estimated_production_time": "{estimate}",
        "posting_tip": "{tip}",
        "generated_at": "{timestamp}"
      }
    }

  </action>

<action>Save to: {handoff_file}</action>

<template-output>handoff_created</template-output>
</step>

<step n="7" goal="Present final output">
  <action>Display to user:

    ✅ Video Script Ready!

    **Platform:** {platform}
    **Duration:** {duration}s
    **Word Count:** {word_count}
    {#voice_aware_mode}**Voice Matched:** Yes ✓{/voice_aware_mode}

    **Hook:**
    "{final_hook}"

    {#variants}
    **Hook Variants:**
    1. "{variant_1}"
    2. "{variant_2}"
    3. "{variant_3}"
    {/variants}

    **Production Notes:**
    - Complexity: {complexity}
    - B-roll clips needed: {broll_count}
    - Graphics: {graphics_count}
    - Music: {music_suggestion}

    **Files:**
    - 📄 Script: {default_output_file}
    - 📦 Handoff Package: {handoff_file}

    **Next Steps:**
    - Review script
    - Need video created? → AI Video Agent
    - Upload yourself? → Social Posting Agent
    - Want to adjust? → Tell me what to change

    **Posting Tip:** {posting_tip}

  </action>

<template-output>workflow_complete</template-output>
</step>

</workflow>
