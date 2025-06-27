import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { google } from '@google-cloud/aiplatform/build/protos/protos';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.VERTEX_AI_LOCATION || 'us-central1';
const model = 'imagegeneration@006'; // Imagen 2

export class VertexAIService {
  private client: PredictionServiceClient;
  private endpoint: string;

  constructor() {
    this.client = new PredictionServiceClient({
      apiEndpoint: `${location}-aiplatform.googleapis.com`,
    });
    
    this.endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;
  }

  async generateImage(prompt: string, style: string = 'digital art') {
    const instance = {
      prompt: `${prompt}, ${style} style, children's book illustration, child-friendly, colorful`,
    };

    const instanceValue = google.protobuf.Value.fromObject(instance);
    const instances = [instanceValue];

    const parameter = {
      sampleCount: 1,
      aspectRatio: '1:1',
      safetyFilterLevel: 'block_few',
      personGeneration: 'allow_adult',
    };
    
    const parameters = google.protobuf.Value.fromObject(parameter);

    const request = {
      endpoint: this.endpoint,
      instances,
      parameters,
    };

    try {
      const [response] = await this.client.predict(request);
      const predictions = response.predictions;
      
      if (predictions && predictions.length > 0) {
        const prediction = predictions[0].structValue?.fields;
        const base64Image = prediction?.bytesBase64Encoded?.stringValue;
        
        if (base64Image) {
          return `data:image/png;base64,${base64Image}`;
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