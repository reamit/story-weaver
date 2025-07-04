import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithCache } from '@/app/lib/vertex-ai';
import { generateFallbackImage } from '@/app/lib/fallback-images';

export async function POST(request: NextRequest) {
  try {
    const { prompts, style = 'digital art', characterSeed, character = 'hero' } = await request.json();

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID || !process.env.GOOGLE_CREDENTIALS_BASE64) {
      console.warn('Vertex AI not properly configured. Using fallback images.');
      console.warn('Missing config:', {
        hasProjectId: !!process.env.GOOGLE_CLOUD_PROJECT_ID,
        hasCredentials: !!process.env.GOOGLE_CREDENTIALS_BASE64,
        credentialsLength: process.env.GOOGLE_CREDENTIALS_BASE64?.length || 0
      });
      const fallbackImages = prompts.map((prompt: string, index: number) => 
        generateFallbackImage(prompt, index, character)
      );
      return NextResponse.json({ images: fallbackImages });
    }

    // Initialize VertexAI service once to check for initialization errors
    console.log('Initializing Vertex AI service...');
    try {
      const testService = new (await import('@/app/lib/vertex-ai')).VertexAIService();
      console.log('Vertex AI service initialized successfully');
    } catch (initError) {
      console.error('Failed to initialize Vertex AI service:', initError);
      console.error('Falling back to placeholder images due to initialization error');
      const fallbackImages = prompts.map((prompt: string, index: number) => 
        generateFallbackImage(prompt, index, character)
      );
      return NextResponse.json({ images: fallbackImages });
    }
    
    // Generate images with retry logic and better error handling
    const generateWithRetry = async (prompt: string, index: number, maxRetries = 2) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await generateImageWithCache(prompt, style, characterSeed);
          console.log(`Successfully generated image ${index + 1} on attempt ${attempt}`);
          return result;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error(`Attempt ${attempt}/${maxRetries} failed for image ${index + 1}: "${prompt.substring(0, 50)}..."`, errorMessage);
          
          // Log more details on first failure
          if (attempt === 1 && err instanceof Error) {
            console.error('Error details:', err.stack);
          }
          
          if (attempt < maxRetries) {
            // Wait before retry with exponential backoff
            const waitTime = Math.min(attempt * 5000, 15000); // 5s, 10s, 15s max
            console.log(`Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }
      return null;
    };

    // Process images one at a time with longer delays for maximum reliability
    const results: (string | null)[] = [];
    
    console.log(`Starting to generate ${prompts.length} images...`);
    
    for (let i = 0; i < prompts.length; i++) {
      console.log(`\nGenerating image ${i + 1}/${prompts.length}...`);
      const result = await generateWithRetry(prompts[i], i);
      
      if (result) {
        console.log(`Image ${i + 1} generated successfully`);
        console.log(`Image data type: ${typeof result}`);
        console.log(`Image data length: ${result.length}`);
        console.log(`Image starts with 'data:image': ${result.startsWith('data:image')}`);
        console.log(`First 100 chars: ${result.substring(0, 100)}`);
      } else {
        console.log(`Image ${i + 1} generation failed`);
      }
      
      results.push(result);
      
      // Add substantial delay between images to avoid rate limiting
      if (i < prompts.length - 1) {
        const delayTime = 5000; // 5 seconds between images
        console.log(`Waiting ${delayTime}ms before next image...`);
        await new Promise(resolve => setTimeout(resolve, delayTime));
      }
    }
    
    const images = results;
    console.log(`\nTotal images generated: ${images.filter(img => img !== null).length}/${prompts.length}`);
    
    // Filter out failed images
    const successfulImages = images.filter(img => img !== null);
    
    if (successfulImages.length === 0) {
      console.error('All image generations failed. Returning fallback images.');
      // Don't throw error, just use fallback images
      // throw new Error('All image generations failed');
    }

    // If some images failed, fill with beautiful fallback images
    const finalImages = images.map((img, index) => 
      img || generateFallbackImage(prompts[index], index, character)
    );

    console.log('\nFinal response preparation:');
    console.log(`Total images to return: ${finalImages.length}`);
    finalImages.forEach((img, index) => {
      if (img) {
        console.log(`Image ${index + 1}: ${img.substring(0, 100)}...`);
      } else {
        console.log(`Image ${index + 1}: null`);
      }
    });
    
    const response = { images: finalImages };
    console.log('Sending response with images array of length:', response.images.length);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Vertex AI error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Failed to generate images: ${errorMessage}` },
      { status: 500 }
    );
  }
}