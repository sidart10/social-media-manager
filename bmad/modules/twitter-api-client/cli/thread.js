#!/usr/bin/env node

import { TwitterExecutor } from '../executor.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);

function showUsage() {
  console.log(`
Usage: node cli/thread.js [options]

Post a Twitter thread from a JSON file

Options:
  --input <file>    Path to JSON file containing thread data (required)
  --help            Show this help message

JSON Format:
{
  "tweets": [
    { "text": "Tweet 1 text" },
    { "text": "Tweet 2 text", "media": [{"path": "/path/to/image.jpg", "altText": "Description"}] },
    { "text": "Tweet 3 text" }
  ]
}

Example:
  node cli/thread.js --input threads/my-thread.json
`);
  process.exit(0);
}

if (args.includes('--help') || args.length === 0) {
  showUsage();
}

const inputIndex = args.indexOf('--input');
if (inputIndex === -1 || !args[inputIndex + 1]) {
  console.error('❌ Error: --input parameter is required');
  console.log('Use --help for usage information');
  process.exit(1);
}

const inputFile = resolve(args[inputIndex + 1]);

try {
  const data = JSON.parse(readFileSync(inputFile, 'utf8'));

  if (!data.tweets || !Array.isArray(data.tweets)) {
    console.error('❌ Error: JSON file must contain a "tweets" array');
    process.exit(1);
  }

  const executor = new TwitterExecutor();
  const result = await executor.execute({
    type: 'thread',
    data: data,
  });

  process.exit(result.success ? 0 : 1);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
