# Epic: MCP Progressive Disclosure System

**Epic ID**: EPIC-001
**Created**: 2025-11-05
**Status**: Planning
**Priority**: High
**Estimated Duration**: 6 weeks

---

## Epic Goal

Reduce MCP tool context token overhead from 146.5k (14.7%) to <6k tokens (0.6%) through filesystem-based progressive tool discovery, enabling the system to scale to 20+ MCP servers without context constraints.

---

## Problem Statement

**Current State:**
- ALL 140+ MCP tools loaded into EVERY agent at startup
- Consumes 146.5k tokens (14.7% of context) before any work begins
- Each agent only needs 15-45 tools but loads 140+
- Cannot add more MCP servers without context overflow

**Why This Matters:**
1. Token Waste: 80-90% of loaded tools never used
2. Latency: Loading 140+ tool definitions adds startup overhead
3. Scalability: Cannot grow to 20+ MCP servers
4. Cost: Wasted tokens = wasted API costs

---

## Solution Approach

Implement **filesystem-based progressive tool discovery** following Anthropic's proven pattern:

1. Create `.mcp-tools/` directory with one .js file per tool
2. Generate `_index.json` for quick tool lookup
3. Update agent instructions to discover tools on-demand
4. Agents load only 5-10 tools per session (not 140+)

**Research Foundation:**
- Anthropic (Nov 2024): Demonstrated 98.7% token reduction
- Cloudflare: Production implementation validated
- Pattern: Agents discover tools by exploring filesystem

---

## Stories in This Epic

- [ ] **Story 1**: Measure Baseline (1 day) - `story-1.md`
- [ ] **Story 2**: Build Tool Generator (3-4 days) - `story-2.md`
- [ ] **Story 3**: Update Agent Instructions - Pilot Approach (2-3 days) - `story-3.md`
- [ ] **Story 4**: Test & Validate Token Reduction (3-4 days) - `story-4.md`
- [ ] **Story 5**: Update Documentation (2 days) - `story-5.md`
- [ ] **Story 6**: Migrate Critical Workflows (4-5 days) - `story-6.md`

**Total**: 16-19 days (6 weeks with buffer)

---

## Success Metrics

**Token Reduction** (Primary KPI):
- Target: ≥90% reduction from baseline
- Success: 146,500 → <15,000 tokens

**Functionality** (Must Maintain):
- Target: 100% of existing workflows still work
- Success: 0 regressions

**Performance** (Must Not Degrade):
- Target: Agent activation time increase <200ms
- Success: Acceptable user experience

**Expected Results by Agent:**

| Agent | Baseline | Target | Reduction |
|-------|----------|--------|-----------|
| Jarvis | 146.5k | ~8k | 95% |
| Zoe | 146.5k | ~12k | 92% |
| Zoro | 146.5k | ~7k | 95% |

---

## Compatibility Requirements

**CR1**: Existing agent activation commands (/jarvis, /zoe, /zoro) MUST work unchanged
**CR2**: All existing YAML workflows MUST execute successfully
**CR3**: 6-stage output structure MUST remain unchanged
**CR4**: All 11 MCP servers MUST function identically
**CR5**: Existing skills MUST continue to work
**CR6**: Notion integration MUST maintain functionality
**CR7**: Config.yaml fields MUST NOT break (additive only)

---

## Timeline

```
Week 1: Story 1 + Story 2 START
Week 2: Story 2 COMPLETE + Story 3 COMPLETE
Week 3: Story 4 COMPLETE + Story 5 START
Week 4: Story 5 COMPLETE + Story 6 START
Week 5: Story 6 COMPLETE
Week 6: Buffer / Final validation
```

**Milestones:**
- M1 (Week 1): Baseline Complete
- M2 (Week 2): Generator Working
- M3 (Week 3): All Agents Updated
- M4 (Week 4): 90%+ Token Reduction Confirmed
- M5 (Week 5): Critical Workflows Migrated
- M6 (Week 6): Production Ready

---

## Risks & Mitigations

**Technical Risks:**
- Token reduction less than expected → Measure baseline first
- Filesystem reads add latency → Benchmark early
- Agents don't understand pattern → Clear instructions + examples

**Implementation Risks:**
- Generator script bugs → Comprehensive testing
- Workflow regressions → Story 4 validation

**Rollback Plan:**
- Instant: Set `ENABLE_MCP_FILESYSTEM_DISCOVERY=false` (15 seconds)
- Full: Delete `.mcp-tools/` + revert git (15 minutes)

---

## References

- **PRD**: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`
- **Anthropic Article**: https://www.anthropic.com/engineering/code-execution-with-mcp
- **Cloudflare Article**: https://blog.cloudflare.com/code-mode/
- **MCP Spec**: https://modelcontextprotocol.io

---

## Epic Owner

**Product Manager**: John (PM Agent)
**Tech Lead**: TBD
**Implementation**: sid

---

**Last Updated**: 2025-11-05
