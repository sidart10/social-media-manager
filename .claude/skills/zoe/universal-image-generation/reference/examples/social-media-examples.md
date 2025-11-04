# Create Image - Usage Examples

**Real-world scenarios showing complete create-image skill workflow**

---

## Example 1: LinkedIn Professional Carousel

**User Request:** "Create LinkedIn carousel about AI agent architecture, 5 slides, dark professional aesthetic"

**Skill Workflow:**

### Step 1: Load JSON Template
```bash
Read: bmad/modules/json-prompt-generator/templates/video-scene.json
Adapt for: Static image generation (remove motion sections)
```

### Step 2: Populate Slide 1 JSON
```json
{
  "scene_description": {
    "environment": "Dark minimalist background, professional tech aesthetic",
    "mood": "Professional, authoritative, clean",
    "platform": "LinkedIn carousel slide 1 of 5"
  },

  "subject_and_content": {
    "subject_type": "Text graphic with minimal diagram",
    "main_subject": "Title card - 'AI Agent Architecture'",
    "supporting_elements": "Subtle tech icon, minimal geometric shapes",
    "visual_hierarchy": "Large title → subtitle → minimal visual",
    "focal_point": "Title text, upper-center"
  },

  "composition_and_framing": {
    "aspect_ratio": "16:9",
    "resolution": "1536x1024",
    "layout_system": "12-column grid",
    "rule_of_thirds": "Title on upper third intersection",
    "negative_space": "45% (generous breathing room)",
    "alignment": "Center-aligned title, balanced",
    "margins": "96px horizontal, 72px top"
  },

  "lighting_design": {
    "lighting_style": "High-key for clarity and professionalism",
    "contrast_ratio": "7:1 (WCAG AAA compliance)",
    "mood": "Clean, professional, enterprise-grade"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#0B0B0B", "#FFFFFF", "#D4D4D4", "#4ADE80"],
      "color_names": ["deep black", "white", "light gray", "green accent"],
      "palette_type": "monochrome with accent"
    },
    "color_grading": {
      "grade_style": "High contrast monochrome tech",
      "contrast": "High (WCAG AAA 7:1 minimum)",
      "saturation": "Desaturated base, saturated accent only"
    },
    "texture_effects": {
      "grain": "None or subtle noise overlay 0.03 opacity",
      "vignette": "None"
    }
  },

  "typography": {
    "font_family": "Inter, sans-serif",
    "type_scale": {
      "hero": "72pt (main title)",
      "subheading": "28pt"
    },
    "weights": {
      "primary": 300,
      "emphasis": 500
    },
    "line_height": "1.1 for title",
    "text_color": "#FFFFFF primary, #D4D4D4 secondary",
    "text_treatment": "Clean, no shadows, high contrast"
  },

  "technical_output": {
    "size": "1536x1024",
    "quality": "high",
    "output_format": "png",
    "intended_platform": "LinkedIn"
  },

  "negative_prompt": [
    "cluttered, busy layout, overcrowded, cramped spacing",
    "low contrast, washed out, faded colors, poor visibility",
    "small fonts, tiny text, poor hierarchy, illegible",
    "stock photos, cheesy graphics, clip-art, generic",
    "3D rendered, drop shadows, glows, blur effects",
    "light backgrounds, bright colors, colorful gradients",
    "cartoons, illustrations, hand-drawn, anime",
    "amateur, unprofessional, messy, unpolished",
    "decorative elements, ornamental, unnecessary flourishes",
    "multiple accent colors, rainbow, oversaturated",
    "rounded corners everywhere, overly soft design",
    "spelling errors, typos, poor text rendering"
  ]
}
```

### Step 3: Tool Selection
```
Analysis:
- Platform: LinkedIn (professional)
- Has text: Yes (title card)
- Quality: Critical (professional)
- Use case: New generation

Decision: gpt-image-1 (OpenAI)
Reason: LinkedIn + text rendering + professional quality
```

### Step 4: Generate
```yaml
mcp__gpt-image-1__create_image:
  prompt: "Professional LinkedIn carousel slide with dark monochrome tech aesthetic. Deep black background (#0B0B0B, solid color, no gradients). Large white heading 'AI Agent Architecture' in Inter font, weight 300, 72pt, centered in upper third. Light gray subheading 'The Complete System' in 28pt below. Minimal abstract tech icon in lower third, green accent (#4ADE80). 12-column grid layout with 96px horizontal margins. 45% negative space for clean, uncluttered look. High contrast (WCAG AAA 7:1 ratio). Professional, minimal, enterprise-grade quality. No drop shadows, no gradients, no decorative elements. Sharp, crisp rendering."
  size: "1536x1024"
  quality: "high"
  output_format: "png"
  n: 1
```

### Step 5: Quality Evaluation
```
7-Pillar Scores:
- Clarity: 9 (title instantly clear)
- Technical Quality: 9 (crisp, no artifacts)
- Composition: 9 (clean grid, good spacing)
- Color Accuracy: 10 (exact hex match)
- Typography: 9 (Inter font, good hierarchy)
- Professionalism: 10 (enterprise-grade)
- Prompt Accuracy: 9 (all elements present)

Overall: 9.3/10 → EXCEPTIONAL
```

### Step 6: Save
```bash
File: outputs/linkedin-ai-agents/slide1.png
Metadata: outputs/linkedin-ai-agents/slide1_metadata.json
Quality: 9.3/10 (exceptional)
```

**Result**: Professional LinkedIn slide ready to post!

---

## Example 2: Instagram Creative Post (Volume)

**User Request:** "Create 10 Instagram posts about productivity, vibrant aesthetic, budget-conscious"

**Skill Workflow:**

### Step 1: Analyze Requirements
```
Count: 10 images
Platform: Instagram
Style: Vibrant, creative
Budget: High priority (volume)
Quality: Good (not enterprise-critical)
```

### Step 2: Tool Selection
```
Analysis:
- Volume: 10 images
- Platform: Instagram (creative acceptable)
- Budget: High priority
- Speed: Matters for iteration

Decision: nanobanana (Gemini)
Reason: 10 × $0.039 = $0.39 vs higher OpenAI cost
Speed for rapid iteration
```

### Step 3: Populate JSON (Simplified for social)
```json
{
  "scene_description": {
    "environment": "Vibrant gradient background, modern design",
    "mood": "Inspiring, motivational, energetic"
  },

  "subject_and_content": {
    "subject_type": "Quote graphic",
    "main_subject": "Productivity tip text",
    "style": "Bold, eye-catching, Instagram-worthy"
  },

  "composition_and_framing": {
    "aspect_ratio": "1:1",
    "resolution": "1024x1024",
    "layout": "Centered text, rule of thirds"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#FF6B6B", "#FFB4A2", "#FFFFFF"],
      "color_names": ["coral", "peach", "white"]
    },
    "grading": "Vibrant, saturated, Instagram aesthetic"
  },

  "typography": {
    "font_family": "Montserrat, bold",
    "hero": "48pt",
    "text_color": "#FFFFFF with shadow for readability"
  },

  "negative_prompt": [
    "cluttered, busy, overcrowded design",
    "low contrast, washed out, faded",
    "dark backgrounds, monochrome, boring",
    "small text, poor hierarchy",
    "professional corporate aesthetic",
    "amateur, low quality, pixelated",
    "text-heavy, wall of text",
    "cartoons, illustrations (unless stylized well)",
    "stock photos, generic, cliché",
    "horizontal format, landscape"
  ]
}
```

### Step 4: Generate with Variation
```yaml
# Generate Post 1
mcp__nanobanana__generate_image:
  prompt: "Instagram square post with vibrant coral-to-peach gradient background (#FF6B6B to #FFB4A2). Bold white text 'Start Before You're Ready' in Montserrat font, 48pt, centered. Clean, modern, motivational quote aesthetic. High contrast, mobile-optimized, thumb-stopping visual, Instagram-worthy."
  mode: "generate"
  negative_prompt: "cluttered, low contrast, dark backgrounds, small text, professional corporate, text-heavy, cartoons, stock photos, horizontal format"
  n: 2  # Generate 2 variations, pick best
```

**Repeat for posts 2-10 with different tips and color variations**

### Step 5: Quality Check (Faster for social)
```
For social media (not client work):
- Score ≥ 6 acceptable
- Focus on: Clarity, Visual appeal, Mobile-readability
- Speed over perfection
```

### Result
```
10 Instagram posts generated
Time: ~5 minutes total
Cost: $0.39 (with n=2 for variations = $0.78)
Quality: 7-8/10 average (good for social)
```

**Outcome**: Week of Instagram content, cost-effective, engaging

---

## Example 3: Photorealistic Product Shot

**User Request:** "Create hero image for product launch - premium coffee maker"

**Skill Workflow:**

### Step 1: Load JSON (Photorealistic)
```json
{
  "scene_description": {
    "environment": "Minimalist kitchen counter, natural morning light through window",
    "mood": "Premium, aspirational, lifestyle",
    "time_period": "Modern, contemporary"
  },

  "subject_and_content": {
    "subject_type": "Product photography",
    "main_subject": "Stainless steel coffee maker, premium design",
    "supporting_elements": "Coffee cup with steam, coffee beans scattered",
    "focal_point": "Coffee maker, center-right third"
  },

  "composition_and_framing": {
    "aspect_ratio": "3:2",
    "resolution": "1536x1024",
    "rule_of_thirds": "Product on right intersection, negative space left",
    "negative_space": "40% on left for text overlay or clean look",
    "depth_planes": {
      "foreground": "Coffee beans slightly blurred",
      "midground": "Coffee maker sharp focus",
      "background": "Kitchen soft blur, f/2.8"
    }
  },

  "lighting_design": {
    "lighting_style": "Natural window light with subtle fill",
    "key_light": {
      "source": "Window (natural daylight, 5500K)",
      "position": "Camera-left, 90-degree side angle",
      "quality": "Soft diffused through sheer curtain"
    },
    "fill_light": "White bounce card camera-right (subtle, -2 stops)",
    "mood": "Clean, bright, premium, aspirational"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#FFFFFF", "#C0C0C0", "#4A3428", "#1A1A1A"],
      "color_names": ["bright white", "stainless steel", "coffee brown", "deep black coffee"]
    },
    "grading": "Natural, bright, high-key with rich blacks",
    "saturation": "Natural, slight boost on coffee warmth (+10%)"
  },

  "camera_simulation": {
    "camera": "Canon EOS R5 (full-frame, 45MP)",
    "lens": {
      "type": "85mm f/1.2L",
      "focal_length_mm": 85,
      "aperture_f": 2.8,
      "depth_of_field": "Shallow - product sharp, background soft"
    },
    "settings": {
      "iso": 400,
      "shutter_speed": "1/200s",
      "white_balance_k": 5500,
      "focus_mode": "Single-point AF on product logo"
    }
  },

  "negative_prompt": [
    "low quality, blurry, out of focus, soft details",
    "harsh lighting, direct flash, overexposed",
    "cluttered background, messy, disorganized",
    "stock photo aesthetic, generic, cliché",
    "plastic appearance, cheap materials, low-end",
    "flat lighting, no depth, lack of dimension",
    "oversaturated colors, unrealistic, artificial",
    "poor composition, centered, boring framing",
    "dirty, stained, worn product appearance",
    "watermarks, logos (except product branding)",
    "cartoon, illustration, non-photographic",
    "compression artifacts, banding, noise"
  ]
}
```

### Step 2: Tool Selection
```
Analysis:
- Use case: Product photography (photorealistic)
- Stakes: HIGH (product launch)
- Need: Photorealism 9.5/10
- Text: None (product speaks for itself)

Decision: gpt-image-1 (OpenAI)
Reason: Best photorealism for hero product shot
```

### Step 3: Generate
```yaml
mcp__gpt-image-1__create_image:
  prompt: "Premium coffee maker product photography on minimalist kitchen counter with natural morning window light. Stainless steel coffee maker with premium design positioned on right third of frame. Coffee cup with rising steam and scattered coffee beans as supporting elements. Shot on Canon R5 with 85mm f/1.2L lens at f/2.8 for shallow depth of field (product sharp, background soft bokeh). Natural window light from camera-left creating soft diffused illumination (5500K daylight). Subtle white bounce card fill from camera-right. Clean bright white background, high-key lighting. Rich coffee brown tones and deep black coffee. Natural color grading with slight warmth boost on coffee (+10% saturation). Photorealistic, detailed textures, professional product photography quality. 40% negative space on left. Composition follows rule of thirds."
  size: "1536x1024"
  quality: "high"
  output_format: "png"
  n: 2  # Get 2 variations for client choice
```

### Step 4: Quality Evaluation
```
7-Pillar Scores:
- Clarity: 9 (product instantly clear)
- Technical Quality: 10 (flawless photorealism)
- Composition: 9 (rule of thirds, good balance)
- Color Accuracy: 9 (natural, premium look)
- Typography: N/A (no text)
- Professionalism: 10 (client-ready)
- Prompt Accuracy: 9 (all elements present)

Overall: 9.3/10 → EXCEPTIONAL
```

**Result**: Hero product image, client approved, used for launch campaign

---

## Example 2: Quick Instagram Story

**User Request:** "Make an Instagram story saying 'New video dropping tomorrow' - need it in 2 minutes"

**Skill Workflow:**

### Step 1: Simplified JSON (Speed Mode)
```json
{
  "scene_description": {
    "environment": "Bold gradient background",
    "mood": "Exciting, anticipation, hype"
  },

  "subject_and_content": {
    "subject_type": "Text announcement",
    "main_subject": "Text: 'New Video Dropping Tomorrow'",
    "style": "Bold, eye-catching, Instagram story"
  },

  "composition_and_framing": {
    "aspect_ratio": "9:16",
    "resolution": "1024x1536",
    "layout": "Centered text, safe zones top/bottom 250px"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#FF006E", "#00B4D8", "#FFFFFF"],
      "color_names": ["neon pink", "electric blue", "white"]
    },
    "grading": "Vibrant, high-energy, saturated"
  },

  "typography": {
    "font_family": "Bold sans-serif",
    "hero": "64pt all caps",
    "text_color": "#FFFFFF with shadow"
  },

  "negative_prompt": [
    "boring, plain, low energy",
    "small text, hard to read",
    "professional corporate aesthetic",
    "cluttered, busy",
    "low contrast, faded",
    "horizontal format, landscape",
    "complex design, slow to understand"
  ]
}
```

### Step 2: Tool Selection
```
Analysis:
- Speed: CRITICAL (need in 2 minutes)
- Platform: Instagram Story (creative acceptable)
- Quality: Good enough (not client work)
- Text: Simple text (not complex)

Decision: nanobanana (Gemini)
Reason: SPEED - generate in seconds vs 90s with OpenAI
```

### Step 3: Generate
```yaml
mcp__nanobanana__generate_image:
  prompt: "Instagram story vertical design (9:16 format). Bold gradient background from neon pink (#FF006E) at top to electric blue (#00B4D8) at bottom. Large white text 'NEW VIDEO' at top (64pt, bold, all caps), 'DROPPING TOMORROW' below (64pt). Centered layout with safe zones (avoid top/bottom 250px). High contrast white text with subtle shadow for readability. Vibrant, high-energy, eye-catching, Instagram-worthy. Mobile-optimized."
  mode: "generate"
  negative_prompt: "boring, plain, small text, professional corporate, cluttered, low contrast, horizontal, complex"
  n: 1
```

**Generation time**: ~20 seconds
**Cost**: $0.039

### Step 4: Quick Quality Check
```
Score: 7/10 (good for story, text readable, eye-catching)
Ship it! Stories are ephemeral (24hr), speed > perfection
```

**Result**: Story posted in 2 minutes, mission accomplished!

---

## Example 3: Data Visualization

**User Request:** "Create data viz showing 'AI adoption grew 45% in 2025' for LinkedIn"

**Skill Workflow:**

### Step 1: JSON (Data-Focused)
```json
{
  "scene_description": {
    "environment": "Clean data visualization background",
    "mood": "Professional, credible, data-driven"
  },

  "subject_and_content": {
    "subject_type": "Data visualization with text",
    "main_subject": "Large statistic: '45%'",
    "supporting_elements": "Context text, simple chart/graph, source citation",
    "visual_hierarchy": "Huge stat → Context → Chart → Source"
  },

  "composition_and_framing": {
    "aspect_ratio": "16:9",
    "resolution": "1536x1024",
    "layout": "Left: Large stat, Right: Simple line chart",
    "negative_space": "40%"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#0B0B0B", "#FFFFFF", "#4ADE80"],
      "color_names": ["black", "white", "green"]
    },
    "grading": "High contrast for clarity"
  },

  "typography": {
    "hero": "144pt (the 45% stat)",
    "heading": "32pt (context)",
    "body": "20pt (chart labels)",
    "caption": "16pt (source)"
  },

  "negative_prompt": [
    "complex charts, 3D graphs, confusing data viz",
    "low contrast, hard to read numbers",
    "small fonts, illegible at mobile size",
    "cluttered, too much data, overwhelming",
    "bright colors, rainbows, decorative",
    "amateur, Excel-style charts",
    "no source citation, uncredited data",
    "cartoon, illustrated, non-professional"
  ]
}
```

### Step 2: Tool Selection
```
Decision: gpt-image-1
Reason: Text accuracy critical for data (45%, labels)
LinkedIn professional quality expected
```

### Step 3: Generate
```yaml
mcp__gpt-image-1__create_image:
  prompt: "LinkedIn data visualization with dark background (#0B0B0B). Left side: Massive white '45%' statistic in 144pt bold font. Below: 'AI Adoption Growth in 2025' in 32pt. Right side: Simple clean line chart showing upward trend in green (#4ADE80). Bottom-right: Source citation 'Source: Gartner Research 2025' in 16pt gray (#D4D4D4). High contrast (WCAG AAA), professional data visualization, clean layout, minimal design, enterprise-grade quality."
  size: "1536x1024"
  quality: "high"
  output_format: "png"
```

### Result
```
Quality: 9/10 (data clear, professional, credible)
Engagement: High (LinkedIn loves data)
```

---

## Example 4: Photorealistic Portrait (Fashion)

**User Request:** "Fashion portrait in snow, editorial quality, dark aesthetic with gold accents"

**Skill Workflow:**

### Step 1: Load Emily's Exact Template
```bash
Reference: docs/emily_prompts_QUALITY_ONLY.csv
Example: "Glacial Couture" prompt (Prompt #1)
This is Emily's proven photorealistic methodology!
```

### Step 2: Use Emily's Complete JSON
```json
{
  "scene_description": {
    "environment": "Snow-covered glacial clearing framed by tall pines",
    "mood": "Cool cyan shadows with warm metallic accents",
    "weather_atmosphere": "Crisp winter air, readable footprints",
    "sensory_details": "High contrast without clipped highlights"
  },

  "subject_and_action": {
    "identity": "Adult East Asian female, editorial look",
    "build": "Slender, toned",
    "hair": {
      "color": "Jet-black",
      "style": "Long, slightly windswept"
    },
    "face_styling": {
      "brows": "Soft frost effect (subtle)",
      "eyes": "Whisper of magenta inner-rim, satin finish",
      "skin_fx": "Cool frost glaze along cheek planes, pores intact"
    },
    "pose": "3/4 body, rear three-quarters over-shoulder glance"
  },

  "styling": {
    "concept": "Avant-garde winter couture",
    "outerwear": "Voluminous black Mongolian faux-fur stole",
    "jewelry": "Medium-weight gold chain from temple to hand",
    "palette_notes": "True blacks vs icy whites with gold accents"
  },

  "camera": {
    "system": "Canon EOS R5, 45MP, 14-bit RAW",
    "lens": "RF 85mm f/1.2L at f/3.5",
    "settings": {
      "focal_length": 85,
      "aperture": 3.5,
      "shutter": "1/1250s",
      "iso": 100,
      "white_balance": 5600,
      "filters": ["Circular polarizer"]
    }
  },

  "lighting_design": {
    "lighting_style": "Natural winter sun with negative fill",
    "key_light": "Sun camera-right to sculpt jaw",
    "fill_light": "Negative fill (black flag) for dramatic contrast",
    "mood": "Cool, editorial, high-fashion"
  },

  "color_and_grade": {
    "color_palette": {
      "hex_codes": ["#FFFFFF", "#0B0B0B", "#FFD700", "#00CED1"],
      "color_names": ["icy white snow", "true black", "gold", "cyan shadow"]
    },
    "grading": "Cool cyan shadows, neutral mids, selective saturation on gold only",
    "grain": "Fine subtle grain for tactile feel"
  },

  "negative_prompt": [
    "wrong ethnicity, non-East Asian face drift",
    "deformed anatomy, extra fingers, incorrect proportions",
    "plastic skin, waxy smoothing, porcelain-doll look",
    "low quality, blurry, jpeg artifacts, banding",
    "overexposed snow, blown highlights, clipped whites",
    "cartoon, anime, CGI/3D render look",
    "text, watermarks, logos, UI elements",
    "chromatic aberration, rainbow fringes",
    "dutched horizon, tilted frame",
    "explicit content, inappropriate exposure",
    "bulky armor, wings, extra props",
    "orange sunset cast, heavy falling snow obscuring"
  ]
}
```

### Step 2: Tool Selection
```
Decision: gpt-image-1
Reason: Photorealism 9.5/10 required
Editorial quality critical
Complex composition with many details
```

### Step 3: Generate with Full Details
```yaml
mcp__gpt-image-1__create_image:
  prompt: "{Full conversion of JSON above - all details preserved}"
  size: "1024x1536"  # Vertical portrait
  quality: "high"
  output_format: "png"
  n: 1
```

### Step 4: Quality Evaluation
```
7-Pillar Scores:
- Clarity: 9 (subject clear, beautiful)
- Technical Quality: 9 (near-perfect photorealism)
- Composition: 10 (editorial-quality framing)
- Color Accuracy: 9 (cool/warm balance excellent)
- Typography: N/A
- Professionalism: 10 (portfolio-worthy)
- Prompt Accuracy: 8 (most details present, minor pose variation)

Overall: 9.2/10 → EXCEPTIONAL
```

**Result**: Editorial-quality fashion portrait, Emily-approved methodology!

---

## Example 5: Multi-Variation Testing

**User Request:** "Not sure what style works best - generate a few options for Twitter post"

**Skill Workflow:**

### Step 1: Create 3 Style Variations in JSON

**Variation A: Bold & Minimal**
```json
{
  "color_palette": ["#000000", "#FFFFFF"],
  "style": "High contrast black/white, bold text"
}
```

**Variation B: Vibrant & Eye-Catching**
```json
{
  "color_palette": ["#FF006E", "#00B4D8", "#FFFFFF"],
  "style": "Neon pink/blue gradient, energetic"
}
```

**Variation C: Professional Tech**
```json
{
  "color_palette": ["#0B0B0B", "#1DA1F2", "#FFFFFF"],
  "style": "Dark with Twitter blue, professional"
}
```

### Step 2: Tool Selection
```
Decision: nanobanana
Reason: Need 3 variations quickly for testing
Cost: 3 × $0.039 = $0.117
Speed: Rapid iteration
```

### Step 3: Generate All Variations
```yaml
# Variation A
mcp__nanobanana__generate_image:
  prompt: "Twitter post quote graphic, high-contrast black background (#000000), bold white text 'The future is built by those who start today', centered, 56pt bold sans-serif, minimal design"
  n: 1

# Variation B
mcp__nanobanana__generate_image:
  prompt: "Twitter post with vibrant gradient background (neon pink #FF006E to electric blue #00B4D8), same quote in white, energetic, eye-catching"
  n: 1

# Variation C
mcp__nanobanana__generate_image:
  prompt: "Twitter post with dark tech background (#0B0B0B), same quote in white, Twitter blue accent (#1DA1F2) border, professional tech aesthetic"
  n: 1
```

### Step 4: User Picks Winner
```
User: "Variation C! The Twitter blue makes it pop"
```

### Step 5: Upgrade Winner (Optional)
```
Regenerate Variation C with gpt-image-1 for final quality:
- Higher photorealism
- Better text rendering
- Client-ready quality
```

**Result**: Tested 3 styles in minutes, found winner, upgraded for final

---

## Summary: Usage Patterns

| Scenario | Tool | JSON Detail | Speed | Example |
|----------|------|-------------|-------|---------|
| **LinkedIn Professional** | gpt-image-1 | Full (10+ sections) | Standard | Example 1 |
| **Instagram Volume** | nanobanana | Simplified | Fast | Example 2 |
| **Photorealistic Hero** | gpt-image-1 | Emily's complete | Standard | Example 3 |
| **Product Photography** | gpt-image-1 | Full camera sim | Standard | Example 3 |
| **Quick Testing** | nanobanana | Minimal | Very fast | Example 5 |
| **Multi-Variation** | nanobanana | Moderate | Fast | Example 5 |

---

**For Emily's complete methodology, see:** `emily-json-methodology.md`
**For MCP tool details, see:** `mcp-tools-reference.md`
**For tool selection logic, see:** `tool-selection.md`
