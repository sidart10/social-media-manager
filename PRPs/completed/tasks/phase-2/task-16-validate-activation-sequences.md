<!-- Powered by BMAD™ Core -->

# Task 16: Validate Agent Activation Sequences

**Phase:** 2 (BMad Workflow Standardization)
**Priority:** MEDIUM
**Estimated Time:** 30-40 minutes
**Dependencies:** Task 1A, 1B (agent files exist)

---

## 🎯 Objective

Ensure all agents follow BMad v6 mandatory 12-step activation pattern with proper config loading and workflow.xml execution.

---

## 📋 Context

**BMad v6 Activation Requirements:**

Every agent MUST have these critical steps:

1. Load persona from current file
2. **CRITICAL:** Load config.yaml, store variables
3. Load sidecar files (instructions.md, memories.md)
4. Display greeting with {user_name}
5. Show menu and WAIT for input
6. menu-handlers with workflow handler that loads workflow.xml

**Files to Validate:**

- `bmad/agents/content-intelligence/jarvis.md`
- `bmad/agents/zoe/zoe.md`
- `bmad/agents/zoro/zoro.md`

---

## ✅ Implementation Steps

### Step 1: Check Jarvis (Reference Example)

```bash
# Jarvis should be correct - use as reference
grep -A50 '<activation' bmad/agents/content-intelligence/jarvis.md | head -60
```

Expected to see:

- Step 2: Config loading with variable storage
- Step with {user_name} greeting
- menu-handlers block
- workflow handler with workflow.xml loading

### Step 2: Check Zoe Activation

```bash
# Count activation steps
grep -c '<step n=' bmad/agents/zoe/zoe.md

# Should be 12+ steps
```

Verify critical steps exist:

```bash
# Step 2: Config loading
grep -A3 'step n="2"' bmad/agents/zoe/zoe.md | grep -q "config.yaml" && echo "✅ Config loading" || echo "❌ Missing config"

# Greeting with user_name
grep -q "{user_name}" bmad/agents/zoe/zoe.md && echo "✅ Uses user_name" || echo "❌ Missing user_name"

# workflow.xml loading
grep -q "workflow.xml" bmad/agents/zoe/zoe.md && echo "✅ Loads workflow.xml" || echo "❌ Missing workflow.xml"

# WAIT for user input
grep -q "WAIT for user input" bmad/agents/zoe/zoe.md && echo "✅ Waits for input" || echo "❌ May auto-execute"
```

### Step 3: Check Zoro Activation

```bash
# Same checks as Zoe
grep -c '<step n=' bmad/agents/zoro/zoro.md

grep -A3 'step n="2"' bmad/agents/zoro/zoro.md | grep -q "config.yaml" && echo "✅ Config loading" || echo "❌ Missing config"

grep -q "{user_name}" bmad/agents/zoro/zoro.md && echo "✅ Uses user_name" || echo "❌ Missing user_name"

grep -q "workflow.xml" bmad/agents/zoro/zoro.md && echo "✅ Loads workflow.xml" || echo "❌ Missing workflow.xml"
```

### Step 4: Check menu-handlers Block

All agents MUST have:

```xml
<menu-handlers>
  <handlers>
    <handler type="workflow">
      1. CRITICAL: Always LOAD {project-root}/bmad/core/tasks/workflow.xml
      2. Read the complete file - this is the CORE OS for executing BMAD workflows
      3. Pass the yaml path as 'workflow-config' parameter
      4. Execute workflow.xml instructions precisely
      5. Save outputs after EACH workflow step
    </handler>
  </handlers>
</menu-handlers>
```

Verify:

```bash
for agent in bmad/agents/*//*.md; do
  echo "=== $agent ==="
  grep -q '<menu-handlers>' "$agent" && echo "✅ Has menu-handlers" || echo "❌ Missing menu-handlers"
  grep -q 'workflow.xml' "$agent" && echo "✅ References workflow.xml" || echo "❌ Missing workflow.xml reference"
done
```

### Step 5: Fix Any Issues

If any agent missing required steps, add them following jarvis.md pattern.

---

## 🧪 Validation

### Comprehensive Validation Script

```bash
#!/bin/bash
# validate-agent-activation.sh
EXIT_CODE=0

echo "=== AGENT ACTIVATION VALIDATION ==="

for agent in bmad/agents/content-intelligence/jarvis.md bmad/agents/zoe/zoe.md bmad/agents/zoro/zoro.md; do
  AGENT_NAME=$(basename $(dirname $agent))
  echo -e "\n=== $AGENT_NAME ==="

  # Check activation block exists
  grep -q '<activation critical="MANDATORY">' "$agent" && echo "✅ Has activation block" || { echo "❌ Missing activation"; EXIT_CODE=1; }

  # Check config loading (step 2)
  grep -A5 'step n="2"' "$agent" | grep -q "config.yaml" && echo "✅ Loads config" || { echo "❌ Missing config load"; EXIT_CODE=1; }

  # Check uses user_name
  grep -q "{user_name}" "$agent" && echo "✅ Uses user_name variable" || { echo "❌ Missing user_name"; EXIT_CODE=1; }

  # Check menu-handlers
  grep -q '<menu-handlers>' "$agent" && echo "✅ Has menu-handlers" || { echo "❌ Missing menu-handlers"; EXIT_CODE=1; }

  # Check workflow.xml loading
  grep -q 'workflow.xml' "$agent" && echo "✅ Loads workflow.xml" || { echo "❌ Missing workflow.xml"; EXIT_CODE=1; }

  # Check WAIT instruction
  grep -q "WAIT for user input" "$agent" && echo "✅ Waits for input" || { echo "⚠️  May auto-execute"; }

  # Count steps
  STEPS=$(grep -c '<step n=' "$agent")
  if [ "$STEPS" -ge 12 ]; then
    echo "✅ Has $STEPS activation steps (≥12 required)"
  else
    echo "⚠️  Only $STEPS steps (12+ recommended)"
  fi
done

echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ ALL AGENTS FOLLOW BMAD V6 ACTIVATION PATTERN"
else
  echo "❌ SOME AGENTS NEED FIXES - Review above"
fi

exit $EXIT_CODE
```

---

## ✅ Success Criteria

- [x] All 3 agents have `<activation critical="MANDATORY">` block
- [x] All agents have Step 2 config loading
- [x] All agents store {user_name}, {communication_language}, {output_folder}
- [x] All agents use {user_name} in greeting
- [x] All agents have menu-handlers block
- [x] All workflow handlers load workflow.xml
- [x] All agents WAIT for user input (not auto-execute)
- [x] All agents have 12+ activation steps
- [x] Validation script exits with code 0

---

## 🔗 Related Tasks

**Previous:** Task 14 (Workflow variables)
**Next:** Task 21 (Validation error handling)
**Validates:** Agent compliance with BMad v6

---

## 📝 Notes

**If Agents Already Compliant:**

- Zoe and Zoro were copied from .claude/commands which follow BMad pattern
- Likely already compliant
- Quick validation should pass

**If Issues Found:**

- Use jarvis.md as template
- Copy missing activation steps
- Ensure workflow.xml loading present

**Estimated Actual Time:** 20-30 minutes (likely already compliant)
