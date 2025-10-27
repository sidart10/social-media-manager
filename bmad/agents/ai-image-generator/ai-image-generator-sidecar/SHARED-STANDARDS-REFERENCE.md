# Shared Quality Standards Reference

**For**: AI Image Generator Agent
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

**Use this for**: Evaluating generated images with consistent scoring methodology

---

### Negative Prompts Library

**Location**: `{project-root}/bmad/modules/json-prompt-generator/sidecar/negative-prompts-library.md`

**What it contains**:

- Categorized negative prompts:
  - Photorealistic content
  - Professional content/diagrams
  - Video/cinematic
  - Universal quality
- Use-case-specific negatives
- Best practices for negative prompt selection

**Use this for**: Selecting appropriate negative prompts for your content type

---

## 🔄 HOW TO USE SHARED STANDARDS

### In Your Workflows:

**Step 1 - Generation**:

1. Use your agent-specific templates (`templates/linkedin-carousel-ai-browsers.json`, etc.)
2. Select negatives from shared library based on content type
3. Generate image

**Step 2 - Quality Check**:

1. Load shared `emily-quality-standards.md`
2. Run 7-pillar evaluation
3. Calculate overall score
4. If score < 7: Refine and regenerate

**Step 3 - Documentation**:

1. Save metadata with 7-pillar scores
2. Document successful prompts
3. Update template library

---

## 📁 LOCAL vs SHARED RESOURCES

### Agent-Specific (KEEP HERE):

- `templates/` - Your pre-written carousel templates (working great!)
- `best-practices-framework.md` - Your detailed framework with examples
- `instructions.md` - Your operational guidelines
- `config.yaml` - Your settings

### Shared (USE FROM MODULE):

- Emily 7-pillar quality standards
- Negative prompts library
- (Future: Additional shared resources)

---

**This structure keeps your agent working perfectly while benefiting from shared quality standards!** ✅
