#!/usr/bin/env python3
"""
Instagram API Formatter

Handles Instagram Graph API-specific formatting and content type routing.
Focus: Caption limits, content type differentiation (feed/reels/carousel), API compliance.
"""

# Platform specifications
PLATFORM_NAME = "Instagram"
CHAR_LIMIT = 2200
PREVIEW_LENGTH = 125  # Characters before "...more"

# Content type specifications
CONTENT_TYPES = {
    'feed': {
        'name': 'Feed Post',
        'char_limit': 2200,
        'api_field': 'media_product_type: undefined',
        'requirements': ['Caption text', 'image_url or video_url']
    },
    'reels': {
        'name': 'Reels',
        'char_limit': 2200,
        'api_field': 'media_product_type: REELS',
        'requirements': ['Caption', 'video_url', 'aspect_ratio: 9:16', 'share_to_feed: true/false']
    },
    'carousel': {
        'name': 'Carousel',
        'char_limit': 2200,
        'min_items': 2,
        'max_items': 10,
        'requirements': ['Caption', 'children: [media_ids]']
    }
}


def validate(content):
    """Validate Instagram caption"""
    char_count = len(content)

    if char_count > CHAR_LIMIT:
        return False, f"Too long: {char_count}/{CHAR_LIMIT} chars"

    return True, f"Valid Instagram caption: {char_count}/{CHAR_LIMIT} chars"


def format_content(content):
    """Format caption for Instagram"""
    lines = []

    parts = [p.strip() for p in content.split('\n\n') if p.strip()]

    # Hook - CRITICAL (first 125 chars show in preview)
    if parts:
        lines.append(parts[0])

    # Spacing after hook
    lines.append('')

    # Body with spacing
    for part in parts[1:]:
        lines.append(part)
        lines.append('')

    formatted = '\n'.join(lines)

    if len(formatted) > CHAR_LIMIT:
        formatted = trim_to_limit(formatted)

    return formatted


def trim_to_limit(content, limit=CHAR_LIMIT):
    """Trim preserving hook"""
    if len(content) <= limit:
        return content

    lines = content.split('\n')
    result = [lines[0]] if lines else []

    for line in lines[1:]:
        if len('\n'.join(result + [line])) <= limit:
            result.append(line)
        else:
            break

    return '\n'.join(result)


def get_stats(content):
    """Get Instagram-specific stats"""
    char_count = len(content)
    preview = content[:PREVIEW_LENGTH]

    return {
        'platform': PLATFORM_NAME,
        'char_count': char_count,
        'char_limit': CHAR_LIMIT,
        'percentage': round(char_count / CHAR_LIMIT * 100, 1),
        'within_limit': char_count <= CHAR_LIMIT,
        'preview_text': preview,
        'preview_length': len(preview),
        'hook_quality': 'good' if len(preview.split('\n')[0]) < PREVIEW_LENGTH else 'first line too long',
        'recommendation': get_recommendation(char_count)
    }


def get_recommendation(char_count):
    """Recommendations for Instagram"""
    issues = []

    if char_count > CHAR_LIMIT:
        issues.append(f"Trim {char_count - CHAR_LIMIT} characters")

    return issues if issues else ["Valid Instagram caption"]


def format_for_api(text, content_type='feed'):
    """
    Format caption for Instagram Graph API

    Args:
        text: Caption text
        content_type: 'feed' | 'reels' | 'carousel'

    Returns:
        {
            'formatted': text,  # Instagram doesn't need escaping
            'valid': bool,
            'content_type': type,
            'api_payload_template': {...}
        }
    """
    type_spec = CONTENT_TYPES.get(content_type, CONTENT_TYPES['feed'])

    if len(text) > type_spec['char_limit']:
        return {
            'valid': False,
            'error': f"Caption too long: {len(text)}/{type_spec['char_limit']}"
        }

    # Instagram API doesn't need text escaping
    formatted = text

    # Generate API payload template based on type
    payload = {'caption': formatted}

    if content_type == 'reels':
        payload['media_type'] = 'REELS'
        payload['_note'] = 'Set media_product_type=REELS in API call'
    elif content_type == 'carousel':
        payload['_note'] = 'Requires children array with 2-10 media IDs'

    return {
        'formatted': formatted,
        'valid': True,
        'content_type': content_type,
        'api_payload_template': payload,
        'char_count': len(text)
    }
