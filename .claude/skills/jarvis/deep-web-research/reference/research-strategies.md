# deep-web-research - Research Strategies

**When and how to use exa tools effectively**

---

## Strategy 1: Quick Web Search (Standard Research)

**When to use:**

- Standard topics
- Need results fast (3-5 seconds)
- Budget-conscious
- Getting started on topic

**Tool:** web_search_exa

**Parameters:**

```
query: "{topic} {year}" (include year for recency)
numResults: 10 (standard)
livecrawl: "fallback" (use index first, crawl if needed)
```

**Best practices:**

- Include year in query for recent results
- Be specific: "AI automation market 2024" vs "automation"
- Use quotes for exact phrases: "AI infrastructure spending"

---

## Strategy 2: Deep Research (Comprehensive Analysis)

**When to use:**

- Complex topics
- Need expert insights
- Market analysis
- Willing to wait + pay more

**Tool:** deep_researcher_start → deep_researcher_check

**Process:**

```
1. Start: deep_researcher_start(topic)
2. Wait: 30-60 seconds
3. Check: deep_researcher_check(researchId)
4. Get: insights, dataPoints, expertQuotes, sources
```

**Best practices:**

- Allow full 60 seconds for processing
- Topic should be specific but not too narrow
- Good for: "AI infrastructure investment trends" not "AI"

---

## Strategy 3: Company Intelligence

**When to use:**

- Researching competitors
- Company strategies
- Market positioning
- Industry players

**Tool:** company_research

**Query patterns:**

```
"{CompanyName} strategy"
"{Topic} companies"
"{Industry} major players"
```

---

## Source Quality Assessment

**From exa results, assess:**

**High Confidence:**

- .edu domains (research papers)
- Major tech publications (TechCrunch, VentureBeat, Wired)
- Industry reports (Gartner, McKinsey)
- Official company blogs
- Recent (last 3 months)

**Medium Confidence:**

- Tech blogs
- Medium articles from verified authors
- GitHub discussions
- Recent (3-6 months)

**Low Confidence:**

- Personal blogs
- Old articles (> 6 months for fast-moving topics)
- No author attribution
- Questionable sources

---

## Data Extraction Patterns

**From web_search_exa results:**

**1. Extract Key Points:**

```
For each result:
- Read title + snippet
- Identify 2-3 main points
- Note publication date
- Assess source credibility
```

**2. Find Data/Stats:**

```
Look for:
- Numbers with context: "45% growth", "$50B investment"
- Comparisons: "3x increase from 2023"
- Projections: "Expected to reach $100B by 2026"
```

**3. Expert Quotes:**

```
Attributed statements:
- "As [Expert] noted..."
- "[Company] CEO stated..."
- "According to [Report]..."
```

---

## Deep Research Output Organization

**From deep_researcher results:**

### Category 1: Key Insights

```
- Main findings from AI analysis
- Strategic trends
- Market shifts
- Source all claims
```

### Category 2: Data & Statistics

```
- Hard numbers
- Growth rates
- Market sizes
- Projections
- Source all data
```

### Category 3: Expert Opinions

```
- Attributed quotes
- Industry perspectives
- Company positions
- Analyst views
```

### Category 4: Sources

```
- All URLs
- Publication dates
- Source credibility scores
- Relevance scores
```

---

## Optimization Tips

**To reduce costs:**

1. Use web_search_exa first ($0.05-0.10)
2. Only use deep_researcher if need more ($0.20-0.50)
3. Cache results for 30 days
4. Combine related searches

**To improve results:**

1. Be specific in queries
2. Include time range in topic
3. Check source recency
4. Validate data from multiple sources

---

**For tool reference, see:** `exa-tools.md`
**For workflow integration, see:** `workflow-integration.md`
