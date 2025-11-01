# Platform Specifications - Quick Comparison

**Side-by-side comparison of all major social media platforms**

---

## Quick Reference Table

| Platform | Optimal Size | Aspect Ratio | MCP Tool Size | Design Aesthetic |
|----------|-------------|--------------|---------------|------------------|
| **LinkedIn** | 1536×1024px | 16:9 (closest: 3:2) | `1536x1024` | Dark monochrome tech |
| **Instagram Feed** | 1024×1024px | 1:1 (square) | `1024x1024` | Vibrant, engaging |
| **Instagram Story** | 1024×1536px | 9:16 (closest: 2:3) | `1024x1536` | Vertical, bold |
| **Twitter/X** | 1536×1024px | 16:9 (closest: 3:2) | `1536x1024` | High-contrast, concise |
| **Custom** | Variable | User-specified | Map to closest | Project-specific |

---

## Platform Characteristics

### LinkedIn
**Purpose:** Professional networking, B2B content, thought leadership

**Image Requirements:**
- **Feed posts**: 1200×627px (ideal), 1536×1024px (high-res)
- **Carousels**: 1080×1080px or 1200×1200px, use 1536×1024px for landscape
- **Articles**: 1200×627px

**Content Style:**
- Professional, polished
- Data-driven, informative
- Minimalist design
- High contrast (WCAG AAA)
- Clean typography

**Best Practices:**
- Dark backgrounds perform well
- Text should be legible on mobile
- Stats/data visualizations engage well
- Avoid overly promotional

**See:** `linkedin-specs.md` for complete details

---

### Instagram
**Purpose:** Visual storytelling, lifestyle, creative expression

**Image Requirements:**
- **Feed (Square)**: 1080×1080px, use 1024×1024px
- **Feed (Portrait)**: 1080×1350px (4:5), use 1024×1536px
- **Feed (Landscape)**: 1080×566px (16:9), use 1536×1024px
- **Stories**: 1080×1920px (9:16), use 1024×1536px (closest)
- **Reels Cover**: 1080×1920px

**Content Style:**
- Vibrant, colorful
- Eye-catching compositions
- Lifestyle-focused
- Authentic, relatable
- Mobile-first design

**Best Practices:**
- Bright, saturated colors work well
- Strong subject focus
- Minimal text (Instagram is visual-first)
- Consistent aesthetic across feed

**See:** `instagram-specs.md` for complete details

---

### Twitter/X
**Purpose:** Real-time conversation, news, quick updates

**Image Requirements:**
- **Single image**: 1200×675px (16:9), use 1536×1024px
- **Multiple images**: 700×800px (first image), 1024×1536px
- **Header**: 1500×500px (3:1)

**Content Style:**
- Bold, attention-grabbing
- High contrast
- Text-forward (quotes, statistics)
- Quick to comprehend
- Mobile-optimized

**Best Practices:**
- Strong text/visual hierarchy
- Controversial/surprising performs well
- Memes and humor resonate
- Quick-read formats

**See:** `twitter-specs.md` for complete details

---

## MCP Tool Size Mapping

**Available MCP Sizes:**
- `1024x1024` (1:1 square)
- `1024x1536` (2:3 portrait)
- `1536x1024` (3:2 landscape)

**Platform to MCP Mapping:**

| Platform Need | Ideal Ratio | MCP Size | Notes |
|---------------|-------------|----------|-------|
| LinkedIn post | 16:9 | `1536x1024` | Closest match (3:2) |
| LinkedIn carousel | 1:1 or 16:9 | `1024x1024` or `1536x1024` | Both work |
| Instagram feed | 1:1 | `1024x1024` | Perfect match |
| Instagram portrait | 4:5 | `1024x1536` | Closest match (2:3) |
| Instagram story | 9:16 | `1024x1536` | Closest match (2:3) |
| Twitter post | 16:9 | `1536x1024` | Closest match (3:2) |
| Custom square | 1:1 | `1024x1024` | Perfect |
| Custom landscape | 16:9 | `1536x1024` | Best available |
| Custom portrait | 9:16 or 4:5 | `1024x1536` | Best available |

**Important:**
- MCP tools don't support true 16:9 (use 1536×1024 as closest 3:2)
- MCP tools don't support true 9:16 (use 1024×1536 as closest 2:3)
- Always communicate "closest match" to user if not exact

---

## Design Aesthetic by Platform

### LinkedIn: Dark Monochrome Tech
**Colors:**
- Background: #0B0B0B (deep black)
- Primary text: #FFFFFF (white)
- Secondary text: #D4D4D4 (light gray)
- Cards: #181818 (dark gray)
- Accents: #4ADE80 (green) or project-specific

**Typography:**
- Font: Inter, sans-serif
- Weights: 300 (light), 500 (medium)
- Hierarchy: 72pt hero → 56pt heading → 28pt sub → 22pt body

**Layout:**
- 12-column grid
- Padding: 96px horizontal, 72px top
- Generous negative space (35-60%)
- Clean alignment

**See:** `design-systems.md` for full spec

---

### Instagram: Vibrant Social
**Colors:**
- Bright, saturated colors
- High contrast
- Colorful gradients
- Eye-catching palettes

**Typography:**
- Modern, clean fonts
- Bold for impact
- Minimal text (visual-first)

**Layout:**
- Strong subject focus
- Rule of thirds
- Balanced composition
- Mobile-optimized

**See:** `design-systems.md` for full spec

---

### Twitter/X: Bold & Concise
**Colors:**
- High contrast (black/white or bold colors)
- Twitter blue accents (#1DA1F2)
- Clear visual hierarchy

**Typography:**
- Large, readable fonts
- Bold headlines
- Concise copy (easy to read quickly)

**Layout:**
- Text-forward design
- Quick-read format
- Strong hierarchy

**See:** `design-systems.md` for full spec

---

## Content Type Considerations

### Carousel (Multi-slide)
**Best Platforms:** LinkedIn, Instagram

**LinkedIn Carousel:**
- Size: 1536×1024px (landscape) OR 1024×1024px (square)
- Slides: 3-7 recommended (max 10)
- Design: Consistent dark theme across slides
- First slide: Critical hook

**Instagram Carousel:**
- Size: 1024×1024px (square most common)
- Slides: Up to 10
- Design: Cohesive aesthetic
- Swipe-worthy content

### Single Image
**All Platforms**

**Size Selection:**
- LinkedIn: 1536×1024px (landscape)
- Instagram: 1024×1024px (square) or 1024×1536px (portrait)
- Twitter: 1536×1024px (landscape)

### Story/Vertical
**Best Platforms:** Instagram Stories, Instagram Reels

**Requirements:**
- Size: 1024×1536px (closest to 9:16)
- Design: Vertical-first layout
- Text: Upper/lower thirds safe zones
- Mobile: Full-screen experience

---

## Quality & Format Guidelines

### All Platforms
**Format:** PNG (preferred)
- Supports transparency
- No compression artifacts
- Best for graphics/text

**Alternative:** JPEG
- Smaller file size
- Good for photos
- Use when PNG too large

**Quality Setting:**
- LinkedIn: `high` (professional grade)
- Instagram: `high` or `medium` (depends on volume)
- Twitter: `high` (stands out in feed)

---

## Accessibility Standards

### WCAG AAA Compliance
**Required for:** LinkedIn, professional content

**Requirements:**
- Contrast ratio: 7:1 minimum
- Text size: 22pt minimum body
- Color not sole differentiator
- Alt text provided

### Mobile Optimization
**Required for:** All platforms (mobile-first)

**Requirements:**
- Text legible at phone size
- Critical info in safe zones
- Touch targets 44×44px minimum
- Test on mobile before posting

---

## Platform-Specific Best Practices

### LinkedIn
✅ Professional aesthetic
✅ Data/statistics perform well
✅ Thought leadership content
✅ B2B messaging
✅ Text-heavy acceptable
❌ Overly promotional
❌ Low-quality images
❌ Memes (usually)

### Instagram
✅ Visual storytelling
✅ Lifestyle content
✅ Behind-the-scenes
✅ User-generated content
✅ Authentic moments
❌ Text-heavy
❌ Low-res images
❌ Over-edited

### Twitter/X
✅ Timely/trending
✅ Quick insights
✅ Controversial takes
✅ Humor/memes
✅ News commentary
❌ Lengthy explanations
❌ Complex designs
❌ Slow-to-comprehend

---

## Multi-Platform Strategy

### Same Content, Multiple Platforms
**Approach:** Adapt design for each platform

**Example: Product Launch**
- **LinkedIn**: Professional product showcase, specs, B2B value
- **Instagram**: Lifestyle shot, aspirational, emotional
- **Twitter**: Bold announcement, key stat, call-to-action

**Sizes:**
- Generate 1536×1024px for LinkedIn/Twitter
- Generate 1024×1024px for Instagram
- Adapt messaging for each platform

### Cross-Platform Carousel
**Challenge:** LinkedIn prefers landscape, Instagram prefers square

**Solution:**
- Design at 1024×1024px (works on both)
- OR create two versions (more work, better results)
- OR use 1536×1024px and accept Instagram cropping

---

**For detailed platform specifications:**
- **LinkedIn:** `linkedin-specs.md`
- **Instagram:** `instagram-specs.md`
- **Twitter:** `twitter-specs.md`
- **Design Systems:** `design-systems.md`
