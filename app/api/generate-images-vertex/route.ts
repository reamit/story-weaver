import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithCache } from '@/app/lib/vertex-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompts, style = 'digital art' } = await request.json();

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return NextResponse.json(
        { error: 'Google Application Credentials not configured' },
        { status: 500 }
      );
    }

    // Generate images with retry logic and better error handling
    const generateWithRetry = async (prompt: string, index: number, maxRetries = 2) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await generateImageWithCache(prompt, style);
          console.log(`Successfully generated image ${index + 1} on attempt ${attempt}`);
          return result;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error(`Attempt ${attempt}/${maxRetries} failed for image ${index + 1}: "${prompt.substring(0, 50)}..."`, errorMessage);
          
          if (attempt < maxRetries) {
            // Wait before retry with exponential backoff
            const waitTime = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s...
            console.log(`Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }
      return null;
    };

    // Process images in batches to avoid rate limits
    const batchSize = 2; // Process 2 images at a time
    const results: (string | null)[] = [];
    
    for (let i = 0; i < prompts.length; i += batchSize) {
      const batch = prompts.slice(i, i + batchSize);
      const batchPromises = batch.map((prompt: string, batchIndex: number) => 
        generateWithRetry(prompt, i + batchIndex)
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches if not the last batch
      if (i + batchSize < prompts.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    const images = results;
    
    // Filter out failed images
    const successfulImages = images.filter(img => img !== null);
    
    if (successfulImages.length === 0) {
      throw new Error('All image generations failed');
    }

    // If some images failed, fill with placeholders
    const finalImages = images.map(img => 
      img || `data:image/svg+xml;base64,${Buffer.from(
        '<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" fill="#f0f0f0"/><text x="256" y="256" text-anchor="middle" font-family="Arial" font-size="24" fill="#999">Image generation failed</text></svg>'
      ).toString('base64')}`
    );

    return NextResponse.json({ images: finalImages });
  } catch (error) {
    console.error('Vertex AI error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Failed to generate images: ${errorMessage}` },
      { status: 500 }
    );
  }
}