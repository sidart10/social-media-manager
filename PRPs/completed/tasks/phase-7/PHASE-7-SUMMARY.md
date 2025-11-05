<!-- Powered by BMAD™ Core -->

# Phase 7: Jarvis Critical Fixes (URGENT)

**Added:** 2025-11-02 (Post-QA Discovery)
**Priority:** 🚨🚨🚨 BLOCKING JARVIS PRODUCTION USE
**Estimated Time:** 1-2 hours
**Status:** Task 25 ✅ COMPLETE, Task 26 ✅ COMPLETE (2025-11-02), Task 27 ⬜ READY FOR TESTING

---

## 🎯 WHY PHASE 7 EXISTS

**Discovery:** During Phase 5 QA testing, user tested Jarvis and found:

**❌ ISSUE #1:** Jarvis mentioned old agent names

- Said: "AI Video Agent", "AI Image Generator", "Social Posting Agent"
- Should say: "Zoe" (visual specialist), "Zoro" (publishing specialist)

**❌ ISSUE #2:** Jarvis created output in wrong location

- Created: `outputs/11-02-2025/agent-skills-thread/`
- Should create: `outputs/projects/2025-11-02-agent-skills-thread/`

**❌ ISSUE #3:** Jarvis didn't follow workflow properly

- Skipped research brief creation
- Went straight to thread output
- Didn't use proper 6-stage structure

**Root Cause:** Jarvis configuration had outdated references + workflow.yaml files referenced non-existent config variables!

---

## 📋 PHASE 7 TASKS

### Task 25: Fix Jarvis Agent References ✅ COMPLETED

**Status:** ✅ DONE (2025-11-02 15:35)

**What Was Fixed:**

- ✅ Updated 30+ references from old agent names to Zoe/Zoro
- ✅ Fixed output pattern from `outputs/{MM-DD-YYYY}/` to `outputs/projects/{YYYY-MM-DD}-{slug}/`
- ✅ Updated team coordination descriptions
- ✅ Fixed handoff protocols (3 agents → 2 agents)
- ✅ Synced to slash commands

**Files Modified:**

- `bmad/agents/content-intelligence/jarvis.md`
- `bmad/agents/content-intelligence/jarvis-sidecar/instructions.md`
- `.claude/commands/social-media-team/jarvis.md` (synced)

**Validation:** ✅ PASSING

- 0 old agent names
- 26 Zoe mentions
- 24 Zoro mentions
- 7 v2.0 output pattern references

---

### Task 26: Fix Jarvis Workflow Variables ✅ COMPLETED

**Status:** ✅ DONE (2025-11-02 16:15)

**Problem Discovered:**

**4 Jarvis workflows reference variables that DON'T EXIST:**

```yaml
# In workflow.yaml:
sessions_folder: "{config_source}:sessions_folder"  ❌ NOT in config!
knowledge_folder: "{config_source}:knowledge_folder"  ❌ NOT in config!

# Config.yaml ONLY has:
user_name: sid  ✅
communication_language: english  ✅
output_folder: "{project-root}/docs"  ✅
```

**Impact:**

- Workflows can't resolve output paths
- Variables return undefined/null
- Jarvis falls back to hardcoded old patterns
- Creates output in wrong location

**Affected Workflows:**

1. research-topic
2. generate-ideas
3. analyze-profile
4. competitive-analysis

**What Needs Fixing:**

**A. Workflow.yaml Variables (4 files):**

- Remove: sessions_folder, knowledge_folder
- Use: Standard BMad v6 variables only
- Update: default_output_file paths to v2.0 pattern

**B. Workflow instructions.md (4 files):**

- Add: Step 0 (create project folder structure)
- Update: All output save paths to v2.0
- Fix: Bash date command to `date +"%Y-%m-%d"` (not `+"%m-%d-%Y"`)

**Estimated Time:** 45-60 minutes
**Actual Time:** 50 minutes

**What Was Fixed:**

- ✅ Removed sessions_folder and knowledge_folder from all 4 workflow.yaml files
- ✅ Added standard BMad v6 variables (output_folder, user_name, communication_language)
- ✅ Updated all default_output_file paths to v2.0 pattern
- ✅ Added Step 0 to all 4 instructions.md files (project folder creation)
- ✅ Fixed bash date format from %m-%d-%Y to %Y-%m-%d
- ✅ Added user guidance about workflow triggering vs inline execution

**Files Modified:**

- 4 workflow.yaml files (research-topic, generate-ideas, analyze-profile, competitive-analysis)
- 4 instructions.md files (same workflows)
- jarvis-sidecar/instructions.md (added triggering guidance)

**Validation:** ✅ ALL TESTS PASSING

- 0 sessions_folder references in any workflow.yaml
- 7 workflows have standard BMad variables
- 0 old date format (MM-DD-YYYY)
- 4 workflows use new date format (YYYY-MM-DD)

---

### Task 27: Test Jarvis Workflow Execution ⬜ READY FOR TESTING

**Status:** ⬜ READY TO TEST (after Task 26 ✅)

**Purpose:** Prove workflows work after fixes

**Test:**

```bash
/jarvis
2  # Select research-topic

# Should create:
# outputs/projects/2025-11-02-{slug}/01-research/research-brief.md
```

**Success:** Complete 6-stage structure, research brief created, workflow steps followed

**Estimated Time:** 20-30 minutes

---

## 🎯 PHASE 7 COMPLETION CRITERIA

**Before Jarvis is Production-Ready:**

- [x] ~~Task 25:~~ Agent names updated ✅
- [x] ~~Task 26:~~ Workflow variables fixed ✅
- [ ] **Task 27:** Workflow execution tested and validated (READY TO TEST)

**After Phase 7:**

- ✅ Jarvis will coordinate with correct agents (Zoe, Zoro)
- ✅ Jarvis workflows will create v2.0 output structure
- ✅ Research brief will be created in 01-research/
- ✅ All steps will execute properly
- ✅ Ready for Epic 7 end-to-end testing

---

## ⚡ URGENCY LEVEL

**CRITICAL!** Jarvis is most important agent and currently:

- ❌ Creates outputs in wrong location
- ❌ Skips workflow steps
- ❌ Doesn't follow BMad v2.0 structure
- ⚠️ Task 25 fixed agent names, but Task 26 fixes workflow execution

**Recommendation:** **Complete Task 26 immediately** (45-60 min), then test with Task 27

---

## 📊 PHASE 7 STATS

**Tasks:** 3
**Completed:** 2/3 (67%)
**Time Invested:** 70 minutes (Task 25: 20min, Task 26: 50min)
**Time Remaining:** 20-30 minutes (Task 27 testing only)
**Blocking:** None! Ready for production testing

---

**Created:** 2025-11-02 15:50
**Phase:** Emergency fixes discovered during QA
**Priority:** Higher than Phase 6 (must fix before testing)
