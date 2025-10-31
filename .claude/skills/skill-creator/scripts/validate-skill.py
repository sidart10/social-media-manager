#!/usr/bin/env python3
"""
Validate SKILL.md follows Anthropic best practices
Usage: python validate-skill.py path/to/skill
"""

import sys
import re
from pathlib import Path


def validate_skill(skill_path):
    """
    Comprehensive skill validation against Anthropic standards
    Returns validation report with errors and warnings
    """

    skill_dir = Path(skill_path)
    skill_md = skill_dir / "SKILL.md"

    errors = []
    warnings = []
    info = []

    # Check SKILL.md exists
    if not skill_md.exists():
        return format_error("SKILL.md not found in " + str(skill_path))

    # Read content
    try:
        content = skill_md.read_text(encoding='utf-8')
    except Exception as e:
        return format_error(f"Could not read SKILL.md: {e}")

    # Validate YAML frontmatter structure
    if not content.startswith('---\n'):
        errors.append("Missing opening '---' on line 1")
        return format_results(errors, warnings, info)

    parts = content.split('---\n')
    if len(parts) < 3:
        errors.append("Missing closing '---' - should appear before content")
        return format_results(errors, warnings, info)

    # Parse YAML (simple parser)
    yaml_section = parts[1]
    metadata = {}

    for line in yaml_section.split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if ':' in line:
            key, value = line.split(':', 1)
            metadata[key.strip()] = value.strip().strip('"').strip("'")

    # Validate name field
    if 'name' not in metadata:
        errors.append("Missing required field: 'name'")
    else:
        name = metadata['name']

        # Name format validation
        if not re.match(r'^[a-z0-9-]+$', name):
            errors.append(f"Name '{name}' must contain only lowercase letters, numbers, and hyphens")

        if len(name) > 64:
            errors.append(f"Name too long: {len(name)} characters (max 64)")

        if len(name) < 3:
            warnings.append(f"Name very short: {len(name)} characters")

        # Check for common mistakes
        if '_' in name:
            errors.append(f"Name contains underscore - use hyphens instead")

        if any(c.isupper() for c in name):
            errors.append(f"Name contains uppercase - must be all lowercase")

        if ' ' in name:
            errors.append(f"Name contains spaces - use hyphens")

        # Gerund form check (for action skills)
        if not any(word in name for word in ['analyzing', 'creating', 'generating', 'formatting', 'extracting', 'optimizing', 'validating', 'processing', 'building', 'designing']):
            warnings.append("Consider gerund form (verb+ing) for action skills: analyzing, creating, generating, etc.")

        info.append(f"✓ Name: {name} ({len(name)}/64 chars)")

    # Validate description field
    if 'description' not in metadata:
        errors.append("Missing required field: 'description'")
    else:
        desc = metadata['description']

        # Length validation
        if len(desc) > 1024:
            errors.append(f"Description too long: {len(desc)} characters (max 1024)")

        if len(desc) < 50:
            warnings.append(f"Description short: {len(desc)} characters - consider adding more trigger keywords for better discovery")

        # Content validation
        desc_lower = desc.lower()

        if 'use when' not in desc_lower and 'when' not in desc_lower:
            warnings.append("Description should include 'Use when' to help discovery")

        if desc_lower.startswith('for ') or desc_lower.startswith('helps with '):
            warnings.append("Description starts vaguely - be more specific about what it does")

        if desc == 'Brief description of what this Skill does and when to use it':
            errors.append("Description is template placeholder - must be customized")

        # Trigger keyword check
        trigger_count = len(re.findall(r'\w+', desc))
        if trigger_count < 10:
            warnings.append(f"Description has few words ({trigger_count}) - add more triggers for better discovery")

        info.append(f"✓ Description: {len(desc)}/1024 chars, ~{trigger_count} words")

    # Validate allowed-tools (if present)
    if 'allowed-tools' in metadata:
        tools = metadata['allowed-tools']
        info.append(f"✓ Tool restrictions: {tools}")

    # Validate content body
    body = '\n'.join(parts[2:])

    # Check for recommended sections
    if '## When to Use' not in body and '## When to use' not in body:
        warnings.append("Missing recommended section: '## When to Use This Skill'")

    if '## Instructions' not in body:
        warnings.append("Missing recommended section: '## Instructions'")

    if '## Example' not in body:
        warnings.append("Consider adding '## Examples' section")

    # Check file references are valid
    referenced_files = re.findall(r'\[.*?\]\((.*?\.md)\)', body)
    missing_refs = []

    for ref in referenced_files:
        ref_path = skill_dir / ref
        if not ref_path.exists():
            missing_refs.append(ref)

    if missing_refs:
        warnings.append(f"Referenced files missing: {', '.join(missing_refs)}")
    elif referenced_files:
        info.append(f"✓ File references: {len(referenced_files)} files (all exist)")

    # Check for scripts
    scripts_dir = skill_dir / "scripts"
    if scripts_dir.exists():
        script_files = list(scripts_dir.glob("*.py"))
        if script_files:
            info.append(f"✓ Scripts found: {len(script_files)} Python files")

            # Check execute permissions
            for script in script_files:
                if not script.stat().st_mode & 0o111:
                    warnings.append(f"Script not executable: {script.name} - run 'chmod +x {script}'")

    return format_results(errors, warnings, info)


def format_results(errors, warnings, info):
    """Format validation output with colors and structure"""

    lines = []

    # Header
    lines.append("=" * 60)
    lines.append("SKILL VALIDATION REPORT")
    lines.append("=" * 60)

    # Errors (blocking issues)
    if errors:
        lines.append("\n❌ ERRORS (must fix before use):")
        lines.append("-" * 60)
        for e in errors:
            lines.append(f"  ✗ {e}")
        lines.append("")

    # Warnings (should fix)
    if warnings:
        lines.append("\n⚠️  WARNINGS (recommended fixes):")
        lines.append("-" * 60)
        for w in warnings:
            lines.append(f"  ⚡ {w}")
        lines.append("")

    # Info (good stuff)
    if info:
        lines.append("\n✅ VALIDATED:")
        lines.append("-" * 60)
        for i in info:
            lines.append(f"  {i}")
        lines.append("")

    # Summary
    lines.append("=" * 60)
    if not errors and not warnings:
        lines.append("✅ VALIDATION PASSED - Skill ready to use!")
    elif not errors:
        lines.append(f"⚠️  VALIDATION PASSED WITH {len(warnings)} WARNINGS")
        lines.append("Skill will work, but consider fixing warnings for better quality")
    else:
        lines.append(f"❌ VALIDATION FAILED - {len(errors)} error(s) must be fixed")

    lines.append("=" * 60)

    return '\n'.join(lines)


def format_error(msg):
    """Format critical error"""
    return f"""
{"=" * 60}
❌ CRITICAL ERROR
{"=" * 60}
{msg}
{"=" * 60}
"""


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("""
Usage: python validate-skill.py path/to/skill

Example:
  python validate-skill.py ~/.claude/skills/my-skill
  python validate-skill.py .claude/skills/jarvis/my-skill

This validates:
- YAML frontmatter structure
- name field (lowercase, hyphens, max 64 chars)
- description field (max 1024 chars, quality)
- File references
- Recommended sections
- Script permissions
""")
        sys.exit(1)

    skill_path = sys.argv[1]
    result = validate_skill(skill_path)
    print(result)

    # Exit code: 0 if no errors, 1 if errors exist
    sys.exit(1 if "❌ ERRORS" in result else 0)
