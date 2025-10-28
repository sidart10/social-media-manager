import axios from 'axios';
import { readFileSync, statSync } from 'fs';

const LINKEDIN_VERSION = '202510';
const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks

/**
 * Upload video to LinkedIn using multipart upload
 * @param {string} videoPath - Path to video file
 * @param {string} accessToken - OAuth access token
 * @param {string} ownerUrn - Person or organization URN
 * @returns {Promise<string>} Video URN
 */
export async function uploadVideo(videoPath, accessToken, ownerUrn) {
  try {
    const fileStats = statSync(videoPath);
    const fileSizeBytes = fileStats.size;

    // Step 1: Initialize upload
    console.log('Initializing video upload...');
    const initResponse = await axios.post(
      'https://api.linkedin.com/rest/videos?action=initializeUpload',
      {
        initializeUploadRequest: {
          owner: ownerUrn,
          fileSizeBytes: fileSizeBytes,
          uploadCaptions: false,
          uploadThumbnail: false,
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

    const { value } = initResponse.data;
    const videoUrn = value.video;
    const uploadInstructions = value.uploadInstructions;

    console.log(`Video URN: ${videoUrn}`);
    console.log(`Upload instructions received for ${uploadInstructions.length} part(s)`);

    // Step 2: Upload video in chunks
    const videoData = readFileSync(videoPath);
    const etags = [];

    for (let i = 0; i < uploadInstructions.length; i++) {
      const instruction = uploadInstructions[i];
      const { uploadUrl, firstByte, lastByte } = instruction;

      console.log(`Uploading part ${i + 1}/${uploadInstructions.length} (bytes ${firstByte}-${lastByte})...`);

      const chunk = videoData.slice(firstByte, lastByte + 1);

      const uploadResponse = await axios.put(uploadUrl, chunk, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      // Collect ETag for finalization (ETag strings only)
      const etag = uploadResponse.headers.etag;
      if (etag) {
        // Remove quotes from ETag
        etags.push(etag.replace(/"/g, ''));
      }
    }

    // Step 3: Finalize upload
    console.log('Finalizing video upload...');
    await axios.post(
      'https://api.linkedin.com/rest/videos?action=finalizeUpload',
      {
        finalizeUploadRequest: {
          video: videoUrn,
          uploadToken: value.uploadToken,
          uploadedPartIds: etags,
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

    console.log('Video upload complete!');
    return videoUrn;
  } catch (error) {
    throw new Error(`Video upload failed: ${error.response?.data?.message || error.message}`);
  }
}
