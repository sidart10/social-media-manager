# "use_mcp_tool is not defined" - The Mystery

**Error:** `use_mcp_tool is not defined`
**Occurs:** Only when calling social-media-mcp/research_topic
**Not found:** In any official Claude Code documentation or GitHub issues

---

## What I Found (or Didn't Find)

**Searched:**
- ✅ Official Claude Code MCP docs - NO mention of "use_mcp_tool"
- ✅ Claude Code GitHub issues - NO results for this error
- ✅ Our .claude/ folder - Only in docs I wrote ABOUT the error
- ✅ Our Skills - No code files, just markdown
- ✅ social-media-mcp server - Standard MCP implementation

**Conclusion:** "use_mcp_tool" is NOT a standard Claude Code function or documented error!

---

## Where Could This Be Coming From?

### Possibility 1: Claude Code Internals

**Maybe:** An internal function Claude Code uses when invoking MCPs
**But:** Not documented, not in error catalogs, very unusual

### Possibility 2: Another Agent/Tool Added It

**Check:** Did another agent or tool add helper functions?
**Result:** No .js or .py files in our Skills (just markdown)

### Possibility 3: It's a Red Herring

**Maybe:** The REAL error is something else, but it's being reported as "use_mcp_tool is not defined"
**Possible:** Error message transformation or wrapping

---

## The Smoking Gun

**FACT:** exa works, get_trending_topics works, but research_topic doesn't

**This means:**
- MCP invocation CAN work
- Simple tools work
- Complex tools (with multiple booleans) fail

**Real issue might be:**
- Parameter serialization bug (Issue #4192 mentions this!)
- Boolean parameter handling issue
- Complex parameter sets fail

---

## CRITICAL FIND from GitHub Issues

**Issue #4192:** "MCP Parameter Serialization Bug in Both Claude Code and Claude Desktop"

**This could be it!**
- research_topic has 5 parameters (1 string + 4 booleans)
- Booleans might not serialize correctly
- Claude Code bug with complex parameters

---

## Simple Test

**Instead of:**
```
research_topic(topic, includeHashtags=true, includeFacts=true, ...)
```

**Try:**
```
research_topic(topic)
```

**If minimal params work:** Confirms it's a parameter bug
**If minimal params fail:** Something else

---

**Want me to create a test to call research_topic with JUST the topic parameter?**

This will confirm if it's a parameter serialization bug!
