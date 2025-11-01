# Skill Discovery & Execution

## Skill Definition Model

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

# Purpose
[What this skill does, why it exists]

# When to Use
[Trigger conditions, context patterns that match]

# Instructions
[Step-by-step methodology for Claude to execute]

# Tool Orchestration
[How to select and route between tools based on parameters]

# Quality Standards
[Success criteria, validation checks]

# Examples
[Concrete usage examples with inputs/outputs]

# Reference Documentation
[Links to methodology docs in reference/ folder]
```

## Description Field Optimization

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

## Avoiding Skill Conflicts

When skills have overlapping domains, use **distinct trigger terms** in descriptions:

```yaml
# deep-web-research
description: Web scraping and neural search using Exa, Apify, Firecrawl. Use for general web research, trending topics, and data gathering.

# youtube-research
description: YouTube-specific research including video analysis, transcript extraction, retention patterns. Use when researching YouTube content, analyzing videos, or studying creator strategies.

# social-media-research
description: Platform trend analysis for Twitter, LinkedIn, Instagram using social-media-mcp and Brave/Perplexity. Use when tracking trending topics, viral content, or platform-specific trends.
```

## Discovery Process

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

## Skill Execution Model

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
