#!/bin/bash
# Test full generate_script.py with improvements

cd ~/.claude/skills/jarvis/autogen-script-generator

# Activate venv
source venv/bin/activate

# Load .env
if [ -f "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env" ]; then
    set -a
    source "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env"
    set +a
fi

echo "======================================"
echo "Full Script Test - Twitter Thread"
echo "======================================"
echo ""

cd scripts
python3 generate_script.py \
    --topic "3 AI automation tips" \
    --platform "twitter" \
    --format "thread"
