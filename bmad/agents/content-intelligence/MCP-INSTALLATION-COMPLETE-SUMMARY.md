# MCP Server Installation - Complete Summary & Next Steps

**Date:** 2025-10-26
**Session End Summary**

---

## ✅ Successfully Installed

| Server | Status | Command | Purpose |
|--------|--------|---------|---------|
| youtube-transcript | ✓ Connected | `npx -y @sinco-lab/mcp-youtube-transcript` | Extract video transcripts with timestamps |
| script-generation | ⏳ Added | `uvx script_generator_server` | Multi-agent script generation |

**Test Status:** Need to verify script-generation connects

---

## ❌ Installation Issues

### Apify MCP Server - CRITICAL BLOCKER

**Problem:** Cannot connect to Apify MCP

**Attempts:**
1. ✗ `npx -y @apify/mcp-server` - Package doesn't exist
2. ✗ `npx -y @apify/actors-mcp-server` (stdio) - Connection fails
3. ✗ `https://mcp.apify.com` (HTTP) - Connection fails

**Impact:** HIGH
- Blocks: Instagram, TikTok, Twitter profile analysis
- Affects: analyze-profile, competitive-analysis workflows

**Solutions to Try:**
1. **Use hosted HTTP endpoint with OAuth** (most likely solution)
   - URL: https://mcp.apify.com
   - Requires OAuth authentication flow
   - Check Apify docs: https://docs.apify.com/platform/integrations/mcp

2. **Debug stdio connection**
   - Test `@apify/actors-mcp-server` directly
   - Check for error messages
   - Verify APIFY_TOKEN format correct

3. **Alternative**: Use individual Apify actor HTTP APIs directly
   - Bypass MCP server
   - Call Apify REST API manually in workflows
   - More work but guaranteed to work

---

## ❌ Not Yet Installed

### exa-mcp (Deep Research)

**Package:** `exa-mcp-server`
**API Key:** ❌ Need to get from https://dashboard.exa.ai/api-keys

**Installation Command:**
```bash
claude mcp add exa --scope user -e EXA_API_KEY=your_key_here -- npx -y exa-mcp-server
```

**Tools:**
- web_search_exa
- deep_researcher_start
- deep_researcher_check
- company_research
- linkedin_search

**Impact if Missing:** MEDIUM
- research-topic less comprehensive (no deep research)
- generate-ideas has fewer sources
- Workflows still functional, just less robust

---

### youtube-mcp-server (YouTube Analytics)

**Repository:** https://github.com/dannySubsense/youtube-mcp-server
**Type:** Python-based (not npm)
**API Key:** ✅ YOUTUBE_API_KEY already in .env

**Installation:** (requires cloning repo)
```bash
# Clone repo
git clone https://github.com/dannySubsense/youtube-mcp-server
cd youtube-mcp-server

# Add to Claude Code config
# (Python-based, needs path to youtube_mcp_server.py)
```

**Impact if Missing:** LOW
- Can still analyze YouTube with youtube-transcript
- Just miss advanced analytics features
- Not critical for core functionality

---

###social-media-mcp (Trends & Posting)

**Repository:** https://github.com/tayler-id/social-media-mcp
**API Keys Needed:**
- Brave Search API (for research)
- OpenAI/Anthropic ✅ (already have)

**Impact if Missing:** LOW
- research-topic less trend-aware
- generate-ideas can't pull trending topics
- Workflows still functional

---

## 🎯 Minimum Viable MCP Stack for Jarvis

**To make Jarvis functional, we NEED:**

### Must Have (Can't work without):
1. ✅ youtube-transcript - For transcript extraction
2. ⏳ **Apify OR individual platform scrapers** - For profile analysis
3. ⏳ script-generation - For content generation

### Nice to Have (Enhanced capabilities):
4. exa-mcp - Better research
5. youtube-mcp-server - Better YouTube analytics
6. social-media-mcp - Trending topics

---

## 💡 Immediate Next Steps

### Option A: Fix Apify MCP (Recommended)
**Time:** 30-60 min
**Unlock:** Instagram, TikTok, Twitter analysis

**Steps:**
1. Research Apify MCP OAuth flow for HTTP endpoint
2. Try https://mcp.apify.com with proper authentication
3. Check Apify Discord/GitHub issues
4. Test connection thoroughly

**If successful:** 90% of Jarvis unlocked

### Option B: Use Apify REST API Directly
**Time:** 2-3 hours
**Workaround:** Bypass MCP, call Apify API directly

**Steps:**
1. Create wrapper functions for Apify REST API
2. Modify workflows to use direct API calls instead of MCP
3. Handle authentication and response parsing

**If successful:** 100% functional but without MCP abstraction

### Option C: Install Optional Servers First
**Time:** 1-2 hours
**Get:** exa-mcp, youtube-mcp-server

**Steps:**
1. Get Exa API key
2. Install exa-mcp
3. Clone and configure youtube-mcp-server

**If successful:** Better research and YouTube analytics (but still no Instagram/TikTok)

---

## 📊 Current MCP Coverage

**Working MCP Servers:** 12 total
- For Jarvis needs: 1/6 (youtube-transcript only)
- For other agents: 11/12

**Jarvis Functionality Without Full MCP:**
- research-topic: 40% (limited research, no trends)
- analyze-profile: 20% (YouTube only)
- learn-voice: 60% (if can fetch user posts manually)
- generate-ideas: 30% (without research/trends)
- competitive-analysis: 20% (YouTube only)
- write-posts: 0% (needs script-generation-mcp)
- write-scripts: 0% (needs script-generation-mcp)

**With script-generation-mcp working:**
- write-posts: 80%
- write-scripts: 80%

**With Apify working:**
- analyze-profile: 100% (all platforms)
- competitive-analysis: 100%
- research-topic: 60%
- generate-ideas: 70%

---

## 🎯 Recommendation

**Priority 1:** Verify script-generation-mcp connects
- Just added it
- Need to check status
- Critical for writing workflows

**Priority 2:** Debug Apify MCP thoroughly
- Check latest Apify docs
- Try OAuth flow
- Critical for profile analysis

**Priority 3:** Test what works
- Test youtube-transcript
- Test research-topic (limited)
- Test YouTube profile analysis

**Priority 4:** Decide on optional MCPs
- Get Exa API key if want deep research
- Install youtube-mcp-server if want advanced YouTube analytics

---

*MCP installation 33% complete (2/6 critical servers)*
*Need: Apify fix + script-generation verification*
*Then: Test workflows!*
