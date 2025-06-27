export interface CharacterDetail {
  id: string;
  name: string;
  emoji: string;
  core_identity: string;
  physical_features: {
    description: string;
    [key: string]: string;
  };
  clothing: {
    [key: string]: string;
  };
  equipment?: string[];
  personality_pose?: string;
  art_style_notes: string;
}

export const CHARACTER_DETAILS: Record<string, CharacterDetail> = {
  princess: {
    id: 'princess',
    name: 'Princess',
    emoji: '👑',
    core_identity: 'Brave warrior princess with regal bearing and combat readiness',
    physical_features: {
      description: 'Young woman with warm, confident expression',
      hair: 'Long, flowing auburn/chestnut brown hair with natural waves',
      skin: 'Fair complexion with rosy cheeks',
      eyes: 'Brown eyes with determined gaze',
      build: 'Medium height with athletic build'
    },
    clothing: {
      crown: 'Ornate golden crown with turquoise/teal gemstones and decorative points',
      dress: 'Deep teal/dark green dress with structured bodice',
      cape: 'Red cape/cloak with golden clasps and trim',
      accessories: 'Golden belt and decorative elements throughout outfit',
      sleeves: 'Puffy sleeves with golden trim',
      footwear: 'Brown leather boots suitable for adventure'
    },
    equipment: [
      'Large round silver shield with central boss',
      'Golden-handled sword or dagger',
      'Shield held confidently at her side'
    ],
    art_style_notes: 'Clean cartoon/animation style, warm lighting, heroic pose showing both elegance and strength'
  },
  knight: {
    id: 'knight',
    name: 'Knight',
    emoji: '⚔️',
    core_identity: 'Noble armored warrior with classic chivalric bearing and protective strength',
    physical_features: {
      description: 'Human male with strong, heroic build',
      face: 'Face partially visible through helmet visor',
      eyes: 'Determined brown eyes',
      build: 'Medium to tall height with broad shoulders',
      hands: 'Strong, capable hands in armored gauntlets'
    },
    clothing: {
      armor: 'Full plate armor in polished steel/silver',
      helmet: 'Distinctive helmet with horizontal visor slits',
      trim: 'Golden/brass trim and accents on armor',
      surcoat: 'Teal/dark green surcoat over armor',
      straps: 'Brown leather straps and buckles',
      tunic: 'Teal tunic with golden border trim',
      inner_clothing: 'Red decorative elements or inner clothing'
    },
    equipment: [
      'Small battle axe or weapon at side',
      'Well-maintained equipment showing pride in service'
    ],
    art_style_notes: 'Classic medieval knight aesthetic, realistic armor details, noble bearing, heroic proportions'
  },
  dragon: {
    id: 'dragon',
    name: 'Dragon',
    emoji: '🐲',
    core_identity: 'Noble dragonborn sage with scholarly wisdom and ancient dignity',
    physical_features: {
      description: 'Anthropomorphic dragon standing upright',
      scales: 'Blue-grey scaled skin with darker blue accents',
      chest: 'Cream/tan colored chest and belly scales',
      eyes: 'Sharp, intelligent amber/yellow eyes',
      horns: 'Prominent horns curving back from head',
      features: 'Spinal ridges and decorative back spikes',
      tail: 'Long tail with scale details',
      limbs: 'Clawed hands and feet',
      wings: 'Folded wings visible behind torso'
    },
    clothing: {
      robe: 'Deep blue hooded robe with brown/tan trim',
      layers: 'Layered clothing underneath in earth tones',
      straps: 'Leather straps and buckles across chest',
      jewelry: 'Green gemstone brooch or amulet',
      belt: 'Brown leather belt with pouches',
      style: 'Scholarly/wizard-like appearance'
    },
    personality_pose: 'Dignified stance, hands clasped or gesturing wisely, slight forward lean suggesting attentiveness',
    art_style_notes: 'Detailed scales, noble bearing, warm earth-tone color palette with blue accents'
  },
  cat: {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    core_identity: 'Sophisticated feline adventurer with gentleman\'s attire and roguish charm',
    physical_features: {
      description: 'Anthropomorphic brown tabby cat standing upright',
      fur: 'Distinctive brown striped fur pattern',
      eyes: 'Bright green eyes with alert expression',
      face: 'Pink nose and white muzzle/chest markings',
      ears: 'Cat ears visible under hat',
      features: 'Whiskers and feline facial features',
      tail: 'Bushy tail'
    },
    clothing: {
      hat: 'Wide-brimmed dark blue/black hat with feathers',
      coat: 'Navy blue overcoat with golden trim and buttons',
      vest: 'Red/burgundy vest underneath',
      shirt: 'White collar shirt',
      belt: 'Brown leather belt',
      pants: 'Tan/beige pants or breeches',
      boots: 'Dark brown lace-up boots',
      style: 'Period-appropriate 17th/18th century styling'
    },
    personality_pose: 'Confident swagger, hands on hips or adjusting coat, slight smile showing personality',
    art_style_notes: 'Swashbuckling adventure style, rich colors, detailed fabric textures, anthropomorphic but clearly feline'
  },
  wizard: {
    id: 'wizard',
    name: 'Wizard',
    emoji: '🧙‍♂️',
    core_identity: 'Classic arcane master with ancient wisdom and mystical power',
    physical_features: {
      description: 'Elderly human male with weathered, wise face',
      beard: 'Long flowing white beard reaching chest',
      hair: 'Long white hair, slightly unkempt',
      eyes: 'Deep-set eyes with knowing expression',
      build: 'Tall, lean build with slightly stooped posture',
      hands: 'Aged hands suitable for spellcasting'
    },
    clothing: {
      hat: 'Pointed wizard hat in deep blue with slight curve/bend',
      robes: 'Long flowing robes in deep blue/navy',
      inner_robes: 'Purple/wine colored inner robes and vest',
      trim: 'Golden buttons, clasps, and decorative elements',
      belt: 'Brown leather belt with pouches and components',
      fabric: 'Rich fabric with multiple layers'
    },
    equipment: [
      'Tall wooden staff with ornate top',
      'Magical focus or crystal at staff tip',
      'Small flame or light emanating from hand or staff',
      'Scroll cases and spell components on belt'
    ],
    art_style_notes: 'Classic fantasy wizard aesthetic, rich deep colors, mystical lighting effects, flowing fabric'
  },
  mouse: {
    id: 'mouse',
    name: 'Mouse',
    emoji: '🐭',
    core_identity: 'Determined rodent warrior with knightly aspirations and courage beyond size',
    physical_features: {
      description: 'Anthropomorphic mouse standing upright',
      fur: 'Grey/brown fur with lighter cream belly',
      ears: 'Large round ears (one visible under helmet)',
      eyes: 'Dark brown/black eyes with brave expression',
      nose: 'Pink nose and whiskers',
      build: 'Small but determined stature',
      tail: 'Long pink tail'
    },
    clothing: {
      helmet: 'Metal helmet/cap with small spike or crest',
      collar: 'Purple high collar or cape',
      tunic: 'Grey/olive colored tunic or shirt',
      belt: 'Brown leather belt with buckle',
      pants: 'Brown/tan striped pants or breeches',
      boots: 'Small boots appropriate for mouse size',
      style: 'Medieval/fantasy military styling'
    },
    equipment: [
      'Small sword scaled to mouse proportions',
      'Possibly small shield or armor pieces',
      'Belt with small pouches or supplies'
    ],
    art_style_notes: 'Heroic proportions despite small size, medieval adventure aesthetic, earthy color palette'
  }
};

// Helper function to generate character description for image prompts
export function getCharacterImagePrompt(characterId: string): string {
  const character = CHARACTER_DETAILS[characterId];
  if (!character) return '';

  const physicalDesc = Object.entries(character.physical_features)
    .map(([key, value]) => value)
    .join(', ');

  const clothingDesc = Object.entries(character.clothing)
    .map(([key, value]) => value)
    .join(', ');

  const equipmentDesc = character.equipment ? character.equipment.join(', ') : '';

  return `${character.core_identity}. ${physicalDesc}. Wearing: ${clothingDesc}. ${equipmentDesc}. ${character.art_style_notes}`;
}

// Function to ensure character consistency in stories
export function getCharacterConsistencyPrompt(characterId: string, childName?: string): string {
  const character = CHARACTER_DETAILS[characterId];
  if (!character) return '';

  if (childName) {
    return `${childName} as a ${character.name}: ${character.core_identity}. IMPORTANT: In every image, ${childName} must have the exact same appearance as described here.`;
  }

  return `The ${character.name}: ${character.core_identity}. This character must look identical in every image.`;
}