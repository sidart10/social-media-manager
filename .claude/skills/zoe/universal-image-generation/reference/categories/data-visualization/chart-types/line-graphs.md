# Line Graphs - Showing Trends Over Time

## Overview

Line charts connect data points to show continuous change over time. Essential for revealing trends, patterns, and temporal relationships. One of the most intuitive ways to show how something evolves.

**Research sources:** Datawrapper, Tableau, Hands-On Data Visualization, Alberto Cairo

## When to Use Line Graphs

**Best for:**
- Trends over time (stock prices, website traffic, temperature)
- Continuous data showing evolution
- Time-series analysis
- Comparing multiple trends simultaneously
- Showing rates of change
- Forecasting and predictions

**Data requirements:**
- 1 continuous variable for X-axis (usually time/date)
- 1+ quantitative variables for Y-axis (metrics to track)
- Sequential data points (chronological order)

**Choose line over bar when:**
- Showing continuous progression (not discrete points)
- Emphasizing shape and trajectory of change
- Many data points (50+ points work on line, not bar)
- Trend more important than individual values

## Key Characteristics

### Line charts represent VALUE through POSITION and ANGLE

**Critical difference from bar charts:**
- Bar charts: Use LENGTH/HEIGHT (must start at zero)
- Line charts: Use POSITION/SLOPE (zero baseline optional)

**This means:**
- Starting above zero is ACCEPTABLE for line charts
- Adjusting Y-axis to match data range often BETTER
- Focus on shape/trend, not distance from baseline

**Source:** Alberto Cairo "How Charts Lie" (2019)

## Structure Requirements

### Essential Elements

**1. X-Axis (Time Dimension):**
- Always represents time or sequential progression
- Labels: Clear date format (Jan 2024, Q1 2024, Week 1)
- Tick marks: Logical intervals (every month, every quarter)
- Grid lines: Vertical optional (usually omitted)

**2. Y-Axis (Value Dimension):**
- Label with units: "Revenue ($M)", "Users (thousands)"
- Scale: Match data range (don't force zero if hides changes)
- Tick marks: Round numbers (0, 25, 50, 75, 100)
- Grid lines: Horizontal useful (light gray, subtle)

**3. Line Treatment:**
- Thickness: 2-3px for single line, 1.5-2px for multiple
- Style: Solid for actual data, dashed for projections/goals
- Color: High contrast with background
- Smooth curves OR straight segments (depends on data)

**4. Data Points (optional):**
- Dots/circles at each value
- Helpful for sparse data (few points)
- Skip for dense data (50+ points = cluttered)
- Size: 4-6px radius

**5. Title:**
- Insight-driven statement of trend
- ❌ "Website Traffic Over Time"
- ✅ "Website Traffic Doubled After Campaign Launch"

**6. Annotations (powerful):**
- Mark key events ("Campaign launch", "Product release")
- Vertical lines or text callouts
- Explain spikes, drops, inflection points

### Line Specifications

**For single-line charts:**
- Thickness: 2-3px
- Color: Bold, high contrast (#2563EB, #1E3A8A)
- Emphasize through color and thickness

**For multi-line charts:**
- Thickness: 1.5-2px each
- Colors: Distinct but harmonious
- Max 5 lines (more = "spaghetti chart")
- Consider small multiples if 5+ lines

## Variations

### Multiple Line Charts
```
Use when:
- Comparing 2-5 trends simultaneously
- Related metrics (revenue vs costs)
- Multiple categories over same timeframe

Rules:
- Different color per line
- Direct labeling (label at line end) > legend
- Max 5 lines before considering small multiples
- Ensure lines don't overlap excessively
```

### Small Multiples (Panel Charts)
```
Use when:
- 5+ categories to compare
- Avoid spaghetti chart problem
- Show many trends clearly

Structure:
- One mini line chart per category
- Same axes across all panels
- Grid layout (2×3, 3×3, etc.)
- Shared Y-axis for comparability
```

### Area Charts
```
Use when:
- Emphasizing magnitude AND trend
- Showing cumulative totals
- Part-to-whole over time (stacked areas)

Rules:
- Semi-transparent fills
- Clear line at top of area
- Start at zero baseline (areas use height)
```

### Slope Charts
```
Use when:
- Only start and end points matter
- Change over 2 time points
- Multiple categories changing

Structure:
- Remove all middle points
- Connect start to end with straight line
- Emphasize magnitude of change
```

## Baseline Flexibility

**Unlike bar charts, line charts DON'T require zero baseline:**

**Example scenarios:**

**Temperature over time:**
```
Data range: 15°C to 25°C
Zero-baseline chart: Line appears flat at top (useless)
Adjusted baseline (10-30°C): Shows variation clearly (better)

✅ Adjust Y-axis to match data range
```

**Stock price:**
```
Data range: $145 to $165
Zero-baseline: Minimal visible change
Adjusted (140-170): Clear trend visible

✅ Focus on price movement, not distance from $0
```

**When to use zero baseline on line charts:**
```
- If showing growth from zero (startup users 0 → 1000)
- If magnitude from zero matters (total sales accumulation)
- If comparing to zero is meaningful

Otherwise: Adjust to data range for clarity
```

**Source:** Alberto Cairo, Hands-On Data Visualization

## Prompt Construction

### Basic Line Graph Template

```
[STYLE] line chart showing [METRIC] over [TIME PERIOD]. [BACKGROUND] background.
Single [COLOR] line ([THICKNESS]px) tracking [DESCRIPTION] from [START] to [END].
X-axis labeled "[TIME UNIT]" with [INTERVAL] intervals showing [TIME LABELS].
Y-axis labeled "[METRIC] ([UNITS])" scaling from [MIN] to [MAX] with [INCREMENT]
increments. [GRIDLINES DESCRIPTION]. Title: "[INSIGHT-DRIVEN TITLE]" in
[TYPOGRAPHY]. [ANNOTATIONS IF ANY]. Clean professional design, [FONT FAMILY].
High contrast for clarity.

Negative: 3D effects, unnecessary decorations, chart junk, cluttered gridlines,
poor contrast, illegible text, decorative fonts
```

### Example: Single Line - Professional

```
Clean corporate line chart showing monthly website traffic for 2024. White
background (#FFFFFF). Single navy blue line (2.5px thickness, #1E3A8A) tracking
unique visitors from January to December. X-axis labeled "2024" with monthly
intervals (Jan, Feb, Mar... Dec) in dark gray (#1F2937). Y-axis labeled
"Visitors (thousands)" scaling from 0 to 150 with 30k increments in medium
gray (#6B7280). Subtle horizontal gridlines in very light gray (#F3F4F6).
Vertical annotation line at May with text "Campaign Launch +42%" in muted
green (#059669). Title: "Traffic Doubled After May Campaign Launch" in
SemiBold Inter 24pt. Clean minimal design, professional sans-serif typography.
WCAG AA compliant contrast.

Negative: 3D effects, drop shadows, gradients, decorative backgrounds,
busy gridlines, chart junk, low contrast, decorative fonts, artistic styling,
hand-drawn casual
```

### Example: Multiple Lines - Comparison

```
Professional multi-line chart comparing 3 product revenue streams over 2024.
White background. Three lines: Product A in navy (#1E3A8A, 2px), Product B
in muted green (#059669, 2px), Product C in amber (#F59E0B, 2px). X-axis shows
months (Jan-Dec) in dark gray. Y-axis "Revenue ($M)" from 0 to 5M with 1M
increments. Each line directly labeled at end point with product name and
final value. Subtle horizontal gridlines (#F3F4F6). Title: "Product A Revenue
Surpasses B and C Combined in Q4" in SemiBold Inter. Clean professional design,
high contrast, clear differentiation between lines.

Negative: spaghetti chart, too many lines, confusing overlaps, poor contrast,
chart junk, 3D effects, gradients, decorative elements, low readability
```

## Accessibility Requirements

**WCAG 2.1 Level AA:**

**Color contrast:**
- Lines against background: 3:1 minimum
- Multiple lines from each other: 3:1 minimum
- Text labels: 4.5:1 minimum

**Dual encoding (for multiple lines):**
- Different colors + Direct labels at line ends
- OR Different colors + Line styles (solid, dashed, dotted)
- Never rely on color alone

**Testing:**
- Simulate protanopia, deuteranopia, tritanopia
- Verify lines distinguishable in grayscale
- Check small size readability (mobile view)

## Combining with Styles

### Muted Professional + Line Graph
```
Clean corporate line, subtle colors, precise rendering,
professional typography, minimal gridlines.

Tool: gpt-image-1
Best for: Business reports, executive dashboards
```

### tldraw + Line Graph
```
Hand-drawn sketchy line, imperfect organic curve, warm
earth tones, casual hand-written labels, whiteboard style.

Tool: nanobanana
Best for: Casual explanations, blog posts
```

### Dark Mode Analytics + Line Graph
```
Dark background, neon accent lines, tech aesthetic,
modern sans-serif, dashboard ready.

Tool: gpt-image-1
Best for: Product analytics, tech dashboards
```

### Vibrant Presentation + Line Graph
```
Bold saturated line colors, high energy, large numbers,
attention-grabbing, sales presentation style.

Tool: nanobanana
Best for: Marketing presentations, pitch decks
```

## Advanced Patterns

### Sparklines
```
Tiny line charts without axes, labels, or gridlines
- Show trend only (no specific values)
- Embedded in tables or text
- 50-100px wide × 20-30px tall
- Single color, minimal design

Use: Dashboard KPI cards, table columns
```

### Confidence Intervals
```
Show uncertainty in data:
- Main line for central estimate
- Shaded area for confidence range
- Semi-transparent fill
- Explain in title/note

Use: Statistical data, predictions, forecasts
```

### Dual-Axis Charts (Use Sparingly)
```
Two Y-axes for different units/scales
- Left axis: Primary metric
- Right axis: Secondary metric (different scale)
- WARNING: Can be misleading
- Only if metrics related but different units

Alternative: Use two separate charts (usually better)
```

## Quality Evaluation

Specific criteria for line graphs:

1. **Trend clarity (1-10)**: Direction/shape immediately clear?
2. **Scale appropriateness (1-10)**: Y-axis range shows variation?
3. **Temporal context (1-10)**: Time period clear and complete?
4. **Annotation value (1-10)**: Key insights highlighted?
5. **Multi-line clarity (1-10)**: Lines distinguishable? (if applicable)
6. **Accessibility (1-10)**: WCAG compliant, colorblind-safe?
7. **Professional quality (1-10)**: Publication-ready?

**Target: 8.0+ average**

## Common Use Cases

**Business metrics:**
- Revenue over quarters
- User growth month-over-month
- Conversion rate trends
- Market share evolution

**Scientific data:**
- Temperature changes
- Population growth
- Experimental results over time
- Climate data

**Analytics:**
- Website traffic
- App engagement metrics
- Performance monitoring
- A/B test results

## Research-Backed Guidelines

**From Datawrapper (2025):**
- Line charts most intuitive for time-series
- Use multiple lines with caution (max 5)
- Consider small multiples for many categories

**From Hands-On Data Visualization:**
- Position and angle encode value (not height)
- Zero baseline flexible (unlike bars)
- Annotations add crucial context

**From UXPin Dashboard Design:**
- Real-time data suits line charts
- Interactive filtering enhances usability
- Clear hierarchy essential for multi-line

**From WCAG 2.1:**
- 3:1 contrast minimum for lines
- Dual encoding required (color + labels)
- Alt text must describe trend

This guide provides research-validated standards for generating effective line graphs that communicate trends clearly and accessibly.
