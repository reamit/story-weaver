import { NextResponse } from 'next/server';

export async function GET() {
  // Check configuration without exposing sensitive data
  const config = {
    groq: {
      configured: !!process.env.GROQ_API_KEY,
      keyLength: process.env.GROQ_API_KEY?.length || 0,
      keyPrefix: process.env.GROQ_API_KEY?.substring(0, 8) || 'not set'
    },
    togetherAI: {
      configured: !!process.env.TOGETHER_API_KEY,
      keyLength: process.env.TOGETHER_API_KEY?.length || 0,
      keyPrefix: process.env.TOGETHER_API_KEY?.substring(0, 8) || 'not set'
    },
    vertexAI: {
      enabled: process.env.USE_VERTEX_AI === 'true',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'not set',
      credentialsPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || 'not set',
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
      images: config.togetherAI.configured ? 'Together AI ready' : 
              config.vertexAI.enabled ? 'Vertex AI enabled' : 
              'No image provider configured',
      vertexAI: config.vertexAI.enabled ? 
                (config.vertexAI.credentialsExist ? 'Ready' : 'Credentials file not found') : 
                'Not enabled'
    }
  });
}