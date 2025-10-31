---
name: visual-prompt-mastery
description: Expert visual prompt engineering using Emily's proven methodology from 30 engagement-validated examples. Generates structured JSON prompts for image and video generation with technical precision, platform optimization, and intelligent MCP tool selection. Use when creating images, generating videos, writing visual prompts, optimizing prompts for nanobanana gpt-image-1 veotools fal-video, creating Instagram posts LinkedIn graphics Twitter images YouTube thumbnails TikTok Reels videos, or need high-engagement visual content. Includes pattern matching, quality validation, and automatic tool selection.
---

# Visual Prompt Mastery

## Overview

This skill transforms simple visual requests into phenomenally good structured prompts using Emily's proven methodology. Based on 30 engagement-validated examples with engagement ranging from 134 to 4,717 likes.

**What This Skill Does:**
- Analyzes your request and matches to proven patterns
- Generates comprehensive structured JSON prompts
- Applies platform-specific optimizations
- Selects optimal MCP tool (nanobanana, gpt-image-1, veotools, fal-video)
- Validates prompt quality before generation
- Ensures high-engagement visual outcomes

**Source:** Emily (@IamEmily2050) - 30 complete prompts for Nano Banana (images) and Veo3 (videos)

## Core Methodology: Emily's JSON Structure

Every visual prompt follows this comprehensive structure:

### For Images (10+ sections required):

```json
{
  "scene": {
    "description": "detailed environment",
    "mood": "emotional tone",
    "environment": "physical setting"
  },
  "subject": {
    "type": "what/who is the focal point",
    "appearance": "specific details",
    "pose": "body position and framing",
    "wardrobe": "clothing and accessories"
  },
  "composition": {
    "framing": "how subject is positioned",
    "aspect_ratio": "4:5 for Instagram, 1:1 for LinkedIn, 16:9 for YouTube",
    "layout": "rule of thirds, symmetry, etc."
  },
  "lighting": {
    "source": "window, softbox, natural, etc.",
    "quality": "soft, harsh, diffused",
    "direction": "camera-left, overhead, etc.",
    "color_temp": "5200K exact Kelvin value"
  },
  "color_palette": {
    "primary": "#1E3A8A",
    "secondary": "#60A5FA",
    "background": "#F8F9FA"
  },
  "camera": {
    "focal_length_mm": 85,
    "aperture_f": 2.8,
    "iso": 400,
    "shutter_s": "1/200",
    "white_balance_k": 5600
  },
  "look": {
    "texture": "film grain, digital noise, smooth",
    "sharpness": "high, soft, selective",
    "effects": "vignette, bokeh, etc."
  },
  "negative_prompt": [
    "minimum 10 items",
    "watermark",
    "text errors",
    "distorted anatomy",
    "poor composition",
    "low quality",
    "blurry",
    "artifacts",
    "oversaturated",
    "cluttered"
  ]
}
```

### For Videos (adds timeline and motion):

```json
{
  "format": "shot type and camera feel",
  "primary_camera_motion": "single slow push-in OR dolly OR static",
  "lens": "24-28mm equiv smartphone OR 85mm portrait",
  "subject": {
    "character_string": "detailed description of who/what",
    "mood": "emotional tone"
  },
  "scene": {
    "location": "specific place",
    "time": "time of day",
    "lighting": "key + fill description",
    "weather": "environmental conditions"
  },
  "visual_details": {
    "beats": [
      {
        "time": "0.0-2.5s",
        "action": "what happens",
        "physics": "how things move naturally"
      },
      {
        "time": "2.5-5.0s",
        "action": "continuation",
        "physics": "fabric, hair, objects"
      },
      {
        "time": "5.0-8.0s",
        "action": "resolution",
        "physics": "settling, final movements"
      }
    ]
  },
  "negative_prompt": ["10+ items for videos too"]
}
```

## Decision Tree: Pattern Selection

When a visual request comes in, match to the appropriate pattern category:

### 1. Social/Selfie Patterns (High Engagement: 1,478 - 4,717 likes)

**Use When:**
- Instagram posts (casual, relatable content)
- Social media profiles
- Personal branding
- Authentic, unpolished aesthetic
- Mirror selfies, casual settings

**Load Reference:** `reference/emily-examples/social-selfie/`

**Characteristics:**
- Full-body framing (HEAD-TO-SHOES visible)
- Specific camera simulation (iPhone 4/5 era for Y2K)
- Lo-fi texture (grain, JPEG artifacts, soft focus)
- Everyday wardrobe (relatable, not styled)
- Specific aesthetic trends (Y2K, K-Beauty, gaming corner)

**Example Pattern - Y2K Mirror Selfie** (4,717 likes):
```json
{
  "scene": "casual 2010s phone selfie unintentional snapshot",
  "camera": {
    "device": "iPhone 4/5 era",
    "flash": "on harsh LED with mirror glare",
    "aspect_ratio": "4:3",
    "focus": "soft slight hand-shake blur"
  },
  "look": {
    "texture": "grainy digital noise mild JPEG artifacts",
    "sharpness": "low soft focus"
  },
  "pose": {
    "angle": "mirror selfie FULL BODY",
    "framing": "HEAD-TO-SHOES feet visible not cropped"
  }
}
```

### 2. Professional/Editorial Patterns (Engagement: 294 - 1,472 likes)

**Use When:**
- LinkedIn content
- Professional headshots
- Corporate communications
- Editorial photography
- High-fashion content
- Portfolio pieces

**Load Reference:** `reference/emily-examples/professional-editorial/`

**Characteristics:**
- Technical camera precision (Canon EOS R5, exact specs)
- Professional lighting setups (softbox, negative fill)
- Exact color grading (hex codes, precise adjustments)
- Composition rules (rule of thirds, negative space)
- Post-processing notes (dodging, grading, grain)

**Example Pattern - Glacial Couture** (426 likes but highly detailed):
```json
{
  "camera": {
    "system": "Canon EOS R5 full-frame 45MP 14-bit RAW",
    "lens": "RF 85mm f/1.2L use at f/3.5",
    "focal_length_mm": 85,
    "aperture_f": 3.5,
    "iso": 100,
    "white_balance_k": 5600
  },
  "composition": {
    "framing": "subject on right third low horizon negative space behind head"
  },
  "color_palette": {
    "notes": "true blacks vs icy whites with selective warm gold"
  }
}
```

### 3. Creative/Artistic Patterns (Engagement: 13 - 1,143 likes)

**Use When:**
- Experimental content
- Artistic projects
- Viral content attempts
- Unique compositions
- Cultural mashups (Cat Bus, Kawaii, Tokyo scenes)
- Conceptual visuals

**Load Reference:** `reference/emily-examples/creative-artistic/`

**Characteristics:**
- Unique subjects (cat bus, banana theme, kawaii illustrations)
- Cultural references (Ghibli, K-culture, Y2K nostalgia)
- Innovative compositions (POV, unusual framing)
- Selective color techniques
- Storytelling elements

**Example Pattern - Tokyo Rain Cat Bus** (1,143 likes):
```json
{
  "view": "POV from inside a car dash-cam perspective",
  "subjects": [
    {
      "id": "cat_bus",
      "style_hint": "Ghibli-inspired soft friendly forms"
    },
    {
      "id": "girl",
      "pose_action": "leans down and kisses the corgi"
    }
  ],
  "cinematography": {
    "lens": "anamorphic look",
    "effects": ["cinematic lens flares", "chromatic aberration"],
    "grade": "high-contrast teal–orange with cyber-pink accents"
  }
}
```

### 4. Cinematic/Video Patterns (Engagement: 134 - 1,245 likes)

**Use When:**
- Video generation (TikTok, Reels, YouTube)
- Cinematic sequences
- Documentary style
- Narrative content
- Multi-shot projects

**Load Reference:** `reference/emily-examples/cinematic-video/`

**Characteristics:**
- Timeline beats (0-2.5s, 2.5-5s, 5-8s structure)
- Single camera motion (push-in, dolly, static)
- Physics rules (how things move naturally)
- Shot composition language (wide, medium, close)
- Exact cinematography specs

**Example Pattern - CCTV Donkey Baboon** (1,245 likes):
```json
{
  "shot": {
    "composition": "static ultra-wide shot high-mounted CCTV",
    "camera_motion": "none locked",
    "frame_rate": "24 fps"
  },
  "timeline": [
    {"time": "0–2s", "action": "subject enters frame"},
    {"time": "2–6s", "action": "main action with physics"},
    {"time": "6–8s", "action": "exit and hold"}
  ],
  "subject": {
    "donkey": {
      "physics": "hooves strike concrete realistic cadence"
    }
  }
}
```

## Instructions: Generating Optimal Prompts

Follow this process when creating any visual prompt:

### Step 1: Analyze the Request

Extract key information:
- **Platform**: Instagram, LinkedIn, Twitter, YouTube, TikTok
- **Content Type**: Photo, illustration, diagram, video, thumbnail
- **Aesthetic**: Professional, casual, creative, cinematic
- **Text Rendering**: Does it need readable text?
- **Quality Need**: Social (good enough) vs Professional (exceptional)

### Step 2: Match to Pattern Category

Based on Step 1, select pattern category:

| Request Type | Pattern Category | Reference to Load |
|--------------|------------------|-------------------|
| Instagram post, casual photo | Social/Selfie | reference/emily-examples/social-selfie/ |
| LinkedIn graphic, professional | Professional/Editorial | reference/emily-examples/professional-editorial/ |
| Unique concept, artistic | Creative/Artistic | reference/emily-examples/creative-artistic/ |
| Video, cinematic scene | Cinematic/Video | reference/emily-examples/cinematic-video/ |

### Step 3: Load and Adapt Pattern

1. Read 1-2 relevant examples from matched category
2. Extract structural pattern (which sections, what level of detail)
3. Adapt pattern to user's specific request
4. Maintain Emily's technical precision standards

**Example:**
```
User: "Create Instagram post about productivity"
→ Platform: Instagram
→ Type: Photo/illustration
→ Category: Social or Professional (depends on tone)
→ If casual tone: Load social-selfie patterns
→ If professional tone: Load professional-editorial patterns
→ Adapt pattern with productivity-specific elements
```

### Step 4: Populate All Required Sections

Generate comprehensive JSON with:

**Minimum Required Sections:**
1. scene (description, mood, environment)
2. subject (type, appearance, pose, details)
3. composition (framing, aspect_ratio, layout)
4. lighting (source, quality, color temperature in Kelvin)
5. color_palette (hex codes in #RRGGBB format)
6. camera (focal length, aperture, ISO, white balance)
7. look or aesthetic (texture, sharpness, effects)
8. negative_prompt (10+ items minimum)

**Optional but Recommended:**
- wardrobe (for subjects with clothing)
- props (environmental elements)
- post_processing (for editorial quality)
- For videos: timeline beats, physics, camera_motion

### Step 5: Apply Platform Optimizations

Platform-specific requirements (see `reference/platform-specs.md` for full details):

**Instagram:**
- Aspect ratio: 4:5 (1080x1350) for posts, 9:16 for Reels
- Style: Creative, vibrant, trend-aware
- Text: Minimal, use captions instead
- Tool preference: nanobanana (creative + cost-effective)

**LinkedIn:**
- Aspect ratio: 1:1 (1200x1200) or 1.91:1 for articles
- Style: Professional, clean, trustworthy
- Text: Can include quotes, statistics
- Tool preference: gpt-image-1 (professional + text rendering)

**YouTube:**
- Aspect ratio: 16:9 (1280x720)
- Style: Bold, high contrast, CTR-optimized
- Text: Large, readable at thumbnail size
- Tool preference: gpt-image-1 (text rendering critical)

**Twitter:**
- Aspect ratio: 16:9 (1200x675) optimal
- Style: Eye-catching, scroll-stopping
- Text: Optional but powerful
- Tool preference: nanobanana (speed + volume)

**TikTok/Reels:**
- Aspect ratio: 9:16 vertical video
- Style: Hook in first 3 seconds
- Motion: Single camera move preferred
- Tool preference: veotools or fal-video

### Step 6: Select Optimal MCP Tool

Use this decision matrix (see `reference/mcp-tool-selection.md` for full analysis):

**Choose gpt-image-1 (OpenAI) when:**
- Professional/corporate content (LinkedIn)
- Text rendering required (thumbnails, quotes)
- Photorealism critical (headshots, products)
- Budget allows (~$0.04-0.08 per image)
- Quality over speed

**Choose nanobanana (Gemini) when:**
- Social/creative content (Instagram, Twitter)
- High volume needed (carousels, variants)
- Speed important (iterations, testing)
- Budget-conscious (~$0.039 per image)
- Image editing or multi-image blending
- Creative/artistic freedom preferred

**Choose veotools (Google Veo 3) when:**
- Video generation (8-30 seconds)
- Cinematic quality needed
- Audio/dialogue sync required
- Professional video content

**Choose fal-video when:**
- Quick video prototypes
- Multiple model comparison needed
- Custom model training (Sid's LoRA)
- Specific model requirements (Kling, Luma, etc.)

### Step 7: Apply Technical Precision Standards

Emily's prompts achieve high engagement through technical precision:

**Hex Color Codes:**
- Always use #RRGGBB format: #0B0B0B (not "black"), #FF4FA3 (not "pink")
- Specify primary, secondary, accent colors
- Include background color

**Camera Specifications:**
- Focal length: 24mm, 35mm, 50mm, 85mm (exact values)
- Aperture: f/1.8, f/2.8, f/5.6 (exact f-stops)
- ISO: 100, 400, 800, 1600 (exact values)
- White balance: 4200K, 5200K, 5600K (Kelvin exact)
- Shutter speed: 1/125s, 1/200s (exact values)

**Negative Prompts (Mandatory 10+ items):**
- Prevent common failures
- Platform-specific exclusions
- Quality gates
- Style anti-patterns

Example negative prompt list:
```json
"negative_prompt": [
  "watermark",
  "text errors",
  "distorted anatomy",
  "extra limbs",
  "poor composition",
  "low quality",
  "blurry",
  "artifacts",
  "oversaturated",
  "harsh shadows",
  "cluttered background",
  "amateur lighting"
]
```

### Step 8: Validate Prompt Quality

Before finalizing, validate against Emily's standards:

**Quality Checklist:**
- [ ] All 10+ sections populated
- [ ] Hex codes in #RRGGBB format
- [ ] Camera specs with exact values (focal, aperture, ISO)
- [ ] Color temperature in Kelvin
- [ ] Negative prompt has 10+ items
- [ ] Platform aspect ratio correct
- [ ] Subject description specific (not vague)
- [ ] Lighting source and quality defined
- [ ] Composition framing clear

**Scoring Framework:**
- 10/10: Emily-level quality (all checks pass, engagement-optimized)
- 8-9/10: Professional quality (all checks pass)
- 6-7/10: Good (minor issues, still usable)
- <6/10: Needs revision (missing required elements)

If score < 8, revise prompt before returning.

## Pattern Templates (Factory Functions)

These are conceptual templates - use them as mental models for generating prompts:

### Template 1: Social Selfie (Instagram, Casual)

**Use For:** Relatable Instagram content, personal branding, casual aesthetics

**Key Elements:**
- Full-body framing (HEAD-TO-SHOES visible)
- Specific aesthetic era (Y2K 2010s, K-Beauty studio, gaming corner)
- Natural imperfections (grain, soft focus, mild blur)
- Everyday wardrobe (relatable, not overly styled)
- Environmental storytelling (bedroom, bathroom, PC corner)

**Reference Examples:**
- 09-y2k-mirror-selfie - 4,717 likes (nostalgic lo-fi)
- 12-winking-sofa-k-beauty - 3,229 likes (studio K-Beauty)
- 11-blue-pc-gaming-corner - 1,478 likes (themed environment)

**Adaptation Steps:**
1. Choose aesthetic sub-type (Y2K, K-Beauty, themed)
2. Load matching example from reference/emily-examples/social-selfie/
3. Extract camera settings, look/texture, pose structure
4. Replace subject details with user's requirements
5. Maintain grain/texture/imperfections (critical for engagement)

### Template 2: Professional Editorial (LinkedIn, Corporate)

**Use For:** Professional content, LinkedIn posts, corporate communications, portfolio

**Key Elements:**
- Precise camera specifications (Canon EOS R5, exact lens)
- Professional lighting (softbox, fill, rim)
- Clean composition (rule of thirds, negative space)
- Color grading notes (cool/warm, selective saturation)
- Post-processing guidance (micro-dodge, grain)

**Reference Examples:**
- 02-glacial-couture - 426 likes (high-fashion precision)
- 13-gallery-hallway - 1,472 likes (urban editorial)
- 03-editorial-red-dress - 294 likes (studio minimalism)

**Adaptation Steps:**
1. Define technical requirements (headshot, 3/4 body, environmental)
2. Load matching editorial example
3. Extract camera system, lighting setup, composition
4. Apply to user's subject
5. Include post-processing notes for quality

### Template 3: Creative Artistic (Experimental, Viral)

**Use For:** Unique concepts, viral attempts, artistic projects, cultural mashups

**Key Elements:**
- Unique subject combinations (cat bus + corgi, banana aesthetic)
- Cultural references (Ghibli, kawaii, specific eras)
- Innovative compositions (POV, unusual framing, selective color)
- Storytelling through environment
- Trend-aware aesthetics

**Reference Examples:**
- 07-tokyo-rain-cat-bus - 1,143 likes (Ghibli mashup)
- 10-kawaii-cat-notebook - 610 likes (illustration style)
- 15-black-white-blue-lingerie - 2,986 likes (selective color)

**Adaptation Steps:**
1. Identify the creative concept
2. Find nearest creative example (subject type, style approach)
3. Extract compositional innovation
4. Adapt cultural/aesthetic references
5. Maintain narrative elements

### Template 4: Cinematic Video (TikTok, Reels, YouTube)

**Use For:** Video content, cinematic scenes, narrative sequences, documentary

**Key Elements:**
- Timeline beats (0-2.5s, 2.5-5s, 5-8s structure)
- Single camera motion (push-in, dolly, static - ONE move only)
- Physics specifications (how things move naturally)
- Shot language (wide, medium, close)
- Audio considerations (for Veo3)

**Reference Examples:**
- 13-cctv-donkey-baboon - 1,245 likes (static surveillance)
- 09-italian-siblings - 579 likes (dialogue sync)
- 08-blue-alpine-gentian - 416 likes (macro dolly-in)

**Adaptation Steps:**
1. Define shot type (static, push-in, dolly)
2. Load matching cinematic example
3. Extract timeline beat structure
4. Specify physics for each beat
5. Include camera technical specs

## Composition Patterns: Real Examples

### Example 1: Simple Instagram Post Request

**User Request:** "Create Instagram post about my morning coffee routine"

**Process:**
1. Analyze: Platform=Instagram, Type=casual photo, Aesthetic=relatable
2. Match: Social/Selfie category
3. Load: Y2K or casual aesthetic pattern
4. Generate:

```json
{
  "scene": "cozy morning kitchen natural light streaming through window",
  "subject": {
    "type": "flat lay composition",
    "elements": "ceramic coffee mug with latte art notebook with handwritten notes smartphone showing time",
    "arrangement": "rule of thirds with coffee at intersection"
  },
  "composition": {
    "aspect_ratio": "4:5",
    "framing": "overhead flat lay",
    "layout": "diagonal composition from top-left to bottom-right"
  },
  "lighting": {
    "source": "window light from left",
    "quality": "soft diffused morning light",
    "color_temp": "5200K warm daylight"
  },
  "color_palette": {
    "primary": "#8B7355",
    "secondary": "#F5DEB3",
    "background": "#FAFAFA",
    "accent": "#2C1810"
  },
  "camera": {
    "angle": "directly overhead 90 degrees",
    "focal_length_mm": 35,
    "aperture_f": 2.8,
    "iso": 400
  },
  "look": {
    "texture": "light film grain warm cozy feel",
    "sharpness": "high on coffee cup selective on notebook",
    "effects": "soft vignette natural depth of field"
  },
  "negative_prompt": [
    "cluttered",
    "harsh shadows",
    "artificial lighting",
    "watermark",
    "text overlay",
    "messy",
    "dark mood",
    "cold tones",
    "people visible",
    "low quality",
    "blurry",
    "distorted"
  ]
}
```

5. Tool selection: nanobanana (Instagram + casual + no text)
6. Quality estimate: 8/10

### Example 2: Professional LinkedIn Graphic

**User Request:** "Create LinkedIn post graphic about AI productivity with quote"

**Process:**
1. Analyze: Platform=LinkedIn, Type=professional graphic, Text=YES
2. Match: Professional/Editorial category
3. Load: Clean editorial pattern
4. Generate:

```json
{
  "scene": "minimal modern office background clean lines neutral tones",
  "subject": {
    "type": "typography-focused composition",
    "main_text": "AI Doesn't Replace You. It Amplifies You.",
    "attribution": "— Your Name",
    "visual_elements": "abstract geometric shapes subtle tech motifs"
  },
  "composition": {
    "aspect_ratio": "1:1",
    "layout": "center-weighted with breathing room",
    "hierarchy": "quote dominant attribution secondary"
  },
  "typography": {
    "quote_font": "Inter Bold",
    "quote_size_pt": 56,
    "attribution_font": "Inter Regular",
    "attribution_size_pt": 24,
    "color": "#0B0B0B"
  },
  "lighting": {
    "quality": "soft even lighting no harsh shadows",
    "mood": "professional trustworthy"
  },
  "color_palette": {
    "primary": "#1E3A8A",
    "secondary": "#60A5FA",
    "background": "#F8F9FA",
    "text": "#0B0B0B"
  },
  "negative_prompt": [
    "cluttered",
    "too many colors",
    "unprofessional",
    "casual aesthetic",
    "low contrast",
    "hard to read",
    "watermark",
    "stock photo feel",
    "cheesy",
    "outdated design",
    "poor typography",
    "text errors"
  ]
}
```

5. Tool selection: gpt-image-1 (LinkedIn + professional + text rendering)
6. Quality estimate: 9/10

### Example 3: Cinematic Video Scene

**User Request:** "Create cinematic video of entrepreneur walking through office at dawn"

**Process:**
1. Analyze: Type=video, Style=cinematic, Mood=inspiring
2. Match: Cinematic/Video category
3. Load: Dolly/push-in pattern
4. Generate:

```json
{
  "format": "cinematic office portrait at golden hour",
  "primary_camera_motion": "single slow dolly-in following subject from medium to close-up",
  "lens": "35mm spherical cinematic feel",
  "subject": {
    "character_string": "Entrepreneur in business casual walking through modern office warm confident demeanor holding coffee mug reviewing documents on iPad",
    "mood": "focused determined optimistic"
  },
  "scene": {
    "location": "modern open-plan office floor-to-ceiling windows",
    "time": "dawn golden hour warm sunlight streaming through glass",
    "lighting": "key: natural window light from left fill: office ambient overhead rim: backlight from window",
    "atmosphere": "quiet empty office dust motes in sunbeams"
  },
  "visual_details": {
    "beats": [
      {
        "time": "0.0-2.5s",
        "action": "Establish wide shot of office entrepreneur enters from left walking steadily camera begins slow dolly-in",
        "physics": "natural walking gait coffee liquid gentle sway iPad screen readable"
      },
      {
        "time": "2.5-5.0s",
        "action": "Follow subject through office desks visible in background subject glances at iPad continues walking",
        "physics": "hair slight movement from air conditioning fabric drapes naturally"
      },
      {
        "time": "5.0-8.0s",
        "action": "Close to medium close-up subject stops at window looks out with confident expression holds gaze",
        "physics": "breathing subtle coffee steam rises iPad screen reflects window light"
      }
    ]
  },
  "cinematography": {
    "aperture_look": "f/2.8 shallow DOF background softly blurred",
    "shutter_look": "1/48s cinematic motion blur",
    "color_grade": "warm golden tones with lifted shadows"
  },
  "negative_prompt": [
    "shaky camera",
    "multiple camera moves",
    "artificial movement",
    "harsh lighting",
    "cold tones",
    "cluttered",
    "low quality",
    "compression artifacts",
    "unrealistic physics",
    "teleporting subjects"
  ]
}
```

5. Tool selection: veotools (cinematic video + audio support)
6. Quality estimate: 8/10

## Engagement Optimization Insights

Based on Emily's 30 examples, high engagement correlates with:

**For Images:**
1. **Relatable Aesthetics** - Y2K nostalgia (4,717 likes), K-Beauty (3,229 likes)
2. **Full-Body Framing** - HEAD-TO-SHOES visible performs better than crops
3. **Lo-Fi Authenticity** - Grain, imperfections feel authentic vs over-polished
4. **Specific Scenarios** - "Mirror selfie in restroom" > "woman in room"
5. **Cultural Trends** - K-Beauty, gaming aesthetic, specific eras
6. **Selective Color** - B&W with color isolation (2,986 likes)

**For Videos:**
1. **Single Camera Motion** - One deliberate move (push-in, dolly, static)
2. **Timeline Structure** - Clear 3-beat structure (establish, action, resolve)
3. **Realistic Physics** - Natural movement (breath vapor, fabric wrinkles)
4. **Specific Scenarios** - "CCTV of donkey + baboon" > "animals walking"
5. **Technical Detail** - Exact cinematography specs increase perceived quality

**See:** `reference/engagement-insights.md` for full analysis

## Validation Framework

After generating a prompt, validate quality:

### 1. Completeness Check (Required)
- [ ] scene section present with description, mood
- [ ] subject section with specific details
- [ ] composition with aspect_ratio
- [ ] lighting with source and color_temp
- [ ] color_palette with hex codes
- [ ] camera with focal_length_mm, aperture_f, iso
- [ ] negative_prompt with 10+ items

### 2. Precision Check (Required)
- [ ] All hex codes match #RRGGBB format
- [ ] All camera specs are exact values (not ranges)
- [ ] White balance in Kelvin (not "warm" or "cool")
- [ ] Aspect ratio appropriate for platform
- [ ] No vague terms ("nice", "good", "pretty")

### 3. Platform Check (Required)
- [ ] Aspect ratio matches platform
- [ ] Aesthetic appropriate (professional for LinkedIn, casual for Instagram)
- [ ] Tool selection optimal (text → gpt-image-1, creative → nanobanana)

### 4. Engagement Check (Recommended)
- [ ] Matches proven pattern from Emily's examples
- [ ] Specific scenario (not generic)
- [ ] Cultural/trend awareness
- [ ] Storytelling elements present

**Overall Score = (Completeness + Precision + Platform + Engagement) / 4**

If score < 8/10, revise prompt. If score ≥ 9/10, save as reusable template.

## Reference Documentation

This skill includes comprehensive reference materials using progressive disclosure:

### Core References (Load as needed):

**reference/prompt-patterns.md**
- Extracted patterns from all 30 examples
- Reusable sections by category
- Common structures and variations
- When to load: Need to see pattern library

**reference/platform-specs.md**
- Complete specs for Instagram, LinkedIn, Twitter, YouTube, TikTok
- Aspect ratios, resolutions, design systems
- Platform-specific best practices
- When to load: Working with specific platform

**reference/engagement-insights.md**
- What drives high engagement (analysis of likes/bookmarks)
- Top 10 patterns by engagement
- Engagement correlation analysis
- When to load: Optimizing for virality

**reference/validation-rules.md**
- Complete validation checklist
- Quality scoring rubric
- Common failures and fixes
- When to load: Quality assurance needed

**reference/mcp-tool-selection.md**
- Complete decision matrix
- Cost, speed, quality comparison
- Model-specific strengths
- When to load: Choosing between tools

### Emily's 30 Examples (Load specific category):

**reference/emily-examples/social-selfie/** (5 examples, 1,478-4,717 likes)
- Y2K aesthetic, K-Beauty, mirror selfies
- High engagement, relatable content
- When to load: Instagram casual content

**reference/emily-examples/professional-editorial/** (6 examples, 294-1,472 likes)
- Editorial photography, professional quality
- Technical precision, clean aesthetics
- When to load: LinkedIn, corporate content

**reference/emily-examples/creative-artistic/** (5 examples, 13-1,143 likes)
- Experimental, unique, cultural mashups
- Creative freedom, artistic expression
- When to load: Artistic projects, viral attempts

**reference/emily-examples/cinematic-video/** (13 examples, 134-1,245 likes)
- Video prompts with timeline beats
- Cinematic techniques, motion specs
- When to load: Video generation requests

## Integration with Existing Skills

This skill automatically integrates with:

**ai-image-generator skills:**
- Works alongside `create-image` skill
- Provides structured prompts for `edit-image` skill
- Enhances `youtube-thumbnail-design` skill
- Optimizes `linkedin-design` skill

**ai-video-agent workflows:**
- Provides structured video prompts
- Applies cinematic patterns
- Timeline beat structure

**Workflow Integration:**
This skill is automatically invoked when agents detect visual generation requests. No manual invocation needed.

## Philosophy: Maximize Quality Through Precision

Emily's methodology succeeds because:

1. **Technical Precision** - Exact specs eliminate ambiguity
2. **Comprehensive Structure** - 10+ sections ensure nothing is missed
3. **Negative Prompts** - Actively prevent common failures
4. **Proven Patterns** - Based on engagement validation
5. **Platform Awareness** - Optimized for specific contexts

**The Goal:** Every visual generated should be phenomenal, not just "good enough."

## Quick Start Examples

### Quick Example 1: Instagram Post
```
User: "Create Instagram post showing my new workspace"
→ Load social-selfie pattern (casual, relatable)
→ Generate structured prompt with full-body or environment focus
→ Tool: nanobanana
→ Result: Authentic, engaging workspace photo
```

### Quick Example 2: LinkedIn Graphic
```
User: "Create LinkedIn graphic with productivity quote"
→ Load professional-editorial pattern (clean, trustworthy)
→ Generate structured prompt with typography focus
→ Tool: gpt-image-1 (text rendering)
→ Result: Professional, readable quote graphic
```

### Quick Example 3: YouTube Thumbnail
```
User: "Create thumbnail for 'How I Built 10 AI Agents'"
→ Load creative-artistic OR professional (depending on style)
→ Generate structured prompt with bold composition, readable text
→ Tool: gpt-image-1 (text critical)
→ Result: High-CTR thumbnail with clear text
```

### Quick Example 4: TikTok Video
```
User: "Create TikTok video showing product reveal"
→ Load cinematic-video pattern
→ Generate timeline beats (0-2.5s: tease, 2.5-5s: reveal, 5-8s: feature)
→ Tool: veotools or fal-video
→ Result: Engaging vertical video with clear story
```

## Success Metrics

Prompts generated using this skill should achieve:
- Quality score: 8-10/10 consistently
- Engagement: Comparable to Emily's benchmarks
- Technical: All precision standards met
- Platform: Optimized for specific channel
- Tool: Optimal MCP tool selected

## Dependencies

No external dependencies required. This skill provides guidance for Claude to generate structured prompts.

Optional for future Python module implementation:
- json (built-in)
- dataclasses (built-in)
- typing (built-in)

---

**Version:** 1.0
**Created:** 2025-10-29
**Source:** Emily's 30 engagement-validated prompts (@IamEmily2050)
**Methodology:** Anthropic progressive disclosure pattern
