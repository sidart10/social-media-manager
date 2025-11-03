---
name: youtube-research
description: Analyze YouTube videos using Apify to extract transcripts with timestamps, identify how topics are explained, find structure patterns, and extract quotes. Use when user provides YouTube URLs or asks how YouTubers explain topics. Uses dz_omar/youtube-transcript-metadata-extractor Apify actor (reliable, FREE).
---

# YouTube Research

## Purpose

Extract and analyze YouTube video content using transcripts to understand how topics are explained, find structure patterns, and gather quotes with timestamps.

## Instructions

When user provides YouTube URL(s) or asks about YouTube content:

1. **Extract transcripts using Apify:**
   - Actor: `dz_omar/youtube-transcript-metadata-extractor` ✅ VERIFIED
   - Call actor with: `{"youtubeUrl": [{"url": "..."}], "cleaningLevel": "mild", "includeTimestamps": true}`
   - Note: Parameter is "youtubeUrl" as array of objects (not "urls")
   - Cost: FREE (platform fee only ~$0.009)
   - **See reference/youtube-transcript-tool.md for Apify actor documentation**

2. **Analyze the transcript** to extract hook (first 10 seconds), structure pattern, memorable quotes with timestamps, and teaching approach. **See reference/analysis-patterns.md for detailed extraction methods.**

3. **Present findings** with timestamps for all quotes (format: "quote text" - 2:34).

**For step-by-step analysis patterns and examples, see:** `reference/analysis-patterns.md`

## Why This Actor?

The youtube-transcript MCP server is broken. Apify's `dz_omar/youtube-transcript-metadata-extractor` is:

- ✅ Verified working (Nov 1, 2025)
- ✅ FREE (platform fee only)
- ✅ Reliable and actively maintained (4.92/5 rating)
- ✅ Fast (10-30s per video)
- ✅ Handles videos with or without manual captions
- ✅ Returns comprehensive metadata (views, likes, channel, description)
- ✅ 100% success rate in testing

## Reference Documentation

This Skill includes comprehensive YouTube transcript documentation:

- **`reference/youtube-transcript-tool.md`** - Complete Apify actor reference with parameters, returns, examples, error handling
- **`reference/analysis-patterns.md`** - How to extract hooks, structure, quotes, and teaching patterns from transcripts
- **`reference/workflow-integration.md`** - Integration with research-topic and generate-ideas workflows

**For complete workflow orchestration, see:**
`bmad/agents/content-intelligence/jarvis-sidecar/workflows/research-topic/instructions.md`

## Example

**User provides:** "https://youtube.com/watch?v=7xTGNNLPyMI"

**You:** Call Apify dz_omar/youtube-transcript-metadata-extractor → Extract full transcript → Identify hook from first 10s → Find structure from chapter timestamps → Extract quotes with timing → Analyze teaching style → Cost: FREE ($0.009 platform fee)

**Real test:** Andrej Karpathy LLM video (3.5 hours, 3.8M views) - Full transcript extracted successfully

**See reference/youtube-transcript-tool.md for complete example with actual Apify integration.**
