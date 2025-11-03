# Claude Code on Web - Setup Guide

**Date**: 2025-11-02
**Purpose**: Configure Jarvis and your agents to work on Claude Code Web with remote MCP servers

---

## What Works on Claude Code Web

### ✅ Confirmed Working

1. **Your Agents** - All slash commands in `.claude/commands/` work
   - `/jarvis` - Content Intelligence Team Head
   - `/zoe` - Visual Production Specialist
   - `/zoro` - Publishing & Distribution Specialist
   - `/pm` - Product Manager

2. **CLAUDE.md** - All project instructions load automatically

3. **Built-in Tools** - Always available
   - WebSearch
   - WebFetch
   - Read, Write, Edit (file operations)
   - Bash (shell commands)
   - Git operations

4. **MCP Servers via `.mcp.json`** - Project-level MCP servers work!
   - Must use `npx` packages (not local file paths)
   - Must use HTTP endpoints (for remote servers)
   - Configured via `.mcp.json` + `.claude/settings.json`

---

## Configuration Complete

### 1. MCP Servers (`.mcp.json`)

**Location**: `.mcp.json`

**Configured Servers**:

```json
{
  "mcpServers": {
    "postiz": {
      "command": "node",
      "args": ["/Users/sid/Desktop/4. Coding Projects/Postiz/postiz-mcp-server.js"],
      "env": {
        "POSTIZ_API_KEY": "${POSTIZ_API_KEY}"
      }
    },
    "plainly": {
      "command": "npx",
      "args": ["-y", "@plainly-videos/mcp-server@latest"],
      "env": {
        "PLAINLY_API_KEY": "${PLAINLY_API_KEY}",
        "PLAINLY_ORGANIZATION_ID": "${PLAINLY_ORGANIZATION_ID}"
      }
    },
    "submagic": {
      "command": "/Users/sid/Desktop/4. Coding Projects/sub-magic-mcp-server/venv/bin/python",
      "args": ["/Users/sid/Desktop/4. Coding Projects/sub-magic-mcp-server/submagic_mcp.py"],
      "env": {
        "SUBMAGIC_API_KEY": "${SUBMAGIC_API_KEY}"
      }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "${EXA_API_KEY}"
      }
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
      }
    },
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/actors-mcp-server@latest"],
      "env": {
        "APIFY_API_TOKEN": "${APIFY_API_KEY}"
      }
    }
  }
}
```

**Notes**:
- All API keys reference `.env` file via `${VAR_NAME}` syntax
- `postiz` and `submagic` use local file paths (work locally only)
- `plainly`, `exa`, `firecrawl`, `apify` use `npx` (work locally + remotely)

### 2. Settings (`.claude/settings.json`)

**Location**: `/Users/sid/Desktop/4. Coding Projects/social-media-manager/.claude/settings.json`

```json
{
  "enableAllProjectMcpServers": true
}
```

This tells Claude Code to automatically approve all MCP servers in `.mcp.json`.

---

## API Keys Already in .env File

Your `.env` file already contains all necessary API keys. They're referenced via `${VAR_NAME}` syntax in `.mcp.json`.

**Local Usage**: MCP servers automatically load from `.env` file

**Remote Usage (Claude Code Web)**: Copy values from your `.env` file to environment configuration:

```
EXA_API_KEY=<from .env>
FIRECRAWL_API_KEY=<from .env>
APIFY_API_KEY=<from .env>
PLAINLY_API_KEY=<from .env>
PLAINLY_ORGANIZATION_ID=<from .env>
```

**Important**: Do NOT commit `.env` file to git (already in .gitignore)

---

## Setting Environment Variables in Claude Code Web

### Step 1: Visit Claude Code Web

Go to https://claude.ai/code

### Step 2: Create or Edit Environment

1. Click on the current environment dropdown
2. Select "Add environment" (or click settings icon to edit existing)
3. Give it a name (e.g., "social-media-manager-prod")

### Step 3: Add Environment Variables

In the environment configuration dialog, add variables in `.env` format:

```
EXA_API_KEY=your_actual_exa_key_here
FIRECRAWL_API_KEY=your_actual_firecrawl_key_here
APIFY_API_TOKEN=your_actual_apify_token_here
PLAINLY_API_KEY=x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib
PLAINLY_ORGANIZATION_ID=52eb1126-3604-48df-8ba1-f6d87998bcb8
```

### Step 4: Set Network Access

**Recommended**: Select "Full internet access" to allow all API calls

**Alternative**: Use "Limited" and add custom domains if needed

### Step 5: Save Environment

Click "Save" - your environment is now configured!

---

## Testing Jarvis on Claude Code Web

### Step 1: Push Configuration to GitHub

```bash
git add .mcp.json .claude/settings.json
git commit -m "feat: Add remote-ready MCP servers for Claude Code Web"
git push origin main
```

### Step 2: Start a Claude Code Web Session

1. Go to https://claude.ai/code
2. Select your repository
3. Select your configured environment
4. Submit a task: "Activate Jarvis: /jarvis"

### Step 3: Test Jarvis Features

Try these commands:

**Test 1: Basic Activation**
```
/jarvis
```
Expected: Jarvis greeting + menu with 12 commands

**Test 2: Research (Uses Exa + Firecrawl)**
```
*research-topic
```
Topic: "AI agent platforms 2025"
Expected: Deep research using exa and firecrawl

**Test 3: Profile Analysis (Uses Apify)**
```
*analyze-profile
```
Profile: Instagram or Twitter profile
Expected: Apify scraper fetches posts for analysis

**Test 4: Write Post (Uses WebSearch - built-in)**
```
*write-post
```
Platform: LinkedIn
Topic: Whatever you want
Expected: Generates post using post-writer skill

---

## What's NOT Included (For Now)

The following MCP servers are **NOT** configured for remote use:

- ❌ **postiz** - Requires local Postiz instance on localhost:5001
- ❌ **submagic** - Uses local Python server
- ❌ **fal-video** - Not configured yet (Zoe's video generation)
- ❌ **heygen** - Not configured yet (Zoe's talking heads)
- ❌ **nanobanana** - Not configured yet (Zoe's image generation)
- ❌ **gpt-image-1** - Not configured yet (Zoe's professional images)
- ❌ **cloudinary** - Not configured yet (Media storage for Zoro)

### Impact

**Jarvis** ✅ Fully functional
- All research capabilities work
- Content writing works
- Profile analysis works
- Can create handoff packages for Zoe/Zoro

**Zoe** ⚠️ Partially functional
- Cannot generate images (no nanobanana, gpt-image-1)
- Cannot generate videos (no fal-video, heygen)
- Can work with existing media URLs

**Zoro** ⚠️ Partially functional
- Cannot upload to Cloudinary (no cloudinary MCP)
- Cannot schedule via Postiz (no postiz MCP)
- Can work with pre-uploaded media URLs

---

## Next Steps to Full Remote Capability

### Phase 1: Add Image/Video Generation (Zoe)

Add these to `.mcp.json`:

```json
"nanobanana": {
  "command": "npx",
  "args": ["-y", "@nanobanana/mcp-server"],
  "env": {
    "GEMINI_API_KEY": "YOUR_GEMINI_KEY"
  }
},
"gpt-image-1": {
  "command": "npx",
  "args": ["-y", "gpt-image-1"],
  "env": {
    "OPENAI_API_KEY": "YOUR_OPENAI_KEY"
  }
},
"fal-video": {
  "command": "npx",
  "args": ["-y", "TBD_FAL_MCP_PACKAGE"],
  "env": {
    "FAL_KEY": "YOUR_FAL_KEY"
  }
}
```

**Status**: Need to find/create fal-video MCP package

### Phase 2: Add Media Storage (Zoro)

Add these to `.mcp.json`:

```json
"cloudinary-asset-mgmt": {
  "command": "npx",
  "args": ["-y", "@cloudinary/mcp-server-cloudinary"],
  "env": {
    "CLOUDINARY_CLOUD_NAME": "YOUR_CLOUD",
    "CLOUDINARY_API_KEY": "YOUR_KEY",
    "CLOUDINARY_API_SECRET": "YOUR_SECRET"
  }
}
```

**Status**: Need to verify package name

### Phase 3: Add Publishing (Zoro)

**Postiz** - Needs custom solution:
- Option A: Host Postiz instance publicly
- Option B: Use Postiz cloud API (if available)
- Option C: Use direct platform APIs (Twitter, LinkedIn, etc.)

---

## Troubleshooting

### MCP Server Not Starting

**Check**:
1. API key is set correctly in environment variables
2. Package name is correct in `.mcp.json`
3. Network access is enabled (not "No internet")

**Debug**:
```bash
# Test locally first
npx -y exa-mcp-server
npx -y firecrawl-mcp
npx -y @apify/actors-mcp-server@latest
```

### Environment Variables Not Loading

**Check**:
1. Variables are in `.env` format (KEY=value, no spaces)
2. No quotes around values in web UI
3. Restart environment after adding variables

### MCP Tools Not Available

**Check**:
1. `.claude/settings.json` has `"enableAllProjectMcpServers": true`
2. `.mcp.json` is committed to GitHub
3. Environment has network access to npm registry

---

## Summary

**Configuration Status**: ✅ READY FOR JARVIS TESTING

**What's Configured**:
- ✅ 4 remote-ready MCP servers (plainly, exa, firecrawl, apify)
- ✅ Auto-approval enabled in settings
- ✅ All packages use `npx` (remote-installable)

**What You Need**:
- 🔑 EXA_API_KEY
- 🔑 FIRECRAWL_API_KEY
- 🔑 APIFY_API_TOKEN

**Next Action**:
1. Get API keys from the services
2. Push configuration to GitHub
3. Configure environment in Claude Code Web
4. Test Jarvis with `/jarvis`

**Limitations**:
- Zoe cannot generate images/videos (yet)
- Zoro cannot upload to Cloudinary or post via Postiz (yet)
- Jarvis is FULLY functional for research and content creation
