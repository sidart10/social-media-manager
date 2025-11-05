# Zoe Agent Alignment Issues - Ultra-Analysis

**Date:** 2025-11-03
**Status:** ⚠️ CRITICAL INCONSISTENCIES FOUND
**Scope:** All Zoe configuration files

---

## Executive Summary

**Finding:** Zoe uses **DIFFERENT pattern** from Jarvis (explicit paths vs runtime variables)

**Critical Issues Found: 8**

1. config_source uses explicit path (not {agent-folder})
2. Missing sidecar instructions.md file
3. config.yaml has hardcoded user_name (not pulled from core)
4. Inconsistent with Jarvis runtime variable pattern
5. Menu items use workflow paths (not validated)
6. Skills not explicitly loaded in workflows
7. platform-specs.yaml location unclear (sidecar vs config)
8. Missing memories.md or equivalent

---

## Issue 1: Config Source Pattern Inconsistency

### Jarvis Pattern (Runtime Variable):

```yaml
# All 7 Jarvis workflows:
config_source: '{agent-folder}/config.yaml'
```

### Zoe Pattern (Explicit Path):

```yaml
# create-images workflow:
config_source: '{project-root}/bmad/agents/zoe/config.yaml'
```

**Problem:**

- **Inconsistent** across agents (Jarvis vs Zoe different)
- Zoe more explicit (less portable)
- Jarvis more portable (runtime context)

**Decision Needed:**

- **Option A:** Standardize on `{agent-folder}` (match Jarvis)
- **Option B:** Standardize on explicit paths (match Zoe)
- **Option C:** Leave different (document as agent-specific)

**My Recommendation: Option A** - Use `{agent-folder}` everywhere

- More portable
- Consistent with activation patterns
- All 7 Jarvis workflows use it
- Easier to move workflows between agents

---

## Issue 2: Missing Sidecar Instructions

### Jarvis Has:

```
bmad/agents/content-intelligence/
├── jarvis-sidecar/
│   ├── instructions.md ✅ (540 lines of agent-specific directives)
│   ├── config.yaml
│   ├── memories.md ✅ (voice profile, API usage)
│   └── workflows/
```

### Zoe Has:

```
bmad/agents/zoe/
├── zoe-sidecar/
│   ├── instructions.md ❌ MISSING!
│   ├── notion-helper.md ✅
│   ├── platform-specs.yaml ✅
│   └── workflows/
```

**Problem:**

- No zoe-sidecar/instructions.md file
- zoe.md step 4 references it: "Load COMPLETE file bmad/agents/zoe/zoe-sidecar/instructions.md if exists"
- "if exists" suggests optional, but Jarvis treats it as mandatory

**Impact:**

- No private agent directives
- No skills-first execution model documented
- No team coordination protocols
- No quality standards reference

**Recommendation:**
Create `bmad/agents/zoe/zoe-sidecar/instructions.md` similar to Jarvis

---

## Issue 3: Hardcoded User Configuration

### Jarvis config.yaml:

```yaml
# NO hardcoded user_name!
# Pulled from bmad/core/config.yaml
```

### Zoe config.yaml:

```yaml
user_name: sid # ❌ HARDCODED
communication_language: english # ❌ HARDCODED
```

**Problem:**

- Config should pull from `{project-root}/bmad/core/config.yaml`
- Or workflow should pull from config_source
- Hardcoding violates BMAD v6 pattern

**Jarvis Approach:**

```yaml
# In jarvis-sidecar/config.yaml:
# These are NOT defined at all
# They're pulled from bmad/core/config.yaml at runtime
```

**Zoe Should Be:**

```yaml
# Either:
# 1. Don't define (pull from core at runtime)
# OR
# 2. Reference core:
user_name: '{core_config}:user_name'
communication_language: '{core_config}:communication_language'
```

**Recommendation:**
Remove hardcoded values, document that they pull from core config

---

## Issue 4: Config.yaml Variable Structure

### What Zoe config.yaml defines:

**Direct values** (should these be in core?):

```yaml
user_name: sid
communication_language: english
output_folder: '{project-root}/outputs'
```

**Agent-specific paths** (correct):

```yaml
agent_folder: '{project-root}/bmad/agents/zoe'
sidecar_folder: '{agent_folder}/zoe-sidecar'
workflows_folder: '{sidecar_folder}/workflows'
skills_folder: '{project-root}/.claude/skills/zoe'
```

**Outputs structure** (correct):

```yaml
outputs_base: '{project-root}/outputs/projects'
media_folder: '04-media'
images_subfolder: 'images'
videos_subfolder: 'videos'
```

**Tool preferences** (agent-specific, correct):

```yaml
image_tool_default: nanobanana
image_tool_professional: gpt-image-1
video_tool_primary: fal-video
video_tool_avatars: heygen
```

**Analysis:**

- ✅ Agent-specific vars are good
- ❌ user_name, communication_language shouldn't be here
- ⚠️ output_folder points to outputs/ (correct) but doesn't match Jarvis pattern

---

## Issue 5: Agent Activation Pattern Differences

### Jarvis Activation (zoe.md lines 10-16):

```xml
<step n="2">Load {project-root}/bmad/agents/zoe/config.yaml</step>
```

**Uses explicit path!**

### Jarvis Activation (jarvis.md lines 12-16):

```xml
<step n="2">Load {agent-folder}/config.yaml</step>
```

**Uses runtime variable!**

**Finding:** Even WITHIN the same project, activation patterns differ!

- Jarvis uses `{agent-folder}` in activation
- Zoe uses explicit path in activation

**This explains workflow inconsistency:**

- Jarvis workflows follow Jarvis activation pattern `({agent-folder})`
- Zoe workflows follow Zoe activation pattern (explicit path)

**Recommendation:**
Standardize activation pattern across ALL agents to use `{agent-folder}`

---

## Issue 6: Skills Awareness Step Differences

### Jarvis (jarvis.md step 10):

```xml
<step n="10">SKILLS AWARENESS - Know your capabilities:
    - You have access to 6 specialized skills in {project-root}/.claude/skills/jarvis/
    - Skills are invoked automatically by workflows OR manually when needed
    - CRITICAL: When workflows reference skills, invoke them directly
```

### Zoe (zoe.md step 4):

```xml
<step n="4">SKILLS AWARENESS - You have 13 specialized skills organized by production method:
    - AI-Generated Images (3): universal-image-generation (27 style guides), edit-image, blend-images
    - Code-Generated Art (2): canvas-design, algorithmic-art
    - Video Production (1): video-generation
    - All skills in {project-root}/.claude/skills/zoe/
```

**Differences:**

- ✅ Both document skills location
- ✅ Both list available skills
- ❌ Jarvis mentions "CRITICAL: When workflows reference skills, invoke them directly"
- ❌ Zoe doesn't have this critical instruction

**Impact:**

- Zoe workflows might not know to explicitly load skills
- Could lead to autonomous discovery pattern (which we just eliminated)

**Recommendation:**
Add Jarvis-style critical instruction to Zoe activation

---

## Issue 7: Output Management Instructions

### Jarvis (step 9):

```xml
<step n="9">MANDATORY OUTPUT MANAGEMENT (v2.0):
    - NEVER create outputs in agent folders
    - ALWAYS use: outputs/projects/{YYYY-MM-DD}-{project-slug}/
    - Use 6-stage structure: 00-session/, 01-research/, 02-ideas/, 03-drafts/, 04-media/, 05-published/
    - Platform-specific drafts in: 03-drafts/{platform}/
    - Platform-agnostic REUSABLE media in: 04-media/images/, 04-media/videos/
```

### Zoe (step 8):

```xml
<step n="8">MANDATORY OUTPUT MANAGEMENT (Epic 1 Story 7.6):
    - ALWAYS use: outputs/projects/{YYYY-MM-DD}-{project-slug}/
    - Images save to: 04-media/images/{descriptive-name}.png
    - Videos save to: 04-media/videos/{descriptive-name}.mp4
    - Naming: thumbnail-main.png (reusable) NOT thumbnail-linkedin.png
    - Metadata: Save to 04-media/images/metadata.json and 04-media/videos/metadata.json
```

**Comparison:**

- ✅ Both use outputs/projects/ structure
- ✅ Both use 04-media/ correctly
- ✅ Both emphasize platform-agnostic naming
- ✅ Both reference outputs/README.md
- ✅ Zoe more specific about media folders (images/, videos/)

**Status:** ✅ **ALIGNED** - Both follow same output pattern

---

## Issue 8: Menu Handler Inconsistency

### Jarvis Has (lines 53-70):

```xml
<menu-handlers>
  <handlers>
    <handler type="workflow">
      When menu item has: workflow="path/to/workflow.yaml"
      1. CRITICAL: Always LOAD {project-root}/bmad/core/tasks/workflow.xml
      2. Read the complete file - this is the CORE OS
      3. Pass the yaml path as 'workflow-config' parameter
      4. Execute workflow.xml instructions precisely
      5. Save outputs after EACH workflow step
    </handler>
    <handler type="action">
      When menu item has: action="#id" → Find prompt with id="id"
      When menu item has: action="text" → Execute text directly
    </handler>
  </handlers>
</menu-handlers>
```

### Zoe Has (lines 75-86):

```xml
<menu-handlers>
  <handlers>
    <handler type="workflow">
      When menu item has: workflow="path/to/workflow.yaml"
      1. CRITICAL: Always LOAD {project-root}/bmad/core/tasks/workflow.xml
      2. Read the complete file - this is the CORE OS
      3. Pass the yaml path as 'workflow-config' parameter
      4. Execute workflow.xml instructions precisely
      5. Save outputs after EACH workflow step
    </handler>
  </handlers>
</menu-handlers>
```

**Differences:**

- ❌ Zoe missing `<handler type="action">` section
- Jarvis more complete (2 handlers)
- Zoe only has workflow handler

**Impact:**

- If Zoe menu items use action="text", no handler defined
- Might cause confusion or errors

**Recommendation:**
Add action handler to Zoe (copy from Jarvis)

---

## Issue 9: Team Awareness Differences

### Jarvis Has:

```xml
<step n="11">TEAM AWARENESS - Know your specialist agents:
    - Zoe (🎨) - Visual Production Specialist
    - Zoro (📤) - Publishing & Distribution Specialist
    - When content ready: Create handoff package
</step>
```

**Complete team section with:**

- <team> XML structure
- Handoff protocols
- Coordination guidance

### Zoe Has:

❌ **NO team awareness step**
❌ **NO team coordination section**

**Problem:**

- Zoe doesn't know about Jarvis or Zoro formally
- No handoff protocols documented
- No team coordination guidance

**Expected:** Zoe should know:

- Jarvis creates content (receives text content requests from Jarvis)
- Zoro publishes (hands off completed visuals to Zoro)
- Handoff package formats

**Recommendation:**
Add team awareness step to Zoe activation

---

## Issue 10: Menu Structure Differences

### Jarvis Menu (clean, simple):

```xml
<menu>
  <item cmd="*help">Show numbered menu</item>
  <item cmd="*research-topic" workflow="path">Description</item>
  <item cmd="*write-post" action="...">Description</item>
  <item cmd="*exit">Exit</item>
</menu>
```

### Zoe Menu (has HTML comments):

```xml
<menu>
  <item cmd="*help">Show numbered menu</item>

  <!-- Image Workflows -->
  <item cmd="*create-images" workflow="...">Description</item>
  ...

  <!-- Video Workflows -->
  <item cmd="*edit-video" workflow="...">Description</item>
  ...

  <item cmd="*exit">Exit</item>
</menu>
```

**Differences:**

- Zoe uses HTML comments for organization (acceptable, aids readability)
- Jarvis cleaner (no comments)

**Status:** ⚠️ **STYLE PREFERENCE** - Not wrong, just different

---

## Issue 11: Config Variable Pulling Pattern

### Jarvis Workflows Pull Config Values:

```yaml
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
```

**Pattern:** Reference config values with `{config_source}:field_name`

### Zoe Workflow Pulls Additional Values:

```yaml
config_source: '{project-root}/bmad/agents/zoe/config.yaml'
output_folder: '{config_source}:output_folder'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
date: system-generated

# Module-Specific Paths
sidecar_config: '{config_source}:sidecar_config'
capabilities_doc: '{config_source}:capabilities_doc'
best_practices_doc: '{config_source}:best_practices_doc'
template_folder: '{config_source}:templates_folder'
skills_folder: '{config_source}:skills_folder'
```

**Analysis:**

- ✅ Pulls MORE from config (sidecar_config, capabilities_doc, etc.)
- ❌ But those fields don't exist in Zoe config.yaml!
- ❌ skills_folder defined in config but also pulled in workflow (redundant)

**Let me verify config.yaml has these:**

Looking at Zoe config.yaml (lines 1-36):

- ✅ Has skills_folder
- ❌ NO sidecar_config field
- ❌ NO capabilities_doc field
- ❌ NO best_practices_doc field
- ❌ NO templates_folder field

**Problem:** Workflow references non-existent config fields!

---

## Issue 12: Skills Folder Definition Location

### Jarvis:

```yaml
# In workflow.yaml:
skills_folder: '{project-root}/.claude/skills/jarvis'
```

**Pattern:** Defined directly in workflow

### Zoe (Attempt 1):

```yaml
# In config.yaml:
skills_folder: "{project-root}/.claude/skills/zoe"

# In workflow.yaml:
skills_folder: "{config_source}:skills_folder"
```

**Pattern:** Defined in config, pulled by workflow

**Analysis:**

- Zoe approach is MORE DRY (define once in config)
- Jarvis approach simpler (self-contained workflows)

**Decision Needed:**

- Keep Zoe pattern (DRY, config-centric)?
- Switch to Jarvis pattern (self-contained)?

---

## Critical Alignment Issues Summary

| Issue                       | Jarvis                  | Zoe                                 | Status          | Recommendation          |
| --------------------------- | ----------------------- | ----------------------------------- | --------------- | ----------------------- |
| **config_source**           | `{agent-folder}`        | Explicit path                       | ❌ Inconsistent | Use `{agent-folder}`    |
| **user_name in config**     | Not defined (from core) | Hardcoded "sid"                     | ❌ Wrong        | Remove, pull from core  |
| **sidecar instructions.md** | ✅ Exists (540 lines)   | ❌ Missing                          | ❌ Critical     | Create file             |
| **Team awareness**          | ✅ Full section         | ❌ Missing                          | ❌ Important    | Add to activation       |
| **Menu action handler**     | ✅ Both handlers        | ⚠️ Workflow only                    | ⚠️ Incomplete   | Add action handler      |
| **skills_folder location**  | In workflow             | In config → pulled                  | ⚠️ Different    | Standardize             |
| **Undefined config refs**   | N/A                     | 4 fields referenced but don't exist | ❌ Broken       | Fix or remove refs      |
| **HTML comments in menu**   | No                      | Yes                                 | ✅ Style choice | Keep (aids readability) |

---

## Recommended Fixes (Prioritized)

### Priority 1: CRITICAL (Breaks Functionality)

**1. Fix undefined config field references in workflow.yaml**

**Current (BROKEN):**

```yaml
sidecar_config: '{config_source}:sidecar_config'
capabilities_doc: '{config_source}:capabilities_doc'
best_practices_doc: '{config_source}:best_practices_doc'
template_folder: '{config_source}:templates_folder'
```

**Option A: Remove** (if not used in instructions)

```yaml
# Just delete these lines
```

**Option B: Add to config.yaml** (if used in instructions)

```yaml
# In config.yaml, add:
sidecar_config: '{sidecar_folder}/config.yaml'
capabilities_doc: '{sidecar_folder}/capabilities.md'
best_practices_doc: '{sidecar_folder}/best-practices.md'
templates_folder: '{sidecar_folder}/templates'
```

**Need to check:** Are these used in instructions.md?

---

**2. Remove hardcoded user config from Zoe config.yaml**

**Change:**

```yaml
# Remove:
user_name: sid
communication_language: english
# These will pull from bmad/core/config.yaml at runtime
# Or from workflow {config_source}:user_name pattern
```

**Rationale:**

- Matches Jarvis pattern
- Single source of truth (core config)
- Multi-user friendly

---

**3. Create zoe-sidecar/instructions.md**

**Should contain:**

- Core directives (like Jarvis)
- Skills-first execution model
- Team coordination protocols (receives from Jarvis, hands to Zoro)
- Quality standards (7-pillar framework)
- Output standards (04-media/ structure)
- MCP tool selection guidance
- Cost tracking patterns
- Cloudinary integration requirements

**Estimated size:** 300-400 lines (based on Jarvis template)

---

### Priority 2: IMPORTANT (Consistency)

**4. Standardize config_source to {agent-folder}**

**Change in workflow.yaml:**

```yaml
# From:
config_source: "{project-root}/bmad/agents/zoe/config.yaml"

# To:
config_source: "{agent-folder}/config.yaml"
```

**Change in zoe.md activation (line 13):**

```yaml
# Already correct! Uses:
Load {project-root}/bmad/agents/zoe/config.yaml
```

**Wait, inconsistency!**

- zoe.md activation uses explicit path
- Should use `{agent-folder}` for consistency with Jarvis

---

**5. Add team awareness to Zoe activation**

**Add after step 6:**

```xml
<step n="6.5">TEAM AWARENESS - Know your collaborators:
    - Jarvis (🎯) - Content Intelligence Head (sends you visual requirements)
    - Zoro (📤) - Publishing Specialist (you send completed visuals)
    - Handoff protocols: See instructions.md for complete formats
    - You receive: Visual briefs from Jarvis (jarvis-to-zoe.json)
    - You send: Completed assets to Zoro (zoe-to-zoro.json)
</step>
```

---

**6. Add action handler to menu-handlers**

**Add:**

```xml
<handler type="action">
  When menu item has: action="#id" → Find prompt with id="id" in current agent XML
  When menu item has: action="text" → Execute the text directly as an inline instruction
</handler>
```

---

### Priority 3: OPTIONAL (Improvements)

**7. Decide on skills_folder pattern**

**Option A: Zoe pattern** (DRY, config-centric)

- Define in config.yaml: `skills_folder: "{project-root}/.claude/skills/zoe"`
- Pull in workflows: `skills_folder: "{config_source}:skills_folder"`
- Update ALL Jarvis workflows to match

**Option B: Jarvis pattern** (self-contained)

- Define in each workflow: `skills_folder: "{project-root}/.claude/skills/jarvis"`
- Update Zoe to match

**My recommendation: Keep Zoe pattern** (it's actually better - DRY principle)

---

## Comparison: Jarvis vs Zoe Structure

### Jarvis (Proven Working):

```
bmad/agents/content-intelligence/
├── jarvis.agent.yaml ✅
├── jarvis.md ✅
├── jarvis-sidecar/
│   ├── config.yaml ✅ (NO user_name hardcoding)
│   ├── instructions.md ✅ (540 lines)
│   ├── memories.md ✅ (voice profile)
│   └── workflows/ (7 workflows)
│       ├── write-posts/ ✅
│       ├── write-scripts/ ✅
│       ├── research-topic/ ✅
│       └── ...
```

### Zoe (Needs Alignment):

```
bmad/agents/zoe/
├── zoe.agent.yaml ✅
├── zoe.md ✅ (needs team awareness)
├── config.yaml ⚠️ (has hardcoded user_name)
├── zoe-sidecar/
│   ├── instructions.md ❌ MISSING!
│   ├── notion-helper.md ✅
│   ├── platform-specs.yaml ✅
│   └── workflows/
│       ├── create-images/ ✅ (just simplified!)
│       ├── edit-video/ ⚠️
│       └── ... (need to audit)
```

---

## Ultra-Recommendation: Alignment Plan

### Phase 1: Critical Fixes (Do First)

1. **Create `zoe-sidecar/instructions.md`** - Copy Jarvis template, adapt for Zoe
2. **Fix undefined config references** - Remove broken refs from workflow.yaml
3. **Remove hardcoded user_name** - Delete from config.yaml (pull from core)
4. **Standardize config_source** - Use `{agent-folder}` everywhere

### Phase 2: Consistency Improvements

5. **Add team awareness** - Copy Jarvis pattern, adapt for Zoe perspective
6. **Add action handler** - Copy from Jarvis menu-handlers
7. **Document skills loading** - Add critical instruction to activation

### Phase 3: Validation

8. **Test Zoe activation** - Verify config loads, variables resolve
9. **Test create-images workflow** - Verify skill loads, generates properly
10. **Cross-check with Jarvis** - Ensure patterns align

---

## Files Needing Changes

### Must Fix:

1. `bmad/agents/zoe/config.yaml` - Remove user_name, communication_language hardcoding
2. `bmad/agents/zoe/zoe.md` - Add team awareness, update activation to use {agent-folder}
3. `bmad/agents/zoe/zoe-sidecar/workflows/create-images/workflow.yaml` - Fix undefined config refs, use {agent-folder}
4. `bmad/agents/zoe/zoe-sidecar/instructions.md` - **CREATE FILE** (doesn't exist!)

### Should Fix:

5. Other Zoe workflows (audit needed)

---

## Questions Before Proceeding

**1. Config pattern preference:**

- Use `{agent-folder}` (Jarvis pattern, portable)?
- Use explicit paths (Zoe current, explicit)?

**2. skills_folder definition:**

- Define in config, pull in workflows (Zoe DRY pattern)?
- Define in workflows directly (Jarvis self-contained)?

**3. sidecar instructions.md:**

- Create comprehensive (300-400 lines like Jarvis)?
- Create minimal (just critical directives)?

**My recommendations:**

1. Use `{agent-folder}` (consistency with Jarvis)
2. Keep config-based skills_folder (better DRY)
3. Create comprehensive instructions.md (proper documentation)

**Ready to proceed with fixes?**
