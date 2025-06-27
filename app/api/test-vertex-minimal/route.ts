import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Just test if we can import and use the client
    const { PredictionServiceClient } = await import('@google-cloud/aiplatform');
    
    const credentials = process.env.GOOGLE_CREDENTIALS_BASE64 
      ? JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8'))
      : undefined;
    
    const client = new PredictionServiceClient({
      apiEndpoint: 'us-central1-aiplatform.googleapis.com',
      credentials
    });
    
    // Try to get the project path - this should work if auth is correct
    const projectPath = `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/us-central1`;
    
    return NextResponse.json({
      success: true,
      message: 'Client created successfully',
      projectPath,
      hasCredentials: !!credentials,
      credentialsEmail: credentials?.client_email
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
}