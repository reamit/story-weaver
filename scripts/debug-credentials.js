// Debug script to check environment variables
console.log('=== Debug Environment Variables ===');
console.log('GOOGLE_CLOUD_PROJECT_ID:', process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Not set');
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS || 'Not set');
console.log('GOOGLE_CREDENTIALS_BASE64:', process.env.GOOGLE_CREDENTIALS_BASE64 ? `Set (${process.env.GOOGLE_CREDENTIALS_BASE64.length} chars)` : 'Not set');
console.log('VERTEX_AI_LOCATION:', process.env.VERTEX_AI_LOCATION || 'Not set');
console.log('Current directory:', process.cwd());

const fs = require('fs');
const path = require('path');

// Check if service-account.json exists
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
console.log('\nChecking for service-account.json at:', serviceAccountPath);
console.log('File exists:', fs.existsSync(serviceAccountPath));

// List files in current directory
console.log('\nFiles in current directory:');
const files = fs.readdirSync(process.cwd());
files.forEach(file => {
  const stats = fs.statSync(file);
  console.log(`- ${file} (${stats.isDirectory() ? 'dir' : 'file'})`);
});