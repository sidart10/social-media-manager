import axios from 'axios';
import { readFileSync } from 'fs';

const LINKEDIN_VERSION = '202510';

/**
 * Upload single image to LinkedIn
 * @param {string} imagePath - Path to image file
 * @param {string} accessToken - OAuth access token
 * @param {string} ownerUrn - Person or organization URN
 * @returns {Promise<string>} Image URN
 */
export async function uploadImage(imagePath, accessToken, ownerUrn) {
  try {
    const initResponse = await axios.post(
      'https://api.linkedin.com/rest/images?action=initializeUpload',
      {
        initializeUploadRequest: {
          owner: ownerUrn,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'LinkedIn-Version': LINKEDIN_VERSION,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      },
    );

    const { uploadUrl, image: imageUrn } = initResponse.data.value;

    const imageData = readFileSync(imagePath);

    await axios.put(uploadUrl, imageData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
      },
    });

    return imageUrn;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Upload multiple images
 * @param {string[]} imagePaths - Array of image paths
 * @param {string} accessToken
 * @param {string} ownerUrn
 * @returns {Promise<string[]>} Array of image URNs
 */
export async function uploadMultipleImages(imagePaths, accessToken, ownerUrn) {
  const uploads = imagePaths.map((path) => uploadImage(path, accessToken, ownerUrn));
  return Promise.all(uploads);
}
