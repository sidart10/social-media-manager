#!/usr/bin/env python3
"""
Twitter/X API Formatter

Handles Twitter API-specific formatting and content type routing.
Focus: Character limits, content type differentiation, API compliance.
"""

# Platform specifications
PLATFORM_NAME = "Twitter/X"
CHAR_LIMIT = 280
LINK_LENGTH = 23  # Links count as 23 chars

# Content type specifications
CONTENT_TYPES = {
    'tweet': {
        'name': 'Regular Tweet',
        'char_limit': 280,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Text only or with media_ids']
    },
    'long_form': {
        'name': 'Long-Form Post/Article',
        'char_limit': 25000,
        'requires_premium': True,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Premium account', 'Text content']
    },
    'media_tweet': {
        'name': 'Tweet with Media',
        'char_limit': 280,
        'api_endpoint': 'v2/tweets',
        'requirements': ['Text', 'media_ids from upload']
    },
    'thread': {
        'name': 'Thread',
        'char_limit': 280,  # Per tweet
        'api_endpoint': 'v2/tweets',
        'requirements': ['Array of texts', 'reply_to chaining']
    }
}


def validate(content):
    """
    Validate content meets Twitter requirements

    Args:
        content: Tweet content string

    Returns:
        (bool, str): (valid, message)
    """
    char_count = len(content)

    if char_count > CHAR_LIMIT:
        return False, f"Too long: {char_count}/{CHAR_LIMIT} chars"

    # Check for excessive line breaks
    consecutive_breaks = '\n\n\n' in content
    if consecutive_breaks:
        return False, "Too many consecutive line breaks (max 2)"

    return True, f"Valid tweet: {char_count}/{CHAR_LIMIT} chars"


def format_content(content):
    """
    Format content for Twitter

    Args:
        content: Raw content string

    Returns:
        Formatted tweet string
    """
    lines = []

    # Parse content
    parts = [p.strip() for p in content.split('\n\n') if p.strip()]

    # Hook (first part) - most critical
    if parts:
        lines.append(parts[0])

    # Body (remaining parts with spacing)
    for part in parts[1:]:
        lines.append('')  # Empty line
        lines.append(part)

    formatted = '\n'.join(lines)

    # Auto-trim if over limit
    if len(formatted) > CHAR_LIMIT:
        formatted = trim_to_limit(formatted, CHAR_LIMIT)

    return formatted


def trim_to_limit(content, limit=CHAR_LIMIT):
    """
    Trim content to character limit while preserving structure

    Args:
        content: Content to trim
        limit: Character limit (default: 280)

    Returns:
        Trimmed content
    """
    if len(content) <= limit:
        return content

    # Strategy: Preserve hook, trim from end
    lines = content.split('\n')

    # Always keep first line (hook)
    if not lines:
        return content[:limit]

    hook = lines[0]

    # If hook alone is too long, truncate it
    if len(hook) >= limit - 3:
        return hook[:limit-3] + '...'

    # Build back up line by line until we hit limit
    result = [hook]
    remaining_space = limit - len(hook)

    for line in lines[1:]:
        line_with_break = '\n' + line
        if len('\n'.join(result)) + len(line_with_break) <= limit:
            result.append(line)
        else:
            break

    return '\n'.join(result)


def get_stats(content):
    """
    Get content statistics

    Args:
        content: Tweet content

    Returns:
        Dict with statistics
    """
    char_count = len(content)

    return {
        'platform': PLATFORM_NAME,
        'char_count': char_count,
        'char_limit': CHAR_LIMIT,
        'percentage': round(char_count / CHAR_LIMIT * 100, 1),
        'within_limit': char_count <= CHAR_LIMIT,
        'line_count': len(content.split('\n')),
        'recommendation': get_recommendation(char_count)
    }


def get_recommendation(char_count):
    """Get formatting recommendation"""
    issues = []

    if char_count > CHAR_LIMIT:
        issues.append(f"Trim {char_count - CHAR_LIMIT} characters")

    return issues if issues else ["Valid formatting"]


def format_for_api(text, content_type='tweet'):
    """
    Format text for Twitter API based on content type

    Args:
        text: Raw text
        content_type: 'tweet' | 'long_form' | 'media_tweet' | 'thread'

    Returns:
        {
            'formatted': text,  # Twitter doesn't need escaping
            'valid': bool,
            'content_type': type,
            'requires_premium': bool (if long_form),
            'api_payload_template': {...}
        }
    """
    type_spec = CONTENT_TYPES.get(content_type, CONTENT_TYPES['tweet'])

    # Validate length
    char_limit = type_spec['char_limit']
    if len(text) > char_limit:
        return {
            'valid': False,
            'error': f"Text too long: {len(text)}/{char_limit} chars for {content_type}"
        }

    # Twitter API doesn't need text escaping (unlike LinkedIn)
    formatted = text

    # Generate API payload template
    payload = {'text': formatted}

    if content_type == 'long_form' and len(text) > 280:
        # Long-form posts just use same endpoint, but require Premium
        payload['_note'] = 'Requires Premium account'

    return {
        'formatted': formatted,
        'valid': True,
        'content_type': content_type,
        'requires_premium': type_spec.get('requires_premium', False),
        'api_payload_template': payload,
        'char_count': len(text),
        'char_limit': char_limit
    }


if __name__ == "__main__":
    # Test Twitter API formatter
    test_content = "AI automation is changing productivity.\n\nI tested 10 tools.\n\nResults below 👇"

    formatted = format_content(test_content)
    print("Twitter API Formatter Test")
    print("=" * 60)
    print("Formatted:")
    print(formatted)
    print()

    stats = get_stats(formatted)
    print("Stats:")
    for key, value in stats.items():
        print(f"  {key}: {value}")
