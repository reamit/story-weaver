import { CHARACTER_DETAILS } from '../data/character-details';
import SpotlightCard from './SpotlightCard/SpotlightCard';
import Image from 'next/image';

interface CharacterSelectorProps {
  selectedCharacter: string;
  onCharacterSelect: (character: string) => void;
}

// Map character IDs to display information with your original styling
const characters = Object.entries(CHARACTER_DETAILS).map(([id, details]) => {
  // Use your original character styling
  const styleMap: Record<string, { image: string; spotlightColor: string; bgGradient: string; displayName: string }> = {
    princess: { 
      image: '/assets/transparent/princess.png', 
      spotlightColor: 'rgba(253, 0, 127, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-pink-200 to-pink-300',
      displayName: 'Princess'
    },
    knight: { 
      image: '/assets/transparent/knight.png', 
      spotlightColor: 'rgba(59, 130, 246, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-blue-200 to-blue-300',
      displayName: 'Knight'
    },
    dragon: { 
      image: '/assets/transparent/dragon.png', 
      spotlightColor: 'rgba(34, 197, 94, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-green-200 to-green-300',
      displayName: 'Dragon'
    },
    wizard: { 
      image: '/assets/transparent/wizard.png', 
      spotlightColor: 'rgba(147, 51, 234, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-purple-200 to-purple-300',
      displayName: 'Wizard'
    },
    cat: { 
      image: '/assets/transparent/cat.png', 
      spotlightColor: 'rgba(191, 80, 0, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-orange-200 to-orange-300',
      displayName: 'Magic Cat'
    },
    mouse: { 
      image: '/assets/transparent/mouse.png', 
      spotlightColor: 'rgba(107, 114, 128, 0.5)', 
      bgGradient: 'bg-gradient-to-br from-gray-200 to-gray-300',
      displayName: 'Brave Mouse'
    }
  };
  
  const style = styleMap[id] || { 
    image: '/assets/transparent/princess.png',
    spotlightColor: 'rgba(147, 51, 234, 0.5)', 
    bgGradient: 'bg-gradient-to-br from-purple-200 to-purple-300',
    displayName: details.name
  };
  
  return {
    id,
    name: style.displayName,
    image: style.image,
    spotlightColor: style.spotlightColor,
    bgGradient: style.bgGradient
  };
});

export default function CharacterSelector({ selectedCharacter, onCharacterSelect }: CharacterSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Choose Your Hero
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="w-[10rem] h-[10rem] mb-3 relative">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-gray-700 font-medium text-lg">{char.name}</div>
            </button>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}