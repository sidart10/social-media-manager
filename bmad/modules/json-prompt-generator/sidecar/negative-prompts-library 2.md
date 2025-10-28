# Comprehensive Negative Prompts Library

**Shared Resource for All BMAD Content Generation**
**Purpose**: Prevent common AI generation failures across images, videos, and future modalities
**Version**: 1.0
**Date**: October 25, 2025

---

## 📚 USAGE

### How to Use This Library:

**1. Select Category** based on content type:

- Photorealistic Images → Use "Photorealistic" section
- Professional Content → Use "Professional/Diagrams" section
- Videos → Use "Video/Cinematic" section
- Combine categories as needed

**2. Customize** for specific use case:

- Add content-specific negatives (e.g., "wrong time period" for historical content)
- Platform-specific exclusions (e.g., "vertical format" if horizontal required)

**3. Minimum 10 Items** per prompt:

- Select from relevant categories
- Add 2-3 use-case-specific negatives

---

## 🎨 CATEGORY 1: PHOTOREALISTIC CONTENT

**Use For**: Fashion photography, portraits, product shots, lifestyle imagery

### Anatomical & Human Quality:

```
- wrong ethnicity, race drift from specification
- deformed anatomy, extra fingers, missing limbs, incorrect proportions
- extra hands, duplicate body parts, floating limbs
- plastic skin, waxy smoothing, porcelain-doll look, over-processed skin
- unnatural pose, twisted limbs, impossible anatomy
- missing facial features, distorted face structure
- wrong age, wrong gender from specification
```

### Photographic Quality:

```
- low quality, blurry, out of focus, soft details
- jpeg artifacts, compression banding, pixelation, noise
- overexposed, blown highlights, clipped whites, loss of detail
- underexposed, crushed shadows, black clipping
- chromatic aberration, purple fringing, rainbow halos
- vignetting (unless specified), heavy lens flare (unless specified)
- fish-eye distortion, barrel distortion, perspective warp
```

### Lighting & Exposure:

```
- harsh overhead lighting, unflattering shadows
- flat lighting, no dimension, lack of depth
- mixed color temperatures, color casts, yellow/green tint
- overlit, washed out, no contrast
- underlit, muddy shadows, lost details
```

### Style & Realism:

```
- cartoon, anime, illustration, CGI/3D render look
- painted, drawn, sketched, non-photographic
- video game graphics, digital art style
- unrealistic, fake-looking, artificial appearance
- stock photo aesthetic, generic, cliché
```

### Composition & Framing:

```
- tilted horizon, dutched angle (unless specified)
- poor framing, subject cut off, awkward crop
- cluttered background, distracting elements
- no negative space, cramped composition
- multiple subjects when one specified
```

### Wardrobe & Styling:

```
- wrong wardrobe, incorrect clothing from specification
- see-through fabric, transparent elements (unless specified)
- wardrobe malfunction, inappropriate exposure
- anachronistic clothing, wrong time period
- cheap materials, low-quality fabrics
```

---

## 📊 CATEGORY 2: PROFESSIONAL CONTENT (Diagrams, Carousels, Infographics)

**Use For**: LinkedIn carousels, presentations, diagrams, educational content

### Layout & Design:

```
- cluttered, overcrowded, busy layout, cramped spacing
- poor alignment, messy grid, broken layout system
- no breathing room, tight margins, insufficient padding
- inconsistent spacing, uneven gaps between elements
- overlapping elements, collision, visual chaos
```

### Typography & Text:

```
- small fonts, tiny text, illegible at normal viewing size
- poor hierarchy, all same size, flat typography
- low contrast text, hard to read against background
- spelling errors, typos, grammatical mistakes
- inconsistent fonts, too many font families
- Comic Sans, unprofessional fonts, decorative fonts
- poor kerning, bad letter-spacing, cramped text
```

### Color & Branding:

```
- bright colorful backgrounds, rainbow colors, neon
- low contrast, washed out, faded colors
- too many accent colors, color chaos
- off-brand palette, wrong colors for platform
- gradients (unless specified), patterns, busy backgrounds
- light backgrounds (if dark specified), white backgrounds
```

### Visual Elements:

```
- stock photos, generic clip-art, cheesy graphics
- realistic photography when diagrams needed
- decorative elements without function, ornamental clutter
- 3D rendered objects (unless specified), skeuomorphism
- heavy drop shadows, inner shadows, outer glows
- blur effects (unless specified), lens blur, motion blur
```

### Professional Standards:

```
- amateur design, unprofessional appearance
- inconsistent style, mixed aesthetics
- messy, unpolished, rough execution
- cartoonish, playful when serious tone needed
- hand-drawn, sketchy when clean lines needed
```

---

## 🎬 CATEGORY 3: VIDEO & CINEMATIC CONTENT

**Use For**: Video scenes, animations, cinematic sequences

### Technical Quality:

```
- low quality, blurry, pixelated, soft focus
- compression artifacts, banding, blocking, macro-blocking
- flickering, jittering, unstable footage
- rolling shutter, wobble, distortion
- aliasing, stair-stepping, jagged edges
```

### Temporal & Motion:

```
- stuttering, frame drops, inconsistent frame rate
- unnatural motion, robotic movement, puppet-like
- motion blur when sharp needed, sharp when blur needed
- speed inconsistency, time jumps, discontinuity
```

### Cinematic Quality:

```
- video game graphics, CGI look, rendered appearance
- green screen artifacts, bad compositing, visible edges
- cartoon, animated, non-photorealistic (unless specified)
- stock footage aesthetic, generic, cliché shots
```

### Lighting & Color:

```
- inconsistent lighting across shots, continuity errors
- color shift between frames, flickering colors
- oversaturated, neon, unrealistic colors
- desaturated when vibrant specified, vice versa
- harsh color grading, unnatural look
```

### Sequence & Consistency:

```
- inconsistent style across scenes, jarring differences
- poor transitions, hard cuts without motivation, jump cuts
- continuity errors, elements changing between shots
- resolution inconsistency, aspect ratio changes
- visual style breaks, look changes mid-sequence
```

### Content & Era:

```
- anachronisms, wrong time period elements
- modern elements in historical scenes
- future elements in current/past scenes
- wrong cultural context, incorrect geography
```

---

## 🖼️ CATEGORY 4: UNIVERSAL QUALITY (All Content Types)

**Use For**: Always include these in any generation

### AI Artifacts & Failures:

```
- AI artifacts, generation glitches, obvious AI tells
- warped objects, melted features, morphed elements
- floating objects, physics violations, impossible scenarios
- duplicate elements, cloning artifacts, stitching errors
- watermarks, logos, UI elements, unintended text
- metadata visible, EXIF overlay, camera settings shown
```

### Text & Overlays (Unless Specified):

```
- text overlays, captions, subtitles (unless explicitly requested)
- watermarks, branding, logos (unless yours)
- date stamps, camera data, technical overlays
- social media UI, app interface elements
```

### Quality Baselines:

```
- poor quality, low resolution, degraded
- amateur, unprofessional, sloppy execution
- inconsistent, messy, unpolished
- rushed, unfinished, incomplete
```

---

## 🔧 CATEGORY 5: USE-CASE-SPECIFIC NEGATIVES

### For Dark/Moody Aesthetics:

```
- bright lighting, cheerful, upbeat atmosphere
- pastel colors, light tones, washed out
- sunny, daytime, well-lit (if night/dark specified)
```

### For Clean/Minimal Aesthetics:

```
- busy, cluttered, overcrowded, ornate
- decorative elements, embellishments, flourishes
- texture overlays, patterns, visual noise
```

### For Historical/Period Content:

```
- modern technology, contemporary elements
- anachronisms, wrong era clothing/tools
- electric lights (if pre-electric era)
- clean/new items (if ancient/worn specified)
```

### For Tech/Futuristic Content:

```
- outdated technology, old computers, retro (unless specified)
- organic natural elements (if pure tech specified)
- warm cozy (if cold tech specified)
```

---

## 📖 EXAMPLES OF COMBINED NEGATIVES

### Example 1: Photorealistic Fashion Portrait

```json
"negative_prompt": [
  "wrong ethnicity, non-East Asian face drift",
  "deformed anatomy, extra fingers, warped clothing",
  "plastic skin, waxy smoothing, porcelain-doll look",
  "low quality, blurry, jpeg artifacts, banding",
  "overexposed snow, blown highlights, clipped whites",
  "cartoon, anime, CGI/3D render look",
  "text, watermark, logos, UI elements",
  "chromatic aberration, heavy lens flare, rainbow fringes",
  "dutched horizon, fisheye distortion, tilted frame",
  "orange sunset cast, heavy falling snow obscuring subject",
  "bulky armor, wings, sword, birds, extra props",
  "explicit nudity, see-through fabric, fetish posing"
]
```

**Source**: Photorealistic + Universal categories

---

### Example 2: Professional LinkedIn Carousel

```json
"negative_prompt": [
  "cluttered, overcrowded, busy layout, cramped spacing",
  "low contrast, washed out, faded colors",
  "small fonts, poor hierarchy, illegible text",
  "stock photos, cheesy graphics, clip-art",
  "3D rendered objects, drop shadows, glows, blur effects",
  "light backgrounds, bright colors, colorful gradients",
  "cartoons, illustrations, hand-drawn style",
  "amateur, unprofessional, messy, unaligned",
  "spelling errors, typos, grammatical mistakes",
  "decorative elements without function",
  "multiple accent colors, rainbow, oversaturated",
  "rounded corners everywhere, overly soft design"
]
```

**Source**: Professional Content + Universal categories

---

### Example 3: Cinematic Video Scene

```json
"negative_prompt": [
  "low quality, blurry, pixelated, compression artifacts",
  "cartoon, anime, illustration, CGI render, non-photorealistic",
  "inconsistent style across scenes, jarring visual differences",
  "text overlays, watermarks, logos, UI elements, subtitles",
  "deformed anatomy, extra fingers, missing limbs, wrong proportions",
  "plastic skin, waxy smoothing, over-processed appearance",
  "color banding, harsh transitions, oversaturation",
  "lens flares (unless specified), fish-eye, chromatic aberration",
  "duplicate subjects, cloning artifacts, stitching errors",
  "physics violations, floating objects, impossible scenarios",
  "poor transitions, hard cuts breaking flow",
  "anachronisms, wrong time period elements"
]
```

**Source**: Video/Cinematic + Universal categories

---

## 🎯 BEST PRACTICES

### Quantity:

- **Minimum**: 10 negative items
- **Recommended**: 12-15 items
- **Maximum**: 20 items (beyond this, diminishing returns)

### Specificity:

- Be specific: "plastic skin, waxy smoothing" > "bad skin"
- Use technical terms: "chromatic aberration" > "weird colors"
- Combine related: "low quality, blurry, pixelated" in one item

### Prioritize:

- Start with most likely failures for your content type
- Add content-specific items (time period, style, etc.)
- End with universal quality items

### Update:

- If generation fails with specific issue, add that negative
- Document what works, save with successful prompts
- Build library over time

---

**This library ensures consistent quality prevention across all BMAD content generation!** 🛡️

_Last updated: 2025-10-25_
