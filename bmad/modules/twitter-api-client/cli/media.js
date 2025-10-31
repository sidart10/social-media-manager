#!/usr/bin/env node

import { TwitterExecutor } from '../executor.js';
import { resolve } from 'path';

const args = process.argv.slice(2);

function showUsage() {
  console.log(`
Usage: node cli/media.js [options]

Post a tweet with media (images or video) to Twitter

Options:
  --text <text>           Tweet text (required)
  --image <path>          Path to image file (can be used 1-4 times)
  --video <path>          Path to video file (cannot mix with images)
  --alt <text>            Alt text for last specified image (optional)
  --help                  Show this help message

Examples:
  # Single image
  node cli/media.js --text "Check this out!" --image photo.jpg --alt "A photo"

  # Multiple images
  node cli/media.js --text "Gallery" --image img1.jpg --image img2.jpg --image img3.jpg

  # Video
  node cli/media.js --text "Watch this!" --video video.mp4
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
const media = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--image' && args[i + 1]) {
    const imagePath = resolve(args[i + 1]);
    const altTextIndex = i + 2;
    const altText = args[altTextIndex] === '--alt' && args[altTextIndex + 1] ? args[altTextIndex + 1] : '';

    media.push({
      path: imagePath,
      altText: altText,
    });
  } else if (args[i] === '--video' && args[i + 1]) {
    const videoPath = resolve(args[i + 1]);
    media.push({
      path: videoPath,
    });
  }
}

if (media.length === 0) {
  console.error('❌ Error: At least one --image or --video is required');
  console.log('Use --help for usage information');
  process.exit(1);
}

if (media.length > 4) {
  console.error('❌ Error: Maximum 4 images allowed per tweet');
  process.exit(1);
}

try {
  const executor = new TwitterExecutor();
  const result = await executor.execute({
    type: 'tweet',
    data: {
      text: text,
      media: media,
    },
  });

  if (result.success) {
    console.log('✅ Tweet with media posted successfully!');
    console.log(`   URL: ${result.data.url}`);
    console.log(`   ID: ${result.data.id}`);
    console.log(`   Media: ${media.length} file(s)`);
  } else {
    console.error(`❌ Failed to post tweet: ${result.error}`);
  }

  process.exit(result.success ? 0 : 1);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
