# Credentials Setup Status

**Updated:** 2025-10-25 18:50
**Status:** 2/3 Platforms Ready for Testing

---

## ✅ Configured & Ready to Test

### 1. Twitter/X (mcp_twitter)

**Status:** ✅ Credentials configured
**MCP Server:** `npx -y mcp_twitter`

**Configured Credentials:**

```
TWITTER_AUTH_MODE: API
TWITTER_API: MdaA13kfW762ypFmgnpFeBD0g
TWITTER_API_SECRET: MdaA13kfW762ypFmgnpFeBD0g  ⚠️ (Same as API - verify correct)
TWITTER_ACCESS_TOKEN: 1574727684-nairE4fBr5WbJCPYr8af3Ra4u7yKVyJFS2QploQ
TWITTER_ACCESS_TOKEN_SECRET: XBPWIKm0sXOwItUYg8VKKHtBdYTrmFzI17l3Birk9eB4H
```

**⚠️ Warning:** API_SECRET appears identical to API_KEY. This may be a copy/paste error. Please verify from Twitter Developer Portal.

**Next Steps:**

1. Restart Claude Desktop/Code
2. Test with: `mcp_twitter.get_own_twitter_account_info`
3. Test posting with: `mcp_twitter.create_twitter_post`

---

### 2. LinkedIn (linkedin-mcp)

**Status:** ✅ Credentials configured
**MCP Server:** `uvx linkedin-mcp`

**Configured Credentials:**

```
LINKEDIN_CLIENT_ID: 86litgbscvi400
LINKEDIN_CLIENT_SECRET: YOUR_LINKEDIN_CLIENT_SECRET
LINKEDIN_REDIRECT_URI: http://localhost:3000/callback
```

**Next Steps:**

1. Restart Claude Desktop/Code
2. Run: `linkedin-mcp.authenticate`
3. Follow OAuth flow in browser
4. Test with: `linkedin-mcp.create_post`

---

## ⚠️ Needs Additional Setup

### 3. YouTube (youtube-uploader-mcp)

**Status:** ⚠️ Needs OAuth client_secret.json file
**MCP Server:** `/Users/sid/youtube-uploader-mcp/youtube-uploader-mcp-darwin-arm64`

**Issue:** You have an API key in .env (`AIzaSyBpPqITeh8X0LzQSlcpkXWX0yI1DO11Hok`), but YouTube uploader requires OAuth 2.0 with `client_secret.json`.

**What You Need:**

YouTube doesn't work with just an API key for uploading. You need to:

1. **Create Google Cloud Project** (if not done)
2. **Enable YouTube Data API v3**
3. **Create OAuth 2.0 Client ID**
   - Type: Desktop app
   - Download as `client_secret.json`

4. **Place the file here:**

   ```
   /Users/sid/.config/youtube-uploader-mcp/client_secret.json
   ```

5. **First run will trigger OAuth flow:**
   - Browser opens
   - Log in to Google
   - Grant permissions
   - Tokens saved automatically

**Detailed Instructions:** See `CREDENTIALS_SETUP_GUIDE.md` section 3

**Alternative (Not Recommended):** The API key might be for a different service. YouTube upload specifically requires OAuth with user consent.

---

## 🔴 Not Yet Configured

### 4. Instagram (ig-mcp)

**Status:** 🔴 Working on it (per user)
**MCP Server:** `python3 /Users/sid/.mcp-servers/ig-mcp/src/instagram_mcp_server.py`

**Required Credentials:** (Not yet in .env)

```
INSTAGRAM_ACCESS_TOKEN: <long-lived token>
FACEBOOK_APP_ID: <app id>
FACEBOOK_APP_SECRET: <app secret>
INSTAGRAM_BUSINESS_ACCOUNT_ID: <ig business id>
```

**Waiting for:** User to complete Instagram setup

---

## Testing Plan

### Phase 1: Twitter (5 minutes)

```bash
# Restart Claude
# Then ask Claude to run:
1. mcp_twitter.get_own_twitter_account_info
   Expected: Returns your Twitter profile info

2. mcp_twitter.create_twitter_post
   Input: { "text": "Test post from Social Posting Agent API! 🚀" }
   Expected: Returns tweet ID and URL
```

**Success Criteria:**

- ✅ Profile info retrieved
- ✅ Test post created
- ✅ Post appears on timeline

### Phase 2: LinkedIn (10 minutes)

```bash
# Ask Claude to run:
1. linkedin-mcp.authenticate
   Expected: OAuth URL provided
   Action: Open URL, authorize, paste callback

2. linkedin-mcp.create_post
   Input: {
     "text": "Test post from Social Posting Agent! #automation",
     "visibility": "public"
   }
   Expected: Returns post URN
```

**Success Criteria:**

- ✅ OAuth completed
- ✅ Post created
- ✅ Post visible on LinkedIn

### Phase 3: YouTube (After OAuth Setup)

```bash
# After client_secret.json is in place:
1. First upload triggers OAuth
2. Grant permissions
3. Test upload with short video
```

---

## Quick Fixes Needed

### Twitter API Secret Issue

Your `.env` shows:

```
api key: MdaA13kfW762ypFmgnpFeBD0g
api key secret: MdaA13kfW762ypFmgnpFeBD0g  ← Same value!
```

This is likely incorrect. To fix:

1. Go to [Twitter Developer Portal](https://developer.x.com/)
2. Navigate to your app → "Keys and tokens"
3. Find **API Key Secret** (different from API Key)
4. Update `.env` file
5. Re-run configuration script

---

## Files Updated

1. ✅ `/Users/sid/.claude.json` - MCP server configurations
2. ✅ `/Users/sid/Desktop/4. Coding Projects/social-media-manager/.env` - Credentials source
3. ✅ This status document

---

## Next Actions

**Immediate (Now):**

1. ✅ Verify Twitter API Secret is correct
2. ✅ Restart Claude Desktop/Code
3. ✅ Test Twitter connection
4. ✅ Test LinkedIn OAuth flow

**Soon (Next 30 min):** 5. ⏳ Complete YouTube OAuth setup 6. ⏳ Test YouTube upload

**Later (When ready):** 7. ⏳ Complete Instagram setup 8. ⏳ Test Instagram posting

---

## How to Test (Step-by-Step)

1. **Restart Claude:**

   ```bash
   # If using Claude Desktop: Quit and reopen
   # If using Claude Code: Restart VS Code
   ```

2. **Ask me to test Twitter:**

   ```
   "Can you test the mcp_twitter connection by getting my account info?"
   ```

3. **Ask me to authenticate LinkedIn:**

   ```
   "Can you help me authenticate with LinkedIn using linkedin-mcp?"
   ```

4. **After tests, come back here** and we'll:
   - Document what works
   - Fix what doesn't
   - Continue with YouTube and Instagram

---

## Troubleshooting

### If Twitter Fails:

- Verify API Secret is different from API Key
- Check app permissions are "Read and write"
- Ensure tokens haven't expired

### If LinkedIn Fails:

- Verify redirect URI matches exactly: `http://localhost:3000/callback`
- Check "Share on LinkedIn" product is approved
- Ensure client secret includes the `WPL_AP1.` prefix

### If YouTube Fails:

- You need `client_secret.json`, not API key
- See full YouTube setup in CREDENTIALS_SETUP_GUIDE.md

---

**Ready to test!** Restart Claude and let's verify these connections work! 🚀
