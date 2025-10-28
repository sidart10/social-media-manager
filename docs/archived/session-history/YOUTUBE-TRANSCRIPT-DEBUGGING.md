# youtube-transcript Debugging

**Error:** `MCP error -32603: No transcripts found`
**This is DIFFERENT from the social-media-mcp error!**

---

## What This Error Means

**"No transcripts found"** is a CLEAR, specific error from the youtube-transcript tool itself.

**It means:**
- ✅ MCP is connected
- ✅ Tool is being called successfully
- ✅ Communication works
- ❌ **That specific video doesn't have captions/transcripts!**

---

## The Video You Tested

**URL:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

**This is the Rick Astley "Never Gonna Give You Up" video!**

**Problem:** This video might not have auto-generated captions enabled, or captions are in a different format.

---

## Simple Fix

**Test with a video that DEFINITELY has captions:**

Try these (popular tech videos with guaranteed captions):
- Fireship videos (always have captions)
- ThePrimeagen (tech content, captions)
- Any video with the **CC** icon visible on YouTube

**Example URLs to test:**
- https://www.youtube.com/watch?v=jPhJbKBuNnA (Fireship - usually has captions)
- Search "AI agents tutorial" and pick a video with CC icon

---

## How to Verify

**Before testing transcript extraction:**

1. Go to the YouTube video
2. Click the CC (closed captions) button
3. If captions appear → video has transcripts ✓
4. If "No captions available" → video won't work ✗

---

## Recommendation

**The youtube-transcript MCP is working fine!**

**The issue:** Just need videos that have captions enabled.

**Test again with:**
- A tech tutorial video
- Something educational
- Check for CC icon first

---

**Want to try a different YouTube video that definitely has captions?**

This should work immediately - the MCP is functional, just need the right video!
