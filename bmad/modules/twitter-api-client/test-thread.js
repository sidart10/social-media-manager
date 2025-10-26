import { TwitterClient } from './index.js';

console.log('='.repeat(60));
console.log('TWITTER API CLIENT - THREAD CREATION TEST');
console.log('='.repeat(60));
console.log();

const client = new TwitterClient();

console.log('Test: Create a 3-Tweet Thread');
console.log('-'.repeat(60));

const thread = await client.createThread([
  {
    text: '1/3 - Twitter API Premium Client Thread Test\n\nThis module demonstrates thread creation where each tweet automatically replies to the previous one.',
  },
  {
    text: '2/3 - Key Features:\n\n• Long-form posts (25k chars)\n• Multi-image uploads (1-4 per tweet)\n• Thread creation\n• Rate limiting\n• Input validation\n• Error handling',
  },
  {
    text: '3/3 - Built with twitter-api-v2 library for production-ready OAuth 1.0a authentication and media handling.\n\nPerfect for social media automation!',
  },
]);

console.log();
console.log('Thread Results:');
console.log('-'.repeat(60));

let allSuccess = true;
thread.forEach((result, index) => {
  if (result.success) {
    console.log(`✓ Tweet ${index + 1}/3 posted`);
    console.log(`  ID: ${result.id}`);
    console.log(`  URL: ${result.url}`);
  } else {
    console.log(`✗ Tweet ${index + 1}/3 failed: ${result.error}`);
    allSuccess = false;
  }
});

console.log();
if (allSuccess) {
  console.log('='.repeat(60));
  console.log('✅ THREAD CREATION TEST COMPLETED!');
  console.log('='.repeat(60));
  console.log();
  console.log('Features demonstrated:');
  console.log('  - Sequential tweet posting');
  console.log('  - Automatic reply threading');
  console.log('  - Error propagation');
  console.log();
  console.log('View your thread:');
  console.log(thread[0].url);
} else {
  console.log('⚠️  Thread creation partially failed');
  process.exit(1);
}
