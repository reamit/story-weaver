require('dotenv').config({ path: '.env.local' });
const { VertexAIService } = require('../app/lib/vertex-ai');

async function testVertexAI() {
  console.log('Testing Vertex AI directly...\n');
  
  console.log('Environment check:');
  console.log('- GOOGLE_CLOUD_PROJECT_ID:', process.env.GOOGLE_CLOUD_PROJECT_ID || 'NOT SET');
  console.log('- GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS || 'NOT SET');
  console.log('- GOOGLE_CREDENTIALS_BASE64:', process.env.GOOGLE_CREDENTIALS_BASE64 ? 'SET' : 'NOT SET');
  console.log('- VERTEX_AI_LOCATION:', process.env.VERTEX_AI_LOCATION || 'NOT SET');
  console.log('\n');

  try {
    const vertexAI = new VertexAIService();
    const testPrompt = 'A friendly cartoon dragon in a magical forest';
    console.log('Test prompt:', testPrompt);
    console.log('\nGenerating image...\n');
    
    const image = await vertexAI.generateImage(testPrompt, 'watercolor');
    
    if (image) {
      console.log('\nSUCCESS! Image generated.');
      console.log('Image data length:', image.length);
      console.log('Image starts with:', image.substring(0, 50) + '...');
    } else {
      console.log('\nFAILED: No image returned');
    }
  } catch (error) {
    console.error('\nERROR:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

testVertexAI();