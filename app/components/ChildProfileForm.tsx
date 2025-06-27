'use client';

import { useState } from 'react';
import { ChildProfile } from '../hooks/useChildProfiles';

interface ChildProfileFormProps {
  onSubmit: (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'parentEmail'>) => void;
  onCancel: () => void;
  editingProfile?: ChildProfile;
}

const INTEREST_OPTIONS = [
  'Animals', 'Space', 'Adventure', 'Magic', 'Dinosaurs', 
  'Princesses', 'Superheroes', 'Ocean', 'Sports', 'Music',
  'Art', 'Science', 'Nature', 'Vehicles', 'Cooking'
];

export default function ChildProfileForm({ onSubmit, onCancel, editingProfile }: ChildProfileFormProps) {
  const [name, setName] = useState(editingProfile?.name || '');
  const [age, setAge] = useState(editingProfile?.age || 5);
  const [gender, setGender] = useState<'boy' | 'girl' | 'other'>(editingProfile?.gender || 'boy');
  const [interests, setInterests] = useState<string[]>(editingProfile?.interests || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && interests.length > 0) {
      onSubmit({ name: name.trim(), age, gender, interests });
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
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
          Gender
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
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests (select at least one)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {INTEREST_OPTIONS.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                interests.includes(interest)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!name.trim() || interests.length === 0}
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