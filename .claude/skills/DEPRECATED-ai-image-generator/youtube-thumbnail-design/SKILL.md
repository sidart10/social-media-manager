---
name: youtube-thumbnail-design
description: Eye-catching YouTube thumbnail design with bold text, high contrast, and emotion-driven visuals. Supports two modes - create from scratch OR composite user's image into thumbnail. Use when creating YouTube thumbnails, optimizing video CTR, or need attention-grabbing designs.
---

# YouTube Thumbnail Design

## Purpose

Create high-performing YouTube thumbnails that maximize click-through rate (CTR). Supports flexible creation - pure generation from text OR compositing user's image into thumbnail design.

## When to Use This Skill

Use this skill when:
- Creating YouTube thumbnails
- Designing video thumbnail images
- Optimizing video CTR with thumbnail design
- Need attention-grabbing YouTube covers
- Generating thumbnail with or without face

Triggers: YouTube thumbnail, video thumbnail, thumbnail image, thumbnail design, video cover image

**For thumbnail STRATEGY:** Use youtube-thumbnail-mastery skill (in jarvis/ - has MrBeast psychology, testing protocols)
**This skill:** Technical image GENERATION only

## Instructions

When creating YouTube thumbnail:

1. **Determine creation mode** - Flexible approach:

   **Mode A: Create from Scratch (No user image)**
   - Pure AI generation from text prompt
   - Best for: Abstract topics, tutorials, brand-only content
   - Tool: nanobanana generate mode
   - Faster, simpler workflow

   **Mode B: With User's Image (Personalized)**
   - Composite user's face/image into thumbnail
   - Best for: Personal branding, "talking head" style, face-to-camera content
   - Tool: nanobanana with input_image_path_1
   - Higher CTR (faces perform 40% better!)

   **For mode selection logic, see:** `reference/creation-modes.md`

2. **Apply YouTube specifications**:
   - **Size**: 1280×720px (16:9 aspect ratio) - YouTube official
   - **MCP mapping**:
     - gpt-image-1: 1536×1024 (guaranteed 16:9)
     - nanobanana: Auto-determines from prompt (requires explicit "16:9 widescreen landscape horizontal")
   - **Format**: JPG or PNG
   - **File size**: Under 2MB (YouTube limit)
   - **Safe zones**: Avoid bottom-right (time badge), top-right (UI elements)

   **⚠️ CRITICAL**: nanobanana does NOT support fixed dimensions - must explicitly prompt for landscape!

   **For complete specs, see:** `reference/youtube-specs.md`

3. **Apply YouTube thumbnail best practices**:
   - **Text**: 3-7 words MAX, LARGE bold font (readable at 156×88px preview)
   - **Faces**: Close-up, expressive emotion (curiosity, shock, excitement)
   - **Contrast**: High contrast, vibrant saturated colors
   - **Emotion**: Clear emotional expression (drives clicks)
   - **Curiosity gap**: Intrigue without spoiling (makes viewers click)
   - **Branding**: Consistent style across channel

   **For design best practices, see:** `reference/design-best-practices.md`

4. **Use nanobanana as primary tool**:
   - **Why nanobanana**: Fast, cost-effective ($0.039/thumbnail), supports image composition
   - **Mode A**: Pure generation
   - **Mode B**: Multi-image input (user image + design elements)

5. **Construct thumbnail prompt with CRITICAL requirements**:

   **For nanobanana (Mode B):**
   - **MUST start with**: "16:9 widescreen landscape horizontal YouTube thumbnail layout"
   - **MUST specify exact text**: 'Bold text reading exactly "YOUR EXACT TITLE"'
   - **MUST use spatial terms**: "LEFT THIRD", "RIGHT SIDE", "horizontal composition"
   - **MUST add negative prompts**: "portrait orientation, vertical layout, 9:16, wrong text"

   **For gpt-image-1 (Mode A):**
   - Use size parameter: `size: "1536x1024"`
   - Specify exact text: 'text reading exactly "YOUR EXACT TITLE"'
   - Less spatial detail needed (size guarantees aspect ratio)

   **For prompt templates, see:** `reference/prompt-templates.md`

6. **Include user image if provided** (Mode B - CORRECTED FORMAT):
   ```yaml
   input_image_path_1: "/path/to/user/headshot.jpg"
   prompt: "16:9 widescreen landscape horizontal YouTube thumbnail layout. Person from first image with [emotion] positioned on LEFT THIRD. Bold text reading exactly '[EXACT TITLE]' on RIGHT SIDE..."
   negative_prompt: "portrait orientation, vertical layout, 9:16, wrong text..."
   ```

7. **Quality check for thumbnails**:
   - Test at 156×88px (mobile preview size) - is it clear?
   - Text readable?
   - Face visible and expressive?
   - High enough contrast?
   - Compelling enough to click?

**This skill auto-loads when workflows detect YouTube thumbnail context!**

## Reference Documentation

This skill includes comprehensive YouTube thumbnail expertise:

- **`reference/youtube-specs.md`** - Official YouTube specifications and requirements
- **`reference/design-best-practices.md`** - What performs (faces, text, contrast, emotion)
- **`reference/creation-modes.md`** - Mode A (scratch) vs Mode B (with user image) detailed guide
- **`reference/prompt-templates.md`** - Effective prompts for both modes

**Related Skills:**
- `../create-image/` - Uses this design when generating YouTube thumbnails
- `../blend-images/` - Compositing technique used in Mode B
- `../mcp-tool-selection/` - Why nanobanana for thumbnails

## Example

**Workflow creating YouTube thumbnail:**

**Workflow asks**: "Include your image in thumbnail? [y/n]"

**User says**: "y" (Mode B - with my face)

**Claude auto-loads**: youtube-thumbnail-design skill

**Skill provides**:
- YouTube specs (1280×720, under 2MB)
- Bold text guidelines (3-7 words max)
- Expressive face requirements
- High contrast vibrant design
- Curiosity-driven composition

**Workflow executes**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "YouTube thumbnail: Person from first image with surprised excited expression, bold white text 'AI AGENTS EXPLAINED' in impact font, vibrant orange-blue gradient background, high contrast, eye-catching, curiosity-driven. Face close-up in left third, text right side, professional YouTube aesthetic."
  mode: "generate"
  input_image_path_1: "/path/to/user/headshot.jpg"
  negative_prompt: "small text, low contrast, boring, generic, cluttered, illegible, dull colors"
```

**Result**: Eye-catching YouTube thumbnail with user's face + bold text, optimized for CTR!

**See reference/ for complete YouTube thumbnail specifications and strategies.**
