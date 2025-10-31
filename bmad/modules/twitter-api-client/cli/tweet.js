#!/usr/bin/env node

import { TwitterExecutor } from '../executor.js';

const args = process.argv.slice(2);

function showUsage() {
  console.log(`
Usage: node cli/tweet.js [options]

Post a single tweet to Twitter

Options:
  --text <text>     Tweet text (required, max 25000 chars for Premium)
  --reply-to <id>   Tweet ID to reply to (optional)
  --help            Show this help message

Example:
  node cli/tweet.js --text "Hello Twitter! This is a test tweet."
  node cli/tweet.js --text "Reply tweet" --reply-to 1234567890
`);
  process.exit(0);
}

if (args.includes('--help') || args.length === 0) {
  showUsage();
}

const textIndex = args.indexOf('--text');
if (textIndex === -1 || !args[textIndex + 1]) {
  console.error('❌ Error: --text parameter is required');
  console.log('Use --help for usage information');
  process.exit(1);
}

const text = args[textIndex + 1];
const replyToIndex = args.indexOf('--reply-to');
const replyTo = replyToIndex !== -1 ? args[replyToIndex + 1] : null;

try {
  const executor = new TwitterExecutor();
  const result = await executor.execute({
    type: 'tweet',
    data: {
      text: text,
      reply_to: replyTo,
    },
  });

  if (result.success) {
    console.log('✅ Tweet posted successfully!');
    console.log(`   URL: ${result.data.url}`);
    console.log(`   ID: ${result.data.id}`);
  } else {
    console.error(`❌ Failed to post tweet: ${result.error}`);
  }

  process.exit(result.success ? 0 : 1);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
