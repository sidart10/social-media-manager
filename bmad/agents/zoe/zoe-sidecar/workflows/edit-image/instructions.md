# Edit Image - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/agents/zoe/zoe-sidecar/workflows/edit-image/workflow.yaml</critical>
<critical>Communicate all responses in {communication_language}</critical>

<workflow>

<step n="1" goal="Get image(s) and understand editing goal">

<action>Welcome: "Let's edit your image using Nanobanana's pixel-perfect AI editing."</action>

<ask>Do you want to:

1. Edit a single image (transform, enhance, remove elements)
2. Blend multiple images together (photo composition)
3. Multi-turn editing (iterative refinement)
   </ask>

<action>Store as {{edit_mode}}</action>

<check if="edit_mode == 1">
  <ask>Provide the path to your image file:</ask>
  <action>Store as {{input_image_path}}</action>
  <action>Validate file exists using Bash:</action>
  <action>Bash: test -f "{{input_image_path}}"</action>
  <check if="file doesn't exist">
    <action>Error: "Image not found at {{input_image_path}}"</action>
    <ask>Try again with correct path?</ask>
  </check>
</check>

<check if="edit_mode == 2">
  <ask>How many images to blend? (2-3 recommended)</ask>
  <action>Store as {{blend_count}}</action>

<for-each>N in 1 to blend_count</for-each>
<ask>Path to image {{N}}:</ask>
<action>Store as {{input_image_path_N}}</action>
<action>Validate file exists</action>
</check>

<check if="edit_mode == 3">
  <ask>Starting image path:</ask>
  <action>Store as {{input_image_path}}</action>
  <action>Set multi_turn_mode = true</action>
</check>

</step>

<step n="2" goal="Choose editing approach">

<ask>How would you like to edit?

1. Quick Preset (common edits)
2. Describe Custom Edit (natural language)
3. Let me suggest based on image
   </ask>

<action>Store as {{edit_approach}}</action>

<check if="edit_approach == 1">
  <action>Show editing presets:</action>
  <action>
  Common Editing Presets:

1. Blur Background - Professional depth effect
2. Remove Background - Transparent or solid color
3. Dark Tech Style - Convert to LinkedIn aesthetic (#0B0B0B, minimal)
4. Enhance Quality - Sharpen, color correct, denoise
5. Remove Object - Delete unwanted elements
6. Style Transfer - Change artistic style
7. Color Correction - Fix lighting and colors
8. Upscale & Enhance - Increase resolution and quality
   </action>

<ask>Which preset? (1-8 or describe custom)</ask>
<action>Store as {{preset_choice}}</action>

  <check if="preset_choice in 1-8">
    <action>Load preset prompt from editing_presets</action>
    <action>Store as {{edit_prompt}}</action>

    <action if="preset_choice == 5 (remove object)">
      Ask: "What object should I remove? (e.g., 'person on left', 'watermark', 'background sign')"
      Insert into preset prompt
    </action>

    <action if="preset_choice == 6 (style transfer)">
      Ask: "Target style? (e.g., 'minimalist illustration', 'oil painting', 'wireframe diagram')"
      Insert into preset prompt
    </action>

  </check>
</check>

<check if="edit_approach == 2">
  <ask>Describe the edit you want in natural language:
  Examples:
  - "Blur the background but keep the person sharp"
  - "Change the blue shirt to black"
  - "Remove the text watermark in bottom right"
  - "Make the lighting warmer and more golden"
  - "Transform to dark tech aesthetic like my LinkedIn posts"
  </ask>

<action>Store user description as {{edit_prompt}}</action>
</check>

<check if="edit_approach == 3">
  <action>Analyze image type (photo, screenshot, design, diagram)</action>
  <action>Suggest relevant edits based on analysis</action>
  <ask>Try suggested edit? [y/n/describe custom]</ask>
</check>

<check if="edit_mode == 2 (blending)">
  <ask>Describe how to blend the images:
  Example: "Put me and my dog on a basketball court"
  Example: "Combine these product shots into one scene"
  </ask>
  <action>Store as {{blend_prompt}}</action>
</check>

</step>

<step n="3" goal="Confirm editing plan">

<action>Display editing summary:</action>
<action>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Editing Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{If single edit:}}
Input: {{filename from path}}
Edit: {{edit_prompt OR preset_name}}

{{If blending:}}
Inputs: {{blend_count}} images
Blend: {{blend_prompt}}

Provider: Gemini Nanobanana (pixel-perfect editing)
Mode: {{edit_mode_name}}
Est. Time: 3-5 seconds

Output: {{outputs_project}}/{{filename}}\_edited.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<ask>Proceed with edit? [y/n]</ask>

</step>

<step n="4" goal="Prepare for editing">

<action>Create output folder:</action>
<action>Bash: mkdir -p "{{outputs_project}}"</action>

<action>Get original image info:</action>
<action>Bash: file "{{input_image_path}}"</action>
<action>Bash: ls -lh "{{input_image_path}}"</action>
<action>Store original size as {{original_size}}</action>

<action>Verify image format is supported (PNG, JPEG, WebP)</action>
<action>Verify file size < 20MB (Nanobanana limit)</action>

<check if="file too large">
  <action>Warn: "Image is {{size}}MB. Nanobanana accepts up to 20MB. Compress first?"</action>
  <ask>Compress and continue? [y/n]</ask>
</check>

</step>

<step n="5" goal="Execute edit via Nanobanana MCP">

<action>Record start_time</action>

<action>Show: "Editing image... (est. 3-5 seconds)"</action>

<critical>Call Nanobanana MCP tool for editing:</critical>

<check if="single image edit">
  <action>
  result = mcp__nanobanana__generate_image({
    prompt: {{edit_prompt}},
    input_image_path_1: {{input_image_path}},
    mode: "edit",
    n: 1
  })
  </action>
</check>

<check if="blending multiple images">
  <action>
  result = mcp__nanobanana__generate_image({
    prompt: {{blend_prompt}},
    input_image_path_1: {{input_image_path_1}},
    input_image_path_2: {{input_image_path_2}},
    input_image_path_3: {{input_image_path_3 if exists}},
    mode: "edit",
    n: 1
  })
  </action>
</check>

<action>Record end_time</action>
<action>Calculate generation_time = end_time - start_time</action>

<action>Extract output from result:</action>
<action>- nano_output_path = result.file_paths[0]</action>
<action>- files_api_id = result.files_api_ids[0]</action>
<action>- output_size = result.total_size_mb</action>

</step>

<step n="6" goal="Save edited image to agent outputs">

<action>Create filename for edited image:</action>
<action>{{original_filename}}_edited_{{timestamp}}.png</action>
<action>Store as {{edited_filename}}</action>

<action>Copy from Nanobanana location to agent outputs:</action>
<action>Bash: cp "{{nano_output_path}}" "{{outputs_project}}/{{edited_filename}}"</action>

<action>Get final file size:</action>
<action>Bash: ls -lh "{{outputs_project}}/{{edited_filename}}" | awk '{print $5}'</action>
<action>Store as {{final_size}}</action>

</step>

<step n="7" goal="Create metadata and before/after comparison">

<action>Create metadata JSON using Write tool:</action>
<action>
File: {{outputs_project}}/{{edited_filename}}\_metadata.json

Content:
{
"edit_type": "{{preset_name OR 'custom'}}",
"edit_prompt": "{{edit_prompt OR blend_prompt}}",
"input_images": [
{
"path": "{{input_image_path}}",
"size": "{{original_size}}"
}
{{if blending, add more images}}
],
"output_image": {
"path": "{{edited_filename}}",
"size": "{{final_size}}"
},
"provider": "nanobanana",
"model": "gemini-2.5-flash-image",
"tool": "mcp**nanobanana**generate_image",
"mode": "edit",
"timestamp": "{{ISO-8601}}",
"generation_time_seconds": {{generation_time}},
"files_api_id": "{{files_api_id}}",
"nano_output_path": "{{nano_output_path}}",
"comparison": {
"original_size": "{{original_size}}",
"edited_size": "{{final_size}}",
"size_change": "{{calculate difference}}"
},
"multi_turn_session": {{multi_turn_mode}},
"iteration": 1,
"quality_notes": ""
}
</action>

<action>Show completion:</action>
<action>
Image edited successfully!

Original: {{original_filename}} ({{original_size}})
Edited: {{edited_filename}} ({{final_size}})

Edit: {{edit_prompt}}
Time: {{generation_time}} seconds

Location: {{outputs_project}}/
</action>

<template-output>edit_complete</template-output>

</step>

<step n="8" goal="Review and offer refinement">

<action>Show before/after comparison info</action>

<ask>What would you like to do?

1. View side-by-side comparison
2. Refine edit (make changes to this result)
3. Try different edit (start over with same image)
4. Apply same edit to another image
5. Save and done
   </ask>

<action>Store as {{next_action}}</action>

<check if="next_action == 1">
  <action>Show both file paths for user to open:</action>
  <action>Original: {{input_image_path}}</action>
  <action>Edited: {{outputs_project}}/{{edited_filename}}</action>
  <action>Suggest: "Open both in preview/browser for comparison"</action>
  <goto step="8">Return to options</goto>
</check>

<check if="next_action == 2">
  <action>Multi-turn editing mode enabled</action>
  <ask>What refinement do you want?
  Examples:
  - "Blur more strongly"
  - "Keep the edge sharper"
  - "Also remove the sign in background"
  - "Make it even darker"
  </ask>

<action>Store as {{refinement_prompt}}</action>

<action>Update iteration counter</action>

<action>Call Nanobanana again (multi-turn):</action>
<action>
result = mcp**nanobanana**generate_image({
prompt: {{refinement_prompt}},
file_id: {{files_api_id}},
mode: "edit",
n: 1
})
</action>

<action>Save as {{edited_filename}}\_v{{iteration}}.png</action>
<action>Update metadata with new iteration</action>
<action>Show: "Refinement complete!"</action>

<goto step="8">Return to options (can iterate further)</goto>
</check>

<check if="next_action == 3">
  <goto step="2">Start over with new edit description</goto>
</check>

<check if="next_action == 4">
  <ask>Path to next image to edit with same settings:</ask>
  <action>Store as {{input_image_path}}</action>
  <action>Use same {{edit_prompt}}</action>
  <goto step="5">Apply edit to new image</goto>
</check>

<check if="next_action == 5">
  <action>Show: "Great! Edited image saved to: {{outputs_project}}/{{edited_filename}}"</action>
  <action>Workflow complete</action>
</check>

</step>

<step n="8.5" goal="Upload to Cloudinary and update Notion (Epic 5)">

<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

<action>Step 1: Upload edited image to Cloudinary (Optional)

<ask>Upload edited image to Cloudinary for public URL? (needed for Postiz scheduling) [y/n]</ask>

<check if="yes">
  <action>Tool: mcp__cloudinary-asset-mgmt__upload-asset</action>
  <action>Parameters:
    resourceType: "image"
    uploadRequest:
      file: "{{outputs_project}}/{{edited_filename}}"
      public_id: "social-media/edited/{{edited_filename}}"
      folder: "social-media-images"
  </action>

<action>Store result: {{cloudinary_result}}</action>
<action>Extract URL: {{cloudinary_url}} = cloudinary_result.secure_url</action>
<action>Display: "✅ Uploaded to Cloudinary: {cloudinary_url}"</action>

  <check if="upload fails">
    <action>Log error: "⚠️ Cloudinary upload failed: {error}"</action>
    <action>Set cloudinary_url = null</action>
    <action>Continue workflow</action>
  </check>
</check>

<check if="no">
  <action>Set cloudinary_url = null</action>
  <action>Display: "ℹ️ Skipped Cloudinary upload"</action>
</check>

</action>

<action>Step 2: Update Notion (if page linked)

<action>Load metadata: read_json("00-session/metadata.json")</action>

<check if="metadata.notion.page_url exists">
  <check if="cloudinary_url exists">
    <action>Call: update_content_property(
      metadata.notion.page_url,
      {"Description": "Edited image: {cloudinary_url}"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with edited image URL"</action>
  </check>

  <check if="cloudinary_url is null">
    <action>Call: update_content_property(
      metadata.notion.page_url,
      {"Description": "Local edited: 04-media/images/{{edited_filename}}"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with local path"</action>
  </check>

<action>Display: "ℹ️ Status='Editing' (edited image ready for publishing)"</action>

<action>Log to session:
append_to_file("00-session/session-log.md",
"{timestamp} - Zoe: Added edited image to Notion ({{edited_filename}})\n"
)
</action>

  <check if="notion update fails">
    <action>Log warning: "⚠️ Notion update failed: {error}"</action>
    <action>Display: "Edited image still saved locally"</action>
    <action>Continue workflow</action>
  </check>
</check>

<check if="metadata.notion.page_url NOT exists">
  <action>Display: "ℹ️ No Notion page linked (local-only project)"</action>
</check>

</action>

<template-output>cloudinary_uploaded, notion_updated</template-output>

</step>

<step n="9" goal="Create editing summary" optional="true">

<action>If multiple edits or iterations performed, create summary:</action>

<action>
Write: {{outputs_project}}/EDITING_SESSION_{{timestamp}}.md

Content:

# Image Editing Session Summary

**Date:** {{timestamp}}
**Provider:** Nanobanana (Gemini) - Pixel-Perfect Editing

## Images Edited

{{For each edited image:}}

### {{N}}. {{original_filename}} → {{edited_filename}}

**Edit:** {{edit_prompt}}
**Time:** {{generation_time}}s
**Size Change:** {{original_size}} → {{final_size}}
{{If iterations:}}
**Iterations:** {{iteration_count}}
{{End if}}

## Session Stats

- Total images edited: {{count}}
- Total iterations: {{sum of all iterations}}
- Total time: {{total_time}} seconds
- Average time per edit: {{avg_time}}s

## Files

All edited images saved to: {{outputs_project}}/
{{List all output files}}

## Quality Notes

{{Any quality observations or notes}}
</action>

<template-output>session_summary</template-output>

</step>

<step n="9.5" goal="Create handoff to Zoro (Epic 5)">

<ask>Ready to hand off edited image to Zoro for scheduling? [y/n]</ask>

<check if="yes">
  <action>Create handoff JSON:</action>
  <action>
  handoff_data = {
    "handoff_type": "image",
    "created_by": "Zoe",
    "created_at": "{{ISO-8601 timestamp}}",
    "project_path": "{{outputs_project}}",
    "notion_page_url": "{{metadata.notion.page_url if exists else null}}",

    "assets": [
      {
        "type": "image",
        "subtype": "edited",
        "local_path": "{{outputs_project}}/{{edited_filename}}",
        "original_path": "{{input_image_path}}",
        "cloudinary_url": "{{cloudinary_url if exists else null}}",
        "edit_type": "{{edit_prompt or preset_name}}",
        "metadata_file": "{{outputs_project}}/{{edited_filename}}_metadata.json"
      }
    ],

    "suggested_action": "schedule-post",
    "priority": "normal",
    "notes": "Edited image - {{edit_prompt}}"

}
</action>

<action>Save handoff JSON to:
{{outputs_project}}/../../handoffs/zoe-to-zoro-edited-{{timestamp}}.json
</action>

<action>Display: "✅ Handoff created for Zoro"</action>
<action>Display: "💡 To publish: Run /zoro and select 'Process Handoff'"</action>

<action>Log to session:
append_to_file("00-session/session-log.md",
"{timestamp} - Zoe: Created handoff for Zoro (edited image)\n"
)
</action>
</check>

<check if="no">
  <action>Display: "ℹ️ No handoff created. Edited image saved locally."</action>
</check>

<template-output>handoff_created</template-output>

</step>

</workflow>
