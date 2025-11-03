# Prompt-Guide-Research-Agents - Other

**Pages:** 1

---

## Context Engineering Deep Dive: Building a Deep Research Agent

**URL:** https://www.promptingguide.ai/agents/context-engineering-deep-dive

**Contents:**

- Context Engineering Deep Dive: Building a Deep Research Agent
- The Reality of Context Engineering
- Agent Architecture Design
  - The Original Design Problem
  - The Improved Multi-Agent Architecture
- System Prompt Engineering
  - High-Level Agent Definition
  - General Instructions
  - Providing Essential Context
- Tool Definitions and Usage Instructions

Context engineering (opens in a new tab) requires significant iteration and careful design decisions to build reliable AI agents. This guide takes a deep dive into the practical aspects of context engineering through the development of a basic deep research agent, exploring some of the techniques and design patterns that improve agent reliability and performance.

This content is based on our new course "Building Effective AI Agents with n8n" (opens in a new tab), which provides comprehensive insights, downloadable templates, prompts, and advanced tips into designing and implementing agentic systems.

Building effective AI agents requires substantial tuning of system prompts and tool definitions. The process involves spending hours iterating on:

Don't underestimate the effort required for context engineering. It's not a one-time task but an iterative process that significantly impacts agent reliability and performance.

Let's look at a basic deep research agent architecture. The initial architecture connects the web search tool directly to the deep research agent. This design places too much burden on a single agent responsible for:

Consequences of this design:

The solution involved separating concerns by introducing a dedicated search worker agent:

Benefits of the multi-agent design:

If you are using models from other providers like OpenAI, you can leverage GPT-5 (for planning and reasoning) and GPT-5-mini (for search execution) for similar performance.

Design Principle: Separating agent responsibilities improves reliability and enables cost-effective model selection for different subtasks.

Here is the full system prompt for the deep research agent we built in n8n:

Let's break it down into parts and discuss why each section is important:

The system prompt begins with a clear definition of the agent's role:

Provide explicit instructions about the agent's workflow:

Current Date Information:

Including the current date is crucial for research agents to get up-to-date information:

In n8n, you can dynamically inject the current date using built-in functions with customizable formats (date only, date with time, specific timezones, etc.).

Tool definitions typically appear in two places:

Key Insight: The biggest performance improvements often come from clearly explaining tool usage in the system prompt, not just defining tool parameters.

The system prompt also includes detailed instructions for using the available tools:

Initially, without explicit status definitions, the agent would use different status values across runs:

Be explicit about allowed values. This eliminates ambiguity and ensures consistent behavior.

Note that the system prompt also includes this instruction:

What's the reasoning behind this decision?

This provides flexibility for the agent to optimize its execution strategy. During testing, the agent might:

Here is a specific instruction you can use, if you require all search tasks to be executed:

When to use flexible vs. rigid approaches:

Context engineering is not a one-time effort. The development process involves:

Even after multiple iterations, there are opportunities for further improvement:

Search Task Metadata:

Enhanced Search Planning:

Date Range Specification:

Based on the recommended improvements, it's easy to appreciate that web search for AI agents is a challenging effort that requires a lot of context engineering.

When designing multi-agent systems, carefully consider:

What information does the sub-agent need?

What information should the sub-agent return?

As agents execute multiple tasks, context grows:

Strategies to manage context length:

Include instructions for failure scenarios:

Context engineering is a critical practice for building reliable AI agents that requires:

The deep research agent example demonstrates how thoughtful context engineering transforms an unreliable prototype into a robust, production-ready system. By applying these principles—clear role definitions, explicit tool instructions, essential context provision, and iterative improvement—you can build AI agents that consistently deliver high-quality results.

Learn how to build production-ready AI agents with hands-on examples and templates. Join our comprehensive course! (opens in a new tab) Use code PROMPTING20 to get an extra 20% off.

**Examples:**

Example 1 (unknown):

```unknown
You are a deep research agent who will help with planning and executing search tasks to generate a deep research report.

## GENERAL INSTRUCTIONS

The user will provide a query, and you will convert that query into a search plan with multiple search tasks (3 web searches). You will execute each search task and maintain the status of those searches in a spreadsheet.

You will then generate a final deep research report for the user.

For context, today's date is: {{ $now.format('yyyy-MM-dd') }}

## TOOL DESCRIPTIONS

Below are some useful instructions for how to use the available tools.

Deleting tasks: Use the delete_task tool to clear up all the tasks before starting the search plan.

Planning tasks: You will create a plan with the search tasks (3 web searches) and add them to the Google Sheet using the append_update_task tool. Make sure to keep the status of each task updated after completing each search. Each task begins with a todo status and will be updated to a "done" status once the search worker returns information regarding the search task.

Executing tasks: Use the Search Worker Agent tool to execute the search plan. The input to the agent are the actual search queries, word for word.

Use the tools in the order that makes the most sense to you but be efficient.
```

Example 2 (unknown):

```unknown
You are a deep research agent who will help with planning and executing search tasks to generate a deep research report.
```

Example 3 (unknown):

```unknown
## GENERAL INSTRUCTIONS

The user will provide a query, and you will convert that query into a search plan with multiple search tasks (3 web searches). You will execute each search task and maintain the status of those searches in a spreadsheet.

You will then generate a final deep research report for the user.
```

Example 4 (unknown):

```unknown
For context, today's date is: {{ $now.format('yyyy-MM-dd') }}
```

---
