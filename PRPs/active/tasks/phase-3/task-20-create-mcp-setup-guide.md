<!-- Powered by BMAD™ Core -->

# Task 20: Create MCP Configuration Setup Guide

**Phase:** 3 (Tool Names & MCP Setup)
**Priority:** HIGH
**Estimated Time:** 45-60 minutes
**Dependencies:** Task 11 (.env.template as reference)

---

## 🎯 Objective

Create complete MCP server configuration guide at `docs/mcp-server-setup.md`.

---

## 📋 Context

**Critical:** System needs 15+ MCPs configured to function

**MCPs Required:**

- notion, fal-video, cloudinary, exa, firecrawl, apify
- nanobanana, gpt-image-1, heygen, submagic
- postiz, mcp-twitter, youtube-uploader

**Guide Must Include:**

- .mcp.json configuration for each MCP
- Where to get API keys
- How to test each MCP works
- Troubleshooting common issues

---

## ✅ Implementation

Complete guide content in PRP lines 2135-2237.

Create `docs/mcp-server-setup.md` with step-by-step for all MCPs.

**Validation:**

```bash
test -f docs/mcp-server-setup.md && echo "✅ Guide created"
```

---

**Estimated Time:** 45-60 minutes
