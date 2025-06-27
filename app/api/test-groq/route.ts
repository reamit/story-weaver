import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function GET() {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Say hello in 5 words for a children's story app"
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 100,
    });

    return Response.json({ 
      success: true, 
      message: completion.choices[0]?.message?.content,
      model: completion.model
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}