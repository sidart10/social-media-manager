import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: join(__dirname, '../../../.env') });

export const linkedinConfig = {
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/callback',
};

export function validateConfig() {
  const missing = [];
  if (!linkedinConfig.clientId) missing.push('LINKEDIN_CLIENT_ID');
  if (!linkedinConfig.clientSecret) missing.push('LINKEDIN_CLIENT_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing LinkedIn credentials: ${missing.join(', ')}`);
  }

  return true;
}
