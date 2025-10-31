# Anthropic Official Skill Best Practices

**Source:** Official Claude Code documentation (Oct 2025)
**Purpose:** Ensure all created skills follow Anthropic standards

---

## Naming Conventions

### Requirements (STRICT)

**From official docs:**
- Lowercase letters only
- Numbers allowed
- Hyphens only (no underscores, no spaces)
- Max 64 characters
- Use gerund form (verb+ing) for action skills

### Examples

**✅ GOOD:**
- `analyzing-financial-statements`
- `creating-linkedin-posts`
- `generating-commit-messages`
- `formatting-json-data`
- `extracting-pdf-text`

**❌ BAD:**
- `Financial_Analyzer` (uppercase + underscore)
- `linkedin-helper` (not gerund form - use `creating-linkedin-posts`)
- `analyzer` (too generic - be specific)
- `JSON` (uppercase)
- `pdf helper` (space - use hyphen)

### Gerund Form (Action Skills)

**Pattern:** verb + ing

**Examples:**
- analyze → `analyzing`
- create → `creating`
- generate → `generating`
- format → `formatting`
- extract → `extracting`
- optimize → `optimizing`
- validate → `validating`

**When to use:** Skills that DO something (most skills!)

---

## Description Field (CRITICAL!)

### Requirements

**Max length:** 1024 characters
**Min recommended:** 100+ characters (for good triggers)

**Must include:**
1. WHAT the skill does
2. WHEN to use it
3. Trigger keywords
4. Specific use cases or examples

### Formula

```
{what-it-does}. Use when {trigger-1}, {trigger-2}, or {trigger-3}. {optional-key-capabilities}.
```

### Good vs Bad Examples

**❌ TOO VAGUE:**
```yaml
description: Helps with documents
```
**Why bad:** No triggers, no what/when, too generic

**❌ TOO GENERIC:**
```yaml
description: For data analysis
```
**Why bad:** No specifics, won't trigger reliably

**✅ SPECIFIC:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files, forms, or document extraction. Requires pypdf and pdfplumber packages.
```
**Why good:** What (extract/fill/merge), when (PDF files, forms), triggers (PDF, forms, documents)

**✅ RICH WITH TRIGGERS:**
```yaml
description: Analyze Excel spreadsheets, create pivot tables, and generate charts. Use when working with Excel files, spreadsheets, or analyzing tabular data in .xlsx format. Includes financial ratios, data validation, and visualization.
```
**Why good:** Multiple triggers (Excel, spreadsheets, .xlsx, pivot tables, charts, financial)

---

## Progressive Disclosure

### Three-Level Architecture

**Level 1: Metadata (Always Loaded)**
- name + description only
- Loaded at session start for ALL skills
- Token cost: ~50 tokens per skill
- Used for: Discovery and matching

**Level 2: SKILL.md Body (Loaded When Relevant)**
- Full instructions
- Core methodology
- Basic examples
- Loaded when: Claude determines skill relevant
- Token cost: ~2000-5000 tokens

**Level 3: Bundled Files (Loaded On-Demand)**
- reference/ files
- prompts/ templates
- examples/ detailed
- scripts/ (not loaded, executed)
- Loaded when: Claude needs specific detail
- Token cost: ~1000-10000 tokens per file

### Design Pattern

**Keep SKILL.md lean:**
```markdown
# My Skill

## Instructions
Core process here (concise)

For detailed methodology, see [reference/methodology.md](reference/methodology.md).
For examples, see [examples/samples.md](examples/samples.md).
```

**Move details to bundled files:**
- Deep methodologies → reference/
- Complex examples → examples/
- Reusable prompts → prompts/
- Executable code → scripts/

**Benefit:** SKILL.md loads quickly, details load only if needed

---

## File Structure Patterns

### Simple Skill
```
skill-name/
└── SKILL.md (1-3 KB)
```

**Use when:** Single-purpose, straightforward task

**Examples:** Formatting JSON, extracting emails, simple transformations

---

### Medium Skill
```
skill-name/
├── SKILL.md (2-4 KB)
├── prompts/
│   └── template.md (reusable prompt)
└── examples/
    └── sample-output.md
```

**Use when:** Need templates or examples

**Examples:** Content generation, data analysis, formatting tasks

---

### Complex Skill
```
skill-name/
├── SKILL.md (3-5 KB)
├── reference/
│   ├── methodology.md (detailed frameworks)
│   ├── best-practices.md (comprehensive guides)
│   └── sources.md (citations)
├── prompts/
│   ├── template-1.md
│   └── template-2.md
├── examples/
│   ├── example-1.md
│   └── example-2.md
└── scripts/
    ├── helper.py (executable code)
    └── validator.py
```

**Use when:** Domain expertise, code execution, multi-faceted

**Examples:** Financial analysis, brand guidelines, complex workflows

---

## YAML Frontmatter Rules

### Required Fields

```yaml
---
name: skill-name
description: Description text here
---
```

**Both fields REQUIRED!**

### Optional Fields

```yaml
---
name: skill-name
description: Description text
allowed-tools: Read, Grep, Glob
---
```

**allowed-tools:** Restricts tools Claude can use (security/scope limiting)

### Common Mistakes

**❌ Tabs instead of spaces:**
```yaml
name:	skill-name  # Tab character - INVALID!
```

**❌ Missing dashes:**
```yaml
name: skill-name
description: Text
# Missing closing ---
```

**❌ Unquoted special characters:**
```yaml
description: Text with: colons  # Should quote if complex
```

**✅ Correct:**
```yaml
---
name: skill-name
description: Simple text works without quotes. "Use quotes for: complex, punctuation."
---
```

---

## Validation Checklist

### YAML Validation
- [ ] Opening `---` on line 1
- [ ] Closing `---` before content
- [ ] `name` field present
- [ ] `name` lowercase with hyphens
- [ ] `name` <= 64 characters
- [ ] `description` field present
- [ ] `description` <= 1024 characters
- [ ] No tabs in YAML (spaces only)
- [ ] Valid YAML syntax

### Description Quality
- [ ] Includes WHAT skill does
- [ ] Includes WHEN to use
- [ ] Has trigger keywords
- [ ] Specific (not vague)
- [ ] 100+ characters (good coverage)
- [ ] Mentions file types if relevant (.xlsx, .pdf)
- [ ] Mentions domains if relevant (Instagram, Twitter)

### File Structure
- [ ] SKILL.md exists
- [ ] All referenced files exist
- [ ] Paths are relative (not absolute)
- [ ] Unix-style forward slashes
- [ ] Scripts have execute permissions (if any)

### Content Quality
- [ ] "When to Use" section present
- [ ] "Instructions" section present
- [ ] At least one example
- [ ] Clear step-by-step guidance
- [ ] References cite sources (if researched)

---

## Security Considerations

**From Anthropic docs:**
> "Skills provide Claude with new capabilities through instructions and code. While this makes them powerful, it also means that malicious skills may introduce vulnerabilities."

### Safe Practices

**When including code:**
- Review all scripts before adding
- Validate dependencies are trusted
- No hardcoded credentials
- No external network calls to untrusted sources
- Clear comments explaining what code does

**When referencing external resources:**
- Cite trusted sources only
- Include source URLs
- Note credibility level
- Update date references

**When using in team:**
- Code review skills before merging
- Document what skill does
- Test in safe environment first
- Monitor for unexpected behavior

---

## Common Patterns

### Pattern 1: Content Generation Skill

**Structure:**
```
skill-name/
├── SKILL.md
├── prompts/
│   ├── format-1.md
│   └── format-2.md
└── examples/
    └── sample-outputs.md
```

**Key sections in SKILL.md:**
- Content frameworks/formulas
- Platform specifications
- Voice/tone guidelines
- Length requirements
- Formatting rules

---

### Pattern 2: Data Analysis Skill

**Structure:**
```
skill-name/
├── SKILL.md
├── reference/
│   ├── methodology.md
│   └── formulas.md
└── scripts/
    ├── calculator.py
    └── validator.py
```

**Key sections:**
- Analysis methodologies
- Calculation formulas
- Validation rules
- Output formats
- Error handling

---

### Pattern 3: Format Conversion Skill

**Structure:**
```
skill-name/
├── SKILL.md
├── templates/
│   ├── template-input.md
│   └── template-output.md
└── scripts/
    └── converter.py
```

**Key sections:**
- Input format specifications
- Output format specifications
- Conversion rules
- Validation criteria

---

## Sources Referenced

1. **Agent Skills Documentation** (docs.claude.com)
2. **Engineering Blog** (anthropic.com/engineering)
3. **Skills Cookbook** (github.com/anthropics/claude-cookbooks)
4. **Best Practices Guide** (docs.claude.com/agents-and-tools/agent-skills/best-practices)

All current as of October 2025.
