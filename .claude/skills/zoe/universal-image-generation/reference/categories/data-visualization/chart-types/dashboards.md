# Dashboards - Multi-Metric Displays

## Overview

Dashboards consolidate multiple data visualizations and key performance indicators (KPIs) into a single unified interface. Essential for at-a-glance monitoring, executive summaries, and comprehensive data storytelling.

**Research sources:** UXPin Dashboard Design Principles (2025), Tableau, Grafana, Material Design

## When to Use Dashboards

**Best for:**

- Executive summaries (C-suite KPIs)
- Real-time monitoring (operations, DevOps)
- Business intelligence overview
- Multi-metric tracking
- Performance scorecards
- Analytical reporting
- Strategic planning displays

**Data requirements:**

- 4-12 related metrics
- Multiple visualization types (mix charts)
- Clear organizational hierarchy
- Related data telling unified story

## Dashboard Types (from research)

### 1. Strategic Dashboards (Executive)

```
Audience: C-suite, executives
Focus: Long-term KPIs, high-level overview
Update frequency: Daily/weekly
Charts: Simple, clear, trends over time
Example metrics: Revenue growth, market share, customer satisfaction
```

### 2. Operational Dashboards (Real-time)

```
Audience: Managers, operations teams
Focus: Day-to-day monitoring
Update frequency: Real-time/hourly
Charts: Live data, alerts, status indicators
Example metrics: Open tickets, response time, system health
```

### 3. Analytical Dashboards (Deep Analysis)

```
Audience: Analysts, data teams
Focus: Patterns, trends, insights
Update frequency: On-demand
Charts: Detailed, interactive, complex
Example metrics: Sales drivers, cohort analysis, correlations
```

### 4. Tactical Dashboards (Mid-level)

```
Audience: Department managers
Focus: Short-term goals, implementation
Update frequency: Daily/weekly
Charts: Campaign performance, project status
Example metrics: Ad spend, conversion rates, task completion
```

**Source:** UXPin Dashboard Design Principles (2025)

## Structure Requirements

### Layout Principles

**1. Visual Hierarchy (CRITICAL):**

```
Priority 1: Top-left corner
  - Most important KPI
  - Largest size
  - Boldest color
  - Immediate attention

Priority 2: Top-right, center-left
  - Supporting metrics
  - Medium size
  - Secondary emphasis

Priority 3: Bottom sections
  - Detailed charts
  - Context and drill-downs
  - Smaller, more complex

Source: F-pattern and Z-pattern eye tracking
```

**2. Grid System:**

```
12-column grid (standard)
- Large KPI cards: 6-12 columns wide
- Medium charts: 4-6 columns
- Small metrics: 3-4 columns
- Consistent gutters: 16-24px
```

**3. Card-Based Layout:**

```
Each metric/chart in distinct card:
- Rounded corners (8-12px)
- Subtle borders or elevation
- Internal padding (20-30px)
- White space between cards
- Clear visual separation
```

### Essential Dashboard Elements

**1. KPI Cards (Numeric Metrics):**

```
Large number display:
- Value: 48-72pt
- Label: 14-18pt
- Trend indicator: ↑ +15% or ↓ -8% with color
- Sparkline optional (mini trend)
- Icon optional (contextual)
```

**2. Chart Variety:**

```
Mix chart types appropriately:
- Line graphs: Trends over time
- Bar charts: Category comparisons
- Pie/donut: Composition (use sparingly!)
- Heatmaps: Patterns, density
- Tables: Detailed data when needed

Avoid: All same chart type (boring, less insight)
```

**3. Consistent Header:**

```
Each card/chart section:
- Title: Insight-driven or metric name
- Timeframe: "Last 30 days", "Q4 2024"
- Actions: Filter, export, details (if interactive)
```

**4. Color Coding:**

```
Consistent semantic colors:
- Green: Positive, up, good
- Red: Negative, down, alert
- Blue: Neutral, information
- Gray: Inactive, unavailable

Never red/green only (colorblind issue!)
```

## Mandatory Requirements

### 1. Clear Visual Hierarchy

- Most important metric dominates (size, position, color)
- Progressive disclosure (summary → detail)
- Logical grouping of related metrics

### 2. Consistent Design System

- Same fonts throughout
- Unified color palette (max 5-7 colors)
- Consistent chart styles
- Aligned elements on grid

### 3. Minimize Cognitive Load

- Remove non-essential elements
- Max 8-12 metrics visible (more = overwhelming)
- Use whitespace generously
- Direct labeling > legends

### 4. Accessibility (WCAG 2.1 AA)

- 4.5:1 contrast for text
- 3:1 contrast for graphics
- Don't use color alone (add labels, icons)
- Works in grayscale

**Source:** UXPin, Google Material Design, WCAG 2.1

## Dashboard Layout Patterns

### Executive Summary (2×2 Grid)

```
┌─────────────┬─────────────┐
│  Primary    │  Secondary  │
│  KPI #1     │  KPI #2     │
│  (large)    │  (large)    │
├─────────────┼─────────────┤
│  Trend      │  Comparison │
│  (line)     │  (bar)      │
└─────────────┴─────────────┘

Use: Executive dashboards, strategic overview
Charts: 1-2 KPI cards + 2 supporting charts
```

### Operational Monitor (3-column)

```
┌────┬──────────┬──────────┐
│KPI │ KPI      │ KPI      │
│#1  │ #2       │ #3       │
├────┴──────────┴──────────┤
│  Real-time Line Chart    │
│  (full width)            │
├──────────┬───────────────┤
│ Status   │ Recent        │
│ Table    │ Activity      │
└──────────┴───────────────┘

Use: Operations monitoring, real-time tracking
Charts: 3 KPIs + 1 trend + 2 detail views
```

### Analytical Deep Dive (Complex)

```
┌─────────────────────────────┐
│  Primary Insight (headline) │
├────────┬────────┬───────────┤
│  KPI   │  KPI   │  KPI      │
├────────┴────────┴───────────┤
│  Main Visualization (large) │
│  (line, bar, scatter)       │
├──────────┬──────────────────┤
│Secondary │  Breakdown       │
│Chart     │  Table           │
└──────────┴──────────────────┘

Use: Analytical reports, deep analysis
Charts: 3 KPIs + 1 main chart + 2 supporting
```

## Prompt Construction

### Dashboard Template

```
[STYLE] dashboard displaying [METRICS OVERVIEW]. [BACKGROUND] background with
card-based layout. [NUMBER] distinct sections in [CARD COLOR] rounded panels
(12px radius, subtle borders).

Top section: [PRIMARY KPI] in large [SIZE]pt [FONT], value [KPI VALUE] with
[TREND INDICATOR].

[CHART 1]: [TYPE] showing [METRIC] in [COLOR] using [DESCRIPTION].
[CHART 2]: [TYPE] comparing [CATEGORIES] in [COLORS] with [DETAILS].
[CHART 3]: [TYPE] tracking [TIMELINE DATA] in [COLOR].

All text in [TEXT COLOR] using [FONT FAMILY]. Headers in [WEIGHT] [SIZE]pt.
Grid layout with [PADDING]px padding, [GUTTER]px gutters. Consistent [COLOR SCHEME]
throughout. Clean professional dashboard, [AESTHETIC STYLE]. High contrast for
readability, WCAG AA compliant.

Negative: cluttered, overwhelming, too many metrics, poor hierarchy, low contrast,
chart junk, 3D effects, decorative elements, inconsistent styling, hard to scan
```

### Example: Executive Dashboard (Muted Professional)

```
Professional executive dashboard showing Q4 2024 business performance. White
background (#FFFFFF) with light gray card panels (#F8F9FA, 8px rounded corners,
1px #E5E7EB border). 2×2 grid layout, 24px gutters.

Top-left: Primary KPI card "Total Revenue" with large value "$12.5M" in navy
blue (#1E3A8A, SemiBold Inter 48pt), green trend arrow "↑ +23% vs Q3" in
muted green (#059669, Medium 16pt).

Top-right: Secondary KPI "New Customers" showing "2,847" in navy (40pt) with
small sparkline in muted blue showing 30-day trend.

Bottom-left: Clean bar chart comparing regional sales (5 navy bars) with
Y-axis "Revenue ($M)" and data labels above bars.

Bottom-right: Line graph showing quarterly revenue trend 2024 (navy line, 2px)
with annotations at key quarters.

All headers in Medium Inter 16pt (#1F2937). Grid-aligned, generous whitespace,
clean professional business dashboard, executive summary quality, WCAG AA compliant.

Negative: cluttered, overwhelming, 3D charts, decorative backgrounds, chart junk,
low contrast, too many colors, inconsistent styling, hard to read, casual informal
```

**Tool:** gpt-image-1
**Score target:** 9.0+ (executive quality)

### Example: Analytics Dashboard (Dark Mode)

```
Dark mode analytics dashboard showing product engagement metrics. Near-black
background (#0B0B0B) with dark card panels (#1F2937, 12px rounded, 1px #374151
border). Modern tech dashboard layout.

Top row: Three KPI cards side-by-side. "Active Users: 15.2K" in neon cyan
(#00F5FF, Roboto Mono 36pt), "Session Duration: 8.4min" in hot pink (#FF006E),
"Conversion Rate: 3.7%" in mint green (#00FF9F). Each with small trend sparkline.

Middle: Full-width line graph showing 7-day hourly active users, neon cyan line
(#00F5FF, 2px) with subtle glow effect, dark gridlines (#374151), X-axis in
light gray (#D1D5DB).

Bottom left: Heatmap showing feature usage (neon gradient from cyan to pink).
Bottom right: Bar chart showing top features in mint green bars.

All text off-white (#F9FAFB), Inter font, monospace numbers. Modern SaaS
dashboard aesthetic, tech product quality, high contrast dark mode, clean
professional interface.

Negative: light background, muted colors, low contrast, corporate formal,
hand-drawn, casual, 3D effects, chart junk, traditional business, hard to read
```

**Tool:** gpt-image-1
**Score target:** 8.5+ (product quality)

## Design Patterns (Research-Based)

### The 5-Second Rule

Dashboard must communicate key insights in 5 seconds or less.

**Achieve through:**

- Clear visual hierarchy
- Large primary metrics
- Minimal clutter
- Direct labeling
- Insight-driven titles

**Source:** UXPin Dashboard Design Principles

### Progressive Disclosure

Don't show everything at once.

**Levels:**

1. Headline KPIs (always visible)
2. Supporting trends (primary view)
3. Detailed breakdown (expandable/filterable)
4. Raw data (table, export option)

**Source:** Nielsen Norman Group, UX principles

### F-Pattern Layout

Users scan in F-pattern (especially Western audiences):

```
F → Top horizontal (most attention)
F → Second horizontal (medium attention)
│ → Left vertical (scanning down left side)

Place most important metrics in F-pattern hotspots.
```

**Source:** Eye-tracking studies, UX research

## Accessibility Requirements

**WCAG 2.1 Level AA for dashboards:**

**Visual:**

- All text: 4.5:1 contrast minimum
- Chart elements: 3:1 contrast
- Color-blind safe palette
- Dual encoding (color + label)

**Structure:**

- Logical reading order
- Clear section headers
- Consistent navigation
- Alt text for each chart

**Cognitive:**

- Limit to 8-12 visible metrics
- Clear grouping of related data
- Minimal chart junk
- Progressive disclosure

**Testing:**

- Colorblind simulation
- Grayscale conversion
- Small screen view (mobile)
- 5-second comprehension test

## Common Mistakes

1. **Too many metrics** (>12 = overwhelming)
2. **No visual hierarchy** (everything same size)
3. **Inconsistent styling** (different fonts/colors per chart)
4. **Poor grouping** (unrelated metrics adjacent)
5. **Missing context** (no time periods, no targets)
6. **Chart junk** (decorative elements, 3D, shadows)
7. **Color overload** (rainbow palette)
8. **Tiny text** (unreadable at dashboard scale)
9. **No whitespace** (cramped, cluttered)
10. **Unclear purpose** (what decisions does this support?)

## Quality Checklist

Dashboard-specific evaluation:

- ✅ **5-second test**: Key insight clear in 5 seconds?
- ✅ **Hierarchy clear**: Most important metric dominates?
- ✅ **Consistent style**: Unified design system?
- ✅ **Appropriate charts**: Right chart types for each metric?
- ✅ **Readable text**: All labels legible?
- ✅ **WCAG compliant**: Accessibility validated?
- ✅ **Logical grouping**: Related metrics together?
- ✅ **Whitespace used**: Not cramped or cluttered?
- ✅ **Context provided**: Time periods, targets shown?
- ✅ **Actionable**: Supports specific decisions?

## Tool-Specific Guidance

### For gpt-image-1 (Recommended)

```
Strengths:
- Handles multiple text labels (many charts = many labels)
- Precise layout and alignment
- Complex multi-chart compositions
- Professional polish

Use for: Executive dashboards, analytical dashboards, professional contexts
```

### For nanobanana

```
Strengths:
- Quick iterations for layout testing
- Good for simpler dashboards (3-6 metrics)

Weaknesses:
- May struggle with many precise labels
- Alignment less perfect

Use for: Draft dashboards, simpler operational views
```

## Combining with Styles

### Muted Professional + Dashboard

```
Clean corporate multi-chart layout, white background, navy/gray palette,
precise typography, business intelligence quality.

Perfect for: Executive reviews, board presentations, business reports
Tool: gpt-image-1
```

### Dark Mode Analytics + Dashboard

```
Dark background, neon accent charts, modern tech UI, SaaS product style,
card-based layout with subtle elevation.

Perfect for: Product analytics, developer tools, tech dashboards
Tool: gpt-image-1
```

### Minimalist Modern + Dashboard

```
Elegant spacious layout, monochrome + single accent, generous whitespace,
sophisticated typography, high-end design.

Perfect for: Portfolio showcases, design-focused presentations
Tool: gpt-image-1
```

## Example Dashboard Prompts

### Executive Summary Dashboard

```
Professional executive dashboard, 2×2 grid layout on white background (#FFFFFF).
Light gray cards (#F8F9FA, 8px rounded corners) with subtle borders (#E5E7EB).

Top-left card: "Revenue" KPI showing "$12.5M" in navy blue (SemiBold Inter 48pt)
with green up arrow "↑ 23%" and small sparkline.

Top-right card: "New Customers: 2,847" in navy (40pt) with mini bar chart
showing monthly breakdown.

Bottom-left: Clean bar chart with 5 navy bars comparing regional sales, Y-axis
labeled "Revenue ($M)", data labels above bars, title "West Leads at $3.2M".

Bottom-right: Line graph showing quarterly revenue trend (navy line, 2px thick)
with 4 data points (Q1-Q4), annotation at Q4 "Record Quarter".

Grid: 12-column, 24px gutters, 32px outer margins. All text Medium Inter in
dark gray (#1F2937). Clean corporate design, executive summary quality, high
contrast WCAG AA compliant.

Negative: cluttered, too many metrics, poor hierarchy, 3D charts, chart junk,
low contrast, decorative elements, inconsistent fonts, overwhelming, hard to scan
```

### Tech Analytics Dashboard (Dark Mode)

```
Dark mode product analytics dashboard on near-black background (#0B0B0B). Three
cards in dark gray (#1F2937) with 12px rounded corners, 1px #374151 borders.

Top row (3 KPI cards side-by-side):
- "Active Users: 15.2K" in neon cyan (#00F5FF, Roboto Mono 36pt) with up arrow
- "Avg Session: 8.4min" in hot pink (#FF006E) with trend indicator
- "Conversion: 3.7%" in mint green (#00FF9F) with mini sparkline

Middle (full-width): Line graph showing 7-day hourly active users, neon cyan line
(#00F5FF, 2px) on dark background, subtle gridlines (#374151), off-white labels.

Bottom (2 cards):
- Left: Horizontal bar chart "Top Features" in mint green bars (#00FF9F)
- Right: Small table showing recent activity in off-white text (#F9FAFB)

Modern tech dashboard, Inter font, monospace for numbers, 12-column grid, 32px
padding. SaaS product quality, dashboard interface standard, high contrast on dark.

Negative: light background, muted colors, corporate formal, low contrast, hand-drawn,
casual, traditional charts, 3D effects, chart junk, illegible text, overwhelming
```

## Research-Backed Best Practices

**From UXPin (2025):**

1. Define purpose before designing
2. Know your audience (exec vs analyst vs operator)
3. Establish clear visual hierarchy
4. Maintain design consistency
5. Minimize cognitive load
6. Make data accessible and usable
7. Incorporate accessibility standards
8. Iterate based on user testing

**From Dashboard Design Principles:**

- **Clarity**: Users interpret data quickly
- **Flexibility**: Customization and filters
- **Responsiveness**: Adapts to different screens

**From Material Design:**

- Group related metrics
- Use color purposefully
- Provide context (time periods, targets)
- Enable comparison (benchmarks, historical)

## Quality Evaluation

Dashboard-specific criteria:

1. **5-second clarity (1-10)**: Key insight immediate?
2. **Visual hierarchy (1-10)**: Clear importance levels?
3. **Layout balance (1-10)**: Well-distributed, not cramped?
4. **Chart variety (1-10)**: Appropriate mix of types?
5. **Consistency (1-10)**: Unified design system?
6. **Readability (1-10)**: All text and charts clear?
7. **Context provision (1-10)**: Time, targets, benchmarks shown?
8. **Accessibility (1-10)**: WCAG 2.1 compliant?
9. **Actionability (1-10)**: Supports decision-making?
10. **Professional polish (1-10)**: Publication-ready?

**Target: 8.5+ average** (dashboard quality premium)

## Integration with Other Chart Types

Dashboards typically combine:

- **KPI cards** (large numbers)
- **Bar charts** (comparisons)
- **Line graphs** (trends)
- **Pie/donut charts** (proportions - sparingly)
- **Tables** (detailed data)
- **Heatmaps** (patterns)

**Each component follows its chart-type guide** but uses unified dashboard aesthetic.

**Example:**

```
Dashboard using muted-professional style:
  - KPI cards use navy (#1E3A8A)
  - Bar chart follows bar-charts.md structure
  - Line graph follows line-graphs.md structure
  - All use same color palette
  - All use same Inter typography
  - Unified professional aesthetic
```

## Sources and Research

**Design principles:**

- UXPin: "Effective Dashboard Design Principles for 2025"
- Material Design: Dashboard Guidelines
- Nielsen Norman Group: Dashboard Usability

**Accessibility:**

- WCAG 2.1: Level AA requirements for dashboards
- Google: Data Visualization Accessibility
- WebAIM: Dashboard A11y Standards

**Industry examples:**

- Tableau Desktop layouts
- Grafana dashboards
- Google Analytics interface
- Datadog monitoring
- Stripe Dashboard

This guide synthesizes enterprise dashboard best practices for generating effective multi-metric displays that communicate clearly and support decision-making.
