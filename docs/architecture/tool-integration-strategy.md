# Tool Integration Strategy

## MCP Server Registry

**Primary MCPs:**

| MCP Server               | Purpose                                        | Tools Used                                               | Cost Model                  |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------- | --------------------------- |
| **Notion**               | Collaborative state, status workflow, metadata | notion-search, notion-fetch, notion-update-page          | Free (workspace plan)       |
| **Postiz**               | PRIMARY multi-platform publishing              | integrationSchedulePostTool, integrationList             | Free tier (self-hosted)     |
| **Exa**                  | Neural search, web research                    | search (neural + similar results)                        | $0.05-0.15 per query        |
| **Firecrawl**            | Web scraping with caching                      | firecrawl_scrape, firecrawl_crawl                        | $0.10-0.30 per scrape       |
| **Apify**                | Platform scrapers                              | apify/instagram-scraper, clockworks/tiktok-scraper, etc. | $0.02-0.50 per actor        |
| **nanobanana**           | Image generation (Gemini 2.5 Flash)            | generate_image, edit_image                               | $0.039 per image            |
| **gpt-image-1**          | Image generation (DALL-E 3)                    | create_image, create_image_edit                          | $0.04-0.08 per image        |
| **veotools**             | Video generation (Veo 3)                       | veo-3.1-fast, veo-3.1-standard, veo-2.0                  | $0.30-0.60 per 8s           |
| **fal-video**            | Multi-model video (Luma, Kling, Pixverse)      | luma_ray2, kling_master, pixverse                        | $1-3 per video              |
| **heygen**               | Talking head avatars                           | generate_avatar_video, get_voices, get_avatars           | $0.20-0.50 per min          |
| **mcp-twitter**          | Twitter API (Premium)                          | create_twitter_post, reply_twitter_tweet                 | Included in Premium ($8/mo) |
| **youtube-uploader-mcp** | YouTube Data API v3                            | upload_video                                             | Free (API quota)            |
| **social-media-mcp**     | Brave + Perplexity trends                      | research_topic, get_trending_topics                      | Free (Brave) + Perplexity   |

**Custom Modules (Node.js):**

| Module                  | Purpose                    | API                                    | Cost             |
| ----------------------- | -------------------------- | -------------------------------------- | ---------------- |
| **twitter-api-client**  | Direct Twitter Premium API | OAuth 2.0, 25k char posts, threading   | $8/month Premium |
| **linkedin-api-client** | Direct LinkedIn API        | OAuth 2.0, posts/carousels/PDFs/videos | Free (API quota) |

## Tool Selection Decision Matrix

**Research:**

| Depth         | Tools Used              | Cost                   | Use Case                                  |
| ------------- | ----------------------- | ---------------------- | ----------------------------------------- |
| quick         | WebSearch (free)        | $0                     | Fast initial scan, 10-20 results          |
| standard      | Exa neural search       | $0.05                  | Quality research, 10 auto + 5 similar     |
| comprehensive | Exa + Firecrawl         | $0.10-0.15             | Detailed analysis with content scraping   |
| exhaustive    | Exa + Firecrawl + Apify | $0.50+ (user approval) | Complete deep dive with platform scraping |

**Images:**

| Platform            | Tool                    | Cost       | Rationale                                          |
| ------------------- | ----------------------- | ---------- | -------------------------------------------------- |
| LinkedIn, Twitter   | gpt-image-1 (DALL-E 3)  | $0.04-0.08 | Professional quality needed, text rendering 9.5/10 |
| YouTube, Instagram  | nanobanana (Gemini 2.5) | $0.039     | Social media volume, speed priority (10-15s)       |
| Custom high-quality | gpt-image-1             | $0.04-0.08 | User explicitly requests best quality              |

**Videos:**

| Format                    | Tool                    | Cost           | Rationale                                |
| ------------------------- | ----------------------- | -------------- | ---------------------------------------- |
| Talking head avatars      | HeyGen                  | $0.20-0.50/min | High-quality faces, consent verification |
| B-roll, diagram animation | Veo 3 fast              | $0.30/8s       | Fast iteration (60s generation)          |
| Production b-roll         | Veo 3 standard          | $0.50/8s       | Highest quality (120s generation)        |
| Cinematic sequences       | Fal-Video (Luma, Kling) | $1-3/video     | Multi-scene storytelling                 |

**Platform Scraping:**

| Platform  | Apify Actor                       | Cost        | Alternative                            |
| --------- | --------------------------------- | ----------- | -------------------------------------- |
| Instagram | apify/instagram-scraper           | ~$0.05      | Manual Instagram Graph API (if access) |
| TikTok    | clockworks/tiktok-scraper         | ~$0.05      | TikTok Research API (if access)        |
| Twitter   | apidojo/twitter-scraper-lite      | $0.02-0.04  | Direct Twitter Premium API             |
| LinkedIn  | apimaestro/linkedin-profile-posts | $0.10-0.15  | LinkedIn API (if granted access)       |
| YouTube   | starvibe/youtube-transcripts      | $0.05/video | YouTube Data API v3 (free quota)       |

## Tool Evolution Strategy

**Principle:** Current tool choices documented as "best practice as of [date]" with explicit mechanism to update as ecosystem matures.

**Tool Registry (to be created in Story 7.4):**

```yaml
# bmad/tool-registry.yaml

research:
  free:
    - tool: WebSearch
      cost: $0
      quality: 6/10
      last_updated: '2025-10-31'
      status: active

  paid_low:
    - tool: Exa
      cost: $0.05-0.15
      quality: 8/10
      last_updated: '2025-10-31'
      status: active
      notes: Neural search, 10 auto + 5 similar results

  paid_high:
    - tool: Apify
      cost: $0.02-0.50
      quality: 9/10
      last_updated: '2025-10-31'
      status: active
      notes: Platform-specific scrapers, varies by actor

images:
  cost_optimized:
    - tool: nanobanana
      model: Gemini 2.5 Flash
      cost: $0.039
      quality: 7.5/10
      speed: 10-15s
      last_updated: '2025-10-31'
      status: active

  quality_optimized:
    - tool: gpt-image-1
      model: DALL-E 3
      cost: $0.04-0.08
      quality: 9.5/10
      speed: 20-30s
      last_updated: '2025-10-31'
      status: active

videos:
  avatars:
    - tool: HeyGen
      cost: $0.20-0.50/min
      quality: 9/10
      last_updated: '2025-10-31'
      status: active

  b_roll:
    - tool: veotools (Veo 3 fast)
      cost: $0.30/8s
      quality: 8/10
      speed: 60s generation
      last_updated: '2025-10-31'
      status: active

    - tool: veotools (Veo 3 standard)
      cost: $0.50/8s
      quality: 9/10
      speed: 120s generation
      last_updated: '2025-10-31'
      status: active

  cinematic:
    - tool: fal-video (Luma Ray 2)
      cost: $1-3
      quality: 9/10
      last_updated: '2025-10-31'
      status: active
```

**Monthly Optimization Process:**

1. Review tool-registry.yaml
2. Compare cost/quality/speed actual vs documented
3. Test new tools/models that have emerged
4. Update tool selection in skills (workflow callers unaffected)
5. Document changes with rationale

---
