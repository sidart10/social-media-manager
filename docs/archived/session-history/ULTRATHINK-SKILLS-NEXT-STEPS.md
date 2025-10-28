# ULTRATHINK: Skill Seekers + Jarvis Skills Strategy

**Date:** 2025-10-27
**Question:** How to use Skill Seekers + organize our Skills properly?

---

## 🔍 WHAT IS SKILL SEEKERS?

**Purpose:** Tool for CREATING Claude Code Skills by scraping documentation websites

**What it does:**

1. Scrapes documentation (React, Godot, Django, etc.)
2. Extracts pages, code examples, structure
3. Creates SKILL.md with documentation content
4. Organizes references/ folder with scraped docs
5. Enhances SKILL.md quality (local or API)
6. Packages as .zip for Claude upload

**Output:**

```
output/godot/
├── SKILL.md (generated from scraped docs)
└── references/
    └── [scraped documentation pages]
```

**Use case:** Teaching Claude about frameworks/libraries via their documentation

---

## 🤔 IS THIS USEFUL FOR JARVIS?

### What Skill Seekers IS Good For:

**Creating documentation Skills:**

- "React documentation Skill" (teaches React from react.dev)
- "Godot Skill" (teaches game engine from docs)
- "Django Skill" (teaches Django from docs.djangoproject.com)

**NOT for:**

- ❌ MCP invocation Skills
- ❌ Workflow orchestration Skills
- ❌ Custom business logic Skills

### What We Need for Jarvis:

**MCP invocation Skills:**

- How to call social-media-mcp
- How to call apify
- How to call exa
- How to call youtube-transcript

**NOT documentation scraping** - we're not teaching Claude about a framework!

---

## 💡 THE REAL QUESTION

**You're asking:**

1. Should workflows be IN Skills folders or referenced?
2. Should MCP docs be IN Skills folders?
3. How to organize Skills + workflows + MCP info?

**Skill Seekers shows us:**

- Skills CAN have resources/ folder
- Resources can include detailed examples
- Skills reference those resources

**Applied to Jarvis:**

### Option A: Skills Reference Workflows (Current)

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md
└── resources/
    └── workflow-reference.md → Points to: bmad/.../workflows/research-topic/
```

**Pros:**

- No duplication
- Workflows remain source of truth
- Skills are lightweight discovery layer

**Cons:**

- Skills depend on external files
- If workflows move, Skills break

---

### Option B: Copy Workflow Instructions to Skills

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md
└── resources/
    ├── mcp-usage.md (COPIED from workflow instructions)
    ├── social-media-mcp-examples.md
    └── output-templates.md
```

**Pros:**

- Skills self-contained
- All context in one place (like Skill Seekers output)
- Claude has everything it needs

**Cons:**

- Duplication (workflow + Skill have same info)
- Update in two places

---

### Option C: Move Workflows INTO Skills (RADICAL)

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md
└── resources/
    ├── mcp-usage.md
    ├── workflow.yaml (MOVED from jarvis-sidecar)
    └── instructions.md (MOVED from jarvis-sidecar)
```

**Pros:**

- Everything in one place
- Skills are complete packages
- Like Skill Seekers output (SKILL.md + resources/)

**Cons:**

- Workflows no longer in agent sidecar
- Different from other agents
- Unconventional structure

---

## 🎯 ULTRATHINK RECOMMENDATION

### DON'T Use Skill Seekers for Jarvis

**Why:**

- Skill Seekers is for documentation scraping (React, Godot docs)
- Jarvis needs MCP invocation Skills (different purpose)
- Not applicable to our use case

### DO: Option B (Self-Contained Skills)

**Copy key parts of workflow instructions to Skills resources/:**

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md (when to invoke + high-level instructions)
└── resources/
    ├── social-media-mcp-usage.md (HOW to call the MCP - copied from workflow)
    ├── research-topic-examples.md (example requests/responses)
    ├── get-trending-topics-examples.md (example requests/responses)
    └── error-handling.md (common errors + fixes)
```

**Why this is best:**

1. **Based on video insights:** Skills with detailed resources work better
2. **Self-contained:** Claude has all context in Skill
3. **Like Skill Seekers output:** SKILL.md + resources/ folder
4. **Solves "use_mcp_tool" error:** Gives Claude exact MCP invocation examples
5. **Maintainable:** Update Skill resources when workflows change

**Workflows stay in jarvis-sidecar/** (source of truth for agent)
**Skills have copies/extracts** (optimized for Claude invocation)

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Enhance social-media-research Skill (30 min)

**Create resources/ with:**

1. **social-media-mcp-usage.md**
   - Exact tool invocation syntax
   - All parameters explained
   - Example requests
   - Example responses
   - (Extract from workflow instructions)

2. **common-errors.md**
   - "use_mcp_tool is not defined" → what to do
   - Tool unavailable → fallback
   - No results → how to handle

3. **output-template.md**
   - What structured output should look like
   - How to format findings

**Update SKILL.md:**

```markdown
## Instructions

1. Call social-media-mcp research_topic. See resources/social-media-mcp-usage.md for exact syntax and parameters.

2. Organize results using template in resources/output-template.md

3. If errors, see resources/common-errors.md
```

### Phase 2: Test (10 min)

- Restart Claude Code
- Test: "Research AI agents"
- Check if Skill invokes MCP correctly

### Phase 3: If Works, Apply to Other Skills (1-2 hours)

- profile-analysis → resources/ with apify examples
- youtube-research → resources/ with youtube-transcript examples
- deep-web-research → resources/ with exa examples

---

## 🎯 ANSWER TO YOUR QUESTIONS

**Q1: Should we move workflows to Skills folder?**
**A:** NO - keep workflows in jarvis-sidecar (source of truth), copy relevant parts to Skill resources/

**Q2: Should we reference workflows or copy them?**
**A:** COPY key parts (MCP usage examples) to Skill resources/ - makes Skills self-contained

**Q3: Should MCP server docs be in Skills folder?**
**A:** YES - create resources/mcp-usage.md with examples (like Skill Seekers does with scraped docs)

**Q4: Is Skill Seekers useful for Jarvis?**
**A:** NO for creating our Skills (wrong use case), but YES for the PATTERN - Skills with detailed resources/ work better!

---

## 🚀 NEXT STEPS

**Immediate (30-45 min):**

1. **Enhance social-media-research Skill**
   - Create resources/ folder
   - Add social-media-mcp usage examples
   - Add error handling guide
   - Update SKILL.md to reference resources

2. **Test**
   - Restart Claude Code
   - Test research
   - Validate MCP invokes correctly

3. **If works:**
   - Apply same pattern to other 3 MCP Skills
   - Research Skills become self-contained

**This should fix the "use_mcp_tool" error by giving Claude all the context it needs!**

---

**Want me to create the enhanced social-media-research Skill with resources/ now?**

This is based on the video insights + Skill Seekers pattern (detailed resources) even though we won't use Skill Seekers tool itself.
