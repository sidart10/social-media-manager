# YouTube Transcript Extraction - Apify Integration

**Updated:** 2025-11-01
**Method:** Apify `dz_omar/youtube-transcript-metadata-extractor` actor ✅ VERIFIED
**Reason:** youtube-transcript MCP is broken - Apify is reliable and FREE
**Source:** `outputs/11-01-2025/apify-research-session/verified-apify-actors.md`

---

## Overview

Extract YouTube video transcripts using Apify's professional transcript scraping actor. Reliable, fast, and handles videos with or without manual captions.

---

## Apify Actor: dz_omar/youtube-transcript-metadata-extractor ✅

### Quick Start

```javascript
// Via Apify MCP
mcp__apify__call-actor
Actor: "dz_omar/youtube-transcript-metadata-extractor"
Step: "call"
Input: {
  "youtubeUrl": [
    {"url": "https://youtube.com/watch?v=abc123"}
  ],
  "cleaningLevel": "mild",
  "includeTimestamps": true
}
```

### Input Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `youtubeUrl` | array of objects | Yes | - | YouTube video URLs as objects: `[{"url": "..."}]` |
| `cleaningLevel` | string | No | "mild" | Transcript cleaning: "none", "mild", "aggressive" |
| `includeTimestamps` | boolean | No | true | Include detailed timestamp data |

### Output Format

```json
{
  "videoId": "7xTGNNLPyMI",
  "Video_title": "Deep Dive into LLMs like ChatGPT",
  "published_Date": "Feb 5, 2025",
  "Views": "3,834,391 views",
  "likes": "86K",
  "channel": {
    "name": "Andrej Karpathy",
    "id": "UCXUPKJO5MZQN11PqgIvyuvQ",
    "subscribers": "1.11M subscribers"
  },
  "Description": "Full video description...",
  "transcriptText": "Full transcript as single string...",
  "timestamps": [
    {
      "time": "00:00:00",
      "text": "Introduction"
    },
    {
      "time": "00:01:00",
      "text": "Pretraining data..."
    }
  ]
}
```

---

## Usage in youtube-research Skill

### Step 1: Format URL

```javascript
// Full URL format required
const url = "https://youtube.com/watch?v=7xTGNNLPyMI"

// Short URLs also work
const url = "https://youtu.be/7xTGNNLPyMI"
```

### Step 2: Call Apify Actor

```
mcp__apify__call-actor:
  actor: "dz_omar/youtube-transcript-metadata-extractor"
  step: "call"
  input: {
    "youtubeUrl": [{"url": "https://youtube.com/watch?v=7xTGNNLPyMI"}],
    "cleaningLevel": "mild",
    "includeTimestamps": true
  }
```

### Step 3: Extract Transcript Data

```javascript
// Get results from dataset
const result = await getActorOutput(datasetId)

const fullTranscript = result.transcriptText  // Full text as single string
const videoTitle = result.Video_title
const channelName = result.channel.name
const views = result.Views
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
- **Cost:** FREE (platform fee only ~$0.009)
- **Model:** Platform usage fee only (not per-result)
- **Tested:** Andrej Karpathy 3.5hr video cost $0.009

### Performance
- **Speed:** 10-30 seconds per video (depends on length)
- **Reliability:** 100% success rate (verified in testing)
- **Limits:** No hard limits (scales with your usage)
- **Rating:** 4.92/5 (554 users, 99.8% success rate)

### Comparison

| Method | Cost | Reliability | Speed | Notes |
|--------|------|-------------|-------|-------|
| **dz_omar actor** ✅ | FREE | 100% (tested) | 10-30s | VERIFIED Nov 1, 2025 |
| karamelo actor ⚠️ | ~$0.01/video | Unknown | Unknown | OUTDATED - not tested |
| Broken MCP ❌ | FREE | 0% (broken) | N/A | Do not use |
| YouTube Data API | FREE (quota) | Good | Fast | Requires API key setup |

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
<action>User provides: https://youtube.com/watch?v=7xTGNNLPyMI</action>
<action>Call Apify actor: dz_omar/youtube-transcript-metadata-extractor</action>
<action>Input: {
  "youtubeUrl": [{"url": "https://youtube.com/watch?v=7xTGNNLPyMI"}],
  "cleaningLevel": "mild",
  "includeTimestamps": true
}</action>
<action>Receive full transcript with metadata</action>
<action>Analyze hook (first 10s from transcriptText)</action>
<action>Extract structure from chapters/timestamps</action>
<action>Find quotes from transcriptText with timing</action>
<action>Store in research brief with source attribution</action>
<action>Cost: $0.009 (FREE - platform fee only)</action>
```

### In learn-voice Workflow

```xml
<action>User provides video URL or channel</action>
<action>Use Apify: dz_omar/youtube-transcript-metadata-extractor</action>
<action>Input: Single video URL (analyze 1-3 videos for speaking voice)</action>
<action>Receive transcript with full metadata</action>
<action>Analyze speaking patterns from transcriptText:
  - Speaking rhythm: Calculate words per minute
  - Filler words: Count "um", "like", "so", "you know"
  - Transitions: "but", "however", "and then", "so"
  - Teaching style: Step-by-step vs story-driven
  - Conversational markers: Questions, direct address
  - Pacing: Analyze transcript segment lengths
</action>
<action>Store in voice profile (memories.md)</action>
<action>Cost: FREE (platform fee only per video)</action>
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

**dz_omar Apify actor is superior:**
- ✅ Professional maintenance (4.92/5 rating)
- ✅ 100% reliability (verified Nov 1, 2025)
- ✅ FREE (platform fee only ~$0.009)
- ✅ Fast and scalable (10-30s per video)
- ✅ Clear error messages
- ✅ Comprehensive metadata (views, likes, channel info)
- ✅ Handles videos with or without manual captions

---

## Summary

**Use Apify `dz_omar/youtube-transcript-metadata-extractor` for all YouTube transcript extraction.**

**Simple workflow:**
1. Format URL: `[{"url": "https://youtube.com/watch?v=VIDEO_ID"}]`
2. Call actor with youtubeUrl parameter
3. Receive transcript + full video metadata
4. Analyze hook, structure, quotes from transcriptText
5. Cost: FREE (platform fee ~$0.009 per video)

**Verified:** November 1, 2025 with Andrej Karpathy LLM video (3.5 hours, 3.8M views)

**For complete analysis patterns, see:** `analysis-patterns.md`
**For verified actors source, see:** `{project-root}/outputs/11-01-2025/apify-research-session/verified-apify-actors.md`
