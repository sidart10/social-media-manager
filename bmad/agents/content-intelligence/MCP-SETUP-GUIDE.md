# Jarvis - Complete MCP Server Setup Guide

**Created:** 2025-10-26
**Purpose:** Install and test all MCP servers required for Jarvis workflows

---

## 🎯 MCP Servers Required

### Tier 1: CRITICAL (Free or Account-Based)
1. ✅ **youtube-transcript** - Installed & Connected
2. ⏳ **apify** - Installed, testing connection
3. ❌ **script-generation-mcp** - Need to install

### Tier 2: Important (Enhanced Capabilities)
4. ❌ **exa-mcp** - Need API key + install
5. ❌ **youtube-mcp-server** - Need to install (different from youtube-uploader)
6. ❌ **social-media-mcp** - Need to install

### Tier 3: Already Have (For Reference)
- ✅ linkedin-mcp (Failed - but we have Apify fallback)
- ✅ mcp_twitter (For posting only, not analysis)

---

## 📋 Installation & Testing Log

### 1. youtube-transcript ✅ COMPLETE

**Package:** `@sinco-lab/mcp-youtube-transcript`
**Status:** ✓ Connected
**API Key:** None required (FREE)

**Installation:**
```bash
claude mcp add youtube-transcript --scope user -- npx -y @sinco-lab/mcp-youtube-transcript
```

**Configuration:**
```json
{
  "youtube-transcript": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@sinco-lab/mcp-youtube-transcript"]
  }
}
```

**Test:** (To be executed)
```
Tool: get_transcript
Input: url="https://youtube.com/watch?v=dQw4w9WgXcQ", lang="en"
Expected: Transcript text with timestamps
```

---

### 2. apify (Apify Actors MCP Server) ⏳ IN PROGRESS

**Package:** `@apify/actors-mcp-server` (not @apify/mcp-server!)
**Status:** Installed, testing connection
**API Key:** ✅ `your-apify-api-token-here`

**Installation:**
```bash
# Manual config edit (claude mcp add doesn't support env vars easily)
# Added via Python script to .claude.json
```

**Configuration:**
```json
{
  "apify": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@apify/actors-mcp-server"],
    "env": {
      "APIFY_TOKEN": "your-apify-api-token-here"
    }
  }
}
```

**Test:** (To be executed)
```
Tool: search-actors
Input: query="instagram profile scraper"
Expected: List of Instagram scraper actors

Tool: fetch-actor-details
Input: actorId="apify/instagram-scraper"
Expected: Actor metadata and required inputs

Tool: call-actor (with approval - costs money)
Input: actorId="apify/instagram-scraper", input={username:"test", maxPosts:10}
Expected: run_id and dataset_id

Tool: get-actor-output
Input: datasetId="[from previous]"
Expected: Array of Instagram posts
```

**Issue:** Currently failing to connect - needs investigation

**Next Steps:**
- Check if @apify/actors-mcp-server package exists
- Try alternative installation methods
- Check Apify documentation for latest package name

---

### 3. script-generation-mcp ❌ TO INSTALL

**Repository:** https://github.com/Pratik-Kumar-Cse/script-generation-mcp
**Status:** Not installed
**API Key:** TBD (check repo)

**Research Needed:**
- Correct package name
- Installation method (npm vs python vs uv)
- Environment variables required
- Available tools

**Installation:** TBD

---

### 4. exa-mcp ❌ TO INSTALL

**Repository:** https://github.com/exa-labs/exa-mcp-server
**Status:** Not installed
**API Key:** ❌ Need to sign up at exa.ai

**Installation:** (likely)
```bash
npx exa-mcp-server
# OR
npm install -g exa-mcp-server
```

**Configuration:**
```json
{
  "exa-mcp": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "exa-mcp-server"],
    "env": {
      "EXA_API_KEY": "[get from exa.ai]"
    }
  }
}
```

**Tools:**
- web_search_exa
- deep_researcher_start
- deep_researcher_check
- company_research
- linkedin_search

---

### 5. youtube-mcp-server ❌ TO INSTALL

**Repository:** https://github.com/dannySubsense/youtube-mcp-server
**Status:** Not installed
**API Key:** ✅ YOUTUBE_API_KEY in .env

**Note:** Different from youtube-uploader-mcp (which we have)
- youtube-uploader-mcp: For uploading videos
- youtube-mcp-server: For analytics and data extraction

**Installation:** TBD

---

### 6. social-media-mcp ❌ TO INSTALL

**Repository:** https://github.com/tayler-id/social-media-mcp
**Status:** Not installed
**API Keys Needed:**
- Brave Search API (for research)
- OpenAI OR Anthropic (already have)
- Twitter/LinkedIn/Mastodon APIs (for posting - not needed)

**Installation:** TBD

---

## 🚨 Current Blocker

**Apify MCP server failing to connect**

**Possible Issues:**
1. Package name might be different (@apify/actors-mcp-server vs @apify/mcp-server)
2. MCP server might be HTTP-based, not stdio
3. Might need different configuration approach

**Research Needed:**
- Check Apify's official MCP documentation
- Try HTTP endpoint: https://mcp.apify.com
- Test with curl or direct connection

---

## 🎯 Next Steps

### Immediate (Before Testing Jarvis):

1. **Fix Apify MCP connection** (30 min)
   - Research correct configuration
   - Test connection
   - Verify tools available

2. **Install script-generation-mcp** (20 min)
   - Research installation
   - Configure
   - Test basic script generation

3. **Decision: Other servers** (15 min)
   - Evaluate if exa-mcp, youtube-mcp-server, social-media-mcp are essential
   - Or can Jarvis work with just Apify + youtube-transcript + script-generation?

### Minimum Viable MCP Stack:

**For basic Jarvis testing:**
- ✅ youtube-transcript (have it)
- ⏳ apify (fixing connection)
- ❌ script-generation-mcp (need it)

**With these 3, Jarvis can:**
- ✅ analyze-profile (all platforms via Apify)
- ✅ generate-ideas (with script-generation-mcp)
- ✅ write-posts (with script-generation-mcp)
- ✅ write-scripts (with script-generation-mcp + youtube-transcript)
- ⚠️ research-topic (limited - no deep research without exa-mcp)

---

## 💡 Recommendation

**Focus on getting these 3 working FIRST:**

1. youtube-transcript ✅ (already done)
2. apify ⏳ (fixing now)
3. script-generation-mcp ❌ (install next)

**Then test core workflows before adding more servers.**

This gets us 80% functionality with minimal setup time.

---

*Installation guide - update as servers are configured and tested*
