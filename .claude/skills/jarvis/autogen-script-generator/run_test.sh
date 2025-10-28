#!/bin/bash
# Standalone test runner with proper .env loading

cd ~/.claude/skills/jarvis/autogen-script-generator

# Activate venv
source venv/bin/activate

# Load .env from project
if [ -f "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env" ]; then
    set -a
    source "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env"
    set +a
    echo "✓ Loaded environment variables"
else
    echo "Error: .env file not found"
    exit 1
fi

# Verify API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY not set after loading .env"
    exit 1
fi

echo "✓ OPENAI_API_KEY configured"
echo ""
echo "======================================"
echo "Testing autogen-script-generator"
echo "======================================"
echo ""

# Run simple test
cd scripts
python3 test_simple.py

echo ""
echo "======================================"
echo "Test Complete!"
echo "======================================"
