<!-- Powered by BMAD™ Core -->

# MCP Server Configuration Guide

**Purpose:** Step-by-step setup for all required MCP servers
**System:** AI Social Media Management System
**Last Updated:** 2025-11-02

---

## Prerequisites

- Claude Code Desktop installed
- Node.js v20+ installed
- API keys obtained (see `.env.template`)

---

## Configuration File Location

**File:** `.mcp.json` in project root

**Format:**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "API_KEY": "${ENV_VAR}"
      }
    }
  }
}
```

---

## Critical MCPs (Must Have)

### 1. Notion (Knowledge Management)

**Installation:**

```json
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@notionhq/mcp-server"],
    "env": {
      "NOTION_API_KEY": "${NOTION_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://www.notion.so/my-integrations
**Tools:** notion-search, notion-fetch, notion-create-pages, notion-update-page
**Testing:** Run `/mcp` → Should show "notion" server

---

### 2. Postiz (PRIMARY Publishing - ALL Platforms)

**Installation:**

```json
{
  "postiz": {
    "command": "npx",
    "args": ["-y", "@postiz/mcp-server"],
    "env": {
      "POSTIZ_API_KEY": "${POSTIZ_API_KEY}",
      "POSTIZ_API_URL": "${POSTIZ_API_URL}"
    }
  }
}
```

**Setup:**

1. Install Postiz (self-hosted): https://postiz.com/docs/installation
2. Get API key from Postiz settings
3. Default URL: http://localhost:3000/api

**Platforms Supported:** Twitter, LinkedIn, Instagram, Facebook, TikTok, **YouTube**, Pinterest, Reddit, Mastodon, Threads

**Tools:**

- `mcp__postiz__integrationList` - List connected platforms
- `mcp__postiz__integrationSchema` - Get platform requirements
- `mcp__postiz__integrationSchedulePostTool` - PRIMARY scheduling tool
- `mcp__postiz__triggerTool` - Get platform-specific IDs

**Testing:**

```bash
# Check Postiz server running
curl http://localhost:3000/api/health

# Verify MCP tools available
/mcp | grep postiz
```

**CRITICAL:** Content must be HTML formatted using `formatForPostiz()` utility

---

### 3. Cloudinary (Media Storage - REQUIRED)

**Installation:**

```json
{
  "cloudinary-asset-mgmt": {
    "command": "npx",
    "args": ["-y", "@cloudinary/mcp-server"],
    "env": {
      "CLOUDINARY_CLOUD_NAME": "${CLOUDINARY_CLOUD_NAME}",
      "CLOUDINARY_API_KEY": "${CLOUDINARY_API_KEY}",
      "CLOUDINARY_API_SECRET": "${CLOUDINARY_API_SECRET}"
    }
  }
}
```

**API Keys:** Get from https://cloudinary.com/console/settings/api-keys

**Tools:**

- `mcp__cloudinary-asset-mgmt__upload-asset` - PRIMARY upload tool
- `mcp__cloudinary-asset-mgmt__search-assets`
- `mcp__cloudinary-asset-mgmt__get-asset-details`

**Why Critical:** Postiz requires public HTTPS URLs - cannot use local file paths

**Workflow:**

```
Generate image → Upload to Cloudinary → Get secure_url → Pass to Postiz
```

**Testing:**

```bash
# Test upload (creates test file)
echo "test" > /tmp/test.txt
# Call upload-asset tool via Claude Code
# Should return: {secure_url: "https://res.cloudinary.com/..."}
```

---

### 4. fal-video (PRIMARY Video Generation)

**Installation:**

```json
{
  "fal-video": {
    "command": "npx",
    "args": ["-y", "@fal-ai/mcp-server"],
    "env": {
      "FAL_API_KEY": "${FAL_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://fal.ai/dashboard/keys

**Tools:**

- `mcp__fal-video__execute_custom_model` - PRIMARY video tool
- `mcp__fal-video__list_available_models`

**Models Available (22+):**

- Veo 3 (Google) - "fal-ai/veo-3"
- Luma Ray 2 - "fal-ai/luma-dream-machine-ray2"
- Kling Master - "fal-ai/kling-video/v1.5/pro/text-to-video"
- Plus 19 more

**Usage Pattern:**

```javascript
mcp__fal -
  video__execute_custom_model({
    endpoint: 'fal-ai/veo-3',
    input_params: {
      prompt: '...',
      aspect_ratio: '16:9',
      duration: 5,
    },
    category_hint: 'video',
  });
```

**Testing:**

```bash
# List available models
Call: mcp__fal-video__list_available_models()
# Should return 22+ models
```

---

## Image Generation MCPs

### 5. nanobanana (Google Gemini 2.5 Flash)

**Installation:**

```json
{
  "nanobanana": {
    "command": "npx",
    "args": ["-y", "@google/nanobanana-mcp"],
    "env": {
      "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://makersuite.google.com/app/apikey

**Tools:**

- `mcp__nanobanana__generate_image`
- `mcp__nanobanana__upload_file`

**Use Cases:** Social media images, fast generation, editing
**Cost:** $0.039 per image (fixed)

---

### 6. gpt-image-1 (OpenAI DALL-E 3)

**Installation:**

```json
{
  "gpt-image-1": {
    "command": "npx",
    "args": ["-y", "@openai/gpt-image-1-mcp"],
    "env": {
      "OPENAI_API_KEY": "${OPENAI_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://platform.openai.com/api-keys

**Tools:**

- `mcp__gpt-image-1__create_image`
- `mcp__gpt-image-1__create_image_edit`

**Use Cases:** Professional images, text rendering, LinkedIn graphics
**Cost:** Variable (higher than nanobanana)

---

## Specialized Video MCPs

### 7. HeyGen (Talking Heads ONLY)

**Installation:**

```json
{
  "heygen": {
    "command": "npx",
    "args": ["-y", "@heygen/mcp-server"],
    "env": {
      "HEYGEN_API_KEY": "${HEYGEN_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://heygen.com/app/settings/api

**Tools:**

- `mcp__heygen__generate_avatar_video`
- `mcp__heygen__get_voices`
- `mcp__heygen__get_avatar_groups`
- `mcp__heygen__get_avatars_in_avatar_group`

**Use Case:** Avatar presenter videos ONLY (not general video)

---

### 8. SubMagic (Video Editing)

**Installation:**

```json
{
  "submagic": {
    "command": "npx",
    "args": ["-y", "@submagic/mcp-server"],
    "env": {
      "SUBMAGIC_API_KEY": "${SUBMAGIC_API_KEY}"
    }
  }
}
```

**API Key:** Get from SubMagic dashboard

**Tools:**

- `mcp__submagic__submagic_create_project`
- `mcp__submagic__submagic_list_languages`
- `mcp__submagic__submagic_get_project`
- `mcp__submagic__submagic_export_project`

**Use Cases:** AI captions, magic zooms, B-rolls, silence removal

---

## Research MCPs

### 9. Exa (Neural Search)

**Installation:**

```json
{
  "exa": {
    "command": "npx",
    "args": ["-y", "@exa/mcp-server"],
    "env": {
      "EXA_API_KEY": "${EXA_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://exa.ai

**Tools:** `mcp__exa__search`
**Cost:** $0.05-$0.15 per query

---

### 10. Firecrawl (Web Scraping)

**Installation:**

```json
{
  "firecrawl": {
    "command": "npx",
    "args": ["-y", "@firecrawl/mcp-server"],
    "env": {
      "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://firecrawl.dev

**Tools:**

- `mcp__firecrawl__firecrawl_search` - Most powerful web search
- `mcp__firecrawl__firecrawl_scrape` - Single URL scraping
- `mcp__firecrawl__firecrawl_map` - Discover URLs

**Cost:** $0.10-$0.30 per operation

---

### 11. Apify (Platform Scrapers)

**Installation:**

```json
{
  "apify": {
    "command": "npx",
    "args": ["-y", "@apify/mcp-server"],
    "env": {
      "APIFY_API_KEY": "${APIFY_API_KEY}"
    }
  }
}
```

**API Key:** Get from https://apify.com/account/integrations

**Pre-configured Actors:**

- `mcp__apify__apify-slash-instagram-scraper`
- `mcp__apify__clockworks-slash-tiktok-scraper`
- `mcp__apify__apidojo-slash-twitter-scraper-lite`

**Generic Tools:**

- `mcp__apify__call-actor` - Execute any actor
- `mcp__apify__get-actor-output` - Retrieve results

---

## Direct API MCPs (Backup Publishing)

### 12. Twitter Premium API

**Installation:**

```json
{
  "mcp-twitter": {
    "command": "npx",
    "args": ["-y", "@twitter/mcp-server"],
    "env": {
      "TWITTER_API_KEY": "${TWITTER_API_KEY}",
      "TWITTER_API_SECRET": "${TWITTER_API_SECRET}",
      "TWITTER_ACCESS_TOKEN": "${TWITTER_ACCESS_TOKEN}",
      "TWITTER_ACCESS_TOKEN_SECRET": "${TWITTER_ACCESS_TOKEN_SECRET}"
    }
  }
}
```

**API Keys:** Get from https://developer.twitter.com (Premium tier: $8/month)

**Tools:**

- `mcp__mcp_twitter__create_twitter_post`
- `mcp__mcp_twitter__create_and_post_twitter_thread`

**Note:** Use Postiz as PRIMARY - this is backup only

---

## Built-in MCPs (No Setup Required)

### Serena (Codebase Analysis)

- Already configured
- Tools: find_symbol, search_for_pattern, etc.

### Chrome DevTools (Browser Automation)

- Already configured
- Tools: navigate_page, take_screenshot, etc.

---

## Validation Checklist

After configuring all MCPs:

### 1. Verify MCPs Loaded

```bash
# Run in Claude Code
/mcp

# Should show all servers:
# - notion
# - postiz
# - cloudinary-asset-mgmt
# - fal-video
# - nanobanana
# - gpt-image-1
# - heygen
# - submagic
# - exa
# - firecrawl
# - apify
# - mcp-twitter
```

### 2. Check Tool Names

```bash
# Notion should show SIMPLE names
# Look for: notion-search (not mcp__notion__search)

# Others should show MCP__ prefix
# Look for: mcp__fal-video__execute_custom_model
```

### 3. Test One Tool Per Category

**Notion:**

```
Call: notion-search({query: "test"})
Should: Return search results or "no results"
```

**Postiz:**

```
Call: mcp__postiz__integrationList()
Should: Return connected platforms
```

**Cloudinary:**

```
Call: mcp__cloudinary-asset-mgmt__upload-asset({...test file...})
Should: Return {secure_url: "https://res.cloudinary.com/..."}
```

**fal-video:**

```
Call: mcp__fal-video__list_available_models()
Should: Return 22+ models
```

### 4. Verify No Errors

Run agent activation:

```bash
/jarvis   # Should show menu without errors
/zoe      # Should show menu without errors
/zoro     # Should show menu without errors
```

Expected: Each shows greeting with your name and numbered workflow menu

---

## Troubleshooting

### "MCP server not found"

**Solution:** Check .mcp.json syntax, ensure command/args correct

### "Authentication failed"

**Solution:** Verify API key in .env matches key format (sk-ant- for Anthropic, ntn\_ for Notion)

### "Tool not found"

**Solution:** Check tool name follows correct pattern (simple for Notion, mcp\_\_ for others)

### Postiz connection errors

**Solution:**

1. Verify Postiz server running: `curl http://localhost:3000/api/health`
2. Check POSTIZ_API_URL in .env
3. Ensure platforms connected in Postiz dashboard

### Cloudinary upload fails

**Solution:**

1. Verify all 3 credentials (cloud name, API key, API secret)
2. Check file path format (file://... for local files)
3. Ensure file exists and readable

---

## Configuration Priority

**Tier 1 (Essential - System Won't Work):**

1. Notion (knowledge management)
2. Postiz (publishing - ALL platforms)
3. Cloudinary (public URLs for Postiz)

**Tier 2 (Content Creation):** 4. fal-video (PRIMARY video) 5. nanobanana OR gpt-image-1 (images) 6. Exa (research)

**Tier 3 (Enhanced Capabilities):** 7. HeyGen (talking heads) 8. SubMagic (video editing) 9. Firecrawl (deep scraping) 10. Apify (platform data)

**Tier 4 (Optional/Backup):** 11. mcp-twitter (direct Twitter backup) 12. veotools (deprecated - use fal-video)

---

## Quick Start

**Minimum viable setup (3 MCPs):**

```json
{
  "mcpServers": {
    "notion": { ... },
    "postiz": { ... },
    "cloudinary-asset-mgmt": { ... }
  }
}
```

This enables: Research tracking, content publishing, media hosting

**Recommended setup (6 MCPs):**
Add: fal-video, nanobanana (or gpt-image-1), exa

This enables: Full pipeline (research → write → create visuals → publish)

---

## Support Resources

- **Claude Code MCP Docs:** https://docs.claude.com/claude-code/mcp
- **MCP Protocol:** https://modelcontextprotocol.io
- **Tool Names Reference:** See `docs/mcp-tool-naming-standards.md`
- **API Keys:** See `.env.template`

---

**Setup Time:** 1-2 hours (all 12+ MCPs)
**Minimum Setup:** 30 minutes (3 critical MCPs)
**Testing:** 15-30 minutes (verify each MCP)
