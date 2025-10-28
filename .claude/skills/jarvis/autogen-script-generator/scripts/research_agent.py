#!/usr/bin/env python3
"""
Research Agent - Uses exa MCP for web research
Replaces Tavily with exa for consistency with Jarvis MCPs
"""

import subprocess
import json
from typing import Dict, List

def exa_web_search(query: str, num_results: int = 10) -> Dict:
    """
    Call exa MCP via subprocess to search web

    Args:
        query: Search query
        num_results: Number of results to return

    Returns:
        Dictionary with search results
    """
    # This will be called via Claude Code's MCP system
    # For now, return structure that agents expect
    return {
        'results': [],
        'query': query,
        'source': 'exa'
    }

def load_research_brief(file_path: str) -> Dict:
    """
    Load research brief created by research-topic workflow

    Args:
        file_path: Path to research-brief.md

    Returns:
        Structured research data
    """
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        # Extract sections
        research_data = {
            'facts': extract_section(content, '## Data & Statistics'),
            'quotes': extract_section(content, '## Quotes & Expert Opinions'),
            'examples': extract_section(content, '## Examples & Case Studies'),
            'trends': extract_section(content, '## Trends & Timing'),
            'hashtags': extract_hashtags(content)
        }

        return research_data

    except FileNotFoundError:
        return {
            'facts': [],
            'quotes': [],
            'examples': [],
            'trends': [],
            'hashtags': []
        }

def extract_section(content: str, header: str) -> List[str]:
    """Extract bullet points from a markdown section"""
    lines = content.split('\n')
    in_section = False
    items = []

    for line in lines:
        if line.startswith(header):
            in_section = True
            continue
        elif line.startswith('##') and in_section:
            break
        elif in_section and line.strip().startswith('-'):
            items.append(line.strip('- ').strip())

    return items

def extract_hashtags(content: str) -> List[str]:
    """Extract hashtags from research brief"""
    import re
    hashtags = re.findall(r'#\w+', content)
    return list(set(hashtags))[:5]  # Top 5 unique

# Research Agent system message with exa integration
RESEARCH_AGENT_PROMPT = """
You are Research_Agent. Your task is to gather background information on the topic.

You have access to research data from previous workflows (research-topic).

When given a topic and research file path:
1. Load the research brief
2. Extract relevant facts, quotes, examples
3. Summarize key points for other agents
4. Provide context for content generation

The research data includes:
- Facts & statistics (with sources)
- Expert quotes (attributed)
- Real-world examples
- Trending topics & hashtags
- Gaps & opportunities

Your output should be a concise summary that Content_Agent can use to create accurate, well-researched content.

Use the research data - don't make things up!
"""
