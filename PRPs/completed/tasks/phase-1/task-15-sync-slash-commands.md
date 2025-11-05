<!-- Powered by BMAD™ Core -->

# Task 15: Synchronize Slash Commands with Agent Files

**Phase:** 1 (Critical Agent & Registry Fixes)
**Priority:** CRITICAL
**Estimated Time:** 10-15 minutes
**Dependencies:** Task 1A, Task 1B (agent files created)

---

## 🎯 Objective

Ensure `.claude/commands/social-media-team/*.md` files stay synchronized with `bmad/agents/*/*.md` primary files.

---

## 📋 Context

**BMad Dual-Location Pattern:**

- **Primary (source of truth):** `bmad/agents/{module}/{agent}.md`
- **Discovery (Claude Code slash commands):** `.claude/commands/social-media-team/{agent}.md`

**Current State:**

- After Tasks 1A/1B, bmad/ files are created/updated
- .claude/commands/ files may be out of sync
- Need to copy bmad/ → .claude/commands/

---

## ✅ Implementation Steps

### Step 1: Copy Zoe

```bash
cp bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md
```

### Step 2: Copy Zoro

```bash
cp bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md
```

### Step 3: Verify Jarvis

```bash
# Check if jarvis is in sync
diff bmad/agents/content-intelligence/jarvis.md .claude/commands/social-media-team/jarvis.md

# If different, copy
cp bmad/agents/content-intelligence/jarvis.md .claude/commands/social-media-team/jarvis.md
```

---

## 🧪 Validation

### Test 1: Files Synchronized

```bash
# Zoe sync check
diff bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md && echo "✅ Zoe synced" || echo "❌ Zoe out of sync"

# Zoro sync check
diff bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md && echo "✅ Zoro synced" || echo "❌ Zoro out of sync"

# Jarvis sync check
diff bmad/agents/content-intelligence/jarvis.md .claude/commands/social-media-team/jarvis.md && echo "✅ Jarvis synced" || echo "❌ Jarvis out of sync"
```

### Test 2: All Slash Commands Exist

```bash
test -f .claude/commands/social-media-team/jarvis.md && echo "✅ /jarvis available"
test -f .claude/commands/social-media-team/zoe.md && echo "✅ /zoe available"
test -f .claude/commands/social-media-team/zoro.md && echo "✅ /zoro available"
```

### Test 3: Agent Activation (Manual)

Test each agent activates correctly:

```bash
# In Claude Code:
/jarvis   # Should show Jarvis menu
/zoe      # Should show Zoe menu
/zoro     # Should show Zoro menu
```

Expected: Each shows greeting with {user_name} and numbered workflow menu

---

## ✅ Success Criteria

- [x] All 3 agent files copied from bmad/ to .claude/commands/
- [x] diff shows files are identical (in sync)
- [x] Agent slash commands work (/jarvis, /zoe, /zoro)
- [x] Each agent shows proper greeting and menu

---

## 🔗 Related Tasks

**Requires:** Task 1A (zoe.md), Task 1B (zoro.md)
**Enables:** Agent activation testing
**Validates:** Phase 1 complete

---

## 📝 Notes

**Future Maintenance:**

- Whenever updating agent files in bmad/, remember to copy to .claude/commands/
- Could automate with npm script (Task 23)
- Symlinks possible but may not work on all systems

**Sync Command for package.json:**

```json
{
  "scripts": {
    "sync:commands": "cp bmad/agents/zoe/zoe.md .claude/commands/social-media-team/zoe.md && cp bmad/agents/zoro/zoro.md .claude/commands/social-media-team/zoro.md && cp bmad/agents/content-intelligence/jarvis.md .claude/commands/social-media-team/jarvis.md"
  }
}
```

**Estimated Actual Time:** 5-10 minutes (simple copies + verification)
