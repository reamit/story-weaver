'use client';

import { useState } from 'react';
import { ChildProfile } from '../hooks/useChildProfiles';
import { INTEREST_CATEGORIES, READING_LEVELS } from '../data/interests';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ChildProfileFormProps {
  onSubmit: (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'parentEmail'>) => void;
  onCancel: () => void;
  editingProfile?: ChildProfile;
}

export default function ChildProfileForm({ onSubmit, onCancel, editingProfile }: ChildProfileFormProps) {
  const [name, setName] = useState(editingProfile?.name || '');
  const [age, setAge] = useState(editingProfile?.age || 5);
  const [gender, setGender] = useState<'boy' | 'girl' | 'other' | undefined>(editingProfile?.gender);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(editingProfile?.interests || []);
  const [freeFormInterests, setFreeFormInterests] = useState(editingProfile?.freeFormInterests || '');
  const [readingLevel, setReadingLevel] = useState(editingProfile?.readingLevel || 'beginner');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ 
        name: name.trim(), 
        age, 
        gender,
        interests: selectedInterests,
        freeFormInterests: freeFormInterests.trim(),
        readingLevel
      });
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Child's Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age
        </label>
        <input
          id="age"
          type="number"
          min="3"
          max="12"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender (Optional)
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="boy"
              checked={gender === 'boy'}
              onChange={(e) => setGender(e.target.value as any)}
              className="mr-2"
            />
            Boy
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="girl"
              checked={gender === 'girl'}
              onChange={(e) => setGender(e.target.value as any)}
              className="mr-2"
            />
            Girl
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="other"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value as any)}
              className="mr-2"
            />
            Other
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value=""
              checked={!gender}
              onChange={() => setGender(undefined)}
              className="mr-2"
            />
            Prefer not to say
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="reading-level" className="block text-sm font-medium text-gray-700 mb-2">
          Reading Level
        </label>
        <select
          id="reading-level"
          value={readingLevel}
          onChange={(e) => setReadingLevel(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {READING_LEVELS.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests (Multi-select)
        </label>
        <div className="space-y-2">
          {INTEREST_CATEGORIES.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{category.emoji}</span>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    ({category.subcategories.filter(sub => selectedInterests.includes(sub)).length} selected)
                  </span>
                </span>
                {expandedCategories.includes(category.id) ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
                }
              </button>
              
              {expandedCategories.includes(category.id) && (
                <div className="px-4 py-3 space-y-2 bg-gray-50 border-t border-gray-200">
                  {category.subcategories.map(subcategory => (
                    <label key={subcategory} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(subcategory)}
                        onChange={() => toggleInterest(subcategory)}
                        className="mt-0.5"
                      />
                      <span className="text-sm">{subcategory}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="free-form" className="block text-sm font-medium text-gray-700 mb-2">
          Other Interests (Optional)
        </label>
        <textarea
          id="free-form"
          value={freeFormInterests}
          onChange={(e) => setFreeFormInterests(e.target.value)}
          placeholder="Enter any other interests not listed above..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingProfile ? 'Update Profile' : 'Create Profile'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}