# Story 5: Update Documentation

**Story ID**: STORY-1.5
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: Medium
**Estimate**: 2 days
**Dependencies**: Story 4 (Testing complete, results validated)

---

## User Story

As a **team member**,
I want **comprehensive documentation**,
so that **I understand the new system and can troubleshoot issues**.

---

## Tasks

- [ ] 1. Update CLAUDE.md with "MCP Progressive Disclosure" section
- [ ] 2. Document filesystem discovery pattern with examples
- [ ] 3. Add troubleshooting guide for common issues
- [ ] 4. Document generator script usage (`npm run generate:mcp-tools`)
- [ ] 5. Add migration examples (old pattern → new pattern)
- [ ] 6. Update README.md with new architecture overview
- [ ] 7. Create architecture diagram showing tool discovery flow
- [ ] 8. Update changelog with implementation completion

---

## Acceptance Criteria

- [ ] CLAUDE.md updated with new patterns
- [ ] Architecture diagram included
- [ ] Generator script documented
- [ ] Troubleshooting guide complete
- [ ] Examples provided for common tasks
- [ ] Changelog updated

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Follow documentation as new user → Verify all examples work correctly
- [ ] Execute documented workflows → Confirm outputs match expectations
- [ ] Use troubleshooting guide for simulated issue → Verify resolution steps work

### IV2: Integration Point Verification

- [ ] Cross-reference documentation with actual implementation → Verify no discrepancies
- [ ] Check code examples in docs → Validate they execute without errors
- [ ] Review architecture diagram → Confirm accuracy against codebase
- [ ] Test generator script instructions → Verify step-by-step accuracy

### IV3: Performance Impact Verification

- [ ] N/A (documentation has no runtime impact)

---

## Documentation Sections to Add

### CLAUDE.md Updates

```markdown
## MCP Progressive Disclosure

### Overview
Agents discover and load MCP tools on-demand from `.mcp-tools/` directory instead of loading all 140+ tools upfront. This reduces token overhead from 146.5k to <15k (90%+ reduction).

### How It Works
1. Agent receives task requiring external tools
2. Agent reads `.mcp-tools/_index.json` to find available tools
3. Agent loads specific tool files only when needed (e.g., `Read .mcp-tools/exa/search.js`)
4. Agent calls actual MCP tool with proper parameters
5. Only 5-10 tools in context instead of 140+

### Tool Discovery Pattern

**Example:**
```
User: "Research AI agents and trends"
Agent: Read .mcp-tools/_index.json → Find "exa/search"
Agent: Read .mcp-tools/exa/search.js → Parse JSDoc for parameters
Agent: Call mcp__exa__search({ query: "AI agents trends", numResults: 10 })
```

### Feature Flag

Control filesystem discovery with environment variable:
- `ENABLE_MCP_FILESYSTEM_DISCOVERY=true` - Use filesystem discovery
- `ENABLE_MCP_FILESYSTEM_DISCOVERY=false` - Use old upfront loading

### Generator Script

Regenerate tool wrappers after adding/removing MCP servers:
```bash
npm run generate:mcp-tools
```

### Troubleshooting

**Issue**: Agent says "Tool not found"
- **Solution**: Check `.mcp-tools/_index.json` for available tools
- **Check**: Run `ls .mcp-tools/` to see available servers

**Issue**: Token usage still high
- **Solution**: Verify `ENABLE_MCP_FILESYSTEM_DISCOVERY=true` in `.env`
- **Check**: Agent logs should show "MCP Progressive Disclosure: ENABLED"

**Issue**: Workflow fails after update
- **Solution**: Set flag to `false` to rollback instantly
- **Check**: Verify workflow works with old loading pattern
```

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Documentation reviewed by team
- [ ] Examples tested and validated
- [ ] Changelog entry added

---

## Notes

**Documentation Files Modified:**
- MODIFIED: `CLAUDE.md` (add MCP Progressive Disclosure section)
- MODIFIED: `README.md` (architecture update)
- MODIFIED: `CHANGELOG.md` (add entry)
- NEW: Architecture diagram (format TBD - mermaid, ASCII, or image)

**Content Sources:**
- Technical design from PRD Section 4
- Test results from Story 4
- Token reduction data from Story 1 & 4

---

## References

- PRD Section 5 - Story 5
- Technical Design: PRD Section 4
- Success Metrics: PRD Section 6
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
