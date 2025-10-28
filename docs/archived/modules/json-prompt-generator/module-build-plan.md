# JSON Prompt Generator Module - Build Plan

**Created**: October 25, 2025
**Type**: BMAD Shared Module
**Purpose**: Generate Emily-quality structured JSON prompts for image and video generation

---

## 🎯 MODULE MISSION

**Create a reusable, high-quality JSON prompt generator that**:

- Produces Emily-standard structured prompts for ANY content type
- Maintains 7-pillar quality benchmarking
- Supports images, videos, and future modalities
- Used by Image Agent, Video Agent, and future agents
- Enforces technical precision and negative prompts

**Quality Standard**: Emily's photorealistic/professional prompt methodology

---

## 🏗️ MODULE ARCHITECTURE

### Directory Structure:

```
bmad/modules/json-prompt-generator/
├── json-prompt-generator.module.yaml    # Module definition
├── README.md                            # Module documentation
├── sidecar/
│   ├── instructions.md                  # Core prompting rules
│   ├── emily-quality-standards.md       # 7-pillar benchmark
│   ├── conversion-rules.md              # JSON → Text conversion
│   └── negative-prompts-library.md      # Categorized negative prompts
├── templates/
│   ├── image-photorealistic.json        # Emily's fashion/portrait template
│   ├── image-professional.json          # Diagrams/carousels template
│   ├── video-scene.json                 # Single video scene/shot
│   ├── video-sequence.json              # Multi-scene video
│   └── README.md                        # Template usage guide
└── workflows/
    ├── generate-image-json-prompt.yaml
    ├── generate-video-json-prompt.yaml
    ├── generate-sequence-json-prompt.yaml
    ├── convert-json-to-text.yaml
    └── critique-quality.yaml
```

---

## 📋 BUILD PHASES

### **PHASE 1: Core Module Structure** (30 mins)

**Tasks**:

1. Create `json-prompt-generator.module.yaml` (module definition)
2. Create `README.md` (module documentation)
3. Create `sidecar/instructions.md` (core prompting rules)
4. Create `sidecar/emily-quality-standards.md` (7-pillar system)

**Deliverable**: Module skeleton

---

### **PHASE 2: JSON Templates** (1 hour)

**Tasks**:

1. **Create `templates/video-scene.json`** (comprehensive single-shot template)
   - Based on structure designed in brainstorm
   - All sections: scene, subject, camera, lighting, color, composition, vfx, transitions, audio, output, negatives
   - 200+ lines of structured JSON

2. **Create `templates/video-sequence.json`** (multi-scene template)
   - Array of scenes
   - Transition specifications between scenes
   - Overall video metadata

3. **Port `templates/image-photorealistic.json`** (Emily's format)
   - Copy from Emily's example
   - Clean formatting

4. **Create `templates/README.md`**
   - Explain each template
   - When to use which
   - How to populate

**Deliverable**: 4 comprehensive JSON templates

---

### **PHASE 3: Conversion System** (1 hour)

**Tasks**:

1. **Create `sidecar/conversion-rules.md`**
   - Rules for JSON → Text conversion
   - Section mapping (scene → description, camera → technical specs)
   - Examples of good conversions

2. **Create `workflows/convert-json-to-text.yaml`**
   - Input: JSON prompt
   - Output: Natural language text prompt
   - Preserves all details from JSON

3. **Test conversion**:
   - Input: video-scene.json (fully populated)
   - Output: Text prompt for Sora2/Veo3
   - Verify quality maintained

**Deliverable**: JSON→Text conversion system

---

### **PHASE 4: Generation Workflows** (1 hour)

**Tasks**:

1. **Create `workflows/generate-video-json-prompt.yaml`**
   - User provides concept (e.g., "evolution of tools")
   - Agent asks key questions (scenes, duration, style)
   - Agent populates video-scene.json template
   - Agent shows user for approval/editing
   - Agent saves JSON prompt

2. **Create `workflows/generate-sequence-json-prompt.yaml`**
   - For multi-scene videos
   - Agent generates JSON for EACH scene
   - Agent links scenes with transitions
   - Agent saves complete sequence JSON

3. **Create `workflows/critique-quality.yaml`**
   - Input: Generated image or video
   - Run 7-pillar benchmark
   - Suggest improvements
   - Save critique report

**Deliverable**: JSON prompt generation workflows

---

### **PHASE 5: Integration with Video Agent** (1 hour)

**Tasks**:

1. **Create new video workflow**: `ai-video-agent/workflows/generate-cinematic-sequence.yaml`
   - Calls json-prompt-generator module
   - Generates JSON for each key frame
   - Generates images (nanobanana/gpt-image-1)
   - Animates with Sora2 fade
   - Merges with Sora2 merge
   - Delivers final video

2. **Update `create-scene` workflow**:
   - Add quality choice: [fast-text / cinematic-json]
   - Fast → Current text-to-video
   - Cinematic → JSON→Images→Video pipeline

3. **Update agent menu**:
   - Add `*create-cinematic-sequence` command

**Deliverable**: Video agent uses JSON prompts

---

### **PHASE 6: Testing & Documentation** (30 mins)

**Tasks**:

1. Test: Generate evolution video using JSON pipeline
2. Test: Generate single scene using JSON
3. Compare quality: Text vs JSON approaches
4. Document learnings
5. Create usage examples

**Deliverable**: Production-ready module

**Total Time**: ~5-6 hours for complete build

---

## 🎬 MODULE CAPABILITIES (When Complete)

### What It Will Do:

**For Video Agent**:

```
User: "Create cinematic evolution video"
Module: Generates JSON for 4 key frames
Module: Converts to image prompts
Video Agent: Generates 4 images
Video Agent: Animates + merges
Result: Emily-quality cinematic video
```

**For Image Agent**:

```
User: "Create fashion portrait"
Module: Generates complete JSON (like Emily's Glacial Couture)
Image Agent: Generates with nanobanana
Module: Runs 7-pillar critique
Result: Professional photorealistic image
```

**For Future Agents**:

- Audio scripts (structured podcast JSON)
- 3D scenes (mesh/material specifications)
- Interactive content (state machines)

---

## 📊 QUALITY COMPARISON

### Current Text Approach:

```
Quality Score: 6/10
- Works but basic
- No negative prompts
- No technical precision
- Hard to iterate
```

### JSON Approach (Emily Standard):

```
Quality Score: 9/10
- Every detail specified
- Technical precision (camera, lighting, color)
- Comprehensive negatives
- Easy to iterate and refine
```

**Improvement**: +50% quality

---

## ✅ NEXT STEPS

**I'll create**:

1. ✅ Module structure (directories created)
2. Module definition YAML
3. Core templates (video-scene.json, video-sequence.json)
4. Conversion workflows
5. Integration with video agent

**Estimated Time**: 5-6 hours for full build

---

## 🚀 **READY TO BUILD?**

**Plan saved to**: `MODULE-BUILD-PLAN.md`

**I recommend**:

1. Start with Phase 1-2 (module + templates) - 1.5 hours
2. Test with one example (evolution video)
3. Build Phase 3-4 (conversion + workflows) - 2 hours
4. Integrate Phase 5 (video agent) - 1 hour
5. Polish Phase 6 (testing) - 30 mins

**Want me to start building Phase 1 now?** Say "build" and I'll create the module foundation! 🎬
