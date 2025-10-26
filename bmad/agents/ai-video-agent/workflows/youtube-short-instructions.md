# YouTube Shorts Generation Workflow

<workflow>

<step n="1" goal="YouTube Shorts setup">
<action>Load YouTube Shorts specs from {platform_specs}</action>
<action>Display: "YouTube Shorts - 9:16 vertical, hook @ 3 seconds, <60s max, retention is everything"</action>
<action>Set platform = 'youtube-shorts'</action>
<action>Set aspect_ratio = '9:16'</action>
<action>Set max_duration = 60</action>
<action>Set hook_timing = 3</action>
</step>

<step n="2" goal="Provider selection">
<ask response="video_type">What type of Short?
1. Talking head (HeyGen)
2. Generated scene (Veo/Sora2)
</ask>

<check if="video_type == 1">
  <action>Invoke workflow: {agent-folder}/workflows/generate-talking-head.yaml with platform='youtube-shorts'</action>
</check>

<check if="video_type == 2">
  <ask response="provider_choice">Veo (fast) or Sora2 (cinematic)? [veo/sora]</ask>
  <action>Invoke workflow: {agent-folder}/workflows/generate-scene.yaml with platform='youtube-shorts', provider={provider_choice}</action>
</check>

</step>

</workflow>
