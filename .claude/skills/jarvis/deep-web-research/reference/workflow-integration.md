# deep-web-research Skill - Workflow Integration

**How this Skill integrates with Jarvis workflows**

---

## Used By Workflows

### 1. research-topic Workflow

**When Invoked:**

- User runs: `/jarvis → research-topic`
- depth parameter is "comprehensive" OR "standard"
- Workflow says: "Conduct deep web research for insights"
- Claude invokes deep-web-research Skill

**Parameters From Workflow:**

- topic: From user input
- depth: "comprehensive" → deep_researcher, "standard" → web_search_exa

**What Skill Returns:**

- Key insights with sources
- Data points and statistics
- Expert quotes
- Case studies
- All with URLs and confidence scores

---

### 2. generate-ideas Workflow

**When Invoked:**

- User runs: `/jarvis → generate-ideas`
- Needs background research on topic
- Workflow says: "Research topic for context"
- Claude invokes deep-web-research Skill

**What It Provides:**

- Market context
- Current trends
- Data for evidence
- Expert perspectives
- Feeds into Idea Card evidence

---

### 3. competitive-analysis Workflow (Optional)

**When Invoked:**

- If user wants company/competitor intelligence
- Workflow says: "Research competitor strategies"
- Claude invokes deep-web-research with company_research

**What It Provides:**

- Company positioning
- Competitor strategies
- Market intelligence
- Industry insights

---

## Works With Other Skills

**Combines With:**

**social-media-research:**

- social-media provides: trends, hashtags, current signals
- deep-web-research provides: comprehensive data, expert analysis
- Together: Complete picture (social + authoritative)

**research-synthesizer:**

- deep-web-research provides: insights category data
- Synthesizer organizes into research brief
- Creates "Data & Statistics" and "Expert Opinions" sections

---

## Output Format

**deep-web-research returns:**

```markdown
# Deep Web Research: {Topic}

## Key Insights ({count})

- {insight_text}
  Source: [{title}]({url}) - {date}
  Confidence: high

## Data & Statistics ({count})

- {stat_text}
  Source: [{title}]({url})

## Expert Quotes ({count})

- "{quote}"
  Attributed to: {expert}
  Source: [{title}]({url})

## Sources ({count} total)

- [{title}]({url}) - {date} - Confidence: high
```

**This feeds into:**

- research-topic → Research brief (data, insights, quotes sections)
- generate-ideas → Evidence for Idea Cards

---

**For tool documentation, see:** `exa-tools.md`
**For research strategies, see:** `research-strategies.md`
