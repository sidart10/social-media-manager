# Hybrid Mixed-Media Video Generation Workflow

<workflow>

<step n="1" goal="Plan the sequence">
<ask response="video_structure">Describe your video structure (e.g., "Start with talking head, then b-roll, then product images"):</ask>
<action>Parse structure into segments</action>
</step>

<step n="2" goal="Generate each segment">
<action>For each segment type:</action>
<action>- Talking head → Use HeyGen workflow</action>
<action>- Generated scene → Use Veo/Sora2 workflow</action>
<action>- Images → Use fade animation workflow</action>

<action>Track all generated clip paths in array: {video_clips}</action>
</step>

<step n="3" goal="Merge segments">
<action>Use mcp__sora2__merge_videos with {video_clips} array</action>
<action>Apply fade transitions between segments</action>
<action>Display final merged video URL</action>

<template-output>hybrid_video_url, segments_used</template-output>
</step>

</workflow>
