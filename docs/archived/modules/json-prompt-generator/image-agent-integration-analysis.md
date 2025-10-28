# AI Image Generator + JSON Module Integration Analysis

**Date**: October 25, 2025
**Analysis**: Should we integrate json-prompt-generator with image agent?

---

## 🔍 KEY FINDING: IMAGE AGENT ALREADY USES JSON!

### AI Image Generator Current State:

**✅ ALREADY HAS**:

- `ai-image-generator-sidecar/templates/` folder with JSON templates
- Complete JSON structure (ready-to-use, no placeholders)
- Workflows that LOAD and USE templates
- best-practices-framework.md (636 lines) - Emily's 7-pillar system
- instructions.md (710 lines) - Comprehensive guidelines
- Template-first approach built-in

**Example Template** (`linkedin-carousel-ai-browsers.json`):

```json
{
  "prompt_metadata": {...},
  "platform_specs": {...},
  "design_system": {
    "colors": {...},
    "typography": {...},
    "layout": {...}
  },
  "slides": [
    {
      "slide_number": 1,
      "prompt": "Professional tech carousel slide, 1920x1080px...",
      "negative_prompt": [...]
    }
  ],
  "global_negative_prompt": [14 items]
}
```

**Workflow Pattern**:

```markdown
Step 1: User chooses existing template OR create new
Step 2: Load template JSON
Step 3: Generate each slide from template prompts
Step 4: Save with metadata
Step 5: Run 7-pillar quality check
```

---

## 📊 COMPARISON: Image Agent vs JSON Module

| Aspect                   | AI Image Generator                    | json-prompt-generator Module      |
| ------------------------ | ------------------------------------- | --------------------------------- |
| **Has JSON Templates**   | ✅ Yes (2 templates)                  | ✅ Yes (2 templates)              |
| **Template Type**        | COMPLETE (ready to use)               | FLEXIBLE (placeholders)           |
| **Use Case**             | Platform-specific (LinkedIn carousel) | Generic (any image/video)         |
| **Structure**            | Slides array with full prompts        | Scene array with CHANGE_ME fields |
| **Emily Standards**      | ✅ Yes (best-practices-framework.md)  | ✅ Yes (based on Emily's)         |
| **7-Pillar System**      | ✅ Yes (built-in)                     | ✅ Yes (planned)                  |
| **Negative Prompts**     | ✅ Yes (global + per-slide)           | ✅ Yes (per-scene)                |
| **JSON→Text Conversion** | ❌ No (uses JSON prompts directly)    | ✅ Yes (conversion workflow)      |
| **Working Workflows**    | ✅ Yes (production ready)             | ⚠️ Partial (video only so far)    |
| **Location**             | Agent-specific (sidecar/)             | Shared (modules/)                 |

---

## 🎯 KEY DIFFERENCES

### Image Agent Templates (COMPLETE):

```json
{
  "slide_number": 1,
  "prompt": "Professional tech carousel slide, 1920x1080px 16:9 format, dark background (#0B0B0B), Inter font 56pt weight 300..."
  // FULL PROMPT - ready to use, just load and generate
}
```

**Approach**: Pre-written complete prompts, load and use directly

### JSON Module Templates (FLEXIBLE):

```json
{
  "scene_name": "CHANGE_ME Stone Age",
  "environment": "CHANGE_ME Dark cave interior",
  "camera": { "lens": "CHANGE_ME 50mm", "aperture_f": 2.8 }
  // PLACEHOLDER STRUCTURE - populate before use
}
```

**Approach**: Generic structure, agent populates based on user input

---

## 💡 INTEGRATION RECOMMENDATION

### **DO NOT FULLY INTEGRATE** - Here's Why:

**1. Image Agent is Already Working Well**

- ✅ Templates work great for its use case
- ✅ Carousel generation is production-ready
- ✅ Has Emily standards built-in
- ✅ No issues to solve

**2. Different Use Cases**

- **Image Agent**: Platform-specific content (LinkedIn carousels, Instagram posts)
- **JSON Module**: Generic flexible templates for ANY content (images, videos, future modalities)

**3. Different Template Philosophy**

- **Image Agent**: Pre-written expert prompts (copy and use)
- **JSON Module**: Flexible structures (populate dynamically)

---

## ✅ RECOMMENDED APPROACH: **LIGHT INTEGRATION**

### Keep Both Systems, Share Standards:

**Shared** (in json-prompt-generator module):

```
bmad/modules/json-prompt-generator/
└── sidecar/
    ├── emily-quality-standards.md (7-pillar system) ⭐ SHARED
    ├── negative-prompts-library.md (categorized negatives) ⭐ SHARED
    └── conversion-rules.md (for video only)
```

**Image Agent Keeps** (agent-specific):

```
ai-image-generator/ai-image-generator-sidecar/
├── best-practices-framework.md (Emily standards - STAYS)
├── templates/ (LinkedIn carousel, etc. - STAYS)
└── instructions.md (complete guidelines - STAYS)
```

**JSON Module Keeps** (for video + future):

```
json-prompt-generator/
└── templates/
    ├── video-scene.json (for videos)
    ├── video-sequence.json (for videos)
    └── image-photorealistic.json (FUTURE - if needed)
```

---

## 🔄 WHAT TO SHARE vs KEEP SEPARATE

### ✅ SHARE (Move to JSON Module):

**1. Emily Quality Standards** (7-Pillar System)

- Currently in: `ai-image-generator/sidecar/best-practices-framework.md`
- Move to: `json-prompt-generator/sidecar/emily-quality-standards.md`
- Why: Both agents use same quality framework
- Benefit: Single source of truth

**2. Negative Prompts Library**

- Currently: Scattered in templates and frameworks
- Create: `json-prompt-generator/sidecar/negative-prompts-library.md`
- Organize by category:
  - Photorealistic negatives
  - Professional content negatives
  - Video negatives
  - Technical quality negatives
- Why: Both agents need comprehensive negatives
- Benefit: Reusable, organized, comprehensive

---

### ❌ KEEP SEPARATE (Don't Move):

**1. Image Agent Templates**

- Keep in: `ai-image-generator/sidecar/templates/`
- Why: Platform-specific, complete prompts, agent-optimized
- Already working perfectly

**2. Image Agent Instructions**

- Keep in: `ai-image-generator/sidecar/instructions.md` (710 lines)
- Why: Agent-specific operational details
- MCP tool usage patterns specific to images

**3. Video Templates**

- Keep in: `json-prompt-generator/templates/`
- Why: Video-specific, flexible structures
- Different from image templates

---

## 🎬 PRACTICAL INTEGRATION STEPS

### Step 1: Create Shared Standards (30 mins)

**Create**:

1. `json-prompt-generator/sidecar/emily-quality-standards.md`
   - Port 7-pillar system from image agent
   - Make generic (not image-specific)
   - Both agents reference this

2. `json-prompt-generator/sidecar/negative-prompts-library.md`
   - Categorize all negatives from both agents
   - Photorealistic section
   - Professional content section
   - Video section
   - Technical quality section

**Update**:

- Image agent: Reference shared standards
- Video agent: Reference shared standards

---

### Step 2: Cross-Reference (15 mins)

**In Image Agent**:

```markdown
For quality standards, see: {project-root}/bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md
For negative prompts library, see: {project-root}/bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md
```

**In Video Agent**:

```markdown
For quality standards, see: {project-root}/bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md
For negative prompts library, see: {project-root}/bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md
```

---

### Step 3: Optional - Create Image Photorealistic Template (Future)

**IF** image agent needs a flexible template (like video has):

- Create `json-prompt-generator/templates/image-photorealistic.json`
- Based on Emily's Glacial Couture structure
- With CHANGE_ME placeholders
- For dynamic population

**But NOT urgent** - current image templates work fine!

---

## ✅ FINAL RECOMMENDATION

### **LIGHT INTEGRATION ONLY**:

**DO**:

- ✅ Share Emily quality standards (create shared doc)
- ✅ Share negative prompts library (organize and centralize)
- ✅ Cross-reference between agents

**DON'T**:

- ❌ Move image agent templates to JSON module (they're working!)
- ❌ Force image agent to use JSON module workflows (no benefit)
- ❌ Merge incompatible template philosophies (complete vs flexible)

**WHY**:

- Image agent is production-ready with its current system
- JSON module serves video agent well
- Shared standards benefit both
- Keep what works, share what's universal

---

## 📊 INTEGRATION VALUE ANALYSIS

**If We Fully Integrate**:

- Benefit: Centralized templates
- Cost: Disrupting working image agent
- Risk: Breaking production workflows
- Value: **LOW** (not worth it)

**If We Share Standards Only**:

- Benefit: Unified quality framework
- Cost: Create 2 shared docs (30 mins)
- Risk: Minimal (just references)
- Value: **HIGH** (consistent quality across agents)

**Recommendation**: **Share standards, keep templates separate**

---

## 🎬 IMMEDIATE ACTION

**I recommend**:

1. Create `emily-quality-standards.md` in JSON module (shared)
2. Create `negative-prompts-library.md` in JSON module (shared)
3. Update both agents to reference shared standards
4. Keep current templates where they are (both working!)

**Total Time**: 45 minutes
**Benefit**: Consistent quality standards, no disruption
**Risk**: None

**Should I execute this light integration?** 🚀
