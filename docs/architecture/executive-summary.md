# Executive Summary

The AI-Powered Social Media Agent Team is a modular, extensible system for AI-driven content creation, visual production, and multi-platform publishing. Built on Claude Code's agent and skill infrastructure, the system orchestrates 3 specialized AI personas (Jarvis, Zoe, Zoro) that coordinate through Notion workspace status updates and local JSON handoff packages.

**Key Architectural Characteristics:**

- **Loose Coupling:** Agents, workflows, and skills are independently deployable modules with no central registry
- **Status-Driven Coordination:** Notion Content Tracker provides collaborative state (Idea → Research → Writing → Editing → Posted)
- **Model-Invoked Skills:** Claude autonomously discovers and loads skills based on description matching
- **Intelligent Tool Routing:** Cost-conscious tool selection (free WebSearch → paid Exa → comprehensive Apify based on depth)
- **Dual State Management:** Local outputs/ for artifacts + Notion for metadata/status + coordination
- **Organic Growth Model:** New agents/workflows/skills addable without modifying existing components

**System Scale:**
- 3 Core Agents (Jarvis, Zoe, Zoro)
- 20+ Workflows (research, content generation, visual production, publishing)
- 24+ Skills (autonomous expertise modules)
- 20+ MCP Integrations (Notion, Postiz, Apify, Exa, image/video generation)

**Target Performance:**
- Content creation time: 75-135 min → 10-15 min (85-90% reduction)
- Content output: 2-3 posts/week → 8-10 posts/week (3-4x increase)
- Voice consistency: ≥8/10 confidence via Enhanced Voice Profile v2.0
- Monthly AI/API costs: <$50 for 30+ posts across platforms
- Pipeline success rate: 95% without manual intervention

---
