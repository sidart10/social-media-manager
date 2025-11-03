<!-- Powered by BMAD™ Core -->

# Task 3: Clean Workflow Manifest

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 30-40 minutes
**Dependencies:** Task 2 (agent manifest pattern reference)

---

## 🎯 Objective

Clean `bmad/_cfg/workflow-manifest.csv` by removing duplicates, verifying all paths exist, and ensuring accurate module references.

---

## 📋 Context

**File:** `bmad/_cfg/workflow-manifest.csv`

**Current Issues (from audit):**

- Duplicate entries (lines 16-17 duplicate 2-3)
- Incorrect module references
- Some workflows may point to wrong paths

**Expected Workflow Count:** 16+ workflows

- Core workflows: 2 (brainstorming, party-mode)
- Jarvis workflows: 7 (research-topic, write-posts, write-scripts, etc.)
- Zoe workflows: 8 (create-single-image, create-carousel, etc.)
- Zoro workflows: 1+ (schedule-post, etc.)

---

## ✅ Implementation Steps

### Step 1: Backup Current File

```bash
cp bmad/_cfg/workflow-manifest.csv bmad/_cfg/workflow-manifest.csv.backup-$(date +%Y%m%d)
```

### Step 2: Discover All Workflows

Scan filesystem for actual workflow.yaml files:

```bash
# Find all workflows
find bmad -name "workflow.yaml" -type f | sort

# Count them
find bmad -name "workflow.yaml" -type f | wc -l
```

### Step 3: Build Fresh Manifest

For each workflow found, extract details and verify:

```bash
#!/bin/bash
# Script to rebuild workflow manifest

echo 'name,description,module,path,standalone' > workflow-manifest-new.csv

find bmad -name "workflow.yaml" -type f | while read wf; do
  # Extract workflow name
  NAME=$(grep "^name:" "$wf" | head -1 | cut -d: -f2 | xargs)

  # Extract description
  DESC=$(grep "^description:" "$wf" | head -1 | cut -d: -f2- | xargs)

  # Determine module from path
  if echo "$wf" | grep -q "bmad/core/"; then
    MODULE="core"
  elif echo "$wf" | grep -q "bmad/bmb/"; then
    MODULE="bmb"
  elif echo "$wf" | grep -q "bmad/agents/"; then
    MODULE="agents"
  else
    MODULE="unknown"
  fi

  # Determine standalone
  STANDALONE=$(grep "^standalone:" "$wf" | cut -d: -f2 | xargs)
  [ -z "$STANDALONE" ] && STANDALONE="false"

  # Add to manifest
  echo "\"$NAME\",\"$DESC\",\"$MODULE\",\"$wf\",\"$STANDALONE\""
done | sort >> workflow-manifest-new.csv

# Show result
cat workflow-manifest-new.csv
```

### Step 4: Verify All Paths

```bash
# Check every workflow path exists
tail -n +2 workflow-manifest-new.csv | while IFS=, read -r name _ _ path _; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ $name → $path"
  else
    echo "❌ $name → $path (NOT FOUND)"
  fi
done
```

### Step 5: Replace Manifest

```bash
# If validation passes, replace original
mv workflow-manifest-new.csv bmad/_cfg/workflow-manifest.csv
```

---

## 🧪 Validation

### Validation Script

Save as `test/validate-workflow-manifest.sh`:

```bash
#!/bin/bash
# Powered by BMAD™ Core
# Validate workflow manifest accuracy

EXIT_CODE=0

echo "=== WORKFLOW MANIFEST VALIDATION ==="

# Test 1: No duplicates
echo -e "\n1. Checking for duplicates..."
DUPES=$(sort bmad/_cfg/workflow-manifest.csv | uniq -d)
if [ -z "$DUPES" ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found duplicates:"
  echo "$DUPES"
  EXIT_CODE=1
fi

# Test 2: All paths exist
echo -e "\n2. Checking all workflow paths..."
MISSING=0
tail -n +2 bmad/_cfg/workflow-manifest.csv | while IFS=, read -r name _ _ path _; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ $name → $path"
  else
    echo "❌ $name → $path (FILE NOT FOUND)"
    MISSING=$((MISSING + 1))
    EXIT_CODE=1
  fi
done

if [ $MISSING -eq 0 ]; then
  echo "✅ All workflow paths valid"
fi

# Test 3: Expected workflow count
echo -e "\n3. Checking workflow count..."
WF_COUNT=$(tail -n +2 bmad/_cfg/workflow-manifest.csv | wc -l)
if [ "$WF_COUNT" -ge 16 ]; then
  echo "✅ Workflow count: $WF_COUNT (expected: 16+)"
else
  echo "⚠️  Workflow count: $WF_COUNT (expected: 16+)"
fi

# Summary
echo -e "\n=== VALIDATION SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ WORKFLOW MANIFEST VALID"
else
  echo "❌ WORKFLOW MANIFEST HAS ERRORS - Review above"
fi

exit $EXIT_CODE
```

### Run Validation

```bash
chmod +x test/validate-workflow-manifest.sh
bash test/validate-workflow-manifest.sh
```

---

## ✅ Success Criteria

- [x] No duplicate entries in CSV
- [x] All workflow paths exist on filesystem
- [x] Correct module references (core, bmb, agents)
- [x] Workflow count ≥16
- [x] Valid CSV format
- [x] Validation script exits with code 0

---

## 🔗 Related Tasks

**Requires:** Tasks 1A, 1B completed
**Next:** Task 4 (Update workflow registry status)
**Validates:** Task 3 + Phase 1 gate

---

## 📝 Notes

**CSV Columns:**

1. name - Workflow identifier
2. description - One-line purpose
3. module - core | bmb | agents
4. path - Relative path from project root
5. standalone - true | false

**Modules:**

- core: Framework workflows (brainstorming, party-mode)
- bmb: Builder workflows (create-agent, audit-workflow, etc.)
- agents: Domain workflows (research-topic, create-image, schedule-post, etc.)

**Estimated Actual Time:** 30-40 minutes (scanning + verification + rebuild)
