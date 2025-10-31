# Skill-Creator: Should It Be a Skill or Agent?

**Date:** 2025-10-28
**Question:** Build as skill or agent?
**Investigator:** BMad Master

---

## The Critical Factor: Interaction Model

### Skills Can Do Interactive Q&A!

**Key discovery from Anthropic:**
> "The 'skill-creator' skill provides **interactive guidance**: Claude **asks** about your workflow, generates the folder structure, formats the SKILL.md file, and bundles the resources you need."

**Skills CAN:**
- ✅ Ask questions during execution
- ✅ Get user responses
- ✅ Make decisions based on answers
- ✅ Multi-turn within single task

**What I thought was wrong!**

---

## Re-Analysis: What Can Skills Actually Do?

### From Official Docs & Engineering Blog

**Skills support:**
- Interactive guidance (asking questions)
- Code execution (running scripts)
- File creation (generating outputs)
- Progressive disclosure (loading context on-demand)
- Conditional logic (based on user input)

**Skills are MORE powerful than I thought!**

---

## The Real Distinction

### Skills CANNOT Do:

**Multi-SESSION state:**
- ❌ "Remember user preferences across sessions"
- ❌ "Track what we did yesterday"
- ❌ "Maintain conversation history"

**Workflow orchestration:**
- ❌ "Run workflow A, then workflow B, then workflow C"
- ❌ "Call this agent, wait, call that agent"
- ❌ "Pause this process, resume later"

**Complex file organization:**
- ❌ "Save to this specific nested directory structure based on date/project/type"
- ❌ "Create handoff packages for 3 different agents"
- ❌ "Populate templates in 5 different locations"

---

### Skills CAN Do:

**Single-TASK interaction:**
- ✅ "What type of skill? [simple/medium/complex]"
- ✅ Get answer, generate accordingly
- ✅ "Where to save? [personal/project]"
- ✅ Get answer, save there

**This is ALL skill-creator needs!**

---

## Comparison: Skill vs Agent for skill-creator

### As a SKILL

**User experience:**
```
User: "Create a skill for analyzing Instagram engagement"

Claude: "Using skill-creator skill...

What type of skill structure?
1. Simple (SKILL.md only)
2. Medium (with prompts/examples)
3. Complex (with scripts/reference)

[User answers: 2]

Generating medium-complexity skill...
- SKILL.md with YAML frontmatter ✓
- prompts/analysis-template.md ✓
- examples/viral-post-example.md ✓

Where to save?
1. Personal (~/.claude/skills/)
2. Project (.claude/skills/jarvis/)

[User answers: 2]

✅ Skill created at .claude/skills/jarvis/analyzing-instagram-engagement/
Test with: 'Analyze this Instagram post's engagement'"
```

**Interaction:** ✅ Works within single conversation
**State:** ✅ Don't need cross-session memory
**File I/O:** ✅ Can create directories and files

**Complexity:** LOW (one SKILL.md file with references)
**Maintenance:** LOW (just update SKILL.md)
**Effort to build:** 3 hours

---

### As an AGENT

**User experience:**
```
User: /skill-creator

Agent Menu:
1. Create new skill
2. Validate existing skill
3. Update skill
4. List all skills
5. Exit

[User selects: 1]

Workflow: create-skill
Step 1: Gather requirements
Step 2: Generate structure
Step 3: Create files
Step 4: Validate
Step 5: Save
Step 6: Present results

[Same end result as skill]
```

**Interaction:** ✅ Multi-workflow menu system
**State:** ✅ Can track across workflows (overkill!)
**File I/O:** ✅ Complex orchestration (overkill!)

**Complexity:** HIGH (agent manifest, menu, workflows, templates)
**Maintenance:** HIGH (more moving parts)
**Effort to build:** 12+ hours

---

## The Decision Matrix

| Factor | Skill | Agent |
|--------|-------|-------|
| **Invocation** | Auto (say "create skill") | Manual (/skill-creator) |
| **Complexity** | Low (one file + refs) | High (manifest, menu, workflows) |
| **Build time** | 3 hours | 12+ hours |
| **Maintenance** | Low | High |
| **User friction** | Zero (auto-loads) | Some (must remember command) |
| **Interactive?** | ✅ Yes (within task) | ✅ Yes (across workflows) |
| **File creation?** | ✅ Yes | ✅ Yes |
| **Validation?** | ✅ Yes (include script) | ✅ Yes (separate workflow) |
| **Follows Anthropic pattern?** | ✅ Yes (they use skill!) | ❌ No |
| **Overkill?** | ❌ No (right-sized) | ✅ Yes (too complex) |

**Winner:** SKILL (4x faster to build, easier to use, follows Anthropic pattern)

---

## What Changed My Analysis

### Initial Wrong Assumption

**I thought:** Skills can't ask questions or interact

**From workflows analysis:**
- Workflows ask questions: `<ask>Select: [1/2/3]</ask>`
- I concluded: Only workflows can interact

**This was WRONG!**

---

### Corrected Understanding

**From Anthropic:**
> "Claude **asks** about your workflow, generates the folder structure..."

**Skills CAN ask questions during task execution!**

**The difference:**
- Skills: Interaction WITHIN single task
- Workflows: Interaction ACROSS multi-step process with state

**For skill creation:**
- One task = "create a skill"
- Within that task, ask questions
- Generate, validate, save
- Done!

**SKILL is perfect!**

---

## Real-World Example: Anthropic's skill-creator

### How Anthropic's Version Works

**User:** "Create a skill for PDF form filling"

**skill-creator skill (auto-loads):**

**Interactive Q&A within task:**
1. "What should the skill do?" → User describes
2. "Need code execution?" → User: yes
3. "What file structure?" → Suggests complex
4. "Where to save?" → User: project

**Generation:**
- Creates SKILL.md with YAML
- Creates scripts/ with form-filler.py
- Creates reference/ with PDF best practices
- Validates all files
- Saves to selected location

**Output:** "✅ Skill created! Test with: 'Fill this PDF form'"

**All within ONE conversation!**

---

## Why Agent Would Be Overkill

### What Agent Adds:

**Menu system:**
```
/skill-creator

1. Create new skill
2. Validate skill
3. Update skill
4. Delete skill
5. List skills
6. Skill marketplace
7. Exit
```

**Multiple workflows:**
- create-skill/
- validate-skill/
- update-skill/
- manage-skills/

**Agent manifest, command files, sidecar, etc.**

---

### What We Actually Need:

**Just ONE thing:** Create well-formed skills

**Don't need:**
- ❌ Menu system (one task = create skill)
- ❌ Multiple workflows (creation is one process)
- ❌ Slash command (auto-load is better!)
- ❌ Complex state (single-task interaction is enough)

**KISS principle:** Keep It Simple, Stupid!

---

## The Master's Final Recommendation

### Build skill-creator as a SKILL

**Why:**
1. ✅ **Follows Anthropic pattern** (they use skill!)
2. ✅ **Model-invoked** (auto-loads, no command needed)
3. ✅ **Can interact** (ask questions within task)
4. ✅ **Can create files** (generate SKILL.md, folders)
5. ✅ **Can validate** (include validation script)
6. ✅ **3 hours to build** (vs 12+ for agent)
7. ✅ **Simpler maintenance** (one SKILL.md)
8. ✅ **Better UX** (just ask, it loads)

**Implementation:**
```
.claude/skills/jarvis/skill-creator/
├── SKILL.md (interactive creation guide)
├── reference/
│   ├── anthropic-best-practices.md
│   ├── description-optimization.md
│   └── yaml-requirements.md
├── templates/
│   ├── simple-skill-template.md
│   ├── medium-skill-template.md
│   └── complex-skill-template.md
└── scripts/
    └── validate-skill.py
```

**Effort:** 3 hours
**Result:** Auto-loading skill that creates good skills!

---

## Regarding skill-seeker

**Keep it for:** Documentation scraping (React, YouTube, APIs)
**Use Firecrawl instead** when multi-source (faster!)
**Don't use for:** Custom skill authoring

**Two different tools:**
- skill-seeker: Documentation → Skills
- skill-creator: User needs → Skills

**Both valuable!**

---

**Complete analysis:** `docs/SKILL-CREATION-SOLUTION.md`

---

🧙 **The Master's Vote: Build skill-creator SKILL!**

**Benefits:**
- Auto-loads when you need it
- Creates good skills fast
- Follows Anthropic pattern
- 4x faster to build than agent
- Simpler to maintain

**Want to build it now or save for next session?**