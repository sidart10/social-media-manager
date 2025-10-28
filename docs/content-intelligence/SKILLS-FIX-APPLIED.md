# Skills Fix - Tool Restrictions Removed

**Issue Found:** `use_mcp_tool is not defined`

**Root Cause:** Skills with `allowed-tools` restriction cannot access MCP tools

**Fix Applied:** Removed `allowed-tools` from all MCP-using Skills

## Files Modified:

1. ✅ social-media-research/SKILL.md - Removed allowed-tools
2. ✅ profile-analysis/SKILL.md - Removed allowed-tools
3. ✅ youtube-research/SKILL.md - Removed allowed-tools
4. ✅ deep-web-research/SKILL.md - Removed allowed-tools

## Skills Kept Restrictions (Don't Need MCPs):

- voice-matcher: allowed-tools: Read, Edit
- platform-formatter: allowed-tools: Read, Edit
- evidence-tracker: allowed-tools: Read, Write
- research-synthesizer: allowed-tools: Read, Write, Edit

**These are fine - they don't call MCPs, only process data**

---

## Next Step

**Restart Claude Code again** to reload Skills with fixes

**Then test:** "Research AI agents - trending topics"

Should work now!
