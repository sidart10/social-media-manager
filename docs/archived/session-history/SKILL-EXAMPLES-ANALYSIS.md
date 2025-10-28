# Real Claude Skills Examples - Pattern Analysis

**Source:** github.com/anthropics/skills & awesome-claude-skills

---

## 🔍 WHAT I FOUND

### Pattern 1: Simple Skills (Just SKILL.md)

**Example: brand-guidelines**

```
brand-guidelines/
└── SKILL.md (one file, ~40 lines)
```

**Content:** Just YAML frontmatter + instructions
**Use case:** Apply brand colors/typography
**Complexity:** Low

---

### Pattern 2: Skills with Resources

**Example: algorithmic-art, slack-gif-creator**

```
algorithmic-art/
├── SKILL.md
└── resources/
    ├── examples.md (reference implementations)
    └── templates/
```

**Use case:** Generate art with p5.js
**Resources:** Example code, implementation patterns

---

### Pattern 3: Skills with Scripts

**Example: slack-gif-creator**

```
slack-gif-creator/
├── SKILL.md
└── scripts/
    └── create_gif.py (predefined functions)
```

**Use case:** Create GIFs with Python
**Scripts:** Executable code Claude can run

---

### Pattern 4: Document Skills (Complex)

**Example: xlsx, pptx, pdf, docx**

```
document-skills/xlsx/
├── SKILL.md (detailed instructions)
├── resources/
│   ├── examples/
│   ├── templates/
│   └── reference-docs/
└── scripts/ (if needed)
```

**Use case:** Work with complex file formats
**Complexity:** High

---

## 🎯 APPLYING TO JARVIS

### Our Skills Need to Be Like: Pattern 2 (Skills with Resources)

**Why:**

- We're not executing code (Pattern 3)
- We're not simple brand guidelines (Pattern 1)
- We ARE orchestrating complex MCPs (Pattern 2/4)
- Need examples, templates, reference docs

**Structure for our MCP Skills:**

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md (when to invoke + high-level instructions)
└── resources/
    ├── mcp-examples.md (like algorithmic-art has implementation examples)
    ├── usage-patterns.md (step-by-step invocation)
    └── error-reference.md (troubleshooting)
```

---

## 📋 KEY LEARNINGS

### From Anthropic's Official Skills:

1. **SKILL.md can be minimal** (40 lines) OR detailed (200+ lines)
   - Brand guidelines: 40 lines (simple)
   - Document skills: 200+ lines (complex)

2. **resources/ folder is OPTIONAL but powerful**
   - Used for examples, templates, reference docs
   - Claude loads resources when needed
   - Keeps SKILL.md lean

3. **Instructions can reference resources**

   ```markdown
   See resources/examples.md for implementation patterns
   ```

4. **No "allowed-tools" restrictions** in MCP-using Skills
   - None of the official Skills restrict tools
   - They need full access

5. **Descriptions are detailed**
   - Include BOTH what it does AND when to use
   - Include trigger keywords
   - Example: "Use when user mentions X, asks about Y, or needs Z"

---

## ✅ OUR SKILLS ARE CORRECT PATTERN

**Comparing:**

**Official Skills:**

- SKILL.md (40-200 lines)
- Optional resources/
- No tool restrictions

**Our Jarvis Skills:**

- SKILL.md (28-42 lines for MCP Skills) ✓
- Need to add resources/ ⏳
- No tool restrictions (fixed) ✓

**We're 80% there!** Just need resources/ folders.

---

## 🎯 NEXT STEP: Add resources/ to MCP Skills

**Based on official pattern + video insights:**

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md (keep current - it's good!)
└── resources/
    ├── social-media-mcp-examples.md
    │   - Exact tool invocation syntax
    │   - Request/response examples
    │   - Success cases
    │   - Error cases
    │
    ├── workflow-integration.md
    │   - How this Skill integrates with research-topic workflow
    │   - When it's invoked
    │   - What it returns
    │
    └── troubleshooting.md
        - Common errors ("use_mcp_tool is not defined")
        - Fixes and workarounds
```

**This matches the official Skills pattern!**

---

## 💡 RECOMMENDATION

**Create resources/ for 4 MCP Skills:**

1. social-media-research
2. profile-analysis
3. youtube-research
4. deep-web-research

**Each gets:**

- mcp-examples.md (detailed tool usage)
- workflow-integration.md (how it fits)
- troubleshooting.md (error handling)

**This should fix the "use_mcp_tool" error by giving Claude all the context it needs!**

**Time:** 1-1.5 hours for all 4

---

**Want me to create the enhanced social-media-research Skill with resources/ now?**

This will match the official Skills pattern and likely fix our MCP invocation issues!
