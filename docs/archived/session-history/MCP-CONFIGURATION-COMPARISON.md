# MCP Configuration Comparison - Why Some Work, Others Don't

**Analysis:** Comparing working vs failing MCPs

---

## ✅ WORKING MCPs

### exa (Works Perfectly)

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": {
    "EXA_API_KEY": "..."
  }
}
```

**Pattern:**

- Uses npx (package from npm)
- Simple, standard MCP server
- Minimal env vars

---

### get_trending_topics (Works)

```
Tool: social-media-mcp/get_trending_topics
Parameters: 3 (platform, category, count)
Result: Success
```

**Pattern:**

- Same social-media-mcp server as research_topic
- Simpler parameters (no complex booleans)

---

## ❌ FAILING MCPs

### research_topic (Fails)

```
Tool: social-media-mcp/research_topic
Parameters: 5 (topic + 4 booleans)
Result: "use_mcp_tool is not defined"
```

**Pattern:**

- Complex parameters (includeHashtags, includeFacts, includeTrends, includeNews)
- Same server as working get_trending_topics
- **Only difference: parameter complexity**

---

### youtube-transcript (Different Error)

```
Tool: youtube-transcript/get_transcripts
Error: "No transcripts found"
```

**This is NOT the same error!**

- Not "use_mcp_tool is not defined"
- Tool is being called successfully
- Error is from the tool itself (video has no captions)

---

## 💡 THE REAL ISSUE

**"use_mcp_tool is not defined" is specific to social-media-mcp/research_topic**

**Hypothesis:**

- Not a Claude Code bug
- Not a configuration issue
- Specific to research_topic tool with complex parameters
- Might be how the tool is registered in social-media-mcp server

**youtube-transcript:**

- Different error (tool works, video just has no captions)
- Try different video URL

---

## 🎯 TESTS TO RUN

### Test 1: research_topic with Minimal Parameters

Try calling with JUST topic (no booleans):

```
social-media-mcp/research_topic(topic: "AI agents")
```

### Test 2: Different YouTube Video

Try video that definitely has captions:

- Popular tech channels
- Videos with CC icon
- Educational content

### Test 3: Check social-media-mcp Tool Registration

Look at how get_trending_topics vs research_topic are registered differently in the server code.

---

**Want me to investigate the social-media-mcp source code to see why research_topic fails but get_trending_topics works?**
