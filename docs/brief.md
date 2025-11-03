# Project Brief: AI-Powered Social Media Agent Team

**Version:** 1.0
**Date:** October 31, 2025
**Author:** Product Management
**Status:** Draft

---

## Executive Summary

This project creates an AI-powered social media team built on Claude Code that automates the complete content pipeline from research to publishing. The system uses a **modular, extensible architecture** where specialized AI agents coordinate through reusable workflows and autonomous skills. The current implementation includes agents for content intelligence (Jarvis), visual production (AI Image Generator, AI Video Agent), and multi-platform distribution (Social Posting Agent), but the architecture is designed to grow organically as the agentic ecosystem matures—new agents, skills, and workflows can be added seamlessly without restructuring the foundation. The primary goal is to enable high-quality, voice-consistent content creation across multiple platforms while maintaining cost efficiency and reducing manual effort from hours to minutes per piece of content.

**Value Proposition:** Transform social media content creation from a time-consuming manual process into an orchestrated AI pipeline that maintains brand voice, ensures platform compliance, and produces publication-ready content across text, images, and video formats. The modular architecture ensures the system evolves with your needs—add new agents (analytics, community management), new skills (advanced research, editing), and new workflows (optimization, testing) as your content strategy matures.

---

## Problem Statement

### Current State & Pain Points

**Content Creation Complexity:**

- Creating a single LinkedIn post requires: research (30-60 min), writing (20-30 min), image creation (15-30 min), formatting/publishing (10-15 min)
- Total time per post: 75-135 minutes of focused work
- Multiplied across platforms (LinkedIn, Twitter, YouTube, Instagram) = unsustainable for solo creators

**Voice Consistency Challenges:**

- Maintaining authentic voice across different content types (posts, scripts, threads) is mentally taxing
- Platform-specific formatting requirements (LinkedIn PAIPS, Twitter threads, YouTube descriptions) require context-switching
- Quality varies based on energy levels and time pressure

**Multi-Platform Publishing Friction:**

- Each platform has different: character limits, media requirements, API rate limits, optimal formats
- Manual publishing requires remembering platform-specific rules (Twitter Premium 25k chars vs standard 280)
- Rate limit tracking is manual and error-prone (Twitter 1500/month, LinkedIn 150/day, YouTube 6/day)

**Research & Evidence Gathering:**

- Finding credible sources, extracting insights, and synthesizing information is time-consuming
- Neural search tools (Exa), web scraping (Apify, Firecrawl), and traditional search each have different use cases
- Citing sources properly while writing content slows down flow state

**Visual Content Bottleneck:**

- Stock images feel generic and don't match brand aesthetic
- Custom image creation requires design skills or expensive tools
- Video production (talking heads, b-roll, animations) is even more resource-intensive
- Platform-specific requirements (9:16 vertical for Shorts, 16:9 for YouTube, square for Instagram) create variations

### Impact of the Problem

**Quantifiable Impact:**

- Current output: 2-3 posts/week across platforms (limited by time)
- Desired output: 1-2 posts/day across 4+ platforms (8-10x increase needed)
- Manual cost: $0 but 10-15 hours/week (unsustainable)
- Outsourced cost: $2000-5000/month for equivalent output (unaffordable)

**Opportunity Cost:**

- Time spent on content creation = time not spent on strategy, audience building, product development
- Inconsistent posting schedule hurts algorithmic reach and audience retention
- Missing trending topics due to slow production cycles

### Why Existing Solutions Fall Short

**Social Media Management Tools (Buffer, Hootsuite, Later):**

- ✅ Solve: Scheduling and basic analytics
- ❌ Don't solve: Content creation, research, visual production
- Verdict: Post-production tools, not creation tools

**AI Writing Assistants (ChatGPT, Claude, Jasper):**

- ✅ Solve: Basic content generation
- ❌ Don't solve: Voice consistency, research integration, platform formatting, visual creation, publishing
- Verdict: Single-task tools requiring heavy manual orchestration

**All-in-One AI Platforms (Postiz, ContentStudio):**

- ✅ Solve: Multi-platform scheduling with some AI writing
- ❌ Don't solve: Deep research, custom visual generation, workflow customization, voice profile learning
- Verdict: Generic AI that doesn't learn your voice or provide research depth

**Freelancers/Agencies:**

- ✅ Solve: High-quality content creation
- ❌ Don't solve: Cost ($2k-5k/month), voice consistency (they're not you), iteration speed (back-and-forth delays)
- Verdict: Expensive, slow, and loses authenticity

### Urgency & Importance

**Why Now:**

1. **Claude Code Platform Maturity** - Agents + Skills infrastructure now stable and production-ready
2. **MCP Ecosystem Growth** - 20+ integrations available (Exa, Apify, Firecrawl, Notion, YouTube, Twitter, LinkedIn APIs)
3. **AI Model Quality** - Veo 3, Gemini 2.5, GPT-4, DALL-E 3 now reliable enough for production content
4. **Personal Need** - Current manual process unsustainable, need working system now

**Risk of Delay:**

- Continued time sink prevents focus on higher-value activities
- Inconsistent posting hurts audience growth during critical period
- Technical debt in current ad-hoc approach makes future improvements harder

---

## Proposed Solution

### Core Concept

Build a **modular multi-agent AI team** where specialized agents coordinate through reusable workflows and autonomous skills. The architecture is explicitly designed for extensibility—as your social media needs evolve, you can add new agents (analytics, community management, SEO), new skills (advanced editing, A/B testing, trend detection), and new workflows (content calendaring, performance optimization) without refactoring the core system.

**Current Agent Roster (Starting Point):**

- **Jarvis** (Content Intelligence Lead) - Research, strategy, writing
- **AI Image Generator** (Visual Production Specialist) - Images, graphics, thumbnails
- **AI Video Agent** (Video Production Specialist) - Talking heads, b-roll, animations
- **Social Posting Agent** (Publishing Specialist) - Multi-platform distribution

**Future Agent Potential (Extensible by Design):**

- Analytics Agent, Community Agent, SEO Agent, Trend Monitor Agent, etc.
- Each new agent plugs into the same coordination model—no architectural changes required

**Agent Coordination Model:**

```
USER REQUEST
    ↓
JARVIS (Research + Write)
    ├─ Deep research (Exa, Apify, Firecrawl)
    ├─ Content creation (post-writer, video-script-writer skills)
    ├─ Voice matching (learned from 77+ historical posts)
    └─ Handoff package (JSON) → AI Image/Video Agents
        ↓
VISUAL PRODUCTION (Images/Videos)
    ├─ Generate visuals (Emily JSON methodology, platform specs)
    ├─ Quality validation (7-pillar framework, ≥7 for publication)
    └─ Handoff package → Social Posting Agent
        ↓
PUBLISHING (Multi-platform)
    ├─ Platform validation (character limits, formats, rate limits)
    ├─ API publishing (Twitter Premium, LinkedIn, YouTube, Postiz)
    └─ Confirmation + tracking
```

### Key Differentiators

**1. Voice Consistency Through Learning**

- System learns from 77+ historical posts to extract voice profile (v2.0, 8/10 confidence)
- Applies learned voice automatically to all content generation
- Multiple modes: Lowercase Builder-Philosopher (primary), Analyst, Critic, Excited Hype

**2. Evidence-Backed Research**

- All content backed by research with source citations
- Intelligent tool routing: free (WebSearch) → low-cost (Exa $0.05) → comprehensive (Exa + Firecrawl)
- Quality scoring for sources (high/medium/low reliability)

**3. Platform-First Design**

- Each agent knows platform rules (LinkedIn <300 words, Twitter 25k Premium, YouTube Short ≤3min 9:16)
- Automatic formatting (LinkedIn PAIPS formula, Twitter Greg Isenberg questions)
- Built-in validation prevents publishing errors

**4. Cost Optimization**

- Tiered approach: free tools first, paid only when necessary with user approval
- Transparent tracking in agent memories (October 2025: $12.34 total)
- Target: <$50/month for 30+ posts across platforms

**5. Workflow Standardization**

- Custom workflows ensure quality gates, handoff formats, validation rules
- Repeatable processes for common tasks (research-topic, write-post, generate-image, publish-tweet)
- Incremental output saving prevents losing work mid-session

### Why This Solution Will Succeed

**Technical Feasibility:**

- Built on proven Claude Code platform (stable agent + skill infrastructure)
- Leverages 20+ production-ready MCP integrations
- No custom infrastructure needed - pure orchestration layer

**Architectural Soundness:**

- Clear separation: Agents (interface) → Workflows (process) → Skills (expertise) → MCPs (tools)
- Reusable skills across workflows prevent duplication
- Stateless workflows enable pause/resume and error recovery
- **Modular design:** New agents/skills/workflows can be added without touching existing code
- **Composability:** Skills can be mixed and matched across workflows as needs evolve

**Already Partially Working:**

- Investigation shows 4 agents operational with 24+ skills, 20+ workflows
- 20+ MCP integrations configured and functional
- Real outputs generated: research briefs, LinkedIn posts, YouTube thumbnails, talking head videos

**Main Work Needed:**

- Standardization (workflows, handoff formats, documentation)
- Quality gates (validation, error handling)
- Testing (end-to-end pipeline validation)
- Not building from scratch - organizing what exists

### High-Level Vision

**Short-term (MVP):**
User provides topic → Jarvis researches and writes → Visual agents create images/videos → Social agent publishes → Content live in 10-15 minutes instead of 2 hours

**Long-term (Post-MVP):**

- Analytics agent tracks performance, suggests optimizations
- Community agent monitors comments/DMs, drafts responses
- Autonomous scheduling based on audience analytics
- A/B testing framework for content optimization

---

## Target Users

### Primary User Segment: Solo Content Creator (You)

**Profile:**

- **Role:** Technical founder/content creator building personal brand
- **Platforms:** LinkedIn (primary), Twitter, YouTube, Instagram
- **Content Volume Goal:** 1-2 posts/day across platforms (vs current 2-3/week)
- **Technical Background:** Can use Claude Code, comfortable with AI tools, understands APIs/MCP concepts
- **Time Constraints:** 10-15 hours/week on content (wants to reduce to 2-3 hours/week)
- **Budget:** <$50/month for AI tools (prefer pay-per-use over subscriptions)

**Current Workflow:**

1. Manual research (browser tabs, taking notes, bookmarking)
2. Write in IDE/notes app, iterate multiple times
3. Create visuals in Figma/Canva or skip visuals entirely
4. Manually copy-paste to each platform, adjust formatting
5. Track what posted where in spreadsheet

**Pain Points:**

- Research time consuming (30-60 min per topic)
- Voice inconsistency when rushed
- Visual creation bottleneck (often skip images due to time)
- Platform-specific formatting errors (character limits, hashtag counts)
- Rate limit tracking manual and error-prone
- No centralized output management

**Goals:**

- Increase output to 8-10 posts/week without increasing time investment
- Maintain authentic voice across all content
- Professional visuals for every post
- Zero platform-specific errors (character limits, format requirements)
- Track costs transparently, stay under $50/month
- Centralized outputs with session tracking

**Success Criteria:**

- Time per post: 75-135 min → 10-15 min (85-90% reduction)
- Output volume: 2-3 posts/week → 8-10 posts/week (3-4x increase)
- Quality consistency: Variable → Consistent (voice matching ≥8/10, quality score ≥7/10)
- Cost: $0 (unsustainable time) → <$50/month (sustainable budget)

### Secondary User Segment: Small Content Teams (Future)

**Profile:**

- 2-5 person teams managing brand social media
- Need content collaboration and approval workflows
- Multiple brand voices to maintain
- Higher volume requirements (5-10 posts/day)

**Note:** MVP focuses on solo creator use case. Team features (collaboration, approval workflows, multi-brand) are post-MVP.

---

## Goals & Success Metrics

### Business Objectives

- **Increase content output 3-4x** from 2-3 posts/week to 8-10 posts/week across platforms (Target: Achieve by Month 1 after MVP)
- **Reduce time per post by 85-90%** from 75-135 minutes to 10-15 minutes average (Target: Achieve by MVP completion)
- **Maintain cost under $50/month** for AI tools (API usage, MCP services) for 30+ posts/month (Target: Ongoing tracking)
- **Achieve 95%+ publishing success rate** with zero platform-specific errors (character limits, format requirements, rate limits) (Target: Month 2 after MVP)

### User Success Metrics

- **Voice consistency score ≥8/10** across all generated content (measured by post-writer skill confidence)
- **Research quality score ≥7/10** with all claims backed by cited sources (high/medium reliability)
- **Visual quality score ≥7/10** using Emily 7-pillar framework (≥9 for exceptional content)
- **User satisfaction: "Content feels authentically me"** (subjective validation per post)
- **Zero manual rework required** on 80%+ of generated content (20% allowance for creative iterations)

### Key Performance Indicators (KPIs)

- **Time Savings:** Minutes saved per week (Target: 480-720 min/week = 8-12 hours)
- **Cost Efficiency:** Cost per published post (Target: <$1.50/post average)
- **Quality Consistency:** Percentage of posts meeting quality thresholds without rework (Target: 80%)
- **Pipeline Reliability:** End-to-end success rate (research → content → visuals → publish) (Target: 95%)
- **API Cost Tracking:** Monthly spend by service (Exa, Apify, Images, Videos) (Target: Transparent reporting)
- **Rate Limit Compliance:** Zero rate limit violations (Twitter 1500/mo, LinkedIn 150/day, YouTube 6/day)

---

## MVP Scope

**Philosophy:** The MVP focuses on **standardizing the modular foundation** that enables organic growth. We're not building a fixed 4-agent system—we're creating an extensible architecture where agents, skills, and workflows can be added, refined, and composed as the agentic ecosystem matures. The current agents/skills/workflows represent the starting point, not the final state.

### Core Features (Must Have)

- **Content Intelligence Pipeline (Jarvis)**
  - Deep research with intelligent tool routing (free → Exa → Exa+Firecrawl based on depth)
  - Post writing with learned voice profile (≥8/10 confidence, multiple modes)
  - Video script generation with thumbnail concepts
  - Evidence-backed content with source citations
  - Handoff package creation (JSON format with metadata)
  - **Rationale:** Core value - research and writing automation is highest time savings

- **Visual Production Pipeline (AI Image + Video)**
  - Image generation with platform optimization (LinkedIn dark monochrome, YouTube CTR thumbnails)
  - Video generation (talking heads via HeyGen, b-roll via Veo/Fal-Video)
  - Emily JSON methodology for quality validation (7-pillar framework)
  - Platform-specific formatting (9:16 vertical, 16:9 horizontal, square)
  - Handoff package creation
  - **Rationale:** Visuals are bottleneck, automation unlocks higher output

- **Multi-Platform Publishing (Social Posting Agent)**
  - Twitter Premium API (25k char posts, 1-4 images, videos, threads)
  - LinkedIn API (text, images, carousels, PDFs)
  - YouTube Data API (videos, auto-detected Shorts)
  - Platform validation (character limits, media formats, file sizes)
  - Rate limit tracking and enforcement
  - **Rationale:** Publishing automation prevents errors, ensures compliance

- **Workflow Standardization**
  - All workflows use external instructions.md format (no embedded YAML)
  - Standardized handoff package JSON schema with validation
  - Error handling patterns (API failures, rate limits, cost approvals)
  - Centralized outputs/{date}/{session}/ structure
  - **Rationale:** Reliability and maintainability for long-term use

- **Documentation & Architecture**
  - Single authoritative ARCHITECTURE.md (consolidates all documentation)
  - Clear definitions: Agents (interface) → Workflows (process) → Skills (expertise) → MCPs (tools)
  - Naming conventions (write-_ workflows, _-writer skills)
  - Complete skill documentation (SKILL.md + reference/ + examples/)
  - **Guidelines for extensibility:** When to create new agent vs add workflow, when to create skill vs call MCP directly, how to compose skills across workflows
  - **Rationale:** Without this, system becomes unmaintainable as complexity grows. Clear patterns enable confident addition of new components without breaking existing ones.

### Out of Scope for MVP

- **Analytics & Performance Tracking** - Focus on creation, not measurement (Phase 2)
- **Community Management** - No comment monitoring, DM responses, engagement tracking (Phase 2)
- **Autonomous Scheduling** - Manual scheduling via Postiz, no smart timing algorithms (Phase 2)
- **A/B Testing Framework** - No systematic content testing or optimization (Phase 2)
- **Multi-Brand Support** - Single voice profile only (Phase 3)
- **Team Collaboration** - No approval workflows, multi-user access, permissions (Phase 3)
- **Agent SDK Migration** - Stay on Claude Code for MVP (Phase 3+)
- **Custom Training/Fine-tuning** - Use base models, no custom fine-tuned models (Cost prohibitive)
- **Real-time Trend Monitoring** - Manual topic selection, no automated trend detection (Phase 2)

### MVP Success Criteria

**Functional Success:**

- ✅ User provides topic → Complete post (text + image + video) ready to publish in 10-15 minutes
- ✅ End-to-end pipeline works: Jarvis research → write → AI Image/Video generate → Social Posting publish
- ✅ Zero platform-specific errors (validation catches all issues before publishing)
- ✅ Voice consistency maintained (≥8/10 confidence on all generated content)
- ✅ Cost tracking transparent (<$50/month for 30 posts validated)

**Technical Success:**

- ✅ All workflows use standardized format (external instructions.md, validated handoff packages)
- ✅ ARCHITECTURE.md exists and complete (single source of truth)
- ✅ Error handling patterns implemented (graceful degradation on API failures)
- ✅ All outputs in centralized location (outputs/{date}/{session}/)

**User Experience Success:**

- ✅ User can complete full pipeline without consulting documentation (workflows guide them)
- ✅ 80% of generated content requires no manual rework
- ✅ User reports: "This feels like I wrote it" for voice consistency
- ✅ User can pause/resume workflows without losing progress

**Timeline:**

- MVP Complete: 8-13 days of focused development (from current state)

---

## Post-MVP Vision

**Growth Model:** The agentic ecosystem evolves organically based on actual needs, not a rigid roadmap. As content strategy matures, new agents/skills/workflows emerge naturally. Each addition builds on the standardized foundation without requiring architectural rewrites. Skills become more sophisticated through refinement, workflows become more efficient through optimization, and agents become more specialized through focused iteration.

### Phase 2 Features (3-6 months post-MVP)

**Analytics & Optimization Agent:**

- Track performance metrics across platforms (engagement, reach, clicks)
- Identify top-performing content patterns
- Suggest optimal posting times based on audience analytics
- Generate performance reports with insights

**Community Management Agent:**

- Monitor comments, DMs, mentions across platforms
- Draft context-aware responses maintaining brand voice
- Escalate urgent/sensitive interactions to user
- Track sentiment trends and audience feedback

**Autonomous Scheduling:**

- Smart timing based on audience activity patterns
- Content calendar optimization (balance topics, formats, platforms)
- Queue management with automatic posting
- Holiday/event awareness for timely content

**Advanced Research Capabilities:**

- Real-time trend monitoring and alerts
- Competitive intelligence tracking (monitor key accounts)
- Content gap analysis (what topics you haven't covered)
- SEO keyword research integration

**Quality Improvements:**

- A/B testing framework (test headlines, images, posting times)
- Multi-variant generation (3-5 options per request, user selects best)
- Feedback loop (user ratings improve future generations)
- Advanced voice modes (technical deep-dive, beginner-friendly, humor variants)

### Long-term Vision (1-2 years)

**Mature Agentic Ecosystem:**

- 10+ specialized agents working in concert (content, visuals, publishing, analytics, community, SEO, trends, optimization, testing, scheduling)
- 50+ refined skills covering every aspect of content creation and distribution
- 100+ battle-tested workflows for common and edge case scenarios
- Self-improving through feedback loops—agents learn what works and refine their approaches

**Autonomous Content Engine:**

- System proactively suggests content based on trends, gaps, calendar
- End-to-end automation: trending topic detected → researched → created → scheduled → published
- User reviews and approves queued content vs creating from scratch
- Self-optimizing based on performance data

**Multi-Brand Platform:**

- Support multiple voice profiles (personal brand, company brand, client brands)
- Team collaboration features (roles, permissions, approval workflows)
- White-label capability for agencies

**Cross-Platform Content Intelligence:**

- Repurpose content across formats (blog post → Twitter thread → LinkedIn carousel → YouTube script)
- Platform-specific optimization (same core content, different angles per platform)
- Content series planning (multi-post campaigns, cohesive narratives)

**Advanced Media Production:**

- Custom brand design systems (beyond current LinkedIn dark monochrome)
- Advanced video editing (multi-scene stitching, transitions, captions)
- Animation capabilities (explainer videos, data visualization)
- Voice cloning for consistent talking head videos

### Expansion Opportunities

**Vertical Expansion:**

- Podcast production (script writing, show notes, audiogram creation)
- Newsletter creation (Substack, Beehiiv integration)
- Blog post writing with SEO optimization
- Email marketing campaigns

**Horizontal Expansion:**

- Additional platforms (TikTok, Pinterest, Reddit, Discord)
- E-commerce integration (product descriptions, marketing copy)
- Sales enablement (LinkedIn outreach, cold email sequences)

**Platform Evolution:**

- Agent SDK migration (standalone application, not Claude Code dependent)
- Web interface (browser-based, no IDE required)
- Mobile app (on-the-go content approval, scheduling)
- API access (integrate into other tools, custom workflows)

---

## Technical Considerations

### Platform Requirements

- **Target Platform:** Claude Code (desktop application)
- **Minimum Requirements:**
  - Claude Code v1.x installed
  - MacOS/Windows/Linux (Claude Code supported OS)
  - Internet connection (API calls to MCP servers)
- **Performance Requirements:**
  - Workflow execution: <30 seconds for simple tasks, <5 minutes for complex (research + content)
  - Skill invocation: Depends on external APIs (Exa 5-15s, image generation 10-30s, video 2-5 min)
  - Cost per request: <$0.50 average (excluding video generation which can be $1-3)

### Technology Preferences

**Core Platform:**

- **Agent Framework:** Claude Code Agents (built-in, XML-based persona definitions)
- **Skill Framework:** Claude Code Skills (autonomous VMs with sandboxed tools)
- **Workflow Engine:** Custom YAML + XML orchestration layer (your architecture)

**Integration Layer:**

- **MCP Servers:** 20+ configured (Exa, Apify, Firecrawl, Notion, Twitter, LinkedIn, YouTube, Postiz, HeyGen, Veo, Fal-Video, Nanobanana, Cloudinary, Chrome DevTools, Serena)
- **Custom API Clients:** Node.js modules for Twitter Premium, LinkedIn (OAuth)
- **Data Persistence:** File-based (agent memories.md, outputs/{date}/{session}/, Notion for research)

**Content Generation:**

- **Text:** Claude Sonnet 4 (via Claude Code)
- **Images:** Gemini 2.5 Flash (nanobanana, $0.002-0.004/image) or DALL-E 3 (gpt-image-1, $0.04-0.08/image)
- **Videos:** HeyGen (avatars, $0.20-0.50/min), Veo 3 (b-roll, $0.30-0.60/8sec), Fal-Video multi-model (Sora 2, Luma Ray, Kling)

**Research & Data:**

- **Neural Search:** Exa ($0.05-0.15/search, 1000 free/month)
- **Web Scraping:** Firecrawl (caching), Apify (platform scrapers)
- **Traditional Search:** WebSearch (free), WebFetch (free)
- **Social APIs:** Twitter Premium, LinkedIn, YouTube Data v3, Postiz MCP

### Architecture Considerations

**Repository Structure:**

- **Type:** Modular Monorepo (single repository, independently composable agent modules)
- **Design Principle:** Each agent/skill/workflow is self-contained and can be added/removed without affecting others
- **Layout:**
  ```
  /
  ├── .claude/
  │   ├── commands/          # Agent menu definitions (add new agent = add new .md)
  │   └── skills/            # Skill knowledge modules (add new skill = new folder with SKILL.md)
  ├── bmad/
  │   ├── agents/            # Agent persona + workflows (each agent is independent module)
  │   └── modules/           # Shared modules (API clients, utilities)
  ├── docs/                  # Documentation (briefs, PRDs, architecture)
  ├── outputs/               # Centralized output management
  └── .bmad-core/            # PM agent + templates
  ```
- **Extensibility Pattern:** New agents follow create-agent template, new workflows follow create-workflow template, new skills follow skill structure. No central registry or dependency management needed—loose coupling by design.

**Service Architecture:**

- **Type:** Orchestration layer on Claude Code platform
- **Pattern:** Multi-agent coordination with stateless workflows
- **Modularity:** Each agent exposes menu commands, each workflow can invoke any skill, each skill can call any MCP
- **State Management:** File-based persistence (no database required for MVP)
- **Communication:** Handoff packages (JSON) passed between agents—standardized format enables any agent to coordinate with any other agent

**Integration Requirements:**

- **Authentication:** MCP servers configured in Claude Code settings
- **API Keys:** Stored in .env (gitignored), referenced by MCPs
- **Rate Limiting:** Tracked in agent memories, enforced in workflows
- **Error Recovery:** Graceful degradation (free tools if paid APIs fail)

**Security/Compliance:**

- **Data Privacy:** No PII collected, user content stays local in outputs/
- **API Security:** Keys never committed to git, MCP handles auth
- **Platform Compliance:** Respect Twitter/LinkedIn/YouTube TOS (no automation abuse)
- **Cost Protection:** User approval required for >$1 operations

---

## Constraints & Assumptions

### Constraints

**Budget:**

- **Hard Limit:** $50/month for all AI/API services
- **Breakdown:** Exa $15, Apify $10, Images $10, Videos $15
- **Implication:** Must optimize for free tiers (WebSearch, caching) and low-cost models (nanobanana)

**Timeline:**

- **MVP Development:** 8-13 days focused work (standardization + validation)
- **Pace:** Solo development, part-time (not full-time dedicated)
- **Implication:** Prioritize high-impact features, defer nice-to-haves

**Resources:**

- **Team:** Solo developer (you)
- **Support:** No dedicated QA, design, or DevOps
- **Implication:** Keep architecture simple, prioritize reliability over features

**Technical:**

- **Platform Lock-in:** Claude Code only (desktop application, not web)
- **API Dependencies:** 20+ external services (Exa, Apify, Twitter, LinkedIn, YouTube, etc.)
- **No Custom Training:** Use base models, no fine-tuning (cost prohibitive)
- **No Real-time:** All workflows are synchronous, no background jobs (Claude Code limitation)

### Key Assumptions

- **Claude Code Stability:** Platform remains stable, no breaking changes to Agents/Skills infrastructure
- **MCP Availability:** External MCPs (Exa, Apify, etc.) remain available and functional
- **API Reliability:** Twitter Premium, LinkedIn, YouTube APIs maintain current rate limits and functionality
- **Voice Learning Sufficiency:** 77 historical posts provide enough data for voice profile (8/10 confidence acceptable)
- **Cost Predictability:** AI model pricing remains stable (no 10x price increases)
- **Solo Use Case:** Single user, no concurrent access, no team collaboration required for MVP
- **Desktop Usage:** User comfortable working in Claude Code IDE, not expecting web/mobile interface
- **English Only:** All content generation in English, no multilingual support needed
- **Manual Approval:** User reviews and approves content before publishing (no fully autonomous posting)
- **Incremental Adoption:** User migrates workflows incrementally, doesn't need everything perfect day 1
- **Organic Evolution:** The system will naturally expand beyond current 3-4 agents as needs emerge—new agents, skills, and workflows will be added iteratively based on real usage patterns, not pre-planned features
- **Modular Independence:** Adding new components (agents, skills, workflows) doesn't require modifying existing components—loose coupling enables safe, continuous improvement

---

## Risks & Open Questions

### Key Risks

- **Workflow Complexity Creep:** Current workflows mix formats (YAML, XML, embedded JavaScript) - standardization may reveal incompatibilities requiring rewrites
  - **Impact:** Medium - delays MVP timeline, increases rework
  - **Mitigation:** Audit workflows first, identify high-risk migrations, test incrementally

- **MCP Server Stability:** 20+ external dependencies, any breaking change cascades to workflows
  - **Impact:** High - could break entire pipelines
  - **Mitigation:** Implement error handling, graceful degradation, fallback options (free tools when paid fail)

- **Voice Consistency Drift:** As models update, voice matching quality may degrade (current 8/10 confidence)
  - **Impact:** Medium - affects core value proposition (authenticity)
  - **Mitigation:** Periodic voice profile retraining, user feedback loop, maintain version snapshots

- **Cost Overruns:** Video generation expensive ($1-3/video), easy to exceed $50/month budget
  - **Impact:** Medium - forces manual rationing, limits output
  - **Mitigation:** Mandatory cost approval for >$1 operations, tiered quality options (draft vs publish-ready)

- **Platform API Changes:** Twitter, LinkedIn, YouTube may change APIs, rate limits, or TOS
  - **Impact:** High - could break publishing capabilities entirely
  - **Mitigation:** Fallback to Postiz MCP (multi-platform abstraction), monitor API changelog notifications

- **Handoff Package Fragility:** JSON formats not yet validated, schema changes could break coordination
  - **Impact:** Medium - agents can't pass data reliably
  - **Mitigation:** Define and validate JSON schemas early in MVP, version schema files

### Open Questions

- **Should AI Image + AI Video merge into single "Zoe" agent?**
  - Pro: Simpler mental model, both invoke generative AI skills similarly
  - Con: Loses specialization clarity, single agent becomes complex
  - Decision needed: Before PRD finalization

- **What's the right balance between workflow control vs skill autonomy?**
  - Some skills orchestrate complex processes (deep-web-research routes between 4+ MCPs)
  - Should workflows also orchestrate, or fully delegate to skills?
  - Decision needed: Define guidelines for workflow vs skill responsibilities

- **How to handle iterative refinement workflows?**
  - User reviews generated content, requests changes, regenerates
  - Current workflows linear (no built-in iteration loops)
  - Decision needed: Add iteration support or keep manual re-invocation?

- **When to create new skill vs call MCP directly?**
  - youtube-research is thin wrapper around youtube-transcript MCP
  - deep-web-research orchestrates 4+ MCPs (thick wrapper)
  - Decision needed: Establish criteria (create skill if orchestrating multiple MCPs or adding methodology)

- **How to validate handoff packages between agents?**
  - JSON schema validation? TypeScript types? Manual testing?
  - Error handling if invalid package received?
  - Decision needed: Before implementing standardization

- **Should voice profiles support multiple modes permanently?**
  - Current: Lowercase Builder-Philosopher (primary), Analyst, Critic, Excited Hype
  - Future: Platform-specific modes (LinkedIn professional, Twitter casual)?
  - Decision needed: Phase 2 consideration, MVP uses single primary mode

### Areas Needing Further Research

- **Agent SDK Migration Path:** What changes required to move from Claude Code to standalone Agent SDK application?
  - Research: Agent SDK documentation, migration examples, breaking changes
  - Timeline: Phase 3+, not MVP blocker

- **Optimal Research Tool Mix:** Currently using Exa ($0.05), Firecrawl (free tier), WebSearch (free), Apify ($3-10)
  - Research: Cost/quality tradeoffs, free tier limits, caching strategies
  - Timeline: Month 1-2, optimize as usage patterns emerge

- **Video Generation Cost Optimization:** HeyGen ($0.20-0.50/min), Veo ($0.30-0.60/8sec), Fal-Video (varies by model)
  - Research: Quality comparison, batch processing discounts, draft vs final quality
  - Timeline: Month 2-3, once video workflows used regularly

- **LinkedIn API Carousel Limits:** Documentation unclear on max images (2-20 stated, but practical limit?)
  - Research: Test edge cases, monitor for rate limiting or rejections
  - Timeline: MVP validation phase

- **Postiz MCP Capabilities:** Can it replace direct Twitter/LinkedIn API clients?
  - Research: Feature parity, rate limit handling, cost comparison
  - Timeline: Month 2, consider consolidating API integrations

---

## Appendices

### A. Research Summary

**System Investigation (October 31, 2025):**

- **Scope:** Comprehensive analysis of existing 4-agent social media system
- **Findings:**
  - 4 agents operational: Jarvis (content intelligence), AI Image Generator (visuals), AI Video Agent (videos), Social Posting Agent (publishing)
  - 24+ skills implemented: deep-web-research, post-writer, video-script-writer, profile-analysis, create-image, video-generation, etc.
  - 20+ workflows: research-topic, write-posts, generate-single, post-tweet, linkedin-post, youtube-upload, etc.
  - 20+ MCP integrations configured: Exa, Apify, Firecrawl, Notion, Twitter, LinkedIn, YouTube, Postiz, HeyGen, Veo, Fal-Video, Nanobanana, etc.
  - **Current State:** Functional but inconsistent (workflows mix formats, documentation scattered, handoff packages informal)
  - **Gap Analysis:** Main work needed is standardization, documentation, and validation - not building from scratch

**Architecture Documentation Analysis:**

- **Key Documents:** AGENT-WORKFLOW-SKILL-MAP.md, agent-skills.md, create-agent instructions.md, create-workflow instructions.md
- **Architecture Pattern:** 3-layer hierarchy confirmed: Agents (interface) → Workflows (process) → Skills (expertise) → MCPs (tools)
- **Workflow Engine:** Custom YAML + XML orchestration layer
- **Handoff Coordination:** JSON packages mentioned but not formally specified

**MCP Ecosystem Review:**

- **Research Tools:** Exa (neural search, $0.05-0.15), Firecrawl (web scraping, caching), Apify (platform scrapers), WebSearch/WebFetch (free)
- **Content Generation:** gpt-image-1 (DALL-E 3, $0.04-0.08), nanobanana (Gemini 2.5, $0.002-0.004), HeyGen (avatars, $0.20-0.50/min), veotools (Veo 3, $0.30-0.60/8sec), fal-video (multi-model)
- **Publishing:** mcp-twitter (Premium API), youtube-uploader-mcp (Data API v3), postiz (multi-platform scheduling)
- **Infrastructure:** notion (knowledge management), cloudinary (media assets), serena (IDE coding)

### B. Stakeholder Input

**Primary Stakeholder (You) - Key Priorities:**

1. **"I want to ground myself, create an actual plan"** - Need clarity and roadmap
2. **"Skills are VM instances, workflows are something we have created"** - Architecture distinction clarified
3. **"Standardize & document existing"** - MVP scope = clean up current state
4. **"Eventually migrate to Agent SDK"** - Keep in mind but not MVP priority
5. **"This is for now only used in Claude Code"** - Platform constraint for MVP

**Design Considerations:**

- Don't build rigid architecture - need flexibility to add agents, skills, capabilities
- Consider merging AI Image + AI Video into single "Zoe" agent (similar skill patterns)
- 3-agent model more appealing: Jarvis (brain), Zoe (visuals), Zoro (publishing)
- Need to understand how everything ties together before adding more

### C. References

**Codebase Locations:**

- Investigation Report: Comprehensive findings from October 31, 2025 investigation
- `.claude/commands/` - Agent menu definitions (jarvis.md, ai-image-generator.md, ai-video-agent.md, social-posting-agent.md)
- `.claude/skills/` - Skill knowledge modules (24+ skills across jarvis/, ai-image-generator/, ai-video-agent/)
- `bmad/agents/` - Agent personas + workflows (content-intelligence/, ai-image-generator/, ai-video-agent/, social-posting-agent/)
- `.bmad-core/` - PM agent templates and tasks
- `docs/` - Documentation (content-intelligence/, agent-skills/, architecture/)

**Key Documentation:**

- `AGENT-WORKFLOW-SKILL-MAP.md` - Architecture overview
- `bmad/bmb/workflows/create-agent/instructions.md` - Agent creation patterns
- `bmad/bmb/workflows/create-workflow/instructions.md` - Workflow creation guide
- `README.md` - System overview

---

## Next Steps

### Immediate Actions

1. **Review and refine this Project Brief** - Validate problem statement, solution approach, MVP scope (Today)
2. **Create Product Requirements Document (PRD)** - Detailed functional/non-functional requirements, epics, user stories (Next 1-2 days)
3. **Audit existing workflows** - Identify standardization requirements, migration risks (During PRD creation)
4. **Define handoff package JSON schemas** - Formalize agent coordination format (Week 1)
5. **Create ARCHITECTURE.md** - Consolidate all architectural documentation (Week 1-2)

### PM Handoff

This Project Brief provides the full context for the **AI-Powered Social Media Agent Team** project. The brief has established:

- **Problem:** Content creation is time-consuming, inconsistent, and complex across platforms
- **Solution:** Multi-agent AI team (Jarvis, AI Image/Video, Social Posting) coordinated through workflows
- **User:** Solo content creator (you) wanting to 3-4x output while maintaining quality and voice consistency
- **MVP:** Standardize existing system, validate end-to-end pipeline, comprehensive documentation
- **Success:** 10-15 min per post (vs 75-135 min), 8-10 posts/week (vs 2-3), <$50/month cost, 95% reliability

**Please start in 'PRD Generation Mode'**, review the brief thoroughly, and work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.

The investigation has confirmed the system is already partially functional with 4 agents, 24+ skills, 20+ workflows, and 20+ MCP integrations. The main work is standardization, not new development.
