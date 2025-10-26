# Twitter API Client Module

Full Twitter Premium support for the Social Media Posting Agent.

## Features

- Long-form posts (up to 25,000 characters)
- Image uploads (1-4 per tweet)
- Video uploads (chunked)
- Thread creation
- Rate limiting protection
- Input validation
- Error handling

## Installation

```bash
cd bmad/modules/twitter-api-client
npm install
```

## Usage

### Basic Text Post

```javascript
import { TwitterClient } from './bmad/modules/twitter-api-client/index.js';

const client = new TwitterClient();

const result = await client.createTweet({
  text: 'Hello from Twitter API client!',
});

console.log(result.url);
```

### Post with Images

```javascript
const result = await client.createTweet({
  text: 'Check out these images!',
  media: [
    { path: '/path/to/image1.jpg', altText: 'First image' },
    { path: '/path/to/image2.jpg', altText: 'Second image' },
  ],
});
```

### Long-form Post

```javascript
const longText = '...your 10,000 character post...';

const result = await client.createTweet({
  text: longText,
});
```

### Thread

```javascript
const thread = await client.createThread([
  { text: 'Tweet 1/3', media: [{ path: '/image1.jpg' }] },
  { text: 'Tweet 2/3' },
  { text: 'Tweet 3/3 - Conclusion!' },
]);
```

## Configuration

Credentials loaded from `.env` in project root:

```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

## Testing

```bash
node __tests__/validator.test.js

node __tests__/integration.test.js
```

## Rate Limiting

- Monthly: 1,500 posts (hard limit)
- Daily: 50 posts (recommended)
- Hourly: 10 posts (recommended)

Check stats:

```javascript
const stats = client.getRateLimitStats();
```

## Error Handling

All methods return standardized response:

```javascript
{
  success: true|false,
  id: "tweet_id",
  url: "https://twitter.com/...",
  error: "error message if failed",
  rateLimit: {...}
}
```

## API Reference

### `createTweet(request)`

Create a single tweet with optional media.

**Parameters:**

- `request.text` (string, required): Tweet text (max 25,000 chars for Premium)
- `request.media` (array, optional): Array of media objects
  - `path` (string): Absolute path to image/video file
  - `altText` (string, optional): Alt text for accessibility

**Returns:** Promise resolving to response object

### `createThread(tweets)`

Create a thread of connected tweets.

**Parameters:**

- `tweets` (array): Array of tweet objects with same structure as `createTweet`

**Returns:** Promise resolving to array of response objects

### `getMyProfile()`

Get the authenticated user's profile information.

**Returns:** Promise resolving to profile data

### `getRateLimitStats()`

Get current rate limit usage statistics.

**Returns:** Object with counts, limits, and remaining posts

## Media Specifications

### Images

- Formats: JPG, PNG, GIF, WEBP
- Max size: 5MB (15MB for GIFs)
- Max per tweet: 4 images

### Videos

- Formats: MP4, MOV
- Max size: 512MB
- Max per tweet: 1 video
- Cannot mix with images

## Project Structure

```
bmad/modules/twitter-api-client/
├── package.json
├── index.js
├── config.js
├── lib/
│   ├── client.js
│   ├── validator.js
│   └── rate-limiter.js
└── __tests__/
    ├── validator.test.js
    └── integration.test.js
```

## Dependencies

- `twitter-api-v2`: Official Twitter API v2 client library
- `dotenv`: Environment variable management

## License

MIT
