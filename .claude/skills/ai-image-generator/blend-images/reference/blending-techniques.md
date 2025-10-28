# Image Blending Techniques

**Strategies for successful multi-image composition**

---

## Core Blending Techniques

### 1. Subject Extraction + Background Placement

**Goal**: Put subject from one image into background from another

**Keys to Success**:
- Specify which element from which image
- Describe positioning clearly
- Match lighting direction and color
- Include realistic shadows

**Prompt Template**:
```
"Composite [subject] from first image into [environment] from second image. Position [subject] at [location]. Match lighting from [source] - [direction and quality]. Add realistic [shadow type] on [surface]. Natural integration, photorealistic."
```

**Example**:
```
"Composite person from first image into office environment from second image. Position person at desk in center-right. Match lighting from office's window light (soft, diffused, camera-left). Add soft shadow beneath person on desk surface. Natural, looks like person is actually in office, photorealistic composition."
```

---

### 2. Layered Composition (3 Images)

**Goal**: Create depth with foreground, midground, background from separate images

**Keys to Success**:
- Define depth planes clearly
- Specify layering order
- Match perspective across layers
- Consistent lighting across all

**Prompt Template**:
```
"Create layered composition: Background from [image 3], midground [element] from [image 2], foreground [subject] from [image 1]. Natural depth progression, consistent lighting [direction], realistic scale relationships."
```

---

### 3. Side-by-Side Comparison

**Goal**: Show two images side-by-side for comparison

**Keys to Success**:
- Equal sizing and alignment
- Clean division (vertical or horizontal)
- Optional labels (BEFORE/AFTER, A/B)
- Consistent framing

**Prompt Template**:
```
"Split-screen composition: Left half shows [first image], right half shows [second image]. Clean vertical divider, equal sizing, aligned at center. Optional labels: '[Left Label]' and '[Right Label]'."
```

---

### 4. Artistic Blend / Montage

**Goal**: Creative fusion, double exposure effect, artistic combination

**Keys to Success**:
- Accept artistic interpretation
- Specify blend style (overlay, multiply, screen)
- Mood and aesthetic guidance
- Creative freedom

**Prompt Template**:
```
"Artistic blend of [image 1] and [image 2]. [Blend style] effect, [opacity], [mood]. Creative, surreal, [aesthetic keywords]."
```

**Example**:
```
"Artistic blend of portrait from first image and cityscape from second image. Double exposure effect, portrait 60% opacity overlaying cityscape. Moody, cinematic, urban aesthetic."
```

---

### 5. Product Placement

**Goal**: Place product from clean shot into lifestyle setting

**Keys to Success**:
- Realistic product scale
- Surface interaction (shadows, reflections)
- Lighting match critical
- Natural positioning

**Prompt Template**:
```
"Place [product] from first image onto [surface/location] in second image. Position at [location]. Realistic shadow on [surface], match lighting [from scene]. Product maintains detail and sharpness. Natural product placement, lifestyle photography aesthetic."
```

---

### 6. Environmental Context Addition

**Goal**: Add person/object into scene while preserving context

**Keys to Success**:
- Preserve background mostly unchanged
- Subject integrated naturally
- Environmental lighting applied to subject
- Realistic spatial relationships

**Prompt Template**:
```
"Add [subject] from first image into [specific location] in second image environment. Subject should appear naturally present in environment. Match environmental lighting, add appropriate shadows, maintain scene atmosphere."
```

---

## Lighting Integration Strategies

### Match to Background
```
"Match subject lighting to office environment - soft window light from left, neutral color temperature (5500K)"
```

### Unified Lighting
```
"Apply unified lighting across all elements - single light source camera-right, consistent shadows"
```

### Preserve Original
```
"Maintain original lighting on each element, blend naturally despite different lighting"
# Works for creative/artistic blends
```

---

## Shadow & Depth Cues

### Add Realistic Shadows
```
"Add soft shadow beneath subject on floor/surface, matches environmental lighting direction"
```

### Depth of Field
```
"Background slightly blurred (f/2.8), subject sharp, create natural depth separation"
```

### Atmospheric Depth
```
"Add atmospheric haze between layers, distant elements slightly desaturated, depth cues"
```

---

## Scale & Perspective

### Realistic Scale
```
"Scale person to realistic size for office environment - person should be ~40% of frame height when seated"
```

### Perspective Match
```
"Adjust subject perspective to match background camera angle (slight high angle)"
```

### Consistent Horizon
```
"Align horizon lines, maintain consistent perspective across all elements"
```

---

## Color Harmony

### Unified Color Grading
```
"Apply teal and orange color grade to entire composition, unify color palette across all source images"
```

### Temperature Matching
```
"Adjust all elements to same color temperature (5500K neutral), remove any color casts"
```

### Palette Integration
```
"Harmonize colors - bring all elements into same color family, subtle desaturation for cohesion"
```

---

## Advanced Techniques

### Texture Matching
```
"Match image quality and texture across all elements - similar grain, sharpness, detail level"
```

### Edge Refinement
```
"Clean edge transitions between elements, natural feathering, no hard cutouts"
```

### Atmospheric Integration
```
"Add environmental effects to subject matching background - same lighting quality, color, mood"
```

---

## Common Blending Failures

### Failure 1: Mismatched Lighting

**Symptom**: Subject has different lighting than background
**Fix**: Explicitly specify lighting match in prompt
```
"Match subject lighting to background's window light (soft, from left)"
```

### Failure 2: Wrong Scale

**Symptom**: Subject too large or small for environment
**Fix**: Specify realistic proportions
```
"Scale person to realistic size - if standing should be ~70% of frame height"
```

### Failure 3: Pasted Appearance

**Symptom**: Subject looks cut-and-pasted, not integrated
**Fix**: Add integration cues
```
"Natural integration, realistic shadows on surface, lighting matches environment, photorealistic composition"
```

### Failure 4: Color Mismatch

**Symptom**: Different color temperatures visible
**Fix**: Unify color treatment
```
"Adjust all elements to same color temperature, unified color grade"
```

---

## Negative Prompts for Blending

**Essential negatives for multi-image compositions**:

```json
"negative_prompt": [
  "mismatched lighting, different lighting directions",
  "different color temperatures, color cast mismatch",
  "artificial composition, pasted appearance, cut-out look",
  "visible edges, halo around subject, green screen artifacts",
  "wrong scale, unrealistic proportions, size mismatch",
  "different image quality, resolution mismatch, grain mismatch",
  "perspective mismatch, different camera angles",
  "no shadows, floating objects, unrealistic physics",
  "inconsistent depth of field, focus mismatch",
  "color banding, compression artifacts at blend areas"
]
```

---

## Examples: Good vs Bad Prompts

### Bad (Vague):
```
"Put these images together"
```

### Good (Specific):
```
"Composite person from first image (foreground, center-right) into office from second image (background). Match lighting: soft window light from left. Add realistic shadow beneath person on desk. Natural integration, photorealistic."
```

---

### Bad (No Lighting):
```
"Person in office background"
```

### Good (Lighting Specified):
```
"Person from first image in office from second. Match office's cool window light (6000K, soft diffused from camera-left) to subject. Add subtle rim light on subject's right side from window."
```

---

### Bad (No Integration):
```
"Combine all three images"
```

### Good (Clear Integration):
```
"Layered composition: Cityscape from third image (background, soft blur), office interior from second image (midground, moderate focus), person from first image (foreground, sharp focus). Natural depth progression, atmospheric perspective, unified lighting."
```

---

## Testing & Iteration

### Generate Variations
```yaml
n: 3  # Get 3 different blend interpretations
# Pick best, refine with edit-image skill
```

### Multi-Turn Blending
```yaml
# Turn 1: Basic blend
Blend person + background

# Turn 2: Edit blend (refine integration)
Edit result to adjust lighting match

# Turn 3: Final polish
Edit to blur background slightly
```

---

## Blending Limitations

### What Blending CAN'T Do:
- ❌ Change source image content dramatically
- ❌ Generate new elements not in any input
- ❌ Fix poor quality source images
- ❌ Magically perfect mismatched perspectives

### What Blending CAN Do:
- ✅ Combine existing good images
- ✅ Create new compositions from sources
- ✅ Match lighting and colors
- ✅ Natural integration with realistic shadows

---

## Summary: Blending Keys

1. **Specify sources**: "from first image", "from second image"
2. **Positioning**: Where each element goes
3. **Lighting match**: Critical for realism
4. **Scale appropriately**: Realistic proportions
5. **Use negatives**: Prevent common failures
6. **Iterate**: Blend → edit → polish

---

**For real examples, see:** `usage-examples.md`
**For MCP parameters, see:** `mcp-tools-reference.md`
**For multi-image details, see:** `multi-image-composition.md`
