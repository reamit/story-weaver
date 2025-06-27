import { NextResponse } from 'next/server';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function GET() {
  console.log('=== TEST VERTEX ENDPOINT CALLED ===');
  
  try {
    // Check if Vertex AI is configured
    const isConfigured = !!(
      process.env.GOOGLE_CLOUD_PROJECT_ID && 
      (process.env.GOOGLE_CREDENTIALS_BASE64 || process.env.GOOGLE_APPLICATION_CREDENTIALS)
    );

    console.log('Configuration check:', {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Not set',
      credentialsBase64: process.env.GOOGLE_CREDENTIALS_BASE64 ? `Set (${process.env.GOOGLE_CREDENTIALS_BASE64.length} chars)` : 'Not set',
      credentialsFile: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'Not set',
    });

    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        configured: false,
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Not set',
        credentialsBase64: process.env.GOOGLE_CREDENTIALS_BASE64 ? 'Set' : 'Not set',
        credentialsFile: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'Not set',
        message: 'Vertex AI is not configured. Please set GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CREDENTIALS_BASE64'
      });
    }

    // Try to generate a test image
    let vertexAI;
    try {
      vertexAI = new VertexAIService();
      console.log('VertexAIService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize VertexAIService:', error);
      return NextResponse.json({
        success: false,
        configured: true,
        error: error instanceof Error ? error.message : 'Failed to initialize VertexAI service',
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        location: process.env.VERTEX_AI_LOCATION || 'us-central1',
        details: error instanceof Error ? error.stack : undefined
      }, { status: 500 });
    }
    
    const testPrompt = 'A friendly cartoon dragon in a magical forest, children\'s book style';
    
    console.log('Testing Vertex AI with prompt:', testPrompt);
    const image = await vertexAI.generateImage(testPrompt, 'watercolor');
    
    // More detailed response for debugging
    const response = {
      success: true,
      configured: true,
      hasImage: !!image,
      imageLength: image?.length || 0,
      imageType: typeof image,
      imageStartsWithDataUrl: image?.startsWith('data:image') || false,
      imageFirst100Chars: image?.substring(0, 100) || '',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.VERTEX_AI_LOCATION || 'us-central1',
      message: 'Vertex AI is working correctly!',
      // Include the actual image for testing
      testImage: image
    };
    
    console.log('Test vertex response:', {
      ...response,
      testImage: response.testImage?.substring(0, 100) + '...'
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Vertex AI test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({
      success: false,
      configured: true,
      error: errorMessage,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.VERTEX_AI_LOCATION || 'us-central1',
      details: errorStack
    }, { status: 500 });
  }
}