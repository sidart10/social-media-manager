# Brainstorm: JSON-Structured Video Prompting & Image→Video Pipeline

**Date**: October 25, 2025
**Goal**: Apply Emily's JSON quality standards to video generation

---

## 🔍 THE PROBLEM IDENTIFIED

### Current State (WEAK):

```
My "enhanced prompt": "Epic visual journey through human tool evolution: ancient hands chiseling stone tools..."
```

**Issues**:

- ❌ Just long text, not structured
- ❌ No technical specifications (camera settings, lighting ratios, color values)
- ❌ No negative prompts
- ❌ No scene breakdown
- ❌ No quality benchmarking
- ❌ Not reproducible (how do you iterate?)

### Emily's Approach (STRONG):

```json
{
  "scene": { "environment": "...", "mood_grade": "..." },
  "subject": { "identity": "...", "build": "...", "hair": {...}, "pose": "..." },
  "camera": { "system": "Canon EOS R5", "lens": "RF 85mm f/1.2L", "aperture_f": 3.5, "iso": 100 },
  "lighting": "...",
  "composition": { "orientation": "9:16", "framing": "..." },
  "post_processing": { "raw_dev": "...", "grade": "..." },
  "negative_prompt": [10+ items]
}
```

**Strengths**:

- ✅ Every detail specified
- ✅ Technical precision (aperture, ISO, lens)
- ✅ Reproducible and tweakable
- ✅ Quality control built-in
- ✅ Negative prompts prevent failures

---

## 💡 THE VISION

### Workflow: **JSON Prompting → Image Generation → Video Animation**

**Step 1**: User describes video concept
**Step 2**: Agent generates JSON prompt (Emily-quality structure)
**Step 3**: Agent generates KEY FRAMES as images (using nanobanana/gpt-image-1)
**Step 4**: Agent animates images into video (using Sora2 fade/merge or Veo3 image-to-video)

**Example**:

User: "Evolution of tools from stone age to AI"

Agent creates:

1. **JSON Prompt** for Frame 1 (Stone Age):

```json
{
  "scene": {
    "environment": "Dark cave interior, firelight flickering on rough stone walls, primitive tools scattered",
    "time_of_day": "night",
    "mood_grade": "Warm orange firelight with deep brown-black shadows, high contrast"
  },
  "subject": {
    "identity": "Ancient human hands (weathered, strong)",
    "action": "Chiseling stone tool with focused precision",
    "hand_details": "Rough skin, dirt under nails, visible tendons, gripping primitive hammer"
  },
  "camera": {
    "system": "Cinematic camera simulation",
    "lens": "50mm Prime (shallow depth of field)",
    "focal_length_mm": 50,
    "aperture_f": 2.8,
    "iso": 1600,
    "focus_point": "Hands and stone tool (sharp), background soft blur"
  },
  "lighting": {
    "primary": "Single fire source (warm orange, flickering)",
    "quality": "Hard dramatic light with deep shadows",
    "direction": "Side-lit from fire, creates chiaroscuro effect"
  },
  "composition": {
    "orientation": "horizontal 16:9",
    "shot_type": "Close-up on hands",
    "framing": "Hands centered, rule of thirds, negative space camera-left"
  },
  "color_palette": {
    "dominant": ["deep browns", "black shadows", "warm orange firelight"],
    "accents": ["grey stone", "red-orange embers"],
    "grade": "Desaturated earthy tones with selective warm highlights on fire"
  },
  "post_processing": {
    "contrast": "High contrast, crushed blacks for drama",
    "grain": "Heavy 35mm film grain for ancient feel",
    "sharpness": "Sharp on hands, soft on background"
  },
  "negative_prompt": [
    "modern elements, electric lights, contemporary tools",
    "clean hands, manicured nails, soft skin",
    "bright lighting, even illumination, studio setup",
    "cartoon, illustration, CGI render",
    "low quality, blurry, artifacts",
    "wrong time period, anachronisms"
  ]
}
```

2. **JSON Prompt** for Frame 2 (Modern Era):
   - Similar structure
   - Modern desk, computer, blue screen glow
   - Different lighting, color palette

3. **JSON Prompt** for Frame 3 (AI Future):
   - Holographic interface
   - Cyan-blue lighting
   - Futuristic aesthetic

4. **Generate images**: 3 high-quality key frames
5. **Animate**: Use Sora2 `create_fade_animation` + `merge_videos` to create transitions
6. **Result**: Cinematic video with Emily-quality visual fidelity

---

## 🏗️ PROPOSED ARCHITECTURE

### Option 1: **Separate JSON Prompt Module** (RECOMMENDED)

**Create**: `bmad/modules/json-prompt-generator/`

**Purpose**: Generate structured JSON prompts for ANY content (images, videos, audio)

**Structure**:

```
json-prompt-generator/
├── json-prompt-generator.module.yaml
├── templates/
│   ├── video-scene-template.json
│   ├── video-shot-template.json
│   ├── image-photorealistic-template.json (already exists in AI Image Agent)
│   └── image-professional-template.json
├── workflows/
│   ├── generate-video-scene-prompt.yaml
│   └── generate-image-prompt.yaml
└── sidecar/
    ├── prompt-engineering-rules.md
    ├── quality-standards.md
    └── examples/ (Emily's prompts)
```

**Why Separate Module**:

- ✅ Reusable across video AND image agents
- ✅ Focused responsibility (prompt engineering only)
- ✅ Can be called by other agents
- ✅ Easier to maintain quality standards
- ✅ Scales to audio/3D/other modalities

---

### Option 2: **Integrated into Video Agent** (SIMPLER)

**Add to**: `bmad/agents/ai-video-agent/`

**New Files**:

```
ai-video-agent/
└── prompt-templates/
    ├── video-scene-json-template.json
    ├── video-shot-json-template.json
    └── video-sequence-json-template.json
```

**Why Integrated**:

- ✅ Simpler (no new module)
- ✅ Faster to implement
- ❌ Not reusable by other agents
- ❌ Mixes concerns (video generation + prompt engineering)

---

## 🎬 PROPOSED WORKFLOW: Image→Video Pipeline

### Workflow Name: **"Cinematic Sequence from JSON"**

**Input**: User concept (e.g., "Evolution of tools")

**Step 1: JSON Prompt Generation**

```
Agent loads video-scene-template.json
Agent asks user key questions:
  - How many key frames? (3-5 recommended)
  - What transitions? (fade, morph, cut)
  - Color palette evolution?
  - Lighting progression?

Agent generates JSON prompt for EACH frame:
  Frame 1: Stone age (JSON structure)
  Frame 2: Medieval (JSON structure)
  Frame 3: Modern (JSON structure)
  Frame 4: AI future (JSON structure)
```

**Step 2: Image Generation**

```
For each frame JSON:
  1. Convert JSON → text prompt for image generator
  2. Call mcp__nanobanana__generate_image OR mcp__gpt-image-1__create_image
  3. Save image with metadata
  4. Run 7-pillar quality check
  5. Regenerate if score < 7

Result: 4 Emily-quality key frame images
```

**Step 3: Video Animation**

```
For each image:
  1. Call mcp__sora2__create_fade_animation
  2. Duration: 3-4 seconds each
  3. Fade type: 'in-out' for smooth transitions

Result: 4 video clips (3-4s each = 12-16s total)
```

**Step 4: Video Merge**

```
Call mcp__sora2__merge_videos(
  video_urls=[clip1, clip2, clip3, clip4],
  output_path="evolution_cinematic_final.mp4"
)

Result: Seamless 12-16 second video with fade transitions
```

---

## 📐 JSON TEMPLATE FOR VIDEO SCENES

### Proposed Structure:

```json
{
  "video_scene": {
    "scene_metadata": {
      "scene_number": 1,
      "scene_name": "Stone Age Tools",
      "duration_seconds": 3,
      "transition_in": "fade-in",
      "transition_out": "fade-out"
    },

    "scene": {
      "environment": "Dark cave interior with fire",
      "time_period": "Stone Age (~10,000 BCE)",
      "mood_grade": "Warm orange firelight, deep shadows, primal atmosphere"
    },

    "subject": {
      "type": "human_hands",
      "action": "Chiseling stone tool with focused precision",
      "details": "Weathered hands, rough skin, primitive hammer and stone",
      "focal_point": "Hands and tool (sharp focus)"
    },

    "camera": {
      "shot_type": "Close-up",
      "lens": "50mm Prime",
      "aperture_f": 2.8,
      "iso": 1600,
      "focus": "Hands sharp, background soft bokeh",
      "movement": "Static with subtle handheld shake"
    },

    "lighting": {
      "primary_source": "Single firelight (warm orange 2700K)",
      "lighting_style": "Chiaroscuro (dramatic contrast)",
      "quality": "Hard light with flickering",
      "direction": "Side-lit from camera-right",
      "mood": "Dramatic, primal, ancient"
    },

    "color_palette": {
      "dominant_colors": ["#4A3728", "#1A1410", "#D97D3E"],
      "color_names": ["deep brown", "black shadows", "warm orange fire"],
      "color_grade": "Desaturated earthy tones with warm fire accents",
      "contrast_level": "High contrast, crushed blacks",
      "film_grain": "Heavy 35mm grain for texture"
    },

    "composition": {
      "aspect_ratio": "16:9",
      "resolution": "1920x1080",
      "framing": "Close-up, hands centered with rule of thirds offset",
      "negative_space": "Dark cave background, camera-left breathing room",
      "depth_layers": "Hands (foreground), tools (mid), cave wall (background soft)"
    },

    "vfx_and_transitions": {
      "transition_to_next": "fade-out to black, 1 second",
      "internal_motion": "Subtle fire flicker, gentle smoke movement",
      "speed": "Slow, deliberate, timeless"
    },

    "technical_output": {
      "format": "PNG for image generation, MP4 for final video",
      "color_space": "sRGB",
      "quality_target": "Editorial photorealistic",
      "intended_use": "Video key frame, 4K master"
    },

    "negative_prompt": [
      "modern elements, electric lights, contemporary setting",
      "clean hands, manicured appearance, soft skin",
      "bright even lighting, studio setup",
      "cartoon, anime, illustration, CGI render",
      "low quality, blurry, artifacts, compression",
      "anachronisms, wrong time period",
      "text overlays, watermarks, UI elements",
      "deformed anatomy, extra fingers",
      "plastic look, waxy smoothing",
      "color banding, oversaturation"
    ]
  }
}
```

---

## 🔄 TWO APPROACHES TO BRAINSTORM

### Approach A: **"JSON Prompt First, Then Route"** (Purist)

**Flow**:

1. User: "Create evolution of tools video"
2. Agent: Generates complete JSON structure (like above) for EACH scene
3. Agent: Asks "Generate as images→video OR direct text-to-video?"
4. **Path A1** (Images→Video): Generate images from JSON → Animate with Sora2 fade → Merge
5. **Path A2** (Direct): Convert JSON → enhanced text prompt → Sora2/Veo3

**Pros**:

- Highest quality control
- Full Emily standards
- Can critique and iterate on JSON before generation
- Works for both image-based and direct video workflows

**Cons**:

- More complex
- Slower (more steps)
- User has to wait for JSON generation

---

### Approach B: **"Smart Hybrid"** (Pragmatic)

**Flow**:

1. User: "Create evolution video"
2. Agent: Asks "Quality level? [fast-text / cinematic-json]"
3. **Fast Path**: Use current text-to-video (Veo3/Sora2 direct)
4. **Cinematic Path**: Generate JSON → Images → Animate → Merge

**Pros**:

- User chooses quality vs speed
- Fast path for quick b-roll
- Cinematic path for hero content
- Best of both worlds

**Cons**:

- Two different systems to maintain

---

## 🎨 INTEGRATION WITH IMAGE AGENT

### Shared Resource Approach:

**Create**: `bmad/modules/prompt-engineering/` (Shared Module)

**Used By**:

- AI Image Generator Agent
- AI Video Agent
- Future: AI Audio Agent, AI 3D Agent

**Contains**:

```
prompt-engineering/
├── templates/
│   ├── image-photorealistic.json (Emily's format)
│   ├── image-professional.json (diagrams/carousels)
│   ├── video-scene.json (NEW - proposed above)
│   └── video-shot.json (NEW - single shot spec)
├── workflows/
│   ├── generate-json-prompt.yaml
│   └── critique-and-refine.yaml
├── standards/
│   ├── emily-quality-standards.md
│   ├── 7-pillar-benchmark.md
│   └── negative-prompts-library.md
└── examples/
    └── emily_prompts_QUALITY_ONLY.csv (your file)
```

**How Agents Use It**:

```
AI Image Agent: "I need a JSON prompt for a fashion photo"
→ Calls: prompt-engineering/generate-json-prompt.yaml
→ Receives: Complete JSON
→ Generates image with mcp__nanobanana__ or mcp__gpt-image-1__

AI Video Agent: "I need a JSON prompt for a cinematic scene"
→ Calls: prompt-engineering/generate-json-prompt.yaml
→ Receives: Complete JSON
→ Option A: Generates image then animates
→ Option B: Converts JSON to text for direct video generation
```

---

## 🎬 PROPOSED VIDEO-SPECIFIC JSON STRUCTURE

### **Level 1: Video Scene** (Single Shot/Frame)

```json
{
  "video_scene": {
    "metadata": {
      "scene_id": "evo_001_stone_age",
      "scene_name": "Stone Age Chiseling",
      "duration_target_sec": 3,
      "output_format": "key_frame_image | video_clip"
    },

    "scene_description": {
      "environment": "Dark cave, firelight, primitive tools",
      "time_period": "Stone Age, ~10,000 BCE",
      "weather_atmosphere": "Smoky from fire, humid cave air",
      "sound_concept": "Rhythmic chiseling, fire crackling, echo in cave"
    },

    "subject_and_action": {
      "subject_type": "human_hands",
      "identity": "Ancient human (adult male, weathered)",
      "body_visible": "Hands and forearms only",
      "action": "Chiseling stone into tool shape",
      "action_specifics": "Precise strikes, chips flying, focused intensity",
      "pose": "Hands gripping stone and hammer, mid-strike frozen moment"
    },

    "cinematography": {
      "shot_type": "Extreme close-up (ECU) on hands",
      "camera_movement": "Static with subtle handheld shake for realism",
      "lens": {
        "type": "50mm Prime",
        "aperture_f": 2.8,
        "focus_distance_ft": 2,
        "depth_of_field": "Shallow (hands sharp, background soft bokeh)"
      },
      "frame_rate_fps": 24,
      "shutter_angle_deg": 180,
      "motion_blur": "Natural (1/48s shutter for 24fps)"
    },

    "lighting_design": {
      "lighting_style": "Chiaroscuro (dramatic single-source)",
      "key_light": {
        "source": "Fire (practical, warm 2700K)",
        "position": "Camera-right, 45° angle",
        "quality": "Hard with flicker",
        "intensity": "Medium-high for drama"
      },
      "fill_light": "None (deep shadows intentional)",
      "rim_light": "None",
      "ambient_light": "Minimal cave darkness",
      "contrast_ratio": "8:1 (dramatic)"
    },

    "color_and_grade": {
      "color_palette_hex": ["#4A3728", "#1A1410", "#D97D3E", "#8B4513"],
      "color_palette_names": ["deep brown", "black", "fire orange", "saddle brown"],
      "grade_style": "Desaturated earthy with selective warm accents",
      "lut_reference": "Kodak 5219 film emulation",
      "contrast": "High (crushed blacks, protected highlights)",
      "saturation": "Low overall, boosted on fire only",
      "film_grain": "Heavy 35mm Kodak grain, organic texture"
    },

    "composition_and_framing": {
      "aspect_ratio": "16:9",
      "resolution": "1920x1080",
      "safe_zones": "Action safe, title safe for graphics",
      "rule_of_thirds": "Hands on right intersection, negative space left",
      "headroom": "Minimal (tight framing)",
      "lead_room": "Pointing toward action (chiseling direction)",
      "depth_planes": 3,
      "foreground": "Stone chips flying (subtle motion blur)",
      "midground": "Hands and tools (sharp focus)",
      "background": "Cave wall (soft, out of focus)"
    },

    "vfx_and_effects": {
      "particle_effects": "Stone chips/dust particles catching firelight",
      "volumetric_effects": "Smoke from fire creating light rays",
      "motion_graphics": "None (pure photorealism)",
      "time_manipulation": "None (real-time)",
      "color_correction": "Film emulation LUT applied"
    },

    "transition_specifications": {
      "transition_in": "Fade from black (1 second)",
      "transition_out": "Morph dissolve to next era (1.5 seconds)",
      "transition_style": "Seamless time-travel effect, match-cut on hands"
    },

    "audio_concept": {
      "sound_design": "Rhythmic stone chiseling, fire crackling",
      "ambience": "Cave echo, distant water drips",
      "music": "None (natural sound only)",
      "mix": "Diegetic sound, mono source positioning"
    },

    "output_specifications": {
      "primary_output": "Static key frame image (1920x1080 PNG)",
      "secondary_output": "3-second video clip with fade (if animated)",
      "codec": "H.264, high bitrate",
      "color_space": "Rec.709 for web delivery",
      "intended_platform": "YouTube, LinkedIn, professional use"
    },

    "negative_prompt": [
      "modern elements, electric lights, contemporary tools, technology",
      "clean hands, manicured nails, soft skin, no dirt",
      "bright even lighting, studio setup, soft boxes",
      "cartoon, anime, illustration, CGI/3D render look",
      "low quality, blurry, pixelated, compression artifacts",
      "deformed anatomy, extra fingers, missing fingers",
      "plastic skin, waxy smoothing, artificial look",
      "wrong time period, anachronisms, future elements",
      "text overlays, watermarks, UI elements, subtitles",
      "oversaturated colors, neon, vibrant unnatural colors",
      "fish-eye distortion, lens aberration, weird bokeh",
      "duplicate hands, floating objects, physics violations"
    ]
  }
}
```

---

## 🔧 TOOLS INTEGRATION

### Image Generation:

```
mcp__nanobanana__generate_image(
  prompt="{converted from JSON}",
  negative_prompt="{from JSON negative_prompt array}",
  n=1
)

mcp__gpt-image-1__create_image(
  prompt="{converted from JSON}",
  size="1536x1024", # for 16:9
  quality="high",
  n=1
)
```

### Video Animation:

```
mcp__sora2__create_fade_animation(
  image_path="{generated_image}",
  duration=3,
  fade_type='in-out',
  output_path="scene_{scene_id}.mp4"
)
```

### Video Merging:

```
mcp__sora2__merge_videos(
  video_urls=[
    "scene_001.mp4",
    "scene_002.mp4",
    "scene_003.mp4",
    "scene_004.mp4"
  ],
  output_path="evolution_final.mp4"
)
```

---

## 💬 PROMPT CONVERSION: JSON → Text

**Challenge**: Image/video generators don't accept JSON directly, need text.

**Solution**: Convert JSON → Natural Language

**Example**:

```python
# From JSON:
{
  "scene": {"environment": "Dark cave, firelight"},
  "subject": {"action": "Chiseling stone"},
  "camera": {"lens": "50mm", "aperture_f": 2.8},
  "lighting": {"style": "Chiaroscuro", "source": "Fire"},
  "color": {"grade": "Desaturated earthy"},
  "negative_prompt": ["modern", "cartoon", "blurry"]
}

# To Text:
"Dark cave interior with firelight, ancient human hands chiseling stone tool with focused precision | Close-up shot with 50mm prime lens at f/2.8, shallow depth of field with hands in sharp focus | Dramatic chiaroscuro lighting from single fire source (2700K warm orange), hard flickering light from camera-right creating deep shadows | Desaturated earthy color palette (deep browns, blacks) with warm orange fire accents, high contrast with crushed blacks, heavy 35mm film grain | Photorealistic 16:9 cinematic, 1920x1080"

# Negative (passed separately if supported):
"modern elements, cartoon, blurry, low quality"
```

---

## 🎯 RECOMMENDED IMPLEMENTATION PLAN

### Phase 1: **Create Shared Prompt Module** (2-3 hours)

**Tasks**:

1. Create `bmad/modules/json-prompt-generator/`
2. Port Emily's templates
3. Create video scene template (JSON structure above)
4. Build conversion logic (JSON → text)
5. Test with image agent

**Deliverable**: Reusable JSON prompt generator

---

### Phase 2: **Integrate into Video Agent** (2-3 hours)

**Tasks**:

1. Create new workflow: `generate-cinematic-sequence.yaml`
2. Wire JSON prompt generator module
3. Implement Image→Fade→Merge pipeline
4. Test end-to-end with evolution concept
5. Compare quality vs current text-to-video

**Deliverable**: JSON-based cinematic video workflow

---

### Phase 3: **Enhance Existing Workflows** (1-2 hours)

**Tasks**:

1. Update `create-scene` to offer JSON mode
2. Add quality choice: [fast-text / cinematic-json]
3. Update documentation
4. Train users on when to use each mode

**Deliverable**: Complete video agent with both paths

---

## ✅ IMMEDIATE DECISION POINTS

### Question 1: **Separate Module or Integrated?**

**A**: Separate `json-prompt-generator` module (reusable, scalable)
**B**: Integrate into video agent (simpler, faster to build)

**Recommendation**: **A** - Build it right, use across all agents

---

### Question 2: **Image→Video or Direct Video?**

**A**: Always use Image→Video pipeline (max quality)
**B**: Offer both (fast text-to-video, slow image→video)
**C**: Replace text-to-video entirely (JSON only)

**Recommendation**: **B** - Give users choice

---

### Question 3: **Build Now or Later?**

**A**: Build full JSON module now (2-3 hours)
**B**: Quick prototype in video agent (1 hour)
**C**: Use current text prompts, enhance later

**Recommendation**: Depends on urgency

---

## 🎬 WHAT DO YOU THINK?

**Key Questions for You**:

1. **Module Structure**: Separate `json-prompt-generator` module or integrate into video agent?

2. **Workflow**: Always Image→Video, or offer Fast vs Cinematic choice?

3. **Priority**: Build JSON system now, or use current text system and enhance later?

4. **Scope**: Just video agent, or build shared module for all agents?

Let me know your thoughts and I'll build the architecture! 🚀
