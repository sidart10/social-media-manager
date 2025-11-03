<!-- Powered by BMAD™ Core -->

# Task 22: Clarify Notion Tool Naming Pattern

**Phase:** 3 (Tool Names & MCP Setup)
**Priority:** CRITICAL DOCUMENTATION
**Estimated Time:** 15-20 minutes
**Dependencies:** Task 7 (add to naming standards doc)

---

## 🎯 Objective

Document Notion's special double naming pattern (definition vs invocation names).

---

## 📋 Context

**Discovery:** Notion tools have TWO valid names:

- **Definition:** mcp**notion**notion-search (internal registration)
- **Invocation:** notion-search (what you actually call)
- **Both work!** Simple name preferred

**Why Confusing:**

- Other MCPs only have ONE name (mcp**fal-video**execute_custom_model)
- Notion special case as official Anthropic MCP

---

## ✅ Implementation

Add special case section to `docs/mcp-tool-naming-standards.md`:

Content in PRP lines 2315-2373.

**Key Points:**

- Both names work for Notion
- Prefer simple names (notion-search)
- Other MCPs don't have this flexibility

**Validation:**

```bash
grep -q "Special Case: Notion" docs/mcp-tool-naming-standards.md && echo "✅ Added"
```

---

**Estimated Time:** 15 minutes
