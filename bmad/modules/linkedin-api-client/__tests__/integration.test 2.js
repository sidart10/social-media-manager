import { LinkedInClient } from '../lib/client.js';

console.log('LinkedIn API Integration Tests');
console.log('=================================\n');

const client = new LinkedInClient();

console.log('Test 1: Get authorization URL...');
const authUrl = client.getAuthUrl();
console.log(`✓ Auth URL: ${authUrl.substring(0, 100)}...`);

console.log('\nTest 2: Authentication');
console.log('Run this test manually:');
console.log('1. Open auth URL in browser');
console.log('2. Authorize and get code');
console.log('3. Pass code to client.authenticate(code)');

console.log('\nTest 3: Check rate limit stats...');
const stats = client.getRateLimitStats();
console.log('✓ Stats:', stats);

console.log('\n✅ Basic tests complete!');
console.log('\nTo test posting:');
console.log('1. Complete OAuth flow');
console.log('2. Use client.postText("Test post")');
console.log('3. Use client.postWithImage("Caption", "/path/to/image.jpg")');
