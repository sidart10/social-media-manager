# Skills Path Issue - Root Cause Analysis

**Error:** `ls: /Users/sid/.claude/skills/jarvis/: No such file or directory`
**Actual Location:** `.claude/skills/jarvis/` (project)

---

## The Issue

**Claude tried to access:**

```
/Users/sid/.claude/skills/jarvis/
```

**But Skills are actually in:**

```
/Users/sid/Desktop/4. Coding Projects/social-media-manager/.claude/skills/jarvis/
```

**This means:** Claude is looking in GLOBAL location, not PROJECT location!

---

## Why This Happens

**Claude Code Skills loading:**

1. First checks: `~/.claude/skills/` (global)
2. Then checks: `{project-root}/.claude/skills/` (project)

**The problem:**

- Claude checked global location
- Threw error when not found
- **Never tried project location!**

**This suggests:**

- Skills loading might be checking global ONLY
- Or project Skills aren't recognized yet
- Or need explicit configuration

---

## Potential Issues

### Issue 1: Project Skills Not Auto-Discovered

**Hypothesis:** Claude Code might not automatically load project-level Skills

**Need to check:**

- Does `.claude/skills/` need to be explicitly configured?
- Is there a setting to enable project Skills?
- Do we need to register them somehow?

### Issue 2: Skills Path Not Configured

**Check:** Is there a Skills path configuration in:

- .claude/settings.local.json?
- Project config file?
- Agent configuration?

### Issue 3: Skills Need to Be Global

**Possibility:** For Claude Code, Skills MUST be in `~/.claude/skills/` (global)

- Project-level Skills might only work in Claude.ai web
- CLI might require global location

---

## 🎯 SOLUTIONS TO TRY

### Solution 1: Move to Global Location (Simplest)

```bash
mv .claude/skills/jarvis ~/.claude/skills/
```

**Pros:**

- Claude will find them immediately
- Standard location for CLI

**Cons:**

- Not in project git
- Not team-shareable

---

### Solution 2: Symlink Global → Project

```bash
ln -s /Users/sid/Desktop/.../social-media-manager/.claude/skills/jarvis ~/.claude/skills/jarvis
```

**Pros:**

- Skills stay in project (git-tracked)
- Claude finds them in global location
- Best of both worlds

**Cons:**

- Symlink complexity

---

### Solution 3: Configure Project Skills Path

**If there's a config option to tell Claude where to find project Skills**

Check:

- .claude/settings.local.json
- Claude Code settings
- Documentation on project Skills

---

## 🔍 NEED TO INVESTIGATE

**Check:**

1. Claude Code documentation on project vs global Skills
2. Is there a setting to enable project Skills?
3. Do other people use project Skills successfully?

---

**My recommendation:** **Try Solution 2 (symlink)** - keeps Skills in project but Claude can find them!

**Want me to create the symlink?**
