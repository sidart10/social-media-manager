import { TwitterApi } from 'twitter-api-v2';
import { twitterConfig, validateConfig } from '../config.js';
import { validateTweetRequest } from './validator.js';
import { RateLimiter } from './rate-limiter.js';

export class TwitterClient {
  constructor(credentials = twitterConfig) {
    validateConfig();

    this.client = new TwitterApi({
      appKey: credentials.appKey,
      appSecret: credentials.appSecret,
      accessToken: credentials.accessToken,
      accessSecret: credentials.accessSecret,
    });

    this.rwClient = this.client.readWrite;
    this.rateLimiter = new RateLimiter();
  }

  async uploadMedia(filePath, options = {}) {
    try {
      const mediaId = await this.client.v1.uploadMedia(filePath, {
        mimeType: options.mimeType,
        target: 'tweet',
      });

      if (options.altText) {
        await this.client.v1.createMediaMetadata(mediaId, {
          alt_text: { text: options.altText },
        });
      }

      return mediaId;
    } catch (error) {
      throw new Error(`Media upload failed: ${error.message}`);
    }
  }

  async uploadMultipleMedia(mediaFiles) {
    const uploads = mediaFiles.map((file) => this.uploadMedia(file.path, { altText: file.altText }));
    return Promise.all(uploads);
  }

  async createTweet(request) {
    const limitCheck = await this.rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.errors.join(', '),
        rateLimitExceeded: true,
      };
    }

    if (limitCheck.warnings.length > 0) {
      console.warn('Rate limit warnings:', limitCheck.warnings);
    }

    const validation = await validateTweetRequest(request);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    try {
      const payload = {
        text: request.text,
      };

      if (request.media && request.media.length > 0) {
        const mediaIds = await this.uploadMultipleMedia(request.media);
        payload.media = { media_ids: mediaIds };
      }

      const response = await this.rwClient.v2.tweet(payload);

      this.rateLimiter.incrementCount();

      return {
        success: true,
        id: response.data.id,
        text: response.data.text,
        url: `https://twitter.com/user/status/${response.data.id}`,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code,
        rateLimit: error.rateLimit,
      };
    }
  }

  async createThread(tweets) {
    const results = [];
    let previousTweetId = null;

    for (const tweet of tweets) {
      try {
        const payload = {
          text: tweet.text,
        };

        if (tweet.media && tweet.media.length > 0) {
          const mediaIds = await this.uploadMultipleMedia(tweet.media);
          payload.media = { media_ids: mediaIds };
        }

        if (previousTweetId) {
          payload.reply = {
            in_reply_to_tweet_id: previousTweetId,
          };
        }

        const response = await this.rwClient.v2.tweet(payload);

        results.push({
          success: true,
          id: response.data.id,
          text: response.data.text,
          url: `https://twitter.com/user/status/${response.data.id}`,
        });

        previousTweetId = response.data.id;
      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          text: tweet.text,
        });
        break;
      }
    }

    return results;
  }

  async getMyProfile() {
    try {
      const user = await this.rwClient.v2.me();
      return {
        success: true,
        data: user.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  getRateLimitStats() {
    return this.rateLimiter.getStats();
  }
}
