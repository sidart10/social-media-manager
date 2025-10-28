#!/bin/bash
# Test all platforms quickly

cd ~/.claude/skills/jarvis/autogen-script-generator
source venv/bin/activate

# Load .env
if [ -f "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env" ]; then
    set -a
    source "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env"
    set +a
fi

echo "======================================"
echo "Platform Tests - Quick Run"
echo "======================================"
echo ""

# Test 1: LinkedIn post
echo "Test 1: LinkedIn post..."
cd scripts
python3 generate_script.py \
    --topic "AI agents" \
    --platform "linkedin" \
    --tone "professional"

echo ""
echo "✓ LinkedIn test complete!"
echo ""

# Test 2: Twitter long-form
echo "Test 2: Twitter long-form..."
python3 generate_script.py \
    --topic "Automation tips" \
    --platform "twitter" \
    --format "longform"

echo ""
echo "✓ Twitter long-form test complete!"
echo ""

echo "======================================"
echo "All Platform Tests Complete!"
echo "======================================"
