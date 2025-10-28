# Jarvis Agent - MCP Integration Fix Plan

**Date**: 2025-10-27
**Status**: 🚨 CRITICAL - MCP Layer Broken
**Impact**: 4/7 workflows blocked, 3/7 degraded

---

## Executive Summary

The Jarvis agent file structure is now correct, but **MCP dependencies are broken**. The workflows reference MCP servers that either:

1. Don't exist (script_generation_mcp - FICTIONAL)
2. Failed to connect (social-media-mcp, linkedin-mcp, ig-mcp)
3. Were removed due to schema errors (apify)

**Current State**: Agent activates but workflows fail when executed.

---

## MCP Dependency Analysis

### Working MCP Servers (13 total) ✅

| Server               | Status        | Used By               |
| -------------------- | ------------- | --------------------- |
| archon               | ✅ Connected  | Project management    |
| serena               | ✅ Connected  | Code analysis         |
| chrome-devtools      | ✅ Connected  | Browser automation    |
| gpt-image-1          | ✅ Connected  | Image generation      |
| nanobanana           | ✅ Connected  | Image generation      |
| heygen               | ✅ Connected  | Avatar videos         |
| sora2                | ✅ Connected  | Video generation      |
| veo3                 | ✅ Connected  | Video generation      |
| mcp_twitter          | ✅ Connected  | Twitter scraping      |
| youtube-uploader-mcp | ✅ Connected  | YouTube uploads       |
| youtube-transcript   | ✅ Connected  | Transcript extraction |
| exa                  | ✅ Connected  | Web search            |
| neon                 | ⚠️ Needs auth | Database (not used)   |
| vercel               | ⚠️ Needs auth | Deployment (not used) |

### Broken/Missing MCP Servers (4 total) ❌

| Server                | Status               | Impact                 |
| --------------------- | -------------------- | ---------------------- |
| script_generation_mcp | ❌ DOES NOT EXIST    | Blocks 4/7 workflows   |
| social-media-mcp      | ❌ Failed to connect | Degrades 2/7 workflows |
| linkedin-mcp          | ❌ Failed to connect | Degrades 3/7 workflows |
| ig-mcp                | ❌ Failed to connect | Future workflows       |

---

## Workflow Dependency Matrix

### Workflow: research-topic

**Status**: 🟡 DEGRADED (can run with alternatives)

**Depends On**:

- ❌ script_generation_mcp (add_note, summarize_notes) - **BLOCKER**
- ✅ exa_mcp (web_search_exa) - Working
- ❌ social_media_mcp (get_trending_topics) - Broken
- ✅ youtube_transcript (get_transcript) - Working

**Fix Options**:

1. Remove script_generation_mcp → Use native session management
2. Fix social-media-mcp → Or use exa for trends

---

### Workflow: generate-ideas

**Status**: 🟡 DEGRADED

**Depends On**:

- ❌ script_generation_mcp (add_note, summarize_notes) - **BLOCKER**
- ❌ social_media_mcp (get_trending_topics) - Broken
- ✅ exa_mcp (web_search_exa) - Working

**Fix Options**:

1. Remove script_generation_mcp → Use native brainstorming
2. Fix social-media-mcp → Or skip trending integration

---

### Workflow: write-posts

**Status**: 🔴 BLOCKED

**Depends On**:

- ❌ script_generation_mcp (script_generate, add_note) - **BLOCKER**

**Custom Modules** (all exist ✅):

- ✅ twitter_api_client - Validation
- ✅ linkedin_api_client - Formatting

**Fix Options**:

1. Remove script_generation_mcp → Use native content generation

---

### Workflow: write-scripts

**Status**: 🔴 BLOCKED

**Depends On**:

- ❌ script_generation_mcp (script_generate, add_note) - **BLOCKER**

**Fix Options**:

1. Remove script_generation_mcp → Use native script writing

---

### Workflow: analyze-profile

**Status**: 🟡 DEGRADED (expensive fallback)

**Depends On**:

- ❌ linkedin_mcp (get_profile, get_posts) - Failed
- ✅ mcp_twitter (working) - For Twitter profiles
- ⚠️ apify (removed) - Was fallback

**Fix Options**:

1. Fix linkedin-mcp installation
2. Accept degraded function (Twitter only)
3. Re-enable apify with actor-specific tools

---

### Workflow: learn-voice

**Status**: 🟡 DEGRADED

**Depends On**:

- ❌ linkedin_mcp (get_posts) - Failed
- ✅ mcp_twitter (working) - For Twitter voice
- ⚠️ apify (removed) - Was fallback

**Fix Options**:

1. Fix linkedin-mcp
2. Accept Twitter-only voice learning
3. Manual upload of LinkedIn posts

---

### Workflow: competitive-analysis

**Status**: 🟡 DEGRADED

**Depends On**:

- ❌ linkedin_mcp (get_profile) - Failed
- ✅ mcp_twitter (working) - For Twitter competitors
- ✅ exa_mcp (working) - For web presence
- ⚠️ apify (removed) - Was fallback

**Fix Options**:

1. Fix linkedin-mcp
2. Accept limited platform coverage

---

## Root Cause Analysis

### Issue #1: script_generation_mcp (FICTIONAL MCP)

**Problem**: This MCP server **DOES NOT EXIST** in any known registry.

**Evidence**:

- Not in MCP server list
- No npm package found
- No GitHub repository
- Appears to be a conceptual placeholder

**Why It Was Created**:
The workflows were designed with an idealized note-taking/script generation system that doesn't actually exist.

**Impact**: 4/7 workflows completely blocked

**Solution**: Remove dependency and use native capabilities

---

### Issue #2: social-media-mcp (LOCAL BUILD ISSUE)

**Problem**: Server exists but fails to connect

**Path**: `/Users/sid/Desktop/social-media-mcp/build/index.js`

**Possible Causes**:

1. Build folder empty/missing
2. Dependencies not installed
3. Configuration error
4. Build script failed

**Fix Steps**:

```bash
cd /Users/sid/Desktop/social-media-mcp
ls build/  # Check if build exists
npm install
npm run build
npm run start  # Test
```

---

### Issue #3: linkedin-mcp (INSTALLATION ISSUE)

**Problem**: Command not found

**Current Config**: `linkedin-mcp` (expects binary in PATH)

**Possible Causes**:

1. Not installed
2. Not in PATH
3. Wrong binary name

**Fix Steps**:

```bash
which linkedin-mcp  # Check if installed
pipx install linkedin-mcp  # If not installed
# OR
pip install linkedin-mcp
```

---

### Issue #4: ig-mcp (PYTHON ENVIRONMENT)

**Problem**: Python script fails

**Path**: `/Users/sid/.mcp-servers/ig-mcp/src/instagram_mcp_server.py`

**Possible Causes**:

1. Python dependencies missing
2. Instagram credentials not configured
3. Script has errors

**Fix Steps**:

```bash
cd /Users/sid/.mcp-servers/ig-mcp
python3 -m pip install -r requirements.txt  # If exists
python3 src/instagram_mcp_server.py  # Test
```

---

## Recommended Fix Strategy

### Phase 1: Remove Fictional Dependencies (CRITICAL - Do First)

**script_generation_mcp** doesn't exist - remove from all workflows:

**Affected Workflows**:

1. research-topic
2. generate-ideas
3. write-posts
4. write-scripts

**Replacement Strategy**:

- **add_note** → Use file system writes to sessions/ folder
- **summarize_notes** → Use native Claude summarization
- **script_generate** → Use native Claude content generation

**Estimated Time**: 30-60 minutes

---

### Phase 2: Fix Working But Disconnected (HIGH Priority)

#### Fix social-media-mcp

```bash
cd /Users/sid/Desktop/social-media-mcp
npm install
npm run build
node build/index.js  # Test

# If works:
claude mcp list  # Verify connection
```

**Fallback**: Use exa_mcp for trending topics (already working)

**Estimated Time**: 15-30 minutes

---

#### Fix linkedin-mcp

```bash
# Option 1: Install via pipx
pipx install linkedin-mcp

# Option 2: Install via pip
pip3 install linkedin-mcp

# Verify
which linkedin-mcp
linkedin-mcp --help

# Test connection
claude mcp list
```

**Fallback**: Use custom linkedin_api_client module (already have it!) or mcp_twitter for Twitter-only analysis

**Estimated Time**: 10-20 minutes

---

### Phase 3: Fix ig-mcp (MEDIUM Priority - Future Use)

```bash
cd /Users/sid/.mcp-servers/ig-mcp
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt  # If exists
python3 src/instagram_mcp_server.py
```

**Fallback**: None needed yet (no Instagram workflows active)

**Estimated Time**: 20-30 minutes

---

### Phase 4: Handle Apify (OPTIONAL - Last Resort)

**Problem**: Removed due to schema validation error (tool #51 property key invalid)

**Options**:

1. **Don't re-enable** (RECOMMENDED) - Expensive, caused errors
2. **Re-enable selectively** - Only specific actors without schema issues
3. **Wait for fix** - Apify may update their MCP server

**Recommendation**: Keep removed, use alternatives

---

## Updated MCP Configuration Plan

### Minimal Working Set (No Cost, No Breaks)

```json
{
  "mcpServers": {
    // Content Intelligence
    "exa": {
      // ✅ Working - Web search
      "command": "npx",
      "args": ["-y", "exa-mcp-server"]
    },
    "youtube-transcript": {
      // ✅ Working - Transcripts
      "command": "npx",
      "args": ["-y", "@sinco-lab/mcp-youtube-transcript"]
    },
    "mcp_twitter": {
      // ✅ Working - Twitter data
      "command": "npx",
      "args": ["-y", "mcp_twitter"]
    },

    // Content Creation
    "chrome-devtools": {
      // ✅ Working - Browser automation
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
```

This gives you:

- ✅ Web research (exa)
- ✅ YouTube transcript analysis
- ✅ Twitter profile analysis
- ✅ Browser automation for any platform

---

### Recommended Working Set (Add If Fixed)

Add these if you can get them working:

```json
{
  "social-media-mcp": {
    // ⚠️ Needs build fix
    "command": "node",
    "args": ["/Users/sid/Desktop/social-media-mcp/build/index.js"]
  },
  "linkedin-mcp": {
    // ⚠️ Needs installation
    "command": "linkedin-mcp"
  }
}
```

---

## Workflow Update Plan

### Strategy: Remove script_generation_mcp + Use Native Capabilities

For each affected workflow, replace:

**OLD (fictional)**:

```yaml
mcp_tools_required:
  - script_generation_mcp: [add_note, summarize_notes]
```

**NEW (native)**:

```yaml
# No MCP needed - use native file writes and Claude summarization
session_management: native
note_taking: file_system
summarization: claude_native
```

**OLD (in instructions)**:

```xml
<action>Tool: script_generation_mcp/add_note</action>
```

**NEW (native)**:

```xml
<action>Write note to {sessions_folder}/notes-{topic}.md</action>
```

---

## Immediate Action Items

### Priority 1: Remove Fictional MCP (BLOCKER - 30 min)

**Files to Edit**:

1. `.claude/commands/jarvis/workflows/research-topic/workflow.yaml`
2. `.claude/commands/jarvis/workflows/generate-ideas/workflow.yaml`
3. `.claude/commands/jarvis/workflows/write-posts/workflow.yaml`
4. `.claude/commands/jarvis/workflows/write-scripts/workflow.yaml`
5. `.claude/commands/jarvis/workflows/research-topic/instructions.md`

**Changes**:

- Remove script_generation_mcp from mcp_tools_required
- Replace tool calls with native file operations
- Update instructions to use sessions/ folder

---

### Priority 2: Fix Broken MCPs (OPTIONAL - 1 hour)

**social-media-mcp**:

```bash
cd /Users/sid/Desktop/social-media-mcp
npm install && npm run build
```

**linkedin-mcp**:

```bash
pipx install linkedin-mcp
```

---

### Priority 3: Update instructions.md (15 min)

Remove references to fictional MCPs:

- Line 29: "Scripts: Use script-generation-mcp (local/free)" ❌
- Replace with: "Scripts: Use native Claude generation"

---

## Testing Plan After Fixes

### Test 1: research-topic

```bash
/jarvis
> 1 (research-topic)
Topic: "AI automation trends 2025"
```

**Expected**: Should work with exa + youtube-transcript + native notes

---

### Test 2: generate-ideas

```bash
/jarvis
> 4 (generate-ideas)
Topic: "Content automation"
```

**Expected**: Should work with exa + native ideation

---

### Test 3: write-posts

```bash
/jarvis
> 6 (write-posts)
Platform: linkedin
Idea: [from previous workflow]
```

**Expected**: Should work with native generation + linkedin_api_client module

---

## Recommended Approach

**OPTION A: Quick Fix (30-60 min) - RECOMMENDED**

1. Remove script_generation_mcp from all workflows
2. Use native file system for note-taking
3. Use native Claude for content generation
4. Test with minimal MCP dependencies

**Result**: 7/7 workflows functional with degraded features

---

**OPTION B: Full Fix (2-4 hours)**

1. Do Option A first
2. Fix social-media-mcp build
3. Install linkedin-mcp properly
4. Fix ig-mcp environment
5. Test all integrations

**Result**: 7/7 workflows functional with full features

---

**OPTION C: Hybrid (1-2 hours)**

1. Do Option A (remove fictional MCP)
2. Fix only linkedin-mcp (most important for Jarvis)
3. Accept exa as alternative to social-media-mcp
4. Skip ig-mcp for now

**Result**: 7/7 workflows functional, LinkedIn support, lower cost

---

## My Recommendation

**Start with OPTION A** (Quick Fix):

- Gets agent functional immediately
- Removes fictional dependencies
- Uses working MCP servers (exa, youtube-transcript, mcp_twitter)
- Native Claude is powerful enough for notes and content generation

**Then optionally do OPTION C**:

- Fix linkedin-mcp only (most valuable)
- Keep social-media-mcp broken (exa works fine)
- Skip ig-mcp (future)

**Total Time**: 1-1.5 hours to fully functional agent

---

## What Works RIGHT NOW (No Changes Needed)

These workflows can work with minimal edits:

1. **analyze-profile** (Twitter-only via mcp_twitter)
2. **learn-voice** (Twitter-only via mcp_twitter)
3. **competitive-analysis** (Twitter + exa)

These need script_generation_mcp removed: 4. **research-topic** (then works with exa + youtube-transcript) 5. **generate-ideas** (then works with exa) 6. **write-posts** (then works natively) 7. **write-scripts** (then works natively)

---

## Next Steps

**Do you want me to:**

1. **Option A (Quick)**: Remove script_generation_mcp and make agent functional NOW (30-60 min)
2. **Option B (Full)**: Fix all MCP servers comprehensively (2-4 hours)
3. **Option C (Hybrid)**: Remove fictional MCP + fix linkedin-mcp only (1-1.5 hours)

**My vote**: **Option A** - Get it working fast, optimize later!

---

**Status**: Ready to execute fix as soon as you give the go-ahead!
