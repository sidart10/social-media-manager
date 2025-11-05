# YouTube Thumbnail Specifications

**Official YouTube requirements and technical specifications**

---

## 📐 Official Requirements

### Size & Dimensions

```
Recommended: 1280×720px (16:9 aspect ratio)
Minimum width: 640px
Aspect ratio: 16:9 (standard YouTube player)
File size: Under 2MB (hard limit)
Formats: JPG, PNG, GIF, BMP
```

### MCP Tool Mapping

**CRITICAL: nanobanana (Gemini) does NOT support fixed dimensions!**

```
YouTube wants: 1280×720px (16:9 landscape)

nanobanana behavior:
- Auto-determines aspect ratio from prompt content
- Sees "portrait/face" → generates portrait (9:16)
- Sees "landscape/widescreen" → generates landscape (16:9)
- NO size parameter control!

gpt-image-1 behavior:
- Supports fixed sizes: 1024x1024, 1024x1536, 1536x1024
- 1536×1024 = closest to YouTube 16:9
- Respects size parameter exactly
```

**Solution for YouTube Thumbnails:**

**Option A: Use nanobanana with explicit aspect ratio in prompt**

- Must say: "16:9 widescreen landscape horizontal layout"
- Must describe horizontal composition
- Works 90% of time but not guaranteed

**Option B: Use gpt-image-1 with fixed size**

- Guaranteed 1536×1024 (16:9)
- Can't do Mode B (no multi-image input)
- Better for text accuracy

**Recommendation**:

- **Mode A (no user face)**: gpt-image-1 with size="1536x1024"
- **Mode B (with user face)**: nanobanana + explicit landscape prompt

---

## 🎯 Display Contexts

### Where Thumbnails Appear

**Desktop:**

- Search results: 246×138px
- Suggested videos: 168×94px
- Home feed: 360×202px

**Mobile:**

- Feed: 156×88px ⚠️ SMALLEST (design for this!)
- Search: 168×94px
- Suggested: 168×94px

**Critical**: If thumbnail looks good at 156×88px (mobile), it works everywhere!

---

## 🚫 Safe Zones

### Avoid These Areas

**Bottom-right corner**: Video duration badge (e.g., "12:45")

- Keep critical elements away from this area
- Badge is ~60px wide, ~30px tall

**Top-right**: Can have UI elements on hover

- Don't put critical text here

**Edges**: Platform UI can overlap

- Keep important content 20px from edges

**Safe Zone**: Center 80% of thumbnail

---

## 🎨 Format Recommendations

### JPG vs PNG

**Use JPG when:**

- Photographic content (faces, scenes)
- File size matters (JPG compresses better)
- No transparency needed
- Most common choice

**Use PNG when:**

- Text-heavy design (crisp text rendering)
- Need transparency (rare for thumbnails)
- Want highest quality (larger file size)
- Graphic design elements

**Recommendation**: JPG with high quality (90-95%) for best balance

---

## 📱 Mobile-First Design

### Critical Rule

**Design for 156×88px first!**

If thumbnail works at mobile preview size, it works everywhere. Most YouTube traffic is mobile.

### Mobile Checklist

- [ ] Text readable at 156×88px
- [ ] Face visible and expressive
- [ ] Main subject identifiable
- [ ] Colors stand out in feed
- [ ] Not cluttered or busy

---

## 🔍 Testing Guidelines

### Before Publishing

**Test 1: Thumbnail Preview**

- Resize to 156×88px
- Is text readable?
- Is subject clear?
- Does it stand out?

**Test 2: Feed Context**

- View among other thumbnails
- Does yours grab attention?
- Is it distinct?

**Test 3: Multiple Devices**

- Check on phone (primary)
- Check on desktop
- Check on tablet

---

## ⚠️ YouTube Restrictions

### What NOT to Include

❌ Misleading content (clickbait that lies)
❌ Sexually suggestive imagery
❌ Violent or graphic content
❌ Hateful imagery or symbols
❌ False play buttons or UI elements
❌ Excessive text (YouTube prefers visual-first)

### What YouTube Prefers

✅ Authentic representation of video content
✅ Clear, readable text (if used)
✅ Faces (especially expressive ones)
✅ High quality, professional appearance
✅ Brand consistency

---

## 📊 Performance Factors

### What Affects CTR (Click-Through Rate)

**High Impact:**

1. Faces with clear emotion (40% better CTR)
2. Bold text (3-7 words, large font)
3. High contrast colors
4. Curiosity gap (intrigue without spoiling)
5. Consistent branding (builds trust)

**Medium Impact:**

- Vibrant colors (stands out in feed)
- Visual storytelling
- Action/movement in image
- Recognizable style

**Low Impact:**

- Fancy effects (can distract)
- Too much text (hard to read)
- Generic stock imagery

---

## 🎨 Technical Quality

### Resolution

- Upload highest quality available (within 2MB)
- YouTube compresses automatically
- Start with 1536×1024 or higher
- Sharp, crisp, professional

### Color Space

- sRGB color space (web standard)
- High saturation works well
- High contrast (readability)
- Vibrant but not oversaturated

### Compression

- Balance quality vs file size
- Target: 200KB-500KB (fast loading)
- Max: 2MB (YouTube limit)
- Quality: 90-95% JPG compression

---

## 📏 Dimension Edge Cases

### Vertical Videos (Shorts)

- Shorts use 9:16 aspect ratio
- Thumbnail still 16:9 (standard)
- Design accordingly

### Old Videos

- Can update thumbnails anytime
- Refreshing thumbnails can boost old content
- A/B test different designs

---

## 🔧 MCP Tool Parameters for YouTube

### CRITICAL PROMPT REQUIREMENTS

**For Correct Aspect Ratio (16:9 landscape):**

- Must explicitly say: "16:9 widescreen landscape horizontal layout"
- Must describe horizontal composition: "left side, right side"
- Avoid portrait language: "top to bottom", "vertical"

**For Accurate Text Rendering:**

- Must explicitly specify exact text: 'Text must read exactly "YOUR EXACT TITLE"'
- Don't rely on topic description alone
- Use quotes around exact text wanted

### Using nanobanana (Mode B - With User Face)

**ONLY use nanobanana when compositing user's image!**

**Mode B - With User Image (CORRECTED):**

```yaml
mcp__nanobanana__generate_image:
  prompt: "16:9 widescreen landscape horizontal YouTube thumbnail layout. Person from first image with [emotion] positioned on LEFT THIRD. Bold white text reading exactly 'YOUR EXACT TITLE' on RIGHT SIDE with black stroke. Vibrant background, high contrast, eye-catching, professional YouTube aesthetic, horizontal composition."
  mode: 'generate'
  input_image_path_1: '/path/to/user/image.jpg'
  negative_prompt: 'portrait orientation, vertical layout, 9:16 aspect ratio, small text, low contrast, mismatched lighting, boring background, wrong text, different wording'
```

**Key changes from old guidance:**

- ✅ Added "16:9 widescreen landscape horizontal layout"
- ✅ Added 'Text reading exactly "YOUR EXACT TITLE"'
- ✅ Specified "LEFT THIRD" and "RIGHT SIDE" for horizontal composition
- ✅ Added negative prompts for portrait/vertical
- ✅ More explicit spatial instructions

### Using gpt-image-1 (Mode A - No User Face)

**RECOMMENDED for Mode A (no face needed):**

```yaml
mcp__gpt-image-1__create_image:
  prompt: "YouTube thumbnail with bold white text reading exactly 'YOUR EXACT TITLE' in large impact font with black outline. Vibrant orange-blue gradient background, high contrast tech aesthetic, professional YouTube style. 16:9 landscape composition."
  size: '1536x1024'
  quality: 'high'
  output_format: 'png'
```

**Advantages of gpt-image-1 for Mode A:**

- ✅ Guaranteed 1536×1024 (16:9) - no aspect ratio issues
- ✅ Better text accuracy and rendering
- ✅ Cleaner, more professional results
- ✅ No composition ambiguity

**Limitation:**

- ❌ Can't do Mode B (no multi-image input support)

---

## 🎯 Tool Selection (UPDATED GUIDANCE)

**Decision Tree:**

### Mode B (With Your Face) → nanobanana ONLY

**Why:**

- ✅ ONLY tool supporting multi-image input (can composite your face)
- ✅ Cost-effective ($0.039/thumbnail)
- ✅ Fast generation
- ⚠️ Requires explicit landscape prompting
- ⚠️ Requires explicit text instructions
- ⚠️ Less reliable aspect ratio control

**Best practices for nanobanana:**

- Start prompt with "16:9 widescreen landscape horizontal layout"
- Use explicit spatial terms: "LEFT THIRD", "RIGHT SIDE"
- Specify exact text: 'reading exactly "YOUR TITLE"'
- Add negative prompts: "portrait orientation, vertical layout, 9:16"

### Mode A (No Face) → gpt-image-1 RECOMMENDED

**Why:**

- ✅ Guaranteed 1536×1024 (perfect 16:9)
- ✅ Better text accuracy
- ✅ More professional, cleaner results
- ✅ Predictable output
- ✅ No aspect ratio issues
- ❌ Can't composite user images

**When to use gpt-image-1:**

- Text-heavy thumbnails
- Complex text requirements
- Need guaranteed 16:9
- Professional/corporate thumbnails
- Mode A (no face needed)

**Recommendation:**

- **Mode A**: Use gpt-image-1 (better results, guaranteed dimensions)
- **Mode B**: Use nanobanana (only option for face composition)

---

**For design best practices, see:** `design-best-practices.md`
**For creation mode details, see:** `creation-modes.md`
**For prompt templates, see:** `prompt-templates.md`
