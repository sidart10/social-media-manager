# Story 3: Update Agent Instructions (Pilot Approach)

**Story ID**: STORY-1.3
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: High
**Estimate**: 2-3 days
**Dependencies**: Story 2 (Tool generator completed)

---

## User Story

As an **AI agent**,
I want **clear instructions on tool discovery**,
so that **I automatically use filesystem instead of upfront loading**.

---

## Implementation Strategy

**Pilot with Jarvis → Validate → Rollout to Zoe/Zoro**

This de-risks the rollout by testing with the simplest agent first.

---

## Tasks

### Phase 3A: Implement Feature Flag & Jarvis Pilot (Days 1-2)

- [ ] 1. Add environment variable `ENABLE_MCP_FILESYSTEM_DISCOVERY` to `.env.example`
- [ ] 2. Update agent activation logic to check feature flag:
  ```javascript
  const USE_FILESYSTEM_DISCOVERY = process.env.ENABLE_MCP_FILESYSTEM_DISCOVERY === 'true';
  ```
- [ ] 3. Update `jarvis-sidecar/instructions.md` with discovery workflow ONLY
- [ ] 4. Add conditional logic: If flag=true, use filesystem; if false, use old loading
- [ ] 5. Test Jarvis with flag=true → Verify discovery works
- [ ] 6. Test Jarvis with flag=false → Verify old loading still works (rollback test)

### Phase 3B: Jarvis Validation Period (Days 3-4)

- [ ] 7. Run Jarvis with filesystem discovery for 2 days
- [ ] 8. Execute 10+ research workflows with Jarvis
- [ ] 9. Monitor token usage (should be ~8-15k instead of 146k)
- [ ] 10. Track any errors or issues
- [ ] 11. **Go/No-Go decision**: If Jarvis stable, proceed to Phase 3C

### Phase 3C: Rollout to Zoe and Zoro (Days 5-6)

- [ ] 12. Update `zoe-sidecar/instructions.md` with discovery workflow
- [ ] 13. Update `zoro-sidecar/instructions.md` with discovery workflow
- [ ] 14. Test Zoe and Zoro independently
- [ ] 15. Test multi-agent coordination (Jarvis → Zoe → Zoro)
- [ ] 16. Add examples: "When you need X tool, read .mcp-tools/_index.json"
- [ ] 17. Add troubleshooting: "If tool not found, list .mcp-tools/ directory"

---

## Acceptance Criteria

- [ ] Feature flag `ENABLE_MCP_FILESYSTEM_DISCOVERY` implemented
- [ ] Rollback tested (flag=false returns to old behavior)
- [ ] Jarvis piloted successfully for 2 days
- [ ] Each agent's instructions.md updated
- [ ] Tool discovery workflow documented
- [ ] Examples provided for common scenarios
- [ ] Agents automatically discover tools when activated
- [ ] Agents don't load tools unnecessarily

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Activate Jarvis with updated instructions → Execute research workflow → Verify exa/firecrawl discovery works
- [ ] Activate Zoe with updated instructions → Execute image generation → Verify nanobanana/gpt-image-1 discovery works
- [ ] Activate Zoro with updated instructions → Execute schedule-post → Verify postiz discovery works
- [ ] Test multi-agent coordination → Confirm handoffs (Jarvis → Zoe → Zoro) still function

### IV2: Integration Point Verification

- [ ] Agent reads _index.json → Verify correct tool search behavior
- [ ] Agent lists .mcp-tools/ directory → Confirm proper server discovery
- [ ] Agent loads specific tool file → Validate JSDoc comprehension
- [ ] Test with non-existent tool request → Verify graceful error handling
- [ ] Verify agents only load 5-10 tools per session (not all 140+)

### IV3: Performance Impact Verification

- [ ] Measure agent activation time with new instructions (target <200ms increase)
- [ ] Track filesystem read latency (registry + tool files, target <100ms total)
- [ ] Verify agent response time for first tool use (target <500ms)
- [ ] Confirm agents aren't repeatedly reading the same files (caching works)

---

## Feature Flag Architecture

### Environment Variable

```bash
# .env or .env.example
ENABLE_MCP_FILESYSTEM_DISCOVERY=true  # Use filesystem discovery
ENABLE_MCP_FILESYSTEM_DISCOVERY=false # Use old upfront loading (rollback)
```

### Implementation Pattern

```javascript
// In agent activation logic
const USE_FILESYSTEM_DISCOVERY = process.env.ENABLE_MCP_FILESYSTEM_DISCOVERY === 'true';

if (USE_FILESYSTEM_DISCOVERY) {
  // NEW: Progressive disclosure via filesystem
  console.log('MCP Progressive Disclosure: ENABLED');
} else {
  // OLD: Load all tools upfront (backward compatible)
  console.log('MCP Progressive Disclosure: DISABLED (using legacy loading)');
}
```

### Rollback Procedure

1. Set `ENABLE_MCP_FILESYSTEM_DISCOVERY=false` in `.env`
2. Restart agents (if needed)
3. All agents revert to loading 140+ tools upfront
4. **Estimated rollback time: 15 seconds**

---

## Agent Instruction Addition

```markdown
## Tool Discovery Process

When you need external tools:

1. List `.mcp-tools/` directory to see available servers
2. Read `.mcp-tools/_index.json` to search for relevant tools
3. Load specific tool files only when needed
4. Use the JSDoc comments to understand parameters
5. Call the actual MCP tool (format: mcp__server__toolname)

Example:
User: "Research AI agents"
You: Read .mcp-tools/_index.json → Find "exa/search"
You: Read .mcp-tools/exa/search.js → See params: query, numResults
You: Call mcp__exa__search({ query: "AI agents", numResults: 10 })
```

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Feature flag implemented and tested
- [ ] Jarvis pilot completed with 2-day validation
- [ ] All 3 agent instructions updated
- [ ] Go/No-Go decision documented

---

## Notes

**Why Pilot with Jarvis:**
- Simplest agent (~20 tools needed)
- Lower risk than starting with Zoe (45 tools) or Zoro (publishing critical)
- Learn from issues before touching production-critical agents

**Files Modified:**
- NEW: `.env.example` (add feature flag)
- MODIFIED: `bmad/agents/content-intelligence/jarvis-sidecar/instructions.md`
- MODIFIED: `bmad/agents/zoe/zoe-sidecar/instructions.md`
- MODIFIED: `bmad/agents/zoro/zoro-sidecar/instructions.md`
- MODIFIED: Agent activation logic (location TBD)

---

## References

- PRD Section 5 - Story 3
- Feature Flag Architecture: PRD Section 4
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
