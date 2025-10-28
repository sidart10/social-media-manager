# MCP Server Installation Status for Jarvis

**Checked:** 2025-10-26

---

## ✅ Currently Installed & Working

| Server               | Status      | Purpose                   | Used By Jarvis           |
| -------------------- | ----------- | ------------------------- | ------------------------ |
| archon               | ✓ Connected | Project management        | No                       |
| serena               | ✓ Connected | Code navigation           | No                       |
| chrome-devtools      | ✓ Connected | Browser automation        | No                       |
| gpt-image-1          | ✓ Connected | Image generation          | No                       |
| nanobanana           | ✓ Connected | Image generation (Gemini) | No                       |
| heygen               | ✓ Connected | Avatar videos             | No                       |
| sora2                | ✓ Connected | Video generation          | No                       |
| veo3                 | ✓ Connected | Video generation          | No                       |
| mcp_twitter          | ✓ Connected | Twitter posting           | No (Jarvis doesn't post) |
| youtube-uploader-mcp | ✓ Connected | YouTube uploads           | No (Jarvis doesn't post) |

---

## ❌ Currently Failed

| Server       | Status   | Purpose           | Used By Jarvis               |
| ------------ | -------- | ----------------- | ---------------------------- |
| linkedin-mcp | ✗ Failed | LinkedIn analysis | **YES - CRITICAL**           |
| ig-mcp       | ✗ Failed | Instagram         | No (we'll use Apify instead) |

---

## 🚨 MISSING - Required for Jarvis

### Tier 1: CRITICAL (Must Have)

1. **apify_mcp** - Master scraper gateway
   - Status: ❌ Not installed
   - Purpose: Twitter, Instagram, TikTok analysis (5000+ actors)
   - Required by: analyze-profile (all platforms)
   - Priority: **HIGHEST**
   - API Key: ✅ Already in .env (APIFY_API_KEY)

2. **youtube-transcript** - Video transcripts
   - Status: ❌ Not installed
   - Purpose: Extract YouTube video transcripts
   - Required by: analyze-profile, research-topic
   - Priority: **HIGH**
   - API Key: ✅ None needed (FREE)

3. **script-generation-mcp** - Multi-agent script writing
   - Status: ❌ Not installed
   - Purpose: Generate scripts with AI refinement
   - Required by: write-posts, write-scripts, research-topic
   - Priority: **HIGH**
   - API Key: Check requirements

### Tier 2: Important (Should Have)

4. **exa-mcp** - Deep research engine
   - Status: ❌ Not installed
   - Purpose: Web search, deep research, company intel
   - Required by: research-topic, generate-ideas
   - Priority: **MEDIUM**
   - API Key: ❌ Need Exa API key

5. **youtube-mcp-server** - YouTube analytics
   - Status: ❌ Not installed (we have youtube-uploader but that's for posting, not analysis)
   - Purpose: Channel analytics, video engagement, quality scoring
   - Required by: analyze-profile (YouTube)
   - Priority: **MEDIUM**
   - API Key: ✅ YOUTUBE_API_KEY in .env

6. **social-media-mcp** - Trending topics
   - Status: ❌ Not installed
   - Purpose: Get trending topics, quick research
   - Required by: research-topic, generate-ideas
   - Priority: **MEDIUM**
   - API Key: Need Brave API key + OpenAI/Anthropic

### Tier 3: Optional (Nice to Have)

7. **linkedin-mcp** - LinkedIn analysis
   - Status: ✗ Failed to connect (was installed but broken)
   - Purpose: LinkedIn post analysis
   - Required by: analyze-profile (LinkedIn)
   - Priority: **LOW** (can use Apify fallback)
   - API Key: Need RapidAPI key

---

## 📋 Installation Plan

### Phase 1: Critical Servers (Do First)

#### 1. Install apify_mcp (HIGHEST PRIORITY)

**Installation:**

```bash
# Official Apify MCP server
npx -y @apify/mcp-server
```

**Configuration:**

```json
// Add to Claude Code MCP settings
{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server"],
      "env": {
        "APIFY_API_TOKEN": "your-apify-api-token-here"
      }
    }
  }
}
```

**Test:**

```
// Check available tools
// Should show: search-actors, fetch-actor-details, call-actor, get-actor-output
```

---

#### 2. Install youtube-transcript (HIGH PRIORITY)

**Installation:**

```bash
npm install -g @modelcontextprotocol/server-youtube-transcript
# OR
npx @modelcontextprotocol/server-youtube-transcript
```

**Configuration:**

```json
{
  "mcpServers": {
    "youtube-transcript": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-youtube-transcript"]
    }
  }
}
```

**Test:**

```
// Call: get_transcript with YouTube URL
// Should return transcript with timestamps
```

---

#### 3. Install script-generation-mcp (HIGH PRIORITY)

**Research needed:** Need to find correct package name and installation method

**Repository:** https://github.com/Pratik-Kumar-Cse/script-generation-mcp

**Installation:** (likely)

```bash
# Python-based MCP server
uv pip install script-generation-mcp
# OR
python -m script_generation_mcp.server
```

**Configuration:** TBD after researching

---

### Phase 2: Important Servers

#### 4. Install exa-mcp

**Research:** https://github.com/exa-labs/exa-mcp-server

**API Key Required:** Sign up at exa.ai

**Installation:** TBD after researching

---

#### 5. Install youtube-mcp-server

**Research:** https://github.com/dannySubsense/youtube-mcp-server

**Installation:** TBD after researching

---

#### 6. Install social-media-mcp

**Research:** https://github.com/tayler-id/social-media-mcp

**API Keys Needed:**

- Brave Search API
- OpenAI OR Anthropic API (already have)

**Installation:** TBD after researching

---

### Phase 3: Fix Broken Servers

#### 7. Fix linkedin-mcp

**Current Status:** ✗ Failed to connect

**Debug:**

- Check installation path
- Verify Python dependencies
- Check RapidAPI key configuration

**Or:** Use Apify fallback instead

---

## 🎯 Immediate Actions Required

**Before Testing Jarvis:**

1. **Install apify_mcp** (15 min)
   - Most critical
   - Unlocks Instagram, TikTok, Twitter analysis
   - Test with simple actor call

2. **Install youtube-transcript** (10 min)
   - Simple, no API key needed
   - Test with sample YouTube URL

3. **Install script-generation-mcp** (20 min)
   - Research correct installation method
   - Test script generation

4. **Decide on remaining servers** (30 min)
   - exa-mcp: Need API key ($)
   - youtube-mcp-server: Need to install
   - social-media-mcp: Need Brave API key ($)

---

## 💡 My Recommendation

**Option A: Install Critical 3 Now** (45 min)

- apify_mcp
- youtube-transcript
- script-generation-mcp

**Then test basic workflows:**

- analyze-profile with Instagram (uses Apify)
- research-topic with YouTube examples (uses youtube-transcript)
- write-posts with script-generation-mcp

**Result:** Core functionality working, can test immediately

**Option B: Install All 6 Servers** (2-3 hours)

- All 3 critical
- Plus exa-mcp, youtube-mcp-server, social-media-mcp
- Research each, get API keys where needed
- Full testing capability

**Result:** Complete system, no limitations

---

**Which approach would you prefer?**

Or should I start with just **apify_mcp** (the most critical one) and test it thoroughly first?
