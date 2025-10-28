import { TwitterClient } from './index.js';
import { existsSync } from 'fs';
import { stat } from 'fs/promises';

console.log('='.repeat(60));
console.log('TWITTER API CLIENT - VIDEO UPLOAD TEST');
console.log('='.repeat(60));
console.log();

const client = new TwitterClient();

const videoPath =
  '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/scene_01.mp4';

console.log('Checking for video file...');
if (!existsSync(videoPath)) {
  console.log('✗ Video file not found at:');
  console.log(`  ${videoPath}`);
  console.log();
  console.log('Looking for any available video files...');

  const possibleVideos = [
    '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/veo3/veo3_video_20251025_183114.mp4',
    '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/scene_02.mp4',
    '/Users/sid/Desktop/4. Coding Projects/social-media-manager/bmad/agents/ai-video-agent/ai-video-agent-sidecar/outputs/scene_03.mp4',
  ];

  let foundVideo = null;
  for (const video of possibleVideos) {
    if (existsSync(video)) {
      foundVideo = video;
      break;
    }
  }

  if (!foundVideo) {
    console.log('✗ No video files found for testing');
    console.log();
    console.log('Note: Video upload is supported but requires a test file.');
    console.log('Supported formats: .mp4, .mov (up to 512MB)');
    process.exit(0);
  }

  console.log(`✓ Found video: ${foundVideo}`);
  console.log();

  console.log('Test: Post Tweet with Video');
  console.log('-'.repeat(60));

  const stats = await stat(foundVideo);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`Video size: ${sizeMB} MB`);
  console.log('Uploading video (this may take a moment)...');
  console.log();

  const result = await client.createTweet({
    text: 'Testing video upload with Twitter API Premium Client! This module supports video uploads up to 512MB with automatic chunked upload handling.',
    media: [
      {
        path: foundVideo,
        altText: 'Test video upload',
      },
    ],
  });

  if (result.success) {
    console.log('✓ Video uploaded and posted successfully!');
    console.log(`✓ Tweet ID: ${result.id}`);
    console.log(`✓ URL: ${result.url}`);
    console.log();
    console.log('Features demonstrated:');
    console.log('  - Video upload with chunked transfer');
    console.log('  - Large file handling (up to 512MB)');
    console.log('  - Processing status polling');
    console.log('  - Twitter v1.1 media API integration');
    console.log();
    console.log(`View your tweet: ${result.url}`);
    console.log();
    console.log('='.repeat(60));
    console.log('✅ VIDEO UPLOAD TEST COMPLETED!');
    console.log('='.repeat(60));
  } else {
    console.log(`✗ Failed: ${result.error}`);
    if (result.code) console.log(`  Code: ${result.code}`);
    console.log();
    console.log('Note: Video uploads may require additional processing time.');
    console.log('The twitter-api-v2 library handles chunked uploads automatically.');
  }
} else {
  const stats = await stat(videoPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`✓ Found video file: scene_01.mp4`);
  console.log(`  Size: ${sizeMB} MB`);
  console.log();

  console.log('Test: Post Tweet with Video');
  console.log('-'.repeat(60));
  console.log('Uploading video (this may take a moment)...');
  console.log();

  const result = await client.createTweet({
    text: 'Testing video upload with Twitter API Premium Client! This module supports video uploads up to 512MB with automatic chunked upload handling.',
    media: [
      {
        path: videoPath,
        altText: 'Test video upload',
      },
    ],
  });

  if (result.success) {
    console.log('✓ Video uploaded and posted successfully!');
    console.log(`✓ Tweet ID: ${result.id}`);
    console.log(`✓ URL: ${result.url}`);
    console.log();
    console.log('Features demonstrated:');
    console.log('  - Video upload with chunked transfer');
    console.log('  - Large file handling (up to 512MB)');
    console.log('  - Processing status polling');
    console.log('  - Twitter v1.1 media API integration');
    console.log();
    console.log(`View your tweet: ${result.url}`);
    console.log();
    console.log('='.repeat(60));
    console.log('✅ VIDEO UPLOAD TEST COMPLETED!');
    console.log('='.repeat(60));
  } else {
    console.log(`✗ Failed: ${result.error}`);
    if (result.code) console.log(`  Code: ${result.code}`);
    console.log();
    console.log('Note: Video uploads may require additional processing time.');
    console.log('The twitter-api-v2 library handles chunked uploads automatically.');
  }
}
