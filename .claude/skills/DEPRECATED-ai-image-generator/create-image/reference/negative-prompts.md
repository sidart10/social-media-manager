# Negative Prompts Library

**Source**: `bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md`

This file references Emily's comprehensive negative prompts library for preventing AI generation failures.

---

## 📚 Quick Reference

**Minimum 10 negative items per prompt** (mandatory)

### Categories:

1. **Photorealistic Content** - For fashion, portraits, products
2. **Professional Content** - For diagrams, carousels, infographics
3. **Video/Cinematic** - For video frames, animations
4. **Universal Quality** - Always include these

---

## Quick Selection Guide

### For LinkedIn Professional Content
```
Use categories: Professional + Universal

Example negatives (10+):
- cluttered, overcrowded, busy layout, cramped spacing
- low contrast, washed out, faded colors
- small fonts, poor hierarchy, illegible text
- stock photos, cheesy graphics, clip-art
- 3D rendered objects, drop shadows, glows
- light backgrounds, bright colors, gradients
- cartoons, illustrations, hand-drawn
- amateur, unprofessional, messy
- spelling errors, typos
- decorative elements without function
```

### For Instagram Creative Content
```
Use categories: Universal + Custom

Example negatives (10+):
- boring, plain, low energy, dull
- dark backgrounds, monochrome (unless specified)
- small text, text-heavy, wall of text
- professional corporate aesthetic (too stiff)
- low quality, blurry, pixelated
- horizontal format (Instagram prefers square/vertical)
- cluttered, busy, overcrowded
- amateur, low quality
- stock photos, generic, cliché
- poor mobile optimization
```

### For Photorealistic Images
```
Use categories: Photorealistic + Universal

Example negatives (10+):
- deformed anatomy, extra fingers, missing limbs
- plastic skin, waxy smoothing, porcelain-doll look
- low quality, blurry, jpeg artifacts, banding
- overexposed, blown highlights, clipped whites
- cartoon, anime, CGI/3D render look
- chromatic aberration, rainbow fringes
- wrong ethnicity (if specified)
- text, watermarks, logos, UI elements
- physics violations, impossible scenarios
- fish-eye distortion, lens aberration
```

---

## Category Breakdown

### 1. Photorealistic Content (10 items)
```
- wrong ethnicity, race drift from specification
- deformed anatomy, extra fingers, missing limbs
- plastic skin, waxy smoothing, over-processed
- low quality, blurry, jpeg artifacts
- overexposed highlights, underexposed shadows
- cartoon, anime, CGI/3D render look
- chromatic aberration, lens aberration
- text overlays, watermarks, logos
- physics violations, floating objects
- fish-eye distortion, perspective warp
```

### 2. Professional Content (12 items)
```
- cluttered, overcrowded, busy layout
- low contrast, washed out, faded
- small fonts, poor hierarchy, illegible
- stock photos, cheesy graphics, clip-art
- 3D rendered, drop shadows, glows, blur effects
- light backgrounds, bright colors, gradients
- cartoons, illustrations, hand-drawn
- amateur, unprofessional, messy
- spelling errors, typos, grammatical mistakes
- decorative elements without function
- multiple accent colors, rainbow, oversaturated
- rounded corners everywhere, overly soft
```

### 3. Universal Quality (8 items)
```
- AI artifacts, generation glitches, obvious AI tells
- warped objects, melted features, morphed elements
- floating objects, physics violations
- duplicate elements, cloning artifacts
- watermarks, logos, UI elements (unless yours)
- poor quality, low resolution, degraded
- amateur, unprofessional, sloppy
- inconsistent, messy, unpolished
```

---

## 🎯 Usage in JSON

```json
{
  "negative_prompt": [
    "Select 10+ items from appropriate categories above",
    "Add 2-3 use-case-specific items",
    "Example: wrong time period (for historical)",
    "Example: vertical format (if horizontal needed)",
    "Combine related items: low quality, blurry, pixelated"
  ]
}
```

---

## Platform-Specific Additions

### Add for LinkedIn:
```
- casual aesthetic, unprofessional tone
- memes, humor (usually inappropriate)
- low-quality, amateur design
```

### Add for Instagram:
```
- boring, plain, low energy
- professional corporate (too stiff)
- text-heavy, wall of text
- horizontal format (prefers square/vertical)
```

### Add for Twitter:
```
- complex, hard to comprehend quickly
- subtle, nuanced (need bold/clear)
- lengthy explanations
```

---

## Best Practices

**1. Quantity**: 10-15 items (sweet spot)
**2. Specificity**: "plastic skin, waxy smoothing" > "bad skin"
**3. Combinations**: Group related issues
**4. Priority**: Most likely failures first
**5. Evolution**: Add items as you discover issues

---

**For complete library with all categories, see:**
`bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md`

**This ensures consistent quality prevention across all image generation!** 🛡️
