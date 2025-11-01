# Goals and Background Context

## Goals

- Reduce content creation time by 85-90% (from 75-135 minutes to 10-15 minutes per post)
- Increase content output 3-4x (from 2-3 posts/week to 8-10 posts/week across platforms)
- Maintain authentic voice consistency across all generated content (≥8/10 confidence score)
- Achieve zero platform-specific publishing errors through automated validation
- Keep AI/API costs under $50/month while producing 30+ posts across platforms
- Establish modular, extensible foundation that enables organic growth of the agentic ecosystem beyond the current 3 core agents (Jarvis, Zoe, Zoro)
- Enable seamless addition of new agents, skills, and workflows as content strategy matures without requiring architectural rewrites
- Standardize workflow quality and patterns to ensure consistent, reliable processes across all agent operations
- Optimize tool selection and usage patterns (Apify actors, image models, video providers) based on real-world performance and cost data as the system matures
- Create comprehensive documentation mapping the complete agent→workflow→skill→tool hierarchy with clear decision criteria for when to use each component
- Integrate Notion as collaborative workspace for status-driven coordination, enabling agents to work asynchronously on shared content pipeline
- Enable flexible agent routing based on content needs (Jarvis→Zoro for text-only, Jarvis→Zoe→Zoro for visuals, Zoe→Zoro for standalone visuals) rather than rigid pipeline

## Background Context

The current content creation process is unsustainable for solo creators managing multiple platforms. A single LinkedIn post requires 75-135 minutes of fragmented work: research (30-60 min), writing with voice consistency (20-30 min), visual creation (15-30 min), and platform-specific formatting/publishing (10-15 min). Multiplied across platforms (LinkedIn, Twitter, YouTube, Instagram), this creates an impossible time burden that limits output to 2-3 posts/week when 8-10 posts/week is needed for meaningful audience growth.

Existing solutions fail to address the complete pipeline. Social media management tools (Buffer, Hootsuite) handle scheduling but not creation. AI writing assistants (ChatGPT, Claude) provide generic content without voice learning, research integration, or visual production. All-in-one platforms (Postiz, ContentStudio) offer basic AI but lack research depth, custom visual generation, and workflow customization. Freelancers and agencies are expensive ($2k-5k/month), slow (back-and-forth delays), and can't authentically replicate your voice.

This PRD defines an AI-powered social media team built on Claude Code's agent and skill infrastructure, coordinated through custom workflows and Notion-based collaborative state management. The system uses 3 core agents (Jarvis for content intelligence, Zoe for visual production combining images and videos, Zoro for publishing) that coordinate flexibly based on content needs—not a rigid pipeline but dynamic routing where Jarvis can hand to Zoro for text-only posts, or route through Zoe when visuals are needed, or Zoe can work independently for standalone graphics.

The system is already partially operational with 24+ skills, 20+ workflows, and 20+ MCP integrations including Notion for status tracking (Idea → Research → Writing → Editing → Posted) and Postiz for multi-platform scheduling. The MVP focuses on standardizing this foundation, documenting the complete agent→workflow→skill→tool hierarchy, and establishing clear patterns for organic growth. Both skills AND workflows are critical architectural components: skills provide reusable autonomous expertise while workflows orchestrate multi-step processes with quality gates. Tool choices (Apify actors, image models, video providers) are documented as current best practices with the understanding they will evolve and improve as usage patterns emerge.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-31 | 1.0 | Initial PRD draft created from Project Brief | PM Agent |

---
