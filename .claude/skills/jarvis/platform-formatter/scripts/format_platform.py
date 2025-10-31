#!/usr/bin/env python3
"""
Platform Formatter - Main Orchestrator

Routes content to appropriate platform API formatter.

Usage:
    python format_platform.py <platform> --content "your content"
    python format_platform.py twitter --content "AI is changing everything"
    python format_platform.py linkedin --content "Long form post..."

Platforms:
    twitter, linkedin, instagram, reels, tiktok, youtube
"""

import sys
import json
from pathlib import Path

# Add platforms directory to path
sys.path.insert(0, str(Path(__file__).parent))

from platforms import get_platform_formatter


def format_for_platform(platform, content, content_type='default'):
    """
    Format content for specific platform API with content type support

    Args:
        platform: Platform name (twitter, linkedin, etc.)
        content: Raw content to format
        content_type: Type of content (tweet, long_form, reels, etc.)

    Returns:
        Dict with formatted content and stats
    """
    # Get platform formatter
    formatter = get_platform_formatter(platform)

    if not formatter:
        return {
            'error': f"Unknown platform: {platform}",
            'supported': list_supported_platforms()
        }

    # Format content
    try:
        # Call with content type if supported (format_for_api method)
        if hasattr(formatter, 'format_for_api') and content_type != 'default':
            result = formatter.format_for_api(content, content_type)

            # If format_for_api returns error
            if not result.get('valid', False):
                return {
                    'error': result.get('error', 'Invalid content'),
                    'platform': platform
                }

            return {
                'platform': platform,
                'formatted_content': result['formatted'],
                'content_type': result['content_type'],
                'api_payload': result.get('api_payload_template', {}),
                'requires_premium': result.get('requires_premium', False),
                'valid': result['valid'],
                'validation_message': f"Valid {result['content_type']} content",
                'char_count': result.get('char_count', len(result['formatted'])),
                'char_limit': result.get('char_limit', 'N/A')
            }
        else:
            # Fallback to traditional format_content
            formatted = formatter.format_content(content)
            stats = formatter.get_stats(formatted)
            valid, message = formatter.validate(formatted)

            return {
                'platform': platform,
                'formatted_content': formatted,
                'stats': stats,
                'valid': valid,
                'validation_message': message,
                'original_length': len(content),
                'formatted_length': len(formatted)
            }

    except Exception as e:
        return {
            'error': f"Formatting failed: {str(e)}",
            'platform': platform
        }


def list_supported_platforms():
    """List all supported platforms"""
    from platforms import SUPPORTED_PLATFORMS
    return sorted(set(SUPPORTED_PLATFORMS.keys()))


def main():
    if len(sys.argv) < 3 or '--content' not in sys.argv:
        print("Usage: format_platform.py <platform> --content <text> [--type <content_type>]")
        print("\nSupported platforms:")
        for p in list_supported_platforms():
            print(f"  - {p}")
        print("\nContent types:")
        print("  Twitter:   tweet, long_form, media_tweet, thread")
        print("  Instagram: feed, reels, carousel")
        print("  LinkedIn:  text, image, multi_image, document, video")
        print("\nExamples:")
        print("  format_platform.py twitter --content 'Hello world' --type tweet")
        print("  format_platform.py twitter --content 'Long article...' --type long_form")
        print("  format_platform.py instagram --content 'Reel caption' --type reels")
        print("  format_platform.py linkedin --content 'My (post) text' --type text")
        sys.exit(1)

    platform = sys.argv[1]

    # Parse content
    content_idx = sys.argv.index('--content')
    content = sys.argv[content_idx + 1] if content_idx + 1 < len(sys.argv) else ""

    # Parse content type
    content_type = 'default'
    if '--type' in sys.argv:
        type_idx = sys.argv.index('--type')
        content_type = sys.argv[type_idx + 1] if type_idx + 1 < len(sys.argv) else 'default'

    print(f"Formatting for {platform.upper()} API" + (f" ({content_type})" if content_type != 'default' else ""))
    print()

    result = format_for_platform(platform, content, content_type)

    if 'error' in result:
        print(f"❌ Error: {result['error']}")
        if 'supported' in result:
            print(f"\nSupported platforms: {', '.join(result['supported'])}")
        sys.exit(1)

    # Display results
    print("=" * 60)
    print("FORMATTED CONTENT")
    print("=" * 60)
    print()
    print(result['formatted_content'])
    print()
    print("=" * 60)
    print("STATISTICS")
    print("=" * 60)
    print()

    # Handle API format response (with content_type)
    if 'content_type' in result:
        print(f"Platform: {result['platform'].title()}")
        print(f"Content Type: {result['content_type']}")
        print(f"Characters: {result['char_count']}/{result['char_limit']}")
        print(f"Valid: {'✅' if result['valid'] else '❌'} {result['validation_message']}")

        if result.get('requires_premium'):
            print(f"⚠️  Requires: Premium account")

        if 'api_payload' in result:
            print(f"\nAPI Payload Template:")
            import json
            print(json.dumps(result['api_payload'], indent=2))

    # Handle legacy format response (with stats)
    elif 'stats' in result:
        print(f"Platform: {result['stats']['platform']}")
        print(f"Characters: {result['stats']['char_count']}/{result['stats'].get('char_limit', 'N/A')}")
        print(f"Valid: {'✅' if result['valid'] else '❌'} {result['validation_message']}")

        if 'recommendation' in result['stats']:
            print(f"\nRecommendations:")
            for rec in result['stats']['recommendation']:
                print(f"  - {rec}")

    print()
    print("=" * 60)

    # Also output as JSON for programmatic use
    if '--json' in sys.argv:
        print("\nJSON Output:")
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
