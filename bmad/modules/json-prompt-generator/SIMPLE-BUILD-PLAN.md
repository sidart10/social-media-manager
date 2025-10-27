# JSON Prompt Generator - SIMPLE Build Plan

**Created**: October 25, 2025
**Principle**: FLEXIBLE, NOT OVER-ENGINEERED

---

## 🧠 ULTRATHINK: The Sequence Problem

### The Challenge:

**User might want**:

- 3 scenes (quick video)
- 10 scenes (detailed story)
- 20 scenes (full documentary)

**Each sequence needs**:

- ✅ Flexible number of scenes (3-20+)
- ✅ Consistency within sequence (coherent style)
- ✅ Context awareness (Scene 2 continues from Scene 1)
- ✅ NO over-engineering (keep it simple)

### The Solution: **Global Settings + Scene Array**

```json
{
  "sequence": {
    "metadata": {
      "scene_count": 4  // DYNAMIC - user specifies
    },

    "global_consistency": {
      // These ensure ALL scenes feel connected
      "lens": "50mm Prime (same throughout)",
      "film_grain": "Heavy 35mm (consistent texture)",
      "color_evolution": "Earthy browns → Vibrant teal/orange",
      "lighting_progression": "Dark firelight → Modern bright → Futuristic neon"
    },

    "scenes": [
      // FLEXIBLE ARRAY - can be 3, 10, 20 scenes
      { scene_1_full_json },
      { scene_2_full_json },
      { scene_3_full_json }
      // ... add more as needed
    ]
  }
}
```

**Why This Works**:

- ✅ Scenes array = flexible (any length)
- ✅ Global settings = consistency
- ✅ Each scene inherits global rules but can vary details
- ✅ Simple, not complex

---

## 📋 FOCUSED BUILD PLAN (3 Hours, Not 6)

### **PHASE 1: Core Templates Only** (60 mins)

**Build ONLY these 2 files**:

1. **`templates/video-scene.json`** (single shot)
   - Complete JSON structure
   - All sections (scene, camera, lighting, color, negatives)
   - ~150-200 lines

2. **`templates/video-sequence.json`** (flexible multi-scene)
   - Global consistency settings
   - Scenes array (flexible length)
   - Transition specs
   - ~250-300 lines

**Skip for now**:

- ~~Image templates~~ (already exist in image agent)
- ~~Audio templates~~ (future)
- ~~Complex variations~~ (add later)

**Deliverable**: 2 video templates ready to use

---

### **PHASE 2: Simple Conversion** (45 mins)

**Build ONLY**:

1. **`sidecar/conversion-rules.md`** (simple reference)
   - How to convert JSON → Text
   - 5-10 examples
   - ~50 lines

2. **`workflows/convert-json-to-text.yaml`** (simple workflow)
   - Load JSON
   - Apply conversion rules
   - Output text prompt
   - ~30-40 lines

**Test**:

- Input: video-scene.json (stone age example)
- Output: Text prompt for Sora2
- Verify it works

**Deliverable**: JSON→Text converter

---

### **PHASE 3: Quick Integration** (45 mins)

**Build ONLY**:

1. **New Video Agent Workflow**: `ai-video-agent/workflows/generate-from-json.yaml`
   - User provides concept
   - Load sequence template
   - Ask: How many scenes? (3-20)
   - Generate JSON for each scene
   - Convert to images OR text
   - Generate video
   - ~60-80 lines

**Test**:

- Create 3-scene evolution video using JSON
- Compare quality vs text-only

**Deliverable**: Working JSON→Video pipeline

---

### **PHASE 4: Validation** (30 mins)

**Test**:

1. 3-scene video (quick test)
2. 5-scene video (medium test)
3. Quality comparison

**Document**:

- What works
- What needs improvement
- Next enhancements

**Deliverable**: Proven system

**Total**: ~3 hours

---

## 🎯 FLEXIBLE SEQUENCE TEMPLATE (Smart Design)

### Key Innovation: **Context Inheritance**

```json
{
  "video_sequence": {
    "metadata": {
      "title": "Evolution of Human Tools",
      "scene_count": null, // SET BY USER (3, 5, 10, 20, etc.)
      "total_duration_target": "auto", // Calculated: scene_count * 3s
      "creation_date": "2025-10-25"
    },

    "global_consistency": {
      // These create COHERENCE across all scenes
      "visual_style": "Cinematic photorealism with film grain",
      "camera_consistency": {
        "lens_family": "Prime lenses only (35mm or 50mm)",
        "shot_type_consistency": "All close-ups or all wide shots",
        "movement_style": "Slow, deliberate camera movements"
      },
      "color_evolution": {
        "progression_type": "gradual_shift",
        "start_palette": ["#4A3728", "#1A1410", "#D97D3E"],
        "end_palette": ["#00D4FF", "#FF6B35", "#2C3E50"],
        "shift_description": "Warm earthy browns → Cool tech cyan/orange"
      },
      "lighting_progression": {
        "arc": "Dark → Warm → Bright → Futuristic",
        "style_consistency": "Dramatic contrast maintained throughout"
      },
      "grain_and_texture": {
        "film_grain": "Heavy 35mm Kodak grain (consistent)",
        "texture_treatment": "Tactile, photorealistic, no smoothing"
      }
    },

    "scenes": [
      // FLEXIBLE ARRAY - User populates as many as needed

      {
        "scene_number": 1,
        "inherits_from": "global_consistency",
        "scene_specific": {
          "scene_name": "Stone Age - Fire and Stone",
          "environment": "Dark cave interior, firelight on walls",
          "subject_action": "Hands chiseling stone tool",
          "color_palette_this_scene": ["#4A3728", "#1A1410", "#D97D3E"],
          "lighting_this_scene": "Single fire source, hard dramatic"
          // ... full scene JSON (inherits lens, grain, style from global)
        }
      },

      {
        "scene_number": 2,
        "inherits_from": "global_consistency",
        "scene_specific": {
          "scene_name": "Medieval - Workshop",
          "environment": "Wooden workshop, tool bench, morning light",
          "subject_action": "Craftsman using metal tools",
          "color_palette_this_scene": ["#6B5345", "#D4A574", "#8B7355"]
          // Colors shifted slightly from Scene 1 (part of evolution)
          // ... inherits lens, grain, style
        }
      },

      {
        "scene_number": 3,
        "inherits_from": "global_consistency",
        "scene_specific": {
          "scene_name": "Modern - Digital Work",
          "environment": "Clean desk, computer screens, soft office lighting",
          "subject_action": "Hands typing on keyboard",
          "color_palette_this_scene": ["#2C3E50", "#3498DB", "#ECF0F1"]
          // Colors now cooler, brighter (evolution continues)
          // ... inherits lens, grain, style
        }
      }

      // User can add Scene 4, 5, 6... up to 20+ if needed
      // Each inherits global rules but specifies scene-specific details
    ],

    "transitions": {
      "default_transition": "fade (1 second)",
      "transition_style": "Seamless, match-cut where possible",
      "merge_strategy": "Sora2 merge_videos with auto-fades"
    },

    "output_specifications": {
      "final_format": "MP4",
      "codec": "H.264",
      "resolution": "1920x1080",
      "total_duration": "calculated from scene_count * duration_per_scene",
      "intended_platform": "YouTube, professional use"
    },

    "negative_prompts_global": [
      // These apply to ALL scenes
      "low quality, blurry, pixelated, compression artifacts",
      "cartoon, anime, illustration, CGI render",
      "text overlays, watermarks, UI elements",
      "deformed anatomy, extra limbs, incorrect physics",
      "inconsistent style across scenes",
      "jarring transitions, hard cuts without motivation"
    ]
  }
}
```

---

## 🎯 HOW IT STAYS FLEXIBLE

### User Wants 3 Scenes:

```
Agent: "Describe 3 key moments in your story"
User: "Stone age, modern, AI future"
Agent: Generates scenes array with 3 entries
Result: 9-12 second video (3 scenes × 3-4s each)
```

### User Wants 10 Scenes:

```
Agent: "Describe 10 moments"
User: "Stone age, bronze age, iron age, medieval, renaissance, industrial, modern, digital, AI, future"
Agent: Generates scenes array with 10 entries
Result: 30-40 second video (10 scenes × 3-4s each)
```

### User Wants 20 Scenes:

```
Agent: "That's ambitious! Describe all 20"
Agent: Generates scenes array with 20 entries
Result: 60-80 second video documentary
```

**Same template, just longer array!**

---

## ✅ SIMPLE EXECUTION PLAN (3 Hours)

### **Hour 1: Build Templates**

**Task 1.1**: Create `video-scene.json` (30 mins)

- Single scene/shot template
- All sections from brainstorm
- ~150 lines

**Task 1.2**: Create `video-sequence.json` (30 mins)

- Global consistency section
- Flexible scenes array (example with 3, show it can be 20)
- Transition specs
- ~200 lines

---

### **Hour 2: Conversion + Workflow**

**Task 2.1**: Create conversion workflow (30 mins)

- `workflows/convert-json-to-text.yaml`
- Simple rules (JSON → pipe-separated text)
- Test with stone age scene

**Task 2.2**: Create generation workflow (30 mins)

- `workflows/generate-sequence.yaml`
- Asks: How many scenes?
- Populates array dynamically
- Saves JSON

---

### **Hour 3: Integration + Test**

**Task 3.1**: Wire into video agent (30 mins)

- Create `ai-video-agent/workflows/generate-cinematic-sequence.yaml`
- Calls json-prompt-generator
- Generates images
- Uses Sora2 fade + merge

**Task 3.2**: Test (30 mins)

- Test 3-scene evolution video
- Verify consistency
- Check quality

**Done!**

---

## 🚀 READY TO EXECUTE?

**I'll build**:

1. `video-scene.json` template (single shot)
2. `video-sequence.json` template (flexible array)
3. Simple conversion workflow
4. Integration with video agent

**Focus**: Simple, flexible, works for 3 OR 20 scenes

**Say "execute" and I'll start building!** 🎬
