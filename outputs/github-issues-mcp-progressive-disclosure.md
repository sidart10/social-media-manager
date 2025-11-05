# GitHub Issues for MCP Progressive Disclosure Epic

**Generated**: 2025-11-05
**Source PRD**: docs/prd-mcp-progressive-disclosure-v2.md (v2.2)
**Total Stories**: 6 + 1 Epic

---

## EPIC: MCP Progressive Disclosure System

**Title**: `[EPIC] MCP Progressive Disclosure System - 96% Token Reduction`

**Labels**: `epic`, `performance`, `enhancement`, `architecture`

**Milestone**: `MCP Progressive Disclosure`

**Body**:

```markdown
## Epic Goal

Reduce MCP tool context token overhead from 146.5k (14.7%) to <6k tokens (0.6%) through filesystem-based progressive tool discovery, enabling the system to scale to 20+ MCP servers without context constraints.

## Problem Statement

- ALL 140+ MCP tools loaded into EVERY agent at startup
- Consumes 146.5k tokens (14.7% of context) before any work begins
- Each agent only needs 15-45 tools but loads 140+
- Cannot add more MCP servers without context overflow

## Solution Approach

Implement **filesystem-based progressive tool discovery** following Anthropic's proven pattern:
- Agents discover tools by reading `.mcp-tools/` directory
- Load only needed tools on-demand (not all upfront)
- 96% token reduction (146k → 6k tokens)

## Research Foundation

**Anthropic** (Nov 2024): "Code execution with MCP: Building more efficient agents"
- Demonstrated 98.7% token reduction using this pattern
- Proven in production by Cloudflare

## Stories in This Epic

- [ ] #STORY-1 - Measure Baseline (1 day)
- [ ] #STORY-2 - Build Tool Generator (3-4 days)
- [ ] #STORY-3 - Update Agent Instructions with Pilot Approach (2-3 days)
- [ ] #STORY-4 - Test & Validate Token Reduction (3-4 days)
- [ ] #STORY-5 - Update Documentation (2 days)
- [ ] #STORY-6 - Migrate Critical Workflows (4-5 days)

## Success Metrics

**Token Reduction**: 146,500 → <15,000 tokens (≥90% reduction)
**Functionality**: 100% of existing workflows still work (0 regressions)
**Performance**: Agent activation time increase <200ms

## Timeline

**Total Duration**: 6 weeks
**Estimated Delivery**: Week of 2025-12-16

## References

- PRD: `docs/prd-mcp-progressive-disclosure-v2.md`
- Anthropic Article: https://www.anthropic.com/engineering/code-execution-with-mcp
- Cloudflare Article: https://blog.cloudflare.com/code-mode/
```

---

## STORY 1: Measure Baseline

**Title**: `[Story 1.1] Measure Baseline Token Usage Across All Agents`

**Labels**: `story`, `measurement`, `analysis`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 1 day

**Body**:

```markdown
## User Story

As a **product manager**,
I want **to measure actual current token usage**,
so that **we validate the problem and track improvement**.

## Tasks

- [ ] Activate each agent (/jarvis, /zoe, /zoro)
- [ ] Capture token count with all MCP tools loaded using `/context` command
- [ ] Save full context output to `outputs/baseline-context-{agent}.txt`
- [ ] Extract token count from "MCP Tools" section
- [ ] Document breakdown by server (create table: Server Name | Tool Count | Est. Tokens)
- [ ] Identify top 20 most expensive tools by description length
- [ ] Validate ~146.5k baseline or update PRD if actual differs >10%

## Acceptance Criteria

- ✅ Baseline documented in `outputs/baseline-token-measurement.md`
- ✅ Token count per agent measured and logged
- ✅ Methodology documented for future comparison

## Integration Verification

### IV1: Existing Functionality Verification
- Activate each agent (/jarvis, /zoe, /zoro) → Confirm all menus display correctly
- Execute representative workflow from each agent → Verify normal operation
- Multi-agent handoff test (Jarvis → Zoe → Zoro) → Confirm coordination works

### IV2: Integration Point Verification
- Use `/context` command during each agent session → Capture exact token breakdown
- Validate MCP tools section shows all 140+ tools loaded
- Cross-check token count matches expected ~146.5k baseline

### IV3: Performance Impact Verification
- Measure agent activation time (from command to menu display)
- Measure workflow execution time for 3 representative workflows
- Document baseline performance for future comparison

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Baseline measurements saved to outputs/
- [ ] Results reviewed and baseline confirmed

## References

- PRD Section 5.1 - Story 1
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## STORY 2: Build Tool Generator

**Title**: `[Story 1.2] Build MCP Tool Wrapper Generator Script`

**Labels**: `story`, `tooling`, `codegen`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 3-4 days

**Body**:

```markdown
## User Story

As a **developer**,
I want **an automated tool generator script**,
so that **I can create filesystem tool structure from .mcp.json**.

## Tasks

- [ ] Create `tools/generate-mcp-tools.js` script
- [ ] Parse `.mcp.json` and extract all MCP server configs
- [ ] For each tool, generate `.js` file with JSDoc comments
- [ ] Generate `_index.json` with tool mappings
- [ ] Add `npm run generate:mcp-tools` script to package.json
- [ ] Test generation with all 11 MCP servers
- [ ] Validate generated files are valid JavaScript (no syntax errors)
- [ ] Test idempotency (run twice, compare outputs)

## Acceptance Criteria

- ✅ Script generates `.mcp-tools/` directory structure
- ✅ All 140+ tools have corresponding .js files
- ✅ JSDoc comments extracted from MCP schemas
- ✅ _index.json accurately maps all tools
- ✅ Generated files are valid JavaScript
- ✅ Script completes in <30 seconds
- ✅ Idempotent (run twice = same output)

## Integration Verification

### IV1: Existing Functionality Verification
- Run generator → Verify no impact on existing agent activation
- Execute workflows → Confirm existing MCP tool calls still work (wrappers not used yet)
- Validate agents still load tools the old way (no behavioral change yet)

### IV2: Integration Point Verification
- Inspect generated JavaScript files → Validate syntax is valid
- Parse _index.json → Verify structure matches design spec
- Test imports of generated files → Confirm no errors (even though not used yet)
- Manual review sample tools → Validate JSDoc matches MCP schema
- Check all 11 servers represented → Verify no servers missing

### IV3: Performance Impact Verification
- Measure generator execution time (must be <30 seconds for all 140+ tools)
- Verify generated files totaling <500KB (fast Git operations)
- Confirm no runtime performance impact (wrappers not loaded in agent context yet)

## Technical Design Reference

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
  return {
    toolName: 'mcp__exa__search',
    params: params
  };
}
```

### Index File Example
```json
{
  "version": "1.0",
  "generated": "2025-11-05T10:30:00Z",
  "totalTools": 140,
  "servers": {
    "exa": {
      "toolCount": 2,
      "tools": {
        "search": ".mcp-tools/exa/search.js"
      }
    }
  }
}
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Generator script committed to `tools/` directory
- [ ] npm script added and tested
- [ ] .mcp-tools/ directory generated and validated

## References

- PRD Section 5.1 - Story 2
- Technical Design Section 4
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## STORY 3: Update Agent Instructions (Pilot Approach)

**Title**: `[Story 1.3] Update Agent Instructions with Filesystem Discovery (Pilot with Jarvis)`

**Labels**: `story`, `agents`, `documentation`, `pilot`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 2-3 days

**Body**:

```markdown
## User Story

As an **AI agent**,
I want **clear instructions on tool discovery**,
so that **I automatically use filesystem instead of upfront loading**.

## Implementation Strategy

**Pilot with Jarvis → Validate → Rollout to Zoe/Zoro**

## Tasks

### Phase 3A: Implement Feature Flag & Jarvis Pilot (Days 1-2)
- [ ] Add environment variable `ENABLE_MCP_FILESYSTEM_DISCOVERY` to `.env.example`
- [ ] Update agent activation logic to check feature flag
- [ ] Update `jarvis-sidecar/instructions.md` with discovery workflow ONLY
- [ ] Add conditional logic: If flag=true, use filesystem; if false, use old loading
- [ ] Test Jarvis with flag=true → Verify discovery works
- [ ] Test Jarvis with flag=false → Verify old loading still works (rollback test)

### Phase 3B: Jarvis Validation Period (Days 3-4)
- [ ] Run Jarvis with filesystem discovery for 2 days
- [ ] Execute 10+ research workflows with Jarvis
- [ ] Monitor token usage (should be ~8-15k instead of 146k)
- [ ] Track any errors or issues
- [ ] **Go/No-Go decision**: If Jarvis stable, proceed to Phase 3C

### Phase 3C: Rollout to Zoe and Zoro (Days 5-6)
- [ ] Update `zoe-sidecar/instructions.md` with discovery workflow
- [ ] Update `zoro-sidecar/instructions.md` with discovery workflow
- [ ] Test Zoe and Zoro independently
- [ ] Test multi-agent coordination (Jarvis → Zoe → Zoro)
- [ ] Add troubleshooting: "If tool not found, list .mcp-tools/ directory"

## Acceptance Criteria

- ✅ Feature flag `ENABLE_MCP_FILESYSTEM_DISCOVERY` implemented
- ✅ Rollback tested (flag=false returns to old behavior)
- ✅ Jarvis piloted successfully for 2 days
- ✅ Each agent's instructions.md updated
- ✅ Tool discovery workflow documented
- ✅ Examples provided for common scenarios
- ✅ Agents automatically discover tools when activated
- ✅ Agents don't load tools unnecessarily

## Integration Verification

### IV1: Existing Functionality Verification
- Activate Jarvis with updated instructions → Execute research workflow → Verify exa/firecrawl discovery works
- Activate Zoe with updated instructions → Execute image generation → Verify nanobanana/gpt-image-1 discovery works
- Activate Zoro with updated instructions → Execute schedule-post → Verify postiz discovery works
- Test multi-agent coordination → Confirm handoffs (Jarvis → Zoe → Zoro) still function

### IV2: Integration Point Verification
- Agent reads _index.json → Verify correct tool search behavior
- Agent lists .mcp-tools/ directory → Confirm proper server discovery
- Agent loads specific tool file → Validate JSDoc comprehension
- Test with non-existent tool request → Verify graceful error handling
- Verify agents only load 5-10 tools per session (not all 140+)

### IV3: Performance Impact Verification
- Measure agent activation time with new instructions (target <200ms increase)
- Track filesystem read latency (registry + tool files, target <100ms total)
- Verify agent response time for first tool use (target <500ms)
- Confirm agents aren't repeatedly reading the same files (caching works)

## Feature Flag Architecture

```javascript
const USE_FILESYSTEM_DISCOVERY = process.env.ENABLE_MCP_FILESYSTEM_DISCOVERY === 'true';

if (USE_FILESYSTEM_DISCOVERY) {
  // NEW: Progressive disclosure via filesystem
  console.log('MCP Progressive Disclosure: ENABLED');
} else {
  // OLD: Load all tools upfront
  console.log('MCP Progressive Disclosure: DISABLED (using legacy loading)');
}
```

## Agent Instruction Example

```markdown
## Tool Discovery Process

When you need external tools:
1. Read `.mcp-tools/_index.json` to search for relevant tools
2. Load specific tool files only when needed
3. Use the JSDoc comments to understand parameters
4. Call the actual MCP tool (format: mcp__server__toolname)
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Feature flag implemented and tested
- [ ] Jarvis pilot completed with 2-day validation
- [ ] All 3 agent instructions updated
- [ ] Go/No-Go decision documented

## References

- PRD Section 5.1 - Story 3
- Feature Flag Architecture: Section 4
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## STORY 4: Test & Validate Token Reduction

**Title**: `[Story 1.4] Comprehensive Testing & Token Reduction Validation`

**Labels**: `story`, `testing`, `validation`, `qa`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 3-4 days

**Body**:

```markdown
## User Story

As a **product manager**,
I want **comprehensive testing across all agents**,
so that **I validate 90%+ token reduction without breaking workflows**.

## Tasks

- [ ] Run all existing workflows with filesystem discovery enabled
- [ ] Measure token usage per agent activation using `/context` command
- [ ] Compare before/after token counts (baseline from Story 1)
- [ ] Identify any workflow failures or issues
- [ ] Document actual token reduction achieved
- [ ] Create before/after comparison report
- [ ] Run multi-agent workflow tests (Jarvis → Zoe → Zoro)
- [ ] Execute edge case scenarios (error handling, retry logic)

## Acceptance Criteria

- ✅ All workflows execute successfully
- ✅ Token reduction ≥90% (146k → <15k)
- ✅ Agent activation time <200ms slower
- ✅ No functional regressions
- ✅ Telemetry data captured and analyzed
- ✅ Success report published

## Integration Verification

### IV1: Existing Functionality Verification
- Execute all existing workflows (research, content creation, image gen, video gen, publishing) → Verify 100% success rate
- Test multi-agent workflows (Jarvis creates content → Zoe creates visuals → Zoro publishes) → Confirm end-to-end flow intact
- Run workflows that were NOT explicitly migrated → Verify they still work (backward compatibility)
- Test edge case workflows (error handling, retry logic, fallbacks) → Confirm robust operation

### IV2: Integration Point Verification
- Monitor agent filesystem reads during workflow execution → Verify only needed tools loaded
- Compare tool loading pattern: old (140+ upfront) vs new (5-10 on-demand) → Validate progressive disclosure working
- Test _index.json search functionality → Confirm agents find correct tools
- Verify tool file reads → Validate JSDoc parsing and parameter extraction
- Check for any tools loaded but never used → Identify optimization opportunities

### IV3: Performance Impact Verification
- Measure token usage per agent with `/context` command → Validate ≥90% reduction (146k → <15k)
- Compare agent activation time before/after → Ensure <200ms increase
- Measure workflow execution time → Confirm no regression (must be within 10% of baseline)
- Track filesystem I/O operations → Verify <100ms total latency for tool discovery
- Load test: Run 10 workflows consecutively → Confirm consistent performance

## Expected Results

| Agent | Baseline Tokens | Target Tokens | Expected Reduction |
|-------|----------------|---------------|-------------------|
| Jarvis | 146,500 | ~8,000 | 95% |
| Zoe | 146,500 | ~12,000 | 92% |
| Zoro | 146,500 | ~7,000 | 95% |

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Success report published to `outputs/`
- [ ] Token reduction targets validated
- [ ] No workflow regressions detected

## References

- PRD Section 5.1 - Story 4
- Baseline measurements from Story 1
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## STORY 5: Update Documentation

**Title**: `[Story 1.5] Update Documentation for MCP Progressive Disclosure`

**Labels**: `story`, `documentation`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 2 days

**Body**:

```markdown
## User Story

As a **team member**,
I want **comprehensive documentation**,
so that **I understand the new system and can troubleshoot issues**.

## Tasks

- [ ] Update CLAUDE.md with "MCP Progressive Disclosure" section
- [ ] Document filesystem discovery pattern with examples
- [ ] Add troubleshooting guide for common issues
- [ ] Document generator script usage (`npm run generate:mcp-tools`)
- [ ] Add migration examples (old pattern → new pattern)
- [ ] Update README.md with new architecture overview
- [ ] Create architecture diagram showing tool discovery flow
- [ ] Update changelog with implementation completion

## Acceptance Criteria

- ✅ CLAUDE.md updated with new patterns
- ✅ Architecture diagram included
- ✅ Generator script documented
- ✅ Troubleshooting guide complete
- ✅ Examples provided for common tasks
- ✅ Changelog updated

## Integration Verification

### IV1: Existing Functionality Verification
- Follow documentation as new user → Verify all examples work correctly
- Execute documented workflows → Confirm outputs match expectations
- Use troubleshooting guide for simulated issue → Verify resolution steps work

### IV2: Integration Point Verification
- Cross-reference documentation with actual implementation → Verify no discrepancies
- Check code examples in docs → Validate they execute without errors
- Review architecture diagram → Confirm accuracy against codebase
- Test generator script instructions → Verify step-by-step accuracy

### IV3: Performance Impact Verification
- N/A (documentation has no runtime impact)

## Documentation Sections to Add

### CLAUDE.md Updates
```markdown
## MCP Progressive Disclosure

### Overview
Agents discover and load MCP tools on-demand from `.mcp-tools/` directory.

### How It Works
1. Agent reads `_index.json` to find available tools
2. Agent loads specific tool files only when needed
3. Only 5-10 tools in context instead of 140+

### Tool Discovery Pattern
[Include example from PRD]

### Troubleshooting
- Issue: "Tool not found"
  - Solution: Check `.mcp-tools/_index.json` for available tools
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] Documentation reviewed by team
- [ ] Examples tested and validated

## References

- PRD Section 5.1 - Story 5
- Technical Design Section 4
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## STORY 6: Migrate Critical Workflows

**Title**: `[Story 1.6] Migrate Top 10 Critical Workflows to Progressive Disclosure`

**Labels**: `story`, `migration`, `workflows`

**Epic**: Link to Epic issue

**Milestone**: `MCP Progressive Disclosure`

**Estimate**: 4-5 days

**Body**:

```markdown
## User Story

As a **developer**,
I want **to migrate high-usage workflows to new pattern**,
so that **we get maximum benefit from progressive disclosure**.

## Tasks

- [ ] Identify top 10 most-used workflows across all agents
- [ ] Create migration template/guide for workflow updates
- [ ] Migrate Jarvis workflows (research-topic, write-post, analyze-profile)
- [ ] Migrate Zoe workflows (create-single-image, create-carousel, video-generation)
- [ ] Migrate Zoro workflows (schedule-post)
- [ ] Test each migrated workflow individually
- [ ] Document migration approach and lessons learned
- [ ] Update workflow documentation with new patterns
- [ ] Create migration template for remaining workflows

## Acceptance Criteria

- ✅ Top 10 workflows migrated successfully
- ✅ All migrated workflows tested
- ✅ Migration template created
- ✅ Documentation updated
- ✅ No regressions in migrated workflows

## Integration Verification

### IV1: Existing Functionality Verification
- Execute each migrated workflow → Verify identical outputs to pre-migration behavior
- Run non-migrated workflows alongside migrated ones → Confirm both patterns coexist
- Test workflows in production-like scenarios → Validate real-world usage
- Compare migrated workflow outputs to baseline → Ensure zero functional changes

### IV2: Integration Point Verification
- Review migration template → Validate it covers all workflow patterns
- Apply template to sample workflow → Confirm migration process is repeatable
- Check for any hard-coded tool references → Verify all converted to discovery pattern
- Test workflows that call multiple tools → Confirm sequential discovery works
- Validate workflow YAML syntax unchanged → Only instructions.md changes

### IV3: Performance Impact Verification
- Measure migrated workflow execution time → Confirm no regression (within 10% of baseline)
- Track tool loading during migrated workflows → Verify on-demand loading reduces tokens
- Compare token usage: old workflow vs migrated → Validate improvement
- Stress test: Run all 10 migrated workflows sequentially → Ensure consistent performance

## Top 10 Workflows to Migrate

1. Jarvis: `research-topic` (most common)
2. Jarvis: `write-post` (content creation)
3. Jarvis: `analyze-profile` (competitive analysis)
4. Zoe: `create-single-image` (image generation)
5. Zoe: `create-carousel` (LinkedIn carousels)
6. Zoe: `video-generation` (video creation)
7. Zoro: `schedule-post` (publishing)
8. Multi-agent: Research → Content → Visual → Publish flow
9. [To be identified from usage data]
10. [To be identified from usage data]

## Migration Template

```markdown
### Before (Old Pattern)
- Agent loads all 140+ tools upfront
- Workflow calls tool directly: mcp__exa__search

### After (New Pattern)
- Agent reads .mcp-tools/_index.json
- Agent loads .mcp-tools/exa/search.js
- Agent calls tool: mcp__exa__search (same call, discovered differently)
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All integration verifications passed
- [ ] All 10 workflows migrated and tested
- [ ] Migration template documented
- [ ] Team trained on migration approach

## References

- PRD Section 5.1 - Story 6
- Agent Discovery Workflow: Section 4
- File: `docs/prd-mcp-progressive-disclosure-v2.md`
```

---

## Creating Issues: Two Options

### Option 1: Manual Creation (Copy-Paste)

Since git commands are blocked by Xcode license, you can:

1. Go to your GitHub repository
2. Create a new milestone: "MCP Progressive Disclosure"
3. Create the Epic issue (copy body above)
4. Create 6 story issues (copy bodies above)
5. Link stories to Epic in descriptions

### Option 2: CLI Commands (After Xcode License)

Run this after accepting Xcode license:

```bash
# Accept Xcode license first
sudo xcodebuild -license

# Then run these commands to create issues
gh issue create --title "[EPIC] MCP Progressive Disclosure System - 96% Token Reduction" \
  --label "epic,performance,enhancement,architecture" \
  --milestone "MCP Progressive Disclosure" \
  --body-file <(cat outputs/github-issues-mcp-progressive-disclosure.md | sed -n '/^## EPIC:/,/^---$/p')

gh issue create --title "[Story 1.1] Measure Baseline Token Usage Across All Agents" \
  --label "story,measurement,analysis" \
  --milestone "MCP Progressive Disclosure" \
  --body-file <(cat outputs/github-issues-mcp-progressive-disclosure.md | sed -n '/^## STORY 1:/,/^---$/p')

# Repeat for Stories 2-6...
```

---

**Recommendation**: Accept Xcode license, then I can create all issues programmatically via `gh` CLI.

Would you like me to:
1. **Create the CLI commands** for you to run after accepting license?
2. **Just keep the markdown file** and you'll create issues manually?
3. **Something else**?
