import { NextResponse } from 'next/server';
import { CHARACTER_DETAILS, getCharacterImagePrompt } from '@/app/data/character-details';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function POST(request: Request) {
  try {
    const { characterId } = await request.json();
    
    if (!characterId || !CHARACTER_DETAILS[characterId]) {
      return NextResponse.json(
        { error: 'Invalid character ID' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured' },
        { status: 500 }
      );
    }

    const vertexAI = new VertexAIService();
    const character = CHARACTER_DETAILS[characterId];
    
    const prompt = `Character portrait icon: ${getCharacterImagePrompt(characterId)}. 
    IMPORTANT: This is a character selection icon, so show the character in a heroic, appealing pose. 
    Square format, centered composition, simple background with gradient, vibrant colors, child-friendly cartoon style.
    Focus on the character's distinctive features and personality. Make it appealing to children.`;

    const image = await vertexAI.generateImage(prompt, 'cartoon icon');
    
    return NextResponse.json({ icon: image });
  } catch (error) {
    console.error(`Failed to generate icon for character:`, error);
    return NextResponse.json(
      { error: 'Failed to generate character icon' },
      { status: 500 }
    );
  }
}