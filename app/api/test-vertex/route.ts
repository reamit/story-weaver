import { NextResponse } from 'next/server';
import { VertexAIService } from '@/app/lib/vertex-ai';

export async function GET() {
  try {
    // Check if Vertex AI is configured
    const isConfigured = !!(
      process.env.GOOGLE_CLOUD_PROJECT_ID && 
      process.env.GOOGLE_APPLICATION_CREDENTIALS
    );

    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        configured: false,
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Not set',
        credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'Not set',
        message: 'Vertex AI is not configured. Please set GOOGLE_CLOUD_PROJECT_ID and GOOGLE_APPLICATION_CREDENTIALS'
      });
    }

    // Try to generate a test image
    const vertexAI = new VertexAIService();
    const testPrompt = 'A friendly cartoon dragon in a magical forest, children\'s book style';
    
    console.log('Testing Vertex AI with prompt:', testPrompt);
    const image = await vertexAI.generateImage(testPrompt, 'watercolor');
    
    return NextResponse.json({
      success: true,
      configured: true,
      hasImage: !!image,
      imageLength: image?.length || 0,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.VERTEX_AI_LOCATION || 'us-central1',
      message: 'Vertex AI is working correctly!'
    });
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