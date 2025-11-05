# Zoe Agent Ultra-Analysis - Complete Report

**Date:** 2025-11-03
**Files Analyzed:** 4 (platform-specs.yaml, config.yaml, zoe.agent.yaml, zoe.md)
**Comparison:** Jarvis (proven) vs Zoe (needs alignment)
**Status:** ⚠️ 8 critical issues, 4 decisions needed

---

## Executive Summary

**Zoe has DIFFERENT architectural patterns from Jarvis:**

- ✅ Some patterns are BETTER (config-based skills_folder)
- ❌ Some patterns are BROKEN (undefined config refs, hardcoded user)
- ⚠️ Some patterns are INCONSISTENT (explicit paths vs runtime variables)

**Critical Issues: 8**

1. Workflow references 4 non-existent config fields (bloat/broken)
2. config.yaml hardcodes user_name and communication_language (should pull from core)
3. Missing zoe-sidecar/instructions.md file (Jarvis has 540-line equivalent)
4. config_source uses explicit path (Jarvis uses {agent-folder})
5. Missing team awareness step in activation
6. Missing action handler in menu-handlers
7. zoe.md activation uses explicit path (not {agent-folder})
8. No skills loading critical instruction

---

## Detailed Findings

### ✅ What Zoe Does RIGHT

**1. Output Management** - BETTER than Jarvis!

```yaml
# Zoe config.yaml defines structure clearly:
outputs_base: '{project-root}/outputs/projects'
media_folder: '04-media'
images_subfolder: 'images'
videos_subfolder: 'videos'
```

- More explicit about media structure
- Clear subfolder organization
- Better documentation

**2. Tool Preferences** - Smart defaults

```yaml
image_tool_default: nanobanana # Fast, cheap
image_tool_professional: gpt-image-1 # Quality
video_tool_primary: fal-video
video_tool_avatars: heygen
```

- Documents tool selection strategy
- Cost-conscious defaults
- Specialized tool purposes

**3. Quality Thresholds** - Explicit standards

```yaml
min_image_quality_7_pillar: 7.0
min_video_quality: 7.5
require_cloudinary_for_publishing: true
```

- Clear quality gates
- Publishing requirements documented

**4. platform-specs.yaml** - Comprehensive

- 7 platforms defined with complete specs
- Aspect ratios, dimensions, durations
- Template recommendations
- Better than Jarvis (who has this in config inline)

**5. Skills Organization** - Well-structured

```yaml
agent:
  skills:
    image_generation: [3 skills]
    code_art: [2 skills]
    video: [1 skill]
    utility: [5 skills]
```

- Categorized by production method
- Clear purpose for each
- Total: 13 skills (more than Jarvis's 6)

---

### ❌ What Zoe Does WRONG

**1. Undefined Config References (CRITICAL)**

**In workflow.yaml:**

```yaml
sidecar_config: '{config_source}:sidecar_config' # ← Field doesn't exist!
capabilities_doc: '{config_source}:capabilities_doc' # ← Field doesn't exist!
best_practices_doc: '{config_source}:best_practices_doc' # ← Field doesn't exist!
template_folder: '{config_source}:templates_folder' # ← Field doesn't exist!
```

**In config.yaml:**

```yaml
# These fields are NOT defined!
```

**Impact:**

- Variables won't resolve
- Will cause errors if instructions reference them
- Pure bloat (not used in simplified instructions)

**Fix:** DELETE these 4 lines from workflow.yaml

---

**2. Hardcoded User Configuration (WRONG)**

**In config.yaml:**

```yaml
user_name: sid # ❌ Should pull from bmad/core/config.yaml
communication_language: english # ❌ Should pull from bmad/core/config.yaml
```

**Jarvis approach:**

```yaml
# NOT defined in jarvis-sidecar/config.yaml
# Pulled from bmad/core/config.yaml at runtime
```

**Why wrong:**

- Not multi-user friendly
- Violates single source of truth
- Inconsistent with Jarvis

**Fix:** DELETE these 2 lines from config.yaml

**Note:** Workflows pull them via `{config_source}:user_name` which will cascade to core config

---

**3. Missing instructions.md (CRITICAL)**

**Jarvis has:**

- `jarvis-sidecar/instructions.md` (540 lines)
- Contains: Skills-first model, team protocols, quality standards, cost tracking

**Zoe has:**

- ❌ Nothing!
- zoe.md step 4 says: "if exists" (suggests optional)
- But this is critical documentation

**What should be in Zoe instructions.md:**

```markdown
# Zoe - Private Instructions

## Core Directives

- Maintain character: Visual Production Specialist
- Domain: Images + Videos
- Quality: 7-pillar framework mandatory
- Integration: Cloudinary → Notion → Zoro handoff

## Skills-First Execution Model

Location: {project-root}/.claude/skills/zoe/

Image Skills:

- universal-image-generation: Load when creating ANY image
- edit-image: Load when editing images
- blend-images: Load when compositing

Video Skills:

- video-generation: Load for ALL video (fal-video, HeyGen)

## Team Coordination

### Receives From Jarvis:

Handoff package: jarvis-to-zoe.json

- Visual requirements
- Platform specs
- Creative direction

### Sends To Zoro:

Handoff package: zoe-to-zoro.json

- Completed visuals
- Cloudinary URLs
- Quality scores

## Output Standards

- Images: 04-media/images/ (platform-agnostic naming)
- Videos: 04-media/videos/ (platform-agnostic naming)
- Metadata: Track usage across platforms

## Quality Standards

- Images: 7-pillar ≥7.0/10
- Videos: Quality ≥7.5/10
- Cloudinary required for publishing

## Cost Tracking

- nanobanana: $0.039/image
- gpt-image-1: $0.04-0.10/image
- fal-video: varies by model
- Monthly budget: $50
```

**Estimated size:** 300-400 lines

---

**4. Activation Pattern Inconsistency**

**Jarvis activation:**

```xml
<step n="2">Load {agent-folder}/config.yaml</step>
```

**Zoe activation:**

```xml
<step n="2">Load {project-root}/bmad/agents/zoe/config.yaml</step>
```

**Problem:** Different variable usage in activation

- Makes workflows inconsistent
- Jarvis workflows use {agent-folder}
- Zoe workflow uses explicit (because activation does)

**Fix:** Change Zoe activation to use {agent-folder}

---

### ⚠️ What's DIFFERENT (Need Decisions)

**1. skills_folder Definition Location**

**Jarvis:** Defined in each workflow

```yaml
# In workflow.yaml:
skills_folder: '{project-root}/.claude/skills/jarvis'
```

**Zoe:** Defined in config, pulled by workflow

```yaml
# In config.yaml:
skills_folder: "{project-root}/.claude/skills/zoe"

# In workflow.yaml:
skills_folder: "{config_source}:skills_folder"
```

**Analysis:**

- Zoe approach is MORE DRY (define once)
- Jarvis approach more self-contained
- Both work, just different

**Question:** Which pattern to standardize on?

**My recommendation:** Keep Zoe pattern, update Jarvis to match

- Define once in agent config
- Pull in all workflows
- More maintainable

---

**2. Menu Organization**

**Jarvis:** No HTML comments

```xml
<menu>
  <item cmd="*help">...</item>
  <item cmd="*research-topic">...</item>
</menu>
```

**Zoe:** HTML comments for categories

```xml
<menu>
  <item cmd="*help">...</item>

  <!-- Image Workflows -->
  <item cmd="*create-images">...</item>

  <!-- Video Workflows -->
  <item cmd="*edit-video">...</item>
</menu>
```

**Analysis:**

- Zoe more organized (13 items vs Jarvis 9)
- HTML comments aid readability
- Doesn't affect functionality

**Status:** ✅ **KEEP** - This is fine, aids organization

---

**3. Config Organization Depth**

**Jarvis config:** Minimal

```yaml
# Just platform specs inline
platforms:
  youtube: { ... }
  linkedin: { ... }
```

**Zoe config:** Separate file + config vars

```yaml
# platform-specs.yaml (separate file, 144 lines)
# config.yaml references but doesn't duplicate
```

**Analysis:**

- Zoe more modular (specs in separate file)
- Jarvis more self-contained (all in one file)
- Both valid approaches

**Status:** ✅ **KEEP** - Zoe pattern better for large specs

---

## Recommended Fix Order

### Step 1: Fix Broken References (5 min)

```yaml
# Edit: create-images/workflow.yaml
# DELETE these lines (not used, not defined):
sidecar_config: '{config_source}:sidecar_config'
capabilities_doc: '{config_source}:capabilities_doc'
best_practices_doc: '{config_source}:best_practices_doc'
template_folder: '{config_source}:templates_folder'
```

### Step 2: Fix Hardcoded Config (2 min)

```yaml
# Edit: config.yaml
# DELETE these lines (pull from core):
user_name: sid
communication_language: english
```

### Step 3: Standardize config_source (5 min)

```yaml
# Edit: create-images/workflow.yaml
# Change:
config_source: "{project-root}/bmad/agents/zoe/config.yaml"
# To:
config_source: "{agent-folder}/config.yaml"

# Edit: zoe.md activation step 2
# Change:
Load {project-root}/bmad/agents/zoe/config.yaml
# To:
Load {agent-folder}/config.yaml
```

### Step 4: Add Team Awareness (10 min)

```xml
# Edit: zoe.md after step 6
# Add:
<step n="6.5">TEAM AWARENESS - Know your collaborators:
    - Jarvis (🎯) - Sends visual requirements (jarvis-to-zoe.json)
    - Zoro (📤) - Receives completed visuals (zoe-to-zoro.json)
    - See instructions.md for handoff protocols
</step>
```

### Step 5: Add Action Handler (2 min)

```xml
# Edit: zoe.md menu-handlers
# Add after workflow handler:
<handler type="action">
  When menu item has: action="#id" → Find prompt with id="id"
  When menu item has: action="text" → Execute text directly
</handler>
```

### Step 6: Create instructions.md (30 min)

- Create: `bmad/agents/zoe/zoe-sidecar/instructions.md`
- Template: Use Jarvis instructions.md as base
- Adapt: Visual production focus, team perspective, skills inventory
- Include: Handoff protocols, quality standards, cost tracking

---

## Testing After Fixes

**Verify:**

1. `/zoe` loads successfully
2. Config variables resolve (user_name, communication_language from core)
3. skills_folder variable works
4. create-images workflow executes
5. universal-image-generation skill loads
6. No "variable not found" errors

---

## Summary: What to Fix

**MUST FIX (Broken):**

1. ❌ Remove 4 undefined config field references from workflow.yaml
2. ❌ Remove hardcoded user_name/communication_language from config.yaml
3. ❌ Change config_source to {agent-folder} (2 files: workflow + activation)

**SHOULD FIX (Missing):** 4. ❌ Create zoe-sidecar/instructions.md (critical documentation) 5. ❌ Add team awareness step to activation 6. ❌ Add action handler to menu-handlers

**OPTIONAL (Improvements):** 7. ⚠️ Consider updating Jarvis to use Zoe's config-based skills_folder pattern 8. ✅ Keep HTML comments in menu (better organization) 9. ✅ Keep separate platform-specs.yaml (good modularity)

---

**Files ready:** `docs/ZOE-ALIGNMENT-ISSUES.md`

**Ready to apply fixes? Answer my 3 questions from the report first, then I'll execute all changes.**
