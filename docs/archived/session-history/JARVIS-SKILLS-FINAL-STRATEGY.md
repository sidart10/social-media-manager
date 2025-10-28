# Jarvis Skills - Final Strategy (Based on Official Examples)

**Analysis:** github.com/anthropics/skills (complete repository analyzed)
**Recommendation:** Follow mcp-builder pattern (reference docs, not executable code)

---

## 🔍 WHAT I DISCOVERED

### Official Skills Have 4 Patterns:

#### 1. Simple (brand-guidelines)

```
SKILL.md only (~2KB)
```

#### 2. With Examples (internal-comms)

```
├── SKILL.md
└── examples/
    ├── faq-example.md
    ├── newsletter-example.md
    └── status-report-example.md
```

#### 3. With Reference Docs (mcp-builder) ⭐ THIS IS US!

```
├── SKILL.md (13KB detailed)
├── reference/
│   ├── mcp_best_practices.md (28KB!)
│   ├── python_mcp_server.md (26KB)
│   ├── node_mcp_server.md (26KB)
│   └── evaluation.md (21KB)
└── scripts/
    ├── evaluation.py
    └── connections.py
```

**Total:** 100KB+ of reference documentation!

#### 4. With Executable Code (slack-gif-creator)

```
├── SKILL.md (17KB)
├── core/ (7 Python modules)
├── templates/ (13 animation files)
└── requirements.txt
```

**Claude imports and executes these Python files!**

---

## 🎯 WHICH PATTERN FOR JARVIS?

### NOT Pattern 4 (Executable Code)

**Why:**

- We don't execute custom Python/JS
- We call EXTERNAL MCP servers (apify, exa, social-media-mcp)
- Different architecture

### YES Pattern 3 (Reference Docs) ⭐

**Why:**

- Like mcp-builder: We're teaching Claude about external tools (MCPs)
- Like mcp-builder: Need detailed reference documentation
- Like mcp-builder: Need usage examples and patterns

**mcp-builder teaches:** How to BUILD MCP servers
**Our Skills teach:** How to USE MCP servers

**Same pattern!**

---

## 📋 PROPOSED STRUCTURE (Mirroring mcp-builder)

### social-media-research Skill:

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md (lightweight - when to invoke)
│
└── reference/
    ├── social-media-mcp-reference.md
    │   - Complete tool documentation
    │   - All parameters explained
    │   - ~5KB reference doc
    │
    ├── usage-examples.md
    │   - Example 1: get_trending_topics
    │   - Example 2: research_topic (full parameters)
    │   - Example 3: Error handling
    │   - Request/response pairs
    │   - ~3KB examples
    │
    └── workflow-integration.md
        - How this Skill fits in research-topic workflow
        - When it's invoked
        - What it outputs
        - ~2KB integration guide
```

**Total:** ~10KB of reference documentation (like mcp-builder's 100KB for MCP building)

---

## 💡 KEY INSIGHT: mcp-builder Reference Docs

**I analyzed mcp-builder/reference/ - it contains:**

**File: python_mcp_server.md (26KB)**

- Complete guide to building Python MCP servers
- FastMCP framework documentation
- Code patterns and examples
- Error handling
- Best practices

**This is EXACTLY what we need but for USING MCPs, not building them!**

**Our version:**

**File: social-media-mcp-reference.md (5KB)**

- Complete guide to USING social-media-mcp
- Tool documentation (get_trending_topics, research_topic)
- Parameter explanations
- Response formats
- Error handling

---

## 🚀 IMPLEMENTATION PLAN

### Phase 1: Create Reference Docs (1 hour)

**For each of 4 MCP Skills, create reference/ folder:**

#### social-media-research/reference/:

1. **social-media-mcp-reference.md** (extract from workflow + MCP docs)
2. **usage-examples.md** (real request/response examples)
3. **workflow-integration.md** (how it fits)

#### profile-analysis/reference/:

1. **apify-reference.md** (apify tools: search-actors, call-actor, get-actor-output)
2. **platform-actors.md** (Instagram, TikTok, Twitter actor docs)
3. **cost-calculation.md** (how to estimate costs)

#### youtube-research/reference/:

1. **youtube-transcript-reference.md** (get_transcript tool)
2. **transcript-analysis-patterns.md** (how to extract hooks, structure, quotes)

#### deep-web-research/reference/:

1. **exa-reference.md** (web_search_exa, deep_researcher tools)
2. **research-patterns.md** (when to use deep vs quick)

---

### Phase 2: Update SKILL.md Files (20 min)

**Keep current SKILL.md, add references:**

```markdown
## Instructions

1. Call social-media-mcp research_topic tool. **See reference/social-media-mcp-reference.md for complete documentation.**

2. For usage examples and request/response formats, **see reference/usage-examples.md**

3. For workflow integration details, **see reference/workflow-integration.md**
```

---

### Phase 3: Test (15 min)

- Restart Claude Code
- Skills now have 10KB of reference context (like mcp-builder)
- Should fix MCP invocation errors
- Validate research works

---

## 📊 COMPARISON

**mcp-builder (Official):**

- SKILL.md: 13KB
- reference/: 100KB (4 files)
- scripts/: Helper utilities
- **Purpose:** Teach Claude to BUILD MCP servers

**Our social-media-research (Proposed):**

- SKILL.md: 1KB
- reference/: 10KB (3 files)
- No scripts (don't need executable code)
- **Purpose:** Teach Claude to USE MCP servers

**Same pattern, different application!**

---

## ✅ FINAL RECOMMENDATION

**Follow mcp-builder pattern:**

1. ✅ Create reference/ folders (not resources/)
2. ✅ Put comprehensive MCP documentation there
3. ✅ Include usage examples
4. ✅ Reference from SKILL.md
5. ❌ Don't add executable code (we don't need it)

**This matches official Skills and gives Claude the context it needs!**

---

**Ready to create reference/ for social-media-research Skill?** (30 min)

This is the proven pattern from Anthropic's official Skills!
