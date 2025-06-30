import { STORY_THEMES } from '../data/story-themes';

interface StorySettingsProps {
  genre: string;
  setGenre: (genre: string) => void;
  age: string;
  setAge: (age: string) => void;
  disabled?: boolean;
}

export default function StorySettings({ genre, setGenre, age, setAge, disabled }: StorySettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-serif mb-6 text-purple-800">🎈 Select Your Adventure Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STORY_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setGenre(theme.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 glass-purple ${
                genre === theme.id
                  ? 'border-purple-400 shadow-xl scale-105 animate-magicalGlow'
                  : 'border-purple-200/50 hover:border-purple-300 hover:shadow-lg hover:rotate-2'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">{theme.emoji}</span>
                <span className="font-medium text-sm text-center">{theme.name}</span>
                <span className="text-xs text-gray-600 text-center">{theme.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-serif mb-6 text-purple-800">
          🌟 Child's Age {disabled && <span className="text-sm font-normal text-purple-500 ml-2">(From profile)</span>}
        </h3>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={disabled}
          className="glass-purple text-lg px-6 py-3 rounded-full border-2 border-purple-300/50 text-purple-700 font-medium w-full md:w-auto disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-purple-400 cursor-pointer"
        >
          <option value="3">3 years old</option>
          <option value="4">4 years old</option>
          <option value="5">5 years old</option>
          <option value="6">6 years old</option>
          <option value="7">7 years old</option>
          <option value="8">8 years old</option>
          <option value="9">9 years old</option>
          <option value="10">10 years old</option>
          <option value="11">11 years old</option>
          <option value="12">12 years old</option>
        </select>
      </div>
    </div>
  );
}