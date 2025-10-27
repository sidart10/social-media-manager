# Enable YouTube Data API v3

## 🚨 The Problem

**Error:** "invalid_scope" - `youtube.readonly` scope is invalid

**Reason:** YouTube Data API v3 is not enabled in your Google Cloud project!

---

## ✅ Quick Fix (2 minutes)

### Step 1: Enable YouTube Data API v3

**Direct link:**

```
https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=ytnotionautomation-369123
```

**Or manually:**

1. Go to Google Cloud Console
2. Select project: **ytnotionautomation-369123**
3. Go to **"APIs & Services"** → **"Library"**
4. Search for: **"YouTube Data API v3"**
5. Click on it
6. Click **"ENABLE"** button

### Step 2: Wait 1-2 Minutes

Google needs to propagate the API enablement.

### Step 3: Try OAuth Link Again

After enabling the API, click this link:

```
https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=349586011941-p46d6mh4nm8jbh6lfoigl5lc2lmrdasc.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Flocalhost%3A8080&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&state=state-token
```

Should work now!

---

## Why This Happened

The OAuth scopes request access to:

- `youtube.upload` ✅ (enabled)
- `youtube.readonly` ❌ (API not enabled)

Both scopes require YouTube Data API v3 to be enabled in your project.

---

## After Enabling:

✅ Both scopes will be valid
✅ OAuth will succeed
✅ You can upload videos
✅ You can read channel info

---

**Click the link above to enable YouTube Data API v3, then try OAuth again!**
