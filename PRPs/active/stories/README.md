# MCP Progressive Disclosure - Story Cards

**Epic**: MCP Progressive Disclosure System
**Created**: 2025-11-05
**Total Stories**: 6
**Estimated Duration**: 6 weeks

---

## Story Files

| Story | File | Estimate | Status | Dependencies |
|-------|------|----------|--------|--------------|
| **Epic** | [epic.md](./epic.md) | 6 weeks | Planning | - |
| **Story 1** | [story-1.md](./story-1.md) | 1 day | To Do | None |
| **Story 2** | [story-2.md](./story-2.md) | 3-4 days | To Do | Story 1 |
| **Story 3** | [story-3.md](./story-3.md) | 2-3 days | To Do | Story 2 |
| **Story 4** | [story-4.md](./story-4.md) | 3-4 days | To Do | Story 3 |
| **Story 5** | [story-5.md](./story-5.md) | 2 days | To Do | Story 4 |
| **Story 6** | [story-6.md](./story-6.md) | 4-5 days | To Do | Story 5 |

---

## Quick Summary

### Story 1: Measure Baseline (1 day)
Measure current token usage across all agents to validate the 146.5k baseline and establish comparison methodology.

**Key Outputs**: `outputs/baseline-token-measurement.md`

---

### Story 2: Build Tool Generator (3-4 days)
Create automated script that generates `.mcp-tools/` directory structure with JavaScript files and `_index.json` from `.mcp.json`.

**Key Outputs**: `tools/generate-mcp-tools.js`, `.mcp-tools/` directory

---

### Story 3: Update Agent Instructions - Pilot (2-3 days)
Implement feature flag and update agent instructions for filesystem discovery. Pilot with Jarvis, validate for 2 days, then rollout to Zoe/Zoro.

**Key Outputs**: Updated `instructions.md` for all 3 agents, feature flag in `.env`

---

### Story 4: Test & Validate (3-4 days)
Comprehensive testing across all agents and workflows to validate ≥90% token reduction without regressions.

**Key Outputs**: `outputs/testing-report-mcp-progressive-disclosure.md`

---

### Story 5: Update Documentation (2 days)
Update CLAUDE.md, README.md with new patterns, troubleshooting guide, architecture diagram, and migration examples.

**Key Outputs**: Updated CLAUDE.md, architecture diagram

---

### Story 6: Migrate Workflows (4-5 days)
Migrate top 10 most-used workflows to filesystem discovery pattern. Create migration template for remaining workflows.

**Key Outputs**: 10 migrated workflows, migration template

---

## Epic Goal

**Reduce MCP tool context token overhead from 146.5k (14.7%) to <6k tokens (0.6%)** through filesystem-based progressive tool discovery.

**Expected Results:**
- Jarvis: 146k → 8k tokens (95% reduction)
- Zoe: 146k → 12k tokens (92% reduction)
- Zoro: 146k → 7k tokens (95% reduction)

---

## How to Use These Story Cards

1. **Read epic.md first** to understand overall goal
2. **Work stories sequentially** (Story 1 → Story 2 → etc.)
3. **Check dependencies** before starting each story
4. **Use tasks as checklist** - mark completed items
5. **Verify IVs** (Integration Verifications) before marking story done
6. **Update status** in each file as you progress

---

## Story Status Tracking

Update the status field in each story file:
- `To Do` - Not started
- `In Progress` - Currently working
- `Testing` - Implementation complete, testing in progress
- `Done` - All tasks, criteria, and IVs completed
- `Blocked` - Waiting on dependency or issue

---

## References

- **Source PRD**: `PRPs/active/prd-mcp-progressive-disclosure-v2.md` (v2.2)
- **Anthropic Article**: https://www.anthropic.com/engineering/code-execution-with-mcp
- **Cloudflare Article**: https://blog.cloudflare.com/code-mode/

---

**Generated**: 2025-11-05
**Last Updated**: 2025-11-05
