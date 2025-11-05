# Emily's JSON Methodology for Image Generation

**Core: Structured prompting for professional-quality results**

**Source**: `bmad/modules/json-prompt-generator/` - Emily's proven system for video generation, adapted for static images

---

## 🎯 Core Principles

### 1. JSON-First Approach

**Why JSON?**

- **Zero ambiguity**: Every detail explicitly specified
- **Reproducibility**: Same JSON = same result
- **Quality control**: Forces comprehensive thinking
- **Template reuse**: Save successful prompts
- **Systematic**: Prevents forgetting critical details

**Minimum Sections Required:** 10+

### 2. Technical Precision

**Never use vague terms:**

- ❌ "blue background" → ✅ "#0B0B0B background"
- ❌ "large text" → ✅ "56pt Inter font, weight 300"
- ❌ "good lighting" → ✅ "Chiaroscuro lighting from single source at 2700K, hard quality, 45-degree angle"

### 3. Negative Prompts are Mandatory

**Minimum 10 items per prompt**

- Prevents common AI failures
- Content-type-specific
- Platform-specific
- Quality baselines

**See**: negative-prompts.md for complete library

### 4. 7-Pillar Quality Framework

**Every generated image scored 1-10 on:**

1. Clarity
2. Technical Quality
3. Composition
4. Color Accuracy
5. Typography
6. Professionalism
7. Prompt Accuracy

**Overall = Average of 7 pillars**

**Quality Gates:**

- < 7: Regenerate
- 7-8: Good
- 9+: Exceptional

---

## 📐 JSON Template Structure (Adapted for Images)

### Base Template (from video-scene.json)

```json
{
  "image_prompt": {
    "template_info": {
      "template_name": "Professional Image Generation",
      "version": "1.0",
      "use_for": "Static image with Emily-quality specifications",
      "platform": "LinkedIn | Instagram | Twitter | Custom"
    },

    "scene_description": {
      "environment": "Detailed description of setting/background",
      "mood": "Emotional tone and atmosphere",
      "time_period": "If relevant (modern, historical, futuristic)",
      "sensory_details": "Visual textures, lighting feel, atmospheric elements"
    },

    "subject_and_content": {
      "subject_type": "diagram | photo | illustration | text-graphic",
      "main_subject": "What is the focal point",
      "supporting_elements": "Additional elements in scene",
      "visual_hierarchy": "Primary → Secondary → Tertiary",
      "focal_point": "Where eye should go first"
    },

    "composition_and_framing": {
      "aspect_ratio": "16:9 | 1:1 | 9:16 | 4:5",
      "resolution": "1536x1024 | 1024x1024 | 1024x1536",
      "layout_system": "12-column grid | custom",
      "rule_of_thirds": "Element positioning on grid",
      "negative_space": "Percentage and where (35-60% recommended)",
      "alignment": "Left | center | right | justified",
      "margins": "96px horizontal, 72px vertical (or custom)"
    },

    "lighting_design": {
      "lighting_style": "Chiaroscuro | High-key | Low-key | Studio | Natural",
      "key_light": {
        "source": "Fire | Sun | Studio | Screen | Custom",
        "color_temp_k": 2700-6500,
        "position": "Camera-right 45-degree | Custom",
        "quality": "Hard | Soft | Diffused",
        "intensity": "Low | Medium | High"
      },
      "fill_light": "None | Subtle | Moderate",
      "contrast_ratio": "4:1 | 8:1 | 12:1",
      "mood": "Dramatic | Professional | Bright | Moody"
    },

    "color_and_grade": {
      "color_palette": {
        "hex_codes": ["#0B0B0B", "#FFFFFF", "#4ADE80"],
        "color_names": ["deep black", "white", "green accent"],
        "palette_type": "monochrome | complementary | analogous"
      },
      "color_grading": {
        "grade_style": "Description of overall color treatment",
        "contrast": "High | Medium | Low",
        "saturation": "Desaturated | Natural | Vibrant",
        "color_temperature": "Warm | Neutral | Cool"
      },
      "texture_effects": {
        "grain": "Heavy 35mm | Medium | Light | None",
        "noise_overlay": "0.03 opacity | Custom | None",
        "vignette": "Subtle | None"
      }
    },

    "typography": {
      "_note": "Include only if text in image",
      "font_family": "Inter | Custom",
      "type_scale": {
        "hero": "72pt",
        "heading": "56pt",
        "subheading": "28pt",
        "body": "22pt",
        "caption": "16pt"
      },
      "weights": {
        "primary": 300,
        "emphasis": 500,
        "bold": 700
      },
      "line_height": "1.1-1.2 for headlines, 1.5-1.6 for body",
      "letter_spacing": "Normal | Tight (-0.02em) | Loose (+0.05em)",
      "text_color": "#FFFFFF | Custom hex",
      "text_treatment": "No shadows | Clean | High contrast"
    },

    "camera_simulation": {
      "_note": "For photorealistic images, simulate camera settings",
      "lens": {
        "type": "50mm Prime | 85mm | 35mm | Custom",
        "focal_length_mm": 50,
        "aperture_f": 2.8,
        "depth_of_field": "Shallow | Deep"
      },
      "camera_settings": {
        "iso": 100-3200,
        "shutter_speed": "1/125s | Custom",
        "focus_point": "Where sharp focus should be"
      },
      "shot_type": "Close-up | Medium | Wide | Extreme close-up"
    },

    "technical_output": {
      "mcp_provider": "nanobanana | gpt-image-1 (selected by tool-selection logic)",
      "size": "1536x1024 | 1024x1024 | 1024x1536",
      "quality": "high | medium",
      "output_format": "png | jpeg",
      "intended_platform": "LinkedIn | Instagram | Twitter | Custom"
    },

    "negative_prompt": [
      "Category-specific negative (10+ items total)",
      "See negative-prompts.md for complete library",
      "Minimum categories: Quality, Style, Composition, Content-specific",
      "Example: cluttered, low contrast, small fonts, amateur",
      "Example: cartoon, CGI, stock photos, clip-art",
      "Example: light backgrounds, gradients, drop shadows",
      "...7+ more items"
    ]
  }
}
```

---

## 🔄 Workflow Integration

### Step-by-Step Usage in Workflows:

```yaml
- step: N
  goal: "Generate image using create-image skill"

  <action>Reference create-image skill</action>

  <action>Step 1: Load JSON template</action>
  <action>Read: bmad/modules/json-prompt-generator/templates/video-scene.json</action>

  <action>Step 2: Populate with user requirements</action>
  <action>- scene_description: {user's description + platform aesthetic}</action>
  <action>- subject_and_content: {what to show}</action>
  <action>- composition: {platform aspect ratio from platform-specs skill}</action>
  <action>- lighting: {mood-appropriate lighting}</action>
  <action>- color_and_grade: {hex codes from design system}</action>
  <action>- typography: {if text needed}</action>
  <action>- camera_simulation: {for photorealism}</action>
  <action>- negative_prompt: {10+ items from library}</action>

  <action>Step 3: Select MCP tool</action>
  <action>Apply tool-selection logic from create-image skill:</action>
  <check if="platform == LinkedIn AND has_text == true">
    <action>Select: gpt-image-1 (professional + text rendering)</action>
  </check>
  <check if="platform == Instagram AND volume > 5">
    <action>Select: nanobanana (speed + cost for volume)</action>
  </check>
  <action>Default: gpt-image-1 (safer for quality)</action>

  <action>Step 4: Generate using selected tool</action>
  <check if="selected_tool == gpt-image-1">
    <action>
    result = mcp__gpt-image-1__create_image({
      prompt: {converted_text_from_json},
      size: {size_from_json},
      quality: "high",
      output_format: "png"
    })
    </action>
  </check>
  <check if="selected_tool == nanobanana">
    <action>
    result = mcp__nanobanana__generate_image({
      prompt: {converted_text_from_json},
      mode: "generate",
      negative_prompt: {negatives_from_json},
      n: 1
    })
    </action>
  </check>

  <action>Step 5: Run 7-pillar evaluation</action>
  <ask>Rate image on 7 pillars (1-10 each):</ask>
  <action>Calculate overall score</action>

  <check if="overall_score < 7">
    <action>Identify weak pillars</action>
    <action>Suggest JSON improvements</action>
    <ask>Regenerate with improvements? [y/n]</ask>
  </check>

  <action>Step 6: Save with metadata</action>
  <action>Save image + JSON prompt + quality scores + metadata</action>
```

---

## Reference Documentation

**Core Module:**

- `bmad/modules/json-prompt-generator/` - Emily's proven methodology
- `emily-quality-standards.md` - 7-pillar framework
- `negative-prompts-library.md` - Comprehensive negatives
- `conversion-rules.md` - JSON to text conversion

**This Skill:**

- `emily-json-methodology.md` - This file (overview)
- `json-templates.md` - Adapted templates for images
- `tool-selection.md` - Intelligent provider choice
- `prompting-guide.md` - Best practices per tool
- `usage-examples.md` - 5 real-world scenarios
- `mcp-tools-reference.md` - Complete MCP documentation
- `quality-framework.md` - 7-pillar evaluation guide
- `negative-prompts.md` - Categorized negative library

**Related Skills:**

- `../platform-specs/` - Platform requirements
- `../mcp-tool-selection/` - Tool comparison
- `../edit-image/` - For refinements
- `../blend-images/` - For compositions

---

**This methodology ensures Emily-quality results for every image generated!** 🎯
