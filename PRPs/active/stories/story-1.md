# Story 1: Measure Baseline Token Usage

**Story ID**: STORY-1.1
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: High
**Estimate**: 1 day
**Dependencies**: None (First story)

---

## User Story

As a **product manager**,
I want **to measure actual current token usage**,
so that **we validate the problem and track improvement**.

---

## Tasks

- [ ] 1. Activate each agent (/jarvis, /zoe, /zoro)
- [ ] 2. Capture token count with all MCP tools loaded
  - [ ] 2a. Use `/context` command during each agent activation
  - [ ] 2b. Save full context output to `outputs/baseline-context-{agent}.txt`
  - [ ] 2c. Extract token count from "MCP Tools" section
  - [ ] 2d. Record exact tool count loaded (should be 140+)
- [ ] 3. Document breakdown by server
  - [ ] 3a. List all tools from each of the 11 servers
  - [ ] 3b. Estimate tokens per server (total ÷ 11 for rough estimate)
  - [ ] 3c. Create table: Server Name | Tool Count | Est. Tokens
- [ ] 4. Identify top 20 most expensive tools
  - [ ] 4a. Sort tools by estimated token cost (longer descriptions = more tokens)
  - [ ] 4b. Document in table: Tool Name | Server | Est. Tokens | Description Length
- [ ] 5. Validate ~146.5k baseline or update PRD
  - [ ] 5a. If actual measurement differs >10% from 146.5k, update PRD Section 1
  - [ ] 5b. Document actual baseline as source of truth

---

## Acceptance Criteria

- [ ] Baseline documented in `outputs/baseline-token-measurement.md`
- [ ] Token count per agent measured and logged
- [ ] Methodology documented for future comparison

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Activate each agent (/jarvis, /zoe, /zoro) → Confirm all menus display correctly
- [ ] Execute representative workflow from each agent → Verify normal operation
- [ ] Multi-agent handoff test (Jarvis → Zoe → Zoro) → Confirm coordination works

### IV2: Integration Point Verification

- [ ] Use `/context` command during each agent session → Capture exact token breakdown
- [ ] Validate MCP tools section shows all 140+ tools loaded
- [ ] Cross-check token count matches expected ~146.5k baseline

### IV3: Performance Impact Verification

- [ ] Measure agent activation time (from command to menu display)
- [ ] Measure workflow execution time for 3 representative workflows
- [ ] Document baseline performance for future comparison

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Baseline measurements saved to `outputs/`
- [ ] Results reviewed and baseline confirmed

---

## Notes

**Why This Story Matters:**
- Establishes factual baseline (not assumptions)
- Provides before/after comparison data
- Validates that the problem is real and worth solving
- Documents methodology for future measurements

**Output Files:**
- `outputs/baseline-context-jarvis.txt`
- `outputs/baseline-context-zoe.txt`
- `outputs/baseline-context-zoro.txt`
- `outputs/baseline-token-measurement.md` (summary report)

---

## References

- PRD Section 5 - Story 1
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
