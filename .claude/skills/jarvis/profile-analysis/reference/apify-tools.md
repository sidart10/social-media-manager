# apify - Complete Tool Reference

**MCP Server:** apify (HTTP endpoint)
**URL:** https://mcp.apify.com
**Purpose:** Access 5000+ web scrapers for social media platforms

---

## Available Apify Tools

### Tool 1: search-actors

**Purpose:** Find appropriate Apify actor (scraper) for a platform

**Parameters:**

```json
{
  "query": "instagram profile scraper" | "tiktok scraper" | "twitter scraper"
}
```

**Returns:**

```json
{
  "actors": [
    {
      "id": "apify/instagram-scraper",
      "name": "Instagram Scraper",
      "description": "Scrape Instagram profiles, posts, engagement",
      "pricing": "$0.50 per 1k posts"
    },
    {
      "id": "clockworks/tiktok-scraper",
      "name": "TikTok Scraper",
      "description": "Scrape TikTok profiles and videos",
      "pricing": "~$0.50 per profile"
    }
  ]
}
```

---

### Tool 2: fetch-actor-details

**Purpose:** Get detailed information about a specific actor

**Parameters:**

```json
{
  "actorId": "apify/instagram-scraper"
}
```

**Returns:**

```json
{
  "id": "apify/instagram-scraper",
  "name": "Instagram Scraper",
  "description": "Official Instagram scraper",
  "inputSchema": {
    "username": "string (required)",
    "maxPosts": "number (default: 12)",
    "resultsLimit": "number"
  },
  "pricing": {
    "perRun": "minimum $0.01",
    "per1kResults": "$0.50"
  },
  "documentation": "https://apify.com/apify/instagram-scraper"
}
```

---

### Tool 3: call-actor

**Purpose:** Execute an Apify actor to scrape data

**Parameters:**

```json
{
  "actorId": "apify/instagram-scraper",
  "input": {
    "username": "varunmayya",
    "maxPosts": 20
  }
}
```

**Returns:**

```json
{
  "runId": "abc123...",
  "datasetId": "def456...",
  "status": "running",
  "estimatedCost": 0.01
}
```

**Processing Time:** 20-60 seconds typically

---

### Tool 4: get-actor-output

**Purpose:** Retrieve scraped data from completed actor run

**Parameters:**

```json
{
  "datasetId": "def456..."
}
```

**Returns (Instagram example):**

```json
{
  "items": [
    {
      "text": "Check out this amazing...",
      "likes": 1250,
      "comments": 45,
      "timestamp": "2025-10-15",
      "mediaType": "image",
      "url": "https://instagram.com/p/..."
    }
    // ... 19 more posts
  ],
  "profile": {
    "username": "varunmayya",
    "followers": 125000,
    "following": 450,
    "bio": "Entrepreneur, creator..."
  }
}
```

---

## Platform-to-Actor Mapping

### Instagram:

- **Actor:** `apify/instagram-scraper`
- **Cost:** $0.50 per 1k posts (~$0.01 for 20 posts)
- **Input:** `{username, maxPosts}`
- **Returns:** posts[], profile data, engagement metrics

### TikTok:

- **Actor:** `clockworks/tiktok-scraper`
- **Cost:** ~$0.50 per profile
- **Input:** `{username, maxVideos}`
- **Returns:** videos[], views, likes, comments, profile

### Twitter/X:

- **Actor:** `apidojo/twitter-scraper-lite`
- **Cost:** $0.40 per 1k tweets (~$0.02 for 50 tweets)
- **Input:** `{username, maxTweets}`
- **Returns:** tweets[], engagement, profile stats

### LinkedIn:

- **Actor:** `dev_fusion/Linkedin-Profile-Scraper`
- **Cost:** ~$0.30 per profile
- **Input:** `{profileUrl, maxPosts}`
- **Returns:** posts[], engagement, profile

### YouTube:

- **Actor:** `streamers/youtube-scraper`
- **Cost:** ~$0.40 per channel
- **Input:** `{channelUrl, maxVideos}`
- **Returns:** videos[], views, engagement, channel stats

---

## Complete Flow Example (Instagram)

**Step 1: Search for actor**

```
search-actors("instagram profile scraper")
→ Returns list including "apify/instagram-scraper"
```

**Step 2: Get actor details**

```
fetch-actor-details("apify/instagram-scraper")
→ Returns: input schema, pricing
```

**Step 3: Calculate cost**

```
Posts: 20
Cost per 1k: $0.50
Estimated: 20 × $0.50 / 1000 = $0.01
```

**Step 4: Get user approval**

```
Display: "Instagram analysis will cost ~$0.01. Proceed? [yes/no]"
User: "yes"
```

**Step 5: Execute actor**

```
call-actor("apify/instagram-scraper", {username: "varunmayya", maxPosts: 20})
→ Returns: runId, datasetId
```

**Step 6: Retrieve results**

```
get-actor-output(datasetId)
→ Returns: 20 posts with engagement data
```

**Step 7: Log cost**

```
Update memories.md:
- [2025-10-27] apify/instagram-scraper: $0.01 (20 posts, varunmayya)
- Monthly total: $0.01
```

---

## Error Handling

**Actor not found:**

- Try alternative search terms
- Suggest manual actor selection from apify.com/store

**Execution fails:**

- Check Apify credits available
- Verify actor input parameters
- Retry with different actor

**No results returned:**

- Profile may be private
- Username may be incorrect
- Try different platform

**Cost exceeded budget:**

- Ask user if want to proceed anyway
- Suggest reducing maxPosts parameter
- Offer manual analysis option

---

**For usage examples, see:** `usage-examples.md`
**For cost calculations, see:** `cost-examples.md`
