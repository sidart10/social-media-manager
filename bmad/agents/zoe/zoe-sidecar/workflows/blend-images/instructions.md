# Blend Images - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/agents/zoe/zoe-sidecar/workflows/blend-images/workflow.yaml</critical>
<critical>Communicate all responses in {communication_language}</critical>

<workflow>

<step n="1" goal="Gather input images">

<action>Welcome: "Let's blend multiple images using Nanobanana's multi-image composition."</action>

<ask>How many images do you want to blend? (2-3 recommended)</ask>

<action>Store as {{blend_count}}</action>

<check if="blend_count < 2">
  <action>Error: "Need at least 2 images to blend"</action>
  <goto step="1">Ask again</goto>
</check>

<check if="blend_count > 3">
  <action>Warn: "Nanobanana supports up to 3 images. Using first 3."</action>
  <action>Set blend_count = 3</action>
</check>

<action>Collect image paths:</action>

<ask>Path to image 1 (primary/base image):</ask>
<action>Store as {{input_image_path_1}}</action>
<action>Validate file exists: Bash test -f "{{input_image_path_1}}"</action>

<ask>Path to image 2 (secondary image to blend):</ask>
<action>Store as {{input_image_path_2}}</action>
<action>Validate file exists: Bash test -f "{{input_image_path_2}}"</action>

<check if="blend_count == 3">
  <ask>Path to image 3 (tertiary image to blend):</ask>
  <action>Store as {{input_image_path_3}}</action>
  <action>Validate file exists: Bash test -f "{{input_image_path_3}}"</action>
</check>

</step>

<step n="2" goal="Define blending composition">

<ask>Describe how you want to blend these images:

Examples:
- "Put me from image 1 on the beach from image 2"
- "Combine these product shots into one scene with image 1 center, image 2 left, image 3 right"
- "Place the logo from image 1 in the top-right corner of image 2"
- "Create a side-by-side comparison of image 1 and image 2"
- "Merge these into a grid layout (2x2 or 1x3)"
</ask>

<action>Store user description as {{blend_prompt}}</action>

<action>Analyze blend_prompt for clarity:</action>
<check if="prompt doesn't specify positions">
  <action>Suggest: "Specify where each image should appear (center, left, right, top-right, etc.)"</action>
  <ask>Want to refine your blending description? [y/n]</ask>
</check>

</step>

<step n="3" goal="Verify file formats and sizes">

<action>Check all input images:</action>
<action>Bash: file "{{input_image_path_1}}" "{{input_image_path_2}}" "{{input_image_path_3}}"</action>
<action>Store formats as {{formats_array}}</action>

<action>Bash: ls -lh "{{input_image_path_1}}" "{{input_image_path_2}}" "{{input_image_path_3}}"</action>
<action>Store sizes as {{sizes_array}}</action>

<action>Validate:</action>
<action>- All formats: PNG, JPEG, or WebP (Nanobanana supported)</action>
<action>- All sizes: < 20MB (Nanobanana limit)</action>

<check if="any file too large">
  <action>Warn: "Image {{N}} is {{size}}MB. Nanobanana limit is 20MB."</action>
  <ask>Compress and continue? [y/n]</ask>
</check>

</step>

<step n="4" goal="Preview blending plan">

<action>Display blending summary:</action>
<action>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Blending Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Input Images: {{blend_count}}
1. {{filename_1}} ({{size_1}})
2. {{filename_2}} ({{size_2}})
{{if blend_count == 3}}
3. {{filename_3}} ({{size_3}})
{{endif}}

Composition: {{blend_prompt}}

Provider: Nanobanana (multi-image mode)
Est. Time: 3-5 seconds

Output: {{outputs_project}}/blended-{{timestamp}}.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<ask>Proceed with blending? [y/n]</ask>

</step>

<step n="5" goal="Execute blending via Nanobanana MCP">

<action>Create output folder:</action>
<action>Bash: mkdir -p "{{outputs_project}}"</action>

<action>Record start_time</action>

<action>Show: "Blending images... (est. 3-5 seconds)"</action>

<critical>Call Nanobanana MCP tool with multi-image input:</critical>

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

<action>Record end_time</action>
<action>Calculate generation_time = end_time - start_time</action>

<action>Extract output from result:</action>
<action>- nano_output_path = result.file_paths[0]</action>
<action>- files_api_id = result.files_api_ids[0]</action>

</step>

<step n="6" goal="Save blended image and metadata">

<action>Create filename:</action>
<action>blended_{{timestamp}}.png</action>
<action>Store as {{blended_filename}}</action>

<action>Copy from Nanobanana location to agent outputs:</action>
<action>Bash: cp "{{nano_output_path}}" "{{outputs_project}}/{{blended_filename}}"</action>

<action>Get final file size:</action>
<action>Bash: ls -lh "{{outputs_project}}/{{blended_filename}}" | awk '{print $5}'</action>
<action>Store as {{final_size}}</action>

<action>Create metadata JSON:</action>
<action>
Write: {{outputs_project}}/{{blended_filename}}_metadata.json

Content:
{
  "operation": "blend",
  "blend_prompt": "{{blend_prompt}}",
  "input_images": [
    {"path": "{{input_image_path_1}}", "size": "{{size_1}}"},
    {"path": "{{input_image_path_2}}", "size": "{{size_2}}"}
    {{if blend_count == 3}},
    {"path": "{{input_image_path_3}}", "size": "{{size_3}}"}
    {{endif}}
  ],
  "output_image": {
    "path": "{{blended_filename}}",
    "size": "{{final_size}}"
  },
  "provider": "nanobanana",
  "model": "gemini-2.5-flash-image",
  "tool": "mcp__nanobanana__generate_image",
  "mode": "edit",
  "timestamp": "{{ISO-8601}}",
  "generation_time_seconds": {{generation_time}},
  "files_api_id": "{{files_api_id}}",
  "nano_output_path": "{{nano_output_path}}"
}
</action>

<action>Show completion:</action>
<action>
Images blended successfully!

Inputs: {{blend_count}} images
Output: {{blended_filename}} ({{final_size}})

Composition: {{blend_prompt}}
Time: {{generation_time}} seconds

Location: {{outputs_project}}/
</action>

<template-output>blend_complete</template-output>

</step>

<step n="7" goal="Review and refine">

<ask>What would you like to do?
1. Refine blending (adjust composition)
2. Blend different images
3. Apply same blend to new images
4. Save and done
</ask>

<action>Store as {{next_action}}</action>

<check if="next_action == 1">
  <ask>What refinement do you want?
  Examples:
  - "Make image 1 more prominent"
  - "Blend the edges more smoothly"
  - "Adjust the positioning of image 2"
  </ask>

  <action>Store as {{refinement_prompt}}</action>

  <action>Call Nanobanana again with refinement:</action>
  <action>
  result = mcp__nanobanana__generate_image({
    prompt: {{refinement_prompt}},
    file_id: {{files_api_id}},
    mode: "edit",
    n: 1
  })
  </action>

  <action>Save as {{blended_filename}}_v2.png</action>
  <action>Update metadata</action>
  <goto step="7">Return to options</goto>
</check>

<check if="next_action == 2">
  <goto step="1">Start with new images</goto>
</check>

<check if="next_action == 3">
  <ask>New set of images (same blend instructions):</ask>
  <action>Collect new image paths</action>
  <action>Use same {{blend_prompt}}</action>
  <goto step="5">Execute blend</goto>
</check>

<check if="next_action == 4">
  <action>Show: "Blended image saved to: {{outputs_project}}/{{blended_filename}}"</action>
  <action>Workflow complete</action>
</check>

</step>

<step n="8" goal="Upload to Cloudinary and update Notion (Epic 5)">

<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

<action>Step 1: Upload blended image to Cloudinary (Optional)

<ask>Upload blended image to Cloudinary for public URL? (needed for Postiz scheduling) [y/n]</ask>

<check if="yes">
  <action>Tool: mcp__cloudinary-asset-mgmt__upload-asset</action>
  <action>Parameters:
    resourceType: "image"
    uploadRequest:
      file: "{{outputs_project}}/{{blended_filename}}"
      public_id: "social-media/blended/{{blended_filename}}"
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
      {"Description": "Blended image ({{blend_count}} sources): {cloudinary_url}"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with blended image URL"</action>
  </check>

  <check if="cloudinary_url is null">
    <action>Call: update_content_property(
      metadata.notion.page_url,
      {"Description": "Local blended: 04-media/images/{{blended_filename}}"},
      "Zoe"
    )</action>
    <action>Display: "✅ Notion updated with local path"</action>
  </check>

  <action>Display: "ℹ️ Status='Editing' (blended image ready for publishing)"</action>

  <action>Log to session:
    append_to_file("00-session/session-log.md",
      "{timestamp} - Zoe: Added blended image to Notion ({{blended_filename}})\n"
    )
  </action>

  <check if="notion update fails">
    <action>Log warning: "⚠️ Notion update failed: {error}"</action>
    <action>Display: "Blended image still saved locally"</action>
    <action>Continue workflow</action>
  </check>
</check>

<check if="metadata.notion.page_url NOT exists">
  <action>Display: "ℹ️ No Notion page linked (local-only project)"</action>
</check>

</action>

<template-output>cloudinary_uploaded, notion_updated</template-output>

</step>

<step n="9" goal="Create handoff to Zoro (Epic 5)">

<ask>Ready to hand off blended image to Zoro for scheduling? [y/n]</ask>

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
        "subtype": "blended",
        "local_path": "{{outputs_project}}/{{blended_filename}}",
        "source_images": [
          {"path": "{{input_image_path_1}}"},
          {"path": "{{input_image_path_2}}"}
          {{if blend_count == 3}},
          {"path": "{{input_image_path_3}}"}
          {{endif}}
        ],
        "cloudinary_url": "{{cloudinary_url if exists else null}}",
        "blend_description": "{{blend_prompt}}",
        "metadata_file": "{{outputs_project}}/{{blended_filename}}_metadata.json"
      }
    ],

    "suggested_action": "schedule-post",
    "priority": "normal",
    "notes": "Blended image ({{blend_count}} sources) - {{blend_prompt}}"
  }
  </action>

  <action>Save handoff JSON to:
    {{outputs_project}}/../../handoffs/zoe-to-zoro-blended-{{timestamp}}.json
  </action>

  <action>Display: "✅ Handoff created for Zoro"</action>
  <action>Display: "💡 To publish: Run /zoro and select 'Process Handoff'"</action>

  <action>Log to session:
    append_to_file("00-session/session-log.md",
      "{timestamp} - Zoe: Created handoff for Zoro (blended image)\n"
    )
  </action>
</check>

<check if="no">
  <action>Display: "ℹ️ No handoff created. Blended image saved locally."</action>
</check>

<template-output>handoff_created</template-output>

</step>

</workflow>
