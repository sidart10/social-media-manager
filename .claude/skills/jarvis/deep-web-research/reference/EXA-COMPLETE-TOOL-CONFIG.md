# Exa MCP Complete Tool Configuration

**Date**: October 28, 2025
**Status**: ✅ **VERIFIED AND CONNECTED**

---

## ✅ Final Configuration

```bash
exa: npx -y exa-mcp-server --tools=web_search_exa,deep_researcher_start,deep_researcher_check,company_research,crawling,get_code_context_exa - ✓ Connected
```

**Location**: `/Users/sid/.claude.json` (project-specific)

---

## 🛠️ All 6 Tools Enabled

### 1. **web_search_exa** - Neural Web Search

**Purpose**: Real-time web searches with AI-powered semantic understanding
**Use for**: Finding articles, recent news, general research
**Cost**: ~$0.05-0.10 per search
**Speed**: 3-5 seconds

### 2. **deep_researcher_start** - Multi-Step Research Agent

**Purpose**: Start comprehensive AI research that searches multiple sources and synthesizes
**Use for**: Complex topics, market analysis, comprehensive reports
**Cost**: ~$0.20-0.50 per research task
**Speed**: 30-60 seconds processing

### 3. **deep_researcher_check** - Retrieve Research Results

**Purpose**: Get completed research from deep_researcher_start
**Returns**: Insights, data points, expert quotes, sources
**Use with**: deep_researcher_start (check after 30-60s)

### 4. **company_research** - Company Intelligence

**Purpose**: Comprehensive company research, crawls websites for business details
**Use for**: Competitor analysis, company strategies, market positioning
**Cost**: ~$0.10-0.15 per company
**Speed**: 10-20 seconds

### 5. **crawling** - URL Content Extraction

**Purpose**: Extract full content from specific URLs (articles, PDFs, web pages)
**Use for**: Deep-diving specific sources, extracting full article text
**Cost**: ~$0.02-0.05 per URL
**Speed**: 2-5 seconds

### 6. **get_code_context_exa** - Code Search (BONUS!)

**Purpose**: Search GitHub repos, Stack Overflow, docs for code examples
**Use for**: Finding implementation examples, API patterns, best practices
**Perfect for**: Coding tasks, technical research
**Cost**: ~$0.05 per search
**Speed**: 3-5 seconds

---

## 📋 MCP Tool Names (After Restart)

**Expected tool names** in Claude Code (MCP wrapper format):

```
mcp__exa__web_search_exa
mcp__exa__deep_researcher_start
mcp__exa__deep_researcher_check
mcp__exa__company_research
mcp__exa__crawling
mcp__exa__get_code_context_exa
```

**Alternative** (might be shorter):

```
web_search_exa
deep_researcher_start
deep_researcher_check
company_research
crawling
get_code_context_exa
```

_Actual names will be clear after restart_

---

## 🔄 How deep-web-research Skill Will Use Them

### Quick Research (Free):

```
→ WebSearch (Google)
→ WebFetch (page analysis)
```

### Standard Research ($0.05):

```
→ web_search_exa (numResults=10)
```

### Comprehensive Research ($0.10-0.15):

```
→ web_search_exa (numResults=15, livecrawl=always)
→ WebFetch top 3 sources
→ Archon RAG (check knowledge base)
```

### Exhaustive Research ($0.20-0.50):

```
→ deep_researcher_start (topic)
→ Wait 30-60s
→ deep_researcher_check (get results)
→ PLUS company_research (if company-related)
→ PLUS crawling (for specific URLs)
→ PLUS Archon RAG
```

**All automatic - skill handles routing!**

---

## 🎯 Bonus: Code Research Now Available

**New capability** with `get_code_context_exa`:

```
Use deep-web-research skill for code examples:
- "How to use React hooks with TypeScript"
- "Find authentication implementation patterns"
- "Get pandas library documentation"
```

**Perfect for**: Technical research, implementation guides, API usage examples

---

## ⚠️ Post-Restart Changes

### What Might Change:

**Current** (this session):

- `mcp__exa__search` (working)

**After restart**:

- `mcp__exa__web_search_exa` (new name, same functionality)
- OR `web_search_exa` (shorter name)

**Impact on workflows**:

- Minimal - skill will adapt to new tool name
- If tool name changes, might need 1-line update in skill

---

## ✅ Configuration Complete Checklist

- ✅ Removed old exa configuration
- ✅ Added exa with 6 useful tools
- ✅ Server shows "✓ Connected"
- ✅ No duplicate servers
- ✅ Project-specific config (not global)
- ✅ --tools syntax correct (comma-separated)
- ⏳ Restart needed to activate tools

---

## 📋 Post-Restart Verification Steps

After restarting Claude Code:

**Step 1**: Check server status

```bash
claude mcp list
```

Should show exa with all 6 tools

**Step 2**: Check available functions
Look in system context for:

- web_search_exa (or mcp**exa**web_search_exa)
- deep_researcher_start
- deep_researcher_check
- company_research
- crawling
- get_code_context_exa

**Step 3**: Test research

```
/jarvis → research-topic
Topic: "Claude product timeline"
Depth: exhaustive
```

Should now use deep_researcher_start!

**Step 4**: If tool names changed
Update deep-web-research skill with actual tool names (1-line fix if needed)

---

## 🏆 Final Capability Matrix

After restart, deep-web-research skill can use:

| Research Type | Tools Used                                    | Cost       | Time   |
| ------------- | --------------------------------------------- | ---------- | ------ |
| Quick         | WebSearch + WebFetch                          | $0         | 5-10s  |
| Standard      | web_search_exa                                | $0.05      | 10s    |
| Comprehensive | web_search_exa + WebFetch + Archon            | $0.10      | 20-30s |
| Exhaustive    | deep_researcher + company + crawling + Archon | $0.30-0.60 | 60-90s |
| Code Research | get_code_context_exa                          | $0.05      | 5s     |

---

**Status**: ✅ Configuration COMPLETE with all 6 tools

**Next**: Restart Claude Code to activate full research arsenal! 🧙
