# Skills + Workflows Integration - The Right Architecture

**Date:** 2025-10-27
**Insight:** Skills should REFERENCE workflows, not duplicate them!

---

## 💡 THE REALIZATION

**Current duplication:**

- Workflows have: detailed MCP instructions, templates, examples
- Skills have: minimal SKILL.md (28 lines)
- We're creating resources/ to add what workflows already have!

**Better approach:**

- Workflows = Detailed execution logic (how to use MCPs)
- Skills = Discovery + reference layer (when to invoke + where to find details)
- **Skills REFERENCE workflow files!**

---

## 🏗️ PROPOSED ARCHITECTURE

### Workflow Location (Source of Truth):

```
bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/
├── workflow.yaml
├── instructions.md (DETAILED MCP usage - 104 lines)
└── templates/
    └── research-brief.md (output template)
```

**This is the COMPLETE guide** for how to execute research!

### Skill (Lightweight Wrapper):

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md (when to invoke - 40 lines)
└── resources/
    ├── workflow-reference.md → Points to workflow instructions
    └── mcp-quick-reference.md (cheat sheet)
```

**Skill just:**

- Describes when to invoke
- Points to workflow for HOW to execute
- Provides quick reference

---

## 🎯 BENEFIT

**Zero duplication:**

- Workflows already have all the detailed logic
- Skills reference workflows
- Update workflow = Skill automatically updated
- Single source of truth

**Comparison:**

**OLD (What we were doing):**

- Workflow: 104 lines of MCP instructions
- Skill: Need to duplicate those 104 lines as resources
- = 208 lines total, duplicated logic

**NEW (What we should do):**

- Workflow: 104 lines of MCP instructions
- Skill: 40 lines + reference to workflow
- = 144 lines total, no duplication (30% reduction)

---

## 📋 WHICH WORKFLOWS TO USE?

**Comparison:**

- .claude/commands/jarvis/workflows/ - Modified Oct 27 14:51 (NEWER)
- jarvis-sidecar/workflows/ - Modified Oct 27 13:37-13:40 (OLDER)

**Same line counts** (both 104 lines for research-topic)

**They're IDENTICAL** (I copied sidecar → commands earlier)

**Use:** bmad/agents/content-intelligence/jarvis-sidecar/workflows/ (source of truth)

**Delete:** .claude/commands/jarvis/workflows/ (copies)

---

## ✅ CLEAN ARCHITECTURE

### Final Structure:

```
bmad/agents/content-intelligence/jarvis-sidecar/workflows/
└── research-topic/
    ├── workflow.yaml
    ├── instructions.md (DETAILED - how to use MCPs)
    └── templates/research-brief.md

.claude/skills/jarvis/social-media-research/
├── SKILL.md (LIGHTWEIGHT - when to invoke)
└── resources/
    └── workflow-reference.md (points to workflow)

.claude/commands/jarvis/
└── jarvis.md (ONLY the compiled agent file)
```

**Result:**

- ONE workflow location (jarvis-sidecar)
- Skills reference workflows
- No duplication
- Clean structure

---

## 🚀 ACTION PLAN

1. **Delete:** .claude/commands/jarvis/workflows/ (redundant copies)
2. **Keep:** bmad/agents/content-intelligence/jarvis-sidecar/workflows/ (source)
3. **Update:** Skills to reference workflow files
4. **.claude/commands/jarvis:** Only jarvis.md (slash command file)

**Total cleanup:** ~10-15 min

**Want me to execute this now?**

This makes everything clean, no duplication, Skills reference workflows!
