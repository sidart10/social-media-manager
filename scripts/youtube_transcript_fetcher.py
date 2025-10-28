#!/usr/bin/env python3
"""
YouTube Transcript Fetcher (Backup Script)
Uses youtube-transcript-api library directly if Apify is unavailable

Usage:
    python youtube_transcript_fetcher.py --channel-handle @siddani09 --max-videos 10
    python youtube_transcript_fetcher.py --video-url https://youtube.com/watch?v=VIDEO_ID
"""

import argparse
import json
import sys
from typing import List, Dict

try:
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.formatters import TextFormatter
except ImportError:
    print("Error: youtube-transcript-api not installed")
    print("Install with: pip install youtube-transcript-api")
    sys.exit(1)


def extract_video_id(url: str) -> str:
    """Extract video ID from YouTube URL"""
    if "youtube.com/watch?v=" in url:
        return url.split("watch?v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    else:
        return url  # Assume it's already a video ID


def get_transcript(video_id: str, languages=['en']) -> Dict:
    """
    Fetch transcript for a single video

    Args:
        video_id: YouTube video ID
        languages: List of language codes to try (default: ['en'])

    Returns:
        Dict with video_id, transcript text, and metadata
    """
    try:
        # Fetch transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(
            video_id,
            languages=languages
        )

        # Format as plain text
        formatter = TextFormatter()
        transcript_text = formatter.format_transcript(transcript_list)

        return {
            'success': True,
            'video_id': video_id,
            'transcript': transcript_text,
            'word_count': len(transcript_text.split()),
            'duration_seconds': transcript_list[-1]['start'] + transcript_list[-1]['duration'] if transcript_list else 0
        }

    except Exception as e:
        return {
            'success': False,
            'video_id': video_id,
            'error': str(e)
        }


def get_channel_videos(channel_handle: str, max_videos: int = 10) -> List[str]:
    """
    Get video IDs from a YouTube channel

    Note: This requires additional scraping or YouTube Data API
    For now, returns empty list and requires manual video URLs

    Args:
        channel_handle: YouTube channel handle (e.g., @siddani09)
        max_videos: Maximum number of videos to fetch

    Returns:
        List of video IDs
    """
    print(f"Warning: Channel video fetching requires YouTube Data API key")
    print(f"Please provide individual video URLs instead")
    return []


def main():
    parser = argparse.ArgumentParser(description='Fetch YouTube transcripts')
    parser.add_argument('--video-url', help='Single YouTube video URL')
    parser.add_argument('--video-id', help='Single YouTube video ID')
    parser.add_argument('--channel-handle', help='YouTube channel handle (e.g., @username)')
    parser.add_argument('--max-videos', type=int, default=10, help='Max videos to fetch from channel')
    parser.add_argument('--languages', default='en', help='Comma-separated language codes (e.g., en,es)')
    parser.add_argument('--output', help='Output JSON file path')

    args = parser.parse_args()

    languages = args.languages.split(',')
    results = []

    # Single video
    if args.video_url:
        video_id = extract_video_id(args.video_url)
        result = get_transcript(video_id, languages)
        results.append(result)

    elif args.video_id:
        result = get_transcript(args.video_id, languages)
        results.append(result)

    # Channel (requires manual video list for now)
    elif args.channel_handle:
        print(f"Error: Channel fetching not yet implemented")
        print(f"Please use --video-url for individual videos")
        print(f"Or use Apify: karamelo/youtube-full-channel-transcripts-extractor")
        sys.exit(1)

    else:
        parser.print_help()
        sys.exit(1)

    # Output results
    output_data = {
        'total_videos': len(results),
        'successful': sum(1 for r in results if r['success']),
        'failed': sum(1 for r in results if not r['success']),
        'transcripts': results
    }

    if args.output:
        with open(args.output, 'w') as f:
            json.dumps(output_data, f, indent=2)
        print(f"Saved to: {args.output}")
    else:
        print(json.dumps(output_data, indent=2))


if __name__ == '__main__':
    main()
