# Convert JSON to Text - Simple Workflow

<workflow>

<step n="1" goal="Load JSON">
<action>Load JSON prompt file provided by user or previous workflow</action>
<action>Parse JSON structure</action>
<action>Identify type: video_scene OR video_sequence</action>
</step>

<step n="2" goal="Extract Components">
<action>For single scene OR each scene in sequence:</action>

<action>Component 1 - Scene Description:</action>
<action>Combine: environment + subject_action + action_specifics</action>
<action>Example: "Dark cave with fire, hands chiseling stone, chips flying"</action>

<action>Component 2 - Camera Technical:</action>
<action>Format: "{shot_type} with {camera_movement}, shot on {lens} at f/{aperture}, ISO {iso}"</action>
<action>Example: "Extreme close-up with static camera, shot on 50mm at f/2.8, ISO 1600"</action>

<action>Component 3 - Lighting:</action>
<action>Format: "{style} lighting from {source} ({color_temp}), {quality} light from {position}"</action>
<action>Example: "Chiaroscuro lighting from fire (2700K warm orange), hard flickering light from camera-right"</action>

<action>Component 4 - Color & Grade:</action>
<action>Format: "{grade_style} ({color_names}), {contrast}, {grain}"</action>
<action>Example: "Desaturated earthy (browns, blacks) with fire accents, high contrast, heavy 35mm grain"</action>

<action>Component 5 - Output Format:</action>
<action>Format: "Shot on {lens} in {aspect_ratio}, {resolution} {quality_level}"</action>
<action>Example: "Shot on 50mm prime in 16:9, 1920x1080 photorealistic"</action>
</step>

<step n="3" goal="Assemble Text">
<action>Combine 5 components with pipe separator:</action>
<action>Final format: [Component1] | [Component2] | [Component3] | [Component4] | [Component5]</action>

<action>Extract negative_prompt array and join with commas (stored separately)</action>
</step>

<step n="4" goal="Display Result">
<action>Show user the converted prompt:</action>
<action>Display: "CONVERTED TEXT PROMPT:"</action>
<action>Display: {assembled_text_prompt}</action>
<action>Display: ""</action>
<action>Display: "NEGATIVE PROMPTS:"</action>
<action>Display: {negative_prompts_joined}</action>

<action>Return both text_prompt and negative_prompts for use in generation</action>
</step>

</workflow>
