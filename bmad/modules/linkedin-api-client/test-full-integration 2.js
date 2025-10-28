import { LinkedInClient } from './index.js';

async function testFullIntegration() {
  console.log('\n=== LinkedIn API Full Integration Test ===\n');

  // You need to get a fresh auth code by visiting the auth URL
  const client = new LinkedInClient();

  console.log('Step 1: Get authorization URL');
  const authUrl = client.getAuthUrl();
  console.log('Open this URL in browser:');
  console.log(authUrl);
  console.log('\nProvide the authorization code as command line argument:');
  console.log('node test-full-integration.js YOUR_CODE_HERE\n');

  if (process.argv.length < 3) {
    console.log('No code provided. Exiting.');
    process.exit(0);
  }

  const code = process.argv[2];

  console.log('\nStep 2: Authenticate with LinkedIn...');
  const authResult = await client.authenticate(code);

  if (!authResult.success) {
    console.error('❌ Authentication failed:', authResult.error);
    process.exit(1);
  }

  console.log('✅ Authenticated as:', authResult.name);
  console.log('   Person URN:', authResult.personUrn);

  // Test 1: Text post
  console.log('\nStep 3: Testing text post...');
  const textResult = await client.postText(
    'LinkedIn API Integration Test - Text Post\n\n' + 'This post was created using our custom LinkedIn API client!',
  );

  if (textResult.success) {
    console.log('✅ Text post created:', textResult.url);
  } else {
    console.log('❌ Text post failed:', textResult.error);
  }

  // Test 2: Image post (if image exists)
  console.log('\nStep 4: Testing image post...');
  const imagePath = '/Users/sid/Desktop/4. Coding Projects/social-media-manager/sid-car.jpeg';

  const imageResult = await client.postWithImage(
    'LinkedIn API Integration Test - Image Post\n\nTesting image upload functionality!',
    imagePath,
  );

  if (imageResult.success) {
    console.log('✅ Image post created:', imageResult.url);
  } else {
    console.log('❌ Image post failed:', imageResult.error);
  }

  // Show final stats
  console.log('\n=== Final Stats ===');
  const stats = client.getRateLimitStats();
  console.log('Posts today:', stats.counts.daily, '/', stats.limits.DAILY);
  console.log('Remaining:', stats.remaining.daily);

  console.log('\n✅ Integration test complete!\n');
}

testFullIntegration().catch(console.error);
