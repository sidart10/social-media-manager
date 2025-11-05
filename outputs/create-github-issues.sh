#!/bin/bash

# GitHub Issues Creation Script for MCP Progressive Disclosure Epic
# Generated: 2025-11-05
# Run after accepting Xcode license: sudo xcodebuild -license

set -e  # Exit on error

echo "Creating GitHub Issues for MCP Progressive Disclosure Epic..."
echo ""

# Create Milestone
echo "1. Creating milestone..."
gh api repos/:owner/:repo/milestones \
  --method POST \
  --field title="MCP Progressive Disclosure" \
  --field description="Reduce MCP tool token overhead from 146.5k to <6k tokens (96% reduction)" \
  --field due_on="2025-12-16T23:59:59Z" \
  || echo "Milestone may already exist, continuing..."

echo ""

# Create Epic Issue
echo "2. Creating Epic issue..."
EPIC_NUMBER=$(gh issue create \
  --title "[EPIC] MCP Progressive Disclosure System - 96% Token Reduction" \
  --label "epic,performance,enhancement,architecture" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
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

Will be linked after creation.

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
EOF
)" | grep -oE '[0-9]+$')

echo "Epic created: #$EPIC_NUMBER"
echo ""

# Create Story 1
echo "3. Creating Story 1: Measure Baseline..."
STORY1=$(gh issue create \
  --title "[Story 1.1] Measure Baseline Token Usage Across All Agents" \
  --label "story,measurement,analysis" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As a **product manager**,
I want **to measure actual current token usage**,
so that **we validate the problem and track improvement**.

## Tasks

- [ ] Activate each agent (/jarvis, /zoe, /zoro)
- [ ] Capture token count with all MCP tools loaded using `/context` command
- [ ] Save full context output to `outputs/baseline-context-{agent}.txt`
- [ ] Extract token count from "MCP Tools" section
- [ ] Document breakdown by server
- [ ] Identify top 20 most expensive tools
- [ ] Validate ~146.5k baseline or update PRD if differs >10%

## Acceptance Criteria

- ✅ Baseline documented in `outputs/baseline-token-measurement.md`
- ✅ Token count per agent measured and logged
- ✅ Methodology documented for future comparison

## Integration Verification

### IV1: Existing Functionality Verification
- Activate each agent → Confirm all menus display correctly
- Execute representative workflow from each agent → Verify normal operation
- Multi-agent handoff test (Jarvis → Zoe → Zoro) → Confirm coordination works

### IV2: Integration Point Verification
- Use `/context` command during each agent session → Capture exact token breakdown
- Validate MCP tools section shows all 140+ tools loaded
- Cross-check token count matches expected ~146.5k baseline

### IV3: Performance Impact Verification
- Measure agent activation time
- Measure workflow execution time for 3 representative workflows
- Document baseline performance

**Estimate**: 1 day

Part of Epic: #EPIC_NUMBER
EOF
)" | grep -oE '[0-9]+$')

echo "Story 1 created: #$STORY1"
echo ""

# Create Story 2
echo "4. Creating Story 2: Build Tool Generator..."
STORY2=$(gh issue create \
  --title "[Story 1.2] Build MCP Tool Wrapper Generator Script" \
  --label "story,tooling,codegen" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As a **developer**,
I want **an automated tool generator script**,
so that **I can create filesystem tool structure from .mcp.json**.

## Tasks

- [ ] Create `tools/generate-mcp-tools.js` script
- [ ] Parse `.mcp.json` and extract all MCP server configs
- [ ] For each tool, generate `.js` file with JSDoc
- [ ] Generate `_index.json` with tool mappings
- [ ] Add `npm run generate:mcp-tools` script
- [ ] Test generation with all 11 servers

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
- Execute workflows → Confirm existing MCP tool calls still work

### IV2: Integration Point Verification
- Inspect generated JavaScript files → Validate syntax
- Parse _index.json → Verify structure matches design
- Manual review sample tools → Validate JSDoc matches schema
- Check all 11 servers represented

### IV3: Performance Impact Verification
- Measure generator execution time (<30 seconds)
- Verify generated files <500KB total
- Confirm no runtime performance impact

**Estimate**: 3-4 days

Part of Epic: #EPIC_NUMBER
Depends on: #STORY1
EOF
)" | grep -oE '[0-9]+$')

echo "Story 2 created: #$STORY2"
echo ""

# Create Story 3
echo "5. Creating Story 3: Update Agent Instructions..."
STORY3=$(gh issue create \
  --title "[Story 1.3] Update Agent Instructions with Filesystem Discovery (Pilot)" \
  --label "story,agents,documentation,pilot" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As an **AI agent**,
I want **clear instructions on tool discovery**,
so that **I automatically use filesystem instead of upfront loading**.

## Implementation Strategy: Pilot with Jarvis → Validate → Rollout

### Phase 3A: Feature Flag & Jarvis Pilot (Days 1-2)
- [ ] Add `ENABLE_MCP_FILESYSTEM_DISCOVERY` to `.env.example`
- [ ] Update agent activation logic with feature flag check
- [ ] Update `jarvis-sidecar/instructions.md` ONLY
- [ ] Test Jarvis with flag=true and flag=false

### Phase 3B: Jarvis Validation (Days 3-4)
- [ ] Run Jarvis for 2 days with filesystem discovery
- [ ] Execute 10+ research workflows
- [ ] Monitor token usage (~8-15k expected)
- [ ] **Go/No-Go decision**

### Phase 3C: Rollout to Zoe/Zoro (Days 5-6)
- [ ] Update zoe-sidecar/instructions.md
- [ ] Update zoro-sidecar/instructions.md
- [ ] Test all agents independently
- [ ] Test multi-agent coordination

## Acceptance Criteria

- ✅ Feature flag implemented
- ✅ Rollback tested
- ✅ Jarvis piloted for 2 days
- ✅ All agent instructions updated
- ✅ Agents automatically discover tools

## Integration Verification

### IV1: Existing Functionality Verification
- Activate each agent → Execute workflows → Verify tool discovery works
- Test multi-agent coordination → Confirm handoffs function

### IV2: Integration Point Verification
- Agent reads _index.json → Verify search behavior
- Test invalid tool request → Verify error handling
- Verify agents load only 5-10 tools per session

### IV3: Performance Impact Verification
- Measure activation time (<200ms increase target)
- Track filesystem read latency (<100ms target)
- Verify response time for first tool use

**Estimate**: 2-3 days

Part of Epic: #EPIC_NUMBER
Depends on: #STORY2
EOF
)" | grep -oE '[0-9]+$')

echo "Story 3 created: #$STORY3"
echo ""

# Create Story 4
echo "6. Creating Story 4: Test & Validate..."
STORY4=$(gh issue create \
  --title "[Story 1.4] Comprehensive Testing & Token Reduction Validation" \
  --label "story,testing,validation,qa" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As a **product manager**,
I want **comprehensive testing across all agents**,
so that **I validate 90%+ token reduction without breaking workflows**.

## Tasks

- [ ] Run all existing workflows with filesystem discovery
- [ ] Measure token usage per agent activation
- [ ] Compare before/after token counts
- [ ] Identify any workflow failures
- [ ] Document actual token reduction achieved
- [ ] Create before/after comparison report

## Acceptance Criteria

- ✅ All workflows execute successfully
- ✅ Token reduction ≥90% (146k → <15k)
- ✅ Agent activation time <200ms slower
- ✅ No functional regressions
- ✅ Telemetry data captured and analyzed
- ✅ Success report published

## Integration Verification

### IV1: Existing Functionality Verification
- Execute ALL workflows → Verify 100% success rate
- Test multi-agent workflows → Confirm end-to-end flow
- Test edge cases → Confirm robust operation

### IV2: Integration Point Verification
- Monitor filesystem reads → Verify only needed tools loaded
- Compare old (140+) vs new (5-10) loading pattern
- Check for unused tool loads

### IV3: Performance Impact Verification
- Measure token usage via `/context` → Validate ≥90% reduction
- Compare activation time → Ensure <200ms increase
- Load test: 10 consecutive workflows

**Expected Results**:
- Jarvis: 146.5k → ~8k tokens (95%)
- Zoe: 146.5k → ~12k tokens (92%)
- Zoro: 146.5k → ~7k tokens (95%)

**Estimate**: 3-4 days

Part of Epic: #EPIC_NUMBER
Depends on: #STORY3
EOF
)" | grep -oE '[0-9]+$')

echo "Story 4 created: #$STORY4"
echo ""

# Create Story 5
echo "7. Creating Story 5: Update Documentation..."
STORY5=$(gh issue create \
  --title "[Story 1.5] Update Documentation for MCP Progressive Disclosure" \
  --label "story,documentation" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As a **team member**,
I want **comprehensive documentation**,
so that **I understand the new system and can troubleshoot issues**.

## Tasks

- [ ] Update CLAUDE.md with "MCP Progressive Disclosure" section
- [ ] Document filesystem discovery pattern
- [ ] Add troubleshooting guide
- [ ] Document generator script usage
- [ ] Add migration examples
- [ ] Update README with architecture

## Acceptance Criteria

- ✅ CLAUDE.md updated with new patterns
- ✅ Architecture diagram included
- ✅ Generator script documented
- ✅ Troubleshooting guide complete
- ✅ Examples provided
- ✅ Changelog updated

## Integration Verification

### IV1: Existing Functionality Verification
- Follow documentation as new user → Verify examples work
- Execute documented workflows → Confirm outputs match

### IV2: Integration Point Verification
- Cross-reference docs with implementation → Verify accuracy
- Check code examples → Validate they execute

### IV3: Performance Impact Verification
- N/A (documentation has no runtime impact)

**Estimate**: 2 days

Part of Epic: #EPIC_NUMBER
Depends on: #STORY4
EOF
)" | grep -oE '[0-9]+$')

echo "Story 5 created: #$STORY5"
echo ""

# Create Story 6
echo "8. Creating Story 6: Migrate Workflows..."
STORY6=$(gh issue create \
  --title "[Story 1.6] Migrate Top 10 Critical Workflows to Progressive Disclosure" \
  --label "story,migration,workflows" \
  --milestone "MCP Progressive Disclosure" \
  --body "$(cat <<'EOF'
## User Story

As a **developer**,
I want **to migrate high-usage workflows to new pattern**,
so that **we get maximum benefit from progressive disclosure**.

## Tasks

- [ ] Identify top 10 most-used workflows
- [ ] Create migration template
- [ ] Migrate Jarvis workflows (research, write, analyze)
- [ ] Migrate Zoe workflows (images, videos)
- [ ] Migrate Zoro workflows (schedule-post)
- [ ] Test each migrated workflow
- [ ] Document migration approach

## Acceptance Criteria

- ✅ Top 10 workflows migrated
- ✅ All tested successfully
- ✅ Migration template created
- ✅ Documentation updated
- ✅ No regressions

## Integration Verification

### IV1: Existing Functionality Verification
- Execute each migrated workflow → Verify identical outputs
- Run non-migrated alongside migrated → Confirm coexistence

### IV2: Integration Point Verification
- Review migration template → Validate repeatability
- Check for hard-coded tool references
- Validate YAML syntax unchanged

### IV3: Performance Impact Verification
- Measure execution time → Confirm no regression
- Track tool loading → Verify on-demand reduces tokens
- Stress test: Run all 10 sequentially

**Estimate**: 4-5 days

Part of Epic: #EPIC_NUMBER
Depends on: #STORY5
EOF
)" | grep -oE '[0-9]+$')

echo "Story 6 created: #$STORY6"
echo ""

# Update Epic with Story Links
echo "9. Updating Epic with story links..."
gh issue edit $EPIC_NUMBER --body "$(cat <<EOF
## Epic Goal

Reduce MCP tool context token overhead from 146.5k (14.7%) to <6k tokens (0.6%) through filesystem-based progressive tool discovery, enabling the system to scale to 20+ MCP servers without context constraints.

## Problem Statement

- ALL 140+ MCP tools loaded into EVERY agent at startup
- Consumes 146.5k tokens (14.7% of context) before any work begins
- Each agent only needs 15-45 tools but loads 140+
- Cannot add more MCP servers without context overflow

## Solution Approach

Implement **filesystem-based progressive tool discovery** following Anthropic's proven pattern:
- Agents discover tools by reading \`.mcp-tools/\` directory
- Load only needed tools on-demand (not all upfront)
- 96% token reduction (146k → 6k tokens)

## Research Foundation

**Anthropic** (Nov 2024): "Code execution with MCP: Building more efficient agents"
- Demonstrated 98.7% token reduction using this pattern
- Proven in production by Cloudflare

## Stories in This Epic

- [ ] #$STORY1 - Measure Baseline (1 day)
- [ ] #$STORY2 - Build Tool Generator (3-4 days)
- [ ] #$STORY3 - Update Agent Instructions (2-3 days)
- [ ] #$STORY4 - Test & Validate (3-4 days)
- [ ] #$STORY5 - Update Documentation (2 days)
- [ ] #$STORY6 - Migrate Workflows (4-5 days)

## Success Metrics

**Token Reduction**: 146,500 → <15,000 tokens (≥90% reduction)
**Functionality**: 100% of existing workflows still work (0 regressions)
**Performance**: Agent activation time increase <200ms

## Timeline

**Total Duration**: 6 weeks
**Estimated Delivery**: Week of 2025-12-16

## References

- PRD: \`docs/prd-mcp-progressive-disclosure-v2.md\`
- Anthropic Article: https://www.anthropic.com/engineering/code-execution-with-mcp
- Cloudflare Article: https://blog.cloudflare.com/code-mode/
EOF
)"

echo ""
echo "✅ All GitHub issues created successfully!"
echo ""
echo "Epic: #$EPIC_NUMBER"
echo "Stories: #$STORY1, #$STORY2, #$STORY3, #$STORY4, #$STORY5, #$STORY6"
echo ""
echo "View in browser: gh issue view $EPIC_NUMBER --web"
