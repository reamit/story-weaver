# StoryWeaver

AI-powered personalized children's story generator with custom illustrations.

**Status**: Active Development | Last Updated: June 27, 2025

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Freamit%2Fstory-weaver&env=GROQ_API_KEY,GOOGLE_CLOUD_PROJECT_ID,GOOGLE_CREDENTIALS_BASE64,GOOGLE_APPLICATION_CREDENTIALS,VERTEX_AI_LOCATION&envDescription=API%20keys%20for%20story%20and%20image%20generation&envLink=https%3A%2F%2Fgithub.com%2Freamit%2Fstory-weaver%2Fblob%2Fmaster%2FDEPLOYMENT.md)

## Quick Start

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/reamit/story-weaver.git
   cd story-weaver
   ```

2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your API keys to `.env.local`:
   - `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
   - Google Vertex AI credentials - See [GOOGLE_VERTEX_AI_SETUP.md](./GOOGLE_VERTEX_AI_SETUP.md)

4. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Groq (Llama 3.3 70B) for text generation
- Google Vertex AI (Imagen 2) for image generation

## Features

- 6 character options
- 3 genre settings
- Age-appropriate content
- 6-page stories with illustrations
- Mobile-responsive design