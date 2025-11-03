# PRP: Fix AutoGen Script Generator - Enable Detailed Prompts & Research Loading

**Status:** Active
**Priority:** High
**Complexity:** Medium
**Est. Time:** 45 minutes
**Created:** 2025-10-28

---

## Problem Statement

The autogen-script-generator skill currently generates stub content (233 characters) instead of comprehensive articles because:

1. **Wrong prompts file active**: `agents.py` imports from `prompts.py` (76-line stubs) instead of `prompts_complex.py` (detailed 300+ line prompts with examples)
2. **Research parser broken**: `research_agent.py` demands specific markdown headers (`## Data & Statistics`, `## Quotes & Expert Opinions`) that don't exist in actual research files
3. **No research data loaded**: Parser returns 0 facts → agents have no research context → generic content generation

**Impact**: Jarvis write-posts and write-scripts workflows fail to produce research-backed, voice-matched content.

---

## Current State Analysis

### File Structure

```
.claude/skills/jarvis/autogen-script-generator/
├── scripts/
│   ├── agents.py              # ❌ Imports from wrong prompts file (line 9)
│   ├── prompts.py            # ❌ ACTIVE: 76 lines, stub prompts
│   ├── prompts_complex.py    # ✅ INACTIVE: 300+ lines, detailed prompts
│   ├── prompts.py.bak        # Backup of detailed prompts
│   ├── research_agent.py     # ❌ Hardcoded header parser (lines 44-51)
│   ├── generate_script.py    # ✅ Entry point, works correctly
│   ├── content_types.py      # ✅ Platform specs, works correctly
│   └── test_simple.py        # ✅ Test pattern reference
├── requirements.txt           # ✅ autogen-agentchat>=0.4.0
└── SKILL.md                   # ✅ Documentation

```

### Test Evidence

```bash
# Current behavior (BROKEN):
$ python generate_script.py --platform "linkedin" --research-file "research.md"
Output: 233 chars, generic post
Stderr: "Loaded research: 0 facts"

# Expected behavior (AFTER FIX):
Output: 1500+ chars, research-backed content
Stderr: "Loaded research: 150+ facts"
```

---

## Solution Design

### Implementation Blueprint

**Phase 1: Activate Detailed Prompts**

- File: `scripts/agents.py` (line 9)
- Change: Import from `prompts_complex` instead of `prompts`
- Impact: Agents get full system messages with examples, guidelines, parameter templating

**Phase 2: Fix Research Loader**

- File: `scripts/research_agent.py` (complete rewrite of lines 30-85)
- Change: Replace hardcoded header parser with intelligent content extractor
- Extract: statistics, quotes, bullets, all sections, full text
- Impact: Research data loads from ANY markdown structure

**Phase 3: Enhance Agent Context**

- File: `scripts/agents.py` (lines 120-131)
- Change: Update Research_Agent system message with loaded data stats
- Impact: Agents receive rich research summaries

**Phase 4: Cleanup**

- Remove: `prompts.py` (stub version)
- Remove: `prompts.py.bak` (no longer needed)
- Rename: `prompts_complex.py` → `prompts.py`
- Impact: Clean codebase, no confusion

---

## Implementation Tasks

### Task 1: Activate Detailed Prompts (5 min)

**File:** `.claude/skills/jarvis/autogen-script-generator/scripts/agents.py`

**Change line 9:**

```python
# FROM:
from prompts import (
    TITLE_AGENT_PROMPT,
    INTRO_HOOK_AGENT_PROMPT,
    # ... rest
)

# TO:
from prompts_complex import (
    TITLE_AGENT_PROMPT,
    INTRO_HOOK_AGENT_PROMPT,
    INTRO_HOOK_REEL_AGENT_PROMPT,
    CONTENT_AGENT_PROMPT,
    CONTENT_AGENT_REEL_PROMPT,
    TONE_AGENT_PROMPT,
    TONE_AGENT_REEL_PROMPT,
    OUTRO_AGENT_PROMPT,
    REVIEWER_AGENT_PROMPT,
    SPOKEN_ENGLISH_AGENT_PROMPT,
    POST_TITLE_PROMPT,
    POST_CONTENT_PROMPT,
    POST_CTA_PROMPT
)
```

**Validation:**

```bash
python -c "from scripts.agents import create_agents; print('✓ Import successful')"
```

---

### Task 2: Fix Research Loader (15 min)

**File:** `.claude/skills/jarvis/autogen-script-generator/scripts/research_agent.py`

**Replace entire `load_research_brief` function (lines 30-62):**

```python
def load_research_brief(file_path: str) -> Dict:
    """
    Load ANY markdown research file intelligently
    Extracts facts, quotes, examples, sections regardless of structure
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        research_data = {
            'facts': extract_statistics_and_facts(content),
            'quotes': extract_quotes(content),
            'examples': extract_examples(content),
            'key_points': extract_bullet_points(content),
            'sections': extract_all_sections(content),
            'full_text': content[:50000]  # First 50K chars for context
        }

        return research_data

    except FileNotFoundError:
        print(f"Warning: Research file not found: {file_path}", file=sys.stderr)
        return {
            'facts': [],
            'quotes': [],
            'examples': [],
            'key_points': [],
            'sections': {},
            'full_text': ''
        }
    except Exception as e:
        print(f"Error loading research: {e}", file=sys.stderr)
        return {
            'facts': [],
            'quotes': [],
            'examples': [],
            'key_points': [],
            'sections': {},
            'full_text': ''
        }
```

**Add helper functions after `load_research_brief`:**

```python
def extract_statistics_and_facts(content: str) -> List[str]:
    """Extract lines with numbers, percentages, money, dates"""
    import re
    facts = []
    lines = content.split('\n')

    for line in lines:
        # Match: percentages, money, dates, large numbers
        if re.search(r'(\d+%|\$[\d,]+B?|20\d{2}|\d+\s*(billion|million|thousand|trillion))', line, re.IGNORECASE):
            cleaned = line.strip('- *#').strip()
            if cleaned and len(cleaned) > 20:  # Meaningful facts only
                facts.append(cleaned)

    return facts[:100]  # Top 100 facts

def extract_quotes(content: str) -> List[str]:
    """Extract quoted text from markdown"""
    import re
    # Match both "quoted" and block quotes
    quotes = re.findall(r'"([^"]{30,})"', content)  # Min 30 chars
    return quotes[:50]  # Top 50 quotes

def extract_examples(content: str) -> List[str]:
    """Extract example-like content"""
    examples = []
    lines = content.split('\n')

    for i, line in enumerate(lines):
        # Look for "Example:", "For example", "e.g.", "For instance"
        if re.search(r'(example|for instance|e\.g\.|case study):', line, re.IGNORECASE):
            # Grab next 2-3 lines as context
            context = '\n'.join(lines[i:i+3])
            if len(context) > 30:
                examples.append(context.strip())

    return examples[:30]  # Top 30 examples

def extract_bullet_points(content: str) -> List[str]:
    """Extract all bullet points from markdown"""
    lines = content.split('\n')
    bullets = []

    for line in lines:
        # Match: -, *, numbered lists
        if re.match(r'^\s*[-*•]\s+', line) or re.match(r'^\s*\d+\.\s+', line):
            cleaned = re.sub(r'^\s*[-*•\d.]+\s*', '', line).strip()
            if len(cleaned) > 20:  # Meaningful bullets only
                bullets.append(cleaned)

    return bullets[:200]  # Top 200 bullets

def extract_all_sections(content: str) -> Dict[str, str]:
    """Extract all markdown sections (## headers) with their content"""
    sections = {}
    lines = content.split('\n')
    current_section = None
    current_content = []

    for line in lines:
        if line.startswith('## '):
            # Save previous section
            if current_section:
                sections[current_section] = '\n'.join(current_content).strip()
            # Start new section
            current_section = line.replace('## ', '').strip()
            current_content = []
        elif current_section:
            current_content.append(line)

    # Save last section
    if current_section:
        sections[current_section] = '\n'.join(current_content).strip()

    return sections
```

**Validation:**

```bash
# Test research loader directly
python -c "
from scripts.research_agent import load_research_brief
data = load_research_brief('outputs/10-28-2025/xai-twitter-thread/research/research-xai-lifecycle-2025-10-28.md')
print(f'Facts: {len(data[\"facts\"])}')
print(f'Quotes: {len(data[\"quotes\"])}')
print(f'Sections: {len(data[\"sections\"])}')
assert len(data['facts']) > 50, 'Should extract 50+ facts'
print('✓ Research loader works!')
"
```

---

### Task 3: Enhance Research Agent Context (5 min)

**File:** `.claude/skills/jarvis/autogen-script-generator/scripts/agents.py`

**Update Research_Agent creation (lines 120-131):**

```python
# Research Agent (uses provided research data)
research_agent = AssistantAgent(
    name="Research_Agent",
    system_message=f"""
    You are Research_Agent. Gather and organize research data for content creation.

    {research_context}

    You have access to loaded research data:
    - {len(research_data.get('facts', []) if research_data else [])} statistics and facts
    - {len(research_data.get('quotes', []) if research_data else [])} expert quotes
    - {len(research_data.get('key_points', []) if research_data else [])} key points
    - {len(research_data.get('sections', {}) if research_data else {})} content sections

    Your task:
    1. Review the loaded research data
    2. Identify the most compelling statistics, quotes, and insights
    3. Summarize key themes and main points
    4. Provide this context to other agents so they can create well-researched content

    Be concise but thorough in your summary.
    """,
    model_client=model_client
)
```

---

### Task 4: Cleanup Unused Files (2 min)

```bash
cd ~/.claude/skills/jarvis/autogen-script-generator/scripts/

# Remove stub prompts
rm prompts.py

# Remove backup
rm prompts.py.bak

# Rename detailed prompts to be the active file
mv prompts_complex.py prompts.py

# Verify
ls -lh prompts.py  # Should be ~16KB, not 2KB
```

---

## Validation Gates (MUST PASS)

### Gate 1: Syntax & Imports

```bash
cd ~/.claude/skills/jarvis/autogen-script-generator/scripts/

# Test all imports work
python -c "from agents import create_agents; print('✓ agents.py imports')"
python -c "from research_agent import load_research_brief; print('✓ research_agent.py imports')"
python -c "from prompts import POST_TITLE_PROMPT; print('✓ prompts.py has detailed prompts')"
```

### Gate 2: Research Loading Test

```bash
# Test with real xAI research file
python -c "
import sys
sys.path.insert(0, '/Users/sid/.claude/skills/jarvis/autogen-script-generator/scripts')
from research_agent import load_research_brief

research_file = '/Users/sid/Desktop/4. Coding Projects/social-media-manager/outputs/10-28-2025/xai-twitter-thread/research/research-xai-lifecycle-2025-10-28.md'
data = load_research_brief(research_file)

print(f'✓ Facts extracted: {len(data[\"facts\"])}')
print(f'✓ Quotes extracted: {len(data[\"quotes\"])}')
print(f'✓ Sections extracted: {len(data[\"sections\"])}')
print(f'✓ Key points extracted: {len(data[\"key_points\"])}')

assert len(data['facts']) >= 50, f'Expected 50+ facts, got {len(data[\"facts\"])}'
assert len(data['sections']) >= 5, f'Expected 5+ sections, got {len(data[\"sections\"])}'
print('\\n✓✓✓ Research loader validation PASSED')
"
```

### Gate 3: End-to-End Integration Test

```bash
cd ~/.claude/skills/jarvis/autogen-script-generator

export OPENAI_API_KEY="your-openai-api-key-here"

python scripts/generate_script.py \
  --topic "xAI: How Elon Musk Built a $200B AI Company in 30 Months" \
  --platform "linkedin" \
  --research-file "/Users/sid/Desktop/4. Coding Projects/social-media-manager/outputs/10-28-2025/xai-twitter-thread/research/research-xai-lifecycle-2025-10-28.md" \
  --voice-file "/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/content-intelligence/jarvis-sidecar/memories.md"

# Expected output:
# - stderr: "Loaded research: 50+ facts" (NOT "0 facts")
# - stdout: JSON with content > 1000 characters
# - content should mention specific xAI facts (e.g., "$200B", "122 days", "Colossus")
```

### Gate 4: Simple Agent Test

```bash
# Run simple test to verify agents work
cd ~/.claude/skills/jarvis/autogen-script-generator
python scripts/test_simple.py

# Should output:
# "✓ Test complete!"
# Messages with actual content from agents
```

---

## Success Criteria

- [ ] `agents.py` imports from `prompts.py` (renamed from prompts_complex.py)
- [ ] Research loader extracts 50+ facts from xAI research file
- [ ] End-to-end test generates 1000+ character LinkedIn post
- [ ] Generated content includes specific research data (not generic)
- [ ] All validation gates pass
- [ ] Stub files removed (old prompts.py, prompts.py.bak)

---

## Rollback Plan

If fixes fail:

```bash
cd ~/.claude/skills/jarvis/autogen-script-generator/scripts/

# Restore from backup
git checkout agents.py research_agent.py prompts.py

# OR manually:
# 1. Change agents.py line 9 back to: from prompts import ...
# 2. Restore research_agent.py from git history
```

---

## References & Context

### AutoGen Documentation

- Agent Teams: https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/teams.html
- Assistant Agents: https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat/autogen_agentchat.agents.html#autogen_agentchat.agents.AssistantAgent
- Model Clients: https://microsoft.github.io/autogen/stable/reference/python/autogen_ext/autogen_ext.models.openai.html

### Codebase Patterns

- **Agent creation pattern**: `scripts/agents.py` lines 109-244
- **Research loading pattern**: `scripts/research_agent.py` lines 30-85
- **Test pattern**: `scripts/test_simple.py` (simple 2-agent test)
- **Voice profile loading**: `scripts/generate_script.py` lines 30-51

### Example Detailed Prompt (from prompts_complex.py)

```python
TITLE_AGENT_PROMPT = """
You're a master clickbait artist - an expert at crafting irresistible titles...

To hook 'em and reel 'em in, the titles you create should:
1. Be short and snappy, 8-12 words max...
2. Use curiosity gaps, comparisons...
3. Highlight unique angles...
[300+ lines of detailed instructions with examples]
"""
```

---

## Known Gotchas

1. **Import Order**: Must import `re` and `sys` in research_agent.py for regex and error handling
2. **Encoding**: Use `encoding='utf-8'` when opening files to handle special characters
3. **Model Name**: Test with `gpt-4o` (works), not `gpt-5` (may not be available yet)
4. **API Key**: Must be set as environment variable, not passed as arg
5. **File Paths**: Use absolute paths for research/voice files (relative paths fail)

---

## Confidence Score: 9/10

**Why High Confidence:**

- ✅ Problem well-understood (research shows exact issues)
- ✅ Solution is straightforward (import changes + parser rewrite)
- ✅ Validation gates are executable and specific
- ✅ Rollback plan exists
- ✅ All files and line numbers identified
- ✅ Test pattern exists (test_simple.py)

**Why Not 10/10:**

- Regex extraction might miss edge cases in some markdown formats
- Unknown if research_context variable is properly formatted in agents.py line 80-95

---

## Post-Implementation

After validation passes:

1. Test with other research files (not just xAI)
2. Test all platforms (Twitter thread, Instagram, YouTube script)
3. Update SKILL.md if behavior changed
4. Document the fix in commit message

**Estimated Total Time:** 30-45 minutes
