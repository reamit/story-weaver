import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithCache } from '@/app/lib/vertex-ai';

export async function POST(request: NextRequest) {
  console.log('=== TEST STORY IMAGES ENDPOINT ===');
  
  try {
    const { prompt = "A brave little dragon named Ember discovering a magical crystal in a forest" } = await request.json();
    
    const results: any = {
      prompt,
      attempts: [] as any[]
    };
    
    // Try 3 times with different delays
    for (let i = 0; i < 3; i++) {
      const attemptStart = Date.now();
      
      try {
        console.log(`Attempt ${i + 1}: Generating image...`);
        const image = await generateImageWithCache(prompt, 'digital art');
        
        results.attempts.push({
          attempt: i + 1,
          success: true,
          duration: Date.now() - attemptStart,
          imageLength: image.length,
          imagePreview: image.substring(0, 100)
        });
        
        results.success = true;
        results.finalImage = image;
        break;
        
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        
        results.attempts.push({
          attempt: i + 1,
          success: false,
          duration: Date.now() - attemptStart,
          error: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.constructor.name : typeof error
        });
        
        // Wait before retry
        if (i < 2) {
          const waitTime = (i + 1) * 2000;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    if (!results.success) {
      results.success = false;
      results.error = 'All attempts failed';
    }
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST a JSON with { prompt: "your prompt here" } to test image generation'
  });
}