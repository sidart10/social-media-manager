#!/bin/bash
# Test autogen-script-generator with real API

set -e  # Exit on error

cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

# Load API key from project .env
if [ -f "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env" ]; then
    export $(grep OPENAI_API_KEY "/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env" | xargs)
fi

# Check API key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY not set"
    exit 1
fi

echo "======================================"
echo "AutoGen Script Generator - Live Test"
echo "======================================"
echo ""
echo "Topic: AI automation tips"
echo "Platform: Twitter"
echo "Format: Thread"
echo ""
echo "Starting generation..."
echo ""

# Run the generator
python3 scripts/generate_script.py \
    --topic "AI automation tips" \
    --platform "twitter" \
    --format "thread"

echo ""
echo "======================================"
echo "Test Complete!"
echo "======================================"
