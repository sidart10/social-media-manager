<!-- Powered by BMAD™ Core -->

# Task 13: Audit Workflows for External Instructions Pattern

**Phase:** 2 (BMad Workflow Standardization)
**Priority:** HIGH
**Estimated Time:** 45-60 minutes
**Dependencies:** Phase 1 complete

---

## 🎯 Objective

Ensure ALL workflows follow BMad v6 standard: external `instructions.md` files (not embedded in YAML). This is Epic 8 requirement.

---

## 📋 Context

**BMad v6 Standard:**

```yaml
# ✅ CORRECT - External instructions
instructions: '{installed_path}/instructions.md'

# ❌ WRONG - Embedded instructions (anti-pattern)
steps:
  - name: Step 1
    instructions: |
      Embedded content...
```

**Expected:**

- ✅ Jarvis workflows: Already use external pattern (7 workflows)
- ⚠️ Zoe workflows: May have embedded (8 workflows to check)
- ⚠️ Zoro workflows: May have embedded (1+ workflows to check)

---

## ✅ Implementation Steps

### Step 1: Scan All Workflows

```bash
# Find all workflow.yaml files
find bmad -name "workflow.yaml" -type f | sort > /tmp/workflows.txt

# Check each for external instructions reference
while read wf; do
  echo "=== $wf ==="
  grep "^instructions:" "$wf" | head -1
done < /tmp/workflows.txt
```

### Step 2: Identify Non-Compliant Workflows

```bash
# Find workflows with embedded steps (anti-pattern)
find bmad -name "workflow.yaml" -exec grep -l "^steps:" {} \;

# These need migration to external instructions.md
```

### Step 3: For Each Non-Compliant Workflow

**Example: If zoe/create-single-image has embedded steps:**

1. Read current workflow.yaml
2. Extract embedded steps/instructions
3. Create `instructions.md` in same directory
4. Format as BMad XML:
   ```xml
   <workflow name="create-single-image">
     <step id="1" name="...">
       <goal>...</goal>
       <instructions>...</instructions>
       <outputs>...</outputs>
     </step>
   </workflow>
   ```
5. Update workflow.yaml to reference external file:
   ```yaml
   instructions: '{installed_path}/instructions.md'
   ```
6. Remove embedded steps from YAML

### Step 4: Verify Instructions Files Exist

```bash
# For each workflow, check instructions.md exists
find bmad -name "workflow.yaml" -type f | while read wf; do
  DIR=$(dirname "$wf")
  INSTR=$(grep "^instructions:" "$wf" | grep -o "instructions.md")

  if [ -n "$INSTR" ]; then
    # Workflow references external instructions
    if [ -f "$DIR/instructions.md" ]; then
      echo "✅ $DIR/instructions.md exists"
    else
      echo "❌ $DIR/instructions.md MISSING (referenced but not found)"
    fi
  else
    echo "⚠️  $wf may have embedded instructions"
  fi
done
```

---

## 🧪 Validation

### Test 1: All Workflows Use External Pattern

```bash
# Check all workflows have instructions: reference
find bmad -name "workflow.yaml" -exec grep -H "^instructions:" {} \; | grep -v "instructions.md" && echo "❌ Found embedded or missing" || echo "✅ All use external"
```

### Test 2: No Embedded Steps

```bash
# Should return nothing (no embedded steps)
find bmad -name "workflow.yaml" -exec grep -l "^steps:" {} \;
# If finds any, those need migration
```

### Test 3: Instructions Files Exist

```bash
# Every workflow's instructions.md must exist
find bmad -name "workflow.yaml" | while read wf; do
  DIR=$(dirname "$wf")
  test -f "$DIR/instructions.md" || echo "⚠️  Missing: $DIR/instructions.md"
done
```

---

## ✅ Success Criteria

- [x] All workflows have `instructions: "{installed_path}/instructions.md"` in YAML
- [x] NO workflows have embedded `steps:` in YAML
- [x] Every workflow directory has `instructions.md` file
- [x] Instructions.md files use BMad XML format (<workflow><step>...)
- [x] Validation test passes (no embedded instructions found)

---

## 🔗 Related Tasks

**Previous:** Phase 1 (file structure)
**Next:** Task 14 (Workflow variables)
**Related:** Epic 8 (Workflow standardization)

---

## 📝 Notes

**If No Non-Compliant Workflows Found:**

- Great! All workflows already follow BMad v6 standard
- Document this in validation output
- Mark task as completed quickly

**If Non-Compliant Found:**

- Priority migration order: Zoe (8), Zoro (1+), any others
- Jarvis workflows already compliant (can skip)

**Estimated Actual Time:** 30-60 minutes (depends on how many need migration)
