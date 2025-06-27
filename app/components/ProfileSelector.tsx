'use client';

import { useState, useEffect } from 'react';
import { ChildProfile } from '../hooks/useChildProfiles';
import { User, Plus } from 'lucide-react';
import Link from 'next/link';

interface ProfileSelectorProps {
  selectedProfile: ChildProfile | null;
  onProfileSelect: (profile: ChildProfile | null) => void;
}

export default function ProfileSelector({ selectedProfile, onProfileSelect }: ProfileSelectorProps) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get all profiles from localStorage
    const allKeys = Object.keys(localStorage);
    const profileKeys = allKeys.filter(key => key.startsWith('child-profiles-'));
    
    const allProfiles: ChildProfile[] = [];
    profileKeys.forEach(key => {
      const stored = localStorage.getItem(key);
      if (stored) {
        const profiles = JSON.parse(stored) as ChildProfile[];
        allProfiles.push(...profiles);
      }
    });
    
    setProfiles(allProfiles);
  }, []);

  if (profiles.length === 0) {
    return (
      <Link 
        href="/login"
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
      >
        <Plus size={20} />
        Create Child Profile
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-300 rounded-lg hover:border-purple-400 transition-colors"
      >
        <User size={20} />
        <span className="font-medium">
          {selectedProfile ? selectedProfile.name : 'Select Child'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <button
              onClick={() => {
                onProfileSelect(null);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">No Profile (Generic Story)</div>
              <div className="text-sm text-gray-600">Create a standard story</div>
            </button>
            
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => {
                  onProfileSelect(profile);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-purple-50 transition-colors ${
                  selectedProfile?.id === profile.id ? 'bg-purple-100' : ''
                }`}
              >
                <div className="font-medium">{profile.name}</div>
                <div className="text-sm text-gray-600">
                  Age {profile.age} • {profile.interests.length} interests
                </div>
              </button>
            ))}
          </div>
          
          <Link
            href="/login"
            className="block w-full text-center px-3 py-2 border-t text-purple-600 hover:bg-purple-50"
          >
            Manage Profiles →
          </Link>
        </div>
      )}
    </div>
  );
}