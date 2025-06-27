const fs = require('fs');
const path = require('path');

// This script runs during build on Vercel to set up Google credentials
if (process.env.GOOGLE_CREDENTIALS_BASE64) {
  try {
    const credentials = Buffer.from(
      process.env.GOOGLE_CREDENTIALS_BASE64,
      'base64'
    ).toString('utf-8');
    
    const credentialsPath = path.join(process.cwd(), 'service-account.json');
    fs.writeFileSync(credentialsPath, credentials);
    
    console.log('✅ Google credentials file created successfully');
    console.log(`📁 Path: ${credentialsPath}`);
    
    // Verify the file was created
    if (fs.existsSync(credentialsPath)) {
      const stats = fs.statSync(credentialsPath);
      console.log(`📊 File size: ${stats.size} bytes`);
      
      // Validate JSON
      try {
        JSON.parse(credentials);
        console.log('✅ Credentials are valid JSON');
      } catch (e) {
        console.error('❌ Credentials are not valid JSON:', e.message);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('❌ Failed to create Google credentials file:', error);
    process.exit(1);
  }
} else {
  console.log('ℹ️  No GOOGLE_CREDENTIALS_BASE64 found, skipping Google credentials setup');
}