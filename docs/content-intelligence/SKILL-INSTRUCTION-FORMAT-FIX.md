# Skill Instruction Format - Critical Fix

**Issue:** Skills written as documentation, not executable instructions

**Error:** "use_mcp_tool is not defined"

---

## Root Cause

**Skills were written like this (WRONG):**

````markdown
### Step 1: Call research_topic

**Tool:** social-media-mcp/research_topic

**Parameters:**

```javascript
{...}
```
````

````

**Problem:** This looks like API documentation, not instructions Claude can execute

---

## The Fix

**Skills should be written like this (RIGHT):**
```markdown
## Instructions

When user asks to research a topic:

1. Use the social-media-mcp research_topic tool with topic={user's topic}, includeHashtags=true, includeFacts=true, includeTrends=true, includeNews=true

2. Organize the results clearly with hashtags, facts, news, and trends

3. Make findings actionable by highlighting top hashtags and high-confidence facts
````

**Why this works:**

- Direct, imperative instructions
- No formatted code blocks that look like documentation
- Natural language Claude can follow
- Clear action verbs: "Use", "Organize", "Make"

---

## Fix Applied

**Updated:** social-media-research/SKILL.md

- Removed documentation-style formatting
- Changed to direct instructions
- Simplified parameter descriptions
- Made it executable, not referential

---

## Next Step

**Restart Claude Code** to reload the fixed Skill

**Then test:**
"Research AI agents with hashtags and facts"

Should work now - instructions are direct, not documentary!
