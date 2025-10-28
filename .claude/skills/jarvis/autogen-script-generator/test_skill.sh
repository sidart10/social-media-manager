#!/bin/bash
# Test autogen-script-generator Skill

cd "$(dirname "$0")"

echo "Testing autogen-script-generator Skill..."
echo ""

# Activate venv
source venv/bin/activate

# Test 1: Twitter thread
echo "Test 1: Twitter thread about AI automation"
python scripts/generate_script.py \
  --topic "AI automation tools that save developers time" \
  --platform "twitter" \
  --format "thread" \
  --tone "conversational" \
  --audience "developers"

echo ""
echo "---"
echo ""

# Test 2: LinkedIn post
echo "Test 2: LinkedIn post"
python scripts/generate_script.py \
  --topic "Why MCP is the USB-C moment for AI agents" \
  --platform "linkedin" \
  --tone "professional"

echo ""
echo "Test complete!"
