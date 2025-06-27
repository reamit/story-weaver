import { ChildProfile } from '../hooks/useChildProfiles';
import { READING_LEVELS } from '../data/interests';
import { generateConsistentCharacter, createDetailedCharacterPrompt, createImageConsistencyPrompt } from './character-consistency';

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
  
  // Sentence structure based on reading level
  const sentenceStructure = {
    'pre-reader': '1 very short sentence (3-5 words)',
    'early-reader': '1-2 short sentences (5-7 words each)',
    'beginner': '2-3 simple sentences',
    'intermediate': '3-4 sentences with descriptive language',
    'advanced': '3-5 sentences with rich vocabulary'
  }[profile.readingLevel] || '2-3 simple sentences';

  // Vocabulary guidance based on age and reading level
  const vocabularyGuide = {
    'pre-reader': 'Use only very simple words. Focus on colors, shapes, and basic actions.',
    'early-reader': 'Use common sight words and simple vocabulary.',
    'beginner': 'Use age-appropriate vocabulary with context clues.',
    'intermediate': 'Include some challenging words with context.',
    'advanced': 'Use rich, varied vocabulary appropriate for the age.'
  }[profile.readingLevel] || 'Use age-appropriate vocabulary';

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
- The story MUST be deeply connected to their interests - not just mentioning them, but making them central to the plot
- Each page: ${sentenceStructure}
- ${vocabularyGuide}
- Include a moral that specifically relates to ${primaryInterests}
- Use ${pronouns} pronouns for ${profile.name}

CRITICAL INSTRUCTIONS:
1. The entire story must revolve around ${primaryInterests}
2. Every page should have elements from their interests
3. The ${character} character should be engaged in activities related to ${allInterests.join(', ')}
4. Make the setting reflect their interests (e.g., if they love space, even a medieval story should have star/moon elements)
5. Character appearance: ${profile.name} should be consistently described as a ${profile.age}-year-old ${profile.gender || 'child'}

Format your response EXACTLY like this:
Title: ${profile.name}'s [adventure name]

Page 1: [story text with ${profile.name} as main character]
Page 2: [story text]
Page 3: [story text]
Page 4: [story text]
Page 5: [story text]
Page 6: [story text with moral/lesson]

Image 1: [Detailed scene description: ${profile.name} as the ${character} in ${genre} setting, surrounded by ${primaryInterests} elements. Show ${profile.name} as a ${profile.age}-year-old ${profile.gender || 'child'}]
Image 2: [Action scene: ${profile.name} actively engaged with ${primaryInterests}, maintaining consistent appearance from Image 1]
Image 3: [Challenge scene: ${profile.name} facing a problem related to ${primaryInterests}, same character appearance]
Image 4: [Problem-solving scene: ${profile.name} using knowledge of ${allInterests.slice(0, 2).join(' and ')} to find solution]
Image 5: [Success scene: ${profile.name} succeeding with help from ${primaryInterests} elements]
Image 6: [Happy ending: ${profile.name} celebrating, surrounded by all their favorite things from ${allInterests.join(', ')}]

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