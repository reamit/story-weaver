'use client';

import { useState } from 'react';
import CharacterSelector from './components/CharacterSelector';
import StorySettings from './components/StorySettings';
import StoryDisplay from './components/StoryDisplay';
import LoadingState from './components/LoadingState';
import Link from 'next/link';

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
  const [includeImages, setIncludeImages] = useState(true); // Default to true per specs

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
        body: JSON.stringify({ character, genre, age: parseInt(age) })
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
    <main className="min-h-screen bg-purple-200 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-purple-100 rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-8xl font-modak text-purple-800">
            ✨ StoryWeaver ✨
          </h1>
        </div>

        {!story && !loading && (
          <>
            <CharacterSelector 
              selectedCharacter={character}
              onCharacterSelect={setCharacter}
            />
            
            <StorySettings
              genre={genre}
              setGenre={setGenre}
              age={age}
              setAge={setAge}
            />

            <div className="flex justify-between items-center mt-8">
              <Link 
                href="/login" 
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Parent Login →
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Include AI-generated images</span>
                  <button
                    onClick={() => setIncludeImages(!includeImages)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      includeImages ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeImages ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <button
                  onClick={generateStory}
                  disabled={!character || !genre}
                  className="px-8 py-3 bg-purple-600 text-white rounded-2xl font-semibold text-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Generate Story ✨
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
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