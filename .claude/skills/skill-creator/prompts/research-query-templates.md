# Research Query Templates for Skill Creation

**Purpose:** Generate effective Exa and Firecrawl queries when building research-enhanced skills

---

## Query Generation Strategy

### From Skill Purpose to Research Query

**Pattern:**

```
Skill purpose: "{action} {domain} {specifics}"
↓
Exa query: "{domain} {action} best practices methodologies proven strategies"
```

**Examples:**

**Purpose:** "Create Instagram captions"
**Queries:**

1. "Instagram caption writing best practices engagement formulas"
2. "viral Instagram caption strategies hooks CTAs"
3. "Instagram content creator caption techniques"

**Purpose:** "Analyze Twitter threads"
**Queries:**

1. "Twitter thread structure viral patterns engagement"
2. "thread writing formulas proven tactics"
3. "Twitter thread best practices high engagement"

**Purpose:** "Generate product descriptions"
**Queries:**

1. "product description copywriting frameworks proven formulas"
2. "ecommerce product copy best practices conversion"
3. "product copywriting techniques AIDA PAS"

---

## Query Types

### Type 1: Methodology Discovery

**Goal:** Find named frameworks and proven systems

**Template:**

```
"{domain} methodologies frameworks proven strategies"
```

**Examples:**

- "copywriting methodologies frameworks AIDA PAS"
- "video scripting frameworks retention strategies"
- "thumbnail design methodologies MrBeast patterns"

**Extract:** Named frameworks (AIDA, PAIPS, etc.), structured approaches

---

### Type 2: Best Practices

**Goal:** Find do's, don'ts, guidelines

**Template:**

```
"{domain} best practices guidelines expert tips"
```

**Examples:**

- "LinkedIn posting best practices algorithm 2025"
- "YouTube thumbnail best practices CTR optimization"
- "Twitter thread best practices engagement"

**Extract:** Rules, guidelines, success factors

---

### Type 3: Real-World Examples

**Goal:** Find case studies, successful implementations

**Template:**

```
"{domain} examples successful case studies"
```

**Examples:**

- "viral Instagram captions examples analysis"
- "high-performing YouTube thumbnails case studies"
- "successful Twitter threads breakdown"

**Extract:** Concrete examples, patterns that worked

---

### Type 4: Data & Statistics

**Goal:** Find benchmarks, metrics, research

**Template:**

```
"{domain} statistics data research study"
```

**Examples:**

- "Instagram engagement statistics optimal caption length"
- "YouTube retention data average watch time"
- "LinkedIn post performance data 2025"

**Extract:** Numbers, benchmarks, optimal parameters

---

## Multi-Query Strategy

**For comprehensive skills, use 2-3 queries:**

**Example: Creating skill for LinkedIn posts**

**Query 1 (Methodologies):**
"LinkedIn viral post formulas proven methodologies engagement strategies"

**Query 2 (Best Practices):**
"LinkedIn content best practices algorithm 2025 posting guidelines"

**Query 3 (Data):**
"LinkedIn engagement statistics optimal post length hashtags"

**Synthesize:** Combine findings from all 3 into skill

---

## Firecrawl Integration

### When to Use Firecrawl

**After Exa search:**

1. Exa returns 10 results
2. Review titles/descriptions
3. Select top 2-3 most relevant
4. Firecrawl scrape those URLs
5. Extract detailed content

### What to Extract

**From scraped pages:**

- Step-by-step methodologies
- Named frameworks (AIDA, PAIPS, etc.)
- Specific guidelines (length, format, structure)
- Examples and samples
- Statistics and benchmarks
- Expert quotes

### Scraping Parameters

**Use:**

```python
mcp__firecrawl__firecrawl_scrape(
    url=top_result_url,
    formats=["markdown"],
    onlyMainContent=true
)
```

**Extract clean content only, skip navigation/ads**

---

## Synthesis Process

### After Research Complete

**Organize findings into:**

**1. Methodologies**

- Named frameworks discovered
- Step-by-step processes
- Proven patterns

**2. Best Practices**

- Do's and don'ts
- Guidelines
- Success factors
- Common mistakes to avoid

**3. Parameters**

- Optimal lengths (words, characters)
- Timing recommendations
- Quantitative benchmarks
- Statistical insights

**4. Examples**

- Real-world samples
- Template patterns
- Before/after comparisons

**5. Sources**

- All URLs
- Author/publication info
- Credibility assessment

---

## Incorporating Research into Skills

### SKILL.md Structure (Researched)

```markdown
## Methodologies

### {Framework 1} (Source: {url})

{explanation from research}

### {Framework 2} (Source: {url})

{explanation from research}

## Best Practices

Based on research from {source_count} sources:

- {practice 1}
- {practice 2}
- {practice 3}

## Parameters

Optimal settings from industry data:

- Length: {optimal-length} (Source: {url})
- Timing: {optimal-timing} (Source: {url})
- Format: {optimal-format}

## Examples

{examples from research or synthesized}
```

### reference/ Files (Detailed)

**reference/methodology.md:**

```markdown
# {Domain} Methodologies

## {Framework 1}

**Source:** {url}
**Author:** {expert-name}
**Date:** {publication-date}

{full detailed explanation}

### Application

{how to apply}

### Examples

{examples}

---

## {Framework 2}

{repeat pattern}
```

**reference/sources.md:**

```markdown
# Research Sources

## High Credibility

1. **{Title}** - {URL}
   - Author: {name}
   - Published: {date}
   - Key findings: {summary}

## Medium Credibility

{sources}

## References

{additional sources}
```

---

## Example Queries by Domain

### Content Creation

**Instagram Captions:**

- "Instagram caption writing viral formulas engagement hooks"
- "Instagram content creator caption best practices"
- "viral Instagram caption examples analysis"

**YouTube Scripts:**

- "YouTube video scripting retention strategies proven tactics"
- "YouTube script writing hooks viewer retention"
- "successful YouTube creator script analysis"

**LinkedIn Posts:**

- "LinkedIn viral post formulas engagement strategies"
- "LinkedIn content best practices algorithm 2025"
- "high-performing LinkedIn posts analysis"

---

### Marketing & Growth

**SEO:**

- "SEO optimization methodologies proven strategies"
- "search engine optimization best practices 2025"
- "SEO content guidelines Google algorithm"

**Email Marketing:**

- "email marketing copywriting proven formulas"
- "email campaign best practices conversion strategies"
- "high-converting email examples analysis"

---

### Technical Domains

**Code Review:**

- "code review best practices methodologies checklists"
- "effective code review guidelines proven approaches"
- "code review standards industry practices"

**API Design:**

- "REST API design best practices proven patterns"
- "API design guidelines industry standards"
- "well-designed API examples analysis"

---

## Quality Standards

### Research Quality

**High-quality sources:**

- Official documentation (.edu, official docs)
- Expert practitioners (verified creators)
- Data-backed studies (statistics, research)
- Recent content (2024-2025)

**Avoid:**

- Generic blog spam
- Outdated content (2020 or older)
- Unverified claims
- Thin content

### Synthesis Quality

**Good synthesis:**

- Combines multiple source perspectives
- Identifies common patterns across sources
- Notes disagreements and trade-offs
- Provides context and reasoning
- Cites sources clearly

**Bad synthesis:**

- Copy-paste from one source
- No attribution
- Conflicting advice without explanation
- No context

---

## Token Optimization

### Research Phase

**Exa search:** ~15 tokens per query (search metadata)
**Exa results:** ~1000 tokens for 10 results (titles/snippets)
**Firecrawl scrape:** ~3000-8000 tokens per page (full content)

**Strategy:** Scrape only top 2-3 most relevant pages

### Skill Generation

**Keep SKILL.md lean:** 2000-5000 tokens
**Move details to references:** Load on-demand
**Total at skill creation:** ~10,000-15,000 tokens
**Total when skill used:** 2,000-8,000 tokens (progressive disclosure!)

---

## Research Examples

### Example 1: Instagram Captions Skill

**Research queries:**

1. "Instagram caption best practices engagement formulas"
2. "viral Instagram caption structure hooks CTAs"

**Exa findings:**

- Hook importance (first 125 chars)
- Optimal length (600-1200 chars)
- Hashtag strategy (5-10 optimal)
- CTA patterns (questions perform best)
- Emoji usage (2-5 strategic placement)

**Firecrawl scrape (top 2):**

- Later.com: Complete caption guide
- Hootsuite: Viral caption analysis

**Synthesized into skill:**

- Instructions with researched formulas
- reference/caption-formulas.md (detailed)
- examples/viral-caption-breakdown.md (real examples)

**Citations:** 8 sources referenced

---

### Example 2: Financial Analysis Skill

**Research queries:**

1. "financial ratio analysis methodologies proven frameworks"
2. "financial statement analysis best practices"

**Exa findings:**

- Key ratios (P/E, ROE, D/E, etc.)
- Industry benchmarks
- Analysis frameworks (DuPont, etc.)

**Firecrawl scrape:**

- Investopedia: Ratio definitions
- CFA Institute: Analysis methodology

**Synthesized into skill:**

- Instructions with ratio calculations
- reference/financial-ratios.md (formulas)
- scripts/ratio-calculator.py (executable)
- examples/analysis-sample.md

**Citations:** 6 authoritative sources

---

## When to Research vs Template

### Research First (Mode 2):

**Domains:**

- Content creation (posts, scripts, captions)
- Marketing (SEO, email, ads)
- Creative (design, writing, video)
- Domain-specific expertise
- User explicitly requests research

**Indicators:**

- Methodologies exist (AIDA, PAIPS, etc.)
- Best practices documented online
- Expert practitioners sharing insights
- Data available (engagement stats, benchmarks)

---

### Template is Fine (Mode 1):

**Domains:**

- File operations (read, write, format)
- Data transformations (JSON, CSV, XML)
- Simple utilities (extract, validate, convert)
- Well-understood tasks
- No specialized knowledge needed

**Indicators:**

- Straightforward technical task
- No "best practices" to research
- User wants quick creation
- Generic programming task

---

## Summary

**Research-enhanced skills:**

- Use Exa + Firecrawl
- Find proven methodologies
- Incorporate real-world best practices
- Cite authoritative sources
- Higher quality output

**Template-based skills:**

- Fast creation
- Good for simple tasks
- User provides knowledge
- No external research needed

**skill-creator supports BOTH!**
