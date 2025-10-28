# Critical Fix: Wrong Workflows Being Loaded

**Issue:** Jarvis was loading OLD workflows instead of NEW simplified ones

---

## What Happened

**TWO sets of workflows exist:**

1. **.claude/commands/jarvis/workflows/** (OLD - explicit MCP calls)
   - 303 lines each
   - Calls MCPs explicitly
   - References fictional script_generation_mcp
   - **Was being loaded by Jarvis!**

2. **bmad/agents/content-intelligence/jarvis-sidecar/workflows/** (NEW - Skills-powered)
   - 60-105 lines each (simplified!)
   - Natural language instructions
   - Skills invoked via comments
   - **Should be loaded by Jarvis!**

---

## Fix Applied

**Copied NEW workflows → .claude/commands/jarvis/workflows/**

Now:

- research-topic: 105 lines (was 303) ✓
- Uses Skills (not explicit MCP calls) ✓
- No script_generation_mcp references ✓

---

## This Should Fix research_topic Error

**Old workflow had:**

```xml
<action>Tool: script_generation_mcp/add_note</action>
<action>Call social_media_mcp/research_topic</action>
```

= "use_mcp_tool is not defined" errors!

**New workflow has:**

```xml
<action>Get trending topics, hashtags, and facts about {topic}.</action>
<!-- Claude invokes social-media-research Skill automatically -->
```

= Natural language → Skills invoke → MCPs called correctly!

---

## Restart & Test

**Restart Claude Code**

**Then:**

```
/jarvis → research-topic
```

Should now use NEW simplified workflow that invokes Skills properly!

---

**This is the real fix - we were using the wrong workflow files!**
