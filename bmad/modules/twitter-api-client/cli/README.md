# Twitter API Client - CLI Utilities

Reusable command-line utilities for posting to Twitter.

## Architecture

```
TwitterClient (lib/client.js)
      ↑
TwitterExecutor (executor.js) ← Central execution engine
      ↑
CLI Tools (cli/*.js) ← Thin wrappers with argument parsing
```

All CLI tools use the same executor, ensuring consistency and maintainability.

## Available Commands

### 1. Post Thread

Post a multi-tweet thread from a JSON file.

```bash
node cli/thread.js --input threads/my-thread.json
```

**JSON Format:**
```json
{
  "tweets": [
    { "text": "Tweet 1" },
    { "text": "Tweet 2", "media": [{"path": "/path/image.jpg", "altText": "Description"}] },
    { "text": "Tweet 3" }
  ]
}
```

### 2. Post Tweet

Post a single text tweet.

```bash
node cli/tweet.js --text "Hello Twitter!"
```

**With Reply:**
```bash
node cli/tweet.js --text "Reply tweet" --reply-to 1234567890
```

### 3. Post with Media

Post tweet with images or video.

```bash
# Single image
node cli/media.js --text "Check this!" --image photo.jpg --alt "Description"

# Multiple images (1-4)
node cli/media.js --text "Gallery" --image img1.jpg --image img2.jpg

# Video
node cli/media.js --text "Watch!" --video video.mp4
```

### 4. Check Rate Limits

Display current API rate limit status.

```bash
node cli/rate-limits.js
```

### 5. Verify Credentials

Test API connection and credentials.

```bash
node cli/verify.js
```

## Usage from Workflows

Workflows can use the executor directly:

```javascript
import { TwitterExecutor } from './bmad/modules/twitter-api-client/executor.js';

const executor = new TwitterExecutor();

// Post thread
await executor.execute({
  type: 'thread',
  data: {
    tweets: [
      { text: "Tweet 1" },
      { text: "Tweet 2" }
    ]
  }
});

// Post single tweet
await executor.execute({
  type: 'tweet',
  data: {
    text: "Hello!",
    media: [{ path: "/path/image.jpg" }]
  }
});

// Check limits
await executor.execute({ type: 'rate-limits' });

// Verify
await executor.execute({ type: 'verify' });
```

## Usage from Node Scripts

```javascript
import { executeFromFile, executeFromJSON } from './executor.js';

// From JSON file
const result = await executeFromFile('threads/my-thread.json');

// From JSON string
const result = await executeFromJSON('{"type":"tweet","data":{"text":"Hi"}}');
```

## Action Types

All actions follow this structure:

```javascript
{
  type: "action-type",  // Required: 'tweet', 'thread', 'rate-limits', 'verify'
  data: {               // Optional: depends on action type
    // Action-specific data
  }
}
```

### Action: tweet

```javascript
{
  type: 'tweet',
  data: {
    text: 'Tweet text (required)',
    media: [{ path: '/path/file.jpg', altText: 'Optional alt text' }],  // Optional
    reply_to: '1234567890'  // Optional tweet ID to reply to
  }
}
```

### Action: thread

```javascript
{
  type: 'thread',
  data: {
    tweets: [
      { text: 'Tweet 1' },
      { text: 'Tweet 2', media: [{ path: '/path/img.jpg' }] }
    ]
  }
}
```

### Action: rate-limits

```javascript
{
  type: 'rate-limits'
  // No data field needed
}
```

### Action: verify

```javascript
{
  type: 'verify'
  // No data field needed
}
```

## Response Format

All actions return:

```javascript
{
  action: 'action-type',
  success: true|false,
  data: { /* success data */ },
  error: null|'error message'
}
```

## Error Handling

All CLI tools:
- Exit with code 0 on success
- Exit with code 1 on failure
- Print errors to stderr
- Show helpful error messages

## Making Scripts Executable

```bash
chmod +x cli/*.js
```

Then run directly:
```bash
./cli/tweet.js --text "Hello!"
```

## Integration with BMAD Workflows

Workflows should import and use the executor:

```yaml
instructions: |
  Step 1: Prepare thread data

  Step 2: Post thread
  ```javascript
  import { TwitterExecutor } from './bmad/modules/twitter-api-client/executor.js';

  const executor = new TwitterExecutor();
  await executor.execute({
    type: 'thread',
    data: { tweets: [...] }
  });
  ```
```

## Benefits

1. **No Temporary Files** - Everything is reusable and permanent
2. **Single Source of Truth** - All execution goes through executor
3. **Type-Safe** - Structured JSON with validation
4. **Testable** - Mock executor, test independently
5. **Maintainable** - Update executor, all tools benefit
6. **Consistent** - Same error handling everywhere
7. **Extensible** - Add new action types easily

## Adding New Actions

1. Add method to `TwitterExecutor` class in `executor.js`
2. Add case to `execute()` switch statement
3. Create CLI tool in `cli/` if needed
4. Document in this README

Example:

```javascript
// In executor.js
async executeNewAction(data) {
  // Implementation
  return { action: 'new-action', success: true, data: {...}, error: null };
}

// In execute() method
case 'new-action':
  return await this.executeNewAction(action.data);
```
