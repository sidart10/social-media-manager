#!/usr/bin/env python3
"""
Content Type Definitions - Posts vs Scripts
Handles Twitter threads, long-form posts, and video scripts
"""

from enum import Enum
from typing import Dict, List

class ContentType(Enum):
    """Supported content types"""
    TWITTER_THREAD = "twitter_thread"
    TWITTER_LONGFORM = "twitter_longform"
    LINKEDIN_POST = "linkedin_post"
    INSTAGRAM_CAPTION = "instagram_caption"
    YOUTUBE_SCRIPT = "youtube_script"
    REEL_SCRIPT = "reel_script"
    TIKTOK_SCRIPT = "tiktok_script"

class Platform(Enum):
    """Supported platforms"""
    TWITTER = "twitter"
    LINKEDIN = "linkedin"
    INSTAGRAM = "instagram"
    YOUTUBE = "youtube"
    REELS = "reels"
    TIKTOK = "tiktok"

# Content type specifications
CONTENT_SPECS = {
    ContentType.TWITTER_THREAD: {
        'format': 'thread',
        'structure': 'hook_tweet → point_tweets → cta_tweet',
        'tweet_length': 280,  # Or 25000 if Premium
        'thread_length': '5-10 tweets',
        'style': 'conversational',
        'includes_timestamps': False,
        'agent_team': 'post_team'  # Not script_team
    },

    ContentType.TWITTER_LONGFORM: {
        'format': 'single_post',
        'structure': 'hook_para → content_paras → cta',
        'max_length': 25000,  # Premium
        'optimal_length': '500-2500 chars',
        'style': 'conversational but substantial',
        'includes_timestamps': False,
        'agent_team': 'post_team'
    },

    ContentType.LINKEDIN_POST: {
        'format': 'single_post',
        'structure': 'hook (< 140) → body (< 1600) → cta',
        'max_length': 3000,
        'optimal_length': 1600,
        'hook_limit': 140,  # Mobile truncation
        'style': 'professional but conversational',
        'includes_timestamps': False,
        'agent_team': 'post_team'
    },

    ContentType.INSTAGRAM_CAPTION: {
        'format': 'caption',
        'structure': 'hook (125 visible) → story → value → cta',
        'max_length': 2200,
        'hook_limit': 125,  # Before "...more"
        'style': 'story-driven, engaging',
        'emoji_count': '2-5',
        'includes_timestamps': False,
        'agent_team': 'post_team'
    },

    ContentType.YOUTUBE_SCRIPT: {
        'format': 'script',
        'structure': 'hook → intro → points → outro',
        'duration': '30s-10min',
        'style': 'MKBHD conversational',
        'includes_timestamps': True,
        'includes_visual_cues': True,
        'spoken_style': True,
        'agent_team': 'script_team'
    },

    ContentType.REEL_SCRIPT: {
        'format': 'script',
        'structure': '3s_hook → fast_beats → cta',
        'duration': '30-90s',
        'style': 'fast-paced, engaging',
        'hook_duration': '3s',
        'includes_timestamps': True,
        'includes_visual_cues': True,
        'spoken_style': True,
        'agent_team': 'reel_team'
    },

    ContentType.TIKTOK_SCRIPT: {
        'format': 'script',
        'structure': '3s_hook → fast_beats → cta',
        'duration': '15-180s',
        'style': 'energetic, trend-aware',
        'hook_duration': '3s',
        'includes_timestamps': True,
        'includes_visual_cues': True,
        'spoken_style': True,
        'agent_team': 'reel_team'
    }
}

def determine_content_type(platform: str, content_format: str = None, duration: str = None) -> ContentType:
    """
    Determine content type from parameters

    Args:
        platform: Platform name
        content_format: "thread", "longform", "post", "script", etc.
        duration: For scripts (e.g., "60s", "5min")

    Returns:
        ContentType enum
    """
    # Twitter
    if platform.lower() == "twitter":
        if content_format == "thread":
            return ContentType.TWITTER_THREAD
        elif content_format == "longform":
            return ContentType.TWITTER_LONGFORM
        else:
            # Default: thread for multiple points, longform for single topic
            return ContentType.TWITTER_THREAD

    # LinkedIn
    elif platform.lower() == "linkedin":
        return ContentType.LINKEDIN_POST

    # Instagram
    elif platform.lower() == "instagram":
        return ContentType.INSTAGRAM_CAPTION

    # YouTube
    elif platform.lower() == "youtube":
        return ContentType.YOUTUBE_SCRIPT

    # Reels
    elif platform.lower() in ["reels", "instagram-reels"]:
        return ContentType.REEL_SCRIPT

    # TikTok
    elif platform.lower() == "tiktok":
        return ContentType.TIKTOK_SCRIPT

    else:
        # Default to LinkedIn post
        return ContentType.LINKEDIN_POST

def get_agent_team(content_type: ContentType) -> str:
    """Get which agent team to use"""
    spec = CONTENT_SPECS.get(content_type, {})
    return spec.get('agent_team', 'post_team')

def get_structure(content_type: ContentType) -> str:
    """Get content structure for this type"""
    spec = CONTENT_SPECS.get(content_type, {})
    return spec.get('structure', 'hook → content → cta')

def get_style(content_type: ContentType) -> str:
    """Get recommended style"""
    spec = CONTENT_SPECS.get(content_type, {})
    return spec.get('style', 'professional')
