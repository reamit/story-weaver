# Kids' Story Generator - 5 Hour Hackathon Plan

## 🚨 CRITICAL: Pre-Hackathon Setup (Do This NOW!)

### OpenAI API Costs & Setup
1. **OpenAI is NOT free** - Requires credit card
   - New accounts get $5 free credits (3-month expiry)
   - **MUST add payment method** even for free tier
   - Minimum deposit: $5

2. **Cost per Story**:
   - GPT-4 Turbo: ~$0.03 for text (1000 tokens)
   - DALL-E 3: $0.04 × 6 images = $0.24
   - **Total: ~$0.27 per complete story**

3. **Setup Steps** (Do before hackathon):
   ```bash
   # 1. Create OpenAI account
   https://platform.openai.com/signup
   
   # 2. Add payment method (REQUIRED!)
   https://platform.openai.com/settings/organization/billing/overview
   
   # 3. Add $10-20 credits for hackathon
   # 4. Generate API key
   https://platform.openai.com/api-keys
   
   # 5. Test the key works:
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

## 🎯 Hackathon Constraints
- **Time**: 5 hours (with 1-hour buffer)
- **Goal**: Working MVP with AI-powered story generation
- **Strategy**: Use existing tools, no custom building

## 🚀 Technology Stack (Optimized for Speed)

### Core Stack
```bash
# Everything can be set up in under 15 minutes
- Next.js 14 (stable, well-documented)
- TypeScript (optional, can skip for speed)
- Tailwind CSS (built-in with Next.js)
- Vercel AI SDK (unified AI integration)
- OpenAI API (GPT-4 + DALL-E 3)
- shadcn/ui (copy-paste components)
- Vercel deployment (automatic)
```

### Why This Stack?
1. **Single API Key**: OpenAI handles both text and images
2. **Fastest Setup**: Vercel AI SDK works in minutes
3. **Pre-built UI**: shadcn/ui components are production-ready
4. **Instant Deploy**: Push to GitHub = live site

## 📋 5-Hour Timeline

### Hour 0: Setup & Foundation (30 min)
```bash
# 1. Create Next.js app (5 min)
npx create-next-app@latest story-generator --typescript --tailwind --app

# 2. Install dependencies (2 min)
cd story-generator
npm install ai @ai-sdk/openai

# 3. Setup shadcn/ui (3 min)
npx shadcn@latest init
npx shadcn@latest add card button select tabs

# 4. Environment setup (5 min)
# Create .env.local with:
# OPENAI_API_KEY=your-key-here

# 5. Test API connection (15 min)
# Create simple test endpoint
```

### Hour 1: Core AI Integration (45 min)
```javascript
// app/api/generate-story/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { character, genre, age } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4-turbo-preview'),
    prompt: `Write a 6-page children's story for age ${age} featuring a ${character} in a ${genre} setting.`,
    temperature: 0.8,
  });
  
  return result.toDataStreamResponse();
}
```

### Hour 2: Simple UI Components (45 min)
```typescript
// Pre-built components to copy:
// 1. Character selector (grid of emoji cards)
// 2. Genre dropdown (simple select)
// 3. Story display (card with navigation)
// 4. Loading state (spinner + progress text)
```

### Hour 3: Image Generation (45 min)
```javascript
// Add DALL-E 3 integration
const imagePrompt = `Children's book illustration: ${character} in ${genre} style, ${sceneDescription}`;

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: imagePrompt,
  n: 1,
  size: "1024x1024",
  quality: "standard", // Faster than "hd"
});
```

### Hour 4: Polish & Deploy (45 min)
- Mobile responsiveness
- Error handling
- Deploy to Vercel
- Test live site

### Hour 5: Buffer & Enhancements (45 min)
- Fix any bugs
- Add extra features if time permits
- Prepare demo

## 🛠️ Ready-to-Use Components

### 1. Story Prompt Template
```javascript
const storyPrompt = `
You are a children's book author. Create a 6-page story with these requirements:
- Main character: ${character}
- Setting: ${genre}
- Age group: ${age} years old
- Each page: 2-3 sentences
- Include: beginning, middle, end
- Moral: friendship, kindness, or courage
- Language: simple, age-appropriate

Format as:
Page 1: [text]
Page 2: [text]
...
`;
```

### 2. Image Prompt Template
```javascript
const imagePrompt = (pageText: string, character: string, style: string) => `
Children's book illustration for this scene: "${pageText}"
Style: ${style} (watercolor/cartoon/realistic)
Character: ${character}
- Bright, cheerful colors
- Child-friendly
- No scary elements
- High quality illustration
`;
```

### 3. UI Components (shadcn/ui)
```bash
# Copy these components directly:
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add skeleton
```

## 🎨 MVP Features Only

### Must Have (3 hours)
✅ Character selection (6 options)
✅ Generate 6-page story
✅ One image per page
✅ Simple navigation
✅ Mobile responsive

### Nice to Have (if time permits)
⭐ Story preview/loading animation
⭐ Download as PDF
⭐ Share button
⭐ Sound effects

### Skip for Hackathon
❌ User accounts
❌ Story library/saving
❌ Complex animations
❌ Multiple languages
❌ Offline support

## 🚨 Common Pitfalls to Avoid

1. **Don't overcomplicate**: Use defaults everywhere
2. **Skip TypeScript**: If it slows you down
3. **No custom CSS**: Use Tailwind classes only
4. **Avoid state management**: Use React state
5. **No database**: Everything in-memory

## 📝 Quick Start Commands

```bash
# Full setup in one go:
npx create-next-app@latest story-gen --typescript --tailwind --app && cd story-gen && npm install ai @ai-sdk/openai && npx shadcn@latest init -y

# Create API key at: https://platform.openai.com/api-keys
# Add to .env.local: OPENAI_API_KEY=sk-...

# Start development:
npm run dev
```

## 🎯 Success Metrics

1. **Working Demo**: Can generate a complete story
2. **Visual Appeal**: Looks good on mobile
3. **AI Integration**: Both text and images work
4. **Live Site**: Deployed and accessible
5. **Time**: Completed within 5 hours

## ⚠️ Common Impediments & Solutions

### 1. Rate Limit Errors (429)
**Problem**: "Too Many Requests" even on first use
**Solutions**:
```javascript
// Add exponential backoff
async function callOpenAI(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await openai.chat.completions.create({...});
    } catch (error) {
      if (error.status === 429 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      } else {
        throw error;
      }
    }
  }
}

// Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000); // 1 second between API calls
```

### 2. No Credits Error
**Problem**: API fails even with free tier
**Solution**: MUST add payment method and deposit $5 minimum

### 3. CORS Issues
**Problem**: Direct API calls from frontend fail
**Solution**: Always use Next.js API routes (backend)

### 4. Image Generation Timeout
**Problem**: DALL-E 3 can take 10-20 seconds
**Solution**: 
```javascript
// Show progress while generating
setLoadingMessage("Creating illustration...");
// Consider generating images in parallel
const imagePromises = pages.map(page => generateImage(page));
const images = await Promise.all(imagePromises);
```

### 5. Streaming Not Working
**Problem**: Story appears all at once
**Solution**: Use Vercel AI SDK's built-in streaming:
```javascript
import { streamText } from 'ai';
// This handles all the streaming complexity
```

## 🆘 Backup Plans

### If OpenAI Setup Fails:
1. **Google Vertex AI** (you have credits!)
   ```javascript
   // Fallback to Vertex AI
   npm install @google-cloud/vertexai
   // Requires service account setup (15 min)
   ```

2. **Together AI** (cheaper, faster setup)
   ```javascript
   // $0.0001 per 1K tokens (100x cheaper!)
   npm install together-ai
   // Same API structure as OpenAI
   ```

3. **Groq** (free tier available)
   ```javascript
   // Fast inference, generous free tier
   // llama-3.1-70b model available
   ```

### If Images Fail:
1. **Skip images temporarily** - Text-only stories
2. **Use placeholder images** - Unsplash API
3. **Replicate API** - Stable Diffusion

### If deployment fails:
- Use GitHub Pages
- Demo locally
- Use Replit or CodeSandbox

## 📚 Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Next.js App Router](https://nextjs.org/docs/app)