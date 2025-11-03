# Deep Investigation: Why research_topic Fails

**Facts:**

1. ✅ social-media-mcp MCP is ✓ Connected
2. ✅ get_trending_topics WORKS perfectly
3. ❌ research_topic FAILS with "use_mcp_tool is not defined"
4. ✅ Server code looks fine (both tools implemented similarly)
5. ✅ Twitter credentials ARE configured

---

## Key Observation

**Same MCP server, different tools, different results:**

- get_trending_topics: 3 parameters → WORKS
- research_topic: 5 parameters (4 booleans) → FAILS

**This tells us:**

- Server connection: GOOD
- Server functionality: GOOD
- Simple tools: WORK
- Complex tools: FAIL

---

## The "use_mcp_tool is not defined" Error

**This error comes from CLAUDE CODE**, not from the MCP server.

**It means:**

- Claude Code tried to invoke the tool
- Used an internal function "use_mcp_tool" to do it
- That function failed or doesn't exist
- **This is a Claude Code internals issue**

---

## Hypothesis: Parameter Complexity Issue

**get_trending_topics parameters:**

```json
{
  "platform": "twitter",
  "category": "technology",
  "count": 10
}
```

**Simple types: string, string, number**

**research_topic parameters:**

```json
{
  "topic": "...",
  "includeHashtags": true,
  "includeFacts": true,
  "includeTrends": true,
  "includeNews": true
}
```

**Complex: string + 4 booleans**

**Possible issue:** Claude Code might have trouble passing multiple boolean parameters to MCP tools.

---

## Test This Hypothesis

**Try calling research_topic with JUST the topic:**

```
social-media-mcp/research_topic(topic: "test")
```

**If that works:** Problem is with boolean parameters
**If that fails:** Problem is something else

---

**Want me to test this?**

We can try manually calling research_topic with minimal parameters to isolate the issue.
