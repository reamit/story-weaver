import { NextResponse } from 'next/server';

export async function GET() {
  // Check configuration without exposing sensitive data
  const config = {
    groq: {
      configured: !!process.env.GROQ_API_KEY,
      keyLength: process.env.GROQ_API_KEY?.length || 0,
      keyPrefix: process.env.GROQ_API_KEY?.substring(0, 8) || 'not set'
    },
    vertexAI: {
      configured: !!process.env.GOOGLE_CLOUD_PROJECT_ID,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'not set',
      credentialsBase64: process.env.GOOGLE_CREDENTIALS_BASE64 ? 'Set' : 'Not set',
      credentialsPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || 'not set',
      location: process.env.VERTEX_AI_LOCATION || 'us-central1',
      credentialsExist: false // Will check file existence
    }
  };

  // Check if Google credentials file exists (for Vercel deployment)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const fs = require('fs');
      config.vertexAI.credentialsExist = fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    } catch (e) {
      // File system might not be accessible
    }
  }

  return NextResponse.json({
    status: 'Configuration Check',
    environment: process.env.NODE_ENV || 'production',
    config,
    recommendations: {
      groq: config.groq.configured ? 'Ready' : 'Missing GROQ_API_KEY',
      vertexAI: config.vertexAI.configured ? 
                (config.vertexAI.credentialsExist ? 'Ready for image generation' : 'Credentials file not found') : 
                'Not configured - Missing GOOGLE_CLOUD_PROJECT_ID'
    }
  });
}