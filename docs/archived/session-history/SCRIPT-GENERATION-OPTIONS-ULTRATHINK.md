# ULTRATHINK: Script Generation Options for Jarvis

**Question:** How should we implement write-posts and write-scripts workflows?

**Options:**

1. social-media-mcp create_post (interactive, GPT-5/Sonnet 4.5)
2. AutoGen multi-agent system (proven, deterministic)
3. AutoGen as a Claude Skill (hybrid approach)
4. Native Claude generation (simple)

---

## Option 1: social-media-mcp create_post

**What it is:**

- MCP tool in social-media-mcp
- Uses GPT-5 or Claude Sonnet 4.5
- Interactive Q&A mode
- Platform-specific formatting

**Observed Behavior:**

```
User: "Write LinkedIn post about X"
↓
create_post asks: "Who is target audience?"
User answers
↓
create_post asks: "What is the goal?"
User answers
↓
create_post asks: "What tone?"
User answers
↓
create_post generates content
```

**Pros:**

- ✅ Already exists
- ✅ Uses latest models
- ✅ Platform formatting built-in
- ✅ postImmediately: false (preview mode)

**Cons:**

- ❌ Q&A mode (3-4 questions before generating)
- ❌ Conversational overhead
- ❌ "require is not defined" errors appearing
- ❌ Can't control agent process
- ❌ Workflow interruption (user must answer)

**Viability:** Moderate - works but clunky for workflows

---

## Option 2: AutoGen Multi-Agent System (What You Showed Me)

**What it is:**

- Python multi-agent system using AutoGen
- 8+ specialized agents (Research, Title, Hook, Content, Tone, Outro, Reviewer, etc.)
- RoundRobinGroupChat orchestration
- Each agent has specific role/prompt

**How it works:**

```
topic → Research_Agent (gathers info)
      → Title_Agent (creates title)
      → Intro_Hook_Agent (creates hook)
      → Content_Agent (main content)
      → Tone_Agent (applies MKBHD style)
      → Outro_Agent (CTA)
      → Reviewer_Agent (fact-checks)
      → Final polished script
```

**Agents:**

- Master_Agent: Determines if reel vs video
- Research_Agent: Uses search_tool (Tavily)
- Title_Agent: Clickbait titles
- Intro_Hook_Agent: 8-word hooks
- Content_Agent: Main content
- Tone_Agent: MKBHD conversational style
- Formatter_Agent: Natural spoken English
- Outro_Agent: Engagement prompts
- Reviewer_Agent: Fact checking

**Pros:**

- ✅ Specialized agents for each aspect
- ✅ Deterministic (no Q&A)
- ✅ Proven system (you built this)
- ✅ Full control over prompts
- ✅ Fact-checking built in
- ✅ Style consistency (MKBHD tone)

**Cons:**

- ❌ Requires Python execution
- ❌ Needs AutoGen library
- ❌ More complex
- ❌ Separate from Claude

**Viability:** High - proven but needs integration

---

## Option 3: AutoGen as Claude Skill ⭐ RECOMMENDED

**What it is:**

- Package AutoGen multi-agent code as a Claude Skill
- Skill contains Python scripts (like slack-gif-creator)
- Skill invokes AutoGen, gets result
- Follows official Skills pattern

**Structure:**

```
.claude/skills/jarvis/autogen-script-generator/
├── SKILL.md (when to invoke, how to use)
├── scripts/
│   ├── script_generator.py (AutoGen multi-agent system)
│   ├── agents.py (agent definitions)
│   ├── prompts.py (all the system messages you showed)
│   └── requirements.txt (autogen-agentchat, etc.)
└── reference/
    └── agent-roles.md (what each agent does)
```

**SKILL.md:**

```markdown
---
name: autogen-script-generator
description: Generate video scripts using multi-agent system with specialized agents for title, hook, content, tone, and review. Use when user needs video script, reel script, or YouTube content. Handles short-form (reels, shorts) and long-form (YouTube videos) with MKBHD-style tone.
---

# AutoGen Script Generator

## Instructions

When user needs a script:

1. Execute: python scripts/script_generator.py with parameters:
   - topic: {user's topic}
   - duration: {60s for reels, 3-10min for videos}
   - platform: {youtube, reels, tiktok}
   - tone: {professional, casual, MKBHD-style}

2. AutoGen multi-agent system runs:
   - Research_Agent gathers info
   - Title_Agent creates title
   - Hook_Agent creates opening
   - Content_Agent writes main content
   - Tone_Agent applies style
   - Reviewer_Agent fact-checks

3. Returns polished script ready to use

See reference/agent-roles.md for details on each agent.
```

**How it works:**

```
Workflow: "Generate YouTube script about {topic}"
↓
Claude sees "script" → Invokes autogen-script-generator Skill
↓
Skill runs: python scripts/script_generator.py --topic "X" --duration "90s"
↓
AutoGen agents collaborate
↓
Returns: Polished script
↓
Workflow saves script, presents to user
```

**Pros:**

- ✅ Follows official Skills pattern (slack-gif-creator has Python)
- ✅ Uses your proven AutoGen system
- ✅ Deterministic (no Q&A)
- ✅ Full control
- ✅ Reusable across workflows
- ✅ MKBHD style built-in

**Cons:**

- ⚠️ Requires AutoGen installation (~10 min)
- ⚠️ Python execution overhead
- ⚠️ Initial setup time (~1 hour)

**Viability:** ⭐ BEST - proven tech + Skills pattern

---

## Option 4: Native Claude (Simplest)

**Skip all complexity, use Claude directly in workflow:**

```xml
<action>Generate {platform} script about {topic}:
  - Create compelling hook
  - Main content with examples
  - Strong CTA
  - {duration} length
  - {tone} style
</action>
```

**Pros:**

- ✅ Simple
- ✅ No dependencies
- ✅ Works immediately

**Cons:**

- ❌ Less specialized than AutoGen
- ❌ No multi-agent collaboration
- ❌ Generic output

---

## 🎯 ULTRATHINK RECOMMENDATION

**Use Option 3: AutoGen Multi-Agent as a Skill**

**Why:**

1. **You already have the code** - the AutoGen system is proven
2. **Skills CAN execute Python** - slack-gif-creator pattern proves this
3. **Solves create_post issues** - no Q&A, no "require" errors
4. **Professional quality** - multi-agent collaboration, fact-checking, tone consistency
5. **Reusable** - one Skill, used by write-posts AND write-scripts

**Implementation:**

1. Create autogen-script-generator/ Skill folder
2. Copy your AutoGen code to scripts/
3. Write SKILL.md to invoke it
4. Install AutoGen dependencies
5. Test: "Generate reel about AI tools"

**Time:** ~1-2 hours
**Result:** Proven, reliable script generation using your existing multi-agent system!

---

**Want me to package your AutoGen code as a Claude Skill?**

This is the cleanest solution - uses proven tech (your AutoGen system) in the official Skills pattern (executable code like slack-gif-creator)!
