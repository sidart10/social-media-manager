"""
Shared helpers for short-form vertical platforms (Reels, TikTok)
"""

def create_short_caption(hook, hashtags, max_length=150):
    """
    Create ultra-short caption for vertical video
    
    Args:
        hook: Main caption text
        hashtags: List of hashtags
        max_length: Display limit
    
    Returns:
        Formatted short caption
    """
    # Hook + hashtags inline
    parts = [hook]
    
    if hashtags:
        hashtag_str = ' '.join(f'#{tag}' for tag in hashtags[:5])
        parts.append(hashtag_str)
    
    caption = ' '.join(parts)
    
    # Trim if over display limit
    if len(caption) > max_length:
        caption = caption[:max_length-3] + '...'
    
    return caption
