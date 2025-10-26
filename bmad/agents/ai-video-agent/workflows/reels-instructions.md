# Instagram Reels Generation Workflow

<workflow>

<step n="1" goal="Reels specs confirmation">
<action>Load Instagram Reels specs from {platform_specs}</action>
<action>Display: "Instagram Reels - 9:16 vertical, hook @ 1.5 seconds critical, captions ON"</action>
<action>Set platform = 'instagram-reels'</action>
<action>Set aspect_ratio = '9:16'</action>
<action>Set dimensions = '1080x1920'</action>
<action>Set captions = true</action>
<action>Set hook_timing = 1.5 seconds</action>
</step>

<step n="2" goal="Video type selection">
<ask response="video_type">What type of Reels video?
1. Talking head (your face via HeyGen)
2. Generated scene (Veo fast b-roll)
3. Cinematic (Sora 2 premium)
</ask>

<check if="video_type == 1 or video_type == 'talking'">
  <action>Invoke workflow: {agent-folder}/workflows/generate-talking-head.yaml with platform='instagram-reels'</action>
</check>

<check if="video_type == 2 or video_type == 'scene'">
  <action>Invoke workflow: {agent-folder}/workflows/generate-scene.yaml with platform='instagram-reels'</action>
</check>

<check if="video_type == 3 or video_type == 'cinematic'">
  <action>Set provider = 'sora2'</action>
  <ask response="video_prompt">Describe your Reels scene:</ask>
  <action>Remind: "Hook in first 1.5 seconds is critical"</action>
  <ask response="duration">Duration? (4s, 8s recommended for Reels)</ask>

  <action>Call MCP tool: mcp__sora2__create_video</action>
  <action>Params: prompt={video_prompt}, model='sora-2', size='720x1280' (9:16), seconds={duration}</action>
  <action>Receive: video_id</action>

  <action>Poll status with mcp__sora2__get_video_status until complete</action>
  <action>Display video URL when ready</action>
</check>

<template-output>video_url, provider, metadata</template-output>

</step>

</workflow>
