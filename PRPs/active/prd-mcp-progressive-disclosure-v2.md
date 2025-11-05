# MCP Progressive Disclosure System - Simplified PRD

**Version**: 2.2 (Production-Ready with Safety Features)
**Created**: 2025-11-05
**Updated**: 2025-11-05
**Author**: sid + John (PM agent)
**Status**: Ready for Implementation
**Project**: social-media-manager

---

## Executive Summary

**Problem**: All agents load 140+ MCP tools (11 servers) upfront, consuming 146.5k tokens before any work begins.

**Solution**: Implement filesystem-based progressive tool discovery - agents discover and load only the tools they need.

**Value**: 96% token reduction (146k → 6k tokens) in 6-8 weeks.

**Approach**: Follow Anthropic's proven pattern - skip intermediate steps, go directly to filesystem discovery.

---

## Table of Contents

1. [Problem & Context](#1-problem--context)
2. [Solution Overview](#2-solution-overview)
3. [Requirements](#3-requirements)
4. [Technical Design](#4-technical-design)
5. [Implementation Stories](#5-implementation-stories)
6. [Success Metrics](#6-success-metrics)
7. [Timeline & Resources](#7-timeline--resources)
8. [Risks & Mitigations](#8-risks--mitigations)

---

## 1. Problem & Context

### Current State

The social-media-manager system uses 3 agents (Jarvis, Zoe, Zoro) with **11 MCP servers**:
- Research: exa, firecrawl, apify
- Content: nanobanana, gpt-image-1, fal-video, heygen
- Publishing: postiz, cloudinary
- Infrastructure: notion, chrome-devtools

**The Problem**:
- ALL 140+ tools loaded into EVERY agent at startup
- Consumes ~146.5k tokens (14.7% of context) before any work
- Each agent only needs 15-45 tools but loads 140+
- Cannot add more MCP servers without context overflow

### Why This Matters

1. **Token Waste**: 80-90% of loaded tools never used in typical session
2. **Latency**: Loading 140+ tool definitions adds startup overhead
3. **Scalability**: Cannot grow to 20+ MCP servers
4. **Cost**: Wasted tokens = wasted API costs

### Research Foundation

**Anthropic (Nov 2024)**: "Code execution with MCP: Building more efficient agents"
- Demonstrated 98.7% token reduction (150k → 2k)
- Method: Filesystem-based progressive disclosure
- Pattern: Agents discover tools by exploring filesystem
- Proven in production by Cloudflare

**Key Insight**: Models are excellent at navigating filesystems. Present tools as files, let agents discover them on-demand.

---

## 2. Solution Overview

### The Simple Approach

Instead of loading all tools upfront, create a **tool directory** that agents explore:

```
.mcp-tools/
├── _index.json              # Quick lookup: tool name → file path
├── exa/
│   ├── search.js            # One file per tool
│   └── get-contents.js
├── postiz/
│   ├── schedule-post.js
│   └── list-integrations.js
└── cloudinary/
    └── upload-asset.js
```

**How It Works**:
1. Agent receives task: "Research AI agents and create LinkedIn post"
2. Agent lists `.mcp-tools/` directory → sees available servers
3. Agent reads `.mcp-tools/_index.json` → finds relevant tools
4. Agent loads specific tool files: `exa/search.js`, `postiz/schedule-post.js`
5. Only 2-5 tool definitions in context instead of 140+

### What We're NOT Doing

❌ **Phase 1: Config-based filtering** - Not in Anthropic article, adds unnecessary step
❌ **TypeScript wrappers** - JavaScript is simpler, no build complexity
❌ **Code execution sandbox** - 6 months work for 2% additional gain (96%→98%)
❌ **Complex metadata layers** - Filesystem IS the metadata
❌ **Elaborate backward compatibility** - Keep it simple, update workflows incrementally

### Token Savings

| State | Tools Loaded | Tokens | Reduction |
|-------|--------------|--------|-----------|
| **Current** | 140+ tools | 146,500 | 0% |
| **After Implementation** | 5-10 tools | 6,000 | **96%** |

---

## 3. Requirements

### Must Have (MVP)

**R1**: Generate `.mcp-tools/` directory with one JavaScript file per MCP tool
**R2**: Each tool file contains JSDoc comments with description and parameter info
**R3**: Create `_index.json` mapping tool names to file paths for quick lookup
**R4**: Update agent instructions to discover and load tools from filesystem
**R5**: All existing workflows continue to work unchanged
**R6**: Achieve ≥90% token reduction (146k → <15k tokens)

### Should Have

**R7**: Generator script (`npm run generate:mcp-tools`) to rebuild from `.mcp.json`
**R8**: Documentation showing agents how to use filesystem discovery
**R9**: Telemetry logging actual token usage before/after
**R10**: Migration guide for updating workflows to new pattern

### Won't Have (Out of Scope)

- TypeScript (use JavaScript + JSDoc)
- Code execution sandbox (future enhancement, separate PRD)
- Agent-specific filtering configs (filesystem is the filter)
- Complex registry databases (JSON file is sufficient)
- Backward compatibility layers (direct migration)

### Compatibility Requirements

**CR1**: **Existing Agent API Compatibility** - All existing agent activation commands (/jarvis, /zoe, /zoro) MUST continue to work without modification

**CR2**: **Workflow Backward Compatibility** - All existing YAML workflow files MUST execute successfully without changes during implementation

**CR3**: **Output Structure Consistency** - The 6-stage output structure (00-session through 05-published) MUST remain unchanged

**CR4**: **MCP Server Integration** - All 11 existing MCP servers MUST continue to function with identical inputs/outputs

**CR5**: **Skills System Compatibility** - Existing skills that invoke MCP tools MUST continue to work during transition

**CR6**: **Notion Integration** - Content tracking and status updates via Notion MCP MUST maintain current functionality

**CR7**: **Configuration File Format** - Existing config.yaml fields MUST NOT break; new fields MUST be additive only

---

## 4. Technical Design

### Directory Structure

```
project-root/
├── .mcp-tools/                    # NEW: Tool discovery directory
│   ├── _index.json                # Quick lookup
│   ├── exa/
│   │   ├── search.js
│   │   └── get-contents.js
│   ├── firecrawl/
│   │   └── scrape.js
│   ├── postiz/
│   │   ├── schedule-post.js
│   │   └── list-integrations.js
│   └── cloudinary/
│       └── upload-asset.js
│
├── tools/
│   └── generate-mcp-tools.js      # NEW: Generator script
│
├── bmad/agents/
│   ├── content-intelligence/
│   │   └── jarvis-sidecar/
│   │       └── instructions.md    # UPDATED: Tool discovery workflow
│   ├── zoe/zoe-sidecar/
│   │   └── instructions.md        # UPDATED: Tool discovery workflow
│   └── zoro/zoro-sidecar/
│       └── instructions.md        # UPDATED: Tool discovery workflow
│
└── .mcp.json                      # UNCHANGED: Server definitions
```

### Tool File Format (JavaScript)

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
    },
    "postiz": {
      "toolCount": 15,
      "tools": {
        "schedule-post": ".mcp-tools/postiz/schedule-post.js",
        "list-integrations": ".mcp-tools/postiz/list-integrations.js"
      }
    }
  }
}
```

### Agent Discovery Workflow

**When agent receives a task**:

1. **Identify needed tools**: "I need to search the web and schedule a post"
2. **Read index**: `Read .mcp-tools/_index.json` → see all available tools
3. **Search index**: Find tools matching "search" and "schedule"
4. **Load definitions**: `Read .mcp-tools/exa/search.js` and `.mcp-tools/postiz/schedule-post.js`
5. **Execute**: Call actual MCP tools with proper parameters

**Example agent instruction addition**:

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

### Feature Flag Architecture

**Purpose**: Enable safe rollout and instant rollback if issues arise.

**Environment Variable**:
```bash
# .env or .env.example
ENABLE_MCP_FILESYSTEM_DISCOVERY=true  # Use filesystem discovery
ENABLE_MCP_FILESYSTEM_DISCOVERY=false # Use old upfront loading (rollback)
```

**Implementation Pattern**:
```javascript
// In agent activation logic (e.g., bmad/core/agents/bmad-master.md or similar)

const USE_FILESYSTEM_DISCOVERY = process.env.ENABLE_MCP_FILESYSTEM_DISCOVERY === 'true';

if (USE_FILESYSTEM_DISCOVERY) {
  // NEW: Progressive disclosure via filesystem
  // Agent instructions will guide reading .mcp-tools/_index.json
  // Load tools on-demand as needed
  console.log('MCP Progressive Disclosure: ENABLED');
} else {
  // OLD: Load all tools upfront (backward compatible)
  // Default behavior if flag not set or set to false
  console.log('MCP Progressive Disclosure: DISABLED (using legacy loading)');
}
```

**Rollback Procedure**:
1. Set `ENABLE_MCP_FILESYSTEM_DISCOVERY=false` in `.env`
2. Restart agents
3. All agents revert to loading 140+ tools upfront
4. Estimated rollback time: **15 seconds**

**Benefits**:
- ✅ Instant rollback without code changes
- ✅ Can test new pattern alongside old pattern
- ✅ Safe for production deployment
- ✅ No git revert needed

---

### Generator Script

```javascript
// tools/generate-mcp-tools.js

/**
 * Generates .mcp-tools/ directory from .mcp.json
 * Run: npm run generate:mcp-tools
 */

import fs from 'fs';
import path from 'path';

// 1. Read .mcp.json and parse MCP server configurations
// 2. For each server, create directory: .mcp-tools/{serverName}/
// 3. For each tool, create .js file with JSDoc from schema
// 4. Generate _index.json with all tool mappings
// 5. Validate all files are valid JavaScript

// Implementation: ~200 lines, simple file generation
```

---

## 5. Implementation Stories

### Story 1: Measure Baseline

**User Story**:
As a product manager,
I want to measure actual current token usage,
so that we validate the problem and track improvement.

**Tasks**:
1. Activate each agent (/jarvis, /zoe, /zoro)
2. Capture token count with all MCP tools loaded
   - 2a. Use `/context` command during each agent activation
   - 2b. Save full context output to `outputs/baseline-context-{agent}.txt`
   - 2c. Extract token count from "MCP Tools" section
   - 2d. Record exact tool count loaded (should be 140+)
3. Document breakdown by server
   - 3a. List all tools from each of the 11 servers
   - 3b. Estimate tokens per server (total ÷ 11 for rough estimate)
   - 3c. Create table: Server Name | Tool Count | Est. Tokens
4. Identify top 20 most expensive tools
   - 4a. Sort tools by estimated token cost (longer descriptions = more tokens)
   - 4b. Document in table: Tool Name | Server | Est. Tokens | Description Length
5. Validate ~146.5k baseline or update PRD
   - 5a. If actual measurement differs >10% from 146.5k, update PRD Section 1
   - 5b. Document actual baseline as source of truth

**Acceptance Criteria**:
- ✅ Baseline documented in `outputs/baseline-token-measurement.md`
- ✅ Token count per agent measured and logged
- ✅ Methodology documented for future comparison

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Activate each agent (/jarvis, /zoe, /zoro) → Confirm all menus display correctly
- Execute representative workflow from each agent → Verify normal operation
- Multi-agent handoff test (Jarvis → Zoe → Zoro) → Confirm coordination works

**IV2: Integration Point Verification**
- Use `/context` command during each agent session → Capture exact token breakdown
- Validate MCP tools section shows all 140+ tools loaded
- Cross-check token count matches expected ~146.5k baseline

**IV3: Performance Impact Verification**
- Measure agent activation time (from command to menu display)
- Measure workflow execution time for 3 representative workflows
- Document baseline performance for future comparison

**Estimated Time**: 1 day

---

### Story 2: Build Tool Generator

**User Story**:
As a developer,
I want an automated tool generator script,
so that I can create filesystem tool structure from .mcp.json.

**Tasks**:
1. Create `tools/generate-mcp-tools.js` script
2. Parse `.mcp.json` and extract all MCP server configs
3. For each tool, generate `.js` file with JSDoc
4. Generate `_index.json` with tool mappings
5. Add `npm run generate:mcp-tools` script
6. Test generation with all 11 servers

**Acceptance Criteria**:
- ✅ Script generates `.mcp-tools/` directory structure
- ✅ All 140+ tools have corresponding .js files
- ✅ JSDoc comments extracted from MCP schemas
- ✅ _index.json accurately maps all tools
- ✅ Generated files are valid JavaScript
- ✅ Script completes in <30 seconds
- ✅ Idempotent (run twice = same output)

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Run generator → Verify no impact on existing agent activation
- Execute workflows → Confirm existing MCP tool calls still work (wrappers not used yet)
- Validate agents still load tools the old way (no behavioral change yet)

**IV2: Integration Point Verification**
- Inspect generated JavaScript files → Validate syntax is valid
- Parse _index.json → Verify structure matches design spec
- Test imports of generated files → Confirm no errors (even though not used yet)
- Manual review sample tools → Validate JSDoc matches MCP schema
- Check all 11 servers represented → Verify no servers missing

**IV3: Performance Impact Verification**
- Measure generator execution time (must be <30 seconds for all 140+ tools)
- Verify generated files totaling <500KB (fast Git operations)
- Confirm no runtime performance impact (wrappers not loaded in agent context yet)

**Estimated Time**: 3-4 days

---

### Story 3: Update Agent Instructions (Pilot Approach)

**User Story**:
As an AI agent,
I want clear instructions on tool discovery,
so that I automatically use filesystem instead of upfront loading.

**Implementation Strategy**: **Pilot with Jarvis → Validate → Rollout to Zoe/Zoro**

**Tasks**:

**Phase 3A: Implement Feature Flag & Jarvis Pilot (Days 1-2)**
1. Add environment variable `ENABLE_MCP_FILESYSTEM_DISCOVERY` to `.env.example`
2. Update agent activation logic to check feature flag:
   ```javascript
   const USE_FILESYSTEM_DISCOVERY = process.env.ENABLE_MCP_FILESYSTEM_DISCOVERY === 'true';
   ```
3. Update `jarvis-sidecar/instructions.md` with discovery workflow ONLY
4. Add conditional logic: If flag=true, use filesystem; if false, use old loading
5. Test Jarvis with flag=true → Verify discovery works
6. Test Jarvis with flag=false → Verify old loading still works (rollback test)

**Phase 3B: Jarvis Validation Period (Days 3-4)**
7. Run Jarvis with filesystem discovery for 2 days
8. Execute 10+ research workflows with Jarvis
9. Monitor token usage (should be ~8-15k instead of 146k)
10. Track any errors or issues
11. **Go/No-Go decision**: If Jarvis stable, proceed to Phase 3C

**Phase 3C: Rollout to Zoe and Zoro (Days 5-6)**
12. Update `zoe-sidecar/instructions.md` with discovery workflow
13. Update `zoro-sidecar/instructions.md` with discovery workflow
14. Test Zoe and Zoro independently
15. Test multi-agent coordination (Jarvis → Zoe → Zoro)
16. Add examples: "When you need X tool, read .mcp-tools/_index.json"
17. Add troubleshooting: "If tool not found, list .mcp-tools/ directory"

**Acceptance Criteria**:
- ✅ Feature flag `ENABLE_MCP_FILESYSTEM_DISCOVERY` implemented
- ✅ Rollback tested (flag=false returns to old behavior)
- ✅ Jarvis piloted successfully for 2 days
- ✅ Each agent's instructions.md updated
- ✅ Tool discovery workflow documented
- ✅ Examples provided for common scenarios
- ✅ Agents automatically discover tools when activated
- ✅ Agents don't load tools unnecessarily

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Activate Jarvis with updated instructions → Execute research workflow → Verify exa/firecrawl discovery works
- Activate Zoe with updated instructions → Execute image generation → Verify nanobanana/gpt-image-1 discovery works
- Activate Zoro with updated instructions → Execute schedule-post → Verify postiz discovery works
- Test multi-agent coordination → Confirm handoffs (Jarvis → Zoe → Zoro) still function

**IV2: Integration Point Verification**
- Agent reads _index.json → Verify correct tool search behavior
- Agent lists .mcp-tools/ directory → Confirm proper server discovery
- Agent loads specific tool file → Validate JSDoc comprehension
- Test with non-existent tool request → Verify graceful error handling
- Verify agents only load 5-10 tools per session (not all 140+)

**IV3: Performance Impact Verification**
- Measure agent activation time with new instructions (target <200ms increase)
- Track filesystem read latency (registry + tool files, target <100ms total)
- Verify agent response time for first tool use (target <500ms)
- Confirm agents aren't repeatedly reading the same files (caching works)

**Estimated Time**: 2-3 days

---

### Story 4: Test & Validate Token Reduction

**User Story**:
As a product manager,
I want comprehensive testing across all agents,
so that I validate 90%+ token reduction without breaking workflows.

**Tasks**:
1. Run all existing workflows with filesystem discovery
2. Measure token usage per agent activation
3. Compare before/after token counts
4. Identify any workflow failures or issues
5. Document actual token reduction achieved
6. Create before/after comparison report

**Acceptance Criteria**:
- ✅ All workflows execute successfully
- ✅ Token reduction ≥90% (146k → <15k)
- ✅ Agent activation time <200ms slower
- ✅ No functional regressions
- ✅ Telemetry data captured and analyzed
- ✅ Success report published

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Execute all existing workflows (research, content creation, image gen, video gen, publishing) → Verify 100% success rate
- Test multi-agent workflows (Jarvis creates content → Zoe creates visuals → Zoro publishes) → Confirm end-to-end flow intact
- Run workflows that were NOT explicitly migrated → Verify they still work (backward compatibility)
- Test edge case workflows (error handling, retry logic, fallbacks) → Confirm robust operation

**IV2: Integration Point Verification**
- Monitor agent filesystem reads during workflow execution → Verify only needed tools loaded
- Compare tool loading pattern: old (140+ upfront) vs new (5-10 on-demand) → Validate progressive disclosure working
- Test _index.json search functionality → Confirm agents find correct tools
- Verify tool file reads → Validate JSDoc parsing and parameter extraction
- Check for any tools loaded but never used → Identify optimization opportunities

**IV3: Performance Impact Verification**
- Measure token usage per agent with `/context` command → Validate ≥90% reduction (146k → <15k)
- Compare agent activation time before/after → Ensure <200ms increase
- Measure workflow execution time → Confirm no regression (must be within 10% of baseline)
- Track filesystem I/O operations → Verify <100ms total latency for tool discovery
- Load test: Run 10 workflows consecutively → Confirm consistent performance

**Estimated Time**: 3-4 days

---

### Story 5: Update Documentation

**User Story**:
As a team member,
I want comprehensive documentation,
so that I understand the new system and can troubleshoot issues.

**Tasks**:
1. Update CLAUDE.md with "MCP Progressive Disclosure" section
2. Document filesystem discovery pattern
3. Add troubleshooting guide
4. Document generator script usage
5. Add migration examples
6. Update README with new architecture

**Acceptance Criteria**:
- ✅ CLAUDE.md updated with new patterns
- ✅ Architecture diagram included
- ✅ Generator script documented
- ✅ Troubleshooting guide complete
- ✅ Examples provided for common tasks
- ✅ Changelog updated

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Follow documentation as new user → Verify all examples work correctly
- Execute documented workflows → Confirm outputs match expectations
- Use troubleshooting guide for simulated issue → Verify resolution steps work

**IV2: Integration Point Verification**
- Cross-reference documentation with actual implementation → Verify no discrepancies
- Check code examples in docs → Validate they execute without errors
- Review architecture diagram → Confirm accuracy against codebase
- Test generator script instructions → Verify step-by-step accuracy

**IV3: Performance Impact Verification**
- N/A (documentation has no runtime impact)

**Estimated Time**: 2 days

---

### Story 6: Migrate Critical Workflows

**User Story**:
As a developer,
I want to migrate high-usage workflows to new pattern,
so that we get maximum benefit from progressive disclosure.

**Tasks**:
1. Identify top 10 most-used workflows
2. Update workflows to use filesystem discovery pattern
3. Test each migrated workflow
4. Document migration approach
5. Create migration template for remaining workflows
6. Update workflow documentation

**Acceptance Criteria**:
- ✅ Top 10 workflows migrated successfully
- ✅ All migrated workflows tested
- ✅ Migration template created
- ✅ Documentation updated
- ✅ No regressions in migrated workflows

**Integration Verification**:

**IV1: Existing Functionality Verification**
- Execute each migrated workflow → Verify identical outputs to pre-migration behavior
- Run non-migrated workflows alongside migrated ones → Confirm both patterns coexist
- Test workflows in production-like scenarios → Validate real-world usage
- Compare migrated workflow outputs to baseline → Ensure zero functional changes

**IV2: Integration Point Verification**
- Review migration template → Validate it covers all workflow patterns
- Apply template to sample workflow → Confirm migration process is repeatable
- Check for any hard-coded tool references → Verify all converted to discovery pattern
- Test workflows that call multiple tools → Confirm sequential discovery works
- Validate workflow YAML syntax unchanged → Only instructions.md changes

**IV3: Performance Impact Verification**
- Measure migrated workflow execution time → Confirm no regression (within 10% of baseline)
- Track tool loading during migrated workflows → Verify on-demand loading reduces tokens
- Compare token usage: old workflow vs migrated → Validate improvement
- Stress test: Run all 10 migrated workflows sequentially → Ensure consistent performance

**Estimated Time**: 4-5 days

---

## 6. Success Metrics

### Primary Success Criteria

**Token Reduction** (Most Important)
- Target: ≥90% reduction from baseline
- Measurement: Compare average tokens per agent activation
- Success: 146,500 → <15,000 tokens

**Functionality** (Must Maintain)
- Target: 100% of existing workflows still work
- Measurement: Run full workflow test suite
- Success: 0 regressions

**Performance** (Must Not Degrade)
- Target: Agent activation time increase <200ms
- Measurement: Compare startup latency before/after
- Success: Acceptable user experience

### Secondary Metrics

**Developer Experience**
- Generator script runs successfully
- Documentation rated ≥4/5 by team
- Migration time <1 hour per workflow

**Scalability**
- Can add 5 more MCP servers without context issues
- Tool discovery works with 200+ tools

### Monitoring Plan

**Pre-Implementation**:
- Baseline token measurements logged
- Current workflow success rate documented

**Post-Implementation**:
- Token usage logged per agent session
- Workflow success rate monitored daily
- Agent activation time tracked
- Tool discovery errors logged

**Success Dashboard**:
```
Metric                  | Baseline | Current | Target | Status
------------------------|----------|---------|--------|--------
Jarvis Token Usage      | 146.5k   | 8.2k    | <15k   | ✅
Zoe Token Usage         | 146.5k   | 12.1k   | <15k   | ✅
Zoro Token Usage        | 146.5k   | 6.8k    | <15k   | ✅
Workflow Success Rate   | 98%      | 98%     | ≥95%   | ✅
Avg Activation Time     | 450ms    | 520ms   | <650ms | ✅
```

---

## 7. Timeline & Resources

### Implementation Timeline

```
Week 1:    Story 1 (Baseline) + Story 2 (Generator) START
Week 2:    Story 2 COMPLETE + Story 3 (Agent Instructions) COMPLETE
Week 3:    Story 4 (Testing) COMPLETE + Story 5 (Documentation) START
Week 4:    Story 5 COMPLETE + Story 6 (Migration) START
Week 5:    Story 6 COMPLETE
Week 6:    Buffer / Final validation
```

**Total Duration**: 6 weeks
**Full-time equivalent**: 1 engineer

### Resource Requirements

**Engineering**:
- 1 senior engineer (full-time, 6 weeks)
- 0.2 FTE code review support
- 0.1 FTE QA support

**No Additional Resources Needed**:
- ❌ No security team (not executing code)
- ❌ No infrastructure changes
- ❌ No new dependencies
- ❌ No build process changes

**Cost Estimate**:
- Engineering time: 6 engineer-weeks
- External costs: $0
- Infrastructure: $0 (filesystem only)

### Milestones

| Date | Milestone | Deliverable |
|------|-----------|-------------|
| Week 1 | M1: Baseline Complete | Token measurements documented |
| Week 2 | M2: Generator Working | .mcp-tools/ directory generated |
| Week 3 | M3: Agents Updated | All 3 agents use filesystem discovery |
| Week 4 | M4: Validation Complete | 90%+ token reduction confirmed |
| Week 5 | M5: Migration Complete | Critical workflows migrated |
| Week 6 | M6: Production Ready | Documentation + monitoring active |

---

## 8. Risks & Mitigations

### Technical Risks

**Risk 1: Token reduction less than expected**
- **Likelihood**: Low (Anthropic validated 96-98%)
- **Impact**: Medium (still worthwhile if >70%)
- **Mitigation**: Measure baseline first (Story 1), adjust expectations if needed

**Risk 2: Filesystem reads add latency**
- **Likelihood**: Low (file I/O is fast)
- **Impact**: Low (a few ms per tool)
- **Mitigation**: Benchmark in Story 4, optimize if needed

**Risk 3: Agents don't understand discovery pattern**
- **Likelihood**: Medium (new behavior)
- **Impact**: Medium (agents load wrong tools)
- **Mitigation**: Clear instructions in Story 3, examples in documentation

### Implementation Risks

**Risk 4: Generator script bugs**
- **Likelihood**: Medium (first implementation)
- **Impact**: Low (caught in testing)
- **Mitigation**: Comprehensive testing, manual review of generated files

**Risk 5: Workflow regressions**
- **Likelihood**: Low (no breaking changes)
- **Impact**: High (production failures)
- **Mitigation**: Story 4 testing, gradual migration in Story 6

### Operational Risks

**Risk 6: Team unfamiliar with new pattern**
- **Likelihood**: High (new approach)
- **Impact**: Medium (confusion, mistakes)
- **Mitigation**: Story 5 documentation, migration examples

### Rollback Plan

**Instant Rollback (Recommended - Using Feature Flag)**:
1. Set `ENABLE_MCP_FILESYSTEM_DISCOVERY=false` in `.env`
2. Restart agents (if needed)
3. All agents immediately revert to loading 140+ tools upfront
4. **Estimated rollback time: 15 seconds** ⚡

**Full Rollback (If Feature Flag Fails)**:
1. Delete `.mcp-tools/` directory
2. Revert agent instruction updates via git
3. Remove feature flag from code
4. Agents load all tools upfront (original behavior)
5. Estimated rollback time: 15 minutes

**Rollback triggers**:
- Token reduction <50% (expected 90%+)
- Workflow failure rate >10% (expected 0%)
- Agent activation time >500ms increase (expected <200ms)
- Critical production incident related to tool discovery

**Rollback Testing**:
- Feature flag rollback tested in Story 3 Phase 3A
- Validates instant return to old behavior
- No data loss or corruption

---

## 9. Out of Scope (Future Enhancements)

### Not in This PRD

**Code Execution Sandbox** (98% vs 96% savings)
- Reason: 6+ months work for 2% additional gain
- Decision: Defer until filesystem discovery proven in production
- If needed: Create separate Epic 2 PRD after 3-6 months

**Agent-Specific Tool Filtering**
- Reason: Filesystem discovery achieves same goal more simply
- Not needed: Agents naturally load only what they need

**TypeScript Migration**
- Reason: JavaScript + JSDoc is simpler, no build complexity
- Not needed: Type information available via JSDoc

**Complex Backward Compatibility**
- Reason: Direct migration is simpler
- Approach: Update workflows incrementally over time

---

## 10. Appendix: Research References

### Primary Source
**Anthropic** (Nov 2024): "Code execution with MCP: Building more efficient agents"
- URL: https://www.anthropic.com/engineering/code-execution-with-mcp
- Key Finding: 98.7% token reduction using filesystem-based progressive disclosure

### Secondary Source
**Cloudflare** (Nov 2024): "Code Mode: the better way to use MCP"
- URL: https://blog.cloudflare.com/code-mode/
- Validation: Production implementation of filesystem pattern

### Community Resources
- MCP Specification: https://modelcontextprotocol.io
- MCP Community: https://modelcontextprotocol.io/community
- Example implementations: github.com/jx-codes/codemode-mcp

---

## Document Control

**Version History**:
- v1.0 (2025-11-05): Original PRD with 3 phases (14 stories, over-engineered)
- v2.0 (2025-11-05): Simplified - removed overengineering, focused on core value (6 stories)
- v2.1 (2025-11-05): Added Integration Verification (IV1, IV2, IV3) to all stories + Compatibility Requirements for brownfield safety
- **v2.2 (2025-11-05)**: Added 3 critical improvements:
  - ✅ Detailed token measurement methodology (Story 1)
  - ✅ Feature flag architecture for instant rollback (Section 4 + Story 3)
  - ✅ Pilot approach: Jarvis → Validate → Zoe/Zoro rollout (Story 3)

**Status**: Ready for Implementation
**Estimated Delivery**: 6 weeks from start
**Expected Value**: 96% token reduction, enabling 20+ MCP server scale

**Approval Required**:
- [ ] Technical Lead (architecture review)
- [ ] Product Manager (ROI validation)
- [ ] Engineering Manager (resource allocation)

---

**End of PRD**
