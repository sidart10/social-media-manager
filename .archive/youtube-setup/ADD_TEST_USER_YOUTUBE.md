# Add Test User to YouTube OAuth App

## 🎯 You're on the wrong page! Need to go to OAuth Consent Screen

### Click This Link:

**Direct link to OAuth Consent Screen:**

```
https://console.cloud.google.com/apis/credentials/consent?project=ytnotionautomation-369123
```

Or manually navigate:

1. In the left sidebar, click **"OAuth consent screen"** (not "Credentials")
2. You should see your app configuration

---

## 📋 Once on OAuth Consent Screen Page:

### You'll See Sections Like:

- App information
- App domain
- Authorized domains
- Developer contact information
- **Test users** ← This is what you need!

### Steps:

1. **Scroll down** to the **"Test users"** section
2. Click **"+ ADD USERS"** button
3. Enter your email: **siddani09@gmail.com**
4. Click **"Add"**
5. Click **"Save"** or **"Save and Continue"** at bottom

---

## 🎬 After Adding Test User:

1. Wait 1-2 minutes
2. Try the OAuth link again
3. Should work now!

---

## OAuth Link (After Test User Added):

```
https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=349586011941-59l3ol4o30894vg8tfcgladg83romifj.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Flocalhost%3A8080&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&state=state-token
```

---

## Quick Navigation:

**From where you are now (Credentials page):**

- Look at the left sidebar
- Click **"OAuth consent screen"** (should be the first item)
- Scroll down to "Test users"
- Add yourself!
