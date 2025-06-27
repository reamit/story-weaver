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

    // Generate images in parallel
    const imagePromises = prompts.map((prompt: string) => 
      generateImageWithCache(prompt, style)
        .catch(err => {
          console.error(`Failed to generate image for prompt: ${prompt}`, err);
          return null; // Return null for failed images
        })
    );

    const images = await Promise.all(imagePromises);
    
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
    return NextResponse.json(
      { error: `Failed to generate images: ${error.message}` },
      { status: 500 }
    );
  }
}