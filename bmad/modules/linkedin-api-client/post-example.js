import { LinkedInClient } from './index.js';
import { readFileSync, existsSync } from 'fs';

async function quickPost() {
  // Load saved token (lasts 60 days!)
  if (!existsSync('linkedin-token.json')) {
    console.error('No saved token found. Run the OAuth flow first.');
    process.exit(1);
  }

  const tokenData = JSON.parse(readFileSync('linkedin-token.json', 'utf8'));
  console.log('Using saved token for:', tokenData.name);
  console.log('Token expires:', tokenData.expiresAt);

  const client = new LinkedInClient();
  client.setAccessToken(tokenData.accessToken, tokenData.personUrn);

  // Example: Post text
  const result = await client.postText('Quick post using saved LinkedIn token!\n\n' + 'No OAuth needed - token lasts 60 days.');

  if (result.success) {
    console.log('\n✅ Post created:', result.url);
  } else {
    console.log('\n❌ Failed:', result.error);
  }

  // Show stats
  const stats = client.getRateLimitStats();
  console.log('\nPosts today:', stats.counts.daily, '/', stats.limits.DAILY);
}

// Run it
quickPost().catch(console.error);
