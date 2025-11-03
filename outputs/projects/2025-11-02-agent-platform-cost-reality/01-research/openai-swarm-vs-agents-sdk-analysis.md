# OpenAI's Agent Strategy: Swarm vs Agents SDK vs AgentKit

**Research Date**: Nov 2, 2025
**Purpose**: Understand OpenAI's fragmented agent offerings vs Claude SDK unified approach

---

## The Confusion: OpenAI Has THREE Different Things

### 1. Swarm (October 2024) - "Educational Only"

**Status**: Experimental, NOT for production
**Purpose**: Learning and prototyping multi-agent patterns
**License**: MIT (open source)
**GitHub**: 20.6K stars
**Positioning**: "Educational framework... managed by OpenAI Solution team"

**Official Warning from README**:

> "Swarm is primarily intended for educational and experimental use, though OpenAI advises against using Swarm in production settings"

**What it is**: Lightweight client-side framework for agent handoffs
**What it ISN'T**: Production-ready, supported, or maintained for real deployments

**Source**: https://github.com/openai/swarm

---

### 2. Agents SDK (March 2025) - "Production-Ready Swarm"

**Status**: Open source, production-ready
**Purpose**: Multi-agent orchestration with handoffs
**Launch**: March 11, 2025
**GitHub**: openai/openai-agents-python (17K stars)
**Positioning**: "Production-ready upgrade of Swarm"

**Key Features**:

- Agent loop (built-in tool calling)
- Handoffs (agent-to-agent delegation)
- Guardrails (input/output validation)
- Sessions (auto conversation history)
- Tracing (built-in observability)

**Critical Limitation**:

> "Technically open-source, it's designed to work primarily with OpenAI's models"

**Provider Support**: OpenAI native, LiteLLM support added (but secondary)

**The Reality**: Open source code, but still OpenAI-centric ecosystem

**Source**: https://openai.github.io/openai-agents-python/

---

### 3. AgentKit (October 2025) - "Managed Platform"

**Status**: Production platform (managed by OpenAI)
**Purpose**: Visual agent builder + managed runtime
**Launch**: October 6, 2025
**Components**: Agent Builder (visual canvas), ChatKit (UI), Evals, Connector Registry

**Positioning**: "Everything you need to go from prototype to production"

**Architecture**: Platform-first (not just SDK)

- Visual builder (drag-drop nodes)
- Managed runtime (OpenAI hosts)
- Built-in tooling (web search, file search, computer use)
- Integrated evals

**The Play**: Developer lock-in via convenience + visual tools

**Billing**: Starts November 1, 2025 (pay-as-you-go, no platform fee)

**Source**: https://openai.com/index/introducing-agentkit/

---

## OpenAI's Fragmented Strategy

**The Timeline**:

- Oct 2024: Swarm (experimental, "don't use in production")
- Mar 2025: Agents SDK (production-ready, but OpenAI-centric)
- Oct 2025: AgentKit (managed platform, full lock-in)

**The Pattern**: Three overlapping products, unclear differentiation

**When to use which** (from community research):

- Swarm: Learning only (OpenAI says don't use in production)
- Agents SDK: Code-first multi-agent IF you're okay with OpenAI lock-in
- AgentKit: Managed platform IF you want visual builder + convenience

**The Problem**: Developers confused about which to adopt

---

## Claude SDK: One Clear Answer

**Launch**: September 29, 2025 (7 days BEFORE AgentKit)
**Status**: Production-ready from day 1
**License**: Open source
**Architecture**: Library-first (not platform)

**Key Differentiators**:

### 1. Truly Open Standard (MCP)

- Model Context Protocol = open standard for tool integration
- Build once, works across ANY agent platform
- 200+ community MCP servers already
- Not locked to Claude (though optimized for it)

**vs OpenAI**: Proprietary connector registry (AgentKit), OpenAI-centric SDK (Agents SDK)

### 2. Self-Hosted by Design

- You run the agent (not Anthropic)
- Full control: data, compliance, deployment
- Zero platform dependency

**vs OpenAI AgentKit**: Managed runtime (OpenAI hosts, you depend on their infra)

### 3. Production Focus from Start

- Powers "almost all major agent loops" at Anthropic (per launch post)
- Built on same harness as Claude Code
- Enterprise-ready: permissions, audit, controls

**vs OpenAI Swarm**: Educational only, explicitly NOT for production
**vs OpenAI Agents SDK**: Production-ready but newer, smaller ecosystem

### 4. Developer Control Philosophy

- Code-first (no visual builder abstraction)
- Explicit tool definitions
- You decide orchestration logic

**vs OpenAI AgentKit**: Visual builder (faster but opaque failures)

---

## The Strategic Difference

### OpenAI's Bet: Platform Lock-In

**The play**:

- AgentKit visual builder = convenient but proprietary
- Managed runtime = fast setup but dependency
- Connector registry = integrated but closed

**The model**: SaaS platform revenue

**The risk**: Developers choose flexibility over convenience

---

### Anthropic's Bet: Ecosystem Standards

**The play**:

- MCP open standard = community contributions
- Self-hosted = zero dependency
- Library-first = maximum flexibility

**The model**: API usage revenue (agnostic to deployment)

**The win condition**: MCP becomes the standard (like AWS for cloud)

---

## Why Claude SDK "Just Makes More Sense"

### 1. One Clear Path (Not Three Confusing Options)

- OpenAI: Swarm (don't use) vs Agents SDK (maybe?) vs AgentKit (managed)
- Claude: One SDK, production-ready, self-hosted

### 2. Open Standard vs Proprietary

- MCP: Build tools once, work everywhere
- OpenAI: Build for AgentKit, locked to OpenAI

### 3. Every App Will Embed Agents

**Anthropic's thesis**: Not "build agents as products"
**But**: "Embed agents into existing products"

**This requires**:

- Self-hosting (not managed platforms)
- Custom integrations (not connector registries)
- Full control (not abstracted runtimes)

**Claude SDK = designed for this**
**AgentKit = designed for standalone agent products**

### 4. Community Velocity

- MCP: 200+ servers in months
- Open standard attracts contributors
- Network effects favor openness

**vs AgentKit**: Proprietary, OpenAI-only contributions

---

## The Price Angle (Your Original Insight)

**Now add cost layer**:

**Gemini is cheapest** ($0.00008/task)
**BUT Claude SDK makes more sense** because:

1. **15x premium** ($0.0012 vs $0.00008) buys you:
   - Self-hosting (not managed dependency)
   - MCP open standard (not proprietary registry)
   - Zero lock-in (not 3-year commitment)
   - Community ecosystem (not vendor-only)

2. **Caching optimization** (90% savings):
   - Anthropic innovated on this FIRST
   - Cache hit: $0.0012 → $0.00034 (72% off)
   - Google copied after (also 90%)

3. **Long-term economics**:
   - Managed platforms charge convenience tax
   - Self-hosted = one-time DevOps cost, then just API tokens
   - Better unit economics at scale

---

## The Contrarian Take (Your Voice)

**Everyone's picking platforms on price.**

**Google: Cheapest tokens ($0.00008)**
**OpenAI: Managed convenience (AgentKit)**
**Claude: 15x more expensive ($0.0012)**

**Yet developers building real products choose Claude SDK.**

**Why?**

Not because it's cheaper (it's not).
Not because it's easier (AgentKit visual builder wins).

**Because architecture > price in the long game.**

- Open standard (MCP) > proprietary registry
- Self-hosted > managed dependency
- One clear SDK > three confusing options
- Community velocity > vendor control

**The bet**: Every app will embed agents. Not as platforms. As features.

**That requires**: Control, customization, zero lock-in.

**Claude SDK delivers. AgentKit doesn't.**

**I'm paying the 15x premium.**

---

## Key Data for Post

**The Comparison**:

- **Swarm**: Educational only, "don't use in production" (useless for real work)
- **Agents SDK**: Production-ready but OpenAI-locked (lipstick on Swarm)
- **AgentKit**: Managed platform (convenience tax + lock-in)
- **Claude SDK**: Self-hosted, MCP standard, zero lock-in (the real choice)

**The Numbers**:

- Gemini: $0.00008/task (cheapest)
- Claude: $0.0012/task (15x more)
- OpenAI: $0.0015/task

**The Insight**:
OpenAI fragmented (3 products).
Claude focused (1 SDK).

**The Ecosystem**:

- MCP servers: 200+ (community-driven)
- AgentKit connectors: Proprietary (vendor-only)

**The Architecture**:

- Claude: Agents as embedded features
- AgentKit: Agents as platform products

**The Conviction**:
"i'm paying the 15x premium" (contrarian confidence, outcome-based evaluation)

---

## Post Structure Recommendation

**Hook**: "claude sdk costs 15x more than gemini. i'm using it anyway. here's why price isn't the only moat."

**Body**:

1. Price comparison (show the 15x gap)
2. OpenAI's confusion (Swarm=useless, Agents SDK=locked, AgentKit=managed)
3. Claude's clarity (one SDK, self-hosted, MCP standard)
4. The ecosystem bet (every app embeds agents)
5. Why premium makes sense (control > convenience, open > proprietary)

**Close**: "openai has three products. anthropic has one answer. i'm paying the premium."

**Voice**: Builder-Philosopher (contrarian, outcome-based, personal conviction)

---

**Ready to write this version?**
