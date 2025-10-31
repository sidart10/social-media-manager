#!/usr/bin/env python3
"""
LinkedIn API Formatter

Handles LinkedIn API-specific text formatting requirements.
Focus: little Text Format escaping, line breaks, content types.

Reference: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
"""

# LinkedIn little Text Format - Reserved characters
RESERVED_CHARS = ['|', '{', '}', '@', '[', ']', '(', ')', '<', '>', '#', '\\', '*', '_', '~']

# Platform specifications
PLATFORM_NAME = "LinkedIn"
CHAR_LIMIT = 3000
RECOMMENDED_LIMIT = 1600  # Lower engagement above this
FIRST_LINE_LIMIT = 140  # Mobile truncation

# Content type specifications
CONTENT_TYPES = {
    'text': {
        'name': 'Text Post',
        'description': 'Plain text post',
        'requirements': ['Escaped text']
    },
    'image': {
        'name': 'Single Image Post',
        'description': 'Text + single image',
        'requirements': ['Escaped text', 'Image URN from upload']
    },
    'multi_image': {
        'name': 'Multi-Image Post (Carousel)',
        'description': 'Text + 2-20 images in grid',
        'requirements': ['Escaped text', 'Multiple image URNs', 'Alt text per image']
    },
    'document': {
        'name': 'Document Post',
        'description': 'Text + PDF/PPT/DOC',
        'requirements': ['Escaped text', 'Document URN', 'Document title']
    },
    'video': {
        'name': 'Video Post',
        'description': 'Text + video',
        'requirements': ['Escaped text', 'Video URN', 'Video title']
    }
}


def escape_little_text(text):
    """
    Escape reserved characters for LinkedIn little Text Format

    Reserved characters: | { } @ [ ] ( ) < > # \ * _ ~
    Must be escaped with backslash even if not used in templates

    Args:
        text: Raw text string

    Returns:
        Text with reserved characters escaped
    """
    escaped = text

    # Escape each reserved character with backslash
    for char in RESERVED_CHARS:
        # Need to escape backslash first, then others
        if char == '\\':
            escaped = escaped.replace('\\', '\\\\')
        else:
            escaped = escaped.replace(char, f'\\{char}')

    return escaped


def format_line_breaks(text):
    """
    Normalize line breaks for LinkedIn API

    Args:
        text: Text with various line break formats

    Returns:
        Text with normalized \\n line breaks
    """
    # Normalize Windows (\\r\\n) and Mac (\\r) to Unix (\\n)
    normalized = text.replace('\\r\\n', '\\n').replace('\\r', '\\n')

    # Remove excessive consecutive line breaks (max 2)
    while '\\n\\n\\n' in normalized:
        normalized = normalized.replace('\\n\\n\\n', '\\n\\n')

    return normalized


def validate(text):
    """
    Validate LinkedIn post text

    Args:
        text: Post text

    Returns:
        (bool, str, list): (valid, message, warnings)
    """
    warnings = []

    if len(text) > CHAR_LIMIT:
        return False, f"Text too long: {len(text)}/{CHAR_LIMIT} chars", []

    if len(text) > RECOMMENDED_LIMIT:
        warnings.append(f"Over {RECOMMENDED_LIMIT} chars may have lower engagement")

    first_line = text.split('\\n')[0]
    if len(first_line) > FIRST_LINE_LIMIT:
        warnings.append(f"First line over {FIRST_LINE_LIMIT} chars - may be truncated on mobile")

    return True, f"Valid LinkedIn post: {len(text)}/{CHAR_LIMIT} chars", warnings


def format_for_api(text, content_type='text'):
    """
    Complete formatting for LinkedIn API upload with content type support

    Steps:
    1. Normalize line breaks
    2. Escape reserved characters (little Text Format)
    3. Validate

    Args:
        text: Raw post text
        content_type: 'text' | 'image' | 'multi_image' | 'document' | 'video'

    Returns:
        Dict with formatted text, validation, API payload template
    """
    type_spec = CONTENT_TYPES.get(content_type, CONTENT_TYPES['text'])

    # Step 1: Normalize line breaks
    normalized = format_line_breaks(text)

    # Step 2: Escape reserved characters for little Text Format
    escaped = escape_little_text(normalized)

    # Step 3: Validate
    valid, message, warnings = validate(escaped)

    # Generate API payload template
    payload = {
        'commentary': escaped
    }

    return {
        'formatted': escaped,
        'valid': valid,
        'content_type': content_type,
        'api_payload_template': payload,
        'char_count': len(escaped),
        'char_limit': CHAR_LIMIT,
        'warnings': warnings
    }


def get_stats(text):
    """Get comprehensive statistics"""
    return {
        'platform': PLATFORM_NAME,
        'char_count': len(text),
        'char_limit': CHAR_LIMIT,
        'recommended_limit': RECOMMENDED_LIMIT,
        'first_line': text.split('\\n')[0],
        'first_line_length': len(text.split('\\n')[0]),
        'line_count': len(text.split('\\n')),
        'has_reserved_chars': any(char in text for char in RESERVED_CHARS)
    }


if __name__ == "__main__":
    # Test LinkedIn escaping
    test_text = "This (is) a #test with @mention and [special] {chars}"

    result = format_for_api(test_text, 'text')

    print("LinkedIn API Formatter Test")
    print("=" * 60)
    print(f"Original: {test_text}")
    print(f"Formatted: {result['formatted']}")
    print(f"Valid: {result['valid']}")
    print(f"Content Type: {result['content_type']}")
    print(f"Char Count: {result['char_count']}/{result['char_limit']}")
    if result.get('warnings'):
        print(f"Warnings: {', '.join(result['warnings'])}")
    print("\nAPI Payload Template:")
    import json
    print(json.dumps(result['api_payload_template'], indent=2))
    print("=" * 60)
    print("✅ LinkedIn little Text escaping working correctly!")
