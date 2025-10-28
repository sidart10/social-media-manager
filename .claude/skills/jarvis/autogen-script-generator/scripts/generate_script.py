#!/usr/bin/env python3
"""
AutoGen Multi-Agent Script Generator
Main entry point for generating scripts and posts

Usage:
    python generate_script.py --topic "AI automation" --platform "youtube" --duration "90s"
    python generate_script.py --topic "Productivity tips" --platform "twitter" --format "thread"
"""

import asyncio
import argparse
import json
import sys
from pathlib import Path

from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import MaxMessageTermination
from autogen_agentchat.messages import TextMessage
from autogen_core import CancellationToken

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from agents import create_agents
from content_types import ContentType, Platform, determine_content_type, get_agent_team, CONTENT_SPECS
from research_agent import load_research_brief

def load_voice_profile(file_path: str) -> dict:
    """Load voice profile from memories.md"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        # Simple extraction (can be enhanced)
        voice = {
            'vocab_level': 'moderate',
            'sentence_pattern': 'varied',
            'tone_score': '5',
            'signature_phrases': [],
            'emoji_pattern': 'moderate'
        }

        # TODO: Parse actual voice profile from markdown
        # For now, return defaults

        return voice

    except FileNotFoundError:
        return None

async def generate_content(
    topic: str,
    platform: str,
    content_format: str = None,
    duration: str = None,
    tone: str = "professional",
    audience: str = "general",
    objective: str = "educate",
    research_file: str = None,
    voice_file: str = None,
    api_key: str = None
):
    """
    Generate content using AutoGen multi-agent system

    Args:
        topic: What to write about
        platform: Platform (youtube, linkedin, twitter, reels, tiktok, instagram)
        content_format: "thread", "longform", "post", "script" (optional)
        duration: For scripts (e.g., "60s", "5min")
        tone: Tone/style
        audience: Target audience
        objective: Content goal
        research_file: Path to research brief
        voice_file: Path to voice profile
        api_key: OpenAI API key

    Returns:
        Generated content as string
    """

    # Determine content type
    content_type = determine_content_type(platform, content_format, duration)
    print(f"Content type: {content_type.value}", file=sys.stderr)

    # Load research data if provided
    research_data = None
    if research_file:
        research_data = load_research_brief(research_file)
        print(f"Loaded research: {len(research_data.get('facts', []))} facts", file=sys.stderr)

    # Load voice profile if provided
    voice_profile = None
    if voice_file:
        voice_profile = load_voice_profile(voice_file)
        print(f"Loaded voice profile", file=sys.stderr)

    # Create agents
    agents_dict = create_agents(
        api_key=api_key,
        model="gpt-5",
        content_type=content_type.value,
        platform=platform,
        duration=duration or "90s",
        tone=tone,
        audience=audience,
        objective=objective,
        gender="neutral",
        voice_profile=voice_profile,
        research_data=research_data
    )

    # Determine which agent team to use
    agent_team_type = get_agent_team(content_type)

    if agent_team_type == 'post_team':
        # For posts (Twitter, LinkedIn, Instagram)
        team = RoundRobinGroupChat(
            [
                agents_dict['research'],
                agents_dict['post_title'],
                agents_dict['post_content'],
                agents_dict['post_cta'],
                agents_dict['reviewer']
            ],
            termination_condition=MaxMessageTermination(max_messages=10)  # Increased to allow 2 full rounds
        )

    elif agent_team_type == 'reel_team':
        # For reels/shorts
        team = RoundRobinGroupChat(
            [
                agents_dict['research'],
                agents_dict['intro_hook_reel'],
                agents_dict['content_reel'],
                agents_dict['tone_reel'],
                agents_dict['reviewer']
            ],
            termination_condition=MaxMessageTermination(max_messages=8)
        )

    else:  # script_team
        # For YouTube videos
        team = RoundRobinGroupChat(
            [
                agents_dict['research'],
                agents_dict['title'],
                agents_dict['intro_hook'],
                agents_dict['content'],
                agents_dict['tone'],
                agents_dict['outro'],
                agents_dict['reviewer']
            ],
            termination_condition=MaxMessageTermination(max_messages=10)
        )

    # Run the team
    print(f"Running {agent_team_type} with {len(team._participants)} agents...", file=sys.stderr)
    print(f"Starting collaboration (this may take 30-60 seconds)...", file=sys.stderr)

    try:
        result = await team.run(task=topic)
        print(f"✓ Collaboration complete! Generated {len(result.messages)} messages", file=sys.stderr)
    except Exception as e:
        print(f"✗ Error during collaboration: {e}", file=sys.stderr)
        raise

    # Extract final content
    if not result.messages:
        raise ValueError("No messages generated by team")

    final_message = result.messages[-1]  # Last message should be from Reviewer
    final_content = final_message.content

    print(f"✓ Final content extracted ({len(final_content)} chars)", file=sys.stderr)

    return final_content

def main():
    """Command-line interface"""
    parser = argparse.ArgumentParser(description='AutoGen Script Generator')

    parser.add_argument('--topic', required=True, help='Topic to write about')
    parser.add_argument('--platform', required=True,
                       choices=['youtube', 'reels', 'tiktok', 'linkedin', 'twitter', 'instagram'],
                       help='Platform')
    parser.add_argument('--format', help='Content format: thread, longform, post, script')
    parser.add_argument('--duration', help='Duration for scripts (e.g., 60s, 5min)')
    parser.add_argument('--tone', default='professional', help='Tone/style')
    parser.add_argument('--audience', default='general', help='Target audience')
    parser.add_argument('--objective', default='educate', help='Content objective')
    parser.add_argument('--research-file', help='Path to research brief')
    parser.add_argument('--voice-file', help='Path to voice profile')
    parser.add_argument('--api-key', help='OpenAI API key (or set OPENAI_API_KEY env var)')

    args = parser.parse_args()

    # Get API key
    api_key = args.api_key or os.environ.get('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY required", file=sys.stderr)
        sys.exit(1)

    # Run generation
    try:
        content = asyncio.run(generate_content(
            topic=args.topic,
            platform=args.platform,
            content_format=args.format,
            duration=args.duration,
            tone=args.tone,
            audience=args.audience,
            objective=args.objective,
            research_file=args.research_file,
            voice_file=args.voice_file,
            api_key=api_key
        ))

        # Output as JSON for easy parsing
        result = {
            'success': True,
            'content': content,
            'platform': args.platform,
            'content_type': args.format or 'auto-detected'
        }

        print(json.dumps(result, indent=2))

    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    import os
    main()
