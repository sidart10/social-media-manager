# Fix YouTube OAuth - Access Blocked Error

## 🚨 The Problem

**Error:** "Access blocked: social-media-manager has not completed the Google verification process"

**Reason:** Your OAuth app is in "Testing" mode and your email (siddani09@gmail.com) is not added as a test user!

---

## ✅ Quick Fix (5 minutes)

### Step 1: Go to Google Cloud Console OAuth Consent Screen

**Open this link:**

```
https://console.cloud.google.com/apis/credentials/consent?project=ytnotionautomation-369123
```

### Step 2: Add Test User

1. On the **OAuth consent screen** page
2. Scroll down to **"Test users"** section
3. Click **"+ ADD USERS"**
4. Enter your email: **siddani09@gmail.com**
5. Click **"Add"**
6. Click **"Save"** at the bottom

### Step 3: Try OAuth Again

After adding yourself as a test user:

1. Wait 1-2 minutes for changes to propagate
2. Click this link again:

```
https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=349586011941-59l3ol4o30894vg8tfcgladg83romifj.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Flocalhost%3A8080&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&state=state-token
```

3. Should work now!

---

## 🎯 Alternative: Publish the App

**If you want ANYONE to use it (not just you):**

### Publish to Production

1. On OAuth consent screen page
2. Click **"PUBLISH APP"** button
3. Confirm the dialog
4. **Note:** This makes the app available to all users, not just test users

**Warning:** Published apps may require Google review for sensitive scopes (can take days/weeks)

**Recommendation:** Just add yourself as test user (faster!)

---

## 📋 Summary

**Quick Fix (5 min):**

1. Go to: https://console.cloud.google.com/apis/credentials/consent?project=ytnotionautomation-369123
2. Add test user: siddani09@gmail.com
3. Save
4. Try OAuth link again

**That's it!**
