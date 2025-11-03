# social-media-mcp - Content Generation Analysis

**Discovery:** social-media-mcp has FULL content generation system!

---

## 🔥 WHAT I FOUND

### Content Generation System

**Location:** `/Users/sid/.mcp-servers/social-media-mcp/src/content/`

**Components:**

1. **Content Generator** (index.ts)
   - Orchestrates content generation
   - Strategy pattern (tries multiple AI providers)

2. **AI Strategies** (strategies/)
   - OpenAI Strategy (uses GPT-4o)
   - Anthropic Strategy (uses Claude Opus)
   - Fallback system (tries one, falls back to other)

3. **Platform Clients** (src/platforms/)
   - Twitter client (posting to Twitter)
   - LinkedIn client (posting to LinkedIn)
   - Mastodon client (posting to Mastodon)

---

## The create_post Tool

**Tool:** social-media-mcp/create_post

**What it does:**

1. Takes natural language instruction
2. Optionally does research (Brave + Perplexity)
3. Generates content using OpenAI/Anthropic
4. Formats for specific platform (Twitter, LinkedIn, etc.)
5. Can POST immediately or return preview

**This is EXACTLY what we need for write-posts!**

---

## Parameters

```json
{
  "instruction": "Write a LinkedIn post about AI automation tools",
  "platforms": ["twitter", "linkedin"],
  "postImmediately": false, // Preview mode
  "conversationId": "optional",
  "ignoreHistory": false,
  "actionableInsights": true
}
```

**Returns:**

```json
{
  "content": {
    "text": "Generated post text...",
    "platform": "linkedin",
    "hashtags": ["#AI", "#Automation"],
    ...
  },
  "preview": true
}
```

---

## Content Generation Strategies

### OpenAI Strategy (Priority 2)

- Model: gpt-4o
- Available: ✅ (we have OPENAI_API_KEY)
- Creates prompts based on:
  - User intent
  - Research data (if any)
  - Platform requirements
  - Content type

### Anthropic Strategy (Priority 3)

- Model: claude-3-opus
- Available: ✅ (we have ANTHROPIC_API_KEY)
- Fallback if OpenAI fails

**System tries OpenAI first, falls back to Anthropic!**

---

## Platform Support

**Twitter:**

- Has Twitter API integration
- Can post directly
- Format for 280 chars or threads

**LinkedIn:**

- Has LinkedIn client
- Can post (needs LinkedIn access token - we don't have)
- Formats for LinkedIn specs

**Mastodon:**

- Has Mastodon client
- We don't use this

**Note:** Posting requires platform credentials (Twitter works, LinkedIn needs setup)

---

## KEY INSIGHT

**We can use create_post for CONTENT GENERATION without posting!**

**Set:** `postImmediately: false`

**Result:**

- Generates content using OpenAI/Anthropic
- Researches if needed
- Formats for platform
- Returns preview
- **Doesn't post** (perfect for Jarvis!)

---

## How It Could Work for write-posts

**Current write-posts workflow:**

- References fictional script_generation_mcp
- Needs content generation

**Could use create_post instead:**

```
social-media-mcp/create_post({
  instruction: "Write LinkedIn post about {topic} based on {idea_card}",
  platforms: ["linkedin"],
  postImmediately: false,  // Just generate, don't post
  actionableInsights: true
})
```

**Benefits:**

- ✅ Uses OpenAI/Anthropic (we have keys)
- ✅ Platform-specific formatting
- ✅ Actually exists (not fictional!)
- ✅ Research integration
- ✅ Preview mode (no posting)

---

## NEXT: Test create_post

**Want me to test if create_post works?**

Try:

```
social-media-mcp/create_post({
  instruction: "Write a short LinkedIn post about AI agents",
  platforms: ["linkedin"],
  postImmediately: false
})
```

**If this works, we can use it for write-posts and write-scripts workflows!**

This could be THE solution we've been looking for! 🔥
