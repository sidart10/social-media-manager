#!/bin/bash
# Powered by BMAD™ Core
# Validate file structure integrity

EXIT_CODE=0

echo "=== FILE STRUCTURE VALIDATION ==="

# Test 1: Agent Files
echo -e "\n1. Agent Files:"
for agent in bmad/agents/content-intelligence/jarvis.md bmad/agents/zoe/zoe.md bmad/agents/zoro/zoro.md; do
  if [ -f "$agent" ]; then
    echo "✅ $(basename $agent)"
  else
    echo "❌ Missing: $agent"
    EXIT_CODE=1
  fi
done

# Test 2: Workflow Count
echo -e "\n2. Workflows:"
WF_COUNT=$(find bmad -name "workflow.yaml" | wc -l | xargs)
if [ "$WF_COUNT" -ge 16 ]; then
  echo "✅ Found $WF_COUNT workflows (expected: 16+)"
else
  echo "⚠️  Only $WF_COUNT workflows (expected: 16+)"
fi

# Test 3: Skill Count
echo -e "\n3. Skills:"
SKILL_COUNT=$(find .claude/skills -name "SKILL.md" | wc -l | xargs)
if [ "$SKILL_COUNT" -ge 20 ]; then
  echo "✅ Found $SKILL_COUNT skills (expected: 20+)"
else
  echo "⚠️  Only $SKILL_COUNT skills (expected: 20+)"
fi

# Test 4: Registry Files
echo -e "\n4. Registry Files:"
test -f bmad/_cfg/agent-manifest.csv && echo "✅ Agent manifest" || { echo "❌ Agent manifest missing"; EXIT_CODE=1; }
test -f bmad/_cfg/workflow-manifest.csv && echo "✅ Workflow manifest" || { echo "❌ Workflow manifest missing"; EXIT_CODE=1; }
test -f .bmad-core/data/tool-registry.yaml && echo "✅ Tool registry" || { echo "❌ Tool registry missing"; EXIT_CODE=1; }
test -f .bmad-core/data/workflow-registry.yaml && echo "✅ Workflow registry" || { echo "❌ Workflow registry missing"; EXIT_CODE=1; }

# Summary
echo -e "\n=== SUMMARY ==="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ FILE STRUCTURE VALID"
else
  echo "❌ FILE STRUCTURE HAS ERRORS - Review above"
fi

exit $EXIT_CODE
