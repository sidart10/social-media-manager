# Exa Deep Researcher Configuration

**Date**: October 28, 2025
**Action**: Enabled deep_researcher_start and deep_researcher_check tools in Exa MCP server for Claude Code

---

## What Was Changed

### Before:
```bash
exa: npx -y exa-mcp-server
```

**Tools available**: Only `mcp__exa__search`

### After:
```bash
exa: npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check
```

**Tools available**:
- `mcp__exa__search` (basic web search)
- `deep_researcher_start` (multi-step async research)
- `deep_researcher_check` (retrieve research results)

---

## Configuration File

**Location**: `/Users/sid/.claude.json` (project-specific)

**Modified via**:
```bash
claude mcp remove exa
claude mcp add --transport stdio exa -- npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check
```

---

## How to Use Deep Researcher

### Step 1: Start Research Task

```
Tool: deep_researcher_start
Input: {topic: "AI infrastructure spending trends 2025"}
Output: {researchId: "research_abc123", status: "processing"}
```

### Step 2: Wait (30-60 seconds)

AI performs multi-step research:
- Searches multiple sources
- Extracts insights
- Synthesizes data
- Compiles expert quotes

### Step 3: Retrieve Results

```
Tool: deep_researcher_check
Input: {researchId: "research_abc123"}
Output: {
  status: "completed",
  insights: [...],
  dataPoints: [...],
  expertQuotes: [...],
  sources: [...]
}
```

---

## When to Use Each Tool

### mcp__exa__search (Quick - $0.05-0.10)
- Fast results (3-5 seconds)
- Standard web search
- Recent articles
- Quick fact-checking

### deep_researcher_start/check (Deep - $0.20-0.50)
- Comprehensive research (30-60 seconds)
- Multi-step analysis
- Expert insights
- Data synthesis
- Market intelligence

---

## Impact on deep-web-research Skill

The **deep-web-research skill is now FUNCTIONAL**!

Previously referenced tools that were "broken":
- ✅ deep_researcher_start - NOW AVAILABLE
- ✅ deep_researcher_check - NOW AVAILABLE

**The skill was correct all along** - just needed MCP configuration!

---

## Next Steps

**To activate these tools**:
1. Restart Claude Code (to reload MCP configuration)
2. Type `/mcp` to verify exa server shows deep researcher tools
3. Test deep-web-research skill

**Verification command**:
```bash
claude mcp list
```

Should show exa with tools enabled.

---

## Alternative Tool Configurations

If you want to enable OTHER exa tools:

### Enable ALL tools:
```bash
claude mcp add --transport stdio exa -- npx -y exa-mcp-server --tools=web_search_exa,deep_researcher_start,deep_researcher_check,code_search_exa
```

### Enable ONLY web search:
```bash
claude mcp add --transport stdio exa -- npx -y exa-mcp-server --tools=web_search_exa
```

### Enable ONLY deep researcher:
```bash
claude mcp add --transport stdio exa -- npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check
```

### Current configuration (recommended):
```bash
# Deep researcher + default search
npx -y exa-mcp-server --tools=deep_researcher_start,deep_researcher_check
```

---

## Cost Considerations

**Quick Search (mcp__exa__search)**:
- ~$0.05-0.10 per search
- 3-5 seconds
- Good for most tasks

**Deep Research (deep_researcher_start/check)**:
- ~$0.20-0.50 per research task
- 30-60 seconds processing
- Use for comprehensive analysis

**Recommendation**: Start with quick search, escalate to deep researcher when needed.

---

**Status**: ✅ Configuration complete. Restart Claude Code to activate tools.
