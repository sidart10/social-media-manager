# Jarvis - Architectural Cleanup & Consolidation Plan

**Date:** 2025-10-27
**Issue:** Jarvis scattered across 4 locations with 2 different architectural patterns
**Goal:** Make Jarvis clean and consistent like ai-video-agent and ai-image-generator

---

## 🚨 CURRENT MESS (4 Locations!)

### Location 1: `bmad/agents/content-intelligence/` ✅ MAIN

- jarvis.agent.yaml (source)
- jarvis.md (compiled)
- jarvis-sidecar/ (all resources)
- 26 status/doc markdown files
- **This should be THE ONLY location!**

### Location 2: `bmad/agents/jarvis/` ❓ DUPLICATE

- Need to check what this is
- Probably old/duplicate

### Location 3: `.claude/commands/jarvis/` ⚠️ COMPILED OUTPUT

- jarvis.md (copy of Location 1)
- workflows/ (copies)
- Now cleaned but still redundant

### Location 4: `~/.claude/skills/jarvis/` ⚠️ SKILLS SYSTEM

- 8 SKILL.md files
- **This is a DIFFERENT architecture!**
- Other agents don't use this

---

## 🎯 CORRECT STRUCTURE (Like Other Agents)

### ai-video-agent (CLEAN):

```
bmad/agents/ai-video-agent/
├── ai-video-agent.agent.yaml
├── ai-video-agent.md
├── ai-video-agent-sidecar/
│   ├── config.yaml
│   ├── instructions.md
│   ├── workflows/
│   └── outputs/
├── README.md
└── [few status docs]
```

**That's it!** ONE location, everything there.

### Jarvis SHOULD BE:

```
bmad/agents/content-intelligence/
├── jarvis.agent.yaml
├── jarvis.md
├── jarvis-sidecar/
│   ├── config.yaml
│   ├── instructions.md
│   ├── memories.md
│   ├── workflows/ (ALL workflows here)
│   ├── knowledge/
│   ├── outputs/
│   └── sessions/
├── README.md
└── [cleanup status docs]
```

**NOT:**

- ❌ ~/.claude/skills/jarvis/ (different system)
- ❌ .claude/commands/jarvis/ (just symlink to main)
- ❌ bmad/agents/jarvis/ (duplicate)

---

## 📋 CLEANUP PLAN

### Step 1: Check bmad/agents/jarvis/

- If duplicate: Delete
- If has unique content: Merge to content-intelligence/

### Step 2: Delete ~/.claude/skills/jarvis/

- Remove all 8 Skills
- Revert workflows to explicit MCP calls (like other agents)
- Consistent architecture

### Step 3: Clean .claude/commands/jarvis/

- Delete workflows/ folder (redundant)
- Keep ONLY: jarvis.md (symlink or copy of main)

### Step 4: Clean bmad/agents/content-intelligence/

- Archive 20+ status docs
- Keep: jarvis.agent.yaml, jarvis.md, jarvis-sidecar/, README.md

### Step 5: Update Workflows

- Remove Skills invocation comments
- Add explicit MCP calls (like ai-video-agent workflows)
- Match other agents' pattern

---

## 🎯 FINAL STRUCTURE (CLEAN)

**After cleanup:**

```
bmad/agents/content-intelligence/
├── jarvis.agent.yaml
├── jarvis.md
├── jarvis-sidecar/
│   ├── config.yaml
│   ├── instructions.md
│   ├── memories.md
│   ├── workflows/
│   │   ├── research-topic/
│   │   ├── analyze-profile/
│   │   ├── generate-ideas/
│   │   ├── learn-voice/
│   │   ├── competitive-analysis/
│   │   ├── write-posts/
│   │   └── write-scripts/
│   ├── knowledge/
│   ├── outputs/
│   └── sessions/
└── README.md

.claude/commands/jarvis/
└── jarvis.md (copy or symlink)

~/.claude/skills/
└── (empty - no jarvis Skills)
```

**Same as your other agents!**

---

## 💡 MY STRONG RECOMMENDATION

**Remove Skills, consolidate to BMAD-only architecture:**

**Why:**

1. ✅ Consistent with ai-video-agent, ai-image-generator
2. ✅ All code in one place (bmad/agents/content-intelligence/)
3. ✅ Proven pattern (your other agents work)
4. ✅ Simpler to maintain
5. ✅ No architectural confusion

**Skills experiment didn't work out:**

- Tool invocation issues
- Inconsistent with your existing agents
- Added complexity
- research_topic still fails even with Skills

---

**Should I execute this consolidation?** (30-45 min)

This will make Jarvis clean and consistent like your other agents!
