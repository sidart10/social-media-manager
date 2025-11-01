# Create Skill Workflow

Interactive workflow to create Claude Code skills following Anthropic best practices with optional research enhancement, proper file structure, and automatic manifest logging.

## Purpose

This workflow guides you through creating high-quality Claude Code Agent Skills that:
- Follow Anthropic naming and description conventions
- Auto-load based on Claude's model-invoked discovery
- Optionally incorporate researched methodologies (Exa + Firecrawl)
- Maintain proper project file structure
- Register in skill-manifest.csv and files-manifest.csv

## How to Invoke

**Via BMad Builder:**
```
/bmad:bmb:workflows:create-skill
```

**Or directly:**
```
workflow bmad/bmb/workflows/create-skill
```

## What This Workflow Does

### Step-by-Step Process

1. **Understand Purpose** - Collaborative discovery of what the skill should do
2. **Choose Mode** - Quick template (1 min) or research-enhanced (5 min)
3. **Research** (optional) - Exa neural search + Firecrawl scraping for proven methodologies
4. **Generate Metadata** - Create Anthropic-compliant name and description
5. **Select Category** - Dynamically load agents from manifest, user selects category
6. **Design Structure** - Determine which supporting files needed (reference/, prompts/, examples/)
7. **Generate SKILL.md** - Create main skill file with instructions and examples
8. **Create Supporting Files** - Build reference docs, templates, examples based on research
9. **Validate** - Check YAML frontmatter, naming conventions, description quality
10. **Save & Register** - Write files to `.claude/skills/{category}/{name}/` and update manifests

## Expected Inputs

**User Provides:**
- Skill purpose and requirements
- Creation mode preference (quick vs research)
- Skill name approval
- Agent category selection (from dynamic manifest)
- Description approval
- Validation confirmation

**Workflow Loads Automatically:**
- Agent list from `bmad/_cfg/agent-manifest.csv` (dynamic!)
- Anthropic best practices guide
- Research context (if research mode)
- Skill template

## Generated Outputs

### Files Created

**Minimum (quick mode):**
```
.claude/skills/{category}/{skill-name}/
└── SKILL.md
```

**Full (research mode):**
```
.claude/skills/{category}/{skill-name}/
├── SKILL.md
├── reference/
│   ├── methodology.md (researched frameworks)
│   ├── best-practices.md (synthesized insights)
│   └── sources.md (research citations)
├── prompts/
│   └── templates.md (generation templates)
├── examples/
│   └── real-world-examples.md (from research)
└── scripts/ (optional)
    └── helper.py
```

### Manifests Updated

**skill-manifest.csv:**
```csv
name,description,agent_category,path,research_enhanced
"skill-name","Skill description...","jarvis",".claude/skills/jarvis/skill-name/SKILL.md","true"
```

**files-manifest.csv:**
- Adds entry for each created file
- Includes SHA-256 hash for integrity tracking
- Maintains same format as workflow/agent manifests

## Special Features

### Dynamic Agent Discovery

**No hardcoded agent names!** The workflow:
1. Loads `agent-manifest.csv` at runtime
2. Extracts all agent names dynamically
3. Presents numbered menu: "1. agent1, 2. agent2, ... N. standalone"
4. Supports future agent additions without workflow modification

### Research Integration

**Research mode uses:**
- Exa neural search for finding methodologies
- Firecrawl for scraping detailed content
- Smart query generation from skill purpose
- Synthesis of findings into skill structure
- Full source attribution

### Validation

**Validates against Anthropic requirements:**
- YAML frontmatter format
- Name conventions (lowercase, hyphens, <=64 chars, gerund form)
- Description quality (<=1024 chars, includes "use when", has triggers)
- File structure correctness
- Reference link integrity

## Tool Requirements

**Required:**
- File system access (Write, Read, Bash)

**Optional (research mode only):**
- **Exa Search** - Neural search for methodologies
- **Firecrawl** - Web scraping for detailed content

## Example Usage

### Quick Mode (1-2 minutes)

```
User: /bmad:bmb:workflows:create-skill
Workflow: What should this skill do?
User: Extract email addresses from text
Workflow: This is a simple utility. Quick creation recommended.
Workflow: Choose mode [1=quick / 2=research]
User: 1
Workflow: Suggested name: extracting-email-addresses
User: accept
Workflow: Select agent category: ... 5. standalone
User: 5
Workflow: Generated description: "Extract email addresses from text using regex patterns..."
User: yes
Workflow: ✅ Skill created! Restart Claude Code to load.
```

### Research Mode (4-6 minutes)

```
User: /bmad:bmb:workflows:create-skill
Workflow: What should this skill do?
User: Create engaging LinkedIn posts with proven formulas
Workflow: This is content creation - research recommended!
Workflow: Choose mode [1=quick / 2=research]
User: 2
Workflow: 🔍 Researching LinkedIn best practices...
         Found: Justin Welsh PAIPS, engagement data from 577k posts
         Synthesizing methodologies...
Workflow: Suggested name: creating-linkedin-posts
User: accept
Workflow: Select agent category: 1. jarvis
User: 1
Workflow: Generated description: "Create LinkedIn posts using Justin Welsh PAIPS..."
User: yes
Workflow: ✅ Skill created with research! 8 sources cited.
```

## Next Steps After Creation

1. **Restart Claude Code** - Skills load at session start only
2. **Test skill discovery** - Use provided test query with trigger keywords
3. **Verify activation** - Claude should say "Using {skill-name} skill..."
4. **Refine if needed** - If skill doesn't activate, tune description triggers

## Workflow Type

- **Type:** Interactive Action Workflow
- **Template:** false (creates multiple files, not single document)
- **Standalone:** true (directly invokable)
- **Module:** bmb (BMad Builder)

## Related Workflows

- `create-agent` - Create new agents
- `create-workflow` - Create new workflows
- `create-module` - Create complete modules
- `edit-agent` - Modify existing agents

## Author

BMad Builder

---

**Location:** `bmad/bmb/workflows/create-skill/`
**Version:** 1.0
**Last Updated:** 2025-10-31
