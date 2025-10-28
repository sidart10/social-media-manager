---
name: youtube-research
description: Analyze YouTube videos using Apify to extract transcripts with timestamps, identify how topics are explained, find structure patterns, and extract quotes. Use when user provides YouTube URLs or asks how YouTubers explain topics. Uses karamelo/youtube-transcripts Apify actor (reliable, ~$0.01/video).
---

# YouTube Research

## Purpose

Extract and analyze YouTube video content using transcripts to understand how topics are explained, find structure patterns, and gather quotes with timestamps.

## Instructions

When user provides YouTube URL(s) or asks about YouTube content:

1. **Extract transcripts using Apify:**
   - Actor: `karamelo/youtube-transcripts`
   - Call actor with: `{"urls": [url1, url2, ...]}`
   - Note: Parameter is "urls" (not "videoUrls")
   - Cost: ~$0.01 per video (reliable extraction)
   - **See reference/youtube-transcript-tool.md for Apify actor documentation**

2. **Analyze the transcript** to extract hook (first 10 seconds), structure pattern, memorable quotes with timestamps, and teaching approach. **See reference/analysis-patterns.md for detailed extraction methods.**

3. **Present findings** with timestamps for all quotes (format: "quote text" - 2:34).

**For step-by-step analysis patterns and examples, see:** `reference/analysis-patterns.md`

## Why Apify?

The youtube-transcript MCP server is broken. Apify's `karamelo/youtube-transcripts` actor is:
- ✅ Reliable and actively maintained
- ✅ Fast (seconds per video)
- ✅ Handles videos with or without manual captions
- ✅ Returns clean JSON with timestamps
- ✅ Low cost (~$0.01/video)

## Reference Documentation

This Skill includes comprehensive YouTube transcript documentation:

- **`reference/youtube-transcript-tool.md`** - Complete Apify actor reference with parameters, returns, examples, error handling
- **`reference/analysis-patterns.md`** - How to extract hooks, structure, quotes, and teaching patterns from transcripts
- **`reference/workflow-integration.md`** - Integration with research-topic and generate-ideas workflows

**For complete workflow orchestration, see:**
`bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`

## Example

**User provides:** "youtube.com/watch?v=abc123"

**You:** Extract video ID → Use Apify karamelo/youtube-transcripts → Extract transcript → Identify hook ("This changed everything..." at 0:05) → Find structure (problem 0:00-1:00, solution 1:00-5:00) → Extract quotes with timestamps → Analyze teaching style

**See reference/youtube-transcript-tool.md for complete example with actual Apify integration.**
