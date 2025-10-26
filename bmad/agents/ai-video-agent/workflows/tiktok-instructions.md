# TikTok Generation Workflow

<workflow>

<step n="1" goal="TikTok optimization">
<action>Load TikTok specs from {platform_specs}</action>
<action>Display: "TikTok - 9:16 vertical, hook @ 1 SECOND (fastest!), 7-15s = peak engagement, sound matters"</action>
<action>Set platform = 'tiktok'</action>
<action>Set aspect_ratio = '9:16'</action>
<action>Set recommended_duration = [7, 15, 21, 30]</action>
<action>Set hook_timing = 1</action>
<action>CRITICAL: First 1 second makes or breaks TikTok</action>
</step>

<step n="2" goal="Video generation">
<ask response="video_type">Talking head or scene? [talking/scene]</ask>

<check if="video_type == 'talking'">
  <action>Invoke workflow: {agent-folder}/workflows/generate-talking-head.yaml with platform='tiktok'</action>
</check>

<check if="video_type == 'scene'">
  <action>Invoke workflow: {agent-folder}/workflows/generate-scene.yaml with platform='tiktok'</action>
</check>

</step>

</workflow>
