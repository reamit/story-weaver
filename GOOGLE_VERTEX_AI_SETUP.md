# Google Vertex AI Integration Guide

This guide provides step-by-step instructions to integrate Google Vertex AI for image generation in StoryWeaver.

## Prerequisites

- Google Cloud account (with billing enabled)
- Google Cloud CLI (`gcloud`) installed
- Basic familiarity with Google Cloud Console

## Step 1: Set Up Google Cloud Project

### 1.1 Create a New Project (or use existing)

```bash
# Create new project
gcloud projects create story-weaver-ai --name="StoryWeaver AI"

# Set as active project
gcloud config set project story-weaver-ai
```

Or use the [Google Cloud Console](https://console.cloud.google.com):
1. Click "Select a project" → "New Project"
2. Name: `story-weaver-ai`
3. Create

### 1.2 Enable Required APIs

```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Enable Cloud Storage API (for image storage)
gcloud services enable storage.googleapis.com

# Enable IAM API
gcloud services enable iam.googleapis.com
```

## Step 2: Set Up Authentication

### 2.1 Create Service Account

```bash
# Create service account
gcloud iam service-accounts create story-weaver-sa \
    --display-name="StoryWeaver Service Account"

# Get the service account email
export SA_EMAIL=$(gcloud iam service-accounts list --filter="displayName:StoryWeaver Service Account" --format="value(email)")
```

### 2.2 Grant Permissions

```bash
# Grant Vertex AI User role
gcloud projects add-iam-policy-binding story-weaver-ai \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/aiplatform.user"

# Grant Storage Admin role (for image storage)
gcloud projects add-iam-policy-binding story-weaver-ai \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/storage.admin"
```

### 2.3 Create and Download Service Account Key

```bash
# Create key
gcloud iam service-accounts keys create ./service-account.json \
    --iam-account=${SA_EMAIL}
```

**Important**: Keep this file secure and never commit it to git!

## Step 3: Install Required Packages

```bash
# Install Google Cloud AI Platform package
npm install @google-cloud/aiplatform

# Install Google Cloud Storage (optional, for image storage)
npm install @google-cloud/storage
```

## Step 4: Update Environment Variables

### 4.1 Update `.env.local`

```bash
# Google Vertex AI Configuration
GOOGLE_CLOUD_PROJECT_ID=story-weaver-ai
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
VERTEX_AI_LOCATION=us-central1

# Optional: Use Vertex AI instead of Together AI
USE_VERTEX_AI=true
```

### 4.2 Update `.env.local.example`

Add the Google Vertex AI configuration section to help other developers.

## Step 5: Implement Vertex AI Image Generation

### 5.1 Create Vertex AI Service

Create `app/lib/vertex-ai.ts`:

```typescript
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
      prompt: `${prompt}, ${style} style, children's book illustration`,
      
    };

    const instanceValue = google.protobuf.Value.fromObject(instance);
    const instances = [instanceValue];

    const parameter = {
      sampleCount: 1,
      aspectRatio: '1:1',
      safetyFilterLevel: 'block_none',
      personGeneration: 'allow_all',
    };
    
    const parameters = google.protobuf.Value.fromObject(parameter);

    const request = {
      endpoint: this.endpoint,
      instances,
      parameters,
    };

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
  }
}
```

### 5.2 Create API Route

Create `app/api/generate-images-vertex/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompts, style } = await request.json();

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured' },
        { status: 500 }
      );
    }

    const vertexAI = new VertexAIService();
    const imagePromises = prompts.map((prompt: string) => 
      vertexAI.generateImage(prompt, style)
    );

    const images = await Promise.all(imagePromises);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Vertex AI error:', error);
    return NextResponse.json(
      { error: 'Failed to generate images with Vertex AI' },
      { status: 500 }
    );
  }
}
```

### 5.3 Update Image Generation Logic

Update `app/api/generate-story-with-images/route.ts` to support both providers:

```typescript
// Add at the top
const useVertexAI = process.env.USE_VERTEX_AI === 'true';

// Update image generation section
let images: string[] = [];
if (useVertexAI && process.env.GOOGLE_CLOUD_PROJECT_ID) {
  // Use Vertex AI
  const imageResponse = await fetch(`${request.nextUrl.origin}/api/generate-images-vertex`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompts: story.pages.map(page => page.imagePrompt),
      style: 'digital art',
    }),
  });
  
  if (imageResponse.ok) {
    const data = await imageResponse.json();
    images = data.images;
  }
} else if (process.env.TOGETHER_API_KEY) {
  // Use Together AI (existing code)
  // ... existing Together AI code ...
}
```

## Step 6: Set Up for Vercel Deployment

### 6.1 Encode Service Account for Vercel

Since Vercel needs the service account as an environment variable:

```bash
# Encode the service account file
base64 -i service-account.json -o service-account-base64.txt

# Copy the contents (you'll need this for Vercel)
cat service-account-base64.txt
```

### 6.2 Create Vercel Setup Script

Create `scripts/setup-google-credentials.js`:

```javascript
const fs = require('fs');
const path = require('path');

// This runs during build on Vercel
if (process.env.GOOGLE_CREDENTIALS_BASE64) {
  const credentials = Buffer.from(
    process.env.GOOGLE_CREDENTIALS_BASE64,
    'base64'
  ).toString('utf-8');
  
  fs.writeFileSync(
    path.join(process.cwd(), 'service-account.json'),
    credentials
  );
  
  console.log('Google credentials file created');
}
```

### 6.3 Update package.json

```json
{
  "scripts": {
    "prebuild": "node scripts/setup-google-credentials.js",
    "build": "next build"
  }
}
```

### 6.4 Vercel Environment Variables

Add these to Vercel:

1. `GOOGLE_CLOUD_PROJECT_ID`: Your project ID
2. `GOOGLE_CREDENTIALS_BASE64`: The base64-encoded service account
3. `GOOGLE_APPLICATION_CREDENTIALS`: `./service-account.json`
4. `VERTEX_AI_LOCATION`: `us-central1`
5. `USE_VERTEX_AI`: `true`

## Step 7: Testing

### 7.1 Local Testing

```bash
# Test locally
npm run dev

# Visit http://localhost:3000 and create a story
```

### 7.2 Test Vertex AI Endpoint

Create `app/api/test-vertex/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function GET() {
  try {
    const vertexAI = new VertexAIService();
    const image = await vertexAI.generateImage(
      'A friendly cartoon dragon in a magical forest',
      'watercolor'
    );
    
    return NextResponse.json({
      success: true,
      hasImage: !!image,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
```

## Step 8: Cost Optimization

### 8.1 Implement Caching

```typescript
// Add to vertex-ai.ts
import { LRUCache } from 'lru-cache';

const imageCache = new LRUCache<string, string>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
});

// In generateImage method
const cacheKey = `${prompt}_${style}`;
const cached = imageCache.get(cacheKey);
if (cached) return cached;

// After generating image
imageCache.set(cacheKey, imageUrl);
```

### 8.2 Batch Requests

Vertex AI supports batch predictions for better efficiency.

## Troubleshooting

### Common Issues

1. **Authentication Error**
   - Verify service account has correct permissions
   - Check GOOGLE_APPLICATION_CREDENTIALS path
   - Ensure service-account.json exists

2. **API Not Enabled**
   - Run: `gcloud services list --enabled`
   - Enable missing APIs

3. **Quota Exceeded**
   - Check quotas in Cloud Console
   - Request quota increase if needed

4. **Region Issues**
   - Imagen 2 is available in specific regions
   - Try: us-central1, europe-west4, asia-northeast1

### Debug Commands

```bash
# Check authentication
gcloud auth application-default print-access-token

# Test API access
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration@006:predict \
  -d '{"instances":[{"prompt":"A cat"}],"parameters":{"sampleCount":1}}'
```

## Next Steps

1. Monitor usage in Google Cloud Console
2. Set up billing alerts
3. Implement rate limiting
4. Add fallback to Together AI if Vertex AI fails
5. Consider using Cloud CDN for generated images

## Cost Comparison

- **Vertex AI (Imagen 2)**: ~$0.020 per image
- **Together AI**: ~$0.001 per image
- **Recommendation**: Use Together AI for development, Vertex AI for production quality

Remember to always monitor your costs and set up billing alerts!