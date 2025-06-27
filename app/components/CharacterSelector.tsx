import SpotlightCard from './SpotlightCard/SpotlightCard';

interface CharacterSelectorProps {
  selectedCharacter: string;
  onCharacterSelect: (character: string) => void;
}

const characters = [
  { id: 'princess', name: 'Princess', emoji: '👸', spotlightColor: 'rgba(253, 0, 127, 0.5)', bgGradient: 'bg-gradient-to-br from-pink-200 to-pink-300' },
  { id: 'knight', name: 'Knight', emoji: '🛡️', spotlightColor: 'rgba(59, 130, 246, 0.5)', bgGradient: 'bg-gradient-to-br from-blue-200 to-blue-300' },
  { id: 'dragon', name: 'Dragon', emoji: '🐲', spotlightColor: 'rgba(34, 197, 94, 0.5)', bgGradient: 'bg-gradient-to-br from-green-200 to-green-300' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙‍♂️', spotlightColor: 'rgba(147, 51, 234, 0.5)', bgGradient: 'bg-gradient-to-br from-purple-200 to-purple-300' },
  { id: 'cat', name: 'Magic Cat', emoji: '🐱', spotlightColor: 'rgba(191, 80, 0, 0.5)', bgGradient: 'bg-gradient-to-br from-orange-200 to-orange-300' },
  { id: 'mouse', name: 'Brave Mouse', emoji: '🐭', spotlightColor: 'rgba(107, 114, 128, 0.5)', bgGradient: 'bg-gradient-to-br from-gray-200 to-gray-300' }
];

export default function CharacterSelector({ selectedCharacter, onCharacterSelect }: CharacterSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Choose Your Hero
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <SpotlightCard
            key={char.id}
            spotlightColor={char.spotlightColor}
            bgGradient={char.bgGradient}
            className={`cursor-pointer transition-all duration-300 ${
              selectedCharacter === char.id
                ? 'ring-4 ring-blue-400 shadow-2xl scale-105'
                : 'hover:scale-102'
            }`}
          >
            <button
              onClick={() => onCharacterSelect(char.id)}
              className="w-full h-full flex flex-col items-center justify-center p-4"
            >
              <div className="text-5xl mb-3">{char.emoji}</div>
              <div className="text-gray-700 font-medium text-2xl">{char.name}</div>
            </button>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}