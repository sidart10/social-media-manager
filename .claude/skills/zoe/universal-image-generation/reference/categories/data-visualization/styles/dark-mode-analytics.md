# Dark Mode Analytics Style - Tech Dashboard Data Visualization

## Overview

Modern tech aesthetic with dark backgrounds and neon accent colors. Perfect for analytics dashboards, product interfaces, and technical data presentations. Inspired by modern SaaS products, developer tools, and analytics platforms.

## When to Use

**Best for:**

- Product analytics dashboards
- Developer tools and technical interfaces
- Real-time monitoring displays
- Tech company presentations
- SaaS product visualizations
- Data science notebooks
- Modern web applications
- Gaming/esports analytics

**Avoid for:**

- Traditional corporate reports (too modern)
- Print materials (dark backgrounds expensive)
- Accessibility-sensitive contexts (requires careful contrast)
- Conservative audiences (may seem too trendy)

## Visual Characteristics

### Color Palette

**Dark foundation + neon accents:**

**Background:**

- Primary: #0B0B0B (near-black) or #111827 (dark gray)
- Secondary: #1F2937 (slightly lighter panels)
- Tertiary: #374151 (card backgrounds)

**Data colors (neon accents):**

- Primary data: #00F5FF (cyan/aqua) - high visibility
- Secondary: #FF006E (hot pink/magenta)
- Tertiary: #00FF9F (mint green)
- Accent 1: #8B5CF6 (purple)
- Accent 2: #F59E0B (amber/orange)
- Positive: #10B981 (emerald green)
- Negative: #EF4444 (red)

**Text colors:**

- Primary: #F9FAFB (off-white)
- Secondary: #D1D5DB (light gray)
- Tertiary: #9CA3AF (medium gray)
- Muted: #6B7280 (dark gray for less important)

**WCAG Validation:**

- All neon colors achieve 3:1+ against #0B0B0B
- Text colors achieve 4.5:1+ against dark backgrounds
- Tested for accessibility compliance

### Typography

**Modern sans-serif, tech aesthetic:**

- Fonts: "SF Pro", "Inter", "Roboto Mono" (for numbers), "JetBrains Mono"
- Weights:
  - Title: Medium (500) or SemiBold (600)
  - Metrics: Regular (400) or Medium (500)
  - Labels: Light (300) or Regular (400)
- Sizes:
  - Main metrics: 32-48pt (large, prominent)
  - Chart title: 18-24pt
  - Axis labels: 11-13pt
  - Data labels: 12-14pt
- Color: #F9FAFB for primary text
- Monospace for numbers (technical precision)

### Line Quality

**Clean, technical precision:**

- Crisp straight lines
- Thin gridlines: 0.5-1px in #374151 (subtle, low contrast)
- Glowing effect optional (1-2px outer glow on data lines)
- Sharp rendering
- No organic/hand-drawn elements

### Layout and Spacing

**Modern dashboard grid:**

- 8px or 12px grid system
- Card-based layouts (rounded 8-12px)
- Generous padding (24-32px)
- Dark panels (#1F2937) on darker background (#0B0B0B)
- Subtle elevation (1px border in #374151)

### Mood and Aesthetic

**Tech-forward, modern:**

- Sleek and sophisticated
- High-tech, data-driven
- Dashboard-ready
- Gamer/developer aesthetic
- "Command center" vibe
- Modern SaaS product feel

## Prompt Patterns

**Key phrases for dark mode analytics:**

```
"dark mode dashboard", "tech analytics interface", "dark background data visualization",
"neon accent colors", "modern analytics aesthetic", "dark theme dashboard",
"tech product interface", "SaaS dashboard style", "dark UI data display",
"analytics command center", "modern dark design", "tech-forward visualization",
"developer dashboard aesthetic", "gaming analytics style", "dark analytics UI"
```

**Technical modifiers:**

```
"dark background (#0B0B0B)", "neon cyan accents", "hot pink highlights",
"modern sans-serif typography", "clean grid system", "card-based layout",
"subtle glowing effects", "technical precision", "dashboard interface"
```

**Quality indicators:**

```
"high contrast on dark", "modern tech aesthetic", "professional dashboard quality",
"SaaS product standard", "clean dark UI", "readable on dark background"
```

## JSON Template Adjustments

### scene_description

```json
{
  "environment": "Dark mode interface, near-black background (#0B0B0B)",
  "mood": "Technical, modern, data-focused, sophisticated",
  "aesthetic": "SaaS dashboard, analytics platform, tech product UI"
}
```

### composition_and_framing

```json
{
  "layout": "Card-based dashboard grid, 12-column system",
  "spacing": "Generous padding (32px), clean panel separation",
  "style": "Modern dark UI, rounded cards (8-12px)",
  "background": "Layered dark shades (#0B0B0B base, #1F2937 cards)"
}
```

### color_and_grade

```json
{
  "palette": ["#0B0B0B", "#00F5FF", "#FF006E", "#00FF9F", "#F9FAFB"],
  "temperature": "Cool tech (cyans, blues, purples)",
  "saturation": "High saturation neons against dark",
  "contrast": "Extreme contrast, WCAG AA+ compliant",
  "treatment": "Optional subtle glow on neon elements (1-2px)"
}
```

### typography

```json
{
  "font": "Inter or SF Pro for text, Roboto Mono for numbers",
  "color": "#F9FAFB for primary, #D1D5DB for secondary",
  "weights": { "title": 500, "metrics": 600, "labels": 300 },
  "rendering": "Sharp, crisp, high contrast against dark"
}
```

### lighting_design

```json
{
  "style": "Flat 2D preferred, subtle depth through layering",
  "glow": "Optional 1-2px outer glow on neon elements",
  "shadows": "Minimal, subtle card elevation only"
}
```

## Style-Specific Negative Prompts

**ALWAYS include for dark-mode-analytics:**

```
"light background", "white background", "bright background",
"muted colors", "pastel colors", "earth tones", "hand-drawn",
"casual informal", "corporate formal", "traditional business",
"3D effects", "heavy shadows", "gradient backgrounds",
"decorative ornaments", "chart junk", "busy patterns",
"low contrast", "illegible text", "thin fonts on dark",
"colorful light backgrounds", "daytime aesthetic", "paper texture",
"print-optimized", "conservative design", "traditional charts"
```

## MCP Tool Recommendation

**Primary: gpt-image-1 (DALL-E 3)**

**Why:**

- Excellent at high-contrast dark mode
- Superior text rendering on dark backgrounds
- Handles neon colors well
- Precise for technical dashboards
- Sharp, crisp rendering

**Parameters:**

```yaml
mcp__gpt-image-1__create_image:
  prompt: '{dark_mode_prompt}'
  size: '1536x1024' # Dashboard aspect ratio
  quality: 'high'
  output_format: 'png'
```

**Alternative: nanobanana**

- Acceptable for less text-heavy charts
- Good for experimental iterations
- May struggle with extreme contrast

## Combining with Chart Types

Works exceptionally well with:

- **Heatmaps** (natural fit for intensity patterns)
- **Dashboards** (multi-chart layouts look amazing)
- **Line graphs** (neon lines pop against dark)
- **Network graphs** (tech aesthetic matches well)

Less ideal for:

- Pie charts (too technical for simple parts-of-whole)
- Hand-drawn styles (aesthetic conflict)

## Quality Criteria

Evaluate against:

1. **Dark mode execution (1-10)**: True dark bg, not gray?
2. **Neon contrast (1-10)**: Accents visible and vibrant?
3. **Readability (1-10)**: Text crisp on dark?
4. **Tech aesthetic (1-10)**: Modern SaaS product feel?
5. **WCAG compliance (1-10)**: High contrast maintained?
6. **Dashboard quality (1-10)**: Production UI standard?
7. **Data clarity (1-10)**: Information clear despite dark mode?

**Target: 8.5+ average**

## Example Prompt

```
Dark mode analytics dashboard showing real-time user engagement metrics.
Near-black background (#0B0B0B) with rounded card panels (#1F2937, 12px radius).
Multiple charts: line graph in neon cyan (#00F5FF, 2px thickness) showing hourly
active users, bar chart in hot pink (#FF006E) for feature usage comparison,
numeric KPI cards with large numbers in mint green (#00FF9F). All text in off-white
(#F9FAFB) using Inter font. Metric values in Roboto Mono. Subtle horizontal
gridlines in dark gray (#374151). Clean modern dashboard layout, 12-column grid,
32px padding between cards. Title "Live Engagement Dashboard" in Medium Inter 20pt.
High contrast technical precision, SaaS product quality, dashboard-ready interface.

Negative: light background, white background, muted colors, low contrast, hand-drawn,
casual, corporate formal, 3D effects, chart junk, illegible text, daytime aesthetic,
traditional business charts, print-optimized
```

**Tool:** gpt-image-1
**Style combinations:** Works with heatmaps, dashboards, line-graphs, network-graphs
**Best for:** Product analytics, developer tools, tech dashboards

## Accessibility on Dark Backgrounds

**WCAG 2.1 considerations:**

**Higher contrast needed:**

- Text on dark: White/off-white required for readability
- Minimum: 4.5:1 (#F9FAFB on #0B0B0B = 17.27:1 ✅)
- Neon data elements: 3:1 minimum against #0B0B0B

**Dual encoding still required:**

- Don't rely on neon colors alone
- Add labels, values, annotations
- Use different neon hues (not just brightness)

**Testing:**

- Dark mode specific colorblind testing
- Ensure neons distinguishable
- Verify text readability at all sizes

## Real-World Inspiration

**Based on:**

- Vercel Analytics dashboard
- Linear app interface
- Notion dark mode
- GitHub Insights dark theme
- Stripe Dashboard dark mode
- Datadog monitoring UI
- Grafana dashboards

This style captures the modern tech product aesthetic while maintaining professional data visualization standards.
