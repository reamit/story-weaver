import { NextResponse } from 'next/server';
import { CHARACTER_DETAILS, getCharacterImagePrompt } from '@/app/data/character-details';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function POST() {
  try {
    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured' },
        { status: 500 }
      );
    }

    const vertexAI = new VertexAIService();
    const characterIcons: Record<string, string> = {};

    // Generate icons for each character
    for (const [characterId, character] of Object.entries(CHARACTER_DETAILS)) {
      try {
        const prompt = `Character portrait icon: ${getCharacterImagePrompt(characterId)}. 
        IMPORTANT: This is a character selection icon, so show the character in a heroic, appealing pose. 
        Square format, centered composition, simple background, vibrant colors, child-friendly cartoon style.
        Focus on the character's distinctive features and personality.`;

        const image = await vertexAI.generateImage(prompt, 'cartoon icon');
        characterIcons[characterId] = image;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate icon for ${characterId}:`, error);
        characterIcons[characterId] = ''; // Fallback to emoji
      }
    }

    return NextResponse.json({ icons: characterIcons });
  } catch (error) {
    console.error('Character icon generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate character icons' },
      { status: 500 }
    );
  }
}