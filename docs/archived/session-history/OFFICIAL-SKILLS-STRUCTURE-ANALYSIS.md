# Official Claude Skills - Complete Structure Analysis

**Source:** github.com/anthropics/skills (cloned and analyzed)

---

## 🔍 WHAT SKILLS ACTUALLY CONTAIN

### Pattern 1: Simple (Just SKILL.md)

**Example: brand-guidelines, template-skill**

```
brand-guidelines/
├── SKILL.md
└── LICENSE.txt
```

**Size:** ~2KB SKILL.md
**Use:** Simple instructions only

---

### Pattern 2: Skills with Examples

**Example: internal-comms, webapp-testing**

```
internal-comms/
├── SKILL.md
├── examples/
│   ├── faq-example.md
│   ├── newsletter-example.md
│   └── status-report-example.md
└── LICENSE.txt
```

**Size:** ~1.5KB SKILL.md + examples
**Use:** SKILL.md references examples for Claude to follow

---

### Pattern 3: Skills with Reference Docs

**Example: mcp-builder**

```
mcp-builder/
├── SKILL.md (13KB - detailed!)
├── reference/
│   ├── fastmcp-guide.md
│   ├── mcp-spec.md
│   ├── python-patterns.md
│   └── typescript-patterns.md
├── scripts/
│   ├── test-server.sh
│   └── validation-helpers.js
└── LICENSE.txt
```

**Size:** 13KB SKILL.md + reference docs + helper scripts
**Use:** Comprehensive guidance with language-specific patterns

---

### Pattern 4: Skills with Executable Code

**Example: slack-gif-creator**

```
slack-gif-creator/
├── SKILL.md (17KB - comprehensive!)
├── core/
│   ├── gif_builder.py
│   ├── validators.py
│   ├── frame_composer.py
│   ├── typography.py
│   ├── color_palettes.py
│   ├── easing.py
│   └── visual_effects.py
├── templates/
│   ├── bounce.py
│   ├── spin.py
│   ├── fade.py
│   ├── explode.py
│   └── [10 more animation templates]
├── requirements.txt
└── LICENSE.txt
```

**Size:** 17KB SKILL.md + 23 Python files!
**Use:** SKILL.md references Python modules, Claude executes them

---

## 💡 KEY DISCOVERY: How Code Works in Skills

### slack-gif-creator Example:

**SKILL.md says:**

```markdown
## Toolkit Structure

### Core Validators

- `core/validators.py` - Size, dimension validation
- Use: `from core.validators import validate_gif`

### Animation Primitives

- `templates/bounce.py` - Bounce animation
- `templates/spin.py` - Spin animation
- Use these composable functions

### Helper Utilities

- `core/gif_builder.py` - Assemble GIFs
- `core/typography.py` - Render text
```

**Claude can:**

- Import Python modules: `from core.validators import validate_gif`
- Execute functions: `validate_gif(filepath)`
- Compose animations: `bounce() + fade()`
- Build final GIF

**The Python files are TOOLS Claude uses!**

---

## 🎯 APPLYING TO JARVIS

### What Official Skills Show Us:

1. **resources/ or reference/ folders are COMMON**
   - mcp-builder has reference/
   - internal-comms has examples/
   - slack-gif-creator has core/ + templates/

2. **Code files provide reusable functions**
   - Python modules Claude can import
   - Template files Claude can compose
   - Helper utilities

3. **SKILL.md references these resources**
   - "See reference/python-patterns.md for..."
   - "Use core/validators.py for..."
   - "Examples in examples/faq-example.md"

---

## 🚨 CRITICAL REALIZATION

**We CAN'T put Python/JS code in our Skills because:**

- We're not executing custom code
- We're calling EXTERNAL MCPs (apify, exa, social-media-mcp)
- MCPs are separate servers, not Python modules

**BUT we CAN:**

- Put MCP invocation examples in resources/
- Put request/response templates in resources/
- Reference workflow files

**Like mcp-builder Skill does:**

```
mcp-builder/
├── SKILL.md (how to build MCP servers)
├── reference/
│   ├── fastmcp-guide.md (framework docs)
│   ├── python-patterns.md (code patterns)
│   └── typescript-patterns.md
└── scripts/
    └── test-server.sh (helper script)
```

**They're not executing code IN the Skill, they're providing REFERENCE docs!**

---

## ✅ WHAT WE SHOULD DO

### For Jarvis Skills, Use "Reference Pattern" (Like mcp-builder):

```
.claude/skills/jarvis/social-media-research/
├── SKILL.md
└── resources/
    ├── social-media-mcp-reference.md
    │   - Tool documentation
    │   - Request/response formats
    │   - Parameter explanations
    │
    ├── usage-examples.md
    │   - Example 1: Get trending topics
    │   - Example 2: Research with all parameters
    │   - Example 3: Error handling
    │
    └── workflow-integration.md
        - How this fits in research-topic workflow
        - When it's invoked
        - What it returns
```

**Similar to:**

- mcp-builder/reference/ (reference docs for MCP building)
- internal-comms/examples/ (example outputs)

**NOT like:**

- slack-gif-creator/core/ (executable Python - we don't need this)

---

## 🎯 RECOMMENDATION

**Create resources/ folders for our 4 MCP Skills:**

**Pattern to follow:** mcp-builder (reference docs, no executable code)

**What to include:**

- MCP tool reference (like mcp-builder has fastmcp-guide.md)
- Usage examples (like internal-comms has examples/)
- Integration guide (how it fits with workflows)

**Time:** 30-45 min per Skill

---

**Start with social-media-research?** (30 min)

This will:

- Give Claude detailed MCP context
- Likely fix "use_mcp_tool" error
- Match official Skills pattern
- No code execution needed (just reference docs)
