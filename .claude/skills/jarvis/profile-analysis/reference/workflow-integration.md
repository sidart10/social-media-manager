# profile-analysis Skill - Workflow Integration

**How this Skill integrates with Jarvis workflows**

---

## Used By Workflows

### 1. analyze-profile Workflow

**Location:** `bmad/agents/content-intelligence/jarvis-sidecar/workflows/analyze-profile/`

**When Invoked:**

- User runs: `/jarvis → analyze-profile`
- Provides profile URL
- Workflow detects platform
- Invokes profile-analysis Skill

**What Skill Does:**

1. Platform detection (Instagram, TikTok, Twitter, etc.)
2. Actor selection (appropriate scraper)
3. Cost calculation
4. User approval
5. Scraping execution
6. Pattern analysis
7. Cost logging

**Returns:**

- Profile summary
- Top performers
- Content patterns
- Recommendations

---

### 2. learn-voice Workflow

**When Invoked:**

- User runs: `/jarvis → learn-voice`
- Provides their OWN profile URLs
- Workflow needs to fetch user's posts
- Invokes profile-analysis Skill

**What Skill Does:**

1. Detect it's user's account (cost optimization)
2. Fetch posts via apify
3. Return post texts for voice analysis

**Note:** Skill doesn't analyze patterns here, just fetches posts for voice-matcher Skill

---

### 3. competitive-analysis Workflow

**When Invoked:**

- User runs: `/jarvis → competitive-analysis`
- Provides multiple profile URLs (yours + competitors)
- Workflow orchestrates multiple profile analyses

**What Skill Does:**

- Gets invoked MULTIPLE times (once per profile)
- Each invocation independent
- All costs tracked separately
- Results compared by workflow

---

## Output Format

**What profile-analysis returns:**

```markdown
# Profile Analysis: @{username}

**Platform:** {platform}
**Posts Analyzed:** {count}
**Cost:** ${amount}

## Profile Overview

- Followers: {count}
- Posting frequency: {per_week}/week

## Content Strategy

### Content Mix

- Text: {percent}%
- Image: {percent}%
- Video: {percent}%

### Top Topics

1. {topic} ({count} posts, {engagement} avg)

### Hook Patterns

- Question: {percent}%
- Number: {percent}%

### What Works

- Top format: {format} ({lift}x engagement)
- Top topic: {topic}
- Best time: {day} at {time}

## Top Performers

[Top 10 posts with URLs and metrics]

## Recommendations

[5-7 actionable recommendations with evidence]
```

---

## Integration with Other Skills

**Feeds into:**

- **research-synthesizer:** Profile patterns become research findings
- **evidence-tracker:** All posts tracked as sources
- **voice-matcher:** Posts analyzed for voice profile (if user's account)

**Works with:**

- **cost tracking:** All apify calls logged
- **evidence tracking:** All post URLs preserved

---

**For complete tool documentation, see:** `apify-tools.md`
**For usage examples, see:** `usage-examples.md`
**For cost details, see:** `cost-examples.md`
