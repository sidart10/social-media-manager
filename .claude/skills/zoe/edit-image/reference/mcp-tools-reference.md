# MCP Tools Reference - Edit Mode

**How to use nanobanana for pixel-perfect image editing**

---

## Primary Tool: mcp**nanobanana**generate_image (Edit Mode)

**Why nanobanana for editing?**

- ⭐ **Best-in-class pixel-perfect precision**
- Targeted transformations (change one thing, preserve everything else)
- No full image recreation (unlike OpenAI's soft-mask)
- Multi-turn refinement capability
- Maintains original image quality

---

## Edit Mode Parameters

```typescript
{
  prompt: string (required, max 8192 chars)
    // SPECIFIC edit instructions
    // What to change + what to preserve
    // Example: "Blur background while keeping subject sharp"

  mode: "edit" (required for editing)
    // Must explicitly set to "edit"
    // Tells tool to modify existing image

  input_image_path_1: string (required for edit mode)
    // Path to image to edit
    // Must be absolute path
    // Supported: PNG, JPEG, WebP
    // Max size: 20MB

  negative_prompt: string (optional, max 1024 chars)
    // Things to avoid in the edit
    // Example: "artifacts, quality loss, color shift"

  system_instruction: string (optional, max 512 chars)
    // Overall guidance for the edit
    // Example: "Make precise targeted changes only, preserve image quality"

  n: number (1-4, default: 1)
    // Number of edit variations
    // Useful for testing different edit strengths
}
```

---

## Usage Pattern

### Basic Edit

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Blur background significantly, f/1.4 depth of field effect, keep subject sharp'
  mode: 'edit'
  input_image_path_1: '/path/to/original.png'
  n: 1
```

### Edit with Negatives

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Remove watermark from top-right corner, fill naturally'
  mode: 'edit'
  input_image_path_1: '/path/to/watermarked.png'
  negative_prompt: 'artifacts, visible edits, color mismatch, quality degradation'
  n: 1
```

### Edit with System Instruction

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Enhance colors: boost saturation by 20%, warmer tone'
  mode: 'edit'
  input_image_path_1: '/path/to/image.png'
  system_instruction: 'Make subtle natural adjustments, maintain photorealistic quality, no over-processing'
  n: 1
```

### Generate Variations

```yaml
mcp__nanobanana__generate_image:
  prompt: 'Blur background - testing different strengths'
  mode: 'edit'
  input_image_path_1: '/path/to/image.png'
  n: 3 # Get 3 blur strength variations
```

---

## Editing Techniques

### 1. Background Manipulation

**Blur**:

```yaml
prompt: 'Blur background with gaussian blur, f/1.4 depth of field, keep subject sharp'
mode: 'edit'
```

**Replace**:

```yaml
prompt: 'Replace background with solid white (#FFFFFF), keep subject exactly as is, clean edge separation'
mode: 'edit'
```

**Extend**:

```yaml
prompt: 'Extend background naturally to fill canvas, match existing background texture and lighting'
mode: 'edit'
```

### 2. Color Adjustments

**White Balance**:

```yaml
prompt: 'Correct white balance to neutral 5500K, remove yellow cast, natural colors'
mode: 'edit'
```

**Saturation**:

```yaml
prompt: 'Increase color saturation by 20%, more vibrant, Instagram aesthetic'
mode: 'edit'
```

**Color Grading**:

```yaml
prompt: 'Apply teal and orange color grade, cinematic look, maintain contrast'
mode: 'edit'
```

### 3. Object Manipulation

**Remove**:

```yaml
prompt: 'Remove the person from background, extend environment naturally to fill space, seamless removal'
mode: 'edit'
```

**Add**:

```yaml
prompt: 'Add small green plant in ceramic pot on left desk corner, match scene lighting'
mode: 'edit'
```

**Replace**:

```yaml
prompt: 'Replace red coffee cup with white mug, same position and lighting'
mode: 'edit'
```

### 4. Quality Enhancement

**Sharpen**:

```yaml
prompt: 'Enhance sharpness on main subject, increase edge definition, professional crisp look'
mode: 'edit'
```

**Denoise**:

```yaml
prompt: 'Reduce noise in shadow areas, smooth dark regions, maintain detail in highlights'
mode: 'edit'
```

**Contrast**:

```yaml
prompt: 'Increase overall contrast by 15%, richer blacks, brighter highlights'
mode: 'edit'
```

---

## Multi-Turn Editing Workflow

### Pattern: Iterative Refinement

```yaml
# Turn 1: First edit
result_1 = mcp__nanobanana__generate_image(
  prompt: "Edit instruction 1",
  mode: "edit",
  input_image_path_1: "original.png"
)
Save as: turn1.png

# Turn 2: Build on Turn 1
result_2 = mcp__nanobanana__generate_image(
  prompt: "Edit instruction 2",
  mode: "edit",
  input_image_path_1: "turn1.png"  # Use result from Turn 1
)
Save as: turn2.png

# Turn 3: Final polish
result_3 = mcp__nanobanana__generate_image(
  prompt: "Edit instruction 3",
  mode: "edit",
  input_image_path_1: "turn2.png"  # Use result from Turn 2
)
Save as: final.png
```

**Benefits**:

- Each edit focused and controlled
- Easy rollback to any version
- Gradual quality building
- Test each change independently

---

## Prompt Engineering for Editing

### Be Explicit About Preservation

❌ **Vague**:

```
"Blur the background"
```

✅ **Specific**:

```
"Blur background with strong gaussian blur, f/1.4 depth of field, while keeping the main subject completely sharp and in perfect focus, preserve all subject details"
```

### Describe Desired Outcome

❌ **Unclear**:

```
"Fix the colors"
```

✅ **Clear**:

```
"Remove yellow color cast, adjust white balance to neutral 5500K, make colors natural and balanced, preserve skin tones"
```

### Specify What NOT to Change

✅ **Include preservation**:

```
"Increase contrast by 15% while maintaining current color palette and preserving highlight detail"
```

---

## Error Handling

### Common Edit Failures

**Issue**: Edit affected entire image (not just target)
**Cause**: Prompt not specific enough
**Fix**: Be more explicit: "Blur ONLY background, keep subject untouched"

**Issue**: Quality degraded after edit
**Cause**: Over-editing or complex request
**Fix**: Simplify edit, or regenerate from scratch

**Issue**: Edit didn't work as expected
**Cause**: Ambiguous instructions
**Fix**: Be more specific, use technical terms

**Issue**: File not found
**Cause**: Wrong path to input image
**Fix**: Use absolute path, verify file exists

---

## Best Practices Summary

### 1. Specificity Wins

Be precise about what to change and what to preserve

### 2. One Change Per Turn

For best control, edit one thing at a time (multi-turn)

### 3. Save Versions

Keep original, save each edit iteration

### 4. Test Variations

Use n=2 or n=3 to get options

### 5. Preserve Quality

Mention "maintain quality", "preserve details" in prompts

### 6. Use Negatives

Include negative_prompt to prevent degradation

---

## Returns

```json
{
  "images": [
    {
      "file_path": "/Users/sid/nanobanana-images/image_edited_20251027.png",
      "size_bytes": 1234567,
      "metadata": {
        "mode": "edit",
        "original_image": "original.png",
        "edit_instructions": "...",
        "timestamp": "2025-10-27T12:34:56Z"
      }
    }
  ]
}
```

**Workflow Action**:

```bash
cp "{result.file_path}" "outputs/edited/image_v2.png"
```

---

**For editing techniques, see:** `editing-techniques.md`
**For real examples, see:** `usage-examples.md`
**For edit vs regenerate logic, see:** `when-to-edit-vs-regenerate.md`
