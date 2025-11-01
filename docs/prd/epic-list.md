# Epic List

The following epics represent the major product capabilities for the AI-Powered Social Media Agent Team. These epics are **strategically sequenced** to de-risk greenfield work early (Notion integration), establish documentation foundation first, enable parallel development where possible, and defer optimization until core features stable.

**Note:** The current system already has partial implementations of most epics. The MVP work focuses on standardizing, completing, and optimizing these capabilities.

**Sequencing Rationale:**
1. **Foundation first** (Epic 1: Documentation) - Enables all other work, low-risk
2. **De-risk greenfield early** (Epic 2: Notion) - Highest uncertainty, provides coordination layer for Epics 3-6
3. **Parallelize features** (Epics 3-6) - Voice, Visual, Publishing, Intelligence can develop simultaneously using Notion coordination
4. **Test when ready** (Epic 7: Pipeline Testing) - After features complete and Notion integrated
5. **Optimize last** (Epic 8: Workflow Migration) - Polish after core system stable

---

**Epic 1: System Foundation & Documentation**

**Goal:** Establish comprehensive documentation (ARCHITECTURE.md), create tool and workflow registries for transparency, and implement standardized output management system with project-centric organization—providing the foundation that enables all subsequent development.

**Value:** Single source of truth prevents knowledge fragmentation, registries enable discovery and optimization, output structure eliminates organizational chaos. Without this foundation, system becomes unmaintainable as complexity grows.

**Stories:** 7.3 (ARCHITECTURE.md), 7.4 (Tool Registry), 7.5 (Workflow Registry), 7.6 (Output Management)

**Current State:** ✅ **100% COMPLETE** - ARCHITECTURE.md v1.2 created and aligned, tool-registry.yaml (fal-video, Cloudinary, 13+ tools), workflow-registry.yaml (10 workflows), output management system (6-stage template with platform subfolders)

**Completed:** 2 days (matched 2-3 day estimate)

---

**Epic 2: Notion Integration & Status-Driven Collaboration** ⚡ **COMPLETE** (Stories 5.1-5.3)

**Goal:** Integrate Notion Content Tracker as collaborative workspace enabling status-driven agent coordination (Idea → Research → Writing → Editing → Posted). Agents become Notion-aware: checking status before suggesting workflows, updating status as work completes, maintaining relational integrity (Keywords, Channels, Tasks).

**Value:** Provides coordination layer for all agents (Epics 3-6 can parallelize after this), enables asynchronous work (user updates Notion, agents adapt), mobile access, unified analytics.

**Stories:** 5.1 (Status-Aware Triggering), 5.2 (Agent Status Updates), 5.3 (Relational Data Management)

**Current State:** ✅ **100% COMPLETE** - All 3 agents Notion-aware (status suggestions working), 9 critical workflows integrated with Notion updates, schedule-post workflow created with Cloudinary + Postiz + Notion, relational helpers implemented (Keywords, Channels), analytics tracking added, tested with real Notion database (query successful, 2-second performance)

**Completed:** 3 days (within 3-5 day estimate!)

**Achievement:** Greenfield work conquered! Notion coordination layer working, unblocks Epics 3-6 for parallel development

---

**Epic 3: Content Intelligence & Research Pipeline (JARVIS)** ✅ **COMPLETE** (Stories 1.1-1.4)

**Goal:** Enable data-backed content research, profile analysis, competitive intelligence, and evidence-backed idea generation using intelligent tool orchestration (Exa, Apify, WebSearch) integrated with Notion status updates.

**Value:** Transforms guesswork into data-driven content strategy. Research time 30-60 min → 2-5 min while improving quality.

**Stories:** 1.1 (Deep Research), 1.2 (Profile Analysis), 1.3 (Competitive Gap Analysis), 1.4 (Idea Generation)

**Current State:** ✅ **100% COMPLETE** - All 4 workflows operational with full Notion integration. Completed as byproduct of Epic 2 when Notion updates added to all Jarvis workflows.

**Completed:** 0 days dedicated (synergy with Epic 2!)

---

**Epic 4: Voice-Matched Content Creation (JARVIS)** ✅ **95% COMPLETE** (Stories 2.1-2.3)

**Goal:** Generate social media posts and video scripts that authentically match user's voice through Enhanced Voice Profile v2.0, with platform-specific optimization and Notion content saving.

**Value:** Eliminates generic AI voice problem. Content feels "authentically me" (≥8/10 confidence).

**Stories:** 2.1 (Voice Profile Learning), 2.2 (Post Generation - write-posts), 2.3 (Script Generation - write-scripts)

**Current State:** ✅ **95% COMPLETE** - learn-voice operational, **write-posts workflow CREATED** (LinkedIn PAIPS, Twitter threads, Substack essays with voice matching + Notion integration), **write-scripts workflow CREATED** (Ali Abdaal/MKBHD formats with thumbnail concepts + Notion integration). Just needs testing.

**Completed:** 2 hours (workflow creation)

---

**Epic 5: Visual Content Production (ZOE - Merged Agent)** ✅ **95% COMPLETE** (Stories 3.1-3.6)

**Goal:** Create professional images and videos using Emily JSON methodology (7-pillar ≥7/10) and fal-video, with intelligent tool selection and platform-agnostic media reusability (04-media/).

**Value:** Visual bottleneck eliminated. Publication-ready images in 30-60 sec, videos in 1-2 min.

**Stories:** 3.1 (Image Generation), 3.2 (Carousel), 3.3 (Image Editing), 3.4 (Diagram Animation), 3.5 (YouTube Thumbnails), 3.6 (Talking Heads)

**Status:** ✅ **95% COMPLETE** - **ZOE AGENT UNIFIED** (AI Image Generator + AI Video Agent merged into bmad/agents/zoe/), 13 workflows consolidated, 9 skills consolidated into .claude/skills/zoe/, video-generation skill evolved for fal-video support (22+ models), clean 3-agent architecture (Jarvis, Zoe, Zoro) now operational, old agents safely deprecated. Just needs testing.

**Completed:** 1.5 hours (agent merge execution) + deprecation complete

---

**Epic 6: Multi-Platform Publishing (ZORO)** ✅ **80% COMPLETE** (Stories 4.1-4.4)

**Goal:** Publish to Twitter/LinkedIn/Instagram/Facebook/TikTok/YouTube using Postiz MCP as PRIMARY with zero errors through validation, integrated with Notion status updates (Editing→Posted).

**Value:** Unified multi-platform scheduling, centralized analytics, simplified maintenance.

**Stories:** 4.1 (Postiz Scheduling - PRIMARY), 4.2 (Twitter Backup), 4.3 (LinkedIn Backup), 4.4 (YouTube Backup)

**Current State:** ✅ **80% COMPLETE** - **schedule-post workflow CREATED** (Story 4.1 complete!) with Cloudinary upload → Postiz scheduling → Notion integration, direct API workflows operational (publish-tweet-now, publish-linkedin-now, publish-youtube-now), needs comprehensive testing

**Completed:** Story 4.1 done as byproduct of Epic 2! Remaining: Testing + documentation (0.5-1 day)

**Parallelization:** Primary workflow complete, can finalize alongside other epics

---

**Epic 7: End-to-End Pipeline Validation & Cost Benchmarking** (Stories 6.1-6.3)

**Goal:** Validate 3 routing paths with Notion coordination, test with real content across platforms, achieve 95% success rate, establish cost/quality benchmarks.

**Value:** Confidence in complete pipeline. Data-driven optimization insights.

**Stories:** 6.1 (Text-Only Pipeline - Jarvis→Zoro), 6.2 (Full Visual Pipeline - Jarvis→Zoe→Zoro), 6.3 (Video Production Pipeline)

**Current State:** ⚠️ 40% Complete - Agents functional, Notion coordination needed

**Estimated:** 1-2 days

**Dependency:** REQUIRES Epic 2 (Notion) complete, benefits from Epics 3-6 complete

---

**Epic 8: Workflow Standardization & Continuous Optimization** (Stories 7.1-7.2)

**Goal:** Migrate remaining workflows to external instructions.md format (Zoro), establish continuous improvement processes.

**Value:** Consistent patterns across all workflows, easier maintenance.

**Stories:** 7.1 (Workflow Standardization), 7.2 (Tool Performance Tracking)

**Note:** Stories 7.3-7.6 belong to Epic 1 (Foundation), not Epic 8

**Current State:** ⚠️ 50% Complete - Jarvis already standardized, Zoe/Zoro need migration

**Estimated:** 1-2 days (workflow migration, setup tracking)

**Dependency:** Can happen last after system proven stable

---
