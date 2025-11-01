# Create Skill - Validation Checklist

## YAML Frontmatter Structure

- [ ] SKILL.md starts with `---` on line 1
- [ ] YAML frontmatter closes with `---` before content begins
- [ ] `name` field exists and is properly formatted
- [ ] `description` field exists and is properly formatted
- [ ] No other required fields in frontmatter (name + description only)

## Name Convention Compliance

- [ ] Name uses lowercase letters, numbers, and hyphens only (no underscores, no uppercase, no spaces)
- [ ] Name length is 64 characters or less
- [ ] Name follows gerund form (verb+ing) for action skills: "analyzing-data", "creating-content", "generating-reports"
- [ ] Name is specific and descriptive, not generic: "analyzing-instagram-engagement" not "social-media"
- [ ] Name matches regex pattern: `^[a-z0-9-]+$`
- [ ] No consecutive hyphens (--) in name

## Description Quality and Discovery

- [ ] Description is 1024 characters or less
- [ ] Description includes WHAT the skill does (clear capability statement)
- [ ] Description includes WHEN to use it ("Use when...", "When working with...", etc.)
- [ ] Description contains 3-5 trigger keywords that match likely user queries
- [ ] Description is specific with examples or capabilities (not vague like "helps with files")
- [ ] Description avoids generic openings like "For...", "Helps with...", "Use this for..."
- [ ] If researched, description mentions discovered methodologies or frameworks

## File Structure and References

- [ ] SKILL.md exists at `.claude/skills/{agent_category}/{skill_name}/SKILL.md`
- [ ] All files referenced in SKILL.md markdown links exist (reference/, prompts/, examples/)
- [ ] File paths use Unix-style forward slashes (not backslashes)
- [ ] Relative paths from SKILL.md correctly point to supporting files
- [ ] No broken links to non-existent files
- [ ] Scripts have proper permissions if executable (chmod +x)
- [ ] Scripts include proper shebang if executable (#!/usr/bin/env python3)

## Content Structure and Quality

- [ ] SKILL.md includes "When to Use This Skill" section with 3-5 specific trigger scenarios
- [ ] SKILL.md includes "Instructions" section with clear, actionable steps
- [ ] SKILL.md includes "Examples" section with at least 2 concrete scenarios
- [ ] Instructions are specific (not vague): "Write 1-2 paragraphs" not "Write about topic"
- [ ] Examples show realistic use cases with expected inputs/outputs
- [ ] If research mode: Methodologies are properly documented with source attribution
- [ ] If research mode: reference/sources.md contains all citations with URLs

## Research Quality (if research mode)

- [ ] Research used 3+ credible sources (blogs, documentation, expert content)
- [ ] Each methodology is explained clearly with application steps
- [ ] Best practices are synthesized from multiple sources (not single-source)
- [ ] Examples are based on real-world findings (not fabricated)
- [ ] Sources are cited with URLs in reference/sources.md
- [ ] Credibility levels noted for each source (high/medium)
- [ ] Research findings directly incorporated into SKILL.md instructions

## Manifest Registration

- [ ] skill-manifest.csv exists at `bmad/_cfg/skill-manifest.csv`
- [ ] skill-manifest.csv has proper header: `name,description,agent_category,path,research_enhanced`
- [ ] New skill entry added to skill-manifest.csv with all fields populated
- [ ] No duplicate entries in skill-manifest.csv (same skill name)
- [ ] files-manifest.csv updated with all created files
- [ ] Each file has proper hash (SHA-256) in files-manifest.csv
- [ ] File types correctly identified (md, py, js, etc.)
- [ ] File paths are relative from bmad/ or .claude/ root

## Agent Category Assignment

- [ ] Agent category selected from actual agent-manifest.csv (not hardcoded)
- [ ] Selected category matches skill purpose logically
- [ ] Category directory exists: `.claude/skills/{agent_category}/`
- [ ] If standalone: Skill is truly cross-agent (not specific to one agent)

## Progressive Disclosure Pattern

- [ ] SKILL.md is concise and focused (core instructions only)
- [ ] Detailed methodologies moved to reference/ files if complex
- [ ] Supporting files linked from SKILL.md (not embedded entirely)
- [ ] File organization enables Claude to load details on-demand
- [ ] No massive SKILL.md files (>500 lines suggests poor structure)

## Testing and Documentation

- [ ] Test query provided that should trigger skill discovery
- [ ] Test query includes trigger keywords from description
- [ ] Test query represents realistic user request
- [ ] User knows to restart Claude Code for skill to load
- [ ] Next steps clearly documented (restart, test, refine)

## Final Quality Gates

- [ ] All validation errors resolved (no ❌ items)
- [ ] Warnings reviewed and addressed or intentionally accepted
- [ ] User approved final skill content before saving
- [ ] All manifest updates completed successfully
- [ ] Skill follows same quality standards as existing skills in project
- [ ] Ready for immediate use after Claude Code restart

---

## Issues Found During Validation

### Critical Issues (Must Fix)
<!-- List any blocking issues found -->

### Warnings (Should Address)
<!-- List any non-blocking concerns -->

### Recommendations
<!-- List any improvement suggestions -->

---

**Validation Status:** [ ] PASS / [ ] FAIL

**Validated By:** {{user_name}}
**Date:** {{date}}
