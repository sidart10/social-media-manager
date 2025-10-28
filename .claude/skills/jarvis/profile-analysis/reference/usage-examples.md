# profile-analysis - Usage Examples

**Real-world examples of using apify for profile analysis**

---

## Example 1: Analyze Instagram Profile (Most Common)

**User Request:** "Analyze Varun Mayya's Instagram"

**Skill Process:**

**Step 1:** Detect platform from context

```
Username: "varunmayya"
Platform: Instagram (user mentioned)
```

**Step 2:** Search for actor

```
Tool: apify/search-actors
Query: "instagram profile scraper"
```

**Step 3:** Select actor

```
Selected: apify/instagram-scraper (official, most reliable)
```

**Step 4:** Calculate cost

```
Analysis depth: quick (20 posts)
Cost: 20 × $0.50 / 1000 = $0.01
```

**Step 5:** Get approval

```
Present to user:
"Instagram Analysis: ~$0.01 for 20 posts. Current budget: $0.00/$10.00. Proceed?"
User: "yes"
```

**Step 6:** Execute

```
Tool: apify/call-actor
ActorId: "apify/instagram-scraper"
Input: {
  username: "varunmayya",
  maxPosts: 20
}
```

**Step 7:** Retrieve results

```
Tool: apify/get-actor-output
DatasetId: [from step 6]

Returns: 20 Instagram posts with:
- Text/captions
- Like counts
- Comment counts
- Post dates
- Media types
- URLs
```

**Step 8:** Analyze patterns

```
- Top 10 posts by engagement
- Hook types (60% start with questions)
- Topics (40% entrepreneurship, 30% creator tips, 30% personal)
- Formats (50% carousel, 30% reels, 20% images)
- Posting times (most active: Tue/Thu 10am)
```

**Step 9:** Log cost

```
memories.md updated:
- [2025-10-27] apify/instagram-scraper: $0.01 (20 posts, varunmayya)
- Monthly total: $0.01
```

---

## Example 2: Multi-Platform Comparison

**User Request:** "Compare my Instagram vs competitor's TikTok"

**Skill invoked TWICE:**

**Invocation 1: Your Instagram**

```
Platform: Instagram
Username: "your_handle"
Posts: 20
Cost: $0.01
```

**Invocation 2: Competitor TikTok**

```
Platform: TikTok
Username: "competitor_handle"
Videos: 50
Cost: $0.50
```

**Total Cost:** $0.51
**Approval:** Asked twice (once per platform)
**Logged:** 2 separate entries in memories.md

---

## Example 3: User Declines Cost

**User Request:** "Analyze this TikTok: tiktok.com/@user"

**Skill Process:**

```
Platform: TikTok detected
Actor: clockworks/tiktok-scraper
Cost estimate: $0.50

Present: "TikTok analysis will cost ~$0.50. Current: $0.00/$10.00. Proceed?"
User: "no"

Skill response:
"Analysis cancelled. No cost incurred."
Exit gracefully.
```

**Result:**

- No scraping performed
- No cost logged
- Clear message why incomplete

---

## Example 4: Quick vs Deep Analysis

**Quick Analysis (20 posts, $0.01):**

```
{
  username: "handle",
  maxPosts: 20
}
```

**Use when:** Quick patterns check, minimal cost

**Standard Analysis (50 posts, $0.03):**

```
{
  username: "handle",
  maxPosts: 50
}
```

**Use when:** Comprehensive patterns, worth the cost

**Deep Analysis (100 posts, $0.05):**

```
{
  username: "handle",
  maxPosts: 100
}
```

**Use when:** Full historical analysis needed

---

## Example 5: Error Handling

**Scenario:** Apify MCP unavailable

**Skill attempts:**

```
1. Try apify/search-actors
2. Error: "MCP not connected"
3. Log: "apify MCP unavailable"
4. Inform user: "Can't analyze [platform] - Apify MCP down"
5. Suggest: "Try again later or provide data manually"
```

**Fallback:** None (no free alternative for Instagram/TikTok)

---

## Platform Detection Patterns

**From URL:**

```
"instagram.com/varunmayya" → Instagram
"tiktok.com/@creator" → TikTok
"twitter.com/handle" → Twitter
"linkedin.com/in/person" → LinkedIn
"youtube.com/@channel" → YouTube
```

**From context:**

```
"their Instagram" → Instagram
"check their TikTok" → TikTok
"@username's posts" → Platform unclear, ask user
```

---

**For tool reference, see:** `apify-tools.md`
**For cost details, see:** `cost-examples.md`
**For workflow integration, see:** `workflow-integration.md`
