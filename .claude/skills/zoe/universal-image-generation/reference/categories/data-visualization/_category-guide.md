# Data Visualization Category Guide

## Overview

Data visualization transforms raw numbers into visual stories that drive understanding and decision-making. This category provides comprehensive guidance for generating charts, graphs, infographics, and dashboards using AI image generation tools.

**Based on research from:**

- DataTeams AI (2025 Best Practices)
- Datawrapper (40 Chart Types Guide)
- Hands-On Data Visualization
- UXPin Dashboard Design Principles
- Google Material Design (WCAG 2.1 Accessibility)

## When to Use Data Visualization

Use this category when:

- Presenting numerical data, statistics, metrics
- Comparing categories or values
- Showing trends over time
- Revealing correlations or relationships
- Displaying parts-of-whole (proportions)
- Creating business intelligence dashboards
- Explaining complex data to stakeholders
- Building data-driven narratives

## Structure: Two-Dimensional Selection

Data visualization requires selecting BOTH:

### 1. **Aesthetic Style** (How it looks)

Located in: `styles/`

Choose based on context and audience:

- **tldraw-style**: Hand-drawn, casual, approachable
- **muted-professional**: Corporate, subtle, clean
- **vibrant-presentation**: Bold, energetic, attention-grabbing
- **dark-mode-analytics**: Tech-focused, modern, dashboard-ready
- **minimalist-modern**: Elegant, spacious, sophisticated
- **infographic-editorial**: Magazine-quality, editorial design

### 2. **Chart Type** (What it shows)

Located in: `chart-types/`

Choose based on data structure and message:

- **bar-charts**: Comparing categories
- **line-graphs**: Trends over time
- **pie-charts**: Parts of whole (use sparingly!)
- **scatter-plots**: Correlations, relationships
- **heatmaps**: Density patterns, matrices
- **flow-diagrams**: Process flows, systems
- **network-graphs**: Relationships, connections
- **dashboards**: Multi-metric views

## Core Principles (Research-Backed)

### 1. Choose the Right Chart Type

**Match chart to message:**

- Comparison → Bar/column charts
- Trend → Line charts
- Relationship → Scatter plots
- Distribution → Histograms
- Part-to-whole → Pie charts (max 5 slices!) or stacked bars
- Flow → Sankey/alluvial diagrams

**Source:** Edward Tufte, William Cleveland, Datawrapper 2025

### 2. Minimize Chart Junk

**Remove non-essential elements:**

- No 3D effects (unless plotting 3D data)
- No shadows or heavy borders
- Light gridlines (or remove entirely)
- Direct labeling > legends
- White space is your friend

**Source:** Edward Tufte, "The Visual Display of Quantitative Information"

### 3. Use Color Strategically

**Color palette types:**

- **Sequential**: Light-to-dark for ordered data (revenue growth)
- **Diverging**: Two colors from neutral midpoint (profit/loss)
- **Qualitative**: Distinct colors for categories (max 5-7 colors)

**Accessibility requirements:**

- **WCAG 2.1 Level AA**: 4.5:1 contrast for text, 3:1 for graphics
- **Color blindness**: Don't rely on color alone (use patterns, labels)
- **Test tools**: Color Oracle, contrast-ratio.com

**Source:** WCAG 2.1, ColorBrewer, Google Material Design

### 4. Create Clear Visual Hierarchy

**Guide viewer's eye:**

- Largest/brightest = most important
- Top-left placement for key insights
- Use "squint test" - blur eyes, focal point should stand out
- Z-pattern reading path (Western audiences)

**Source:** UXPin, McKinsey Design Practices

### 5. Provide Context and Scale

**Essential reference points:**

- **Zero baseline** for bar/column charts (MANDATORY)
- Reference lines for targets, averages, benchmarks
- Time-series context (show historical data)
- Annotations for key events or thresholds

**Source:** Alberto Cairo, Hands-On Data Visualization

### 6. Write Effective Titles and Labels

**Insight-driven text:**

- Title: Communicate finding, not description
  - ❌ "Sales by Quarter"
  - ✅ "Q4 Sales Surge Drives Record Annual Performance"
- Axis labels: Include units (Revenue in $M, Time in Days)
- Annotations: Point out insights directly on chart

**Source:** Cole Nussbaumer Knaflic (Storytelling with Data)

### 7. Design for Your Audience

**Tailor complexity:**

- Executives: High-level KPIs, simple charts, clear takeaways
- Analysts: Detailed data, interactive filters, granular views
- Public: Simple comparisons, familiar chart types, minimal jargon

**Source:** UXPin Dashboard Design Principles

### 8. Ensure Accessibility and Inclusivity

**Universal design:**

- Color-blind safe palettes (avoid red/green combos)
- Dual encoding (color + pattern/label)
- Alt text descriptions for screen readers
- High contrast for low vision
- Large enough fonts (minimum 10pt for charts)

**Source:** WCAG 2.1, Google Accessibility Guidelines

## Mandatory Requirements

**For ALL data visualizations generated:**

1. **Start bar charts at zero** - Non-negotiable rule
2. **Include minimum 10 negative prompts** - No chart junk
3. **Meet WCAG 2.1 AA contrast** - 4.5:1 text, 3:1 graphics
4. **Use dual encoding** - Color + labels/patterns
5. **Clear title stating insight** - Not just description
6. **Axis labels with units** - Complete context
7. **Appropriate chart type** - Match data structure
8. **Accessibility validation** - Check with Color Oracle

## Tool Selection for Data Viz

**gpt-image-1 (DALL-E 3) - Preferred for:**

- Professional corporate dashboards
- Precise text rendering (numbers, labels)
- Charts with multiple data labels
- Business reports requiring accuracy
- Minimalist-modern or muted-professional styles

**nanobanana (Gemini) - Preferred for:**

- tldraw hand-drawn style
- Vibrant presentations
- Quick iterations
- Informal explanatory charts
- Social media infographics

**fal-video (experimental):**

- flux-kontext for creative interpretations
- Not recommended for data accuracy

## Workflow Integration

When workflows invoke data visualization:

1. Detect chart type from data structure
2. Detect aesthetic style from context (or ask user)
3. Load both guides: `styles/{style}.md` + `chart-types/{type}.md`
4. Merge characteristics into unified prompt
5. Apply WCAG 2.1 accessibility standards
6. Generate with optimal tool (usually gpt-image-1)
7. Validate accessibility (contrast, dual encoding)
8. Evaluate quality + accuracy

## Examples

**Example 1: Bar chart in tldraw style**

- Style guide: tldraw-style.md (hand-drawn aesthetic)
- Chart guide: bar-charts.md (structure requirements)
- Merge: Hand-drawn bars with casual annotations
- Tool: nanobanana
- Result: Approachable, informal data presentation

**Example 2: Dashboard in muted-professional**

- Style guide: muted-professional.md (corporate aesthetic)
- Chart guide: dashboards.md (multi-metric layout)
- Merge: Clean corporate dashboard with multiple charts
- Tool: gpt-image-1 (text precision needed)
- Result: Enterprise-ready business intelligence visual

See `chart-types/` and `styles/` for complete guide details.

## Adding New Styles

To add a new data viz style (e.g., "neon-cyberpunk"):

1. Create: `styles/neon-cyberpunk.md`
2. Follow template structure (see existing styles)
3. Add to `reference/style-guide.md` registry
4. Test with 3+ chart types
5. DONE - no code changes needed

This architecture supports unlimited style expansion.
