---
name: universal-image-generation
description: Universal image generation system with intelligent style library routing. Supports 4 categories - (1) Social media content (Instagram, LinkedIn, Twitter posts with platform-specific design) (2) YouTube thumbnails (CTR-optimized, bold text, emotion-driven, 16:9 landscape) (3) Personalized Sid images (FAL LoRA model for consistent professional headshots and scenarios) (4) Data visualizations (40+ chart types - bar, line, pie, scatter, heatmap, dashboard; 6 aesthetic styles - tldraw hand-drawn, muted-professional corporate, vibrant-presentation, dark-mode-analytics, minimalist-modern, infographic-editorial). Uses Emily's JSON methodology, visual-prompt-mastery patterns, 7-pillar quality framework, WCAG 2.1 accessibility standards. Intelligent tool selection between gpt-image-1 (DALL-E 3 for text rendering and photorealism), nanobanana (Gemini for speed and cost), fal-video image models (imagen-4, flux-kontext for creative). Triggers - create image, generate image, make image, YouTube thumbnail, Sid image, personalized image, data visualization, chart, graph, infographic, bar chart, line graph, pie chart, scatter plot, heatmap, dashboard, Instagram post, LinkedIn graphic, Twitter image, social media visual, thumbnail, diagram, business intelligence visual, tldraw style, professional corporate design, hand-drawn chart
---

# Universal Image Generation

## Purpose

Comprehensive image generation system that handles ALL image creation needs through an intelligent style library architecture. Automatically routes to appropriate style guides based on content category, platform requirements, and aesthetic preferences. Combines methodologies from three proven systems plus new data visualization capabilities.

## When to Use This Skill

Use this skill for ANY image generation task, including:

**Social Media Content:**
- Instagram posts (square, story, carousel)
- LinkedIn graphics (dark monochrome, professional)
- Twitter images (thread cards, engagement posts)
- Facebook visuals (engagement-optimized)

**YouTube Platform:**
- Video thumbnails (CTR-optimized)
- Community post images
- Channel art and branding

**Personalized Content:**
- Sid professional headshots
- Sid lifestyle/scenario images
- Custom character integration (FAL LoRA)

**Data Visualization:**
- Charts: bar, line, pie, scatter, heatmap
- Graphs: network, flow, area, bubble
- Infographics: editorial style, presentation-ready
- Dashboards: multi-metric displays
- Diagrams: technical, process flow

**Triggers:** create image, generate image, make image, design graphic, create visual, YouTube thumbnail, video cover, Sid image, Sid headshot, personalized image, data viz, chart, graph, infographic, bar chart, line graph, pie chart, scatter plot, heatmap, dashboard, network diagram, flow chart, Instagram post, LinkedIn image, Twitter graphic, social media content, tldraw style, hand-drawn chart, professional design, corporate visualization

**Don't use for:**
- Video generation (use video-generation skill)
- Blending/compositing multiple images (though we support image-to-image)
- Photo editing (use edit-image skill)

## Instructions

### Step 1: Analyze Request and Detect Category

Parse the user's request to identify:
- **Content type**: What kind of image?
- **Platform**: Where will it be used?
- **Style preference**: Any explicit style mentioned?
- **Special requirements**: Text, data, personalization?

**Category Detection Logic:**

```
IF request mentions ("Sid", "personalized Sid", "Sid headshot", "Sid profile")
  → CATEGORY: personalization

IF request mentions ("YouTube thumbnail", "thumbnail design", "video cover")
  → CATEGORY: youtube

IF request mentions ("chart", "graph", "data viz", "infographic", "dashboard", "bar chart", "line graph", "metrics", "analytics", "statistics visualization")
  → CATEGORY: data-visualization

IF request mentions ("Instagram", "LinkedIn", "Twitter", "Facebook", "social media post")
  → CATEGORY: social-media

ELSE
  → CATEGORY: social-media (default for general images)
```

### Step 2: Load Style Guide Registry

Read the style guide registry to see all available styles:
- File: `reference/style-guide.md`
- Purpose: Central index of all style options
- Contains: Category listings, style descriptions, use-when guidance

### Step 3: Select Appropriate Style Guide(s)

Based on detected category and user request, load relevant style guides:

**For Social Media:**
```
Platform: Instagram → Load: categories/social-media/instagram-vibrant-minimal.md
Platform: LinkedIn → Load: categories/social-media/linkedin-dark-monochrome.md
Platform: Twitter → Load: categories/social-media/twitter-thread-carousel.md
```

**For YouTube:**
```
General thumbnails → Load: categories/youtube/thumbnail-ctr-optimized.md
Educational content → Load: categories/youtube/thumbnail-educational.md
Tech reviews → Load: categories/youtube/thumbnail-tech-review.md
```

**For Personalization:**
```
Professional context → Load: categories/personalization/sid-professional-headshot.md
Casual context → Load: categories/personalization/sid-casual-lifestyle.md
```

**For Data Visualization:**
```
Step 1: Determine aesthetic style
  If "tldraw" OR "hand-drawn" OR "casual" → Load: styles/tldraw-style.md
  If "corporate" OR "professional" OR "business" → Load: styles/muted-professional.md
  If "vibrant" OR "bold" OR "colorful" → Load: styles/vibrant-presentation.md
  If "dark mode" OR "analytics" OR "tech" → Load: styles/dark-mode-analytics.md
  If "minimal" OR "clean" OR "modern" → Load: styles/minimalist-modern.md
  If "infographic" OR "editorial" OR "magazine" → Load: styles/infographic-editorial.md

Step 2: Determine chart type from data structure
  If comparing categories → Load: chart-types/bar-charts.md
  If showing trends over time → Load: chart-types/line-graphs.md
  If parts-of-whole → Load: chart-types/pie-charts.md
  If correlations → Load: chart-types/scatter-plots.md
  If density patterns → Load: chart-types/heatmaps.md
  If multi-metric views → Load: chart-types/dashboards.md

Step 3: Merge aesthetic + structure
  Combine style aesthetics with chart structure requirements
```

### Step 4: Apply Core Foundation

Load and apply universal foundations (used for ALL image types):

1. **Emily's JSON Methodology** (`reference/core/emily-json-methodology.md`)
   - Comprehensive JSON structure for prompts
   - 10-section template system
   - Technical precision requirements

2. **Visual Prompt Mastery** (`reference/core/visual-prompt-mastery.md`)
   - 30 validated pattern examples
   - Platform optimization rules
   - Engagement-driven structuring

3. **7-Pillar Quality Framework** (`reference/core/quality-framework.md`)
   - Clarity (1-10)
   - Technical Quality (1-10)
   - Composition (1-10)
   - Color Accuracy (1-10)
   - Typography (1-10)
   - Professionalism (1-10)
   - Prompt Accuracy (1-10)

4. **Tool Selection Matrix** (`reference/core/tool-selection-matrix.md`)
   - gpt-image-1 vs nanobanana vs fal decision tree
   - Cost, speed, quality tradeoffs
   - Use-case optimization

5. **Negative Prompts Library** (`reference/core/negative-prompts-library.md`)
   - 100+ categorized negative prompts
   - Minimum 10 items per image
   - Context-specific selections

### Step 5: Build Complete Prompt

Merge information from multiple sources:

1. **Category-specific characteristics** (from loaded style guide)
   - Colors, typography, mood from style guide
   - Layout rules, composition guidelines
   - Platform requirements

2. **Core JSON structure** (from foundation)
   - scene_description
   - subject_and_action
   - composition_and_framing
   - lighting_design
   - color_and_grade
   - typography (if text needed)
   - cinematography
   - negative_prompt

3. **Technical specifications** (from platform/use case)
   - Aspect ratio
   - Resolution
   - File format
   - Accessibility requirements (for data viz)

**Example Merge Process:**

```
User request: "Create a bar chart showing Q4 revenue in tldraw style"

Loaded guides:
  - categories/data-visualization/styles/tldraw-style.md
  - categories/data-visualization/chart-types/bar-charts.md

Merged characteristics:
  - Colors: Muted earth tones from tldraw (#F5F5DC, #8B7355, #6B8E23)
  - Typography: Hand-written style from tldraw
  - Structure: Bar chart requirements (axis labels, value labels, consistent spacing)
  - Aesthetic: Hand-drawn, imperfect lines, organic shapes
  - Negative prompts: Merged from both guides + core library

Final prompt: "Hand-drawn bar chart sketch showing Q4 revenue data in marker style.
Casual whiteboard illustration with slightly imperfect lines. Muted earth tones
(#F5F5DC background, #8B7355 bars). Hand-written axis labels and value annotations.
Y-axis: Revenue ($M), X-axis: Months (Oct, Nov, Dec). Value labels on each bar.
Title at top in casual handwriting. Organic spacing, loose grid lines. Professional
yet approachable aesthetic.

Negative: perfect geometry, computer-generated, sharp edges, gradient fills,
3D effects, corporate stiff aesthetic, stock photos, clipart, watermarks"
```

### Step 6: Select Optimal MCP Tool

Based on merged requirements, choose best tool:

**Decision tree:**
```
IF (category == "personalization" AND subject == "Sid")
  → fal-video with flux-lora endpoint + Sid's LoRA model

IF (platform == "YouTube" OR needsTextRendering == true)
  → gpt-image-1 (best text rendering)

IF (category == "data-visualization" AND style == "professional")
  → gpt-image-1 (precision and clarity)

IF (category == "social-media" OR needsSpeed == true OR needsCost == true)
  → nanobanana (fast and cost-effective)

IF (style == "creative" OR style == "artistic")
  → fal-video image models (imagen-4, flux-kontext)

DEFAULT
  → nanobanana (versatile general-purpose)
```

**For complete tool selection logic, see:** `reference/core/tool-selection-matrix.md`

### Step 7: Execute Generation

Call selected MCP tool with optimized parameters:

**For gpt-image-1:**
```yaml
mcp__gpt-image-1__create_image:
  prompt: "{merged_text_prompt}"
  size: "1536x1024"  # or "1024x1024" or "1024x1536"
  quality: "high"
  output_format: "png"
```

**For nanobanana:**
```yaml
mcp__nanobanana__generate_image:
  prompt: "{merged_text_prompt}"
  negative_prompt: "{negative_prompts_min_10_items}"
  mode: "generate"  # or "edit" for image-to-image
  n: 1
  input_image_path_1: "{path_if_compositing}"  # optional
```

**For fal-video (Sid personalization):**
```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/flux-lora"
  category_hint: "image"
  input_params:
    prompt: "Photo of SIDAI {scenario_description}"
    loras: [{
      "path": "https://v3b.fal.media/files/b/zebra/Jujtmkl_X-v5x0KxjM3gm_pytorch_lora_weights.safetensors",
      "scale": 1
    }]
    num_images: 1
    guidance_scale: 3.5
    num_inference_steps: 28
    image_size: "{aspect_ratio}"
```

**For fal-video (creative image models):**
```yaml
mcp__fal-video__execute_custom_model:
  endpoint: "fal-ai/flux/kontext"  # or "fal-ai/aura-flow", "fal-ai/recraft-v3"
  category_hint: "image"
  input_params:
    prompt: "{merged_prompt}"
    num_images: 1
    image_size: "landscape_4_3"
```

### Step 8: Run 7-Pillar Quality Evaluation (MANDATORY)

Evaluate generated image against framework:

1. **Clarity (1-10)**: Message clear in <3 seconds?
2. **Technical Quality (1-10)**: Sharp, no artifacts, proper resolution?
3. **Composition (1-10)**: Good balance, rule of thirds, visual flow?
4. **Color Accuracy (1-10)**: Matches hex codes specified?
5. **Typography (1-10)**: Text legible, hierarchical, readable? (if applicable)
6. **Professionalism (1-10)**: Enterprise-grade, appropriate quality?
7. **Prompt Accuracy (1-10)**: All requested elements present?

**Overall Score = Average of 7 pillars**

**Category-specific criteria:**
- **Data viz**: Add Accessibility (WCAG 2.1 contrast), Readability at small sizes
- **YouTube**: Add CTR potential, Emotion clarity
- **Personalization**: Add Likeness accuracy, Scenario match

### Step 9: Apply Quality Gates

Based on overall score:

- **Score < 7**: Regenerate with improvements
  - Identify weakest pillars
  - Adjust prompt to address deficiencies
  - Try different tool if needed
  - Maximum 3 iterations

- **Score 7-8**: Good, acceptable for publication
  - Minor refinements optional
  - Suitable for most use cases

- **Score 9+**: Exceptional quality
  - Save prompt as template
  - Document in examples/
  - Add to style guide as reference

### Step 10: Save Metadata and Output

Document the generation:

```yaml
metadata:
  skill: universal-image-generation
  category: "{detected_category}"
  style: "{applied_style_guide}"
  platform: "{target_platform}"
  prompt_json: "{full_json_structure}"
  prompt_text: "{converted_text_prompt}"
  tool_used: "{mcp_tool_name}"
  tool_rationale: "{why_this_tool}"
  generation_time: "{timestamp}"
  quality_scores:
    clarity: {score}/10
    technical: {score}/10
    composition: {score}/10
    color: {score}/10
    typography: {score}/10
    professionalism: {score}/10
    prompt_accuracy: {score}/10
    overall: {average}/10
  output_path: "{file_location}"
  cost: "${estimated_cost}"
```

## Reference Documentation

This skill includes comprehensive image generation knowledge organized as an extensible library:

### Core Foundation (Always Used)
- **`reference/core/emily-json-methodology.md`** - Emily's proven JSON prompting structure
- **`reference/core/visual-prompt-mastery.md`** - 30 validated pattern examples
- **`reference/core/quality-framework.md`** - 7-pillar evaluation system
- **`reference/core/tool-selection-matrix.md`** - Intelligent MCP tool decision tree
- **`reference/core/negative-prompts-library.md`** - 100+ categorized negative prompts

### Style Library (Modular, Extensible)

**Central Registry:**
- **`reference/style-guide.md`** - Complete index of all available styles, when to use, how to add new styles

**Category Guides:**

#### Social Media (`categories/social-media/`)
- `instagram-vibrant-minimal.md` - Bright, clean IG posts
- `instagram-story-vertical.md` - 9:16 story format
- `linkedin-dark-monochrome.md` - Professional B2B content
- `twitter-thread-carousel.md` - Multi-slide thread posts
- `facebook-engagement-posts.md` - High-engagement FB graphics

#### YouTube (`categories/youtube/`)
- `thumbnail-ctr-optimized.md` - Maximum clickthrough rate
- `thumbnail-educational.md` - Tutorial/how-to style
- `thumbnail-tech-review.md` - Tech review aesthetic
- `thumbnail-gaming.md` - Gaming content style
- `community-post-design.md` - YouTube community visuals

#### Personalization (`categories/personalization/`)
- `sid-professional-headshot.md` - Business profiles, LinkedIn
- `sid-casual-lifestyle.md` - Relatable, approachable content
- `sid-speaking-engagement.md` - Conference, presentation images
- `_category-guide.md` - How FAL LoRA works, trigger words

#### Data Visualization (`categories/data-visualization/`)

**Aesthetic Styles** (`styles/`):
- `tldraw-style.md` - Hand-drawn, casual, approachable (whiteboard aesthetic)
- `muted-professional.md` - Corporate, subtle colors, clean (business reports)
- `vibrant-presentation.md` - Bold colors, high energy (marketing/sales)
- `dark-mode-analytics.md` - Dark bg, neon accents (dashboards, tech)
- `minimalist-modern.md` - Clean, spacious, elegant (portfolio)
- `infographic-editorial.md` - Magazine-style, editorial (articles, blogs)

**Chart Types** (`chart-types/`):
- `bar-charts.md` - Comparing categories
- `line-graphs.md` - Trends over time
- `pie-charts.md` - Parts of whole
- `scatter-plots.md` - Correlations, relationships
- `heatmaps.md` - Density patterns, matrices
- `flow-diagrams.md` - Process flows, workflows
- `network-graphs.md` - Relationships, connections
- `dashboards.md` - Multi-metric displays
- `_category-guide.md` - Data viz overview, WCAG 2.1 standards

### MCP Tool References (`reference/tools/`)
- `gpt-image-1-reference.md` - DALL-E 3 complete parameters
- `nanobanana-reference.md` - Gemini 2.5 Flash complete parameters
- `fal-image-models.md` - imagen-4, flux-kontext, flux-lora, recraft-v3
- `tool-comparison-matrix.md` - Side-by-side feature comparison

### Real-World Examples (`reference/examples/`)
- `social-media-examples.md` - 5 complete social scenarios
- `youtube-thumbnail-examples.md` - 3 high-CTR examples with prompts
- `personalization-examples.md` - Sid image scenarios
- `data-viz-examples.md` - 8 chart type demonstrations

### JSON Templates (`templates/`)
- `json-base-template.json` - Emily's foundation structure
- `social-media-template.json` - Social platform adaptations
- `thumbnail-template.json` - YouTube-specific template
- `personalization-template.json` - FAL LoRA template
- `data-viz-template.json` - Chart/graph template

## Examples

### Example 1: Social Media - LinkedIn Post

**User request:** "Create a LinkedIn post about AI agent cost reality"

**Execution:**
1. **Category detection**: social-media (LinkedIn mentioned)
2. **Load guides**:
   - `categories/social-media/linkedin-dark-monochrome.md`
   - `core/emily-json-methodology.md`
3. **Merged characteristics**:
   - Dark background (#0B0B0B)
   - White/green accent text (#FFFFFF, #4ADE80)
   - Minimal design, high contrast
   - Professional typography
4. **Tool selection**: gpt-image-1 (text rendering critical)
5. **Generate**: Professional LinkedIn graphic
6. **Quality score**: 8.9/10
7. **Result**: Ready to publish

### Example 2: YouTube Thumbnail

**User request:** "Create YouTube thumbnail for tech tutorial with my face"

**Execution:**
1. **Category detection**: youtube (thumbnail mentioned)
2. **Load guides**:
   - `categories/youtube/thumbnail-educational.md`
3. **Mode**: Mode B (user's image requested)
4. **Tool selection**: nanobanana (supports image composition)
5. **Generate** with input_image_path_1
6. **Quality score**: 9.2/10 (CTR potential: high)
7. **Result**: Eye-catching thumbnail with face + bold text

### Example 3: Personalized Sid Image

**User request:** "Create professional Sid headshot for LinkedIn"

**Execution:**
1. **Category detection**: personalization (Sid mentioned)
2. **Load guides**:
   - `categories/personalization/sid-professional-headshot.md`
3. **Tool selection**: fal-video (flux-lora with Sid's LoRA)
4. **Prompt**: "Photo of SIDAI, professional LinkedIn headshot, navy blazer..."
5. **Quality score**: 9.4/10 (excellent likeness)
6. **Result**: Professional Sid headshot

### Example 4: Data Visualization - Bar Chart in tldraw Style

**User request:** "Create a bar chart showing AI adoption rates in a casual hand-drawn style"

**Execution:**
1. **Category detection**: data-visualization (chart mentioned)
2. **Style detection**: tldraw (hand-drawn mentioned)
3. **Chart type**: bar chart (comparing categories)
4. **Load guides**:
   - `categories/data-visualization/styles/tldraw-style.md`
   - `categories/data-visualization/chart-types/bar-charts.md`
5. **Merge**:
   - Hand-drawn aesthetic + bar chart structure
   - Muted colors (#F5F5DC, #8B7355, #6B8E23)
   - Imperfect lines, casual annotations
   - Clear axis labels, proportional bars
6. **Tool selection**: nanobanana (hand-drawn style)
7. **Generate**: Casual yet professional chart
8. **WCAG check**: 4.5:1 contrast ✅
9. **Quality score**: 8.7/10
10. **Result**: Approachable data visualization

### Example 5: Data Visualization - Dashboard in Muted Professional

**User request:** "Create a business metrics dashboard with KPIs in corporate style"

**Execution:**
1. **Category detection**: data-visualization (dashboard, metrics)
2. **Style detection**: muted-professional (corporate mentioned)
3. **Chart type**: dashboards (multi-metric)
4. **Load guides**:
   - `categories/data-visualization/styles/muted-professional.md`
   - `categories/data-visualization/chart-types/dashboards.md`
5. **Merge**:
   - Subtle corporate colors (grays, navy, muted blue)
   - Clean typography, sans-serif
   - Multiple chart types (bar, line, number cards)
   - Grid layout, organized sections
6. **Tool selection**: gpt-image-1 (precision for text/numbers)
7. **Accessibility**: WCAG 2.1 AA compliance (4.5:1 minimum)
8. **Generate**: Professional dashboard design
9. **Quality score**: 9.1/10
10. **Result**: Enterprise-ready dashboard visual

## Quality Standards

Every output from this skill must meet:

1. **Accuracy**: All requested elements present and correct
2. **Technical Excellence**: Sharp, artifact-free, proper resolution
3. **Platform Compliance**: Meets platform specifications (size, format, safe zones)
4. **Accessibility** (for data viz): WCAG 2.1 contrast ratios, dual encoding
5. **Professional Grade**: Suitable for publication without editing
6. **Metadata Complete**: Full generation details documented
7. **7-Pillar Score**: Minimum 7.0/10 average (target 8.0+)

## Scalability

**Adding new styles is trivial:**

1. Create new style guide file in appropriate category
2. Follow standard template (see any existing guide)
3. Add entry to `reference/style-guide.md` registry
4. Test with 3+ example generations
5. DONE - no code changes needed

**Categories grow independently:**
- Social media can add TikTok, Pinterest, Reddit styles
- YouTube can add gaming, vlog, shorts variations
- Data viz can add sankey, treemap, 3D visualizations
- Personalization can add other people's LoRA models

This architecture ensures infinite scalability without touching core orchestration logic.

## Integration Notes

**For workflows invoking this skill:**
- Skill auto-detects category from request context
- Workflow can pass explicit `category` and `style` parameters if known
- Returns structured metadata for downstream processing
- Compatible with all existing image generation workflows

**For agents using this skill:**
- Jarvis: Content generation with platform-specific imagery
- Zoe: Primary visual production skill (replaces 3 old skills)
- Any agent: Universal image capability

**Module integration:**
- json-prompt-generator: Provides base templates
- platform-specs: Cross-referenced for requirements
- postiz-formatter: Uses generated images in published posts

This skill serves as the universal image generation engine for the entire agent system.
