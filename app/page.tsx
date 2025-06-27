'use client';

import { useState } from 'react';
import CharacterSelector from './components/CharacterSelector';
import StorySettings from './components/StorySettings';
import StoryDisplay from './components/StoryDisplay';
import LoadingState from './components/LoadingState';
import Link from 'next/link';
import ProfileSelector from './components/ProfileSelector';
import { ChildProfile } from './hooks/useChildProfiles';

interface Story {
  title: string;
  pages: string[];
  imagePrompts: string[];
  images?: string[];
}

export default function Home() {
  const [character, setCharacter] = useState('');
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('6');
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [includeImages, setIncludeImages] = useState(false); // Start with images OFF to save credits
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);

  // Update age when profile is selected
  const handleProfileSelect = (profile: ChildProfile | null) => {
    setSelectedProfile(profile);
    if (profile) {
      setAge(profile.age.toString());
    }
  };

  const generateStory = async () => {
    if (!character || !genre) {
      setError('Please select a character and genre');
      return;
    }

    setLoading(true);
    setError('');
    setStory(null);

    try {
      const endpoint = includeImages ? '/api/generate-story-with-images' : '/api/generate-story';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          character, 
          genre, 
          age: parseInt(age),
          profile: selectedProfile 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      
      // Check if there's an image generation error
      if (data.imageError && includeImages) {
        console.error('Image generation failed:', data.debugInfo);
        setError(`Story created, but images failed: ${data.imageError}`);
      }
      
      setStory(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetStory = () => {
    setStory(null);
    setCharacter('');
    setGenre('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800">
            ✨ StoryWeaver ✨
          </h1>
          <Link 
            href="/login" 
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Parent Login →
          </Link>
        </div>

        {!story && !loading && (
          <>
            <div className="mb-6 flex justify-center">
              <ProfileSelector 
                selectedProfile={selectedProfile}
                onProfileSelect={handleProfileSelect}
              />
            </div>

            {selectedProfile && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-purple-800">
                  Creating a personalized story for <strong>{selectedProfile.name}</strong>
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  Age {selectedProfile.age} • Loves: {selectedProfile.interests.slice(0, 3).join(', ')}
                  {selectedProfile.interests.length > 3 && ` +${selectedProfile.interests.length - 3} more`}
                </p>
              </div>
            )}

            <CharacterSelector 
              selectedCharacter={character}
              onCharacterSelect={setCharacter}
            />
            
            <StorySettings
              genre={genre}
              setGenre={setGenre}
              age={age}
              setAge={setAge}
              disabled={!!selectedProfile}
            />

            <div className="mt-6 text-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={includeImages}
                  onChange={(e) => setIncludeImages(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="ml-2 text-gray-700">
                  Include AI-generated images
                </span>
              </label>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={generateStory}
                disabled={!character || !genre}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Generate Story ✨
              </button>
            </div>
          </>
        )}

        {loading && <LoadingState />}

        {story && !loading && (
          <StoryDisplay 
            story={story}
            onNewStory={resetStory}
          />
        )}
      </div>
    </main>
  );
}