#!/usr/bin/env python3
"""
AutoGen Agent Definitions
Multi-agent system for script and post generation
"""

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from prompts import (
    TITLE_AGENT_PROMPT,
    INTRO_HOOK_AGENT_PROMPT,
    INTRO_HOOK_REEL_AGENT_PROMPT,
    CONTENT_AGENT_PROMPT,
    CONTENT_AGENT_REEL_PROMPT,
    TONE_AGENT_PROMPT,
    TONE_AGENT_REEL_PROMPT,
    OUTRO_AGENT_PROMPT,
    REVIEWER_AGENT_PROMPT,
    SPOKEN_ENGLISH_AGENT_PROMPT,
    POST_TITLE_PROMPT,
    POST_CONTENT_PROMPT,
    POST_CTA_PROMPT
)

def create_agents(
    api_key: str,
    model: str = "gpt-5",
    content_type: str = "script",
    platform: str = "youtube",
    duration: str = "90s",
    tone: str = "professional",
    audience: str = "general",
    objective: str = "educate",
    gender: str = "neutral",
    voice_profile: dict = None,
    research_data: dict = None
):
    """
    Create appropriate agent team based on content type

    Args:
        api_key: OpenAI API key
        model: Model to use (gpt-5, gpt-4o, etc.)
        content_type: "script" or "post"
        platform: Platform name
        duration: Duration (for scripts)
        tone: Desired tone
        audience: Target audience
        objective: Content objective
        gender: Presenter gender
        voice_profile: User's voice characteristics
        research_data: Research brief data

    Returns:
        Dictionary of agents for the team
    """

    # Create model client
    model_client = OpenAIChatCompletionClient(
        model=model,
        api_key=api_key
    )

    # Build voice profile instructions if available
    voice_instructions = ""
    if voice_profile:
        voice_instructions = f"""
CRITICAL: Match user's authentic voice:
- Vocabulary: {voice_profile.get('vocab_level', 'moderate')}
- Sentence style: {voice_profile.get('sentence_pattern', 'varied')}
- Tone score: {voice_profile.get('tone_score', '5')}/10 (1=formal, 10=casual)
- Signature phrases to use naturally: {voice_profile.get('signature_phrases', [])}
- Emoji usage: {voice_profile.get('emoji_pattern', 'moderate')}

Examples of user's writing:
{voice_profile.get('examples', '')}
"""

    # Build research context if available
    research_context = ""
    if research_data:
        research_context = f"""
Research data to incorporate:

Facts & Statistics:
{chr(10).join(research_data.get('facts', []))}

Expert Quotes:
{chr(10).join(research_data.get('quotes', []))}

Examples:
{chr(10).join(research_data.get('examples', []))}

Use these to support your points!
"""

    # Format prompts with parameters
    def format_prompt(prompt: str) -> str:
        return prompt.format(
            objective=objective,
            audience=audience,
            tone=tone,
            gender=gender,
            duration=duration,
            voice_profile_instructions=voice_instructions,
            platform=platform
        )

    # SCRIPTS: Master Agent (determines reel vs video)
    master_agent = AssistantAgent(
        name="Master_Agent",
        system_message="""
        You determine from the duration whether this is a reel or a video.
        If duration is 60 seconds or less, say "It is a reel."
        Otherwise say "It is a video."
        """,
        model_client=model_client
    )

    # Research Agent (uses provided research data)
    research_agent = AssistantAgent(
        name="Research_Agent",
        system_message=f"""
        You gather and organize research data for the script/post.

        {research_context}

        Provide a concise summary of key points for other agents to use.
        """,
        model_client=model_client
    )

    # POSTS: Title/Hook Agent
    post_title_agent = AssistantAgent(
        name="Post_Title_Agent",
        system_message=format_prompt(POST_TITLE_PROMPT),
        model_client=model_client
    )

    # POSTS: Content Agent
    post_content_agent = AssistantAgent(
        name="Post_Content_Agent",
        system_message=format_prompt(POST_CONTENT_PROMPT),
        model_client=model_client
    )

    # POSTS: CTA Agent
    post_cta_agent = AssistantAgent(
        name="Post_CTA_Agent",
        system_message=format_prompt(POST_CTA_PROMPT),
        model_client=model_client
    )

    # SCRIPTS: Title Agent
    title_agent = AssistantAgent(
        name="Title_Agent",
        system_message=format_prompt(TITLE_AGENT_PROMPT),
        model_client=model_client
    )

    # SCRIPTS: Hook Agents
    intro_hook_agent = AssistantAgent(
        name="Intro_Hook_Agent",
        system_message=format_prompt(INTRO_HOOK_AGENT_PROMPT),
        model_client=model_client
    )

    intro_hook_reel_agent = AssistantAgent(
        name="Intro_Hook_Agent_Reel",
        system_message=format_prompt(INTRO_HOOK_REEL_AGENT_PROMPT),
        model_client=model_client
    )

    # SCRIPTS: Content Agents
    content_agent = AssistantAgent(
        name="Content_Agent",
        system_message=format_prompt(CONTENT_AGENT_PROMPT) + research_context,
        model_client=model_client
    )

    content_agent_reel = AssistantAgent(
        name="Content_Agent_Reel",
        system_message=format_prompt(CONTENT_AGENT_REEL_PROMPT) + research_context,
        model_client=model_client
    )

    # SCRIPTS: Tone Agents
    tone_agent = AssistantAgent(
        name="Tone_Agent",
        system_message=format_prompt(TONE_AGENT_PROMPT),
        model_client=model_client
    )

    tone_agent_reel = AssistantAgent(
        name="Tone_Agent_Reel",
        system_message=format_prompt(TONE_AGENT_REEL_PROMPT),
        model_client=model_client
    )

    # SCRIPTS: Outro Agent
    outro_agent = AssistantAgent(
        name="Outro_Agent",
        system_message=format_prompt(OUTRO_AGENT_PROMPT),
        model_client=model_client
    )

    # SCRIPTS: Spoken English Agent
    spoken_english_agent = AssistantAgent(
        name="Spoken_English_Agent",
        system_message=format_prompt(SPOKEN_ENGLISH_AGENT_PROMPT),
        model_client=model_client
    )

    # UNIVERSAL: Reviewer Agent
    reviewer_agent = AssistantAgent(
        name="Reviewer_Agent",
        system_message=REVIEWER_AGENT_PROMPT + research_context,
        model_client=model_client
    )

    return {
        # Universal
        'master': master_agent,
        'research': research_agent,
        'reviewer': reviewer_agent,

        # Posts
        'post_title': post_title_agent,
        'post_content': post_content_agent,
        'post_cta': post_cta_agent,

        # Scripts - Videos
        'title': title_agent,
        'intro_hook': intro_hook_agent,
        'content': content_agent,
        'tone': tone_agent,
        'outro': outro_agent,
        'spoken': spoken_english_agent,

        # Scripts - Reels
        'intro_hook_reel': intro_hook_reel_agent,
        'content_reel': content_agent_reel,
        'tone_reel': tone_agent_reel
    }
