# Social Media Posting Agent - Credentials Setup Guide

**Goal:** Get API credentials for all 4 platforms and test MCP server connectivity

**Estimated Time:** 2-4 hours active work + wait time for approvals

**Priority Order:** Start with fastest → slowest approval times

---

## 🏁 Quick Start Checklist

- [ ] **LinkedIn** (Fastest - ~15 min)
- [ ] **Twitter/X** (Fast - ~30 min)
- [ ] **YouTube** (Medium - 1 hour + possible wait)
- [ ] **Instagram** (Slowest - 1-2 hours + possible wait)

---

## 1. LinkedIn API Setup (START HERE) 🟢 EASIEST

**Time:** ~15 minutes
**Approval:** Usually instant

### Step 1: Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Click "Create app"
3. Fill in app details:
   - **App name:** "Social Posting Agent" (or your choice)
   - **LinkedIn Page:** Select your company page (create one if needed)
   - **App logo:** Upload any logo
   - **Legal agreement:** Check the box

4. Click "Create app"

### Step 2: Get Credentials

1. Go to "Auth" tab
2. Copy these values:
   - **Client ID**
   - **Client Secret** (click "Show" to reveal)

3. Add Redirect URL:
   - Click "Edit" under "Authorized redirect URLs"
   - Add: `http://localhost:3000/callback`
   - Click "Update"

### Step 3: Request Products (Required!)

1. Go to "Products" tab
2. Find "Share on LinkedIn" product
3. Click "Request access"
4. Fill out the form explaining you're building a content posting tool
5. Wait for approval (usually instant)

**Required Scope:**

- `w_member_social` (Share on LinkedIn)

### Step 4: Configure MCP Server

Create/update your Claude config file:

```bash
# Open config
nano ~/.claude.json
```

Add environment variables to `linkedin-mcp`:

```json
{
  "mcpServers": {
    "linkedin-mcp": {
      "command": "uvx",
      "args": ["linkedin-mcp"],
      "env": {
        "LINKEDIN_CLIENT_ID": "YOUR_CLIENT_ID_HERE",
        "LINKEDIN_CLIENT_SECRET": "YOUR_CLIENT_SECRET_HERE",
        "LINKEDIN_REDIRECT_URI": "http://localhost:3000/callback"
      }
    }
  }
}
```

### Step 5: Test Connection

```bash
# Restart Claude Desktop or run
claude mcp list

# Should show linkedin-mcp as ✓ Connected
```

### Step 6: Test Authentication

In Claude Desktop/Code:

1. Ask me to use the `linkedin-mcp.authenticate` tool
2. I'll provide an OAuth URL
3. Open the URL in browser
4. Authorize the app
5. Copy the callback URL
6. Paste it back to me

**Success:** You'll get an access token stored for future use

---

## 2. Twitter/X API Setup 🟡 MODERATE

**Time:** ~30 minutes
**Approval:** Usually instant for Free tier

### Step 1: Create Twitter Developer Account

1. Go to [X Developer Platform](https://developer.x.com/)
2. Click "Sign up for Free Account"
3. Use your Twitter/X account to log in
4. Complete the onboarding:
   - Select "Hobbyist" → "Building tools for myself"
   - Fill in basic info
   - Verify email

### Step 2: Create App

1. In Developer Portal, go to "Projects & Apps"
2. Create a new project:
   - **Name:** "Social Posting Agent"
   - **Use case:** "Making a bot"
   - **Description:** "Automated social media content posting"

3. Create an app within the project:
   - **App name:** "social-poster" (must be unique)
   - **Environment:** "Development"

### Step 3: Get API Keys

After creating the app, you'll see:

- **API Key** (Consumer Key)
- **API Key Secret** (Consumer Secret)
- **Bearer Token**

**⚠️ IMPORTANT:** Save these immediately - they won't be shown again!

### Step 4: Generate Access Token & Secret

1. In your app settings, go to "Keys and tokens" tab
2. Under "Authentication Tokens", click "Generate"
3. Save:
   - **Access Token**
   - **Access Token Secret**

### Step 5: Set App Permissions

1. Go to "Settings" tab
2. Scroll to "User authentication settings"
3. Click "Set up"
4. Configure:
   - **App permissions:** Read and write
   - **Type of App:** Web App
   - **Callback URL:** `http://localhost:3000/callback`
   - **Website URL:** `http://localhost:3000`

5. Save

### Step 6: Configure MCP Server

```bash
nano ~/.claude.json
```

Add to `mcp_twitter`:

```json
{
  "mcpServers": {
    "mcp_twitter": {
      "command": "npx",
      "args": ["-y", "mcp_twitter"],
      "env": {
        "TWITTER_AUTH_MODE": "API",
        "TWITTER_API": "YOUR_API_KEY_HERE",
        "TWITTER_API_SECRET": "YOUR_API_KEY_SECRET_HERE",
        "TWITTER_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE",
        "TWITTER_ACCESS_TOKEN_SECRET": "YOUR_ACCESS_TOKEN_SECRET_HERE"
      }
    }
  }
}
```

### Step 7: Test Connection

```bash
claude mcp list

# mcp_twitter should show ✓ Connected
```

### Step 8: Test Posting (Optional)

Ask me to use `mcp_twitter.create_twitter_post` with test content.

**Note:** Free tier limit is **500 posts/month** total.

---

## 3. YouTube API Setup 🟠 MODERATE-SLOW

**Time:** 1-2 hours
**Approval:** Instant for private use, may require verification for public

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project:
   - **Project name:** "Social Posting Agent"
   - **Organization:** None (or your org)

3. Wait for project to be created

### Step 2: Enable YouTube Data API v3

1. In your project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click the API
4. Click "Enable"

### Step 3: Create OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose **External** (unless you have a workspace)
3. Fill in required fields:
   - **App name:** "Social Posting Agent"
   - **User support email:** Your email
   - **Developer contact:** Your email

4. Add scopes:
   - Click "Add or Remove Scopes"
   - Search for "youtube"
   - Select `youtube.upload` and `youtube`

5. Add test users (your email) if in testing mode
6. Click "Save and Continue"

### Step 4: Create OAuth Client ID

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose application type: **Desktop app**
4. Name: "Social Posting YouTube Uploader"
5. Click "Create"

### Step 5: Download credentials

1. After creation, you'll see a dialog with Client ID and Secret
2. Click "Download JSON"
3. Rename the file to `client_secret.json`
4. Move it to: `/Users/sid/.config/youtube-uploader-mcp/`

```bash
mv ~/Downloads/client_secret_*.json /Users/sid/.config/youtube-uploader-mcp/client_secret.json
```

### Step 6: The MCP Server is Already Configured

The YouTube uploader was configured during installation with:

```
/Users/sid/youtube-uploader-mcp/youtube-uploader-mcp-darwin-arm64
-client_secret_file /Users/sid/.config/youtube-uploader-mcp/client_secret_*.json
```

Update the config to use the correct filename:

```bash
nano ~/.claude.json
```

Update the `client_secret_file` path to match your actual file.

### Step 7: First Run - OAuth Flow

1. The first time you use the uploader, it will:
   - Open a browser window
   - Ask you to log in to Google
   - Request permissions
   - Save tokens automatically

2. Test by asking me to upload a test video

### Step 8: Quota Management

**Important:**

- Default quota: **10,000 units/day**
- Video upload cost: **1,600 units**
- **You can upload ~6 videos/day on free tier**

**Optional: Request Quota Increase**

1. Go to "APIs & Services" → "Quotas"
2. Find "YouTube Data API v3"
3. Click "Request quota increase"
4. Fill out the form explaining your use case
5. Wait for Google review (can take weeks)

### Step 9: Verification Warning

**Note:** Unverified apps may:

- Show warning screens during OAuth
- Lock uploads to "Private" until verified
- Limit to 100 test users

**To Verify (if needed):**

1. Go to OAuth consent screen
2. Click "Publish App"
3. Submit for verification (requires privacy policy, terms of service)

---

## 4. Instagram API Setup 🔴 MOST COMPLEX

**Time:** 1-2 hours
**Approval:** May require Business verification

### Prerequisites

⚠️ **CRITICAL REQUIREMENTS:**

- Instagram account must be **Professional** (Business or Creator)
- Must be connected to a Facebook Page
- Personal accounts CANNOT use the API

### Step 1: Convert Instagram Account (if needed)

1. Open Instagram app
2. Go to Settings → Account
3. Tap "Switch to Professional Account"
4. Choose Business or Creator
5. Complete setup

### Step 2: Create Facebook Page (if needed)

1. Go to [Facebook](https://www.facebook.com/)
2. Click "+" → "Page"
3. Create a page for your business/brand
4. Complete page setup

### Step 3: Connect Instagram to Facebook Page

1. Go to Facebook Page Settings
2. Click "Instagram" in left sidebar
3. Click "Connect Account"
4. Log in to Instagram
5. Link the accounts

### Step 4: Create Facebook App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose app type: **Business**
4. Fill in details:
   - **App name:** "Social Posting Agent"
   - **Contact email:** Your email

5. Complete security check
6. Click "Create App"

### Step 5: Add Instagram Graph API Product

1. In your app dashboard, scroll to "Add Products"
2. Find "Instagram Graph API"
3. Click "Set Up"

### Step 6: Configure Basic Settings

1. Go to Settings → Basic
2. Note your:
   - **App ID**
   - **App Secret** (click "Show")

3. Add platform:
   - Click "Add Platform"
   - Choose "Website"
   - Enter: `http://localhost:3000`

4. Add App Domains: `localhost`
5. Save changes

### Step 7: Get Long-Lived User Access Token

This is the tricky part. You need to:

1. Get a short-lived token using Graph API Explorer
2. Exchange it for a long-lived token

**Detailed Steps:**

#### 7a. Use Graph API Explorer

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from dropdown
3. Click "Generate Access Token"
4. Select permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `instagram_basic`
   - `instagram_content_publish`

5. Click "Generate Access Token"
6. Authorize in popup
7. Copy the short-lived token

#### 7b. Get Page Access Token

Using the short-lived token:

```bash
curl -X GET "https://graph.facebook.com/v21.0/me/accounts?access_token=SHORT_LIVED_TOKEN"
```

Find your page in the response and copy its `access_token` and `id`.

#### 7c. Exchange for Long-Lived Token

```bash
curl -X GET "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=PAGE_ACCESS_TOKEN"
```

Copy the `access_token` from response - this is your **long-lived token** (60 days).

#### 7d. Get Instagram Business Account ID

```bash
curl -X GET "https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=LONG_LIVED_TOKEN"
```

Copy the `instagram_business_account.id` value.

### Step 8: Configure MCP Server

```bash
nano ~/.claude.json
```

Update `ig-mcp`:

```json
{
  "mcpServers": {
    "ig-mcp": {
      "command": "python3",
      "args": ["/Users/sid/.mcp-servers/ig-mcp/src/instagram_mcp_server.py"],
      "env": {
        "INSTAGRAM_ACCESS_TOKEN": "YOUR_LONG_LIVED_TOKEN",
        "FACEBOOK_APP_ID": "YOUR_APP_ID",
        "FACEBOOK_APP_SECRET": "YOUR_APP_SECRET",
        "INSTAGRAM_BUSINESS_ACCOUNT_ID": "YOUR_IG_BUSINESS_ID"
      }
    }
  }
}
```

### Step 9: Test Connection

```bash
claude mcp list

# ig-mcp should show ✓ Connected
```

### Step 10: Test Posting

Ask me to use `ig-mcp.get_profile_info` to verify connection.

### Important Notes

**Rate Limits:**

- 100 API-published posts per 24 hours
- Container creation and publishing are separate operations

**Token Expiration:**

- Long-lived tokens expire after 60 days
- You'll need to refresh them manually
- Consider setting a reminder

**Page Publishing Authorization (PPA):**

- Some pages require additional approval
- If you get PPA errors, check Facebook Page settings

---

## Testing Checklist

Once all credentials are set up:

### LinkedIn

```bash
# In Claude Desktop/Code, ask me to:
1. Run linkedin-mcp.authenticate
2. Follow OAuth flow
3. Test linkedin-mcp.create_post with text: "Test post from API"
```

### Twitter/X

```bash
# Ask me to:
1. Run mcp_twitter.get_own_twitter_account_info
2. Test mcp_twitter.create_twitter_post with text: "Test tweet from API"
```

### YouTube

```bash
# Ask me to:
1. Check authentication status
2. Upload a short test video (10 seconds)
3. Verify it appears in your channel
```

### Instagram

```bash
# Ask me to:
1. Run ig-mcp.get_profile_info
2. Test ig-mcp.publish_media with a test image
3. Verify post appears on your profile
```

---

## Secure Storage

### Where Credentials Are Stored

1. **Claude Config:** `/Users/sid/.claude.json`
   - Contains all MCP server configurations
   - Includes API keys and secrets

2. **OAuth Tokens:**
   - LinkedIn: Managed by linkedin-mcp (stored in-memory during session)
   - YouTube: Stored by youtube-uploader-mcp in config directory
   - Twitter: Provided in config
   - Instagram: Provided in config

### Security Best Practices

1. **Protect your config file:**

```bash
chmod 600 ~/.claude.json
```

2. **Never commit credentials:**

```bash
echo ".claude.json" >> ~/.gitignore
```

3. **Use environment variables (alternative):**
   Create a `.env` file:

```bash
# Twitter
export TWITTER_API="..."
export TWITTER_API_SECRET="..."
export TWITTER_ACCESS_TOKEN="..."
export TWITTER_ACCESS_TOKEN_SECRET="..."

# LinkedIn
export LINKEDIN_CLIENT_ID="..."
export LINKEDIN_CLIENT_SECRET="..."

# Instagram
export INSTAGRAM_ACCESS_TOKEN="..."
export FACEBOOK_APP_ID="..."
export FACEBOOK_APP_SECRET="..."
export INSTAGRAM_BUSINESS_ACCOUNT_ID="..."
```

Then load it:

```bash
source ~/.env
```

4. **Set up token rotation reminders:**
   - LinkedIn tokens: Check scopes regularly
   - Instagram tokens: Expire in 60 days
   - YouTube tokens: Auto-refresh by MCP server
   - Twitter tokens: Should not expire

---

## Troubleshooting

### LinkedIn Connection Failed

- Verify "Share on LinkedIn" product is approved
- Check redirect URI exactly matches: `http://localhost:3000/callback`
- Ensure scope `w_member_social` is requested

### Twitter/X Connection Failed

- Verify app has "Read and write" permissions
- Check all 4 credentials are correct (API key, secret, access token, access secret)
- Ensure TWITTER_AUTH_MODE="API"

### YouTube Connection Failed

- Verify YouTube Data API v3 is enabled
- Check OAuth consent screen includes `youtube.upload` scope
- Ensure client_secret.json path is correct
- Try deleting saved tokens and re-authenticating

### Instagram Connection Failed

- Verify Instagram account is Professional (not Personal)
- Check account is connected to Facebook Page
- Ensure long-lived token is not expired
- Verify Instagram Business Account ID is correct
- Check permissions: `instagram_basic`, `instagram_content_publish`

---

## Next Steps After Credentials Setup

Once all MCP servers are ✓ Connected:

1. Document actual tool responses
2. Test edge cases (large files, special characters, etc.)
3. Verify rate limits and quotas
4. Create validation rules based on testing
5. Build the Social Media Posting Agent
6. Create platform-specific workflows
7. Integration testing
8. Production deployment

---

## Estimated Timeline

| Platform  | Setup Time          | Approval Wait   | Total        |
| --------- | ------------------- | --------------- | ------------ |
| LinkedIn  | 15 min              | Instant         | 15 min       |
| Twitter   | 30 min              | Instant         | 30 min       |
| YouTube   | 1 hour              | Usually instant | 1 hour       |
| Instagram | 1-2 hours           | May need review | 1-2 hours    |
| **TOTAL** | **2.75-3.75 hours** | **0-7 days**    | **Variable** |

---

## Support Resources

- [LinkedIn Developer Forums](https://www.linkedin.com/help/linkedin/forum/developer)
- [X Developer Community](https://twittercommunity.com/)
- [Google Cloud Support](https://cloud.google.com/support)
- [Meta Developer Community](https://developers.facebook.com/community/)

---

**Ready to Start?**

Begin with LinkedIn (fastest) and work your way through. Come back when you have credentials and we'll test each platform before building the agent!
