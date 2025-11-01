# ⚠️ DEPRECATED: AI Video Agent Skills

**Status:** DEPRECATED as of 2025-11-05
**Replaced By:** `.claude/skills/zoe/` (consolidated)
**Epic:** Epic 5 - Visual Content Production (Zoe Agent Merge)

---

## What Happened

The veotools-mastery skill from this folder has been **copied and evolved into `.claude/skills/zoe/video-generation/`** as part of the Zoe agent unification.

**What was here:**
- veotools-mastery/ → Now `.claude/skills/zoe/video-generation/` (renamed + expanded for fal-video)

**Evolution:**
- **Old:** veotools-mastery (Veo 2.0/3.0/3.1 only)
- **New:** video-generation (fal-video execute_custom_model with 22+ models: Veo 3, Luma Ray 2, Kling, Pixverse, Imagen 4, FLUX, etc.)

**Skill is OPERATIONAL and IMPROVED from zoe/ folder!**

---

## Can This Be Deleted?

**YES - After Epic 5 Testing**

**When:** After Zoe agent tested and video-generation skill confirmed discoverable (1-2 days)

**How to delete:**
```bash
rm -rf .claude/skills/DEPRECATED-ai-video-agent
```

---

**See:** `.claude/skills/zoe/video-generation/` for the evolved active skill
