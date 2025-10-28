# YouTube MCP - Complete Guide

**Status:** ✓ Connected
**Issue:** OAuth redirect to localhost:8080 doesn't work (no server listening)

---

## 🎯 Available YouTube MCP Tools

Based on testing and logs:

1. **`authenticate`** - Generates OAuth URL
2. **`accesstoken`** - Exchanges authorization code for tokens
3. **`channels`** - Lists available YouTube channels (after auth)
4. **`upload_video`** - Uploads video to YouTube (after auth)
5. **`refreshtoken`** - Refreshes expired access token

---

## 🔍 The OAuth Problem

### What Happened

1. ✅ You clicked `authenticate` → Got OAuth URL
2. ❌ URL redirects to `https://localhost:8080` → No server listening
3. ❌ Can't complete OAuth flow

### Why It Fails

The MCP server expects:

```
https://localhost:8080/?code=AUTHORIZATION_CODE&state=state-token
```

But there's no server running on localhost:8080 to catch this redirect!

---

## 💡 Solutions

### Option A: Manual OAuth Code Extraction (EASIEST)

**Steps:**

1. **Open the OAuth URL** (I'll generate a new one)

2. **Authorize with your Google account**

3. **Browser redirects to:**

   ```
   https://localhost:8080/?code=4/0AZEOvh...XXXX&state=state-token
   ```

4. **Browser shows error** (because no server on 8080) - **THIS IS EXPECTED!**

5. **Copy the URL from address bar** - It contains the code!

6. **Extract the code part:**

   ```
   From: https://localhost:8080/?code=4/0AZEOvhXXXXXXXXXXXX&state=state-token
   Copy: 4/0AZEOvhXXXXXXXXXXXX
          ^^^^^^^^^^^^^^^^^^^^ Just this part
   ```

7. **Give me the code** - I'll use `mcp__youtube-uploader-mcp__accesstoken` to complete OAuth

---

### Option B: Build Custom YouTube Module (Like Twitter & LinkedIn)

**Pros:**

- ✅ Full control
- ✅ Same pattern as Twitter/LinkedIn
- ✅ Better error handling
- ✅ Direct integration

**Cons:**

- ⏳ Takes 1-2 hours
- More code to maintain

**Recommendation:** Try Option A first (5 minutes)

---

## 🚀 Let's Complete YouTube OAuth Now!

### Step 1: I'll Generate a Clean OAuth URL

Let me call authenticate again:
