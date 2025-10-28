#!/bin/bash
# Test Apify YouTube transcript actors

cd "/Users/sid/Desktop/4. Coding Projects/social-media-manager"

# Load environment
set -a
source .env
set +a

echo "======================================"
echo "Testing Apify YouTube Transcript Actors"
echo "======================================"
echo ""

# Test using MCP
echo "Test 1: Single video transcript"
echo "Actor: karamelo/youtube-transcripts"
echo "Test URL: https://youtube.com/watch?v=dQw4w9WgXcQ"
echo ""

# The test will be done through Claude's MCP interaction
# This script just sets up the environment

echo "✓ Environment configured"
echo "✓ APIFY_API_KEY: ${APIFY_API_KEY:0:20}..."
echo ""
echo "Ready for Claude to test Apify actors!"
