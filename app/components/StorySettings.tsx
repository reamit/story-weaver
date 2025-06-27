interface StorySettingsProps {
  genre: string;
  setGenre: (genre: string) => void;
  age: string;
  setAge: (age: string) => void;
}

const genres = [
  { id: 'medieval', name: 'Medieval Kingdom', emoji: '🏰' },
  { id: 'modern', name: 'Modern City', emoji: '🏙️' },
  { id: 'space', name: 'Space Adventure', emoji: '🚀' }
];

export default function StorySettings({ genre, setGenre, age, setAge }: StorySettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Choose Setting</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => setGenre(g.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                genre === g.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">{g.emoji}</span>
                <span className="font-medium">{g.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Child's Age</h3>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-lg"
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