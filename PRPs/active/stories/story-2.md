# Story 2: Build MCP Tool Wrapper Generator

**Story ID**: STORY-1.2
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: High
**Estimate**: 3-4 days
**Dependencies**: Story 1 (Baseline measurements)

---

## User Story

As a **developer**,
I want **an automated tool generator script**,
so that **I can create filesystem tool structure from .mcp.json**.

---

## Tasks

- [ ] 1. Create `tools/generate-mcp-tools.js` script
- [ ] 2. Parse `.mcp.json` and extract all MCP server configs
- [ ] 3. For each tool, generate `.js` file with JSDoc comments
- [ ] 4. Generate `_index.json` with tool mappings
- [ ] 5. Add `npm run generate:mcp-tools` script to package.json
- [ ] 6. Test generation with all 11 servers
- [ ] 7. Validate generated files are valid JavaScript
- [ ] 8. Test idempotency (run twice, compare outputs)

---

## Acceptance Criteria

- [ ] Script generates `.mcp-tools/` directory structure
- [ ] All 140+ tools have corresponding .js files
- [ ] JSDoc comments extracted from MCP schemas
- [ ] _index.json accurately maps all tools
- [ ] Generated files are valid JavaScript
- [ ] Script completes in <30 seconds
- [ ] Idempotent (run twice = same output)

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Run generator → Verify no impact on existing agent activation
- [ ] Execute workflows → Confirm existing MCP tool calls still work (wrappers not used yet)
- [ ] Validate agents still load tools the old way (no behavioral change yet)

### IV2: Integration Point Verification

- [ ] Inspect generated JavaScript files → Validate syntax is valid
- [ ] Parse _index.json → Verify structure matches design spec
- [ ] Test imports of generated files → Confirm no errors (even though not used yet)
- [ ] Manual review sample tools → Validate JSDoc matches MCP schema
- [ ] Check all 11 servers represented → Verify no servers missing

### IV3: Performance Impact Verification

- [ ] Measure generator execution time (must be <30 seconds for all 140+ tools)
- [ ] Verify generated files totaling <500KB (fast Git operations)
- [ ] Confirm no runtime performance impact (wrappers not loaded in agent context yet)

---

## Technical Design

### Tool File Format Example

```javascript
// .mcp-tools/exa/search.js

/**
 * Search the web using Exa's neural search API
 * @param {Object} params
 * @param {string} params.query - Search query
 * @param {number} [params.numResults=5] - Number of results (default: 5)
 * @returns {Promise<Object>} Search results with titles, URLs, content
 */
export async function search(params) {
  // This is a reference file - actual execution happens via MCP
  // Agent reads this to understand parameters, then calls:
  // mcp__exa__search with parsed params
  return {
    toolName: 'mcp__exa__search',
    params: params
  };
}
```

### Index File Format

```json
{
  "version": "1.0",
  "generated": "2025-11-05T10:30:00Z",
  "totalTools": 140,
  "servers": {
    "exa": {
      "toolCount": 2,
      "tools": {
        "search": ".mcp-tools/exa/search.js",
        "get-contents": ".mcp-tools/exa/get-contents.js"
      }
    }
  }
}
```

### Directory Structure Created

```
.mcp-tools/
├── _index.json              # Quick lookup: tool name → file path
├── exa/
│   ├── search.js
│   └── get-contents.js
├── firecrawl/
│   └── scrape.js
├── postiz/
│   ├── schedule-post.js
│   └── list-integrations.js
├── cloudinary/
│   └── upload-asset.js
└── [9 total servers, 140+ total tools]
```

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Generator script committed to `tools/` directory
- [ ] npm script added and tested
- [ ] .mcp-tools/ directory generated and validated

---

## Notes

**Implementation Approach:**
- Read `.mcp.json` to get server list
- For each server, introspect available tools (may need to run MCP server to get schema)
- Generate JavaScript files with JSDoc from tool schemas
- Simple file I/O operations (~200 lines total)

**Key Files Modified:**
- NEW: `tools/generate-mcp-tools.js`
- NEW: `.mcp-tools/` (entire directory)
- MODIFIED: `package.json` (add npm script)

---

## References

- PRD Section 5 - Story 2
- Technical Design: PRD Section 4
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
