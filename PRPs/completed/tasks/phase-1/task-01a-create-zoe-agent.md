<!-- Powered by BMAD™ Core -->

# Task 1A: Create bmad/agents/zoe/zoe.md

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 15-20 minutes
**Dependencies:** None

---

## 🎯 Objective

Create the missing primary agent file for Zoe at `bmad/agents/zoe/zoe.md` following BMad dual-location pattern.

---

## 📋 Context

**Current State:**

- ✅ `.claude/commands/social-media-team/zoe.md` exists (95% complete)
- ❌ `bmad/agents/zoe/zoe.md` MISSING (breaks BMad dual-location pattern)
- ✅ `bmad/agents/zoe/zoe-sidecar/` exists with all workflows

**Why Critical:**

- BMad convention requires BOTH primary (bmad/) and discovery (.claude/commands/) files
- Jarvis follows this pattern correctly
- Zoe and Zoro missing primary files

---

## ✅ Implementation Steps

### Step 1: Copy Existing File (EASIEST APPROACH)

The .claude/commands version is already complete! Just copy it:

```bash
# Copy from slash commands to bmad location
cp .claude/commands/social-media-team/zoe.md bmad/agents/zoe/zoe.md
```

### Step 2: Update Agent ID (If Needed)

Check if the `id` attribute needs updating:

```bash
# Check current ID
grep '<agent id=' bmad/agents/zoe/zoe.md
```

Should be:

```xml
<agent id="bmad/agents/zoe/zoe.md" name="Zoe" ...>
```

If different, update it:

```xml
<!-- Change from: -->
<agent id="" name="Zoe" ...>

<!-- To: -->
<agent id="bmad/agents/zoe/zoe.md" name="Zoe" ...>
```

### Step 3: Verify Sidecar Paths

Check that all sidecar references are correct:

```bash
# Should reference: bmad/agents/zoe/zoe-sidecar/
grep -n "zoe-sidecar" bmad/agents/zoe/zoe.md
```

Expected paths in file:

- `{project-root}/bmad/agents/zoe/config.yaml`
- `bmad/agents/zoe/zoe-sidecar/instructions.md`
- `bmad/agents/zoe/zoe-sidecar/memories.md`
- `bmad/agents/zoe/zoe-sidecar/workflows/*/workflow.yaml`

### Step 4: Verify Workflow References

Check that menu items reference correct workflow paths:

```bash
# All workflows should be in zoe-sidecar/workflows/
grep 'workflow="' bmad/agents/zoe/zoe.md
```

Expected pattern:

```xml
<item cmd="*create-image" workflow="bmad/agents/zoe/zoe-sidecar/workflows/create-single-image/workflow.yaml">
```

---

## 🧪 Validation

### Test 1: File Exists

```bash
test -f bmad/agents/zoe/zoe.md && echo "✅ File created" || echo "❌ File missing"
```

### Test 2: Valid Structure

```bash
# Check has YAML frontmatter
head -5 bmad/agents/zoe/zoe.md | grep -q "^---$" && echo "✅ Has YAML frontmatter" || echo "❌ Missing frontmatter"

# Check has XML agent tag
grep -q '<agent id=' bmad/agents/zoe/zoe.md && echo "✅ Has agent XML" || echo "❌ Missing agent tag"
```

### Test 3: Correct Paths

```bash
# Verify sidecar path correct
grep -q "bmad/agents/zoe/zoe-sidecar" bmad/agents/zoe/zoe.md && echo "✅ Sidecar path correct" || echo "❌ Wrong sidecar path"

# Check workflow count (should be 8)
WORKFLOW_COUNT=$(grep -c 'workflow="' bmad/agents/zoe/zoe.md)
echo "Workflows referenced: $WORKFLOW_COUNT (expected: 8)"
```

### Test 4: Agent ID Correct

```bash
# Should match file location
grep '<agent id="bmad/agents/zoe/zoe.md"' bmad/agents/zoe/zoe.md && echo "✅ Agent ID correct" || echo "⚠️  ID may need update"
```

---

## ✅ Success Criteria

- [x] File exists at `bmad/agents/zoe/zoe.md`
- [x] Has YAML frontmatter (name, description)
- [x] Has XML structure with `<agent>` tag
- [x] Agent ID matches file path
- [x] Sidecar references correct (zoe-sidecar/)
- [x] All 8 workflows referenced
- [x] Skills section lists 9+ skills
- [x] Activation has 12+ steps
- [x] menu-handlers includes workflow handler with workflow.xml loading

---

## 🔗 Related Tasks

**Next:** Task 1B (Create zoro.md)
**Blocks:** Task 2 (Agent manifest update needs this file)
**Enables:** Phase 1 validation scripts

---

## 📝 Notes

- If .claude/commands version has any issues, use bmad/agents/content-intelligence/jarvis.md as additional template
- The .claude/commands version already follows BMad v6 standards (verified in research)
- No need to rebuild from scratch - copy and minor adjustments only

**Estimated Actual Time:** 10-15 minutes (simple copy + verification)
