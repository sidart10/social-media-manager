# Architectural Principles

## 1. Loose Coupling via Natural Interfaces

**Principle:** Components interact through natural language descriptions and JSON, not hard dependencies.

**Implementation:**
- Agents coordinate via Notion status updates + JSON handoff packages (not direct function calls)
- Workflows invoke skills via context creation ("Research {topic} with depth=comprehensive"), not explicit imports
- Skills call MCPs via Claude Code platform, not direct API clients

**Benefits:**
- Add new agents without modifying existing agents
- Update skill tool selection without breaking workflows
- Swap MCP providers without changing skill logic

**Anti-Pattern Example:**
```javascript
// ❌ WRONG: Hard dependency in workflow
import { deepWebResearch } from '../skills/deep-web-research';
const results = await deepWebResearch(topic, depth);

// ✅ RIGHT: Loose coupling via context
// Workflow step creates context: "Research {topic} with depth={depth}"
// Claude autonomously discovers deep-web-research skill
// Skill executes, returns results to workflow
```

## 2. Status-Driven Collaboration

**Principle:** Notion Content Tracker provides shared state that all agents respect as authoritative.

**Implementation:**
- Content lifecycle: Idea → Research → Next Up → Writing → Editing → Posted → Archived
- Agents check status before suggesting workflows (Jarvis reads "Idea", Zoe reads "Editing")
- Agents update status as work completes (Jarvis moves to "Writing", Zoro moves to "Posted")
- User can manually update status in Notion, agents adapt to current state

**Benefits:**
- Asynchronous collaboration (user updates Notion, agents respond)
- Mobile accessibility (check content status on phone)
- Unified view of content pipeline across all projects

**State Transitions:**
```
Idea ──(Jarvis: research-topic)──▶ Research ──(Jarvis: write-post)──▶ Writing
                                                                          │
                                                                          ▼
Archived ◀──(Manual)── Posted ◀──(Zoro: publish)── Editing ◀──(Zoe: create-image OR Jarvis if text-only)
```

## 3. Model-Invoked Skill Discovery

**Principle:** Skills are autonomous expertise modules that Claude discovers based on task context, not explicit calls.

**Implementation:**
- Skills have rich descriptions optimized for discovery ("Generate platform-optimized social media posts using proven formulas...")
- Workflows create context-rich steps ("Generate LinkedIn post about {topic} using {voice_profile}")
- Claude matches context against skill descriptions, loads matching skills
- Skills execute as autonomous VMs with tool access, return results

**Discovery Algorithm (conceptual):**
```python
# When workflow step creates context:
context = "Research AI agents with depth=comprehensive"

# Claude's discovery process:
1. Parse context: task=research, topic="AI agents", depth=comprehensive
2. Scan available skills for description matches
3. Find: deep-web-research (description contains "research", "depth parameter", "Exa", "Apify")
4. Load deep-web-research/SKILL.md
5. Execute skill instructions with available MCPs
6. Return research results to workflow
```

**Benefits:**
- Skills composable across workflows (any workflow can use any skill)
- Cross-agent skill usage (Zoe can use Jarvis skills if needed)
- Skill improvements don't break workflow callers

## 4. Intelligent Tool Routing

**Principle:** Optimize for cost vs quality trade-offs using tiered tool selection.

**Implementation:**
- **Free-first:** WebSearch before Exa, WebFetch before Firecrawl
- **Depth-based:** quick=free, standard=low-cost, comprehensive=paid, exhaustive=user-approval-required
- **Quality-conscious:** gpt-image-1 for LinkedIn (professional), nanobanana for Instagram (social)
- **User-approved:** Operations >$1 require explicit confirmation

**Tool Selection Matrix:**

| Use Case | Free Option | Low Cost | High Quality | Cost Range |
|----------|-------------|----------|--------------|------------|
| Research | WebSearch | Exa neural search | Exa + Firecrawl + Apify | $0 → $0.50+ |
| Images | - | nanobanana ($0.039) | gpt-image-1 ($0.04-0.08) | $0.039 → $0.08 |
| Videos | - | Veo 3 fast ($0.30/8s) | HeyGen ($0.20-0.50/min) | $0.30 → $3+ |
| Scraping | - | Apify actors ($0.02-0.15) | Manual APIs | $0.02 → $0.50 |

**Benefits:**
- Stay under $50/month budget for 30+ posts
- Transparent cost tracking per operation
- Quality available when needed (user decides)

## 5. Dual State Management

**Principle:** Use local outputs/ for complete artifacts, Notion for metadata and coordination state.

**Implementation:**
- **Local (outputs/):** Research briefs (full citations), generated content (multi-turn edits), images/videos (files), handoff packages (JSON), session metadata
- **Notion:** Status workflow, publish dates, performance metrics (Views/Likes), relations (Keywords, Channels), mobile-accessible metadata

**Storage Decision Matrix:**

| Data Type | Local | Notion | Rationale |
|-----------|-------|--------|-----------|
| Research briefs (5-10 pages) | ✅ | ❌ | Too large for Notion, full citations needed |
| Content status | ❌ | ✅ | Shared state, mobile access, status workflow |
| Generated images/videos | ✅ | URL only | Files stored locally, URLs in Notion for reference |
| Voice profiles | ✅ | ❌ | Git-tracked config, not collaborative |
| Performance metrics | Summary | ✅ | Notion tracks Views/Likes/Comments over time |
| Handoff packages | ✅ | Summary | Full JSON local, key metadata in Notion properties |

**Benefits:**
- No Notion size limits for large artifacts
- Mobile access to status and metadata
- Git version control for local configs
- Bidirectional linking (Notion page → local files)

## 6. Organic Growth Model

**Principle:** System grows through component addition, not modification of existing components.

**Implementation:**
- **No central registries:** Agents discovered via .claude/commands/, skills via .claude/skills/, no manifest updates
- **Self-contained modules:** Each agent folder has persona, workflows, config—can add/remove independently
- **Pattern-based extensibility:** create-agent and create-workflow templates provide complete guidance

**Growth Examples:**
- New agent: Create .claude/commands/{name}/{name}.md + bmad/agents/{name}/ → Claude Code auto-discovers
- New workflow: Add bmad/agents/{agent}/workflows/{name}/ with workflow.yaml + instructions.md → Agent menu auto-includes
- New skill: Create .claude/skills/{agent}/{name}/SKILL.md with description → Claude auto-discovers via description matching

**Benefits:**
- No breaking changes when adding components
- Parallel development (multiple people can add agents simultaneously)
- Confident extension (follow templates, no architecture rewrites)

---
