# Best Practices Framework - AI Image Generation

**Based on Emily's Quality Prompts + Professional Content Standards**

This framework ensures consistent, high-quality output across all image generation use cases: photorealistic, professional content, and image editing.

---

## 📐 Core Principles (Universal)

### 1. **JSON-First Approach**

- ✅ ALL prompts must be structured as comprehensive JSON
- ✅ Minimum 10 major sections per prompt
- ✅ No ambiguity - every detail explicitly specified
- ✅ Template-driven workflow (load → populate → generate)

### 2. **Negative Prompts Are Mandatory**

- ✅ Minimum 10 negative prompt items
- ✅ Cover common AI failures (artifacts, anatomical errors, quality issues)
- ✅ Platform-specific exclusions
- ✅ Style-specific exclusions

### 3. **Technical Precision**

- ✅ Exact dimensions specified (e.g., 1080x1080px, not "square")
- ✅ Color values as hex codes (e.g., #1A73E8, not "blue")
- ✅ Typography with exact specs (font, size, weight, spacing)
- ✅ Quality parameters explicit (resolution, DPI, color space)

### 4. **Iterative Refinement**

- ✅ Generate → Critique → Refine workflow
- ✅ Use 7-pillar quality benchmark system
- ✅ Document issues and corrections
- ✅ Save successful prompts as templates

### 5. **Provider Intelligence**

- ✅ Select provider based on use case (see MCP_CAPABILITIES.md)
- ✅ OpenAI for photorealism and complex compositions
- ✅ Gemini for editing and iterative refinement
- ✅ Fallback logic if primary fails

---

## 🎨 SECTION A: Photorealistic Generation (Emily's Approach)

**Use Cases:** Fashion, portraits, product photography, lifestyle imagery

### A1. **Scene Construction**

**Environment Setup:**

```json
"scene": {
  "environment": "Specific location with sensory details - not just 'outdoors' but 'Snow-covered glacial clearing framed by tall pines; crisp winter air; readable footprints leading to subject.'",
  "mood_grade": "Precise color temperature and contrast - 'Cool cyan shadows with restrained warm metallic accents; high contrast without clipped highlights.'"
}
```

**Key Principles:**

- Use sensory language (crisp, tactile, luminous)
- Specify lighting conditions precisely
- Include environmental context (background, foreground)
- Define mood through color temperature

### A2. **Subject Definition**

**Comprehensive Subject Spec:**

```json
"subject": {
  "identity": "adult East Asian female idol (editorial look)",
  "build": "slender, toned (ectomorphic)",
  "hair": {
    "color": "jet-black",
    "style": "long, slightly windswept"
  },
  "grooming_style": "idol-grade luminous skin, precise grooming, glossy natural lips",
  "face_styling": {
    "brows": "soft frost/bleached effect (subtle, not theatrical)",
    "eyes": "whisper of magenta inner-rim, satin finish",
    "skin_fx": "cool frost glaze along cheek planes; pores intact"
  },
  "pose": "3/4 body, rear three-quarters over-shoulder glance; hip gently popped; left hand near lips holding a single gold chain; right foot slightly lifted showing boot tread."
}
```

**Key Principles:**

- Exact ethnicity/age/gender if relevant
- Body type with reference terms (ectomorphic, athletic, etc.)
- Grooming level (natural, polished, editorial)
- Skin treatment (texture intact, not smoothed)
- Pose with anatomical specificity (which hand, which foot, angles)

### A3. **Styling & Wardrobe**

**Detailed Styling Spec:**

```json
"styling": {
  "concept": "Avant-garde winter couture with restrained ornament.",
  "outerwear": "voluminous black Mongolian faux-fur stole wrapped on shoulders (matte, deep black).",
  "top": "extremely cropped black shrug integrated with opera gloves (non-sheer).",
  "bottom": "high-cut black editorial bikini bottom, matte, tasteful coverage.",
  "legs_and_footwear": "tall faux-fur leg warmers with pom-pom ties over heavy black winter boots; deep sole texture visible.",
  "jewelry": "one medium-weight gold chain draped from temple across cheek to hand (no biting); minimal additional chains tucked under fur.",
  "micro_accent": "slim crimson enamel clasp/buckle with fine silver filigree (single piece only).",
  "hand_fx": "right glove/hand finished with cracked gold leaf for tactile highlight.",
  "palette_notes": "true blacks (fur/boots) vs icy whites (snow/skin) with selective warm gold and a single crimson micro-accent."
}
```

**Key Principles:**

- Material specificity (matte vs glossy, leather vs fabric)
- Texture descriptions (cracked, voluminous, tactile)
- Color relationships (complementary, split, analogous)
- Restraint (one accent, not multiple)
- Fit and coverage details

### A4. **Camera & Technical Settings**

**Professional Camera Spec (Emily's Standard):**

```json
"camera": {
  "system": "Canon EOS R5 (full-frame, 45MP) – 14-bit RAW",
  "lens": "RF 85mm f/1.2L (use at f/3.5 for crisp separation)",
  "focal_length_mm": 85,
  "aperture_f": 3.5,
  "shutter_s": "1/1250",
  "iso": 100,
  "white_balance_k": 5600,
  "color_space": "AdobeRGB",
  "file_format": "RAW (CR3)",
  "focus_mode": "Eye-AF, single point on near eye",
  "metering_mode": "Spot on skin",
  "exposure_comp_ev": "+0.7",
  "stabilization": "IBIS on; lens IS off",
  "filters": ["Circular polarizer"],
  "notes": "ETTR snow without clipping; check CPL rotation each angle."
}
```

**Key Principles:**

- Full-frame equivalents (85mm for portraits, 35mm for environmental)
- Aperture for depth control (f/1.2-f/5.6 range)
- ISO appropriate to lighting (100 bright, 400-800 indoor, 1600+ low light)
- White balance in Kelvin for precision
- Exposure compensation for tricky lighting

### A5. **Composition & Framing**

**Composition Spec:**

```json
"composition": {
  "orientation": "vertical 9:16",
  "shot_type": "3/4 body environmental portrait (one frame only).",
  "framing": "subject on right third; low horizon; vertical pines as clean columns; negative space behind head.",
  "lighting": "natural winter sun with negative fill camera-right to sculpt jaw; circular polarizer to control snow glare; optional 1/8 Black Pro-Mist for gentle halation on metals."
}
```

**Key Principles:**

- Rule of thirds (subject placement)
- Horizon line position (low for sky, high for ground)
- Negative space (breathing room, visual rest)
- Leading lines (guide eye to subject)
- Depth layers (foreground, mid, background)

### A6. **Post-Processing**

**Post-Processing Spec:**

```json
"post_processing": {
  "raw_dev": "Neutral profile; highlight recovery; contrast via custom tone curve (avoid clarity overshoot).",
  "local": "micro-dodge eyes, chain edges, gold-leaf cracks; preserve skin texture; protect true blacks.",
  "grade": "cool cyan shadows, neutral mids, selective saturation only on gold and the single crimson clasp.",
  "grain": "fine, subtle for tactile feel"
}
```

**Key Principles:**

- Highlight/shadow recovery (not blown or crushed)
- Selective adjustments (not global slider pushing)
- Skin texture preservation (no wax/smoothing)
- Film grain for realism (subtle, not noisy)

### A7. **Negative Prompts (Photorealistic)**

**Emily's Standard Negatives:**

```json
"negative_prompt": [
  "wrong ethnicity, non–East Asian face drift",
  "multi-frame, collage, split screen, second angle, macro insert",
  "low quality, blurry, jpeg artifacts, halos, banding",
  "overexposed snow, blown highlights, clipped whites, crushed shadows",
  "plastic skin, waxy smoothing, porcelain-doll look",
  "deformed anatomy, extra fingers, warped clothing, distorted face",
  "text, watermark, logos, UI elements",
  "cartoon, anime, CGI/3D render look",
  "bulky armor, wings, sword, birds, extra props",
  "explicit nudity, see-through fabric, fetish posing, wardrobe malfunction",
  "chromatic aberration, heavy lens flare, rainbow fringes, weird bokeh shapes",
  "dutched horizon, fisheye distortion, tilted frame",
  "orange sunset cast; heavy falling snow/fog obscuring subject"
]
```

---

## 📊 SECTION B: Professional Content (Adapted from Emily)

**Use Cases:** LinkedIn carousels, diagrams, infographics, tutorial guides

### B1. **Content Structure**

**Professional Content Spec:**

```json
"content_structure": {
  "title": "Main headline (5-10 words max)",
  "subtitle": "Supporting context (10-15 words max)",
  "sections": [
    {
      "slide_number": 1,
      "header": "Section title",
      "body_text": ["Point 1", "Point 2", "Point 3"],
      "visual_elements": ["icon", "diagram", "chart"],
      "call_to_action": "Next step or engagement prompt"
    }
  ],
  "hierarchy": "F-pattern | Z-pattern | Center-focal"
}
```

**Key Principles:**

- Text brevity (max 30 words per slide)
- Clear hierarchy (H1 > H2 > Body)
- Visual-first (diagrams > text walls)
- Actionable (CTA on every slide or last slide)

### B2. **Typography Standards**

**Professional Typography Spec:**

```json
"typography": {
  "heading_font": "Inter Bold | Helvetica Neue Bold | Roboto Bold",
  "body_font": "Inter Regular | Open Sans | Roboto Regular",
  "size_hierarchy": "H1:48-64px, H2:32-42px, Body:18-24px",
  "line_height": "1.2 for headings, 1.5 for body",
  "letter_spacing": "-0.02em for large headings, 0em for body",
  "max_words_per_slide": 30,
  "contrast_ratio": "WCAG AAA (7:1 minimum)",
  "mobile_minimum": "16px body text"
}
```

**Key Principles:**

- Sans-serif for digital (Inter, Roboto, Open Sans)
- Size hierarchy minimum 8px difference between levels
- Line height for readability (1.5 for body)
- Contrast for accessibility (WCAG AAA = 7:1)

### B3. **Color Theory for Branding**

**Professional Color Palette:**

```json
"color_palette": {
  "primary": "#1A73E8",
  "secondary": "#34A853",
  "accent": "#FBBC04",
  "background": "#FFFFFF",
  "text_primary": "#202124",
  "text_secondary": "#5F6368",
  "palette_type": "complementary | analogous | triadic | monochromatic",
  "notes": "60-30-10 rule: 60% background, 30% primary, 10% accent"
}
```

**Key Principles:**

- 60-30-10 color distribution (dominant, secondary, accent)
- Platform alignment (LinkedIn blue, Twitter blue, etc.)
- Accessibility (text colors pass WCAG on backgrounds)
- Consistency (same palette across entire carousel)

### B4. **Diagram Design Principles**

**Diagram Spec:**

```json
"diagram_specs": {
  "diagram_type": "flowchart | architecture | mindmap | timeline | comparison",
  "node_style": "rounded rectangles | circles | hexagons",
  "node_size": "center=240x120px, satellites=180x90px",
  "connector_style": "solid arrows | dashed lines | curved paths",
  "connector_width": "3px",
  "labeling": "clear, concise, max 3 words per label",
  "color_coding": {
    "semantic": true,
    "rules": "green=success, red=error, blue=process, yellow=warning"
  },
  "spacing": "60px minimum between nodes",
  "alignment": "use invisible grid for precision"
}
```

**Key Principles:**

- Simple > Complex (max 5-7 nodes per diagram)
- Semantic color coding (consistent meanings)
- Clear connectors (direction, flow)
- White space (60px+ between elements)

### B5. **Composition for Professional Content**

**Professional Composition:**

```json
"composition": {
  "orientation": "square (1:1) | portrait (4:5)",
  "layout_system": "12-column grid | centered | asymmetric",
  "margins": "80px all sides for breathing room",
  "white_space_ratio": "40% minimum",
  "focal_hierarchy": "F-pattern | Z-pattern | Center-focal",
  "alignment": "left for text-heavy | center for diagrams",
  "visual_flow": "Top-to-bottom, left-to-right (Western)"
}
```

**Key Principles:**

- Grid system (12-column for flexibility)
- Generous margins (80px minimum)
- White space ratio (40%+ empty space)
- Visual flow (natural reading patterns)

### B6. **Readability Standards**

**Readability Checklist:**

```json
"readability_standards": {
  "contrast_ratio": "WCAG AAA (7:1 minimum)",
  "font_minimum": "18px for body text, 16px absolute minimum",
  "line_length": "45-75 characters max per line",
  "text_on_image": "use semi-transparent overlay (opacity 70%) or solid background box",
  "mobile_test": "legible on 375px width screen",
  "scan_time": "key message extractable in <3 seconds"
}
```

**Key Principles:**

- 3-second rule (main point understood quickly)
- Mobile-first (most viewers on phone)
- High contrast (dark text on light, or vice versa)
- Limited text (30 words max per visual)

### B7. **Negative Prompts (Professional Content)**

**Professional Content Negatives:**

```json
"negative_prompt": [
  "cluttered, overcrowded, too much text, cramped layout",
  "low contrast, illegible text, tiny fonts under 16px",
  "generic stock photos, cheesy clip-art, unprofessional icons",
  "inconsistent fonts, random colors, off-brand palette",
  "spelling errors, grammatical mistakes, typos",
  "pixelated, blurry, jpeg artifacts, compression artifacts",
  "3D rendered text, heavy drop shadows, gaudy gradients",
  "misaligned elements, broken grid, poor spacing, uneven margins",
  "busy backgrounds, distracting patterns, visual noise",
  "amateurish, messy, unpolished, low-quality design",
  "wrong aspect ratio, incorrect dimensions",
  "cartoon style, comic book, illustration (when diagrams needed)",
  "realistic photos when diagrams needed",
  "decorative elements that don't serve function"
]
```

---

## 🔧 SECTION C: Image Editing (New)

**Use Cases:** Transform existing images, remove objects, style transfer, enhancement

### C1. **Input Image Preparation**

**Pre-Editing Checklist:**

```json
"input_preparation": {
  "file_format": "PNG or JPEG, under 4MB for OpenAI, under 20MB for Gemini",
  "resolution": "minimum 512x512px, ideally 1024x1024px+",
  "quality": "no heavy compression, minimal artifacts",
  "subject_clarity": "clear subject, good lighting, not too blurry",
  "background_separation": "subject distinguishable from background",
  "notes": "Higher quality input = better editing results"
}
```

**Key Principles:**

- Clean input (garbage in = garbage out)
- Adequate resolution (upscale if needed first)
- Subject clarity (editing requires clear boundaries)

### C2. **Editing Prompt Structure**

**Image Editing Spec:**

```json
"image_editing": {
  "edit_type": "inpainting | outpainting | style_transfer | enhancement",
  "target_area": "Describe what to edit: 'Remove the person on the left', 'Blur the background', 'Change shirt color to blue'",
  "preserve_area": "Describe what to keep: 'Keep the subject's face unchanged', 'Maintain original lighting'",
  "style_direction": "If style transfer: 'Make it look like oil painting', 'Convert to professional studio portrait'",
  "quality_preservation": "Maintain original image quality, no degradation",
  "blend_instructions": "Seamless blend, natural transition, no harsh edges"
}
```

**Key Principles:**

- Clear target (what to change)
- Clear preservation (what to keep)
- Blending emphasis (seamless, natural)
- Quality maintenance (no degradation)

### C3. **Provider Selection for Editing**

**Editing Provider Logic:**

```
IF edit is MINOR (blur background, remove small object, color correction):
  → Use Gemini Nanobanana (pixel-perfect editing)

IF edit is MAJOR (large object removal, full style transfer):
  → Use OpenAI gpt-image-1 (full image recreation acceptable)

IF iterative refinement needed:
  → Use Gemini Nanobanana (multi-turn editing)
```

### C4. **Quality Preservation**

**Editing Quality Checklist:**

```json
"quality_preservation": {
  "resolution_match": "Output resolution = input resolution (or higher)",
  "no_compression": "PNG format to avoid JPEG artifacts",
  "color_accuracy": "Preserve original color space and profile",
  "texture_consistency": "No smoothing or plastic look",
  "edge_quality": "Clean edges, no halos or fringes",
  "lighting_consistency": "Match original lighting direction and quality"
}
```

**Key Principles:**

- Resolution maintained or improved
- No quality loss from compression
- Texture and detail preserved
- Natural transitions at edit boundaries

### C5. **Iterative Editing Workflow**

**Multi-Turn Editing (Gemini Specialty):**

```
Step 1: Upload original image
Step 2: Make first edit (e.g., "Blur background")
Step 3: Review result
Step 4: Refine (e.g., "Increase blur strength")
Step 5: Add second edit (e.g., "Brighten subject's face")
Step 6: Final review
```

**Key Principles:**

- One change at a time (easier to control)
- Review between edits (catch issues early)
- Build complexity gradually (don't overcomplicate prompt)

### C6. **Negative Prompts (Editing)**

**Editing-Specific Negatives:**

```json
"negative_prompt": [
  "degraded quality, lower resolution than original",
  "compression artifacts, JPEG banding, pixelation",
  "plastic skin, over-smoothed textures, wax-like appearance",
  "harsh edges, halos, color fringing at edit boundaries",
  "inconsistent lighting, mismatched shadows",
  "obvious edits, fake-looking, poorly blended",
  "color shift, wrong color space, desaturated",
  "blurry, soft focus where should be sharp",
  "extra artifacts, duplicate elements, glitches",
  "style inconsistency (e.g., photo + cartoon mix)"
]
```

---

## 🎯 7-Pillar Quality Benchmark System

**Rate EVERY generated image on these 7 pillars (1-10 scale):**

### 1. **Clarity** (1-10)

- Message/subject understood in <3 seconds
- No ambiguity
- Clear focal point

### 2. **Technical Quality** (1-10)

- Resolution appropriate
- No artifacts, banding, compression issues
- Sharp where intended, properly blurred where intended

### 3. **Composition** (1-10)

- Rule of thirds respected (or intentionally broken)
- Visual balance
- Effective use of negative space
- Clean hierarchy

### 4. **Color Accuracy** (1-10)

- Matches specified palette
- WCAG contrast standards met
- Harmonious color relationships
- No unexpected color casts

### 5. **Typography/Text** (1-10)

- Legible at intended viewing size
- Proper hierarchy
- No spelling errors
- Appropriate font choices

### 6. **Professionalism** (1-10)

- Enterprise-grade appearance
- No amateur elements (clip-art, Comic Sans, etc.)
- Consistent style
- Platform-appropriate

### 7. **Accuracy to Prompt** (1-10)

- All specified elements present
- Details match instructions
- Style matches description
- No hallucinated elements

**Overall Score:** Average of 7 pillars

- **9-10:** Exceptional, publish immediately
- **7-8:** Good, minor tweaks may improve
- **5-6:** Acceptable, needs refinement
- **Below 5:** Regenerate with revised prompt

---

## 📋 Workflow Integration

### Standard Generation Workflow:

```
1. Load appropriate JSON template
2. Populate with user requirements
3. Validate completeness (all sections filled)
4. Select provider (based on use case)
5. Generate image(s)
6. Run 7-pillar critique
7. If score < 7: Refine prompt and regenerate
8. If score >= 7: Deliver with metadata
9. Save successful prompt as template
```

### Iterative Refinement Workflow:

```
1. Generate initial image
2. Critique (7-pillar scoring)
3. Document failure points
4. Update prompt (add specificity to weak areas)
5. Regenerate
6. Re-critique
7. Repeat until score >= 8
8. Save final prompt as "refined template"
```

---

## 🚀 Implementation Checklist

**For Every Generation Request:**

- [ ] JSON template loaded
- [ ] All required sections populated
- [ ] Negative prompts included (minimum 10 items)
- [ ] Provider selected (based on use case)
- [ ] Technical specs explicit (dimensions, colors, typography)
- [ ] Quality standards defined
- [ ] Generate
- [ ] Run 7-pillar critique
- [ ] Refine if needed
- [ ] Save metadata with results
- [ ] Update template library with learnings

---

**This framework ensures Emily's quality standards are maintained across ALL use cases - photorealistic, professional content, and image editing.** 🎯

_Last updated: 2025-10-25_
