import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithCache } from '@/app/lib/vertex-ai';
import { generateFallbackImage } from '@/app/lib/fallback-images';

export async function POST(request: NextRequest) {
  try {
    const { prompts, style = 'digital art', characterSeed, character = 'hero' } = await request.json();

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_CREDENTIALS_BASE64) {
      return NextResponse.json(
        { error: 'Google Application Credentials not configured' },
        { status: 500 }
      );
    }

    // Generate images with retry logic and better error handling
    const generateWithRetry = async (prompt: string, index: number, maxRetries = 3) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await generateImageWithCache(prompt, style, characterSeed);
          console.log(`Successfully generated image ${index + 1} on attempt ${attempt}`);
          return result;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error(`Attempt ${attempt}/${maxRetries} failed for image ${index + 1}: "${prompt.substring(0, 50)}..."`, errorMessage);
          
          if (attempt < maxRetries) {
            // Wait before retry with longer delays
            const waitTime = attempt * 3000; // 3s, 6s, 9s...
            console.log(`Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }
      return null;
    };

    // Process images one at a time with longer delays for maximum reliability
    const results: (string | null)[] = [];
    
    for (let i = 0; i < prompts.length; i++) {
      const result = await generateWithRetry(prompts[i], i);
      results.push(result);
      
      // Add substantial delay between images to avoid rate limiting
      if (i < prompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
      }
    }
    
    const images = results;
    
    // Filter out failed images
    const successfulImages = images.filter(img => img !== null);
    
    if (successfulImages.length === 0) {
      throw new Error('All image generations failed');
    }

    // If some images failed, fill with beautiful fallback images
    const finalImages = images.map((img, index) => 
      img || generateFallbackImage(prompts[index], index, character)
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