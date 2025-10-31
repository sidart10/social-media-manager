"""
Platform formatters package

Each platform has its own module with:
- Character limits and constraints
- Validation logic
- Formatting functions
- Stats calculation
"""

from . import twitter
from . import linkedin
from . import instagram
from . import reels
from . import tiktok
from . import youtube

__all__ = ['twitter', 'linkedin', 'instagram', 'reels', 'tiktok', 'youtube']

SUPPORTED_PLATFORMS = {
    'twitter': twitter,
    'x': twitter,  # Alias
    'linkedin': linkedin,
    'instagram': instagram,
    'reels': reels,
    'tiktok': tiktok,
    'youtube': youtube
}

def get_platform_formatter(platform_name):
    """
    Get formatter module for platform

    Args:
        platform_name: Platform identifier (case-insensitive)

    Returns:
        Platform module or None
    """
    return SUPPORTED_PLATFORMS.get(platform_name.lower())
