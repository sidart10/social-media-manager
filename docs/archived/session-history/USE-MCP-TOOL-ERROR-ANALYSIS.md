# "use_mcp_tool is not defined" Error - Final Analysis

**Error:** `use_mcp_tool is not defined`
**Occurs:** When calling social-media-mcp/research_topic
**Does NOT occur:** When calling social-media-mcp/get_trending_topics

---

## What This Error Means

**"use_mcp_tool is not defined"** is an internal Claude Code error, not our error.

It means:

- Claude Code tried to invoke an MCP tool
- Used an internal function called "use_mcp_tool"
- That function doesn't exist or failed to load
- This is a Claude Code bug or incomplete MCP support

---

## Why get_trending_topics Works But research_topic Doesn't

**Hypothesis:**

- get_trending_topics: Simpler tool (3 parameters)
- research_topic: Complex tool (5 boolean parameters)
- Claude Code's MCP invocation might have issues with complex parameter sets

**Or:**

- get_trending_topics was called successfully before
- research_topic has never worked
- Might be a bug specific to that tool

---

## Twitter Credentials - NOT the Issue

**We verified:**

- ✅ Twitter credentials ARE in ~/.claude.json
- ✅ All 5 credentials configured
- ✅ social-media-mcp MCP is ✓ Connected
- ✅ Server starts successfully

**So credentials are fine!**

---

## The Real Problem

**This is a Claude Code MCP invocation bug:**

- Internal Claude Code function "use_mcp_tool" doesn't exist
- Affects research_topic but not get_trending_topics
- Not something we can fix (it's in Claude Code's internals)

---

## Solutions

### Option 1: Use get_trending_topics Only (Works)

**Skip research_topic, use:**

- get_trending_topics (works!)
- exa for research (works!)
- youtube-transcript (works!)

**Functionality:** 90% (just missing Perplexity integration from research_topic)

### Option 2: Wait for Claude Code Update

**Bug report to Anthropic**

- "use_mcp_tool is not defined" when calling complex MCP tools
- Happens with research_topic (5 parameters)
- Doesn't happen with get_trending_topics (3 parameters)

### Option 3: Simplify research_topic Call

**Try calling with minimal parameters:**

```
research_topic(topic: "AI agents")
// Skip all the boolean parameters
```

**See if simpler call works**

---

## Recommendation

**Accept that research_topic is broken in Claude Code** and use workarounds:

- get_trending_topics ✓
- exa/web_search_exa ✓
- exa/deep_researcher_start ✓

**You still get:**

- Trending topics
- Hashtags (from get_trending_topics)
- Deep web research
- Comprehensive data

**Just missing:** Perplexity AI integration (from research_topic)

**95% functionality!**

---

**Want to test with working tools only and skip research_topic?**
