# What AgentKit and Claude SDK Actually Are

## OpenAI AgentKit (Oct 6, 2025)

**What it is:**
A complete toolkit for building AI agents that can perform multi-step tasks autonomously.

**Core Components:**

1. **Agent Builder**
   - Visual drag-and-drop canvas
   - Compose logic with nodes
   - Connect tools
   - Configure guardrails
   - Preview runs
   - Full versioning

2. **ChatKit**
   - Embeddable chat interfaces
   - Drop ChatGPT into your app/website
   - Custom prompts/workflows

3. **Evals for Agents**
   - Performance measurement
   - Test against different models (Claude, Gemini, etc.)
   - Eval workflows

4. **Connector Registry**
   - Secure tool integrations
   - Manage data across workspaces

**What Developers Build:**
- Travel agents (calendar + preferences integration)
- Sales agents (auto-draft proposals)
- Customer support (handle tickets → escalate to human)
- Any autonomous task-based program

**Real Results:**
- Christina Huang: Built agent in 8 minutes live onstage
- Ramp: 2 quarters → 2 sprints (75% dev time reduction)
- Carlyle: 50% dev time cut, 30% better accuracy

**The Approach:**
- Visual/no-code first
- Managed runtime (OpenAI hosts)
- Fast iteration
- Centralized platform

---

## Claude Agent SDK (Sep 29, 2025)

**What it is:**
Originally "Claude Code SDK" (for coding), renamed to reflect broader use. Framework for building autonomous agents with computer access.

**Core Philosophy:**
"Give Claude a computer" - Terminal, bash commands, file editing, code execution

**What it Enables:**

1. **Computer Access**
   - Run bash commands
   - Edit files
   - Write and execute code
   - Full terminal control

2. **Context Management**
   - Agentic file search
   - Semantic search
   - Auto message compaction (long conversations)

3. **Execution Tools**
   - Custom tools
   - Bash scripts
   - MCP (Model Context Protocol) integrations

4. **Verification Loop**
   - Agent evaluates own work
   - Rules-based checks
   - Visual feedback
   - LLM judgment

**What Developers Build:**
- Finance agents (portfolio analysis, investment research)
- Personal assistants (travel, calendar, briefings)
- Customer support (complex tickets, data gathering)
- Research agents (document analysis)
- Coding agents (obviously - it's from Claude Code)

**At Anthropic:**
- Deep research
- Video creation
- Note-taking
- Powers "almost all major agent loops"

**The Approach:**
- Code-first
- Self-hosted (you run it)
- Full control via MCP servers
- Decentralized

---

## Key Difference

**AgentKit:**
- Visual builder (drag-drop)
- Managed runtime (they host)
- Fast to ship
- But: Locked into OpenAI platform

**Claude SDK:**
- Code-first (write code)
- Self-hosted (you run)
- Full control
- But: More setup work

**The Tradeoff:**
Speed (AgentKit) vs Control (Claude SDK)

---

## What NOT to Say

❌ "Train AI agents" - You don't train them, you BUILD them
❌ Generic "automation" - Be specific about what they automate
❌ Made-up features - Stick to what's documented
❌ Fabricated testing - Use real developer experiences only

---

## What TO Focus On

✅ Real enterprise results (Ramp, Carlyle, LY Corp)
✅ Specific capabilities (Agent Builder, MCP servers, Evals)
✅ The tradeoff (visual/fast vs code/control)
✅ What developers are actually building (travel, sales, support agents)
✅ Critical perspectives (lock-in concerns)
