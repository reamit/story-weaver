interface CharacterSelectorProps {
  selectedCharacter: string;
  onCharacterSelect: (character: string) => void;
}

const characters = [
  { id: 'princess', name: 'Princess', emoji: '👸', color: 'from-pink-200 to-pink-300' },
  { id: 'knight', name: 'Knight', emoji: '🛡️', color: 'from-blue-200 to-blue-300' },
  { id: 'dragon', name: 'Dragon', emoji: '🐲', color: 'from-green-200 to-green-300' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙‍♂️', color: 'from-purple-200 to-purple-300' },
  { id: 'cat', name: 'Magic Cat', emoji: '🐱', color: 'from-orange-200 to-orange-300' },
  { id: 'mouse', name: 'Brave Mouse', emoji: '🐭', color: 'from-gray-200 to-gray-300' }
];

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
              <div className="text-4xl mb-2 text-center">{char.emoji}</div>
              <div className="text-center font-medium text-gray-700">{char.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}