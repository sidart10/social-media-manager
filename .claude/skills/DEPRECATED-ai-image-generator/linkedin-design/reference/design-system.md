# LinkedIn Design System - Dark Monochrome Tech

**Complete visual specifications for professional LinkedIn content**

---

## 🎨 Color Palette

### Backgrounds
```
Primary: #0B0B0B (deep black)
Cards: #181818 (dark gray)
Borders: #2C2C2C (subtle gray lines)
```

### Text Colors
```
Primary: #FFFFFF (white)
Secondary: #D4D4D4 (light gray)
Tertiary: #A0A0A0 (medium gray)
Disabled: #666666 (darker gray)
```

### Accent Colors
```
Default: #4ADE80 (green)
Alternative 1: #60A5FA (blue)
Alternative 2: #FBBF24 (amber)
Warning: #EF4444 (red)
Success: #10B981 (green)
```

### Texture & Effects
```
Noise overlay: 3% opacity (subtle grain)
Gradient: Dark to darker (very subtle)
Vignette: Edge darkening (optional)
Shadows: None or very subtle (avoid drop shadows)
```

---

## ✍️ Typography

### Font Stack
```
Primary: Inter, -apple-system, system-ui, sans-serif
Monospace: SF Mono, Consolas, Monaco (for code)
```

### Font Weights
```
Light: 300 (primary choice - elegant, modern)
Regular: 400 (supporting text)
Medium: 500 (emphasis, buttons)
Bold: 700 (rare, critical emphasis only)
```

### Type Scale
```
Hero: 72pt (main titles, key messages)
H1: 56pt (section headings)
H2: 40pt (sub-sections)
H3: 28pt (sub-headings)
Body: 22pt (main content, descriptions)
Caption: 16pt (labels, attribution)
```

### Line Height
```
Headlines: 1.1-1.2 (tight, impactful)
Body: 1.5-1.6 (readable)
Captions: 1.4
```

### Letter Spacing
```
Headlines: -0.02em (slightly tighter)
Body: Normal (0)
All caps: +0.05em (looser for readability)
```

---

## 📐 Layout System

### Grid
```
Columns: 12-column grid
Gutter: 24px between columns
Margin: 96px horizontal, 72px vertical (top/bottom)
```

### Spacing Scale
```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
Use multiples of 8 for consistency
```

### Negative Space
```
Minimum: 35% of canvas
Optimal: 40-50%
Maximum: 60% (very minimal designs)
```

### Alignment
```
Text: Left-aligned (easier to read)
Titles: Center-aligned (optional)
Elements: Grid-aligned (12-column system)
```

---

## 🖼️ Image Specifications

### LinkedIn Feed Post
- **Ideal size**: 1536×1024px (high-res)
- **Aspect ratio**: 16:9 (desired), 3:2 (available from MCP)
- **Min size**: 1200×627px
- **File size**: < 10MB per image

### LinkedIn Carousel
- **Landscape**: 1536×1024px (recommended for professional diagrams)
- **Square**: 1024×1024px (also works well)
- **Slides**: 2-10 images (recommend 3-7 for engagement)
- **First slide**: CRITICAL - hooks users to swipe

---

## 🎯 Content Guidelines

### What Works on LinkedIn
✅ Professional, enterprise-grade appearance
✅ Data/statistics (perform well)
✅ Thought leadership content
✅ B2B messaging
✅ Educational content
✅ Clean, minimalist design
✅ High contrast (WCAG AAA)

### What to Avoid
❌ Overly promotional
❌ Low-quality images
❌ Cluttered designs
❌ Memes (usually inappropriate)
❌ Casual/unprofessional aesthetics
❌ Colorful backgrounds
❌ Gradients and drop shadows

---

## 🔧 Components

### Cards
```
Background: #181818
Border: 1px solid #2C2C2C
Border radius: 8-12px
Padding: 32-48px
Shadow: None or very subtle
```

### Icons
```
Style: Line icons (not filled)
Stroke width: 2px
Size: 24px or 32px
Color: #FFFFFF or accent color
```

### Buttons (if needed)
```
Primary: #4ADE80 background, #0B0B0B text
Secondary: Transparent background, #FFFFFF border
Height: 48px minimum
Padding: 16px horizontal
```

---

## ♿ Accessibility Standards

### WCAG AAA Compliance (Required)
```
Contrast ratio: ≥ 7:1 (text to background)
Text size: ≥ 22pt for body text
Color alone: Never sole indicator
Alt text: Always provided (125 char max)
```

### Mobile Optimization
```
Text legible at 375px width
Critical info in safe zones
No text smaller than 18pt
Touch targets 44×44px minimum
```

---

## 🎨 MCP Tool Selection for LinkedIn

**Recommended**: gpt-image-1 (OpenAI)

**Why:**
- Professional quality (9.5/10 photorealism)
- Superior text rendering (critical for diagrams/labels)
- Complex compositions
- Enterprise-grade output

**Parameters:**
```yaml
provider: gpt-image-1
size: "1536x1024"  # Landscape carousel
quality: "high"
output_format: "png"
```

---

## 📝 Prompt Template for LinkedIn

```
Professional LinkedIn [carousel slide / post] with dark monochrome tech aesthetic.

Background: Deep black (#0B0B0B), solid color, no gradients
Text: White (#FFFFFF) for headings, light gray (#D4D4D4) for body
Typography: Inter font, weight 300
Layout: 12-column grid, 96px margins, generous spacing
Negative space: 40-50% of canvas
Accent color: Green (#4ADE80) for highlights/connections

Content: [specific content for this slide/post]
Visual elements: [diagrams, icons, charts - minimal and clean]

Style: Minimalist, professional, enterprise-grade, high contrast (WCAG AAA 7:1)
Quality: Sharp, crisp, no artifacts
Size: 1536×1024px

Avoid: Cluttered layouts, gradients, drop shadows, light backgrounds, colorful, decorative elements, amateur appearance
```

---

**For content strategy and captions, see:** `content-strategy.md`
**For carousel optimization, see:** `carousel-best-practices.md`
