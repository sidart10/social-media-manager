#!/usr/bin/env node

import { TwitterExecutor } from '../executor.js';

const args = process.argv.slice(2);

function showUsage() {
  console.log(`
Usage: node cli/rate-limits.js

Check Twitter API rate limit status

No options required - just run it!

Example:
  node cli/rate-limits.js
`);
  process.exit(0);
}

if (args.includes('--help')) {
  showUsage();
}

try {
  const executor = new TwitterExecutor();
  const result = await executor.execute({
    type: 'rate-limits',
  });

  process.exit(result.success ? 0 : 1);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
