# MCP Tools Reference - Multi-Image Blending

**How to use nanobanana for 2-3 image composition**

---

## Tool: mcp__nanobanana__generate_image (Multi-Input Mode)

**Unique Capability**: Nanobanana is the ONLY tool that supports multiple image inputs for blending

---

## Multi-Image Parameters

```typescript
{
  prompt: string (required, max 8192 chars)
    // Describe how to BLEND the images
    // Specify what from each image
    // How they should integrate
    // Example: "Person from first image on basketball court from second image"

  mode: "generate" (recommended for blending)
    // Use "generate" mode with multiple inputs
    // Tool automatically understands it's blending
    // "auto" also works

  input_image_path_1: string (required - first source)
    // Path to first image
    // Usually the primary subject
    // Example: Person, product, main element

  input_image_path_2: string (required - second source)
    // Path to second image
    // Usually background or context
    // Example: Environment, setting, background

  input_image_path_3: string (optional - third source)
    // Path to third image (if needed)
    // Additional element or context
    // Example: Extra object, overlay, accent

  negative_prompt: string (optional, max 1024 chars)
    // Prevent blending failures
    // Example: "mismatched lighting, pasted appearance, artificial"

  n: number (1-4, default: 1)
    // Number of blend variations
    // Useful for testing different compositions
}
```

---

## Blending Patterns

### Pattern 1: Subject + Background (2 images)

**Most Common**: Place subject into different environment

```yaml
mcp__nanobanana__generate_image:
  prompt: "Composite [subject] from first image into [environment] from second image. [Positioning details]. Match lighting and shadows naturally."
  mode: "generate"
  input_image_path_1: "/path/to/subject.jpg"
  input_image_path_2: "/path/to/background.jpg"
```

**Use cases**:
- Person + office background
- Product + lifestyle setting
- Character + new scene

---

### Pattern 2: Foreground + Midground + Background (3 images)

**Complex**: Layer three elements

```yaml
mcp__nanobanana__generate_image:
  prompt: "Create layered composition: Background from third image, midground element from second image, foreground subject from first image. Natural depth, consistent lighting across all layers."
  mode: "generate"
  input_image_path_1: "/path/to/foreground.jpg"
  input_image_path_2: "/path/to/midground.jpg"
  input_image_path_3: "/path/to/background.jpg"
```

**Use cases**:
- Complex brand compositions
- Layered storytelling
- Depth-rich scenes

---

### Pattern 3: Split Screen / Comparison (2 images)

**Side-by-side**: Show two images as comparison

```yaml
mcp__nanobanana__generate_image:
  prompt: "Create split-screen: First image on left half, second image on right half. Clean vertical division. Equal sizing. Add 'BEFORE' and 'AFTER' labels."
  mode: "generate"
  input_image_path_1: "/path/to/before.jpg"
  input_image_path_2: "/path/to/after.jpg"
```

**Use cases**:
- Before/after transformations
- Product comparisons
- A/B testing visuals

---

### Pattern 4: Photo Montage (2-3 images)

**Creative**: Artistic blend, not realistic placement

```yaml
mcp__nanobanana__generate_image:
  prompt: "Create artistic montage blending elements from all images. Surreal, creative composition. Double exposure effect, transparent overlays, artistic integration."
  mode: "generate"
  input_image_path_1: "/path/to/image1.jpg"
  input_image_path_2: "/path/to/image2.jpg"
  input_image_path_3: "/path/to/image3.jpg"
```

**Use cases**:
- Creative social content
- Artistic expressions
- Album covers, posters

---

## Prompt Engineering for Blending

### Specify Source for Each Element

✅ **Clear source attribution**:
```
"Person from first image, office from second image, plant from third image"
```

❌ **Vague**:
```
"Combine these images"
```

### Describe Desired Integration

✅ **Integration details**:
```
"Natural composition with consistent lighting, realistic shadows, seamless blend"
```

❌ **No guidance**:
```
"Put them together"
```

### Positioning is Key

✅ **Spatial instructions**:
```
"Person in foreground right, office background, plant on left desk corner"
```

❌ **No positioning**:
```
"Show person in office with plant"
```

---

## Common Blending Challenges

### Challenge 1: Mismatched Lighting

**Problem**: Image 1 has warm lighting, Image 2 has cool lighting
**Solution**: Specify in prompt:
```
"Match lighting to second image (cool window light), adjust first image subject to match color temperature and direction"
```

### Challenge 2: Scale Issues

**Problem**: Subject too large/small relative to background
**Solution**: Specify scale:
```
"Scale person to realistic size for office environment, should occupy ~30% of frame height"
```

### Challenge 3: Perspective Mismatch

**Problem**: Different camera angles in source images
**Solution**: Accept creative interpretation or specify:
```
"Adjust perspective to match background camera angle, maintain realism"
```

### Challenge 4: Quality Difference

**Problem**: Image 1 is high-res, Image 2 is low-res
**Solution**: Match to lower quality or enhance:
```
"Enhance quality of second image to match first, upscale if needed"
```

---

## After Blending: Polish with edit-image

### Common Post-Blend Edits:

**1. Lighting Match**:
```yaml
# After blending, adjust lighting
edit-image skill:
  prompt: "Adjust lighting on subject to perfectly match background, add rim light from window"
  mode: "edit"
  input_image_path_1: "blended-result.png"
```

**2. Color Harmony**:
```yaml
# Unify color palette
edit-image skill:
  prompt: "Apply unified color grade, teal and orange, consistent across all elements"
  mode: "edit"
```

**3. Depth Enhancement**:
```yaml
# Add depth
edit-image skill:
  prompt: "Slightly blur background more, enhance subject sharpness, stronger depth of field"
  mode: "edit"
```

---

## Example: Complete Blend + Edit Workflow

**Goal**: Professional composite of person in office

**Step 1: Blend**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Person from first image in office from second"
  input_image_path_1: "person.jpg"
  input_image_path_2: "office.jpg"
# Result: person-in-office.png
```

**Step 2: Edit lighting**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Adjust subject lighting to match office window light"
  mode: "edit"
  input_image_path_1: "person-in-office.png"
# Result: person-in-office-v2.png
```

**Step 3: Final polish**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Slight background blur, enhance subject sharpness"
  mode: "edit"
  input_image_path_1: "person-in-office-v2.png"
# Result: final.png (perfect!)
```

**Total**:
- Cost: 3 × $0.039 = $0.117
- Time: ~1 minute
- Result: Professional composite with natural integration

---

## Summary: Blending Use Cases

| Use Case | Inputs | Difficulty | Success Rate |
|----------|--------|-----------|--------------|
| **Person + background** | 2 | Easy | 90%+ |
| **Product + lifestyle** | 2 | Easy | 85%+ |
| **Creative composite** | 3 | Medium | 80%+ |
| **Split screen** | 2 | Easy | 95%+ |
| **Before/after** | 2 | Easy | 95%+ |
| **Montage/artistic** | 2-3 | Hard | 70%+ |

---

**For blending techniques, see:** `blending-techniques.md`
**For multi-image details, see:** `multi-image-composition.md`
**For MCP parameters, see:** `mcp-tools-reference.md`
