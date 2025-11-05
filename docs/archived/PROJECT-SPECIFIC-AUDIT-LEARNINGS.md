# Project-Specific Audit Learnings

**Project:** Social Media Manager (AI-Powered Agent Team)
**Date:** 2025-11-03
**Purpose:** Guide for interpreting audit-workflow results in THIS project
**Context:** This project has intentional architectural decisions that differ from standard BMAD v6 assumptions

---

## Critical: Read This Before Running Any Audits

The `audit-workflow` tool (`bmad/bmb/workflows/audit-workflow/`) was built for **generic BMAD v6 workflows**. This project has **intentional design patterns** that will be flagged as "issues" by the auditor but are **actually correct**.

This document explains what's intentional vs what's actually broken.

---

## Intentional Design Decisions (NOT Issues!)

### 1. Hardcoded `outputs/projects/` Structure

**Audit Will Say:**

```
❌ Output Folder: CRITICAL ISSUE - HARDCODED PATHS
- Instructions use hardcoded outputs/projects/ paths
- Should use {output_folder} variable instead
- This breaks when users configure different output folders
```

**Reality:** ✅ **THIS IS CORRECT BY DESIGN**

**Why:**

- `outputs/` is a **mandatory standardized structure** for this project
- All 3 agents (Jarvis, Zoe, Zoro) use `outputs/projects/{date}-{slug}/` consistently
- The 6-stage lifecycle (00-session through 05-published) is project-wide architecture
- The `{output_folder}` variable points to `docs/` for documentation, NOT content

**Evidence:**

- See: `outputs/README.md` - Full specification of mandatory structure
- See: `CLAUDE.md` - Section on "Output Management (Mandatory)"
- See: `jarvis.md` activation step 9 - "ALWAYS use: outputs/projects/{YYYY-MM-DD}-{project-slug}/"

**Action When Audit Flags This:**

- ✅ **IGNORE** - This is intentional architecture
- ❌ **DO NOT** replace with `{output_folder}` variable
- ✅ **VERIFY** - Check that paths use `outputs/projects/` not `{output_folder}/projects/`

**Example (Correct):**

```xml
Path: outputs/projects/{date}-{project_slug}/03-drafts/linkedin/post-v1.md
```

**Example (Wrong):**

```xml
Path: {output_folder}/projects/{date}-{project_slug}/03-drafts/linkedin/post-v1.md
```

---

### 2. `{agent-folder}` Runtime Variable

**Audit Will Say:**

```
❌ Config Source: Non-Standard Variable
- Found: config_source: "{agent-folder}/config.yaml"
- Expected: config_source: "{project-root}/bmad/[module]/config.yaml"
- Severity: CRITICAL
```

**Reality:** ⚠️ **PARTIALLY CORRECT - CONTEXT VARIABLE**

**Why:**

- `{agent-folder}` is a **runtime context variable** set during agent activation
- Used consistently across ALL Jarvis workflows (7 workflows)
- Referenced in jarvis.md activation (step 2: "Load {agent-folder}/config.yaml")
- More portable than hardcoded paths
- Allows workflows to move between agents without editing

**Evidence:**

- Used in: All 7 Jarvis workflows
- Defined in: Agent activation context (jarvis.md line 13)
- Pattern: Runtime resolution, not YAML-defined

**Supported by workflow.xml?**

- Phase 3: "Resolve system variables (date:system-generated) and paths ({project-root}, {installed_path})"
- Phase 4: "Ask user for input of any variables that are still unknown"
- Interpretation: Runtime variables ARE supported via fallback mechanism

**Action When Audit Flags This:**

- ⚠️ **EVALUATE** - Is this used across multiple workflows for same agent?
- ✅ **KEEP** if used consistently (7/7 Jarvis workflows)
- ❌ **CHANGE** if only used in 1-2 workflows (inconsistent)
- ✅ **VERIFY** - Test that variable resolves during workflow execution

**Decision for This Project:**

- ✅ **KEEP {agent-folder}** - Used in all Jarvis workflows consistently
- Document as project pattern for future agents
- Note: May need to add to workflow.xml documentation

---

### 3. Skills-First Architecture with `skills_folder` Variable

**Audit Might Say:**

```
❌ Bloat: skills_folder variable defined but not used
- Recommendation: REMOVE
```

**Reality:** ✅ **SHOULD BE USED, NOT REMOVED**

**Why:**

- This project uses **Skills-First Architecture**
- All agents (Jarvis, Zoe, Zoro) have specialized skills in `.claude/skills/{agent}/`
- Workflows SHOULD explicitly load skills with: `Load and follow {skills_folder}/{skill-name}/SKILL.md`
- The variable enables consistent skill referencing

**Pattern:**

```yaml
# In workflow.yaml:
skills_folder: "{project-root}/.claude/skills/jarvis"

# In instructions.md:
<action>Load and follow {skills_folder}/content-writer/SKILL.md</action>
```

**Action When Audit Flags This:**

- ❌ **DO NOT REMOVE** skills_folder variable
- ✅ **CHECK** if instructions explicitly load skills
- ✅ **FIX** if not used - add explicit skill loading to instructions
- ✅ **VERIFY** - Check `.claude/skills/{agent}/` folder exists with skills

**Available Skills by Agent:**

- **Jarvis:** content-writer, deep-web-research, research-synthesizer, profile-analysis, evidence-tracker, youtube-research
- **Zoe:** (Add when Zoe skills are created)
- **Zoro:** (Add when Zoro skills are created)

---

### 4. Multiple `.bmad-core/` Path References

**Audit Will Say:**

```
❌ Invalid File Paths
- Load {project-root}/.bmad-core/modules/notion-updates.md
- Path doesn't exist (should be bmad/core/)
```

**Reality:** ❌ **THIS IS ACTUALLY A BUG**

**Why:**

- This was a typo across 5 workflows
- Should be `bmad/core/` not `.bmad-core/`
- We fixed all instances in standardization commit

**Action When Audit Flags This:**

- ✅ **FIX IMMEDIATELY** - This is a real error
- Replace: `.bmad-core/` → `bmad/core/`
- Common in: Notion integration steps

**Files That Had This Issue (Now Fixed):**

- write-posts/instructions.md
- competitive-analysis/instructions.md
- generate-ideas/instructions.md
- research-topic/instructions.md
- analyze-profile/instructions.md

---

### 5. `default_output_file` Variable Pattern

**Audit Will Say:**

```
⚠️ Bloat: default_output_file defined but not used
- Instructions hardcode path logic instead
- Recommendation: Remove or use properly
```

**Reality:** ⚠️ **INTENTIONAL - DOCUMENTATION ONLY**

**Why:**

- The `default_output_file` shows the INTENDED output pattern
- Instructions implement MORE COMPLEX logic (versioning: post-v1.md, post-v2.md, etc.)
- Variable serves as documentation of base pattern
- Actual paths use dynamic versioning

**Example:**

```yaml
# In workflow.yaml (documentation):
default_output_file: '{output_folder}/posts/{platform}-{topic-slug}-{date}.md'

# In instructions.md (actual implementation):
Path: outputs/projects/{date}-{project_slug}/03-drafts/{platform}/post-v{version_num}.md
```

**Action When Audit Flags This:**

- ⚠️ **EVALUATE** - Is versioning logic needed?
- ✅ **KEEP** as documentation if complex output logic exists
- ✅ **REMOVE** if truly unused and no doc value
- ❌ **DON'T FORCE USE** if instructions need versioning

**Decision for This Project:**

- Could remove (minor bloat)
- Or keep as documentation of base pattern
- Low priority - doesn't affect functionality

---

## Real Issues to Fix (Audit is Correct)

### 1. Missing `date: system-generated` Variable

**Audit Says:**

```
❌ Missing date variable
- Variable not defined in YAML
- Instructions reference {date} but it won't work
```

**Reality:** ❌ **CORRECT - THIS IS A BUG**

**Fix:**

```yaml
# Add to all workflow.yaml files:
date: system-generated
```

**Status:** ✅ Fixed in all workflows (commits afcc880 + c639651)

---

### 2. Missing `skills_folder` Usage

**Audit Says:**

```
❌ Bloat: skills_folder defined but never used
```

**Reality:** ❌ **CORRECT - SHOULD BE USED**

**Fix:**

```xml
# In instructions.md:
<action>Load and follow {skills_folder}/content-writer/SKILL.md</action>
```

**Status:** ✅ Fixed in all workflows (commit c639651)

---

### 3. HTML Comments for Skill Invocation

**Audit Says:**

```
❌ Instruction quality issue
- <!-- Claude invokes X Skill automatically -->
- Not explicit skill loading
```

**Reality:** ❌ **CORRECT - THIS IS BROKEN PATTERN**

**Fix:**

```xml
# Replace HTML comments with explicit loading:
<action>Load and follow {skills_folder}/profile-analysis/SKILL.md</action>
```

**Status:** ✅ Fixed in competitive-analysis, generate-ideas (commit c639651)

---

### 4. Missing `communication_language` in Greetings

**Audit Says:**

```
❌ Communication language not used
- Should communicate in {communication_language}
```

**Reality:** ✅ **CORRECT - SHOULD BE ADDED**

**Fix:**

```xml
# Change from:
<action>Display:

# To:
<action>Display in {communication_language}:
```

**Status:** ✅ Fixed in all workflows (commit afcc880)

---

## Project-Specific Standards (How to Interpret Audit)

### Standard Config Block (Modified for This Project)

**Standard BMAD v6:**

```yaml
config_source: '{project-root}/bmad/[module]/config.yaml'
output_folder: '{config_source}:output_folder'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
date: system-generated
```

**This Project's Pattern:**

```yaml
config_source: '{agent-folder}/config.yaml' # ← Runtime variable
output_folder: '{config_source}:output_folder'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
date: system-generated
skills_folder: '{project-root}/.claude/skills/{agent-name}' # ← Skills-first addition
```

**Key Differences:**

1. `{agent-folder}` instead of explicit path (runtime context)
2. Added `skills_folder` for skills-first architecture
3. Both are INTENTIONAL for this project

---

### Skill Loading Pattern (Project Standard)

**This Project's Pattern:**

```xml
<action>Load and follow {skills_folder}/{skill-name}/SKILL.md</action>

<action>Execute [task] per SKILL.md instructions with parameters:
  - Parameter 1: {value}
  - Parameter 2: {value}
</action>
```

**NOT This:**

```xml
<!-- Claude invokes skill automatically -->
```

**NOT This:**

```xml
**Claude will autonomously discover skill**
```

**Quality Check:**

- ✅ Explicit `Load and follow` statement
- ✅ Uses `{skills_folder}` variable
- ✅ Provides parameters to skill
- ✅ References SKILL.md instructions

---

### Output Path Pattern (Project Standard)

**This Project ALWAYS Uses:**

```
outputs/projects/{YYYY-MM-DD}-{project-slug}/
├── 00-session/
├── 01-research/
├── 02-ideas/
├── 03-drafts/{platform}/
├── 04-media/{images,videos}/
├── 05-published/{platform}/
└── handoffs/
```

**NOT:**

```
{output_folder}/something/
docs/something/
{agent-folder}/outputs/
```

**Exception:**

- Audit reports and documentation → `docs/`
- Agent memories and logs → `bmad/agents/{agent}/memories.md`

---

## Audit Workflow Assumptions vs Reality

### Assumption 1: `{output_folder}` for All Outputs

**Standard BMAD v6:**

- All workflow outputs go to `{output_folder}`
- User configures output location per workflow

**This Project:**

- Content outputs → `outputs/projects/` (hardcoded, mandatory)
- Documentation → `docs/` (what `{output_folder}` points to)
- Separation of content vs documentation

**Why Different:**

- Multi-platform content needs standardized structure
- Media reusability (same thumbnail for LinkedIn + Twitter)
- Agent coordination (Jarvis → Zoe → Zoro handoffs)
- Notion integration (bidirectional linking)

---

### Assumption 2: `{project-root}/bmad/module/config.yaml` Path

**Standard BMAD v6:**

```yaml
config_source: '{project-root}/bmad/content-intelligence/config.yaml'
```

**This Project:**

```yaml
config_source: '{agent-folder}/config.yaml'
```

**Why Different:**

- Agent activation sets `{agent-folder}` context
- More portable (workflows can move between agents)
- Consistent with agent activation pattern (jarvis.md line 13)
- Runtime resolution supported by workflow.xml Phase 4

---

### Assumption 3: Minimal Workflow Variables

**Standard BMAD v6:**

- Just standard config + 1-2 workflow-specific variables

**This Project:**

- Standard config + `skills_folder` + workflow-specific
- Skills-first architecture requires skill path variable

**Pattern:**

```yaml
# Standard config (required)
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
date: system-generated

# Skills-first addition (project pattern)
skills_folder: '{project-root}/.claude/skills/{agent-name}'

# Workflow-specific
voice_profile: '{agent-folder}/jarvis-sidecar/memories.md'
```

---

### Assumption 4: Autonomous Skill Discovery

**Standard BMAD v6:**

- Skills might be discovered automatically via context

**This Project:**

- **EXPLICIT skill loading required**
- Pattern: `Load and follow {skills_folder}/{skill-name}/SKILL.md`
- No reliance on "magic" autonomous discovery
- HTML comments (`<!-- Claude invokes skill -->`) are WRONG

**Correct Pattern:**

```xml
<action>Load and follow {skills_folder}/content-writer/SKILL.md</action>
<action>Generate content per SKILL.md instructions with parameters...</action>
```

**Wrong Patterns:**

```xml
<!-- Claude invokes content-writer skill -->
**Claude will autonomously discover skill**
```

---

## Workflow-Specific Learnings

### Jarvis Workflows (7 Total)

**All should have:**

```yaml
config_source: '{agent-folder}/config.yaml'
skills_folder: '{project-root}/.claude/skills/jarvis'
date: system-generated
```

**Skills commonly used:**

- content-writer (write-posts, write-scripts)
- deep-web-research (research-topic, generate-ideas)
- research-synthesizer (research-topic, generate-ideas)
- profile-analysis (competitive-analysis, analyze-profile)
- social-media-research (generate-ideas)
- evidence-tracker (generate-ideas)

**Output paths:**

- Research → `outputs/projects/{date}-{slug}/01-research/`
- Ideas → `outputs/projects/{date}-{slug}/02-ideas/`
- Drafts → `outputs/projects/{date}-{slug}/03-drafts/{platform}/`

---

### Zoe Workflows (Visual Production)

**Expected pattern (when created):**

```yaml
config_source: '{agent-folder}/config.yaml'
skills_folder: '{project-root}/.claude/skills/zoe'
date: system-generated
```

**Output paths:**

- Media → `outputs/projects/{date}-{slug}/04-media/images/`
- Media → `outputs/projects/{date}-{slug}/04-media/videos/`
- Handoffs → `outputs/projects/{date}-{slug}/handoffs/zoe-to-zoro.json`

**Skills expected:**

- visual-prompt-mastery (for Emily JSON prompts)
- (Add others as Zoe skills are created)

---

### Zoro Workflows (Publishing)

**Expected pattern (when created):**

```yaml
config_source: '{agent-folder}/config.yaml'
skills_folder: '{project-root}/.claude/skills/zoro'
date: system-generated
```

**Output paths:**

- Published → `outputs/projects/{date}-{slug}/05-published/{platform}/`
- Confirmation → `outputs/projects/{date}-{slug}/05-published/{platform}/publish-confirmation.json`

**Skills expected:**

- (Add as Zoro skills are created)

---

## How to Use Audit Results

### Step 1: Run Audit

```bash
/bmad:bmb:workflows:audit-workflow
# Provide path to workflow
```

### Step 2: Filter Results Using This Guide

**For each flagged issue, check:**

1. **Is it listed in "Intentional Design Decisions" above?**
   - YES → ✅ Ignore, mark as "Correct by design"
   - NO → Continue to step 2

2. **Is it listed in "Real Issues to Fix"?**
   - YES → ❌ Fix immediately
   - NO → Continue to step 3

3. **Does it violate project-specific standards?**
   - Check sections above for pattern guidance
   - Evaluate if fix aligns with project architecture

### Step 3: Apply Fixes Selectively

**Fix immediately:**

- ✅ Missing `date: system-generated`
- ✅ Missing `skills_folder` variable
- ✅ Skills not explicitly loaded
- ✅ `.bmad-core/` path errors
- ✅ Missing `{communication_language}` in greetings

**Ignore (intentional):**

- ❌ Hardcoded `outputs/projects/` paths
- ❌ `{agent-folder}` variable usage
- ❌ (Maybe) `default_output_file` if documented pattern

**Evaluate case-by-case:**

- ⚠️ Unused variables (could be future features)
- ⚠️ Web bundle missing (only needed for deployment)

---

## Checklist: Interpreting Audit for New Workflows

When you audit a workflow in this project, use this checklist:

### Config Block Issues

- [ ] Missing `date: system-generated`? → ❌ FIX
- [ ] Uses `{agent-folder}`? → ✅ OK (project pattern)
- [ ] Uses explicit path like `{project-root}/bmad/...`? → ⚠️ EVALUATE (less portable)
- [ ] Missing `skills_folder`? → ❌ ADD (if agent has skills)
- [ ] Missing standard config variables? → ❌ FIX

### Path Issues

- [ ] Uses `outputs/projects/` hardcoded? → ✅ OK (mandatory structure)
- [ ] Uses `{output_folder}/projects/`? → ❌ WRONG (should be hardcoded)
- [ ] Uses `.bmad-core/` path? → ❌ FIX (should be `bmad/core/`)
- [ ] Uses `bmad/core/` path? → ✅ OK

### Skill Loading Issues

- [ ] HTML comments like `<!-- Claude invokes skill -->`? → ❌ FIX (use explicit loading)
- [ ] "Autonomous discovery" mentioned? → ❌ FIX (use explicit loading)
- [ ] Explicit `Load and follow {skills_folder}/...`? → ✅ OK (project pattern)
- [ ] `skills_folder` defined but not used? → ❌ FIX (add skill loading)

### Variable Usage

- [ ] `{communication_language}` in greetings? → ✅ Required
- [ ] `{user_name}` in completion messages? → ✅ Good practice (optional)
- [ ] `{date}` in output paths? → ✅ Required
- [ ] Unused variables? → ⚠️ EVALUATE (might be documentation)

### Web Bundle

- [ ] Missing web_bundle? → ⚠️ OPTIONAL (only for deployment)
- [ ] Needs deployment? → Add web_bundle
- [ ] Local-only? → Skip web_bundle

---

## Bloat vs Intentional Variables

### True Bloat (Remove These):

**Criteria:**

- Defined in YAML
- Never referenced in instructions or template
- Not used for documentation
- Not a future feature placeholder

**Example:**

```yaml
random_field: 'some value' # ← Never used anywhere = DELETE
```

### Intentional Variables (Keep These):

**Criteria:**

- Used for documentation (like `default_output_file`)
- Future feature placeholder (commented as such)
- Alternative implementation option
- Pattern documentation

**Example:**

```yaml
default_output_file: '...' # ← Documents intended pattern = KEEP
```

### Project Pattern Variables (Always Keep):

**Required for this project:**

- `skills_folder` - For skills-first architecture
- `voice_profile` - For voice matching (Jarvis)
- Any agent-specific critical paths

---

## Future Agent Creation Guidance

When creating new agents (or auditing existing), ensure:

### 1. Config Block Standard

```yaml
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
date: system-generated
skills_folder: '{project-root}/.claude/skills/{agent-name}' # If agent has skills
```

### 2. Output Paths Standard

```xml
# For content (NOT {output_folder}):
outputs/projects/{date}-{project_slug}/[00-05-stage]/{platform}/

# For documentation (YES {output_folder}):
{output_folder}/audit-reports/
{output_folder}/session-summaries/
```

### 3. Skill Loading Standard

```xml
<action>Load and follow {skills_folder}/{skill-name}/SKILL.md</action>
<action>Execute [task] per SKILL.md instructions with parameters...</action>
```

### 4. Notion Integration Paths

```xml
# CORRECT:
<action>Load {project-root}/bmad/core/modules/notion-updates.md</action>

# WRONG:
<action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
```

---

## Quick Reference: Audit Flags Translation

| Audit Says                          | Reality            | Action                         |
| ----------------------------------- | ------------------ | ------------------------------ |
| "Hardcoded outputs/projects/ paths" | ✅ Intentional     | IGNORE                         |
| "{agent-folder} non-standard"       | ✅ Project pattern | IGNORE (verify consistent use) |
| "Missing date variable"             | ❌ Real bug        | FIX IMMEDIATELY                |
| "skills_folder unused"              | ❌ Should be used  | ADD skill loading              |
| ".bmad-core/ invalid path"          | ❌ Real bug        | FIX (change to bmad/core/)     |
| "HTML comment skill hints"          | ❌ Broken pattern  | FIX (explicit loading)         |
| "Missing communication_language"    | ❌ Real bug        | FIX (add to greetings)         |
| "default_output_file unused"        | ⚠️ Evaluate        | OPTIONAL (doc value?)          |
| "Missing web_bundle"                | ⚠️ Optional        | DEFER until deployment         |

---

## Summary: Audit Interpretation Rules

### ✅ Fix These (Audit is Right):

- Missing standard config variables (date, communication_language, etc.)
- `.bmad-core/` path typos
- HTML comments for skill invocation
- Skills not explicitly loaded when skills_folder exists
- Missing {communication_language} in greetings

### ❌ Ignore These (Project Design):

- Hardcoded `outputs/projects/` structure
- `{agent-folder}` variable usage
- `skills_folder` variable (ensure it's USED, not removed!)

### ⚠️ Evaluate These (Case-by-Case):

- `default_output_file` unused (doc value?)
- Missing web_bundle (need deployment?)
- Other unused variables (future features?)

---

## Examples: Good vs Bad Audit Responses

### Example 1: Output Folder Flag

**Audit Output:**

```
❌ CRITICAL: Hardcoded outputs/projects/ paths
Recommendation: Replace with {output_folder} variable
```

**Good Response:**

```
✅ REVIEWED: This is intentional architecture (see outputs/README.md)
Action: NONE - Correct by design
```

**Bad Response:**

```
❌ Changed all outputs/projects/ to {output_folder}/projects/
Result: Broke entire output system
```

---

### Example 2: skills_folder Bloat Flag

**Audit Output:**

```
❌ BLOAT: skills_folder defined but not used
Recommendation: REMOVE variable
```

**Good Response:**

```
❌ INCORRECT DIAGNOSIS: Variable should be USED, not removed
Action: ADD explicit skill loading to instructions
Result: Load and follow {skills_folder}/content-writer/SKILL.md
```

**Bad Response:**

```
❌ Removed skills_folder variable
Result: Lost skill path reference, harder to maintain
```

---

### Example 3: {agent-folder} Variable Flag

**Audit Output:**

```
❌ CRITICAL: Non-standard {agent-folder} variable
Recommendation: Use {project-root}/bmad/module/config.yaml
```

**Good Response:**

```
✅ REVIEWED: Runtime context variable used in all 7 Jarvis workflows
Action: KEEP if consistent across agent, DOCUMENT as project pattern
Verify: Test workflow execution to confirm resolution
```

**Bad Response:**

```
❌ Changed to explicit paths in all workflows
Result: Less portable, inconsistent with agent activation
```

---

## Documentation for Future Audits

### Before Running Audit:

1. Read this document completely
2. Understand project-specific patterns
3. Note which agent you're auditing
4. Check if agent has skills (`.claude/skills/{agent}/`)

### During Audit:

1. Run audit-workflow normally
2. Collect all flagged issues
3. Filter using this guide (intentional vs real)
4. Create fix plan for real issues only

### After Audit:

1. Fix real issues (missing variables, typos, broken patterns)
2. Document any NEW project patterns discovered
3. Update this guide if standards evolve
4. Test workflows to verify fixes

---

## Version History

**v1.0 - 2025-11-03:**

- Initial learnings from write-posts, write-scripts audit
- Discovered outputs/ structure is intentional
- Discovered {agent-folder} is runtime context variable
- Standardized skill loading pattern across 6 workflows

**Future updates:**

- Add Zoe-specific patterns (when Zoe workflows created)
- Add Zoro-specific patterns (when Zoro workflows created)
- Document any new architectural patterns
- Refine standards as project evolves

---

## Key Takeaway

**The audit-workflow is a generic BMAD v6 compliance checker.**

**This project has intentional architectural choices that prioritize:**

1. Multi-agent coordination
2. Standardized content structure
3. Skills-first execution
4. Media reusability
5. Notion integration

**Always filter audit results through project context before applying fixes.**

**When in doubt:**

- Check if pattern is used consistently (>50% of workflows)
- Check if pattern is documented (CLAUDE.md, outputs/README.md, agent instructions)
- Check if pattern serves architectural purpose
- THEN decide: fix vs ignore vs evaluate

---

**Save this document. Reference it EVERY time you run audit-workflow on this project.**
