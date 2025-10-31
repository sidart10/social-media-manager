#!/usr/bin/env python3
"""
TikTok API Formatter

Handles TikTok API-specific caption formatting.
Focus: Short captions, character limits, API compliance.
"""

# Platform specifications
PLATFORM_NAME = "TikTok"
CHAR_LIMIT = 2200
DISPLAY_LIMIT = 150  # Characters shown before truncation


def validate(content):
    """Validate TikTok caption"""
    char_count = len(content)

    if char_count > CHAR_LIMIT:
        return False, f"Too long: {char_count}/{CHAR_LIMIT} chars"

    return True, f"Valid TikTok caption: {char_count}/{CHAR_LIMIT} chars"


def format_content(content):
    """Format caption for TikTok"""
    # TikTok = VERY short captions
    parts = [p.strip() for p in content.split('\n\n') if p.strip()]

    # Hook (first line only, keep under display limit)
    if parts:
        hook = parts[0]
        if len(hook) > DISPLAY_LIMIT:
            hook = hook[:DISPLAY_LIMIT-3] + '...'
        formatted = hook
    else:
        formatted = content

    if len(formatted) > CHAR_LIMIT:
        formatted = formatted[:CHAR_LIMIT-3] + '...'

    return formatted


def get_stats(content):
    """TikTok-specific stats"""
    char_count = len(content)
    display_text = content[:DISPLAY_LIMIT]

    return {
        'platform': PLATFORM_NAME,
        'char_count': char_count,
        'char_limit': CHAR_LIMIT,
        'display_limit': DISPLAY_LIMIT,
        'display_text': display_text,
        'within_display': char_count <= DISPLAY_LIMIT,
        'within_limit': char_count <= CHAR_LIMIT,
        'recommendation': get_recommendation(char_count)
    }


def get_recommendation(char_count):
    """Recommendations"""
    issues = []

    if char_count > CHAR_LIMIT:
        issues.append(f"Trim {char_count - CHAR_LIMIT} characters")
    elif char_count > DISPLAY_LIMIT:
        issues.append(f"Caption will be truncated (over {DISPLAY_LIMIT} char display limit)")

    return issues if issues else ["Valid TikTok caption"]
