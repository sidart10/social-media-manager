---
name: blend-images
description: Compose and blend 2-3 images into unified scene using nanobanana. Use when combining images, blending photos, merging pictures, creating photo mashups, compositing scenes, fusing multiple images, mixing visuals, or combining multiple source images into one cohesive output.
---

# Blend Images

## Purpose

Compose multiple images (2-3) into a single unified scene using nanobanana's multi-image conditioning capability. Perfect for photo blending, scene reconstruction, and creative compositions.

## When to Use This Skill

Use this skill when:

- Combining multiple images into one
- Blending photos together
- Merging 2-3 pictures
- Creating photo mashups
- Compositing multiple scenes
- Fusing images together
- Mixing multiple visuals
- Combining source images into cohesive output

Triggers: blend images, combine images, merge photos, photo mashup, composite images, fuse images, mix images, multi-image composition

**Don't use for:**

- Creating single image from text (use create-image skill)
- Editing single image (use edit-image skill)

## Instructions

When blending multiple images:

1. **Verify blending is appropriate** (vs creating new):
   - ✅ Blend: Have 2-3 source images to combine
   - ✅ Blend: Want elements from multiple photos in one scene
   - ❌ Create new: Starting from scratch with no source images

2. **Prepare input images** (2-3 required):
   - Locate paths to all source images
   - Verify all files exist and accessible
   - Supported formats: PNG, JPEG, WebP
   - Max size: 20MB each

3. **Define composition goal** clearly:
   - What from image 1?
   - What from image 2?
   - What from image 3 (optional)?
   - How should they combine?
   - Desired mood/style of result?

   **For blending techniques, see:** `reference/blending-techniques.md`

4. **Use nanobanana with multi-image input**:

   ```yaml
   mcp__nanobanana__generate_image:
     prompt: '{how to blend the images}'
     mode: 'generate' # Yes, "generate" for blending!
     input_image_path_1: '/path/to/first.jpg'
     input_image_path_2: '/path/to/second.jpg'
     input_image_path_3: '/path/to/third.jpg' # Optional
     n: 1
   ```

   **For complete parameters, see:** `reference/mcp-tools-reference.md`

5. **Evaluate composition**:
   - Elements from all images present?
   - Natural integration (not pasted)?
   - Lighting consistent?
   - Quality maintained?

6. **Refine if needed**:
   - Use edit-image skill to polish result
   - Adjust lighting, colors, sharpness
   - Multi-turn refinement possible

**For real-world blending scenarios, see:** `reference/usage-examples.md`

## Reference Documentation

This skill includes blending and composition knowledge:

- **`reference/multi-image-composition.md`** - Nanobanana's 3-image capability explained
- **`reference/blending-techniques.md`** - Photo composition strategies and approaches
- **`reference/usage-examples.md`** - 5 real blending scenarios with results
- **`reference/mcp-tools-reference.md`** - Complete multi-input parameters

**Related Skills:**

- Edit after blending: `../edit-image/SKILL.md`
- Create from scratch: `../create-image/SKILL.md`

## Example

**Workflow needs:** "Put my headshot into professional office background"

**You execute:**

1. **Inputs**:
   - Image 1: User's headshot (person.jpg)
   - Image 2: Office background (office.jpg)

2. **Blend**:

   ```yaml
   mcp__nanobanana__generate_image:
     prompt: 'Composite person from first image into the office environment from second image. Natural integration with consistent lighting. Person positioned at desk in foreground, office background behind. Match lighting direction and color temperature. Photorealistic, seamless composition.'
     mode: 'generate'
     input_image_path_1: '/photos/person.jpg'
     input_image_path_2: '/photos/office.jpg'
     negative_prompt: 'cut-out appearance, pasted look, mismatched lighting, color inconsistency, artificial composition, visible edges'
     n: 1
   ```

3. **Result**: Person naturally integrated into office scene, consistent lighting, professional composite

4. **Optional refinement**: Use edit-image skill to adjust lighting match or blur background slightly

**Why nanobanana**: ONLY tool that supports multi-image input for natural blending

**See reference/usage-examples.md Example 1 for complete scenario.**
