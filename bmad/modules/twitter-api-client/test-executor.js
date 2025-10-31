import { TwitterExecutor } from './executor.js';

console.log('🧪 Testing Twitter Executor');
console.log('━'.repeat(50));
console.log();

const executor = new TwitterExecutor();
let passCount = 0;
let failCount = 0;

function test(name, fn) {
  process.stdout.write(`Testing: ${name}... `);
  try {
    fn();
    console.log('✅ PASS');
    passCount++;
  } catch (error) {
    console.log('❌ FAIL');
    console.log(`  Error: ${error.message}`);
    failCount++;
  }
}

async function asyncTest(name, fn) {
  process.stdout.write(`Testing: ${name}... `);
  try {
    await fn();
    console.log('✅ PASS');
    passCount++;
  } catch (error) {
    console.log('❌ FAIL');
    console.log(`  Error: ${error.message}`);
    failCount++;
  }
}

// ============================================
// UNIT TESTS
// ============================================

console.log('Unit Tests:');
console.log('-'.repeat(50));

test('Executor instantiates', () => {
  if (!executor) throw new Error('Executor is null');
  if (!executor.client) throw new Error('Executor has no client');
});

test('Executor has execute method', () => {
  if (typeof executor.execute !== 'function') {
    throw new Error('execute is not a function');
  }
});

test('Executor has executeTweet method', () => {
  if (typeof executor.executeTweet !== 'function') {
    throw new Error('executeTweet is not a function');
  }
});

test('Executor has executeThread method', () => {
  if (typeof executor.executeThread !== 'function') {
    throw new Error('executeThread is not a function');
  }
});

test('Executor has executeRateLimits method', () => {
  if (typeof executor.executeRateLimits !== 'function') {
    throw new Error('executeRateLimits is not a function');
  }
});

test('Executor has executeVerify method', () => {
  if (typeof executor.executeVerify !== 'function') {
    throw new Error('executeVerify is not a function');
  }
});

console.log();

// ============================================
// VALIDATION TESTS
// ============================================

console.log('Validation Tests:');
console.log('-'.repeat(50));

await asyncTest('Execute rejects action without type', async () => {
  try {
    await executor.execute({});
    throw new Error('Should have thrown error');
  } catch (error) {
    if (error.message !== 'Action must have a type field') {
      throw new Error(`Wrong error: ${error.message}`);
    }
  }
});

await asyncTest('Execute rejects unknown action type', async () => {
  try {
    await executor.execute({ type: 'invalid' });
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!error.message.includes('Unknown action type')) {
      throw new Error(`Wrong error: ${error.message}`);
    }
  }
});

await asyncTest('ExecuteTweet rejects missing text', async () => {
  try {
    await executor.executeTweet({});
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!error.message.includes('requires text field')) {
      throw new Error(`Wrong error: ${error.message}`);
    }
  }
});

await asyncTest('ExecuteThread rejects missing tweets', async () => {
  try {
    await executor.executeThread({});
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!error.message.includes('requires tweets array')) {
      throw new Error(`Wrong error: ${error.message}`);
    }
  }
});

await asyncTest('ExecuteThread rejects single tweet', async () => {
  try {
    await executor.executeThread({ tweets: [{ text: 'Only one' }] });
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!error.message.includes('at least 2 tweets')) {
      throw new Error(`Wrong error: ${error.message}`);
    }
  }
});

console.log();

// ============================================
// INTEGRATION TESTS (Non-posting)
// ============================================

console.log('Integration Tests:');
console.log('-'.repeat(50));

await asyncTest('Rate limits check works', async () => {
  const result = await executor.execute({ type: 'rate-limits' });
  if (!result.success) throw new Error('Rate limits failed');
  if (!result.data) throw new Error('No data returned');
  if (!result.data.counts) throw new Error('No counts in data');
  if (!result.data.limits) throw new Error('No limits in data');
});

await asyncTest('Verify credentials works', async () => {
  const result = await executor.execute({ type: 'verify' });
  if (!result.success) throw new Error(`Verify failed: ${result.error}`);
  if (!result.data) throw new Error('No data returned');
  if (!result.data.username) throw new Error('No username in data');
});

console.log();

// ============================================
// STRUCTURE TESTS
// ============================================

console.log('Response Structure Tests:');
console.log('-'.repeat(50));

await asyncTest('Rate limits returns proper structure', async () => {
  const result = await executor.execute({ type: 'rate-limits' });
  if (result.action !== 'rate-limits') throw new Error('Wrong action type');
  if (typeof result.success !== 'boolean') throw new Error('success not boolean');
  if (result.data === undefined) throw new Error('data is undefined');
});

await asyncTest('Verify returns proper structure', async () => {
  const result = await executor.execute({ type: 'verify' });
  if (result.action !== 'verify') throw new Error('Wrong action type');
  if (typeof result.success !== 'boolean') throw new Error('success not boolean');
  if (!result.success && !result.error) throw new Error('Failed but no error');
  if (result.success && !result.data) throw new Error('Success but no data');
});

console.log();

// ============================================
// SUMMARY
// ============================================

console.log('━'.repeat(50));
console.log('Test Summary:');
console.log(`  ✅ Passed: ${passCount}`);
console.log(`  ❌ Failed: ${failCount}`);
console.log(`  Total: ${passCount + failCount}`);
console.log();

if (failCount === 0) {
  console.log('🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed');
  process.exit(1);
}
