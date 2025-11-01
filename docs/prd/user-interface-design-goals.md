# User Interface Design Goals

## Overall UX Vision

The user experience centers on **conversational orchestration through 3 specialized AI personas working on shared Notion workspace**. Instead of navigating complex GUIs or learning API syntax, users interact with named agents (Jarvis for content intelligence, Zoe for visual production, Zoro for publishing) via natural language and simple menu commands. Each agent presents a focused menu of capabilities (e.g., `*research-topic`, `*write-post`, `*create-image`, `*publish-tweet`) that invoke structured workflows. These workflows are NOT just scripts—they are sophisticated multi-step processes with quality gates, skill invocations, tool orchestration, and Notion status updates.

The experience feels like delegating to a professional team with shared project board: User creates content idea in Notion (Status: Idea) → Jarvis researches and writes (updates Status: Research → Writing → Editing, saves draft to Notion page) → User decides routing: text-only goes to Zoro, visuals needed goes to Zoe → Zoe generates images/videos (Status stays Editing, adds media URLs to Notion) → Zoro publishes (updates Status: Posted, tracks metrics in Notion) → All agents aware of status, can pick up work asynchronously. The system hides technical complexity (MCP selection, API authentication, rate limiting, tool routing) while exposing creative control (voice modes, platform targeting, quality thresholds, scheduling vs immediate publish).

**Key UX Principles:**
- **Guided autonomy** - Agents lead the process, users provide creative direction
- **Transparent orchestration** - User sees which agent/workflow is active, what step is executing, what decisions are being made
- **Fail-safe defaults** - Sensible defaults for all options (primary voice mode, standard research depth, platform specs) with ability to override
- **Progress visibility** - Long-running operations (research >30s, video generation >2min) report progress, not silent black boxes
- **Error recovery** - Graceful degradation with clear explanation (e.g., "Exa API failed, falling back to WebSearch") and resumable workflows

## Key Interaction Paradigms

**1. Menu-Driven Agent Invocation**
- Users invoke agents via slash commands: `/jarvis` (content intelligence), `/zoe` (visual production), `/zoro` (publishing)
- Each agent responds with numbered menu of available workflows
- Users select by number or type workflow command (e.g., `*research-topic` for Jarvis, `*create-image` for Zoe, `*publish-tweet` for Zoro)
- Agents can also auto-suggest workflows based on Notion status (e.g., Zoe checks for content in "Editing" status and offers to create visuals)

**2. Workflow-Guided Progression with Skill Invocation**
- Selected commands trigger workflows that orchestrate multi-step processes
- Each workflow step presents: current goal, required inputs, available options, and which skills will be invoked
- Workflows call skills via natural language ("Use deep-web-research skill with depth=comprehensive")
- Skills execute as autonomous VMs (user sees "Invoking deep-web-research skill..." with progress indicators)
- Workflows manage orchestration (which skills to call, in what order, with what parameters), skills handle execution
- User provides input, workflow advances to next step, invoking appropriate skills
- Progress saved incrementally to both local outputs/ and Notion (status updates, content drafts, metadata)

**3. Elicitation-Based Refinement** (for workflows with `elicit: true`)
- Workflow presents drafted content with detailed rationale
- User chooses from 1-9 numbered options: proceed, or select elicitation method (expand/contract, critique, identify risks, challenge assumptions, etc.)
- Selected method executes, insights presented, user applies changes or returns to menu
- Never yes/no questions—always structured numbered options

**4. Flexible Agent Routing with Notion Coordination**
- Agents coordinate through Notion status updates AND local JSON handoff packages
- **Text-only path:** Jarvis writes → updates Notion status to "Posted" → suggests Zoro for publishing → Zoro reads from Notion, publishes
- **With visuals path:** Jarvis writes → status "Editing" → suggests Zoe for images → Zoe generates → adds media URLs to Notion → suggests Zoro → Zoro publishes
- **Standalone visuals:** Zoe creates images independently → saves to Notion with "Posted" status → suggests Zoro → publishes
- User decides routing at each handoff point based on content needs (not forced through all agents)
- Both JSON packages (outputs/) and Notion pages provide coordination—JSON for session artifacts, Notion for shared state

**5. Skill Discovery & Model-Invoked Execution** (autonomous, transparent to user)
- **Critical:** Skills are MODEL-INVOKED—Claude autonomously decides when to use them based on description matching, workflows don't explicitly call skills
- **How it works:** Workflow step creates rich context (e.g., "Generate LinkedIn post about {topic} using {voice_profile}"), Claude analyzes context (LinkedIn + post generation + voice matching) and autonomously discovers post-writer skill (description contains "LinkedIn posts", "social media", "voice-matched content")
- **Discovery examples:**
  - Workflow context: "Research {topic} with depth=comprehensive" → Claude discovers deep-web-research skill (description: "Exa neural search, Apify scrapers, web research")
  - Workflow context: "Create YouTube thumbnail for {video_topic}" → Claude discovers youtube-thumbnail-design skill (description: "CTR-optimized thumbnails, MrBeast psychology")
  - Workflow context: "Animate diagram showing {process}" → Claude discovers veotools-mastery skill (description: "Veo video generation, diagram animation")
- Once discovered, Claude loads skill's SKILL.md, executes as autonomous VM with tool access, returns results
- Skills then orchestrate their specific tools (deep-web-research → intelligently routes between WebSearch free, Exa $0.05, Firecrawl+Apify $0.50+ based on depth parameter)
- User sees skill activity ("Using deep-web-research skill with depth=comprehensive...") with progress indicators
- Skills run for extended periods (research 1-5 min, image generation 30-60 sec, video generation 2-5 min)
- Tool choices within skills are documented but evolvable (skill can update from apify/instagram-scraper to better actor; workflows unaffected by tool changes)

**6. Notion Status-Aware Collaboration**
- All agents check Notion Content Tracker for content status before suggesting workflows
- Jarvis sees Status="Idea" → suggests research-topic workflow
- Jarvis sees Status="Research" → suggests write-post workflow
- Zoe sees Status="Editing" with no images → suggests create-image workflow
- Zoro sees Status="Posted" with media ready → suggests publish-tweet or schedule-via-postiz workflow
- Agents update status as they complete work: Jarvis moves Idea→Research→Writing→Editing, Zoe keeps Editing (adds media), Zoro moves Editing→Posted
- User can manually update status in Notion, agents respect current state (collaborative, not agent-owned)

## Core Screens and Views

**Note:** Since this is a Claude Code CLI-based system, "screens" are really interaction states and output locations. Here are the critical views:

**1. Agent Menu View** - Landing interface when agent invoked
- Agent name and role displayed (e.g., "Jarvis - Content Intelligence Lead")
- Numbered list of available commands with descriptions
- Current session context if resuming (e.g., "Resuming session: linkedin-post-ai-agents")

**2. Workflow Execution View** - Active state during workflow
- Current step indicator (e.g., "Step 2/5: Generate post content")
- Step goal and instructions
- Input prompts with examples
- Progress indicators for long-running operations

**3. Elicitation Menu View** - Review and refinement state
- Drafted content presented with detailed rationale
- Numbered options 1-9 (proceed or select elicitation method)
- Clear prompt: "Select 1-9 or just type your question/feedback:"

**4. Handoff Package View** - Transition between agents
- Summary of created content (file paths, quality scores, metadata)
- Suggested next command for pipeline continuation
- Handoff JSON file location for reference

**5. Output Directory View** - Results and artifacts
- Session-organized outputs: `outputs/{date}/{session}/`
- Subdirectories: posts/, research/, images/, videos/, handoffs/
- Metadata files: session.json, handoff-to-{agent}.json

**6. Agent Memory View** - Persistent state and preferences
- User preferences (name, voice version, cost tracking)
- API usage statistics (monthly spend by service)
- Voice profile metadata (confidence score, modes, last updated)

**7. Notion Dashboard View** - Shared collaborative workspace
- Content Tracker database with status columns (Idea, Research, Next Up, Writing, Editing, Posted)
- Content Calendar views (Next Actions, Published Calendar)
- Channel performance analytics (Views, Likes, Comments by channel)
- Agents read/write to Notion: check status before suggesting workflows, update status as work completes, add metadata (publish dates, media URLs, performance metrics)

## Accessibility

**Platform Accessibility:** Claude Code desktop application (MacOS, Windows, Linux)
- **Text-based interaction** - All agent menus, workflow prompts, and outputs use markdown-formatted text
- **No visual UI accessibility requirements** - CLI-based, inherently screen-reader compatible
- **Keyboard-only navigation** - No mouse required, all interactions via typing
- **Clear language** - Plain language prompts, no technical jargon unless contextually appropriate
- **Structured output formats** - Markdown headers, lists, tables for easy scanning

**Ease of Use Requirements:**
- **Minimal learning curve** - Agent menus self-explanatory, no documentation required for basic usage
- **Discoverable features** - Help commands (`*help`) list all available workflows
- **Forgiving input** - Natural language accepted, no strict command syntax required
- **Clear error messages** - When something fails, explanation includes why and what to do next

## Branding

**Agent Personas (Voice & Personality):**
- **Jarvis (Content Intelligence Lead)** - Professional strategist with analytical depth, collaborative tone, evidence-driven recommendations, research-obsessed, voice consistency guardian
- **Zoe (Visual Production Specialist)** - Creative and detail-oriented, design-obsessed using Emily 7-pillar framework, platform-aware (9:16 vs 16:9 vs square), quality-focused for both images and videos, consent-conscious for avatar usage, understands visual storytelling across formats
- **Zoro (Publishing & Distribution Specialist)** - Operational and precise, rate-limit aware, validation-obsessed, multi-platform expert, scheduling-savvy with Postiz integration, analytics-focused (tracks Views/Likes/Comments in Notion)

**Content Voice (User's Brand):**
- **Primary Mode:** Lowercase Builder-Philosopher (learned from 77+ historical posts, 8/10 confidence)
- **Alternate Modes:** Professional Analyst, Critical Thinker, Excited Hype (context-dependent)
- **Consistency:** All generated content must feel "authentically me" per user validation

**Output Aesthetics:**
- **LinkedIn Images:** Dark monochrome tech design system (black/charcoal backgrounds, white/cyan text, minimal accent colors)
- **YouTube Thumbnails:** CTR-optimized (MrBeast 6 pillars, Thomas Frank AIDA, bold text, expressive faces, high contrast)
- **Twitter/Instagram:** Platform-native aesthetics (not overly designed, feels organic)

## Target Device and Platforms

**Development & Execution Platform:** Claude Code Desktop Application
- **Supported OS:** MacOS, Windows, Linux (wherever Claude Code runs)
- **Interface:** CLI/Terminal-based interaction within IDE
- **No web/mobile interface required for MVP** - Desktop-only, IDE-based workflow

**Content Target Platforms:** Multi-platform social media distribution
- **Primary Platforms:** LinkedIn (professional content), Twitter (short-form + threads), YouTube (videos + Shorts)
- **Secondary Platforms:** Instagram (Reels, Posts), TikTok (Short-form video), Substack (long-form essays)
- **Scheduling Platforms:** Postiz MCP (multi-platform queuing), Typefully (Twitter-specific)

**Platform Optimization:**
- **Responsive Design N/A** - Content formats adapt to platform specs, not screen sizes
- **Cross-Platform Consistency** - Same content strategy, different formatting per platform (LinkedIn <300 words PAIPS, Twitter Greg Isenberg questions)

---
