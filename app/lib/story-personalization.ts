import { ChildProfile } from '../hooks/useChildProfiles';
import { READING_LEVELS } from '../data/interests';
import { generateConsistentCharacter, createDetailedCharacterPrompt, createImageConsistencyPrompt } from './character-consistency';

function generatePageTemplate(
  readingLevel: string, 
  name: string, 
  primaryInterests: string,
  allInterests: string[],
  character: string,
  genre: string,
  gender?: string
): string {
  const pageCount = {
    'pre-reader': 4,
    'early-reader': 6,
    'beginner': 6,
    'intermediate': 8,
    'advanced': 10
  }[readingLevel] || 6;

  let pages = '';
  let images = '';

  // Generate page templates based on reading level
  if (readingLevel === 'pre-reader') {
    pages = `Page 1: [${name} sees ${primaryInterests}. Max 5 words!]
Page 2: [${name} plays. Simple action. Max 5 words!]
Page 3: [Problem happens. Very simple. Max 5 words!]
Page 4: [${name} happy! Problem solved. Max 5 words!]`;
    
    images = `Image 1: [${name} with big smile, surrounded by ${primaryInterests}]
Image 2: [${name} playing with ${primaryInterests}]
Image 3: [Simple problem scene with ${name} looking worried]
Image 4: [${name} very happy with ${primaryInterests}]`;
  } else if (readingLevel === 'early-reader') {
    for (let i = 1; i <= 6; i++) {
      pages += `Page ${i}: [1-2 sentences, 5-7 words each. Simple words only.]\n`;
    }
    for (let i = 1; i <= 6; i++) {
      images += `Image ${i}: [Scene with ${name} and ${primaryInterests} elements]\n`;
    }
  } else if (readingLevel === 'beginner') {
    for (let i = 1; i <= 6; i++) {
      pages += `Page ${i}: [2-3 sentences, 7-10 words each. Grade 1-2 vocabulary.]\n`;
    }
    for (let i = 1; i <= 6; i++) {
      images += `Image ${i}: [Detailed scene with ${name} interacting with ${allInterests.join(', ')}]\n`;
    }
  } else if (readingLevel === 'intermediate') {
    for (let i = 1; i <= 8; i++) {
      pages += `Page ${i}: [3-4 sentences, 10-15 words each. Descriptive language. Character emotions.]\n`;
    }
    for (let i = 1; i <= 8; i++) {
      images += `Image ${i}: [Complex scene showing ${name}'s emotions and ${primaryInterests} environment]\n`;
    }
  } else if (readingLevel === 'advanced') {
    for (let i = 1; i <= 10; i++) {
      pages += `Page ${i}: [4-5 sentences, 15-20 words each. Rich vocabulary. Complex ideas.]\n`;
    }
    for (let i = 1; i <= 10; i++) {
      images += `Image ${i}: [Sophisticated illustration with ${name}, multiple characters, and ${allInterests.join(', ')} themes]\n`;
    }
  }

  return pages + '\n\n' + images;
}

export function generatePersonalizedStoryPrompt(
  character: string,
  genre: string,
  age: number,
  profile?: ChildProfile | null
): string {
  if (!profile) {
    // Default prompt without personalization
    return `
You are a children's book author. Create a 6-page story with these requirements:
- Main character: ${character}
- Setting: ${genre} 
- Age group: ${age} years old
- Each page: 2-3 simple sentences
- Include a gentle moral about friendship, kindness, or courage
- Use age-appropriate vocabulary

Format your response EXACTLY like this:
Title: [story title]

Page 1: [story text]
Page 2: [story text]
Page 3: [story text]
Page 4: [story text]
Page 5: [story text]
Page 6: [story text]

Image 1: [brief visual description for illustration]
Image 2: [brief visual description for illustration]
Image 3: [brief visual description for illustration]
Image 4: [brief visual description for illustration]
Image 5: [brief visual description for illustration]
Image 6: [brief visual description for illustration]`;
  }

  // Get reading level details
  const readingLevel = READING_LEVELS.find(level => level.value === profile.readingLevel) || READING_LEVELS[2];
  
  // Detailed sentence structure based on reading level
  const sentenceStructure = {
    'pre-reader': '1 very short sentence per page (3-5 words maximum). Use repetition.',
    'early-reader': '1-2 short sentences per page (5-7 words each). Simple subject-verb-object structure.',
    'beginner': '2-3 simple sentences per page (7-10 words each). Basic conjunctions allowed.',
    'intermediate': '3-4 sentences per page with descriptive language (10-15 words each).',
    'advanced': '4-5 sentences per page with rich vocabulary and complex structure (15-20 words each).'
  }[profile.readingLevel] || '2-3 simple sentences';

  // Vocabulary and content guidance based on reading level
  const vocabularyGuide = {
    'pre-reader': 'Use only very simple words: colors (red, blue), sizes (big, small), actions (run, jump, play). Repeat key words. Focus on visual storytelling.',
    'early-reader': 'Use common sight words (the, and, is, are, was) and simple vocabulary. Present tense mainly. One idea per sentence.',
    'beginner': 'Use grade 1-2 vocabulary. Mix of tenses allowed. Simple cause and effect. Basic emotions (happy, sad, excited).',
    'intermediate': 'Use grade 3-4 vocabulary. Descriptive adjectives and adverbs. Multiple plot points. Character development.',
    'advanced': 'Use grade 5-6 vocabulary. Complex sentence structures. Metaphors allowed. Deeper themes and character motivations.'
  }[profile.readingLevel] || 'Use age-appropriate vocabulary';

  // Story complexity based on reading level
  const storyComplexity = {
    'pre-reader': 'Very simple linear story. One clear problem and solution. Happy ending.',
    'early-reader': 'Simple story with beginning, middle, end. Basic problem solving. Clear moral.',
    'beginner': 'Story with mild conflict and resolution. Character learns something. Simple subplot allowed.',
    'intermediate': 'Story with multiple challenges. Character growth. Can include plot twist. Secondary characters.',
    'advanced': 'Complex story with character development. Multiple plot threads. Nuanced resolution. Deeper themes.'
  }[profile.readingLevel] || 'Simple story with clear structure';

  // Page count based on reading level
  const pageStructure = {
    'pre-reader': '4 pages (very short story)',
    'early-reader': '6 pages (standard length)',
    'beginner': '6 pages (standard length)',
    'intermediate': '8 pages (longer story)',
    'advanced': '10 pages (chapter-like story)'
  }[profile.readingLevel] || '6 pages';

  // Build interest-based elements
  const primaryInterests = profile.interests.slice(0, 2).join(' and ');
  const allInterests = [...profile.interests];
  if (profile.freeFormInterests) {
    allInterests.push(profile.freeFormInterests);
  }

  // Gender pronouns
  const pronouns = profile.gender ? {
    'boy': 'he/him',
    'girl': 'she/her',
    'other': 'they/them'
  }[profile.gender] : 'they/them';

  return `
You are a children's book author creating a personalized story for ${profile.name}, age ${profile.age}.

CHILD PROFILE:
- Name: ${profile.name}
- Age: ${profile.age} years old
- Reading Level: ${readingLevel.label}
- Pronouns: ${pronouns}
- Primary Interests: ${primaryInterests}
- All Interests: ${allInterests.join(', ')}

STORY REQUIREMENTS:
- Make ${profile.name} the main character of the story
- Main character type: ${character} (but named ${profile.name})
- Setting: Adapt the ${genre} setting to incorporate ${primaryInterests}
- Story length: ${pageStructure}
- Each page MUST follow: ${sentenceStructure}
- Vocabulary requirements: ${vocabularyGuide}
- Story complexity: ${storyComplexity}
- Include a moral that specifically relates to ${primaryInterests}
- Use ${pronouns} pronouns for ${profile.name}

CRITICAL INSTRUCTIONS FOR READING LEVEL (${profile.readingLevel}):
1. STRICTLY follow the sentence count and word limits for ${profile.readingLevel} level
2. The entire story must revolve around ${primaryInterests}
3. Adapt complexity: ${storyComplexity}
4. Every sentence must follow the vocabulary guide exactly
5. ${profile.readingLevel === 'pre-reader' ? 'Use LOTS of repetition and rhyming if possible' : ''}
6. ${profile.readingLevel === 'early-reader' ? 'Focus on sight words and simple patterns' : ''}
7. ${profile.readingLevel === 'intermediate' || profile.readingLevel === 'advanced' ? 'Include character emotions and development' : 'Keep emotions very simple'}

${profile.readingLevel === 'pre-reader' ? `
EXAMPLES FOR PRE-READER:
- Good: "${profile.name} sees stars." (3 words)
- Good: "Big blue rocket!" (3 words)  
- Good: "${profile.name} goes up, up!" (4 words with repetition)
- Bad: "${profile.name} discovers a mysterious rocket." (too complex)
- Bad: "The astronaut explores the galaxy." (too many big words)` : ''}

${profile.readingLevel === 'early-reader' ? `
EXAMPLES FOR EARLY READER:
- Good: "${profile.name} has a red bike. The bike goes fast." (simple sentences)
- Good: "She sees a big dog. The dog is happy." (sight words)
- Bad: "${profile.name} enthusiastically rides her bicycle." (complex words)` : ''}

Format your response EXACTLY like this:
Title: ${profile.name}'s [adventure name]

${generatePageTemplate(profile.readingLevel, profile.name, primaryInterests, allInterests, character, genre, profile.gender)}

IMPORTANT FOR IMAGES: 
- Every image MUST show ${profile.name} with the same appearance
- Every scene MUST incorporate elements from their interests
- The ${genre} setting should be adapted to include ${primaryInterests} themes`;
}

export function generatePersonalizedImagePrompt(
  basePrompt: string,
  profile?: ChildProfile | null,
  characterAppearance?: any
): string {
  if (!profile || !characterAppearance) {
    return basePrompt;
  }

  // Create consistent character description using the character system
  const character = characterAppearance || generateConsistentCharacter(profile);
  const ageAppropriateStyle = profile.age <= 5 ? 'simple, bright cartoon' : 'detailed cartoon';
  
  // Get primary interests for visual consistency
  const primaryInterest = profile.interests[0] || '';
  const secondaryInterest = profile.interests[1] || '';
  
  // Define visual theme based on interests
  const visualTheme = getVisualThemeFromInterests(profile.interests);

  // Create the scene with consistent character
  const sceneWithCharacter = basePrompt
    .replace(/main character/gi, profile.name)
    .replace(/the character/gi, profile.name)
    .replace(/\[character\]/gi, profile.name);

  // Add interest-based elements
  const interestElements = primaryInterest 
    ? `, featuring elements of ${primaryInterest}${secondaryInterest ? ` and ${secondaryInterest}` : ''}` 
    : '';

  // Use the character consistency prompt system
  const fullPrompt = createImageConsistencyPrompt(
    character,
    `${sceneWithCharacter}${interestElements}, ${visualTheme}, ${ageAppropriateStyle} style`
  );

  return `Children's book illustration in consistent style: ${fullPrompt}`;
}

export function createCharacterReference(profile: ChildProfile): string {
  const hairStyle = profile.gender === 'boy' ? 'short neat hair' : 
                   profile.gender === 'girl' ? 'shoulder-length hair with a headband' : 
                   'medium-length wavy hair';
  
  const clothing = getClothingFromInterests(profile.interests);
  
  return `${profile.name} has ${hairStyle}, a warm smile, and wears ${clothing}. This exact appearance must be maintained in every image.`;
}

function getClothingFromInterests(interests: string[]): string {
  const clothingMap: Record<string, string> = {
    'Space & Astronomy': 'a blue shirt with star patterns and comfortable pants',
    'Sports': 'athletic wear with sneakers',
    'Animals': 'a t-shirt with animal prints',
    'Ocean Life': 'a turquoise shirt with wave patterns',
    'Superheroes': 'a red cape over regular clothes',
    'Science': 'a white lab coat over casual clothes',
    'Music': 'a colorful shirt with musical notes',
    'Building': 'overalls with lots of pockets',
    'Art': 'a paint-splattered apron over clothes',
    'Adventure': 'explorer vest with cargo shorts'
  };

  for (const interest of interests) {
    for (const [key, clothing] of Object.entries(clothingMap)) {
      if (interest.includes(key.split(' ')[0])) {
        return clothing;
      }
    }
  }

  return 'a bright colored t-shirt and comfortable pants';
}

function getVisualThemeFromInterests(interests: string[]): string {
  const themes: Record<string, string> = {
    'Space & Astronomy': 'cosmic colors with stars and planets',
    'Ocean Life & Sea Creatures': 'underwater blues and greens with marine elements',
    'Animals & Safari': 'nature colors with animal friends',
    'Building Things': 'bright primary colors with construction elements',
    'Music & Singing': 'musical notes and instruments in the background',
    'Sports': 'dynamic action with sports equipment',
    'Science Experiments': 'laboratory elements with scientific tools',
    'Fantasy & Magic': 'sparkles and magical elements',
    'Dinosaurs': 'prehistoric landscapes with dinosaur friends',
    'Superheroes': 'heroic poses with cape elements'
  };

  // Find matching theme
  for (const interest of interests) {
    for (const [key, theme] of Object.entries(themes)) {
      if (interest.includes(key) || key.includes(interest)) {
        return theme;
      }
    }
  }

  return 'bright, cheerful colors';
}