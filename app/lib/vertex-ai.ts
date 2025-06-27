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

  async generateImage(prompt: string, style: string = 'digital art', seed?: number) {
    console.log('=== VERTEX AI IMAGE GENERATION START ===');
    console.log('Project ID:', projectId);
    console.log('Location:', location);
    console.log('Has credentials:', !!this.credentials);
    console.log('Prompt:', prompt.substring(0, 100) + '...');
    console.log('Style:', style);
    console.log('Seed:', seed);
    
    if (!projectId) {
      throw new Error('GOOGLE_CLOUD_PROJECT_ID is not set');
    }
    
    if (!this.credentials) {
      throw new Error('Google credentials not available');
    }
    
    // Updated to use the correct Imagen model endpoint
    const apiEndpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@006:predict`;
    console.log('API Endpoint:', apiEndpoint);
    
    const requestBody = {
      instances: [{
        prompt: `${prompt}, ${style} style, children's book illustration, child-friendly, colorful, high quality, consistent character design`
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult",
        ...(seed && { seed: seed })
      }
    };
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    try {
      // Get access token using service account
      console.log('Getting access token...');
      const { GoogleAuth } = await import('google-auth-library');
      const auth = new GoogleAuth({
        credentials: this.credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();
      console.log('Access token obtained:', !!accessToken.token);

      console.log('Making API request...');
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const error = await response.text();
        console.error('Vertex AI API error:', {
          status: response.status,
          statusText: response.statusText,
          error: error.substring(0, 500), // Limit error message length
          prompt: prompt.substring(0, 100)
        });
        
        // Check for specific error types
        if (response.status === 429) {
          throw new Error(`Rate limit exceeded - too many requests`);
        } else if (response.status === 400) {
          throw new Error(`Invalid request - prompt may contain filtered content`);
        } else {
          throw new Error(`Vertex AI API error: ${response.status}`);
        }
      }

      const result = await response.json();
      console.log('API Response structure:', {
        hasPredictions: !!result.predictions,
        predictionsLength: result.predictions?.length || 0,
        firstPredictionKeys: result.predictions?.[0] ? Object.keys(result.predictions[0]) : [],
        responseKeys: Object.keys(result)
      });
      
      // Log full response if no predictions
      if (!result.predictions || result.predictions.length === 0) {
        console.log('Full API response (no predictions):', JSON.stringify(result));
      }
      
      if (result.predictions && result.predictions.length > 0) {
        const prediction = result.predictions[0];
        console.log('First prediction details:', {
          keys: Object.keys(prediction),
          hasBytesBase64Encoded: !!prediction.bytesBase64Encoded,
          bytesLength: prediction.bytesBase64Encoded?.length || 0,
          hasBase64Encoded: !!prediction.base64Encoded,
          base64Length: prediction.base64Encoded?.length || 0,
          hasImageBytes: !!prediction.imageBytes,
          imageBytesLength: prediction.imageBytes?.length || 0
        });
        
        // Try different possible field names for the image data
        const imageData = prediction.bytesBase64Encoded || 
                         prediction.base64Encoded || 
                         prediction.imageBytes || 
                         prediction.image;
        
        if (imageData) {
          console.log('Image data found!');
          console.log('Image data type:', typeof imageData);
          console.log('Image data length:', imageData.length);
          console.log('First 100 chars:', imageData.substring(0, 100));
          console.log('=== VERTEX AI IMAGE GENERATION SUCCESS ===');
          
          // Check if already has data URL prefix
          if (imageData.startsWith('data:image')) {
            return imageData;
          }
          return `data:image/png;base64,${imageData}`;
        } else {
          console.error('No image data found in prediction:', prediction);
        }
      }
      
      console.error('No valid image in response');
      throw new Error('No image generated');
    } catch (error) {
      console.error('=== VERTEX AI IMAGE GENERATION FAILED ===');
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }
}

// Simple cache implementation
const imageCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function generateImageWithCache(prompt: string, style: string = 'digital art', seed?: number): Promise<string> {
  const cacheKey = `${prompt}_${style}_${seed || ''}`;
  const cached = imageCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const vertexAI = new VertexAIService();
  const image = await vertexAI.generateImage(prompt, style, seed);
  
  imageCache.set(cacheKey, { data: image, timestamp: Date.now() });
  
  // Clean old cache entries
  if (imageCache.size > 100) {
    const entries = Array.from(imageCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    imageCache.delete(entries[0][0]);
  }
  
  return image;
}