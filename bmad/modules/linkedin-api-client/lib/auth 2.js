import axios from 'axios';
import { linkedinConfig } from '../config.js';

/**
 * Generate LinkedIn OAuth authorization URL
 * @returns {string} Authorization URL for user to open
 */
export function getAuthorizationUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: linkedinConfig.clientId,
    redirect_uri: linkedinConfig.redirectUri,
    scope: 'openid profile w_member_social',
    state: 'random_state_' + Date.now(),
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from OAuth callback
 * @returns {Promise<string>} Access token
 */
export async function exchangeCodeForToken(code) {
  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        client_id: linkedinConfig.clientId,
        client_secret: linkedinConfig.clientSecret,
        redirect_uri: linkedinConfig.redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
      scope: response.data.scope,
    };
  } catch (error) {
    throw new Error(`Token exchange failed: ${error.response?.data?.error_description || error.message}`);
  }
}

/**
 * Get user info including person URN
 * @param {string} accessToken - OAuth access token
 * @returns {Promise<Object>} User info with sub (person ID)
 */
export async function getUserInfo(accessToken) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      personId: response.data.sub,
      personUrn: `urn:li:person:${response.data.sub}`,
      name: response.data.name,
      email: response.data.email,
    };
  } catch (error) {
    throw new Error(`Failed to get user info: ${error.message}`);
  }
}
