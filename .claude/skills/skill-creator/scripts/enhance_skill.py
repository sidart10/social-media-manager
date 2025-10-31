#!/usr/bin/env python3
"""
Skill Enhancer - Adds research-based enhancements to existing skills

Uses Exa + Firecrawl to find methodologies and enhance skill with proven patterns.

Usage:
    python enhance_skill.py <skill-path> --research <topic> [--add-examples] [--add-references]

Examples:
    python enhance_skill.py ~/.claude/skills/instagram-captions --research "Instagram engagement strategies"
    python enhance_skill.py ~/.claude/skills/linkedin-posts --research "LinkedIn viral posts" --add-examples
    python enhance_skill.py ~/.claude/skills/youtube-scripts --research "YouTube retention" --add-references

Options:
    --research <topic>      Research this topic and add findings to skill
    --add-examples          Generate example files from research
    --add-references        Create reference docs with methodologies
    --output-dir <path>     Save enhanced skill to new location (default: in-place)
"""

import sys
import json
from pathlib import Path
from datetime import datetime


def research_methodologies(topic, tools_available):
    """
    Research methodologies for the topic

    Args:
        topic: Research topic
        tools_available: Dict of available research tools

    Returns:
        Dict with insights, sources, examples
    """
    print(f"🔍 Researching: {topic}")
    print()

    # This is a placeholder - in actual use, Claude would invoke:
    # - mcp__exa__search for neural search
    # - firecrawl for scraping best practices
    # - mcp__archon__rag_search_knowledge_base for existing knowledge

    print("📚 Research tools to invoke:")
    print("  1. Use mcp__exa__search for neural web search")
    print("  2. Use firecrawl to scrape top methodology sources")
    print("  3. Use mcp__archon__rag_search_knowledge_base")
    print()
    print("⚠️  This script provides structure - Claude should execute actual research")
    print()

    # Return structure for research results
    return {
        "insights": [
            "[Claude should fill: Key insight 1 from research]",
            "[Claude should fill: Key insight 2 from research]",
        ],
        "methodologies": [
            {
                "name": "[Methodology name]",
                "source": "[Source URL]",
                "description": "[How it works]"
            }
        ],
        "examples": [
            "[Example pattern from research]"
        ],
        "sources": [
            {
                "url": "[Source URL]",
                "title": "[Source title]",
                "relevance": "high"
            }
        ],
        "researched_at": datetime.now().isoformat()
    }


def enhance_skill(skill_path, research_topic, add_examples=False, add_references=False, output_dir=None):
    """
    Enhance an existing skill with research findings

    Args:
        skill_path: Path to existing skill directory
        research_topic: Topic to research
        add_examples: Whether to generate example files
        add_references: Whether to create reference documentation
        output_dir: Optional output directory (default: modify in-place)

    Returns:
        Path to enhanced skill, or None if error
    """
    skill_path = Path(skill_path).resolve()

    # Validate skill exists
    if not skill_path.exists() or not skill_path.is_dir():
        print(f"❌ Error: Skill directory not found: {skill_path}")
        return None

    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        print(f"❌ Error: SKILL.md not found in {skill_path}")
        return None

    print(f"🎯 Enhancing skill: {skill_path.name}")
    print(f"   Research topic: {research_topic}")
    print()

    # Research methodologies
    # NOTE: Actual research should be done by Claude invoking MCP tools
    # This script provides the structure
    research_data = research_methodologies(research_topic, {
        'exa': True,
        'firecrawl': True,
        'archon_rag': True
    })

    # Determine output location
    if output_dir:
        output_path = Path(output_dir).resolve() / skill_path.name
        output_path.mkdir(parents=True, exist_ok=True)
        # Copy existing files
        import shutil
        shutil.copytree(skill_path, output_path, dirs_exist_ok=True)
        skill_path = output_path
        print(f"📁 Created enhanced copy at: {output_path}")

    # Add research findings to SKILL.md
    content = skill_md.read_text()

    # Check if skill already has research section
    if "## Research Findings" not in content:
        research_section = f"""

---

## Research Findings

**Research Topic:** {research_topic}
**Date:** {datetime.now().strftime('%Y-%m-%d')}

### Key Insights

{chr(10).join(f'- {insight}' for insight in research_data['insights'])}

### Methodologies Discovered

{chr(10).join(f'''**{m['name']}** (Source: {m['source']})
{m['description']}
''' for m in research_data['methodologies'])}

### Sources

{chr(10).join(f"- [{s['title']}]({s['url']}) - Relevance: {s['relevance']}" for s in research_data['sources'])}

---
"""
        # Add research section before the last section
        content = content.rstrip() + research_section
        skill_md.write_text(content)
        print("✅ Added research findings to SKILL.md")
    else:
        print("⚠️  Skill already has research section - update manually")

    # Add examples if requested
    if add_examples:
        examples_dir = skill_path / "examples"
        examples_dir.mkdir(exist_ok=True)

        example_file = examples_dir / f"researched-example-{datetime.now().strftime('%Y%m%d')}.md"
        example_content = f"""# Example Based on Research

**Generated from research on:** {research_topic}

{chr(10).join(f'## Example: {ex}\n\n[Details here]\n' for ex in research_data['examples'])}

---

Based on research findings added to SKILL.md
"""
        example_file.write_text(example_content)
        print(f"✅ Created {example_file.name}")

    # Add references if requested
    if add_references:
        # Use singular 'reference' (Anthropic convention)
        reference_dir = skill_path / "reference"
        reference_dir.mkdir(exist_ok=True)

        ref_file = reference_dir / "methodology-research.md"
        ref_content = f"""# Methodology Research: {research_topic}

**Research Date:** {datetime.now().strftime('%Y-%m-%d')}

## Discovered Methodologies

{chr(10).join(f'''### {m['name']}

**Source:** {m['source']}

{m['description']}

---
''' for m in research_data['methodologies'])}

## All Sources

{chr(10).join(f"{i+1}. [{s['title']}]({s['url']}) - {s['relevance']} relevance" for i, s in enumerate(research_data['sources']))}
"""
        ref_file.write_text(ref_content)
        print(f"✅ Created {ref_file.name}")

    print()
    print(f"✅ Skill enhancement complete: {skill_path.name}")
    print("\n📊 Summary:")
    print(f"   Research insights: {len(research_data['insights'])}")
    print(f"   Methodologies: {len(research_data['methodologies'])}")
    print(f"   Sources: {len(research_data['sources'])}")
    if add_examples:
        print("   Examples: Added")
    if add_references:
        print("   References: Added")

    return skill_path


def main():
    if len(sys.argv) < 3 or '--research' not in sys.argv:
        print("Usage: python enhance_skill.py <skill-path> --research <topic> [OPTIONS]")
        print("\nOptions:")
        print("  --research <topic>      Research this topic and add findings")
        print("  --add-examples          Generate example files from research")
        print("  --add-references        Create reference docs with methodologies")
        print("  --output-dir <path>     Save to new location (default: in-place)")
        print("\nExamples:")
        print("  python enhance_skill.py ~/.claude/skills/instagram-captions --research 'Instagram engagement'")
        print("  python enhance_skill.py ~/.claude/skills/linkedin-posts --research 'LinkedIn viral' --add-examples")
        print("  python enhance_skill.py ~/.claude/skills/youtube --research 'YouTube retention' --add-references")
        sys.exit(1)

    skill_path = sys.argv[1]

    # Parse research topic
    research_idx = sys.argv.index('--research')
    research_topic = sys.argv[research_idx + 1] if research_idx + 1 < len(sys.argv) else None

    if not research_topic:
        print("❌ Error: --research requires a topic argument")
        sys.exit(1)

    # Parse flags
    add_examples = '--add-examples' in sys.argv
    add_references = '--add-references' in sys.argv

    # Parse output dir
    output_dir = None
    if '--output-dir' in sys.argv:
        output_idx = sys.argv.index('--output-dir')
        output_dir = sys.argv[output_idx + 1] if output_idx + 1 < len(sys.argv) else None

    print("🔬 Skill Enhancement Tool")
    print("=" * 50)
    print()

    result = enhance_skill(skill_path, research_topic, add_examples, add_references, output_dir)

    if result:
        print("\n💡 Next steps:")
        print("  1. Review added research findings in SKILL.md")
        print("  2. Incorporate insights into instructions")
        print("  3. Run quick_validate.py to verify structure")
        print("  4. Run package_skill.py when ready to distribute")
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
