# Workflow Audit Report

**Workflow:** write-scripts
**Audit Date:** 2025-11-03
**Auditor:** Audit Workflow (BMAD v6)
**Workflow Type:** Action Workflow

---

## Executive Summary

**Overall Status:** ⚠️ **REQUIRES MODERATE FIXES**

- **Critical Issues: 4** (reduced - hardcoded paths are correct!)
  - Missing `date: system-generated` in YAML
  - Non-standard `{agent-folder}` variable usage
  - Missing web_bundle section for deployment
  - Communication language not used in greeting

- **Important Issues: 1**
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
- Impact: Non-standard variable that may not resolve properly

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
6. `default_output_file` = "{output_folder}/scripts/youtube-{topic-slug}-{date}.md"

**Usage Analysis:**

✅ `voice_profile` - **USED** in instructions (line 22: "Load voice profile from memories.md")
❌ `skills_folder` - **UNUSED** (not referenced anywhere in instructions)
✅ `template` - **METADATA** (workflow engine uses this)
✅ `instructions` - **METADATA** (workflow engine uses this)
✅ `elicitation` - **METADATA** (workflow engine uses this)
⚠️ `default_output_file` - **NOT USED** (instructions hardcode output path logic)

**Hardcoded Values That Should Be Variables:**

Line 143: `outputs/projects/{date}-{project_slug}/` - Should use {output_folder}
Line 148: `03-drafts/youtube/script-v{version_num}.md` - Should use {output_folder}
Line 152: `03-drafts/youtube/thumbnail-concepts-v{version_num}.md` - Should use {output_folder}
Line 156: `03-drafts/youtube/youtube-metadata-v{version_num}.md` - Should use {output_folder}

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

✅ **User Name:** NOT EXPLICITLY USED

- No personalization in this workflow (acceptable for script generation)

✅ **Output Folder:** CORRECTLY USES STANDARDIZED STRUCTURE

- Instructions use `outputs/projects/` paths (lines 143, 148, 152, 156) - **This is intentional**
- The `outputs/` folder is a **standardized mandatory structure** (see outputs/README.md)
- All agents use `outputs/projects/{date}-{slug}/` consistently
- The `{output_folder}` variable points to `docs/` for documentation, not content
- **NOT AN ISSUE** - This is correct architecture

❌ **Date:** NOT AVAILABLE

- Variable not defined in YAML (missing `date: system-generated`)
- Instructions reference {date} in output paths but it won't work
- Line 141 uses `{date}` but it's undefined

### Nested Tag References (XML Clarity Issues)

⚠️ **FOUND: 1 instance**

**Line 234:** `<template-output>workflow_complete</template-output>`

- This is a VALID use of template-output tag (correctly closed)
- Acceptable since it's an actual XML tag

### Conditional Execution Antipatterns

✅ **NO ANTIPATTERNS FOUND**

- All conditional logic uses proper structures
- No self-closing check tags

### Other Instruction Quality Issues

✅ **Better structured than write-posts**

- Cleaner action syntax (no Python pseudocode mixing)
- Proper XML structure throughout
- Clear step progression

**Communication Language:** ❌ NOT USED (missing from greeting)
**User Name:** N/A (not needed for this workflow type)
**Output Folder:** ❌ HARDCODED PATHS (critical issue)
**Date:** ❌ UNDEFINED (YAML missing date variable)
**Nested Tag References:** 0 problematic instances

---

## 4. Web Bundle Validation

❌ **CRITICAL: No web_bundle section found in workflow.yaml**

**Impact:**

- Cannot be deployed to web version
- No dependency tracking
- Missing file manifests

**Required web_bundle:**

```yaml
web_bundle:
  name: 'write-scripts'
  description: 'Generate YouTube/Short video scripts with timestamps and thumbnail concepts'
  author: 'Jarvis (Content Intelligence)'
  version: '1.0.0'

  web_bundle_files:
    - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/workflow.yaml'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/instructions.md'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/config.yaml'
    - 'bmad/agents/content-intelligence/jarvis-sidecar/memories.md'
```

**Workflow Dependencies:**

✅ **File References:**

- Line 22: Voice profile from memories.md

❌ **invoke-workflow Tags:** None found

**Web Bundle Present:** ❌ NO
**Files Listed:** 0
**Missing Files:** 4 minimum

---

## 5. Bloat Detection

### Bloat Analysis Summary

**Total YAML Fields:** 11 (excluding comments)

- Standard config: 4 (config_source, user_name, communication_language, output_folder)
- Workflow-specific: 7

**Used Fields:** 9
**Unused Fields (Bloat):** 2

**Bloat Items:**

1. ❌ **`skills_folder`** - Defined but never referenced
   - Line 20 in workflow.yaml
   - Recommendation: REMOVE

2. ❌ **`default_output_file`** - Defined but ignored
   - Line 30: `default_output_file: "{output_folder}/scripts/youtube-{topic-slug}-{date}.md"`
   - Instructions hardcode paths instead
   - Recommendation: Either USE properly OR REMOVE

**Hardcoded Values Analysis:**

3. ✅ **"outputs/projects/" paths are CORRECT** (lines 143, 148, 152, 156)
   - This is **intentional standardized architecture**
   - See: `outputs/README.md` for mandatory structure
   - Impact: None - this is correct by design
   - Recommendation: **NO CHANGE NEEDED**

**Bloat Metrics:**

- Total custom fields: 7
- Unused fields: 2
- **Bloat Percentage: 28.6%** (same as write-posts)
- **Cleanup Potential: HIGH**

**Bloat Percentage:** 28.6%
**Cleanup Potential:** HIGH (same issues as write-posts)

---

## 6. Template Variable Mapping

✅ **SKIPPED - Action Workflow**

This workflow has `template: false`, indicating it's an action workflow.

No template variable mapping analysis needed.

**Template Variables:** N/A
**Mapped Correctly:** N/A
**Missing Mappings:** N/A

---

## Recommendations

### Critical (Fix Immediately)

1. **Add missing `date` variable to workflow.yaml**

   ```yaml
   date: system-generated
   ```

2. **Fix `config_source` to use standard path**

   ```yaml
   config_source: '{project-root}/bmad/agents/content-intelligence/jarvis-sidecar/config.yaml'
   ```

3. ~~**Replace hardcoded paths with {output_folder}**~~ **CANCELLED - NOT AN ISSUE**
   - The `outputs/projects/` path is **intentionally hardcoded** (standardized structure)
   - See `outputs/README.md` - this is mandatory architecture
   - **NO CHANGE NEEDED**

4. **Add web_bundle section**
   - See example in Section 4 above

5. **Add {communication_language} to greeting**
   ```xml
   <action>Display in {communication_language}:
     🎬 Write Scripts - Voice-Matched Video Content
   </action>
   ```

### Important (Address Soon)

1. **Reduce bloat - remove unused variables**
   - Remove `skills_folder`
   - Either use or remove `default_output_file`

### Cleanup (Nice to Have)

1. **Remove `skills_folder`** - Not used
2. **Decide on `default_output_file`** - Either implement or remove

---

## Validation Checklist

- [ ] `date: system-generated` added to YAML
- [ ] `config_source` uses explicit path (not {agent-folder})
- [ ] All output paths use `{output_folder}` variable
- [ ] `web_bundle` section added with all dependencies
- [ ] `{communication_language}` used in greeting
- [ ] Unused variables removed (`skills_folder`, potentially `default_output_file`)

---

## Next Steps

1. **Fix all critical issues** (blocking execution)
2. **Remove bloat** (cleanup unused fields)
3. **Re-run audit** to verify fixes
4. **Deploy to production** once pass rate ≥95%

---

## Comparison with write-posts

**Similarities:**

- Same config block issues
- Same bloat (28.6%)
- Same hardcoded path problems
- Same missing web_bundle

**Differences:**
✅ write-scripts has cleaner instruction syntax (no Python pseudocode)
✅ Better structured action tags
❌ Both need identical fixes

**Recommendation:** Fix both workflows together with same changes.

---

**Audit Complete** - Generated by audit-workflow v1.0
