# social-media-mcp Debug Report

**Date:** 2025-10-26
**Status:** Server runs manually but won't connect via Claude Code MCP

---

## ✅ What WORKS

**Manual Execution:**

```bash
cd /Users/sid/.mcp-servers/social-media-mcp
export OPENAI_API_KEY="..."
export BRAVE_API_KEY="..."
export ANTHROPIC_API_KEY="..."
node build/index.js
```

**Output:**

- ✓ All clients initialize successfully
- ✓ OpenAI strategy available
- ✓ Anthropic strategy available
- ✓ Brave Search initialized
- ✓ Twitter client ready
- ✓ Server starts without crashing

---

## ❌ What DOESN'T WORK

**Claude Code MCP Connection:**

```
social-media-mcp: node /Users/sid/.mcp-servers/social-media-mcp/build/index.js - ✗ Failed to connect
```

**Configuration:**

```json
{
  "social-media-mcp": {
    "type": "stdio",
    "command": "node",
    "args": ["/Users/sid/.mcp-servers/social-media-mcp/build/index.js"],
    "env": {
      "OPENAI_API_KEY": "...",
      "ANTHROPIC_API_KEY": "...",
      "BRAVE_API_KEY": "...",
      "LOG_LEVEL": "info",
      "CACHE_ENABLED": "true"
    }
  }
}
```

---

## 🔍 Possible Issues

1. **MCP Protocol Implementation**
   - Server may not implement MCP stdio protocol correctly
   - May need specific flags or initialization

2. **Startup Sequence**
   - May need time to initialize before accepting MCP commands
   - May require specific initialization sequence

3. **Missing ENV Vars**
   - Warnings about MASTODON and LINKEDIN tokens
   - May block MCP handshake even though not needed for our use

4. **Build Issue**
   - TypeScript compilation may have issues
   - Check for errors in build/

---

## 🎯 WORKAROUND STRATEGY

**Since social-media-mcp won't connect via MCP but WORKS manually:**

### Option A: Skip social-media-mcp for Now

- Use exa-mcp for research (web_search_exa works great)
- Use apify for trending data if needed
- social-media-mcp provides: get_trending_topics, research_topic
- exa provides: web_search_exa, deep_researcher (similar functionality)

**Impact:** Minimal - exa covers most research needs

### Option B: Call it Directly (Not via MCP)

- Workflows could call the server directly via HTTP/REST if it has an API
- Or invoke as child process
- More complex but guaranteed to work

### Option C: Debug Deeper

-Check MCP protocol implementation in source code

- Add MCP logging
- Test with MCP Inspector tool

---

## 💡 RECOMMENDATION

**Skip social-media-mcp for Phase 1 testing:**

**Rationale:**

- exa-mcp provides similar research capabilities
- apify can get trending data from platforms
- Not critical for core functionality
- Can add later once debugged

**What we HAVE working:**

- ✅ apify - Platform scraping (CRITICAL)
- ✅ exa - Research (covers what social-media-mcp would do)
- ✅ youtube-transcript - Transcripts

**This is sufficient for:**

- research-topic (use exa instead of social-media-mcp)
- analyze-profile (use apify)
- generate-ideas (use exa + apify)
- learn-voice (use apify)
- competitive-analysis (use apify)

**Writing workflows:**

- Keep script_generation_mcp references for user's separate plan

---

## 🚀 NEXT STEPS

**Instead of debugging social-media-mcp further:**

1. **Update research workflows to use exa instead** (20 min)
   - research-topic: Use exa/web_search_exa
   - generate-ideas: Use exa for trends

2. **Test with working MCPs** (30 min)
   - Test apify tools
   - Test exa tools
   - Test youtube-transcript

3. **Validate Jarvis core workflows** (1 hour)
   - research-topic
   - analyze-profile
   - generate-ideas

4. **Come back to social-media-mcp later**
   - Debug when have more time
   - Or accept exa as replacement

---

**Proceed with this approach?**
