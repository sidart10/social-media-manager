# Cinematic Sequence Generation Workflow

**Uses**: JSON Prompt Generator Module → Images → Video Animation

<workflow>

<step n="1" goal="Define Sequence">
<ask response="video_concept">What's your video concept? (e.g., "Evolution of tools from stone age to AI")</ask>

<ask response="scene_count">How many scenes/moments? (3-20 recommended)</ask>

<action>Load template: {sequence_template}</action>
<action>Set scene_count in JSON</action>

<template-output>video_concept, scene_count</template-output>
</step>

<step n="2" goal="Set Global Consistency">
<action>Define settings that apply to ALL scenes:</action>

<ask response="lens_choice">Camera lens throughout? [35mm-wide / 50mm-standard / 85mm-portrait]</ask>
<ask response="shot_consistency">Shot type throughout? [close-up-hands / wide-establishing / medium-subject]</ask>
<ask response="color_evolution">Color evolution? [earthy-to-tech / consistent-brand / custom]</ask>

<action>Update JSON global_consistency section with choices</action>

<template-output>global_settings</template-output>
</step>

<step n="3" goal="Describe Each Scene">
<action>For each scene (1 to {scene_count}):</action>

<ask response="scene_{n}_name">Scene {n} name?</ask>
<ask response="scene_{n}_environment">Scene {n} environment? (Be specific: location, time, atmosphere)</ask>
<ask response="scene_{n}_action">Scene {n} action? (What's happening?)</ask>
<ask response="scene_{n}_lighting">Scene {n} lighting? (Source, mood)</ask>

<action>Populate scene {n} in JSON scenes array</action>

<action>Auto-calculate color for scene based on position in sequence:</action>
<action>- Scene 1: start_palette</action>
<action>- Scene {scene_count}: end_palette</action>
<action>- Middle scenes: Interpolated between start and end</action>

<template-output>all_scenes_populated</template-output>
</step>

<step n="4" goal="Review JSON">
<action>Display complete JSON structure</action>
<action>Show user summary:</action>
<action>- {scene_count} scenes defined</action>
<action>- Global lens: {lens_choice}</action>
<action>- Color evolution: {color_evolution}</action>
<action>- Estimated duration: {scene_count × 3} seconds</action>

<ask response="json_approved">Proceed with generation? [y/n/edit]</ask>

<check if="json_approved == 'edit'">
  <ask>What to change?</ask>
  <action>Make edits to JSON</action>
</check>

<check if="json_approved != 'y'">
  <goto step="exit"/>
</check>

<template-output>json_final</template-output>
</step>

<step n="5" goal="Generate Images">
<action>For each scene in JSON:</action>

<action>Convert JSON scene → text prompt using conversion workflow</action>
<action>Display: "Generating image for Scene {n}: {scene_name}"</action>

<action>Call: mcp**nanobanana**generate_image OR mcp**gpt-image-1**create_image</action>
<action>Parameters: prompt={converted_text}, negative_prompt={negatives}</action>

<action>Save image with scene metadata</action>
<action>Track image path in array: {generated_images[]}</action>

<action>Display: "✅ Scene {n} image generated"</action>

<template-output>generated_images[]</template-output>
</step>

<step n="6" goal="Animate Images">
<action>For each generated image:</action>

<action>Display: "Animating Scene {n}..."</action>

<action>Call: mcp**sora2**create*fade_animation</action>
<action>Parameters:</action>
<action> - image_path: {generated_images[n]}</action>
<action> - duration: 3</action>
<action> - fade_type: 'in-out'</action>
<action> - output_path: {output_folder}/scene*{n}.mp4</action>

<action>Receive: {video_clip_path}</action>
<action>Track in array: {video_clips[]}</action>

<action>Display: "✅ Scene {n} animated (3s with fades)"</action>

<template-output>video_clips[]</template-output>
</step>

<step n="7" goal="Merge Sequence">
<action>Display: "Merging {scene_count} clips into final video..."</action>

<action>Call: mcp**sora2**merge_videos</action>
<action>Parameters:</action>
<action> - video_urls: {video_clips[]}</action>
<action> - output_path: {output_folder}/{video_concept}\_final.mp4</action>

<action>Receive: {final_video_path}</action>

<action>Display: "✅ Cinematic sequence complete!"</action>
<action>Display: "📁 Final video: {final_video_path}"</action>
<action>Display: "⏱️ Total duration: {scene_count × 3} seconds"</action>
<action>Display: "🎨 Used JSON prompts with Emily-quality standards"</action>

<template-output>final_video_path</template-output>
</step>

<step n="8" goal="Save Metadata">
<action>Create metadata JSON:</action>
<action>- concept: {video_concept}</action>
<action>- scene_count: {scene_count}</action>
<action>- method: "JSON → Images → Fade → Merge"</action>
<action>- json_prompt_used: {json_final}</action>
<action>- generated_images: {generated_images[]}</action>
<action>- video_clips: {video_clips[]}</action>
<action>- final_video: {final_video_path}</action>
<action>- quality_standard: "Emily 7-Pillar"</action>

<action>Save to {output_folder}/{video_concept}\_metadata.json</action>

<template-output>metadata_saved</template-output>
</step>

<step n="exit" goal="Complete">
<action>Display: "🎬 Cinematic sequence workflow complete!"</action>
<action>Return to agent menu</action>
</step>

</workflow>
