# .claude/commands/jarvis/ Cleanup Plan

**Goal:** Clean command folder to only essential, up-to-date files

---

## Current State (MESSY)

```
.claude/commands/jarvis/
├── config.yaml           ← Redundant? (jarvis-sidecar has config)
├── FIXES-APPLIED.md      ← Status doc (doesn't belong here)
├── instructions.md       ← Duplicate? (jarvis-sidecar has this)
├── jarvis.md             ← ESSENTIAL (compiled agent)
├── knowledge/            ← Redundant? (jarvis-sidecar has this)
├── MCP-FIX-PLAN.md       ← Status doc (doesn't belong here)
├── memories.md           ← Duplicate? (jarvis-sidecar has this)
├── outputs/              ← Should use jarvis-sidecar/outputs
├── sessions/             ← Should use jarvis-sidecar/sessions
└── workflows/            ← Contains OLD + NEW workflows (duplicates!)
```

---

## What Should Stay (CLEAN)

```
.claude/commands/jarvis/
└── jarvis.md             ← ONLY file needed for /jarvis command!
```

**That's it!** The /jarvis command only needs the compiled agent file.

**Everything else** lives in:
`bmad/agents/content-intelligence/jarvis-sidecar/`

---

## Cleanup Actions

1. **KEEP:**
   - jarvis.md (essential)

2. **ARCHIVE:**
   - FIXES-APPLIED.md → .archive/jarvis-cleanup/
   - MCP-FIX-PLAN.md → .archive/jarvis-cleanup/

3. **DELETE (redundant with jarvis-sidecar):**
   - config.yaml
   - instructions.md
   - memories.md
   - knowledge/ (folder)
   - outputs/ (folder)
   - sessions/ (folder)
   - workflows/ (folder) ← jarvis.md references jarvis-sidecar/workflows anyway

---

## Verification

**After cleanup, jarvis.md should reference:**

- {agent-folder}/workflows/research-topic/
- Where {agent-folder} = bmad/agents/content-intelligence/jarvis-sidecar/

**NOT:**

- .claude/commands/jarvis/workflows/

---

**Ready to execute cleanup?**
