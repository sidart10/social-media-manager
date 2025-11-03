# Exa

## Docs

- [Score Deprecation in Auto and Keyword Search](https://docs.exa.ai/changelog/auto-keyword-score-deprecation.md): We're deprecating relevance scores in Auto and Keyword search types due to architectural improvements. Scores will remain available in Neural search.
- [Auto search as Default](https://docs.exa.ai/changelog/auto-search-as-default.md): Auto search, which intelligently combines Exa's proprietary neural search with traditional keyword search, is now the default search type for all queries.
- [Contents Endpoint Status Changes](https://docs.exa.ai/changelog/contents-endpoint-status-changes.md): The /contents endpoint now returns detailed status information for each URL instead of HTTP error codes, providing better visibility into individual content fetch results.
- [Domain Path Filter Support](https://docs.exa.ai/changelog/domain-path-filter.md): `includeDomains` and `excludeDomains` now support URL path filtering and subdomain wildcards.
- [Geolocation Filter Support](https://docs.exa.ai/changelog/geolocation-filter-support.md): `userLocation` added to the search API to bias search results based on geographic location.
- [New Livecrawl Option: Preferred](https://docs.exa.ai/changelog/livecrawl-preferred-option.md): Introducing the 'preferred' livecrawl option that tries to fetch fresh content but gracefully falls back to cached results when crawling fails, providing the best of both worlds.
- [Markdown Contents as Default](https://docs.exa.ai/changelog/markdown-contents-as-default.md): Markdown content is now the default format for all Exa API endpoints, providing cleaner, more readable content that's ideal for AI applications and text processing.
- [New Fast Search Type](https://docs.exa.ai/changelog/new-fast-search-type.md): Introducing Exa Fast: The world's fastest search API.
- [Company Analyst](https://docs.exa.ai/examples/company-analyst.md): Example project using the Exa Python SDK.
- [Chat app](https://docs.exa.ai/examples/demo-chat.md)
- [Company researcher](https://docs.exa.ai/examples/demo-company-researcher.md)
- [Writing Assistant](https://docs.exa.ai/examples/demo-exa-powered-writing-assistant.md)
- [Hallucination Detector](https://docs.exa.ai/examples/demo-hallucination-detector.md): A live demo that detects hallucinations in content using Exa's search.
- [Websets News Monitor](https://docs.exa.ai/examples/demo-websets-news-monitor.md): A live demo that monitors the web semantically using the Websets API.
- [RAG Q&A](https://docs.exa.ai/examples/exa-rag.md): Using Exa to enable retrieval-augmented generation.
- [Recruiting Agent](https://docs.exa.ai/examples/exa-recruiting-agent.md)
- [Exa Researcher - JavaScript](https://docs.exa.ai/examples/exa-researcher.md): Example project using the Exa JS SDK.
- [Exa Researcher - Python](https://docs.exa.ai/examples/exa-researcher-python.md)
- [Structured Outputs with Instructor](https://docs.exa.ai/examples/getting-started-with-exa-in-instructor.md): Using Exa with instructor to generate structured outputs from web content.
- [Build a Retrieval Agent with LangGraph](https://docs.exa.ai/examples/getting-started-with-rag-in-langgraph.md)
- [Building a Hallucination Checker](https://docs.exa.ai/examples/identifying-hallucinations-with-exa.md): Learn how to build an AI-powered system that identifies and verifies claims using Exa and LangGraph.
- [Job Search with Exa](https://docs.exa.ai/examples/job-search-with-exa.md): Tutorial for simple Exa searches on our front-end.
- [Hacker News Clone](https://docs.exa.ai/examples/live-demo-hacker-news-clone.md): Make your very own Hacker News powered by Exa
- [Phrase Filters: Niche Company Finder](https://docs.exa.ai/examples/niche-company-finder-with-phrase-filters.md)
- [Building a News Summarizer](https://docs.exa.ai/examples/recent-news-summarizer.md): Learn how to build an AI-powered news summarizer that searches and summarizes recent articles using Exa and GPT.
- [Exa](https://docs.exa.ai/integrations/agentops.md)
- [CrewAI Docs](https://docs.exa.ai/integrations/crew-ai-docs.md)
- [LangChain Docs](https://docs.exa.ai/integrations/langchain-docs.md)
- [LlamaIndex Docs](https://docs.exa.ai/integrations/llamaIndex-docs.md)
- [OpenRouter](https://docs.exa.ai/integrations/openrouter.md)
- [Answer](https://docs.exa.ai/reference/answer.md): Get an LLM answer to a question informed by Exa search results. `/answer` performs an Exa search and uses an LLM to generate either:

1. A direct answer for specific queries. (i.e. "What is the capital of France?" would return "Paris")
2. A detailed summary with citations for open-ended queries (i.e. "What is the state of ai in healthcare?" would return a summary with citations to relevant sources)

The response includes both the generated answer and the sources used to create it. The endpoint also supports streaming (as `stream=True`), which will return tokens as they are generated.

Alternatively, you can use the OpenAI compatible [chat completions interface](https://docs.exa.ai/reference/chat-completions#answer).

- [Anthropic Tool Calling](https://docs.exa.ai/reference/anthropic-tool-calling.md): Using Claude's Tool Use Feature with Exa Search Integration.
- [Contents Retrieval](https://docs.exa.ai/reference/contents-retrieval.md)
- [Context (Exa Code)](https://docs.exa.ai/reference/context.md): Get relevant code snippets and examples from open source libraries and repositories. Search through code repositories to find contextual examples that help developers understand how specific libraries, frameworks, or programming concepts are implemented in practice.
- [Crawling Subpages](https://docs.exa.ai/reference/crawling-subpages.md)
- [CrewAI](https://docs.exa.ai/reference/crewai.md): Learn how to add Exa retrieval capabilities to your CrewAI agents.
- [Error Codes](https://docs.exa.ai/reference/error-codes.md): Reference for common error codes used by the Exa API
- [Exa MCP](https://docs.exa.ai/reference/exa-mcp.md)
- [Exa Research](https://docs.exa.ai/reference/exa-research.md): Automate in-depth web research with structured output support.
- [Exa's Capabilities Explained](https://docs.exa.ai/reference/exas-capabilities-explained.md): This page explains some of the available feature functionalities of Exa and some unique ways you might use Exa for your use-case
- [FAQs](https://docs.exa.ai/reference/faqs.md)
- [Find similar links](https://docs.exa.ai/reference/find-similar-links.md): Find similar links to the link provided and optionally return the contents of the pages.
- [Get contents](https://docs.exa.ai/reference/get-contents.md): Get the full page contents, summaries, and metadata for a list of URLs.

Returns instant results from our cache, with automatic live crawling as fallback for uncached pages.

- [Welcome to Exa](https://docs.exa.ai/reference/getting-started.md): Exa is a search engine made for AIs.
- [How Exa Search Works](https://docs.exa.ai/reference/how-exa-search-works.md): Exa is a novel search engine that utilizes the latest advancements in AI language processing to return the best possible results.
- [IBM WatsonX](https://docs.exa.ai/reference/ibm-watsonx.md)
- [LangChain](https://docs.exa.ai/reference/langchain.md): How to use Exa's integration with LangChain to perform RAG.
- [Livecrawling Contents](https://docs.exa.ai/reference/livecrawling-contents.md)
- [LlamaIndex](https://docs.exa.ai/reference/llamaindex.md): A quick-start guide on how to add Exa retrieval to a LlamaIndex Agent Application.
- [Migrating from Bing](https://docs.exa.ai/reference/migrating-from-bing.md): Guide for switching from the deprecated Bing Search API to Exa
- [OpenAI Exa Wrapper](https://docs.exa.ai/reference/openai.md): Enhance your OpenAI chat completetions with a simple Exa wrapper that handles search, chunking and prompting.
- [OpenAI Responses API](https://docs.exa.ai/reference/openai-responses-api-with-exa.md): Use Exa with OpenAI's Responses API - both as a web search tool and for direct research capabilities.
- [OpenAI SDK Compatibility](https://docs.exa.ai/reference/openai-sdk.md): Use Exa's endpoints as a drop-in replacement for OpenAI - supporting both chat completions and responses APIs.
- [OpenAI Tool Calling](https://docs.exa.ai/reference/openai-tool-calling.md): Learn to use OpenAI's tool call feature with Exa's Search Integration
- [OpenAPI Specification](https://docs.exa.ai/reference/openapi-spec.md)
- [Quickstart](https://docs.exa.ai/reference/quickstart.md): Make your first request to one of Exa's API endpoints
- [Rate Limits](https://docs.exa.ai/reference/rate-limits.md): Default rate limits for Exa API endpoints
- [Create a task](https://docs.exa.ai/reference/research/create-a-task.md): Create an asynchronous research task that explores the web, gathers sources, synthesizes findings, and returns results with citations. Can be used to generate:

1. Structured JSON matching an `outputSchema` you provide.
2. A detailed markdown report when no schema is provided.

The API responds immediately with a `researchId` for polling completion status. For more details, see [Exa Research](/reference/exa-research).

Alternatively, you can use the OpenAI compatible [chat completions interface](/reference/chat-completions#research).

- [Get a task](https://docs.exa.ai/reference/research/get-a-task.md): Retrieve the status and results of a previously created research task.

Use the unique `researchId` returned from `POST /research/v1` to poll until the task is finished.

- [List tasks](https://docs.exa.ai/reference/research/list-tasks.md): Retrieve a paginated list of your research tasks.

The response follows a cursor-based pagination pattern. Pass the `limit` parameter to control page size (max 50) and use the `cursor` token returned in the response to fetch subsequent pages.

- [Search](https://docs.exa.ai/reference/search.md): The search endpoint lets you intelligently search the web and extract contents from the results.

By default, it automatically chooses between traditional keyword search and Exa's embeddings-based model, to find the most relevant results for your query.

- [Enterprise Documentation & Security ](https://docs.exa.ai/reference/security.md)
- [Managing Your Team](https://docs.exa.ai/reference/setting-up-team.md): Details on Team structure and account management for the Exa platform
- [Create API Key](https://docs.exa.ai/reference/team-management/create-api-key.md): Create a new API key for your team with optional name and rate limit configuration.
- [Delete API Key](https://docs.exa.ai/reference/team-management/delete-api-key.md): Permanently delete an API key from your team.
- [Get API Key](https://docs.exa.ai/reference/team-management/get-api-key.md): Retrieve details of a specific API key by its ID.
- [List API Keys](https://docs.exa.ai/reference/team-management/list-api-keys.md): Retrieve all API keys belonging to your team with their metadata.
- [Update API Key](https://docs.exa.ai/reference/team-management/update-api-key.md): Update the name and rate limit of an existing API key.
- [The Exa Index](https://docs.exa.ai/reference/the-exa-index.md): We spend a lot of time and energy creating a high quality, curated index.
- [AI SDK by Vercel](https://docs.exa.ai/reference/vercel.md)
- [Websets](https://docs.exa.ai/reference/websets-api.md)
- [Python and TS Cheat Sheets](https://docs.exa.ai/sdks/cheat-sheet.md): Some common code you might want to use - don't miss the TypeScript tab below!
- [Python SDK Specification](https://docs.exa.ai/sdks/python-sdk-specification.md): Enumeration of methods and types in the Exa Python SDK (exa_py).
- [TypeScript SDK Specification](https://docs.exa.ai/sdks/typescript-sdk-specification.md)
- [LLM prompt for writing Python](https://docs.exa.ai/websets/api/LLM.md): To teach LLMs how to use the Websets API. Best with powerful reasoning models.
- [Get an Event](https://docs.exa.ai/websets/api/events/get-an-event.md): Get a single Event by id.

You can subscribe to Events by creating a Webhook.

- [List all Events](https://docs.exa.ai/websets/api/events/list-all-events.md): List all events that have occurred in the system.

You can paginate through the results using the `cursor` parameter.

- [Event Types](https://docs.exa.ai/websets/api/events/types.md): Learn about the events that occur within the Webset API
- [Get started](https://docs.exa.ai/websets/api/get-started.md): Create your first Webset
- [How It Works](https://docs.exa.ai/websets/api/how-it-works.md)
- [Create an Import](https://docs.exa.ai/websets/api/imports/create-an-import.md): Creates a new import to upload your data into Websets. Imports can be used to:

- **Enrich**: Enhance your data with additional information using our AI-powered enrichment engine
- **Search**: Query your data using Websets' agentic search with natural language filters
- **Exclude**: Prevent duplicate or already known results from appearing in your searches

Once the import is created, you can upload your data to the returned `uploadUrl` until `uploadValidUntil` (by default 1 hour).

- [Delete Import](https://docs.exa.ai/websets/api/imports/delete-import.md): Deletes a import.
- [Get Import](https://docs.exa.ai/websets/api/imports/get-import.md): Gets a specific import.
- [List Imports](https://docs.exa.ai/websets/api/imports/list-imports.md): Lists all imports for the Webset.
- [Update Import](https://docs.exa.ai/websets/api/imports/update-import.md): Updates a import configuration.
- [Create a Monitor](https://docs.exa.ai/websets/api/monitors/create-a-monitor.md): Creates a new `Monitor` to continuously keep your Websets updated with fresh data.

Monitors automatically run on your defined schedule to ensure your Websets stay current without manual intervention:

- **Find new content**: Execute `search` operations to discover fresh items matching your criteria
- **Update existing content**: Run `refresh` operations to update items contents and enrichments
- **Automated scheduling**: Configure `cron` expressions and `timezone` for precise scheduling control
- [Delete Monitor](https://docs.exa.ai/websets/api/monitors/delete-monitor.md): Deletes a monitor.
- [Get Monitor](https://docs.exa.ai/websets/api/monitors/get-monitor.md): Gets a specific monitor.
- [List Monitors](https://docs.exa.ai/websets/api/monitors/list-monitors.md): Lists all monitors for the Webset.
- [Get Monitor Run](https://docs.exa.ai/websets/api/monitors/runs/get-monitor-run.md): Gets a specific monitor run.
- [List Monitor Runs](https://docs.exa.ai/websets/api/monitors/runs/list-monitor-runs.md): Lists all runs for the Monitor.
- [Update Monitor](https://docs.exa.ai/websets/api/monitors/update-monitor.md): Updates a monitor configuration.
- [Overview](https://docs.exa.ai/websets/api/overview.md): The Websets API helps you find, verify, and process web data at scale to build your unique collection of web content.
- [List webhook attempts](https://docs.exa.ai/websets/api/webhooks/attempts/list-webhook-attempts.md): List all attempts made by a Webhook ordered in descending order.
- [Create a Webhook](https://docs.exa.ai/websets/api/webhooks/create-a-webhook.md): Webhooks let you get notifications when things happen in your Websets. When you create a webhook, you choose which events you want to know about and where to send the notifications.

When an event happens, Exa sends an HTTP POST request to your webhook URL with:

- Event details (type, time, ID)
- Full data of what triggered the event
- A signature to verify the request came from Exa

The webhook starts as `active` and begins getting notifications right away. You'll get a secret key for checking webhook signatures - save this safely as it's only shown once when you create the webhook.

- [Delete a Webhook](https://docs.exa.ai/websets/api/webhooks/delete-a-webhook.md): Remove a webhook from your account. Once deleted, the webhook stops getting notifications right away and cannot be brought back.

Important notes: - The webhook stops working as soon as you delete it - You cannot undo this - you'll need to create a new webhook if you want it back - Any notifications currently being sent may still complete

- [Get a Webhook](https://docs.exa.ai/websets/api/webhooks/get-a-webhook.md): Get information about a webhook using its ID.
  The webhook secret is not shown here for security - you only get it when you first create the webhook.
- [List webhooks](https://docs.exa.ai/websets/api/webhooks/list-webhooks.md): Get a list of all webhooks in your account.
  The results come in pages. Use `limit` to set how many webhooks to get per page (up to 200). Use `cursor` to get the next page of results.
- [Update a Webhook](https://docs.exa.ai/websets/api/webhooks/update-a-webhook.md): Change a webhook's settings. You can update:
- Events: Add or remove which events you want to hear about - URL: Change where notifications are sent - Metadata: Update custom data linked to the webhook

Changes happen right away. If you change the events list, the webhook will start or stop getting notifications for those events immediately.

The webhook keeps its current status (`active` or `inactive`) when you update it.

- [Verifying Signatures](https://docs.exa.ai/websets/api/webhooks/verifying-signatures.md): Learn how to securely verify webhook signatures to ensure requests are from Exa
- [Cancel a running Webset](https://docs.exa.ai/websets/api/websets/cancel-a-running-webset.md): Cancels all operations being performed on a Webset.

Any enrichment or search will be stopped and the Webset will be marked as `idle`.

- [Create a Webset](https://docs.exa.ai/websets/api/websets/create-a-webset.md): Creates a new Webset with optional search, import, and enrichment configurations. The Webset will automatically begin processing once created.

You can specify an `externalId` to reference the Webset with your own identifiers for easier integration.

- [Delete a Webset](https://docs.exa.ai/websets/api/websets/delete-a-webset.md): Deletes a Webset.

Once deleted, the Webset and all its Items will no longer be available.

- [Cancel a running Enrichment](https://docs.exa.ai/websets/api/websets/enrichments/cancel-a-running-enrichment.md): All running enrichments will be canceled. You can not resume an Enrichment after it has been canceled.
- [Create an Enrichment](https://docs.exa.ai/websets/api/websets/enrichments/create-an-enrichment.md): Create an Enrichment for a Webset.
- [Delete an Enrichment](https://docs.exa.ai/websets/api/websets/enrichments/delete-an-enrichment.md): When deleting an Enrichment, any running enrichments will be canceled and all existing `enrichment_result` generated by this Enrichment will no longer be available.
- [Get an Enrichment](https://docs.exa.ai/websets/api/websets/enrichments/get-an-enrichment.md)
- [Update an Enrichment](https://docs.exa.ai/websets/api/websets/enrichments/update-an-enrichment.md): Update an Enrichment configuration for a Webset.
- [null](https://docs.exa.ai/websets/api/websets/exports/get-an-export.md)
- [null](https://docs.exa.ai/websets/api/websets/exports/schedule-an-export.md)
- [Get a Webset](https://docs.exa.ai/websets/api/websets/get-a-webset.md)
- [Delete an Item](https://docs.exa.ai/websets/api/websets/items/delete-an-item.md): Deletes an Item from the Webset.

This will cancel any enrichment process for it.

- [Get an Item](https://docs.exa.ai/websets/api/websets/items/get-an-item.md): Returns a Webset Item.
- [List all Items for a Webset](https://docs.exa.ai/websets/api/websets/items/list-all-items-for-a-webset.md): Returns a list of Webset Items.

You can paginate through the Items using the `cursor` parameter.

- [List all Websets](https://docs.exa.ai/websets/api/websets/list-all-websets.md): Returns a list of Websets.

You can paginate through the results using the `cursor` parameter.

- [null](https://docs.exa.ai/websets/api/websets/overview.md)
- [Preview a webset](https://docs.exa.ai/websets/api/websets/preview-a-webset.md): Preview how a search query will be decomposed before creating a webset. This endpoint performs the same query analysis that happens during webset creation, allowing you to see the detected entity type, generated search criteria, and available enrichment columns in advance.

Use this to help users understand how their search will be interpreted before committing to a full webset creation.

- [Cancel a running Search](https://docs.exa.ai/websets/api/websets/searches/cancel-a-running-search.md): Cancels a currently running Search.

You can cancel all searches at once by using the `websets/:webset/cancel` endpoint.

- [Create a Search](https://docs.exa.ai/websets/api/websets/searches/create-a-search.md): Creates a new Search for the Webset.

The default behavior is to reuse the previous Search results and evaluate them against the new criteria.

- [Get a Search](https://docs.exa.ai/websets/api/websets/searches/get-a-search.md): Gets a Search by id
- [Update a Webset](https://docs.exa.ai/websets/api/websets/update-a-webset.md)
- [Exclude Results](https://docs.exa.ai/websets/dashboard/exclude-results.md): Avoid duplicate results in your new searches by excluding URLs from previous Websets or CSV files.
- [Get started](https://docs.exa.ai/websets/dashboard/get-started.md): Welcome to the Websets Dashboard! Find anything you want on the web, no matter how complex.
- [Import from CSV](https://docs.exa.ai/websets/dashboard/import-from-csv.md): Turn your existing CSV data into a Webset
- [Integrations](https://docs.exa.ai/websets/dashboard/integrations.md): Connect your Websets with popular CRM and email tools
- [Creating Enrichments ](https://docs.exa.ai/websets/dashboard/walkthroughs/Creating-enrichments.md): Here's how to create enrichments (also known as Adding Columns).
- [Exploring your results ](https://docs.exa.ai/websets/dashboard/walkthroughs/Exploring-your-results.md): Explore your Websets matched results, view summaries, criteria justification
- [Adding and Managing Your Team Members in Websets](https://docs.exa.ai/websets/dashboard/walkthroughs/Managing-Team-Members.md): Here's how to manage your team.
- [Prompting Websets](https://docs.exa.ai/websets/dashboard/walkthroughs/Prompting.md): Here's how to prompt your query in Websets
- [Downloading and Sharing Your Results](https://docs.exa.ai/websets/dashboard/walkthroughs/Sharing-and-Downloading-Your-Results.md): Here's how to share or download your results and enrichments.
- [Example queries](https://docs.exa.ai/websets/dashboard/websets-example-queries.md): Here are some examples for things to search for, to get you started!
- [FAQ](https://docs.exa.ai/websets/faq.md): Frequently asked questions about Websets
- [Welcome to Websets](https://docs.exa.ai/websets/overview.md): Our goal is to help you find anything you want on the web, no matter how complex.

## Optional

- [API Status](https://status.exa.ai/)
- [GitHub](https://github.com/exa-labs)
- [Discord](https://discord.com/invite/HCShtBqbfV)
- [Blog](https://exa.ai/blog)
