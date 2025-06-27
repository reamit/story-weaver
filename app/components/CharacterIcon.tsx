'use client';

import { useState, useEffect } from 'react';

interface CharacterIconProps {
  characterId: string;
  emoji: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function CharacterIcon({ characterId, emoji, size = 'medium', className = '' }: CharacterIconProps) {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if we have a cached icon for this character
    const cachedIcon = localStorage.getItem(`character-icon-${characterId}`);
    if (cachedIcon) {
      setIconUrl(cachedIcon);
    }
  }, [characterId]);

  const generateIcon = async () => {
    if (loading || iconUrl) return;
    
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/generate-character-icon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.icon) {
          setIconUrl(data.icon);
          // Cache the icon
          localStorage.setItem(`character-icon-${characterId}`, data.icon);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to generate character icon:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-16 h-16 text-4xl',
    large: 'w-24 h-24 text-6xl'
  };

  if (iconUrl) {
    return (
      <div className={`${sizeClasses[size]} ${className} rounded-lg overflow-hidden`}>
        <img 
          src={iconUrl} 
          alt={`${characterId} character`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors`}
      onClick={generateIcon}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
      ) : (
        <span>{emoji}</span>
      )}
    </div>
  );
}