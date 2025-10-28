# youtube-research Skill - Workflow Integration

**How this Skill integrates with Jarvis workflows**

---

## Used By Workflows

### 1. research-topic Workflow

**When Invoked:**

- User runs: `/jarvis → research-topic`
- focus_areas includes "examples"
- Workflow says: "Find YouTube videos and extract how they explain {topic}"
- Claude invokes youtube-research Skill

**What Happens:**

1. Skill searches for or receives YouTube URLs about topic
2. Extracts transcripts via youtube-transcript/get_transcript
3. Analyzes hooks, structure, quotes, teaching style
4. Returns organized findings

**Feeds Into:**

- research-synthesizer (YouTube examples category)
- Research brief (Examples & Case Studies section)

---

### 2. generate-ideas Workflow

**When Invoked:**

- Optionally used when generating content ideas
- To see how others cover the topic
- Learn what structures work

**What It Provides:**

- Hook patterns that work
- Structure templates
- Quote inspiration
- Teaching approaches

---

## Works With Other Skills

**Combines With:**

**research-synthesizer:**

- youtube-research provides: quotes, structures, examples
- Synthesizer organizes into comprehensive brief

**evidence-tracker:**

- All quotes include timestamps
- All videos tracked as sources
- Complete citation trail

---

## Output to Workflows

**youtube-research returns:**

```markdown
# YouTube Research: {Topic}

**Videos Analyzed:** {count}

## Video 1: {Title}

- URL: {url}
- Hook: "{hook_text}" (0:05)
- Structure: Problem → Demo → Results
- Key Quote: "{quote}" (2:34)

[Additional videos...]

## Patterns Across Videos

- Common hooks: Question hooks (60%)
- Common structure: Demo-heavy (80%)
- Best quotes: [list with timestamps]
```

**This feeds into:**

- research-topic → Research brief (examples section)
- generate-ideas → Idea Cards (hook inspiration, structure patterns)

---

**For tool documentation, see:** `youtube-transcript-tool.md`
**For analysis patterns, see:** `analysis-patterns.md`
