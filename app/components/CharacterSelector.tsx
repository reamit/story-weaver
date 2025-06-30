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
      spotlightColor: 'rgba(255, 182, 193, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-pink-300/80 via-pink-200/60 to-purple-200/40',
      displayName: 'Princess'
    },
    knight: { 
      image: '/assets/transparent/knight.png', 
      spotlightColor: 'rgba(135, 206, 235, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-blue-300/80 via-blue-200/60 to-purple-200/40',
      displayName: 'Knight'
    },
    dragon: { 
      image: '/assets/transparent/dragon.png', 
      spotlightColor: 'rgba(144, 238, 144, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-green-300/80 via-mint-200/60 to-purple-200/40',
      displayName: 'Dragon'
    },
    wizard: { 
      image: '/assets/transparent/wizard.png', 
      spotlightColor: 'rgba(221, 160, 221, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-purple-400/80 via-purple-300/60 to-pink-200/40',
      displayName: 'Wizard'
    },
    cat: { 
      image: '/assets/transparent/cat.png', 
      spotlightColor: 'rgba(255, 218, 185, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-orange-300/80 via-yellow-200/60 to-pink-200/40',
      displayName: 'Magic Cat'
    },
    mouse: { 
      image: '/assets/transparent/mouse.png', 
      spotlightColor: 'rgba(176, 196, 222, 0.6)', 
      bgGradient: 'bg-gradient-to-br from-gray-300/80 via-blue-200/60 to-purple-200/40',
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
      <h2 className="text-4xl font-serif text-center mb-10 text-purple-800">
        ✨ Choose Your Magical Hero ✨
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {characters.map((char) => (
          <SpotlightCard
            key={char.id}
            spotlightColor={char.spotlightColor}
            bgGradient={char.bgGradient}
            className={`cursor-pointer transition-all duration-500 ${
              selectedCharacter === char.id
                ? 'ring-4 ring-purple-400 shadow-2xl scale-110 transform animate-magicalGlow'
                : 'hover:scale-105 hover:shadow-xl hover:rotate-3'
            }`}
          >
            <button
              onClick={() => onCharacterSelect(char.id)}
              className="w-full h-full flex flex-col items-center justify-center p-4"
            >
              <div className="w-[10rem] h-[10rem] mb-3 relative">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-gray-800 font-semibold text-lg">{char.name}</div>
            </button>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}