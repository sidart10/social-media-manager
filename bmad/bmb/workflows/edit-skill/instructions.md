# Edit Skill - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/bmb/workflows/edit-skill/workflow.yaml</critical>
<critical>You MUST understand Anthropic best practices from: {anthropic_best_practices}</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<step n="0" goal="Load and select skill to edit">
<action>Load the skill manifest from {skill_manifest}</action>

<action>Parse skill-manifest.csv and present numbered list of all available skills:

Format:

```
Available Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. {{skill_name_1}} ({{agent_category_1}})
   "{{description_snippet_1}}"

2. {{skill_name_2}} ({{agent_category_2}})
   "{{description_snippet_2}}"

...

Select skill to edit (number or name):
```

Group by agent category for easier scanning
Show truncated description (first 80 chars)
</action>

<ask>Which skill do you want to edit? (Enter number or skill name):
</ask>

<action>Store selected skill metadata:

- {{current_skill_name}}
- {{current_agent_category}}
- {{current_skill_path}}
- {{current_description}}
- {{research_enhanced}} (true/false)
  </action>

<action>Load all current skill files:

- Read SKILL.md completely
- Parse YAML frontmatter (name, description)
- Load supporting files if they exist (reference/, prompts/, examples/, scripts/)
- Store current content for comparison later
  </action>
  </step>

<step n="0b" goal="Discover skill usage locations">
<critical>This step is ESSENTIAL - we must find everywhere this skill is referenced!</critical>

<action>Search for skill references across the entire codebase using Grep:

**Search patterns:**

1. Skill name literal: "{{current_skill_name}}"
2. Skill name with "skill" suffix: "{{current_skill_name}} skill"
3. Skill path references: ".claude/skills/{{current_agent_category}}/{{current_skill_name}}"

**Search locations (from workflow.yaml search_paths):**

- bmad/_/agents/_.md (agent definitions)
- bmad/_/agents/_.yaml (agent configs)
- bmad/_/workflows/_/instructions.md (workflow instructions)
- bmad/\*/README.md (documentation)
- .claude/commands/\*_/_.md (slash command files)

Use Grep tool with:

- pattern: "{{current_skill_name}}"
- output_mode: "files_with_matches"
- Case insensitive search (-i: true)
  </action>

<action>For each file found, read and extract usage context:

- What line(s) mention the skill?
- How is it referenced? (skill name, description, usage instructions)
- Is this a critical reference or just documentation?
  </action>

<action>Build usage map:

```
Skill Usage Map:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found {{usage_count}} references to "{{current_skill_name}}":

**Agent Definitions ({{agent_usage_count}}):**
- {{agent_file_1}} (line {{line_num}})
- {{agent_file_2}} (line {{line_num}})

**Workflow Instructions ({{workflow_usage_count}}):**
- {{workflow_file_1}} (line {{line_num}})
- {{workflow_file_2}} (line {{line_num}})

**Documentation ({{doc_usage_count}}):**
- {{doc_file_1}} (line {{line_num}})

**Slash Commands ({{cmd_usage_count}}):**
- {{cmd_file_1}} (line {{line_num}})
```

Store as {{skill_usage_map}} for later update step
</action>

<action>Inform user of usage scope:

If {{usage_count}} > 0:
"⚠️ This skill is referenced in {{usage_count}} locations. If you change the name or category, I'll update all references automatically."

If {{usage_count}} == 0:
"ℹ️ This skill has no references yet (newly created or unused)."
</action>
</step>

<step n="1" goal="Determine edit scope">
<action>Present current skill summary:

```
Current Skill Configuration:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{current_skill_name}}
Category: {{current_agent_category}}
Path: .claude/skills/{{current_agent_category}}/{{current_skill_name}}/

Description:
"{{current_description}}"

Files:
{{current_file_list}}

Research Enhanced: {{research_enhanced}}
Usage Locations: {{usage_count}} references found
```

</action>

<ask>What do you want to edit?

1. **Name or Description** (metadata) - Will update {{usage_count}} usage locations
2. **Instructions/Content** (SKILL.md body only)
3. **Add/Remove Supporting Files** (reference/, prompts/, examples/, scripts/)
4. **Change Agent Category** (move to different agent) - Will update paths
5. **Update Research** (re-research with Exa + Firecrawl, merge findings)
6. **Multiple Changes** (I'll guide you through each)

Select option (1-6):
</ask>

<action>Store {{edit_scope}} based on selection</action>

<action>Set flags for what needs updating:

- {{update_metadata}} = true if option 1
- {{update_content}} = true if option 2
- {{update_structure}} = true if option 3
- {{update_category}} = true if option 4
- {{update_research}} = true if option 5
- {{update_multiple}} = true if option 6
  </action>
  </step>

<step n="2" goal="Edit YAML frontmatter" if="update_metadata == true OR update_multiple == true">
<action>Present current frontmatter:

```yaml
---
name: { { current_skill_name } }
description: { { current_description } }
---
```

</action>

<ask>What to change?

1. **Name only** (must follow Anthropic conventions)
2. **Description only** (affects Claude discovery)
3. **Both name and description**

Select (1-3):
</ask>

<action if="name change requested">
Guide user to create new name following Anthropic conventions:
- Lowercase, hyphens only, <=64 chars
- Gerund form (verb+ing) for action skills
- Specific and descriptive

Validate new name against conventions
Generate 2-3 options if needed

Store {{new_skill_name}}
</action>

<action if="description change requested">
Guide user to update description:
- Max 1024 characters
- Must include WHAT + WHEN
- Include trigger keywords
- Check current triggers still valid

Present current description
Ask for new version or specific changes

Store {{new_description}}
</action>

<action if="name changed">
**CRITICAL WARNING TO USER:**

⚠️ **Changing skill name has impacts:**

- Skill file will be renamed
- {{usage_count}} references will be updated:
  {{list_of_files_to_update}}
- Users must restart Claude Code for new name to load
- Old name will no longer trigger skill

Proceed with name change? [yes / cancel]:
</action>

<action>Store {{metadata_confirmed}} = true if user approves</action>
</step>

<step n="3" goal="Edit SKILL.md content" if="update_content == true OR update_multiple == true">
<action>Present current SKILL.md structure:

```
Current Sections:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. When to Use This Skill ({{line_count_1}} lines)
2. Instructions ({{line_count_2}} lines)
3. Examples ({{example_count}} examples)
4. Reference Files ({{reference_count}} links)
5. Quality Standards ({{criteria_count}} criteria)
```

</action>

<ask>Which section(s) to edit?

You can:

- Select by number (e.g., "2" for Instructions)
- Select multiple (e.g., "2,3" for Instructions + Examples)
- Say "all" for complete rewrite
- Say "add" to add new section

Enter selection:
</ask>

<action>For each selected section:

1. Show current content
2. Ask how to modify:
   - Replace entirely
   - Edit specific parts
   - Add new content
   - Remove content
3. Apply changes iteratively
4. Show updated section for approval
   </action>

<action>After all content edits, show complete updated SKILL.md for final review</action>

<ask>Approve updated content? [yes / edit more]:
</ask>
</step>

<step n="4" goal="Manage supporting files" if="update_structure == true OR update_multiple == true">
<action>Show current file structure:

```
Current Structure:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

.claude/skills/{{current_agent_category}}/{{current_skill_name}}/
├── SKILL.md
{{#if reference/ exists}}
├── reference/
│   ├── {{file_list}}
{{/if}}
{{#if prompts/ exists}}
├── prompts/
│   ├── {{file_list}}
{{/if}}
{{#if examples/ exists}}
├── examples/
│   ├── {{file_list}}
{{/if}}
{{#if scripts/ exists}}
└── scripts/
    └── {{file_list}}
{{/if}}
```

</action>

<ask>What structural changes?

1. **Add files** (new reference/, prompts/, examples/, scripts/)
2. **Edit existing files** (modify supporting files)
3. **Remove files** (delete supporting files)
4. **Reorganize** (move files between directories)

Select (1-4) or "done" if no changes:
</ask>

<action if="add files">
Guide user to create new supporting files:
- Which directory? (reference/, prompts/, examples/, scripts/)
- File purpose and content
- Generate content based on skill domain
- Update SKILL.md to reference new files
</action>

<action if="edit existing">
Present list of current supporting files
User selects which to edit
Load, modify, save each file
</action>

<action if="remove files">
⚠️  Show files to be removed
⚠️  Check if referenced in SKILL.md (must update links!)
Ask for confirmation
Remove files and update SKILL.md references
</action>
</step>

<step n="5" goal="Optional re-research" if="update_research == true OR update_multiple == true">
<action>Explain re-research option:

"This skill was {{#if research_enhanced}}originally researched{{else}}created without research{{/if}}.

Re-research will:

- Find updated methodologies (domain evolves!)
- Discover new best practices
- Add recent examples
- Merge with existing content (not replace)
- Update reference/sources.md

Cost: ~$0.40-1.80 for Exa + Firecrawl
"
</action>

<ask>Proceed with re-research? [yes / no]:
</ask>

<action if="yes">
Load research context from {research_context}

Execute research following same pattern as create-skill:

1. Generate updated research queries from skill purpose
2. Run Exa neural search (numResults=10)
3. Scrape top 3-5 sources with Firecrawl
4. Synthesize new findings

Compare with existing research (if any):

- What's new since last research?
- Any contradicting findings?
- Updated best practices?

Merge findings:

- Add new methodologies to reference/methodology.md
- Update best practices in reference/best-practices.md
- Append to reference/sources.md (preserve old citations)
- Update SKILL.md instructions with new insights

Present research summary:

- New sources: {{new_source_count}}
- Updated methodologies: {{updated_methodology_count}}
- New best practices: {{new_practice_count}}
  </action>

<action>Update {{research_enhanced}} = true in skill metadata</action>
</step>

<step n="6" goal="Handle category move" if="update_category == true OR update_multiple == true">
<action>Load current agent categories from {agent_manifest}</action>

<action>Present agent selection:

Current category: {{current_agent_category}}

Available categories:

1. {{agent_1}}
2. {{agent_2}}
   ...
   N. standalone

Select new category (1-N):
</action>

<ask>Move skill from "{{current_agent_category}}" to "{{selected_new_category}}"?

This will:

- Move all skill files to new location
- Update {{usage_count}} path references
- Update skill-manifest.csv
- Regenerate file hashes in files-manifest.csv

Confirm move? [yes / cancel]:
</ask>

<action if="confirmed">
Store {{new_agent_category}}
Store {{new_skill_path}} = .claude/skills/{{new_agent_category}}/{{current_skill_name}}/
Mark {{category_changed}} = true for later path updates
</action>
</step>

<step n="7" goal="Update all usage locations" if="metadata_confirmed == true OR category_changed == true">
<critical>This step updates all files that reference the skill!</critical>

<action>Review the usage map from Step 0b:

Show user complete list of files that will be updated:

```
Files to Update ({{usage_count}} total):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Agent Files ({{agent_usage_count}}):**
- {{file_1}}
  Current: "{{old_reference}}"
  New: "{{new_reference}}"

**Workflow Instructions ({{workflow_usage_count}}):**
- {{file_2}}
  Current: "{{old_reference}}"
  New: "{{new_reference}}"

**Documentation ({{doc_usage_count}}):**
- {{file_3}}
  Current: "{{old_reference}}"
  New: "{{new_reference}}"
```

</action>

<ask>Review changes above. Update all {{usage_count}} locations? [yes / selective / cancel]:
</ask>

<action if="yes - update all">
For each file in {{skill_usage_map}}:

**If name changed ({{new_skill_name}} != {{current_skill_name}}):**
Find: "{{current_skill_name}}"
Replace: "{{new_skill_name}}"
Context: Preserve surrounding text, only update skill name

**If category changed:**
Find: ".claude/skills/{{current_agent_category}}/{{current_skill_name}}"
Replace: ".claude/skills/{{new_agent_category}}/{{current_skill_name}}"

**If description changed:**
Find: Description references in documentation
Replace: With new description (if exact quotes exist)

Use Edit tool for each file:

- Preserve formatting
- Update only skill references
- Don't touch surrounding content

Track updates:

- {{files_updated}} count
- {{changes_made}} list
  </action>

<action if="selective - user chooses which">
Present each file one by one
Show the reference context
Ask: Update this one? [y/n]
Apply updates for approved files only
</action>

<action>Present update summary:

```
Usage Location Updates:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Updated {{files_updated}} files:
{{list_with_checkmarks}}

{{#if skipped_count > 0}}
⏭️  Skipped {{skipped_count}} files (user choice)
{{/if}}
```

</action>
</step>

<step n="8" goal="Move skill files" if="category_changed == true">
<action>Execute skill directory move:

Source: {{current_skill_path}}
Destination: {{new_skill_path}}

**Process:**

1. Create new category directory if needed: .claude/skills/{{new_agent_category}}/
2. Move entire skill directory to new location
3. Verify all files moved successfully
4. Remove old directory (after verification)

Use Bash commands:

```bash
mkdir -p ".claude/skills/{{new_agent_category}}"
mv "{{current_skill_path}}" "{{new_skill_path}}"
```

</action>

<action>Verify move completed:

- All files exist in new location
- Old directory removed
- File integrity preserved (count files)
  </action>

<action>Update internal tracking:

- {{current_skill_path}} = {{new_skill_path}}
- {{current_agent_category}} = {{new_agent_category}}
  </action>
  </step>

<step n="9" goal="Re-validate skill">
<action>Run comprehensive validation following same criteria as create-skill:

**YAML Frontmatter:**

- ✓ Proper format (opening/closing ---)
- ✓ Name field valid (if changed)
- ✓ Description field valid (if changed)

**Name Validation (if changed):**

- ✓ Lowercase, hyphens only, <=64 chars
- ✓ Gerund form for action skills
- ✓ Specific and descriptive
- ✓ Matches regex: ^[a-z0-9-]+$

**Description Validation (if changed):**

- ✓ <=1024 characters
- ✓ Includes "use when" clause
- ✓ Has trigger keywords
- ✓ Specific with examples

**File Structure:**

- ✓ SKILL.md exists at correct path
- ✓ All referenced files exist
- ✓ No broken links
- ✓ Supporting files in correct directories

**Content Quality:**

- ✓ "When to Use" section clear
- ✓ "Instructions" actionable
- ✓ "Examples" concrete and realistic
- ✓ Progressive disclosure maintained
  </action>

<action>Present validation results:

```
Re-Validation Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{#if errors}}
❌ Errors Found (must fix):
{{error_list}}
{{/if}}

{{#if warnings}}
⚠️  Warnings (should address):
{{warning_list}}
{{/if}}

{{#if pass}}
✅ All validation checks passed!
{{/if}}
```

</action>

<check if="errors exist">
  <ask>Validation errors found. Fix now? [yes / skip]:
  </ask>
  <action if="yes">Fix errors based on validation feedback</action>
  <goto step="9" if="yes">Re-run validation</goto>
</check>
</step>

<step n="10" goal="Update manifests">
<action>Update skill-manifest.csv with edited skill metadata:

**If name changed:**

- Find row with old name
- Update name column: {{current_skill_name}} → {{new_skill_name}}

**If description changed:**

- Update description column with {{new_description}}

**If category changed:**

- Update agent_category column: {{current_agent_category}} → {{new_agent_category}}
- Update path column with new path

**If research mode used:**

- Update research_enhanced column to "true"

Use Edit tool to update the CSV row
Maintain CSV formatting and quotes
</action>

<action>Update files-manifest.csv:

**For each modified file:**

1. Regenerate SHA-256 hash
2. Update hash column in files-manifest.csv
3. If path changed (category move), update path column

**If files added:**

- Add new rows with type, name, module, path, hash

**If files removed:**

- Remove corresponding rows from manifest

**If skill directory moved:**

- Update all skill file paths in manifest
- Regenerate hashes (paths embedded in hash may change)
  </action>

<action>Validate manifest integrity:

- No duplicate entries
- All paths valid
- CSV format correct
- Hashes regenerated for changed files
  </action>
  </step>

<step n="11" goal="Generate change summary and test query">
<action>Build comprehensive diff summary showing all changes:

```
Edit Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Skill Changes:**
{{#if name changed}}
- Name: {{current_skill_name}} → {{new_skill_name}}
{{/if}}
{{#if description changed}}
- Description: Updated ({{char_diff}} chars {{increase/decrease}})
{{/if}}
{{#if category changed}}
- Category: {{current_agent_category}} → {{new_agent_category}}
- Path: {{old_path}} → {{new_path}}
{{/if}}

**Content Updates:**
{{#if content modified}}
- SKILL.md: {{sections_edited}} sections edited
{{/if}}
{{#if files added}}
- Files added: {{new_file_list}}
{{/if}}
{{#if files removed}}
- Files removed: {{removed_file_list}}
{{/if}}
{{#if research updated}}
- Research: {{new_source_count}} new sources added
{{/if}}

**Usage Location Updates:**
{{#if usage_count > 0}}
- Updated {{files_updated}} files with new references
- Agent files: {{agent_files_updated}}
- Workflow files: {{workflow_files_updated}}
- Documentation: {{doc_files_updated}}
{{/if}}

**Manifest Updates:**
- skill-manifest.csv: Row updated
- files-manifest.csv: {{hash_count}} hashes regenerated
```

</action>

<action>Generate updated test query:

If name or description changed, create new test query that:

- Uses new trigger keywords from updated description
- Matches updated "use when" scenarios
- Represents realistic user request with new naming

If only content changed, keep similar test query but note improvements
</action>

<action>Present completion summary to {user_name} in {communication_language}:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Skill Edit Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Skill:** {{new_skill_name OR current_skill_name}}
**Category:** {{new_agent_category OR current_agent_category}}
**Location:** {{current_skill_path}}

**Changes Applied:**
{{change_summary_from_above}}

**Files Modified:** {{total_files_modified}}
- Skill files: {{skill_files_count}}
- Usage locations: {{usage_files_count}}
- Manifests: 2 (skill-manifest, files-manifest)

**Manifests Updated:**
- ✅ skill-manifest.csv (metadata updated)
- ✅ files-manifest.csv ({{hash_count}} hashes regenerated)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{#if name changed OR description changed}}
1. **Restart Claude Code** - Required for metadata changes
   - New name/description loads at session start
   - Old name will no longer trigger skill

2. **Test updated skill** with this query:
   "{{updated_test_query}}"

3. **Verify activation:**
   - Claude should say: "Using {{new_skill_name}} skill..."
   - If new description triggers don't work, refine keywords

{{/if}}

{{#if only content changed}}
1. **Optional restart** - Content changes work immediately in current session
   - But restart ensures clean slate

2. **Test with existing queries** - Skill behavior improved:
   "{{test_query}}"

{{/if}}

{{#if category changed}}
⚠️  **Category changed!** Restart required.
   - Skill moved to: .claude/skills/{{new_agent_category}}/
   - All {{usage_count}} usage locations updated
   - Verify workflows still work correctly

{{/if}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Skill successfully updated! 🎉
```

</action>
</step>

</workflow>
