# YouTube Standard Video Generation Workflow

<workflow>

<step n="1" goal="YouTube setup">
<action>Load YouTube specs from {platform_specs}</action>
<action>Display: "YouTube - 16:9 landscape, hook @ 8 seconds, 8+ minutes ideal, chapters recommended"</action>
<action>Set platform = 'youtube'</action>
<action>Set aspect_ratio = '16:9'</action>
<action>Set recommended_duration = 480-900 seconds (8-15 min)</action>
<action>Note: For longer videos, need to stitch multiple clips</action>
</step>

<step n="2" goal="Video strategy">
<ask>YouTube videos need stitching multiple clips. Ready to create a multi-clip sequence? [y/n]</ask>

<action>Explain: "For YouTube, we'll generate multiple clips and merge them with Sora 2 merge_videos"</action>
<action>Invoke workflow: {agent-folder}/workflows/generate-hybrid.yaml with platform='youtube'</action>

</step>

</workflow>
