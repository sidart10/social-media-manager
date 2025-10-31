# Why Deep Researcher Wasn't Used

**Date**: October 28, 2025
**Issue**: research-topic workflow used basic `mcp__exa__search` instead of deep researcher

---

## Root Cause

### ⚠️ Tools Not Loaded Yet

**The deep researcher tools were JUST enabled** in `/Users/sid/.claude.json`:

```bash
# Configuration change made TODAY
exa: npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check
```

**Status**: Configuration saved, BUT **Claude Code hasn't been restarted yet**

**Result**: Tools not available in current session

---

## Currently Available

```
✅ mcp__exa__search (basic neural search + live crawl)
❌ deep_researcher_start (not loaded - needs restart)
❌ deep_researcher_check (not loaded - needs restart)
```

**What happened**:
- Workflow checked `if depth == 'comprehensive'`
- Instructions said "Use exa deep_researcher_start"
- Tool not available (not restarted yet)
- Fell back to `mcp__exa__search` (the working tool)

---

## Solution

### Step 1: Restart Claude Code ⚡

**Exit and restart** Claude Code to load new MCP configuration.

### Step 2: Verify Tools Loaded

After restart, check:
```bash
claude mcp list
```

Should show:
```
exa: npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check - ✓ Connected
```

### Step 3: Test Deep Researcher

Try the research again:
```
/jarvis → research-topic
Depth: comprehensive
```

Should now use deep researcher if available.

---

## Expected Tool Names (After Restart)

The MCP tools will likely be named:
- `mcp__exa__deep_researcher_start`
- `mcp__exa__deep_researcher_check`

OR (less likely):
- `deep_researcher_start`
- `deep_researcher_check`

**We'll know after restart.**

---

## Workflow Update Needed (After Verification)

Once you restart and verify tool names, update:

`bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`

**Current** (line 34):
```xml
<action>Use exa deep_researcher_start...</action>
```

**Update to** (after verifying actual tool name):
```xml
<action>Use mcp__exa__deep_researcher_start with topic="{topic}"</action>
<action>Wait 30-60 seconds for processing</action>
<action>Use mcp__exa__deep_researcher_check with researchId to retrieve results</action>
```

---

## Current Workaround

**Until restart**, the workflow correctly uses:
- `mcp__exa__search` with `livecrawl="always"` and `numResults=15`
- This provides comprehensive neural search
- Just not the multi-step deep researcher agent

**This is WORKING** - just not using the deepest research method yet.

---

## After Restart Checklist

1. ✅ Restart Claude Code
2. ✅ Verify: `claude mcp list` shows exa with tools
3. ✅ Test: `/mcp` command to see available tools
4. ✅ Note actual tool names (mcp__exa__deep_researcher_start or just deep_researcher_start?)
5. ✅ Update research-topic/instructions.md with correct tool names
6. ✅ Test research-topic workflow with depth=comprehensive

---

**Summary**: Deep researcher tools are configured but not loaded. Restart Claude Code to activate them. 🔄
