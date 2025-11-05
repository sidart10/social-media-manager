# Professional Video Editing Workflow - Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/agents/zoe/zoe-sidecar/workflows/video-editing/workflow.yaml</critical>
<critical>You MUST load the SubMagic editing guide: {submagic_editing_guide}</critical>
<critical>Communicate in {communication_language} with {user_name} throughout this workflow</critical>

<workflow>

<step n="1" goal="Understand the project vision and purpose">
<action>Engage in professional discovery conversation to understand their video project:

Welcome {user_name} to the professional video editing suite!

I'm going to ask you questions like a professional video editor would to understand your project completely.

First, let's understand the big picture:

- What is the PURPOSE of this video? (brand awareness, product demo, tutorial, entertainment, announcement, etc.)
- What is the KEY MESSAGE you want viewers to take away?
- What ACTION do you want viewers to take after watching? (visit site, buy product, learn something, share, etc.)

Listen carefully to their responses and adapt follow-up questions based on context.
If they're unsure, help them think through it with examples.
</action>

<action>Store the following as variables:

- {{video_purpose}}
- {{key_message}}
- {{desired_action}}
  </action>
  </step>

<step n="2" goal="Identify target platform and audience">
<ask>Where will this video be published?

1. **TikTok** - Vertical, 15-30 sec, high energy
2. **Instagram Reels** - Vertical, 30-60 sec, engaging
3. **YouTube Shorts** - Vertical, 60-180 sec, storytelling
4. **YouTube** - Horizontal, longer format, educational/entertainment
5. **LinkedIn** - Vertical or horizontal, 60-90 sec, professional
6. **Twitter/X** - Horizontal, 30-120 sec, concise
7. **Multiple platforms** - I'll optimize for the primary one

Enter number (1-7):</ask>

<action>Store {{target_platform}} and load platform specifications from {platform_specs}</action>

<action>Now understand the audience:

Who is watching this video?

- What's their age range and demographics?
- What's their attention span? (quick scrollers vs engaged viewers)
- What's their familiarity with the topic? (beginners vs experts)
- What content style do they prefer? (fast-paced vs thoughtful, entertaining vs informative)

Adapt your questions to their platform choice - TikTok audiences differ from LinkedIn!
</action>

<action>Store audience profile as {{target_audience}}</action>
</step>

<step n="3" goal="Gather source content and assets">
<critical>SubMagic requires publicly accessible HTTPS URLs - all assets MUST be on Cloudinary</critical>

<ask>What video source do you have?

1. **Raw footage** - I have a video file that needs editing
2. **HeyGen avatar video** - I generated a talking head video
3. **YouTube URL** - I want to create viral clips from a long video
4. **Multiple clips** - I have several videos to merge then edit

Enter number (1-4):</ask>

<action>Store {{source_type}}</action>

<action if="source_type == 'Raw footage' or source_type == 'HeyGen avatar video'">
Ask for the Cloudinary URL of the video:

**IMPORTANT:** I need a Cloudinary URL (starts with https://res.cloudinary.com/).

If you have a local file, I can help you upload it to Cloudinary first.

Do you have:

- The Cloudinary URL? (paste it)
- A local file path? (I'll upload it for you)
  </action>

<action if="user has local file">
Use mcp__cloudinary-asset-mgmt__upload-asset to upload the video and get the public URL.
Store as {{video_source_url}}.
</action>

<action if="user has Cloudinary URL">
Store the URL as {{video_source_url}}.
</action>

<action if="source_type == 'YouTube URL'">
Ask for the YouTube URL:

Paste the full YouTube URL (e.g., https://youtube.com/watch?v=...).

This will be used for SubMagic's Magic Clips feature to auto-generate viral short clips.

Store as {{youtube_source_url}}.
</action>

<action if="source_type == 'Multiple clips'">
Explain that merging multiple clips requires a different workflow.

For now, ask them to:

1. Use a video editing tool to merge clips first, OR
2. Use this workflow separately for each clip

Store note that this is a multi-clip scenario for future enhancement.
</action>

<ask>Do you have B-roll images or videos to insert? (yes/no)</ask>

<action if="yes">
Ask for B-roll assets:

Please provide Cloudinary URLs for your B-roll content:

- Each B-roll should be a Cloudinary URL
- Tell me WHEN in the video each should appear (timestamp in seconds)

Example format:

- Image 1: https://res.cloudinary.com/.../product-shot.jpg at 10 seconds
- Video 1: https://res.cloudinary.com/.../demo.mp4 from 25-30 seconds

I'll help you organize this for SubMagic's custom B-roll insertion.

Collect each B-roll with:

- Cloudinary URL
- Start time (seconds)
- End time (seconds, optional for images)
- What it shows (for context)

Store as {{broll_assets}} array.
</action>

<action if="no">
Set {{broll_assets}} to empty array.
Note that SubMagic can auto-add AI B-rolls if user wants later.
</action>
</step>

<step n="4" goal="Define editing style and pacing">
<action>Explain the editing philosophy like a professional editor would:

Now let's talk about EDITING STYLE. This determines the pacing and energy of your video.

Based on your platform ({{target_platform}}) and purpose ({{video_purpose}}), I have some recommendations, but you have final say.
</action>

<ask>Choose your editing style:

1. **Conservative/Natural**
   - Preserves natural pauses and breathing room
   - Gentle pacing, professional tone
   - Best for: Tutorials, LinkedIn, thoughtful content
   - Removes silence: Only pauses 0.6+ seconds

2. **Balanced** ⭐ RECOMMENDED for {{target_platform}}
   - Good balance of flow and energy
   - Tightens pacing without feeling rushed
   - Best for: Most social media, product demos
   - Removes silence: Pauses 0.2-0.6 seconds

3. **Aggressive/Fast-Paced**
   - Maximum compression, rapid-fire pacing
   - High energy, attention-grabbing
   - Best for: TikTok, viral content, ads
   - Removes silence: Nearly all pauses 0.1-0.2 seconds

Enter number (1-3):</ask>

<action>Store {{editing_style}} and map to SubMagic parameter:

- Conservative → remove_silence_pace: "natural"
- Balanced → remove_silence_pace: "fast"
- Aggressive → remove_silence_pace: "extra-fast"

Store as {{silence_removal_pace}}.
</action>

<ask>Should I remove filler words like "um", "uh", "like", "you know"?

**Note:** This uses AI to detect and remove filler words. Takes 1-2 extra minutes.

- **Yes** - Clean up the speech (recommended for unscripted content)
- **No** - Keep all words as-is

(yes/no):</ask>

<action>Store {{remove_filler_words}} as boolean</action>
</step>

<step n="5" goal="Configure visual enhancements">
<action>Explain SubMagic's AI visual features:

SubMagic can add AI-powered visual enhancements to make your video more engaging:

**Magic Zooms** - AI automatically zooms in on key moments for emphasis (like professional editors do)
**Magic B-rolls** - AI automatically adds relevant stock footage over your video (requires AI to find clips)

These work best for:

- Talking head videos (zooms keep it dynamic)
- Educational content (B-rolls illustrate concepts)
- Product demos (emphasis on key features)

For {{target_platform}}, here's my recommendation based on best practices...
</action>

<ask>Enable Magic Zooms? (AI-powered dynamic zooms)

- **Yes** - Add professional zooms for emphasis ⭐ Recommended for {{target_platform}}
- **No** - Keep static framing

(yes/no):</ask>

<action>Store {{magic_zooms_enabled}} as boolean</action>

<action if="broll_assets is empty">
Ask about AI B-rolls:

You didn't provide custom B-roll content. SubMagic can auto-add AI-generated B-roll footage.

**Enable Auto B-rolls?** (AI finds and adds relevant stock footage)

- **Yes** - AI adds B-rolls automatically
- **No** - Keep video as-is without B-rolls

(yes/no):

Store {{magic_brolls_enabled}} as boolean.

If yes, ask: What percentage of the video should be covered with B-rolls? (0-100%, recommended: 75%)
Store {{brolls_percentage}}.
</action>

<action if="broll_assets is not empty">
User provided custom B-rolls, so disable auto B-rolls:
Set {{magic_brolls_enabled}} to false.

Explain: "You provided custom B-rolls, so I'll use those instead of AI-generated ones."
</action>
</step>

<step n="6" goal="Select caption style and branding">
<action>Call mcp__submagic__submagic_list_templates to get available styles</action>

<ask>Do you have a custom SubMagic brand theme? (yes/no)

**Custom themes** let you use your brand fonts and colors (requires PRO plan + one-time UI setup).

If you've created a theme in SubMagic's editor, I can use its UUID.</ask>

<action if="yes">
Ask for theme UUID:

Paste your SubMagic theme UUID (found in SubMagic editor → Themes → Your theme):

Example format: a1b2c3d4-e5f6-7890-abcd-ef1234567890

Store as {{custom_theme_id}}.
Set {{use_custom_theme}} to true.
</action>

<action if="no">
Present template options from the list:

Choose a caption style template:

**Business/Sales:**

1. Hormozi 2 - High-energy, bold, business-focused (yellow text, thick fonts)
2. Hormozi 3 - Similar to Hormozi 2 with variation
3. Daniel - Professional, corporate-friendly

**Social Media:** 4. Sara ⭐ DEFAULT - Versatile, clean, works for everything 5. Ella - Friendly, casual tone 6. Maya - Modern, trendy

**Entertainment:** 7. Beast - MrBeast-inspired, attention-grabbing 8. Josh - Playful, energetic 9. Alex - Trendy, Gen-Z optimized

Based on your purpose ({{video_purpose}}) and platform ({{target_platform}}),
I recommend: [make intelligent recommendation]

Enter number (1-9) or type template name:

Store as {{template_name}}.
Set {{use_custom_theme}} to false.
</action>

<action>Call mcp**submagic**submagic_list_languages to get supported languages</action>

<ask>Caption language?

Common options:

- en (English)
- es (Spanish)
- fr (French)
- de (German)
- cmn_en (Mandarin with English captions)

Enter language code (default: en):</ask>

<action>Store {{caption_language}}</action>

<ask>Any custom words for the transcription dictionary?

This improves accuracy for:

- Brand names (e.g., "SubMagic", "MyCompany")
- Product names (e.g., "ProductX", "FeatureY")
- Technical terms (e.g., "AI-powered", "SaaS")
- Names of people or places

Enter comma-separated list (or press enter to skip):

Example: SubMagic, TikTok, AI-powered, MyBrand</ask>

<action>Parse input and store as {{custom_dictionary}} array</action>
</step>

<step n="7" goal="Set technical specifications and duration">
<action>Load platform defaults from {{target_platform}}:
- Recommended aspect ratio
- Resolution (width x height)
- Typical duration range
</action>

<action>Present technical recommendations:

Based on {{target_platform}}, here are the recommended specs:

**Aspect Ratio:** {{platform.aspect_ratio}}
**Resolution:** {{platform.width}} x {{platform.height}}
**Recommended Duration:** {{platform.recommended_duration}}
</action>

<ask>Do you want to use these recommended settings?

- **Yes** - Use {{platform.width}}x{{platform.height}} ({{platform.aspect_ratio}})
- **Custom** - I'll specify different resolution

(yes/custom):</ask>

<action if="custom">
Ask for custom resolution:

Enter width in pixels (e.g., 1920):
Store as {{export_width}}.

Enter height in pixels (e.g., 1080):
Store as {{export_height}}.
</action>

<action if="yes">
Set {{export_width}} to platform default.
Set {{export_height}} to platform default.
</action>

<ask>Target duration for the final edited video?

- **Keep original** - Don't trim, just edit
- **Specific duration** - I'll tell you (e.g., 30 seconds)

(keep/specify):</ask>

<action if="specify">
Ask: What's your target duration in seconds?

Store as {{target_duration}}.

Note: SubMagic will tighten the video through silence removal, but cannot guarantee exact duration.
Recommend they review after initial edit and we can re-process if needed.
</action>

<action if="keep">
Set {{target_duration}} to null.
</action>
</step>

<step n="8" goal="Create SubMagic project and begin processing">
<action>Summarize the editing plan before starting:

Review the editing plan with {{user_name}}:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**VIDEO EDITING PLAN**

**Project:** {{video_purpose}}
**Platform:** {{target_platform}}
**Source:** {{source_type}}

**Editing Style:** {{editing_style}}

- Silence removal: {{silence_removal_pace}}
- Filler word removal: {{remove_filler_words}}
- Magic zooms: {{magic_zooms_enabled}}
- AI B-rolls: {{magic_brolls_enabled}}

**Captions:**

- Style: {{custom_theme_id if use_custom_theme else template_name}}
- Language: {{caption_language}}
- Custom words: {{custom_dictionary}}

**Output:**

- Resolution: {{export_width}}x{{export_height}}
- Duration: {{target_duration if target_duration else "Original length"}}

**Estimated processing time:** 5-15 minutes
**Estimated cost:** $0.10-0.30

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<ask>Does this look good? Ready to start editing?

- **Yes** - Start the edit!
- **Edit** - Let me change something

(yes/edit):</ask>

<action if="edit">
Ask what they want to change and jump back to the appropriate step using goto.
</action>

<action if="yes">
Proceed to create SubMagic project.
</action>

<action>Build SubMagic project parameters:

Prepare the API call parameters based on all gathered information:

```javascript
project_params = {
  title: "{video_purpose} - {target_platform} - {date}",
  language: "{caption_language}",
  video_url: "{video_source_url}",

  // Template or custom theme (mutually exclusive!)
  template_name: "{template_name}" (only if !use_custom_theme),
  user_theme_id: "{custom_theme_id}" (only if use_custom_theme),

  // AI Features (can only set at creation)
  magic_zooms: {magic_zooms_enabled},
  magic_brolls: {magic_brolls_enabled},
  magic_brolls_percentage: {brolls_percentage if magic_brolls_enabled else null},

  // Editing features
  remove_silence_pace: "{silence_removal_pace}",
  remove_bad_takes: {remove_filler_words},

  // Transcription accuracy
  dictionary: {custom_dictionary}
}
```

</action>

<action>Call mcp**submagic**submagic_create_project with the prepared parameters</action>

<action>Store the returned project:

- {{submagic_project_id}}
- {{submagic_project_status}}
  </action>

<action>Inform user:

✅ SubMagic project created successfully!

**Project ID:** {{submagic_project_id}}
**Status:** {{submagic_project_status}}

Now processing your video with AI:

- Transcribing audio and generating captions
- Analyzing content for optimal zooms and B-rolls
- Removing silence and filler words
- Applying {{template_name or "your custom theme"}}

This typically takes **5-10 minutes** for a 1-2 minute video.
I'll check status every 30 seconds and update you...
</action>
</step>

<step n="9" goal="Monitor processing and provide updates">
<action>Poll SubMagic project status every 30 seconds:

Use mcp**submagic**submagic_get_project with {{submagic_project_id}}.

While status is "processing":

- Wait 30 seconds
- Check again
- Show occasional updates to user (every 2 minutes):
  "⏳ Still processing... ({{elapsed_time}} elapsed)"

When status becomes "completed":

- Continue to next step

If status becomes "failed":

- Show error message
- Ask if they want to retry or troubleshoot
- Offer to adjust settings and retry

Max wait time: 15 minutes (SubMagic should complete by then)
</action>

<action>When completed, inform user:

✅ **Processing complete!**

Your video has been:

- ✓ Transcribed with captions
- ✓ Edited for pacing ({{silence_removal_pace}})
- ✓ Enhanced with {{magic_zooms_enabled ? "magic zooms" : "no zooms"}}
- ✓ {{magic_brolls_enabled ? "AI B-rolls added" : "No auto B-rolls"}}
- ✓ {{remove_filler_words ? "Filler words removed" : "Filler words kept"}}

**Processing time:** {{processing_duration}}
</action>
</step>

<step n="10" goal="Fine-tune editing (optional)" optional="true">
<ask>Do you want to make any adjustments before exporting?

Available fine-tuning options:

1. **Change silence removal** - Make it faster or slower
2. **Add/update custom B-rolls** - Insert specific clips at timestamps
3. **Toggle filler word removal** - Turn on/off
4. **No changes** - Export as-is

Enter number (1-4):</ask>

<action if="option 1">
Ask for new silence removal preference:

Change silence removal to:

1. Natural (less aggressive)
2. Fast (balanced)
3. Extra-fast (maximum compression)

Enter number:

Store as new {{silence_removal_pace}}.

Call mcp**submagic**submagic_update_project with:

- project_id: {{submagic_project_id}}
- remove_silence_pace: new value

Explain: "This will re-process the video (2-5 minutes). Then we'll need to re-export."
</action>

<action if="option 2">
Ask for custom B-roll details:

For each B-roll you want to add:

B-roll Cloudinary URL:
Start time (seconds):
End time (seconds):

Type 'done' when finished adding B-rolls.

Collect into {{custom_broll_items}} array with format:
[
{
"startTime": 10.5,
"endTime": 15.0,
"userMediaId": "cloudinary-asset-id"
}
]

**IMPORTANT:** userMediaId should be the Cloudinary public_id or asset_id.
You may need to extract this from the Cloudinary URL or upload to SubMagic library first.

Call mcp**submagic**submagic_update_project with:

- project_id: {{submagic_project_id}}
- items: {{custom_broll_items}}

Note: The parameter is called 'items', not 'custom_broll_items'.
</action>

<action if="option 3">
Ask: Enable or disable filler word removal? (enable/disable)

Call mcp**submagic**submagic_update_project with remove_bad_takes.

Explain: "This will re-process (1-2 minutes)."
</action>

<action if="option 4">
Skip fine-tuning, proceed to export.
</action>

<action if="any changes made">
Wait for re-processing:

Poll mcp**submagic**submagic_get_project until status is "completed" again.

Show updates every 30 seconds.
</action>
</step>

<step n="11" goal="Export final video">
<action>Prepare export with platform-optimized settings:

Explain to user:

Now exporting your final video with these specs:

**Resolution:** {{export_width}} x {{export_height}}
**Frame rate:** 30 fps
**Format:** MP4 (universal compatibility)
**Optimized for:** {{target_platform}}

Exporting typically takes 2-5 minutes...
</action>

<action>Call mcp**submagic**submagic_export_project with:

- project_id: {{submagic_project_id}}
- width: {{export_width}}
- height: {{export_height}}
- fps: 30
  </action>

<action>Poll for export completion:

Use mcp**submagic**submagic_get_project to check status.

Wait for export to complete (status includes export info).

Show updates every 15 seconds:
"📤 Exporting... ({{export_elapsed_time}} elapsed)"

When export completes, extract:

- {{download_url}} (temporary download link)
- {{video_duration}} (final duration)
- {{file_size}} (file size in MB)
  </action>
  </step>

<step n="12" goal="Download and save final video">
<action>Download the video from SubMagic:

Use standard HTTP download (fetch or curl) to get the video from {{download_url}}.

Save to: {{outputs_project}}/edited-{target_platform}-{date}.mp4

Store local path as {{final_video_path}}.
</action>

<action>Create comprehensive metadata file:

Generate JSON metadata with ALL project details:

```json
{
  "workflow": "video-editing",
  "version": "1.0.0",
  "date": "{date}",
  "user": "{user_name}",

  "project": {
    "purpose": "{video_purpose}",
    "key_message": "{key_message}",
    "desired_action": "{desired_action}",
    "target_platform": "{target_platform}",
    "target_audience": "{target_audience}"
  },

  "source": {
    "type": "{source_type}",
    "url": "{video_source_url}",
    "broll_assets": {broll_assets}
  },

  "editing": {
    "style": "{editing_style}",
    "silence_removal": "{silence_removal_pace}",
    "filler_words_removed": {remove_filler_words},
    "magic_zooms": {magic_zooms_enabled},
    "magic_brolls": {magic_brolls_enabled},
    "brolls_percentage": {brolls_percentage}
  },

  "captions": {
    "template": "{template_name if !use_custom_theme else null}",
    "custom_theme_id": "{custom_theme_id if use_custom_theme else null}",
    "language": "{caption_language}",
    "custom_dictionary": {custom_dictionary}
  },

  "output": {
    "resolution": "{export_width}x{export_height}",
    "fps": 30,
    "duration_seconds": {video_duration},
    "file_size_mb": {file_size},
    "aspect_ratio": "{platform.aspect_ratio}"
  },

  "submagic": {
    "project_id": "{submagic_project_id}",
    "processing_time_seconds": {processing_duration},
    "export_time_seconds": {export_duration},
    "total_time_seconds": {total_duration}
  },

  "files": {
    "video": "{final_video_path}",
    "submagic_download_url": "{download_url}",
    "metadata": "{metadata_file}"
  }
}
```

Save to: {{outputs_project}}/edited-{target_platform}-{date}-metadata.json
</action>
</step>

<step n="13" goal="Present final results and next steps">
<action>Create a beautiful results summary:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ **VIDEO EDITING COMPLETE!**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Project:** {{video_purpose}}
**Platform:** {{target_platform}}
**Duration:** {{video_duration}} seconds
**File size:** {{file_size}} MB

**Editing applied:**

- ✓ Captions: {{caption_language}} ({{template_name or "custom theme"}})
- ✓ Pacing: {{editing_style}} ({{silence_removal_pace}})
- ✓ Filler words: {{remove_filler_words ? "Removed" : "Kept"}}
- ✓ Magic zooms: {{magic_zooms_enabled ? "Enabled" : "Disabled"}}
- ✓ B-rolls: {{magic_brolls_enabled ? "AI-added" : custom_broll_items.length + " custom"}}

**Files saved:**
📹 Video: {{final_video_path}}
📋 Metadata: {{metadata_file}}

**Processing time:** {{total_duration}} seconds ({{Math.round(total_duration/60)}} minutes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Next steps:**

1. Review the video at: {{final_video_path}}
2. If you want changes, I can re-edit with different settings
3. Ready to publish? Use `/zoro` to schedule posts across platforms!

**SubMagic Project ID:** {{submagic_project_id}}
(You can view/edit in SubMagic UI: https://app.submagic.co)
</action>

<ask>What would you like to do next?

1. **Done** - I'm happy with this video
2. **Re-edit** - Change some settings and re-process
3. **New project** - Start editing a different video
4. **Publish** - Schedule this to social media

Enter number (1-4):</ask>

<action if="option 2">
Go back to step 4 to adjust editing settings.
Explain that we'll use the same SubMagic project but update settings.
<goto step="4">Re-edit with new settings</goto>
</action>

<action if="option 3">
Restart the workflow from beginning.
<goto step="1">Start new editing project</goto>
</action>

<action if="option 4">
Explain that publishing is handled by Zoro agent:

To publish this video, use the **Zoro** agent:

Run: `/zoro`

Then select a publishing workflow and provide:

- Video path: {{final_video_path}}
- Platform: {{target_platform}}
- Message/caption: Based on {{key_message}}

Zoro will handle scheduling and posting!
</action>

<action if="option 1">
Celebrate completion:

Perfect! Your professionally edited video is ready.

May your content go viral, {user_name}! 🎬
</action>
</step>

<step n="13.5" goal="Upload to Cloudinary and update Notion (Epic 5)">

<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

<action>Step 1: Upload edited video to Cloudinary

<ask>Upload edited video to Cloudinary for public URL? (needed for Postiz scheduling) [y/n]</ask>

<check if="yes">
  <action>Tool: mcp__cloudinary-asset-mgmt__upload-asset</action>
  <action>Parameters:
    resourceType: "video"
    uploadRequest:
      file: "{{final_video_path}}"
      public_id: "social-media/videos/edited/{{video_filename}}"
      folder: "social-media-videos"
  </action>

<action>Store result: {{cloudinary_result}}</action>
<action>Extract URL: {{cloudinary_url}} = cloudinary_result.secure_url</action>
<action>Display: "✅ Uploaded to Cloudinary: {cloudinary_url}"</action>

  <check if="upload fails">
    <action>Log error: "⚠️ Cloudinary upload failed: {error}"</action>
    <action>Set cloudinary_url = null</action>
    <action>Continue workflow</action>
  </check>
</check>

<check if="no">
  <action>Set cloudinary_url = null</action>
  <action>Display: "ℹ️ Skipped Cloudinary upload (SubMagic URL available)"</action>
</check>

</action>

<action>Step 2: Update Notion (if page linked)

<action>Load metadata: read_json("00-session/metadata.json")</action>

<check if="metadata.notion.page_url exists">
  <check if="cloudinary_url exists">
    <action>Call: update_content_property(
      metadata.notion.page_url,
      {"Description": "Edited video (SubMagic): {cloudinary_url}"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with Cloudinary video URL"</action>
  </check>

  <check if="cloudinary_url is null">
    <action>Call: update_content_property(
      metadata.notion.page_url,
      {"Description": "Local edited video: 04-media/videos/{{video_filename}}.mp4"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with local path"</action>
  </check>

<action>Display: "ℹ️ Status='Editing' (edited video ready for publishing)"</action>

<action>Log to session:
append_to_file("00-session/session-log.md",
"{timestamp} - Zoe: Added edited video to Notion (SubMagic)\n"
)
</action>

  <check if="notion update fails">
    <action>Log warning: "⚠️ Notion update failed: {error}"</action>
    <action>Display: "Video still saved locally"</action>
    <action>Continue workflow</action>
  </check>
</check>

<check if="metadata.notion.page_url NOT exists">
  <action>Display: "ℹ️ No Notion page linked (local-only project)"</action>
</check>

</action>

<template-output>cloudinary_uploaded, notion_updated</template-output>

</step>

<step n="14" goal="Create handoff to Zoro (Epic 5)">

<ask>Ready to hand off edited video to Zoro for scheduling? [y/n]</ask>

<check if="yes">
  <action>Create handoff JSON:</action>
  <action>
  handoff_data = {
    "handoff_type": "video",
    "created_by": "Zoe",
    "created_at": "{{ISO-8601 timestamp}}",
    "project_path": "{{outputs_project}}",
    "notion_page_url": "{{metadata.notion.page_url if exists else null}}",

    "assets": [
      {
        "type": "video",
        "subtype": "submagic_edited",
        "local_path": "{{final_video_path}}",
        "cloudinary_url": "{{cloudinary_url if exists else null}}",
        "submagic_url": "{{download_url}}",
        "platform_optimized_for": "{{target_platform}}",
        "duration_seconds": "{{estimated_duration}}",
        "editing_features": ["captions", "zooms", "brolls", "silence_removal"],
        "template_used": "{{template_name}}",
        "metadata_file": "{{metadata_file}}"
      }
    ],

    "suggested_action": "schedule-video-post",
    "priority": "normal",
    "notes": "SubMagic edited video - {{project_title}}"

}
</action>

<action>Save handoff JSON to:
{{outputs_project}}/../../handoffs/zoe-to-zoro-video-edited-{{timestamp}}.json
</action>

<action>Display: "✅ Handoff created for Zoro"</action>
<action>Display: "💡 To publish: Run /zoro and select 'Process Handoff'"</action>

<action>Log to session:
append_to_file("00-session/session-log.md",
"{timestamp} - Zoe: Created handoff for Zoro (SubMagic edited video)\n"
)
</action>
</check>

<check if="no">
  <action>Display: "ℹ️ No handoff created. Video saved locally."</action>
</check>

<template-output>handoff_created</template-output>

</step>

</workflow>

<special-case-handling>

<scenario name="YouTube Magic Clips" if="source_type == 'YouTube URL'">
This scenario uses a completely different SubMagic feature - Magic Clips generation.

<step n="8-alternative" goal="Generate viral clips from YouTube">
<action>Explain Magic Clips feature:

You've provided a YouTube URL. SubMagic can analyze the entire video and automatically extract 10-20 viral-worthy clips!

This is perfect for:

- Repurposing podcast episodes
- Creating shorts from long videos
- Generating content calendar from one source

Each clip will be:

- Optimized for {{target_platform}}
- Captioned automatically
- Duration: {{platform.recommended_duration}}
  </action>

<ask>Configure clip generation:

Minimum clip length (seconds): [15-300, default based on platform]
Maximum clip length (seconds): [15-300, default based on platform]

For {{target_platform}}, I recommend:

- Min: {{platform.min_clip_length}}
- Max: {{platform.max_clip_length}}

Use recommended settings? (yes/custom):
</ask>

<action>Call mcp**submagic**submagic_create_magic_clips with:

- title: "Viral Clips - {video_purpose} - {date}"
- youtube_url: {youtube_source_url}
- language: {caption_language}
- min_clip_length: {min_length}
- max_clip_length: {max_length}
- user_theme_id: {custom_theme_id} (if applicable)
  </action>

<action>Poll for completion (this takes 10-20 minutes):

Show progress updates every minute:
"⏳ Analyzing video and generating clips... ({elapsed} elapsed)"

When complete:

- Get all generated clips
- Download each clip to {{outputs_project}}/clip-{n}-{date}.mp4
- Create metadata for each clip
  </action>

<action>Present results:

✅ **Generated {{clip_count}} viral clips!**

Clips saved to: {{outputs_project}}/

Each clip is:

- {{min_length}}-{{max_length}} seconds
- Optimized for {{target_platform}}
- Ready to schedule!

Ready to batch-publish these? Use `/zoro` for scheduling!
</action>
</step>
</scenario>

</special-case-handling>
