# Create Images - Simplified Workflow Instructions

**Purpose:** Generate images using universal-image-generation skill
**Epic:** Epic 1 Story 7.6 (Universal Image Generation System)

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from bmad/agents/zoe/zoe-sidecar/workflows/create-images/</critical>

<step n="1" goal="Gather image requirements">
  <action>Display in {communication_language}:
    🎨 Image Generation - Universal System

    Powered by universal-image-generation skill:
    - Emily's JSON methodology (10-section prompts)
    - 27 style guides across 4 categories
    - Intelligent MCP tool selection (gpt-image-1, nanobanana, fal-video)
    - 7-pillar quality framework (minimum 7.0/10)

  </action>

  <ask>What should the image show? (Describe your vision)</ask>
  <action>Store as {{description}}</action>

  <ask>How many images?
  1. Single image (1)
  2. Carousel (2-10 images)
  </ask>
  <action>Store as {{count}}</action>

  <ask>Which platform?
  1. LinkedIn (dark professional tech)
  2. YouTube (CTR-optimized thumbnail)
  3. Instagram (vibrant engaging)
  4. Twitter (bold concise)
  5. General/Custom
  </ask>
  <action>Store as {{platform}}</action>

  <ask optional="true">Specific style preference? (or let skill auto-select based on platform)</ask>
  <action>Store as {{style_preference}}</action>

  <check if="platform == YouTube">
    <ask>Include your image in thumbnail? [y/n]
    (Faces boost CTR by 40%!)</ask>
    <action>Store as {{include_user_image}}</action>

    <check if="include_user_image == y">
      <ask>Path to your headshot/photo:</ask>
      <action>Store as {{user_image_path}}</action>
      <action>Verify file exists: test -f "{{user_image_path}}"</action>
    </check>
  </check>
</step>

<step n="2" goal="Generate images using universal-image-generation skill">
  <action>Load and follow {skills_folder}/universal-image-generation/SKILL.md</action>

  <action>Generate {{count}} image(s) per SKILL.md instructions with parameters:
    - Description: {{description}}
    - Platform: {{platform}}
    - Count: {{count}}
    - Style preference: {{style_preference}} (if provided, else skill auto-selects)
    - User image: {{user_image_path}} (if YouTube with face)
  </action>

  <action>Skill will automatically handle:
    - Category detection (social-media, youtube, personalization, data-visualization)
    - Style guide routing (loads from 27 available guides)
    - Emily's JSON methodology (constructs 10-section prompt)
    - MCP tool selection (gpt-image-1, nanobanana, or fal-video based on requirements)
    - Generation execution (calls selected MCP tool with optimized parameters)
    - Quality evaluation (7-pillar framework, scores each dimension)
    - Iteration if needed (regenerates if score < 7.0, up to 3 attempts)
    - Metadata creation (complete generation details)
  </action>

  <action>Store skill results:
    - {{generated_images}} = Array of image file paths from skill
    - {{metadata}} = Quality scores, tool used, generation time, JSON prompt
    - {{overall_score}} = Average of 7-pillar scores
  </action>

  <action>Display skill results to user:
    ✅ Generated {{count}} image(s)

    Quality: {{overall_score}}/10
    Tool: {{metadata.mcp_tool_used}}
    Time: {{metadata.generation_time}} seconds
    Style: {{metadata.style_applied}}

    Files: {{generated_images_list}}
  </action>
</step>

<step n="3" goal="Save to project outputs">
  <action>Determine or create project folder:
    - Load or create: outputs/projects/{date}-{slug}/00-session/metadata.json
    - Extract project_path from metadata
    - Create if needed: {project_path}/04-media/images/
  </action>

  <action>Copy generated images to project structure:
    For each image in {{generated_images}}:
      - Copy to: {project_path}/04-media/images/
      - Copy metadata JSON to: {project_path}/04-media/images/{filename}_metadata.json
  </action>

  <action>Update media tracking:
    - Load or create: {project_path}/04-media/images/metadata.json
    - Add entry: {
        "filename": "{filename}.png",
        "quality_score": {{overall_score}},
        "platform": "{{platform}}",
        "used_in_platforms": [],
        "created_by": "Zoe",
        "skill_used": "universal-image-generation",
        "timestamp": "{ISO-8601}"
      }
  </action>

  <action>Display:
    ✅ Saved to project: 04-media/images/
    {{file_list_with_sizes}}
  </action>
</step>

<step n="4" goal="Cloudinary upload (Epic 2 Integration)">
  <ask>Upload to Cloudinary for public URLs? [y/n]
  (Required for Postiz scheduling)</ask>

  <check if="yes">
    <action>For each image in {{generated_images}}:
      - Tool: mcp__cloudinary-asset-mgmt__upload-asset
      - Parameters:
          resourceType: "image"
          uploadRequest:
            file: "{project_path}/04-media/images/{filename}.png"
            public_id: "social-media/{project_slug}/{filename}"
            folder: "social-media-images"
      - Store result URL: {{cloudinary_urls}}
    </action>

    <action>Update media metadata with Cloudinary URLs:
      - Update: {project_path}/04-media/images/metadata.json
      - Add cloudinary_url field to each image entry
    </action>

    <action>Display:
      ✅ Uploaded to Cloudinary
      {{cloudinary_urls_formatted_list}}
    </action>
  </check>

  <check if="no">
    <action>cloudinary_urls = null</action>
    <action>Display: "ℹ️ No Cloudinary upload (local files only)"</action>
  </check>
</step>

<step n="5" goal="Update Notion (if page linked)">
  <action>Load {project-root}/bmad/core/modules/notion-updates.md</action>

  <action>Check for Notion integration:
    metadata = read_json("{project_path}/00-session/metadata.json")
  </action>

  <check if="metadata.notion.page_url exists">
    <action>Update Notion Content Tracker:
      - Property: "Media Assets" or "Description"
      - Value: Image URLs (Cloudinary if uploaded) or local paths
      - Keep Status: "Editing" (media added, not yet published)
      - Log action: "Zoe: Added {{count}} image(s), quality {{overall_score}}/10"
    </action>

    <action>Append to session log:
      Write to: {project_path}/00-session/session-log.md
      Content: "{timestamp} - Zoe: Generated {{count}} image(s) ({{platform}}, quality {{overall_score}}/10)\n"
    </action>

    <action>Display: "✅ Notion updated with image assets"</action>
  </check>

  <check if="no Notion page linked">
    <action>Display: "ℹ️ No Notion page linked (local-only project)"</action>
  </check>
</step>

<step n="6" goal="Create Zoro handoff (optional)">
  <ask>Ready to hand off to Zoro for scheduling? [y/n]</ask>

  <check if="yes">
    <action>Create handoff package:
      handoff_data = {
        "handoff_id": "zoe-to-zoro-{timestamp}",
        "source_agent": "zoe",
        "target_agent": "zoro",
        "content_type": "image_assets",
        "suggested_command": "/zoro → *schedule-post",
        "assets": [
          {
            "type": "image",
            "local_path": "{project_path}/04-media/images/{filename}.png",
            "cloudinary_url": "{url if uploaded else null}",
            "platform_optimized_for": "{{platform}}",
            "quality_score": "{{overall_score}}/10",
            "metadata_file": "{project_path}/04-media/images/{filename}_metadata.json"
          }
          // ... for each image
        ],
        "from_zoe": {
          "skill_used": "universal-image-generation",
          "style_applied": "{{metadata.style_applied}}",
          "quality_validated": true
        },
        "suggested_action": "schedule-post",
        "priority": "normal",
        "notes": "{{description}}"
      }
    </action>

    <action>Save handoff JSON to:
      {project_path}/handoffs/zoe-to-zoro-{timestamp}.json
    </action>

    <action>Display:
      ✅ Handoff created!

      Package: handoffs/zoe-to-zoro-{timestamp}.json
      Assets: {{count}} image(s)
      Quality: {{overall_score}}/10

      💡 Next: Run /zoro and select *schedule-post to publish
    </action>

    <action>Append to session log:
      "{timestamp} - Zoe: Created handoff for Zoro ({{count}} image assets)\n"
    </action>
  </check>

  <check if="no">
    <action>Display: "ℹ️ No handoff created (you can create one later or run /zoro directly)"</action>
  </check>
</step>

<step n="7" goal="Next actions">
  <ask>What next?
  1. Generate another image/carousel
  2. Edit this image (refine/adjust)
  3. Generate caption and alt-text
  4. Done
  </ask>

  <check if="option 1">
    <goto step="1">Start new image generation</goto>
  </check>

  <check if="option 2">
    <action>Display: "💡 Use /zoe edit-image skill for refinements"</action>
    <ask>What to edit? (describe changes)</ask>
    <action>Store as {{edit_instructions}}</action>
    <action>Pass to edit-image skill with:
      - Original image: {project_path}/04-media/images/{filename}.png
      - Edit instructions: {{edit_instructions}}
    </action>
  </check>

  <check if="option 3">
    <action>Analyze generated image(s) for content</action>
    <action>Generate platform-appropriate caption ({{platform}} specs)</action>
    <action>Generate accessibility alt-text (125 chars max)</action>
    <action>Suggest 3-5 relevant hashtags</action>
    <action>Save to: {project_path}/04-media/images/{filename}_caption.md</action>
    <action>Display: "✅ Caption and alt-text saved"</action>
  </check>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
