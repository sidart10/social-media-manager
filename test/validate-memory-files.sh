#!/bin/bash
# Powered by BMAD™ Core
# Validate agent memory files exist and have proper structure

EXIT_CODE=0

echo "=== AGENT MEMORY FILE VALIDATION ==="

# Check all agent sidecars have memories.md
echo -e "\n1. Checking memory files exist:"
for sidecar in bmad/agents/content-intelligence/jarvis-sidecar bmad/agents/zoe/zoe-sidecar bmad/agents/zoro/zoro-sidecar; do
  AGENT=$(basename $(dirname $sidecar))
  if [ -f "$sidecar/memories.md" ]; then
    echo "✅ $AGENT has memories.md"
  else
    echo "❌ $AGENT missing memories.md"
    EXIT_CODE=1
  fi
done

# Validate memories are valid markdown
echo -e "\n2. Checking markdown structure:"
for mem in bmad/agents/*//*-sidecar/memories.md; do
  if [ -f "$mem" ]; then
    AGENT=$(basename $(dirname $(dirname $mem)))
    if head -1 "$mem" | grep -q "^#"; then
      echo "✅ $AGENT memories.md has markdown headers"
    else
      echo "⚠️  $AGENT memories.md check format"
    fi
  fi
done

# Check for API cost tracking sections
echo -e "\n3. Checking for cost tracking sections:"
for mem in bmad/agents/*//*-sidecar/memories.md; do
  if [ -f "$mem" ]; then
    AGENT=$(basename $(dirname $(dirname $mem)))
    if grep -q "cost\|Cost\|API" "$mem"; then
      echo "✅ $AGENT has cost tracking"
    else
      echo "⚠️  $AGENT may need cost tracking section"
    fi
  fi
done

echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ ALL MEMORY FILES VALID"
else
  echo "❌ MEMORY FILE ISSUES FOUND"
fi

exit $EXIT_CODE
