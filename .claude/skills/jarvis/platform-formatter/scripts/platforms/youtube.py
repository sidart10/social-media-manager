#!/usr/bin/env python3
"""
YouTube API Formatter

Handles YouTube API-specific description formatting.
Focus: Character limits, timestamps, links, API compliance.
"""

# Platform specifications
PLATFORM_NAME = "YouTube"
CHAR_LIMIT = 5000
ABOVE_FOLD = 200  # Characters visible without "Show more"
TITLE_LIMIT = 100  # Video title limit


def validate(content):
    """Validate YouTube description"""
    char_count = len(content)

    if char_count > CHAR_LIMIT:
        return False, f"Too long: {char_count}/{CHAR_LIMIT} chars"

    return True, f"Valid YouTube description: {char_count}/{CHAR_LIMIT} chars"


def format_content(content, timestamps=None, links=None):
    """Format description for YouTube"""
    lines = []

    parts = [p.strip() for p in content.split('\n\n') if p.strip()]

    # First line - compelling summary (SEO keywords here!)
    if parts:
        lines.append(parts[0])
        lines.append('')  # Spacing

    # Body paragraphs
    for part in parts[1:]:
        lines.append(part)
        lines.append('')

    # Timestamps section (if provided)
    if timestamps:
        lines.append('Timestamps:')
        for ts in timestamps:
            lines.append(f"  {ts}")
        lines.append('')

    # Links section (if provided)
    if links:
        lines.append('Links:')
        for link_text, url in links.items():
            lines.append(f"  {link_text}: {url}")
        lines.append('')

    formatted = '\n'.join(lines)

    if len(formatted) > CHAR_LIMIT:
        formatted = trim_to_limit(formatted)

    return formatted


def trim_to_limit(content, limit=CHAR_LIMIT):
    """Trim to limit"""
    if len(content) <= limit:
        return content

    lines = content.split('\n')
    result = []

    for line in lines:
        if len('\n'.join(result + [line])) <= limit:
            result.append(line)
        else:
            break

    return '\n'.join(result)


def get_stats(content):
    """YouTube-specific stats"""
    char_count = len(content)
    above_fold_text = content[:ABOVE_FOLD]

    # Check if timestamps present
    has_timestamps = '0:00' in content or '00:' in content

    return {
        'platform': PLATFORM_NAME,
        'char_count': char_count,
        'char_limit': CHAR_LIMIT,
        'percentage': round(char_count / CHAR_LIMIT * 100, 1),
        'within_limit': char_count <= CHAR_LIMIT,
        'above_fold_text': above_fold_text,
        'above_fold_length': len(above_fold_text),
        'has_timestamps': has_timestamps,
        'recommendation': get_recommendation(char_count, has_timestamps)
    }


def get_recommendation(char_count, has_timestamps):
    """Recommendations"""
    issues = []

    if char_count > CHAR_LIMIT:
        issues.append(f"Trim {char_count - CHAR_LIMIT} characters")
    elif char_count < 200:
        issues.append("Too short - add more context, links, or timestamps")

    if not has_timestamps:
        issues.append("Consider adding timestamps (improves retention)")

    return issues if issues else ["Valid YouTube description"]
