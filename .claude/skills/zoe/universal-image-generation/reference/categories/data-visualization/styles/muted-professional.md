# Muted Professional Style - Corporate Data Visualization

## Overview

Clean, corporate aesthetic for professional business data visualizations. Subtle color palette, precise typography, and formal composition suitable for executive presentations, financial reports, and enterprise dashboards.

## When to Use

**Best for:**

- Business reports and decks
- Executive presentations (C-suite)
- Financial statements and analysis
- Corporate dashboards
- Quarterly business reviews
- Board meeting materials
- Enterprise documentation
- Professional publications

**Avoid for:**

- Creative marketing materials
- Social media infographics
- Casual blog posts
- Educational explainers
- Startup pitch decks (too formal)

## Visual Characteristics

### Color Palette

**Subtle corporate colors** (professional, trustworthy, understated):

**Primary palette:**

- Background: #FFFFFF (pure white) or #F8F9FA (light gray)
- Primary data: #1E3A8A (navy blue)
- Secondary data: #6B7280 (slate gray)
- Accent 1: #2563EB (professional blue)
- Accent 2: #059669 (muted green - positive)
- Accent 3: #DC2626 (muted red - negative/alert)

**Extended palette (for multi-series):**

- #0EA5E9 (sky blue)
- #8B5CF6 (muted purple)
- #F59E0B (amber)
- #10B981 (emerald)
- #6366F1 (indigo)

**Contrast validation:**

- All colors achieve WCAG 2.1 AA (4.5:1 on white background)
- Tested with Color Oracle for color blindness
- Suitable for black & white printing

### Typography

**Professional sans-serif fonts:**

- Primary: Inter, Roboto, "Open Sans", "Helvetica Neue", Arial
- Weight distribution:
  - Title: SemiBold (600) or Bold (700)
  - Axis labels: Regular (400) or Medium (500)
  - Data labels: Medium (500)
  - Annotations: Light (300) or Regular (400)
- Sizes:
  - Main title: 20-28pt
  - Subtitle: 14-16pt
  - Axis labels: 11-13pt
  - Data labels: 10-12pt
  - Notes: 9-10pt
- Color: #1F2937 (dark gray) - never pure black
- Alignment: Left-aligned titles, centered data labels

### Line Quality

**Precise and clean:**

- Perfect straight lines (no wobble)
- Consistent stroke weights
- Thin gridlines: 0.5-1px in #E5E7EB (very light gray)
- Axes: 1-2px in #9CA3AF (medium gray)
- Data series: 2-3px
- Sharp, clean rendering

### Layout and Spacing

**Structured grid system:**

- 8px or 12px grid alignment
- Generous margins (40-60px)
- Consistent padding between elements
- Clear visual hierarchy
- Balanced negative space
- Formal composition rules

### Mood and Aesthetic

**Corporate professional:**

- Clean and understated
- Trustworthy and reliable
- Formal without being stuffy
- Sophisticated simplicity
- Data-first, decoration-minimal
- "Enterprise grade" quality

## Prompt Patterns

**Key phrases for muted professional style:**

```
"professional corporate data visualization", "clean business chart",
"corporate dashboard aesthetic", "enterprise-grade design",
"formal data presentation", "executive report style",
"minimal professional design", "corporate color palette",
"business intelligence visual", "clean corporate aesthetic",
"professional dashboard", "enterprise data design",
"formal chart design", "corporate reporting style"
```

**Technical precision modifiers:**

```
"precise alignment", "clean typography", "subtle color palette",
"professional sans-serif fonts", "structured grid layout",
"formal composition", "corporate design system",
"minimal clean aesthetic", "data-focused design"
```

**Quality and polish:**

```
"high-resolution professional", "enterprise quality",
"polished business design", "corporate brand standard",
"executive presentation quality", "publication-ready"
```

## JSON Template Adjustments

Emphasize these sections for muted-professional:

### scene_description

```json
{
  "environment": "Clean white or light gray background, professional corporate setting",
  "mood": "Formal, trustworthy, data-focused, serious",
  "aesthetic": "Corporate minimalism, enterprise dashboard style"
}
```

### composition_and_framing

```json
{
  "layout": "Structured 12-column grid, precise alignment",
  "spacing": "Generous margins (50px), clean negative space",
  "style": "Formal composition, balanced distribution",
  "grid": "8px baseline grid, pixel-perfect alignment"
}
```

### color_and_grade

```json
{
  "palette": ["#FFFFFF", "#1E3A8A", "#6B7280", "#2563EB", "#059669"],
  "temperature": "Cool professional (blues, grays)",
  "saturation": "Muted, desaturated, corporate",
  "contrast": "High contrast for readability, WCAG 2.1 AA compliant",
  "grading": "Clean, no filters, pure colors"
}
```

### typography

```json
{
  "font": "Inter or Roboto, professional sans-serif",
  "weights": { "title": 600, "labels": 400, "data": 500 },
  "sizes": { "title": "24pt", "axis": "12pt", "data": "11pt" },
  "color": "#1F2937 dark gray for all text",
  "alignment": "Left-aligned titles, centered labels",
  "spacing": "Tight letter spacing, professional kerning"
}
```

### lighting_design (if showing 3D elements)

```json
{
  "style": "Flat design preferred (2D), soft ambient if 3D needed",
  "quality": "Even, professional, no dramatic shadows"
}
```

## Style-Specific Negative Prompts

**ALWAYS include for muted-professional:**

```
"hand-drawn", "sketchy", "casual informal", "playful cartoon",
"vibrant saturated colors", "neon bright colors", "rainbow palette",
"decorative ornaments", "artistic flourishes", "creative styling",
"3D effects", "drop shadows", "gradients", "glossy reflections",
"textured backgrounds", "patterns", "busy cluttered",
"unprofessional fonts", "Comic Sans", "decorative scripts",
"low contrast", "poor readability", "amateur design",
"chart junk", "unnecessary elements", "distracting decorations",
"colorful backgrounds", "artistic interpretation", "creative license"
```

## MCP Tool Recommendation

**Primary: gpt-image-1 (DALL-E 3)**

**Why:**

- Superior text rendering (critical for data labels)
- Precise geometric shapes and alignment
- Better at clean, professional aesthetics
- Handles multiple data labels accurately
- Produces sharp, publication-quality output
- Excel at minimal design

**Parameters:**

```yaml
mcp__gpt-image-1__create_image:
  prompt: '{professional_corporate_prompt}'
  size: '1536x1024' # Professional aspect ratio
  quality: 'high' # Maximum quality for business use
  output_format: 'png' # Lossless for charts
```

**Alternative: nanobanana**

- Use for quick iterations only
- May struggle with perfect alignment
- Acceptable for internal drafts

## Combining with Chart Types

This style applies to ALL chart types with professional treatment:

**Examples:**

```
muted-professional + bar-charts = Clean corporate bar graph
muted-professional + dashboards = Enterprise BI dashboard
muted-professional + line-graphs = Executive trend report
muted-professional + scatter-plots = Financial correlation analysis
```

The style provides corporate aesthetic, chart-type provides data structure.

## Quality Criteria (muted-professional specific)

Evaluate against:

1. **Professional appearance (1-10)**: Enterprise-grade quality?
2. **Color subtlety (1-10)**: Muted palette, not vibrant?
3. **Typography precision (1-10)**: Clean sans-serif, readable?
4. **Alignment quality (1-10)**: Grid-aligned, structured?
5. **Data clarity (1-10)**: Information clear and accurate?
6. **Minimalism (1-10)**: No unnecessary elements?
7. **WCAG compliance (1-10)**: Meets AA contrast (4.5:1)?

**Target: 8.5+ average** (high professional standard)

## Accessibility Requirements

**WCAG 2.1 Level AA minimum:**

- **Text contrast**: 4.5:1 against background
  - #1F2937 on #FFFFFF = 12.63:1 ✅
  - #6B7280 on #FFFFFF = 4.54:1 ✅
- **Graphic contrast**: 3:1 against adjacent colors
  - All palette colors tested and compliant
- **Dual encoding**: Never use color alone
  - Add data labels (numbers, percentages)
  - Use patterns if differentiating many series
  - Direct labeling preferred over legends

**Color blindness testing:**

- Test with Color Oracle or Coblis
- Ensure deuteranopia, protanopia, tritanopia all work
- Navy/gray/green palette is colorblind-friendly

## Real-World Applications

**McKinsey-style reports:**

- Clean bar charts with direct labeling
- Muted blue/gray palette
- Minimal gridlines
- Bold insight-driven titles

**Financial dashboards:**

- Multi-chart layouts
- Subtle color coding (green=profit, red=loss)
- Precise number rendering
- Professional typography

**Board presentations:**

- High-level KPI cards
- Trend lines with context
- Benchmark comparisons
- Executive summary style

## Tips for Best Results

1. **Keep color palette to 3-4 colors maximum**
2. **Use white space generously** - don't crowd
3. **Direct label everything** - minimize legends
4. **Titles state insights** - not just descriptions
5. **Test print in grayscale** - should still work
6. **Validate contrast ratios** - every color pair
7. **Remove all gridlines** - or make very subtle (#F3F4F6)
8. **Use data-first approach** - clarity over creativity

## Sources

Based on corporate design standards research:

- McKinsey & Company reporting style
- Google Material Design (enterprise guidelines)
- UXPin Dashboard Design Principles (2025)
- Urban Institute Data Visualization Style Guide
- Financial Times Visual Vocabulary
- WCAG 2.1 Accessibility Standards

This guide ensures corporate-appropriate data visualizations that meet enterprise quality and accessibility standards.
