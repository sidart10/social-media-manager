# Project Skills

**Location:** `/Users/sid/Desktop/4. Coding Projects/social-media-manager/.claude/skills`
**Purpose:** Project-specific Claude Code Skills for Jarvis agent

---

## Structure

```
.claude/skills/jarvis/
├── social-media-research/SKILL.md
├── youtube-research/SKILL.md
├── profile-analysis/SKILL.md
├── deep-web-research/SKILL.md
├── research-synthesizer/SKILL.md
├── voice-matcher/SKILL.md
├── platform-formatter/SKILL.md
└── evidence-tracker/SKILL.md
```

**8 Skills total** - All specific to Jarvis Content Intelligence Agent

---

## Skills Overview

### Research Skills (5)

1. **social-media-research** - Uses social-media-mcp (Brave + Perplexity)
2. **youtube-research** - Uses youtube-transcript
3. **profile-analysis** - Uses apify (Instagram, TikTok, Twitter, LinkedIn, YouTube)
4. **deep-web-research** - Uses exa (comprehensive web research)
5. **research-synthesizer** - Combines all research findings

### Processing Skills (3)

6. **voice-matcher** - Applies user's voice profile
7. **platform-formatter** - Formats for social platforms
8. **evidence-tracker** - Tracks sources and citations

---

## How Skills Work

**Autonomous Invocation:**

- Claude automatically loads Skills when relevant
- Based on description matching user's request
- No explicit `/skill-name` calls needed

**Example:**

- User: "What's trending about AI?"
- Claude: Sees "trending" → Invokes social-media-research Skill
- Skill: Calls social-media-mcp/get_trending_topics
- Returns: Trending topics

---

## Integration with Jarvis

**Jarvis workflows** invoke Skills via natural language:

```xml
<action>Get trending topics and hashtags about {topic}.</action>
<!-- Claude invokes social-media-research Skill -->
```

**Skills then:**

- Call appropriate MCPs
- Process results
- Return organized data

---

## Project-Level vs Global

**These Skills are PROJECT-level:**

- Location: `.claude/skills/` (in project)
- Tracked by git
- Shared with team
- Project-specific

**Not global:**

- NOT in `~/.claude/skills/` (home directory)
- Not available to other projects
- Jarvis-specific functionality

---

_Project Skills for Jarvis agent_
_Last updated: 2025-10-27_
