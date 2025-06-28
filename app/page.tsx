'use client';

import { useState, useEffect } from 'react';
import CharacterSelector from './components/CharacterSelector';
import StorySettings from './components/StorySettings';
import StoryDisplay from './components/StoryDisplay';
import LoadingState from './components/LoadingState';
import EnhancedLoadingState from './components/EnhancedLoadingState';
import Link from 'next/link';
import ProfileSelector from './components/ProfileSelector';
import { ChildProfile } from './hooks/useChildProfiles';
import Logo from './components/Logo';

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
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(!!data.user);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

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
      
      // Enhanced debug logging
      console.log('=== STORY GENERATION RESPONSE DEBUG ===');
      console.log('Full response data:', data);
      console.log('Response details:', {
        hasImages: !!data.images,
        imageCount: data.images?.length || 0,
        imagesArray: data.images,
        imagePromptsCount: data.imagePrompts?.length || 0,
        firstImage: data.images?.[0]?.substring(0, 50),
        imageError: data.imageError,
        debugInfo: data.debugInfo
      });
      
      // Log each image
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((img: string | null, index: number) => {
          console.log(`Image ${index + 1}:`, {
            exists: !!img,
            type: typeof img,
            length: img?.length || 0,
            startsWithDataUrl: img?.startsWith?.('data:image') || false,
            first100: img?.substring?.(0, 100) || 'null'
          });
        });
      } else {
        console.log('Images is not an array or is missing');
      }
      console.log('=== END DEBUG ===');
      
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
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
        {/* Merged: Logo from HEAD + StoryWeaver title from master */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-6xl font-display gradient-text">
              StoryWeaver
            </h1>
          </div>
          {/* Merged: Conditional login/dashboard link from HEAD */}
          {isLoggedIn ? (
            <Link 
              href="/dashboard" 
              className="btn btn-secondary"
            >
              Parent Dashboard →
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="btn btn-secondary"
            >
              Parent Login →
            </Link>
          )}
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
              <div className="flex items-center gap-4">
                <ProfileSelector 
                  selectedProfile={selectedProfile}
                  onProfileSelect={handleProfileSelect}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Include AI-generated images</span>
                  <button
                    onClick={() => setIncludeImages(!includeImages)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      includeImages ? 'bg-teal-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                        includeImages ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <button
                  onClick={generateStory}
                  disabled={!character || !genre}
                  className="btn btn-primary px-8 py-3 text-lg font-semibold rounded-xl gradient-primary"
                >
                  Generate Story
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg animate-fadeIn">
                {error}
              </div>
            )}
          </>
        )}

        {loading && (includeImages ? <EnhancedLoadingState /> : <LoadingState />)}

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