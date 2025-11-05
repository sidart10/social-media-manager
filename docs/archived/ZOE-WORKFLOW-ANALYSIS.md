# Simplified create-images Workflow

**Before:** 597 lines
**After:** ~150 lines
**Reduction:** 75%

---

## Simplified instructions.md (Following Jarvis Pattern)

```xml
# Create Images - Simplified Workflow Instructions

<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>
<critical>Load workflow.yaml from bmad/agents/zoe/zoe-sidecar/workflows/create-images/</critical>

<workflow>

<step n="1" goal="Gather image requirements">
  <action>Display in {communication_language}:
    🎨 Image Generation - Universal System

    Powered by universal-image-generation skill:
    - Emily's JSON methodology
    - 27 style guides (4 categories)
    - Intelligent MCP tool selection
    - 7-pillar quality framework (minimum 7.0/10)
  </action>

  <ask>What should the image show? (Describe your vision)</ask>
  <action>Store as {{description}}</action>

  <ask>How many images?
  1. Single image (1)
  2. Carousel (2-10 images)
  </ask>
  <action>Store as {{count}}</action>

  <ask>Platform?
  1. LinkedIn (dark professional tech)
  2. YouTube (CTR-optimized thumbnail)
  3. Instagram (vibrant engaging)
  4. Twitter (bold concise)
  5. Custom (define your own)
  </ask>
  <action>Store as {{platform}}</action>

  <ask optional="true">Specific style preference? (or let skill auto-select based on platform)</ask>
  <action>Store as {{style_preference}}</action>

  <check if="platform == YouTube">
    <ask>Include your image in thumbnail? [y/n]
    (Faces perform 40% better!)</ask>
    <action>Store as {{include_user_image}}</action>

    <check if="include_user_image == y">
      <ask>Path to your headshot/photo:</ask>
      <action>Store as {{user_image_path}}</action>
      <action>Verify: test -f "{{user_image_path}}"</action>
    </check>
  </check>
</step>

<step n="2" goal="Generate images using universal-image-generation skill">
  <action>Load and follow {skills_folder}/universal-image-generation/SKILL.md</action>

  <action>Generate {{count}} image(s) per SKILL.md instructions with parameters:
    - Description: {{description}}
    - Platform: {{platform}}
    - Count: {{count}}
    - Style preference: {{style_preference}} (if provided)
    - User image: {{user_image_path}} (if YouTube with face)
  </action>

  <action>Skill will automatically handle:
    - Category detection (social-media, youtube, personalization, data-viz)
    - Style guide routing (27 available guides)
    - Emily's JSON methodology (10-section prompt construction)
    - MCP tool selection (gpt-image-1, nanobanana, or fal-video)
    - Quality evaluation (7-pillar framework, minimum 7.0/10)
    - Iteration if quality < 7.0 (up to 3 attempts)
    - Metadata generation
  </action>

  <action>Store results:
    - {{generated_images}} = Array of image file paths
    - {{metadata}} = Quality scores, tool used, generation time
    - {{quality_scores}} = 7-pillar evaluation results
  </action>

  <action>Display skill results:
    Generated {{count}} image(s):
    - Quality: {{average_score}}/10
    - Tool used: {{mcp_tool_used}}
    - Time: {{generation_time}} seconds
    - Files: {{file_list}}
  </action>
</step>

<step n="3" goal="Save to project outputs">
  <action>Determine or create project folder:
    - Load or create: outputs/projects/{date}-{slug}/00-session/metadata.json
    - Extract: project_path
    - Create if needed: {project_path}/04-media/images/
  </action>

  <action>Copy generated images to outputs:
    For each image in {{generated_images}}:
      - Copy to: {project_path}/04-media/images/
      - Save metadata JSON
      - Update 04-media/images/metadata.json with usage tracking
  </action>

  <action>Display:
    ✅ Saved to: 04-media/images/
    - {{filename_1}}.png ({{size_1}})
    - {{filename_2}}.png ({{size_2}}) # if carousel
    - ... (if more)
  </action>
</step>

<step n="4" goal="Cloudinary upload (Epic 2 Integration)">
  <ask>Upload to Cloudinary for public URLs? [y/n]
  (Required for Postiz scheduling)</ask>

  <check if="yes">
    <action>For each image:
      Upload to Cloudinary:
        - Tool: mcp__cloudinary-asset-mgmt__upload-asset
        - Folder: "social-media-images"
        - Public ID: "{project_slug}/{filename}"
    </action>

    <action>Store Cloudinary URLs as {{cloudinary_urls}}</action>

    <action>Display:
      ✅ Uploaded to Cloudinary:
      {{cloudinary_urls_list}}
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
      - Add image URLs (Cloudinary if uploaded, else local paths)
      - Keep Status = "Editing" (media added, not published)
      - Log: "Zoe: Added {{count}} image(s)"
    </action>

    <action>Display: "✅ Notion updated with image URLs"</action>
  </check>

  <check if="no Notion page linked">
    <action>Display: "ℹ️ No Notion page linked (local-only project)"</action>
  </check>
</step>

<step n="6" goal="Create Zoro handoff (optional)">
  <ask>Ready to hand off to Zoro for scheduling? [y/n]</ask>

  <check if="yes">
    <action>Create handoff JSON:
      {
        "handoff_type": "image",
        "created_by": "Zoe",
        "created_at": "{ISO-8601}",
        "assets": [
          {
            "type": "image",
            "local_path": "{path}",
            "cloudinary_url": "{url if uploaded}",
            "platform": "{platform}",
            "quality_score": "{score}/10"
          }
          // ... for each image
        ],
        "suggested_action": "schedule-post",
        "notes": "{{description}}"
      }
    </action>

    <action>Save to: {project_path}/handoffs/zoe-to-zoro-{timestamp}.json</action>

    <action>Display:
      ✅ Handoff created!
      💡 Run /zoro to schedule for publishing
    </action>
  </check>

  <check if="no">
    <action>Display: "ℹ️ No handoff created (can create later)"</action>
  </check>
</step>

<step n="7" goal="Next actions">
  <ask>What next?
  1. Generate another image
  2. Edit this image (refine/adjust)
  3. Generate caption/alt-text
  4. Done
  </ask>

  <check if="option 1">
    <goto step="1">Start new image generation</goto>
  </check>

  <check if="option 2">
    <action>Display: "Use edit-image skill for refinements"</action>
    <ask>What to edit?</ask>
    <action>Pass to edit-image skill with parameters</action>
  </check>

  <check if="option 3">
    <action>Generate platform-appropriate caption</action>
    <action>Generate accessibility alt-text</action>
    <action>Save to: {project_path}/04-media/images/{filename}_caption.md</action>
  </check>

  <template-output>workflow_complete</template-output>
</step>

</workflow>
```

**Target size:** ~150 lines (75% reduction from 597!)

---

## What Gets Removed

### DELETE Entirely:

**Step 3 (Lines 117-231):** "Construct comprehensive JSON prompt"

- Entire Emily methodology duplication
- Template population logic
- Platform-specific JSON building
- **Why remove:** Skill handles all of this

**Parts of Step 5 (Lines 256-318):** "Generate via MCP tool"

- Tool selection decision tree
- Tool-specific parameters
- Execution logic
- **Why remove:** Skill handles tool selection and execution

**Step 6 (Lines 320-366):** "Run 7-pillar quality evaluation"

- Framework implementation
- Scoring prompts
- Quality gates
- **Why remove:** Skill runs this automatically

**Most of Step 7 (Lines 369-398):** "Create metadata"

- Comprehensive JSON structure
- **Why remove:** Skill provides metadata

### KEEP and Simplify:

**Step 1:** Gather requirements → Keep but streamline
**Step 2:** Select aspect ratio → Move to skill OR keep if explicit control needed
**Step 4:** Confirmation → Simplify
**Step 8:** Next actions → Keep
**Step 8.5:** Cloudinary/Notion → Keep (integration layer)
**Step 9:** Zoro handoff → Keep (coordination layer)

---

## Comparison: Current vs Simplified

| Aspect                | Current (Wrong)          | Simplified (Correct)                  |
| --------------------- | ------------------------ | ------------------------------------- |
| **Size**              | 597 lines                | ~150 lines                            |
| **Duplication**       | 70% overlaps skill       | 0% duplication                        |
| **Pattern**           | Workflow does everything | Workflow orchestrates, skill executes |
| **Maintainability**   | Update 2 places          | Update skill only                     |
| **Consistency**       | Different from Jarvis    | Matches Jarvis pattern                |
| **JSON construction** | Manual in workflow       | Skill handles                         |
| **Tool selection**    | Hardcoded logic          | Skill's decision tree                 |
| **Quality eval**      | Manual scoring           | Skill's framework                     |

---

## Implementation Plan

**Would you like me to:**

1. **Create simplified version** (recommended)
   - Rewrite instructions.md to ~150 lines
   - Remove all skill duplication
   - Keep only orchestration layer
   - Follow exact Jarvis pattern

2. **Show side-by-side comparison first**
   - Current step-by-step
   - Proposed simplified step-by-step
   - You decide which approach

3. **Audit current version first**
   - Run full audit like we did for Jarvis
   - Document all issues
   - Then simplify

**My recommendation: Option 1** - Just simplify it now. The pattern is clear, and we know exactly what needs to happen based on the Jarvis learnings.

Should I proceed with creating the simplified version?
