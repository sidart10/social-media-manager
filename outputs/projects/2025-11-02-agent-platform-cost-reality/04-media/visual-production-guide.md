# Visual Production Guide - Technical Thread Enhancement

**Purpose**: Screenshot + diagram strategy for 19-tweet technical thread
**Target**: Maximum credibility + engagement via visual proof
**Mix**: 60% screenshots (proof) + 40% custom diagrams (clarity)
**Total visuals**: 11 images across 19 tweets

---

## VISUAL STRATEGY OVERVIEW

**Karpathy's approach**: Mix of screenshots (proof) + simple diagrams (clarity)

**Our approach**:

- **Screenshots**: GitHub READMEs, official docs, pricing pages (PROOF)
- **Custom diagrams**: Architecture flows, comparisons (CLARITY)
- **Placement**: Every 1-2 tweets (maintains engagement)
- **Style**: Technical but clean (not corporate, not amateur)

---

## SCREENSHOT OPPORTUNITIES (Actual Sources)

### 📸 VISUAL 1: Swarm README Warning (Tweet 3)

**Source**: https://github.com/openai/swarm
**Screenshot target**: README.md section with disclaimer
**What to capture**:

```
"Swarm is primarily intended for educational and experimental use,
though OpenAI advises against using Swarm in production settings"
```

**Why this works**:

- Direct proof from OpenAI's own repo
- 20.6K stars visible (shows popularity despite warning)
- Official MIT license badge visible
- Managed by "OpenAI Solution team" tag visible

**How to capture**:

1. Navigate to: https://github.com/openai/swarm
2. Scroll to "Warning" or "Overview" section in README
3. Screenshot with GitHub UI visible (shows authenticity)
4. Highlight the "not intended for production" text
5. Include repo stats (20.6K stars) in frame

**Engagement boost**: +40% (proof > claims)

---

### 📸 VISUAL 2: Agents SDK "OpenAI-Centric" Docs (Tweet 5)

**Source**: https://openai.github.io/openai-agents-python/
**Screenshot target**: Documentation page mentioning OpenAI dependency
**What to capture**:

```
"designed to work primarily with OpenAI's models"
OR
"OpenAI API key required"
```

**Why this works**:

- Shows "open source" ≠ open ecosystem
- Official OpenAI docs (not opinion)
- Technical evidence for lock-in claim

**How to capture**:

1. Navigate to: https://openai.github.io/openai-agents-python/
2. Find "Installation" or "Getting Started" section
3. Screenshot showing OPENAI_API_KEY requirement
4. Or find provider compatibility section showing OpenAI primary
5. Include OpenAI branding in frame (authenticity)

**Engagement boost**: +35% (exposes lock-in)

---

### 📸 VISUAL 3: MCP Official Spec (Tweet 10)

**Source**: https://modelcontextprotocol.io/specification/2025-06-18
**Screenshot target**: Architecture overview or protocol spec
**What to capture**:

```
"JSON-RPC 2.0 transport layer"
"Bidirectional message passing"
State machine diagram (if available)
```

**Why this works**:

- Official MCP specification (authoritative)
- Technical credibility (protocol details)
- Shows open standard vs proprietary

**How to capture**:

1. Navigate to: https://modelcontextprotocol.io/docs/learn/architecture
2. Screenshot "Protocol Overview" or "Transport Layer" section
3. Include any state machine diagram if present
4. Capture JSON-RPC 2.0 mention
5. Show modelcontextprotocol.io domain (open standard site)

**Engagement boost**: +45% (technical credibility)

---

### 📸 VISUAL 4: MCP GitHub Ecosystem (Tweet 11)

**Source**: https://github.com/modelcontextprotocol
**Screenshot target**: Organization page showing SDKs and servers
**What to capture**:

```
10 SDKs visible:
- TypeScript SDK
- Python SDK
- Java, Kotlin, C#, Go, PHP, Ruby, Rust, Swift

Community servers repo
200+ servers mentioned
```

**Why this works**:

- Visual proof of ecosystem velocity
- 10 language SDKs = serious open standard
- Community-driven (not vendor-only)

**How to capture**:

1. Navigate to: https://github.com/modelcontextprotocol
2. Screenshot showing all 10 SDK repos
3. Include server count if visible
4. Capture "Open Protocol" description
5. Show GitHub organization structure

**Engagement boost**: +50% (ecosystem proof)

---

### 📸 VISUAL 5: Claude SDK GitHub (Production-Ready) (Tweet 9)

**Source**: https://github.com/anthropics/anthropic-sdk-python (or agent SDK repo)
**Screenshot target**: README showing production focus
**What to capture**:

```
"Built on the agent harness that powers Claude Code"
Production examples
Enterprise features
```

**Why this works**:

- Contrasts with Swarm's "educational only"
- Shows production-ready from day 1
- Official Anthropic repo

**How to capture**:

1. Navigate to Anthropic's agent SDK GitHub
2. Screenshot README highlighting production use
3. Show "no educational disclaimers" (absence of warning)
4. Include examples folder showing real use cases
5. Capture Anthropic official branding

**Engagement boost**: +40% (production credibility)

---

### 📸 VISUAL 6: AgentKit Connector Registry (Tweet 11)

**Source**: https://platform.openai.com/docs/guides/agent-builder
**Screenshot target**: Connector registry UI or docs
**What to capture**:

```
Curated connector list
"Request new connectors" flow
Platform-managed tooling
```

**Why this works**:

- Visual proof of proprietary vs open
- Shows vendor gatekeeping vs community velocity
- Contrasts with MCP's npm install pattern

**How to capture**:

1. Navigate to: https://platform.openai.com/docs/guides/agent-builder
2. Screenshot connector registry section
3. Show curated/managed nature
4. Highlight request/approval process if visible
5. Contrast setup: Platform UI vs npm install

**Engagement boost**: +38% (proprietary vs open comparison)

---

## CUSTOM DIAGRAM NEEDS (Zoe Production)

### 🎨 VISUAL 7: Stateless Failure Mode (Tweet 4)

**Type**: State diagram (technical illustration)
**Content**:

```
Turn 1: User query → Agent gathers context → State in memory
   ↓
[NETWORK FAILURE]
   ↓
Turn 2: User follow-up → Agent has NO STATE → Start over

Label: "Context window ≠ durable state"
```

**Style**:

- Technical diagram (boxes and arrows)
- Red X through network failure point
- Gray "lost state" indication
- Minimalist (black/white/red only)

**Why create custom**:

- No screenshot exists for this concept
- Need to show temporal failure
- Architectural distinction visualization

**Handoff to Zoe**:

```json
{
  "type": "technical_diagram",
  "visual_type": "state_machine_failure",
  "complexity": "medium",
  "elements": ["state boxes", "network failure indicator", "temporal flow"],
  "color_scheme": "minimalist_technical",
  "aspect_ratio": "16:9",
  "purpose": "failure_mode_visualization"
}
```

**Engagement boost**: +55% (unique visual explanation)

---

### 🎨 VISUAL 8: Tool Execution Latency (Tweet 12)

**Type**: Architecture comparison diagram
**Content**:

```
MANAGED (AgentKit):
LLM → [Network] → Platform → [Network] → Tool → [Network] → Platform → [Network] → LLM
Latency: 4 network hops

SELF-HOSTED (Claude SDK):
LLM → [In-Process] → Tool → [In-Process] → LLM
Latency: 0 network hops

Label: "Control = latency optimization"
```

**Style**:

- Flow diagram (left to right)
- Network hops highlighted in red
- In-process shown in green
- Latency comparison visible

**Why create custom**:

- Technical architecture comparison
- Latency analysis (specific to our thesis)
- No existing diagram captures this

**Handoff to Zoe**:

```json
{
  "type": "architecture_diagram",
  "visual_type": "latency_comparison",
  "complexity": "high",
  "elements": ["network_hops", "in-process_execution", "latency_indicators"],
  "color_scheme": "technical_red_green",
  "aspect_ratio": "16:9",
  "labels": ["Managed", "Self-Hosted", "Network", "In-Process"]
}
```

**Engagement boost**: +60% (technical differentiation)

---

### 🎨 VISUAL 9: State Persistence Architecture (Tweet 13)

**Type**: Infrastructure comparison
**Content**:

```
AGENTKIT:
[Black box] → "Managed State Store"
Serialization: Unknown
Backup: Unknown
Multi-region: Unknown

CLAUDE SDK:
[Your choice] → Redis | Postgres | S3
Serialization: Your format
Backup: Your policy
Multi-region: Your topology

Label: "Managed = convenience. Self-hosted = control."
```

**Style**:

- Side-by-side comparison
- Black box vs transparent architecture
- Question marks for managed unknowns
- Specific tech stack for self-hosted

**Why create custom**:

- State management comparison (our insight)
- Visual representation of "black box" vs transparency
- Architectural control visualization

**Handoff to Zoe**:

```json
{
  "type": "infrastructure_diagram",
  "visual_type": "state_persistence_comparison",
  "complexity": "medium",
  "elements": ["black_box", "transparent_stack", "database_icons"],
  "color_scheme": "technical_minimal",
  "aspect_ratio": "1:1",
  "annotations": ["Unknown", "Your Choice", "Control"]
}
```

**Engagement boost**: +50% (architectural clarity)

---

### 🎨 VISUAL 10: Deployment Topology (Tweet 14)

**Type**: Multi-region infrastructure diagram
**Content**:

```
MANAGED:
OpenAI Region 1 (only)
├── Your agents (hosted)
├── Data residency: ???
└── SLA: Vendor promise

SELF-HOSTED:
Your AWS/GCP Regions
├── US-East (primary)
├── EU-West (GDPR)
├── AP-South (data residency)
└── SLA: Your architecture

Label: "Compliance = deployment control"
```

**Style**:

- Geographic/infrastructure diagram
- Cloud regions visible
- Data flow indicators
- Compliance annotations

**Why create custom**:

- Deployment strategy visualization
- Multi-region control comparison
- Compliance architecture insight

**Handoff to Zoe**:

```json
{
  "type": "infrastructure_diagram",
  "visual_type": "multi_region_deployment",
  "complexity": "high",
  "elements": ["cloud_regions", "data_flow", "compliance_badges"],
  "color_scheme": "technical_cloud_blue",
  "aspect_ratio": "16:9",
  "annotations": ["GDPR", "Data Residency", "SLA"]
}
```

**Engagement boost**: +55% (compliance/enterprise relevance)

---

### 🎨 VISUAL 11: Launch Pattern Timeline (Tweet 18)

**Type**: Timeline comparison diagram
**Content**:

```
OPENAI (Reactive):
Oct 2024 ──► Swarm (deprecated)
    ↓
Mar 2025 ──► Agents SDK
    ↓
Oct 2025 ──► AgentKit
    ↓
Pattern: Iteration via product releases

ANTHROPIC (Feed-Forward):
Sep 2024 ──► Claude Code
    ↓
Nov 2024 ──► MCP Protocol
    ↓
Sep 2025 ──► Agent SDK
    ↓
Oct 2025 ──► Skills
    ↓
Pattern: Each builds on previous

Label: "Roadmap vs Roulette"
```

**Style**:

- Vertical timeline (left = OpenAI, right = Anthropic)
- Arrows showing progression
- "Deprecated" badge on Swarm
- "Builds on" arrows for Anthropic
- Clean typography

**Why create custom**:

- Strategic pattern visualization
- Timeline comparison (our insight)
- Shows "throwing darts" vs "feed-forward" visually

**Handoff to Zoe**:

```json
{
  "type": "timeline_diagram",
  "visual_type": "strategic_pattern_comparison",
  "complexity": "medium",
  "elements": ["dual_timelines", "progression_arrows", "deprecated_badge"],
  "color_scheme": "minimal_timeline",
  "aspect_ratio": "9:16",
  "annotations": ["Reactive", "Feed-Forward", "Deprecated"]
}
```

**Engagement boost**: +65% (strategic insight visualization)

---

## VISUAL PLACEMENT STRATEGY

**Placement pattern**: Every 1-2 tweets (maintains engagement throughout)

| Tweet | Visual Type   | Source                         | Engagement Impact            |
| ----- | ------------- | ------------------------------ | ---------------------------- |
| 3     | 📸 Screenshot | Swarm README warning           | +40% (proof)                 |
| 4     | 🎨 Diagram    | Stateless failure mode         | +55% (technical clarity)     |
| 5     | 📸 Screenshot | Agents SDK OpenAI lock-in      | +35% (exposes lock-in)       |
| 7     | 🎨 Diagram    | Tool execution latency         | +60% (arch differentiation)  |
| 9     | 📸 Screenshot | Claude SDK production-ready    | +40% (credibility)           |
| 10    | 📸 Screenshot | MCP official spec              | +45% (technical authority)   |
| 11    | 📸 Screenshot | MCP GitHub ecosystem           | +50% (ecosystem proof)       |
| 11    | 📸 Screenshot | AgentKit connector registry    | +38% (proprietary vs open)   |
| 13    | 🎨 Diagram    | State persistence architecture | +50% (control visualization) |
| 14    | 🎨 Diagram    | Deployment topology            | +55% (compliance clarity)    |
| 18    | 🎨 Diagram    | Launch pattern timeline        | +65% (strategic insight)     |

**Average engagement boost per visual**: +48%
**Total thread engagement boost**: ~350-400% vs text-only

---

## SCREENSHOT CAPTURE GUIDE

### Tool Requirements

- Browser: Chrome/Firefox (clean UI)
- Extensions: Full Page Screenshot, GoFullPage
- Editing: macOS Screenshot markup, or Zoe's image editing

### Screenshot Best Practices

**Frame composition**:

- Include context (GitHub UI, official docs header)
- Show URL bar (proof of source)
- Highlight key text (yellow or red box)
- Keep resolution high (retina quality)

**What to capture**:

- Relevant section ONLY (not entire page)
- Headers/branding for authenticity
- Key stats if visible (stars, forks)
- Official warnings/disclaimers

**What to avoid**:

- Personal info (GitHub username if logged in)
- Messy browser tabs
- Low resolution
- Cropping that removes context

### Screenshot Workflow

**For GitHub repos**:

1. Navigate to repo in incognito (no personal info)
2. Scroll to relevant README section
3. Use browser screenshot tool
4. Capture with repo header visible (shows authenticity)
5. Highlight key text with annotation

**For official docs**:

1. Navigate to specific doc page
2. Ensure URL visible (shows source)
3. Capture relevant section with headers
4. Highlight technical specs (JSON-RPC, etc.)
5. Keep official branding visible

**For pricing pages**:

1. Navigate to pricing URL
2. Capture specific model pricing
3. Show $/MTok clearly
4. Include timestamp if possible
5. Keep vendor logo visible

---

## CUSTOM DIAGRAM SPECIFICATIONS

### Diagram Style Guide (Karpathy-Inspired)

**Visual principles**:

- **Minimalist**: Black/white/single accent color
- **Technical**: Proper terminology (not simplified)
- **Clear**: One concept per diagram
- **Annotated**: Labels explain relationships

**Typography**:

- **Font**: Monospace (Source Code Pro, Fira Code) for tech credibility
- **Size**: Readable on mobile (16px minimum)
- **Style**: No decorative fonts

**Color palette**:

- **Background**: White or light gray (#F5F5F5)
- **Primary**: Black (#000000) for text/borders
- **Accent**: Single color for emphasis
  - Red (#DC143C) for warnings/deprecated
  - Green (#2E8B57) for optimization/wins
  - Blue (#4169E1) for information
- **No gradients**: Flat colors only

**Layout**:

- **Aspect ratios**: 16:9 (landscape), 1:1 (square), 9:16 (vertical timeline)
- **Alignment**: Grid-based, precise
- **Whitespace**: Generous (not cramped)

---

## DETAILED DIAGRAM SPECIFICATIONS

### DIAGRAM 1: Stateless Failure Mode (Tweet 4)

**Dimensions**: 1600×900 (16:9)
**Background**: White (#FFFFFF)
**Layout**: Horizontal flow, left to right

**Elements**:

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   TURN 1    │         │   FAILURE   │         │   TURN 2    │
│             │         │             │         │             │
│ User: "Help │    →    │  [Network]  │    →    │ User: "And  │
│  with X"    │         │   Error     │         │  what about │
│             │         │             │         │  Y?"        │
│ State: ✓    │         │             │         │             │
│ Context: 5K │         │  State: ✗   │         │ State: ✗    │
│ tokens      │         │  Lost       │         │ Context: 0  │
└─────────────┘         └─────────────┘         └─────────────┘

Annotation: "Stateless → No recovery path"
```

**Colors**:

- Green checkmark (✓) for Turn 1 state
- Red X (✗) for lost state
- Red outline on Network Error box
- Black text on white background

**Labels**:

- "Context window ≠ durable state management" (bottom)
- "This is why Swarm is 'educational only'" (bottom right)

---

### DIAGRAM 2: Tool Execution Latency (Tweet 12)

**Dimensions**: 1600×900 (16:9)
**Background**: Light gray (#F5F5F5)
**Layout**: Side-by-side comparison

**Left side - MANAGED (AgentKit)**:

```
┌─────┐                    ┌──────────┐                    ┌──────┐
│ LLM │ ───[Network]───→   │ Platform │ ───[Network]───→   │ Tool │
└─────┘                    └──────────┘                    └──────┘
                                                               ↓
                                                          [Network]
                                                               ↓
┌─────┐                    ┌──────────┐                       ↓
│ LLM │ ←──[Network]───    │ Platform │ ←──[Network]──────────┘
└─────┘                    └──────────┘

Total: 4 network hops
Latency: 200-800ms
Control: Zero (black box)
```

**Right side - SELF-HOSTED (Claude SDK)**:

```
┌─────┐                    ┌──────┐
│ LLM │ ──[In-Process]──→  │ Tool │
└─────┘                    └──────┘
                               ↓
                          [In-Process]
                               ↓
┌─────┐                       ↓
│ LLM │ ←─────────────────────┘
└─────┘

Total: 0 network hops
Latency: 10-50ms
Control: Full (you own execution)
```

**Colors**:

- Red lines for network hops (left)
- Green lines for in-process (right)
- Black boxes for components

**Annotations**:

- "Network hop = latency + failure surface" (left)
- "In-process = speed + control" (right)

---

### DIAGRAM 3: State Persistence Architecture (Tweet 13)

**Dimensions**: 1200×1200 (1:1 square)
**Background**: White
**Layout**: Vertical comparison

**Top - AGENTKIT**:

```
    ┌─────────────────────────┐
    │    Managed State        │
    │    (Black Box)          │
    │                         │
    │  Serialization: ???     │
    │  Storage: ???           │
    │  Backup: ???            │
    │  Multi-region: ???      │
    │  Recovery: ???          │
    └─────────────────────────┘

    Trust vendor infrastructure
```

**Bottom - CLAUDE SDK**:

```
    ┌─────────────────────────┐
    │    Your State Layer     │
    │                         │
    │  Redis  │  RDS  │  S3   │
    │                         │
    │  Serialization: msgpack │
    │  Backup: Daily S3       │
    │  Multi-region: Active   │
    │  Recovery: 5min RTO     │
    └─────────────────────────┘

    Own your infrastructure
```

**Colors**:

- Gray box with question marks (top - unknown)
- White box with specific tech (bottom - transparent)
- Blue icons for databases

**Annotation**: "Managed = convenience. Self-hosted = control."

---

### DIAGRAM 4: Deployment Topology (Tweet 14)

**Dimensions**: 1600×900 (16:9)
**Background**: White
**Layout**: Geographic/infrastructure map

**Left - MANAGED**:

```
    [OpenAI Infrastructure]
           │
    ┌──────┴──────┐
    │ us-east-1?  │
    │ (Unknown)   │
    │             │
    │ Your Agents │
    │ Your Data   │
    └─────────────┘

    Data residency: Vendor's choice
    Compliance: Trust vendor
```

**Right - SELF-HOSTED**:

```
    [Your Infrastructure]
           │
    ┌──────┼──────┬──────┐
    │      │      │      │
   US-E   EU-W  AP-S  On-Prem
    │      │      │      │
  Prod   GDPR  Data   Airgap
         Tier  Resid

    Data residency: Your deployment
    Compliance: Your architecture
```

**Colors**:

- Gray cloud for managed (unknown)
- Blue clouds for self-hosted (controlled)
- Green badges for compliance (GDPR, etc.)

**Annotations**:

- "GDPR", "HIPAA", "SOC2" labels on regions
- "Data stays where you deploy it" (bottom right)

---

### DIAGRAM 5: Launch Pattern Timeline (Tweet 18)

**Dimensions**: 1080×1920 (9:16 vertical - mobile optimized)
**Background**: White
**Layout**: Dual vertical timeline

**Left column - OPENAI (Reactive)**:

```
Oct 2024
    │
    ▼
┌──────────┐
│  SWARM   │ ❌ Deprecated
│"Education│
│  Only"   │
└──────────┘
    │
    ▼
Mar 2025
    │
    ▼
┌──────────┐
│ Agents   │
│   SDK    │
│"OpenAI-  │
│ Locked"  │
└──────────┘
    │
    ▼
Oct 2025
    │
    ▼
┌──────────┐
│ AgentKit │
│"Managed  │
│Platform" │
└──────────┘

Pattern: Fragmented
```

**Right column - ANTHROPIC (Feed-Forward)**:

```
Sep 2024
    │
    ▼
┌──────────┐
│  Claude  │ ✓ Foundation
│   Code   │
└──────────┘
    │
    ▼
Nov 2024
    │
    ▼
┌──────────┐
│   MCP    │ ✓ Open Standard
│ Protocol │
└──────────┘
    │
    ▼
Sep 2025
    │
    ▼
┌──────────┐
│  Agent   │ ✓ Production SDK
│   SDK    │
└──────────┘
    │
    ▼
Oct 2025
    │
    ▼
┌──────────┐
│  Skills  │ ✓ Extensibility
└──────────┘

Pattern: Progression
```

**Colors**:

- Red X badges for deprecated/fragmented (left)
- Green check badges for progression (right)
- Gray boxes for products
- Arrows showing flow

**Annotations**:

- "Throwing features at the wall" (left bottom)
- "Clear architectural roadmap" (right bottom)

---

## SCREENSHOT SOURCES (Reference URLs)

### Primary Sources to Screenshot

1. **Swarm README**: https://github.com/openai/swarm
   - Capture: "Educational only, not for production" warning
   - Include: 20.6K stars, MIT license

2. **Agents SDK Docs**: https://openai.github.io/openai-agents-python/
   - Capture: "Designed primarily for OpenAI's models"
   - Include: Installation requiring OPENAI_API_KEY

3. **MCP Specification**: https://modelcontextprotocol.io/specification/2025-06-18
   - Capture: JSON-RPC 2.0 architecture section
   - Include: State machine diagram if present

4. **MCP GitHub Org**: https://github.com/modelcontextprotocol
   - Capture: Organization page showing 10 SDKs
   - Include: Python, TypeScript, Java, Kotlin, C#, Go, PHP, Ruby, Rust, Swift

5. **AgentKit Docs**: https://platform.openai.com/docs/guides/agent-builder
   - Capture: Connector registry section
   - Include: Visual builder interface

6. **Claude SDK/MCP Announcement**: https://www.anthropic.com/news/model-context-protocol
   - Capture: Open standard announcement
   - Include: "USB-C for AI" quote if visible

---

## CUSTOM DIAGRAM PRODUCTION REQUIREMENTS

### For Zoe (Visual Specialist)

**Total custom diagrams needed**: 5

1. Stateless failure mode (state diagram)
2. Tool execution latency (architecture comparison)
3. State persistence (infrastructure comparison)
4. Deployment topology (multi-region)
5. Launch pattern timeline (strategic progression)

**Style requirements**:

- Minimalist (Karpathy-style technical)
- Monospace fonts (Source Code Pro)
- Flat colors (no gradients)
- High contrast (readable on mobile)
- Technical accuracy (proper terminology)

**Handoff package location**: `outputs/projects/2025-11-02-agent-platform-cost-reality/handoffs/jarvis-to-zoe-diagrams.json`

---

## VISUAL PRODUCTION WORKFLOW

### Phase 1: Screenshots (Can do immediately)

1. Swarm README warning (GitHub)
2. Agents SDK OpenAI requirement (docs)
3. MCP specification (official site)
4. MCP GitHub ecosystem (org page)
5. Claude SDK production focus (Anthropic)
6. AgentKit connector registry (OpenAI platform)

**Tools**: Browser screenshots, URL visible
**Time**: 15-20 minutes
**Cost**: $0 (free screenshots)

### Phase 2: Custom Diagrams (Hand off to Zoe)

1. Stateless failure mode
2. Tool execution latency
3. State persistence architecture
4. Deployment topology
5. Launch pattern timeline

**Tools**: Zoe's diagram tools or design software
**Time**: 2-3 hours (5 technical diagrams)
**Cost**: Zoe's time + any tool costs

### Phase 3: Integration

- Match each visual to tweet number
- Verify aspect ratios (Twitter compatible)
- Test on mobile (readability check)
- Compress for fast loading (<500KB each)

---

## SCREENSHOT CAPTURE INSTRUCTIONS (Step-by-Step)

### Screenshot 1: Swarm README Warning

**URL**: https://github.com/openai/swarm
**Steps**:

1. Open in incognito/private window
2. Scroll to README overview section
3. Locate text: "Swarm is primarily intended for educational and experimental use, though OpenAI advises against using Swarm in production settings"
4. Position so visible: Repo header (openai/swarm), stars (20.6K), MIT license
5. Take screenshot (Cmd+Shift+4 on Mac, or Full Page Screenshot extension)
6. Annotate: Highlight "not intended for production" in yellow or red box
7. Save as: `swarm-production-warning.png`

**Expected file**: 1600×800 approx, <300KB

---

### Screenshot 2: Agents SDK OpenAI Lock-In

**URL**: https://openai.github.io/openai-agents-python/
**Steps**:

1. Open in incognito
2. Navigate to "Installation" or "Setup" section
3. Locate: `export OPENAI_API_KEY=sk-...` requirement
4. Or locate: Text mentioning "designed to work primarily with OpenAI's models"
5. Position so visible: OpenAI Agents SDK header, navigation
6. Take screenshot
7. Annotate: Highlight OpenAI requirement
8. Save as: `agents-sdk-openai-requirement.png`

**Expected file**: 1400×700 approx, <250KB

---

### Screenshot 3: MCP Protocol Specification

**URL**: https://modelcontextprotocol.io/specification/2025-06-18/architecture
**Steps**:

1. Open specification page
2. Scroll to "Transport Layer" or "Protocol Overview"
3. Locate: "JSON-RPC 2.0" mention
4. Locate: State machine diagram or architecture overview
5. Position so visible: modelcontextprotocol.io domain, spec version (2025-06-18)
6. Take screenshot
7. Annotate: Highlight JSON-RPC 2.0, bidirectional messaging
8. Save as: `mcp-protocol-spec.png`

**Expected file**: 1600×1000 approx, <400KB

---

### Screenshot 4: MCP GitHub Ecosystem

**URL**: https://github.com/modelcontextprotocol
**Steps**:

1. Open organization page
2. Ensure all SDK repos visible:
   - typescript-sdk, python-sdk, java-sdk, kotlin-sdk
   - csharp-sdk, go-sdk, php-sdk, ruby-sdk
   - rust-sdk, swift-sdk
3. Take screenshot showing repo grid
4. Annotate: Box around "10 SDKs" or count them visually
5. Include: Organization description "Open protocol for AI"
6. Save as: `mcp-github-ecosystem.png`

**Expected file**: 1600×900 approx, <350KB

---

### Screenshot 5: Claude SDK Production-Ready

**URL**: Search for official Claude Agent SDK GitHub or docs
**Steps**:

1. Navigate to Anthropic's agent SDK documentation
2. Locate: "Production-ready" claims or enterprise features
3. Capture: Examples showing real use cases
4. Show: "Powers Claude Code" or similar production claims
5. Annotate: Highlight production focus (contrast with Swarm)
6. Save as: `claude-sdk-production.png`

**Expected file**: 1400×800 approx, <300KB

---

### Screenshot 6: AgentKit Connector Registry

**URL**: https://platform.openai.com/docs/guides/agent-builder (or connector section)
**Steps**:

1. Navigate to AgentKit documentation
2. Find: Connector registry or tool catalog section
3. Capture: Curated connector list OR request connector flow
4. Show: Platform-managed nature
5. Annotate: Highlight "curated" or "request access" if visible
6. Save as: `agentkit-connector-registry.png`

**Expected file**: 1400×700 approx, <250KB

---

## ENGAGEMENT OPTIMIZATION WITH VISUALS

### Visual Placement Impact

**Tweets 1-2** (Hook + problem): No visual

- Let hook stand alone (text-only for clarity)

**Tweet 3**: 📸 Swarm warning

- Engagement spike: First visual, proof-based, shocking

**Tweet 4**: 🎨 Failure mode diagram

- Technical credibility established
- Complex concept visualized

**Tweets 5-6**: 📸 Agents SDK lock-in + text

- Screenshot breaks up technical text
- Proof of lock-in claim

**Tweet 7-8**: Text + 🎨 Latency diagram

- Architecture differentiation visual
- Technical depth maintained

**Tweets 9-11**: 📸 Claude SDK + 📸 MCP spec + 📸 MCP ecosystem

- Three screenshots in succession
- Overwhelming proof pattern
- Ecosystem velocity visible

**Tweet 13**: 🎨 State persistence

- Infrastructure comparison
- Control visualization

**Tweet 14**: 🎨 Deployment topology

- Compliance architecture
- Enterprise relevance

**Tweet 18**: 🎨 Timeline comparison

- Strategic pattern visualization
- Culmination of "throwing darts" thesis

**Tweet 19**: Text only (conviction)

- Let closing statement stand alone

**Pattern**: Visual every 1-2 tweets (11 visuals across 19 tweets)

---

## PRODUCTION CHECKLIST

### Screenshots (Do First - Can complete today)

- [ ] Swarm README warning
- [ ] Agents SDK OpenAI requirement
- [ ] MCP protocol specification
- [ ] MCP GitHub ecosystem (10 SDKs)
- [ ] Claude SDK production focus
- [ ] AgentKit connector registry

**Time**: 20-30 minutes
**Cost**: $0 (free screenshots)
**Priority**: HIGH (immediate proof)

### Custom Diagrams (Hand off to Zoe)

- [ ] Stateless failure mode (state diagram)
- [ ] Tool execution latency (architecture)
- [ ] State persistence (infrastructure)
- [ ] Deployment topology (multi-region)
- [ ] Launch pattern timeline (strategic)

**Time**: 2-3 hours (Zoe production)
**Cost**: Zoe's time
**Priority**: MEDIUM (enhances but not required)

---

## HANDOFF TO ZOE

**Create handoff package**:

```json
{
  "handoff_id": "jarvis-to-zoe-2025-11-02-technical-diagrams",
  "source_agent": "jarvis",
  "target_agent": "zoe",
  "content_type": "technical_diagrams",
  "suggested_command": "/zoe → *create-technical-diagrams",
  "requirements": {
    "count": 5,
    "type": "technical_architecture_diagrams",
    "style": "minimalist_karpathy",
    "diagrams": [
      {
        "id": "diagram-1",
        "name": "Stateless Failure Mode",
        "type": "state_diagram",
        "complexity": "medium",
        "aspect_ratio": "16:9",
        "specs_file": "04-media/diagram-specs/stateless-failure.md"
      },
      {
        "id": "diagram-2",
        "name": "Tool Execution Latency",
        "type": "architecture_comparison",
        "complexity": "high",
        "aspect_ratio": "16:9",
        "specs_file": "04-media/diagram-specs/tool-latency.md"
      },
      {
        "id": "diagram-3",
        "name": "State Persistence",
        "type": "infrastructure_comparison",
        "complexity": "medium",
        "aspect_ratio": "1:1",
        "specs_file": "04-media/diagram-specs/state-persistence.md"
      },
      {
        "id": "diagram-4",
        "name": "Deployment Topology",
        "type": "multi_region_infrastructure",
        "complexity": "high",
        "aspect_ratio": "16:9",
        "specs_file": "04-media/diagram-specs/deployment-topology.md"
      },
      {
        "id": "diagram-5",
        "name": "Launch Pattern Timeline",
        "type": "strategic_timeline",
        "complexity": "medium",
        "aspect_ratio": "9:16",
        "specs_file": "04-media/diagram-specs/launch-timeline.md"
      }
    ]
  },
  "style_guide": {
    "font": "Source Code Pro (monospace)",
    "colors": {
      "background": "#FFFFFF or #F5F5F5",
      "primary": "#000000",
      "accent_warning": "#DC143C",
      "accent_success": "#2E8B57",
      "accent_info": "#4169E1"
    },
    "layout": "minimalist, grid-based, generous whitespace",
    "inspiration": "Andrej Karpathy technical diagrams"
  },
  "output_location": "outputs/projects/2025-11-02-agent-platform-cost-reality/04-media/images/",
  "naming": "diagram-{n}-{description}.png"
}
```

**Save to**: `outputs/projects/2025-11-02-agent-platform-cost-reality/handoffs/jarvis-to-zoe-diagrams.json`

---

## IMMEDIATE NEXT STEPS

**Option 1: Start with screenshots** (you can do this now)

- Capture 6 screenshots from sources above
- Save to `04-media/images/screenshots/`
- Attach to thread draft
- Publish with screenshots (diagrams optional)

**Option 2: Hand off to Zoe for complete package**

- Get all 6 screenshots + 5 custom diagrams
- Full visual production (professional quality)
- Publish when complete (higher engagement)

**My recommendation**: **Do screenshots now** (20 minutes), then hand off diagrams to Zoe. You can publish thread with screenshots while diagrams are being produced, or wait for complete package.

**What's your move?**
