# Exa-Search-Api-Docs - Llms-Txt

**Pages:** 214

---

## FAQ

**URL:** llms-txt#faq

Source: https://docs.exa.ai/websets/faq

Frequently asked questions about Websets

<Accordion title="Who is Websets for?">
  Websets is a tool meant to solve sourcing for knowledge workers. Here are a few major use cases:

* **Recruiters**: source potential candidates for any role (we all know Linkedin search is broken after all)
  * **Sales teams**: source companies and points of contact that match your ICP. Watch hours of outbound research be done in minutes
  * **Investors**: whether you're looking for your next target or doing diligence, Websets can be a powerful tool. Find companies, financial statements, reports and news.
  * **Researchers**: find research papers, reports, news and more. No matter what you're researching.
  * **Founder**: find competitors, tweet ideas, candidates, potential customers, potential investors and more.

And more! We've seen thousands of different use cases.
</Accordion>

<Accordion title="What exactly does Websets do?">
  Websets helps you find lists of entities (e.g. companies, people, research
  papers) that match the specific criteria you provide. It's not an all-purpose
  Q\&A engine, so stick to queries aimed at listing out or filtering by certain
  attributes. Websets can find people, companies, financial reports, research
  papers, articles, news, blogposts, tweets, reddit threads, Github repos, the
  list goes on.
</Accordion>

<Accordion title="Why am I not getting any results?">
  Too many restrictive criteria. If your search is very narrow (e.g., "Companies
  in Antarctica that raised \$1B in seed funding in 2025"), it may be impossible
  to find matches. You can try removing or broadening certain criteria and
  searching again. Asking questions not meant for Websets (e.g. if you're asking
  open ended questions such as "How's the European economy doing in 2025?" or
  specific questions such as "What's an EGOT?")
</Accordion>

<Accordion title="How many results can I request in one webset?">
  You can request anywhere from 1 to 1000+ results (depending on your plan and
  credit balance). However: Large requests (1000+ results) can take about an
  hour or more to complete. Websets stops automatically if it can't find your
  requested number of matching items before hitting its search limit (50× your
  requested size or 50,000 max).
</Accordion>

<Accordion title="Can I remove or tweak results?">
  Yes. On the results page, you can manually delete any entries that you don't
  want to keep. If you see that the results aren't what you need, you can also
  refine your criteria and try again.
</Accordion>

<Accordion title="How do credits and pricing work?">
  Free: 1,000 credits. Websets up to 25 results, with limited features.

Subscription Core plan: \$49/month - 8,000 credits per month

Pro plan: \$449/month - 100,000 credits per month

We also have an Enterprise plan.

10 credit = 1 all-green result in a generated webset. For example, if you generate a webset of 50 perfect matches, that uses 500 credits. Credits are also used for special features such as custom columns, requesting emails/contact information & alerts.

Topping up credits: If you run out, you can contact your point person to purchase additional credits manually.
</Accordion>

<Accordion title="Why is my Webset taking a long time?">
  Large requests (especially 1000+ results) can take up to \~1 hour. This is
  normal because Websets scans a large volume of data. The more criteria, the
  tougher it is to find those results. These types of searches are narrower and
  can take longer as well You can monitor the progress in the left-hand panel,
  where you'll see the job's status and any partial progress.
</Accordion>

<Accordion title="Where does Websets get its data?">
  Websets runs using the Exa API - a powerful search engine that combines
  keyword and semantic search methods to find precise criteria. Websets collects
  and aggregates data from publicly available sources (e.g., company websites,
  press releases). It can validate different criteria using different data
  sources. This ensures that we can find more matches, more accurately. The tool
  surfaces the references (links) used, so you can check exactly which sources
  informed each match.
</Accordion>

<Accordion title="Can I change my criteria after I've generated a full webset?">
  Absolutely. You can revise your original query or tweak the criteria from the
  Search More button on the lower left hand side. You would then run a new
  Webset which would consume new credits based on how many all-green results you
  generate.
</Accordion>

<Accordion title="What if I still have more questions or need more credits?">
  Contact your account representative or point person if you need help,
  additional credits, or have feedback about your results, or [hello@exa.ai](mailto:hello@exa.ai).
</Accordion>

---

## Before - fails when crawling fails

**URL:** llms-txt#before---fails-when-crawling-fails

result = exa.get_contents(urls, livecrawl="always")

---

## Structured Outputs with Instructor

**URL:** llms-txt#structured-outputs-with-instructor

**Contents:**
- What this doc covers
- Guide
- 1. Pre-requisites and installation
- 2. Why use Instructor?
- 3. Setup and Basic Usage

Source: https://docs.exa.ai/examples/getting-started-with-exa-in-instructor

Using Exa with instructor to generate structured outputs from web content.

## What this doc covers

* Setting up Exa to use [Instructor](https://python.useinstructor.com/) for structured output generation
* Practical examples of using Exa and Instructor together

## 1. Pre-requisites and installation

Install the required libraries:

Ensure API keys are initialized properly. The environment variable names are `EXA_API_KEY` and `OPENAI_API_KEY`.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

## 2. Why use Instructor?

Instructor is a Python library that allows you to generate structured outputs from a language model.

We could instruct the LLM to return a structured output, but the output will still be a string, which we need to convert to a dictionary. What if the dictionary is not structured as we want? What if the LLM forgot to add the last "}" in the JSON? We would have to handle all of these errors manually.

We could use `{ "type": "json_object" }` [](https://platform.openai.com/docs/guides/structured-outputs/json-mode) which will make the LLM return a JSON object. But for this, we would need to provide a JSON schema, which can get [large and complex](https://python.useinstructor.com/why/#pydantic-over-raw-schema).

Instead of doing this, we can use Instructor. Instructor is powered by [pydantic](https://docs.pydantic.dev/latest/), which means that it integrates with your IDE. We use pydantic's `BaseModel` to define the output model:

## 3. Setup and Basic Usage

Let's set up Exa and Instructor:

```python Python theme={null}
import os

import instructor
from exa_py import Exa
from openai import OpenAI
from pydantic import BaseModel

exa = Exa(os.environ["EXA_API_KEY"])
client = instructor.from_openai(OpenAI())

search_results = exa.search_and_contents(
    "Latest advancements in quantum computing",
    type="neural",
    text=True,
)

**Examples:**

Example 1 (unknown):
```unknown
Ensure API keys are initialized properly. The environment variable names are `EXA_API_KEY` and `OPENAI_API_KEY`.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

## 2. Why use Instructor?

Instructor is a Python library that allows you to generate structured outputs from a language model.

We could instruct the LLM to return a structured output, but the output will still be a string, which we need to convert to a dictionary. What if the dictionary is not structured as we want? What if the LLM forgot to add the last "}" in the JSON? We would have to handle all of these errors manually.

We could use `{ "type": "json_object" }` [](https://platform.openai.com/docs/guides/structured-outputs/json-mode) which will make the LLM return a JSON object. But for this, we would need to provide a JSON schema, which can get [large and complex](https://python.useinstructor.com/why/#pydantic-over-raw-schema).

Instead of doing this, we can use Instructor. Instructor is powered by [pydantic](https://docs.pydantic.dev/latest/), which means that it integrates with your IDE. We use pydantic's `BaseModel` to define the output model:

## 3. Setup and Basic Usage

Let's set up Exa and Instructor:
```

---

## Quickstart

**URL:** llms-txt#quickstart

**Contents:**
- Create and setup your API key
- Create a .env file
- Make an API request

Source: https://docs.exa.ai/reference/quickstart

Make your first request to one of Exa's API endpoints

## Create and setup your API key

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

## Create a .env file

Create a file called `.env` in the root of your project and add the following line.

## Make an API request

Use our python or javascript SDKs, or call the API directly with cURL.

<Tabs>
  <Tab title="Python">
    Install the python SDKs with pip.  If you want to store your API key in a `.env` file, make sure to install the dotenv library.

Once you've installed the SDKs, create a file called `exa.py` and add the code below.

<Tabs>
      <Tab title="Search and crawl">
        Get a list of results and their full text content.

<Tab title="Answer">
        Get an answer to a question, grounded by citations from exa.

<Tab title="Chat Completions">
        Get a chat completion from exa.

<Tab title="Find similar links and get full text">
        Find similar links to a given URL and get the full text for each link.

</Tab>
    </Tabs>
  </Tab>

<Tab title="JavaScript">
    Install the javascript SDK with npm. If you want to store your API key in a `.env` file, make sure to install the dotenv library.

Once you've installed the SDK, create a file called `exa.ts` and add the code below.

<Tabs>
      <Tab title="Search and crawl">
        Get a list of results and their full text content.

<Tab title="Answer">
        Get an answer to a question, grounded by citations from exa.

<Tab title="Chat Completions">
        Get a chat completion from exa.

<Tab title="Find similar links and get full text">
        Find similar links to a given URL and get the full text for each link.

</Tab>
    </Tabs>
  </Tab>

<Tab title="cURL">
    Pass one of the following commands to your terminal to make an API request.

<Tabs>
      <Tab title="Search and crawl">
        Get a list of results and their full text content.

<Tab title="Answer">
        Get an answer to a question, grounded by citations from exa.

<Tab title="Chat Completions">
        Get a chat completion from exa.

</Tab>
    </Tabs>
  </Tab>
</Tabs>

**Examples:**

Example 1 (unknown):
```unknown
<br />

{" "}

## Make an API request

Use our python or javascript SDKs, or call the API directly with cURL.

<Tabs>
  <Tab title="Python">
    Install the python SDKs with pip.  If you want to store your API key in a `.env` file, make sure to install the dotenv library.
```

Example 2 (unknown):
```unknown
Once you've installed the SDKs, create a file called `exa.py` and add the code below.

    <Tabs>
      <Tab title="Search and crawl">
        Get a list of results and their full text content.
```

Example 3 (unknown):
```unknown
</Tab>

      <Tab title="Answer">
        Get an answer to a question, grounded by citations from exa.
```

Example 4 (unknown):
```unknown
</Tab>

      <Tab title="Chat Completions">
        Get a chat completion from exa.
```

---

## Search

**URL:** llms-txt#search

Source: https://docs.exa.ai/reference/search

post /search
The search endpoint lets you intelligently search the web and extract contents from the results.

By default, it automatically chooses between traditional keyword search and Exa's embeddings-based model, to find the most relevant results for your query.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Usually you would upload a csv of students

**URL:** llms-txt#usually-you-would-upload-a-csv-of-students

---

## Contents Endpoint Status Changes

**URL:** llms-txt#contents-endpoint-status-changes

**Contents:**
- What Changed
- Response Structure
  - Status Fields Explained
- How to Update Your Code

Source: https://docs.exa.ai/changelog/contents-endpoint-status-changes

The /contents endpoint now returns detailed status information for each URL instead of HTTP error codes, providing better visibility into individual content fetch results.

**Date: 22 May 2025**

We've updated the `/contents` endpoint to provide more granular status information for each URL you request. Instead of returning HTTP error codes directly, the endpoint now includes a `statuses` field that gives you detailed information about each content fetch operation.

<Info>
  The `/contents` endpoint will now only return an error if there's an internal issue on our end. All other cases are handled through the new `statuses` field.
</Info>

Previously, the `/contents` endpoint would return HTTP error codes when content fetching failed. This approach had limitations when multiple URLs failed for different reasons, making it unclear which specific error to return.

Now, the endpoint returns a `statuses` field containing individual status information for each URL, allowing you to handle different failure scenarios appropriately.

## Response Structure

The new response structure includes:

### Status Fields Explained

* **id**: The URL that was requested
* **status**: Either `"success"` or `"error"`
* **error** (optional): Only present when status is `"error"`
  * **tag**: Specific error type
    * `CRAWL_NOT_FOUND`: Content not found (404)
    * `CRAWL_TIMEOUT`: Request timed out (408)
    * `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (403)
    * `CRAWL_UNKNOWN_ERROR`: Other errors (500+)
  * **httpStatusCode**: The corresponding HTTP status code

## How to Update Your Code

Instead of catching HTTP errors, you should now check the `statuses` field:

```python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
### Status Fields Explained

* **id**: The URL that was requested
* **status**: Either `"success"` or `"error"`
* **error** (optional): Only present when status is `"error"`
  * **tag**: Specific error type
    * `CRAWL_NOT_FOUND`: Content not found (404)
    * `CRAWL_TIMEOUT`: Request timed out (408)
    * `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (403)
    * `CRAWL_UNKNOWN_ERROR`: Other errors (500+)
  * **httpStatusCode**: The corresponding HTTP status code

## How to Update Your Code

Instead of catching HTTP errors, you should now check the `statuses` field:
```

---

## If you want the full text of the citations in the response:

**URL:** llms-txt#if-you-want-the-full-text-of-the-citations-in-the-response:

**Contents:**
  - Input Parameters:
  - Returns Example:
  - Return Parameters:
  - `AnswerResult` object
- `stream_answer` Method
  - Input Example:
  - Input Parameters:
  - Return Type:
  - `StreamChunk`
- `research.create_task` Method

response_with_text = exa.answer(
    "What is the capital of France?",
    text=True
)
print(response_with_text.citations[0].text)  # Full page text
JSON JSON theme={null}
{
  "answer": "The capital of France is Paris.",
  "citations": [
    {
      "id": "https://www.example.com/france",
      "url": "https://www.example.com/france",
      "title": "France - Wikipedia",
      "publishedDate": "2023-01-01",
      "author": null,
      "text": "France, officially the French Republic, is a country in... [truncated for brevity]"
    }
  ]
}
Python Python theme={null}
stream = exa.stream_answer("What is the capital of France?", text=True)

for chunk in stream:
    if chunk.content:
        print("Partial answer:", chunk.content)
    if chunk.citations:
        for citation in chunk.citations:
            print("Citation found:", citation.url)
Python Python theme={null}
from exa_py import Exa
import os

exa = Exa(os.environ["EXA_API_KEY"])

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter | Type            | Description                                                                              | Default  |
| --------- | --------------- | ---------------------------------------------------------------------------------------- | -------- |
| query     | str             | The question to answer.                                                                  | Required |
| text      | Optional\[bool] | If true, the full text of each citation is included in the result.                       | False    |
| stream    | Optional\[bool] | Note: If true, an error is thrown. Use stream\_answer() instead for streaming responses. | None     |

### Returns Example:
```

Example 2 (unknown):
```unknown
### Return Parameters:

Returns an `AnswerResponse` object:

| Field     | Type                | Description                                   |
| --------- | ------------------- | --------------------------------------------- |
| answer    | str                 | The generated answer text                     |
| citations | List\[AnswerResult] | List of citations used to generate the answer |

### `AnswerResult` object

| Field           | Type           | Description                                 |
| --------------- | -------------- | ------------------------------------------- |
| id              | str            | Temporary ID for the document               |
| url             | str            | URL of the citation                         |
| title           | Optional\[str] | Title of the content, if available          |
| published\_date | Optional\[str] | Estimated creation date                     |
| author          | Optional\[str] | The author of the content, if available     |
| text            | Optional\[str] | The full text of the content (if text=True) |

***

## `stream_answer` Method

Generate a streaming answer to a query with Exa's LLM capabilities. Instead of returning a single response, this method yields chunks of text and/or citations as they become available.

### Input Example:
```

Example 3 (unknown):
```unknown
### Input Parameters:

| Parameter | Type            | Description                                                            | Default  |
| --------- | --------------- | ---------------------------------------------------------------------- | -------- |
| query     | str             | The question to answer.                                                | Required |
| text      | Optional\[bool] | If true, includes full text of each citation in the streamed response. | False    |

### Return Type:

A `StreamAnswerResponse` object, which is iterable. Iterating over it yields `StreamChunk` objects:

### `StreamChunk`

| Field     | Type                           | Description                                 |
| --------- | ------------------------------ | ------------------------------------------- |
| content   | Optional\[str]                 | Partial text content of the answer so far.  |
| citations | Optional\[List\[AnswerResult]] | Citations discovered in this chunk, if any. |

Use `stream.close()` to end the streaming session if needed.

## `research.create_task` Method

Create an asynchronous research task that performs multi-step web research and returns structured JSON results with citations.

### Input Example:
```

---

## Chat app

**URL:** llms-txt#chat-app

Source: https://docs.exa.ai/examples/demo-chat

---

## Cancel a running Webset

**URL:** llms-txt#cancel-a-running-webset

Source: https://docs.exa.ai/websets/api/websets/cancel-a-running-webset

post /v0/websets/{id}/cancel
Cancels all operations being performed on a Webset.

Any enrichment or search will be stopped and the Webset will be marked as `idle`.

---

## List tasks

**URL:** llms-txt#list-tasks

Source: https://docs.exa.ai/reference/research/list-tasks

get /research/v1
Retrieve a paginated list of your research tasks.

The response follows a cursor-based pagination pattern. Pass the `limit` parameter to control page size (max 50) and use the `cursor` token returned in the response to fetch subsequent pages.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Or, to research a specific topic:

**URL:** llms-txt#or,-to-research-a-specific-topic:

---

## List Monitors

**URL:** llms-txt#list-monitors

Source: https://docs.exa.ai/websets/api/monitors/list-monitors

get /v0/monitors
Lists all monitors for the Webset.

---

## https://docs.exa.ai/reference/python-sdk-specification#search_and_contents-method

**URL:** llms-txt#https://docs.exa.ai/reference/python-sdk-specification#search_and_contents-method

def exa_search(query: str) -> Dict[str, Any]:
    return exa.search_and_contents(query=query, type='auto', highlights=True)

---

## Delete Import

**URL:** llms-txt#delete-import

Source: https://docs.exa.ai/websets/api/imports/delete-import

delete /v0/imports/{id}
Deletes a import.

---

## print(researcher("llama antibodies"))

**URL:** llms-txt#print(researcher("llama-antibodies"))

This Python implementation of Exa Researcher demonstrates how to leverage Exa's Auto search feature and the OpenAI API to create an automated research tool. By combining Exa's powerful search capabilities with GPT-3.5 Turbo's language understanding and generation, we've created a system that can quickly gather and synthesize information on any given topic.

---

## TODO: add your own candidates

**URL:** llms-txt#todo:-add-your-own-candidates

sample_data = {
    "Name": [
        "Kristy Choi", "Jiaming Song", "Brice Huang", "Andi Peng",
        "Athiya Deviyani", "Hao Zhu", "Zana Bucinca", "Usha Bhalla",
        "Kia Rahmani", "Jingyan Wang", "Jun-Kun Wang", "Sanmi Koyejo",
        "Erik Jenner"
    ],
    "Email": [
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)", "[[email protected]](/cdn-cgi/l/email-protection)",
        "[[email protected]](/cdn-cgi/l/email-protection)"
    ]
}

---

## Enterprise Documentation & Security

**URL:** llms-txt#enterprise-documentation-&-security

Source: https://docs.exa.ai/reference/security

Exa takes data security and privacy seriously. We are proud to be SOC 2 Type I certified, demonstrating our commitment to maintaining rigorous information security practices and controls.

Contact us at [sales@exa.ai](mailto:sales@exa.ai) to discuss an Enterprise plan if you are interested in Zero Data Retention or other customized data security solutions.

[Click here](https://exa-public.s3.us-east-1.amazonaws.com/%5B20250529%5D%2BAuthorized%2BSubprocessors%2B\(Subcontractors\).pdf) to see a list of our Authorized Subcontractors per our standard Enterprise Data Processing Agreement (DPA).

[Click here](https://exa-public.s3.us-east-1.amazonaws.com/Exa+Labs+Inc.+SOC2+Type+I+Report+-+Final.pdf) to view our SOC2 Type I Report

[Click here](https://exa-public.s3.us-east-1.amazonaws.com/Exa+-+Online+Master+Subscription+Agreement.pdf) to see our standard Master Subscription Agreement

[Click here](https://exa-public.s3.us-east-1.amazonaws.com/Exa+Data+Processing+Addendum.pdf) to see our standard Data Processing Agreement

---

## LLM prompt for writing Python

**URL:** llms-txt#llm-prompt-for-writing-python

Source: https://docs.exa.ai/websets/api/LLM

To teach LLMs how to use the Websets API. Best with powerful reasoning models.

The following text is a Git repository with code. The structure of the text are sections that begin with ----, followed by a single line containing the file path and file name, followed by a variable amount of lines containing the file contents. The text representing the Git repository ends when the symbols --END-- are encounted. Any further text beyond --END-- are meant to be interpreted as instructions using the aforementioned Git repository as context.

[client.py](http://client.py)

from **future** import annotations

from datetime import datetime

from typing import List, Optional, Literal, Dict, Any, Union

CreateWebsetParameters,

from .core.base import WebsetsBaseClient

from .items import WebsetItemsClient

from .searches import WebsetSearchesClient

from .enrichments import WebsetEnrichmentsClient

from .webhooks import WebsetWebhooksClient

class WebsetsClient(WebsetsBaseClient):

"""Client for managing Websets."""

def **init**(self, client):

super().\__init_\_(client)

self.items = WebsetItemsClient(client)

self.searches = WebsetSearchesClient(client)

self.enrichments = WebsetEnrichmentsClient(client)

self.webhooks = WebsetWebhooksClient(client)

def create(self, params: Union[Dict[str, Any], CreateWebsetParameters]) -\> Webset:

"""Create a new Webset.

params (CreateWebsetParameters): The parameters for creating a webset.

Webset: The created webset.

response = self.request("/v0/websets", data=params)

return Webset.model_validate(response)

def get(self, id: str, \*, expand: Optional[List[Literal["items"]]] = None) -\> GetWebsetResponse:

"""Get a Webset by ID.

id (str): The id or externalId of the Webset.

expand (List[Literal["items"]], optional): Expand the response with specified resources.

Allowed values: ["items"]

GetWebsetResponse: The retrieved webset.

params = {"expand": expand} if expand else {}

response = self.request(f"/v0/websets/{id}", params=params, method="GET")

return GetWebsetResponse.model_validate(response)

def list(self, \*, cursor: Optional[str] = None, limit: Optional[int] = None) -\> ListWebsetsResponse:

cursor (str, optional): The cursor to paginate through the results.

limit (int, optional): The number of results to return (max 200).

ListWebsetsResponse: List of websets.

params = {k: v for k, v in {"cursor": cursor, "limit": limit}.items() if v is not None}

response = self.request("/v0/websets", params=params, method="GET")

return ListWebsetsResponse.model_validate(response)

def update(self, id: str, params: Union[Dict[str, Any], UpdateWebsetRequest]) -\> Webset:

id (str): The id or externalId of the Webset.

params (UpdateWebsetRequest): The parameters for updating a webset.

Webset: The updated webset.

response = self.request(f"/v0/websets/{id}", data=params, method="POST")

return Webset.model_validate(response)

def delete(self, id: str) -\> Webset:

id (str): The id or externalId of the Webset.

Webset: The deleted webset.

response = self.request(f"/v0/websets/{id}", method="DELETE")

return Webset.model_validate(response)

def cancel(self, id: str) -\> Webset:

"""Cancel a running Webset.

id (str): The id or externalId of the Webset.

Webset: The canceled webset.

response = self.request(f"/v0/websets/{id}/cancel", method="POST")

return Webset.model_validate(response)

def wait_until_idle(self, id: str, \*, timeout: int = 3600, poll_interval: int = 5) -\> Webset:

"""Wait until a Webset is idle.

id (str): The id or externalId of the Webset.

timeout (int, optional): Maximum time to wait in seconds. Defaults to 3600.

poll_interval (int, optional): Time to wait between polls in seconds. Defaults to 5.

Webset: The webset once it's idle.

TimeoutError: If the webset does not become idle within the timeout period.

start_time = time.time()

webset = self.get(id)

if webset.status == WebsetStatus.idle.value:

if time.time() - start_time \> timeout:

raise TimeoutError(f"Webset {id} did not become idle within {timeout} seconds")

time.sleep(poll_interval)

from .client import WebsetsClient

[types.py](http://types.py)

from **future** import annotations

from datetime import datetime

from enum import Enum

from typing import Any, Dict, List, Literal, Optional, Union

from pydantic import AnyUrl, Field, confloat, constr

from .core.base import ExaBaseModel

class CanceledReason(Enum):

The reason the search was canceled

webset_deleted = 'webset_deleted'

webset_canceled = 'webset_canceled'

class CreateCriterionParameters(ExaBaseModel):

description: constr(min_length=1)

The description of the criterion

class CreateEnrichmentParameters(ExaBaseModel):

description: constr(min_length=1)

Provide a description of the enrichment task you want to perform to each Webset Item.

format: Optional[Format] = None

Format of the enrichment response.

We automatically select the best format based on the description. If you want to explicitly specify the format, you can do so here.

options: Optional[List[Option]] = Field(None, max_items=20, min_items=1)

When the format is options, the different options for the enrichment agent to choose from.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebhookParameters(ExaBaseModel):

events: List[EventType] = Field(..., max_items=12, min_items=1)

The events to trigger the webhook

The URL to send the webhook to

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebsetParameters(ExaBaseModel):

Create initial search for the Webset.

enrichments: Optional[List[CreateEnrichmentParameters]] = Field(None, max_items=10)

Add Enrichments for the Webset.

external_id: Optional[str] = Field(None, alias='externalId')

The external identifier for the webset.

You can use this to reference the Webset by your own internal identifiers.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebsetSearchParameters(ExaBaseModel):

count: confloat(ge=1.0)

Number of Items the Search will attempt to find.

The actual number of Items found may be less than this number depending on the query complexity.

query: constr(min_length=1) = Field(

'Marketing agencies based in the US, that focus on consumer products. Get brands worked with and city'

Query describing what you are looking for.

Any URL provided will be crawled and used as context for the search.

WebsetResearchPaperEntity,

Entity the Webset will return results for.

It is not required to provide it, we automatically detect the entity from all the information provided in the query.

criteria: Optional[List[CreateCriterionParameters]] = Field(

None, max_items=5, min_items=1

Criteria every item is evaluated against.

It's not required to provide your own criteria, we automatically detect the criteria from all the information provided in the query.

behaviour: Optional[WebsetSearchBehaviour] = Field(

'override', title='WebsetSearchBehaviour'

The behaviour of the Search when it is added to a Webset.

- `override`: the search will reuse the existing Items found in the Webset and evaluate them against the new criteria. Any Items that don't match the new criteria will be discarded.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class Criterion(ExaBaseModel):

description: constr(min_length=1)

The description of the criterion

success_rate: confloat(ge=0.0, le=100.0) = Field(..., alias='successRate')

Value between 0 and 100 representing the percentage of results that meet the criterion.

class EnrichmentResult(ExaBaseModel):

object: Literal['enrichment_result']

format: WebsetEnrichmentFormat

result: Optional[List[str]] = None

The result of the enrichment. None if the enrichment wasn't successful.

reasoning: Optional[str] = None

The reasoning for the result when an Agent is used.

references: List[Reference]

The references used to generate the result.

enrichment_id: str = Field(..., alias='enrichmentId')

The id of the Enrichment that generated the result

class EventType(Enum):

webset_created = 'webset.created'

webset_deleted = 'webset.deleted'

webset_paused = 'webset.paused'

webset_idle = 'webset.idle'

webset_search_created = '[webset.search](http://webset.search).created'

webset_search_canceled = '[webset.search](http://webset.search).canceled'

webset_search_completed = '[webset.search](http://webset.search).completed'

webset_search_updated = '[webset.search](http://webset.search).updated'

webset_export_created = 'webset.export.created'

webset_export_completed = 'webset.export.completed'

webset_item_created = 'webset.item.created'

webset_item_enriched = 'webset.item.enriched'

Format of the enrichment response.

We automatically select the best format based on the description. If you want to explicitly specify the format, you can do so here.

class ListEventsResponse(ExaBaseModel):

WebsetItemCreatedEvent,

WebsetItemEnrichedEvent,

WebsetSearchCreatedEvent,

WebsetSearchUpdatedEvent,

WebsetSearchCanceledEvent,

WebsetSearchCompletedEvent,

] = Field(..., discriminator='type')

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebhookAttemptsResponse(ExaBaseModel):

data: List[WebhookAttempt]

The list of webhook attempts

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebhooksResponse(ExaBaseModel):

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebsetItemResponse(ExaBaseModel):

data: List[WebsetItem]

The list of webset items

has_more: bool = Field(..., alias='hasMore')

Whether there are more Items to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of Items

class ListWebsetsResponse(ExaBaseModel):

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class Option(ExaBaseModel):

The label of the option

class Progress(ExaBaseModel):

The progress of the search

The number of results found so far

completion: confloat(ge=0.0, le=100.0)

The completion percentage of the search

class Reference(ExaBaseModel):

title: Optional[str] = None

The title of the reference

snippet: Optional[str] = None

The relevant snippet of the reference content

The URL of the reference

class Satisfied(Enum):

The satisfaction of the criterion

class Search(ExaBaseModel):

Create initial search for the Webset.

query: constr(min_length=1) = Field(

'Marketing agencies based in the US, that focus on consumer products.'

Use this to describe what you are looking for.

Any URL provided will be crawled and used as context for the search.

count: Optional[confloat(ge=1.0)] = 10

Number of Items the Webset will attempt to find.

The actual number of Items found may be less than this number depending on the search complexity.

WebsetResearchPaperEntity,

] = Field(None, discriminator='type')

Entity the Webset will return results for.

It is not required to provide it, we automatically detect the entity from all the information provided in the query. Only use this when you need more fine control.

criteria: Optional[List[CreateCriterionParameters]] = Field(

None, max_items=5, min_items=1

Criteria every item is evaluated against.

It's not required to provide your own criteria, we automatically detect the criteria from all the information provided in the query. Only use this when you need more fine control.

The source of the Item

class UpdateWebhookParameters(ExaBaseModel):

events: Optional[List[EventType]] = Field(None, max_items=12, min_items=1)

The events to trigger the webhook

url: Optional[AnyUrl] = None

The URL to send the webhook to

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class UpdateWebsetRequest(ExaBaseModel):

metadata: Optional[Dict[str, str]] = None

Set of key-value pairs you want to associate with this object.

class Webhook(ExaBaseModel):

The unique identifier for the webhook

object: Literal['webhook']

status: WebhookStatus = Field(..., title='WebhookStatus')

The status of the webhook

events: List[EventType] = Field(..., min_items=1)

The events to trigger the webhook

The URL to send the webhook to

secret: Optional[str] = None

The secret to verify the webhook signature. Only returned on Webhook creation.

metadata: Optional[Dict[str, Any]] = {}

The metadata of the webhook

created_at: datetime = Field(..., alias='createdAt')

The date and time the webhook was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the webhook was last updated

class WebhookAttempt(ExaBaseModel):

The unique identifier for the webhook attempt

object: Literal['webhook_attempt']

event_id: str = Field(..., alias='eventId')

The unique identifier for the event

event_type: EventType = Field(..., alias='eventType')

webhook_id: str = Field(..., alias='webhookId')

The unique identifier for the webhook

The URL that was used during the attempt

Whether the attempt was successful

response_headers: Dict[str, Any] = Field(..., alias='responseHeaders')

The headers of the response

response_body: str = Field(..., alias='responseBody')

The body of the response

response_status_code: float = Field(..., alias='responseStatusCode')

The status code of the response

The attempt number of the webhook

attempted_at: datetime = Field(..., alias='attemptedAt')

The date and time the webhook attempt was made

class WebhookStatus(Enum):

The status of the webhook

inactive = 'inactive'

class Webset(ExaBaseModel):

The unique identifier for the webset

object: Literal['webset']

status: WebsetStatus = Field(..., title='WebsetStatus')

The status of the webset

external_id: Optional[str] = Field(..., alias='externalId')

The external identifier for the webset

searches: List[WebsetSearch]

The searches that have been performed on the webset.

enrichments: List[WebsetEnrichment]

The Enrichments to apply to the Webset Items.

metadata: Optional[Dict[str, Any]] = {}

Set of key-value pairs you want to associate with this object.

created_at: datetime = Field(..., alias='createdAt')

The date and time the webset was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the webset was updated

class WebsetArticleEntity(ExaBaseModel):

type: Literal['article']

class WebsetCompanyEntity(ExaBaseModel):

type: Literal['company']

class WebsetCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetCustomEntity(ExaBaseModel):

type: Literal['custom']

description: constr(min_length=2)

When you decide to use a custom entity, this is the description of the entity.

The entity represents what type of results the Webset will return. For example, if you want results to be Job Postings, you might use "Job Postings" as the entity description.

class WebsetDeletedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.deleted']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetEnrichment(ExaBaseModel):

The unique identifier for the enrichment

object: Literal['webset_enrichment']

status: WebsetEnrichmentStatus = Field(..., title='WebsetEnrichmentStatus')

The status of the enrichment

webset_id: str = Field(..., alias='websetId')

The unique identifier for the Webset this enrichment belongs to.

title: Optional[str] = None

The title of the enrichment.

This will be automatically generated based on the description and format.

The description of the enrichment task provided during the creation of the enrichment.

format: Optional[WebsetEnrichmentFormat]

The format of the enrichment response.

options: Optional[List[WebsetEnrichmentOption]] = Field(

..., title='WebsetEnrichmentOptions'

When the format is options, the different options for the enrichment agent to choose from.

instructions: Optional[str] = None

The instructions for the enrichment Agent.

This will be automatically generated based on the description and format.

metadata: Optional[Dict[str, Any]] = {}

The metadata of the enrichment

created_at: datetime = Field(..., alias='createdAt')

The date and time the enrichment was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the enrichment was updated

class WebsetEnrichmentFormat(Enum):

class WebsetEnrichmentOption(Option):

class WebsetEnrichmentStatus(Enum):

The status of the enrichment

canceled = 'canceled'

completed = 'completed'

class WebsetIdleEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.idle']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItem(ExaBaseModel):

The unique identifier for the Webset Item

object: Literal['webset_item']

The source of the Item

source_id: str = Field(..., alias='sourceId')

The unique identifier for the source

webset_id: str = Field(..., alias='websetId')

The unique identifier for the Webset this Item belongs to.

WebsetItemPersonProperties,

WebsetItemCompanyProperties,

WebsetItemArticleProperties,

WebsetItemResearchPaperProperties,

WebsetItemCustomProperties,

The properties of the Item

evaluations: List[WebsetItemEvaluation]

The criteria evaluations of the item

enrichments: List[EnrichmentResult]

The enrichments results of the Webset item

created_at: datetime = Field(..., alias='createdAt')

The date and time the item was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the item was last updated

class WebsetItemArticleProperties(ExaBaseModel):

type: Literal['article']

The URL of the article

Short description of the relevance of the article

content: Optional[str] = None

The text content for the article

article: WebsetItemArticlePropertiesFields = Field(

..., title='WebsetItemArticlePropertiesFields'

class WebsetItemArticlePropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the article

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the article was published

class WebsetItemCompanyProperties(ExaBaseModel):

type: Literal['company']

The URL of the company website

Short description of the relevance of the company

content: Optional[str] = None

The text content of the company website

company: WebsetItemCompanyPropertiesFields = Field(

..., title='WebsetItemCompanyPropertiesFields'

class WebsetItemCompanyPropertiesFields(ExaBaseModel):

The name of the company

location: Optional[str] = None

The main location of the company

employees: Optional[float] = None

The number of employees of the company

industry: Optional[str] = None

The industry of the company

about: Optional[str] = None

A short description of the company

logo_url: Optional[AnyUrl] = Field(..., alias='logoUrl')

The logo URL of the company

class WebsetItemCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.item.created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItemCustomProperties(ExaBaseModel):

type: Literal['custom']

Short description of the Item

content: Optional[str] = None

The text content of the Item

custom: WebsetItemCustomPropertiesFields = Field(

..., title='WebsetItemCustomPropertiesFields'

class WebsetItemCustomPropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the website

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the website was published

class WebsetItemEnrichedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.item.enriched']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItemEvaluation(ExaBaseModel):

The description of the criterion

The reasoning for the result of the evaluation

The satisfaction of the criterion

references: List[Reference] = []

The references used to generate the result. `null` if the evaluation is not yet completed.

class WebsetItemPersonProperties(ExaBaseModel):

type: Literal['person']

The URL of the person profile

Short description of the relevance of the person

person: WebsetItemPersonPropertiesFields = Field(

..., title='WebsetItemPersonPropertiesFields'

class WebsetItemPersonPropertiesFields(ExaBaseModel):

The name of the person

location: Optional[str] = None

The location of the person

position: Optional[str] = None

The current work position of the person

picture_url: Optional[AnyUrl] = Field(..., alias='pictureUrl')

The image URL of the person

class WebsetItemResearchPaperProperties(ExaBaseModel):

type: Literal['research_paper']

The URL of the research paper

Short description of the relevance of the research paper

content: Optional[str] = None

The text content of the research paper

research_paper: WebsetItemResearchPaperPropertiesFields = Field(

..., alias='researchPaper', title='WebsetItemResearchPaperPropertiesFields'

class WebsetItemResearchPaperPropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the research paper

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the research paper was published

class WebsetPausedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.paused']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetPersonEntity(ExaBaseModel):

type: Literal['person']

class WebsetResearchPaperEntity(ExaBaseModel):

type: Literal['research_paper']

class WebsetSearch(ExaBaseModel):

The unique identifier for the search

object: Literal['webset_search']

status: WebsetSearchStatus = Field(..., title='WebsetSearchStatus')

The status of the search

query: constr(min_length=1)

The query used to create the search.

WebsetResearchPaperEntity,

The entity the search will return results for.

When no entity is provided during creation, we will automatically select the best entity based on the query.

criteria: List[Criterion]

The criteria the search will use to evaluate the results. If not provided, we will automatically generate them for you.

count: confloat(ge=1.0)

The number of results the search will attempt to find. The actual number of results may be less than this number depending on the search complexity.

The progress of the search

metadata: Optional[Dict[str, Any]] = {}

Set of key-value pairs you want to associate with this object.

canceled_at: Optional[datetime] = Field(..., alias='canceledAt')

The date and time the search was canceled

canceled_reason: Optional[CanceledReason] = Field(..., alias='canceledReason')

The reason the search was canceled

created_at: datetime = Field(..., alias='createdAt')

The date and time the search was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the search was updated

class WebsetSearchBehaviour(Enum):

The behaviour of the Search when it is added to a Webset.

- `override`: the search will reuse the existing Items found in the Webset and evaluate them against the new criteria. Any Items that don't match the new criteria will be discarded.

override = 'override'

class WebsetSearchCanceledEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).canceled']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchCompletedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).completed']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchStatus(Enum):

The status of the search

completed = 'completed'

canceled = 'canceled'

class WebsetSearchUpdatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).updated']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetStatus(Enum):

The status of the webset

class GetWebsetResponse(Webset):

items: Optional[List[WebsetItem]] = None

When expand query parameter contains `items`, this will contain the items in the webset

The following text is a Git repository with code. The structure of the text are sections that begin with ----, followed by a single line containing the file path and file name, followed by a variable amount of lines containing the file contents. The text representing the Git repository ends when the symbols --END-- are encounted. Any further text beyond --END-- are meant to be interpreted as instructions using the aforementioned Git repository as context.

[client.py](http://client.py)

from **future** import annotations

from datetime import datetime

from typing import List, Optional, Literal, Dict, Any, Union

CreateWebsetParameters,

from .core.base import WebsetsBaseClient

from .items import WebsetItemsClient

from .searches import WebsetSearchesClient

from .enrichments import WebsetEnrichmentsClient

from .webhooks import WebsetWebhooksClient

class WebsetsClient(WebsetsBaseClient):

"""Client for managing Websets."""

def **init**(self, client):

super().\__init_\_(client)

self.items = WebsetItemsClient(client)

self.searches = WebsetSearchesClient(client)

self.enrichments = WebsetEnrichmentsClient(client)

self.webhooks = WebsetWebhooksClient(client)

def create(self, params: Union[Dict[str, Any], CreateWebsetParameters]) -\> Webset:

"""Create a new Webset.

params (CreateWebsetParameters): The parameters for creating a webset.

Webset: The created webset.

response = self.request("/v0/websets", data=params)

return Webset.model_validate(response)

def get(self, id: str, \*, expand: Optional[List[Literal["items"]]] = None) -\> GetWebsetResponse:

"""Get a Webset by ID.

id (str): The id or externalId of the Webset.

expand (List[Literal["items"]], optional): Expand the response with specified resources.

Allowed values: ["items"]

GetWebsetResponse: The retrieved webset.

params = {"expand": expand} if expand else {}

response = self.request(f"/v0/websets/{id}", params=params, method="GET")

return GetWebsetResponse.model_validate(response)

def list(self, \*, cursor: Optional[str] = None, limit: Optional[int] = None) -\> ListWebsetsResponse:

cursor (str, optional): The cursor to paginate through the results.

limit (int, optional): The number of results to return (max 200).

ListWebsetsResponse: List of websets.

params = {k: v for k, v in {"cursor": cursor, "limit": limit}.items() if v is not None}

response = self.request("/v0/websets", params=params, method="GET")

return ListWebsetsResponse.model_validate(response)

def update(self, id: str, params: Union[Dict[str, Any], UpdateWebsetRequest]) -\> Webset:

id (str): The id or externalId of the Webset.

params (UpdateWebsetRequest): The parameters for updating a webset.

Webset: The updated webset.

response = self.request(f"/v0/websets/{id}", data=params, method="POST")

return Webset.model_validate(response)

def delete(self, id: str) -\> Webset:

id (str): The id or externalId of the Webset.

Webset: The deleted webset.

response = self.request(f"/v0/websets/{id}", method="DELETE")

return Webset.model_validate(response)

def cancel(self, id: str) -\> Webset:

"""Cancel a running Webset.

id (str): The id or externalId of the Webset.

Webset: The canceled webset.

response = self.request(f"/v0/websets/{id}/cancel", method="POST")

return Webset.model_validate(response)

def wait_until_idle(self, id: str, \*, timeout: int = 3600, poll_interval: int = 5) -\> Webset:

"""Wait until a Webset is idle.

id (str): The id or externalId of the Webset.

timeout (int, optional): Maximum time to wait in seconds. Defaults to 3600.

poll_interval (int, optional): Time to wait between polls in seconds. Defaults to 5.

Webset: The webset once it's idle.

TimeoutError: If the webset does not become idle within the timeout period.

start_time = time.time()

webset = self.get(id)

if webset.status == WebsetStatus.idle.value:

if time.time() - start_time \> timeout:

raise TimeoutError(f"Webset {id} did not become idle within {timeout} seconds")

time.sleep(poll_interval)

from .client import WebsetsClient

[types.py](http://types.py)

from **future** import annotations

from datetime import datetime

from enum import Enum

from typing import Any, Dict, List, Literal, Optional, Union

from pydantic import AnyUrl, Field, confloat, constr

from .core.base import ExaBaseModel

class CanceledReason(Enum):

The reason the search was canceled

webset_deleted = 'webset_deleted'

webset_canceled = 'webset_canceled'

class CreateCriterionParameters(ExaBaseModel):

description: constr(min_length=1)

The description of the criterion

class CreateEnrichmentParameters(ExaBaseModel):

description: constr(min_length=1)

Provide a description of the enrichment task you want to perform to each Webset Item.

format: Optional[Format] = None

Format of the enrichment response.

We automatically select the best format based on the description. If you want to explicitly specify the format, you can do so here.

options: Optional[List[Option]] = Field(None, max_items=20, min_items=1)

When the format is options, the different options for the enrichment agent to choose from.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebhookParameters(ExaBaseModel):

events: List[EventType] = Field(..., max_items=12, min_items=1)

The events to trigger the webhook

The URL to send the webhook to

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebsetParameters(ExaBaseModel):

Create initial search for the Webset.

enrichments: Optional[List[CreateEnrichmentParameters]] = Field(None, max_items=10)

Add Enrichments for the Webset.

external_id: Optional[str] = Field(None, alias='externalId')

The external identifier for the webset.

You can use this to reference the Webset by your own internal identifiers.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class CreateWebsetSearchParameters(ExaBaseModel):

count: confloat(ge=1.0)

Number of Items the Search will attempt to find.

The actual number of Items found may be less than this number depending on the query complexity.

query: constr(min_length=1) = Field(

'Marketing agencies based in the US, that focus on consumer products. Get brands worked with and city'

Query describing what you are looking for.

Any URL provided will be crawled and used as context for the search.

WebsetResearchPaperEntity,

Entity the Webset will return results for.

It is not required to provide it, we automatically detect the entity from all the information provided in the query.

criteria: Optional[List[CreateCriterionParameters]] = Field(

None, max_items=5, min_items=1

Criteria every item is evaluated against.

It's not required to provide your own criteria, we automatically detect the criteria from all the information provided in the query.

behaviour: Optional[WebsetSearchBehaviour] = Field(

'override', title='WebsetSearchBehaviour'

The behaviour of the Search when it is added to a Webset.

- `override`: the search will reuse the existing Items found in the Webset and evaluate them against the new criteria. Any Items that don't match the new criteria will be discarded.

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class Criterion(ExaBaseModel):

description: constr(min_length=1)

The description of the criterion

success_rate: confloat(ge=0.0, le=100.0) = Field(..., alias='successRate')

Value between 0 and 100 representing the percentage of results that meet the criterion.

class EnrichmentResult(ExaBaseModel):

object: Literal['enrichment_result']

format: WebsetEnrichmentFormat

result: Optional[List[str]] = None

The result of the enrichment. None if the enrichment wasn't successful.

reasoning: Optional[str] = None

The reasoning for the result when an Agent is used.

references: List[Reference]

The references used to generate the result.

enrichment_id: str = Field(..., alias='enrichmentId')

The id of the Enrichment that generated the result

class EventType(Enum):

webset_created = 'webset.created'

webset_deleted = 'webset.deleted'

webset_paused = 'webset.paused'

webset_idle = 'webset.idle'

webset_search_created = '[webset.search](http://webset.search).created'

webset_search_canceled = '[webset.search](http://webset.search).canceled'

webset_search_completed = '[webset.search](http://webset.search).completed'

webset_search_updated = '[webset.search](http://webset.search).updated'

webset_export_created = 'webset.export.created'

webset_export_completed = 'webset.export.completed'

webset_item_created = 'webset.item.created'

webset_item_enriched = 'webset.item.enriched'

Format of the enrichment response.

We automatically select the best format based on the description. If you want to explicitly specify the format, you can do so here.

class ListEventsResponse(ExaBaseModel):

WebsetItemCreatedEvent,

WebsetItemEnrichedEvent,

WebsetSearchCreatedEvent,

WebsetSearchUpdatedEvent,

WebsetSearchCanceledEvent,

WebsetSearchCompletedEvent,

] = Field(..., discriminator='type')

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebhookAttemptsResponse(ExaBaseModel):

data: List[WebhookAttempt]

The list of webhook attempts

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebhooksResponse(ExaBaseModel):

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class ListWebsetItemResponse(ExaBaseModel):

data: List[WebsetItem]

The list of webset items

has_more: bool = Field(..., alias='hasMore')

Whether there are more Items to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of Items

class ListWebsetsResponse(ExaBaseModel):

has_more: bool = Field(..., alias='hasMore')

Whether there are more results to paginate through

next_cursor: Optional[str] = Field(..., alias='nextCursor')

The cursor to paginate through the next set of results

class Option(ExaBaseModel):

The label of the option

class Progress(ExaBaseModel):

The progress of the search

The number of results found so far

completion: confloat(ge=0.0, le=100.0)

The completion percentage of the search

class Reference(ExaBaseModel):

title: Optional[str] = None

The title of the reference

snippet: Optional[str] = None

The relevant snippet of the reference content

The URL of the reference

class Satisfied(Enum):

The satisfaction of the criterion

class Search(ExaBaseModel):

Create initial search for the Webset.

query: constr(min_length=1) = Field(

'Marketing agencies based in the US, that focus on consumer products.'

Use this to describe what you are looking for.

Any URL provided will be crawled and used as context for the search.

count: Optional[confloat(ge=1.0)] = 10

Number of Items the Webset will attempt to find.

The actual number of Items found may be less than this number depending on the search complexity.

WebsetResearchPaperEntity,

] = Field(None, discriminator='type')

Entity the Webset will return results for.

It is not required to provide it, we automatically detect the entity from all the information provided in the query. Only use this when you need more fine control.

criteria: Optional[List[CreateCriterionParameters]] = Field(

None, max_items=5, min_items=1

Criteria every item is evaluated against.

It's not required to provide your own criteria, we automatically detect the criteria from all the information provided in the query. Only use this when you need more fine control.

The source of the Item

class UpdateWebhookParameters(ExaBaseModel):

events: Optional[List[EventType]] = Field(None, max_items=12, min_items=1)

The events to trigger the webhook

url: Optional[AnyUrl] = None

The URL to send the webhook to

metadata: Optional[Dict[str, Any]] = None

Set of key-value pairs you want to associate with this object.

class UpdateWebsetRequest(ExaBaseModel):

metadata: Optional[Dict[str, str]] = None

Set of key-value pairs you want to associate with this object.

class Webhook(ExaBaseModel):

The unique identifier for the webhook

object: Literal['webhook']

status: WebhookStatus = Field(..., title='WebhookStatus')

The status of the webhook

events: List[EventType] = Field(..., min_items=1)

The events to trigger the webhook

The URL to send the webhook to

secret: Optional[str] = None

The secret to verify the webhook signature. Only returned on Webhook creation.

metadata: Optional[Dict[str, Any]] = {}

The metadata of the webhook

created_at: datetime = Field(..., alias='createdAt')

The date and time the webhook was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the webhook was last updated

class WebhookAttempt(ExaBaseModel):

The unique identifier for the webhook attempt

object: Literal['webhook_attempt']

event_id: str = Field(..., alias='eventId')

The unique identifier for the event

event_type: EventType = Field(..., alias='eventType')

webhook_id: str = Field(..., alias='webhookId')

The unique identifier for the webhook

The URL that was used during the attempt

Whether the attempt was successful

response_headers: Dict[str, Any] = Field(..., alias='responseHeaders')

The headers of the response

response_body: str = Field(..., alias='responseBody')

The body of the response

response_status_code: float = Field(..., alias='responseStatusCode')

The status code of the response

The attempt number of the webhook

attempted_at: datetime = Field(..., alias='attemptedAt')

The date and time the webhook attempt was made

class WebhookStatus(Enum):

The status of the webhook

inactive = 'inactive'

class Webset(ExaBaseModel):

The unique identifier for the webset

object: Literal['webset']

status: WebsetStatus = Field(..., title='WebsetStatus')

The status of the webset

external_id: Optional[str] = Field(..., alias='externalId')

The external identifier for the webset

searches: List[WebsetSearch]

The searches that have been performed on the webset.

enrichments: List[WebsetEnrichment]

The Enrichments to apply to the Webset Items.

metadata: Optional[Dict[str, Any]] = {}

Set of key-value pairs you want to associate with this object.

created_at: datetime = Field(..., alias='createdAt')

The date and time the webset was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the webset was updated

class WebsetArticleEntity(ExaBaseModel):

type: Literal['article']

class WebsetCompanyEntity(ExaBaseModel):

type: Literal['company']

class WebsetCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetCustomEntity(ExaBaseModel):

type: Literal['custom']

description: constr(min_length=2)

When you decide to use a custom entity, this is the description of the entity.

The entity represents what type of results the Webset will return. For example, if you want results to be Job Postings, you might use "Job Postings" as the entity description.

class WebsetDeletedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.deleted']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetEnrichment(ExaBaseModel):

The unique identifier for the enrichment

object: Literal['webset_enrichment']

status: WebsetEnrichmentStatus = Field(..., title='WebsetEnrichmentStatus')

The status of the enrichment

webset_id: str = Field(..., alias='websetId')

The unique identifier for the Webset this enrichment belongs to.

title: Optional[str] = None

The title of the enrichment.

This will be automatically generated based on the description and format.

The description of the enrichment task provided during the creation of the enrichment.

format: Optional[WebsetEnrichmentFormat]

The format of the enrichment response.

options: Optional[List[WebsetEnrichmentOption]] = Field(

..., title='WebsetEnrichmentOptions'

When the format is options, the different options for the enrichment agent to choose from.

instructions: Optional[str] = None

The instructions for the enrichment Agent.

This will be automatically generated based on the description and format.

metadata: Optional[Dict[str, Any]] = {}

The metadata of the enrichment

created_at: datetime = Field(..., alias='createdAt')

The date and time the enrichment was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the enrichment was updated

class WebsetEnrichmentFormat(Enum):

class WebsetEnrichmentOption(Option):

class WebsetEnrichmentStatus(Enum):

The status of the enrichment

canceled = 'canceled'

completed = 'completed'

class WebsetIdleEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.idle']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItem(ExaBaseModel):

The unique identifier for the Webset Item

object: Literal['webset_item']

The source of the Item

source_id: str = Field(..., alias='sourceId')

The unique identifier for the source

webset_id: str = Field(..., alias='websetId')

The unique identifier for the Webset this Item belongs to.

WebsetItemPersonProperties,

WebsetItemCompanyProperties,

WebsetItemArticleProperties,

WebsetItemResearchPaperProperties,

WebsetItemCustomProperties,

The properties of the Item

evaluations: List[WebsetItemEvaluation]

The criteria evaluations of the item

enrichments: List[EnrichmentResult]

The enrichments results of the Webset item

created_at: datetime = Field(..., alias='createdAt')

The date and time the item was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the item was last updated

class WebsetItemArticleProperties(ExaBaseModel):

type: Literal['article']

The URL of the article

Short description of the relevance of the article

content: Optional[str] = None

The text content for the article

article: WebsetItemArticlePropertiesFields = Field(

..., title='WebsetItemArticlePropertiesFields'

class WebsetItemArticlePropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the article

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the article was published

class WebsetItemCompanyProperties(ExaBaseModel):

type: Literal['company']

The URL of the company website

Short description of the relevance of the company

content: Optional[str] = None

The text content of the company website

company: WebsetItemCompanyPropertiesFields = Field(

..., title='WebsetItemCompanyPropertiesFields'

class WebsetItemCompanyPropertiesFields(ExaBaseModel):

The name of the company

location: Optional[str] = None

The main location of the company

employees: Optional[float] = None

The number of employees of the company

industry: Optional[str] = None

The industry of the company

about: Optional[str] = None

A short description of the company

logo_url: Optional[AnyUrl] = Field(..., alias='logoUrl')

The logo URL of the company

class WebsetItemCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.item.created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItemCustomProperties(ExaBaseModel):

type: Literal['custom']

Short description of the Item

content: Optional[str] = None

The text content of the Item

custom: WebsetItemCustomPropertiesFields = Field(

..., title='WebsetItemCustomPropertiesFields'

class WebsetItemCustomPropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the website

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the website was published

class WebsetItemEnrichedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.item.enriched']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetItemEvaluation(ExaBaseModel):

The description of the criterion

The reasoning for the result of the evaluation

The satisfaction of the criterion

references: List[Reference] = []

The references used to generate the result. `null` if the evaluation is not yet completed.

class WebsetItemPersonProperties(ExaBaseModel):

type: Literal['person']

The URL of the person profile

Short description of the relevance of the person

person: WebsetItemPersonPropertiesFields = Field(

..., title='WebsetItemPersonPropertiesFields'

class WebsetItemPersonPropertiesFields(ExaBaseModel):

The name of the person

location: Optional[str] = None

The location of the person

position: Optional[str] = None

The current work position of the person

picture_url: Optional[AnyUrl] = Field(..., alias='pictureUrl')

The image URL of the person

class WebsetItemResearchPaperProperties(ExaBaseModel):

type: Literal['research_paper']

The URL of the research paper

Short description of the relevance of the research paper

content: Optional[str] = None

The text content of the research paper

research_paper: WebsetItemResearchPaperPropertiesFields = Field(

..., alias='researchPaper', title='WebsetItemResearchPaperPropertiesFields'

class WebsetItemResearchPaperPropertiesFields(ExaBaseModel):

author: Optional[str] = None

The author(s) of the research paper

published_at: Optional[str] = Field(..., alias='publishedAt')

The date and time the research paper was published

class WebsetPausedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['webset.paused']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetPersonEntity(ExaBaseModel):

type: Literal['person']

class WebsetResearchPaperEntity(ExaBaseModel):

type: Literal['research_paper']

class WebsetSearch(ExaBaseModel):

The unique identifier for the search

object: Literal['webset_search']

status: WebsetSearchStatus = Field(..., title='WebsetSearchStatus')

The status of the search

query: constr(min_length=1)

The query used to create the search.

WebsetResearchPaperEntity,

The entity the search will return results for.

When no entity is provided during creation, we will automatically select the best entity based on the query.

criteria: List[Criterion]

The criteria the search will use to evaluate the results. If not provided, we will automatically generate them for you.

count: confloat(ge=1.0)

The number of results the search will attempt to find. The actual number of results may be less than this number depending on the search complexity.

The progress of the search

metadata: Optional[Dict[str, Any]] = {}

Set of key-value pairs you want to associate with this object.

canceled_at: Optional[datetime] = Field(..., alias='canceledAt')

The date and time the search was canceled

canceled_reason: Optional[CanceledReason] = Field(..., alias='canceledReason')

The reason the search was canceled

created_at: datetime = Field(..., alias='createdAt')

The date and time the search was created

updated_at: datetime = Field(..., alias='updatedAt')

The date and time the search was updated

class WebsetSearchBehaviour(Enum):

The behaviour of the Search when it is added to a Webset.

- `override`: the search will reuse the existing Items found in the Webset and evaluate them against the new criteria. Any Items that don't match the new criteria will be discarded.

override = 'override'

class WebsetSearchCanceledEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).canceled']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchCompletedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).completed']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchCreatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).created']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetSearchStatus(Enum):

The status of the search

completed = 'completed'

canceled = 'canceled'

class WebsetSearchUpdatedEvent(ExaBaseModel):

The unique identifier for the event

object: Literal['event']

type: Literal['[webset.search](http://webset.search).updated']

created_at: datetime = Field(..., alias='createdAt')

The date and time the event was created

class WebsetStatus(Enum):

The status of the webset

class GetWebsetResponse(Webset):

items: Optional[List[WebsetItem]] = None

When expand query parameter contains `items`, this will contain the items in the webset

searches/[client.py](http://client.py)

from **future** import annotations

from typing import Dict, Any, Union

from ..types import (

CreateWebsetSearchParameters,

from ..core.base import WebsetsBaseClient

class WebsetSearchesClient(WebsetsBaseClient):

"""Client for managing Webset Searches."""

def **init**(self, client):

super().\__init_\_(client)

def create(self, webset_id: str, params: Union[Dict[str, Any], CreateWebsetSearchParameters]) -\> WebsetSearch:

"""Create a new Search for the Webset.

webset_id (str): The id of the Webset.

params (CreateWebsetSearchParameters): The parameters for creating a search.

WebsetSearch: The created search.

response = self.request(f"/v0/websets/{webset_id}/searches", data=params)

return WebsetSearch.model_validate(response)

def get(self, webset_id: str, id: str) -\> WebsetSearch:

"""Get a Search by ID.

webset_id (str): The id of the Webset.

id (str): The id of the Search.

WebsetSearch: The retrieved search.

response = self.request(f"/v0/websets/{webset_id}/searches/{id}", method="GET")

return WebsetSearch.model_validate(response)

def cancel(self, webset_id: str, id: str) -\> WebsetSearch:

"""Cancel a running Search.

webset_id (str): The id of the Webset.

id (str): The id of the Search.

WebsetSearch: The canceled search.

response = self.request(f"/v0/websets/{webset_id}/searches/{id}/cancel", method="POST")

return WebsetSearch.model_validate(response)

searches/\__init_\_.py

from .client import WebsetSearchesClient

**all** = ["WebsetSearchesClient"]

from ..types import \*

---

## Exa Researcher - JavaScript

**URL:** llms-txt#exa-researcher---javascript

**Contents:**
- What this doc covers
- Setup
- Exa Auto search
- Writing a report with GPT-4
- All Together Now

Source: https://docs.exa.ai/examples/exa-researcher

Example project using the Exa JS SDK.

## What this doc covers

1. Using Exa's Auto search to pick the best search setting for each query (keyword or neural)
2. Using searchAndContents() through Exa's JavaScript SDK

In this example, we will build Exa Researcher, a JavaScript app that, given a research topic, automatically searches for relevant sources with Exa's [**Auto search**](/changelog/auto-search-as-default) and synthesizes the information into a reliable research report.

Fastest setup: Interact with the code in your browser with this Replit [template](https://replit.com/@olafblitz/exa-researcher?v=1).

Alternatively, this [interactive notebook](https://github.com/exa-labs/exa-js/tree/master/examples/researcher/researcher.ipynb) was made with the Deno Javascript kernel for Jupyter so you can easily run it locally. Check out the [plain JS version](https://github.com/exa-labs/exa-js/tree/master/examples/researcher/researcher.mjs) if you prefer a regular Javascript file you can run with NodeJS, or want to skip to the final result. If you'd like to run this notebook locally, [Installing Deno](https://docs.deno.com/runtime/manual/getting%5Fstarted/installation) and [connecting Deno to Jupyter](https://docs.deno.com/runtime/manual/tools/jupyter) is fast and easy.

To play with this code, first we need a [Exa API key](https://dashboard.exa.ai/api-keys) and an [OpenAI API key](https://platform.openai.com/api-keys).

Let's import the Exa and OpenAI SDKs and put in our API keys to create a client object for each. Make sure to pick the right imports for your runtime and paste or load your API keys.

Since we'll be making several calls to the OpenAI API to get a completion from GPT-3.5 Turbo, let's make a simple utility function so we can pass in the system and user messages directly, and get the LLM's response back as a string.

Okay, great! Now let's starting building Exa Researcher.

The researcher should be able to automatically generate research reports for all kinds of different topics. Here's two to start:

The first thing our researcher has to do is decide what kind of search to do for the given topic.

Exa offers two kinds of search: **neural** and **keyword** search. Here's how we decide:

* Neural search is preferred when the query is broad and complex because it lets us retrieve high quality, semantically relevant data. Neural search is especially suitable when a topic is well-known and popularly discussed on the Internet, allowing the machine learning model to retrieve contents which are more likely recommended by real humans.
* Keyword search is useful when the topic is specific, local or obscure. If the query is a specific person's name, and identifier, or acronym, such that relevant results will contain the query itself, keyword search may do well. And if the machine learning model doesn't know about the topic, but relevant documents can be found by directly matching the search query, keyword search may be necessary.

Conveniently, Exa's autosearch feature (on by default) will automatically decide whether to use `keyword` or `neural` search for each query. For example, if a query is a specific person's name, Exa would decide to use keyword search.

Now, we'll create a helper function to generate search queries for our topic.

Next, let's write another function that actually calls the Exa API to perform searches using Auto search.

## Writing a report with GPT-4

The final step is to instruct the LLM to synthesize the content into a research report, including citations of the original links. We can do that by pairing the content and the URLs and writing them into the prompt.

Now, let's just wrap everything into one Researcher function that strings together all the functions we've written. Given a user's research topic, the Researcher will generate search queries, feed those queries to Exa Auto search, and finally use an LLM to synthesize the retrieved information. Three simple steps!

In just a couple lines of code, we've used Exa to go from a research topic to a valuable essay with up-to-date sources.

For a link to a complete, cleaned up version of this project that you can execute in your NodeJS environment, check out the [alternative JS-only version](https://github.com/exa-labs/exa-js/tree/master/examples/researcher/researcher.mjs).

**Examples:**

Example 1 (unknown):
```unknown
Since we'll be making several calls to the OpenAI API to get a completion from GPT-3.5 Turbo, let's make a simple utility function so we can pass in the system and user messages directly, and get the LLM's response back as a string.
```

Example 2 (unknown):
```unknown
Okay, great! Now let's starting building Exa Researcher.

## Exa Auto search

The researcher should be able to automatically generate research reports for all kinds of different topics. Here's two to start:
```

Example 3 (unknown):
```unknown
The first thing our researcher has to do is decide what kind of search to do for the given topic.

Exa offers two kinds of search: **neural** and **keyword** search. Here's how we decide:

* Neural search is preferred when the query is broad and complex because it lets us retrieve high quality, semantically relevant data. Neural search is especially suitable when a topic is well-known and popularly discussed on the Internet, allowing the machine learning model to retrieve contents which are more likely recommended by real humans.
* Keyword search is useful when the topic is specific, local or obscure. If the query is a specific person's name, and identifier, or acronym, such that relevant results will contain the query itself, keyword search may do well. And if the machine learning model doesn't know about the topic, but relevant documents can be found by directly matching the search query, keyword search may be necessary.

Conveniently, Exa's autosearch feature (on by default) will automatically decide whether to use `keyword` or `neural` search for each query. For example, if a query is a specific person's name, Exa would decide to use keyword search.

Now, we'll create a helper function to generate search queries for our topic.
```

Example 4 (unknown):
```unknown
Next, let's write another function that actually calls the Exa API to perform searches using Auto search.
```

---

## Job Search with Exa

**URL:** llms-txt#job-search-with-exa

**Contents:**
- What This Doc Covers
- More than just jobs

Source: https://docs.exa.ai/examples/job-search-with-exa

Tutorial for simple Exa searches on our front-end.

## What This Doc Covers

* The problem with traditional job search tools
* How to use Exa, an AI-powered search engine, for job hunting
* Other cool ways to use Exa beyond job searching

Finding a job is way harder than it should be. Tools like LinkedIn, Handshake, or Google are supposed to solve this problem, but they're filled with too many noisy results to actually be useful.

Here's how you can use AI to find hundreds of hidden job listings in less than 5 minutes.

At a high level, Exa is a search engine that understands your query. So, when searching for "ML internships for new grads in San Francisco" here's what gets returned:

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=69c0445ee6a92ada1eef02a2cfa7bf4d" alt="" data-og-width="1706" width="1706" data-og-height="1596" height="1596" data-path="images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b6d435f30264fb9855e9cb05e43daf8d 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d3210bef12498b88f4fff8a0e9841782 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=91be0f8ee663f9c3b9d904a86e80b916 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d541231da353c644543513aef09049ee 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a89f08eec9d559e32dd26bf05df1fded 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/5d5309c-Screenshot_2024-07-18_at_12.44.34.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=894553c79389eb09556043910a66650c 2500w" />

And, by filtering for only things that were posted recently, you can make sure that the positions were new and not-filled.

But, there's actually an even better way to take advantage of Exa. You can just paste a job posting and get similar ones:

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8fd3a8a4448a7ed7f5917c07e0aeeec5" alt="" data-og-width="1706" width="1706" data-og-height="1596" height="1596" data-path="images/eb97595-Screenshot_2024-07-18_at_12.40.27.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=330ab8ce1d71f3bfe59a75d3f0377fc7 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4461ce355f399c8e8facb5b0aba99a54 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e29b895d7a46f0bdcbcbfddc05bc47dc 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ce2d38a266387070594c70333d385251 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d56e556cb40097a93f3eb064021b6a94 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/eb97595-Screenshot_2024-07-18_at_12.40.27.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7c19b835a8dcbc3a3f2f30223ca4c5f0 2500w" />

## More than just jobs

Job search is really just one use case of Exa. Exa is a search engine built using novel representation learning techniques.

For example, Exa excels at finding similar things.

* **Shopping**: if you want a similar (but cheaper) shirt, paste a link to your shirt and it'll give you hundreds like it
* **Research**: paste a link to a research paper to find hundreds of other relevant papers
* **Startups**: if you're building a startup, find your competitors by searching a link to your startup

---

## Create an Import

**URL:** llms-txt#create-an-import

Source: https://docs.exa.ai/websets/api/imports/create-an-import

post /v0/imports
Creates a new import to upload your data into Websets. Imports can be used to:

- **Enrich**: Enhance your data with additional information using our AI-powered enrichment engine
- **Search**: Query your data using Websets' agentic search with natural language filters
- **Exclude**: Prevent duplicate or already known results from appearing in your searches

Once the import is created, you can upload your data to the returned `uploadUrl` until `uploadValidUntil` (by default 1 hour).

---

## Define the workflow graph

**URL:** llms-txt#define-the-workflow-graph

workflow = StateGraph(MessagesState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode([retrieve_web_content]))
workflow.set_entry_point("agent")
workflow.add_conditional_edges("agent", should_continue)
workflow.add_edge("tools", "agent")

---

## Delete a Webset

**URL:** llms-txt#delete-a-webset

Source: https://docs.exa.ai/websets/api/websets/delete-a-webset

delete /v0/websets/{id}
Deletes a Webset.

Once deleted, the Webset and all its Items will no longer be available.

---

## Test with a known payload and signature

**URL:** llms-txt#test-with-a-known-payload-and-signature

test_payload = '{"type":"webset.created","data":{"id":"ws_test"}}'
test_timestamp = "1234567890"
test_secret = "your_webhook_secret"

---

## Integrations

**URL:** llms-txt#integrations

**Contents:**
- Overview
- Supported integrations
- Managing integrations
- Exporting capabilities
- Setup guides
  - Salesforce
  - HubSpot
  - Instantly
  - Smartlead
  - Lemlist

Source: https://docs.exa.ai/websets/dashboard/integrations

Connect your Websets with popular CRM and email tools

Websets integrates seamlessly with your favorite CRM, email sequencing, and database tools, allowing you to export enriched data directly where you need it. Manage all your integrations from a single dashboard and keep your workflows streamlined.

## Supported integrations

We've built support for leading platforms across sales, marketing, and data enrichment:

* [Salesforce](https://www.salesforce.com/) - Export People entities as Leads
* [HubSpot](https://www.hubspot.com/) - Export People entities as Contacts

* [Instantly](https://instantly.ai/) - Export People entities as Leads
* [Smartlead](https://www.smartlead.ai/) - Export People entities as Leads
* [Lemlist](https://www.lemlist.com/) - Export People entities as Leads

* [Clay](https://www.clay.com/) - Export any entity type via webhook

## Managing integrations

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ddf3ba288cee029617b7c660c6554896" alt="Connected integrations view" data-og-width="1999" width="1999" data-og-height="1061" height="1061" data-path="images/websets/integrations/connected.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=599c451719609ff6087599d8c277b41b 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=96b89f92357be1f5b00fb45d52973003 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=c1f8569482d3bba5950309f75b5a8b55 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=1d020ad6499c6174685d891871793725 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=95fbf7a9ace8c93d2ba50ee1517ca940 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/connected.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=af02cc52480505fa05975677fd36dc82 2500w" />

To enable an integration:

1. Visit [https://websets.exa.ai/integrations](https://websets.exa.ai/integrations)
2. Toggle the integration you want to connect
3. Provide your account credentials
4. The integration will be scoped to your currently selected team

## Exporting capabilities

Currently, we support **exporting all** your Webset table rows to connected platforms. Import functionality for further enrichment is coming soon.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=13617754d7b9606dbcf88ec4523c4a7e" alt="Export options interface" data-og-width="1999" width="1999" data-og-height="1067" height="1067" data-path="images/websets/integrations/export.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=15794cd4d11633fd93ea257f30006160 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=f2a5ed5f48ac66d259699d60dd975831 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=933b3e90bec9cc9c47049bfc43c8e9e4 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=aafe81a94123550b485dcc5883a5bdf1 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=44e2c19258f336b99f221907a16bddf5 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/export.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=397e8211f7811408a7a60f9ff61949ee 2500w" />

When you toggle on the Salesforce integration, you'll be redirected to login to your Salesforce account. After logging in, you'll be redirected back and ready to go!

**Create Leads** – Export any People entity Webset type as **Leads** in your Salesforce account.

When you toggle on the HubSpot integration, you'll be redirected to login to your HubSpot account. You'll be prompted to install the Exa app and grant the requested permissions. After approval, you'll be redirected back and fully connected.

**Create Contacts** – Export any People entity Webset type as **Contacts** in your HubSpot account.

<Frame caption="Instantly API key setup">
  <iframe src="https://www.loom.com/embed/870ed25fc8c24d9ab4d4928817761d33?hideEmbedTopBar=true" allowFullScreen frameBorder="0" className="w-full aspect-video" />
</Frame>

When you toggle on the Instantly integration, you'll need to provide your Instantly API key:

1. Login to your Instantly account and click your avatar in the bottom left corner
2. Select "Settings" from the menu
3. Navigate to the "Integrations" tab
4. Select "API Keys" from the left navigation menu
5. Click "Create API Key"
6. Name your key and select "all:all" for scopes
7. Copy and paste the generated key into Websets

**Create Leads** – Export any People entity Webset type as **Leads** in your Instantly account.

<Frame caption="Smartlead API key setup">
  <iframe src="https://www.loom.com/embed/a4568d1a7d5a4fea9a0101450175d457?hideEmbedTopBar=true" allowFullScreen frameBorder="0" className="w-full aspect-video" />
</Frame>

When you toggle on the Smartlead integration, you'll need to provide your Smartlead API key:

1. Login to your Smartlead account and click your avatar in the top right corner
2. Select "Settings" from the menu
3. Scroll down to "Smartlead API Key"
4. Copy your existing key or generate a new one
5. Paste the key into Websets and click connect

**Create Leads** – Export any People entity Webset type as **Leads** in your Smartlead account.

<Frame caption="Lemlist API key setup">
  <iframe src="https://www.loom.com/embed/7cd4fd32f35042e4b6d73ffcb6c821f7?hideEmbedTopBar=true" allowFullScreen frameBorder="0" className="w-full aspect-video" />
</Frame>

When you toggle on the Lemlist integration, you'll need to provide your Lemlist API key:

1. Login to your Lemlist account and click your name in the bottom left corner
2. Select "Settings" from the menu
3. Click "Integrations" in the left menu
4. Find the "API overview" section and click "Generate"
5. Name your key and click "Create Key"
6. Copy and paste the generated key into Websets

**Create Leads** – Export any People entity Webset type as **Leads** in your Lemlist account.

<Frame caption="Clay webhook setup">
  <iframe src="https://www.loom.com/embed/7baebd0584c144e8bd0869b4770b137d?hideEmbedTopBar=true" allowFullScreen frameBorder="0" className="w-full aspect-video" />
</Frame>

No authentication is required for Clay integration, as we currently support exporting Webset data via webhook only. **Note: A Clay Pro account is required.**

**Creating a webhook**

1. Navigate to a Clay table and click "Add" at the bottom
2. Search for "Webhook" and select it
3. This creates a new table view with a Webhook column
4. Copy the webhook URL from the "Pull in data from a Webhook" panel on the right

**Create table rows** – Export Websets of any entity type to Clay:

1. From a Webset, click "Export" in the top navigation
2. Select the "Clay" integration option
3. Paste the webhook URL from Clay
4. Click "Export"

Your Webset rows will populate your Clay table within moments.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2171ef8d52ffdc65b74a4e01b6413b0c" alt="Clay export interface" data-og-width="1270" width="1270" data-og-height="1290" height="1290" data-path="images/websets/integrations/clay-export.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b46f98a3259d4f3addf483446c461ff6 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e85316751711cad456b2562175a2c498 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=67f3bd324938b7bb843b1868fbb4d534 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e1de8ad6869dcd58a47e30dea3ec7529 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a39e7fec96c92c912529571eedba2edf 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/integrations/clay-export.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=50fde294b23cf81e9bd3ec34ef8f1d95 2500w" />

---

## How Exa Search Works

**URL:** llms-txt#how-exa-search-works

**Contents:**
- Neural search via 'next-link prediction'
- Auto search combines keyword and neural
- Fast search is the world's fastest search API

Source: https://docs.exa.ai/reference/how-exa-search-works

Exa is a novel search engine that utilizes the latest advancements in AI language processing to return the best possible results.

We offer four search types:

* **Auto (Default)** - Our best search, intelligently combines keyword and neural
* **Fast** - A streamlined implementation of keyword and neural search for faster results
* **Keyword** - Uses google-like search to find results with matching keywords
* **Neural** - Our AI search model, predicts relevant links based on query meaning

## Neural search via 'next-link prediction'

At Exa, we've built our very own index of high quality web content, and have trained a model to query this index powered by the same embeddings-based technology that makes modern LLMs so powerful.

By using embeddings, we move beyond keyword searches to use 'next-link prediction', understanding the semantic content of queries and indexed documents. This method predicts which web links are most relevant based on the semantic meaning, not just direct word matches.

By doing this, our model anticipates the most relevant links by understanding complex queries, including indirect or thematic relationships. This approach is especially effective for exploratory searches, where precise terms may be unknown, or where queries demand many, often semantically dense, layered filters.

You can query our search model directly with search type `neural`. It is also incorporated into the `auto` and `fast` search types.

## Auto search combines keyword and neural

Sometimes keyword search is the best way to query the web - for instance, you may have a specific word or piece of jargon that you want to match explicitly with results (often the case with proper nouns like place-names). In these cases, semantic searches are not the most useful.

To ensure our engine is comprehensive, we have built keyword search in parallel to our novel neural search capability. This means Exa is an 'all-in-one' search solution, no matter what your query needs are.

We surface both query archetypes through search type `auto`, to give users the best of both worlds. It uses a reranker model that understands your query and ranks results from keyword and neural search according to relevance.

## Fast search is the world's fastest search API

We built Fast search for when latency matters most. It trades off a small amount of performance for significant speed improvements.

Fast search is best for applications where milliseconds matter. It means a much better user experience for real-time applications like voice agents and autocomplete. It's also great for long running agents, like deep research, that might use hundreds of search calls so the latency adds up.

We achieved these latency improvements by making streamlined versions of our keyword, neural, and reranker models. You can expect Fast search to run in less than 400 milliseconds, not accounting for network latency or live crawling.

---

## Exa

**URL:** llms-txt#exa

**Contents:**
- Full Example

Source: https://docs.exa.ai/integrations/agentops

Use Exa's semantic search and contents endpoints to give your agents access to up-to-date, relevant information on the web.

<Steps>
  <Step title="Install the AgentOps SDK">
    
  </Step>

<Step title="Install the Exa SDK">
    
  </Step>

<Step title="Set Up Environment Variables">
    Create a `.env` file to store your API keys:

<Step title="Initialize the Clients">
    Set up both AgentOps and Exa in your code:

<Step title="Create Your Search Tool">
    Create a tool that uses Exa's search capabilities:

```python  theme={null}
import agentops
from crewai_tools import tool
from exa_py import Exa
from dotenv import load_dotenv
import os

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Install the Exa SDK">
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Set Up Environment Variables">
    Create a `.env` file to store your API keys:
```

Example 3 (unknown):
```unknown
</Step>

  <Step title="Initialize the Clients">
    Set up both AgentOps and Exa in your code:
```

Example 4 (unknown):
```unknown
</Step>

  <Step title="Create Your Search Tool">
    Create a tool that uses Exa's search capabilities:
```

---

## Import from CSV

**URL:** llms-txt#import-from-csv

**Contents:**
- Overview
- How it works
- CSV preparation
- What happens next?
  - Enrich with custom columns
  - Apply search criteria

Source: https://docs.exa.ai/websets/dashboard/import-from-csv

Turn your existing CSV data into a Webset

The Import from CSV feature allows you to transform your existing CSV files containing URLs into fully-functional Websets. This is perfect when you already have a list of websites, companies, or resources that you want to enrich with additional data or apply search criteria to filter.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6cf23e9e291fe7811942d18c3aa08b33" alt="" data-og-width="1512" width="1512" data-og-height="857" height="857" data-path="images/websets/import-flow.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7144bcac1257ad6234f84e09b3b46e65 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e0002f49d319b209241babc75e41bb8c 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4a05c88f7ee0b6c5e1aff2b9b2123458 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=00a37fce8580e9c539033d63d15c00cb 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=11b6832f570530b2a28d21ced7ce3ad1 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/import-flow.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=be874fa671009913eae844700df875d6 2500w" />

1. Click "Start from CSV" to select your CSV file
2. Select which column contains the URLs you want to analyze
3. Review how your data will be imported before proceeding
4. Your URLs are transformed into a Webset with enrichments and metadata

Ensure your CSV file has a URL column

* For People searches: URLs must be LinkedIn profile URLs (e.g., [https://linkedin.com/in/username](https://linkedin.com/in/username))
* For Company search: URLs must be company homepage URLs (e.g., [https://example.com](https://example.com))
* For other searches: use any type of URL

If you do not have URLs, Websets will attempt to infer URLs based on the information in each CSV row and any extra info you provide.

The maximum number of results you can import is determined by your plan.

## What happens next?

Once imported, your CSV becomes a full Webset where you can:

### Enrich with custom columns

Add any information you want about each URL:

* Contact information (emails, phone numbers)
* Company metrics (revenue, employee count)
* Content analysis (sentiment, topics, summaries)
* Custom data specific to your use case

### Apply search criteria

Filter your imported URLs based on specific criteria:

* Company stage or size
* Industry or sector
* Geographic location
* Content type or topic

---

## Preview a webset

**URL:** llms-txt#preview-a-webset

Source: https://docs.exa.ai/websets/api/websets/preview-a-webset

post /v0/websets/preview
Preview how a search query will be decomposed before creating a webset. This endpoint performs the same query analysis that happens during webset creation, allowing you to see the detected entity type, generated search criteria, and available enrichment columns in advance.

Use this to help users understand how their search will be interpreted before committing to a full webset creation.

---

## Migrating from Bing

**URL:** llms-txt#migrating-from-bing

**Contents:**
- Overview
- Quick Start
  - Get your API key
  - Install the SDK
  - Replace your API calls
- Parameter Mapping
- Response Format Differences
- Examples
  - Fresh Content Search
  - Domain-Specific Search

Source: https://docs.exa.ai/reference/migrating-from-bing

Guide for switching from the deprecated Bing Search API to Exa

Microsoft deprecated the Bing Search API on August 11th, 2025. This guide provides the technical details needed to migrate from Bing Search API to Exa's search API.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

### Replace your API calls

| Bing Parameter   | Exa Parameter                                                                          | Notes                                        |
| ---------------- | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| `q`              | `query`                                                                                | Required parameter                           |
| `count`          | `numResults`                                                                           | Default: 10, Max: 100                        |
| `mkt`, `cc`      | `userLocation`                                                                         | Use 2-letter ISO country code                |
| `freshness`      | `startPublishedDate`<br />`endPublishedDate`<br />`startCrawlDate`<br />`endCrawlDate` | Use ISO 8601 date format                     |
| `site:` operator | `includeDomains`<br />`excludeDomains`                                                 | Use arrays of domain strings                 |
| Query filters    | `includeText`<br />`excludeText`                                                       | Use arrays of phrase filters                 |
| `safeSearch`     | `moderation`                                                                           | Disabled by default, set to `true` to enable |
| `offset`         | Not supported                                                                          |                                              |

## Response Format Differences

**Bing Response Structure**

**Exa Response Structure**

### Fresh Content Search

### Domain-Specific Search

### Search with Content Extraction

Exa provides integrated content extraction, eliminating the need for separate API calls:

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown
</CodeGroup>

### Replace your API calls

**Bing**

<CodeGroup>
```

Example 3 (unknown):
```unknown

```

Example 4 (unknown):
```unknown

```

---

## df = pd.read_csv('./students.csv')

**URL:** llms-txt#df-=-pd.read_csv('./students.csv')

---

## Create test signature

**URL:** llms-txt#create-test-signature

import hmac
import hashlib

signed_payload = f"{test_timestamp}.{test_payload}"
test_signature = hmac.new(
    test_secret.encode('utf-8'),
    signed_payload.encode('utf-8'),
    hashlib.sha256
).hexdigest()

test_header = f"t={test_timestamp},v1={test_signature}"

---

## Create a Monitor

**URL:** llms-txt#create-a-monitor

Source: https://docs.exa.ai/websets/api/monitors/create-a-monitor

post /v0/monitors
Creates a new `Monitor` to continuously keep your Websets updated with fresh data.

Monitors automatically run on your defined schedule to ensure your Websets stay current without manual intervention:

- **Find new content**: Execute `search` operations to discover fresh items matching your criteria
- **Update existing content**: Run `refresh` operations to update items contents and enrichments
- **Automated scheduling**: Configure `cron` expressions and `timezone` for precise scheduling control

---

## After: Use results in the order returned (already optimally ranked)

**URL:** llms-txt#after:-use-results-in-the-order-returned-(already-optimally-ranked)

result = exa.search("AI startups", type="auto")

---

## Get contents

**URL:** llms-txt#get-contents

Source: https://docs.exa.ai/reference/get-contents

post /contents
Get the full page contents, summaries, and metadata for a list of URLs.

Returns instant results from our cache, with automatic live crawling as fallback for uncached pages.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Welcome to Websets

**URL:** llms-txt#welcome-to-websets

**Contents:**
- Get Started

Source: https://docs.exa.ai/websets/overview

Our goal is to help you find anything you want on the web, no matter how complex.

You can use Websets in two ways:

1. Through our intuitive Dashboard interface - perfect for quickly finding what you need without any coding
2. Via our powerful API - ideal for programmatic access and integration into your workflow

<CardGroup cols={2}>
  <Card title={<div className="card-title">Dashboard</div>} icon="bolt-lightning" href="./dashboard">
    <div className="text-lg">Use Websets through our Dashboard.</div>
  </Card>

<Card title={<div className="card-title">API</div>} icon="magnifying-glass" href="./api">
    <div className="text-lg">Use Websets programatically through our API.</div>
  </Card>
</CardGroup>

---

## Error Codes

**URL:** llms-txt#error-codes

**Contents:**
- API errors
- Error Response Structure
- Getting Help

Source: https://docs.exa.ai/reference/error-codes

Reference for common error codes used by the Exa API

| Code                        | Overview                                                                                                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 - Bad Request           | **Cause:** Invalid request parameters, malformed JSON, missing required fields<br />**Solution:** Check request body format, validate parameters, ensure API key is correctly formatted |
| 401 - Unauthorized          | **Cause:** Missing or invalid API key<br />**Solution:** Verify your API key is correct and active, ensure proper authentication headers                                                |
| 403 - Forbidden             | **Cause:** Valid API key but insufficient permissions or rate limit exceeded<br />**Solution:** Check feature access permissions or implement rate limiting                             |
| 404 - Not Found             | **Cause:** Resource not found (e.g., Webset, task, or URL doesn't exist)<br />**Solution:** Verify the resource identifier exists and is accessible                                     |
| 409 - Conflict              | **Cause:** Resource already exists (e.g., Webset with same externalId)<br />**Solution:** Use a different identifier or update the existing resource                                    |
| 429 - Too Many Requests     | **Cause:** Rate limit exceeded<br />**Solution:** Implement exponential backoff and reduce request rate                                                                                 |
| 500 - Internal Server Error | **Cause:** Issue on our servers<br />**Solution:** Retry your request after a brief wait and contact us if the issue persists                                                           |
| 502 - Bad Gateway           | **Cause:** Upstream server issue<br />**Solution:** Retry the request after a brief delay                                                                                               |
| 503 - Service Unavailable   | **Cause:** Service temporarily down<br />**Solution:** Retry after delay, check for maintenance announcements                                                                           |

## Error Response Structure

All error responses include a `requestId` field and `error` message:

<Note>
  Include the `requestId` when contacting support for faster troubleshooting.
</Note>

When using the `/contents` endpoint, specific errors are returned in the `statuses` field rather than HTTP error codes. This allows for granular error handling when fetching multiple URLs.

| Tag                       | HTTP Code | Description                              | How to Handle                                                      |
| ------------------------- | --------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `CRAWL_NOT_FOUND`         | `404`     | Content not found at the specified URL   | Verify the URL is correct and accessible                           |
| `CRAWL_TIMEOUT`           | `408`     | Request timed out while fetching content | Retry the request or increase timeout if available                 |
| `CRAWL_LIVECRAWL_TIMEOUT` | `408`     | Live crawl operation timed out           | Try again with `livecrawl: "fallback"` or `livecrawl: "never"`     |
| `SOURCE_NOT_AVAILABLE`    | `403`     | Access forbidden or source unavailable   | Check if the source requires authentication or is behind a paywall |
| `CRAWL_UNKNOWN_ERROR`     | `500+`    | Other crawling errors                    | Retry the request; contact support if persistent                   |

If you encounter persistent errors or need clarification on error codes:

* Check the [Rate Limits](/reference/rate-limits) page for current limits
* Review the [API Reference](/reference/search) for parameter requirements
* Contact support at [hello@exa.ai](mailto:hello@exa.ai) with error details and request IDs

**Examples:**

Example 1 (unknown):
```unknown
<Note>
  Include the `requestId` when contacting support for faster troubleshooting.
</Note>

When using the `/contents` endpoint, specific errors are returned in the `statuses` field rather than HTTP error codes. This allows for granular error handling when fetching multiple URLs.
```

---

## install dependencies

**URL:** llms-txt#install-dependencies

**Contents:**
- Initial Candidates

!pip install exa_py openai matplotlib tqdm

import pandas as pd
from exa_py import Exa
import openai

EXA_API_KEY = ''
OPENAI_API_KEY = ''

exa = Exa(api_key = EXA_API_KEY)
openai.api_key = OPENAI_API_KEY
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
## Initial Candidates

Suppose I'm building Simile, an AI startup for web retrieval.

My hiring criteria is:

* AI experience
* interest in retrieval, databases, and knowledge
* available to work now or soon

We start with 13 example PhD students recommended by friends. All I have is their name and email.
```

---

## List all Items for a Webset

**URL:** llms-txt#list-all-items-for-a-webset

Source: https://docs.exa.ai/websets/api/websets/items/list-all-items-for-a-webset

get /v0/websets/{webset}/items
Returns a list of Webset Items.

You can paginate through the Items using the `cursor` parameter.

---

## List all Websets

**URL:** llms-txt#list-all-websets

Source: https://docs.exa.ai/websets/api/websets/list-all-websets

get /v0/websets
Returns a list of Websets.

You can paginate through the results using the `cursor` parameter.

---

## Create and poll a task until completion

**URL:** llms-txt#create-and-poll-a-task-until-completion

task = exa.research.create_task(
    instructions="Get information about Paris, France",
    output_schema={
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "population": {"type": "string"},
            "founded_date": {"type": "string"}
        }
    }
)

---

## Enable only code search (recommended for developers)

**URL:** llms-txt#enable-only-code-search-(recommended-for-developers)

npx exa-mcp-server --tools=get_code_context_exa

---

## Get an Event

**URL:** llms-txt#get-an-event

Source: https://docs.exa.ai/websets/api/events/get-an-event

get /v0/events/{id}
Get a single Event by id.

You can subscribe to Events by creating a Webhook.

---

## define the system message (primer) of your agent

**URL:** llms-txt#define-the-system-message-(primer)-of-your-agent

SYSTEM_MESSAGE = {
    "role": "system",
    "content": "You are the world's most advanced search engine. Please provide the user with the information they are looking for by using the tools provided.",
}

---

## Python SDK Specification

**URL:** llms-txt#python-sdk-specification

**Contents:**
- Getting started
- `search` Method
  - Input Example:
  - Input Parameters:
  - Returns Example:
  - Return Parameters:
  - Result Object:
- `search_and_contents` Method
  - Input Example:

Source: https://docs.exa.ai/sdks/python-sdk-specification

Enumeration of methods and types in the Exa Python SDK (exa_py).

Install the [exa-py](https://github.com/exa-labs/exa-py) SDK

and then instantiate an Exa client

<Card title="Get API Key" icon="key" horizontal href="https://dashboard.exa.ai/login?redirect=/docs?path=/reference/python-sdk-specification">
  Follow this link to get your API key
</Card>

Perform an Exa search given an input query and retrieve a list of relevant results as links.

### Input Parameters:

| Parameter              | Type                                           | Description                                                                                                                                                                                                                                                  | Default  |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| query                  | str                                            | The input query string.                                                                                                                                                                                                                                      | Required |
| num\_results           | Optional\[int]                                 | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                                 | 10       |
| include\_domains       | Optional\[List\[str]]                          | List of domains to include in the search.                                                                                                                                                                                                                    | None     |
| exclude\_domains       | Optional\[List\[str]]                          | List of domains to exclude in the search.                                                                                                                                                                                                                    | None     |
| start\_crawl\_date     | Optional\[str]                                 | Results will only include links **crawled** after this date.                                                                                                                                                                                                 | None     |
| end\_crawl\_date       | Optional\[str]                                 | Results will only include links **crawled** before this date.                                                                                                                                                                                                | None     |
| start\_published\_date | Optional\[str]                                 | Results will only include links with a **published** date after this date.                                                                                                                                                                                   | None     |
| end\_published\_date   | Optional\[str]                                 | Results will only include links with a **published** date before this date.                                                                                                                                                                                  | None     |
| type                   | Optional\[str]                                 | [The type of search](#), keyword or neural.                                                                                                                                                                                                                  | "auto"   |
| category               | Optional\[str]                                 | A data category to focus on when searching, with higher comprehensivity and data cleanliness. Currently, the available categories are: company, research paper, news, linkedin profile, github, tweet, movie, song, personal site, pdf and financial report. | None     |
| include\_text          | Optional\[List\[str]]                          | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                    | None     |
| exclude\_text          | Optional\[List\[str]]                          | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                          | None     |
| context                | Union\[ContextContentsOptions, Literal\[True]] | If true, concatentates results into a context string.                                                                                                                                                                                                        | None     |

### Return Parameters:

`SearchResponse[Result]`

| Field   | Type           | Description                         |
| ------- | -------------- | ----------------------------------- |
| results | List\[Result]  | List of Result objects              |
| context | Optional\[str] | Results concatentated into a string |

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | str            | URL of the search result      |
| id    | str            | Temporary ID for the document |
| title | Optional\[str] | Title of the search result    |

\| published\_date | Optional\[str]   | Estimated creation date                       |
\| author         | Optional\[str]   | Author of the content, if available           |

## `search_and_contents` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links, optionally including the full text and/or highlights of the content.

```Python Python theme={null}
`# Search with full text content
result_with_text = exa.search_and_contents(
    "AI in healthcare",
    text=True,
    num_results=2
)

**Examples:**

Example 1 (unknown):
```unknown
and then instantiate an Exa client
```

Example 2 (unknown):
```unknown
<Card title="Get API Key" icon="key" horizontal href="https://dashboard.exa.ai/login?redirect=/docs?path=/reference/python-sdk-specification">
  Follow this link to get your API key
</Card>

## `search` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links.

### Input Example:
```

Example 3 (unknown):
```unknown
### Input Parameters:

| Parameter              | Type                                           | Description                                                                                                                                                                                                                                                  | Default  |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| query                  | str                                            | The input query string.                                                                                                                                                                                                                                      | Required |
| num\_results           | Optional\[int]                                 | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                                 | 10       |
| include\_domains       | Optional\[List\[str]]                          | List of domains to include in the search.                                                                                                                                                                                                                    | None     |
| exclude\_domains       | Optional\[List\[str]]                          | List of domains to exclude in the search.                                                                                                                                                                                                                    | None     |
| start\_crawl\_date     | Optional\[str]                                 | Results will only include links **crawled** after this date.                                                                                                                                                                                                 | None     |
| end\_crawl\_date       | Optional\[str]                                 | Results will only include links **crawled** before this date.                                                                                                                                                                                                | None     |
| start\_published\_date | Optional\[str]                                 | Results will only include links with a **published** date after this date.                                                                                                                                                                                   | None     |
| end\_published\_date   | Optional\[str]                                 | Results will only include links with a **published** date before this date.                                                                                                                                                                                  | None     |
| type                   | Optional\[str]                                 | [The type of search](#), keyword or neural.                                                                                                                                                                                                                  | "auto"   |
| category               | Optional\[str]                                 | A data category to focus on when searching, with higher comprehensivity and data cleanliness. Currently, the available categories are: company, research paper, news, linkedin profile, github, tweet, movie, song, personal site, pdf and financial report. | None     |
| include\_text          | Optional\[List\[str]]                          | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                    | None     |
| exclude\_text          | Optional\[List\[str]]                          | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                          | None     |
| context                | Union\[ContextContentsOptions, Literal\[True]] | If true, concatentates results into a context string.                                                                                                                                                                                                        | None     |

### Returns Example:
```

Example 4 (unknown):
```unknown
### Return Parameters:

`SearchResponse[Result]`

| Field   | Type           | Description                         |
| ------- | -------------- | ----------------------------------- |
| results | List\[Result]  | List of Result objects              |
| context | Optional\[str] | Results concatentated into a string |

### Result Object:

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | str            | URL of the search result      |
| id    | str            | Temporary ID for the document |
| title | Optional\[str] | Title of the search result    |

\| published\_date | Optional\[str]   | Estimated creation date                       |
\| author         | Optional\[str]   | Author of the content, if available           |

## `search_and_contents` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links, optionally including the full text and/or highlights of the content.

### Input Example:
```

---

## Context (Exa Code)

**URL:** llms-txt#context-(exa-code)

**Contents:**
- Overview
- Example Use Cases
- Response Format
- Parameters
  - `query` (required)
  - `tokensNum` (optional)
- Integration Examples

Source: https://docs.exa.ai/reference/context

Get relevant code snippets and examples from open source libraries and repositories. Search through code repositories to find contextual examples that help developers understand how specific libraries, frameworks, or programming concepts are implemented in practice.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The Context API (also called **Exa Code**) is a powerful tool for coding agents that need fast, efficient web context. It searches over billions of GitHub repos, docs pages, Stack Overflow posts, and more to find the perfect, token-efficient context that agents need to code correctly.

This endpoint helps eliminate hallucinations in coding agents by providing real, working code examples from the open source community.

The Context API excels at finding practical code examples for:

* **Framework usage**: "use Exa search in python and make sure content is always livecrawled"
* **API syntax**: "use correct syntax for vercel ai sdk to call gpt-5 nano asking it how are you"
* **Development setup**: "how to set up a reproducible Nix Rust development environment"
* **Library implementation**: "React hooks for state management examples"
* **Best practices**: "authentication patterns in NextJS applications"

**Basic Code Search**

**Example Response:**

\nimport React, {\n  useState\n} from 'react';\n\nfunction InputField() {\n  const [name, setName] = useState('');\n\n  const handleChange = (event) => {\n    setName(event.target.value);\n  }\n\n  return (\n    <div>\n      Name:\n      <input onChange={handleChange} />\n      Entered name: {name}\n    </div>\n  );\n}\n\nexport default InputField;\n\nimport { useState } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n\nimport { useState } from \"react\";\n\nconst useCounter = () => {\n  const [count, setCount] = useState(0);\n\n  const increment = () => {\n    setCount((prevCount) => prevCount + 1);\n  };\n\n  const decrement = () => {\n    setCount((prevCount) => prevCount - 1);\n  };\n\n  return { count, increment, decrement };\n};\n\nexport default useCounter;\n`

**Library Usage Examples**

**Framework Setup and Configuration**

The API returns a JSON response with the following structure:

### `query` (required)

* **Type**: `string`
* **Description**: Search query to find relevant code snippets
* **Example**: `"how to use React hooks for state management"`
* **Min Length**: 1 character
* **Max Length**: 2000 characters

### `tokensNum` (optional)

* **Type**: `string | integer`
* **Default**: `"dynamic"`
* **Description**: Token limit for the response
* **Options**:
  * `"dynamic"`: Automatically determine optimal response length
  * `50-100000`: Specific number of tokens to return (5000 is good default for most queries, and use 10000 when 5k doesn't provide enough context)

* Use `"dynamic"` for most queries to get optimal, token-efficient responses
* Specify exact token counts when you need precise output length control
* Higher token counts return more comprehensive examples but cost more

## Integration Examples

**Using with Python**

```python  theme={null}
import requests

def get_code_context(query, tokens="dynamic"):
    response = requests.post(
        "https://api.exa.ai/context",
        headers={
            "Content-Type": "application/json",
            "x-api-key": "YOUR_API_KEY"
        },
        json={
            "query": query,
            "tokensNum": tokens
        }
    )
    
    result = response.json()
    return result["response"]

**Examples:**

Example 1 (unknown):
```unknown
**Example Response:**
```

Example 2 (unknown):
```unknown
**Library Usage Examples**
```

Example 3 (unknown):
```unknown
**Framework Setup and Configuration**
```

Example 4 (unknown):
```unknown
## Response Format

The API returns a JSON response with the following structure:
```

---

## List with pagination

**URL:** llms-txt#list-with-pagination

**Contents:**
  - Input Parameters:
  - Returns:
  - Return Example:

response = exa.research.list_tasks(limit=10)
if response['hasMore']:
    next_page = exa.research.list_tasks(cursor=response['nextCursor'])
JSON JSON theme={null}
{
  "data": [
    {
      "id": "task-1",
      "status": "completed",
      "instructions": "Research SpaceX valuation",
      ...
    },
    {
      "id": "task-2",
      "status": "running",
      "instructions": "Compare GPU specifications",
      ...
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDE4OjMwOjAwWiIsImlkIjoidGFzay0yIn0="
}
```

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter | Type           | Description                             | Default |
| --------- | -------------- | --------------------------------------- | ------- |
| cursor    | Optional\[str] | Pagination cursor from previous request | None    |
| limit     | Optional\[int] | Number of results to return (1-200)     | 25      |

### Returns:

Returns a dictionary with:

| Field      | Type                       | Description                                   |
| ---------- | -------------------------- | --------------------------------------------- |
| data       | List\[ResearchTaskDetails] | List of research task objects                 |
| hasMore    | bool                       | Whether there are more results to paginate    |
| nextCursor | Optional\[str]             | Cursor for the next page (if hasMore is true) |

### Return Example:
```

---

## Websets

**URL:** llms-txt#websets

Source: https://docs.exa.ai/reference/websets-api

---

## List webhooks

**URL:** llms-txt#list-webhooks

Source: https://docs.exa.ai/websets/api/webhooks/list-webhooks

get /v0/webhooks
Get a list of all webhooks in your account.
The results come in pages. Use `limit` to set how many webhooks to get per page (up to 200). Use `cursor` to get the next page of results.

---

## Get API Key

**URL:** llms-txt#get-api-key

**Contents:**
- Overview
- Path Parameters
- Response

Source: https://docs.exa.ai/reference/team-management/get-api-key

get /api-keys/{id}
Retrieve details of a specific API key by its ID.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The Get API Key endpoint allows you to retrieve detailed information about a specific API key using its unique identifier.

* **id**: The unique identifier of the API key to retrieve

Returns detailed information about the API key including:

* **id**: Unique identifier
* **name**: Descriptive name
* **rateLimit**: Rate limit in requests per minute (if set)
* **teamId**: Team ID this key belongs to
* **createdAt**: When the key was created

---

## Update Monitor

**URL:** llms-txt#update-monitor

Source: https://docs.exa.ai/websets/api/monitors/update-monitor

patch /v0/monitors/{id}
Updates a monitor configuration.

---

## List all Events

**URL:** llms-txt#list-all-events

Source: https://docs.exa.ai/websets/api/events/list-all-events

get /v0/events
List all events that have occurred in the system.

You can paginate through the results using the `cursor` parameter.

---

## Get an Enrichment

**URL:** llms-txt#get-an-enrichment

Source: https://docs.exa.ai/websets/api/websets/enrichments/get-an-enrichment

get /v0/websets/{webset}/enrichments/{id}

---

## Search with highlights

**URL:** llms-txt#search-with-highlights

result_with_highlights = exa.search_and_contents(
    "AI in healthcare",
    highlights=True,
    num_results=2
)

---

## Load environment variables from .env file

**URL:** llms-txt#load-environment-variables-from-.env-file

---

## Explicitly use neural search

**URL:** llms-txt#explicitly-use-neural-search

result = exa.search_and_contents("hottest AI startups", type="neural")

---

## Or even simpler - let the model infer the schema

**URL:** llms-txt#or-even-simpler---let-the-model-infer-the-schema

**Contents:**
  - Input Parameters:
  - Returns:
  - Return Example:
- `research.get_task` Method
  - Input Example:

simple_task = exa.research.create_task(
    instructions="What are the main benefits of meditation?",
    infer_schema=True
)

print(f"Task created with ID: {task.id}")
JSON JSON theme={null}
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter      | Type            | Description                                                                               | Default        |
| -------------- | --------------- | ----------------------------------------------------------------------------------------- | -------------- |
| instructions   | str             | Natural language instructions describing what the research task should accomplish.        | Required       |
| model          | Optional\[str]  | The research model to use. Options: "exa-research" (default), "exa-research-pro".         | "exa-research" |
| output\_schema | Optional\[Dict] | JSON Schema specification for the desired output structure. See json-schema.org/draft-07. | None           |
| infer\_schema  | Optional\[bool] | When true and no output schema is provided, an LLM will generate an output schema.        | None           |

### Returns:

Returns a `ResearchTask` object:

| Field | Type | Description                        |
| ----- | ---- | ---------------------------------- |
| id    | str  | The unique identifier for the task |

### Return Example:
```

Example 2 (unknown):
```unknown
## `research.get_task` Method

Get the current status and results of a research task by its ID.

### Input Example:
```

---

## Compile the workflow into a runnable

**URL:** llms-txt#compile-the-workflow-into-a-runnable

app = workflow.compile(checkpointer=checkpointer)

final_state = app.invoke(
    {
        "messages": [
            HumanMessage(content="Latest research papers on climate technology")
        ]
    },
    config={"configurable": {"thread_id": 44}},
)
print(final_state["messages"][-1].content)
```

Full code in Google Colab [here](https://docs.exa.ai/reference/getting-started-with-rag-in-langgraph)

---

## LlamaIndex Docs

**URL:** llms-txt#llamaindex-docs

Source: https://docs.exa.ai/integrations/llamaIndex-docs

Learn how to use Exa's search API with LlamaIndex. LlamaIndex has a dedicated Exa tool. This enables AI agents to perform web search.

For detailed instructions on using Exa with LlamaIndex, visit the [LlamaIndex documentation](https://docs.llamaindex.ai/en/stable/api_reference/tools/exa/).

---

## Get a task

**URL:** llms-txt#get-a-task

Source: https://docs.exa.ai/reference/research/get-a-task

get /research/v1/{researchId}
Retrieve the status and results of a previously created research task.

Use the unique `researchId` returned from `POST /research/v1` to poll until the task is finished.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Delete API Key

**URL:** llms-txt#delete-api-key

**Contents:**
- Overview
- Path Parameters

Source: https://docs.exa.ai/reference/team-management/delete-api-key

delete /api-keys/{id}
Permanently delete an API key from your team.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The Delete API Key endpoint permanently removes an API key from your team.

* **id**: The unique identifier of the API key to delete (UUID format)

---

## Domain Path Filter Support

**URL:** llms-txt#domain-path-filter-support

**Contents:**
- What's New
- Examples
- When to Use Path Filtering
- How To Use Path Filtering
- Need Help?

Source: https://docs.exa.ai/changelog/domain-path-filter

`includeDomains` and `excludeDomains` now support URL path filtering and subdomain wildcards.

**Date: August 4, 2025**

The `includeDomains` and `excludeDomains` parameters now support:

* **Path-specific filtering**: Target specific sections of a domain by including the path
* **Subdomain wildcard matching**: Use `*.domain.com` to match all subdomains

| Pattern                  | What it matches                 | Example URLs                                                          |
| ------------------------ | ------------------------------- | --------------------------------------------------------------------- |
| `"*.substack.com"`       | Any subdomain of substack.com   | `https://thehobbyist.substack.com/p/location-matters-6-days-273-bets` |
| `"exa.ai/blog"`          | Only the blog section of exa.ai | `https://exa.ai/blog/meet-the-exacluster`                             |
| `"linkedin.com/company"` | Company profiles on LinkedIn    | `https://www.linkedin.com/company/exa-ai`                             |

## When to Use Path Filtering

Path filtering is useful for things like:

1. **Blogs**: Search within blogs like `stripe.com/blog`, `openai.com/blog`, or `stratechery.com/2025`
2. **Product Catalogs**: Query product pages like `amazon.com/dp`, `etsy.com/listing`, or `ikea.com/us/en/cat`
3. **Directories**: Search specific directories like `ycombinator.com/companies`, `crunchbase.com/organization`, or `github.com/orgs`

## How To Use Path Filtering

You can use the same `includeDomains` and `excludeDomains` parameters:

If you have any questions about domain filtering or need help with your specific use case, please reach out to [hello@exa.ai](mailto:hello@exa.ai).

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

---

## Generic type for any ExaBaseModel

**URL:** llms-txt#generic-type-for-any-exabasemodel

ModelT = TypeVar('ModelT', bound='ExaBaseModel')

---

## define the function that will be called when the tool is used and perform the search

**URL:** llms-txt#define-the-function-that-will-be-called-when-the-tool-is-used-and-perform-the-search

---

## Hacker News Clone

**URL:** llms-txt#hacker-news-clone

**Contents:**
- What this doc covers:
- Getting Started
- How Exa works
- Customize your site

Source: https://docs.exa.ai/examples/live-demo-hacker-news-clone

Make your very own Hacker News powered by Exa

[Click here to try Exa-powered Hacker News for Anything.](https://hackernews-by-exa.replit.app/)

## What this doc covers:

* How to create a personalized Hacker News clone using Exa's API.
* Steps to set up and run your own news site with custom prompts.
* Customization options for the site's content, appearance, and deployment.

*Estimated time to complete: 20 minutes*

Built by Silicon Valley legend Paul Graham in 2007, [Hacker News](https://news.ycombinator.com/) is a popular website where users post interesting tech-adjacent content. The most interesting content often comes from small blogs and personal sites. However, these gems can be really hard to find.

Thankfully, Exa's search models are good at finding interesting sites from all corners of the web, no matter how big or small. Exa searches the web semantically, enabling you to find information based on meaning rather than SEO. We can use Exa to find super interesting tech articles without specific keywords, topics, or blogs in mind.

In this tutorial, we'll use Exa's API to create a clone of Hacker News. Here's our [live example](https://hackernews-by-exa.replit.app/).

You'll get to create your own personalized version about anything, not just tech. For instance, you could make Business News, a site that displays relevant corporate updates. Your website will automatically update to get the newest content on whatever topic you choose.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=97184fcc3fa592e4a382362e3ab5f962" alt="" data-og-width="2022" width="2022" data-og-height="1446" height="1446" data-path="images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=91c4a9ea2515af7c85fe09ab832c207e 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=cfcec9167a92fc7d85962d8f85d6aec8 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=70f2db46a87edb8f7bce59a18884fbca 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=eff284e5c749fe2e44800830d7067370 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=cba36f852a979cb68ff80552a314c759 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/315a2e9-Screenshot_2024-07-14_at_7.49.35_PM.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d3a29a62f402edbb2accaff311da9e78 2500w" />

First, grab a free Exa API key by signing up [here](https://exa.ai/). You get 1000 free queries a month.

Next, fork (clone) our [template](https://replit.com/@olafblitz/exa-hackernews-demo-nodejs?v=1) on Replit.

Once you've forked the template, go to the lower left corner of the screen and scroll through the options until you see "Secrets" (where you manage environment variables like API keys).

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b4061cc26caf64dc549bf28cbbcd2bf4" alt="Click on Secrets" data-og-width="564" width="564" data-og-height="630" height="630" data-path="images/0screenshot_2024-05-15_at_11.12.21___pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8bb288bb1d0c6cfd3d0d0ab6c0607424 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=0e0dfa9044ac34835cad242f161700a0 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ebf831af4bab7e97ba9f6ce90ff44f20 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=40e564b1c0b2fafa1796269e46a284d1 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=c432997fe9ebf08a9c41fca9d9bc3f08 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.12.21___pm.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=fb53358e7af3ea5b4723b738135054fc 2500w" />

Add your Exa API key as a secret named "EXA\_API\_KEY" (original, we know).

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=70ea666e2e4c6565a99bbe38c29308ee" alt="Add your API key!" data-og-width="1226" width="1226" data-og-height="418" height="418" data-path="images/0screenshot_2024-05-15_at_11.13.34___pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e6d3b1aba0f495da874a6759b3998347 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=785423515dd5b3fbca06e011450654a4 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ddcc1c933ab3dc0c292390dc54adc8cf 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4debe043c21eb195fbb81eccc4d8b2fe 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a491a79ccbc9912e009cda0b6dab72e6 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_11.13.34___pm.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=3bc3d077a97530b44c1dac2277ae1e36 2500w" />

After you've added your API key, click the green Run button in the top center of the window.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=13f12b853f9e2468e1f4b5fc9c25b2d2" alt="Run button" data-og-width="380" width="380" data-og-height="100" height="100" data-path="images/0screenshot_2024-05-15_at_10.08.03___pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ab74740bc7c75043c3bc7316fc738abe 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=bc2e18f86d1cbb8facfd2ed5dbd5963c 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b2fbc14517c9cba50587395cc29acbfc 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2d703cbdcc94d00ca21cb0cca6cbb53d 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=542ea0e9da0aea841499eb46ca2e12c3 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.08.03___pm.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b6b5cdc546b700d24a86035d431145cd 2500w" />

After a few seconds, a Webview window will pop up with your website. You'll see a website that vaguely resembles Hacker News. It's a basic Express.js app with some CSS styling.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=9c8a167ee6e89e8707cf3cb251ec3701" alt="What you should see" data-og-width="1346" width="1346" data-og-height="1228" height="1228" data-path="images/0screenshot_2024-05-15_at_10.12.09___pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=5b082f3f0b17a577fbf6b8a17ad32571 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4cf1547db5ddf7442e261318f5abd3a0 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=900a7f0d0644b705239737a5c2f7799d 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=fc0855f87ba2985925155ad31e4073c1 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=bdc846aef4694c4a732f90639dc9f94f 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0screenshot_2024-05-15_at_10.12.09___pm.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2b7026d44f5924775e4e880b3f778c65 2500w" />

In the index.js file (should be open by default), scroll to **line 19**. This is the brains of the site. It's where we call the Exa API with a custom prompt to get back Hacker News-style content.

The prompt is set to "here is a really interesting tech article:". This is because of how Exa works behind the scenes. Exa uses embeddings to help predict which links would naturally follow a query. For example, on the Internet, you'll frequently see people recommend great content like this: "this tutorial really helped me understand linked lists: linkedlisttutorial.com". When you prompt Exa, you pretend to be someone recommending what you're looking for. In this case, our prompt nudges Exa to find links that someone would share when discussing a "really interesting tech article".

Check out the [results](https://exa.ai/search?q=here%20is%20a%20really%20interesting%20tech%20article%3A\&filters=%7B%22numResults%22%3A30%2C%22useAutoprompt%22%3Afalse%2C%22domainFilterType%22%3A%22include%22%7D) Exa returns for our prompt. Aren't they nice?

More example prompts to help you get a sense of prompting with Exa:

* [this gadget saves me so much time:](https://exa.ai/search?c=all\&q=this%20gadget%20saves%20me%20so%20much%20time%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22any%5Ftime%22%2C%22activeTabFilter%22%3A%22all%22%7D)
* [i loved my wedding dress from this boutique:](https://exa.ai/search?c=all\&q=i%20loved%20my%20wedding%20dress%20from%20this%20boutique%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22any%5Ftime%22%2C%22activeTabFilter%22%3A%22all%22%7D)
* [this video helped me understand attention mechanisms:](https://exa.ai/search?c=all\&q=this%20video%20helped%20me%20understand%20attention%20mechanisms%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22any%5Ftime%22%2C%22activeTabFilter%22%3A%22all%22%7D)

More examples in the Exa [docs](/reference/the-exa-index).

At this point, please craft your own Exa prompt for your Hacker News site. It can be about anything you find interesting.

* [this is a really exciting machine learning paper:](https://exa.ai/search?c=all\&q=this%20is%20a%20really%20exciting%20machine%20learning%20paper%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22past%5Fday%22%2C%22activeTabFilter%22%3A%22all%22%7D)
* [here's a delicious new recipe:](https://exa.ai/search?c=all\&q=here%27s%20a%20delicious%20new%20recipe%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22any%5Ftime%22%2C%22activeTabFilter%22%3A%22all%22%7D)
* [this company just got acquired:](https://exa.ai/search?c=all\&q=this%20company%20just%20got%20acquired%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22past%5Fday%22%2C%22activeTabFilter%22%3A%22all%22%7D)
* [here's how the basketball game went:](https://exa.ai/search?c=all\&q=here%27s%20how%20the%20basketball%20game%20went%3A\&filters=%7B%22domainFilterType%22%3A%22include%22%2C%22timeFilterOption%22%3A%22past%5Fday%22%2C%22activeTabFilter%22%3A%22all%22%7D)

Once you have your prompt, replace the old one (line 28 of index.js). Hit the Stop button (where the Run button was) and hit Run again to restart your site with the new prompt.

Feel free to keep tweaking your prompt until you get results you like.

## Customize your site

Now, other things you can modify in the site template include the time window to search over, the number of results to return, the text on the site (title, description, footer), and styling (colors, fonts, etc.).

By default, the site asks the Exa API to get the ten most relevant results from the last 24 hours every time you visit the site. On the free plan, you can only get up to ten results, so you'll have to sign up for an Exa plan to increase this. You *can* tweak the time window though. Lines 12 to 17 in index.js is where we set the time window. You can adjust this as you like to get results from the last week, month, year, etc. Note that you don't have to search starting from the current date. You can search between any arbitrary dates, like October 31, 2015 and January 1, 2018.

To adjust the site title and other text, go to line 51 in index.js where the dynamic HTML starts. You can Ctrl-F "change" to find all the places where you can edit the text.

If orange isn't your vibe, go to the styles.css. To get there, go to the left side panel on Replit and click on the "public" folder.

To keep your site running all the time, you'll need to deploy it on Replit using Deployments. Click Deploy in the top right corner and select Autoscale. You can leave the default settings and click Deploy. This does cost money though. Alternatively you can deploy the site on your own. It's only two files (index.js and public/styles.css).

Well, there you have it! You just made your very own Hacker News-style site using the Exa API. Share it on X and [tag us](https://x.com/ExaAILabs) for a retweet!

**Examples:**

Example 1 (unknown):
```unknown
const response = await fetch('https://api.exa.ai/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Add your API key named "EXA_API_KEY" to Repl.it Secrets
    'x-api-key': process.env.EXA_API_KEY,
  },
  body: JSON.stringify({
    // change this prompt!
    query: 'here is a really interesting techy article:',
    // specify the maximum number of results to retrieve (10 is the limit for free API users)
    numResults: 10,
    // Set the start date for the article search
    startPublishedDate: startPublishedDate,
    // Set the end date for the article search
    endPublishedDate: endPublishedDate,
  }),
});
```

---

## Building a Hallucination Checker

**URL:** llms-txt#building-a-hallucination-checker

**Contents:**
- Get Started

Source: https://docs.exa.ai/examples/identifying-hallucinations-with-exa

Learn how to build an AI-powered system that identifies and verifies claims using Exa and LangGraph.

We'll build a hallucination detection system using Exa's search capabilities to verify AI-generated claims. The system works in three steps:

1. Extract claims from text
2. Search for evidence using Exa
3. Verify claims against evidence

This combines RAG with LangGraph to fact-check AI outputs and reduce hallucinations by grounding claims in real-world data.

<Steps>
  <Step title="Pre-requisites and installation">
    Install the required packages:

<Note> You'll need both an Exa API key and an Anthropic API key to run this example. You can get your Anthropic API key [here](https://console.anthropic.com/). </Note>

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

Set up your API keys:

<Step title="Create the claim extractor">
    First, we'll create functions to extract factual claims from the text:

<Note> We include a regex-based fallback method in case the LLM response isn't properly formatted. This ensures our system remains robust even if the LLM output is unexpected. </Note>
  </Step>

<Step title="Set up Exa search">
    Create a function to search for evidence using Exa:

<Note>
      We format each source with its URL and content for easy reference in the verification step. The print statements help with debugging and understanding the search process.
    </Note>
  </Step>

<Step title="Create the claim verifier">
    Build a function to analyze the evidence and assess each claim:

<Note>
      The verifier includes robust error handling and defaults to "Insufficient information" if there are issues with the LLM response or source processing.
    </Note>
  </Step>

<Step title="Create the workflow">
    Set up the LangGraph workflow to orchestrate the process:

<Step title="Test the system">
    Let's try it with a sample text about the Eiffel Tower:

Through this combination of Exa's search capabilities and LangGraph's workflow management, we've created a powerful system for identifying and verifying claims in any text. The system successfully identified both true claims (structure and location) and false claims (construction date and purpose) about the Eiffel Tower.
  </Step>
</Steps>

**Examples:**

Example 1 (unknown):
```unknown
<Note> You'll need both an Exa API key and an Anthropic API key to run this example. You can get your Anthropic API key [here](https://console.anthropic.com/). </Note>

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

    Set up your API keys:
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Create the claim extractor">
    First, we'll create functions to extract factual claims from the text:
```

Example 3 (unknown):
```unknown
<Note> We include a regex-based fallback method in case the LLM response isn't properly formatted. This ensures our system remains robust even if the LLM output is unexpected. </Note>
  </Step>

  <Step title="Set up Exa search">
    Create a function to search for evidence using Exa:
```

Example 4 (unknown):
```unknown
<Note>
      We format each source with its URL and content for easy reference in the verification step. The print statements help with debugging and understanding the search process.
    </Note>
  </Step>

  <Step title="Create the claim verifier">
    Build a function to analyze the evidence and assess each claim:
```

---

## Get Monitor

**URL:** llms-txt#get-monitor

Source: https://docs.exa.ai/websets/api/monitors/get-monitor

get /v0/monitors/{id}
Gets a specific monitor.

---

## Python and TS Cheat Sheets

**URL:** llms-txt#python-and-ts-cheat-sheets

Source: https://docs.exa.ai/sdks/cheat-sheet

Some common code you might want to use - don't miss the TypeScript tab below!

<Tabs>
  <Tab title="Python">
    
  </Tab>

<Tab title="typeScript">
    
  </Tab>
</Tabs>

**Examples:**

Example 1 (unknown):
```unknown
</Tab>

  <Tab title="typeScript">
```

---

## we can already get things like role and education, but we need to get the name and email this time

**URL:** llms-txt#we-can-already-get-things-like-role-and-education,-but-we-need-to-get-the-name-and-email-this-time

def get_name_from_contents(contents):
    content = f"""I'm going to give you some information I found online about a person. Based on the provided information, figure out their full name.
    Some examples are \"Sarah Chieng\" or \"Will Bryk.\" You should answer only in the example format, or return \"not sure\" if you're not sure. Do not return any other text. Here is the information I have scraped: {contents}."""
    return get_openai_response(content)

def get_email_from_contents(contents):
    content = f"""I'm going to give you some information I found online about a person. Based on the provided information, figure out their email.
    Some examples are \"[[email protected]](/cdn-cgi/l/email-protection)\" or \"[[email protected]](/cdn-cgi/l/email-protection).\" You should answer only in the example format, or return \"not sure\" if you're not sure. Do not return any other text. Here is the information I have scraped: {contents}."""
    return get_openai_response(content)

---

## Score Deprecation in Auto and Keyword Search

**URL:** llms-txt#score-deprecation-in-auto-and-keyword-search

**Contents:**
- What Changed
- What This Means for You
- How to Update Your Code
  - Remove Score Dependencies

Source: https://docs.exa.ai/changelog/auto-keyword-score-deprecation

We're deprecating relevance scores in Auto and Keyword search types due to architectural improvements. Scores will remain available in Neural search.

**Date: July 21, 2025**

We're launching a big update to Auto search in our API. The new system cannot create useful scores for results. Because of this, we're removing scores from Auto and Keyword search types.

<Info>
  Scores in Neural search results will remain unchanged and continue to work exactly as before.
</Info>

Previously, all search types (Auto, Keyword, and Neural) returned relevance scores - a number from 0 to 1 representing similarity between the query and each result. With our new Auto search architecture, we can no longer generate meaningful scores for Auto and Keyword search results.

The search functionality works exactly the same way as it did before - you'll still get the same high-quality results, just without the `score` field in the response.

## What This Means for You

1. **Auto search**: The `score` field will no longer be returned in search results
2. **Keyword search**: The `score` field will no longer be returned in search results
3. **Neural search**: Scores continue to work exactly as before with no changes
4. **Migration needed**: If your application relies on scores from Auto or Keyword search, you should migrate as soon as possible

## How to Update Your Code

If you currently use scores from Auto or Keyword search, here is what you can do:

### Remove Score Dependencies

```python Python theme={null}

---

## Company researcher

**URL:** llms-txt#company-researcher

Source: https://docs.exa.ai/examples/demo-company-researcher

---

## Websets News Monitor

**URL:** llms-txt#websets-news-monitor

Source: https://docs.exa.ai/examples/demo-websets-news-monitor

A live demo that monitors the web semantically using the Websets API.

<Card title="Click here to try it out." href="https://demo.exa.ai/websets-news-monitor" img="https://exa.imgix.net/websets-news-monitor.png" />

---

## Enable deep researcher tools

**URL:** llms-txt#enable-deep-researcher-tools

npx exa-mcp-server --tools=deep_researcher_start,deep_researcher_check

---

## Generate multiple insights

**URL:** llms-txt#generate-multiple-insights

num_insights = 5
insights = []
for _ in range(num_insights):
    insight = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_model=AIEthicsInsight,
        messages=[
            {
                "role": "user",
                "content": f"Provide an insight on AI ethics based on the following research:\n\n{combined_results}",
            }
        ],
    )
    insights.append(insight)

---

## Get all public names from model module that don't start with underscore

**URL:** llms-txt#get-all-public-names-from-model-module-that-don't-start-with-underscore

model_module = sys.modules[\__name_\_]

**all** = ['WebsetsBaseClient', 'ExaBaseModel'] \+ [

name for name in dir(model_module)

if not name.startswith('\_') and name not in ('WebsetsBaseClient', 'ExaBaseModel')

core/[base.py](http://base.py)

from **future** import annotations

from pydantic import ConfigDict, BaseModel, AnyUrl

from enum import Enum

from typing import Any, Dict, Optional, TypeVar, Generic, Type, get_origin, get_args, Union

---

## Get Monitor Run

**URL:** llms-txt#get-monitor-run

Source: https://docs.exa.ai/websets/api/monitors/runs/get-monitor-run

get /v0/monitors/{monitor}/runs/{id}
Gets a specific monitor run.

---

## Get a research task by ID

**URL:** llms-txt#get-a-research-task-by-id

**Contents:**
  - Input Parameters:
  - Returns:
  - Return Example:
- `research.poll_task` Method
  - Input Example:

task_id = "your-task-id-here"
task = exa.research.get_task(task_id)

print(f"Task status: {task.status}")
if task.status == "completed":
    print(f"Results: {task.data}")
    print(f"Citations: {task.citations}")
JSON JSON theme={null}
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "completed",
  "instructions": "What is the latest valuation of SpaceX?",
  "schema": {
    "type": "object",
    "properties": {
      "valuation": {"type": "string"},
      "date": {"type": "string"},
      "source": {"type": "string"}
    }
  },
  "data": {
    "valuation": "$350 billion",
    "date": "December 2024",
    "source": "Financial Times"
  },
  "citations": {
    "valuation": [
      {
        "id": "https://www.ft.com/content/...",
        "url": "https://www.ft.com/content/...",
        "title": "SpaceX valued at $350bn in employee share sale",
        "snippet": "SpaceX has been valued at $350bn..."
      }
    ]
  }
}
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter | Type | Description                       | Default  |
| --------- | ---- | --------------------------------- | -------- |
| task\_id  | str  | The unique identifier of the task | Required |

### Returns:

Returns a `ResearchTaskDetails` object:

| Field        | Type                        | Description                                      |
| ------------ | --------------------------- | ------------------------------------------------ |
| id           | str                         | The unique identifier for the task               |
| status       | str                         | Task status: "running", "completed", or "failed" |
| instructions | str                         | The original instructions provided               |
| schema       | Optional\[Dict]             | The JSON schema specification used               |
| data         | Optional\[Dict]             | The research results (when completed)            |
| citations    | Optional\[Dict\[str, List]] | Citations grouped by root field (when completed) |

### Return Example:
```

Example 2 (unknown):
```unknown
## `research.poll_task` Method

Poll a research task until it completes or fails, returning the final result.

### Input Example:
```

---

## Adding and Managing Your Team Members in Websets

**URL:** llms-txt#adding-and-managing-your-team-members-in-websets

Source: https://docs.exa.ai/websets/dashboard/walkthroughs/Managing-Team-Members

Here's how to manage your team.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/fveEzbgR5X4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />

* Click on the top right-hand side icon. Go to team settings.

* Edit permissions per team member or add emails at the bottom.

* Your team member will receive an email confirmation to be added.

---

## IBM WatsonX

**URL:** llms-txt#ibm-watsonx

**Contents:**
- What it does
- Try Notebook
- Resources

Source: https://docs.exa.ai/reference/ibm-watsonx

Combine IBM WatsonX's AI with Exa's web search to build a smart assistant that can search the internet and answer questions.

<Frame>
  <video className="w-full aspect-video" controls src="https://exa.imgix.net/ibm_exa_integration_video.mp4" />
</Frame>

<Card title="Try it yourself" icon="notebook" href="https://github.com/exa-labs/ibm-exa/blob/main/ibm_exa_integration.ipynb">
  Check out our example notebook to get started quickly
</Card>

This integration connects IBM WatsonX with Exa to create an AI that can:

* Search the web to get information
* Give answers with links to sources
* Handle both simple and complex questions

Want to see it in action? [Try notebook here.](https://github.com/exa-labs/ibm-exa/blob/main/ibm_exa_integration.ipynb)

Make sure to add your API keys to the notebook.

* [IBM WatsonX](https://www.ibm.com/products/watsonx-ai)
* [Exa API Playground](https://dashboard.exa.ai/)
* [Github Repository for this integration](https://github.com/exa-labs/ibm-exa)

---

## RAG Q&A

**URL:** llms-txt#rag-q&a

**Contents:**
  - What this doc covers
- Answer your questions with context

Source: https://docs.exa.ai/examples/exa-rag

Using Exa to enable retrieval-augmented generation.

### What this doc covers

1. Using Exa search\_and\_contents to find relevant webpages for a query and get their contents
2. Performing Exa search based on text similarity rather than a search query

The Jupyter notebook for this tutorial is available on [Colab](https://colab.research.google.com/drive/1iXfXg9%5F-MEmhwW1a0WRHHbMl21jSxjO7?usp=sharing) for easy experimentation.

## Answer your questions with context

LLMs are powerful because they compress large amounts of data into a format that allows convenient access, but this compressions isn't lossless. LLMs are prone to hallucination, corrupting facts and details from training data.

To get around this fundamental issue with LLM reliability, we can use Exa to bring the most relevant data into context—a fancy way of saying: put the info in the LLM prompt directly. This lets us combine the compressed data and *reasoning abilities* of the LLM with a curated selection of uncompressed, accurate data for the problem at hand for the best answers possible.

Exa's SDKs make incorporating quality data into your LLM pipelines quick and painless. Install the SDK by running this command in your terminal:

```Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown

```

---

## Livecrawling Contents

**URL:** llms-txt#livecrawling-contents

**Contents:**
- LiveCrawl Options
- When LiveCrawl Isn't Necessary
- Examples
  - Company News
  - Production Applications

Source: https://docs.exa.ai/reference/livecrawling-contents

With Exa, we can already search the web using LLMs.

However, by default, we cache all of our links to bias for the fastest response possible. You may be interested in the live version of the page, which our `livecrawl` parameter can help with.

Here are all livecrawl options and their behaviors:

| Option        | Crawl Behavior   | Cache Fallback              | Best For                                               |
| ------------- | ---------------- | --------------------------- | ------------------------------------------------------ |
| `"always"`    | Always crawls    | Never falls back            | Real-time data (news, stock prices, live events)       |
| `"preferred"` | Always crawls    | Falls back on crawl failure | Production apps needing fresh content with reliability |
| `"fallback"`  | Only if no cache | Uses cache first            | Balanced speed and freshness                           |
| `"never"`     | Never crawls     | Always uses cache           | Maximum speed, historical/static content               |

## When LiveCrawl Isn't Necessary

Cached data is sufficient for many queries, especially for historical topics like "What were the major causes of World War II?" or educational content such as "How does photosynthesis work?" These subjects rarely change, so reliable cached results can provide accurate information quickly.

Using `"always"` ensures you get the freshest content. If you're tracking Apple's latest releases, you'll want a live view of their homepage:

Output without LiveCrawl: Results here are slightly dated, mentioning a fall release (later in the year)

Output with LiveCrawl (as at Oct 30 2024): Now we see contents talking about Apple's upcoming specific release on November 11th

### Production Applications

Using `"preferred"` provides fresh content with fallback reliability. This is ideal for production applications:

This will try to get the freshest content available, but if live crawling fails (due to website downtime, network issues, etc.), it falls back to cached content instead of failing entirely. This makes it ideal for production applications.

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

Example 3 (unknown):
```unknown
</CodeGroup>

Output without LiveCrawl: Results here are slightly dated, mentioning a fall release (later in the year)
```

Example 4 (unknown):
```unknown
Output with LiveCrawl (as at Oct 30 2024): Now we see contents talking about Apple's upcoming specific release on November 11th
```

---

## Update Import

**URL:** llms-txt#update-import

Source: https://docs.exa.ai/websets/api/imports/update-import

patch /v0/imports/{id}
Updates a import configuration.

---

## Before: Code that depends on scores

**URL:** llms-txt#before:-code-that-depends-on-scores

result = exa.search("AI startups", type="auto")
sorted_results = sorted(result.results, key=lambda x: x.score, reverse=True)

---

## Geolocation Filter Support

**URL:** llms-txt#geolocation-filter-support

**Contents:**
- When to Use Geolocation Filter
- How To Use Geolocation Filter
- Response Structure Changes
- Need Help?

Source: https://docs.exa.ai/changelog/geolocation-filter-support

`userLocation` added to the search API to bias search results based on geographic location.

**Date: July 30, 2025**

We're excited to announce a new `userLocation` parameter that lets you bias search results based on a user's geographic region. The location is passed as an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code (e.g., "fr" for France, "us" for the United States).

If this field is provided, search will return results that are more relevant to users in the provided region.

## When to Use Geolocation Filter

The `userLocation` parameter is particularly useful for:

1. **Multi-regional applications**: Show users content that's relevant to their region
2. **Language-specific content**: Prioritizing content in regional languages
3. **Local discovery**: Surface products or businesses relevant to the users region

Consider using geolocation filtering when the user's physical location or regional context significantly impacts the relevance of search results.

## How To Use Geolocation Filter

Here's how to implement the new `userLocation` parameter:

## Response Structure Changes

The response structure remains unchanged - geolocation filtering affects result ranking and relevance scoring, but doesn't modify the response format.

If you have any questions about location filtering or need help with your specific use case, please reach out to [hello@exa.ai](mailto:hello@exa.ai).

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

---

## FAQs

**URL:** llms-txt#faqs

Source: https://docs.exa.ai/reference/faqs

<AccordionGroup>
  <Accordion title="What is Exa?">
    Exa is a search engine built specifically for AI applications. We've built our own search engine from scratch that is state of the art at finding high quality information for LLMs. Exa is used by thousands of companies to power their LLM and agentic applications.
  </Accordion>

<Accordion title="What's different about Exa Search?">
    Traditional search engines like Google that are optimized for clicks and ads. Because nearly every search API wrap Google, they all have a similar problem.

In contrast, Exa is optimized to return the highest quality information for LLM applications. We do not make money from ads, so we are fully incentivized to return the highest quality results to our customers. Because we've built our own search engine from scratch, we're able to provide all sorts of customized features that other providers can't.
  </Accordion>

<Accordion title="How is Exa different from LLMs?">
    Exa is a new search engine built from the ground up. LLMs are models built to predict the next piece of text. Exa predicts specific links on the web given their relevance to a query. LLMs have intelligence, and are getting smarter over time as new models are trained. Exa connects these intelligences to the web.
  </Accordion>

<Accordion title="How can Exa be used in an LLM?">
    Exa enhances LLMs by supplying high-quality, relevant web content, minimizing hallucination and outdated responses. An LLM can take a user's query, use Exa to find pertinent web content, and generate answers based on reliable, up-to-date information.
  </Accordion>

<Accordion title="How does Exa compare to other search APIs?">
    Exa.ai offers unique capabilities:

* Embedding Search Technology: Uses transformers for semantic understanding, handling complex queries based on meaning.
    * Natural Language Queries: Processes and understands natural language queries for more accurate results.
    * Instant Content Retrieval: Instantly returns clean and parsed content for any page in its index.
    * Large-scale searches: Capable of returning thousands of results for automatic processing, ideal for batch use cases.
    * Content Highlights: Extracts relevant excerpts or highlights from retrieved content for targeted information.
    * Optimized for AI Applications: Specifically designed for enhancing AI models, chatbots, and research automation.
    * Auto search: Automatically selects the best search type (neural or keyword) based on the query for optimal results.
  </Accordion>

<Accordion title="How often is the index updated?">
    We update our index every hour, and are constantly adding batches of new links. We target the highest quality web pages. Our clients oftentimes request specific domains to be more deeply covered - if there is a use-case we can unlock by additional domain coverage in our index, please contact us.
  </Accordion>

<Accordion title="How does similarity search work?">
    When you search using a URL, Exa crawls the URL, parses the main content from the HTML, and searches the index with that parsed content.

The model chooses webpages which it predicts are talked about in similar ways to the prompt URL. That means the model considers a range of factors about the page, including the text style, the domain, and the main ideas inside the text.

Similarity search is natural extension for a neural search engine like Exa, and something that's difficult with keyword search engines like google
  </Accordion>

<Accordion title="What security measures does Exa take?">
    We have robust policies and everything we do is either in standard cloud services, or built in house (e.g., we have our own vector database that we serve in house, our own GPU cluster, our own query model and our own SERP solution). In addition to this, we can offer unique security arrangements like zero data retention as part of a custom enterprise agreement. [Learn more](./security).
  </Accordion>

<Accordion title="Does Exa have a crawler?">
    Exa crawls pages on the web, just like any other search engine. If a webpage has the noindex tag and is therefore not crawlable by any search engine, then Exa will not crawl that page.
  </Accordion>

<Accordion title="What's on our roadmap?">
    * Super low latency search
    * Build a (much) larger index
    * Solve search. No, really.
  </Accordion>
</AccordionGroup>

---

## Get an Item

**URL:** llms-txt#get-an-item

Source: https://docs.exa.ai/websets/api/websets/items/get-an-item

get /v0/websets/{webset}/items/{id}
Returns a Webset Item.

---

## Find similar with both text and highlights

**URL:** llms-txt#find-similar-with-both-text-and-highlights

**Contents:**
  - Input Parameters:
  - Returns:
- `answer` Method
  - Input Example:

similar_with_text_and_highlights = exa.find_similar_and_contents(
    "https://example.com/article",
    text=True,
    highlights=True,
    num_results=2
)
Python Python theme={null}
response = exa.answer("What is the capital of France?")

print(response.answer)       # e.g. "Paris"
print(response.citations)    # list of citations used

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter               | Type                                              | Description                                                                                   | Default  |
| ----------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| url                     | str                                               | The URL of the webpage to find similar results for.                                           | Required |
| text                    | Union\[TextContentsOptions, Literal\[True]]       | If provided, includes the full text of the content in the results.                            | None     |
| highlights              | Union\[HighlightsContentsOptions, Literal\[True]] | If provided, includes highlights of the content in the results.                               | None     |
| num\_results            | Optional\[int]                                    | Number of similar results to return.                                                          | None     |
| include\_domains        | Optional\[List\[str]]                             | List of domains to include in the search.                                                     | None     |
| exclude\_domains        | Optional\[List\[str]]                             | List of domains to exclude from the search.                                                   | None     |
| start\_crawl\_date      | Optional\[str]                                    | Results will only include links **crawled** after this date.                                  | None     |
| end\_crawl\_date        | Optional\[str]                                    | Results will only include links **crawled** before this date.                                 | None     |
| start\_published\_date  | Optional\[str]                                    | Results will only include links with a **published** date after this date.                    | None     |
| end\_published\_date    | Optional\[str]                                    | Results will only include links with a **published** date before this date.                   | None     |
| exclude\_source\_domain | Optional\[bool]                                   | If true, excludes results from the same domain as the input URL.                              | None     |
| category                | Optional\[str]                                    | A data category to focus on when searching, with higher comprehensivity and data cleanliness. | None     |
| context                 | Union\[ContextContentsOptions, Literal\[True]]    | If true, concatentates results into a context string.                                         | None     |

### Returns:

The return type depends on the combination of `text` and `highlights` parameters:

* `SearchResponse[ResultWithText]`: When only `text` is provided or when neither `text` nor `highlights` is provided (defaults to including text).
* `SearchResponse[ResultWithHighlights]`: When only `highlights` is provided.
* `SearchResponse[ResultWithTextAndHighlights]`: When both `text` and `highlights` are provided.

The response contains similar results and an optional autoprompt string.

Note: If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

## `answer` Method

Generate an answer to a query using Exa's search and LLM capabilities. This method returns an AnswerResponse with the answer and a list of citations. You can optionally retrieve the full text of each citation by setting text=True.

### Input Example:
```

---

## TypeScript SDK Specification

**URL:** llms-txt#typescript-sdk-specification

**Contents:**
- Getting started
- `search` Method
  - Input Example
  - Input Parameters
  - Returns Example
  - Return Parameters
  - `SearchResponse`
  - `Result` Object
- `searchAndContents` Method
  - Input Example

Source: https://docs.exa.ai/sdks/typescript-sdk-specification

Installing the [exa-js](https://github.com/exa-labs/exa-js) SDK

<Tabs>
  <Tab title="npm">
    
  </Tab>

<Tab title="pnpm">
    
  </Tab>
</Tabs>

and then instantiate an Exa client

<Card title="Get API Key" icon="key" horizontal href="https://dashboard.exa.ai/login?redirect=/docs?path=/reference/typescript-sdk-specification">
  Follow this link to get your API key
</Card>

Perform an Exa search given an input query and retrieve a list of relevant results as links.

| Parameter          | Type      | Description                                                                                                                                                                                                                                                | Default   |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| query              | string    | The input query string.                                                                                                                                                                                                                                    | Required  |
| numResults         | number    | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                               | 10        |
| includeDomains     | string\[] | List of domains to include in the search.                                                                                                                                                                                                                  | undefined |
| excludeDomains     | string\[] | List of domains to exclude in the search.                                                                                                                                                                                                                  | undefined |
| startCrawlDate     | string    | Results will only include links **crawled** after this date.                                                                                                                                                                                               | undefined |
| endCrawlDate       | string    | Results will only include links **crawled** before this date.                                                                                                                                                                                              | undefined |
| startPublishedDate | string    | Results will only include links with a **published** date after this date.                                                                                                                                                                                 | undefined |
| endPublishedDate   | string    | Results will only include links with a **published** date before this date.                                                                                                                                                                                | undefined |
| type               | string    | The type of search, "keyword" or "neural".                                                                                                                                                                                                                 | "auto"    |
| category           | string    | data category to focus on when searching, with higher comprehensivity and data cleanliness. Available categories: "company", "research paper", "news", "linkedin profile", "github", "tweet", "movie", "song", "personal site", "pdf", "financial report". | undefined |
| includeText        | string\[] | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                  | undefined |
| excludeText        | string\[] | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                        | undefined |

### Return Parameters

| Field   | Type      | Description            |
| ------- | --------- | ---------------------- |
| results | Result\[] | List of Result objects |

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | string         | URL of the search result      |
| id    | string         | Temporary ID for the document |
| title | string \| null | Title of the search result    |

\| publishedDate? | string         | Estimated creation date                       |
\| author?        | string         | Author of the content, if available           |

## `searchAndContents` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links, optionally including the full text and/or highlights of the content.

| Parameter          | Type                                                                             | Description                                                                                                                                                                                                                                                     | Default   |
| ------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| query              | string                                                                           | The input query string.                                                                                                                                                                                                                                         | Required  |
| text               | boolean \| \{ maxCharacters?: number, includeHtmlTags?: boolean }                | If provided, includes the full text of the content in the results.                                                                                                                                                                                              | undefined |
| highlights         | boolean \| \{ query?: string, numSentences?: number, highlightsPerUrl?: number } | If provided, includes highlights of the content in the results.                                                                                                                                                                                                 | undefined |
| context            | boolean \| \{ maxCharacters?: number }                                           | Return page contents as a context string for LLM RAG. When true, combines all result contents into one string. We recommend 10000+ characters for best results. Context strings often perform better than highlights for RAG applications.                      | undefined |
| numResults         | number                                                                           | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                                    | 10        |
| includeDomains     | string\[]                                                                        | List of domains to include in the search.                                                                                                                                                                                                                       | undefined |
| excludeDomains     | string\[]                                                                        | List of domains to exclude in the search.                                                                                                                                                                                                                       | undefined |
| startCrawlDate     | string                                                                           | Results will only include links **crawled** after this date.                                                                                                                                                                                                    | undefined |
| endCrawlDate       | string                                                                           | Results will only include links **crawled** before this date.                                                                                                                                                                                                   | undefined |
| startPublishedDate | string                                                                           | Results will only include links with a **published** date after this date.                                                                                                                                                                                      | undefined |
| endPublishedDate   | string                                                                           | Results will only include links with a **published** date before this date.                                                                                                                                                                                     | undefined |
| type               | string                                                                           | The type of search, "keyword" or "neural".                                                                                                                                                                                                                      | "auto"    |
| category           | string                                                                           | A data category to focus on when searching, with higher comprehensivity and data cleanliness. Available categories: "company", "research paper", "news", "linkedin profile", "github", "tweet", "movie", "song", "personal site", "pdf" and "financial report". | undefined |
| includeText        | string\[]                                                                        | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                       | undefined |
| excludeText        | string\[]                                                                        | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                             | undefined |

### Return Parameters

| Field   | Type                | Description                  |
| ------- | ------------------- | ---------------------------- |
| results | SearchResult\<T>\[] | List of SearchResult objects |

Extends the `Result` object from the `search` method with additional fields based on `T`:

| Field            | Type      | Description                                    |
| ---------------- | --------- | ---------------------------------------------- |
| text?            | string    | Text of the search result page (if requested)  |
| highlights?      | string\[] | Highlights of the search result (if requested) |
| highlightScores? | number\[] | Scores of the highlights (if requested)        |

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `searchAndContents` call.

## `findSimilar` Method

Find a list of similar results based on a webpage's URL.

| Parameter           | Type      | Description                                                                                   | Default   |
| ------------------- | --------- | --------------------------------------------------------------------------------------------- | --------- |
| url                 | string    | The URL of the webpage to find similar results for.                                           | Required  |
| numResults          | number    | Number of similar results to return.                                                          | undefined |
| includeDomains      | string\[] | List of domains to include in the search.                                                     | undefined |
| excludeDomains      | string\[] | List of domains to exclude from the search.                                                   | undefined |
| startCrawlDate      | string    | Results will only include links **crawled** after this date.                                  | undefined |
| endCrawlDate        | string    | Results will only include links **crawled** before this date.                                 | undefined |
| startPublishedDate  | string    | Results will only include links with a **published** date after this date.                    | undefined |
| endPublishedDate    | string    | Results will only include links with a **published** date before this date.                   | undefined |
| excludeSourceDomain | boolean   | If true, excludes results from the same domain as the input URL.                              | undefined |
| category            | string    | A data category to focus on when searching, with higher comprehensivity and data cleanliness. | undefined |

### Return Parameters

| Field   | Type      | Description            |
| ------- | --------- | ---------------------- |
| results | Result\[] | List of Result objects |

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | string         | URL of the search result      |
| id    | string         | Temporary ID for the document |
| title | string \| null | Title of the search result    |

\| publishedDate? | string         | Estimated creation date                       |
\| author?        | string         | Author of the content, if available           |

## `findSimilarAndContents` Method

Find a list of similar results based on a webpage's URL, optionally including the text content or highlights of each result.

| Parameter           | Type                                                                             | Description                                                                                   | Default   |
| ------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------- |
| url                 | string                                                                           | The URL of the webpage to find similar results for.                                           | Required  |
| text                | boolean \| \{ maxCharacters?: number, includeHtmlTags?: boolean }                | If provided, includes the full text of the content in the results.                            | undefined |
| highlights          | boolean \| \{ query?: string, numSentences?: number, highlightsPerUrl?: number } | If provided, includes highlights of the content in the results.                               | undefined |
| numResults          | number                                                                           | Number of similar results to return.                                                          | undefined |
| includeDomains      | string\[]                                                                        | List of domains to include in the search.                                                     | undefined |
| excludeDomains      | string\[]                                                                        | List of domains to exclude from the search.                                                   | undefined |
| startCrawlDate      | string                                                                           | Results will only include links **crawled** after this date.                                  | undefined |
| endCrawlDate        | string                                                                           | Results will only include links **crawled** before this date.                                 | undefined |
| startPublishedDate  | string                                                                           | Results will only include links with a **published** date after this date.                    | undefined |
| endPublishedDate    | string                                                                           | Results will only include links with a **published** date before this date.                   | undefined |
| excludeSourceDomain | boolean                                                                          | If true, excludes results from the same domain as the input URL.                              | undefined |
| category            | string                                                                           | A data category to focus on when searching, with higher comprehensivity and data cleanliness. | undefined |

### Return Parameters

| Field   | Type                | Description                  |
| ------- | ------------------- | ---------------------------- |
| results | SearchResult\<T>\[] | List of SearchResult objects |

Extends the `Result` object with additional fields based on the requested content:

| Field | Type     | Description                   |                            |
| ----- | -------- | ----------------------------- | -------------------------- |
| url   | string   | URL of the search result      |                            |
| id    | string   | Temporary ID for the document |                            |
| title | \`string | null\`                        | Title of the search result |

\| publishedDate?   | string     | Estimated creation date                        |                            |
\| author?          | string     | Author of the content, if available            |                            |
\| text?            | string     | Text of the search result page (if requested)  |                            |
\| highlights?      | string\[] | Highlights of the search result (if requested) |                            |
\| highlightScores? | number\[] | Scores of the highlights (if requested)        |

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `findSimilarAndContents` call.

## `getContents` Method

Retrieves contents of documents based on a list of document IDs.

| Parameter  | Type                                                                             | Description                                                        | Default   |
| ---------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| ids        | string \| string\[] \| SearchResult\[]\`                                         | A single ID, an array of IDs, or an array of SearchResults.        | Required  |
| text       | boolean \| \{ maxCharacters?: number, includeHtmlTags?: boolean }                | If provided, includes the full text of the content in the results. | undefined |
| highlights | boolean \| \{ query?: string, numSentences?: number, highlightsPerUrl?: number } | If provided, includes highlights of the content in the results.    | undefined |

### Return Parameters

| Field   | Type                | Description                  |
| ------- | ------------------- | ---------------------------- |
| results | SearchResult\<T>\[] | List of SearchResult objects |

The fields in the `SearchResult<T>` object depend on the options provided in the `getContents` call:

| Field            | Type      | Description                                    |                            |
| ---------------- | --------- | ---------------------------------------------- | -------------------------- |
| id               | string    | Temporary ID for the document                  |                            |
| url              | string    | URL of the search result                       |                            |
| title            | \`string  | null\`                                         | Title of the search result |
| publishedDate?   | string    | Estimated creation date                        |                            |
| author?          | string    | Author of the content, if available            |                            |
| text?            | string    | Text of the search result page (if requested)  |                            |
| highlights?      | string\[] | Highlights of the search result (if requested) |                            |
| highlightScores? | number\[] | Scores of the highlights (if requested)        |                            |

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `getContents` call. If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

Generate an answer to a query using Exa's search and LLM capabilities. This returns an AnswerResponse object with the answer text and citations used. You may optionally retrieve the full text of each source by setting `text: true`.

| Parameter | Type              | Description                                                        | Default  |
| --------- | ----------------- | ------------------------------------------------------------------ | -------- |
| query     | string            | The question or query to answer.                                   | Required |
| options   | \{text?: boolean} | If text is true, each source in the result includes its full text. | {}       |

### Return Parameters

#### `AnswerResponse`

| Field      | Type                   | Description                               |
| ---------- | ---------------------- | ----------------------------------------- |
| answer     | string                 | The generated answer text                 |
| citations  | SearchResult\<\{ }>\[] | The citations used to generate the answer |
| requestId? | string                 | Optional request ID for reference         |

Each citation is a `SearchResult<{}>` — a basic result object that can include text if options.text was set to true.

## `streamAnswer` Method

Generate a streaming answer to a query with Exa's LLM capabilities. This returns an async generator yielding chunks of text and/or citations as they become available.

| Parameter | Type                | Description                                                  | Default  |
| --------- | ------------------- | ------------------------------------------------------------ | -------- |
| query     | string              | The question to answer.                                      | Required |
| options   | \{ text?: boolean } | If text is true, each citation chunk includes its full text. | {}       |

An async generator of objects with the type:

* `content` is the partial text content of the answer so far (streamed in chunks).
* `citations` is an array of citation objects that appear at this chunk in the response.

You can end iteration by using a break or by letting the loop finish naturally.

## `research.create` Method

Create an asynchronous research task that performs multi-step web research and returns structured JSON results with citations.

| Parameter    | Type          | Description                                                                                       | Default       |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| instructions | string        | Natural language instructions describing what the research task should accomplish.                | Required      |
| model        | ResearchModel | The research model to use. Options: ResearchModel.exa\_research, ResearchModel.exa\_research\_pro | exa\_research |
| outputSchema | object        | Optional JSON schema for structured output. If not provided, schema will be inferred.             | undefined     |

| Field      | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| researchId | string | The unique identifier for the task |

## `research.get` Method

Get the current status and results of a research task by its ID.

| Parameter  | Type   | Description                       | Default  |
| ---------- | ------ | --------------------------------- | -------- |
| researchId | string | The unique identifier of the task | Required |

| Field        | Type                                    | Description                                      |
| ------------ | --------------------------------------- | ------------------------------------------------ |
| researchId   | string                                  | The unique identifier for the task               |
| status       | string                                  | Task status: "running", "completed", or "failed" |
| instructions | string                                  | The original instructions provided               |
| schema       | object (optional)                       | The JSON schema specification used               |
| data         | object (optional)                       | The research results (when completed)            |
| citations    | Record\<string, Citation\[]> (optional) | Citations grouped by root field (when completed) |

## `research.pollUntilFinished` Method

Poll a research task until it completes or fails, returning the final result.

| Parameter  | Type   | Description                       | Default  |
| ---------- | ------ | --------------------------------- | -------- |
| researchId | string | The unique identifier of the task | Required |

Note: The pollUntilFinished method automatically polls every 1 second with a timeout of 10 minutes.

Returns a `ResearchTask` object with the completed task data (same structure as `getTask`).

## `research.list` Method

List all research tasks with optional pagination.

| Parameter | Type   | Description                             | Default   |
| --------- | ------ | --------------------------------------- | --------- |
| cursor    | string | Pagination cursor from previous request | undefined |
| limit     | number | Number of results to return (1-200)     | 25        |

| Field      | Type              | Description                                   |
| ---------- | ----------------- | --------------------------------------------- |
| data       | ResearchTask\[]   | List of research task objects                 |
| hasMore    | boolean           | Whether there are more results to paginate    |
| nextCursor | string (optional) | Cursor for the next page (if hasMore is true) |

**Examples:**

Example 1 (unknown):
```unknown
</Tab>

  <Tab title="pnpm">
```

Example 2 (unknown):
```unknown
</Tab>
</Tabs>

and then instantiate an Exa client
```

Example 3 (unknown):
```unknown
<Card title="Get API Key" icon="key" horizontal href="https://dashboard.exa.ai/login?redirect=/docs?path=/reference/typescript-sdk-specification">
  Follow this link to get your API key
</Card>

<br />

***

## `search` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links.

<br />

### Input Example
```

Example 4 (unknown):
```unknown
<br />

### Input Parameters

| Parameter          | Type      | Description                                                                                                                                                                                                                                                | Default   |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| query              | string    | The input query string.                                                                                                                                                                                                                                    | Required  |
| numResults         | number    | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                               | 10        |
| includeDomains     | string\[] | List of domains to include in the search.                                                                                                                                                                                                                  | undefined |
| excludeDomains     | string\[] | List of domains to exclude in the search.                                                                                                                                                                                                                  | undefined |
| startCrawlDate     | string    | Results will only include links **crawled** after this date.                                                                                                                                                                                               | undefined |
| endCrawlDate       | string    | Results will only include links **crawled** before this date.                                                                                                                                                                                              | undefined |
| startPublishedDate | string    | Results will only include links with a **published** date after this date.                                                                                                                                                                                 | undefined |
| endPublishedDate   | string    | Results will only include links with a **published** date before this date.                                                                                                                                                                                | undefined |
| type               | string    | The type of search, "keyword" or "neural".                                                                                                                                                                                                                 | "auto"    |
| category           | string    | data category to focus on when searching, with higher comprehensivity and data cleanliness. Available categories: "company", "research paper", "news", "linkedin profile", "github", "tweet", "movie", "song", "personal site", "pdf", "financial report". | undefined |
| includeText        | string\[] | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                  | undefined |
| excludeText        | string\[] | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                        | undefined |

<br />

### Returns Example
```

---

## Old approach (no longer recommended)

**URL:** llms-txt#old-approach-(no-longer-recommended)

try:
    result = exa.get_contents(["https://example.com"])
except HTTPError as e:
    print(f"Error: {e.status_code}")

---

## Hallucination Detector

**URL:** llms-txt#hallucination-detector

**Contents:**
- Function breakdown

Source: https://docs.exa.ai/examples/demo-hallucination-detector

A live demo that detects hallucinations in content using Exa's search.

<div>
  <a href="https://demo.exa.ai/hallucination-detector" target="_blank" rel="noopener noreferrer">
    <button class="api-button">
      \> try the app
    </button>
  </a>
</div>

We built a live hallucination detector that uses Exa to verify LLM-generated content. When you input text, the app breaks it into individual claims, searches for evidence to verify each one, and returns relevant sources with a verification confidence score.

A claim is a single, verifiable statement that can be proven true or false - like "The Eiffel Tower is in Paris" or "It was built in 1822."

<Card title="Click here to try it out." href="https://demo.exa.ai/hallucination-detector" img="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=75ac7324f228fb3d0d19f18603998228" data-og-width="1832" width="1832" data-og-height="1170" height="1170" data-path="images/Screenshot 2024-11-19 at 3.19.48 PM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=efd378652d3d4b95bc8ce2eeb30d2c7d 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=c3413cedc97f7d2d99428cbb248782da 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2f854f02938ef3992bbf8a28097d50fa 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=f27814fd501730881b12e9b5f98e7342 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a6fbfa924159fbddfd541a18a8bbd6f5 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/Screenshot%202024-11-19%20at%203.19.48%E2%80%AFPM.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=f57f2087ea2cbb27c371c21117b25703 2500w" />

This document explains the functions behind the three steps of the fact-checker:

1. The LLM extracts verifiable claims from your text
2. Exa searches for relevant sources for each claim
3. The LLM evaluates each claim against its sources, returning whether or not its true, along with a confidence score.

<Info>See the full [step-by-step guide](/examples/identifying-hallucinations-with-exa) and [github repo](https://github.com/exa-labs/exa-hallucination-detector) if you'd like to recreate. </Info>

## Function breakdown

<Steps>
  <Step title="Extracting claims">
    The `extract_claims` function uses an LLM (Anthropic's, in this case) to identify distinct, verifiable statements from your inputted text, returning these claims as a JSON array of strings.

<Warning>For simpilicity, we did not include a try/catch block in the code below. However, if you are building your own hallucination detector, you should include one that catches any errors in the LLM parsing and uses a regex method that treats each sentence (text between capital letter and end punctuation) as a claim.</Warning>

<Step title="Searching for evidence">
    The `exa_search` function uses Exa search to find evidence for each extracted claim. For every claim, it retrieves the 5 most relevant sources, formats them with their URLs and content (`text`), passing them to the next function for verification.

<Step title="Verifying claims">
    The `verify_claim` function checks each claim against the sources from `exa_search`. It uses an LLM to determine if the sources support or refute the claim and returns a decision with a confidence score. If no sources are found, it returns "insufficient information".

Using LLMs to extract claims and verify them against Exa search sources is a simple way to detect hallucinations in content. If you'd like to recreate it, the full documentation for the script is [here](/examples/identifying-hallucinations-with-exa) and the github repo is [here](https://github.com/exa-labs/exa-hallucination-detector).

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Searching for evidence">
    The `exa_search` function uses Exa search to find evidence for each extracted claim. For every claim, it retrieves the 5 most relevant sources, formats them with their URLs and content (`text`), passing them to the next function for verification.
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Verifying claims">
    The `verify_claim` function checks each claim against the sources from `exa_search`. It uses an LLM to determine if the sources support or refute the claim and returns a decision with a confidence score. If no sources are found, it returns "insufficient information".
```

---

## define the function that will process the tool call and perform the exa search

**URL:** llms-txt#define-the-function-that-will-process-the-tool-call-and-perform-the-exa-search

def process_tool_calls(tool_calls, messages):
    
    for tool_call in tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        
        if function_name == "exa_search":
            search_results = exa_search(**function_args)
            messages.append(
                {
                    "role": "tool",
                    "content": str(search_results),
                    "tool_call_id": tool_call.id,
                }
            )
            console.print(
                f"[bold cyan]Context updated[/bold cyan] [i]with[/i] "
                f"[bold green]exa_search ({function_args.get('mode')})[/bold green]: ",
                function_args.get("query"),
            )
            
    return messages

def main():
    messages = [SYSTEM_MESSAGE]
    
    while True:
        try:
            # create the user input prompt using rich
            user_query = Prompt.ask(
                "[bold yellow]What do you want to search for?[/bold yellow]",
            )
            messages.append({"role": "user", "content": user_query})
            
            # call openai llm by creating a completion which calls the defined exa tool
            completion = openai.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=TOOLS,
                tool_choice="auto",
            )
            
            # completion will contain the object needed to invoke your tool and perform the search
            message = completion.choices[0].message
            tool_calls = message.tool_calls
            
            if tool_calls:

messages.append(message)

# process the tool object created by OpenAI llm and store the search results
                messages = process_tool_calls(tool_calls, messages)
                messages.append(
                    {
                        "role": "user",
                        "content": "Answer my previous query based on the search results.",
                    }
                )
                
                # call OpenAI llm again to process the search results and yield the final answer
                completion = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                )
                
                # parse the agents final answer and print it
                console.print(Markdown(completion.choices[0].message.content))
            else:
                console.print(Markdown(message.content))
        except Exception as e:
            console.print(f"[bold red]An error occurred:[/bold red] {str(e)}")
            
            
if __name__ == "__main__":
    main()
```

---

## Rate Limits

**URL:** llms-txt#rate-limits

Source: https://docs.exa.ai/reference/rate-limits

Default rate limits for Exa API endpoints

<Info>
  Need higher rate limits? Contact us at [hello@exa.ai](mailto:hello@exa.ai) to discuss an Enterprise plan.
</Info>

Our API endpoints have default rate limits to ensure reliable performance for all users. Most endpoints are limited by QPS, while the Research API uses concurrent task limits for its long-running operations.

| Endpoint    | Limit               |
| ----------- | ------------------- |
| `/search`   | 5 QPS\*             |
| `/contents` | 50 QPS              |
| `/answer`   | 5 QPS               |
| `/research` | 15 concurrent tasks |

*\*QPS = Queries Per Second*

---

## Create API Key

**URL:** llms-txt#create-api-key

**Contents:**
- Optional Parameters

Source: https://docs.exa.ai/reference/team-management/create-api-key

post /api-keys
Create a new API key for your team with optional name and rate limit configuration.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The Create API Key endpoint allows you to programmatically generate new API keys for your team using your service API key.

## Optional Parameters

* **name**: A descriptive name for the API key to help identify its purpose
* **rateLimit**: Maximum number of requests per minute allowed for this API key

---

## Parameters for our Highlights search

**URL:** llms-txt#parameters-for-our-highlights-search

highlights_options  = {
    "num_sentences": 7, # how long our highlights should be
    "highlights_per_url": 1, # just get the best highlight for each URL
}

---

## Create a Webset

**URL:** llms-txt#create-a-webset

Source: https://docs.exa.ai/websets/api/websets/create-a-webset

post /v0/websets
Creates a new Webset with optional search, import, and enrichment configurations. The Webset will automatically begin processing once created.

You can specify an `externalId` to reference the Webset with your own identifiers for easier integration.

---

## Set up progress bar

**URL:** llms-txt#set-up-progress-bar

**Contents:**
- Finding more candidates

from tqdm.auto import tqdm
tqdm.pandas()

def enrich_row(row):
    row['School'] = extract_school_from_email(row['Email'])
    linkedIn_info = get_linkedin_from_name(row['Name'], row['School'])
    if linkedIn_info:
        row['LinkedIn'] = linkedIn_info
    website_url, website_info = exa_search_personal_website(row['Name'], row['School'])
    row['ExaWebsite'] = website_url
    row['ContentInfo'] = website_info
    row['Undergrad'] = extract_undergrad_from_contents(row['ContentInfo'])
    row['Role'] = extract_current_role_from_contents(row['ContentInfo'])
    row['ResearchTopics'] = extract_research_topics_from_contents(row['ContentInfo'])
    row['AI'] = extract_is_ai_from_contents(row['ContentInfo'])
    row['Score'] = calculate_score(row['ContentInfo'], row['Undergrad'], row['Role'], row['ResearchTopics'], row['AI'])
    return row

enriched_df = students_df.progress_apply(enrich_row, axis=1)
sorted_df = enriched_df.sort_values(by='Score', ascending=False).reset_index(drop=True)
sorted_df
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
## Finding more candidates

Now that we know how to research candidates, let's find some more! We'll take each of the top candidates (score 7-10), and use Exa to find similar profiles.

Exa's `find_similar`,allows us to search a URL and find semantically similar URLs. For example, I could search 'hinge.co' and it'll return the homepages of similar dating apps. In this case, we'll pass in the homepages of our top candidates to find similar profiles.
```

---

## Exa MCP

**URL:** llms-txt#exa-mcp

**Contents:**
  - `exa-code`: fast and efficient web context for coding agents
- Remote Exa MCP
  - Claude Desktop Configuration for Remote MCP
  - Cursor and Claude Code Configuration for Remote MCP
- Available Tools
- Usage Examples
  - Code Search Examples
  - Other Search Examples
- Local Installation
  - Prerequisites

Source: https://docs.exa.ai/reference/exa-mcp

### `exa-code`: fast and efficient web context for coding agents

Vibe coding should never have a bad vibe. `exa-code` is a huge step towards coding agents that never hallucinate.

When your coding agent makes a search query, `exa-code` searches over billions of GitHub repos, docs pages, StackOverflow posts, and more to find the perfect, token-efficient context that the agent needs to code correctly. It's powered by the Exa search engine.

Examples of queries you can make with `exa-code`:

* use Exa search in python and make sure content is always livecrawled
* use correct syntax for vercel ai sdk to call gpt-5 nano asking it how are you

**Works with Cursor and Claude Code!** Use the HTTP-based configuration format:

Installing Exa MCP like below will install Exa web search as well as `exa-code`. To maximize performance, be sure to leave *only* `exa-code` turned on in your MCP client.

You can also use `exa-code` through [Smithery](https://smithery.ai/server/exa) without an Exa API key.

Exa MCP Server enables AI assistants like Claude to perform real-time web searches through the Exa Search API, allowing them to access up-to-date information from the internet. It is open-source, check out [GitHub](https://github.com/exa-labs/exa-mcp-server/).

Connect directly to Exa's hosted MCP server using this URL:

### Claude Desktop Configuration for Remote MCP

Add this to your Claude Desktop configuration file:

### Cursor and Claude Code Configuration for Remote MCP

For Cursor and Claude Code, use this HTTP-based configuration format:

Exa MCP includes several specialized search tools:

| Tool                       | Description                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`get_code_context_exa`** | **NEW!** Search and get relevant code snippets, examples, and documentation from open source libraries, GitHub repositories, and programming frameworks. Perfect for finding up-to-date code documentation, implementation examples, API usage patterns, and best practices from real codebases |
| `web_search_exa`           | Performs real-time web searches with optimized results and content extraction                                                                                                                                                                                                                   |
| `deep_researcher_start`    | Start a smart AI researcher for complex questions. The AI will search the web, read many sources, and think deeply about your question to create a detailed research report                                                                                                                     |
| `deep_researcher_check`    | Check if your research is ready and get the results. Use this after starting a research task to see if it's done and get your comprehensive report                                                                                                                                              |
| `company_research`         | Comprehensive company research tool that crawls company websites to gather detailed information about businesses                                                                                                                                                                                |
| `crawling`                 | Extracts content from specific URLs, useful for reading articles, PDFs, or any web page when you have the exact URL                                                                                                                                                                             |
| `linkedin_search`          | Search LinkedIn for companies and people using Exa AI. Simply include company names, person names, or specific LinkedIn URLs in your query                                                                                                                                                      |

Once configured, you can ask Claude to perform searches:

### Code Search Examples

* "Show me how to use React hooks with TypeScript"
* "Find examples of how to implement authentication with NextJS"
* "Get documentation and examples for the pandas library"

### Other Search Examples

* "Research the company exa.ai and find information about their pricing"
* "Start a deep research project on the impact of artificial intelligence on healthcare, then check when it's complete to get a comprehensive report"

## Local Installation

* [Node.js](https://nodejs.org/) v18 or higher.
* [Claude Desktop](https://claude.ai/download) installed (optional). Exa MCP also works with other MCP-compatible clients like Cursor, Windsurf, and more).
* An Exa API key (see above).

### Using Claude Code

The quickest way to set up Exa MCP is using Claude Code:

Replace `YOUR_API_KEY` with your Exa API key from above.

The simplest way to install and run Exa MCP is via NPX:

```bash  theme={null}

**Examples:**

Example 1 (unknown):
```unknown
Installing Exa MCP like below will install Exa web search as well as `exa-code`. To maximize performance, be sure to leave *only* `exa-code` turned on in your MCP client.

You can also use `exa-code` through [Smithery](https://smithery.ai/server/exa) without an Exa API key.

***

Exa MCP Server enables AI assistants like Claude to perform real-time web searches through the Exa Search API, allowing them to access up-to-date information from the internet. It is open-source, check out [GitHub](https://github.com/exa-labs/exa-mcp-server/).

## Remote Exa MCP

Connect directly to Exa's hosted MCP server using this URL:
```

Example 2 (unknown):
```unknown
### Claude Desktop Configuration for Remote MCP

Add this to your Claude Desktop configuration file:
```

Example 3 (unknown):
```unknown
### Cursor and Claude Code Configuration for Remote MCP

For Cursor and Claude Code, use this HTTP-based configuration format:
```

Example 4 (unknown):
```unknown
## Available Tools

Exa MCP includes several specialized search tools:

| Tool                       | Description                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`get_code_context_exa`** | **NEW!** Search and get relevant code snippets, examples, and documentation from open source libraries, GitHub repositories, and programming frameworks. Perfect for finding up-to-date code documentation, implementation examples, API usage patterns, and best practices from real codebases |
| `web_search_exa`           | Performs real-time web searches with optimized results and content extraction                                                                                                                                                                                                                   |
| `deep_researcher_start`    | Start a smart AI researcher for complex questions. The AI will search the web, read many sources, and think deeply about your question to create a detailed research report                                                                                                                     |
| `deep_researcher_check`    | Check if your research is ready and get the results. Use this after starting a research task to see if it's done and get your comprehensive report                                                                                                                                              |
| `company_research`         | Comprehensive company research tool that crawls company websites to gather detailed information about businesses                                                                                                                                                                                |
| `crawling`                 | Extracts content from specific URLs, useful for reading articles, PDFs, or any web page when you have the exact URL                                                                                                                                                                             |
| `linkedin_search`          | Search LinkedIn for companies and people using Exa AI. Simply include company names, person names, or specific LinkedIn URLs in your query                                                                                                                                                      |

## Usage Examples

Once configured, you can ask Claude to perform searches:

### Code Search Examples

* "Show me how to use React hooks with TypeScript"
* "Find examples of how to implement authentication with NextJS"
* "Get documentation and examples for the pandas library"

### Other Search Examples

* "Research the company exa.ai and find information about their pricing"
* "Start a deep research project on the impact of artificial intelligence on healthcare, then check when it's complete to get a comprehensive report"

## Local Installation

### Prerequisites

* [Node.js](https://nodejs.org/) v18 or higher.
* [Claude Desktop](https://claude.ai/download) installed (optional). Exa MCP also works with other MCP-compatible clients like Cursor, Windsurf, and more).
* An Exa API key (see above).

### Using Claude Code

The quickest way to set up Exa MCP is using Claude Code:
```

---

## Exa Research

**URL:** llms-txt#exa-research

**Contents:**
- How It Works
- Best Practices
- Models
- Pricing
- Examples
  - Competitive Landscape Table
  - Market Size Estimate
  - Timeline of Key Events
- FAQs

Source: https://docs.exa.ai/reference/exa-research

Automate in-depth web research with structured output support.

The Research API is an **asynchronous, multi-step pipeline** that transforms open-ended questions into grounded reports. You provide natural-language instructions (e.g. *"Compare the hardware roadmaps of the top GPU manufacturers"*) and an optional JSON Schema describing the output you want.

Under the hood, Exa agents perform multiple steps:

1. **Planning** – Your natural-language `instructions` are parsed by an LLM that decomposes the task into one or more research steps.

2. **Searching** – Specialized search agents issue semantic and keyword queries to Exa's search engine, continuously expanding and refining the result set until they can fulfil the request.

3. **Reasoning & synthesis** – Reasoning models combine facts across sources and return structured JSON (if you provide `outputSchema`) or a detailed markdown report.

Because tasks are **asynchronous**, you submit a request and immediately receive a `researchId`. You can [poll the request](/reference/research/get-a-task) until it is complete or failed, or [list all tasks](/reference/research/list-tasks) to monitor progress in bulk.

* **Be explicit** – Clear, scoped instructions lead to faster tasks and higher-quality answers. You should describe (1) what information you want (2) how the agent should find that information and (3) how the agent should compose it's final report.
* **Keep schemas small** – 1-5 root fields is the sweet spot. If you need more, create multiple tasks.
* **Use enums** – Tight schema constraints improve accuracy and reduce hallucinations.

The Research API offers two advanced agentic researcher models that break down your instructions, search the web, extract and reason over facts, and return structured answers with citations.

* **exa-research** (default) adapts to the difficulty of the task, using more or less compute for individual steps. Recommended for most use cases.
* **exa-research-pro** maximizes quality by using the highest reasoning capability for every step. Recommended for the most complex, multi-step research tasks.

Here are typical completion times for each model:

| Model            | p50 (seconds) | p90 (seconds) |
| ---------------- | ------------- | ------------- |
| exa-research     | 45            | 90            |
| exa-research-pro | 90            | 180           |

The Research API now uses **variable usage-based pricing**. You are billed based on how much work and reasoning the research agent does.

<Note>You are ONLY charged for tasks that complete successfully.</Note>

| Operation            | exa-research      | exa-research-pro   | Notes                                                |
| -------------------- | ----------------- | ------------------ | ---------------------------------------------------- |
| **Search**           | \$5/1k searches   | \$5/1k searches    | Each unique search query issued by the agent         |
| **Page read**        | \$5/1k pages read | \$10/1k pages read | One "page" = 1,000 tokens from the web               |
| **Reasoning tokens** | \$5/1M tokens     | \$5/1M tokens      | Specific LLM tokens used for reasoning and synthesis |

**Example:**\
A research task with `exa-research` that performs 6 searches, reads 20 pages of content, and uses 1,000 reasoning tokens would cost:

$$
\begin{array}{rl}
& \$0.03 \text{ (6 searches × \$5/1000)} \\
+ & \$0.10 \text{ (20 pages × \$5/1000)} \\
+ & \$0.005 \text{ (1{,}000 reasoning tokens × \$5/1{,}000{,}000)} \\
\hline
& \$0.135
\end{array}
$$

For `exa-research-pro`, the same task would cost:

$$
\begin{array}{rl}
& \$0.03 \text{ (6 searches × \$5/1000)} \\
+ & \$0.20 \text{ (20 pages × \$10/1000)} \\
+ & \$0.005 \text{ (1{,}000 reasoning tokens × \$5/1{,}000{,}000)} \\
\hline
& \$0.235
\end{array}
$$

### Competitive Landscape Table

Compare the current flagship GPUs from NVIDIA, AMD, and Intel and extract pricing, TDP, and release date.

### Market Size Estimate

Estimate the total global market size (USD) for battery recycling in 2030 with a clear methodology.

### Timeline of Key Events

Build a timeline of major OpenAI product releases from 2015 – 2023.

<AccordionGroup>
  <Accordion title="Who is the Research API for?">
    Product teams, analysts, researchers, and anyone who needs **structured answers** that require reading multiple web sources — without having to build their own search + scraping + LLM pipeline.
  </Accordion>

<Accordion title="How is this different from the /answer endpoint?">
    `/answer` is designed for **single-shot Q\&A**. The Research API handles
    **long-running, multi-step investigations**. It's suitable for tasks that
    require complex reasoning over web data.
  </Accordion>

<Accordion title="How long do tasks take?">
    Tasks generally complete in 20–40 seconds. Simple tasks that can be solved
    with few searches complete faster, while complex schema's targeting niche
    subjects may take longer.
  </Accordion>

<Accordion title="What are best practices for writing instructions?">
    Be explicit about the objective and any constraints - Specify the **time
    range** or **types of sources** to consult if important - Use imperative verbs
    ("Compare", "List", "Summarize") - Keep it under 4096 characters
  </Accordion>

<Accordion title="How large can my output schema be?">
    You must have ≤ 8 root fields. It must not be more than 5 fields deep.
  </Accordion>

<Accordion title="What happens if my schema validation fails?">
    If your schema is not valid, an error will surface *before the task is
    created* with a message about what is invalid. You will not be charged for
    such requests.
  </Accordion>
</AccordionGroup>

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

Example 3 (unknown):
```unknown
</CodeGroup>

### Market Size Estimate

Estimate the total global market size (USD) for battery recycling in 2030 with a clear methodology.

<CodeGroup>
```

Example 4 (unknown):
```unknown

```

---

## Create a Search

**URL:** llms-txt#create-a-search

Source: https://docs.exa.ai/websets/api/websets/searches/create-a-search

post /v0/websets/{webset}/searches
Creates a new Search for the Webset.

The default behavior is to reuse the previous Search results and evaluate them against the new criteria.

---

## Update API Key

**URL:** llms-txt#update-api-key

**Contents:**
- Overview
- Path Parameters
- Optional Parameters

Source: https://docs.exa.ai/reference/team-management/update-api-key

put /api-keys/{id}
Update the name and rate limit of an existing API key.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The Update API Key endpoint allows you to modify an existing API key

* **id**: The unique identifier of the API key to update (UUID format)

## Optional Parameters

* **name**: New descriptive name for the API key
* **rateLimit**: New rate limit in requests per minute

---

## OpenAPI Specification

**URL:** llms-txt#openapi-specification

Source: https://docs.exa.ai/reference/openapi-spec

You can view up-to-date versions of our OpenAPI specs here:

* [Search API Spec](https://raw.githubusercontent.com/exa-labs/openapi-spec/refs/heads/master/exa-openapi-spec.yaml)
* [Websets API Spec](https://raw.githubusercontent.com/exa-labs/openapi-spec/refs/heads/master/exa-websets-spec.yaml)

---

## Printing the information using f-string formatting

**URL:** llms-txt#printing-the-information-using-f-string-formatting

**Contents:**
- Candidate Evaluation

print(f"Personal Site: {personal_website_url}")
print(f"Undergrad: {undergrad}")
print(f"Current: {current}")
print(f"Topics: {topics}")
print(f"AI: {ai}")
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
## Candidate Evaluation

Next, we use GPT-4 to score candidates 1-10 based on fit. This way, we can use Exa to find more folks similar to our top-rated candidates.
```

---

## Recruiting Agent

**URL:** llms-txt#recruiting-agent

**Contents:**
- What this doc covers
- Introduction

Source: https://docs.exa.ai/examples/exa-recruiting-agent

## What this doc covers

1. Using Exa search with includeDomain to only retrieve search results from a specified domain
2. Using Exa keyword search to find specific people by name
3. Using excludeDomain to ignore certain low-signal domains
4. Using Exa link similarity search to find similar websites

In this tutorial, we use Exa to **automate** the process of **discovering**, **researching**, and **evaluating** exceptional candidates. If you just want to see the code, check out the [Colab notebook](https://colab.research.google.com/drive/1a-7niLbCtIEjZnPz-qXPS3XwckPgIMrV?usp=sharing).

Here's what we're going to do:

1. Candidate research: Identify potential candidates and use Exa to find additional details, such as personal websites, LinkedIn profiles, and their research topics.
2. Candidate evaluation: Evaluate candidates using an LLM to score their fit to our hiring criteria.
3. Finding more candidates: Discover more candidates similar to our top picks.

This project requires an [Exa API key](https://dashboard.exa.ai/api-keys) and an [OpenAI API key](https://platform.openai.com/api-keys). Get 1000 Exa searches per month free just for [signing up](https://dashboard.exa.ai/overview)!

```Python Python theme={null}

---

## Semantic Whitelisting

**URL:** llms-txt#semantic-whitelisting

We want our feeds to contain high-quality links and avoid SEO spam. This would normally require manually maintaining lists of domains to include/exclude from your results, but with Websets it's simple.

You can create criteria that function as a *semantic whitelist*, telling the LLM what kinds of articles to allow. Here's an example:

You can see all of the criteria used in the demo [here](https://github.com/exa-labs/websets-news-monitor/blob/main/scripts/setup-websets.js).

**Examples:**

Example 1 (unknown):
```unknown
Article published in a top 20 tech publication (TechCrunch, The Verge, Wired, etc.)
```

---

## Anthropic Tool Calling

**URL:** llms-txt#anthropic-tool-calling

**Contents:**
- Get Started

Source: https://docs.exa.ai/reference/anthropic-tool-calling

Using Claude's Tool Use Feature with Exa Search Integration.

This guide will show you how to properly set up and use Anthropic's and Exa's API client, and utilise Claude's function calling or tool use feature to perform Exa search integration. Here are the steps:

1. Install the prerequisite packages and set up API keys as environment variables
2. Understand how Claude's tool use feature works
3. Use Exa within the tool use feature

<Steps>
  <Step title="Prerequisites and installation">
    Before you can use this guide you will need to have [python3](https://www.python.org/doc/) and [pip](https://pip.pypa.io/en/stable/installation/) installed on your machine.

For the purpose of this guide we will need to install:

* `anthropic` library to perform Claude API calls and completions
    * `exa_py` library to perform Exa search
    * `rich` library to make the output more readable

Install the libraries.

To successfully use the Exa search client and Anthropic client you will need to have your `ANTHROPIC_API_KEY` and `EXA_API_KEY`\
    set as environment variables.

To get an Anthropic API key, you will first need an Anthropic account, visit the [Anthropic console](https://console.anthropic.com/settings/keys) to generate your API key.

Similarly, to get the Exa API key, you will first need an Exa account, visit the Exa dashboard to generate your API key.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

> Be safe with your API keys. Make sure they are not hardcoded in your code or added to a git repository to prevent leaking them to the public.

You can create an `.env` file in the root of your project and add the following to it:

Make sure to add your `.env` file to your `.gitignore` file if you have one.
  </Step>

<Step title="Understanding Claude's Tool Use Feature">
    Claude LLMs can call a function you have defined in your code; this is called [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use). To do this, you first need to describe the function you want to call to Claude's LLM. You can do this by defining a description object of the format:

When this description is sent to Claude's LLM, it returns an object with a string, which is the function name defined in *your* code, and the arguments that the function takes. This does not execute or *call* functions on Anthropic's side; it only returns the function name and arguments which you will have to parse and call yourself in your code.

We will use the object of this format to call the `exa_search` function we define.
  </Step>

<Step title="Use Exa Search as Claude tool">
    First, we import and initialise the Anthropic and Exa libraries and load the stored API keys.

Next, we define the function and the function schema so that Claude knows how to use it and what arguments our local function takes:

Finally, we'll define the primer `SYSTEM_MESSAGE`, which explains to Claude what it is supposed to do:

We can now start writing the code needed to perform the LLM calls and the search. We'll create the `exa_search` function that will call Exa's `search_and_contents` function with the query:

Next, we create a function to process the tool use:

Lastly, we'll create a `main` function to bring it all together, and handle the user input and interaction with Claude:

The implementation creates a loop that continually prompts the user for search queries, uses Claude's tool use feature to determine when to perform a search, and then uses the Exa search results to provide an informed response to the user's query.

We also use the rich library to provide a more visually appealing console interface, including coloured output and markdown rendering for the responses.
  </Step>

<Step title="Full code">

We have now written an advanced search tool that combines the power of Claude's language models with Exa's semantic search capabilities, providing users with informative and context-aware responses to their queries.
  </Step>

<Step title="Running the code">
    Save the code in a file, e.g. `claude_search.py`, and make sure the `.env` file containing the API keys we previously created is in the same directory as the script.

Then run the script using the following command from your terminal:

You should see a prompt:

That's it, enjoy your search agent!
  </Step>
</Steps>

**Examples:**

Example 1 (unknown):
```unknown
To successfully use the Exa search client and Anthropic client you will need to have your `ANTHROPIC_API_KEY` and `EXA_API_KEY`\
    set as environment variables.

    To get an Anthropic API key, you will first need an Anthropic account, visit the [Anthropic console](https://console.anthropic.com/settings/keys) to generate your API key.

    Similarly, to get the Exa API key, you will first need an Exa account, visit the Exa dashboard to generate your API key.

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

    > Be safe with your API keys. Make sure they are not hardcoded in your code or added to a git repository to prevent leaking them to the public.

    You can create an `.env` file in the root of your project and add the following to it:
```

Example 2 (unknown):
```unknown
Make sure to add your `.env` file to your `.gitignore` file if you have one.
  </Step>

  <Step title="Understanding Claude's Tool Use Feature">
    Claude LLMs can call a function you have defined in your code; this is called [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use). To do this, you first need to describe the function you want to call to Claude's LLM. You can do this by defining a description object of the format:
```

Example 3 (unknown):
```unknown
When this description is sent to Claude's LLM, it returns an object with a string, which is the function name defined in *your* code, and the arguments that the function takes. This does not execute or *call* functions on Anthropic's side; it only returns the function name and arguments which you will have to parse and call yourself in your code.
```

Example 4 (unknown):
```unknown
We will use the object of this format to call the `exa_search` function we define.
  </Step>

  <Step title="Use Exa Search as Claude tool">
    First, we import and initialise the Anthropic and Exa libraries and load the stored API keys.
```

---

## create the openai client

**URL:** llms-txt#create-the-openai-client

openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

---

## Update an Enrichment

**URL:** llms-txt#update-an-enrichment

Source: https://docs.exa.ai/websets/api/websets/enrichments/update-an-enrichment

patch /v0/websets/{webset}/enrichments/{id}
Update an Enrichment configuration for a Webset.

---

## Enable code search and web search together

**URL:** llms-txt#enable-code-search-and-web-search-together

npx exa-mcp-server --tools=get_code_context_exa,web_search_exa

---

## Get a Webhook

**URL:** llms-txt#get-a-webhook

Source: https://docs.exa.ai/websets/api/webhooks/get-a-webhook

get /v0/webhooks/{id}
Get information about a webhook using its ID.
The webhook secret is not shown here for security - you only get it when you first create the webhook.

---

## After - more resilient with cache fallback

**URL:** llms-txt#after---more-resilient-with-cache-fallback

result = exa.get_contents(urls, livecrawl="preferred")
```

This change maintains your preference for fresh content while improving reliability.

---

## To use the researcher on the examples, simply call the run_examples() function:

**URL:** llms-txt#to-use-the-researcher-on-the-examples,-simply-call-the-run_examples()-function:

if __name__ == "__main__":
    run_examples()

---

## LangChain

**URL:** llms-txt#langchain

**Contents:**
- Get Started

Source: https://docs.exa.ai/reference/langchain

How to use Exa's integration with LangChain to perform RAG.

LangChain is a framework for building applications that combine LLMs with data, APIs and other tools. In this guide, we'll go over how to use Exa's LangChain integration to perform RAG with the following steps:

1. Set up Exa's LangChain integration and use Exa to retrieve relevant content
2. Connect this content to a toolchain that uses OpenAI's LLM for generation

<Info> See a YouTube tutorial of a very similar setup by the LangChain team [here](https://www.youtube.com/watch?v=dA1cHGACXCo). </Info>

<Info> See the full reference from LangChain [here](https://python.langchain.com/docs/integrations/providers/exa%5Fsearch/). </Info>

<Steps>
  <Step title="Pre-requisites and installation">
    Install the core OpenAI and Exa LangChain libraries

<Note> Ensure API keys are initialized properly. For LangChain libraries, the environment variable names are `OPENAI_API_KEY` and `EXA_API_KEY` for OpenAI and Exa keys respectively. </Note>

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

<Step title="Use Exa Search to power a LangChain Tool">
    Set up a Retriever tool using `ExaSearchRetriever`. This is a retriever that connects to Exa Search to find relevant documents via semantic search. First import the relevant libraries and instantiate the ExaSearchRetriever.

<Step title="Create a prompt template (optional)">
    We use a LangChain [PromptTemplate](https://python.langchain.com/v0.1/docs/modules/model%5Fio/prompts/quick%5Fstart/#prompttemplate) to define a template of placeholder to parse out URLs and Highlights from the Exa retriever.

<Step title="Parse the URL and content from Exa results">
    We use a [Runnable Lambda](https://api.python.langchain.com/en/latest/runnables/langchain%5Fcore.runnables.base.RunnableLambda.html) to parse out the URL and Highlights attributes from the Exa Search results then pass this to the prompt template above

<Step title="Join Exa results and content for retrieval">
    Complete the retrieval chain by stitching together the Exa retriever, the parser and a short lambda function - this is crucial for passing the result as a single string as context for the LLM in the next step.

<Step title="Set up the rest of the toolchain including OpenAI for generation">
    In this step, we define the system prompt with Query and Context template inputs to be grabbed from the user and Exa Search respectively. First, once again import the relevant libraries and components from LangChains libraries

Then we define a generation prompt - the prompt template that is used with context from Exa to perform RAG.

We set the generation [LLM to OpenAI](https://python.langchain.com/v0.1/docs/integrations/chat/openai/), then connect everything with a [RunnableParallel](https://python.langchain.com/v0.1/docs/expression%5Flanguage/primitives/parallel/) parallel connection. The generation prompt, containing the query and context, is then passed to the LLM and [parsed for better output representation](https://api.python.langchain.com/en/latest/output%5Fparsers/langchain%5Fcore.output%5Fparsers.string.StrOutputParser.html).

<Step title="Running the full RAG toolchain">
    Let's [invoke](https://python.langchain.com/v0.1/docs/expression%5Flanguage/interface/#invoke) the chain:

And have a look at the output (newlines parsed):

<Step title="Optionally, stream the output of the chain">
    Optionally, you may

Outputs, in a stream - [click here](https://python.langchain.com/v0.1/docs/expression%5Flanguage/streaming/) to learn more about the .stream method and other options, including handling of chunks and how to think about further parsing outputs:

As you can see, the output generation is enriched with the context of our Exa Search query result!
  </Step>
</Steps>

**Examples:**

Example 1 (unknown):
```unknown
<Note> Ensure API keys are initialized properly. For LangChain libraries, the environment variable names are `OPENAI_API_KEY` and `EXA_API_KEY` for OpenAI and Exa keys respectively. </Note>

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

  <Step title="Use Exa Search to power a LangChain Tool">
    Set up a Retriever tool using `ExaSearchRetriever`. This is a retriever that connects to Exa Search to find relevant documents via semantic search. First import the relevant libraries and instantiate the ExaSearchRetriever.
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Create a prompt template (optional)">
    We use a LangChain [PromptTemplate](https://python.langchain.com/v0.1/docs/modules/model%5Fio/prompts/quick%5Fstart/#prompttemplate) to define a template of placeholder to parse out URLs and Highlights from the Exa retriever.
```

Example 3 (unknown):
```unknown
</Step>

  <Step title="Parse the URL and content from Exa results">
    We use a [Runnable Lambda](https://api.python.langchain.com/en/latest/runnables/langchain%5Fcore.runnables.base.RunnableLambda.html) to parse out the URL and Highlights attributes from the Exa Search results then pass this to the prompt template above
```

Example 4 (unknown):
```unknown
</Step>

  <Step title="Join Exa results and content for retrieval">
    Complete the retrieval chain by stitching together the Exa retriever, the parser and a short lambda function - this is crucial for passing the result as a single string as context for the LLM in the next step.
```

---

## OpenRouter

**URL:** llms-txt#openrouter

Source: https://docs.exa.ai/integrations/openrouter

Learn how to use Exa's web search API with OpenRouter. OpenRouter provides web search capabilities that enable AI models to access current information from the web.

For detailed instructions on using Exa with OpenRouter, visit the [OpenRouter documentation](https://openrouter.ai/docs/features/web-search).

---

## List Monitor Runs

**URL:** llms-txt#list-monitor-runs

Source: https://docs.exa.ai/websets/api/monitors/runs/list-monitor-runs

get /v0/monitors/{monitor}/runs
Lists all runs for the Monitor.

---

## Install globally

**URL:** llms-txt#install-globally

npm install -g exa-mcp-server

---

## Cancel a running Search

**URL:** llms-txt#cancel-a-running-search

Source: https://docs.exa.ai/websets/api/websets/searches/cancel-a-running-search

post /v0/websets/{webset}/searches/{id}/cancel
Cancels a currently running Search.

You can cancel all searches at once by using the `websets/:webset/cancel` endpoint.

---

## Search with both text and highlights

**URL:** llms-txt#search-with-both-text-and-highlights

result_with_text_and_highlights = exa.search_and_contents(
    "AI in healthcare",
    text=True,
    highlights=True,
    num_results=2
)

---

## Use keyword search

**URL:** llms-txt#use-keyword-search

result = exa.search_and_contents("hottest AI startups", type="keyword")
```

We're confident this update will significantly improve your search experience. If you have any questions or want to chat about how this might impact your specific use case, please reach out to [hello@exa.ai](mailto:hello@exa.ai).

We can't wait for you to try out the new Auto search as default!

---

## and the retrieval of the result highlights.

**URL:** llms-txt#and-the-retrieval-of-the-result-highlights.

---

## create the exa client

**URL:** llms-txt#create-the-exa-client

exa = Exa(api_key=os.getenv("EXA_API_KEY"))

---

## List all research tasks

**URL:** llms-txt#list-all-research-tasks

response = exa.research.list_tasks()
print(f"Found {len(response['data'])} tasks")

---

## How It Works

**URL:** llms-txt#how-it-works

**Contents:**
- Creating Your First Search
  - 1. Initial Request
  - 2. Webset Creation
  - 3. Search Process
  - Accessing Results
- Running Additional Searches
  - Control Operations
- Up-to-date Websets using Monitors
  - Behavior
  - Scheduling

Source: https://docs.exa.ai/websets/api/how-it-works

The Websets API operates as an **asynchronous search system**. When you create a Webset, it automatically starts searching and verifying results based on your criteria. Let's dive into each part of the process.

## Creating Your First Search

The process starts when you [create a Webset](/websets/api/websets/create-a-webset). Here's how it flows:

### 1. Initial Request

Start by providing a search configuration:

You can optionally specify:

* An `entity.type` to define what you're looking for
* Custom `criteria` for verification
* `enrichments` to extract specific data points
* `metadata` for your own tracking

### 2. Webset Creation

When your request is received:

1. A new Webset is created with status `running`
2. A `webset.created` event is emitted
3. The search process begins automatically

### 3. Search Process

The search flows through several stages:

1. **Initialization**

* A new WebsetSearch is created
   * Status is set to `running`
   * `webset.search.created` event is emitted

2. **Discovery & Verification**

* The system starts retrieving results leveraging Exa Search and verifies each one
   * Items that pass verification and match your search criteria are automatically added to your Webset
   * Each new item triggers a `webset.item.created` event
   * Items are immediately available through the [list endpoint](/websets/api/websets/items/list-all-items-for-a-webset)

3. **Enrichment** (if configured)

* Each item is processed through specified enrichments
   * `webset.item.enriched` events are emitted as results come in
   * Enrichment results are added to the item's data

4. **Completion**
   * When the search finds all items, its status changes to `completed`
   * A `webset.search.completed` event is emitted
   * If no other operations are running, you'll receive a `webset.idle` event

### Accessing Results

You can access your data throughout the process:

1. **Real-time Access**

* Use the list endpoint to paginate through items
   * Listen for item events (`webset.item.created` and `webset.item.enriched`) to process results as they arrive

2. **Bulk Export**
   * Available once the Webset becomes `idle`
   * Includes all items with their content, verifications and enrichments
   * Useful for processing the complete dataset

## Running Additional Searches

You can [create additional searches](/websets/api/websets/searches/create-a-search) on the same Webset at any time. Each new search:

* Follows the same event flow as the initial search
* Can run in parallel with other enrichment operations (not other searches for now)
* Maintains its own progress tracking
* Contributes to the overall Webset state

### Control Operations

Manage your searches with:

* [Cancel specific searches](/websets/api/websets/searches/cancel-a-running-search)
* [Cancel all operations](/websets/api/websets/cancel-a-running-webset)

## Up-to-date Websets using Monitors

**[Monitors](/websets/api/monitors/create-a-monitor)** allow you to automatically keep your Websets updated with fresh data on a schedule, creating a continuous flow of updates without manual intervention.

* **Search behavior**: Automatically run new searches to find fresh content matching your criteria. New items are added to your Webset with automatic deduplication.

* **Refresh behavior**: Update existing items by refreshing their content from source URLs or re-running specific enrichments to capture data changes.

Set your update frequency with:

* **Cron Expression**: A valid Unix cron expression with 5 fields that triggers at most once per day
* **Timezone**: Any IANA timezone (defaults to `Etc/UTC`)

### Example: Weekly Monitor for Series A Funded Companies

**Examples:**

Example 1 (unknown):
```unknown
You can optionally specify:

* An `entity.type` to define what you're looking for
* Custom `criteria` for verification
* `enrichments` to extract specific data points
* `metadata` for your own tracking

### 2. Webset Creation

When your request is received:

1. A new Webset is created with status `running`
2. A `webset.created` event is emitted
3. The search process begins automatically

### 3. Search Process

The search flows through several stages:

1. **Initialization**

   * A new WebsetSearch is created
   * Status is set to `running`
   * `webset.search.created` event is emitted

2. **Discovery & Verification**

   * The system starts retrieving results leveraging Exa Search and verifies each one
   * Items that pass verification and match your search criteria are automatically added to your Webset
   * Each new item triggers a `webset.item.created` event
   * Items are immediately available through the [list endpoint](/websets/api/websets/items/list-all-items-for-a-webset)

3. **Enrichment** (if configured)

   * Each item is processed through specified enrichments
   * `webset.item.enriched` events are emitted as results come in
   * Enrichment results are added to the item's data

4. **Completion**
   * When the search finds all items, its status changes to `completed`
   * A `webset.search.completed` event is emitted
   * If no other operations are running, you'll receive a `webset.idle` event

### Accessing Results

You can access your data throughout the process:

1. **Real-time Access**

   * Use the list endpoint to paginate through items
   * Listen for item events (`webset.item.created` and `webset.item.enriched`) to process results as they arrive

2. **Bulk Export**
   * Available once the Webset becomes `idle`
   * Includes all items with their content, verifications and enrichments
   * Useful for processing the complete dataset

<br />

***

<br />

## Running Additional Searches

You can [create additional searches](/websets/api/websets/searches/create-a-search) on the same Webset at any time. Each new search:

* Follows the same event flow as the initial search
* Can run in parallel with other enrichment operations (not other searches for now)
* Maintains its own progress tracking
* Contributes to the overall Webset state

### Control Operations

Manage your searches with:

* [Cancel specific searches](/websets/api/websets/searches/cancel-a-running-search)
* [Cancel all operations](/websets/api/websets/cancel-a-running-webset)

<br />

***

<br />

## Up-to-date Websets using Monitors

**[Monitors](/websets/api/monitors/create-a-monitor)** allow you to automatically keep your Websets updated with fresh data on a schedule, creating a continuous flow of updates without manual intervention.

### Behavior

* **Search behavior**: Automatically run new searches to find fresh content matching your criteria. New items are added to your Webset with automatic deduplication.

* **Refresh behavior**: Update existing items by refreshing their content from source URLs or re-running specific enrichments to capture data changes.

### Scheduling

Set your update frequency with:

* **Cron Expression**: A valid Unix cron expression with 5 fields that triggers at most once per day
* **Timezone**: Any IANA timezone (defaults to `Etc/UTC`)

### Example: Weekly Monitor for Series A Funded Companies
```

---

## AI SDK by Vercel

**URL:** llms-txt#ai-sdk-by-vercel

**Contents:**
- Web Search Tool Implementation

Source: https://docs.exa.ai/reference/vercel

Learn how to build a web agent with AI SDK by Vercel and Exa. Create intelligent agents that can search the web for up-to-date information and provide contextual responses.

**[View the guide in AI SDK by Vercel docs →](https://ai-sdk.dev/cookbook/node/web-search-agent#exa)**

## Web Search Tool Implementation

Here's how to create a web search tool using Exa with AI SDK:

For detailed instructions on building web agents with AI SDK and Exa, visit the [AI SDK by Vercel documentation](https://ai-sdk.dev/cookbook/node/web-search-agent#exa).

---

## Welcome to Exa

**URL:** llms-txt#welcome-to-exa

**Contents:**
- Get Started

Source: https://docs.exa.ai/reference/getting-started

Exa is a search engine made for AIs.

Exa finds the exact content you're looking for on the web, with five core functionalities:

<a href="./search" target="_self" className="endpoint-link">/search -></a>\
Find webpages using Exa's embeddings-based or Google-style keyword search.

<a href="./get-contents" target="_self" className="endpoint-link">/contents -></a>\
Obtain clean, up-to-date, parsed HTML from Exa search results.

<a href="./find-similar-links" target="_self" className="endpoint-link">/findsimilar -></a>\
Based on a link, find and return pages that are similar in meaning.

<a href="./answer" target="_self" className="endpoint-link">/answer -></a>\
Get direct answers to questions using Exa's Answer API.

<a href="./research/create-a-task" target="_self" className="endpoint-link">/research -></a>\
Automate in-depth web research and receive structured JSON results with citations.

<CardGroup cols={2}>
  <Card title={<div className="card-title">API Playground</div>} icon="code" href="https://dashboard.exa.ai">
    <div className="text-lg">
      Explore the API playground and try Exa API.
    </div>
  </Card>

<Card title={<div className="card-title">QuickStart</div>} icon="bolt-lightning" href="./quickstart">
    <div className="text-lg">
      Use our SDKs to do your first Exa search.
    </div>
  </Card>

<Card title={<div className="card-title">Tool Calling with Exa</div>} icon="magnifying-glass" href="./rag-quickstart">
    <div className="text-lg">
      Give LLMs the ability to search the web with Exa.
    </div>
  </Card>

<Card title={<div className="card-title">Examples</div>} icon="lightbulb" href="../examples">
    <div className="text-lg">
      Learn from our pre-built tutorials and live demos.
    </div>
  </Card>
</CardGroup>

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ad0d68efd38e9f5e794474adea0f3a68" alt="" data-og-width="1024" width="1024" data-og-height="615" height="615" data-path="images/be0cab3-blue-wanderer.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7967dfd3cb9bb98a2bffc66d763cfa2e 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6cdcf27e4cda9ab1641c4c4c4f85333c 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8c58fce20e785b7bd2f205b0531dc2c1 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=463a5f8e5596df3fcd82c9803c4e1a94 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=aadd8fde4f54f9ebe68b3f64785110c6 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/be0cab3-blue-wanderer.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6de1508a386d4206b6f6af84bf2361a1 2500w" />

---

## TODO: change these to fit your own criteria

**URL:** llms-txt#todo:-change-these-to-fit-your-own-criteria

def calculate_score(info, undergrad, year, researchTopics, AI):
    contents = f"""I'm going to provide some information about an individual, and I want you to rate on a scale of 1 to 10 how good of a hiring candidate they are. I am hiring for AI researchers.
    A 10 is someone who went to an incredible college, is graduating soon (final year PhD ideally) or is already graduated, is definitely an AI researcher, has a lot of experience and seems really smart, and a nice bonus is if their research is related to retrieval, search, databases. Only return an integer from 0 to 10. Do not return anything else. This candidate did undergrad at {undergrad} and their current role is {year}. Are they an AI researcher? {AI}. They do research in {researchTopics}. Here are some other things I know about them: {info}"""
    try:
        return int(get_openai_response(contents))
    except:
        return None
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
Finally, let's enrich our dataframe of people. We define a function `enrich_row` that uses all the functions we defined to learn more about a candidate,and sort by score to get the most promising candidates.
```

---

## Define and bind the AI model

**URL:** llms-txt#define-and-bind-the-ai-model

model = ChatAnthropic(model="claude-3-5-sonnet-20240620", temperature=0).bind_tools(
    [retrieve_web_content]
)

---

## Load environment variables

**URL:** llms-txt#load-environment-variables

agentops.init(os.getenv('AGENTOPS_API_KEY'))

@tool("Exa search and get contents")
def search_and_contents(question: str) -> str:
    """
    Tool using Exa's Python SDK to run semantic search and return result highlights.
    """
    exa = Exa(api_key=os.getenv('EXA_API_KEY'))

response = exa.search_and_contents(
        query,
        type="auto",
        num_results=3,
        highlights=True
    )

parsedResult = ''.join([
        f'<Title id={idx}>{eachResult.title}</Title>'
        f'<URL id={idx}>{eachResult.url}</URL>'
        f'<Highlight id={idx}>{"".join(eachResult.highlights)}</Highlight>' 
        for (idx, eachResult) in enumerate(response.results)
    ])

---

## Answer

**URL:** llms-txt#answer

Source: https://docs.exa.ai/reference/answer

post /answer
Get an LLM answer to a question informed by Exa search results. `/answer` performs an Exa search and uses an LLM to generate either:
1. A direct answer for specific queries. (i.e. "What is the capital of France?" would return "Paris")
2. A detailed summary with citations for open-ended queries (i.e. "What is the state of ai in healthcare?" would return a summary with citations to relevant sources)

The response includes both the generated answer and the sources used to create it. The endpoint also supports streaming (as `stream=True`), which will return tokens as they are generated.

Alternatively, you can use the OpenAI compatible [chat completions interface](https://docs.exa.ai/reference/chat-completions#answer).

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## New Livecrawl Option: Preferred

**URL:** llms-txt#new-livecrawl-option:-preferred

**Contents:**
- What's New
- How It Differs from "Always"
- When to Use "Preferred"
- Complete Livecrawl Options Overview
- Migration Guide

Source: https://docs.exa.ai/changelog/livecrawl-preferred-option

Introducing the 'preferred' livecrawl option that tries to fetch fresh content but gracefully falls back to cached results when crawling fails, providing the best of both worlds.

**Date: 7 June 2025**

We've added a new `livecrawl` option called `"preferred"` that provides a more resilient approach to content fetching. This option attempts to crawl fresh content but gracefully falls back to cached results when live crawling fails.

<Info>
  The `preferred` option is now available in both `/contents` and `/search_and_contents` endpoints.
</Info>

The new `livecrawl: "preferred"` option provides intelligent fallback behavior:

* **First**: Attempts to crawl fresh content from the live webpage
* **If crawling succeeds**: Returns the fresh, up-to-date content
* **If crawling fails but cached content exists**: Returns cached content instead of failing
* **If crawling fails and no cached content exists**: Returns the crawl error

## How It Differs from "Always"

The key difference between `"preferred"` and `"always"`:

| Option        | Crawl Fails + Cache Available | Crawl Fails + No Cache |
| ------------- | ----------------------------- | ---------------------- |
| `"preferred"` | Returns cached content        | Returns crawl error    |
| `"always"`    | Returns crawl error           | Returns crawl error    |

This makes `"preferred"` more resilient for production applications where you want fresh content when possible, but don't want requests to fail when websites are temporarily unavailable.

If content freshness is critical and you want nothing else, then using `"always"` might be better.

## When to Use "Preferred"

The `"preferred"` option is ideal when:

* You want the freshest content available but need reliability
* Building production applications that can't afford to fail on crawl errors
* Content freshness is important but not critical enough to fail the request
* You're crawling websites that might be occasionally unavailable

## Complete Livecrawl Options Overview

Here are all four livecrawl options and their behaviors:

| Option        | Crawl Behavior   | Cache Fallback              | Best For                                            |
| ------------- | ---------------- | --------------------------- | --------------------------------------------------- |
| `"always"`    | Always crawls    | Never falls back            | Critical real-time data, willing to accept failures |
| `"preferred"` | Always crawls    | Falls back on crawl failure | Fresh content with reliability                      |
| `"fallback"`  | Only if no cache | Uses cache first            | Balanced speed and freshness                        |
| `"never"`     | Never crawls     | Always uses cache           | Maximum speed                                       |

If you're currently using `livecrawl: "always"` but experiencing reliability issues:

```python  theme={null}

---

## List API Keys

**URL:** llms-txt#list-api-keys

**Contents:**
- Overview
- Response Format

Source: https://docs.exa.ai/reference/team-management/list-api-keys

get /api-keys
Retrieve all API keys belonging to your team with their metadata.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

The List API Keys endpoint returns all API keys associated with your team. This includes the key ID, name, rate limit, and creation timestamp for each key.

The response includes an array of API key objects with the following information:

* **id**: Unique identifier for the API key
* **name**: Human-readable name (if provided during creation)
* **rateLimit**: Rate limit in requests per minute (if set)
* **createdAt**: ISO 8601 timestamp of when the key was created

---

## OpenAI Tool Calling

**URL:** llms-txt#openai-tool-calling

**Contents:**
- Get Started
- Full code

Source: https://docs.exa.ai/reference/openai-tool-calling

Learn to use OpenAI's tool call feature with Exa's Search Integration

<Info>
  OpenAI recommends using the Responses API for all new projects. [See the guide](./openai-responses-api-with-exa).
</Info>

OpenAI's [tool calling](https://platform.openai.com/docs/guides/function-calling?lang=python) allows LLMs to call functions that are defined in your code. This guide will show you how to utilise tool calling to call Exa's search, with the following steps:

1. Install prerequisite packages and set up the environment
2. Overview of how OpenAI's tool calling feature works
3. Use Exa within an OpenAI tool call

<Steps>
  <Step title="Pre-requisites and installation">
    Install the:

* `openai` library to perform OpenAI API calls and completions
    * `exa_py` library to perform Exa search
    * `rich` library to make the output more readable

<Step title="Set up the environment variables">
    Create an `.env` file in the root of your project and set the `EXA_API_KEY` and `OPENAI_API_KEY` environment variable to your API keys respectively. Visit the [OpenAI playground](https://platform.openai.com/api-keys) and the [Exa dashboard](https://dashboard.exa.ai/api-keys) to generate your API keys.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

<Step title="What is OpenAI tool calling?">
    OpenAI LLMs can call a function you have defined in your code, this is called [tool calling](https://platform.openai.com/docs/guides/function-calling?lang=python). To do this you first need to describe the function you want to call to OpenAI's LLM. You can do this by defining a description object of the format:

When this description is sent to OpenAI's LLM, it returns an object with a string, which is the function name defined in *your* code, and the arguments that the function takes. This does not execute or *call* functions on OpenAI's side; it only returns the function name and arguments which you will have to parse and call yourself in your code.

We will use this object to - in this case - call the `exa_search` function we define with the arguments provided.
  </Step>

<Step title="Use Exa Search as an OpenAI tool">
    First, we import and initialise the OpenAI and Exa libraries and load the stored API keys.

Next, we define the function and the function schema so that OpenAI knows how to use it and what arguments our local function takes:

Finally, we'll define the primer `SYSTEM_MESSAGE`, which explains to OpenAI what it is supposed to do:

We can now start writing the code needed to perform the LLM calls and the search. We'll create the `exa_search` function that will call Exa's `search_and_contents` function with the query:

Next, we create a function to process the tool calls:

Lastly, we'll create a `main` function to bring it all together, and handle the user input and interaction with OpenAI:

The implementation creates a loop that continually prompts the user for search queries, uses OpenAI's tool calling feature to determine when to perform a search, and then uses the Exa search results to provide an informed response to the user's query.

We also use the rich library to provide a more visually appealing console interface, including coloured output and markdown rendering for the responses.
  </Step>

<Step title="Running the code">
    Save the code in a file, e.g. `openai_search.py`, and make sure the `.env` file containing the API keys we previously created is in the same directory as the script.

Then run the script using the following command from your terminal:

You should see a prompt:

That's it, enjoy your search agent!
  </Step>
</Steps>

```python Python theme={null}
import json
import os

from dotenv import load_dotenv
from typing import Any, Dict
from exa_py import Exa
from openai import OpenAI
from rich.console import Console
from rich.markdown import Markdown
from rich.prompt import Prompt

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Set up the environment variables">
    Create an `.env` file in the root of your project and set the `EXA_API_KEY` and `OPENAI_API_KEY` environment variable to your API keys respectively. Visit the [OpenAI playground](https://platform.openai.com/api-keys) and the [Exa dashboard](https://dashboard.exa.ai/api-keys) to generate your API keys.

    <br />

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="What is OpenAI tool calling?">
    OpenAI LLMs can call a function you have defined in your code, this is called [tool calling](https://platform.openai.com/docs/guides/function-calling?lang=python). To do this you first need to describe the function you want to call to OpenAI's LLM. You can do this by defining a description object of the format:
```

Example 3 (unknown):
```unknown
When this description is sent to OpenAI's LLM, it returns an object with a string, which is the function name defined in *your* code, and the arguments that the function takes. This does not execute or *call* functions on OpenAI's side; it only returns the function name and arguments which you will have to parse and call yourself in your code.
```

Example 4 (unknown):
```unknown
We will use this object to - in this case - call the `exa_search` function we define with the arguments provided.
  </Step>

  <Step title="Use Exa Search as an OpenAI tool">
    First, we import and initialise the OpenAI and Exa libraries and load the stored API keys.
```

---

## Example

**URL:** llms-txt#example

example_homepage = ('https://winniexu.ca/')
additional_homepages = get_more_candidates(example_homepage)
new_candidate_url, new_candidate_content = additional_homepages[0]
name = get_name_from_contents(new_candidate_content)
email = get_email_from_contents(new_candidate_content)

print(f"Additional Homepages:{additional_homepages}")
print(f"Name:{name}")
print(f"Email: {email}")

Python Python theme={null}
def new_candidates_df(df):
    # get the websites of our top candidates
    top_candidates_df = df[df['Score'] > 7]
    websites_list = top_candidates_df['ExaWebsite'].tolist()

# use those top candidates to find new candidates
    new_candidates = set()
    for url in websites_list:
      new_candidates.update(get_more_candidates(url))

#for each new candidate, get their information and add them to the dataframe
    names = []
    emails = []
    urls = []
    for url, content in tqdm(new_candidates):
      names.append(get_name_from_contents(content))
      emails.append(get_email_from_contents(content))
      urls.append(url)

new_df = pd.DataFrame({
        'Name': names,
        'Email': emails,
        'ExaWebsite': urls,
    })

new_df = new_candidates_df(sorted_df)
new_df
```

Alrighty, that's it! We've just built an automated way of finding, researching, and evaluating candidates. You can use this for recruiting, or tailor this to find customers, companies, etc.

And the best part is that every time you use Exa to find new candidates, you can do more `find_similar(new_candidate_homepage)` searches with the new candidates as well -- helping you build an infinite list!

Hope this tutorial was helpful and don't forget, you can get started with [Exa for free](https://dashboard.exa.ai/overview) :)

**Examples:**

Example 1 (unknown):
```unknown
Final stretch -- let's put it all together. Let's find and add our new candidates to our original dataframe.
```

---

## The Exa Index

**URL:** llms-txt#the-exa-index

Source: https://docs.exa.ai/reference/the-exa-index

We spend a lot of time and energy creating a high quality, curated index.

There are many types of content, and we're constantly discovering new things to search for as well. If there's anything you want to be more highly covered, just reach out to [hello@exa.ai](mailto:hello@exa.ai). See the following table for a high level overview of what is available in our index:

|                      Category                     | Availability in Exa Index |                                                           Description                                                           |                                                                                                                                                                                                                                     Example prompt link                                                                                                                                                                                                                                    |
| :-----------------------------------------------: | :-----------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                  Research papers                  |         Very High         | Offer semantic search over a very vast index of papers, enabling sophisticated, multi-layer and complex filtering for use cases |            [If you're looking for the most helpful academic paper on "embeddings for document retrieval", check this out (pdf:](https://search.exa.ai/search?q=If+you%27re+looking+for+the+most+helpful+academic+paper+on+%22embeddings+for+document+retrieval%22\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22resolvedSearchType%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%7D\&resolvedSearchType=neural)            |
|                   Personal pages                  |         Very High         |           Excels at finding personal pages, which are often extremely hard/impossible to find on services like Google           |                                                                           [Here is a link to the best life coach for when you're unhappy at work:](https://exa.ai/search?q=Here%20is%20a%20link%20to%20the%20best%20life%20coach%20for%20when%20you%27re%20unhappy%20at%20work%3A\&c=personal%20site\&filters=%7B%22numResults%22%3A30%2C%22useAutoprompt%22%3Afalse%2C%22domainFilterType%22%3A%22include%22%7D)                                                                          |
|                     Wikipedia                     |         Very High         |             Covers all of Wikipedia, providing comprehensive access to this vast knowledge base via semantic search             |                                                                      [Here is a Wikipedia page about a Roman emperor:](https://search.exa.ai/search?q=Here+is+a+Wikipedia+page+about+a+Roman+emperor%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neurall)                                                                     |
|                        News                       |         Very High         |                     Includes a wide, robust index of web news sources, providing coverage of current events                     |                                       [Here is news about war in the Middle East:](https://exa.ai/search?q=Here+is+news+about+war+in+the+Middle+East%3A\&c=personal+site\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22auto%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222024-10-29T01%3A45%3A46.055Z%22%7D\&resolvedSearchType=keyword)                                      |
|                 LinkedIn  profiles                |    *Very High (US+EU)*    |      Will provide extensive coverage of LinkedIn personal profiles, allowing for detailed professional information searches     |                         [best theoretical computer scientist at uc berkeley](https://exa.ai/search?q=best+theoretical+computer+scientist+at+uc+berkeley\&c=linkedin+profile\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Atrue%2C%22resolvedSearchType%22%3A%22neural%22%7D\&autopromptString=A+leading+theoretical+computer+scientist+at+UC+Berkeley.\&resolvedSearchType=neural)                        |
|               LinkedIn company pages              |       *Coming Soon*       |       Will offer comprehensive access to LinkedIn company pages, enabling in-depth research on businesses and organization      |                                                                                                                                                                                                                                 (Best-practice example TBC)                                                                                                                                                                                                                                |
|                 Company home-pages                |         Very High         |        Wide index of companies covered; also available are curated, customized company datasets - reach out to learn more       |                                            [Here is the homepage of a company working on making space travel cheaper:](https://search.exa.ai/search?q=Here+is+the+homepage+of+a+company+working+on+making+space+travel+cheaper%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                                            |
|                 Financial Reports                 |         Very High         |                Includes SEC 10k financial reports and information from other finance sources like Yahoo Finance.                |                    [Here is a source on Apple's revenue growth rate over the past years:](https://exa.ai/search?q=Here+is+a+source+on+Apple%27s+revenue+growth+rate+over+the+past+years%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222023-11-18T22%3A35%3A50.022Z%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                   |
|                    GitHub repos                   |            High           |                                  Indexes open source code (which the Exa team use frequently!)                                  |                                                 [Here's a Github repo if you want to convert OpenAPI specs to Rust code:](https://exa.ai/search?q=Here%27s+a+Github+repo+if+you+want+to+convert+OpenAPI+specs+to+Rust+code%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                                                |
|                       Blogs                       |            High           |                      Excels at finding high quality reading material, particularly useful for niche topics                      |                                                          [If you're a huge fan of Japandi decor, you'd love this blog:](https://exa.ai/search?q=If+you%27re+a+huge+fan+of+Japandi+decor%2C+you%27d+love+this+blog%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                                                         |
|                 Places and things                 |            High           |              Covers a wide range of entities including hospitals, schools, restaurants, appliances, and electronics             |                                                             [Here is a high-rated Italian restaurant in downtown Chicago:](https://exa.ai/search?q=Here+is+a+high-rated+Italian+restaurant+in+downtown+Chicago%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                                                            |
|              Legal and policy sources             |            High           |           Strong coverage of legal and policy information, (e.g., including sources like CPUC, Justia, Findlaw, etc.)           |                        [Here is a common law case in california on marital property rights:](https://search.exa.ai/search?q=Here+is+a+common+law+case+in+california+on+marital+property+rights%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22includeDomains%22%3A%5B%22law.justia.com%22%5D%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)                        |
| Government and international organization sources |            High           |                                Includes content from sources like the IMF and CDC amongst others                                |             [Here is a recent World Health Organization site on global vaccination rates:](https://exa.ai/search?q=Here+is+a+recent+World+Health+Organization+site+on+global+vaccination+rates%3A\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222023-11-18T22%3A35%3A50.022Z%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)            |
|                       Events                      |          Moderate         |                      Reasonable coverage of events in major municipalities, suggesting room for improvement                     | [Here is an AI hackathon in SF:](https://search.exa.ai/search?q=Here+is+an+AI+hackathon+in+SF\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22exclude%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222024-07-02T23%3A36%3A15.511Z%22%2C%22useAutoprompt%22%3Afalse%2C%22endPublishedDate%22%3A%222024-07-09T23%3A36%3A15.511Z%22%2C%22excludeDomains%22%3A%5B%22twitter.com%22%5D%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural) |
|                        Jobs                       |          Moderate         |                                                    Can find some job listings                                                   |      [If you're looking for a software engineering job at a small startup working on an important mission, check out](https://search.exa.ai/search?q=If+you%27re+looking+for+a+software+engineering+job+at+a+small+startup+working+on+an+important+mission%2C+check+out\&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D\&resolvedSearchType=neural)      |

---

## Crawling Subpages

**URL:** llms-txt#crawling-subpages

**Contents:**
- Using Subpage Crawling
- Parameters
- Best Practices
- Combining with LiveCrawl
- Examples
  - Product Documentation
  - News Archives
  - Blog Content

Source: https://docs.exa.ai/reference/crawling-subpages

When searching websites, you often need to explore beyond the main page to find relevant information. Exa's subpage crawling feature allows you to automatically discover and search through linked pages within a website.

## Using Subpage Crawling

Here's how to use Exa's subpage crawling feature:

This will search through up to 5 subpages of the given website, and prioritize pages that contain the keywords "about" or "products" in their contents.

* `subpages`: Maximum number of subpages to crawl (integer)
* `subpage_target`: List of query keywords to target (e.g., \["about", "products", "news"])

1. **Limit Depth**: Start with a smaller `subpages` value (5-10) and increase if needed
2. **Consider Caching**: Use `livecrawl='always'` only when you need the most recent content
3. **Target Specific Sections**: Use `subpage_target` to focus on relevant sections rather than crawling the entire site

## Combining with LiveCrawl

For the most up-to-date and comprehensive results, combine subpage crawling with livecrawl:

This ensures you get fresh content from all discovered subpages.

Note that regarding usage, additional subpages count as an additional piece of content retrieval for each type you specify.

### Product Documentation

Search through documentation pages:

This example crawls up to 9 subpages from the main site, prioritizing pages that contain "docs" or "tutorial" in their content.

Crawl through a company's news section:

Gather recent blog posts:

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

Example 3 (unknown):
```unknown
</CodeGroup>

This will search through up to 5 subpages of the given website, and prioritize pages that contain the keywords "about" or "products" in their contents.

## Parameters

* `subpages`: Maximum number of subpages to crawl (integer)
* `subpage_target`: List of query keywords to target (e.g., \["about", "products", "news"])

## Best Practices

1. **Limit Depth**: Start with a smaller `subpages` value (5-10) and increase if needed
2. **Consider Caching**: Use `livecrawl='always'` only when you need the most recent content
3. **Target Specific Sections**: Use `subpage_target` to focus on relevant sections rather than crawling the entire site

## Combining with LiveCrawl

For the most up-to-date and comprehensive results, combine subpage crawling with livecrawl:

<CodeGroup>
```

Example 4 (unknown):
```unknown

```

---

## Verifying Signatures

**URL:** llms-txt#verifying-signatures

**Contents:**
- How Webhook Signatures Work
- Verification Process
- Security Best Practices
- Troubleshooting
  - Invalid Signature Errors
  - Testing Signatures Locally

Source: https://docs.exa.ai/websets/api/webhooks/verifying-signatures

Learn how to securely verify webhook signatures to ensure requests are from Exa

When you receive a webhook from Exa, you should verify that it came from us to ensure the integrity and authenticity of the data. Exa signs all webhook payloads with a secret key that's unique to your webhook endpoint.

## How Webhook Signatures Work

Exa uses HMAC SHA256 to sign webhook payloads. The signature is included in the `Exa-Signature` header, which contains:

* A timestamp (`t=`) indicating when the webhook was sent
* One or more signatures (`v1=`) computed using the timestamp and payload

The signature format looks like this:

## Verification Process

To verify a webhook signature:

1. Extract the timestamp and signatures from the `Exa-Signature` header
2. Create the signed payload by concatenating the timestamp, a period, and the raw request body
3. Compute the expected signature using HMAC SHA256 with your webhook secret
4. Compare your computed signature with the provided signatures

<Tabs>
  <Tab title="Python">
    
  </Tab>

<Tab title="JavaScript/Node.js">
    
  </Tab>

<Tab title="Java">
    
  </Tab>
</Tabs>

## Security Best Practices

Following these practices will help ensure your webhook implementation is secure and robust:

* **Always Verify Signatures** - Never process webhook data without first verifying the signature. This prevents attackers from sending fake webhooks to your endpoint.

* **Use Timing-Safe Comparison** - When comparing signatures, use functions like `hmac.compare_digest()` in Python or `crypto.timingSafeEqual()` in Node.js to prevent timing attacks.

* **Check Timestamp Freshness** - Consider rejecting webhooks with timestamps that are too old (e.g., older than 5 minutes) to prevent replay attacks.

* **Store Secrets Securely** - Store your webhook secrets in environment variables or a secure secret management system. Never hardcode them in your application. **Important**: The webhook secret is only returned when you [create a webhook](https://docs.exa.ai/websets/api/webhooks/create-a-webhook) - make sure to save it securely as it cannot be retrieved later.

* **Use HTTPS** - Always use HTTPS endpoints for your webhooks to ensure the data is encrypted in transit.

### Invalid Signature Errors

If you're getting signature verification failures:

1. **Check the raw payload**: Make sure you're using the raw request body, not a parsed JSON object
2. **Verify the secret**: Ensure you're using the correct webhook secret from when the webhook was created
3. **Check header parsing**: Make sure you're correctly extracting the timestamp and signatures from the header
4. **Encoding issues**: Ensure consistent UTF-8 encoding throughout the verification process

### Testing Signatures Locally

You can test your signature verification logic using the webhook secret and a sample payload:

```python python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
Exa-Signature: t=1234567890,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

Example 2 (unknown):
```unknown
</Tab>

  <Tab title="JavaScript/Node.js">
```

Example 3 (unknown):
```unknown
</Tab>

  <Tab title="Java">
```

Example 4 (unknown):
```unknown
</Tab>
</Tabs>

***

<br />

## Security Best Practices

Following these practices will help ensure your webhook implementation is secure and robust:

* **Always Verify Signatures** - Never process webhook data without first verifying the signature. This prevents attackers from sending fake webhooks to your endpoint.

* **Use Timing-Safe Comparison** - When comparing signatures, use functions like `hmac.compare_digest()` in Python or `crypto.timingSafeEqual()` in Node.js to prevent timing attacks.

* **Check Timestamp Freshness** - Consider rejecting webhooks with timestamps that are too old (e.g., older than 5 minutes) to prevent replay attacks.

* **Store Secrets Securely** - Store your webhook secrets in environment variables or a secure secret management system. Never hardcode them in your application. **Important**: The webhook secret is only returned when you [create a webhook](https://docs.exa.ai/websets/api/webhooks/create-a-webhook) - make sure to save it securely as it cannot be retrieved later.

* **Use HTTPS** - Always use HTTPS endpoints for your webhooks to ensure the data is encrypted in transit.

***

<br />

## Troubleshooting

### Invalid Signature Errors

If you're getting signature verification failures:

1. **Check the raw payload**: Make sure you're using the raw request body, not a parsed JSON object
2. **Verify the secret**: Ensure you're using the correct webhook secret from when the webhook was created
3. **Check header parsing**: Make sure you're correctly extracting the timestamp and signatures from the header
4. **Encoding issues**: Ensure consistent UTF-8 encoding throughout the verification process

### Testing Signatures Locally

You can test your signature verification logic using the webhook secret and a sample payload:
```

---

## Results are already ranked by relevance, no need to sort by score

**URL:** llms-txt#results-are-already-ranked-by-relevance,-no-need-to-sort-by-score

**Contents:**
- Response Structure Changes
  - Auto and Keyword Search (New)
  - Neural Search (Unchanged)
- Need Help with Migration?

for item in result.results:
    print(f"Title: {item.title}")
json  theme={null}
{
  "results": [
    {
      "title": "Example AI Startup",
      "url": "https://example-startup.com",
      "id": "abc123",
      "publishedDate": "2024-01-15",
      "author": "John Doe"
      // Note: No 'score' field
    }
  ]
}
json  theme={null}
{
  "results": [
    {

"title": "Example AI Startup", 
      "url": "https://example-startup.com",
      "id": "abc123",
      "publishedDate": "2024-01-15",
      "author": "John Doe"
    }
  ]
}
```

## Need Help with Migration?

If you have questions about migrating from Auto/Keyword search scores or need help determining the best search type for your use case, please reach out to [hello@exa.ai](mailto:hello@exa.ai). We're here to help ensure a smooth transition.

**Examples:**

Example 1 (unknown):
```unknown
## Response Structure Changes

### Auto and Keyword Search (New)
```

Example 2 (unknown):
```unknown
### Neural Search (Unchanged)
```

---

## given a homepage, get homepages of similar candidates

**URL:** llms-txt#given-a-homepage,-get-homepages-of-similar-candidates

def get_more_candidates(homepageURL):
  new_homepages = []
  if not homepageURL:
    return None
  similarity_search = exa.find_similar_and_contents(homepageURL, num_results=3, text={"include_html_tags": False}, exclude_domains=['linkedin.com', 'github.com', 'twitter.com'])

#return a list of emails
  for res in similarity_search.results:
    new_homepages.append((res.url, res.text))
  return new_homepages

---

## CrewAI

**URL:** llms-txt#crewai

**Contents:**
- Get Started

Source: https://docs.exa.ai/reference/crewai

Learn how to add Exa retrieval capabilities to your CrewAI agents.

[CrewAI](https://crewai.com/) is a framework for orchestrating AI agents that work together to accomplish complex tasks.
In this guide, we'll create a crew of two agents that generate a newsletter based on Exa's search results. We'll go over how to:

1. Create a custom Exa-powered CrewAI tool
2. Set up agents and assign them specific roles that use the Exa-powered search tool
3. Organize the agents into a crew that will write a newsletter

<Steps>
  <Step title="Pre-requisites and installation">
    Install the crewAI core, crewAI tools and Exa Python SDK libraries.

<Step title="Defining a custom Exa-based tool in crewAI">
    We set up a [custom tool](https://docs.crewai.com/concepts/tools) using the crewAI [@tool decorator ](https://docs.crewai.com/concepts/tools#utilizing-the-tool-decorator). Within the tool, we can initialize the Exa class from the [Exa Python SDK](https://github.com/exa-labs/exa-py), make a request, and return a parsed out result.

<Note> Make sure your API keys are initialized properly. For this demonstration, the environment variable names are `OPENAI_API_KEY` and `EXA_API_KEY` for OpenAI and Exa keys respectively. </Note>

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

<Step title="Setting up CrewAI agent">
    Import the relevant crewAI modules. Then, define `exa_tools` to reference the custom search method we defined above.

We then set up[ two agents](https://docs.crewai.com/concepts/Agents/) and place them in a [crew together](https://docs.crewai.com/concepts/Crews/):

* One to research with Exa (providing the custom tool defined above)
    * Another to write a newsletter as an output (using an LLM)

<Step title="Defining tasks for the agents">
    Next, we'll define [tasks](https://docs.crewai.com/concepts/Tasks/) for each agent and create the crew overall using all of the components we've set up above.

<Step title="Kicking off the crew">
    Finally, we kick off the crew by providing a research topic as our input query.

<Step title="Output">
    As you can see, Exa's search results enriched the output generation!

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Defining a custom Exa-based tool in crewAI">
    We set up a [custom tool](https://docs.crewai.com/concepts/tools) using the crewAI [@tool decorator ](https://docs.crewai.com/concepts/tools#utilizing-the-tool-decorator). Within the tool, we can initialize the Exa class from the [Exa Python SDK](https://github.com/exa-labs/exa-py), make a request, and return a parsed out result.
```

Example 2 (unknown):
```unknown
<Note> Make sure your API keys are initialized properly. For this demonstration, the environment variable names are `OPENAI_API_KEY` and `EXA_API_KEY` for OpenAI and Exa keys respectively. </Note>

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

  <Step title="Setting up CrewAI agent">
    Import the relevant crewAI modules. Then, define `exa_tools` to reference the custom search method we defined above.
```

Example 3 (unknown):
```unknown
We then set up[ two agents](https://docs.crewai.com/concepts/Agents/) and place them in a [crew together](https://docs.crewai.com/concepts/Crews/):

    * One to research with Exa (providing the custom tool defined above)
    * Another to write a newsletter as an output (using an LLM)
```

Example 4 (unknown):
```unknown
</Step>

  <Step title="Defining tasks for the agents">
    Next, we'll define [tasks](https://docs.crewai.com/concepts/Tasks/) for each agent and create the crew overall using all of the components we've set up above.
```

---

## Find similar with full text content

**URL:** llms-txt#find-similar-with-full-text-content

similar_with_text = exa.find_similar_and_contents(
    "https://example.com/article",
    text=True,
    num_results=2
)

---

## Managing Your Team

**URL:** llms-txt#managing-your-team

**Contents:**
- Seeing your teams
- Topping up a Team's balance
- Inviting people to your team

Source: https://docs.exa.ai/reference/setting-up-team

Details on Team structure and account management for the Exa platform

[Go to API Dashboard](https://dashboard.exa.ai)

Exa organizes account usage and paid feature access through 'Teams':

Upon account creation, you're placed in a 'Personal' Team. You can use the dropdown in the top-left of the Exa dashboard shown below to create a new Team or select between other Teams you have. You can make as many Teams as you like.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4e6df5b679e8f1abd98f37e302d272b5" alt="Team dropdown (top-left) within the Exa dashboard under Team settings" data-og-width="2954" width="2954" data-og-height="1916" height="1916" data-path="images/dashbaord_team_switcher.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2fde086680500c580f6caf1c20c01882 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=630f510ee78cd2f10bdb99f164121e16 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=9e1459fe392149c1694e10795f69c019 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ec6e722c13c4715ef345883d4f635264 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=faeba90192fefa2fd4127e6449bd47aa 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashbaord_team_switcher.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=0dd109234e745db02802c4bc4cb6c51e 2500w" />

Team dropdown (top-left) within the Exa dashboard under Team settings

[Go to API Dashboard](https://dashboard.exa.ai)

## Topping up a Team's balance

With the desired Team selected, you can top up your credit balance in the Billing page.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7d0ba25707107f9ffe401657d7050d3a" alt="" data-og-width="2954" width="2954" data-og-height="1916" height="1916" data-path="images/dashboard_topup.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=73fe90586f98fb06f822ac70e874a2e1 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=9c9f26f66d7d095b7de2567fb53c7d4f 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=1932e9801f4d2ea27072fe379a5bf128 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6966eb19eaa8ff10814517eec115a28c 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=dc2c8f33bf495b273da8c483131bd53d 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_topup.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a585dda6d136ba25c36eab416cd44505 2500w" />

## Inviting people to your team

Team admins can add members via the Invite feature in Team settings.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=95d6b04394946325486e912103cdf79f" alt="" data-og-width="2954" width="2954" data-og-height="1916" height="1916" data-path="images/dashboard_invite.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=be3200e345d010c6d616a5d0db770c92 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=24173f1e4967af0e4d7fde5f11db0212 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=0b27824628475ac5047057e4fe901c4d 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=11802a534e9c7589d2d6104701613762 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7a8afba5965e9ec81fc6411d44423775 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8d7fcc1ca0671b5f777a5323595bb406 2500w" />

Once a team member is invited, their status will be 'Pending' on the team management menu.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6256177f8a13c6d60853f9a85f6fac5d" alt="" data-og-width="2954" width="2954" data-og-height="1916" height="1916" data-path="images/dashboard_invite_pending.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=15b57a2e9672d42326c2c49725d4c02b 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=75749b19048452437b792cb11c803e6a 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=655e809a1fccf2b90c94715e9641c23a 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4348d6451f305ab6c582cfbb18c026f7 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=190c3d14beabf3f4e01ccb9b4485a7a1 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_pending.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=df2dc93b2d06f6b401ef08ebe8458376 2500w" />

They will receive an email inviting them to join the team.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=57225ab6244f3f09f245703358d36e67" alt="" data-og-width="1094" width="1094" data-og-height="1082" height="1082" data-path="images/dashboard_invite_email.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=66b885801cf28d0b466f63f9172e9fc7 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=350ad6b93f86d22c5e0fa36051955d1e 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8f56eaa963cbb581c244d0c13374b1e2 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=52b259a73003687a34eeb658fd296d72 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=beac2fb2207629157eee7e91f89038f7 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_email.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a897e8e5153762ed3a852b202263607b 2500w" />

Once accepted, you'll see both members are 'Accepted'. All Team members share the usage limits and features of their respective Team's plan.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=9be5765f24c53a129c58542a681a9932" alt="" data-og-width="2954" width="2954" data-og-height="1916" height="1916" data-path="images/dashboard_invite_accepted.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=76abe2fcf0c0084c2047be6e5d38bbf0 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d1c7e910620860ac802d562ba96099ae 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=dfe0010090fa00f0801554df5a95d347 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a57e0ec9e75523d7cff608697a149b83 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=c97f89b69a4c84f464f90ff3c038854a 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/dashboard_invite_accepted.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b1bc8435d7897128ea6ced1b8bd1c5dc 2500w" />

[Go to API Dashboard](https://dashboard.exa.ai)

---

## Find similar links

**URL:** llms-txt#find-similar-links

Source: https://docs.exa.ai/reference/find-similar-links

post /findSimilar
Find similar links to the link provided and optionally return the contents of the pages.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Update a Webhook

**URL:** llms-txt#update-a-webhook

Source: https://docs.exa.ai/websets/api/webhooks/update-a-webhook

patch /v0/webhooks/{id}
Change a webhook's settings. You can update:
- Events: Add or remove which events you want to hear about - URL: Change where notifications are sent - Metadata: Update custom data linked to the webhook

Changes happen right away. If you change the events list, the webhook will start or stop getting notifications for those events immediately.

The webhook keeps its current status (`active` or `inactive`) when you update it.

---

## Exa Researcher - Python

**URL:** llms-txt#exa-researcher---python

**Contents:**
- What this doc covers
- Setup
- Exa Auto search
- Writing a report with GPT-3.5 Turbo
- All Together Now

Source: https://docs.exa.ai/examples/exa-researcher-python

## What this doc covers

1. Using Exa's Auto search to pick the best search setting for each query (keyword or neural)
2. Using search\_and\_contents() through Exa's Python SDK

In this example, we will build Exa Researcher, a Python app that, given a research topic, automatically searches for relevant sources with Exa's [auto search](../reference/how-exa-search-works#auto-search-combines-keyword-and-neural) and synthesizes the information into a reliable research report.

To run this code, first we need a [Exa API key](https://dashboard.exa.ai/api-keys) and an [OpenAI API key](https://platform.openai.com/api-keys).

If you would like to se the full code for this tutorial as a Colab notebook, [click here](https://colab.research.google.com/drive/1Aj6bBptSHWxZO7GVG2RoWtQSEkpabuaF?usp=sharing)

Let's import the Exa and OpenAI SDKs and set up our API keys to create client objects for each. We'll use environment variables to securely store our API keys.

Since we'll be making several calls to the OpenAI API to get a completion from GPT-3.5 Turbo, let's make a simple utility function so we can pass in the system and user messages directly, and get the LLM's response back as a string.

Okay, great! Now let's start building Exa Researcher.

The researcher should be able to automatically generate research reports for all kinds of different topics. Here's two to start:

The first thing our researcher has to do is decide what kind of search to do for the given topic.

Exa offers two kinds of search: **neural** and **keyword** search. Here's how we decide:

* Neural search is preferred when the query is broad and complex because it lets us retrieve high quality, semantically relevant data. Neural search is especially suitable when a topic is well-known and popularly discussed on the Internet, allowing the machine learning model to retrieve contents which are more likely recommended by real humans.
* Keyword search is useful when the topic is specific, local or obscure. If the query is a specific person's name, and identifier, or acronym, such that relevant results will contain the query itself, keyword search may do well. And if the machine learning model doesn't know about the topic, but relevant documents can be found by directly matching the search query, keyword search may be necessary.

Conveniently, Exa's [auto search](../reference/how-exa-search-works#auto-search-combines-keyword-and-neural) feature (on by default) will automatically decide whether to use `keyword` or `neural` search for each query. For example, if a query is a specific person's name, Exa would decide to use keyword search.

Now, we'll create a helper function to generate search queries for our topic.

Next, let's write another function that actually calls the Exa API to perform searches using Auto search.

## Writing a report with GPT-3.5 Turbo

The final step is to instruct the LLM to synthesize the content into a research report, including citations of the original links. We can do that by pairing the content and the URLs and writing them into the prompt.

Now, let's just wrap everything into one Researcher function that strings together all the functions we've written. Given a user's research topic, the Researcher will generate search queries, feed those queries to Exa Auto search, and finally use an LLM to synthesize the retrieved information. Three simple steps!

In just a couple lines of code, we've used Exa to go from a research topic to a valuable essay with up-to-date sources.

```Python Python theme={null}
def run_examples():
    print("Researching Sam Altman:")
    sama_report = researcher(SAMA_TOPIC)
    print(sama_report)

print("\n\nResearching Renaissance Art:")
    art_report = researcher(ART_TOPIC)
    print(art_report)

**Examples:**

Example 1 (unknown):
```unknown
Since we'll be making several calls to the OpenAI API to get a completion from GPT-3.5 Turbo, let's make a simple utility function so we can pass in the system and user messages directly, and get the LLM's response back as a string.
```

Example 2 (unknown):
```unknown
Okay, great! Now let's start building Exa Researcher.

## Exa Auto search

The researcher should be able to automatically generate research reports for all kinds of different topics. Here's two to start:
```

Example 3 (unknown):
```unknown
The first thing our researcher has to do is decide what kind of search to do for the given topic.

Exa offers two kinds of search: **neural** and **keyword** search. Here's how we decide:

* Neural search is preferred when the query is broad and complex because it lets us retrieve high quality, semantically relevant data. Neural search is especially suitable when a topic is well-known and popularly discussed on the Internet, allowing the machine learning model to retrieve contents which are more likely recommended by real humans.
* Keyword search is useful when the topic is specific, local or obscure. If the query is a specific person's name, and identifier, or acronym, such that relevant results will contain the query itself, keyword search may do well. And if the machine learning model doesn't know about the topic, but relevant documents can be found by directly matching the search query, keyword search may be necessary.

Conveniently, Exa's [auto search](../reference/how-exa-search-works#auto-search-combines-keyword-and-neural) feature (on by default) will automatically decide whether to use `keyword` or `neural` search for each query. For example, if a query is a specific person's name, Exa would decide to use keyword search.

Now, we'll create a helper function to generate search queries for our topic.
```

Example 4 (unknown):
```unknown
Next, let's write another function that actually calls the Exa API to perform searches using Auto search.
```

---

## List webhook attempts

**URL:** llms-txt#list-webhook-attempts

Source: https://docs.exa.ai/websets/api/webhooks/attempts/list-webhook-attempts

get /v0/webhooks/{id}/attempts
List all attempts made by a Webhook ordered in descending order.

---

## Get a Webset

**URL:** llms-txt#get-a-webset

Source: https://docs.exa.ai/websets/api/websets/get-a-webset

---

## define the tools available to the agent - we're defining a single tool, exa_search

**URL:** llms-txt#define-the-tools-available-to-the-agent---we're-defining-a-single-tool,-exa_search

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "exa_search",
            "description": "Perform a search query on the web, and retrieve the world's most relevant information.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query to perform.",
                    },
                },
                "required": ["query"],
            },
        },
    }
]

---

## Determine whether to continue or end

**URL:** llms-txt#determine-whether-to-continue-or-end

def should_continue(state: MessagesState) -> Literal["tools", END]:
    messages = state["messages"]
    last_message = messages[-1]
    return "tools" if last_message.tool_calls else END

---

## Create a task

**URL:** llms-txt#create-a-task

Source: https://docs.exa.ai/reference/research/create-a-task

post /research/v1
Create an asynchronous research task that explores the web, gathers sources, synthesizes findings, and returns results with citations. Can be used to generate:
1. Structured JSON matching an `outputSchema` you provide.
2. A detailed markdown report when no schema is provided.

The API responds immediately with a `researchId` for polling completion status. For more details, see [Exa Research](/reference/exa-research).

Alternatively, you can use the OpenAI compatible [chat completions interface](/reference/chat-completions#research).

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

---

## Search for recent AI ethics research papers

**URL:** llms-txt#search-for-recent-ai-ethics-research-papers

search_results = exa.search_and_contents(
    "Recent AI ethics research papers",
    type="neural",
    text=True,
    num_results=5,  # Limit to 5 papers for this example
)

---

## Search with structured summary schema

**URL:** llms-txt#search-with-structured-summary-schema

company_schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Company Information",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "The name of the company"
        },
        "industry": {
            "type": "string",
            "description": "The industry the company operates in"
        },
        "foundedYear": {
            "type": "number",
            "description": "The year the company was founded"
        },
        "keyProducts": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of key products or services offered by the company"
        },
        "competitors": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of main competitors"
        }
    },
    "required": ["name", "industry"]
}

result_with_structured_summary = exa.search_and_contents(
    "OpenAI company information",
    summary={
        "schema": company_schema
    },
    category="company",
    num_results=3
)

---

## Find similar with highlights

**URL:** llms-txt#find-similar-with-highlights

similar_with_highlights = exa.find_similar_and_contents(
    "https://example.com/article",
    highlights=True,
    num_results=2
)

---

## Delete Monitor

**URL:** llms-txt#delete-monitor

Source: https://docs.exa.ai/websets/api/monitors/delete-monitor

delete /v0/monitors/{id}
Deletes a monitor.

---

## Or run directly with npx

**URL:** llms-txt#or-run-directly-with-npx

npx exa-mcp-server
bash  theme={null}

**Examples:**

Example 1 (unknown):
```unknown
To specify which tools to enable:
```

---

## LlamaIndex

**URL:** llms-txt#llamaindex

**Contents:**
- Get Started

Source: https://docs.exa.ai/reference/llamaindex

A quick-start guide on how to add Exa retrieval to a LlamaIndex Agent Application.

LlamaIndex is a framework for building LLM applications powered by structured data. In this guide, we'll use Exa's LlamaIndex integration to:

1. Specify Exa's Search and Retrieve Highlight Tool as a LlamaIndex retriever
2. Set up an OpenAI Agent that uses this tool in its response generation

<Steps>
  <Step title="Pre-requisites and installation">
    Install the llama-index, llama-index core, llama-index-tools-exa libraries. OpenAI dependencies are within the core library, so we don't need to specify that.

Also ensure API keys are initialized properly. The following code uses the `EXA_API_KEY` as the relevant environment variable name.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

<Step title="Instantiate Exa tool">
    Import the relevant Exa integration library and instantiate LlamaIndex's `ExaToolSpec`.

<Step title="Choose the Exa method to use">
    For this example, we are only interested in passing the [search\_and\_retrieve\_highlights](./search) method to our agent, so we specify this using the `.to_tool_list`LlamaIndex method. We also pass `current_date`, a simple utility so our agent knows the current date.

<Step title="Set up an OpenAI Agent and make Exa-powered requests">
    Set up the [OpenAIAgent](https://docs.llamaindex.ai/en/stable/examples/agent/Chatbot%5FSEC/), passing the filtered down toolset from above.

We can then use the chat method to interact with the agent.

<Step title="Sample outputs">
    Output 1: Verbose output of agent operation

Output 2: Agent response

As you can see, the output generation is enriched with the context of our Exa Search query result!
  </Step>
</Steps>

**Examples:**

Example 1 (unknown):
```unknown
Also ensure API keys are initialized properly. The following code uses the `EXA_API_KEY` as the relevant environment variable name.

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
  </Step>

  <Step title="Instantiate Exa tool">
    Import the relevant Exa integration library and instantiate LlamaIndex's `ExaToolSpec`.
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Choose the Exa method to use">
    For this example, we are only interested in passing the [search\_and\_retrieve\_highlights](./search) method to our agent, so we specify this using the `.to_tool_list`LlamaIndex method. We also pass `current_date`, a simple utility so our agent knows the current date.
```

Example 3 (unknown):
```unknown
</Step>

  <Step title="Set up an OpenAI Agent and make Exa-powered requests">
    Set up the [OpenAIAgent](https://docs.llamaindex.ai/en/stable/examples/agent/Chatbot%5FSEC/), passing the filtered down toolset from above.
```

Example 4 (unknown):
```unknown
We can then use the chat method to interact with the agent.
```

---

## List all available tools

**URL:** llms-txt#list-all-available-tools

**Contents:**
- Configuring Claude Desktop
- Troubleshooting
  - Common Issues
- Additional Resources

npx exa-mcp-server --list-tools
bash  theme={null}
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   powershell  theme={null}
   code %APPDATA%\Claude\claude_desktop_config.json
   json  theme={null}
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": [
           "-y",
          "exa-mcp-server"
          ],
         "env": {
           "EXA_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   json  theme={null}
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": [
           "-y",
           "exa-mcp-server",
           "--tools=get_code_context_exa"
         ],
         "env": {
           "EXA_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   json  theme={null}
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": [
           "-y",
           "exa-mcp-server",
           "--tools=get_code_context_exa,web_search_exa"
         ],
         "env": {
           "EXA_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   json  theme={null}
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": [
           "-y",
           "exa-mcp-server",
           "--tools=web_search_exa"
         ],
         "env": {
           "EXA_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   json  theme={null}
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": [
           "-y",
           "exa-mcp-server",
           "--tools=deep_researcher_start,deep_researcher_check"
         ],
         "env": {
           "EXA_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   ```

5. **Restart Claude Desktop**
   * Completely quit Claude Desktop (not just close the window)
   * Start Claude Desktop again
   * Look for the 🔌 icon to verify the Exa server is connected

1. **Server Not Found**
   * Ensure the npm package is correctly installed

2. **API Key Issues**
   * Confirm your EXA\_API\_KEY is valid
   * Make sure there are no spaces or quotes around the API key

3. **Connection Problems**
   * Restart Claude Desktop completely

## Additional Resources

For more information, visit the [Exa MCP Server GitHub repository](https://github.com/exa-labs/exa-mcp-server/).

**Examples:**

Example 1 (unknown):
```unknown
## Configuring Claude Desktop

To configure Claude Desktop to use Exa MCP:

1. **Enable Developer Mode in Claude Desktop**
   * Open Claude Desktop
   * Click on the top-left menu
   * Enable Developer Mode

2. **Open the Configuration File**

   * After enabling Developer Mode, go to Settings
   * Navigate to the Developer Option
   * Click "Edit Config" to open the configuration file

   Alternatively, you can open it directly:

   **macOS:**
```

Example 2 (unknown):
```unknown
**Windows:**
```

Example 3 (unknown):
```unknown
3. **Add Exa MCP Configuration**

   Add the following to your configuration:
```

Example 4 (unknown):
```unknown
Replace `your-api-key-here` with your actual Exa API key.

4. **Enabling Specific Tools**

   To enable only code search (recommended for developers):
```

---

## Markdown Contents as Default

**URL:** llms-txt#markdown-contents-as-default

**Contents:**
- What Changed
- Content Processing Behavior
- Benefits of Markdown Default

Source: https://docs.exa.ai/changelog/markdown-contents-as-default

Markdown content is now the default format for all Exa API endpoints, providing cleaner, more readable content that's ideal for AI applications and text processing.

**Date: 23 June 2025**

We've updated all Exa API endpoints to return content in markdown format by default. This change provides cleaner, more structured content that's optimized for AI applications, RAG systems, and general text processing workflows.

<Info>
  All endpoints now process webpage content into clean markdown format by default. Use the `includeHtmlTags` parameter to control content formatting.
</Info>

Previously, our endpoints returned content in various formats depending on the specific endpoint configuration. Now, all endpoints consistently return content processed into clean markdown format, making it easier to work with the data across different use cases.

## Content Processing Behavior

The `includeHtmlTags` parameter now controls how we process webpage content:

* **`includeHtmlTags=false` (default)**: We process webpage content into clean markdown format
* **`includeHtmlTags=true`**: We return content as HTML without processing to markdown

In all cases, we remove extraneous data, advertisements, navigation elements, and other boilerplate content, keeping only what we detect as the main content of the page.

**No action required** if you want the new markdown format - it's now the default! If you need HTML content instead:

## Benefits of Markdown Default

1. **Better for AI applications**: Markdown format is more structured and easier for LLMs to process
2. **Improved readability**: Clean formatting without HTML tags makes content more readable
3. **RAG optimization**: Markdown content chunks more naturally for retrieval systems

If you have any questions about this change or need help adapting your implementation, please reach out to [hello@exa.ai](mailto:hello@exa.ai).

We're excited for you to experience the improved content quality with markdown as the default!

---

## New default behavior (Auto search)

**URL:** llms-txt#new-default-behavior-(auto-search)

result = exa.search_and_contents("hottest AI startups")

---

## Cancel a running Enrichment

**URL:** llms-txt#cancel-a-running-enrichment

Source: https://docs.exa.ai/websets/api/websets/enrichments/cancel-a-running-enrichment

post /v0/websets/{webset}/enrichments/{id}/cancel
All running enrichments will be canceled. You can not resume an Enrichment after it has been canceled.

---

## Write insights to CSV

**URL:** llms-txt#write-insights-to-csv

write_to_csv(insights)
csv  theme={null}
Topic,Description,Ethical Implications
Algorithmic Bias,"This research challenges the assumption that algorithms can replace human decision-making and remain unbiased. It identifies three forms of outrage-intellectual, moral, and political-when reacting to algorithmic bias and suggests practical approaches like clarifying language around bias, developing new auditing methods, and building certain capabilities in AI systems.",Potential perpetuation of existing biases if not addressed; Necessity for transparency in AI system development; Impact on fairness and justice in societal decision-making processes; Importance of inclusive stakeholder engagement in AI design and implementation
Algorithmic Bias and Ethical Interview,"Artificial intelligence and machine learning are used to offload decision making from humans, with a misconception that machines can be unbiased. This paper critiques this assumption and discusses forms of outrage towards algorithmic biases, identifying three types: intellectual, moral, and political outrage. It suggests practical approaches such as clarifying language around bias, auditing methods, and building specific capabilities to address biases. The overall discussion urges for greater insight into conversations around algorithmic bias and its implications.","Algorithms can perpetuate and even amplify existing biases in data.; There can be a misleading assumption that machines are inherently fair and unbiased.; Algorithmic biases can trigger intellectual, moral, and political outrage, affecting societal trust in AI systems."
Algorithmic Bias and Human Decision Making,"This research delves into the misconceptions surrounding the belief that algorithms can replace human decision-making because they are inherently fair and unbiased. The study highlights the flaws in this rationale by showing that algorithms are not free from bias. It explores three types of outrage—intellectual, moral, and political—that arise when people confront algorithmic bias. The paper recommends addressing algorithmic bias through clearer language, better auditing methods, and enhanced system capabilities.","Algorithms can perpetuate and exacerbate existing biases rather than eliminate them.; The misconception that algorithms are unbiased may lead to a false sense of security in their use.; There is a need for the AI community to adopt clearer language and terms when discussing bias to prevent misunderstanding and misuse.; Enhancing auditing methods and system capabilities can help identify and address biases.; Decisions made through biased algorithms can have unjust outcomes, affecting public trust and leading to social and ethical implications."
Algorithmic Bias in AI,"Artificial intelligence and machine learning are increasingly used to offload decision making from people. In the past, one of the rationales for this replacement was that machines, unlike people, can be fair and unbiased. Evidence suggests otherwise, indicating that algorithms can be biased. The study investigates how bias is perceived in algorithmic decision-making, proposing clarity in the language around bias and suggesting new auditing methods for intelligent systems to address this concern.",Algorithms may inherit or exacerbate existing biases.; Misleading assumptions about AI's objectivity can lead to unfair outcomes.; Need for transparent language and robust auditing to mitigate bias.
Algorithmic Bias in AI Systems,"This research explores the misconception that algorithms can replace humans in decision-making without bias. It sheds light on the absurdity of assuming that algorithms are inherently unbiased and discusses emotional responses to algorithmic bias. The study suggests clarity in language about bias, new auditing methods, and capacity-building in AI systems to address bias concerns.",Misleading perception of unbiased AI leading to potential unfairness in decision-making.; Emotional and ethical concerns due to algorithmic bias perceived unfairness.; Need for consistent auditing methods to ensure fairness in AI systems.
```

Instructor has enabled the creation of structured data that can as such be stored in tabular format, e.g.in a CRM or similar.

By combining Exa’s powerful search capabilities with Instructor’s predictable output generation, you can extract and analyze information from web content efficiently and accurately.

**Examples:**

Example 1 (unknown):
```unknown
After running the code, you'll have a CSV file named "ai\_ethics\_insights.csv". Here's an example of what the contents might look like:
```

---

## Combine all search results into one string

**URL:** llms-txt#combine-all-search-results-into-one-string

combined_results = "\n\n".join([result.text for result in search_results.results])

def write_to_csv(insights: List[AIEthicsInsight], filename: str = "ai_ethics_insights.csv"):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Topic', 'Description', 'Ethical Implications'])
        
        for insight in insights:
            writer.writerow([
                insight.topic,
                insight.description,
                '; '.join(insight.ethical_implications)
            ])
    
    print(f"Results written to {filename}")

---

## Let the magic happen!

**URL:** llms-txt#let-the-magic-happen!

**Contents:**
- Beyond Question Answering: Text Similarity Search

info_for_llm = []
for question in questions:
    search_response = exa.search_and_contents(question, highlights=highlights_options, num_results=3)
    info = [sr.highlights[0] for sr in search_response.results]
    info_for_llm.append(info)
Python Python theme={null}
info_for_llm
[['As the only mammals with powered flight, the evolutionary\xa0history of their wings has been poorly understood. However, research published Monday in Nature and PLoS Genetics has provided the first comprehensive look at the genetic origins of their incredible wings.But to appreciate the genetics of their wing development, it’s important to know how crazy a bat in flight truly\xa0looks.Try a little experiment: Stick your arms out to the side, palms facing forward, thumbs pointing up toward the ceiling. Now imagine that your fingers are\xa0long, arching down toward the floor like impossibly unkempt fingernails — but still made of bone, sturdy and spread apart. Picture the sides of your body connecting to your hands, a rubbery membrane attaching your leg and torso to those long fingers, binding you with strong, stretchy skin. Then, finally, imagine using your muscles to flap those enormous hands.Bats, man.As marvelous as bat flight is to behold, the genetic origins of their storied wings has remained murky. However, new findings from an international team of researchers led by Nadav Ahituv, PhD, of the University of California at San Francisco, Nicola Illing, PhD, of the University of Cape Town\xa0in\xa0South Africa\xa0and Katie Pollard, PhD of the UCSF-affiliated Gladstone Institutes has shed new light on how, 50 million years ago, bats took a tetrapod blueprint for arms and legs and went up into the sky.Using a sophisticated set of genetic tools, researchers approached the question of how bats evolved flight by looking not only at which genes were used in the embryonic development of wings, but at what point during development the genes were turned on and off, and — critically — what elements in the genome were regulating the expression of these genes. Genes do not just turn themselves on without input; genetic switches, called enhancers, act to regulate the timing and levels of gene expression in the body.', theme={null}
  "Since flight evolved millions of years ago in all of the groups  that are capable of flight today, we can't observe the changes in behavior and much of the  morphology that the evolution of flight involves. We do have the fossil record, though, and  it is fairly good for the three main groups that evolved true flight. We'll spare you an in-depth description of how each group evolved flight for now;  see the later exhibits for a description of each group and how they developed flight.",
  "It's easy to forget that one in five species of mammal on this planet have wings capable of delivering spectacularly acrobatic flying abilities. Equally incredibly, two-thirds of these 1,200 species of flying mammal can fly in the dark, using exquisite echolocation to avoid obstacles and snatch airborne prey with stunning deftness. These amazing feats have helped make bats the focus not only of folkloric fascination, but also of biological enquiry and mimicry by human engineers from Leonardo da Vinci onwards. Recent research in PLOS journals continues to add surprising new findings to what we know about bats, and how they might inspire us to engineer manmade machines such as drones to emulate their skills. Bats, unlike most birds and flying insects, have relatively heavy wings – something that might appear disadvantageous. But a recent study in PLOS Biology by Kenny Breuer and colleagues shows that bats can exploit the inertia of the wings to make sharp turns that would be near-impossible using aerodynamic forces alone. The authors combined high-speed film of real bats landing upside-down on ceiling roosts with computational modelling to tease apart aerodynamic and inertial effects."],
 ["things, gold and silver, could buy a victory. And this Other Italian cities, inspired by Rome's example, overpowered occupying troops, shut their gates again and invited a second siege. Hannibal could not punish them without dividing his he had no competent leadership to do so, what with one member of",
  'A group of Celts known as the Senone was led through Italy by their commander, Brennus. The Senone Gauls were threatening the nearby town of Clusium, when Roman Ambassadors from the Fabii family were sent to negotiate peace for Clusium. The Romans were notoriously aggressive, and so it is only a little surprising that when a scuffle broke out between the Gauls and Clusians, the Fabii joined in and actually killed a Senone chieftain. The Roman people voted to decide the fate of those who broke the sacred conduct of ambassadors, but the Fabii were so popular that they were instead voted to some of the highest positions in Rome. This absolutely infuriated Brennus and his people and they abandoned everything and headed straight for Rome. Rome was woefully unprepared for this sudden attack. The Gauls had marched with purpose, declaring to all the towns they passed that they would not harm them, they were heading straight for Rome.',
  "Hannibal had no intention to sit and recieve the romans in spain.Hannibal clearly considered the nature of roman power-and came to the conclusion that Rome could only be defeated in Italy.The cornerstone of Rome's power was a strategic manpower base that in theory could produce 7,00,000 infantry and 70,000 cavalry.More than half of this manpower base (4,00,000) was provided by rome's Italian allies,who paid no taxes but had to render military service to rome's armies.Not all were content.Carthage on the other hand rarely used its own citizens for war,bulk of its army being mercenaries.In any case its manpower could never even come close to Rome,the fact that had aided roman victory in the 1st Punic war.Hannibal thus understood that Rome could afford to raise and send army after army to spain and take losses. Meanwhile any carthiginian losses in spain would encourage the recently conquered iberian tribes to defect. The only way to defeat Rome,was to fight in italy itself.By winning battle after battle on italian soil and demonstrating to the italian allies rome's inability to protect them and weakness,he could encourage them to break free of Rome eroding Rome's manpower to sizeable proportions. But there was one problem,his fleet was tiny and Rome ruled the seas.By land,the coastal route would be blocked by Roman forces and her ally-the great walled city of massalia.Hannibal thus resolved to think and do the impossible - move thousands of miles by land through the pyranees mountains,uncharted territory inhabited by the fierce gauls ,then through the Alps mountains and invade italy. Even before the siege of Saguntum had concluded,Hannibal had set things in motion.Having sent a number of embassies to the Gallic tribes in the Po valley with the mission of establishing a safe place for Hannibal to debouch from the Alps into the Po valley. He did not desire to cross this rugged mountain chain and to descend into the Po valley with exhausted troops only to have to fight a battle.Additionally the fierce gauls would provide a source of manpower for Hannibal's army.The romans had recently conquered much territory from the gauls in this area,brutally subjagating them ,seizing their land and redistributing it to roman colonists.Thus securing an alliance proved to be easy. After the sack of Saguntum he dismissed his troops to their own localities."]]
Python Python theme={null}
responses = []
for question, info in zip(questions, info_for_llm):
  system_prompt = "You are RAG researcher. Read the provided contexts and, if relevant, use them to answer the user's question."
  user_prompt = f"""Sources: {info}

Question: {question}"""

completion = openai_client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": system_prompt},
      {"role": "user", "content": user_prompt},
    ]
  )
  response = f"""
  Question: {question}
  Answer: {completion.choices[0].message.content}
  """
  responses.append(response)
Python Python theme={null}
from pprint import pprint # pretty print
pprint(responses)
['\n'  theme={null}
 '  Question: How did bats evolve their wings?\n'
 '  Answer: Recent research has shed new light on how bats evolved their '
 'wings. An international team of researchers used genetic tools to study the '
 'embryonic development of bat wings and the genes involved in their '
 'formation. They also investigated the regulatory elements in the genome that '
 'control the expression of these genes. By analyzing these factors, the '
 'researchers discovered that bats took a tetrapod blueprint for arms and legs '
 'and adapted it to develop wings, allowing them to fly. This research '
 'provides a comprehensive understanding of the genetic origins of bat wings '
 'and how they evolved over 50 million years ago.\n'
 '  ',
 '\n'
 '  Question: How did Rome defend Italy from Hannibal?\n'
 '  Answer: Rome defended Italy from Hannibal by using various strategies. One '
 'of the main defenses relied on the Roman manpower base, which consisted of a '
 'large army made up of Roman citizens and Italian allies who were obligated '
 "to render military service. Rome's strategic manpower base was a cornerstone "
 'of their power, as it could produce a significant number of infantry and '
 'cavalry. This posed a challenge for Hannibal, as Carthage relied heavily on '
 "mercenaries and could not match Rome's manpower.\n"
 '\n'
 'Hannibal realized that in order to defeat Rome, he needed to fight them in '
 'Italy itself. His plan was to win battles on Italian soil and demonstrate '
 "Rome's inability to protect their Italian allies, with the intention of "
 "encouraging them to break free from Rome. This would erode Rome's manpower "
 'base to a sizeable proportion. However, Hannibal faced several obstacles. '
 'Rome ruled the seas, making it difficult for him to transport troops and '
 'supplies by sea. Additionally, the coastal route to Italy would be blocked '
 'by Roman forces and their ally, the walled city of Massalia.\n'
 '\n'
 'To overcome these challenges, Hannibal devised a daring plan. He decided to '
 'lead his troops on a treacherous journey through the Pyrenees mountains, '
 'inhabited by fierce Gauls, and then through the Alps mountains to invade '
 'Italy. He sent embassies to Gallic tribes in the Po valley, securing '
 'alliances and establishing a safe place for his army to enter the Po valley '
 'from the Alps.\n'
 '\n'
 'Overall, Rome defended Italy from Hannibal by leveraging their manpower '
 'base, their control of the seas, and their strategic alliances with Italian '
 'allies. They also had the advantage of better infrastructure and control '
 'over resources within Italy itself. These factors ultimately played a '
 "significant role in Rome's defense against Hannibal's invasion.\n"
 '  ']
Python Python theme={null}
paragraph = """
Georgism, also known as Geoism, is an economic philosophy and ideology named after the American
political economist Henry George (1839–1897).This doctrine advocates for the societal collective,
rather than individual property owners, to capture the economic value derived from land and other
ural resources. To this end, Georgism proposes a single tax on the unimproved value of land, known
as a "land value tax," asserting that this would deter speculative land holding and promote efficient
use of valuable resources. Adherents argue that because the supply of land is fundamentally inelastic,
taxing it will not deter its availability or use, unlike other forms of taxation. Georgism differs
from Marxism and capitalism, underscoring the distinction between common and private property while
largely contending that individuals should own the fruits of their labor."""
query = f"The best academic source about {paragraph} is (paper: "
georgism_search_response = exa.search_and_contents(paragraph, highlights=highlights_options, num_results=5)
Python Python theme={null}
for result in georgism_search_response.results:
    print(result.title)
    print(result.url)
    pprint(result.highlights)
Henry George theme={null}
https://www.newworldencyclopedia.org/entry/Henry_George
["George's theory of interest is nowadays dismissed even by some otherwise "
 'Georgist authors, who see it as mistaken and irrelevant to his ideas about '
 'land and free trade. The separation of the value of land into improved and '
 "unimproved is problematic in George's theory. Once construction has taken "
 'place, not only the land on which such improvements were made is affected, '
 'the value of neighboring, as yet unimproved, land is impacted. Thus, while '
 'the construction of a major attraction nearby may increase the value of '
 'land, the construction of factories or nuclear power plants decreases its '
 'value. Indeed, location is the single most important asset in real estate. '
 'George intended to propose a tax that would have the least negative impact '
 'on productive activity. However, even unimproved land turns out to be '
 'affected in value by productive activity in the neighborhood.']
Wikiwand
https://www.wikiwand.com/en/Georgism
['Georgism is concerned with the distribution of economic rent caused by land '
 'ownership, natural monopolies, pollution rights, and control of the commons, '
 'including title of ownership for natural resources and other contrived '
 'privileges (e.g. intellectual property). Any natural resource which is '
 'inherently limited in supply can generate economic rent, but the classical '
 'and most significant example of land monopoly involves the extraction of '
 'common ground rent from valuable urban locations. Georgists argue that '
 'taxing economic rent is efficient, fair and equitable. The main Georgist '
 'policy recommendation is a tax assessed on land value, arguing that revenues '
 'from a land value tax (LVT) can be used to reduce or eliminate existing '
 'taxes (such as on income, trade, or purchases) that are unfair and '
 'inefficient. Some Georgists also advocate for the return of surplus public '
 "revenue to the people by means of a basic income or citizen's dividend. The "
 'concept of gaining public revenues mainly from land and natural resource '
 'privileges was widely popularized by Henry George through his first book, '
 'Progress and Poverty (1879).']
Henry George
https://www.conservapedia.com/Henry_George
['He argued that land, unlike other factors of production, is supplied by '
 'nature and that rent is unearned surplus. The landless deserve their share '
 'of this surplus as a birthright, according to George. Henry George was born '
 'in Philadelphia, Pennsylvania, on the 2nd of September 1839. He settled in '
 'California in 1858; then later removed to New York in 1880; was first a '
 'printer, then an editor, but finally devoted all his life to economic and '
 'social questions. In 1860, George met Annie Corsina Fox. Her family was very '
 'opposed to the relationship, and in 1861 they eloped. In 1871 he published '
 'Our Land Policy, which, as further developed in 1879 under the title of '
 'Progress and Poverty, speedily attracted the widest attention both in '
 'America and in Europe.']
Georgism - Wikipedia
https://en.wikipedia.org/wiki/Georgism
['A key issue to the popular adoption of Georgism is that homes are illiquid '
 'yet governments need cash every year. Some economists have proposed other '
 'ways of extracting value from land such as building government housing and '
 'selling homes to new buyers in areas of fast-rising land value. The '
 'government would theoretically collect revenue from home sales without much '
 'cost to current homeowners while slowing down land value appreciation in '
 'high-demand areas. Henry George, whose writings and advocacy form the basis '
 'for Georgism Georgist ideas heavily influenced the politics of the early '
 '20th century. Political parties that were formed based on Georgist ideas '
 'include the Commonwealth Land Party in the United States, the Henry George '
 'Justice Party in Victoria, the Single Tax League in South Australia, and the '
 "Justice Party in Denmark. In the United Kingdom, George's writings were "
 'praised by emerging socialist groups in 1890s such as the Independent Labour '
 'Party and the Fabian Society, which would each go on to help form the '
 'modern-day Labour Party.']
Georgism
https://rationalwiki.org/wiki/Georgism
['Even with mostly primitive methods, land values are already assessed around '
 'the world wherever property/council taxes exist, and some municipalities '
 'even collect all their revenue from land values. Though these are '
 'market-based measures, they can still prove difficult and require upfront '
 'investment. Georgists believe that the potential value of land is greater '
 'than the current sum of government spending, since the abolition of taxes on '
 'labor and investment would further increase the value of land. Conversely, '
 'the libertarian strain in Georgism is evident in the notion that their land '
 'tax utopia also entails reducing or eliminating the need for many of the '
 'things governments currently supply, such as welfare, infrastructure to '
 'support urban sprawl, and military & foreign aid spending to secure '
 "resources abroad. Therefore, many Georgists propose a citizen's dividend. "
 'This is a similar concept to basic income but its proponents project its '
 'potential to be much larger due to supposedly huge takings from the land '
 'tax, combined with lowered government spending. It has been recognized since '
 'Adam Smith and David Ricardo that a tax on land value itself cannot be '
 'passed on to tenants, but instead would be paid for by the owners of the '
 'land:']
```

Using Exa, we can easily find related papers, either for further research or to provide a source for our claims. This is just a brief intro into what Exa can do. For a look at how you can leverage getting full contents, check out [Contents Retrieval](/reference/contents-retrieval).

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

Example 3 (unknown):
```unknown
Now, let's give the context we got to our LLM so it can answer our questions with solid sources backing them up!
```

Example 4 (unknown):
```unknown

```

---

## Company Analyst

**URL:** llms-txt#company-analyst

**Contents:**
- What this doc covers
- Shortcomings of Google
- What is neural search?
- Finding companies with Exa link similarity search

Source: https://docs.exa.ai/examples/company-analyst

Example project using the Exa Python SDK.

## What this doc covers

1. Using Exa's link similarity search to find related links
2. Using the keyword search setting with Exa search\_and\_contents

In this example, we'll build a company analyst tool that researches companies relevant to what you're interested in. If you just want to see the code, check out the [Colab notebook](https://colab.research.google.com/drive/1VROD6zsaDh%5FrSmogSpSn9FJCwmJO8TSi?here).

The code requires an [Exa API key](https://dashboard.exa.ai/api-keys) and an [OpenAI API key](https://platform.openai.com/api-keys). Get 1000 free Exa searches per month just for [signing up](https://dashboard.exa.ai/overview)!

## Shortcomings of Google

Say we want to find companies similar to [Thrifthouse](https://thrift.house/), a platform for selling secondhand goods on college campuses. Unfortunately, googling “[companies similar to Thrifthouse](https://www.google.com/search?q=companies+similar+to+Thrifthouse)” doesn't do a very good job. Traditional search engines rely heavily on keyword matching. In this case we get results about physical thrift stores. Hm, that's not really what I want.

Let’s try again, this time searching based on a description of the company, like by googling “[community based resale apps](https://www.google.com/search?q=community+based+resale+apps).” But, this isn’t very helpful either and just returns premade SEO-optimized listicles...

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7133ae74e708901dd17d9b1e0f4c25c1" alt="" data-og-width="654" width="654" data-og-height="515" height="515" data-path="images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=badf43280108843fd4a047d1bdcd62da 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=cef395cc2b26206902fc0ad1abcad0ad 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=86837175f02cab137664afd6d45ad425 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=0f3a75f2230ba7ac1856f569e05c41b7 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=0b1696a298521427899e461a807008b1 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/0bb023a-Screenshot_2024-02-06_at_11.22.28_AM.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=9656bf46109f45e89eb29655a0255d7e 2500w" />

What we really need is neural search.

## What is neural search?

Exa is a fully neural search engine built using a foundational embeddings model trained for webpage retrieval. It’s capable of understanding entity types (company, blog post, Github repo), descriptors (funny, scholastic, authoritative), and any other semantic qualities inside of a query. Neural search can be far more useful than traditional keyword-based searches for these complex queries.

## Finding companies with Exa link similarity search

Let's try Exa, using the Python SDK! We can use the`find_similar_and_contents` function to find similar links and get contents from each link. The input is simply a URL, [https://thrift.house](https://thrift.house) and we set `num_results=10`(this is customizable up to thousands of results in Exa).

By specifying `highlights={"num_sentences":2}` for each search result, Exa will also identify and return a two sentence excerpt from the content that's relevant to our query. This will allow us to quickly understand each website that we find.

This is an example of the full first result:

And here are the 10 titles and URLs I got:

```Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
This is an example of the full first result:
```

Example 2 (unknown):
```unknown
And here are the 10 titles and URLs I got:
```

---

## doing an example with the first companies

**URL:** llms-txt#doing-an-example-with-the-first-companies

**Contents:**
- Creating a report with LLMs

c = companies[0]
all_contents = ""
search_response = exa.search_and_contents(
  c.url, # input the company's URL
  type="keyword",
  num_results=5
)
research_response = search_response.results
for r in research_response:
  all_contents += r.text

<div><div><div><div><p><a href="https://www.rumieapp.com/"></a></p></div><div><p>The <strong>key</strong> to <strong>your</strong> college experience. </p><p><br/>Access the largest college exclusive marketplace to buy, sell, and rent with other students.</p></div></div><div><h2>320,000+</h2><p>Users in Our Network</p></div><div><div><p><h2>Selling is just a away.</h2></p><p>Snap a pic, post a listing, and message buyers all from one intuitive app.</p><div><p></p><p>Quick setup and .edu verification</p></div><div><p></p><p>Sell locally or ship to other campuses</p></div><div><p></p><p>Trade with other students like you</p></div></div><div><p><h2>. From local businesses around your campus</h2></p><h4>Get access to student exclusive discounts</h4><p>rumie students get access to student exclusive discounts from local and national businesses around their campus.</p></div></div><div><p><h2>Rent dresses from   </h2></p><p>Wear a new dress every weekend! Just rent it directly from a student on your campus.</p><div><p></p><p>Make money off of the dresses you've already worn</p></div><div><p></p><p>rumie rental guarantee ensures your dress won't be damaged</p></div><div><p></p><p>Find a new dress every weekend and save money</p></div></div><div><p><h2>. The only place to buy student tickets at student prices</h2></p><h4>Buy or Sell students Football and Basketball tickets with your campus</h4><p>rumie students get access to the first-ever student ticket marketplace. No more getting scammed trying to buy tickets from strangers on the internet.</p></div><div><div><div><p></p><h4>Secure</h4><p>.edu authentication and buyer protection on purchases.</p></div><div><p></p><h4>Lightning-fast</h4><p>Post your first listing in under a minute.</p></div><div><p></p><h4>Verified Students</h4><p>Trade with other students, not strangers.</p></div><div><p></p><h4>Intuitive</h4><p>List an item in a few simple steps. Message sellers with ease.</p></div></div><p><a href="https://apps.apple.com/us/app/rumie-college-marketplace/id1602465206">Download the app now</a></p></div><div><p><h2>Trusted by students.</h2></p><div><div><p></p><p>Saves me money</p><p>Facebook Marketplace and Amazon are great but often times you have to drive a long way to meet up or pay for shipping. rumie let’s me know what is available at my school… literally at walking distance. </p></div><div><p></p><p>5 stars!</p><p>Having this app as a freshman is great! It makes buying and selling things so safe and easy! Much more efficient than other buy/sell platforms!</p></div><div><p></p><p>Amazing!</p><p>5 stars for being simple, organized, safe, and a great way to buy and sell in your college community.. much more effective than posting on Facebook or Instagram!</p></div><div><p></p><p>The BEST marketplace for college students!!!</p><p>Once rumie got to my campus, I was excited to see what is has to offer! Not only is it safe for students like me, but the app just has a great feel and is really easy to use. The ONLY place I’ll be buying and selling while I’m a student.</p></div></div></div><div><p><h2>Easier to than GroupMe or Instagram.</h2></p><p>Forget clothing instas, selling groupme's, and stress when buying and selling. Do it all from the rumie app.</p></div></div></div>
Python python theme={null}
import textwrap
import openai
import os

SYSTEM_MESSAGE = "You are a helpful assistant writing a research report about a company. Summarize the users input into multiple paragraphs. Be extremely concise, professional, and factual as possible. The first paragraph should be an introduction and summary of the company. The second paragraph should include pros and cons of the company. Things like what are they doing well, things they are doing poorly or struggling with. And ideally, suggestions to make the company better."
openai.api_key = os.environ.get("OPENAI_API_KEY")

completion = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": SYSTEM_MESSAGE},
        {"role": "user", "content": all_contents},
    ],
)

summary = completion.choices[0].message.content

print(f"Summary for {c.url}:")
print(textwrap.fill(summary, 80))

Summary for https://www.rumieapp.com/:
Rumie is a college-exclusive marketplace app that allows students to buy, sell,
and rent items with other students. It has over 320,000 users in its network and
offers features such as quick setup, .edu verification, local and campus-wide
selling options, and exclusive discounts from local businesses. Students can
also rent dresses from other students, buy or sell student tickets at student
prices, and enjoy secure and intuitive transactions. The app has received
positive feedback from users for its convenience, safety, and effectiveness in
buying and selling within the college community.

Pros of Rumie include its focus on college students' needs, such as providing a
safe platform and exclusive deals for students. The app offers an intuitive and
fast setup process, making it easy for students to start buying and selling.
The option to trade with other students is also appreciated. Users find it convenient
that they can sell locally or ship items to other campuses. The app's rental
guarantee for dresses provides assurance to users that their dresses won't be
damaged. Overall, Rumie is highly regarded as a simple, organized, and safe
platform for college students to buy and sell within their community.
Suggestions to improve Rumie include expanding its reach to more colleges and
universities across the nation and eventually internationally. Enhancing
marketing efforts and fundraising can aid in raising awareness among college
students. Additionally, incorporating features such as improved search filters
and a rating/review system for buyers and sellers could enhance the user
experience. Continual updates and improvements to the app's interface and
functionality can also ensure that it remains user-friendly and efficient.
```

And we’re done! We’ve built an app that takes in a company webpage and uses Exa to

1. Discover similar startups
2. Find information about each of those startups
3. Gather useful content and summarize it with OpenAI

Hopefully you found this tutorial helpful and are ready to start building your very own company analyst! Whether you want to generate sales leads or research competitors to your own company, Exa's got you covered.

**Examples:**

Example 1 (unknown):
```unknown
Here's an example of the first result for the first company, Rumie App. You can see the first result is the actual link contents itself.
```

Example 2 (unknown):
```unknown
## Creating a report with LLMs

Finally, let's create a summarized report that lists our 10 companies and gives us an easily digestible summary of each company. We can input all of this web content into an LLM and have it generate a nice report!
```

Example 3 (unknown):
```unknown

```

---

## Now, import the Exa class and pass your API key to it.

**URL:** llms-txt#now,-import-the-exa-class-and-pass-your-api-key-to-it.

from exa_py import Exa

my_exa_api_key = "YOUR_API_KEY_HERE"
exa = Exa(my_exa_api_key)
Python Python theme={null}
result = exa.search_and_contents(
  "Here is an innovative climate technology company",
  type="neural",
  num_results=10,
  text=True,
	include_text=["GmbH"]
)

"title": "Sorption Technologies |",
			"id": "https://sorption-technologies.com/",
			"url": "https://sorption-technologies.com/",
			"publishedDate": "2024-02-10",
			"author": null,
			"text": ""
		},
		{

"title": "FenX | VentureRadar",
			"id": "https://www.ventureradar.com/organisation/FenX/364b6fb7-0033-4c88-a4e9-9c3b1f530d72",
			"url": "https://www.ventureradar.com/organisation/FenX/364b6fb7-0033-4c88-a4e9-9c3b1f530d72",
			"publishedDate": "2023-03-28",
			"author": null,
			"text": "Follow\n\nFollowing\n\nLocation: Switzerland\n\nFounded in 2019\n\nPrivate Company\n\n\"FenX is a Spinoff of ETH Zurich tackling the world’s energy and greenhouse gas challenges by disrupting the building insulation market. Based on a innovative foaming technique, the company produces high-performance insulation foams made from abandoned waste materials such as fly ash from coal power stations. The final products are fully recyclable, emit low CO2 emissions and are economically competitive.\"\n Description Source: VentureRadar Research / Company Website\n\nExport Similar Companies Similar Companies\n\nCompany \n Country\n Status\n Description\n\nVecor Australia Australia n/a Every year the world’s coal-fired power stations produce approximately 1 billion tonnes of a very fine ash called fly ash. This nuisance ash, which resembles smoke, can be... MCC Technologies USA Private MCC Technologies builds, owns and operates processing plants utilizing coal fly ash waste from landfills and ash ponds. The company processes large volumes of low-quality Class F... Climeworks GmbH Switzerland Private Climeworks has developed an ecologically and economically attractive method to extract CO2 from ambient air. Our goal is to deliver CO2 for the production of synthetic liquid... Errcive Inc USA Private The company is involved in developing a novel fly ash based material to mitigate exhaust pollution. The commercial impact of the work is to allow: the reduction of exhaust fumes... 4 Envi Denmark n/a Danish 4 Envi develops a system for the cleaning and re-use of biomass-fuelled plant’s fly ash. After cleaning, the ash and some of its components can be reused as fertilizers,... Neolithe France n/a Néolithe wants to reduce global greenhouse gas emissions by 5% by tackling a problem that concerns us all: waste treatment! They transform non-recyclable waste into aggregates...\n\nShow all\n\nWebsite Archive\n\nInternet Archive snapshots for |\n\nhttps://fenx.ch/\n\nThe archive allows you to go back in time and view historical versions of the company website\n\nThe site\n\nhttps://fenx.ch/\n\nwas first archived on\n\n4th Jul 2019\n\nIs this your company? Claim this profile andupdate details for free\n\nSub-Scores\n\nPopularity on VentureRadar\n\nWebsite Popularity\n\nLow Traffic Sites\n Low\n\nHigh Traffic Sites\n High\n\nAlexa Global Rank:\n\n3,478,846 | \n fenx.ch\n\nAuto Analyst Score\n\n68\n\nAuto Analyst Score:\n 68 | \n fenx.ch\n\nVentureRadar Popularity\n\nHigh\n\nVentureRadar Popularity:\n High The popularity score combines profile views, clicks and the number of times the company appears in search results.\n\nor\n\nTo continue, please confirm you\n are not a robot"
		},
		{

"title": "intelligent fluids | LinkedIn",
			"id": "https://www.linkedin.com/company/intelligentfluids",
			"url": "https://www.linkedin.com/company/intelligentfluids",
			"publishedDate": "2023-06-08",
			"author": null,
			"text": "Sign in to see who you already know at intelligent fluids GmbH (SMARTCHEM)\n\nWelcome back\n\nEmail or phone\n\nPassword\n\nForgot password?\n\nor\n\nNew to LinkedIn? Join now\n\nor\n\nNew to LinkedIn? Join now"
		},
		{

"title": "justairtech GmbH – Umweltfreundliche Kühlsysteme mit Luft als Kältemittel",
			"id": "https://www.justairtech.de/",
			"url": "https://www.justairtech.de/",
			"publishedDate": "2024-06-13",
			"author": null,
			"text": "decouple cooling from climate change with air as refrigerant.\n\nWir entwickeln eine hocheffziente Kühlanlage, die Luft als Kältemittel verwendet. Wieso? Die Welt verändert sich tiefgreifender und schneller als in allen Generationen vor uns. Wir sehen darin nicht nur eine Bedrohung, sondern begreifen dies auch als Chance, Prozesse nachhaltig zu gestalten.\n\nUnsere Arbeit konzentriert sich auf die Revolutio­nie­rung der Kühlung für Ziel­tempera­turen von 0–40 °C bei beliebiger Umwelt­temperatur. Dabei verwenden wir Luft als Kältemittel.\n\nzielgruppe\n\nDer globale Kühlbedarf macht aktuell 10% des weltweiten Strom­bedarfs aus und steigt rasant an. Es werden zwischen 2020 und 2070 knapp 10 Klima­anlagen pro Sekunde verkauft (viele weitere Zahlen und Statistiken rund um das Thema Kühlung findest Du bei der International Energy Agency ) . Mit unserer Technologie können wir verhindern, dass der Strom­verbrauch und die CO2-Emissionen propor­tional mit der Anzahl der verkauften Anlagen wächst.\n\nWir entwickeln eine Technologie, die 4–5 mal so effizient wie konventio­nelle Kühlanlagen arbeitet. Außerdem verwendet sie Luft als Kühlmittel. Luft ist ein natürliches Kältemittel, ist unbegrenzt frei verfügbar und hat ein Global Warming Potential von 0 (mehr zu natürlichen Kältemittel bei der Green Cooling Initiative) . Der Einsatz von Luft als Kältemittel ist nicht neu, aber mit konventio­nellen Anlagen im Ziel­temperatur­bereich nicht wettbewerbs­fähig umsetzbar. Unser erstes Produkt wird für die Kühlung von Rechen­zentren ausgelegt. Weitere Produkte im Bereich der gewerblichen und industriellen Kälte­erzeugung werden folgen.\n\nroadmap\n\n06/2020 \n Q4 2020 erste Seed-Finanzierungsrunde Q4 2020 \n 10/2020 erste Patentanmeldungen 10/2020 \n Q4 2021 zweite Seed-Finanzierungsrunde Q4 2021 \n Q4 2021 erste Patenterteilungen beantragt Q4 2021 \n 05/2022 Prototyp des fraktalen Wärmetauschers 05/2022 \n Q3 2022 Start-Up-Finanzierungsrunde Q3 2022\n\nQ4 2023 per CCS ausgeblendet Q4 2023 \n Q4 2023 physischer Anlagenprototyp Q4 2023 \n Q3 2024 Serienüberleitung und Beta-Tests Q3 2024 \n Q3 2025 \n ab 2025\n\nour core values\n\nWe love innovation. And disruption is even better! Failing is part of the game, but we are curious and continuous learners. \n We help and enable each other. Cooperative interaction with our clients, our partners and our colleagues is central. \n We are pragmatic. Our goals always remain our focus. We are dedicated team players. \n We interact respectfully. With each other and our environment.\n\nteam\n\nGerrit Barth Product Development & Technology \n Anna Herzog Head of Sales & Marketing, PR \n Bikbulat Khabibullin Product Development & Technology\n\nJohannes Lampl Product Development & Technology \n Anne Murmann Product Development & Technology \n Jens Schäfer Co-Founder and CEO\n\nHolger Sedlak Inventor, Co-Founder and CTO \n Adrian Zajac Product Development & Technology\n\nstellenangebote\n\npartner & förderungen"
		},
		{

"title": "Let’s capture CO2 and tackle climate change",
			"id": "https://blancair.com/",
			"url": "https://blancair.com/",
			"publishedDate": "2023-03-01",
			"author": null,
			"text": "Let’s capture CO2 and tackle climate change\n\nWe need to keep global warming below 1.5°C. This requires a deployment of Negative Emission Technologies (NETs) of around 8 Gt of CO2 in 2050. Natural Climate solutions cannot do it alone.Technology has to give support. BLANCAIR can turn back human-emitted carbon dioxide from our atmosphere by capturing it and sequestering it back into the planet.\n\nGet to know us, our Hamburg team, partnerships and network\n\nTake a look at the BLANCAIR technology, our milestones & our next goals\n\nJoin our BLANCAIR team & help us to fight climate change!"
		},
		{

"title": "bionero - Der Erde zuliebe. Carbon Removal | Terra Preta",
			"id": "https://www.bionero.de/",
			"url": "https://www.bionero.de/",
			"publishedDate": "2023-10-28",
			"author": null,
			"text": "Mehr Wachstum. Echter Klimaschutz. bionero ist eines der ersten Unternehmen weltweit, das zertifiziert klimapositiv arbeitet. Das Familienunternehmen, das in der Nähe von Bayreuth beheimatet ist, stellt qualitativ höchstwertige Erden und Substrate her, die durch das einzigartige Produktionsverfahren aktiv CO2 aus der Atmosphäre entziehen und gleichzeitig enorm fruchtbar sind. Aus Liebe und der Ehrfurcht zur Natur entwickelte bionero ein hochmodernes, industrialisiertes Verfahren, das aus biogenen Reststoffen eine höchstwertige Pflanzenkohle herstellt und zu fruchtbaren Schwarzerden made in Germany verwandelt. Hier kannst du bionero im Einzelhandel finden Wir liefern Gutes aus der Natur, für die Natur. Terra Preta (portugiesisch für \"Schwarze Erde\") gilt als \"wiederentdeckte Wundererde\". Sie wurde vor circa 40 Jahren in den Tiefen des Amazonasgebiets entdeckt und intensiv erforscht. Das Besondere an ihr ist ihre Fruchtbarkeit. Tatsächlich gilt dieser Boden als der fruchtbarste unseres Planeten. bionero hat gemeinsam mit Professor Bruno Glaser, einem weltweit anerkannten Experten für Terra Preta, das Herstellungsverfahren dieser besonderen Erde transformiert, optimiert und industrialisiert. Der wesentliche Wirk- und Inhaltsstoff ist eine sog. Pflanzenkohle. Sie sorgt dank ihrer enorm großen spezifischen Oberfläche für optimale Nährstoff- und Wasserspeicherfähigkeiten im Boden und bietet zusätzlich Lebensraum für wertvolle Mikroorganismen. Das Ergebnis ist ein stetiger Humusaufbau und eine dauerhafte Bodenfruchtbarkeit. Das Einzigartige an bionero? Die bionero Wertschöpfungskette ist vollständig klimapositiv! bioneros Produkte bieten einer Branche, die stark in die Kritik geraten ist, einen Weg in eine nachhaltige Zukunft. Während der Herstellung unserer hochwertigen Terra Preta leisten wir einen aktiven Beitrag zum Klimaschutz. Durch die Produktion unserer wichtigsten Zutat, der Pflanzenkohle, wird dem atmosphärischen Kohlenstoffkreislauf aktiv Kohlenstoff entzogen. Der Kohlenstoff, welcher anfangs in den biogenen Reststoffen gespeichert war, wird während des Pyrolyseprozesses für mehrere Jahrtausende in der Pflanzenkohle fixiert und gelangt somit nicht als Kohlenstoffdioxid zurück in unsere Atmosphäre. Das Erstaunliche: Die Pflanzenkohle entzieht der Atmosphäre das bis zu dreieinhalbfache ihres Eigengewichts an CO2! Die entstandenen Kohlenstoffsenken sind dabei transparent quantifizierbar und zertifiziert. Tatsächlich vereint bionero als erstes Unternehmen weltweit alle notwendigen Verfahrensschritte zu einer echten Kohlenstoffsenke gemäß EBC. Der Kohlenstoff ist am Ende der bionero Wertschöpfungskette in einer stabilen Matrix fixiert. Torf ist bis heute der meistgenutzte Rohstoff bei der Herstellung von Pflanzsubstraten. Schon beim Abbau werden Unmengen an CO2 freigesetzt. Moore sind einer der wichtigsten Kohlenstoff-Speicher unseres Planeten. Moore speichern 700 Tonnen Kohlenstoff je Hektar, sechsmal mehr als ein Hektar Wald! Durch die Trockenlegung und den Abbau für die Gewinnung von Torf können diese gewaltigen Mengen Kohlenstoff wieder zu CO2-reagieren und gelangen in die Atmosphäre. Hinzu kommen enorm weite Transportwege. Der Torfabbau findet zu großen Teilen in Osteuropa statt. Um einerseits die natürlichen Ökosysteme zu schützen und andererseits lange Transportwege zu vermeiden, setzen wir auf regional anfallende Roh- und Reststoffe. In langen Reifeprozessen verarbeiten wir natürliche Reststoffe zu hochwertigen Ausgangsstoffen für unsere Produkte. Bei der Auswahl aller Inputstoffe schauen wir genau hin und arbeiten nach dem Prinzip “regional, nachhaltig, umwelt- und klimaschonend“. Nur, wenn diese Voraussetzungen ausnahmslos gewährleistet sind, findet ein Rohstoff letztlich seinen Weg in unsere Produkte. bionero - Mehr Wachstum. Echter Klimaschutz. Erhalte spannende Einblicke in die Abläufe unseres Start-Ups und unsere hochmodernen Verfahren. Hier gibt es die neuesten Trends, aktuelle Tipps, hilfreiche Pflanz- und Pflegeanleitungen und interessante Videos."
		},
		{

"title": "Green City Solutions",
			"id": "https://www.greentalents.de/green-city-solutions.php",
			"url": "https://www.greentalents.de/green-city-solutions.php",
			"publishedDate": "2022-04-12",
			"author": null,
			"text": "In their devices, called CityTrees, they combine the natural ability of moss to clean and cool the air with Internet of Things technology to control irrigation and ventilation. In March 2014, Green City Solutions GmbH was founded by Peter Sänger and his friend Liang Wu in Dresden. They set up a team of young experts from the fields of horticulture/biology, computer science, architecture, and mechanical engineering. The knowledge of the individuals was bundled to realise a device that combines nature and technology: the CityTree.\n\nThe living heart of CityTrees is moss cultivated on hanging textile mats. The moss mats are hidden behind wooden bars that provide sufficient shade for these plants, which naturally grow mainly in forests. Sensors are measuring various parameters such as temperature, humidity, and concentration of particulates. This data is used to regulate ventilation and irrigation. Behind the moss mats are large vents that create an airflow through the moss. In this way, the amount of air cleaned by the device can be increased when pollution levels are high, such as during rush hours.\n\nGreen City Solutions collaborates with several partners in Germany and abroad. Scientific partners include the Leibniz Institute for Tropospheric Research (TROPOS) and the Dresden University of Applied Sciences (HTW Dresden), both located in Germany. Green City Solutions has been awarded the Seal of Excellence by the European Commission. This is a European Union quality label for outstanding ideas worthy of funding.\n\nThe work of Green City Solutions mainly contributes to the Sustainable Development Goals 3, 11, 13, and 15:"
		},
		{

"title": "No.1 DAC manufacturer from Germany - DACMA GmbH",
			"id": "https://dacma.com/",
			"url": "https://dacma.com/",
			"publishedDate": "2024-03-02",
			"author": null,
			"text": "Reach net zero goal with BLANCAIR by DACMA – a proven direct air capture technology with maximum CO2 uptake and minimal energy demand.\n\nDACMA GmbH, headquartered in Hamburg, Germany, is a pioneering DAC manufacturer with cutting-edge technology. With a proven track record, our first machines were delivered in 2023. Our scalable design reaches gigaton capacities, ensuring high CO2 uptake with minimal energy demand.\n\nGet to know us, our team, partnerships and network\n\nLearn more about the status quo of DAC technologies and our BLANCAIR solution\n\nJoin our DACMA team – help us to reach net zero and fight climate change!\n\nWhy BLANCAIR by DACMA:\n\nNo.1 DAC manufacturer from Germany – leveraging decades of aerospace – innovation\n\nDeliverable: proven technology in the market\n\nInterchangeable adsorbents for continuous performance improvement\n\nPatented reactor design with optimized air flow\n\nUniversal application for different climate conditions\n\n“In just one year, DACMA GmbH have achieved an exponential progress in the atmospheric carbon capture journey. The strategic alliance with Repsol (both in Venturing Capital and projects) will boost the pace of this highly focused group of outstanding engineers that are persistently looking for every angle of the technology improvement. Take the time to celebrate, acknowledge your success and keep going!!!”\n\n“One of the most relevant projects related to the development of technologies with a negative CO2 effect, the ONLY project in Brazil on Direct Air Capture multi-country Spain, Brazil Germany in Open Innovation. Repsol Sinopec Brazil Corporation, Start Up DACMA and PUC Rio Grande do Sul University. A disruptive commitment to a more decarbonized world. Being part of this project is a privilege and a unique opportunity to add value to society.”\n\n“In collaboration with Phoenix Contact, DACMA has developed an application that contributes to CO2 decarbonization. This technology makes a significant contribution to sector coupling in the All Electric Society and to the sustainable use of energy. I am delighted that two technology-driven companies are working together so efficiently.”\n\n“The DACMA GmbH with Jörg Spitzner and his team are not only valuable partners in our network, but also key initiators and innovators who, with BLANCAIR, are driving forward DAC system engineering in the Hamburg metropolitan region – an essential future climate change mitigation technology.”\n\n“Together with our partner DACMA GmbH, we are delighted to be building the first DAC machine on the HAMBURG BLUE HUB site in the Port of Hamburg. The 30-60 tons output of CO2 annually of the BLANCAIR machine can later be used to produce e-methanol for the Port of Hamburg, for example. This is a joint milestone, as it fits in with the plan to purchase large volumes of synthetic fuels from Power-to-X plants in Africa and South America for Germany through the HAMBURG BLUE HUB”.\n\nBacked by strong investors & partners:\n\nassociations & supporters:"
		},
		{

"title": "Heatrix GmbH Decarbonizing Industry – We decarbonize high temperature industrial heat.",
			"id": "https://heatrix.de/",
			"url": "https://heatrix.de/",
			"publishedDate": "2024-02-28",
			"author": null,
			"text": "Our mission\n\nis to competitively replace fossil fuels in energy intensive industriesby converting renewable electricity into storable, high-temperature process heat.\n\n11% of global CO2 emissions is caused byhigh-temperature industrial heat.\n\nNo carbon-neutral, cost-competitive and easy\nto\nintegrate solution exists yet.\n\n11%\nof global CO2 emissions is caused by\nhigh-temperature industrial heat.\n\nNo carbon-neutral, cost-competitive and easy\nto integrate solution exists yet.\n\nOur solution\n\nThe Heatrix system combines an electric heater, utilizing off-grid solar or wind \nelectricity, with a thermal energy storage to provide continuous high-temperature \nprocess heat. With an outlet temperature of up to 1500 °C, Heatrix has the potential to \ndecarbonize the majority of high emission industries.\n\nHeatrix technology perfectly fulfils customers' \nrequirements – CO2 free continuous and easily integrated process heat at competitive cost.\n\nCarbon-free green heat, \nreducing CO2 emissions \n up to 100%\n\nProcess heat (hot air) \nup to 1500 °C\n\nThermal storage up\n to 20 hours to \ndeliver green heat 24/7\n\nHigh efficiency up \nto 90% based on \nresistance heating\n\nCost competitive vs. \nfossil fuels and substantially \ncheaper than green hydrogen\n\nModular container\nsystem enables \neasy scalability\n\nEasy integration \nwith minimal \nretrofitting needs\n\nApplications for Heatrix\n\nCalcination\n\nReplacing fossil fuel burners and reducing fuel consumption in calcination processes by integrating Heatrix heat to shaft calciners or precalciners of rotary kilns.\n\nHeat Treatment\n\nInducing required process temperatures via hot air flow from Heatrix replacing fossil fuel burners in heat treatment ovens.\n\nSintering & Pelletization\n\nReduced fuel gas & coke usage by providing Heatrix heat to sintering or pelletization plants.\n\nPreheating\n\nCombined with existing burner system, Heatrix technology can be used to preheat materials and reduce fuel consumption in the actual process.\n\nThis is us\n\nStrategy & Operations\n\nInnovator / Inventor / Sold first tech start-up in 2021 / Ph.D. from RWTH Aachen\n\nTechnology & Product\n\nTech Lead / Fluid dynamics expert / Energy technologies / Ph.D. from University Bremen\n\nBusiness & Finance\n\n2nd-time Founder / former VC-Investor / MBA from Tsinghua, MIT & HEC Paris\n\nContact us\n\nLooking for more information about Heatrix and our technology? We’d love to get in touch!\n\nHeatrix ensures defensibility through modular product, ease of integration, technological advantages and compelling business model.\n\nModular Product\n\n• Avoids individual design process – fits in standard containers• Industry-agnostic solution• Modular configuration to meet customer needs\n\nEasy Interaction\n\n• Rapid deployment• Focus on minimal plant downtime• Compatible to back-up for guaranteed production\n\nBusiness Model\n\n• Ongoing customer relationship and revenue \n• Large growth potential\n• Maximal impact on CO2\nreduction\n\nTechnical Advantage\n\n• Unique system design integrating electric heater and thermal storage \n• IP application in preparation for unique heater and storage design"
		},
		{

"title": "vabeck® GmbH - Grüne Prozesstechnik für den Umweltschutz",
			"id": "https://www.vabeck.com/en",
			"url": "https://www.vabeck.com/en",
			"publishedDate": "2022-01-01",
			"author": null,
			"text": ""
		}
	],
	"requestId": "a02fd414d9ca16454089e8720cd6ed2b"
}
```

Nice! On inspection, these results include companies located in Hamburg, Munich and other close by European locations. This example can be extended to any key phrase - have a play with filtering via [other company suffixes - ](https://en.wikipedia.org/wiki/List%5Fof%5Flegal%5Fentity%5Ftypes%5Fby%5Fcountry) and see what interesting results you get back!

**Examples:**

Example 1 (unknown):
```unknown
Make a query, in this example searching for the most innovative climate tech companies. To use Phrase Filters, specify a string corresponding to the `includeText` input parameter
```

Example 2 (unknown):
```unknown
Which outputs:
```

---

## Enable only web search

**URL:** llms-txt#enable-only-web-search

npx exa-mcp-server --tools=web_search_exa

---

## Set up OpenAI' SDK

**URL:** llms-txt#set-up-openai'-sdk

from openai import OpenAI

openai_api_key = "YOUR_API_KEY_HERE"
openai_client = OpenAI(api_key=openai_api_key)
Python Python theme={null}

questions = [
    "How did bats evolve their wings?",
    "How did Rome defend Italy from Hannibal?",
]
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
Now, we just need some questions to answer!
```

Example 2 (unknown):
```unknown
While LLMs can answer some questions on their own, they have limitations:

* LLMs don't have knowledge past when their training was stopped, so they can't know about recent events
* If an LLM doesn't know the answer, it will often 'hallucinate' a correct-sounding response, and it can be difficult and inconvenient to distinguish these from correct answers
* Because of the opaque manner of generation and the problems mentioned above, it is difficult to trust an LLM's responses when accuracy is [important](https://www.forbes.com/sites/mollybohannon/2023/06/08/lawyer-used-chatgpt-in-court-and-cited-fake-cases-a-judge-is-considering-sanctions/?sh=27194eb67c7f)

Robust retrieval helps solve all of these issues by providing quality sources of ground truth for the LLM (and their human users) to leverage and cite. Let's use Exa to get some information to answer our questions:
```

---

## New approach

**URL:** llms-txt#new-approach

**Contents:**
- Need More Information?

result = exa.get_contents(["https://example.com"])
for status in result.statuses:
    if status.status == "error":
        print(f"Error for {status.id}: {status.error.tag} ({status.error.httpStatusCode})")
```

## Need More Information?

If you'd like more information about the status of a crawl or have specific use cases that require additional status details, please contact us at [hello@exa.ai](mailto:hello@exa.ai) with your use case.

---

## LangChain Docs

**URL:** llms-txt#langchain-docs

Source: https://docs.exa.ai/integrations/langchain-docs

Learn how to use Exa's search API with LangChain. LangChain has a dedicated Exa tool. This enables AI agents to perform web search.

For detailed instructions on using Exa with LangChain, visit the [LangChain documentation](https://python.langchain.com/v0.2/docs/integrations/tools/exa_search/#using-the-exa-sdk-as-langchain-agent-tools).

---

## Auto search as Default

**URL:** llms-txt#auto-search-as-default

**Contents:**
- What This Means for You
- Quick Example

Source: https://docs.exa.ai/changelog/auto-search-as-default

Auto search, which intelligently combines Exa's proprietary neural search with traditional keyword search, is now the default search type for all queries.

The change to Auto search as default leverages the best of both Exa's proprietary neural search and industry-standard keyword search to give you the best results. Out of the box, Exa now automatically routes your queries to the best search type.

<Info>
  Read our documentation on Exa's different search types [here](/reference/exas-capabilities-explained).
</Info>

## What This Means for You

1. **Enhanced results**: Auto search automatically routes queries to the most appropriate search type (neural or keyword), optimizing your search results without any extra effort on your part.
2. **No Action required**: If you want to benefit from Auto search, you don't need to change anything in your existing implementation. It'll just work!
3. **Maintaining current behavior**: If you prefer to keep your current search behavior, here's how:
   * For neural search: Just set `type="neural"` in your search requests.
   * For keyword search: As always, add `type="keyword"` to your search requests.

Here's what this means for your code when default switches over:

```Python Python theme={null}

---

## Delete an Item

**URL:** llms-txt#delete-an-item

Source: https://docs.exa.ai/websets/api/websets/items/delete-an-item

delete /v0/websets/{webset}/items/{id}
Deletes an Item from the Webset.

This will cancel any enrichment process for it.

---

## Event Types

**URL:** llms-txt#event-types

**Contents:**
- Webset
- Search
- Item
- Import
- Monitor

Source: https://docs.exa.ai/websets/api/events/types

Learn about the events that occur within the Webset API

The Websets API uses events to notify you about changes in your Websets. You can monitor these events through our [events endpoint](/websets/api/events/list-all-events) or by setting up [webhooks](/websets/api/webhooks/create-a-webhook).

Events are retained for 60 days before being automatically deleted.

* `webset.created` - Emitted when a new Webset is created.
* `webset.deleted` - Emitted when a Webset is deleted.
* `webset.paused` - Emitted when a Webset's operations are paused.
* `webset.idle` - Emitted when a Webset has no running operations.

* `webset.search.created` - Emitted when a new search is initiated.
* `webset.search.updated` - Emitted when search progress is updated.
* `webset.search.completed` - Emitted when a search finishes finding all items.
* `webset.search.canceled` - Emitted when a search is manually canceled.

* `webset.item.created` - Emitted when a new item has been added to the Webset.
* `webset.item.enriched` - Emitted when an item's enrichment is completed.

* `import.created` - Emitted when a new import is initiated.
* `import.completed` - Emitted when an import has been completed.

* `monitor.created` - Emitted when a new monitor is created.
* `monitor.updated` - Emitted when a monitor's configuration is updated.
* `monitor.deleted` - Emitted when a monitor is deleted.
* `monitor.run.created` - Emitted when a monitor run starts.
* `monitor.run.completed` - Emitted when a monitor run finishes.

* A unique `id`
* The event `type`
* A `data` object containing the full resource that triggered the event
* A `createdAt` timestamp

You can use these events to:

* Track the progress of searches and enrichments
* Build real-time dashboards
* Trigger workflows when new items are found
* Monitor the status of your exports

---

## Phrase Filters: Niche Company Finder

**URL:** llms-txt#phrase-filters:-niche-company-finder

**Contents:**
- What this doc covers
- How Phrase Filters work
- Running a query with phrase filter

Source: https://docs.exa.ai/examples/niche-company-finder-with-phrase-filters

## What this doc covers

1. What Phrase filters are and how they work
2. Using 'Phrase Filters' to find specific results, in this case filtering by a foreign company suffix

In this simple example, we'll demonstrate a company discovery search that helps find relevant companies incorporated in the Germany (and a few nearby countries) via Phrase Filters. This example will use the fact that companies incorporated in these locations [have a suffix of GmbH](https://en.wikipedia.org/wiki/GmbH), which is a term in the region similar to the US 'incorporated'.

## How Phrase Filters work

Exa's search combines semantic relevance with precise filtering: a neural query first retrieves contextually relevant documents, then a phrase filter refines these results by checking for specific text in the content. This two-stage approach delivers highly targeted outputs by leveraging both semantic understanding and exact text matching.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=758bc3c59268a1678e9022748af47aa8" alt="" data-og-width="550" width="550" data-og-height="837" height="837" data-path="images/1864e57-Screenshot_2024-07-16_at_05.41.13.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=db7e808a978eeeda7e952f3f932bc580 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=fb331f9d5001a305c88f4e0f7923b19d 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2a15f67e08991ea632d168de97d87492 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=abf7bdcb4a7d44fba40fce7d408dee1d 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2b1fd7b067a0017cd2e3ddb4445edeba 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/1864e57-Screenshot_2024-07-16_at_05.41.13.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=a0d2a4941d8ba4554f020c2bc7a31a85 2500w" />

## Running a query with phrase filter

Using Phrase Filters is super simple. As usual, install the `exa_py` library with `pip install exa_py`. Then instantiate the library:

```Python Python theme={null}

---

## Creating the DataFrame

**URL:** llms-txt#creating-the-dataframe

**Contents:**
- Information Enrichment

students_df = pd.DataFrame(sample_data)
students_df

Python Python theme={null}
def get_openai_response(input_text):
    # if contents is empty
    if not input_text:
        return ""
    completion = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": input_text},
            ],
            temperature=0
        )
    return completion.choices[0].message.content

Python Python theme={null}
def extract_school_from_email(email):
  content =  f"I'm going to give you a student's email. I want you to figure out what school they go to. For example, if the email is [[email protected]](/cdn-cgi/l/email-protection) you should return 'CMU' and nothing else. Only return the name of the school. Here is their email: {email}"
  return get_openai_response(content)

**Examples:**

Example 1 (unknown):
```unknown
## Information Enrichment

Now, let's add more information about the candidates: current school, LinkedIn, and personal website.

First, we'll define a helper function to call OpenAI -- we'll use this for many of our later functions.
```

Example 2 (unknown):
```unknown
We'll ask GPT to extract the candidate's school from their email address.
```

---

## Contents Retrieval

**URL:** llms-txt#contents-retrieval

**Contents:**
- Text (text=True)
- Summary (summary=True)
  - Structured Summaries
- Highlights
- Context String
  - How it works:
  - Configuration:
- Images and favicons
- Crawl Errors

Source: https://docs.exa.ai/reference/contents-retrieval

When using the Exa API, you can request different types of content to be returned for each search result.

Returns the full text content of the result, formatted as markdown. It extracts the main content (like article body text) while filtering out navigation elements, pop-ups, and other peripheral text. This is extractive content taken directly from the page's source.

## Summary (summary=True)

Provides a concise summary generated from the text, tailored to a specific query you provide. This is abstractive content created by processing the source text using Gemini Flash.

### Structured Summaries

You can also request structured summaries by providing a JSON schema:

The API will return the summary as a JSON string that matches your schema structure, which you can parse to access the structured data.

Delivers key excerpts from the text that are most relevant to your search query, emphasizing important information within the content. This is also extractive content from the source.

You can configure highlights in two ways:

1. **Simple boolean** (`highlights=True`): Returns default highlights based on the search query

2. **Detailed configuration** (pass as an object):
   
   * `query`: The specific query to use for generating highlights (if different from search query)
   * `numSentences`: Number of sentences per highlight (minimum: 1)
   * `highlightsPerUrl`: Maximum number of highlights to return per URL (minimum: 1)

Returns page contents as a single combined string ready for LLM RAG applications. When you set `context=True`, all result contents are joined together into one text block.

**Performance Note**: Context strings often perform better than highlights for RAG applications because they provide more complete information from each page.

* If you have 5 results and set a 1000 character limit, each result gets about 200 characters
* We recommend using 10000+ characters for best results
* No character limit works best when possible

1. **Simple boolean** (`context=True`): Returns all content combined with no character limit
2. **With character limit** (pass as an object):

## Images and favicons

You can get images from webpages by setting `imageLinks` (under `contents.extras.imageLinks`) to specify how many images you want per result. Each result also includes the website's `favicon` URL and a representative `image` URL when available.

The contents endpoint provides detailed status information for each URL through the `statuses` field in the response. The endpoint only returns an error if there's an internal issue on Exa's end - all other cases are reported through individual URL statuses.

Each response includes a `statuses` array with status information for each requested URL:

The error tags correspond to different failure scenarios:

* `CRAWL_NOT_FOUND`: Content not found (HTTP 404)
* `CRAWL_TIMEOUT`: The target page returned a timeout error (HTTP 408)
* `CRAWL_LIVECRAWL_TIMEOUT`: The `livecrawlTimeout` parameter limit was reached during crawling
* `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (HTTP 403)
* `CRAWL_UNKNOWN_ERROR`: Other errors (HTTP 500+)

To handle errors, check the `statuses` field for each URL:

This allows you to handle different failure scenarios appropriately for each URL in your request.

**Examples:**

Example 1 (unknown):
```unknown
The API will return the summary as a JSON string that matches your schema structure, which you can parse to access the structured data.

## Highlights

Delivers key excerpts from the text that are most relevant to your search query, emphasizing important information within the content. This is also extractive content from the source.

You can configure highlights in two ways:

1. **Simple boolean** (`highlights=True`): Returns default highlights based on the search query

2. **Detailed configuration** (pass as an object):
```

Example 2 (unknown):
```unknown
* `query`: The specific query to use for generating highlights (if different from search query)
   * `numSentences`: Number of sentences per highlight (minimum: 1)
   * `highlightsPerUrl`: Maximum number of highlights to return per URL (minimum: 1)

## Context String

Returns page contents as a single combined string ready for LLM RAG applications. When you set `context=True`, all result contents are joined together into one text block.

**Performance Note**: Context strings often perform better than highlights for RAG applications because they provide more complete information from each page.

### How it works:

* If you have 5 results and set a 1000 character limit, each result gets about 200 characters
* We recommend using 10000+ characters for best results
* No character limit works best when possible

### Configuration:

1. **Simple boolean** (`context=True`): Returns all content combined with no character limit
2. **With character limit** (pass as an object):
```

Example 3 (unknown):
```unknown
## Images and favicons

You can get images from webpages by setting `imageLinks` (under `contents.extras.imageLinks`) to specify how many images you want per result. Each result also includes the website's `favicon` URL and a representative `image` URL when available.

## Crawl Errors

The contents endpoint provides detailed status information for each URL through the `statuses` field in the response. The endpoint only returns an error if there's an internal issue on Exa's end - all other cases are reported through individual URL statuses.

Each response includes a `statuses` array with status information for each requested URL:
```

Example 4 (unknown):
```unknown
The error tags correspond to different failure scenarios:

* `CRAWL_NOT_FOUND`: Content not found (HTTP 404)
* `CRAWL_TIMEOUT`: The target page returned a timeout error (HTTP 408)
* `CRAWL_LIVECRAWL_TIMEOUT`: The `livecrawlTimeout` parameter limit was reached during crawling
* `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (HTTP 403)
* `CRAWL_UNKNOWN_ERROR`: Other errors (HTTP 500+)

To handle errors, check the `statuses` field for each URL:
```

---

## New Fast Search Type

**URL:** llms-txt#new-fast-search-type

**Contents:**
- What's New
- When to Use Fast Search
- How to Use Fast Search
- Options That Impact Latency

Source: https://docs.exa.ai/changelog/new-fast-search-type

Introducing Exa Fast: The world's fastest search API.

**Date: July 29, 2025**

We're excited to introduce **Exa Fast** - the fastest search API in the world. Exa Fast uses streamlined versions of our neural and keyword with p50 latency below 425ms.

<Info>
  Fast search is available immediately on all API plans. [Try Fast search in the dashboard →](https://dashboard.exa.ai/playground/search?q=blog%20post%20about%20AI\&filters=%7B%22text%22%3A%22true%22%2C%22type%22%3A%22fast%22%2C%22livecrawl%22%3A%22never%22%7D)
</Info>

The Fast search type provides:

* **Speed**: p50 latency below 425ms - that's 30% faster than Brave and Google Serp
* **Exa Index**: Uses the same index of high quality content as our neural search
* **Customization**: Full compatibility with all the same parameters as our other search types

## When to Use Fast Search

Fast search is ideal for:

1. **Fast web grounding**: Integrate real-time web information into responses without sacrificing speed and impacting user experience
2. **Agentic workflows**: AI agents like deep research that use dozens or hundreds of search calls where milliseconds add up
3. **Low-latency AI products**: Latency-sensitive applications like AI voice companions where every millisecond matters

## How to Use Fast Search

Using Fast search is simple - just add `type="fast"` to your search requests:

## Options That Impact Latency

While Fast search is optimized for speed, certain options can increase response times:

* **Live crawling**: Fetching content live requires real-time web requests. Set `livecrawl="never"` to use cached content and maintain optimal speed.
* **AI summaries**: Requesting AI-generated summaries requires LLM processing, which adds significant latency to your requests.
* **Complex date filters**: Using wide date ranges or multiple date constraints requires additional filtering that can slow down results.
* **Include/exclude text**: Text-based content filtering requires scanning through results, which impacts response times.
* **Subpages**: Including subpages in your search requires additional processing and can significantly increase latency.

For the fastest possible performance, use Fast search with minimal parameters and rely on cached content.

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

---

## Poll until completion

**URL:** llms-txt#poll-until-completion

**Contents:**
  - Input Parameters:
  - Returns:
- `research.list_tasks` Method
  - Input Example:

result = exa.research.poll_task(task.id)
print(f"Research complete: {result.data}")
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter       | Type           | Description                               | Default  |
| --------------- | -------------- | ----------------------------------------- | -------- |
| task\_id        | str            | The unique identifier of the task         | Required |
| poll\_interval  | Optional\[int] | Seconds between polling attempts          | 2        |
| max\_wait\_time | Optional\[int] | Maximum seconds to wait before timing out | 300      |

### Returns:

Returns a `ResearchTaskDetails` object with the completed task data (same structure as `get_task`).

## `research.list_tasks` Method

List all research tasks with optional pagination.

### Input Example:
```

---

## Create a Webhook

**URL:** llms-txt#create-a-webhook

Source: https://docs.exa.ai/websets/api/webhooks/create-a-webhook

post /v0/webhooks
Webhooks let you get notifications when things happen in your Websets. When you create a webhook, you choose which events you want to know about and where to send the notifications.

When an event happens, Exa sends an HTTP POST request to your webhook URL with:
- Event details (type, time, ID)
- Full data of what triggered the event
- A signature to verify the request came from Exa

The webhook starts as `active` and begins getting notifications right away. You'll get a secret key for checking webhook signatures - save this safely as it's only shown once when you create the webhook.

---

## Exploring your results

**URL:** llms-txt#exploring-your-results

Source: https://docs.exa.ai/websets/dashboard/walkthroughs/Exploring-your-results

Explore your Websets matched results, view summaries, criteria justification

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lFgIdWKgJQc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />

<Info>
  Matched Result: matched results are results that match all of your criteria.
</Info>

<Info>
  Evaluated Results: evaluated results are all the possible results that were analyzed by Websets - some were deemed matches, some were deemed that they did not comply with your criteria.
</Info>

---

## Writing Assistant

**URL:** llms-txt#writing-assistant

**Contents:**
- What this doc covers
- Demo overview
- High-level overview
- Exa prompting and query style
- Prompting Claude with Exa results
- Conclusion

Source: https://docs.exa.ai/examples/demo-exa-powered-writing-assistant

[Click here to try the Exa-powered Writing Assistant](https://demo.exa.ai/writing)

[Click here to see the relevant GitHub repo and hosting instructions](https://github.com/exa-labs/exa-writing-assist)

## What this doc covers

* Live demo link for hands-on experience (above!)
* Overview of a real-time writing assistant using Exa and Claude
* Breakdown of Exa query prompt engineering and generative AI system prompt

## High-level overview

This demo showcases a real-time writing assistant that uses Exa's search capabilities to provide relevant information and citations as a user writes. The system combines Exa's neural search with Anthropic's Claude AI model to generate contextually appropriate content and citations.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=71fdb665fe05eba5ea76e04a186d52d3" alt="Conceptual block diagram of how the writing assistant works" data-og-width="1660" width="1660" data-og-height="1660" height="1660" data-path="images/77dd3c1-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=24a55ccdac2c7c9b70ba1bba9e488d9a 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=836e162e10d13bdc1bb4ec7460e65f0f 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b96e1b3389aaf96ccef1c55db47636e3 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=86f7bd243f85f23508455c31c0078c96 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=adb93218eb741b51466df3faeae052ff 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/77dd3c1-image.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d30873c8c5082d9e93845a090a78b3d6 2500w" />

Conceptual block diagram of how the writing assistant works

## Exa prompting and query style

The Exa search is performed using a unique query style that appends the user's input with a prompt for continuation. Here's the relevant code snippet:

**Key aspects of this query style:**

* **Continuation prompt:** The crucial post-pend "A helpful source to read so you can continue writing the above:"
  * This prompt is designed to find sources that can logically continue the user's writing when passed to an LLM to generate content.
  * It leverages Exa's ability to understand context and find semantically relevant results.
  * By framing the query as a request for continuation, it aligns with how people naturally share helpful links.
* **Length limitation:** It caps the query at 1000 characters to maintain relevance and continue writing just based on the last section of the text.

Note this prompt is not a hard and fast rule for this use-case - we encourage experimentation with query styles to get the best results for your specific use case. For instance, you could further constrain down to just research papers.

## Prompting Claude with Exa results

The Claude AI model is prompted with a carefully crafted system message and passed the above formatted Exa results. Here is an example system prompt:

This prompt ensures that:

* Claude will only do completions, not parrot back the user query like in a typical chat based scenario. Note the inclusion of multiple examples that demonstrate Claude should not reply back with the stub even if there are errors, like spelling or grammar, in the input text (which we found to be a common issue)
* We define the citation style and formatting. We also tell the bot went to collapse authors into 'et al' style citations, as some webpages have many authors

Once again, experimenting with this prompt is crucial to getting best results for your particular use case.

This demo illustrates the power of combining Exa's advanced search capabilities with generative AI to create a writing assistant. By leveraging Exa's neural search and content retrieval features, the system can provide relevant, up-to-date information to any AI model, resulting in contextually appropriate content generation with citations.

This approach showcases how Exa can be integrated into AI-powered applications to enhance user experiences and productivity.

[Click here to try the Exa-powered Writing Assistant](https://demo.exa.ai/writing)

**Examples:**

Example 1 (unknown):
```unknown
**Key aspects of this query style:**

* **Continuation prompt:** The crucial post-pend "A helpful source to read so you can continue writing the above:"
  * This prompt is designed to find sources that can logically continue the user's writing when passed to an LLM to generate content.
  * It leverages Exa's ability to understand context and find semantically relevant results.
  * By framing the query as a request for continuation, it aligns with how people naturally share helpful links.
* **Length limitation:** It caps the query at 1000 characters to maintain relevance and continue writing just based on the last section of the text.

Note this prompt is not a hard and fast rule for this use-case - we encourage experimentation with query styles to get the best results for your specific use case. For instance, you could further constrain down to just research papers.

## Prompting Claude with Exa results

The Claude AI model is prompted with a carefully crafted system message and passed the above formatted Exa results. Here is an example system prompt:
```

---

## Function to generate model responses

**URL:** llms-txt#function-to-generate-model-responses

def call_model(state: MessagesState):
    messages = state["messages"]
    response = model.invoke(messages)
    return {"messages": [response]}

---

## Generic type var for any Enum

**URL:** llms-txt#generic-type-var-for-any-enum

EnumT = TypeVar('EnumT', bound=Enum)

---

## Update a Webset

**URL:** llms-txt#update-a-webset

Source: https://docs.exa.ai/websets/api/websets/update-a-webset

post /v0/websets/{id}

---

## Create an Enrichment

**URL:** llms-txt#create-an-enrichment

Source: https://docs.exa.ai/websets/api/websets/enrichments/create-an-enrichment

post /v0/websets/{webset}/enrichments
Create an Enrichment for a Webset.

---

## Exa's Capabilities Explained

**URL:** llms-txt#exa's-capabilities-explained

**Contents:**
- Search Types
- Auto search (prev. Magic Search)
- Neural Search
- Keyword Search
- Phrase Filter Search
- Large-scale Searches
- Contents Retrieval
- Highlights
- Prompt Engineering
- Writing continuation queries

Source: https://docs.exa.ai/reference/exas-capabilities-explained

This page explains some of the available feature functionalities of Exa and some unique ways you might use Exa for your use-case

## Auto search (prev. Magic Search)

| Where you would use it                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| When you want optimal results without manually choosing between neural and keyword search. When you might not know ahead of time what the best search type is. Note Auto search is the default search type - when unspecified, Auto search is used. |

| Description                                                                                                             | Where you would use it                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uses Exa's embeddings-based index and query model to perform complex queries and provide semantically relevant results. | For exploratory searches or when looking for conceptually related content rather than exact keyword matches. To find hard to find, specific results from the web |

| Description                                                       | Where you would use it                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Traditional search method that matches specific words or phrases. | When doing simple, broad searches where the user can refine results manually. Good for general browsing and finding exact matches. Good for matching proper nouns or terms of art that are rarely used in other contexts. When neural search fails to return what you are looking for. |

## Phrase Filter Search

| Description                                                            | Where you would use it                                                                                                                                                               |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Apply keyword filters atop of a neural search before returning results | When you want the power of Neural Search but also need to specify and filter on some key phrase. Often helpful when filtering on a piece of jargon where a specific match is crucial |

[See a worked example here](/examples/niche-company-finder-with-phrase-filters)

## Large-scale Searches

| Description                                                | Where you would use it                                                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Exa searches that return a large number of search results. | When desiring comprehensive, semantically relevant data for batch use cases, e.g., for enrichment of CRMs or full topic scraping. |

Note high return results cost more and higher result caps (e.g., 1000 returns) are restricted to Enterprise/Custom plans only. [Get in touch ](https://cal.com/team/exa/exa-intro-chat?date=2024-11-14\&month=2024-11)if you are interested in learning more.

## Contents Retrieval

| Description                                                                         | Where you would use it                                                                         |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Instantly retrieves whole, cleaned and parsed webpage contents from search results. | When you need the full text of webpages for analysis, summarization, or other post-processing. |

| Description                                                      | Where you would use it                                                                                                            |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Extracts relevant excerpts or highlights from retrieved content. | When you want a quick or targeted outputs from the most relevant parts of a search entity without wanted to handle the full text. |

## Prompt Engineering

Prompt engineering is crucial for getting the most out of Exa's capabilities. The right prompt can dramatically improve the relevance and usefulness of your search results. This is especially important for neural search and advanced features like writing continuation.

## Writing continuation queries

| Description                                                                                                                                                                                            | Where you would use it                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt crafted by post-pending 'Here is a great resource to continue writing this piece of writing:'. Useful for research writing or any other citation-based text generation after passing to an LLM. | When you're in the middle of writing a piece and need to find relevant sources to continue or expand your content. This is particularly useful for academic writing, content creation, or any scenario where you need to find information that logically follows from what you've already written. |

| Description                                                                             | Where you would use it                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utilizing Exa's long query window to perform matches against semantically rich content. | When you need to find content that matches complex, detailed descriptions or when you want to find content similar to a large piece of text. This is particularly useful for finding niche content or when you're looking for very specific information. |

**Examples:**

Example 1 (unknown):
```unknown
## Neural Search

| Description                                                                                                             | Where you would use it                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uses Exa's embeddings-based index and query model to perform complex queries and provide semantically relevant results. | For exploratory searches or when looking for conceptually related content rather than exact keyword matches. To find hard to find, specific results from the web |
```

Example 2 (unknown):
```unknown
## Keyword Search

| Description                                                       | Where you would use it                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Traditional search method that matches specific words or phrases. | When doing simple, broad searches where the user can refine results manually. Good for general browsing and finding exact matches. Good for matching proper nouns or terms of art that are rarely used in other contexts. When neural search fails to return what you are looking for. |
```

Example 3 (unknown):
```unknown
## Phrase Filter Search

| Description                                                            | Where you would use it                                                                                                                                                               |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Apply keyword filters atop of a neural search before returning results | When you want the power of Neural Search but also need to specify and filter on some key phrase. Often helpful when filtering on a piece of jargon where a specific match is crucial |
```

Example 4 (unknown):
```unknown
[See a worked example here](/examples/niche-company-finder-with-phrase-filters)

## Large-scale Searches

| Description                                                | Where you would use it                                                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Exa searches that return a large number of search results. | When desiring comprehensive, semantically relevant data for batch use cases, e.g., for enrichment of CRMs or full topic scraping. |
```

---

## Get Import

**URL:** llms-txt#get-import

Source: https://docs.exa.ai/websets/api/imports/get-import

get /v0/imports/{id}
Gets a specific import.

---

## Get a Search

**URL:** llms-txt#get-a-search

Source: https://docs.exa.ai/websets/api/websets/searches/get-a-search

get /v0/websets/{webset}/searches/{id}
Gets a Search by id

---

## to just see the 10 titles and urls

**URL:** llms-txt#to-just-see-the-10-titles-and-urls

**Contents:**
- Finding additional info for each company

urls = {}
for c in companies:
  print(c.title + ':' + c.url)
rumie - College Marketplace:https://www.rumieapp.com/ theme={null}
The Airbnb of Storage:https://www.mystorestash.com/
Bunction.net:https://bunction.net/
Home - Community Gearbox:https://communitygearbox.com/
NOVA SHOPPING:https://www.novashoppingapp.com/
Re-Fridge: Buy, sell, or store your college fridge - Re-Fridge:https://www.refridge.com/
Jamble: Social Fashion Resale:https://www.jambleapp.com/
Branded Resale | Treet:https://www.treet.co/
Swapskis:https://www.swapskis.co/
Earn Money for Used Clothing:https://www.thredup.com/cleanout?redirectPath=%2Fcleanout%2Fsell
python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown
Looks pretty darn good! As a bonus specifically for companies data, specifying `category="company"` in the SDK will search across a curated, larger companies dataset - if you're interested in this, let us know at [hello@exa.ai](mailto:hello@exa.ai)!

Now that we have 10 companies we want to dig into further, let’s do some research on each of these companies.

## Finding additional info for each company

Now let's get more information by finding additional webpages about each company. To do this, we're going to do a keyword search of each company's URL. We're using keyword because we want to find webpages that exactly match the company we're inputting. We can do this with the `search_and_contents` function, and specify `type="keyword"` and `num_results=5`. This will give me 5 websites about each company.
```

---

## Downloading and Sharing Your Results

**URL:** llms-txt#downloading-and-sharing-your-results

**Contents:**
  - Share
  - Download

Source: https://docs.exa.ai/websets/dashboard/walkthroughs/Sharing-and-Downloading-Your-Results

Here's how to share or download your results and enrichments.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/81sJFD66XMU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />

Click the share icon, switch on the toggle to make your Webset public and share the link.

<Note>
  *Starter*, *Pro* and *Enterprise* Plans Websets are default private. *Free Plan* Websets are default public.
</Note>

Download a CSV by clicking the "Download" button. You can easily upload the CSV to any CRM, candidate management systems, etc.

---

## Exclude Results

**URL:** llms-txt#exclude-results

**Contents:**
- Overview
- How it works
- When to use exclusions

Source: https://docs.exa.ai/websets/dashboard/exclude-results

Avoid duplicate results in your new searches by excluding URLs from previous Websets or CSV files.

The Exclude Results feature ensures you don't get duplicate results when creating new searches. By specifying URLs to exclude based on previous Websets or uploaded CSV files, you can focus on discovering fresh, unique results that complement your existing data.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b28ac0441991bc4543571ffc2a900963" alt="" data-og-width="1466" width="1466" data-og-height="857" height="857" data-path="images/websets/exclude-flow.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=12e092e96fd14f7a3a47011df19ed82a 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d765d90f0acb78ce6eb5475c93774b86 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=2e600f13c376f8c337c1f4eacfc6153a 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=dce6f17e56657a73f2b5e458020e5aef 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=43694ec4f60ae4256389c165e4dcea4a 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/exclude-flow.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b83edca49e3aef8ecf01bf7433f6e212 2500w" />

1. Begin creating a new Webset
2. Below the criteria in the sidepanel, click "Exclude"
3. Select from past Websets or upload a CSV with URLs to exclude. You can select multiple sources to exclude from.
4. Start your search, with only new results that don't match your exclusions

The maximum number of results you can exclude is determined by your plan.

## When to use exclusions

* Finding leads that aren't already in your CRM
* Following up on previous searches with refined criteria
* Excluding results you already know about

---

## Initialize memory

**URL:** llms-txt#initialize-memory

checkpointer = MemorySaver()

---

## Creating Enrichments

**URL:** llms-txt#creating-enrichments

Source: https://docs.exa.ai/websets/dashboard/walkthroughs/Creating-enrichments

Here's how to create enrichments (also known as Adding Columns).

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5Zgb0qcRRsg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />

**Open the enrichment modal**

<Tip>
  Use the chat: you can add enrichments by prompting directly in the Chat! Or click on "Add Enrichment" in the top-right corner.
</Tip>

**Fill in your prompt:** Prompt the AI generator to have our agent fill in the fields for you, or fill in the enrichment type, title and prompt directly.

**Enrichment types:** text, contact information (email & phone number), date, number, options (think of these as tags!)

<Tip>
  Cool examples of enrichments:&#x20;

* "Find me this candidate's contact information" - Contact

* "Do a sentiment analysis on each article" - Text or Options

* "Categorize these companies by B2B or B2C" - Options

* "Create a custom email based on this company's main product"- Text

* "Give me this candidate's years of experience" - Number

* "Find any public data on this company's revenue or valuation" - Text

* "What is the most powerful data point mentioned in each research paper?" - Text
</Tip>

---

## Building a News Summarizer

**URL:** llms-txt#building-a-news-summarizer

**Contents:**
- Get Started

Source: https://docs.exa.ai/examples/recent-news-summarizer

Learn how to build an AI-powered news summarizer that searches and summarizes recent articles using Exa and GPT.

In this example, we will build an LLM-based news summarizer with the Exa API to keep us up-to-date with the latest news on a given topic. We'll do this in three steps:

1. Generate search queries for Exa using an LLM
2. Retrieve relevant URLs and their contents using Exa
3. Summarize webpage contents using GPT-3.5 Turbo

This is a form of Retrieval Augmented Generation (RAG), combining Exa's search capabilities with GPT's summarization abilities.

The Jupyter notebook for this tutorial is available on [Colab](https://colab.research.google.com/drive/1uZ0kxFCWmCqozl3ArTJohNpRbeEYlwlT?usp=sharing) for easy experimentation. You can also [check it out on Github](https://github.com/exa-labs/exa-py/tree/master/examples/newssummarizer/summarizer.ipynb), including a [plain Python version](https://github.com/exa-labs/exa-py/tree/master/examples/newssummarizer/summarizer.py) if you want to skip to the complete product.

<Steps>
  <Step title="Pre-requisites and installation">
    Install the required packages:

<Note> You'll need both an Exa API key and an OpenAI API key to run this example. You can get your OpenAI API key [here](https://platform.openai.com/api-keys).</Note>

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

Set up your API keys:

<Step title="Initialize the clients">
    Import and set up both the OpenAI and Exa clients:

<Step title="Generate a search query">
    First, we'll use GPT to generate an optimized search query based on the user's question:

<Step title="Search for recent articles">
    Now we'll use Exa to search for recent articles, filtering by publication date:

<Note>
      We use `start_published_date` to filter for recent content.
    </Note>
  </Step>

<Step title="Get article contents">
    Exa's `search_and_contents` already retrieved the article contents for us, so we can access them directly:

<Note>
      Unlike traditional search engines that only return URLs, Exa gives us direct access to the webpage contents, eliminating the need for web scraping.
    </Note>
  </Step>

<Step title="Generate a summary">
    Finally, we'll use GPT to create a concise summary of the article:

And we're done! We've built an app that translates a question into a search query, uses Exa to search for useful links and their contents, and summarizes the content to effortlessly answer questions about the latest news.

**Through Exa, we have given our LLM access to the entire Internet.** The possibilities are endless.
  </Step>
</Steps>

**Examples:**

Example 1 (unknown):
```unknown
<Note> You'll need both an Exa API key and an OpenAI API key to run this example. You can get your OpenAI API key [here](https://platform.openai.com/api-keys).</Note>

    <Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

    Set up your API keys:
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Initialize the clients">
    Import and set up both the OpenAI and Exa clients:
```

Example 3 (unknown):
```unknown
</Step>

  <Step title="Generate a search query">
    First, we'll use GPT to generate an optimized search query based on the user's question:
```

Example 4 (unknown):
```unknown
</Step>

  <Step title="Search for recent articles">
    Now we'll use Exa to search for recent articles, filtering by publication date:
```

---

## Limit search_results to a maximum of 20,000 characters

**URL:** llms-txt#limit-search_results-to-a-maximum-of-20,000-characters

**Contents:**
- 4. Advanced Example: Analyzing Multiple Research Papers

search_results = search_results.results[:20000]

class QuantumComputingAdvancement(BaseModel):
    technology: str
    description: str
    potential_impact: str

def __str__(self):
        return (
            f"Technology: {self.technology}\n"
            f"Description: {self.description}\n"
            f"Potential Impact: {self.potential_impact}"
        )

structured_output = client.chat.completions.create(
    model="gpt-3.5-turbo",
    response_model=QuantumComputingAdvancement,
    messages=[
        {
            "role": "user",
            "content": f"Based on the provided context, describe a recent advancement in quantum computing.\n\n{search_results}",
        }
    ],
)

print(structured_output)
python Python theme={null}
import os
from typing import List

import instructor
from exa_py import Exa
from openai import OpenAI
from pydantic import BaseModel, field_validator

exa = Exa(os.environ["EXA_API_KEY"])
client = instructor.from_openai(OpenAI())

class ResearchPaper(BaseModel):
    title: str
    authors: List[str]
    key_findings: List[str]
    methodology: str

@field_validator("title")
    @classmethod
    def validate_title(cls, v):
        if v.upper() != v:
            raise ValueError("Title must be in uppercase.")
        return v

def __str__(self):
        return (
            f"Title: {self.title}\n"
            f"Authors: {', '.join(self.authors)}\n"
            f"Key Findings: {', '.join(self.key_findings)}\n"
            f"Methodology: {self.methodology}"
        )

class ResearchAnalysis(BaseModel):
    papers: List[ResearchPaper]
    common_themes: List[str]
    future_directions: str

def __str__(self):
        return (
            f"Common Themes:\n- {', '.join(self.common_themes)}\n"
            f"Future Directions: {self.future_directions}\n"
            f"Analyzed Papers:\n" + "\n".join(str(paper) for paper in self.papers)
        )

**Examples:**

Example 1 (unknown):
```unknown
Here we define a `QuantumComputingAdvancement` class that inherits from `BaseModel` from Pydantic. This class will be used by Instructor to validate the output from the LLM and for the LLM as a response model. We also implement the `__str__()` method for easy printing of the output. We then initialize `OpenAI()` and wrap instructor on top of it with `instructor.from_openai` to create a client that will return structured outputs. If the output is not structured as our class, Instructor makes the LLM retry until max\_retries is reached. You can read more about how Instructor retries [here](https://python.useinstructor.com/why/#retries).

This example demonstrates how to use Exa to search for content about quantum computing advancements and structure the output using Instructor.

## 4. Advanced Example: Analyzing Multiple Research Papers

Let's create a more complex example where we analyze multiple research papers on a specific topic and use pydantic's own validation model to correct the structured data to show you how we can be *even* more fine-grained:
```

---

## null

**URL:** llms-txt#null

Source: https://docs.exa.ai/websets/api/websets/overview

---

## OpenAI Exa Wrapper

**URL:** llms-txt#openai-exa-wrapper

**Contents:**
- Get Started
- Further configuration options and advanced usage
- Option to include Exa results
- Number of results
- Maximum result length
- Search parameters

Source: https://docs.exa.ai/reference/openai

Enhance your OpenAI chat completetions with a simple Exa wrapper that handles search, chunking and prompting.

Exa is designed from the ground up to enable seamless, accurate, and performant RAG (Retrieval-Augmented Generation). Exa provides factual, up to date information needed to ground LLM generations.

But good RAG requires more than just great search. The client needs to decide *when* to use RAG, with *what* queries. They need to handle chunking, prompting, and chaining LLM calls. We provide the Exa OpenAI wrapper that, **with one line of code**, does all that and turns any OpenAI chat completion into an Exa-powered RAG system.

First, create an account and grab a free API key.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

<Steps>
  <Step title="Install the Exa and OpenAI python libraries">
    
  </Step>

<Step title="Instantiate Clients">
    Import and instantiate the Exa and OpenAI clients.

<Note> Make sure to obtain your API keys from OpenAI and Exa and replace `OPENAI_API_KEY` and `EXA_API_KEY` with your actual keys.</Note>

<Step title="Wrap the OpenAI client">
    The `Exa.wrap` method takes your existing OpenAI client and wraps it with Exa-powered RAG capabilities.

<Step title="Call the wrapped client">
    The wrapped client works exactly like the native OpenAI client, except that it automatically improves your completions with relevant search results.

<Info> The Exa OpenAI wrapper supports any model that [supports function calling](https://platform.openai.com/docs/guides/function-calling). </Info>

<Step title="Example output">
    
  </Step>

<Step title="End-to-end code example">
    Below is a code block that puts together all of the above. You can copy it into any Python script or Jupyter notebook to test out a complete RAG example.

<Step title="Example with multiple questions">
    Here is a slightly more advanced example that shows how to use the wrapper to answer multiple questions.

## Further configuration options and advanced usage

While the default settings work well for most use cases, the Exa OpenAI wrapper's `chat.completions.create()` method allows you to fine-tune the following parameters.

## Option to include Exa results

`use_exa` specifies whether to include Exa results for a given request:

* `auto` Exa will intelligently determine whether to include results
* `required` Exa results will always be included
* `none` Exa results will never be included

`num_results` specifies how many search results Exa should retrieve (defaults to 3 results). Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))

## Maximum result length

`result_max_len` specifies the maximum length of each Exa result (defaults to 2048 characters).

<Note> This is measured in characters, not tokens. </Note>

The Exa OpenAI wrapper supports any parameters that the `exa.search()` function accepts. You can find a list of all the parameters [here](./search).

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Instantiate Clients">
    Import and instantiate the Exa and OpenAI clients.

    <Note> Make sure to obtain your API keys from OpenAI and Exa and replace `OPENAI_API_KEY` and `EXA_API_KEY` with your actual keys.</Note>
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Wrap the OpenAI client">
    The `Exa.wrap` method takes your existing OpenAI client and wraps it with Exa-powered RAG capabilities.
```

Example 3 (unknown):
```unknown
</Step>

  <Step title="Call the wrapped client">
    The wrapped client works exactly like the native OpenAI client, except that it automatically improves your completions with relevant search results.

    <Info> The Exa OpenAI wrapper supports any model that [supports function calling](https://platform.openai.com/docs/guides/function-calling). </Info>
```

Example 4 (unknown):
```unknown
</Step>

  <Step title="Example output">
```

---

## CrewAI Docs

**URL:** llms-txt#crewai-docs

Source: https://docs.exa.ai/integrations/crew-ai-docs

Learn how to use Exa's search API with CrewAI. CrewAI have a dedicated Exa tool. This enables AI agents to perform web search.

For detailed instructions on using Exa with CrewAI, visit the [CrewAI documentation](https://docs.crewai.com/tools/exasearchtool).

---

## Build a Retrieval Agent with LangGraph

**URL:** llms-txt#build-a-retrieval-agent-with-langgraph

**Contents:**
- What this doc covers
- Guide
- Brief Intro to LangGraph
- Our Research Assistant Workflow
- Let's break down what's happening in this simple workflow:
- 1. Prerequisites and Installation
- 2. Set Up Exa Search as a LangChain Tool
- 3. Creating a Toolchain with LangGraph

Source: https://docs.exa.ai/examples/getting-started-with-rag-in-langgraph

## What this doc covers

* Brief intro to LangGraph
* How to set up an agent in LangGraph with Exa search as a tool

This guide will show you how you can define and use Exa search within the LangGraph framework. This framework provides a straightforward way for you to define an AI agent and for it to retrieve high-quality, semantically matched content via Exa search.

## Brief Intro to LangGraph

Before we dive into our implementation, a quick primer on the LangGraph framework.

LangGraph is a powerful tool for building complex LLM-based agents. It allows for cyclical workflows, gives you granular control, and offers built-in persistence. This means you can create reliable agents with intricate logic, pause and resume execution, and even incorporate human oversight.

Read more about [LangGraph here](https://langchain-ai.github.io/langgraph/)

## Our Research Assistant Workflow

For our AI-powered research assistant, we're leveraging LangGraph's capabilities to create a workflow that combines an AI model (Claude) with a web search retrieval tool powered by Exa's API, to fetch, find and analyze any documents (in this case research on climate tech). Here's a visual representation of our workflow:

![Alt text](https://files.readme.io/a2674bdce9b576860cd8eeec735ebd8959e8a8b41d4e5fab829dbbdcae37d6b0-Screenshot_2024-08-22_at_11.50.08.png)

This diagram illustrates how our workflow takes advantage of LangGraph's cycle support, allowing the agent to repeatedly use tools and make decisions until it has gathered sufficient information to provide a final response.

## Let's break down what's happening in this simple workflow:

1. We start at the Entry Point with a user query (e.g., "Latest research papers on climate technology").
2. The Agent (our AI model) receives the query and decides what to do next.
3. If the Agent needs more information, it uses the Web Search Retriever Tool to search for relevant documents.
4. The Web Search Retriever Tool fetches information using Exa's semantic search capabilities.
5. The Agent receives the fetched information and analyzes it.
6. This process repeats until the Agent has enough information to provide a final response.

In the following sections, we'll explore the code implementation in detail, showing how we leverage LangGraph's features to create this advanced research assistant.

## 1. Prerequisites and Installation

Before starting, ensure you have the required packages installed:

Make sure to set up your API keys. For LangChain libraries, the environment variables should be named `ANTHROPIC_API_KEY` and `EXA_API_KEY` for Anthropic and Exa keys respectively.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />

## 2. Set Up Exa Search as a LangChain Tool

After setting env variables, we can start configuring a search tool using `ExaSearchRetriever`. This tool ([read more here](https://api.python.langchain.com/en/latest/retrievers/langchain_exa.retrievers.ExaSearchRetriever.html)) will help retrieve relevant documents based on a query.

First we need to import the required libraries:

After we have imported the necessary libraries, we need to define and register a tool so that the agent know what tools it can use.

We use LangGraph `tool` decorator which you can read more about [here](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/#tool-decorator). The decorator uses the function name as the tool name. The docstring provides the agent with a tool description.

The `retriever` is where we initialize the Exa search retriever and configure it with parameters such as `highlights=True`. You can read more about all the available parameters [here](https://docs.exa.ai/reference/python-sdk-specification#input-parameters-1).

Here, `ExaSearchRetriever` is set to fetch 3 documents.

Then we use LangChain's `PromptTemplate` to structure the results from Exa in a more AI friendly way. Creating and using this template is optional, but recommended. Read more about PromptTemplate ([here](https://python.langchain.com/v0.1/docs/modules/model_io/prompts/quick_start/#).

We also use a RunnableLambda to extract necessary metadata (like URL and highlights) from the search results and format it using the prompt template.

After all of this we start the retrieval and processing chain and store the results in the `documents` variable which is returned.

## 3. Creating a Toolchain with LangGraph

Now let's set up the complete toolchain using LangGraph.

```python  theme={null}
from typing import Literal
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode

**Examples:**

Example 1 (unknown):
```unknown
Make sure to set up your API keys. For LangChain libraries, the environment variables should be named `ANTHROPIC_API_KEY` and `EXA_API_KEY` for Anthropic and Exa keys respectively.

<Card title="Get your Exa API key" icon="key" horizontal href="https://dashboard.exa.ai/api-keys" />
```

Example 2 (unknown):
```unknown
## 2. Set Up Exa Search as a LangChain Tool

After setting env variables, we can start configuring a search tool using `ExaSearchRetriever`. This tool ([read more here](https://api.python.langchain.com/en/latest/retrievers/langchain_exa.retrievers.ExaSearchRetriever.html)) will help retrieve relevant documents based on a query.

First we need to import the required libraries:
```

Example 3 (unknown):
```unknown
After we have imported the necessary libraries, we need to define and register a tool so that the agent know what tools it can use.

We use LangGraph `tool` decorator which you can read more about [here](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/#tool-decorator). The decorator uses the function name as the tool name. The docstring provides the agent with a tool description.

The `retriever` is where we initialize the Exa search retriever and configure it with parameters such as `highlights=True`. You can read more about all the available parameters [here](https://docs.exa.ai/reference/python-sdk-specification#input-parameters-1).
```

Example 4 (unknown):
```unknown
Here, `ExaSearchRetriever` is set to fetch 3 documents.

Then we use LangChain's `PromptTemplate` to structure the results from Exa in a more AI friendly way. Creating and using this template is optional, but recommended. Read more about PromptTemplate ([here](https://python.langchain.com/v0.1/docs/modules/model_io/prompts/quick_start/#).

We also use a RunnableLambda to extract necessary metadata (like URL and highlights) from the search results and format it using the prompt template.

After all of this we start the retrieval and processing chain and store the results in the `documents` variable which is returned.

## 3. Creating a Toolchain with LangGraph

Now let's set up the complete toolchain using LangGraph.
```

---

## Custom JSON encoder for handling AnyUrl

**URL:** llms-txt#custom-json-encoder-for-handling-anyurl

class ExaJSONEncoder(json.JSONEncoder):

def default(self, obj):

if isinstance(obj, AnyUrl):

return super().default(obj)

class ExaBaseModel(BaseModel):

"""Base model for all Exa models with common configuration."""

model_config = ConfigDict(

populate_by_name=True,

use_enum_values=True,

coerce_numbers_to_str=False,  # Don't convert numbers to strings

str_strip_whitespace=True,  # Strip whitespace from strings

str_to_lower=False,  # Don't convert strings to lowercase

str_to_upper=False,  # Don't convert strings to uppercase

from_attributes=True,  # Allow initialization from attributes

validate_assignment=True,  # Validate on assignment

extra='forbid',  # Forbid extra fields

json_encoders={AnyUrl: str}  # Convert AnyUrl to string when serializing to JSON

class WebsetsBaseClient:

"""Base client for Exa API resources."""

def **init**(self, client):

"""Initialize the client.

client: The parent Exa client.

self.\_client = client

def _prepare_data(self, data: Union[Dict[str, Any], ExaBaseModel, str], model_class: Optional[Type[ModelT]] = None) -\> Union[Dict[str, Any], str]:

"""Prepare data for API request, converting dict to model if needed.

data: Either a dictionary, model instance, or string

model_class: The model class to use if data is a dictionary

Dictionary prepared for API request or string if string data was provided

if isinstance(data, str):

# Return string as is

elif isinstance(data, dict) and model_class:

# Convert dict to model instance

model_instance = model_class.model_validate(data)

return model_instance.model_dump(by_alias=True, exclude_none=True)

elif isinstance(data, ExaBaseModel):

# Use model's dump method

return data.model_dump(by_alias=True, exclude_none=True)

elif isinstance(data, dict):

raise TypeError(f"Expected dict, ExaBaseModel, or str, got {type(data)}")

def request(self, endpoint: str, data: Optional[Union[Dict[str, Any], ExaBaseModel, str]] = None,

method: str = "POST", params: Optional[Dict[str, Any]] = None) -\> Dict[str, Any]:

"""Make a request to the Exa API.

endpoint (str): The API endpoint to request.

data (Union[Dict[str, Any], ExaBaseModel, str], optional): The request data. Can be a dictionary, model instance, or string. Defaults to None.

method (str, optional): The HTTP method. Defaults to "POST".

params (Dict[str, Any], optional): The query parameters. Defaults to None.

Dict[str, Any]: The API response.

if isinstance(data, str):

# If data is a string, pass it as is

elif data is not None and isinstance(data, ExaBaseModel):

# If data is a model instance, convert it to a dict

data = data.model_dump(by_alias=True, exclude_none=True)

return self.\_client.request("/websets/" \+ endpoint, data=data, method=method, params=params)

enrichments/[client.py](http://client.py)

from **future** import annotations

from typing import Dict, Any, Union

from ..types import (

CreateEnrichmentParameters,

from ..core.base import WebsetsBaseClient

class WebsetEnrichmentsClient(WebsetsBaseClient):

"""Client for managing Webset Enrichments."""

def **init**(self, client):

super().\__init_\_(client)

def create(self, webset_id: str, params: Union[Dict[str, Any], CreateEnrichmentParameters]) -\> WebsetEnrichment:

"""Create an Enrichment for a Webset.

webset_id (str): The id of the Webset.

params (CreateEnrichmentParameters): The parameters for creating an enrichment.

WebsetEnrichment: The created enrichment.

response = self.request(f"/v0/websets/{webset_id}/enrichments", data=params)

return WebsetEnrichment.model_validate(response)

def get(self, webset_id: str, id: str) -\> WebsetEnrichment:

"""Get an Enrichment by ID.

webset_id (str): The id of the Webset.

id (str): The id of the Enrichment.

WebsetEnrichment: The retrieved enrichment.

response = self.request(f"/v0/websets/{webset_id}/enrichments/{id}", method="GET")

return WebsetEnrichment.model_validate(response)

def delete(self, webset_id: str, id: str) -\> WebsetEnrichment:

"""Delete an Enrichment.

webset_id (str): The id of the Webset.

id (str): The id of the Enrichment.

WebsetEnrichment: The deleted enrichment.

response = self.request(f"/v0/websets/{webset_id}/enrichments/{id}", method="DELETE")

return WebsetEnrichment.model_validate(response)

def cancel(self, webset_id: str, id: str) -\> WebsetEnrichment:

"""Cancel a running Enrichment.

webset_id (str): The id of the Webset.

id (str): The id of the Enrichment.

WebsetEnrichment: The canceled enrichment.

response = self.request(f"/v0/websets/{webset_id}/enrichments/{id}/cancel", method="POST")

return WebsetEnrichment.model_validate(response)

enrichments/\__init_\_.py

from .client import WebsetEnrichmentsClient

**all** = ["WebsetEnrichmentsClient"]

\_generator/pydantic/BaseModel.jinja2

{% for decorator in decorators -%}

class {{ class_name }}({{ base_class }}):{% if comment is defined %}  # {{ comment }}{% endif %}

{%- if description %}

{{ description | indent(4) }}

{%- if not fields and not description %}

{%- filter indent(4) %}

{%- for field in fields -%}

{%- if [field.name](http://field.name) == "type" and field.field %}

type: Literal['{{ field.default }}']

{%- elif [field.name](http://field.name) == "object" and field.field %}

object: Literal['{{ field.default }}']

{%- elif not field.annotated and field.field %}

{{ [field.name](http://field.name) }}: {{ field.type_hint }} = {{ field.field }}

{%- if field.annotated %}

{{ [field.name](http://field.name) }}: {{ field.annotated }}

{{ [field.name](http://field.name) }}: {{ field.type_hint }}

{%- if not (field.required or (field.represented_default == 'None' and field.strip_default_none)) or [field.data](http://field.data)\_[type.is](http://type.is)\_optional

%} = {{ field.represented_default }}

{%- if field.docstring %}

{{ field.docstring | indent(4) }}

{%- for method in methods -%}

items/[client.py](http://client.py)

from **future** import annotations

from typing import  Optional, Iterator

from ..types import (

ListWebsetItemResponse,

from ..core.base import WebsetsBaseClient

class WebsetItemsClient(WebsetsBaseClient):

"""Client for managing Webset Items."""

def **init**(self, client):

super().\__init_\_(client)

def list(self, webset_id: str, \*, cursor: Optional[str] = None,

limit: Optional[int] = None) -\> ListWebsetItemResponse:

"""List all Items for a Webset.

webset_id (str): The id or externalId of the Webset.

cursor (str, optional): The cursor to paginate through the results.

limit (int, optional): The number of results to return (max 200).

ListWebsetItemResponse: List of webset items.

params = {k: v for k, v in {"cursor": cursor, "limit": limit}.items() if v is not None}

response = self.request(f"/v0/websets/{webset_id}/items", params=params, method="GET")

return ListWebsetItemResponse.model_validate(response)

def list_all(self, webset_id: str, \*, limit: Optional[int] = None) -\> Iterator[WebsetItem]:

"""Iterate through all Items in a Webset, handling pagination automatically.

webset_id (str): The id or externalId of the Webset.

limit (int, optional): The number of results to return per page (max 200).

WebsetItem: Each item in the webset.

response = self.list(webset_id, cursor=cursor, limit=limit)

for item in [response.data](http://response.data):

if not response.has_more or not [response.next](http://response.next)\_cursor:

cursor = [response.next](http://response.next)\_cursor

def get(self, webset_id: str, id: str) -\> WebsetItem:

"""Get an Item by ID.

webset_id (str): The id or externalId of the Webset.

id (str): The id of the Webset item.

WebsetItem: The retrieved item.

response = self.request(f"/v0/websets/{webset_id}/items/{id}", method="GET")

return WebsetItem.model_validate(response)

def delete(self, webset_id: str, id: str) -\> WebsetItem:

webset_id (str): The id or externalId of the Webset.

id (str): The id of the Webset item.

WebsetItem: The deleted item.

response = self.request(f"/v0/websets/{webset_id}/items/{id}", method="DELETE")

return WebsetItem.model_validate(response)

from .client import WebsetItemsClient

**all** = ["WebsetItemsClient"]

webhooks/[client.py](http://client.py)

from **future** import annotations

from typing import Optional, Dict, Any, Union, Literal

from ..types import (

CreateWebhookParameters,

ListWebhooksResponse,

UpdateWebhookParameters,

ListWebhookAttemptsResponse,

from ..core.base import WebsetsBaseClient

class WebhookAttemptsClient(WebsetsBaseClient):

"""Client for managing Webhook Attempts."""

def **init**(self, client):

super().\__init_\_(client)

def list(self, webhook_id: str, \*, cursor: Optional[str] = None,

limit: Optional[int] = None, event_type: Optional[Union[EventType, str]] = None) -\> ListWebhookAttemptsResponse:

"""List all attempts made by a Webhook ordered in descending order.

webhook_id (str): The ID of the webhook.

cursor (str, optional): The cursor to paginate through the results.

limit (int, optional): The number of results to return (max 200).

event_type (Union[EventType, str], optional): The type of event to filter by.

ListWebhookAttemptsResponse: List of webhook attempts.

event_type_value = None

if event_type is not None:

if isinstance(event_type, EventType):

event_type_value = event_type.value

event_type_value = event_type

params = {k: v for k, v in {

"eventType": event_type_value

}.items() if v is not None}

response = self.request(f"/v0/webhooks/{webhook_id}/attempts", params=params, method="GET")

return ListWebhookAttemptsResponse.model_validate(response)

class WebsetWebhooksClient(WebsetsBaseClient):

"""Client for managing Webset Webhooks."""

def **init**(self, client):

super().\__init_\_(client)

self.attempts = WebhookAttemptsClient(client)

def create(self, params: Union[Dict[str, Any], CreateWebhookParameters]) -\> Webhook:

params (CreateWebhookParameters): The parameters for creating a webhook.

Webhook: The created webhook.

response = self.request("/v0/webhooks", data=params)

return Webhook.model_validate(response)

def get(self, id: str) -\> Webhook:

"""Get a Webhook by ID.

id (str): The id of the webhook.

Webhook: The retrieved webhook.

response = self.request(f"/v0/webhooks/{id}", method="GET")

return Webhook.model_validate(response)

def list(self, \*, cursor: Optional[str] = None, limit: Optional[int] = None) -\> ListWebhooksResponse:

"""List all Webhooks.

cursor (str, optional): The cursor to paginate through the results.

limit (int, optional): The number of results to return (max 200).

ListWebhooksResponse: List of webhooks.

params = {k: v for k, v in {"cursor": cursor, "limit": limit}.items() if v is not None}

response = self.request("/v0/webhooks", params=params, method="GET")

return ListWebhooksResponse.model_validate(response)

def update(self, id: str, params: Union[Dict[str, Any], UpdateWebhookParameters]) -\> Webhook:

id (str): The id of the webhook.

params (UpdateWebhookParameters): The parameters for updating a webhook.

Webhook: The updated webhook.

response = self.request(f"/v0/webhooks/{id}", data=params, method="PATCH")

return Webhook.model_validate(response)

def delete(self, id: str) -\> Webhook:

id (str): The id of the webhook.

Webhook: The deleted webhook.

response = self.request(f"/v0/webhooks/{id}", method="DELETE")

return Webhook.model_validate(response)

webhooks/\__init_\_.py

from .client import WebsetWebhooksClient

**all** = ["WebsetWebhooksClient"]

from exa_py import Exa

exa = Exa(os.environ.get("EXA_API_KEY"))
```

where websets is accessed via exa.websets….

**Examples:**

Example 1 (unknown):
```unknown
\--END--

Help me answer anything about Exa Websets API using Python. If is first user’s message, begin with python instructions to import
```

---

## Example usage

**URL:** llms-txt#example-usage

**Contents:**
- About Exa Code
- Use with MCP

context = get_code_context("Express.js middleware for authentication")
print(context)
javascript  theme={null}
async function getCodeContext(query, tokensNum = "dynamic") {
  const response = await fetch("https://api.exa.ai/context", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY"
    },
    body: JSON.stringify({
      query,
      tokensNum
    })
  });
  
  const result = await response.json();
  return result.response;
}

// Example usage
const context = await getCodeContext("Svelte component lifecycle methods");
console.log(context);
```

Vibe coding should never have a bad vibe. `exa-code` is a huge step towards coding agents that never hallucinate.

When your coding agent makes a search query, `exa-code` searches over billions of GitHub repos, docs pages, Stack Overflow posts, and more, to find the perfect, token-efficient context that the agent needs to code correctly. It's powered by the Exa search engine.

You can also use `exa-code` through the [Exa MCP server](https://docs.exa.ai/reference/exa-mcp) for seamless integration with AI coding assistants like Claude, Cursor, and other MCP-compatible clients.

The MCP integration provides the same powerful code context search capabilities directly within your development environment without needing to make direct API calls.

**Examples:**

Example 1 (unknown):
```unknown
**Using with JavaScript/Node.js**
```

---

## Parse the structured summary (returned as a JSON string)

**URL:** llms-txt#parse-the-structured-summary-(returned-as-a-json-string)

**Contents:**
  - Input Parameters:
  - Returns Example:
  - Return Parameters:
  - `SearchResponse[ResultWithTextAndHighlights]`
  - `ResultWithTextAndHighlights` Object
- `find_similar` Method
  - Input Example:
  - Input Parameters:
  - Returns Example:
  - Return Parameters:

first_result = result_with_structured_summary.results[0]
if first_result.summary:
    import json
    structured_data = json.loads(first_result.summary)
    print(structured_data["name"])        # e.g. "OpenAI"
    print(structured_data["industry"])    # e.g. "Artificial Intelligence"
    print(structured_data["keyProducts"]) # e.g. ["GPT-4", "DALL-E", "ChatGPT"]
JSON JSON theme={null}
`{
  "results": [
    {

"title": "2023 AI Trends in Health Care",
      "id": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "url": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "publishedDate": "2022-12-29",
      "author": "Wylie Wong",
      "text": "While the health care industry was initially slow to [... TRUNCATED IN THESE DOCS FOR BREVITY ...]",
      "highlights": [
        "But to do so, many health care institutions would like to share data, so they can build a more comprehensive dataset to use to train an AI model. Traditionally, they would have to move the data to one central repository. However, with federated or swarm learning, the data does not have to move. Instead, the AI model goes to each individual health care facility and trains on the data, he said. This way, health care providers can maintain security and governance over their data."
      ],
      "highlightScores": [
        0.5566554069519043
      ]
    },
    {

"title": "AI in healthcare: Innovative use cases and applications",
      "id": "https://www.leewayhertz.com/ai-use-cases-in-healthcare",
      "url": "https://www.leewayhertz.com/ai-use-cases-in-healthcare",
      "publishedDate": "2023-02-13",
      "author": "Akash Takyar",
      "text": "The integration of AI in healthcare is not [... TRUNCATED IN THESE DOCS FOR BREVITY ...]",
      "highlights": [
        "The ability of AI to analyze large amounts of medical data and identify patterns has led to more accurate and timely diagnoses. This has been especially helpful in identifying complex medical conditions, which may be difficult to detect using traditional methods. Here are some examples of successful implementation of AI in healthcare. IBM Watson Health: IBM Watson Health is an AI-powered system used in healthcare to improve patient care and outcomes. The system uses natural language processing and machine learning to analyze large amounts of data and provide personalized treatment plans for patients."
      ],
      "highlightScores": [
        0.6563674807548523
      ]
    }
  ],
  "requestId": "d8fd59c78d34afc9da173f1fe5aa8965"
}
Python Python theme={null}
similar_results = exa.find_similar(
    "miniclip.com",
    num_results=2,
    exclude_source_domain=True
)
JSON JSON theme={null}
{
  "results": [
    {

"title": "Play New Free Online Games Every Day",
      "id": "https://www.minigames.com/new-games",
      "url": "https://www.minigames.com/new-games",
      "publishedDate": "2000-01-01",
      "author": null
    },
    {

"title": "Play The best Online Games",
      "id": "https://www.minigames.com/",
      "url": "https://www.minigames.com/",
      "publishedDate": "2000-01-01",
      "author": null
    }
  ],
  "requestId": "08fdc6f20e9f3ea87f860af3f6ccc30f"
}
Python Python theme={null}

**Examples:**

Example 1 (unknown):
```unknown
### Input Parameters:

| Parameter              | Type                                              | Description                                                                                                                                                                                                                                                  | Default  |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| query                  | str                                               | The input query string.                                                                                                                                                                                                                                      | Required |
| text                   | Union\[TextContentsOptions, Literal\[True]]       | If provided, includes the full text of the content in the results.                                                                                                                                                                                           | None     |
| highlights             | Union\[HighlightsContentsOptions, Literal\[True]] | If provided, includes highlights of the content in the results.                                                                                                                                                                                              | None     |
| num\_results           | Optional\[int]                                    | Number of search results to return. Limits vary by search type: with "keyword": max 10, with "neural": max 100. If you want to increase the num results, contact sales ([hello@exa.ai](mailto:hello@exa.ai))                                                 | 10       |
| include\_domains       | Optional\[List\[str]]                             | List of domains to include in the search.                                                                                                                                                                                                                    | None     |
| exclude\_domains       | Optional\[List\[str]]                             | List of domains to exclude in the search.                                                                                                                                                                                                                    | None     |
| start\_crawl\_date     | Optional\[str]                                    | Results will only include links **crawled** after this date.                                                                                                                                                                                                 | None     |
| end\_crawl\_date       | Optional\[str]                                    | Results will only include links **crawled** before this date.                                                                                                                                                                                                | None     |
| start\_published\_date | Optional\[str]                                    | Results will only include links with a **published** date after this date.                                                                                                                                                                                   | None     |
| end\_published\_date   | Optional\[str]                                    | Results will only include links with a **published** date before this date.                                                                                                                                                                                  | None     |
| type                   | Optional\[str]                                    | [The type of search](#), keyword or neural.                                                                                                                                                                                                                  | "auto"   |
| category               | Optional\[str]                                    | A data category to focus on when searching, with higher comprehensivity and data cleanliness. Currently, the available categories are: company, research paper, news, linkedin profile, github, tweet, movie, song, personal site, pdf and financial report. | None     |
| include\_text          | Optional\[List\[str]]                             | List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.                                                                                                                                    | None     |
| exclude\_text          | Optional\[List\[str]]                             | List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.                                                                          | None     |
| context                | Union\[ContextContentsOptions, Literal\[True]]    | Return page contents as a context string for LLM RAG. When true, combines all result contents into one string. We recommend 10000+ characters for best results. Context strings often perform better than highlights for RAG applications.                   | None     |

### Returns Example:
```

Example 2 (unknown):
```unknown
### Return Parameters:

The return type depends on the combination of `text` and `highlights` parameters:

* `SearchResponse[ResultWithText]`: When only `text` is provided.
* `SearchResponse[ResultWithHighlights]`: When only `highlights` is provided.
* `SearchResponse[ResultWithTextAndHighlights]`: When both `text` and `highlights` are provided.

### `SearchResponse[ResultWithTextAndHighlights]`

| Field   | Type                               | Description                                 |
| ------- | ---------------------------------- | ------------------------------------------- |
| results | List\[ResultWithTextAndHighlights] | List of ResultWithTextAndHighlights objects |
| context | Optional\[str]                     | Results concatenated into a string          |

### `ResultWithTextAndHighlights` Object

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | str            | URL of the search result      |
| id    | str            | Temporary ID for the document |
| title | Optional\[str] | Title of the search result    |

\| published\_date   | Optional\[str]   | Estimated creation date                          |
\| author           | Optional\[str]   | Author of the content, if available              |
\| text             | str             | Text of the search result page (always present)  |
\| highlights       | List\[str]       | Highlights of the search result (always present) |
\| highlight\_scores | List\[float]     | Scores of the highlights (always present)        |

Note: If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

## `find_similar` Method

Find a list of similar results based on a webpage's URL.

### Input Example:
```

Example 3 (unknown):
```unknown
### Input Parameters:

| Parameter               | Type                                           | Description                                                                                                                                                                                                                                | Default  |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| url                     | str                                            | The URL of the webpage to find similar results for.                                                                                                                                                                                        | Required |
| num\_results            | Optional\[int]                                 | Number of similar results to return.                                                                                                                                                                                                       | None     |
| include\_domains        | Optional\[List\[str]]                          | List of domains to include in the search.                                                                                                                                                                                                  | None     |
| exclude\_domains        | Optional\[List\[str]]                          | List of domains to exclude from the search.                                                                                                                                                                                                | None     |
| start\_crawl\_date      | Optional\[str]                                 | Results will only include links **crawled** after this date.                                                                                                                                                                               | None     |
| end\_crawl\_date        | Optional\[str]                                 | Results will only include links **crawled** before this date.                                                                                                                                                                              | None     |
| start\_published\_date  | Optional\[str]                                 | Results will only include links with a **published** date after this date.                                                                                                                                                                 | None     |
| end\_published\_date    | Optional\[str]                                 | Results will only include links with a **published** date before this date.                                                                                                                                                                | None     |
| exclude\_source\_domain | Optional\[bool]                                | If true, excludes results from the same domain as the input URL.                                                                                                                                                                           | None     |
| category                | Optional\[str]                                 | A data category to focus on when searching, with higher comprehensivity and data cleanliness.                                                                                                                                              | None     |
| context                 | Union\[ContextContentsOptions, Literal\[True]] | Return page contents as a context string for LLM RAG. When true, combines all result contents into one string. We recommend 10000+ characters for best results. Context strings often perform better than highlights for RAG applications. | None     |

### Returns Example:
```

Example 4 (unknown):
```unknown
### Return Parameters:

`SearchResponse[_Result]`: The response containing similar results and optional autoprompt string.

### `SearchResponse[Results]`

| Field   | Type                               | Description                                 |
| ------- | ---------------------------------- | ------------------------------------------- |
| results | List\[ResultWithTextAndHighlights] | List of ResultWithTextAndHighlights objects |
| context | Optional\[String]                  | Results concatentated into a string         |

### `Results` Object

| Field | Type           | Description                   |
| ----- | -------------- | ----------------------------- |
| url   | str            | URL of the search result      |
| id    | str            | Temporary ID for the document |
| title | Optional\[str] | Title of the search result    |

\| published\_date | Optional\[str]   | Estimated creation date                       |
\| author         | Optional\[str]   | Author of the content, if available           |

## `find_similar_and_contents` Method

Find a list of similar results based on a webpage's URL, optionally including the text content or highlights of each result.

### Input Example:
```

---

## Delete an Enrichment

**URL:** llms-txt#delete-an-enrichment

Source: https://docs.exa.ai/websets/api/websets/enrichments/delete-an-enrichment

delete /v0/websets/{webset}/enrichments/{id}
When deleting an Enrichment, any running enrichments will be canceled and all existing `enrichment_result` generated by this Enrichment will no longer be available.

---

## Verify it works

**URL:** llms-txt#verify-it-works

**Contents:**
- What's Next?

is_valid = verify_webhook_signature(test_payload, test_header, test_secret)
print(f"Test signature valid: {is_valid}")  # Should print True
```

* Learn about [webhook events](/websets/api/events) and their payloads
* Set up [webhook retries and monitoring](/websets/api/webhooks/attempts/list-webhook-attempts)
* Explore [webhook management endpoints](/websets/api/webhooks/create-a-webhook)

---

## OpenAI Responses API

**URL:** llms-txt#openai-responses-api

**Contents:**
- What is Exa?
- Get Started
- Complete Example
- How Tool Calling Works
- Direct Research with Responses API
  - How It Works
  - Available Models
  - Research vs Web Search Tool

Source: https://docs.exa.ai/reference/openai-responses-api-with-exa

Use Exa with OpenAI's Responses API - both as a web search tool and for direct research capabilities.

Exa is the search engine built for AI. It finds information from across the web and delivers both links and the actual content from pages, making it easy to use with AI models.

Exa uses neural search technology to understand the meaning of queries, not just keywords. The API works with both semantic search and traditional keyword methods.

First, you'll need API keys from both OpenAI and Exa:

* Get your Exa API key from the [Exa Dashboard](https://dashboard.exa.ai/api-keys)
* Get your OpenAI API key from the [OpenAI Dashboard](https://platform.openai.com/api-keys)

Both examples show how to:

1. Set up the OpenAI Response API with Exa as a tool
2. Make a request to OpenAI
3. Handle the search function call
4. Send the search results back to OpenAI
5. Get the final response

Remember to replace the empty API key strings with your actual API keys when trying these examples.

## How Tool Calling Works

Let's break down how the Exa web search tool works with OpenAI's Response API:

1. **Tool Definition**: First, we define our Exa search as a tool that OpenAI can use:

2. **Initial Request**: When you send a message to OpenAI, the API looks at your message and decides if it needs to search the web. If it does, instead of giving a direct answer, it will return a "function call" in its output.

3. **Function Call**: If OpenAI decides to search, it returns something like:

4. **Search Execution**: Your code then:

* Takes this search query
   * Calls Exa's API to perform the actual web search
   * Gets real web results back

5. **Final Response**: You send these web results back to OpenAI, and it gives you a final answer using the fresh information from the web.

This back-and-forth process happens automatically in the code above, letting OpenAI use Exa's web search when it needs to find current information.

## Direct Research with Responses API

In addition to using Exa as a search tool, you can also access Exa's powerful research capabilities directly through the OpenAI Responses API format. This provides a familiar interface for running complex research tasks.

Simply point the OpenAI client to Exa's API and use our research models:

* **`exa-research`** - Adapts compute to task difficulty. Best for most use cases.
* **`exa-research-pro`** - Maximum quality with highest reasoning capability. Best for complex, multi-step research.

### Research vs Web Search Tool

Choose the right approach for your use case:

| Feature           | Web Search Tool (Function Calling)               | Direct Research                     |
| ----------------- | ------------------------------------------------ | ----------------------------------- |
| **Use Case**      | Augment LLM conversations with web data          | Get comprehensive research reports  |
| **Control**       | Full control over search queries and integration | Automated multi-step research       |
| **Response Time** | Fast (seconds)                                   | Longer (45-180 seconds)             |
| **Best For**      | Interactive chatbots, real-time Q\&A             | In-depth analysis, research reports |

<Note>
  For detailed information about research capabilities, structured outputs, and
  pricing, see the [Exa Research documentation](/reference/exa-research).
</Note>

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown
</CodeGroup>

Both examples show how to:

1. Set up the OpenAI Response API with Exa as a tool
2. Make a request to OpenAI
3. Handle the search function call
4. Send the search results back to OpenAI
5. Get the final response

Remember to replace the empty API key strings with your actual API keys when trying these examples.

## How Tool Calling Works

Let's break down how the Exa web search tool works with OpenAI's Response API:

1. **Tool Definition**: First, we define our Exa search as a tool that OpenAI can use:
```

Example 3 (unknown):
```unknown
2. **Initial Request**: When you send a message to OpenAI, the API looks at your message and decides if it needs to search the web. If it does, instead of giving a direct answer, it will return a "function call" in its output.

3. **Function Call**: If OpenAI decides to search, it returns something like:
```

Example 4 (unknown):
```unknown
4. **Search Execution**: Your code then:

   * Takes this search query
   * Calls Exa's API to perform the actual web search
   * Gets real web results back

5. **Final Response**: You send these web results back to OpenAI, and it gives you a final answer using the fresh information from the web.

This back-and-forth process happens automatically in the code above, letting OpenAI use Exa's web search when it needs to find current information.

## Direct Research with Responses API

In addition to using Exa as a search tool, you can also access Exa's powerful research capabilities directly through the OpenAI Responses API format. This provides a familiar interface for running complex research tasks.

### How It Works

Simply point the OpenAI client to Exa's API and use our research models:

<CodeGroup>
```

---

## Storyline Deduplication

**URL:** llms-txt#storyline-deduplication

A common issue when monitoring news is handling multiple articles about the same storyline. Often you want to group articles by storyline or remove duplicates so users don't see repeated content.

In our demo, we solve this using embeddings, vector search, and an LLM to classify duplicates.

<Steps>
  <Step title="Embed the Article Title">
    First, we'll embed the article's title using OpenAI's embedding API. We'll use the `text-embedding-3-small` model that produces vectors optimized for similarity comparisons.

<Step title="Search for Similar Articles">
    Next, we use PostgreSQL's `pgvector` extension to find the 10 most similar articles from the last week.

<Step title="Classify Duplicates with an LLM">
    Finally, we'll use an LLM with structured outputs to classify whether the article is a duplicate. The LLM will look at the titles of similar articles and determine if they are about the same event.

You can view the complete deduplication implementation [here](https://github.com/exa-labs/websets-news-monitor/blob/main/src/lib/dedupe.ts).

**Examples:**

Example 1 (unknown):
```unknown
</Step>

  <Step title="Search for Similar Articles">
    Next, we use PostgreSQL's `pgvector` extension to find the 10 most similar articles from the last week.
```

Example 2 (unknown):
```unknown
</Step>

  <Step title="Classify Duplicates with an LLM">
    Finally, we'll use an LLM with structured outputs to classify whether the article is a duplicate. The LLM will look at the titles of similar articles and determine if they are about the same event.
```

---

## Delete a Webhook

**URL:** llms-txt#delete-a-webhook

Source: https://docs.exa.ai/websets/api/webhooks/delete-a-webhook

delete /v0/webhooks/{id}
Remove a webhook from your account. Once deleted, the webhook stops getting notifications right away and cannot be brought back.

Important notes: - The webhook stops working as soon as you delete it - You cannot undo this - you'll need to create a new webhook if you want it back - Any notifications currently being sent may still complete

---

## create the rich console

**URL:** llms-txt#create-the-rich-console

---

## Overview

**URL:** llms-txt#overview

**Contents:**
- Key Features
- Core Objects
- Next Steps

Source: https://docs.exa.ai/websets/api/overview

The Websets API helps you find, verify, and process web data at scale to build your unique collection of web content.

The Websets API helps you create your own unique slice of the web by organizing content in containers (`Webset`). These containers store structured results (`WebsetItem`) which are discovered by search agents (`WebsetSearch`) that find web pages matching your specific criteria. Once these items are added to your Webset, they can be further processed with enrichment agents to extract additional data.

Whether you're looking for companies, people, or research papers, each result becomes a structured Item with source content, verification status, and type-specific fields. These Items can be further enriched with enrichments.

At its core, the API is:

* **Asynchronous**: It's an async-first API. Searches (`Webset Search`) can take from seconds to minutes, depending on the complexity.

* **Structured**: Every result (`Webset Item`) includes structured properties, webpage content, and verification against your criteria, with reasoning and references explaining why it matches.

* **Event-Driven**: Events are published and delivered through webhooks to notify when items are found and when enrichments complete, allowing you to process data as it arrives.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=265cc07c934104d780743b8a5d7bb17e" alt="Core concepts diagram showing relationships between Webset, Search, Item and Enrichment objects" data-og-width="1178" width="1178" data-og-height="324" height="324" data-path="images/websets/api/core.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=4b97e35beadbc0a94efe7213ee1c5983 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=1af211849acd9d2f782e61b838e40fe6 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e75ecf072cd81585e14fcce486b19289 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=341874ad3c08788afe8f972f17134f39 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=60373085f9f70ff2dc0e5d319c1fb405 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/api/core.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=5ea7a3540b5358338b1ea676fddc26b4 2500w" />

* **Webset**: Container that organizes your unique collection of web content and its related searches
* **Search**: An agent that searches and crawls the web to find precise entities matching your criteria, adding them to your Webset as structured WebsetItems
* **Item**: A structured result with source content, verification status, and type-specific fields (company, person, research paper, etc.)
* **Enrichment**: An agent that searches the web to enhance existing WebsetItems with additional structured data

* Follow our [quickstart guide](/websets/api/get-started)
* Learn more about [how it works](/websets/api/how-it-works)
* Browse the [API reference](/websets/api/websets/create-a-webset)

---

## Example queries

**URL:** llms-txt#example-queries

**Contents:**
- Sales
- Recruiting
- Market Research/Investing
- Sourcing
- Research Papers

Source: https://docs.exa.ai/websets/dashboard/websets-example-queries

Here are some examples for things to search for, to get you started!

1. Heads of Sales at companies with less than 500 employees, based in Europe
2. Marketing agencies, based in the US, with less than 30 employees.
3. Research labs, with at least 3 researchers, that have a biochemistry focus
4. Engineering managers at fortune 500 companies in traditional (non tech focused) industries
5. Startups that raised a series B in 2024 and have a head of people

1. Engineers with startup experience, that have contributed to open source projects
2. Candidate with strong analytical and operational skills, that has worked at a startup before
3. SDR, with experience selling healthcare products, based in the East Coast
4. ML Software engineers or computer science PhD students that went to a top 20 US university.
5. Investment banker or consultant, attended an Ivy League, has been at their role for over 2 years.

## Market Research/Investing

1. Linkedin profile of person that has changed their title to “Stealth Founder” in 2025
2. Companies in the agrotech space focused on hardware solutions
3. Financial reports of food & beverage companies that mention team downsizing
4. Fintech startups that raised a series A in 2024 from a major US based VC fund

1. Hydrochlorous acid manufacturers that have sustainability angles
2. High end clothing, low minimum order quantity manufacturers in Asia or Europe
3. Software solutions for fleet management automation
4. Cool agentic AI tools to help with productivity

1. Research papers, published in a major US journal, focused on cell generation technology
2. Research papers that disagree with transformer based model methodology for AI training
3. Research papers written by someone with a phd, focused on astrophysics.

---

## Create a simple research task

**URL:** llms-txt#create-a-simple-research-task

instructions = "What is the latest valuation of SpaceX?"
schema = {
    "type": "object",
    "properties": {
        "valuation": {"type": "string"},
        "date": {"type": "string"},
        "source": {"type": "string"}
    }
}

task = exa.research.create_task(
    instructions=instructions,
    output_schema=schema
)

---

## Prompting Websets

**URL:** llms-txt#prompting-websets

Source: https://docs.exa.ai/websets/dashboard/walkthroughs/Prompting

Here's how to prompt your query in Websets

Websets is a web research agent designed to find a perfect list of results that matches your criteria. Here's how to prompt it:

<Note>
  **How not to prompt Websets:** Websets is not an answer engine, so it's not meant for queries like "How your I think about xyz" or "Give me a report on abc".&#x20;
</Note>

* Type in your query, thinking of the type of thing you're trying to find (e.g. Companies, People, Research Papers, Articles, Reports, etc.)&#x20;

* Describing in detail the type of results you'd like. Common descriptors include location, size, theme, industry, qualifiers (e.g. have ISO certification, know rust), past experience etc.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rkXVtvVkqGs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />

---

## List Imports

**URL:** llms-txt#list-imports

Source: https://docs.exa.ai/websets/api/imports/list-imports

get /v0/imports
Lists all imports for the Webset.

---

## Get started

**URL:** llms-txt#get-started

**Contents:**
- 1. Sign up
- 2. Get started
- 3. Inside your Webset
- 4. Interacting with your Webset
- 5. Add more result criteria and custom columns
- 6. Share and export your Webset
- 7. Search history

Source: https://docs.exa.ai/websets/dashboard/get-started

Welcome to the Websets Dashboard! Find anything you want on the web, no matter how complex.

Websets is now generally available at [https://websets.exa.ai/](https://websets.exa.ai/)!

If you'd like to ask us about it, [book a call here](https://cal.com/team/exa/websets-enterprise-plan).

Websets is very easy to use.

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=8573cf90a9e9f98c757ac0fa56c8a64d" alt="" data-og-width="2870" width="2870" data-og-height="1726" height="1726" data-path="images/websets/websets-landing.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=de66ed748846f9a651802304ad3d1614 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=ebd78ea5324bf8b6a34e01c4dbe3d245 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=03d046869c31153e2824216bb2c819b8 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=de166a44e9d9ac2e1152e014e07bf013 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=fdefe60df2859535da64b5f0c2ad294f 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-landing.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b3e4379c6869344e27dc38cfcce154ea 2500w" />

1. Describe what you want in plain English - make it as complicated as you'd like!

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=15c47c556750ad0f1cebfb78b1ea52aa" alt="" data-og-width="2870" width="2870" data-og-height="1726" height="1726" data-path="images/websets/websets-preview.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7d558944e9b2fc701a8220617322320d 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=483fc1d5befb2dffa2304f8a38972d10 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=12332b3f51f36a234b9ac4d10168f97d 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d681978e7dba250827e3ac285d42c200 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=56005be584421d0a645f0d28231a1b05 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-preview.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7d4baf55a8b82257df6713a3bb970a71 2500w" />

2. Confirm your criteria and data category look good.

3. Confirm how many results you want, then start your search.

## 3. Inside your Webset

In brief, Websets does the following:

1. Break down what you're asking for

2. Find promising data that might satisfy your ask

3. Verify all criteria using AI agents and finding parallel sources

4. Adjust search based on feedback you provide our agent

<Info>
  If you're not satisfied with the initial results you see, refine the criteria
  in "Edit criteria" or inside the chat.
</Info>

## 4. Interacting with your Webset

Once the Webset is complete, you can interact with the components!

Click on a result to see:

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=793c040207129ee6c2efc1c8d922d6fe" alt="" data-og-width="2870" width="2870" data-og-height="1734" height="1734" data-path="images/websets/websets-result.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=f2d32b47558cb2b943956067b27978e9 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=90f1c0de595dae2684fa7183bb4d9d8b 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=6cd5c5beea505f898c4908631a9353c7 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=e31601ab8ec44fc3d6e9a8d6590a3412 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d1ed7aad186a9edf47bf41cf35a75298 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/websets-result.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d7c156953de4c11b8107d5ff4342d6a0 2500w" />

1. Its AI-generated summary

2. The criteria it met to be included in the Webset

3. The sources that informed the matching (you can click through the sources here)

You can manually delete results, to clean up your Webset before exporting it.

## 5. Add more result criteria and custom columns

<img src="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=5d94338cdb1931e9afced3c196acf075" alt="" data-og-width="2870" width="2870" data-og-height="1734" height="1734" data-path="images/websets/add-enrichment.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=280&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=46c8e83abb6deae456ac6ec0d04862f1 280w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=560&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=44c885f1c984f1851a930ee7aa10558a 560w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=840&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=3f44c132d543f7f25ccac000c7dc95b7 840w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=1100&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=b93f2443c8365f3e237dab1fa017d378 1100w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=1650&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=d24f3acfd54f33826be03810739457e5 1650w, https://mintcdn.com/exa-52/tmzyKnsgpKLGddKC/images/websets/add-enrichment.png?w=2500&fit=max&auto=format&n=tmzyKnsgpKLGddKC&q=85&s=7adbd96107c5f6a633311752ae5948f6 2500w" />

1. **Add enrichments:** You can create custom enrichment columns, asking for any information you want. Think contact information (email & phone number), revenue, employee count, sentiment analysis, summary of the paper, etc. Fill in:

* The name of the column (e.g. 'Revenue')

* The column type (e.g. 'Number')

* Instructions for Websets to find the data (e.g. 'Find the annual revenue of the company')

* Or click "fill in for me" for the instructions to be generated automatically by our agent

## 6. Share and export your Webset

1. Click export to download your Webset as a CSV file.

2. Click share to get a link for your Webset.

If you click on the sidebar icon in the top left, you'll see your full history with all past Websets in the left panel.

---

## OpenAI SDK Compatibility

**URL:** llms-txt#openai-sdk-compatibility

**Contents:**
- Overview
- Answer
- Research
- Research via Responses API
- Chat Wrapper

Source: https://docs.exa.ai/reference/openai-sdk

Use Exa's endpoints as a drop-in replacement for OpenAI - supporting both chat completions and responses APIs.

Exa provides OpenAI-compatible endpoints that work seamlessly with the OpenAI SDK:

| Endpoint            | OpenAI Interface     | Models Available                          | Use Case                     |
| ------------------- | -------------------- | ----------------------------------------- | ---------------------------- |
| `/chat/completions` | Chat Completions API | `exa`, `exa-research`, `exa-research-pro` | Traditional chat interface   |
| `/responses`        | Responses API        | `exa-research`, `exa-research-pro`        | Modern, simplified interface |

Exa will parse through your messages and send only the last message to `/answer`
  or `/research`.
</Info>

To use Exa's `/answer` endpoint via the chat completions interface:

1. Replace base URL with `https://api.exa.ai`
2. Replace API key with your Exa API key
3. Replace model name with `exa`.

See the full `/answer` endpoint reference [here](/reference/answer).{" "}
</Info>

To use Exa's research models via the chat completions interface:

1. Replace base URL with `https://api.exa.ai`
2. Replace API key with your Exa API key
3. Replace model name with `exa-research` or `exa-research-pro`

See the full `/research` endpoint reference [here](/reference/research/create-a-task).{" "}
</Info>

## Research via Responses API

You can also access Exa's research models using OpenAI's newer Responses API format:

<Note>
  The Responses API provides a simpler interface for single-turn research tasks.
  For more details on using Exa with OpenAI's Responses API, including web
  search tool integration, see the [OpenAI Responses API
  guide](/reference/openai-responses-api-with-exa).
</Note>

Exa provides a Python wrapper that automatically enhances any OpenAI chat completion with RAG capabilities. With one line of code, you can turn any OpenAI chat completion into an Exa-powered RAG system that handles search, chunking, and prompting automatically.

<CodeGroup>
  
</CodeGroup>

The wrapped client works exactly like the native OpenAI client, except it automatically improves your completions with relevant search results when needed.

The wrapper supports any parameters from the `exa.search()` function.

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown

```

Example 3 (unknown):
```unknown
</CodeGroup>

## Research

To use Exa's research models via the chat completions interface:

1. Replace base URL with `https://api.exa.ai`
2. Replace API key with your Exa API key
3. Replace model name with `exa-research` or `exa-research-pro`

<Info>
  {" "}

  See the full `/research` endpoint reference [here](/reference/research/create-a-task).{" "}
</Info>

<CodeGroup>
```

Example 4 (unknown):
```unknown

```

---
