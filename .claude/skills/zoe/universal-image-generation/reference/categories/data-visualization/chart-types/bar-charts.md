# Bar Charts - Comparing Categories

## Overview

Bar charts use length/height to represent values, making them ideal for comparing discrete categories. One of the most intuitive and commonly used chart types. Effective for showing rankings, comparisons, and categorical data.

**Research sources:** Datawrapper, Tableau, Hands-On Data Visualization, Cleveland & McGill (1985)

## When to Use Bar Charts

**Best for:**

- Comparing different categories (sales by region, products by revenue)
- Showing rankings (top 10 lists, leaderboards)
- Displaying survey results (categorical responses)
- Before/after comparisons
- Any categorical data with numerical values

**Data requirements:**

- At least 1 categorical variable (categories)
- 1 quantitative variable (values to compare)
- Works with 2-20 categories (more = harder to read)

**Choose bar over column when:**

- Long category labels (easier to read horizontally)
- Many categories (vertical scrolling better than horizontal)
- Small screen optimization (bars grow down, not right)

## Mandatory Rules

### 1. ALWAYS Start at Zero

**Non-negotiable:** Bar charts MUST have zero baseline.

**Why:** Bar length represents value. Starting at non-zero distorts perception.

**Example:**

```
❌ WRONG: Y-axis starts at 50
   → Bar showing 75 appears 5× larger than bar showing 60
   → Actual difference: 25% but looks like 500%

✅ CORRECT: Y-axis starts at 0
   → Bar showing 75 is actually 25% taller than 60
   → Visual matches reality
```

**Source:** Edward Tufte, Alberto Cairo, Hands-On Data Visualization

This is the #1 rule for bar charts - no exceptions.

### 2. Consistent Bar Width

All bars should have identical width. Varying widths confuses readers about what's being compared.

### 3. Logical Ordering

Arrange bars by:

- **Value** (descending = most common): Shows rankings clearly
- **Alphabetical**: Easy lookup when many categories
- **Chronological**: If categories represent time periods
- **Custom**: Domain-specific logic (North to South, etc.)

**Default: Sort by value (largest to smallest)** unless natural order exists.

## Structure Requirements

### Essential Elements

**1. Axes:**

- **Y-axis** (vertical): Value axis with clear units
  - Label: "Revenue (Millions $)" not just "Revenue"
  - Tick marks: Natural intervals (0, 20, 40, 60, 80, 100)
  - Start at zero (mandatory)
- **X-axis** (horizontal): Category labels
  - Clear, concise category names
  - Horizontal text (don't rotate 90° if possible)
  - If labels too long → use horizontal bars instead

**2. Data Labels (highly recommended):**

- Numbers ON or NEXT to bars
- Reduces need for Y-axis reading
- Enables precise value reading
- Format: Add commas for thousands (1,250 not 1250)

**3. Title (insight-driven):**

- ❌ "Sales by Region" (descriptive)
- ✅ "Western Region Leads Sales with $2.5M" (insight)

**4. Gridlines (optional, subtle):**

- Horizontal only (help read values)
- Very light gray (#F3F4F6 or lighter)
- Or remove entirely if using data labels

**5. Legend (if multi-series):**

- Place top-right or bottom
- Or better: Direct labeling of each series

### Bar Specifications

**Spacing:**

- Bar width: 60-70% of available space
- Gap between bars: 30-40% of bar width
- Grouped bars: 10-20% gap within group, 40% between groups

**Styling:**

- Solid fills (no gradients)
- Slight rounding optional (2-4px radius for modern look)
- No 3D effects
- No drop shadows (chart junk)

## Variations

### Horizontal Bar Charts

```
Use when:
- Long category labels (easier to read left-aligned text)
- Many categories (7+ works better horizontally)
- Small screens (vertical scrolling natural)

Benefits:
- Text always horizontal (never rotated)
- Better use of mobile screen space
- Natural top-to-bottom ranking
```

### Stacked Bar Charts

```
Use when:
- Showing subcategories within categories
- Comparing totals AND composition
- Part-to-whole with multiple categories

Rules:
- Largest segments at bottom (stability)
- Consistent color per subcategory across all bars
- Only 2-5 subcategories (more = hard to compare)
- Consider grouped bars if comparing subcategories matters more
```

### Grouped Bar Charts

```
Use when:
- Comparing 2-3 values within each category
- Subcategory comparison more important than totals
- Side-by-side comparison needed

Rules:
- Max 3 series side-by-side
- Consistent colors across all groups
- Small gaps within groups, larger gaps between
```

### Split Bar Charts

```
Use when:
- Showing positive/negative values
- Profit/loss analysis
- Deviation from baseline
- Bidirectional comparisons

Rules:
- Zero line clearly marked in center
- Positive one direction, negative opposite
- Mirror formatting for symmetry
```

## Prompt Construction

### Basic Bar Chart Prompt Template

```
[STYLE] bar chart showing [DATA DESCRIPTION]. [BACKGROUND COLOR] background.
[NUMBER] vertical bars in [PRIMARY COLOR], representing [CATEGORIES].
Y-axis labeled "[METRIC] ([UNITS])", scale from 0 to [MAX] with [INCREMENT]
intervals. X-axis shows [CATEGORY LABELS]. Value labels in [LABEL COLOR]
displayed [ON/ABOVE] each bar showing exact values with comma separators.
Title: "[INSIGHT-DRIVEN TITLE]" in [TITLE TREATMENT]. [GRIDLINES DESCRIPTION].
Clean professional typography, [FONT FAMILY]. High contrast for readability.

Negative: 3D effects, shadows, gradients, decorative elements, chart junk,
non-zero baseline, rotated labels, cluttered, low contrast
```

### Example Filled Template

```
Clean corporate bar chart showing Q4 2024 regional sales performance. White
background (#FFFFFF). 5 vertical bars in navy blue (#1E3A8A) with 2px rounded
corners, representing North, South, East, West, Central regions. Y-axis labeled
"Revenue (Millions $)", scale from 0 to 3.0 with 0.5M intervals in medium gray
(#6B7280). X-axis shows region names in dark gray (#1F2937), horizontal text.
Value labels in navy displaying exact amounts ($2.5M, $1.8M, $2.1M, $1.2M, $1.6M)
positioned above each bar. Title: "Western Region Leads Q4 Sales at $2.5M" in
SemiBold Inter font. Subtle horizontal gridlines in light gray (#F3F4F6). Clean
professional sans-serif typography throughout. High contrast WCAG AA compliant.

Negative: 3D bars, drop shadows, gradient fills, decorative backgrounds,
non-zero baseline, rotated axis labels, chart junk, cluttered, colorful
backgrounds, artistic styling, low contrast, hand-drawn casual
```

## Accessibility Requirements (WCAG 2.1 AA)

**Contrast ratios:**

- Text on background: 4.5:1 minimum
  - #1F2937 on #FFFFFF = 12.63:1 ✅
- Bars on background: 3:1 minimum
  - #1E3A8A on #FFFFFF = 8.59:1 ✅
- Different bars from each other: 3:1 minimum
  - Use different colors OR patterns if needed

**Dual encoding (don't rely on color alone):**

- Add data labels with numbers
- Use patterns if multiple series
- Direct labeling preferred

**Testing:**

- Validate with Color Oracle (colorblind simulation)
- Check grayscale conversion (should still be clear)
- Test readability at 50% size

## Common Mistakes to Avoid

1. **Starting Y-axis above zero** - Distorts comparisons (CRITICAL ERROR)
2. **Too many categories** - Max 15-20 bars, use filtering/grouping
3. **Rotated X-axis labels** - Use horizontal bars instead
4. **3D bars** - Makes comparison harder, adds chart junk
5. **Dual Y-axes** - Confusing, use separate charts
6. **Missing units** - Always specify what numbers represent
7. **Poor color choices** - Red/green combos (colorblind issue)
8. **No data labels** - Forces reading from axis (slower)
9. **Too many decimal places** - Round to 1-2 decimals
10. **Gridline overload** - Keep subtle or remove

## Quality Checklist

For bar chart generation, verify:

- ✅ Y-axis starts at 0 (mandatory)
- ✅ All bars same width
- ✅ Logical order (by value unless natural order)
- ✅ Clear axis labels with units
- ✅ Data labels on/near bars
- ✅ Insight-driven title
- ✅ WCAG 2.1 AA contrast
- ✅ No chart junk (3D, shadows, gradients)
- ✅ Readable at reduced size (test at 50%)
- ✅ Works in grayscale

## Tool-Specific Guidance

### For gpt-image-1 (Recommended)

```
Strengths:
- Perfect for precise bar alignment
- Excellent text rendering (data labels)
- Clean professional aesthetic
- Multiple labels handled well

Prompt emphasis:
- "precise vertical alignment"
- "clean professional bars"
- "data labels clearly visible"
- "sharp text rendering"
```

### For nanobanana

```
Strengths:
- Fast iteration
- Good for simple bar charts
- Cost-effective

Weaknesses:
- May struggle with perfect alignment
- Text rendering less precise

Use for: Quick drafts, simple comparisons
```

## Examples by Style

### Muted Professional + Bar Chart

```
Corporate navy bars, white background, clean Inter typography,
subtle gridlines, data labels above bars, formal composition.

Perfect for: Executive reports, business reviews
```

### tldraw + Bar Chart

```
Hand-drawn bars with slight wobble, warm earth tones, casual
hand-written labels, whiteboard aesthetic, organic spacing.

Perfect for: Blog posts, casual explanations
```

### Vibrant Presentation + Bar Chart

```
Bold saturated colors, high energy palette, large impactful numbers,
minimal gridlines, attention-grabbing design.

Perfect for: Sales presentations, marketing decks
```

### Dark Mode Analytics + Bar Chart

```
Dark background (#0B0B0B), neon accent bars (#00F5FF, #FF006E),
tech aesthetic, modern sans-serif, dashboard-ready.

Perfect for: Analytics dashboards, tech products
```

## Research Citations

**Chart type selection:**

- Datawrapper (2025): "Bar Charts Guide"
- Tableau: "Which Chart or Graph is Right for You"
- Hands-On Data Visualization: "Chart Design Principles"

**Accessibility standards:**

- WCAG 2.1: Non-Text Contrast (3:1) and Text Contrast (4.5:1)
- Google Material Design: Data Visualization Accessibility
- Smashing Magazine (2024): Accessibility Standards for Charts

**Cognitive research:**

- Cleveland & McGill (1985): "Graphical Perception" - Position along common scale easiest to compare
- Validates bar charts as most accurate for comparisons

This guide combines proven best practices with accessibility requirements for generating effective bar charts.
