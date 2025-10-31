# SKILL.md Template

**Use this template for skill creation**

---

## Basic Template (Simple Skills)

```yaml
---
name: your-skill-name
description: Brief description of what this does and when to use it. Use when {trigger-context}, {trigger-context}, or {trigger-context}.
---

# Your Skill Name

## When to Use This Skill

Use this skill when:
- {specific trigger scenario 1}
- {specific trigger scenario 2}
- {specific trigger scenario 3}

## Instructions

When {task-type}:

1. {step 1 - be specific}
2. {step 2 - be specific}
3. {step 3 - be specific}

{Additional guidance as needed}

## Examples

**Example 1: {scenario-name}**

Input: `{example-input}`

Output:
```
{example-output}
```

**Example 2: {scenario-name}**

{another example}

## Notes

{Any important notes, limitations, or context}
```

---

## Medium Template (With Prompts/Examples)

```yaml
---
name: your-skill-name
description: {what-it-does}. Use when {triggers}. Includes {key-capabilities}.
---

# Your Skill Name

## When to Use This Skill

Use when:
- {trigger 1}
- {trigger 2}
- {trigger 3}

## Methodologies

### {Method 1 Name}

{explanation}

**Use when:** {specific scenario}

### {Method 2 Name}

{explanation}

**Use when:** {specific scenario}

## Instructions

Choose appropriate method based on context:

**For {scenario-type-1}, use {method-1}:**
1. {step 1}
2. {step 2}
3. {step 3}

**For {scenario-type-2}, use {method-2}:**
1. {step 1}
2. {step 2}
3. {step 3}

## Reference Files

- **[prompts/template-1.md](prompts/template-1.md)** - {Method 1} generation template
- **[prompts/template-2.md](prompts/template-2.md)** - {Method 2} generation template
- **[examples/samples.md](examples/samples.md)** - Real-world examples

## Best Practices

{Key guidelines}

## Common Mistakes

{What to avoid}
```

---

## Research-Enhanced Template (Complex Skills)

```yaml
---
name: your-skill-name
description: {what-it-does} using {researched-methodology}. Use when {triggers}. Incorporates {frameworks-or-data} from {credible-source}.
---

# Your Skill Name

Generate {outputs} using research-backed methodologies and proven patterns.

## When to Use This Skill

Use when:
- {specific trigger 1}
- {specific trigger 2}
- {specific trigger 3}

## Research-Backed Methodologies

### {Framework 1} (Source: {url})

**Researched from:** {source-name}, {publication}

{framework-explanation}

**Application:**
1. {step 1}
2. {step 2}
3. {step 3}

**Use when:** {specific-scenario}

---

### {Framework 2} (Source: {url})

**Researched from:** {source-name}

{framework-explanation}

**Application:**
{steps}

**Use when:** {specific-scenario}

## Best Practices (Data-Backed)

**From {research-source}:**
- {practice 1} ({stat}% improvement)
- {practice 2} (benchmark: {number})
- {practice 3} ({data-point})

**Key parameters:**
- Optimal length: {range} (Source: {url})
- Format: {specification}
- Timing: {recommendation}

## Instructions

When {task-type}:

1. **Choose framework:**
   - {Framework 1}: Best for {scenario}
   - {Framework 2}: Best for {scenario}

2. **Apply selected framework:**
   - Follow framework steps
   - Incorporate best practices
   - Use optimal parameters

3. **Validate output:**
   - Check length ({optimal-range})
   - Verify {quality-criteria}
   - Ensure {requirement}

## Reference Files

**Methodologies:**
- **[reference/methodology.md](reference/methodology.md)** - Detailed framework explanations
- **[reference/best-practices.md](reference/best-practices.md)** - Comprehensive guidelines
- **[reference/sources.md](reference/sources.md)** - Research citations and credibility

**Templates:**
- **[prompts/framework-1-template.md](prompts/framework-1-template.md)** - {Framework 1} generation
- **[prompts/framework-2-template.md](prompts/framework-2-template.md)** - {Framework 2} generation

**Examples:**
- **[examples/real-world-samples.md](examples/real-world-samples.md)** - Analyzed examples

## Examples

**Example 1: {scenario} (Using {Framework 1})**

{example following framework with annotations}

**Example 2: {scenario} (Using {Framework 2})**

{example}

## Quality Checklist

- [ ] Framework selected appropriately
- [ ] Benefits emphasized over features
- [ ] Optimal length ({range})
- [ ] Best practices applied
- [ ] Quality criteria met

## Integration

**Works with:**
- `{related-skill-1}` - {how-they-work-together}
- `{related-skill-2}` - {how-they-work-together}

---

*All methodologies and best practices based on research from {source-count} authoritative sources. See reference/sources.md for complete citations.*
```

---

## Template Selection Guide

**Use Basic Template when:**
- Simple utility skill
- No research needed
- Generic task
- User provides all knowledge

**Use Medium Template when:**
- Multiple methods/approaches
- Need examples for each
- Moderate complexity
- Some existing knowledge

**Use Research-Enhanced Template when:**
- Complex domain
- Research conducted
- Multiple sources synthesized
- Proven methodologies found
- Data-backed recommendations
- Need progressive disclosure

---

## Placeholder Reference

**In templates, use these placeholders:**

- `{your-skill-name}` - The generated skill name
- `{what-it-does}` - Core functionality
- `{triggers}` - Trigger keywords
- `{methodology}` - Framework/method name
- `{source}` - Research source
- `{url}` - Source URL
- `{scenario}` - Use case scenario
- `{step-N}` - Instruction steps
- `{example-input}` - Sample input
- `{example-output}` - Sample output

**skill-creator replaces all placeholders during generation!**

---

## Version History

- v1.0.0 (2025-10-28): Initial templates with research-enhanced support
