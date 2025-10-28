import { LinkedInClient } from './lib/client.js';

export default LinkedInClient;
export { LinkedInClient };

export function createLinkedInClient(credentials) {
  return new LinkedInClient(credentials);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LinkedInClient, createLinkedInClient, default: LinkedInClient };
}
