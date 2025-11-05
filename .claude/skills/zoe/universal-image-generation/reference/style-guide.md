# Style Guide Registry

## Universal Image Generation - Complete Style Library

> **Purpose:** Central index of ALL available style guides across all categories
> **For Users:** Browse available styles, see recommendations
> **For Contributors:** Learn how to add new styles (see bottom section)
> **Last Updated:** November 3, 2025

---

## 📖 How to Use This Registry

This registry organizes styles by **category** (what type of content) and within data visualization, by **aesthetic style** and **chart type**.

**Selection process:**

1. Identify your category (social-media, youtube, personalization, data-visualization)
2. Within category, select specific style or chart type
3. Load appropriate guide(s)
4. Generate image using guide specifications

**For data visualization:** You'll typically load TWO guides:

- One from `styles/` (aesthetic treatment)
- One from `chart-types/` (data structure)

---

## 📚 Category 1: Social Media

Professional content for social platforms with platform-specific design systems.

| Style Name                    | File                                        | Platform  | Use When                            | Primary Tool | Resolution |
| ----------------------------- | ------------------------------------------- | --------- | ----------------------------------- | ------------ | ---------- |
| **Instagram Vibrant Minimal** | `social-media/instagram-vibrant-minimal.md` | Instagram | Bright, clean IG feed posts         | nanobanana   | 1080×1080  |
| **Instagram Story Vertical**  | `social-media/instagram-story-vertical.md`  | Instagram | Full-screen vertical stories        | nanobanana   | 1080×1920  |
| **LinkedIn Dark Monochrome**  | `social-media/linkedin-dark-monochrome.md`  | LinkedIn  | Professional B2B content, carousels | gpt-image-1  | 1536×1024  |
| **Twitter Thread Carousel**   | `social-media/twitter-thread-carousel.md`   | Twitter/X | Multi-slide thread posts            | gpt-image-1  | 1600×900   |
| **Facebook Engagement Posts** | `social-media/facebook-engagement-posts.md` | Facebook  | High-engagement FB graphics         | nanobanana   | 1200×630   |

**Key characteristics:**

- Platform-optimized dimensions
- Brand-safe color palettes
- Mobile-first readability
- Engagement-driven design
- Quick visual communication

**Cross-reference:** All social media guides reference `reference/core/visual-prompt-mastery.md` for Emily's 30 validated patterns.

---

## 📺 Category 2: YouTube

Video platform content optimized for click-through rate and platform specifications.

| Style Name                  | File                                 | Video Type            | Use When                         | Key Features                 | Tool        |
| --------------------------- | ------------------------------------ | --------------------- | -------------------------------- | ---------------------------- | ----------- |
| **Thumbnail CTR Optimized** | `youtube/thumbnail-ctr-optimized.md` | Any                   | Maximize clicks, general purpose | Bold text, emotion, contrast | gpt-image-1 |
| **Thumbnail Educational**   | `youtube/thumbnail-educational.md`   | Tutorials, How-to     | Teaching content, step-by-step   | Clean, clear, informative    | gpt-image-1 |
| **Thumbnail Tech Review**   | `youtube/thumbnail-tech-review.md`   | Tech, Reviews         | Product reviews, comparisons     | Product focus, specs visible | gpt-image-1 |
| **Thumbnail Gaming**        | `youtube/thumbnail-gaming.md`        | Gaming, Entertainment | Gaming content, streaming        | Dramatic, action-packed      | nanobanana  |
| **Community Post Design**   | `youtube/community-post-design.md`   | Community             | YouTube community tab posts      | Square format, engaging      | nanobanana  |

**Key characteristics:**

- 16:9 aspect ratio (1280×720px required)
- Bold text (3-7 words max, large font)
- Expressive faces (emotion drives CTR)
- High contrast, vibrant colors
- Curiosity gap (intrigue without spoiling)
- Readable at 156×88px (mobile thumbnail size)

**Supporting files:**

- `youtube/youtube-specs.md` - Official YouTube requirements
- `youtube/creation-modes.md` - With face vs without face
- `youtube/design-best-practices.md` - What performs (research-backed)
- `youtube/thumbnail-psychology.md` - CTR psychology, MrBeast tactics
- `youtube/prompt-templates.md` - Tested prompts for both modes

---

## 👤 Category 3: Personalization

Custom character integration using FAL LoRA models for consistent branded imagery.

| Style Name                    | File                                           | Context  | Use When                                           | Key Features                             | Tool            |
| ----------------------------- | ---------------------------------------------- | -------- | -------------------------------------------------- | ---------------------------------------- | --------------- |
| **Sid Professional Headshot** | `personalization/sid-professional-headshot.md` | Business | LinkedIn, business profiles, professional contexts | Navy blazer, neutral bg, studio lighting | fal (flux-lora) |
| **Sid Casual Lifestyle**      | `personalization/sid-casual-lifestyle.md`      | Casual   | Relatable content, approachable imagery            | Casual attire, natural settings          | fal (flux-lora) |
| **Sid Speaking Engagement**   | `personalization/sid-speaking-engagement.md`   | Events   | Conferences, presentations, speaking               | Stage/podium setting, professional       | fal (flux-lora) |

**Key characteristics:**

- Consistent likeness (FAL LoRA model)
- Trigger word required: "Photo of SIDAI"
- Professional quality (7-pillar scoring)
- Scenario-specific compositions
- Brand consistency maintained

**Supporting files:**

- `personalization/fal-custom-model-workflow.md` - Complete FAL flux-lora workflow
- `personalization/model-training-guide.md` - How LoRA model was trained
- `personalization/prompt-templates.md` - Scenario-specific prompts
- `personalization/usage-examples.md` - Tested configurations

**Model details:**

- Endpoint: `fal-ai/flux-lora`
- LoRA path: `https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors`
- Guidance scale: 3.5
- Inference steps: 28

**Future expansion:** Additional LoRA models for other team members can be added following same pattern.

---

## 📊 Category 4: Data Visualization

Charts, graphs, infographics, and dashboards. **Two-dimensional selection required:**

### Dimension 1: Aesthetic Style

Choose visual treatment based on context and audience:

| Style Name                | File                                                 | Description                                           | Best For                                      | Color Palette                                     | Tool        |
| ------------------------- | ---------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------- | ------------------------------------------------- | ----------- |
| **tldraw Style**          | `data-visualization/styles/tldraw-style.md`          | Hand-drawn, casual, approachable whiteboard aesthetic | Explainers, blogs, informal presentations     | Warm earth tones (#F5F5DC, #8B7355, #6B8E23)      | nanobanana  |
| **Muted Professional**    | `data-visualization/styles/muted-professional.md`    | Corporate, subtle colors, clean formal design         | Business reports, executive decks, enterprise | Navy/gray/muted (#1E3A8A, #6B7280, #2563EB)       | gpt-image-1 |
| **Vibrant Presentation**  | `data-visualization/styles/vibrant-presentation.md`  | Bold colors, high energy, attention-grabbing          | Marketing, sales presentations, energetic     | Saturated bold (#EF4444, #8B5CF6, #F59E0B)        | nanobanana  |
| **Dark Mode Analytics**   | `data-visualization/styles/dark-mode-analytics.md`   | Dark bg, neon accents, tech aesthetic                 | Dashboards, analytics products, tech UI       | Dark + neon (#0B0B0B, #00F5FF, #FF006E)           | gpt-image-1 |
| **Minimalist Modern**     | `data-visualization/styles/minimalist-modern.md`     | Clean, spacious, elegant, sophisticated               | Portfolio, showcases, high-end design         | Monochrome + 1 accent (#000000, #FFFFFF, #3B82F6) | gpt-image-1 |
| **Infographic Editorial** | `data-visualization/styles/infographic-editorial.md` | Magazine-style, editorial quality, illustrative       | Articles, long-form content, publications     | Curated palette, editorial treatment              | gpt-image-1 |

### Dimension 2: Chart Type

Choose data structure based on what you're showing:

| Chart Type         | File                                               | Use When                                      | Data Structure          | Combines With                  |
| ------------------ | -------------------------------------------------- | --------------------------------------------- | ----------------------- | ------------------------------ |
| **Bar Charts**     | `data-visualization/chart-types/bar-charts.md`     | Comparing categories, rankings                | Categorical + numerical | Any style above                |
| **Line Graphs**    | `data-visualization/chart-types/line-graphs.md`    | Trends over time, continuous change           | Time-series, sequential | Any style above                |
| **Pie Charts**     | `data-visualization/chart-types/pie-charts.md`     | Parts of whole (use sparingly, max 5 slices)  | Proportional data       | Muted-professional, Minimalist |
| **Scatter Plots**  | `data-visualization/chart-types/scatter-plots.md`  | Correlations, relationships between variables | Two numerical variables | Muted-professional, Minimalist |
| **Heatmaps**       | `data-visualization/chart-types/heatmaps.md`       | Density patterns, matrices, intensity         | Matrix/grid data        | Dark-mode, Minimalist          |
| **Flow Diagrams**  | `data-visualization/chart-types/flow-diagrams.md`  | Process flows, systems, workflows             | Sequential connections  | tldraw, Minimalist             |
| **Network Graphs** | `data-visualization/chart-types/network-graphs.md` | Relationships, connections, networks          | Node-edge relationships | Dark-mode, Vibrant             |
| **Dashboards**     | `data-visualization/chart-types/dashboards.md`     | Multi-metric views, KPI collections           | Multiple metrics        | Muted-professional, Dark-mode  |

**Supporting files:**

- `data-visualization/_category-guide.md` - Overview, when to use, core principles
- All chart types cross-reference WCAG 2.1 accessibility standards

### Merging Style + Chart Type

**Example combinations:**

```
tldraw-style.md + bar-charts.md
  = Hand-drawn bar chart with casual annotations
  = Perfect for blog explainers

muted-professional.md + dashboards.md
  = Clean corporate multi-chart dashboard
  = Perfect for executive review

vibrant-presentation.md + line-graphs.md
  = Bold colorful trend chart
  = Perfect for sales presentations

dark-mode-analytics.md + heatmaps.md
  = Tech dashboard heat matrix
  = Perfect for product analytics
```

**Process:**

1. Load aesthetic guide (colors, typography, mood)
2. Load chart-type guide (structure, data requirements)
3. Merge characteristics into unified prompt
4. Apply WCAG 2.1 accessibility validation
5. Generate with optimal tool

---

## 🎨 Core Foundation (Used for ALL Categories)

Universal foundations applied to every image generation:

| Foundation Element             | File                               | Purpose                                                                                                  |
| ------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Emily's JSON Methodology**   | `core/emily-json-methodology.md`   | 10-section comprehensive prompt structure                                                                |
| **Visual Prompt Mastery**      | `core/visual-prompt-mastery.md`    | 30 validated pattern examples, engagement rules                                                          |
| **7-Pillar Quality Framework** | `core/quality-framework.md`        | Evaluation system (Clarity, Technical, Composition, Color, Typography, Professionalism, Prompt Accuracy) |
| **Tool Selection Matrix**      | `core/tool-selection-matrix.md`    | Decision tree: gpt-image-1 vs nanobanana vs fal                                                          |
| **Negative Prompts Library**   | `core/negative-prompts-library.md` | 100+ categorized negative prompts (min 10 per image)                                                     |
| **Emily's 30 Examples**        | `core/emily-30-examples.csv`       | Real validated prompts with engagement data                                                              |

---

## 🛠️ MCP Tools Reference

Complete technical specifications for all image generation tools:

| Tool Guide                 | File                             | Purpose                                               |
| -------------------------- | -------------------------------- | ----------------------------------------------------- |
| **Complete MCP Tools**     | `tools/mcp-tools-complete.md`    | All parameters for gpt-image-1, nanobanana, fal-video |
| **gpt-image-1 Details**    | Section in mcp-tools-complete.md | DALL-E 3 parameters, when to use                      |
| **nanobanana Details**     | Section in mcp-tools-complete.md | Gemini 2.5 Flash parameters, modes                    |
| **FAL Image Models**       | Section in mcp-tools-complete.md | imagen-4, flux-kontext, flux-lora                     |
| **Tool Comparison Matrix** | `core/tool-selection-matrix.md`  | Side-by-side feature comparison                       |

---

## 📋 Examples Library

Real-world scenarios with complete generation flows:

| Example Set            | File                                   | Covers                                          |
| ---------------------- | -------------------------------------- | ----------------------------------------------- |
| **Social Media**       | `examples/social-media-examples.md`    | Instagram, LinkedIn, Twitter complete scenarios |
| **YouTube Thumbnails** | `youtube/creation-modes.md` + examples | Both modes (scratch + with face)                |
| **Personalization**    | `personalization/usage-examples.md`    | Sid headshot scenarios                          |
| **Data Visualization** | Each chart-type .md                    | Examples within each guide                      |

---

## 📐 JSON Templates

Starting point templates for different image types:

| Template            | File                                | Adapted From                               | Use For                              |
| ------------------- | ----------------------------------- | ------------------------------------------ | ------------------------------------ |
| **Base Template**   | `templates/json-base-template.json` | json-prompt-generator/video-scene.json     | Any image (universal starting point) |
| **Social Media**    | Generated from base                 | Remove motion sections, add platform specs | Social posts                         |
| **Thumbnail**       | Generated from base                 | 16:9 emphasis, bold text sections          | YouTube thumbnails                   |
| **Personalization** | Generated from base                 | Add LoRA trigger, scenario context         | Sid images                           |
| **Data Viz**        | Generated from base                 | Add data accuracy, accessibility sections  | Charts/graphs                        |

**Note:** Templates are used as starting point, then populated with category/style-specific characteristics.

---

## 🎯 Quick Selection Guide

**"I need to..."**

**...post on Instagram**
→ `social-media/instagram-vibrant-minimal.md`

**...create LinkedIn carousel slide**
→ `social-media/linkedin-dark-monochrome.md`

**...make YouTube thumbnail with my face**
→ `youtube/thumbnail-ctr-optimized.md` (Mode B)

**...generate Sid professional headshot**
→ `personalization/sid-professional-headshot.md`

**...show sales data casually**
→ `data-visualization/styles/tldraw-style.md` + `chart-types/bar-charts.md`

**...create corporate dashboard**
→ `data-visualization/styles/muted-professional.md` + `chart-types/dashboards.md`

**...visualize trend data for business report**
→ `data-visualization/styles/muted-professional.md` + `chart-types/line-graphs.md`

**...make hand-drawn flow diagram**
→ `data-visualization/styles/tldraw-style.md` + `chart-types/flow-diagrams.md`

---

## 🔄 Cross-Reference Map

**Style dependencies and relationships:**

### Data Viz Aesthetic Styles

```
tldraw-style
  ├─ Best with: bar-charts, line-graphs, flow-diagrams
  ├─ Avoid with: complex dashboards, financial data
  ├─ Tool: nanobanana
  └─ Tone: Casual, approachable, educational

muted-professional
  ├─ Best with: dashboards, bar-charts, line-graphs, scatter-plots
  ├─ Perfect for: ALL business contexts
  ├─ Tool: gpt-image-1 (precision needed)
  └─ Tone: Corporate, formal, trustworthy

vibrant-presentation
  ├─ Best with: bar-charts, line-graphs, pie-charts
  ├─ Avoid with: Financial, scientific (too bold)
  ├─ Tool: nanobanana
  └─ Tone: Energetic, attention-grabbing, sales-focused

dark-mode-analytics
  ├─ Best with: heatmaps, dashboards, network-graphs
  ├─ Perfect for: Tech products, analytics tools
  ├─ Tool: gpt-image-1
  └─ Tone: Modern, tech-forward, dashboard-ready

minimalist-modern
  ├─ Best with: ALL chart types
  ├─ Perfect for: Portfolio, showcases, high-end
  ├─ Tool: gpt-image-1
  └─ Tone: Elegant, sophisticated, refined

infographic-editorial
  ├─ Best with: Mixed charts, storytelling data
  ├─ Perfect for: Articles, magazines, long-form
  ├─ Tool: gpt-image-1
  └─ Tone: Editorial, illustrative, narrative
```

### Platform Requirements

```
Instagram feed:
  - Size: 1080×1080 (square)
  - Style: instagram-vibrant-minimal
  - Tool: nanobanana

Instagram story:
  - Size: 1080×1920 (9:16 vertical)
  - Style: instagram-story-vertical
  - Tool: nanobanana

LinkedIn carousel:
  - Size: 1536×1024 or 1200×627
  - Style: linkedin-dark-monochrome
  - Tool: gpt-image-1 (text rendering critical)

YouTube thumbnail:
  - Size: 1280×720 (16:9, under 2MB)
  - Style: thumbnail-ctr-optimized (or specialized)
  - Tool: gpt-image-1 or nanobanana

Twitter thread:
  - Size: 1600×900 or 1200×675
  - Style: twitter-thread-carousel
  - Tool: gpt-image-1
```

### Tool Optimization Matrix

```
gpt-image-1 (DALL-E 3) - Use for:
  ✅ Text rendering (data labels, titles)
  ✅ Professional corporate aesthetics
  ✅ Precise geometric shapes
  ✅ Multi-label charts (dashboards)
  ✅ Financial/business data
  ✅ YouTube thumbnails (text critical)
  ✅ LinkedIn professional content
  Cost: ~$0.10/image, Speed: ~15-30s

nanobanana (Gemini 2.5 Flash) - Use for:
  ✅ Social media graphics (Instagram, casual)
  ✅ Hand-drawn/casual styles (tldraw)
  ✅ Fast iteration/experimentation
  ✅ Vibrant creative content
  ✅ Simple charts (fewer labels)
  ✅ Cost-sensitive projects
  Cost: ~$0.039/image, Speed: ~5-10s

fal-video (image models) - Use for:
  ✅ Sid personalization (flux-lora + LoRA model)
  ✅ Creative experimentation (flux-kontext)
  ✅ Artistic interpretations (imagen-4)
  ⚠️ Avoid for: Data accuracy, precise text
  Cost: ~$0.05-0.15/image, Speed: ~8-20s
```

---

## ➕ Adding New Styles

### How to Contribute New Style Guides

**Process:**

1. **Choose category**
   - social-media (new platform?)
   - youtube (new video type?)
   - personalization (new person/character?)
   - data-visualization/styles (new aesthetic?)
   - data-visualization/chart-types (new chart structure?)

2. **Create guide file**
   - Location: `categories/{category}/{style-name}.md`
   - Naming: lowercase-with-hyphens.md
   - Follow template structure (see any existing guide)

3. **Required sections** (all style guides must include):

   ```markdown
   # Style Name

   ## Overview

   Brief description

   ## When to Use

   - Best for scenarios
   - Avoid for scenarios

   ## Visual Characteristics

   - Color palette (with hex codes)
   - Typography (fonts, sizes, weights)
   - Layout rules
   - Mood/aesthetic

   ## Prompt Patterns

   Key phrases that achieve this style

   ## JSON Template Adjustments

   Which sections to emphasize

   ## Style-Specific Negative Prompts

   What to avoid for this style

   ## MCP Tool Recommendation

   Which tool works best and why

   ## Examples

   3-5 real examples with prompts

   ## Quality Criteria

   How to evaluate (7-10 criteria)
   ```

4. **Add to this registry**
   - Update appropriate table above
   - Include: name, file path, description, use-when, tool
   - Maintain alphabetical order within category

5. **Test thoroughly**
   - Generate 3+ examples using the guide
   - Validate quality scores (target 8.0+)
   - Test with different chart types (for data viz styles)
   - Verify accessibility (WCAG 2.1 for data viz)

6. **Document**
   - Add examples to guide
   - Include prompt templates
   - Note any quirks or special requirements

**Naming conventions:**

- Format: `{category}-{descriptor}.md` OR `{descriptor}-{subcategory}.md`
- Examples:
  - `linkedin-professional-minimal.md`
  - `thumbnail-educational-bright.md`
  - `data-viz-cyberpunk-neon.md` (becomes `styles/cyberpunk-neon.md`)
  - `scatter-plot-advanced.md` (becomes `chart-types/scatter-plots-advanced.md`)

**No code changes needed!** Just add markdown file + update this registry.

---

## 📊 Usage Statistics (To Be Tracked)

Most requested styles (helps prioritize improvements):

```
Social Media:
  1. linkedin-dark-monochrome: [tracking]
  2. instagram-vibrant-minimal: [tracking]

YouTube:
  1. thumbnail-ctr-optimized: [tracking]

Personalization:
  1. sid-professional-headshot: [tracking]

Data Visualization Styles:
  1. muted-professional: [tracking]
  2. tldraw-style: [tracking]

Data Visualization Chart Types:
  1. bar-charts: [tracking]
  2. line-graphs: [tracking]
  3. dashboards: [tracking]
```

---

## 🔍 Search/Filter Helpers

**By tool:**

- gpt-image-1 optimized: muted-professional, minimalist-modern, infographic-editorial, linkedin-dark-monochrome, all YouTube thumbnails
- nanobanana optimized: tldraw-style, vibrant-presentation, instagram styles, facebook-engagement
- fal-video required: All personalization (Sid images via flux-lora)

**By formality:**

- Formal: muted-professional, minimalist-modern, linkedin-dark-monochrome
- Casual: tldraw-style, instagram-vibrant-minimal
- Balanced: dark-mode-analytics, thumbnail-ctr-optimized

**By color palette:**

- Muted/subtle: muted-professional, minimalist-modern
- Vibrant/bold: vibrant-presentation, instagram-vibrant, thumbnail styles
- Dark theme: dark-mode-analytics, linkedin-dark-monochrome
- Earth tones: tldraw-style

**By accessibility:**

- WCAG 2.1 AA certified: All data-visualization styles, linkedin-dark-monochrome
- High contrast: dark-mode-analytics, muted-professional, thumbnail-ctr-optimized
- Colorblind-safe: muted-professional, minimalist-modern, tldraw-style

---

## 🏗️ Architecture Benefits

**Why this library system:**

✅ **Infinitely scalable** - Add styles without changing core code
✅ **Self-documenting** - This registry IS the source of truth
✅ **Composable** - Mix aesthetic + structure (data viz)
✅ **Discoverable** - Browse registry to see all options
✅ **Maintainable** - Edit one guide, not entire system
✅ **Testable** - Each guide independently testable
✅ **Future-proof** - Supports unlimited growth
✅ **Modular** - Categories grow independently
✅ **Accessible** - WCAG 2.1 baked into data viz guides

**Current coverage:**

- 5 social media styles (5 platforms)
- 5 YouTube styles (5 video types)
- 3 personalization styles (3 Sid contexts)
- 6 data viz aesthetic styles
- 8 data viz chart types
- **Total: 27 distinct style guides**

**Growth potential:** Unlimited

- Add new platforms (TikTok, Pinterest, Reddit)
- Add new chart types (sankey, treemap, violin plot)
- Add new aesthetic styles (retro, futuristic, organic)
- Add new personas (team members, brand characters)

---

## 📚 Related Documentation

**Cross-references:**

- `../../../bmad/modules/json-prompt-generator/` - Base JSON templates
- `../../../bmad/modules/platform-specs/` - Platform requirements
- `../../platform-specs/SKILL.md` - Platform specifications skill
- `../../mcp-tool-selection/SKILL.md` - Tool selection logic skill

**External resources:**

- WCAG 2.1 Guidelines: https://www.w3.org/TR/WCAG21/
- Color Oracle (colorblind simulator): https://www.colororacle.org/
- Contrast Checker: https://contrast-ratio.com/
- Datawrapper Blog: https://www.datawrapper.de/blog/
- Material Design Data Viz: https://material.io/design/communication/data-visualization

---

**This registry is the complete index for the universal-image-generation skill's extensible style library. All guides follow consistent structure and research-backed standards.**

_Last updated: November 3, 2025 by BMad Builder_
