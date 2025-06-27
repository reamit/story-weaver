import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { character, genre, age } = await req.json();

    // First, generate the story text
    const storyPrompt = `
You are a children's book author. Create a 6-page story with these requirements:
- Main character: ${character}
- Setting: ${genre} 
- Age group: ${age} years old
- Each page: 2-3 simple sentences
- Include a gentle moral about friendship, kindness, or courage
- Use age-appropriate vocabulary

Format your response EXACTLY like this:
Title: [story title]

Page 1: [story text]
Page 2: [story text]
Page 3: [story text]
Page 4: [story text]
Page 5: [story text]
Page 6: [story text]

Image 1: [brief visual description for illustration]
Image 2: [brief visual description for illustration]
Image 3: [brief visual description for illustration]
Image 4: [brief visual description for illustration]
Image 5: [brief visual description for illustration]
Image 6: [brief visual description for illustration]
`;

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
    const imagePrompts = imageMatches.map(match => match.replace(/Image \d+: /, '').trim());

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
        
        const imageResponse = await fetch(`${baseUrl}/api/generate-images-vertex`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompts: imagePrompts,
            style: 'cartoon'
          })
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          images = imageData.images || [];
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

    return Response.json({
      title,
      pages,
      imagePrompts,
      images,
      character,
      genre,
      age
    });
  } catch (error: any) {
    console.error('Story generation error:', error);
    return Response.json({ 
      error: error.message || 'Failed to generate story'
    }, { status: 500 });
  }
}