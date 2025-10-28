# Simplified prompts without complex template variables

# For Video Scripts
TITLE_AGENT_PROMPT = "Create a compelling 8-12 word title for the video."
INTRO_HOOK_AGENT_PROMPT = "Create a 150-word compelling hook for the video intro."
INTRO_HOOK_REEL_AGENT_PROMPT = "Create an 8-word maximum hook for a reel/short."
CONTENT_AGENT_PROMPT = "Write the main content for the video script."
CONTENT_AGENT_REEL_PROMPT = "Write fast-paced content for a reel (30-90s)."
TONE_AGENT_PROMPT = "Apply conversational MKBHD-style tone to the script."
TONE_AGENT_REEL_PROMPT = "Make the reel script engaging and fast-paced."
OUTRO_AGENT_PROMPT = "Create an engaging outro with CTA."
REVIEWER_AGENT_PROMPT = "Review and validate the content for accuracy."
SPOKEN_ENGLISH_AGENT_PROMPT = "Convert to natural spoken English with um, like, pauses."

# For Social Media Posts
POST_TITLE_PROMPT = """
Create a compelling hook/opening line for a LinkedIn post.

Make it:
- Compelling (< 140 characters for LinkedIn mobile)
- Data-driven if possible
- Curiosity-inducing
- Professional but engaging

Example patterns:
- "73% of developers don't know this..."
- "When I discovered [X], everything changed"
- "The shift from SaaS to infrastructure is happening"

Return just the hook line.
"""

POST_CONTENT_PROMPT = """
Write the main body content for a LinkedIn post.

Keep it:
- Professional but conversational
- Evidence-based (use data if you have it)
- Scannable (line breaks, clear structure)
- Valuable and actionable
- Around 800-1200 characters

Structure: Hook context → Main points → Value/insight

Return the body only.
"""

POST_CTA_PROMPT = """
Create a compelling call-to-action for LinkedIn.

Make it:
- Specific (not generic "like and share")
- Conversational
- Engagement-focused

Examples:
- "What's been your experience with this?"
- "Share this if you found it valuable"
- "What would you add to this list?"

Return just the CTA.
"""

REVIEWER_PROMPT = """
Review the content for accuracy and clarity.

Check:
- Facts are reasonable
- No obvious errors
- Clear and professional
- Ready to publish

If you find issues, fix them. Otherwise return the content as-is.

Return only the final content.
"""
