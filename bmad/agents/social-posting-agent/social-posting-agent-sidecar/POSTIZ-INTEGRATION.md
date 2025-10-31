# Postiz MCP Integration

**Status:** ✅ Installed
**Date:** 2025-10-29
**Transport:** SSE (Server-Sent Events)
**Endpoint:** http://localhost:5001/api/mcp/[key]/sse

---

## What is Postiz?

Postiz is a unified social media scheduling and posting platform that supports:
- Twitter/X
- LinkedIn
- Instagram
- Facebook
- TikTok
- YouTube
- Pinterest
- Reddit
- Telegram, Slack, Discord, and 10+ more platforms

**Benefits:**
- Single API for multiple platforms
- Scheduling capabilities
- Content calendar management
- Analytics and insights
- Media upload handling

---

## Installation Complete

### MCP Server Configuration

**Added to:** `.mcp.json` (project root - project-specific MCP config)

```json
{
  "mcpServers": {
    "postiz": {
      "type": "sse",
      "url": "http://localhost:5001/api/mcp/439022f2d72a50d6d977103926e15fb215ee7be071d2e7244d57f727a9921c99/sse",
      "disabled": false
    }
  }
}
```

**Note:** Uses `type: "sse"` for Server-Sent Events transport specific to this project

### Agent Configuration

**Added to:** `bmad/agents/social-posting-agent/config.yaml`

```yaml
mcp_tools:
  postiz:
    enabled: true
    tool_prefix: "mcp__postiz__"
    description: "Cross-platform social media scheduling and posting"
    platforms: ["twitter", "linkedin", "instagram", "facebook", "tiktok", "youtube", "pinterest", "reddit"]
    rate_limit: "30 requests per hour"
```

---

## How It Works

### Architecture

```
Social Posting Agent
    ↓
Can use THREE approaches:
    ├─ Direct APIs (Twitter/LinkedIn modules) - Current implementation
    ├─ Platform MCPs (twitter_mcp, youtube_uploader) - Current implementation
    └─ Postiz MCP - NEW unified approach
```

### Integration Strategy

**Hybrid Approach (Recommended):**
- Keep existing Twitter/LinkedIn direct APIs (you've built these)
- Keep platform-specific MCPs (YouTube uploader, etc.)
- **ADD** Postiz for:
  - Instagram (not yet directly integrated)
  - Facebook (not yet integrated)
  - TikTok (not yet integrated)
  - Cross-platform scheduling
  - Content calendar management

**Why Hybrid:**
- Direct APIs give you full control and features
- Postiz adds platforms you don't have yet
- Scheduling features complement direct posting
- Redundancy (if one fails, use the other)

---

## MCP Tools Available

Once Claude Code restarts, Postiz MCP tools will be available with prefix `mcp__postiz__*`:

**Expected Tools:**
- `mcp__postiz__list_integrations` - Get connected social accounts
- `mcp__postiz__create_post` - Create scheduled post
- `mcp__postiz__get_posts` - List scheduled posts
- `mcp__postiz__upload_media` - Upload images/videos
- `mcp__postiz__delete_post` - Cancel scheduled post
- `mcp__postiz__get_analytics` - Get post performance

**Note:** Exact tool names will be visible after Claude Code restart via MCP discovery.

---

## Usage Examples

### Example 1: Post to Instagram (New Capability!)

```javascript
// Using Postiz MCP (Instagram not available via direct API)
const postiz_tools = await mcp__postiz__list_integrations();
const instagram = postiz_tools.find(i => i.identifier === 'instagram');

await mcp__postiz__create_post({
  integrationId: instagram.id,
  content: "Check out my new AI agents!",
  media: [uploaded_image_id],
  scheduledAt: "2025-10-30T10:00:00Z"
});
```

### Example 2: Cross-Platform Posting

```javascript
// Post to multiple platforms at once via Postiz
const integrations = await mcp__postiz__list_integrations();
const platforms = ['twitter', 'linkedin', 'facebook'];

for (const platform of platforms) {
  const integration = integrations.find(i => i.identifier === platform);
  await mcp__postiz__create_post({
    integrationId: integration.id,
    content: adapted_content_for_platform,
    scheduledAt: schedule_time
  });
}
```

### Example 3: Schedule Future Posts

```javascript
// Schedule Instagram post for tomorrow 9 AM
await mcp__postiz__create_post({
  integrationId: instagram_id,
  content: "Morning motivation post",
  media: [image_id],
  scheduledAt: "2025-10-30T09:00:00Z"  // Future time
});
```

---

## Integration with Social Posting Agent

### New Workflows to Create

**Recommended additions:**

1. **workflows/postiz-instagram-post.yaml** - Post to Instagram
2. **workflows/postiz-facebook-post.yaml** - Post to Facebook
3. **workflows/postiz-tiktok-post.yaml** - Post to TikTok
4. **workflows/postiz-multi-platform.yaml** - Post to multiple platforms
5. **workflows/postiz-schedule-post.yaml** - Schedule for future

### Menu Items to Add

```xml
<item cmd="*instagram" workflow="{agent-folder}/workflows/postiz-instagram-post.yaml">
  Post to Instagram (image, carousel, or reel)
</item>
<item cmd="*facebook" workflow="{agent-folder}/workflows/postiz-facebook-post.yaml">
  Post to Facebook (text, image, or video)
</item>
<item cmd="*tiktok" workflow="{agent-folder}/workflows/postiz-tiktok-post.yaml">
  Post to TikTok (video with caption)
</item>
<item cmd="*multi-platform" workflow="{agent-folder}/workflows/postiz-multi-platform.yaml">
  Post to multiple platforms simultaneously
</item>
<item cmd="*schedule" workflow="{agent-folder}/workflows/postiz-schedule-post.yaml">
  Schedule post for future date/time
</item>
```

---

## Rate Limits & Constraints

**Postiz API Limits:**
- 30 requests per hour
- This counts API calls, not posts
- Plan ahead for batch operations

**Per-Platform Limits** (inherited from connected platforms):
- Twitter: Your existing limits apply
- LinkedIn: Your existing limits apply
- Instagram: Instagram API limits
- Others: Platform-specific limits

---

## Testing

### Test 1: Verify Connection

After Claude Code restarts:
```bash
claude mcp list
```

Expected: `postiz: http://localhost:5001/api/mcp/[key]/sse (SSE) - ✓ Connected`

### Test 2: List Connected Platforms

```javascript
const integrations = await mcp__postiz__list_integrations();
console.log(integrations);
```

Expected: List of your connected social accounts

### Test 3: Create Test Post

```javascript
// Post to a safe test channel
await mcp__postiz__create_post({
  integrationId: test_channel_id,
  content: "Test post from Postiz MCP - please ignore",
  scheduledAt: null  // Post immediately
});
```

---

## Advantages vs Direct APIs

### Postiz MCP Advantages:
- Unified interface for 15+ platforms
- Built-in scheduling
- Content calendar view
- Analytics dashboard
- Media library management
- Draft saving

### Direct API Advantages:
- Full platform feature access
- No intermediary
- Direct error handling
- Custom implementations
- You control the code

### Recommendation:

**Use Direct APIs for:**
- Twitter (you have TwitterClient/TwitterExecutor)
- LinkedIn (you have linkedin-api-client)
- YouTube (you have youtube-uploader-mcp)
- Platforms where you need full control

**Use Postiz for:**
- Instagram (not yet direct)
- Facebook (not yet direct)
- TikTok (not yet direct)
- Cross-platform campaigns
- Scheduled content
- Content calendar management
- Quick multi-platform posting

---

## Next Steps

1. **Restart Claude Code** to load Postiz MCP tools
2. **Verify connection** with `claude mcp list`
3. **Discover tools** - Check what tools Postiz MCP exposes
4. **Create workflows** - Build Instagram/Facebook/TikTok posting workflows
5. **Test posting** - Try posting to Instagram
6. **Update menu** - Add new platform options to agent menu

---

## Troubleshooting

### Issue: Connection Failed
- **Check:** Is Postiz running? `curl http://localhost:5001/`
- **Check:** Is API key correct in URL?
- **Fix:** Restart Postiz service

### Issue: No Tools Showing
- **Cause:** Claude Code hasn't restarted
- **Fix:** Restart Claude Code to load new MCP server

### Issue: Rate Limit Exceeded
- **Cause:** 30 requests/hour limit hit
- **Fix:** Wait for hourly reset or batch operations efficiently

---

## Documentation Links

- **Postiz Docs:** https://docs.postiz.com/public-api
- **Postiz MCP Guide:** https://www.speakeasy.com/mcp/using-mcp/mcp-server-providers/postiz
- **MCP Spec:** https://modelcontextprotocol.io/

---

**Integration Status:** ✅ Configured, pending Claude Code restart
**Next Action:** Restart Claude Code, then test Postiz MCP tools
**Impact:** Adds Instagram, Facebook, TikTok, and 10+ more platforms to social-posting-agent
