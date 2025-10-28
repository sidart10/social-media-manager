# Project-Level Skills - Configured

**Date:** 2025-10-27
**Configuration:** `.claude/settings.local.json`

---

## What I Did

**Added skillsDirectories configuration:**

```json
{
  "skillsDirectories": [".claude/skills"]
}
```

**This tells Claude Code:**

- Look for Skills in project `.claude/skills/` folder
- Project-level Skills
- No need for global location

---

## Skills Location

**Jarvis Skills are in:**

```
.claude/skills/jarvis/
├── social-media-research/
│   ├── SKILL.md
│   └── reference/ (3 docs, 798 lines)
├── profile-analysis/
│   ├── SKILL.md
│   └── reference/ (4 docs, 682 lines)
├── youtube-research/
│   ├── SKILL.md
│   └── reference/ (3 docs)
├── deep-web-research/
│   ├── SKILL.md
│   └── reference/ (3 docs)
└── [4 processing Skills]
```

**All in project, git-tracked, team-shareable!**

---

## Next Step

**Restart Claude Code** - it will now load Skills from `.claude/skills/` (project location)

**Then test:**

```
/jarvis → research-topic
```

Skills should load and invoke correctly!

---

**Project Skills configured!** ✅
