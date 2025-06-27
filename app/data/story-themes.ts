export interface StoryTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  settings: string[];
  plotElements: string[];
}

export const STORY_THEMES: StoryTheme[] = [
  {
    id: 'medieval',
    name: 'Medieval Kingdom',
    emoji: '🏰',
    description: 'Knights, castles, and royal adventures',
    settings: ['castle throne room', 'medieval marketplace', 'enchanted forest', 'dragon\'s lair', 'tournament grounds'],
    plotElements: ['royal quests', 'dragon encounters', 'knightly tournaments', 'protecting the kingdom', 'magical artifacts']
  },
  {
    id: 'space',
    name: 'Space Adventure',
    emoji: '🚀',
    description: 'Explore planets and meet alien friends',
    settings: ['space station', 'alien planets', 'asteroid fields', 'cosmic nebula', 'moon base'],
    plotElements: ['space exploration', 'alien friendships', 'cosmic mysteries', 'saving planets', 'discovering new worlds']
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    emoji: '🌊',
    description: 'Underwater kingdoms and sea creatures',
    settings: ['coral reef palace', 'sunken ship', 'ocean trench', 'mermaid city', 'kelp forest'],
    plotElements: ['underwater rescue', 'finding treasures', 'sea creature friends', 'ocean mysteries', 'protecting the reef']
  },
  {
    id: 'magical-forest',
    name: 'Magical Forest',
    emoji: '🌲',
    description: 'Enchanted woods full of wonder',
    settings: ['fairy grove', 'talking tree hollow', 'crystal waterfall', 'mushroom village', 'ancient ruins'],
    plotElements: ['forest magic', 'helping woodland creatures', 'finding magical items', 'nature adventures', 'fairy friendships']
  },
  {
    id: 'modern',
    name: 'Modern City',
    emoji: '🏙️',
    description: 'Contemporary adventures in the city',
    settings: ['city park', 'science museum', 'skyscraper rooftop', 'subway tunnels', 'tech laboratory'],
    plotElements: ['urban adventures', 'helping neighbors', 'solving mysteries', 'technology quests', 'community projects']
  },
  {
    id: 'pirate',
    name: 'Pirate Seas',
    emoji: '🏴‍☠️',
    description: 'Sailing adventures and treasure hunts',
    settings: ['pirate ship deck', 'treasure island', 'hidden cove', 'port town', 'sea cave'],
    plotElements: ['treasure hunts', 'sea battles', 'island exploration', 'pirate friendships', 'nautical navigation']
  },
  {
    id: 'prehistoric',
    name: 'Dinosaur Era',
    emoji: '🦕',
    description: 'Travel back to the time of dinosaurs',
    settings: ['prehistoric jungle', 'volcano valley', 'tar pits', 'dinosaur nests', 'ancient caves'],
    plotElements: ['dinosaur friendships', 'prehistoric survival', 'time travel', 'fossil discoveries', 'protecting eggs']
  },
  {
    id: 'arctic',
    name: 'Arctic Adventure',
    emoji: '🐧',
    description: 'Icy landscapes and polar friends',
    settings: ['ice palace', 'glacier caves', 'northern lights sky', 'penguin colony', 'research station'],
    plotElements: ['ice rescue missions', 'polar bear friendships', 'aurora mysteries', 'warming hearts', 'arctic exploration']
  }
];

export function getThemeById(id: string): StoryTheme | undefined {
  return STORY_THEMES.find(theme => theme.id === id);
}

export function getThemePromptElements(themeId: string): { setting: string; plotElement: string } {
  const theme = getThemeById(themeId);
  if (!theme) {
    return { setting: 'magical land', plotElement: 'adventure' };
  }
  
  // Return random elements from the theme
  const setting = theme.settings[Math.floor(Math.random() * theme.settings.length)];
  const plotElement = theme.plotElements[Math.floor(Math.random() * theme.plotElements.length)];
  
  return { setting, plotElement };
}