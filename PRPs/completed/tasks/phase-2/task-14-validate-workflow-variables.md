<!-- Powered by BMAD™ Core -->

# Task 14: Validate Workflow Variable Declarations

**Phase:** 2 (BMad Workflow Standardization)
**Priority:** HIGH
**Estimated Time:** 30-40 minutes
**Dependencies:** Task 13 (workflows using external instructions)

---

## 🎯 Objective

Ensure all workflows properly declare BMad config variables (config_source, user_name, communication_language, output_folder).

---

## 📋 Context

**BMad Standard Variables:**

```yaml
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/{workflow-name}'
```

**Variable Syntax:**

- Use {variable} (single braces) for variable references
- Use {{placeholder}} (double braces) only for substitution placeholders
- Never use $variable (shell syntax)

---

## ✅ Implementation Steps

### Step 1: Scan All Workflows

```bash
find bmad -name "workflow.yaml" -type f > /tmp/all-workflows.txt
```

### Step 2: Check Each Workflow

```bash
while read wf; do
  echo "=== $(basename $(dirname $wf)) ==="

  # Check config_source
  grep -q "^config_source:" "$wf" && echo "✅ Has config_source" || echo "❌ Missing config_source"

  # Check user_name
  grep -q "^user_name:" "$wf" && echo "✅ Has user_name" || echo "❌ Missing user_name"

  # Check communication_language
  grep -q "^communication_language:" "$wf" && echo "✅ Has communication_language" || echo "❌ Missing communication_language"

  # Check output_folder
  grep -q "^output_folder:" "$wf" && echo "✅ Has output_folder" || echo "❌ Missing output_folder"

  # Check installed_path
  grep -q "^installed_path:" "$wf" && echo "✅ Has installed_path" || echo "❌ Missing installed_path"

  echo ""
done < /tmp/all-workflows.txt
```

### Step 3: Check Variable Syntax

```bash
# Find double-brace usage (should be rare, only for placeholders)
grep -rn "{{[a-z_]*}}" bmad/*/workflows/*/workflow.yaml

# Find shell-style variables (wrong)
grep -rn "\$[A-Z_]*" bmad/*/workflows/*/workflow.yaml
```

### Step 4: Fix Missing Variables

For any workflow missing variables, add them:

```yaml
# Add at top of workflow.yaml (after name, description, author)
config_source: '{agent-folder}/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
output_folder: '{config_source}:output_folder'
date: system-generated
installed_path: '{agent-folder}/workflows/workflow-name'
```

---

## 🧪 Validation

### Validation Script

```bash
#!/bin/bash
EXIT_CODE=0

echo "=== WORKFLOW VARIABLE VALIDATION ==="

find bmad -name "workflow.yaml" -type f | while read wf; do
  MISSING=""

  # Check required variables
  grep -q "^config_source:" "$wf" || MISSING="$MISSING config_source"
  grep -q "^user_name:" "$wf" || MISSING="$MISSING user_name"
  grep -q "^installed_path:" "$wf" || MISSING="$MISSING installed_path"

  if [ -z "$MISSING" ]; then
    echo "✅ $(basename $(dirname $wf))"
  else
    echo "❌ $(basename $(dirname $wf)) missing:$MISSING"
    EXIT_CODE=1
  fi
done

exit $EXIT_CODE
```

---

## ✅ Success Criteria

- [x] All workflows have config_source declared
- [x] All workflows have user_name declared
- [x] All workflows have communication_language declared
- [x] All workflows have output_folder declared
- [x] All workflows have installed_path declared
- [x] Variable syntax consistent ({var} not {{var}} or $var)
- [x] Validation script exits with code 0

---

## 🔗 Related Tasks

**Previous:** Task 13 (External instructions)
**Next:** Task 16 (Activation sequences)

---

**Estimated Actual Time:** 30-40 minutes
