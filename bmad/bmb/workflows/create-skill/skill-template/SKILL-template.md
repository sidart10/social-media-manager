---
name: { { skill_name } }
description: { { skill_description } }
---

# {{Skill Title}} - {{One-line Purpose}}

{{Brief introduction explaining what this skill does and its primary value}}

## When to Use This Skill

This skill auto-loads when:

- {{trigger_scenario_1}}
- {{trigger_scenario_2}}
- {{trigger_scenario_3}}
  {{additional_trigger_scenarios}}

## Instructions

{{#if creation_mode == 'research'}}
Based on research of {{domain}} best practices from {{source_count}} credible sources:

### {{Methodology_1_Name}} (from {{source_1}})

{{Methodology_1_explanation}}

**Application:**

1. {{Step_1}}
2. {{Step_2}}
3. {{Step_3}}

### {{Methodology_2_Name}} (from {{source_2}})

{{Methodology_2_explanation}}

**Application:**

1. {{Step_1}}
2. {{Step_2}}
3. {{Step_3}}

### Synthesis and Best Practices

{{Synthesized_insights_combining_methodologies}}

**Recommended Process:**

1. {{Combined_step_1}}
2. {{Combined_step_2}}
3. {{Combined_step_3}}
4. {{Output_generation_step}}

{{/if}}

{{#if creation_mode == 'quick'}}
When {{task_type}}:

1. {{Step_1_description}}
2. {{Step_2_description}}
3. {{Step_3_description}}
4. {{Output_step}}

**Best Practices:**

- {{Best_practice_1}}
- {{Best_practice_2}}
- {{Best_practice_3}}

{{/if}}

## Examples

### Example 1: {{Scenario_1_name}}

**Input:** {{Example_input_1}}

**Process:**
{{Step_by_step_walkthrough}}

**Output:**
{{Example_output_1}}

---

### Example 2: {{Scenario_2_name}}

**Input:** {{Example_input_2}}

**Process:**
{{Step_by_step_walkthrough}}

**Output:**
{{Example_output_2}}

{{#if file_structure includes 'reference/'}}

## Reference Files

- **[reference/methodology.md](reference/methodology.md)** - Detailed framework explanations and research findings
- **[reference/best-practices.md](reference/best-practices.md)** - Synthesized insights from {{source_count}} sources
- **[reference/sources.md](reference/sources.md)** - Complete research citations with URLs and credibility notes

{{/if}}

{{#if file_structure includes 'prompts/'}}

## Prompt Templates

- **[prompts/templates.md](prompts/templates.md)** - Generation templates based on researched patterns

{{/if}}

{{#if file_structure includes 'scripts/'}}

## Helper Scripts

- **[scripts/helper.py](scripts/helper.py)** - Validation and utility functions

{{/if}}

## Quality Standards

Every output from this skill should meet these criteria:

- {{Quality_criterion_1}}
- {{Quality_criterion_2}}
- {{Quality_criterion_3}}
- {{Additional_quality_criteria_based_on_domain}}

## Progressive Disclosure

This skill follows progressive disclosure:

- **Level 1:** Core instructions in this SKILL.md (always loaded when skill activates)
- **Level 2:** Detailed methodologies in reference/ files (loaded on-demand)
- **Level 3:** Templates and examples (loaded when referenced)

Claude loads supporting files only when needed for efficient context usage.
