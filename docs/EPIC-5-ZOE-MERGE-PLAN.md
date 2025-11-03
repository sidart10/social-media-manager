# Epic 5: Zoe Agent Merge - Execution Plan

**Goal:** Consolidate AI Image Generator + AI Video Agent into unified "Zoe" agent
**Rationale:** Simpler 3-agent model (Jarvis writes, Zoe creates visuals, Zoro publishes)
**Estimated:** 2-3 hours
**Date:** 2025-11-05 (Continuing legendary session)

---

## 🎯 WHY MERGE?

**Current State (4 agents):**

- Jarvis (Content Intelligence)
- AI Image Generator (images only)
- AI Video Agent (videos only)
- Social Posting Agent (publishing)

**Problem:**

- Two separate visual agents is confusing
- Both invoke similar generative AI workflows
- User has to remember which agent for images vs videos
- More coordination overhead

**After Merge (3 agents):**

- Jarvis (Content Intelligence)
- **Zoe (All Visuals - images + videos)** ✨
- Zoro (Publishing)

**Benefits:**

- ✅ Simpler mental model
- ✅ One handoff from Jarvis (to Zoe, not "to image generator or video agent")
- ✅ Unified visual production specialist
- ✅ Skills naturally group together (all generative AI)

---

## 📋 MERGE EXECUTION PLAN

### **Phase 1: Create Zoe Folder Structure** (30 min)

**Actions:**

1. Create `bmad/agents/zoe/` folder
2. Create `bmad/agents/zoe/zoe-sidecar/` folder
3. Create `bmad/agents/zoe/zoe-sidecar/workflows/` folder
4. Create `.claude/commands/zoe/` folder
5. Create `.claude/skills/zoe/` folder

**Result:** Empty Zoe structure ready for consolidation

---

### **Phase 2: Merge Workflows** (45 min)

**Copy from AI Image Generator:**

- `generate-single.yaml` → `zoe-sidecar/workflows/create-single-image/`
- `generate-carousel.yaml` → `zoe-sidecar/workflows/create-carousel/`
- `generate-edit-image.yaml` → `zoe-sidecar/workflows/edit-image/`
- (Any other image workflows)

**Copy from AI Video Agent:**

- `generate-scene.yaml` + instructions → `zoe-sidecar/workflows/create-scene/`
- `generate-talking-head.yaml` + instructions → `zoe-sidecar/workflows/create-talking-head/`
- `generate-cinematic-sequence.yaml` → `zoe-sidecar/workflows/create-cinematic-sequence/`
- `setup-avatars.yaml` → `zoe-sidecar/workflows/setup-avatars/`

**Update References:**

- Change `{agent-folder}` references to point to zoe/
- Update config paths
- Update output paths

**Result:** All workflows in one place (zoe-sidecar/workflows/)

---

### **Phase 3: Consolidate Skills** (30 min)

**Merge Skill Folders:**

**From `.claude/skills/ai-image-generator/`:**

- create-image/
- edit-image/
- blend-images/
- platform-specs/
- linkedin-design/
- youtube-thumbnail-design/
- mcp-tool-selection/
- generating-sid-images/

**From `.claude/skills/ai-video-agent/`:**

- veotools-mastery/ (will rename to video-generation-mastery)

**To `.claude/skills/zoe/`:**

```
.claude/skills/zoe/
├── create-image/
├── edit-image/
├── blend-images/
├── video-generation/ (renamed from veotools-mastery, updated for fal-video)
├── platform-specs/
├── linkedin-design/
├── youtube-thumbnail-design/
├── mcp-tool-selection/
└── generating-sid-images/
```

**Update Skill Descriptions:**

- All mention "Zoe" or "visual production"
- video-generation skill updated to reference fal-video execute_custom_model

**Result:** 9 Zoe skills in one organized folder

---

### **Phase 4: Create Unified zoe.md Agent** (45 min)

**File:** `.claude/commands/zoe/zoe.md`

**Combine Elements:**

- Persona: "Visual Production Specialist - All Formats (Images + Videos)"
- Identity: "I create professional images and videos using Emily JSON methodology for images (7-pillar quality) and fal-video for videos (Veo 3, Luma Ray 2, Kling). I'm obsessed with platform specs, design systems, and quality. Whether you need a LinkedIn carousel, YouTube thumbnail, or animated diagram - I deliver publication-ready visuals."
- Menu: Combined menu from both agents
  1. create-single-image
  2. create-carousel
  3. edit-image
  4. blend-images
  5. create-scene
  6. create-talking-head
  7. create-cinematic-sequence
  8. setup-avatars
  9. help
  10. exit

**Activation Steps:**

- Load config
- Load Zoe notion-helper (already created!)
- Check Notion for Status=Editing without media
- Display suggestions
- Show unified menu

**Result:** Single Zoe agent with all visual capabilities

---

### **Phase 5: Update Registries & Documentation** (30 min)

**Update workflow-registry.yaml:**

- Change agent_owner from "ai-image-generator" and "ai-video-agent" to "zoe"
- Update file paths to bmad/agents/zoe/zoe-sidecar/workflows/

**Update tool-registry.yaml:**

- Change used_by_workflows references to zoe workflows

**Update Architecture.md:**

- Update agent roster section (3 agents: Jarvis, Zoe, Zoro)
- Update workflow mapping section
- Update repository structure (show zoe/ folder)

**Update PRD epic-list.md:**

- Epic 5 status: 60% → 95%

**Result:** All documentation reflects 3-agent model

---

### **Phase 6: Cleanup (Optional - 15 min)**

**Rename/Archive Old Folders:**

- Keep `bmad/agents/ai-image-generator/` and `ai-video-agent/` for reference
- Or: Add README.md saying "DEPRECATED: Merged into zoe/"
- Update `.gitignore` or move to archive

**Result:** Clean structure, no confusion

---

## 🎯 MERGE VALIDATION CHECKLIST

**After merge, verify:**

- [ ] `/zoe` command works (agent activates)
- [ ] Zoe displays unified menu (8 workflows)
- [ ] Zoe notion-helper suggests workflows for Editing content
- [ ] create-single-image workflow still works
- [ ] create-scene workflow still works
- [ ] All skills still discoverable by Claude
- [ ] Cloudinary integration still works
- [ ] Notion updates still work

**If all pass:** Epic 5 merge COMPLETE!

---

## 📊 EPIC 5 PROGRESS PROJECTION

**Before Merge:** 60% Complete
**After Merge:** 95% Complete

**What's Done After Merge:**

- ✅ Story 3.1-3.6: All visual workflows operational and consolidated
- ✅ Agent unification complete
- ✅ Skills consolidated
- ✅ Cloudinary integration throughout
- ✅ Notion integration working

**Remaining (5%):**

- ⏳ Test merged agent (1 hour)
- ⏳ Handle any issues from merge (30 min)
- ⏳ Documentation (30 min)

**Total Time:**

- Merge: 2.5-3 hours
- Testing: 1-2 hours
- **Epic 5: 90-95% complete after merge!**

---

## 💎 WHY DO THIS NOW

**Strategic Timing:**

- ✅ Epic 2 complete (Notion coordination ready)
- ✅ Epic 4 workflows created (content generation working)
- ✅ Cloudinary integration proven (works in create-single-image)
- ✅ Clear 3-agent model designed in PRD
- ✅ Momentum is HIGH

**Benefits:**

- Cleaner architecture for remaining work
- Easier to explain system (3 agents not 4)
- Validates PRD vision (Jarvis, Zoe, Zoro)
- Sets up for Epic 7 testing (clean agent model)

---

🧙 **SHALL THE BUILDER BEGIN THE ZOE MERGE?**

**Phase 1: Create folder structure (30 min)**
**Phase 2: Merge workflows (45 min)**
**Phase 3: Consolidate skills (30 min)**
**Phase 4: Create zoe.md (45 min)**
**Phase 5: Update docs (30 min)**

**Total: 2.5-3 hours → Epic 5 at 95%!**

**Your command to proceed, Sid?** 🧙⚡
