import Groq from 'groq-sdk';
import { generatePersonalizedStoryPrompt } from '@/app/lib/story-personalization';
import { ChildProfile } from '@/app/hooks/useChildProfiles';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { character, genre, age, profile } = await req.json();

    // Generate personalized or standard story prompt
    const prompt = generatePersonalizedStoryPrompt(
      character, 
      genre, 
      age,
      profile as ChildProfile | null
    );

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
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

    return Response.json({
      title,
      pages,
      imagePrompts,
      character,
      genre,
      age,
      profile: profile ? { name: profile.name, interests: profile.interests } : null
    });
  } catch (error: any) {
    console.error('Story generation error:', error);
    return Response.json({ 
      error: error.message || 'Failed to generate story'
    }, { status: 500 });
  }
}