# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This is an **AI-powered social media management system** with specialized agents for content creation, visual production, video generation, and multi-platform publishing. The system is built on the BMad (Breakthrough Method of Agile AI-driven Development) framework with Claude Code skills and integrated MCP servers.

**Architecture Pattern**: Agent-based system with natural language configuration (YAML/XML/Markdown).

---

## Core Commands

### Development & Quality

```bash
# Code quality checks
npm run lint              # Lint all code (must pass with 0 warnings)
npm run lint:fix          # Auto-fix linting issues
npm run format:check      # Check code formatting
npm run format:fix        # Auto-fix formatting

# Testing & validation
npm run test              # Run test suite
npm run test:coverage     # Run with coverage report
npm run validate:schemas  # Validate YAML schemas (required before commit)

# Full pre-commit check
npm run lint:fix && npm run format:fix && npm run test && npm run validate:schemas
```

### BMad Framework

```bash
npm run install:bmad      # Interactive BMad installer
npm run bmad:status       # Check installation status
npm run bundle            # Bundle all web versions
```

---

## Agent System Architecture

### Four Primary Agents

1. **Jarvis** (`/jarvis`) - Content Intelligence Team Head

   - Location: `bmad/agents/content-intelligence/`
   - Skills: 12 specialized skills for research, writing, analysis
   - Workflows: research-topic, analyze-profile, write-posts, write-scripts, competitive-analysis, generate-ideas, learn-voice
2. **Zoe** (`/zoe`) - Visual Production Specialist (Images + Videos)

   - Location: `bmad/agents/zoe/`
   - Skills: Image generation, video production, LinkedIn carousels, YouTube thumbnails
   - MCP Tools: gpt-image-1, nanobanana, heygen, veotools, fal-video
3. **Zoro** (`/zoro`) - Social Media Automation & Publishing

   - Location: `bmad/agents/zoro/`
   - Workflows: schedule-post, post-text-tweet, linkedin-post-image
   - APIs: Twitter Premium, LinkedIn, YouTube, Postiz
4. **BMad Master** (`/bmad:core:agents:bmad-master`) - System Orchestrator

   - Location: `bmad/core/agents/bmad-master.md`
   - Purpose: Task execution, workflow orchestration, resource management

### Agent Invocation Pattern

Use slash commands to activate agents:

```bash
/jarvis                   # Activate Jarvis
/zoe                      # Activate Zoe
/zoro                     # Activate Zoro
```

Each agent loads its persona, config, and workflows automatically.

---

## Key Architectural Concepts

### 1. Natural Language First

- **Agents**: XML-based with embedded markdown sections
- **Workflows**: YAML files with structured steps
- **Skills**: Markdown-based domain knowledge in `.claude/skills/`
- **Configuration**: YAML files for all settings

### 2. Agent Sidecar Pattern

Each agent has a sidecar folder containing:

- `instructions.md` - Private agent directives
- `workflows/` - Agent-specific workflows
- `config.yaml` - API keys, settings, platform specs
- `outputs/` - Generated content

Example: `bmad/agents/content-intelligence/jarvis-sidecar/`

### 3. Workflow Execution System

Workflows are YAML files with:

- Structured step definitions
- Template references
- Variable interpolation
- Output specifications

Workflows live in: `bmad/{module}/workflows/{workflow-name}/workflow.yaml`

### 4. Skills System

24 specialized skills organized by agent:

```
.claude/skills/
├── jarvis/              # 12 skills
├── zoe/                 # Visual production skills
├── visual-prompt-mastery/
└── skill-creator/       # For building new skills
```

Skills are loaded automatically when agents are activated.

### 5. Output Management (Mandatory)

All generated content MUST go to `outputs/projects/{YYYY-MM-DD}-{project-slug}/`:

```
{project-folder}/
├── 00-session/          # Session metadata & logs
├── 01-research/         # Research briefs & data
├── 02-planning/         # Content strategy & outlines
├── 03-drafts/           # Written content & scripts
├── 04-assets/           # Images, videos, media files
└── 05-published/        # Final published versions with metadata
```

**Never** create outputs in the root directory or date-only folders.

---

## File & Code Conventions

### YAML (Strictly Enforced)

- **Extension**: Must use `.yaml` (NOT `.yml`)
- **Quotes**: Double quotes for strings
- **Indentation**: 2 spaces
- **Validation**: Run `npm run validate:schemas` before committing

### JavaScript

- **Print Width**: 140 characters
- **Indentation**: 2 spaces (not tabs)
- **Semicolons**: Required
- **Quotes**: Single quotes for JS
- **Line Endings**: LF (Unix-style)
- **Trailing Commas**: Always

### Commits

- **Format**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- **Length**: Under 72 characters
- **Atomicity**: One logical change per commit
- **Branch**: Submit to `next` (features) or `main` (critical fixes)

### Pre-commit Hooks (Automatic)

Staged files are automatically processed:

- JS/CJS/MJS: `lint:fix` → `format:fix`
- YAML: `eslint --fix` → `format:fix`
- JSON/MD: `format:fix`

---

## Directory Structure & Purpose

### `/bmad/` - BMad Framework Installation

```
bmad/
├── core/                # Core framework (always present)
│   ├── agents/          # bmad-master orchestrator
│   ├── workflows/       # brainstorming, party-mode
│   ├── tasks/          # Reusable task definitions
│   └── config.yaml     # user_name, communication_language, output_folder
│
├── agents/             # Domain-specific agents
│   ├── content-intelligence/  # Jarvis
│   ├── zoe/                   # Visual production
│   └── zoro/                  # Publishing automation
│
├── bmb/                # BMad Builder module (agent/workflow/module creation)
├── modules/            # Platform API clients (twitter, linkedin)
└── _cfg/               # Manifests and configuration
    ├── agent-manifest.csv
    ├── workflow-manifest.csv
    └── task-manifest.csv
```

### `/.claude/` - Claude Code Configuration

```
.claude/
├── commands/           # Slash command definitions (auto-generated from agents)
├── skills/            # 24 specialized skills
└── settings.local.json # Local settings
```

### `/outputs/` - Generated Content (Mandatory)

All agent outputs organized by project with 6-stage lifecycle folders (00-session through 05-published).

### `/docs/` - Documentation

Project-wide documentation, architecture decisions, session summaries.

### `/tools/` - CLI Tools

- `cli/bmad-cli.js` - Main BMad CLI (entry point)
- `flattener/main.js` - Codebase flattening utility
- `validate-*.js` - Schema validators

### `/test/` - Test Suite

- `test-agent-schema.js` - Primary test file
- `fixtures/` - Test data

---

## Critical Workflows

### Jarvis Content Creation Workflow

1. **Research**: `/jarvis` → Select `*research-topic`

   - Uses Exa, Firecrawl, WebSearch based on depth
   - Outputs to `outputs/projects/{project}/01-research/`
2. **Generate Content**: Select `*write-post` or `*write-script`

   - Platform-specific formatting (LinkedIn, Twitter, YouTube)
   - Voice matching from learned profiles
   - Outputs to `03-drafts/`
3. **Hand off to Zoe**: For visuals (if needed)

   - LinkedIn carousels: Dark monochrome design system
   - YouTube thumbnails: CTR-optimized
4. **Hand off to Zoro**: For publishing

   - Multi-platform posting
   - Rate limiting & validation

### BMad Workflow Execution

When agents execute workflows (e.g., `workflow="path/to/workflow.yaml"`):

1. Load `{project-root}/bmad/core/tasks/workflow.xml` (CRITICAL)
2. Read the complete file - this is the CORE OS for BMAD workflows
3. Pass the yaml path as 'workflow-config' parameter
4. Execute workflow.xml instructions precisely
5. Save outputs after EACH workflow step (never batch)

### Agent Activation Pattern

Every agent follows this sequence:

1. Load persona from agent file
2. **Immediately load** `bmad/core/config.yaml` and store variables
3. Verify config loaded successfully
4. Set `{user_name}`, `{communication_language}`, `{output_folder}`
5. Show greeting and menu
6. Wait for user input

---

## MCP Servers & API Integration

### Research & Scraping

- `exa` - Neural search
- `firecrawl` - Web scraping
- `apify` - Social platform scraping
- `social-media-mcp` - Brave + Perplexity

### Content Generation

**Images:**
- `nanobanana` - Gemini 2.5 Flash (social media, fast)
- `gpt-image-1` - OpenAI DALL-E 3 (professional, text rendering)

**Videos:**
- `fal-video` - **PRIMARY** for ALL video (22+ models: Veo 3, Luma Ray 2, Kling, Pixverse)
  - Tool: `mcp__fal-video__execute_custom_model`
  - Models: "fal-ai/veo-3", "fal-ai/luma-ray-2", etc.
- `heygen` - **SPECIALIZED** for talking heads ONLY
  - Tool: `mcp__heygen__generate_avatar_video`
- `veotools` - **DEPRECATED** (use fal-video for Veo 3 access)

### Publishing

- `postiz` - **PRIMARY for ALL platforms** (Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube, Pinterest, Reddit)
  - Tool: `mcp__postiz__integrationSchedulePostTool`
  - Requires: HTML content via `formatForPostiz()`, public URLs from Cloudinary
- `mcp-twitter` - Twitter API backup (direct posting)
  - Tool: `mcp__mcp_twitter__create_twitter_post`

### Infrastructure

- `notion` - Knowledge management
- `cloudinary` - Media storage
- `chrome-devtools` - Web automation
- `serena` - Codebase analysis (active in this session)

Configuration: `.mcp.json` in project root

---

## Working with Postiz Publishing

**HTML Formatting (CRITICAL):**

Postiz requires HTML-formatted content. Use the formatter utility:

```javascript
import { formatForPostiz } from './bmad/modules/postiz-formatter/format-html.mjs';
const htmlContent = formatForPostiz(plainText);
```

**Formatting Rules:**
- Each paragraph → `<p>...</p>` tag
- Empty lines for spacing → `<p> </p>`
- Bold text → `<strong>Text</strong>` (from **Text** in markdown)
- Bullet points → Each in separate `<p>• Item</p>` tag
- Headers → `<h2>` or `<h3>` (from ## or ###)
- Allowed tags only: h1, h2, h3, strong, ul, li, p

**Example:**
```
Plain text:
67% of AI implementations fail.

**The 3 Mistakes:**

• Feature add
• Ignore economics

Becomes HTML:
<p>67% of AI implementations fail.</p>
<p> </p>
<p><strong>The 3 Mistakes:</strong></p>
<p> </p>
<p>• Feature add</p>
<p>• Ignore economics</p>
```

**Integration:** The `schedule-post` workflow automatically formats content in Step 1.5.

---

## Working with Twitter API

The Twitter API client supports Premium tier features:

```javascript
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';

const client = new TwitterClient();

// Long-form post (up to 25k characters)
await client.createTweet({
  text: 'Your long-form content...',
  media: [{ path: '/path/to/image.jpg', altText: 'Description' }]
});

// Thread
await client.createThread([
  { text: 'Tweet 1/3' },
  { text: 'Tweet 2/3' },
  { text: 'Tweet 3/3' }
]);
```

Credentials in `.env`:

```
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_TOKEN_SECRET=...
```

---

## Important Notes

### When Creating New Agents/Workflows

Use BMad Builder workflows:

- `/bmad:bmb:workflows:create-agent` - Create new agent
- `/bmad:bmb:workflows:create-workflow` - Create new workflow
- `/bmad:bmb:workflows:create-skill` - Create new skill
- `/bmad:bmb:workflows:audit-workflow` - Audit workflow quality

### When Making Changes

1. **Always validate**: `npm run validate:schemas`
2. **Check git status**: Verify you're on the right branch
3. **Run quality checks**: Lint, format, test
4. **Follow conventions**: YAML extension, commit format, output structure

### When Agent Behavior Seems Wrong

1. Check `bmad/{module}/agents/{agent-name}/{agent-name}-sidecar/instructions.md`
2. Verify `bmad/core/config.yaml` is loaded correctly
3. Check if agent's workflows are properly defined in YAML
4. Review agent's persona in the XML/markdown definition

---

## Git Workflow

```bash
# Check status
git status
git diff

# Create feature branch
git checkout -b feature/name

# Stage and commit
git add .
git commit -m "feat: description"

# Push
git push origin feature/name
```

**Submit PRs to `next` branch** (not `main` unless critical fix).

---

## Environment

- **Platform**: macOS (Darwin)
- **Node**: v20+
- **Shell**: Unix/bash commands
- **User**: sid
- **Communication**: English
- **Output Folder**: `{project-root}/docs` (general), `outputs/` (content)

---

## Key Files to Load

### For Agent Work

- `bmad/core/config.yaml` - User settings (MANDATORY at startup)
- `bmad/core/tasks/workflow.xml` - Workflow execution system
- `bmad/_cfg/{agent,workflow,task}-manifest.csv` - Registry of available resources

### For Development

- `package.json` - Scripts and dependencies
- `eslint.config.mjs` - Linting rules
- `prettier.config.mjs` - Formatting rules
- `.mcp.json` - MCP server configuration

### For Understanding Architecture

- `README.md` - High-level system overview
- `bmad/core/agents/bmad-master.md` - Orchestrator agent
- `.cursor/rules/bmad/index.mdc` - Cursor rules index
- `outputs/README.md` - Output structure standards

---

## Quality Standards

Before considering work complete:

1. ✅ Code passes `npm run lint` (0 warnings)
2. ✅ Code passes `npm run format:check`
3. ✅ All tests pass: `npm run test`
4. ✅ YAML validated: `npm run validate:schemas`
5. ✅ Outputs in correct folder: `outputs/projects/{YYYY-MM-DD}-{slug}/`
6. ✅ Commit follows conventional format
7. ✅ Changes on correct branch (not `main`)

---

## Additional Resources

- **Agent Instructions**: `bmad/agents/{agent-name}/{agent-name}-sidecar/instructions.md`
- **Workflow Definitions**: `bmad/{module}/workflows/{workflow-name}/workflow.yaml`
- **Skills Reference**: `.claude/skills/{agent-name}/{skill-name}/SKILL.md`
- **Session Memories**: Ask Serena MCP to read memories (project_structure, suggested_commands, etc.)

---

**Last Updated**: October 31, 2025
**BMad Version**: 6.0.0-alpha.0
**Framework**: Natural language agent architecture with Claude Code skills
