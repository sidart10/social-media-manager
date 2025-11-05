<!-- Powered by BMAD™ Core -->

# Task 4: Update Workflow Registry Status

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 15-20 minutes
**Dependencies:** Task 3 (workflow manifest cleaned)

---

## 🎯 Objective

Update `.bmad-core/data/workflow-registry.yaml` to mark existing workflows as "operational" instead of "needs_creation".

---

## 📋 Context

**File:** `.bmad-core/data/workflow-registry.yaml`

**Issues Found (from audit):**
Three workflows marked `status: needs_creation` but files actually exist:

1. **write-post** (lines ~234-283)
2. **write-script** (lines ~284-326)
3. **schedule-post** (lines ~513-568)

**Actual State:**

- ✅ `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/workflow.yaml` EXISTS
- ✅ `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/workflow.yaml` EXISTS
- ✅ `bmad/agents/zoro/zoro-sidecar/workflows/schedule-post/workflow.yaml` EXISTS

---

## ✅ Implementation Steps

### Step 1: Backup Registry

```bash
cp .bmad-core/data/workflow-registry.yaml .bmad-core/data/workflow-registry.yaml.backup-$(date +%Y%m%d)
```

### Step 2: Locate Workflows to Update

```bash
# Find write-post section
grep -n "name: write-post" .bmad-core/data/workflow-registry.yaml

# Find write-script section
grep -n "name: write-script" .bmad-core/data/workflow-registry.yaml

# Find schedule-post section
grep -n "name: schedule-post" .bmad-core/data/workflow-registry.yaml
```

### Step 3: Update write-post Status

Find and update (around line 238):

```yaml
# BEFORE
status: needs_creation
note: "Workflow does not exist yet - needs creation in Epic 2"

# AFTER
status: operational
note: "Workflow operational - created 2025-10-31, needs Epic 7 testing"
```

### Step 4: Update write-script Status

Find and update (around line 326):

```yaml
# BEFORE
status: needs_creation
note: "Workflow does not exist yet - needs creation in Epic 2"

# AFTER
status: operational
note: "Workflow operational - created 2025-10-31, needs Epic 7 testing"
```

### Step 5: Update schedule-post Status

Find and update (around line 568):

```yaml
# BEFORE
status: needs_creation
note: "Primary Postiz workflow - needs creation in Epic 4"

# AFTER
status: operational
note: "Workflow operational - created 2025-11-01, needs Cloudinary testing"
```

---

## 🧪 Validation

### Test 1: YAML Still Valid

```bash
# Validate YAML syntax
npm run validate:schemas

# Should pass with no errors
```

### Test 2: No "needs_creation" for Existing Workflows

```bash
# Search for needs_creation status
grep -n "status: needs_creation" .bmad-core/data/workflow-registry.yaml

# For each result, verify workflow actually doesn't exist
# If workflow exists, status is wrong and needs update
```

### Test 3: Verify Updated Workflows

```bash
# Check write-post status
grep -A1 "name: write-post$" .bmad-core/data/workflow-registry.yaml | grep "status:"
# Should show: status: operational

# Check write-script status
grep -A1 "name: write-script$" .bmad-core/data/workflow-registry.yaml | grep "status:"
# Should show: status: operational

# Check schedule-post status
grep -A1 "name: schedule-post$" .bmad-core/data/workflow-registry.yaml | grep "status:"
# Should show: status: operational
```

---

## ✅ Success Criteria

- [x] write-post marked as operational
- [x] write-script marked as operational
- [x] schedule-post marked as operational
- [x] Notes updated with creation dates and testing needs
- [x] YAML validation passes (npm run validate:schemas)
- [x] No "needs_creation" for workflows that exist

---

## 🔗 Related Tasks

**Previous:** Task 3 (Workflow manifest)
**Next:** Task 5 (Tool registry)
**Validates:** Registry accuracy

---

## 📝 Notes

**Workflow Status Values:**

- `operational` - Workflow exists and works
- `needs_creation` - Workflow planned but not built
- `deprecated` - Workflow exists but superseded
- `needs_testing` - Workflow exists but untested (use in note field instead)

**After Epic 7 Testing:**
Update notes to remove "needs testing" once validated

**Estimated Actual Time:** 15-20 minutes (3 status updates + validation)
