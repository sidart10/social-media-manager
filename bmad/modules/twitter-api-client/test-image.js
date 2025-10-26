import { TwitterClient } from './index.js';

console.log('='.repeat(60));
console.log('TWITTER API CLIENT - IMAGE UPLOAD TEST');
console.log('='.repeat(60));
console.log();

const client = new TwitterClient();

console.log('Test: Post Tweet with Image');
console.log('-'.repeat(60));
console.log('Uploading sid-car.jpeg...');

const result = await client.createTweet({
  text: 'Testing image upload with Twitter API Premium Client! This module supports uploading 1-4 images per tweet with automatic media validation.',
  media: [
    {
      path: '/Users/sid/Desktop/4. Coding Projects/social-media-manager/sid-car.jpeg',
      altText: 'Test image upload',
    },
  ],
});

if (result.success) {
  console.log('✓ Image uploaded and posted successfully!');
  console.log(`✓ Tweet ID: ${result.id}`);
  console.log(`✓ URL: ${result.url}`);
  console.log(`✓ Text: ${result.text}`);
  console.log();
  console.log('Features demonstrated:');
  console.log('  - Media upload (v1.1 API)');
  console.log('  - Tweet creation with media (v2 API)');
  console.log('  - Alt text support');
  console.log('  - File validation');
  console.log();
  console.log(`View your tweet: ${result.url}`);
} else {
  console.log(`✗ Failed: ${result.error}`);
  if (result.code) console.log(`  Code: ${result.code}`);
  process.exit(1);
}

console.log();
console.log('='.repeat(60));
console.log('✅ IMAGE UPLOAD TEST COMPLETED!');
console.log('='.repeat(60));
