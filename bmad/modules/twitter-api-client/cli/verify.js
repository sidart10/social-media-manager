#!/usr/bin/env node

import { TwitterExecutor } from '../executor.js';

const args = process.argv.slice(2);

function showUsage() {
  console.log(`
Usage: node cli/verify.js

Verify Twitter API credentials and connection

No options required - just run it!

Example:
  node cli/verify.js
`);
  process.exit(0);
}

if (args.includes('--help')) {
  showUsage();
}

try {
  const executor = new TwitterExecutor();
  const result = await executor.execute({
    type: 'verify',
  });

  process.exit(result.success ? 0 : 1);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
