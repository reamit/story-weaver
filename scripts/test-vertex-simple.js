const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'steadfast-leaf-463916-g0';
const location = process.env.VERTEX_AI_LOCATION || 'us-central1';

console.log('Testing Vertex AI configuration...\n');
console.log('Project ID:', projectId);
console.log('Location:', location);
console.log('GOOGLE_CREDENTIALS_BASE64:', process.env.GOOGLE_CREDENTIALS_BASE64 ? 'SET' : 'NOT SET');
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS || 'NOT SET');

// Check if service-account.json exists
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
if (fs.existsSync(serviceAccountPath)) {
  console.log('\nservice-account.json exists');
  try {
    const content = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('Service account email:', content.client_email);
    console.log('Project ID in file:', content.project_id);
  } catch (err) {
    console.error('Error reading service-account.json:', err.message);
  }
} else {
  console.log('\nservice-account.json NOT FOUND');
}

console.log('\nTo test the API, run: curl http://localhost:3000/api/test-vertex');