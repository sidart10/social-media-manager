# Shared Quality Standards Reference

**For**: AI Video Agent
**Date**: October 25, 2025

---

## 📚 SHARED BMAD STANDARDS

This agent uses **shared quality standards** maintained in the `json-prompt-generator` module.

### Emily Quality Standards (7-Pillar System)

**Location**: `{project-root}/bmad/modules/json-prompt-generator/sidecar/emily-quality-standards.md`

**What it contains**:

- 7-pillar benchmark system (Clarity, Technical Quality, Composition, Color, Typography, Professionalism, Accuracy)
- Scoring guide (1-10 scale for each pillar)
- Overall quality calculation
- Iterative refinement workflow
- Quality gates for different use cases

**Use this for**: Evaluating generated videos and key frame images with consistent scoring

---

### Negative Prompts Library

**Location**: `{project-root}/bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md`

**What it contains**:

- Categorized negative prompts:
  - Photorealistic content
  - Professional content/diagrams
  - **Video/cinematic** (your primary category)
  - Universal quality
- Use-case-specific negatives
- Examples of combined negatives

**Use this for**: Selecting appropriate negative prompts for video scenes

---

## 🔄 HOW TO USE SHARED STANDARDS

### In Your Workflows:

**For Text-to-Video (Fast)**:

1. Use current prompting (fast path)
2. Select negatives from shared library (video category)
3. Generate with Veo3/Sora2

**For JSON-Based Generation (Cinematic)**:

1. Load `json-prompt-generator/templates/video-scene.json` or `video-sequence.json`
2. Populate with user inputs
3. Use negatives from shared library
4. Convert JSON → text → generate images
5. Animate and merge

**Quality Evaluation**:

1. Load shared `emily-quality-standards.md`
2. Run 7-pillar evaluation on generated images/videos
3. Calculate overall score
4. If score < 7: Refine and regenerate

---

## 📁 LOCAL vs SHARED RESOURCES

### Agent-Specific (KEEP HERE):

- `config.yaml` - Your provider routing, avatar IDs
- `instructions.md` - Your MCP tool usage patterns
- `platform-specs.yaml` - Platform requirements
- `video-prompting-templates.yaml` - Virtual Film Producer vocabulary

### Shared (USE FROM MODULE):

- `json-prompt-generator/templates/` - Video scene/sequence JSON templates
- `json-prompt-generator/sidecar/emily-quality-standards.md` - 7-pillar system
- `json-prompt-generator/sidecar/negative-prompts-library.md` - Categorized negatives
- `json-prompt-generator/sidecar/conversion-rules.md` - JSON→Text conversion

---

**This structure gives you access to shared quality standards while maintaining your video-specific workflows!** ✅
