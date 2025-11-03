# Next Steps

## Architect Prompt

You are receiving this PRD for the **AI-Powered Social Media Agent Team** system. This is NOT a greenfield project—it's a standardization and completion effort for an existing system with 3 agents (Jarvis, Zoe, Zoro), 24+ skills, and 20+ workflows already partially operational.

**Your Mission:**

1. **Review this PRD thoroughly**, especially:
   - Section 4 (Technical Assumptions) - Complete agent→workflow→skill→tool hierarchy
   - Epic details with mermaid diagrams showing actual implementation flows
   - Apify actor specifics, image model selection, video provider choices
   - Notion Content Tracker schema (docs/notion-content-dashboard.md)
   - Postiz integration architecture (docs/postiz-mcp.md)

2. **Start with Epic 1: Documentation & Architectural Foundation**
   - Create docs/ARCHITECTURE.md consolidating all architectural knowledge
   - Document complete system hierarchy with mermaid diagrams
   - Define handoff JSON schema (.bmad-core/schemas/handoff-package-v1.json)
   - Establish extensibility guidelines (when to create agent vs workflow vs skill)

3. **Critical Investigations Required:**
   - **Notion page creation strategy:** Should agents create new pages or only update existing? Bulk operations patterns?
   - **Error recovery patterns:** How to handle partial workflow failures? Resume mechanisms?
   - **Handoff package versioning:** Schema evolution strategy for backward compatibility?
   - **Tool abstraction boundaries:** Where does skill responsibility end and workflow begin?

4. **Validate Missing Workflows:**
   - Check if bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/ exists
   - Check if bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/ exists
   - If missing: Flag as new development (Stories 2.2 and 2.3 need implementation)

5. **Epic Sequencing Recommendation:**
   - Epic 1 (Documentation) → Epic 5 (Notion Integration) → Epics 2-4 (Features) → Epic 6 (Testing) → Epic 7 (Optimization)
   - Rationale: De-risk greenfield Notion work early, documentation enables all other work

**Key Context:**

- Target timeline: 10-15 days for MVP
- Budget: <$50/month for 30+ posts
- Platform: Claude Code (desktop IDE, not web app)
- Current state: 80% of features exist but need standardization
- Extensibility is core value: System must support organic growth beyond 3 current agents

**Documents to reference:**

- Project Brief: docs/brief.md
- This PRD: docs/prd.md
- Notion schema: docs/notion-content-dashboard.md
- Postiz integration: docs/postiz-mcp.md
- Existing workflows: bmad/agents/{agent}/{agent}-sidecar/workflows/
- Existing skills: .claude/skills/{agent}/{skill}/SKILL.md

Begin with Epic 1 (ARCHITECTURE.md creation) and work sequentially through epics, validating each before proceeding.

---

## Implementation Team Prompt

This PRD defines a modular, extensible AI-powered social media agent team built on Claude Code. You will be implementing 7 epics over 10-15 days, focusing on standardizing and completing existing capabilities rather than building from scratch.

**Implementation Approach:**

1. **Start with Epic 1 (Documentation)**
   - This provides the foundation for all other work
   - Create ARCHITECTURE.md as single source of truth
   - Define schemas, conventions, and patterns
   - Timeline: Days 1-2

2. **Proceed Sequentially Through Epics:**
   - Each epic builds on previous foundations
   - Validate completion before moving to next
   - Test with real content, track costs

3. **Key Success Metrics:**
   - 95% pipeline success rate (research → content → visuals → publish)
   - <$50/month cost for 30+ posts
   - Voice consistency ≥8/10 on all generated content
   - Zero platform-specific errors (validation catches everything)
   - 10-15 minute time per post (vs 75-135 min current)

4. **Testing Requirements:**
   - Daily: Run 1-2 end-to-end pipelines with real content
   - Weekly: Review cost data, validate tool selection
   - Per Epic: Validate acceptance criteria met before marking complete

**Critical Implementation Notes:**

- **Skills vs Workflows:** Skills = autonomous VMs (Claude Code feature), Workflows = your process orchestration (custom YAML+XML)
- **Tool Evolution:** Current Apify actors, image models, video providers documented as "best practice Oct 2025"—expect to optimize over time
- **Notion Coordination:** Agents update Content Tracker status as they work, enabling asynchronous collaboration
- **Flexible Routing:** Not rigid Jarvis→Zoe→Zoro pipeline, but dynamic (text-only skips Zoe, standalone visuals skip Jarvis)

**Quality Gates:**

- Research: ≥3 credible sources with reliability scores
- Content: Voice confidence ≥8/10 validated by voice-matcher skill
- Images: 7-pillar framework ≥7/10 required for publication
- Videos: Platform optimization checks (aspect ratio, duration, captions)
- Publishing: Rate limit compliance, character limits, media format validation

Begin with Epic 1 and work through sequentially. Report progress daily, flag blockers immediately.

---
