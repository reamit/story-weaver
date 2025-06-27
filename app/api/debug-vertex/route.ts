import { NextResponse } from 'next/server';

export async function GET() {
  console.log('=== DEBUG VERTEX ENDPOINT ===');
  
  const diagnostics = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Not set',
      GOOGLE_CREDENTIALS_BASE64_LENGTH: process.env.GOOGLE_CREDENTIALS_BASE64?.length || 0,
      VERTEX_AI_LOCATION: process.env.VERTEX_AI_LOCATION || 'Not set (default: us-central1)',
      ALL_GOOGLE_VARS: Object.keys(process.env).filter(k => k.includes('GOOGLE')).sort()
    },
    tests: {
      credentialsParsing: 'Not tested',
      serviceInitialization: 'Not tested',
      apiCall: 'Not tested'
    }
  };

  // Test 1: Parse credentials
  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    try {
      const credentialsJson = Buffer.from(
        process.env.GOOGLE_CREDENTIALS_BASE64,
        'base64'
      ).toString('utf-8');
      const credentials = JSON.parse(credentialsJson);
      diagnostics.tests.credentialsParsing = 'Success';
      diagnostics.env.PARSED_PROJECT_ID = credentials.project_id;
      diagnostics.env.PARSED_CLIENT_EMAIL = credentials.client_email;
    } catch (error) {
      diagnostics.tests.credentialsParsing = `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  } else {
    diagnostics.tests.credentialsParsing = 'Skipped: No credentials';
  }

  // Test 2: Initialize service
  try {
    const { VertexAIService } = await import('@/app/lib/vertex-ai');
    const service = new VertexAIService();
    diagnostics.tests.serviceInitialization = 'Success';
    
    // Test 3: Make a simple API call
    try {
      const result = await service.generateImage('A simple test image', 'digital art');
      diagnostics.tests.apiCall = result ? 'Success' : 'No result returned';
    } catch (apiError) {
      diagnostics.tests.apiCall = `Failed: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`;
    }
  } catch (initError) {
    diagnostics.tests.serviceInitialization = `Failed: ${initError instanceof Error ? initError.message : 'Unknown error'}`;
  }

  return NextResponse.json(diagnostics);
}