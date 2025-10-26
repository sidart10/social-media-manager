import { TwitterClient } from '../lib/client.js';

console.log('Twitter API Integration Tests');
console.log('================================\n');

const client = new TwitterClient();

console.log('Test 1: Get my profile...');
const profile = await client.getMyProfile();
if (profile.success) {
  console.log(`✓ Profile: @${profile.data.username}`);
} else {
  console.log(`✗ Failed: ${profile.error}`);
  process.exit(1);
}

console.log('\nTest 2: Post text-only tweet...');
const textTweet = await client.createTweet({
  text: 'Integration test from Twitter API client module! Testing #testing',
});
if (textTweet.success) {
  console.log(`✓ Posted: ${textTweet.url}`);
} else {
  console.log(`✗ Failed: ${textTweet.error}`);
  process.exit(1);
}

console.log('\nTest 3: Post long-form (500+ chars)...');
const longText = 'This is a long-form post test! '.repeat(20);
const longTweet = await client.createTweet({
  text: longText,
});
if (longTweet.success) {
  console.log(`✓ Long-form posted: ${longTweet.url}`);
  console.log(`  Length: ${longTweet.text.length} characters`);
} else {
  console.log(`✗ Failed: ${longTweet.error}`);
}

console.log('\nTest 4: Check rate limit stats...');
const stats = client.getRateLimitStats();
console.log('✓ Stats:', stats);

console.log('\n✅ Integration tests complete!');
console.log('Note: Image upload test requires actual image file');
