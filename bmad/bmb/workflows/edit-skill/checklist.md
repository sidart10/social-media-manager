# Edit Skill - Validation Checklist

## Skill Selection and Loading

- [ ] skill-manifest.csv loaded successfully
- [ ] All available skills presented to user
- [ ] Selected skill exists and is accessible
- [ ] All skill files loaded (SKILL.md + supporting files)
- [ ] Current metadata captured (name, description, category, path)

## Usage Discovery

- [ ] Grep search completed across all search paths (bmad/, .claude/commands/)
- [ ] All skill references found in agent files (.md, .yaml)
- [ ] All skill references found in workflow instructions
- [ ] All skill references found in documentation
- [ ] Usage map created with file paths and line numbers
- [ ] Usage count accurate and presented to user
- [ ] User aware of impact scope before making changes

## Metadata Edits (if applicable)

- [ ] If name changed: New name follows Anthropic conventions (lowercase, hyphens, <=64 chars, gerund form)
- [ ] If name changed: New name validated against regex: ^[a-z0-9-]+$
- [ ] If name changed: No duplicate skill with same name exists
- [ ] If name changed: User warned about {{usage_count}} references being updated
- [ ] If description changed: New description <=1024 characters
- [ ] If description changed: Includes "use when" clause
- [ ] If description changed: Contains trigger keywords
- [ ] If description changed: Specific with examples (not vague)
- [ ] User approved metadata changes before proceeding

## Content Edits (if applicable)

- [ ] User selected which sections to edit (When to Use, Instructions, Examples, etc.)
- [ ] Each edited section reviewed and approved by user
- [ ] Updated content maintains skill quality standards
- [ ] Instructions remain clear and actionable
- [ ] Examples are concrete and realistic
- [ ] No broken markdown formatting introduced
- [ ] Complete updated SKILL.md approved by user before saving

## Supporting File Changes (if applicable)

- [ ] Current file structure displayed to user
- [ ] User specified which changes needed (add/edit/remove)
- [ ] If files added: New files created with proper content
- [ ] If files added: SKILL.md updated to reference new files
- [ ] If files edited: Changes applied and saved
- [ ] If files removed: Confirmation obtained before deletion
- [ ] If files removed: SKILL.md references removed/updated
- [ ] No orphaned files (files that exist but aren't referenced)
- [ ] No broken links (SKILL.md references files that don't exist)

## Re-Research (if applicable)

- [ ] User confirmed re-research (aware of $0.40-1.80 cost)
- [ ] Research queries generated from updated skill purpose
- [ ] Exa search executed successfully (10 results)
- [ ] Top 3-5 sources scraped with Firecrawl
- [ ] New findings compared with existing research
- [ ] New methodologies identified and documented
- [ ] Updated best practices synthesized
- [ ] reference/sources.md updated with new citations (old citations preserved)
- [ ] reference/methodology.md updated with new frameworks
- [ ] SKILL.md instructions updated with new insights
- [ ] research_enhanced flag set to true in metadata

## Category Move (if applicable)

- [ ] New agent category selected from dynamic agent-manifest.csv list
- [ ] User confirmed category move (aware of path impacts)
- [ ] New category directory exists or created
- [ ] All skill files moved to new location successfully
- [ ] Old directory removed after verification
- [ ] File count matches before/after move (no files lost)
- [ ] New path stored: .claude/skills/{{new_agent_category}}/{{skill_name}}/

## Usage Location Updates (if name or category changed)

- [ ] All usage locations identified in Step 0b
- [ ] User reviewed list of files to be updated
- [ ] User approved update strategy (all / selective / cancel)
- [ ] If name changed: Old skill name replaced with new name in all locations
- [ ] If category changed: Old paths replaced with new paths in all locations
- [ ] Edit tool used correctly (no formatting breaks)
- [ ] Surrounding content preserved (only skill references updated)
- [ ] All selected files updated successfully
- [ ] Update count matches expected count
- [ ] Diff summary shown to user (old vs new references)

## File Move Verification (if category changed)

- [ ] All files exist in new category path
- [ ] No files remain in old category path
- [ ] Old directory deleted successfully
- [ ] File permissions preserved after move
- [ ] Scripts remain executable (if any .py or .js files)

## Re-Validation

- [ ] YAML frontmatter re-validated after edits
- [ ] Name conventions re-checked (if name changed)
- [ ] Description quality re-checked (if description changed)
- [ ] File structure re-validated (all references exist)
- [ ] Content quality maintained (Instructions, Examples, Quality Standards)
- [ ] Progressive disclosure pattern preserved
- [ ] No validation errors present
- [ ] Warnings reviewed and addressed or accepted

## Manifest Updates

- [ ] skill-manifest.csv updated with new metadata
- [ ] If name changed: CSV row name column updated
- [ ] If description changed: CSV description column updated
- [ ] If category changed: CSV agent_category and path columns updated
- [ ] If re-researched: CSV research_enhanced column set to true
- [ ] No duplicate rows in skill-manifest.csv
- [ ] CSV formatting preserved (quotes, commas)

## File Hash Regeneration

- [ ] SHA-256 hashes regenerated for all modified files
- [ ] files-manifest.csv updated with new hashes
- [ ] If files added: New rows added to files-manifest.csv
- [ ] If files removed: Corresponding rows removed from files-manifest.csv
- [ ] If category moved: All skill file paths updated in files-manifest.csv
- [ ] Hash count accurate ({{modified_file_count}} hashes updated)
- [ ] No orphaned entries (files in manifest that don't exist)
- [ ] No missing entries (files exist but not in manifest)

## Change Summary Accuracy

- [ ] Diff summary shows all changes made (skill + usage locations)
- [ ] File modification count accurate
- [ ] Usage location update count accurate
- [ ] Before/after comparison clear for name/description changes
- [ ] All impacted files listed (skill files + workflows + agents + docs)

## Test Query Generation

- [ ] If name/description changed: New test query generated
- [ ] Test query uses updated trigger keywords
- [ ] Test query matches updated "use when" scenarios
- [ ] Test query is realistic user request
- [ ] If only content changed: Test query notes improvements

## User Communication

- [ ] User informed of all changes before applying
- [ ] User approved high-impact changes (name, category move)
- [ ] User shown complete change summary
- [ ] User understands restart requirement (if metadata changed)
- [ ] User given clear next steps
- [ ] All communication in {communication_language}

## Final Quality Gates

- [ ] All selected edits completed successfully
- [ ] No partial updates (all-or-nothing for consistency)
- [ ] Manifests consistent with actual file state
- [ ] Usage locations consistent with skill metadata
- [ ] No broken references anywhere in codebase
- [ ] Skill ready to use after Claude Code restart (if metadata changed)
- [ ] User satisfied with changes

---

## Issues Found During Edit

### Critical Issues (Must Fix)

<!-- List any blocking issues -->

### Warnings (Should Address)

<!-- List any concerns -->

### Change Impact Analysis

<!-- Document scope of changes -->

---

**Validation Status:** [ ] PASS / [ ] FAIL

**Edited By:** {{user_name}}
**Date:** {{date}}
**Files Modified:** {{total_file_count}}
**Usage Locations Updated:** {{usage_update_count}}
