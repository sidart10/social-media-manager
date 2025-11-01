# Core Components

## Component Hierarchy

```
System
├── Agents (User-facing personas with command menus)
│   ├── Jarvis (Content Intelligence)
│   ├── Zoe (Visual Production)
│   └── Zoro (Publishing)
│
├── Workflows (Multi-step process orchestrators)
│   ├── research-topic
│   ├── write-post
│   ├── create-image
│   └── schedule-post
│
├── Skills (Autonomous expertise modules, model-invoked)
│   ├── deep-web-research
│   ├── post-writer
│   ├── create-image
│   └── veotools-mastery
│
└── MCPs (External tool integrations)
    ├── Notion (collaborative state)
    ├── Postiz (publishing)
    ├── Exa (research)
    ├── Apify (scraping)
    ├── nanobanana (images)
    └── veotools (videos)
```

## Terminology Clarification

**CRITICAL:** This system uses custom terminology that differs from Claude Code native concepts.

| Our Term | Claude Code Term | Invocation Model | Description |
|----------|------------------|------------------|-------------|
| **Agent** | Slash Command | User-invoked | Persona-driven menu interface presenting workflow options |
| **Workflow** | (Custom) | User-selected | YAML+XML multi-step process orchestrator with state management |
| **Skill** | Agent Skill | Model-invoked | Autonomous expertise module Claude discovers via description |
| **MCP** | MCP Server | Tool-invoked | External API/service integration (Notion, Exa, Apify, etc.) |

**Invocation Flow:**
1. User invokes Agent (`/jarvis`) → User-driven
2. Agent presents menu of Workflows → User selects
3. Workflow executes steps creating context → Process-driven
4. Claude discovers Skills based on context → Model-driven
5. Skills execute with MCP access → Autonomous

**Why This Matters:**
When PRD/architecture says "workflow invokes skill," it means workflow creates rich context that Claude uses to autonomously discover and load the skill. Workflows don't explicitly call skills—Claude does that automatically via description matching.

---
