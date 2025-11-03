# Anthropic Best Practices for Claude Code Skills

Based on official Anthropic documentation for creating Agent Skills.

## Core Concepts

### Skills Are Model-Invoked

**CRITICAL:** Skills are **model-invoked**—Claude autonomously decides when to use them based on your request and the skill's description.

This is different from:

- **Slash commands** - User explicitly types `/command` to trigger
- **Workflows** - User selects from agent menus
- **Tools** - Explicitly called by workflows or code

**Skills auto-load when Claude detects a matching task!**

### Progressive Disclosure

Skills use two-level loading for efficiency:

**Level 1 - Session Start (Metadata Only):**

- Claude loads YAML frontmatter (name + description)
- Costs: ~50-100 tokens per skill
- Purpose: Discovery - Claude knows what skills are available

**Level 2 - When Relevant (Full Content):**

- Claude loads complete SKILL.md
- Loads supporting files (reference/, prompts/, examples/) on-demand
- Costs: 5,000-10,000+ tokens per skill
- Purpose: Execution - Claude has detailed instructions

**Efficiency:** Only loads what's needed, when it's needed!

## File Structure

### Required File

**SKILL.md** - Main skill file (REQUIRED)

```
skill-name/
└── SKILL.md
```

### Optional Supporting Files

```
skill-name/
├── SKILL.md (always required)
├── reference/ (detailed methodologies, loaded on-demand)
│   ├── methodology.md
│   ├── best-practices.md
│   └── sources.md
├── prompts/ (generation templates, loaded when needed)
│   └── templates.md
├── examples/ (concrete samples, loaded when referenced)
│   └── real-world-examples.md
└── scripts/ (helper code, executed when called)
    └── helper.py
```

## YAML Frontmatter

### Required Format

```yaml
---
name: skill-name
description: What the skill does and when to use it. Use when working with specific scenarios. Includes key capabilities.
---
```

**Rules:**

- Must start with `---` on line 1
- Must close with `---` before content
- Only `name` and `description` fields required
- Optional: `allowed-tools` for restricting tool access

### Name Field

**Requirements:**

- Lowercase letters, numbers, hyphens only
- No underscores, no uppercase, no spaces
- Max 64 characters
- Regex: `^[a-z0-9-]+$`

**Conventions:**

- Use gerund form (verb+ing) for action skills: `analyzing-data`, `creating-content`, `generating-reports`
- Be specific, not generic: `analyzing-instagram-engagement` not `social-media-tools`
- Descriptive: Name should hint at purpose

**Good Examples:**

- `analyzing-twitter-threads`
- `creating-linkedin-posts`
- `generating-commit-messages`
- `extracting-pdf-data`

**Bad Examples:**

- `social_media` (underscore, too generic)
- `InstagramAnalyzer` (uppercase, not hyphen-case)
- `tool` (too vague)
- `analyzing-analyzing-data` (redundant)

### Description Field

**Requirements:**

- Max 1024 characters
- Must include WHAT the skill does
- Must include WHEN Claude should use it
- Include trigger keywords for discovery

**Formula:**

```
{what-it-does}. Use when {trigger-context-1}, {trigger-context-2}, or {trigger-context-3}. {key-capabilities-or-methods}.
```

**Good Examples:**

```yaml
description: Analyze Excel spreadsheets, create pivot tables, and generate charts. Use when working with Excel files, spreadsheets, or analyzing tabular data in .xlsx format. Supports data validation, formula debugging, and report generation.
```

**Why good:**

- ✅ Clear what: "Analyze Excel spreadsheets..."
- ✅ Clear when: "Use when working with Excel files..."
- ✅ Trigger keywords: Excel, spreadsheets, .xlsx, data
- ✅ Specific capabilities: pivot tables, charts, validation

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction. Handles multi-page analysis and preserves formatting.
```

**Why good:**

- ✅ What: PDF operations
- ✅ When: "working with PDF files", "mentions PDFs"
- ✅ Triggers: PDF, forms, document extraction
- ✅ Specific: extract text, fill forms, merge

**Bad Examples:**

```yaml
description: For files
```

**Why bad:** Too vague, no "when" clause, no triggers

```yaml
description: Helps with document processing
```

**Why bad:** Generic "helps with", no specifics, weak triggers

```yaml
description: This skill is designed to assist users in the creation, management, and optimization of various types of content across multiple platforms.
```

**Why bad:** Verbose, no clear triggers, tries to do everything

## Content Structure

### Required Sections

**1. When to Use This Skill**

List 3-5 specific scenarios that trigger the skill:

```markdown
## When to Use This Skill

This skill auto-loads when:

- Analyzing Twitter thread engagement and structure
- Extracting insights from viral thread patterns
- Comparing thread performance across creators
- Optimizing thread hooks and retention tactics
```

**2. Instructions**

Clear, actionable steps for using the skill:

```markdown
## Instructions

When analyzing Twitter threads:

1. Load the thread URL or content
2. Analyze structure: hook effectiveness, thread length, engagement patterns
3. Extract key insights: what worked, what didn't, pattern identification
4. Generate recommendations based on findings
```

**3. Examples**

At least 2 concrete examples showing realistic usage:

```markdown
## Examples

### Example 1: Analyzing Viral Thread

**Input:** Thread URL from @creator with 50k+ impressions

**Process:**

- Extract thread structure (12 tweets)
- Analyze hook: "I spent $10k learning this..." (curiosity gap)
- Pattern: Numbered list format with reveals
- Engagement: 40% thread completion rate

**Output:** Recommendation to use numbered reveals with curiosity gaps
```

### Optional Sections

**Quality Standards** - Criteria for outputs
**Reference Files** - Links to supporting docs
**Progressive Disclosure** - How files are loaded

## Discovery Optimization

### How Claude Chooses Skills

1. **User makes request:** "Write an Instagram caption"
2. **Claude scans skill descriptions** looking for matches
3. **Matches found:** Skills with "Instagram", "caption", "social media" in description
4. **Claude loads relevant skill** with highest match confidence
5. **Skill executes** using its instructions

### Making Skills Discoverable

**Include trigger keywords:**

- Platform names: Instagram, Twitter, LinkedIn, YouTube
- Task types: analyze, create, generate, extract, write
- Content types: posts, captions, scripts, threads, images
- Formats: .xlsx, .pdf, .csv, JSON, markdown
- Domains: marketing, finance, development, design

**Be specific with examples:**

- Instead of: "Use when working with data"
- Better: "Use when analyzing CSV files, Excel spreadsheets, or tabular data in .xlsx format"

**Include "Use when" clause explicitly:**

- "Use when working with..."
- "Use when the user mentions..."
- "Use when creating..."
- "Use when analyzing..."

## Tool Restrictions (Optional)

Limit which tools the skill can use:

```yaml
---
name: safe-file-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

**Use cases:**

- Read-only skills (prevent accidental edits)
- Security-sensitive workflows
- Limited scope operations

**Most skills don't need this** - Claude asks for permission normally.

## Common Pitfalls

### ❌ Name Issues

- Using underscores: `skill_name` → Use hyphens: `skill-name`
- Uppercase letters: `SkillName` → Lowercase only: `skill-name`
- Too generic: `helper` → Be specific: `analyzing-twitter-threads`
- Not gerund: `analyze-data` → Use gerund: `analyzing-data`

### ❌ Description Issues

- Too short: "For PDFs" → Add what, when, capabilities
- Too vague: "Helps with documents" → Be specific about document types
- Missing triggers: No "use when" clause → Claude won't know when to activate
- Too long: >1024 chars → Will be truncated

### ❌ Content Issues

- No examples → Users can't see how to use it
- Vague instructions → "Process the data" (how?)
- Missing "When to Use" section → Not discoverable
- Embedding everything in SKILL.md → Use reference/ files for details

### ❌ File Structure Issues

- Broken links to reference files
- Absolute paths (use relative: `reference/file.md`)
- Windows backslashes (use forward slashes: `prompts/template.md`)
- Missing referenced files

## Validation Checklist

Before saving a skill:

- [ ] YAML frontmatter valid (opening/closing `---`)
- [ ] Name: lowercase, hyphens, <=64 chars, gerund form
- [ ] Description: <=1024 chars, includes "use when", has triggers
- [ ] "When to Use" section with 3+ scenarios
- [ ] "Instructions" section clear and actionable
- [ ] "Examples" section with 2+ concrete scenarios
- [ ] All referenced files exist
- [ ] Paths are relative with forward slashes
- [ ] No hardcoded values that should be variables

## Testing Skills

After creating a skill:

1. **Restart Claude Code** - Skills load at session start
2. **Ask matching query** - Use trigger keywords from description
3. **Check if skill activates** - Claude should say "Using {skill-name} skill..."
4. **Verify output quality** - Does it follow skill instructions?

If skill doesn't activate:

- Add more trigger keywords to description
- Make description more specific
- Check for typos in YAML frontmatter
- Verify skill is in correct directory

## Best Practices

### Description Writing

✅ **Good:**
"Generate professional social media posts using proven creator formulas (Justin Welsh PAIPS, Greg Isenberg hooks). Use when writing LinkedIn posts, Twitter threads, or Instagram captions. Includes voice-matching, platform optimization, and engagement tactics."

**Why:** Specific what (social posts), clear when (LinkedIn/Twitter/Instagram), rich triggers (PAIPS, hooks, captions), capabilities listed

❌ **Bad:**
"For social media content"

**Why:** Vague, no "use when", no triggers, no capabilities

### Instruction Writing

✅ **Good:**
"1. Load user's voice profile from historical posts 2. Select appropriate formula (PAIPS for LinkedIn, hooks for Twitter) 3. Generate 3 draft variations 4. Validate against voice profile (≥8/10 confidence required) 5. Present best variation with alternatives"

**Why:** Specific steps, clear criteria, measurable validation

❌ **Bad:**
"Create content using best practices"

**Why:** Vague, no steps, undefined "best practices"

### File Organization

✅ **Good:**

```
analyzing-instagram-engagement/
├── SKILL.md (concise core instructions)
├── reference/
│   └── engagement-metrics.md (detailed metric explanations)
├── prompts/
│   └── analysis-template.md (structured output format)
└── examples/
    └── profile-analysis-sample.md (real example)
```

**Why:** Progressive disclosure, core in SKILL.md, details in reference/

❌ **Bad:**

```
instagram-skill/
└── SKILL.md (5000 lines with everything embedded)
```

**Why:** No progressive disclosure, massive token cost, poor organization

## Research Integration

When building skills from research:

1. **Cite sources** in reference/sources.md
2. **Document methodologies** in reference/methodology.md
3. **Include in description:** "using {methodology-from-research}"
4. **Provide examples** from real-world research findings
5. **Note credibility** of sources (high/medium)

This builds trust and enables users to verify the skill's foundation.

---

**For complete Anthropic documentation:** See official Claude Code skills documentation
