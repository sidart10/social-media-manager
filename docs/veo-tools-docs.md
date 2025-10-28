```
# Veotools Documentation - LLM Documentation

Generated: 2025-10-04T17:09:54.058595

Version: 0.1.8

Python SDK and MCP server for video generation with Google Veo

## Table of Contents

- [__init__](#__init__)
- [__init__](#__init__)
- [bridge](#bridge)
- [mcp_api](#mcp_api)
- [cli](#cli)
- [core](#core)
- [__init__](#__init__)
- [video](#video)
- [models](#models)
- [__init__](#__init__)
- [executor](#executor)
- [scene_writer](#scene_writer)
- [__init__](#__init__)
- [extractor](#extractor)
- [__init__](#__init__)
- [daydreams](#daydreams)
- [__init__](#__init__)
- [mcp_server](#mcp_server)
- [__init__](#__init__)
- [seamless](#seamless)


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\__init__.py`

Veo Tools - A toolkit for AI-powered video generation and stitching.

### Functions

#### `init(api_key: str, log_level: str)`


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\api\__init__.py`


## bridge

`C:\Users\SwordSaint\Projects\veotools\src\veotools\api\bridge.py`

### Classes

#### Bridge

A fluent API bridge for chaining video generation and processing operations.

The Bridge class provides a convenient, chainable interface for combining multiple
video operations like generation, stitching, and media management. It maintains
an internal workflow and media queue to track operations and intermediate results.

Attributes:
    workflow: Workflow object tracking all operations performed.
    media_queue: List of media file paths in processing order.
    results: List of VideoResult objects from generation operations.
    storage: StorageManager instance for file operations.

Examples:
    Basic text-to-video generation:
    >>> bridge = Bridge("my_project")
    >>> result = bridge.generate("A cat playing").save()

    Chain multiple generations and stitch:
    >>> bridge = (Bridge("movie_project")
    ...     .generate("Opening scene")
    ...     .generate("Middle scene")
    ...     .generate("Ending scene")
    ...     .stitch(overlap=1.0)
    ...     .save(Path("final_movie.mp4")))

    Image-to-video with continuation:
    >>> bridge = (Bridge()
    ...     .add_media("photo.jpg")
    ...     .generate("The person starts walking")
    ...     .generate("They walk into the distance")
    ...     .stitch())


**Methods:**

- `__init__(self, name: Optional[str])`
- `with_progress(self, callback: Callable) -> 'Bridge'`
  - Set a progress callback for all subsequent operations.
- `add_media(self, media: Union[str, Path, List[Union[str, Path]]]) -> 'Bridge'`
  - Add media files to the processing queue.
- `generate(self, prompt: str, model: str) -> 'Bridge'`
  - Generate a video using text prompt and optional media input.
- `generate_transition(self, prompt: Optional[str], model: str) -> 'Bridge'`
  - Generate a transition video between the last two media items.
- `stitch(self, overlap: float) -> 'Bridge'`
  - Stitch all videos in the queue into a single continuous video.
- `save(self, output_path: Optional[Union[str, Path]]) -> Path`
  - Save the final result to a specified path or return the current path.
- `get_workflow(self) -> Workflow`
  - Get the workflow object containing all performed operations.
- `to_dict(self) -> dict`
  - Convert the workflow to a dictionary representation.
- `clear(self) -> 'Bridge'`
  - Clear the media queue, removing all queued media files.


## mcp_api

`C:\Users\SwordSaint\Projects\veotools\src\veotools\api\mcp_api.py`

MCP-friendly API wrappers for Veo Tools.

This module exposes small, deterministic, JSON-first functions intended for
use in Model Context Protocol (MCP) servers. It builds on top of the existing
blocking SDK functions by providing a non-blocking job lifecycle:

- generate_start(params) -> submits a generation job and returns immediately
- generate_get(job_id) -> fetches job status/progress/result
- generate_cancel(job_id) -> requests cancellation for a running job

It also provides environment/system helpers:
- preflight() -> checks API key, ffmpeg, and filesystem permissions
- version() -> returns package and key dependency versions

Design notes:
- Jobs are persisted as JSON files under StorageManager's base directory
  ("output/ops"). This allows stateless MCP handlers to inspect progress
  and results across processes.
- A background thread runs the blocking generation call and updates job state
  via the JobStore. Cancellation is cooperative: the on_progress callback
  checks a cancel flag in the persisted job state and raises Cancelled.

### Classes

#### Cancelled

Exception raised to signal cooperative cancellation of a generation job.

This exception is raised internally when a job's cancel_requested flag is set
to True, allowing for graceful termination of long-running operations.


#### JobRecord

Data class representing a generation job's state and metadata.

Stores all information about a generation job including status, progress,
parameters, results, and error information. Used for job persistence and
state management across processes.

Attributes:
    job_id: Unique identifier for the job.
    status: Current job status (pending|processing|complete|failed|cancelled).
    progress: Progress percentage (0-100).
    message: Current status message.
    created_at: Unix timestamp when job was created.
    updated_at: Unix timestamp of last update.
    cancel_requested: Whether cancellation has been requested.
    kind: Generation type (text|image|video).
    params: Dictionary of generation parameters.
    result: Optional result data when job completes.
    error_code: Optional error code if job fails.
    error_message: Optional error description if job fails.
    remote_operation_id: Optional ID from the remote API operation.


**Methods:**

- `to_json(self) -> str`
  - Convert the job record to JSON string representation.

#### JobStore

File-based persistence layer for generation jobs.

Manages storage and retrieval of job records using JSON files in the
filesystem. Each job is stored as a separate JSON file under the
`output/ops/{job_id}.json` path structure.

This design allows stateless MCP handlers to inspect job progress
and results across different processes and sessions.

Attributes:
    storage: StorageManager instance for base path management.
    ops_dir: Directory path where job files are stored.


**Methods:**

- `__init__(self, storage: Optional[StorageManager])`
  - Initialize the job store with optional custom storage manager.
- `_path(self, job_id: str) -> Path`
  - Get the file system path for a job record.
- `create(self, record: JobRecord) -> None`
  - Create a new job record on disk.
- `read(self, job_id: str) -> Optional[JobRecord]`
  - Read a job record from disk.
- `update(self, record: JobRecord) -> JobRecord`
  - Update a job record with new values and persist to disk.
- `request_cancel(self, job_id: str) -> Optional[JobRecord]`
  - Request cancellation of a job by setting the cancel flag.

### Functions

#### `preflight() -> Dict[str, Any]`

Check environment and system prerequisites for video generation.

Performs comprehensive system checks to ensure all required dependencies
and configurations are available for successful video generation operations.
This includes API key validation, FFmpeg availability, and filesystem permissions.

Returns:
    dict: JSON-serializable dictionary containing:
        - ok (bool): Overall system readiness status
        - provider (str): Active video provider identifier
        - api_key_present (bool): Whether the current provider's API key is set
        - ffmpeg (dict): FFmpeg installation status and version info
        - write_permissions (bool): Whether output directory is writable
        - base_path (str): Absolute path to the base output directory

Examples:
    >>> status = preflight()
    >>> if not status['ok']:
    ...     print("System not ready for generation")
    ...     if not status['api_key_present']:
    ...         print("Please supply the API key for the configured provider")
    ...     if not status['ffmpeg']['installed']:
    ...         print("Please install FFmpeg for video processing")
    >>> else:
    ...     print(f"System ready! Output directory: {status['base_path']}")

Note:
    This function is designed to be called before starting any video generation
    operations to ensure the environment is properly configured.

#### `version() -> Dict[str, Any]`

Report package and dependency versions in a JSON-friendly format.

Collects version information for veotools and its key dependencies,
providing a comprehensive overview of the current software environment.
Useful for debugging and support purposes.

Returns:
    dict: Dictionary containing:
        - veotools (str|None): veotools package version
        - dependencies (dict): Versions of key Python packages:
            - google-genai: Google GenerativeAI library version
            - opencv-python: OpenCV library version  
            - requests: HTTP requests library version
            - python-dotenv: Environment file loader version
        - ffmpeg (str|None): FFmpeg version string if available
    
Examples:
    >>> versions = version()
    >>> print(f"veotools: {versions['veotools']}")
    >>> print(f"Google GenAI: {versions['dependencies']['google-genai']}")
    >>> if versions['ffmpeg']:
    ...     print(f"FFmpeg: {versions['ffmpeg']}")
    >>> else:
    ...     print("FFmpeg not available")
  
Note:
    Returns None for any package that cannot be found or queried.
    This is expected behavior and not an error condition.

#### `_build_job(kind: str, params: Dict[str, Any]) -> JobRecord`

Create a new job record with initial values.

Args:
    kind: Type of generation job (text|image|video).
    params: Generation parameters dictionary.
  
Returns:
    JobRecord: New job record with unique ID and initial status.

#### `_validate_generate_inputs(params: Dict[str, Any]) -> None`

Validate generation parameters for consistency and file existence.

Args:
    params: Generation parameters to validate.
  
Raises:
    ValueError: If prompt is missing/invalid or multiple input types specified.
    FileNotFoundError: If specified input files don't exist.

#### `generate_start(params: Dict[str, Any]) -> Dict[str, Any]`

Start a video generation job and return immediately with job details.

Initiates a video generation job in the background and returns immediately
with job tracking information. The actual generation runs asynchronously
and can be monitored using generate_get().

Args:
    params: Generation parameters dictionary containing:
        - prompt (str): Required text description for generation
        - model (str, optional): Model to use (defaults to veo-3.0-fast-generate-preview)
        - input_image_path (str, optional): Path to input image for image-to-video
        - input_video_path (str, optional): Path to input video for continuation
        - extract_at (float, optional): Time offset for video continuation
        - options (dict, optional): Additional model-specific options

Returns:
    dict: Job information containing:
        - job_id (str): Unique job identifier for tracking
        - status (str): Initial job status ("processing")
        - progress (int): Initial progress (0)
        - message (str): Status message
        - kind (str): Generation type (text|image|video)
        - created_at (float): Job creation timestamp

Raises:
    ValueError: If required parameters are missing or invalid.
    FileNotFoundError: If input media files don't exist.

Examples:
    Start text-to-video generation:
    >>> job = generate_start({"prompt": "A sunset over mountains"})
    >>> print(f"Job started: {job['job_id']}")

    Start image-to-video generation:
    >>> job = generate_start({
    ...     "prompt": "The person starts walking",
    ...     "input_image_path": "photo.jpg"
    ... })

    Start video continuation:
    >>> job = generate_start({
    ...     "prompt": "The action continues",
    ...     "input_video_path": "scene1.mp4",
    ...     "extract_at": -2.0
    ... })

    Start with custom model and options:
    >>> job = generate_start({
    ...     "prompt": "A dancing robot",
    ...     "model": "veo-2.0",
    ...     "options": {"duration_seconds": 10, "enhance": True}
    ... })

Note:
    The job runs in a background thread. Use generate_get() to check
    progress and retrieve results when complete.

#### `generate_get(job_id: str) -> Dict[str, Any]`

Get the current status and results of a generation job.

Retrieves the current state of a generation job including progress,
status, and results if complete. This function can be called repeatedly
to monitor job progress.

Args:
    job_id: The unique job identifier returned by generate_start().

Returns:
    dict: Job status information containing:
        - job_id (str): The job identifier
        - status (str): Current status (processing|complete|failed|cancelled)
        - progress (int): Progress percentage (0-100)
        - message (str): Current status message
        - kind (str): Generation type (text|image|video)
        - remote_operation_id (str|None): Remote API operation ID if available
        - updated_at (float): Last update timestamp
        - result (dict, optional): Generation results when status is "complete"
        - error_code (str, optional): Error code if status is "failed"
        - error_message (str, optional): Error description if status is "failed"

    If job_id is not found, returns:
        - error_code (str): "VALIDATION"
        - error_message (str): Error description

Examples:
    Check job progress:
    >>> status = generate_get(job_id)
    >>> print(f"Progress: {status['progress']}% - {status['message']}")

    Wait for completion:
    >>> import time
    >>> while True:
    ...     status = generate_get(job_id)
    ...     if status['status'] == 'complete':
    ...         print(f"Video ready: {status['result']['path']}")
    ...         break
    ...     elif status['status'] == 'failed':
    ...         print(f"Generation failed: {status['error_message']}")
    ...         break
    ...     time.sleep(5)

    Handle different outcomes:
    >>> status = generate_get(job_id)
    >>> if status['status'] == 'complete':
    ...     video_path = status['result']['path']
    ...     metadata = status['result']['metadata']
    ...     print(f"Success! Video: {video_path}")
    ...     print(f"Duration: {metadata['duration']}s")
    ... elif status['status'] == 'failed':
    ...     print(f"Error ({status['error_code']}): {status['error_message']}")
    ... else:
    ...     print(f"Still processing: {status['progress']}%")

#### `generate_cancel(job_id: str) -> Dict[str, Any]`

Request cancellation of a running generation job.

Attempts to cancel a generation job that is currently processing.
Cancellation is cooperative - the job will stop at the next progress
update checkpoint. Already completed or failed jobs cannot be cancelled.

Args:
    job_id: The unique job identifier to cancel.

Returns:
    dict: Cancellation response containing:
        - job_id (str): The job identifier
        - status (str): "cancelling" if request was accepted

    If job_id is not found, returns:
        - error_code (str): "VALIDATION"
        - error_message (str): Error description

Examples:
    Cancel a running job:
    >>> response = generate_cancel(job_id)
    >>> if 'error_code' not in response:
    ...     print(f"Cancellation requested for job {response['job_id']}")
    ... else:
    ...     print(f"Cancel failed: {response['error_message']}")

    Check if cancellation succeeded:
    >>> generate_cancel(job_id)
    >>> time.sleep(2)
    >>> status = generate_get(job_id)
    >>> if status['status'] == 'cancelled':
    ...     print("Job successfully cancelled")

Note:
    Cancellation may not be immediate - the job will stop at the next
    progress checkpoint. Monitor with generate_get() to confirm cancellation.

#### `_run_generation(job_id: str) -> None`

Background worker function that runs the actual generation process.

This function runs in a separate thread and handles the entire generation
lifecycle including progress reporting, cooperative cancellation, and
error handling. Updates job state throughout the process.

Args:
    job_id: The unique job identifier to process.
  
Note:
    This is an internal function called by the background thread system.
    It should not be called directly.

#### `_sanitize_result(result: Dict[str, Any]) -> Dict[str, Any]`

Ensure result dictionary is JSON-serializable with proper types.

Args:
    result: Result dictionary to sanitize.
  
Returns:
    dict: Sanitized result with Path objects converted to strings.

#### `list_models(include_remote: bool) -> Dict[str, Any]`

List available video generation models with their capabilities.

Retrieves information about available Veo models including their capabilities,
default settings, and performance characteristics. Combines static model
registry with optional remote model discovery.

Args:
    include_remote: Whether to include models discovered from the remote API.
        If True, attempts to fetch additional model information from Google's API.
        If False, returns only the static model registry. Defaults to True.

Returns:
    dict: Model information containing:
        - models (list): List of model dictionaries, each containing:
            - id (str): Model identifier (e.g., "veo-3.0-fast-generate-preview")
            - name (str): Human-readable model name
            - capabilities (dict): Feature flags:
                - supports_duration (bool): Can specify custom duration
                - supports_enhance (bool): Can enhance prompts
                - supports_fps (bool): Can specify frame rate
                - supports_audio (bool): Can generate audio
            - default_duration (float|None): Default video duration in seconds
            - generation_time (float|None): Estimated generation time in seconds
            - source (str): Data source ("static", "remote", or "static+remote")

Examples:
    List all available models:
    >>> models = list_models()
    >>> for model in models['models']:
    ...     print(f"{model['name']} ({model['id']})")
    ...     if model['capabilities']['supports_duration']:
    ...         print(f"  Default duration: {model['default_duration']}s")

    Find models with specific capabilities:
    >>> models = list_models()
    >>> audio_models = [
    ...     m for m in models['models']
    ...     if m['capabilities']['supports_audio']
    ... ]
    >>> print(f"Found {len(audio_models)} models with audio support")

    Use only static model registry:
    >>> models = list_models(include_remote=False)
    >>> static_models = [m for m in models['models'] if m['source'] == 'static']

Note:
    Results are cached for 10 minutes to improve performance. Remote model
    discovery failures are silently ignored - static registry is always available.

#### `cache_create_from_files(model: str, files: list[str], system_instruction: Optional[str]) -> Dict[str, Any]`

Create a cached content handle from local file paths.

Uploads local files to create a cached content context that can be reused
across multiple API calls for efficiency. This is particularly useful when
working with large files or when making multiple requests with the same context.

Args:
    model: The model identifier to associate with the cached content.
    files: List of local file paths to upload and cache.
    system_instruction: Optional system instruction to include with the cache.

Returns:
    dict: Cache creation result containing:
        - name (str): Unique cache identifier for future reference
        - model (str): The associated model identifier
        - system_instruction (str|None): The system instruction if provided
        - contents_count (int): Number of files successfully cached

    On failure, returns:
        - error_code (str): Error classification
        - error_message (str): Detailed error description

Examples:
    Cache multiple reference images:
    >>> result = cache_create_from_files(
    ...     "veo-3.0-fast-generate-preview",
    ...     ["ref1.jpg", "ref2.jpg", "ref3.jpg"],
    ...     "These are reference images for style consistency"
    ... )
    >>> if 'name' in result:
    ...     cache_name = result['name']
    ...     print(f"Cache created: {cache_name}")
    ... else:
    ...     print(f"Cache creation failed: {result['error_message']}")

    Cache video reference:
    >>> result = cache_create_from_files(
    ...     "veo-2.0",
    ...     ["reference_video.mp4"]
    ... )

Raises:
    The function catches all exceptions and returns them as error dictionaries
    rather than raising them directly.

Note:
    Files are uploaded to Google's servers as part of the caching process.
    Ensure you have appropriate permissions for the files and comply with
    Google's usage policies.

#### `cache_get(name: str) -> Dict[str, Any]`

Retrieve cached content metadata by cache name.

Fetches information about a previously created cached content entry,
including lifecycle information like expiration times and creation dates.

Args:
    name: The unique cache identifier returned by cache_create_from_files().

Returns:
    dict: Cache metadata containing:
        - name (str): The cache identifier
        - ttl (str|None): Time-to-live if available
        - expire_time (str|None): Expiration timestamp if available
        - create_time (str|None): Creation timestamp if available

    On failure, returns:
        - error_code (str): Error classification
        - error_message (str): Detailed error description

Examples:
    Check cache status:
    >>> cache_info = cache_get(cache_name)
    >>> if 'error_code' not in cache_info:
    ...     print(f"Cache {cache_info['name']} is active")
    ...     if cache_info.get('expire_time'):
    ...         print(f"Expires: {cache_info['expire_time']}")
    ... else:
    ...     print(f"Cache not found: {cache_info['error_message']}")

Note:
    Available metadata fields may vary depending on the Google GenAI
    library version and cache configuration.

#### `cache_list() -> Dict[str, Any]`

List all cached content entries with their metadata.

Retrieves a list of all cached content entries accessible to the current
API key, including their metadata and lifecycle information.

Returns:
    dict: Cache listing containing:
        - caches (list): List of cache entries, each containing:
            - name (str): Cache identifier
            - model (str|None): Associated model if available
            - display_name (str|None): Human-readable name if available
            - create_time (str|None): Creation timestamp if available
            - update_time (str|None): Last update timestamp if available
            - expire_time (str|None): Expiration timestamp if available
            - usage_metadata (dict|None): Usage statistics if available

    On failure, returns:
        - error_code (str): Error classification
        - error_message (str): Detailed error description

Examples:
    List all caches:
    >>> cache_list_result = cache_list()
    >>> if 'caches' in cache_list_result:
    ...     for cache in cache_list_result['caches']:
    ...         print(f"Cache: {cache['name']}")
    ...         if cache.get('model'):
    ...             print(f"  Model: {cache['model']}")
    ...         if cache.get('expire_time'):
    ...             print(f"  Expires: {cache['expire_time']}")
    ... else:
    ...     print(f"Failed to list caches: {cache_list_result['error_message']}")

    Find caches by model:
    >>> result = cache_list()
    >>> if 'caches' in result:
    ...     veo3_caches = [
    ...         c for c in result['caches']
    ...         if c.get('model', '').startswith('veo-3')
    ...     ]

Note:
    Metadata availability depends on the Google GenAI library version
    and individual cache configurations.

#### `cache_update(name: str, ttl_seconds: Optional[int], expire_time_iso: Optional[str]) -> Dict[str, Any]`

Update TTL or expiration time for a cached content entry.

Modifies the lifecycle settings of an existing cached content entry.
You can specify either a TTL (time-to-live) in seconds or an absolute
expiration time, but not both.

Args:
    name: The unique cache identifier to update.
    ttl_seconds: Optional time-to-live in seconds (e.g., 300 for 5 minutes).
    expire_time_iso: Optional timezone-aware ISO-8601 datetime string
        (e.g., "2024-01-15T10:30:00Z").

Returns:
    dict: Update result containing:
        - name (str): The cache identifier
        - expire_time (str|None): New expiration time if available
        - ttl (str|None): New TTL setting if available
        - update_time (str|None): Update timestamp if available

    On failure, returns:
        - error_code (str): Error classification
        - error_message (str): Detailed error description

Examples:
    Extend cache TTL to 1 hour:
    >>> result = cache_update(cache_name, ttl_seconds=3600)
    >>> if 'error_code' not in result:
    ...     print(f"Cache TTL updated: {result.get('ttl')}")
    ... else:
    ...     print(f"Update failed: {result['error_message']}")

    Set specific expiration time:
    >>> result = cache_update(
    ...     cache_name,
    ...     expire_time_iso="2024-12-31T23:59:59Z"
    ... )

    Extend by 30 minutes:
    >>> result = cache_update(cache_name, ttl_seconds=1800)

Raises:
    Returns error dict instead of raising exceptions directly.

Note:
    - Only one of ttl_seconds or expire_time_iso should be provided
    - TTL is relative to the current time when the update is processed
    - expire_time_iso should be in UTC timezone for consistency

#### `cache_delete(name: str) -> Dict[str, Any]`

Delete a cached content entry by name.

Permanently removes a cached content entry and all associated files
from the system. This action cannot be undone.

Args:
    name: The unique cache identifier to delete.

Returns:
    dict: Deletion result containing:
        - deleted (bool): True if deletion was successful
        - name (str): The cache identifier that was deleted

    On failure, returns:
        - error_code (str): Error classification
        - error_message (str): Detailed error description

Examples:
    Delete a specific cache:
    >>> result = cache_delete(cache_name)
    >>> if result.get('deleted'):
    ...     print(f"Cache {result['name']} deleted successfully")
    ... else:
    ...     print(f"Deletion failed: {result.get('error_message')}")

    Delete with error handling:
    >>> result = cache_delete("non-existent-cache")
    >>> if 'error_code' in result:
    ...     print(f"Error: {result['error_message']}")

Note:
    Deletion is permanent and cannot be reversed. Ensure you no longer
    need the cached content before calling this function.

#### `plan_scenes() -> Dict[str, Any]`

Generate a structured Gemini-authored scene plan.

Args:
    idea: Core concept for the plan.
    number_of_scenes: Number of clips to request.
    character_description: Baseline character description passed to Gemini.
    character_characteristics: Character personality notes.
    video_type: Label for the production (e.g., vlog, trailer).
    video_characteristics: Overall stylistic guidance.
    camera_angle: Primary camera/perspective direction.
    additional_context: Extra instructions for Gemini.
    references: Optional list of character reference dicts.
    model: Gemini model override.

Returns:
    dict: Parsed plan payload or error structure.


## cli

`C:\Users\SwordSaint\Projects\veotools\src\veotools\cli.py`

Veotools command-line interface (no extra deps).

Usage examples:
  veo preflight
  veo list-models --remote
  veo generate --prompt "cat riding a hat" --model veo-3.0-fast-generate-preview
  veo continue --video dog.mp4 --prompt "the dog finds a treasure chest" --overlap 1.0

### Functions

#### `_load_references(paths: Optional[List[str]]) -> Optional[List[Dict[str, Any]]]`

Load character reference JSON blobs from disk.

#### `_print_progress(message: str, percent: int)`

#### `cmd_preflight(_: argparse.Namespace) -> int`

#### `cmd_list_models(ns: argparse.Namespace) -> int`

#### `cmd_generate(ns: argparse.Namespace) -> int`

#### `cmd_plan(ns: argparse.Namespace) -> int`

#### `cmd_plan_execute(ns: argparse.Namespace) -> int`

#### `cmd_plan_run(ns: argparse.Namespace) -> int`

#### `cmd_continue(ns: argparse.Namespace) -> int`

#### `build_parser() -> argparse.ArgumentParser`

#### `main(argv: Optional[list[str]]) -> int`


## core

`C:\Users\SwordSaint\Projects\veotools\src\veotools\core.py`

### Classes

#### VeoClient

Singleton client for Google GenAI API interactions.

This class implements a singleton pattern to ensure only one client instance
is created throughout the application lifecycle. It manages the authentication
and connection to Google's Generative AI API.

Attributes:
    client: The underlying Google GenAI client instance.

Raises:
    ValueError: If GEMINI_API_KEY environment variable is not set.

Examples:
    >>> client = VeoClient()
    >>> api_client = client.client
    >>> # Use api_client for API calls


**Methods:**

- `__new__(cls)`
  - Create or return the singleton instance.
- `__init__(self)`
  - Initialize the GenAI client with API key from environment.
- `client(self)`
  - Get the Google GenAI client instance.
- `provider(self) -> str`
  - Return the active provider identifier (google or daydreams).

#### StorageManager

**Methods:**

- `__init__(self, base_path: Optional[str])`
  - Manage output directories for videos, frames, and temp files.
- `get_video_path(self, filename: str) -> Path`
  - Get the full path for a video file.
- `get_frame_path(self, filename: str) -> Path`
  - Get the full path for a frame image file.
- `get_temp_path(self, filename: str) -> Path`
  - Get the full path for a temporary file.
- `cleanup_temp(self)`
  - Remove all files from the temporary directory.
- `get_url(self, path: Path) -> Optional[str]`
  - Convert a file path to a file:// URL.

#### ProgressTracker

Track and report progress for long-running operations.

This class provides a simple interface for tracking progress updates during
video generation and processing operations. It supports custom callbacks
or falls back to logging.

Attributes:
    callback: Function to call with progress updates.
    current_progress: Current progress percentage (0-100).
    logger: Logger instance for default progress reporting.

Examples:
    >>> def my_callback(msg: str, pct: int):
    ...     print(f"{msg}: {pct}%")
    >>> tracker = ProgressTracker(callback=my_callback)
    >>> tracker.start("Processing")
    >>> tracker.update("Halfway", 50)
    >>> tracker.complete("Done")


**Methods:**

- `__init__(self, callback: Optional[Callable])`
  - Initialize the progress tracker.
- `default_progress(self, message: str, percent: int)`
  - Default progress callback that logs to the logger.
- `update(self, message: str, percent: int)`
  - Update progress and trigger callback.
- `start(self, message: str)`
  - Mark the start of an operation (0% progress).
- `complete(self, message: str)`
  - Mark the completion of an operation (100% progress).

#### ModelConfig

Configuration and capabilities for different Veo video generation models.


**Methods:**

- `normalize_model(cls, model: Optional[str]) -> str`
- `to_daydreams_model(cls, model: Optional[str]) -> Optional[str]`
- `to_daydreams_slug(cls, model: Optional[str]) -> Optional[str]`
- `get_config(cls, model: str) -> dict`
- `build_generation_config(cls, model: str) -> types.GenerateVideosConfig`
  - Build a generation configuration based on model capabilities.


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\generate\__init__.py`

Video generation module for Veo Tools.


## video

`C:\Users\SwordSaint\Projects\veotools\src\veotools\generate\video.py`

Video generation functions for Veo Tools.

### Functions

#### `_validate_person_generation(model: str, mode: str, person_generation: Optional[str]) -> None`

Validate person_generation parameter based on model and generation mode.

Validates the person_generation parameter against the constraints defined for different
Veo model versions and generation modes. Veo 3.0 and 2.0 have different allowed values
for text vs image/video generation modes.

Args:
    model: The model identifier (e.g., "veo-3.0-fast-generate-preview").
    mode: Generation mode - "text", "image", or "video" (video treated like image-seeded).
    person_generation: Person generation policy - "allow_all", "allow_adult", or "dont_allow".

Raises:
    ValueError: If person_generation value is not allowed for the given model and mode.

Note:
    - Veo 3.0 text mode: allows "allow_all"
    - Veo 3.0 image/video mode: allows "allow_adult"
    - Veo 2.0 text mode: allows "allow_all", "allow_adult", "dont_allow"
    - Veo 2.0 image/video mode: allows "allow_adult", "dont_allow"

#### `_apply_default_person_generation(model: str, mode: str, config_params: dict) -> None`

Populate default person_generation for Veo 3 models when unspecified.

#### `generate_from_text(prompt: str, model: str, duration_seconds: Optional[int], on_progress: Optional[Callable]) -> VideoResult`

Generate a video from a text prompt.

Automatically selects the active video provider (Google GenAI or Daydreams Router)
based on configuration. Falls back to Google behaviour when no provider override
is specified.

#### `_generate_from_text_google(client, prompt: str) -> VideoResult`

#### `_generate_from_text_daydreams(client, prompt: str) -> VideoResult`

#### `generate_from_image(image_path: Path, prompt: str, model: str, on_progress: Optional[Callable]) -> VideoResult`

Generate a video from an image seed.

#### `_generate_from_image_google(client, image_path: Path, prompt: str) -> VideoResult`

#### `generate_from_video(video_path: Path, prompt: str, extract_at: float, model: str, on_progress: Optional[Callable]) -> VideoResult`

Generate a video continuation from an existing clip.

#### `_generate_from_video_google(client, video_path: Path, prompt: str) -> VideoResult`

#### `_download_video(video: types.Video, output_path: Path, client) -> Path`

Download a generated video from Google's API to local storage.

Downloads video content from either a URI or direct data blob provided by the
Google GenAI API. Handles authentication headers and writes the video to the
specified output path.

Args:
    video: Video object from Google GenAI API containing URI or data.
    output_path: Local path where the video should be saved.
    client: Google GenAI client instance (currently unused but kept for compatibility).

Returns:
    Path: The output path where the video was saved.

Raises:
    RuntimeError: If the video object contains neither URI nor data.
    requests.HTTPError: If the download request fails.
    OSError: If writing to the output path fails.

Note:
    This function requires the GEMINI_API_KEY environment variable to be set
    for URI-based downloads.


## models

`C:\Users\SwordSaint\Projects\veotools\src\veotools\models.py`

### Classes

#### JobStatus

Enumeration of possible job statuses for video generation tasks.

Attributes:
    PENDING: Job has been created but not yet started.
    PROCESSING: Job is currently being processed.
    COMPLETE: Job has finished successfully.
    FAILED: Job has failed with an error.


#### VideoMetadata

Metadata information for a video file.

Attributes:
    fps: Frames per second of the video.
    duration: Duration of the video in seconds.
    width: Width of the video in pixels.
    height: Height of the video in pixels.
    frame_count: Total number of frames in the video.

Examples:
    >>> metadata = VideoMetadata(fps=30.0, duration=10.0, width=1920, height=1080)
    >>> print(metadata.frame_count)  # 300
    >>> print(metadata.to_dict())


**Methods:**

- `__init__(self, fps: float, duration: float, width: int, height: int)`
  - Initialize video metadata.
- `to_dict(self) -> Dict[str, Any]`
  - Convert metadata to a dictionary.

#### VideoResult

Result object for video generation operations.

This class encapsulates all information about a video generation task,
including its status, progress, metadata, and any errors.

Attributes:
    id: Unique identifier for this result.
    path: Path to the generated video file.
    url: URL to access the video (if available).
    operation_id: Google API operation ID for tracking.
    status: Current status of the generation job.
    progress: Progress percentage (0-100).
    metadata: Video metadata (fps, duration, resolution).
    prompt: Text prompt used for generation.
    model: Model used for generation.
    error: Error information if generation failed.
    created_at: Timestamp when the job was created.
    completed_at: Timestamp when the job completed.

Examples:
    >>> result = VideoResult()
    >>> result.update_progress("Generating", 50)
    >>> print(result.status)  # JobStatus.PROCESSING
    >>> result.update_progress("Complete", 100)
    >>> print(result.status)  # JobStatus.COMPLETE


**Methods:**

- `__init__(self, path: Optional[Path], operation_id: Optional[str])`
  - Initialize a video result.
- `to_dict(self) -> Dict[str, Any]`
  - Convert the result to a JSON-serializable dictionary.
- `update_progress(self, message: str, percent: int)`
  - Update the progress of the video generation.
- `mark_failed(self, error: Exception)`
  - Mark the job as failed with an error.

#### WorkflowStep

Individual step in a video processing workflow.

Attributes:
    id: Unique identifier for this step.
    action: Action to perform (e.g., "generate", "stitch").
    params: Parameters for the action.
    result: Result of executing this step.
    created_at: Timestamp when the step was created.


**Methods:**

- `__init__(self, action: str, params: Dict[str, Any])`
  - Initialize a workflow step.
- `to_dict(self) -> Dict[str, Any]`
  - Convert the step to a dictionary.

#### Workflow

Container for a multi-step video processing workflow.

Workflows allow chaining multiple operations like generation,
stitching, and processing into a single managed flow.

Attributes:
    id: Unique identifier for this workflow.
    name: Human-readable name for the workflow.
    steps: List of workflow steps to execute.
    current_step: Index of the currently executing step.
    created_at: Timestamp when the workflow was created.
    updated_at: Timestamp of the last update.

Examples:
    >>> workflow = Workflow("my_video_project")
    >>> workflow.add_step("generate", {"prompt": "sunset"})
    >>> workflow.add_step("stitch", {"videos": ["a.mp4", "b.mp4"]})
    >>> print(len(workflow.steps))  # 2


**Methods:**

- `__init__(self, name: Optional[str])`
  - Initialize a workflow.
- `add_step(self, action: str, params: Dict[str, Any]) -> WorkflowStep`
  - Add a new step to the workflow.
- `to_dict(self) -> Dict[str, Any]`
  - Convert the workflow to a dictionary.
- `from_dict(cls, data: Dict[str, Any]) -> 'Workflow'`
  - Create a workflow from a dictionary.


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\plan\__init__.py`

Planning utilities for structuring Veo video workflows.


## executor

`C:\Users\SwordSaint\Projects\veotools\src\veotools\plan\executor.py`

Execute scene plans into rendered videos.

### Classes

#### PlanExecutionResult

Container for executing a :class:`ScenePlan`.

Attributes:
    plan: The validated plan that was executed.
    clip_prompts: Prompts used for each clip in execution order.
    clip_results: Video results returned by Veo for each clip.
    final_result: The stitched video result, if stitching was requested.


**Methods:**

- `to_dict(self) -> Dict[str, object]`
  - Convert execution details to a JSON-friendly dictionary.

### Functions

#### `_load_plan_like(plan: ScenePlan | Path | str | Dict[str, object]) -> ScenePlan`

#### `_default_prompt_builder(clip: Clip) -> str`

#### `execute_scene_plan(plan: ScenePlan | Path | str | Dict[str, object]) -> PlanExecutionResult`

Render all clips in a scene plan and optionally stitch the results.

Args:
    plan: ScenePlan instance, dict payload, or path to plan JSON.
    model: Default Veo model to use for clip generation.
    prompt_builder: Optional callable to customize prompts per clip.
    image_provider: Optional callable returning a seed image path per clip.
    clip_options: Optional callable providing extra keyword args per clip.
    stitch: Whether to stitch the rendered clips into a final timeline.
    overlap: Overlap trimming in seconds when stitching.
    auto_seed_last_frame: When True, extract a frame from each rendered clip and
        feed it as the seed image for the next clip (unless an image_provider
        supplies one explicitly).
    seed_frame_offset: Time offset (seconds) used when extracting the frame
        from each clip for auto seeding. Defaults to -0.5 (half a second from end).
    on_progress: Optional progress callback used for generation and stitching.

Returns:
    PlanExecutionResult containing individual clip results and optional final video.


## scene_writer

`C:\Users\SwordSaint\Projects\veotools\src\veotools\plan\scene_writer.py`

Scene planning helpers powered by Gemini.

### Classes

#### Shot

Technical camera details for a specific clip.


#### Subject

Describes the character's appearance and wardrobe within a specific clip.


#### Scene

Describes the setting and environment of the clip.


#### VisualDetails

Actions and props within the clip.


#### Cinematography

Lighting, tone, and colour direction for the clip.


#### AudioTrack

Defines the sound elements specific to this clip.


#### Dialogue

Defines the spoken lines and how they are presented.


#### Performance

Controls for the character's animated performance in this clip.


#### Clip

Defines a single video segment or shot.


#### CharacterProfile

A detailed, consistent profile of the character's core attributes.


#### ScenePlan

Structured response containing characters and clips.


**Methods:**

- `model_dump_json(self) -> str`
  - Provide JSON serialisation helper that matches BaseModel signature.

#### SceneWriter

High-level helper for generating structured scene plans.


**Methods:**

- `__init__(self, model: str)`
- `_build_prompt_sections() -> tuple[str, str]`
- `generate(self, idea: str) -> ScenePlan`
  - Generate a structured scene plan from a high-level idea.
- `_generate_plan_google(self, prompt: str, request_config: types.GenerateContentConfig, model: str) -> str`
- `_generate_plan_daydreams(self, prompt: str, schema: Dict[str, object], model: str) -> str`
- `_strip_code_fence(text: str) -> str`
- `_coerce_video_prompts(prompts: Sequence[Dict[str, Any]]) -> Dict[str, Any]`
- `_normalize_chat_model(model: str) -> str`

### Functions

#### `generate_scene_plan(idea: str) -> ScenePlan`

Convenience wrapper around :class:`SceneWriter` for one-off calls.


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\process\__init__.py`

Video processing module for Veo Tools.


## extractor

`C:\Users\SwordSaint\Projects\veotools\src\veotools\process\extractor.py`

Frame extraction and video info utilities for Veo Tools.

Enhancements:
- `get_video_info` now first attempts to use `ffprobe` for accurate metadata
  (fps, duration, width, height). If `ffprobe` is unavailable, it falls back
  to OpenCV-based probing.

### Functions

#### `extract_frame(video_path: Path, time_offset: float, output_path: Optional[Path]) -> Path`

Extract a single frame from a video at the specified time offset.

Extracts and saves a frame from a video file as a JPEG image. Supports both
positive time offsets (from start) and negative offsets (from end). Uses
OpenCV for video processing and automatically manages storage paths.

Args:
    video_path: Path to the input video file.
    time_offset: Time in seconds where to extract the frame. Positive values
        are from the start, negative values from the end. Defaults to -1.0
        (1 second from the end).
    output_path: Optional custom path for saving the extracted frame. If None,
        auto-generates a path using StorageManager.

Returns:
    Path: The path where the extracted frame was saved.

Raises:
    FileNotFoundError: If the input video file doesn't exist.
    RuntimeError: If frame extraction fails (e.g., invalid time offset).

Examples:
    Extract the last frame:
    >>> frame_path = extract_frame(Path("video.mp4"))
    >>> print(f"Frame saved to: {frame_path}")

    Extract frame at 5 seconds:
    >>> frame_path = extract_frame(Path("video.mp4"), time_offset=5.0)

    Extract with custom output path:
    >>> custom_path = Path("my_frame.jpg")
    >>> frame_path = extract_frame(
    ...     Path("video.mp4"),
    ...     time_offset=10.0,
    ...     output_path=custom_path
    ... )

#### `extract_frames(video_path: Path, times: list, output_dir: Optional[Path]) -> list`

Extract multiple frames from a video at specified time offsets.

Extracts and saves multiple frames from a video file as JPEG images. Each
time offset can be positive (from start) or negative (from end). Uses
OpenCV for efficient batch frame extraction.

Args:
    video_path: Path to the input video file.
    times: List of time offsets in seconds. Each can be positive (from start)
        or negative (from end).
    output_dir: Optional directory for saving frames. If None, uses
        StorageManager's default frame directory.

Returns:
    list: List of Path objects where the extracted frames were saved.
        Order matches the input times list.

Raises:
    FileNotFoundError: If the input video file doesn't exist.

Examples:
    Extract frames at multiple timestamps:
    >>> frame_paths = extract_frames(
    ...     Path("video.mp4"),
    ...     [0.0, 5.0, 10.0, -1.0]  # Start, 5s, 10s, and 1s from end
    ... )
    >>> print(f"Extracted {len(frame_paths)} frames")

    Extract to custom directory:
    >>> output_dir = Path("extracted_frames")
    >>> frame_paths = extract_frames(
    ...     Path("movie.mp4"),
    ...     [1.0, 2.0, 3.0],
    ...     output_dir=output_dir
    ... )

Note:
    Failed frame extractions are silently skipped. The returned list may
    contain fewer paths than input times if some extractions fail.

#### `get_video_info(video_path: Path) -> dict`

Extract comprehensive metadata from a video file.

Retrieves video metadata including frame rate, duration, dimensions, and frame count.
First attempts to use ffprobe for accurate metadata extraction, falling back to
OpenCV if ffprobe is unavailable. This dual approach ensures maximum compatibility
and accuracy.

Args:
    video_path: Path to the input video file.

Returns:
    dict: Video metadata containing:
        - fps (float): Frames per second
        - frame_count (int): Total number of frames
        - width (int): Video width in pixels
        - height (int): Video height in pixels
        - duration (float): Video duration in seconds

Raises:
    FileNotFoundError: If the input video file doesn't exist.

Examples:
    Get basic video information:
    >>> info = get_video_info(Path("video.mp4"))
    >>> print(f"Duration: {info['duration']:.2f}s")
    >>> print(f"Resolution: {info['width']}x{info['height']}")
    >>> print(f"Frame rate: {info['fps']} fps")

    Check if video has expected properties:
    >>> info = get_video_info(Path("movie.mp4"))
    >>> if info['fps'] > 30:
    ...     print("High frame rate video")
    >>> if info['width'] >= 1920:
    ...     print("HD or higher resolution")

Note:
    - ffprobe (from FFmpeg) provides more accurate metadata when available
    - OpenCV fallback may have slight inaccuracies in frame rate calculation
    - All numeric values are guaranteed to be non-negative
    - Returns 0.0 for fps/duration if video properties cannot be determined


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\providers\__init__.py`

Provider integration helpers for Veotools.


## daydreams

`C:\Users\SwordSaint\Projects\veotools\src\veotools\providers\daydreams.py`

Daydreams Router API client helpers.

### Classes

#### DaydreamsRouterClient

Lightweight wrapper around the Daydreams Router REST API.


**Methods:**

- `__init__(self) -> None`
- `_url(self, path: str) -> str`
- `submit_video_job(self, model: str, payload: Dict[str, Any]) -> Dict[str, Any]`
- `get_video_job(self, job_id: str) -> Dict[str, Any]`
- `fetch_job_status(self, status_url: str) -> Dict[str, Any]`
- `list_models(self) -> Dict[str, Any]`
- `download_asset(self, asset_url: str, output_path) -> None`
- `create_chat_completion(self, payload: Dict[str, Any]) -> Dict[str, Any]`


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\server\__init__.py`


## mcp_server

`C:\Users\SwordSaint\Projects\veotools\src\veotools\server\mcp_server.py`

Built-in MCP server entry point for Veotools.

Run:
  veo-mcp            # via console script
  python -m veotools.mcp_server

### Functions

#### `preflight() -> dict`

Check environment and system prerequisites.

Returns a JSON dict with: ok, provider, api_key_present, ffmpeg {installed, version},
write_permissions, base_path.

#### `version() -> dict`

Report package and dependency versions.

Returns keys: veotools, dependencies {google-genai, opencv-python, ...}, ffmpeg.

#### `list_models(include_remote: bool) -> dict`

List available models with capability flags.

- include_remote: when true, merges remote discovery from the API.
Returns { models: [ {id, name, capabilities, default_duration, generation_time, source} ] }.

#### `cache_create_from_files(model: str, files: list[str], system_instruction: str | None) -> dict`

Create a cached content handle from local files.

Returns {name, model, contents_count}.

#### `cache_get(name: str) -> dict`

Get cached content metadata by name.

#### `cache_list() -> dict`

List cached content metadata entries.

#### `cache_update(name: str, ttl_seconds: int | None, expire_time_iso: str | None) -> dict`

Update TTL or expiry time for a cache.

#### `cache_delete(name: str) -> dict`

Delete a cached content entry by name.

#### `plan_scenes(idea: str, number_of_scenes: int, character_description: str | None, character_characteristics: str | None, video_type: str | None, video_characteristics: str | None, camera_angle: str | None, additional_context: str | None, model: str | None) -> dict`

Generate a structured Gemini-authored scene plan.

#### `generate_start(prompt: str, model: Optional[str], input_image_path: Optional[str], input_video_path: Optional[str], extract_at: Optional[float], options: Optional[Dict]) -> dict`

Start a video generation job.

- prompt: required text prompt
- model: e.g., "veo-3.0-fast-generate-preview"; if omitted, SDK default is used
- input_image_path: path to seed image for image→video
- input_video_path: path to source video for continuation
- extract_at: seconds offset for continuation (use -1.0 for last second)
- options: pass-through config, e.g. {aspect_ratio: "16:9", negative_prompt: "...",
  person_generation: "allow_all"}
Returns {job_id, status, progress, message, kind, created_at}.

#### `generate_cancel(job_id: str) -> dict`

Request cooperative cancellation for a running job.

#### `list_recent_videos(limit: int) -> list[dict]`

List recent generated videos with URLs and metadata.

- limit: max items (default 10).
Returns array of {path, url, metadata, modified}.

#### `get_job(job_id: str) -> dict`

Retrieve the persisted job record by id.

#### `main() -> None`


## __init__

`C:\Users\SwordSaint\Projects\veotools\src\veotools\stitch\__init__.py`

Video stitching module for Veo Tools.


## seamless

`C:\Users\SwordSaint\Projects\veotools\src\veotools\stitch\seamless.py`

Seamless video stitching for Veo Tools.

### Functions

#### `_has_audio(video_path: Path) -> bool`

Return True if the media file contains an audio stream.

#### `stitch_videos(video_paths: List[Path], overlap: float, output_path: Optional[Path], on_progress: Optional[Callable]) -> VideoResult`

Seamlessly stitch multiple videos (with audio) into a single timeline.

Uses FFmpeg to concatenate videos while optionally trimming an overlap from
the tail of each clip (except the last) to create smoother scene transitions.
Both audio and video streams are preserved and re-encoded into a single
H.264/AAC MP4.

Args:
    video_paths: List of paths to video files to stitch together, in order.
    overlap: Duration in seconds to trim from the end of each video (except
        the last one) to create smooth transitions. Defaults to 1.0.
    output_path: Optional custom output path. If None, auto-generates a path
        using :class:`StorageManager`.
    on_progress: Optional callback function called with progress updates (message, percent).

Returns:
    VideoResult: Object containing the stitched video path, metadata, and operation details.

Raises:
    ValueError: If fewer than two videos are provided.
    FileNotFoundError: If any input video file doesn't exist.
    RuntimeError: If FFmpeg fails to stitch the videos.

Examples:
    Stitch videos with default overlap:
    >>> video_files = [Path("part1.mp4"), Path("part2.mp4"), Path("part3.mp4")]
    >>> result = stitch_videos(video_files)
    >>> print(f"Stitched video: {result.path}")

    Stitch without overlap:
    >>> result = stitch_videos(video_files, overlap=0.0)

    Stitch with progress tracking:
    >>> def show_progress(msg, pct):
    ...     print(f"Stitching: {msg} ({pct}%)")
    >>> result = stitch_videos(
    ...     video_files,
    ...     overlap=2.0,
    ...     on_progress=show_progress
    ... )

    Custom output location:
    >>> result = stitch_videos(
    ...     video_files,
    ...     output_path=Path("final_movie.mp4")
    ... )

Note:
    - Videos are resized to match the first video's dimensions
    - Uses H.264 encoding with CRF 23 for good quality/size balance
    - Automatically handles frame rate consistency
    - FFmpeg is used for final encoding if available, otherwise uses OpenCV

#### `stitch_with_transitions(video_paths: List[Path], transition_videos: List[Path], output_path: Optional[Path], on_progress: Optional[Callable]) -> VideoResult`

Stitch videos together with custom transition videos between them.

Combines multiple videos by inserting transition videos between each pair
of main videos. The transitions are placed between consecutive videos to
create smooth, cinematic connections between scenes.

Args:
    video_paths: List of main video files to stitch together, in order.
    transition_videos: List of transition videos to insert between main videos.
        Must have exactly len(video_paths) - 1 transitions.
    output_path: Optional custom output path. If None, auto-generates a path
        using StorageManager.
    on_progress: Optional callback function called with progress updates (message, percent).

Returns:
    VideoResult: Object containing the final stitched video with transitions.

Raises:
    ValueError: If the number of transition videos doesn't match the requirement
        (should be one less than the number of main videos).
    FileNotFoundError: If any video file doesn't exist.

Examples:
    Add transitions between three video clips:
    >>> main_videos = [Path("scene1.mp4"), Path("scene2.mp4"), Path("scene3.mp4")]
    >>> transitions = [Path("fade1.mp4"), Path("fade2.mp4")]
    >>> result = stitch_with_transitions(main_videos, transitions)
    >>> print(f"Final video with transitions: {result.path}")

    With progress tracking:
    >>> def track_progress(msg, pct):
    ...     print(f"Processing: {msg} - {pct}%")
    >>> result = stitch_with_transitions(
    ...     main_videos,
    ...     transitions,
    ...     on_progress=track_progress
    ... )

Note:
    This function uses stitch_videos internally with overlap=0 to preserve
    transition videos exactly as provided.

#### `create_transition_points(video_a: Path, video_b: Path, extract_points: Optional[dict]) -> tuple`

Extract frames from two videos to analyze potential transition points.

Extracts representative frames from two videos that can be used to analyze
how well they might transition together. Typically extracts the ending frame
of the first video and the beginning frame of the second video.

Args:
    video_a: Path to the first video file.
    video_b: Path to the second video file.
    extract_points: Optional dictionary specifying extraction points:
        - "a_end": Time offset for frame extraction from video_a (default: -1.0)
        - "b_start": Time offset for frame extraction from video_b (default: 1.0)
        If None, uses default values.

Returns:
    tuple: A tuple containing (frame_a_path, frame_b_path) where:
        - frame_a_path: Path to extracted frame from video_a
        - frame_b_path: Path to extracted frame from video_b

Raises:
    FileNotFoundError: If either video file doesn't exist.
    RuntimeError: If frame extraction fails for either video.

Examples:
    Extract transition frames with defaults:
    >>> frame_a, frame_b = create_transition_points(
    ...     Path("clip1.mp4"),
    ...     Path("clip2.mp4")
    ... )
    >>> print(f"Transition frames: {frame_a}, {frame_b}")

    Custom extraction points:
    >>> points = {"a_end": -2.0, "b_start": 0.5}
    >>> frame_a, frame_b = create_transition_points(
    ...     Path("scene1.mp4"),
    ...     Path("scene2.mp4"),
    ...     extract_points=points
    ... )

Note:
    - Default extracts 1 second before the end of video_a
    - Default extracts 1 second after the start of video_b
    - Negative values in extract_points count from the end of the video
    - These frames can be used to analyze color, composition, or content
      similarity for better transition planning
```
