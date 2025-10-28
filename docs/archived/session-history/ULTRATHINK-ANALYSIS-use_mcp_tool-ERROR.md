# ULTRATHINK: "use_mcp_tool is not defined" Error Analysis

**Error:** `use_mcp_tool is not defined`
**Occurs:** When Skill tries to invoke social-media-mcp/research_topic
**Does NOT occur:** When invoking social-media-mcp/get_trending_topics

---

## 🔍 WHAT THIS TELLS US

### Observation 1: Inconsistent Behavior

- get_trending_topics: WORKED ✅
- research_topic: FAILED ❌
- Same MCP server, different tools

### Observation 2: Error Timing

- Error happens DURING tool invocation
- Not a connection error (MCP shows Connected)
- Not a missing tool error (tool exists in server)
- Execution error in invocation layer

### Observation 3: Error Source

```
social-media-mcp - research_topic (MCP)(...)
⎿  Error: use_mcp_tool is not defined
```

This shows:

- Skill invoked ✓
- Claude tried to call MCP ✓
- MCP call initiated ✓
- Execution failed ✗

---

## 💡 HYPOTHESIS

**"use_mcp_tool" is likely:**

- An internal Claude Code function for invoking MCPs
- Something in the MCP invocation layer
- NOT something in our Skills (I searched - it's not there)

**Why it fails for research_topic but not get_trending_topics:**

- Different parameter complexity?
- research_topic has 5 parameters (topic, includeHashtags, includeFacts, includeTrends, includeNews)
- get_trending_topics has 3 parameters (platform, category, count)
- Might be a parameter passing bug

---

## 🔧 POTENTIAL SOLUTIONS

### Solution 1: Simplify Parameter Passing

**Try calling research_topic with FEWER parameters first:**

Instead of:

```
research_topic(topic, includeHashtags=true, includeFacts=true, includeTrends=true, includeNews=true)
```

Try:

```
research_topic(topic="AI agents")
```

Then add parameters one by one to see which breaks it.

### Solution 2: Check Claude Code Version

**This might be a Claude Code bug with:**

- Skills invoking MCPs
- Complex parameter passing
- Specific tool combinations

### Solution 3: Bypass Skills for Now

**Test MCPs directly without Skills:**

- Don't use Skill intermediary
- Call MCPs directly from workflows
- Proves MCPs work, isolates Skill issue

### Solution 4: Use Different MCP Invocation

**In Skill instructions, try:**

```
1. Call the research_topic tool from social-media-mcp server.
```

Instead of:

```
1. Use social-media-mcp research_topic tool with...
```

Different wording might trigger different invocation path.

---

## 🎯 RECOMMENDED IMMEDIATE TEST

**Test directly (no Skill):**

In regular Claude Code (not Jarvis), try:

```
Use social-media-mcp research_topic tool with topic "AI agents"
```

**If this works:** Issue is with Skills
**If this fails:** Issue is with MCP itself or Claude Code bug

---

## 📋 ACTION PLAN

1. **Test MCP directly** (bypass Skills)
2. **If MCP works:** Issue is Skill invocation - need to adjust Skill instructions
3. **If MCP fails:** Issue is MCP or Claude Code - need different approach

**For Jarvis to work TODAY:**

- Remove Skill intermediary for now
- Call MCPs directly from workflows
- Add Skills back once we understand the invocation issue

---

**Want me to test the MCP directly (no Skill) to isolate the issue?**
