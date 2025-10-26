# Image Montage Video Generation Workflow

<workflow>

<step n="1" goal="Gather images">
<ask response="image_paths">Provide image file paths (comma separated):</ask>
<action>Parse and validate image paths</action>
<action>Count images: {image_count}</action>
</step>

<step n="2" goal="Montage settings">
<ask response="duration_per_image">Duration per image (seconds)? [2-5 recommended]</ask>
<ask response="transition_type">Transition style? [fade/cut/slide]</ask>
<action>Calculate total_duration = {image_count} * {duration_per_image}</action>
</step>

<step n="3" goal="Use Sora 2 fade animation">
<action>Use mcp__sora2__create_fade_animation for each image to create video clips</action>
<action>Then use mcp__sora2__merge_videos to stitch all clips together</action>
<action>Display progress as clips are generated</action>
<action>Final merged video delivered</action>

<template-output>montage_video_url</template-output>
</step>

</workflow>
