import axios from 'axios';
import { readFileSync } from 'fs';
import { extname } from 'path';

const LINKEDIN_VERSION = '202510';

const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

/**
 * Upload document (PDF, PPT, DOC) to LinkedIn
 * @param {string} documentPath - Path to document file
 * @param {string} accessToken - OAuth access token
 * @param {string} ownerUrn - Person or organization URN
 * @returns {Promise<string>} Document URN
 */
export async function uploadDocument(documentPath, accessToken, ownerUrn) {
  try {
    const initResponse = await axios.post(
      'https://api.linkedin.com/rest/documents?action=initializeUpload',
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

    const { uploadUrl, document: documentUrn } = initResponse.data.value;

    const documentData = readFileSync(documentPath);
    const ext = extname(documentPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    await axios.put(uploadUrl, documentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': contentType,
      },
    });

    return documentUrn;
  } catch (error) {
    throw new Error(`Document upload failed: ${error.response?.data?.message || error.message}`);
  }
}

export { MIME_TYPES };
