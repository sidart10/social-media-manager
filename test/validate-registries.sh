#!/bin/bash
# Powered by BMAD™ Core
# Validate registry accuracy

EXIT_CODE=0

echo "=== REGISTRY VALIDATION ==="

# Test 1: Agent Manifest
echo -e "\n1. Agent Manifest:"
DUPES=$(sort bmad/_cfg/agent-manifest.csv | uniq -d | wc -l | xargs)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
  EXIT_CODE=1
fi

# Verify all agent paths exist (simple extraction - last quoted field)
AGENT_PATHS_OK=true
tail -n +2 bmad/_cfg/agent-manifest.csv | while read line; do
  # Extract last occurrence of "bmad/..." pattern
  path=$(echo "$line" | grep -o '"bmad/[^"]*\.md"' | tail -1 | sed 's/"//g')
  if [ -n "$path" ] && [ -f "$path" ]; then
    echo "✅ Path valid: $(basename $path)"
  elif [ -n "$path" ]; then
    echo "❌ Path missing: $path"
    AGENT_PATHS_OK=false
    EXIT_CODE=1
  fi
done

[ "$AGENT_PATHS_OK" = true ] && echo "✅ All agent paths validated"

# Test 2: Workflow Manifest
echo -e "\n2. Workflow Manifest:"
DUPES=$(sort bmad/_cfg/workflow-manifest.csv | uniq -d | wc -l | xargs)
if [ "$DUPES" -eq 0 ]; then
  echo "✅ No duplicate entries"
else
  echo "❌ Found $DUPES duplicate entries"
  EXIT_CODE=1
fi

# Count workflows
WF_COUNT=$(tail -n +2 bmad/_cfg/workflow-manifest.csv | wc -l | xargs)
echo "✅ Workflow count: $WF_COUNT"

# Summary
echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ ALL REGISTRIES VALID"
else
  echo "❌ REGISTRY ERRORS FOUND - Review above"
fi

exit $EXIT_CODE
