# Story 4: Test & Validate Token Reduction

**Story ID**: STORY-1.4
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: High
**Estimate**: 3-4 days
**Dependencies**: Story 3 (Agent instructions updated)

---

## User Story

As a **product manager**,
I want **comprehensive testing across all agents**,
so that **I validate 90%+ token reduction without breaking workflows**.

---

## Tasks

- [ ] 1. Run all existing workflows with filesystem discovery enabled
- [ ] 2. Measure token usage per agent activation using `/context` command
- [ ] 3. Compare before/after token counts (vs Story 1 baseline)
- [ ] 4. Identify any workflow failures or issues
- [ ] 5. Document actual token reduction achieved
- [ ] 6. Create before/after comparison report
- [ ] 7. Run multi-agent workflow tests (Jarvis → Zoe → Zoro)
- [ ] 8. Execute edge case scenarios (error handling, retry logic)

---

## Acceptance Criteria

- [ ] All workflows execute successfully
- [ ] Token reduction ≥90% (146k → <15k)
- [ ] Agent activation time <200ms slower
- [ ] No functional regressions
- [ ] Telemetry data captured and analyzed
- [ ] Success report published to `outputs/`

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Execute all existing workflows (research, content creation, image gen, video gen, publishing) → Verify 100% success rate
- [ ] Test multi-agent workflows (Jarvis creates content → Zoe creates visuals → Zoro publishes) → Confirm end-to-end flow intact
- [ ] Run workflows that were NOT explicitly migrated → Verify they still work (backward compatibility)
- [ ] Test edge case workflows (error handling, retry logic, fallbacks) → Confirm robust operation

### IV2: Integration Point Verification

- [ ] Monitor agent filesystem reads during workflow execution → Verify only needed tools loaded
- [ ] Compare tool loading pattern: old (140+ upfront) vs new (5-10 on-demand) → Validate progressive disclosure working
- [ ] Test _index.json search functionality → Confirm agents find correct tools
- [ ] Verify tool file reads → Validate JSDoc parsing and parameter extraction
- [ ] Check for any tools loaded but never used → Identify optimization opportunities

### IV3: Performance Impact Verification

- [ ] Measure token usage per agent with `/context` command → Validate ≥90% reduction (146k → <15k)
- [ ] Compare agent activation time before/after → Ensure <200ms increase
- [ ] Measure workflow execution time → Confirm no regression (must be within 10% of baseline)
- [ ] Track filesystem I/O operations → Verify <100ms total latency for tool discovery
- [ ] Load test: Run 10 workflows consecutively → Confirm consistent performance

---

## Expected Results

| Agent | Baseline Tokens | Target Tokens | Expected Reduction |
|-------|----------------|---------------|-------------------|
| **Jarvis** | 146,500 | ~8,000 | 95% |
| **Zoe** | 146,500 | ~12,000 | 92% |
| **Zoro** | 146,500 | ~7,000 | 95% |

---

## Test Matrix

### Workflows to Test

**Jarvis (Research & Content):**
- research-topic workflow
- write-post workflow
- analyze-profile workflow
- competitive-analysis workflow

**Zoe (Visual Production):**
- create-single-image workflow
- create-carousel workflow
- video-generation workflow

**Zoro (Publishing):**
- schedule-post workflow
- multi-platform posting

**Multi-Agent:**
- Full pipeline: Research → Content → Visual → Publish

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Success report published to `outputs/`
- [ ] Token reduction targets validated (≥90%)
- [ ] No workflow regressions detected
- [ ] Performance metrics within acceptable range

---

## Notes

**Critical Validation Points:**
- This story validates the ENTIRE implementation
- Must achieve ≥90% token reduction or investigate why
- Zero tolerance for workflow regressions
- Performance must not degrade significantly

**Output Files:**
- `outputs/testing-report-mcp-progressive-disclosure.md`
- `outputs/token-comparison-before-after.md`
- `outputs/workflow-test-results.json`

---

## References

- PRD Section 5 - Story 4
- Baseline measurements from Story 1
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
