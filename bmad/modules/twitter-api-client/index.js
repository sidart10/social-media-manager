import { TwitterClient } from './lib/client.js';

export default TwitterClient;
export { TwitterClient };

export function createTwitterClient(credentials) {
  return new TwitterClient(credentials);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TwitterClient, createTwitterClient, default: TwitterClient };
}
