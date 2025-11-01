# Deployment & Operations

## Prerequisites

**Required Software:**
- Claude Code Desktop Application (MacOS, Windows, or Linux)
- Node.js v18+ (for twitter-api-client, linkedin-api-client modules)
- Git (for version control)

**Required API Keys (stored in .env):**
- `ANTHROPIC_API_KEY` - Claude Code
- `NOTION_API_KEY` - Notion integration token (ntn_***)
- `POSTIZ_API_KEY` - Postiz self-hosted instance
- `EXA_API_KEY` - Exa neural search
- `FIRECRAWL_API_KEY` - Firecrawl web scraping
- `APIFY_API_KEY` - Apify actor platform
- `GOOGLE_AI_STUDIO_API_KEY` - Gemini (nanobanana, veotools)
- `OPENAI_API_KEY` - DALL-E 3 (gpt-image-1)
- `HEYGEN_API_KEY` - HeyGen avatar generation
- `TWITTER_BEARER_TOKEN` - Twitter Premium API
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn OAuth token

## MCP Server Configuration

**Location:** Claude Code Settings → MCP Servers

**Example Configuration:**

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    },
    "postiz": {
      "command": "npx",
      "args": ["-y", "@postiz/mcp-server"],
      "env": {
        "POSTIZ_API_KEY": "${POSTIZ_API_KEY}"
      }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-server"],
      "env": {
        "EXA_API_KEY": "${EXA_API_KEY}"
      }
    },
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server"],
      "env": {
        "APIFY_API_KEY": "${APIFY_API_KEY}"
      }
    },
    "nanobanana": {
      "command": "npx",
      "args": ["-y", "@nanobanana/mcp-server"],
      "env": {
        "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
      }
    },
    "veotools": {
      "command": "npx",
      "args": ["-y", "@veotools/mcp-server"],
      "env": {
        "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
      }
    },
    "heygen": {
      "command": "npx",
      "args": ["-y", "@heygen/mcp-server"],
      "env": {
        "HEYGEN_API_KEY": "${HEYGEN_API_KEY}"
      }
    }
  }
}
```

## Agent Invocation

**User Workflow:**

1. Open Claude Code desktop app
2. Navigate to project directory
3. Invoke agent via slash command: `/jarvis`, `/zoe`, `/zoro`
4. Agent presents numbered menu of available workflows
5. User selects workflow by number or types workflow command (e.g., `*research-topic`)
6. Workflow executes, prompting for inputs at each step
7. Skills auto-discovered and invoked by Claude based on context
8. Results saved to outputs/ and Notion updated
9. Agent suggests next step (handoff to another agent if applicable)

## Cost Tracking

**Monthly Budget Target:** <$50 for 30+ posts

**Cost Breakdown (estimated):**

| Service | Use Case | Monthly Cost |
|---------|----------|--------------|
| Exa | Research (standard depth, 30 posts) | $1.50 (30 × $0.05) |
| Apify | Profile analysis (4 per month) | $0.60 (4 × $0.15) |
| nanobanana | Images (30 posts × 1 image avg) | $1.17 (30 × $0.039) |
| gpt-image-1 | LinkedIn images (10 posts) | $0.60 (10 × $0.06) |
| veotools | Videos (8 posts × 1 video) | $2.40 (8 × $0.30) |
| HeyGen | Talking heads (4 videos × 1 min) | $1.40 (4 × $0.35) |
| Twitter Premium API | Account access | $8.00 (monthly subscription) |
| **Total** | | **~$15.67 + $8 = $23.67** |

**Buffer:** $26.33 remaining for:
- Comprehensive research (Firecrawl, exhaustive Apify)
- High-quality images when needed (more gpt-image-1)
- Cinematic videos (Fal-Video Luma/Kling)
- Additional scraping/analysis

**Cost Tracking Implementation:**

```json
// outputs/projects/{slug}/00-session/costs.json
{
  "total_cost": 0.09,
  "breakdown": [
    {
      "service": "Exa",
      "operation": "research-topic (standard depth)",
      "cost": 0.05,
      "timestamp": "2025-10-31T10:18:23Z"
    },
    {
      "service": "gpt-image-1",
      "operation": "create-single-image (LinkedIn)",
      "cost": 0.04,
      "timestamp": "2025-10-31T10:26:45Z"
    }
  ],
  "monthly_running_total": 23.67
}
```

## Testing Strategy (MVP)

**Manual validation during MVP, automated testing in Phase 2**

**Testing Cadence:**
- **Daily:** Run 1-2 end-to-end pipelines with real content (Jarvis → Zoe → Zoro)
- **Weekly:** Review cost data, update tool-registry.yaml if needed
- **Monthly:** Audit workflow standardization compliance (all using external instructions.md?)

**Test Artifacts:**
- Test session outputs in `outputs/projects/testing-{date}/`
- Tool performance log (cost, speed, quality scores)
- Workflow success rate tracking (target: 95%)

**Key Test Cases:**

1. **Text-only path:** Jarvis research-topic → write-post → Zoro publish-tweet-now
2. **With visuals path:** Jarvis research-topic → write-post → Zoe create-single-image → Zoro schedule-post
3. **Standalone visuals:** Zoe create-carousel → Zoro publish-linkedin-now
4. **Voice consistency:** Generate 10 posts, validate confidence ≥8/10
5. **Cost compliance:** 30 posts in month, total <$50
6. **Notion coordination:** Verify status transitions (Idea → Research → Posted)
7. **Rate limits:** Check Twitter 1500/month, LinkedIn 150/day, YouTube 6/day

---
