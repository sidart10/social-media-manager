import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: join(__dirname, '../../../.env') });

export const twitterConfig = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

export function validateConfig() {
  const missing = [];
  if (!twitterConfig.appKey) missing.push('TWITTER_API_KEY');
  if (!twitterConfig.appSecret) missing.push('TWITTER_API_SECRET');
  if (!twitterConfig.accessToken) missing.push('TWITTER_ACCESS_TOKEN');
  if (!twitterConfig.accessSecret) missing.push('TWITTER_ACCESS_TOKEN_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing Twitter credentials: ${missing.join(', ')}`);
  }

  return true;
}
