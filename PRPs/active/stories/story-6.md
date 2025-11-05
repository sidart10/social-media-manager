# Story 6: Migrate Critical Workflows

**Story ID**: STORY-1.6
**Epic**: MCP Progressive Disclosure System ([epic.md](./epic.md))
**Created**: 2025-11-05
**Status**: To Do
**Priority**: Medium
**Estimate**: 4-5 days
**Dependencies**: Story 5 (Documentation complete)

---

## User Story

As a **developer**,
I want **to migrate high-usage workflows to new pattern**,
so that **we get maximum benefit from progressive disclosure**.

---

## Tasks

- [ ] 1. Identify top 10 most-used workflows across all agents
- [ ] 2. Create migration template/guide for workflow updates
- [ ] 3. Migrate Jarvis workflows:
  - [ ] 3a. research-topic workflow
  - [ ] 3b. write-post workflow
  - [ ] 3c. analyze-profile workflow
- [ ] 4. Migrate Zoe workflows:
  - [ ] 4a. create-single-image workflow
  - [ ] 4b. create-carousel workflow
  - [ ] 4c. video-generation workflow
- [ ] 5. Migrate Zoro workflows:
  - [ ] 5a. schedule-post workflow
- [ ] 6. Test each migrated workflow individually
- [ ] 7. Document migration approach and lessons learned
- [ ] 8. Update workflow documentation with new patterns
- [ ] 9. Create migration template for remaining workflows

---

## Acceptance Criteria

- [ ] Top 10 workflows migrated successfully
- [ ] All migrated workflows tested
- [ ] Migration template created
- [ ] Documentation updated
- [ ] No regressions in migrated workflows

---

## Integration Verification

### IV1: Existing Functionality Verification

- [ ] Execute each migrated workflow → Verify identical outputs to pre-migration behavior
- [ ] Run non-migrated workflows alongside migrated ones → Confirm both patterns coexist
- [ ] Test workflows in production-like scenarios → Validate real-world usage
- [ ] Compare migrated workflow outputs to baseline → Ensure zero functional changes

### IV2: Integration Point Verification

- [ ] Review migration template → Validate it covers all workflow patterns
- [ ] Apply template to sample workflow → Confirm migration process is repeatable
- [ ] Check for any hard-coded tool references → Verify all converted to discovery pattern
- [ ] Test workflows that call multiple tools → Confirm sequential discovery works
- [ ] Validate workflow YAML syntax unchanged → Only instructions.md changes

### IV3: Performance Impact Verification

- [ ] Measure migrated workflow execution time → Confirm no regression (within 10% of baseline)
- [ ] Track tool loading during migrated workflows → Verify on-demand loading reduces tokens
- [ ] Compare token usage: old workflow vs migrated → Validate improvement
- [ ] Stress test: Run all 10 migrated workflows sequentially → Ensure consistent performance

---

## Top 10 Workflows to Migrate

### Jarvis Workflows
1. `research-topic` - Most common research workflow
2. `write-post` - Content creation for social platforms
3. `analyze-profile` - Competitive analysis

### Zoe Workflows
4. `create-single-image` - Single image generation
5. `create-carousel` - LinkedIn carousel creation
6. `video-generation` - Video creation workflow

### Zoro Workflows
7. `schedule-post` - Multi-platform publishing

### Multi-Agent Workflows
8. Research → Content → Visual → Publish (end-to-end flow)

### Additional (To Be Identified)
9. [To be identified from usage data in Story 1]
10. [To be identified from usage data in Story 1]

---

## Migration Template

### Before (Old Pattern)
```markdown
Agent receives task → All 140+ tools already loaded upfront → Call tool directly
```

### After (New Pattern)
```markdown
Agent receives task → Read .mcp-tools/_index.json → Find relevant tools → Load specific .js files → Call tool

Example:
Task: "Research AI trends"
1. Read .mcp-tools/_index.json
2. Find: "exa/search" → ".mcp-tools/exa/search.js"
3. Read .mcp-tools/exa/search.js → Parse JSDoc
4. Call: mcp__exa__search({ query: "AI trends", numResults: 10 })
```

### Migration Checklist
- [ ] Identify tools used in workflow
- [ ] Verify tools exist in `.mcp-tools/_index.json`
- [ ] Update agent instructions if needed
- [ ] Test workflow with `ENABLE_MCP_FILESYSTEM_DISCOVERY=true`
- [ ] Verify output identical to old pattern
- [ ] Document any issues or learnings

---

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] All 10 workflows migrated and tested
- [ ] Migration template documented
- [ ] Team trained on migration approach (if needed)

---

## Notes

**Migration Strategy:**
- Start with simplest workflows (single-tool usage)
- Progress to complex workflows (multi-tool, multi-agent)
- Document lessons learned for remaining workflows
- No rush - quality over speed

**Files Modified:**
- MODIFIED: Multiple workflow YAML files (or agent instructions, TBD based on architecture)
- NEW: `docs/workflow-migration-guide.md`
- NEW: `outputs/migration-report.md`

**Expected Benefits:**
- Migrated workflows load ~10 tools instead of 140+
- Faster activation time for workflows
- Better context utilization for actual work

---

## References

- PRD Section 5 - Story 6
- Migration examples: PRD Section 4
- File: `PRPs/active/prd-mcp-progressive-disclosure-v2.md`

---

**Last Updated**: 2025-11-05
