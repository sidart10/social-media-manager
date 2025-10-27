# YouTube API - Public Upload Guide

**Issue:** Videos uploaded via API are locked to "Private" by default
**Reason:** Unverified app (Google policy since July 28, 2020)
**Solution:** Get app verified OR manually publish each video

---

## 🚨 Why Videos Are Private

**Google Policy (Since July 2020):**

All API projects created after July 28, 2020 have uploads locked to **private** until the app passes YouTube's compliance audit.

**This affects:**

- ✅ You can upload videos
- ❌ Videos locked to "Private" automatically
- ❌ Cannot set to "Public" or "Unlisted" via API
- ✅ You CAN manually change to public in YouTube Studio

**Why Google does this:**

- Prevent spam/abuse via automated uploads
- Ensure apps follow Terms of Service
- Protect users and platform

---

## 💡 Two Solutions

### Option 1: Manual Publishing (IMMEDIATE - Works Now!)

**After each upload:**

1. **Go to YouTube Studio:**

   ```
   https://studio.youtube.com/
   ```

2. **Click "Content"** in left sidebar

3. **Find your video** (just uploaded)

4. **Click the video** or click the pencil icon

5. **Change visibility:**
   - Click "Visibility" tab
   - Select "Public" or "Unlisted"
   - Click "Save"

6. **Video is now live!**

**Pros:**

- ✅ Works immediately
- ✅ No waiting for approval
- ✅ Full control

**Cons:**

- ❌ Manual step after each upload
- ❌ Can't fully automate

---

### Option 2: Get App Verified (Takes 4-6 Weeks)

**Submit for YouTube API Audit:**

**Step 1: Prepare Requirements**

You'll need:

1. **Application home page** (public website)
   - Describe what your app does
   - How it uses YouTube API
   - Privacy policy page
   - Terms of service page

2. **Privacy policy** (published on a domain you own)
3. **Terms of service** (published on a domain you own)
4. **Demonstration video** showing how your app works
5. **Test account credentials** for Google reviewers

**Step 2: Submit for Audit**

1. **Go to Google Cloud Console:**

   ```
   https://console.cloud.google.com/apis/credentials/consent?project=ytnotionautomation-369123
   ```

2. **Click "Publish App"** button

3. **Click "Prepare for Verification"**

4. **Fill out the audit form:**
   - Application home page URL
   - Privacy policy URL
   - Terms of service URL
   - Description of how you use YouTube API
   - Demo video link

5. **Submit audit form:**
   ```
   https://support.google.com/youtube/contact/yt_api_form
   ```

**Step 3: Wait for Review**

**Timeline:**

- Initial review: 4-6 weeks
- May request additional information
- May require revisions
- **Total:** Can take 1-3 months

**Step 4: After Approval**

Once verified:

- ✅ Videos upload as public/unlisted automatically
- ✅ No manual publishing needed
- ✅ Fully automated workflow

---

## 🎯 Recommended Approach

### For Personal Use (Your Case)

**Use Option 1 (Manual Publishing):**

**Why:**

- ✅ Works immediately (no waiting)
- ✅ No website/privacy policy needed
- ✅ Perfect for personal automation
- ✅ Only takes 30 seconds per video

**Workflow:**

1. Upload via API (automated)
2. Get notification video uploaded
3. Open Studio on phone/computer
4. Toggle to public
5. Done!

**It's just one extra click!**

---

### For Production/Business Use

**Use Option 2 (Get Verified):**

**When:**

- Planning to upload 10+ videos/day
- Need fully automated workflow
- Building commercial product
- Have time to wait (4-6 weeks)

**Requirements:**

- Own a domain
- Create privacy policy page
- Create terms of service
- Make demo video
- Submit for audit

---

## 🔧 Quick Workaround

### Set Default to Unlisted

When uploading, you CAN set to unlisted:

```javascript
privacy: 'unlisted'; // Video is unlisted (not private!)
```

**Result:**

- Video uploads as unlisted (not fully private)
- You can share the link
- Not searchable on YouTube
- Still need to manually change to "Public" if wanted

---

## 📋 Verification Process Details

### What Google Reviews

1. **OAuth consent screen** - Properly configured
2. **Scopes requested** - Justified and necessary
3. **App functionality** - Follows Terms of Service
4. **Privacy policy** - Clear data usage
5. **Security** - No vulnerabilities

### What You Need to Provide

**Minimum Requirements:**

1. **Domain name** (can buy for $10/year)
   - Example: yourdomain.com

2. **Privacy Policy** (template available online)
   - Host at: yourdomain.com/privacy
   - Explain what data you collect
   - How you use YouTube API

3. **Terms of Service** (template available)
   - Host at: yourdomain.com/terms

4. **Home Page** (simple landing page)
   - Describe your app
   - Link to privacy/terms

5. **Demo Video** (screen recording)
   - Show OAuth flow
   - Show video upload
   - Upload to YouTube (can be unlisted)

**Cost:**

- Domain: ~$10-15/year
- Privacy/Terms: Free (use templates)
- Time: 2-3 hours to set up
- Wait: 4-6 weeks

---

## 💡 My Recommendation

**For your Social Media Posting Agent:**

### Phase 1 (Now): Manual Publishing ✅

**Use the API with manual publishing:**

1. Upload via youtube-uploader-mcp ✅
2. Get video ID ✅
3. Open Studio, change to public (30 seconds)
4. **This works perfectly!**

**Why:**

- No waiting
- No domain/website needed
- Works today
- Only minor inconvenience

---

### Phase 2 (Later): Consider Verification

**If you plan to:**

- Upload daily/frequently
- Fully automate social media
- Build this as a product

**Then invest in:**

- Buy domain ($10/year)
- Create privacy/terms pages (2 hours)
- Submit for verification
- Wait 4-6 weeks
- Get approved
- Fully automated public uploads

---

## 🎯 Current Status

**What works NOW:**

```javascript
// Upload video
mcp__youtube-uploader-mcp__upload_video({
  file_path: "/path/to/video.mp4",
  title: "My Video",
  privacy: "unlisted",  // Best you can do for unverified
  ...
})

// Result: Video uploaded as UNLISTED
// Then: Manually change to Public in Studio (30 seconds)
```

**This is functional for personal use!**

---

## 🚀 Summary

**Question:** How to upload public videos?

**Answer:**

- **Option A:** Upload as unlisted → Manually publish in Studio (works today!)
- **Option B:** Get app verified (4-6 weeks, needs domain/privacy policy)

**For Personal Use:** Option A is perfectly fine!
**For Business:** Invest in Option B

---

**Your video IS uploaded and working!** Just need to click "Public" in Studio for each video.

**Want me to document the verification process in detail if you want to pursue it later?**
