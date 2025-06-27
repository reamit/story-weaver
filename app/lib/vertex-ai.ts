const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.VERTEX_AI_LOCATION || 'us-central1';

export class VertexAIService {
  private credentials: any;

  constructor() {
    // Parse credentials from base64 if available
    if (process.env.GOOGLE_CREDENTIALS_BASE64) {
      try {
        const credentialsJson = Buffer.from(
          process.env.GOOGLE_CREDENTIALS_BASE64,
          'base64'
        ).toString('utf-8');
        this.credentials = JSON.parse(credentialsJson);
      } catch (error) {
        console.error('Failed to parse GOOGLE_CREDENTIALS_BASE64:', error);
        throw new Error('Invalid Google credentials');
      }
    }
  }

  async generateImage(prompt: string, style: string = 'digital art') {
    const apiEndpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@006:predict`;
    
    const requestBody = {
      instances: [{
        prompt: `${prompt}, ${style} style, children's book illustration, child-friendly, colorful, high quality`
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult"
      }
    };

    try {
      // Get access token using service account
      const { GoogleAuth } = await import('google-auth-library');
      const auth = new GoogleAuth({
        credentials: this.credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Vertex AI API error:', error);
        throw new Error(`Vertex AI API error: ${response.status} ${error}`);
      }

      const result = await response.json();
      
      if (result.predictions && result.predictions.length > 0) {
        const prediction = result.predictions[0];
        if (prediction.bytesBase64Encoded) {
          return `data:image/png;base64,${prediction.bytesBase64Encoded}`;
        }
      }
      
      throw new Error('No image generated');
    } catch (error) {
      console.error('Vertex AI prediction error:', error);
      throw error;
    }
  }
}

// Simple cache implementation
const imageCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function generateImageWithCache(prompt: string, style: string = 'digital art'): Promise<string> {
  const cacheKey = `${prompt}_${style}`;
  const cached = imageCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const vertexAI = new VertexAIService();
  const image = await vertexAI.generateImage(prompt, style);
  
  imageCache.set(cacheKey, { data: image, timestamp: Date.now() });
  
  // Clean old cache entries
  if (imageCache.size > 100) {
    const entries = Array.from(imageCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    imageCache.delete(entries[0][0]);
  }
  
  return image;
}