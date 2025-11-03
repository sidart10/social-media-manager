# Create Skill - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/bmb/workflows/create-skill/workflow.yaml</critical>
<critical>You MUST understand Anthropic best practices from: {anthropic_best_practices}</critical>
<critical>Communicate in {communication_language} throughout the workflow</critical>

<workflow>

<step n="0" goal="Understand skill purpose and requirements">
<action>Engage in collaborative discovery to understand what skill they want to create:

Ask open-ended questions to explore:

- What should this skill do? What problem does it solve?
- What tasks should trigger this skill?
- Is this a simple utility or complex domain expertise?
- Do they have existing methodologies in mind, or should we research?

Listen for clues about:

- Domain complexity (file operations vs content creation vs specialized knowledge)
- Whether proven methodologies exist (research-worthy domains)
- User's familiarity with the domain (novice needs more research)
- Scope (focused single task vs multi-capability skill)

Based on responses, assess:

- Simple utility: File operations, data formatting, basic transformations
- Complex domain: Content creation, marketing, creative processes, specialized expertise

Store assessment as {{skill_complexity}} (simple/complex)
</action>
</step>

<step n="1" goal="Decide research approach">
<action>Based on the {{skill_complexity}} assessment, present research options:

If skill is COMPLEX (content creation, marketing, specialized domains):
Explain: "This is a {domain} skill. I can find proven methodologies and best practices before building it."

If skill is SIMPLE (utilities, formatting, basic operations):
Explain: "This is a straightforward skill. Template-based creation will be sufficient."
</action>

<ask>Choose creation mode:

1. **Quick creation** (1-2 min) - Template-based with your input
2. **Research-enhanced** (4-6 min) - Find proven methodologies first using Exa + Firecrawl

Select mode [1/2]:
</ask>

<action>Store {{creation_mode}} as 'quick' or 'research'</action>
</step>

<step n="2" goal="Execute research phase" if="creation_mode == 'research'">
<action>Load research context from {research_context} to understand research best practices</action>

<action>Execute comprehensive research using Exa and Firecrawl:

**Research Strategy:**

1. Generate smart research queries from skill purpose
   - Primary query: "{domain} best practices proven methodologies"
   - Secondary query: "{domain} frameworks strategies techniques"
   - Tertiary query: "{domain} expert insights real-world examples"

2. Execute Exa neural search:
   - Use mcp**exa**search with numResults=10
   - Target: High-quality sources (blogs, documentation, case studies)
   - Focus: Proven methodologies, frameworks, expert insights

3. Scrape top 3-5 sources with Firecrawl:
   - Use mcp**firecrawl**firecrawl_scrape for detailed content
   - Extract: Methodologies, best practices, frameworks, examples
   - Clean and structure findings

4. Synthesize research findings:
   - Identify 2-4 core methodologies/frameworks
   - Extract key best practices (5-10 items)
   - Collect real-world examples (3-5 examples)
   - Note credible sources for citations

Present research summary:

- Methodologies found: {{methodology_1}}, {{methodology_2}}, etc.
- Best practices: {{practice_1}}, {{practice_2}}, etc.
- Sources: {{source_count}} credible sources analyzed
- Examples: {{example_count}} real-world examples collected

Store all findings for incorporation into skill
</action>

<action>Ask user to review research findings and confirm they look good before proceeding</action>
</step>

<step n="3" goal="Generate skill metadata">
<action>Generate skill name following Anthropic conventions:

**Naming Rules (from Anthropic):**

- Lowercase letters, numbers, hyphens only (no underscores, no spaces)
- Max 64 characters
- Use gerund form (verb+ing) for action skills: "analyzing-data", "creating-images", "generating-reports"
- Be specific, not generic: "analyzing-instagram-engagement" not "social-media"
- Descriptive and clear: Name should hint at purpose

Based on skill purpose, generate 2-3 name options:

- Option 1: {{name_option_1}} (recommended)
- Option 2: {{name_option_2}} (alternative)
- Option 3: {{name_option_3}} (alternative)

Show rationale for recommendation
</action>

<ask>Accept recommended name or suggest alternative?

Recommended: {{name_option_1}}

[accept / suggest alternative]: /ask

<action>Store final {{skill_name}} (validated against Anthropic rules)</action>

<action>Now select agent category dynamically:

Load agent manifest from {agent_manifest}
Parse CSV to extract agent names (column: name)

Present numbered list to user:

1. {{agent_1}} (e.g., "jarvis" - content intelligence skills)
2. {{agent_2}} (e.g., "ai-image-generator" - visual creation skills)
3. {{agent_3}} (e.g., "ai-video-agent" - video production skills)
   ... (all agents from manifest)
   N. **standalone** (not tied to specific agent, general-purpose skill)

Explain: Skills are organized by agent category in .claude/skills/{category}/

- Jarvis skills: Content research, writing, voice matching
- AI Image skills: Image generation, design, visual production
- AI Video skills: Video generation, script production
- Standalone: General utilities, cross-agent capabilities
  </action>

<ask>Which agent category should this skill belong to?

Enter number (1-N):
</ask>

<action>Store {{agent_category}} based on selection (agent name or "standalone")</action>

<action>Craft optimized description for Claude discovery:

**Description Requirements (Anthropic):**

- Max 1024 characters
- Must include WHAT the skill does
- Must include WHEN Claude should use it
- Include trigger keywords that match user queries
- Be specific with examples or capabilities

**Template Structure:**
"{what-it-does}. Use when {trigger-scenario-1}, {trigger-scenario-2}, or {trigger-scenario-3}. {key-capabilities-or-methodologies}."

**If researched:**
Include discovered methodologies and frameworks:
"{what-it-does} using {methodology-from-research}. Use when {triggers}. Includes {frameworks-found}, {best-practices-found}, and {pattern-names}."

**Example (researched):**
"Create engaging Instagram captions with hooks, storytelling, and CTAs using proven engagement patterns from viral content analysis. Use when writing Instagram posts, captions, or social media content. Includes hook formulas, optimal caption length (600-1200 chars), hashtag strategies (5-10 tags), and call-to-action frameworks."

Generate description with:

- Clear what (primary capability)
- Specific when triggers (3-5 scenarios)
- Methodologies if researched
- Keyword-rich for discovery
- Under 1024 characters

Present draft description with:

- Character count: {{char_count}}/1024
- Trigger keywords: {{extracted_keywords}}
- Rationale for phrasing choices
  </action>

<ask>Review generated description:

"{{generated_description}}"

Triggers: {{trigger_keywords}}
Length: {{char_count}}/1024 chars

Good to proceed? [yes / edit / regenerate]:
</ask>

<action>Store final {{skill_description}} (user-approved)</action>
</step>

<step n="4" goal="Design file structure">
<action>Based on skill complexity and research results, recommend file structure:

**Simple skills (no research, basic functionality):**

```
{skill_name}/
└── SKILL.md
```

**Medium skills (some research or examples needed):**

```
{skill_name}/
├── SKILL.md
├── prompts/
│   └── generation-template.md
└── examples/
    └── sample-output.md
```

**Complex skills (deep research, multiple methodologies):**

```
{skill_name}/
├── SKILL.md
├── reference/
│   ├── methodology.md (researched frameworks)
│   ├── best-practices.md (synthesized insights)
│   └── sources.md (research citations)
├── prompts/
│   └── templates.md (based on research)
├── examples/
│   └── real-world-examples.md (from research)
└── scripts/ (optional - if code helpers needed)
    └── helper.py
```

Recommend structure based on:

- {{creation_mode}} (quick → simple, research → complex)
- Research findings (if any methodologies found → reference/ needed)
- Domain needs (content creation → prompts/ + examples/)

Present recommendation with rationale
</action>

<ask>Recommended structure: {{recommended_structure}}

Files to create:
{{file_list}}

Proceed with this structure? [yes / customize]:
</ask>

<action>Store {{file_structure}} decision</action>
</step>

<step n="5" goal="Generate SKILL.md">
<action>Create the main SKILL.md file following Anthropic format:

**Structure:**

```markdown
---
name: { { skill_name } }
description: { { skill_description } }
---

# {{Skill Title}} - {{One-line purpose}}

{{Brief introduction explaining what this skill does}}

## When to Use This Skill

Use this skill when:

- {{trigger_scenario_1}}
- {{trigger_scenario_2}}
- {{trigger_scenario_3}}
  {{additional scenarios based on description}}

## Instructions

{{#if creation_mode == 'research'}}
Based on research of {{domain}} best practices from {{source_count}} sources:

### {{Methodology_1_Name}} (from {{source}})

{{Methodology explanation}}

### {{Methodology_2_Name}} (from {{source}})

{{Methodology explanation}}

### Application Process

1. {{Step using methodologies}}
2. {{Step with best practices}}
3. {{Synthesis or output step}}

{{/if}}

{{#if creation_mode == 'quick'}}
When {{task_type}}:

1. {{Step 1 - based on user input}}
2. {{Step 2}}
3. {{Step 3}}
   {{/if}}

{{Additional instructions based on skill purpose}}

## Examples

**Example 1: {{Scenario}}**
{{Example output or walkthrough}}

**Example 2: {{Scenario}}**
{{Example output or walkthrough}}

{{#if file_structure includes 'reference/'}}

## Reference Files

- **[reference/methodology.md](reference/methodology.md)** - Detailed {{framework}} explanations
- **[reference/best-practices.md](reference/best-practices.md)** - Synthesized insights from research
- **[reference/sources.md](reference/sources.md)** - Research citations and credibility notes
  {{/if}}

{{#if file_structure includes 'prompts/'}}

## Prompt Templates

- **[prompts/templates.md](prompts/templates.md)** - Generation templates based on {{methodologies}}
  {{/if}}

## Quality Standards

Every output from this skill should:

- {{Quality criterion 1 based on domain}}
- {{Quality criterion 2}}
- {{Quality criterion 3}}
```

Generate complete SKILL.md content following this structure
Incorporate ALL research findings if research mode
Use clear, actionable language
Include specific examples
</action>

<action>Present generated SKILL.md content to user for review</action>

<ask>Review SKILL.md content. Proceed? [c=continue / e=edit]:
</ask>
</step>

<step n="6" goal="Create supporting files" if="file_structure != 'simple'">
<action>Create supporting files based on {{file_structure}}:</action>

<action if="file_structure includes 'reference/'">
Create reference/methodology.md with detailed frameworks from research:
- Document each discovered methodology
- Include source URLs and credibility notes
- Provide step-by-step application guidance
- Add examples demonstrating each framework
</action>

<action if="file_structure includes 'reference/'">
Create reference/sources.md with research citations:
- List all sources analyzed ({{source_count}} total)
- Include URLs, titles, authors/publications
- Note credibility level (high/medium)
- Highlight key insights from each source
</action>

<action if="file_structure includes 'prompts/'">
Create prompts/templates.md with generation templates:
- Based on researched patterns or user requirements
- Include variables and placeholders
- Provide usage instructions
- Add examples of filled templates
</action>

<action if="file_structure includes 'examples/'">
Create examples/real-world-examples.md:
- Include 3-5 concrete examples
- Use real-world scenarios
- Show input → process → output
- Based on research findings if available
</action>

<action if="file_structure includes 'scripts/'">
Create scripts/helper.py (or .js based on need):
- Add validation logic if needed
- Include utility functions
- Document usage in script comments
- Make executable with proper shebang
</action>

<action>Present summary of all created supporting files</action>
</step>

<step n="7" goal="Validate skill">
<action>Perform comprehensive validation following Anthropic requirements:

**YAML Frontmatter Validation:**

- ✓ Opens with `---` on line 1
- ✓ Closes with `---` before content
- ✓ Contains `name` field
- ✓ Contains `description` field

**Name Validation:**

- ✓ Lowercase letters, numbers, hyphens only (no underscores, no uppercase)
- ✓ Length <= 64 characters
- ✓ Follows gerund convention for action skills (verb+ing)
- ✓ Specific and descriptive (not generic)
- ✓ Matches regex: ^[a-z0-9-]+$

**Description Validation:**

- ✓ Length <= 1024 characters
- ✓ Includes "use when" or "when" clause
- ✓ Contains trigger keywords
- ✓ Specific (not vague like "helps with" or "for files")
- ✓ Includes what + when + examples/capabilities

**File Structure Validation:**

- ✓ SKILL.md exists and properly formatted
- ✓ All referenced files exist (check markdown links)
- ✓ Relative paths use forward slashes (Unix-style)
- ✓ No broken links to reference/, prompts/, examples/, scripts/

**Content Quality Validation:**

- ✓ "When to Use This Skill" section present
- ✓ "Instructions" section clear and actionable
- ✓ "Examples" section with concrete scenarios
- ✓ Progressive disclosure structure (reference files for depth)

Run all checks and compile validation report
</action>

<action>Present validation results:

```
Skill Validation Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ YAML Frontmatter: Valid
✅ Name Convention: {{skill_name}} ({{name_length}}/64 chars)
✅ Description: {{desc_length}}/1024 chars, includes triggers
✅ File Structure: {{file_count}} files, all references valid
✅ Content Quality: All required sections present
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{#if warnings}}
⚠️  Warnings:
{{warning_list}}
{{/if}}

{{#if errors}}
❌ Errors (must fix):
{{error_list}}
{{/if}}

{{#if no_errors}}
Ready to save!
{{/if}}
```

</action>

<check if="errors exist">
  <ask>Validation found errors. Fix now? [yes / skip validation]:
  </ask>
  <action if="user says yes">Fix errors and re-validate</action>
  <goto step="7" if="user says yes">Re-run validation</goto>
</check>
</step>

<step n="8" goal="Save and register skill">
<action>Prepare to save skill files to project structure:

**Target location:** {skill_output_base}/{{agent_category}}/{{skill_name}}/

Explain: "Saving skill to .claude/skills/{{agent_category}}/{{skill_name}}/"
</action>

<action>Create skill directory structure:

- Create main directory: .claude/skills/{{agent_category}}/{{skill_name}}/
- Create subdirectories based on {{file_structure}}
  </action>

<action>Write all skill files:

- SKILL.md (main file with YAML frontmatter + content)
- reference/ files (if research mode)
- prompts/ files (if applicable)
- examples/ files (always include)
- scripts/ files (if needed)
  </action>

<action>Now update project manifests following the same pattern as workflows and agents:

**1. Create or update skill-manifest.csv:**

File: {skill_manifest}

CSV Format:

```
name,description,agent_category,path,research_enhanced
```

Add new row:

```
"{{skill_name}}","{{skill_description}}","{{agent_category}}",".claude/skills/{{agent_category}}/{{skill_name}}/SKILL.md","{{creation_mode == 'research'}}"
```

**If skill-manifest.csv doesn't exist:**

- Create it with header row first
- Then add skill entry

**If it exists:**

- Append new row (ensure no duplicates)
- Maintain CSV formatting
  </action>

<action>Update files-manifest.csv to track all created files:

File: {files_manifest}

For each file created, add row:

```
"md","{{file_name_without_extension}}","{{agent_category}}",".claude/skills/{{agent_category}}/{{skill_name}}/{{file_path}}","{{file_hash}}"
```

Files to register:

- SKILL.md (type: md)
- All reference/ files (type: md)
- All prompts/ files (type: md)
- All examples/ files (type: md)
- All scripts/ files (type: py or js)

Generate SHA-256 hash for each file using standard hashing
</action>

<action>Present save summary:

```
Skill Registration Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Skill saved to: .claude/skills/{{agent_category}}/{{skill_name}}/

Files created ({{file_count}} total):
{{file_list_with_sizes}}

Manifests updated:
✅ skill-manifest.csv - New skill registered
✅ files-manifest.csv - {{file_count}} files tracked with hashes

Agent category: {{agent_category}}
Research mode: {{creation_mode == 'research' ? 'Yes' : 'No'}}
```

</action>
</step>

<step n="9" goal="Provide test query and completion summary">
<action>Generate test query that should trigger the skill:

Based on {{skill_description}} trigger keywords, create a query that:

- Matches the "use when" scenarios
- Includes trigger keywords
- Represents realistic user request

Example generation:

- Skill about Instagram captions → "Write an Instagram caption for a photo of sunset at the beach"
- Skill about data analysis → "Analyze this CSV file and find trends"
- Skill about commit messages → "Generate commit message from these code changes"

Present test query with explanation of why it should trigger
</action>

<action>Present completion summary to {user_name} in {communication_language}:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Skill Creation Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Skill:** {{skill_name}}
**Category:** {{agent_category}}
**Location:** .claude/skills/{{agent_category}}/{{skill_name}}/

**Structure:**
{{file_tree}}

{{#if creation_mode == 'research'}}
**Research Summary:**
- Sources analyzed: {{source_count}}
- Methodologies incorporated: {{methodology_count}}
- Examples included: {{example_count}}
- Citations documented: Yes (see reference/sources.md)
{{/if}}

**Validation:** All checks passed ✅

**Manifests Updated:**
- ✅ skill-manifest.csv (skill registered)
- ✅ files-manifest.csv ({{file_count}} files tracked)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Restart Claude Code** to load the new skill
   - Skills are loaded at session start
   - New skills won't appear until restart

2. **Test automatic discovery** with this query:
   "{{test_query}}"

3. **Verify skill activates:**
   - Claude should say: "Using {{skill_name}} skill..."
   - Output should follow skill methodologies
   - If Claude doesn't mention skill, description may need tuning

4. **Refine if needed:**
   - If skill doesn't activate, adjust description triggers
   - Add more "use when" keywords
   - Make description more specific

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Skill is ready to use! 🎉
```

</action>
</step>

</workflow>
