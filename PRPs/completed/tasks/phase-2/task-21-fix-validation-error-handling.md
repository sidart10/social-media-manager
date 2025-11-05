<!-- Powered by BMAD™ Core -->

# Task 21: Fix Validation Script Error Handling

**Phase:** 2 (BMad Workflow Standardization)
**Priority:** HIGH
**Estimated Time:** 20-30 minutes
**Dependencies:** Tasks 2, 3 (validation scripts exist)

---

## 🎯 Objective

Update all validation scripts to use proper EXIT_CODE pattern for CI/CD compatibility.

---

## 📋 Context

**Current Issue:**
Validation scripts in Tasks 2 and 3 don't set proper exit codes on failure.

**BMad Standard Pattern:**

```bash
#!/bin/bash
EXIT_CODE=0  # Start with success

# Run checks
if [ condition ]; then
  echo "✅ PASS"
else
  echo "❌ FAIL"
  EXIT_CODE=1  # Mark failure
fi

exit $EXIT_CODE  # Return proper code
```

**Why Critical:**

- Scripts can be chained with && operators
- CI/CD pipelines need proper exit codes
- npm scripts fail-fast behavior

---

## ✅ Implementation Steps

### Step 1: Update Agent Manifest Validation

**File:** Created in Task 2 or save as `test/validate-agent-manifest.sh`

Add EXIT_CODE handling:

```bash
#!/bin/bash
# Powered by BMAD™ Core
EXIT_CODE=0

echo "=== AGENT MANIFEST VALIDATION ==="

# Test 1: No duplicates
DUPES=$(sort bmad/_cfg/agent-manifest.csv | uniq -d | wc -l)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
  EXIT_CODE=1
fi

# Test 2: All paths exist
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r name _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ Path valid: $path"
  else
    echo "❌ Path missing: $path"
    EXIT_CODE=1
  fi
done

# Test 3: No standalone/ references
if grep -q "bmad/standalone/" bmad/_cfg/agent-manifest.csv; then
  echo "❌ Found standalone/ references (directory doesn't exist)"
  EXIT_CODE=1
else
  echo "✅ No standalone/ references"
fi

exit $EXIT_CODE
```

### Step 2: Update Workflow Manifest Validation

**File:** Created in Task 3 or save as `test/validate-workflow-manifest.sh`

```bash
#!/bin/bash
# Powered by BMAD™ Core
EXIT_CODE=0

echo "=== WORKFLOW MANIFEST VALIDATION ==="

# Test 1: No duplicates
DUPES=$(sort bmad/_cfg/workflow-manifest.csv | uniq -d | wc -l)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
  EXIT_CODE=1
fi

# Test 2: All paths exist
tail -n +2 bmad/_cfg/workflow-manifest.csv | while IFS=, read -r name _ _ path _; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ Workflow exists: $name"
  else
    echo "❌ Workflow missing: $name → $path"
    EXIT_CODE=1
  fi
done

exit $EXIT_CODE
```

### Step 3: Create File Structure Validation

**File:** `test/validate-file-structure.sh` (from PRP Gate 1)

```bash
#!/bin/bash
# Powered by BMAD™ Core
EXIT_CODE=0

echo "=== FILE STRUCTURE VALIDATION ==="

# Agent files
echo -e "\n1. Agent Files:"
for agent in bmad/agents/content-intelligence/jarvis.md bmad/agents/zoe/zoe.md bmad/agents/zoro/zoro.md; do
  if [ -f "$agent" ]; then
    echo "✅ $(basename $agent)"
  else
    echo "❌ Missing: $agent"
    EXIT_CODE=1
  fi
done

# Workflow count
echo -e "\n2. Workflows:"
WF_COUNT=$(find bmad -name "workflow.yaml" | wc -l)
if [ "$WF_COUNT" -ge 16 ]; then
  echo "✅ Found $WF_COUNT workflows (expected: 16+)"
else
  echo "⚠️  Only $WF_COUNT workflows (expected: 16+)"
fi

# Skill count
echo -e "\n3. Skills:"
SKILL_COUNT=$(find .claude/skills -name "SKILL.md" | wc -l)
if [ "$SKILL_COUNT" -ge 24 ]; then
  echo "✅ Found $SKILL_COUNT skills (expected: 24)"
else
  echo "⚠️  Only $SKILL_COUNT skills (expected: 24)"
fi

# Registry files
echo -e "\n4. Registry Files:"
test -f bmad/_cfg/agent-manifest.csv && echo "✅ Agent manifest" || { echo "❌ Agent manifest missing"; EXIT_CODE=1; }
test -f bmad/_cfg/workflow-manifest.csv && echo "✅ Workflow manifest" || { echo "❌ Workflow manifest missing"; EXIT_CODE=1; }
test -f .bmad-core/data/tool-registry.yaml && echo "✅ Tool registry" || { echo "❌ Tool registry missing"; EXIT_CODE=1; }
test -f .bmad-core/data/workflow-registry.yaml && echo "✅ Workflow registry" || { echo "❌ Workflow registry missing"; EXIT_CODE=1; }

exit $EXIT_CODE
```

### Step 4: Create Registries Validation

**File:** `test/validate-registries.sh` (from PRP Gate 2)

```bash
#!/bin/bash
# Powered by BMAD™ Core
EXIT_CODE=0

echo "=== REGISTRY VALIDATION ==="

# Run agent manifest validation
bash test/validate-agent-manifest.sh
AGENT_EXIT=$?

# Run workflow manifest validation
bash test/validate-workflow-manifest.sh
WORKFLOW_EXIT=$?

if [ $AGENT_EXIT -ne 0 ] || [ $WORKFLOW_EXIT -ne 0 ]; then
  EXIT_CODE=1
fi

echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ ALL REGISTRIES VALID"
else
  echo "❌ REGISTRY ERRORS FOUND - Review above"
fi

exit $EXIT_CODE
```

### Step 5: Make Scripts Executable

```bash
chmod +x test/validate-*.sh
```

---

## 🧪 Validation

### Test Error Handling Works

```bash
# Test success case (should exit 0)
bash test/validate-file-structure.sh
echo "Exit code: $?"

# Test can chain with &&
bash test/validate-file-structure.sh && echo "✅ Chaining works"

# Test npm integration
npm run test
# Should stop on first failure
```

---

## ✅ Success Criteria

- [x] All validation scripts have EXIT_CODE=0 initialization
- [x] All check failures set EXIT_CODE=1
- [x] All scripts end with `exit $EXIT_CODE`
- [x] Scripts executable (chmod +x)
- [x] Can chain with && operators
- [x] npm scripts respect exit codes

---

## 🔗 Related Tasks

**Updates:** Scripts from Tasks 2, 3
**Enables:** npm pre-deploy chaining (Task 23)

---

**Estimated Actual Time:** 20-30 minutes
