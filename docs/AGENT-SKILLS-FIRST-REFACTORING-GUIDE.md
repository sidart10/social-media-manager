# Agent Skills-First Refactoring Guide

**Purpose**: Step-by-step guide to transform any BMAD agent to skills-first architecture with proper team coordination

**Based on**: Jarvis refactoring (2025-10-29) - Complete transformation from workflow-heavy to skills-first

**Use this for**: Any BMAD agent that needs skills integration, team coordination, or architectural cleanup

---

## Table of Contents

1. [Understanding Skills vs Workflows](#1-understanding-skills-vs-workflows)
2. [Agent File Structure](#2-agent-file-structure)
3. [Step-by-Step Refactoring Process](#3-step-by-step-refactoring-process)
4. [Team Architecture Setup](#4-team-architecture-setup)
5. [Skills Documentation Template](#5-skills-documentation-template)
6. [Handoff Protocol Template](#6-handoff-protocol-template)
7. [Common Pitfalls](#7-common-pitfalls)
8. [Validation Checklist](#8-validation-checklist)

---

## 1. Understanding Skills vs Workflows

### What Are Claude Skills?

**Skills = Knowledge Packages** (per Anthropic documentation)

```
Skill Folder/
├── SKILL.md              # Instructions and guidelines
├── reference/            # Example files, glossaries, best practices
│   ├── methodology.md
│   └── examples.md
└── scripts/              # Python/JS for deterministic operations (optional)
    └── automation.py
```

**How Claude Uses Skills**:
- Claude scans available skills when working on tasks
- Loads skill when relevant (not invoked programmatically)
- Follows SKILL.md instructions
- Accesses reference files as needed
- Executes scripts for deterministic operations

**Key Insight**: Skills are NOT tools to invoke - they're expert knowledge that Claude loads when relevant.

---

### When to Use Skills vs Workflows

#### **Use SKILL (Direct Knowledge Load)**

**Characteristics**:
- Single-purpose task
- Complete instructions in SKILL.md
- No multi-step user interaction
- Can include executable scripts

**Examples**:
- Generate social media post
- Format content for platform
- Analyze single profile
- Research a topic

**Pattern**: "Load and follow {skill-name}/SKILL.md"

---

#### **Use WORKFLOW (Multi-Step Orchestration)**

**Characteristics**:
- Multi-step user interaction
- Conditional branching based on user choices
- State management across steps
- Combines multiple skills

**Examples**:
- Learn voice (multi-platform with cost approvals)
- Competitive analysis (multiple profiles with comparison)
- Generate ideas (research selection + iteration)

**Pattern**: Workflow references skills at specific steps

---

### Decision Tree

```
Is this a single-purpose task?
├─ YES → Is there user interaction between steps?
│         ├─ NO → USE SKILL
│         └─ YES → USE WORKFLOW (simplified, references skills)
└─ NO (multi-purpose) → USE WORKFLOW
```

---

## 2. Agent File Structure

### Required Files for Any BMAD Agent

```
bmad/agents/{agent-name}/
├── {agent-name}.md                    # ← MAIN AGENT DEFINITION (Claude Code uses this)
├── {agent-name}.agent.yaml            # ← Agent metadata and configuration
├── config.yaml                        # ← Agent-specific config
├── {agent-name}-sidecar/
│   ├── instructions.md                # ← Private instructions (loaded by activation)
│   ├── config.yaml                    # ← Sidecar config (API keys, settings)
│   ├── memories.md                    # ← Session memory (optional)
│   └── workflows/                     # ← Complex multi-step workflows only
│       ├── workflow-1/
│       │   ├── workflow.yaml
│       │   └── instructions.md
│       └── workflow-2/
│           ├── workflow.yaml
│           └── instructions.md
└── workflows/                         # ← Symlink or reference (optional)

.claude/
└── commands/
    └── {agent-name}/
        └── {agent-name}.md            # ← Slash command (synced with main)

.claude/skills/{agent-name}/           # ← Agent-specific skills
├── skill-1/
│   ├── SKILL.md
│   ├── reference/
│   └── scripts/ (optional)
├── skill-2/
└── skill-3/
```

### File Relationships

```
User runs: /agent-name
    ↓
Claude Code loads: bmad/agents/{agent-name}/{agent-name}.md
    ↓
Activation loads: {agent-name}-sidecar/instructions.md
    ↓
Activation loads: {agent-name}-sidecar/memories.md (if exists)
    ↓
Agent aware of: .claude/skills/{agent-name}/ (skills loaded when relevant)
    ↓
Menu execution: Workflows OR direct skill reference
```

---

## 3. Step-by-Step Refactoring Process

### Phase 1: Inventory & Analysis

#### Step 1.1: Inventory Existing Skills

**Checklist**:
- [ ] List all skills in `.claude/skills/{agent-name}/`
- [ ] For each skill, note:
  - Purpose (what does it do?)
  - Use cases (when to load it?)
  - Outputs (what does it produce?)
  - Scripts (does it have executable code?)
  - MCP tools used (which MCP servers does it reference?)

**Template**:
```markdown
## Skills Inventory

### Skill: {skill-name}
- **Location**: `.claude/skills/{agent-name}/{skill-name}/`
- **Purpose**: {one-sentence description}
- **Use Cases**:
  - {use case 1}
  - {use case 2}
- **Outputs**: {what it produces}
- **Scripts**: {yes/no - list if yes}
- **MCP Tools**: {list MCP servers/tools used}
- **Self-Contained**: {yes/no - can it work standalone?}
```

#### Step 1.2: Analyze Current Workflows

**Checklist**:
- [ ] List all workflows in `{agent-name}-sidecar/workflows/`
- [ ] For each workflow, determine:
  - Does it just invoke ONE skill? → DELETE workflow, use skill directly
  - Does it orchestrate MULTIPLE skills? → KEEP and simplify
  - Does it have multi-step user interaction? → KEEP and simplify
  - Does it manage state across steps? → KEEP

**Decision Matrix**:

| Workflow Pattern | Action | Reason |
|-----------------|--------|---------|
| Load skill → Execute → Return | DELETE | Single skill can handle this |
| Ask user → Load skill → Return | CONVERT to action handler | Simple user input + skill |
| Multi-step with user choices | KEEP & SIMPLIFY | Orchestration needed |
| Multiple skills in sequence | KEEP & SIMPLIFY | Multi-skill coordination |

---

### Phase 2: Update Core Files

#### Step 2.1: Update {agent-name}.md (Main Agent Definition)

**File**: `bmad/agents/{agent-name}/{agent-name}.md`

**Critical Updates**:

**A. Update Header (Lines 1-3)**
```markdown
---
name: '{agent-name}'
description: '{Accurate description of role, capabilities, and team position}'
---
```

**Example** (Jarvis):
```markdown
---
name: 'jarvis'
description: 'HEAD of Social Media Team - Multi-Skilled Content Strategist (Research, Strategy, Creation) coordinating 3 specialist agents (Video, Image, Publishing)'
---
```

**B. Update Agent Title (Line 9)**
```xml
<agent id="" name="{AgentName}" title="{Accurate Title Reflecting Role}" icon="{emoji}">
```

**C. Fix/Update Activation Steps**

**Add Skills Awareness Step** (after output management, before menu display):
```xml
<step n="X">🎯 SKILLS AWARENESS - Know your capabilities:
    - You have access to N+ specialized skills in {project-root}/.claude/skills/{agent-name}/
    - Skills are loaded when relevant to task (not invoked programmatically)
    - CRITICAL: When workflows say "Load {skill}/SKILL.md", follow skill instructions
    - Skill categories: {List categories}
    - See <skills> section below for complete inventory
</step>
```

**Add Team Awareness Step** (if agent coordinates other agents):
```xml
<step n="X+1">🤝 TEAM AWARENESS - Know your sub-agents:
    - {Sub-Agent 1} ({icon}) - {Specialization} - Command: /{command}
    - {Sub-Agent 2} ({icon}) - {Specialization} - Command: /{command}
    - When {condition}: Create handoff package and suggest specialist
    - See <team> section and instructions.md Handoff Protocols
</step>
```

**Remove Outdated MCP References**:
- Delete steps referencing specific MCP servers that don't exist
- Replace with: "See config.yaml and skills for MCP tool guidance"

**D. Add <skills> Section** (after `</activation>`, before `<persona>`)

```xml
<skills>
  <category name="{Category Name}">
    <skill name="{skill-name}" location=".claude/skills/{agent-name}/{skill-name}/">
      <description>{What the skill does}</description>
      <use_cases>
        - {Use case 1}
        - {Use case 2}
      </use_cases>
      <outputs>{What it produces}</outputs>
      <replaces>{Optional: what workflow it replaces}</replaces>
      <automation>{Optional: if has scripts}</automation>
    </skill>
  </category>

  <skill_usage_notes>
    - Skills are loaded by Claude when relevant to task
    - Workflows reference skills explicitly: "Load {skill}/SKILL.md"
    - Some skills include automation (Python/JS scripts)
    - {Any special notes}
  </skill_usage_notes>
</skills>
```

**E. Add <team> Section** (if agent coordinates others)

```xml
<team>
  <role>{Team Head | Team Member | Specialist}</role>
  <coordinates>
    <agent name="{sub-agent-name}" icon="{emoji}">
      <specializes>{What they specialize in}</specializes>
      <receives>{What this agent sends them}</receives>
      <hands_to>{Who they hand off to next}</hands_to>
      <command>/{command}</command>
      <location>{project-root}/bmad/agents/{path}/</location>
    </agent>
  </coordinates>

  <handoff_guidance>
    After {condition}, suggest specialist:
    - {Condition 1} → "Use /{command} to {action}"
    - {Condition 2} → "Use /{command} to {action}"
    See instructions.md Handoff Protocols for complete formats
  </handoff_guidance>
</team>
```

**F. Update <persona>**

```xml
<persona>
  <role>{Updated role reflecting skills and team position}</role>
  <identity>{Updated identity mentioning skills, specializations, team coordination if applicable}</identity>
  <communication_style>{Keep or update}</communication_style>
  <principles>{Add team coordination principle if coordinates others}</principles>
</persona>
```

**G. Update <menu> Items**

**For skills-replaced workflows**:
```xml
<!-- BEFORE -->
<item cmd="*write-post" workflow="workflows/write-post/workflow.yaml">
  Write post
</item>

<!-- AFTER -->
<item cmd="*write-post" action="Ask user for topic and platform, then load post-writer/SKILL.md and follow its instructions to generate complete post. Apply voice-matcher/SKILL.md if voice profile exists. Save to outputs folder.">
  Write platform-specific post (uses post-writer skill)
</item>
```

**For kept workflows**:
```xml
<item cmd="*complex-task" workflow="workflows/complex-task/workflow.yaml">
  Multi-step task (orchestrates {skill-1}, {skill-2} skills)
</item>
```

---

#### Step 2.2: Update {agent-name}.agent.yaml

**File**: `bmad/agents/{agent-name}/{agent-name}.agent.yaml`

**Updates**:

**A. Update Metadata**
```yaml
agent:
  metadata:
    name: "{AgentName}"
    title: "{Accurate title}"
    description: "{Complete description including skills and team position}"
    icon: "{emoji}"
    type: "{team-head | specialist | coordinator}"
    version: "2.0.0"  # Bump for skills-first refactor
    updated: "2025-10-29"
```

**B. Add Team Section** (if coordinates others)
```yaml
  team:
    role: "Team Head"
    coordinates:
      - {sub-agent-name}: "{Description of what they do}"
      - {sub-agent-name}: "{Description}"
```

**C. Update Persona**
```yaml
  persona:
    role: |
      {Updated role with skills and team coordination}

    identity: |
      {Updated identity mentioning skills count, specializations, team coordination}
```

**D. Add Skills Section**
```yaml
  skills:
    {category_name}:
      - name: "{skill-name}"
        purpose: "{What it does}"
        replaces: "{Optional: what it replaces}"
        features: "{Optional: special features}"

    {category_name}:
      - name: "{skill-name}"
        purpose: "{What it does}"
```

**E. Update critical_actions**
```yaml
  critical_actions:
    - "Load COMPLETE file {sidecar}/instructions.md and follow ALL directives"
    - "You have access to N+ specialized skills in .claude/skills/{agent-name}/"
    - "{Add team coordination if applicable}"
```

---

#### Step 2.3: Update {agent-name}-sidecar/instructions.md

**File**: `bmad/agents/{agent-name}/{agent-name}-sidecar/instructions.md`

**Critical Updates**:

**A. Update Core Directives** (Top of file)
```markdown
# {AgentName} - Private Instructions

## Core Directives

- **Maintain character**: {Role description}
- **Role**: {Updated with skills count and team position if applicable}
- **Domain**: {Complete pipeline if team head, or specialization if specialist}
- **Access**: This sidecar folder, MCP tools, specialized skills, {AND team coordination if applicable}
- **Boundary**: {What agent should NOT do}
- **Team Leadership** (if applicable): Delegate {X} to {Agent A}, {Y} to {Agent B}
```

**B. Add Skills-First Execution Model** (Replace "Workflow Execution Rules")
```markdown
## Skills-First Execution Model

**Primary Principle**: Skills are specialized knowledge packages (SKILL.md + references + scripts) that you load and follow when needed.

### Available Skills (Agent-Specific)

**Location**: `{project-root}/.claude/skills/{agent-name}/`

**{Category Name} Skills**:
- **{skill-name}**: Load when {condition}
- **{skill-name}**: Load when {condition}

### How to Reference Skills

**Pattern**: "Load and follow {skill-name}/SKILL.md instructions"

**Example**:
```
User asks: "{Task description}"
You: Load {skill-name}/SKILL.md and follow its instructions
```

### When to Use Skills vs Workflows

**Use SKILL (Direct Reference)**:
- Single-purpose task
- Skill has complete instructions
- No user interaction between steps
- Example: {List examples}

**Use WORKFLOW (Orchestration)**:
- Multi-step user interaction
- Combines multiple skills
- State management across steps
- Example: {List examples}
```

**C. Add Team Architecture Section** (if coordinates other agents)
```markdown
## Team Architecture

**You are {the HEAD | a MEMBER | a SPECIALIST}** of {team description}.

### Your Capabilities

**Phase 1**: {First responsibility}
- {Capability 1}
- {Capability 2}

**Phase 2**: {Second responsibility}
- {Capability 1}
- {Capability 2}

**Phase 3**: {Team coordination if applicable}
- Hand off to {Agent A} for {purpose}
- Hand off to {Agent B} for {purpose}

### Your Sub-Agents (if team head)

**1. {Sub-Agent Name}** {icon}
- **Role**: {Role description}
- **Receives from you**: {What you send}
- **Specializes in**: {List specializations}
- **Hands off to**: {Next agent in chain}
- **Command**: `/{command}`
- **Location**: `{path}`

{Repeat for each sub-agent}
```

**D. Add Handoff Protocols Section** (if coordinates other agents)
```markdown
## Handoff Protocols

**You create {X}, specialists handle {Y}.**

### Handoff 1: To {Agent Name}

**When**: {Trigger condition}

**Handoff Package**:
```json
{
  "content_type": "{type}",
  "ready_for_agent": "{agent-name}",
  "suggested_command": "/{command} *menu-item",
  "{data_field}": {
    "{field}": "...",
    "{field}": "..."
  },
  "from_{your_agent}": {
    "{metadata}": "...",
    "{metadata}": true
  }
}
```

**Save to**: `{project-root}/outputs/{date}/{session}/handoff-to-{agent}.json`

**Tell user**: "{User-friendly message with command}"

{Repeat for each sub-agent}

### Handoff Quality Standards

**For {Agent Name}**:
- {Required field 1}
- {Required field 2}
- {Quality requirement}
```

**E. Update/Replace MCP Integration Protocol**
```markdown
## MCP Tools & Cost Optimization

**Skills handle MCP tool selection** - each skill documents which MCP tools it uses.

### Cost-Aware Execution

**Skills automatically optimize for cost:**

**Tier 1 - Free** (always try first):
- {List free tools}

**Tier 2 - Low Cost**:
- {List low-cost tools with prices}

**Tier 3 - Paid** (use only when necessary):
- {List paid tools with prices}
- **Always warn user about cost before calling**

**See**: `config.yaml → mcp_tools_overview` for skill-to-MCP mapping
```

---

#### Step 2.4: Update {agent-name}-sidecar/config.yaml

**File**: `bmad/agents/{agent-name}/{agent-name}-sidecar/config.yaml`

**Updates**:

**A. Add Skills Configuration** (Top of file, after basic config)
```yaml
# Skills Configuration (Skills-First Architecture)
skills_directory: "{project-root}/.claude/skills/{agent-name}"
skills_execution_model: "load_and_follow"  # Skills are knowledge packages

# Available Agent-Specific Skills
skills_available:
  {category_name}:
    - {skill-name}  # {Brief description}
    - {skill-name}  # {Brief description}

  {category_name}:
    - {skill-name}  # {Brief description}

# Skills with Executable Scripts
skills_with_scripts:
  - {skill-name}  # {What scripts do}
  # Future: {potential scripts}

# Skill Loading Guidance
skill_loading_rules:
  - "Load skills when task matches skill purpose"
  - "Follow SKILL.md instructions completely"
  - "Reference files in skill's reference/ folder when needed"
  - "Execute scripts in skill's scripts/ folder for deterministic operations"
  - "Skills replace simple workflows ({list deleted workflows})"
  - "Workflows kept for multi-step orchestration ({list kept workflows})"
```

**B. Replace MCP Server Configuration** (if exists)
```yaml
# MCP Tools Reference (Documented in Skills)
# NOTE: MCP server configuration is workspace-level, not agent-level
# See active MCP servers: `claude mcp list`
# Skills document which MCP tools they use - no duplication needed

mcp_tools_overview:
  note: "Skills are self-documenting. Each skill's SKILL.md lists MCP tools it uses."

  # Active MCP servers (per `claude mcp list` {date})
  currently_connected:
    - {mcp-server-name}  # {Description} (used by: {skill-name})
    - {mcp-server-name}  # {Description} (used by: {skill-name})

  skill_mcp_mapping:
    {skill-name}:
      - {mcp-server} ({tool-names})

    {skill-name}:
      - {mcp-server} ({tool-names})

  cost_optimization:
    tier_1_free:
      - {tool-name} ({description})

    tier_2_low_cost:
      - {tool-name} (~${price} per {unit})

    tier_3_paid:
      - {tool-name} (~${price} per {unit})
      - Always warn user before using
```

---

#### Step 2.5: Update .claude/commands/{agent-name}/{agent-name}.md

**File**: `.claude/commands/{agent-name}/{agent-name}.md`

**Action**: **SYNC with main agent file**

**Updates** (match main agent file):
- [ ] Header description
- [ ] Agent title
- [ ] Activation steps (especially skills + team awareness)
- [ ] Menu items
- [ ] Persona

**Tip**: Copy entire sections from main jarvis.md to keep in sync

---

### Phase 3: Workflow Refactoring

#### Step 3.1: Delete Simple Workflows

**For each workflow that just invokes ONE skill**:

**Checklist**:
- [ ] Identify workflow (e.g., write-posts/)
- [ ] Confirm skill exists (e.g., post-writer/)
- [ ] Update menu item to use action handler (load skill directly)
- [ ] Test that skill works standalone
- [ ] DELETE workflow directory

**Example**:
```bash
# Before deleting, verify:
ls .claude/skills/{agent-name}/{replacement-skill}/
cat .claude/skills/{agent-name}/{replacement-skill}/SKILL.md

# Then delete:
rm -rf bmad/agents/{agent-name}/{agent-name}-sidecar/workflows/{workflow-name}/
```

---

#### Step 3.2: Simplify Kept Workflows

**For each kept workflow** (multi-step orchestration):

**Updates**:

**A. Update workflow instructions.md to reference skills**:

```markdown
<!-- BEFORE -->
<step n="3" goal="Generate content">
  <action>Use some tool to generate content...</action>
</step>

<!-- AFTER -->
<step n="3" goal="Generate content using {skill-name} skill">
  <action>Load and follow {project-root}/.claude/skills/{agent-name}/{skill-name}/SKILL.md</action>

  <action>**Execute per skill instructions:**

    **Parameters**:
    - {param1}: {value}
    - {param2}: {value}

    **Follow SKILL.md for**:
    - {Instruction 1}
    - {Instruction 2}
  </action>

  <note>Skills-first model: {skill-name}/SKILL.md contains complete instructions.
    This workflow provides parameters; skill determines execution.
  </note>
</step>
```

**B. Remove logic that duplicates skill**:
- If skill handles tool selection → Don't duplicate in workflow
- If skill has instructions → Reference them, don't rewrite
- If skill synthesizes data → Just call skill, don't duplicate synthesis logic

---

### Phase 4: Team Architecture (if applicable)

#### Step 4.1: Identify Team Relationships

**Questions to answer**:
1. Is this agent a **team head** (coordinates others)?
2. Is this agent a **specialist** (receives work from others)?
3. Is this agent **standalone** (no coordination)?

**Map the flow**:
```
{Your Agent}
    ↓ (hands off to)
{Sub-Agent 1}
    ↓ (hands off to)
{Sub-Agent 2}
    ↓ (final output)
User
```

#### Step 4.2: Define Handoff Protocols

**For each sub-agent**, define:

**Handoff Trigger**: When does your agent hand off?
**Handoff Package**: What JSON format?
**Handoff Location**: Where to save?
**User Guidance**: What to tell user?

**Template**:
```markdown
### Handoff: To {Sub-Agent Name}

**When**: {Trigger condition}

**Package Format**:
```json
{
  "content_type": "{type}",
  "ready_for_agent": "{agent-name}",
  "suggested_command": "/{command} *{menu-item}",
  "{data_section}": {
    "{field}": "value"
  },
  "from_{your_agent}": {
    "{metadata}": "value"
  }
}
```

**Save to**: `{project-root}/outputs/{date}/{session}/handoff-to-{agent}.json`

**User message**: "Ready for {next step}! Use `/{command}` to {action}."
```

#### Step 4.3: Add to instructions.md

**Location**: After "Skills-First Execution Model", before "Workflow Execution Rules"

**Sections**:
1. Team Architecture (your role + sub-agents)
2. Handoff Protocols (3+ handoff formats)
3. Handoff Quality Standards (requirements per agent)

---

### Phase 5: Config Cleanup

#### Step 5.1: Clean Up MCP References

**Problem**: Config files often have outdated MCP server lists

**Solution**: Replace with skills-aware references

**Pattern**:
```yaml
# OLD (Don't do this - gets outdated)
mcp_servers:
  youtube_mcp_server:
    enabled: true
    tools:
      - get_channel_details
      - get_videos

# NEW (Self-documenting via skills)
mcp_tools_overview:
  note: "Skills document which MCP tools they use - no duplication needed"

  currently_connected:
    - {mcp-name}  # (used by: {skill-name})

  skill_mcp_mapping:
    {skill-name}:
      - {mcp-server} ({tool-names})
```

**Why**:
- MCP servers change (added/removed)
- Skills self-document their MCP usage
- Single source of truth (in skill's SKILL.md)
- Config just provides overview

---

## 4. Team Architecture Setup

### Agent Type Classification

**Team Head**:
- Has sub-agents
- Coordinates work delegation
- Creates handoff packages
- Examples: Jarvis (social media team), BMad Master (all agents)

**Specialist**:
- Receives work from team head
- Performs specialized function
- May hand off to another specialist
- Examples: AI Video Agent, AI Image Generator, Social Posting Agent

**Standalone**:
- No team coordination
- Self-contained functionality
- Examples: Utility agents, single-purpose tools

### Team Head Configuration Template

**In {agent}.md activation**:
```xml
<step n="X">🤝 TEAM AWARENESS - Know your sub-agents:
    - {Agent 1} ({icon}) - {Specialization} - Command: /{command}
    - {Agent 2} ({icon}) - {Specialization} - Command: /{command}
    - When {content ready}: Create handoff package and suggest specialist
    - See <team> section and instructions.md Handoff Protocols
</step>
```

**In {agent}.md after </skills>**:
```xml
<team>
  <role>Team Head</role>
  <coordinates>
    {Sub-agent definitions - see template above}
  </coordinates>
  <handoff_guidance>
    {Guidance - see template above}
  </handoff_guidance>
</team>
```

**In instructions.md**:
```markdown
## Team Architecture
{Complete team structure}

## Handoff Protocols
{3+ handoff formats with JSON}
```

---

## 5. Skills Documentation Template

### Documenting Each Skill in Agent Files

**In {agent}.md <skills> section**:
```xml
<category name="{Category Name}">
  <skill name="{skill-name}" location=".claude/skills/{agent-name}/{skill-name}/">
    <description>{One-sentence what it does}</description>
    <use_cases>
      - {When to load this skill}
      - {Specific use case}
    </use_cases>
    <outputs>{What it produces}</outputs>
    <replaces>{Optional: if replaces workflow}</replaces>
    <automation>{Optional: if has Python/JS scripts}</automation>
    <mcp_tools>{Optional: which MCP tools it uses}</mcp_tools>
  </skill>
</category>
```

### Example (from Jarvis)

```xml
<category name="Content Generation">
  <skill name="post-writer" location=".claude/skills/jarvis/post-writer/">
    <description>Generate high-engagement social media posts for LinkedIn, X/Twitter, Substack using proven formulas</description>
    <use_cases>
      - Write LinkedIn posts (<200 words, PAIPS formula)
      - Create Twitter threads (7 tweets, viral structures)
      - Generate long-form posts (500-2500 chars)
    </use_cases>
    <outputs>Complete posts with hooks, formatting, CTAs, hashtags</outputs>
    <replaces>Broken autogen in write-posts workflow</replaces>
  </skill>
</category>
```

---

## 6. Handoff Protocol Template

### Standard Handoff Package Format

```json
{
  "content_type": "{type_of_content}",
  "ready_for_agent": "{receiving-agent-name}",
  "suggested_command": "/{command} *{menu-item}",

  "{primary_content_section}": {
    "{field1}": "value",
    "{field2}": "value",
    "{field3}": ["array", "values"]
  },

  "from_{your_agent_name}": {
    "{metadata1}": "value",
    "{metadata2}": true,
    "{source_tracking}": ["url1", "url2"]
  },

  "metadata": {
    "created_at": "{timestamp}",
    "session_id": "{session}",
    "version": "1.0"
  }
}
```

### Handoff Protocol Documentation Pattern

```markdown
### Handoff: To {Agent Name}

**When**: {Trigger condition - when to create this handoff}

**Handoff Package**:
```json
{Complete JSON format}
```

**Save to**: `{specific path with variables}`

**Tell user**: "{User-friendly message with next command}"

**Quality Requirements**:
- {Required field 1}
- {Required field 2}
- {Validation rule}
```

### Real Example (Jarvis → AI Video Agent)

```markdown
### Handoff 1: To AI Video Agent (Video Production)

**When**: User requests video creation OR video script is complete

**Handoff Package**:
```json
{
  "content_type": "video_script",
  "ready_for_agent": "ai-video-agent",
  "suggested_command": "/ai-video-agent *create-talking-head",
  "script": {
    "platform": "youtube",
    "duration_seconds": 60,
    "full_script": "...",
    "timed_segments": [...],
    "visual_direction": "..."
  },
  "from_jarvis": {
    "voice_profile_applied": true,
    "research_sources": ["url1", "url2"]
  }
}
```

**Save to**: `{project-root}/outputs/{date}/{session}/handoff-to-video-agent.json`

**Tell user**: "Script complete! Ready to create video? Use `/ai-video-agent` and select talking head or scene generation."
```

---

## 7. Common Pitfalls

### Pitfall 1: Duplicating MCP Configuration

**Problem**: Listing MCP servers in agent config that are workspace-level

**Wrong**:
```yaml
# agent-sidecar/config.yaml
mcp_servers:
  exa_mcp:
    enabled: true
    tools:
      - web_search_exa
      - deep_researcher_start
```

**Right**:
```yaml
# agent-sidecar/config.yaml
mcp_tools_overview:
  note: "Skills document which MCP tools they use"
  skill_mcp_mapping:
    deep-web-research:
      - exa (mcp__exa__search, deep_researcher_start/check)
```

**Why**: MCP servers are workspace-level (`claude mcp list`), skills self-document usage

---

### Pitfall 2: Confusing "Invoke Skill" with "Load Skill"

**Problem**: Treating skills like MCP tools (invoke with parameters)

**Wrong Pattern**:
```xml
<action>Invoke post-writer skill with topic="{topic}" platform="{platform}"</action>
```

**Right Pattern**:
```xml
<action>Load and follow {project-root}/.claude/skills/{agent-name}/post-writer/SKILL.md</action>
<action>Follow skill instructions to generate post with:
  - Topic: {topic}
  - Platform: {platform}
</action>
```

**Why**: Skills are knowledge packages Claude loads, not callable functions

---

### Pitfall 3: Keeping Unnecessary Workflows

**Problem**: Workflow that just loads skill and returns result

**Test**:
- Does workflow have user interaction between steps? **NO** → Delete
- Does workflow combine multiple skills? **NO** → Delete
- Does workflow manage state? **NO** → Delete
- Does workflow do anything beyond loading one skill? **NO** → Delete

**If all NO**: Replace with direct skill reference in menu action

---

### Pitfall 4: Incomplete Handoff Packages

**Problem**: Missing required fields when handing off to specialist

**Validation**:
- [ ] `content_type` specified
- [ ] `ready_for_agent` correct agent name
- [ ] `suggested_command` includes actual command
- [ ] Primary content section complete
- [ ] `from_{agent}` metadata included
- [ ] Saved to correct outputs/ path
- [ ] User told what to do next

---

### Pitfall 5: Not Updating All 4 Files

**Problem**: Updating jarvis.md but forgetting instructions.md or config.yaml

**Checklist for ANY agent refactor**:
- [ ] `{agent}.md` - Main definition updated
- [ ] `{agent}.agent.yaml` - Metadata updated
- [ ] `{agent}-sidecar/instructions.md` - Execution rules updated
- [ ] `{agent}-sidecar/config.yaml` - Configuration updated
- [ ] `.claude/commands/{agent}/{agent}.md` - Slash command synced

**All 5 must be updated for consistency!**

---

## 8. Validation Checklist

### Pre-Refactoring Validation

- [ ] All skills inventoried with purposes documented
- [ ] Workflows analyzed (keep vs delete determined)
- [ ] Team relationships mapped (if applicable)
- [ ] MCP tools identified (which skills use which)
- [ ] Current architecture documented (baseline)

### Post-Refactoring Validation

#### File Updates

- [ ] `{agent}.md` header reflects accurate role
- [ ] `{agent}.md` has <skills> section (complete)
- [ ] `{agent}.md` has <team> section (if coordinates others)
- [ ] `{agent}.md` activation includes skills + team awareness
- [ ] `{agent}.md` menu items reference skills correctly
- [ ] `{agent}.md` persona updated with team coordination
- [ ] `{agent}.agent.yaml` metadata updated
- [ ] `{agent}.agent.yaml` has team section (if applicable)
- [ ] `{agent}.agent.yaml` has skills section
- [ ] `{agent}-sidecar/instructions.md` has Skills-First model
- [ ] `{agent}-sidecar/instructions.md` has Team Architecture (if applicable)
- [ ] `{agent}-sidecar/instructions.md` has Handoff Protocols (if applicable)
- [ ] `{agent}-sidecar/config.yaml` has skills configuration
- [ ] `{agent}-sidecar/config.yaml` MCP references cleaned up
- [ ] `.claude/commands/{agent}/{agent}.md` synced

#### Workflow Updates

- [ ] Simple workflows deleted (list which ones)
- [ ] Kept workflows reference skills explicitly
- [ ] Kept workflows simplified (no duplicate skill logic)
- [ ] Menu items updated for deleted workflows

#### Testing

- [ ] Run `/{agent-name}` command - agent loads correctly
- [ ] Activation shows skills awareness
- [ ] Activation shows team awareness (if applicable)
- [ ] Menu displays correctly
- [ ] Skills-based menu items work (load SKILL.md correctly)
- [ ] Workflow-based menu items work
- [ ] Handoff packages generate correctly (if applicable)

---

## 9. Quick Reference: Jarvis Example

### What We Did for Jarvis

**Files Updated** (5):
1. `jarvis.md` - Added skills section, team section, updated persona, fixed activation steps, updated menu
2. `jarvis.agent.yaml` - Added team section, skills section, updated metadata to v2.0
3. `jarvis-sidecar/instructions.md` - Added Skills-First model, Team Architecture, Handoff Protocols
4. `jarvis-sidecar/config.yaml` - Added skills config, cleaned MCP references
5. `.claude/commands/jarvis/jarvis.md` - Synced with main

**Workflows Deleted** (2):
- `write-posts/` → Replaced by post-writer skill
- `write-scripts/` → Replaced by video-script-writer skill

**Workflows Kept & Simplified** (5):
- `research-topic/` - References deep-web-research + research-synthesizer skills
- `analyze-profile/` - References profile-analysis skill
- `competitive-analysis/` - Orchestrates profile-analysis across competitors
- `generate-ideas/` - References research-synthesizer skill
- `learn-voice/` - Orchestrates profile-analysis across platforms

**Skills Documented** (12):
- Content Generation: post-writer, video-script-writer, platform-formatter
- Research & Intelligence: deep-web-research, research-synthesizer, social-media-research, youtube-research
- Analysis: profile-analysis, evidence-tracker, voice-matcher
- Strategy & Growth: youtube-growth-mastery, youtube-thumbnail-mastery

**Team Coordination Added**:
- 3 sub-agents documented: AI Video Agent, AI Image Generator, Social Posting Agent
- 3 handoff protocols defined with JSON formats
- Activation includes team awareness step

**Result**: 43% reduction in workflow complexity, skills-first architecture, clear team hierarchy

---

## 10. Applying to Other Agents

### For AI Video Agent

**Current State**: Likely has workflows, may reference MCP tools
**Refactoring Needed**:
- [ ] Inventory skills in `.claude/skills/ai-video-agent/` (if any)
- [ ] Check if team member (receives from Jarvis, hands to Social Posting Agent)
- [ ] Update instructions.md with "Receives From" section (Jarvis handoff format)
- [ ] Update instructions.md with "Hands To" section (Social Posting Agent handoff format)
- [ ] Clean MCP references (HeyGen, Veo, Sora references)

### For AI Image Generator

**Current State**: Has skills (per activation), Emily JSON methodology
**Refactoring Needed**:
- [ ] Document existing skills in agent.md
- [ ] Add team awareness (receives from Jarvis, hands to Social Posting Agent)
- [ ] Define handoff protocols (from Jarvis, to Social Posting Agent)
- [ ] Ensure skills section matches actual skills directory

### For Social Posting Agent

**Current State**: Publishing specialist, receives from all agents
**Refactoring Needed**:
- [ ] Add "Receives From" section (Jarvis, AI Video Agent, AI Image Generator)
- [ ] Define expected handoff package formats from each agent
- [ ] Validate that it can handle all 3 handoff types
- [ ] Document team position (final step in pipeline)

---

## 11. Best Practices Summary

### Do's ✅

1. **Skills are self-documenting** - Let SKILL.md contain complete instructions
2. **Config references skills** - Don't duplicate MCP lists, point to skills
3. **Workflows reference skills** - "Load {skill}/SKILL.md" pattern
4. **Delete simple workflows** - If it just loads one skill, use skill directly
5. **Keep complex workflows** - Multi-step user interaction needs orchestration
6. **Update all 5 files** - Main .md, .agent.yaml, instructions.md, config.yaml, slash command
7. **Document team hierarchy** - Clear roles, handoff protocols, commands
8. **Version bump** - v2.0 for skills-first refactor
9. **Add executable scripts** - Python/JS for deterministic operations
10. **Test thoroughly** - Validate activation, skills, workflows, handoffs

### Don'ts ❌

1. **Don't duplicate MCP config** - Skills document their MCP usage
2. **Don't "invoke" skills** - Load and follow SKILL.md instead
3. **Don't keep unnecessary workflows** - Simple tasks = skills
4. **Don't forget team coordination** - Document sub-agents if applicable
5. **Don't skip handoff protocols** - Define JSON formats completely
6. **Don't update just one file** - All 5 files must be consistent
7. **Don't reference non-existent MCPs** - Use `claude mcp list` to verify
8. **Don't forget activation steps** - Skills awareness + team awareness critical
9. **Don't ignore scripts** - Add Python/JS for deterministic operations
10. **Don't skip testing** - Broken agent = wasted refactoring

---

## 12. File-by-File Update Checklist

### File 1: {agent}.md (Main Agent Definition)

**Location**: `bmad/agents/{agent-name}/{agent-name}.md`

**Updates**:
- [ ] Header `description:` - Accurate role
- [ ] `<agent title="">` - Accurate title
- [ ] Activation step: Remove outdated MCP references
- [ ] Activation step: Add skills awareness (step 10)
- [ ] Activation step: Add team awareness if applicable (step 11)
- [ ] Activation step: Renumber subsequent steps
- [ ] Add `<skills>` section with all skills
- [ ] Add `<team>` section if coordinates others
- [ ] Update `<persona>` with skills + team coordination
- [ ] Update `<menu>` items to reference skills
- [ ] Update menu descriptions to show which skills used

### File 2: {agent}.agent.yaml

**Location**: `bmad/agents/{agent-name}/{agent-name}.agent.yaml`

**Updates**:
- [ ] `metadata.title` - Accurate title
- [ ] `metadata.description` - Complete description
- [ ] `metadata.type` - team-head | specialist | standalone
- [ ] `metadata.version` - Bump to 2.0.0
- [ ] `metadata.updated` - Today's date
- [ ] Add `team:` section if coordinates others
- [ ] Add `skills:` section with categories
- [ ] Update `persona.role` - Match .md file
- [ ] Update `persona.identity` - Include skills + team
- [ ] Update `persona.principles` - Add coordination if applicable
- [ ] Update `critical_actions` - Add skills awareness

### File 3: {agent}-sidecar/instructions.md

**Location**: `bmad/agents/{agent-name}/{agent-name}-sidecar/instructions.md`

**Updates**:
- [ ] Update Core Directives - Role, domain, access, team leadership
- [ ] Add Skills-First Execution Model section
- [ ] List all available skills with when to load
- [ ] Add "When to Use Skills vs Workflows" decision tree
- [ ] Add Team Architecture section (if coordinates others)
- [ ] Add Handoff Protocols section (if coordinates others)
- [ ] Add Handoff Quality Standards
- [ ] Update/replace MCP Integration Protocol
- [ ] Remove outdated sections (Apify discovery, old MCPs)
- [ ] Update Quality Standards with team handoffs
- [ ] Update Special Instructions with team coordination

### File 4: {agent}-sidecar/config.yaml

**Location**: `bmad/agents/{agent-name}/{agent-name}-sidecar/config.yaml`

**Updates**:
- [ ] Add skills_directory
- [ ] Add skills_execution_model
- [ ] Add skills_available section (all skills listed)
- [ ] Add skills_with_scripts (if applicable)
- [ ] Add skill_loading_rules
- [ ] Replace mcp_servers section with mcp_tools_overview
- [ ] Add currently_connected (actual MCP servers)
- [ ] Add skill_mcp_mapping
- [ ] Add cost_optimization tiers
- [ ] Keep/update custom_modules (if applicable)

### File 5: .claude/commands/{agent}/{agent}.md

**Location**: `.claude/commands/{agent-name}/{agent-name}.md`

**Updates**:
- [ ] Sync header with main .md file
- [ ] Sync agent title with main .md file
- [ ] Sync activation steps with main .md file
- [ ] Sync persona with main .md file
- [ ] Sync menu with main .md file

**Tip**: Copy entire sections from main {agent}.md to ensure sync

---

## 13. Step-by-Step Workflow Simplification

### For Each Workflow to Simplify

**Template**:

**File**: `workflows/{workflow-name}/instructions.md`

**Find steps that duplicate skill logic**:
```markdown
<!-- BEFORE: Workflow duplicates skill -->
<step n="3" goal="Research topic">
  <action>Use exa search tool...</action>
  <action>Use apify if needed...</action>
  <action>Synthesize results...</action>
  <action>Organize into categories...</action>
</step>

<!-- AFTER: Workflow references skill -->
<step n="3" goal="Research using deep-web-research skill">
  <action>Load and follow {project-root}/.claude/skills/{agent}/deep-web-research/SKILL.md</action>

  <action>**Execute per skill instructions:**
    Parameters: topic={topic}, depth={depth}
    Follow SKILL.md for: tool routing, synthesis, organization
  </action>

  <note>Skill handles complete research orchestration</note>
</step>
```

**Pattern**:
1. Identify duplicated logic
2. Confirm skill has that logic
3. Replace with "Load SKILL.md"
4. Provide parameters
5. Let skill handle execution

---

## 14. Testing Your Refactored Agent

### Test 1: Activation

```bash
# In Claude Code
/your-agent-name

# Should see:
# 1. Config loaded ✓
# 2. Skills awareness displayed ✓
# 3. Team awareness displayed (if applicable) ✓
# 4. Menu displayed with skills-first items ✓
```

### Test 2: Skills-Based Menu Items

```
# Select a skills-based menu item (e.g., *write-post)

# Should:
# 1. Ask for parameters ✓
# 2. Reference loading skill ✓
# 3. Follow skill instructions ✓
# 4. Produce expected output ✓
# 5. Save to outputs/ folder ✓
```

### Test 3: Workflow-Based Menu Items

```
# Select a workflow menu item (e.g., *learn-voice)

# Should:
# 1. Load workflow.yaml ✓
# 2. Execute multi-step process ✓
# 3. Reference skills at appropriate steps ✓
# 4. Handle user choices correctly ✓
# 5. Save outputs correctly ✓
```

### Test 4: Handoff Packages (if team head)

```
# Generate content that requires handoff

# Should:
# 1. Create handoff JSON with all fields ✓
# 2. Save to outputs/{date}/{session}/handoff-to-{agent}.json ✓
# 3. Tell user which command to run next ✓
# 4. Handoff package validates (all required fields) ✓
```

---

## 15. Template: New Agent with Skills-First

### When Creating NEW Agent

**Use this structure from the start**:

```
1. Create agent folder:
   bmad/agents/{agent-name}/

2. Create main agent file:
   {agent-name}.md with:
   - Activation (15 steps including skills + team)
   - <skills> section
   - <team> section (if applicable)
   - <persona>
   - <menu>

3. Create agent YAML:
   {agent-name}.agent.yaml with:
   - metadata (type: team-head | specialist)
   - team section (if applicable)
   - persona
   - skills section
   - critical_actions

4. Create sidecar folder:
   {agent-name}-sidecar/ with:
   - instructions.md (Skills-First model + Team Architecture)
   - config.yaml (skills config, MCP overview)
   - memories.md (optional)
   - workflows/ (only for complex orchestration)

5. Create skills:
   .claude/skills/{agent-name}/ with:
   - {skill-1}/SKILL.md
   - {skill-2}/SKILL.md
   - Each with reference/ and scripts/ as needed

6. Create slash command:
   .claude/commands/{agent-name}/{agent-name}.md
   (Sync with main .md)
```

**Result**: Skills-first from day 1, no refactoring needed later

---

## 16. Real-World Example: Jarvis Transformation

### Before (Workflow-Heavy)

```
Menu Item: *write-posts
    ↓
Workflow: write-posts/workflow.yaml
    ↓
Instructions: write-posts/instructions.md (7 steps)
    ↓
Step 2: Invoke autogen (broken)
    ↓
Step 5: Apply voice profile
    ↓
Step 6: Format for platform
    ↓
Result: Nested complexity, broken autogen, hard to maintain
```

**Files**: 3 (menu, workflow.yaml, instructions.md)
**Complexity**: HIGH (3 layers, 7 steps)

### After (Skills-First)

```
Menu Item: *write-post (action handler)
    ↓
Action: "Load post-writer/SKILL.md"
    ↓
Skill: Complete instructions in SKILL.md
    ↓
Optional: Load voice-matcher/SKILL.md
    ↓
Optional: Load platform-formatter/SKILL.md
    ↓
Result: Simple, direct, self-contained
```

**Files**: 1 (menu with action → skill)
**Complexity**: LOW (1-2 layers, skill self-orchestrates)

### Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Workflows | 7 | 5 | 29% reduction |
| Simple workflows | 2 | 0 | 100% eliminated |
| Layers (write post) | 3 | 1 | 67% reduction |
| Files to update (change) | 3 | 1 | 67% fewer |
| Skills documented | 0 | 12 | +12 capabilities |
| Team coordination | None | 3 agents | +Clear hierarchy |

---

## 17. Conclusion

### Key Takeaways

1. **Skills are knowledge packages** - Not tools to invoke, load when relevant
2. **Workflows for orchestration only** - Multi-step user interaction, not simple tasks
3. **Update all 5 files consistently** - Main .md, .agent.yaml, instructions.md, config.yaml, slash command
4. **Document team hierarchy** - Clear roles, handoff protocols, commands
5. **Let skills self-document** - MCP usage, cost optimization, execution logic
6. **Test thoroughly** - Activation, skills, workflows, handoffs

### The Skills-First Model

```
Simple Task → Direct Skill Reference
Complex Task → Workflow References Skills
Team Coordination → Handoff Protocols Between Agents
```

**Result**: Cleaner architecture, easier maintenance, better discoverability, continuous improvement as skills evolve

---

**Use this guide for refactoring any BMAD agent to skills-first architecture!**

*Generated from Jarvis refactoring - 2025-10-29*
