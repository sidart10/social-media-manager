# YouTube Transcript Extraction - Apify Integration

**Updated:** 2025-10-27
**Method:** Apify `karamelo/youtube-transcripts` actor
**Reason:** youtube-transcript MCP is broken - Apify is reliable

---

## Overview

Extract YouTube video transcripts using Apify's professional transcript scraping actor. Reliable, fast, and handles videos with or without manual captions.

---

## Apify Actor: karamelo/youtube-transcripts

### Quick Start

```javascript
// Via Apify MCP
apify/call-actor
Actor: karamelo/youtube-transcripts
Input: {
  "urls": [
    "https://youtube.com/watch?v=abc123",
    "https://youtube.com/watch?v=xyz789"
  ]
}
```

### Input Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `urls` | array | Yes | - | YouTube video URLs (full URLs recommended) |
| `maxRetries` | number | No | 4 | Max retry attempts per video |
| `proxyOptions` | object | No | {useApifyProxy: true} | Proxy configuration |

### Output Format

```json
{
  "success": true,
  "videos": [
    {
      "videoId": "abc123",
      "title": "Video Title",
      "transcript": [
        {
          "text": "Welcome to this video...",
          "start": 0.0,
          "duration": 2.5
        },
        {
          "text": "Today we're talking about...",
          "start": 2.5,
          "duration": 3.0
        }
      ],
      "fullText": "Welcome to this video... Today we're talking about..."
    }
  ]
}
```

---

## Usage in youtube-research Skill

### Step 1: Extract Video ID

```javascript
// From URL: https://youtube.com/watch?v=abc123
const videoId = "abc123"

// From short URL: https://youtu.be/abc123
const videoId = "abc123"
```

### Step 2: Call Apify Actor

```
Use Apify call-actor:
- Actor: karamelo/youtube-transcripts
- Input: {
    "urls": ["https://youtube.com/watch?v=abc123"]
  }
```

### Step 3: Extract Transcript Data

```javascript
// Apify returns dataset
const result = await getActorOutput(datasetId)

const transcript = result.videos[0].transcript
const fullText = result.videos[0].fullText
```

---

## Analysis Patterns

### Extract Hook (First 10 seconds)

```javascript
// Find all transcript entries in first 10 seconds
const hook = transcript.filter(entry => entry.start < 10)

// Combine text
const hookText = hook.map(e => e.text).join(' ')

// Example: "Stop wasting 10 hours every week on tasks AI could do..."
```

### Extract Quotes with Timestamps

```javascript
// Find memorable quotes
const quotes = []

transcript.forEach(entry => {
  if (isMemorableQuote(entry.text)) {
    quotes.push({
      text: entry.text,
      timestamp: formatTimestamp(entry.start) // "2:34"
    })
  }
})

// Output: "The future is already here" - 2:34
```

### Identify Structure

```javascript
// Segment by timestamps
const intro = getSegment(transcript, 0, 60)      // 0:00-1:00
const problem = getSegment(transcript, 60, 180)  // 1:00-3:00
const solution = getSegment(transcript, 180, 480) // 3:00-8:00
const outro = getSegment(transcript, 480, 600)   // 8:00-10:00
```

---

## Cost & Performance

### Pricing
- **Cost:** ~$0.01 per video
- **Model:** Pay-per-result (only pay for successful extractions)
- **Free tier:** First few videos may be free (Apify trial)

### Performance
- **Speed:** 2-5 seconds per video
- **Reliability:** 99%+ success rate
- **Limits:** No hard limits (scales with your usage)

### Comparison

| Method | Cost | Reliability | Speed |
|--------|------|-------------|-------|
| **Apify** | ~$0.01/video | 99%+ | 2-5s |
| Broken MCP | FREE | 0% (broken) | N/A |
| YouTube Data API | FREE (quota) | Good | Fast |

---

## Error Handling

### Common Issues

**1. Video has no transcript:**
```json
{
  "success": false,
  "error": "No transcript available for video abc123"
}
```
**Solution:** Try another video or check if video has CC enabled

**2. Private/deleted video:**
```json
{
  "success": false,
  "error": "Video not accessible: abc123"
}
```
**Solution:** Verify video URL and accessibility

**3. Rate limiting (rare):**
```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```
**Solution:** Wait a few seconds and retry

---

## Integration Examples

### In research-topic Workflow

```xml
<action>User provides: https://youtube.com/watch?v=abc123</action>
<action>Extract video ID: abc123</action>
<action>Call Apify: karamelo/youtube-transcripts</action>
<action>Input: {"videoUrls": ["https://youtube.com/watch?v=abc123"], "includeTimestamps": true}</action>
<action>Receive transcript with timestamps</action>
<action>Analyze hook (first 10s): "Stop wasting time..."</action>
<action>Extract structure: Intro → Problem → Solution → CTA</action>
<action>Find quotes: "The key is automation" - 3:45</action>
<action>Store in research brief</action>
```

### In learn-voice Workflow

```xml
<action>User provides channel: @siddani09</action>
<action>Use Apify: karamelo/youtube-full-channel-transcripts-extractor</action>
<action>Get 10 most recent videos</action>
<action>Analyze speaking patterns:
  - Speaking rhythm (fast/slow)
  - Filler words (um, like, so)
  - Transitions (but, however, and then)
  - Teaching style (step-by-step, story-driven)
</action>
<action>Store in voice profile</action>
```

---

## Alternative: Python Backup

**If Apify is unavailable**, use Python library directly:

```bash
pip install youtube-transcript-api
```

```python
from youtube_transcript_api import YouTubeTranscriptApi

# Get transcript
transcript = YouTubeTranscriptApi.get_transcript("abc123")

# Returns:
# [
#   {'text': 'Welcome...', 'start': 0.0, 'duration': 2.5},
#   {'text': 'Today...', 'start': 2.5, 'duration': 3.0}
# ]
```

**See:** `scripts/youtube_transcript_fetcher.py` for complete implementation

---

## Why Not youtube-transcript MCP?

**The youtube-transcript MCP server is broken:**
- ❌ Fails to fetch transcripts
- ❌ Community-maintained (unreliable updates)
- ❌ Inconsistent results
- ❌ No error handling

**Apify is superior:**
- ✅ Professional maintenance
- ✅ 99%+ reliability
- ✅ Fast and scalable
- ✅ Clear error messages
- ✅ Handles edge cases
- ✅ Worth the minimal cost (~$0.01/video)

---

## Summary

**Use Apify `karamelo/youtube-transcripts` for all YouTube transcript extraction.**

**Simple workflow:**
1. Extract video ID from URL
2. Call Apify actor with videoUrls
3. Receive transcript with timestamps
4. Analyze hook, structure, quotes
5. Cost: ~$0.01/video (worth the reliability)

**For complete analysis patterns, see:** `analysis-patterns.md`
