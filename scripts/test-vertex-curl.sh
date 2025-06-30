#!/bin/bash

# Load environment variables
source .env.local

# Decode credentials if base64 encoded
if [ -n "$GOOGLE_CREDENTIALS_BASE64" ]; then
  echo "Decoding credentials from base64..."
  echo "$GOOGLE_CREDENTIALS_BASE64" | base64 -d > /tmp/temp-creds.json
  export GOOGLE_APPLICATION_CREDENTIALS=/tmp/temp-creds.json
fi

# Get access token
echo "Getting access token..."
ACCESS_TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Failed to get access token. Trying with service account directly..."
  # Try to get token using the service account directly
  if [ -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    ACCESS_TOKEN=$(gcloud auth print-access-token --account=$(jq -r .client_email "$GOOGLE_APPLICATION_CREDENTIALS") 2>/dev/null)
  fi
fi

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Error: Could not obtain access token"
  exit 1
fi

echo "Access token obtained successfully"

# Set variables
PROJECT_ID="${GOOGLE_CLOUD_PROJECT_ID}"
LOCATION="${VERTEX_AI_LOCATION:-us-central1}"

echo ""
echo "Configuration:"
echo "Project ID: $PROJECT_ID"
echo "Location: $LOCATION"
echo ""

# Test the API
echo "Testing Vertex AI Image Generation API..."
echo ""

# Create request body
REQUEST_BODY='{
  "instances": [{
    "prompt": "A happy cartoon cat playing with a ball of yarn, digital art style, colorful, child-friendly"
  }],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "1:1",
    "safetyFilterLevel": "block_some",
    "personGeneration": "allow_all"
  }
}'

# Make the API call
echo "Making API call..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagegeneration@006:predict" \
  -d "$REQUEST_BODY")

# Check if response contains an error
if echo "$RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
  echo "Error response from API:"
  echo "$RESPONSE" | jq .
  exit 1
fi

# Check if response contains predictions
if echo "$RESPONSE" | jq -e '.predictions[0]' > /dev/null 2>&1; then
  echo "Success! Image generated."
  echo ""
  
  # Extract image data
  IMAGE_DATA=$(echo "$RESPONSE" | jq -r '.predictions[0].bytesBase64Encoded // .predictions[0].base64Encoded // empty')
  
  if [ -n "$IMAGE_DATA" ]; then
    echo "Image data received (length: ${#IMAGE_DATA})"
    echo "First 100 characters: ${IMAGE_DATA:0:100}..."
    
    # Save to file
    echo "$IMAGE_DATA" | base64 -d > test-vertex-image.png
    echo ""
    echo "Image saved to: test-vertex-image.png"
  else
    echo "Warning: No image data found in response"
    echo "Response structure:"
    echo "$RESPONSE" | jq '.predictions[0] | keys'
  fi
else
  echo "Unexpected response format:"
  echo "$RESPONSE" | jq .
fi

# Clean up temp credentials
if [ -f /tmp/temp-creds.json ]; then
  rm /tmp/temp-creds.json
fi