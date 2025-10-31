import { TwitterClient } from './index.js';

export class TwitterExecutor {
  constructor(client = null) {
    this.client = client || new TwitterClient();
  }

  async execute(action) {
    if (!action || !action.type) {
      throw new Error('Action must have a type field');
    }

    switch (action.type) {
      case 'tweet':
        return await this.executeTweet(action.data);

      case 'thread':
        return await this.executeThread(action.data);

      case 'rate-limits':
        return this.executeRateLimits();

      case 'verify':
        return await this.executeVerify();

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  async executeTweet(data) {
    if (!data || !data.text) {
      throw new Error('Tweet action requires text field');
    }

    const result = await this.client.createTweet({
      text: data.text,
      media: data.media || [],
      reply_to: data.reply_to || null,
    });

    return {
      action: 'tweet',
      success: result.success,
      data: result.success
        ? {
            id: result.id,
            url: result.url,
            text: data.text,
          }
        : null,
      error: result.success ? null : result.error,
    };
  }

  async executeThread(data) {
    if (!data || !data.tweets || !Array.isArray(data.tweets)) {
      throw new Error('Thread action requires tweets array');
    }

    if (data.tweets.length < 2) {
      throw new Error('Thread must have at least 2 tweets');
    }

    console.log(`🧵 Posting thread with ${data.tweets.length} tweets...`);
    console.log();

    const results = await this.client.createThread(data.tweets);

    let successCount = 0;
    let failedIndex = -1;

    results.forEach((result, index) => {
      if (result.success) {
        successCount++;
        console.log(`✓ Tweet ${index + 1}/${data.tweets.length} posted`);
        console.log(`  URL: ${result.url}`);
        if (data.tweets[index].media && data.tweets[index].media.length > 0) {
          console.log(`  📊 With ${data.tweets[index].media.length} media file(s)`);
        }
      } else {
        failedIndex = index;
        console.log(`✗ Tweet ${index + 1}/${data.tweets.length} failed`);
        console.log(`  Error: ${result.error}`);
      }
    });

    console.log();

    const allSuccess = successCount === data.tweets.length;

    if (allSuccess) {
      console.log('✅ Thread posted successfully!');
      console.log();
      console.log('Thread Details:');
      console.log(`  Total tweets: ${data.tweets.length}`);
      const mediaCount = data.tweets.filter((t) => t.media && t.media.length > 0).length;
      if (mediaCount > 0) {
        console.log(`  With media: ${mediaCount} tweets`);
      }
      console.log(`  First tweet: ${results[0].url}`);
      console.log();
      console.log(`View thread: ${results[0].url}`);
    } else {
      console.log('⚠️ Thread partially posted');
      console.log();
      console.log(`Successfully posted: ${successCount}/${data.tweets.length} tweets`);
      if (failedIndex >= 0) {
        console.log(`Failed at tweet ${failedIndex + 1}`);
        console.log('Remaining tweets were not posted');
      }
      console.log();
      if (successCount > 0) {
        console.log(`View partial thread: ${results[0].url}`);
      }
    }

    const stats = this.client.getRateLimitStats();
    console.log();
    console.log('Updated Rate Limits:');
    console.log(`  Monthly: ${stats.remaining.monthly} remaining (${stats.counts.monthly} used)`);
    console.log(`  Daily: ${stats.remaining.daily} remaining (${stats.counts.daily} used)`);
    console.log(`  Hourly: ${stats.remaining.hourly} remaining (${stats.counts.hourly} used)`);

    return {
      action: 'thread',
      success: allSuccess,
      data: {
        total: data.tweets.length,
        successful: successCount,
        failed: data.tweets.length - successCount,
        results: results,
        threadUrl: results[0]?.url || null,
      },
      error: allSuccess ? null : `Thread partially posted: ${successCount}/${data.tweets.length}`,
    };
  }

  executeRateLimits() {
    const stats = this.client.getRateLimitStats();

    console.log('Twitter API Rate Limits:');
    console.log();
    console.log('Monthly:');
    console.log(`  Used: ${stats.counts.monthly}/${stats.limits.MONTHLY}`);
    console.log(`  Remaining: ${stats.remaining.monthly}`);
    console.log();
    console.log('Daily:');
    console.log(`  Used: ${stats.counts.daily}/${stats.limits.DAILY_RECOMMENDED}`);
    console.log(`  Remaining: ${stats.remaining.daily}`);
    console.log();
    console.log('Hourly:');
    console.log(`  Used: ${stats.counts.hourly}/${stats.limits.HOURLY_RECOMMENDED}`);
    console.log(`  Remaining: ${stats.remaining.hourly}`);

    return {
      action: 'rate-limits',
      success: true,
      data: stats,
      error: null,
    };
  }

  async executeVerify() {
    console.log('Verifying Twitter API credentials...');
    console.log();

    const result = await this.client.getMyProfile();

    if (result.success) {
      console.log('✅ Authentication successful!');
      console.log();
      console.log('Account Details:');
      console.log(`  Username: @${result.data.username}`);
      console.log(`  Name: ${result.data.name}`);
      console.log(`  ID: ${result.data.id}`);
    } else {
      console.log('❌ Authentication failed');
      console.log(`  Error: ${result.error}`);
    }

    return {
      action: 'verify',
      success: result.success,
      data: result.success ? result.data : null,
      error: result.success ? null : result.error,
    };
  }
}

export async function executeFromFile(filePath) {
  const { readFileSync } = await import('fs');
  const actionData = JSON.parse(readFileSync(filePath, 'utf8'));

  const executor = new TwitterExecutor();
  return await executor.execute(actionData);
}

export async function executeFromJSON(jsonString) {
  const actionData = JSON.parse(jsonString);

  const executor = new TwitterExecutor();
  return await executor.execute(actionData);
}
