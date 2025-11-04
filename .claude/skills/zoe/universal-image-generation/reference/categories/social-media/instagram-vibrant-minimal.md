# Instagram Vibrant Minimal Style

## Overview

Bright, clean aesthetic optimized for Instagram feed posts. Combines vibrant colors with minimal composition for maximum mobile engagement. Designed for quick visual communication in busy Instagram feeds.

## When to Use

**Best for:**
- Instagram feed posts (square 1:1)
- Carousel posts (multi-slide stories)
- Product showcases
- Lifestyle content
- Visual quotes
- Brand-building posts
- Engagement-focused content

**Avoid for:**
- LinkedIn (too casual)
- Professional B2B (use LinkedIn style)
- Technical documentation
- Data-heavy content

## Visual Characteristics

### Color Palette

**Vibrant yet harmonious:**

**Background options:**
- White (#FFFFFF) - clean, versatile
- Soft pastels (#FFF7ED peach, #FEF3C7 cream, #DBEAFE light blue)
- Light gradients (subtle, 2-color max)

**Accent colors (pick 1-2 per post):**
- Coral/Pink: #FF6B9D, #EC4899
- Blue: #3B82F6, #0EA5E9
- Purple: #8B5CF6, #A855F7
- Orange: #F97316, #FB923C
- Green: #10B981, #22C55E
- Yellow: #FBBF24, #F59E0B

**Text colors:**
- Primary: #1F2937 (dark gray on light) or #FFFFFF (white on dark)
- Secondary: #6B7280 (medium gray)

**Contrast:**
- All combinations WCAG AA compliant (4.5:1+)
- Mobile-optimized readability

### Typography

**Clean modern sans-serif:**
- Fonts: "Inter", "Poppins", "Montserrat", "SF Pro"
- Weights:
  - Headlines: SemiBold (600) or Bold (700)
  - Body: Regular (400) or Medium (500)
  - Captions: Light (300) or Regular (400)
- Sizes:
  - Main message: 36-48pt
  - Supporting text: 18-24pt
  - Captions/hashtags: 12-14pt
- Alignment: Centered (Instagram default) or left-aligned
- Line height: 1.3-1.5

### Layout Principles

**Minimal yet impactful:**
- **Rule of thirds**: Position key elements at intersections
- **Breathing room**: 30-40% whitespace
- **Focal point**: One clear subject/message
- **Hierarchy**: 1 primary element, 2-3 supporting
- **Balance**: Asymmetric but balanced composition

**Grid:**
- 1080×1080px square (Instagram standard)
- Safe zone: 100px margins on all sides
- Central focus with space around

### Mood and Aesthetic

**Bright and engaging:**
- Optimistic and energetic
- Clean and modern
- Approachable yet polished
- Mobile-first readability
- Scroll-stopping impact
- "Instagram-native" feel

## Prompt Patterns

**Key phrases:**

```
"Instagram post design", "vibrant minimal aesthetic", "clean Instagram graphic",
"bright engaging design", "mobile-optimized social post", "Instagram feed post",
"colorful minimal composition", "modern Instagram visual", "clean social media design",
"bright professional aesthetic", "Instagram-style graphic", "scroll-stopping design"
```

**Technical modifiers:**
```
"square 1080×1080", "generous whitespace", "centered composition",
"vibrant accent color", "clean sans-serif typography", "mobile readability",
"high contrast", "minimal design elements", "focused composition"
```

**Color and mood:**
```
"bright [COLOR] accent", "soft pastel background", "clean white background",
"vibrant but not overwhelming", "professional yet friendly",
"optimistic energetic mood", "Instagram-appropriate colors"
```

## JSON Template Adjustments

### scene_description
```json
{
  "environment": "Clean white or soft pastel background, bright and airy",
  "mood": "Optimistic, energetic, engaging, approachable",
  "aesthetic": "Minimal modern, Instagram-native, mobile-first"
}
```

### composition_and_framing
```json
{
  "aspect_ratio": "1:1 square",
  "resolution": "1080x1080",
  "layout": "Rule of thirds, central focus with breathing room",
  "spacing": "Generous margins (100px), 30-40% whitespace",
  "alignment": "Centered or left-aligned, balanced composition"
}
```

### color_and_grade
```json
{
  "palette": ["#FFFFFF or pastel bg", "vibrant accent (#3B82F6, #EC4899, etc.)", "#1F2937 text"],
  "temperature": "Warm and inviting OR cool and modern",
  "saturation": "Vibrant but not garish, professional vibrancy",
  "contrast": "High for mobile readability, WCAG AA minimum"
}
```

### typography
```json
{
  "font": "Inter, Poppins, or Montserrat",
  "weights": {"headline": 600, "body": 400},
  "sizes": {"main": "42pt", "supporting": "20pt"},
  "color": "#1F2937 dark gray on light bg",
  "treatment": "Clean, crisp, high readability on mobile"
}
```

## Style-Specific Negative Prompts

```
"cluttered", "busy background", "dark heavy aesthetic",
"corporate formal stiff", "too much text", "small fonts",
"low contrast", "illegible", "complex composition",
"chart junk", "decorative overload", "gradient backgrounds",
"stock photos", "cheesy clipart", "amateur design",
"LinkedIn dark style", "B2B corporate", "technical diagrams",
"muted colors", "gray backgrounds", "dull palette",
"unprofessional", "messy", "unbalanced", "overcrowded"
```

## MCP Tool Recommendation

**Primary: nanobanana (Gemini 2.5 Flash)**

**Why:**
- Excellent at vibrant colors
- Fast generation (perfect for social media pace)
- Cost-effective for high-volume social content
- Good at minimal compositions
- Handles centered layouts well

**Parameters:**
```yaml
mcp__nanobanana__generate_image:
  prompt: "{instagram_vibrant_prompt}"
  negative_prompt: "{negative_prompts_above}"
  mode: "generate"
  n: 2  # Generate 2 options to choose from
```

**Alternative: gpt-image-1**
- Use if text rendering critical
- Use for quotes with long text
- More expensive but higher precision

## Instagram-Specific Requirements

**Technical specs:**
- **Feed post**: 1080×1080px (square) - MANDATORY
- **Carousel**: 1080×1080px per slide (square)
- **File size**: Under 8MB (Instagram limit)
- **Format**: JPG or PNG
- **Aspect ratio**: 1:1 (square) or 4:5 (portrait)

**Design for mobile:**
- Text readable at small sizes
- High contrast (viewed in bright light)
- Simple composition (thumb-stopping)
- Focal point clear even at thumbnail
- Test at 293×293px (grid preview size)

**Instagram algorithm preferences:**
- Original content (not templates/stock)
- Face-forward (if person shown)
- Bright and vibrant (performs better)
- Clear subject (identifiable quickly)

## Content Types That Perform

**On Instagram, this style works for:**

1. **Visual quotes** (inspirational, thought-provoking)
2. **Tips and tactics** (actionable advice, numbered lists)
3. **Before/after** (transformations, comparisons)
4. **Data highlights** (single impactful statistic)
5. **Announcements** (launches, updates, news)
6. **Educational** (explain concepts simply)

**Structure:**
- One clear message per post
- Vibrant attention-grabber
- Easy to understand in 2-3 seconds
- Mobile-thumb-stopping design

## Example Prompts

### Visual Quote Post

```
Instagram post design, square 1080×1080, white background (#FFFFFF). Centered
composition with generous whitespace (40%). Large inspirational quote in dark
gray Inter SemiBold (600 weight, 42pt): "Build in public, learn in private,
ship in silence." Vibrant coral accent (#FF6B9D) curved underline beneath key
word "Build". Bottom attribution in light gray (300 weight, 14pt): "— Startup
Wisdom". Minimal clean design, centered alignment, breathing room around text,
mobile-optimized readability, Instagram aesthetic.

Negative: cluttered, dark background, complex, busy, chart junk, low contrast,
small fonts, corporate formal, too much text, decorative overload
```

**Tool:** nanobanana
**Engagement:** High (quote posts perform well)

### Data Highlight Post

```
Instagram square post (1080×1080) showing single impactful statistic. Soft
peach background (#FFF7ED). Huge number "3.2×" in dark gray Inter Bold (700
weight, 88pt) centered. Below in vibrant blue (#3B82F6, SemiBold 28pt): "Average
ROI with AI automation". Bottom caption Regular 16pt gray: "Source: Industry
Report 2024". Minimal design, generous whitespace (50%), focal point on number,
clean modern aesthetic, mobile-optimized, Instagram-appropriate vibrant minimal.

Negative: cluttered, dark background, complex charts, busy, low contrast,
decorative elements, corporate stiff, LinkedIn style, too formal
```

**Tool:** nanobanana
**Engagement:** High (data posts perform)

### Announcement Post

```
Instagram announcement, square 1080×1080. White background with subtle soft
blue gradient (top #FFFFFF to bottom #DBEAFE, very subtle). Centered headline
in dark gray Inter SemiBold "New Feature Launched" (600 weight, 48pt). Vibrant
purple accent circle (#8B5CF6) behind one word for emphasis. Three feature
bullets in Regular 22pt with purple checkmarks. Bottom CTA in green (#10B981,
Medium 20pt): "Try it now →". Clean minimal composition, 35% whitespace,
modern Instagram aesthetic, mobile-optimized design.

Negative: dark background, cluttered, complex, low contrast, corporate formal,
too much text, small fonts, busy decorations, chart junk
```

**Tool:** nanobanana
**Engagement:** Medium-High (announcements with clear CTA)

## Quality Criteria

Instagram-specific evaluation:

1. **Thumb-stopping power (1-10)**: Grabs attention in feed?
2. **Mobile readability (1-10)**: Clear at small size?
3. **Color vibrancy (1-10)**: Bright but professional?
4. **Simplicity (1-10)**: One clear message?
5. **Whitespace use (1-10)**: Breathing room adequate?
6. **Brand consistency (1-10)**: On-brand aesthetic?
7. **Engagement potential (1-10)**: Likely to perform?

**Target: 8.0+ average** (Instagram quality standard)

## Accessibility

**WCAG compliance:**
- Text contrast: 4.5:1 minimum
- Color + label dual encoding
- Works in grayscale
- Large enough fonts (18pt+ body)

**Instagram-specific:**
- Alt text supported (include description)
- Captions provide text alternative
- Visual should work without reading text

## Sources

**Based on:**
- Instagram design best practices
- Mobile-first design principles
- Visual hierarchy research
- Color psychology for engagement
- Emily's prompt patterns

This guide optimizes for Instagram's unique requirements and audience behavior patterns.
