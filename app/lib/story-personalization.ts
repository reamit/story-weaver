import { ChildProfile } from '../hooks/useChildProfiles';
import { READING_LEVELS } from '../data/interests';

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
- Setting: ${genre}
- Incorporate elements from their interests, especially ${primaryInterests}
- Each page: ${sentenceStructure}
- ${vocabularyGuide}
- Include a gentle moral that relates to their interests
- Use ${pronouns} pronouns for ${profile.name}

IMPORTANT: The story should feel personalized for ${profile.name}, incorporating their specific interests into the plot, not just mentioning them.

Format your response EXACTLY like this:
Title: ${profile.name}'s [adventure name]

Page 1: [story text with ${profile.name} as main character]
Page 2: [story text]
Page 3: [story text]
Page 4: [story text]
Page 5: [story text]
Page 6: [story text with moral/lesson]

Image 1: [visual description showing ${profile.name} as a ${age}-year-old ${profile.gender || 'child'}]
Image 2: [visual description incorporating their interests]
Image 3: [visual description]
Image 4: [visual description]
Image 5: [visual description]
Image 6: [visual description with happy ending]`;
}

export function generatePersonalizedImagePrompt(
  basePrompt: string,
  profile?: ChildProfile | null
): string {
  if (!profile) {
    return basePrompt;
  }

  // Extract key elements from the base prompt
  const ageAppropriateStyle = profile.age <= 5 ? 'simple, bright cartoon' : 'detailed cartoon';
  const genderDescription = profile.gender ? 
    `${profile.age}-year-old ${profile.gender}` : 
    `${profile.age}-year-old child`;

  // Add personalization to the prompt
  const personalizedPrompt = basePrompt
    .replace(/main character/gi, `${profile.name}, a ${genderDescription}`)
    .replace(/the character/gi, profile.name)
    .replace(/\[character\]/gi, profile.name);

  // Add interest-based elements
  const interestElements = profile.interests.length > 0 
    ? `, incorporating elements of ${profile.interests[0]}` 
    : '';

  return `Children's book illustration: ${personalizedPrompt}${interestElements}, ${ageAppropriateStyle} style, child-friendly, age-appropriate for ${profile.age} year old`;
}