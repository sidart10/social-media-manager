# Scene Video Generation Workflow (Veo)

<workflow>

<step n="1" goal="Platform & Specs">
<ask response="target_platform">What platform? (reels, youtube-short, tiktok, youtube, custom)</ask>

<action>Load platform specs from {platform_specs}</action>
<action>Extract aspect_ratio and duration for platform</action>

<check if="target_platform != 'custom'">
  <action>Auto-set aspect ratio from platform specs</action>
  <action>Suggest duration based on platform (Veo max: 8 seconds)</action>
</check>

<check if="target_platform == 'custom'">
  <ask response="custom_aspect">Aspect ratio? (16:9 or 9:16)</ask>
</check>

<action>Note: Veo generates up to 8 seconds per clip. For longer videos, we'll need multiple clips stitched.</action>

<ask response="desired_duration">How long? (4, 6, or 8 seconds per clip)</ask>

<template-output>target_platform, aspect_ratio, desired_duration</template-output>
</step>

<step n="2" goal="Prompt Crafting">
<action>Explain: "Veo works best with detailed, cinematic prompts. Describe the scene, action, camera movement, lighting, mood."</action>

<ask response="scene_prompt">Describe your scene in detail:</ask>

<action>Analyze prompt for clarity and detail</action>

<check if="prompt is vague (< 20 words)">
  <action>Suggest enrichment: "Let's add more detail for better results. Consider: camera angle, lighting, movement, mood, style."</action>
  <ask>Want to refine the prompt? [y/n]</ask>
</check>

<action>Show example:</action>
<example>
"A cinematic aerial drone shot slowly descending over a misty mountain valley at golden hour, warm sunlight breaking through clouds, lens flare, 4K quality, smooth motion"
</example>

<template-output>scene_prompt</template-output>
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
<action>Build Veo API request:</action>
<action>- prompt: {scene_prompt}</action>
<action>- aspectRatio: {aspect_ratio}</action>
<action>- durationSec: '{desired_duration}'</action>
<action>- model: {model_choice}</action>
<action>- resolution: {resolution_choice}</action>

<action>Call MCP tool: mcp__veo__video_story_generate with parameters</action>
<action>Receive: job_id</action>

<action>Display: "✓ Veo generation started"</action>
<action>Display: "Job ID: {job_id}"</action>
<action>Display: "⏱️ Rendering... {model_choice} typically takes 2-5 minutes"</action>

<template-output>job_id, generation_start_time</template-output>
</step>

<step n="7" goal="Poll & Deliver">
<action>Note: Veo MCP server polls automatically (blocking call up to 5 minutes)</action>

<action>Call MCP tool: mcp__veo__video_story_status with {job_id}</action>
<action>This will block and poll every 5 seconds until complete or timeout</action>

<action>Receive: {status, video_url, result}</action>

<check if="status == 'completed'">
  <action>Display: "✅ Scene generated!"</action>
  <action>Display: "🔗 {video_url}"</action>
  <action>Display: "Duration: {desired_duration}s, {aspect_ratio}, {resolution_choice}"</action>
</check>

<check if="status == 'failed'">
  <action>Get error from result</action>
  <action>Display: "❌ Generation failed: {error}"</action>
  <ask>Retry with revised prompt? [y/n]</ask>
  <check if="retry == 'y'">
    <goto step="2"/>
  </check>
  <goto step="exit"/>
</check>

<template-output>video_url, final_status</template-output>
</step>

<step n="8" goal="Metadata & Next Steps">
<action>Create metadata JSON:</action>
<action>- prompt: {scene_prompt}</action>
<action>- provider: "veo"</action>
<action>- model: {model_choice}</action>
<action>- platform: {target_platform}</action>
<action>- duration_sec: {desired_duration}</action>
<action>- aspect_ratio: {aspect_ratio}</action>
<action>- resolution: {resolution_choice}</action>
<action>- job_id: {job_id}</action>
<action>- video_url: {video_url}</action>
<action>- cost_usd: {estimated_cost}</action>
<action>- created_at: {timestamp}</action>

<action>Save to {metadata_file}</action>

<action>Display: "💾 Metadata saved"</action>

<ask>What next? [generate-another / stitch-clips / done]</ask>

<check if="response == 'generate-another'">
  <goto step="1"/>
</check>

<check if="response == 'stitch-clips'">
  <action>Note: "To create longer videos, generate multiple 8s clips and use create-montage to stitch them together."</action>
</check>

<template-output>metadata_saved</template-output>
</step>

<step n="exit" goal="Complete">
<action>Display: "👋 Scene generation complete!"</action>
<action>Return to agent menu</action>
</step>

</workflow>
