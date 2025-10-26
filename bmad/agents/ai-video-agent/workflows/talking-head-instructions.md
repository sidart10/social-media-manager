# Talking Head Video Generation Workflow

<workflow>

<step n="1" goal="Platform & Specs Discovery">
<ask response="target_platform">What platform is this for? (reels, youtube-short, tiktok, youtube, or custom)</ask>

<action>Load platform specs from {platform_specs}</action>
<action>Extract aspect_ratio, duration recommendations, and hook timing for selected platform</action>
<action>Store: platform_aspect_ratio, platform_duration_rec, platform_hook_seconds</action>

<check if="target_platform != 'custom'">
  <action>Auto-set dimensions based on platform specs</action>
  <action>Inform user of platform requirements (aspect ratio, caption need, hook timing)</action>
</check>

<check if="target_platform == 'custom'">
  <ask response="custom_aspect">What aspect ratio? (16:9, 9:16, 4:5, 1:1)</ask>
  <ask response="custom_duration">Target duration in seconds?</ask>
</check>

<template-output>target_platform, platform_aspect_ratio, platform_duration_rec</template-output>
</step>

<step n="2" goal="Avatar & Voice Selection">
<action>Load config from {config_source}</action>
<action>Check for default_avatar_id and default_voice_id in config.providers.heygen</action>

<check if="defaults exist">
  <action>Display: "Using your configured Sid Dani avatar + voice"</action>
  <action>Set selected_avatar_id = default_avatar_id</action>
  <action>Set selected_voice_id = default_voice_id</action>
  <action>Display: "Avatar: {selected_avatar_id}"</action>
  <action>Display: "Voice: {selected_voice_id}"</action>
</check>

<check if="no defaults in config">
  <action>Display: "No defaults configured. Run 'setup-avatars' first or select manually."</action>
  <action>Call MCP tool: mcp__heygen__get_avatar_groups</action>
  <ask response="selected_avatar_id">Which avatar ID?</ask>
  <ask response="selected_voice_id">Which voice ID?</ask>
</check>

<template-output>selected_avatar_id, selected_voice_id</template-output>
</step>

<step n="3" goal="Script & Hook">
<ask response="video_script">What's your script? (Keep natural - aim for ~2 words per second)</ask>

<action>Calculate estimated duration: word_count / 2 seconds</action>
<action>Show estimated video length</action>

<check if="estimated_duration > platform_duration_rec">
  <action>Warn: "Your script is longer than recommended for {target_platform}. Consider shortening for better retention."</action>
  <ask>Continue anyway or revise script? [c/r]</ask>
</check>

<action>Remind about hook timing: "For {target_platform}, your hook in the first {platform_hook_seconds} seconds is critical."</action>
<ask response="hook_strategy">What's your attention-grabber in those first {platform_hook_seconds} seconds?</ask>

<template-output>video_script, hook_strategy, estimated_duration</template-output>
</step>

<step n="4" goal="Captions & Background">
<action>Default captions to ON (80% muted viewing)</action>
<ask response="captions_enabled">Captions ON? [y/n] (Default: yes)</ask>

<check if="captions_enabled != 'n'">
  <action>Set caption: true</action>
</check>

<ask response="background_choice">Background: default, solid color, or custom? [d/c/custom]</ask>

<check if="background_choice == 'c'">
  <ask response="background_color">What color? (hex code or name)</ask>
</check>

<check if="background_choice == 'custom'">
  <ask response="background_image">Path to background image:</ask>
</check>

<template-output>captions_enabled, background_choice</template-output>
</step>

<step n="5" goal="Cost Estimate & Approval">
<action>Calculate estimated cost based on duration:</action>
<action>HeyGen rate: ~$0.15 per minute base</action>
<action>estimated_cost = (estimated_duration / 60) * 0.15</action>

<action>Load max_cost from config: {config_source}</action>

<check if="estimated_cost > max_cost_per_video_usd">
  <action>BLOCK: Cost exceeds safety limit</action>
  <action>Display: "⚠️ Estimated cost ${estimated_cost} exceeds limit ${max_cost_per_video_usd}"</action>
  <ask>Increase limit in config or shorten script? [config/script/cancel]</ask>
</check>

<action>Display cost estimate with breakdown:</action>
<action>- Duration: {estimated_duration}s</action>
<action>- Rate: $0.15/min</action>
<action>- Estimated: ${estimated_cost}</action>

<ask response="cost_approved">Generate for ~${estimated_cost}? [y/n]</ask>

<check if="cost_approved != 'y'">
  <goto step="exit"/>
</check>

<template-output>estimated_cost, cost_approved</template-output>
</step>

<step n="6" goal="Generate Video">
<action>Build HeyGen API request parameters:</action>
<action>- avatar_id: {selected_avatar_id}</action>
<action>- voice_id: {selected_voice_id}</action>
<action>- script: {video_script}</action>
<action>- dimension: {width}x{height} from platform specs</action>
<action>- caption: {captions_enabled}</action>
<action>- background: {background_choice}</action>

<action>Call MCP tool: mcp**heygen**create_avatar_video with parameters</action>
<action>Receive: video_id</action>
<action>Display: "✓ Generation job queued. Video ID: {video_id}"</action>
<action>Display: "⏱️ Rendering... This usually takes 2-4 minutes for talking heads."</action>

<template-output>video_id, generation_start_time</template-output>
</step>

<step n="7" goal="Poll Status & Deliver">
<action>Set poll_interval = 5 seconds</action>
<action>Set max_wait = 10 minutes</action>
<action>Initialize elapsed_time = 0</action>

<action repeat="until complete or timeout">
  <action>Wait {poll_interval} seconds</action>
  <action>Call MCP tool: mcp__heygen__check_video_status with {video_id}</action>
  <action>Get status: pending | processing | completed | failed</action>
  <action>elapsed_time += poll_interval</action>

  <check if="status == 'processing'">
    <action>Display progress: "🎬 Rendering... {elapsed_time}s elapsed"</action>
  </check>

  <check if="status == 'completed'">
    <action>Get video_url from response</action>
    <action>Calculate actual_cost (if available in response)</action>
    <action>Display: "✅ Video ready!"</action>
    <action>Display: "🔗 {video_url}"</action>
    <action>Exit poll loop</action>
  </check>

  <check if="status == 'failed'">
    <action>Get error message</action>
    <action>Display: "❌ Generation failed: {error}"</action>
    <ask>Retry with different settings? [y/n]</ask>
    <check if="retry == 'y'">
      <goto step="3"/>
    </check>
    <goto step="exit"/>
  </check>

  <check if="elapsed_time > max_wait * 60">
    <action>Display: "⏱️ Timeout after {max_wait} minutes. Job may still complete - check status later with video_id: {video_id}"</action>
    <goto step="exit"/>
  </check>
</action>

<template-output>video_url, final_status, actual_cost</template-output>
</step>

<step n="8" goal="Save Metadata & Offer Next Steps">
<action>Create metadata JSON with all generation details</action>
<action>Save to {metadata_file}</action>

<action>Metadata structure:</action>
<action>- prompt: {video_script}</action>
<action>- provider: "heygen"</action>
<action>- platform: {target_platform}</action>
<action>- duration_sec: {estimated_duration}</action>
<action>- aspect_ratio: {platform_aspect_ratio}</action>
<action>- avatar_id: {selected_avatar_id}</action>
<action>- voice_id: {selected_voice_id}</action>
<action>- captions_enabled: {captions_enabled}</action>
<action>- video_id: {video_id}</action>
<action>- video_url: {video_url}</action>
<action>- cost_usd: {actual_cost}</action>
<action>- render_time_sec: {elapsed_time}</action>
<action>- created_at: {timestamp}</action>

<action>Display: "💾 Metadata saved to: {metadata_file}"</action>

<ask>What next? [generate-another / test-hooks / queue-status / done]</ask>

<check if="response == 'generate-another'">
  <goto step="1"/>
</check>

<check if="response == 'test-hooks'">
  <action>Invoke workflow: test-hooks.yaml with current script as base</action>
</check>

<check if="response == 'queue-status'">
  <action>Display all active jobs</action>
</check>

<template-output>metadata_saved, next_action</template-output>
</step>

<step n="exit" goal="Completion">
<action>Display: "👋 Talking head workflow complete. Your video is ready!"</action>
<action>Return to agent menu</action>
</step>

</workflow>
