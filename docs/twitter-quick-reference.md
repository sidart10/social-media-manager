# Twitter API - Quick Reference Guide

**Last Updated:** October 28, 2025

---

## 🎯 Two Patterns Available

| Pattern           | Use Case                            | Import            |
| ----------------- | ----------------------------------- | ----------------- |
| **Direct Client** | Workflows, inline code              | `TwitterClient`   |
| **Executor**      | Standalone scripts, CLI, automation | `TwitterExecutor` |

---

## Pattern 1: Direct Client (Workflows)

### Post Tweet

```javascript
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';
const client = new TwitterClient();

await client.createTweet({ text: 'Hello!' });
```

### Post Thread

```javascript
await client.createThread([{ text: 'Tweet 1' }, { text: 'Tweet 2' }, { text: 'Tweet 3' }]);
```

### With Media

```javascript
await client.createTweet({
  text: 'Check this!',
  media: [{ path: '/path/image.jpg', altText: 'Description' }],
});
```

---

## Pattern 2: Executor (Scripts & CLI)

### Post Tweet

```javascript
import { TwitterExecutor } from './bmad/modules/twitter-api-client/executor.js';
const executor = new TwitterExecutor();

await executor.execute({
  type: 'tweet',
  data: { text: 'Hello!' },
});
```

### Post Thread

```javascript
await executor.execute({
  type: 'thread',
  data: {
    tweets: [{ text: 'Tweet 1' }, { text: 'Tweet 2' }, { text: 'Tweet 3' }],
  },
});
```

### Check Rate Limits

```javascript
await executor.execute({ type: 'rate-limits' });
```

### Verify Credentials

```javascript
await executor.execute({ type: 'verify' });
```

---

## CLI Commands

```bash
# Post tweet
node bmad/modules/twitter-api-client/cli/tweet.js --text "Hello!"

# Post thread
node bmad/modules/twitter-api-client/cli/thread.js --input thread.json

# Post with media
node bmad/modules/twitter-api-client/cli/media.js --text "Photo!" --image pic.jpg

# Check limits
node bmad/modules/twitter-api-client/cli/rate-limits.js

# Verify
node bmad/modules/twitter-api-client/cli/verify.js
```

---

## Rate Limits

| Period  | Limit | Type        |
| ------- | ----- | ----------- |
| Monthly | 1,500 | Hard (API)  |
| Daily   | 50    | Recommended |
| Hourly  | 10    | Recommended |

---

## Media Constraints

### Images

- Count: 1-4 per tweet
- Formats: JPG, PNG, GIF, WEBP
- Size: 5MB (15MB for GIFs)

### Videos

- Count: 1 per tweet (cannot mix with images)
- Formats: MP4, MOV
- Size: 512MB max

### Text

- Premium: 25,000 characters
- Free: 280 characters

---

## Response Format (Executor)

All executor actions return:

```javascript
{
  action: 'action-type',
  success: true|false,
  data: { /* success data */ },
  error: null|'error message'
}
```

---

## Decision Tree

**Need to post once?**
→ Use `client.createTweet()` or `executor.execute({ type: 'tweet' })`

**Need to post a thread?**
→ Use `client.createThread()` or `executor.execute({ type: 'thread' })`

**Building a CLI tool?**
→ Use `TwitterExecutor` or CLI utilities

**Writing workflow code?**
→ Use `TwitterClient` (direct imports)

**Need structured JSON responses?**
→ Use `TwitterExecutor`

---

## File Locations

```
bmad/modules/twitter-api-client/
├── index.js           → TwitterClient (Pattern 1)
├── executor.js        → TwitterExecutor (Pattern 2)
├── cli/               → CLI utilities
│   ├── tweet.js
│   ├── thread.js
│   ├── media.js
│   ├── rate-limits.js
│   └── verify.js
└── test-executor.js   → 15 automated tests
```

---

## Testing

```bash
# Run test suite
node bmad/modules/twitter-api-client/test-executor.js

# Expected: 🎉 All tests passed! (15/15)
```

---

## Common Tasks

### Check if I can post

```javascript
const stats = client.getRateLimitStats();
console.log(`Remaining: ${stats.remaining.monthly}`);
```

### Post with retry logic

```javascript
const result = await client.createTweet({ text: 'Hello!' });
if (!result.success && result.error.includes('429')) {
  console.log('Rate limited, wait and retry');
}
```

### Thread with images

```javascript
await client.createThread([
  { text: 'Tweet 1', media: [{ path: '/img1.jpg' }] },
  { text: 'Tweet 2' },
  { text: 'Tweet 3', media: [{ path: '/img2.jpg' }] },
]);
```

---

## Error Handling

### Direct Client

```javascript
const result = await client.createTweet({ text: 'Hello!' });
if (!result.success) {
  console.error(`Failed: ${result.error}`);
}
```

### Executor

```javascript
const result = await executor.execute({ type: 'tweet', data: { text: 'Hi' } });
if (!result.success) {
  console.error(`Failed: ${result.error}`);
  // result.error contains descriptive message
}
```

---

## Tips

✅ **Always validate text length** before posting
✅ **Check rate limits** before bulk operations
✅ **Use absolute paths** for media files
✅ **Test with verify** before important posts
✅ **Keep executor for automation** (no temp files!)
✅ **Keep client for workflows** (inline execution)

---

## Need Help?

**Full Documentation:**

- `bmad/modules/twitter-api-client/cli/README.md`
- `bmad/agents/social-posting-agent/social-posting-agent-sidecar/instructions.md`

**Test Suite:**

- `bmad/modules/twitter-api-client/test-executor.js`

**QA Report:**

- `bmad/modules/twitter-api-client/QA-REPORT.md`
