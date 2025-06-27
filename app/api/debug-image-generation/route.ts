import { NextResponse } from 'next/server';
import { generateImageWithCache } from '@/app/lib/vertex-ai';

interface TestResult {
  name: string;
  success: boolean;
  prompt?: string;
  imageReceived?: boolean;
  imageLength?: number;
  imagePreview?: string;
  fullImage?: string;
  error?: string;
  stack?: string;
  status?: number;
  hasImages?: boolean;
  imageCount?: number;
}

export async function GET() {
  console.log('\n=== DEBUG IMAGE GENERATION ENDPOINT ===');
  
  const diagnostics = {
    environment: {
      hasProjectId: !!process.env.GOOGLE_CLOUD_PROJECT_ID,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasCredentials: !!process.env.GOOGLE_CREDENTIALS_BASE64,
      credentialsLength: process.env.GOOGLE_CREDENTIALS_BASE64?.length || 0,
      location: process.env.VERTEX_AI_LOCATION || 'us-central1'
    },
    tests: [] as TestResult[]
  };
  
  // Test 1: Simple image generation
  try {
    console.log('\nTest 1: Generating single test image...');
    const testPrompt = 'A smiling cartoon sun with a happy face, bright colors, child-friendly';
    
    const image = await generateImageWithCache(testPrompt, 'cartoon');
    
    console.log('Image generation result:', {
      success: true,
      hasImage: !!image,
      imageType: typeof image,
      imageLength: image?.length || 0,
      startsWithDataUrl: image?.startsWith('data:image') || false,
      first100Chars: image?.substring(0, 100) || 'null'
    });
    
    diagnostics.tests.push({
      name: 'Single Image Generation',
      success: true,
      prompt: testPrompt,
      imageReceived: !!image,
      imageLength: image?.length || 0,
      imagePreview: image?.substring(0, 200) || 'null',
      fullImage: image // Include full image for testing
    });
  } catch (error) {
    console.error('Test 1 failed:', error);
    diagnostics.tests.push({
      name: 'Single Image Generation',
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
  
  // Test 2: Check response format from internal endpoint
  try {
    console.log('\nTest 2: Testing internal API endpoint...');
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/generate-images-vertex`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompts: ['A happy cartoon cat'],
        style: 'digital art'
      })
    });
    
    const data = await response.json();
    
    console.log('Internal API response:', {
      status: response.status,
      hasData: !!data,
      hasImages: !!data.images,
      imagesLength: data.images?.length || 0,
      firstImageLength: data.images?.[0]?.length || 0
    });
    
    diagnostics.tests.push({
      name: 'Internal API Endpoint',
      success: response.ok,
      status: response.status,
      hasImages: !!data.images,
      imageCount: data.images?.length || 0,
      error: data.error
    });
  } catch (error) {
    console.error('Test 2 failed:', error);
    diagnostics.tests.push({
      name: 'Internal API Endpoint',
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
  
  console.log('\n=== DIAGNOSTICS COMPLETE ===');
  console.log(JSON.stringify(diagnostics, null, 2));
  
  return NextResponse.json(diagnostics);
}