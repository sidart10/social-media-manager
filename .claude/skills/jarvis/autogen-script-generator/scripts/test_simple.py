#!/usr/bin/env python3
"""
Simple test to debug AutoGen agent collaboration
"""

import asyncio
import os
import sys
from pathlib import Path

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import MaxMessageTermination, TextMentionTermination
from autogen_agentchat.messages import TextMessage
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def test_simple_agents():
    """Test with just 2 agents to debug"""

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY not set")
        sys.exit(1)

    print("Creating model client...")
    model_client = OpenAIChatCompletionClient(
        model="gpt-4o",  # Using gpt-4o instead of gpt-5 for testing
        api_key=api_key
    )

    print("Creating agents...")

    # Simple hook agent
    hook_agent = AssistantAgent(
        name="Hook_Agent",
        system_message="Create a compelling hook for a Twitter thread about the topic. Just say the hook in 1-2 sentences.",
        model_client=model_client
    )

    # Simple content agent
    content_agent = AssistantAgent(
        name="Content_Agent",
        system_message="Write 2-3 main points about the topic. Be concise.",
        model_client=model_client
    )

    print("Creating team...")
    team = RoundRobinGroupChat(
        [hook_agent, content_agent],
        termination_condition=MaxMessageTermination(max_messages=4)
    )

    print("Starting collaboration on topic: 'AI automation'")
    print("")

    # Run team
    result = await team.run(task="AI automation")

    print("\n=== RESULT ===")
    print(f"Messages: {len(result.messages)}")
    for i, msg in enumerate(result.messages):
        print(f"\nMessage {i+1} from {msg.source}:")
        print(f"  {msg.content[:200]}...")

    return result

if __name__ == '__main__':
    print("=== Simple AutoGen Test ===\n")
    result = asyncio.run(test_simple_agents())
    print("\n✓ Test complete!")
