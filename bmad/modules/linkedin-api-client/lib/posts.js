import axios from 'axios';

const LINKEDIN_VERSION = '202510';

const HEADERS = {
  'LinkedIn-Version': LINKEDIN_VERSION,
  'X-Restli-Protocol-Version': '2.0.0',
  'Content-Type': 'application/json',
};

/**
 * Create text-only post
 */
export async function createTextPost(accessToken, personUrn, text) {
  const payload = {
    author: personUrn,
    commentary: text,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with single image
 */
export async function createImagePost(accessToken, personUrn, text, imageUrn, imageTitle = 'Image') {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      media: {
        title: imageTitle,
        id: imageUrn,
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with multiple images (2-20)
 */
export async function createMultiImagePost(accessToken, personUrn, text, imageData) {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      multiImage: {
        images: imageData.map((img) => ({
          id: img.urn,
          altText: img.altText || '',
        })),
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with document (PDF carousel)
 */
export async function createDocumentPost(accessToken, personUrn, text, documentUrn, documentTitle) {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      media: {
        title: documentTitle,
        id: documentUrn,
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Create post with video
 */
export async function createVideoPost(accessToken, personUrn, text, videoUrn, videoTitle = 'Video') {
  const payload = {
    author: personUrn,
    commentary: text,
    content: {
      media: {
        title: videoTitle,
        id: videoUrn,
      },
    },
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  };

  return createPost(accessToken, payload);
}

/**
 * Core post creation function
 */
async function createPost(accessToken, payload) {
  try {
    const response = await axios.post('https://api.linkedin.com/rest/posts', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...HEADERS,
      },
    });

    const postId = response.headers['x-restli-id'];

    return {
      success: true,
      id: postId,
      urn: `urn:li:share:${postId}`,
      url: `https://www.linkedin.com/feed/update/${postId}/`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      code: error.response?.status,
    };
  }
}

export { createPost };
