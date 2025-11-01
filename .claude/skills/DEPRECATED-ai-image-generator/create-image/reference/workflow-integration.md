# Workflow Integration Guide

**How workflows invoke the create-image skill for professional image generation**

---

## Integration Pattern

### Workflow References Skill

```yaml
# In any workflow that needs image generation
- step: N
  goal: "Generate professional image"

  <action>Reference create-image skill for image generation</action>
  <action>Skill will apply Emily's JSON methodology automatically</action>
  <action>Skill will select optimal MCP tool (nanobanana or gpt-image-1)</action>
  <action>Skill will run 7-pillar quality evaluation</action>
  <action>Return generated image with metadata</action>
```

---

## Complete Workflow Example

### generate-single.yaml Integration

```yaml
- step: 3
  goal: "Construct comprehensive prompt using create-image skill"

  <action>Invoke create-image skill with user requirements</action>

  <action>Skill Step 1: Load JSON template</action>
  <action>Read: bmad/modules/json-prompt-generator/templates/video-scene.json</action>
  <action>Adapt for static image (remove motion/transition sections)</action>

  <action>Skill Step 2: Populate JSON sections</action>
  <action>scene_description:</action>
  <action>- environment: {{user_description}} + {{platform_aesthetic}}</action>
  <action>- mood: Based on {{style_choice}}</action>

  <action>subject_and_content:</action>
  <action>- main_subject: {{prompt_description}}</action>
  <action>- focal_point: Primary message/visual</action>

  <action>composition_and_framing:</action>
  <action>- aspect_ratio: {{aspect_ratio}} (from user/platform)</action>
  <action>- resolution: {{size}} (mapped from platform-specs skill)</action>
  <action>- layout_system: Based on {{platform}} (12-column for LinkedIn)</action>
  <action>- negative_space: 35-60% (professional standard)</action>

  <action>lighting_design:</action>
  <action>- Based on {{style_choice}} and {{mood}}</action>
  <action>- High-key for professional, dramatic for dark aesthetic</action>

  <action>color_and_grade:</action>
  <action>- hex_codes: Exact codes from platform design system</action>
  <action>- Load from platform-specs skill</action>
  <action>- Example LinkedIn: ["#0B0B0B", "#FFFFFF", "#4ADE80"]</action>

  <action>typography (if text in image):</action>
  <action>- font_family: Inter for LinkedIn, Montserrat for Instagram</action>
  <action>- type_scale: {hero: 72pt, heading: 56pt, body: 22pt}</action>
  <action>- weights: {primary: 300, emphasis: 500}</action>

  <action>camera_simulation (for photorealistic):</action>
  <action>- lens: {type: "50mm Prime", aperture: 2.8}</action>
  <action>- settings: {iso: 400, shutter: "1/200s"}</action>

  <action>negative_prompt:</action>
  <action>- Load from negative-prompts library (min 10 items)</action>
  <action>- Select appropriate category (Professional for LinkedIn)</action>
  <action>- Add platform-specific negatives</action>

  <action>Skill Step 3: Select MCP tool</action>
  <check if="platform == LinkedIn AND has_text == true">
    <action>Select: gpt-image-1</action>
    <action>Reason: Professional quality + text rendering</action>
  </check>
  <check if="platform == Instagram">
    <action>Select: nanobanana</action>
    <action>Reason: Speed + cost for social volume</action>
  </check>
  <action>Default: gpt-image-1 (safer for quality)</action>

  <action>Skill Step 4: Generate using selected tool</action>
  <check if="selected_tool == gpt-image-1">
    <action>Convert JSON to text prompt</action>
    <action>Call: mcp__gpt-image-1__create_image</action>
    <action>Parameters: {prompt, size, quality: "high", format: "png"}</action>
  </check>
  <check if="selected_tool == nanobanana">
    <action>Convert JSON to text prompt</action>
    <action>Separate negatives from main prompt</action>
    <action>Call: mcp__nanobanana__generate_image</action>
    <action>Parameters: {prompt, negative_prompt, mode: "generate"}</action>
  </check>

  <action>Extract file_path from result</action>
  <action>Copy: cp "{mcp_path}" "{{outputs_folder}}/single-images/{{filename}}.png"</action>

  <action>Skill Step 5: Run 7-pillar evaluation</action>
  <ask>Review generated image and score (1-10 each):
  - Clarity
  - Technical Quality
  - Composition
  - Color Accuracy
  - Typography
  - Professionalism
  - Prompt Accuracy
  </ask>

  <action>Calculate overall score</action>

  <check if="overall_score < 7">
    <action>Identify weak pillars</action>
    <action>Suggest JSON improvements</action>
    <ask>Regenerate with improvements? [y/n]</ask>
  </check>

  <action>Skill Step 6: Save metadata</action>
  <action>Create metadata JSON with:</action>
  <action>- Full JSON prompt used</action>
  <action>- Tool selected and reasoning</action>
  <action>- Quality scores (7 pillars + overall)</action>
  <action>- Generation time, file size</action>
  <action>- Platform, use case</action>

  <action>Return to workflow: Image path + metadata path</action>
```

---

## Workflow Variables Required

For create-image skill to work, workflow must provide:

### Required Variables:
```yaml
{{prompt_description}}  # User's description of desired image
{{platform}}            # LinkedIn | Instagram | Twitter
{{aspect_ratio}}        # 16:9 | 1:1 | 9:16
{{size}}                # 1536x1024 | 1024x1024 | 1024x1536
{{style_choice}}        # dark monochrome tech | vibrant social | custom
```

### Optional Variables:
```yaml
{{custom_style}}        # If user chose custom style
{{has_text}}            # Boolean - text in image?
{{quality_priority}}    # high | medium | testing
{{budget_priority}}     # high | medium | unlimited
```

---

## Skill Outputs Returned to Workflow

```yaml
{{generated_image_path}}     # Full path to generated image
{{metadata_path}}            # Full path to metadata JSON
{{mcp_tool_used}}            # "gpt-image-1" or "nanobanana"
{{generation_time_seconds}}  # How long it took
{{file_size_mb}}             # Image file size
{{quality_score}}            # Overall 7-pillar score
{{quality_scores_detail}}    # Individual pillar scores
```

---

## Multi-Image Workflows

### For Carousels (generate-carousel.yaml)

```yaml
- step: 6
  goal: "Generate each slide using create-image skill"

  <for-each>slide in template.slides</for-each>

  <action>current_slide += 1</action>
  <action>Show progress: "Generating slide {{current_slide}}/{{total_slides}}"</action>

  <action>Invoke create-image skill with slide data:</action>
  <action>- prompt: slide.prompt</action>
  <action>- platform: LinkedIn</action>
  <action>- size: 1536x1024</action>
  <action>- style: dark monochrome tech</action>
  <action>- has_text: true</action>

  <action>create-image returns: generated_image_path, quality_score</action>

  <action>Save: slide{{current_slide}}.png</action>
  <action>Save: slide{{current_slide}}_metadata.json</action>

  <action>Show: "Slide {{current_slide}} complete! Quality: {{quality_score}}/10"</action>
```

**Skill handles**: JSON population, tool selection, generation, quality check

**Workflow handles**: Loop control, file naming, carousel organization

---

## Error Handling

### Skill Returns Error

```yaml
<check if="create_image_skill_error">
  <action>Log error from skill</action>
  <action>Common errors:</action>
  <action>- "Invalid size for gpt-image-1" → Use supported size</action>
  <action>- "Prompt too long" → Shorten JSON description</action>
  <action>- "Quality score < 5" → Major revision needed</action>

  <ask>How to proceed?
  1. Try different tool
  2. Simplify requirements
  3. Adjust JSON prompt
  4. Cancel
  </ask>
</check>
```

---

## Performance Optimization

### For Single Images
```yaml
# Standard quality generation
create-image skill with quality_priority: "high"
→ Full JSON methodology
→ 7-pillar evaluation
→ Score ≥ 7 required
```

### For Volume (10+ images)
```yaml
# Speed-optimized generation
create-image skill with quality_priority: "medium"
→ Simplified JSON (fewer sections)
→ Quick quality check (score ≥ 6 acceptable)
→ Nanobanana default for speed
```

---

## Skill Configuration

### Workflows Can Override:

```yaml
<action>Invoke create-image skill with overrides:</action>
<action>- force_tool: "nanobanana" (skip selection logic)</action>
<action>- min_quality_score: 8 (stricter than default 7)</action>
<action>- skip_evaluation: false (never skip, but option exists)</action>
<action>- json_detail_level: "full" | "simplified" | "minimal"</action>
```

---

## Used By Workflows

### Current Workflows:
- `generate-single.yaml` - Single image generation
- `generate-linkedin.yaml` - LinkedIn-optimized content
- `generate-carousel.yaml` - Multi-slide carousels

### Future Workflows:
- `generate-instagram-story.yaml`
- `generate-twitter-card.yaml`
- `generate-blog-header.yaml`
- Any workflow needing image generation!

---

## Benefits of Skill-Based Approach

**For Workflows:**
- ✅ Don't hardcode MCP tool calls
- ✅ Delegate complexity to skill
- ✅ Get quality guaranteed results
- ✅ Reusable across all workflows

**For Maintenance:**
- ✅ Update Emily's method once (in skill)
- ✅ All workflows benefit automatically
- ✅ Centralized tool selection logic
- ✅ Consistent quality standards

**For Users:**
- ✅ Consistent high-quality results
- ✅ Platform-appropriate output
- ✅ No need to understand MCP tools
- ✅ Emily-quality every time

---

**For complete integration examples:**
See current workflows in: `bmad/agents/ai-image-generator/workflows/`

**For tool selection details:**
See: `tool-selection.md` and `../../mcp-tool-selection/SKILL.md`
