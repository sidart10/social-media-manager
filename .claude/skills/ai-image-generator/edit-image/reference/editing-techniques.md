# Image Editing Techniques

**Common editing operations using nanobanana's pixel-perfect capabilities**

---

## Core Editing Techniques

### 1. Background Blur (Depth of Field Effect)

**Use Case**: Focus attention on subject by blurring background

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Blur background significantly using strong gaussian blur, equivalent to f/1.4 depth of field effect, while keeping main subject completely sharp and in perfect focus. Create strong visual separation between subject and background."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Subtle blur: "f/2.8 equivalent, gentle bokeh"
- Strong blur: "f/1.2 equivalent, heavy bokeh, subject isolation"
- Selective blur: "Blur only left side of background"

---

### 2. Color Correction

**Use Case**: Fix color issues, adjust white balance, enhance vibrancy

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Adjust white balance to neutral (5500K), remove yellow color cast, make colors more natural and balanced. Preserve skin tones, enhance overall color accuracy."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- **Warm up**: "Add warm golden hour glow (+300K warmth)"
- **Cool down**: "Add cool blue tone (-300K, crisp morning feel)"
- **Desaturate**: "Reduce saturation by 30%, muted aesthetic"
- **Boost vibrance**: "Increase saturation by 20%, vibrant social media look"

---

### 3. Remove Objects

**Use Case**: Clean up unwanted elements, remove distractions

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Remove the coffee cup from the bottom-left corner. Fill the area naturally matching the desk texture and lighting. Seamless removal with no visible edits."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Remove person: "Remove person in background, extend environment naturally"
- Remove watermark: "Remove watermark/logo from top-right, clean fill"
- Remove blemishes: "Remove skin blemishes, maintain natural texture"

---

### 4. Add Elements

**Use Case**: Insert new objects or elements into scene

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Add a small green plant in ceramic pot on the left side of the desk. Match lighting and shadows from existing scene. Natural integration, photorealistic rendering."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Add text overlay: "Add white text 'NEW' in top-right corner"
- Add logo: "Add company logo (subtle, bottom-right, 10% opacity)"
- Add accent: "Add green accent line along left edge"

---

### 5. Enhance / Sharpen

**Use Case**: Improve image quality, increase sharpness, enhance details

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Enhance overall sharpness and clarity. Increase edge definition, boost micro-contrast for detail pop. Maintain natural look, no over-sharpening artifacts."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Selective sharpen: "Sharpen subject only, keep background as-is"
- Enhance contrast: "Increase global contrast by 15%, richer blacks"
- Detail enhancement: "Enhance fine details and textures"

---

### 6. Lighting Adjustments

**Use Case**: Fix exposure, adjust brightness, relight scene

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Brighten overall image by 20%, recover shadow detail in dark areas while protecting highlights. Natural brightness increase, maintain mood."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Darken: "Reduce brightness by 15%, moodier atmosphere"
- Fix shadows: "Lift shadows, reveal detail in dark areas"
- Protect highlights: "Reduce bright areas, prevent blown highlights"

---

### 7. Style Transfer / Aesthetic Change

**Use Case**: Change visual style while keeping composition

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Apply dark monochrome tech aesthetic: convert to deep black background (#0B0B0B), white text (#FFFFFF), high contrast, minimal design. Maintain all content and layout, change only colors and style."
  mode: "edit"
  input_image_path_1: "/path/to/colorful-image.png"
```

**Variations**:
- Add film grain: "Add heavy 35mm film grain texture"
- Monochrome conversion: "Convert to black and white, high contrast"
- Vintage look: "Apply vintage aesthetic (sepia tones, grain, vignette)"

---

### 8. Crop / Reframe

**Use Case**: Change composition, adjust framing, fix aspect ratio

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Crop to focus on upper body and face, remove bottom third of image. Tighten composition, subject fills frame more. Maintain image quality and sharpness."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Extend canvas: "Add 200px white space on right for text area"
- Center subject: "Reframe with subject perfectly centered"
- Aspect ratio change: "Convert from 16:9 to 1:1 square, crop intelligently"

---

### 9. Text Correction

**Use Case**: Fix typos, change text, update copy

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Change the text 'Comming Soon' to 'Coming Soon' (fix spelling). Match existing font, size, color, and placement exactly. Seamless correction."
  mode: "edit"
  input_image_path_1: "/path/to/image.png"
```

**Variations**:
- Update text: "Change 'Version 1.0' to 'Version 2.0'"
- Remove text: "Remove all text from image, clean fill"
- Reposition text: "Move headline from top to center"

---

### 10. Quality Touch-Ups

**Use Case**: Final polish, small corrections, professional finish

**Technique**:
```yaml
mcp__nanobanana__generate_image:
  prompt: "Apply professional polish: slight contrast boost (+10%), subtle vignette on edges, enhance sharpness on subject, reduce noise in shadow areas. Subtle improvements for final quality."
  mode: "edit"
  input_image_path_1: "/path/to/good-image.png"
```

---

## Multi-Turn Editing (Iterative Refinement)

**Nanobanana's Unique Capability**: Build edits conversationally

### Example: LinkedIn Post Refinement

**Turn 1: Blur Background**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Blur background with f/2.8 depth of field"
  mode: "edit"
  input_image_path_1: "original.png"
# Result: background_blurred.png
```

**Turn 2: Enhance Subject**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Sharpen main subject, increase contrast on subject by 15%"
  mode: "edit"
  input_image_path_1: "background_blurred.png"
# Result: subject_enhanced.png
```

**Turn 3: Final Polish**
```yaml
mcp__nanobanana__generate_image:
  prompt: "Add subtle vignette, slight warmth (+100K), final professional polish"
  mode: "edit"
  input_image_path_1: "subject_enhanced.png"
# Result: final_polished.png
```

**Result**: Professional image built through 3 targeted edits

---

## Editing vs Regenerating Decision Matrix

| Situation | Action | Why |
|-----------|--------|-----|
| Minor color adjustment | **Edit** | Targeted, preserves everything else |
| Background blur needed | **Edit** | Nanobanana specialty |
| Wrong composition | **Regenerate** | Edit won't fix fundamental framing |
| Typo in text | **Edit** (if simple) | Quick fix |
| Complete style change | **Regenerate** | Too many changes for editing |
| Remove small object | **Edit** | Clean removal, natural fill |
| Add new major element | **Regenerate** | Better composition from scratch |
| Quality touch-ups | **Edit** | Polish existing good image |
| Wrong subject entirely | **Regenerate** | Need different base image |
| Lighting adjustment | **Edit** | Relight without regenerating |

---

## Best Practices

### 1. Be Specific
❌ "Make it look better"
✅ "Increase contrast by 15%, sharpen subject, reduce background noise"

### 2. Preserve Intent
Always mention what to KEEP:
✅ "...while keeping subject sharp"
✅ "...preserve skin texture"
✅ "...maintain original composition"

### 3. One Change at a Time (for precision)
- Turn 1: Blur background
- Turn 2: Color correct
- Turn 3: Final sharpen

Better control than "blur background AND color correct AND sharpen" in one edit

### 4. Save Versions
- original.png (always keep)
- v2_background_blur.png
- v3_color_corrected.png
- final.png

Easy rollback if needed!

---

**For detailed editing scenarios, see:** `usage-examples.md`
**For nanobanana capabilities, see:** `nanobanana-editing.md`
**For MCP tool parameters, see:** `mcp-tools-reference.md`
**For edit vs regenerate logic, see:** `when-to-edit-vs-regenerate.md`
