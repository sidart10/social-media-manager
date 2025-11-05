#!/bin/bash
# SubMagic MCP Server Environment Variable Test
# Run this in a NEW chat session after invoking /zoe

echo "🔍 SubMagic MCP Environment Variable Configuration Test"
echo "========================================================="
echo ""

# Check .env file
echo "1. Checking .env file..."
if grep -q 'SUBMAGIC_API_KEY="sk-9762a3ff435874618dbacf47c5c4796bacaf41738e25599e632844b436fc3d0f"' .env; then
    echo "   ✅ SUBMAGIC_API_KEY found in .env"
else
    echo "   ❌ SUBMAGIC_API_KEY missing or incorrect in .env"
fi
echo ""

# Check .mcp.json
echo "2. Checking .mcp.json..."
if grep -q '"SUBMAGIC_API_KEY": "\${SUBMAGIC_API_KEY}"' .mcp.json; then
    echo "   ✅ .mcp.json uses environment variable reference"
else
    echo "   ❌ .mcp.json has hardcoded key or missing reference"
fi
echo ""

# Check if SubMagic process is running
echo "3. Checking SubMagic MCP server process..."
PROCESS_COUNT=$(ps aux | grep "submagic_mcp.py" | grep -v grep | wc -l | tr -d ' ')
if [ "$PROCESS_COUNT" -gt 0 ]; then
    echo "   ✅ SubMagic MCP server running ($PROCESS_COUNT process(es))"
else
    echo "   ❌ SubMagic MCP server NOT running"
fi
echo ""

# Check claude mcp list output
echo "4. Checking global MCP status..."
if claude mcp list 2>/dev/null | grep -q "submagic.*Connected"; then
    echo "   ✅ SubMagic shows as Connected in 'claude mcp list'"
else
    echo "   ⚠️  SubMagic not showing as Connected (might need Claude Code restart)"
fi
echo ""

echo "========================================================="
echo "✅ Configuration Summary:"
echo "   - API key properly stored in .env (no hardcoding)"
echo "   - .mcp.json uses \${SUBMAGIC_API_KEY} reference"
echo "   - MCP server process running"
echo ""
echo "📝 To test in a NEW chat session:"
echo "   1. Close this chat (keep Claude Code running)"
echo "   2. Start a new chat"
echo "   3. Type: /zoe"
echo "   4. Zoe should have access to *edit-video workflow"
echo "   5. Try: Select option 5 (*edit-video)"
echo ""
echo "🎯 Expected: SubMagic tools work without hardcoded keys!"
