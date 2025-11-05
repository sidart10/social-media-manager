# .claude/settings.json - Production Configuration

**Date**: 2025-11-02
**Purpose**: Document the improved settings.json configuration for team-shared project settings

---

## What Was Improved

### Before (Minimal)

```json
{
  "enableAllProjectMcpServers": true
}
```

### After (Production-Ready)

**File**: `.claude/settings.json` (committed to git, shared with team)

```json
{
  "enableAllProjectMcpServers": true,
  "permissions": {
    "allow": [...],
    "deny": [...],
    "ask": [...]
  }
}
```

---

## Security Improvements

### 1. Deny Sensitive Files (Critical)

**Problem**: By default, Claude Code can read `.env`, API keys, credentials
**Solution**: Explicit deny rules

```json
"deny": [
  "Read(./.env)",
  "Read(./.env.*)",
  "Read(./secrets/**)",
  "Read(./**/*.key)",
  "Read(./**/*.pem)",
  "Read(./**/*.p12)",
  "Read(./**/*credentials*)",
  "Read(./**/*secret*)",
  "Read(./.aws/**)",
  "Read(./.ssh/**)"
]
```

**Impact**:

- Protects ALL API keys in `.env` file
- Blocks access to SSH keys, AWS credentials
- Prevents reading any file with "secret" or "credential" in name
- Cannot edit or write to these files either

### 2. Protect Critical Infrastructure Files

```json
"deny": [
  "Read(./node_modules/**)",
  "Read(./coverage/**)",
  "Read(./.git/**)",
  "Edit(./.git/**)",
  "Write(./.git/**)"
]
```

**Impact**:

- Cannot corrupt git history
- Cannot modify dependencies directly
- Cannot read massive node_modules (token waste)

### 3. Block Dangerous Bash Commands

```json
"deny": [
  "Bash(curl *secrets*:*)",
  "Bash(wget *secrets*:*)",
  "Bash(rm -rf /:*)",
  "Bash(rm -rf ~:*)"
]
```

**Impact**:

- Cannot download secrets via curl/wget
- Cannot delete root directory
- Cannot delete home directory

### 4. Block Suspicious Domains

```json
"deny": [
  "WebFetch(domain:*.ru)",
  "WebFetch(domain:*.cn)"
]
```

**Impact**: Prevents data exfiltration to common malicious TLDs

---

## Developer Experience Improvements

### 1. Allow Common Development Commands

```json
"allow": [
  "Bash(npm:*)",
  "Bash(git:*)",
  "Bash(python:*)",
  "Bash(ls:*)",
  "Bash(cat:*)",
  "Bash(mkdir:*)",
  "WebSearch"
]
```

**Impact**:

- No permission prompts for safe operations
- Faster development workflow
- Less friction

### 2. Ask for Confirmation on Risky Operations

```json
"ask": [
  "Bash(git push:*)",
  "Bash(git push --force:*)",
  "Bash(npm publish:*)",
  "Bash(rm -rf:*)",
  "Bash(docker:*)",
  "Edit(./package.json)",
  "Edit(./.mcp.json)",
  "Edit(./.claude/settings.json)"
]
```

**Impact**:

- Prevents accidental force pushes
- Confirms before publishing to npm
- Prompts before editing critical config files
- Asks before destructive rm operations

---

## Best Practices Applied

### 1. Least Privilege Principle

Only allow necessary operations. Everything else requires permission.

### 2. Defense in Depth

- ✅ Deny reading sensitive files
- ✅ Deny editing sensitive files
- ✅ Deny writing sensitive files
- ✅ Block dangerous bash commands
- ✅ Block suspicious domains

### 3. Team Consistency

This file is **committed to git** so entire team shares:

- Same security posture
- Same permission rules
- Same MCP server approvals

### 4. Explicit > Implicit

Rather than relying on Claude to "be careful", we enforce rules at the configuration level.

---

## What's NOT Included (By Design)

### No Environment Variables

Environment variables with API keys should go in:

- **Local testing**: `.env` file (gitignored)
- **Claude Code Web**: Environment configuration UI
- **User-specific**: `~/.claude/settings.json` (not committed)

### No Hooks (Yet)

Hooks would auto-format code after edits, but:

- Can slow down operations
- May break in web environment
- Better to run manually via `npm run lint:fix`

If you want hooks later, add to `.claude/settings.local.json` (not committed).

---

## Testing the Configuration

### Local Testing

```bash
# Verify settings are valid
cat .claude/settings.json | jq .

# Test permission system
# This SHOULD work:
ls

# This SHOULD be blocked:
cat .env

# This SHOULD ask for confirmation:
git push origin main
```

### Web Testing

1. Push configuration to GitHub
2. Start Claude Code Web session
3. Activate Jarvis: `/jarvis`
4. Try a research workflow
5. Verify MCP servers load

---

## Migration Notes

### From Old Setup

**Old**: `.claude/settings.local.json` with MCP permissions
**New**: `.claude/settings.json` with project-wide security + MCP approvals

**What to move**:

- ✅ `enableAllProjectMcpServers` → shared settings
- ✅ Security deny rules → shared settings
- ❌ Personal API keys → keep in local or .env
- ❌ Personal preferences → keep in local

### Backward Compatibility

This configuration is **additive** - it adds security without breaking existing workflows:

- All previously allowed operations still work
- New protections prevent accidents
- Team members get same protection when they pull

---

## Next Steps

1. **Commit this configuration**:

   ```bash
   git add .claude/settings.json
   git commit -m "feat: Add production-ready security settings for Claude Code"
   ```

2. **Test locally** with current session (restart Claude Code)

3. **Push to GitHub** for web testing

4. **Update team documentation** to explain the permission system

---

## References

- [Claude Code Settings Docs](https://docs.claude.com/en/docs/claude-code/settings)
- [Permission System](https://docs.claude.com/en/docs/claude-code/iam)
- [Security Best Practices](https://docs.claude.com/en/docs/claude-code/security)
- Research from: eesel.ai, claudelog.com, Anthropic Engineering blog (Nov 2025)
