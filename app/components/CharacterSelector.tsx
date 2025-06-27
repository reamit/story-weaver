import { CHARACTER_DETAILS } from '../data/character-details';
import CharacterIcon from './CharacterIcon';

interface CharacterSelectorProps {
  selectedCharacter: string;
  onCharacterSelect: (character: string) => void;
}

// Map character IDs to display information
const characters = Object.entries(CHARACTER_DETAILS).map(([id, details]) => {
  // Define colors for each character
  const colorMap: Record<string, string> = {
    princess: 'from-teal-200 to-teal-300',
    knight: 'from-gray-200 to-gray-300',
    dragon: 'from-blue-200 to-blue-300',
    wizard: 'from-purple-200 to-purple-300',
    cat: 'from-amber-200 to-amber-300',
    mouse: 'from-stone-200 to-stone-300'
  };
  
  // Define emojis for each character
  const emojiMap: Record<string, string> = {
    princess: '👑',
    knight: '⚔️',
    dragon: '🐲',
    wizard: '🧙‍♂️',
    cat: '🐱',
    mouse: '🐭'
  };
  
  return {
    id,
    name: details.name,
    emoji: emojiMap[id] || '✨',
    color: colorMap[id] || 'from-purple-200 to-purple-300',
    description: details.core_identity.split('.')[0] // Take first sentence
  };
});

export default function CharacterSelector({ selectedCharacter, onCharacterSelect }: CharacterSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Choose Your Hero
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => onCharacterSelect(char.id)}
            className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
              selectedCharacter === char.id
                ? 'ring-4 ring-purple-400 shadow-lg scale-105'
                : 'hover:shadow-md'
            }`}
          >
            <div className={`bg-gradient-to-br ${char.color} rounded-lg p-4`}>
              <div className="mb-2 flex justify-center">
                <CharacterIcon 
                  characterId={char.id} 
                  emoji={char.emoji} 
                  size="medium"
                />
              </div>
              <div className="text-center font-medium text-gray-700">{char.name}</div>
              <div className="text-xs text-center text-gray-600 mt-1">{char.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}