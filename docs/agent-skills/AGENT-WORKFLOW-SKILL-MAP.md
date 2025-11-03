# Agent → Workflow → Skill Relationship Map

**Date:** 2025-10-28
**For:** sid
**Agent:** BMad Master

---

## TL;DR - The Clear Picture

**AGENT** = Persona + Menu (orchestrates workflows)
**WORKFLOW** = Process + Steps (calls skills for execution)
**SKILL** = Knowledge + Prompts (does the actual work)

**Flow:** Agent → Workflow → Skill → Result

---

## The Three Layers Explained

### Layer 1: AGENT (The Conductor)

**Location:** `bmad/agents/content-intelligence/jarvis-sidecar/`

**What it is:**

- Persona (voice, communication style)
- Menu of available workflows
- Orchestration layer
- User interaction layer

**Example:** Jarvis Agent

- Personality: Content intelligence strategist
- Menu: /research-topic, /write-posts, /write-scripts, /generate-ideas
- Job: Present options, take user input, invoke workflows

**When called:** User invokes slash command like `/jarvis`

---

### Layer 2: WORKFLOW (The Recipe)

**Location:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/*/`

**What it is:**

- Multi-step process
- XML/YAML instructions
- Calls skills for execution
- Manages user interaction flow
- Saves outputs to specific formats

**7 Jarvis Workflows:**

1. **analyze-profile** - Analyze content creator profiles
2. **competitive-analysis** - Compare competitive channels
3. **generate-ideas** - Create content idea cards
4. **learn-voice** - Extract user's writing voice
5. **research-topic** - Deep web research
6. **write-posts** - Generate social media posts
7. **write-scripts** - Generate video scripts

**When called:** Agent menu selection OR direct workflow execution

---

### Layer 3: SKILL (The Expert)

**Location:** `.claude/skills/jarvis/*/`

**What it is:**

- Specialized knowledge
- Proven methodologies
- Direct prompts (NO autogen complexity)
- Reusable components

**12 Jarvis Skills:**

1. **deep-web-research** - Multi-tool research orchestrator
2. **evidence-tracker** - Track research sources
3. **platform-formatter** - Format for specific platforms
4. **post-writer** - Generate social posts (Justin Welsh, Greg Isenberg formulas)
5. **profile-analysis** - Analyze creator profiles
6. **research-synthesizer** - Organize research findings
7. **social-media-research** - Platform-specific research
8. **video-script-writer** - Generate video scripts (Ali Abdaal, MKBHD styles)
9. **voice-matcher** - Match user's writing voice
10. **youtube-research** - YouTube-specific research
11. **youtube-thumbnail-mastery** - Thumbnail psychology (NEW!)
12. **youtube-growth-mastery** - Paddy Galloway system (NEW!)

**When called:** Workflow step invokes skill

---

## How They Work Together

### Example 1: Writing a LinkedIn Post

```
USER: /jarvis → write-posts

└─ AGENT (Jarvis)
   └─ Shows menu
   └─ User selects "write-posts"

   └─ WORKFLOW (write-posts/workflow.yaml)
      ├─ Step 0: Load voice profile
      ├─ Step 1: Load idea card
      ├─ Step 2: INVOKES SKILL → post-writer
      │  └─ SKILL (post-writer/SKILL.md)
      │     ├─ Loads Justin Welsh formulas
      │     ├─ Applies voice profile
      │     ├─ Generates LinkedIn post
      │     └─ Returns formatted post
      ├─ Step 3: Review content
      ├─ Step 4: Format for LinkedIn
      ├─ Step 5: Generate variants
      ├─ Step 6: Create handoff JSON
      └─ Step 7: Save & present

RESULT: LinkedIn post ready to publish
```

---

### Example 2: Creating Video Script

```
USER: /jarvis → write-scripts

└─ AGENT (Jarvis)
   └─ Shows menu
   └─ User selects "write-scripts"

   └─ WORKFLOW (write-scripts/workflow.yaml)
      ├─ Step 0: Load voice profile
      ├─ Step 1: Load idea card & platform specs
      ├─ Step 2: INVOKES SKILL → video-script-writer
      │  └─ SKILL (video-script-writer/SKILL.md)
      │     ├─ Loads Ali Abdaal/MKBHD methodologies
      │     ├─ Applies retention tactics
      │     ├─ Matches voice profile
      │     ├─ Generates full script with timing
      │     └─ Returns production-ready script
      ├─ Step 3: Review script
      ├─ Step 4: Add timing markers & visuals
      ├─ Step 5: Generate hook variants
      ├─ Step 6: Create handoff package
      └─ Step 7: Save & present

RESULT: Timed video script with production notes
```

---

### Example 3: Research + Content Creation (Full Chain)

```
USER: /jarvis → research-topic "AI agents"

└─ WORKFLOW (research-topic)
   ├─ Step 2: INVOKES SKILL → deep-web-research
   │  └─ SKILL orchestrates: Exa + Apify + WebSearch
   │     └─ Returns synthesized research
   ├─ Step 5: Synthesize findings
   └─ Step 6: Generate content angles

RESULT: Research brief saved

USER: /jarvis → generate-ideas (uses research brief)

└─ WORKFLOW (generate-ideas)
   ├─ Loads research brief
   ├─ Creates idea cards
   └─ Saves idea cards

RESULT: 5-10 idea cards

USER: /jarvis → write-posts (uses idea card)

└─ WORKFLOW (write-posts)
   ├─ Loads idea card
   ├─ INVOKES SKILL → post-writer
   │  └─ Uses research + voice + formulas
   └─ Generates platform-ready post

RESULT: LinkedIn/Twitter post ready
```

---

## The Overlap You're Seeing (And Why)

### Overlap #1: YouTube Thumbnail Skills

**You have THREE thumbnail-related items:**

1. **.claude/skills/ai-image-generator/youtube-thumbnail-design/**
   - **Purpose:** HOW to generate thumbnail images (technical)
   - **Contains:** MCP tool selection, prompt engineering, aspect ratios
   - **Called by:** AI Image Generator Agent workflows
   - **Used for:** Actually creating the PNG/JPG file

2. **.claude/skills/jarvis/youtube-thumbnail-mastery/**
   - **Purpose:** WHAT makes thumbnails work (strategy)
   - **Contains:** MrBeast psychology, Thomas Frank AIDA, testing protocols
   - **Called by:** Jarvis workflows when planning thumbnails
   - **Used for:** Learning strategy, planning approach

3. **bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/** (contains thumbnail suggestions in Step 4)
   - **Purpose:** Generate thumbnail IDEAS as part of script workflow
   - **Contains:** 3 thumbnail concept suggestions with each script
   - **Called by:** write-scripts workflow
   - **Used for:** Quick thumbnail concepts (not full design)

**THE FIX:**

- Skill #1 (ai-image-generator) NOW references Skill #2 (jarvis/thumbnail-mastery)
- Workflow uses Skill #2 for strategy
- Workflow uses Skill #1 for image generation
- NO MORE OVERLAP - they work together!

---

### Overlap #2: Post Writing

**You might think these overlap:**

1. **post-writer Skill** - Contains Justin Welsh formulas, Greg Isenberg patterns
2. **write-posts Workflow** - Platform formatting, voice loading, handoff creation

**THEY DON'T OVERLAP:**

- **Skill** = The content generation prompts
- **Workflow** = The orchestration (load voice → call skill → format → save)

**Workflow CALLS the Skill, they're not duplicates!**

---

### Overlap #3: Research

**You might think these overlap:**

1. **deep-web-research Skill** - Intelligent multi-tool orchestrator
2. **research-topic Workflow** - Research session manager
3. **youtube-research Skill** - YouTube-specific research
4. **social-media-research Skill** - Platform research

**THEY DON'T OVERLAP:**

- **research-topic Workflow** = Manages research session, calls skills, synthesizes
- **deep-web-research Skill** = Handles WEB research (Exa, Apify, WebSearch)
- **youtube-research Skill** = YouTube-specific research methods
- **social-media-research Skill** = Platform trends & analysis

**Each handles different research type!**

---

## Decision Tree: When to Use What

### When Creating Content

```
Do you know what to create?
├─ NO → Run research-topic workflow
│  └─ Calls: deep-web-research skill
│  └─ Output: Research brief
│
└─ YES → Do you have idea cards?
   ├─ NO → Run generate-ideas workflow
   │  └─ Uses: Research brief (if available)
   │  └─ Output: Idea cards
   │
   └─ YES → What format?
      ├─ Social post → Run write-posts workflow
      │  └─ Calls: post-writer skill
      │  └─ Output: Platform-ready post
      │
      └─ Video → Run write-scripts workflow
         └─ Calls: video-script-writer skill
         └─ Output: Timed script + production notes
```

---

### When Researching

```
What type of research?
├─ General topic → Use deep-web-research skill
│  └─ Orchestrates: Exa + WebSearch + Apify
│
├─ Trending topics → Use social-media-mcp directly
│  └─ Tool: get_trending_topics
│
├─ YouTube specific → Use youtube-research skill
│  └─ Analyzes: Videos, thumbnails, retention
│
└─ Competitor analysis → Run competitive-analysis workflow
   └─ Calls: Multiple research skills
```

---

### When Designing Thumbnails

```
Need thumbnail?
├─ Learn strategy first → Use youtube-thumbnail-mastery skill
│  └─ Learn: MrBeast psychology, testing protocols
│
└─ Generate actual image → Use ai-image-generator/youtube-thumbnail-design
   ├─ Auto-loads: thumbnail-psychology.md reference
   ├─ Calls: nanobanana or gpt-image-1
   └─ Output: PNG/JPG thumbnail file
```

---

## Skills vs Workflows - The Difference

### WORKFLOWS are Processes

- Multi-step procedures
- User interaction points
- State management
- File I/O (saves outputs)
- Calls multiple skills
- Platform-specific formatting

**Example:** write-posts workflow

- Loads voice profile
- Loads idea card
- CALLS post-writer skill
- Formats for platform
- Saves handoff JSON
- Presents to user

---

### SKILLS are Expertise

- Pure knowledge/methodology
- Direct prompts
- Reusable components
- No state management
- Returns results

**Example:** post-writer skill

- Contains Justin Welsh formulas
- Contains Greg Isenberg patterns
- Contains viral engagement data
- Generates post when called
- That's it!

---

## Current State Analysis

### Workflows (7 total)

```
jarvis-sidecar/workflows/
├── analyze-profile/          - Analyze creator profiles
├── competitive-analysis/     - Compare competitors
├── generate-ideas/           - Create idea cards
├── learn-voice/              - Extract writing voice
├── research-topic/           - Deep research session
├── write-posts/              - Generate social posts
└── write-scripts/            - Generate video scripts
```

### Skills (12 total)

```
.claude/skills/jarvis/
├── deep-web-research/        ← Called by research-topic workflow
├── evidence-tracker/         ← Used by research workflows
├── platform-formatter/       ← Called by write-posts workflow
├── post-writer/              ← Called by write-posts workflow
├── profile-analysis/         ← Called by analyze-profile workflow
├── research-synthesizer/     ← Called by research-topic workflow
├── social-media-research/    ← Called by competitive-analysis
├── video-script-writer/      ← Called by write-scripts workflow
├── voice-matcher/            ← Called by learn-voice workflow
├── youtube-research/         ← Called by research workflows
├── youtube-thumbnail-mastery/← Called by thumbnail planning
└── youtube-growth-mastery/   ← Called for channel strategy
```

### Mapping: Workflow → Skills Called

**research-topic workflow calls:**

- deep-web-research (web research)
- social-media-research (trends)
- youtube-research (if YouTube focus)

**write-posts workflow calls:**

- post-writer (content generation)
- voice-matcher (voice adaptation)
- platform-formatter (formatting)

**write-scripts workflow calls:**

- video-script-writer (script generation)
- voice-matcher (voice adaptation)
- youtube-thumbnail-mastery (thumbnail suggestions)

**learn-voice workflow calls:**

- voice-matcher (voice extraction)
- evidence-tracker (track analyzed content)

**generate-ideas workflow calls:**

- research-synthesizer (organize research)
- evidence-tracker (reference sources)

---

## There's NO Overlap - Here's Why

### Confusion #1: "post-writer skill vs write-posts workflow"

**They're NOT duplicates:**

- **Workflow** = The process (load voice → call skill → format → save)
- **Skill** = The content generator (Justin Welsh formulas)

**Analogy:**

- Workflow = Recipe (steps to make cake)
- Skill = Master baker (knows HOW to bake)

---

### Confusion #2: "Three thumbnail things"

**They're DIFFERENT purposes:**

- **jarvis/youtube-thumbnail-mastery** = Strategy & psychology (WHAT works)
- **ai-image-generator/youtube-thumbnail-design** = Image generation (HOW to create)
- **write-scripts workflow Step 4** = Quick suggestions (3 thumbnail ideas)

**They work together:**

1. Workflow suggests 3 concepts using mastery skill knowledge
2. User picks one
3. ai-image-generator creates the actual image using design skill

---

### Confusion #3: "Multiple research skills"

**They're SPECIALIZED:**

- **deep-web-research** = Web scraping & neural search (Exa, Apify, WebSearch)
- **youtube-research** = YouTube-specific (video analysis, retention)
- **social-media-research** = Platform trends (Twitter, LinkedIn, Instagram)

**research-topic workflow CALLS all 3** depending on what you need!

---

## The Architecture (Visual)

```
┌─────────────────────────────────────────┐
│         AGENT (Jarvis)                  │
│  - Persona & communication              │
│  - Menu (/research, /write-posts, etc) │
│  - User interaction layer               │
└──────────────┬──────────────────────────┘
               │ User selects menu item
               ↓
┌─────────────────────────────────────────┐
│         WORKFLOW (write-posts)          │
│  Step 1: Load voice profile             │
│  Step 2: Load idea card                 │
│  Step 3: INVOKE SKILL → post-writer  ←──┼───┐
│  Step 4: Format for platform            │   │
│  Step 5: Generate variants              │   │
│  Step 6: Create handoff JSON            │   │
│  Step 7: Save & present                 │   │
└─────────────────────────────────────────┘   │
                                              │
                                              ↓
                               ┌──────────────────────────────┐
                               │  SKILL (post-writer)         │
                               │  - Justin Welsh formulas     │
                               │  - Greg Isenberg patterns    │
                               │  - Viral engagement data     │
                               │  - Voice adaptation prompts  │
                               │  - Platform best practices   │
                               └──────────────┬───────────────┘
                                              │
                                              ↓
                                         Generated Post
```

---

## Concrete Example: Creating LinkedIn Post About AI

### User Action

```bash
/jarvis
> Selects: write-posts
> Topic: "AI agents in 2025"
> Platform: LinkedIn
```

### What Happens

**Layer 1 - AGENT (Jarvis)**

- Receives user selection
- Invokes write-posts workflow
- Passes parameters: topic, platform

**Layer 2 - WORKFLOW (write-posts)**

- **Step 0:** Checks for voice profile in `memories.md`
- **Step 1:** Loads idea card (or uses topic directly)
- **Step 2:** **CALLS post-writer SKILL** with:
  - Topic: "AI agents in 2025"
  - Platform: LinkedIn
  - Format: LinkedIn post
  - Style: Justin Welsh PAIPS or Top 5
  - Voice: {loaded voice profile}

**Layer 3 - SKILL (post-writer)**

- Loads LinkedIn post prompts
- Applies Justin Welsh PAIPS formula:
  - Problem: What's the challenge?
  - Agitate: Why it matters
  - Invalidate: Old solutions don't work
  - Promise: New solution
  - Solve: Your approach
- Matches voice profile (vocabulary, tone, sentence structure)
- Generates 150-300 word LinkedIn post
- Returns to workflow

**WORKFLOW continues:**

- **Step 3:** Shows post to user
- **Step 4:** Formats for LinkedIn (hashtags, line breaks)
- **Step 5:** Generates 3 hook variants
- **Step 6:** Creates handoff JSON for social-posting-agent
- **Step 7:** Saves to `outputs/linkedin-post-ai-agents-2025-10-28.md`

**RESULT:** LinkedIn post ready to copy-paste or send to social-posting-agent

---

## The Two "Best Practices" Sources

### You Asked: "Like the best practices to post and stuff?"

**Yes! But they're in DIFFERENT places:**

### 1. Workflow Instructions (Process Best Practices)

**Location:** `workflows/*/instructions.md`

**Contains:**

- WHEN to use what format (LinkedIn < 300 words, Twitter thread vs long-form)
- HOW to structure platform-specific content (hook first 125 chars for Instagram)
- WHAT file formats to save (handoff JSON structure)
- WHICH skills to call when

**Example from write-posts:**

```xml
Line 202-232: LinkedIn formatting guidelines
Line 256-450: Twitter format decision tree
Line 453-543: Instagram caption structure
```

**Purpose:** Process orchestration

---

### 2. Skill Knowledge (Content Best Practices)

**Location:** `.claude/skills/jarvis/*/SKILL.md`

**Contains:**

- Creator methodologies (Justin Welsh formulas, Ali Abdaal structures)
- Proven engagement patterns (4.7M impressions data)
- Platform algorithms (what performs best)
- Voice matching techniques

**Example from post-writer:**

- Justin Welsh PAIPS formula (Problem → Agitate → Invalidate → Promise → Solve)
- Top 5 list structure (hook + 5 points + CTA)
- Greg Isenberg question format
- deedydas data-driven posts

**Purpose:** Content generation

---

## Why This Architecture Exists

### Separation of Concerns

**AGENTS** = User interface & orchestration

- Don't know HOW to write posts
- Just know WHICH workflows to run

**WORKFLOWS** = Process & state management

- Don't know HOW to write posts either
- Just know WHICH skills to call and WHEN

**SKILLS** = Actual expertise

- Know HOW to write posts
- Contain proven methodologies
- Reusable across workflows

### Benefits

**Reusability:**

- post-writer skill used by multiple workflows
- deep-web-research used by research-topic AND competitive-analysis

**Maintainability:**

- Update Justin Welsh formula → Update post-writer skill
- All workflows using it get update automatically

**Clarity:**

- Workflows = Steps
- Skills = Expertise
- Agent = Menu

---

## Where Things Live

### Content Generation Knowledge (Skills)

```
.claude/skills/jarvis/
├── post-writer/SKILL.md
│   ├─ Justin Welsh formulas
│   ├─ Greg Isenberg patterns
│   ├─ Platform algorithms
│   └─ Engagement data
│
├── video-script-writer/SKILL.md
│   ├─ Ali Abdaal structures
│   ├─ MKBHD review format
│   ├─ Retention tactics
│   └─ 2025 strategies
│
└── youtube-thumbnail-mastery/SKILL.md
    ├─ MrBeast 6 pillars
    ├─ Thomas Frank AIDA
    ├─ Testing protocols
    └─ Psychology & science
```

### Process Orchestration (Workflows)

```
workflows/
├── write-posts/instructions.md
│   ├─ Voice loading logic
│   ├─ Idea card integration
│   ├─ CALLS post-writer skill
│   ├─ Platform formatting rules
│   └─ Handoff JSON creation
│
└── write-scripts/instructions.md
    ├─ Voice loading logic
    ├─ Platform spec validation
    ├─ CALLS video-script-writer skill
    ├─ Timing calculations
    └─ Production notes generation
```

---

## Your Question Answered

**"How is this working with workflows and skills? Seems like overlap?"**

**Answer:** NO overlap - they're complementary layers!

**Think of it like a restaurant:**

- **Agent** = Waiter (takes your order, brings you food)
- **Workflow** = Kitchen process (prep → cook → plate → serve)
- **Skill** = Chef (knows HOW to cook the actual dish)

---

## What Needs Updating

### ai-image-generator/youtube-thumbnail-design

**Status:** ✅ FIXED - Now has reference/thumbnail-psychology.md linking to jarvis/youtube-thumbnail-mastery

**Before:** Only technical specs
**After:** Technical specs + strategic psychology reference

---

### workflows/write-scripts (thumbnail suggestions)

**Status:** ⚠️ COULD ENHANCE

**Current:** Generates 3 quick thumbnail ideas in Step 4
**Could add:** "For detailed thumbnail strategy, see youtube-thumbnail-mastery skill"

**Not urgent** - workflow already suggests concepts, mastery skill available when needed

---

## Summary for sid

**You were RIGHT to be confused** - it LOOKED like overlap but it's actually:

**3-Layer Architecture:**

1. **Agent** = Interface (shows menu)
2. **Workflow** = Process (orchestrates steps)
3. **Skill** = Expertise (does actual work)

**No duplication:**

- Workflows call skills
- Skills contain knowledge
- Agents invoke workflows

**Clean separation:**

- Strategy skills (what works) ← jarvis/youtube-thumbnail-mastery
- Technical skills (how to generate) ← ai-image-generator/youtube-thumbnail-design
- Process workflows (orchestration) ← workflows/write-scripts

**Everything works together** - not overlapping, complementing!

---

**Files this doc references:**

- `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-posts/instructions.md`
- `bmad/agents/content-intelligence/jarvis-sidecar/workflows/write-scripts/instructions.md`
- `.claude/skills/jarvis/post-writer/SKILL.md`
- `.claude/skills/jarvis/video-script-writer/SKILL.md`
- `.claude/skills/jarvis/youtube-thumbnail-mastery/SKILL.md`

---

**Next:** Should The Master create a visual diagram or are you clear now?
