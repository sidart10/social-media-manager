# Design Systems - Complete Reference

**Platform-specific and universal design systems for image generation**

---

## Overview

This document defines three core design systems used across platforms, plus guidelines for custom systems.

**Core Systems:**
1. **Dark Monochrome Tech** (LinkedIn default)
2. **Vibrant Social** (Instagram default)
3. **Bold & Concise** (Twitter default)

---

## 1. Dark Monochrome Tech (LinkedIn)

### Purpose
Professional, enterprise-grade aesthetic for B2B content, technical diagrams, and thought leadership.

### Color Specification

**Backgrounds:**
```
Primary: #0B0B0B (deep black)
Cards: #181818 (dark gray)
Borders: #2C2C2C (subtle gray lines)
```

**Text:**
```
Primary: #FFFFFF (white)
Secondary: #D4D4D4 (light gray)
Tertiary: #A0A0A0 (medium gray)
Disabled: #666666 (darker gray)
```

**Accent Colors:**
```
Default: #4ADE80 (green)
Alt 1: #60A5FA (blue)
Alt 2: #FBBF24 (amber)
Warning: #EF4444 (red)
Success: #10B981 (green)
```

**Texture & Effects:**
```
Noise overlay: 3% opacity
Gradient: Dark to darker (subtle)
Vignette: Edge darkening (optional)
Shadow: None or very subtle
```

### Typography

**Font Stack:**
```
Primary: Inter, -apple-system, system-ui, sans-serif
Monospace: SF Mono, Consolas, Monaco, monospace
```

**Weights:**
```
Light: 300 (primary choice - elegant, modern)
Regular: 400 (supporting text)
Medium: 500 (emphasis, buttons)
Bold: 700 (rare, critical emphasis only)
```

**Type Scale:**
```
Hero: 72pt (main titles, key messages)
H1: 56pt (section headings)
H2: 40pt (sub-sections)
H3: 28pt (sub-headings)
Body: 22pt (main content, descriptions)
Caption: 16pt (labels, attribution)
```

**Line Height:**
```
Headlines: 1.1-1.2 (tight, impactful)
Body: 1.5-1.6 (readable)
Captions: 1.4
```

**Letter Spacing:**
```
Headlines: -0.02em (slightly tighter)
Body: Normal (0)
Captions: Normal (0)
All caps: +0.05em (looser for readability)
```

### Layout System

**Grid:**
```
Columns: 12-column grid
Gutter: 24px between columns
Margin: 96px horizontal, 72px vertical (top/bottom)
Breakpoints: N/A (static image)
```

**Spacing Scale:**
```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
Use multiples of 8 for consistency
```

**Negative Space:**
```
Minimum: 35% of canvas
Optimal: 40-50%
Maximum: 60% (very minimal designs)
```

**Alignment:**
```
Text: Left-aligned (easier to read)
Titles: Center-aligned (optional)
Elements: 12-column grid alignment
```

### Components

**Cards:**
```
Background: #181818
Border: 1px solid #2C2C2C
Border radius: 8-12px
Padding: 32-48px
Shadow: None or subtle
```

**Buttons (if needed):**
```
Primary: #4ADE80 background, #0B0B0B text
Secondary: Transparent background, #FFFFFF border
Size: 48px height minimum
Padding: 16px horizontal
```

**Icons:**
```
Style: Line icons (not filled)
Stroke width: 2px
Size: 24px or 32px
Color: #FFFFFF or accent
```

### Accessibility

**WCAG AAA Compliance:**
```
Contrast ratio: ≥ 7:1 (text to background)
Text size: ≥ 22pt body text
Color alone: Never sole indicator
Alt text: Always provided
```

**Mobile:**
```
Text legible at 375px width
Critical info in safe zones
No text smaller than 18pt
```

### Use Cases
- LinkedIn posts and carousels
- Technical diagrams
- Data visualizations
- Professional presentations
- Enterprise content
- B2B marketing

---

## 2. Vibrant Social (Instagram)

### Purpose
Eye-catching, lifestyle-focused aesthetic for social media engagement and creative expression.

### Color Specification

**Backgrounds:**
```
Light: #FFFFFF, #F9FAFB, #FEF3C7 (warm white/cream)
Gradients: Multi-color, vibrant transitions
Solid colors: Saturated, brand-specific
```

**Color Palettes:**

**Warm:**
```
Coral: #FF6B6B
Peach: #FFB4A2
Gold: #FFD93D
Sunset: #FF8A80
```

**Cool:**
```
Teal: #4ECDC4
Mint: #95E1D3
Sky: #6BC4E8
Lavender: #B4A7D6
```

**Vibrant:**
```
Neon Pink: #FF006E
Electric Blue: #00B4D8
Lime: #BFFF00
Purple: #7209B7
```

**Earthy:**
```
Terracotta: #E07A5F
Sage: #81B29A
Burnt Orange: #C44536
Cream: #F4F1DE
```

### Typography

**Font Styles:**
```
Modern sans: Montserrat, Poppins, Nunito
Script: Pacifico, Dancing Script (sparingly)
Display: Bold, impactful headlines
Body: Clean, readable (minimal text)
```

**Sizes:**
```
Headline: 48-72pt (dominant, bold)
Body: 24-32pt (if needed)
Caption: 18-24pt
```

**Treatment:**
```
Weights: Bold, Extra Bold for impact
Effects: Shadows, outlines (if tasteful)
Color: High contrast or complementary
Overlays: Semi-transparent for readability
```

### Layout & Composition

**Rule of Thirds:**
```
Divide canvas into 3×3 grid
Place subjects at intersections
Create visual interest
Natural eye flow
```

**Spacing:**
```
Can be busier than LinkedIn
But avoid clutter
Subject-focused
Visual breathing room
```

**Depth:**
```
Foreground, midground, background
Blurred backgrounds popular
Bokeh effects
Layered composition
```

### Components

**Subject Focus:**
```
Clear main subject
80% of attention
Blurred or simple background
High contrast from surroundings
```

**Text Overlays:**
```
Semi-transparent backgrounds
High contrast text
Bold, readable fonts
Positioned in clear space
```

**Borders/Frames:**
```
Decorative borders (optional)
Colored frames
Rounded corners
Instagram-worthy aesthetic
```

### Use Cases
- Instagram feed posts
- Instagram Stories
- Lifestyle content
- Creative projects
- Fashion/beauty
- Food photography
- Travel content

---

## 3. Bold & Concise (Twitter/X)

### Purpose
High-impact, text-forward design for quick comprehension and social engagement.

### Color Specification

**High Contrast:**
```
Black: #000000
White: #FFFFFF
Twitter Blue: #1DA1F2
Bold colors: Saturated primaries
```

**Backgrounds:**
```
Solid colors (high contrast)
Bold gradients
White for readability
Black for drama
```

**Text:**
```
Always high contrast
Black on white preferred
White on bold color
Colored text only if ≥4.5:1 contrast
```

### Typography

**Font Characteristics:**
```
Bold, sans-serif
High impact
Readable at small sizes
Quick comprehension
```

**Sizes:**
```
Headline: 48-64pt (dominant)
Body: 24-32pt (if needed)
Caption: 18-20pt (minimal)
```

**Treatment:**
```
Bold weights standard
All caps for impact (sparingly)
Short, punchy copy
Large, readable
```

### Layout & Composition

**Text-Forward:**
```
Text is main element
Visual supports text
Quote graphics
Statistics
Bold statements
```

**Quick Comprehension:**
```
2-second rule
One clear message
Strong hierarchy
Minimal elements
```

### Components

**Quote Format:**
```
Large text quote
Attribution small (bottom)
Clean background
High contrast
```

**Stat Format:**
```
Huge number (72pt+)
Context below (28pt)
Source citation (18pt)
Simple visual element
```

### Use Cases
- Tweet images
- Quote graphics
- Data visualizations
- Thread starters
- News commentary
- Hot takes
- Meme formats

---

## Custom Design Systems

### Creating Project-Specific Systems

**Brand Colors:**
```
Extract from brand guidelines
Ensure WCAG compliance
Create accent palette
Test on mobile
```

**Typography:**
```
Use brand fonts
Ensure web-safe fallbacks
License verification
Size adjustments for readability
```

**Layout:**
```
Adapt grid system
Maintain negative space
Brand-specific components
Consistent spacing
```

### Hybrid Systems

**Professional + Vibrant:**
```
Dark background (LinkedIn)
+ Vibrant accent colors (Instagram)
= Modern, engaging professional
```

**Minimal + Bold:**
```
Clean, minimal layout
+ Bold color choice
+ High-impact typography
= Contemporary, striking
```

---

## Choosing the Right System

### Decision Matrix

**Choose Dark Monochrome Tech when:**
- Platform: LinkedIn
- Audience: B2B, professionals
- Content: Technical, data-driven
- Tone: Professional, authoritative
- Goal: Credibility, expertise

**Choose Vibrant Social when:**
- Platform: Instagram
- Audience: B2C, lifestyle
- Content: Visual storytelling, creative
- Tone: Authentic, relatable
- Goal: Engagement, shares

**Choose Bold & Concise when:**
- Platform: Twitter/X
- Audience: General, news-focused
- Content: Opinions, quick insights
- Tone: Conversational, direct
- Goal: Virality, discussion

**Choose Custom when:**
- Brand requirements override
- Multi-platform consistency needed
- Specific audience demographics
- Unique positioning required

---

## Mixing Design Systems

### When to Mix
- Multi-platform campaigns
- Brand evolution
- A/B testing
- Audience expansion

### How to Mix
1. Choose base system (primary platform)
2. Add elements from secondary system
3. Maintain core principles
4. Test on target platforms
5. Verify accessibility

### Example: LinkedIn + Instagram
```
Base: Dark Monochrome Tech (LinkedIn)
Add: Vibrant accent colors (Instagram)
Result: Professional but engaging
Use case: Cross-platform campaign
```

---

## Implementation Guidelines

### Prompt Construction

**Include Design System in Prompt:**
```
"Use [Design System Name]:
- Colors: [specific hex codes]
- Typography: [font, sizes, weights]
- Layout: [grid, spacing, alignment]
- Style: [aesthetic keywords]"
```

**Example:**
```
"Use Dark Monochrome Tech design system:
- Background: #0B0B0B
- Text: #FFFFFF primary, #D4D4D4 secondary
- Font: Inter, weight 300
- Layout: 12-column grid, generous spacing
- Accent: #4ADE80 (green)
- Style: Professional, minimal, high contrast"
```

### Quality Assurance

**Checklist:**
- [ ] Colors match specification
- [ ] Typography hierarchy clear
- [ ] Layout follows grid
- [ ] Negative space adequate
- [ ] Accessibility met (WCAG)
- [ ] Mobile-optimized
- [ ] Platform-appropriate

---

**For platform-specific applications:**
- LinkedIn: `linkedin-specs.md`
- Instagram: `instagram-specs.md`
- Twitter: `twitter-specs.md`

**For platform comparison:** `platform-comparison.md`
