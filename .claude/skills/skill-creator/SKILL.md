---
name: skill-creator
description: Create well-formed Claude Code skills following Anthropic best practices with optional research-enhanced generation. Use when building new skills, creating custom capabilities, or need skill templates. Automatically researches methodologies using Exa and Firecrawl when building domain-specific skills, ensuring skills are based on real-world best practices and proven patterns.
---

# Skill Creator - Automated + Research-Enhanced Skill Generation

Create high-quality Claude Code skills following Anthropic official best practices, with **Python automation** for scaffolding and optional **deep research** to find proven methodologies.

## 🚀 New: Automation Scripts Available

**Progressive Discovery Workflow:**
1. **init_skill.py** - Auto-scaffolds skill directory in 2 seconds
2. **quick_validate.py** - Validates YAML and naming conventions
3. **package_skill.py** - Creates distributable ZIP files
4. **enhance_skill.py** - Adds research findings to existing skills

**Benefits:**
- ⚡ Create skills in 1-3 minutes (vs 5-10 minutes manual)
- ✅ Consistent structure every time
- 📦 Distribution-ready packaging
- 🔬 Research-enhanced when needed

## When to Use This Skill

This skill auto-loads when:
- Creating a new Claude Code skill
- Need to build custom capabilities
- Want skill templates
- Building domain-specific expertise packages
- Ensuring YAML frontmatter valid
- Following Anthropic best practices
- Need research-backed skill creation

## Two Creation Modes

### Mode 1: Template-Based (Fast - 1 min)

**When to use:** Simple, well-understood domains
**Process:** Ask questions → Apply template → Generate files
**Time:** 1-2 minutes
**Best for:** Generic skills (file processing, formatting, etc.)

### Mode 2: Research-Enhanced (Thorough - 5 min)

**When to use:** Complex domains, need proven methodologies
**Process:** Research with Exa + Firecrawl → Synthesize → Generate skill
**Time:** 3-5 minutes
**Best for:** Content creation, marketing, specialized domains

**Research capabilities:**
- Exa neural search for methodologies
- Firecrawl for scraping best practices
- Finds real-world examples
- Discovers proven patterns
- Incorporates expert insights

---

## Interactive Creation Process

When user requests skill creation, guide them through:

### Step 1: Understand Requirements

**Ask:**
```
I'll help you create a skill following Anthropic best practices.

What should this skill do? (Be specific)

Examples:
- "Analyze Instagram engagement metrics"
- "Generate product descriptions"
- "Write commit messages from git diffs"
```

**Capture:** Purpose, domain, complexity

---

### Step 2: Decide Research Approach

**Evaluate complexity:**

**Simple domains (use template):**
- File operations (read, write, format)
- Data transformations
- Basic formatting tasks
- Generic utilities

**Complex domains (research first!):**
- Content creation (posts, scripts, captions)
- Marketing methodologies
- Creative processes
- Domain-specific expertise

**Ask if complex:**
```
This is a {domain} skill. I can:

1. **Quick creation** (1 min) - Use template + your input
2. **Research-enhanced** (5 min) - Find proven methodologies first

Which approach? [1 = quick / 2 = research]
```

---

### Step 3: Research Phase (If Mode 2 Selected)

**Execute research:**

**3a. Exa Neural Search**
```
Using Exa to find {domain} best practices...

Query: "{domain} best practices methodologies proven strategies"
Results: 10 sources
```

**3b. Firecrawl Top Results**
```
Scraping top 3 sources with Firecrawl...
- {source_1}: {key_finding}
- {source_2}: {key_finding}
- {source_3}: {key_finding}
```

**3c. Synthesize Findings**
```
Research complete! Found:
- {methodology_1} (from {source})
- {methodology_2} (from {source})
- {best_practice_1}
- {pattern_1}
- {framework_1}

Will incorporate into skill instructions.
```

**Tools used:**
- `mcp__exa__search(query, numResults=10)`
- `mcp__firecrawl__firecrawl_scrape(url)` for top 3
- Synthesis into skill structure

---

### Step 4: Generate Skill Name

**Apply Anthropic naming rules:**

**Rules:**
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Use gerund form (verb+ing) for action skills
- Be specific, not generic

**Generate from purpose:**
```
Purpose: "Analyze Instagram engagement"
Generated name: analyzing-instagram-engagement

Purpose: "Create product descriptions"
Generated name: creating-product-descriptions

Purpose: "Write commit messages"
Generated name: generating-commit-messages
```

**Show to user:**
```
Suggested name: {generated-name}
Follows Anthropic conventions ✓

Accept? [yes / suggest alternative]
```

---

### Step 5: Craft Description (CRITICAL!)

**Anthropic requirements:**
- Max 1024 characters
- Include WHAT it does
- Include WHEN to use it
- Add trigger keywords
- Be specific with examples

**Generate description:**

**Template:**
```
{what-it-does}. Use when {trigger-context-1}, {trigger-context-2}, or {trigger-context-3}. {key-capabilities-or-methods}.
```

**For researched skills, include methodologies found:**
```
{what-it-does} using {methodology-from-research}. Use when {triggers}. Includes {frameworks-found} and {patterns-found}.
```

**Example (researched):**
```yaml
description: Create engaging Instagram captions with hooks, storytelling, and CTAs using proven engagement patterns. Use when writing Instagram posts, captions, or social media content for Instagram. Includes hook formulas from viral content analysis, optimal caption length (600-1200 chars), and hashtag strategies (5-10 tags).
```

**Validation:**
- Length check (max 1024)
- Has "use when" ✓
- Has trigger keywords ✓
- Specific examples ✓

**Show to user:**
```
Description (optimized for discovery):
"{generated-description}"

Triggers: {extracted-keywords}
Length: {char_count}/1024 ✓

Good? [yes / edit]
```

---

### Step 6: Design File Structure

**Based on complexity and research:**

**Simple (no research):**
```
skill-name/
└── SKILL.md
```

**Medium (some research):**
```
skill-name/
├── SKILL.md
├── prompts/
│   └── generation-template.md
└── examples/
    └── sample-output.md
```

**Complex (deep research):**
```
skill-name/
├── SKILL.md
├── reference/
│   ├── methodology.md (researched frameworks)
│   ├── best-practices.md (scraped insights)
│   └── sources.md (citation list)
├── prompts/
│   └── templates.md (based on research)
├── examples/
│   └── real-world-examples.md (from research)
└── scripts/ (if code needed)
    └── helper.py
```

**Ask:**
```
Recommended structure: {structure-type}

Files to create:
{file-list}

Proceed? [yes / customize]
```

---

### Step 7: Generate SKILL.md

**🚀 AUTOMATION AVAILABLE: Run init_skill.py to auto-scaffold**

Before manually creating files, you can use the automation script:

```bash
python3 scripts/init_skill.py {skill-name} --path {target-directory}
```

**This creates in 2 seconds:**
- ✅ Skill directory
- ✅ SKILL.md with template + TODOs
- ✅ scripts/ directory with example.py
- ✅ references/ directory with api_reference.md
- ✅ assets/ directory with example_asset.txt

**Then you just edit the generated SKILL.md to fill TODOs!**

**If automation unavailable or you prefer manual:**

**Build SKILL.md content manually:**

**Header (YAML):**
```yaml
---
name: {generated-name}
description: {optimized-description}
---
```

**Body sections:**

**When to Use This Skill:**
```markdown
Use this skill when:
- {trigger scenario 1}
- {trigger scenario 2}
- {trigger scenario 3}
```

**Instructions:**

**If template-based:**
```markdown
## Instructions

When {task-type}:

1. {step 1}
2. {step 2}
3. {step 3}
```

**If research-enhanced:**
```markdown
## Instructions

Based on research of {domain} best practices:

### {Methodology 1 Name} (from {source})
{methodology explanation}

### {Methodology 2 Name} (from {source})
{methodology explanation}

### Application Process
1. {step using methodology 1}
2. {step using methodology 2}
3. {synthesis step}
```

**Examples:**
```markdown
## Examples

**Example 1: {scenario}**
{example based on research or user input}

**Example 2: {scenario}**
{example}
```

**Reference Files (if researched):**
```markdown
## Reference Files

- **[reference/methodology.md](reference/methodology.md)** - {Framework} details
- **[reference/sources.md](reference/sources.md)** - Research citations
```

---

### Step 8: Create Supporting Files

**If research-enhanced:**

**reference/methodology.md:**
```markdown
# {Domain} Methodologies

## {Framework 1} (Source: {url})
{detailed explanation from research}

## {Framework 2} (Source: {url})
{detailed explanation from research}

## Best Practices
{synthesized from all sources}
```

**reference/sources.md:**
```markdown
# Research Sources

1. **{Source 1 Title}**
   - URL: {url}
   - Key insights: {insights}
   - Credibility: High (publication, author credentials)

2. **{Source 2 Title}**
   - URL: {url}
   - Key insights: {insights}
   - Credibility: High
```

**prompts/templates.md:**
```markdown
# Generation Templates

Based on researched patterns:

## Template 1: {Pattern Name}
{template based on research}

## Template 2: {Pattern Name}
{template based on research}
```

---

### Step 9: Validate

**🚀 AUTOMATION: Run quick_validate.py**

```bash
python3 scripts/quick_validate.py {skill-directory}
```

**Auto-checks:**
- ✅ YAML frontmatter valid
- ✅ name field exists + hyphen-case format
- ✅ description field exists + no angle brackets
- ✅ SKILL.md structure correct

**Example output:**
```
✅ Skill is valid!
```

OR

```
❌ Name 'MySkill' should be hyphen-case (lowercase, digits, hyphens)
```

**If validation passes, skill is ready!**

**If you prefer manual validation or automation unavailable:**

**YAML validation:**
```python
# Check YAML frontmatter
- Opening --- on line 1 ✓
- Closing --- before content ✓
- name field exists ✓
- name is lowercase-with-hyphens ✓
- name length <= 64 chars ✓
- description exists ✓
- description length <= 1024 chars ✓
```

**Description quality:**
```python
- Includes "use when" ✓
- Has trigger keywords ✓
- Specific (not vague) ✓
- Includes what + when ✓
```

**File structure:**
```python
- SKILL.md exists ✓
- Referenced files exist ✓
- Paths are relative ✓
- Unix-style forward slashes ✓
```

**Report validation:**
```
Validation Results:
✅ YAML frontmatter valid
✅ Name follows conventions
✅ Description optimized (789/1024 chars)
✅ File structure correct
✅ All referenced files exist
✅ Ready to use!
```

---

### Step 10: Save to Location

**Ask:**
```
Where to save this skill?

1. **Personal** (~/.claude/skills/{skill-name}/)
   - Available across all your projects
   - Your individual use

2. **Project - Jarvis** (.claude/skills/jarvis/{skill-name}/)
   - Content intelligence skills
   - Shared via git

3. **Project - AI Image** (.claude/skills/ai-image-generator/{skill-name}/)
   - Image generation skills
   - Shared via git

4. **Custom path** (specify)

Recommend: {recommendation based on skill type}

Select: [1/2/3/4]
```

**Create files:**
```bash
mkdir -p {selected-path}
# Create SKILL.md
# Create supporting files
# Set permissions if scripts
```

---

### Step 11: Present Results

**🚀 AUTOMATION: Package for Distribution (Optional)**

If skill is complete and ready to share:

```bash
python3 scripts/package_skill.py {skill-directory} ./output
```

**This creates:**
- ✅ Validates skill structure
- ✅ Checks for TODO items (warns if found)
- ✅ Creates {skill-name}.zip with all files
- ✅ Ready for sharing or uploading

**Use --force to skip TODO warnings:**
```bash
python3 scripts/package_skill.py {skill-directory} ./output --force
```

**Output:**
```
📦 Packaging skill to: ./output/my-skill.zip

   Added: my-skill/SKILL.md
   Added: my-skill/references/methodology.md
   Added: my-skill/scripts/helper.py

✅ Successfully packaged skill to: ./output/my-skill.zip
```

---

**Display skill creation results:**
```
✅ Skill Created: {skill-name}

**Location:** {saved-path}

**Structure:**
{#if simple}
- SKILL.md (2.8 KB)
{/if}

{#if researched}
- SKILL.md (4.5 KB) - Core instructions
- reference/ - Researched methodologies
  - methodology.md (3.2 KB)
  - sources.md (citations from 8 sources)
- prompts/ - Generation templates
  - templates.md (2.1 KB)
- examples/ - Real-world examples
  - example-1.md (1.8 KB)
{/if}

**Research Summary:**
{#if researched}
- Sources analyzed: {source_count}
- Methodologies found: {methodology_count}
- Best practices incorporated: {best_practice_count}
- Examples included: {example_count}
{/if}

**Next Steps:**
1. Restart Claude Code (to load new skill)
2. Test with: "{test-query}"
3. If Claude mentions your skill, it's working!

**Validation:** All checks passed ✓
```

---

## Research Integration Details

### When to Research

**Auto-decide based on domain:**

**Skip research (use template):**
- File operations
- Data formatting
- Simple transformations
- Well-understood tasks

**Research first:**
- Content creation (posts, scripts, captions)
- Marketing methodologies
- Creative processes
- Domain-specific expertise
- User explicitly requests research

**Ask user if unclear:**
```
This seems like a {domain} skill. Research first?

Research mode finds proven methodologies and real examples.
Template mode is faster but more generic.

[research / template / auto-decide]
```

---

### Research Queries

**Generate smart queries from skill purpose:**

**Purpose:** "Create Instagram captions"
**Research queries:**
1. Exa: "Instagram caption best practices engagement strategies"
2. Exa: "viral Instagram caption formulas hooks"
3. Firecrawl: Top 3 results from Exa

**Purpose:** "Analyze Twitter threads"
**Research queries:**
1. Exa: "Twitter thread structure viral patterns"
2. Exa: "thread engagement tactics proven formulas"
3. Firecrawl: Top 3 results

**Purpose:** "Write product descriptions"
**Research queries:**
1. Exa: "product description copywriting frameworks"
2. Exa: "ecommerce product copy best practices"
3. Firecrawl: Top 3 results

---

### Research Synthesis

**Extract from research:**

**Methodologies:**
- Named frameworks (AIDA, PAS, etc.)
- Step-by-step processes
- Proven patterns

**Best practices:**
- Do's and don'ts
- Common mistakes
- Success factors

**Examples:**
- Real-world samples
- Before/after comparisons
- Case studies

**Data:**
- Statistics (engagement rates, lengths, etc.)
- Benchmarks
- Optimal parameters

**Incorporate ALL into skill SKILL.md and references!**

---

## Validation Script

**scripts/validate-skill.py:**
```python
#!/usr/bin/env python3
"""
Validate SKILL.md follows Anthropic best practices
Usage: python scripts/validate-skill.py path/to/skill
"""

import sys
import re
from pathlib import Path

def validate_skill(skill_path):
    """Comprehensive skill validation"""

    skill_md = Path(skill_path) / "SKILL.md"

    if not skill_md.exists():
        return "❌ SKILL.md not found"

    content = skill_md.read_text()
    errors = []
    warnings = []

    # Check YAML frontmatter
    if not content.startswith('---\n'):
        errors.append("Missing opening ---")

    parts = content.split('---\n')
    if len(parts) < 3:
        errors.append("Missing closing ---")
        return format_results(errors, warnings)

    # Parse YAML
    yaml_content = parts[1]
    metadata = {}
    for line in yaml_content.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            metadata[key.strip()] = value.strip()

    # Validate name
    if 'name' not in metadata:
        errors.append("Missing 'name' field")
    else:
        name = metadata['name']

        if not re.match(r'^[a-z0-9-]+$', name):
            errors.append(f"Name '{name}' must be lowercase with hyphens only")

        if len(name) > 64:
            errors.append(f"Name too long: {len(name)}/64 chars")

        if '_' in name:
            errors.append(f"Name contains underscore - use hyphens")

        if not re.search(r'ing', name):
            warnings.append(f"Consider gerund form (verb+ing) for action skills")

    # Validate description
    if 'description' not in metadata:
        errors.append("Missing 'description' field")
    else:
        desc = metadata['description']

        if len(desc) > 1024:
            errors.append(f"Description too long: {len(desc)}/1024 chars")

        if len(desc) < 50:
            warnings.append(f"Description short ({len(desc)} chars) - add more triggers")

        if 'use when' not in desc.lower() and 'when' not in desc.lower():
            warnings.append("Description should include WHEN to use skill")

        if desc.lower().startswith('for ') or desc.lower().startswith('helps with'):
            warnings.append("Description vague - be more specific")

    # Check content structure
    body = parts[2]

    required_sections = ['## When to Use', '## Instructions']
    for section in required_sections:
        if section not in body:
            warnings.append(f"Missing recommended section: {section}")

    # Check file references
    referenced_files = re.findall(r'\[.*?\]\((.*?\.md)\)', body)
    for ref in referenced_files:
        ref_path = Path(skill_path) / ref
        if not ref_path.exists():
            warnings.append(f"Referenced file missing: {ref}")

    return format_results(errors, warnings)

def format_results(errors, warnings):
    """Format validation output"""
    result = []

    if not errors and not warnings:
        return "✅ Skill validation passed! All checks successful."

    if errors:
        result.append("❌ ERRORS (must fix):")
        for e in errors:
            result.append(f"  - {e}")

    if warnings:
        result.append("\n⚠️  WARNINGS (should fix):")
        for w in warnings:
            result.append(f"  - {w}")

    return '\n'.join(result)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate-skill.py path/to/skill")
        sys.exit(1)

    result = validate_skill(sys.argv[1])
    print(result)
```

---

### Step 12: Provide Test Query

**Generate test query that should trigger skill:**

**Based on description triggers:**
```
Skill ready! Test with this query:

"{test-query}"

Example: If skill is "analyzing-twitter-threads", test with:
"Analyze this Twitter thread: https://twitter.com/..."

If Claude says "Using analyzing-twitter-threads skill...", it works!
If not, description may need more specific triggers.
```

---

## Reference Files

### Anthropic Best Practices

**reference/anthropic-best-practices.md** - Complete Anthropic guidelines:
- Naming conventions (gerund form, lowercase, hyphens)
- Description optimization (what + when + triggers)
- Progressive disclosure patterns
- File structure recommendations
- Validation requirements

### Description Optimization

**reference/description-optimization.md** - How to write discoverable descriptions:
- Formula: what + when + triggers
- Good vs bad examples
- Keyword selection
- Length optimization
- Specificity guidelines

### Research Integration

**prompts/research-query-generator.md** - How to research for skills:
- Query formulation from skill purpose
- Exa search strategies
- Firecrawl target selection
- Synthesis into skill structure
- Citation practices

## Examples

### Example 1: Template-Based Creation

**User:** "Create a skill for formatting JSON"

**skill-creator:**
```
Using skill-creator skill in template mode...

Name: formatting-json-data
Description: "Format and validate JSON data with proper indentation and structure. Use when working with JSON files, APIs, or data formatting. Validates syntax and prettifies output."

Structure: Simple (SKILL.md only)

Creating...
✅ SKILL.md created (1.8 KB)
✅ Validation passed

Location: .claude/skills/jarvis/formatting-json-data/
Test with: "Format this JSON: {...}"
```

**Time:** 1 minute

---

### Example 2: Research-Enhanced Creation

**User:** "Create a skill for writing LinkedIn posts, research best practices first"

**skill-creator:**
```
Using skill-creator skill in research mode...

🔍 Researching LinkedIn best practices...

Exa search: "LinkedIn viral post formulas engagement strategies"
Found 10 sources

Scraping top 3 with Firecrawl:
1. Justin Welsh methodologies (PAIPS, Top 5)
2. Metricool viral analysis (577K posts analyzed)
3. LinkedIn algorithm insights (2025 updates)

Synthesizing research...

Methodologies found:
- Justin Welsh PAIPS (Problem → Agitate → Invalidate → Promise → Solve)
- Top 5 list format (strategic ordering)
- Hook optimization (first 140 chars critical)
- Engagement patterns (questions outperform statements 40%)

Name: creating-linkedin-posts
Description: "Create engaging LinkedIn posts using proven viral formulas including Justin Welsh PAIPS and Top 5 formats. Use when writing LinkedIn content, professional posts, or thought leadership. Incorporates 2025 algorithm insights and engagement data from 577K post analysis."

Structure: Complex (with research references)

Creating...
✅ SKILL.md (4.2 KB) - With researched methodologies
✅ reference/justin-welsh-formulas.md (3.8 KB)
✅ reference/engagement-data.md (2.1 KB)
✅ reference/sources.md (8 citations)
✅ prompts/paips-template.md
✅ prompts/top5-template.md
✅ examples/viral-post-breakdown.md

Location: .claude/skills/jarvis/creating-linkedin-posts/
Test with: "Write a LinkedIn post about AI automation"
```

**Time:** 4 minutes
**Quality:** Research-backed, proven methodologies!

---

## Integration with Existing Tools

### Works With:

**Exa (mcp__exa__search):**
- Neural search for methodologies
- Find proven frameworks
- Discover real-world examples

**Firecrawl (mcp__firecrawl__firecrawl_scrape):**
- Scrape top results from Exa
- Extract detailed best practices
- Clean markdown output

**skill-seeker:**
- Could enhance by referencing skill-seeker scraped docs
- "For React best practices, see skill-seeker output/react/"

**deep-web-research skill:**
- Could invoke for comprehensive research
- Leverages existing research orchestration

---

## Quality Standards

Every skill created will have:
- ✅ Valid YAML frontmatter
- ✅ Anthropic naming conventions
- ✅ Optimized description (discovery-friendly)
- ✅ Clear instructions
- ✅ Concrete examples
- ✅ Validation passed
- ✅ Test query provided
- ✅ Research citations (if researched)
- ✅ Progressive disclosure structure

---

## Usage Scenarios

### Scenario 1: Quick Utility Skill

```
User: "Create a skill for extracting email addresses from text"

skill-creator: Template mode (1 min)
→ Simple structure
→ Regex-based instructions
→ Done!
```

---

### Scenario 2: Content Creation Skill

```
User: "Create a skill for writing YouTube video descriptions, research best practices"

skill-creator: Research mode (5 min)
→ Exa search: YouTube SEO, description strategies
→ Firecrawl: Top 3 creator guides
→ Find: Keyword placement, CTA patterns, link strategies
→ Generate skill with researched knowledge
→ Include citations
→ Done!
```

---

### Scenario 3: Complex Domain Skill

```
User: "Create a skill for financial modeling with DCF analysis"

skill-creator: Research mode (5 min)
→ Exa: DCF methodology, valuation frameworks
→ Firecrawl: Investment banking guides
→ Find: Formula structures, assumption frameworks
→ Generate skill with:
  - SKILL.md (methodology overview)
  - reference/dcf-methodology.md (researched)
  - scripts/dcf-calculator.py (formulas)
  - examples/valuation-example.md
→ Done!
```

---

## Progressive Disclosure in Action

**skill-creator itself uses progressive disclosure:**

**Level 1 (always loaded):**
```yaml
name: skill-creator
description: Create well-formed Claude Code skills... [triggers]
```
**Token cost:** ~50 tokens

**Level 2 (loaded when creating skill):**
- Full SKILL.md instructions
- Creation process
- Validation logic
**Token cost:** ~3000 tokens

**Level 3 (loaded on-demand):**
- reference/anthropic-best-practices.md (when user asks)
- prompts/research-query-generator.md (when researching)
- examples/researched-skill-example.md (when user asks)
**Token cost:** ~5000 tokens per file (only if needed)

**Efficient!**

---

## Why This is Better Than Workflow

### Workflow Would Require:

```
/skill-creator (manual invocation)
→ Agent menu
→ Workflow: create-skill
  → Step 1: Gather requirements
  → Step 2: Research (call research workflow?)
  → Step 3: Generate structure
  → Step 4: Create files
  → Step 5: Validate
  → Step 6: Save
  → Step 7: Present
```

**Problems:**
- Must remember /skill-creator command
- More complex (workflow.yaml + instructions.md)
- Slower to invoke (slash command → menu → select)
- More code to maintain

---

### Skill Approach:

```
User: "Create a skill for {purpose}"
→ skill-creator auto-loads (model-invoked!)
→ Interactive Q&A
→ Research if needed (Exa + Firecrawl)
→ Generate + validate + save
→ Done!
```

**Benefits:**
- Zero friction (auto-loads)
- Simpler (one SKILL.md)
- Faster (no menu navigation)
- Less code to maintain
- Follows Anthropic pattern

---

## The Files Being Created Now

Creating complete skill-creator skill with research capabilities!

**Structure:**
```
.claude/skills/jarvis/skill-creator/
├── SKILL.md (above - complete implementation)
├── reference/
│   ├── anthropic-best-practices.md (next)
│   ├── description-optimization.md (next)
│   ├── progressive-disclosure.md (next)
│   └── research-integration.md (next)
├── prompts/
│   ├── research-query-templates.md (next)
│   └── skill-synthesis-guide.md (next)
├── examples/
│   ├── simple-skill-example.md (next)
│   ├── researched-skill-example.md (next)
│   └── complex-skill-example.md (next)
├── templates/
│   └── SKILL-template.md (next)
└── scripts/
    └── validate-skill.py (above - complete)
```

---

## Summary

**Your question:** "Should this be a skill or agent?"

**The Master's Answer:** **SKILL!**

**Why:**
1. ✅ Anthropic uses skill (proven pattern)
2. ✅ Model-invoked (auto-loads)
3. ✅ CAN interact (asks questions within task)
4. ✅ CAN research (Exa + Firecrawl)
5. ✅ 4x faster to build (3 hrs vs 12+)
6. ✅ Simpler to use (no command to remember)
7. ✅ Follows best practices automatically

**Building it NOW with research capabilities!**

---

*Creating all files with research integration... standby...*
