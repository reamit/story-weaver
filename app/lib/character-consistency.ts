import { ChildProfile } from '../hooks/useChildProfiles';

export interface CharacterAppearance {
  name: string;
  age: number;
  gender: string;
  skinTone: string;
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  clothing: {
    top: string;
    bottom: string;
    shoes: string;
    accessories: string;
  };
  distinctiveFeatures: string;
}

export function generateConsistentCharacter(profile: ChildProfile): CharacterAppearance {
  // Generate consistent appearance based on profile
  const skinTone = 'light peach skin';
  const hairColor = profile.gender === 'boy' ? 'dark brown' : 
                   profile.gender === 'girl' ? 'medium brown' : 
                   'auburn';
  
  const hairStyle = profile.gender === 'boy' ? 'short neat hair' : 
                   profile.gender === 'girl' ? 'shoulder-length hair with bangs' : 
                   'medium wavy hair';
  
  const eyeColor = 'warm brown eyes';
  
  // Generate clothing based on primary interest
  const clothing = getConsistentClothing(profile.interests[0] || '');
  
  return {
    name: profile.name,
    age: profile.age,
    gender: profile.gender || 'child',
    skinTone,
    hairColor,
    hairStyle,
    eyeColor,
    clothing,
    distinctiveFeatures: `Always smiling, ${profile.age} years old appearance`
  };
}

function getConsistentClothing(primaryInterest: string): CharacterAppearance['clothing'] {
  const clothingMap: Record<string, CharacterAppearance['clothing']> = {
    'Space & Astronomy': {
      top: 'navy blue t-shirt with white star pattern',
      bottom: 'dark blue jeans',
      shoes: 'white sneakers with blue laces',
      accessories: 'small telescope pendant necklace'
    },
    'Ocean Life & Sea Creatures': {
      top: 'turquoise t-shirt with wave design',
      bottom: 'light blue shorts',
      shoes: 'blue and white sandals',
      accessories: 'seashell bracelet'
    },
    'Animals': {
      top: 'green safari vest over white t-shirt',
      bottom: 'khaki shorts',
      shoes: 'brown hiking boots',
      accessories: 'small binoculars on a strap'
    },
    'Sports': {
      top: 'red athletic jersey with number 7',
      bottom: 'black athletic shorts',
      shoes: 'red and white sports shoes',
      accessories: 'sweatband on wrist'
    },
    'Building': {
      top: 'yellow construction vest over orange t-shirt',
      bottom: 'blue denim overalls',
      shoes: 'sturdy brown work boots',
      accessories: 'toy tool belt'
    },
    'Superheroes': {
      top: 'red t-shirt with lightning bolt design',
      bottom: 'blue jeans',
      shoes: 'red high-top sneakers',
      accessories: 'small red cape'
    },
    'Music': {
      top: 'purple t-shirt with colorful music notes',
      bottom: 'black leggings',
      shoes: 'sparkly silver shoes',
      accessories: 'headphones around neck'
    },
    'Science': {
      top: 'white lab coat over light blue shirt',
      bottom: 'dark gray pants',
      shoes: 'black and white shoes',
      accessories: 'toy safety goggles on head'
    }
  };

  // Find matching clothing or use default
  for (const [key, outfit] of Object.entries(clothingMap)) {
    if (primaryInterest.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return outfit;
    }
  }

  // Default clothing
  return {
    top: 'bright yellow t-shirt with rainbow design',
    bottom: 'comfortable blue jeans',
    shoes: 'colorful sneakers',
    accessories: 'friendship bracelet'
  };
}

export function createDetailedCharacterPrompt(character: CharacterAppearance): string {
  return `${character.name} is a ${character.age}-year-old ${character.gender} with ${character.skinTone}, ${character.hairColor} ${character.hairStyle}, and ${character.eyeColor}. 
EXACT CLOTHING (NEVER CHANGE): ${character.name} wears ${character.clothing.top}, ${character.clothing.bottom}, ${character.clothing.shoes}, and ${character.clothing.accessories}.
${character.distinctiveFeatures}. 
CRITICAL: This EXACT appearance must be identical in every single image - same face, same hair, same clothes, same colors.`;
}

export function createImageConsistencyPrompt(character: CharacterAppearance, sceneDescription: string): string {
  const characterPrompt = createDetailedCharacterPrompt(character);
  
  return `${sceneDescription}

CHARACTER APPEARANCE (MUST BE EXACT):
${characterPrompt}

CONSISTENCY RULES:
1. ${character.name}'s face must look EXACTLY the same as in previous images
2. Hair color (${character.hairColor}) and style (${character.hairStyle}) must be IDENTICAL
3. Clothing must be EXACTLY: ${character.clothing.top}, ${character.clothing.bottom}, ${character.clothing.shoes}
4. Keep the same art style throughout all images
5. ${character.name} should appear as the same person, not a different child
6. Maintain consistent proportions and features`;
}