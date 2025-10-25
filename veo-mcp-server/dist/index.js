#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is required');
    process.exit(1);
}
// Helper function to make API requests
async function makeGeminiRequest(endpoint, body) {
    const url = `${API_BASE}/${endpoint}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${response.status} ${error}`);
    }
    return await response.json();
}
// Helper function to poll operation status
async function pollOperation(operationName) {
    const maxAttempts = 60; // 5 minutes max (5s intervals)
    let attempts = 0;
    while (attempts < maxAttempts) {
        const response = await fetch(`${API_BASE}/${operationName}`, {
            headers: {
                'x-goog-api-key': GEMINI_API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to poll operation: ${response.status}`);
        }
        const data = await response.json();
        if (data.done) {
            if (data.error) {
                throw new Error(`Video generation failed: ${JSON.stringify(data.error)}`);
            }
            return data.response;
        }
        // Wait 5 seconds before next poll
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
    }
    throw new Error('Video generation timed out');
}
const server = new Server({
    name: 'veo-mcp-server',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'video_story_generate',
                description: 'Generate a video from text prompt using Gemini Veo 3.1. Returns a job_id to check status.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'Text description of the video to generate (supports audio cues)',
                        },
                        aspectRatio: {
                            type: 'string',
                            enum: ['16:9', '9:16'],
                            description: 'Video aspect ratio (16:9 landscape or 9:16 vertical)',
                            default: '16:9',
                        },
                        durationSec: {
                            type: 'string',
                            enum: ['4', '6', '8'],
                            description: 'Video duration in seconds',
                            default: '8',
                        },
                        model: {
                            type: 'string',
                            enum: ['veo-3.1-generate-preview', 'veo-3.1-fast-generate-preview'],
                            description: 'Model to use (fast for drafts, regular for quality)',
                            default: 'veo-3.1-generate-preview',
                        },
                        resolution: {
                            type: 'string',
                            enum: ['720p', '1080p'],
                            description: 'Video resolution (1080p only available for 8s videos)',
                            default: '720p',
                        },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'video_story_status',
                description: 'Check the status of a video generation job and get the video URL when ready',
                inputSchema: {
                    type: 'object',
                    properties: {
                        job_id: {
                            type: 'string',
                            description: 'The operation name returned from video_story_generate',
                        },
                    },
                    required: ['job_id'],
                },
            },
        ],
    };
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        if (name === 'video_story_generate') {
            const { prompt, aspectRatio = '16:9', durationSec = '8', model = 'veo-3.1-generate-preview', resolution = '720p', } = args;
            // Validate 1080p only for 8s videos
            if (resolution === '1080p' && durationSec !== '8') {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                error: '1080p resolution is only available for 8 second videos',
                            }),
                        },
                    ],
                };
            }
            const requestBody = {
                prompt: { text: prompt },
                aspectRatio,
                durationSeconds: durationSec,
            };
            // Add resolution for 8s videos
            if (durationSec === '8') {
                requestBody.resolution = resolution;
            }
            const response = await makeGeminiRequest(`models/${model}:predictLongRunning`, requestBody);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            job_id: response.name,
                            status: 'processing',
                            message: 'Video generation started. Use video_story_status to check progress.',
                        }),
                    },
                ],
            };
        }
        if (name === 'video_story_status') {
            const { job_id } = args;
            try {
                const result = await pollOperation(job_id);
                // Extract video URL from response
                const videoUrl = result?.generatedVideo?.uri || null;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                status: 'completed',
                                video_url: videoUrl,
                                result: result,
                            }),
                        },
                    ],
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                status: 'failed',
                                error: error.message,
                            }),
                        },
                    ],
                };
            }
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({ error: `Unknown tool: ${name}` }),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        error: error.message,
                    }),
                },
            ],
            isError: true,
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Veo MCP server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
