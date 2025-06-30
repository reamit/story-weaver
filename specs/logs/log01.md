 ✓ Compiled /api/generate-story-with-images in 80ms (397 modules)
Debug: API call details: {
  protocol: 'http',
  host: 'localhost:3000',
  baseUrl: 'http://localhost:3000',
  fullUrl: 'http://localhost:3000/api/generate-images-vertex',
  projectId: 'steadfast-leaf-463916-g0'
}
 ✓ Compiled /api/generate-images-vertex in 95ms (539 modules)
Initializing Vertex AI service...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
Vertex AI service initialized successfully
Starting to generate 3 images...

Generating image 1/3...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A colorful illustration of the Wizard standing on a dock, looking out at the Pirate Seas with ships ...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A colorful illustration of the Wizard standing on a dock, looking out at the Pirate Seas with ships sailing in the background., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
      "negativePrompt": "child, kid, baby, toddler, minor"
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "1:1",
    "safetyFilterLevel": "block_none",
    "personGeneration": "allow_all"
  }
}
Getting access token...
Access token obtained: true
Making API request...
Response status: 200
Response headers: {
  'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
  'content-encoding': 'gzip',
  'content-type': 'application/json; charset=UTF-8',
  date: 'Mon, 30 Jun 2025 21:21:24 GMT',
  server: 'scaffolding on HTTPServer2',
  'transfer-encoding': 'chunked',
  vary: 'Origin, X-Origin, Referer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '0'
}
API Response structure: {
  hasPredictions: true,
  predictionsLength: 1,
  firstPredictionKeys: [ 'mimeType', 'bytesBase64Encoded' ],
  responseKeys: [ 'predictions' ]
}
First prediction details: {
  keys: [ 'mimeType', 'bytesBase64Encoded' ],
  hasBytesBase64Encoded: true,
  bytesLength: 2103068,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 2103068
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nKy9WZNkS3Ie9n3ucU5mVXX33e8MZgACHEKCAIqLJDPp
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 1 on attempt 1
Image 1 generated successfully
Image data type: string
Image data length: 2103090
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nKy9WZNkS3Ie9n3ucU5mVX
Waiting 5000ms before next image...

Generating image 2/3...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A dramatic picture of a big storm cloud with lightning and strong winds, and the Wizard and Pip hold...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A dramatic picture of a big storm cloud with lightning and strong winds, and the Wizard and Pip holding on to a ship's wheel., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
      "negativePrompt": "child, kid, baby, toddler, minor"
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "1:1",
    "safetyFilterLevel": "block_none",
    "personGeneration": "allow_all"
  }
}
Getting access token...
Access token obtained: true
Making API request...
Response status: 200
Response headers: {
  'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
  'content-encoding': 'gzip',
  'content-type': 'application/json; charset=UTF-8',
  date: 'Mon, 30 Jun 2025 21:21:35 GMT',
  server: 'scaffolding on HTTPServer2',
  'transfer-encoding': 'chunked',
  vary: 'Origin, X-Origin, Referer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '0'
}
API Response structure: {
  hasPredictions: true,
  predictionsLength: 1,
  firstPredictionKeys: [ 'mimeType', 'bytesBase64Encoded' ],
  responseKeys: [ 'predictions' ]
}
First prediction details: {
  keys: [ 'mimeType', 'bytesBase64Encoded' ],
  hasBytesBase64Encoded: true,
  bytesLength: 1833584,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1833584
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHy9a3dkR44kaAbcCJLJZGZKqqqenqntmv3/P2pn9vR2
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 2 on attempt 1
Image 2 generated successfully
Image data type: string
Image data length: 1833606
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHy9a3dkR44kaAbcCJLJZG
Waiting 5000ms before next image...

Generating image 3/3...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A heartwarming picture of the Wizard and Pip standing together, smiling and shaking hands, with a su...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A heartwarming picture of the Wizard and Pip standing together, smiling and shaking hands, with a sunny sky and sea behind them., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
      "negativePrompt": "child, kid, baby, toddler, minor"
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "1:1",
    "safetyFilterLevel": "block_none",
    "personGeneration": "allow_all"
  }
}
Getting access token...
Access token obtained: true
Making API request...
Response status: 200
Response headers: {
  'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
  'content-encoding': 'gzip',
  'content-type': 'application/json; charset=UTF-8',
  date: 'Mon, 30 Jun 2025 21:21:46 GMT',
  server: 'scaffolding on HTTPServer2',
  'transfer-encoding': 'chunked',
  vary: 'Origin, X-Origin, Referer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '0'
}
API Response structure: {
  hasPredictions: true,
  predictionsLength: 1,
  firstPredictionKeys: [ 'mimeType', 'bytesBase64Encoded' ],
  responseKeys: [ 'predictions' ]
}
First prediction details: {
  keys: [ 'mimeType', 'bytesBase64Encoded' ],
  hasBytesBase64Encoded: true,
  bytesLength: 1704852,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1704852
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nNS9y85lOY8lthZ1IvOvvsAjA/3+fiCPPPPIMDxq22gY
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 3 on attempt 1
Image 3 generated successfully
Image data type: string
Image data length: 1704874
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nNS9y85lOY8lthZ1IvOvvs

Total images generated: 3/3

Final response preparation:
Total images to return: 3
Image 1: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nKy9WZNkS3Ie9n3ucU5mVX...
Image 2: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHy9a3dkR44kaAbcCJLJZG...
Image 3: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nNS9y85lOY8lthZ1IvOvvs...
Sending response with images array of length: 3
Image generation response status: 200
 POST /api/generate-images-vertex 200 in 28095ms
Image generation response: { hasImages: true, imagesLength: 3, responseKeys: [ 'images' ] }
Images received from vertex endpoint:
Image 1: {
  type: 'string',
  length: 2103090,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 2: {
  type: 'string',
  length: 1833606,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 3: {
  type: 'string',
  length: 1704874,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}

Final story response:
Title: Wizard's Pirate Voyage
Pages count: 6
Image prompts count: 3
Images count: 3
Images details:
  Image 1: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 2: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 3: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
 POST /api/generate-story-with-images 200 in 30364ms
