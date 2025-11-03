# NOTION CONTENT WORKFLOW SYSTEM

**Created:** October 30, 2025
**Purpose:** Complete operational guide for managing 30-40 pieces/week using Notion as hub
**Status:** Ready to implement

---

## SYSTEM OVERVIEW

**The Complete Pipeline:**

```
Notion (Source of Truth)
    ↓
Jarvis (Orchestrator) ← Reads queue, generates content, updates status
    ↓
├─ AI Video Agent (Video production)
├─ AI Image Generator (Visual creation)
└─ Social Posting Agent (Publishing)
    ↓
Performance Data → Back to Notion
```

**Key Principle:** Notion is the control panel. Everything flows through it.

---

## NOTION DATABASE ARCHITECTURE

### Existing Structure (Already Built)

**Primary Database:** Content Tracker [DB]
**URL:** https://www.notion.so/49d227f4b5c448598c640632ffaf1f52

**Core Fields (Already Exist):**

- Name (title) - Content title
- Status (status) - Workflow stage
- Channel (relation) - Platform (Twitter, LinkedIn, YouTube, etc.)
- Category (select) - Tech Insights, AI Products, Career Development, Immigrant Support, Personal Efficiency
- Priority (select) - ⭐ Priority 1 through 5th
- Publish Date (date) - Scheduled posting time
- Content Text (text) - The actual post/script content
- Description (text) - Brief summary
- Views, Likes, Comments (number) - Performance metrics
- View Performance (select) - Great, Good, Okay, Poor

### NEW Fields to Add (Required for This Workflow)

Add these to Content Tracker database:

1. **Post Type** (Select)
   - Options: Thread, Long-form Post, Short Post, Video Script, Carousel, Image Post
   - Purpose: Determines which Jarvis skill to use

2. **Voice Mode** (Select)
   - Options: Lowercase Builder-Philosopher, Analyst, Deadpan Critic, Community Protector, Enthusiast
   - Purpose: Maintains voice consistency per platform

3. **Topic Trend** (Select)
   - Options: HIGH, MEDIUM, LOW
   - Purpose: Prioritize timely vs evergreen content

4. **Research Source** (URL)
   - Purpose: Link to research brief that generated this idea
   - Example: `/outputs/11-03-2025/agent-platform-research/`

5. **Cost Tracked** (Number)
   - Purpose: API cost transparency (Exa, Apify, etc.)
   - Example: 0.05 for Exa search

### Mapping Your 7 Content Pillars to Existing Categories

**Your Pillars → Notion Categories:**

| Content Pillar      | Maps To Category   | Notes                           |
| ------------------- | ------------------ | ------------------------------- |
| AI Agents           | AI Products        | Core AI product focus           |
| AI Tooling          | AI Products        | Tool comparisons, reviews       |
| Building with AI    | Tech Insights      | Builder experience, coding      |
| Anthropic Deep-Dive | AI Products        | Lab-specific analysis           |
| PM Strategy         | Career Development | PM insights, frameworks         |
| Future of AI        | Tech Insights      | Predictions, strategic analysis |
| H-1B/Immigration    | Immigrant Support  | Community protection content    |

**Note:** Your existing categories work well. No changes needed.

---

## MCP SERVER SETUP

### Step 1: Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name: "Jarvis Content Agent"
4. Capabilities: ✅ Read content, ✅ Update content, ✅ Insert content
5. Copy API key (starts with `ntn_...`)

### Step 2: Share Databases with Integration

1. Open your Content Tracker database
2. Click "Share" (top right)
3. Add "Jarvis Content Agent" integration
4. Permission: Full access

### Step 3: Configure MCP Server

Add to your MCP config file (location varies by Claude client):

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "ntn_YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Step 4: Test Connection

Ask Jarvis to:

```
"Search Notion for content with Status = Idea"
```

Should return list of entries. If error, check:

- API key correct?
- Integration added to database?
- MCP server restarted after config change?

---

## DAILY OPERATIONAL WORKFLOW

### SUNDAY: PLANNING DAY (4-6 hours)

**Morning Session (9 AM - 12 PM): Hub Content Creation**

1. **Research Phase**

```
Sid: "Research this week's topic: AI Agent Platforms"
```

Jarvis actions:

- Loads `deep-web-research` skill
- Triggers Exa searches (15 results, livecrawl)
- Estimates cost: ~$0.15
- Sid approves
- Generates research brief
- Saves: `outputs/{date}/agent-platform-research/research-brief.md`
- Returns: "Research complete. 30 sources analyzed. Ready to write."

2. **Substack Writing Phase**

```
Sid: "Write the Substack newsletter from this research"
```

Jarvis actions:

- Loads `post-writer` skill (auto-detects Substack long-form)
- Loads voice profile (Analyst mode for depth)
- References research brief
- Generates 2000-word article with:
  - Hook (first 100 words)
  - Framework/structure (numbered sections)
  - Evidence (cited sources)
  - Specific data (from research)
  - CTA (subscribe, share)
- Saves: `outputs/{date}/substack-agent-platforms.md`

3. **Notion Entry for Substack**

Jarvis auto-creates in Notion:

```javascript
notion.createPage({
  database_id: "Content Tracker",
  properties: {
    Name: "I Tested All 3 AI Agent Platforms - Here's What Works",
    Status: "Writing",
    Channel: [Substack relation],
    "Post Type": "Newsletter",
    Category: "AI Products",
    Priority: "⭐ Priority 1",
    "Publish Date": "2025-11-03 18:00",  // Sunday 6 PM
    Description: "Deep comparison of AgentKit, Claude SDK, Vertex AI",
    "Topic Trend": "HIGH",
    "Voice Mode": "Analyst",
    "Research Source": "outputs/11-03-2025/agent-platform-research/",
    "Cost Tracked": 0.15  // Exa research cost
  }
})
```

Sid reviews:

- Opens Notion entry
- Reads generated content
- Edits in "Content Text" field (or copies to Substack editor)
- Publishes to Substack manually
- Updates Status: Writing → Posted

---

**Afternoon Session (1 PM - 4 PM): Spoke Content Generation**

4. **Idea Generation Phase**

```
Sid: "Generate 35 content ideas from this Substack for the week"
```

Jarvis actions:

- Loads `research-synthesizer` skill
- Analyzes Substack article
- Identifies 7 key themes:
  - AgentKit deep-dive
  - Claude SDK comparison
  - Google Vertex AI analysis
  - Cost comparison across platforms
  - Production deployment reality
  - Strategic implications for PMs
  - When to use which platform

- For each theme, generates 5 formats:
  - 1 Twitter thread (tutorial/breakdown)
  - 2 Twitter posts (1 long-form analysis, 1 short lowercase)
  - 1 LinkedIn post (professional analysis)
  - 1 Video script (60s explainer)

- Total: 35 Idea Cards generated
- Saves: `outputs/11-03-2025/week1-idea-cards.json`

5. **Notion Batch Population**

```
Sid: "Create all 35 entries in Notion for the week"
```

Jarvis actions:

- Reads Idea Cards JSON
- For each idea, creates Notion page via MCP:

**Example Entry (Twitter Thread - Monday):**

```javascript
{
  Name: "AgentKit Setup Experience: First Impressions",
  Status: "Idea",  // Will change to "Next Up" after sid reviews
  Channel: "Twitter",
  "Post Type": "Thread",
  Category: "AI Products",
  Priority: "⭐ Priority 1",
  "Publish Date": "2025-11-04 08:30",  // Monday 8:30 AM
  Description: "Thread about AgentKit setup, first agent built, comparison to manual SDK",
  "Topic Trend": "HIGH",
  "Voice Mode": "Lowercase Builder-Philosopher",
  "Research Source": "outputs/11-03-2025/agent-platform-research/"
}
```

**Example Entry (LinkedIn Post - Monday):**

```javascript
{
  Name: "AI Agent Platforms: Strategic Implications for PMs",
  Status: "Idea",
  Channel: "LinkedIn",
  "Post Type": "Long-form Post",
  Category: "Career Development",
  Priority: "⭐ Priority 1",
  "Publish Date": "2025-11-04 09:00",  // Monday 9 AM
  Description: "Analysis of agent platform choices and product strategy implications",
  "Topic Trend": "HIGH",
  "Voice Mode": "Analyst",
  "Research Source": "outputs/11-03-2025/agent-platform-research/"
}
```

- Creates all 35 entries
- Returns: "Week 1 calendar populated in Notion. 35 entries created."

6. **Sid Review & Prioritization**

Sid opens Notion:

- Views "Content Ideas" (Status = Idea, sorted by Publish Date)
- Reviews all 35 entries
- Adjusts:
  - Priorities (if some should publish before others)
  - Publish dates (if spacing needs adjustment)
  - Categories (if miscategorized)
- Marks Monday's content as "Next Up" (signals ready for generation)

---

**Evening Session (6 PM - 8 PM): Substack Notes**

7. **Daily Notes Generation**

```
Sid: "Write 4 Substack Notes from the newsletter for today"
```

Jarvis actions:

- Extracts 4 quotable insights from Substack
- Formats as Twitter-style short posts
- Casual voice (lowercase), hooks
- Saves: `outputs/11-03-2025/substack-notes/note-{1-4}.md`

Sid posts manually to Substack Notes (no API available)

---

### MONDAY-SATURDAY: EXECUTION DAYS (2-3 hours/day)

**Morning Routine (8:00 AM - 10:00 AM)**

1. **Sid Opens Notion "Today's Content" View**

**Custom View Settings:**

- Filter:
  - Publish Date = Today
  - Status = Next Up
- Sort: Priority (ascending), then Publish Time
- Display: Name, Status, Post Type, Channel, Voice Mode, Description

**What Sid Sees (Monday Example):**

| Name                        | Status  | Post Type  | Channel  | Time    | Voice Mode        | Priority |
| --------------------------- | ------- | ---------- | -------- | ------- | ----------------- | -------- |
| AgentKit Setup Experience   | Next Up | Thread     | Twitter  | 8:30 AM | Lowercase Builder | ⭐       |
| Agent Platforms for PMs     | Next Up | Long-form  | LinkedIn | 9:00 AM | Analyst           | ⭐       |
| i am locked in this week    | Next Up | Short Post | Twitter  | 2:15 PM | Lowercase Builder | 2nd      |
| success belongs to obsessed | Next Up | Short Post | Twitter  | 6:00 PM | Lowercase Builder | 2nd      |

2. **For Each Piece, Sid Triggers Generation**

**Example A: Twitter Thread (8:30 AM post)**

```
Sid: "Write the AgentKit Setup Experience thread"
```

Jarvis workflow:

- Reads Notion entry via MCP (gets Description, Voice Mode, Research Source)
- Loads `post-writer` skill
- Skill auto-routes to `prompts/twitter-thread.md`
- Applies Lowercase Builder-Philosopher voice
- References research brief
- Generates 6-tweet thread:

```markdown
Tweet 1 (Hook):
just spent 3 hours with agentkit. here's what nobody is telling you

Tweet 2:
setup was smooth. npm install, api key, done in 2 min. docs actually good (rare W for openai)

Tweet 3:
built a research agent that scrapes + summarizes in 45 min. raw sdk would have taken 3+ hours

Tweet 4:
but here's the problem: too much abstraction. debugging is hell when it breaks. spent 30min on context window error

Tweet 5:
comparison: claude sdk = more control, agentkit = more speed. pick based on what you're building

Tweet 6:
verdict: A-tier for prototypes, C-tier for production. validate ideas fast, rebuild with control if it works
```

- Updates Notion via MCP:

```javascript
notion.updatePage({
  page_id: "abc123",
  properties: {
    Status: "Editing",  // Ready for sid review
    "Content Text": [full thread text],
    "Cost Tracked": 0.00  // No API costs
  }
})
```

- Saves file: `outputs/11-04-2025/twitter-agentkit-thread.md`
- Returns to sid: "Thread ready! Review in Notion Content Text field."

3. **Sid Reviews in Notion**

- Opens entry "AgentKit Setup Experience"
- Reads "Content Text" field
- Makes edits:
  - Tweet 2: Changes "rare W" to "actually helpful"
  - Tweet 4: Adds more detail about error
- Satisfied with content
- Changes Status: Editing → Posted (ready to publish)

4. **Sid Publishes**

**Option A: Manual**

- Copies thread from Notion
- Posts to Twitter manually
- Adds Twitter URL to Notion

**Option B: Via Social Posting Agent**

```
Sid: "Post the AgentKit thread to Twitter"
```

Social Posting Agent:

- Reads content from Notion (via MCP or from file)
- Uses `twitter-api-client` module
- Validates: Each tweet under 280 chars (or 25k for Premium long-form)
- Posts thread (tweet 1, then reply 2, reply 3, etc.)
- Returns post IDs + URL
- Updates Notion:
  - Status: Posted (if not already)
  - Adds Twitter URL field (if exists)
  - Logs: `outputs/11-04-2025/posted/twitter-thread-abc123.json`

**Example B: LinkedIn Post with Carousel (9:00 AM post)**

```
Sid: "Write the LinkedIn post and create carousel for 'Agent Platforms for PMs'"
```

Jarvis workflow:

- Reads Notion entry (Description: "Analysis of agent platform choices...")
- Loads `post-writer` skill → LinkedIn template
- Applies Analyst voice
- Generates 1900-character post:

```markdown
The AI agent platform race just got real. Here's why product leaders should care.

OpenAI, Anthropic, and Google all launched agent-building platforms within days of each other.

This isn't coincidence - it's a land grab for developer mindshare.

Three strategic implications:

1. Abstraction wars
   AgentKit abstracts heavily (fast prototypes, limited control).
   Claude SDK provides granular control (slower setup, production-ready).
   Vertex AI leverages Google Cloud ecosystem (enterprise lock-in).

Your choice now dictates product architecture.

2. Cost structures vary significantly
   AgentKit: Pay-per-token on GPT-5
   Claude SDK: Flat API pricing
   Vertex AI: Enterprise contracts

Pricing isn't just a feature - it's your moat or your vulnerability.

3. Platform stickiness
   Once you build on one, switching is expensive.
   This is the new cloud platform decision.

The takeaway: Choose based on your product's control vs speed tradeoff. If you're validating, go AgentKit. If you're scaling, Claude SDK. If you're enterprise, Vertex AI.

What platform are you choosing?
```

- Saves: `outputs/11-04-2025/linkedin-strategic-implications.md`
- Updates Notion: Status → Editing, Content Text → [post]

**Sid decides to add carousel:**

```
Sid: "Create a 5-slide carousel for this LinkedIn post"
```

Jarvis workflow:

- Creates handoff package:

```json
{
  "content_type": "image_request",
  "ready_for_agent": "ai-image-generator",
  "notion_entry_id": "def456",
  "requirements": {
    "platform": "linkedin",
    "image_type": "carousel",
    "count": 5,
    "design_system": "linkedin-dark-monochrome",
    "slides": [
      {
        "slide": 1,
        "title": "AI Agent Platform Comparison",
        "content": "AgentKit vs Claude SDK vs Vertex AI"
      },
      {
        "slide": 2,
        "title": "Abstraction Levels",
        "content": "High Control ← → Fast Prototyping"
      },
      {
        "slide": 3,
        "title": "Cost Models",
        "content": "Pay-per-token vs Flat vs Enterprise"
      },
      {
        "slide": 4,
        "title": "Platform Lock-In",
        "content": "Switching costs after commitment"
      },
      {
        "slide": 5,
        "title": "Decision Framework",
        "content": "Validate → AgentKit, Scale → Claude, Enterprise → Vertex"
      }
    ]
  },
  "from_jarvis": {
    "post_content": [full LinkedIn text],
    "platform_specs": {
      "aspect_ratio": "1:1",
      "dimensions": "1080x1080",
      "format": "PNG"
    }
  }
}
```

- Saves: `outputs/11-04-2025/handoff-to-image-agent.json`
- Returns: "Handoff created. Triggering AI Image Generator..."

**Sid triggers AI Image Generator:**

```
Sid: "/ai-image-generator *carousel"
```

AI Image Generator workflow:

- Reads handoff package
- Loads `linkedin-design` skill (dark monochrome system)
- Loads `create-image` skill (Emily JSON methodology)
- For each slide:
  - Generates structured prompt using `mcp-tool-selection` skill
  - Calls `nanobanana` MCP (generate_image)
  - Applies LinkedIn specs (1080x1080, professional aesthetic)
- Generates 5 images
- Saves: `outputs/11-04-2025/images/linkedin-carousel-{1-5}.png`
- Creates handoff for Social Posting Agent
- Returns: "Carousel complete! 5 images saved. Review before posting."

Sid reviews images, approves

**Sid publishes:**

```
Sid: "Post to LinkedIn with carousel"
```

Social Posting Agent:

- Reads handoff package (has text + image paths)
- Validates: Text under 3000 chars ✓, 5 images (2-20 range) ✓
- Posts via LinkedIn API
- Updates Notion: Status → Posted
- Returns URL

**10:00 AM - Morning session complete**

Sid published:

- 1 Twitter thread
- 1 LinkedIn carousel post

Time: 2 hours (including coffee, reviews)

---

**Afternoon Session (1 PM - 4 PM): Idea Generation**

5. **Content Atomization**

```
Sid: "Generate 35 content ideas from this Substack for the week"
```

Jarvis actions:

- Loads `research-synthesizer` skill
- Analyzes Substack article (2000 words)
- Identifies 7 key themes
- For each theme, creates 5 formats:
  - Thread (tutorial/breakdown)
  - Long-form post (analysis)
  - Short post (lowercase philosophy/take)
  - LinkedIn post (professional angle)
  - Video script OR Substack Note

**Example Idea Card:**

```json
{
  "title": "The Agent Platform Cost Comparison",
  "format": "Long-form Post",
  "platform": "Twitter",
  "scheduled_date": "2025-11-05 14:15",
  "category": "AI Products",
  "tier": "2nd Priority",
  "voice_mode": "Analyst",
  "summary": "Break down actual costs of running agents on each platform with real usage data",
  "research_source": "outputs/11-03-2025/agent-platform-research/",
  "estimated_cost": 0.0
}
```

- Generates 35 Idea Cards
- Saves: `outputs/11-03-2025/week1-idea-cards.json`

6. **Notion Batch Population**

```
Sid: "Create all 35 Notion entries for Week 1"
```

Jarvis actions via MCP:

- For each Idea Card, creates Notion page
- Spreads across Mon-Sat (6 days × 6 pieces/day ≈ 36 total)
- Distribution:
  - Monday: 7 pieces (thread, 2 posts, LinkedIn, Note)
  - Tuesday: 6 pieces (thread, 2 posts, LinkedIn, Video script, Note)
  - Wednesday: 6 pieces
  - Thursday: 6 pieces
  - Friday: 6 pieces (+ 1 video script)
  - Saturday: 4 pieces (lighter day)

Example Notion create:

```javascript
for (const idea of ideaCards) {
  await notion.createPage({
    database_id: contentTrackerDB,
    properties: {
      Name: { title: [{ text: { content: idea.title } }] },
      Status: { status: { name: 'Idea' } },
      Channel: { relation: [{ id: getChannelId(idea.platform) }] },
      'Post Type': { select: { name: idea.format } },
      Category: { select: { name: idea.category } },
      Priority: { select: { name: idea.tier } },
      'Publish Date': {
        date: {
          start: idea.scheduled_date,
          time_zone: 'America/New_York',
        },
      },
      Description: { rich_text: [{ text: { content: idea.summary } }] },
      'Topic Trend': { select: { name: 'HIGH' } },
      'Voice Mode': { select: { name: idea.voice_mode } },
      'Research Source': { url: idea.research_source },
      'Cost Tracked': { number: idea.estimated_cost },
    },
  });
}
```

- Returns: "35 entries created in Notion. Week 1 calendar ready."

7. **Sid Final Review**

Sid in Notion:

- Switches to Calendar view (by Publish Date)
- Sees Week 1 visualized (Mon-Sat with 6 pieces each day)
- Adjustments:
  - Moves 1 low-priority piece from Monday to Friday
  - Changes 2 pieces from "Idea" to "Next Up" for Monday
  - Adds personal note to Tuesday's builder update
- Ready to execute Week 1

---

### MONDAY-SATURDAY: DAILY EXECUTION (Detailed)

**Monday Morning (8:00 AM)**

1. **Sid Opens "Today's Content" Notion View**

Shows 7 pieces scheduled for Monday, filtered by Status = Next Up

2. **High-Priority Item: Twitter Thread (8:30 AM publish)**

```
Sid: "Write the AgentKit Setup Experience thread"
```

Jarvis reads from Notion via MCP:

```javascript
const entry = await notion.getPage({ page_id: 'abc123' });
const context = {
  title: entry.properties.Name.title[0].text.content,
  description: entry.properties.Description.rich_text[0].text.content,
  voiceMode: entry.properties['Voice Mode'].select.name,
  researchSource: entry.properties['Research Source'].url,
};
```

Jarvis generates thread (process described earlier)

Jarvis updates Notion:

```javascript
await notion.updatePage({
  page_id: 'abc123',
  properties: {
    Status: { status: { name: 'Editing' } },
    'Content Text': { rich_text: [{ text: { content: generatedThread } }] },
  },
});
```

**8:15 AM - Sid Reviews**

- Opens Notion entry
- Sees "Content Text" field populated
- Reads thread, makes 2 small edits
- Changes Status: Editing → Posted

**8:25 AM - Sid Publishes**

```
Sid: "Post the AgentKit thread to Twitter at 8:30 AM"
```

Social Posting Agent:

- Waits until 8:30 AM (scheduled time)
- Posts thread
- Updates Notion: Adds Twitter URL
- Logs publish event

3. **LinkedIn Post (9:00 AM)**

Process repeats for LinkedIn post:

- Jarvis generates
- Sid reviews in Notion
- Social Posting Agent publishes
- Notion updated

**9:30 AM - Morning Complete**

Published: 2 pieces (Thread + LinkedIn)
Time: 1.5 hours (30 min per piece including review)

---

**Afternoon Routine (2:00 PM - 4:00 PM)**

4. **Remaining Daily Content**

Sid continues process for:

- Twitter long-form post (2:15 PM)
- Substack Note (4 PM)

**6:00 PM - Evening Shorts**

Quick lowercase posts (minimal review needed):

- "i am locked in this week"
- "success belongs to the obsessed"

Generated + posted in 15 minutes

**End of Monday:**

- Total published: 7 pieces
- Time invested: 2.5 hours
- Notion entries: All marked "Posted" with publish times

---

**Tuesday Morning (Video Day)**

**Special case: Video script needs production**

```
Sid: "Write the 60-second Agent Platform Demo script"
```

Jarvis:

- Loads `video-script-writer` skill
- Generates complete script with timing, visuals
- Saves: `outputs/11-05-2025/video-script-agent-demo.md`
- Creates handoff package for AI Video Agent
- Updates Notion: Status → Ready for Video Production

```
Sid: "Create the video"
Sid: "/ai-video-agent *create-talking-head"
```

AI Video Agent:

- Reads script
- HeyGen talking head (sid's avatar) + Veo b-roll
- Renders video (5 min async)
- Saves: `outputs/11-05-2025/videos/agent-demo-60s.mp4`
- Creates handoff for Social Posting Agent

```
Sid: "Post video to YouTube Shorts, Instagram Reels, and TikTok"
Sid: "/social-posting-agent *multi-platform-video"
```

Social Posting Agent:

- Uploads to all 3 platforms
- Different captions per platform (adjusted for audience)
- Updates Notion entries (3 separate entries for each platform)
- Returns 3 URLs

**Video publishing adds ~30 minutes to Tuesday's workflow**

---

**Performance Tracking (24 Hours After Publish)**

**Tuesday Evening (Track Monday's Posts)**

Automated process (can be triggered by sid or scheduled):

```
Sid: "Update metrics for yesterday's posts"
```

Jarvis workflow:

- Queries Notion: Status = Posted, Publish Date = Yesterday
- For each entry:
  - Fetches platform metrics via API:
    - Twitter: Impressions, Likes, Retweets, Replies
    - LinkedIn: Views, Likes, Comments, Shares
  - Calculates engagement rate: (Likes + Comments) / Views
  - Determines View Performance:
    ```javascript
    if (views > 2000) performance = 'Great';
    else if (views > 1000) performance = 'Good';
    else if (views > 500) performance = 'Okay';
    else performance = 'Poor';
    ```
  - Updates Notion entry with metrics

Example update:

```javascript
notion.updatePage({
  page_id: 'abc123', // Monday's thread
  properties: {
    Views: { number: 1250 },
    Likes: { number: 42 },
    Comments: { number: 8 },
    'View Performance': { select: { name: 'Good' } },
  },
});
```

---

### SUNDAY EVENING: WEEKLY PERFORMANCE ANALYSIS

**After Week 1 Ends (Sunday Nov 10)**

```
Sid: "Analyze Week 1 performance and create insights report"
```

Jarvis workflow:

1. **Query Notion for Week 1 Data**

```javascript
const week1Posts = await notion.queryDatabase({
  database_id: 'Content Tracker',
  filter: {
    and: [
      { property: 'Status', status: { equals: 'Posted' } },
      {
        property: 'Publish Date',
        date: {
          on_or_after: '2025-11-04',
          before: '2025-11-11',
        },
      },
    ],
  },
});
```

2. **Aggregate Metrics**

```javascript
const analysis = {
  totalPieces: week1Posts.results.length,  // Should be ~39

  byPlatform: {
    Twitter: {
      count: posts.filter(p => p.channel === "Twitter").length,
      avgViews: calculateAverage(twitterPosts, "Views"),
      avgEngagement: calculateEngagementRate(twitterPosts)
    },
    LinkedIn: {...},
    YouTube: {...}
  },

  byCategory: {
    "AI Products": {
      count: posts.filter(p => p.category === "AI Products").length,
      avgViews: ...,
      topPerformers: getTop3(aiProductPosts)
    },
    // ... other categories
  },

  byVoiceMode: {
    "Lowercase Builder-Philosopher": {
      count: ...,
      avgEngagement: ...,
      performance: "15% above baseline"  // Example insight
    },
    "Analyst": {...}
  },

  byFormat: {
    Thread: {
      count: 6,
      avgViews: 1150,
      avgEngagement: "0.45%"
    },
    "Long-form Post": {...},
    // ... other formats
  },

  topPerformers: getTop5ByViews(week1Posts),
  worstPerformers: getBottom5ByViews(week1Posts)
};
```

3. **Pattern Identification**

```javascript
const insights = {
  whatWorked: [
    'Lowercase Twitter posts: 15% higher engagement than proper caps',
    'LinkedIn carousels: 3x more engagement than text-only',
    'Morning posts (8-10 AM): 25% more reach than afternoon',
    'Product comparison format: Consistent 0.5%+ engagement',
  ],

  whatFlopped: [
    'Evening posts (8 PM): 40% less reach',
    'Generic AI news posts: Below-average engagement',
    'Video scripts without B-roll direction: Lower retention',
  ],

  surprises: [
    'Substack Notes drove 12% of newsletter traffic (higher than expected)',
    'Deadpan Critic mode posts: High comments but lower likes',
    'LinkedIn engagement peaked at 9 AM (not 10 AM as predicted)',
  ],
};
```

4. **Week 2 Recommendations**

```javascript
const week2Strategy = {
  increase: [
    'Lowercase Twitter posts (from 40% to 50%)',
    'LinkedIn carousels (from 20% to 30%)',
    'Morning publishing (shift more to 8-10 AM)',
  ],

  decrease: [
    'Evening posts (reduce from 2/day to 1/day)',
    'Generic news commentary (cut by 50%)',
    'Text-only LinkedIn (replace with carousels)',
  ],

  test: [
    'Lowercase posts on LinkedIn (professional acceptable?)',
    'Video scripts with more B-roll direction',
    'Thread length (6 tweets vs 10 tweets performance)',
  ],
};
```

5. **Generate Report**

Saves: `outputs/11-10-2025/week1-performance-report.md`

```markdown
# Week 1 Performance Report (Nov 4-10)

## Summary

- **Published:** 39 pieces
- **Platforms:** Twitter (18), LinkedIn (6), YouTube (3), Substack (12)
- **Total Views:** 45,200
- **Avg Engagement:** 0.38%

## Top 5 Performers

1. AgentKit thread - 2,450 views, 0.62% engagement
2. LinkedIn carousel post - 3,100 views, 0.51% engagement
   ...

## Insights

- Lowercase Twitter posts outperformed by 15%
- Morning posts (8-10 AM) got 25% more reach
- Product comparisons consistently above 0.5% engagement

## Week 2 Adjustments

- Increase morning posts, reduce evening
- Add more carousels to LinkedIn
- Test lowercase on LinkedIn (1-2 posts)
```

6. **Update Memories**

Jarvis adds to memories.md:

```markdown
## Learning Log

**2025-11-10: Week 1 Complete**

- 39 pieces published across 5 platforms
- Lowercase Twitter posts performed 15% better (validated voice choice)
- LinkedIn carousels crushed (3x engagement vs text)
- Morning optimal: 8-10 AM (data confirms research)
- Pattern: Product comparisons consistently strong (your formula works)
```

---

## INTEGRATION WITH SUB-AGENTS

### When Content Needs Video

**Trigger Points:**

- Notion entry has Post Type = "Video Script"
- Content scheduled for YouTube, Reels, or TikTok

**Process:**

1. Jarvis writes script using `video-script-writer` skill
2. Saves script: `outputs/{date}/video-{title}.md`
3. Creates handoff package:

```json
{
  "content_type": "video_script",
  "ready_for_agent": "ai-video-agent",
  "suggested_command": "/ai-video-agent *create-talking-head",
  "notion_entry_id": "page_123",
  "script": {
    "platform": "youtube_shorts",
    "duration_seconds": 60,
    "full_script": "...",
    "timed_segments": [
      {"start": 0, "end": 3, "text": "Hook line", "visual": "Screen recording of AgentKit"},
      {"start": 3, "end": 20, "text": "Point 1", "visual": "HeyGen talking head"},
      ...
    ],
    "visual_direction": "Use HeyGen avatar for explanations, Veo for demos",
    "production_notes": "Fast pacing, text overlays for key points"
  }
}
```

4. Sid triggers `/ai-video-agent`
5. Video produced → Handed to Social Posting Agent
6. Published → Notion updated with video URL

### When Content Needs Images/Carousel

**Trigger Points:**

- Notion entry has Post Type = "Carousel"
- LinkedIn post that would benefit from visuals
- Sid explicitly asks for image

**Process:**

1. Jarvis generates post text using `post-writer` skill
2. Creates image handoff package:

```json
{
  "content_type": "image_request",
  "ready_for_agent": "ai-image-generator",
  "notion_entry_id": "page_456",
  "requirements": {
    "platform": "linkedin",
    "image_type": "carousel",
    "count": 5,
    "design_system": "linkedin-dark-monochrome",
    "slides": [...]
  }
}
```

3. Sid triggers `/ai-image-generator`
4. Images created → Included in Social Posting Agent handoff
5. Published with images → Notion updated

---

## NOTION VIEWS CONFIGURATION

### View 1: "Today's Content" (Daily Queue)

**Purpose:** See what needs to be created/published today

**Filters:**

- Publish Date = Today
- Status = Next Up OR Editing
- Graveyard = false

**Sorts:**

- Priority (ascending) - High priority first
- Publish Date time (ascending) - Morning posts first

**Properties Shown:**

- Name
- Status
- Post Type
- Channel
- Voice Mode
- Description
- Priority

**How Sid Uses:**

- Morning routine starts here
- Work through list top to bottom
- Check off as Status changes to Posted

---

### View 2: "Week Ahead" (Planning View)

**Purpose:** See full week's pipeline

**Filters:**

- Publish Date = Next 7 days
- Status = ANY (shows all stages)
- Graveyard = false

**Sorts:**

- Publish Date (ascending)

**Properties Shown:**

- Name
- Status
- Channel
- Publish Date
- Priority

**How Sid Uses:**

- Sunday planning: Review week's content
- Mid-week: Check upcoming pieces
- Adjust: Move pieces around if needed

---

### View 3: "Calendar View" (Visual Schedule)

**Type:** Calendar view
**Calendar By:** Publish Date

**Purpose:** Visual overview of content distribution

**How Sid Uses:**

- See content density per day
- Identify gaps or overload days
- Ensure platform variety (not all Twitter one day)

---

### View 4: "Posted This Week" (Performance Tracking)

**Filters:**

- Status = Posted
- Publish Date = Last 7 days

**Sorts:**

- View Performance (Great first)
- Views (descending)

**Properties Shown:**

- Name
- Channel
- Views
- Likes
- Comments
- View Performance
- Publish Date

**How Sid Uses:**

- Weekly review on Sunday
- See what's working
- Identify patterns for next week

---

### View 5: "Backlog" (Idea Bank)

**Filters:**

- Status = Idea OR Someday
- Graveyard = false

**Sorts:**

- Priority
- Topic Trend (HIGH first)

**Purpose:** Ideas generated but not yet scheduled

**How Sid Uses:**

- Pull ideas when calendar has gaps
- Review unused ideas monthly
- Archive stale ideas (move to Graveyard)

---

## EXAMPLE NOTION ENTRIES (What They Look Like)

### Entry 1: Twitter Thread

```
Name: "AgentKit Setup Experience: First Impressions"
Status: Posted
Channel: Twitter [relation to My Channels DB]
Post Type: Thread
Category: AI Products
Priority: ⭐ Priority 1
Content Pillar: Personal Brand
Publish Date: November 4, 2025 8:30 AM
Next Actions: [empty after posted]

Description:
Thread about AgentKit initial testing, focus on setup experience, first agent built, comparison to manual SDK. Personal builder voice, lowercase, honest pros/cons.

Content Text:
Tweet 1: just spent 3 hours with agentkit. here's what nobody is telling you

Tweet 2: setup was smooth. npm install, api key, done in 2 min...
[Full thread content here]

Voice Mode: Lowercase Builder-Philosopher
Topic Trend: HIGH
Research Source: /outputs/11-03-2025/agent-platform-research/
Cost Tracked: 0.00

Views: 1,250
Likes: 42
Comments: 8
View Performance: Good
```

### Entry 2: LinkedIn Carousel

```
Name: "AI Agent Platforms: Strategic Implications for PMs"
Status: Posted
Channel: LinkedIn [relation]
Post Type: Carousel
Category: Career Development
Priority: ⭐ Priority 1
Publish Date: November 4, 2025 9:00 AM

Description:
Analysis of agent platform choices (AgentKit, Claude SDK, Vertex AI) and product strategy implications. Framework-based, specific comparisons, decision criteria for PMs.

Content Text:
The AI agent platform race just got real. Here's why product leaders should care...
[Full 1900-char post]

Image: [5 carousel files attached]

Voice Mode: Analyst
Topic Trend: HIGH
Research Source: /outputs/11-03-2025/agent-platform-research/
Cost Tracked: 0.00 (images generated via nanobanana)

Views: 3,100
Likes: 78
Comments: 12
View Performance: Great
```

### Entry 3: Video Script

```
Name: "Agent Platform Demo (60s YouTube Short)"
Status: Posted
Channel: YouTube [relation]
Post Type: Video Script
Category: AI Products
Priority: ⭐ Priority 1
Publish Date: November 5, 2025 2:00 PM

Description:
60-second demo showing AgentKit in action. Screen recording + HeyGen talking head explaining. Hook: "I tested all 3 platforms, here's what works."

Content Text:
PLATFORM: YouTube Shorts
DURATION: 60 seconds

[0-3s] HOOK:
Visual: Screen - AgentKit interface
Text: "I tested all 3 AI agent platforms"

[3-20s] SEGMENT 1: AgentKit Demo...
[Full script with timing]

Voice Mode: Analyst
Topic Trend: HIGH
Research Source: /outputs/11-03-2025/agent-platform-research/
Cost Tracked: 0.20 (HeyGen + Veo rendering)

Views: 1,850
Likes: 67
Comments: 5
View Performance: Good
```

### Entry 4: Daily Short Post

```
Name: "i am locked in this week"
Status: Posted
Channel: Twitter [relation]
Post Type: Short Post
Category: Personal Efficiency
Priority: 2nd Priority
Publish Date: November 4, 2025 6:00 PM

Description:
Lowercase builder update, flow state signal, no elaboration needed.

Content Text:
i am locked in this week, building + shipping

Voice Mode: Lowercase Builder-Philosopher
Topic Trend: LOW (evergreen, not timely)
Research Source: [empty - no research needed for philosophy posts]
Cost Tracked: 0.00

Views: 890
Likes: 34
Comments: 2
View Performance: Okay
```

---

## SCALABILITY ANALYSIS

### How This Handles 40 Pieces/Week

**Time Breakdown (Per Piece):**

- Jarvis generates: 2-5 minutes
- Sid reviews: 5-10 minutes
- Sid edits: 2-5 minutes
- Publishing: 1-2 minutes (automated)
- **Total per piece:** 10-22 minutes

**Daily Math:**

- 6-7 pieces/day × 15 min avg = 90-105 minutes/day
- Add buffer (coffee, breaks): ~2 hours/day Mon-Sat

**Weekly Math:**

- Sunday: 4-6 hours (research + hub)
- Mon-Sat: 2 hours/day × 6 = 12 hours
- **Total:** 16-18 hours/week content work

**Sustainable?** Yes, IF:

- sid is "locked in" (flow state, not forcing it)
- AI assistance works well (70%+ quality on first draft)
- Hub-and-spoke eliminates daily research
- Notion workflow removes organizational overhead

**Contingency:** Reduce to 30 pieces/week if 40 feels unsustainable (remove 1-2 daily posts)

---

## HANDOFF PACKAGE FORMATS (Sub-Agent Communication)

### Handoff to AI Video Agent

**File:** `outputs/{date}/{session}/handoff-to-video-agent.json`

```json
{
  "content_type": "video_script",
  "ready_for_agent": "ai-video-agent",
  "suggested_command": "/ai-video-agent *create-talking-head",

  "notion_entry_id": "page_abc123",

  "script": {
    "platform": "youtube_shorts",
    "duration_seconds": 60,
    "title": "Agent Platform Demo",

    "full_script": "...",

    "timed_segments": [
      {
        "start": 0,
        "end": 3,
        "text": "I tested all 3 AI agent platforms. Here's what actually works.",
        "visual": "Screen recording - AgentKit interface",
        "notes": "Hook needs to be punchy, visual immediately clear"
      },
      {
        "start": 3,
        "end": 20,
        "text": "AgentKit from OpenAI...",
        "visual": "HeyGen talking head (sid avatar)",
        "notes": "Explain setup experience"
      }
      // ... more segments
    ],

    "visual_direction": "Mix HeyGen talking head for explanations + screen recordings for demos. Fast pacing, text overlays for key points.",

    "production_notes": "Target 65%+ retention. Hook in first 3 seconds critical. Use Veo for B-roll if needed."
  },

  "from_jarvis": {
    "idea_card_id": "idea_007",
    "research_sources": ["outputs/11-03-2025/agent-platform-research/"],
    "voice_profile_applied": true
  }
}
```

**AI Video Agent receives this, produces video, creates handoff for Social Posting Agent**

### Handoff to AI Image Generator

**File:** `outputs/{date}/{session}/handoff-to-image-agent.json`

```json
{
  "content_type": "image_request",
  "ready_for_agent": "ai-image-generator",
  "suggested_command": "/ai-image-generator *carousel",

  "notion_entry_id": "page_def456",

  "requirements": {
    "platform": "linkedin",
    "image_type": "carousel",
    "count": 5,
    "design_system": "linkedin-dark-monochrome",

    "slides": [
      {
        "slide": 1,
        "title": "AI Agent Platform Comparison",
        "content": "AgentKit vs Claude SDK vs Vertex AI",
        "visual_style": "Title card, bold typography"
      },
      {
        "slide": 2,
        "title": "Feature Comparison",
        "content": "Table: Setup time, Control level, Cost model, Production readiness",
        "visual_style": "Data table, color-coded"
      }
      // ... 3 more slides
    ]
  },

  "platform_specs": {
    "aspect_ratio": "1:1",
    "dimensions": "1080x1080",
    "format": "PNG",
    "style_guidance": "Professional, technical, dark mode, minimal text, data visualization focus"
  },

  "from_jarvis": {
    "post_content": "[Full LinkedIn post text]",
    "notion_entry_id": "page_def456"
  }
}
```

### Handoff to Social Posting Agent

**File:** `outputs/{date}/{session}/handoff-to-posting-agent.json`

```json
{
  "content_type": "ready_to_post",
  "ready_for_agent": "social-posting-agent",
  "suggested_command": "/social-posting-agent *linkedin-carousel",

  "notion_entry_id": "page_def456",

  "content": {
    "text": "[Full 1900-character LinkedIn post]",
    "platform": "linkedin",
    "scheduled_time": "2025-11-04 09:00",
    "media_paths": [
      "outputs/11-04-2025/images/linkedin-carousel-1.png",
      "outputs/11-04-2025/images/linkedin-carousel-2.png",
      "outputs/11-04-2025/images/linkedin-carousel-3.png",
      "outputs/11-04-2025/images/linkedin-carousel-4.png",
      "outputs/11-04-2025/images/linkedin-carousel-5.png"
    ]
  },

  "metadata": {
    "hashtags": ["#AI", "#AgenticAI", "#ProductManagement"],
    "first_comment": "What agent platform are you choosing? Reply with your thoughts.",
    "notification_preferences": "all"
  },

  "from_jarvis": {
    "voice_profile_applied": true,
    "platform_validated": true,
    "character_count": 1897
  }
}
```

**Social Posting Agent posts → Returns:**

```json
{
  "status": "success",
  "platform": "linkedin",
  "post_url": "https://linkedin.com/posts/siddani_...",
  "post_id": "urn:li:share:123456",
  "published_at": "2025-11-04T09:00:00Z",
  "media_uploaded": 5,
  "rate_limit_remaining": 145
}
```

**Jarvis updates Notion with post URL**

---

## PERFORMANCE TRACKING LOOP

### Automatic Metrics Update (Daily)

**When:** 24 hours after each post publishes

**Process (Can be automated or manual):**

```
Sid: "Update stats for yesterday's posts"
```

Jarvis workflow:

1. Query Notion for yesterday's posts:

```javascript
const yesterdayPosts = await notion.queryDatabase({
  filter: {
    and: [
      { property: 'Status', status: { equals: 'Posted' } },
      { property: 'Publish Date', date: { equals: yesterday } },
    ],
  },
});
```

2. For each post, fetch platform metrics:

**Twitter API:**

```javascript
const tweetStats = await twitter.getTweetById(tweetId, {
  'tweet.fields': 'public_metrics',
});

const metrics = {
  views: tweetStats.public_metrics.impression_count,
  likes: tweetStats.public_metrics.like_count,
  retweets: tweetStats.public_metrics.retweet_count,
  replies: tweetStats.public_metrics.reply_count,
};
```

**LinkedIn API:**

```javascript
const postStats = await linkedin.getPostStatistics(postUrn);

const metrics = {
  views: postStats.impressionCount,
  likes: postStats.likeCount,
  comments: postStats.commentCount,
  shares: postStats.shareCount,
};
```

3. Update Notion entry:

```javascript
await notion.updatePage({
  page_id: entry.id,
  properties: {
    Views: { number: metrics.views },
    Likes: { number: metrics.likes },
    Comments: { number: metrics.comments },
    'View Performance': {
      select: {
        name: calculatePerformance(metrics.views),
      },
    },
  },
});
```

4. Performance calculation:

```javascript
function calculatePerformance(views) {
  if (views > 2000) return 'Great';
  if (views > 1000) return 'Good';
  if (views > 500) return 'Okay';
  return 'Poor';
}
```

---

### Weekly Analysis Report (Sunday Evening)

**Trigger:**

```
Sid: "Analyze Week 1 performance"
```

**Jarvis generates report with:**

1. **Aggregate Stats:**
   - Total pieces published
   - Platform breakdown
   - Category performance
   - Voice mode performance
   - Format performance

2. **Top Performers (by Views):**
   - Content title
   - Views, engagement rate
   - What made it successful

3. **Pattern Insights:**
   - "Lowercase posts: 15% higher engagement"
   - "Morning posts: 25% more reach"
   - "Carousels: 3x better than text on LinkedIn"

4. **Week N+1 Recommendations:**
   - What to do more of
   - What to reduce
   - What to test

5. **Saves report:** `outputs/{date}/week-N-performance-report.md`

6. **Updates memories.md** with learnings

---

## RISK MITIGATION

### Risk 1: Notion MCP Connection Issues

**Symptoms:**

- MCP server not responding
- Notion API rate limits hit
- Authentication errors

**Fallback Plan:**

- Jarvis saves content to files instead of Notion
- Sid manually copies content into Notion
- Batch update Notion weekly if MCP unstable
- Notion API limit: 3 requests/second (well above our usage)

### Risk 2: Volume Burnout

**Symptoms:**

- Sid feeling exhausted by Week 3
- Quality dropping
- Falling behind schedule

**Contingency:**

- Reduce from 40 → 30 pieces/week
- Cut 1-2 daily posts
- Skip video if time-intensive
- Hub-and-spoke allows graceful scaling down

### Risk 3: Content Quality Issues

**Symptoms:**

- Generated content feels off-voice
- Generic instead of authentic
- Errors in technical content

**Mitigation:**

- Sid review gate catches issues
- Voice profile v2.0 should maintain authenticity
- Can re-run voice learning after 50 new posts
- High-priority pieces: Sid writes manually

### Risk 4: Platform API Limits

**Symptoms:**

- Twitter: Approaching 1500 posts/month limit
- LinkedIn: Hit 150 posts/day limit

**Monitoring:**

- Social Posting Agent checks limits before each post
- Warns if within 10% of limit
- Can reduce frequency if needed

**Reality Check:**

- Twitter: 40 pieces/week = 160/month (well under 1500)
- LinkedIn: 6 pieces/day = way under 150/day limit
- Should not hit limits with current plan

### Risk 5: Cost Overruns

**Projected November Costs:**

- Exa research: $0.80 (4 Sundays @ $0.20 each)
- Twitter Premium: $8.00 (required)
- Apify: $0-2.00 (occasional profile scraping)
- Image generation: ~$0.50 (nanobanana, minimal)
- Video generation: $0 (HeyGen free tier, 3 videos/week within limit)
- **Total: $9.30-11.30/month**

**Mitigation if over budget:**

- Use WebSearch instead of Exa when possible
- Reduce carousel frequency (images cost)
- Skip optional Apify scrapes

---

## IMPLEMENTATION CHECKLIST

### Phase 0: Pre-Flight (30 minutes)

- [ ] Add custom fields to Notion Content Tracker:
  - Post Type (Select)
  - Voice Mode (Select)
  - Topic Trend (Select)
  - Research Source (URL)
  - Cost Tracked (Number)

- [ ] Create "Today's Content" view in Notion:
  - Filter: Publish Date = Today, Status = Next Up
  - Sort: Priority, then Publish Date

- [ ] Set up Notion MCP server:
  - Create integration at notion.so/my-integrations
  - Copy API key
  - Share Content Tracker with integration
  - Add MCP config to Claude
  - Test: Ask Jarvis to search Notion

- [ ] Purchase Twitter Premium ($8/month)

### Phase 1: Test Pipeline (1 hour)

- [ ] Test end-to-end with 1 piece:
  - Jarvis creates Notion entry
  - Jarvis generates content
  - Jarvis updates Notion with content
  - Sid reviews in Notion
  - (Optional) Social Posting Agent publishes
  - Verify Notion updates work

- [ ] Validate handoff packages:
  - Create test video script → AI Video Agent
  - Create test image request → AI Image Generator
  - Verify file paths and formats work

### Phase 2: Week 0 Prep (Sunday Nov 3, 4-6 hours)

- [ ] Run research for Week 1 topic (Agent Platforms)
- [ ] Write Substack newsletter (hub content)
- [ ] Generate 35 content ideas (idea cards)
- [ ] Populate Notion with Week 1 calendar (batch create 35 entries)
- [ ] Sid reviews + marks Monday's content as "Next Up"
- [ ] Pre-write 2-3 high-priority pieces for Monday morning

### Phase 3: Week 1 Execution (Nov 4-10, 2-3 hours/day)

- [ ] Daily: Check Notion "Today's Content"
- [ ] Daily: Generate content for Next Up items
- [ ] Daily: Review + publish
- [ ] Daily: Update Notion status as content progresses
- [ ] Saturday: Track Week 1 performance data
- [ ] Sunday: Run weekly analysis + plan Week 2

### Phase 4: Optimize (Week 2-4)

- [ ] Week 2: Apply Week 1 learnings
- [ ] Week 3: Assess volume sustainability
- [ ] Week 4: Consolidate for December strategy
- [ ] End of Nov: Full month analysis

---

## SUCCESS CRITERIA

### Week 1-2: Baseline (Track, Don't Judge)

**Goal:** Understand current performance

**Metrics:**

- Twitter: Impressions/post, engagement rate, follower growth
- LinkedIn: Impressions/post, engagement rate, follower growth
- Video: Views, retention %, subscriber growth
- Substack: Open rate, new subs, Notes traffic

**Target:** Publish 35+ pieces/week consistently

### Week 3-4: Optimization (Identify Patterns)

**Goal:** Find content-market fit

**Questions:**

- Which topics drive most engagement?
- Which voice modes perform best?
- Which formats work on which platforms?
- Which posting times maximize reach?

**Action:** Double down on winners, reduce losers

### End of November: Assessment

**Success If:**

- ✅ Published 35+ pieces/week sustainably (even if not full 40)
- ✅ Identified 3+ winning content patterns
- ✅ Built audience on 2+ platforms (Twitter + LinkedIn minimum)
- ✅ Sid NOT burned out (sustainable = success)
- ✅ Notion workflow feels organized (not chaotic)

---

## NEXT STEPS

**Immediate (Before Nov 1):**

1. Add custom fields to Notion
2. Set up MCP server
3. Get Twitter Premium
4. Test 1-piece workflow

**Sunday Nov 3:**

1. Research Week 1 topic
2. Write Substack hub
3. Generate 35 ideas
4. Populate Notion

**Monday Nov 4:**

1. Execute first day
2. Track what works
3. Adjust in real-time

**The workflow is designed. Ready to implement when you are.**
