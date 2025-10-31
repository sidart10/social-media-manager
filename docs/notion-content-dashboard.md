# 🤖 AI Agent Documentation: Content Dashboard Automation Guide

# Overview

This documentation provides everything an AI agent needs to autonomously manage your Content Dashboard for social media and content management. It includes database schemas, relationships, MCP server integration, and automation workflows.

---

# Database Architecture

## Core Databases & Data Sources

### 1. Content Tracker [DB]

**Data Source URL:** `[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)`

**Purpose:** Central hub for all content ideas, posts, and publishing workflow

**Key Properties:**

- **Name** (title): Content title/idea
- **Status** (status): Idea → Research → Next Up → Writing → Editing → Posted → Archived → Someday
- **Channel** (relation): Links to My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
- **Category** (select): Tech Insights, Career Development, Immigrant Support, AI Products, Personal Efficiency
- **Priority** (select): ⭐️ Priority 1 through 5th Priority
- **Content Pillar** (select): Search-Focused, Personal Brand, Community
- **Publish Date** (date): When content was/will be published
- **Next Actions** (date): Next action date for workflow
- **Focus Keywords** (relation): Links to Keywords [DB] ([Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21))
- **Tasks** (relation): Links to Action Items [DB] ([Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21))
- **Notes** (relation): Links to Notes database
- **Description** (text): Content description
- **Content Text** (text): Actual content body
- **Views, Likes, Comments** (number): Performance metrics
- **View Performance** (select): Great, Good, Okay, Poor
- **Writer, Editor** (person): Team assignments
- **Graveyard** (checkbox): Archive flag
- **YouTube Title ideas, Thumbnail ideas** (text): Platform-specific content

**Status Workflow:**

```
Idea → Research → Next Up → Writing → Editing → Posted
                                              ↓
                                          Archived/Someday
```

### 2. My Channels [DB]

**Data Source URL:** `[My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21)`

**Purpose:** Manage social media channels and platforms

**Key Properties:**

- **Name** (title): Channel name (e.g., "LinkedIn & X", "YouTube", "Shorts/TikTok/Reels")
- **Type** (multi-select): Short-Form Video, Podcast, Blog, Newsletter, Course, Tweets, Long-form Video, LinkedIn Posts, Images
- **Status** (status): Planned → Active → On-Hold
- **Channel Link** (url): Primary platform URL
- **Other Links** (url): Secondary platform URLs
- **Content** (relation): Back-links to Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
- **Keywords** (relation): Links to Keywords [DB] ([Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21))
- **Order** (number): Display priority

**Example Channels:**

- LinkedIn & X (Active, Types: LinkedIn Posts + Tweets)
- YouTube (Long-form Video)
- Shorts/TikTok/Reels (Short-Form Video)

### 3. Action Items [DB]

**Data Source URL:** `[Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21)`

**Purpose:** Task management for content production

**Key Properties:**

- **Action Items** (title): Task name
- **Kanban Status** (status): To-Do → Next-Up → Active → Paused → Done → Archived
- **Content [DB]** (relation): Links to Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
- **My Channels [DB]** (relation): Links to My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
- **Due Date** (date): Task deadline
- **Priority** (select): Various priority levels including Quick ⚡️, ⭐️ Immediate, 1st-5th Priority
- **Expected Effort** (select): ⏰ to ⏰⏰⏰⏰⏰ (1-5 clocks)
- **Assignee** (person): Person responsible
- **Parent task** (relation): Self-referencing for subtasks
- **Sub-task** (relation): Self-referencing for subtasks
- **LNO Category** (select): Leverage, Neutral, Overhead

### 4. Keywords [DB]

**Data Source URL:** `[Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21)`

**Purpose:** SEO keyword tracking and content optimization

**Key Properties:**

- **Keyword** (title): The keyword/phrase
- **Volume** (number): Search volume
- **Difficulty** (number): Keyword difficulty (as percentage)
- **Associated Content** (relation): Links to Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
- **Primary Channel** (relation): Links to My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
- **Parent** (relation): Self-referencing for keyword hierarchy
- **Long-Tail** (relation): Self-referencing for long-tail variations
- **Research URL** (url): Source for keyword research

---

# Database Relationships Map

```
Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
    ├── Channel → My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
    ├── Focus Keywords → Keywords [DB] ([Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21))
    ├── Tasks → Action Items [DB] ([Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21))
    ├── Notes → Notes [DB] ([ Notes [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/16c7db4f2edb4f3cbcc18b1c449fd8f2?db=5dac5de7cba84f109368160f1eef6999&pvs=21))
    ├── Parent Content → Content Tracker [DB] (self-reference)
    └── Child Content → Content Tracker [DB] (self-reference)

My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
    ├── Content → Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
    ├── Keywords → Keywords [DB] ([Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21))
    └── Action Items [DB] → Action Items [DB] ([Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21))

Action Items [DB] ([Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21))
    ├── Content [DB] → Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
    ├── My Channels [DB] → My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
    ├── Parent task → Action Items [DB] (self-reference)
    └── Sub-task → Action Items [DB] (self-reference)

Keywords [DB] ([Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21))
    ├── Associated Content → Content Tracker [DB] ([Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21))
    ├── Primary Channel → My Channels [DB] ([My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21))
    ├── Parent → Keywords [DB] (self-reference)
    └── Long-Tail → Keywords [DB] (self-reference)
```

---

# Dashboard Views Configuration

## Content Ideas View ([`view://1706decf-86d2-46a5-bb34-20575660e9fa`](view://1706decf-86d2-46a5-bb34-20575660e9fa))

- **Filter:** Status is "To-do" or "In progress" AND Graveyard is false
- **Sort:** Priority (ascending), then Category (ascending)
- **Use Case:** Agent should query this view to see active content ideas needing development

## Content Calendar - Next Actions ([`view://3cd45493-80bc-4736-b4a6-a53fe2382499`](view://3cd45493-80bc-4736-b4a6-a53fe2382499))

- **Type:** Calendar
- **Calendar By:** Publish Date
- **Filter:** Status is NOT Complete
- **Use Case:** Agent should check this for scheduling and deadline management

## Published Content Calendar ([`view://c44e7662-468b-40a0-93f8-b6607c81f4e9`](view://c44e7662-468b-40a0-93f8-b6607c81f4e9))

- **Type:** Calendar
- **Calendar By:** Publish Date
- **Filter:** Status is Complete
- **Use Case:** Agent should review published content performance

## YouTube Analytics ([`view://a511426f-65d8-49ef-b241-5fbcd231afc2`](view://a511426f-65d8-49ef-b241-5fbcd231afc2))

- **Type:** Gallery
- **Filter:** Status is Posted AND Channel contains YouTube
- **Use Case:** Agent should analyze performance metrics (Views, Likes, Comments)

---

# MCP Server Integration Guide

## What is MCP?

Model Context Protocol (MCP) is a standardized protocol that enables AI agents to interact with external services like Notion databases. It acts as a "USB-C port" for AI applications, providing a uniform interface for tool integration.[[1]](https://www.notion.so/Tweets-From-Alex-Reibman-59c4d62da13747239737e58989a6f111?pvs=21)[[2]](https://www.notion.so/Organize-Google-Drive-2289f76e64cd81d9ad41dc56eb11273e?pvs=21)

## MCP Server Setup for Notion

### Option 1: Official Notion MCP Server

**Repository:** `@notionhq/notion-mcp-server`

**Configuration:**

```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_****\", \"Notion-Version\": \"2022-06-28\" }"
      }
    }
  }
}
```

**Setup Steps:**

1. Go to [notion.so/my-integrations](http://notion.so/my-integrations) and create an internal integration
2. Copy the API key (starts with `ntn_`)
3. Share the Content Dashboard page and all databases with your integration
4. Configure your AI client (Claude Desktop, Cursor, etc.) with the MCP server

### Option 2: Custom MCP Server

For advanced use cases, you can build a custom MCP server with specific tools:

- `search_content`: Search content by status, channel, or keywords
- `create_content_idea`: Add new content ideas to the tracker
- `update_content_status`: Move content through the workflow
- `get_channel_performance`: Analyze channel metrics
- `schedule_content`: Set publish dates and next actions

---

# Agent Automation Workflows

## Workflow 1: Content Idea Generation & Storage

**Agent Instructions:**

1. **Generate Ideas:** Use web research or trend analysis to identify content topics
2. **Store in Database:** Create new page in Content Tracker [DB]
    
    ```
    Database: [Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)
    Properties to set:
    - Name: "[Content Title]"
    - Status: "Idea"
    - Category: [Auto-detect based on topic]
    - Channel: [Select based on content type]
    - Priority: [Set based on trend urgency]
    - Description: "[Brief summary]"
    ```
    
3. **Add Keywords:** Search Keywords [DB] or create new keywords, link via Focus Keywords relation
4. **Create Task:** Add task in Action Items [DB] linked to content page

**Example Query:**

```sql
-- Check for existing similar content
SELECT Name, Status, Category 
FROM "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)" 
WHERE Category = 'AI Products' 
AND Status NOT IN ('Archived', 'Posted')
```

## Workflow 2: Content Workflow Management

**Agent Instructions:**

1. **Monitor Status:** Query Content Ideas view ([`view://1706decf-86d2-46a5-bb34-20575660e9fa`](view://1706decf-86d2-46a5-bb34-20575660e9fa)) daily
2. **Update Status:** Move content through pipeline based on completion
    - Idea → Research (when research begins)
    - Research → Writing (when outline is ready)
    - Writing → Editing (when draft complete)
    - Editing → Posted (when published)
3. **Set Dates:**
    - Update "Next Actions" for next milestone
    - Set "Publish Date" when scheduling
4. **Performance Tracking:** After publish, update Views, Likes, Comments weekly

## Workflow 3: Multi-Channel Content Distribution

**Agent Instructions:**

1. **Identify Source Content:** Find content with Status = "Posted" and high View Performance
2. **Repurpose Strategy:**
    - Long-form video → Short clips for TikTok/Reels
    - Blog post → Twitter thread + LinkedIn post
    - Podcast → Quote graphics
3. **Create Child Content:**
    - Create new page in Content Tracker [DB]
    - Set Parent Content relation to source
    - Assign different Channel
    - Status starts at "Next Up"

## Workflow 4: Keyword Research & Optimization

**Agent Instructions:**

1. **Analyze Gaps:**
    
    ```sql
    -- Find channels without content
    SELECT [c.Name](http://c.Name), COUNT(ct.url) as content_count
    FROM "[My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21)" c
    LEFT JOIN "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)" ct ON [ct.Channel](http://ct.Channel) LIKE '%' || c.url || '%'
    GROUP BY [c.Name](http://c.Name)
    ```
    
2. **Research Keywords:** For each category, find high-volume, low-difficulty keywords
3. **Store Keywords:** Add to Keywords [DB] with Volume and Difficulty data
4. **Link to Content:** Associate keywords with relevant content ideas

## Workflow 5: Performance Analysis & Optimization

**Agent Instructions:**

1. **Weekly Review:** Query Published Content Calendar ([`view://c44e7662-468b-40a0-93f8-b6607c81f4e9`](view://c44e7662-468b-40a0-93f8-b6607c81f4e9))
2. **Calculate Metrics:**
    - Average views per channel
    - Best performing categories
    - Engagement rate (Likes + Comments / Views)
3. **Identify Patterns:**
    - Which categories get highest views?
    - Which channels have best engagement?
    - What content pillars perform best?
4. **Recommend Strategy:** Update Priority and Category focus based on data

---

# SQL Queries for Agent Automation

## Query 1: Get All Active Content Ideas

```sql
SELECT 
  url,
  Name,
  Status,
  Category,
  Priority,
  Channel,
  "date:Next Actions:start" as next_action_date
FROM "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)"
WHERE Status IN ('Idea', 'Research', 'Next Up', 'Writing', 'Editing')
  AND Graveyard = '__NO__'
ORDER BY Priority ASC, "date:Next Actions:start" ASC
```

## Query 2: Get Content by Channel

```sql
SELECT 
  [c.Name](http://c.Name) as content_title,
  c.Status,
  c."date:Publish Date:start" as publish_date,
  c.Views,
  c.Likes,
  c.Comments
FROM "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)" c
WHERE [c.Channel](http://c.Channel) LIKE '%[https://www.notion.so/05fb9cced38f4521acb517824dddc35a%](https://www.notion.so/05fb9cced38f4521acb517824dddc35a%)'  -- LinkedIn & X channel
  AND c.Status = 'Posted'
ORDER BY c."date:Publish Date:start" DESC
```

## Query 3: Find Overdue Tasks

```sql
SELECT 
  "Action Items" as task_name,
  "Kanban Status" as status,
  "date:Due Date:start" as due_date
FROM "[Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21)"
WHERE "date:Due Date:start" < date('now')
  AND "Kanban Status" NOT IN ('Done', 'Archived')
  AND "Content [DB]" IS NOT NULL
ORDER BY "date:Due Date:start" ASC
```

## Query 4: Top Keywords by Content Count

```sql
SELECT 
  k.Keyword,
  k.Volume,
  k.Difficulty,
  COUNT(DISTINCT json_each.value) as content_count
FROM "[Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21)" k
LEFT JOIN json_each(k."Associated Content") 
GROUP BY k.Keyword, k.Volume, k.Difficulty
ORDER BY content_count DESC, k.Volume DESC
LIMIT 20
```

## Query 5: Performance by Category

```sql
SELECT 
  Category,
  COUNT(*) as content_count,
  AVG(Views) as avg_views,
  AVG(Likes) as avg_likes,
  AVG(Comments) as avg_comments,
  SUM(CASE WHEN "View Performance" = 'Great' THEN 1 ELSE 0 END) as great_count
FROM "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)"
WHERE Status = 'Posted'
  AND Views IS NOT NULL
GROUP BY Category
ORDER BY avg_views DESC
```

---

# Agent Decision Tree

```
Agent receives instruction → Analyze task type
    |
    ├─ Content Idea Generation?
    │   └─ Create in Content Tracker → Link Keywords → Create Task
    |
    ├─ Status Update?
    │   └─ Query current status → Update to next stage → Set Next Actions date
    |
    ├─ Performance Analysis?
    │   └─ Query Posted content → Calculate metrics → Generate insights
    |
    ├─ Scheduling?
    │   └─ Check Calendar view → Set Publish Date → Create reminder task
    |
    └─ Optimization?
        └─ Query Keywords → Analyze gaps → Recommend content topics
```

---

# Best Practices for Agent Operations

## Do's:

✅ Always check Graveyard checkbox before querying active content

✅ Use Status workflow in proper order (don't skip stages)

✅ Set both Next Actions and Publish Date for proper scheduling

✅ Link related items: Content ↔ Tasks ↔ Keywords ↔ Channels

✅ Update performance metrics (Views, Likes, Comments) after publishing

✅ Set Priority based on data-driven insights

✅ Create child content for repurposing successful posts

## Don'ts:

❌ Don't create duplicate content ideas (search first)

❌ Don't move content to Posted without setting Publish Date

❌ Don't forget to link Content to Channel

❌ Don't create tasks without linking to Content

❌ Don't ignore View Performance data when prioritizing

❌ Don't create keywords without Volume/Difficulty data

❌ Don't bypass the workflow stages

---

# API Authentication & Security

## Notion API Setup

1. **Create Integration:**
    - Go to: [notion.so/my-integrations](http://notion.so/my-integrations)
    - Click "New integration"
    - Name: "Social Media Agent"
    - Capabilities: Read content, Update content, Insert content
2. **Share Databases:**
    
    Must share with integration:
    
    - Content Dashboard ([Content Dashboard](https://www.notion.so/Content-Dashboard-352616c50de241598f488ee6b5369312?pvs=21))
    - All databases will inherit access
3. **API Token:**
    - Format: `ntn_` followed by alphanumeric string
    - Store securely in environment variables
    - Rotate periodically for security

## MCP Security Considerations

**From research:** MCP servers present a "lethal trifecta" of security risks including prompt injection attacks.[[3]](https://mail.notion.so/inbox/199a4d55a0e276dc)

**Mitigation Strategies:**

- Validate all user inputs before database operations
- Use read-only tokens when possible
- Implement rate limiting
- Log all agent actions for audit
- Restrict agent to specific databases only
- Use schema validation before writes

---

# Example Agent Conversation Flow

**User:** "Generate 5 content ideas about AI tools"

**Agent Actions:**

1. Research trending AI tools
2. For each idea:
    
    ```python
    create_page({
      "database_id": "[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)",
      "properties": {
        "Name": {"title": [{"text": {"content": "How to Use [Tool] for [Purpose]"}}]},
        "Status": {"status": {"name": "Idea"}},
        "Category": {"select": {"name": "AI Products"}},
        "Channel": {"relation": [{"id": "[LinkedIn & X](https://www.notion.so/LinkedIn-X-05fb9cced38f4521acb517824dddc35a?pvs=21)"}]},  # LinkedIn & X
        "Priority": {"select": {"name": "2nd Priority"}},
        "Description": {"rich_text": [{"text": {"content": "[Brief description]"}}]}
      }
    })
    ```
    
3. Create associated keywords
4. Generate summary report

**Agent Response:** "Created 5 content ideas in the 'AI Products' category, scheduled for LinkedIn & X. Added relevant keywords and set priority. View them in the Content Ideas view."

---

# Troubleshooting Guide

## Issue: "Database not found"

**Solution:** Ensure integration has access to the page. Go to page → Share → Add integration

## Issue: "Property validation failed"

**Solution:** Check property types match schema. Use exact option names for select/status properties

## Issue: "Relation not working"

**Solution:** Use page URLs, not IDs. Format: `[{"id": "page-url"}]`

## Issue: "Query returns no results"

**Solution:** Check filters. Graveyard field defaults to `__NO__` not `false`

---

# Resources & References

## MCP Documentation

- Official MCP Spec: [spec.modelcontextprotocol.io](http://spec.modelcontextprotocol.io)
- Notion MCP Implementation: @notionhq/notion-mcp-server
- MCP Security Guide: Applied LLMs course

## Notion API

- API Reference: [developers.notion.com](http://developers.notion.com)
- Integration Setup: [notion.so/my-integrations](http://notion.so/my-integrations)
- Database Properties: [developers.notion.com/reference/property-object](http://developers.notion.com/reference/property-object)

## Automation Examples

- Thomas Frank's Notion Automation Guide[[4]](https://www.notion.so/The-Notion-Automation-Hub-2061b7b936374d7fa0a4a1f7b587e987?pvs=21)
- Bardeen Notion Workflows[[5]](https://www.notion.so/Bardeen-eedab0fc9a05463cbf3ab0b44450738b?pvs=21)
- Zapier Notion Integration[[6]](https://www.notion.so/Zapier-189a2479a7d94dcb86479cc026aa90dc?pvs=21)

---

# Quick Reference Card

**Database IDs:**

- Content Tracker: `[Content Tracker [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/956447a76e7b4b2eafb1e4c9adfcbcf3?db=49d227f4b5c448598c640632ffaf1f52&pvs=21)`
- My Channels: `[My Channels [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/0145d0effd0848988b489cebeaa46a1d?db=640276b83cf94d90869b13ca58008ea7&pvs=21)`
- Action Items: `[Action Items [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/9c41c33fc8d04d8180a6f56a0bb26bd8?db=17ec8cd0f8f9418ea3f67f9f3f52ea52&pvs=21)`
- Keywords: `[Keywords [DB]](https://www.notion.so/38a6deb43ccb4c2ebb8c1517fb4c525a/ds/7955dfc668fc47d38dfe77cc5d96bb18?db=b4956bf5fbd84939900cb637a58ff82c&pvs=21)`

**Key Views:**

- Content Ideas: [`view://1706decf-86d2-46a5-bb34-20575660e9fa`](view://1706decf-86d2-46a5-bb34-20575660e9fa)
- Next Actions Calendar: [`view://3cd45493-80bc-4736-b4a6-a53fe2382499`](view://3cd45493-80bc-4736-b4a6-a53fe2382499)
- Published Calendar: [`view://c44e7662-468b-40a0-93f8-b6607c81f4e9`](view://c44e7662-468b-40a0-93f8-b6607c81f4e9)
- YouTube Analytics: [`view://a511426f-65d8-49ef-b241-5fbcd231afc2`](view://a511426f-65d8-49ef-b241-5fbcd231afc2)

**Status Flow:**

`Idea → Research → Next Up → Writing → Editing → Posted`

**Priority Levels:**

`⭐️ Priority 1 > 2nd > 3rd > 4th > 5th`

**Categories:**

`Tech Insights | Career Development | Immigrant Support | AI Products | Personal Efficiency`