# Test Execution Guide - LinkedIn Carousel

**Purpose:** Validate the JSON-first approach and MCP integration before building full system

**Test Case:** Generate 3-slide LinkedIn carousel about "AI Agent Architecture"

---

## 📋 Prerequisites

Before running this test:

1. ✅ MCP servers installed (OpenAI gpt-image-1 or Gemini nanobanana)
2. ✅ API keys configured in `config.yaml`
3. ✅ Agent compiled and active
4. ✅ Template file exists: `templates/TEST-linkedin-carousel-ai-agents.json`
5. ✅ Workflow file exists: `workflows/TEST-linkedin-carousel.yaml`

---

## 🚀 Manual Test Execution Steps

### Step 1: Review the JSON Template

Open: `ai-image-generator-sidecar/templates/TEST-linkedin-carousel-ai-agents.json`

**Check:**
- ✅ 3 slides defined (title, diagram, process flow)
- ✅ Each slide has `prompt_details` with scene_description
- ✅ Typography specs included
- ✅ Color palette consistent
- ✅ Negative prompts comprehensive
- ✅ Provider routing set to `openai`

### Step 2: Extract Prompts for Each Slide

For each slide, construct the full prompt by combining:

**Slide 1 Prompt Construction:**
```
BASE: [scene_description from slide 1]

APPEND Typography:
Typography: [title_font], [subtitle_font], colors [text_color_title], [text_color_subtitle]

APPEND Composition:
Composition: [layout_system], [white_space], [focal_point], [background_pattern]

APPEND Color Palette:
Colors: primary [#1A73E8], secondary [#E8F4F8], text [#202124], background [#FFFFFF]

APPEND Quality:
Quality: 1080x1080px, sRGB, PNG format, WCAG AAA contrast (7:1), professional design

APPEND Negative Prompt:
Negative: [join all negative_prompt array items with commas]
```

**Example Full Prompt for Slide 1:**
```
Professional LinkedIn carousel title slide with clean modern design. White background with subtle geometric pattern of interconnected nodes in light blue (#E8F4F8). Centered text hierarchy with large bold title 'AI Agent Architecture' in dark charcoal (#202124) and smaller subtitle 'The Modern Framework' in medium gray (#5F6368).

Typography: Inter Bold 64px with -0.02em letter-spacing for title, Inter Regular 28px for subtitle, center-aligned, colors #202124 and #5F6368

Composition: Centered layout with 80px margins, 45% white space for breathing room, center focal point, top-to-bottom flow, subtle grid of connected dots (15% opacity) in light blue (#E8F4F8)

Colors: primary #1A73E8, secondary #E8F4F8, text #202124, text secondary #5F6368, background #FFFFFF

Quality: 1080x1080px minimum resolution, sRGB color space, PNG format, WCAG AAA contrast ratio (7:1 minimum), professional enterprise-grade design, clean and uncluttered

Negative: cluttered, overcrowded, too much text, cramped layout, low contrast, illegible text, tiny fonts under 16px, generic stock photos, cheesy clip-art, unprofessional icons, inconsistent fonts, random colors, off-brand palette, spelling errors, grammatical mistakes, typos, pixelated, blurry, jpeg artifacts, compression artifacts, 3D rendered text, heavy drop shadows, gaudy gradients, misaligned elements, broken grid, poor spacing, uneven margins, busy backgrounds, distracting patterns, visual noise, amateurish, messy, unpolished, low-quality design, wrong aspect ratio, incorrect dimensions, cartoon style, comic book, illustration, realistic photos when diagrams needed, decorative elements that don't serve function
```

### Step 3: Test MCP Server Connection

**Option A: Test via Claude Code (if agent active)**
```
/ai-image-agent
*config
```
Check that MCP servers are listed and available.

**Option B: Test via Command Line**
```bash
# Test OpenAI
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "test image",
    "model": "gpt-image-1",
    "size": "1024x1024",
    "n": 1
  }'

# Test Gemini (if using nanobanana)
# Check if uvx command works
uvx nanobanana-mcp-server@latest --help
```

### Step 4: Generate Slide 1

**Using MCP Tool:**
```
Call: mcp__gpt-image-1__generate_image
Parameters:
  - prompt: [full constructed prompt from Step 2]
  - size: "1024x1024"
  - quality: "high"
  - format: "png"
```

**Save Result:**
- Image → `outputs/test-carousel/linkedin_carousel_ai_agents_slide_1.png`
- Metadata → `outputs/test-carousel/linkedin_carousel_ai_agents_slide_1_metadata.json`

**Metadata JSON Format:**
```json
{
  "slide_number": 1,
  "template_used": "TEST-linkedin-carousel-ai-agents.json",
  "prompt": "[full prompt used]",
  "provider": "openai",
  "model": "gpt-image-1",
  "dimensions": "1024x1024",
  "timestamp": "2025-10-25T10:30:00Z",
  "quality_checks": {
    "text_legible": true/false,
    "colors_accurate": true/false,
    "composition_clean": true/false
  }
}
```

### Step 5: Review Slide 1 Quality

**Check Against Template:**
- ✅ Title text "AI Agent Architecture" is present and legible
- ✅ Subtitle "The Modern Framework" is present
- ✅ Background pattern matches description (connected dots, light blue)
- ✅ Colors match palette (#1A73E8, #E8F4F8, #202124, #5F6368)
- ✅ Layout is centered with proper margins
- ✅ Professional appearance (no clip-art, no messy elements)
- ✅ Text is readable (WCAG AAA contrast)

**Document Issues:**
- ❌ Text too small? (note in test report)
- ❌ Colors off? (document actual vs expected)
- ❌ Layout crowded? (note spacing issues)
- ❌ Quality low? (check for artifacts)

### Step 6: Generate Slides 2 & 3

Repeat Step 4-5 for:
- **Slide 2:** Diagram (Core Components)
- **Slide 3:** Process Flow (Agent Workflow)

**Special attention for Slide 2 (Diagram):**
- ✅ Hub-and-spoke architecture visible
- ✅ 5 components present (LLM Brain, Tools, Memory, Planning, Execution)
- ✅ Connectors (arrows) between nodes
- ✅ Color coding correct per template
- ✅ Labels legible inside boxes

**Special attention for Slide 3 (Process Flow):**
- ✅ 5 steps in vertical sequence
- ✅ Numbered circles (1-5) visible
- ✅ Arrows between steps
- ✅ Alternating colors (#E8F4F8, #F1F3F4)
- ✅ CTA text at bottom

### Step 7: Create Test Report

Create: `outputs/test-carousel/TEST_REPORT.md`

**Template:**
```markdown
# LinkedIn Carousel Test Report
**Test Date:** [date]
**Test Case:** AI Agent Architecture (3 slides)
**Provider:** OpenAI gpt-image-1

## ✅ What Worked Well

- [e.g., "Text rendering was sharp and legible"]
- [e.g., "Color palette was accurately reproduced"]
- [e.g., "Diagram structure matched template"]

## ❌ What Failed or Needs Improvement

- [e.g., "Slide 2 diagram too complex, simplified version needed"]
- [e.g., "Typography sizes not matching spec exactly"]
- [e.g., "Background pattern too subtle, increase opacity"]

## 📝 JSON Template Quality

**Strengths:**
- [e.g., "Comprehensive prompt_details"]
- [e.g., "Clear negative prompts"]

**Weaknesses:**
- [e.g., "Typography specs need more detail"]
- [e.g., "Composition rules could be more specific"]

## 🎨 Visual Output Quality

**Slide 1:** [score 1-10] - [brief comment]
**Slide 2:** [score 1-10] - [brief comment]
**Slide 3:** [score 1-10] - [brief comment]

**Overall:** [average score]

## ⚡ Provider Performance

**Response Time:**
- Slide 1: [X seconds]
- Slide 2: [X seconds]
- Slide 3: [X seconds]

**Reliability:** [all succeeded / X failures]

**Cost:** $[if tracked]

## 🔧 Needed Refinements

### Template Updates:
1. [specific change needed]
2. [specific change needed]

### Prompt Construction:
1. [specific change needed]
2. [specific change needed]

### Workflow Improvements:
1. [specific change needed]
2. [specific change needed]

## 📊 Success Criteria

- ✅/❌ 3 slides generated
- ✅/❌ Text legible on all slides
- ✅/❌ Colors accurate
- ✅/❌ Professional appearance
- ✅/❌ Meets LinkedIn specs (1080x1080)

## 🚀 Next Steps

1. [based on results]
2. [based on results]
3. [based on results]
```

---

## 🎯 Expected Outcomes

**If Test Succeeds:**
- ✅ You'll have 3 professional LinkedIn carousel slides
- ✅ JSON template approach validated
- ✅ MCP integration confirmed working
- ✅ Ready to build full workflows

**If Test Fails:**
- ❌ Document failure points
- ❌ Refine JSON template
- ❌ Adjust prompt construction
- ❌ Test alternative providers

---

## 🔍 Troubleshooting

### "MCP server not found"
- Check `MCP_SETUP.md` for installation
- Verify API keys in `config.yaml`
- Restart Claude Code

### "Generated image low quality"
- Check prompt construction (all sections included?)
- Verify negative prompts are being used
- Try increasing quality parameter
- Consider alternative provider

### "Text not matching template"
- AI may not render exact fonts/sizes
- Focus on legibility and relative hierarchy
- Accept some variation (AI interpretation)
- Refine prompt for emphasis on text

### "Colors off"
- Specify hex codes explicitly
- Use color theory terms (complementary, etc.)
- Reference color palette multiple times in prompt
- Check sRGB color space

---

## 📚 Resources

**During Test:**
- Template: `templates/TEST-linkedin-carousel-ai-agents.json`
- Workflow: `workflows/TEST-linkedin-carousel.yaml`
- Capabilities: `MCP_CAPABILITIES.md`
- Config: `config.yaml`

**After Test:**
- Save results to: `outputs/test-carousel/`
- Create report: `outputs/test-carousel/TEST_REPORT.md`
- Share learnings with team

---

**Ready to test! Good luck, sid!** 🚀
