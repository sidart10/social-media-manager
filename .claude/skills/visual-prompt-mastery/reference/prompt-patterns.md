# Prompt Patterns Library

**Extracted from:** Emily's 30 engagement-validated examples
**Analysis Date:** 2025-10-29
**Total Examples:** 17 images + 13 videos

---

## Pattern Categories

### 1. Social/Selfie Patterns (5 examples, 1,478-4,717 likes avg)

#### Pattern 1A: Y2K Lo-Fi Mirror Selfie
**Engagement:** 4,717 likes (highest)
**Source:** 09-y2k-mirror-selfie-lo-fi-aesthetic.json

**Core Structure:**
```json
{
  "scene": "casual nostalgic phone selfie unintentional snapshot",
  "camera": {
    "device": "[era-specific phone]",
    "flash": "on harsh LED with mirror glare",
    "aspect_ratio": "4:3",
    "focus": "soft slight hand-shake blur"
  },
  "look": {
    "texture": "grainy digital noise mild JPEG artifacts",
    "sharpness": "low soft focus",
    "effects": "subtle vignette cheap filter vibe"
  },
  "pose": {
    "framing": "HEAD-TO-SHOES feet visible not cropped"
  }
}
```

**Reusable Elements:**
- Full-body framing (critical for engagement)
- Era-specific camera simulation (iPhone 4/5, flip phone, etc.)
- Intentional imperfections (grain, blur, artifacts)
- Environmental authenticity (clutter allowed, real spaces)

**When to Use:**
- Instagram casual content
- Relatable personal branding
- Nostalgic aesthetics
- Authentic unpolished feel

#### Pattern 1B: K-Beauty Studio Selfie
**Engagement:** 3,229 likes
**Source:** 12-winking-sofa-k-beauty-selfie.json

**Core Structure:**
```json
{
  "lighting": {
    "key": {
      "source": "strobe/flash bare reflector or direct flash",
      "effect": "crisp dark shadows strong specular highlights"
    }
  },
  "postprocess": {
    "texture": "highly smoothed skin poreless porcelain doll effect"
  },
  "subject": {
    "face": {
      "skin_tone": "very pale porcelain lightened aesthetic",
      "makeup": "stylized K-Beauty Douyin look flawless matte base"
    }
  }
}
```

**Reusable Elements:**
- High-key studio lighting (flash, hard shadows)
- Porcelain skin aesthetic (K-Beauty trend)
- Direct flash with specular highlights
- Stylized beauty retouching

#### Pattern 1C: Themed Environment Selfie
**Engagement:** 1,478 likes
**Source:** 11-blue-pc-gaming-corner-selfie.json

**Core Structure:**
```json
{
  "environment": {
    "description": "themed corner seen in mirror",
    "furnishings": [
      "desk with monitor",
      "themed decorations",
      "color-coordinated elements",
      "character figures/posters"
    ],
    "color_theme": "single dominant color across room and wardrobe"
  },
  "camera": {
    "mode": "smartphone rear camera via mirror",
    "focal_length_eq_mm": 26,
    "depth_of_field": "natural smartphone DOF background readable"
  }
}
```

**Reusable Elements:**
- Themed environment (color-coordinated)
- Mirror selfie composition
- Wardrobe matching room theme
- Environmental storytelling

---

### 2. Professional/Editorial Patterns (6 examples, 294-1,472 likes avg)

#### Pattern 2A: High-Fashion Editorial
**Engagement:** 426 likes (but highly detailed/professional)
**Source:** 02-glacial-couture-east-asian-editorial.json

**Core Structure:**
```json
{
  "camera": {
    "system": "[specific camera model full-frame]",
    "lens": "[specific lens with aperture]",
    "focal_length_mm": 85,
    "aperture_f": 3.5,
    "shutter_s": "1/1250",
    "iso": 100,
    "white_balance_k": 5600,
    "color_space": "AdobeRGB",
    "file_format": "RAW",
    "focus_mode": "Eye-AF single point",
    "metering_mode": "Spot on skin",
    "exposure_comp_ev": "+0.7",
    "filters": ["Circular polarizer"]
  },
  "exposure_strategy": {
    "histogram": "right-weighted protected speculars",
    "bracketing": "±0.7 EV 3 frames as safety"
  },
  "post_processing": {
    "raw_dev": "specific profile and technique",
    "local": "micro-dodge specific elements",
    "grade": "color-specific adjustments"
  }
}
```

**Reusable Elements:**
- Complete professional camera specifications
- Exposure strategy notes
- Post-processing workflow
- Photographer notes section
- Technical precision throughout

**When to Use:**
- High-end editorial
- Professional portfolio work
- Commercial photography simulation
- Maximum technical detail needed

#### Pattern 2B: Studio Portrait Minimalist
**Engagement:** 294 likes
**Source:** 03-editorial-red-dress-studio-portrait.json

**Core Structure:**
```json
{
  "environment": {
    "location": "minimalist indoor studio",
    "background": "plain neutral wall with subtle light gradient",
    "props": "none"
  },
  "lighting": {
    "type": "single key light",
    "source": "softbox from camera left at 45° angle",
    "fill_light": "none or very subtle ambient bounce",
    "intensity": "medium-high contrast"
  },
  "aesthetic_reference": {
    "influences": ["photographer names"],
    "style_tags": ["high fashion", "chiaroscuro lighting", "minimalist studio"]
  }
}
```

**Reusable Elements:**
- Minimalist studio setup
- Single-light philosophy
- Chiaroscuro drama
- Aesthetic reference system (name photographers)

#### Pattern 2C: Urban Editorial Fashion
**Engagement:** 1,472 likes
**Source:** 13-gallery-hallway-olive-tank-manga.json

**Core Structure:**
```json
{
  "environment": {
    "left_wall": "specific artwork/mural description",
    "right_wall": "framed art with details",
    "floor": "material with specific treatment to kill reflections"
  },
  "framing_composition": {
    "shot_type": "mid-thigh portrait three-quarter length",
    "framing": "subject placed on left/right third opposite shows environment"
  },
  "lighting": {
    "key": "broad soft overhead panel",
    "fill": "white bounce with distance and stop calculation",
    "rim": "strip-light with specific placement and intensity"
  }
}
```

**Reusable Elements:**
- Environmental storytelling (walls tell a story)
- Three-point lighting with exact specifications
- Floor treatment notes (anti-reflection)
- Architectural framing (thirds, leading lines)

---

### 3. Creative/Artistic Patterns (5 examples, 13-1,143 likes avg)

#### Pattern 3A: Cultural Mashup Fantasy
**Engagement:** 1,143 likes
**Source:** 07-tokyo-rain-cat-bus-corgi-night.json

**Core Structure:**
```json
{
  "view": "POV from [unique perspective]",
  "subjects": [
    {
      "id": "subject_1",
      "category": "magical/fantastical",
      "style_hint": "[reference style] not flat"
    },
    {
      "id": "subject_2",
      "pose_action": "specific interaction"
    }
  ],
  "cinematography": {
    "lens": "[cinematic look]",
    "effects": ["specific filmic effects"],
    "grade": "stylized color scheme with specific accents"
  }
}
```

**Reusable Elements:**
- Multiple subjects with IDs
- Cultural style references (Ghibli, anime, etc.)
- POV perspective framing
- Specific subject interactions
- Stylized color grading (teal-orange, cyber-pink)

#### Pattern 3B: Illustration/Diagram Style
**Engagement:** 610 likes
**Source:** 10-kawaii-cat-notebook-illustration.json

**Core Structure:**
```json
{
  "style": "hand-drawn illustration aesthetic",
  "canvas": {
    "ratio": "4:5",
    "resolution": "1600x2000",
    "background": "specific texture/paper type"
  },
  "palette": {
    "color_name": "#HEXCODE",
    "usage": "where this color applies"
  },
  "layers": [
    {
      "type": "element_type",
      "content": "what to include",
      "style": "how to render"
    }
  ]
}
```

**Reusable Elements:**
- Layer-based composition
- Named color palette (descriptive names + hex)
- Canvas specifications (ratio, resolution, background)
- Illustration style guidance
- Typography/text integration

#### Pattern 3C: Selective Color Technique
**Engagement:** 2,986 likes
**Source:** 15-black-white-blue-lingerie-backlight.json

**Core Structure:**
```json
{
  "color_grade": "BLACK & WHITE global grade with SELECTIVE COLOR",
  "selective_color": {
    "mask_target": "[specific subject element]",
    "color_palette_hex": ["#1E3A8A", "#2563EB", "#60A5FA"],
    "rule": "no other hues anywhere all else strictly monochrome"
  },
  "lighting": "strong backlight from [source] soft rim",
  "shot": "full-body vertical portrait"
}
```

**Reusable Elements:**
- Selective color isolation technique
- Black & white base with color accent
- Backlight + rim light setup
- Strict color rules (monochrome except target)

---

### 4. Cinematic/Video Patterns (13 examples, 134-1,245 likes avg)

#### Pattern 4A: Static Observational (CCTV/Documentary)
**Engagement:** 1,245 likes (highest video)
**Source:** 13-cctv-donkey-baboon-gas-station.json

**Core Structure:**
```json
{
  "style": "specific aesthetic (night-vision, CCTV, documentary)",
  "shot": {
    "duration": 8,
    "composition": "static [camera position] [focal length]",
    "camera_motion": "none locked",
    "resolution": "[specific simulation]"
  },
  "timeline": [
    {"time": "0–2s", "action": "entrance/establish"},
    {"time": "2–6s", "action": "main action with physics"},
    {"time": "6–8s", "action": "exit and hold"}
  ],
  "subject": {
    "character_name": {
      "appearance": "specific details",
      "physics": "how they move realistically"
    }
  },
  "overlay": {
    "timestamp": "[format]",
    "style": "specific visual treatment"
  }
}
```

**Reusable Elements:**
- Static camera position (no motion)
- 3-beat timeline structure (establish, action, resolve)
- Physics specifications for realism
- Timestamp/overlay details
- Specific aesthetic style (CCTV, night-vision, etc.)

#### Pattern 4B: Slow Dolly/Push-In
**Engagement:** 416 likes
**Source:** 08-blue-alpine-gentian-mountain-macro.json

**Core Structure:**
```json
{
  "shot": {
    "film_language": "specific shot description",
    "primary_camera_motion": "very slow dolly-in with subtle tilt",
    "motion_path_meters": 0.5,
    "stabilization": "locked slider no handheld wobble"
  },
  "visual_details": {
    "timeline_beats": [
      {
        "t": "0.0-2.5s",
        "action": "establish scene and subject",
        "focus": "where focus is at this beat"
      },
      {
        "t": "2.5-5.5s",
        "action": "rack focus or reveal",
        "focus": "focus shift described"
      },
      {
        "t": "5.5-8.0s",
        "action": "final composition hold",
        "focus": "final focus target"
      }
    ]
  }
}
```

**Reusable Elements:**
- Single slow camera motion (dolly-in OR push-in, never both)
- Timeline beats with focus changes
- Motion path in meters
- Stabilization notes
- Final hold for impact

#### Pattern 4C: Handheld Observational
**Engagement:** 265 likes
**Source:** 04-girls-night-stone-arcade-selfie.json

**Core Structure:**
```json
{
  "format": "selfie vlog style",
  "primary_camera_motion": "handheld selfie push-in with slight arc",
  "stabilization": "natural handheld micro-bob retained",
  "lens": "24mm equiv selfie perspective",
  "visual_details": {
    "beats": [
      {
        "time": "0.0-2.7s",
        "action": "subject raises phone establishes scene",
        "physics": "hair micro-sway earrings jitter with motion",
        "dialogue": "Character: 'Exact line'"
      },
      {
        "time": "2.7-5.4s",
        "action": "movement reveals environment",
        "physics": "natural handheld parallax effects"
      },
      {
        "time": "5.4-8.0s",
        "action": "group closer to lens for hold",
        "physics": "compression settle final freeze"
      }
    ]
  }
}
```

**Reusable Elements:**
- Handheld aesthetic (micro-bob preserved)
- Dialogue integration (exact lines with character name)
- Physics per beat (hair, jewelry, fabric)
- Selfie perspective (wide angle, close range)

---

## Cross-Cutting Patterns

### Universal Elements (Present in ALL 30 examples)

#### 1. Negative Prompts (100% of examples)
**Pattern:** Minimum 10 items, specific to aesthetic

**Social/Casual negatives:**
```json
[
  "professional photography",
  "studio lighting",
  "posed",
  "high quality",
  "sharp focus",
  "modern look",
  "polished",
  "watermark",
  "text overlay",
  "fake"
]
```

**Professional negatives:**
```json
[
  "amateur",
  "casual",
  "messy",
  "low quality",
  "poor lighting",
  "watermark",
  "distorted",
  "oversaturated",
  "harsh shadows",
  "cluttered",
  "unprofessional",
  "artifacts"
]
```

**Cinematic negatives:**
```json
[
  "shaky camera",
  "multiple camera moves",
  "artificial movement",
  "teleporting subjects",
  "physics errors",
  "compression artifacts",
  "low resolution",
  "poor framing",
  "amateur",
  "unrealistic"
]
```

#### 2. Technical Precision (90% of examples)

**Camera Specs Pattern:**
- Focal length: Exact mm value (24, 35, 50, 85)
- Aperture: Exact f-stop (f/1.8, f/2.8, f/3.5, f/5.6)
- ISO: Exact value (100, 200, 400, 800, 1600)
- White balance: Exact Kelvin (4200K, 5200K, 5600K, 6000K)
- Shutter: Exact fraction (1/125s, 1/200s, 1/1250s)

**Color Precision Pattern:**
- Always hex format: #RRGGBB
- Name + hex: "teal": "#19897A", "pink": "#FF4FA3"
- Include RGB when relevant: "(R: 25, G: 137, B: 122)"

#### 3. Aspect Ratios (100% specify)

**Image aspect ratios used:**
- 4:5 - Instagram posts (most common)
- 1:1 - Square (LinkedIn, profile pics)
- 4:3 - Y2K aesthetic (iPhone era)
- 9:16 - Vertical full-body portraits
- 16:9 - Landscape/YouTube

**Video aspect ratios used:**
- 16:9 - Cinematic horizontal (most common)
- 9:16 - Vertical social (TikTok/Reels)
- 1:1 - Square video (rare)

#### 4. Lighting Patterns

**Three-Point Lighting:**
```json
{
  "key": "main light source with modifier and angle",
  "fill": "secondary light with distance/intensity calculation",
  "rim": "backlight with placement and intensity relative to key"
}
```

**Natural Lighting:**
```json
{
  "source": "window light OR outdoor sun",
  "quality": "soft diffused OR harsh direct",
  "direction": "camera-left 45° OR overhead",
  "color_temp": "5200K daylight OR 4200K warm"
}
```

**Stylized Lighting:**
```json
{
  "mood": "dramatic OR soft OR harsh",
  "key": "specific source with effect",
  "specular": "where highlights appear",
  "ambient": "environmental fill"
}
```

---

## Structural Patterns by Complexity

### Simple Prompts (50-100 lines)
**Examples:** 09-y2k-mirror-selfie, 04-90s-pool-deck

**Structure:**
- 6-8 sections (scene, subject, camera, look, background, negative)
- Minimal nesting
- Direct descriptions
- Essential specs only

**Use For:** Quick social content, testing, iterations

### Medium Prompts (100-200 lines)
**Examples:** 12-winking-sofa-k-beauty, 03-editorial-red-dress

**Structure:**
- 8-10 sections
- Moderate nesting (subject has sub-objects)
- Lighting has multiple sources
- Color palette defined
- Standard camera specs

**Use For:** Standard content creation, professional work

### Complex Prompts (200-400 lines)
**Examples:** 02-glacial-couture, 13-gallery-hallway, 14-bedroom-reclining

**Structure:**
- 10-15 sections
- Deep nesting (subject.face.eyes.details)
- Complete lighting setup (key, fill, rim, ambient)
- Exposure strategy + post-processing
- Photographer notes
- Detailed wardrobe/styling

**Use For:** Professional editorial, commercial work, portfolio

### Very Complex Prompts (400+ lines)
**Examples:** Video prompts with detailed beats

**Structure:**
- 15+ sections
- Timeline beats with physics per segment
- Multiple subjects with IDs
- Audio specifications (for video)
- Scene transitions
- Environmental details

**Use For:** Cinematic productions, detailed narratives

---

## Section-Level Reusable Patterns

### Scene Patterns

**Minimalist:**
```json
"scene": "clean simple background single focal point"
```

**Environmental:**
```json
"scene": {
  "environment": "detailed setting with specific elements",
  "mood": "emotional atmosphere",
  "time": "specific time of day for lighting"
}
```

**Narrative:**
```json
"scene": {
  "location": "specific place with context",
  "background": "story elements visible",
  "atmosphere": "sensory details (sounds, smells, air quality)",
  "props": ["specific items that tell story"]
}
```

### Subject Patterns

**Portrait:**
```json
"subject": {
  "demographics": "age, ethnicity, build",
  "appearance": {
    "hair": "style and color",
    "skin": "texture and tone",
    "face": "expression and gaze"
  },
  "pose": "body position and gesture",
  "wardrobe": "complete outfit description"
}
```

**Object/Product:**
```json
"subject": {
  "type": "what it is",
  "material": "surface properties",
  "state": "condition/arrangement",
  "details": "specific features"
}
```

**Multiple Subjects:**
```json
"subjects": [
  {
    "id": "subject_1",
    "category": "type",
    "specific_details": "..."
  },
  {
    "id": "subject_2",
    "interaction": "how they relate to subject_1"
  }
]
```

### Composition Patterns

**Rule of Thirds:**
```json
"composition": {
  "framing": "subject on right third negative space left",
  "horizon": "low/middle/high",
  "leading_lines": "what guides eye to subject"
}
```

**Centered Symmetry:**
```json
"composition": {
  "layout": "centered symmetrical",
  "balance": "equal weight left and right",
  "framing": "subject fills frame"
}
```

**Environmental Portrait:**
```json
"composition": {
  "subject_placement": "off-center to show environment",
  "background_treatment": "readable but secondary",
  "context_clues": "environmental story elements"
}
```

---

## Video-Specific Patterns

### Timeline Beat Structure (Universal for 8s videos)

**3-Beat Structure** (used in 100% of video examples):

```json
"visual_details": {
  "beats": [
    {
      "time": "0.0-2.5s",
      "action": "ESTABLISH - introduce scene and subject",
      "physics": "initial movement and settling",
      "focus": "where viewer attention starts"
    },
    {
      "time": "2.5-5.0s",
      "action": "ACTION - main event or reveal",
      "physics": "primary motion with realistic behavior",
      "focus": "attention shift or rack focus"
    },
    {
      "time": "5.0-8.0s",
      "action": "RESOLVE - conclusion or emotional hold",
      "physics": "settling, final movements, stillness",
      "focus": "final composition locking attention"
    }
  ]
}
```

### Camera Motion Patterns (Video)

**Rule:** ONE camera motion only (never combine)

**Static (No Motion):**
```json
"shot": {
  "camera_motion": "none locked",
  "composition": "static [framing] entire scene in frame"
}
```

**Push-In/Dolly-In:**
```json
"primary_camera_motion": "slow dolly-in from [start] to [end]",
"motion_path_meters": 0.5,
"stabilization": "locked slider no wobble"
```

**Handheld:**
```json
"primary_camera_motion": "handheld [direction] with natural micro-bob",
"stabilization": "natural handheld micro-bob retained < 2%"
```

**Arc/Orbit:**
```json
"primary_camera_motion": "slow arc-left around subject",
"motion_path": "start [position] end [position]"
```

### Physics Specifications (Critical for Realism)

**Natural Movement:**
```json
"physics": [
  "hair shifts subtly with breeze",
  "fabric compresses naturally at contact points",
  "earrings jitter with motion",
  "breath visible as condensation in cold air",
  "liquid surface tension and slosh",
  "grass blades bend with wind direction"
]
```

**Object Interaction:**
```json
"physics": [
  "hand tremor minimal realistic",
  "weight distribution visible (spine dip under load)",
  "balance compensation (tail lift, torso lean)",
  "footstep cadence realistic for surface",
  "cloth wrinkles form and release naturally"
]
```

---

## Extracted Engagement Formulas

### What Gets 1,000+ Likes (Top 10%)

**Pattern Analysis:**

1. **Y2K Nostalgia** (4,717 likes)
   - Full-body framing
   - Era-specific simulation
   - Intentional imperfections
   - Relatable environments

2. **K-Beauty Aesthetic** (3,229 likes)
   - Porcelain skin
   - High-key lighting
   - Specific makeup style
   - Cultural specificity

3. **Selective Color** (2,986 likes)
   - Black & white base
   - Single color isolation
   - Artistic technique
   - Visual innovation

4. **Urban Editorial** (1,472 likes)
   - Environmental storytelling
   - Fashion + architecture
   - Cultural elements (manga, art)

5. **Gaming/Theme Corner** (1,478 likes)
   - Color-coordinated environment
   - Hobby/interest expression
   - Themed storytelling

6. **CCTV Documentary** (1,245 likes - video)
   - Unique perspective
   - Unexpected subjects
   - Realistic physics
   - Observational style

### What Gets 400-1,000 Likes (Strong Performers)

- Professional editorial with precision
- Creative mashups (Ghibli + modern)
- Cinematic nature scenes
- Environmental portraits with context

### Common Elements in High Performers

**Specificity:** "Mirror selfie in restroom with olive tank" > "woman in room"
**Cultural hooks:** K-Beauty, Y2K, Ghibli, kawaii, gaming
**Technical mastery:** Selective color, precise camera, lighting design
**Storytelling:** Environment tells a story beyond subject
**Authenticity:** Real imperfections > fake perfection

---

## Reusable JSON Sections

### Scene Templates

```json
// Minimalist
"scene": "clean neutral background single subject focus"

// Environmental
"scene": {
  "environment": "[specific location with details]",
  "mood": "[emotional atmosphere]",
  "time": "[time of day for lighting context]"
}

// Narrative
"scene": {
  "location": "[specific place]",
  "background": "[story elements]",
  "atmosphere": "[sensory details sounds smells]",
  "props": ["item 1", "item 2"]
}
```

### Subject Templates

```json
// Simple
"subject": {
  "type": "what/who",
  "appearance": "key visual details",
  "pose": "position and gesture"
}

// Detailed
"subject": {
  "demographics": {
    "age": "adult/young adult",
    "ethnicity": "[specific]",
    "build": "slim/athletic/etc"
  },
  "appearance": {
    "hair": {"style": "...", "color": "..."},
    "skin": "texture and tone details",
    "face": {"expression": "...", "gaze": "..."}
  },
  "pose": "detailed body position",
  "wardrobe": {
    "top": "...",
    "bottom": "...",
    "footwear": "...",
    "accessories": "..."
  }
}
```

### Camera Templates

```json
// Smartphone Simulation
"camera": {
  "device": "iPhone [era] OR smartphone",
  "focal_length_eq_mm": 26,
  "aperture_f": 1.8,
  "iso": 100,
  "mode": "natural smartphone DOF"
}

// Professional DSLR/Mirrorless
"camera": {
  "system": "[Brand Model] full-frame [MP]",
  "lens": "[specific lens with max aperture]",
  "focal_length_mm": 85,
  "aperture_f": 2.8,
  "shutter_s": "1/200",
  "iso": 400,
  "white_balance_k": 5600,
  "focus_mode": "Eye-AF OR manual",
  "color_space": "sRGB OR AdobeRGB"
}

// Cinematic Video
"camera": {
  "lens": "24-28mm equiv OR 85mm prime",
  "aperture_look": "f/2.2 shallow DOF",
  "shutter_look": "1/48s cinematic motion blur",
  "stabilization": "gimbal-stable OR locked slider"
}
```

### Color Palette Templates

```json
// Monochromatic
"color_palette": {
  "base": "#F8F9FA",
  "primary": "#1E3A8A",
  "accent": "#60A5FA"
}

// Complementary
"color_palette": {
  "warm": "#FF6B35",
  "cool": "#004E89",
  "neutral": "#F8F9FA",
  "text": "#0B0B0B"
}

// Selective (B&W + Color)
"color_palette": {
  "base": "monochrome black and white",
  "selective": ["#1E3A8A", "#2563EB"],
  "rule": "color only on [specific element]"
}
```

---

## Pattern Matching Decision Trees

### Tree 1: Image Pattern Selection

```
User Request Analysis
    ↓
Is it casual/relatable content?
├─ YES → Social/Selfie Pattern
│   ├─ Nostalgic → Y2K pattern (4,717 likes)
│   ├─ Beauty focus → K-Beauty pattern (3,229 likes)
│   └─ Hobby/theme → Environment pattern (1,478 likes)
│
└─ NO → Is it professional?
    ├─ YES → Professional/Editorial Pattern
    │   ├─ High-end → Fashion editorial (426 likes)
    │   ├─ Corporate → Studio minimalist (294 likes)
    │   └─ Urban → Environmental editorial (1,472 likes)
    │
    └─ NO → Creative/Artistic Pattern
        ├─ Mashup → Cultural fusion (1,143 likes)
        ├─ Technical → Selective color (2,986 likes)
        └─ Illustration → Kawaii/diagram (610 likes)
```

### Tree 2: Video Pattern Selection

```
Camera Motion Preference?
├─ Static → CCTV/Observational Pattern (1,245 likes)
├─ Slow push-in → Dolly/Push Pattern (416 likes)
├─ Handheld → Selfie/Vlog Pattern (265 likes)
└─ Cinematic → Epic/Landscape Pattern (330 likes)
```

### Tree 3: Platform-First Selection

```
Platform?
├─ Instagram
│   ├─ Post → Social/Selfie OR Creative (4:5 aspect)
│   └─ Reel → Cinematic/Video vertical (9:16)
│
├─ LinkedIn
│   └─ Graphic → Professional/Editorial (1:1 aspect)
│
├─ YouTube
│   ├─ Thumbnail → Creative OR Professional (16:9, bold)
│   └─ Video → Cinematic/Video (16:9 horizontal)
│
├─ Twitter
│   └─ Image → Creative OR Social (16:9 optimal)
│
└─ TikTok
    └─ Video → Cinematic/Video vertical (9:16)
```

---

## Usage Guidelines

### When to Use Each Pattern

**Use Social/Selfie when:**
- Target audience is general public
- Content is personal/relatable
- Platform is Instagram/TikTok
- Aesthetic is casual/authentic
- Goal is high engagement

**Use Professional/Editorial when:**
- Target audience is professionals
- Content is corporate/commercial
- Platform is LinkedIn
- Aesthetic is polished/clean
- Goal is credibility/trust

**Use Creative/Artistic when:**
- Target audience is creatives
- Content is experimental/unique
- Any platform (viral potential)
- Aesthetic is innovative
- Goal is attention/differentiation

**Use Cinematic/Video when:**
- Content is video (any platform)
- Need narrative structure
- Cinematic quality desired
- Timeline planning important
- Goal is immersive storytelling

### Adaptation Workflow

**Step-by-step pattern adaptation:**

1. **Load base pattern** from appropriate category
2. **Extract structure** (which sections, nesting depth)
3. **Preserve technical elements** (camera specs, hex codes, negative prompts)
4. **Replace content** (subject, scene, colors adapt to request)
5. **Maintain precision** (exact values, no vague terms)
6. **Validate completeness** (all required sections present)

**Example Adaptation:**
```
Base: 09-y2k-mirror-selfie (4,717 likes)
Request: "Create Instagram post of my art studio"

Preserve:
- Full-body framing (HEAD-TO-SHOES)
- Lo-fi texture (grain, soft focus)
- Mirror selfie composition
- 4:5 aspect ratio

Adapt:
- Scene: bedroom → art studio
- Props: clutter → art supplies, canvases
- Wardrobe: casual → paint-stained apron
- Color palette: cool tones → artist-specific colors

Result: Art studio selfie with Y2K engagement formula
```

---

## Model-Specific Considerations

### Nano Banana (Gemini 2.5 Flash)
**Prompt Style:** Structured JSON works best
**Strengths:** Creative interpretation, editing, multi-image
**Weaknesses:** Text rendering moderate
**Optimization:** Use system_instruction for overall tone, detailed negative_prompts

### gpt-image-1 (OpenAI DALL-E 3)
**Prompt Style:** Natural language or structured
**Strengths:** Photorealism, text rendering, professional quality
**Weaknesses:** Less creative freedom, more literal
**Optimization:** Be explicit about text content, font sizes

### veotools (Google Veo 3)
**Prompt Style:** Structured with timeline beats
**Strengths:** Cinematic motion, audio sync, physics
**Weaknesses:** 8-30s length limit, complex subjects challenging
**Optimization:** Single camera motion, clear physics per beat

### fal-video (Multiple Models)
**Prompt Style:** Model-dependent
**Strengths:** Model variety, custom training support
**Weaknesses:** Inconsistent across models
**Optimization:** Match prompt style to selected model

---

## Common Patterns NOT in Emily's Examples

These are common prompt types Emily hasn't posted (opportunities for extension):

**Missing:**
- Product photography (e-commerce)
- Food photography (culinary)
- Architecture (buildings, interiors)
- Landscape (pure nature, no people)
- Abstract art (non-representational)
- Technical diagrams (infographics, charts)
- Typography-only (text-based graphics)

**Future Template Expansion:**
When these use cases arise, create new templates following Emily's methodology:
- 10+ sections
- Technical precision
- Platform optimization
- Negative prompts 10+ items
- Save successful prompts as new templates

---

**Pattern Library Version:** 1.0
**Analyzed:** 30 Emily prompts (17 image, 13 video)
**Top Engagement:** 4,717 likes
**Average Engagement:** 847 likes
**Methodology:** Structural extraction + engagement correlation
