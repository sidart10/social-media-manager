# Zoe - Visual Production Specialist Skills

**Agent**: Zoe (Visual Production Specialist)
**Purpose**: Comprehensive visual content creation across images, videos, and artistic expressions
**Version**: 3.0.0
**Last Updated**: November 3, 2025
**Status**: Production Ready

---

## Overview

This directory contains all skills for **Zoe**, the Visual Production Specialist agent. Zoe handles ALL visual content creation needs through specialized skills that leverage different technologies and methodologies.

**Zoe's capabilities span three production domains:**

1. **AI-Generated Imagery** - Fast, scalable content via MCP tools
2. **Code-Generated Art** - Programmatic and algorithmic visual creation
3. **Video Production** - Text-to-video and image-to-video generation

---

## Skill Categories

Skills are organized by **production method** to make selection intuitive and architecture clear.

### 📊 Category 1: AI-Generated Images

Skills that use MCP tools (nanobanana, gpt-image-1, fal) to generate images from text prompts.

| Skill Name                     | Purpose                                                            | When to Use                                                                                        | Technology                   | Status    |
| ------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| **universal-image-generation** | All-in-one image creation with 27 style guides across 4 categories | ANY image generation task (replaces create-image, youtube-thumbnail-design, generating-sid-images) | nanobanana, gpt-image-1, fal | ✅ Active |
| **edit-image**                 | Pixel-perfect editing and refinement                               | Modify existing images, corrections, enhancements                                                  | nanobanana (edit mode)       | ✅ Active |
| **blend-images**               | Multi-image composition and blending                               | Combine 2-3 images into unified scene                                                              | nanobanana (multi-image)     | ✅ Active |

**Key characteristics:**

- **Technology**: MCP API calls (Gemini, DALL-E, Imagen)
- **Speed**: Fast (5-30 seconds per image)
- **Cost**: $0.04-0.10 per image
- **Scalability**: High (API-based)
- **Quality**: AI-interpreted from prompts
- **Reproducibility**: Stochastic (varies each generation)

---

### 🎨 Category 2: Code-Generated Art

Skills that write and execute code to create visual artifacts programmatically.

| Skill Name          | Purpose                                               | When to Use                                                   | Technology                         | Status    |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------- | --------- |
| **canvas-design**   | Programmatic visual art via design philosophy         | Museum-quality posters, prints, artistic projects             | Python (reportlab, PIL) + 40 fonts | ✅ Active |
| **algorithmic-art** | Interactive generative art via algorithmic philosophy | Generative art, flow fields, particle systems, p5.js sketches | JavaScript (p5.js)                 | ✅ Active |

**Key characteristics:**

- **Technology**: Code execution (Python/JavaScript)
- **Speed**: Slower (code rendering)
- **Cost**: Free (local execution)
- **Scalability**: Medium (requires execution time)
- **Quality**: Deterministic (code-controlled)
- **Reproducibility**: Exact (same code = same output)

---

### 🎬 Category 3: Video Production

Skills for generating video content from text or images.

| Skill Name           | Purpose                  | When to Use                                              | Technology                     | Status    |
| -------------------- | ------------------------ | -------------------------------------------------------- | ------------------------------ | --------- |
| **video-generation** | Universal video creation | Text-to-video, image-to-video, talking heads, animations | fal-video (22+ models), HeyGen | ✅ Active |

**Key characteristics:**

- **Technology**: MCP video APIs (Veo 3, Luma Ray 2, Kling, HeyGen)
- **Speed**: Moderate-Slow (30s-5min depending on model)
- **Cost**: $0.50-3.00 per video
- **Scalability**: Medium (API rate limits)

---

### 🛠️ Category 4: Utility & Reference

Skills that provide supporting functionality, specifications, and decision frameworks.

| Skill Name             | Purpose                                  | When to Use                                          | Technology       | Status    |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------- | ---------------- | --------- |
| **platform-specs**     | Platform requirements and specifications | Check dimensions, aspect ratios, platform guidelines | Reference data   | ✅ Active |
| **mcp-tool-selection** | Tool comparison and selection guidance   | Decide between gpt-image-1 vs nanobanana vs fal      | Decision matrix  | ✅ Active |
| **brand-guidelines**   | Anthropic corporate branding             | Apply Anthropic brand colors and typography          | Python (styling) | ✅ Active |
| **slack-gif-creator**  | Animated GIF generation for Slack        | Create Slack-optimized animated GIFs                 | GIF creation     | ✅ Active |
| **theme-factory**      | Artifact theming system                  | Apply themes to slides, docs, presentations          | Theming engine   | ✅ Active |

---

## Quick Selection Guide

**"I need to..."** → **Use this skill:**

### Image Generation (AI-Based)

```
...create LinkedIn post
  → universal-image-generation (auto-loads linkedin-dark-monochrome style)

...generate Instagram graphic
  → universal-image-generation (auto-loads instagram-vibrant-minimal style)

...make YouTube thumbnail
  → universal-image-generation (auto-loads youtube/thumbnail-ctr-optimized)

...create professional Sid headshot
  → universal-image-generation (auto-loads personalization/sid-professional)

...visualize data as chart/graph
  → universal-image-generation (loads data-viz style + chart-type)

...create any other image
  → universal-image-generation (has 27 style guides total)

...edit existing image
  → edit-image

...combine multiple images
  → blend-images
```

### Artistic/Code-Based Creation

```
...create museum-quality poster
  → canvas-design (programmatic art, custom fonts)

...make generative/algorithmic art
  → algorithmic-art (p5.js interactive sketches)

...design print-ready artwork
  → canvas-design (PDF output, exact control)

...create flow fields or particle systems
  → algorithmic-art (mathematical/computational art)
```

### Video Production

```
...generate video from text
  → video-generation (Veo 3, Luma Ray 2, Kling)

...animate an image
  → video-generation (image-to-video models)

...create talking head video
  → video-generation (HeyGen avatars)
```

### Utility

```
...check platform requirements
  → platform-specs

...choose between MCP tools
  → mcp-tool-selection

...apply Anthropic branding
  → brand-guidelines

...create Slack GIF
  → slack-gif-creator

...theme a presentation
  → theme-factory
```

---

## Technology Stack

### MCP Tools (AI Image Generation)

**Primary image generators:**

- **gpt-image-1** (OpenAI DALL-E 3)
  - Best for: Text rendering, professional content, photorealism
  - Cost: ~$0.10/image
  - Speed: ~20-30s

- **nanobanana** (Gemini 2.5 Flash)
  - Best for: Social media, speed, cost-efficiency, creative
  - Cost: ~$0.039/image
  - Speed: ~5-10s

- **fal-video** (Multiple models)
  - Image models: imagen-4, flux-kontext, flux-lora
  - Best for: Creative, experimental, Sid personalization (LoRA)
  - Cost: ~$0.05-0.15/image

**Video generators:**

- **fal-video**: Veo 3, Luma Ray 2, Kling Master, Pixverse, LTX, etc. (22+ models)
- **HeyGen**: Talking head avatars

**Selection handled by:** `mcp-tool-selection` skill

### Code Libraries (Programmatic Creation)

**Python (canvas-design):**

- reportlab (PDF generation)
- PIL/Pillow (Image manipulation)
- matplotlib (Charts, if needed)
- 40 custom font files (.ttf)

**JavaScript (algorithmic-art):**

- p5.js (Generative art framework)
- HTML5 Canvas
- Mathematical/noise functions

### Core Methodologies

**Emily's JSON Methodology:**

- Source: `bmad/modules/json-prompt-generator/`
- 10-section comprehensive prompt structure
- Used by: universal-image-generation, video-generation

**7-Pillar Quality Framework:**

- Clarity, Technical Quality, Composition, Color Accuracy, Typography, Professionalism, Prompt Accuracy
- Minimum score: 7.0/10
- Target score: 8.0+

**WCAG 2.1 Accessibility:**

- Applied to all data visualizations
- Level AA compliance (4.5:1 text, 3:1 graphics)
- Dual encoding, colorblind-safe palettes

---

## Architecture Principles

### 1. Separation by Production Method

Skills organized by HOW they create, not WHAT they create:

- **AI-generated**: Prompt-based, API calls, stochastic
- **Code-generated**: Programmatic, deterministic, exact control
- **Utility**: Support and reference functions

**Benefit:** Clear technology boundaries, easier maintenance

### 2. Extensible Library System

**universal-image-generation uses style guide library:**

- Add new styles = Add 1 markdown file
- No code changes needed
- No SKILL.md updates required
- Just update `reference/style-guide.md` registry

**Current coverage:**

- 27 style guides
- 4 categories (social-media, youtube, personalization, data-visualization)
- Infinite growth potential

**Benefit:** Skills scale without architectural changes

### 3. Single Responsibility

Each skill has ONE clear purpose:

- universal-image-generation: Create new images (any style)
- edit-image: Modify existing images
- blend-images: Composite multiple images
- canvas-design: Programmatic art creation
- algorithmic-art: Generative code art
- video-generation: Video from text/images

**Benefit:** No overlap, clear selection, easier to debug

### 4. Shared Foundations

Common resources referenced by multiple skills:

- `bmad/modules/json-prompt-generator/` - Template system
- `reference/core/` in universal - Shared methodology
- `platform-specs` - Cross-referenced by all image skills

**Benefit:** DRY principle, single source of truth

---

## universal-image-generation Deep Dive

**The flagship skill** - replaces 3 old skills with unified library architecture.

### 4 Content Categories

1. **Social Media** (5+ platform styles)
   - Instagram, LinkedIn, Twitter, Facebook
   - Platform-optimized dimensions and aesthetics
   - Fast, engagement-focused

2. **YouTube** (5+ thumbnail styles)
   - CTR-optimized, educational, tech-review, gaming
   - 16:9 landscape, bold text, emotion-driven
   - With face or without face modes

3. **Personalization** (Sid images)
   - Professional headshots, casual lifestyle, speaking engagement
   - FAL LoRA model (custom-trained)
   - Consistent likeness across scenarios

4. **Data Visualization** (NEW - Research-backed)
   - **40+ chart types**: bar, line, pie, scatter, heatmap, dashboard, flow, network
   - **6 aesthetic styles**: tldraw (hand-drawn), muted-professional (corporate), vibrant-presentation, dark-mode-analytics, minimalist-modern, infographic-editorial
   - **WCAG 2.1 compliant**: Accessibility baked in
   - **Dual-dimensional**: Aesthetic style × Chart type = Perfect visualization

### Style Guide Library (27 guides)

**File structure:**

```
reference/
├── style-guide.md (central registry - update here when adding styles)
├── core/ (universal foundations)
├── categories/
│   ├── social-media/ (platform-specific styles)
│   ├── youtube/ (thumbnail styles)
│   ├── personalization/ (Sid LoRA configs)
│   └── data-visualization/
│       ├── styles/ (aesthetic treatments)
│       └── chart-types/ (data structures)
├── tools/ (MCP tool references)
├── examples/ (real-world scenarios)
└── templates/ (JSON starting points)
```

**Adding new styles:**

1. Create markdown file in appropriate category
2. Follow template structure (see any existing guide)
3. Add entry to `reference/style-guide.md` registry
4. Test with 3+ examples
5. DONE - skill auto-loads new style

**No SKILL.md edits needed!**

---

## Skill Dependencies & Cross-References

**Skills reference each other:**

```
universal-image-generation
  ├─ References: platform-specs (for dimensions)
  ├─ References: mcp-tool-selection (for tool choice)
  ├─ Uses: bmad/modules/json-prompt-generator/
  └─ Shares: Emily methodology, quality framework

video-generation
  ├─ Uses: Same Emily JSON methodology
  ├─ Uses: Same 7-pillar quality framework
  └─ Can animate: Images from universal-image-generation

canvas-design
  ├─ Independent: Uses Python code generation
  └─ Different domain: Programmatic vs AI

algorithmic-art
  ├─ Independent: Uses p5.js
  └─ Different domain: Interactive code vs static images

brand-guidelines
  ├─ Post-processing: Styles existing artifacts
  └─ Can style: Outputs from canvas-design or universal

platform-specs
  └─ Referenced by: universal-image-generation, video-generation

mcp-tool-selection
  └─ Referenced by: universal-image-generation
```

---

## Version History

### v3.0.0 (November 3, 2025) - Universal Unification

**Major changes:**

- ✅ Created `universal-image-generation` skill (29 files)
- ✅ Merged 3 skills: create-image, youtube-thumbnail-design, generating-sid-images
- ✅ Added data visualization category (research-backed, 30+ sources)
- ✅ Built extensible library architecture (27 style guides)
- ✅ Integrated WCAG 2.1 accessibility standards
- ✅ Removed redundant skills from manifest

**New capabilities:**

- Data visualization (40+ chart types, 6 aesthetic styles)
- Style guide library system (infinitely extensible)
- Intelligent category detection and routing
- Research-validated data viz best practices

**Files impacted:**

- Added: 29 files in universal-image-generation/
- Removed: create-image/, youtube-thumbnail-design/, generating-sid-images/
- Updated: skill-manifest.csv

### v2.0 (October 27, 2025) - Skills Integration

**Major changes:**

- Migrated from workflow-embedded MCP calls to skill-based architecture
- Integrated Emily's JSON methodology
- Added 7-pillar quality framework
- Created use-case-based skills (create, edit, blend)
- Added generating-sid-images with FAL LoRA

### v1.0 (Pre-October 2025) - Initial Implementation

- Direct workflow MCP tool calls
- No skill abstraction
- Manual prompt construction

---

## Adding New Skills to Zoe

### When to Create a New Skill

**Create NEW skill when:**

- ✅ Different production method (new technology)
- ✅ Completely different domain (3D rendering, SVG generation, etc.)
- ✅ Specialized workflow that doesn't fit existing skills
- ✅ New MCP tool with unique capabilities

**Extend EXISTING skill when:**

- ✅ New style variation (add to universal-image-generation library)
- ✅ New platform (add to social-media/ category)
- ✅ New chart type (add to data-visualization/chart-types/)
- ✅ Same technology, different aesthetic

### Process for Adding Skills

**Option A: Extend universal-image-generation (Recommended)**

For new image styles or platforms:

1. **Determine category**: social-media, youtube, personalization, or data-visualization
2. **Create style guide file**:
   ```
   reference/categories/{category}/{style-name}.md
   ```
3. **Follow template structure** (see any existing guide):
   - Overview
   - When to Use
   - Visual Characteristics (colors, typography, layout)
   - Prompt Patterns
   - JSON Template Adjustments
   - Negative Prompts
   - MCP Tool Recommendation
   - Examples (3-5 with prompts)
   - Quality Criteria
4. **Update registry**: Add row to `reference/style-guide.md`
5. **Test**: Generate 3+ examples
6. **Validate**: Quality scores 8.0+
7. **Update this README**: Add to appropriate table (if new category)

**No SKILL.md changes needed!** Library auto-loads new guide.

**Option B: Create New Skill**

For new technologies or production methods:

1. **Use BMad Builder**: `/bmad:bmb:workflows:create-skill`
2. **Choose research mode**: If domain-specific best practices exist
3. **Follow Anthropic conventions**:
   - Name: lowercase-with-hyphens, gerund form for actions
   - Description: What + When + Examples (max 1024 chars)
   - Structure: SKILL.md + reference/ + examples/
4. **Add to skill-manifest.csv**: Automatic via create-skill workflow
5. **Update this README**: Add to appropriate category table
6. **Test thoroughly**: Validate with real use cases

### Skill Naming Conventions

**Format:** `{action}-{object}` or `{purpose}-{domain}`

**Examples:**

- ✅ `universal-image-generation` (purpose-domain)
- ✅ `edit-image` (action-object)
- ✅ `blend-images` (action-object)
- ✅ `canvas-design` (object-action)
- ✅ `video-generation` (object-action)

**Rules:**

- Lowercase only
- Hyphens for spaces
- Max 64 characters
- Gerund form for actions (-ing → -tion, -ing)
- Descriptive and specific

---

## Skill File Structure Standards

### Minimal Skill (Simple Utility)

```
{skill-name}/
└── SKILL.md
```

### Standard Skill (Most Common)

```
{skill-name}/
├── SKILL.md
├── reference/
│   ├── methodology.md
│   ├── best-practices.md
│   └── examples.md
└── LICENSE.txt (if Anthropic official)
```

### Complex Skill (Deep Domain Knowledge)

```
{skill-name}/
├── SKILL.md
├── reference/
│   ├── core/ (foundations)
│   ├── categories/ (organizational structure)
│   ├── tools/ (technical specs)
│   └── examples/ (real-world scenarios)
├── templates/ (starting points)
├── scripts/ (helper code, if needed)
└── assets/ (fonts, data files, if needed)
```

**Example: universal-image-generation (29 files, library architecture)**

---

## Integration with Workflows

### How Workflows Use Skills

**Agent**: Zoe
**Location**: `bmad/agents/zoe/`
**Workflows**: `bmad/agents/zoe/zoe-sidecar/workflows/`

**Pattern:**

```yaml
# In workflow instructions:

Step 3: Generate image using universal-image-generation skill
  - Skill auto-detects category from request
  - Loads appropriate style guide(s)
  - Applies Emily's JSON methodology
  - Selects optimal MCP tool
  - Generates image with quality validation
```

**Skills are invoked BY NAME** in workflow instructions:

- Claude auto-loads skill when mentioned
- Skill provides methodology and execution
- Workflow coordinates multi-step processes

### Workflow Integration Examples

**generate-social-post.yaml:**

```
Uses: universal-image-generation
Automatically routes to appropriate platform style
Applies quality framework
Returns: Optimized social media image
```

**create-artistic-poster.yaml:**

```
Uses: canvas-design
Creates design philosophy first
Executes Python code to render
Returns: Museum-quality PDF/PNG
```

**generate-data-visualization.yaml:**

```
Uses: universal-image-generation (data-viz category)
Loads aesthetic style + chart type
Applies WCAG 2.1 accessibility
Returns: Professional chart/dashboard
```

---

## Quality Standards

**All Zoe outputs must meet:**

### For AI-Generated Images (universal, edit, blend)

- ✅ **7-pillar score**: Minimum 7.0/10 (target 8.0+)
- ✅ **Negative prompts**: Minimum 10 items
- ✅ **Platform compliance**: Correct dimensions, formats
- ✅ **Professional grade**: Publication-ready quality
- ✅ **Metadata complete**: Generation details documented

### For Code-Generated Art (canvas, algorithmic)

- ✅ **Master craftsmanship**: Appears painstakingly crafted
- ✅ **No overlaps**: All elements properly contained
- ✅ **Professional execution**: Museum/gallery quality
- ✅ **Philosophy adherence**: Matches design philosophy
- ✅ **Technical precision**: Clean code, optimized rendering

### For Data Visualizations (Specific to charts/graphs)

- ✅ **WCAG 2.1 AA**: Contrast ratios validated
- ✅ **Dual encoding**: Never color alone
- ✅ **Accessibility tested**: Colorblind simulation
- ✅ **Chart best practices**: Zero baseline (bars), appropriate type for data
- ✅ **Research-backed**: Follows proven methodologies

### For Videos

- ✅ **Tool appropriate**: Right model for use case
- ✅ **Prompt optimized**: Platform-specific formatting
- ✅ **Quality validated**: Visual and audio quality checked

---

## Maintenance Guidelines

### When Updating This README

**Always update when:**

- ✅ New skill added to zoe/ directory
- ✅ Skill removed or deprecated
- ✅ Major version change (architecture shift)
- ✅ New production technology added
- ✅ Skill purpose or scope changes

**Update these sections:**

1. **Skill Categories tables** - Add/remove rows
2. **Quick Selection Guide** - Add new use cases
3. **Technology Stack** - If new tools added
4. **Version History** - Document changes
5. **Version number** - Increment appropriately

### Version Numbering

**Semantic versioning:** MAJOR.MINOR.PATCH

- **MAJOR** (X.0.0): Architecture changes, skill consolidation, breaking changes
- **MINOR** (x.X.0): New skills added, significant enhancements
- **PATCH** (x.x.X): Bug fixes, documentation updates, small improvements

**Current:** 3.0.0 (major architectural change with universal-image-generation)

### Skill Status Indicators

Use in tables:

- ✅ **Active**: Production-ready, fully functional
- ⚠️ **Beta**: Testing phase, may have issues
- 🔄 **Updating**: Being revised or enhanced
- ⏸️ **Deprecated**: Replaced by another skill, will be removed
- ❌ **Removed**: No longer available

---

## Research & Methodology Sources

### Image Generation

- Emily's 30 validated prompt examples
- Visual Prompt Mastery patterns
- Platform-specific best practices

### Data Visualization (NEW in v3.0)

**30+ authoritative sources:**

- DataTeams AI: 8 Best Practices (2025)
- Datawrapper: 40 Chart Types Guide (2025)
- Hands-On Data Visualization (Dougherty & Ilyankou)
- UXPin: Dashboard Design Principles (2025)
- Google Material Design: Data Viz Accessibility
- Smashing Magazine: WCAG Chart Design (2024)
- Royal Statistical Society: Best Practices Guide
- WCAG 2.1: Official Accessibility Standards
- Cleveland & McGill: Graphical Perception (1985)
- Edward Tufte: Visual Display of Quantitative Information

### Video Production

- fal-video documentation (22+ models)
- HeyGen API reference
- Emily's JSON methodology adapted for video

### Artistic/Code-Based

- Anthropic official skills (canvas-design, algorithmic-art)
- p5.js documentation
- Generative art best practices

---

## File Count Statistics

**Current inventory:**

```
Total files in zoe/: 29 skill files + 100+ reference files

Breakdown by skill:
- universal-image-generation: 29 files (largest, library architecture)
- video-generation: ~6 files
- edit-image: ~5 files
- blend-images: ~4 files
- platform-specs: ~6 files
- mcp-tool-selection: ~4 files
- canvas-design: 3 files + 40 fonts (80+ files total)
- algorithmic-art: ~5 files
- brand-guidelines: 2 files
- slack-gif-creator: ~3 files
- theme-factory: ~3 files

Total: 200+ files supporting Zoe's visual production capabilities
```

---

## Related Documentation

**Agent-level:**

- **Zoe Agent Definition**: `bmad/agents/zoe/zoe.md`
- **Zoe Configuration**: `bmad/agents/zoe/zoe-sidecar/config.yaml`
- **Zoe Workflows**: `bmad/agents/zoe/zoe-sidecar/workflows/`

**Module-level:**

- **JSON Prompt Generator**: `bmad/modules/json-prompt-generator/`
- **Platform Specs Module**: `bmad/modules/platform-specs/` (if exists)

**System-level:**

- **MCP Configuration**: `.mcp.json` (tool setup)
- **Skill Manifest**: `bmad/_cfg/skill-manifest.csv` (all skills registry)
- **Files Manifest**: `bmad/_cfg/files-manifest.csv` (file tracking)

**Project Documentation:**

- **Main README**: `README.md` (project overview)
- **CLAUDE.md**: `CLAUDE.md` (Claude Code instructions)

---

## Future Expansion Roadmap

### Planned Additions (Easy to add)

**Social Media Platforms:**

- TikTok vertical design (9:16 format)
- Pinterest pin design
- Reddit image posts
- Medium article headers

**Data Visualization Styles:**

- vibrant-presentation.md
- minimalist-modern.md
- infographic-editorial.md
- retro-80s-data.md
- futuristic-holographic.md

**Data Visualization Chart Types:**

- pie-charts.md
- scatter-plots.md
- heatmaps.md
- flow-diagrams.md
- network-graphs.md
- sankey-diagrams.md
- treemaps.md
- violin-plots.md

**YouTube Variations:**

- thumbnail-vlog-style.md
- thumbnail-documentary.md
- thumbnail-comedy.md
- shorts-vertical-thumbnails.md

**Personalization:**

- Additional team member LoRA models
- Brand character LoRA models
- Mascot/avatar generation

### Potential New Skills (Require new technology)

- **3d-visualization**: Three.js or Blender-based 3D generation
- **svg-generator**: Vector graphics creation
- **icon-design**: Icon set generation
- **animation-frames**: Frame-by-frame animation creation
- **texture-generation**: Seamless texture/pattern creation

**Note:** Check if new domain fits in existing skills before creating new ones!

---

## Troubleshooting

### Skill Not Loading

**Problem:** Claude doesn't mention skill in response
**Solutions:**

1. Restart Claude Code (skills load at session start)
2. Check skill-manifest.csv (skill registered?)
3. Verify SKILL.md has valid YAML frontmatter
4. Check description triggers match user query

### Wrong Skill Activates

**Problem:** Different skill than expected loads
**Solutions:**

1. Check description triggers (may overlap)
2. Make triggers more specific
3. User can explicitly request: "Using {skill-name} skill, do X"

### Quality Scores Low

**Problem:** Generated images score < 7.0
**Solutions:**

1. Review style guide requirements
2. Check negative prompts applied (min 10)
3. Verify tool selection appropriate
4. Try different MCP tool
5. Refine prompt with more specificity

### File Not Found Errors

**Problem:** Skill references missing file
**Solutions:**

1. Check file path in SKILL.md (relative paths)
2. Verify file exists in reference/ directory
3. Check spelling and case-sensitivity
4. Ensure forward slashes (Unix-style paths)

---

## Contributing

### How to Contribute New Styles to universal-image-generation

1. **Fork or create branch**
2. **Add style guide** to appropriate category
3. **Follow template structure** (see existing guides)
4. **Test with 3+ examples** (document results)
5. **Update style-guide.md registry**
6. **Submit PR** with examples
7. **Update this README** (if new category)

### How to Contribute New Skills

1. **Use BMad Builder**: `/bmad:bmb:workflows:create-skill`
2. **Research if appropriate**: Use research mode for domain expertise
3. **Follow Anthropic standards**: Naming, description, structure
4. **Create comprehensive reference files**
5. **Test thoroughly**: Real-world scenarios
6. **Update skill-manifest.csv**: Via workflow or manual
7. **Update this README**: Add to appropriate category table
8. **Document in version history**

---

## Support & Resources

**For skill development:**

- BMad Builder: `/bmad:bmb:workflows:create-skill`
- Edit skill: `/bmad:bmb:workflows:edit-skill`
- Anthropic best practices: `bmad/bmb/workflows/create-skill/anthropic-best-practices.md`

**For visual production:**

- Emily's methodology: `universal-image-generation/reference/core/emily-json-methodology.md`
- Quality framework: `universal-image-generation/reference/core/quality-framework.md`
- Style registry: `universal-image-generation/reference/style-guide.md`

**For data visualization:**

- Category guide: `universal-image-generation/reference/categories/data-visualization/_category-guide.md`
- Research sources: 30+ cited in style guides
- WCAG 2.1: https://www.w3.org/TR/WCAG21/

---

## License & Attribution

**Anthropic Official Skills:**

- algorithmic-art (Anthropic, see LICENSE.txt)
- brand-guidelines (Anthropic, see LICENSE.txt)
- canvas-design (Anthropic, see LICENSE.txt)
- slack-gif-creator (Anthropic, see LICENSE.txt)

**Custom Skills:**

- universal-image-generation (BMad Builder, research-enhanced)
- edit-image, blend-images (Custom)
- video-generation (Custom)
- platform-specs, mcp-tool-selection (Custom)
- theme-factory (Custom)

**Methodologies:**

- Emily's JSON: Developed from 30 validated examples
- 7-Pillar Framework: Original quality system
- Data Viz Research: Synthesized from 30+ authoritative sources

---

**This README is the authoritative guide to Zoe's visual production capabilities. Keep it updated as skills evolve and expand.**

_Last updated: November 3, 2025 by BMad Builder_
_Version: 3.0.0_
_Skills: 13 active_
