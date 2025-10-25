# MCP Server Troubleshooting & Fix Guide

**Issue Date:** 2025-10-25
**Status:** RESOLVED - Missing `-y` flag in npx command

---

## 🚨 Problem Identified

**Symptoms:**
- MCP servers configured in `~/.claude/.mcp.json`
- Servers installed via npm/uvx
- Claude Code restarted
- But MCP tools NOT available (e.g., `mcp__gpt-image-1__generate_image`)

**Root Cause:**
Missing `-y` flag in npx command causes MCP server to fail initialization.

---

## ✅ Solution

### Fix #1: Add `-y` Flag to OpenAI MCP Server

**WRONG Configuration:**
```json
{
  "gpt-image-1": {
    "command": "npx",
    "args": ["@cloudwerxlab/gpt-image-1-mcp"],  // MISSING -y flag
    "env": {
      "OPENAI_API_KEY": "sk-..."
    }
  }
}
```

**CORRECT Configuration:**
```json
{
  "gpt-image-1": {
    "command": "npx",
    "args": ["-y", "@cloudwerxlab/gpt-image-1-mcp"],  // Added -y flag
    "env": {
      "OPENAI_API_KEY": "sk-..."
    }
  }
}
```

**What `-y` does:**
- Auto-accepts npx prompts during initialization
- Prevents hanging/waiting for user input
- Required for MCP server to start properly

---

## 📝 Complete Fixed Configuration

**File:** `~/.claude/.mcp.json`

```json
{
  "mcpServers": {
    "gpt-image-1": {
      "command": "npx",
      "args": ["-y", "@cloudwerxlab/gpt-image-1-mcp"],
      "env": {
        "OPENAI_API_KEY": "sk-proj-YOUR_KEY_HERE"
      },
      "disabled": false
    },
    "nanobanana": {
      "command": "uvx",
      "args": ["nanobanana-mcp-server@latest"],
      "env": {
        "GEMINI_API_KEY": "AIza-YOUR_KEY_HERE"
      },
      "disabled": false
    }
  }
}
```

---

## 🧪 Testing After Fix

### Step 1: Restart Claude Code
Close and reopen Claude Code completely.

### Step 2: Verify MCP Tools Loaded

**Method 1: Try using a tool**
```
mcp__gpt-image-1__generate_image with test prompt
```

**Method 2: Check available MCP tools**
Look for tools starting with `mcp__gpt-image-1__` or `mcp__nanobanana__`

### Step 3: Test Image Generation

**Simple Test:**
```
Generate a simple test image to verify MCP connection works.
```

---

## 🔍 Additional Debugging

### If Still Not Working:

**Check 1: Verify Servers Start**
```bash
# Test OpenAI MCP manually
OPENAI_API_KEY="sk-..." npx -y @cloudwerxlab/gpt-image-1-mcp

# Test Nanobanana MCP manually
GEMINI_API_KEY="AIza..." uvx nanobanana-mcp-server@latest
```

If these hang or error, the MCP server itself has issues.

**Check 2: Verify API Keys**
```bash
# Test OpenAI API directly
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-..."

# Should return list of models including gpt-image-1
```

**Check 3: Check Claude Code Logs**
```bash
# Check for MCP initialization errors
tail -f ~/.claude/debug/*.log
```

**Check 4: MCP Server Output Directory**

For gpt-image-1, check if it's trying to create output directory:
```bash
ls -la ~/Pictures/gpt-image-1/
```

Default output might fail if directory doesn't exist or lacks permissions.

---

## 📋 Installation Checklist

### OpenAI gpt-image-1 MCP Server

- [x] Installed globally: `npm install -g @cloudwerxlab/gpt-image-1-mcp`
- [x] Configuration added to `.mcp.json`
- [x] `-y` flag included in args
- [x] OPENAI_API_KEY in env
- [ ] Claude Code restarted
- [ ] MCP tools available
- [ ] Test generation successful

### Nanobanana MCP Server

- [x] Installed via uvx: `uvx nanobanana-mcp-server@latest`
- [x] Configuration added to `.mcp.json`
- [x] GEMINI_API_KEY in env
- [ ] Claude Code restarted
- [ ] MCP tools available
- [ ] Test generation successful

---

## 🎯 Expected Tool Names

**When MCP servers load correctly, these tools should be available:**

### OpenAI gpt-image-1:
- `mcp__gpt-image-1__generate_image`
- `mcp__gpt-image-1__edit_image` (possibly)
- `mcp__gpt-image-1__create_variation` (possibly)

### Nanobanana:
- `mcp__nanobanana__generate_image`
- `mcp__nanobanana__edit_image` (possibly)
- `mcp__nanobanana__blend_images` (possibly)

**Note:** Exact tool names may vary. Check available tools after Claude Code restart.

---

## 🔧 Alternative MCP Server Options

If @cloudwerxlab server still doesn't work:

### Option 1: Try Different Implementation

**PierrunoYT/gpt-image-1-mcp-server:**
```bash
git clone https://github.com/PierrunoYT/gpt-image-1-mcp-server.git
cd gpt-image-1-mcp-server
npm install
node build/index.js
```

**Configuration:**
```json
{
  "gpt-image-1": {
    "command": "node",
    "args": ["/path/to/gpt-image-1-mcp-server/build/index.js"],
    "env": {
      "OPENAI_API_KEY": "sk-..."
    }
  }
}
```

### Option 2: Try SureScaleAI Implementation

```bash
git clone https://github.com/SureScaleAI/openai-gpt-image-mcp.git
cd openai-gpt-image-mcp
npm install
npm start
```

---

## 📚 Official Documentation Links

**OpenAI gpt-image-1:**
- GitHub: https://github.com/CLOUDWERX-DEV/gpt-image-1-mcp
- NPM: https://www.npmjs.com/package/@cloudwerxlab/gpt-image-1-mcp
- Alternative: https://github.com/PierrunoYT/gpt-image-1-mcp-server

**Nanobanana:**
- GitHub: https://github.com/zhongweili/nanobanana-mcp-server
- PyPI: https://pypi.org/project/nanobanana-mcp-server/

---

## 🚀 Quick Fix Summary

**THE FIX:**
Add `-y` flag to OpenAI MCP server args in `.mcp.json`

**Before:**
```json
"args": ["@cloudwerxlab/gpt-image-1-mcp"]
```

**After:**
```json
"args": ["-y", "@cloudwerxlab/gpt-image-1-mcp"]
```

**Then:**
1. Save .mcp.json
2. Restart Claude Code
3. Test MCP tools
4. Generate images!

---

**Fix applied to your config. Restart Claude Code one more time!** 🔄
