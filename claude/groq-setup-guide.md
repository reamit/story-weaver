# Groq + Image Generation Setup Guide

## 🚀 Step 1: Groq Account Setup (5 minutes)

1. **Create Account**
   - Go to https://console.groq.com
   - Sign up with Google/GitHub (fastest) or email
   - No credit card required for free tier!

2. **Get API Key**
   ```bash
   # After login:
   # 1. Go to API Keys section
   # 2. Click "Create API Key"
   # 3. Copy and save securely
   ```

3. **Test Your Key**
   ```bash
   # Quick test with curl
   curl https://api.groq.com/openai/v1/models \
     -H "Authorization: Bearer YOUR_GROQ_API_KEY" \
     -H "Content-Type: application/json"
   ```

## 🎨 Step 2: Choose Image Generation Service

### Option A: Together AI (Recommended)
- $25 free credits
- Has FLUX models (state-of-the-art)
- Simple API

### Option B: Replicate
- Pay-per-use (very cheap)
- More model options
- Requires credit card

### Option C: Use Google Vertex AI (Your Credits!)
- You already have credits
- Imagen 2 for images
- More setup time

## 📁 Step 3: Project Setup (10 minutes)

```bash
# Create Next.js project
npx create-next-app@latest story-generator --typescript --tailwind --app
cd story-generator

# Install dependencies
npm install groq-sdk
npm install together-ai  # or replicate if you chose that

# Install UI components
npx shadcn@latest init
npx shadcn@latest add card button select skeleton
```

## 🔧 Step 4: Environment Setup

Create `.env.local`:
```env
# Groq API (for text)
GROQ_API_KEY=gsk_...your_key_here

# Choose one for images:
# Option A: Together AI
TOGETHER_API_KEY=...your_key_here

# Option B: Replicate
REPLICATE_API_TOKEN=...your_key_here

# Option C: Google Vertex AI
GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

## 🧪 Step 5: Test Groq Connection

Create `app/test-groq/route.ts`:
```typescript
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
          content: "Say hello in 5 words"
        }
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.5,
      max_tokens: 100,
    });

    return Response.json({ 
      success: true, 
      message: completion.choices[0]?.message?.content 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Test it:
```bash
npm run dev
# Visit http://localhost:3000/test-groq
# Should see: {"success":true,"message":"Hello, how are you today?"}
```

## 📝 Step 6: Story Generation Template

Create `app/api/generate-story/route.ts`:
```typescript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  const { character, genre, age } = await req.json();

  const prompt = `
You are a children's book author. Create a 6-page story:
- Character: ${character}
- Setting: ${genre} 
- Age group: ${age} years old
- Each page: 2-3 simple sentences
- Include moral about friendship or kindness

Format exactly like this:
Page 1: [story text]
Page 2: [story text]
Page 3: [story text]
Page 4: [story text]
Page 5: [story text]
Page 6: [story text]

Also provide:
Title: [story title]
Image 1: [visual description for illustration]
Image 2: [visual description for illustration]
Image 3: [visual description for illustration]
Image 4: [visual description for illustration]
Image 5: [visual description for illustration]
Image 6: [visual description for illustration]
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the response
    const pages = content.match(/Page \d+: (.+)/g) || [];
    const images = content.match(/Image \d+: (.+)/g) || [];
    const title = content.match(/Title: (.+)/)?.[1] || 'My Story';

    return Response.json({
      title,
      pages: pages.map(p => p.replace(/Page \d+: /, '')),
      imagePrompts: images.map(i => i.replace(/Image \d+: /, ''))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## 🏃 Next Steps

1. **Complete Groq account setup** ✓
2. **Choose image service** (Together AI recommended)
3. **Set up the project** with the commands above
4. **Test Groq connection**
5. **Start building UI components**

Ready to move to the next step?