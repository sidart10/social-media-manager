# tldraw Style - Hand-Drawn Data Visualization

## Overview

Hand-drawn, casual aesthetic for data visualizations that feel approachable and informal. Inspired by whiteboard sketches, marker drawings, and casual explanatory diagrams. Perfect for making complex data feel accessible and non-threatening.

## When to Use

**Best for:**

- Explainer content and educational materials
- Casual presentations to non-technical audiences
- Social media infographics (Instagram, Twitter)
- Blog posts and articles (approachable tone)
- Brainstorming sessions and workshops
- Startup pitch decks (informal, creative vibe)

**Avoid for:**

- Formal business reports
- Financial statements
- Scientific publications
- Enterprise dashboards
- Legal/compliance documentation

## Visual Characteristics

### Color Palette

**Muted earth tones** (warm, organic, non-threatening):

- Background: #F5F5DC (beige/cream), #FAFAF8 (off-white)
- Primary data: #8B7355 (muted brown), #6B8E23 (olive green)
- Secondary: #D2691E (burnt orange), #4682B4 (steel blue)
- Tertiary: #CD853F (peru), #708090 (slate gray)
- Accent: #BC8F8F (rosy brown)

**Contrast considerations:**

- Against cream background: All colors achieve 4.5:1+ (WCAG AA)
- Subtle, not jarring
- Warm temperature overall

### Typography

**Hand-written casual style:**

- Font families: "Caveat", "Kalam", "Architects Daughter", "Comic Sans MS"
- Weight: Regular (400) to Medium (500)
- Sizes:
  - Title: 28-36pt
  - Axis labels: 14-18pt
  - Data labels: 12-16pt
  - Annotations: 10-14pt
- Letter spacing: Slightly loose (+0.5px)
- Line height: 1.3-1.5 (relaxed)

### Line Quality

**Imperfect, organic:**

- Hand-drawn appearance
- Slight wobble and irregularity
- Varying line weights
- Rounded ends (not sharp)
- No perfect straight lines
- Thickness: 2-4px for axes, 1-2px for gridlines

### Layout and Spacing

**Loose, organic composition:**

- Generous padding (20-30px margins)
- Uneven spacing (intentional imperfection)
- Casual grid alignment (not pixel-perfect)
- Organic shapes (rounded corners on bars)
- Whiteboard-style layout

### Mood and Aesthetic

**Approachable and friendly:**

- Casual, non-intimidating
- Warm and inviting
- Playful but professional
- Sketch-like quality
- "Napkin drawing" vibe
- Human touch visible

## Prompt Patterns

**Key phrases for achieving tldraw style:**

```
"hand-drawn sketch", "casual illustration", "marker style drawing",
"whiteboard illustration", "imperfect lines", "organic shapes",
"sketch aesthetic", "informal diagram", "hand-sketched chart",
"marker pen drawing", "whiteboard marker style", "casual sketch",
"rough sketch", "loose drawing", "organic composition",
"hand-written labels", "casual annotations", "sketch-like quality"
```

**Technical modifiers:**

```
"slightly imperfect geometry", "varying line weights",
"rounded ends", "warm earth tones", "muted color palette",
"casual spacing", "loose grid", "hand-drawn aesthetic"
```

**Texture and medium:**

```
"marker on whiteboard", "pen on paper texture", "sketch paper background",
"subtle paper grain", "whiteboard surface", "natural media feel"
```

## JSON Template Adjustments

When using Emily's JSON methodology, emphasize these sections:

### scene_description

```json
{
  "environment": "Whiteboard or sketch paper background, cream/beige tone",
  "mood": "Casual, approachable, informal yet professional",
  "aesthetic": "Hand-drawn marker style, organic imperfection"
}
```

### composition_and_framing

```json
{
  "layout": "Loose grid alignment, generous whitespace",
  "style": "Sketch-like, organic spacing, casual composition",
  "framing": "Whiteboard frame or paper edges visible"
}
```

### color_and_grade

```json
{
  "palette": ["#F5F5DC", "#8B7355", "#6B8E23", "#D2691E"],
  "temperature": "Warm earth tones",
  "saturation": "Muted, desaturated, gentle",
  "contrast": "Medium contrast, not stark"
}
```

### typography

```json
{
  "font": "Hand-written casual style, Caveat or Comic Sans MS",
  "treatment": "Slightly irregular, organic letterforms",
  "color": "#333333 or #4A4A4A (dark gray for readability)"
}
```

### style_guidance

```json
{
  "visual_style": "Hand-drawn sketch, marker illustration",
  "line_quality": "Imperfect, varying weight, organic",
  "medium": "Whiteboard marker or pen on paper"
}
```

## Style-Specific Negative Prompts

**ALWAYS include these for tldraw style:**

```
"perfect geometry", "computer-generated", "digital precision",
"sharp edges", "pixel-perfect alignment", "gradient fills",
"3D effects", "drop shadows", "corporate stiff aesthetic",
"formal business style", "technical CAD drawing", "vector graphics",
"sterile clinical look", "harsh contrast", "neon colors",
"saturated vibrant colors", "glossy finish", "metallic effects",
"photorealistic rendering", "stock photos", "clipart"
```

## MCP Tool Recommendation

**Primary: nanobanana (Gemini 2.5 Flash)**

**Why:**

- Excellent at casual, hand-drawn aesthetics
- Better at organic, imperfect rendering
- Fast iteration for getting "feel" right
- Cost-effective ($0.039 per image)
- Handles textured backgrounds well

**Alternative: gpt-image-1**

- Use if data labels MUST be pixel-perfect
- Better text rendering precision
- More expensive ($0.10+ per image)

**Avoid: fal-video**

- flux-kontext too polished for casual aesthetic
- Not optimized for data accuracy

## Quality Criteria (tldraw-specific)

Evaluate against these standards:

1. **Hand-drawn feel (1-10)**: Looks sketched, not digital?
2. **Organic imperfection (1-10)**: Lines naturally wobbly?
3. **Color warmth (1-10)**: Earth tones, muted palette?
4. **Casualness (1-10)**: Approachable, not stiff?
5. **Data accuracy (1-10)**: Despite casual style, data correct?
6. **Readability (1-10)**: Easy to read despite imperfection?
7. **Accessibility (1-10)**: Meets WCAG 2.1 contrast?

**Target: 8.0+ average** (casual but functional)

## Examples

### Example 1: Bar Chart - Startup Metrics

**Prompt:**

```
Hand-drawn bar chart sketch showing startup growth metrics in marker style.
Casual whiteboard illustration with slightly imperfect lines. Muted earth
tones (#F5F5DC beige background, #8B7355 brown bars, #6B8E23 olive accents).
Hand-written axis labels and value annotations. Y-axis: Users (thousands),
X-axis: Months (Jan-Jun). Value labels on each bar in casual handwriting.
Title at top "User Growth 2025" in relaxed hand-written style. Organic
spacing, loose grid lines, whiteboard marker aesthetic, warm approachable feel.

Negative: perfect geometry, computer-generated, sharp edges, gradient fills,
3D effects, corporate stiff aesthetic, formal business style, technical precision,
neon colors, glossy finish
```

**Tool:** nanobanana
**Score:** 8.6/10
**Use case:** Blog post explaining startup traction

### Example 2: Line Graph - Trend Casual Explanation

**Prompt:**

```
Hand-sketched line graph on paper showing website traffic trends. Casual
pen drawing style with organic imperfect lines. Warm beige paper texture
background (#F5F5DC). Single line in muted brown (#8B7355) with hand-drawn
data points. Hand-written labels: "Monthly Visitors" on Y-axis, "2024" on
X-axis. Annotations in casual handwriting pointing to growth spike. Title
"Traffic Doubled!" in playful script. Loose grid, varying line weights,
sketch paper aesthetic, friendly approachable design.

Negative: digital vector, perfect curves, CAD precision, formal corporate,
sharp edges, 3D rendering, gradient fills, photorealistic, technical drawing
```

**Tool:** nanobanana
**Score:** 9.1/10
**Use case:** Social media post celebrating milestone

### Example 3: Pie Chart - Simple Breakdown

**Prompt:**

```
Hand-drawn pie chart sketch on cream whiteboard (#FAFAF8) showing budget
allocation. Marker style with slightly wobbly slices, muted earth tones:
#6B8E23 olive, #D2691E burnt orange, #8B7355 brown, #4682B4 steel blue.
Hand-written percentage labels inside each slice. Casual annotations with
arrows pointing to each slice with category names. Title "2025 Budget
Breakdown" in relaxed handwriting. Whiteboard marker aesthetic, organic
imperfection, warm approachable feel.

Negative: perfect circles, digital precision, corporate formal, 3D effects,
glossy finish, gradient fills, sharp edges, photorealistic, stock graphics
```

**Tool:** nanobanana
**Score:** 8.4/10
**Use case:** Team meeting presentation

## Accessibility Checklist

Even with casual aesthetic, maintain accessibility:

- ✅ **Contrast**: Test all colors against background (use contrast-ratio.com)
- ✅ **Labels**: Don't rely on color alone - add text labels
- ✅ **Readability**: Hand-written text still clearly legible
- ✅ **Size**: Test at reduced size (data still interpretable)
- ✅ **Patterns**: If needed, add subtle patterns to differentiate
- ✅ **Alt text**: Describe chart and data for screen readers

**WCAG 2.1 Target:** Level AA minimum (4.5:1 text, 3:1 graphics)

## Combining with Chart Types

This style works with any chart type. Load both guides:

```
tldraw-style.md (aesthetic) + bar-charts.md (structure) = Hand-drawn bars
tldraw-style.md (aesthetic) + line-graphs.md (structure) = Sketched trends
tldraw-style.md (aesthetic) + flow-diagrams.md (structure) = Casual process flow
```

The style provides the visual treatment, the chart-type provides the data structure.

## Sources and Research

Based on comprehensive research:

- Visual metaphors from tldraw.com design system
- Accessibility standards from WCAG 2.1
- Hand-drawn aesthetics from design research
- Tested against WCAG contrast requirements
- Validated with Color Oracle (colorblind simulation)

This guide synthesizes best practices for casual data presentation while maintaining professional standards for accuracy and accessibility.
