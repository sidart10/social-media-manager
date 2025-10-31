#!/usr/bin/env python3
"""
Instagram Reels API Formatter

Handles Reels-specific caption formatting for API upload.
Focus: Short captions, media_product_type: REELS, API compliance.
"""

# Platform specifications
PLATFORM_NAME = "Instagram Reels"
CHAR_LIMIT = 2200


def validate(content):
    """Validate Reels caption"""
    char_count = len(content)

    if char_count > CHAR_LIMIT:
        return False, f"Too long: {char_count}/{CHAR_LIMIT} chars"

    return True, f"Valid Reels caption: {char_count}/{CHAR_LIMIT} chars"


def format_content(content):
    """Format caption for Instagram Reels"""
    lines = []

    # Reels captions should be SHORT (video does the talking)
    parts = [p.strip() for p in content.split('\n\n') if p.strip()]

    # Hook (short and punchy)
    if parts:
        lines.append(parts[0])

    # Optional body (1-2 short lines max)
    if len(parts) > 1 and len(parts[1]) < 100:
        lines.append('')
        lines.append(parts[1])

    formatted = '\n'.join(lines)

    if len(formatted) > CHAR_LIMIT:
        formatted = trim_to_limit(formatted)

    return formatted


def trim_to_limit(content, limit=CHAR_LIMIT):
    """Trim to limit"""
    if len(content) <= limit:
        return content
    return content[:limit-3] + '...'


def get_stats(content):
    """Reels-specific stats"""
    char_count = len(content)

    return {
        'platform': PLATFORM_NAME,
        'char_count': char_count,
        'char_limit': CHAR_LIMIT,
        'within_limit': char_count <= CHAR_LIMIT,
        'recommendation': get_recommendation(char_count)
    }


def get_recommendation(char_count):
    """Recommendations"""
    issues = []

    if char_count > CHAR_LIMIT:
        issues.append(f"Trim {char_count - CHAR_LIMIT} characters")

    return issues if issues else ["Valid Reels caption"]
