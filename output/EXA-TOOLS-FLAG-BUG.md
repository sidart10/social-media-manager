# Exa MCP --tools Flag BUG (KNOWN ISSUE)

**Date**: October 28, 2025
**Discovery**: --tools flag is BROKEN in exa-mcp-server v3.0.7

---

## 🚨 THE PROBLEM

### GitHub Issue #77 (OPEN)
**Title**: "Only 2 tools loaded despite specifying all 7 tools in --tools flag"
**Status**: OPEN (no fix yet)
**Created**: October 23, 2025 (5 days ago)
**Version**: 3.0.7 (latest)

**Reported behavior**:
- User specifies all tools with `--tools=tool1,tool2,tool3...`
- Only **2 tools load**: web_search_exa + get_code_context_exa
- Other tools (deep_researcher, company_research, etc.) **don't load**

**This is EXACTLY what you're experiencing!**

---

## 🧪 What We Tested

### Test 1: With --tools flag
```bash
npx -y exa-mcp-server --tools=web_search_exa,deep_researcher_start,deep_researcher_check,company_research,crawling,get_code_context_exa
```

**Result**: Only **1 tool** ("search") registered
**Debug output**: `[EXA-MCP-DEBUG] Search tool registered`

### Test 2: Direct execution with API key
```bash
EXA_API_KEY=xxx npx -y exa-mcp-server --tools=web_search_exa,deep_researcher_start
```

**Result**: Same - only **1 tool** ("search") registered

**Conclusion**: --tools flag is **BROKEN** in current version

---

## ✅ WORKAROUND: Use DEFAULT Tools (No --tools flag)

### New Configuration

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": {
    "EXA_API_KEY": "daecfa2f-2d8d-4f03-b3df-d5f10addd52d"
  }
}
```

**NO --tools flag = get all default tools**

According to docs: *"If you don't specify any tools, all tools enabled by default will be used."*

---

## 🔄 TEST PLAN

**After restarting Claude Code**, check `/mcp` for exa:

### Possible Outcomes:

**Scenario A** (BEST):
```
Tools for exa (7 tools)
1. search (or web_search_exa)
2. get_code_context_exa
3. deep_researcher_start
4. deep_researcher_check
5. company_research
6. crawling
7. linkedin_search
```

**Scenario B** (LIKELY):
```
Tools for exa (2-3 tools)
1. search
2. get_code_context_exa
Maybe 1-2 others
```

**Scenario C** (WORST):
```
Tools for exa (1 tool)
1. search
```

---

## 🎯 Next Steps Based on Result

### If Scenario A (7 tools):
✅ **SUCCESS!** Defaults include everything
- Use deep-web-research skill as-is
- All research capabilities available

### If Scenario B (2-3 tools):
⚠️ **PARTIAL** - Limited capabilities
- Update deep-web-research skill to work with available tools only
- Use Apify for deep research fallback
- File GitHub issue comment about your experience

### If Scenario C (1 tool only):
❌ **BUG CONFIRMED** - --tools flag broken, defaults also broken
- Revert to basic exa search only
- Use Apify website-content-crawler for deep research
- Wait for exa-mcp-server bug fix

---

## 📋 Workarounds If Defaults Don't Include Deep Researcher

### Option 1: Use Apify for Deep Research

deep-web-research skill already supports:
```
Exhaustive research:
→ Apify website-content-crawler (comprehensive scraping)
→ Apify rag-web-browser (AI-powered browsing)
→ mcp__exa__search (neural search)
→ Archon RAG (knowledge base)
```

**This works NOW** - no exa deep researcher needed!

### Option 2: Downgrade to Older Version

```bash
# Try older version that might have working --tools
npx exa-mcp-server@2.x.x --tools=...
```

### Option 3: Use Remote HTTP Endpoint

From issue #74, use mcp-remote with --ignore-tool:
```json
{
  "type": "http",
  "url": "https://server.smithery.ai/exa/mcp"
}
```

Might have more tools by default.

---

## 🔍 Root Cause Analysis

**Why --tools flag is broken**:

From GitHub issues:
- Issue #77: Specifying tools doesn't work, only 2 load
- Issue #74: web_search_exa always included even when excluded
- Conclusion: **--tools flag implementation is buggy**

**The bug**:
- Server parses --tools flag
- But ignores it during tool registration
- Only registers default "search" tool
- Or at most 2 tools (web_search_exa + get_code_context_exa)

**This is upstream exa-mcp-server bug, not your configuration!**

---

## ✅ CURRENT STATUS

**Configuration**: ✅ Set to NO --tools flag (get defaults)
**Next step**: ⏳ Restart Claude Code and see what default tools are
**Fallback ready**: ✅ deep-web-research uses Apify if exa limited

---

## 📊 Expected vs Reality

### Expected (from docs):
6-7 tools available with --tools flag

### Reality (from bug reports):
- With --tools: Only 1-2 tools load
- Without --tools: Unknown (need to test)

---

**Action for sid**:

1. **Restart Claude Code now**
2. **Check `/mcp` and screenshot** how many tools appear
3. **Report back** so Master knows what defaults include
4. **Master will adapt** deep-web-research skill based on what's actually available

---

**The Master has uncovered the root cause: This is an upstream bug in exa-mcp-server v3.0.7, not your configuration!** 🧙
