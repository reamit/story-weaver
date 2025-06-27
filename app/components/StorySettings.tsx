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
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Select Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STORY_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setGenre(theme.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                genre === theme.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-gray-400'
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
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Child's Age {disabled && <span className="text-sm font-normal text-gray-600">(From profile)</span>}
        </h3>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={disabled}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="3">3 years old</option>
          <option value="4">4 years old</option>
          <option value="5">5 years old</option>
          <option value="6">6 years old</option>
          <option value="7">7 years old</option>
          <option value="8">8 years old</option>
        </select>
      </div>
    </div>
  );
}