# Scene Video Generation Workflow (Veo)

<workflow>

<step n="1" goal="Platform & Aspect Ratio">
<ask response="target_platform">What platform? (reels/tiktok/shorts = 9:16 vertical, youtube = 16:9 horizontal)</ask>

<action>Load platform specs from {platform_specs}</action>

<check if="target_platform in ['reels', 'tiktok', 'youtube-short']">
  <action>Set aspect_ratio = '9:16'</action>
  <action>Set provider = 'sora2'</action>
  <action>Display: "Vertical 9:16 - routing to Sora 2 for proper aspect ratio support"</action>
</check>

<check if="target_platform in ['youtube', 'linkedin']">
  <action>Set aspect_ratio = '16:9'</action>
  <action>Set provider = 'veo3'</action>
  <action>Display: "Horizontal 16:9 - routing to Veo 3"</action>
</check>

<check if="target_platform == 'custom'">
  <ask response="custom_aspect">Aspect ratio? (16:9 or 9:16)</ask>
  <check if="custom_aspect == '9:16'">
    <action>Set provider = 'sora2'</action>
  </check>
  <check if="custom_aspect == '16:9'">
    <action>Set provider = 'veo3'</action>
  </check>
</check>

<template-output>target_platform, aspect_ratio, provider</template-output>
</step>

<step n="2" goal="Prompting Method">
<action>Offer two approaches:</action>
<action>1. FAST - Text-based prompt (quick, standard quality)</action>
<action>2. JSON - Structured prompt with Emily-quality specs (slower, premium quality)</action>

<ask response="prompt_method">Prompting method? [fast / json]</ask>

<check if="prompt_method == 'json'">
  <action>Display: "Using JSON Prompt Generator module for Emily-quality specs..."</action>
  <action>Load: {project-root}/bmad/modules/json-prompt-generator/templates/video-scene.json</action>

<ask response="scene_description">Describe the scene:</ask>
<ask response="subject_action">What action/subject?</ask>
<ask response="lighting_mood">Lighting mood? (dramatic/bright/moody)</ask>
<ask response="color_palette">Color palette? (earthy/vibrant/tech/custom)</ask>

<action>Populate JSON template with user inputs</action>
<action>Auto-set camera specs: 50mm prime, f/2.8, appropriate ISO</action>
<action>Auto-set lighting based on mood</action>
<action>Auto-set color palette based on choice</action>
<action>Add comprehensive negative prompts (12+ items)</action>

<action>Convert JSON → text using {project-root}/bmad/modules/json-prompt-generator/sidecar/conversion-rules.md</action>
<action>Set scene_prompt = {converted_text}</action>
<action>Display: "JSON prompt generated with technical precision"</action>

  <goto step="3"/>
</check>

<check if="prompt_method == 'fast'">
  <action>Display: "Using fast text-based prompting..."</action>
  <ask response="scene_prompt">Describe your scene in detail:</ask>

<action>Analyze prompt for clarity</action>

  <check if="prompt is vague (< 20 words)">
    <action>Suggest enrichment: "Add details: camera angle, lighting, movement, mood"</action>
    <ask>Want to refine? [y/n]</ask>
  </check>

  <goto step="3"/>
</check>

<template-output>scene_prompt, prompt_method</template-output>
</step>

<step n="3" goal="Quality vs Speed">
<action>Explain Veo model options:</action>
<action>- veo-3.1-generate-preview: Higher quality, slower (~3-5 min)</action>
<action>- veo-3.1-fast-generate-preview: Draft quality, faster (~1-2 min)</action>

<ask response="model_choice">Quality or speed? [quality/fast]</ask>

<check if="model_choice == 'quality'">
  <action>Set model = 'veo-3.1-generate-preview'</action>
</check>

<check if="model_choice == 'fast'">
  <action>Set model = 'veo-3.1-fast-generate-preview'</action>
</check>

<template-output>model_choice</template-output>
</step>

<step n="4" goal="Resolution Selection">
<action>Veo resolution options:</action>
<action>- 720p: Available for all durations (4s, 6s, 8s)</action>
<action>- 1080p: Only available for 8-second videos</action>

<check if="desired_duration == 8">
  <ask response="resolution_choice">Resolution? [720p/1080p]</ask>
</check>

<check if="desired_duration < 8">
  <action>Auto-set resolution = '720p' (1080p only available for 8s)</action>
  <action>Inform user of constraint</action>
</check>

<template-output>resolution_choice</template-output>
</step>

<step n="5" goal="Cost Estimate">
<action>Calculate Veo cost:</action>
<action>- Base rate: ~$0.30-1.00 per 8s clip (varies by model)</action>
<action>- Fast model: ~$0.30 per clip</action>
<action>- Quality model: ~$0.60-1.00 per clip</action>

<action>Estimate: {model_choice} + {desired_duration}s = ~${estimated_cost}</action>

<action>Display cost breakdown</action>

<ask response="cost_approved">Generate for ~${estimated_cost}? [y/n]</ask>

<check if="cost_approved != 'y'">
  <goto step="exit"/>
</check>

<template-output>estimated_cost</template-output>
</step>

<step n="6" goal="Generate Scene">

<check if="provider == 'veo3'">
  <action>Display: "Generating with Veo 3 (16:9 horizontal)..."</action>
  <action>Call MCP tool: mcp__veo3__generate_video</action>
  <action>Parameters: prompt={scene_prompt}, model={model_choice}</action>
  <action>This is a BLOCKING call - will return when complete (~60-90 seconds)</action>

<action>Receive: {video_path, filename, generation_time, file_size, aspect_ratio}</action>

<action>Display: "✅ Scene generated!"</action>
<action>Display: "📁 Video: {video_path}"</action>
<action>Display: "⏱️ Generated in {generation_time} seconds"</action>
</check>

<check if="provider == 'sora2'">
  <action>Display: "Generating with Sora 2 (9:16 vertical)..."</action>
  <ask response="duration">Duration? [4s/8s/12s] (Default: 8s)</ask>

<action>Set sora_size = '720x1280' for 9:16</action>
<action>Call MCP tool: mcp**sora2**create_video</action>
<action>Parameters: prompt={scene_prompt}, model='sora-2', size={sora_size}, seconds={duration}</action>

<action>Receive: {video_id}</action>
<action>Display: "Sora 2 queued. Video ID: {video_id}"</action>
<action>Display: "⏱️ Rendering... typically 2-4 minutes"</action>

<action>Poll with mcp**sora2**get_video_status every 10 seconds</action>

  <check if="status == 'completed'">
    <action>Display: "✅ Video generated! Downloading..."</action>

    <action>Download video using OpenAI API:</action>
    <action>Set output_path = {output_folder}/sora2_{timestamp}.mp4</action>
    <action>Call: curl "https://api.openai.com/v1/videos/{video_id}/content"</action>
    <action>       -H "Authorization: Bearer ${OPENAI_API_KEY}"</action>
    <action>       -o {output_path}</action>

    <action>Display: "✅ Cinematic video ready!"</action>
    <action>Display: "📁 Video: {output_path}"</action>
    <action>Display: "⚠️ C2PA watermark present (preserved)"</action>
    <action>Set video_path = {output_path}</action>

  </check>

  <check if="status == 'failed'">
    <action>Display: "❌ Generation failed"</action>
    <ask>Retry? [y/n]</ask>
    <check if="retry == 'y'">
      <goto step="2"/>
    </check>
  </check>
</check>

<template-output>video_path, provider, generation_time</template-output>
</step>

<step n="7" goal="Save Metadata">
<action>Create metadata JSON with all generation details</action>
<action>Save to {metadata_file}</action>

<action>Metadata structure:</action>
<action>- prompt: {scene_prompt}</action>
<action>- prompt_method: {prompt_method}</action>
<action>- json_module_used: {prompt_method == 'json'}</action>
<action>- provider: {provider}</action>
<action>- model: {model_choice}</action>
<action>- platform: {target_platform}</action>
<action>- aspect_ratio: {aspect_ratio}</action>
<action>- resolution: {resolution_choice}</action>
<action>- video_path: {video_path}</action>
<action>- file_size: {file_size}</action>
<action>- generation_time_sec: {generation_time}</action>
<action>- quality_standard: {prompt_method == 'json' ? 'Emily 7-Pillar' : 'Standard'}</action>
<action>- created_at: {timestamp}</action>

<action>Display: "💾 Metadata saved"</action>

<template-output>metadata_saved</template-output>
</step>

<step n="8" goal="Next Steps">
<ask>What next? [generate-another / done]</ask>

<check if="response == 'generate-another'">
  <goto step="1"/>
</check>

<template-output>workflow_complete</template-output>
</step>

<step n="notion-update" goal="Upload to Cloudinary and Update Notion (Epic 2 Story 5.2)">
<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

<action>**Add video URL to Notion:**

**Step 1: Upload to Cloudinary**

- Ask: "Upload video to Cloudinary for public URL? (needed for Postiz) [y/n]"

if yes: - Tool: mcp**cloudinary-asset-mgmt**upload-asset - Parameters:
resourceType: "video"
uploadRequest:
file: "{video_output_path}"
public_id: "social-media/videos/{video_filename}"
folder: "social-media-videos"

    - cloudinary_url = result.secure_url
    - display(f"✅ Uploaded to Cloudinary: {cloudinary_url}")

**Step 2: Update Notion**

- metadata = read_json("00-session/metadata.json")
- if metadata.notion.page_url exists:

  if cloudinary_url:
  update_content_property(
  metadata.notion.page_url,
  {"Description": f"Video URL: {cloudinary_url}"},
  "Zoe"
  )
  display("✅ Notion updated with video URL")
  else:
  update_content_property(
  metadata.notion.page_url,
  {"Description": "Local: 04-media/videos/{video_filename}.mp4"},
  "Zoe"
  )

  # Keep Status=Editing

  display("ℹ️ Status='Editing' (video ready for publishing)")

  # Log

  append_to_file("00-session/session-log.md",
  f"{timestamp} - Zoe: Added video to Notion\n"
  )

else:
display("ℹ️ No Notion page linked")
end if
</action>
</step>

<step n="9" goal="Create handoff to Zoro (Epic 5)">

<ask>Ready to hand off video to Zoro for scheduling? [y/n]</ask>

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
        "local_path": "{{video_path}}",
        "cloudinary_url": "{{cloudinary_url if exists else null}}",
        "platform_optimized_for": "{{target_platform}}",
        "aspect_ratio": "{{aspect_ratio}}",
        "duration_seconds": 8,
        "metadata_file": "{{metadata_file}}"
      }
    ],

    "suggested_action": "schedule-video-post",
    "priority": "normal",
    "notes": "{{scene_prompt}}"

}
</action>

<action>Save handoff JSON to:
{{outputs_project}}/../../handoffs/zoe-to-zoro-video-{{timestamp}}.json
</action>

<action>Display: "✅ Handoff created for Zoro"</action>
<action>Display: "💡 To publish: Run /zoro and select 'Process Handoff'"</action>

<action>Log to session:
append_to_file("00-session/session-log.md",
"{timestamp} - Zoe: Created handoff for Zoro (video scene)\n"
)
</action>
</check>

<check if="no">
  <action>Display: "ℹ️ No handoff created. Video saved locally."</action>
</check>

<template-output>handoff_created</template-output>

</step>

<step n="exit" goal="Complete">
<action>Display: "👋 Scene generation complete!"</action>
<action>Return to agent menu</action>
</step>

</workflow>
