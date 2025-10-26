# Social Posting Agent - Instructions

## Overview

This agent handles multi-platform social media posting through API integrations. Currently focused on Twitter Premium with plans for LinkedIn, YouTube, and Instagram.

## Twitter API Client Module

### Location

```
{project-root}/bmad/modules/twitter-api-client/
```

### Usage Pattern

```javascript
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';

const client = new TwitterClient();

// All credentials loaded automatically from .env
```

## API Operations

### 1. Post Text Tweet

```javascript
const result = await client.createTweet({
  text: 'Your tweet text here (up to 25,000 chars for Premium)',
});

if (result.success) {
  console.log(`Posted: ${result.url}`);
  console.log(`Tweet ID: ${result.id}`);
} else {
  console.error(`Failed: ${result.error}`);
}
```

### 2. Post Tweet with Images

```javascript
const result = await client.createTweet({
  text: 'Check out these images!',
  media: [
    { path: '/absolute/path/to/image1.jpg', altText: 'Description of image 1' },
    { path: '/absolute/path/to/image2.jpg', altText: 'Description of image 2' },
  ],
});
```

**Constraints:**

- 1-4 images per tweet
- Formats: JPG, PNG, GIF, WEBP
- Max size: 5MB per image (15MB for GIFs)
- Requires absolute paths

### 3. Post Tweet with Video

```javascript
const result = await client.createTweet({
  text: 'Check out this video!',
  media: [{ path: '/absolute/path/to/video.mp4', altText: 'Video description' }],
});
```

**Constraints:**

- 1 video per tweet (cannot mix with images)
- Formats: MP4, MOV
- Max size: 512MB
- Automatic chunked upload for large files
- Processing may take time

### 4. Create Thread

```javascript
const thread = await client.createThread([
  { text: 'Tweet 1/3 - Introduction' },
  {
    text: 'Tweet 2/3 - Details',
    media: [{ path: '/path/to/image.jpg' }],
  },
  { text: 'Tweet 3/3 - Conclusion' },
]);

// Check results
thread.forEach((result, index) => {
  if (result.success) {
    console.log(`Tweet ${index + 1}: ${result.url}`);
  } else {
    console.log(`Tweet ${index + 1} failed: ${result.error}`);
  }
});
```

**Features:**

- Automatic reply linking
- Each tweet can have media
- Stops on first error
- Returns array of results

### 5. Get Profile

```javascript
const profile = await client.getMyProfile();

if (profile.success) {
  console.log(`Username: @${profile.data.username}`);
  console.log(`Name: ${profile.data.name}`);
  console.log(`ID: ${profile.data.id}`);
}
```

### 6. Check Rate Limits

```javascript
const stats = client.getRateLimitStats();

console.log('Usage:');
console.log(`  Monthly: ${stats.counts.monthly}/${stats.limits.MONTHLY}`);
console.log(`  Daily: ${stats.counts.daily}/${stats.limits.DAILY_RECOMMENDED}`);
console.log(`  Hourly: ${stats.counts.hourly}/${stats.limits.HOURLY_RECOMMENDED}`);

console.log('Remaining:');
console.log(`  Monthly: ${stats.remaining.monthly}`);
console.log(`  Daily: ${stats.remaining.daily}`);
console.log(`  Hourly: ${stats.remaining.hourly}`);
```

## Rate Limits

### Twitter Free Tier

- **Monthly**: 1,500 posts (hard limit)
- **Daily**: 50 posts (recommended)
- **Hourly**: 10 posts (recommended)

### Tracking

Rate limits are automatically tracked in:

```
{project-root}/bmad/modules/twitter-api-client/.rate-limit-state.json
```

### Best Practices

1. Check limits before bulk posting
2. Warn user when approaching limits
3. Space out posts to avoid hourly spikes
4. Monitor monthly usage for planning

## Error Handling

All methods return structured responses:

```javascript
{
  success: true/false,

  // On success:
  id: "tweet_id",
  url: "https://twitter.com/user/status/...",
  text: "actual_tweet_text",
  data: { /* full API response */ },

  // On failure:
  error: "error_message",
  code: "error_code",
  rateLimit: { /* rate limit info if applicable */ },
  rateLimitExceeded: true/false
}
```

### Common Errors

**1. Missing Credentials**

```
Error: Missing Twitter credentials: TWITTER_API_KEY, TWITTER_API_SECRET
```

**Solution**: Check .env file has all 4 Twitter variables

**2. Validation Failed**

```
Validation failed: Text exceeds Premium limit (25000 chars)
```

**Solution**: Shorten text or split into thread

**3. Rate Limit Exceeded**

```
Monthly limit reached (1500 posts/month)
```

**Solution**: Wait for monthly reset or upgrade account

**4. File Not Found**

```
Cannot access file: /path/to/image.jpg
```

**Solution**: Verify absolute path is correct

**5. Media Format Invalid**

```
Unsupported format: .gif
```

**Solution**: Use supported formats (JPG, PNG, GIF, WEBP for images; MP4, MOV for videos)

## Validation Rules

The client automatically validates:

### Text

- Required (cannot be empty)
- Max 25,000 characters for Premium
- Max 280 characters for non-Premium

### Media

- Max 4 images OR 1 video per tweet
- Cannot mix images and videos
- File must exist and be accessible
- Format must be supported
- Size must be within limits

### Thread

- Each tweet must have valid text
- Media rules apply to each tweet
- Thread stops on first error

## Security

### Credential Storage

All credentials are loaded from `.env` file:

```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

### Best Practices

- Never log credentials
- Never display tokens in responses
- Use environment variables only
- Never commit .env to git

## Response Formatting

When displaying results to users:

### Success

```
✓ Posted successfully!
  Tweet ID: 1234567890
  URL: https://twitter.com/user/status/1234567890
  Characters: 142
```

### Error

```
✗ Failed to post
  Error: Text exceeds Premium limit (25000 chars)
  Current length: 26543 chars
  Solution: Shorten text or split into thread
```

### Rate Limit Warning

```
⚠️ Approaching daily limit!
  Used: 48/50 posts today
  Remaining: 2 posts
  Resets: Tomorrow at midnight
```

## Testing

Test files available in module:

```
{project-root}/bmad/modules/twitter-api-client/__tests__/validator.test.js
{project-root}/bmad/modules/twitter-api-client/__tests__/integration.test.js
{project-root}/bmad/modules/twitter-api-client/test-demo.js
{project-root}/bmad/modules/twitter-api-client/test-image.js
{project-root}/bmad/modules/twitter-api-client/test-video.js
{project-root}/bmad/modules/twitter-api-client/test-thread.js
```

Run tests:

```bash
cd bmad/modules/twitter-api-client
node __tests__/validator.test.js
node __tests__/integration.test.js
node test-demo.js
```

## Future Integrations

### LinkedIn (Planned)

- Text posts
- Image posts
- Article sharing
- Company page posting

### YouTube (Available via MCP)

- Use `mcp__youtube-uploader-mcp__` tools
- OAuth flow required
- Video upload with metadata

### Instagram (Planned)

- Image posts (1:1 or 4:5 aspect ratio)
- Video posts (reels)
- Carousel posts
- Story posting

## Troubleshooting

### Import Errors

```javascript
// ✗ Wrong
import { TwitterClient } from '@bmad/twitter-api-client';

// ✓ Correct
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';
```

### Path Issues

```javascript
// ✗ Wrong - relative paths don't work
media: [{ path: './image.jpg' }];

// ✓ Correct - use absolute paths
media: [{ path: '/Users/username/project/image.jpg' }];
```

### Rate Limit State

If rate limit tracking seems incorrect, delete state file:

```bash
rm bmad/modules/twitter-api-client/.rate-limit-state.json
```

Will automatically recreate with fresh counts.

## Support

Module documentation: `bmad/modules/twitter-api-client/README.md`
PRP document: `PRPs/twitter-api-premium-integration.md`
Test results: All tests pass, 6+ live tweets validated
