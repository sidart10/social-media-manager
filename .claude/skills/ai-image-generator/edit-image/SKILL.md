---
name: edit-image
description: Edit and refine existing images with pixel-perfect precision using nanobanana (Gemini). Best-in-class for targeted transformations (blur background, color correct, remove objects, enhance). Use when workflow needs to refine, correct, or transform existing generated or uploaded images.
---

# Edit Image

## Purpose

Refine, correct, or transform existing images using nanobanana's best-in-class pixel-perfect editing capabilities. Unlike regenerating entire images, editing makes targeted changes while preserving everything else.

## Instructions

When workflow needs to edit an existing image:

1. **Verify editing is appropriate** (vs regenerating):
   - ✅ Edit: Minor tweaks, targeted changes, refinements
   - ❌ Regenerate: Major changes, wrong composition, complete style overhaul

   **For decision logic, see:** `reference/when-to-edit-vs-regenerate.md`

2. **Prepare input image**:
   - Locate file path to image to edit
   - Verify image exists and is accessible
   - Supported formats: PNG, JPEG, WebP
   - Max size: 20MB (use upload_file tool if larger)

3. **Define edit instructions** with precision:
   - Be SPECIFIC about what to change
   - Describe desired outcome clearly
   - Mention what to preserve (keep sharp, maintain subject, etc.)

   **Good**: "Blur background using gaussian blur effect, f/2.8 depth of field, while keeping main subject completely sharp and in focus"

   **Bad**: "make it better", "improve quality", "fix it"

   **For editing techniques, see:** `reference/editing-techniques.md`

4. **Use nanobanana in edit mode**:
   ```yaml
   mcp__nanobanana__generate_image:
     prompt: "{specific edit instructions}"
     mode: "edit"
     input_image_path_1: "/path/to/image.png"
     n: 1
   ```

   **For complete MCP reference, see:** `reference/mcp-tools-reference.md`

5. **Apply iterative refinement** if needed:
   - Nanobanana supports multi-turn editing
   - Edit → Review → Edit again → Perfect
   - Each turn builds on previous
   - Conversational workflow

   **For multi-turn examples, see:** `reference/usage-examples.md`

6. **Evaluate result**:
   - Compare before/after
   - Verify edit accomplished goal
   - Check for unintended changes
   - Quality maintained?

7. **Save edited image** with version control:
   - Original: `image.png` (keep for rollback)
   - Edited: `image_v2.png` or `image_edited.png`
   - Metadata: Document what was changed

**For real-world editing scenarios, see:** `reference/usage-examples.md`

## Reference Documentation

This skill includes comprehensive editing knowledge:

- **`reference/nanobanana-editing.md`** - Nanobanana's pixel-perfect editing capabilities
- **`reference/editing-techniques.md`** - Blur, color correct, remove, add, enhance techniques
- **`reference/usage-examples.md`** - 5 real edit scenarios with complete flows
- **`reference/when-to-edit-vs-regenerate.md`** - Decision guide for edit vs regenerate
- **`reference/mcp-tools-reference.md`** - Complete nanobanana edit mode parameters

**External References:**
- Nanobanana Tool Selection: `../mcp-tool-selection/SKILL.md`
- Quality Standards: `bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md`

## Example

**Workflow needs:** "LinkedIn post looks great but background too busy - blur it"

**You execute:**

1. **Decision**: Edit (not regenerate) - targeted change only

2. **Tool**: nanobanana (ALWAYS for editing - best-in-class)

3. **Invoke**:
   ```yaml
   mcp__nanobanana__generate_image:
     prompt: "Blur background significantly using strong gaussian blur effect, equivalent to f/1.4 depth of field, while keeping the main subject completely sharp and in perfect focus. Create strong separation between subject and background."
     mode: "edit"
     input_image_path_1: "/path/to/linkedin-post-original.png"
     n: 1
   ```

4. **Result**: Background beautifully blurred, subject untouched, professional depth effect

5. **Save**: `linkedin-post-v2.png` (keep original)

**Why nanobanana**: Pixel-perfect precision - won't affect subject like OpenAI's soft-mask approach would

**See reference/usage-examples.md Example 1 for complete scenario.**
