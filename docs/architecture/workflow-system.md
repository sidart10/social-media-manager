# Workflow System

## Workflow Definition Model

Workflows are **multi-step process orchestrators** that manage user interaction, state persistence, file I/O, Notion updates, and skill invocation via context creation.

**Workflow Components:**

```
bmad/agents/{agent}/workflows/{workflow-name}/
├── workflow.yaml         # Metadata, elicitation config, step references
├── instructions.md       # External XML process definition (NOT embedded in YAML)
├── template.md           # Optional output template
└── README.md             # Documentation
```

**Workflow YAML Schema:**

```yaml
name: workflow-name
description: One-line workflow purpose
version: "1.0"
owner: agent-name
elicit: true|false        # Enable elicitation-based refinement?

# Metadata for discovery
triggers:                 # What contexts/commands trigger this workflow
  - "research {topic}"
  - "analyze profile"

skills_triggered:         # Which skills this workflow invokes (via context creation)
  - deep-web-research     # Step 1 context: "Research {topic} with depth={depth}"
  - research-synthesizer  # Step 3 context: "Synthesize findings into categories"

# Steps reference external instructions.md
steps_file: instructions.md

# Optional template for output generation
template_file: template.md
```

**Instructions.md Format (External XML):**

```xml
<workflow name="research-topic">
  <step id="1" name="Gather Requirements">
    <goal>Collect research parameters from user</goal>
    <instructions>
      Prompt user for:
      - topic: What to research
      - depth: quick/standard/comprehensive/exhaustive
      - focus_areas: Optional specific angles
    </instructions>
    <outputs>
      - topic
      - depth
      - focus_areas
    </outputs>
  </step>

  <step id="2" name="Execute Research">
    <goal>Perform intelligent tool-routed research</goal>
    <instructions>
      Create context for skill discovery:
      "Research {topic} with depth={depth}, focus on {focus_areas}"

      Expected skill: deep-web-research (autonomously discovered by Claude)
      Skill will route: quick→WebSearch, standard→Exa, comprehensive→Exa+Firecrawl, exhaustive→user approval
    </instructions>
    <outputs>
      - research_results (sources with quality scores)
    </outputs>
  </step>

  <step id="3" name="Synthesize Findings">
    <goal>Organize research into 5 categories</goal>
    <instructions>
      Create context: "Synthesize research findings into categories: Trends, Data, Quotes, Examples, Gaps"

      Expected skill: research-synthesizer
      Generates structured categories with source citations
    </instructions>
    <outputs>
      - synthesis (5 categories with findings)
    </outputs>
  </step>

  <step id="4" name="Generate Content Angles">
    <goal>Create 10-12 evidence-backed content ideas</goal>
    <instructions>
      Based on synthesis, generate specific angles:
      - Hook (question/number/story/reveal)
      - Core argument
      - Evidence backing (from research)
      - Platform recommendation
    </instructions>
    <outputs>
      - angles (10-12 content ideas)
    </outputs>
  </step>

  <step id="5" name="Save Research Brief">
    <goal>Persist results to outputs/</goal>
    <instructions>
      Save to: outputs/projects/{YYYY-MM-DD}-{project-slug}/01-research/research-brief.md

      Include:
      - Topic, depth, tools called, cost breakdown
      - 5 finding categories with sources
      - 10-12 angles
      - All citations
    </instructions>
    <outputs>
      - research_brief_path
    </outputs>
  </step>

  <step id="6" name="Update Notion">
    <goal>Update Content Tracker status</goal>
    <instructions>
      - Find content page by topic (or create if doesn't exist)
      - Update Status: Idea → Research
      - Link research brief URL to Notes relation
      - Set Category and Priority based on synthesis
    </instructions>
    <outputs>
      - notion_page_url
    </outputs>
  </step>
</workflow>
```

## Workflow Standardization Requirements

**MVP Requirement:** ALL workflows must follow external instructions.md pattern (no embedded YAML or JavaScript code blocks).

**Current State:**
- ✅ Jarvis workflows: Already standardized (external instructions.md)
- ⚠️ Zoe workflows: Need migration from embedded YAML to external
- ⚠️ Zoro workflows: Need migration from embedded YAML to external

**Migration Pattern:**

```yaml
# ❌ BEFORE (Anti-pattern - embedded YAML)
steps:
  - name: Step 1
    goal: Do something
    instructions: |
      Multi-line instructions here
      With logic embedded in YAML
    outputs:
      - result1

# ✅ AFTER (Standard pattern - external instructions.md)
steps_file: instructions.md
```

## Elicitation-Based Refinement

**For workflows with `elicit: true`:**

Workflows support multi-turn refinement using numbered elicitation methods:

**Elicitation Menu (presented after draft generation):**

```
Drafted Content:
[Generated content with detailed rationale]

Select 1-9 or just type your question/feedback:

1. Proceed to next step (accept draft)
2. Expand or Contract for Audience
3. Explain Reasoning (CoT Step-by-Step)
4. Critique and Refine
5. Analyze Logical Flow and Dependencies
6. Assess Alignment with Overall Goals
7. Identify Potential Risks and Unforeseen Issues
8. Challenge from Critical Perspective
9. Agile Team Perspective Shift
```

**Elicitation Workflow:**
1. Workflow generates draft content
2. Presents content + rationale + menu (1-9 options)
3. User selects method or provides custom feedback
4. Selected method executes, generates insights
5. User decides: apply changes or return to menu
6. Loop until user selects "Proceed" (option 1)

**Never:** Yes/no questions—always structured numbered options.

---
