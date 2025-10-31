#!/usr/bin/env python3
"""
Skill Packager - Creates a distributable zip file of a skill folder

Usage:
    python package_skill.py <path/to/skill-folder> [output-directory]

Example:
    python package_skill.py ~/.claude/skills/my-skill
    python package_skill.py ~/.claude/skills/my-skill ./dist
"""

import sys
import zipfile
from pathlib import Path

# Import validation from quick_validate
try:
    from quick_validate import validate_skill
except ImportError:
    # Fallback if quick_validate not in path
    import os
    script_dir = Path(__file__).parent
    sys.path.insert(0, str(script_dir))
    from quick_validate import validate_skill


def package_skill(skill_path, output_dir=None):
    """
    Package a skill folder into a zip file.

    Args:
        skill_path: Path to the skill folder
        output_dir: Optional output directory for the zip file (defaults to current directory)

    Returns:
        Path to the created zip file, or None if error
    """
    skill_path = Path(skill_path).resolve()

    # Validate skill folder exists
    if not skill_path.exists():
        print(f"❌ Error: Skill folder not found: {skill_path}")
        return None

    if not skill_path.is_dir():
        print(f"❌ Error: Path is not a directory: {skill_path}")
        return None

    # Validate SKILL.md exists
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        print(f"❌ Error: SKILL.md not found in {skill_path}")
        return None

    # Run full validation before packaging (uses quick_validate.py)
    print("🔍 Validating skill...")
    valid, message = validate_skill(skill_path)
    if not valid:
        print(f"❌ Validation failed: {message}")
        print("   Please fix the validation errors before packaging.")
        return None
    print(f"✅ {message}\n")

    # Additional packaging-specific checks
    content = skill_md.read_text()
    if '[TODO' in content:
        print("⚠️  Warning: SKILL.md contains TODO items")
        print("   Consider completing them before distribution")
        print("   (Use --force flag to skip this check)")
        # Check if --force flag in sys.argv for non-interactive mode
        if '--force' not in sys.argv:
            try:
                response = input("   Continue anyway? [y/N]: ")
                if response.lower() != 'y':
                    print("❌ Packaging cancelled")
                    return None
            except (EOFError, KeyboardInterrupt):
                # Non-interactive mode without --force flag
                print("\n❌ Packaging cancelled (TODO items found, use --force to override)")
                return None

    # Determine output location
    skill_name = skill_path.name
    if output_dir:
        output_path = Path(output_dir).resolve()
        output_path.mkdir(parents=True, exist_ok=True)
    else:
        output_path = Path.cwd()

    zip_filename = output_path / f"{skill_name}.zip"

    # Create the zip file
    try:
        print(f"📦 Packaging skill to: {zip_filename}\n")
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Walk through the skill directory
            for file_path in skill_path.rglob('*'):
                if file_path.is_file():
                    # Calculate the relative path within the zip
                    arcname = file_path.relative_to(skill_path.parent)
                    zipf.write(file_path, arcname)
                    print(f"   Added: {arcname}")

        print(f"\n✅ Successfully packaged skill to: {zip_filename}")
        return zip_filename

    except Exception as e:
        print(f"❌ Error creating zip file: {e}")
        return None


def main():
    if len(sys.argv) < 2:
        print("Usage: python package_skill.py <path/to/skill-folder> [output-directory] [--force]")
        print("\nOptions:")
        print("  --force  Skip TODO warnings and package anyway")
        print("\nExample:")
        print("  python package_skill.py ~/.claude/skills/my-skill")
        print("  python package_skill.py ~/.claude/skills/my-skill ./dist")
        print("  python package_skill.py ~/.claude/skills/my-skill ./dist --force")
        sys.exit(1)

    skill_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"📦 Packaging skill: {skill_path}")
    if output_dir:
        print(f"   Output directory: {output_dir}")
    print()

    result = package_skill(skill_path, output_dir)

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
