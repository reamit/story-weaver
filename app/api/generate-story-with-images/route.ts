import Groq from 'groq-sdk';
import { generatePersonalizedStoryPrompt, generatePersonalizedImagePrompt } from '@/app/lib/story-personalization';
import { generateConsistentCharacter } from '@/app/lib/character-consistency';
import { ChildProfile } from '@/app/hooks/useChildProfiles';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { character, genre, age, profile } = await req.json();

    // Generate personalized or standard story prompt
    const storyPrompt = generatePersonalizedStoryPrompt(
      character, 
      genre, 
      age,
      profile as ChildProfile | null
    );

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: storyPrompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the response
    const titleMatch = content.match(/Title: (.+)/);
    const title = titleMatch ? titleMatch[1].trim() : 'My Story';
    
    const pageMatches = content.match(/Page \d+: (.+)/g) || [];
    const pages = pageMatches.map(match => match.replace(/Page \d+: /, '').trim());
    
    const imageMatches = content.match(/Image \d+: (.+)/g) || [];
    let imagePrompts = imageMatches.map(match => match.replace(/Image \d+: /, '').trim());
    
    // Generate images for all pages (up to 6 images for complete visual storytelling)

    // Generate images using Google Vertex AI
    let images: string[] = [];
    
    if (process.env.GOOGLE_CLOUD_PROJECT_ID) {
      try {
        // Get the base URL for internal API calls
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const host = req.headers.get('host') || req.headers.get('x-forwarded-host');
        const baseUrl = host ? `${protocol}://${host}` : '';
        
        console.log('Debug: API call details:', {
          protocol,
          host,
          baseUrl,
          fullUrl: `${baseUrl}/api/generate-images-vertex`,
          projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
        });
        
        // Create consistent character appearance for all images
        const characterAppearance = profile ? generateConsistentCharacter(profile as ChildProfile) : null;

        // Personalize image prompts if profile is provided with consistent character
        const personalizedPrompts = profile 
          ? imagePrompts.map((prompt, index) => {
              // Add specific instructions for first image to establish character
              const enhancedPrompt = index === 0 
                ? `FIRST IMAGE - ESTABLISH CHARACTER: ${prompt}. This is the first appearance of ${profile.name}, so clearly show all details.`
                : `${prompt}. MAINTAIN EXACT SAME appearance of ${profile.name} from the first image.`;
              
              return generatePersonalizedImagePrompt(
                enhancedPrompt, 
                profile as ChildProfile,
                characterAppearance,
                character // Pass the character type
              );
            })
          : imagePrompts;

        // Generate a consistent seed for this story session
        const characterSeed = profile ? 
          profile.name.charCodeAt(0) * 1000 + profile.age * 100 + profile.interests.length : 
          undefined;

        const imageResponse = await fetch(`${baseUrl}/api/generate-images-vertex`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompts: personalizedPrompts,
            style: 'cartoon',
            characterSeed,
            character
          })
        });

        console.log('Image generation response status:', imageResponse.status);
        
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          console.log('Image generation response:', {
            hasImages: !!imageData.images,
            imagesLength: imageData.images?.length || 0,
            responseKeys: Object.keys(imageData)
          });
          
          images = imageData.images || [];
          
          console.log('Images received from vertex endpoint:');
          images.forEach((img, index) => {
            console.log(`Image ${index + 1}:`, {
              type: typeof img,
              length: img?.length || 0,
              startsWithDataImage: img?.startsWith('data:image') || false,
              first50Chars: img?.substring(0, 50) || 'null'
            });
          });
          
          // Keep all generated images (up to 6 for complete page coverage)
        } else {
          const errorData = await imageResponse.json();
          console.error('Vertex AI image generation failed:', errorData);
          throw new Error(errorData.error || 'Failed to generate images');
        }
      } catch (error) {
        console.error('Failed to generate images with Vertex AI:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // Return story without images but include detailed error info
        return Response.json({
          title,
          pages,
          imagePrompts,
          images: [],
          character,
          genre,
          age,
          imageError: `Failed to generate images: ${errorMessage}`,
          debugInfo: {
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
            hasCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
            error: errorMessage
          }
        });
      }
    } else {
      // No image provider configured
      return Response.json({
        title,
        pages,
        imagePrompts,
        images: [],
        character,
        genre,
        age,
        imageError: 'Google Vertex AI not configured. Please set up GOOGLE_CLOUD_PROJECT_ID and credentials.'
      });
    }

    const finalResponse = {
      title,
      pages,
      imagePrompts,
      images,
      character,
      genre,
      age
    };
    
    console.log('\nFinal story response:');
    console.log('Title:', finalResponse.title);
    console.log('Pages count:', finalResponse.pages.length);
    console.log('Image prompts count:', finalResponse.imagePrompts.length);
    console.log('Images count:', finalResponse.images.length);
    console.log('Images details:');
    finalResponse.images.forEach((img, index) => {
      console.log(`  Image ${index + 1}: ${img ? img.substring(0, 50) + '...' : 'null'}`);
    });
    
    return Response.json(finalResponse);
  } catch (error: any) {
    console.error('Story generation error:', error);
    return Response.json({ 
      error: error.message || 'Failed to generate story'
    }, { status: 500 });
  }
}