import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompts, character, style = 'cartoon' } = await req.json();

    if (!prompts || !Array.isArray(prompts)) {
      return Response.json({ error: 'Invalid prompts' }, { status: 400 });
    }

    // Style mappings for children's book illustrations
    const styleModifiers = {
      cartoon: 'cartoon style, bright colors, friendly, children\'s book illustration',
      watercolor: 'watercolor painting style, soft colors, dreamy, children\'s book art',
      realistic: 'detailed illustration, vibrant colors, child-friendly, storybook quality'
    };

    const modifier = styleModifiers[style as keyof typeof styleModifiers] || styleModifiers.cartoon;

    // Generate all images in parallel for speed
    const imagePromises = prompts.map(async (prompt: string, index: number) => {
      try {
        const enhancedPrompt = `${prompt}, ${modifier}, safe for children, no scary elements, high quality`;
        
        const response = await together.images.create({
          model: "stabilityai/stable-diffusion-xl-base-1.0", // Much cheaper!
          prompt: enhancedPrompt,
          width: 512,  // Reduced size to save credits
          height: 512,  // Square format, cheaper
          steps: 15,    // Fewer steps = cheaper
          n: 1,
        });

        return {
          index,
          url: (response.data[0] as any).url || response.data[0].b64_json,
          prompt: prompt
        };
      } catch (error: any) {
        console.error(`Failed to generate image ${index}:`, error);
        return {
          index,
          url: null,
          error: error.message
        };
      }
    });

    const results = await Promise.all(imagePromises);
    
    // Sort by index to maintain order
    results.sort((a, b) => a.index - b.index);

    return Response.json({
      images: results.map(r => r.url),
      errors: results.filter(r => r.error).map(r => ({ index: r.index, error: r.error }))
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return Response.json({ 
      error: error.message || 'Failed to generate images'
    }, { status: 500 });
  }
}