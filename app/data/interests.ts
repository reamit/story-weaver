export interface InterestCategory {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: 'creative-play',
    name: 'Creative Play',
    emoji: '🎨',
    subcategories: [
      'Drawing & Painting',
      'Music & Singing',
      'Dancing & Movement',
      'Storytelling & Drama',
      'Imagination Games'
    ]
  },
  {
    id: 'building-making',
    name: 'Building & Making',
    emoji: '🔨',
    subcategories: [
      'Building Things - LEGO, blocks, construction toys',
      'Puzzles & Problem Solving - Jigsaw puzzles, brain teasers, logic games',
      'Engineering & Robots - How things work, taking apart toys, simple coding',
      'Crafts & Making - DIY projects, building models, creating things'
    ]
  },
  {
    id: 'active-sports',
    name: 'Active & Sports',
    emoji: '⚽',
    subcategories: [
      'Running & Racing',
      'Ball Sports - Soccer, basketball, baseball',
      'Swimming & Water Play',
      'Climbing & Gymnastics',
      'Martial Arts & Dance'
    ]
  },
  {
    id: 'animals-nature',
    name: 'Animals & Nature',
    emoji: '🐾',
    subcategories: [
      'Pets & Farm Animals',
      'Wild Animals & Safari',
      'Ocean Life & Sea Creatures',
      'Bugs & Insects',
      'Plants & Gardening'
    ]
  },
  {
    id: 'adventure-exploration',
    name: 'Adventure & Exploration',
    emoji: '🚀',
    subcategories: [
      'Space & Astronomy',
      'Pirates & Treasure Hunting',
      'Exploring & Camping',
      'Travel & Different Cultures',
      'Mystery & Detective'
    ]
  },
  {
    id: 'learning-discovery',
    name: 'Learning & Discovery',
    emoji: '🔬',
    subcategories: [
      'Science Experiments',
      'History & Past Times',
      'How Things Work',
      'Numbers & Math Games',
      'Reading & Books'
    ]
  },
  {
    id: 'games-entertainment',
    name: 'Games & Entertainment',
    emoji: '🎮',
    subcategories: [
      'Video Games & Apps',
      'Board Games & Card Games',
      'Movies & TV Shows',
      'Superheroes & Comics',
      'Fantasy & Magic'
    ]
  }
];

export const READING_LEVELS = [
  { value: 'pre-reader', label: 'Pre-reader (Pictures only)' },
  { value: 'early-reader', label: 'Early Reader (Simple words)' },
  { value: 'beginner', label: 'Beginner (Short sentences)' },
  { value: 'intermediate', label: 'Intermediate (Paragraphs)' },
  { value: 'advanced', label: 'Advanced (Chapter books)' }
];