# Extension Decision Framework

## When to Create: Agent vs Workflow vs Skill

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

## Agent Extension Guidelines

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

## Workflow Extension Guidelines

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

## Skill Extension Guidelines

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

## Tool/MCP Integration Guidelines

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
