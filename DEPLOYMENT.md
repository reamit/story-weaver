# StoryWeaver Deployment Guide

This guide will help you deploy StoryWeaver to Vercel with proper API key configuration.

## Prerequisites

- Vercel account (free tier works)
- Groq API key (for story generation)
- Together AI API key (for image generation) - optional but recommended

## Getting API Keys

### 1. Groq API Key (Required)
1. Sign up at https://console.groq.com
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key starting with `gsk_`

### 2. Together AI API Key (Recommended)
1. Sign up at https://www.together.ai
2. You get $25 free credits on signup
3. Go to Settings → API Keys
4. Create and copy your API key

## Deployment Steps

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from project root:
   ```bash
   vercel
   ```

3. Follow the prompts and when asked about environment variables, add:
   - `GROQ_API_KEY`: Your Groq API key
   - `TOGETHER_API_KEY`: Your Together AI API key

### Option 2: Deploy via GitHub Integration

1. Go to https://vercel.com/new
2. Import your GitHub repository: `https://github.com/reamit/story-weaver`
3. Configure environment variables in the Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add the following:
     ```
     GROQ_API_KEY=gsk_your_actual_key_here
     TOGETHER_API_KEY=your_actual_together_key_here
     
     # For Google Vertex AI (optional):
     GOOGLE_CLOUD_PROJECT_ID=your-project-id
     GOOGLE_CREDENTIALS_BASE64=base64_encoded_service_account
     GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
     VERTEX_AI_LOCATION=us-central1
     USE_VERTEX_AI=true
     ```

### Option 3: Deploy with Vercel Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Freamit%2Fstory-weaver&env=GROQ_API_KEY,TOGETHER_API_KEY&envDescription=API%20keys%20for%20story%20and%20image%20generation&envLink=https%3A%2F%2Fgithub.com%2Freamit%2Fstory-weaver%2Fblob%2Fmaster%2FDEPLOYMENT.md)

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GROQ_API_KEY` | Yes | Groq API key for story generation | `gsk_...` |
| `TOGETHER_API_KEY` | No* | Together AI key for image generation | `...` |

*While not required, image generation significantly enhances the story experience.

## Testing Your Deployment

1. After deployment, visit your Vercel URL
2. Test the Groq connection: `https://your-app.vercel.app/api/test-groq`
3. Create a test story to ensure everything works

## Security Notes

- Never commit API keys to your repository
- Use Vercel's environment variables for production
- Keep `.env.local` file local only (it's in .gitignore)
- Rotate API keys regularly

## Troubleshooting

### "API key not found" error
- Ensure environment variables are set in Vercel dashboard
- Redeploy after adding environment variables

### Images not generating
- Check if `TOGETHER_API_KEY` is set correctly
- Verify you have credits in your Together AI account

### Story generation fails
- Verify `GROQ_API_KEY` is correct
- Check Groq API status at https://status.groq.com

## Local Development

For local development, create a `.env.local` file in your project root:

```bash
# Copy from .env.local.example
cp .env.local.example .env.local
```

Then add your actual API keys to `.env.local`.

## Cost Considerations

- **Groq**: Free tier includes generous limits
- **Together AI**: $25 free credits, then pay-as-you-go
  - Each story with 6 images costs approximately $0.006
  - 1000 stories ≈ $6

## Support

If you encounter issues:
1. Check the deployment logs in Vercel dashboard
2. Ensure all environment variables are set
3. Create an issue at https://github.com/reamit/story-weaver/issues