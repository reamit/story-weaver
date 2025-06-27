#!/usr/bin/env node

// Direct test of the image generation pipeline
require('dotenv').config({ path: '.env.local' });

async function testImageGeneration() {
  console.log('=== Testing Image Generation Pipeline ===\n');
  
  // Check environment variables
  console.log('Environment check:');
  console.log('GOOGLE_CLOUD_PROJECT_ID:', process.env.GOOGLE_CLOUD_PROJECT_ID ? '✓ Set' : '✗ Not set');
  console.log('GOOGLE_CREDENTIALS_BASE64:', process.env.GOOGLE_CREDENTIALS_BASE64 ? '✓ Set' : '✗ Not set');
  console.log('VERTEX_AI_LOCATION:', process.env.VERTEX_AI_LOCATION || 'us-central1 (default)');
  
  if (!process.env.GOOGLE_CLOUD_PROJECT_ID || !process.env.GOOGLE_CREDENTIALS_BASE64) {
    console.error('\n❌ Missing required environment variables');
    process.exit(1);
  }
  
  // Test 1: Direct Vertex AI call
  console.log('\n1. Testing direct Vertex AI call...');
  try {
    const { VertexAIService } = require('../app/lib/vertex-ai');
    const vertexAI = new VertexAIService();
    
    const testPrompt = 'A happy cartoon cat playing with a ball of yarn, digital art, colorful, child-friendly';
    console.log('Prompt:', testPrompt);
    
    const image = await vertexAI.generateImage(testPrompt);
    console.log('\n✓ Direct Vertex AI call successful!');
    console.log('Image data received:');
    console.log('- Type:', typeof image);
    console.log('- Length:', image.length);
    console.log('- Starts with data:image:', image.startsWith('data:image'));
    console.log('- First 100 chars:', image.substring(0, 100));
    
    // Save image to file for inspection
    const fs = require('fs');
    const path = require('path');
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const testImagePath = path.join(__dirname, 'test-image.png');
    fs.writeFileSync(testImagePath, buffer);
    console.log(`- Test image saved to: ${testImagePath}`);
    
  } catch (error) {
    console.error('\n❌ Direct Vertex AI call failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
  
  // Test 2: API endpoint call
  console.log('\n2. Testing /api/generate-images-vertex endpoint...');
  
  // Start the Next.js server in the background
  const { spawn } = require('child_process');
  console.log('Starting Next.js server...');
  
  const server = spawn('npm', ['run', 'dev'], {
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'pipe'
  });
  
  // Wait for server to start
  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('started server')) {
        console.log('Server started!');
        resolve();
      }
    });
  });
  
  // Give it a bit more time to fully initialize
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    const testPrompts = [
      'A brave knight standing in front of a castle',
      'The knight discovers a hidden treasure chest',
      'The knight celebrates with village friends'
    ];
    
    console.log('Testing with prompts:', testPrompts);
    
    const response = await fetch('http://localhost:3000/api/generate-images-vertex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompts: testPrompts,
        style: 'cartoon'
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('\nResponse data:');
    console.log('- Has images:', !!data.images);
    console.log('- Images count:', data.images?.length || 0);
    
    if (data.images) {
      data.images.forEach((img, index) => {
        console.log(`\nImage ${index + 1}:`);
        console.log('- Type:', typeof img);
        console.log('- Length:', img?.length || 0);
        console.log('- Starts with data:image:', img?.startsWith('data:image') || false);
        console.log('- First 50 chars:', img?.substring(0, 50) || 'null');
      });
    }
    
    if (data.error) {
      console.error('\n❌ API endpoint returned error:', data.error);
    } else {
      console.log('\n✓ API endpoint test successful!');
    }
    
  } catch (error) {
    console.error('\n❌ API endpoint test failed:', error);
  } finally {
    // Kill the server
    server.kill();
  }
  
  console.log('\n=== Test Complete ===');
}

// Run the test
testImageGeneration().catch(console.error);