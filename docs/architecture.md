# AI-Powered Social Media Agent Team - System Architecture

**Version:** 1.2
**Date:** November 5, 2025
**Status:** Active Reference - PRD Aligned + Registries Complete
**Related Documents:** [PRD](./prd.md) | [Project Brief](./brief.md) | [Tool Registry](../.bmad-core/data/tool-registry.yaml) | [Workflow Registry](../.bmad-core/data/workflow-registry.yaml)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Architectural Principles](#architectural-principles)
4. [Core Components](#core-components)
5. [Agent Architecture](#agent-architecture)
6. [Workflow System](#workflow-system)
7. [Skill Discovery & Execution](#skill-discovery--execution)
8. [Tool Integration Strategy](#tool-integration-strategy)
9. [Data Flow & State Management](#data-flow--state-management)
10. [Coordination Mechanisms](#coordination-mechanisms)
11. [Extension Decision Framework](#extension-decision-framework)
12. [Repository Structure](#repository-structure)
13. [Deployment & Operations](#deployment--operations)
14. [Appendices](#appendices)

---

## Executive Summary

The AI-Powered Social Media Agent Team is a modular, extensible system for AI-driven content creation, visual production, and multi-platform publishing. Built on Claude Code's agent and skill infrastructure, the system orchestrates 3 specialized AI personas (Jarvis, Zoe, Zoro) that coordinate through Notion workspace status updates and local JSON handoff packages.

**Key Architectural Characteristics:**

- **Loose Coupling:** Agents, workflows, and skills are independently deployable modules with no central registry
- **Status-Driven Coordination:** Notion Content Tracker provides collaborative state (Idea → Research → Writing → Editing → Posted)
- **Model-Invoked Skills:** Claude autonomously discovers and loads skills based on description matching
- **Intelligent Tool Routing:** Cost-conscious tool selection (free WebSearch → paid Exa → comprehensive Apify based on depth)
- **Dual State Management:** Local outputs/ for artifacts + Notion for metadata/status + coordination
- **Organic Growth Model:** New agents/workflows/skills addable without modifying existing components

**System Scale:**
- 3 Core Agents (Jarvis, Zoe, Zoro)
- 20+ Workflows (research, content generation, visual production, publishing)
- 24+ Skills (autonomous expertise modules)
- 20+ MCP Integrations (Notion, Postiz, Apify, Exa, image/video generation)

**Target Performance:**
- Content creation time: 75-135 min → 10-15 min (85-90% reduction)
- Content output: 2-3 posts/week → 8-10 posts/week (3-4x increase)
- Voice consistency: ≥8/10 confidence via Enhanced Voice Profile v2.0
- Monthly AI/API costs: <$50 for 30+ posts across platforms
- Pipeline success rate: 95% without manual intervention

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│                    (Claude Code CLI via Agents)                      │
├─────────────────────────────────────────────────────────────────────┤
│  /jarvis          │  /zoe              │  /zoro                      │
│  Content Intel    │  Visual Production │  Publishing                 │
└─────┬─────────────┴──────────┬─────────┴─────────┬──────────────────┘
      │                        │                   │
      │ Workflow Orchestration │                   │
      ▼                        ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW LAYER (YAML + XML)                       │
│  research-topic   │  write-post        │  create-image              │
│  analyze-profile  │  write-script      │  create-talking-head       │
│  generate-ideas   │  learn-voice       │  schedule-post             │
└─────┬─────────────┴──────────┬─────────┴─────────┬──────────────────┘
      │                        │                   │
      │ Skill Discovery (Model-Invoked via Context Creation)
      ▼                        ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SKILL LAYER (Autonomous VMs)                      │
│  deep-web-research    │  create-image      │  Direct API/MCP        │
│  post-writer          │  veotools-mastery  │  (Zoro workflows)      │
│  voice-matcher        │  linkedin-design   │                        │
└─────┬─────────────────┴────────────┬─────┴────────────────────┬─────┘
      │                              │                          │
      │ Tool Selection & Execution   │                          │
      ▼                              ▼                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    TOOL/MCP LAYER                                    │
│  Notion (status)  │  Exa (research)   │  nanobanana (images)        │
│  Postiz (publish) │  Apify (scraping) │  veotools (videos)          │
│  Twitter API      │  Firecrawl (web)  │  HeyGen (avatars)           │
└─────┬─────────────┴───────────────────┴─────────────────────────────┘
      │
      │ Data Persistence
      ▼
┌─────────────────────────────────────────────────────────────────────┐
│               STATE MANAGEMENT (Dual Storage)                        │
│  Local: outputs/projects/{YYYY-MM-DD}-{slug}/  │  Collaborative: Notion DB      │
│  - Research briefs                  │  - Content status workflow     │
│  - Generated posts                  │  - Metadata & relations        │
│  - Images & videos                  │  - Performance metrics         │
│  - Handoff packages (JSON)          │  - Mobile-accessible state     │
└─────────────────────────────────────────────────────────────────────┘
```

### System Boundaries

**In Scope:**
- Content research and intelligence gathering
- AI-powered content generation (posts, scripts) with voice matching
- Visual content production (images, videos, carousels)
- Multi-platform publishing (Twitter, LinkedIn, YouTube, Instagram)
- Notion-based workflow coordination and status tracking
- Cost optimization through intelligent tool routing

**Out of Scope (for MVP):**
- Direct social media scheduling UI (delegated to Postiz)
- Real-time analytics dashboards (manual tracking in Notion)
- Multi-user collaboration (single creator use case)
- Automated A/B testing (manual testing by user)
- Video editing beyond generation (no post-processing)

---

## Architectural Principles

### 1. Loose Coupling via Natural Interfaces

**Principle:** Components interact through natural language descriptions and JSON, not hard dependencies.

**Implementation:**
- Agents coordinate via Notion status updates + JSON handoff packages (not direct function calls)
- Workflows invoke skills via context creation ("Research {topic} with depth=comprehensive"), not explicit imports
- Skills call MCPs via Claude Code platform, not direct API clients

**Benefits:**
- Add new agents without modifying existing agents
- Update skill tool selection without breaking workflows
- Swap MCP providers without changing skill logic

**Anti-Pattern Example:**
```javascript
// ❌ WRONG: Hard dependency in workflow
import { deepWebResearch } from '../skills/deep-web-research';
const results = await deepWebResearch(topic, depth);

// ✅ RIGHT: Loose coupling via context
// Workflow step creates context: "Research {topic} with depth={depth}"
// Claude autonomously discovers deep-web-research skill
// Skill executes, returns results to workflow
```

### 2. Status-Driven Collaboration

**Principle:** Notion Content Tracker provides shared state that all agents respect as authoritative.

**Implementation:**
- Content lifecycle: Idea → Research → Next Up → Writing → Editing → Posted → Archived
- Agents check status before suggesting workflows (Jarvis reads "Idea", Zoe reads "Editing")
- Agents update status as work completes (Jarvis moves to "Writing", Zoro moves to "Posted")
- User can manually update status in Notion, agents adapt to current state

**Benefits:**
- Asynchronous collaboration (user updates Notion, agents respond)
- Mobile accessibility (check content status on phone)
- Unified view of content pipeline across all projects

**State Transitions:**
```
Idea ──(Jarvis: research-topic)──▶ Research ──(Jarvis: write-post)──▶ Writing
                                                                          │
                                                                          ▼
Archived ◀──(Manual)── Posted ◀──(Zoro: publish)── Editing ◀──(Zoe: create-image OR Jarvis if text-only)
```

### 3. Model-Invoked Skill Discovery

**Principle:** Skills are autonomous expertise modules that Claude discovers based on task context, not explicit calls.

**Implementation:**
- Skills have rich descriptions optimized for discovery ("Generate platform-optimized social media posts using proven formulas...")
- Workflows create context-rich steps ("Generate LinkedIn post about {topic} using {voice_profile}")
- Claude matches context against skill descriptions, loads matching skills
- Skills execute as autonomous VMs with tool access, return results

**Discovery Algorithm (conceptual):**
```python
# When workflow step creates context:
context = "Research AI agents with depth=comprehensive"

# Claude's discovery process:
1. Parse context: task=research, topic="AI agents", depth=comprehensive
2. Scan available skills for description matches
3. Find: deep-web-research (description contains "research", "depth parameter", "Exa", "Apify")
4. Load deep-web-research/SKILL.md
5. Execute skill instructions with available MCPs
6. Return research results to workflow
```

**Benefits:**
- Skills composable across workflows (any workflow can use any skill)
- Cross-agent skill usage (Zoe can use Jarvis skills if needed)
- Skill improvements don't break workflow callers

### 4. Intelligent Tool Routing

**Principle:** Optimize for cost vs quality trade-offs using tiered tool selection.

**Implementation:**
- **Free-first:** WebSearch before Exa, WebFetch before Firecrawl
- **Depth-based:** quick=free, standard=low-cost, comprehensive=paid, exhaustive=user-approval-required
- **Quality-conscious:** gpt-image-1 for LinkedIn (professional), nanobanana for Instagram (social)
- **User-approved:** Operations >$1 require explicit confirmation

**Tool Selection Matrix:**

| Use Case | Free Option | Low Cost | High Quality | Cost Range |
|----------|-------------|----------|--------------|------------|
| Research | WebSearch | Exa neural search | Exa + Firecrawl + Apify | $0 → $0.50+ |
| Images | - | nanobanana ($0.039) | gpt-image-1 ($0.04-0.08) | $0.039 → $0.08 |
| Videos | - | Veo 3 fast ($0.30/8s) | HeyGen ($0.20-0.50/min) | $0.30 → $3+ |
| Scraping | - | Apify actors ($0.02-0.15) | Manual APIs | $0.02 → $0.50 |

**Benefits:**
- Stay under $50/month budget for 30+ posts
- Transparent cost tracking per operation
- Quality available when needed (user decides)

### 5. Dual State Management

**Principle:** Use local outputs/ for complete artifacts, Notion for metadata and coordination state.

**Implementation:**
- **Local (outputs/):** Research briefs (full citations), generated content (multi-turn edits), images/videos (files), handoff packages (JSON), session metadata
- **Notion:** Status workflow, publish dates, performance metrics (Views/Likes), relations (Keywords, Channels), mobile-accessible metadata

**Storage Decision Matrix:**

| Data Type | Local | Notion | Rationale |
|-----------|-------|--------|-----------|
| Research briefs (5-10 pages) | ✅ | ❌ | Too large for Notion, full citations needed |
| Content status | ❌ | ✅ | Shared state, mobile access, status workflow |
| Generated images/videos | ✅ | URL only | Files stored locally, URLs in Notion for reference |
| Voice profiles | ✅ | ❌ | Git-tracked config, not collaborative |
| Performance metrics | Summary | ✅ | Notion tracks Views/Likes/Comments over time |
| Handoff packages | ✅ | Summary | Full JSON local, key metadata in Notion properties |

**Benefits:**
- No Notion size limits for large artifacts
- Mobile access to status and metadata
- Git version control for local configs
- Bidirectional linking (Notion page → local files)

### 6. Organic Growth Model

**Principle:** System grows through component addition, not modification of existing components.

**Implementation:**
- **No central registries:** Agents discovered via .claude/commands/, skills via .claude/skills/, no manifest updates
- **Self-contained modules:** Each agent folder has persona, workflows, config—can add/remove independently
- **Pattern-based extensibility:** create-agent and create-workflow templates provide complete guidance

**Growth Examples:**
- New agent: Create .claude/commands/{name}/{name}.md + bmad/agents/{name}/ → Claude Code auto-discovers
- New workflow: Add bmad/agents/{agent}/workflows/{name}/ with workflow.yaml + instructions.md → Agent menu auto-includes
- New skill: Create .claude/skills/{agent}/{name}/SKILL.md with description → Claude auto-discovers via description matching

**Benefits:**
- No breaking changes when adding components
- Parallel development (multiple people can add agents simultaneously)
- Confident extension (follow templates, no architecture rewrites)

---

## Core Components

### Component Hierarchy

```
System
├── Agents (User-facing personas with command menus)
│   ├── Jarvis (Content Intelligence)
│   ├── Zoe (Visual Production)
│   └── Zoro (Publishing)
│
├── Workflows (Multi-step process orchestrators)
│   ├── research-topic
│   ├── write-post
│   ├── create-image
│   └── schedule-post
│
├── Skills (Autonomous expertise modules, model-invoked)
│   ├── deep-web-research
│   ├── post-writer
│   ├── create-image
│   └── veotools-mastery
│
└── MCPs (External tool integrations)
    ├── Notion (collaborative state)
    ├── Postiz (publishing)
    ├── Exa (research)
    ├── Apify (scraping)
    ├── nanobanana (images)
    └── veotools (videos)
```

### Terminology Clarification

**CRITICAL:** This system uses custom terminology that differs from Claude Code native concepts.

| Our Term | Claude Code Term | Invocation Model | Description |
|----------|------------------|------------------|-------------|
| **Agent** | Slash Command | User-invoked | Persona-driven menu interface presenting workflow options |
| **Workflow** | (Custom) | User-selected | YAML+XML multi-step process orchestrator with state management |
| **Skill** | Agent Skill | Model-invoked | Autonomous expertise module Claude discovers via description |
| **MCP** | MCP Server | Tool-invoked | External API/service integration (Notion, Exa, Apify, etc.) |

**Invocation Flow:**
1. User invokes Agent (`/jarvis`) → User-driven
2. Agent presents menu of Workflows → User selects
3. Workflow executes steps creating context → Process-driven
4. Claude discovers Skills based on context → Model-driven
5. Skills execute with MCP access → Autonomous

**Why This Matters:**
When PRD/architecture says "workflow invokes skill," it means workflow creates rich context that Claude uses to autonomously discover and load the skill. Workflows don't explicitly call skills—Claude does that automatically via description matching.

---

## Agent Architecture

### Agent Definition Model

Agents are **persona-driven menu interfaces** that present numbered workflow options to users. They are NOT autonomous actors—they are interaction shells that delegate to workflows.

**Agent Components:**

```
bmad/agents/{agent-name}/
├── {agent-name}.md              # Agent persona definition (in bmad/)
├── config.yaml                   # Agent configuration
└── {agent-name}-sidecar/
    ├── memories.md               # Persistent preferences, voice profiles, API tracking
    └── workflows/
        ├── {workflow-1}/
        │   ├── workflow.yaml
        │   ├── instructions.md   # External (not embedded in YAML)
        │   └── template.md
        └── {workflow-2}/
            └── ...

.claude/commands/{agent-name}/
└── {agent-name}.md              # Duplicate for Claude Code discovery
```

**Agent Persona Structure:**

```markdown
# Agent Name (e.g., Jarvis - Content Intelligence Lead)

## Persona
- Role: [Primary function]
- Style: [Communication approach]
- Focus: [Core responsibilities]

## Available Commands
1. *workflow-1 - [Description]
2. *workflow-2 - [Description]
...

## Agent Activation
[Greeting message + auto-display command menu]
```

### Agent Roster

#### Jarvis (Content Intelligence Lead)

**Role:** Research, strategy, content creation, voice consistency guardian

**Workflows Owned (7):**
1. `research-topic` - Deep research with intelligent tool routing (WebSearch → Exa → Apify based on depth)
2. `analyze-profile` - Social media profile analysis (Instagram, TikTok, Twitter, LinkedIn, YouTube)
3. `competitive-analysis` - Multi-profile comparison for gap identification
4. `generate-ideas` - Evidence-backed content ideas with hook packs
5. `learn-voice` - Extract rhetorical DNA from 50+ historical posts (Enhanced Voice Profile v2.0)
6. `write-post` - Platform-optimized posts (LinkedIn PAIPS, Twitter threads, Substack essays) **[NEW - NEEDS CREATION]**
7. `write-script` - Video scripts with timestamps, scene descriptions, thumbnail concepts **[NEW - NEEDS CREATION]**

**Skills Triggered (via context creation):**
- deep-web-research (intelligent tool routing: WebSearch/Exa/Firecrawl/Apify)
- post-writer (Justin Welsh PAIPS, Greg Isenberg threads, Paul Graham essays)
- video-script-writer (Ali Abdaal Top 5, MKBHD reviews, YouTube chapters)
- profile-analysis (platform scraping + engagement pattern analysis)
- voice-matcher (10-dimensional rhetorical analysis + confidence scoring)
- platform-formatter (character limits, hashtags, threading)
- research-synthesizer (5 categories: Trends, Data, Quotes, Examples, Gaps)
- evidence-tracker (source quality scoring, citation linking)
- youtube-growth-mastery, youtube-thumbnail-mastery, social-media-research, youtube-research

**Notion Integration:**
- Checks Status: Idea, Research, Next Up
- Updates Status: Idea → Research → Writing → Editing
- Sets Properties: Publish Date, Content Text, Category, Priority, Focus Keywords
- Creates Relations: Links to Keywords DB, Notes DB (research sources)

**Handoff Patterns:**
- Text-only path: Jarvis writes → suggests Zoro (Status: Editing → Posted)
- With visuals path: Jarvis writes → suggests Zoe (Status stays Editing until visuals added)

---

#### Zoe (Visual Production Specialist)

**Role:** Image and video creation using Emily JSON methodology (7-pillar quality ≥7/10) and Veo/HeyGen for videos

**Workflows Owned (7):**
1. `create-single-image` - Platform-optimized images (LinkedIn dark tech, YouTube CTR thumbnails, Instagram graphics)
2. `create-carousel` - Multi-slide carousels (2-10 images) with consistent design system
3. `edit-image` - Image refinement (blur, color correction, object removal, style transfer)
4. `blend-images` - Composite 2-3 images with intelligent blending
5. `create-talking-head` - HeyGen avatar videos with consent verification
6. `create-scene` - B-roll generation and diagram animation via Veo 3
7. `create-cinematic-sequence` - Multi-scene video with stitching and transitions

**Skills Triggered (via context creation):**
- create-image (Emily JSON 10-section methodology, 7-pillar quality evaluation)
- edit-image (pixel-perfect editing via nanobanana)
- blend-images (multi-image compositing)
- veotools-mastery (Veo 3 model selection: fast vs standard vs custom, aspect ratio optimization, async job management)
- platform-specs (aspect ratios: 16:9, 9:16, 1:1, resolution requirements per platform)
- linkedin-design (dark monochrome palette, typography rules, minimal aesthetic)
- youtube-thumbnail-design (MrBeast 6 pillars, Thomas Frank AIDA, CTR psychology)
- mcp-tool-selection (gpt-image-1 vs nanobanana decision logic)
- generating-sid-images (user-specific image generation patterns)

**Tool Selection Logic:**
- **Images:** gpt-image-1 ($0.04-0.08) for LinkedIn/Twitter professional, nanobanana ($0.039) for YouTube/Instagram social
- **Videos:** HeyGen ($0.20-0.50/min) for avatars, Veo 3 fast ($0.30/8s) for b-roll, Fal-Video ($1-3) for cinematic

**Notion Integration:**
- Checks Status: Editing (content ready, needs visuals)
- Keeps Status: Editing (doesn't move to Posted—that's Zoro's job)
- Adds Properties: Image URLs to media properties, thumbnail concepts to "Thumbnail ideas"

**Handoff Patterns:**
- Zoe adds visuals → suggests Zoro for publishing (Status stays Editing)
- Standalone visuals: Zoe creates → saves to Notion with "Posted" status → suggests Zoro

---

#### Zoro (Publishing & Distribution Specialist)

**Role:** Multi-platform publishing via Postiz MCP (primary) and direct APIs (backup), validation, rate limiting, analytics tracking

**Workflows Owned (6+):**
1. `schedule-post` - PRIMARY: Multi-platform scheduling via Postiz MCP (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube) **[NEW - NEEDS CREATION]**
2. `publish-tweet-now` - Immediate Twitter posting via direct API (bypass Postiz for urgent posts)
3. `publish-linkedin-now` - Immediate LinkedIn posting via direct API
4. `publish-youtube-now` - Immediate YouTube upload via YouTube Data API v3
5. `check-rate-limits` - Validate Postiz quotas and direct API limits
6. Additional: 10+ existing workflows for specific post types (linkedin-post-image, post-tweet-with-video, youtube-upload-short, etc.)

**Publishing Strategy:**
- **PRIMARY:** Postiz MCP for all scheduled posts (unified queue, multi-platform consistency, optimal timing)
- **BACKUP:** Direct APIs for immediate "post now" operations when scheduling not appropriate (breaking news, urgent announcements)

**Skills Triggered:**
- None (Zoro is pure API/MCP integration layer—validation and formatting logic embedded in workflow steps, no autonomous skills needed)

**Validation Checks (per platform):**
- **Twitter:** 25k chars Premium / 280 standard, 1-4 images (5MB each), video 512MB, rate limit 1500 posts/month Premium
- **LinkedIn:** 3000 chars, single image (8MB), multi-image carousel (2-20), PDF carousel, video 200MB, rate limit 150 posts/day
- **YouTube:** No text limit, video 128GB, auto-detect Shorts (9:16 + ≤3 min), rate limit 6 uploads/day

**Notion Integration:**
- Checks Status: Posted (ready to publish)
- Updates Status: Editing → Posted (after publishing)
- Sets Properties: Publish Date (actual publish time), future date if scheduled via Postiz
- Prompts User: Manually add Views/Likes/Comments after publishing (Notion doesn't auto-track)

**Handoff Patterns:**
- Final step: Zoro publishes → updates Notion Status to "Posted" → no further agent handoffs

---

## Workflow System

**Complete Workflow Inventory:** See `.bmad-core/data/workflow-registry.yaml` for detailed workflow specifications including purpose, skills triggered (via context creation), inputs/outputs, Notion updates, costs, and dependencies. This section provides definition model and patterns.

### Workflow Definition Model

Workflows are **multi-step process orchestrators** that manage user interaction, state persistence, file I/O, Notion updates, and skill invocation via context creation.

**Workflow Components:**

```
bmad/agents/{agent}/workflows/{workflow-name}/
├── workflow.yaml         # Metadata, elicitation config, step references
├── instructions.md       # External XML process definition (NOT embedded in YAML)
├── template.md           # Optional output template
└── README.md             # Documentation
```

**Workflow YAML Schema:**

```yaml
name: workflow-name
description: One-line workflow purpose
version: "1.0"
owner: agent-name
elicit: true|false        # Enable elicitation-based refinement?

# Metadata for discovery
triggers:                 # What contexts/commands trigger this workflow
  - "research {topic}"
  - "analyze profile"

skills_triggered:         # Which skills this workflow invokes (via context creation)
  - deep-web-research     # Step 1 context: "Research {topic} with depth={depth}"
  - research-synthesizer  # Step 3 context: "Synthesize findings into categories"

# Steps reference external instructions.md
steps_file: instructions.md

# Optional template for output generation
template_file: template.md
```

**Instructions.md Format (External XML):**

```xml
<workflow name="research-topic">
  <step id="1" name="Gather Requirements">
    <goal>Collect research parameters from user</goal>
    <instructions>
      Prompt user for:
      - topic: What to research
      - depth: quick/standard/comprehensive/exhaustive
      - focus_areas: Optional specific angles
    </instructions>
    <outputs>
      - topic
      - depth
      - focus_areas
    </outputs>
  </step>

  <step id="2" name="Execute Research">
    <goal>Perform intelligent tool-routed research</goal>
    <instructions>
      Create context for skill discovery:
      "Research {topic} with depth={depth}, focus on {focus_areas}"

      Expected skill: deep-web-research (autonomously discovered by Claude)
      Skill will route: quick→WebSearch, standard→Exa, comprehensive→Exa+Firecrawl, exhaustive→user approval
    </instructions>
    <outputs>
      - research_results (sources with quality scores)
    </outputs>
  </step>

  <step id="3" name="Synthesize Findings">
    <goal>Organize research into 5 categories</goal>
    <instructions>
      Create context: "Synthesize research findings into categories: Trends, Data, Quotes, Examples, Gaps"

      Expected skill: research-synthesizer
      Generates structured categories with source citations
    </instructions>
    <outputs>
      - synthesis (5 categories with findings)
    </outputs>
  </step>

  <step id="4" name="Generate Content Angles">
    <goal>Create 10-12 evidence-backed content ideas</goal>
    <instructions>
      Based on synthesis, generate specific angles:
      - Hook (question/number/story/reveal)
      - Core argument
      - Evidence backing (from research)
      - Platform recommendation
    </instructions>
    <outputs>
      - angles (10-12 content ideas)
    </outputs>
  </step>

  <step id="5" name="Save Research Brief">
    <goal>Persist results to outputs/</goal>
    <instructions>
      Save to: outputs/projects/{YYYY-MM-DD}-{project-slug}/01-research/research-brief.md

      Include:
      - Topic, depth, tools called, cost breakdown
      - 5 finding categories with sources
      - 10-12 angles
      - All citations
    </instructions>
    <outputs>
      - research_brief_path
    </outputs>
  </step>

  <step id="6" name="Update Notion">
    <goal>Update Content Tracker status</goal>
    <instructions>
      - Find content page by topic (or create if doesn't exist)
      - Update Status: Idea → Research
      - Link research brief URL to Notes relation
      - Set Category and Priority based on synthesis
    </instructions>
    <outputs>
      - notion_page_url
    </outputs>
  </step>
</workflow>
```

### Workflow Standardization Requirements

**MVP Requirement:** ALL workflows must follow external instructions.md pattern (no embedded YAML or JavaScript code blocks).

**Current State:**
- ✅ Jarvis workflows: Already standardized (external instructions.md)
- ⚠️ Zoe workflows: Need migration from embedded YAML to external
- ⚠️ Zoro workflows: Need migration from embedded YAML to external

**Migration Pattern:**

```yaml
# ❌ BEFORE (Anti-pattern - embedded YAML)
steps:
  - name: Step 1
    goal: Do something
    instructions: |
      Multi-line instructions here
      With logic embedded in YAML
    outputs:
      - result1

# ✅ AFTER (Standard pattern - external instructions.md)
steps_file: instructions.md
```

### Elicitation-Based Refinement

**For workflows with `elicit: true`:**

Workflows support multi-turn refinement using numbered elicitation methods:

**Elicitation Menu (presented after draft generation):**

```
Drafted Content:
[Generated content with detailed rationale]

Select 1-9 or just type your question/feedback:

1. Proceed to next step (accept draft)
2. Expand or Contract for Audience
3. Explain Reasoning (CoT Step-by-Step)
4. Critique and Refine
5. Analyze Logical Flow and Dependencies
6. Assess Alignment with Overall Goals
7. Identify Potential Risks and Unforeseen Issues
8. Challenge from Critical Perspective
9. Agile Team Perspective Shift
```

**Elicitation Workflow:**
1. Workflow generates draft content
2. Presents content + rationale + menu (1-9 options)
3. User selects method or provides custom feedback
4. Selected method executes, generates insights
5. User decides: apply changes or return to menu
6. Loop until user selects "Proceed" (option 1)

**Never:** Yes/no questions—always structured numbered options.

---

## Skill Discovery & Execution

### Skill Definition Model

Skills are **autonomous expertise modules** containing methodologies, best practices, and tool orchestration logic. Claude discovers and loads skills based on description matching—skills are NOT explicitly imported by workflows.

**Skill Components:**

```
.claude/skills/{agent-name}/{skill-name}/
├── SKILL.md              # Skill definition with frontmatter
├── reference/            # Supporting documentation
│   ├── methodology.md
│   └── best-practices.md
└── examples/             # Usage examples
    └── example-1.md
```

**SKILL.md Structure:**

```markdown
---
name: skill-name
description: Discovery-optimized description (what, when, keywords)
version: "1.0"
owner: agent-name (primary, but cross-agent usage allowed)
tools:                    # MCPs this skill uses
  - exa
  - firecrawl
  - apify
cost_range: "$0 - $0.50+"
---

# Skill Name

## Purpose
[What this skill does, why it exists]

## When to Use
[Trigger conditions, context patterns that match]

## Instructions
[Step-by-step methodology for Claude to execute]

## Tool Orchestration
[How to select and route between tools based on parameters]

## Quality Standards
[Success criteria, validation checks]

## Examples
[Concrete usage examples with inputs/outputs]

## Reference Documentation
[Links to methodology docs in reference/ folder]
```

### Description Field Optimization

**CRITICAL:** The `description` field in SKILL.md frontmatter is the PRIMARY mechanism for skill discovery. Optimize for:

1. **What the skill does** (capabilities)
2. **When to use it** (trigger conditions)
3. **Key terms users/workflows mention** (discovery keywords)

**Examples from Current System:**

**post-writer skill:**
```yaml
description: Generate platform-optimized social media posts using proven formulas (Justin Welsh PAIPS for LinkedIn, Greg Isenberg questions for Twitter, Paul Graham essays for Substack). Use when creating LinkedIn posts, Twitter threads, Substack essays, or any social media content requiring voice-matched writing.
```
**Triggers:** "LinkedIn post", "Twitter thread", "social media content", "voice-matched"

**deep-web-research skill:**
```yaml
description: Multi-tool research orchestrator using Exa neural search, Apify platform scrapers, Firecrawl web scraping, and WebSearch. Intelligently routes between tools based on depth parameter (quick=free, comprehensive=paid). Use when researching topics, gathering web data, analyzing trends, or scraping social media platforms.
```
**Triggers:** "research", "web data", "Exa", "Apify", "scraping", "trends"

**veotools-mastery skill:**
```yaml
description: Google Veo 2.0/3.0/3.1 video generation expertise for animating diagrams, creating b-roll scenes, and image-to-video conversion. Knows model selection (veo-3.1-fast for iteration, veo-3.1-standard for quality), aspect ratio optimization (16:9 YouTube, 9:16 Shorts), and async job management. Use when generating videos from images, animating diagrams, or creating b-roll footage.
```
**Triggers:** "animate diagram", "video from image", "b-roll", "Veo"

### Avoiding Skill Conflicts

When skills have overlapping domains, use **distinct trigger terms** in descriptions:

```yaml
# deep-web-research
description: Web scraping and neural search using Exa, Apify, Firecrawl. Use for general web research, trending topics, and data gathering.

# youtube-research
description: YouTube-specific research including video analysis, transcript extraction, retention patterns. Use when researching YouTube content, analyzing videos, or studying creator strategies.

# social-media-research
description: Platform trend analysis for Twitter, LinkedIn, Instagram using social-media-mcp and Brave/Perplexity. Use when tracking trending topics, viral content, or platform-specific trends.
```

### Discovery Process

**When workflow step creates context:** "Research {topic} with depth=comprehensive"

**Claude's discovery algorithm:**
1. Analyzes context: task=research, depth=comprehensive, domain=web
2. Scans available skills for description matches
3. Finds: deep-web-research (description contains "research", "Exa", "Apify", "depth parameter")
4. Loads deep-web-research/SKILL.md
5. Executes skill instructions with available MCP tools
6. Returns research results to workflow

**Workflow authors optimize for discovery by:**
- Using specific task terminology ("research" not "find stuff")
- Including parameters mentioned in skill descriptions ("depth=comprehensive" matches deep-web-research's "depth parameter")
- Providing rich context (topic, platform, format) that skills can match against

### Skill Execution Model

**Skills run as autonomous VMs:**

1. Claude loads SKILL.md (full file, not streaming)
2. Skill has access to all available MCPs
3. Skill executes instructions step-by-step
4. Long-running operations show progress indicators (research 1-5 min, image generation 30-60 sec, video generation 2-5 min)
5. Skill returns structured results to workflow
6. User sees skill activity: "Using deep-web-research skill with depth=comprehensive..."

**Skills vs Direct MCP Calls:**

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Skill invocation** | Complex tool orchestration, intelligent routing, quality validation | deep-web-research (routes WebSearch → Exa → Apify based on depth) |
| **Direct MCP call** | Simple single-tool operations, no routing logic needed | Zoro workflows: direct Postiz MCP for scheduling, direct Twitter API for posting |

---

## Tool Integration Strategy

**Complete Tool Inventory:** See `.bmad-core/data/tool-registry.yaml` for detailed tool specifications including cost models, performance metrics, success rates, alternatives considered, and evolution strategy. This section provides overview and decision matrices.

### MCP Server Registry

**Primary MCPs:**

| MCP Server | Purpose | Tools Used | Cost Model |
|------------|---------|------------|------------|
| **Notion** | Collaborative state, status workflow, metadata | notion-search, notion-fetch, notion-update-page, notion-create-pages | Free (workspace plan) |
| **Postiz** | PRIMARY multi-platform publishing | integrationSchedulePostTool, integrationList, integrationSchema | Free tier (self-hosted) |
| **Cloudinary** | **CRITICAL** Media hosting for public URLs | upload-asset, asset-update, search-assets, transform-asset | Free tier + pay-per-use |
| **fal-video** | **PRIMARY** Video generation hub | execute_custom_model (Veo 3, Luma Ray 2, Kling, Pixverse, Sora, etc.) | $0.30-3.00 per video |
| **Exa** | Neural search, web research | search (neural + similar results) | $0.05-0.15 per query |
| **Firecrawl** | Web scraping with caching | firecrawl_scrape, firecrawl_crawl, firecrawl_search | $0.10-0.30 per scrape |
| **Apify** | Platform scrapers | apify/instagram-scraper, clockworks/tiktok-scraper, scraper_one/x-profile-posts | $0.02-0.50 per actor |
| **nanobanana** | Image generation (Gemini 2.5 Flash) | generate_image, edit_image, upload_file | $0.039 per image |
| **gpt-image-1** | Image generation (DALL-E 3) | create_image, create_image_edit | $0.04-0.08 per image |
| **mcp-twitter** | Twitter API (Premium) | create_twitter_post, reply_twitter_tweet, get_last_tweets_options | Included in Premium ($8/mo) |
| **youtube-uploader-mcp** | YouTube Data API v3 | upload_video, get_remaining_quota | Free (API quota) |
| **social-media-mcp** | Brave + Perplexity trends | research_topic, get_trending_topics | Free (Brave) + Perplexity |
| **chrome-devtools** | Browser automation for scraping | navigate_page, take_snapshot, fill_form | Free (built-in) |
| **serena** | IDE code analysis & file operations | find_symbol, search_for_pattern, list_dir | Free (IDE integration) |

**Custom Modules (Node.js):**

| Module | Purpose | API | Cost |
|--------|---------|-----|------|
| **twitter-api-client** | Direct Twitter Premium API | OAuth 2.0, 25k char posts, threading | $8/month Premium |
| **linkedin-api-client** | Direct LinkedIn API | OAuth 2.0, posts/carousels/PDFs/videos | Free (API quota) |

### Tool Selection Decision Matrix

**Research:**

| Depth | Tools Used | Cost | Use Case |
|-------|------------|------|----------|
| quick | WebSearch (free) | $0 | Fast initial scan, 10-20 results |
| standard | Exa neural search | $0.05 | Quality research, 10 auto + 5 similar |
| comprehensive | Exa + Firecrawl | $0.10-0.15 | Detailed analysis with content scraping |
| exhaustive | Exa + Firecrawl + Apify | $0.50+ (user approval) | Complete deep dive with platform scraping |

**Images:**

| Platform | Tool | Cost | Rationale |
|----------|------|------|-----------|
| LinkedIn, Twitter | gpt-image-1 (DALL-E 3) | $0.04-0.08 | Professional quality needed, text rendering 9.5/10 |
| YouTube, Instagram | nanobanana (Gemini 2.5) | $0.039 | Social media volume, speed priority (10-15s) |
| Custom high-quality | gpt-image-1 | $0.04-0.08 | User explicitly requests best quality |

**Videos:**

| Format | Tool | Cost | Rationale |
|--------|------|------|-----------|
| Talking head avatars | HeyGen | $0.20-0.50/min | High-quality faces, consent verification |
| B-roll, diagram animation | Veo 3 fast | $0.30/8s | Fast iteration (60s generation) |
| Production b-roll | Veo 3 standard | $0.50/8s | Highest quality (120s generation) |
| Cinematic sequences | Fal-Video (Luma, Kling) | $1-3/video | Multi-scene storytelling |

**Platform Scraping:**

| Platform | Apify Actor | Cost | Alternative |
|----------|-------------|------|------------|
| Instagram | apify/instagram-scraper | ~$0.05 | Manual Instagram Graph API (if access) |
| TikTok | clockworks/tiktok-scraper | ~$0.05 | TikTok Research API (if access) |
| Twitter | apidojo/twitter-scraper-lite | $0.02-0.04 | Direct Twitter Premium API |
| LinkedIn | apimaestro/linkedin-profile-posts | $0.10-0.15 | LinkedIn API (if granted access) |
| YouTube | starvibe/youtube-transcripts | $0.05/video | YouTube Data API v3 (free quota) |

### Tool Evolution Strategy

**Principle:** Current tool choices documented as "best practice as of [date]" with explicit mechanism to update as ecosystem matures.

**Tool Registry (to be created in Story 7.4):**

```yaml
# bmad/tool-registry.yaml

research:
  free:
    - tool: WebSearch
      cost: $0
      quality: 6/10
      last_updated: "2025-10-31"
      status: active

  paid_low:
    - tool: Exa
      cost: $0.05-0.15
      quality: 8/10
      last_updated: "2025-10-31"
      status: active
      notes: Neural search, 10 auto + 5 similar results

  paid_high:
    - tool: Apify
      cost: $0.02-0.50
      quality: 9/10
      last_updated: "2025-10-31"
      status: active
      notes: Platform-specific scrapers, varies by actor

images:
  cost_optimized:
    - tool: nanobanana
      model: Gemini 2.5 Flash
      cost: $0.039
      quality: 7.5/10
      speed: 10-15s
      last_updated: "2025-10-31"
      status: active

  quality_optimized:
    - tool: gpt-image-1
      model: DALL-E 3
      cost: $0.04-0.08
      quality: 9.5/10
      speed: 20-30s
      last_updated: "2025-10-31"
      status: active

videos:
  avatars:
    - tool: HeyGen
      cost: $0.20-0.50/min
      quality: 9/10
      last_updated: "2025-10-31"
      status: active

  b_roll:
    - tool: veotools (Veo 3 fast)
      cost: $0.30/8s
      quality: 8/10
      speed: 60s generation
      last_updated: "2025-10-31"
      status: active

    - tool: veotools (Veo 3 standard)
      cost: $0.50/8s
      quality: 9/10
      speed: 120s generation
      last_updated: "2025-10-31"
      status: active

  cinematic:
    - tool: fal-video (Luma Ray 2)
      cost: $1-3
      quality: 9/10
      last_updated: "2025-10-31"
      status: active
```

**Monthly Optimization Process:**
1. Review tool-registry.yaml
2. Compare cost/quality/speed actual vs documented
3. Test new tools/models that have emerged
4. Update tool selection in skills (workflow callers unaffected)
5. Document changes with rationale

---

## Data Flow & State Management

### Dual Storage Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      WORKFLOW EXECUTION                          │
└────────────┬────────────────────────────────┬───────────────────┘
             │                                │
             │ Complete Artifacts             │ Metadata & Status
             ▼                                ▼
    ┌────────────────────┐           ┌────────────────────┐
    │  LOCAL STORAGE     │           │  NOTION WORKSPACE   │
    │  outputs/          │           │  Content Tracker    │
    ├────────────────────┤           ├────────────────────┤
    │ • Research briefs  │           │ • Status workflow   │
    │ • Generated posts  │           │ • Publish dates     │
    │ • Images (PNG)     │           │ • Media URLs        │
    │ • Videos (MP4)     │           │ • Views/Likes       │
    │ • Handoff JSON     │           │ • Relations         │
    │ • Session metadata │           │   - Keywords        │
    │                    │           │   - Channels        │
    │ Git-tracked:       │           │   - Tasks           │
    │ • Voice profiles   │           │   - Notes (research)│
    │ • Agent memories   │           │                    │
    └────────────────────┘           └────────────────────┘
             │                                │
             │ Bidirectional Linking          │
             └────────────┬───────────────────┘
                          │
                          ▼
              Notion page property "local_files"
              contains URL to outputs/ folder
```

### Centralized Output Management

**Project-Centric Folder Structure (Story 7.6):**

```
outputs/
├── templates/
│   └── project-structure/      # Template for new projects (6 lifecycle stages)
│       ├── 00-session/
│       ├── 01-research/        # Shared across platforms
│       ├── 02-ideas/           # Shared across platforms
│       ├── 03-drafts/          # Platform-specific text
│       │   ├── linkedin/
│       │   ├── twitter/
│       │   ├── youtube/
│       │   ├── instagram/
│       │   ├── tiktok/
│       │   ├── substack/
│       │   └── facebook/
│       ├── 04-media/           # Platform-agnostic REUSABLE media
│       │   ├── images/
│       │   └── videos/
│       ├── 05-published/       # MERGED final + published (per platform)
│       │   ├── linkedin/
│       │   ├── twitter/
│       │   ├── youtube/
│       │   ├── instagram/
│       │   ├── tiktok/
│       │   ├── substack/
│       │   └── facebook/
│       └── handoffs/
│
└── projects/
    └── {YYYY-MM-DD}-{project-slug}/
        ├── 00-session/
        │   ├── metadata.json          # Project metadata
        │   ├── costs.json             # Cost tracking per workflow
        │   └── session-log.md         # Execution log
        ├── 01-research/
        │   ├── research-brief.md      # Deep research results
        │   └── competitive-analysis.md
        ├── 02-ideas/
        │   ├── idea-cards.md          # Generated content ideas
        │   └── hook-pack.md           # A/B testing hooks
        ├── 03-drafts/                 # Platform-specific text content
        │   ├── linkedin/
        │   │   ├── post-v1.md
        │   │   └── post-v2.md         # Iterations
        │   ├── twitter/
        │   │   └── thread-v1.md
        │   └── youtube/
        │       └── script-v1.md
        ├── 04-media/                  # Platform-agnostic REUSABLE media
        │   ├── images/
        │   │   ├── thumbnail-main.png        # Used for LinkedIn + Twitter
        │   │   ├── carousel-slide-01.png
        │   │   ├── carousel-slide-02.png
        │   │   └── metadata.json             # Tracks platform usage
        │   └── videos/
        │       ├── short-vertical.mp4        # Used for YouTube + Instagram
        │       ├── animated-diagram.mp4
        │       └── metadata.json
        ├── 05-published/              # MERGED final + published (per platform)
        │   ├── linkedin/
        │   │   ├── post.md                   # Final published version
        │   │   ├── url.md                    # https://linkedin.com/posts/...
        │   │   ├── publish-confirmation.json # Post ID, timestamp
        │   │   └── analytics-2025-11-06.md   # Performance tracking
        │   ├── twitter/
        │   │   ├── thread.md
        │   │   ├── urls.md                   # All tweet URLs
        │   │   └── analytics-2025-11-06.md
        │   └── youtube/
        │       ├── script.md
        │       ├── url.md
        │       └── analytics-2025-11-06.md
        └── handoffs/
            ├── jarvis-to-zoe.json     # Agent handoff packages
            └── zoe-to-zoro.json
```

### 6-Stage Lifecycle Explained

**Philosophy:** Content progresses through 6 numbered stages from research to published, with platform-specific organization where content diverges and platform-agnostic storage where content is shared.

**Stage Breakdown:**

**00-session/** - Project Tracking & Coordination
- `metadata.json` - Complete project history (costs, duration, files, Notion linking)
- `session-log.md` - Timestamped execution log of all agent actions
- **When Created:** Automatically when project starts
- **Populated By:** All agents (append to log, update metadata)

**01-research/** - Shared Research (Platform-Agnostic)
- Research briefs, competitive analysis, sources
- **Philosophy:** Research is platform-agnostic—same research used for LinkedIn post, Twitter thread, YouTube video
- **Populated By:** Jarvis (research-topic, analyze-profile, competitive-analysis workflows)

**02-ideas/** - Shared Ideas (Platform-Agnostic)
- Idea cards, hook packs, content calendars
- **Philosophy:** Ideas are platform-agnostic—same idea adapted for different platforms in 03-drafts/
- **Populated By:** Jarvis (generate-ideas workflow)

**03-drafts/** - Platform-Specific Text Content
- **7 Platform Subfolders:** linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/
- Each platform folder contains iterative drafts: post-v1.md, post-v2.md, thread-v1.md, script-v1.md
- **Why Platform-Specific:** LinkedIn post (PAIPS, <300 words) differs from Twitter thread (questions, numbered tweets) differs from YouTube script (timestamps, scenes)
- **Multi-Content Per Platform:** LinkedIn can have post.md + carousel-post.md + video-post.md from same research
- **Populated By:** Jarvis (write-post, write-script workflows when created)

**04-media/** - Platform-Agnostic REUSABLE Media ⚡ **CRITICAL DESIGN**
- **2 Simple Subfolders:** images/, videos/
- **Philosophy:** Media is REUSABLE across platforms—generate once, reference from multiple platform folders
- **Naming Convention:**
  - ✅ Descriptive, not platform-specific: `thumbnail-main.png`, `short-vertical.mp4`
  - ✅ Platform variant suffix only if needed: `thumbnail-youtube.png` (CTR-optimized, different from main)
  - ❌ Never: `thumbnail-linkedin.png` (implies can't reuse for Twitter)
- **Metadata Tracking:** `04-media/images/metadata.json` and `04-media/videos/metadata.json` track `used_in_platforms: ["linkedin", "twitter"]` for each asset
- **Example:** Generate `thumbnail-main.png` once → Reference from 05-published/linkedin/, 05-published/twitter/, 05-published/facebook/
- **Cost Efficiency:** ONE generation ($0.08) serves THREE platforms vs THREE generations ($0.24)
- **Populated By:** Zoe (create-single-image, create-carousel, create-scene workflows)

**05-published/** - Published Content (MERGED Final + Published, Per Platform)
- **7 Platform Subfolders:** linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/
- Each platform folder contains:
  - `post.md` or `thread.md` or `script.md` (final published version)
  - `url.md` (platform URL: https://linkedin.com/posts/...)
  - `publish-confirmation.json` (post ID, timestamp, rate limits)
  - `analytics-YYYY-MM-DD.md` (performance tracking updated over time)
- **Philosophy:** "Final approved" = "Published" or "Scheduled to publish"—no intermediate limbo state
- **Media References:** Text files reference ../../../04-media/images/thumbnail-main.png (no duplication)
- **Status Mapping:**
  - Notion "Editing" ↔ Local has content in 03-drafts/ and 04-media/
  - Notion "Posted" ↔ Local has content in 05-published/ with URLs
- **Independent Lifecycles:** LinkedIn published, YouTube still drafting (each platform at different stage)
- **Populated By:** Zoro (schedule-post, publish-*-now workflows)

**handoffs/** - Agent Coordination Packages
- JSON packages for agent handoffs (jarvis-to-zoe.json, zoe-to-zoro.json)
- handoff-log.md with timeline
- **Populated By:** All agents when creating handoffs

---

**Metadata JSON Schema:**

```json
{
  "project_id": "2025-10-31-ai-agents-linkedin-post",
  "notion_page_url": "https://notion.so/...",
  "created_at": "2025-10-31T10:15:00Z",
  "agents_involved": ["Jarvis", "Zoe", "Zoro"],
  "workflows_executed": [
    {
      "workflow": "research-topic",
      "agent": "Jarvis",
      "started_at": "2025-10-31T10:15:00Z",
      "completed_at": "2025-10-31T10:18:23Z",
      "cost": 0.05,
      "skills_triggered": ["deep-web-research", "research-synthesizer"]
    },
    {
      "workflow": "write-post",
      "agent": "Jarvis",
      "started_at": "2025-10-31T10:20:00Z",
      "completed_at": "2025-10-31T10:23:15Z",
      "cost": 0,
      "skills_triggered": ["post-writer", "voice-matcher", "platform-formatter"]
    },
    {
      "workflow": "create-single-image",
      "agent": "Zoe",
      "started_at": "2025-10-31T10:25:00Z",
      "completed_at": "2025-10-31T10:26:45Z",
      "cost": 0.04,
      "skills_triggered": ["create-image", "linkedin-design"]
    }
  ],
  "total_cost": 0.09,
  "total_duration_minutes": 12,
  "file_inventory": {
    "research": ["01-research/research-brief.md"],
    "drafts": {
      "linkedin": ["03-drafts/linkedin/post-v1.md", "03-drafts/linkedin/post-v2.md"],
      "twitter": ["03-drafts/twitter/thread-v1.md"],
      "youtube": [],
      "instagram": [],
      "tiktok": [],
      "substack": [],
      "facebook": []
    },
    "media": {
      "images": ["04-media/images/thumbnail-main.png"],
      "videos": []
    },
    "published": {
      "linkedin": ["05-published/linkedin/post.md", "05-published/linkedin/url.md"],
      "twitter": [],
      "youtube": [],
      "instagram": [],
      "tiktok": [],
      "substack": [],
      "facebook": []
    },
    "handoffs": ["handoffs/jarvis-to-zoe.json", "handoffs/zoe-to-zoro.json"]
  },
  "publishing_status": {
    "linkedin": {
      "published": true,
      "published_at": "2025-10-31T14:00:00Z",
      "post_url": "https://linkedin.com/posts/...",
      "views": 1250,
      "likes": 87,
      "comments": 12
    }
  }
}
```

**Naming Conventions:**
- **Folders:** lowercase-kebab-case (e.g., `linkedin-post-ai-agents`)
- **Files:** lowercase-kebab-case (e.g., `research-brief.md`, `animated-diagram.mp4`)
- **No mixed case, underscores, or spaces** (cross-platform consistency)

### Notion Content Tracker Schema

**Database:** Content Tracker
**Data Source URL:** `collection://956447a76e7b4b2eafb1e4c9adfcbcf3`

**Properties Used by Agents:**

| Property | Type | Agent Usage | Example |
|----------|------|-------------|---------|
| **Name** | Title | Jarvis creates, all read | "AI Agents: The Future of Work" |
| **Status** | Status | All update | Idea → Research → Writing → Editing → Posted |
| **Channel** | Relation (My Channels DB) | Jarvis links, Zoro validates | LinkedIn, Twitter, YouTube |
| **Category** | Select | Jarvis sets based on topic | AI & Tech, Career Growth, Personal |
| **Priority** | Select | Jarvis sets, user overrides | High, Medium, Low |
| **Publish Date** | Date | Jarvis estimates, Zoro confirms actual | 2025-11-05 |
| **Content Text** | Long Text | Jarvis populates full post/script | Full post body or video script |
| **Thumbnail ideas** | Text | Jarvis (write-script) generates | "3 CTR-optimized concepts with MrBeast pillars" |
| **YouTube Title ideas** | Text | Jarvis (write-script) generates | "60-70 char keyword-rich titles" |
| **Views** | Number | Zoro prompts user to add post-publish | 1250 |
| **Likes** | Number | Zoro prompts user to add post-publish | 87 |
| **Comments** | Number | Zoro prompts user to add post-publish | 12 |
| **Focus Keywords** | Relation (Keywords DB) | Jarvis links from research | "AI agents", "automation", "productivity" |
| **Notes** | Relation (Action Items DB) | Jarvis links research briefs | Research brief page URL |
| **local_files** | URL | All agents add | Link to outputs/projects/{slug}/ |

**Status Workflow Transitions:**

```
User creates idea in Notion
    │
    ▼
[Idea] ──Jarvis: research-topic──▶ [Research] ──Jarvis: write-post──▶ [Writing]
    │                                                                       │
    │                                                                       ▼
    │                                                                  [Editing]
    │                                                                  ╱      ╲
    │                                                                 ╱        ╲
    │                                    Text-only: Jarvis suggests Zoro      Visuals needed: Jarvis suggests Zoe
    │                                                │                              │
    │                                                │                              ▼
    │                                                │                         Zoe: create-image
    │                                                │                              │
    │                                                │                              │ (Status stays Editing)
    │                                                │                              │
    │                                                │                         Zoe suggests Zoro
    │                                                │                              │
    │                                                ▼◀─────────────────────────────┘
    │                                           Zoro: publish
    │                                                │
    │                                                ▼
    └─────Manual archive after performance──▶  [Posted] ───Manual───▶ [Archived]
                 analysis complete
```

---

## Coordination Mechanisms

### Agent Handoff Protocol

**Handoff Package JSON Schema:**

```json
{
  "handoff_id": "jarvis-to-zoe-2025-10-31-10-25",
  "source_agent": "Jarvis",
  "target_agent": "Zoe",
  "content_type": "linkedin_post",
  "platform_specs": {
    "platform": "LinkedIn",
    "format": "single_image",
    "aspect_ratio": "1200x627",
    "design_choice": "dark_tech_monochrome"
  },
  "file_paths": {
    "post_content": "outputs/projects/2025-10-31-ai-agents-linkedin/03-drafts/linkedin-post-v2.md",
    "research_brief": "outputs/projects/2025-10-31-ai-agents-linkedin/01-research/research-brief.md"
  },
  "metadata": {
    "voice_version": "Enhanced Voice Profile v2.0",
    "voice_confidence": 8.7,
    "voice_mode": "Analyst",
    "quality_scores": {
      "evidence_backing": 9,
      "platform_compliance": 10,
      "voice_consistency": 8.7
    },
    "timestamp": "2025-10-31T10:25:00Z"
  },
  "notion_context": {
    "page_url": "https://notion.so/...",
    "current_status": "Editing",
    "focus_keywords": ["AI agents", "automation", "productivity"]
  },
  "suggested_next_step": "Generate LinkedIn professional dark tech image optimized for 1200x627"
}
```

**Handoff Locations:**
- **Local:** `outputs/projects/{slug}/handoffs/{source}-to-{target}.json`
- **Notion:** Key metadata summarized in page properties (voice_confidence, quality_scores)

### Routing Decision Tree

```
Content Idea Created (Notion Status: Idea)
    │
    ▼
Jarvis: research-topic (Status: Idea → Research)
    │
    ▼
Jarvis: write-post (Status: Research → Writing → Editing)
    │
    ├─────────────────────────────────────────────┐
    │                                             │
    ▼                                             ▼
Text-only post?                           Needs visuals?
    │                                             │
    ▼                                             ▼
Jarvis → Zoro                            Jarvis → Zoe
(Handoff: post content)                  (Handoff: post + design specs)
    │                                             │
    │                                             ▼
    │                                      Zoe generates visuals
    │                                      (Status stays Editing)
    │                                             │
    │                                             ▼
    │                                        Zoe → Zoro
    │                                      (Handoff: post + media URLs)
    │                                             │
    └─────────────────┬───────────────────────────┘
                      │
                      ▼
              Zoro: schedule-post (PRIMARY)
              OR publish-{platform}-now (backup)
                      │
                      ▼
              Status: Editing → Posted
              Update Publish Date, prompt for metrics
                      │
                      ▼
              User manually archives after analysis
              Status: Posted → Archived
```

**Alternative Path: Standalone Visuals**

```
Zoe: create-image (standalone graphic, no associated post)
    │
    ▼
Save to Notion with Status: Posted
    │
    ▼
Zoe → Zoro
(Handoff: image only, no post content)
    │
    ▼
Zoro: publish-{platform}-now (direct image post)
    │
    ▼
Update Notion with platform URL and metrics
```

### Notion Status Awareness

**How Agents Check Status:**

```python
# Conceptual example (actual implementation via Notion MCP)

# Jarvis checks for work to do
notion_pages = notion_search(status=["Idea", "Research", "Next Up"])
if pages_with_status_idea:
    suggest_workflow("research-topic")
elif pages_with_status_research:
    suggest_workflow("write-post")

# Zoe checks for visuals needed
notion_pages = notion_search(status="Editing", has_media=False)
if pages_needing_visuals:
    suggest_workflow("create-single-image" or "create-carousel")

# Zoro checks for content ready to publish
notion_pages = notion_search(status="Posted", published=False)
if pages_ready_to_publish:
    suggest_workflow("schedule-post" or "publish-{platform}-now")
```

**Status Update Pattern:**

```python
# Workflow completes, updates Notion
notion_update_page(
    page_id=notion_page_id,
    properties={
        "Status": "Writing",  # Transition from Research
        "Content Text": generated_post_content,
        "Publish Date": estimated_date,
        "local_files": f"outputs/projects/{project_slug}/"
    }
)
```

---

## Extension Decision Framework

### When to Create: Agent vs Workflow vs Skill

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXTENSION DECISION TREE                       │
└─────────────────────────────────────────────────────────────────┘

Question: "I want to add [new capability]"

Step 1: Does this need a NEW PERSONA/INTERFACE?
    │
    ├─ YES → Create new AGENT
    │   Examples:
    │   - Email newsletter generation (distinct from social media)
    │   - Podcast production (audio-first workflows)
    │   - Analytics dashboard agent (reads metrics, suggests optimizations)
    │
    └─ NO → Proceed to Step 2

Step 2: Is this a MULTI-STEP PROCESS with user interaction?
    │
    ├─ YES → Create new WORKFLOW (add to existing agent)
    │   Examples:
    │   - Jarvis: write-substack-essay (new content format)
    │   - Zoe: create-animated-explainer (multi-scene video)
    │   - Zoro: publish-to-tiktok (new platform)
    │
    └─ NO → Proceed to Step 3

Step 3: Is this AUTONOMOUS EXPERTISE that multiple workflows could use?
    │
    ├─ YES → Create new SKILL
    │   Examples:
    │   - seo-optimizer (reusable across write-post, write-script)
    │   - caption-generator (reusable across create-image, create-video)
    │   - trending-topic-tracker (reusable across research, generate-ideas)
    │
    └─ NO → Proceed to Step 4

Step 4: Is this a simple TOOL CALL with no orchestration?
    │
    ├─ YES → Add direct MCP call to workflow (no skill needed)
    │   Examples:
    │   - Zoro workflows: direct Postiz MCP for scheduling
    │   - Simple API calls with no routing logic
    │
    └─ NO → Re-evaluate: might be extending existing component
```

### Agent Extension Guidelines

**Create New Agent When:**
- Distinct user-facing persona needed (different communication style, focus area)
- Separate workflow menu makes sense (5+ unrelated workflows would clutter existing agent)
- Different MCP tool ecosystem (agent specializes in tools existing agents don't use)

**Agent Creation Pattern:**

1. Create agent definition files:
   ```
   .claude/commands/{agent-name}/{agent-name}.md
   bmad/agents/{agent-name}/{agent-name}.md
   bmad/agents/{agent-name}/config.yaml
   bmad/agents/{agent-name}/{agent-name}-sidecar/memories.md
   ```

2. Define persona in agent.md:
   ```markdown
   # Agent Name
   ## Persona
   - Role: [Primary function]
   - Style: [Communication approach]
   - Focus: [Core responsibilities]

   ## Available Commands
   1. *workflow-1 - [Description]
   ...
   ```

3. Agent auto-discovered by Claude Code (no registry update needed)

**Current Agents (for reference):**
- Jarvis: Content intelligence (research, writing, voice)
- Zoe: Visual production (images, videos)
- Zoro: Publishing (multi-platform distribution)

**Potential Future Agents:**
- Newsletter Agent: Email newsletter generation (Substack, ConvertKit, Beehiiv)
- Analytics Agent: Performance analysis and optimization suggestions
- Podcast Agent: Audio content production (scripts, editing, distribution)

### Workflow Extension Guidelines

**Create New Workflow When:**
- Multi-step process with user interaction at each step
- State management needed (pause/resume support)
- Orchestrates multiple skills in sequence
- Updates Notion status during execution

**Workflow Creation Pattern:**

1. Create workflow folder:
   ```
   bmad/agents/{agent}/workflows/{workflow-name}/
   ├── workflow.yaml
   ├── instructions.md      # External (not embedded)
   ├── template.md          # Optional
   └── README.md
   ```

2. Define workflow.yaml:
   ```yaml
   name: workflow-name
   description: One-line purpose
   owner: agent-name
   elicit: true|false
   skills_triggered:
     - skill-1
     - skill-2
   steps_file: instructions.md
   ```

3. Write instructions.md (external XML format):
   ```xml
   <workflow name="workflow-name">
     <step id="1" name="Step Name">
       <goal>What this step accomplishes</goal>
       <instructions>How to execute</instructions>
       <outputs>What this step produces</outputs>
     </step>
     ...
   </workflow>
   ```

4. Workflow auto-appears in agent menu (no manual registration)

**Current Workflows by Agent:**
- Jarvis (7): research-topic, analyze-profile, competitive-analysis, generate-ideas, learn-voice, write-post [NEW], write-script [NEW]
- Zoe (7): create-single-image, create-carousel, edit-image, blend-images, create-talking-head, create-scene, create-cinematic-sequence
- Zoro (6+): schedule-post [NEW], publish-tweet-now, publish-linkedin-now, publish-youtube-now, check-rate-limits, plus 10+ specific post type workflows

### Skill Extension Guidelines

**Create New Skill When:**
- Autonomous expertise needed (runs without user interaction)
- Reusable across multiple workflows
- Orchestrates complex tool selection/routing
- Contains methodology/best practices (not just API calls)

**Skill Creation Pattern:**

1. Create skill folder:
   ```
   .claude/skills/{agent-name}/{skill-name}/
   ├── SKILL.md
   ├── reference/
   │   └── methodology.md
   └── examples/
       └── example-1.md
   ```

2. Define SKILL.md with discovery-optimized description:
   ```markdown
   ---
   name: skill-name
   description: Discovery-optimized (what, when, keywords)
   tools:
     - mcp-1
     - mcp-2
   cost_range: "$0 - $0.50"
   ---

   # Skill Name
   ## Purpose
   ## When to Use (trigger conditions)
   ## Instructions (step-by-step methodology)
   ## Tool Orchestration
   ## Quality Standards
   ## Examples
   ```

3. Skill auto-discovered by Claude via description matching

**Current Skills by Agent:**
- Jarvis (12): deep-web-research, post-writer, video-script-writer, profile-analysis, voice-matcher, platform-formatter, research-synthesizer, evidence-tracker, youtube-growth-mastery, youtube-thumbnail-mastery, social-media-research, youtube-research
- Zoe (9): create-image, edit-image, blend-images, veotools-mastery, platform-specs, linkedin-design, youtube-thumbnail-design, mcp-tool-selection, generating-sid-images
- Shared (2): visual-prompt-mastery, skill-creator

### Tool/MCP Integration Guidelines

**Add Direct MCP Call When:**
- Simple single-tool operation (no routing logic)
- No autonomous expertise needed
- Workflow has all context to call tool directly

**Example: Zoro workflows use direct MCPs**
```yaml
# schedule-post workflow (to be created)
steps:
  - Call Postiz MCP directly (integrationSchedulePostTool)
  - No skill needed: workflow has all params (platforms, content, media, date)
```

**Create Skill for MCP When:**
- Complex tool orchestration (multiple MCPs, routing logic)
- Quality validation needed
- Reusable across workflows

**Example: deep-web-research skill orchestrates multiple MCPs**
```
Skill routes based on depth parameter:
- quick → WebSearch MCP
- standard → Exa MCP
- comprehensive → Exa + Firecrawl MCPs
- exhaustive → Exa + Firecrawl + Apify MCPs (user approval)
```

---

## Repository Structure

```
social-media-manager/
├── .claude/
│   ├── commands/                    # Agent menu definitions (Claude Code reads)
│   │   ├── jarvis/
│   │   │   └── jarvis.md
│   │   ├── zoe/
│   │   │   └── zoe.md
│   │   └── zoro/
│   │       └── zoro.md
│   │
│   └── skills/                      # Skill knowledge modules (Claude Code Skills)
│       ├── jarvis/
│       │   ├── deep-web-research/
│       │   │   ├── SKILL.md
│       │   │   ├── reference/
│       │   │   └── examples/
│       │   ├── post-writer/
│       │   ├── video-script-writer/
│       │   ├── profile-analysis/
│       │   ├── voice-matcher/
│       │   ├── platform-formatter/
│       │   ├── research-synthesizer/
│       │   ├── evidence-tracker/
│       │   ├── youtube-growth-mastery/
│       │   ├── youtube-thumbnail-mastery/
│       │   ├── social-media-research/
│       │   └── youtube-research/
│       │
│       ├── zoe/
│       │   ├── create-image/
│       │   ├── edit-image/
│       │   ├── blend-images/
│       │   ├── veotools-mastery/
│       │   ├── platform-specs/
│       │   ├── linkedin-design/
│       │   ├── youtube-thumbnail-design/
│       │   ├── mcp-tool-selection/
│       │   └── generating-sid-images/
│       │
│       └── shared/                  # Cross-agent skills
│           ├── visual-prompt-mastery/
│           └── skill-creator/
│
├── bmad/
│   ├── agents/                      # Agent implementations (source of truth)
│   │   ├── jarvis/
│   │   │   ├── jarvis.md            # Agent definition
│   │   │   ├── config.yaml
│   │   │   └── jarvis-sidecar/
│   │   │       ├── memories.md      # Voice profiles, preferences, API tracking
│   │   │       └── workflows/
│   │   │           ├── research-topic/
│   │   │           │   ├── workflow.yaml
│   │   │           │   ├── instructions.md
│   │   │           │   └── template.md
│   │   │           ├── analyze-profile/
│   │   │           ├── competitive-analysis/
│   │   │           ├── generate-ideas/
│   │   │           ├── learn-voice/
│   │   │           ├── write-post/         # NEW - needs creation
│   │   │           └── write-script/       # NEW - needs creation
│   │   │
│   │   ├── zoe/
│   │   │   ├── zoe.md
│   │   │   ├── config.yaml
│   │   │   └── zoe-sidecar/
│   │   │       └── workflows/
│   │   │           ├── create-single-image/
│   │   │           ├── create-carousel/
│   │   │           ├── edit-image/
│   │   │           ├── blend-images/
│   │   │           ├── create-talking-head/
│   │   │           ├── create-scene/
│   │   │           └── create-cinematic-sequence/
│   │   │
│   │   └── zoro/
│   │       ├── zoro.md
│   │       ├── config.yaml
│   │       └── zoro-sidecar/
│   │           └── workflows/
│   │               ├── schedule-post/      # NEW - needs creation
│   │               ├── publish-tweet-now/
│   │               ├── publish-linkedin-now/
│   │               ├── publish-youtube-now/
│   │               ├── check-rate-limits/
│   │               └── [10+ specific post type workflows]
│   │
│   ├── modules/                     # Shared utilities
│   │   ├── twitter-api-client/      # Node.js Twitter Premium OAuth client
│   │   │   ├── index.js
│   │   │   ├── executor.js
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── linkedin-api-client/     # Node.js LinkedIn OAuth client
│   │       ├── index.js
│   │       ├── package.json
│   │       └── README.md
│   │
│   └── tool-registry.yaml           # NEW - needs creation (Story 7.4)
│   └── workflow-registry.yaml       # NEW - needs creation (Story 7.5)
│
├── docs/
│   ├── brief.md                     # Project Brief
│   ├── prd.md                       # Product Requirements Document
│   ├── architecture.md              # THIS DOCUMENT
│   ├── notion-content-dashboard.md  # Notion DB schemas
│   ├── postiz-mcp.md                # Postiz integration guide
│   └── content-intelligence/        # Research docs
│
├── outputs/                         # Centralized output management (6-stage lifecycle)
│   ├── templates/
│   │   └── project-structure/       # Template for new projects
│   │       ├── 00-session/
│   │       ├── 01-research/
│   │       ├── 02-ideas/
│   │       ├── 03-drafts/           # Platform-specific (linkedin/, twitter/, youtube/, etc.)
│   │       ├── 04-media/            # Platform-agnostic (images/, videos/)
│   │       ├── 05-published/        # MERGED final+published (linkedin/, twitter/, youtube/, etc.)
│   │       └── handoffs/
│   │
│   └── projects/
│       └── {YYYY-MM-DD}-{project-slug}/
│           ├── 00-session/          # Session metadata
│           ├── 01-research/         # Research briefs (shared across platforms)
│           ├── 02-ideas/            # Content ideas (shared across platforms)
│           ├── 03-drafts/           # Platform-specific drafts (linkedin/, twitter/, youtube/, etc.)
│           ├── 04-media/            # Platform-agnostic REUSABLE media (images/, videos/)
│           ├── 05-published/        # MERGED final+published per platform (linkedin/, twitter/, youtube/, etc.)
│           └── handoffs/            # Agent handoff packages
│
└── .env                             # API keys (gitignored)
```

---

## Deployment & Operations

### Prerequisites

**Required Software:**
- Claude Code Desktop Application (MacOS, Windows, or Linux)
- Node.js v18+ (for twitter-api-client, linkedin-api-client modules)
- Git (for version control)

**Required API Keys (stored in .env):**
- `ANTHROPIC_API_KEY` - Claude Code
- `NOTION_API_KEY` - Notion integration token (ntn_***)
- `POSTIZ_API_KEY` - Postiz self-hosted instance
- `EXA_API_KEY` - Exa neural search
- `FIRECRAWL_API_KEY` - Firecrawl web scraping
- `APIFY_API_KEY` - Apify actor platform
- `GOOGLE_AI_STUDIO_API_KEY` - Gemini (nanobanana, veotools)
- `OPENAI_API_KEY` - DALL-E 3 (gpt-image-1)
- `HEYGEN_API_KEY` - HeyGen avatar generation
- `TWITTER_BEARER_TOKEN` - Twitter Premium API
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn OAuth token

### MCP Server Configuration

**Location:** Claude Code Settings → MCP Servers

**Example Configuration:**

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    },
    "postiz": {
      "command": "npx",
      "args": ["-y", "@postiz/mcp-server"],
      "env": {
        "POSTIZ_API_KEY": "${POSTIZ_API_KEY}"
      }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-server"],
      "env": {
        "EXA_API_KEY": "${EXA_API_KEY}"
      }
    },
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server"],
      "env": {
        "APIFY_API_KEY": "${APIFY_API_KEY}"
      }
    },
    "nanobanana": {
      "command": "npx",
      "args": ["-y", "@nanobanana/mcp-server"],
      "env": {
        "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
      }
    },
    "veotools": {
      "command": "npx",
      "args": ["-y", "@veotools/mcp-server"],
      "env": {
        "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
      }
    },
    "heygen": {
      "command": "npx",
      "args": ["-y", "@heygen/mcp-server"],
      "env": {
        "HEYGEN_API_KEY": "${HEYGEN_API_KEY}"
      }
    }
  }
}
```

### Agent Invocation

**User Workflow:**

1. Open Claude Code desktop app
2. Navigate to project directory
3. Invoke agent via slash command: `/jarvis`, `/zoe`, `/zoro`
4. Agent presents numbered menu of available workflows
5. User selects workflow by number or types workflow command (e.g., `*research-topic`)
6. Workflow executes, prompting for inputs at each step
7. Skills auto-discovered and invoked by Claude based on context
8. Results saved to outputs/ and Notion updated
9. Agent suggests next step (handoff to another agent if applicable)

### Cost Tracking

**Monthly Budget Target:** <$50 for 30+ posts

**Cost Breakdown (estimated):**

| Service | Use Case | Monthly Cost |
|---------|----------|--------------|
| Exa | Research (standard depth, 30 posts) | $1.50 (30 × $0.05) |
| Apify | Profile analysis (4 per month) | $0.60 (4 × $0.15) |
| nanobanana | Images (30 posts × 1 image avg) | $1.17 (30 × $0.039) |
| gpt-image-1 | LinkedIn images (10 posts) | $0.60 (10 × $0.06) |
| veotools | Videos (8 posts × 1 video) | $2.40 (8 × $0.30) |
| HeyGen | Talking heads (4 videos × 1 min) | $1.40 (4 × $0.35) |
| Twitter Premium API | Account access | $8.00 (monthly subscription) |
| **Total** | | **~$15.67 + $8 = $23.67** |

**Buffer:** $26.33 remaining for:
- Comprehensive research (Firecrawl, exhaustive Apify)
- High-quality images when needed (more gpt-image-1)
- Cinematic videos (Fal-Video Luma/Kling)
- Additional scraping/analysis

**Cost Tracking Implementation:**

```json
// outputs/projects/{slug}/00-session/costs.json
{
  "total_cost": 0.09,
  "breakdown": [
    {
      "service": "Exa",
      "operation": "research-topic (standard depth)",
      "cost": 0.05,
      "timestamp": "2025-10-31T10:18:23Z"
    },
    {
      "service": "gpt-image-1",
      "operation": "create-single-image (LinkedIn)",
      "cost": 0.04,
      "timestamp": "2025-10-31T10:26:45Z"
    }
  ],
  "monthly_running_total": 23.67
}
```

### Testing Strategy (MVP)

**Manual validation during MVP, automated testing in Phase 2**

**Testing Cadence:**
- **Daily:** Run 1-2 end-to-end pipelines with real content (Jarvis → Zoe → Zoro)
- **Weekly:** Review cost data, update tool-registry.yaml if needed
- **Monthly:** Audit workflow standardization compliance (all using external instructions.md?)

**Test Artifacts:**
- Test session outputs in `outputs/projects/testing-{date}/`
- Tool performance log (cost, speed, quality scores)
- Workflow success rate tracking (target: 95%)

**Key Test Cases:**

1. **Text-only path:** Jarvis research-topic → write-post → Zoro publish-tweet-now
2. **With visuals path:** Jarvis research-topic → write-post → Zoe create-single-image → Zoro schedule-post
3. **Standalone visuals:** Zoe create-carousel → Zoro publish-linkedin-now
4. **Voice consistency:** Generate 10 posts, validate confidence ≥8/10
5. **Cost compliance:** 30 posts in month, total <$50
6. **Notion coordination:** Verify status transitions (Idea → Research → Posted)
7. **Rate limits:** Check Twitter 1500/month, LinkedIn 150/day, YouTube 6/day

---

## Appendices

### Appendix A: Complete MCP Tool Inventory

**Notion MCP:**
- notion-search (query, filters, teamspace scoping)
- notion-fetch (page/database retrieval)
- notion-create-pages (bulk page creation)
- notion-update-page (property updates, content edits)
- notion-move-pages (parent reassignment)
- notion-create-database (schema definition)
- notion-update-database (schema updates)

**Postiz MCP:**
- integrationList (get connected accounts)
- integrationSchema (platform-specific requirements)
- integrationSchedulePostTool (queue future posts)
- generateImageTool (optional, we use Zoe instead)
- generateVideoTool (optional, we use Zoe instead)

**Exa MCP:**
- search (neural search, 10 auto + 5 similar results)

**Firecrawl MCP:**
- firecrawl_scrape (single URL scraping)
- firecrawl_crawl (multi-page crawling)
- firecrawl_map (sitemap discovery)

**Apify MCP:**
- fetch-actor-details (actor metadata)
- search-actors (actor discovery)
- call-actor (actor execution, two-step: info → call)

**nanobanana MCP:**
- generate_image (Gemini 2.5 Flash image generation)
- upload_file (Gemini Files API for large images)
- show_output_stats (usage statistics)

**gpt-image-1 MCP:**
- create_image (DALL-E 3 generation)
- create_image_edit (DALL-E 3 editing)

**veotools MCP:**
- list_models (available Veo models)
- generate_start (async video generation)
- generate_get (check job status)
- continue_video (video continuation + stitching)
- performance_start_trace (performance profiling)

**fal-video MCP:**
- luma_ray2 (Luma Dream Machine)
- kling_master_text (Kling 2.1 text-to-video)
- pixverse_text (Pixverse V4.5 text-to-video)
- ltx_video (LTX image-to-video)
- list_available_models (registry)

**HeyGen MCP:**
- get_remaining_credits (quota check)
- get_voices (available voice options)
- get_avatar_groups (avatar collections)
- get_avatars_in_avatar_group (avatar details)
- generate_avatar_video (talking head generation)
- get_avatar_video_status (job status)

**mcp-twitter MCP:**
- create_twitter_post (25k char posts, Premium)
- reply_twitter_tweet (threaded replies)
- get_last_tweet (profile retrieval)
- get_last_tweets_options (search with operators)
- create_and_post_twitter_thread (auto-linked threads)

**youtube-uploader-mcp:**
- authenticate (OAuth2 flow)
- accesstoken (token retrieval)
- channels (list user channels)
- refreshtoken (token refresh)
- upload_video (upload with metadata, auto-detect Shorts)

**social-media-mcp:**
- create_post (Brave + Perplexity, multi-platform scheduling)
- get_trending_topics (platform trends)
- research_topic (topic research with facts/news/hashtags)

### Appendix B: Glossary

**Agent:** User-facing persona-driven menu interface presenting numbered workflow options (custom term, ≈ Claude Code Slash Command)

**Workflow:** Multi-step process orchestrator with state management, YAML + external instructions.md (custom term, no direct Claude Code equivalent)

**Skill:** Autonomous expertise module Claude discovers via description matching (= Claude Code Agent Skill)

**MCP:** External tool integration (= Claude Code MCP Server)

**Notion Content Tracker:** Shared collaborative database for content status workflow (Idea → Research → Writing → Editing → Posted → Archived)

**Postiz:** PRIMARY multi-platform publishing hub for scheduled posts, unified queue management

**Enhanced Voice Profile v2.0:** User's rhetorical DNA extracted from 50+ historical posts across 10 dimensions (Argument Architecture, Voice Modes, Structural Frameworks, Proof Style, etc.) with ≥8/10 confidence

**Emily JSON Methodology:** 10-section structured image prompt format (scene, composition, lighting, color, typography, camera, mood, technical, style, brand) + 7-pillar quality evaluation framework (Clarity, Technical, Composition, Color, Typography, Professionalism, Accuracy)

**Handoff Package:** JSON coordination artifact between agents containing source/target agents, content type, platform specs, file paths, metadata (voice confidence, quality scores), Notion context

**Status-Driven Collaboration:** Architectural pattern where agents check Notion status before suggesting workflows and update status as work completes, enabling asynchronous coordination

**Model-Invoked Discovery:** Skill invocation pattern where Claude autonomously discovers and loads skills based on description matching (workflows don't explicitly call skills, Claude does via context analysis)

**Intelligent Tool Routing:** Cost-optimization strategy using tiered tool selection (free → low-cost → high-quality based on depth/quality parameters)

**Dual State Management:** Architectural pattern using local outputs/ for complete artifacts + Notion for metadata/status, enabling both comprehensive local storage and mobile-accessible collaborative state

**Organic Growth Model:** Extensibility approach where system grows through component addition (not modification), no central registries, pattern-based templates guide extension

### Appendix C: Related Documents

- [Product Requirements Document](./prd.md) - Complete functional/non-functional requirements, user stories, acceptance criteria
- [Project Brief](./brief.md) - Executive summary, goals, background context
- [Notion Content Dashboard Guide](./notion-content-dashboard.md) - Database schemas, property definitions, agent integration patterns
- [Postiz MCP Integration Guide](./postiz-mcp.md) - Publishing workflows, platform configurations, scheduling patterns

### Appendix D: Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-31 | 1.0 | Initial architecture document created | Winston (Architect Agent) |
| 2025-11-05 | 1.1 | **CRITICAL ALIGNMENT UPDATES:** (1) Updated lifecycle from 7 stages to 6 stages (merged 05-final/ and 06-published/ into 05-published/), (2) Added platform subfolders to 03-drafts/ and 05-published/ (linkedin/, twitter/, youtube/, instagram/, tiktok/, substack/, facebook/), (3) Added platform-agnostic media philosophy section explaining 04-media/ reusability across platforms with cost efficiency examples, (4) Updated all legacy output path references from outputs/{date}/{session}/ to outputs/projects/{YYYY-MM-DD}-{slug}/, (5) Updated metadata.json schema to reflect platform-specific file_inventory structure. All changes align with PRD v1.0 requirements (FR52-55, Epic 7 Story 7.6). | BMad Builder |
| 2025-11-05 | 1.2 | **EPIC 1 COMPLETION:** Created tool-registry.yaml (.bmad-core/data/tool-registry.yaml) documenting 13+ tools including fal-video (PRIMARY video via execute_custom_model), Cloudinary (CRITICAL for public URLs), Apify actors, image models, research tools, social APIs with cost models, success rates, quality scores, alternatives considered, and tool evolution process (Epic 1 Story 7.4). Created workflow-registry.yaml (.bmad-core/data/workflow-registry.yaml) documenting 10 workflows with purposes, skills triggered, inputs/outputs, Notion updates, Cloudinary integration steps, dependencies, and example use cases (Epic 1 Story 7.5). Added registry references to Tool Integration Strategy and Workflow System sections. Updated MCP Server Registry table to include fal-video and Cloudinary as primary tools. | BMad Builder |

---

**End of Architecture Document**

This document will be sharded into modular docs (agent-architecture.md, workflow-architecture.md, skill-architecture.md, integration-architecture.md) in a future iteration for easier navigation while maintaining this comprehensive version as authoritative reference.
