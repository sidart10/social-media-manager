# Workflow Audit Report

**Workflow:** write-posts
**Audit Date:** 2025-11-03
**Auditor:** Audit Workflow (BMAD v6)
**Workflow Type:** Action Workflow

---

## Executive Summary

**Overall Status:** ⚠️ **REQUIRES MODERATE FIXES**

- **Critical Issues: 5** (reduced from 7 - hardcoded paths are correct!)
  - Missing `date: system-generated` in YAML
  - Non-standard `{agent-folder}` variable usage
  - Invalid file path references (.bmad-core/ doesn't exist)
  - Missing web_bundle section for deployment
  - Invalid action syntax mixing markdown and pseudocode

- **Important Issues: 2**
  - Communication language not used in greeting
  - 28.6% bloat (2 unused YAML fields)

- **Cleanup Recommendations: 2**
  - Remove unused `skills_folder` variable
  - Remove or properly use `default_output_file` variable

---

## 1. Standard Config Block Validation

### ⚠️ CRITICAL ISSUES FOUND

**Problem 1: Non-Standard Config Source Variable**

- Found: `config_source: "{agent-folder}/config.yaml"`
- Expected: `config_source: "{project-root}/bmad/[module]/config.yaml"`
- Severity: **CRITICAL**
- Impact: The `{agent-folder}` variable is not a standard BMAD variable. Should use explicit path.

**Problem 2: Missing `date` Variable**

- The workflow.yaml is missing: `date: system-generated`
- This is required for agent date awareness
- Severity: **CRITICAL**

**Config Variables Check:**

✅ `config_source` is defined (but uses non-standard variable)
✅ `user_name` pulls from config_source
✅ `communication_language` pulls from config_source
✅ `output_folder` pulls from config_source
❌ `date` is NOT defined (MISSING)

**Additional Issues:**

- The config block uses `{agent-folder}` variable which is non-standard
- Should explicitly reference: `{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/config.yaml`

**Status:** ❌ **FAILED - 2 Critical Issues**

---

## 2. YAML/Instruction/Template Alignment

### ✅ Variable Usage Analysis

**YAML Variables Defined (excluding standard config):**

1. `voice_profile` = "{agent-folder}/jarvis-sidecar/memories.md"
2. `skills_folder` = "{project-root}/.claude/skills/jarvis"
3. `template` = false
4. `instructions` = "{installed_path}/instructions.md"
5. `elicitation` = true
6. `default_output_file` = "{output_folder}/posts/{platform}-{topic-slug}-{date}.md"

**Usage Analysis:**

✅ `voice_profile` - **USED** in instructions (line 19: "Read: {agent-folder}/jarvis-sidecar/memories.md")
❌ `skills_folder` - **UNUSED** (not referenced anywhere in instructions)
✅ `template` - **METADATA** (workflow engine uses this)
✅ `instructions` - **METADATA** (workflow engine uses this)
✅ `elicitation` - **METADATA** (workflow engine uses this)
⚠️ `default_output_file` - **NOT USED** (instructions hardcode output path logic instead)

**Hardcoded Values Analysis:**

✅ Line 169: `outputs/projects/{date}-{project_slug}/` - **CORRECT** (standardized structure)
✅ Line 177: `outputs/projects/{date}-{project_slug}/03-drafts/...` - **CORRECT** (standardized structure)
✅ Line 181: `outputs/projects/{date}-{project_slug}/03-drafts/...` - **CORRECT** (standardized structure)

**Note:** The `outputs/` folder is a mandatory standardized structure (see outputs/README.md). This is **intentional architecture**, not bloat.

**Bloat Detection:**

❌ **BLOAT FOUND:**

- `skills_folder` = Defined but never used (0 references)
- `default_output_file` = Defined but ignored (instructions use hardcoded path logic)

**Variables Analyzed:** 6 custom fields
**Used in Instructions:** 1 (voice_profile)
**Metadata (used by engine):** 3 (template, instructions, elicitation)
**Unused (Bloat):** 2 (skills_folder, default_output_file)

---

## 3. Config Variable Usage & Instruction Quality

### Config Variable Usage

❌ **Communication Language:** NOT USED

- Variable defined in YAML but never referenced in instructions
- Should communicate in {communication_language} in step 1 greeting

✅ **User Name:** USED CORRECTLY

- Line 328: "Display summary to {user_name} in {communication_language}"
- Proper personalization in workflow completion

✅ **Output Folder:** CORRECTLY USES STANDARDIZED STRUCTURE

- Instructions use `outputs/projects/` paths (lines 169, 177, 181) - **This is intentional**
- The `outputs/` folder is a **standardized mandatory structure** (see outputs/README.md)
- All agents use `outputs/projects/{date}-{slug}/` consistently
- The `{output_folder}` variable points to `docs/` for documentation, not content
- **NOT AN ISSUE** - This is correct architecture

❌ **Date:** NOT AVAILABLE

- Variable not defined in YAML (missing `date: system-generated`)
- Instructions reference {date} in output paths but it won't work
- Lines 169, 177, 181 use `{date}` but it's undefined

### Nested Tag References (XML Clarity Issues)

⚠️ **FOUND: 1 instance**

**Line 303:** `<template-output>workflow_complete</template-output>`

- This is a VALID use of template-output tag (correctly closed)
- However, the tag name appears within instructions discussing workflow behavior
- RECOMMENDATION: This is acceptable since it's an actual XML tag, not a description

### Conditional Execution Antipatterns

✅ **NO ANTIPATTERNS FOUND**

- All conditional logic uses proper `<check if="condition">...</check>` wrappers
- Examples:
  - Lines 47-53: Proper check block for Twitter format
  - Lines 58-62: Proper check block for reference file
  - Lines 287-301: Proper check blocks for user options

### Other Instruction Quality Issues

❌ **CRITICAL: Invalid action syntax (lines 19-30)**

```xml
<action>**Load voice profile:** - Read: {agent-folder}/jarvis-sidecar/memories.md - Extract: Enhanced Voice Profile v2.0 section - Check confidence: Should be ≥8/10 for best results

    if voice_profile not found:
      display("⚠️ No voice profile found!")
```

- Problem: Mixing markdown bold with Python-style pseudocode inside action tag
- Should use proper XML: `<action if="voice_profile not found">Display warning</action>`

❌ **Line 199:** References non-existent file

- `Load {project-root}/.bmad-core/modules/notion-updates.md`
- This path doesn't exist (should be `bmad/core/` not `.bmad-core/`)

**Communication Language:** ❌ NOT USED (only in 1 place, missing from greeting)
**User Name:** ✅ USED CORRECTLY
**Output Folder:** ❌ HARDCODED PATHS (critical issue)
**Date:** ❌ UNDEFINED (YAML missing date variable)
**Nested Tag References:** 0 problematic instances (1 valid template-output tag)

---

## 4. Web Bundle Validation

❌ **CRITICAL: No web_bundle section found in workflow.yaml**

**Impact:**

- This workflow cannot be deployed to web version
- No dependency tracking for remote execution
- Missing file manifests

**Required for deployment:**

```yaml
web_bundle:
  name: 'write-posts'
  description: 'Generate platform-optimized social media posts with voice matching'
  author: 'Jarvis (Content Intelligence)'
  version: '1.0.0'

  web_bundle_files:
    - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/config.yaml'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/memories.md'
```

**Workflow Dependencies Found in Instructions:**

✅ **File References:**

- Line 19: `{agent-folder}/jarvis-sidecar/memories.md` (voice profile)
- Line 199: `{project-root}/.bmad-core/modules/notion-updates.md` (INVALID PATH)
- Line 200: `{project-root}/.bmad-core/modules/notion-relational-helpers.md` (INVALID PATH)

❌ **invoke-workflow Tags:** None found

- No existing_workflows field needed

**Web Bundle Present:** ❌ NO
**Files Listed:** 0
**Missing Files:** 4 minimum (workflow.yaml, instructions.md, config.yaml, memories.md)

---

## 5. Bloat Detection

### Bloat Analysis Summary

**Total YAML Fields:** 11 (excluding comments and metadata)

- Standard config: 4 (config_source, user_name, communication_language, output_folder)
- Workflow-specific: 7 (name, description, author, version, voice_profile, skills_folder, template, instructions, elicitation, default_output_file)

**Used Fields:** 9
**Unused Fields (Bloat):** 2

**Bloat Items:**

1. ❌ **`skills_folder`** - Defined but never referenced
   - Line: `skills_folder: "{project-root}/.claude/skills/jarvis"`
   - Impact: Adds clutter, suggests unimplemented feature
   - Recommendation: REMOVE (skills are loaded by agent, not workflow)

2. ❌ **`default_output_file`** - Defined but ignored in favor of hardcoded logic
   - Line: `default_output_file: "{output_folder}/posts/{platform}-{topic-slug}-{date}.md"`
   - Impact: Misleading - suggests dynamic output but instructions hardcode paths
   - Recommendation: Either USE this variable properly OR REMOVE it

**Hardcoded Values That Should Be Variables:**

3. ✅ **"outputs/projects/" paths are CORRECT** (lines 169, 177, 181)
   - This is **intentional standardized architecture**
   - See: `outputs/README.md` for mandatory structure
   - Impact: None - this is correct by design
   - Recommendation: **NO CHANGE NEEDED**

4. ⚠️ **Hardcoded path prefix ".bmad-core/"** (lines 199-200)
   - Should be: `bmad/core/`
   - Impact: References non-existent paths
   - Recommendation: Fix path to match actual structure

**Bloat Metrics:**

- Total custom fields: 7
- Unused fields: 2
- **Bloat Percentage: 28.6%** (2 unused / 7 custom fields)
- **Cleanup Potential: HIGH** - Removing 2 unused fields + fixing 3 hardcoded paths

**Bloat Percentage:** 28.6%
**Cleanup Potential:** HIGH (5 items to fix)

---

## 6. Template Variable Mapping

✅ **SKIPPED - Action Workflow**

This workflow has `template: false`, indicating it's an action workflow that doesn't generate documents from templates.

No template variable mapping analysis needed.

**Template Variables:** N/A (Action workflow - no template)
**Mapped Correctly:** N/A
**Missing Mappings:** N/A

---

## Recommendations

### Critical (Fix Immediately)

1. **Add missing `date` variable to workflow.yaml**

   ```yaml
   date: system-generated
   ```

   - Location: After `output_folder` in standard config block
   - Impact: Fixes undefined variable usage in instructions

2. **Fix `config_source` to use standard path**

   ```yaml
   # Change from:
   config_source: "{agent-folder}/config.yaml"
   # To:
   config_source: "{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/config.yaml"
   ```

3. ~~**Replace hardcoded "outputs/projects/" with {output_folder}**~~ **CANCELLED - NOT AN ISSUE**
   - The `outputs/projects/` path is **intentionally hardcoded** (standardized structure)
   - See `outputs/README.md` - this is mandatory architecture
   - **NO CHANGE NEEDED**

4. **Fix invalid file paths in instructions (lines 199-200)**

   ```xml
   # Change from:
   Load {project-root}/.bmad-core/modules/notion-updates.md
   # To:
   Load {project-root}/bmad/core/modules/notion-updates.md
   ```

5. **Add web_bundle section for deployment**

   ```yaml
   web_bundle:
     name: 'write-posts'
     description: 'Generate platform-optimized social media posts with voice matching'
     author: 'Jarvis (Content Intelligence)'
     version: '1.0.0'
     web_bundle_files:
       - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml'
       - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md'
       - 'bmad/agents/content-intelligence/jarvis-sidecar/config.yaml'
       - 'bmad/agents/content-intelligence/jarvis-sidecar/memories.md'
   ```

6. **Fix invalid action syntax (lines 19-30)**
   - Replace Python-style pseudocode with proper XML conditional blocks
   - Use `<check if="condition">...</check>` wrapper instead of inline if statements

7. **Remove undefined {date} references if date variable not added**
   - OR properly define `date: system-generated` in YAML (recommended)

### Important (Address Soon)

1. **Add {communication_language} usage in greeting (Step 1)**

   ```xml
   <action>Display in {communication_language}:
     ✍️ Write Posts - Voice-Matched Content Generation
   </action>
   ```

2. **Reduce bloat - remove unused variables**
   - Consider removing `skills_folder` (not used)
   - Either use or remove `default_output_file`

### Cleanup (Nice to Have)

1. **Remove `skills_folder` variable** - Defined but never used
   - Line 20 in workflow.yaml
   - Skills are loaded at agent level, not needed in workflow

2. **Decide on `default_output_file` usage**
   - Either: Implement it properly in instructions
   - Or: Remove it (instructions use custom logic instead)

---

## Validation Checklist

Use this checklist to verify fixes:

- [ ] All standard config variables present and correct
- [ ] No unused yaml fields (bloat removed)
- [ ] Config variables used appropriately in instructions
- [ ] Web bundle includes all dependencies
- [ ] Template variables properly mapped
- [ ] File structure follows v6 conventions

---

## Next Steps

1. Review critical issues and fix immediately
2. Address important issues in next iteration
3. Consider cleanup recommendations for optimization
4. Re-run audit after fixes to verify improvements

---

**Audit Complete** - Generated by audit-workflow v1.0
