# Jarvis (Content Intelligence Agent) - Documentation

**Agent Type:** Content Intelligence / Research
**Status:** Active
**Last Updated:** 2025-10-31

---

## 📍 Agent Location

**Live Agent:**

- Location: `bmad/agents/content-intelligence/`
- Agent File: `bmad/agents/content-intelligence/jarvis.md`
- Workflows: `bmad/agents/content-intelligence/jarvis-sidecar/workflows/`
- Skills: See `.claude/skills/jarvis/` (project-level skills)

---

## 📚 Documentation

### Architecture

- [jarvis-skills-architecture.md](architecture/jarvis-skills-architecture.md) - System architecture and design

### Live Agent Documentation

All active agent documentation lives in the agent directory:

- `bmad/agents/content-intelligence/README.md` - Agent overview
- `bmad/agents/content-intelligence/jarvis-sidecar/` - Workflows and templates
- `.claude/skills/jarvis/` - Reusable skills (research, content generation)

---

## 🎯 What Jarvis Does

Jarvis is the content intelligence agent responsible for:

- Deep research using MCP tools (Exa, Firecrawl, Apify)
- Content generation (posts, scripts, stories)
- Competitive analysis and trend research
- Multi-platform content adaptation

---

## 🔧 MCP Servers Used

Jarvis integrates with these MCP servers:

- **exa** - Semantic web search and research
- **firecrawl** - Web scraping and content extraction
- **apify** - Advanced web scraping (Instagram, Twitter, etc.)
- **notion** - Content management and dashboard
- **social-media-mcp** - Social platform integration

Configuration: See `claude_desktop_config.json` at project root

---

## 📝 Notes

- This folder previously contained 23+ build session reports (deleted 2025-10-31)
- All historical session documentation was removed during aggressive cleanup
- Active agent documentation lives in the agent directory, not here
- This index exists only as a pointer to the live agent location

---

For the complete agent system, see: `bmad/agents/content-intelligence/`
