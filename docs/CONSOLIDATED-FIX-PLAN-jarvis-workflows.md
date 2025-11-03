# Consolidated Fix Plan - Jarvis Workflows
**Date:** 2025-11-03
**Scope:** write-posts & write-scripts workflows
**Alignment Check:** Jarvis agent implementation
**Status:** Ready for execution

---

## Executive Summary

Both workflows share **nearly identical issues**. This plan fixes all critical problems while **preserving your intentional design decisions**.

**Key Finding:** After analyzing Jarvis's implementation, I've confirmed:
- ✅ `outputs/projects/` hardcoded paths are **CORRECT** (mandatory standardized structure)
- ⚠️ `{agent-folder}` variable usage is **INCONSISTENT** across project (used in 7 workflows but not in BMAD core)
- ❌ Missing `date` variable is **CRITICAL** (used in instructions but not defined)

---

## Alignment with Jarvis Implementation

### ✅ What's Correctly Aligned

1. **Outputs Structure** - Both workflows correctly use `outputs/projects/{date}-{slug}/`
   - Matches jarvis.md activation step 9 (mandatory output management v2.0)
   - Matches outputs/README.md standardized structure
   - Matches all 7 Jarvis workflows pattern
   - **NO CHANGE NEEDED**

2. **Skills-First Architecture** - Workflows reference content-writer skill
   - Matches jarvis.md skills section (line 84: content-writer)
   - Matches instructions.md skills-first execution model
   - **NO CHANGE NEEDED**

3. **Team Handoff Patterns** - Instructions include handoff to Zoe/Zoro
   - Matches jarvis.md team coordination (lines 210-246)
   - Matches instructions.md handoff protocols (lines 189-283)
   - **NO CHANGE NEEDED**

### ⚠️ What Needs Alignment

1. **Variable System** - `{agent-folder}` inconsistency
   - Used in: All 7 Jarvis workflows
   - Used in: jarvis.md activation (line 13: "Load {agent-folder}/config.yaml")
   - NOT in: BMAD core workflow.xml supported variables (only {project-root}, {installed_path})
   - **Decision needed**: Keep `{agent-folder}` OR switch to explicit paths?

2. **Date Variable** - Missing from YAML but required
   - Used in: Instructions for output paths
   - Missing in: workflow.yaml config block
   - Supported by: workflow.xml phase 3 (system-generated resolution)
   - **FIX REQUIRED**: Add `date: system-generated`

3. **Web Bundle** - Missing for deployment
   - Present in: 0 of 7 Jarvis workflows
   - Required for: Web version deployment
   - **Decision needed**: Deploy these workflows remotely?

---

## Issues Summary

### write-posts (5 critical, 2 important, 2 cleanup)

**Critical:**
1. Missing `date: system-generated`
2. `{agent-folder}` variable (decision: keep or change?)
3. Invalid `.bmad-core/` paths (should be `bmad/core/`)
4. Missing web_bundle section
5. Invalid action syntax (Python pseudocode in XML)

**Important:**
1. Communication language not in greeting
2. 28.6% bloat (2 unused variables)

**Cleanup:**
1. Remove `skills_folder` (unused)
2. Remove or use `default_output_file`

### write-scripts (4 critical, 1 important, 2 cleanup)

**Critical:**
1. Missing `date: system-generated`
2. `{agent-folder}` variable (decision: keep or change?)
3. Missing web_bundle section
4. Communication language not in greeting

**Important:**
1. 28.6% bloat (2 unused variables)

**Cleanup:**
1. Remove `skills_folder` (unused)
2. Remove or use `default_output_file`

---

## Proposed Fixes

### Decision Point 1: {agent-folder} Variable Strategy

**Option A: Keep {agent-folder} (Runtime Resolution)**
- Pro: Matches all 7 existing Jarvis workflows
- Pro: Matches jarvis.md activation pattern
- Pro: More portable (workflows can move between agents)
- Con: Not documented in workflow.xml as supported variable
- Con: May cause resolution issues if not set at runtime

**Option B: Use Explicit Paths (BMAD v6 Standard)**
- Pro: Aligns with workflow.xml documented variables
- Pro: Explicit and unambiguous
- Con: Requires updating all 7 Jarvis workflows
- Con: Less portable

**RECOMMENDATION: Option A - Keep {agent-folder}**

**Rationale:**
- It's already used consistently across all 7 Jarvis workflows
- Jarvis agent explicitly references it in activation
- Workflow.xml Phase 4 states: "Ask user for input of any variables that are still unknown"
- This means runtime context variables ARE supported via fallback mechanism
- More maintainable (don't break existing pattern)

**Validation Needed:** Confirm `{agent-folder}` resolves at runtime during agent activation

### Decision Point 2: Web Bundle Deployment

**Question:** Do these workflows need web deployment?

**Option A: Add web_bundle (Deploy to Web)**
- Enables remote execution via web interface
- Requires maintaining file manifests
- Good for: Public workflows, team collaboration

**Option B: Keep Local-Only**
- Simpler maintenance
- Faster iteration
- Good for: Personal use, rapid development

**RECOMMENDATION: Wait on web_bundle until deployment needed**

**Rationale:**
- These are working development workflows
- Focus on fixing execution issues first
- Add web_bundle later when ready to deploy

---

## Fix Implementation Plan

### Phase 1: Critical Fixes (REQUIRED)

#### Fix 1.1: Add date variable to both workflow.yaml files

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml`
**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/workflow.yaml`

**Change:**
```yaml
# Standard Config
config_source: "{agent-folder}/config.yaml"
user_name: "{config_source}:user_name"
communication_language: "{config_source}:communication_language"
output_folder: "{config_source}:output_folder"
date: system-generated  # ← ADD THIS LINE
```

**Impact:** Fixes undefined {date} variable usage in instructions

---

#### Fix 1.2: Fix invalid .bmad-core/ paths (write-posts only)

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md`

**Change (lines 199-200):**
```xml
# Before:
<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
<action>Load {project-root}/.bmad-core/modules/notion-relational-helpers.md</action>

# After:
<action>Load {project-root}/bmad/core/modules/notion-updates.md</action>
<action>Load {project-root}/bmad/core/modules/notion-relational-helpers.md</action>
```

**Impact:** Fixes non-existent file path references

---

#### Fix 1.3: Fix invalid action syntax (write-posts only)

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md`

**Change (lines 19-30):**
```xml
# Before:
<action>**Load voice profile:** - Read: {agent-folder}/jarvis-sidecar/memories.md - Extract: Enhanced Voice Profile v2.0 section - Check confidence: Should be ≥8/10 for best results

    if voice_profile not found:
      display("⚠️ No voice profile found!")
      display("ℹ️ Run *learn-voice first to analyze 50+ your posts")
      <ask>Continue without voice profile? (generic AI voice) [y/n]</ask>
      if no: <exit>Workflow cancelled - run *learn-voice first</exit>
    else:
      display(f"✅ Voice Profile v2.0 loaded (confidence: {confidence}/10)")
      display(f"   Voice modes available: {list_voice_modes}")

  </action>

# After:
<action>Load voice profile:
  - Read: {agent-folder}/jarvis-sidecar/memories.md
  - Extract: Enhanced Voice Profile v2.0 section
  - Check confidence: Should be ≥8/10 for best results
</action>

<check if="voice_profile not found">
  <action>Display: "⚠️ No voice profile found!"</action>
  <action>Display: "ℹ️ Run *learn-voice first to analyze 50+ your posts"</action>
  <ask>Continue without voice profile? (generic AI voice) [y/n]</ask>
  <check if="user says no">
    <action>Exit: "Workflow cancelled - run *learn-voice first"</action>
  </check>
</check>

<check if="voice_profile found">
  <action>Display: "✅ Voice Profile v2.0 loaded (confidence: {confidence}/10)"</action>
  <action>Display: "   Voice modes available: {list_voice_modes}"</action>
</check>
```

**Impact:** Proper XML structure, no Python pseudocode mixing

---

#### Fix 1.4: Add {communication_language} to greetings

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md`
**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/instructions.md`

**write-posts change (line 11):**
```xml
# Before:
<action>Display:
  ✍️ Write Posts - Voice-Matched Content Generation

# After:
<action>Display in {communication_language}:
  ✍️ Write Posts - Voice-Matched Content Generation
```

**write-scripts change (line 11):**
```xml
# Before:
<action>Display:
  🎬 Write Scripts - Voice-Matched Video Content

# After:
<action>Display in {communication_language}:
  🎬 Write Scripts - Voice-Matched Video Content
```

**Impact:** Proper internationalization support

---

### Phase 2: Cleanup (RECOMMENDED)

#### Fix 2.1: Remove bloat variables

**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml`
**File:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/workflow.yaml`

**Remove these lines:**
```yaml
skills_folder: "{project-root}/.claude/skills/jarvis"  # ← DELETE (never used)
default_output_file: "{output_folder}/posts/{platform}-{topic-slug}-{date}.md"  # ← DELETE (hardcoded in instructions instead)
```

**Impact:**
- Reduces bloat from 28.6% to 0%
- Cleaner configuration
- No functional impact (variables aren't used)

---

### Phase 3: Optional (DEFER)

#### Fix 3.1: Add web_bundle sections (only if deploying to web)

**Status:** DEFERRED - Not needed for local development

**When ready to deploy:**
```yaml
web_bundle:
  name: "write-posts"  # or "write-scripts"
  description: "[Copy from top-level description]"
  author: "Jarvis (Content Intelligence)"
  version: "1.0.0"

  web_bundle_files:
    - "bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml"
    - "bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md"
    - "bmad/agents/content-intelligence/jarvis-sidecar/config.yaml"
    - "bmad/agents/content-intelligence/jarvis-sidecar/memories.md"
```

---

## Validation After Fixes

### Test Checklist

**write-posts workflow:**
- [ ] Run: `/jarvis` → `*write-post`
- [ ] Verify: Greeting displays in English (communication_language works)
- [ ] Verify: Date variable resolves for output paths
- [ ] Verify: Voice profile loads from {agent-folder}/jarvis-sidecar/memories.md
- [ ] Verify: Output saves to `outputs/projects/2025-11-03-{slug}/03-drafts/{platform}/`
- [ ] Verify: No XML parsing errors in instructions
- [ ] Check: `npm run validate:schemas` passes

**write-scripts workflow:**
- [ ] Run: `/jarvis` → `*write-script`
- [ ] Verify: Greeting displays in English
- [ ] Verify: Date variable resolves
- [ ] Verify: Voice profile loads
- [ ] Verify: Output saves to `outputs/projects/2025-11-03-{slug}/03-drafts/youtube/`
- [ ] Check: `npm run validate:schemas` passes

---

## Files to Modify

### Phase 1 (Critical - 4 files)

1. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml`
   - Add `date: system-generated`
   - Remove bloat variables (optional)

2. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md`
   - Fix .bmad-core/ paths (2 instances)
   - Fix invalid action syntax (lines 19-30)
   - Add {communication_language} to greeting

3. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/workflow.yaml`
   - Add `date: system-generated`
   - Remove bloat variables (optional)

4. `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/instructions.md`
   - Add {communication_language} to greeting

### Phase 2 (Optional - web deployment)

5. Both workflow.yaml files - add web_bundle sections

---

## Impact Analysis

### What Will Change

✅ **Workflows will execute without errors**
- Date variable will resolve properly
- Config variables will work correctly
- File paths will be valid

✅ **Bloat reduced from 28.6% to 0%**
- Cleaner configuration
- No unused fields

✅ **Proper internationalization**
- Greetings respect {communication_language}

### What Will NOT Change

✅ **Output structure stays the same**
- Still uses `outputs/projects/{date}-{slug}/`
- Still uses 6-stage lifecycle (00-session through 05-published)
- Still platform-specific in 03-drafts/

✅ **Agent behavior stays the same**
- Skills still load automatically
- Voice matching still works
- Team coordination still works

✅ **All 5 other Jarvis workflows unaffected**
- Only fixing write-posts and write-scripts
- Other workflows keep {agent-folder} for now

---

## Execution Strategy

### Recommended Approach: Minimal Critical Fixes

**Fix only what's broken, preserve what works:**

1. ✅ Add `date: system-generated` to both YAML files
2. ✅ Fix .bmad-core/ paths in write-posts
3. ✅ Fix invalid action syntax in write-posts
4. ✅ Add {communication_language} to both greetings
5. ⚠️ KEEP `{agent-folder}` variable (used consistently across all 7 workflows)
6. ⚠️ SKIP web_bundle (defer until deployment needed)
7. ⚠️ OPTIONALLY remove bloat variables

**Testing:**
- Run both workflows after fixes
- Verify no errors
- Confirm outputs save to correct location

### Alternative Approach: Comprehensive Cleanup

**Fix everything including bloat and future-proofing:**

1. All Phase 1 critical fixes
2. Remove bloat variables
3. Add web_bundle sections
4. Document {agent-folder} variable in workflow.xml OR replace with explicit paths

**Recommendation:** Use **Minimal Critical Fixes** for now. These workflows are in active development. Polish later when stabilized.

---

## Risk Assessment

### Low Risk Changes (Safe to apply immediately)

✅ Add `date: system-generated` - Standard BMAD v6 pattern
✅ Fix .bmad-core/ typo - Obvious error
✅ Add {communication_language} - Standard pattern
✅ Fix XML syntax - Structural improvement

### Medium Risk Changes (Test carefully)

⚠️ Remove bloat variables - Shouldn't break anything (not used)
⚠️ Fix action syntax restructure - Changes control flow logic

### High Risk Changes (Defer)

❌ Replace {agent-folder} - Would break consistency with other 5 workflows
❌ Add web_bundle - Premature optimization (not deploying yet)

---

## Implementation Order

### Step 1: Fix write-posts YAML
- Add date variable
- (Optional) Remove bloat

### Step 2: Fix write-posts instructions
- Fix .bmad-core/ paths
- Fix action syntax
- Add communication_language

### Step 3: Fix write-scripts YAML
- Add date variable
- (Optional) Remove bloat

### Step 4: Fix write-scripts instructions
- Add communication_language

### Step 5: Validate
- Run `npm run validate:schemas`
- Test both workflows
- Check outputs folder

---

## Post-Fix Actions

### Immediate (After applying fixes)

1. Run both workflows to verify they work
2. Check that outputs save to correct folders
3. Update audit reports with "FIXED" status
4. Commit changes with message: `fix(jarvis): add missing date variable and fix paths in write-posts/write-scripts workflows`

### Future (When ready)

1. Document `{agent-folder}` variable in workflow.xml OR migrate all 7 workflows to explicit paths
2. Add web_bundle sections when ready to deploy
3. Consider standardizing config block across all BMAD workflows
4. Audit remaining 5 Jarvis workflows (generate-ideas, research-topic, analyze-profile, competitive-analysis, learn-voice)

---

## Questions for You

Before I apply these fixes, please confirm:

1. **{agent-folder} variable**: Keep it (used in all 7 workflows) or switch to explicit paths?
2. **Bloat cleanup**: Remove unused variables now or later?
3. **web_bundle**: Add now or defer until deployment?

**My recommendation:**
- Keep {agent-folder} (consistency)
- Remove bloat (low risk, cleaner code)
- Defer web_bundle (not needed yet)

---

## Summary of Changes

**Minimum fixes (recommended):**
- 2 YAML files: Add 1 line each (`date: system-generated`)
- 2 instruction files: Add 1 line each (`Display in {communication_language}:`)
- 1 instruction file (write-posts): Fix 2 path references, restructure 1 action block

**Total changes:** ~6 edits across 4 files

**Time estimate:** 5-10 minutes

**Risk level:** LOW (all fixes align with existing patterns)

---

**Ready to execute?** Let me know your decisions on the 3 questions above, and I'll apply all fixes.
