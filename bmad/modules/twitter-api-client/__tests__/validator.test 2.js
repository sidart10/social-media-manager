import { strict as assert } from 'assert';
import { validateTweetRequest } from '../lib/validator.js';

console.log('Testing validator...\n');

const test1 = await validateTweetRequest({
  text: 'Hello world!',
});
assert.strictEqual(test1.valid, true, 'Text-only should be valid');
console.log('✓ Test 1: Text-only validation');

const longText = 'a'.repeat(25001);
const test2 = await validateTweetRequest({
  text: longText,
});
assert.strictEqual(test2.valid, false, 'Text over limit should fail');
console.log('✓ Test 2: Text length validation');

const test3 = await validateTweetRequest({});
assert.strictEqual(test3.valid, false, 'Missing text should fail');
console.log('✓ Test 3: Required text validation');

const test4 = await validateTweetRequest({
  text: 'Test',
  media: [{ path: '/tmp/1.jpg' }, { path: '/tmp/2.jpg' }, { path: '/tmp/3.jpg' }, { path: '/tmp/4.jpg' }, { path: '/tmp/5.jpg' }],
});
assert.strictEqual(test4.valid, false, 'More than 4 images should fail');
console.log('✓ Test 4: Image count validation');

console.log('\n✅ All validator tests passed!');
