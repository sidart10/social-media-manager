# LinkedIn Platform Specifications

**Complete specifications for LinkedIn image generation**

---

## Image Size Requirements

### Feed Posts
- **Ideal size**: 1200×627px (official recommendation)
- **High-res**: 1536×1024px (better quality)
- **MCP size**: `1536x1024` (closest match, 3:2 ratio)
- **Aspect ratio**: 16:9 (desired), 3:2 (available)
- **Min size**: 1200×627px
- **Max size**: 7680×4320px (8K)
- **File size**: < 10MB per image

### Carousel Posts
- **Ideal size**: 1080×1080px (square) OR 1200×1200px
- **Landscape**: 1536×1024px (for professional diagrams)
- **MCP size**: `1024x1024` (square) OR `1536x1024` (landscape)
- **Slides**: 2-10 images (recommend 3-7 for engagement)
- **First slide**: CRITICAL - hooks users to swipe

### Article Header Images
- **Ideal size**: 1200×627px
- **Aspect ratio**: 16:9
- **MCP size**: `1536x1024`
- **Use case**: Blog posts, articles, newsletters

### Company Page Cover
- **Ideal size**: 1128×191px (wide banner)
- **Aspect ratio**: ~6:1
- **Note**: Too wide for standard MCP generation
- **Workaround**: Generate at 1536×1024, crop in post-processing

---

## Design Aesthetic: Dark Monochrome Tech

### Color Palette

**Background:**
- Primary: `#0B0B0B` (deep black)
- Cards: `#181818` (dark gray)
- Borders: `#2C2C2C` (subtle gray)

**Text:**
- Primary: `#FFFFFF` (white)
- Secondary: `#D4D4D4` (light gray)
- Tertiary: `#A0A0A0` (medium gray)

**Accent Colors:**
- Default: `#4ADE80` (green)
- Alternative: `#60A5FA` (blue)
- Warning: `#FBBF24` (amber)
- Custom: Project-specific

**Texture:**
- Subtle noise overlay: 0.03 opacity
- Gradient overlays: Dark to darker
- Vignette: Subtle edge darkening

### Typography

**Font Family:**
- Primary: Inter, sans-serif
- Fallback: System UI fonts
- Monospace: SF Mono, Consolas (for code)

**Font Weights:**
- Light: 300 (main body, elegant)
- Regular: 400 (supporting text)
- Medium: 500 (emphasis)
- Bold: 700 (rare, only for critical emphasis)

**Type Scale:**
- Hero: 72pt (main title)
- H1: 56pt (section headings)
- H2: 40pt (sub-sections)
- H3: 28pt (sub-headings)
- Body: 22pt (main content)
- Caption: 16pt (small labels)

**Line Height:**
- Headlines: 1.1-1.2
- Body: 1.5-1.6
- Captions: 1.4

**Text Treatment:**
- No drop shadows (clean, minimal)
- No glows or effects
- High contrast only (WCAG AAA)

### Layout System

**Grid:**
- 12-column grid
- Gutter: 24px
- Margin: 96px horizontal, 72px vertical (top/bottom)

**Spacing:**
- Generous negative space: 35-60% of canvas
- Content breathing room
- Clear visual hierarchy

**Alignment:**
- Left-aligned text (easier to read)
- Center-aligned titles (optional)
- Consistent margins

**Card Design:**
- Rounded corners: 8-12px
- Padding: 32-48px
- Shadow: Subtle (optional)
- Border: 1px solid #2C2C2C

---

## Content Best Practices

### Text Content
- **Headlines**: 40-80 characters
- **Body**: 2-4 lines maximum
- **Key stat**: Large, prominent
- **CTA**: Clear, action-oriented

### Visual Hierarchy
1. Main visual/icon (largest)
2. Key message/stat (second largest)
3. Supporting text (smallest)

### Engagement Tips
- First 3 seconds: Message must be clear
- Data/statistics: Perform well on LinkedIn
- Thought leadership: Resonates with audience
- Professional polish: Expected standard

---

## LinkedIn-Specific Guidelines

### Professional Standards
✅ Enterprise-grade quality
✅ Clean, minimalist design
✅ Data-driven content
✅ Accessible (WCAG AAA)
✅ Mobile-optimized
✅ Text legible at all sizes

❌ Avoid:
- Overly promotional
- Low-resolution images
- Cluttered designs
- Memes (usually)
- Casual/unprofessional aesthetics

### Carousel Best Practices

**Slide 1 (Hook):**
- Bold statement or question
- Eye-catching visual
- Sets expectation for content

**Slides 2-N (Content):**
- One concept per slide
- Consistent design language
- Progressive reveal

**Final Slide (CTA):**
- Clear action
- Contact info or link
- Memorable closing

### Posting Times
- Tuesday-Thursday: 8-10am or 12-2pm
- Avoid weekends (50% less engagement)
- Business hours in target timezone

### Engagement Strategy
- Respond to comments in first hour (algorithm boost)
- Tag relevant people/companies (max 5)
- Ask questions to encourage comments
- Share to relevant LinkedIn groups

---

## MCP Generation Parameters

### For LinkedIn Feed Post
```yaml
provider: gpt-image-1  # Professional quality
size: "1536x1024"      # Closest to 16:9
quality: "high"        # Enterprise-grade
output_format: "png"   # Best for graphics/text
```

### For LinkedIn Carousel (Square)
```yaml
provider: gpt-image-1
size: "1024x1024"
quality: "high"
output_format: "png"
```

### For LinkedIn Carousel (Landscape)
```yaml
provider: gpt-image-1
size: "1536x1024"
quality: "high"
output_format: "png"
```

---

## Prompt Templates

### Professional Diagram
```
Create a professional LinkedIn post graphic with dark monochrome tech aesthetic.

Visual: [describe diagram/concept]
Background: Deep black (#0B0B0B)
Text: White (#FFFFFF) with light gray (#D4D4D4) secondary
Typography: Inter font, weight 300, clean hierarchy
Layout: 12-column grid, generous spacing, 35-60% negative space
Texture: Subtle noise overlay 0.03 opacity
Accent color: Green (#4ADE80)

Style: Minimalist, professional, enterprise-grade, high contrast (WCAG AAA)
Size: 1536×1024px (16:9 landscape)
```

### Data Visualization
```
LinkedIn data visualization with dark tech aesthetic.

Content: [describe data/stats]
Design: Dark background (#0B0B0B), white/light gray text
Key stat: Large, prominent (72pt)
Supporting data: Clear hierarchy (28pt)
Visual elements: Clean charts/graphs, minimalist icons
Layout: Generous negative space, 12-column grid
Accent: Green (#4ADE80) for highlights

Style: Professional, data-driven, high contrast
Format: 1536×1024px
```

### Carousel Slide Template
```
LinkedIn carousel slide [N of M] with consistent dark tech design.

Topic: [slide topic]
Key message: [1-2 lines]
Visual hierarchy: [describe layout]
Background: Deep black (#0B0B0B)
Typography: Inter font, light weight (300)
Accent color: [choose from palette]

Style: Consistent with previous slides, clean, minimal, professional
Size: 1536×1024px
```

---

## Accessibility Checklist

### WCAG AAA Compliance
- [ ] Contrast ratio ≥ 7:1 (text to background)
- [ ] Text size ≥ 22pt for body
- [ ] Color not sole information carrier
- [ ] Alt text provided (125 characters max)
- [ ] Mobile legibility verified

### Mobile Optimization
- [ ] Text legible at phone size (test at 375px width)
- [ ] Critical info in safe zones
- [ ] Visual hierarchy clear on small screen
- [ ] No small text (<16pt)

---

## Examples

### Good LinkedIn Post
- Dark background (#0B0B0B)
- White headline (72pt, Inter light)
- Single key statistic (prominent)
- Minimal supporting text (22pt)
- Subtle green accent (#4ADE80)
- 40% negative space
- High contrast (7:1)

### Good LinkedIn Carousel
- Consistent dark aesthetic across slides
- Slide 1: Bold hook question
- Slides 2-6: Progressive concept reveal
- Slide 7: Clear CTA with contact
- Each slide: One concept only
- Clean transitions between slides

---

## Technical Notes

### LinkedIn Image Processing
- LinkedIn compresses images
- Use PNG to preserve quality
- Test mobile preview before posting
- Text should be vector/high-res

### Size Mapping
- LinkedIn wants 16:9
- MCP provides 3:2 (1536×1024)
- Close enough for professional use
- Communicate "closest match" to user

---

**For other platforms, see:**
- Instagram: `instagram-specs.md`
- Twitter: `twitter-specs.md`

**For design systems, see:** `design-systems.md`
