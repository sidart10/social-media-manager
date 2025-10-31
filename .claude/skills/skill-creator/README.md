# skill-creator - Automated + Research-Enhanced Skill Generation

**Version:** 2.0.0 (Automation Update)
**Updated:** 2025-10-28
**Type:** Meta-skill (creates other skills)

---

## 🚀 What's New in v2.0

**Python Automation Scripts** (ported from Anthropic official repo):
1. **init_skill.py** - Auto-scaffolds skill structure (2 seconds!)
2. **quick_validate.py** - Validates YAML + naming
3. **package_skill.py** - Creates distributable ZIPs
4. **enhance_skill.py** - Adds research to existing skills (unique!)

**Result:** Create skills 3-5x faster with automation + research!

---

## Purpose

Create high-quality Claude Code skills following Anthropic official best practices, with **Python automation for scaffolding** and optional **deep research** using Exa and Firecrawl to find proven methodologies.

## Quick Start

**Just ask:**
```
Create a skill for {your-purpose}
```

skill-creator auto-loads and guides you through the process!

## Two Modes

### Template Mode (1 min)
- Fast creation
- For simple utilities
- No research needed

### Research Mode (4-5 min)
- Researches best practices with Exa + Firecrawl
- Finds proven methodologies
- Incorporates real-world data
- Creates expert-level skills

## What It Creates

**Every skill has:**
- ✅ Valid YAML frontmatter
- ✅ Anthropic naming conventions
- ✅ Optimized descriptions
- ✅ Clear instructions
- ✅ Examples
- ✅ Validation passed

**Research-enhanced skills add:**
- ✅ Proven methodologies from research
- ✅ Best practices from authoritative sources
- ✅ Data-backed recommendations
- ✅ Source citations
- ✅ Real-world examples

## Files

```
skill-creator/
├── SKILL.md                              # Main instructions (10 KB)
├── scripts/                              # 🆕 AUTOMATION SCRIPTS
│   ├── init_skill.py                     # Auto-scaffold skill structure
│   ├── quick_validate.py                 # Validate YAML + naming
│   ├── package_skill.py                  # Create distributable ZIP
│   ├── enhance_skill.py                  # Add research to existing skills
│   └── validate-skill.py                 # Legacy validator (keep for compatibility)
├── reference/
│   ├── anthropic-best-practices.md       # Official guidelines (15 KB)
│   └── description-optimization.md       # (planned)
├── prompts/
│   └── research-query-templates.md       # Research strategies (8 KB)
├── examples/
│   ├── simple-skill-example.md           # Template mode (4 KB)
│   └── researched-skill-example.md       # Research mode (6 KB)
├── templates/
│   └── SKILL-template.md                 # All templates (5 KB)
└── README.md                             # This file
```

## 🛠️ Automation Scripts

### init_skill.py - Auto-Scaffold (NEW!)

**Create skill structure in 2 seconds:**
```bash
python3 scripts/init_skill.py my-new-skill --path ~/.claude/skills
```

**Creates:**
- Skill directory
- SKILL.md with template + TODOs
- scripts/, references/, assets/ directories
- Example files in each directory

### quick_validate.py - Fast Validation (NEW!)

**Validate skill structure:**
```bash
python3 scripts/quick_validate.py ~/.claude/skills/my-skill
```

**Checks:**
- YAML frontmatter validity
- name field (hyphen-case)
- description field (no angle brackets)
- Structural correctness

### package_skill.py - Distribution (NEW!)

**Create shareable ZIP:**
```bash
python3 scripts/package_skill.py ~/.claude/skills/my-skill ./output
```

**Does:**
- Validates skill first
- Warns about TODO items
- Creates {skill-name}.zip
- Ready for sharing/uploading

**Use --force to skip TODO warnings:**
```bash
python3 scripts/package_skill.py ~/.claude/skills/my-skill ./output --force
```

### enhance_skill.py - Research Enhancement (NEW! UNIQUE!)

**Add research to existing skill:**
```bash
python3 scripts/enhance_skill.py ~/.claude/skills/my-skill --research "topic" --add-examples --add-references
```

**Does:**
- Researches topic with Exa + Firecrawl
- Adds findings to SKILL.md
- Generates example files (optional)
- Creates reference docs (optional)

**This combines YOUR research advantage with Anthropic's automation!**

## Legacy Validation

**Old validator still works:**
```bash
python scripts/validate-skill.py path/to/your-skill
```

**Checks:**
- YAML frontmatter validity
- Naming conventions
- Description quality
- File references
- Anthropic standards compliance

## Integration

**Works with:**
- `mcp__exa__search` - Neural search for methodologies
- `mcp__firecrawl__firecrawl_scrape` - Scrape best practices
- `deep-web-research` - Comprehensive research (optional)

## Examples

**Simple utility:**
```
"Create a skill for formatting JSON data"
→ 1 minute, template mode
```

**Content creation:**
```
"Create a skill for writing Instagram captions, research best practices"
→ 5 minutes, research mode, 8 sources analyzed
```

**Complex domain:**
```
"Create a skill for financial modeling with DCF analysis"
→ 5 minutes, research mode, includes methodology and scripts
```

## Quality Standards

**All created skills:**
- Follow Anthropic conventions
- Optimized for discovery
- Properly validated
- Production-ready

**Research-enhanced skills:**
- Based on authoritative sources
- Include proven methodologies
- Data-backed recommendations
- Cited references

## Version History

- v1.0.0 (2025-10-28): Initial release with Exa + Firecrawl research integration

---

**Meta note:** This skill was created to create skills. Very meta. Works great!
