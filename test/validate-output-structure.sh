#!/bin/bash
# Powered by BMAD™ Core
# Validate output folder structure compliance

EXIT_CODE=0

echo "=== OUTPUT STRUCTURE VALIDATION ==="

# Check for legacy date folders
echo -e "\n1. Checking for legacy folders:"
LEGACY=$(ls outputs/ 2>/dev/null | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$" | wc -l)
if [ "$LEGACY" -eq 0 ]; then
  echo "✅ No legacy date folders (clean structure)"
else
  echo "⚠️  Found $LEGACY legacy folders (consider archiving)"
  ls outputs/ | grep -E "^[0-9]{2}-[0-9]{2}-[0-9]{4}$" | head -5
fi

# Verify new project structure
echo -e "\n2. Checking project structure:"
if [ -d "outputs/projects" ]; then
  echo "✅ outputs/projects/ exists"

  # Count projects with correct naming
  CORRECT=$(ls outputs/projects/ 2>/dev/null | grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}-" | wc -l)
  echo "ℹ️  Projects with correct naming: $CORRECT"

  # Check 6-stage structure in projects
  for proj in outputs/projects/*/; do
    if [ -d "$proj" ]; then
      STAGES=$(ls -d "$proj"*/ 2>/dev/null | wc -l)
      PROJ_NAME=$(basename "$proj")
      if [ "$STAGES" -ge 6 ]; then
        echo "✅ $PROJ_NAME has proper 6-stage structure"
      else
        echo "⚠️  $PROJ_NAME only has $STAGES stages (need 6)"
      fi
    fi
  done | head -5
else
  echo "❌ outputs/projects/ missing"
  EXIT_CODE=1
fi

# Check templates exist
echo -e "\n3. Checking templates:"
if [ -d "outputs/templates/project-structure" ]; then
  echo "✅ Project structure template exists"
else
  echo "⚠️  Template missing (outputs/templates/project-structure/)"
fi

echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ OUTPUT STRUCTURE VALID"
  if [ "$LEGACY" -gt 0 ]; then
    echo "⚠️  Consider archiving $LEGACY legacy folders"
  fi
else
  echo "❌ OUTPUT STRUCTURE ISSUES FOUND"
fi

exit $EXIT_CODE
