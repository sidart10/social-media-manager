<!-- Powered by BMAD™ Core -->

# Task 2: Clean Agent Manifest

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 20-30 minutes
**Dependencies:** Task 1A, Task 1B (agent files must exist first)

---

## 🎯 Objective

Clean `bmad/_cfg/agent-manifest.csv` by removing duplicates, fixing phantom paths, and ensuring all referenced files exist.

---

## 📋 Context

**File:** `bmad/_cfg/agent-manifest.csv`

**Current Issues (from audit):**

- Duplicate entries (lines 6-7 duplicate 2-3)
- References to non-existent `bmad/standalone/` paths
- Some agents may point to wrong locations

**Expected Final State:**

- 5 agents: bmad-master, bmad-builder, jarvis, zoe, zoro
- NO duplicates
- ALL paths verified to exist
- Correct module references (core, bmb, agents)

---

## ✅ Implementation Steps

### Step 1: Backup Current File

```bash
cp bmad/_cfg/agent-manifest.csv bmad/_cfg/agent-manifest.csv.backup-$(date +%Y%m%d)
```

### Step 2: Read and Analyze Current File

```bash
# Check current state
cat bmad/_cfg/agent-manifest.csv

# Count entries (excluding header)
tail -n +2 bmad/_cfg/agent-manifest.csv | wc -l

# Find duplicates
sort bmad/_cfg/agent-manifest.csv | uniq -d
```

### Step 3: Verify Which Paths Exist

```bash
# Check each agent path
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r name _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ EXISTS: $name → $path"
  else
    echo "❌ MISSING: $name → $path"
  fi
done
```

### Step 4: Create Clean Manifest

Create new clean version:

```csv
name,displayName,title,icon,role,identity,communicationStyle,principles,module,path
"bmad-master","BMad Master","BMad Master Executor","🧠","Orchestrator","BMad core orchestrator and knowledge custodian","Professional, systematic, authoritative","Execute precisely, maintain knowledge, coordinate workflows","core","bmad/core/agents/bmad-master.md"
"bmad-builder","BMad Builder","BMad Builder","🔨","Builder","Master BMad module, agent, and workflow builder","Methodical, detail-oriented, instructional","Follow patterns, enforce standards, validate thoroughly","bmb","bmad/bmb/agents/bmad-builder.md"
"jarvis","Jarvis","Team Head - Content Intelligence","🎯","Team Head","Multi-skilled content strategist coordinating research, strategy, and creation","Strategic, analytical, collaborative","Research-driven, voice-consistent, evidence-backed","agents","bmad/agents/content-intelligence/jarvis.md"
"zoe","Zoe","Visual Production Specialist","🎨","Visual Creator","Visual content specialist for images and videos","Design-obsessed, quality-focused, platform-aware","Quality over speed, Emily's 7-pillar framework, fal-video primary","agents","bmad/agents/zoe/zoe.md"
"zoro","Zoro","Publishing & Distribution Specialist","📤","Publisher","Multi-platform publishing and distribution coordinator","Efficient, reliable, detail-oriented","Cloudinary required, Postiz primary, validate before publish","agents","bmad/agents/zoro/zoro.md"
```

**Key Changes:**

- Removed all standalone/ references
- Removed duplicate entries
- Updated paths to modular structure
- Verified all 5 agents

### Step 5: Replace File

```bash
# Back up old version already done in Step 1

# Write new clean version
# Use text editor or Edit tool to replace content with clean CSV above
```

---

## 🧪 Validation

### Validation Script

Save as `test/validate-agent-manifest.sh`:

```bash
#!/bin/bash
# Powered by BMAD™ Core
# Validate agent manifest accuracy

EXIT_CODE=0

echo "=== AGENT MANIFEST VALIDATION ==="

# Test 1: No duplicates
echo -e "\n1. Checking for duplicates..."
DUPES=$(sort bmad/_cfg/agent-manifest.csv | uniq -d)
if [ -z "$DUPES" ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found duplicates:"
  echo "$DUPES"
  EXIT_CODE=1
fi

# Test 2: All paths exist
echo -e "\n2. Checking all agent paths exist..."
tail -n +2 bmad/_cfg/agent-manifest.csv | while IFS=, read -r name _ _ _ _ _ _ _ _ path; do
  path=$(echo "$path" | tr -d '"' | xargs)
  if [ -f "$path" ]; then
    echo "✅ $name → $path"
  else
    echo "❌ $name → $path (FILE NOT FOUND)"
    EXIT_CODE=1
  fi
done

# Test 3: No standalone/ references
echo -e "\n3. Checking for phantom standalone/ paths..."
if grep -q "bmad/standalone/" bmad/_cfg/agent-manifest.csv; then
  echo "❌ Found standalone/ references (directory doesn't exist)"
  grep "standalone/" bmad/_cfg/agent-manifest.csv
  EXIT_CODE=1
else
  echo "✅ No standalone/ references"
fi

# Test 4: Expected agent count
echo -e "\n4. Checking agent count..."
AGENT_COUNT=$(tail -n +2 bmad/_cfg/agent-manifest.csv | wc -l)
if [ "$AGENT_COUNT" -eq 5 ]; then
  echo "✅ Correct agent count: $AGENT_COUNT"
else
  echo "⚠️  Agent count: $AGENT_COUNT (expected: 5)"
fi

# Summary
echo -e "\n=== VALIDATION SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ AGENT MANIFEST VALID"
else
  echo "❌ AGENT MANIFEST HAS ERRORS - Review above"
fi

exit $EXIT_CODE
```

### Run Validation

```bash
bash test/validate-agent-manifest.sh
echo "Exit code: $?"
# Should be 0 for success
```

---

## ✅ Success Criteria

- [x] agent-manifest.csv has NO duplicates
- [x] All 5 agent paths exist on filesystem
- [x] No references to bmad/standalone/ (doesn't exist)
- [x] Proper CSV format (double quotes, commas)
- [x] Validation script exits with code 0

---

## 🔗 Related Tasks

**Requires:** Task 1A (zoe.md), Task 1B (zoro.md) completed first
**Next:** Task 3 (Clean workflow manifest)
**Validation:** Included in Phase 1 validation gate

---

## 📝 Notes

**CSV Format Rules:**

- All fields double-quoted
- Comma-separated
- No extra spaces
- One agent per line (no multi-line)

**Modules:**

- core: Framework agents (bmad-master)
- bmb: Builder agents (bmad-builder)
- agents: Domain agents (jarvis, zoe, zoro)

**Estimated Actual Time:** 20-30 minutes
