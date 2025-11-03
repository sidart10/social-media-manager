# Edit Skill Workflow

Edit existing Claude Code skills while maintaining consistency across SKILL.md, supporting files, and all project manifests. Automatically discovers and updates all usage locations in workflows and agents.

## Purpose

This workflow ensures skill edits propagate correctly to:

- ✅ SKILL.md and supporting files (reference/, prompts/, examples/, scripts/)
- ✅ skill-manifest.csv (name, description, category, path)
- ✅ files-manifest.csv (regenerated hashes for modified files)
- ✅ **All usage locations** - workflows, agents, commands, docs that reference the skill
- ✅ Category moves (relocating skills between agent directories)

**Without this workflow:** Manual edits create inconsistencies between skill content, manifests, and usage locations!

## How to Invoke

**Via BMad Builder:**

```
/bmad:bmb:workflows:edit-skill
```

**Or directly:**

```
workflow bmad/bmb/workflows/edit-skill
```

## What This Workflow Does

### Step-by-Step Process

**0. Load and Select Skill**

- Dynamically loads all skills from skill-manifest.csv
- Presents numbered list grouped by category
- User selects skill to edit
- Loads all skill files and metadata

**0b. Discover Usage Locations** (CRITICAL!)

- Searches entire codebase for skill references
- Finds usage in: agents (.md, .yaml), workflows (instructions.md), docs (README.md), commands
- Creates usage map with file paths and line numbers
- Shows user: "This skill is referenced in {{count}} locations"

**1. Determine Edit Scope**

- User selects what to edit:
  1. Name or Description (metadata) - Updates {{usage_count}} locations
  2. Instructions/Content (SKILL.md body)
  3. Add/Remove Supporting Files (structure)
  4. Change Agent Category (move skill) - Updates paths everywhere
  5. Update Research (re-run Exa + Firecrawl)
  6. Multiple changes

**2. Edit YAML Frontmatter** (if metadata change)

- Update name (re-validates Anthropic conventions)
- Update description (re-checks triggers, length)
- Warns about breaking changes ({{usage_count}} files affected)

**3. Edit SKILL.md Content** (if content change)

- Select sections to edit (When to Use, Instructions, Examples)
- Iterative refinement with approval
- Maintains quality standards

**4. Manage Supporting Files** (if structure change)

- Add new files (reference/, prompts/, examples/, scripts/)
- Edit existing supporting files
- Remove files (with confirmation, updates links)

**5. Optional Re-Research** (if updating knowledge)

- Runs Exa + Firecrawl for updated methodologies
- Merges with existing research (doesn't replace)
- Updates reference/sources.md with new citations

**6. Handle Category Move** (if agent_category changes)

- Moves entire skill directory to new category
- Updates all path references in manifests
- Preserves file integrity

**7. Update Usage Locations** (if name/category changed)

- **Updates ALL files that reference the skill:**
  - Agent definitions (workflows they call)
  - Workflow instructions (skill invocations)
  - Documentation (skill descriptions)
  - Slash commands (skill mentions)
- Shows diff for each file
- User approves changes
- Applies updates with Edit tool

**8. Move Skill Files** (if category changed)

- Creates new category directory if needed
- Moves all files to new location
- Verifies integrity, removes old directory

**9. Re-Validate**

- Runs same validation as create-skill
- Checks YAML, name, description, file structure
- Verifies all usage locations updated correctly

**10. Update Manifests**

- Updates skill-manifest.csv (name, description, category, path)
- Regenerates SHA-256 hashes for modified files
- Updates files-manifest.csv with new hashes
- Adds new files, removes deleted files

**11. Complete**

- Shows comprehensive diff (skill changes + usage updates)
- Lists all modified files
- Provides updated test query
- Explains restart requirement

## Expected Inputs

**User Provides:**

- Skill selection (from dynamic list)
- Edit scope selection
- Approval for metadata changes
- Content edits for sections
- Confirmation for high-impact changes (name, category)
- Approval for usage location updates

**Workflow Loads Automatically:**

- skill-manifest.csv (dynamic skill list)
- agent-manifest.csv (for category selection)
- All current skill files
- Usage map via codebase search

## Generated Outputs

### Skill Changes

**Metadata edits:**

- Updated YAML frontmatter (name, description)
- Re-validated against Anthropic standards

**Content edits:**

- Modified SKILL.md sections
- Updated supporting files

**Structure changes:**

- New files added (reference/, prompts/, examples/)
- Old files removed
- Files reorganized

**Category move:**

- Skill relocated to new agent directory
- All paths updated

### Usage Location Updates (CRITICAL!)

**Workflow instructions updated:**

```
Before: "Use post-writer skill to generate..."
After:  "Use creating-social-posts skill to generate..."
```

**Agent definitions updated:**

```
Before: Triggers Skills: old-skill-name
After:  Triggers Skills: new-skill-name
```

**Path references updated:**

```
Before: .claude/skills/jarvis/old-name/
After:  .claude/skills/standalone/new-name/
```

### Manifests Updated

**skill-manifest.csv:**

- Name, description, agent_category, path columns updated
- research_enhanced updated if re-research performed

**files-manifest.csv:**

- Hashes regenerated for all modified files
- New files added with hashes
- Removed files deleted from manifest
- Paths updated if category moved

## Example Usage

### Example 1: Rename Skill

```
User: /bmad:bmb:workflows:edit-skill
Workflow: Select skill: 1. post-writer (jarvis)
User: 1
Workflow: Usage: Referenced in 4 locations (2 workflows, 1 agent, 1 doc)
Workflow: What to edit? 1. Name or Description
User: 1
Workflow: Change name? Old: post-writer
User: creating-social-posts
Workflow: ⚠️  This will update 4 references. Proceed? [yes]
User: yes
Workflow: Updating:
         - jarvis-sidecar/workflows/write-posts/instructions.md
         - jarvis-sidecar/workflows/generate-ideas/instructions.md
         - jarvis.md
         - README.md
Workflow: ✅ Done! 4 files updated, manifests regenerated.
```

### Example 2: Move Skill Between Categories

```
User: /bmad:bmb:workflows:edit-skill
Workflow: Select skill: 5. voice-matcher (jarvis)
User: 5
Workflow: Usage: Referenced in 2 locations
Workflow: What to edit? 4. Change Agent Category
User: 4
Workflow: Current: jarvis | New category: 1. jarvis, 2. standalone
User: 2
Workflow: Move to standalone? Updates paths in 2 locations. [yes]
User: yes
Workflow: Moving files...
         Updating paths in usage locations...
         ✅ Done! Skill moved, 2 files updated.
```

### Example 3: Update Content + Re-Research

```
User: /bmad:bmb:workflows:edit-skill
Workflow: Select skill: 3. deep-web-research (jarvis)
User: 3
Workflow: Usage: 5 references found
Workflow: What to edit? 6. Multiple Changes
User: 6
Workflow: Select changes: [2=content, 5=re-research]
User: 2,5
Workflow: Edit Instructions section...
User: [provides updates]
Workflow: Re-research? Cost ~$0.80 [yes]
User: yes
Workflow: 🔍 Researching updated methodologies...
         Found 4 new sources, 2 new frameworks
         Merging with existing research...
         ✅ Done! Content + research updated.
```

## Special Features

### Usage Impact Analysis

Before any change, shows:

```
Impact Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This skill is used by:
- 3 workflows (will auto-update if name changes)
- 1 agent definition (will auto-update)
- 2 documentation files (will auto-update)

Total: 6 files will be modified alongside the skill.
```

### Automatic Propagation

When you change:

- **Name:** All 6 usage locations updated automatically
- **Category:** All path references updated
- **Description:** Manifests updated, docs optionally updated

### Comprehensive Tracking

- Original values preserved for comparison
- Diff shown for every change
- Complete change log generated
- Rollback possible (all original values known)

## Tool Requirements

**Required:**

- File system access (Read, Write, Edit, Bash)
- Grep (finding skill usage)

**Optional (re-research only):**

- Exa Search
- Firecrawl

## Validation

**Pre-Edit Validation:**

- Skill exists and is loadable
- Usage map complete and accurate

**Post-Edit Validation:**

- All Anthropic conventions maintained
- Usage locations updated correctly
- Manifests consistent with file state
- No broken references

## Next Steps After Editing

**If metadata changed (name/description):**

1. Restart Claude Code - Required for new metadata to load
2. Test with updated query - Verify new triggers work
3. Check usage locations - Ensure workflows still work

**If only content changed:**

1. Optional restart - Changes work in current session
2. Test improved behavior - Verify enhancements work

**If category moved:**

1. Restart required - New path must load
2. Verify workflows - Check all usage locations work
3. Test skill activation - Ensure discovery still works

## Related Workflows

- `create-skill` - Create new skills
- `edit-agent` - Modify agents
- `edit-workflow` - Modify workflows
- `audit-workflow` - Validate workflow quality

## Author

BMad Builder

---

**Location:** `bmad/bmb/workflows/edit-skill/`
**Version:** 1.0
**Last Updated:** 2025-10-31
