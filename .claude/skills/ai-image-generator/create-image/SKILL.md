---
name: create-image
description: Generate brand new images from text prompts using Emily's proven JSON methodology. Applies 7-pillar quality framework, intelligent tool selection (nanobanana or gpt-image-1), and professional standards. Use when workflow needs to create images from scratch for any platform.
---

# Create Image

## Purpose

Generate high-quality images from text prompts using Emily's proven JSON methodology, ensuring professional results through structured prompting, intelligent tool selection, and mandatory quality evaluation.

## Instructions

When workflow needs to create a new image from scratch:

1. **Load JSON template** from json-prompt-generator module:
   - Read: `bmad/modules/json-prompt-generator/templates/video-scene.json`
   - This is Emily's proven structure (10+ sections, technical precision)
   - Adapt for static image generation (remove motion/transition sections)

   **For complete JSON methodology, see:** `reference/emily-json-methodology.md`

2. **Populate JSON template** with comprehensive details:
   - **scene_description**: Environment, mood, sensory details
   - **subject_and_action**: What to show, focal point
   - **composition_and_framing**: Layout, rule of thirds, aspect ratio
   - **lighting_design**: Source, quality, position, color temperature
   - **color_and_grade**: Hex codes, palette, contrast, saturation
   - **typography**: Font, sizes, weights (if text in image)
   - **cinematography**: Camera specs, lens, aperture, ISO
   - **negative_prompt**: 10+ items from library (mandatory)

   **For JSON templates and examples, see:** `reference/json-templates.md`

3. **Apply Emily's quality standards**:
   - Technical precision: Hex codes (#0B0B0B), camera specs (f/2.8, ISO 1600)
   - Negative prompts: Minimum 10 items from appropriate categories
   - Platform compliance: Check platform-specs skill for requirements
   - Quality gates: Prepare for 7-pillar evaluation

   **For complete standards, see:** `reference/quality-framework.md`
   **For negative prompts library, see:** `reference/negative-prompts.md`

4. **Select optimal MCP tool** using intelligent decision logic:
   - Analyze use case, platform, quality needs, budget
   - Choose nanobanana (Gemini) OR gpt-image-1 (OpenAI)
   - Apply tool-specific parameters

   **For tool selection logic, see:** `reference/tool-selection.md`
   **For MCP tool parameters, see:** `reference/mcp-tools-reference.md`

5. **Convert JSON to text prompt** (if using text-based generator):
   - Apply conversion rules from json-prompt-generator module
   - 5-component pipe-separated structure
   - Preserve all technical details

   **For conversion workflow, see:** `bmad/modules/json-prompt-generator/workflows/convert-json-to-text.yaml`

6. **Generate image** using selected MCP tool:
   - nanobanana: Fast, cost-effective, creative
   - gpt-image-1: Photorealistic, text rendering, professional

7. **Run 7-pillar quality evaluation** (MANDATORY):
   - Clarity (1-10): Message clear in <3 seconds?
   - Technical Quality (1-10): Sharp, no artifacts?
   - Composition (1-10): Good balance?
   - Color Accuracy (1-10): Matches hex codes?
   - Typography (1-10): Text legible, hierarchical?
   - Professionalism (1-10): Enterprise-grade?
   - Prompt Accuracy (1-10): All elements present?

   **Overall score = Average of 7 pillars**

   **For evaluation guide, see:** `reference/quality-framework.md`

8. **Apply quality gates**:
   - Score < 7: Regenerate with improvements
   - Score 7-8: Good, acceptable for publication
   - Score 9+: Exceptional, save prompt as template

9. **Save metadata** with generation:
   - JSON prompt used
   - Tool selected and why
   - Generation time
   - Quality scores
   - File paths

**For real-world usage examples, see:** `reference/usage-examples.md`
**For workflow integration patterns, see:** `reference/workflow-integration.md`

## Reference Documentation

This skill includes comprehensive image generation knowledge:

- **`reference/emily-json-methodology.md`** - Core: Emily's proven JSON prompting structure
- **`reference/json-templates.md`** - Image-adapted templates from video-scene.json
- **`reference/tool-selection.md`** - Intelligent decision logic (nanobanana vs gpt-image-1)
- **`reference/prompting-guide.md`** - Best practices for both MCP tools
- **`reference/usage-examples.md`** - 5 real-world scenarios with complete flows
- **`reference/mcp-tools-reference.md`** - Complete MCP tool parameters and usage
- **`reference/quality-framework.md`** - Emily's 7-pillar evaluation system
- **`reference/negative-prompts.md`** - Comprehensive negative prompts library
- **`reference/workflow-integration.md`** - How workflows invoke this skill

**External References:**
- JSON Prompt Generator Module: `bmad/modules/json-prompt-generator/`
- Platform Specs: `../platform-specs/SKILL.md`
- Tool Selection: `../mcp-tool-selection/SKILL.md`

## Example

**Workflow asks:** "Create professional LinkedIn carousel slide about AI agents"

**You execute:**

1. **Load template**: video-scene.json (adapted for image)
2. **Populate JSON**:
   ```json
   {
     "scene_description": {
       "environment": "Dark minimalist background (#0B0B0B)",
       "subject": "AI agent architecture diagram with labeled components"
     },
     "composition_and_framing": {
       "aspect_ratio": "16:9",
       "resolution": "1536x1024",
       "layout": "12-column grid, generous spacing"
     },
     "lighting_design": {
       "style": "High-key studio lighting for clarity",
       "contrast": "High (WCAG AAA)"
     },
     "color_and_grade": {
       "palette": ["#0B0B0B", "#FFFFFF", "#4ADE80"],
       "grading": "High contrast monochrome with green accent"
     },
     "typography": {
       "font": "Inter, weight 300",
       "sizes": {"heading": "56pt", "body": "22pt"}
     },
     "negative_prompt": [
       "cluttered, busy, colorful backgrounds",
       "low contrast, small fonts",
       "stock photos, amateur design",
       "gradients, drop shadows, 3D renders",
       "light backgrounds, cartoons",
       ...10+ items total
     ]
   }
   ```

3. **Tool selection**: LinkedIn + text + professional = **gpt-image-1**

4. **Generate**:
   ```yaml
   mcp__gpt-image-1__create_image(
     prompt: [converted from JSON],
     size: "1536x1024",
     quality: "high",
     output_format: "png"
   )
   ```

5. **Evaluate**: 7-pillar scoring

6. **Result**: Professional LinkedIn slide, score 9.1/10, ready to post

**See reference/usage-examples.md Example 1 for complete scenario.**
