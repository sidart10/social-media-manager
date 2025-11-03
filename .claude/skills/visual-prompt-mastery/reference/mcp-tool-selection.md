# MCP Tool Selection Guide

Complete decision matrix for selecting optimal image/video generation tools.

---

## Tool Name Reference (IMPORTANT)

When calling MCP tools, use these EXACT names:

| Conceptual Name | Actual Tool Name                       | Status      |
| --------------- | -------------------------------------- | ----------- |
| nanobanana      | `mcp__nanobanana__generate_image`      | Active      |
| gpt-image-1     | `mcp__gpt-image-1__create_image`       | Active      |
| fal-video       | `mcp__fal-video__execute_custom_model` | PRIMARY     |
| heygen          | `mcp__heygen__generate_avatar_video`   | Specialized |
| veotools        | `mcp__veotools__generate_start`        | Deprecated  |

**Video Strategy:** Use fal-video for ALL video generation (access to 22+ models including Veo 3).
Use heygen ONLY for talking head avatars. Avoid veotools (superseded by fal-video).

---

## Available MCP Tools

### Image Generation Tools

#### 1. nanobanana (Google Gemini 2.5 Flash Image)

- **Provider:** Google
- **Model:** Gemini 2.5 Flash "nano banana"
- **Cost:** ~$0.039 per image
- **Speed:** Fast (2-5 seconds)
- **Max Prompt:** 8,192 characters
- **Modes:** generate, edit, blend (up to 3 images)
- **Output:** 1-4 images per request

**Strengths:**

- Excellent for creative/artistic content
- Fast iteration speed
- Image editing capabilities
- Multi-image blending (2-3 images)
- Cost-effective for volume
- Good with system_instruction for overall tone

**Weaknesses:**

- Text rendering moderate (6-7/10)
- Less photorealistic than gpt-image-1
- Occasional anatomy issues

**Best For:**

- Instagram creative content
- Twitter images
- Volume generation (carousels, variants)
- Image editing/refinement
- Multi-image composition
- Quick prototypes

#### 2. gpt-image-1 (OpenAI DALL-E 3)

- **Provider:** OpenAI
- **Model:** DALL-E 3
- **Cost:** Higher than nanobanana
- **Speed:** Medium (5-10 seconds)
- **Max Prompt:** 32,000 characters
- **Output:** 1-10 images per request
- **Sizes:** Limited (1024x1024, 1536x1024, 1024x1536)

**Strengths:**

- Exceptional photorealism (9.5/10)
- Best-in-class text rendering (9.5/10)
- Professional quality
- Accurate to detailed prompts
- Reliable anatomy

**Weaknesses:**

- Higher cost
- Limited aspect ratio options
- Less creative freedom (more literal)
- No editing mode
- Slower for iterations

**Best For:**

- LinkedIn professional content
- YouTube thumbnails (text critical)
- Headshots and portraits
- Product photography
- Any content with text
- Professional/corporate needs

### Video Generation Tools

#### 3. fal-video (PRIMARY - Universal Video Hub)

- **MCP:** fal-video (mcp**fal-video**execute_custom_model)
- **Provider:** FAL.ai
- **Models Available:** 22+
  - Veo 3 (Google) - via "fal-ai/veo-3" endpoint
  - Luma Ray 2 (Dream Machine) - "fal-ai/luma-dream-machine-ray2"
  - Kling Master 2.1 - "fal-ai/kling-video/v1.5/pro/text-to-video"
  - Pixverse V4.5 - "fal-ai/pixverse/v4.5"
  - Plus 18+ more models
- **Duration:** 5-30 seconds (model-dependent)
- **Cost:** $0.30-3.00 per video (model-dependent)
- **Speed:** 60-180 seconds generation

**When to Use:**

- ALL video generation (except talking heads)
- B-roll scenes and diagram animation
- Image-to-video conversion
- Text-to-video creation
- Cinematic videos (Luma Ray 2)
- Fast generation (Veo 3, Pixverse)

#### 4. heygen (SPECIALIZED - Talking Heads Only)

- **MCP:** heygen (mcp**heygen**generate_avatar_video)
- **Provider:** HeyGen
- **Use Case:** ONLY for presenter-style talking head videos
- **Cost:** $0.20-0.50 per minute
- **Capabilities:** Avatar customization, voice cloning, multi-language

**When to Use:**

- Talking head presenter videos
- Educational content with on-screen presenter
- Personal brand videos requiring face/voice

#### 5. veotools (DEPRECATED)

⚠️ **Status:** Deprecated - Use fal-video instead

- **Reason:** Veo 3 accessible via fal-video with 21 additional models
- **Keep for:** Backup only if fal-video unavailable
- **Migration:** All veotools functionality available via fal-video execute_custom_model

**Strengths:**

- Cinematic quality
- Audio generation and sync
- Realistic physics
- Dialogue lip-sync
- Professional cinematography

**Weaknesses:**

- Slower generation
- Higher cost
- 8-30s duration limit
- Complex subjects challenging

**Best For:**

- YouTube videos
- Cinematic content
- Narrative sequences
- Content with dialogue
- Professional video needs

#### 4. fal-video (Multiple Models)

- **Provider:** FAL (aggregator)
- **Models:** Veo3, Kling, Luma Ray2, Pixverse, etc.
- **Duration:** Model-dependent (5-30s)
- **Cost:** Model-dependent
- **Speed:** Variable

**Strengths:**

- Model variety
- Custom model training (LoRA)
- Personalized content (Sid's model)
- Flexible options

**Weaknesses:**

- Inconsistent quality across models
- Different prompt styles per model
- More complex to use

**Best For:**

- Personalized content (Sid in videos)
- Model comparison
- Specific model requirements
- Custom training needs

---

## Decision Matrix

### Primary Decision: Image or Video?

```
Content Type?
├─ IMAGE → nanobanana OR gpt-image-1
└─ VIDEO → veotools OR fal-video
```

### Image Tool Selection Decision Tree

```
Is text rendering critical?
├─ YES (Thumbnails, Quotes, Typography)
│   └─ gpt-image-1
│
└─ NO → What's the use case?
    ├─ Professional/Corporate (LinkedIn)
    │   └─ gpt-image-1 (quality + professionalism)
    │
    ├─ Creative/Social (Instagram, Twitter)
    │   └─ nanobanana (creative + cost)
    │
    ├─ Volume Needed (Carousels, Variants)
    │   └─ nanobanana (cost-effective)
    │
    ├─ Editing/Refinement Needed
    │   └─ nanobanana (edit mode)
    │
    └─ Multi-Image Blending
        └─ nanobanana (supports 3 images)
```

### Video Tool Selection Decision Tree

```
Need personalized content (Sid)?
├─ YES → fal-video (custom LoRA)
│
└─ NO → Quality vs Speed?
    ├─ Quality + Audio (Professional)
    │   └─ veotools (Veo 3)
    │
    ├─ Speed + Testing (Prototypes)
    │   └─ fal-video (faster models)
    │
    └─ Specific Model Requirements
        └─ fal-video (model variety)
```

---

## Tool Selection by Platform

| Platform  | Content Type        | Recommended Tool      | Rationale                          |
| --------- | ------------------- | --------------------- | ---------------------------------- |
| Instagram | Post (no text)      | nanobanana            | Creative + cost + social aesthetic |
| Instagram | Post (with text)    | gpt-image-1           | Text rendering needed              |
| Instagram | Reel video          | veotools              | Quality + audio                    |
| LinkedIn  | Graphic (no text)   | gpt-image-1           | Professional quality               |
| LinkedIn  | Graphic (with text) | gpt-image-1           | Text rendering + professional      |
| Twitter   | Image               | nanobanana            | Volume + speed + cost              |
| YouTube   | Thumbnail           | gpt-image-1           | Text rendering critical            |
| YouTube   | Video               | veotools              | Cinematic + audio                  |
| TikTok    | Video               | veotools or fal-video | Vertical video, trend-aware        |
| Pinterest | Pin                 | nanobanana            | Volume + creative                  |

---

## Tool Comparison Matrix

### Image Generation

| Feature                | nanobanana        | gpt-image-1         |
| ---------------------- | ----------------- | ------------------- |
| **Cost per Image**     | ~$0.039           | Higher              |
| **Speed**              | 2-5 seconds       | 5-10 seconds        |
| **Photorealism**       | 8.5/10            | 9.5/10              |
| **Text Rendering**     | 6-7/10            | 9.5/10              |
| **Creative Freedom**   | High              | Medium              |
| **Editing Mode**       | Yes               | No                  |
| **Multi-Image Blend**  | Yes (3 images)    | No                  |
| **Max Prompt Length**  | 8,192 chars       | 32,000 chars        |
| **Output Count**       | 1-4 per request   | 1-10 per request    |
| **Aspect Ratios**      | Flexible          | Limited (3 options) |
| **System Instruction** | Yes               | No                  |
| **Negative Prompts**   | Yes (1,024 chars) | No direct support   |

**When Cost Matters:**

- Single image: Similar cost
- Volume (10+ images): nanobanana saves 40-60%
- Professional (1-3 images): gpt-image-1 worth premium

**When Speed Matters:**

- Quick iterations: nanobanana (2-5s)
- Single generation: Similar (both fast)
- Editing: nanobanana only option

### Video Generation

| Feature           | veotools (Veo 3) | fal-video (varies)      |
| ----------------- | ---------------- | ----------------------- |
| **Max Duration**  | 8-30 seconds     | 5-30s (model-dependent) |
| **Audio**         | Yes (generated)  | Model-dependent         |
| **Dialogue Sync** | Yes              | Limited                 |
| **Quality**       | Cinematic high   | Variable                |
| **Speed**         | Minutes          | Variable                |
| **Custom Models** | No               | Yes (LoRA)              |
| **Cost**          | Higher           | Model-dependent         |

---

## Tool Selection Examples

### Example 1: Instagram Post (No Text)

**Request:** "Create Instagram post about morning routine"

**Analysis:**

- Platform: Instagram (4:5 aspect)
- Text: None
- Type: Social/casual
- Volume: Single image
- Quality: Social media standard

**Tool Selection:** **nanobanana**

**Reasoning:**

- Instagram creative content (strength)
- No text rendering needed
- Cost-effective for social
- Creative freedom for lifestyle content
- Appropriate quality level

### Example 2: LinkedIn Quote Graphic

**Request:** "Create LinkedIn post with quote 'AI Doesn't Replace You. It Amplifies You.'"

**Analysis:**

- Platform: LinkedIn (1:1 aspect)
- Text: YES (critical)
- Type: Professional
- Volume: Single image
- Quality: Professional standard

**Tool Selection:** **gpt-image-1**

**Reasoning:**

- Text rendering critical (9.5/10)
- Professional platform (quality matters)
- Quote legibility essential
- Worth premium for text quality

### Example 3: YouTube Thumbnail

**Request:** "Create thumbnail for 'How I Built 10 AI Agents' video"

**Analysis:**

- Platform: YouTube (16:9)
- Text: YES ("10 AI Agents" text overlay)
- Type: Thumbnail (CTR-optimized)
- Volume: 1-3 variants
- Quality: High (clickthrough critical)

**Tool Selection:** **gpt-image-1**

**Reasoning:**

- Text rendering critical
- Small preview size (must be clear)
- Professional quality needed
- Worth premium for CTR impact

### Example 4: Instagram Carousel (5 slides)

**Request:** "Create 5-slide Instagram carousel about productivity tips"

**Analysis:**

- Platform: Instagram (4:5 aspect)
- Text: Maybe minimal
- Type: Educational/social
- Volume: 5 images
- Quality: Social standard

**Tool Selection:** **nanobanana**

**Reasoning:**

- Volume discount (5 images)
- Social media quality sufficient
- Cost: $0.039 × 5 = $0.195 (vs higher for gpt-image-1)
- Creative freedom for variety
- Text minimal (captions instead)

### Example 5: TikTok Video

**Request:** "Create TikTok video showing product unboxing"

**Analysis:**

- Platform: TikTok (9:16 vertical)
- Type: Video
- Duration: 8 seconds
- Audio: Optional but helpful
- Quality: Social video

**Tool Selection:** **veotools**

**Reasoning:**

- Vertical video support
- Audio generation adds value
- Cinematic quality appropriate
- Timeline beats for structure

### Example 6: Personalized Video (Sid)

**Request:** "Create video of Sid explaining AI concept"

**Analysis:**

- Subject: Sid (personalized)
- Type: Video
- Custom: YES (Sid's LoRA model)
- Quality: Professional

**Tool Selection:** **fal-video with Sid's LoRA**

**Reasoning:**

- Custom model required (Sid's trained model)
- Personalization critical
- fal-video supports custom LoRA
- Only tool that can generate Sid specifically

---

## Cost-Benefit Analysis

### Scenario: Instagram Post (Single)

- **nanobanana:** $0.039, 3 seconds, 8.5/10 quality
- **gpt-image-1:** $0.06-0.08, 7 seconds, 9.5/10 quality
- **Recommendation:** nanobanana (quality difference not worth 2x cost for social)

### Scenario: LinkedIn Post (Single)

- **nanobanana:** $0.039, 3 seconds, 8.5/10 quality
- **gpt-image-1:** $0.06-0.08, 7 seconds, 9.5/10 quality
- **Recommendation:** gpt-image-1 (professionalism worth premium)

### Scenario: Carousel (10 images)

- **nanobanana:** $0.39, 30 seconds total, 8.5/10 quality
- **gpt-image-1:** $0.60-0.80, 70 seconds total, 9.5/10 quality
- **Recommendation:** nanobanana (save 40-50%, quality sufficient)

### Scenario: YouTube Thumbnail (3 variants)

- **nanobanana:** $0.12, 10 seconds, text 6-7/10
- **gpt-image-1:** $0.18-0.24, 20 seconds, text 9.5/10
- **Recommendation:** gpt-image-1 (text quality critical for CTR)

---

## Tool Selection Checklist

Before selecting tool, answer these questions:

### Question 1: Is there text in the image?

- **Yes + text critical (thumbnail, quote)** → gpt-image-1
- **Yes + text minor (label, watermark)** → Either OK
- **No text** → Consider other factors

### Question 2: What's the platform?

- **LinkedIn (professional)** → gpt-image-1
- **Instagram (creative/social)** → nanobanana
- **YouTube (thumbnail text)** → gpt-image-1
- **Twitter (volume)** → nanobanana

### Question 3: How many images needed?

- **1-3 images** → Quality matters, consider gpt-image-1
- **4-10 images** → Cost matters, use nanobanana
- **10+ images** → nanobanana (significant savings)

### Question 4: Need editing or multi-image blend?

- **Yes** → nanobanana ONLY option
- **No** → Either tool OK

### Question 5: Photorealism critical?

- **Yes (headshots, products)** → gpt-image-1 (9.5/10)
- **No (creative, social)** → nanobanana (8.5/10 sufficient)

### Question 6: What's the budget?

- **Budget-conscious** → nanobanana
- **Quality-first** → gpt-image-1
- **Unlimited** → Choose based on use case

---

## Tool Parameters Reference

### nanobanana Parameters

```python
generate_image(
    prompt: str,                    # Main prompt (8,192 char max)
    mode: str = "auto",             # "generate", "edit", or "auto"
    n: int = 1,                     # 1-4 images
    negative_prompt: str = None,    # What to avoid (1,024 char max)
    system_instruction: str = None, # Overall tone/style (512 char max)
    input_image_path_1: str = None, # For editing/blending
    input_image_path_2: str = None, # For blending (optional)
    input_image_path_3: str = None, # For blending (optional)
    quality: str = "auto",          # "high", "medium", "low", "auto"
    output_format: str = "png"      # "png", "jpeg", "webp"
)
```

**Usage Tips:**

- Use `system_instruction` for overall aesthetic tone
- Use `negative_prompt` extensively (10+ items)
- Use `quality="high"` for professional work
- Use `n=4` for variants/testing

### gpt-image-1 Parameters

```python
create_image(
    prompt: str,                    # Main prompt (32,000 char max)
    size: str = "1024x1024",        # "1024x1024", "1536x1024", "1024x1536"
    quality: str = "auto",          # "high", "medium", "low", "auto"
    n: int = 1,                     # 1-10 images
    output_format: str = "png",     # "png", "jpeg", "webp"
    background: str = "auto"        # "transparent", "opaque", "auto"
)
```

**Usage Tips:**

- Choose `size` based on platform needs
- Use `quality="high"` for professional content
- Request `background="transparent"` for graphics with transparency
- Can generate up to 10 images in one request

### veotools Parameters

```python
generate_start(
    prompt: str,                    # Structured video prompt
    model: str = None,              # Veo model variant
    input_image_path: str = None,   # For image-to-video
    input_video_path: str = None,   # For continuation
    options: dict = None            # Additional config
)
```

**Usage Tips:**

- Use structured prompt with timeline beats
- Specify single camera motion
- Include physics per beat
- Add audio specifications if dialogue needed

---

## Tool Selection Quick Reference

### By Use Case

| Use Case              | Tool        | Why                                |
| --------------------- | ----------- | ---------------------------------- |
| Instagram casual post | nanobanana  | Creative + cost + social aesthetic |
| LinkedIn professional | gpt-image-1 | Professional + potential text      |
| YouTube thumbnail     | gpt-image-1 | Text rendering critical            |
| Twitter thread images | nanobanana  | Volume + speed                     |
| TikTok/Reels video    | veotools    | Quality + audio                    |
| Product photos        | gpt-image-1 | Photorealism                       |
| Headshots/portraits   | gpt-image-1 | Accuracy + quality                 |
| Creative/artistic     | nanobanana  | Freedom + experimentation          |
| Image editing         | nanobanana  | ONLY tool with edit mode           |
| Multi-image blend     | nanobanana  | ONLY tool with blend               |
| Personalized (Sid)    | fal-video   | Custom LoRA model                  |

### By Quality Need

| Quality Level         | Image Tool  | Video Tool               |
| --------------------- | ----------- | ------------------------ |
| Social media standard | nanobanana  | fal-video (quick models) |
| Professional quality  | gpt-image-1 | veotools                 |
| Maximum quality       | gpt-image-1 | veotools                 |
| Testing/prototype     | nanobanana  | fal-video                |

### By Budget

| Budget Level   | Image Tool         | Video Tool                 |
| -------------- | ------------------ | -------------------------- |
| Cost-conscious | nanobanana         | fal-video (cheaper models) |
| Balanced       | Context-dependent  | Context-dependent          |
| Quality-first  | gpt-image-1        | veotools                   |
| Unlimited      | Choose by use case | Choose by use case         |

---

## Integration with Emily's Patterns

### Pattern → Tool Mapping

**Social/Selfie Patterns → nanobanana**

- Y2K aesthetic: Creative interpretation (nanobanana strength)
- K-Beauty studio: Good quality, social platform
- Gaming corner: Themed creativity

**Professional/Editorial → gpt-image-1**

- Glacial couture: Professional quality needed
- Studio portraits: Photorealism critical
- Corporate content: Professionalism premium worth it

**Creative/Artistic → nanobanana**

- Cat bus mashup: Creative freedom important
- Kawaii illustration: Artistic style flexibility
- Selective color: Editing capability useful

**Cinematic/Video → veotools**

- CCTV realism: Quality + physics
- Macro dolly: Cinematic precision
- Dialogue scenes: Audio sync needed

---

## Multi-Tool Workflows

### Workflow 1: Create + Edit

```
Step 1: Generate base image (gpt-image-1 OR nanobanana)
Step 2: Edit/refine (nanobanana edit mode)
Step 3: Final polish (optional second edit)
```

**Example:** Create professional headshot (gpt-image-1), then adjust lighting/color (nanobanana edit)

### Workflow 2: Blend Images

```
Step 1: Generate components (any tool)
Step 2: Blend composition (nanobanana with 2-3 input images)
Step 3: Final touches (optional edit)
```

**Example:** Create background (nanobanana), create subject (gpt-image-1), blend together (nanobanana)

### Workflow 3: Variant Generation

```
Step 1: Generate primary (gpt-image-1 for quality)
Step 2: Generate 3-5 variants (nanobanana for cost)
Step 3: Select best performer
```

**Example:** YouTube thumbnail master (gpt-image-1), test variants (nanobanana)

---

## Tool Selection by Emily's Example

### Emily's Tool Choices

**All images → Nano Banana** (17/17 examples)

- Social selfies
- Editorial portraits
- Creative concepts
- Professional work

**All videos → Veo3** (13/13 examples)

- Cinematic scenes
- Documentary style
- Narrative content

**Insight:** Emily uses nanobanana exclusively for images (creative freedom), Veo3 exclusively for videos (quality + audio).

### When to Deviate from Emily's Choices

**Use gpt-image-1 instead of nanobanana when:**

- Text rendering is critical (thumbnails, quotes)
- LinkedIn professional content
- Client work requiring maximum quality
- Photorealism essential (headshots, products)

**Use fal-video instead of veotools when:**

- Personalized content (Sid's LoRA)
- Model variety needed for comparison
- Faster prototyping required
- Specific model features needed (Kling, Luma, etc.)

---

## Tool Selection Mistakes to Avoid

### Mistake 1: Using gpt-image-1 for Volume

**Scenario:** Creating 10-image Instagram carousel

**Wrong:** gpt-image-1 for all 10 (high cost, slower)
**Right:** nanobanana for all 10 (cost-effective, fast)

**Savings:** 40-50% cost, 50% time

### Mistake 2: Using nanobanana for Thumbnails

**Scenario:** YouTube thumbnail with text

**Wrong:** nanobanana (text rendering 6-7/10)
**Right:** gpt-image-1 (text rendering 9.5/10)

**Impact:** Better text quality = higher CTR = more views

### Mistake 3: Not Using Edit Mode

**Scenario:** Generated image is 90% perfect, needs color adjustment

**Wrong:** Regenerate entire image
**Right:** Use nanobanana edit mode

**Savings:** Time + preserves good elements

### Mistake 4: Wrong Video Tool

**Scenario:** Need Sid in video explaining concept

**Wrong:** veotools (can't generate Sid specifically)
**Right:** fal-video with Sid's LoRA model

**Impact:** Only fal-video supports custom model

---

## Decision Confidence Levels

### High Confidence (95%+ correct tool)

**Scenarios:**

- Text rendering needed → gpt-image-1
- Image editing → nanobanana
- Volume > 5 images → nanobanana
- Video with audio → veotools
- Personalized (Sid) → fal-video

### Medium Confidence (70-95% correct tool)

**Scenarios:**

- Professional content → Usually gpt-image-1
- Social content → Usually nanobanana
- Single high-quality image → Context-dependent

**Recommendation:** Consider secondary factors (cost, speed, specific needs)

### Low Confidence (< 70%)

**Scenarios:**

- Professional social content (LinkedIn + Instagram hybrid)
- Artistic with text elements
- Quality vs cost trade-off unclear

**Recommendation:** Generate 1-2 with each tool, compare, then proceed with winner

---

## Tool Selection Flowchart

```
START: Visual Request Received
    ↓
Is it VIDEO?
├─ YES
│   ├─ Personalized (Sid)? → fal-video
│   ├─ Need audio/dialogue? → veotools
│   ├─ Quick prototype? → fal-video
│   └─ Cinematic quality? → veotools
│
└─ NO (IMAGE)
    ├─ Has TEXT?
    │   ├─ YES
    │   │   ├─ Text critical (thumbnail)? → gpt-image-1
    │   │   └─ Text minor? → Either OK
    │   └─ NO
    │       ├─ Professional (LinkedIn)? → gpt-image-1
    │       ├─ Volume (5+)? → nanobanana
    │       ├─ Need editing? → nanobanana
    │       ├─ Need blending? → nanobanana
    │       └─ Creative/social? → nanobanana
```

---

## Recommendation Summary

### Default Recommendations

**When in doubt:**

- **Images:** Start with nanobanana (80% of use cases)
- **Videos:** Start with veotools (standard quality)

**Exceptions:**

- Text rendering needed → gpt-image-1
- Personalized (Sid) → fal-video
- Maximum quality required → gpt-image-1
- Editing needed → nanobanana

### Tool Pairing Strategies

**Best Combinations:**

1. **gpt-image-1 (master) + nanobanana (variants)** - Quality master, fast variants
2. **nanobanana (generate) + nanobanana (edit)** - Creative iteration workflow
3. **veotools (cinematic) + fal-video (quick tests)** - Quality final, fast prototypes

**Avoid:**

- Using both for same single image (wasted cost)
- Mixing tools mid-carousel (inconsistency)
- Using expensive tool for low-stakes testing

---

**MCP Tool Selection Guide Version:** 1.0
**Tools Covered:** nanobanana, gpt-image-1, veotools, fal-video
**Decision Matrix:** Platform + Use Case + Quality + Cost
**Last Updated:** 2025-10-29
