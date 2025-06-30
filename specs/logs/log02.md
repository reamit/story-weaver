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
 ✓ Compiled in 287ms (610 modules)
 ✓ Compiled in 92ms (296 modules)
 ✓ Compiled in 248ms (610 modules)
 ✓ Compiled in 113ms (610 modules)
 ✓ Compiled /api/generate-story-with-images in 149ms (397 modules)
Debug: API call details: {
  protocol: 'http',
  host: 'localhost:3000',
  baseUrl: 'http://localhost:3000',
  fullUrl: 'http://localhost:3000/api/generate-images-vertex',
  projectId: 'steadfast-leaf-463916-g0'
}
 ✓ Compiled /api/generate-images-vertex in 177ms (539 modules)
Initializing Vertex AI service...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
Vertex AI service initialized successfully
Starting to generate 6 images...

Generating image 1/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A picture of Princess Sofia standing on the shore of the hidden cove, with her sword and a determine...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A picture of Princess Sofia standing on the shore of the hidden cove, with her sword and a determined look on her face., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:32:52 GMT',
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
  bytesLength: 1765488,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1765488
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nGy9y7IkSXIldo6qmUfczKysR08PRIZCckaECy644D9w
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 1 on attempt 1
Image 1 generated successfully
Image data type: string
Image data length: 1765510
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nGy9y7IkSXIldo6qmUfczK
Waiting 5000ms before next image...

Generating image 2/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: An illustration of the big pirate ship attacking the cove, with Princess Sofia sailing out to meet t...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "An illustration of the big pirate ship attacking the cove, with Princess Sofia sailing out to meet the pirate captain., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:03 GMT',
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
  bytesLength: 2042216,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 2042216
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS9W69tS3Im9H2ROeZlXfbt3OrU1S6XL7LaF9ptge12
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 2 on attempt 1
Image 2 generated successfully
Image data type: string
Image data length: 2042238
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS9W69tS3Im9H2ROeZlXf
Waiting 5000ms before next image...

Generating image 3/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A picture of Princess Sofia talking to the pirate captain, who is looking surprised and impressed by...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A picture of Princess Sofia talking to the pirate captain, who is looking surprised and impressed by her bravery., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:14 GMT',
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
  firstPredictionKeys: [ 'bytesBase64Encoded', 'mimeType' ],
  responseKeys: [ 'predictions' ]
}
First prediction details: {
  keys: [ 'bytesBase64Encoded', 'mimeType' ],
  hasBytesBase64Encoded: true,
  bytesLength: 1817744,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1817744
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHS9ybYkx5EsKKLqkSAxJAACJKpO9et6b9vb3vf//04P
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 3 on attempt 1
Image 3 generated successfully
Image data type: string
Image data length: 1817766
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHS9ybYkx5EsKKLqkSAxJA
Waiting 5000ms before next image...

Generating image 4/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: An image of Princess Sofia and the pirates working together to fix the ship, with tools and ropes al...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "An image of Princess Sofia and the pirates working together to fix the ship, with tools and ropes all around them., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:25 GMT',
  server: 'scaffolding on HTTPServer2',
  'transfer-encoding': 'chunked',
  vary: 'Origin, X-Origin, Referer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '0'
}
API Response structure: {
  hasPredictions: false,
  predictionsLength: 0,
  firstPredictionKeys: [],
  responseKeys: []
}
Full API response (no predictions): {}
No valid image in response
=== VERTEX AI IMAGE GENERATION FAILED ===
Error type: Error
Error message: No image generated
Error stack: Error: No image generated
    at VertexAIService.generateImage (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:163:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async generateImageWithCache (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:183:19)
    at async generateWithRetry (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:43:36)
    at async POST (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:68:28)
    at async /Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/next-server.js:272:17)
Attempt 1/2 failed for image 4: "An image of Princess Sofia and the pirates working..." No image generated
Error details: Error: No image generated
    at VertexAIService.generateImage (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:163:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async generateImageWithCache (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:183:19)
    at async generateWithRetry (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:43:36)
    at async POST (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:68:28)
    at async /Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/next-server.js:272:17)
Waiting 5000ms before retry...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: An image of Princess Sofia and the pirates working together to fix the ship, with tools and ropes al...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "An image of Princess Sofia and the pirates working together to fix the ship, with tools and ropes all around them., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:34 GMT',
  server: 'scaffolding on HTTPServer2',
  'transfer-encoding': 'chunked',
  vary: 'Origin, X-Origin, Referer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '0'
}
API Response structure: {
  hasPredictions: false,
  predictionsLength: 0,
  firstPredictionKeys: [],
  responseKeys: []
}
Full API response (no predictions): {}
No valid image in response
=== VERTEX AI IMAGE GENERATION FAILED ===
Error type: Error
Error message: No image generated
Error stack: Error: No image generated
    at VertexAIService.generateImage (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:163:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async generateImageWithCache (webpack-internal:///(rsc)/./app/lib/vertex-ai.ts:183:19)
    at async generateWithRetry (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:43:36)
    at async POST (webpack-internal:///(rsc)/./app/api/generate-images-vertex/route.ts:68:28)
    at async /Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57228
    at async eT.execute (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46851)
    at async eT.handle (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:58760)
    at async doRender (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1366:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1588:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1496:28)
    at async DevServer.renderPageComponent (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1924:24)
    at async DevServer.renderToResponseImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:1962:32)
    at async DevServer.pipeImpl (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/base-server.js:922:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/feche/Repo/work/story-weaver/node_modules/next/dist/server/next-server.js:272:17)
Attempt 2/2 failed for image 4: "An image of Princess Sofia and the pirates working..." No image generated
Image 4 generation failed
Waiting 5000ms before next image...

Generating image 5/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A dramatic illustration of the big storm, with lightning and waves crashing against the ship, and Pr...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A dramatic illustration of the big storm, with lightning and waves crashing against the ship, and Princess Sofia and her friends trying to save it., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:44 GMT',
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
  bytesLength: 1915804,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1915804
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS915IkyZEteI6aR5LKot3VaAAzsiv3/7/orszDDrlA
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 5 on attempt 1
Image 5 generated successfully
Image data type: string
Image data length: 1915826
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS915IkyZEteI6aR5LKot
Waiting 5000ms before next image...

Generating image 6/6...
Google credentials loaded successfully
Credentials project_id: steadfast-leaf-463916-g0
=== VERTEX AI IMAGE GENERATION START ===
Project ID: steadfast-leaf-463916-g0
Location: us-central1
Has credentials: true
Prompt: A happy picture of Princess Sofia and the pirates sailing together, with the sun shining and seagull...
Style: cartoon
Seed: undefined
API Endpoint: https://us-central1-aiplatform.googleapis.com/v1/projects/steadfast-leaf-463916-g0/locations/us-central1/publishers/google/models/imagen-3.0-fast-generate-001:predict
Request body: {
  "instances": [
    {
      "prompt": "A happy picture of Princess Sofia and the pirates sailing together, with the sun shining and seagulls flying overhead., cartoon style, storybook illustration, whimsical, playful, family-friendly and age-appropriate, fantasy adventure theme",
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
  date: 'Mon, 30 Jun 2025 21:33:56 GMT',
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
  bytesLength: 1818488,
  hasBase64Encoded: false,
  base64Length: 0,
  hasImageBytes: false,
  imageBytesLength: 0
}
Image data found!
Image data type: string
Image data length: 1818488
First 100 chars: iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nIS9W7Isu44k5g7Guj0Z9e3R6KerpS91lWmKGoMmpNpJ
=== VERTEX AI IMAGE GENERATION SUCCESS ===
Successfully generated image 6 on attempt 1
Image 6 generated successfully
Image data type: string
Image data length: 1818510
Image starts with 'data:image': true
First 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nIS9W7Isu44k5g7Guj0Z9e

Total images generated: 5/6

Final response preparation:
Total images to return: 6
Image 1: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nGy9y7IkSXIldo6qmUfczK...
Image 2: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS9W69tS3Im9H2ROeZlXf...
Image 3: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nHS9ybYkx5EsKKLqkSAxJA...
Image 4: data:image/svg+xml;base64,CiAgICA8c3ZnIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMi...
Image 5: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nJS915IkyZEteI6aR5LKot...
Image 6: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAgAElEQVR4nIS9W7Isu44k5g7Guj0Z9e...
Sending response with images array of length: 6
Image generation response status: 200
 POST /api/generate-images-vertex 200 in 70098ms
Image generation response: { hasImages: true, imagesLength: 6, responseKeys: [ 'images' ] }
Images received from vertex endpoint:
Image 1: {
  type: 'string',
  length: 1765510,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 2: {
  type: 'string',
  length: 2042238,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 3: {
  type: 'string',
  length: 1817766,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 4: {
  type: 'string',
  length: 2890,
  startsWithDataImage: true,
  first50Chars: 'data:image/svg+xml;base64,CiAgICA8c3ZnIHdpZHRoPSI1'
}
Image 5: {
  type: 'string',
  length: 1915826,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}
Image 6: {
  type: 'string',
  length: 1818510,
  startsWithDataImage: true,
  first50Chars: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA'
}

Final story response:
Title: The Brave Princess of the Pirate Seas
Pages count: 6
Image prompts count: 6
Images count: 6
Images details:
  Image 1: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 2: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 3: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 4: data:image/svg+xml;base64,CiAgICA8c3ZnIHdpZHRoPSI1...
  Image 5: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
  Image 6: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...
 POST /api/generate-story-with-images 200 in 72623ms
