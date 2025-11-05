# MCP Progressive Disclosure System - Brownfield Enhancement PRD

**Version**: 0.1
**Created**: 2025-11-05
**Author**: sid + John (PM agent)
**Status**: Draft - Ready for Review
**Project**: social-media-manager

---

## Table of Contents

1. [Intro Project Analysis and Context](#1-intro-project-analysis-and-context)
2. [Requirements](#2-requirements)
3. [Technical Constraints and Integration Requirements](#3-technical-constraints-and-integration-requirements)
4. [Epic and Story Structure](#4-epic-and-story-structure)
5. [Epic 1: MCP Progressive Disclosure System](#5-epic-1-mcp-progressive-disclosure-system)
6. [Appendix: Research and References](#appendix-research-and-references)

---

## 1. Intro Project Analysis and Context

### 1.1 Existing Project Overview

#### Analysis Source
**IDE-based fresh analysis** - Project files available and analyzed in current session

#### Current Project State

The **social-media-manager** project is an **AI-powered social media management system** built on the BMad (Breakthrough Method of Agile AI-driven Development) framework. The system uses a **multi-agent architecture** with three specialized agents:

1. **Jarvis** (Content Intelligence) - Research, strategy, and content creation
2. **Zoe** (Visual Production) - Image and video generation across all formats
3. **Zoro** (Publishing & Distribution) - Multi-platform scheduling and publishing

The project integrates **7 MCP (Model Context Protocol) servers** to provide external capabilities:
- **Research**: exa (neural search), firecrawl (web scraping), apify (social platform scraping)
- **Content Generation**: nanobanana (Gemini images), gpt-image-1 (DALL-E 3), fal-video (22+ video models), heygen (avatars)
- **Publishing**: postiz (multi-platform scheduling), cloudinary (media hosting)
- **Infrastructure**: notion (knowledge base), chrome-devtools (browser automation)

**Current Architecture Pattern**: All agents have access to ALL MCP tools (140+ tools) loaded into context at startup, consuming **146.5k tokens (14.7% of 1M context window)** before any actual work begins.

The system currently operates in **production** with:
- Workflow-based task execution (YAML-driven)
- Skills system for specialized capabilities (24 skills across agents)
- Output management with 6-stage lifecycle (session → research → planning → drafts → assets → published)
- Integration with Notion for content tracking

---

### 1.2 Available Documentation Analysis

#### Analysis Source
**Document-project was NOT run** - Using IDE-based analysis of existing documentation

#### Available Documentation

**✅ Available:**
- **Tech Stack Documentation** - MCP servers documented in CLAUDE.md and .mcp.json
- **Source Tree/Architecture** - BMad framework structure, agent definitions, workflow system
- **API Documentation** - MCP tool descriptions in context (currently over-loaded)
- **External API Documentation** - Individual MCP server docs referenced
- **Technical Debt Documentation** - Context token waste identified and quantified

**⚠️ Partial/Missing:**
- **Coding Standards** - General patterns exist but no formal doc
- **UX/UI Guidelines** - N/A (CLI-based system)
- **Performance Benchmarks** - No baseline measurements for context usage or latency

#### Documentation Recommendation

✅ **Sufficient documentation exists to proceed with PRD.** The current system is well-documented in CLAUDE.md, agent definitions, and workflow structures. No need to run document-project task first.

---

### 1.3 Enhancement Scope Definition

#### Enhancement Type
☑️ **Performance/Scalability Improvements** (Primary)
☑️ **Technology Stack Upgrade** (Secondary - adopting progressive disclosure pattern)

#### Enhancement Description

Implement a **3-phase MCP Progressive Disclosure System** to dramatically reduce context token consumption by transitioning from "load all tools upfront" to "discover and load tools on-demand." This enhancement will reduce MCP tool token overhead from 146.5k tokens (14.7%) to as low as 2k tokens (0.2%), freeing up context for actual work and reducing latency.

#### Impact Assessment

☑️ **Significant Impact** (substantial existing code changes)

**Affected Systems:**
- Agent activation sequence (must filter tools per agent)
- MCP tool loading mechanism (from upfront to on-demand)
- Workflow execution patterns (tool discovery process)
- Skills that invoke MCP tools (import pattern changes)
- Documentation and developer experience (new patterns to learn)

---

### 1.4 Goals and Background Context

#### Goals

1. **Reduce context token waste by 70-98%** across all agents through progressive MCP tool disclosure
2. **Improve agent activation speed** by loading only relevant tools per agent
3. **Enable future scalability** to support 20+ MCP servers without context overflow
4. **Maintain backward compatibility** during phased rollout to avoid breaking existing workflows
5. **Establish best practices** for MCP integration aligned with Anthropic's recommendations

#### Background Context

As the social-media-manager system has grown, we've integrated 7 MCP servers with 140+ individual tools to provide research, content generation, and publishing capabilities. While this integration is powerful, it comes with a critical performance problem: **ALL tools are loaded into EVERY agent's context at startup**, consuming 146.5k tokens (14.7% of available context) before any work begins.

**Why This Problem Matters:**

1. **Token Waste**: Each agent only needs 15-45 tools but loads 140+ tools (80-120 unnecessary tools per agent)
2. **Context Scarcity**: With 1M context window, wasting 150k tokens reduces available space for actual work
3. **Latency Impact**: Loading 140+ tool definitions adds startup overhead to every agent activation
4. **Future Constraint**: Cannot add more MCP servers without exceeding context limits

**Why Now:**

Anthropic published "Code execution with MCP: Building more efficient agents" (Nov 2024) demonstrating **98.7% token reduction** using filesystem-based progressive disclosure. This validates the architectural approach and provides a proven pattern to follow. Additionally, Cloudflare's "Code Mode" implementation shows real-world production usage of this pattern.

**How This Fits the Existing Project:**

The BMad framework already uses progressive disclosure for **Skills** (3-tier loading: metadata → SKILL.md → resources). Extending this pattern to MCP tools is a natural evolution that aligns with the framework's philosophy of "just-in-time loading."

---

### 1.5 Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|---------|
| Initial PRD | 2025-11-05 | 0.1 | Created brownfield enhancement PRD for MCP Progressive Disclosure System | sid + John (PM agent) |

---

## 2. Requirements

### 2.1 Functional Requirements

**FR1**: The system SHALL implement agent-specific MCP server filtering via `mcp_servers_required` declaration in each agent's config.yaml file

**FR2**: The system SHALL load only MCP tools from servers declared in the active agent's config, reducing tool loading from 140+ to agent-specific subsets (Jarvis: ~20, Zoe: ~45, Zoro: ~15 tools)

**FR3**: The system SHALL generate a filesystem-based tool wrapper structure (`.mcp-tools/`) containing TypeScript interfaces for each MCP server's tools

**FR4**: The system SHALL provide a tool wrapper generator script that automatically creates TypeScript wrappers from .mcp.json configuration

**FR5**: The system SHALL implement progressive tool discovery where agents can list available tools via filesystem operations without loading all tool definitions

**FR6**: Each tool wrapper SHALL include TypeScript interfaces for input/output types and JSDoc documentation extracted from MCP schema

**FR7**: The system SHALL maintain a tool registry file (`.mcp-tools/_registry.json`) containing metadata for all available tools (name, server, description, token cost)

**FR8**: The system SHALL support on-demand tool loading where agents read specific tool files only when needed for a task

**FR9**: The system SHALL implement a code execution mode (Phase 3) that allows agents to write TypeScript code calling MCP tools via import statements

**FR10**: The code execution sandbox SHALL provide secure RPC bindings for MCP servers without exposing network access or API credentials

**FR11**: The system SHALL log all tool invocations (server, tool name, timestamp, agent) for debugging and cost tracking

**FR12**: The system SHALL provide migration tools to convert existing workflow tool calls to the new progressive disclosure pattern

---

### 2.2 Non-Functional Requirements

**NFR1**: The enhancement MUST reduce MCP tool token overhead by at least 70% in Phase 1 (146.5k → <45k tokens)

**NFR2**: Phase 2 implementation MUST achieve 96% total token reduction (146.5k → <6k tokens)

**NFR3**: Agent activation time MUST NOT increase by more than 200ms when using progressive tool discovery

**NFR4**: Tool wrapper generation MUST complete in under 30 seconds for all 7 MCP servers

**NFR5**: The code execution sandbox (Phase 3) MUST enforce timeout limits of 30 seconds per execution

**NFR6**: The code execution sandbox MUST enforce memory limits of 256MB per agent session

**NFR7**: All tool wrappers MUST include TypeScript type safety with full IDE autocomplete support

**NFR8**: The system MUST maintain 100% backward compatibility with existing workflows during Phase 1-2 rollout

**NFR9**: Documentation MUST be updated to reflect new patterns within 48 hours of each phase deployment

**NFR10**: Security audit MUST be completed before Phase 3 code execution mode goes to production

---

### 2.3 Compatibility Requirements

**CR1**: **Existing Agent API Compatibility** - All existing agent activation commands (/jarvis, /zoe, /zoro) MUST continue to work without modification

**CR2**: **Workflow Backward Compatibility** - All existing YAML workflow files MUST execute successfully without changes during Phase 1-2

**CR3**: **Output Structure Consistency** - The 6-stage output structure (00-session through 05-published) MUST remain unchanged

**CR4**: **MCP Server Integration** - All 7 existing MCP servers (exa, firecrawl, apify, postiz, cloudinary, nanobanana, gpt-image-1, fal-video, heygen) MUST continue to function with identical inputs/outputs

**CR5**: **Skills System Compatibility** - Existing skills that invoke MCP tools MUST continue to work during transition (with deprecation warnings for old pattern)

**CR6**: **Notion Integration** - Content tracking and status updates via Notion MCP MUST maintain current functionality

**CR7**: **Configuration File Format** - Existing config.yaml fields MUST NOT break; new fields MUST be additive only

---

## 3. Technical Constraints and Integration Requirements

### 3.1 Existing Technology Stack

**Languages**: JavaScript/Node.js (primary), TypeScript (planned for tool wrappers), Python (MCP servers: submagic, heygen), Shell scripts (utilities)

**Frameworks**:
- BMad v6.0.0-alpha.0 (agent orchestration framework)
- MCP SDK (Model Context Protocol client/server)
- Claude Code CLI (host environment)

**MCP Servers** (11 integrated):
- **exa** (v1.x) - Neural search API
- **firecrawl** (latest) - Web scraping
- **apify** (latest) - Social platform scraping (Instagram, TikTok, Twitter)
- **postiz** (custom) - Multi-platform scheduling
- **cloudinary-asset-mgmt** (latest) - Media hosting and transformation
- **nanobanana** (latest) - Gemini 2.5 Flash image generation
- **gpt-image-1** (latest) - DALL-E 3 image generation
- **fal-video** (latest) - 22+ video generation models
- **heygen** (latest) - Avatar video generation
- **notion** (latest) - Knowledge management
- **chrome-devtools** (latest) - Browser automation

**Infrastructure**:
- Local development (macOS Darwin 24.5.0)
- Node.js v20+
- Git version control (not yet initialized)

**External Dependencies**:
- Anthropic Claude API (Sonnet 4.5)
- MCP server APIs (11 total including those above)
- Cloudinary cloud storage

---

### 3.2 Integration Approach

#### Database Integration Strategy
- **Current**: No database; all data in filesystem (outputs/, .claude/, bmad/)
- **Enhancement Impact**: Add `.mcp-tools/` directory for tool wrappers, `_registry.json` for tool metadata
- **Migration**: None required (additive only)

#### API Integration Strategy
- **Current**: Direct MCP tool calls via Claude Code's MCP client
- **Phase 1**: Filter tools by agent using `mcp_servers_required` in config.yaml
- **Phase 2**: Wrap MCP calls in TypeScript interfaces loaded from `.mcp-tools/`
- **Phase 3**: Replace direct tool calls with code execution using `import` statements
- **Backward Compatibility**: Maintain existing tool call syntax during Phase 1-2; deprecate in Phase 3

#### Frontend Integration Strategy
- N/A (CLI-based system, no frontend)

#### Testing Integration Strategy
- **Current**: Manual testing of workflows
- **Enhancement**: Add automated tests for:
  - Tool wrapper generation (validate TypeScript syntax)
  - Agent tool filtering (verify correct subset loaded)
  - Backward compatibility (existing workflows still work)
  - Token counting (validate reduction targets met)

---

### 3.3 Code Organization and Standards

#### File Structure Approach

```
project-root/
├── .mcp-tools/                 # NEW: Generated tool wrappers
│   ├── _client.ts              # MCP RPC client
│   ├── _registry.json          # Tool metadata
│   ├── exa/
│   │   ├── index.ts
│   │   ├── search.ts
│   │   └── README.md
│   ├── postiz/
│   └── cloudinary/
├── tools/
│   └── mcp-wrapper-generator.js  # NEW: Codegen script
├── bmad/
│   ├── agents/
│   │   ├── content-intelligence/
│   │   │   └── config.yaml        # MODIFIED: Add mcp_servers_required
│   │   ├── zoe/
│   │   │   └── config.yaml        # MODIFIED: Add mcp_servers_required
│   │   └── zoro/
│   │       └── config.yaml        # MODIFIED: Add mcp_servers_required
├── .mcp.json                      # UNCHANGED: Server definitions
└── CLAUDE.md                      # MODIFIED: Document new patterns
```

#### Naming Conventions
- Tool wrapper files: kebab-case matching MCP tool names (`schedule-post.ts`)
- Generated interfaces: PascalCase with Input/Output suffix (`SchedulePostInput`, `SchedulePostOutput`)
- Registry keys: Full MCP tool name (`mcp__postiz__integrationSchedulePostTool`)

#### Coding Standards
- **TypeScript**: 2-space indentation, single quotes, semicolons required
- **JavaScript**: ESLint with existing project config
- **Documentation**: JSDoc comments on all exported functions
- **Error Handling**: Always wrap MCP calls in try-catch with meaningful errors

#### Documentation Standards
- Every tool wrapper MUST include JSDoc with description, parameters, return type
- README.md in each `.mcp-tools/{server}/` directory with usage examples
- CLAUDE.md updated with migration guide and best practices

---

### 3.4 Deployment and Operations

#### Build Process Integration
- **NEW**: Add `npm run generate:mcp-wrappers` script to regenerate tool wrappers from .mcp.json
- **Trigger**: Run manually after adding/removing MCP servers or updating configurations
- **Validation**: Run `npm run lint` and `npm run validate:schemas` after generation

#### Deployment Strategy
- **Phase 1**: Deploy to dev environment, test all 3 agents, deploy to main
- **Phase 2**: Deploy behind feature flag (`ENABLE_MCP_FILESYSTEM=true`), gradual rollout
- **Phase 3**: Requires security audit approval before any deployment

#### Monitoring and Logging
- **Existing**: Agent outputs logged to `outputs/projects/{project}/00-session/`
- **Enhancement**: Add tool invocation logging to track:
  - Which tools were loaded per agent session
  - Token counts before/after (validate savings)
  - Tool discovery latency (filesystem reads)
  - Code execution errors (Phase 3)

#### Configuration Management
- **Existing**: Config in `bmad/core/config.yaml`, agent-specific configs in `bmad/agents/{agent}/config.yaml`
- **New**: `mcp_servers_required: []` array in agent configs
- **Environment Variables**: No changes required (MCP server API keys remain in .mcp.json env sections)

---

### 3.5 Risk Assessment and Mitigation

#### Technical Risks

**Risk**: Tool wrapper generation script fails or produces invalid TypeScript
- **Mitigation**: Validate generated code with TypeScript compiler, add tests for all MCP servers

**Risk**: Progressive loading adds latency that negates token savings
- **Mitigation**: Benchmark filesystem read times, cache registry in memory, set 200ms SLA

**Risk**: Code execution sandbox (Phase 3) has security vulnerabilities
- **Mitigation**: Mandatory security audit, follow Cloudflare's V8 isolate pattern, no network access

#### Integration Risks

**Risk**: Existing workflows break during migration to new tool loading pattern
- **Mitigation**: 100% backward compatibility in Phase 1-2, comprehensive regression testing

**Risk**: MCP SDK updates break generated tool wrappers
- **Mitigation**: Pin MCP SDK versions, version wrapper generator, document update process

**Risk**: Agent prompts don't adapt to import-based tool usage (Phase 3)
- **Mitigation**: Pilot with Jarvis agent only, validate before rolling to Zoe/Zoro

#### Deployment Risks

**Risk**: Tool wrapper generator not run after adding new MCP server
- **Mitigation**: Add pre-commit hook to check if .mcp.json changed and wrappers regenerated

**Risk**: Token savings don't materialize due to unforeseen context overhead
- **Mitigation**: Implement telemetry in Phase 1 to measure actual token reduction, adjust strategy if needed

#### Mitigation Strategies

1. **Phased Rollout**: Validate each phase before proceeding (fail-fast approach)
2. **Feature Flags**: Allow disabling new patterns if issues arise
3. **Comprehensive Testing**: Unit tests for generator, integration tests for agents, E2E tests for workflows
4. **Documentation First**: Update CLAUDE.md before each phase to guide developers
5. **Rollback Plan**: Keep old tool loading logic for 2 releases to enable quick rollback

---

## 4. Epic and Story Structure

### 4.1 Epic Approach

**Epic Structure Decision**: **Single Epic with 3 Sequential Phases**

**Rationale**:

This enhancement should be structured as a **single comprehensive epic** because:

1. **Unified Goal**: All phases serve one objective - reduce MCP tool context overhead through progressive disclosure
2. **Sequential Dependencies**: Phase 2 builds on Phase 1, Phase 3 builds on Phase 2 - these are not independent features
3. **Single System Component**: All changes affect the MCP tool loading mechanism, not separate system areas
4. **Coherent Migration**: Moving from "load all tools" → "filter by agent" → "filesystem discovery" → "code execution" is one logical transformation
5. **Brownfield Best Practice**: Per template guidance, favor single epic unless clearly unrelated features

**Alternative Considered & Rejected**: Three separate epics (one per phase) would create:
- Artificial boundaries between tightly-coupled work
- Overhead of multiple epic planning sessions
- Risk of losing momentum between epics
- Confusion about which epic "owns" the MCP tool system

**Integration with Existing System**: This epic integrates at the **agent activation layer** - the point where agents connect to MCP servers and load tool definitions. Changes ripple through:
- Agent config files (add `mcp_servers_required`)
- Tool invocation in workflows (shift to import pattern)
- Skills that use MCP tools (update to new APIs)
- Documentation (CLAUDE.md, README.md)

---

## 5. Epic 1: MCP Progressive Disclosure System

**Epic Goal**: Reduce MCP tool context token overhead from 146.5k (14.7%) to <6k tokens (0.6%) through agent-specific filtering, filesystem-based tool discovery, and optional code execution mode, enabling the system to scale to 20+ MCP servers without context constraints.

**Integration Requirements**:
- Maintain 100% backward compatibility with existing workflows during Phase 1-2
- Preserve all agent APIs (/jarvis, /zoe, /zoro activation)
- Keep output structure unchanged (6-stage lifecycle)
- Ensure all 11 MCP servers continue functioning identically

---

### Story Sequencing Strategy

**Critical Sequencing Principles for Brownfield:**

1. **Non-Breaking Changes First**: Start with additive changes (config fields, tool wrappers) before modifying behavior
2. **Measure Before Optimize**: Implement telemetry to validate token savings at each phase
3. **Agent-by-Agent Rollout**: Test with Jarvis (smallest tool set) before Zoe/Zoro (larger tool sets)
4. **Rollback Safety**: Each story must leave system in working state; no "half-implemented" features
5. **Documentation in Lockstep**: Update docs immediately after each story (not batched at end)

**Phase Boundaries**:
- **Phase 1** (Stories 1.1-1.4): Agent filtering - low risk, immediate 70% savings
- **Phase 2** (Stories 1.5-1.10): Filesystem discovery - moderate risk, 96% total savings
- **Phase 3** (Stories 1.11-1.14): Code execution - high risk, 98%+ savings (OPTIONAL for v1.0)

---

### 5.1 Phase 1: Agent-Specific Tool Filtering (Stories 1.1-1.4)

---

#### Story 1.1: Implement Agent-Specific MCP Server Filtering

**User Story**:
As a **system architect**,
I want **agents to load only MCP servers declared in their config**,
so that **each agent's context contains only relevant tools, reducing token waste by 70%**.

**Acceptance Criteria**

1. Each agent config.yaml supports optional `mcp_servers_required: []` array field
2. Agent activation logic reads this field and filters MCP tool definitions accordingly
3. If field absent, agent loads ALL tools (backward compatible)
4. Jarvis config declares: `[exa, firecrawl, apify, notion]` (~20 tools)
5. Zoe config declares: `[nanobanana, gpt-image-1, fal-video, heygen, cloudinary]` (~45 tools)
6. Zoro config declares: `[postiz, cloudinary, notion]` (~15 tools)
7. Token telemetry logs before/after counts to validate 70% reduction
8. All existing workflows execute successfully without modification

**Integration Verification**

**IV1: Existing Functionality Verification**
- Run `/jarvis` → Execute `*research-topic` workflow → Confirm exa/firecrawl tools work
- Run `/zoe` → Execute `*create-single-image` workflow → Confirm nanobanana/gpt-image-1 tools work
- Run `/zoro` → Execute `*schedule-post` workflow → Confirm postiz tools work

**IV2: Integration Point Verification**
- Activate each agent → Use `/context` command → Verify only declared servers' tools loaded
- Check agent activation logs → Confirm `mcp_servers_required` field read from config
- Verify no errors in agent startup with new field present

**IV3: Performance Impact Verification**
- Measure agent activation time before/after (must be <200ms increase)
- Compare token counts: Baseline 146.5k → Target <50k per agent
- Verify workflow execution time unchanged (no regression)

---

#### Story 1.2: Create MCP Tool Wrapper Generator

**User Story**:
As a **developer**,
I want **an automated script that generates TypeScript wrappers from .mcp.json**,
so that **I can create filesystem-based tool discovery without manual coding of 140+ tools**.

**Acceptance Criteria**

1. Script `tools/mcp-wrapper-generator.js` exists and runs via `npm run generate:mcp-wrappers`
2. Script reads `.mcp.json` and generates `.mcp-tools/` directory structure
3. Each MCP server gets a subdirectory (e.g., `.mcp-tools/exa/`)
4. Each tool gets a TypeScript file with input/output interfaces and JSDoc
5. Generated code passes `npm run lint` and TypeScript compilation
6. Script generates `_registry.json` with tool metadata (name, server, description, estimated tokens)
7. Script is idempotent (running twice produces identical output)
8. README.md created in each server directory with usage examples

**Integration Verification**

**IV1: Existing Functionality Verification**
- Run generator → Verify no impact on existing agent activation
- Execute workflows → Confirm existing MCP tool calls still work (wrappers not used yet)

**IV2: Integration Point Verification**
- Inspect generated TypeScript → Validate interfaces match MCP schemas
- Test import of generated file → Confirm TypeScript types resolve correctly
- Check registry.json → Verify all 140+ tools listed with correct metadata

**IV3: Performance Impact Verification**
- Measure generator execution time (must be <30 seconds)
- Verify generated files totaling <500KB (fast Git operations)
- Confirm no runtime performance impact (wrappers not loaded yet)

---

#### Story 1.3: Implement Telemetry for Token Tracking

**User Story**:
As a **product manager**,
I want **detailed telemetry logging token counts per agent activation**,
so that **I can validate the 70-98% token reduction targets are achieved**.

**Acceptance Criteria**

1. Telemetry logs created in `outputs/projects/{project}/00-session/telemetry.json`
2. Log includes: agent name, MCP servers loaded, tool count, tokens consumed, timestamp
3. Baseline measurements captured before Phase 1 implementation
4. Comparison dashboard showing before/after for each agent
5. Token counting methodology documented in CLAUDE.md
6. Telemetry non-intrusive (no workflow changes required)
7. Data retained for 30 days for trend analysis

**Integration Verification**

**IV1: Existing Functionality Verification**
- Run agents with telemetry enabled → Confirm no workflow breakage
- Execute multi-agent session (Jarvis → Zoe → Zoro) → Verify all telemetry captured

**IV2: Integration Point Verification**
- Check telemetry.json format → Validate JSON schema
- Compare manual `/context` count vs. telemetry → Verify accuracy within 2%

**IV3: Performance Impact Verification**
- Measure logging overhead (must be <10ms per agent activation)
- Verify telemetry file size remains <100KB per project

---

#### Story 1.4: Update Documentation for Phase 1

**User Story**:
As a **developer or user**,
I want **comprehensive documentation on agent-specific tool filtering**,
so that **I understand how to configure agents and troubleshoot issues**.

**Acceptance Criteria**

1. CLAUDE.md updated with "MCP Progressive Disclosure" section
2. Documentation includes: architecture diagram, config syntax, migration guide
3. Example config snippets for all 3 agents (Jarvis, Zoe, Zoro)
4. Troubleshooting guide for common issues (tool not found, config syntax errors)
5. Token savings table showing before/after for each agent
6. Changelog updated with Phase 1 completion date and version
7. README.md in project root links to new documentation section

**Integration Verification**

**IV1: Existing Functionality Verification**
- Follow documentation as new user → Verify all examples work correctly
- Execute documented workflows → Confirm outputs match expectations

**IV2: Integration Point Verification**
- Cross-reference docs with actual implementation → Verify no discrepancies
- Test troubleshooting steps → Confirm they resolve listed issues

**IV3: Performance Impact Verification**
- N/A (documentation has no runtime impact)

---

### 5.2 Phase 2: Filesystem-Based Tool Discovery (Stories 1.5-1.10)

---

#### Story 1.5: Implement Filesystem-Based Tool Discovery

**User Story**:
As an **AI agent**,
I want **to discover available MCP tools by reading the filesystem**,
so that **I only load tool definitions when I need them, reducing context tokens by 96%**.

**Acceptance Criteria**

1. Agents can list `.mcp-tools/` directory to see available servers
2. Agents can read `_registry.json` to search tools by keyword without loading definitions
3. Agents can load specific tool files on-demand (e.g., `Read .mcp-tools/exa/search.ts`)
4. Tool discovery documented in agent instructions (jarvis-sidecar/instructions.md, etc.)
5. Fallback mechanism: if filesystem read fails, load tools upfront (graceful degradation)
6. Token count reduced to <6k for typical agent session (96% from baseline)
7. Filesystem reads complete in <50ms for registry, <10ms per tool file

**Integration Verification**

**IV1: Existing Functionality Verification**
- Execute research workflow → Agent discovers and loads exa tools on-demand
- Execute image generation workflow → Agent discovers and loads nanobanana tools on-demand
- Execute publishing workflow → Agent discovers and loads postiz tools on-demand

**IV2: Integration Point Verification**
- Monitor filesystem reads during agent activation → Verify only registry loaded initially
- Track tool loading → Confirm tools loaded lazily when workflows request them
- Test with invalid tool name → Verify graceful error handling

**IV3: Performance Impact Verification**
- Measure time-to-first-tool-load (baseline + <100ms acceptable)
- Verify total token count <6k per agent with filesystem discovery
- Benchmark 10 sequential tool loads → Ensure <500ms total latency

---

#### Story 1.6: Migrate Skills to Use Tool Wrappers

**User Story**:
As a **skill developer**,
I want **skills to import TypeScript tool wrappers instead of raw MCP calls**,
so that **skills benefit from type safety and progressive disclosure**.

**Acceptance Criteria**

1. Update content-writer skill to use `import * as exa from '.mcp-tools/exa'` pattern
2. Update deep-web-research skill for exa, firecrawl, apify imports
3. Update universal-image-generation skill for nanobanana, gpt-image-1 imports
4. Update video-generation skill for fal-video imports
5. All 24 skills reviewed and migrated where applicable
6. Deprecation warnings added for old direct MCP call pattern
7. Skills documentation updated with new import examples

**Integration Verification**

**IV1: Existing Functionality Verification**
- Run Jarvis research workflow using migrated skills → Verify identical outputs
- Run Zoe image generation using migrated skills → Verify identical outputs
- Run all skill-based workflows → Confirm no regressions

**IV2: Integration Point Verification**
- Check skill files → Verify import statements present and correct
- Test TypeScript autocomplete in IDE → Confirm type hints work for tool calls
- Validate no raw MCP tool calls remain in migrated skills

**IV3: Performance Impact Verification**
- Measure skill execution time before/after migration (no regression >5%)
- Verify token counts for skill invocations reduced due to on-demand loading

---

#### Story 1.7: Update Agent Prompts for Tool Discovery

**User Story**:
As an **AI agent**,
I want **clear instructions on how to discover and use tools from the filesystem**,
so that **I automatically use progressive disclosure without user intervention**.

**Acceptance Criteria**

1. Each agent's instructions.md includes tool discovery workflow
2. Instructions explain: list directory → read registry → load specific tool
3. Example tool discovery scenarios provided (research task, image generation, posting)
4. Error handling documented (tool not found, filesystem read failure)
5. Agents prefer filesystem discovery over upfront loading in all new workflows
6. Backward compatibility maintained for workflows using old pattern
7. Instructions tested with real agent activations to verify comprehension

**Integration Verification**

**IV1: Existing Functionality Verification**
- Activate agents with updated prompts → Verify they automatically discover tools
- Run workflows without explicit tool loading → Confirm agents find tools independently

**IV2: Integration Point Verification**
- Test agent understanding: Ask "What tools are available?" → Verify correct listing
- Test agent adaptation: Give unfamiliar task → Verify agent searches registry for relevant tools

**IV3: Performance Impact Verification**
- Measure agent response time with new prompts (no regression >10%)
- Verify token counts remain within Phase 2 targets (<6k)

---

#### Story 1.8: Implement Backward Compatibility Layer

**User Story**:
As a **system maintainer**,
I want **existing workflows to work with both old and new tool loading patterns**,
so that **we can migrate gradually without breaking production workflows**.

**Acceptance Criteria**

1. Workflows using direct MCP tool calls continue to work unchanged
2. Workflows using import-based tool wrappers work with new system
3. Compatibility layer detects tool call pattern and routes appropriately
4. Deprecation warnings logged when old pattern detected (non-blocking)
5. Migration guide provided showing old → new pattern conversion
6. All existing workflows tested and confirmed working
7. Compatibility layer can be disabled via config flag (for testing pure new pattern)

**Integration Verification**

**IV1: Existing Functionality Verification**
- Execute all 15+ existing workflows → Verify 100% success rate
- Test mixed pattern (one workflow old, one new) → Confirm both work in same session

**IV2: Integration Point Verification**
- Check compatibility layer routing logic → Verify correct detection of patterns
- Test edge cases (malformed tool calls, missing wrappers) → Confirm graceful errors

**IV3: Performance Impact Verification**
- Measure compatibility layer overhead (<20ms per tool call)
- Verify old pattern performance unchanged (no regression)

---

#### Story 1.9: Test Phase 2 with All Agents

**User Story**:
As a **QA engineer**,
I want **comprehensive end-to-end testing across all agents and workflows**,
so that **I can validate Phase 2 achieves 96% token reduction without breaking functionality**.

**Acceptance Criteria**

1. Test suite covering all 3 agents (Jarvis, Zoe, Zoro) completed
2. All workflow types tested: research, content creation, image generation, video generation, publishing
3. Multi-agent workflows tested (Jarvis → Zoe → Zoro handoffs)
4. Performance benchmarks meet targets (tokens <6k, latency <200ms added)
5. Error scenarios tested (missing tool, filesystem failure, network timeout)
6. Token reduction validated: 146.5k → <6k (96%+)
7. Production-readiness checklist completed

**Integration Verification**

**IV1: Existing Functionality Verification**
- Execute 50+ workflow combinations → Verify all outputs match pre-Phase 2 baselines
- Compare telemetry before/after → Confirm no functional regressions

**IV2: Integration Point Verification**
- Stress test filesystem discovery (100 tool loads in 1 session) → Verify stability
- Test concurrent agent activations → Confirm no race conditions or file locks

**IV3: Performance Impact Verification**
- Validate token reduction: Jarvis (146k→15k), Zoe (146k→50k), Zoro (146k→18k)
- Measure end-to-end workflow time → Confirm <10% latency increase

---

#### Story 1.10: Document Phase 2 Completion

**User Story**:
As a **team member**,
I want **comprehensive Phase 2 documentation including migration guides and lessons learned**,
so that **future developers understand the system and can build on this work**.

**Acceptance Criteria**

1. CLAUDE.md updated with Phase 2 architecture and filesystem discovery patterns
2. Migration guide created showing how to convert workflows to new pattern
3. Troubleshooting section added for common Phase 2 issues
4. Performance metrics published (token savings, latency impact)
5. Lessons learned documented (what worked, what didn't, what to avoid)
6. Changelog updated with Phase 2 completion
7. Team knowledge sharing session conducted (if applicable)

**Integration Verification**

**IV1: Existing Functionality Verification**
- Follow migration guide as if new developer → Verify all steps work
- Execute migrated workflows → Confirm outputs match expectations

**IV2: Integration Point Verification**
- Cross-reference docs with codebase → Verify accuracy
- Test troubleshooting steps → Confirm they resolve issues

**IV3: Performance Impact Verification**
- N/A (documentation only)

---

### 5.3 Phase 3: Code Execution Mode (Stories 1.11-1.14) - OPTIONAL

**Note**: Phase 3 is OPTIONAL and can be deferred to v2.0 if Phase 2 delivers sufficient value (96% token reduction). This phase introduces code execution complexity and security considerations.

---

#### Story 1.11: Design Code Execution Sandbox

**User Story**:
As a **security engineer**,
I want **a secure code execution environment for agent-generated TypeScript**,
so that **agents can write code to call MCP tools without security risks**.

**Acceptance Criteria**

1. Sandbox design document created specifying V8 isolate or equivalent
2. Security requirements defined: no network access, no filesystem write, API key isolation
3. Resource limits documented: 30s timeout, 256MB memory, CPU throttling
4. RPC binding architecture designed for MCP server access
5. Threat model completed identifying risks and mitigations
6. Security audit scheduled with external reviewer
7. Implementation plan with timeline (3-4 weeks estimated)

**Integration Verification**

**IV1: Existing Functionality Verification**
- Design review → Confirm sandbox won't impact existing tool loading patterns
- Prototype validation → Test basic code execution without MCP calls

**IV2: Integration Point Verification**
- Security review → Verify isolation guarantees
- RPC binding test → Confirm MCP tools accessible via bindings only

**IV3: Performance Impact Verification**
- Benchmark sandbox startup time (target <100ms)
- Measure code execution overhead vs. direct tool calls

---

#### Story 1.12: Implement Code Execution Engine

**User Story**:
As an **AI agent**,
I want **to write TypeScript code that calls MCP tools via imports**,
so that **I can compose complex workflows with 98% token efficiency**.

**Acceptance Criteria**

1. Code execution engine implemented using V8 isolates or equivalent
2. Single tool `execute_mcp_code` replaces 140+ individual tool definitions
3. Agents can write TypeScript code using `import * as exa from '.mcp-tools/exa'` pattern
4. Generated code executed in secure sandbox with no network access
5. RPC bindings provide access to MCP servers without exposing credentials
6. Results filtered in code before returning to agent context
7. Token count reduced to <2k per agent session (98%+ from baseline)

**Integration Verification**

**IV1: Existing Functionality Verification**
- Execute research workflow via code → Verify identical results to direct tool calls
- Test data filtering in code → Confirm only relevant results returned to context

**IV2: Integration Point Verification**
- Validate sandbox isolation → Confirm no network access possible
- Test RPC binding security → Verify API keys never exposed to generated code

**IV3: Performance Impact Verification**
- Measure code execution latency vs. direct tool calls (<200ms acceptable overhead)
- Validate token reduction: 146k → <2k (98.6%+)

---

#### Story 1.13: Update Agents for Code Generation

**User Story**:
As a **developer**,
I want **agent prompts updated to generate executable code**,
so that **agents automatically leverage code execution mode**.

**Acceptance Criteria**

1. Agent instructions.md updated with code generation patterns and examples
2. Agents instructed to write TypeScript code instead of direct tool calls
3. Example workflows converted to code-based pattern
4. Error handling for code execution failures documented
5. Rollback mechanism to Phase 2 pattern if code execution unavailable
6. Pilot tested with Jarvis agent before rolling to Zoe/Zoro
7. Performance validated (token savings, latency acceptable)

**Integration Verification**

**IV1: Existing Functionality Verification**
- Activate Jarvis with code generation prompts → Verify automatic code writing
- Execute workflows → Confirm outputs identical to Phase 2 pattern

**IV2: Integration Point Verification**
- Review generated code → Validate correct TypeScript syntax
- Test code execution → Confirm proper MCP tool invocation via imports

**IV3: Performance Impact Verification**
- Measure agent response time with code generation (no regression >10%)
- Validate token counts <2k per session

---

#### Story 1.14: Security Audit and Production Deployment

**User Story**:
As a **security engineer**,
I want **comprehensive security audit of code execution mode**,
so that **we can deploy to production with confidence**.

**Acceptance Criteria**

1. External security audit completed with no critical findings
2. Penetration testing performed on sandbox isolation
3. All identified vulnerabilities remediated
4. Security documentation published (threat model, mitigations, incident response)
5. Production deployment plan approved
6. Monitoring and alerting configured for code execution anomalies
7. Rollback plan tested and validated

**Integration Verification**

**IV1: Existing Functionality Verification**
- Deploy to production → Monitor for errors or security incidents
- Execute full workflow suite → Verify all functionality intact

**IV2: Integration Point Verification**
- Security monitoring active → Confirm alerting works for suspicious activity
- Audit logs captured → Verify all code execution tracked

**IV3: Performance Impact Verification**
- Validate production performance meets targets (tokens <2k, latency acceptable)
- Monitor resource utilization (memory, CPU within limits)

---

## 6. Token Savings Summary

### Projected Token Reduction by Phase

| Phase | Implementation | Tokens Loaded | % Reduction from Baseline | Cumulative % Reduction |
|-------|---------------|---------------|---------------------------|------------------------|
| **Baseline** | Current state | 146,500 tokens | 0% | 0% |
| **Phase 1** | Agent filtering | 45,000 tokens | 69% | 69% |
| **Phase 2** | Filesystem discovery | 6,000 tokens | 87% from Phase 1 | 96% from baseline |
| **Phase 3** | Code execution | 2,000 tokens | 67% from Phase 2 | **98.6% from baseline** |

### Agent-Specific Token Savings (Phase 2 Target)

| Agent | Baseline Tokens | Phase 2 Tokens | Tools Loaded | Reduction |
|-------|----------------|----------------|--------------|-----------|
| **Jarvis** | 146,500 | ~15,000 | 20 tools (exa, firecrawl, apify, notion) | 90% |
| **Zoe** | 146,500 | ~50,000 | 45 tools (nanobanana, gpt-image-1, fal-video, heygen, cloudinary) | 66% |
| **Zoro** | 146,500 | ~18,000 | 15 tools (postiz, cloudinary, notion) | 88% |

---

## Appendix: Research and References

### Key Research Sources

1. **Anthropic** (Nov 2024): "Code execution with MCP: Building more efficient agents"
   - URL: https://www.anthropic.com/engineering/code-execution-with-mcp
   - Key Finding: 98.7% token reduction (150k → 2k tokens) using filesystem-based progressive disclosure

2. **Cloudflare** (Nov 2024): "Code Mode: the better way to use MCP"
   - URL: https://blog.cloudflare.com/code-mode/
   - Key Finding: V8 isolate-based sandbox with RPC bindings, production-proven pattern

3. **Model Context Protocol Specification** (2025-06-18)
   - URL: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
   - Key Reference: Official MCP tool schema definitions

### Implementation Examples

- **jx-codes/codemode-mcp**: Open-source Code Mode implementation
  - URL: https://github.com/jx-codes/codemode-mcp

- **MaximeRivest/mcp2py**: MCP server to Python module converter
  - URL: https://github.com/MaximeRivest/mcp2py
  - Demonstrates filesystem-based tool wrapping pattern

### Community Resources

- MCP Community Discussion: https://modelcontextprotocol.io/community/communication
- MCP Server Directory: https://mcprepository.com, https://mcpservers.org
- MCP Security Best Practices: https://www.prompthub.us/blog/mcp-security-in-2025

---

## Document Control

**Last Updated**: 2025-11-05
**Version**: 0.1 (Draft)
**Next Review**: After Phase 1 implementation
**Owner**: sid
**Approvers**: TBD

**Change History**:
- 2025-11-05: Initial PRD creation (v0.1)

---

**End of Document**
